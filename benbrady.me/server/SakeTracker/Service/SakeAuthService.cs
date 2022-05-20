using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using server.Models;
using server.SakeTracker.Models;
using server.SakeTracker.Repository;

namespace server.SakeTracker.Service
{
  public class SakeAuthService : ISakeAuthService
  {
    private readonly SakeDbContext _context;
    private readonly IConfiguration _configuration;

    public SakeAuthService(SakeDbContext context, IConfiguration configuration)
    {
      _context = context;
      _configuration = configuration;
    }

    public async Task<ServiceResponse<string>> Login(string username, string password)
    {
      var response = new ServiceResponse<string>();
      var user = await _context.Users.FirstOrDefaultAsync(user => user.Username.ToLower().Equals(username.ToLower()));
      if (user == null || !VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
      {
        response.Success = false;
        response.Message = "Could not sign in with provided username and password";
      }
      else
      {
        response.Data = CreateToken(user);
      }
      return response;
    }

    public async Task<ServiceResponse<Guid>> Register(User user, string password)
    {
      var response = new ServiceResponse<Guid>();
      if (await UserExists(user.Username))
      {
        response.Success = false;
        response.Message = $"Cannot create user '{user.Username}'";
        return response;
      }

      CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;
      _context.Users.Add(user);
      await _context.SaveChangesAsync();
      response.Data = user.Id;
      return response;
    }

    public async Task<bool> UserExists(string username)
    {
      return await _context.Users.AnyAsync(user => user.Username.ToLower().Equals(username.ToLower()));
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
      {
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        for (int i = 0; i < computedHash.Length; ++i)
        {
          if (computedHash[i] != passwordHash[i])
          {
            return false;
          }
        }
        return true;
      }
    }

    private string CreateToken(User user)
    {
      var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

      var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = System.DateTime.Now.AddMinutes(15),
        SigningCredentials = creds
      };

      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
  }
}