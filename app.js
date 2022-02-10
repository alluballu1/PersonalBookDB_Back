const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const usersRouter = require("./controllers/users");
const booksRouter = require("./controllers/books");
const loginRouter = require("./controllers/login");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRouter)
app.use("/books", booksRouter)
app.use("/login", loginRouter)
app.listen({ port: 5001 }, async () => {
  console.log("Connecting to port 5001.");
  await sequelize.sync({ force: true });
  console.log("Connected");
});
