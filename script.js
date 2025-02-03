"use strict";

// Query selectors
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const cityInput = document.querySelector("#cityInput");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

// adding event listeners to the search button and keydown enter
search.addEventListener("click", fetchWeather);
cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fetchWeather();
  }
});

// function to fetch the weather data
function fetchWeather() {
  const APIKey = "bcdc6bb962bdbcae8080a67956c32c5d";
  const city = cityInput.value.trim();

  if (city == "") return "";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${APIKey}`

    // `http://api.openweathermap.org/geo/1.0/direct?q=${city},${city},${city}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      //
      if (data.cod == "404") {
        container.style.height = "550px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      } else {
        container.style.height = "650px";
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");
      }

      // selecting the data accordly with the current weather
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      // switch case to change the wheather picture
      switch (data.weather[0].main) {
        case "Clear":
          image.src = "src/clear.png";
          break;
        case "Rain":
          image.src = "src/rain.png";
          break;
        case "Clouds":
          image.src = "src/cloudy-day.png";
          break;
        case "Mist":
          image.src = "src/mist.png";
        case "Haze":
          image.src = "src/mist.png";
        case "Fog":
          image.src = "src/mist.png";
          break;
        case "Thunderstorm":
          image.src = "src/storm.png";
          break;
        case "Snow":
          image.src = "src/snowstorm.png";
          break;
        default:
          image.src = "src/cloudy-day.png";
      }

      // updating the data info accordly with the location
      temperature.innerHTML = `${data.main.temp.toFixed()}°C`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed.toFixed()}Km/h`;
      image.innerHTML = `${data.weather.icon}`;
    });
}
