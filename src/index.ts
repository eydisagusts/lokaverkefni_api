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
        price: 2500,
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
        price: 2500,
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
        price: 2500,
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
        price: 2500,
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
        price: 2500,
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
        price: 2500,
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
        price: 2500,
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
        price: 2500,
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
        price: 2500,
      },     
    ],
    email: "gunnsteinnskula@gmail.com",
    count: 10,
    date: new Date(),
    dish: {
      id: "53051",
      category: "seafood",
      cousine: "Malaysian",
      ingredients: [],
      description:
        "In a medium saucepan over medium heat, stir together coconut milk, water, ground ginger, ginger root, salt, bay leaf, and rice. Cover, and bring to a boil. Reduce heat, and simmer for 20 to 30 minutes, or until done.\r\n\r\n Step 2\r\nPlace eggs in a saucepan, and cover with cold water. Bring water to a boil, and immediately remove from heat. Cover, and let eggs stand in hot water for 10 to 12 minutes. Remove eggs from hot water, cool, peel and slice in half. Slice cucumber.\r\n\r\n Step 3\r\nMeanwhile, in a large skillet or wok, heat 1 cup vegetable oil over medium-high heat. Stir in peanuts and cook briefly, until lightly browned. Remove peanuts with a slotted spoon and place on paper towels to soak up excess grease. Return skillet to stove. Stir in the contents of one package anchovies; cook briefly, turning, until crisp. Remove with a slotted spoon and place on paper towels. Discard oil. Wipe out skillet.\r\n\r\n Step 4\r\nHeat 2 tablespoons oil in the skillet. Stir in the onion, garlic, and shallots; cook until fragrant, about 1 or 2 minutes. Mix in the chile paste, and cook for 10 minutes, stirring occasionally. If the chile paste is too dry, add a small amount of water. Stir in remaining anchovies; cook for 5 minutes. Stir in salt, sugar, and tamarind juice; simmer until sauce is thick, about 5 minutes.\r\n\r\n Step 5\r\nServe the onion and garlic sauce over the warm rice, and top with peanuts, fried anchovies, cucumbers, and eggs.",
      imageSource:
        "https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg",
      name: "Nasi lemak",
      price: 2500,
    },
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