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

// Latin-script display options. These are display-only: content is always
// stored in an Indian script, so they never appear as a source script.
//   ISO   - ISO 15919, diacritics kept: exact, and still recitable if the
//           reader ignores every mark.
//   Plain - the same with the marks removed, which is how devotional text is
//           normally printed in Latin letters.
var ROMAN_SCHEMES = {
  ISO:    "English (ISO 15919)",
  Plain:  "English (plain)",
  ITRANS: "English (ITRANS)"
};

// Latin notations content can be WRITTEN in. Not the same list as the reading
// options above: IAST can be entered, because people have texts in it, but the
// engine has no generator for it, so it is not offered as a reading or as a
// conversion target. Plain English is the reverse - readable but too lossy to
// be a master, since vowel length is gone and cannot be recovered.
var LATIN_FORMATS = {
  ITRANS: "ITRANS",
  ISO:    "ISO 15919",
  IAST:   "IAST"
};

function isRoman(script) {
  return Object.prototype.hasOwnProperty.call(ROMAN_SCHEMES, script);
}

function isLatinFormat(script) {
  return Object.prototype.hasOwnProperty.call(LATIN_FORMATS, script);
}

// What content can be written in.
function sourceFormats() {
  return INDIC_SCRIPTS.concat(Object.keys(LATIN_FORMATS));
}

// What the master can be rewritten into. Excludes IAST and plain English for
// the reasons above.
function convertTargets() {
  return INDIC_SCRIPTS.concat(["ITRANS", "ISO"]);
}

function formatLabel(name) {
  return ROMAN_SCHEMES[name] || LATIN_FORMATS[name] || name;
}

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
  if (isLatinFormat(sourceScript)) {
    // Route through Devanagari so a master written in any notation lands on the
    // same normalised ITRANS an Indic master produces - otherwise the pivot
    // would carry whichever spelling the author happened to type and the same
    // passage would convert differently depending on how it was entered.
    var dev = Parivartan.convert2IndicScript(original, sourceScript, "Devanagari", 1, 0, true);
    return Parivartan.convert2IndicScript(dev, "ITRANS", "Devanagari", 1, 1, true);
  }
  return Parivartan.convert2IndicScript(original, "ITRANS", sourceScript, 1, 1, true);
}

// Checks that text is what it has been declared to be.
//
// Detection is used here to CONTRADICT a declaration, never to make one. For
// the Indian scripts it is reliable and a wrong choice is visible to the reader
// anyway; for the Latin notations it cannot tell them apart at all, and a wrong
// choice is silent - the text converts to plausible-looking nonsense. So the
// declaration is the user's, and this only objects when the text disagrees.
//
// Returns null, or {level: "error" | "warning", message}.
function validateSource(body, declared) {
  var text = (body || "").trim();
  if (!text) return null;

  var hasIndic = /[\u0900-\u0D7F]/.test(text);
  var detected = Parivartan.detectLanguage(text);

  if (isLatinFormat(declared)) {
    if (hasIndic) {
      return { level: "error",
        message: "This is " + detected + " text, not " + LATIN_FORMATS[declared] + "." };
    }
    var diacritic = /[\u00C0-\u024F\u1E00-\u1EFF]|[\u0300-\u036F]/.test(text);
    var isoMark   = /[\u0113\u014D\u1E41]|r\u0325|l\u0325/.test(text);  // ē ō ṁ r̥ l̥
    var iastMark  = /[\u1E43\u1E5B\u1E37]/.test(text);                  // ṃ ṛ ḷ
    // The spellings only ITRANS uses: its digraphs, its dotted forms, and a
    // capital inside a word, which is how it encodes the retroflex and long
    // letters. A capital starting a word is just a capital.
    var itransMark = /RRi|RRI|LLi|LLI|~[nN]|\^n|\.[hnmNa]|[a-z][AEIOUTDNSM]|aa|ii|uu|ee|oo|chh|shh/.test(text);

    if (declared === "ITRANS" && diacritic) {
      return { level: "warning",
        message: "This has diacritics, which ITRANS does not use. It may be ISO 15919 or IAST." };
    }
    if (declared === "ISO" && iastMark && !isoMark) {
      return { level: "warning", message: "These marks look like IAST rather than ISO 15919." };
    }
    if (declared === "IAST" && isoMark && !iastMark) {
      return { level: "warning", message: "These marks look like ISO 15919 rather than IAST." };
    }
    if (!diacritic && !itransMark) {
      return { level: "warning",
        message: "This looks like ordinary English spelling rather than " + LATIN_FORMATS[declared] +
                 ". Vowel lengths and retroflex letters will come out wrong." };
    }
    return null;
  }

  // An Indian script was declared.
  if (!hasIndic) {
    return { level: "error",
      message: "No Indian script here. If this is transliterated text, choose the notation it is written in." };
  }
  if (detected !== declared) {
    return { level: "error",
      message: "This looks like " + detected + ", not " + declared +
               ". Saved as " + declared + " it would show the same text in every script." };
  }
  return null;
}

// Rewrites the master into another script or notation.
//
// Destructive: the words the author entered are replaced by a conversion of
// them, so the caller confirms first. Everything downstream is recomputed from
// the new master by the store.
function convertMaster(content, target) {
  if (target === "ITRANS") return content.pivotItrans;
  if (isRoman(target)) return Parivartan.convert2Roman(content.pivotItrans, target);
  return Parivartan.convert2IndicScript(content.pivotItrans, "ITRANS", target, 1, 0, true);
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
  // Latin display always goes through the pivot - there is no "same script"
  // shortcut, since content is never stored in Latin. Digits stay as roman
  // numerals regardless of the setting: the setting picks an INDIAN script's
  // digits, which would look wrong embedded in Latin text.
  if (isRoman(displayScript)) {
    // The master itself when the reader asks for the notation it was written
    // in; otherwise derived from the pivot.
    if (displayScript === content.sourceScript) return content.original;
    if (displayScript === "ITRANS") return content.pivotItrans;
    return Parivartan.convert2Roman(content.pivotItrans, displayScript);
  }
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
    ROMAN_SCHEMES: ROMAN_SCHEMES,
    LATIN_FORMATS: LATIN_FORMATS,
    isRoman: isRoman,
    isLatinFormat: isLatinFormat,
    sourceFormats: sourceFormats,
    convertTargets: convertTargets,
    formatLabel: formatLabel,
    validateSource: validateSource,
    convertMaster: convertMaster,
    LOSSY_SOURCE_SCRIPTS: LOSSY_SOURCE_SCRIPTS,
    digitPass: digitPass,
    detectScript: detectScript,
    toPivot: toPivot,
    titleSearchKey: titleSearchKey,
    renderContent: renderContent
  };
}
