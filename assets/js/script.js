var currentCity = "";
var mainCity = $("#mainCity");
var currentDate = moment().format("M/DD/YYYY");


//set current date
 var setCurrentDate = function(){
     
    
    

     //formats date 
     
     
     for(var i = 1; i < 6; i++){
         var currentDateEl = $(`#date${i}`).text(currentDate);
        console.log();
     }
 }

 setCurrentDate();



var findCityName = function(cityName){
    var geoapiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=82f4d437a1c9a6f854f7caed74e5f0d9`
    fetch(geoapiUrl).then(function(response){
        return response.json()
    })
    .then(function(data){


         
         var myLat = data[0].lat.toString();
         var myLon = data[0].lon.toString();
         currentCity = data[0].name;

        return findWeather(myLat,myLon);
        

    })
    

}
var findWeather = function(myLat, myLon){


    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${myLat}&lon=${myLon}&exclude=hourly,minutely,alerts&units=imperial&appid=82f4d437a1c9a6f854f7caed74e5f0d9`
    
    
    fetch(apiURL).then(function(response){
    return response.json()
})
.then(function(data){

    var fiveDaySection = $('#fiveDaySection');
    fiveDaySection.html("");
    var currentTemp = $('#currentTemp');
    var currentWind = $('#currentWind');
    var currentHumidity = $('#currentHumidity');
    var currentUV = $('#currentUV');
    currentTemp.text(`Temp: ${Math.round(data.current.temp)} F°`);
    currentWind.text(` Wind Speed: ${Math.round(data.daily[0].wind_speed)} MPH`);
    currentHumidity.text(`Humidity: ${Math.round(data.current.humidity)} %`);
    currentUV.text(`UV Index: ${data.current.uvi}`);
    
    
    
    
     for(var i = 1; i < 6; i++){
         var dateForCity = moment().add(i, "days").format("M/DD/YYYY");
         var imgId = data.daily[i].weather[0].icon;
         var pngLink = `http://openweathermap.org/img/wn/${imgId}@2x.png`
         
        
         
         

         

        //Create a div
         var divEl = document.createElement('div');
         divEl.classList = "bg-primary col-2 me-3 p-1";
         fiveDaySection.append(divEl);
         //create h4
         var h4EL = document.createElement('h4');
         h4EL.setAttribute('id', `date${i}`);
         h4EL.textContent = dateForCity;
         divEl.appendChild(h4EL);
         var imgEl = document.createElement('img');
         imgEl.setAttribute("src",pngLink);
         imgEl.setAttribute("alt", "small icon showing current weather conditions");
         divEl.appendChild(imgEl);


         var ulEl = document.createElement('ul');
         ulEl.classList="listStyle";
         divEl.appendChild(ulEl);
         
         

         var liEl = document.createElement('li');
             liEl.textContent = `Temp: ${Math.round(data.daily[i].temp.max)} F°`
         var liEl2 = document.createElement('li');
             liEl2.textContent = `Wind Speed: ${Math.round(data.daily[i].wind_speed)} MPH`
         var liEl3 = document.createElement('li');
             liEl3.textContent = `Humidity: ${Math.round(data.daily[i].humidity)}%`

         ulEl.appendChild(liEl);
         ulEl.appendChild(liEl2);
         ulEl.appendChild(liEl3);
         



    }
    imgId = data.daily[0].weather[0].icon;
    var imgEL2= document.createElement("img");
    imgEL2.setAttribute("src", pngLink);
    imgEL2.setAttribute("alt","image depicting current weather conditions");
    var currentDayWeather = $('.currentDayWeather');
    currentDayWeather.html("");
    currentDayWeather.append(imgEL2);
   

    mainCity.text(`${currentCity} ${currentDate}` );
})
}

$('#user-form').submit(function(event){
    
    var citytext = $('#city').val();
    findCityName(citytext.trim());
    $('#city').val("");
    event.preventDefault();
    
})



