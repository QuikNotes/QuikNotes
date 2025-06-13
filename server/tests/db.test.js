import { Sequelize } from "sequelize";
import { describe, it, expect, afterAll, beforeAll, jest } from "@jest/globals";
import Note from "../models/Note.js";
import sequelize from "../config/db.js";

// Mock the database connection
jest.mock("../config/db.js", () => {
  return {
    __esModule: true,
    default: new Sequelize("sqlite::memory:", {
      logging: false,
    }),
  };
});

describe("Note Model Tests", () => {
  beforeAll(async () => {
    // Sync the model with the database
    await Note.sync({ force: true });
  });

  afterAll(async () => {
    // Close the database connection
    await sequelize.close();
  });

  it("should create a note with valid fields", async () => {
    const note = await Note.create({
      title: "Test Note",
      content: "This is a test note",
      category: "personal",
    });

    expect(note).toBeDefined();
    expect(note.id).toBeDefined();
    expect(note.title).toBe("Test Note");
    expect(note.content).toBe("This is a test note");
    expect(note.category).toBe("personal");
    expect(note.createdAt).toBeDefined();
    expect(note.updatedAt).toBeDefined();
  });

  it("should not create a note without a title", async () => {
    await expect(
      Note.create({
        content: "This is a test note",
        category: "personal",
      })
    ).rejects.toThrow();
  });

  it("should not create a note without content", async () => {
    await expect(
      Note.create({
        title: "Test Note",
        category: "personal",
      })
    ).rejects.toThrow();
  });

  it("should validate category is either personal or business", async () => {
    await expect(
      Note.create({
        title: "Test Note",
        content: "This is a test note",
        category: "invalid",
      })
    ).rejects.toThrow();
  });

  it("should use personal as default category if not provided", async () => {
    const note = await Note.create({
      title: "Test Note",
      content: "This is a test note",
    });

    expect(note.category).toBe("personal");
  });
});

