
const apiUrl = 'https://localhost:7009/api/ChienAPI';

document.addEventListener('DOMContentLoaded', function () {
    // Hàm để lấy giá trị từ query string
    
    function getQueryParam(param) {
        console.log('Query string:', window.location.search);
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Lấy dữ liệu từ URL
    const manv = getQueryParam('id');
    const hoten = getQueryParam('hoten');
    const email = getQueryParam('email');
    const sdt = getQueryParam('sdt');
    const gioitinh = getQueryParam('gioitinh');
    const ngaysinh = getQueryParam('ngaysinh');
    const trangthai = getQueryParam('trangthai');

    // Gán dữ liệu vào các trường input
    document.getElementById('manv').value = manv;
    document.getElementById('hoten').value = decodeURIComponent(hoten);
    document.getElementById('email').value = decodeURIComponent(email);
    document.getElementById('sdt').value = sdt;
    document.getElementById('gioitinh').value = gioitinh;
    document.getElementById('ngaysinh').value = ngaysinh;
    document.getElementById('trangthai').value = trangthai;

    // Vô hiệu hóa trường mã nhân viên (không cho sửa)
    document.getElementById('manv').readOnly = true;
});



// Xử lý sự kiện submit
document.getElementById('updateNhanvienForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const MANV = document.getElementById('manv').value;


    const updatedNhanvien = {
        manv: MANV,
        hoten: document.getElementById('hoten').value,
        gioitinh: parseInt(document.getElementById('gioitinh').value),
        ngaysinh: document.getElementById('ngaysinh').value,
        sdt: document.getElementById('sdt').value,
        email: document.getElementById('email').value,
        trangthai: parseInt(document.getElementById('trangthai').value),

    };

    const response = await fetch(apiUrl + '/Update?id=' + MANV, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNhanvien)
    });

    if (response.ok) {
        alert('Cập nhật thành công!');
        window.location.href = '/Home/TrangChuAdmin'; // Chuyển hướng về trang chính
    } else {
        const errorMessage = await response.text(); // Lấy thông báo lỗi từ phản hồi
        alert('Lỗi khi cập nhật !');
    }
});
