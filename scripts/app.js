
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.detail');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
    // destructuring properties 
    console.log(data);
    const {cityDets, weather} = data;
    // update UI details 
    details.innerHTML = `
    <p class="city-name">${cityDets.EnglishName}</p>  
    <p class="weather-condition">${weather.WeatherText}</p>

    <div class="temp">
         <div>
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
         <div>
            <span>${(weather.Temperature.Metric.Value + 273.15).toFixed(2)}</span>
            <span>K</span>
        </div>
    </div>     
    `;
// remove the no-display class
if(card.classList.contains('no-display')){
    card.classList.remove('no-display');
}

// update night and day 
let timeSrc = null;
if(weather.IsDayTime){
    timeSrc = 'img/day.svg';

}else {
    timeSrc = 'img/night.svg';

}
time.setAttribute('src', timeSrc);

// update weather icon 
const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
icon.setAttribute('src', iconSrc);
};

 
const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather};
};
 cityForm.addEventListener('submit', e => {
    // prevent default actions 
    e.preventDefault();
    // get city value 
    const city = cityForm.city.value.trim();
    cityForm.reset();
    // update city ui 
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
 })