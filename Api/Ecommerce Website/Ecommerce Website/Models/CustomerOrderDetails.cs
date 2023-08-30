using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website.Models
{
    public class CustomerOrderDetails
    {
        [Key]
        public int CustomerOrderDetailsId { get; set; }
        public int CustomerOrderId { get; set; }
        public int ProductId { get; set; }
        public double UnitPrice { get; set; }
        public int Quantity { get; set; }




        //public CustomerOrder CustomerOrder { get; set; }
        //public Product Product { get; set; }
    }
}
