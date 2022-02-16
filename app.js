const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const usersRouter = require("./controllers/users");
const booksRouter = require("./controllers/books");
const loginRouter = require("./controllers/login");
const {tokenExtractor} = require("./utils/middleware")
const app = express();

app.use(express.json());
app.use(cors());
app.use(tokenExtractor)
app.use("/users", usersRouter)
app.use("/books", booksRouter)
app.use("/login", loginRouter)
app.listen({ port: process.env.PORT }, async () => {
  console.log("Connecting to port 5001.");
  await sequelize.sync({alter:true});
  console.log("Connected");
});
