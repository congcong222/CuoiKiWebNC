using System.ComponentModel.DataAnnotations;

namespace NguyenVanCong_2307.Models
{
    public class MENU
    {
        [Key]
        public int IDMON { get; set; }
        public string TENMON { get; set; }
        public string DONVITINH { get; set; }
        public double DONGIA { get; set; }
        public double SOLUONG {  get; set; }
        public string MOTA { get; set; }
        public string HINHANH { get; set; }
        public int IDDANHMUC { get; set; }
    }
}
