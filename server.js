import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const apiURL = "https://api.jikan.moe/v4";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Home page: Allow user to enter an anime they are looking for
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//Anime: Display search results to the user
app.post("/anime", async (req, res) => {
  try {
    const response = await axios.get(apiURL + "/anime", {
      params: {
        q: req.body.q,
        sfw: true,
      },
    });
    const result = response.data;
    res.render("index.ejs", { content: result.data });
  } catch (error) {
    res.send(error.message);
  }
});

//Anime/id: If the user selects an anime they will be directed to the single view of that anime that displays
//more information
app.post("/anime/id", async (req, res) => {
  try {
    const response = await axios.get(
      apiURL + "/anime" + `/${req.body.animeId}`
    );
    const result = response.data;
    res.render("single-view.ejs", { content: result.data });
  } catch (error) {
    res.send(error.message);
  }
});

//Random: Presents user with a random anime from database reuses single-pageview
app.get("/random", async (req, res) => {
  try {
    const response = await axios.get(apiURL + "/random/anime", {
      params: {
        sfw: true,
      },
    });
    const result = response.data;
    res.render("single-view.ejs", { content: result.data });
  } catch (error) {
    res.send(error.message);
  }
});

//Top Anime: Display
app.get("/top/anime", async (req, res) => {
  try {
    const response = await axios.get(apiURL + "/top/anime");
    const result = response.data;
    res.render("index.ejs", { content: result.data });
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
