const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  try{

    const role = req.user.role;
  
    if (role ==="resturantsAdmin"){
      return next();
    }
    return res.status(403).render("you are not allowed to access this page")
  }catch (ex){
    res.send(ex)
  }
};
