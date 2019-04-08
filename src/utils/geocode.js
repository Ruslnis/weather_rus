const request = require("request")

const geocode = (address, callback ) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address + ".json?access_token=pk.eyJ1IjoicnVzbG5pcyIsImEiOiJjanUyemdscmcwZ2U0NGRwcGE0cjQ5bnNtIn0.tAfJS0Z8O-ppasd9IGQvkA&limit=1"

    request({url, json:true}, (error, {body})=>{
        if (error) {
            callback("Unable to connect!")
        } else if (body.features.length === 0){
            callback("Unable to find location!")
        } else {
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

} 


module.exports = geocode