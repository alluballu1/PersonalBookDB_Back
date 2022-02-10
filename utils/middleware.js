require("dotenv").config();
const jwt = require("jsonwebtoken");



const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }

  next();
};

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  request.user = decodedToken;

  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
