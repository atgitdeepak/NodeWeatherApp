const request = require('postman-request');

const getWeatherInfo = (lat, lon, subCallback) => {
    debugger;
    console.log(lat,lon);
    const url = "http://api.weatherstack.com/current?access_key=9aa5f139d98dbed3569d4c62b9919c66&query="+lat+","+lon;

    request({ url, json: true }, (err, response) => {
        //const data = JSON.parse(response.body); //as, we are using json:true, so no need to parse it explicitly
        //console.log(response.body.current);
        debugger;
        if (err) {
            //console.log(err, "error occurred");
            subCallback("error occurred");
        }
        else if (response.body.error) {
            //console.log(response.body.error.info);
            subCallback(response.body.error.info);
        }
        else {
            const weatherObj = response.body.current;
            // console.log(weatherObj.weather_descriptions[0] + ".It is currently " + weatherObj.temperature + " degrees out. It feels like " + weatherObj.feelslike
            //     + " degrees out.");
            const sendObj={type:weatherObj.weather_descriptions[0], temp:weatherObj.temperature, feels:weatherObj.feelslike,place:response.body.location.name,
                          windspeed:weatherObj.wind_speed};
            // subCallback(undefined, weatherObj.weather_descriptions[0] + ".It is currently " + weatherObj.temperature + " degrees out. It feels like " + weatherObj.feelslike
            // + " degrees out.");
            subCallback(undefined, sendObj);
        }
    });
}

module.exports = getWeatherInfo;