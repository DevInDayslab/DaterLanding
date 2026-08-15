#!/usr/bin/env bash
# Post-build steps for Hostinger: rename SPA shell so index.php can route bots vs browsers.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"

if [[ ! -f "$DIST/index.html" ]]; then
  echo "Missing $DIST/index.html — run vite build first." >&2
  exit 1
fi

mv "$DIST/index.html" "$DIST/index-spa.html"

if [[ ! -f "$DIST/index.php" ]]; then
  echo "Missing $DIST/index.php — ensure public/index.php exists before build." >&2
  exit 1
fi

if [[ ! -f "$DIST/.htaccess" ]]; then
  echo "Missing $DIST/.htaccess — ensure public/.htaccess exists before build." >&2
  exit 1
fi

echo "Renamed index.html → index-spa.html"
echo "Hostinger dist ready: index.php, index-spa.html, .htaccess"
