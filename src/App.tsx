import "./App.css";

import { fetchWeather, Weather } from "./api/fetchWeather";
import { useCallback, useState } from "react";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setQuery(e.target.value);
    },
    []
  );

  const search: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      if (e.key === "Enter") {
        const data = await fetchWeather(query);
        console.log(data);
        setWeather(data);
        setQuery("");
      }
    },
    [query]
  );

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search deeper..."
        value={query}
        onChange={onInputChange}
        onKeyPress={search}
      />
      {weather && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              src={`https://openweathermap.org/img/wn/${
                weather.weather![0].icon
              }@2x.png`}
              className="city-icon"
              alt="weather-icon"
            />
            <p>{weather.weather![0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
