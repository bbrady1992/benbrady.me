using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.SakeTracker.DTOs
{
  public class AddSakeDTO
  {
    public string Name { get; set; }
    public string Type { get; set; }
    public int BensRating { get; set; } = -1;
    public int JasonsRating { get; set; } = -1;
    public double Cost { get; set; } = 0;
  }
}