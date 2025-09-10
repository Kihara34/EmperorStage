const playlistTracks = {
  playlist1: ['music/chill/chill1.mp3',],
  playlist2: ['music/song2.mp3',],
  playlist3: ['music/song3.mp3']
};

const themes = {
  blue: {
    '--text-color': '#DFDFDF',
    '--primary-color': '#868E96',
    '--secondary-color': '#2F3643',
    '--bg-color': '#0D131C',
    '--hover-color': '#0F61B8',
    '--accent-color': '#32AAFF',
    img: 'UIUX/10k_icon/blue.png'
  },
  red: {
    '--text-color': '#D9D9D9',
    '--primary-color': '#A3AFAD',
    '--secondary-color': '#595E67',
    '--bg-color': '#24272C',
    '--hover-color': '#189D88',
    '--accent-color': '#B11B1D',
    img: 'UIUX/10k_icon/red.png'
  },
  yellow: {
    '--text-color': '#DAC9A7',
    '--primary-color': '#EFBB2B',
    '--secondary-color': '#7C5B37',
    '--bg-color': '#5C2D0F',
    '--hover-color': '#20140F',
    '--accent-color': '#030301ff',
    img: 'UIUX/10k_icon/yellow.png'
  },
  green: {
    '--text-color': '#E6D7C4',
    '--primary-color': '#CFBB9A',
    '--secondary-color': '#a5b364ff',
    '--bg-color': '#74a02dff',
    '--hover-color': '#36898bff',
    '--accent-color': '#2e8d46ff',
    img: 'UIUX/10k_icon/green.png'
  },
  LT: {
    '--text-color': '#B8BDCC ',
    '--primary-color': '#4F5AA2',
    '--secondary-color': '#6272CD',
    '--bg-color': '#413755',
    '--hover-color': '#76C5CA ',
    '--accent-color': '#D873B7',
    img: 'UIUX/10k_icon/LT.png'
  },
  HnC: {
    '--text-color': '#208ea1ff',
    '--primary-color': '#234052ff',
    '--secondary-color': '#acbec9ff',
    '--bg-color': '#e0e0e0ff',
    '--hover-color': '#a3b69aff',
    '--accent-color': '#78a09eff',
    img: 'UIUX/10k_icon/HnC.png'
  },
  ToF: {
    '--text-color': '#ff0000ff',
    '--primary-color': '#ffbb00ff',
    '--secondary-color': '#d0ff00ff',
    '--bg-color': '#2f00ffff',
    '--hover-color': '#00fbffff',
    '--accent-color': '#ea00ffff',
    img: 'UIUX/10k_icon/ToS.png'
  }
  
};
const playlistImages = {
  playlist1: "#",
  playlist2: "#",
  playlist3: "#"
};
const idleImages = [
  'UIUX/10k_icon/HnC.png',
  'UIUX/10k_icon/red.png'
];


// STATE
let audio = document.getElementById("audioPlayer");
let currentPlaylist = [];
let currentTrackIndex = 0;
let isPlaying = false;
let repeatMode = false;
let isMuted = false;
let chatSound = document.getElementById("bubbleAudio");
let idleIndex = 0;
let idleInterval, chatTimeout, interactTimeout;
let isInteracting = false;

// THEME
function applyTheme(name) {
  if (name === 'default') {
    localStorage.removeItem('theme');
    resetThemeToRoot();
    showBubbleMessage("Theme reset!");
    updateCharacterImage();
    return;
  }
  localStorage.setItem('theme', name);
  const vars = themes[name];
  for (const key in vars) {
    if (key !== 'img') document.documentElement.style.setProperty(key, vars[key]);
  }
  showBubbleMessage(`Applied ${name}`);
  updateCharacterImage();
}
function resetThemeToRoot() {
  for (let key in themes.blue) {
    if (key.startsWith('--')) {
      document.documentElement.style.removeProperty(key);
    }
  }
}
function playMusic(name) {
  localStorage.setItem('playlist', name);
  currentPlaylist = playlistTracks[name];
  currentTrackIndex = 0;
  localStorage.setItem("trackIndex", "0");
  playCurrentSong();
  document.getElementById("musicBox").style.display = "block";
  updateCharacterImage();

  showBubbleMessage(`Now playing ${name}`);
}
function playCurrentSong() {
  const src = currentPlaylist[currentTrackIndex];
  audio.src = src;
  audio.play();
  isPlaying = true;
  document.getElementById("playPauseBtn").textContent = "⏸️";

  const song = src.split('/').pop().replace('.mp3', '');
  document.getElementById("nowPlaying").textContent = "Now Playing:" + song;

  localStorage.setItem("trackIndex", currentTrackIndex);


  showBubbleMessage(`Now playing: ${song}`);
}
function updateNowPlayingTitle() {
  const song = currentPlaylist[currentTrackIndex].split('/').pop().replace('.mp3', '');
  document.getElementById("nowPlaying").textContent = "Now Playing: " + song;
}
function stopMusic() {
  localStorage.removeItem('playlist');
  localStorage.removeItem('trackIndex');
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;

  document.getElementById("nowPlaying").textContent = "Now Playing: None";
  document.getElementById("musicBox").style.display = "none";
  updateCharacterImage();

  showBubbleMessage("Stopped the playlist");
}
function nextSong() {
  if (!currentPlaylist.length) return;
  currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
  playCurrentSong();
}
function prevSong() {
  if (!currentPlaylist.length) return;
  currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  playCurrentSong();
}
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    document.getElementById("playPauseBtn").textContent = "▶️";
  } else {
    audio.play();
    isPlaying = true;
    document.getElementById("playPauseBtn").textContent = "⏸️";
  }
}
function toggleRepeat() {
  repeatMode = !repeatMode;
  document.getElementById("repeatBtn").textContent = repeatMode ? "🔂" : "🔁";
}
function toggleMute() {
  isMuted = !isMuted;
  audio.muted = isMuted;
  document.getElementById("muteBtn").textContent = isMuted ? "🔇" : "🔊";
}
audio.addEventListener("ended", () => {
  if (repeatMode) {
    playCurrentSong();
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
    playCurrentSong();
  }
});
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;
  updateTimeDisplay();
});
function updateTimeDisplay() {
  const current = formatTime(audio.currentTime);
  const duration = formatTime(audio.duration);
  document.getElementById("timeDisplay").textContent = `${current} / ${duration}`;
}
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}


function updateCharacterImage() {
  const playlist = localStorage.getItem("playlist");
  const theme = localStorage.getItem("theme");
  const character = document.getElementById("characterImg");

  if (playlist && playlistImages[playlist]) {
    character.src = playlistImages[playlist];  // Playlist-specific image
  } else if (theme && themes[theme]) {
    character.src = themes[theme].img || "UIUX/10k's/Default.png";
  } else {
    character.src = "UIUX/10k.png";  
  }
}

function onCharacterClick() {
  isInteracting = true;
  clearTimeout(interactTimeout);
  chatSound.currentTime = 0;
  chatSound.play();
  showBubbleMessage("Ouchie!!");
  toggleMenu();
  interactTimeout = setTimeout(() => isInteracting = false, 6000);
}

function toggleMenu() {
  const menu = document.getElementById("characterMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function showBubbleMessage(message) {
  const bubble = document.getElementById("chatBubble");
  bubble.classList.remove("bubble-pop-out", "hidden");
  bubble.classList.add("bubble-pop-in");
  bubble.textContent = "";
  chatSound.currentTime = 0;
  chatSound.play();

  let i = 0;
  function type() {
    if (i < message.length) {
      bubble.textContent += message.charAt(i++);
      setTimeout(type, 30);
    }
  }
  type();

  clearTimeout(chatTimeout);
  chatTimeout = setTimeout(() => {
    bubble.classList.remove("bubble-pop-in");
    bubble.classList.add("bubble-pop-out");
    setTimeout(() => {
      bubble.classList.add("hidden");
      chatSound.pause();
    }, 400);
  }, 4000);
}

function startIdleAnimation() {
  idleInterval = setInterval(() => {
    if (!isInteracting) {
      const img = document.getElementById("characterImg");
      img.src = idleImages[idleIndex];
      idleIndex = (idleIndex + 1) % idleImages.length;
    }
  }, 10000 + Math.random() * 5000);
}


document.querySelectorAll(".char-player").forEach(player => {
  const audio = player.querySelector("audio");
  const btn = player.querySelector(".char-play");
  const bar = player.querySelector(".progressBar");
  const timeDisplay = player.querySelector(".char-time");

  btn.addEventListener("click", () => {
    if (audio.paused) {
      // stop other audios
      document.querySelectorAll(".char-player audio").forEach(a => {
        if (a !== audio) {
          a.pause();
          a.currentTime = 0;
          a.closest(".char-player").querySelector(".progressBar").style.width = "0%";
        }
      });
      audio.play().catch(err => console.log("Play blocked:", err));
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => { btn.textContent = "⏸️"; });
  audio.addEventListener("pause", () => { btn.textContent = "▶️"; });

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      bar.style.width = progress + "%";
      updateTimeDisplay();
    }
  });

  audio.addEventListener("loadedmetadata", updateTimeDisplay);

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


window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) applyTheme(savedTheme);

  const savedPlaylist = localStorage.getItem("playlist");
  const savedIndex = parseInt(localStorage.getItem("trackIndex") || "0", 10);

  if (savedPlaylist && playlistTracks[savedPlaylist]) {
    currentPlaylist = playlistTracks[savedPlaylist];
    currentTrackIndex = savedIndex || 0;
    audio.src = currentPlaylist[currentTrackIndex];

    setTimeout(() => {
      audio.play().then(() => {
        isPlaying = true;
        updateNowPlayingTitle();
        document.getElementById("musicBox").style.display = "block";
        document.getElementById("playPauseBtn").textContent = "⏸️";
      }).catch(() => {
        updateNowPlayingTitle();
        document.getElementById("musicBox").style.display = "block";
        document.getElementById("playPauseBtn").textContent = "▶️";
      });
    }, 1000);
  } else {
    document.getElementById("musicBox").style.display = "none";
  }

  updateCharacterImage();
  startIdleAnimation();
  showBubbleMessage("hi");
});

document.addEventListener("click", function (e) {
  const menu = document.getElementById("characterMenu");
  const character = document.getElementById("floatingCharacter");
  if (menu && !menu.contains(e.target) && !character.contains(e.target)) {
    menu.style.display = "none";
  }
});
