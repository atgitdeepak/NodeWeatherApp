//console.log('Client JS loaded');

// fetch('http://puzzle.mead.io/puzzle')
//     .then((res) => {
//         //debugger
//         return res.json();
//     }).then((res) => {
//         console.log(res);
//     }).catch((err) => {
//         debugger
//         console.log(err);
//     });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const paraIdOut_1 = document.querySelector('#output_1');
const paraIdOut_2 = document.querySelector('#output_2');



function getWeatherInfo(){
    //alert('click');
    const location = search.value;
    paraIdOut_1.textContent = 'Loading...';
    paraIdOut_2.textContent = '';
    fetchWeather(location);
}

const fetchWeather = (location) =>{
    //fetch(`http://localhost:3001/weather?address=${location}`).then((res) => {
    fetch(`/weather?address=${location}`).then((res) => { // we removed the previous part because then heroku won't
        debugger                                          // be able to access localhost:3001
        return res.json();
    }).then((data) => {
        //debugger
        if (data.error) {
            console.log(data.error);
            paraIdOut_1.textContent  = data.error;
        }
        else {
            console.log(data);
            paraIdOut_1.textContent  = `Temperature is ${data.temp}`;
            paraIdOut_2.textContent  = `Feels like  ${data.feels} and wind speed is ${data.windspeed}`;
        }
    }).catch((err) => {
        debugger
        console.log(err);
    });
}




// let str = '{"name":"vale"}';
// console.log(str);debugger
// console.log(JSON.parse(str));
// debugger
// console.log(JSON.parse(JSON.parse(str))); // will give error Unexpected token n in JSON at position 1 because
// JSON.parse(--obj--) here is parsing an object(JSON.parse(str)).
