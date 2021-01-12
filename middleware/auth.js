const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = auth = function (...permittedRoles) {
  return (req, res, next) => {
    //Get token from header
    const token = req.header("x-auth-token");

    //If no token
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    //Verify token
    try {
      const decoded = jwt.verify(token, config.get("jwtSecretKey"));
      if (
        permittedRoles.length != 0 &&
        !permittedRoles.includes(decoded.user.role)
      )
        throw new Error();

      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid." });
    }
  };
};
