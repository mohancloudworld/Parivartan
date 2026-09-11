"use strict";

// Tests for the app's render pipeline (android/www/js/render.js), loaded into
// a bare vm context alongside the synced engine - no browser, no bundler,
// mirroring test/conversion.test.js at the repo root.
//
// Run with:  node android/test/render.test.js

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const appDir = path.resolve(__dirname, "..");
const files = [
  "www/vendor/tables.js",
  "www/vendor/myModule.js",
  "www/js/typography.js",
  "www/js/render.js",
  "www/js/defaults.js",
];

const ctx = {};
vm.createContext(ctx);
for (const f of files) {
  const full = path.join(appDir, f);
  if (!fs.existsSync(full)) {
    // vendor/ is gitignored, so a fresh clone has no engine until it is synced.
    console.error(
      "Missing " + f + "\n" +
      "The conversion engine is copied from ../src and is not committed.\n" +
      "Run:  android/tools/sync-engine.sh"
    );
    process.exit(1);
  }
  vm.runInContext(fs.readFileSync(full, "utf8"), ctx, { filename: f });
}
ctx.Parivartan.init();

let pass = 0, fail = 0;
function check(name, actual, expected) {
  if (actual === expected) { console.log("  PASS  " + name); pass++; }
  else {
    console.log("  FAIL  " + name + "\n        expected: " + JSON.stringify(expected) +
                "\n        actual:   " + JSON.stringify(actual));
    fail++;
  }
}

// Helper mirroring what the store does when content is added.
function add(original) {
  const sourceScript = ctx.detectScript(original);
  return { original, sourceScript, pivotItrans: ctx.toPivot(original, sourceScript) };
}

const TELUGU = "శ్రీ రామ ౧౦౮ నామ";
const teluguItem = add(TELUGU);

console.log("\n-- source script detection --");
check("Telugu passage detected", teluguItem.sourceScript, "Telugu");
check("Devanagari passage detected", add("श्री राम").sourceScript, "Devanagari");
check("Malayalam passage detected", add("ശ്രീ രാമ").sourceScript, "Malayalam");

console.log("\n-- same-script display returns the original verbatim --");
// "Verbatim" means byte-identical once the digit preference agrees with how the
// original was written. Here the source uses native digits, so nativeDigits=true
// is the setting under which nothing at all is rewritten.
check("original preserved byte-for-byte when the digit setting agrees",
  ctx.renderContent(teluguItem, "Telugu", true), TELUGU);
check("no transliteration happens on this path (only digits can differ)",
  ctx.renderContent(teluguItem, "Telugu", false).replace(/108/, "\u0c67\u0c66\u0c6e"), TELUGU);

console.log("\n-- the digit preference applies on the verbatim path too --");
// This is the case the engine's own flag cannot reach: no transliteration runs.
check("native digits rewritten to roman in own script",
  ctx.renderContent(teluguItem, "Telugu", false), "శ్రీ రామ 108 నామ");

console.log("\n-- digit pass normalises mixed forms --");
const mixed = add("రామ ౧౦౮ నామ 2 సార్లు");
check("mixed digits all become roman",
  ctx.renderContent(mixed, "Telugu", false), "రామ 108 నామ 2 సార్లు");
check("mixed digits all become native",
  ctx.renderContent(mixed, "Telugu", true), "రామ ౧౦౮ నామ ౨ సార్లు");

console.log("\n-- cross-script display goes through the pivot --");
check("Telugu content shown in Devanagari",
  ctx.renderContent(teluguItem, "Devanagari", false), "श्री राम 108 नाम");
check("Telugu content shown in Devanagari, native digits",
  ctx.renderContent(teluguItem, "Devanagari", true), "श्री राम १०८ नाम");

console.log("\n-- Malayalam long-A renders without stray Latin (regression) --");
const mal = ctx.renderContent(add("श्री रामा"), "Malayalam", false);
check("no Latin letters leak into Malayalam output", /[A-Za-z]/.test(mal), false);

console.log("\n-- display is stable across repeated renders --");
const once = ctx.renderContent(teluguItem, "Kannada", false);
const twice = ctx.renderContent(teluguItem, "Kannada", false);
check("rendering is deterministic", once, twice);

console.log("\n-- titles: stored verbatim, searchable in Latin --");
check("Telugu title yields a latin search key",
  /^[a-z0-9 .|]+$/.test(ctx.titleSearchKey("శ్రీ రామ")), true);
check("English title passes through lowercased",
  ctx.titleSearchKey("Vishnu Sahasranamam"), "vishnu sahasranamam");

console.log("\n-- typography: user offset rides on the per-script base --");
check("Devanagari base", ctx.sizeFor("Devanagari", 0), 20);
check("Telugu base is larger for conjunct legibility", ctx.sizeFor("Telugu", 0), 22);
check("offset preserved across scripts (Devanagari +4)", ctx.sizeFor("Devanagari", 4), 24);
check("offset preserved across scripts (Telugu +4)", ctx.sizeFor("Telugu", 4), 26);
check("offset clamped at the maximum", ctx.sizeFor("Devanagari", 999), 20 + ctx.FONT_OFFSET_MAX);

console.log("\n-- every script has a typography entry and digit map --");
for (const s of ctx.INDIC_SCRIPTS) {
  const hasType = !!ctx.PARIVARTAN_TYPOGRAPHY[s];
  const hasDigits = ctx.digitPass("5", s, true) !== "5";
  check(s + ": typography + native digits present", hasType && hasDigits, true);
}

console.log("\n-- latin display --");
{
  const item = add("శ్రీ రామ ౧౦౮ నామ");
  check("ISO keeps the marks",
    ctx.renderContent(item, "ISO", false), "\u015Br\u012B r\u0101ma 108 n\u0101ma");
  check("Plain drops the marks",
    ctx.renderContent(item, "Plain", false), "shri rama 108 nama");
  // Latin ignores the digit preference: the setting chooses an Indian script's
  // digits, which have no place inside Latin text.
  check("ISO ignores the native-digit setting",
    ctx.renderContent(item, "ISO", true), ctx.renderContent(item, "ISO", false));
  check("ISO and Plain are recognised as latin targets",
    ctx.isRoman("ISO") && ctx.isRoman("Plain"), true);
  check("an Indian script is not a latin target", ctx.isRoman("Telugu"), false);
}
{
  // Independently derived, this should land on the Home Ministry's own English
  // spelling of the anthem's opening - a useful outside check on the mapping.
  const anthem = ctx.PARIVARTAN_DEFAULT_CONTENT[0];
  const item = {
    original: anthem.body,
    sourceScript: anthem.sourceScript,
    pivotItrans: ctx.toPivot(anthem.body, anthem.sourceScript),
  };
  const plain = ctx.renderContent(item, "Plain", false).split("\n");
  check("anthem line 1 in plain english",
    plain[0], "jana-gana-mana adhinayaka jaya he");
  check("anthem line 4 in plain english (retroflex flap reads as d)",
    plain[3], "dravida-utkala-banga");
  check("anthem has no leftover diacritics in plain english",
    /[^\x00-\x7F]/.test(plain.join("\n")), false);
}

console.log("\n-- a master written in a latin notation --");
{
  // The author's text is the master whatever notation it is in: kept verbatim,
  // and shown untouched when the reader asks for that same notation.
  const master = "harE kRRiShNa";
  const item = { original: master, sourceScript: "ITRANS" };
  item.pivotItrans = ctx.toPivot(master, "ITRANS");
  check("ITRANS master shown as ITRANS is the master itself",
    ctx.renderContent(item, "ITRANS", false), master);
  check("ITRANS master renders into Devanagari",
    ctx.renderContent(item, "Devanagari", false), "\u0939\u0930\u0947 \u0915\u0943\u0937\u094D\u0923");
  check("ITRANS master renders into plain english",
    ctx.renderContent(item, "Plain", false), "hare krishna");

  // All three notations of the same passage must reach one pivot, or the same
  // text would convert differently depending on how it was typed.
  const pivots = [["ITRANS", "harE kRRiShNa"], ["IAST", "hare k\u1E5B\u1E63\u1E47a"],
                  ["ISO", "har\u0113 kr\u0325\u1E63\u1E47a"]]
    .map(([fmt, txt]) => ctx.toPivot(txt, fmt));
  check("the three notations normalise to one pivot",
    new Set(pivots).size, 1);
}

console.log("\n-- declared source is validated, never guessed --");
{
  const err = (t, d) => { const v = ctx.validateSource(t, d); return v && v.level; };
  check("well-formed ITRANS passes", ctx.validateSource("harE kRRiShNa", "ITRANS"), null);
  check("well-formed IAST passes", ctx.validateSource("hare k\u1E5B\u1E63\u1E47a", "IAST"), null);
  // The trap: ordinary romanisation accepted as a notation converts to
  // plausible nonsense, and the reader who needs this feature cannot tell.
  check("ordinary english spelling declared as ITRANS warns",
    err("hare rama krishna", "ITRANS"), "warning");
  check("iast marks declared as ISO warns", err("hare k\u1E5B\u1E63\u1E47a", "ISO"), "warning");
  check("indic text declared as a notation is an error",
    err("\u0936\u094D\u0930\u0940 \u0930\u093E\u092E", "ITRANS"), "error");
  // The live bug this was built for: re-declaring the script without changing
  // the text left the item showing one script whatever the reader chose.
  check("telugu text declared as Devanagari is an error",
    err("\u0c36\u0c4d\u0c30\u0c40 \u0c30\u0c3e\u0c2e", "Devanagari"), "error");
  check("latin text declared as an indian script is an error",
    err("hare rama", "Devanagari"), "error");
  check("correctly declared indic text passes",
    ctx.validateSource("\u0c36\u0c4d\u0c30\u0c40 \u0c30\u0c3e\u0c2e", "Telugu"), null);
}

console.log("\n-- converting the master --");
{
  const item = { pivotItrans: ctx.toPivot("harE kRRiShNa", "ITRANS") };
  check("master converts to an indian script",
    ctx.convertMaster(item, "Telugu"), "\u0c39\u0c30\u0c47 \u0c15\u0c43\u0c37\u0c4d\u0c23");
  check("master converts to ISO", ctx.convertMaster(item, "ISO"), "har\u0113 kr\u0325\u1E63\u1E47a");
  // Plain english and IAST are readable and enterable respectively, but neither
  // can be generated as a master - plain has lost vowel length for good.
  check("plain english is not a conversion target",
    ctx.convertTargets().indexOf("Plain"), -1);
  check("IAST is not a conversion target", ctx.convertTargets().indexOf("IAST"), -1);
  check("IAST is still a source format", ctx.sourceFormats().indexOf("IAST") >= 0, true);

  // Round trip: convert the master to a script and back, and the pivot holds.
  const toTelugu = ctx.convertMaster(item, "Telugu");
  check("pivot survives a master conversion",
    ctx.toPivot(toTelugu, "Telugu"), item.pivotItrans);
}

console.log("\n-- shipped default content --");
// These are national symbols reproduced from the Government of India's own
// order, so the checks are about fidelity, not formatting: the stored text must
// come back byte-identical in its own script, and must be recognised as the
// script it claims to be.
for (const d of ctx.PARIVARTAN_DEFAULT_CONTENT) {
  const name = d.title.replace(/\s*\(.*/, "");
  check(name + ": declared script matches detection",
    ctx.detectScript(d.body), d.sourceScript);
  const item = {
    original: d.body,
    sourceScript: d.sourceScript,
    pivotItrans: ctx.toPivot(d.body, d.sourceScript),
  };
  check(name + ": renders byte-identical in its own script",
    ctx.renderContent(item, d.sourceScript, false), d.body);
  check(name + ": title yields a latin search key",
    /^[a-z0-9 ().|-]+$/.test(ctx.titleSearchKey(d.title)), true);
}

// The anthem must be clean in every script the app offers - it is the most
// visible text in the app and the least acceptable place for an artefact.
{
  const anthem = ctx.PARIVARTAN_DEFAULT_CONTENT[0];
  const item = {
    original: anthem.body,
    sourceScript: anthem.sourceScript,
    pivotItrans: ctx.toPivot(anthem.body, anthem.sourceScript),
  };
  for (const s of ctx.INDIC_SCRIPTS) {
    check("anthem: no latin leaks into " + s,
      /[A-Za-z]/.test(ctx.renderContent(item, s, false)), false);
  }
}

console.log("\n" + pass + "/" + (pass + fail) + " passed");
process.exit(fail ? 1 : 0);
