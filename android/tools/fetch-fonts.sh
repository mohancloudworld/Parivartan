#!/bin/sh
# Puts the bundled reading fonts in www/fonts/.
#
# Android does not guarantee which Indic fonts a device has: Pixel ships Noto,
# Samsung and Xiaomi ship their own sets, and on some devices a script is
# missing entirely and renders as tofu boxes. Bundling is what makes the app
# look the same everywhere.
#
# Prefers fonts already installed on this machine (no network) and falls back to
# the upstream Noto repository. Brackets are stripped from the filenames because
# "[wght]" is awkward to quote in CSS url() and in Android asset packaging.
#
# After running this, regenerate the @font-face rules:
#     node android/tools/build-font-css.js
set -e

here=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
dest="$here/../www/fonts"
sysdir=/usr/share/fonts/google-noto-vf
upstream=https://raw.githubusercontent.com/notofonts/notofonts.github.io/main/fonts

# Scripts the app can display. Keep in sync with INDIC_SCRIPTS in js/render.js.
scripts="Devanagari Telugu Kannada Gujarati Tamil Bengali Gurmukhi Malayalam Oriya"

mkdir -p "$dest"
for s in $scripts; do
    out="$dest/NotoSerif$s-var.ttf"
    [ -f "$out" ] && { echo "have    NotoSerif$s"; continue; }

    if [ -f "$sysdir/NotoSerif$s[wght].ttf" ]; then
        cp "$sysdir/NotoSerif$s[wght].ttf" "$out"
        echo "copied  NotoSerif$s (system)"
    else
        url="$upstream/NotoSerif$s/unhinted/variable-ttf/NotoSerif$s%5Bwght%5D.ttf"
        if curl -fsSL "$url" -o "$out.tmp" 2>/dev/null; then
            mv "$out.tmp" "$out"
            echo "fetched NotoSerif$s (upstream)"
        else
            rm -f "$out.tmp"
            echo "MISSING NotoSerif$s - add it by hand, see www/fonts/README.md" >&2
        fi
    fi
done
