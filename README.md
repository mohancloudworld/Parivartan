Parivartan
==========
A cross-browser extension (Chrome, Edge, Firefox) to convert text from an Indian language to English and vice versa. Also supports the Katapayadi sankhya system.

Parivartan is a Manifest V3 WebExtension and runs on any Chromium-based browser as well as Firefox 115+.

<b>Installation (unpacked / development):</b><ul>
<li><b>Chrome / Edge:</b> open <code>chrome://extensions</code>, enable "Developer mode", click "Load unpacked" and select the <code>src/</code> directory.</li>
<li><b>Firefox:</b> open <code>about:debugging#/runtime/this-firefox</code>, click "Load Temporary Add-on" and select <code>src/manifest.json</code>.</li></ul>

<b>Supported formats:</b><ul>
<li>Indian: Devanagari (Sanskrit/Hindi/Marathi), Telugu, Kannada, Gujarati, Tamil, Bengali, Gurmukhi (Punjabi), Malayalam and Oriya (Odia).</li>
<li>English: ITRANS, ISO-15919 and IAST.</li>
<li>Other: Katapayadi sankhya system.</li></ul>

<b>Purpose:</b>
India is a multi linguistic nation yet have common sacred/religious texts. But it is not an easy task to maintain all these scripts in all the Indian languages. "Parivartan" add-on converts the Indian Scripts in Indian/English language to various Indian languages. This facilitates maintaining the scripts in a single language and still reach out all Indian linguistic users.

Another interesting usage of this add-on: There are many people who talk/understand some Indian languages but cannot read those languages. In such cases, the text in an Indian language can be converted to English and could be read & understand conveniently.

This add-on converts the text in the text-boxes also, so this can be used to type the text in a language and then convert to any other preferred language while posting on social networks, blogs, forums or even writing emails.

<b>Usage:</b> Select the text on a web page, right-click, and choose from the "Parivartan" menu.

<b>Menu layout:</b>

1. The "Parivartan" menu lists the target scripts directly. Picking one converts the selection using <b>ITRANS</b> with automatic input-script detection &mdash; this is the default and handles most cases: <ul><li>English (ITRANS) text &rarr; the selected Indian language or Katapayadi sankhya.</li><li>Any Indian language &rarr; English (ITRANS) or Katapayadi sankhya.</li><li>Any Indian language &rarr; another Indian language or Katapayadi sankhya.</li></ul>

2. Once you have used Parivartan at least once, a <b>"Convert to ..."</b> shortcut appears at the top of the menu and repeats your most recent conversion in one step.

3. The <b>"Other input formats"</b> submenu holds the encoding-specific conversions: <ul><li><b>English (ISO 15919)</b> &rarr; the selected Indian language or Katapayadi sankhya.</li><li><b>English (IAST)</b> &rarr; the selected Indian language or Katapayadi sankhya.</li><li><b>General English</b> &mdash; also converts text that is not strictly ITRANS, ISO-15919 or IAST. Conversion in this mode may be less precise, so prefer the matching ITRANS/ISO-15919/IAST option for accurate results.</li></ul>

<b>Configurable Options:</b>

1. Prefer ASCII Digits: When selected, excludes ASCII numbers/digits from converting into Indian format. The default behaviour is to exclude. 

<b>Technical Details:</b>

1. <a href="https://en.wikipedia.org/wiki/ITRANS" target="_blank">ITRANS</a> Tables: <a href="http://www.aczoom.com/itrans/html/dvng/node3.html" target="_blank">Devanagari/Sanskrit/Hindi/Marahti</a>, <a href="http://www.aczoom.com/itrans/html/tlgutx/node3.html" target="_blank">Telugu</a>, <a href="http://www.aczoom.com/itrans/html/kantex/node2.html" target="_blank">Kannada</a>, <a href="http://www.aczoom.com/itrans/html/gujdoc/node4.html" target="_blank">Gujarati</a>, <a href="http://www.aczoom.com/itrans/html/tamil/node5.html" target="_blank">Tamil</a>, <a href="http://www.aczoom.com/itrans/html/beng/node4.html" target="_blank">Bengali</a>, <a href="http://www.aczoom.com/itrans/html/pundoc/node5.html" target="_blank">Gurmukhi (Punjabi)</a>
2. <a href="https://en.wikipedia.org/wiki/Wikipedia:Indic_transliteration" target="_blank">ISO-15919</a>
3. <a href="https://en.wikipedia.org/wiki/IAST" target="_blank">IAST</a>
4. <a href="https://en.wikipedia.org/wiki/Katapayadi_system" target="_blank">Katapayadi sankhya</a>

<b>P.S.:</b> Please feel free to post your comments or suggestion to improve this add-on.
