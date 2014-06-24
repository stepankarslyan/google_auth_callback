var express = require('express');
var argv = require('optimist')
    .default({ 
      listen: 3000,
      bind: "tcp://*:1111",
      reqConn: "tcp://localhost:1113"
    })
    .argv;

//var cookieparser = require("cookieparser");
var zmq = require("zmq");

var publisher = zmq.socket("pub");
publisher.bind(argv.bind);
console.log("Binding to the " + argv.bind);

var requester = zmq.socket("asyncreq");
requester.connect(argv.reqConn);
console.log("Connecting to the" +argv.reqConn);

var app = express();
app.get('/', function(req, res){
  var code = req.query.code;
  console.log("code: " + code);
  
  requester.send("", function(session) {    
    console.log("session: " + session);
    
    res.cookie("session", session);
    res.send(200);
    
    var message = {code: code, session: session};
    console.log("message: " + JSON.stringify(message));
    publisher.send(JSON.stringify(message));	  
  });
});

var server = app.listen(argv.listen, function() {
    console.log('Listening on port %d', server.address().port);
});
