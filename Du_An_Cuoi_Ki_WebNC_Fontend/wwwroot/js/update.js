const apiUrl = 'https://localhost:7009/api/CongAPI';

// Lấy ID món ăn từ URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function fetchMenuData(id) {
    if (!id) {
        console.error('ID không tồn tại trong URL');
        return;
    }
    console.log('ID:', id);  // Kiểm tra giá trị ID
    try {
        const response = await fetch(apiUrl + '/ListId?id=' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error('Lỗi khi lấy dữ liệu:', response.status);
            return;
        }
        const menuItem = await response.json();

        if (menuItem) {
            // Cập nhật các trường nhập liệu với dữ liệu từ API
            document.getElementById('idmon').value = menuItem.idmon;
            document.getElementById('tenmon').value = menuItem.tenmon;
            document.getElementById('donvitinh').value = menuItem.donvitinh;
            document.getElementById('dongia').value = menuItem.dongia;
            document.getElementById('soluong').value = menuItem.soluong;
            document.getElementById('mota').value = menuItem.mota;
            document.getElementById('hinhanh').value = menuItem.hinhanh;
        } else {
            console.error('Không tìm thấy món ăn với ID:', id);
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }
}


// Xử lý sự kiện submit
document.getElementById('updateMenuForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const idmon = document.getElementById('idmon').value;


    const updatedMenu = {
        IDMON: idmon,
        tenmon: document.getElementById('tenmon').value,
        donvitinh: document.getElementById('donvitinh').value,
        dongia: parseFloat(document.getElementById('dongia').value),
        soluong: parseFloat(document.getElementById('soluong').value),
        mota: document.getElementById('mota').value,
        hinhAnh: document.getElementById('hinhanh').value
    };

    const response = await fetch(apiUrl + '/Update?id=' + idmon, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMenu)
    });

    if (response.ok) {
        alert('Cập nhật thành công!');
        window.location.href = '/Home/Index'; // Chuyển hướng về trang chính
    } else {
        const errorMessage = await response.text(); // Lấy thông báo lỗi từ phản hồi
        alert('Lỗi khi cập nhật món ăn!');
    }
});
fetchMenuData(id);