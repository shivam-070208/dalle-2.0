# DALL-E 2.0 Image Generator

This project is a full-stack AI-powered image generator and sharing platform, inspired by DALL-E. It consists of a backend (Node.js, Express, MongoDB, Cloudinary) and a frontend (React, Vite).

---

## Backend

- **Tech Stack:** Node.js, Express, MongoDB, Cloudinary
- **API Endpoints:**
  - `POST /api/v1/dalle/` — Generate an image from a prompt using DALL-E API
  - `POST /api/v1/posts` — Save a generated image and prompt to the database (uploads image to Cloudinary)
  - `POST /api/v1/posts/fetch` — Fetch all posts from the database
- **Environment Variables:**
  - `MONGODB_URI` — MongoDB connection string
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary credentials
- **How to Run:**
  1. Install dependencies: `npm install`
  2. Set up your `.env` file (see `.env.example`)
  3. Start the server: `npm run dev` or `node index.js`

---

## Frontend

- **Tech Stack:** React, Vite, Tailwind CSS
- **Features:**
  - Enter a prompt to generate an image using DALL-E
  - Preview and share generated images with the community
  - View all shared images
- **How to Run:**
  1. Install dependencies: `npm install`
  2. Start the dev server: `npm run dev`
  3. Open [http://localhost:5173](http://localhost:5173) in your browser

---

## Folder Structure & Explanation

### backend/
- `index.js`: Main entry point for the backend server. Sets up Express, connects to MongoDB, configures routes, and starts the server.
- `package.json`: Lists backend dependencies and scripts.
- `image/`: (Optional) For image-related backend logic or storage. If present, may contain image processing utilities.
  - `index.js`: (If present) Contains image processing or utility functions.
- `mongodb/`: Handles database connection and models.
  - `connect.js`: Connects to MongoDB using credentials from `.env`.
  - `models/`: Contains Mongoose schemas.
    - `post.js`: Mongoose schema/model for storing posts (name, prompt, photo URL, etc.).
- `routes/`: Contains Express route handlers.
  - `dalleRoutes.js`: Handles API requests for generating images using DALL-E (calls the AI model, returns image data).
  - `postRoutes.js`: Handles API requests for saving and fetching posts (uploads images to Cloudinary, saves post data to MongoDB).

### frontend/
- `README.md`: Documentation for the frontend, including setup and features.
- `package.json`: Lists frontend dependencies and scripts.
- `vite.config.js`: Vite configuration for the React app.
- `index.html`: Main HTML file loaded by Vite; contains the root div for React.
- `public/`: Static assets (e.g., SVGs) served directly.
- `src/`: Main source code for the React frontend.
  - `App.jsx`: Main React component, sets up routes and layout.
  - `main.jsx`: Entry point for the React app, renders `<App />` into the DOM.
  - `App.css`, `index.css`: Global and app-specific styles.
  - `assets/`: Images and static assets used in the app (e.g., logo, preview images).
  - `components/`: Reusable React components.
    - `Card.jsx`: Displays a single post/image card.
    - `FormField.jsx`: Input field component for forms.
    - `Loader.jsx`: Loading spinner component.
    - `index.js`: Exports components for easy import.
  - `contrants/`: (Likely a typo, should be `constants/`) Holds constant values (e.g., API URLs, prompt lists).
    - `index.js`: Exports constants.
  - `pages/`: Main pages/views of the app.
    - `Createpost.jsx`: Page for generating and sharing a new image.
    - `Home.jsx`: Home page, likely displays all shared images.
    - `image.html`, `imggen.png`, `script.js`: (image.html: possibly a test/demo page; imggen.png: sample image; script.js: utility or demo script.)
    - `index.js`: (May export page components.)
  - `utils/`: Utility/helper functions.
    - `index.js`: Contains functions like `getRandomPrompt` and other helpers.

---

## Notes
- Make sure MongoDB and Cloudinary credentials are correct in your `.env` file.
- The backend must be running for the frontend to generate and share images.
- Images are stored in Cloudinary and posts in MongoDB.
