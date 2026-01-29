import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
//need to generate a bearer token from
// https://secrets-api.appbrewery.com/generate-token

const yourBearerToken = "854a464a-a50c-4c0e-9193-77a1778c951f";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;

  try {
    const result = await axios.get(`${API_URL}/secrets/${searchId}`, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  try {
    const result = await axios.post(`${API_URL}/secrets`, req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  try {
    const searchId = req.body.id;
    const putData = await axios.put(
      `${API_URL}/secrets/${searchId}`,
      req.body,
      config,
    );
    res.render("index.ejs", { content: "PUT secret  implemented ." });
    // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  try {
    const response = await axios.patch(
      `${API_URL}/secrets/${req.body.id}`,
      req.body,
      config,
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try {
    const searchId = req.body.id;
    const response = await axios.delete(
      `${API_URL}/secrets/${searchId}`,
      config,
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
