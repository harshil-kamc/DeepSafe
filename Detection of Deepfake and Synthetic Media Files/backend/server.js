import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import { exec } from "child_process";
import util from "util";
import { RealityDefender } from "@realitydefender/realitydefender";

dotenv.config();

const execPromise = util.promisify(exec);
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

console.log("API KEY Loaded:", process.env.API_KEY ? "YES ✅" : "NO ❌");

/* =========================
   MULTER STORAGE
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

/* =========================
   REALITY DEFENDER INIT
========================= */
const realityDefender = new RealityDefender({
  apiKey: process.env.API_KEY
});

/* =========================
   PROBABILITY EXTRACTOR
========================= */
function getFinalProbability(result) {
  if (!result) return 0;
  if (typeof result.score === "number") {
    return result.score;
  }
  return 0;
}

/* =========================
   ROOT ROUTE (FIXED)
========================= */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* =========================
   ANALYZE ROUTE
========================= */
app.post("/analyze", upload.single("media"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: "No file uploaded"
    });
  }

  const filePath = req.file.path;
  const mimeType = req.file.mimetype;

  try {
    /* ================= IMAGE + AUDIO ================= */
    if (
      mimeType.startsWith("image") ||
      mimeType.startsWith("audio")
    ) {
      const result = await realityDefender.detect({ filePath });

      console.log("RAW API RESPONSE:", result);

      const probability = getFinalProbability(result);
      const percent = probability * 100;

      fs.unlinkSync(filePath);

      return res.json({
        success: true,
        mediaType: mimeType.startsWith("image")
          ? "Image"
          : "Audio",
        aiProbability: percent.toFixed(2)
      });
    }

    /* ================= VIDEO (DISABLED FOR RENDER) ================= */
    if (mimeType.startsWith("video")) {
      fs.unlinkSync(filePath);

      return res.status(400).json({
        success: false,
        error: "Video not supported on free hosting (ffmpeg not available)"
      });
    }

    /* ================= UNSUPPORTED ================= */
    fs.unlinkSync(filePath);

    return res.status(400).json({
      success: false,
      error: "Unsupported file type"
    });

  } catch (error) {
    console.error("AI ERROR:", error);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/* =========================
   START SERVER (FIXED)
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
