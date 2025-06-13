import { Sequelize } from "sequelize";

// Create in-memory SQLite database for testing
const testSequelize = new Sequelize("sqlite::memory:", {
  logging: false, // Disable SQL query logging
});

export default testSequelize;
