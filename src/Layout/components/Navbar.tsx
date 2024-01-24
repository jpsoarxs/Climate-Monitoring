import { Switch } from "@material-tailwind/react";
import { useEffect } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { useLocation } from "../../context/LocationContext";
import { useSettings } from "../../context/SettingsContext";
import { enrichGeoLocation } from "../../services/google";

export default function Navbar() {
  const { setLocation } = useLocation();
  const { setSettings } = useSettings();

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const enrich = await enrichGeoLocation({
            lat: latitude,
            lng: longitude,
          });

          setLocation(enrich);
        },
        (error) => {
          alert(`Error to get location: ${error.message}`);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handlerSearch = (e: any) => {
    if (e.key !== "Enter") {
      return;
    }

    setSettings({ search: e.target.value });
  };

  const handlerSwitch = (e: any) => {
    setSettings({
      measure: e.target.checked ? "imperial" : "metric",
    });
  };

  return (
    <nav className="dark:bg-gray-700 text-white p-4 rounded-xl m-5 flex items-center justify-around gap-2 shadow-xl">
      <MaterialSymbol
        icon="search"
        size={24}
        className="text-gray-700 dark:text-white"
      />
      <input
        type="text"
        className="bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-600 w-[60%] rounded-full px-5 py-2 focus:outline-none"
        placeholder="Search for city"
        onKeyDown={handlerSearch}
      />

      <div className="flex items-center">
        <span className="mr-2 text-gray-700 dark:text-white">Celsius</span>
        <Switch crossOrigin={undefined} onChange={handlerSwitch} />
        <span className="ml-2  text-gray-700 dark:text-white">Fahrenheit</span>
      </div>
    </nav>
  );
}
