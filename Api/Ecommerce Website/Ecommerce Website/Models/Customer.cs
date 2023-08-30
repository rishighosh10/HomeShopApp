using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int PinCode { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }



        //public ICollection<CustomerOrder> CustomerOrder { get; set; }


        public string Role { get; set; }
    }
}
