
    document.querySelectorAll(".char-player").forEach(player => {
      const audio = player.querySelector("audio");
      const btn = player.querySelector(".char-play");
      const bar = player.querySelector(".progressBar");
      const timeDisplay = player.querySelector(".char-time");

      btn.addEventListener("click", () => {
        if (audio.paused) {
          // stop others
          document.querySelectorAll(".char-player audio").forEach(a => {
            if (a !== audio) {
              a.pause();
              a.currentTime = 0;
              const otherBtn = a.closest(".char-player").querySelector(".char-play");
              const otherBar = a.closest(".char-player").querySelector(".progressBar");
              const otherTime = a.closest(".char-player").querySelector(".char-time");
              if (otherBtn) otherBtn.textContent = "▶️";
              if (otherBar) otherBar.style.width = "0%";
              if (otherTime) otherTime.textContent = "0:00 / 0:00";
            }
          });
          audio.play();
        } else {
          audio.pause();
        }
      });

      audio.addEventListener("play", () => btn.textContent = "⏸️");
      audio.addEventListener("pause", () => btn.textContent = "▶️");

      audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
          const progress = (audio.currentTime / audio.duration) * 100;
          bar.style.width = progress + "%";
          updateTimeDisplay();
        }
      });

      audio.addEventListener("loadedmetadata", updateTimeDisplay);

      // 🔥 Reset when audio ends
      audio.addEventListener("ended", () => {
        btn.textContent = "▶️";
        bar.style.width = "0%";
        timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
        audio.currentTime = 0;
      });

      function updateTimeDisplay() {
        const cur = formatTime(audio.currentTime);
        const dur = formatTime(audio.duration);
        timeDisplay.textContent = `${cur} / ${dur}`;
      }

      function formatTime(sec) {
        if (!sec || isNaN(sec)) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
      }
    });