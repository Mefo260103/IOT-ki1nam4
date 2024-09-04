// actionRecord.js

const recordsPerPage = 5;
let currentPage = 1;
let actionRecords = [];

// Function to add a new action record
function addActionRecord(device, action) {
    const currentTime = new Date().toLocaleString();
    const newRecord = {
        id: actionRecords.length + 1,
        device,
        action,
        time: currentTime
    };
    actionRecords.push(newRecord);
    updateTable();
}

// Function to update the table based on the current page
function updateTable() {
    const tableBody = document.querySelector("#action-record-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

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

    updatePagination();
}

// Function to update pagination information
function updatePagination() {
    const totalPages = Math.ceil(actionRecords.length / recordsPerPage);
    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;

    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

// Event listeners for pagination buttons
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(actionRecords.length / recordsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updateTable();
    }
});

// Example: Simulating interactions from the dashboard switches
document.addEventListener('DOMContentLoaded', () => {
    // Simulate adding actions (replace these with actual dashboard interactions)
    setTimeout(() => addActionRecord('Fan 1', 'ON'), 1000);
    setTimeout(() => addActionRecord('Lightbulb', 'OFF'), 2000);
    setTimeout(() => addActionRecord('Fan 2', 'ON'), 3000);
    setTimeout(() => addActionRecord('Fan 1', 'OFF'), 4000);
    setTimeout(() => addActionRecord('Lightbulb', 'ON'), 5000);
    setTimeout(() => addActionRecord('Fan 2', 'OFF'), 6000);
});
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
    updatePageButtons();
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

// Tạo các nút bấm chọn trang
function updatePageButtons() {
    const pageButtonsContainer = document.getElementById("pageButtons");
    pageButtonsContainer.innerHTML = ""; // Xóa các nút cũ

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add("active");
        }

        pageButton.addEventListener("click", () => {
            currentPage = i;
            displayTableData(currentPage);
        });

        pageButtonsContainer.appendChild(pageButton);
    }
}

// Khởi tạo hiển thị trang đầu tiên
window.onload = () => {
    displayTableData(currentPage);
};
