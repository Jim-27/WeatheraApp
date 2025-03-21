import React, { useState, useEffect } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("Manila"); // Default City
  const [searchInput, setSearchInput] = useState(""); // Walang default text sa input
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [cloudPosition, setCloudPosition] = useState(-50);

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  useEffect(() => {
    let x = -50;
    const timer = setInterval(() => {
      x = x >= 480 ? -50 : x + 1;
      setCloudPosition(x);
    }, 15);
    return () => clearInterval(timer); // Para di mag-bug ang cloud animation
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=af2d62810fab0531012423f0fd639cdc`
      );
      if (!response.ok) throw new Error("Invalid City");
      const data = await response.json();

      setWeather({
        city: data.name,
        country: data.sys.country,
        celsius: Math.ceil(data.main.temp - 273.15),
        fahrenheit: Math.ceil((data.main.temp - 273.15) * (9 / 5) + 32),
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
      setError(null);
    } catch (err) {
      setError("Invalid City");
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      setCity(searchInput);
      setSearchInput(""); // Clear input field after search
    }
  };

  return (
    <div className="main">
      {/* Animated Cloud */}
      <div className="cloud3" style={{ left: `${cloudPosition}px`, position: "absolute" }}>
        <img src="cloud3.png" alt="Cloud" />
      </div>

      {/* Search Bar */}
      <div className="searchContainer">
        <form className="searchBar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search City"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>

      {/* Weather Display */}
      <div className="cityContainer">
        <p className="city">{weather ? weather.city : error}</p>
        <p className="country">{weather ? weather.country : ""}</p>
      </div>
      <div className="tempContainer">
        <p className="celsius">{weather ? `${weather.celsius}°C` : ""}</p>
        <p className="fahren">{weather ? `${weather.fahrenheit}°F` : ""}</p>
      </div>

      {/* Grid Box para sa Wind at Humidity */}
      <div className="gridContainer" style={{ display: weather ? "grid" : "none" }}>
        <div className="box1">
          <span><p>Wind:</p></span>
          <div className="value">
            <i className="fa-solid fa-wind"></i>
            <p className="wind">{weather ? `${weather.wind} km/h` : ""}</p>
          </div>
        </div>
        <div className="box2">
          <span><p>Humidity:</p></span>
          <div className="value">
            <i className="fa-sharp fa-solid fa-droplet"></i>
            <p className="humidity">{weather ? `${weather.humidity}%` : ""}</p>
          </div>
        </div>
      </div>

      {/* Footer (GitHub Link) */}
      <div className="footer">
        <a href="" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
    </div>
  );
};

export default WeatherApp;
