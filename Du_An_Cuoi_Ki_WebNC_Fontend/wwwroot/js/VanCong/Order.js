const apiUrl = 'https://localhost:7009/api/CongAPI';

// Hàm để lấy danh sách món ăn
async function fetchMenu() {
    const response = await fetch(apiUrl + '/ListDonHang');
    if (!response.ok) {
        console.error('Lỗi khi lấy dữ liệu:', response.status);
        return;
    }

    const menuList = await response.json();
    console.log('Dữ liệu nhận được:', menuList); // Log dữ liệu nhận được

    const tableBody = document.querySelector('#OrderTable tbody');
    tableBody.innerHTML = '';

    menuList.forEach(menu => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" /></td>
            <td>${menu.maphieuxuat}</td>
            <td>${menu.khachHang}</td>
            <td>
                <select style="color: ${menu.trangthai === 2 ? 'green' : menu.trangthai === 0 ? 'red' : 'yellow'};" id="Ordertinhtrang">
                    <option value="0" style="color: red;" ${menu.trangthai === 0 ? 'selected' : ''}>Chưa duyệt</option>
                    <option value="1" style="color: yellow;" ${menu.trangthai === 1 ? 'selected' : ''}>Đang giao đơn</option>
                    <option value="2" style="color: green;" ${menu.trangthai === 2 ? 'selected' : ''}>Đã duyệt</option>
                </select>
            </td>
            <td>${menu.tongtien}</td>
            <td>${menu.thoigian}</td>
            <td>
                <button class="delete-button" onclick="deleteOrder(${menu.maphieuxuat})" style="padding: 5px 17px;">
                    Xóa
                </button>
             </td>
        `;
        tableBody.appendChild(row);


        // Thêm sự kiện change vào thẻ select
        const selectElement = row.querySelector('select');
        selectElement.addEventListener('change', async function () {
            const newValue = this.value;
            const confirmation = confirm('Bạn có muốn thay đổi trạng thái không?');

            if (confirmation) {
                // Gọi hàm cập nhật trạng thái
                window.location.reload();
                await updateStatus(menu.maphieuxuat, newValue);
            } else {
                // Nếu người dùng không xác nhận, khôi phục lại giá trị trước đó
                this.value = menu.trangthai; // Khôi phục giá trị cũ
            }
        });
    });
}
async function updateStatus(menuId, newStatus) {
    const response = await fetch(apiUrl + '/UpdateTinhTrangPhieuXuat?id=' + menuId, {
        method: 'PUT', // Hoặc PUT tùy vào API của bạn
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: menuId, trangthai: newStatus }),
    });

    if (!response.ok) {
        console.error('Lỗi khi cập nhật trạng thái:', response.status);
        return;
    }

    const result = await response.json();
    console.log('Trạng thái đã được cập nhật:', result);
    // Tải lại trang sau khi cập nhật thành công

}
async function deleteOrder(id) {
    const response = await fetch(apiUrl + '/DeletePhieuXuat?id=' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        fetchMenu(); // Cập nhật danh sách sau khi xóa
        document.getElementById('OrderTable').reset(); // Reset form
    } else {
        alert('Lỗi khi xóa món ăn!');
    }
}


//Search theo mã phiếu xuất

document.getElementById('search').addEventListener('click', async () => {
    const id = document.getElementById('textSearch').value;
    await Search(id);
});
document.getElementById('searchAll').addEventListener('click', async () => {
    fetchMenu();
});
document.getElementById('TimKiem').addEventListener('click', async () => {
    const tungay = document.getElementById('tungay').value;
    const denngay = document.getElementById('denngay').value;
    await SearchTheoNgay(tungay, denngay);
});



async function Search(id) {
    const response = await fetch(`${apiUrl}/SearchPhieuXuat?id=${id}`);
    if (!response.ok) {
        console.error('Lỗi khi lấy dữ liệu:', response.status);
        return;
    }
    const product = await response.json();
    const tableBody = document.querySelector('#OrderTable tbody');

    // Xóa nội dung hiện tại của bảng
    tableBody.innerHTML = '';

    if (!product) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="8">Không tìm thấy sản phẩm.</td>`;
        tableBody.appendChild(row);
        return;
    }

    // Tạo hàng mới cho sản phẩm
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="checkbox" /></td>
            <td>${product.maphieuxuat}</td>
            <td>${product.khachHang}</td>
            <td>
                <select style="color: ${product.trangthai === 2 ? 'green' : product.trangthai === 0 ? 'red' : 'yellow'};" id="Ordertinhtrang">
                    <option value="0" style="color: red;" ${product.trangthai === 0 ? 'selected' : ''}>Chưa duyệt</option>
                    <option value="1" style="color: yellow;" ${product.trangthai === 1 ? 'selected' : ''}>Đang giao đơn</option>
                    <option value="2" style="color: green;" ${product.trangthai === 2 ? 'selected' : ''}>Đã duyệt</option>
                </select>
            </td>
            <td>${product.tongtien}</td>
            <td>${product.thoigian}</td>
            <td>
                <button class="delete-button" onclick="deleteOrder(${product.maphieuxuat})" style="padding: 5px 17px;">
                    Xóa
                </button>
             </td>
    `;
    tableBody.appendChild(row);
    // Thêm sự kiện change vào thẻ select
    const selectElement = row.querySelector('select');
    selectElement.addEventListener('change', async function () {
        const newValue = this.value;
        const confirmation = confirm('Bạn có muốn thay đổi trạng thái không?');

        if (confirmation) {
            // Gọi hàm cập nhật trạng thái
            window.location.reload();
            await updateStatus(menu.maphieuxuat, newValue);
        } else {
            // Nếu người dùng không xác nhận, khôi phục lại giá trị trước đó
            this.value = menu.trangthai; // Khôi phục giá trị cũ
        }
    });
}



//Search theo ngày
async function SearchTheoNgay(tungay, denngay) {
    const response = await fetch(`${apiUrl}/SearchPhieuXuatTheoNgay?tungay=${tungay}&denngay=${denngay}`);

    if (!response.ok) {
        console.error('Lỗi khi lấy dữ liệu:', response.status);
        return;
    }

    const products = await response.json();

    const tableBody = document.querySelector('#OrderTable tbody');
    // Xóa nội dung hiện tại của bảng
    tableBody.innerHTML = '';

    if (!products || products.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="8">Không tìm thấy sản phẩm.</td>`;
        tableBody.appendChild(row);
        return;
    }

    // Tạo hàng mới cho từng sản phẩm
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" /></td>
            <td>${product.maphieuxuat}</td>
            <td>${product.khachHang}</td>
            <td>
                <select style="color: ${product.trangthai === 2 ? 'green' : product.trangthai === 0 ? 'red' : 'yellow'};" id="Ordertinhtrang">
                    <option value="0" style="color: red;" ${product.trangthai === 0 ? 'selected' : ''}>Chưa duyệt</option>
                    <option value="1" style="color: yellow;" ${product.trangthai === 1 ? 'selected' : ''}>Đang giao đơn</option>
                    <option value="2" style="color: green;" ${product.trangthai === 2 ? 'selected' : ''}>Đã duyệt</option>
                </select>
            </td>
            <td>${product.tongtien}</td>
            <td>${product.thoigian}</td>
            <td>
                <button class="delete-button" onclick="deleteOrder(${product.maphieuxuat})" style="padding: 5px 17px;">
                    Xóa
                </button>
            </td>
        `;
        tableBody.appendChild(row);
        // Thêm sự kiện change vào thẻ select
        const selectElement = row.querySelector('select');
        selectElement.addEventListener('change', async function () {
            const newValue = this.value;
            const confirmation = confirm('Bạn có muốn thay đổi trạng thái không?');

            if (confirmation) {
                // Gọi hàm cập nhật trạng thái
                window.location.reload();
                await updateStatus(menu.maphieuxuat, newValue);
            } else {
                // Nếu người dùng không xác nhận, khôi phục lại giá trị trước đó
                this.value = menu.trangthai; // Khôi phục giá trị cũ
            }
        });
    });
}


// Gọi hàm fetchMenu để hiển thị danh sách khi trang được tải
fetchMenu();