// First thing would be to pull weather API for the search button
// Also the listing of other cities as example, maybe surrounding cities for the user

// Search other cities:
// helpful URLs : https://www.spatialtimes.com/2019/01/Create-a-JavaScript-Weather-App-with-Location-Data-Part-1/

var searchInputEl = $("searchInputForm")

searchInputEl.on("click", function(event){
  event.preventDefault();

  if(event.target.matches("button") === true){
      
      obtainTodaysWeather();
    
  }
})

function obtainTodaysWeather() {

  var searchVal = $("#search").val()

  console.log(searchVal)

  var todaysWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&APPID=587a792429cdd4dc38bfcdb8e2d942c9"


  $.ajax({
    url: todaysWeatherURL,
    method: 'GET'
  }).then(function (response) {

    console.log(response)

    var iconcode = response.weather[0].icon
    console.log(iconcode)

    var currentWeatherIcon = "http://openweathermap.org/img/w/" + iconcode + ".png";

    var currentWeatherIconEl = $("<img>");
    currentWeatherIconEl.attr('src', currentWeatherIcon)
    // currentWeatherIconEl.attr('id', "iconPic")




    $("#currentCity").text(response.name);
    $("#currentTempature").text("Temperature: " + response.main.temp + "°F");
    $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
    $("#currentWindSpeed").text("Wind Speed: " + response.wind.speed + "MPH");


    var newCityButton = $("<button>")
    newCityButton.val(response.name)
    newCityButton.text(response.name)

    var listEl = $("<li>")
    listEl.append(newCityButton)

    $("#cityList").append(listEl)
  })

}


/*    
$("#search").on("click", function(event){
  event.preventDefault();

  // Here we grab the text from the input box
  var cityInput = $(".cityInput").val();

  // Here we construct our URL
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=${CONSTANTS.appId}&appid=587a792429cdd4dc38bfcdb8e2d942c9&units=imperial" 
  + cityInput;

  // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
  // and display it in the div with an id of movie-view

  // ------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#cityName").text(JSON.stringify(response));
  });





  /* let cityName = $("#cityName").val();
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=${CONSTANTS.appId}`;

  $.getJSON(apiCall, weatherData => {
    let cityName = weatherData.name;
    let countryName = weatherData.sys.country;
    let description = weatherData.weather[0].description;
    let tempMin = weatherData.main.temp_min;
    let tempMax = weatherData.main.temp_max;
    $("#city").text(cityName);
    $("#detail").text(description);
    $("#country").text(countryName);
    $("#mintemp").html(`Minimum: ${tempMin}<span>&#8451;</span>`);
    $("#maxtemp").html(`Maximum: ${tempMax}<span>&#8451;</span>`);

  }).fail(() => {
    alert("City doesn't Exist!!");
    $("#cityName").val("");
    $("#city").text("");
    $("#detail").text("");
    $("#country").text("");
    $("#mintemp").html("");
    $("#maxtemp").html("");
  }); 
  

});
*/



// Current location and weather
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=houston&appid=587a792429cdd4dc38bfcdb8e2d942c9&units=imperial" 

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temperature (F) " + response.main.temp);

      // Converts the temp to Kelvin with the below formula
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $(".tempF").text("Temperature (Kelvin) " + tempF);

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    });



// 5 day forecast example
// example from url: https://stackoverflow.com/questions/49640174/building-a-5-day-forecast-using-open-weather-api-ajax-and-js

/*

var key = "YOUR KEY";
var city = "YOUR CITY"; // My test case was "London"
var url = "https://api.openweathermap.org/data/2.5/forecast";

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


