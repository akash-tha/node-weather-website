const request = require('request')

const forecast = (latitude, longitude, callback) => {

    url = 'http://api.weatherstack.com/current?access_key=77c7352d0b647a657f35131ab0bd8ab6&query='+latitude+','+longitude+'&units=f'

request({url, json: true}, (error, {body}) => {
    if (error) {
        callback('unable to connect to weather service', undefined) 
    } 
    else if (body.error) {    
        callback(body.error.info, undefined)    
    } else {
        if(body.current.temperature===body.current.feelslike){
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+ body.current.temperature +' degrees out. There is '+ body.current.precip+'% chance of rain.')
        }else{
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+ body.current.temperature +' degrees out, due to wind it feels like '+ body.current.feelslike +' degrees out. There is '+ body.current.precip+'% chance of rain.')
        }
    }      
  })    
}

module.exports = forecast
