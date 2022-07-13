console.log('client side js has loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const searchLocation = search.value
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