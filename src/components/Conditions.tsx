import { MaterialSymbol } from "react-material-symbols";
import { useSettings } from "../context/SettingsContext";
import MetricToImperial from "../utils/metricToImperial";

export default function Conditions({
  realFeel,
  wind,
  rain,
  date,
  humidity,
}: {
  realFeel: number | undefined;
  wind: number | undefined;
  rain: number | undefined;
  humidity: number | undefined;
  date?: string;
}) {
  const { settings } = useSettings();

  return (
    <div className="dark:bg-gray-700 rounded-xl shadow-lg p-5">
      <div className="dark:text-gray-300 mb-5 uppercase">
        weather conditions at <span className="font-bold">{date}</span>
      </div>

      <div className="flex items-center justify-around">
        <div className="flex gap-5">
          <MaterialSymbol
            icon="device_thermostat"
            size={24}
            className="text-gray-700 dark:text-white"
          />
          <div>
            <div className="dark:text-white text-gray-700">Real Feel</div>
            <div className="text-2xl font-semibold text-gray-700 dark:text-white">
              {MetricToImperial(settings.measure, realFeel || 0)}
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <MaterialSymbol
            icon="air"
            size={24}
            className="text-gray-700 dark:text-white"
          />
          <div>
            <div className="text-gray-700 dark:text-white">Wind</div>
            <div className="text-2xl font-semibold text-gray-700 dark:text-white">
              {wind || 0} km/h
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <MaterialSymbol
            icon="water_drop"
            size={24}
            className="text-gray-700 dark:text-white"
          />
          <div>
            <div className="text-gray-700 dark:text-white">Humidity</div>
            <div className="text-2xl font-semibold text-gray-700 dark:text-white">
              {humidity || 0}%
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <MaterialSymbol
            icon="rainy_light"
            size={24}
            className="text-gray-700 dark:text-white"
          />
          <div>
            <div className="text-gray-700 dark:text-white">Chance of rain</div>
            <div className="text-2xl font-semibold text-gray-700 dark:text-white">
              {rain || 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
