const request = require('request')

const forecast = (longitude, latitude ,callback) => {
    const url ='https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=f5836f0892147469e536536676bf773c'
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback("Unable to connect to Weather Service!", undefined)
        }else if(body.message){
            callback("Unable to find location", undefined)
        }else{
            callback(undefined, "The temperature is currently "+ body.current.temp +' degrees out.')
        }
    })
}
module.exports = forecast
