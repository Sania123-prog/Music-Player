const songs = [
    {
        title: "Chill Music",
       artist: "Free Music",
        path: "song1.mp3",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop"
    },
    {
        title: "Relax Beat",
        artist: "Pixabay Artist",
        path: "song2.mp3",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop"
    },
    {
        title: "Night Vibes",
         artist: "No Copyright",
        path: "song3.mp3",
        cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop"
    }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const cover = document.getElementById("cover");

function loadSong(index) {
    audio.src = songs[index].path;
    title.innerText = songs[index].title;
    artist.innerText = songs[index].artist;
    cover.src = songs[index].cover;
    highlightSong();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
        cover.classList.add("rotate");
    } else {
        audio.pause();
        playBtn.innerText = "▶";
        cover.classList.remove("rotate");
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.innerText = "⏸";
    cover.classList.add("rotate");
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.innerText = "⏸";
    cover.classList.add("rotate");
}

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    current.innerText = formatTime(audio.currentTime);
    duration.innerText = formatTime(audio.duration);
});

audio.addEventListener("ended", nextSong);

function formatTime(time) {
    let min = Math.floor(time / 60) || 0;
    let sec = Math.floor(time % 60) || 0;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

function createPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerText = `${song.title} - ${song.artist}`;
        li.onclick = () => {
            currentSong = index;
            loadSong(index);
            audio.play();
            cover.classList.add("rotate");
        };
        playlist.appendChild(li);
    });
}

function highlightSong() {
    const items = document.querySelectorAll("#playlist li");
    items.forEach((item, index) => {
        item.classList.toggle("active", index === currentSong);
    });
}

createPlaylist();
loadSong(currentSong);