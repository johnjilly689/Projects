import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const token = process.env.bearer_token;
const API_URL = process.env.api_url;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL, config);
    const result = response.data;
    res.render("index", { secret: result.secret, user: result.username });
  } catch (error) {
    res.render("index", { secret: null, user: null });
  }
});

export default app;
