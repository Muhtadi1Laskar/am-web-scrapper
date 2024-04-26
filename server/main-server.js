import express from "express";
import { Scrapper } from "../Scrapper-Class/Scrapper.js";

const port = process.env.port || 8080;
const app = express();
app.use(express.json());

const scrapper = new Scrapper();
const param = {
  scrapperType: "genre",
  mediaFormat: "anime",
  name: "Comedy",
};

app.get("/scrape-genre", async (req, res) => {
  try {
    const data = await scrapper.main(param);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
