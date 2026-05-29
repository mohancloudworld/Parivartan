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

<b>Usage:</b> Select the text on a web page, right-click, and choose from the "Parivartan" menu. The menu appears on normal web pages and on local files (<code>file://</code>); it is intentionally hidden on browser-internal pages (<code>chrome://</code>, <code>about:</code>, the extension stores, <code>view-source:</code>) where extensions are not permitted to run.

<b>Local files (<code>file://</code>):</b><ul>
<li><b>Chrome / Edge:</b> open <code>chrome://extensions</code> &rarr; Parivartan &rarr; <b>Details</b>, and turn on <b>"Allow access to file URLs"</b>. This is a browser security setting that only you can enable; the extension cannot grant it itself. Once enabled, right-click conversion works on local HTML files.</li>
<li><b>Firefox:</b> works on local files via the <code>activeTab</code> permission when you invoke it from the right-click menu &mdash; no extra setting required.</li></ul>

<b>Menu layout:</b>
<ol>
<li>The "Parivartan" menu has one submenu per input format, each listing the available target scripts:<ul>
<li><b>"From any Indian script to"</b> &mdash; auto-detects the input Indian language. Targets: another Indian language, English (ITRANS) or Katapayadi sankhya. <i>Detection assumes the whole selection is in one script; if a selection mixes scripts, only the first detected script is converted and text in other scripts is left unchanged.</i></li>
<li><b>"From English (ITRANS) to"</b> &rarr; the selected Indian language or Katapayadi sankhya.</li>
<li><b>"From English (ISO 15919) to"</b> &rarr; the selected Indian language or Katapayadi sankhya.</li>
<li><b>"From English (IAST) to"</b> &rarr; the selected Indian language or Katapayadi sankhya.</li>
<li><b>"From General English to"</b> &mdash; also converts text that is not strictly ITRANS, ISO-15919 or IAST. Conversion in this mode may be less precise, so prefer the matching ITRANS/ISO-15919/IAST option for accurate results.</li></ul></li>
<li>After your first conversion, the targets for that input format are also <b>hoisted flat to the top</b> of the Parivartan menu under a greyed-out header that names the format (for example, "From English (ITRANS) to"). Subsequent conversions in the same category take one click less; switching to a different input format from one of the submenus updates the hoisted list.</li>
</ol>

<b>Toolbar popup:</b> Click the Parivartan toolbar button to open a popup where you can type or paste text, choose the input format and target script, watch the result update live, and copy it &mdash; all without altering any page content.

<b>Configurable Options:</b>

1. Prefer ASCII Digits: When selected, excludes ASCII numbers/digits from converting into Indian format. The default behaviour is to exclude. 

<b>Technical Details:</b>

1. <a href="https://en.wikipedia.org/wiki/ITRANS" target="_blank">ITRANS</a> Tables: <a href="http://www.aczoom.com/itrans/html/dvng/node3.html" target="_blank">Devanagari/Sanskrit/Hindi/Marahti</a>, <a href="http://www.aczoom.com/itrans/html/tlgutx/node3.html" target="_blank">Telugu</a>, <a href="http://www.aczoom.com/itrans/html/kantex/node2.html" target="_blank">Kannada</a>, <a href="http://www.aczoom.com/itrans/html/gujdoc/node4.html" target="_blank">Gujarati</a>, <a href="http://www.aczoom.com/itrans/html/tamil/node5.html" target="_blank">Tamil</a>, <a href="http://www.aczoom.com/itrans/html/beng/node4.html" target="_blank">Bengali</a>, <a href="http://www.aczoom.com/itrans/html/pundoc/node5.html" target="_blank">Gurmukhi (Punjabi)</a>
2. <a href="https://en.wikipedia.org/wiki/Wikipedia:Indic_transliteration" target="_blank">ISO-15919</a>
3. <a href="https://en.wikipedia.org/wiki/IAST" target="_blank">IAST</a>
4. <a href="https://en.wikipedia.org/wiki/Katapayadi_system" target="_blank">Katapayadi sankhya</a>

<b>P.S.:</b> Please feel free to post your comments or suggestion to improve this add-on.
