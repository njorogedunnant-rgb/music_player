const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");

// Add your own songs here. Place mp3 files in the songs/ folder
// and cover images in the images/ folder.
const songs = [
  { name: "Song Title 1", artist: "Artist 1", src: "songs/song1.mp3", cover: "images/cover.jpg" },
  { name: "Song Title 2", artist: "Artist 2", src: "songs/song2.mp3", cover: "images/cover.jpg" }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.name;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = "&#10074;&#10074;"; // pause icon ||
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = "&#9658;"; // play icon ▶
  isPlaying = false;
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

audio.addEventListener("ended", nextSong);

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Initialize with the first song
loadSong(songIndex);
