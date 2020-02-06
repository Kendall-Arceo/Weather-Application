// First thing would be to pull weather API for the search button
// Also the listing of other cities as example, maybe surrounding cities for the user



var searchInputEl = $("#searchInputForm")

searchInputEl.on("click", function(event){
  console.log(event)
  event.preventDefault();

  if(event.target.matches("button") === true){
      
    obtainTodaysWeather();
  }

})

function obtainTodaysWeather() {

  event.preventDefault();
  var searchVal = $("#search").val()


  var queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&appid=587a792429cdd4dc38bfcdb8e2d942c9&units=imperial";


  $.ajax({
    url: queryWeatherURL,
    method: 'GET'
  }).then(function (response) {

    console.log(response)

    var iconcode = response.weather[0].icon
    console.log(iconcode)

    var currentWeatherIcon = "https://openweathermap.org/img/w/" + iconcode + ".png";

    var currentWeatherIconEl = $("<img>");
    currentWeatherIconEl.attr('src', currentWeatherIcon)


    $("#currentCity").text(response.name);
    $("#currentTempature").text("Temperature: " + response.main.temp + "°F");
    $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
    $("#currentWindSpeed").text("Wind Speed: " + response.wind.speed + "MPH");

    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);

    var newCityButton = $("<button>")
    newCityButton.val(response.name)
    newCityButton.text(response.name)

    var listEl = $("<li>")
    listEl.append(newCityButton)

    $("#cityList").append(listEl)

    var uvIndexLat = response.coord.lat
    var uvIndexLon = response.coord.lon
    var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=84df449c8c088263e2e354a1926ed25a&lat=" + uvIndexLat + "&lon=" + uvIndexLon + "&cnt=5";
    
    
    $.ajax({
        url: uvIndexURL,
        method: 'GET'
    }).then(function(uvResponse){
        $("#currentUVIndex").text("UV Index: " + uvResponse.value);
    })
  })

    
}

//Start of 5 day forecast
var city = "houston"; 
var url = "https://api.openweathermap.org/data/2.5/forecast" + searchVal + "&appid=587a792429cdd4dc38bfcdb8e2d942c9&mode=xml";

$.ajax({
  url: url, //API Call
  dataType: "json",
  type: "GET",
  data: {
    q: city,
    appid: key,
    units: "metric",
    cnt: "10"
  },
  success: function(data) {
    console.log('Received data:', data) // For testing
    var wf = "";
    wf += "<h2>" + data.city.name + "</h2>"; // City (displays once)
    $.each(data.list, function(index, val) {
      wf += "<p>" // Opening paragraph tag
      wf += "<b>Day " + index + "</b>: " // Day
      wf += val.main.temp + "&degC" // Temperature
      wf += "<span> | " + val.weather[0].description + "</span>"; // Description
      wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
      wf += "</p>" // Closing paragraph tag
    });
    $("#showWeatherForcast").html(wf);
  }
});

