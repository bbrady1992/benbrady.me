using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.Models;
using server.SakeTracker.DTOs;
using server.SakeTracker.Models;
using server.SakeTracker.Repository;

namespace server.SakeTracker.Service
{
  public class SakeTrackerService : ISakeTrackerService
  {
    private readonly IMapper _mapper;
    private readonly SakeDbContext _sakeDbContext;

    public SakeTrackerService(IMapper mapper, SakeDbContext sakeDbContext)
    {
      _mapper = mapper;
      _sakeDbContext = sakeDbContext;
    }

    public async Task<ServiceResponse<List<GetSakeDTO>>> GetAll()
    {
      var serviceResponse = new ServiceResponse<List<GetSakeDTO>>();
      serviceResponse.Data = _sakeDbContext.Sakes.Select(sake =>
      _mapper.Map<GetSakeDTO>(sake)).ToList();
      return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetSakeDTO>>> AddSake(AddSakeDTO newSake)
    {
      var serviceResponse = new ServiceResponse<List<GetSakeDTO>>();
      Sake sake = _mapper.Map<Sake>(newSake);
      _sakeDbContext.Add(sake);
      await _sakeDbContext.SaveChangesAsync();
      return await GetAll();

    }
  }
}