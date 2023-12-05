const apiKey = "a24d6174d6fd64c2caed4fa5c656dadf";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
let latitude;
let longitude;

// Get DateTime info
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const weekdayShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const currentDate = new Date();
const dayOfWeek = weekday[currentDate.getDay()];
const dayOfMonth = currentDate.getDate();
const monthName = month[currentDate.getMonth()];
const year = currentDate.getFullYear();
const dayOfWeekShort = weekdayShort[currentDate.getDay()];

const todayLeft = document.getElementById('today-left');
const dateDay = document.getElementById('date-day');
const dayName1 = document.getElementById('day-name-1');
const dayName2 = document.getElementById('day-name-2');
const dayName3 = document.getElementById('day-name-3');
const dayName4 = document.getElementById('day-name-4');
const dayTemp1 = document.getElementById('day-temp-1');
const dayTemp2 = document.getElementById('day-temp-2');
const dayTemp3 = document.getElementById('day-temp-3');
const dayTemp4 = document.getElementById('day-temp-4');

todayLeft.innerText = `${dayOfWeek}`;
dateDay.innerText = `${dayOfMonth.length > 0 ? dayOfMonth : ('0' + dayOfMonth.toString())} ${monthName} ${year}`;
dayName1.innerText = `${dayOfWeekShort}`;
dayName2.innerText = `${currentDate.getDay() + 1 > 6 ? weekdayShort[currentDate.getDay() + 1 - 7] : weekdayShort[currentDate.getDay() + 1]}`;
dayName3.innerText = `${currentDate.getDay() + 2 > 6 ? weekdayShort[currentDate.getDay() + 2 - 7] : weekdayShort[currentDate.getDay() + 2]}`;
dayName4.innerText = `${currentDate.getDay() + 3 > 6 ? weekdayShort[currentDate.getDay() + 3 - 7] : weekdayShort[currentDate.getDay() + 3]}`;

// Get weather info
const locationElement = document.getElementById('location');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');

const precipitation = document.getElementById('precipitation');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    fetchWeather(null);
}

function fetchWeather(location) {
    let url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    if (!location) {
        url = `${apiUrl}?lat=${latitude}&lon=${longitude}&&appid=${apiKey}&units=metric`;
    }

    fetch(url).then(response => response.json()).then(data => {
        locationElement.textContent = `${data.name}, ${data.sys.country}`;
        weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDesc.textContent = data.weather[0].description;

        precipitation.textContent = `${Math.round(data.clouds.all)}%`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${Math.round(data.wind.speed * 100) / 100} m/s`;

        dayTemp1.textContent = `${Math.round(data.main.temp)}°C`;
    }).catch(error => {
        console.error('Error fetching weather data:', error);
    });
}
