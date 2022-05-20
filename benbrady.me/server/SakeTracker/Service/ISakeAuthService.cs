using System;
using System.Threading.Tasks;
using server.Models;
using server.SakeTracker.Models;

namespace server.SakeTracker.Service
{
  public interface ISakeAuthService
  {
    Task<ServiceResponse<Guid>> Register(User user, string password);
    Task<ServiceResponse<string>> Login(string username, string password);
    Task<bool> UserExists(string username);
  }
}