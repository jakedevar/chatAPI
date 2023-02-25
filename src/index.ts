// create an express server
import express from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;
const API_KEY = process.env.OPENAI_API_KEY;

const config = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(config);

// const router = express.Router();
// router.use((req, res, next) => { });



app.post('/image', async (req, res) => {
  console.log(req.body.input);
  const requestText = req.body.input;
  const imageResponse = await openai.createImage({
    prompt: requestText,
    n: 1,
    size: "256x256"
  });
  console.log(imageResponse.data.data[0].url);
  res.send(imageResponse.data.data[0].url);
});

app.get('/text', (_req, _res) => {

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

