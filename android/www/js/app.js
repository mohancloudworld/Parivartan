"use strict";

// UI wiring. All conversion goes through js/render.js; nothing here calls the
// engine directly, so the display rules live in exactly one place.

var settings = loadSettings();
var contents = loadContents();
var currentId = null;      // item open in the reader
var editingId = null;      // null while adding, an id while editing
var reorderMode = false;

function $(id) { return document.getElementById(id); }

function showView(name) {
  ["library", "reader", "edit", "settings"].forEach(function (v) {
    $("view-" + v).classList.toggle("hidden", v !== name);
  });
  window.scrollTo(0, 0);
}

var toastTimer = null;
function toast(message) {
  var el = $("toast");
  el.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.add("hidden"); }, 2200);
}

function findContent(id) {
  return contents.filter(function (c) { return c.id === id; })[0] || null;
}

function scriptOptions(select, selected) {
  select.textContent = "";
  INDIC_SCRIPTS.forEach(function (s) {
    var opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    if (s === selected) opt.selected = true;
    select.appendChild(opt);
  });
}

// --- Library ---------------------------------------------------------------

function renderLibrary() {
  var list = $("content-list");
  var visible = search(contents, $("search").value);
  list.textContent = "";
  $("empty").classList.toggle("hidden", contents.length > 0);

  visible.forEach(function (item) {
    var li = document.createElement("li");

    var titleWrap = document.createElement("div");
    titleWrap.className = "title";
    var t = document.createElement("div");
    t.textContent = item.title || "(untitled)";
    var meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = item.sourceScript === settings.displayScript
      ? item.sourceScript
      : item.sourceScript + " → shown in " + settings.displayScript;
    titleWrap.appendChild(t);
    titleWrap.appendChild(meta);
    titleWrap.addEventListener("click", function () { openReader(item.id); });
    li.appendChild(titleWrap);

    if (reorderMode) {
      // Explicit buttons rather than drag: reliable on touch, and the list is
      // short enough that nudging beats a drag interaction.
      var idx = contents.indexOf(item);
      [["↑", -1], ["↓", 1]].forEach(function (pair) {
        var b = document.createElement("button");
        b.className = "move";
        b.textContent = pair[0];
        b.addEventListener("click", function () {
          contents = move(contents, contents.indexOf(item), pair[1]);
          saveContents(contents);
          renderLibrary();
        });
        b.disabled = (pair[1] === -1 && idx === 0) ||
                     (pair[1] === 1 && idx === contents.length - 1);
        li.appendChild(b);
      });
    }
    list.appendChild(li);
  });
}

// --- Reader ----------------------------------------------------------------

function openReader(id) {
  var item = findContent(id);
  if (!item) return;
  currentId = id;
  $("reader-title").textContent = item.title || "(untitled)";

  var body = $("reader-body");
  body.textContent = renderContent(item, settings.displayScript, settings.nativeDigits);
  applyReaderTypography();

  // Be honest when the passage is being shown through a lossy pivot: the
  // reader is looking at an approximation, not at what was saved.
  var note = $("reader-note");
  var lossy = LOSSY_SOURCE_SCRIPTS[item.sourceScript];
  if (lossy && item.sourceScript !== settings.displayScript) {
    note.textContent = "Shown in " + settings.displayScript + ", converted from " +
      item.sourceScript + ". " + lossy;
    note.classList.remove("hidden");
  } else {
    note.classList.add("hidden");
  }
  showView("reader");
}

// Size and leading are per script; the user's A-/A+ choice is an offset on top,
// so switching display script keeps their chosen comfort level.
function applyReaderTypography() {
  var script = settings.displayScript;
  var body = $("reader-body");
  body.style.fontSize = sizeFor(script, settings.fontOffset) + "px";
  body.style.lineHeight = String(typographyFor(script).lineHeight);
  body.style.fontFamily = fontStackFor(script);
}

function nudgeFont(delta) {
  var next = settings.fontOffset + delta;
  settings.fontOffset = Math.max(FONT_OFFSET_MIN, Math.min(FONT_OFFSET_MAX, next));
  saveSettings(settings);
  applyReaderTypography();
}

// --- Add / edit ------------------------------------------------------------

function openEditor(id) {
  editingId = id;
  var item = id ? findContent(id) : null;
  $("edit-heading").textContent = item ? "Edit content" : "Add content";
  $("edit-title").value = item ? item.title : "";
  $("edit-body").value = item ? item.original : "";
  scriptOptions($("edit-script"), item ? item.sourceScript : settings.displayScript);
  $("btn-delete").classList.toggle("hidden", !item);
  $("detect-hint").textContent = "";
  updateLossyWarning();
  showView("edit");
}

// Auto-detect is a suggestion the user can override, not a decision.
function autoDetect() {
  var body = $("edit-body").value.trim();
  if (!body) { $("detect-hint").textContent = ""; return; }
  var detected = detectScript(body);
  if (detected === "English") {
    $("detect-hint").textContent =
      "No Indian script detected — pick the script this content is written in.";
    return;
  }
  $("edit-script").value = detected;
  $("detect-hint").textContent = "Detected " + detected + ". Change it if that is wrong.";
  updateLossyWarning();
}

function updateLossyWarning() {
  var el = $("lossy-warning");
  var note = LOSSY_SOURCE_SCRIPTS[$("edit-script").value];
  if (note) {
    el.textContent = "Heads up: " + note +
      " It will always display perfectly in its own script.";
    el.classList.remove("hidden");
  } else {
    el.classList.add("hidden");
  }
}

function saveEditor() {
  var title = $("edit-title").value.trim();
  var body = $("edit-body").value;
  var script = $("edit-script").value;
  if (!body.trim()) { toast("Add some content first."); return; }
  if (!title) { toast("Give it a title."); return; }

  if (editingId) {
    updateContent(findContent(editingId), title, body, script);
  } else {
    contents.unshift(makeContent(title, body, script));   // newest first
  }
  saveContents(contents);
  renderLibrary();
  showView("library");
  toast(editingId ? "Saved." : "Added.");
  editingId = null;
}

function deleteCurrent() {
  if (!editingId) return;
  if (!confirm("Delete this content? This cannot be undone.")) return;
  contents = contents.filter(function (c) { return c.id !== editingId; });
  saveContents(contents);
  editingId = null;
  renderLibrary();
  showView("library");
  toast("Deleted.");
}

// --- Settings --------------------------------------------------------------

function openSettings() {
  scriptOptions($("set-script"), settings.displayScript);
  $("set-digits").checked = settings.nativeDigits;
  showView("settings");
}

function downloadText(filename, text) {
  var blob = new Blob([text], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Wiring ----------------------------------------------------------------

$("btn-add").addEventListener("click", function () { openEditor(null); });
$("btn-settings").addEventListener("click", openSettings);
$("btn-reorder").addEventListener("click", function () {
  reorderMode = !reorderMode;
  $("btn-reorder").style.color = reorderMode ? "var(--accent)" : "";
  renderLibrary();
});
$("search").addEventListener("input", renderLibrary);

$("btn-smaller").addEventListener("click", function () { nudgeFont(-1); });
$("btn-larger").addEventListener("click", function () { nudgeFont(1); });
$("btn-edit").addEventListener("click", function () { openEditor(currentId); });

$("edit-body").addEventListener("blur", autoDetect);
$("edit-script").addEventListener("change", updateLossyWarning);
$("btn-save").addEventListener("click", saveEditor);
$("btn-delete").addEventListener("click", deleteCurrent);

$("set-script").addEventListener("change", function () {
  settings.displayScript = this.value;
  saveSettings(settings);
  renderLibrary();
});
$("set-digits").addEventListener("change", function () {
  settings.nativeDigits = this.checked;
  saveSettings(settings);
});
$("btn-export").addEventListener("click", function () {
  downloadText("parivartan-library.json", exportAll());
  toast("Exported.");
});
$("btn-import").addEventListener("click", function () { $("import-file").click(); });
$("import-file").addEventListener("change", function () {
  var file = this.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function () {
    try {
      var result = importAll(reader.result);
      contents = loadContents();
      renderLibrary();
      toast("Imported " + result.added + " new, " + result.updated + " updated.");
    } catch (e) {
      toast("Could not import: " + e.message);
    }
  };
  reader.readAsText(file);
  this.value = "";
});

Array.prototype.forEach.call(document.querySelectorAll("[data-back]"), function (b) {
  b.addEventListener("click", function () { showView(this.getAttribute("data-back")); });
});

Parivartan.init();
// After init(), so the pivot can be computed for the shipped passages.
contents = seedDefaultsIfNeeded();
renderLibrary();
showView("library");
