using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.SakeTracker.Models
{
  public class Sake
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public int BensRating { get; set; }
    public int JasonsRating { get; set; }
    public double Cost { get; set; }
    public string Notes {get;set;}
  }
}