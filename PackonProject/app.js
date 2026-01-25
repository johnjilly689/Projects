import express from "express";
import path from "path";
import { title } from "process";
import { fileURLToPath } from "url";

//  from "./routes/public/index.ejs";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const j_object = [
  {
    id: "0001",
    type: "taco",
    name: "Chicken Taco",
    price: 2.99,
    ingredients: {
      protein: {
        name: "Chicken",
        preparation: "Grilled",
      },
      salsa: {
        name: "Tomato Salsa",
        spiciness: "Medium",
      },
      toppings: [
        {
          name: "Lettuce",
          quantity: "1 cup",
          ingredients: ["Iceberg Lettuce"],
        },
        {
          name: "Cheese",
          quantity: "1/2 cup",
          ingredients: ["Cheddar Cheese", "Monterey Jack Cheese"],
        },
        {
          name: "Guacamole",
          quantity: "2 tablespoons",
          ingredients: ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"],
        },
        {
          name: "Sour Cream",
          quantity: "2 tablespoons",
          ingredients: ["Sour Cream"],
        },
      ],
    },
  },
  {
    id: "0002",
    type: "taco",
    name: "Beef Taco",
    price: 3.49,
    ingredients: {
      protein: {
        name: "Beef",
        preparation: "Seasoned and Grilled",
      },
      salsa: {
        name: "Salsa Verde",
        spiciness: "Hot",
      },
      toppings: [
        {
          name: "Onions",
          quantity: "1/4 cup",
          ingredients: ["White Onion", "Red Onion"],
        },
        {
          name: "Cilantro",
          quantity: "2 tablespoons",
          ingredients: ["Fresh Cilantro"],
        },
        {
          name: "Queso Fresco",
          quantity: "1/4 cup",
          ingredients: ["Queso Fresco"],
        },
      ],
    },
  },
  {
    id: "0003",
    type: "taco",
    name: "Fish Taco",
    price: 4.99,
    ingredients: {
      protein: {
        name: "Fish",
        preparation: "Battered and Fried",
      },
      salsa: {
        name: "Chipotle Mayo",
        spiciness: "Mild",
      },
      toppings: [
        {
          name: "Cabbage Slaw",
          quantity: "1 cup",
          ingredients: [
            "Shredded Cabbage",
            "Carrot",
            "Mayonnaise",
            "Lime Juice",
            "Salt",
          ],
        },
        {
          name: "Pico de Gallo",
          quantity: "1/2 cup",
          ingredients: ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"],
        },
        {
          name: "Lime Crema",
          quantity: "2 tablespoons",
          ingredients: ["Sour Cream", "Lime Juice", "Salt"],
        },
      ],
    },
  },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index", {
    title_2: "Taco Recipes",
    recipe: null,
  });
});

app.post("/recipe", (req, res) => {
  const choice = req.body.choice;
  let recipe = null;

  switch (choice) {
    case "chicken":
      recipe = j_object[0];
      break;
    case "beef":
      recipe = j_object[1];
      break;
    case "fish":
      recipe = j_object[2];
      break;
  }

  res.render("index", {
    title_2: "Taco Recipes",
    recipe: recipe,
  });
});
// app.post("/", (req, res) => {
//   res.render("index.ejs",{});
// });
export default app;
