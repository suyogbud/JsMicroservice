const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const { MongoClient } = require("mongodb");
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://127.0.0.1:27017";
const dbName = "bookstore"; // Replace "bookstore" with your database name

let db;

MongoClient.connect(mongoURI, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.get("/books", async (req, res) => {
  try {
    const books = await db.collection("books").find().toArray();
    res.json(books);
  } catch (error) {
    res.status(500).send("Error fetching books from database");
  }
});

app.post("/books", async (req, res) => {
  const book = req.body;
  try {
    await db.collection("books").insertOne(book);
    res.status(201).send();
  } catch (error) {
    res.status(500).send("Error adding the book to the database");
  }
});

app.put("/books/:id", async (req, res) => {
  const id = req.params.id;
  const book = req.body;

  try {
    const result = await db
      .collection("books")
      .updateOne({ id: id }, { $set: book });

    if (result.modifiedCount === 1) {
      res.send();
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(500).send("Error updating the book in the database");
  }
});

app.delete("/books/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.collection("books").deleteOne({ id: id });

    if (result.deletedCount === 1) {
      res.send();
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting the book from the database");
  }
});

app.get("/posts", (req, res) => {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

app.listen(3001, () => console.log("Server running on port 3001"));
