const booksRouter = require("express").Router();
const { Book, User } = require("../models");
const { v4: uuidv4 } = require("uuid");

booksRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ where: { userId: body.userId } });
  if (!user) return;
  try {
    console.log(user.dataValues.userId);
    const book = await Book.create({
      name: body.name,
      pubYear: body.pubYear,
      genres: body.genres,
      bookId: uuidv4(),
      uuid: user.dataValues.userId,
    });
    res.json(book);
  } catch (error) {
    res.json(body).status(500);
  }
});

booksRouter.get("/", async (req, res) => {
  try {
    const data = await Book.findAll({ include: [User] });
    res.json(data).status(200);
  } catch (error) {
    res.json(error).status(500);
  }
});

module.exports = booksRouter;