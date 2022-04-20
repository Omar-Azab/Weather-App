
var search = document.getElementById("search"),
    today1 = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    location1 = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    firstDesc = document.getElementById("first-desc"),
    umberella1 = document.getElementById("umberella"),
    wind1 = document.getElementById("wind"),
    compass1 = document.getElementById("compass");

var    nextDay = document.getElementsByClassName("next-day");
var    nextDayIcon = document.getElementsByClassName("nextDay-icon");
var    maxDegree = document.getElementsByClassName("max-degree");
var    minDegree = document.getElementsByClassName("min-degree");
var    nextDesc = document.getElementsByClassName("next-desc");

 var apiResponse,
     currentCity = "cairo",
     responseData;

monthName = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];
days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","friday","Saturday"];

async function getWeatherData(){
     apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=436113e51d854a318bb235658220302&q=${currentCity}07112&days=7`)
     responseData = await apiResponse.json()
    console.log(responseData);
    displayToday();
    displayNextDay();
}
getWeatherData()

function displayToday(){
    var data = new Date();
    today1.innerHTML = days[data.getDay()];  
    todayDate.innerHTML = `${data.getDate()} ${monthName[data.getMonth()]}`;
    location1.innerHTML = responseData.location.name;
    todayDegree.innerHTML = responseData.current.temp_c;
    todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`); 
    firstDesc.innerHTML = responseData.current.condition.text;
    umberella1.innerHTML = responseData.current.wind_mph;
    wind1.innerHTML = responseData.current.wind_kph;
    compass1.innerHTML = responseData.current.wind_dir;
}

function displayNextDay(){
    for ( var i = 0 ; i < nextDay.length ; i++)
    {
        nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;
        nextDesc[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text;
    }
}

search.addEventListener("keyup",function(){
    currentCity = search.value
    getWeatherData()
})

