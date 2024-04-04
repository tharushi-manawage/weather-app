var icon = document.getElementById("toggle-icon");

icon.onclick = function() {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        icon.src = "asset/img/sun.png";
    } else {
        icon.src = "asset/img/moon.png";
    }
}

const apiKey = "dfbef14c2bbc16049101fbd12ca3493e";
const apiCurrentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const apiWeatherForecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=7&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiCurrentWeatherURL + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        console.log(data);

        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name + " (" + data.sys.country + ")";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "asset/img/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "asset/img/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "asset/img/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "asset/img/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "asset/img/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "asset/img/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})