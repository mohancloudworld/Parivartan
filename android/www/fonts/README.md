# Bundled reading fonts

Android does not guarantee which Indic fonts a device has. Pixel ships Google's
Noto set; Samsung and Xiaomi ship their own, and on some devices a script is
missing entirely and renders as tofu boxes (▯▯▯). Bundling the fonts is what
makes the app look the same on every phone.

These are the **Noto Serif** faces — serif reads as more traditional for
devotional text. `fontStackFor()` in `js/typography.js` asks for
`"Noto Serif <Script>"` first and falls back to `"Noto Sans <Script>"` and then
the platform font, so the app still renders if a file is missing.

## Refreshing them

```sh
android/tools/fetch-fonts.sh        # into www/fonts/ (system copy, else upstream)
node android/tools/build-font-css.js   # regenerate www/css/fonts.css
```

The CSS is **generated, not hand-written**, because the `@font-face` weight
range has to match each file's real variable axis. Noto is not uniform here —
of the nine faces bundled, three different ranges turned up — and declaring a
range a file does not have makes browsers synthesise weights instead of
interpolating them. `build-font-css.js` reads the range out of each font's
`fvar` table.

| Face | Weight axis | Size |
| --- | --- | --- |
| Noto Serif Bengali | 400–700 | 354 KB |
| Noto Serif Telugu | 400–700 | 327 KB |
| Noto Serif Devanagari | 400–700 | 289 KB |
| Noto Serif Kannada | 400–700 | 231 KB |
| Noto Serif Oriya | 200–700 | 187 KB |
| Noto Serif Gujarati | 400–700 | 169 KB |
| Noto Serif Malayalam | 100–900 | 165 KB |
| Noto Serif Tamil | 400–700 | 87 KB |
| Noto Serif Gurmukhi | 400–700 | 52 KB |

**~1.9 MB total**, against a ~3–5 MB Capacitor shell.

Each rule carries a `unicode-range` for its script's Unicode block, so a reader
only ever downloads the face for the script they are actually reading — verified
in Chromium: viewing one passage loaded exactly one face, not all nine. The
whole set is bundled, but the cost at read time is a single font.

## Licence

All nine are **SIL Open Font License 1.1** (read from each file's own name
table, not assumed), which permits redistribution inside a commercial app as
long as the licence travels with them. `OFL.txt` is that notice — keep it beside
the fonts, and list the attribution in the app's about screen and the Play
listing.

Source: <https://github.com/notofonts> / <https://fonts.google.com/noto>

## Trimming

Only the scripts the app actually offers need to ship. Drop a `.ttf`, rerun
`build-font-css.js`, and the rule disappears with it.
