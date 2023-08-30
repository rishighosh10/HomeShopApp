using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website.Models
{
    public class ProductCategory
    {
        [Key]
        public int ProductCategoryId { get; set; }
        public string ProductCategoryName { get; set; }




        //public ICollection<Product> Product { get; set; }
    }
}
