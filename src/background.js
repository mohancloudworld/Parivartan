"use strict";

// Cross-browser API handle: `browser` (Promise-based) on Firefox, `chrome` on Chrome/Edge.
// Modern Chrome (MV3) and Firefox 109+ both return Promises from this surface.
const api = globalThis.browser || globalThis.chrome;

// Show the menu only where the converter can actually run: real web pages
// (http/https/ws/wss/ftp via "*://*/*") and local files ("file:///*"). This
// hides it on privileged pages — chrome://, about:, view-source:, the add-on
// store, other extensions — where script injection is refused anyway, so the
// user never sees a menu item that would silently do nothing. Including
// file:/// also lets it work on local HTML files (see the notes in README:
// Chrome/Edge additionally need "Allow access to file URLs" enabled).
const MENU_URL_PATTERNS = ["*://*/*", "file:///*"];

// Wrapper so every menu item is gated by MENU_URL_PATTERNS without repeating it.
function createMenu(props) {
  return api.contextMenus.create({
    documentUrlPatterns: MENU_URL_PATTERNS,
    ...props,
  });
}

// Target scripts, in display order.
const LANGUAGES = [
  ["Devanagari", "Devanagari (देवनागरी)"],
  ["Telugu", "Telugu (తెలుగు)"],
  ["Kannada", "Kannada (ಕನ್ನಡ)"],
  ["Gujarati", "Gujarati (ગુજરાતી)"],
  ["Tamil", "Tamil (தமிழ்)"],
  ["Bengali", "Bengali (বাংলা)"],
  ["Gurmukhi", "Gurmukhi (ਗੁਰ੍ਮੁਖੀ)"],
  ["Malayalam", "Malayalam (മലയാളം)"],
  ["Oriya", "Oriya (ଓଡ଼ିଆ)"],
];
const KATAPAYADI = ["Katapayadi", "Katapayadi sankhya"];
const ENGLISH_TARGET = ["English", "English"];

// Targets for English-input formats: all Indic scripts + Katapayadi.
const SCRIPT_TARGETS = [...LANGUAGES, KATAPAYADI];
// Targets for the "any Indian script" reverse path: any other Indic script,
// English (ITRANS), or Katapayadi.
const INDIC_TARGETS = [ENGLISH_TARGET, ...LANGUAGES, KATAPAYADI];

// Full hierarchy: one submenu per input format, in display order.
// The same label is used both as the submenu title and as the hoisted-shortcut
// header so the two paths read identically.
const ALL_MENUS = [
  {
    mode: "indic",
    label: "From any Indian script to",
    targets: INDIC_TARGETS,
  },
  {
    mode: "itrans",
    label: "From English (ITRANS) to",
    targets: SCRIPT_TARGETS,
  },
  {
    mode: "iso",
    label: "From English (ISO 15919) to",
    targets: SCRIPT_TARGETS,
  },
  {
    mode: "iast",
    label: "From English (IAST) to",
    targets: SCRIPT_TARGETS,
  },
  {
    mode: "general",
    label: "From General English to",
    targets: SCRIPT_TARGETS,
  },
];

async function buildMenus() {
  await api.contextMenus.removeAll();

  createMenu({
    id: "parivartan",
    title: "Parivartan",
    contexts: ["selection"],
  });

  // After the user picks any conversion, hoist that input format's targets
  // flat to the top of the Parivartan menu, with a disabled header that
  // names the format. The full hierarchy below stays available for switching.
  let lastMode = "";
  try {
    const stored = await api.storage.sync.get({ lastMode: "" });
    lastMode = stored.lastMode;
  } catch (e) {
    // storage unavailable — skip the shortcut
  }
  const lastMenu = ALL_MENUS.find((m) => m.mode === lastMode);
  if (lastMenu) {
    createMenu({
      id: "fast-hdr",
      parentId: "parivartan",
      title: lastMenu.label,
      enabled: false,
      contexts: ["selection"],
    });
    for (const [value, label] of lastMenu.targets) {
      createMenu({
        id: "fast|" + lastMenu.mode + "|" + value,
        parentId: "parivartan",
        title: label,
        contexts: ["selection"],
      });
    }
    createMenu({
      id: "fast-sep",
      parentId: "parivartan",
      type: "separator",
      contexts: ["selection"],
    });
  }

  // Full hierarchy: each input format gets its own submenu.
  for (const menu of ALL_MENUS) {
    const subId = "sub:" + menu.mode;
    createMenu({
      id: subId,
      parentId: "parivartan",
      title: menu.label,
      contexts: ["selection"],
    });
    for (const [value, label] of menu.targets) {
      createMenu({
        id: menu.mode + "|" + value,
        parentId: subId,
        title: label,
        contexts: ["selection"],
      });
    }
  }
}

// Context menus must be (re)created on install/update and on browser startup.
api.runtime.onInstalled.addListener(buildMenus);
if (api.runtime.onStartup) {
  api.runtime.onStartup.addListener(buildMenus);
}

api.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab || tab.id == null) return;

  const id = String(info.menuItemId);

  let stored = { preferASCIIDigits: true, lastMode: "" };
  try {
    stored = await api.storage.sync.get({
      preferASCIIDigits: true,
      lastMode: "",
    });
  } catch (e) {
    // storage unavailable — fall back to defaults
  }

  // Both id shapes encode (mode, target):
  //   "fast|<mode>|<target>"  — flat shortcut at the top of the menu
  //   "<mode>|<target>"       — full hierarchy submenu leaf
  let mode, target;
  if (id.startsWith("fast|")) {
    const parts = id.split("|");
    if (parts.length < 3) return;
    mode = parts[1];
    target = parts.slice(2).join("|");
  } else {
    const sep = id.indexOf("|");
    if (sep < 0) return; // a parent, separator, or header — not an action
    mode = id.slice(0, sep);
    target = id.slice(sep + 1);
  }

  // Inject into the exact frame that holds the selection (handles iframes).
  const injectTarget = { tabId: tab.id, frameIds: [info.frameId || 0] };

  // The content world persists with the page across conversions. Try calling
  // the already-injected function first; only (re)inject the ~125 KB of
  // converter files on a miss (first conversion in the frame, or after reload).
  const callConvert = () =>
    api.scripting.executeScript({
      target: injectTarget,
      func: (m, t, p) => {
        if (typeof globalThis.__parivartanConvert !== "function") return false;
        globalThis.__parivartanConvert(m, t, p);
        return true;
      },
      args: [mode, target, stored.preferASCIIDigits],
    });

  try {
    const [res] = await callConvert();
    if (!res || !res.result) {
      await api.scripting.executeScript({
        target: injectTarget,
        files: ["data/tables.js", "lib/myModule.js", "lib/convert.js", "content.js"],
      });
      await callConvert();
    }
  } catch (e) {
    // Pages such as the browser's own settings or the extension store
    // disallow script injection; nothing actionable to do here.
    console.error("Parivartan: conversion failed —", e);
    return;
  }

  // Rebuild only when the input format changed — picking another target in
  // the same category leaves the hoisted shortcut block unchanged.
  if (mode !== stored.lastMode) {
    try {
      await api.storage.sync.set({ lastMode: mode });
      await buildMenus();
    } catch (e) {
      // non-fatal — the conversion itself already succeeded
    }
  }
});
