using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
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
      return Ok(await _sakeTrackerService.GetAll());
    }
  }
}