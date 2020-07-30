const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXNhbmF1bGxhaDk5MSIsImEiOiJja2N3YmV2dXIwY2huMnpzMXA5M3p6NDYxIn0.fpCrW4xuN-Ou90aKpdoMTg'

    request({url: url, json:true}, (error,response) => {
        if(error){
            callback('Can\'t reach to geocoding', undefined)
        } else if(response.body.features.length === 0){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,{latitude:response.body.features[0].center[1],longitude:response.body.features[0].center[0],location: response.body.features[0].place_name})
        }
    })
}

module.exports = geocode