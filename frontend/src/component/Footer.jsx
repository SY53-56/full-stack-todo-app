import React from 'react'

 export const Footer = () => {
  return (
    <footer className="mt-auto py-4 text-center border-t bg-gray-100 dark:bg-gray-800">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        ✅ {new Date().getFullYear()} • Todo App • Built with React & Tailwind
      </p>

      <a
        href="https://github.com/SY53-56/full-stack-todo-app"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        View Source
      </a>
    </footer>
  );
};

