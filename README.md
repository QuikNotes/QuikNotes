# QuikNotes

QuikNotes is a modern note-taking application built with React, Vite, and Tailwind CSS. It allows users to create, read, update, and delete notes, categorize them as Personal or Business, and filter notes by category.

https://quiknotes.onrender.com/

## Features

- **Create and manage notes**: Add, edit, and delete notes
- **Categorize notes**: Organize notes as Personal or Business
- **Filter by category**: Easily find notes by filtering categories
- **Responsive design**: Works on both desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface with animations and hover effects

## Tech Stack

- **React**: Frontend library for building user interfaces
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **Context API**: For state management
- **date-fns**: For date manipulation and formatting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/QuikNotes.git
   cd QuikNotes
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
QuikNotes/
├── client/                  # Client-side code
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable components
│   │   │   ├── NoteForm.jsx # Form for creating/editing notes
│   │   │   ├── NoteItem.jsx # Individual note component
│   │   │   ├── NoteList.jsx # List of notes
│   │   │   └── Sidebar.jsx  # Sidebar for filtering
│   │   ├── context/         # State management
│   │   │   └── NoteContext.jsx # Global state for notes
│   │   ├── pages/           # Page components
│   │   │   └── Home.jsx     # Main page
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   └── index.html           # HTML template
├── public/                  # Public assets
├── tailwind.config.js       # Tailwind configuration
└── vite.config.js           # Vite configuration
```

## Future Enhancements

- User authentication and personal note storage
- Rich text editor for note content
- Search functionality
- Note sharing and collaboration
- Cloud synchronization
- Dark mode support
- Tags and more categorization options

## Reflection

The QuikNotes project provided valuable experience in implementing real-time communication and managing data synchronization efficiently. Our collaborative approach reinforced good practices in developing scalable backend architectures, creating responsive interfaces, and conducting regular team-based code reviews.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern note-taking apps
- Icon emojis for simplicity
