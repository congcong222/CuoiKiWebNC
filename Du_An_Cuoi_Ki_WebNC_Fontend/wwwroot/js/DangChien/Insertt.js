const apiUrl = 'https://localhost:7009/api/ChienAPI';

// Xử lý sự kiện khi bấm nút "Lưu"
document.getElementById('addNhanvienForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Thu thập dữ liệu từ các input
    const nhanVien = {
        manv: document.getElementById('manv').value,
        hoten: document.getElementById('hoten').value,
        gioitinh: parseInt(document.getElementById('gioitinh').value),
        ngaysinh: document.getElementById('ngaysinh').value,
        sdt: document.getElementById('sdt').value,
        email: document.getElementById('email').value,
        trangthai: parseInt(document.getElementById('trangthai').value),
    };

    try {
        // Gửi dữ liệu lên API
        const response = await fetch(apiUrl + '/Insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nhanVien),
        });

        if (response.ok) {
            alert('Thêm nhân viên thành công!');
            window.location.href = '/Home/TrangChuAdmin'; // Chuyển hướng về trang danh sách
        } else {
            const errorMessage = await response.text();
            alert('Thêm nhân viên thất bại: ' + errorMessage);
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        alert('Không thể thêm nhân viên do lỗi hệ thống.');
    }
});
