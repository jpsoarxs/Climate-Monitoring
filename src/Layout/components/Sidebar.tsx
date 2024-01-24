import { useEffect, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { useLocation as useRouterLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useRouterLocation();
  const currentDarkMode = localStorage.getItem("darkMode") === "true";

  const [darkMode, setDarkMode] = useState(currentDarkMode || false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const selectedClass = (path: string) => {
    return location.pathname === path
      ? "bg-slate-600 border-b-4 border-b-orange-300"
      : "";
  };

  return (
    <aside
      className={`dark:bg-gray-700 text-white flex flex-col m-5 rounded-xl shadow-xl`}
    >
      <ul className="space-y-2 p-4 flex-1">
        <li
          className={`flex flex-col justify-center items-center bg-slate-600 p-5 rounded-xl bg-gray-200 dark:bg-gray-600 cursor-pointer ${selectedClass(
            "/"
          )}`}
        >
          <a href="/" className="flex flex-col items-center justify-center">
            <MaterialSymbol
              icon="partly_cloudy_day"
              size={40}
              className="text-gray-700 dark:text-white"
            />
            <span className="text-xl font-light text-gray-700 dark:text-white">
              weather
            </span>
          </a>
        </li>

        <li
          className={`flex flex-col justify-center items-center bg-slate-600 p-5 rounded-xl bg-gray-200 dark:bg-gray-600 cursor-pointer ${selectedClass(
            "/map"
          )}`}
        >
          <a href="/map" className="flex flex-col items-center justify-center">
            <MaterialSymbol
              icon="map"
              size={40}
              className="text-gray-700 dark:text-white"
            />
            <span className="text-xl font-light text-gray-700 dark:text-white">
              map
            </span>
          </a>
        </li>
      </ul>
      <div className="p-4 flex items-center">
        <button
          className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-full p-2 flex items-center justify-center"
          onClick={toggleDarkMode}
        >
          {!darkMode ? (
            <MaterialSymbol icon="light_mode" size={24} color="" />
          ) : (
            <MaterialSymbol icon="dark_mode" size={24} color="" />
          )}
        </button>
      </div>
    </aside>
  );
}
