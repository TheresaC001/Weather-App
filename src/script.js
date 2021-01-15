function formatDay(date) {
  let dayIndex = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${days[dayIndex]}`;
}


function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  let iconElement =document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML=response.data.main.humidity;

  let windElement = document.querySelector("#wind");
    windElement.innerHTML= Math.round(response.data.main.wind.speed);
  }

function searchCity(city) {
  let apiKey = "2fcf9ddeade38f382171bf594220d6e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiURL=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response){
  let forecastElement =document.querySelector("#forecast");
  forecastElement.innerhtml= ` 
    <div class="col-2">
        <h3> 12:00 </h3>
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
          alt=""
          /> 
          <div class="weather-forecast=temperature">
            <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
                    `;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let todayElement = document.querySelector(".today");
let currentTime = new Date();
todayElement.innerHTML = formatDay(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
