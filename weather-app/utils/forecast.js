const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9e22a7893483b7496c974f7e29b2fe0d&query=${latitude},${longitude}&units=f`;

    request(url, { json: true }, (error, { body }) => {
        if (error) {
            callback('Error connecting to the weather data server.', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, `It's currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% of rain.`);
        }
    });
};

module.exports = forecast;