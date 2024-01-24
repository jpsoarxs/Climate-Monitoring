import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation } from "../context/LocationContext";
import { useSettings } from "../context/SettingsContext";
import { Weather, getTodayForecast } from "../services/weather";
import MetricToImperial from "../utils/metricToImperial";
import Conditions from "./Conditions";

export default function TodaysForecast() {
  const { location } = useLocation();
  const { settings } = useSettings();

  const [forecast, setForecast] = useState<Weather[]>();
  const [selected, setSelected] = useState<Weather & { pop?: number }>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function forecast() {
      if (location) {
        const result = await getTodayForecast(location?.lat, location?.lng, 9);
        setForecast(result);
        setLoading(false);
        if (!selected) {
          setSelected(result[0]);
        }
      }
    }

    forecast();
  }, [location]);

  useEffect(() => {
    async function forecast() {
      if (settings.search) {
        try {
          setLoading(true);
          const result = await getTodayForecast(0, 0, 9, settings.search);
          setForecast(result);

          if (!selected) {
            setSelected(result[0]);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    }

    forecast();
  }, [settings.search]);

  const selectWather = (weather: Weather) => {
    setSelected(weather);
  };

  return (
    <>
      <div className="dark:bg-gray-700 rounded-xl shadow-lg p-5">
        <div className="dark:text-gray-300 mb-5 uppercase">
          Today's Forecast
        </div>

        {loading && (
          <div role="status" className="space-y-2.5 animate-pulse">
            <div className="flex flex-row justify-around gap-1 w-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[170px] w-[10rem] flex flex-col items-center justify-center"
                >
                  <div className="h-5 mb-5 bg-gray-300 rounded-full dark:bg-gray-600 w-[100px]"></div>
                  <div className="flex items-center justify-center w-full h-20 bg-gray-300 rounded sm:w-20 dark:bg-gray-700">
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
                  <div className="h-7 mb-5 mt-5 bg-gray-300 rounded-full dark:bg-gray-600 w-[100px]"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Swiper
          modules={[Autoplay]}
          slidesPerView={5}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {forecast?.map((item, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col items-center px-10 border-r border-gray-300 dark:border-gray-600 last:border-r-0 cursor-pointer"
              onClick={() => selectWather(item)}
            >
              <div className="dark:text-gray-300 mb-3">{item.date}</div>
              <img src={item.icon} alt="Spain" className=" rounded-full " />
              <div className="text-2xl font-bold dark:text-gray-100 mt-3">
                {MetricToImperial(settings.measure, item?.temperature || 0)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p className="text-gray-700 dark:text-white mt-2 text-sm">
        Select hour to view weather conditions
      </p>

      <div className="mt-10">
        <Conditions
          wind={selected?.wind}
          realFeel={selected?.feels_like}
          rain={selected?.pop}
          date={selected?.date}
          humidity={selected?.humidity}
        />
      </div>
    </>
  );
}
