"use strict";

// Maps a mode + target to the underlying Parivartan conversion calls.
// Shared by the content script (in-place conversion) and the popup converter.
// Mirrors the per-menu logic of the original add-on's main.js.
// Returns the converted string, or null when no conversion applies
// (the input is already in the requested script).
//
// Requires the global `Parivartan` from lib/myModule.js, with init() already called.
function parivartanRunConversion(mode, target, inpHTML, inpText, preferASCIIDigits) {
  const P = Parivartan;
  const inpData = inpHTML || inpText;

  if (mode === "itrans") {
    const inpLang = P.detectLanguage(inpText);
    if (target === "Katapayadi") {
      const indic =
        inpLang === "English"
          ? P.convert2IndicScript(inpData, "ITRANS", "Devanagari", 1, 0, preferASCIIDigits)
          : inpData;
      return P.convert2Katapayadi(indic);
    }
    if (inpLang !== target) {
      const itrans = P.convert2IndicScript(inpData, "ITRANS", inpLang, 1, 1, preferASCIIDigits);
      if (target === "English") return itrans;
      return P.convert2IndicScript(itrans, "ITRANS", target, 1, 0, preferASCIIDigits);
    }
    return null; // input already in the requested script
  }

  // iso / iast / general
  const encoding = mode === "iast" ? "IAST" : "ISO";
  const modeStrict = mode === "general" ? 0 : 1;
  if (target === "Katapayadi") {
    const indic = P.convert2IndicScript(inpData, encoding, "Devanagari", modeStrict, 0, preferASCIIDigits);
    return P.convert2Katapayadi(indic);
  }
  return P.convert2IndicScript(inpData, encoding, target, modeStrict, 0, preferASCIIDigits);
}
