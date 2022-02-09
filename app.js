const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { sequelize, User } = require("./models");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())

app.post("/users", async (req, res) => {
  const body = req.body;
  try {
      const user = await User.create({ name: body.name, id: uuidv4() });
      
      user.save()
    res.json(user).status(200);
  } catch (error) {
    res.json(error.errors[0].message).status(500);
  }
});

app.get("/users", async (req, res) => {
  try {
    const data = await User.findAll();
    res.json(data).status(200)
  } catch (error) {
    res.json("error has occurred").status(500);
  }
});

app.listen({ port: 5001}, async () => {
  console.log("Connecting to port 5001.");
  await sequelize.sync({ force: true });
  console.log("Connected");
});
