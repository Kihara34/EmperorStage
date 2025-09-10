const IMAGES_PER_PAGE = 10;
let currentPage = 1;
const MEMBERS_PER_PAGE = 10;
let memberPage = 1;

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

    for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
      const row = document.createElement("div");
      row.classList.add("gallery-row");

      for (let col = 0; col < 5; col++) {
        const imgIndex = rowIndex * 5 + col;
        if (imgIndex >= pageImages.length) break;

        const imgData = pageImages[imgIndex];
        const holder = document.createElement("div");
        holder.className = "image-holder";
        holder.onclick = () => preview(imgData.image);
        holder.innerHTML = `
        <img src="${imgData.image}" alt="">
        `;
        row.appendChild(holder);
      }

      container.appendChild(row);
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

function paginateMembers(items, page = 1) {
  const start = (page - 1) * MEMBERS_PER_PAGE;
  return items.slice(start, start + MEMBERS_PER_PAGE);
}

function updateMemberList() {
  const container = document.getElementById("memberGallery");
  const noResults = document.getElementById("noMemberResults");
  const countDisplay = document.getElementById("memberCountDisplay");
  container.innerHTML = "";

  const pageMembers = paginateMembers(members, memberPage);

  if (pageMembers.length === 0) {
    noResults.style.display = "block";
    countDisplay.textContent = "No members to display.";
  } else {
    noResults.style.display = "none";
    const start = (memberPage - 1) * MEMBERS_PER_PAGE + 1;
    const end = Math.min(start + MEMBERS_PER_PAGE - 1, members.length);
    countDisplay.textContent = `Showing ${start}–${end} of ${members.length} members`;

    pageMembers.forEach(member => {
      const holder = document.createElement("div");
      holder.className = "member-card"; 
      holder.onclick = () => window.location.href = member.page;
      holder.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <h4>${member.name}</h4>
      `;
      container.appendChild(holder);
    });
  }

  updateMemberPagination(members.length);
}
function updateMemberPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / MEMBERS_PER_PAGE);
  const container = document.getElementById("memberPagination");
  container.innerHTML = "";

  const createBtn = (text, page, isActive = false, disabled = false) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    if (isActive) btn.classList.add("active-page");
    if (!disabled) {
      btn.addEventListener("click", () => {
        memberPage = page;
        updateMemberList();
      });
    } else {
      btn.disabled = true;
    }
    return btn;
  };

  container.appendChild(createBtn("« First", 1, false, memberPage === 1));
  container.appendChild(createBtn("‹ Prev", memberPage - 1, false, memberPage === 1));

  for (let i = 1; i <= totalPages; i++) {
    container.appendChild(createBtn(i, i, i === memberPage));
  }

  container.appendChild(createBtn("Next ›", memberPage + 1, false, memberPage === totalPages));
  container.appendChild(createBtn("Last »", totalPages, false, memberPage === totalPages));
}

window.addEventListener("DOMContentLoaded", () => {
  updateGallery();
  updateMemberList();
});
