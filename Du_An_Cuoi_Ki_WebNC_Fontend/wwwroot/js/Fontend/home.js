// Lắng nghe sự kiện click trên button có class "btn-profile"
document.querySelectorAll('.btn-profile').forEach(function (btn) {
    btn.addEventListener('click', function () {
        // Chuyển hướng đến Action Profile
        window.location.href = '/Home/Profile';
    });
});

// Lắng nghe sự kiện click trên thẻ div có class "product"
document.querySelectorAll('.product').forEach(function (product) {
    product.addEventListener('click', function () {
        // Chuyển hướng đến Action SanPham
        window.location.href = '/Home/SanPham';
    });
});
