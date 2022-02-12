const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

loginRouter.post("/", async (request, response) => {
  try {
    const body = request.body;
    console.log(body);
    const user = await User.findAll({ where: { name: body.name } });
    const passwordCorrect =
      user.length === 0
        ? false
        : await bcrypt.compare(body.password, user[0].dataValues.passwordHash);
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    console.log(user[0].dataValues);

    const userForToken = {
      name: user[0].dataValues.name,
      userId: user[0].dataValues.userId,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);

    console.log(jwt.verify(token, process.env.SECRET));

    const { passwordHash, createdAt, updatedAt, ...rest } = user[0].dataValues;
    response.status(200).send({ token, name: user.name, user: rest });
  } catch (error) {
    response.json("Invalid credentials").status(500);
  }
});

module.exports = loginRouter;
