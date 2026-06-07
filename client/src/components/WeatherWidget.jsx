import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=6.9271&longitude=79.8612&current_weather=true"
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data.current_weather);
      })
      .catch(() => {
        setError("Weather data is currently unavailable.");
      });
  }, []);

  return (
    <section className="text-center rounded-xl bg-leaf p-4 text-white shadow-lg">
      <h2 className="text-lg font-bold">Colombo Weather</h2>

      {error && <p className="text-sm">{error}</p>}

      {weather ? (
        <div>
          <p className="mt-2 text-sm">
            🌡️ {weather.temperature}°C
          </p>

          <p className="text-sm">
            💨 {weather.windspeed} km/h
          </p>
        </div>
      ) : (
        !error && <p className="text-sm">Loading weather...</p>
      )}
    </section>
  );
}