using Microsoft.EntityFrameworkCore;
using server.SakeTracker.Models;

namespace server.SakeTracker.Repository
{
  public class SakeDbContext : DbContext
  {
    public SakeDbContext(DbContextOptions<SakeDbContext> options) : base(options)
    { }

    public DbSet<Sake> Sakes { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite("Filename=./db/SakeTracker.db");
    }
  }
}