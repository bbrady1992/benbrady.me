using System;

namespace server.SakeTracker.Models
{
  public class Sake
  {
    public Guid Id { get; set; }
    public int BensRating { get; set; }
    public int JasonsRating { get; set; }
    public double Cost { get; set; }
  }
}