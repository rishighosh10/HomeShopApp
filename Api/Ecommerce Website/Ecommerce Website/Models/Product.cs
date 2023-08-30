using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string ItemName { get; set; }
        public double Price { get; set; }
        public bool IsActive { get; set; }
        public int ProductCategoryId { get; set; }
        public string Image { get; set; }



        //public ProductCategory ProductCategory { get; set; }
        //public ICollection<CustomerOrderDetails> CustomerOrderDetails { get; set; }

    }
}
