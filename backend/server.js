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

  // Reality Defender gives final confidence here
  if (typeof result.score === "number") {
    return result.score;
  }

  return 0;
}

/* =========================
   ANALYZE ROUTE
========================= */
app.post("/analyze", upload.single("media"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({
      success: false,
      error: "No file uploaded"
    });

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

    /* ================= VIDEO ================= */
    if (mimeType.startsWith("video")) {

      const frameFolder = "uploads/frames";

      if (!fs.existsSync(frameFolder)) {
        fs.mkdirSync(frameFolder, { recursive: true });
      }

      // Clean old frames
      fs.readdirSync(frameFolder).forEach(file =>
        fs.unlinkSync(`${frameFolder}/${file}`)
      );

      // Extract 5 frames
      const command = `ffmpeg -i "${filePath}" -vf fps=1 -vframes 5 ${frameFolder}/frame-%02d.jpg`;
      await execPromise(command);

      const frameFiles = fs
        .readdirSync(frameFolder)
        .filter(f => f.endsWith(".jpg"));

      let scores = [];

      for (const frame of frameFiles) {
        const result = await realityDefender.detect({
          filePath: `${frameFolder}/${frame}`
        });

        console.log("FRAME RESPONSE:", result);

        scores.push(getFinalProbability(result) * 100);

        fs.unlinkSync(`${frameFolder}/${frame}`);
      }

      fs.unlinkSync(filePath);

      const average =
        scores.reduce((a, b) => a + b, 0) / scores.length;

      return res.json({
        success: true,
        mediaType: "Video",
        averageAIProbability: average.toFixed(2)
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
   START SERVER
========================= */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});