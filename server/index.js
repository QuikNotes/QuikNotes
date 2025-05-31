/* global process */
import express from "express";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js";
import sequelize from "./config/db.js";
import Note from "./models/Note.js";
import path from "path";
import { fileURLToPath } from "url";
import seedDatabase from "./config/seeds.js";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Add CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// Test route
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../dist");
  console.log(`Serving static files from: ${distPath}`);

  app.use(express.static(distPath));

  // Handle all routes for SPA
  app.get("*", (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Sync database and start server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");

    // Sync models with database
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Database synced...");

    // Seed the database with dummy data if needed
    return seedDatabase();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
