var long; 
var lat;

function getLocation() {
	var celsius = true;


	if(navigator.geolocation){

		navigator.geolocation.getCurrentPosition(function(position){

			long = position.coords.longitude;
			lat = position.coords.latitude;

			fetchWeather(celsius);

			$('#convert').click(() => {
				if(celsius == true) {
					$('#convert').html('View in celsius');
					celsius = false;
					fetchWeather(celsius);
				}else{
					$('#convert').html('View in Fahrenheit');
					celsius = true;
					fetchWeather(celsius);
				}
			});

		});

	}else{
		alert('Your Browser Does Not Support Geolocation. Please Use A Different Browser.');
	}
	
}

function fetchWeather(celsius) {

	$.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long, (json) => {
			console.log(json);
			$('#location').html(json.name + ", " + json.sys.country);

			if(celsius == true) {
				$('#temp').html(json.main.temp.toFixed(2) + "&deg;" + " C");
			}else{
				$('#temp').html((json.main.temp * 1.8 + 32).toFixed(2) + "&deg; F");
			}

			$('#icn').html("<img src=" + json.weather[0].icon + "</img>");
			
			$('#desc').html(json.weather[0].description);

		});

}

$(document).ready(() => {

	getLocation();

});