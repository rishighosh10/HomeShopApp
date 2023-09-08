using Ecommerce_Website.DTOs;
using Ecommerce_Website.Models;
using HomeShopAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Ecommerce_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppSettings _applicationSettings;
        private readonly HomeShopDbContext _context;
        public AuthController(IOptions<AppSettings> applicationSettings, HomeShopDbContext context)
        {
            this._applicationSettings = applicationSettings.Value;
            _context = context;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<Register>> Register([FromBody] Register model)
        {
            var customer = new Customer
            {
                Name = model.Name,
                Address = model.Address,
                PinCode = model.PinCode,
                Contact = model.Contact,
                Email = model.Email,
                Password = model.Password,
                IsActive = model.IsActive,

                Role = model.Role,
            };

            if (model.ConfirmPassword == model.Password)
            {

                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
                return Ok(customer);
            }
            else
            {
                return BadRequest("Passwords don't match");
            }
        }



        [HttpPost("CustomerLogin")]
        public IActionResult CustomerLogin([FromBody] CustomerLogin model)
        {
            var customer = _context.Customers.FirstOrDefault(c => c.Email == model.Email);
            if (customer == null)
            {
                return BadRequest("Email not found!");
            }
            else if (!customer.IsActive)
            {
                return BadRequest("You are no longer a Customer!");
            }
            else if (customer.Password != model.Password)
            {
                return BadRequest("Password does not match");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this._applicationSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("CustomerId", customer.CustomerId.ToString()), new Claim("Email", customer.Email), new Claim(ClaimTypes.Role, customer.Role), new Claim("Name", customer.Name), new Claim("Contact", customer.Contact) }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encrypterToken = tokenHandler.WriteToken(token);

            return Ok(new { token = encrypterToken, customerId = customer.CustomerId, email = customer.Email, name = customer.Name, contact = customer.Contact, role = customer.Role });
        }
    }
}
