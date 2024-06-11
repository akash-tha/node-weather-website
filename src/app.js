const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000


//Define paths for Express config
const PubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(PubDirPath))


app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Akash'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Akash'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        name: 'Akash',
        title: 'Help',
        example: 'Help example'
    })
})

app.get('/weather', (req, res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error: "Please provide an address !"})
    }
    geocode (address, (error, {latitude, longitude, location} = {})=> {
        if (error) {
            return  res.send({ error })
        }
     forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address,
                latitude,
                longitude
        
            }) 
          })
    })
})

app.get('/geocode', (req,res)=>{
    const address = req.query.location;
    if(!address){
        return res.send({error})
    }
    console.log('evaluating geocode at server end..')
    geocode(address, (error, {latitude, longitude, location})=>{
        if(error){
           return res.send('Error', error)
        }
       
        res.send ({
            location,
            latitude,
            longitude
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Akash'

    })
})
app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        errorMsg: 'Page not found here',
        name: 'Akash'
    })
})

app.listen(port, () =>{
    console.log('server is up and running on port '+ port)
})
