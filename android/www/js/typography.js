"use strict";

// Per-script typography.
//
// Indic scripts do not share vertical metrics or a legible minimum size, so a
// single font-size/line-height for all nine produces text that is airy in one
// script and clipped in another:
//
//   - Devanagari, Bengali and Gurmukhi hang from a headstroke and stack marks
//     both above and below it, so they need generous leading.
//   - Telugu, Kannada and Malayalam place conjunct consonants as a subscript
//     form beneath the base letter. At a normal reading size that subscript
//     degrades into a smudge, so these need a larger base size.
//   - Tamil has few conjuncts and reads comfortably smaller.
//
// The user's A-/A+ control contributes an OFFSET on top of these bases rather
// than an absolute size, so switching display script preserves the reader's
// chosen comfort level instead of resetting it. See sizeFor().

var PARIVARTAN_TYPOGRAPHY = {
  Devanagari: { size: 20, lineHeight: 1.75 },
  Bengali:    { size: 20, lineHeight: 1.75 },
  Gurmukhi:   { size: 20, lineHeight: 1.70 },
  Gujarati:   { size: 20, lineHeight: 1.70 },
  Oriya:      { size: 21, lineHeight: 1.80 },
  Tamil:      { size: 21, lineHeight: 1.80 },
  Telugu:     { size: 22, lineHeight: 1.90 },
  Kannada:    { size: 22, lineHeight: 1.90 },
  Malayalam:  { size: 22, lineHeight: 1.95 }
};

// Reader font offset bounds, in px, applied to the per-script base above.
var FONT_OFFSET_MIN = -4;
var FONT_OFFSET_MAX = 16;

function typographyFor(script) {
  return PARIVARTAN_TYPOGRAPHY[script] || PARIVARTAN_TYPOGRAPHY.Devanagari;
}

// Effective reading size = the script's tuned base + the reader's offset.
function sizeFor(script, offset) {
  var base = typographyFor(script).size;
  var off = Math.max(FONT_OFFSET_MIN, Math.min(FONT_OFFSET_MAX, offset || 0));
  return base + off;
}

// Font stack for a script. Serif reads as more traditional for devotional
// text; the bundled Sans is the fallback, then the platform default so the
// app still renders before any font files are dropped into www/fonts/.
function fontStackFor(script) {
  return '"Noto Serif ' + script + '", "Noto Sans ' + script + '", serif';
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PARIVARTAN_TYPOGRAPHY: PARIVARTAN_TYPOGRAPHY,
    FONT_OFFSET_MIN: FONT_OFFSET_MIN,
    FONT_OFFSET_MAX: FONT_OFFSET_MAX,
    typographyFor: typographyFor,
    sizeFor: sizeFor,
    fontStackFor: fontStackFor
  };
}
