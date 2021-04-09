// ADDING CHANGES TO LEARN ABOUT PULL REQUESTS FROM GITHUB


const path = require('path');
const express = require('express');
const hbs = require('hbs'); // for using partials
const getGeoCoordinates = require('./utils.js/geoCodes');
const getWeather = require('./utils.js/weatherInfo');

const app = express();

//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname,'../public'));

const publicDirectory = path.join(__dirname, '../public'); //using __dirname to get the absolute path
const viewPath = path.join(__dirname, '../customTemplates/views');
const partialsPath = path.join(__dirname, '../customTemplates/partials');

//#region 
//app.set('view engine','hbs'); // this will let us use files present in (views) folder automatically.
// expressJs by default links the view engine to folder named 'views'
//If we change the folder name to something else, then it won't work ... it will throw error
//So, if we want to change the 'views' folder name to something else then we 
// have to use app.set('views', viewPath);
//#endregion

app.set('view engine', 'hbs'); // setting up the template engine name
app.set('views', viewPath);
hbs.registerPartials(partialsPath); //registering location to access Partial files from

//To render static files as it is only then we should the below line
app.use(express.static(publicDirectory)); //using middleware function to render files

//EXPRESS.JS by default looks for index.html file to render at root location

// app.get('', (req, res)=>{ // '' means root location of our application
//     res.send('<h1>WELCOME</h1>');
// });

app.get('', (req, res) => {
    debugger;
    res.render('index', { //index is a view
        title: 'WEATHER',
        use: 'USAGE MAIN PAGE'
    });
});

app.get('/about', (req, res) => {
    debugger;
    res.render('about', {
        title: 'ABOUT PAGE',
        use: 'use as About handle'
    });
});

app.get('/help', (req, res) => {
    debugger;
    res.render('help', {
        title: 'HELP PAGE',
        use: 'USE As help',
        helpText: 'Helping message is here'
    });
});

app.get('/weather', (req, res) => {
    debugger;
    if (!req.query.address) {
        return res.send({
            error: 'missing address value in parameters'
        });
    }
    debugger;
    const { address } = req.query;

    getGeoCoordinates(address, (err, [lon, lat]  = []) => {
        debugger;
        if (err) {
            return res.send({
                error: err
            });
        }
        getWeather(lat, lon, (newErr, newData = {}) => {
            debugger;
            if (newErr) {
                return res.send({
                    error: newErr
                });
            }
            res.send({
                type: newData.type, temp: newData.temp, feels: newData.feels, place: newData.place, windspeed : newData.windspeed
            });
        });
    });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send([{
        name: 'Britania',
        category: 'Biscuits',
        price: 14
    }, {
        name: 'Dairy Milk',
        category: 'Choclate',
        price: 56
    }]);
});

app.get('/help/*', (req, res) => {
    debugger;
    res.render('error', {
        title: 'ERROR',
        errorMesage: 'help page not found'
    });
});


app.get('*', (req, res) => {
    debugger;
    res.render('error', {
        title: 'ERROR',
        errorMesage: '404'
    });
});


// app.get('/help', (req, res)=>{
//     res.send({
//         name:'helpPage',
//         val: 'helpPageValue'
//     });
// });

// app.get('/about', (req, res)=>{
//     res.send('<h1>ABOUT PAGE</h1>');
// });

const port = process.env.PORT || 3001; //As, of now value of (process.env.PORT) will be nothing in local so 
// we will use 3001 in local environment, but heroku will use (process.env.PORT) to serve our application
// on any port that is available for a particular time

app.listen(port, () => { //very imp method(listen) without this nothing will work
    console.log('Server is Started on port:'+ port);
});

