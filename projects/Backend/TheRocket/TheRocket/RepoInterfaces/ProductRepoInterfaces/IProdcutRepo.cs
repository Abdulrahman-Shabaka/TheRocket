using Microsoft.AspNetCore.Mvc;
using TheRocket.Dtos.ProductDtos;
using TheRocket.QueryParameters;
using TheRocket.Shared;

namespace TheRocket.Repositories.RepoInterfaces
{
    public interface IProdcutRepo:IBaseRepo<SharedResponse<ProductDto>,SharedResponse<List<ProductDto>>,ProductDto>
    {
        public Task<SharedResponse<List<ProductDto>>> GetProductsWithFilters(ProductQueryParameter queryParameter); 
        public Task<SharedResponse<List<ProductDto>>> GetProductsWithSellerId(int SellerId); 
        
    }
}