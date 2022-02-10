const booksRouter = require("express").Router();
const { Book } = require("../models");
const { v4: uuidv4 } = require("uuid");

booksRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const book = await Book.create({
      name: body.name,
      pubYear: body.pubYear,
      genres: body.genres,
      bookId: uuidv4(),
    });
    res.json(book);
  } catch (error) {
    res.json(body).status(500);
  }
});

booksRouter.get("/", async (req, res) => {
  try {
    const data = await Book.findAll();
    res.json(data).status(200);
  } catch (error) {
    res.json(error).status(500);
  }
});

module.exports = booksRouter