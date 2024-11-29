using Microsoft.EntityFrameworkCore;
using NguyenVanCong_2307.Models;
namespace Du_An_Cuoi_Ki_WebNC.Model
{
    public class Dbcontext : DbContext
    {
        public Dbcontext(DbContextOptions<Dbcontext> options) : base(options)
        {
        }
        public DbSet<sanpham> sanpham { get; set; }
        public DbSet<ThuongHieus> thuonghieu { get; set; }
        public DbSet<KhachHang> khachhang { get; set; }
        public DbSet<PhieuXuat> phieuxuat { get; set; }

        public DbSet<NhanvienModels> Nhanviens { get; set; }
        public DbSet<TaikhoanKH> taikhoans { get; set; }

    }
}
