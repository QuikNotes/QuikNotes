import { describe, it, expect, afterAll, beforeAll } from "@jest/globals";
import testSequelize from "../config/test-db.js";
import TestNote from "../models/TestNote.js";

describe("Note Model Tests", () => {
  beforeAll(async () => {
    // Sync the test model with the in-memory database
    await testSequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close the database connection
    await testSequelize.close();
  });

  it("should create a note with valid fields", async () => {
    const note = await TestNote.create({
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
      TestNote.create({
        content: "This is a test note",
        category: "personal",
      })
    ).rejects.toThrow();
  });

  it("should not create a note without content", async () => {
    await expect(
      TestNote.create({
        title: "Test Note",
        category: "personal",
      })
    ).rejects.toThrow();
  });

  it("should validate category is either personal or business", async () => {
    await expect(
      TestNote.create({
        title: "Test Note",
        content: "This is a test note",
        category: "invalid",
      })
    ).rejects.toThrow();
  });

  it("should use personal as default category if not provided", async () => {
    const note = await TestNote.create({
      title: "Test Note",
      content: "This is a test note",
    });

    expect(note.category).toBe("personal");
  });
});
