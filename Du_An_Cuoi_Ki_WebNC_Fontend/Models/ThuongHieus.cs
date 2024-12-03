using System.ComponentModel.DataAnnotations;

namespace Du_An_Cuoi_Ki_WebNC_Fontend.Models
{
    public class ThuongHieus
    {
        [Key]
        public int mathuonghieu { get; set; }
        public string tenthuonghieu { get; set; }
        public byte trangthai { get; set; } = 1;




    }
}
