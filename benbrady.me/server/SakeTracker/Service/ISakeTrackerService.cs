using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using server.Models;
using server.SakeTracker.DTOs;
namespace server.SakeTracker.Service
{
  public interface ISakeTrackerService
  {
    Task<ServiceResponse<List<GetSakeDTO>>> GetAll();
    Task<ServiceResponse<List<GetSakeDTO>>> AddSake(AddSakeDTO newSake);
    Task<ServiceResponse<List<GetSakeDTO>>> DeleteSake(Guid Id);
  }
}