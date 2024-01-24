import axios from "axios";
import moment from "moment";

export interface Weather {
  name: string;
  temperature: number;
  humidity: number;
  wind: number;
  icon: string;
  description: string;
  date: string;
  feels_like: number;
}

const getWeatherByCords = async (
  lat: number,
  lon: number,
  search?: string
): Promise<Weather> => {
  let url = new URL("https://api.openweathermap.org/data/2.5/weather");

  if (search?.length) {
    url.searchParams.append("q", search);
  } else {
    url.searchParams.append("lat", lat.toString());
    url.searchParams.append("lon", lon.toString());
  }
  url.searchParams.append("units", "metric");
  url.searchParams.append("appid", import.meta.env.VITE_OPEN_WEATHER_MAP_KEY);

  const response = await axios.get(url.toString());

  if (!response.data) throw new Error("No data");

  const parser = {
    name: response.data.name,
    temperature: Math.round(response.data.main.temp),
    humidity: response.data.main.humidity,
    wind: response.data.wind.speed,
    icon: `https://openweathermap.org/img/wn/${response.data.weather[0]?.icon}@4x.png`,
    description: response.data.weather[0].description,
    feels_like: Math.round(response.data.main.feels_like),
    date: moment
      .utc(response.data?.dt * 1000)
      .utcOffset(response.data?.timezone / 60)
      .format("dddd, DD MMMM YYYY"),
  };

  return parser;
};

const getTodayForecast = async (
  lat: number,
  lon: number,
  qtd?: number,
  search?: string
): Promise<Weather[] & { pop: number }> => {
  let url = new URL("https://api.openweathermap.org/data/2.5/forecast");

  if (search?.length) {
    url.searchParams.append("q", search);
  } else {
    url.searchParams.append("lat", lat.toString());
    url.searchParams.append("lon", lon.toString());
  }
  url.searchParams.append("units", "metric");
  url.searchParams.append("cnt", qtd?.toString() || "5");
  url.searchParams.append("appid", import.meta.env.VITE_OPEN_WEATHER_MAP_KEY);

  const response = await axios.get(url.toString());

  if (!response.data) throw new Error("No data");

  const parser = response.data.list.map((item: any) => ({
    temperature: Math.round(item.main.temp),
    humidity: item.main.humidity,
    wind: item.wind.speed,
    icon: `https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`,
    description: item.weather[0].description,
    feels_like: Math.round(item.main.feels_like),
    pop: item.pop,
    date: moment
      .utc(item?.dt * 1000)
      .utcOffset(response.data?.city.timezone / 60)
      .format("hh:mm A"),
  }));

  return parser;
};

export { getTodayForecast, getWeatherByCords };
