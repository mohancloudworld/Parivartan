#!/bin/sh
# Copies the shared conversion engine from the extension into the app's
# vendor directory. The engine is the single source of truth and lives in
# ../src — it is never edited here, only copied, so a fix in the extension
# (and its test suite) reaches the app unchanged.
#
# Run from anywhere:  android/tools/sync-engine.sh
set -e

here=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
root=$(CDPATH= cd -- "$here/../.." && pwd)
dest="$here/../www/vendor"

mkdir -p "$dest"
# tables.js defines PARIVARTAN_TABLES; myModule.js defines Parivartan and
# depends on it, so load order matters in index.html.
# convert.js is deliberately NOT copied: it routes the extension's
# menu modes, while the app drives convert2IndicScript directly via
# js/render.js.
for f in src/data/tables.js src/lib/myModule.js; do
    cp "$root/$f" "$dest/$(basename "$f")"
    echo "synced $f"
done
