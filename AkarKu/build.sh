#!/usr/bin/env bash
# AkarKu — menggabungkan app/index.html + app/style.css + app/app.js menjadi satu file
# dist/index.html. File gabungan inilah yang ditempel ke file "index" di Google Apps Script
# (Apps Script tidak bisa memuat file .js/.css terpisah).
#
# Cara pakai (Git Bash, di folder AkarKu):   bash build.sh
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p dist
out=dist/index.html
{
  # bagian <head> sampai sebelum tautan style.css
  sed '/<link rel="stylesheet" href="style.css">/,$d' app/index.html
  echo '<style>'
  cat app/style.css
  echo '</style>'
  echo '</head>'
  echo '<body>'
  sed -n '/<body>/,/<\/body>/p' app/index.html | sed '1d;$d' | grep -v '<script src="app.js"></script>' | grep -v '<script src="config.js"></script>'
  echo '<script>'
  cat app/app.js
  echo '</script>'
  echo '</body>'
  echo '</html>'
} > "$out"
echo "Selesai: $out ($(wc -l < "$out") baris). Tempel isinya ke file \"index\" di Google Apps Script."
