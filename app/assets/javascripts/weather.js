$(function() {
    /* Configuration */
    var DEG = 'f'; // c for celsius, f for fahrenheit

    var weatherDiv = $('#weather'),
        scroller = $('#scroller'),
        location = $('p.location');

    // Does this browser support geolocation?
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    } else {
        showError("Your browser does not support Geolocation!");
    }

    // Get user's location, and use OpenWeatherMap
    // to get the location name and weather forecast

    function locationSuccess(position) {

        var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude +
            '&lon=' + position.coords.longitude

        $.getJSON(weatherAPI, function(response) {
            JSON.stringify({
                data: response
            });

            var city = response.name
            var icon = response.weather[0].icon
            var condition = response.weather[0].description
            var currentTemperature = convertTemperature(response.main.temp) + '°'
            var tempMin = convertTemperature(response.main.temp_min) + '°'
            var tempMax = convertTemperature(response.main.temp_max) + '°'

            addWeather(
                icon,
                city,
                currentTemperature,
                tempMin,
                tempMax,
                condition
            );
        });
    }

    function addWeather(icon, city, currentTemperature, tempMin, tempMax, conditioncurrcondition) {

        var markup = '' +
            '<div id= \"weather-icon\" class=\"pull-left weather-info\">' +
                '<img id= \"weather-icon\" src="../assets/icons/' + icon + '.png" />' +
            '</div>' +
            '<div id= \"temperature\" class=\"pull-right weather-info\">' +
                '<h1 class=\"temperatureInfo\">' + currentTemperature + '</h1>' +
            '</div>';

        scroller.append(markup);
        $('#widget-box-weather').css({
            'backgroundColor' : 'black',
            'backgroundImage': 'url("../assets/background-images/' + icon +'.jpg")',
            'backgroundRepeat': 'no-repeat',
            'backgroundSize': '100% 100%'
        });
    }

    /* Error handling functions */

    function locationError(error) {
        switch (error.code) {
            case error.TIMEOUT:
                showError("A timeout occured! Please try again!");
                break;
            case error.POSITION_UNAVAILABLE:
                showError('We can\'t detect your location. Sorry!');
                break;
            case error.PERMISSION_DENIED:
                showError('Please allow geolocation access for this to work.');
                break;
            case error.UNKNOWN_ERROR:
                showError('An unknown error occured!');
                break;
        }
    }

    function convertTemperature(kelvin) {
        // Convert the temperature to either Celsius or Fahrenheit:
        return Math.round(DEG == 'c' ? (kelvin - 273.15) : (kelvin * 9 / 5 - 459.67));
    }

    function showError(msg) {
        weatherDiv.addClass('error').html(msg);
    }
});
