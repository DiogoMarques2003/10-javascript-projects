const apikey = "APIKEY";

const mainEL = document.getElementById('main');
const formEL = document.getElementById('form');
const searchEL = document.getElementById('search');

const APIurl = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByCity(city) {
    addWeatherToPage((await (await fetch(APIurl(city))).json()));
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

function addWeatherToPage(data) {
    if (!data || data.cod === '404') return alert('City not found');
    const temp = KtoC(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2> ${temp}°C <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}" /></h2>
        <small>${data.weather[0].main}</small>
    `;

    //cleanup
    mainEL.innerHTML = '';
    searchEL.value = '';

    mainEL.appendChild(weather);
}

formEL.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = searchEL.value;

    if (!city) return;

    getWeatherByCity(city);
});