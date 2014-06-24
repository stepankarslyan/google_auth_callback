var zmq = require("zmq");

var responder = zmq.socket("asyncrep");
responder.bind("tcp://*:1113");
console.log("Binding to: tcp://*:1113");

responder.on("message", function(message, response) {
  var session = "iusghtofiauhrsotuifhaisuhtfgoiuashg";
  console.log("session: " + session);
  response.send(session);
});
