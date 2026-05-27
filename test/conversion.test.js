"use strict";

// Standalone test harness for the Parivartan conversion library.
// Loads src/data/tables.js, src/lib/myModule.js and src/lib/convert.js into
// a shared vm context (no browser, no bundler) and runs scenario tests.
//
// Run with:  node test/conversion.test.js
//
// Notes on transliteration conventions used in the test inputs:
//   - ITRANS: 'e' is SHORT-e (rare in Sanskrit/Hindi); 'E' / 'ee' = LONG-e.
//             Same for 'o' / 'O' / 'oo'. Tests use 'E' / 'O' where the
//             intended output is the standard Hindi/Sanskrit long vowel.
//   - ISO 15919: 'e' is short-e, 'ē' is long-e (with macron). Likewise 'o'/'ō'.
//                'ṛ' = retroflex flap (ड़), not vocalic R; vocalic R is 'r̥'.
//   - IAST: 'e' is always long-e by convention; 'ṛ' is vocalic R.
//   - General: lenient, case-insensitive. Uses extended dict where
//              't' → ट (retroflex), 'tt' → ठ, 'd' → ड etc.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const files = [
  "src/data/tables.js",
  "src/lib/myModule.js",
  "src/lib/convert.js",
];

const context = {};
vm.createContext(context);
for (const f of files) {
  vm.runInContext(fs.readFileSync(path.join(rootDir, f), "utf8"), context, {
    filename: f,
  });
}
context.Parivartan.init();

function run(mode, target, input, opts) {
  const html = (opts && opts.html) || "";
  const text = (opts && opts.text) || input;
  const preferASCIIDigits = (opts && "preferASCIIDigits" in opts)
    ? opts.preferASCIIDigits
    : true;
  return context.parivartanRunConversion(mode, target, html, text, preferASCIIDigits);
}

const tests = [
  // ----- ITRANS forward (English ITRANS -> Indic) -----
  {
    name: "ITRANS -> Devanagari (Hare Krishna mantra, long-e via 'E')",
    mode: "itrans", target: "Devanagari",
    input: "harE kRRiShNa harE kRRiShNa kRRiShNa kRRiShNa harE harE",
    expected: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे",
  },
  {
    name: "ITRANS -> Telugu (Hare Rama mantra, long-e via 'E')",
    mode: "itrans", target: "Telugu",
    input: "harE rAma harE rAma rAma rAma harE harE jaya rAma",
    expected: "హరే రామ హరే రామ రామ రామ హరే హరే జయ రామ",
  },
  {
    name: "ITRANS -> Kannada (devotional names, long-o via 'O')",
    mode: "itrans", target: "Kannada",
    input: "rAma kRRiShNa gOvinda harE nArAyaNa hari shrI",
    expected: "ರಾಮ ಕೃಷ್ಣ ಗೋವಿನ್ದ ಹರೇ ನಾರಾಯಣ ಹರಿ ಶ್ರೀ",
  },
  {
    name: "ITRANS -> Devanagari (Vande Mataram opening)",
    mode: "itrans", target: "Devanagari",
    input: "vandE mAtaram sujalAm suphalAm malayajashItalAm",
    expected: "वन्दे मातरम् सुजलाम् सुफलाम् मलयजशीतलाम्",
  },

  // ----- ISO 15919 forward -----
  {
    name: "ISO -> Devanagari (capital-first words, the case-insensitive fix)",
    mode: "iso", target: "Devanagari",
    input: "Bhārata mahān dēśa rāma gōvinda harē hari",
    expected: "भारत महान् देश राम गोविन्द हरे हरि",
  },
  {
    name: "ISO -> Telugu (mixed capitalization, long vowels)",
    mode: "iso", target: "Telugu",
    input: "Bhārata rāma gōvinda harē Murāri nārāyaṇa hari",
    expected: "భారత రామ గోవిన్ద హరే మురారి నారాయణ హరి",
  },

  // ----- IAST forward -----
  {
    name: "IAST -> Devanagari (capital + diacritics, vocalic R via 'ṛ')",
    mode: "iast", target: "Devanagari",
    input: "Kṛṣṇa Govinda Hare Murāri Nārāyaṇa Hari rāma",
    expected: "कृष्ण गोविन्द हरे मुरारि नारायण हरि राम",
  },
  {
    name: "IAST -> Devanagari (Gītā 1.1 opening, four words)",
    mode: "iast", target: "Devanagari",
    input: "dharmakṣetre kurukṣetre samavetā yuyutsavaḥ",
    expected: "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः",
  },

  // ----- General (lenient English) -----
  // General mode is the "any spelling" fallback. It is intentionally lenient
  // and produces less canonical output than the strict modes; these tests pin
  // the actual library behavior so regressions are caught.
  {
    name: "General -> Devanagari (casual capitalized names)",
    mode: "general", target: "Devanagari",
    input: "Rama Krishna Govinda Hare Murari Narayana Hari",
    expected: "रम क्रिश्न गॊविन्ड हरॆ मुररि नरयन हरि",
  },
  {
    name: "General -> Devanagari ('tt' aspirated retroflex mapping)",
    mode: "general", target: "Devanagari",
    input: "Kutti Patta Bhatta Matti Latti Datta Vasishtta",
    expected: "कुठि पठ भठ मठि लठि डठ वसिश्ठ",
  },

  // ----- Indic mode (auto-detect, reverse / cross-script) -----
  // The reverse path produces double-letter forms (aa, ee, ii, oo, shh) for
  // long vowels and retroflex sh, since those are the forms in the original
  // dictionaries that the reverse maps build from.
  {
    name: "indic Devanagari -> English (ITRANS reverse)",
    mode: "indic", target: "English",
    input: "नमस्ते श्री राम जय राम जय जय राम कृष्ण गोविन्द",
    expected: "namastee shrii raama jaya raama jaya jaya raama kRRishhNa goovinda",
  },
  {
    name: "indic Devanagari -> Telugu",
    mode: "indic", target: "Telugu",
    input: "नमस्ते श्री राम जय राम जय जय राम कृष्ण गोविन्द",
    expected: "నమస్తే శ్రీ రామ జయ రామ జయ జయ రామ కృష్ణ గోవిన్ద",
  },
  {
    name: "indic Telugu -> Devanagari",
    mode: "indic", target: "Devanagari",
    input: "నమస్తే శ్రీ రామ జయ రామ జయ జయ రామ కృష్ణ గోవిన్ద",
    expected: "नमस्ते श्री राम जय राम जय जय राम कृष्ण गोविन्द",
  },

  // ----- Katapayadi -----
  // Pinned to library output; the Katapayadi system maps consonants to digits
  // (k=1, p=1, ṣ=5, ṇ=0, etc.); inherent vowels and standalone vowels are
  // skipped. These tests guard against regressions in convert2Katapayadi.
  {
    name: "ITRANS -> Katapayadi (consonant cluster + words)",
    mode: "itrans", target: "Katapayadi",
    input: "kapAyAdiniyamaH paramo guruH bhAratamuni",
    expected: "11180151253242650",
  },
  {
    name: "indic Devanagari -> Katapayadi",
    mode: "indic", target: "Katapayadi",
    input: "नमस्ते श्री राम जय राम कृष्ण गोविन्द",
    expected: "056225812515348",
  },

  // ----- Indic-mode edge cases -----
  {
    name: "indic with no Indic content returns null",
    mode: "indic", target: "Telugu",
    input: "hello world from a non-indic test string here",
    expected: null,
  },
  {
    name: "indic with input already in target returns null",
    mode: "indic", target: "Devanagari",
    input: "नमस्ते श्री राम जय राम जय जय राम कृष्ण गोविन्द",
    expected: null,
  },

  // ----- HTML preservation -----
  {
    name: "HTML: ITRANS phrase with <b> and <i> tags preserved",
    mode: "itrans", target: "Devanagari",
    input: "<p>namastE <b>rAma</b> jaya jaya <i>kRRiShNa</i> gOvinda</p>",
    opts: {
      html: "<p>namastE <b>rAma</b> jaya jaya <i>kRRiShNa</i> gOvinda</p>",
      text: "namastE rAma jaya jaya kRRiShNa gOvinda",
    },
    expected: "<p>नमस्ते <b>राम</b> जय जय <i>कृष्ण</i> गोविन्द</p>",
  },
  {
    name: "HTML: ISO with capital-first words + case-sensitive attribute preserved",
    mode: "iso", target: "Devanagari",
    input: "<a href=\"MyPage\">Bhārata rāma śiva</a> gōvinda harē",
    opts: {
      html: "<a href=\"MyPage\">Bhārata rāma śiva</a> gōvinda harē",
      text: "Bhārata rāma śiva gōvinda harē",
    },
    expected: "<a href=\"MyPage\">भारत राम शिव</a> गोविन्द हरे",
  },
  {
    name: "HTML: IAST with nested tags preserved",
    mode: "iast", target: "Telugu",
    input: "<div><b>Kṛṣṇa</b> Govinda <span>Hare Murāri</span> rāma</div>",
    opts: {
      html: "<div><b>Kṛṣṇa</b> Govinda <span>Hare Murāri</span> rāma</div>",
      text: "Kṛṣṇa Govinda Hare Murāri rāma",
    },
    expected: "<div><b>కృష్ణ</b> గోవిన్ద <span>హరే మురారి</span> రామ</div>",
  },
];

let passed = 0;
const failures = [];
for (const t of tests) {
  let actual;
  let error = null;
  try {
    actual = run(t.mode, t.target, t.input, t.opts);
  } catch (e) {
    error = e;
  }
  const ok = error == null && actual === t.expected;
  if (ok) {
    passed++;
    console.log("  PASS  " + t.name);
  } else {
    failures.push({ t, actual, error });
    console.log("  FAIL  " + t.name);
  }
}

if (failures.length > 0) {
  console.log("\n--- Failures ---");
  for (const f of failures) {
    console.log("\n" + f.t.name);
    console.log("  mode/target: " + f.t.mode + " -> " + f.t.target);
    const shownInput = (f.t.opts && f.t.opts.html) ? f.t.opts.html : f.t.input;
    console.log("  input:    " + JSON.stringify(shownInput));
    console.log("  expected: " + JSON.stringify(f.t.expected));
    if (f.error) {
      console.log("  error:    " + f.error.message);
    } else {
      console.log("  actual:   " + JSON.stringify(f.actual));
    }
  }
}

console.log("\n" + passed + "/" + tests.length + " passed");
process.exit(failures.length === 0 ? 0 : 1);
