var scriptsLoaded = 0;

document.addEventListener("DOMContentLoaded", function(){
  
  var css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", "css/main.css"); 
  //loads the CSS file and applies it to the page
  css.addEventListener("load", loadCount);
  document.querySelector("head").appendChild(css);

  var jq = document.createElement("script");
  jq.addEventListener("load", loadCount);
  jq.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
  document.querySelector("head").appendChild(jq);

});

function buildWidget(cls){
  //now do the ajax call then build your page
  $.ajax({
    type: "POST",
    url: "https://api.forecast.io/forecast/bd171a23740f4429ec7a894320062b73/45.348391,-75.757045?units=ca",
    success: gotData,
    dataType: 'jsonp'
  });
}

function gotData (data) {
  console.log (data);
  jData = data; 

  $("<table></table>").append('.mywidget').addClass("weatherTable");
  //Build table headings
  for (var k = 0; k < 24; k++) {
    var currentRow = $("<tr></tr>");
    //hourly time
    $("<td>Time: " + jData.hourly.data[k].time+"</td>").append(currentRow);
    $("<td>Humidity: "+Math.round(jData.hourly.data[k].humidity*100)+"%</td>").append(currentRow);
    $("<td>cloudCover: " + Math.round(jData.hourly.data[k].cloudCover*100) +"%</td>").append(currentRow);
    $("<td>temperature: " + jData.hourly.data[k].temperature +"</td>").append(currentRow);
    $("<td>windSpeed: " + jData.hourly.data[k].windSpeed +" Km/h</td>").append(currentRow);
    $("<td>summary: " + jData.hourly.data[k].summary +"</td>").append(currentRow);
    $('.mywidget').html("Current Conditions for today: " + jData.hourly.data[k].summary);
     currentRow.appendTo(".weatherTable");
  } 

 switch (data.icon) {
    case 0:
        icon = "clear-day";
        break;
    case 1:
        icon = "clear-night";
        break;
    case 2:
        icon = "fog";
        break;
    case 3:
        icon = "hail";
        break;
    case 4:
        icon = "partly-cloudy-day";
        break;
    case 5:
        icon = "partly-cloudy-night";
        break;
    case 6:
        icon = "rain";
        break;
    case 7:
        icon = "sleet";
        break;
    case 8:
        icon = "snow";
        break;
    case 9:
        icon = "thunderstorms";
        break;
    case 10:
        icon = "tornado";
        break;
    case 11:
        icon = "wind";
        break;
  } 
}

function loadCount(){
  scriptsLoaded++;
    if(scriptsLoaded === 2){
      //call the function in My widget script to load the JSON and build the widget
      buildWidget(".mywidget");
      console.log("both scripts loaded");
    }
}