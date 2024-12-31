import "./css/App.css";
import { useState } from "react";
function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "c3d92766e978b9a239ef9ca9ce3cdf51";
  const tDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name!");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response JSON:", data);

      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("City not found or API request failed.");
    }

    console.log(weatherData);
  };

  return (
    <div className="main container">
      <div className="d-flex mb-5">
        <input
          className="form-control me-2"
          type="search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter Location"
          aria-label="Search"
        />
        <button
          className="btn btn-outline-success"
          onClick={fetchWeather}
          type="submit"
        >
          Search
        </button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="col-12 col-sm-6 row mx-auto  weather-panel">
            <div className="col-6">
              <h2>
                {weatherData ? weatherData.name : "--"}
                <br />
                <small>{tDate}</small>
              </h2>
              <p className="h3">
                <i className="wi wi-day-hail"></i>{" "}
                {weatherData ? weatherData.weather[0].description : "--"}
              </p>
            </div>
            <div className="col-6 text-center">
              <div className="h1 temperature">
                <i className="wi wi-thermometer"></i>
                <span>{weatherData ? weatherData.main.temp : "--"}°</span>
                <br />
                <small>
                  {weatherData ? weatherData.main.temp_min : "--"}° /{" "}
                  {weatherData ? weatherData.main.temp_max : "--"}°
                </small>
              </div>
            </div>
            <div className="col-12 ">
              <ul className="list-inline row forecast">
                <li className="col-2 text-center">
                  <h3 className="h5">Wed</h3>
                  <p>
                    <i className="wi wi-day-cloudy"></i>
                    <br />
                    9°/18°
                  </p>
                </li>
                <li className="col-2 text-center">
                  <h3 className="h5">Thu</h3>
                  <p>
                    <i className="wi wi-day-sunny"></i>
                    <br />
                    12°/23°
                  </p>
                </li>
                <li className="col-2 text-center">
                  <h3 className="h5">Fri</h3>
                  <p>
                    <i className="wi wi-day-cloudy-windy"></i>
                    <br />
                    14°/24°
                  </p>
                </li>
                <li className="col-2 text-center">
                  <h3 className="h5">Sat</h3>
                  <p>
                    <i className="wi wi-day-rain"></i>
                    <br />
                    15°/23°
                  </p>
                </li>
                <li className="col-2 text-center">
                  <h3 className="h5">Sun</h3>
                  <p>
                    <i className="wi wi-day-rain-mix"></i>
                    <br />
                    15°/22°
                  </p>
                </li>
                <li className="col-2 text-center">
                  <h3 className="h5">Mon</h3>
                  <p>
                    <i className="wi wi-day-storm-showers"></i>
                    <br />
                    12°/17°
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
