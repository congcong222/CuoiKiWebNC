using System.ComponentModel.DataAnnotations;

namespace NguyenVanCong_2307.Models
{
    public class MonAn
    {
        [Key]
        public int IdMonAn { get; set; }
        public string TenMonAn { get; set; }
    }
}
