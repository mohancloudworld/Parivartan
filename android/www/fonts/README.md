# Bundled fonts

Android does not guarantee which Indic fonts a device has. Pixel ships Google's
Noto set; Samsung and Xiaomi ship their own, and on some budget devices Oriya or
Gurmukhi is missing entirely — which renders as tofu boxes (▯▯▯) instead of text.
Bundling the fonts is what makes the app look the same everywhere.

The app runs without these files (it falls back to the platform font), so the
scaffold is usable before you add them.

## What to add

Variable-weight files, one per script — a single file covers every weight:

| File | Approx. size |
| --- | --- |
| `NotoSerifDevanagari[wght].ttf` | 270 KB |
| `NotoSerifTelugu[wght].ttf` | 227 KB |
| `NotoSerifOriya[wght].ttf` | 197 KB |
| `NotoSerifGujarati[wght].ttf` | 195 KB |
| `NotoSerifKannada[wght].ttf` | 179 KB |
| `NotoSerifBengali[wght].ttf` | 161 KB |
| `NotoSerifTamil[wght].ttf` | 76 KB |
| `NotoSerifGurmukhi[wght].ttf` | 46 KB |
| `NotoSerifMalayalam[wght].ttf` | ~200 KB |

Roughly **1.6 MB for all nine** — small against a ~3–5 MB Capacitor shell.

Sizes above were measured from the Noto **Sans** variable files; the Serif
equivalents are in the same range. Serif reads as more traditional for
devotional text, which is why `fontStackFor()` in `js/typography.js` prefers it
and falls back to Sans. Check Malayalam Serif coverage — it was not present on
the machine where these were measured.

Source: <https://fonts.google.com/noto> or the `google-noto-*-fonts` packages.

## Wiring them up

Add one `@font-face` per script to `css/app.css`. The family names must match
what `fontStackFor()` builds — `"Noto Serif <Script>"`:

```css
@font-face {
  font-family: "Noto Serif Devanagari";
  src: url("../fonts/NotoSerifDevanagari[wght].ttf") format("truetype-variations");
  font-weight: 100 900;
  font-display: swap;
}
```

## Trimming

You only need the scripts you actually ship. The display setting selects one at
a time, so fonts could also be downloaded on demand — but at 1.6 MB total that
complexity is not worth it.
