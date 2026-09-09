"use strict";

// Content and settings persistence.
//
// The scaffold uses localStorage, which is enough for a personal library and
// works identically in a browser and inside the Capacitor WebView. Content the
// user has typed by hand is irreplaceable, so exportAll/importAll are part of
// the first version rather than a later addition. See android/README.md for
// the migration path to SQLite if libraries grow large.

var STORAGE_KEY = "parivartan.contents";
var SETTINGS_KEY = "parivartan.settings";

var DEFAULT_SETTINGS = {
  displayScript: "Devanagari",  // preferred script for all content
  nativeDigits: false,          // false = roman digits, matching the extension
  fontOffset: 0                 // px, added to each script's tuned base size
};

function loadSettings() {
  try {
    var raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return Object.assign({}, DEFAULT_SETTINGS);
    return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(raw));
  } catch (e) {
    return Object.assign({}, DEFAULT_SETTINGS);
  }
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function loadContents() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveContents(contents) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contents));
}

// A stored item. `title` is kept verbatim in whatever script the user typed and
// is never transliterated; `searchKey` is a hidden romanisation so it can still
// be found by typing Latin letters. `original` is likewise never mutated -
// it is what the reader sees in its own script.
function makeContent(title, body, sourceScript) {
  var now = Date.now();
  return {
    id: String(now) + "-" + Math.random().toString(36).slice(2, 8),
    title: title,
    searchKey: titleSearchKey(title),
    original: body,
    sourceScript: sourceScript,
    pivotItrans: toPivot(body, sourceScript),
    createdAt: now,
    updatedAt: now
  };
}

// Re-derives everything downstream of the fields the user can edit, so an edit
// can never leave a stale pivot or search key behind.
function updateContent(item, title, body, sourceScript) {
  item.title = title;
  item.searchKey = titleSearchKey(title);
  item.original = body;
  item.sourceScript = sourceScript;
  item.pivotItrans = toPivot(body, sourceScript);
  item.updatedAt = Date.now();
  return item;
}

// Manual ordering. Sorting titles alphabetically is undefined across scripts,
// so the user's own order is the list order; new items land at the top.
function move(contents, index, delta) {
  var target = index + delta;
  if (target < 0 || target >= contents.length) return contents;
  var moved = contents.splice(index, 1)[0];
  contents.splice(target, 0, moved);
  return contents;
}

// Matches native-script titles and their romanisation, so "vishnu" finds a
// title written in Telugu.
function search(contents, query) {
  var q = query.trim().toLowerCase();
  if (!q) return contents;
  return contents.filter(function (c) {
    return c.title.toLowerCase().indexOf(q) !== -1 ||
           (c.searchKey || "").indexOf(q) !== -1;
  });
}

function exportAll() {
  return JSON.stringify({
    format: "parivartan-library",
    version: 1,
    exportedAt: new Date().toISOString(),
    settings: loadSettings(),
    contents: loadContents()
  }, null, 2);
}

// Merges by id so re-importing a backup does not duplicate the library.
function importAll(json) {
  var data = JSON.parse(json);
  if (!data || data.format !== "parivartan-library") {
    throw new Error("Not a Parivartan library export.");
  }
  var existing = loadContents();
  var byId = {};
  existing.forEach(function (c) { byId[c.id] = c; });

  var added = 0, updated = 0;
  (data.contents || []).forEach(function (c) {
    if (byId[c.id]) {
      if ((c.updatedAt || 0) > (byId[c.id].updatedAt || 0)) {
        Object.assign(byId[c.id], c);
        updated++;
      }
    } else {
      existing.push(c);
      byId[c.id] = c;
      added++;
    }
  });
  saveContents(existing);
  return { added: added, updated: updated };
}
