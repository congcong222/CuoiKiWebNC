using Du_An_Cuoi_Ki_WebNC_Fontend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Du_An_Cuoi_Ki_WebNC_Fontend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
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

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}