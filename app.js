const express = require("express");

//https is one of the native noe modules bundled with Node so we dont have to install it
const https = require("https");
const bodyParser= require("body-parser");

const app = express();

//urlencoded to receive data from a form
app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function(req, res){

  res.sendFile(__dirname + "/index.html");


});

app.post("/" , function(req, res){
  console.log("Post Request Received");

  const query= req.body.cityName;
  const apikey = "2f5e8a2e5e16eacf79f1d92c55db18a7"
  const unit= "metric"

  const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid=" + apikey + "&units=" + unit;

  //we use the native node https module to perform a get request across the internet callback function
  https.get(url , function(response){
    console.log(response);

    response.on("data", function(data){
      const weatherData= JSON.parse(data);
      const temp= weatherData.main.temp
      const desc= weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"


      res.write("<h1> The temperature is " + temp + " degrees</h1>")
      res.write("<p>the weather is " + desc+ "<p>");
      res.write("<img src=" + imageURL + ">");

      res.send();
    })
  })
})


app.listen(3000, function(){
  console.log("server running on 3000");
})
