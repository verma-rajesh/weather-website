const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utilis/geocode');
const forecast = require('./utilis/forecast');

const app = express();

const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rajesh Verma'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rajesh Verma'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rajesh Verma'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide your address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location: location,
                forecastData: forecastData,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rajesh Verma',
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rajesh Verma',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`server is started at port : ${port}`);
})