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

  function htmlToPlainText(html) {
    // DOMParser yields an inert document, so no innerHTML assignment is needed.
    return new DOMParser().parseFromString(html, "text/html").body.textContent;
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
    // DOMParser produces an inert document — no script execution or resource loads.
    const parsed = new DOMParser().parseFromString(result, "text/html");
    const fragment = document.createDocumentFragment();
    while (parsed.body.firstChild) {
      fragment.appendChild(parsed.body.firstChild);
    }
    ctx.range.deleteContents();
    ctx.range.insertNode(fragment);

    const sel = window.getSelection();
    if (sel) sel.removeAllRanges();
  }

  let inited = false;
  globalThis.__parivartanConvert = function (mode, target, preferASCIIDigits) {
    const ctx = getSelectionContext();
    if (!ctx) return;

    // Build the dictionaries once per page; the content world persists across
    // conversions, so there is no need to rebuild them on every call.
    if (!inited) {
      Parivartan.init();
      inited = true;
    }
    // parivartanRunConversion is provided by lib/convert.js, injected before this file.
    const result = parivartanRunConversion(mode, target, ctx.html, ctx.text, preferASCIIDigits);
    if (result == null) return;

    applyResult(ctx, result);
  };
})();
