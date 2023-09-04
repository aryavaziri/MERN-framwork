const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      const error = new Error("No Token");
      error.statusCode = 401;
      throw error;
    }
    const userId = jwt.verify(token, "SECRET_KEY").id;
    User.findByIdAndUpdate(userId, {
      lastLogin: Date.now(),
    })
      .then((user) => {
        if (user) {
          console.log("User is Authenticated");
          req.user = user;
          next();
        } else {
          const error = new Error("No User exist with this credentials!");
          error.statusCode = 401;
          throw error;
        }
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
};
module.exports.isAuthenticated = isAuth;
