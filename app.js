const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// const openweatherEndPoint = "https://api.openweathermap.org/data/2.5/onecall?lat=12.9767936&lon=77.590082&units=metric&appid=dbf52ad569ef2bb1377fa1f9422ad938&exclude=minutely,hourly,daily";



// The homepage
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// POST request for fetching the weather data
app.post("/getWeather", (req, res) => {

    let geoCodingEndPoint = "https://api.openweathermap.org/geo/1.0/direct?";
    let openweatherEndPoint = "https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=minutely,hourly,daily&";
    const appiId = "dbf52ad569ef2bb1377fa1f9422ad938";

    // First we need to get the latitude and longitude data of the city
    let cityName = req.body.cityName;
    geoCodingEndPoint = geoCodingEndPoint + "q=" + cityName + "&&appid=" +  appiId;
    https.get(geoCodingEndPoint, (response) => {

        response.on("data", (d) => {
            let geoData = JSON.parse(d);

            // If the geocoding API returns an empty array, it means the city name entered is invalid.
            if (geoData.length === 0) {
                res.write("<h1>Invalid City/Place name provided: " + cityName + "</h1>" +
                        "<hr>");
                res.send();
            } else {

                // Get the weather data using latitude and longitude data
                let latitude = geoData[0].lat;
                let longitude = geoData[0].lon;

                openweatherEndPoint = openweatherEndPoint + "lat=" + latitude + "&lon=" + longitude + "&&appid=" +  appiId;
                https.get(openweatherEndPoint, (response) => {

                    response.on("data", (d) => {
                        let weatherData = JSON.parse(d);
                        let temp = weatherData.current.temp;
                        let desc = weatherData.current.weather[0].description;
                        let icon = weatherData.current.weather[0].icon;
                        let iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
                        console.log(iconUrl);

                        res.write("<h1>Weather data for " + cityName + "</h1>" +
                            "<hr>");
                        res.write("<p>The temperature in " + cityName + " is " + temp + " degree celcius with " + desc + "</p>")
                        res.write("<img alt=\"Cloud Image\" src=" + iconUrl + ">")
                        res.send();
                    })

                }).on("error", (e) => {
                    console.error("There was an error: ", e);
                })

            }

        });


    }).on("error", (e) => {
        console.error("There was an error: ", e);
    });

});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});

