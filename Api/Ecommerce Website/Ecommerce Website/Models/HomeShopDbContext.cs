using Microsoft.EntityFrameworkCore;

namespace Ecommerce_Website.Models
{
        public class HomeShopDbContext : DbContext
        {
            public HomeShopDbContext(DbContextOptions<HomeShopDbContext> options)
            : base(options)
            {
            }

            public DbSet<Admin> Admins { get; set; }
            public DbSet<Customer> Customers { get; set; }
            public DbSet<CustomerOrder> CustomerOrders { get; set; }
            public DbSet<CustomerOrderDetails> CustomerOrderDetails { get; set; }
            public DbSet<ProductCategory> ProductCategories { get; set; }
            public DbSet<Product> Product { get; set; }


        }  
}
