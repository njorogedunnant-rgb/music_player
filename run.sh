#!/bin/bash
# run.sh — starts the music player as a standalone app window.
# Place this inside your music-player project folder.

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT=8000
URL="http://localhost:$PORT"

cd "$PROJECT_DIR" || exit 1

# Only start the server if nothing is already listening on the port
if ! curl -s "$URL" > /dev/null; then
  echo "Starting local server on port $PORT..."
  nohup python3 -m http.server "$PORT" > /tmp/music-player-server.log 2>&1 &
  sleep 1
fi

# Open in Chromium's "app mode" — no address bar, no tabs, just the player
# --disable-gpu and --disable-software-rasterizer avoid rendering flicker
# that's common when running inside a VM (VirtualBox/VMware)
chromium --app="$URL" --new-window --disable-gpu --disable-software-rasterizer > /dev/null 2>&1 &
