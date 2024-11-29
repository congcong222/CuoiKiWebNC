const apiUrl = 'https://localhost:7009/api/CongAPI';

const params = new URLSearchParams(window.location.search);
const id = params.get('masp');

async function fetchMenuData(id) {
    if (!id) {
        console.error('MaSp không tồn tại trong URL');
        return;
    }
    console.log('ID:', id);  // Kiểm tra giá trị ID
    try {
        const response = await fetch(apiUrl + '/SearchSanPham?id=' + id, {
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
            document.getElementById('msp').value = menuItem.masp;
            document.getElementById('tsp').value = menuItem.tensp;
            document.getElementById('sl').value = menuItem.soluongton;
            document.getElementById('xx').value = menuItem.xuatxu;
            document.getElementById('cxl').value = menuItem.chipxuly;
            document.getElementById('dlp').value = menuItem.dungluongpin;
            document.getElementById('ktm').value = menuItem.kichthuocman;
            document.getElementById('hdh').value = menuItem.hedieuhanh;
            document.getElementById('pbhdh').value = menuItem.phienbanhdh;
            document.getElementById('cs').value = menuItem.camerasau;
            document.getElementById('ct').value = menuItem.cameratruoc;
            document.getElementById('tgbh').value = menuItem.thoigianbaohanh;
            document.getElementById('th').value = menuItem.thuongHieus;
            document.getElementById('kvk').value = menuItem.khuvuckho;
            document.getElementById('tt').value = menuItem.trangthai;
            document.getElementById('ha').value = menuItem.hinhanh;
        } else {
            console.error('Không tìm thấy món ăn với ID:', id);
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }
}



document.getElementById('add').addEventListener('click', async () => {
    event.preventDefault();
    const newProduct = {
        masp: document.getElementById('msp').value,
        tensp: document.getElementById('tsp').value,
        hinhanh: document.getElementById('ha').value,
        xuatxu: document.getElementById('xx').value,
        chipxuly: document.getElementById('cxl').value,
        dungluongpin: document.getElementById('dlp').value,
        kichthuocman: document.getElementById('ktm').value,
        hedieuhanh: document.getElementById('hdh').value,
        phienbanhdh: document.getElementById('pbhdh').value,
        camerasau: document.getElementById('cs').value,
        cameratruoc: document.getElementById('ct').value,
        thoigianbaohanh: document.getElementById('tgbh').value,
        thuonghieu: document.getElementById('th').value,
        khuvuckho: document.getElementById('kvk').value,
        soluongton: document.getElementById('sl').value,
        trangthai: document.getElementById('tt').value
    };

    try {
        const response = await fetch(apiUrl + '/InsertSanPham', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct)
        });

        if (!response.ok) {
            const errorText = await response.text(); // Lấy thông báo lỗi từ phản hồi
            alert('Có lỗi xảy ra khi thêm sản phẩm: ' + errorText)
        }

        const result = await response.json();
        console.log('Sản phẩm đã được thêm:', result);

        // Có thể thêm logic để thông báo cho người dùng hoặc cập nhật giao diện
        window.location.href = '/Home/AdminProduct';
    } catch (error) {
        alert('Lỗi:' + error)
        // Xử lý lỗi và thông báo cho người dùng nếu cần
    }
});
const DanhSachThuongHieu = () => {
    // Lắng nghe sự kiện khi modal được hiển thị
    const addUserModal = document.getElementById('addUserModal');
    addUserModal.addEventListener('shown.bs.modal', async () => {
        const brandList = document.querySelector('ul[brandList]');

        try {
            const response = await fetch(apiUrl + '/ListThuongHieu');

            if (!response.ok) {
                throw new Error('Lỗi khi lấy dữ liệu: ' + response.statusText);
            }

            const brands = await response.json();

            // Xóa nội dung cũ trong danh sách
            brandList.innerHTML = '';

            // Thêm các thương hiệu vào danh sách
            brands.forEach(brand => {
                const li = document.createElement('li');
                li.textContent = brand;
                brandList.appendChild(li);
            });
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    });
};

// Gọi hàm DanhSachThuongHieu sau khi tài liệu đã được tải
document.addEventListener('DOMContentLoaded', () => {
    DanhSachThuongHieu();
});
document.getElementById('ThemThuongHieu').addEventListener('click', async function (event) {
    event.preventDefault();
    const newMenu = {
        mathuonghieu: document.getElementById('math').value,
        tenthuonghieu: document.getElementById('tenth').value,
        trangthai: document.getElementById('ttThuongHieu').value,
    };

    const response = await fetch(apiUrl + '/InsertThuongHieu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMenu)
    });

    if (response.ok) {
        alert("Thêm thành công")
        const modal = bootstrap.Modal.getInstance(addUserModal);
        modal.hide();
    } else {
        alert('Lỗi khi thêm thương hiệu!');
    }
});


document.getElementById('update').addEventListener('click', async function () {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const masp = params.get('masp');
    const updatedMenu = {
        masp: document.getElementById('msp').value,
        tensp: document.getElementById('tsp').value,
        hinhanh: document.getElementById('ha').value,
        xuatxu: document.getElementById('xx').value,
        chipxuly: document.getElementById('cxl').value,
        dungluongpin: document.getElementById('dlp').value,
        kichthuocman: document.getElementById('ktm').value,
        hedieuhanh: document.getElementById('hdh').value,
        phienbanhdh: document.getElementById('pbhdh').value,
        camerasau: document.getElementById('cs').value,
        cameratruoc: document.getElementById('ct').value,
        thoigianbaohanh: document.getElementById('tgbh').value,
        thuonghieu: document.getElementById('th').value,
        khuvuckho: document.getElementById('kvk').value,
        soluongton: document.getElementById('sl').value,
        trangthai: document.getElementById('tt').value
    };

    const response = await fetch(apiUrl + '/UpdateSanPham?masp=' + masp, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMenu)
    });

    if (response.ok) {
        alert('Cập nhật thành công!');
        window.location.href = '/Home/AdminProduct'; // Chuyển hướng về trang chính
    } else {
        const errorMessage = await response.text(); // Lấy thông báo lỗi từ phản hồi
        alert('Lỗi khi cập nhật món ăn!');
    }
});

fetchMenuData(id);
