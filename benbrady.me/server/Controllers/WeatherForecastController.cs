using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace server.Controllers
{
  public class WeatherForecastData
  {
    public string[] forecasts { get; set; }
  }

  [ApiController]
  [Route("[controller]")]
  public class WeatherForecastController : ControllerBase
  {
    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
      _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<WeatherForecastData>> Get()
    {
      _logger.LogInformation("Serving Hello, World endpoint");
      string[] forecastData = { "Hello", "World" };
      var data = new WeatherForecastData();
      data.forecasts = forecastData;
      _logger.LogInformation($"data is {data.forecasts[0]}");
      _logger.LogInformation($"data is {data.forecasts[1]}");
      return Ok(data);
    }
  }
}
