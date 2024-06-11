const geocode = (address, callback) =>{
    setTimeout(()=>{
        const data = {
            latitude:0,
            longitude:0
        }
        //callback('An error occurred',data)
        callback (undefined, data)
    },5000)
}

geocode ('Delhi', (error, data)=>{
    if (error){
       return console.log(`error ${error}`)
    }
    console.log(data)
})