using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Du_An_Cuoi_Ki_WebNC_Fontend.Models
{
    public class CTSanPham
    {
        public int maImei { get; set; }

        public int maPhienBanSanPham { get; set; }

        public int maPhieuNhap { get; set; }

        public int maPhieuXuat { get; set; }

        public int tinhTrang { get; set; }

        public PhienBanSanPham PhienBanSanPham { get; set; }

    }
}
