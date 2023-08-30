using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website.Models
{
    public class CustomerOrder
    {
        [Key]
        public int CustomerOrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public double Amount { get; set; }
        public string PaymentMethod { get; set; }
        public string TransactionId { get; set; }
        public string OrderStatus { get; set; }
        public int CustomerId { get; set; }



        //public Customer Customer { get; set; }
        //public ICollection<CustomerOrderDetails> CustomerOrderDetails { get; set; }
    }
}
