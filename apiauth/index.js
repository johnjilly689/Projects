import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3001;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "john";
const yourPassword = "John123";
// const yourAPIKey = "";
const yourBearerToken = "854a464a-a50c-4c0e-9193-77a1778c951f";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = response.data.find((secret) => secret.id === 20);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//   //TODO 3: Write your code here to hit up the /all endpoint
//   //Specify that you only want the secrets from page 2
//   //HINT: This is how you can use axios to do basic auth:
//   // https://stackoverflow.com/a/74632908
//   /*
//    axios.get(URL, {
//       auth: {
//         username: "abc",
//         password: "123",
//       },
//     });
//   */
// });

// app.get("/apiKey", (req, res) => {

// });
//   //TODO 4: Write your code here to hit up the /filter endpoint
//   //Filter for all secrets with an embarassment score of 5 or greater
//   //HINT: You need to provide a query parameter of apiKey in the request.
// });

app.get("/bearerToken", async (req, res) => {
  const response = await axios
    .get(API_URL + "secrets/42", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    })
    .then((response) => {
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    })
    .catch((error) => {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    });
});
//});
//   //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
//   //and get the secret with id of 42
//   //HINT: This is how you can use axios to do bearer token auth:
//   // https://stackoverflow.com/a/52645402
//   /*
//   axios.get(URL, {
//     headers: {
//       Authorization: `Bearer <YOUR TOKEN HERE>`
//     },
//   });
//   */
// });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
