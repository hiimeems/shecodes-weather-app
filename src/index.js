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

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function weatherCondition(response) {
  console.log(response.data);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#show-temp`).innerHTML = Math.round(
    response.data.main.temp
  );
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

function searchCity(city) {
  //console.log(city);
  let units = "metric";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiKey = `6e655c51885a817c91e42c6e1aa56edf`;
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(weatherCondition);
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

searchCity("New York");
