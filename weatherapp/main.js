let appId = 'c04eb0f26f53e758312acd943bee6dbb';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
  if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = 'zip';
  else;
    searchMethod = 'q';
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
    return result.json();
  }).then(result => {
    init(result);
  })
}

function init(resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url("img/clear.jpg")';
      break;

    case 'Clouds':
      document.body.style.backgroundImage = 'url("img/cloudy.jpg")';
      break;

    case 'Snow':
      document.body.style.backgroundImage = 'url("img/snow.jpg")';
      break;

    case 'Thunderstorm':
      document.body.style.backgroundImage = 'url("img/storm.jpg")';
      break;

    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = 'url("img/rain.jpg")';
      break;
  
    default:
      break;
  }

  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let temperatureElement = document.getElementById('temperature');
  let humidityElement = document.getElementById('humidity');
  let windspeedElement = document.getElementById('windspeed');
  let cityName = document.getElementById('cityName');
  let weatherIcon = document.getElementById('documentIconImg');
  
  let resultDescription = resultFromServer.weather[0].description;

  weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
  windspeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
  cityName.innerHTML = resultFromServer.name;
  humidityElement.innerHTML = resultFromServer.main.humidity + '%';
  
  weatherPosition();
}

function weatherPosition() {
  let weatherContainer = document.getElementById('weatherContainer');
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.4}px)`;
  weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchbtn').addEventListener('click', ()=> {
  let searchTerm = document.getElementById('searchInput').value;
  if(searchTerm)
    searchWeather(searchTerm);
})