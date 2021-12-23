const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const hashPass = (pass) => bcrypt.hash(pass, 10);
const comparePass = (plain, hashed) => bcrypt.compare(plain, hashed);

const generateToken = (user) => jwt.sign({ ...user }, process.env.JWT_SECRET);
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = req.headers && authHeader;
  const error = new Error("Forbidden");
  if (token)
    jwt.verify(token, jwtSecret, async (err, user) => {
      if (err) {
        next(err);
      } else {
        const userFromDB = await User.findOne({
          email: user.email,
        });
        if (userFromDB) {
          req.user = user;
          next();
        } else {
          next(error);
        }
      }
    });
  else {
    next(error);
  }
};
module.exports = {
  hashPass,
  comparePass,
  generateToken,
  verifyToken,
};
