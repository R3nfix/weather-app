'use strict';

const btnEl = document.querySelector('[data-js-get-weather]');
const weatherApp = document.querySelector('[data-js-weather]');
const inputCity = document.querySelector('[data-js-city]');
const errorMessage = document.querySelector('[data-js-error-message]');

async function getWeather() {
    const city = inputCity.value;

    const apiKey = 'YOUR-API-KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        if (data.cod === 404 || data.cod === "404") {
            weatherApp.innerHTML = `
                <h2 style="font-size: 70px; text-align: center; margin-top: -250px; color: #fff;">404</h2>
                 <p style="text-align: center; font-size: 25px; color: #fff;"><b>Не удалось обработать ваш запрос. Попробуйте еще раз.</b></p>
            `;

            return;
        }
        
        if (city === '') {
            errorMessage.classList.remove('hide');
        } else {
            errorMessage.classList.add('hide');
        }

        let img = '';

        switch (data.weather[0].main) {
            case 'Atmosphere':
                img = './img/atmosphere.svg';
                break;
            case 'Clear':
                img = './img/clear.svg';
                break;
            case 'Clouds':
                img = './img/clouds.svg';
                break;
            case 'Drizzle':
                img = './img/drizzle.svg';
                break;
            case 'Rain':
                img = './img/rain.svg';
                break;
            case 'Snow':
                img = './img/snow.svg';
                break;
            case 'Thunderstorm':
                img = './img/thunderstorm.svg';
                break;
        }

        weatherApp.innerHTML = `

        <h2 style="margin-top: -300px; font-size: 70px; color: #fff;">${data.name}</h2>

        <p style="text-align: center; font-size: 50px; padding-top: 15px; color: #fff;"><b>${Math.round(data.main.temp)}°C</b></p>

        <img src="${img}" style="filter: invert(1) brightness(2); margin-top: -15px;" width="200" height="auto">

        <p style="text-align: center; font-size: 30px; color: #fff;">${data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)}</p>
        `;

    } catch (error) {
        console.dir('error' + error);
    }

}

btnEl.addEventListener('click', getWeather);