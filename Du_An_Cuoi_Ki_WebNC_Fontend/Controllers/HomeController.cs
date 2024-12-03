using Du_An_Cuoi_Ki_WebNC_Fontend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Du_An_Cuoi_Ki_WebNC_Fontend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly HttpClient _httpClient;
        private readonly ApplicationDbContext _dbContext; // Kết nối tới DbContext
        public HomeController(ILogger<HomeController> logger, HttpClient httpClient, ApplicationDbContext dbContext)
        {
            _httpClient = httpClient;
            _logger = logger;
            _dbContext = dbContext;
        }

        public IActionResult Update()
        {
            return View();
        }
        public IActionResult TrangChuAdmin()
        {
            return View();
        }
        public IActionResult AdminOrder()
        {
            return View();
        }
        public IActionResult AdminProduct()
        {
            return View();
        }
        public IActionResult AdminAddProduct()
        {
            return View();
        }
        public IActionResult TaiKhoan()
        {
            return View();
        }
        public IActionResult Insert()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View("Login");
        }
        public IActionResult LienHe()
        {
            return View("LienHe");
        }
        public IActionResult Profile()
        {
            return View("Profile");
        }
        public IActionResult Register()
        {
            return View("Register");
        }
        public IActionResult SanPham()
        {
            return View("SanPham");
        }
        public IActionResult ThongTinCaNhan()
        {
            return View("ThongTinCaNhan");
            
        }
        public async Task<IActionResult> TrangChu()
        {
            var apiUrl = "https://localhost:7009/api/CongAPI/ListSanPhamWeb";
            var response = await _httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var sanPhamList = JsonConvert.DeserializeObject<IEnumerable<sanpham>>(data);

                // Chuyển đổi dữ liệu từ sanpham và PhienBanSanPham thành SanPhamDTO
                var sanPhamDTOList = sanPhamList.Select(sp => new SanPhamDTO
                {
                    tensp = sp.tensp,
                    hinhanh = sp.hinhanh,
                    kichthuocman = sp.kichthuocman,
                    ram = sp.PhienBanSanPhams?.FirstOrDefault()?.ram ?? 0, // Kiểm tra null trước khi lấy giá trị
                    rom = sp.PhienBanSanPhams?.FirstOrDefault()?.rom ?? 0, // Kiểm tra null trước khi lấy giá trị
                    giaNhap = sp.PhienBanSanPhams?.FirstOrDefault()?.giaNhap ?? 0, // Kiểm tra null trước khi lấy giá trị
                    giaXuat = sp.PhienBanSanPhams?.FirstOrDefault()?.giaXuat ?? 0 // Kiểm tra null trước khi lấy giá trị
                }).ToList();

                return View(sanPhamDTOList);
            }
            else
            {
                ViewBag.ErrorMessage = "Không thể lấy danh sách sản phẩm từ API.";
                return View("TrangChu");
            }
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
