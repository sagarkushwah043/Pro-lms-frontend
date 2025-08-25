# Pro LMS — Frontend (Vite + React + Tailwind)

A fast, modern Learning Management System (LMS) frontend built with **Vite + React** and styled with **Tailwind CSS**.

[![Vite](https://img.shields.io/badge/Vite-frontend-blue)]()
[![React](https://img.shields.io/badge/React-18+-61DAFB)]()
[![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)]()

## 🚀 Live Demo
[Pro -LMS ](https://pro-lms-frontend.vercel.app)
---

## 📦 Tech Stack
- **Frontend:** React (Vite), React Router
- **Styling:** Tailwind CSS, Dark/Light Theme
- **State:** Local state/hooks (and optional Redux Toolkit)
- **HTTP:** axios/fetch (configurable API base URL)

---

## ✨ Features
- Course listing, details, enroll/unenroll
- Dark/Light theme toggle
- Responsive UI with clean cards and grids
- Client-side routing (SPA)
- API base URL via environment variable

---

## 🗂️ Project Structure (frontend only)
pro-lms-frontend/
├─ public/
├─ src/
│ ├─ components/
│ ├─ pages/
│ ├─ Context/
│ ├─ assets/
│ ├─ App.jsx
│ └─ main.jsx
├─ index.html
├─ package.json
├─ vite.config.js
└─ .env # created locally; not committed

yaml
Copy
Edit

---

## 🧰 Prerequisites
- **Node.js** 18 or newer (recommend LTS)
- **npm** (or **pnpm**/**yarn**)
- **Git**

Check versions:
```bash
node -v
npm -v
🏁 Getting Started (Step-by-Step)
1) Clone the repository
bash
Copy
Edit
git clone https://github.com/sagarkushwah043/Pro-lms-frontend.git
cd Pro-lms-frontend
2) Install dependencies
bash
Copy
Edit
npm install
# or
# pnpm install
# yarn
3) Configure environment variables
Create a .env file in the project root (same level as package.json):

ini
Copy
Edit
# API base URL (adjust to your backend URL or mock server)
VITE_API_BASE_URL=http://localhost:4000
In your code, you can read it via: import.meta.env.VITE_API_BASE_URL.

4) Run the development server
bash
Copy
Edit
npm run dev
Vite will print a local URL, typically: http://localhost:5173

5) Build for production
bash
Copy
Edit
npm run build
This creates an optimized dist/ folder.

6) Preview the production build (optional)
bash
Copy
Edit
npm run preview
🔌 Mock API (Optional)
If you don’t have a backend yet, you can use json-server for quick testing.

Install globally or as a dev dependency:

bash
Copy
Edit
npm i -D json-server
Add a mock/db.json file (example):

json
Copy
Edit
{
  "courses": [],
  "enrollments": []
}
Run the mock API:

bash
Copy
Edit
npx json-server --watch mock/db.json --port 4000
Ensure .env points to this port:

ini
Copy
Edit
VITE_API_BASE_URL=http://localhost:4000
🧪 Useful Scripts
Command	Description
npm run dev	Start dev server (Vite)
npm run build	Build production bundle
npm run preview	Preview built app locally

🌐 Deploy (Quick Notes)
Vercel/Netlify: Framework = Vite, build = npm run build, output = dist

GitHub Pages: Use a plugin or set SPA fallback. Make sure routes fall back to index.html.

🐞 Troubleshooting
Port in use: Change Vite port via vite.config.js or npm run dev -- --port 5174

Blank page after deploy: Ensure SPA fallback to index.html

API requests failing: Check VITE_API_BASE_URL and CORS on the backend

📜 License
MIT © 2025 Sagar Kushwah

yaml
Copy
Edit

---

### How to add this README to your repo

From your project root:

```bash
# 1) Create/overwrite README.md
# (Open your editor and paste the markdown above, save as README.md)

# 2) Commit & push
git add README.md
git commit -m "Add README with demo link and run steps"
git push origin main
