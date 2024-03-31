const apiKey = "863242cfb2b1d357e6093d9a4df19a4b";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=bangalore";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
    } else {
        var data = await response.json();

        // console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temperature) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "asset/img/clouds.png.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "asset/img/clear.png.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "asset/img/rain.png.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "asset/img/drizzle.png.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "asset/img/mist.png.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})