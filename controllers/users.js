require("dotenv").config();
const usersRouter = require("express").Router();
const { User, Book } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { userExtractor } = require("../utils/middleware");

usersRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const passwordHash = await bcrypt.hash(
      body.password,
      10
    );
    const user = await User.create({
      name: body.name,
      userId: uuidv4(),
      passwordHash: passwordHash,
    });
    user.save().then((result) => res.json(result).status(200));
  } catch (error) {
    res.json(error).status(500);
  }
});

usersRouter.get("/:userId", userExtractor, async (req, res) => {
  
  console.log(req.user.userId)
  const userId = req.params.userId;
  try {

    if (req.user.userId !== req.params.userId) {
      return res.json("Invalid token or userId").status(500)
      
    }
    const data = await User.findAll({ include: [Book],
     where: { userId:userId },attributes: { exclude: ["passwordHash","createdAt", "updatedAt"] }
    });

    res.json(data);
  } catch (error) {
    res.json(error).status(500);
  }
});

usersRouter.get("/",  async (req, res) => {
  try {
    const data = await User.findAll({include: [Book],
      attributes: { exclude: ["passwordHash"] },
    });
    res.json(data).status(200);
  } catch (error) {
    res.json(error).status(500);
  }
});

module.exports = usersRouter;