using TheRocket.Dtos.UserDtos;
using TheRocket.Shared;

namespace TheRocket.Repositories.RepoInterfaces
{
    public interface ISellerRepo:IBaseRepo<SharedResponse<SellerDto>,SellerDto>
    {
         
    }
}