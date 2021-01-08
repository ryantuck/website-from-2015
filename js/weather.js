// weather.js

var weatherData = {};

$.getJSON( "https://api.forecast.io/forecast/227c5db2e377d4aace78c1038533de04/40.7127,-74.0059?callback=?",function(data){
	populateDivsWithWeatherData(data);
});

function populateDivsWithWeatherData(data) {
	console.log("weather data:");
  console.log(data.currently.summary); // use data as a generic object
  console.log(data.currently.temperature);
  console.log(data.daily.data[0].temperatureMin);
  console.log(data.daily.data[0].temperatureMax);
  console.log(data.hourly.data[1].temperature);
  var hd1 = data.hourly.data[1].time;
  var hd2 = data.hourly.data[2].time;
  var d1 = new Date(hd1*1000);
  var d2 = new Date(hd2*1000);
  console.log(hd1);
  console.log(d1);
  console.log(hd2);
  console.log(d2);

  // extract necessary weather data

  var now = {
  	"temp": data.currently.temperature,
  	"summary": data.currently.summary,
  	"time": data.currently.time
	};
	var today = {
		"high": data.daily.data[0].temperatureMax,
		"low": data.daily.data[0].temperatureMin
	};
	var hourly = [];

	for (var i=0;i<12;i++)
	{
		hData = {
			"time": data.hourly.data[i].time,
			"temp": data.hourly.data[i].temperature,
			"precip": data.hourly.data[i].precipProbability
		};
		hourly.push(hData);
	}

	weatherData = {
		"now": now,
		"today": today,
		"hourly": hourly
	};

	// set values in UI 

	$("#currentTemp").text(Math.round(weatherData.now.temp));
	
	$("#high").text(Math.round(weatherData.today.high));
	$("#low").text(Math.round(weatherData.today.low));

	var nowDate = new Date(weatherData.now.time*1000);
	var nowMonth = nowDate.getMonth() + 1;
	var nowDay = nowDate.getDate();
	$("#currentDay").text(nowMonth + "-" + nowDay);

	var nowHour24 = nowDate.getHours();
	var nowHour = nowHour24 % 12;
	if (nowHour == 0) {nowHour = 12;}
	var nowMin = nowDate.getMinutes();
	if (nowMin < 10) { nowMin = "0" + nowMin;}
	var nowHalf = "a";
	if (nowHour24 >= 12) {nowHalf = "p";}
	$("#currentTime").text(nowHour + ":" + nowMin);

	$("#currentSummary").text(weatherData.now.summary);


	$("#hour1Temp").text(Math.round(weatherData.hourly[0].temp) + " F");
	$("#hour1Precip").text(weatherData.hourly[0].precip + " %");

	var hourDate = new Date(weatherData.hourly[0].time * 1000);
	var hour = (hourDate.getHours() + 1) % 12;
	$("#hour1Time").text(hour);

	$('#hours12').children('.col-1-12').each(function (index,value) {

		// grab date
		var hourDate = new Date(weatherData.hourly[index].time * 1000);
		var hour24 = hourDate.getHours();

		// set am/pm
		var half = "a";
		if (hour24 >= 12) { half = "p"; }

		// get 'normal' time instead of military
		var hour = (hour24) % 12;
		if (hour == 0) { hour = 12; }

		// round precipitation data and hide if 0%
		var rain = Math.round(weatherData.hourly[index].precip);
		rainString = rain + " %";
		if (rain == 0) {rainString = ""};

		// set relevant elements with data
		$(this).find('.hourTemp').text(Math.round(weatherData.hourly[index].temp));
		$(this).find('.hourPrecip').text(rainString);
		$(this).find('.hourTime').text(Math.round(hour) + "" + half);

	});

};

