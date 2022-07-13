const request = require('request')

const geocode = (address, callback) => {

    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWthc2h0aGEiLCJhIjoiY2tkZTgwMXJsNDY2czJxcXZ2bGZtZTZzbyJ9.wRQ0VuKjvkizuI5aMyl8_w'
 
 request({url, json: true}, (error, {body}) => {
     if (error) {
         callback ('unable to connect to Geo service', undefined)
     } else if (body.message) {
         callback (body.message, undefined)
     } else if (body.features.length==0) {
         callback('Unable to find the location. Try another search.', undefined)
     } 
     else{
         callback(undefined, {
             latitude: body.features[0].center[0],
             longitude: body.features[0].center[1],
             location: body.features[0].place_name
         })
     }   
 })
 }

 module.exports = geocode