import { useEffect, useState } from "react";
import TodaysForecast from "../components/TodaysForecast";
import { useLocation } from "../context/LocationContext";
import { useSettings } from "../context/SettingsContext";
import { Weather, getWeatherByCords } from "../services/weather";
import MetricToImperial from "../utils/metricToImperial";

export default function Weather() {
  const { location } = useLocation();
  const { settings, setSettings } = useSettings();

  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    setSettings({
      loading: true,
    });

    async function updateWeather(location: any) {
      const result = await getWeatherByCords(location?.lat, location?.lng);

      setWeather(result);
    }

    async function weather() {
      if (location) {
        await updateWeather(location);

        setSettings({
          loading: false,
        });
      }
    }

    weather();
  }, [location]);

  useEffect(() => {
    async function weather() {
      if (settings.search) {
        try {
          setSettings({
            loading: true,
            ...settings,
          });

          const result = await getWeatherByCords(0, 0, settings.search);

          setWeather(result);
        } catch (error) {
          alert("Error to get weather by search, try again.");
        } finally {
          setSettings({
            loading: false,
            ...settings,
          });
        }
      }
    }

    weather();
  }, [settings.search]);

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <div
          role="status"
          className={`${
            settings.loading && "space-y-2.5 animate-pulse max-w-lg"
          }`}
        >
          {(settings.loading && (
            <div className="flex flex-col gap-1 w-full">
              <div className="h-7 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-40"></div>
            </div>
          )) || (
            <>
              <h1 className="text-2xl font-bold dark:text-gray-100">
                {weather?.name}
              </h1>
              <span className="text-gray-500">{weather?.date}</span>
            </>
          )}

          <div className="flex items-center gap-2 mt-5">
            <span className="text-6xl font-bold dark:text-gray-100">
              {MetricToImperial(settings.measure, weather?.temperature || 0)}
            </span>

            {(settings.loading && (
              <div className="flex flex-col gap-1 w-full">
                <div className="h-3.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
              </div>
            )) || <span className="text-gray-500">{weather?.description}</span>}
          </div>
        </div>

        <div
          role="status"
          className={`${
            settings.loading && "space-y-2.5 animate-pulse max-w-lg"
          }`}
        >
          {(settings.loading && (
            <div className="flex items-center justify-center w-full h-32 bg-gray-300 rounded sm:w-32 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          )) || (
            <img src={weather?.icon} alt="Weather" className="rounded-full" />
          )}
        </div>
      </div>

      <div className="mt-10">
        <TodaysForecast />
      </div>
    </div>
  );
}
