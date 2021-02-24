const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Kundan"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kundan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: "Help",
        name: "Kundan"
    })
})

app.get('/weather', (req, res) => {
    address = req.query.address
    if(!address){
        return res.send({
            error: 'Please provide address'
        })
    }

    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404' ,{
        title: '404',
        name: 'Kundan',
        errorText: 'Help Article not Found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Kundan',
        errorText: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})