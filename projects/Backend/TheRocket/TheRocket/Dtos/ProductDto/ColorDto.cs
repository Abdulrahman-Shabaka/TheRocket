using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheRocket.Entities.ProductDtos
{
    public class ProductColorDto
    {
        public int Id { get; set; }
        public string Color { get; set; }
        public int ProductId { get; set; }
    }
}