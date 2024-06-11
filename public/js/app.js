console.log('client side js has loaded')


const weatherForm = document.querySelector('#weatherForm')
const geocodeForm = document.querySelector('#geocodeForm')
const searchWeather = document.querySelector('#weatherFormInput')
const searchGeocode = document.querySelector('#geocodeFormInput')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

console.log(weatherForm)

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const searchLocation = searchWeather.value
    console.log('Address: '+searchLocation)

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    fetch('/weather?address='+searchLocation).then((response)=> {
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
            
        }else{
            console.log('Latitude: '+ data.latitude+', Longitude: '+ data.longitude)
            console.log('Location: '+data.location)
            console.log('Forecast: '+data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast   
        }     
    })
})
})

geocodeForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchLocation = searchGeocode.value;

    console.log('evaluating geocode..',searchLocation)
    fetch('/geocode?location='+searchLocation).then(response=>{    
        response.json().then((data)=>{
            if (data.error) {
                console.error(data.error)
            } else {
                messageThree.textContent = `Location: ${data.location}, Latitude: ${data.latitude}, Longitude: ${data.longitude}`
                console.log(data)
            }
        })
    })
})