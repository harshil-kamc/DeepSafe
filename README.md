# 🛡️ DEEPSAFE: Forensic-Grade Synthetic Media Detection

> **"Physics-Based Evidence in an AI-Driven World"**

DeepSafe is a high-performance digital forensics platform designed to restore trust in digital media. While traditional AI detectors rely on fallible "AI-vs-AI" guessing games, DeepSafe interrogates the **structural integrity** of digital files.

By analyzing sensor noise floors and signal entropy, DeepSafe identifies the mathematical signatures that artificial intelligence physically cannot hide.

---

# 🚀 Key Features (Local Suite)

Running DeepSafe locally on your machine unlocks the full processing power of the **Forensic Node**.

---

## 🔬 Neural Entropy Analysis

```pseudo
INPUT  -> Pixel Data
PROCESS -> Entropy + Variance Mapping
DETECT -> GAN-Generated Gradients
OUTPUT -> Forensic Confidence Score
```

Interrogates pixel-level variance to detect GAN-generated gradients that are invisible to the human eye.

---

## 🎞️ High-Bandwidth Video Scans

```pseudo
FOR each frame IN video:
    ANALYZE temporal consistency
    DETECT stitching artifacts
    CHECK lighting continuity
END
```

Full temporal analysis of frames to find "stitching" artifacts and lighting inconsistencies common in deepfakes.

---

## 🎙️ Acoustic Spectral Flux

```pseudo
INPUT  -> Audio Stream
PROCESS -> Spectral Flux Analysis
CHECK -> Phase Continuity
DETECT -> Neural Vocoder Signatures
OUTPUT -> Voice Clone Detection
```

Detects neural vocoder signatures and phase discontinuities in cloned voices by analyzing frequency jumps.

---

# 🛠️ Local Installation & Setup

Follow these steps to deploy the DeepSafe engine on any system.

No Git knowledge or commands are required.

---

## Step 1: Download & Extract

```pseudo
OPEN repository page
CLICK "Code"
SELECT "Download ZIP"
EXTRACT archive to local folder
```

---

## Step 2: Initialize the Forensic Backend

The backend handles the "heavy lifting" forensic math.

You must install the environment first.

### Install FFmpeg

DeepSafe requires FFmpeg for video processing.

#### Windows

```pseudo
DOWNLOAD ffmpeg-8.0.1-full_build
SOURCE -> https://www.gyan.dev/ffmpeg/builds/
ADD ffmpeg/bin TO System PATH
```

#### Mac

```bash
brew install ffmpeg
```

#### Linux

```bash
sudo apt install ffmpeg
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

---

## Step 3: Start the Forensic Node

Launch the engine so the dashboard can communicate with it.

```bash
npm start
```

```pseudo
ENGINE STATUS -> ACTIVE
LISTENING FOR -> FORENSIC REQUESTS
KEEP TERMINAL WINDOW OPEN
```

---

## Step 4: Launch the Dashboard

```pseudo
OPEN frontend/
DOUBLE CLICK index.html
BROWSER -> Launch Dashboard
READY -> Verify Media
```

---

# 💡 Why Run Locally?

| Feature | Web Demo | Local Engine |
| :--- | :---: | :---: |
| File Privacy | Uploaded to Server | ✅ Stays on Your PC |
| Video Support | Disabled / Limited | ✅ Fully Functional |
| Processing Speed | Throttled | ✅ Max CPU Power |
| Forensic Detail | Basic | ✅ Deep Interrogation |

---

# 📜 Repository Structure

```pseudo
DeepSafe/
│
├── backend/
│   ├── Node.js forensic engine
│   └── API logic
│
├── frontend/
│   ├── HTML
│   ├── CSS
│   └── JavaScript dashboard
│
├── docs & demo/
│   ├── Research drafts
│   └── Technical presentations
└── README.md
```
