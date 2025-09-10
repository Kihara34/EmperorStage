function showTab(index) {
      const tabs = document.querySelectorAll('.tab-button');
      const contents = document.querySelectorAll('.tab-content');

      tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
        contents[i].classList.toggle('active', i === index);
      });
    }

function preview(src) {
  const box = document.querySelector(".preview-box");
  const img = document.getElementById("previewImg");

  img.src = src;
  img.classList.remove("zoomed");
  box.classList.remove("zoomed");
  box.style.display = "flex";


  const matched = images.find(item => src.includes(item.image));
  if (matched && matched.title) {
    img.setAttribute("data-title", matched.title);
  } else {
    img.setAttribute("data-title", "Character Page");
  }
}
    function hidePreview(event) {
      const box = document.querySelector(".preview-box");
      if (event.target.classList.contains("preview-box") || event.target.classList.contains("close")) {
        box.style.display = "none";
        box.classList.remove("zoomed");
        document.getElementById("previewImg").classList.remove("zoomed");
      }
    }

    function toggleZoom(event) {
      if (event.target.tagName.toLowerCase() === 'img') {
        const box = document.querySelector(".preview-box");
        const img = event.target;
        img.classList.toggle("zoomed");
        box.classList.toggle("zoomed");
      }
    }
function downloadStyledImage() {
  const img = document.getElementById("previewImg");
  if (!img || !img.src) return;

  const imageUrl = img.src;

  const matched = images.find(item => imageUrl.includes(item.image));
  const dynamicTitle = matched && matched.title ? matched.title : null;
  const pageTitle = dynamicTitle || document.title || "Character Page";
  const dynamicCredit = matched && matched.credit ? matched.credit : null;
  const metaCredit = document.querySelector('meta[name="credit"]')?.content || "";
  const imageCredit = dynamicCredit || metaCredit || "© kiraha-KK";
  const canvas = document.getElementById("hiddenCanvas") || (() => {
    const c = document.createElement("canvas");
    c.id = "hiddenCanvas";
    c.style.display = "none";
    document.body.appendChild(c);
    return c;
  })();
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.crossOrigin = "anonymous";

  image.onload = function () {
    const width = image.width;
    const height = image.height;
    const scaleW = width / 1920;
    const scaleH = height / 1080;
    const scale = Math.min(scaleW, scaleH);

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);

    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "bottom";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 4;
    
    const drawTextsAndDownload = () => {
      // Date (top-right)
      ctx.font = `bold ${Math.min(40 * scale, 40)}px Arial`;
      ctx.textAlign = "right";
      ctx.fillText(`Downloaded: ${new Date().toLocaleDateString("en-GB")}`, width - 40 * scale, 60 * scale);

      // Title (bottom-left)
      ctx.font = `bold ${Math.min(120 * scale, 120)}px Arial`;
      ctx.textAlign = "left";
      ctx.fillText(pageTitle, 60 * scale, height - 60 * scale);

      // Credit (bottom-right)
      ctx.font = `${Math.min(64 * scale, 64)}px Arial`;
      ctx.textAlign = "right";
      ctx.fillText(imageCredit, width - 60 * scale, height - 60 * scale);

      // Trigger download
      const link = document.createElement("a");
      link.download = `${pageTitle}_cover.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    // Logo handling
    const logo = new Image();
    logo.src = "UIUX/Logo.png";
    logo.onload = function () {
      let logoMaxHeight;
      if (height >= 900) {
        logoMaxHeight = height * 0.1; // 10% of image height
      } else {
        logoMaxHeight = 25; // fixed small logo for small images
      }

      const logoAspect = logo.width / logo.height;
      const logoW = logoMaxHeight * logoAspect;

      // Draw logo at 40px padding (fixed position)
      ctx.drawImage(logo, 40, 40, logoW, logoMaxHeight);

      // Now draw texts & download
      drawTextsAndDownload();
    };

    // If logo fails, still draw texts and download
    logo.onerror = function () {
      drawTextsAndDownload();
    };
  };

  // start loading the image (this must be last)
  image.src = imageUrl;
}

const img = document.getElementById("randomPic");
const rarePics = ["UIUX/b.png", "UIUX/c.png", "UIUX/d.png"];

if (Math.random() < 0.1) { 
  const newPic = rarePics[Math.floor(Math.random() * rarePics.length)];
  img.src = newPic;
}