const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');



const updateUI = (data)=> {

      //  destructure properties 

      const {cityDets, weather} = data;

        // update details template
    details.innerHTML =`
    
    <div class="text-muted text-uppercase text-center details">
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  </div>
</div>
    
    `;

    // update the night/day & icon images 
    const iconSrc = `../img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc); 
    // update the night/day & icon images 

      let timeSrc = null;
      if (weather.IdDayTime) {
        timeSrc = 'img/day.svg';
        
      }else{
        timeSrc = 'img/night.svg';
      }
      time.setAttribute('src', timeSrc);

    // remove the d-none class if present
        if (card.classList.contains ('d-none')) {
            card.classList.remove('d-none');
            
        }
};


const UpDateCity =  async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return{ cityDets, weather };

}
cityForm.addEventListener('submit', e=> {
    e.preventDefault();
    // get city value 
    const city = cityForm.city.value.trim()
    cityForm.reset();

    // UpDate the ui with new city
    UpDateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err) );

    // set local storage
  localStorage.setItem('CurrentCity',city);


});

if(localStorage.getItem('CurrentCity')){
  UpDateCity(localStorage.getItem('CurrentCity'))
  .then(data => updateUI(data))
  .catch(err => console.log(err))
}