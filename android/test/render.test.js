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

console.log("\n" + pass + "/" + (pass + fail) + " passed");
process.exit(fail ? 1 : 0);
