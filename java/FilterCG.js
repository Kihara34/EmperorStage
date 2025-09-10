
let allCharacters = [];
let currentPage = 1;


const selectedTypes = new Set();
const selectedColors = new Set();
const selectedSpecies = new Set();
const selectedRarities = new Set();

const characters = [
{ name: "Senesis", type: "TGL", color: "yellow", species: "UDG", rarity: "legend", number: 1, page: "Senesis.html", image: "CHARS/Senesis/Images/PFP.png" },
{ name: "Luminance Tenkei", type: "#", color: "red", species: "VOCT", rarity: "epic", number: 2, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Stark", type: "#", color: "orange", species: "EMPR", rarity: "realm", number: 3, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Engel ", type: "#", color: "white", species: "ANGL", rarity: "epic", number: 4, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Ryo Ken", type: "#", color: "yellow", species: "ANTH", rarity: "epic", number: 5, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Jinn", type: "#", color: "green", species: "ROBT", rarity: "rare", number: 6, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Puiyumi Keiko", type: "#", color: "yellow", species: "DRAG", rarity: "common", number: 7, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Renny Anderson", type: "#", color: "purple", species: "DOLL", rarity: "epic", number: 8, page: "Renny.html", image: "UIUX/UnderConstruction.png" },
{ name: "Zhong Long/Naiga", type: "#", color: "yellow", species: "EMPR", rarity: "realm", number: 9, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "10K", type: "TOS", color: "black", species: "VOCT", rarity: "basic", number: 10, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Liam", type: "#", color: "pink", species: "DOLL", rarity: "legendary", number: 11, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Benjamin", type: "#", color: "green", species: "DOLL", rarity: "rare", number: 12, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Sacrina ", type: "#", color: "blue", species: "ANGL", rarity: "legend", number: 13, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Oleksiy", type: "#", color: "blue", species: "ANGL", rarity: "legend", number: 14, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Carter", type: "#", color: "white", species: "ANGL", rarity: "rare", number: 15, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Cammilie", type: "#", color: "orange", species: "HUMN", rarity: "basic", number: 16, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Quynella", type: "#", color: "orange", species: "HUMN", rarity: "basic", number: 17, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Mifuki Tenkei", type: "LCT", color: "red", species: "HUMN", rarity: "rare", number: 18, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Sia Noctilucent", type: "TGL", color: "blue", species: "SM", rarity: "epic", number: 19, page: "SiaNoctilucent.html", image: "CHARS/SiaNoctilucent/Images/PFP.png" },
{ name: "Myung Mulgogi", type: "#", color: "green", species: "DOLL", rarity: "rare", number: 21, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Cidd Gabrielle", type: "LCT", color: "green", species: "DOLL", rarity: "common", number: 22, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Mirror Witch", type: "#", color: "white", species: "WITCH", rarity: "rare", number: 23, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Aniela Britan", type: "#", color: "pink", species: "ANGL", rarity: "unatural", number: 24, page: "AnielaBritan.html", image: "CHARS/AnielaBritan/Images/pfp.png" },
{ name: "No430", type: "TOS", color: "red", species: "DEMN", rarity: "legend", number: 25, page: "No430.html", image: "CHARS/No430/Images/PFP.png" },
{ name: "Tenkei", type: "#", color: "black", species: "EMPR", rarity: "realm", number: 26, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Hatrex", type: "#", color: "blue", species: "EMPR", rarity: "realm", number: 27, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "TW", type: "LCT", color: "yellow", species: "WITCH", rarity: "realm", number: 28, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Timm Petra", type: "LCT", color: "pink", species: "ANTH", rarity: "epic", number: 30, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Lenti Lewis", type: "TOS", color: "blue", species: "ANGL", rarity: "epic", number: 34, page: "Lenti.html", image: "CHARS/LentiLewis/Images/PFP.png" },
{ name: "Thuy", type: "#", color: "blue", species: "DOLL", rarity: "unatural", number: 35, page: "#", image: "UIUX/UnderConstruction.png" },
{ name: "Thuu", type: "#", color: "pink", species: "DOLL", rarity: "rare", number: 36, page: "#", image: "UIUX/UnderConstruction.png" },

]


    function getCharactersPerPage() {
      return window.innerWidth <= 600 ? 25 : 28;
    }

    function getFilteredCharacters() {
      return allCharacters.filter(el => {
        const typeMatch = selectedTypes.size === 0 || selectedTypes.has(el.dataset.type);
        const colorMatch = selectedColors.size === 0 || selectedColors.has(el.dataset.color);
        const speciesMatch = selectedSpecies.size === 0 || selectedSpecies.has(el.dataset.species);
        const rarityMatch = selectedRarities.size === 0 || selectedRarities.has(el.dataset.rarity);
        return typeMatch && colorMatch && speciesMatch && rarityMatch;
      });
    }

    function paginateCharacters(chars, page = 1) {
      const start = (page - 1) * getCharactersPerPage();
      return chars.slice(start, start + getCharactersPerPage());
    }

function updateGallery() {
  const container = document.getElementById("characterGallery");
  container.innerHTML = "";

  const filtered = getFilteredCharacters();
  const sorted = filtered.sort((a, b) => parseInt(a.dataset.number) - parseInt(b.dataset.number));
  const pageChars = paginateCharacters(sorted, currentPage);

  pageChars.forEach(el => container.appendChild(el));

  updatePagination(filtered.length);


document.getElementById("characterCountDisplay").textContent =
  `Showing ${pageChars.length} (in this page) in ${filtered.length} (total)`;
}

    function updatePagination(totalItems) {
      const totalPages = Math.ceil(totalItems / getCharactersPerPage());
      const container = document.getElementById("pagination");
      container.innerHTML = "";

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active-page");
        btn.onclick = () => {
          currentPage = i;
          updateGallery();
        };
        container.appendChild(btn);
      }
    }

    function setupFilterButtons(containerId, dataKey, selectedSet) {
      const buttons = document.querySelectorAll(`#${containerId} .filter-btn`);
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          const value = btn.dataset[dataKey];
          if (selectedSet.has(value)) {
            selectedSet.delete(value);
            btn.classList.remove("active");
          } else {
            selectedSet.add(value);
            btn.classList.add("active");
          }
          currentPage = 1;
          updateGallery();
        });
      });
    }

    window.addEventListener("resize", updateGallery);

    window.addEventListener("DOMContentLoaded", () => {
      const gallery = document.getElementById("characterGallery");
      characters.forEach(char => {
        const div = document.createElement("div");
        div.className = "Ccontainer character";
        div.dataset.type = char.type;
        div.dataset.color = char.color;
        div.dataset.species = char.species;
        div.dataset.rarity = char.rarity;
        div.dataset.number = char.number;
        div.onclick = () => window.location.href = char.page;
        div.innerHTML = `
          <img src="${char.image}" alt="${char.name}">
          <h4 class="char-label">${char.name}</h4>
          <h4 class="char-number">${char.number}</h4>
        `;
        gallery.appendChild(div);
      });

      allCharacters = Array.from(gallery.querySelectorAll(".character"));
      allCharacters.sort((a, b) => parseInt(a.dataset.number) - parseInt(b.dataset.number));
      updateGallery();

      setupFilterButtons("typeButtons", "type", selectedTypes);
      setupFilterButtons("colorButtons", "color", selectedColors);
      setupFilterButtons("speciesButtons", "species", selectedSpecies);
      setupFilterButtons("rarityButtons", "rarity", selectedRarities);
    });