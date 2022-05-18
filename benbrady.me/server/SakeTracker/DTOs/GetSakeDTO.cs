using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.SakeTracker.DTOs
{
  public class GetSakeDTO
  {
    public Guid Id { get; set; }
    public int BensRating { get; set; }
    public int JasonsRating { get; set; }
    public double Cost { get; set; }
  }
}