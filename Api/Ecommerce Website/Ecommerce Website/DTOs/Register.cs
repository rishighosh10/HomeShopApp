using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website.DTOs
{
    public class Register
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Contact { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public int PinCode { get; set; }


        [Required]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }

        [Required]
        public bool IsActive { get; set; }


        private string role;
        public string Role
        {
            get { return role; }
            set { role = "Customer"; }
        }
    }
}
