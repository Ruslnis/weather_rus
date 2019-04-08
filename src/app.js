const path = require("path")
const express = require('express')
const hbs = require("hbs")
const app = express()
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const port = process.env.PORT || 3000

// DEfine paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
// Setup hbs engine and views location 
app.use(express.static(publicDirectoryPath))
// Setup static dir
app.set("view engine","hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)
app.get("",(req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Ruslan"
    })
})




app.get("/about",(req, res)=> {
    res.render("about", {
        title: "About me",
        name: "Ruslan  " 
    })
})

app.get("/help",(req, res)=> {
    res.render("help", {
        help: "This is your help message!",
        title: "Help",
        name: "Ruslan "
    })
})


app.get("/weather", (req,res)=> {
    if (!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error) {
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData)=>{
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term!"
        })
    }

    req.query.search
    res.send({
        products: []

    }) 
})

app.get("/help/*", (req,res) => {
    res.render("404", {
        error: "Help article not found",
        name: "Ruslan"
    })
})


app.get("*", (req,res) =>  {
    res.render("404", {
        error: "Page not found",
        name: "Ruslan"
    })
})




app.listen(port, ()=> {
    console.log("Server is up on port "+ port)
})