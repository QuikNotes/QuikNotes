import { DataTypes } from "sequelize";
import testSequelize from "../config/test-db";

// Define Note model for testing purposes
const TestNote = testSequelize.define("Note", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'personal',
    validate: {
      isIn: [['personal', 'business']]
    }
  }
});

export default TestNote;
