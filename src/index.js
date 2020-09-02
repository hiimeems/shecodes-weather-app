let now = new Date();
//console.log(now);

let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let day = days[now.getDay()];

let date = now.getDate();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
let month = months[now.getMonth()];

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let today = document.querySelector("#today");
today.innerHTML = `${days[now.getDay()]} ${hours}:${minutes}`;
//console.log(today);

let monthAndDate = document.querySelector("#date");
monthAndDate.innerHTML = `${month} ${date}`;
//console.log(monthAndDate);

function weatherCondition(response) {
  //console.log(response.data);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#show-temp`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#display-description`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#display-humidity`).innerHTML =
    response.data.main.humidity;
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
