#!/usr/bin/env bash
#
# Refreshes the trimmed Unicode Character Database (UCD) files that
# build-mapping-table.js reads from tools/ucd/.
#
# It downloads the latest UCD from unicode.org and keeps only the
# Indic-relevant ranges, so the committed data stays small (~200 KB) while
# the table can still be regenerated offline on any machine afterwards.
#
# Ranges kept (decimal codepoints):
#   768-879     0300-036F  Combining Diacritical Marks
#   2304-4095   0900-0FFF  the nine main Indic blocks (Devanagari..Malayalam, +margin)
#   7376-7423   1CD0-1CFF  Vedic Extensions
#   8192-8303   2000-206F  General Punctuation (for ZWSP U+200B, ZWJ U+200D)
#   43232-43263 A8E0-A8FF  Devanagari Extended
#   69632-73727 11000-11FFF Brahmic supplements (Devanagari Extended-A, Tamil Supplement, …)
#
# Usage:  tools/fetch-ucd.sh
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)/ucd"
mkdir -p "$DIR"
BASE="https://www.unicode.org/Public/UCD/latest/ucd"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

for f in UnicodeData.txt DerivedAge.txt Blocks.txt; do
  echo "Fetching $f ..."
  curl -fsSL "$BASE/$f" -o "$tmp/$f"
done

# UnicodeData.txt: one row per codepoint — keep rows whose codepoint is in range.
awk -F';' 'function inr(cp){return (cp>=768&&cp<=879)||(cp>=2304&&cp<=4095)||(cp>=7376&&cp<=7423)||(cp>=8192&&cp<=8303)||(cp>=43232&&cp<=43263)||(cp>=69632&&cp<=73727)} {cp=strtonum("0x"$1); if(inr(cp)) print}' \
  "$tmp/UnicodeData.txt" > "$DIR/UnicodeData.txt"

# DerivedAge.txt: range-per-line — keep ranges that intersect any kept range.
awk 'function ov(s,e,a,b){return s<=b&&e>=a} function keep(s,e){return ov(s,e,768,879)||ov(s,e,2304,4095)||ov(s,e,7376,7423)||ov(s,e,8192,8303)||ov(s,e,43232,43263)||ov(s,e,69632,73727)} /^[0-9A-Fa-f]/{split($0,a,";");r=a[1];gsub(/ /,"",r);n=split(r,b,/\.\./);s=strtonum("0x"b[1]);e=(n>1)?strtonum("0x"b[2]):s;if(keep(s,e))print}' \
  "$tmp/DerivedAge.txt" > "$DIR/DerivedAge.txt"

# Blocks.txt: small — keep whole.
cp "$tmp/Blocks.txt" "$DIR/Blocks.txt"

echo "Wrote trimmed UCD to $DIR"
wc -l "$DIR"/*.txt
