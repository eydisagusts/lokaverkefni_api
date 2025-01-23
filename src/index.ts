import express, { type Express, type Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import type { Order } from "./types";

// Initialize default orders and id
let nextId = 2;
let orders: Order[] = [
  {
    id: 1,
    drinks: [
      {
        brewer: "",
        category: "Cocktail",
        description: "Tasty Cocktail",
        ingredients: ["Tequila, ", "Triple sec, ", "Lime juice"],
        id: "11007",
        imageSource:
          "https://www.thecocktaildb.com/images/media/drink/d7ff7u1606855412.jpg",
        name: "Margarita",
        price: 25,
      },
      {
        brewer: "",
        category: "Cocktail",
        description: "Tasty Cocktail",
        ingredients: ["Bourbon, ", "Sweet Vermouth, ", "Angostura bitters, ", "Maraschino cherry, ", "Orange peel"],
        id: "11008",
        imageSource:
          "https://www.thecocktaildb.com/images/media/drink/yk70e31606771240.jpg",
        name: "Manhattan",
        price: 25,
      },
      {
        brewer: "",
        category: "Cocktail",
        description: "Ginger Beer",
        ingredients: ["Ginger Beer, ", "Dark Rum, ", "Lime"],
        id: "17211",
        imageSource:
          "https://www.thecocktaildb.com/images/media/drink/t1tn0s1504374905.jpg",
        name: "Dark and Stormy",
        price: 20,
      },
      {
        brewer: "",
        category: "Beer",
        description: "Irish russian",
        ingredients: ["Vodka, ", "Kahlua, ", "Coca-Cola, ", "Guinness Stout"],
        id: "17015",
        imageSource:
          "https://www.thecocktaildb.com/images/media/drink/swqurw1454512730.jpg",
        name: "Irish Russian",
        price: 16,
      },
      {
        brewer: "",
        category: "Beer",
        description: "Lager",
        ingredients: ["Lager, ", "Campari"],
        id: "16047",
        imageSource:
          "https://www.thecocktaildb.com/images/media/drink/xsqrup1441249130.jpg",
        name: "Campari Beer",
        price: 16,
      },
      {
        brewer: "",
        category: "Whiskey",
        description: "Strong Drink",
        ingredients: ["Jack Daniels, ", "Amaretto"],
        id: "13847",
        imageSource:
          "https://www.thecocktaildb.com/images/media/drink/9von5j1504388896.jpg",
        name: "Jackhammer",
        price: 28,
      },
      {
        brewer: "",
        category: "Cocktail",
        description: "Ordinary Drink",
        ingredients: ["Tequila, ", "Tomato Juice, ", "Orange Juice, ", "Lime Juice, ","Syrup, ", "Salt"],
        id: "17217",
        imageSource:
          "https://www.thecocktaildb.com/images/media/drink/yfhn371504374246.jpg",
        name: "Vampiro",
        price: 20,
      },   
      {
        brewer: "",
        category: "Coffee / Tea",
        description: "Strong Drink",
        ingredients: ["Vodka, ", "Tea, ", "Sugar, ", "Lemon, "],
        id: "14456",
        imageSource:
          "https://www.thecocktaildb.com/images/media/drink/xrsrpr1441247464.jpg",
        name: "Kurant Tea",
        price: 18,
      },     
      {
        brewer: "",
        category: "Cocktail",
        description: "Ordinary Drink",
        ingredients: ["Gin, ", "Lime Juice, ", "Syrup, ", "Lime"],
        id: "17255",
        imageSource:
          "https://www.thecocktaildb.com/images/media/drink/3xgldt1513707271.jpg",
        name: "Gimlet",
        price: 20,
      },     
    ],
    dish: [
      {
        id: "52803",
        category: "Beef",
        cousine: "British",
        ingredients: ["Beef Fillet", "mushrooms", "Parma ham", "Mustard", "Puff pastry"],
        description: "Delicious Beef Wellington",
        imageSource: "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
        name: "Beef Wellington",
        price: 50,
      },
      {
        id: "52824",
        category: "Beef",
        cousine: "British",
        ingredients: ["Beef", "Broccoli", "Potatoes", "Carrots"],
        description: "Delicious Beef Sunday Roast",
        imageSource: "https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg",
        name: "Beef Sunday Roast",
        price: 45,
      },
      {
        id: "52796",
        category: "Chicken",
        cousine: "Italian",
        ingredients: ["Chicken", "Pasta", "Broccoli", "mushrooms", "Pepper", "garlic", "Parmesan cheese"],
        description: "Delicious Chicken Alfredo Primavera",
        imageSource: "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg",
        name: "Chicken Alfredo Primavera",
        price: 32,
      },
      {
        id: "52819",
        category: "Seafood",
        cousine: "Mexican",
        ingredients: ["Tortilla","White Fish", "Avocado", "Lettuce", "Salsa", "Spring Onion", "sour cream", "Cajun spice"],
        description: "Delicious Cajun spiced fish tacos",
        imageSource: "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
        name: "Cajun spiced fish tacos",
        price: 30,
      },
      {
        id: "52831",
        category: "Chicken",
        cousine: "Japanese",
        ingredients: ["Chicken","Garlic", "Soy sauce", "Sake", "Lemon"],
        description: "Delicious Chicken Karaage",
        imageSource: "https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg",
        name: "Chicken Karaage",
        price: 27,
      },
      {
        id: "52832",
        category: "Chicken",
        cousine: "French",
        ingredients: ["Chicken","Bacon", "Tomato puree", "Shallots", "Chestnut mushroom"],
        description: "Delicious Chicken Karaage",
        imageSource: "https://www.themealdb.com/images/media/meals/qstyvs1505931190.jpg",
        name: "Coq au vin",
        price: 23,
      },
      {
        id: "52839",
        category: "Pasta",
        cousine: "Italian",
        ingredients: ["Linguine Pasta","Sugar Snap Peas", "King Prawns", "Cherry Tomatoes", "Lettuce", "Fromage Frais", "Lime", "Bread"],
        description: "Delicious Prawn Pasta",
        imageSource: "https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg",
        name: "Prawn Pasta",
        price: 27,
      },
      {
        id: "52840",
        category: "Soup",
        cousine: "American",
        ingredients: ["Clams","Bacon", "Onion", "Potatoes", "Parsley"],
        description: "Delicious Clam chowder",
        imageSource: "https://www.themealdb.com/images/media/meals/rvtvuw1511190488.jpg",
        name: "Clam chowder",
        price: 19,
      },
      {
        id: "52951",
        category: "Chicken",
        cousine: "Chinese",
        ingredients: ["Chicken","Duck Sauce", "Soy Sauce", "Gochujang", "Spring Onions"],
        description: "Delicious General Tso's Chicken",
        imageSource: "https://www.themealdb.com/images/media/meals/1529444113.jpg",
        name: "General Tso's Chicken",
        price: 27,
      },
      {
        id: "52773",
        category: "Seafood",
        cousine: "Japanese",
        ingredients: ["Salmon","Olive oil", "Soy Sauce", "Sake", "Sesame Seed"],
        description: "Delicious Honey Teriyaki Salmon",
        imageSource: "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
        name: "Honey Teriyaki Salmon",
        price: 35,
      },
      {
        id: "53034",
        category: "Pork",
        cousine: "Japanese",
        ingredients: ["Salmon","Olive oil", "Soy Sauce", "Sake", "Sesame Seed"],
        description: "Delicious Japanese Katsudon",
        imageSource: "https://www.themealdb.com/images/media/meals/d8f6qx1604182128.jpg",
        name: "Japanese Katsudon",
        price: 36,
      },
      {
        id: "52784",
        category: "Vegetarian",
        cousine: "British",
        ingredients: ["Onion","Leek", "Garlic", "Cumin", "Coriander", "Smoked Paprika", "Cinnamon", "Chili Powder", "Cocoa", "Dried Oregano", "Diced Tomatoes", "Carrots", "Brown Lentils", "Sea Salt", "Squash", "Cashews", "Apple Cider Vinegar"],
        description: "Delicious Smoky Lentil Chili with Squash",
        imageSource: "https://www.themealdb.com/images/media/meals/uwxqwy1483389553.jpg",
        name: "Smoky Lentil Chili with Squash",
        price: 29,
      },
    ],
    email: "gunnsteinnskula@gmail.com",
    count: 2,
    date: new Date(),
  },
];

// Initialize api
const api: Express = express();
api.use(cors());
api.use(express.json());
api.use(bodyParser.urlencoded({ extended: false }));
const port = 3001;

// GET endpoint to get all orders
api.get("/api/orders", (_, res) => {
  console.log("Getting orders:", orders);
  return res.json(orders);
});

// Validation function for order - note that the object validation might not be entirely accurate and might need some modification
const isOrder = (body: Order | Record<string, unknown>): body is Order => {
  if (
    "name" in body &&
    typeof body.name === "string" &&
    "email" in body &&
    typeof body.email === "string" &&
    "dish" in body &&
    typeof body.dish === "object"
  ) {
    return true;
  }
  return false;
};

// POST endpoint for creating an order
api.post("/api/create-order", (req: Request<Order>, res) => {
  const emailAlreadyTaken = () => {
    if (!req.body.email) {
      return false;
    }
    // Returns true if email exists, and the index is 0 or higher. Returns false if it cannot find the item, resulting in -1
    return orders.findIndex((order) => order.email === req.body.email) >= 0;
  };

  if (!isOrder(req.body)) {
    res.json({
      success: false,
      error: "Must supply all properties of an order",
    });
    return;
  }

  if (emailAlreadyTaken()) {
    res.json({
      success: false,
      error: "Email already reserved",
    });
    return;
  }

  const order: Order = {
    ...req.body,
    id: nextId,
  };

  orders.push(order);
  nextId += 1;

  return res.json({
    success: true,
    order,
  });
});

// PUT endpoint to update orders
api.put("/api/update-order", (req: Request<Order>, res) => {
  const emailDoesNotExist = () => {
    if (!req.body.email) {
      return false;
    }
    // Returns true if email does not exist, and the index is lower than 0, resulting in -1
    return orders.findIndex((order) => order.email === req.body.email) < 0;
  };

  if (!isOrder(req.body)) {
    res.json({
      success: false,
      error: "Must supply all properties of an order",
    });
    return;
  }

  if (emailDoesNotExist()) {
    res.json({
      success: false,
      error: "Email does not exist, cannot update",
    });
    return;
  }

  // Map over each item, if the item has the same email as the email in the body, update the order with the new order changes
  orders.map((o) => {
    if (o.email === req.body.email) {
      return req.body;
    }
    return o;
  });

  return res.json({
    success: true,
    order: req.body,
  });
});

// GET endpoint to get order by email
api.get("/api/order/:email", (req, res) => {
  const order = orders.find((order) => order.email === req.params.email);
  if (order) {
    return res.json(order);
  }

  res.json({
    success: false,
    error: `Could not find order with email: ${req.params.email}`,
  });
});

// DELETE endpoint to delete order by id
api.delete("/api/order/:id", (req, res) => {
  const orderId = Number.parseInt(req.params.id, 10);
  const order = orders.find((e) => e.id === orderId);
  if (order) {
    orders = orders.filter((e) => e.id !== orderId);
    res.json({
      success: true,
      deletedorder: order,
    });
  } else {
    res.json({
      success: false,
      error: `Could not find order with id=${orderId}`,
    });
  }
});

// DELETE endpoint to delete order by email
api.delete("/api/order/:email", (req, res) => {
  const paramEmail = req.params.email;
  const order = orders.find((e) => e.email === paramEmail);
  if (order) {
    orders = orders.filter((e) => e.email !== paramEmail);
    res.json({
      success: true,
      deletedorder: order,
    });
  } else {
    res.json({
      success: false,
      error: `Could not find order with id=${paramEmail}`,
    });
  }
});

api.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
