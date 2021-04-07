const request = require('postman-request');

const getCoordinates = (place, callback) => {
    debugger;
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(place) + ".json?limit=1&access_token=pk.eyJ1IjoiZGVlcGFrLTEyIiwiYSI6ImNrbjV1emdldzA3d2oyb2xncmJyMHEzOW4ifQ.MFU7By_i0NQTi04kURl6vA";
    request({ url, json: true }, (err, response) => {
        debugger;
        if (err) {
            //console.log(err, "Error Occurred");
            callback(err);
        }
        else if (response.body.message) {
            //console.log(response.body.message);
            callback(response.body.message);
        }
        else if (response.body.features.length == 0) {
            //console.log("Location is not found");
            callback("Location is not found");
        }
        else {
            let result = response.body.features[0];

            console.log("Place Name: " + result.place_name);
             
            console.log("latitude: " + result.center[1]);
            console.log("longitude: " + result.center[0]);

            //console.log(callback, "callback Function");
            debugger;
            callback(undefined, result.center);

        }
    });
}

module.exports = getCoordinates;
