# 🎵 Music Player

A lightweight, responsive music player built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just open it in a browser and go.

## Features

- ▶️ Play / ⏸️ Pause
- ⏭️ Next track / ⏮️ Previous track
- Seekable progress bar with live current-time / duration display
- 🔊 Volume control
- Responsive, card-style UI
- Dynamic playlist loading from a generated `playlist.json` — no need to hardcode song lists

## Project Structure

```
music-player/
├── index.html          # Player markup
├── style.css           # Player styling
├── script.js           # Playback logic, loads songs/playlist.json
├── build_playlist.py   # Scans ~/Music, copies mp3s in, builds playlist.json
├── songs/
│   ├── playlist.json   # Auto-generated song metadata (gitignored source mp3s)
│   └── README.txt
└── images/
    ├── cover.jpg        # Album art (not tracked in git)
    └── README.txt
```

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/njorogedunnant-rgb/music_player.git
cd music_player
```

### 2. Add your own music

Audio files aren't included in this repo (see [Note on audio files](#note-on-audio-files) below). To populate the player with your own tracks, run:

```bash
python3 build_playlist.py
```

This scans your local `~/Music` folder, copies every `.mp3` it finds into `songs/`, and generates `songs/playlist.json` with a best-effort guess at each track's title and artist based on the filename. You can hand-edit `songs/playlist.json` afterward to clean up any mislabeled entries.

Add an album cover image at `images/cover.jpg` (any square-ish image works).

### 3. Run it locally

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

## Note on audio files

This repo intentionally excludes `.mp3` files via `.gitignore`, since most personal music libraries contain copyrighted tracks that shouldn't be redistributed through a public GitHub repo. Only the code and metadata structure are tracked — `build_playlist.py` lets anyone regenerate a working playlist from their own local files.

## Built With

- HTML5 `<audio>` API
- Vanilla JavaScript (DOM manipulation, event listeners)
- CSS3 (flexbox, gradients, custom range sliders)
- Python 3 (playlist generation script)

## Author

Njoroge Dunnant
[Portfolio](https://njorogedunnant.netlify.app) · [GitHub](https://github.com/njorogedunnant-rgb)
