const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Denver', (error, data) => {
    console.log('Error: ', error);
    console.log('Data: ', data);
});

forecast(-104.9653, 39.7348, (error, data) => {
    console.log('Error: ', error);
    console.log('Data: ', data);
});