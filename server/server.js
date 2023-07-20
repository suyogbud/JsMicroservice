const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(cors());

app.use(express.json());

let books = [];

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).send();
});

app.put("books/:id", (req, res) => {
  const id = req.params.id;
  const book = req.body;

  let index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = book;
    res.send();
  } else {
    res.status(404).send("Book not found");
  }
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;

  let index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.send();
  } else {
    res.status(404).send();
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
