const apiUrl = 'https://localhost:7009/api/CongAPI';

// Hàm để lấy danh sách món ăn
async function fetchMenu() {
    const response = await fetch(apiUrl + '/List');
    if (!response.ok) {
        console.error('Lỗi khi lấy dữ liệu:', response.status);
        return;
    }
    const menuList = await response.json();
    const tableBody = document.querySelector('#menuTable tbody');

    // Xóa nội dung hiện tại của bảng
    tableBody.innerHTML = '';

    menuList.forEach(menu => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${menu.idmon}</td>
            <td>${menu.tenmon}</td>
            <td>${menu.donvitinh}</td>
            <td>${menu.dongia}</td>
            <td>${menu.soluong}</td>
            <td>${menu.mota}</td>
            <td><img src="${menu.hinhanh}" width="50" alt="${menu.tenmon}"></td>
            <td>
                <button onclick="deleteMenu(${menu.idmon})">Xóa</button>
                <button onclick="window.location.href='/Home/Update?id=${menu.idmon}'">Update</button>  
            </td>
        `;
        tableBody.appendChild(row);
    });
}
// Hàm để thêm món ăn
document.getElementById('addMenuForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const newMenu = {
        tenmon: document.getElementById('tenMon').value,
        donvitinh: document.getElementById('donViTinh').value,
        dongia: parseFloat(document.getElementById('donGia').value),
        soluong: parseFloat(document.getElementById('soLuong').value),
        mota: document.getElementById('moTa').value,
        hinhAnh: document.getElementById('hinhAnh').value
    };

    const response = await fetch(apiUrl + '/Insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMenu)
    });

    if (response.ok) {
        fetchMenu(); // Cập nhật danh sách sau khi thêm
        document.getElementById('addMenuForm').reset(); // Reset form
    } else {
        alert('Lỗi khi thêm món ăn!');
    }
});

// Hàm để xóa món ăn
async function deleteMenu(id) {
    const response = await fetch(apiUrl + '/Delete?id=' + id, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchMenu(); // Cập nhật danh sách sau khi xóa
        document.getElementById('addMenuForm').reset(); // Reset form
    } else {
        alert('Lỗi khi xóa món ăn!');
    }
}

// Gọi hàm fetchMenu để hiển thị danh sách khi trang được tải
fetchMenu();