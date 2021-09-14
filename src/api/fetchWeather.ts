import axios from "axios";

const API_KEY = "47caba6fab6205f7799e809e620ed990";
const URL = "https://api.openweathermap.org/data/2.5/weather";

export type Weather = {
  coord: Coord;
  weather?: WeatherEntity[] | null;
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
export type Coord = {
  lon: number;
  lat: number;
};
export type WeatherEntity = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};
export type Wind = {
  speed: number;
  deg: number;
};
export type Clouds = {
  all: number;
};
export type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export const fetchWeather = async (query: string): Promise<Weather> => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      APPID: API_KEY,
    },
  });

  return data;
};
