const express = require("express");
const router = express.Router();
const configUtils = require("../utilities/configUtils");
const jwtUtils = require("../utilities/jwtUtils");

// Validate and add token to cookie
router.post("/login", (req, res) => {
  const apiResponse = { ...configUtils.apiResponse };
  const username = req.body.username

  //   If Login Successful
  if (true) {
    //create jwt token
    const token = jwtUtils.createToken(300,username)
    res.cookie('authcookie',token, {httpOnly: true, maxAge: 300000})
    apiResponse.success = true;
    apiResponse.payload = { success: "true" };
    apiResponse.message = "login successful";
    res.status(200).json(apiResponse);
  } else {
    apiResponse.success = false;
    apiResponse.message = "Bad request";
    apiResponse.error = err;
    res.status(500).json(apiResponse);
  }
  
});

// Validate token
router.get("/refreshToken", jwtUtils.verifyToken, (req, res) => {
  const apiResponse = { ...configUtils.apiResponse };
  const _id = req._id
  //create jwt token
  const token = jwtUtils.createToken(300,_id)
  res.cookie('authcookie',token, {httpOnly: true, maxAge: 300000})
  apiResponse.success = true;
  apiResponse.payload = { success: "true" };
  apiResponse.message = "login successful";
  res.status(200).json(apiResponse);
});

// remove token from cookie
router.get("/logout", jwtUtils.verifyToken, (req, res) => {
  const apiResponse = { ...configUtils.apiResponse };
  res.cookie('authcookie','token', {httpOnly: true, maxAge: 0})
  apiResponse.success = true;
  apiResponse.payload = { success: "true" };
  apiResponse.message = "logout successful";
  res.status(200).json(apiResponse);
});

// remove token from cookie
router.get("/testTokenPassing", jwtUtils.verifyToken, (req, res) => {
  const apiResponse = { ...configUtils.apiResponse };
 // res.cookie('authcookie','token', {httpOnly: true, maxAge: 0})
  apiResponse.success = true;
  apiResponse.payload = { success: "true" };
  apiResponse.message = "passed";
  res.status(200).json(apiResponse);
});


module.exports = router;
