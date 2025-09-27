# MERN Todo App

A full-stack **MERN (MongoDB, Express, React, Node.js)** Todo application with authentication, dark/light mode, and full CRUD functionality.

---

## Features

- **User Authentication**
  - Sign up, login, logout using JWT stored in **HTTP-only cookies**
  - Protected routes using React `PrivateRoute`
- **Task Management**
  - Create, read, update, delete tasks
  - Tasks are tied to logged-in users
- **Dark / Light Mode**
  - Toggle between dark and light themes using React Context and TailwindCSS
- **Responsive Design**
  - Mobile-first layout built with **TailwindCSS**
- **Optimizations**
  - Lazy-loaded routes using React `lazy` and `Suspense`
  - Temporary success/error messages using `setTimeout`

---

## Tech Stack

- **Frontend:** React.js, React Router v6, Context API, TailwindCSS, Axios  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, bcryptjs, JWT  
- **Other:** HTTP-only cookies, React Icons

## Installation

### Backend

```bash
cd backend
npm install
  
