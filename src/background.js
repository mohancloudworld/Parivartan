"use strict";

// Cross-browser API handle: `browser` (Promise-based) on Firefox, `chrome` on Chrome/Edge.
// Modern Chrome (MV3) and Firefox 109+ both return Promises from this surface.
const api = globalThis.browser || globalThis.chrome;

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

// ITRANS auto-detects the input script and uniquely supports converting an
// Indian script back to English, so its target list also includes "English".
const ITRANS_TARGETS = [["English", "English"], ...LANGUAGES, KATAPAYADI];
const SCRIPT_TARGETS = [...LANGUAGES, KATAPAYADI];

// Full hierarchy: one submenu per input format, in display order.
// The same label is used both as the submenu title and as the hoisted-shortcut
// header so the two paths read identically.
const ALL_MENUS = [
  {
    mode: "itrans",
    label: "From English (ITRANS) or any Indian script to",
    targets: ITRANS_TARGETS,
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

  api.contextMenus.create({
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
    api.contextMenus.create({
      id: "fast-hdr",
      parentId: "parivartan",
      title: lastMenu.label,
      enabled: false,
      contexts: ["selection"],
    });
    for (const [value, label] of lastMenu.targets) {
      api.contextMenus.create({
        id: "fast|" + lastMenu.mode + "|" + value,
        parentId: "parivartan",
        title: label,
        contexts: ["selection"],
      });
    }
    api.contextMenus.create({
      id: "fast-sep",
      parentId: "parivartan",
      type: "separator",
      contexts: ["selection"],
    });
  }

  // Full hierarchy: each input format gets its own submenu.
  for (const menu of ALL_MENUS) {
    const subId = "sub:" + menu.mode;
    api.contextMenus.create({
      id: subId,
      parentId: "parivartan",
      title: menu.label,
      contexts: ["selection"],
    });
    for (const [value, label] of menu.targets) {
      api.contextMenus.create({
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

  try {
    await api.scripting.executeScript({
      target: injectTarget,
      files: ["data/tables.js", "lib/myModule.js", "lib/convert.js", "content.js"],
    });
    await api.scripting.executeScript({
      target: injectTarget,
      func: (m, t, p) => globalThis.__parivartanConvert(m, t, p),
      args: [mode, target, stored.preferASCIIDigits],
    });
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
