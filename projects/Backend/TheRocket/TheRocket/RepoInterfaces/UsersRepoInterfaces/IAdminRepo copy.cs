using TheRocket.Dtos.UserDtos;
using TheRocket.Shared;

namespace TheRocket.Repositories.RepoInterfaces
{
    public interface IAdminRepo:IBaseRepo<SharedResponse<AdminDto>,SharedResponse<List<AdminDto>>,AdminDto>
    {
         public Task<SharedResponse<AdminDto>> GetByUserId(string AppUserId);
    }
}