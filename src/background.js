"use strict";

// Cross-browser API handle: `browser` (Promise-based) on Firefox, `chrome` on Chrome/Edge.
// Modern Chrome (MV3) and Firefox 109+ both return Promises from this surface.
const api = globalThis.browser || globalThis.chrome;

// Target scripts shared by every menu, in display order.
const LANGUAGES = [
  ["Devanagari", "Devanagari (देवनागरी)"],
  ["Telugu", "Telugu (తెలుగు)"],
  ["Kannada", "Kannada (ಕನ್ನಡ)"],
  ["Gujarati", "Gujarati (ગુజરાతી)"],
  ["Tamil", "Tamil (தமிழ்)"],
  ["Bengali", "Bengali (বাংলা)"],
  ["Gurmukhi", "Gurmukhi (ਗੁਰ੍ਮੁਖੀ)"],
  ["Malayalam", "Malayalam (മലയാളം)"],
  ["Oriya", "Oriya (ଓଡ଼ିଆ)"],
];
const KATAPAYADI = ["Katapayadi", "Katapayadi sankhya"];

// Each top-level menu maps to a conversion `mode` consumed by content.js.
const MENUS = [
  {
    mode: "itrans",
    label: "Indian/English (ITRANS) to",
    targets: [["English", "English"], ...LANGUAGES, KATAPAYADI],
  },
  { mode: "iso", label: "English (ISO 15919) to", targets: [...LANGUAGES, KATAPAYADI] },
  { mode: "iast", label: "English (IAST) to", targets: [...LANGUAGES, KATAPAYADI] },
  { mode: "general", label: "General English to", targets: [...LANGUAGES, KATAPAYADI] },
];

async function buildMenus() {
  await api.contextMenus.removeAll();
  api.contextMenus.create({
    id: "parivartan",
    title: "Parivartan",
    contexts: ["selection"],
  });
  for (const menu of MENUS) {
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
  const sep = id.indexOf("|");
  if (sep < 0) return; // a parent/submenu entry, not an action
  const mode = id.slice(0, sep);
  const target = id.slice(sep + 1);

  let preferASCIIDigits = true;
  try {
    const stored = await api.storage.sync.get({ preferASCIIDigits: true });
    preferASCIIDigits = stored.preferASCIIDigits;
  } catch (e) {
    // storage unavailable — fall back to the default
  }

  // Inject into the exact frame that holds the selection (handles iframes).
  const injectTarget = { tabId: tab.id, frameIds: [info.frameId || 0] };

  try {
    await api.scripting.executeScript({
      target: injectTarget,
      files: ["data/tables.js", "lib/myModule.js", "content.js"],
    });
    await api.scripting.executeScript({
      target: injectTarget,
      func: (m, t, p) => globalThis.__parivartanConvert(m, t, p),
      args: [mode, target, preferASCIIDigits],
    });
  } catch (e) {
    // Pages such as the browser's own settings or the extension store
    // disallow script injection; nothing actionable to do here.
    console.error("Parivartan: conversion failed —", e);
  }
});

// Toolbar button opens the settings page (the action has no popup).
if (api.action && api.action.onClicked) {
  api.action.onClicked.addListener(() => api.runtime.openOptionsPage());
}
