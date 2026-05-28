# Parivartan developer tools

Tooling that is **not part of the shipped extension** — it generates a
reference/validation artifact from the extension's conversion tables.

## `build-mapping-table.js` — transliteration ↔ script mapping table

Generates **`script-mapping.html`** (written to the repo root): a
cross-reference of the four transliteration schemes
(ITRANS / ISO 15919 / IAST / Katapayadi) against all nine Indic scripts, with
per-symbol Unicode metadata on hover, and each cell colour-coded by how the
extension's conversion tables (`src/data/tables.js`) actually handle it.

### Run

```sh
node tools/build-mapping-table.js            # writes script-mapping.html
node tools/build-mapping-table.js out.html   # custom output path
```

No npm dependencies. Needs Node and the trimmed UCD data in `tools/ucd/`
(committed — see below), plus `src/data/tables.js`.

### Cell colours

| Colour | Meaning |
| --- | --- |
| green | extension maps the transliteration code to the correct codepoint |
| red | wrong — maps the code to a *different* codepoint |
| yellow | missing — no mapping produces this codepoint |
| grey | the script has no such character (codepoint unassigned in Unicode) |
| blue-grey (*untransliterable*) | script-specific character with **no** ITRANS/ISO/IAST/Katapayadi equivalent (Vedic marks, Tamil numerals, etc.) — shown for reference only |

### In-page controls

Search (whole-blob, diacritic-insensitive, with a "visible text only" toggle),
status filters (incl. *untransliterable*), sort (grouped / issues-first /
codepoint), column show/hide, and click-a-symbol to copy its codepoint. All
state is encoded in the URL hash, so a filtered view is shareable.

## Unicode data (`tools/ucd/`)

The tooltip block / version / codepoint / name come from the official Unicode
Character Database. To keep the repo small, only the Indic-relevant ranges are
committed — a trimmed subset (~200 KB rather than the full 2.2 MB
`UnicodeData.txt`). Because the trimmed files are committed, the table
**regenerates offline on any machine** with no extra setup.

To refresh from the latest UCD (needs internet):

```sh
tools/fetch-ucd.sh
```

This re-downloads `UnicodeData.txt`, `DerivedAge.txt` and `Blocks.txt` from
unicode.org and re-trims them into `tools/ucd/`. The kept ranges are documented
at the top of that script.

## Status / known issues

- Covers all nine scripts: Devanagari, Telugu, Kannada, Gujarati, Tamil,
  Bengali, Gurmukhi, Malayalam, Oriya.
- Cross-script alignment uses the parallel Indic block layout (same phoneme =
  same offset in each block). A few signs are repurposed per script and need a
  per-row guard. **Known unresolved case:** Malayalam `U+0D3C` is a CIRCULAR
  VIRAMA (not a nukta), so it currently shows a false *red* in the nukta row.
  Planned fix: a per-row UCD-name check (`requireName: "NUKTA"`).

## See also

- `test/conversion.test.js` — standalone unit tests for the conversion library
  (`node test/conversion.test.js`).
