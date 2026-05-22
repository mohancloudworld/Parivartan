"use strict";

const api = globalThis.browser || globalThis.chrome;

const FORMAT_HINTS = {
  itrans: "Auto-detects the input: an Indian script, or English typed in ITRANS.",
  iso: "Input is English in the ISO 15919 transliteration standard.",
  iast: "Input is English in IAST (transliteration with diacritic marks).",
  general: "Loose English spelling — handy, but less accurate than ITRANS / ISO 15919 / IAST.",
};

const LANGUAGE_TARGETS = [
  ["Devanagari", "Devanagari (देवनागरी)"],
  ["Telugu", "Telugu (తెలుగు)"],
  ["Kannada", "Kannada (ಕನ್ನಡ)"],
  ["Gujarati", "Gujarati (ગુજરાતી)"],
  ["Tamil", "Tamil (தமிழ்)"],
  ["Bengali", "Bengali (বাংলা)"],
  ["Gurmukhi", "Gurmukhi (ਗੁਰ੍ਮੁਖੀ)"],
  ["Malayalam", "Malayalam (മലയാളം)"],
  ["Oriya", "Oriya (ଓଡ଼ିଆ)"],
  ["Katapayadi", "Katapayadi sankhya"],
];
const ENGLISH_TARGET = ["English", "English"];
const DEFAULT_TARGET = "Devanagari";

const formatSel = document.getElementById("format");
const targetSel = document.getElementById("target");
const formatHint = document.getElementById("format-hint");
const inputEl = document.getElementById("input");
const outputEl = document.getElementById("output");
const copyBtn = document.getElementById("copy");
const settingsLink = document.getElementById("settings-link");

let preferASCIIDigits = true;

function rebuildTargetOptions() {
  const previous = targetSel.value || DEFAULT_TARGET;
  // English is a valid target only for the auto-detecting ITRANS mode.
  const targets =
    formatSel.value === "itrans"
      ? [ENGLISH_TARGET, ...LANGUAGE_TARGETS]
      : LANGUAGE_TARGETS;

  targetSel.textContent = "";
  for (const [value, label] of targets) {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = label;
    targetSel.appendChild(opt);
  }
  // Keep the previous choice if still offered, otherwise fall back gracefully.
  if (targets.some(([value]) => value === previous)) {
    targetSel.value = previous;
  }
}

function convert() {
  const result = parivartanRunConversion(
    formatSel.value,
    targetSel.value,
    "",
    inputEl.value,
    preferASCIIDigits
  );
  // null means the input is already in the requested script.
  outputEl.value = result == null ? inputEl.value : result;
}

function refresh() {
  formatHint.textContent = FORMAT_HINTS[formatSel.value] || "";
  convert();
}

formatSel.addEventListener("change", () => {
  rebuildTargetOptions();
  refresh();
});
targetSel.addEventListener("change", convert);
inputEl.addEventListener("input", convert);

copyBtn.addEventListener("click", async () => {
  if (!outputEl.value) return;
  try {
    await navigator.clipboard.writeText(outputEl.value);
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1200);
  } catch (e) {
    // Clipboard blocked — select the text so the user can copy it manually.
    outputEl.focus();
    outputEl.select();
  }
});

settingsLink.addEventListener("click", (e) => {
  e.preventDefault();
  api.runtime.openOptionsPage();
});

async function init() {
  try {
    const stored = await api.storage.sync.get({ preferASCIIDigits: true });
    preferASCIIDigits = stored.preferASCIIDigits;
  } catch (e) {
    // storage unavailable — keep the default
  }
  Parivartan.init();
  rebuildTargetOptions();
  refresh();
  inputEl.focus();
}

init();
