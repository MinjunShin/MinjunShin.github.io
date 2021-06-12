const COORDS = 'coords';
const API_KEYS = 'e93ed1913d3cf34943250b0527939a8f';
const weather = document.querySelector(".js-weather");

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json){
        const temparature = json.main.temp;
        const temp_Feel = json.main.feels_like;
        const place = json.name;
        weather.innerText = `현재온도 : ${temparature} 체감온도 : ${temp_Feel} 위치 : ${place}`;
    });

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        //get weather
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();