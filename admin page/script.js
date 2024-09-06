// Tạo dữ liệu giả lập đủ 50 dòng để phân thành 10 trang
const tableData = [];
for (let i = 1; i <= 50; i++) {
    tableData.push({
        id: i,
        temperature: (Math.random() * 10 + 20).toFixed(1), // Random từ 20 đến 30°C
        humidity: (Math.random() * 20 + 40).toFixed(1), // Random từ 40% đến 60%
        light: Math.floor(Math.random() * 100) + 100 // Random từ 100 đến 200 LX
    });
}

const rowsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(tableData.length / rowsPerPage);

document.getElementById("totalPages").innerText = totalPages;

function displayTableData(page) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = tableData.slice(start, end);

    paginatedData.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.temperature}°C</td>
            <td>${row.humidity}%</td>
            <td>${row.light} LX</td>
        `;
        tableBody.appendChild(tr);
    });

    document.getElementById("pageNumber").innerText = page;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTableData(currentPage);
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        displayTableData(currentPage);
    }
}

// Khởi tạo hiển thị trang đầu tiên
window.onload = () => {
    displayTableData(currentPage);
};

// Tạo các nút bấm trang
function createPageButtons() {
    const pageButtonsContainer = document.getElementById("pageButtons");
    pageButtonsContainer.innerHTML = ""; // Xóa nội dung trước đó nếu có
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.onclick = () => {
            currentPage = i;
            displayTableData(currentPage);
        };
        pageButtonsContainer.appendChild(button);
    }
}

// Nhảy đến trang bất kỳ khi người dùng nhập số trang
function jumpToPage() {
    const pageNumber = parseInt(document.getElementById("jumpToPage").value);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPage = pageNumber;
        displayTableData(currentPage);
    } else {
        alert("Please enter a valid page number.");
    }
}

// Khởi tạo hiển thị trang đầu tiên và các nút trang
window.onload = () => {
    displayTableData(currentPage);
    createPageButtons();
};

let sortOrder = 'desc'; // Thứ tự sắp xếp mặc định: cao đến thấp

// Hàm sắp xếp bảng dựa trên thuộc tính
function sortTable() {
    const sortProperty = document.getElementById("sortSelect").value;
    if (!sortProperty) return; // Nếu không chọn thuộc tính, không làm gì cả

    // Chuyển đổi giữa thứ tự tăng dần và giảm dần
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

    tableData.sort((a, b) => {
        if (a[sortProperty] < b[sortProperty]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortProperty] > b[sortProperty]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    displayTableData(currentPage); // Cập nhật lại bảng sau khi sắp xếp
}

// Hàm tìm kiếm trong bảng
function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const filteredData = tableData.filter(row => {
        return (
            row.id.toString().includes(input) ||
            row.temperature.toString().toLowerCase().includes(input) ||
            row.humidity.toString().toLowerCase().includes(input) ||
            row.light.toString().toLowerCase().includes(input)
        );
    });

    displaySearchResults(filteredData); // Hiển thị kết quả tìm kiếm
}

// Hiển thị dữ liệu tìm kiếm
function displaySearchResults(data) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    data.slice(0, rowsPerPage).forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.temperature}°C</td>
            <td>${row.humidity}%</td>
            <td>${row.light} LX</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Khởi tạo bảng với dữ liệu mặc định
window.onload = () => {
    displayTableData(currentPage);
    createPageButtons();
};
