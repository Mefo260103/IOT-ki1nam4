// Số bản ghi trên mỗi trang
const recordsPerPage = 5; 
let currentPage = 1; // Trang hiện tại
let actionRecords = []; // Dữ liệu hành động

// Tạo dữ liệu giả lập đủ 50 dòng
for (let i = 1; i <= 50; i++) {
    const device = i % 3 === 0 ? "Lightbulb" : i % 2 === 0 ? "Fan 2" : "Fan 1";
    const action = i % 2 === 0 ? "ON" : "OFF";
    const time = `2024-09-01 ${(Math.floor(Math.random() * 24)).toString().padStart(2, '0')}:${(Math.floor(Math.random() * 60)).toString().padStart(2, '0')}:${(Math.floor(Math.random() * 60)).toString().padStart(2, '0')}`;
    
    actionRecords.push({
        id: i,
        device: device,
        action: action,
        time: time
    });
}

// Cập nhật bảng hiển thị
function updateTable() {
    const tableBody = document.querySelector("#action-record-table tbody");
    tableBody.innerHTML = ""; // Xóa bảng hiện tại

    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const paginatedRecords = actionRecords.slice(start, end);

    paginatedRecords.forEach(record => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.device}</td>
            <td>${record.action}</td>
            <td>${record.time}</td>
        `;
    });

    updatePagination(); // Cập nhật thông tin phân trang
}

// Cập nhật nút phân trang và thông tin
function updatePagination() {
    const totalPages = Math.ceil(actionRecords.length / recordsPerPage);
    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;

    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;

    createPageButtons(totalPages); // Tạo các nút nhảy trang nhanh
}

// Tạo các nút nhảy trang nhanh
function createPageButtons(totalPages) {
    const pageButtonsContainer = document.getElementById("pageButtons");
    pageButtonsContainer.innerHTML = ""; // Xóa nội dung trước đó

    // Tạo các nút cho các trang từ 1 đến totalPages
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.onclick = () => {
            currentPage = i;
            updateTable(); // Cập nhật bảng hiển thị khi nhảy trang
        };
        pageButtonsContainer.appendChild(button);
    }
}

// Nhảy đến trang khi nhập số
function jumpToPage() {
    const pageNumber = parseInt(document.getElementById("jumpToPage").value);
    const totalPages = Math.ceil(actionRecords.length / recordsPerPage); // Tổng số trang
    
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPage = pageNumber;
        updateTable(); // Cập nhật bảng hiển thị
    } else {
        alert("Please enter a valid page number.");
    }
}

// Chuyển sang trang trước
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
}

// Chuyển sang trang sau
function nextPage() {
    const totalPages = Math.ceil(actionRecords.length / recordsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updateTable();
    }
}

// Khởi tạo hiển thị trang đầu tiên và tạo các nút trang
window.onload = () => {
    updateTable();
    createPageButtons(Math.ceil(actionRecords.length / recordsPerPage));
};
// Tìm kiếm và sắp xếp dữ liệu
let searchQuery = ""; // Giá trị tìm kiếm hiện tại
let filterKey = "id"; // Khóa lọc hiện tại

// Lọc và sắp xếp dữ liệu theo khóa
function filterAndSortData() {
    const filteredRecords = actionRecords.filter(record => {
        return record[filterKey].toString().toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Sắp xếp dữ liệu từ lớn đến nhỏ
    filteredRecords.sort((a, b) => {
        if (a[filterKey] < b[filterKey]) return 1;
        if (a[filterKey] > b[filterKey]) return -1;
        return 0;
    });

    return filteredRecords;
}

// Cập nhật bảng hiển thị dựa trên tìm kiếm và sắp xếp
function updateTable() {
    const tableBody = document.querySelector("#action-record-table tbody");
    tableBody.innerHTML = ""; // Xóa bảng hiện tại

    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const paginatedRecords = filterAndSortData().slice(start, end);

    paginatedRecords.forEach(record => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.device}</td>
            <td>${record.action}</td>
            <td>${record.time}</td>
        `;
    });

    updatePagination(); // Cập nhật thông tin phân trang
}

// Bắt sự kiện thay đổi giá trị tìm kiếm
document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
    updateTable();
});

// Bắt sự kiện thay đổi giá trị dropdown
document.getElementById('filterDropdown').addEventListener('change', (e) => {
    filterKey = e.target.value;
    currentPage = 1; // Reset về trang đầu tiên khi đổi tiêu chí lọc
    updateTable();
});

// Khởi tạo trang đầu tiên
window.onload = () => {
    updateTable();
};
