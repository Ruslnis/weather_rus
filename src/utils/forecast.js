const request = require('request') 


const forecast = (x,y,callback) => {
    const url = "https://api.darksky.net/forecast/ff4b809b42577191e96e8822f9455e8a/"+x+","+y
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback("Unnable to connect!",undefined)
        } else if(body.error){
            callback("Unnable to find coordinates!",undefined)
        } else {
            callback(undefined, body.daily.data[0].summary )
           
        }
})
}




module.exports = forecast