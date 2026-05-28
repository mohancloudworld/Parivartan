"use strict";

// Generates an HTML cross-reference table of transliteration mappings
// (ITRANS / ISO 15919 / IAST / Katapayadi) against the Indic scripts, with
// per-symbol Unicode metadata (block, version added, codepoint, name) shown
// on hover, and each script cell colour-coded by how the Parivartan extension
// actually handles that mapping:
//     green  = extension maps it to the correct codepoint
//     yellow = missing (extension has no mapping that produces it)
//     red    = wrong (extension maps the ITRANS key to a different codepoint)
//     grey   = the script has no such character (codepoint unassigned in UCD)
//
// Data sources:
//   - /tmp/UnicodeData.txt, /tmp/DerivedAge.txt, /tmp/Blocks.txt  (official UCD)
//   - src/data/tables.js  (the extension's own mapping tables, via vm)
//
// Reference ITRANS / ISO 15919 / IAST / Katapayadi values are curated from the
// published standards. Cross-script codepoints use the parallel Indic block
// layout (phoneme = block base + offset) and are existence-checked against UCD.
//
// Run:  node tools/build-mapping-table.js  > script-mapping.html
// (or pass an output path as argv[2])

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");

// ----------------------------------------------------------------------------
// 1. Parse the official Unicode Character Database files.
// ----------------------------------------------------------------------------

function readUCD(file) {
  // Prefer the committed trimmed copy in tools/ucd/; fall back to /tmp.
  const local = path.join(__dirname, "ucd", file);
  const tmp = "/tmp/" + file;
  const p = fs.existsSync(local) ? local : tmp;
  if (!fs.existsSync(p)) {
    console.error(
      "Missing UCD file: " + file + "\n" +
      "Run tools/fetch-ucd.sh to (re)create the trimmed UCD files in tools/ucd/."
    );
    process.exit(1);
  }
  return fs.readFileSync(p, "utf8");
}

// codepoint(int) -> official name
function parseUnicodeData(text) {
  const names = new Map();
  for (const line of text.split("\n")) {
    if (!line) continue;
    const f = line.split(";");
    const cp = parseInt(f[0], 16);
    if (Number.isNaN(cp)) continue;
    names.set(cp, f[1]);
  }
  return names;
}

// range list of { start, end, version } ; lookup gives the version for a cp
function parseDerivedAge(text) {
  const ranges = [];
  for (let line of text.split("\n")) {
    const hash = line.indexOf("#");
    if (hash >= 0) line = line.slice(0, hash);
    line = line.trim();
    if (!line) continue;
    const m = line.match(/^([0-9A-Fa-f]+)(?:\.\.([0-9A-Fa-f]+))?\s*;\s*([0-9.]+)/);
    if (!m) continue;
    const start = parseInt(m[1], 16);
    const end = m[2] ? parseInt(m[2], 16) : start;
    ranges.push({ start, end, version: m[3] });
  }
  return ranges;
}

function parseBlocks(text) {
  const ranges = [];
  for (let line of text.split("\n")) {
    const hash = line.indexOf("#");
    if (hash >= 0) line = line.slice(0, hash);
    line = line.trim();
    if (!line) continue;
    const m = line.match(/^([0-9A-Fa-f]+)\.\.([0-9A-Fa-f]+)\s*;\s*(.+)$/);
    if (!m) continue;
    ranges.push({ start: parseInt(m[1], 16), end: parseInt(m[2], 16), block: m[3].trim() });
  }
  return ranges;
}

const ucdNames = parseUnicodeData(readUCD("UnicodeData.txt"));
const ageRanges = parseDerivedAge(readUCD("DerivedAge.txt"));
const blockRanges = parseBlocks(readUCD("Blocks.txt"));

function lookupAge(cp) {
  for (const r of ageRanges) if (cp >= r.start && cp <= r.end) return r.version;
  return null;
}
function lookupBlock(cp) {
  for (const r of blockRanges) if (cp >= r.start && cp <= r.end) return r.block;
  return null;
}
function isAssigned(cp) {
  return ucdNames.has(cp);
}

// Approximate "year" for a Unicode version, for the tooltip. (Major releases.)
const VERSION_YEAR = {
  "1.1": "1993", "2.0": "1996", "2.1": "1998", "3.0": "1999", "3.1": "2001",
  "3.2": "2002", "4.0": "2003", "4.1": "2005", "5.0": "2006", "5.1": "2008",
  "5.2": "2009", "6.0": "2010", "6.1": "2012", "7.0": "2014", "8.0": "2015",
  "9.0": "2016", "10.0": "2017", "11.0": "2018", "12.0": "2019", "13.0": "2020",
  "14.0": "2021", "15.0": "2022", "15.1": "2023", "16.0": "2024",
};

// ----------------------------------------------------------------------------
// 2. Load the extension's tables.
// ----------------------------------------------------------------------------

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(rootDir, "src/data/tables.js"), "utf8"), ctx, {
  filename: "src/data/tables.js",
});
const T = ctx.PARIVARTAN_TABLES;

// ----------------------------------------------------------------------------
// 3. Script definitions (block base offset + the extension's dict).
// ----------------------------------------------------------------------------

const SCRIPTS = [
  // `blocks` = the Unicode ranges scanned for this script's untransliterable
  // (script-specific) characters: its main block plus any extended/supplement.
  {
    key: "devanagari", label: "Devanagari", base: 0x0900, dict: T.devanagari_dict,
    blocks: [[0x0900, 0x097F], [0xA8E0, 0xA8FF], [0x11B00, 0x11B5F]],
  },
  { key: "telugu", label: "Telugu", base: 0x0C00, dict: T.telugu_dict, blocks: [[0x0C00, 0x0C7F]] },
  { key: "kannada", label: "Kannada", base: 0x0C80, dict: T.kannada_dict, blocks: [[0x0C80, 0x0CFF]] },
  { key: "gujarati", label: "Gujarati", base: 0x0A80, dict: T.gujarati_dict, blocks: [[0x0A80, 0x0AFF]] },
  {
    key: "tamil", label: "Tamil", base: 0x0B80, dict: T.tamil_dict,
    blocks: [[0x0B80, 0x0BFF], [0x11FC0, 0x11FFF]],
  },
  { key: "bengali", label: "Bengali", base: 0x0980, dict: T.bengali_dict, blocks: [[0x0980, 0x09FF]] },
  { key: "gurmukhi", label: "Gurmukhi", base: 0x0A00, dict: T.gurmukhi_dict, blocks: [[0x0A00, 0x0A7F]] },
  { key: "malayalam", label: "Malayalam", base: 0x0D00, dict: T.malayalam_dict, blocks: [[0x0D00, 0x0D7F]] },
  { key: "oriya", label: "Oriya", base: 0x0B00, dict: T.oriya_dict, blocks: [[0x0B00, 0x0B7F]] },
];

// ----------------------------------------------------------------------------
// 4. Curated reference inventory. Keyed by Devanagari-block offset.
//    iso / iast: the Latin transliteration in each standard ("" = not applicable).
//    kata: Katapayadi digit for consonants ("" = not part of the system).
//    Independent vowels and dependent vowel signs share phoneme labels but
//    live at different offsets, so the row identity stays unambiguous.
// ----------------------------------------------------------------------------

const M = "̥"; // COMBINING RING BELOW (ISO vocalic R/L)
const groups = [
  {
    title: "Independent vowels",
    cat: "Independent_vowels",
    rows: [
      { off: 0x05, iso: "a",  iast: "a" },
      { off: 0x06, iso: "ā",  iast: "ā" },
      { off: 0x07, iso: "i",  iast: "i" },
      { off: 0x08, iso: "ī",  iast: "ī" },
      { off: 0x09, iso: "u",  iast: "u" },
      { off: 0x0A, iso: "ū",  iast: "ū" },
      { off: 0x0B, iso: "r" + M, iast: "ṛ" },
      { off: 0x0C, iso: "l" + M, iast: "ḷ" },
      { off: 0x0D, iso: "ê",  iast: "" },
      { off: 0x0E, iso: "e",  iast: "" },
      { off: 0x0F, iso: "ē",  iast: "e" },
      { off: 0x10, iso: "ai", iast: "ai" },
      { off: 0x11, iso: "ô",  iast: "" },
      { off: 0x12, iso: "o",  iast: "" },
      { off: 0x13, iso: "ō",  iast: "o" },
      { off: 0x14, iso: "au", iast: "au" },
      { off: 0x60, iso: "r" + M + "̄", iast: "ṝ" },
      { off: 0x61, iso: "l" + M + "̄", iast: "ḹ" },
    ],
  },
  {
    title: "Dependent vowel signs (mātrā)",
    cat: "Dependent_vowel",
    rows: [
      { off: 0x3E, iso: "ā",  iast: "ā" },
      { off: 0x3F, iso: "i",  iast: "i" },
      { off: 0x40, iso: "ī",  iast: "ī" },
      { off: 0x41, iso: "u",  iast: "u" },
      { off: 0x42, iso: "ū",  iast: "ū" },
      { off: 0x43, iso: "r" + M, iast: "ṛ" },
      { off: 0x44, iso: "r" + M + "̄", iast: "ṝ" },
      { off: 0x45, iso: "ê",  iast: "" },
      { off: 0x46, iso: "e",  iast: "" },
      { off: 0x47, iso: "ē",  iast: "e" },
      { off: 0x48, iso: "ai", iast: "ai" },
      { off: 0x49, iso: "ô",  iast: "" },
      { off: 0x4A, iso: "o",  iast: "" },
      { off: 0x4B, iso: "ō",  iast: "o" },
      { off: 0x4C, iso: "au", iast: "au" },
      { off: 0x62, iso: "l" + M, iast: "ḷ" },
      { off: 0x63, iso: "l" + M + "̄", iast: "ḹ" },
    ],
  },
  {
    title: "Consonants",
    cat: "Consonants",
    rows: [
      { off: 0x15, iso: "ka",  iast: "ka",  kata: "1" },
      { off: 0x16, iso: "kha", iast: "kha", kata: "2" },
      { off: 0x17, iso: "ga",  iast: "ga",  kata: "3" },
      { off: 0x18, iso: "gha", iast: "gha", kata: "4" },
      { off: 0x19, iso: "ṅa",  iast: "ṅa",  kata: "5" },
      { off: 0x1A, iso: "ca",  iast: "ca",  kata: "6" },
      { off: 0x1B, iso: "cha", iast: "cha", kata: "7" },
      { off: 0x1C, iso: "ja",  iast: "ja",  kata: "8" },
      { off: 0x1D, iso: "jha", iast: "jha", kata: "9" },
      { off: 0x1E, iso: "ña",  iast: "ña",  kata: "0" },
      { off: 0x1F, iso: "ṭa",  iast: "ṭa",  kata: "1" },
      { off: 0x20, iso: "ṭha", iast: "ṭha", kata: "2" },
      { off: 0x21, iso: "ḍa",  iast: "ḍa",  kata: "3" },
      { off: 0x22, iso: "ḍha", iast: "ḍha", kata: "4" },
      { off: 0x23, iso: "ṇa",  iast: "ṇa",  kata: "5" },
      { off: 0x24, iso: "ta",  iast: "ta",  kata: "6" },
      { off: 0x25, iso: "tha", iast: "tha", kata: "7" },
      { off: 0x26, iso: "da",  iast: "da",  kata: "8" },
      { off: 0x27, iso: "dha", iast: "dha", kata: "9" },
      { off: 0x28, iso: "na",  iast: "na",  kata: "0" },
      { off: 0x29, iso: "ṉa",  iast: "",    kata: "" },
      { off: 0x2A, iso: "pa",  iast: "pa",  kata: "1" },
      { off: 0x2B, iso: "pha", iast: "pha", kata: "2" },
      { off: 0x2C, iso: "ba",  iast: "ba",  kata: "3" },
      { off: 0x2D, iso: "bha", iast: "bha", kata: "4" },
      { off: 0x2E, iso: "ma",  iast: "ma",  kata: "5" },
      { off: 0x2F, iso: "ya",  iast: "ya",  kata: "1" },
      { off: 0x30, iso: "ra",  iast: "ra",  kata: "2" },
      { off: 0x31, iso: "ṟa",  iast: "",    kata: "" },
      { off: 0x32, iso: "la",  iast: "la",  kata: "3" },
      { off: 0x33, iso: "ḷa",  iast: "ḷa",  kata: "" },
      { off: 0x34, iso: "ḻa",  iast: "",    kata: "" },
      { off: 0x35, iso: "va",  iast: "va",  kata: "4" },
      { off: 0x36, iso: "śa",  iast: "śa",  kata: "5" },
      { off: 0x37, iso: "ṣa",  iast: "ṣa",  kata: "6" },
      { off: 0x38, iso: "sa",  iast: "sa",  kata: "7" },
      { off: 0x39, iso: "ha",  iast: "ha",  kata: "8" },
    ],
  },
  {
    title: "Consonants with nukta (Devanagari-specific precomposed letters)",
    cat: "Consonants",
    devanagariOnly: true, // U+0958–095F are Devanagari-only; other scripts have
                          // unrelated characters at the parallel offsets.
    rows: [
      { off: 0x58, iso: "qa",          iast: "" },
      { off: 0x59, iso: "ḵha",   iast: "" },
      { off: 0x5A, iso: "ġa",          iast: "" },
      { off: 0x5B, iso: "za",          iast: "" },
      { off: 0x5C, iso: "ṛa",          iast: "" },
      { off: 0x5D, iso: "ṛha",         iast: "" },
      { off: 0x5E, iso: "fa",          iast: "" },
      { off: 0x5F, iso: "ẏa",          iast: "" },
    ],
  },
  {
    title: "Signs & marks",
    cat: "AUTO", // resolved per-row by searching all categories
    rows: [
      { off: 0x01, iso: "m̐", iast: "m̐", note: "candrabindu / anunāsika" },
      { off: 0x02, iso: "ṁ",       iast: "ṃ",       note: "anusvāra" },
      { off: 0x03, iso: "ḥ",       iast: "ḥ",       note: "visarga" },
      { off: 0x3C, iso: "",        iast: "",        note: "nukta" },
      { off: 0x3D, iso: "'",       iast: "'",       note: "avagraha" },
      { off: 0x4D, iso: "",        iast: "",        note: "virāma / halant" },
    ],
  },
  {
    title: "Special & punctuation",
    cat: "AUTO",
    rows: [
      { off: 0x50, iso: "ōṁ", iast: "oṃ", note: "OM / AUM" },
      { off: 0x64, iso: ".",  iast: ".",  note: "daṇḍa" },
      { off: 0x65, iso: "..", iast: "..", note: "double daṇḍa" },
    ],
  },
  {
    title: "Digits",
    cat: "Others",
    rows: [
      { off: 0x66, iso: "0", iast: "0", kata: "0" },
      { off: 0x67, iso: "1", iast: "1", kata: "1" },
      { off: 0x68, iso: "2", iast: "2", kata: "2" },
      { off: 0x69, iso: "3", iast: "3", kata: "3" },
      { off: 0x6A, iso: "4", iast: "4", kata: "4" },
      { off: 0x6B, iso: "5", iast: "5", kata: "5" },
      { off: 0x6C, iso: "6", iast: "6", kata: "6" },
      { off: 0x6D, iso: "7", iast: "7", kata: "7" },
      { off: 0x6E, iso: "8", iast: "8", kata: "8" },
      { off: 0x6F, iso: "9", iast: "9", kata: "9" },
    ],
  },
];

// ----------------------------------------------------------------------------
// 5. Helpers to query the extension dicts.
// ----------------------------------------------------------------------------

const CATEGORIES = ["Independent_vowels", "Dependent_vowel", "Consonants", "Others", "Accent_marks"];

// In a script dict, find ITRANS keys (within a category, or any category if
// cat === "AUTO") whose value equals the single-codepoint string `ch`.
function keysForChar(dict, cat, ch) {
  const cats = cat === "AUTO" ? CATEGORIES : [cat];
  const keys = [];
  for (const c of cats) {
    const sub = dict[c];
    if (!sub) continue;
    for (const k of Object.keys(sub)) {
      if (sub[k] === ch) keys.push(k);
    }
  }
  return keys;
}

// Does the dict contain `key` in the given category (or any, for AUTO)?
// Returns the mapped value or undefined.
function valueForKey(dict, cat, key) {
  const cats = cat === "AUTO" ? CATEGORIES : [cat];
  for (const c of cats) {
    const sub = dict[c];
    if (sub && key in sub) return sub[c === undefined ? key : key] !== undefined ? sub[key] : undefined;
  }
  return undefined;
}

// ----------------------------------------------------------------------------
// 6. Build rows and validate each script cell.
// ----------------------------------------------------------------------------

function cpHex(cp) {
  return "U+" + cp.toString(16).toUpperCase().padStart(4, "0");
}

function metaTooltip(cp) {
  const name = ucdNames.get(cp) || "(unassigned)";
  const ver = lookupAge(cp);
  const year = ver && VERSION_YEAR[ver] ? VERSION_YEAR[ver] : "";
  const block = lookupBlock(cp) || "(no block)";
  const verStr = ver ? ("Unicode " + ver + (year ? " (" + year + ")" : "")) : "version: n/a";
  return [cpHex(cp), name, block, verStr].join("\n");
}

// Determine the canonical ITRANS keys for a phoneme: the keys the extension's
// Devanagari dict maps to the Devanagari codepoint for this offset.
function canonicalItrans(group, off) {
  const dev = SCRIPTS.find((s) => s.key === "devanagari");
  const ch = String.fromCodePoint(dev.base + off);
  return keysForChar(dev.dict, group.cat, ch);
}

function validateCell(script, group, off, canonicalKeys) {
  const cp = script.base + off;
  // Devanagari-specific groups (e.g. the nukta-precomposed letters) have no
  // parallel codepoint in other scripts — the same offset there is a different
  // character. Mark non-Devanagari cells as n/a rather than mis-comparing.
  if (group.devanagariOnly && script.key !== "devanagari") {
    return { status: "na", cp, devOnly: true };
  }
  if (!isAssigned(cp)) {
    return { status: "na", cp };
  }
  const ch = String.fromCodePoint(cp);
  const greenKeys = keysForChar(script.dict, group.cat, ch);
  if (greenKeys.length > 0) {
    return { status: "green", cp, ch, keys: greenKeys };
  }
  // Not produced. Is a canonical ITRANS key present but mapping elsewhere?
  const cats = group.cat === "AUTO" ? CATEGORIES : [group.cat];
  for (const k of canonicalKeys) {
    for (const c of cats) {
      const sub = script.dict[c];
      if (sub && k in sub && sub[k] !== ch) {
        return { status: "red", cp, ch, key: k, actual: sub[k] };
      }
    }
  }
  return { status: "yellow", cp, ch };
}

// ----------------------------------------------------------------------------
// 7. Emit HTML.
// ----------------------------------------------------------------------------

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const rowsHtml = [];
let counts = { green: 0, yellow: 0, red: 0, na: 0, ref: 0, pass: 0 };
// Per script, the codepoints the aligned rows already use — so the
// untransliterable scan below doesn't re-list an already-shown character.
const covered = {};
SCRIPTS.forEach((s) => { covered[s.key] = new Set(); });

for (const group of groups) {
  rowsHtml.push(
    '<tr class="group-head"><td colspan="' + (4 + SCRIPTS.length) + '">' + esc(group.title) + "</td></tr>"
  );
  for (const r of group.rows) {
    const canonical = canonicalItrans(group, r.off);
    const itransDisplay = canonical.length ? canonical.map(esc).join(", ") : "&mdash;";

    const searchTokens = [];   // whole-blob haystack (codes, symbols, names, blocks…)
    const visibleTokens = [];  // only what is shown in the cells
    const rowStatuses = new Set();
    const addTok = (t) => { if (t) searchTokens.push(String(t)); };
    const addVis = (t) => { if (t || t === 0) visibleTokens.push(String(t)); };
    canonical.forEach((k) => { addTok(k); addVis(k); });
    addTok(r.iso); addTok(r.iast); addTok(r.kata); addTok(r.note);
    addVis(r.iso); addVis(r.iast); addVis(r.kata);

    const cells = [];
    cells.push('<td class="itrans" data-col="itrans">' + itransDisplay + "</td>");
    cells.push('<td class="lat" data-col="iso">' + (r.iso ? esc(r.iso) : "&mdash;") + "</td>");
    cells.push('<td class="lat" data-col="iast">' + (r.iast ? esc(r.iast) : "&mdash;") + "</td>");
    cells.push('<td class="kata" data-col="kata">' + (r.kata != null && r.kata !== "" ? esc(r.kata) : "&mdash;") + "</td>");

    for (const script of SCRIPTS) {
      const v = validateCell(script, group, r.off, canonical);
      if (v.status === "na") {
        const naTip = v.devOnly
          ? "No parallel character in this script (Devanagari-specific letter)"
          : cpHex(v.cp) + " — not assigned in this script";
        cells.push('<td class="cell na" data-col="' + script.key + '" title="' + esc(naTip) + '">&middot;</td>');
        counts.na++;
        rowStatuses.add("na");
        continue;
      }
      counts[v.status]++;
      rowStatuses.add(v.status);
      covered[script.key].add(v.cp);
      // whole-blob searchable: the symbol, its hex (with/without U+), name, block
      addTok(v.ch);
      addTok(v.cp.toString(16));
      addTok(cpHex(v.cp));
      addTok(ucdNames.get(v.cp));
      addTok(lookupBlock(v.cp));
      addVis(v.ch); // the symbol is the only visible part of a script cell
      const tip = metaTooltip(v.cp);
      let extra = "";
      if (v.status === "green") extra = "ITRANS keys: " + v.keys.join(", ");
      else if (v.status === "yellow") extra = "Not mapped by the extension";
      else if (v.status === "red") extra = "Extension maps a key to " + cpHex(v.actual.codePointAt(0));
      const fullTip = tip + (extra ? "\n— " + extra : "") + "\nclick to copy codepoint";
      cells.push(
        '<td class="cell ' + v.status + '" data-col="' + script.key +
        '" data-tip="' + esc(fullTip) + '" data-cphex="' + esc(cpHex(v.cp)) + '">' +
        esc(v.ch) + "</td>"
      );
    }

    // Whole-blob haystack: raw + diacritic-stripped, lowercased.
    const raw = searchTokens.join(" ").toLowerCase();
    const stripped = raw.normalize("NFD").replace(/[̀-ͯ]/g, "");
    const haystack = raw === stripped ? raw : raw + " " + stripped;
    // Visible-only haystack: just the cell contents (no metadata/diacritic-strip).
    const visible = visibleTokens.join(" ").toLowerCase();
    const devCp = 0x0900 + r.off; // sort key (parallel-layout codepoint)
    rowsHtml.push(
      '<tr data-search="' + esc(haystack) + '" data-visible="' + esc(visible) +
      '" data-status="' + esc(Array.from(rowStatuses).join(" ")) + '" data-cp="' + devCp + '">' +
      cells.join("") + "</tr>"
    );
  }
}

// ---- Accent & control marks (the extension's Accent_marks input → output) ----
// Keyed by the INPUT combining/control mark; each script cell shows the OUTPUT
// the converter produces in that script. Verdict per cell:
//   green = converted to the script's native sign
//   pass  = preserved unchanged because the script has no native equivalent (correct)
//   yellow= preserved although the script DOES have a native sign (should convert)
// The nukta (U+0323) is omitted here — it is already the offset-0x3C row above.
const DOT = "◌"; // dotted circle so a lone combining mark renders visibly
const ACCENT_MARKS = [
  { mark: "​", nativeOff: null, kw: null }, // ZERO WIDTH SPACE
  { mark: "‍", nativeOff: null, kw: null }, // ZERO WIDTH JOINER
  { mark: "̀", nativeOff: 0x53, kw: /GRAVE/ },
  { mark: "́", nativeOff: 0x54, kw: /ACUTE/ },
  { mark: "̇", nativeOff: 0x71, kw: /HIGH SPACING DOT/ },
  { mark: "̊", nativeOff: 0x70, kw: /ABBREVIATION/ },
  { mark: "̍", nativeOff: 0x51, kw: /UDATTA|UDAAT/ },
  { mark: "̲", nativeOff: 0x52, kw: /ANUDATTA/ },
];
rowsHtml.push(
  '<tr class="group-head"><td colspan="' + (4 + SCRIPTS.length) + '">' +
  esc("Accent & control marks — extension's Accent_marks (input mark → per-script output; ◌ = dotted circle)") +
  "</td></tr>"
);
for (const am of ACCENT_MARKS) {
  const inCp = am.mark.codePointAt(0);
  const rowStatuses = new Set();
  const tokens = [];
  const addTok = (t) => { if (t) tokens.push(String(t).toLowerCase()); };
  addTok(am.mark.codePointAt(0).toString(16));
  addTok(cpHex(inCp)); addTok(ucdNames.get(inCp)); addTok(lookupBlock(inCp)); addTok("accent");
  const cells = [
    '<td class="itrans" data-col="itrans" data-tip="' +
      esc(metaTooltip(inCp) + "\ninput mark") + '" data-cphex="' + esc(cpHex(inCp)) + '">' +
      esc(DOT + am.mark) + "</td>",
    '<td class="lat" data-col="iso">&mdash;</td>',
    '<td class="lat" data-col="iast">&mdash;</td>',
    '<td class="kata" data-col="kata">&mdash;</td>',
  ];
  for (const script of SCRIPTS) {
    const out = (script.dict.Accent_marks || {})[am.mark];
    if (out === undefined) {
      cells.push('<td class="cell blank" data-col="' + script.key + '"></td>');
      continue;
    }
    const converted = out !== am.mark;
    let nativeExists = false, nativeCp = null;
    if (am.nativeOff != null) {
      nativeCp = script.base + am.nativeOff;
      nativeExists = am.kw.test(ucdNames.get(nativeCp) || "");
    }
    const status = converted ? "green" : (nativeExists ? "yellow" : "pass");
    rowStatuses.add(status);
    counts[status]++;
    const outCp = out.codePointAt(0);
    const note = converted
      ? "converted to native sign"
      : (nativeExists ? "preserved — but native " + cpHex(nativeCp) + " exists (should convert)"
                      : "preserved (no native equivalent)");
    addTok(outCp.toString(16)); addTok(cpHex(outCp)); addTok(ucdNames.get(outCp));
    cells.push(
      '<td class="cell ' + status + '" data-col="' + script.key + '" data-tip="' +
      esc(metaTooltip(outCp) + "\n— " + note + "\nclick to copy codepoint") +
      '" data-cphex="' + esc(cpHex(outCp)) + '">' + esc(DOT + out) + "</td>"
    );
  }
  rowsHtml.push(
    '<tr data-search="' + esc(tokens.join(" ")) + '" data-visible="' + esc((DOT + am.mark).toLowerCase()) +
    '" data-status="' + esc(Array.from(rowStatuses).join(" ")) + '" data-cp="' + inCp + '">' +
    cells.join("") + "</tr>"
  );
}

// Emit one untransliterable row: the symbol sits only in `ownerKey`'s column.
function pushExtraRow(cp, ownerKey) {
  const ch = String.fromCodePoint(cp);
  const cells = [
    '<td class="itrans" data-col="itrans">&mdash;</td>',
    '<td class="lat" data-col="iso">&mdash;</td>',
    '<td class="lat" data-col="iast">&mdash;</td>',
    '<td class="kata" data-col="kata">&mdash;</td>',
  ];
  for (const s2 of SCRIPTS) {
    if (s2.key === ownerKey) {
      const tip = metaTooltip(cp) + "\nclick to copy codepoint";
      cells.push(
        '<td class="cell ref" data-col="' + s2.key + '" data-tip="' + esc(tip) +
        '" data-cphex="' + esc(cpHex(cp)) + '">' + esc(ch) + "</td>"
      );
    } else {
      cells.push('<td class="cell blank" data-col="' + s2.key + '"></td>');
    }
  }
  counts.ref++;
  const toks = [ch, cp.toString(16), cpHex(cp), ucdNames.get(cp), lookupBlock(cp)]
    .filter(Boolean).join(" ").toLowerCase();
  rowsHtml.push(
    '<tr data-search="' + esc(toks) + '" data-visible="' + esc(ch.toLowerCase()) +
    '" data-status="ref" data-cp="' + cp + '">' + cells.join("") + "</tr>"
  );
}

// Untransliterable (script-specific) characters: assigned codepoints in each
// script's blocks that no transliteration scheme covers and that aren't already
// an aligned row. Each is uncorrelated across scripts, so it gets a row where
// only its own script column is filled (status "ref" → neutral colour).
for (const script of SCRIPTS) {
  const extras = [];
  for (const [start, end] of script.blocks) {
    for (let cp = start; cp <= end; cp++) {
      if (!isAssigned(cp)) continue;
      if (covered[script.key].has(cp)) continue;
      extras.push(cp);
    }
  }
  if (!extras.length) continue;
  rowsHtml.push(
    '<tr class="group-head"><td colspan="' + (4 + SCRIPTS.length) + '">' +
    esc(script.label + " — untransliterable (script-specific characters)") + "</td></tr>"
  );
  for (const cp of extras) pushExtraRow(cp, script.key);
}

// Shared blocks: marks used across many scripts, not owned by one. Shown once,
// anchored to a representative column (Devanagari), under a labelled section.
const SHARED_GROUPS = [
  {
    label: "Vedic Extensions — shared Vedic marks (used across scripts, shown in the Devanagari column)",
    range: [0x1CD0, 0x1CFF],
    col: "devanagari",
  },
];
for (const grp of SHARED_GROUPS) {
  if (!SCRIPTS.some((s) => s.key === grp.col)) continue; // owner column not shown
  const [start, end] = grp.range;
  const extras = [];
  for (let cp = start; cp <= end; cp++) if (isAssigned(cp)) extras.push(cp);
  if (!extras.length) continue;
  rowsHtml.push(
    '<tr class="group-head"><td colspan="' + (4 + SCRIPTS.length) + '">' +
    esc(grp.label) + "</td></tr>"
  );
  for (const cp of extras) pushExtraRow(cp, grp.col);
}

const scriptHeaders = SCRIPTS.map((s) => '<th data-col="' + s.key + '">' + esc(s.label) + "</th>").join("");

// Columns available for show/hide toggling.
const COLS = [
  { key: "itrans", label: "ITRANS" },
  { key: "iso", label: "ISO 15919" },
  { key: "iast", label: "IAST" },
  { key: "kata", label: "Katapayadi" },
  ...SCRIPTS.map((s) => ({ key: s.key, label: s.label })),
];
const colChecks = COLS.map(
  (c) => '<label><input type="checkbox" class="colf" value="' + c.key + '" checked> ' + esc(c.label) + "</label>"
).join("");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Parivartan — Transliteration ↔ Script Mapping</title>
<style>
  :root{--bg:#fff;--fg:#1a1a1a;--muted:#5b6b73;--line:#d8dde2;--head:#eef2f6;
    --green:#cdeccd;--yellow:#fbf3c4;--red:#f6cccc;--na:#f0f0f0;--ref:#dfe7f0;--pass:#d3ecec;--tipbg:#222;--tipfg:#fff;}
  @media(prefers-color-scheme:dark){:root{--bg:#181a1c;--fg:#e6e8eb;--muted:#98a2a8;
    --line:#353a3f;--head:#22262a;--green:#2c4a2c;--yellow:#4a431d;--red:#522a2a;--na:#202428;
    --ref:#2a323d;--pass:#213a3a;--tipbg:#0c0c0c;--tipfg:#f2f2f2;}}
  html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}
  body{background:var(--bg);color:var(--fg);font-family:-apple-system,"Segoe UI",Roboto,sans-serif;
    margin:0 auto;max-width:1100px;padding:28px 20px 120px;line-height:1.5}
  h1{font-size:1.7em;margin:0 0 .2em}
  p.lead{color:var(--muted);margin:.2em 0 1.2em}
  .legend{display:flex;gap:18px;flex-wrap:wrap;margin:1em 0 1.4em;font-size:.9em}
  .legend span{display:inline-flex;align-items:center;gap:6px}
  .sw{width:15px;height:15px;border-radius:3px;border:1px solid var(--line);display:inline-block}
  .sw.green{background:var(--green)}.sw.yellow{background:var(--yellow)}
  .sw.red{background:var(--red)}.sw.na{background:var(--na)}.sw.ref{background:var(--ref)}.sw.pass{background:var(--pass)}
  table{border-collapse:collapse;width:100%;font-size:.95em}
  th,td{border:1px solid var(--line);padding:5px 8px;text-align:center}
  thead th{position:sticky;top:0;background:var(--head);z-index:2}
  td.itrans{font-family:monospace;text-align:left;white-space:nowrap}
  td.lat{font-style:italic}
  td.kata{font-weight:600}
  tr.group-head td{background:var(--head);text-align:left;font-weight:700;
    text-transform:uppercase;letter-spacing:.03em;font-size:.85em}
  td.cell{font-size:1.5em;line-height:1}
  td.green{background:var(--green)}td.yellow{background:var(--yellow)}
  td.red{background:var(--red)}td.na{background:var(--na);color:var(--muted);font-size:1em}
  td.ref{background:var(--ref)}td.pass{background:var(--pass)}td.blank{background:transparent}
  td[data-tip]{position:relative;cursor:pointer}
  td[data-tip]:hover::after{content:attr(data-tip);white-space:pre;position:absolute;left:50%;
    transform:translateX(-50%);bottom:135%;background:var(--tipbg);color:var(--tipfg);
    padding:7px 10px;border-radius:6px;font-size:11px;font-style:normal;font-weight:400;
    font-family:-apple-system,sans-serif;text-align:left;line-height:1.45;z-index:10;
    box-shadow:0 3px 10px rgba(0,0,0,.3);min-width:200px}
  td[data-tip]:hover::before{content:"";position:absolute;left:50%;transform:translateX(-50%);
    bottom:125%;border:6px solid transparent;border-top-color:var(--tipbg);z-index:10}
  .summary{margin:1.2em 0;font-size:.95em;color:var(--muted)}
  code{background:var(--head);padding:1px 5px;border-radius:4px;font-size:.9em}
  .toolbar{position:sticky;top:0;z-index:5;background:var(--bg);padding:10px 0;
    border-bottom:1px solid var(--line);display:flex;flex-wrap:wrap;gap:14px;align-items:center}
  .search-wrap{position:relative;flex:1;min-width:220px}
  #search{width:100%;padding:8px 30px 8px 12px;font-size:1em;border:1px solid var(--line);
    border-radius:8px;background:var(--bg);color:var(--fg)}
  #clear{position:absolute;right:8px;top:50%;transform:translateY(-50%);border:none;
    background:none;color:var(--muted);font-size:1.2em;cursor:pointer;line-height:1;display:none}
  .filters{display:flex;gap:12px;flex-wrap:wrap;font-size:.9em}
  .filters label{display:inline-flex;align-items:center;gap:5px;cursor:pointer;user-select:none}
  #count{font-size:.9em;color:var(--muted);white-space:nowrap}
  tr.hidden{display:none}
  mark{background:#ffd54a;color:#000;padding:0 1px;border-radius:2px}
  .sortlabel{font-size:.9em;color:var(--muted);display:inline-flex;align-items:center;gap:5px}
  #sort{font-size:.95em;padding:5px 6px;border:1px solid var(--line);border-radius:6px;
    background:var(--bg);color:var(--fg)}
  details.cols{font-size:.9em}
  details.cols>summary{cursor:pointer;color:var(--accent,#1b6ec2);list-style:revert}
  details.cols .filters{margin-top:8px;padding:8px 10px;border:1px solid var(--line);
    border-radius:8px;background:var(--head)}
  .vislabel{font-size:.9em;color:var(--muted);display:inline-flex;align-items:center;gap:5px;cursor:pointer;user-select:none}
  td.copied::after{content:attr(data-copied);position:absolute;left:50%;transform:translateX(-50%);
    bottom:135%;background:#2e7d32;color:#fff;padding:3px 7px;border-radius:5px;font-size:11px;
    font-style:normal;white-space:nowrap;z-index:11}
</style>
<style id="colstyle"></style>
</head>
<body>
<h1>Transliteration ↔ Indic Script Mapping</h1>
<p class="lead">ITRANS / ISO 15919 / IAST / Katapayadi against each Indic script. Hover any symbol for its Unicode block, version, codepoint and name. Cell colour shows how the Parivartan extension handles that mapping.</p>
<div class="legend">
  <span><i class="sw green"></i> handled correctly</span>
  <span><i class="sw red"></i> wrong mapping</span>
  <span><i class="sw yellow"></i> missing</span>
  <span><i class="sw na"></i> not in this script</span>
  <span><i class="sw ref"></i> untransliterable (no ITRANS/ISO/IAST/Katapayadi)</span>
  <span><i class="sw pass"></i> mark preserved (no native sign)</span>
</div>
<div class="summary">Validated against <code>src/data/tables.js</code> &mdash;
  green: ${counts.green}, yellow (missing): ${counts.yellow}, red (wrong): ${counts.red},
  grey (n/a): ${counts.na}, untransliterable: ${counts.ref}, preserved-mark: ${counts.pass}. Unicode metadata from the official UCD.</div>
<div class="toolbar">
  <div class="search-wrap">
    <input id="search" type="text" placeholder="Search symbol, ITRANS/ISO/IAST, codepoint (e.g. 0c15 or U+0C15), Unicode name, block…" autocomplete="off" spellcheck="false">
    <button id="clear" title="Clear (Esc)">&times;</button>
  </div>
  <label class="vislabel" title="When on, search matches only the text shown in the cells — not Unicode names, codepoints, blocks or notes."><input type="checkbox" id="visonly"> visible text only</label>
  <div class="filters">
    <label><input type="checkbox" class="stf" value="green" checked> green</label>
    <label><input type="checkbox" class="stf" value="red" checked> red</label>
    <label><input type="checkbox" class="stf" value="yellow" checked> yellow</label>
    <label><input type="checkbox" class="stf" value="na" checked> n/a</label>
    <label><input type="checkbox" class="stf" value="ref" checked> untransliterable</label>
    <label><input type="checkbox" class="stf" value="pass" checked> preserved</label>
  </div>
  <label class="sortlabel">Sort
    <select id="sort">
      <option value="grouped">Grouped</option>
      <option value="issues">Issues first</option>
      <option value="cp">Codepoint</option>
    </select>
  </label>
  <details class="cols">
    <summary>Columns</summary>
    <div class="filters">${colChecks}</div>
  </details>
  <span id="count"></span>
</div>
<table>
<thead>
<tr><th data-col="itrans">ITRANS</th><th data-col="iso">ISO 15919</th><th data-col="iast">IAST</th><th data-col="kata">Katapayadi</th>${scriptHeaders}</tr>
</thead>
<tbody>
${rowsHtml.join("\n")}
</tbody>
</table>
<script>
(function(){
  var search=document.getElementById("search");
  var clearBtn=document.getElementById("clear");
  var countEl=document.getElementById("count");
  var sortSel=document.getElementById("sort");
  var colStyle=document.getElementById("colstyle");
  var visonly=document.getElementById("visonly");
  var stf=[].slice.call(document.querySelectorAll(".stf"));
  var colf=[].slice.call(document.querySelectorAll(".colf"));
  var tbody=document.querySelector("tbody");
  var allRows=[].slice.call(document.querySelectorAll("tbody tr"));
  var dataRows=allRows.filter(function(r){return !r.classList.contains("group-head");});
  var origOrder=allRows.slice();
  var textCols=["itrans","iso","iast","kata"];

  function strip(s){return s.normalize("NFD").replace(/[\\u0300-\\u036f]/g,"");}
  function reEsc(s){return s.replace(/[.*+?^{}()|[\\]\\\\$]/g,"\\\\$&");}
  function htmlEsc(s){return s.replace(/[&<>]/g,function(c){return c==="&"?"&amp;":c==="<"?"&lt;":"&gt;";});}

  function rawTerms(){
    return search.value.trim().toLowerCase().split(/\\s+/).filter(Boolean);
  }
  function allTerms(){
    var q=search.value.trim().toLowerCase();
    var t=(q+" "+strip(q)).split(/\\s+/).filter(Boolean);
    return t.filter(function(x,i){return t.indexOf(x)===i;});
  }

  function highlightRow(tr,terms){
    textCols.forEach(function(c){
      var td=tr.querySelector('[data-col="'+c+'"]');
      if(!td)return;
      if(td.dataset.orig===undefined)td.dataset.orig=td.textContent;
      var text=td.dataset.orig;
      if(!terms.length){td.textContent=text;return;}
      var re=new RegExp("("+terms.map(reEsc).join("|")+")","gi");
      td.innerHTML=htmlEsc(text).replace(re,"<mark>$1</mark>");
    });
  }

  function applySort(){
    var mode=sortSel.value;
    if(mode==="grouped"){
      origOrder.forEach(function(tr){tbody.appendChild(tr);});
      return;
    }
    var rows=dataRows.slice();
    if(mode==="cp"){
      rows.sort(function(a,b){return (+a.dataset.cp)-(+b.dataset.cp);});
    }else if(mode==="issues"){
      var rank={red:0,yellow:1,green:2,pass:3,na:4,ref:5};
      var sev=function(tr){
        var arr=(tr.dataset.status||"").split(" ").map(function(x){return rank[x]==null?9:rank[x];});
        return Math.min.apply(null,arr.concat([9]));
      };
      rows.sort(function(a,b){return sev(a)-sev(b)||(+a.dataset.cp)-(+b.dataset.cp);});
    }
    rows.forEach(function(tr){tbody.appendChild(tr);});
  }

  function applyFilter(){
    // Visible-only mode searches the cell text exactly as shown (literal terms,
    // no diacritic-stripping). Default mode searches the whole metadata blob.
    var visMode=visonly.checked;
    var terms=visMode?rawTerms():allTerms();
    var hl=rawTerms();
    var act={};stf.forEach(function(c){if(c.checked)act[c.value]=true;});
    var grouped=sortSel.value==="grouped";
    var visible=0;
    dataRows.forEach(function(tr){
      var hay=(visMode?tr.getAttribute("data-visible"):tr.getAttribute("data-search"))||"";
      var textOK=terms.every(function(t){return hay.indexOf(t)!==-1;});
      var statuses=(tr.getAttribute("data-status")||"").split(" ");
      var statusOK=statuses.some(function(st){return act[st];});
      var show=textOK&&statusOK;
      tr.classList.toggle("hidden",!show);
      if(show)visible++;
      highlightRow(tr,hl);
    });
    allRows.forEach(function(tr){
      if(tr.classList.contains("group-head"))tr.classList.toggle("hidden",!grouped);
    });
    if(grouped){
      var header=null,seen=false;
      allRows.forEach(function(tr){
        if(tr.classList.contains("group-head")){
          if(header)header.classList.toggle("hidden",!seen);
          header=tr;seen=false;
        }else if(!tr.classList.contains("hidden")){seen=true;}
      });
      if(header)header.classList.toggle("hidden",!seen);
    }
    countEl.textContent=visible+" row"+(visible===1?"":"s");
    clearBtn.style.display=search.value?"block":"none";
  }

  function applyCols(){
    var hidden=colf.filter(function(c){return !c.checked;})
      .map(function(c){return '[data-col="'+c.value+'"]';});
    colStyle.textContent=hidden.length?hidden.join(",")+"{display:none}":"";
  }

  function syncHash(){
    var p=[];
    if(search.value)p.push("q="+encodeURIComponent(search.value));
    var offS=stf.filter(function(c){return !c.checked;}).map(function(c){return c.value;});
    if(offS.length)p.push("hide="+offS.join(","));
    var offC=colf.filter(function(c){return !c.checked;}).map(function(c){return c.value;});
    if(offC.length)p.push("cols="+offC.join(","));
    if(sortSel.value!=="grouped")p.push("sort="+sortSel.value);
    if(visonly.checked)p.push("vis=1");
    history.replaceState(null,"",p.length?"#"+p.join("&"):location.pathname+location.search);
  }

  function loadHash(){
    var h=location.hash.replace(/^#/,"");
    if(!h)return;
    h.split("&").forEach(function(kv){
      var i=kv.indexOf("=");if(i<0)return;
      var k=kv.slice(0,i),v=decodeURIComponent(kv.slice(i+1));
      if(k==="q")search.value=v;
      else if(k==="hide"){var s=v.split(",");stf.forEach(function(c){c.checked=s.indexOf(c.value)===-1;});}
      else if(k==="cols"){var s=v.split(",");colf.forEach(function(c){c.checked=s.indexOf(c.value)===-1;});}
      else if(k==="sort")sortSel.value=v;
      else if(k==="vis")visonly.checked=(v==="1");
    });
  }

  function refresh(){applySort();applyFilter();syncHash();}

  search.addEventListener("input",refresh);
  sortSel.addEventListener("change",refresh);
  visonly.addEventListener("change",refresh);
  stf.forEach(function(c){c.addEventListener("change",refresh);});
  colf.forEach(function(c){c.addEventListener("change",function(){applyCols();syncHash();});});
  clearBtn.addEventListener("click",function(){search.value="";refresh();search.focus();});
  document.addEventListener("keydown",function(e){
    if(e.key==="/"&&document.activeElement!==search){e.preventDefault();search.focus();}
    else if(e.key==="Escape"&&document.activeElement===search){search.value="";refresh();}
  });
  tbody.addEventListener("click",function(e){
    var cell=e.target.closest?e.target.closest("td[data-cphex]"):null;
    if(!cell)return;
    var cp=cell.getAttribute("data-cphex");
    if(!cp)return;
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(cp).then(function(){
        cell.setAttribute("data-copied","copied "+cp);
        cell.classList.add("copied");
        setTimeout(function(){cell.classList.remove("copied");},900);
      }).catch(function(){});
    }
  });

  loadHash();
  applyCols();
  refresh();
})();
</script>
</body>
</html>
`;

const outPath = process.argv[2] || path.join(rootDir, "script-mapping.html");
fs.writeFileSync(outPath, html, "utf8");
console.error(
  "Wrote " + outPath + "\n" +
  "Cells — green:" + counts.green + " yellow:" + counts.yellow +
  " red:" + counts.red + " na:" + counts.na
);
