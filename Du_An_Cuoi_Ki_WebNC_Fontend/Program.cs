using Du_An_Cuoi_Ki_WebNC_Fontend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Cấu hình kết nối cơ sở dữ liệu SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Cấu hình CORS - Cho phép tất cả các nguồn (nếu bạn cần giới hạn nguồn thì có thể điều chỉnh lại)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()    // Cho phép tất cả các nguồn (domain)
              .AllowAnyMethod()    // Cho phép tất cả các phương thức HTTP (GET, POST, PUT, DELETE, ...)
              .AllowAnyHeader();   // Cho phép tất cả các tiêu đề
    });
});

// Đọc cấu hình URL API từ appsettings.json
var apiBaseUrl = builder.Configuration.GetValue<string>("ApiSettings:BaseUrl");

// Đăng ký HttpClient với cấu hình URL API
builder.Services.AddHttpClient("API", client =>
{
    client.BaseAddress = new Uri(apiBaseUrl);
});

// Thêm dịch vụ MVC
builder.Services.AddControllersWithViews();




var app = builder.Build();





// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("AllowAllOrigins");

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=TrangChuAdmin}/{id?}");

app.Run();
