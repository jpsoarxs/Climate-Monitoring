import { useEffect, useState } from "react";
import MapRender from "../components/MapRender";
import { useLocation } from "../context/LocationContext";
import { getMapData } from "../services/map";

export default function Map() {
  const { location } = useLocation();

  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [weatherStep, setWeatherStep] = useState(0);
  const [mapCenter, setMapCenter] = useState<any | null>(null);

  useEffect(() => {
    async function mapData() {
      const result = await getMapData();
      setWeatherData(result);
    }

    mapData();
  }, []);

  useEffect(() => {
    if (location) {
      setMapCenter({
        lat: location.lat,
        lng: location.lng,
      });
    }
  }, [location]);

  useEffect(() => {
    if (weatherData !== null) {
      const numSteps = weatherData.radar.past.length;
      setInterval(async () => {
        setWeatherStep((prevStep: any) => (prevStep + 1) % numSteps);
      }, 5000);
    }
  }, [weatherData]);

  return (
    <div className="flex flex-col h-[80vh] w-full">
      <MapRender
        weatherData={weatherData}
        weatherStep={weatherStep}
        mapCenter={mapCenter}
        setMapCenter={setMapCenter}
      />
      <p className="mt-5 text-gray-700 dark:text-white text-sm font-light">
        You can click on the map to get the weather at that location.
      </p>
    </div>
  );
}
