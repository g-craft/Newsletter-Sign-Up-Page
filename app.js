//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function() { //process.env.PORT to launch on Heroku server, 3000 to launch localy
  console.log("app is running on port 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://xxx.api.mailchimp.com/3.0/lists/xxxxxxx", //xxx - server from api key; xxxxxxx - list id
    method: "POST",
    headers: {
      "Authorization": "yourName yyyyyyyyyyyyyyyyyyyy-xxx" // yyyyyyyyyyyyyyyyyyyy-xxx api key with server name (xxx)

    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });

});

app.post("/failure", function(req,res){
res.redirect("/");
});
