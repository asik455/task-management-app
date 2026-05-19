# Task Management Application (Frontend)

A clean, minimal, and professional task management frontend built with React.js, Vite, Ant Design, React Router DOM, and Firebase Google Authentication.

## Features
- Google Authentication (Firebase, placeholder logic)
- Create, view, and update tasks
- Minimal, responsive UI with Ant Design
- Routing with React Router DOM
- Axios API service placeholder
- Dummy task data for initial state
- Loading, empty, and error/success message placeholders

## Folder Structure
```
src/
├── api/           # Axios instance, dummyTasks.js
├── components/    # Navbar, TaskForm, TaskList, TaskCard
├── context/       # AuthContext
├── firebase/      # Firebase config placeholder
├── pages/         # Login, Dashboard
├── routes/        # AppRoutes, ProtectedRoute
├── services/      # Message service placeholder
```

## Getting Started
1. Install dependencies:
	```bash
	npm install
	```
2. Start the development server:
	```bash
	npm run dev
	```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Notes
- Replace Firebase config in `src/firebase/firebaseConfig.js` with your own.
- Integrate real backend API in `src/api/axios.js` when ready.
- Extend authentication and protected route logic as needed.

---

**Assessment Ready:**
- Simple, clean, and scalable architecture
- No overengineering or unnecessary features
- Suitable for a 3-hour assessment
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
