const jwt = require("jsonwebtoken");

const userFromToken = (req) => {
  const token = req.header("Authorization").split(" ")[1]; // Bearer <token>
  // console.log(token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

module.exports = userFromToken;
