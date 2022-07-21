const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

// const openweatherEndPoint = "https://api.openweathermap.org/data/2.5/onecall?lat=12.9767936&lon=77.590082&units=metric&appid=dbf52ad569ef2bb1377fa1f9422ad938&exclude=minutely,hourly,daily";



// The homepage
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Get weather data post call route
app.post("/getWeather", (req, res) => {

    const geoCodingEndPoint = "https://api.openweathermap.org/geo/1.0/direct?";
    const openweatherEndPoint = "https://api.openweathermap.org/data/2.5/onecall?";
    const apiId = "dbf52ad569ef2bb1377fa1f9422ad938";

    // Get tha latitude and longitude of the city

})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});

