[![website link]](https://github.com/stepankarslyan/google_auth_callback)

  Fast, unopinionated, minimalist web app 

## Dependencies

* Express.js
* Onicollet/zmq
* Optimist

## Performance

* Listens on port 3000(by default)

* Binds to the tcp://*:1111 port(by default)

```js
var publisher = zmq.socket("pub");
publisher.bind("tcp://*:1111");
console.log('Binding to the 1111...');
publisher.send(data);

```

* Connects to the tcp://localhost:1113 port(by default)

```js

var requester = zmq.socket("asyncreq");
requester.connect("tcp://localhost:1113");
console.log('Connecting to the 1113...');
requester.send(data, function(response) {
  console.log(data);
});

```
