const jwt = require("jsonwebtoken");
const configUtils = require("../utilities/configUtils");

// Creating new token for authorized users
const createToken = (expiry, _id) => {
  const token = jwt.sign({ _id }, configUtils.jwtKey, {
    expiresIn: expiry, // 30(30 ms), '2d', 10h
  });
  return token;
};

const verifyToken = (req, res, next) => {
  try {
    const tokenData = jwt.verify(
        req.cookies.authcookie,
      configUtils.jwtKey
    );
    req._id = tokenData._id;
    next();
  } catch (err) {
    configUtils.apiResponse.success = false;
    configUtils.apiResponse.message = "Invalid Token";
    configUtils.apiResponse.error = err;
    return res.status(401).json(configUtils.apiResponse);
  }
};

const jwtUtils = { createToken, verifyToken };

module.exports = jwtUtils;
