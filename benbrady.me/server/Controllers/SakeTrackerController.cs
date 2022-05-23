using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server.Models;
using server.SakeTracker.DTOs;
using server.SakeTracker.Service;

namespace server.Controllers
{
  [ApiController]
  [Route("/api/[controller]")]
  public class SakeTrackerController : ControllerBase
  {
    private readonly ILogger<SakeTrackerController> _logger;
    private readonly ISakeTrackerService _sakeTrackerService;

    public SakeTrackerController(ISakeTrackerService sakeTrackerService, ILogger<SakeTrackerController> logger)
    {
      _logger = logger;
      _sakeTrackerService = sakeTrackerService;
    }

    [HttpGet("GetAllSakes")]
    public async Task<ActionResult<ServiceResponse<List<GetSakeDTO>>>> GetAllSakes()
    {
      var response = await _sakeTrackerService.GetAll();
      if (response.Success)
      {
        return Ok(response);
      }
      else
      {
        return StatusCode(500, response);
      }
    }

    [Authorize(Roles = "SakeUser,SakeAdmin,SakeOwner")]
    [HttpPost("AddSake")]
    public async Task<ActionResult<ServiceResponse<List<GetSakeDTO>>>> AddSake(AddSakeDTO newSake)
    {
      return Ok(await _sakeTrackerService.AddSake(newSake));
    }
  }
}