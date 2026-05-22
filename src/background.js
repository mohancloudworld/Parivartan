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

// The ITRANS path auto-detects the input script, so it is the default: its
// targets sit flat at the top level of the menu, and it also offers English.
const ITRANS_TARGETS = [["English", "English"], ...LANGUAGES, KATAPAYADI];
// ISO / IAST / General require the user to know the input encoding, so they are
// grouped one level deeper under "Other input formats".
const SCRIPT_TARGETS = [...LANGUAGES, KATAPAYADI];
const OTHER_MENUS = [
  { mode: "iso", label: "English (ISO 15919) to" },
  { mode: "iast", label: "English (IAST) to" },
  { mode: "general", label: "General English to" },
];

// value -> display label, used to title the "Convert to ..." repeat shortcut.
const TARGET_LABELS = {};
for (const [value, label] of ITRANS_TARGETS) {
  TARGET_LABELS[value] = label;
}
// mode -> suffix, so the repeat shortcut is unambiguous about the input format.
const MODE_SUFFIX = {
  itrans: "",
  iso: " — ISO 15919",
  iast: " — IAST",
  general: " — General English",
};

async function buildMenus() {
  await api.contextMenus.removeAll();

  api.contextMenus.create({
    id: "parivartan",
    title: "Parivartan",
    contexts: ["selection"],
  });

  // Shortcut that repeats the most recent conversion, shown first when one exists.
  let last = {};
  try {
    last = await api.storage.sync.get({ lastMode: "", lastTarget: "" });
  } catch (e) {
    // storage unavailable — skip the shortcut
  }
  if (last.lastMode && last.lastTarget) {
    const label = TARGET_LABELS[last.lastTarget] || last.lastTarget;
    const suffix = MODE_SUFFIX[last.lastMode] || "";
    api.contextMenus.create({
      id: "repeat",
      parentId: "parivartan",
      title: "Convert to " + label + suffix,
      contexts: ["selection"],
    });
    api.contextMenus.create({
      id: "sep-repeat",
      parentId: "parivartan",
      type: "separator",
      contexts: ["selection"],
    });
  }

  // Default ITRANS / auto-detecting targets, flat at the top level.
  for (const [value, label] of ITRANS_TARGETS) {
    api.contextMenus.create({
      id: "itrans|" + value,
      parentId: "parivartan",
      title: label,
      contexts: ["selection"],
    });
  }

  // Encoding-specific conversions, grouped one level deeper.
  api.contextMenus.create({
    id: "sep-other",
    parentId: "parivartan",
    type: "separator",
    contexts: ["selection"],
  });
  api.contextMenus.create({
    id: "other",
    parentId: "parivartan",
    title: "Other input formats",
    contexts: ["selection"],
  });
  for (const menu of OTHER_MENUS) {
    const subId = "sub:" + menu.mode;
    api.contextMenus.create({
      id: subId,
      parentId: "other",
      title: menu.label,
      contexts: ["selection"],
    });
    for (const [value, label] of SCRIPT_TARGETS) {
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

  let stored = { preferASCIIDigits: true, lastMode: "", lastTarget: "" };
  try {
    stored = await api.storage.sync.get({
      preferASCIIDigits: true,
      lastMode: "",
      lastTarget: "",
    });
  } catch (e) {
    // storage unavailable — fall back to defaults
  }

  let mode, target;
  if (id === "repeat") {
    if (!stored.lastMode || !stored.lastTarget) return;
    mode = stored.lastMode;
    target = stored.lastTarget;
  } else {
    const sep = id.indexOf("|");
    if (sep < 0) return; // a parent or separator entry, not an action
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

  // Remember this conversion and refresh the "Convert to ..." shortcut.
  try {
    await api.storage.sync.set({ lastMode: mode, lastTarget: target });
    await buildMenus();
  } catch (e) {
    // non-fatal — the conversion itself already succeeded
  }
});
