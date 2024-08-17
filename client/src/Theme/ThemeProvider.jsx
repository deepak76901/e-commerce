import React from "react";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="text-black bg-white dark:text-white dark:bg-gray-900 min-h-screen">
        {children}
      </div>
    </div>
  );
}
