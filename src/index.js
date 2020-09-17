function formatDate(timestamp) {
  let now = new Date();
  let dateElement = now.getDate();
  let months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  let month = months[now.getMonth()];

  let date = document.querySelector(`#date`);
  date.innerHTML = `${month} ${dateElement}`;

  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  let day = days[now.getDay()];

  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function weatherCondition(response) {
  console.log(response.data);
  document.querySelector(`#city`).innerHTML = response.data.name;

  celsiusTemp = response.data.main.temp;

  document.querySelector(`#show-temp`).innerHTML = Math.round(celsiusTemp);
  document.querySelector(`#display-description`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#display-humidity`).innerHTML =
    response.data.main.humidity;
  document.querySelector(`#today`).innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector(`#icon`)
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector(`#icon`)
    .setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
          <div class="col-3">
            <h3>
              ${formatHours(forecast.dt * 1000)}
            </h3>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" />
            <div class="weather-forecast-temperature">
              <strong>${Math.round(
                forecast.main.temp_max
              )}°</strong> ${Math.round(forecast.main.temp_min)}°
            </div>
          </div>
    `;
  }
}

function searchCity(city) {
  //console.log(city);
  let units = "metric";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiKey = `6e655c51885a817c91e42c6e1aa56edf`;
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(weatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleRequest(event) {
  event.preventDefault();
  //console.log(event);
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener("submit", handleRequest);

function findMe(position) {
  let units = "metric";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiKey = `6e655c51885a817c91e42c6e1aa56edf`;
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(weatherCondition);
}

function locateMe(event) {
  //console.log(event);
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findMe);
}

let button = document.querySelector(`#current-location`);
button.addEventListener("click", locateMe);

let celsiusTemp = null;

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(`#show-temp`);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(`#show-temp`);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  currentTemp.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector(`#celsius-link`);
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("New York");
