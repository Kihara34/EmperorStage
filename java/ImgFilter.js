const IMAGES_PER_PAGE = 20;
let currentPage = 1;

function paginate(items, page = 1) {
  const start = (page - 1) * IMAGES_PER_PAGE;
  return items.slice(start, start + IMAGES_PER_PAGE);
}

function updateGallery() {
  const container = document.getElementById("imageGallery");
  const noResults = document.getElementById("noResults");
  const countDisplay = document.getElementById("imageCountDisplay");
  container.innerHTML = "";

  const sortedImages = [...images].sort((a, b) => new Date(b.date) - new Date(a.date));
  const pageImages = paginate(sortedImages, currentPage);

  if (pageImages.length === 0) {
    noResults.style.display = "block";
    countDisplay.textContent = "Nothing here sadly.";
  } else {
    noResults.style.display = "none";
    const start = (currentPage - 1) * IMAGES_PER_PAGE + 1;
    const end = Math.min(start + IMAGES_PER_PAGE - 1, sortedImages.length);
    countDisplay.textContent = `Showing ${start}–${end} of ${sortedImages.length} images`;

    let rowIndex = 0;
    let i = 0;
    while (i < pageImages.length) {
      const row = document.createElement("div");
      row.classList.add("gallery-row");

      const isThree = rowIndex % 2 === 0;
      row.classList.add(isThree ? "three" : "one");
      const itemsInRow = isThree ? 3 : 1;

      for (let j = 0; j < itemsInRow && i < pageImages.length; j++, i++) {
        const imgData = pageImages[i];
        const holder = document.createElement("div");
        holder.className = "image-holder";
        holder.onclick = () => preview(imgData.image);
        holder.innerHTML = `
          <img src="${imgData.image}" alt="${imgData.title}">
          <div class="image-info">
            <div class="title">${imgData.title}</div>
            <div class="date">Added: ${imgData.date}</div>
          </div>
        `;
        row.appendChild(holder);
      }

      container.appendChild(row);
      rowIndex++;
    }
  }

  updatePagination(sortedImages.length);
}

function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / IMAGES_PER_PAGE);
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  const createBtn = (text, page, isActive = false, disabled = false) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    if (isActive) btn.classList.add("active-page");
    if (!disabled) {
      btn.addEventListener("click", () => {
        currentPage = page;
        updateGallery();
      });
    } else {
      btn.disabled = true;
    }
    return btn;
  };

  container.appendChild(createBtn("« First", 1, false, currentPage === 1));
  container.appendChild(createBtn("‹ Prev", currentPage - 1, false, currentPage === 1));

  for (let i = 1; i <= totalPages; i++) {
    container.appendChild(createBtn(i, i, i === currentPage));
  }

  container.appendChild(createBtn("Next ›", currentPage + 1, false, currentPage === totalPages));
  container.appendChild(createBtn("Last »", totalPages, false, currentPage === totalPages));
}

window.addEventListener("DOMContentLoaded", () => {
  updateGallery();
});
