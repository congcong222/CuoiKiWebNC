const apiUrl = 'https://localhost:7009/api/ChienAPI';

async function fetchTaiKhoan() {
    try {
        const response = await fetch(apiUrl + '/List_taikhoan');
        if (!response.ok) {
            console.error('Lỗi khi lấy dữ liệu:', response.status);
            return;
        }

        const taikhoanList = await response.json();
        const tableBody = document.querySelector('#nvTable tbody');
        if (!tableBody) {
            console.error('Không tìm thấy phần tử tbody');
            return;
        }

        // Xóa nội dung hiện tại của bảng
        tableBody.innerHTML = '';

        // Lặp qua danh sách và thêm hàng vào bảng
        taikhoanList.forEach(nv => {
            const trangThaiText = nv.trangthai === 1
                ? '<span style="color: green; font-weight: bold;"><i class="fas fa-circle" style="font-size: 10px; margin-right: 5px;"></i>Hoạt động</span>'
                : '<span style="color: red; font-weight: bold;"><i class="fas fa-times-circle" style="font-size: 12px; margin-right: 5px;"></i>Hạn chế</span>';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" class="row-checkbox" data-id="${nv.makh}" /></td>
                <td>${nv.makh}</td>
                <td>${nv.tendangnhap}</td>
                <td>${nv.matkhau}</td>
                <td>${trangThaiText}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
}

async function applyAction() {
    const selectedAction = document.getElementById('actionSelect').value;
    if (!selectedAction) {
        alert('Vui lòng chọn thao tác!');
        return;
    }

    const selectedCheckboxes = document.querySelectorAll('#nvTable tbody input[type="checkbox"]:checked');
    if (selectedCheckboxes.length === 0) {
        alert('Vui lòng chọn ít nhất một tài khoản!');
        return;
    }

    // Lấy ID tài khoản được chọn
    const selectedId = selectedCheckboxes[0].getAttribute('data-id'); // Chỉ lấy tài khoản đầu tiên được chọn

    if (!selectedId || isNaN(selectedId) || selectedId <= 0) {
        alert('Mã tài khoản không hợp lệ!');
        return;
    }

    // Lấy các giá trị từ tbody (ví dụ như tên đăng nhập, mật khẩu, trạng thái)
    const row = selectedCheckboxes[0].closest('tr');
    const tendangnhap = row.querySelector('td:nth-child(3)').innerText;
    const matkhau = row.querySelector('td:nth-child(4)').innerText;
    const trangthai = selectedAction === 'restrict' ? 0 : 1;

    // Gửi yêu cầu cập nhật lên API
    try {
        const response = await fetch(apiUrl + '/Update_taikhoan', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                makh: selectedId, // Truyền ID tài khoản
                tendangnhap: tendangnhap, // Truyền tên đăng nhập
                matkhau: matkhau, // Truyền mật khẩu
                trangthai: trangthai // Truyền trạng thái (hoạt động / hạn chế)
            })
        });

        if (!response.ok) {
            throw new Error('Lỗi khi cập nhật tài khoản!');
        }

        alert('Cập nhật tài khoản thành công!');
        fetchTaiKhoan(); // Làm mới danh sách tài khoản
    } catch (error) {
        console.error('Lỗi khi cập nhật tài khoản:', error);
        alert('Cập nhật tài khoản thất bại!');
    }
}



// Gọi hàm để hiển thị danh sách tài khoản khi trang được tải
fetchTaiKhoan();
