#!/usr/bin/env python3
"""
build_playlist.py

Run this from inside your music-player project folder on Kali.
It scans ~/Music for .mp3 files, copies them into songs/,
and writes songs/playlist.json with guessed title/artist info
based on each filename.

Usage:
    cd ~/Projects/music-player
    python3 build_playlist.py
"""

import os
import re
import shutil
import json
from pathlib import Path

MUSIC_DIR = Path.home() / "Music"
PROJECT_DIR = Path.cwd()
SONGS_DIR = PROJECT_DIR / "songs"

def clean_title(stem: str):
    """
    Try to split 'Artist - Title' style filenames into (artist, title).
    Falls back to using the whole cleaned filename as the title.
    """
    # Strip common junk: (0), (256k), (128k), [Official Video], quality tags, etc.
    s = stem
    s = re.sub(r'\(\s*\d+\s*\)', '', s)                     # (0)
    s = re.sub(r'\((\d+k)\)', '', s, flags=re.I)            # (256k)
    s = re.sub(r'\[.*?\]', '', s)                            # [Official Video]
    s = re.sub(r'\((?:official|lyrics?|audio|video|mp3.*?|hd|hq|remix|extended|radio edit).*?\)', '', s, flags=re.I)
    s = re.sub(r'_{2,}', ' ', s)                              # collapse multiple underscores
    s = s.replace('_', ' ')
    s = re.sub(r'\s{2,}', ' ', s).strip(' -_')

    # Try splitting on ' - ' for "Artist - Title"
    parts = re.split(r'\s+-\s+', s, maxsplit=1)
    if len(parts) == 2 and len(parts[0]) < 40:
        artist, title = parts[0].strip(), parts[1].strip()
    else:
        artist, title = "Unknown Artist", s.strip()

    if not title:
        title = stem

    return title.title(), artist.title()


def main():
    if not MUSIC_DIR.exists():
        print(f"Could not find {MUSIC_DIR}. Edit MUSIC_DIR in this script if your music lives elsewhere.")
        return

    SONGS_DIR.mkdir(exist_ok=True)

    mp3_files = sorted(MUSIC_DIR.glob("*.mp3"))
    if not mp3_files:
        print(f"No .mp3 files found in {MUSIC_DIR}.")
        return

    playlist = []
    print(f"Found {len(mp3_files)} mp3 files. Copying into {SONGS_DIR} ...")

    for src in mp3_files:
        dest_name = src.name  # keep original filename
        dest = SONGS_DIR / dest_name

        if not dest.exists():
            shutil.copy2(src, dest)

        title, artist = clean_title(src.stem)

        playlist.append({
            "name": title,
            "artist": artist,
            "src": f"songs/{dest_name}",
            "cover": "images/cover.jpg"
        })

    playlist_path = SONGS_DIR / "playlist.json"
    with open(playlist_path, "w", encoding="utf-8") as f:
        json.dump(playlist, f, indent=2, ensure_ascii=False)

    print(f"Done. Wrote {len(playlist)} entries to {playlist_path}")
    print("Next: open script.js — it now loads songs/playlist.json automatically.")


if __name__ == "__main__":
    main()
