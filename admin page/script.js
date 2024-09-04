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
