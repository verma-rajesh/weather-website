const request = require('request');


const forecast = (lat , lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c2dfd53cd965421e6d6d5eb338e55a7a`;
    
    request({url : url, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect, Check your network connection!', undefined);
        }
        else if(response.body.cod === '400'){
            callback('Unable to find location', undefined);
        }
        else{
            callback(undefined,`It is currently ${response.body.main.temp} degrees out. And ${response.body.weather[0].description}`);
        }
    })
}

module.exports = forecast;