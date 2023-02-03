const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let { authorization: token } = req.headers;
  token = token?.replace("Bearer ", "");
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, { algorithms: "HS512" }, (err, decoded) => {
      if (err) {
        res.status(498).json({ message: "Invalid token" });
      } else {
        next()
      }
    });
  } else {
    res.status(400).json({message: "No token provided" });
  }
};

module.exports = authMiddleware;