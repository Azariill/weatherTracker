var currentCity = "";
var mainCity = $("#mainCity");
var currentDate = moment().format("M/DD/YYYY");
var searchHistory = [];

var findCityName = function(cityName){
    var geoapiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=fb17d9175b8f6b9a793c871f4b1c24dd`
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


    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${myLat}&lon=${myLon}&exclude=hourly,minutely,alerts&units=imperial&appid=fb17d9175b8f6b9a793c871f4b1c24dd`
    
    
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
    var uvIndex = Math.round(data.current.uvi);
    var uvIndexStyle = "favorable";


    if(uvIndex >= 2 && uvIndex < 8){
        uvIndexStyle ="moderate";

    }
    else if( uvIndex >= 8){
        uvIndexStyle = "severe";
    }
    else{
        uvIndexStyle = uvIndexStyle;
    }
    currentTemp.text(`Temp: ${Math.round(data.current.temp)} F°`);
    currentWind.text(` Wind Speed: ${Math.round(data.daily[0].wind_speed)} MPH`);
    currentHumidity.text(`Humidity: ${Math.round(data.current.humidity)} %`);
    currentUV.html(`UV Index: <span class="${uvIndexStyle}"> ${uvIndex}</span>`);
    
    
    
    
     for(var i = 1; i < 6; i++){
         var dateForCity = moment().add(i, "days").format("M/DD/YYYY");
         var imgId = data.daily[i].weather[0].icon;
         var pngLink = `http://openweathermap.org/img/wn/${imgId}@2x.png`
         
        
         
         

         

        //Create a div
         var divEl = document.createElement('div');
         divEl.classList = "forecastContainer col-md-12 col-lg-2 me-3 p-1";
         fiveDaySection.append(divEl);
         //create h4
         var h4EL = document.createElement('h4');
         h4EL.setAttribute('id', `date${i}`);
         h4EL.textContent = dateForCity;
         divEl.appendChild(h4EL);
         var imgEl = document.createElement('img');
         imgEl.setAttribute("id", "pngImg");
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

var addToHistory = function(citytext){
    
    var cityButtons = $('#cityButtons');
    cityButtons.html("");
    

    if(searchHistory.length < 6 && citytext){
        
        
        searchHistory.unshift(citytext);
        
    }
    else if(searchHistory.length === 6){
        searchHistory.pop();
        searchHistory[1] = searchHistory[0];
        searchHistory[0] = citytext;
        
        
        
    }
    else{
        return;
    }
   

    if(searchHistory.length > 0){
        for(var i = 0; i < searchHistory.length; i++){
            

        
        
        var btnEl = $("<div>").addClass("btn btn-info mt-3");
        btnEl.attr('id', "cityBtns");
        btnEl.text(searchHistory[i]);
        
        cityButtons.append(btnEl);


    }
    
    saveBtns();
}

}

var saveCity = function(citytext){
    var savedCity = localStorage.setItem("city-text", JSON.stringify(citytext));

}

var saveBtns = function(){
    if(searchHistory.length >= 0){

        for(var i = 0; i < searchHistory.length; i++)
             localStorage.setItem(`btn${i}`, JSON.stringify(searchHistory[i]));
    }
}

var loadSavedItems = function(){
    var savedCity = localStorage.getItem("city-text");
    savedCity = JSON.parse(savedCity);
    var savedBtnArray = localStorage.getItem("btn0");
    savedBtnArray = JSON.parse(savedBtnArray);
    

    if(savedBtnArray){
        addToHistory(savedBtnArray);
        

        // Check for more buttons
        for(var i = 1; i < 6 ; i++){
            savedBtnArray = localStorage.getItem(`btn${i}`);
            if(savedBtnArray){
                savedBtnArray = JSON.parse(savedBtnArray);
                addToHistory(savedBtnArray);
            }
           
        }
    }



    if(savedCity){
            findCityName(savedCity);
            
      
     
    }
    else{
        return false;
    }

    console.log(savedCity);
}

$('#user-form').submit(function(event){
    
    var citytext = $('#city').val();
    saveCity(citytext.trim());
    addToHistory(citytext.trim());
    findCityName(citytext.trim());
    $('#city').val("");
    event.preventDefault();
    
})
$('#cityButtons').click(function(event){
    var event = event.target;
    
    var citytext = event.textContent;
    findCityName(citytext);
    




})


loadSavedItems();

