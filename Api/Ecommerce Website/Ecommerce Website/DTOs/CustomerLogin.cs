using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website.DTOs
{
    public class CustomerLogin
    {

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
