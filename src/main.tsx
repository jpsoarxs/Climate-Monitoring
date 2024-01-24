import "leaflet/dist/leaflet.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-material-symbols/outlined";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LayoutDefault from "./Layout/Default.tsx";
import { LocationProvider } from "./context/LocationContext.tsx";
import { SettingsProvider } from "./context/SettingsContext.tsx";
import "./index.css";
import Map from "./pages/Map.tsx";
import Weather from "./pages/Weather.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Weather />,
      },
      {
        path: "/map",
        element: <Map />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider>
      <LocationProvider>
        <RouterProvider router={router} />
      </LocationProvider>
    </SettingsProvider>
  </React.StrictMode>
);
