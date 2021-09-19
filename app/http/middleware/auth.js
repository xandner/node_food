const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.headers["x-auth-token"];
  if (!token) return res.status(401).send("you must login ");
  try {
    const user = jwt.verify(token, config.get("jwtPrivatekye"));
    console.log(user)
    if (!user) return res.status(401).send("invalid token")
    req.user = user;
    next();
  } catch (ex) {
    return res.status(401).send("Error");
  }
};
