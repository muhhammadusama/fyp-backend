/*****  Packages  *****/
import cors from "cors";
import express from "express"
import bodyParser from "body-parser";
import connectDB from "./db.js";
import { Transcript } from "./Text.schema.js";
/*****  Modules  *****/

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
/** Middlewares **/
app
  .use(cors())
  .use(bodyParser.json({ limit: "50mb" }))

//routes
app.get("/check-status", (req, res) => {
  res.send("Server is running");
});

app.post("/savetext", async (req, res) => {
  const { text } = req.body;
  const transcript = await Transcript.create({ text });
  await transcript.save();
  res.json({ message: "Transcript Saved" });
})


app.listen(PORT, () => console.log(`Server is Listening on port ${PORT}.`));
