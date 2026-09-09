"use strict";

// The conversion pipeline that sits between stored content and the reader.
//
// Content is stored twice: the ORIGINAL exactly as the user pasted it, plus a
// normalised ITRANS pivot. The pivot is what makes cross-script display
// possible, but round-tripping through it is not byte-preserving (it also
// normalises "A" to "aa", "E" to "ee" and so on), and for scripts that lack
// letters the pivot cannot represent what was there. So the original is
// rendered verbatim whenever the reader is looking at the script it was
// written in, and the pivot is used only to reach a DIFFERENT script.
//
// Digits are handled separately from both paths. They are a self-contained,
// lossless ASCII <-> script mapping, so a standalone pass applies the user's
// preference uniformly - including on the verbatim-original path, where no
// transliteration runs at all and the engine's own digit flag never fires.

var INDIC_SCRIPTS = [
  "Devanagari", "Telugu", "Kannada", "Gujarati", "Tamil",
  "Bengali", "Gurmukhi", "Malayalam", "Oriya"
];

// Scripts that cannot round-trip through ITRANS without losing distinctions,
// because the writing system itself lacks the letters. Content added in one of
// these still displays perfectly in its own script (the original is kept), but
// every OTHER script is rendered from a lossy pivot. The add screen warns.
var LOSSY_SOURCE_SCRIPTS = {
  Tamil:    "Tamil has no separate voiced or aspirated consonants, so bha/dha/gha collapse to pa/ta/ka in other scripts.",
  Bengali:  "Bengali writes va and ba with the same letter, so va appears as ba in other scripts.",
  Gurmukhi: "Gurmukhi does not distinguish all sibilants, so sha may appear altered in other scripts."
};

function dictFor(script) {
  return PARIVARTAN_TABLES[script.toLowerCase() + "_dict"];
}

// Build the ASCII <-> native digit map for a script from its own table, so
// there is no second copy of the digit data to drift.
function digitMapFor(script, nativeDigits) {
  var others = dictFor(script).Others;
  var map = {};
  for (var d = 0; d <= 9; d++) {
    var ascii = String(d);
    var native = others[ascii];
    if (!native) continue;
    if (nativeDigits) map[ascii] = native;
    else map[native] = ascii;
  }
  return map;
}

// Rewrite digits to the reader's preferred form. Normalises mixed input:
// content holding both "108" and native digits ends up consistent either way.
function digitPass(text, script, nativeDigits) {
  var map = digitMapFor(script, nativeDigits);
  var out = "";
  for (var i = 0; i < text.length; i++) {
    var ch = text.charAt(i);
    out += (map[ch] !== undefined) ? map[ch] : ch;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Add / edit time
// ---------------------------------------------------------------------------

// Best guess at which script a pasted passage is in. The add screen shows this
// pre-selected and lets the user correct it.
function detectScript(text) {
  return Parivartan.detectLanguage(text);
}

// Normalised ITRANS pivot for a passage. The reverse pass always emits ASCII
// digits regardless of the flag, so the stored pivot is digit-canonical and
// the digit preference stays purely a display-time concern.
function toPivot(original, sourceScript) {
  return Parivartan.convert2IndicScript(original, "ITRANS", sourceScript, 1, 1, true);
}

// A romanised, lowercased key so a title in any script is findable by typing
// Latin letters. Never displayed - titles themselves are stored and shown
// verbatim in whatever script the user typed.
function titleSearchKey(title) {
  var script = Parivartan.detectLanguage(title);
  var roman = (script === "English")
    ? title
    : Parivartan.convert2IndicScript(title, "ITRANS", script, 1, 1, true);
  return roman.toLowerCase();
}

// ---------------------------------------------------------------------------
// Display time
// ---------------------------------------------------------------------------

// Render stored content into the reader's chosen script.
//   content: { original, sourceScript, pivotItrans }
function renderContent(content, displayScript, nativeDigits) {
  var text;
  if (displayScript === content.sourceScript) {
    // Same script: show exactly what was saved. No round-trip, no loss.
    text = content.original;
  } else {
    // Different script: go through the pivot. preferASCIIDigits is pinned true
    // here so digit policy is decided in exactly one place, just below.
    text = Parivartan.convert2IndicScript(
      content.pivotItrans, "ITRANS", displayScript, 1, 0, true
    );
  }
  return digitPass(text, displayScript, nativeDigits);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    INDIC_SCRIPTS: INDIC_SCRIPTS,
    LOSSY_SOURCE_SCRIPTS: LOSSY_SOURCE_SCRIPTS,
    digitPass: digitPass,
    detectScript: detectScript,
    toPivot: toPivot,
    titleSearchKey: titleSearchKey,
    renderContent: renderContent
  };
}
