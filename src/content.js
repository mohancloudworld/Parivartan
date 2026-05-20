"use strict";

// Injected on demand by background.js, after data/tables.js and lib/myModule.js.
// Exposes globalThis.__parivartanConvert, which the background then invokes.
(function () {
  // Avoid re-defining if this file is injected more than once into the same frame.
  if (globalThis.__parivartanConvert) return;

  const TEXT_INPUT_TYPES = /^(text|search|url|tel|email|password|)$/i;

  // Reads the current selection. Returns either an editable <input>/<textarea>
  // context (plain text) or a DOM Range context (HTML), or null if nothing usable.
  function getSelectionContext() {
    const ae = document.activeElement;
    if (
      ae &&
      (ae.tagName === "TEXTAREA" ||
        (ae.tagName === "INPUT" && TEXT_INPUT_TYPES.test(ae.type)))
    ) {
      const start = ae.selectionStart;
      const end = ae.selectionEnd;
      if (start != null && end != null && start !== end) {
        return {
          kind: "input",
          el: ae,
          start: start,
          end: end,
          text: ae.value.substring(start, end),
          html: "",
        };
      }
    }

    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      const range = sel.getRangeAt(0);
      const holder = document.createElement("div");
      holder.appendChild(range.cloneContents());
      // The converter special-cases the literal "&nbsp;"; innerHTML emits the
      // raw U+00A0 character, so normalize it back to the entity form.
      const html = holder.innerHTML.replace(/\u00A0/g, "&nbsp;");
      return { kind: "range", range: range, text: sel.toString(), html: html };
    }

    return null;
  }

  // Replicates the per-menu conversion logic from the original add-on's main.js.
  // Returns the converted string, or null when no conversion applies.
  function runConversion(mode, target, inpHTML, inpText, preferASCIIDigits) {
    const P = Parivartan;
    const inpData = inpHTML || inpText;

    if (mode === "itrans") {
      const inpLang = P.detectLanguage(inpText);
      if (target === "Katapayadi") {
        const indic =
          inpLang === "English"
            ? P.convert2IndicScript(inpData, "ITRANS", "Devanagari", 1, 0, preferASCIIDigits)
            : inpData;
        return P.convert2Katapayadi(indic);
      }
      if (inpLang !== target) {
        const itrans = P.convert2IndicScript(inpData, "ITRANS", inpLang, 1, 1, preferASCIIDigits);
        if (target === "English") return itrans;
        return P.convert2IndicScript(itrans, "ITRANS", target, 1, 0, preferASCIIDigits);
      }
      return null; // input already in the requested script
    }

    // iso / iast / general
    const encoding = mode === "iast" ? "IAST" : "ISO";
    const modeStrict = mode === "general" ? 0 : 1;
    if (target === "Katapayadi") {
      const indic = P.convert2IndicScript(inpData, encoding, "Devanagari", modeStrict, 0, preferASCIIDigits);
      return P.convert2Katapayadi(indic);
    }
    return P.convert2IndicScript(inpData, encoding, target, modeStrict, 0, preferASCIIDigits);
  }

  function htmlToPlainText(html) {
    const d = document.createElement("div");
    d.innerHTML = html;
    return d.textContent;
  }

  function applyResult(ctx, result) {
    if (ctx.kind === "input") {
      const el = ctx.el;
      const plain = htmlToPlainText(result);
      el.focus();
      if (typeof el.setRangeText === "function") {
        el.setRangeText(plain, ctx.start, ctx.end, "end");
      } else {
        el.value = el.value.slice(0, ctx.start) + plain + el.value.slice(ctx.end);
      }
      // Notify any framework bound to the field.
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
      return;
    }

    // Range context: replace the selected nodes with the converted HTML.
    const template = document.createElement("template");
    template.innerHTML = result;
    ctx.range.deleteContents();
    ctx.range.insertNode(template.content);

    const sel = window.getSelection();
    if (sel) sel.removeAllRanges();
  }

  globalThis.__parivartanConvert = function (mode, target, preferASCIIDigits) {
    const ctx = getSelectionContext();
    if (!ctx) return;

    Parivartan.init();
    const result = runConversion(mode, target, ctx.html, ctx.text, preferASCIIDigits);
    if (result == null) return;

    applyResult(ctx, result);
  };
})();
