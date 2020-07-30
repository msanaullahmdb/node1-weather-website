const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4836cebccfe0f687a449249b1070451f&query=' + latitude + ',' + longitude + '&units=f'

    request({url: url, json:true}, (error, response) => {
        if(error){
            callback('Can\'t Reach to weather service!', undefined)
        } else if(response.body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + response.body.current.temperature + ' degree out. It feels like ' + response.body.current.feelslike + ' out')
        }
    })
}

module.exports = forecast