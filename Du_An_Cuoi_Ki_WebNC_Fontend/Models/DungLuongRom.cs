namespace Du_An_Cuoi_Ki_WebNC_Fontend.Models
{
    public class DungLuongRom
    {
        public int maDungLuongRom { get; set; }

        public int kichThuocRom { get; set; }

        public int trangThai { get; set; }

        public ICollection<PhienBanSanPham> PhienBanSanPhams { get; set; }


    }
}
