"use strict";

const api = globalThis.browser || globalThis.chrome;

const checkbox = document.getElementById("preferASCIIDigits");
const status = document.getElementById("status");
let statusTimer = 0;

function showSaved() {
  status.textContent = "Saved.";
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => {
    status.textContent = "";
  }, 1500);
}

async function load() {
  try {
    const stored = await api.storage.sync.get({ preferASCIIDigits: true });
    checkbox.checked = stored.preferASCIIDigits;
  } catch (e) {
    // storage unavailable — fall back to the default
    checkbox.checked = true;
  } finally {
    // Reveal the page once the checkbox reflects the stored value.
    document.body.classList.remove("loading");
  }
}

checkbox.addEventListener("change", async () => {
  await api.storage.sync.set({ preferASCIIDigits: checkbox.checked });
  showSaved();
});

load();
