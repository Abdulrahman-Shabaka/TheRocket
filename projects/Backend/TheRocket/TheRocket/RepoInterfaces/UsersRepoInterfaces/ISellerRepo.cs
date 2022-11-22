using TheRocket.Dtos.UserDtos;
using TheRocket.Shared;

namespace TheRocket.Repositories.RepoInterfaces
{
    public interface ISellerRepo : IBaseRepo<SharedResponse<SellerDto>, SharedResponse<List<SellerDto>>, SellerDto>
    {
        public Task<SharedResponse<SellerDto>> GetByUserId(string AppUserId);

    }
}