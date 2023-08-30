using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce_Website.Models;

namespace Ecommerce_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerOrderDetailsController : ControllerBase
    {
        private readonly HomeShopDbContext _context;

        public CustomerOrderDetailsController(HomeShopDbContext context)
        {
            _context = context;
        }

        // GET: api/CustomerOrderDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerOrderDetails>>> GetCustomerOrderDetails()
        {
          if (_context.CustomerOrderDetails == null)
          {
              return NotFound();
          }
            return await _context.CustomerOrderDetails.ToListAsync();
        }

        // GET: api/CustomerOrderDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerOrderDetails>> GetCustomerOrderDetails(int id)
        {
          if (_context.CustomerOrderDetails == null)
          {
              return NotFound();
          }
            var customerOrderDetails = await _context.CustomerOrderDetails.FindAsync(id);

            if (customerOrderDetails == null)
            {
                return NotFound();
            }

            return customerOrderDetails;
        }

        // PUT: api/CustomerOrderDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerOrderDetails(int id, CustomerOrderDetails customerOrderDetails)
        {
            if (id != customerOrderDetails.CustomerOrderDetailsId)
            {
                return BadRequest();
            }

            _context.Entry(customerOrderDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerOrderDetailsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CustomerOrderDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerOrderDetails>> PostCustomerOrderDetails(CustomerOrderDetails customerOrderDetails)
        {
          if (_context.CustomerOrderDetails == null)
          {
              return Problem("Entity set 'HomeShopDbContext.CustomerOrderDetails'  is null.");
          }
            _context.CustomerOrderDetails.Add(customerOrderDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomerOrderDetails", new { id = customerOrderDetails.CustomerOrderDetailsId }, customerOrderDetails);
        }

        // DELETE: api/CustomerOrderDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerOrderDetails(int id)
        {
            if (_context.CustomerOrderDetails == null)
            {
                return NotFound();
            }
            var customerOrderDetails = await _context.CustomerOrderDetails.FindAsync(id);
            if (customerOrderDetails == null)
            {
                return NotFound();
            }

            _context.CustomerOrderDetails.Remove(customerOrderDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerOrderDetailsExists(int id)
        {
            return (_context.CustomerOrderDetails?.Any(e => e.CustomerOrderDetailsId == id)).GetValueOrDefault();
        }
    }
}
