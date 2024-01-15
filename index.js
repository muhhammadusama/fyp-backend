/*****  Packages  *****/
import cors from "cors";
import express from "express"
import bodyParser from "body-parser";
import connectDB from "./db.js";
import { Transcript } from "./Text.schema.js";
import multer from "multer";
import { File } from "./File.schema.js";
/*****  Modules  *****/

connectDB();
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 5000;
/** Middlewares **/
app
  .use(cors("*"))
  .use(bodyParser.json({ limit: "50mb" }))

//routes
app.get("/check-status", (req, res) => {
  res.send("Server is running");
});

app.post("/savetext", async (req, res) => {
  const { text } = req.body;
  const transcript = await Transcript.create({ text });
  await transcript.save();
  res.json({ transcript});
});


app.post('/upload-audio', upload.single('audio'), async(req, res) => {
  const audioData = req?.file?.buffer; // This is the audio data in Buffer format
  console.log("🚀 ~ file: index.js:36 ~ app.post ~ audioData:", req.file  )

  const { originalname, mimetype, size, buffer } = req.file

    // Create a new file document
    const newFile = new File({
      filename: originalname,
      mimetype: mimetype,
      size: size,
      buffer: buffer,
    });

    // Save the file document to the database
    await newFile.save();

  // Handle the audio data (e.g., save to disk, process, etc.)
  
  res.json({ message: 'Audio uploaded successfully!' });
});

app.get('/audio', async(req, res) => {
  const file = await File.findOne({ filename: 'recorded_audio.wav' });
  console.log(file);
  res.status(200).json({  buffer: file.buffer });
  
});


app.listen(PORT, () => console.log(`Server is Listening on port ${PORT}.`));
