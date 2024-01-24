import { Outlet } from "react-router-dom";
import Cookies from "./components/Cookies";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function LayoutDefault() {
  return (
    <div className="flex h-screen overflow-auto dark:bg-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content including Navbar and Content */}
      <div className="flex flex-col flex-1 w-[68%] relative">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className={`flex-2 p-5 overflow-hidden`}>
          <Outlet />
        </main>

        {/* Cookies */}
        <Cookies />
      </div>
    </div>
  );
}
