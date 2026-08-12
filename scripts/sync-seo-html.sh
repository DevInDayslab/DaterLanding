#!/usr/bin/env bash
# Copy only Vite index.html into the API for SEO injection.
# Assets stay on Vercel; Express does not need images/JS/CSS.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
DEST="$(cd "$ROOT/../backend" && pwd)/public/landing"

if [[ ! -f "$DIST/index.html" ]]; then
  echo "Missing $DIST/index.html — run npm run build first." >&2
  exit 1
fi

mkdir -p "$DEST"
# Wipe previous landing artifact, then place only the HTML shell.
rm -rf "$DEST"
mkdir -p "$DEST"
cp "$DIST/index.html" "$DEST/index.html"
touch "$DEST/.gitkeep"

echo "Copied index.html → $DEST/index.html"
