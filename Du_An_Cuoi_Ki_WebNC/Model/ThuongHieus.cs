using System.ComponentModel.DataAnnotations;

namespace NguyenVanCong_2307.Models
{
    public class ThuongHieus
    {
        [Key]
        public int mathuonghieu { get; set; }
        public string tenthuonghieu { get; set; }
        public byte trangthai { get; set; } = 1;
    }
}
