/* ===============================
   LOAD DANH SÁCH SÁCH
================================ */

async function loadBooks() {
    try {
        const response = await fetch(
            "https://www.googleapis.com/books/v1/volumes?q=programming"
        );
        const data = await response.json();

        console.log("Dữ liệu sách lấy được:", data.items);
        renderBookList(data.items);
    } catch (error) {
        console.error("Lỗi khi gọi API", error);
        document.getElementById("product-list").innerHTML =
            `<p style="color:red">Không tải được danh sách sách.</p>`;
    }
}

/* ===============================
   HIỂN THỊ DANH SÁCH SÁCH
================================ */

function renderBookList(books) {
    const listDiv = document.getElementById("product-list");
    listDiv.innerHTML = "";

    books.forEach(book => {
        const id = book.id;
        const info = book.volumeInfo;

        const title = info.title || "Không có tiêu đề";
        const authors = info.authors ? info.authors.join(", ") : "Không rõ";
        const image = info.imageLinks
            ? info.imageLinks.thumbnail
            : "https://via.placeholder.com/128x180?text=No+Image";

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${image}" alt="${title}">
            <div>
                <h3>${title}</h3>
                <p><strong>Tác giả:</strong> ${authors}</p>
                <button onclick="showBookDetail('${id}')">
                    Xem chi tiết
                </button>
            </div>
        `;

        listDiv.appendChild(card);
    });
}

/* ===============================
   XEM CHI TIẾT SÁCH
================================ */

async function showBookDetail(id) {
    const detailDiv = document.getElementById("product-detail");
    detailDiv.innerHTML = "<p>Đang tải chi tiết...</p>";

    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const book = await response.json();
        const info = book.volumeInfo;

        console.log("Chi tiết sách:", book);

        const title = info.title || "Không có tiêu đề";
        const authors = info.authors ? info.authors.join(", ") : "Không rõ";
        const publisher = info.publisher || "Không rõ";
        const publishedDate = info.publishedDate || "Không rõ";
        const description = info.description || "Không có mô tả";
        const image = info.imageLinks
            ? info.imageLinks.thumbnail
            : "https://via.placeholder.com/128x180?text=No+Image";

        detailDiv.innerHTML = `
            <div style="display:flex; gap:20px; align-items:flex-start;">
                <img src="${image}" alt="${title}">
                <div>
                    <h3>${title}</h3>
                    <p><strong>Tác giả:</strong> ${authors}</p>
                    <p><strong>NXB:</strong> ${publisher}</p>
                    <p><strong>Năm xuất bản:</strong> ${publishedDate}</p>
                    <p><strong>Mô tả:</strong></p>
                    <p>${description}</p>
                    <button onclick="alert('Tên sách: ${title}')">
                        Lấy dữ liệu từ API
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Lỗi khi gọi API chi tiết:", error);
        detailDiv.innerHTML =
            `<p style="color:red">Không tải được chi tiết sách.</p>`;
    }
}

/* ===============================
   CHẠY CHƯƠNG TRÌNH
================================ */

loadBooks();
