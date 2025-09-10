const NEWS_PER_PAGE = 10;
let newsPage = 1;
let currentSort = "latest";

const newsPosts = [
  { title: "WELLCOME",image: "UIUX/Holder.png",date: "2024-06-01" ,
    content: "hi Kiraha here this is the very first realease version of the website,hope you will like it :), i will add more features and more projects soon , have a good day thanks for visit the website,If you have any idea or suggestion you can contact me through my social media accounts",
       },
];

function sortNews(posts, sortOrder) {
  return posts.slice().sort((a, b) => {
    return sortOrder === "latest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });
}

function paginateNews(items, page = 1) {
  const start = (page - 1) * NEWS_PER_PAGE;
  return items.slice(start, start + NEWS_PER_PAGE);
}

function updateNewsGallery() {
  const container = document.getElementById("newsGallery");
  container.innerHTML = "";

  const sortedNews = sortNews(newsPosts, currentSort);
  const pageNews = paginateNews(sortedNews, newsPage);

  pageNews.forEach(post => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.onclick = () => previewNews(post.image, post.title, post.content);
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="news-info">
        <h3>${post.title}</h3>
        <p>${post.content.slice(0, 80)}...</p>
      </div>
    `;
    container.appendChild(card);
  });

  updateNewsPagination(sortedNews.length);
}

function updateNewsPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / NEWS_PER_PAGE);
  const container = document.getElementById("newsPagination");
  container.innerHTML = "";

  const createBtn = (text, page, isActive = false, disabled = false) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    if (isActive) btn.classList.add("active-page");
    if (!disabled) {
      btn.addEventListener("click", () => {
        newsPage = page;
        updateNewsGallery();
      });
    } else {
      btn.disabled = true;
    }
    return btn;
  };

  container.appendChild(createBtn("« First", 1, false, newsPage === 1));
  container.appendChild(createBtn("‹ Prev", newsPage - 1, false, newsPage === 1));

  for (let i = 1; i <= totalPages; i++) {
    container.appendChild(createBtn(i, i, i === newsPage));
  }

  container.appendChild(createBtn("Next ›", newsPage + 1, false, newsPage === totalPages));
  container.appendChild(createBtn("Last »", totalPages, false, newsPage === totalPages));
}

function previewNews(imageSrc, title, content) {
  document.querySelector(".preview-box").style.display = "flex";
  document.getElementById("previewPoster").src = imageSrc;
  document.getElementById("previewTitle").textContent = title;
  document.getElementById("previewContent").textContent = content;
}

function hidePreview(event) {
  if (event.target.classList.contains("preview-box") || event.target.classList.contains("close")) {
    document.querySelector(".preview-box").style.display = "none";
  }
}

document.getElementById("sortSelect").addEventListener("change", function() {
  currentSort = this.value;
  newsPage = 1;
  updateNewsGallery();
});

window.addEventListener("DOMContentLoaded", updateNewsGallery);