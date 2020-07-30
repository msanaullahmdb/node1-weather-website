
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')

app.set('views', viewpath)

app.use(express.static(publicPath))

hbs.registerPartials(partialPath)

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        createdBy: 'sana'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(data.latitude, data.longitude, (error, weatherinfo) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: data.location,
                description: weatherinfo
            })
        })
    
    
    })


})


app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        createdBy: 'sana'
    })
})

app.listen(port, () => {
    console.log('Server has started at port ' + port)
})






