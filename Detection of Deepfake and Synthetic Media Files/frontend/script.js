/* =========================
   PORTAL ANIMATION
========================= */
window.onload = () => {
    const portal = document.getElementById('introPortal');
    if (portal) {
        setTimeout(() => {
            portal.style.opacity = "0";
            setTimeout(() => portal.style.display = "none", 800);
        }, 2800);
    }
};

/* =========================
   ELEMENTS
========================= */
const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const resultArea = document.getElementById('resultArea');
const fill = document.getElementById('meterFill');
const scoreText = document.getElementById('scoreText');
const aiSig = document.getElementById('aiSig');
const metaSource = document.getElementById('metaSource');
const liveStatus = document.getElementById('liveStatus'); // may or may not exist
const testAnotherBtn = document.getElementById('testAnother');

/* =========================
   FILE SELECT
========================= */
if (dropZone && fileInput) {
    dropZone.onclick = () => fileInput.click();
}

function addStatus(text) {
    if (!liveStatus) return; // prevent crash

    const line = document.createElement("div");
    line.className = "status-line active loading-dots";
    line.textContent = text;
    liveStatus.appendChild(line);
}

if (fileInput) {
fileInput.onchange = async () => {

    const file = fileInput.files[0];
    if (!file) return;

    if (dropZone) dropZone.style.display = "none";
    if (resultArea) resultArea.style.display = "block";

    if (fill) {
        fill.style.width = "0%";
        fill.style.backgroundColor = "#00f3ff";
    }

    if (scoreText) {
        scoreText.innerText = "INITIALIZING";
        scoreText.style.color = "#fff";
    }

    if (aiSig) aiSig.innerText = "🧠 Deep Neural Scan Active";
    if (metaSource) metaSource.innerText = "SECURE NODE";

    if (liveStatus) liveStatus.innerHTML = "";

    addStatus("Encrypting media transmission");

    const formData = new FormData();
    formData.append("media", file);

    try {

        const response = await fetch("https://deepsafe-ob6p.onrender.com/", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server not responding");
        }

        addStatus("Running forensic AI detection");

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || "Analysis failed");
        }

        addStatus("Aggregating neural intelligence");

        const aiPercent = parseFloat(
            data.averageAIProbability ?? data.aiProbability
        );

        if (isNaN(aiPercent)) {
            throw new Error("Invalid AI score returned");
        }

        const isFake = aiPercent >= 50;
        const color = isFake ? "#ef4444" : "#10b981";

        if (fill) {
            fill.style.width = aiPercent + "%";
            fill.style.backgroundColor = color;
        }

        if (scoreText) {
            scoreText.innerText = aiPercent.toFixed(2) + "%";
            scoreText.style.color = color;
        }

        if (aiSig) {
            aiSig.innerText = isFake
                ? "🚨 Synthetic Media Detected"
                : "✅ Authentic Media Verified";
        }

        if (metaSource) {
            metaSource.innerText = data.mediaType || "Forensic Engine";
        }

        addStatus("Forensic analysis complete");

    } catch (err) {

        if (fill) {
            fill.style.width = "100%";
            fill.style.backgroundColor = "#ef4444";
        }

        if (scoreText) {
            scoreText.innerText = "ERROR";
            scoreText.style.color = "#ef4444";
        }

        if (aiSig) aiSig.innerText = "⚠ AI Engine Failure";
        if (metaSource) metaSource.innerText = err.message;

        addStatus("Analysis failed");

        console.error("Frontend Error:", err);
    }
};
}

/* =========================
   RESET
========================= */
if (testAnotherBtn) {
    testAnotherBtn.onclick = () => {

        if (resultArea) resultArea.style.display = "none";
        if (dropZone) dropZone.style.display = "flex";

        if (fileInput) fileInput.value = "";

        if (fill) {
            fill.style.width = "0%";
            fill.style.backgroundColor = "#00f3ff";
        }

        if (scoreText) {
            scoreText.innerText = "0%";
            scoreText.style.color = "#ffffff";
        }

        if (aiSig) aiSig.innerText = "SYSTEM READY";
        if (metaSource) metaSource.innerText = "PENDING";

        if (liveStatus) liveStatus.innerHTML = "";
    };
}
