DeepSafe
 Forensic-Grade Synthetic Media Detection

"Physics-Based Evidence in an AI-Driven World" 

DeepSafe is an advanced digital forensics platform that shifts the paradigm of deepfake detection. Instead of relying on fallible AI-vs-AI "guessing" games, DeepSafe interrogates the structural integrity of digital files. By analyzing sensor noise floors, metadata inconsistencies, and signal entropy, DeepSafe identifies the mathematical signatures that artificial intelligence physically cannot hide.

🚀 Key Features (Local Suite)
Running DeepSafe locally on your machine unlocks the full processing power of the Forensic Node:

🔬 Neural Entropy Analysis: Interrogates pixel-level variance to detect GAN-generated gradients.

🎞️ High-Bandwidth Video Scans: (Local Only) Temporal analysis of frames to find "stitching" artifacts and lighting inconsistencies.

📂 Multi-Modal Support: Unified engine for Image, Audio, and Video interrogation.

⚖️ Forensic Reports: Generates structured data (JSON) for professional verification.
🛠️ How to Run DeepSafe Locally (Quick Start)
Step 1: Download & Extract
Click the green "Code" button at the top of this repository.

Select "Download ZIP".

Extract the ZIP file to a folder on your computer.

Step 2: Initialize the Backend
DeepSafe requires a local server to handle the forensic math.

Open your terminal (Command Prompt or PowerShell on Windows).

Navigate to the extracted folder: cd "path/to/DeepSafe/backend".

Run:

Bash
npm install
(This downloads the necessary "engine parts" directly to your system).

Step 3: Start the Forensic Node
In the same terminal, run:

Bash
npm start
You should see a message saying "Server running on port 3000". Keep this window open!

Step 4: Launch the Dashboard
Go to the frontend folder in your file explorer.

Double-click index.html.

DeepSafe is now live. You can now drag and drop files for full-depth local analysis.

💡 Why Run Locally?

While the hosted version is a great preview, the Localhost version is where the real power lives:

No File Size Limits: Process large 4K videos without server timeouts.

Maximum Privacy: Your media never leaves your machine; it stays on your local network.

Full Computational Speed: Uses your system's raw CPU/GPU power for pixel-level noise extraction.
