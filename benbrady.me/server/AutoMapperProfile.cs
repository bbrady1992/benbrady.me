using AutoMapper;
using server.SakeTracker.Models;
using server.SakeTracker.DTOs;

namespace server
{
  public class AutoMapperProfile : Profile
  {
    public AutoMapperProfile()
    {
      CreateMap<Sake, GetSakeDTO>();
    }
  }
}