require("dotenv").config();
const usersRouter = require("express").Router();
const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

usersRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const passwordHash = await bcrypt.hash(body.password, Number(process.env.SALT));
    const user = await User.create({
      name: body.name,
      userId: uuidv4(),
      passwordHash: passwordHash,
    });
    user.save().then((result) => res.json("User Created!").status(200));
  } catch (error) {
    res.json(error).status(500);
  }
});

usersRouter.get("/", async (req, res) => {
  try {
      const data = await User.findAll({
        attributes:{exclude:["passwordHash"]}
    });
    res.json(data).status(200);
  } catch (error) {
    res.json("error has occurred").status(500);
  }
});

module.exports = usersRouter;
