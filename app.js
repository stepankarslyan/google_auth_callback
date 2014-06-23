var express = require('express');
var cookieparser = require("cookieparser");
var zmq = require("zmq");
var publisher = zmq.socket("pub");
publisher.bind("tcp://*:1111");
console.log('Binding to the 1111...');

var app = express();
app.get('/oauth/google/callback', function(req, res){
  var code = req.query.code;
  res.cookie("name", code, {maxAge: 9000});	
  console.log(code);  
  publisher.send(code);	
  res.send(200);
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
