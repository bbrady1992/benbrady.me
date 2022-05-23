using System.Text.Json.Serialization;

namespace server.SakeTracker.Models
{
  [JsonConverter(typeof(JsonStringEnumConverter))]
  public enum Role
  {
    SakeUser,
    SakeAdmin,
    SakeOwner
  }
}