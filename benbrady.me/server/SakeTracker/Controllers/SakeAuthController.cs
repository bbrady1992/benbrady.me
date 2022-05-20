using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.SakeTracker.DTOs;
using server.SakeTracker.Models;
using server.SakeTracker.Service;

namespace server.SakeTracker.Controllers
{
  [ApiController]
  [Route("/api/[controller]")]
  public class SakeAuthController : ControllerBase
  {
    private readonly ISakeAuthService _authService;

    public SakeAuthController(ISakeAuthService authService)
    {
      _authService = authService;
    }

    // TODO (bbrady) - lock down endpoint to admins only
    [HttpPost("Register")]
    public async Task<ActionResult<ServiceResponse<Guid>>> Register(RegisterUserDTO request)
    {
      var response = await _authService.Register(
          new User { Username = request.Username },
          request.Password
      );

      if (!response.Success)
      {
        return BadRequest(response);
      }
      return Ok(response);
    }

    [HttpPost("Login")]
    public async Task<ActionResult<ServiceResponse<string>>> Login(LoginUserDTO request)
    {
      var response = await _authService.Login(request.Username, request.Password);

      if (!response.Success)
      {
        return BadRequest(response);
      }
      return Ok(response);
    }
  }
}