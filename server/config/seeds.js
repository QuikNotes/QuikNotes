/* global process */
import Note from "../models/Note.js";

const seedDatabase = async () => {
   // Always seed if RESET_DB is true or if there are no notes
  const count = await Note.count();
  const shouldSeed = process.env.RESET_DB === "true" ||
                     process.env.FORCE_SEED === "true" ||
                     count === 0;

  console.log(`Notes count: ${count}, Should seed: ${shouldSeed}, RESET_DB: ${process.env.RESET_DB}`);

  if (shouldSeed) {
    console.log("Seeding database with dummy data...");

    // Clear existing data if any exists
    if (count > 0) {
      await Note.destroy({ where: {} });
      console.log("Cleared existing notes");
    }

    try {
      // Create dummy notes
      await Note.bulkCreate([
        {
          title: "Welcome to QuikNotes!",
          content:
            "This is a simple note-taking application. Start by creating your first note!",
          category: "General",
          isStarred: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "How to Use QuikNotes",
          content:
            "1. Create new notes using the + button\n2. Edit notes by clicking on them\n3. Star important notes\n4. Delete notes you no longer need",
          category: "Tutorial",
          isStarred: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Project Ideas",
          content:
            "- Build a personal website\n- Create a recipe app\n- Develop a budget tracker\n- Learn a new programming language",
          category: "Ideas",
          isStarred: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Books to Read",
          content:
            "- The Pragmatic Programmer\n- Clean Code\n- Eloquent JavaScript\n- Design Patterns",
          category: "Reading List",
          isStarred: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Weekly Tasks",
          content:
            "- Review project code\n- Update documentation\n- Fix bugs\n- Implement new features\n- Write tests",
          category: "Tasks",
          isStarred: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      console.log("Database seeded successfully!");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  } else {
    console.log(`Database already contains ${count} notes. Skipping seed.`);
  }
};

export default seedDatabase;
