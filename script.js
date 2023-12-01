"use strict";

const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto",
  },
];

//check if playing
let isPlaying = false;

//play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
}

//current song
let songIdx = 0;

//next song
function nextSong(next) {
  songIdx =
    next === "next" && songIdx !== songs.length - 1
      ? songIdx + 1
      : next === "prev" && songIdx > 0
      ? songIdx - 1
      : next === "next" && songIdx === songs.length - 1
      ? 0
      : songs.length - 1;

  loadSong(songs[songIdx]);
  playSong();
}

//on load
loadSong(songs[songIdx]);

//update progress bar and time
function formatTime(time) {
  return `${Math.floor(time / 60)}:${
    Math.floor(time % 60) < 10
      ? `0${Math.floor(time % 60)}`
      : Math.floor(time % 60)
  }`;
}

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    let progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = duration ? formatTime(duration) : "";
  }
}

function setProgressBar(e) {
  // firefox hides values inside object for offset but gives when called directly e.offsetX
  const { clientWidth } = this;
  const { offsetX } = e;
  const { duration } = music;

  music.currentTime = (offsetX / clientWidth) * duration;
}

//event listeners
prevBtn.addEventListener("click", () => nextSong("prev"));
nextBtn.addEventListener("click", () => nextSong("next"));
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

music.addEventListener("ended", () => nextSong("next"));
