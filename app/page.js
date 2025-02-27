"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("light");

  const API_KEY = "4bae9816a64f3e140b7db9830649ef32";

  // Sample capital cities - you can expand this list
  const capitals = [
    { city: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
    { city: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
    { city: "Berlin", country: "Germany", lat: 52.52, lon: 13.405 },
    { city: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038 },
    { city: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964 },
    { city: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041 },
    { city: "Brussels", country: "Belgium", lat: 50.8503, lon: 4.3517 },
    { city: "Vienna", country: "Austria", lat: 48.2082, lon: 16.3738 },
    { city: "Stockholm", country: "Sweden", lat: 59.3293, lon: 18.0686 },
    { city: "Oslo", country: "Norway", lat: 59.9139, lon: 10.7522 },
  ];

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching weather for:", city);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      console.log("API Response:", response.data);
      setWeather(response.data);
    } catch (err) {
      console.error("API Error:", err);
      setError("City not found or API error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <label className="swap swap-rotate absolute top-4 right-4">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <svg
              className="swap-on fill-current w-8 h-8 text-[#FAEBD7]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-off fill-current w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:from-[#FFF5E1] dark:to-[#FFE4B5] mb-2">
            European Capitals Weather
          </h1>
          <div className="flex items-center justify-center gap-2 text-base-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-base-content">
              Real-time Weather Information
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="h-[600px] rounded-xl overflow-hidden shadow-xl">
            <MapContainer
              center={[50.8503, 4.3517]}
              zoom={4}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {capitals.map((capital) => (
                <Marker
                  key={capital.city}
                  position={[capital.lat, capital.lon]}
                  icon={icon}
                  eventHandlers={{
                    click: () => fetchWeather(capital.city),
                  }}
                >
                  <Popup>
                    <div className="font-semibold">{capital.city}</div>
                    <div className="text-sm text-gray-600">
                      {capital.country}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Weather Info Section */}
          <div className="space-y-4">
            {loading && (
              <div className="flex justify-center p-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}

            {error && (
              <div className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {weather && (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl text-base-content">
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold text-base-content">
                      {Math.round(weather.main.temp)}°C
                    </div>
                    <div className="flex flex-col items-end">
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        width="100"
                        height="100"
                      />
                      <p className="capitalize text-base-content">
                        {weather.weather[0].description}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="stat bg-base-200 rounded-box">
                      <div className="stat-title text-base-content/70">
                        Humidity
                      </div>
                      <div className="stat-value text-base-content">
                        {weather.main.humidity}%
                      </div>
                    </div>
                    <div className="stat bg-base-200 rounded-box">
                      <div className="stat-title text-base-content/70">
                        Wind Speed
                      </div>
                      <div className="stat-value text-base-content">
                        {weather.wind.speed} m/s
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
