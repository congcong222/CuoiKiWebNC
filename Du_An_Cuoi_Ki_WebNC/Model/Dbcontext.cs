using Microsoft.EntityFrameworkCore;
using NguyenVanCong_2307.Models;
namespace Du_An_Cuoi_Ki_WebNC.Model
{
    public class Dbcontext : DbContext
    {
        public Dbcontext(DbContextOptions<Dbcontext> options) : base(options)
        {
        }
        public DbSet<MonAn> MonAns { get; set; }

        public DbSet<MENU> Brands { get; set; }
    }
}
