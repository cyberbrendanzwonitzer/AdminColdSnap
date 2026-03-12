require("dotenv").config();

const toBool = (val) => val && val !== "false" && val !== "0";

module.exports = {
  port: parseInt(process.env.PORT || "3001", 10),
  corsOrigin: process.env.CORS_ORIGIN || "*",
  
  // Main API configuration
  mainApiBase: process.env.MAIN_API_BASE || "http://localhost:3000",
  enableMockData: toBool(process.env.ENABLE_MOCK_DATA || "false")
};
