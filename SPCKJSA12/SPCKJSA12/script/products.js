/* ================================
   BẮT BUỘC ĐĂNG NHẬP
================================ */

const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    alert("Vui lòng đăng nhập để xem sách");
    window.location.href = "./login.html";
}

/* ================================
   LOAD DANH SÁCH SÁCH (FREE)
================================ */

async function loadBooks() {
    const listDiv = document.getElementById("product-list");
    listDiv.innerHTML = "<p>Đang tải sách miễn phí...</p>";

    // Từ khóa tìm kiếm (mặc định)
    const keyword = localStorage.getItem("searchKeyword") || "programming";

    try {
        const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(
                keyword
            )}&has_fulltext=true&public_scan=true&limit=50`
        );

        if (!response.ok) {
            throw new Error("API lỗi");
        }

        const data = await response.json();

        if (!data.docs || data.docs.length === 0) {
            listDiv.innerHTML =
                "<p style='color:red'>Không có sách miễn phí để hiển thị.</p>";
            return;
        }

        renderBookList(data.docs);

    } catch (error) {
        console.error(error);
        listDiv.innerHTML =
            "<p style='color:red'>Không tải được danh sách sách.</p>";
    }

    localStorage.removeItem("searchKeyword");
}

/* ================================
   HIỂN THỊ DANH SÁCH SÁCH
================================ */

function renderBookList(books) {
    const listDiv = document.getElementById("product-list");
    listDiv.innerHTML = "";

    books.forEach(book => {
        const title = book.title || "Không có tiêu đề";
        const authors = book.author_name
            ? book.author_name.join(", ")
            : "Không rõ";

        const coverId = book.cover_i;
        const image = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : "https://via.placeholder.com/128x180?text=No+Image";

        const workKey = book.key;

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="book-info">
                <h3>${title}</h3>
                <p><strong>Tác giả:</strong> ${authors}</p>
                <button onclick="showBookDetail('${workKey}')">
                    📖 Xem & Đọc
                </button>
            </div>
        `;

        listDiv.appendChild(card);
    });
}

/* ================================
   CHI TIẾT + ĐỌC SÁCH MIỄN PHÍ
================================ */

async function showBookDetail(key) {
    const detailDiv = document.getElementById("product-detail");
    detailDiv.innerHTML = "<p>Đang tải chi tiết sách...</p>";

    try {
        const response = await fetch(`https://openlibrary.org${key}.json`);
        const data = await response.json();

        const title = data.title || "Không có tiêu đề";
        const description =
            typeof data.description === "string"
                ? data.description
                : data.description?.value || "Không có mô tả";

        // Link đọc sách miễn phí OpenLibrary
        const readUrl = `https://openlibrary.org${key}/borrow`;

        detailDiv.innerHTML = `
            <div class="book-detail">
                <h2>${title}</h2>

                <p><strong>Mô tả:</strong></p>
                <p>${description}</p>

                <a href="${readUrl}" target="_blank" class="read-btn">
                    📚 Đọc sách miễn phí
                </a>
            </div>
        `;

        detailDiv.scrollIntoView({ behavior: "smooth" });

    } catch (error) {
        console.error(error);
        detailDiv.innerHTML =
            "<p style='color:red'>Không tải được chi tiết sách.</p>";
    }
}

/* ================================
   KHỞI CHẠY
================================ */

loadBooks();
