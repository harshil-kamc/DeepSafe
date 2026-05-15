# 🛡️ DEEPSAFE: Forensic-Grade Synthetic Media Detection
> **"Physics-Based Evidence in an AI-Driven World"**

DeepSafe is a high-performance digital forensics platform designed to restore trust in digital media. While traditional AI detectors rely on fallible "AI-vs-AI" guessing games, DeepSafe interrogates the **structural integrity** of digital files. By analyzing sensor noise floors and signal entropy, DeepSafe identifies the mathematical signatures that artificial intelligence physically cannot hide.

---

## 🚀 Key Features (Local Suite)
Running DeepSafe locally on your machine unlocks the full processing power of the **Forensic Node**:

* **🔬 Neural Entropy Analysis**
  Interrogates pixel-level variance to detect GAN-generated gradients that are invisible to the human eye.
* **🎞️ High-Bandwidth Video Scans**
  Full temporal analysis of frames to find "stitching" artifacts and lighting inconsistencies common in deepfakes.
* **🎙️ Acoustic Spectral Flux**
  Detects neural vocoder signatures and phase discontinuities in cloned voices by analyzing frequency jumps.

---

## 🛠️ Local Installation & Setup
Follow these steps to deploy the DeepSafe engine on any system. No Git knowledge or commands are required.

### **Step 1: Download & Extract**
1. Click the green **"Code"** button at the top of this repository.
2. Select **"Download ZIP"**.
3. Extract the ZIP file to a folder on your computer.

### **Step 2: Initialize the Forensic Backend**
The backend handles the "heavy lifting" forensic math. You must install the environment first:
1. Open your **Terminal** (Command Prompt or PowerShell on Windows).
2. Navigate to the backend folder:
   `cd "Path/To/Your/Extracted/DeepSafe-Folder/backend"`
3. Run the installation command (Requires [Node.js](https://nodejs.org/)):
   ```bash
   npm install

   
### **Step 3: Start the Forensic Node**
Launch the engine so the dashboard can communicate with it
`npm start`
Keep this window open!
The engine is now active and listening for forensic requests.


### **Step 4: Launch the Dashboard**
1.Go to the frontend folder in your file explorer.
2.Double-click index.html to open it in your browser.
3.You are now ready to verify media with full local power.
---

## 💡 Why Run Locally?

| Feature | Web Demo | **Local Engine** |
| :--- | :---: | :---: |
| **File Privacy** | Uploaded to Server | **Stays on your PC** |
| **Video Support** | Disabled / Limited | **Fully Functional** |
| **Processing Speed** | Throttled | **Max CPU Power** |
| **Forensic Detail** | Basic | **Deep Interrogation** |

---

### **📜 Repository Structure**
backend/ – Node.js forensic engine and API logic.
frontend/ – The User Dashboard (HTML/CSS/JS).
docs/ – Project research, drafts, and technical presentations.
