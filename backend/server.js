const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load environment variables
console.log("Loading environment variables...");
dotenv.config();
console.log("Environment variables loaded");

// Connect to database
console.log("Connecting to database...");
connectDB();
console.log("Database connection initiated");

const app = express();

// Middleware
console.log("Setting up middleware...");
app.use(cors());
app.use(express.json());
console.log("Middleware setup complete");

// Basic route for testing
app.get("/", (req, res) => {
  console.log("Root route accessed");
  res.json({ message: "Server is running" });
});

// Test route
app.get("/api/test", (req, res) => {
  console.log("Test route accessed");
  res.json({ message: "API is working" });
});

// Routes
console.log("Setting up routes...");
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
console.log("Routes setup complete");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// 404 handler
app.use((req, res) => {
  console.log("404 - Route not found:", req.method, req.url);
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

// Start server with error handling
const server = app.listen(PORT, () => {
  console.log("=================================");
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log("=================================");
}).on('error', (err) => {
  console.error("Server failed to start:", err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});
