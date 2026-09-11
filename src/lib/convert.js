"use strict";

// Maps a mode + target to the underlying Parivartan conversion calls.
// Shared by the content script (in-place conversion) and the popup converter.
// Mirrors the per-menu logic of the original add-on's main.js.
// Returns the converted string, or null when no conversion applies
// (the input is already in the requested script).
//
// Requires the global `Parivartan` from lib/myModule.js, with init() already called.
// Latin output targets, and the notation each one produces. "English" keeps its
// original name so menu ids and stored preferences from earlier versions still
// resolve; it has always meant ITRANS.
var PARIVARTAN_ROMAN_TARGETS = {
  English:      "ITRANS",
  EnglishISO:   "ISO",
  EnglishPlain: "Plain"
};

// The Latin output that matches each Latin input, so the menu does not offer to
// convert a notation into itself.
var PARIVARTAN_SAME_NOTATION = {
  itrans: "English",
  iso:    "EnglishISO"
};

function parivartanRunConversion(mode, target, inpHTML, inpText, preferASCIIDigits) {
  const P = Parivartan;
  const inpData = inpHTML || inpText;

  // Forward conversions from an English notation to an Indic script (or
  // Katapayadi). Input is asserted by the menu/popup choice; no auto-detection.
  if (mode === "itrans" || mode === "iso" || mode === "iast" || mode === "general") {
    let encoding = "ITRANS";
    let modeStrict = 1;
    if (mode === "iso") encoding = "ISO";
    else if (mode === "iast") encoding = "IAST";
    else if (mode === "general") modeStrict = 0;

    if (target === "Katapayadi") {
      const indic = P.convert2IndicScript(inpData, encoding, "Devanagari", modeStrict, 0, preferASCIIDigits);
      return P.convert2Katapayadi(indic);
    }
    // Latin in, Latin out - rewriting one notation as another. Routed through
    // Devanagari so the result depends on the sounds, not on which spelling the
    // source happened to use.
    if (PARIVARTAN_ROMAN_TARGETS[target]) {
      if (PARIVARTAN_SAME_NOTATION[mode] === target) return null; // already in it
      const dev = P.convert2IndicScript(inpData, encoding, "Devanagari", modeStrict, 0, preferASCIIDigits);
      const itrans = P.convert2IndicScript(dev, "ITRANS", "Devanagari", 1, 1, preferASCIIDigits);
      if (PARIVARTAN_ROMAN_TARGETS[target] === "ITRANS") return itrans;
      return P.convert2Roman(itrans, PARIVARTAN_ROMAN_TARGETS[target]);
    }
    return P.convert2IndicScript(inpData, encoding, target, modeStrict, 0, preferASCIIDigits);
  }

  // Reverse conversion: input is an Indian script (auto-detect which one).
  // Targets are any other Indic script, one of the Latin notations, or
  // Katapayadi.
  if (mode === "indic") {
    const inpLang = P.detectLanguage(inpText);
    if (inpLang === "English") return null; // no Indic content detected
    if (target === "Katapayadi") return P.convert2Katapayadi(inpData);
    if (inpLang === target) return null; // already in the requested script
    const itrans = P.convert2IndicScript(inpData, "ITRANS", inpLang, 1, 1, preferASCIIDigits);
    if (PARIVARTAN_ROMAN_TARGETS[target]) {
      if (PARIVARTAN_ROMAN_TARGETS[target] === "ITRANS") return itrans;
      return P.convert2Roman(itrans, PARIVARTAN_ROMAN_TARGETS[target]);
    }
    return P.convert2IndicScript(itrans, "ITRANS", target, 1, 0, preferASCIIDigits);
  }

  return null;
}
