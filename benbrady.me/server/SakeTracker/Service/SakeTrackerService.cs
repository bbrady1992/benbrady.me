using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.SakeTracker.Repository;

namespace server.SakeTracker.Service
{
  public class SakeTrackerService : ISakeTrackerService
  {
    private readonly ISakeTrackerRepository _sakeTrackerRepo;

    public SakeTrackerService(ISakeTrackerRepository sakeTrackerRepo)
    {
      _sakeTrackerRepo = sakeTrackerRepo;
    }

  }
}