const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const keySlider = document.getElementById("keySlider");
const keyInput = document.getElementById("keyInput");
const keyOutput = document.getElementById("keyOutput");
const visualKey = document.getElementById("visualKey");
const runBtn = document.getElementById("runBtn");
const runLabel = document.getElementById("runLabel");
const charCount = document.getElementById("charCount");
const outputCount = document.getElementById("outputCount");
const statusText = document.getElementById("statusText");
const bruteOutput = document.getElementById("bruteOutput");
const toast = document.getElementById("toast");

let mode = "encrypt";

function normalizeKey(key) {
  const n = Number.parseInt(key, 10);
  if (Number.isNaN(n)) return 0;
  return ((n % 26) + 26) % 26;
}

function caesarTransform(text, key, selectedMode = mode) {
  const shift = normalizeKey(key) * (selectedMode === "decrypt" ? -1 : 1);

  return [...text].map(char => {
    const code = char.charCodeAt(0);

    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
    }
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
    }
    return char;
  }).join("");
}

function updateKey(value) {
  const key = normalizeKey(value);
  keySlider.value = key;
  keyInput.value = key;
  keyOutput.textContent = key;
  visualKey.textContent = String(key).padStart(2, "0");
}

function updateCounts() {
  const count = inputText.value.length;
  charCount.textContent = `${count} ${count === 1 ? "char" : "chars"}`;
}

function renderOutput(result) {
  outputText.innerHTML = "";
  outputText.textContent = result || "";
  outputText.classList.remove("flash");
  requestAnimationFrame(() => outputText.classList.add("flash"));
  outputCount.textContent = `${result.length} ${result.length === 1 ? "char" : "chars"}`;
  statusText.textContent = result ? `${mode === "encrypt" ? "Encrypted" : "Decrypted"} locally` : "Ready";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function runCipher() {
  const text = inputText.value;
  if (!text.trim()) {
    showToast("Enter a message first.");
    inputText.focus();
    return;
  }
  const result = caesarTransform(text, keyInput.value, mode);
  renderOutput(result);
}

function setMode(nextMode) {
  mode = nextMode;
  document.querySelectorAll(".mode").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });
  runLabel.textContent = `${mode === "encrypt" ? "Encrypt" : "Decrypt"} message`;
}

keySlider.addEventListener("input", e => updateKey(e.target.value));
keyInput.addEventListener("input", e => updateKey(e.target.value));
inputText.addEventListener("input", updateCounts);

document.querySelectorAll(".mode").forEach(btn => {
  btn.addEventListener("click", () => setMode(btn.dataset.mode));
});

runBtn.addEventListener("click", runCipher);

document.getElementById("clearBtn").addEventListener("click", () => {
  inputText.value = "";
  renderOutput("");
  updateCounts();
  showToast("Input cleared.");
});

document.getElementById("pasteBtn").addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    inputText.value = text;
    updateCounts();
    showToast("Pasted from clipboard.");
  } catch {
    showToast("Clipboard permission was unavailable.");
  }
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  const value = outputText.textContent.trim();
  if (!value || value === "Your transformed message will appear here.") {
    showToast("Nothing to copy yet.");
    return;
  }
  try {
    await navigator.clipboard.writeText(value);
    showToast("Result copied.");
  } catch {
    showToast("Copy failed. Try selecting the text.");
  }
});

document.getElementById("swapBtn").addEventListener("click", () => {
  const value = outputText.textContent.trim();
  if (!value || value === "Your transformed message will appear here.") {
    showToast("Create an output first.");
    return;
  }
  inputText.value = value;
  updateCounts();
  renderOutput("");
  setMode(mode === "encrypt" ? "decrypt" : "encrypt");
  showToast("Output moved to input.");
});

document.getElementById("demoBtn").addEventListener("click", () => {
  inputText.value = "Cybersecurity starts with understanding the system.";
  updateKey(3);
  setMode("encrypt");
  updateCounts();
  document.getElementById("lab").scrollIntoView({ behavior: "smooth" });
  window.setTimeout(runCipher, 500);
});

document.getElementById("bruteBtn").addEventListener("click", () => {
  const source = outputText.textContent.trim() || inputText.value.trim();

  if (!source || source === "Your transformed message will appear here.") {
    showToast("Enter or encrypt a message first.");
    return;
  }

  bruteOutput.innerHTML = "";
  const attackSource = outputText.textContent.trim() ? outputText.textContent.trim() : inputText.value.trim();

  for (let key = 0; key < 26; key++) {
    const row = document.createElement("div");
    row.className = "brute-row";
    row.style.animationDelay = `${key * 0.018}s`;

    const keyEl = document.createElement("div");
    keyEl.className = "key";
    keyEl.textContent = `KEY ${String(key).padStart(2, "0")}`;

    const resultEl = document.createElement("div");
    resultEl.textContent = caesarTransform(attackSource, key, "decrypt");

    row.append(keyEl, resultEl);
    bruteOutput.appendChild(row);
  }

  showToast("Brute-force simulation complete.");
});

updateKey(3);
updateCounts();
setMode("encrypt");
