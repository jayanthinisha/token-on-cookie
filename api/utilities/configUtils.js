const jwtKey = "qwerty";

// Api Response format
const apiResponse = {
    success: false,
    message: "",
    payload: "",
    error: "",
  };

  const config = {
    jwtKey,
    apiResponse,
  };
  
  module.exports = config;