

//set current date
// var setCurrentDate = function(){
//     var mainCity = $("#mainCity");
    
    

//     //formats date 
//     var currentDate = moment().format("M/DD/YYYY");
//     mainCity.text(`Austin (${currentDate})`);
//     for(var i = 1; i < 6; i++){
//         var currentDateEl = $(`#date${i}`).text(currentDate);
//         console.log();
//     }
// }

// setCurrentDate();

var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=30.266666&lon=-97.733330&exclude=hourly,minutely,alerts&units=imperial&appid=82f4d437a1c9a6f854f7caed74e5f0d9`
var geoapiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}`
var findCityName = function(cityName){
    
}
fetch(apiURL).then(function(response){
    return response.json()
})
.then(function(data){
    var fiveDaySection = $('#fiveDaySection');
    console.log(data);
    
     for(var i = 1; i < 6; i++){

        //Create a div
         var divEl = document.createElement('div');
         divEl.classList = "bg-primary col-2 me-3 p-1";
         fiveDaySection.append(divEl);
         //create h4
         var h4EL = document.createElement('h4');
         h4EL.setAttribute('id', `date${i}`);
         h4EL.textContent = "Austin";
         divEl.appendChild(h4EL);


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
})


