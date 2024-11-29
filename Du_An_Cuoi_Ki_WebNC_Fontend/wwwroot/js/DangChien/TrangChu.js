const apiUrl = 'https://localhost:7009/api/ChienAPI';
async function fetchNhanvien() {
    try {
        const response = await fetch(apiUrl + '/List');
        if (!response.ok) {
            console.error('Lỗi khi lấy dữ liệu:', response.status);
            return;
        }

        const nhanvienList = await response.json();
        console.log('Danh sách nhân viên:', nhanvienList);
        const tableBody = document.querySelector('#nvTable tbody');
        if (!tableBody) {
            console.error('Không tìm thấy phần tử tbody');
        }

        // Xóa nội dung hiện tại của bảng
        tableBody.innerHTML = '';

        // Lặp qua danh sách nhân viên và tạo các hàng bảng
        nhanvienList.forEach(nv => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${nv.manv}</td>
                <td>${nv.hoten}</td>
                <td>${nv.gioitinh}</td>
                <td>${nv.ngaysinh}</td>
                <td>${nv.sdt}</td>
                <td>${nv.email}</td>
                <td>${nv.trangthai}</td>
                <td>
                    <i class="fas fa-edit" style="color: #4CAF50; cursor: pointer;" onclick="window.location.href='../../Home/Update?id=${nv.manv}&hoten=${encodeURIComponent(nv.hoten)}&email=${encodeURIComponent(nv.email)}&sdt=${nv.sdt}&gioitinh=${nv.gioitinh}&ngaysinh=${nv.ngaysinh}&trangthai=${nv.trangthai}'"></i>
                    <i class="fas fa-trash-alt" style="color: #f44336; cursor: pointer; margin-left: 10px;" onclick="deleteNhanvien(${nv.manv})"></i>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
}

// Hàm để xóa món ăn
async function deleteNhanvien(id) {
    // Hiển thị dialog xác nhận
    const isConfirmed = confirm('Bạn có chắc chắn muốn xóa nhân viên này không?');

    if (isConfirmed) {
        try {
            const response = await fetch(apiUrl + '/Delete?id=' + id, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Xóa nhân viên thành công!');
                fetchNhanvien(); // Cập nhật danh sách sau khi xóa
            } else {
                const errorMessage = await response.text();
                alert('Lỗi khi xóa nhân viên: ' + errorMessage);
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            alert('Không thể xóa nhân viên do lỗi hệ thống.');
        }
    } else {
        // Người dùng chọn "Cancel"
        alert('Hủy bỏ thao tác xóa.');
    }
}
// Hàm tìm kiếm

function searchNhanvien() {
    const searchInput = document.getElementById('searchInput').value.trim(); // Lấy mã nhân viên từ input
    const table = document.getElementById('nvTable'); // Lấy bảng nhân viên
    const rows = table.querySelectorAll('tbody tr'); // Lấy tất cả các hàng trong tbody

    // Nếu không nhập gì, hiển thị lại tất cả các hàng
    if (!searchInput) {
        rows.forEach(row => {
            row.style.display = ''; // Hiển thị lại
        });
        return;
    }

    // Duyệt qua từng hàng và kiểm tra mã nhân viên
    rows.forEach(row => {
        const manvCell = row.querySelector('td:first-child'); // Lấy ô chứa mã nhân viên
        const manv = manvCell ? manvCell.textContent.trim() : ''; // Lấy giá trị mã nhân viên
        if (manv === searchInput) {
            row.style.display = ''; // Hiển thị nếu mã khớp
        } else {
            row.style.display = 'none'; // Ẩn nếu không khớp
        }
    });
}
// Gọi hàm fetchMenu để hiển thị danh sách khi trang được tải
fetchNhanvien();