const apiUrl = 'https://localhost:7009/api/CongAPI';

// Hàm để lấy danh sách sản phẩm
async function fetchMenu() {
   
    const response = await fetch(apiUrl + '/ListSanPham');
    if (!response.ok) {
        console.error('Lỗi khi lấy dữ liệu:', response.status);
        return;
    }
    const menuList = await response.json();
    const tableBody = document.querySelector('#spTable tbody');

    // Xóa nội dung hiện tại của bảng
    tableBody.innerHTML = '';

    menuList.forEach(menu => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" /></td>
            <td>${menu.masp}</td>
            <td>${menu.tensp}</td>
            <td><img src="${menu.hinhanh}" width="80" height="50" alt="${menu.tensp}"></td>
            <td>${menu.soluongton}</td>
            <td style="color: ${menu.trangthai === 1 ? 'green' : 'red'};">${menu.trangthai === 1 ? 'Còn hàng' : 'Hết hàng'}</td>
            <td>${menu.thuongHieus}</td>
            <td>
                <button onclick="deleteMenu(${menu.masp})">Xóa</button>
                <button onclick="window.location.href='/Home/AdminAddProduct?masp=${menu.masp}'">Update</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
document.getElementById('selectAll').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('#tableBody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked; // Đồng bộ trạng thái checkbox
    });
});
async function deleteMenu(id) {
    const response = await fetch(apiUrl + '/DeleteSanPham?id=' + id, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchMenu(); // Cập nhật danh sách sau khi xóa
        document.getElementById('spTable').reset(); // Reset form
    } else {
        alert('Lỗi khi xóa món ăn!');
    }
}

document.getElementById('search').addEventListener('click', async () => {
    const id = document.getElementById('textSearch').value;
    await Search(id);
});

async function Search(id) {
    const response = await fetch(`${apiUrl}/SearchSanPham?id=${id}`);
    if (!response.ok) {
        console.error('Lỗi khi lấy dữ liệu:', response.status);
        return;
    }
    const product = await response.json();
    const tableBody = document.querySelector('#spTable tbody');

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
        <td>${product.masp}</td>
        <td>${product.tensp}</td>
        <td><img src="${product.hinhanh}" width="80" height="50" alt="${product.tensp}"></td>
        <td>${product.soluongton}</td>
        <td style="color: ${product.trangthai === 1 ? 'green' : 'red'};">${product.trangthai === 1 ? 'Còn hàng' : 'Hết hàng'}</td>
        <td>${product.ThuongHieu || 'N/A'}</td>
        <td>
            <button onclick="deleteMenu(${product.masp})">Xóa</button>
        </td>
    `;
    tableBody.appendChild(row);
}

// Gọi hàm fetchMenu để hiển thị danh sách khi trang được tải

fetchMenu();