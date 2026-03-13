require("dotenv").config();

const toBool = (val) => val && val !== "false" && val !== "0";
const normalizeUrl = (value) => String(value || "").trim().replace(/\/+$/, "");
const isProduction = process.env.NODE_ENV === "production";
const defaultMainApiBase = isProduction ? "" : "http://localhost:3000";

module.exports = {
  port: parseInt(process.env.PORT || "3001", 10),
  corsOrigin: process.env.CORS_ORIGIN || "*",
  
  // Main API configuration
  mainApiBase: normalizeUrl(process.env.MAIN_API_BASE || defaultMainApiBase),
  enableMockData: toBool(process.env.ENABLE_MOCK_DATA || "false")
};
