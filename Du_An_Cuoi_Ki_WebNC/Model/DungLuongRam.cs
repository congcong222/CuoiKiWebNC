using NguyenVanCong_2307.Models;

namespace Du_An_Cuoi_Ki_WebNC.Model
{
    public class DungLuongRam
    {
        public int maDungLuongRam { get; set; }

        public int kichThuocRam { get; set; }

        public int trangThai { get; set; }

        public ICollection<PhienBanSanPham> PhienBanSanPhams { get; set; }

    }
}
