# Compiled Documentation

Generated on 2025-04-15T05:55:42.847Z

### v4

#### _docs_v4.md

> Source: https://socket.io/docs/v4
> Scraped: 4/14/2025, 11:55:31 PM

tip

If you are new to Socket.IO, we recommend checking out our [tutorial](_docs_v4_tutorial_introduction.md).

Socket.IO is a library that enables **low-latency**, **bidirectional** and **event-based** communication between a client and a server.

![Diagram of a communication between a server and a client](https://socket.io/images/bidirectional-communication2.png)![Diagram of a communication between a server and a client](https://socket.io/images/bidirectional-communication2-dark.png)

The Socket.IO connection can be established with different low-level transports:

*   HTTP long-polling
* [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
* [WebTransport](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API)

Socket.IO will automatically pick the best available option, depending on:

*   the capabilities of the browser (see [here](https://caniuse.com/websockets) and [here](https://caniuse.com/webtransport))
*   the network (some networks block WebSocket and/or WebTransport connections)

You can find more detail about that in the ["How it works" section](_docs_v4_how-it-works_.md).

### Server implementations[​](_docs_v4.md#server-implementations)

Language

Website

JavaScript (Node.js)

\- [Installation steps](_docs_v4_server-installation_.md)  
\- [API](_docs_v4_server-api_.md)  
\- [Source code](https://github.com/socketio/socket.io)

JavaScript (Deno)

[https://github.com/socketio/socket.io-deno](https://github.com/socketio/socket.io-deno)

Java

[https://github.com/mrniko/netty-socketio](https://github.com/mrniko/netty-socketio)

Java

[https://github.com/trinopoty/socket.io-server-java](https://github.com/trinopoty/socket.io-server-java)

Python

[https://github.com/miguelgrinberg/python-socketio](https://github.com/miguelgrinberg/python-socketio)

Golang

[https://github.com/googollee/go-socket.io](https://github.com/googollee/go-socket.io)

Rust

[https://github.com/Totodore/socketioxide](https://github.com/Totodore/socketioxide)

### Client implementations[​](_docs_v4.md#client-implementations)

Language

Website

JavaScript (browser, Node.js or React Native)

\- [Installation steps](_docs_v4_client-installation_.md)  
\- [API](_docs_v4_client-api_.md)  
\- [Source code](https://github.com/socketio/socket.io-client)

JavaScript (for WeChat Mini-Programs)

[https://github.com/weapp-socketio/weapp.socket.io](https://github.com/weapp-socketio/weapp.socket.io)

Java

[https://github.com/socketio/socket.io-client-java](https://github.com/socketio/socket.io-client-java)

C++

[https://github.com/socketio/socket.io-client-cpp](https://github.com/socketio/socket.io-client-cpp)

Swift

[https://github.com/socketio/socket.io-client-swift](https://github.com/socketio/socket.io-client-swift)

Dart

[https://github.com/rikulo/socket.io-client-dart](https://github.com/rikulo/socket.io-client-dart)

Python

[https://github.com/miguelgrinberg/python-socketio](https://github.com/miguelgrinberg/python-socketio)

.Net

[https://github.com/doghappy/socket.io-client-csharp](https://github.com/doghappy/socket.io-client-csharp)

Rust

[https://github.com/1c3t3a/rust-socketio](https://github.com/1c3t3a/rust-socketio)

Kotlin

[https://github.com/icerockdev/moko-socket-io](https://github.com/icerockdev/moko-socket-io)

PHP

[https://github.com/ElephantIO/elephant.io](https://github.com/ElephantIO/elephant.io)

Golang

[https://github.com/maldikhan/go.socket.io](https://github.com/maldikhan/go.socket.io)

caution

Socket.IO is **NOT** a WebSocket implementation.

Although Socket.IO indeed uses WebSocket for transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.
```
// WARNING: the client will NOT be able to connect!  
const socket = io("ws://echo.websocket.org");  
```
If you are looking for a plain WebSocket server, please take a look at [ws](https://github.com/websockets/ws) or [µWebSockets.js](https://github.com/uNetworking/uWebSockets.js).

There are also [discussions](https://github.com/nodejs/node/issues/19308) for including a WebSocket server in the Node.js core.

On the client-side, you might be interested in the [robust-websocket](https://github.com/nathanboktae/robust-websocket) package.

caution

Socket.IO is not meant to be used in a background service for mobile applications.

The Socket.IO library keeps an open TCP connection to the server, which may result in a high battery drain for your users. Please use a dedicated messaging platform like [FCM](https://firebase.google.com/docs/cloud-messaging) for this use case.

Here are the features provided by Socket.IO over plain WebSockets:

### HTTP long-polling fallback[​](_docs_v4.md#http-long-polling-fallback)

The connection will fall back to HTTP long-polling in case the WebSocket connection cannot be established.

This feature was the #1 reason people used Socket.IO when the project was created more than ten years ago (!), as the browser support for WebSockets was still in its infancy.

Even if most browsers now support WebSockets (more than [97%](https://caniuse.com/mdn-api_websocket)), it is still a great feature as we still receive reports from users that cannot establish a WebSocket connection because they are behind some misconfigured proxy.

### Automatic reconnection[​](_docs_v4.md#automatic-reconnection)

Under some particular conditions, the WebSocket connection between the server and the client can be interrupted with both sides being unaware of the broken state of the link.

That's why Socket.IO includes a heartbeat mechanism, which periodically checks the status of the connection.

And when the client eventually gets disconnected, it automatically reconnects with an exponential back-off delay, in order not to overwhelm the server.

### Packet buffering[​](_docs_v4.md#packet-buffering)

The packets are automatically buffered when the client is disconnected, and will be sent upon reconnection.

More information [here](_docs_v4_client-offline-behavior_.md#buffered-events).

### Acknowledgements[​](_docs_v4.md#acknowledgements)

Socket.IO provides a convenient way to send an event and receive a response:

_Sender_
```
socket.emit("hello", "world", (response) => {  
  console.log(response); // "got it"});  
```
_Receiver_
```
socket.on("hello", (arg, callback) => {  
  console.log(arg); // "world"  callback("got it");});  
```
You can also add a timeout:
```
socket.timeout(5000).emit("hello", "world", (err, response) => {  
  if (err) {    // the other side did not acknowledge the event in the given delay  } else {    console.log(response); // "got it"  }});  
```
### Broadcasting[​](_docs_v4.md#broadcasting)

On the server-side, you can send an event to [all connected clients](_docs_v4_broadcasting-events_.md) or [to a subset of clients](_docs_v4_rooms_.md):
```
// to all connected clients  
io.emit("hello");  
  
// to all connected clients in the "news" room  
io.to("news").emit("hello");  
```
This also works when [scaling to multiple nodes](_docs_v4_using-multiple-nodes_.md).

### Multiplexing[​](_docs_v4.md#multiplexing)

Namespaces allow you to split the logic of your application over a single shared connection. This can be useful for example if you want to create an "admin" channel that only authorized users can join.
```
io.on("connection", (socket) => {  
  // classic users});  
  
io.of("/admin").on("connection", (socket) => {  
  // admin users});  
```
More on that [here](_docs_v4_namespaces_.md).

### Is Socket.IO still needed today?[​](_docs_v4.md#is-socketio-still-needed-today)

That's a fair question, since WebSockets are supported [almost everywhere](https://caniuse.com/mdn-api_websocket) now.

That being said, we believe that, if you use plain WebSockets for your application, you will eventually need to implement most of the features that are already included (and battle-tested) in Socket.IO, like [reconnection](_docs_v4.md#automatic-reconnection), [acknowledgements](_docs_v4.md#acknowledgements) or [broadcasting](_docs_v4.md#broadcasting).

### What is the overhead of the Socket.IO protocol?[​](_docs_v4.md#what-is-the-overhead-of-the-socketio-protocol)

`socket.emit("hello", "world")` will be sent as a single WebSocket frame containing `42["hello","world"]` with:

*   `4` being Engine.IO "message" packet type
*   `2` being Socket.IO "message" packet type
*   `["hello","world"]` being the `JSON.stringify()`\-ed version of the arguments array

So, a few additional bytes for each message, which can be further reduced by the usage of a [custom parser](_docs_v4_custom-parser_.md).

info

The size of the browser bundle itself is [`10.4 kB`](https://bundlephobia.com/package/socket.io-client) (minified and gzipped).

You can find the details of the Socket.IO protocol [here](_docs_v4_socket-io-protocol_.md).

### Something does not work properly, please help?[​](_docs_v4.md#something-does-not-work-properly-please-help)

Please check our [Troubleshooting guide](_docs_v4_troubleshooting-connection-issues_.md).

* [Get started example](_get-started_chat.md)
* [Server installation](_docs_v4_server-installation_.md)
* [Client installation](_docs_v4_client-installation_.md)

#### _docs_v4_.md

> Source: https://socket.io/docs/v4/
> Scraped: 4/14/2025, 11:55:29 PM

tip

If you are new to Socket.IO, we recommend checking out our [tutorial](_docs_v4_tutorial_introduction.md).

Socket.IO is a library that enables **low-latency**, **bidirectional** and **event-based** communication between a client and a server.

![Diagram of a communication between a server and a client](https://socket.io/images/bidirectional-communication2.png)![Diagram of a communication between a server and a client](https://socket.io/images/bidirectional-communication2-dark.png)

The Socket.IO connection can be established with different low-level transports:

*   HTTP long-polling
* [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
* [WebTransport](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API)

Socket.IO will automatically pick the best available option, depending on:

*   the capabilities of the browser (see [here](https://caniuse.com/websockets) and [here](https://caniuse.com/webtransport))
*   the network (some networks block WebSocket and/or WebTransport connections)

You can find more detail about that in the ["How it works" section](_docs_v4_how-it-works_.md).

### Server implementations[​](_docs_v4_.md#server-implementations)

Language

Website

JavaScript (Node.js)

\- [Installation steps](_docs_v4_server-installation_.md)  
\- [API](_docs_v4_server-api_.md)  
\- [Source code](https://github.com/socketio/socket.io)

JavaScript (Deno)

[https://github.com/socketio/socket.io-deno](https://github.com/socketio/socket.io-deno)

Java

[https://github.com/mrniko/netty-socketio](https://github.com/mrniko/netty-socketio)

Java

[https://github.com/trinopoty/socket.io-server-java](https://github.com/trinopoty/socket.io-server-java)

Python

[https://github.com/miguelgrinberg/python-socketio](https://github.com/miguelgrinberg/python-socketio)

Golang

[https://github.com/googollee/go-socket.io](https://github.com/googollee/go-socket.io)

Rust

[https://github.com/Totodore/socketioxide](https://github.com/Totodore/socketioxide)

### Client implementations[​](_docs_v4_.md#client-implementations)

Language

Website

JavaScript (browser, Node.js or React Native)

\- [Installation steps](_docs_v4_client-installation_.md)  
\- [API](_docs_v4_client-api_.md)  
\- [Source code](https://github.com/socketio/socket.io-client)

JavaScript (for WeChat Mini-Programs)

[https://github.com/weapp-socketio/weapp.socket.io](https://github.com/weapp-socketio/weapp.socket.io)

Java

[https://github.com/socketio/socket.io-client-java](https://github.com/socketio/socket.io-client-java)

C++

[https://github.com/socketio/socket.io-client-cpp](https://github.com/socketio/socket.io-client-cpp)

Swift

[https://github.com/socketio/socket.io-client-swift](https://github.com/socketio/socket.io-client-swift)

Dart

[https://github.com/rikulo/socket.io-client-dart](https://github.com/rikulo/socket.io-client-dart)

Python

[https://github.com/miguelgrinberg/python-socketio](https://github.com/miguelgrinberg/python-socketio)

.Net

[https://github.com/doghappy/socket.io-client-csharp](https://github.com/doghappy/socket.io-client-csharp)

Rust

[https://github.com/1c3t3a/rust-socketio](https://github.com/1c3t3a/rust-socketio)

Kotlin

[https://github.com/icerockdev/moko-socket-io](https://github.com/icerockdev/moko-socket-io)

PHP

[https://github.com/ElephantIO/elephant.io](https://github.com/ElephantIO/elephant.io)

Golang

[https://github.com/maldikhan/go.socket.io](https://github.com/maldikhan/go.socket.io)

caution

Socket.IO is **NOT** a WebSocket implementation.

Although Socket.IO indeed uses WebSocket for transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.
```
// WARNING: the client will NOT be able to connect!  
const socket = io("ws://echo.websocket.org");  
```
If you are looking for a plain WebSocket server, please take a look at [ws](https://github.com/websockets/ws) or [µWebSockets.js](https://github.com/uNetworking/uWebSockets.js).

There are also [discussions](https://github.com/nodejs/node/issues/19308) for including a WebSocket server in the Node.js core.

On the client-side, you might be interested in the [robust-websocket](https://github.com/nathanboktae/robust-websocket) package.

caution

Socket.IO is not meant to be used in a background service for mobile applications.

The Socket.IO library keeps an open TCP connection to the server, which may result in a high battery drain for your users. Please use a dedicated messaging platform like [FCM](https://firebase.google.com/docs/cloud-messaging) for this use case.

Here are the features provided by Socket.IO over plain WebSockets:

### HTTP long-polling fallback[​](_docs_v4_.md#http-long-polling-fallback)

The connection will fall back to HTTP long-polling in case the WebSocket connection cannot be established.

This feature was the #1 reason people used Socket.IO when the project was created more than ten years ago (!), as the browser support for WebSockets was still in its infancy.

Even if most browsers now support WebSockets (more than [97%](https://caniuse.com/mdn-api_websocket)), it is still a great feature as we still receive reports from users that cannot establish a WebSocket connection because they are behind some misconfigured proxy.

### Automatic reconnection[​](_docs_v4_.md#automatic-reconnection)

Under some particular conditions, the WebSocket connection between the server and the client can be interrupted with both sides being unaware of the broken state of the link.

That's why Socket.IO includes a heartbeat mechanism, which periodically checks the status of the connection.

And when the client eventually gets disconnected, it automatically reconnects with an exponential back-off delay, in order not to overwhelm the server.

### Packet buffering[​](_docs_v4_.md#packet-buffering)

The packets are automatically buffered when the client is disconnected, and will be sent upon reconnection.

More information [here](_docs_v4_client-offline-behavior_.md#buffered-events).

### Acknowledgements[​](_docs_v4_.md#acknowledgements)

Socket.IO provides a convenient way to send an event and receive a response:

_Sender_
```
socket.emit("hello", "world", (response) => {  
  console.log(response); // "got it"});  
```
_Receiver_
```
socket.on("hello", (arg, callback) => {  
  console.log(arg); // "world"  callback("got it");});  
```
You can also add a timeout:
```
socket.timeout(5000).emit("hello", "world", (err, response) => {  
  if (err) {    // the other side did not acknowledge the event in the given delay  } else {    console.log(response); // "got it"  }});  
```
### Broadcasting[​](_docs_v4_.md#broadcasting)

On the server-side, you can send an event to [all connected clients](_docs_v4_broadcasting-events_.md) or [to a subset of clients](_docs_v4_rooms_.md):
```
// to all connected clients  
io.emit("hello");  
  
// to all connected clients in the "news" room  
io.to("news").emit("hello");  
```
This also works when [scaling to multiple nodes](_docs_v4_using-multiple-nodes_.md).

### Multiplexing[​](_docs_v4_.md#multiplexing)

Namespaces allow you to split the logic of your application over a single shared connection. This can be useful for example if you want to create an "admin" channel that only authorized users can join.
```
io.on("connection", (socket) => {  
  // classic users});  
  
io.of("/admin").on("connection", (socket) => {  
  // admin users});  
```
More on that [here](_docs_v4_namespaces_.md).

### Is Socket.IO still needed today?[​](_docs_v4_.md#is-socketio-still-needed-today)

That's a fair question, since WebSockets are supported [almost everywhere](https://caniuse.com/mdn-api_websocket) now.

That being said, we believe that, if you use plain WebSockets for your application, you will eventually need to implement most of the features that are already included (and battle-tested) in Socket.IO, like [reconnection](_docs_v4_.md#automatic-reconnection), [acknowledgements](_docs_v4_.md#acknowledgements) or [broadcasting](_docs_v4_.md#broadcasting).

### What is the overhead of the Socket.IO protocol?[​](_docs_v4_.md#what-is-the-overhead-of-the-socketio-protocol)

`socket.emit("hello", "world")` will be sent as a single WebSocket frame containing `42["hello","world"]` with:

*   `4` being Engine.IO "message" packet type
*   `2` being Socket.IO "message" packet type
*   `["hello","world"]` being the `JSON.stringify()`\-ed version of the arguments array

So, a few additional bytes for each message, which can be further reduced by the usage of a [custom parser](_docs_v4_custom-parser_.md).

info

The size of the browser bundle itself is [`10.4 kB`](https://bundlephobia.com/package/socket.io-client) (minified and gzipped).

You can find the details of the Socket.IO protocol [here](_docs_v4_socket-io-protocol_.md).

### Something does not work properly, please help?[​](_docs_v4_.md#something-does-not-work-properly-please-help)

Please check our [Troubleshooting guide](_docs_v4_troubleshooting-connection-issues_.md).

* [Get started example](_get-started_chat.md)
* [Server installation](_docs_v4_server-installation_.md)
* [Client installation](_docs_v4_client-installation_.md)

#### _docs_v4_adapter.md

> Source: https://socket.io/docs/v4/adapter
> Scraped: 4/14/2025, 11:55:41 PM

Version: 4.x

An Adapter is a server-side component which is responsible for broadcasting events to all or a subset of clients.

When scaling to multiple Socket.IO servers, you will need to replace the default in-memory adapter by another implementation, so the events are properly routed to all clients.

Here is the list of adapters that are maintained by our team:

*   the [Redis adapter](_docs_v4_redis-adapter_.md)
*   the [Redis Streams adapter](_docs_v4_redis-streams-adapter_.md)
*   the [MongoDB adapter](_docs_v4_mongo-adapter_.md)
*   the [Postgres adapter](_docs_v4_postgres-adapter_.md)
*   the [Cluster adapter](_docs_v4_cluster-adapter_.md)
*   the [Google Cloud Pub/Sub adapter](_docs_v4_gcp-pubsub-adapter_.md)
*   the [AWS SQS adapter](_docs_v4_aws-sqs-adapter_.md)
*   the [Azure Service Bus adapter](_docs_v4_azure-service-bus-adapter_.md)

There are also several other options which are maintained by the (awesome!) community:

* [AMQP](https://github.com/sensibill/socket.io-amqp) (e.g. RabbitMQ)
* [NATS](https://github.com/MickL/socket.io-nats-adapter)
* [NATS](https://github.com/distrue/socket.io-nats-adapter)

Please note that enabling sticky sessions is still needed when using multiple Socket.IO servers and HTTP long-polling. More information [here](_docs_v4_using-multiple-nodes_.md#why-is-sticky-session-required).

You can have access to the adapter instance with:
```
// main namespace  
const mainAdapter = io.of("/").adapter; // WARNING! io.adapter() will not work  
// custom namespace  
const adminAdapter = io.of("/admin").adapter;  
```
Starting with `socket.io@3.1.0`, each Adapter instance emits the following events:

*   `create-room` (argument: room)
*   `delete-room` (argument: room)
*   `join-room` (argument: room, id)
*   `leave-room` (argument: room, id)

Example:
```
io.of("/").adapter.on("create-room", (room) => {  
  console.log(`room ${room} was created`);});  
  
io.of("/").adapter.on("join-room", (room, id) => {  
  console.log(`socket ${id} has joined room ${room}`);});  
```
Most adapter implementations come with their associated emitter package, which allows communicating to the group of Socket.IO servers from another Node.js process.

![Emitter diagram](https://socket.io/images/emitter.png)![Emitter diagram](https://socket.io/images/emitter-dark.png)

This may be useful for example in a microservice setup, where all clients connect to the microservice M1, while the microservice M2 uses the emitter to broadcast packets (uni-directional communication).
```
// to all clients  
emitter.emit(/* ... */);  
  
// to all clients in "room1"  
emitter.to("room1").emit(/* ... */);  
  
// to all clients in "room1" except those in "room2"  
emitter.to("room1").except("room2").emit(/* ... */);  
  
const adminEmitter = emitter.of("/admin");  
  
// to all clients in the "admin" namespace  
adminEmitter.emit(/* ... */);  
  
// to all clients in the "admin" namespace and in the "room1" room  
adminEmitter.to("room1").emit(/* ... */);  
```
The emitter also supports the utility methods that were added in `socket.io@4.0.0`:

*   `socketsJoin()`
```
// make all Socket instances join the "room1" room  
emitter.socketsJoin("room1");  
  
// make all Socket instances of the "admin" namespace in the "room1" room join the "room2" room  
emitter.of("/admin").in("room1").socketsJoin("room2");  
```
*   `socketsLeave()`
```
// make all Socket instances leave the "room1" room  
emitter.socketsLeave("room1");  
  
// make all Socket instances in the "room1" room leave the "room2" and "room3" rooms  
emitter.in("room1").socketsLeave(["room2", "room3"]);  
  
// make all Socket instances in the "room1" room of the "admin" namespace leave the "room2" room  
emitter.of("/admin").in("room1").socketsLeave("room2");  
```
*   `disconnectSockets()`
```
// make all Socket instances disconnect  
emitter.disconnectSockets();  
  
// make all Socket instances in the "room1" room disconnect (and discard the low-level connection)  
emitter.in("room1").disconnectSockets(true);  
  
// make all Socket instances in the "room1" room of the "admin" namespace disconnect  
emitter.of("/admin").in("room1").disconnectSockets();  
  
// this also works with a single socket ID  
emitter.of("/admin").in(theSocketId).disconnectSockets();  
```
*   `serverSideEmit()`
```
// emit an event to all the Socket.IO servers of the cluster  
emitter.serverSideEmit("hello", "world");  
  
// Socket.IO server (server-side)  
io.on("hello", (arg) => {  
  console.log(arg); // prints "world"});  
```

#### _docs_v4_admin-ui.md

> Source: https://socket.io/docs/v4/admin-ui
> Scraped: 4/14/2025, 11:55:40 PM

The Socket.IO admin UI can be used to have an overview of the state of your Socket.IO deployment.

The source code can be found here: [https://github.com/socketio/socket.io-admin-ui/](https://github.com/socketio/socket.io-admin-ui/)

Link to the hosted version: [https://admin.socket.io/](https://admin.socket.io/)

*   overview of the servers and the clients that are currently connected

![Screenshot of the dashboard](https://socket.io/assets/images/admin-ui-dashboard-8df87956c18a60717867ef800c1bc9c2.png)

*   details of each socket instance (active transport, handshake, rooms, ...)

![Screenshot of the page displaying the details of a socket](https://socket.io/assets/images/admin-ui-socket-details-38d032b6617a39a0769b93f8f3518e9d.png)

*   details of each room

![Screenshot of the page displaying the details of a room](https://socket.io/assets/images/admin-ui-room-details-012287cf23321c935d3fee19cca401c9.png)

*   details of every event emitted or received by the server

![Screenshot of the page displaying the list of events](https://socket.io/assets/images/admin-ui-events-89ff24243c327109a8455375ccc78868.png)

*   administrative operations (join, leave, disconnect)

If you have any feedback / suggestions, do not hesitate!

### Server-side[​](_docs_v4_admin-ui.md#server-side)

First, install the `@socket.io/admin-ui` package:
```
npm i @socket.io/admin-ui  
```
And then invoke the `instrument` method on your Socket.IO server:
```
const { createServer } = require("http");  
const { Server } = require("socket.io");  
const { instrument } = require("@socket.io/admin-ui");  
  
const httpServer = createServer();  
  
const io = new Server(httpServer, {  
  cors: {    origin: ["https://admin.socket.io"],    credentials: true  }});  
  
instrument(io, {  
  auth: false,  mode: "development",});  
  
httpServer.listen(3000);  
```
The module is compatible with:

*   Socket.IO v4 server
*   Socket.IO v3 server (>= 3.1.0), but without the operations on rooms (join, leave, disconnection)

Example with [NestJS](https://docs.nestjs.com/websockets/gateways):
```
import { instrument } from "@socket.io/admin-ui";  
  
@WebSocketGateway()  
export class MyGateway {  
    // ...    afterInit() {        instrument(this.server, {            auth: false,            mode: "development",        });    }}  
```
### Client-side[​](_docs_v4_admin-ui.md#client-side)

You can then head up to [https://admin.socket.io](https://admin.socket.io/), or host the files found in the `ui/dist` folder [here](https://github.com/socketio/socket.io-admin-ui/tree/main/ui/dist).

**Important note**: the website at [https://admin.socket.io](https://admin.socket.io/) is totally static (hosted on [Vercel](https://vercel.com/)), we do not (and will never) store any information about yourself or your browser (no tracking, no analytics, ...). That being said, hosting the files yourself is totally fine.

You should see the following modal:

![login modal screenshot](https://socket.io/assets/images/admin-ui-login-modal-a8a4dea1ffc70eb0783445ad8c7bbb8d.png)

Please enter the URL of your server (for example, `http://localhost:3000` or `https://example.com`) and the credentials, if applicable (see the `auth` option [below](_docs_v4_admin-ui.md#auth)).

### Available options[​](_docs_v4_admin-ui.md#available-options)

#### `auth`[​](_docs_v4_admin-ui.md#auth)

Default value: `-`

This option is mandatory. You can either disable authentication (please use with caution):
```
instrument(io, {  
  auth: false});  
```
Or use basic authentication:
```
instrument(io, {  
  auth: {    type: "basic",    username: "admin",    password: "$2b$10$heqvAkYMez.Va6Et2uXInOnkCT6/uQj1brkrbyG3LpopDklcq7ZOS" // "changeit" encrypted with bcrypt  },});  
```
#### `namespaceName`[​](_docs_v4_admin-ui.md#namespacename)

Default value: `/admin`

The name of the namespace which will be created to handle the administrative tasks.
```
instrument(io, {  
  namespaceName: "/custom"});  
```
This namespace is a classic Socket.IO namespace, you can access it with:
```
const adminNamespace = io.of("/admin");  
```
More information [here](_docs_v4_namespaces_.md).

#### `readonly`[​](_docs_v4_admin-ui.md#readonly)

Default value: `false`

Whether to put the admin UI in read-only mode (no join, leave or disconnect allowed).
```
instrument(io, {  
  readonly: true});  
```
#### `serverId`[​](_docs_v4_admin-ui.md#serverid)

Default value: `require("os").hostname()`

The ID of the given server. If you have several Socket.IO servers on the same machine, you'll need to give them a distinct ID:
```
instrument(io, {  
  serverId: `${require("os").hostname()}#${process.pid}`});  
```
#### `store`[​](_docs_v4_admin-ui.md#store)

Default value: `new InMemoryStore()`

The store is used to store the session IDs so the user do not have to retype the credentials upon reconnection.

If you use basic authentication in a multi-server setup, you should provide a custom store:
```
const { instrument, RedisStore } = require("@socket.io/admin-ui");  
  
instrument(io, {  
  store: new RedisStore(redisClient)});  
```
#### `mode`[​](_docs_v4_admin-ui.md#mode)

Default value: `development`

In production mode, the server won't send all details about the socket instances and the rooms, thus reducing the memory footprint of the instrumentation.
```
instrument(io, {  
  mode: "production"});  
```
The production mode can also be enabled with the NODE\_ENV environment variable:
```
NODE_ENV=production node index.js  
```
The source code can be found here: [https://github.com/socketio/socket.io-admin-ui/](https://github.com/socketio/socket.io-admin-ui/)

The `instrument` method simply:

*   creates a [namespace](_docs_v4_namespaces_.md) and adds an authentication [middleware](_docs_v4_middlewares_.md) if applicable
*   register listeners for the `connection` and `disconnect` events for each existing namespaces to track the socket instances
*   register a timer which will periodically send stats from the server to the UI
*   register handlers for the `join`, `leave` and `_disconnect` commands sent from the UI

*   `0.5.1` (Oct 2022): [GitHub release](https://github.com/socketio/socket.io-admin-ui/releases/tag/0.5.1) / [diff](https://github.com/socketio/socket.io-admin-ui/compare/0.5.0...0.5.1)
*   `0.5.0` (Sep 2022): [GitHub release](https://github.com/socketio/socket.io-admin-ui/releases/tag/0.5.0) / [diff](https://github.com/socketio/socket.io-admin-ui/compare/0.4.0...0.5.0)
*   `0.4.0` (Jun 2022): [GitHub release](https://github.com/socketio/socket.io-admin-ui/releases/tag/0.4.0) / [diff](https://github.com/socketio/socket.io-admin-ui/compare/0.3.0...0.4.0)

#### _docs_v4_aws-sqs-adapter.md

> Source: https://socket.io/docs/v4/aws-sqs-adapter
> Scraped: 4/14/2025, 11:55:41 PM

This adapter uses [AWS Simple Queue Service](https://aws.amazon.com/sqs/) to forward messages between the nodes of a Socket.IO cluster.

Unlike the existing [`socket.io-sqs`](https://github.com/thinkalpha/socket.io-sqs) package, this package supports binary payloads and dynamic namespaces.
```
import { SNS } from "@aws-sdk/client-sns";  
import { SQS } from "@aws-sdk/client-sqs";  
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/aws-sqs-adapter";  
  
const snsClient = new SNS();  
const sqsClient = new SQS();  
  
const io = new Server({  
  adapter: createAdapter(snsClient, sqsClient)});  
  
// wait for the creation of the SQS queue  
await io.of("/").adapter.init();  
  
io.listen(3000);  
```

#### _docs_v4_azure-service-bus-adapter.md

> Source: https://socket.io/docs/v4/azure-service-bus-adapter
> Scraped: 4/14/2025, 11:55:41 PM

This adapter uses [Azure Service Bus service](https://learn.microsoft.com/en-us/azure/service-bus-messaging) to forward messages between the nodes of a Socket.IO cluster.
```
import { ServiceBusClient, ServiceBusAdministrationClient } from "@azure/service-bus";  
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/azure-service-bus-adapter";  
  
const connectionString = "Endpoint=...";  
  
const serviceBusClient = new ServiceBusClient(connectionString);  
const serviceBusAdminClient = new ServiceBusAdministrationClient(connectionString);  
  
const io = new Server({  
  adapter: createAdapter(serviceBusClient, serviceBusAdminClient)});  
  
// wait for the creation of the subscription  
await io.of("/").adapter.init();  
  
io.listen(3000);  
```

#### _docs_v4_broadcasting-events.md

> Source: https://socket.io/docs/v4/broadcasting-events
> Scraped: 4/14/2025, 11:55:32 PM

Version: 4.x

Socket.IO makes it easy to send events to all the connected clients.

info

Please note that broadcasting is a **server-only** feature.

![Broadcasting to all connected clients](https://socket.io/images/broadcasting.png)![Broadcasting to all connected clients](https://socket.io/images/broadcasting-dark.png)
```
io.emit("hello", "world");  
```
caution

Clients that are currently disconnected (or in the process of reconnecting) won't receive the event. Storing this event somewhere (in a database, for example) is up to you, depending on your use case.

![Broadcasting to all connected clients excepting the sender](https://socket.io/images/broadcasting2.png)![Broadcasting to all connected clients excepting the sender](https://socket.io/images/broadcasting2-dark.png)
```
io.on("connection", (socket) => {  
  socket.broadcast.emit("hello", "world");});  
```
note

In the example above, using `socket.emit("hello", "world")` (without `broadcast` flag) would send the event to "client A". You can find the list of all the ways to send an event in the [cheatsheet](_docs_v4_emit-cheatsheet_.md).

Starting with Socket.IO 4.5.0, you can now broadcast an event to multiple clients and expect an acknowledgement from each one of them:
```
io.timeout(5000).emit("hello", "world", (err, responses) => {  
  if (err) {    // some clients did not acknowledge the event in the given delay  } else {    console.log(responses); // one response per client  }});  
```
All broadcasting forms are supported:

*   in a room
```
io.to("room123").timeout(5000).emit("hello", "world", (err, responses) => {  
  // ...});  
```
*   from a specific `socket`
```
socket.broadcast.timeout(5000).emit("hello", "world", (err, responses) => {  
  // ...});  
```
*   in a namespace
```
io.of("/the-namespace").timeout(5000).emit("hello", "world", (err, responses) => {  
  // ...});  
```
Broadcasting also works with multiple Socket.IO servers.

You just need to replace the default adapter by the [Redis Adapter](_docs_v4_redis-adapter_.md) or another [compatible adapter](_docs_v4_adapter_.md).

![Broadcasting with Redis](https://socket.io/images/broadcasting-redis.png)![Broadcasting with Redis](https://socket.io/images/broadcasting-redis-dark.png)

In certain cases, you may want to only broadcast to clients that are connected to the current server. You can achieve this with the `local` flag:
```
io.local.emit("hello", "world");  
```
![Broadcasting with Redis but local](https://socket.io/images/broadcasting-redis-local.png)![Broadcasting with Redis but local](https://socket.io/images/broadcasting-redis-local-dark.png)

In order to target specific clients when broadcasting, please see the documentation about [Rooms](_docs_v4_rooms_.md).

#### _docs_v4_changelog.md

> Source: https://socket.io/docs/v4/changelog
> Scraped: 4/14/2025, 11:55:31 PM

*   [](index.md)
*   Changelog

Version: 4.x

## Versioning Policy[​](_docs_v4_changelog.md#versioning-policy)

Socket.IO releases closely follow [Semantic Versioning](https://semver.org/).

That means that with a version number `x.y.z`:

*   when releasing critical bug fixes, we make a patch release by increasing the `z` number (ex: `1.2.3` to `1.2.4`).
*   when releasing new features or non-critical fixes, we make a minor release by increasing the `y` number (ex: `1.2.3` to `1.3.0`).
*   when releasing breaking changes, we make a major release by increasing the `x` number (ex: `1.2.3` to `2.0.0`).

## Breaking changes[​](_docs_v4_changelog.md#breaking-changes)

Breaking changes are inconvenient for everyone, so we try to minimize the number of major releases.

We have had two major breaking changes impacting the Socket.IO protocol over the years:

*   Socket.IO v2 was released in **May 2017**   Socket.IO v3 was released in **November 2020**

info

Socket.IO v4 (released in March 2021) did not include any update to the Socket.IO protocol (only a couple of breaking changes in the Node.js server API), so it isn't counted here.

Reference: [Migrating from 3.x to 4.0](_docs_v4_migrating-from-3-x-to-4-0_.md)

## Important milestones[​](_docs_v4_changelog.md#important-milestones)

Aside from the breaking changes listed above, here are the latest important changes in Socket.IO:

Version

Date

Description

[`4.7.0`](_docs_v4_changelog_4.7.0.md)

June 2023

Support for WebTransport

[`4.6.0`](_docs_v4_changelog_4.6.0.md)

February 2023

Introduction of [Connection state recovery](_docs_v4_connection-state-recovery.md)

`4.4.0`

November 2021

Support for [uWebSockets.js](_docs_v4_server-installation_.md#usage-with-uwebsockets)

`4.1.0`

May 2021

Introduction of [`serverSideEmit()`](_docs_v4_server-instance_.md#serversideemit)

`4.0.0`

March 2021

Rewrite to [TypeScript](https://www.typescriptlang.org/)

## Version usage[​](_docs_v4_changelog.md#version-usage)

As of June 2024:

`socket.io` package

![Client downloads per version](https://socket.io/images/server-downloads-per-version.png)![Client downloads per version](https://socket.io/images/server-downloads-per-version-dark.png)

`socket.io-client` package

![Client downloads per version](https://socket.io/images/client-downloads-per-version.png)![Client downloads per version](https://socket.io/images/client-downloads-per-version-dark.png)

[

Next

4.8.1 (October 25, 2024)

](_docs_v4_changelog_4.8.1.md)

#### _docs_v4_changelog_2.5.0.md

> Source: https://socket.io/docs/v4/changelog/2.5.0
> Scraped: 4/14/2025, 11:55:35 PM

_June 26, 2022_

## Server[​](_docs_v4_changelog_2.5.0.md#server)

⚠️ WARNING ⚠️

The default value of the `maxHttpBufferSize` option has been decreased from 100 MB to 1 MB, in order to prevent attacks by denial of service.

Security advisory: [GHSA-j4f2-536g-r55m](https://github.com/advisories/GHSA-j4f2-536g-r55m)

### Bug Fixes[​](_docs_v4_changelog_2.5.0.md#bug-fixes)

*   fix race condition in dynamic namespaces ([05e1278](https://github.com/socketio/socket.io/commit/05e1278cfa99f3ecf3f8f0531ffe57d850e9a05b))
*   ignore packet received after disconnection ([22d4bdf](https://github.com/socketio/socket.io/commit/22d4bdf00d1a03885dc0171125faddfaef730066))
*   only set 'connected' to true after middleware execution ([226cc16](https://github.com/socketio/socket.io/commit/226cc16165f9fe60f16ff4d295fb91c8971cde35))
*   prevent the socket from joining a room after disconnection ([f223178](https://github.com/socketio/socket.io/commit/f223178eb655a7713303b21a78f9ef9e161d6458))

### Dependencies[​](_docs_v4_changelog_2.5.0.md#dependencies)

* [`engine.io@~3.6.0`](https://github.com/socketio/engine.io/releases/tag/3.6.0) ([https://github.com/socketio/engine.io/compare/3.5.0...3.6.0](https://github.com/socketio/engine.io/compare/3.5.0...3.6.0))
* [`ws@~7.4.2`](https://github.com/websockets/ws/releases/tag/7.4.2) (no change)

## Client[​](_docs_v4_changelog_2.5.0.md#client)

### Bug Fixes[​](_docs_v4_changelog_2.5.0.md#bug-fixes-1)

*   ensure buffered events are sent in order ([991eb0b](https://github.com/Automattic/socket.io-client/commit/991eb0b0289bbbf680099e6d42b302beee7568b8))

### Dependencies[​](_docs_v4_changelog_2.5.0.md#dependencies-1)

* [`engine.io-client@~3.5.0`](https://github.com/socketio/engine.io-client/releases/tag/3.5.0) (no change)
* [`ws@~7.4.2`](https://github.com/websockets/ws/releases/tag/7.4.2) (no change)

#### _docs_v4_changelog_4.5.0.md

> Source: https://socket.io/docs/v4/changelog/4.5.0
> Scraped: 4/14/2025, 11:55:35 PM

Version: 4.x

_April 23, 2022_

### Bug Fixes[​](_docs_v4_changelog_4.5.0.md#bug-fixes)

*   **typings:** ensure compatibility with TypeScript 3.x ([#4259](https://github.com/socketio/socket.io/issues/4259)) ([02c87a8](https://github.com/socketio/socket.io/commit/02c87a85614e217b8e7b93753f315790ae9d99f6))

### Features[​](_docs_v4_changelog_4.5.0.md#features)

#### Catch-all listeners for outgoing packets[​](_docs_v4_changelog_4.5.0.md#catch-all-listeners-for-outgoing-packets)

This is similar to `onAny()`, but for outgoing packets.

Syntax:
```
socket.onAnyOutgoing((event, ...args) => {  
  console.log(event);});  
```
Added in [531104d](https://github.com/socketio/socket.io/commit/531104d332690138b7aab84d5583d6204132c8b4).

#### Broadcast and expect multiple acknowledgements[​](_docs_v4_changelog_4.5.0.md#broadcast-and-expect-multiple-acknowledgements)

Syntax:
```
io.timeout(1000).emit("some-event", (err, responses) => {  
  // ...});  
```
Added in [8b20457](https://github.com/socketio/socket.io/commit/8b204570a94979bbec307f23ca078f30f5cf07b0).

#### `maxHttpBufferSize` value negotiation[​](_docs_v4_changelog_4.5.0.md#maxhttpbuffersize-value-negotiation)

A "maxPayload" field is now included in the Engine.IO handshake, so that clients in HTTP long-polling can decide how many packets they have to send to stay under the `maxHttpBufferSize` value.

This is a backward compatible change which should not mandate a new major revision of the protocol (we stay in v4), as we only add a field in the JSON-encoded handshake data:
```
0{"sid":"lv_VI97HAXpY6yYWAAAC","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":5000,"maxPayload":1000000}  
```
Added in [088dcb4](https://github.com/socketio/engine.io/commit/088dcb4dff60df39785df13d0a33d3ceaa1dff38).

### Dependencies[​](_docs_v4_changelog_4.5.0.md#dependencies)

* [`engine.io@~6.2.0`](https://github.com/socketio/engine.io/releases/tag/6.2.0) ([https://github.com/socketio/engine.io/compare/6.1.0...6.2.0](https://github.com/socketio/engine.io/compare/6.1.0...6.2.0))
* [`ws@~8.2.3`](https://github.com/websockets/ws/releases/tag/8.2.3) (no change)

### Features[​](_docs_v4_changelog_4.5.0.md#features-1)

#### Additional details for the disconnect event[​](_docs_v4_changelog_4.5.0.md#additional-details-for-the-disconnect-event)

The "disconnect" event will now include additional details to help debugging if anything has gone wrong.

Example when a payload is over the maxHttpBufferSize value in HTTP long-polling mode:
```
socket.on("disconnect", (reason, details) => {  
  console.log(reason); // "transport error"  
  // in that case, details is an error object  console.log(details.message); "xhr post error"  console.log(details.description); // 413 (the HTTP status of the response)  
  // details.context refers to the XMLHttpRequest object  console.log(details.context.status); // 413  console.log(details.context.responseText); // ""});  
```
Added in [b862924](https://github.com/socketio/socket.io-client/commit/b862924b7f1720979e5db2f0154906b305d420e3).

#### Catch-all listeners for outgoing packets[​](_docs_v4_changelog_4.5.0.md#catch-all-listeners-for-outgoing-packets-1)

This is similar to `onAny()`, but for outgoing packets.

Syntax:
```
socket.onAnyOutgoing((event, ...args) => {  
  console.log(event);});  
```
Added in [74e3e60](https://github.com/socketio/socket.io-client/commit/74e3e601a43133b2c0ea43c3de2764cc55b57b5a).

#### Slice write buffer according to the maxPayload value[​](_docs_v4_changelog_4.5.0.md#slice-write-buffer-according-to-the-maxpayload-value)

The server will now include a "maxPayload" field in the handshake details, allowing the clients to decide how many packets they have to send to stay under the `maxHttpBufferSize` value.

Added in [46fdc2f](https://github.com/socketio/engine.io-client/commit/46fdc2f0ed352b454614247406689edc9d908927).

### Dependencies[​](_docs_v4_changelog_4.5.0.md#dependencies-1)

* [`engine.io-client@~6.2.1`](https://github.com/socketio/engine.io-client/releases/tag/6.2.1) ([https://github.com/socketio/engine.io-client/compare/6.1.1...6.2.1](https://github.com/socketio/engine.io-client/compare/6.1.1...6.2.1))
* [`ws@~8.2.3`](https://github.com/websockets/ws/releases/tag/8.2.3) (no change)

#### _docs_v4_changelog_4.5.1.md

> Source: https://socket.io/docs/v4/changelog/4.5.1
> Scraped: 4/14/2025, 11:55:35 PM

[Skip to main content](#__docusaurus_skipToContent_fallback)

Latest blog post (July 25, 2024): [npm package provenance](_blog_npm-package-provenance_.md).

Version: 4.x
# Version 4.5.1

_May 17, 2022_

## Server[​](#server)

### Bug Fixes[​](#bug-fixes)

*   forward the local flag to the adapter when using fetchSockets() ([30430f0](https://github.com/socketio/socket.io/commit/30430f0985f8e7c49394543d4c84913b6a15df60))
*   **typings:** add HTTPS server to accepted types ([#4351](https://github.com/socketio/socket.io/issues/4351)) ([9b43c91](https://github.com/socketio/socket.io/commit/9b43c9167cff817c60fa29dbda2ef7cd938aff51))

### Dependencies[​](#dependencies)

* [`engine.io@~6.2.0`](https://github.com/socketio/engine.io/releases/tag/6.2.0) (no change)
* [`ws@~8.2.3`](https://github.com/websockets/ws/releases/tag/8.2.3) (no change)

## Client[​](#client)

There were some minor bug fixes on the server side, which mandate a client bump.

### Dependencies[​](#dependencies-1)

* [`engine.io-client@~6.2.1`](https://github.com/socketio/engine.io-client/releases/tag/6.2.1) (no change)
* [`ws@~8.2.3`](https://github.com/websockets/ws/releases/tag/8.2.3) (no change)

#### _docs_v4_changelog_4.5.2.md

> Source: https://socket.io/docs/v4/changelog/4.5.2
> Scraped: 4/14/2025, 11:55:36 PM

[Skip to main content](#__docusaurus_skipToContent_fallback)

Latest blog post (July 25, 2024): [npm package provenance](_blog_npm-package-provenance_.md).

Version: 4.x
# Version 4.5.2

_September 2, 2022_

## Server[​](#server)

### Bug Fixes[​](#bug-fixes)

*   prevent the socket from joining a room after disconnection ([18f3fda](https://github.com/socketio/socket.io/commit/18f3fdab12947a9fee3e9c37cfc1da97027d1473))
*   **uws:** prevent the server from crashing after upgrade ([ba497ee](https://github.com/socketio/socket.io/commit/ba497ee3eb52c4abf1464380d015d8c788714364))

### Dependencies[​](#dependencies)

* [`engine.io@~6.2.0`](https://github.com/socketio/engine.io/releases/tag/6.2.0) (no change)
* [`ws@~8.2.3`](https://github.com/websockets/ws/releases/tag/8.2.3) (no change)

## Client[​](#client)

### Bug Fixes[​](#bug-fixes-1)

*   handle ill-formatted packet from server ([c597023](https://github.com/socketio/socket.io-client/commit/c5970231699aa47b00c4a617af4239d0fa90fa53))

### Dependencies[​](#dependencies-1)

* [`engine.io-client@~6.2.1`](https://github.com/socketio/engine.io-client/releases/tag/6.2.1) (no change)
* [`ws@~8.2.3`](https://github.com/websockets/ws/releases/tag/8.2.3) (no change)

#### _docs_v4_changelog_4.5.3.md

> Source: https://socket.io/docs/v4/changelog/4.5.3
> Scraped: 4/14/2025, 11:55:35 PM

[Skip to main content](#__docusaurus_skipToContent_fallback)

Latest blog post (July 25, 2024): [npm package provenance](_blog_npm-package-provenance_.md).

Version: 4.x
# Version 4.5.3

_October 15, 2022_

## Server[​](#server)

### Bug Fixes[​](#bug-fixes)

*   **typings:** accept an HTTP2 server in the constructor ([d3d0a2d](https://github.com/socketio/socket.io/commit/d3d0a2d5beaff51fd145f810bcaf6914213f8a06))
*   **typings:** apply types to "io.timeout(...).emit()" calls ([e357daf](https://github.com/socketio/socket.io/commit/e357daf5858560bc84e7e50cd36f0278d6721ea1))

### Dependencies[​](#dependencies)

* [`engine.io@~6.2.0`](https://github.com/socketio/engine.io/releases/tag/6.2.1) (no change)
* [`ws@~8.2.3`](https://github.com/websockets/ws/releases/tag/8.2.3) (no change)

## Client[​](#client)

### Bug Fixes[​](#bug-fixes-1)

*   do not swallow user exceptions ([2403b88](https://github.com/socketio/socket.io-client/commit/2403b88057bf3fd32eb2047c82be26c455c13a2f))

### Dependencies[​](#dependencies-1)

* [`engine.io-client@~6.2.3`](https://github.com/socketio/engine.io-client/tree/6.2.3) ([https://github.com/socketio/engine.io-client/compare/6.2.1...6.2.3](https://github.com/socketio/engine.io-client/compare/6.2.1...6.2.3))
* [`ws@~8.2.3`](https://github.com/websockets/ws/releases/tag/8.2.3) (no change)

#### _docs_v4_changelog_4.5.4.md

> Source: https://socket.io/docs/v4/changelog/4.5.4
> Scraped: 4/14/2025, 11:55:35 PM

[Skip to main content](#__docusaurus_skipToContent_fallback)

Latest blog post (July 25, 2024): [npm package provenance](_blog_npm-package-provenance_.md).

Version: 4.x
# Version 4.5.4

_November 22, 2022_

## Server[​](#server)

This release contains a bump of:

*   `engine.io` in order to fix [CVE-2022-41940](https://github.com/socketio/engine.io/security/advisories/GHSA-r7qp-cfhv-p84w)
*   `socket.io-parser` in order to fix [CVE-2022-2421](https://github.com/advisories/GHSA-qm95-pgcg-qqfq).

### Dependencies[​](#dependencies)

* [`engine.io@~6.2.1`](https://github.com/socketio/engine.io/releases/tag/6.2.1) ([https://github.com/socketio/engine.io/compare/6.2.0...6.2.1](https://github.com/socketio/engine.io/compare/6.2.0...6.2.1))
* [`ws@~8.2.3`](https://github.com/websockets/ws/releases/tag/8.2.3) (no change)

## Client[​](#client)

This release contains a bump of the `socket.io-parser` dependency, in order to fix [CVE-2022-2421](https://github.com/advisories/GHSA-qm95-pgcg-qqfq).

### Dependencies[​](#dependencies-1)

* [`engine.io-client@~6.2.3`](https://github.com/socketio/engine.io-client/tree/6.2.3) (no change)
* [`ws@~8.2.3`](https://github.com/websockets/ws/releases/tag/8.2.3) (no change)

#### _docs_v4_changelog_4.6.0.md

> Source: https://socket.io/docs/v4/changelog/4.6.0
> Scraped: 4/14/2025, 11:55:36 PM

_February 7, 2023_

### Bug Fixes[​](_docs_v4_changelog_4.6.0.md#bug-fixes)

*   add timeout method to remote socket ([#4558](https://github.com/socketio/socket.io/issues/4558)) ([0c0eb00](https://github.com/socketio/socket.io/commit/0c0eb0016317218c2be3641e706cfaa9bea39a2d))
*   **typings:** properly type emits with timeout ([f3ada7d](https://github.com/socketio/socket.io/commit/f3ada7d8ccc02eeced2b9b9ac8e4bc921eb630d2))

### Features[​](_docs_v4_changelog_4.6.0.md#features)

#### Promise-based acknowledgements[​](_docs_v4_changelog_4.6.0.md#promise-based-acknowledgements)

This commit adds some syntactic sugar around acknowledgements:

*   `emitWithAck()`
```
try {  
  const responses = await io.timeout(1000).emitWithAck("some-event");  console.log(responses); // one response per client} catch (e) {  
  // some clients did not acknowledge the event in the given delay}  
  
io.on("connection", async (socket) => {  
    // without timeout  const response = await socket.emitWithAck("hello", "world");  
  // with a specific timeout  try {    const response = await socket.timeout(1000).emitWithAck("hello", "world");  } catch (err) {    // the client did not acknowledge the event in the given delay  }});  
```
*   `serverSideEmitWithAck()`
```
try {  
  const responses = await io.timeout(1000).serverSideEmitWithAck("some-event");  console.log(responses); // one response per server (except itself)} catch (e) {  
  // some servers did not acknowledge the event in the given delay}  
```
Added in [184f3cf](https://github.com/socketio/socket.io/commit/184f3cf7af57acc4b0948eee307f25f8536eb6c8).

#### Connection state recovery[​](_docs_v4_changelog_4.6.0.md#connection-state-recovery)

This feature allows a client to reconnect after a temporary disconnection and restore its state:

*   id
*   rooms
*   data
*   missed packets

Usage:
```
import { Server } from "socket.io";  
  
const io = new Server({  
  connectionStateRecovery: {    // default values    maxDisconnectionDuration: 2 * 60 * 1000,    skipMiddlewares: true,  },});  
  
io.on("connection", (socket) => {  
  console.log(socket.recovered); // whether the state was recovered or not});  
```
Here's how it works:

*   the server sends a session ID during the handshake (which is different from the current `id` attribute, which is public and can be freely shared)
*   the server also includes an offset in each packet (added at the end of the data array, for backward compatibility)
*   upon temporary disconnection, the server stores the client state for a given delay (implemented at the adapter level)
*   upon reconnection, the client sends both the session ID and the last offset it has processed, and the server tries to restore the state

The in-memory adapter already supports this feature, and we will soon update the Postgres and MongoDB adapters. We will also create a new adapter based on [Redis Streams](https://redis.io/docs/data-types/streams/), which will support this feature.

Added in [54d5ee0](https://github.com/socketio/socket.io/commit/54d5ee05a684371191e207b8089f09fc24eb5107).

#### Compatibility (for real) with Express middlewares[​](_docs_v4_changelog_4.6.0.md#compatibility-for-real-with-express-middlewares)

This feature implements middlewares at the Engine.IO level, because Socket.IO middlewares are meant for namespace authorization and are not executed during a classic HTTP request/response cycle.

Syntax:
```
io.engine.use((req, res, next) => {  
  // do something  
  next();});  
  
// with express-session  
import session from "express-session";  
  
io.engine.use(session({  
  secret: "keyboard cat",  resave: false,  saveUninitialized: true,  cookie: { secure: true }}));  
  
// with helmet  
import helmet from "helmet";  
  
io.engine.use(helmet());  
```
A workaround was possible by using the allowRequest option and the "headers" event, but this feels way cleaner and works with upgrade requests too.

Added in [24786e7](https://github.com/socketio/engine.io/commit/24786e77c5403b1c4b5a2bc84e2af06f9187f74a).

#### Error details in the disconnecting and disconnect events[​](_docs_v4_changelog_4.6.0.md#error-details-in-the-disconnecting-and-disconnect-events)

The `disconnect` event will now contain additional details about the disconnection reason.
```
io.on("connection", (socket) => {  
  socket.on("disconnect", (reason, description) => {    console.log(description);  });});  
```
Added in [8aa9499](https://github.com/socketio/socket.io/commit/8aa94991cee5518567d6254eec04b23f81510257).

#### Automatic removal of empty child namespaces[​](_docs_v4_changelog_4.6.0.md#automatic-removal-of-empty-child-namespaces)

This commit adds a new option, "cleanupEmptyChildNamespaces". With this option enabled (disabled by default), when a socket disconnects from a dynamic namespace and if there are no other sockets connected to it then the namespace will be cleaned up and its adapter will be closed.
```
import { createServer } from "node:http";  
import { Server } from "socket.io";  
  
const httpServer = createServer();  
const io = new Server(httpServer, {  
  cleanupEmptyChildNamespaces: true});  
```
Added in [5d9220b](https://github.com/socketio/socket.io/commit/5d9220b69adf73e086c27bbb63a4976b348f7c4c).

#### A new "addTrailingSlash" option[​](_docs_v4_changelog_4.6.0.md#a-new-addtrailingslash-option)

The trailing slash which was added by default can now be disabled:
```
import { createServer } from "node:http";  
import { Server } from "socket.io";  
  
const httpServer = createServer();  
const io = new Server(httpServer, {  
  addTrailingSlash: false});  
```
In the example above, the clients can omit the trailing slash and use `/socket.io` instead of `/socket.io/`.

Added in [d0fd474](https://github.com/socketio/engine.io/commit/d0fd4746afa396297f07bb62e539b0c1c4018d7c).

### Performance Improvements[​](_docs_v4_changelog_4.6.0.md#performance-improvements)

*   precompute the WebSocket frames when broadcasting ([da2b542](https://github.com/socketio/socket.io/commit/da2b54279749adc5279c9ac4742b01b36c01cff0))

### Dependencies[​](_docs_v4_changelog_4.6.0.md#dependencies)

* [`engine.io@~6.4.0`](https://github.com/socketio/engine.io/releases/tag/6.4.0) ([https://github.com/socketio/engine.io/compare/6.2.1...6.4.0](https://github.com/socketio/engine.io/compare/6.2.1...6.4.0))
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) ([https://github.com/websockets/ws/compare/8.2.3...8.11.0](https://github.com/websockets/ws/compare/8.2.3...8.11.0))

### Bug Fixes[​](_docs_v4_changelog_4.6.0.md#bug-fixes-1)

*   **typings:** do not expose browser-specific types ([4d6d95e](https://github.com/socketio/socket.io-client/commit/4d6d95e0792efd43b78c760b055764fef02ebc9e))
*   ensure manager.socket() returns an active socket ([b7dd891](https://github.com/socketio/socket.io-client/commit/b7dd891e890461d33a104ca9187d5cd30d6f76af))
*   **typings:** properly type emits with timeout ([#1570](https://github.com/socketio/socket.io-client/issues/1570)) ([33e4172](https://github.com/socketio/socket.io-client/commit/33e417258c9a5697e001163971ae87821e9c097f))

### Features[​](_docs_v4_changelog_4.6.0.md#features-1)

#### A new "addTrailingSlash" option[​](_docs_v4_changelog_4.6.0.md#a-new-addtrailingslash-option-1)

The trailing slash which was added by default can now be disabled:
```
import { io } from "socket.io-client";  
  
const socket = io("https://example.com", {  
  addTrailingSlash: false});  
```
In the example above, the request URL will be `https://example.com/socket.io` instead of `https://example.com/socket.io/`.

Added in [21a6e12](https://github.com/socketio/engine.io-client/commit/21a6e1219add92157c5442537d24fbe1129a50f5).

#### Promise-based acknowledgements[​](_docs_v4_changelog_4.6.0.md#promise-based-acknowledgements-1)

This commit adds some syntactic sugar around acknowledgements:
```
// without timeout  
const response = await socket.emitWithAck("hello", "world");  
  
// with a specific timeout  
try {  
  const response = await socket.timeout(1000).emitWithAck("hello", "world");} catch (err) {  
  // the server did not acknowledge the event in the given delay}  
```
Note: environments that [do not support Promises](https://caniuse.com/promises) will need to add a polyfill in order to use this feature.

Added in [47b979d](https://github.com/socketio/socket.io-client/commit/47b979d57388e9b5e9a332f3f4a9873211f0d844).

#### Connection state recovery[​](_docs_v4_changelog_4.6.0.md#connection-state-recovery-1)

This feature allows a client to reconnect after a temporary disconnection and restore its ID and receive any packets that was missed during the disconnection gap. It must be enabled on the server side.

A new boolean attribute named `recovered` is added on the `socket` object:
```
socket.on("connect", () => {  
  console.log(socket.recovered); // whether the recovery was successful});  
```
Added in [54d5ee0](https://github.com/socketio/socket.io/commit/54d5ee05a684371191e207b8089f09fc24eb5107) (server) and [b4e20c5](https://github.com/socketio/socket.io-client/commit/b4e20c5c709b5e9cc03ee9b6bd1d576f4810a817) (client).

#### Retry mechanism[​](_docs_v4_changelog_4.6.0.md#retry-mechanism)

Two new options are available:

*   `retries`: the maximum number of retries. Above the limit, the packet will be discarded.
*   `ackTimeout`: the default timeout in milliseconds used when waiting for an acknowledgement (not to be mixed up with the already existing `timeout` option, which is used by the Manager during the connection)
```
const socket = io({  
  retries: 3,  ackTimeout: 10000});  
  
// implicit ack  
socket.emit("my-event");  
  
// explicit ack  
socket.emit("my-event", (err, val) => { /* ... */ });  
  
// custom timeout (in that case the ackTimeout is optional)  
socket.timeout(5000).emit("my-event", (err, val) => { /* ... */ });  
```
In all examples above, "my-event" will be sent up to 4 times (1 + 3), until the server sends an acknowledgement.

Assigning a unique ID to each packet is the duty of the user, in order to allow deduplication on the server side.

Added in [655dce9](https://github.com/socketio/socket.io-client/commit/655dce97556a1ea44a60db6b694d0cfd85b5f70f).

### Dependencies[​](_docs_v4_changelog_4.6.0.md#dependencies-1)

* [`engine.io-client@~6.4.0`](https://github.com/socketio/engine.io-client/releases/tag/6.4.0) ([diff](https://github.com/socketio/engine.io-client/compare/6.2.3...6.4.0))
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) ([diff](https://github.com/websockets/ws/compare/8.2.3...8.11.0))

#### _docs_v4_changelog_4.6.1.md

> Source: https://socket.io/docs/v4/changelog/4.6.1
> Scraped: 4/14/2025, 11:55:36 PM

[Skip to main content](#__docusaurus_skipToContent_fallback)

Latest blog post (July 25, 2024): [npm package provenance](_blog_npm-package-provenance_.md).

Version: 4.x
# Version 4.6.1

_February 20, 2023_

## Server[​](#server)

### Bug Fixes[​](#bug-fixes)

*   properly handle manually created dynamic namespaces ([0d0a7a2](https://github.com/socketio/socket.io/commit/0d0a7a22b5ff95f864216c529114b7dd41738d1e))
*   **types:** fix nodenext module resolution compatibility ([#4625](https://github.com/socketio/socket.io/issues/4625)) ([d0b22c6](https://github.com/socketio/socket.io/commit/d0b22c630208669aceb7ae013180c99ef90279b0))

### Dependencies[​](#dependencies)

* [`engine.io@~6.4.0`](https://github.com/socketio/engine.io/releases/tag/6.4.0) (no change)
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

## Client[​](#client)

### Bug Fixes[​](#bug-fixes-1)

*   do not drain the queue while the socket is offline ([4996f9e](https://github.com/socketio/socket.io-client/commit/4996f9ee71074e2d62a0f8fa95fcf7d43e99615d))
*   prevent duplicate connections when multiplexing ([46213a6](https://github.com/socketio/socket.io-client/commit/46213a647ea0d4453b00bca09268f69ffd259509))

### Dependencies[​](#dependencies-1)

* [`engine.io-client@~6.4.0`](https://github.com/socketio/engine.io-client/releases/tag/6.4.0) (no change)
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

#### _docs_v4_changelog_4.6.2.md

> Source: https://socket.io/docs/v4/changelog/4.6.2
> Scraped: 4/14/2025, 11:55:35 PM

[Skip to main content](#__docusaurus_skipToContent_fallback)

Latest blog post (July 25, 2024): [npm package provenance](_blog_npm-package-provenance_.md).

Version: 4.x
# Version 4.6.2

_May 31, 2023_

## Server[​](#server)

### Bug Fixes[​](#bug-fixes)

*   **exports:** move `types` condition to the top ([#4698](https://github.com/socketio/socket.io/issues/4698)) ([3d44aae](https://github.com/socketio/socket.io/commit/3d44aae381af38349fdb808d510d9f47a0c2507e))

### Dependencies[​](#dependencies)

* [`engine.io@~6.4.2`](https://github.com/socketio/engine.io/releases/tag/6.4.0) ([diff](https://github.com/socketio/engine.io/compare/6.4.1...6.4.2))
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

## Client[​](#client)

### Bug Fixes[​](#bug-fixes-1)

*   **exports:** move `types` condition to the top ([#1580](https://github.com/socketio/socket.io-client/issues/1580)) ([7ead241](https://github.com/socketio/socket.io-client/commit/7ead241ecfd9f122db6789b5f2d11c04e9427953))

### Dependencies[​](#dependencies-1)

* [`engine.io-client@~6.4.0`](https://github.com/socketio/engine.io-client/releases/tag/6.4.0) (no change)
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

#### _docs_v4_changelog_4.7.0.md

> Source: https://socket.io/docs/v4/changelog/4.7.0
> Scraped: 4/14/2025, 11:55:35 PM

_June 22, 2023_

### Bug Fixes[​](_docs_v4_changelog_4.7.0.md#bug-fixes)

*   remove the Partial modifier from the socket.data type ([#4740](https://github.com/socketio/socket.io/issues/4740)) ([e5c62ca](https://github.com/socketio/socket.io/commit/e5c62cad60fc7d16fbb024fd9be1d1880f4e6f5f))

### Features[​](_docs_v4_changelog_4.7.0.md#features)

#### Support for WebTransport[​](_docs_v4_changelog_4.7.0.md#support-for-webtransport)

The Socket.IO server can now use WebTransport as the underlying transport.

WebTransport is a web API that uses the HTTP/3 protocol as a bidirectional transport. It's intended for two-way communications between a web client and an HTTP/3 server.

References:

* [https://w3c.github.io/webtransport/](https://w3c.github.io/webtransport/)
* [https://developer.mozilla.org/en-US/docs/Web/API/WebTransport](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport)
* [https://developer.chrome.com/articles/webtransport/](https://developer.chrome.com/articles/webtransport/)

Until WebTransport support lands [in Node.js](https://github.com/nodejs/node/issues/38478), you can use the `@fails-components/webtransport` package:
```
import { readFileSync } from "fs";  
import { createServer } from "https";  
import { Server } from "socket.io";  
import { Http3Server } from "@fails-components/webtransport";  
  
// WARNING: the total length of the validity period MUST NOT exceed two weeks (https://w3c.github.io/webtransport/#custom-certificate-requirements)  
const cert = readFileSync("/path/to/my/cert.pem");  
const key = readFileSync("/path/to/my/key.pem");  
  
const httpsServer = createServer({  
  key,  cert});  
  
httpsServer.listen(3000);  
  
const io = new Server(httpsServer, {  
  transports: ["polling", "websocket", "webtransport"] // WebTransport is not enabled by default});  
  
const h3Server = new Http3Server({  
  port: 3000,  host: "0.0.0.0",  secret: "changeit",  cert,  privKey: key,});  
  
(async () => {  
  const stream = await h3Server.sessionStream("/engine.io/");  const sessionReader = stream.getReader();  
  while (true) {    const { done, value } = await sessionReader.read();    if (done) {      break;    }    io.engine.onWebTransportSession(value);  }})();  
  
h3Server.startServer();  
```
Added in [123b68c](https://github.com/socketio/engine.io/commit/123b68c04f9e971f59b526e0f967a488ee6b0116).

The bundles will now have the right `Access-Control-Allow-xxx` headers.

Added in [63f181c](https://github.com/socketio/socket.io/commit/63f181cc12cbbbf94ed40eef52d60f36a1214fbe).

### Dependencies[​](_docs_v4_changelog_4.7.0.md#dependencies)

* [`engine.io@~6.5.0`](https://github.com/socketio/engine.io/releases/tag/6.5.0) ([diff](https://github.com/socketio/engine.io/compare/6.4.2...6.5.0))
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

### Bug Fixes[​](_docs_v4_changelog_4.7.0.md#bug-fixes-1)

*   properly report timeout error when connecting ([5bc94b5](https://github.com/socketio/socket.io-client/commit/5bc94b56bc1788bab16d9d514d2c8abf3b1d8f87))
*   use same scope for setTimeout and clearTimeout calls ([#1568](https://github.com/socketio/socket.io-client/issues/1568)) ([f2892ab](https://github.com/socketio/socket.io-client/commit/f2892aba0beeae7c9be930221655d7da6094c5f1))

### Features[​](_docs_v4_changelog_4.7.0.md#features-1)

#### Support for WebTransport[​](_docs_v4_changelog_4.7.0.md#support-for-webtransport-1)

The Socket.IO client can now use WebTransport as the underlying transport.

WebTransport is a web API that uses the HTTP/3 protocol as a bidirectional transport. It's intended for two-way communications between a web client and an HTTP/3 server.

References:

* [https://w3c.github.io/webtransport/](https://w3c.github.io/webtransport/)
* [https://developer.mozilla.org/en-US/docs/Web/API/WebTransport](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport)
* [https://developer.chrome.com/articles/webtransport/](https://developer.chrome.com/articles/webtransport/)

**For Node.js clients**: until WebTransport support lands [in Node.js](https://github.com/nodejs/node/issues/38478), you can use the `@fails-components/webtransport` package:
```
import { WebTransport } from "@fails-components/webtransport";  
  
global.WebTransport = WebTransport;  
```
Added in [7195c0f](https://github.com/socketio/engine.io-client/commit/7195c0f305b482f7b1ca2ed812030caaf72c0906).

#### Cookie management for the Node.js client[​](_docs_v4_changelog_4.7.0.md#cookie-management-for-the-nodejs-client)

When setting the `withCredentials` option to `true`, the Node.js client will now include the cookies in the HTTP requests, making it easier to use it with cookie-based sticky sessions.
```
import { io } from "socket.io-client";  
  
const socket = io("https://example.com", {  
  withCredentials: true});  
```
Added in [5fc88a6](https://github.com/socketio/engine.io-client/commit/5fc88a62d4017cdc144fa39b9755deadfff2db34).

#### Conditional import of the ESM build with debug logs[​](_docs_v4_changelog_4.7.0.md#conditional-import-of-the-esm-build-with-debug-logs)

By default, the ESM build does not include the `debug` package in the browser environments, because it increases the bundle size (see [16b6569](https://github.com/socketio/socket.io-client/commit/16b65698aed766e1e645c78847f2e91bfc5b6f56)).

Which means that, unfortunately, debug logs are not available in the devtools console, even when setting the `localStorage.debug = ...` attribute.

You can now import the build which includes the `debug` packages with a [conditional import](https://nodejs.org/api/packages.html#conditional-exports). Example with vite:
```
import { defineConfig } from 'vite'  
import react from '@vitejs/plugin-react'  
  
export default defineConfig({  
  plugins: [react()],  server: {    port: 4000  },  resolve: {    conditions: ["development"]  }})  
```
Reference: [https://v2.vitejs.dev/config/#resolve-conditions](https://v2.vitejs.dev/config/#resolve-conditions)

Added in [781d753](https://github.com/socketio/socket.io-client/commit/781d753a626d01e675056a2ff4e27f5dd599564f).

### Dependencies[​](_docs_v4_changelog_4.7.0.md#dependencies-1)

* [`engine.io-client@~6.5.0`](https://github.com/socketio/engine.io-client/releases/tag/6.5.0) ([diff](https://github.com/socketio/engine.io-client/compare/6.4.0...6.5.0))
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

#### _docs_v4_changelog_4.7.1.md

> Source: https://socket.io/docs/v4/changelog/4.7.1
> Scraped: 4/14/2025, 11:55:35 PM

_June 28, 2023_

## Server[​](_docs_v4_changelog_4.7.1.md#server)

The client bundle contains a few fixes regarding the WebTransport support.

### Dependencies[​](_docs_v4_changelog_4.7.1.md#dependencies)

* [`engine.io@~6.5.0`](https://github.com/socketio/engine.io/releases/tag/6.5.0) (no change)
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

## Client[​](_docs_v4_changelog_4.7.1.md#client)

Some bug fixes are included from the `engine.io-client` package:

*   make closeOnBeforeunload default to false ([a63066b](https://github.com/socketio/engine.io-client/commit/a63066bdc8ae9e6746c3113d06c2ead78f4a4851))
*   **webtransport:** properly handle abruptly closed connections ([cf6aa1f](https://github.com/socketio/engine.io-client/commit/cf6aa1f43c27a56c076bf26fddfce74bfeb65040))

### Dependencies[​](_docs_v4_changelog_4.7.1.md#dependencies-1)

* [`engine.io-client@~6.5.1`](https://github.com/socketio/engine.io-client/releases/tag/6.5.1) ([diff](https://github.com/socketio/engine.io-client/compare/6.5.0...6.5.1))
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

#### _docs_v4_changelog_4.7.2.md

> Source: https://socket.io/docs/v4/changelog/4.7.2
> Scraped: 4/14/2025, 11:55:35 PM

[Skip to main content](#__docusaurus_skipToContent_fallback)

Latest blog post (July 25, 2024): [npm package provenance](_blog_npm-package-provenance_.md).

Version: 4.x
# Version 4.7.2

_August 2, 2023_

## Server[​](#server)

### Bug Fixes[​](#bug-fixes)

*   clean up child namespace when client is rejected in middleware ([#4773](https://github.com/socketio/socket.io/issues/4773)) ([0731c0d](https://github.com/socketio/socket.io/commit/0731c0d2f497d5cce596ea1ec32a67c08bcccbcd))
*   **webtransport:** properly handle WebTransport-only connections ([3468a19](https://github.com/socketio/socket.io/commit/3468a197afe87e65eb0d779fabd347fe683013ab))
*   **webtransport:** add proper framing ([a306db0](https://github.com/socketio/engine.io/commit/a306db09e8ddb367c7d62f45fec920f979580b7c))

### Dependencies[​](#dependencies)

* [`engine.io@~6.5.2`](https://github.com/socketio/engine.io/releases/tag/6.5.2) ([diff](https://github.com/socketio/engine.io/compare/6.5.0...6.5.2))
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

## Client[​](#client)

### Bug Fixes[​](#bug-fixes-1)

Some bug fixes are included from the `engine.io-client` package:

*   **webtransport:** add proper framing ([d55c39e](https://github.com/socketio/engine.io-client/commit/d55c39e0ed5cb7b3a34875a398efc111c91184f6))
*   **webtransport:** honor the binaryType attribute ([8270e00](https://github.com/socketio/engine.io-client/commit/8270e00d5b865278d136a4d349b344cbc2b38dc5))

### Dependencies[​](#dependencies-1)

* [`engine.io-client@~6.5.2`](https://github.com/socketio/engine.io-client/releases/tag/6.5.2) ([diff](https://github.com/socketio/engine.io-client/compare/6.5.1...6.5.2))
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

#### _docs_v4_changelog_4.7.3.md

> Source: https://socket.io/docs/v4/changelog/4.7.3
> Scraped: 4/14/2025, 11:55:35 PM

[Skip to main content](#__docusaurus_skipToContent_fallback)

Latest blog post (July 25, 2024): [npm package provenance](_blog_npm-package-provenance_.md).

Version: 4.x
# Version 4.7.3

_January 3, 2024_

## Server[​](#server)

### Bug Fixes[​](#bug-fixes)

*   return the first response when broadcasting to a single socket ([#4878](https://github.com/socketio/socket.io/issues/4878)) ([df8e70f](https://github.com/socketio/socket.io/commit/df8e70f79822e3887b4f21ca718af8a53bbda2c4))
*   **typings:** allow to bind to a non-secure Http2Server ([#4853](https://github.com/socketio/socket.io/issues/4853)) ([8c9ebc3](https://github.com/socketio/socket.io/commit/8c9ebc30e5452ff9381af5d79f547394fa55633c))

### Dependencies[​](#dependencies)

* [`engine.io@~6.5.2`](https://github.com/socketio/engine.io/releases/tag/6.5.2) (no change)
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

## Client[​](#client)

### Bug Fixes[​](#bug-fixes-1)

*   improve compatibility with node16 module resolution ([#1595](https://github.com/socketio/socket.io-client/issues/1595)) ([605de78](https://github.com/socketio/socket.io-client/commit/605de78d2cd7303bf25d9e2146e2b707dbf63d4f))
*   **typings:** accept string | undefined as init argument ([5a3eafe](https://github.com/socketio/socket.io-client/commit/5a3eafed1c4118ac3a06ec81a24491eec7d0655f))
*   **typings:** fix the type of the socket#id attribute ([f9c16f2](https://github.com/socketio/socket.io-client/commit/f9c16f226512fc8a8df461e3a07e392720462165))

### Dependencies[​](#dependencies-1)

* [`engine.io-client@~6.5.2`](https://github.com/socketio/engine.io-client/releases/tag/6.5.2) (no change)
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

#### _docs_v4_changelog_4.7.4.md

> Source: https://socket.io/docs/v4/changelog/4.7.4
> Scraped: 4/14/2025, 11:55:35 PM

[Skip to main content](#__docusaurus_skipToContent_fallback)

Latest blog post (July 25, 2024): [npm package provenance](_blog_npm-package-provenance_.md).

Version: 4.x
# Version 4.7.4

_January 12, 2024_

## Server[​](#server)

### Bug Fixes[​](#bug-fixes)

*   **typings:** calling io.emit with no arguments incorrectly errored ([cb6d2e0](https://github.com/socketio/socket.io/commit/cb6d2e02aa7ec03c2de1817d35cffa1128b107ef)), closes [#4914](https://github.com/socketio/socket.io/issues/4914)

### Dependencies[​](#dependencies)

* [`engine.io@~6.5.2`](https://github.com/socketio/engine.io/releases/tag/6.5.2) (no change)
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

## Client[​](#client)

There were some minor bug fixes on the server side, which mandate a client bump.

### Dependencies[​](#dependencies-1)

* [`engine.io-client@~6.5.2`](https://github.com/socketio/engine.io-client/releases/tag/6.5.2) (no change)
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

#### _docs_v4_changelog_4.7.5.md

> Source: https://socket.io/docs/v4/changelog/4.7.5
> Scraped: 4/14/2025, 11:55:34 PM

[Skip to main content](#__docusaurus_skipToContent_fallback)

Latest blog post (July 25, 2024): [npm package provenance](_blog_npm-package-provenance_.md).

Version: 4.x
# Version 4.7.5

_March 14, 2024_

## Server[​](#server)

### Bug Fixes[​](#bug-fixes)

*   close the adapters when the server is closed ([bf64870](https://github.com/socketio/socket.io/commit/bf64870957e626a73e0544716a1a41a4ba5093bb))
*   remove duplicate pipeline when serving bundle ([e426f3e](https://github.com/socketio/socket.io/commit/e426f3e8e1bfea5720c32d30a3663303200ee6ad))

### Dependencies[​](#dependencies)

* [`engine.io@~6.5.2`](https://github.com/socketio/engine.io/releases/tag/6.5.2) (no change)
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

## Client[​](#client)

### Bug Fixes[​](#bug-fixes-1)

*   discard acknowledgements upon disconnection ([34cbfbb](https://github.com/socketio/socket.io-client/commit/34cbfbb532ae333f4dd034138e8f87cb80a8e382))

### Dependencies[​](#dependencies-1)

* [`engine.io-client@~6.5.2`](https://github.com/socketio/engine.io-client/releases/tag/6.5.2) (no change)
* [`ws@~8.11.0`](https://github.com/websockets/ws/releases/tag/8.11.0) (no change)

#### _docs_v4_changelog_4.8.0.md

> Source: https://socket.io/docs/v4/changelog/4.8.0
> Scraped: 4/14/2025, 11:55:34 PM

```
import { io } from "socket.io-client";  
import { Fetch, WebSocket } from "engine.io-client";  
  
const socket = io({  
  transports: [Fetch, WebSocket]});  
```
When setting the `tryAllTransports` option to `true`, if the first transport (usually, HTTP long-polling) fails, then the other transports will be tested too:

The only potential downside is that the connection attempt could take more time in case of failure, as there have been reports of WebSocket connection errors taking several seconds before being detected (that's one reason for using HTTP long-polling first). That's why the option defaults to `false` for now.

#### _docs_v4_changelog_4.8.1.md

> Source: https://socket.io/docs/v4/changelog/4.8.1
> Scraped: 4/14/2025, 11:55:34 PM

_October 25, 2024_

## Server[​](_docs_v4_changelog_4.8.1.md#server)

Due to a change in the bundler configuration, the production bundle (`socket.io.min.js`) did not support sending and receiving binary data in version `4.8.0`. This is now fixed.

### Dependencies[​](_docs_v4_changelog_4.8.1.md#dependencies)

* [`engine.io@~6.6.0`](https://github.com/socketio/engine.io/releases/tag/6.5.2) (no change)
* [`ws@~8.17.1`](https://github.com/websockets/ws/releases/tag/8.17.1) (no change)

## Client[​](_docs_v4_changelog_4.8.1.md#client)

### Bug Fixes[​](_docs_v4_changelog_4.8.1.md#bug-fixes)

*   **bundle:** do not mangle the "\_placeholder" attribute ([ca9e994](https://github.com/socketio/socket.io/commit/ca9e994815aa2e31e0342e37ccdc2e9e8c5fd13c))

### Dependencies[​](_docs_v4_changelog_4.8.1.md#dependencies-1)

* [`engine.io-client@~6.6.1`](https://github.com/socketio/engine.io-client/releases/tag/6.5.2) (no change)
* [`ws@~8.17.1`](https://github.com/websockets/ws/releases/tag/8.17.1) (no change)

#### _docs_v4_client-api.md

> Source: https://socket.io/docs/v4/client-api
> Scraped: 4/14/2025, 11:55:33 PM

The `io` method is bound to the global scope in the standalone build:
```
<script src="/socket.io/socket.io.js"></script>  
<script>  
  const socket = io();</script>  
```
An ESM bundle is also available since version [4.3.0](_blog_socket-io-4-3-0_.md):
```
<script type="module">  
  import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";  
  const socket = io();</script>  
```
With an [import map](https://caniuse.com/import-maps):
```
<script type="importmap">  
  {    "imports": {      "socket.io-client": "https://cdn.socket.io/4.8.1/socket.io.esm.min.js"    }  }</script>  
  
<script type="module">  
  import { io } from "socket.io-client";  
  const socket = io();</script>  
```
Else, in all other cases (with some build tools, in Node.js or React Native), it can be imported from the `socket.io-client` package:
```
// ES modules  
import { io } from "socket.io-client";  
  
// CommonJS  
const { io } = require("socket.io-client");  
```
### io.protocol[​](_docs_v4_client-api.md#ioprotocol)

* [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)

The protocol revision number (currently: 5).

The protocol defines the format of the packets exchanged between the client and the server. Both the client and the server must use the same revision in order to understand each other.

You can find more information [here](https://github.com/socketio/socket.io-protocol).

### io(\[url\]\[, options\])[​](_docs_v4_client-api.md#iourl)

*   `url` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) (defaults to `window.location.host`)
*   `options` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `forceNew` [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type) whether to create a new connection
*   **Returns** [`<Socket>`](_docs_v4_client-api.md#socket)

Creates a new `Manager` for the given URL, and attempts to reuse an existing `Manager` for subsequent calls, unless the `multiplex` option is passed with `false`. Passing this option is the equivalent of passing `"force new connection": true` or `forceNew: true`.

A new `Socket` instance is returned for the namespace specified by the pathname in the URL, defaulting to `/`. For example, if the `url` is `http://localhost/users`, a transport connection will be established to `http://localhost` and a Socket.IO connection will be established to `/users`.

Query parameters can also be provided, either with the `query` option or directly in the url (example: `http://localhost/users?token=abc`).

To understand what happens under the hood, the following example:
```
import { io } from "socket.io-client";  
  
const socket = io("ws://example.com/my-namespace", {  
  reconnectionDelayMax: 10000,  auth: {    token: "123"  },  query: {    "my-key": "my-value"  }});  
```
is the short version of:
```
import { Manager } from "socket.io-client";  
  
const manager = new Manager("ws://example.com", {  
  reconnectionDelayMax: 10000,  query: {    "my-key": "my-value"  }});  
  
const socket = manager.socket("/my-namespace", {  
  auth: {    token: "123"  }});  
```
The complete list of available options can be found [here](_docs_v4_client-options_.md).

![Manager in the class diagram for the client](https://socket.io/images/client-class-diagram-manager.png)![Manager in the class diagram for the client](https://socket.io/images/client-class-diagram-manager-dark.png)

The `Manager` _manages_ the Engine.IO [client](https://github.com/socketio/engine.io-client/) instance, which is the low-level engine that establishes the connection to the server (by using transports like WebSocket or HTTP long-polling).

The `Manager` handles the reconnection logic.

A single `Manager` can be used by several [Sockets](_docs_v4_client-api.md#socket). You can find more information about this multiplexing feature [here](_docs_v4_namespaces_.md).

Please note that, in most cases, you won't use the Manager directly but use the [Socket](_docs_v4_client-api.md#socket) instance instead.

### Constructor[​](_docs_v4_client-api.md#constructor)

#### new Manager(url\[, options\])[​](_docs_v4_client-api.md#new-managerurl-options)

*   `url` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   `options` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   **Returns** [`<Manager>`](_docs_v4_client-api.md#manager)

The complete list of available options can be found [here](_docs_v4_client-options_.md).
```
import { Manager } from "socket.io-client";  
  
const manager = new Manager("https://example.com");  
  
const socket = manager.socket("/"); // main namespace  
const adminSocket = manager.socket("/admin"); // admin namespace  
```
### Events[​](_docs_v4_client-api.md#events)

#### Event: 'error'[​](_docs_v4_client-api.md#event-error)

*   `error` [`<Error>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) error object

Fired upon a connection error.
```
socket.io.on("error", (error) => {  
  // ...});  
```
#### Event: 'ping'[​](_docs_v4_client-api.md#event-ping)

Fired when a ping packet is received from the server.
```
socket.io.on("ping", () => {  
  // ...});  
```
#### Event: 'reconnect'[​](_docs_v4_client-api.md#event-reconnect)

*   `attempt` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type) reconnection attempt number

Fired upon a successful reconnection.
```
socket.io.on("reconnect", (attempt) => {  
  // ...});  
```
#### Event: 'reconnect\_attempt'[​](_docs_v4_client-api.md#event-reconnect_attempt)

*   `attempt` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type) reconnection attempt number

Fired upon an attempt to reconnect.
```
socket.io.on("reconnect_attempt", (attempt) => {  
  // ...});  
```
#### Event: 'reconnect\_error'[​](_docs_v4_client-api.md#event-reconnect_error)

*   `error` [`<Error>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) error object

Fired upon a reconnection attempt error.
```
socket.io.on("reconnect_error", (error) => {  
  // ...});  
```
#### Event: 'reconnect\_failed'[​](_docs_v4_client-api.md#event-reconnect_failed)

Fired when couldn't reconnect within `reconnectionAttempts`.
```
socket.io.on("reconnect_failed", () => {  
  // ...});  
```
### Methods[​](_docs_v4_client-api.md#methods)

#### manager.connect(\[callback\])[​](_docs_v4_client-api.md#managerconnectcallback)

Synonym of [manager.open(\[callback\])](_docs_v4_client-api.md#manageropencallback).

#### manager.open(\[callback\])[​](_docs_v4_client-api.md#manageropencallback)

*   `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** [`<Manager>`](_docs_v4_client-api.md#manager)

If the manager was initiated with `autoConnect` to `false`, launch a new connection attempt.

The `callback` argument is optional and will be called once the attempt fails/succeeds.
```
import { Manager } from "socket.io-client";  
  
const manager = new Manager("https://example.com", {  
  autoConnect: false});  
  
const socket = manager.socket("/");  
  
manager.open((err) => {  
  if (err) {    // an error has occurred  } else {    // the connection was successfully established  }});  
```
#### manager.reconnection(\[value\])[​](_docs_v4_client-api.md#managerreconnectionvalue)

*   `value` [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)
*   **Returns** [`<Manager>`](_docs_v4_client-api.md#manager) | [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

Sets the `reconnection` option, or returns it if no parameters are passed.

#### manager.reconnectionAttempts(\[value\])[​](_docs_v4_client-api.md#managerreconnectionattemptsvalue)

*   `value` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
*   **Returns** [`<Manager>`](_docs_v4_client-api.md#manager) | [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)

Sets the `reconnectionAttempts` option, or returns it if no parameters are passed.

#### manager.reconnectionDelay(\[value\])[​](_docs_v4_client-api.md#managerreconnectiondelayvalue)

*   `value` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
*   **Returns** [`<Manager>`](_docs_v4_client-api.md#manager) | [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)

Sets the `reconnectionDelay` option, or returns it if no parameters are passed.

#### manager.reconnectionDelayMax(\[value\])[​](_docs_v4_client-api.md#managerreconnectiondelaymaxvalue)

*   `value` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
*   **Returns** [`<Manager>`](_docs_v4_client-api.md#manager) | [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)

Sets the `reconnectionDelayMax` option, or returns it if no parameters are passed.

#### manager.socket(nsp, options)[​](_docs_v4_client-api.md#managersocketnsp-options)

*   `nsp` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   `options` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   **Returns** [`<Socket>`](_docs_v4_client-api.md#socket)

Creates a new `Socket` for the given namespace. Only `auth` (`{ auth: {key: "value"} }`) is read from the `options` object. Other keys will be ignored and should be passed when instancing a `new Manager(nsp, options)`.

#### manager.timeout(\[value\])[​](_docs_v4_client-api.md#managertimeoutvalue)

*   `value` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
*   **Returns** [`<Manager>`](_docs_v4_client-api.md#manager) | [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)

Sets the `timeout` option, or returns it if no parameters are passed.

![Socket in the class diagram for the client](https://socket.io/images/client-class-diagram-socket.png)![Socket in the class diagram for the client](https://socket.io/images/client-class-diagram-socket-dark.png)

A `Socket` is the fundamental class for interacting with the server. A `Socket` belongs to a certain [Namespace](_docs_v4_namespaces_.md) (by default `/`) and uses an underlying [Manager](_docs_v4_client-api.md#manager) to communicate.

A `Socket` is basically an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) which sends events to — and receive events from — the server over the network.
```
socket.emit("hello", { a: "b", c: [] });  
  
socket.on("hey", (...args) => {  
  // ...});  
```
More information can be found [here](_docs_v4_client-socket-instance_.md).

### Events[​](_docs_v4_client-api.md#events-1)

#### Event: 'connect'[​](_docs_v4_client-api.md#event-connect)

This event is fired by the Socket instance upon connection **and** reconnection.
```
socket.on("connect", () => {  
  // ...});  
```
caution

Event handlers shouldn't be registered in the `connect` handler itself, as a new handler will be registered every time the socket instance reconnects:

BAD ⚠️
```
socket.on("connect", () => {  
  socket.on("data", () => { /* ... */ });});  
```
GOOD 👍
```
socket.on("connect", () => {  
  // ...});  
  
socket.on("data", () => { /* ... */ });  
```
#### Event: 'connect\_error'[​](_docs_v4_client-api.md#event-connect_error)

*   `error` [`<Error>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

This event is fired upon connection failure.

Reason

Automatic reconnection?

The low-level connection cannot be established (temporary failure)

✅ YES

The connection was denied by the server in a [middleware function](_docs_v4_middlewares_.md)

❌ NO

The [`socket.active`](_docs_v4_client-api.md#socketactive) attribute indicates whether the socket will automatically try to reconnect after a small [randomized delay](_docs_v4_client-options_.md#reconnectiondelay):
```
socket.on("connect_error", (error) => {  
  if (socket.active) {    // temporary failure, the socket will automatically try to reconnect  } else {    // the connection was denied by the server    // in that case, `socket.connect()` must be manually called in order to reconnect    console.log(error.message);  }});  
```
#### Event: 'disconnect'[​](_docs_v4_client-api.md#event-disconnect)

*   `reason` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   `details` `<DisconnectDetails>`

This event is fired upon disconnection.
```
socket.on("disconnect", (reason, details) => {  
  // ...});  
```
Here is the list of possible reasons:

Reason

Description

Automatic reconnection?

`io server disconnect`

The server has forcefully disconnected the socket with [socket.disconnect()](_docs_v4_server-api_.md#socketdisconnectclose)

❌ NO

`io client disconnect`

The socket was manually disconnected using [socket.disconnect()](_docs_v4_client-api_.md#socketdisconnect)

❌ NO

`ping timeout`

The server did not send a PING within the `pingInterval + pingTimeout` range

✅ YES

`transport close`

The connection was closed (example: the user has lost connection, or the network was changed from WiFi to 4G)

✅ YES

`transport error`

The connection has encountered an error (example: the server was killed during a HTTP long-polling cycle)

✅ YES

The [`socket.active`](_docs_v4_client-api.md#socketactive) attribute indicates whether the socket will automatically try to reconnect after a small [randomized delay](_docs_v4_client-options_.md#reconnectiondelay):
```
socket.on("disconnect", (reason) => {  
  if (socket.active) {    // temporary disconnection, the socket will automatically try to reconnect  } else {    // the connection was forcefully closed by the server or the client itself    // in that case, `socket.connect()` must be manually called in order to reconnect    console.log(reason);  }});  
```
### Attributes[​](_docs_v4_client-api.md#attributes)

#### socket.active[​](_docs_v4_client-api.md#socketactive)

* [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

Whether the socket will automatically try to reconnect.

This attribute can be used after a connection failure:
```
socket.on("connect_error", (error) => {  
  if (socket.active) {    // temporary failure, the socket will automatically try to reconnect  } else {    // the connection was denied by the server    // in that case, `socket.connect()` must be manually called in order to reconnect    console.log(error.message);  }});  
```
Or after a disconnection:
```
socket.on("disconnect", (reason) => {  
  if (socket.active) {    // temporary disconnection, the socket will automatically try to reconnect  } else {    // the connection was forcefully closed by the server or the client itself    // in that case, `socket.connect()` must be manually called in order to reconnect    console.log(reason);  }});  
```
#### socket.connected[​](_docs_v4_client-api.md#socketconnected)

* [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

Whether the socket is currently connected to the server.
```
const socket = io();  
  
console.log(socket.connected); // false  
  
socket.on("connect", () => {  
  console.log(socket.connected); // true});  
```
#### socket.disconnected[​](_docs_v4_client-api.md#socketdisconnected)

* [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

Whether the socket is currently disconnected from the server.
```
const socket = io();  
  
console.log(socket.disconnected); // true  
  
socket.on("connect", () => {  
  console.log(socket.disconnected); // false});  
```
#### socket.id[​](_docs_v4_client-api.md#socketid)

* [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)

A unique identifier for the socket session. Set after the `connect` event is triggered, and updated after the `reconnect` event.
```
const socket = io();  
  
console.log(socket.id); // undefined  
  
socket.on("connect", () => {  
  console.log(socket.id); // "G5p5..."});  
```
caution

The `id` attribute is an **ephemeral** ID that is not meant to be used in your application (or only for debugging purposes) because:

*   this ID is regenerated after each reconnection (for example when the WebSocket connection is severed, or when the user refreshes the page)
*   two different browser tabs will have two different IDs
*   there is no message queue stored for a given ID on the server (i.e. if the client is disconnected, the messages sent from the server to this ID are lost)

Please use a regular session ID instead (either sent in a cookie, or stored in the localStorage and sent in the [`auth`](_docs_v4_client-options_.md#auth) payload).

#### socket.io[​](_docs_v4_client-api.md#socketio)

* [`<Manager>`](_docs_v4_client-api.md#manager)

A reference to the underlying [Manager](_docs_v4_client-api.md#manager).
```
socket.on("connect", () => {  
  const engine = socket.io.engine;  console.log(engine.transport.name); // in most cases, prints "polling"  
  engine.once("upgrade", () => {    // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)    console.log(engine.transport.name); // in most cases, prints "websocket"  });  
  engine.on("packet", ({ type, data }) => {    // called for each packet received  });  
  engine.on("packetCreate", ({ type, data }) => {    // called for each packet sent  });  
  engine.on("drain", () => {    // called when the write buffer is drained  });  
  engine.on("close", (reason) => {    // called when the underlying connection is closed  });});  
```
#### socket.recovered[​](_docs_v4_client-api.md#socketrecovered)

_Added in v4.6.0_

* [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

Whether the connection state was successfully recovered during the last reconnection.
```
socket.on("connect", () => {  
  if (socket.recovered) {    // any event missed during the disconnection period will be received now  } else {    // new or unrecoverable session  }});  
```
More information about this feature [here](_docs_v4_connection-state-recovery.md).

### Methods[​](_docs_v4_client-api.md#methods-1)

#### socket.close()[​](_docs_v4_client-api.md#socketclose)

_Added in v1.0.0_

Synonym of [socket.disconnect()](_docs_v4_client-api.md#socketdisconnect).

#### socket.compress(value)[​](_docs_v4_client-api.md#socketcompressvalue)

*   `value` [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)
*   **Returns** [`<Socket>`](_docs_v4_client-api.md#socket)

Sets a modifier for a subsequent event emission that the event data will only be _compressed_ if the value is `true`. Defaults to `true` when you don't call the method.
```
socket.compress(false).emit("an event", { some: "data" });  
```
#### socket.connect()[​](_docs_v4_client-api.md#socketconnect)

_Added in v1.0.0_

*   **Returns** `Socket`

Manually connects the socket.
```
const socket = io({  
  autoConnect: false});  
  
// ...  
socket.connect();  
```
It can also be used to manually reconnect:
```
socket.on("disconnect", () => {  
  socket.connect();});  
```
#### socket.disconnect()[​](_docs_v4_client-api.md#socketdisconnect)

_Added in v1.0.0_

*   **Returns** [`<Socket>`](_docs_v4_client-api.md#socket)

Manually disconnects the socket. In that case, the socket will not try to reconnect.

Associated disconnection reason:

*   client-side: `"io client disconnect"`
*   server-side: `"client namespace disconnect"`

If this is the last active Socket instance of the Manager, the low-level connection will be closed.

#### socket.emit(eventName\[, ...args\]\[, ack\])[​](_docs_v4_client-api.md#socketemiteventname-args)

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `args` `<any[]>`
*   `ack` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** `true`

Emits an event to the socket identified by the string name. Any other parameters can be included. All serializable data structures are supported, including `Buffer`.
```
socket.emit("hello", "world");  
socket.emit("with-binary", 1, "2", { 3: "4", 5: Buffer.from([6, 7, 8]) });  
```
The `ack` argument is optional and will be called with the server answer.

_Client_
```
socket.emit("hello", "world", (response) => {  
  console.log(response); // "got it"});  
```
_Server_
```
io.on("connection", (socket) => {  
  socket.on("hello", (arg, callback) => {    console.log(arg); // "world"    callback("got it");  });});  
```
#### socket.emitWithAck(eventName\[, ...args\])[​](_docs_v4_client-api.md#socketemitwithackeventname-args)

_Added in v4.6.0_

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `args` `any[]`
*   **Returns** [`Promise<any>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Promised-based version of emitting and expecting an acknowledgement from the server:
```
// without timeout  
const response = await socket.emitWithAck("hello", "world");  
  
// with a specific timeout  
try {  
  const response = await socket.timeout(10000).emitWithAck("hello", "world");} catch (err) {  
  // the server did not acknowledge the event in the given delay}  
```
The example above is equivalent to:
```
// without timeout  
socket.emit("hello", "world", (val) => {  
  // ...});  
  
// with a specific timeout  
socket.timeout(10000).emit("hello", "world", (err, val) => {  
  // ...});  
```
And on the receiving side:
```
io.on("connection", (socket) => {  
  socket.on("hello", (arg1, callback) => {    callback("got it"); // only one argument is expected  });});  
```
#### socket.listeners(eventName)[​](_docs_v4_client-api.md#socketlistenerseventname)

_Inherited from the [EventEmitter class](https://www.npmjs.com/package/@socket.io/component-emitter)._

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   **Returns** [`<Function[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Returns the array of listeners for the event named `eventName`.
```
socket.on("my-event", () => {  
  // ...});  
  
console.log(socket.listeners("my-event")); // prints [ [Function] ]  
```
#### socket.listenersAny()[​](_docs_v4_client-api.md#socketlistenersany)

_Added in v3.0.0_

*   **Returns** [`<Function[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Returns the list of registered catch-all listeners.
```
const listeners = socket.listenersAny();  
```
#### socket.listenersAnyOutgoing()[​](_docs_v4_client-api.md#socketlistenersanyoutgoing)

_Added in v4.5.0_

*   **Returns** [`<Function[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Returns the list of registered catch-all listeners for outgoing packets.
```
const listeners = socket.listenersAnyOutgoing();  
```
#### socket.off(\[eventName\]\[, listener\])[​](_docs_v4_client-api.md#socketoffeventname)

_Inherited from the [EventEmitter class](https://www.npmjs.com/package/@socket.io/component-emitter)._

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `listener` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** [`<Socket>`](_docs_v4_client-api.md#socket)

Removes the specified `listener` from the listener array for the event named `eventName`.
```
const myListener = () => {  
  // ...}  
  
socket.on("my-event", myListener);  
  
// then later  
socket.off("my-event", myListener);  
```
The `listener` argument can also be omitted:
```
// remove all listeners for that event  
socket.off("my-event");  
  
// remove all listeners for all events  
socket.off();  
```
#### socket.offAny(\[listener\])[​](_docs_v4_client-api.md#socketoffanylistener)

_Added in v3.0.0_

*   `listener` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Removes the previously registered listener. If no listener is provided, all catch-all listeners are removed.
```
const myListener = () => { /* ... */ };  
  
socket.onAny(myListener);  
  
// then, later  
socket.offAny(myListener);  
  
socket.offAny();  
```
#### socket.offAnyOutgoing(\[listener\])[​](_docs_v4_client-api.md#socketoffanyoutgoinglistener)

_Added in v4.5.0_

*   `listener` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Removes the previously registered listener. If no listener is provided, all catch-all listeners are removed.
```
const myListener = () => { /* ... */ };  
  
socket.onAnyOutgoing(myListener);  
  
// remove a single listener  
socket.offAnyOutgoing(myListener);  
  
// remove all listeners  
socket.offAnyOutgoing();  
```
#### socket.on(eventName, callback)[​](_docs_v4_client-api.md#socketoneventname-callback)

_Inherited from the [EventEmitter class](https://www.npmjs.com/package/@socket.io/component-emitter)._

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `listener` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** [`<Socket>`](_docs_v4_client-api.md#socket)

Register a new handler for the given event.
```
socket.on("news", (data) => {  
  console.log(data);});  
  
// with multiple arguments  
socket.on("news", (arg1, arg2, arg3, arg4) => {  
  // ...});  
// with callback  
socket.on("news", (cb) => {  
  cb(0);});  
```
#### socket.onAny(callback)[​](_docs_v4_client-api.md#socketonanycallback)

_Added in v3.0.0_

*   `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Register a new catch-all listener.
```
socket.onAny((event, ...args) => {  
  console.log(`got ${event}`);});  
```
caution

[Acknowledgements](_docs_v4_emitting-events_.md#acknowledgements) are not caught in the catch-all listener.
```
socket.emit("foo", (value) => {  
  // ...});  
  
socket.onAnyOutgoing(() => {  
  // triggered when the event is sent});  
  
socket.onAny(() => {  
  // not triggered when the acknowledgement is received});  
```
#### socket.onAnyOutgoing(callback)[​](_docs_v4_client-api.md#socketonanyoutgoingcallback)

_Added in v4.5.0_

*   `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Register a new catch-all listener for outgoing packets.
```
socket.onAnyOutgoing((event, ...args) => {  
  console.log(`got ${event}`);});  
```
caution

[Acknowledgements](_docs_v4_emitting-events_.md#acknowledgements) are not caught in the catch-all listener.
```
socket.on("foo", (value, callback) => {  
  callback("OK");});  
  
socket.onAny(() => {  
  // triggered when the event is received});  
  
socket.onAnyOutgoing(() => {  
  // not triggered when the acknowledgement is sent});  
```
#### socket.once(eventName, callback)[​](_docs_v4_client-api.md#socketonceeventname-callback)

_Inherited from the [EventEmitter class](https://www.npmjs.com/package/@socket.io/component-emitter)._

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `listener` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** [`<Socket>`](_docs_v4_client-api.md#socket)

Adds a one-time `listener` function for the event named `eventName`. The next time `eventName` is triggered, this listener is removed and then invoked.
```
socket.once("my-event", () => {  
  // ...});  
```
#### socket.open()[​](_docs_v4_client-api.md#socketopen)

_Added in v1.0.0_

Synonym of [socket.connect()](_docs_v4_client-api.md#socketconnect).

#### socket.prependAny(callback)[​](_docs_v4_client-api.md#socketprependanycallback)

_Added in v3.0.0_

*   `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Register a new catch-all listener. The listener is added to the beginning of the listeners array.
```
socket.prependAny((event, ...args) => {  
  console.log(`got ${event}`);});  
```
#### socket.prependAnyOutgoing(callback)[​](_docs_v4_client-api.md#socketprependanyoutgoingcallback)

_Added in v4.5.0_

*   `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Register a new catch-all listener for outgoing packets. The listener is added to the beginning of the listeners array.
```
socket.prependAnyOutgoing((event, ...args) => {  
  console.log(`got ${event}`);});  
```
#### socket.send(\[...args\]\[, ack\])[​](_docs_v4_client-api.md#socketsendargs)

*   `args` `<any[]>`
*   `ack` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** [`<Socket>`](_docs_v4_client-api.md#socket)

Sends a `message` event. See [socket.emit(eventName\[, ...args\]\[, ack\])](_docs_v4_client-api.md#socketemiteventname-args).

#### socket.timeout(value)[​](_docs_v4_client-api.md#sockettimeoutvalue)

_Added in v4.4.0_

*   `value` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
*   **Returns** [`<Socket>`](_docs_v4_client-api.md#socket)

Sets a modifier for a subsequent event emission that the callback will be called with an error when the given number of milliseconds have elapsed without an acknowledgement from the server:
```
socket.timeout(5000).emit("my-event", (err) => {  
  if (err) {    // the server did not acknowledge the event in the given delay  }});  
```
### Flags[​](_docs_v4_client-api.md#flags)

#### Flag: 'volatile'[​](_docs_v4_client-api.md#flag-volatile)

_Added in v3.0.0_

Sets a modifier for the subsequent event emission indicating that the packet may be dropped if:

*   the socket is not connected
*   the low-level transport is not writable (for example, when a `POST` request is already running in HTTP long-polling mode)
```
socket.volatile.emit(/* ... */); // the server may or may not receive it  
```

#### _docs_v4_client-initialization.md

> Source: https://socket.io/docs/v4/client-initialization
> Scraped: 4/14/2025, 11:55:40 PM

Version: 4.x

Once you have [installed](_docs_v4_client-installation_.md) the Socket.IO client library, you can now init the client. The complete list of options can be found [here](_docs_v4_client-options_.md).

tip

For TypeScript users, it is possible to provide type hints for the events. Please check [this](_docs_v4_typescript_.md).

In the examples below, the `io` object comes either from:

*   the `<script>` import
```
<script src="/socket.io/socket.io.js"></script>  
```
*   an ESM import
```
<script type="module">  
  import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";</script>  
```
*   NPM

*   CommonJS
*   ES modules
*   TypeScript
```
const { io } = require("socket.io-client");  
```
## From the same domain[​](_docs_v4_client-initialization.md#from-the-same-domain)

If your front is served on the same domain as your server, you can simply use:

The server URL will be deduced from the [window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) object.

## From a different domain[​](_docs_v4_client-initialization.md#from-a-different-domain)

In case your front is not served from the same domain as your server, you have to pass the URL of your server.
```
const socket = io("https://server-domain.com");  
```
In that case, please make sure to enable [Cross-Origin Resource Sharing (CORS)](_docs_v4_handling-cors_.md) on the server.

info

You can use either `https` or `wss` (respectively, `http` or `ws`).
```
// the following forms are similar  
const socket = io("https://server-domain.com");  
const socket = io("wss://server-domain.com");  
const socket = io("server-domain.com"); // only in the browser when the page is served over https (will not work in Node.js)  
```
In the examples above, the client will connect to the main namespace. Using only the main namespace should be sufficient for most use cases, but you can specify the namespace with:
```
// same origin version  
const socket = io("/admin");  
// cross origin version  
const socket = io("https://server-domain.com/admin");  
```
You can find more details about namespaces [here](_docs_v4_namespaces_.md).

The complete list of available options can be found [here](_docs_v4_client-options_.md).

#### _docs_v4_client-installation.md

> Source: https://socket.io/docs/v4/client-installation
> Scraped: 4/14/2025, 11:55:32 PM

info

The latest release is currently `4.8.1`, released in October 2024.

You can find the release notes [here](_docs_v4_changelog_4.8.1.md).

Here is the compatibility table between the server and the JS client:

JS Client version

Socket.IO server version

1.x

2.x

3.x

4.x

1.x

**YES**

NO

NO

NO

2.x

NO

**YES***YES**1

**YES**1

3.x

NO

NO

**YES***YES**

4.x

NO

NO

**YES***YES**

\[1\] Yes, with [allowEIO3: true](_docs_v4_server-options_.md#alloweio3)

Please check the associated migration guides:

* [v2 to v3](_docs_v4_migrating-from-2-x-to-3-0_.md)
* [v3 to v4](_docs_v4_migrating-from-3-x-to-4-0_.md)

Socket.IO does support IE9 and above. IE 6/7/8 are not supported anymore.

Browser compatibility is tested thanks to the awesome Sauce Labs platform:

![Browser support](https://socket.io/assets/images/saucelabs-12cc2b9e4736ec47c9d93f75666691e9.svg)

### Standalone build[​](_docs_v4_client-installation.md#standalone-build)

By default, the Socket.IO server exposes a client bundle at `/socket.io/socket.io.js`.

`io` will be registered as a global variable:
```
<script src="/socket.io/socket.io.js"></script>  
<script>  
  const socket = io();</script>  
```
If you don't need this (see other options below), you can disable the functionality on the server side:
```
const { Server } = require("socket.io");  
  
const io = new Server({  
  serveClient: false});  
```
### From a CDN[​](_docs_v4_client-installation.md#from-a-cdn)

You can also include the client bundle from a CDN:
```
<script src="https://cdn.socket.io/4.8.1/socket.io.min.js" integrity="sha384-mkQ3/7FUtcGyoppY6bz/PORYoGqOl7/aSUMn2ymDOJcapfS6PHqxhRTMh1RR0Q6+" crossorigin="anonymous"></script>  
```
Socket.IO is also available from other CDN:

*   cdnjs: [https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.8.1/socket.io.min.js](https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.8.1/socket.io.min.js)
*   jsDelivr: [https://cdn.jsdelivr.net/npm/socket.io-client@4.8.1/dist/socket.io.min.js](https://cdn.jsdelivr.net/npm/socket.io-client@4.8.1/dist/socket.io.min.js)
*   unpkg: [https://unpkg.com/socket.io-client@4.8.1/dist/socket.io.min.js](https://unpkg.com/socket.io-client@4.8.1/dist/socket.io.min.js)

There are several bundles available:

Name

Size

Description

socket.io.js

34.7 kB gzip

Unminified version, with [debug](https://www.npmjs.com/package/debug)

socket.io.min.js

14.7 kB min+gzip

Production version, without [debug](https://www.npmjs.com/package/debug)

socket.io.msgpack.min.js

15.3 kB min+gzip

Production version, without [debug](https://www.npmjs.com/package/debug) and with the [msgpack parser](https://github.com/socketio/socket.io-msgpack-parser)

The [debug](https://www.npmjs.com/package/debug) package allows to print debug information to the console. You can find more information [here](_docs_v4_logging-and-debugging_.md).

During development, we recommend using the `socket.io.js` bundle. By setting `localStorage.debug = 'socket.io-client:socket'`, any event received by the client will be printed to the console.

For production, please use the `socket.io.min.js` bundle, which is an optimized build excluding the debug package.

### From NPM[​](_docs_v4_client-installation.md#from-npm)

The Socket.IO client is compatible with bundlers like [webpack](https://webpack.js.org/) or [browserify](http://browserify.org/).

*   NPM
*   Yarn
*   pnpm
*   Bun
```
npm install socket.io-client  
```
The client can also be run from Node.js.

Note: for the reasons cited above, you may want to exclude debug from your browser bundle. With webpack, you can use [webpack-remove-debug](https://github.com/johngodley/webpack-remove-debug).

Note for TypeScript users: the types are now included in the `socket.io-client` package and thus the types from `@types/socket.io-client` are not needed anymore and may in fact cause errors:
```
Object literal may only specify known properties, and 'extraHeaders' does not exist in type 'ConnectOpts'  
```
### Dependency tree[​](_docs_v4_client-installation.md#dependency-tree)

A basic installation of the client includes **9** packages, of which **5** are maintained by our team:
```
└─┬ socket.io-client@4.8.1  
  ├── @socket.io/component-emitter@3.1.2  ├─┬ debug@4.3.7  │ └── ms@2.1.3  ├─┬ engine.io-client@6.6.3  │ ├── @socket.io/component-emitter@3.1.2 deduped  │ ├── debug@4.3.7 deduped  │ ├── engine.io-parser@5.2.3  │ ├─┬ ws@8.17.1  │ │ ├── UNMET OPTIONAL DEPENDENCY bufferutil@^4.0.1  │ │ └── UNMET OPTIONAL DEPENDENCY utf-8-validate@>=5.0.2  │ └── xmlhttprequest-ssl@2.1.2  └─┬ socket.io-parser@4.2.4    ├── @socket.io/component-emitter@3.1.2 deduped    └── debug@4.3.7 deduped
```
### Transitive versions[​](_docs_v4_client-installation.md#transitive-versions)

The `engine.io-client` package brings the engine that is responsible for managing the low-level connections (HTTP long-polling or WebSocket). See also: [How it works](_docs_v4_how-it-works_.md)

`socket.io-client` version

`engine.io-client` version

`ws` version1

`4.8.x`

`6.6.x`

`8.17.x`

`4.7.x`

`6.5.x`

`8.17.x`

`4.6.x`

`6.4.x`

`8.11.x`

`4.5.x`

`6.2.x`

`8.2.x`

`4.4.x`

`6.1.x`

`8.2.x`

`4.3.x`

`6.0.x`

`8.2.x`

`4.2.x`

`5.2.x`

`7.4.x`

`4.1.x`

`5.1.x`

`7.4.x`

`4.0.x`

`5.0.x`

`7.4.x`

`3.1.x`

`4.1.x`

`7.4.x`

`3.0.x`

`4.0.x`

`7.4.x`

`2.5.x`

`3.5.x`

`7.5.x`

`2.4.x`

`3.5.x`

`7.5.x`

\[1\] for Node.js users only. In the browser, the native WebSocket API is used.

#### _docs_v4_client-offline-behavior.md

> Source: https://socket.io/docs/v4/client-offline-behavior
> Scraped: 4/14/2025, 11:55:32 PM

*   [](index.md)
*   Client
*   Offline behavior

Version: 4.x

## Buffered events[​](_docs_v4_client-offline-behavior.md#buffered-events)

By default, any event emitted while the Socket is not connected will be buffered until reconnection.

While useful in most cases (when the reconnection delay is short), it could result in a huge spike of events when the connection is restored.

There are several solutions to prevent this behavior, depending on your use case:

*   use the [connected](_docs_v4_client-socket-instance_.md#socketconnected) attribute of the Socket instance
```
if (socket.connected) {  
  socket.emit( /* ... */ );} else {  
  // ...}  
```
*   use [volatile events](_docs_v4_emitting-events_.md#volatile-events)
```
socket.volatile.emit( /* ... */ );  
```
[

Previous

The Socket instance

](_docs_v4_client-socket-instance_.md)[

Next

Usage with bundlers

](_docs_v4_client-with-bundlers_.md)

#### _docs_v4_client-options.md

> Source: https://socket.io/docs/v4/client-options
> Scraped: 4/14/2025, 11:55:40 PM

### `forceNew`[​](_docs_v4_client-options.md#forcenew)

Default value: `false`

Whether to create a new Manager instance.

A Manager instance is in charge of the low-level connection to the server (established with HTTP long-polling or WebSocket). It handles the reconnection logic.

A Socket instance is the interface which is used to sends events to — and receive events from — the server. It belongs to a given [namespace](_docs_v4_namespaces_.md).

A single Manager can be attached to several Socket instances.

The following example will reuse the same Manager instance for the 3 Socket instances (one single WebSocket connection):
```
const socket = io("https://example.com"); // the main namespace  
const productSocket = io("https://example.com/product"); // the "product" namespace  
const orderSocket = io("https://example.com/order"); // the "order" namespace  
```
The following example will create 3 different Manager instances (and thus 3 distinct WebSocket connections):
```
const socket = io("https://example.com"); // the main namespace  
const productSocket = io("https://example.com/product", { forceNew: true }); // the "product" namespace  
const orderSocket = io("https://example.com/order", { forceNew: true }); // the "order" namespace  
```
Reusing an existing namespace will also create a new Manager each time:
```
const socket1 = io(); // 1st manager  
const socket2 = io(); // 2nd manager  
const socket3 = io("/admin"); // reuse the 1st manager  
const socket4 = io("/admin"); // 3rd manager  
```
### `multiplex`[​](_docs_v4_client-options.md#multiplex)

Default value: `true`

The opposite of `forceNew`: whether to reuse an existing Manager instance.
```
const socket = io(); // 1st manager  
const adminSocket = io("/admin", { multiplex: false }); // 2nd manager  
```
info

These settings will be shared by all Socket instances attached to the same Manager.

### `addTrailingSlash`[​](_docs_v4_client-options.md#addtrailingslash)

_Added in v4.6.0_

The trailing slash which was added by default can now be disabled:
```
import { io } from "socket.io-client";  
  
const socket = io("https://example.com", {  
  addTrailingSlash: false});  
```
In the example above, the request URL will be `https://example.com/socket.io` instead of `https://example.com/socket.io/`.

### `autoUnref`[​](_docs_v4_client-options.md#autounref)

_Added in v4.0.0_

Default value: `false`

With `autoUnref` set to `true`, the Socket.IO client will allow the program to exit if there is no other active timer/TCP socket in the event system (even if the client is connected):
```
import { io } from "socket.io-client";  
  
const socket = io({  
  autoUnref: true});  
```
### `closeOnBeforeunload`[​](_docs_v4_client-options.md#closeonbeforeunload)

History

Version

Changes

v4.7.1

The option now defaults to `false`.

v4.1.0

First implementation.

Default value: `false`

Whether to (silently) close the connection when the [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event) event is emitted in the browser.

When this option is set to `false` (the default value), the Socket instance will emit a `disconnect` event when the user reloads the page **on Firefox**:

![Example with Firefox when closeOnBeforeunload is set to false](https://socket.io/assets/images/closeonbeforeunload-false-2991b50087d12b47df0ee848f48f3ab5.gif)

note

This behavior is specific to Firefox, on other browsers the Socket instance will not emit any `disconnect` event when the user reloads the page.

When this option is set to `true`, all browsers will have the same behavior (no `disconnect` event when reloading the page):

![Example with Firefox when closeOnBeforeunload is set to true](https://socket.io/assets/images/closeonbeforeunload-true-dd59aafe68fc857319a5e02fb38096a7.gif)

caution

If you use the `beforeunload` event in your application ("are you sure that you want to leave this page?"), it is recommended to leave this option to `false`.

Please check [this issue](https://github.com/socketio/socket.io/issues/3639) for more information.

Default value: -

Additional headers (then found in `socket.handshake.headers` object on the server-side).

Example:

_Client_
```
import { io } from "socket.io-client";  
  
const socket = io({  
  extraHeaders: {    "my-custom-header": "1234"  }});  
```
_Server_
```
io.on("connection", (socket) => {  
  console.log(socket.handshake.headers); // an object containing "my-custom-header": "1234"});  
```
caution

In a browser environment, the `extraHeaders` option will be ignored if you only enable the WebSocket transport, since the WebSocket API in the browser does not allow providing custom headers.
```
import { io } from "socket.io-client";  
  
const socket = io({  
  transports: ["websocket"],  extraHeaders: {    "my-custom-header": "1234" // ignored  }});  
```
This will work in Node.js or in React-Native though.

Documentation: [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### `forceBase64`[​](_docs_v4_client-options.md#forcebase64)

Default value: `false`

Whether to force base64 encoding for binary content sent over WebSocket (always enabled for HTTP long-polling).

### `path`[​](_docs_v4_client-options.md#path)

Default value: `/socket.io/`

It is the name of the path that is captured on the server side.

caution

The server and the client values must match (unless you are using a path-rewriting proxy in between).

_Client_
```
import { io } from "socket.io-client";  
  
const socket = io("https://example.com", {  
  path: "/my-custom-path/"});  
```
_Server_
```
import { createServer } from "http";  
import { Server } from "socket.io";  
  
const httpServer = createServer();  
const io = new Server(httpServer, {  
  path: "/my-custom-path/"});  
```
Please note that this is different from the path in the URI, which represents the [Namespace](_docs_v4_namespaces_.md).

Example:
```
import { io } from "socket.io-client";  
  
const socket = io("https://example.com/order", {  
  path: "/my-custom-path/"});  
```
*   the Socket instance is attached to the "order" Namespace
*   the HTTP requests will look like: `GET https://example.com/my-custom-path/?EIO=4&transport=polling&t=ML4jUwU`

### `protocols`[​](_docs_v4_client-options.md#protocols)

_Added in v2.0.0_

Default value: -

Either a single protocol string or an array of protocol strings. These strings are used to indicate sub-protocols, so that a single server can implement multiple WebSocket sub-protocols (for example, you might want one server to be able to handle different types of interactions depending on the specified protocol).
```
import { io } from "socket.io-client";  
  
const socket = io({  
  transports: ["websocket"],  protocols: ["my-protocol-v1"]});  
```
Server:
```
io.on("connection", (socket) => {  
  const transport = socket.conn.transport;  console.log(transport.socket.protocol); // prints "my-protocol-v1"});  
```
References:

* [https://datatracker.ietf.org/doc/html/rfc6455#section-1.9](https://datatracker.ietf.org/doc/html/rfc6455#section-1.9)
* [https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket)

### `query`[​](_docs_v4_client-options.md#query)

Default value: -

Additional query parameters (then found in `socket.handshake.query` object on the server-side).

Example:

_Client_
```
import { io } from "socket.io-client";  
  
const socket = io({  
  query: {    x: 42  }});  
```
_Server_
```
io.on("connection", (socket) => {  
  console.log(socket.handshake.query); // prints { x: "42", EIO: "4", transport: "polling" }});  
```
The query parameters cannot be updated for the duration of the session, so changing the `query` on the client-side will only be effective when the current session gets closed and a new one is created:
```
socket.io.on("reconnect_attempt", () => {  
  socket.io.opts.query.x++;});  
```
Note: the following query parameters are reserved and can't be used in your application:

*   `EIO`: the version of the protocol (currently, "4")
*   `transport`: the transport name ("polling" or "websocket")
*   `sid`: the session ID
*   `j`: if the transport is polling but a JSONP response is required
*   `t`: a hashed-timestamp used for cache-busting

### `rememberUpgrade`[​](_docs_v4_client-options.md#rememberupgrade)

Default value: `false`

If true and if the previous WebSocket connection to the server succeeded, the connection attempt will bypass the normal upgrade process and will initially try WebSocket. A connection attempt following a transport error will use the normal upgrade process. It is recommended you turn this on only when using SSL/TLS connections, or if you know that your network does not block websockets.

### `timestampParam`[​](_docs_v4_client-options.md#timestampparam)

Default value: `"t"`

The name of the query parameter to use as our timestamp key.

### `timestampRequests`[​](_docs_v4_client-options.md#timestamprequests)

Default value: `true`

Whether to add the timestamp query param to each request (for cache busting).

### `transportOptions`[​](_docs_v4_client-options.md#transportoptions)

_Added in v2.0.0_

Default value: `{}`

Transport-specific options.

Example:
```
import { io } from "socket.io-client";  
  
const socket = io({  
  path: "/path-for-http-long-polling/",  transportOptions: {    websocket: {      path: "/path-for-websocket/"    }  }});  
```
### `transports`[​](_docs_v4_client-options.md#transports)

History

Version

Changes

v4.8.0

You can now pass an array of transport implementations.

v4.7.0

`webtransport` is added.

v1.0.0

First implementation.

Default value: `["polling", "websocket", "webtransport"]`

The low-level connection to the Socket.IO server can either be established with:

*   HTTP long-polling: successive HTTP requests (`POST` for writing, `GET` for reading)
* [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
* [WebTransport](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API)

The following example disables the HTTP long-polling transport:
```
const socket = io("https://example.com", { transports: ["websocket"] });  
```
Note: in that case, sticky sessions are not required on the server side (more information [here](_docs_v4_using-multiple-nodes_.md)).

By default, the HTTP long-polling connection is established first, and then an upgrade to WebSocket is attempted (explanation [here](_docs_v4_how-it-works_.md#upgrade-mechanism)). You can use WebSocket first with:
```
const socket = io("https://example.com", {  
  transports: ["websocket", "polling"] // use WebSocket first, if available});  
  
socket.on("connect_error", () => {  
  // revert to classic upgrade  socket.io.opts.transports = ["polling", "websocket"];});  
```
One possible downside is that the validity of your [CORS configuration](_docs_v4_handling-cors_.md) will only be checked if the WebSocket connection fails to be established.

You can also pass an array of transport implementations:
```
import { io } from "socket.io-client";  
import { Fetch, WebSocket } from "engine.io-client";  
  
const socket = io({  
  transports: [Fetch, WebSocket]});  
```
Here is the list of provided implementations:

Transport

Description

`Fetch`

HTTP long-polling based on the built-in [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) method.

`NodeXHR`

HTTP long-polling based on the `XMLHttpRequest` object provided by the [`xmlhttprequest-ssl`](https://www.npmjs.com/package/xmlhttprequest-ssl) package.

`XHR`

HTTP long-polling based on the built-in [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object.

`NodeWebSocket`

WebSocket transport based on the `WebSocket` object provided by the [`ws`](https://www.npmjs.com/package/ws) package.

`WebSocket`

WebSocket transport based on the built-in [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) object.

`WebTransport`

WebTransport transport based on the built-in [`WebTransport`](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport) object.

Usage:

Transport

browser

Node.js

Deno

Bun

`Fetch`

✅

✅ (1)

✅

✅

`NodeXHR`

✅

✅

✅

`XHR`

✅

`NodeWebSocket`

✅

✅

✅

`WebSocket`

✅

✅ (2)

✅

✅

`WebTransport`

✅

✅

(1) since [v18.0.0](https://nodejs.org/api/globals.html#fetch) (2) since [v21.0.0](https://nodejs.org/api/globals.html#websocket)

### `tryAllTransports`[​](_docs_v4_client-options.md#tryalltransports)

_Added in v4.8.0_

Default value: `false`

When setting the `tryAllTransports` option to `true`, if the first transport (usually, HTTP long-polling) fails, then the other transports will be tested too:
```
import { io } from "socket.io-client";  
  
const socket = io({  
  tryAllTransports: true});  
```
This feature is useful in two cases:

*   when HTTP long-polling is disabled on the server, or if CORS fails
*   when WebSocket is tested first (with `transports: ["websocket", "polling"]`)

The only potential downside is that the connection attempt could take more time in case of failure, as there have been reports of WebSocket connection errors taking several seconds before being detected (that's one reason for using HTTP long-polling first). That's why the option defaults to `false` for now.

### `upgrade`[​](_docs_v4_client-options.md#upgrade)

Default value: `true`

Whether the client should try to upgrade the transport from HTTP long-polling to something better.

### `withCredentials`[​](_docs_v4_client-options.md#withcredentials)

History

Version

Changes

v4.7.0

The Node.js client now honors the `withCredentials` setting.

v3.0.0

`withCredentials` now defaults to `false`.

v1.0.0

First implementation.

Default value: `false`

Whether the cross-site requests should be sent including credentials such as cookies, authorization headers or TLS client certificates. Setting `withCredentials` has no effect on same-site requests.
```
import { io } from "socket.io-client";  
  
const socket = io("https://my-backend.com", {  
  withCredentials: true});  
```
The server needs to send the right `Access-Control-Allow-*` headers to allow the connection:
```
import { createServer } from "http";  
import { Server } from "socket.io";  
  
const httpServer = createServer();  
const io = new Server(httpServer, {  
  cors: {    origin: "https://my-frontend.com",    credentials: true  }});  
```
caution

You cannot use `origin: *` when setting `withCredentials` to `true`. This will trigger the following error:

> _Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at ‘.../socket.io/?EIO=4&transport=polling&t=NvQfU77’. (Reason: Credential is not supported if the CORS header ‘Access-Control-Allow-Origin’ is ‘\*’)_

Documentation:

* [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)
* [Handling CORS](_docs_v4_handling-cors_.md)

info

Starting with version `4.7.0`, when setting the `withCredentials` option to `true`, the Node.js client will now include the cookies in the HTTP requests, making it easier to use it with cookie-based sticky sessions.

### Node.js-specific options[​](_docs_v4_client-options.md#nodejs-specific-options)

The following options are supported:

*   `agent`
*   `pfx`
*   `key`
*   `passphrase`
*   `cert`
*   `ca`
*   `ciphers`
*   `rejectUnauthorized`

Please refer to the Node.js documentation:

* [tls.connect(options\[, callback\])](https://nodejs.org/dist/latest/docs/api/tls.html#tls_tls_connect_options_callback)
* [tls.createSecureContext(\[options\])](https://nodejs.org/dist/latest/docs/api/tls.html#tls_tls_createsecurecontext_options)

Example with a self-signed certificate:

_Client_
```
import { readFileSync } from "fs";  
import { io } from "socket.io-client";  
  
const socket = io("https://example.com", {  
  ca: readFileSync("./cert.pem")});  
```
_Server_
```
import { readFileSync } from "fs";  
import { createServer } from "https";  
import { Server } from "socket.io";  
  
const httpServer = createServer({  
  cert: readFileSync("./cert.pem"),  key: readFileSync("./key.pem")});  
const io = new Server(httpServer);  
```
Example with client-certificate authentication:

_Client_
```
import { readFileSync } from "fs";  
import { io } from "socket.io-client";  
  
const socket = io("https://example.com", {  
  ca: readFileSync("./server-cert.pem"),  cert: readFileSync("./client-cert.pem"),  key: readFileSync("./client-key.pem"),});  
```
_Server_
```
import { readFileSync } from "fs";  
import { createServer } from "https";  
import { Server } from "socket.io";  
  
const httpServer = createServer({  
  cert: readFileSync("./server-cert.pem"),  key: readFileSync("./server-key.pem"),  requestCert: true,  ca: [    readFileSync("client-cert.pem")  ]});  
const io = new Server(httpServer);  
```
caution

`rejectUnauthorized` is a Node.js-only option, it will not bypass the security check in the browser:

![Security warning in the browser](https://socket.io/assets/images/self-signed-certificate-a0d2f0b33ea47a62c960fcb5a98cd534.png)

info

These settings will be shared by all Socket instances attached to the same Manager.

### `autoConnect`[​](_docs_v4_client-options.md#autoconnect)

Default value: `true`

Whether to automatically connect upon creation. If set to `false`, you need to manually connect:
```
import { io } from "socket.io-client";  
  
const socket = io({  
  autoConnect: false});  
  
socket.connect();  
// or  
socket.io.open();  
```
### `parser`[​](_docs_v4_client-options.md#parser)

_Added in v2.2.0_

Default value: `require("socket.io-parser")`

The parser used to marshall/unmarshall packets. Please see [here](_docs_v4_custom-parser_.md) for more information.

### `randomizationFactor`[​](_docs_v4_client-options.md#randomizationfactor)

Default value: `0.5`

The randomization factor used when reconnecting (so that the clients do not reconnect at the exact same time after a server crash, for example).

Example with the default values:

*   1st reconnection attempt happens between 500 and 1500 ms (`1000 * 2^0 * (<something between -0.5 and 1.5>)`)
*   2nd reconnection attempt happens between 1000 and 3000 ms (`1000 * 2^1 * (<something between -0.5 and 1.5>)`)
*   3rd reconnection attempt happens between 2000 and 5000 ms (`1000 * 2^2 * (<something between -0.5 and 1.5>)`)
*   next reconnection attempts happen after 5000 ms

### `reconnection`[​](_docs_v4_client-options.md#reconnection)

Default value: `true`

Whether reconnection is enabled or not. If set to `false`, you need to manually reconnect:
```
import { io } from "socket.io-client";  
  
const socket = io({  
  reconnection: false});  
  
const tryReconnect = () => {  
  setTimeout(() => {    socket.io.open((err) => {      if (err) {        tryReconnect();      }    });  }, 2000);}  
  
socket.io.on("close", tryReconnect);  
```
### `reconnectionAttempts`[​](_docs_v4_client-options.md#reconnectionattempts)

Default value: `Infinity`

The number of reconnection attempts before giving up.

### `reconnectionDelay`[​](_docs_v4_client-options.md#reconnectiondelay)

Default value: `1000`

The initial delay before reconnection in milliseconds (affected by the [randomizationFactor](_docs_v4_client-options.md#randomizationfactor) value).

### `reconnectionDelayMax`[​](_docs_v4_client-options.md#reconnectiondelaymax)

Default value: `5000`

The maximum delay between two reconnection attempts. Each attempt increases the reconnection delay by 2x.

### `timeout`[​](_docs_v4_client-options.md#timeout)

Default value: `20000`

The timeout in milliseconds for each connection attempt.

info

These settings are specific to the given Socket instance.

### `ackTimeout`[​](_docs_v4_client-options.md#acktimeout)

_Added in v4.6.0_

Default value: -

The default timeout in milliseconds used when waiting for an acknowledgement (not to be mixed up with the already existing [timeout](_docs_v4_client-options.md#timeout) option, which is used by the Manager during the connection).

Must be used in conjunction with [`retries`](_docs_v4_client-options.md#retries).

### `auth`[​](_docs_v4_client-options.md#auth)

_Added in v3.0.0_

Default value: -

Credentials that are sent when accessing a namespace (see also [here](_docs_v4_middlewares_.md#sending-credentials)).

Example:

_Client_
```
import { io } from "socket.io-client";  
  
const socket = io({  
  auth: {    token: "abcd"  }});  
  
// or with a function  
const socket = io({  
  auth: (cb) => {    cb({ token: localStorage.token })  }});  
```
_Server_
```
io.on("connection", (socket) => {  
  console.log(socket.handshake.auth); // prints { token: "abcd" }});  
```
You can update the `auth` map when the access to the Namespace is denied:
```
socket.on("connect_error", (err) => {  
  if (err.message === "invalid credentials") {    socket.auth.token = "efgh";    socket.connect();  }});  
```
Or manually force the Socket instance to reconnect:
```
socket.auth.token = "efgh";  
socket.disconnect().connect();  
```
### `retries`[​](_docs_v4_client-options.md#retries)

_Added in v4.6.0_

Default value: -

The maximum number of retries. Above the limit, the packet will be discarded.
```
const socket = io({  
  retries: 3,  ackTimeout: 10000});  
  
// implicit ack  
socket.emit("my-event");  
  
// explicit ack  
socket.emit("my-event", (err, val) => { /* ... */ });  
  
// custom timeout (in that case the ackTimeout is optional)  
socket.timeout(5000).emit("my-event", (err, val) => { /* ... */ });  
```
caution

The event must be acknowledged by the server (even with implicit ack):
```
io.on("connection", (socket) => {  
  socket.on("my-event", (cb) => {    cb("got it");  });});  
```
Else, the client will keep trying to send the event (up to `retries + 1` times).

#### _docs_v4_client-socket-instance.md

> Source: https://socket.io/docs/v4/client-socket-instance
> Scraped: 4/14/2025, 11:55:38 PM

A `Socket` is the fundamental class for interacting with the server. It inherits most of the methods of the Node.js [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter), like [emit](_docs_v4_client-api_.md#socketemiteventname-args), [on](_docs_v4_client-api_.md#socketoneventname-callback), [once](_docs_v4_client-api_.md#socketonceeventname-callback) or [off](_docs_v4_client-api_.md#socketoffeventname).

![Bidirectional communication between server and client](https://socket.io/images/bidirectional-communication-socket.png)![Bidirectional communication between server and client](https://socket.io/images/bidirectional-communication-socket-dark.png)

Besides [emitting](_docs_v4_emitting-events_.md) and [listening to](_docs_v4_listening-to-events_.md) events, the Socket instance has a few attributes that may be of use in your application:

Each new connection is assigned a random 20-characters identifier.

This identifier is synced with the value on the server-side.
```
// server-side  
io.on("connection", (socket) => {  
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx});  
  
// client-side  
socket.on("connect", () => {  
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx});  
  
socket.on("disconnect", () => {  
  console.log(socket.id); // undefined});  
```
caution

Please note that, unless [connection state recovery](_docs_v4_connection-state-recovery.md) is enabled, the `id` attribute is an **ephemeral** ID that is not meant to be used in your application (or only for debugging purposes) because:

*   this ID is regenerated after each reconnection (for example when the WebSocket connection is severed, or when the user refreshes the page)
*   two different browser tabs will have two different IDs
*   there is no message queue stored for a given ID on the server (i.e. if the client is disconnected, the messages sent from the server to this ID are lost)

Please use a regular session ID instead (either sent in a cookie, or stored in the localStorage and sent in the [`auth`](_docs_v4_client-options_.md#auth) payload).

### `connect`[​](_docs_v4_client-socket-instance.md#connect)

This event is fired by the Socket instance upon connection **and** reconnection.
```
socket.on("connect", () => {  
  // ...});  
```
caution

Event handlers shouldn't be registered in the `connect` handler itself, as a new handler will be registered every time the socket instance reconnects:

BAD ⚠️
```
socket.on("connect", () => {  
  socket.on("data", () => { /* ... */ });});  
```
GOOD 👍
```
socket.on("connect", () => {  
  // ...});  
  
socket.on("data", () => { /* ... */ });  
```
### `connect_error`[​](_docs_v4_client-socket-instance.md#connect_error)

*   `error` [`<Error>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

This event is fired upon connection failure.

Reason

Automatic reconnection?

The low-level connection cannot be established (temporary failure)

✅ YES

The connection was denied by the server in a [middleware function](_docs_v4_middlewares_.md)

❌ NO

The [`socket.active`](_docs_v4_client-api_.md#socketactive) attribute indicates whether the socket will automatically try to reconnect after a small [randomized delay](_docs_v4_client-options_.md#reconnectiondelay):
```
socket.on("connect_error", (error) => {  
  if (socket.active) {    // temporary failure, the socket will automatically try to reconnect  } else {    // the connection was denied by the server    // in that case, `socket.connect()` must be manually called in order to reconnect    console.log(error.message);  }});  
```
### `disconnect`[​](_docs_v4_client-socket-instance.md#disconnect)

*   `reason` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   `details` `<DisconnectDetails>`

This event is fired upon disconnection.
```
socket.on("disconnect", (reason, details) => {  
  // ...});  
```
Here is the list of possible reasons:

Reason

Description

Automatic reconnection?

`io server disconnect`

The server has forcefully disconnected the socket with [socket.disconnect()](_docs_v4_server-api_.md#socketdisconnectclose)

❌ NO

`io client disconnect`

The socket was manually disconnected using [socket.disconnect()](_docs_v4_client-api_.md#socketdisconnect)

❌ NO

`ping timeout`

The server did not send a PING within the `pingInterval + pingTimeout` range

✅ YES

`transport close`

The connection was closed (example: the user has lost connection, or the network was changed from WiFi to 4G)

✅ YES

`transport error`

The connection has encountered an error (example: the server was killed during a HTTP long-polling cycle)

✅ YES

The [`socket.active`](_docs_v4_client-api_.md#socketactive) attribute indicates whether the socket will automatically try to reconnect after a small [randomized delay](_docs_v4_client-options_.md#reconnectiondelay):
```
socket.on("disconnect", (reason) => {  
  if (socket.active) {    // temporary disconnection, the socket will automatically try to reconnect  } else {    // the connection was forcefully closed by the server or the client itself    // in that case, `socket.connect()` must be manually called in order to reconnect    console.log(reason);  }});  
```
caution

The following event names are reserved and must not be used in your application:

*   `connect`
*   `connect_error`
*   `disconnect`
*   `disconnecting`
*   `newListener`
*   `removeListener`
```
// BAD, will throw an error  
socket.emit("disconnect");  
```
The complete API exposed by the Socket instance can be found [here](_docs_v4_client-api_.md#socket).

#### _docs_v4_client-with-bundlers.md

> Source: https://socket.io/docs/v4/client-with-bundlers
> Scraped: 4/14/2025, 11:55:40 PM

You will find below the configuration for bundling the client library with different bundlers:

* [Webpack 5](_docs_v4_client-with-bundlers.md#webpack-5)
    * [Browser](_docs_v4_client-with-bundlers.md#browser)
    * [Node.js](_docs_v4_client-with-bundlers.md#nodejs)
* [Rollup.js](_docs_v4_client-with-bundlers.md#rollup-js)
    * [Browser](_docs_v4_client-with-bundlers.md#browser-1)
    * [Node.js](_docs_v4_client-with-bundlers.md#nodejs-1)

Documentation: [https://webpack.js.org/concepts/](https://webpack.js.org/concepts/)

### Browser[​](_docs_v4_client-with-bundlers.md#browser)

Installation:
```
npm i -D socket.io-client webpack webpack-cli babel-loader @babel/core @babel/preset-env \  
    @babel/plugin-transform-object-assign webpack-remove-debug
```
`webpack.config.js`
```
module.exports = {  
  entry: "./index.js",  output: {    filename: "bundle.js",  },  mode: "production",  node: false,  module: {    rules: [      {        test: /\.m?js$/,        use: {          loader: "babel-loader",          options: {            presets: ["@babel/preset-env"], // ensure compatibility with older browsers            plugins: ["@babel/plugin-transform-object-assign"], // ensure compatibility with IE 11          },        },      },      {        test: /\.js$/,        loader: "webpack-remove-debug", // remove "debug" package      },    ],  },};  
```
For reference, here is the output of the [`webpack-bundle-analyzer`](https://www.npmjs.com/package/webpack-bundle-analyzer) package:

![Output of the webpack-bundle-analyzer package](https://socket.io/assets/images/bundle-analyzer-output-8a4c7de4914148fdc867c560975d3815.png)

### Node.js[​](_docs_v4_client-with-bundlers.md#nodejs)

To use the client in a Node.js environment (server to server connection), here is the configuration:

Installation:
```
npm i -D socket.io-client webpack webpack-cli  
```
`webpack.config.js`
```
module.exports = {  
  entry: "./index.js",  output: {    filename: "bundle.js",  },  mode: "production",  target: "node",  externals: {    bufferutil: "bufferutil",    "utf-8-validate": "utf-8-validate",  },};  
```
Note: without setting `target: "node"`, you will likely encounter the following error:
```
ReferenceError: document is not defined  
```
Documentation: [https://rollupjs.org/guide/en/](https://rollupjs.org/guide/en/)

### Browser[​](_docs_v4_client-with-bundlers.md#browser-1)

Installation:
```
npm i -D socket.io-client rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-commonjs \  
  @rollup/plugin-babel rollup-plugin-uglify babel @babel/core @babel/preset-env
```
`rollup.config.js`
```
import resolve from "@rollup/plugin-node-resolve";  
import commonjs from "@rollup/plugin-commonjs";  
import babel from "@rollup/plugin-babel";  
import { uglify } from "rollup-plugin-uglify";  
  
export default {  
  input: "index.js",  output: {    file: "bundle.js",    format: "cjs",  },  plugins: [    resolve({      browser: true,    }),    commonjs(),    babel({      include: ["**.js", "node_modules/**"],      babelHelpers: "bundled",      presets: ["@babel/preset-env"],    }),    uglify(),  ],};  
```
### Node.js[​](_docs_v4_client-with-bundlers.md#nodejs-1)

Installation:
```
npm i -D socket.io-client rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-uglify  
```
`rollup.config.js`
```
import resolve from "@rollup/plugin-node-resolve";  
import commonjs from "@rollup/plugin-commonjs";  
import { uglify } from "rollup-plugin-uglify";  
  
export default {  
  input: "index.js",  output: {    file: "bundle.js",    format: "cjs",  },  plugins: [    resolve({      preferBuiltins: true,    }),    commonjs(),    uglify(),  ],};  
```

#### _docs_v4_cluster-adapter.md

> Source: https://socket.io/docs/v4/cluster-adapter
> Scraped: 4/14/2025, 11:55:36 PM

Every packet that is sent to multiple clients (e.g. `io.to("room1").emit()` or `socket.broadcast.emit()`) is also sent to other workers via the IPC channel.
```
const cluster = require("cluster");  
const http = require("http");  
const { Server } = require("socket.io");  
const numCPUs = require("os").cpus().length;  
const { setupMaster, setupWorker } = require("@socket.io/sticky");  
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");  
  
if (cluster.isMaster) {  
  console.log(`Master ${process.pid} is running`);  
  const httpServer = http.createServer();  
  // setup sticky sessions  setupMaster(httpServer, {    loadBalancingMethod: "least-connection",  });  
  // setup connections between the workers  setupPrimary();  
  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)  // Node.js < 16.0.0  cluster.setupMaster({    serialization: "advanced",  });  // Node.js > 16.0.0  // cluster.setupPrimary({  //   serialization: "advanced",  // });  
  httpServer.listen(3000);  
  for (let i = 0; i < numCPUs; i++) {    cluster.fork();  }  
  cluster.on("exit", (worker) => {    console.log(`Worker ${worker.process.pid} died`);    cluster.fork();  });} else {  
  console.log(`Worker ${process.pid} started`);  
  const httpServer = http.createServer();  const io = new Server(httpServer);  
  // use the cluster adapter  io.adapter(createAdapter());  
  // setup connection with the primary process  setupWorker(io);  
  io.on("connection", (socket) => {    /* ... */  });}  
```
```
const cluster = require("cluster");  
const http = require("http");  
const { setupMaster } = require("@socket.io/sticky");  
const { setupPrimary } = require("@socket.io/cluster-adapter");  
const recluster = require("recluster");  
const path = require("path");  
  
const httpServer = http.createServer();  
  
// setup sticky sessions  
setupMaster(httpServer, {  
  loadBalancingMethod: "least-connection",});  
  
// setup connections between the workers  
setupPrimary();  
  
// needed for packets containing buffers (you can ignore it if you only send plaintext objects)  
// Node.js < 16.0.0  
cluster.setupMaster({  
  serialization: "advanced",});  
// Node.js > 16.0.0  
// cluster.setupPrimary({  
//   serialization: "advanced",  
// });  
  
httpServer.listen(3000);  
  
const balancer = recluster(path.join(__dirname, "worker.js"));  
  
balancer.run();  
```
```
const http = require("http");  
const { Server } = require("socket.io");  
const { setupWorker } = require("@socket.io/sticky");  
const { createAdapter } = require("@socket.io/cluster-adapter");  
  
const httpServer = http.createServer();  
const io = new Server(httpServer);  
  
// use the cluster adapter  
io.adapter(createAdapter());  
  
// setup connection with the primary process  
setupWorker(io);  
  
io.on("connection", (socket) => {  
  /* ... */});  
```

#### _docs_v4_connection-state-recovery.md

> Source: https://socket.io/docs/v4/connection-state-recovery
> Scraped: 4/14/2025, 11:55:31 PM

Connection state recovery is a feature which allows restoring a client's state after a temporary disconnection, including any missed packets.

info

This feature was added in version `4.6.0`, released in February 2023.

The release notes can be found [here](_docs_v4_changelog_4.6.0.md).

Under real conditions, a Socket.IO client will inevitably experience temporary disconnections, regardless of the quality of the connection.

This feature will help you cope with such disconnections, but unless you want to store the packets and the sessions forever (by setting `maxDisconnectionDuration` to `Infinity`), you can't be assured that the recovery will always be successful.

That's why you will still need to handle the case where the states of the client and the server must be synchronized.

Connection state recovery must be enabled by the server:
```
const io = new Server(httpServer, {  
  connectionStateRecovery: {    // the backup duration of the sessions and the packets    maxDisconnectionDuration: 2 * 60 * 1000,    // whether to skip middlewares upon successful recovery    skipMiddlewares: true,  }});  
```
Upon an unexpected disconnection (i.e. no manual disconnection with `socket.disconnect()`), the server will store the `id`, the rooms and the `data` attribute of the socket.

Then upon reconnection, the server will try to restore the state of the client. The `recovered` attribute indicates whether this recovery was successful:

_Server_
```
io.on("connection", (socket) => {  
  if (socket.recovered) {    // recovery was successful: socket.id, socket.rooms and socket.data were restored  } else {    // new or unrecoverable session  }});  
```
_Client_
```
socket.on("connect", () => {  
  if (socket.recovered) {    // any event missed during the disconnection period will be received now  } else {    // new or unrecoverable session  }});  
```
You can check that the recovery is working by forcefully closing the underlying engine:
```
import { io } from "socket.io-client";  
  
const socket = io({  
  reconnectionDelay: 10000, // defaults to 1000  reconnectionDelayMax: 10000 // defaults to 5000});  
  
socket.on("connect", () => {  
  console.log("recovered?", socket.recovered);  
  setTimeout(() => {    if (socket.io.engine) {      // close the low-level connection and trigger a reconnection      socket.io.engine.close();    }  }, 10000);});  
```
Adapter

Support?

Built-in adapter (in memory)

YES ✅

[Redis adapter](_docs_v4_redis-adapter_.md)

NO1

[Redis Streams adapter](_docs_v4_redis-streams-adapter_.md)

YES ✅

[MongoDB adapter](_docs_v4_mongo-adapter_.md)

YES ✅ (since version [`0.3.0`](https://github.com/socketio/socket.io-mongo-adapter/releases/tag/0.3.0))

[Postgres adapter](_docs_v4_postgres-adapter_.md)

WIP

[Cluster adapter](_docs_v4_cluster-adapter_.md)

WIP

\[1\] Persisting the packets is not compatible with the Redis PUB/SUB mechanism.

*   the server sends a session ID [during the handshake](_docs_v4_socket-io-protocol_.md#connection-to-a-namespace-1) (which is different from the current id attribute, which is public and can be freely shared)

Example:
```
40{"sid":"GNpWD7LbGCBNCr8GAAAB","pid":"YHcX2sdAF1z452-HAAAW"}  
  
where  
  
4         => the Engine.IO message type  
0         => the Socket.IO CONNECT type  
GN...AB   => the public id of the session  
YH...AW   => the private id of the session  
```
*   the server also includes an offset in [each packet](_docs_v4_socket-io-protocol_.md#sending-and-receiving-data-1) (added at the end of the data array, for backward compatibility)

Example:
```
42["foo","MzUPkW0"]  
  
where  
  
4         => the Engine.IO message type  
2         => the Socket.IO EVENT type  
foo       => the event name (socket.emit("foo"))  
MzUPkW0   => the offset  
```
note

For the recovery to succeed, the server must send at least one event, in order to initialize the offset on the client side.

*   upon temporary disconnection, the server stores the client state for a given delay (implemented at the adapter level)
    
*   upon reconnection, the client sends both the session ID and the last offset it has processed, and the server tries to restore the state
    

Example:
```
40{"pid":"YHcX2sdAF1z452-HAAAW","offset":"MzUPkW0"}  
  
where  
  
4         => the Engine.IO message type  
0         => the Socket.IO CONNECT type  
YH...AW   => the private id of the session  
MzUPkW0   => the last processed offset  
```

#### _docs_v4_custom-parser.md

> Source: https://socket.io/docs/v4/custom-parser
> Scraped: 4/14/2025, 11:55:32 PM

Since Socket.IO v2.0.0, it is now possible to provide your own parser, in order to control the marshalling / unmarshalling of packets.

_Server_
```
import { Server } from "socket.io";  
  
const io = new Server({  
  parser: myParser});  
```
_Client_
```
import { io } from "socket.io-client";  
  
const socket = io({  
  parser: myParser});  
```
Besides [the default parser](_docs_v4_custom-parser.md#the-default-parser), here is the list of available parsers:

Package

Description

[`socket.io-circular-parser`](https://www.npmjs.com/package/socket.io-circular-parser)

Similar to the default parser, but handles circular references.

[`socket.io-msgpack-parser`](https://www.npmjs.com/package/socket.io-msgpack-parser)

Uses [MessagePack](https://msgpack.org/) to encode the packets (based on the [`notepack.io`](https://github.com/darrachequesne/notepack) package).

[`@skgdev/socket.io-msgpack-javascript`](https://www.npmjs.com/package/@skgdev/socket.io-msgpack-javascript)

Uses [MessagePack](https://msgpack.org/) to encode the packets (based on the [`@msgpack/msgpack`](https://github.com/msgpack/msgpack-javascript) package).

[`socket.io-json-parser`](https://www.npmjs.com/package/socket.io-json-parser)

Uses `JSON.stringify()` and `JSON.parse()` to encode the packets.

[`socket.io-cbor-x-parser`](https://www.npmjs.com/package/socket.io-cbor-x-parser)

Uses [cbor-x](https://github.com/kriszyp/cbor-x) to encode the packets.

[`@socket.io/devalue-parser`](https://www.npmjs.com/package/@socket.io/devalue-parser)

Uses [devalue](https://github.com/Rich-Harris/devalue) to encode the packets.

Here is a basic example with a parser that uses the `JSON.stringify()` and `JSON.parse()` methods:
```
import { Emitter } from "@socket.io/component-emitter"; // polyfill of Node.js EventEmitter in the browser  
  
class Encoder {  
  /**   * Encode a packet into a list of strings/buffers   */  encode(packet) {    return [JSON.stringify(packet)];  }}  
  
function isObject(value) {  
  return Object.prototype.toString.call(value) === "[object Object]";}  
  
class Decoder extends Emitter {  
  /**   * Receive a chunk (string or buffer) and optionally emit a "decoded" event with the reconstructed packet   */  add(chunk) {    const packet = JSON.parse(chunk);    if (this.isPacketValid(packet)) {      this.emit("decoded", packet);    } else {      throw new Error("invalid format");    }  }  isPacketValid({ type, data, nsp, id }) {    const isNamespaceValid = typeof nsp === "string";    const isAckIdValid = id === undefined || Number.isInteger(id);    if (!isNamespaceValid || !isAckIdValid) {      return false;    }    switch (type) {      case 0: // CONNECT        return data === undefined || isObject(data);      case 1: // DISCONNECT        return data === undefined;      case 2: // EVENT        return Array.isArray(data) && typeof data[0] === "string";      case 3: // ACK        return Array.isArray(data);      case 4: // CONNECT_ERROR        return isObject(data);      default:        return false;    }  }  /**   * Clean up internal buffers   */  destroy() {}}  
  
export const parser = { Encoder, Decoder };  
```
The source code of the default parser (the `socket.io-parser` package) can be found here: [https://github.com/socketio/socket.io-parser](https://github.com/socketio/socket.io-parser)

Example of output:

*   basic emit

will be encoded as:
```
2["test",42]  
||  
|└─ JSON-encoded payload  
└─ packet type (2 => EVENT)  
```
*   emit with binary, acknowledgement and custom namespace
```
socket.emit("test", Uint8Array.from([42]), () => {  
  console.log("ack received");});  
```
will be encoded as:
```
51-/admin,13["test",{"_placeholder":true,"num":0}]  
||||     || └─ JSON-encoded payload with placeholders for binary attachments  
||||     |└─ acknowledgement id  
||||     └─ separator  
|||└─ namespace (not included when it's the main namespace)  
||└─ separator  
|└─ number of binary attachments  
└─ packet type (5 => BINARY EVENT)  
  
and an additional attachment (the extracted Uint8Array)  
```
Pros:

*   the binary attachments is then base64-encoded, so this parser is compatible with browsers that [do not support Arraybuffers](https://caniuse.com/mdn-javascript_builtins_arraybuffer), like IE9

Cons:

*   packets with binary content are sent as two distinct WebSocket frames (if the WebSocket connection is established)

This parser uses the [MessagePack](https://msgpack.org/) serialization format.

The source code of this parser can be found here: [https://github.com/socketio/socket.io-msgpack-parser](https://github.com/socketio/socket.io-msgpack-parser)

Sample usage:

_Server_
```
import { Server } from "socket.io";  
import customParser from "socket.io-msgpack-parser";  
  
const io = new Server({  
  parser: customParser});  
```
_Client (Node.js)_
```
import { io } from "socket.io-client";  
import customParser from "socket.io-msgpack-parser";  
  
const socket = io("https://example.com", {  
  parser: customParser});  
```
In the browser, there is now an official bundle which includes this parser:

* [https://cdn.socket.io/4.8.1/socket.io.msgpack.min.js](https://cdn.socket.io/4.8.1/socket.io.msgpack.min.js)
*   cdnjs: [https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.8.1/socket.io.msgpack.min.js](https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.8.1/socket.io.msgpack.min.js)
*   jsDelivr: [https://cdn.jsdelivr.net/npm/socket.io-client@4.8.1/dist/socket.io.msgpack.min.js](https://cdn.jsdelivr.net/npm/socket.io-client@4.8.1/dist/socket.io.msgpack.min.js)
*   unpkg: [https://unpkg.com/socket.io-client@4.8.1/dist/socket.io.msgpack.min.js](https://unpkg.com/socket.io-client@4.8.1/dist/socket.io.msgpack.min.js)

In that case, you don't need to specify the `parser` option.

Pros:

*   packets with binary content are sent as one single WebSocket frame (if the WebSocket connection is established)
*   may result in smaller payloads (especially when using a lot of numbers)

Cons:

*   incompatible with browsers that [do not support Arraybuffers](https://caniuse.com/mdn-javascript_builtins_arraybuffer), like IE9
*   harder to debug in the Network tab of the browser

info

Please note that `socket.io-msgpack-parser` relies on the [`notepack.io`](https://github.com/darrachequesne/notepack) MessagePack implementation. This implementation mainly focuses on performance and minimal bundle size, and thus does not support features like extension types. For a parser based on the [official JavaScript implementation](https://github.com/msgpack/msgpack-javascript), please check [this package](https://www.npmjs.com/package/@skgdev/socket.io-msgpack-javascript).

#### _docs_v4_delivery-guarantees.md

> Source: https://socket.io/docs/v4/delivery-guarantees
> Scraped: 4/14/2025, 11:55:31 PM

Socket.IO does guarantee message ordering, no matter which low-level transport is used (even during an upgrade from HTTP long-polling to WebSocket).

This is achieved thanks to:

*   the guarantees provided by the underlying TCP connection
*   the careful design of the [upgrade mechanism](_docs_v4_how-it-works_.md#upgrade-mechanism)

Example:
```
socket.emit("event1");  
socket.emit("event2");  
socket.emit("event3");  
```
In the example above, the events will always be received in the same order by the other side (provided that they actually arrive, see [below](_docs_v4_delivery-guarantees.md#message-arrival)).

### At most once[​](_docs_v4_delivery-guarantees.md#at-most-once)

By default, Socket.IO provides an **at most once** guarantee of delivery:

*   if the connection is broken while an event is being sent, then there is no guarantee that the other side has received it and there will be no retry upon reconnection
*   a disconnected client will [buffer events until reconnection](_docs_v4_client-offline-behavior_.md) (though the previous point still applies)
*   there is no such buffer on the server, which means that any event that was missed by a disconnected client will not be transmitted to that client upon reconnection

info

As of now, additional delivery guarantees must be implemented in your application.

### At least once[​](_docs_v4_delivery-guarantees.md#at-least-once)

#### From client to server[​](_docs_v4_delivery-guarantees.md#from-client-to-server)

From the client side, you can achieve an **at least once** guarantee with the [`retries`](_docs_v4_client-options_.md#retries) option:
```
const socket = io({  
  retries: 3,  ackTimeout: 10000});  
```
The client will try to send the event (up to `retries + 1` times), until it gets an acknowledgement from the server.

caution

Even in that case, any pending event will be lost if the user refreshes its tab.

#### From server to client[​](_docs_v4_delivery-guarantees.md#from-server-to-client)

For events sent by the server, additional delivery guarantees can be implemented by:

*   assigning a unique ID to each event
*   persisting the events in a database
*   storing the offset of the last received event on the client side, and send it upon reconnection

Example:

_Client_
```
const socket = io({  
  auth: {    offset: undefined  }});  
  
socket.on("my-event", ({ id, data }) => {  
  // do something with the data, and then update the offset  socket.auth.offset = id;});  
```
_Server_
```
io.on("connection", async (socket) => {  
  const offset = socket.handshake.auth.offset;  if (offset) {    // this is a reconnection    for (const event of await fetchMissedEventsFromDatabase(offset)) {      socket.emit("my-event", event);    }  } else {    // this is a first connection  }});  
  
setInterval(async () => {  
  const event = {    id: generateUniqueId(),    data: new Date().toISOString()  }  
  await persistEventToDatabase(event);  io.emit("my-event", event);}, 1000);  
```
Implementing the missing methods (`fetchMissedEventsFromDatabase()`, `generateUniqueId()` and `persistEventToDatabase()`) is database-specific and is left as an exercise for the reader.

References:

* [`socket.auth`](_docs_v4_client-options_.md#socket-options) (client)
* [`socket.handshake`](_docs_v4_server-api_.md#sockethandshake) (server)

#### _docs_v4_emit-cheatsheet.md

> Source: https://socket.io/docs/v4/emit-cheatsheet
> Scraped: 4/14/2025, 11:55:31 PM

Version: 4.x

caution

The following event names are reserved and must not be used in your application:

*   `connect`
*   `connect_error`
*   `disconnect`
*   `disconnecting`
*   `newListener`
*   `removeListener`
```
// BAD, will throw an error  
socket.emit("disconnecting");  
```
### Single client[​](_docs_v4_emit-cheatsheet.md#single-client)

#### Basic emit[​](_docs_v4_emit-cheatsheet.md#basic-emit)
```
io.on("connection", (socket) => {  
  socket.emit("hello", 1, "2", { 3: "4", 5: Buffer.from([6]) });});  
```
#### Acknowledgement[​](_docs_v4_emit-cheatsheet.md#acknowledgement)

*   Callback
*   Promise
```
io.on("connection", (socket) => {  
  socket.emit("hello", "world", (arg1, arg2, arg3) => {    // ...  });});  
```
#### Acknowledgement and timeout[​](_docs_v4_emit-cheatsheet.md#acknowledgement-and-timeout)

*   Callback
*   Promise
```
io.on("connection", (socket) => {  
  socket.timeout(5000).emit("hello", "world", (err, arg1, arg2, arg3) => {    if (err) {      // the client did not acknowledge the event in the given delay    } else {      // ...    }  });});  
```
### Broadcasting[​](_docs_v4_emit-cheatsheet.md#broadcasting)

#### To all connected clients[​](_docs_v4_emit-cheatsheet.md#to-all-connected-clients)

#### Except the sender[​](_docs_v4_emit-cheatsheet.md#except-the-sender)
```
io.on("connection", (socket) => {  
  socket.broadcast.emit("hello");});  
```
#### Acknowledgements[​](_docs_v4_emit-cheatsheet.md#acknowledgements)

*   Callback
*   Promise
```
io.timeout(5000).emit("hello", "world", (err, responses) => {  
  if (err) {    // some clients did not acknowledge the event in the given delay  } else {    console.log(responses); // one response per client  }});  
```
#### In a room[​](_docs_v4_emit-cheatsheet.md#in-a-room)

*   to all connected clients in the room named "my room"
```
io.to("my room").emit("hello");  
```
*   to all connected clients except the ones in the room named "my room"
```
io.except("my room").emit("hello");  
```
*   with multiple clauses
```
io.to("room1").to(["room2", "room3"]).except("room4").emit("hello");  
```
#### In a namespace[​](_docs_v4_emit-cheatsheet.md#in-a-namespace)
```
io.of("/my-namespace").emit("hello");  
```
tip

The modifiers can absolutely be chained:
```
io.of("/my-namespace").on("connection", (socket) => {  
  socket    .timeout(5000)    .to("room1")    .to(["room2", "room3"])    .except("room4")    .emit("hello", (err, responses) => {      // ...    });});  
```
This will emit a "hello" event to all connected clients:

*   in the namespace named `my-namespace`
*   in at least one of the rooms named `room1`, `room2` and `room3`, but not in `room4`
*   except the sender

And expect an acknowledgement in the next 5 seconds.

### Between servers[​](_docs_v4_emit-cheatsheet.md#between-servers)

#### Basic emit[​](_docs_v4_emit-cheatsheet.md#basic-emit-1)
```
io.serverSideEmit("hello", "world");  
```
Receiving side:
```
io.on("hello", (value) => {  
  console.log(value); // "world"});  
```
#### Acknowledgements[​](_docs_v4_emit-cheatsheet.md#acknowledgements-1)

*   Callback
*   Promise
```
io.serverSideEmit("hello", "world", (err, responses) => {  
  if (err) {    // some servers did not acknowledge the event in the given delay  } else {    console.log(responses); // one response per server (except the current one)  }});  
```
Receiving side:
```
io.on("hello", (value, callback) => {  
  console.log(value); // "world"  callback("hi");});  
```
### Basic emit[​](_docs_v4_emit-cheatsheet.md#basic-emit-2)
```
socket.emit("hello", 1, "2", { 3: "4", 5: Uint8Array.from([6]) });  
```
### Acknowledgement[​](_docs_v4_emit-cheatsheet.md#acknowledgement-1)

*   Callback
*   Promise
```
socket.emit("hello", "world", (arg1, arg2, arg3) => {  
  // ...});  
```
### Acknowledgement and timeout[​](_docs_v4_emit-cheatsheet.md#acknowledgement-and-timeout-1)

*   Callback
*   Promise
```
socket.timeout(5000).emit("hello", "world", (err, arg1, arg2, arg3) => {  
  if (err) {    // the server did not acknowledge the event in the given delay  } else {    // ...  }});  
```

#### _docs_v4_emitting-events.md

> Source: https://socket.io/docs/v4/emitting-events
> Scraped: 4/14/2025, 11:55:40 PM

There are several ways to send events between the server and the client.

tip

For TypeScript users, it is possible to provide type hints for the events. Please check [this](_docs_v4_typescript_.md).

The Socket.IO API is inspired from the Node.js [EventEmitter](https://nodejs.org/docs/latest/api/events.html#events_events), which means you can emit events on one side and register listeners on the other:

_Server_
```
io.on("connection", (socket) => {  
  socket.emit("hello", "world");});  
```
_Client_
```
socket.on("hello", (arg) => {  
  console.log(arg); // world});  
```
This also works in the other direction:

_Server_
```
io.on("connection", (socket) => {  
  socket.on("hello", (arg) => {    console.log(arg); // world  });});  
```
_Client_
```
socket.emit("hello", "world");  
```
You can send any number of arguments, and all serializable data structures are supported, including binary objects like [Buffer](https://nodejs.org/docs/latest/api/buffer.html#buffer_buffer) or [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray).

_Server_
```
io.on("connection", (socket) => {  
  socket.emit("hello", 1, "2", { 3: '4', 5: Buffer.from([6]) });});  
```
_Client_
```
// client-side  
socket.on("hello", (arg1, arg2, arg3) => {  
  console.log(arg1); // 1  console.log(arg2); // "2"  console.log(arg3); // { 3: '4', 5: ArrayBuffer (1) [ 6 ] }});  
```
There is no need to run `JSON.stringify()` on objects as it will be done for you.
```
// BAD  
socket.emit("hello", JSON.stringify({ name: "John" }));  
  
// GOOD  
socket.emit("hello", { name: "John" });  
```
Notes:

* [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects will be converted to (and received as) their string representation, e.g. `1970-01-01T00:00:00.000Z`
    
* [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) must be manually serialized:
    
```
const serializedMap = [...myMap.entries()];  
const serializedSet = [...mySet.keys()];  
```
*   you can use the [`toJSON()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior) method to customize the serialization of an object

Example with a class:
```
class Hero {  
  #hp;  
  constructor() {    this.#hp = 42;  }  
  toJSON() {    return { hp: this.#hp };  }}  
  
socket.emit("here's a hero", new Hero());  
```
Events are great, but in some cases you may want a more classic request-response API. In Socket.IO, this feature is named acknowledgements.

You can add a callback as the last argument of the `emit()`, and this callback will be called once the other side acknowledges the event:

_Server_
```
io.on("connection", (socket) => {  
  socket.on("update item", (arg1, arg2, callback) => {    console.log(arg1); // 1    console.log(arg2); // { name: "updated" }    callback({      status: "ok"    });  });});  
```
_Client_
```
socket.emit("update item", "1", { name: "updated" }, (response) => {  
  console.log(response.status); // ok});  
```
Starting with Socket.IO v4.4.0, you can now assign a timeout to each emit:
```
socket.timeout(5000).emit("my-event", (err) => {  
  if (err) {    // the other side did not acknowledge the event in the given delay  }});  
```
You can also use both a timeout and an [acknowledgement](_docs_v4_emitting-events.md#acknowledgements):
```
socket.timeout(5000).emit("my-event", (err, response) => {  
  if (err) {    // the other side did not acknowledge the event in the given delay  } else {    console.log(response);  }});  
```
Volatile events are events that will not be sent if the underlying connection is not ready (a bit like [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol), in terms of reliability).

This can be interesting for example if you need to send the position of the characters in an online game (as only the latest values are useful).
```
socket.volatile.emit("hello", "might or might not be received");  
```
Another use case is to discard events when the client is not connected (by default, the events are buffered until reconnection).

Example:

_Server_
```
io.on("connection", (socket) => {  
  console.log("connect");  
  socket.on("ping", (count) => {    console.log(count);  });});  
```
_Client_
```
let count = 0;  
setInterval(() => {  
  socket.volatile.emit("ping", ++count);}, 1000);  
```
If you restart the server, you will see in the console:
```
connect  
1  
2  
3  
4  
# the server is restarted, the client automatically reconnects  

connect  
9  
10  
11  
```
Without the `volatile` flag, you would see:
```
connect  
1  
2  
3  
4  
# the server is restarted, the client automatically reconnects and sends its buffered events  

connect  
5  
6  
7  
8  
9  
10  
11  
```

#### _docs_v4_engine-io-protocol.md

> Source: https://socket.io/docs/v4/engine-io-protocol
> Scraped: 4/14/2025, 11:55:40 PM

This document describes the 4th version of the Engine.IO protocol.

The source of this document can be found [here](https://github.com/socketio/engine.io-protocol).

**Table of content** [Introduction](_docs_v4_engine-io-protocol.md#introduction)
* [Transports](_docs_v4_engine-io-protocol.md#transports)
    * [HTTP long-polling](_docs_v4_engine-io-protocol.md#http-long-polling)
        * [Request path](_docs_v4_engine-io-protocol.md#request-path)
        * [Query parameters](_docs_v4_engine-io-protocol.md#query-parameters)
        * [Headers](_docs_v4_engine-io-protocol.md#headers)
        * [Sending and receiving data](_docs_v4_engine-io-protocol.md#sending-and-receiving-data)
            * [Sending data](_docs_v4_engine-io-protocol.md#sending-data)
            * [Receiving data](_docs_v4_engine-io-protocol.md#receiving-data)
    * [WebSocket](_docs_v4_engine-io-protocol.md#websocket)
* [Protocol](_docs_v4_engine-io-protocol.md#protocol)
    * [Handshake](_docs_v4_engine-io-protocol.md#handshake)
    * [Heartbeat](_docs_v4_engine-io-protocol.md#heartbeat)
    * [Upgrade](_docs_v4_engine-io-protocol.md#upgrade)
    * [Message](_docs_v4_engine-io-protocol.md#message)
* [Packet encoding](_docs_v4_engine-io-protocol.md#packet-encoding)
    * [HTTP long-polling](_docs_v4_engine-io-protocol.md#http-long-polling-1)
    * [WebSocket](_docs_v4_engine-io-protocol.md#websocket-1)
* [History](_docs_v4_engine-io-protocol.md#history)
    * [From v2 to v3](_docs_v4_engine-io-protocol.md#from-v2-to-v3)
    * [From v3 to v4](_docs_v4_engine-io-protocol.md#from-v3-to-v4)
* [Test suite](_docs_v4_engine-io-protocol.md#test-suite)

The Engine.IO protocol enables [full-duplex](https://en.wikipedia.org/wiki/Duplex_(telecommunications)#FULL-DUPLEX) and low-overhead communication between a client and a server.

It is based on the [WebSocket protocol](https://en.wikipedia.org/wiki/WebSocket) and uses [HTTP long-polling](https://en.wikipedia.org/wiki/Push_technology#Long_polling) as fallback if the WebSocket connection can't be established.

The reference implementation is written in [TypeScript](https://www.typescriptlang.org/):

*   server: [https://github.com/socketio/engine.io](https://github.com/socketio/engine.io)
*   client: [https://github.com/socketio/engine.io-client](https://github.com/socketio/engine.io-client)

The [Socket.IO protocol](https://github.com/socketio/socket.io-protocol) is built on top of these foundations, bringing additional features over the communication channel provided by the Engine.IO protocol.

The connection between an Engine.IO client and an Engine.IO server can be established with:

* [HTTP long-polling](_docs_v4_engine-io-protocol.md#http-long-polling)
* [WebSocket](_docs_v4_engine-io-protocol.md#websocket)

### HTTP long-polling[​](_docs_v4_engine-io-protocol.md#http-long-polling)

The HTTP long-polling transport (also simply referred as "polling") consists of successive HTTP requests:

*   long-running `GET` requests, for receiving data from the server
*   short-running `POST` requests, for sending data to the server

#### Request path[​](_docs_v4_engine-io-protocol.md#request-path)

The path of the HTTP requests is `/engine.io/` by default.

It might be updated by libraries built on top of the protocol (for example, the Socket.IO protocol uses `/socket.io/`).

#### Query parameters[​](_docs_v4_engine-io-protocol.md#query-parameters)

The following query parameters are used:

Name

Value

Description

`EIO`

`4`

Mandatory, the version of the protocol.

`transport`

`polling`

Mandatory, the name of the transport.

`sid`

`<sid>`

Mandatory once the session is established, the session identifier.

If a mandatory query parameter is missing, then the server MUST respond with an HTTP 400 error status.

When sending binary data, the sender (client or server) MUST include a `Content-Type: application/octet-stream` header.

Without an explicit `Content-Type` header, the receiver SHOULD infer that the data is plaintext.

Reference: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)

#### Sending and receiving data[​](_docs_v4_engine-io-protocol.md#sending-and-receiving-data)

##### Sending data[​](_docs_v4_engine-io-protocol.md#sending-data)

To send some packets, a client MUST create an HTTP `POST` request with the packets encoded in the request body:
```
CLIENT                                                 SERVER  
  
  │                                                      │  │   POST /engine.io/?EIO=4&transport=polling&sid=...   │  │ ───────────────────────────────────────────────────► │  │ ◄──────────────────────────────────────────────────┘ │  │                        HTTP 200                      │  │                                                      │
```
The server MUST return an HTTP 400 response if the session ID (from the `sid` query parameter) is not known.

To indicate success, the server MUST return an HTTP 200 response, with the string `ok` in the response body.

To ensure packet ordering, a client MUST NOT have more than one active `POST` request. Should it happen, the server MUST return an HTTP 400 error status and close the session.

##### Receiving data[​](_docs_v4_engine-io-protocol.md#receiving-data)

To receive some packets, a client MUST create an HTTP `GET` request:
```
CLIENT                                                SERVER  
  
  │   GET /engine.io/?EIO=4&transport=polling&sid=...   │  │ ──────────────────────────────────────────────────► │  │                                                   . │  │                                                   . │  │                                                   . │  │                                                   . │  │ ◄─────────────────────────────────────────────────┘ │  │                       HTTP 200                      │
```
The server MUST return an HTTP 400 response if the session ID (from the `sid` query parameter) is not known.

The server MAY not respond right away if there are no packets buffered for the given session. Once there are some packets to be sent, the server SHOULD encode them (see [Packet encoding](_docs_v4_engine-io-protocol.md#packet-encoding)) and send them in the response body of the HTTP request.

To ensure packet ordering, a client MUST NOT have more than one active `GET` request. Should it happen, the server MUST return an HTTP 400 error status and close the session.

### WebSocket[​](_docs_v4_engine-io-protocol.md#websocket)

The WebSocket transport consists of a [WebSocket connection](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), which provides a bidirectional and low-latency communication channel between the server and the client.

The following query parameters are used:

Name

Value

Description

`EIO`

`4`

Mandatory, the version of the protocol.

`transport`

`websocket`

Mandatory, the name of the transport.

`sid`

`<sid>`

Optional, depending on whether it's an upgrade from HTTP long-polling or not.

If a mandatory query parameter is missing, then the server MUST close the WebSocket connection.

Each packet (read or write) is sent its own [WebSocket frame](https://datatracker.ietf.org/doc/html/rfc6455#section-5).

A client MUST NOT open more than one WebSocket connection per session. Should it happen, the server MUST close the WebSocket connection.

An Engine.IO packet consists of:

*   a packet type
*   an optional packet payload

Here is the list of available packet types:

Type

ID

Usage

open

0

Used during the [handshake](_docs_v4_engine-io-protocol.md#handshake).

close

1

Used to indicate that a transport can be closed.

ping

2

Used in the [heartbeat mechanism](_docs_v4_engine-io-protocol.md#heartbeat).

pong

3

Used in the [heartbeat mechanism](_docs_v4_engine-io-protocol.md#heartbeat).

message

4

Used to send a payload to the other side.

upgrade

5

Used during the [upgrade process](_docs_v4_engine-io-protocol.md#upgrade).

noop

6

Used during the [upgrade process](_docs_v4_engine-io-protocol.md#upgrade).

### Handshake[​](_docs_v4_engine-io-protocol.md#handshake)

To establish a connection, the client MUST send an HTTP `GET` request to the server:

*   HTTP long-polling first (by default)
```
CLIENT                                                    SERVER  
  
  │                                                          │  │        GET /engine.io/?EIO=4&transport=polling           │  │ ───────────────────────────────────────────────────────► │  │ ◄──────────────────────────────────────────────────────┘ │  │                        HTTP 200                          │  │                                                          │
```
*   WebSocket-only session
```
CLIENT                                                    SERVER  
  
  │                                                          │  │        GET /engine.io/?EIO=4&transport=websocket         │  │ ───────────────────────────────────────────────────────► │  │ ◄──────────────────────────────────────────────────────┘ │  │                        HTTP 101                          │  │                                                          │
```
If the server accepts the connection, then it MUST respond with an `open` packet with the following JSON-encoded payload:

Key

Type

Description

`sid`

`string`

The session ID.

`upgrades`

`string[]`

The list of available [transport upgrades](_docs_v4_engine-io-protocol.md#upgrade).

`pingInterval`

`number`

The ping interval, used in the [heartbeat mechanism](_docs_v4_engine-io-protocol.md#heartbeat) (in milliseconds).

`pingTimeout`

`number`

The ping timeout, used in the [heartbeat mechanism](_docs_v4_engine-io-protocol.md#heartbeat) (in milliseconds).

`maxPayload`

`number`

The maximum number of bytes per chunk, used by the client to aggregate packets into [payloads](_docs_v4_engine-io-protocol.md#packet-encoding).

Example:
```
{  
  "sid": "lv_VI97HAXpY6yYWAAAC",  "upgrades": ["websocket"],  "pingInterval": 25000,  "pingTimeout": 20000,  "maxPayload": 1000000}  
```
The client MUST send the `sid` value in the query parameters of all subsequent requests.

### Heartbeat[​](_docs_v4_engine-io-protocol.md#heartbeat)

Once the [handshake](_docs_v4_engine-io-protocol.md#handshake) is completed, a heartbeat mechanism is started to check the liveness of the connection:
```
CLIENT                                                 SERVER  
  
  │                   *** Handshake ***                  │  │                                                      │  │  ◄─────────────────────────────────────────────────  │  │                           2                          │  (ping packet)  │  ─────────────────────────────────────────────────►  │  │                           3                          │  (pong packet)
```
At a given interval (the `pingInterval` value sent in the handshake) the server sends a `ping` packet and the client has a few seconds (the `pingTimeout` value) to send a `pong` packet back.

If the server does not receive a `pong` packet back, then it SHOULD consider that the connection is closed.

Conversely, if the client does not receive a `ping` packet within `pingInterval + pingTimeout`, then it SHOULD consider that the connection is closed.

### Upgrade[​](_docs_v4_engine-io-protocol.md#upgrade)

By default, the client SHOULD create an HTTP long-polling connection, and then upgrade to better transports if available.

To upgrade to WebSocket, the client MUST:

*   pause the HTTP long-polling transport (no more HTTP request gets sent), to ensure that no packet gets lost
*   open a WebSocket connection with the same session ID
*   send a `ping` packet with the string `probe` in the payload

The server MUST:

*   send a `noop` packet to any pending `GET` request (if applicable) to cleanly close HTTP long-polling transport
*   respond with a `pong` packet with the string `probe` in the payload

Finally, the client MUST send a `upgrade` packet to complete the upgrade:
```
CLIENT                                                 SERVER  
  
  │                                                      │  │   GET /engine.io/?EIO=4&transport=websocket&sid=...  │  │ ───────────────────────────────────────────────────► │  │  ◄─────────────────────────────────────────────────┘ │  │            HTTP 101 (WebSocket handshake)            │  │                                                      │  │            -----  WebSocket frames -----             │  │  ─────────────────────────────────────────────────►  │  │                         2probe                       │ (ping packet)  │  ◄─────────────────────────────────────────────────  │  │                         3probe                       │ (pong packet)  │  ─────────────────────────────────────────────────►  │  │                         5                            │ (upgrade packet)  │                                                      │
```
### Message[​](_docs_v4_engine-io-protocol.md#message)

Once the [handshake](_docs_v4_engine-io-protocol.md#handshake) is completed, the client and the server can exchange data by including it in a `message` packet.

The serialization of an Engine.IO packet depends on the type of the payload (plaintext or binary) and on the transport.

### HTTP long-polling[​](_docs_v4_engine-io-protocol.md#http-long-polling-1)

Due to the nature of the HTTP long-polling transport, multiple packets might be concatenated in a single payload in order to increase throughput.

Format:
```
<packet type>[<data>]<separator><packet type>[<data>]<separator><packet type>[<data>][...]  
```
Example:
```
4hello\x1e2\x1e4world  
  
with:  
  
4      => message packet type  
hello  => message payload  
\x1e   => separator  
2      => ping packet type  
\x1e   => separator  
4      => message packet type  
world  => message payload  
```
The packets are separated by the [record separator character](https://en.wikipedia.org/wiki/C0_and_C1_control_codes#Field_separators): `\x1e`

Binary payloads MUST be base64-encoded and prefixed with a `b` character:

Example:
```
4hello\x1ebAQIDBA==  
  
with:  
  
4         => message packet type  
hello     => message payload  
\x1e      => separator  
b         => binary prefix  
AQIDBA==  => buffer <01 02 03 04> encoded as base64  
```
The client SHOULD use the `maxPayload` value sent during the [handshake](_docs_v4_engine-io-protocol.md#handshake) to decide how many packets should be concatenated.

### WebSocket[​](_docs_v4_engine-io-protocol.md#websocket-1)

Each Engine.IO packet is sent in its own [WebSocket frame](https://datatracker.ietf.org/doc/html/rfc6455#section-5).

Format:

Example:
```
4hello  
  
with:  
  
4      => message packet type  
hello  => message payload (UTF-8 encoded)  
```
Binary payloads are sent as is, without modification.

## History[​](_docs_v4_engine-io-protocol.md#history)

### From v2 to v3[​](_docs_v4_engine-io-protocol.md#from-v2-to-v3)

*   add support for binary data

The [2nd version](https://github.com/socketio/engine.io-protocol/tree/v2) of the protocol is used in Socket.IO `v0.9` and below.

The [3rd version](https://github.com/socketio/engine.io-protocol/tree/v3) of the protocol is used in Socket.IO `v1` and `v2`.

### From v3 to v4[​](_docs_v4_engine-io-protocol.md#from-v3-to-v4)

*   reverse ping/pong mechanism

The ping packets are now sent by the server, because the timers set in the browsers are not reliable enough. We suspect that a lot of timeout problems came from timers being delayed on the client-side.

*   always use base64 when encoding a payload with binary data

This change allows to treat all payloads (with or without binary) the same way, without having to take in account whether the client or the current transport supports binary data or not.

Please note that this only applies to HTTP long-polling. Binary data is sent in WebSocket frames with no additional transformation.

*   use a record separator (`\x1e`) instead of counting of characters

Counting characters prevented (or at least makes harder) to implement the protocol in other languages, which may not use the UTF-16 encoding.

For example, `€` was encoded to `2:4€`, though `Buffer.byteLength('€') === 3`.

Note: this assumes the record separator is not used in the data.

The 4th version (current) is included in Socket.IO `v3` and above.

The test suite in the [`test-suite/`](https://github.com/socketio/engine.io-protocol/tree/main/test-suite) directory lets you check the compliance of a server implementation.

Usage:

*   in Node.js: `npm ci && npm test`
*   in a browser: simply open the `index.html` file in your browser

For reference, here is expected configuration for the JavaScript server to pass all tests:
```
import { listen } from "engine.io";  
  
const server = listen(3000, {  
  pingInterval: 300,  pingTimeout: 200,  maxPayload: 1e6,  cors: {    origin: "*"  }});  
  
server.on("connection", socket => {  
  socket.on("data", (...args) => {    socket.send(...args);  });});  
```

#### _docs_v4_gcp-pubsub-adapter.md

> Source: https://socket.io/docs/v4/gcp-pubsub-adapter
> Scraped: 4/14/2025, 11:55:41 PM

*   [](index.md)
*   Adapters
*   Google Cloud Pub/Sub adapter

Version: 4.x

## How it works[​](_docs_v4_gcp-pubsub-adapter.md#how-it-works)

This adapter uses [Google Cloud Pub/Sub service](https://cloud.google.com/pubsub/docs/overview) to forward messages between the nodes of a Socket.IO cluster.

The source code of this adapter can be found [here](https://github.com/socketio/socket.io-gcp-pubsub-adapter).

## Supported features[​](_docs_v4_gcp-pubsub-adapter.md#supported-features)

Feature

`socket.io` version

Support

Socket management

`4.0.0`

✅ YES (since version `0.1.0`)

Inter-server communication

`4.1.0`

✅ YES (since version `0.1.0`)

Broadcast with acknowledgements

[`4.5.0`](_docs_v4_changelog_4.5.0.md)

✅ YES (since version `0.1.0`)

Connection state recovery

[`4.6.0`](_docs_v4_changelog_4.6.0.md)

❌ NO

## Installation[​](_docs_v4_gcp-pubsub-adapter.md#installation)
```
npm install @socket.io/gcp-pubsub-adapter  
```
## Usage[​](_docs_v4_gcp-pubsub-adapter.md#usage)
```
import { PubSub } from "@google-cloud/pubsub";  
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/gcp-pubsub-adapter";  
  
const pubsub = new PubSub({  
  projectId: "your-project-id"});  
  
const topic = pubsub.topic(topicNameOrId);  
  
const io = new Server({  
  adapter: createAdapter(topic)});  
  
// wait for the creation of the pub/sub subscription  
await io.of("/").adapter.init();  
  
io.listen(3000);  
```
## Options[​](_docs_v4_gcp-pubsub-adapter.md#options)

Name

Description

Default value

`subscriptionPrefix`

The prefix for the new subscription to create.

`socket.io`

`subscriptionOptions`

The options used to create the subscription.

`-`

`heartbeatInterval`

The number of ms between two heartbeats.

`5_000`

`heartbeatTimeout`

The number of ms without heartbeat before we consider a node down.

`10_000`

## Latest releases[​](_docs_v4_gcp-pubsub-adapter.md#latest-releases)

Version

Release date

Release notes

Diff

`0.1.0`

March 2024

[link](https://github.com/socketio/socket.io-gcp-pubsub-adapter/releases/tag/0.1.0)

`-`

[Complete changelog](https://github.com/socketio/socket.io-gcp-pubsub-adapter/blob/main/CHANGELOG.md)

[

Previous

Cluster adapter

](_docs_v4_cluster-adapter_.md)[

Next

AWS SQS adapter

](_docs_v4_aws-sqs-adapter_.md)

#### _docs_v4_glossary.md

> Source: https://socket.io/docs/v4/glossary
> Scraped: 4/14/2025, 11:55:41 PM

We will list here the terms that are related to the Socket.IO ecosystem:

* [Adapter](_docs_v4_glossary.md#adapter)
* [Engine.IO](_docs_v4_glossary.md#engineio)
* [Namespace](_docs_v4_glossary.md#namespace)
* [Room](_docs_v4_glossary.md#room)
* [Transport](_docs_v4_glossary.md#transport)

An Adapter is a server-side component which is responsible for:

*   storing the relationships between the Socket instances and the [rooms](_docs_v4_rooms_.md)
*   broadcasting events to [all](_docs_v4_broadcasting-events_.md) (or a subset of) clients

Besides the [in-memory adapter](https://github.com/socketio/socket.io-adapter/) which is included by default with the Socket.IO server, there are currently 5 official adapters:

*   the [Redis adapter](_docs_v4_redis-adapter_.md)
*   the [Redis Streams adapter](_docs_v4_redis-streams-adapter_.md)
*   the [MongoDB adapter](_docs_v4_mongo-adapter_.md)
*   the [Postgres adapter](_docs_v4_postgres-adapter_.md)
*   the [Cluster adapter](_docs_v4_cluster-adapter_.md)

The in-memory adapter can be extended to add support for other messaging systems, like RabbitMQ or Google Pub/Sub for example.

Please see the documentation [here](_docs_v4_adapter_.md).

Engine.IO is an internal component of Socket.IO, which is responsible for establishing the low-level connection between the server and the client.

You will find more information [here](_docs_v4_how-it-works_.md).

A Namespace is a concept that allows splitting the application logic on the server-side.

Please see the documentation [here](_docs_v4_namespaces_.md).

A Room is a server-side concept that allows broadcasting data to a subset of clients.

Please see the documentation [here](_docs_v4_rooms_.md).

A Transport represents the low-level way of establishing a connection between the server and the client.

There are currently two implemented transports:

*   HTTP long-polling
* [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
* [WebTransport](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API)

Please see the documentation [here](_docs_v4_how-it-works_.md#transports).

#### _docs_v4_handling-cors.md

> Source: https://socket.io/docs/v4/handling-cors
> Scraped: 4/14/2025, 11:55:40 PM

Version: 4.x

Since Socket.IO v3, you need to explicitly enable [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS).
```
import { createServer } from "http";  
import { Server } from "socket.io";  
  
const httpServer = createServer();  
const io = new Server(httpServer, {  
  cors: {    origin: "https://example.com"  }});  
```
All options will be forwarded to the [cors](https://www.npmjs.com/package/cors) package. The complete list of options can be found [here](https://github.com/expressjs/cors#configuration-options).

Example with cookies ([withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)) and additional headers:
```
// server-side  
const io = new Server(httpServer, {  
  cors: {    origin: "https://example.com",    allowedHeaders: ["my-custom-header"],    credentials: true  }});  
  
// client-side  
import { io } from "socket.io-client";  
const socket = io("https://api.example.com", {  
  withCredentials: true,  extraHeaders: {    "my-custom-header": "abcd"  }});  
```
Note: this also applies to localhost if your web application and your server are not served from the same port
```
const io = new Server(httpServer, {  
  cors: {    origin: "http://localhost:8080"  }});  
  
httpServer.listen(3000);  
```
You can disallow all cross-origin requests with the [`allowRequest`](_docs_v4_server-options_.md#allowrequest) option:
```
const io = new Server(httpServer, {  
  allowRequest: (req, callback) => {    const noOriginHeader = req.headers.origin === undefined;    callback(null, noOriginHeader); // only allow requests without 'origin' header  }});  
```
Full error message:

> _Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at .../socket.io/?EIO=4&transport=polling&t=NMnp2WI. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)._

If you have properly configured your server (see [above](_docs_v4_handling-cors.md#configuration)), this could mean that your browser wasn't able to reach the Socket.IO server.

The following command:
```
curl "https://api.example.com/socket.io/?EIO=4&transport=polling"  
```
should return something like:
```
0{"sid":"Lbo5JLzTotvW3g2LAAAA","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":20000}  
```
If that's not the case, please check that your server is listening and is actually reachable on the given port.

Full error message:

> _Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at ‘.../socket.io/?EIO=4&transport=polling&t=NvQfU77’. (Reason: Credential is not supported if the CORS header ‘Access-Control-Allow-Origin’ is ‘\*’)_

You can't set [`withCredentials`](_docs_v4_client-options_.md#withcredentials) to `true` with `origin: *`, you need to use a specific origin:
```
import { createServer } from "http";  
import { Server } from "socket.io";  
  
const httpServer = createServer();  
const io = new Server(httpServer, {  
  cors: {    origin: "https://my-frontend.com",    // or with an array of origins    // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],    credentials: true  }});  
```
Full error message:

> _Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at .../socket.io/?EIO=4&transport=polling&t=NvQny19. (Reason: expected ‘true’ in CORS header ‘Access-Control-Allow-Credentials’)_

In that case, [`withCredentials`](_docs_v4_client-options_.md#withcredentials) is set to `true` on the client, but the server is missing the `credentials` attribute in the [`cors`](_docs_v4_server-options_.md#cors) option. See the example above.

#### _docs_v4_how-it-works.md

> Source: https://socket.io/docs/v4/how-it-works
> Scraped: 4/14/2025, 11:55:31 PM

The bidirectional channel between the Socket.IO server (Node.js) and the Socket.IO client (browser, Node.js, or [another programming language](_docs_v4_.md#what-socketio-is)) is established with a [WebSocket connection](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) whenever possible, and will use HTTP long-polling as fallback.

The Socket.IO codebase is split into two distinct layers:

*   the low-level plumbing: what we call Engine.IO, the engine inside Socket.IO
*   the high-level API: Socket.IO itself

Engine.IO is responsible for establishing the low-level connection between the server and the client. It handles:

*   the various [transports](_docs_v4_how-it-works.md#transports) and the [upgrade mechanism](_docs_v4_how-it-works.md#upgrade-mechanism)
*   the [disconnection detection](_docs_v4_how-it-works.md#disconnection-detection)

A detailed version of the Engine.IO protocol can be found [here](_docs_v4_engine-io-protocol_.md).

The source code of the reference implementation (written in TypeScript) can be found here:

*   server: [https://github.com/socketio/engine.io](https://github.com/socketio/engine.io)
*   client: [https://github.com/socketio/engine.io-client](https://github.com/socketio/engine.io-client)
*   parser: [https://github.com/socketio/engine.io-parser](https://github.com/socketio/engine.io-parser)

### Transports[​](_docs_v4_how-it-works.md#transports)

There are currently two implemented transports:

* [HTTP long-polling](_docs_v4_how-it-works.md#http-long-polling)
* [WebSocket](_docs_v4_how-it-works.md#websocket)

#### HTTP long-polling[​](_docs_v4_how-it-works.md#http-long-polling)

The HTTP long-polling transport (also simply referred as "polling") consists of successive HTTP requests:

*   long-running `GET` requests, for receiving data from the server
*   short-running `POST` requests, for sending data to the server

Due to the nature of the transport, successive emits may be concatenated and sent within the same HTTP request.

#### WebSocket[​](_docs_v4_how-it-works.md#websocket)

The WebSocket transport consists, well, of a [WebSocket connection](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), which provides a bidirectional and low-latency communication channel between the server and the client.

Due to the nature of the transport, each emit is sent in its own WebSocket frame (some emits may even result in two distinct WebSocket frames, more information [here](_docs_v4_custom-parser_.md#the-default-parser)).

### Handshake[​](_docs_v4_how-it-works.md#handshake)

At the beginning of the Engine.IO connection, the server sends some information:
```
{  
  "sid": "FSDjX-WRwSA4zTZMALqx",  "upgrades": ["websocket"],  "pingInterval": 25000,  "pingTimeout": 20000}  
```
*   the `sid` is the ID of the session, it must be included in the `sid` query parameter in all subsequent HTTP requests
*   the `upgrades` array contains the list of all "better" transports that are supported by the server
*   the `pingInterval` and `pingTimeout` values are used in the heartbeat mechanism

### Upgrade mechanism[​](_docs_v4_how-it-works.md#upgrade-mechanism)

By default, the client establishes the connection with the HTTP long-polling transport.

**But, why?**

While WebSocket is clearly the best way to establish a bidirectional communication, experience has shown that it is not always possible to establish a WebSocket connection, due to corporate proxies, personal firewall, antivirus software...

From the user perspective, an unsuccessful WebSocket connection can translate in up to 10 seconds of waiting for the realtime application to begin exchanging data. This **perceptively** hurts user experience.

To summarize, Engine.IO focuses on reliability and user experience first, marginal potential UX improvements and increased server performance second.

To upgrade, the client will:

*   ensure its outgoing buffer is empty
*   put the current transport in read-only mode
*   try to establish a connection with the other transport
*   if successful, close the first transport

You can check in the Network Monitor of your browser:

![Successful upgrade](https://socket.io/assets/images/network-monitor-2e47dbe233100aa290595f8687a9fcba.png)

1.  handshake (contains the session ID — here, `zBjrh...AAAK` — that is used in subsequent requests)
2.  send data (HTTP long-polling)
3.  receive data (HTTP long-polling)
4.  upgrade (WebSocket)
5.  receive data (HTTP long-polling, closed once the WebSocket connection in 4. is successfully established)

### Disconnection detection[​](_docs_v4_how-it-works.md#disconnection-detection)

The Engine.IO connection is considered as closed when:

*   one HTTP request (either GET or POST) fails (for example, when the server is shutdown)
*   the WebSocket connection is closed (for example, when the user closes the tab in its browser)
*   `socket.disconnect()` is called on the server-side or on the client-side

There is also a heartbeat mechanism which checks that the connection between the server and the client is still up and running:

At a given interval (the `pingInterval` value sent in the handshake) the server sends a PING packet and the client has a few seconds (the `pingTimeout` value) to send a PONG packet back. If the server does not receive a PONG packet back, it will consider that the connection is closed. Conversely, if the client does not receive a PING packet within `pingInterval + pingTimeout`, it will consider that the connection is closed.

The disconnection reasons are listed [here](_docs_v4_server-socket-instance_.md#disconnect) (server-side) and [here](_docs_v4_client-socket-instance_.md#disconnect) (client-side).

Socket.IO provides some additional features over the Engine.IO connection:

*   automatic reconnection
* [packet buffering](_docs_v4_client-offline-behavior_.md#buffered-events)
* [acknowledgments](_docs_v4_emitting-events_.md#acknowledgements)
*   broadcasting [to all clients](_docs_v4_broadcasting-events_.md) or [to a subset of clients](_docs_v4_rooms_.md) (what we call "Room")
* [multiplexing](_docs_v4_namespaces_.md) (what we call "Namespace")

A detailed version of the Socket.IO protocol can be found [here](_docs_v4_socket-io-protocol_.md).

The source code of the reference implementation (written in TypeScript) can be found here:

*   server: [https://github.com/socketio/socket.io](https://github.com/socketio/socket.io)
*   client: [https://github.com/socketio/socket.io-client](https://github.com/socketio/socket.io-client)
*   parser: [https://github.com/socketio/socket.io-parser](https://github.com/socketio/socket.io-parser)

#### _docs_v4_listening-to-events.md

> Source: https://socket.io/docs/v4/listening-to-events
> Scraped: 4/14/2025, 11:55:41 PM

There are several ways to handle events that are transmitted between the server and the client.

On the server-side, the Socket instance extends the Node.js [EventEmitter](https://nodejs.org/docs/latest/api/events.html#events_events) class.

On the client-side, the Socket instance uses the event emitter provided by the [component-emitter](https://github.com/component/emitter) library, which exposes a subset of the EventEmitter methods.

### socket.on(eventName, listener)[​](_docs_v4_listening-to-events.md#socketoneventname-listener)

Adds the _listener_ function to the end of the listeners array for the event named _eventName_.
```
socket.on("details", (...args) => {  
  // ...});  
```
### socket.once(eventName, listener)[​](_docs_v4_listening-to-events.md#socketonceeventname-listener)

Adds a **one-time** _listener_ function for the event named _eventName_
```
socket.once("details", (...args) => {  
  // ...});  
```
### socket.off(eventName, listener)[​](_docs_v4_listening-to-events.md#socketoffeventname-listener)

Removes the specified _listener_ from the listener array for the event named _eventName_.
```
const listener = (...args) => {  
  console.log(args);}  
  
socket.on("details", listener);  
  
// and then later...  
socket.off("details", listener);  
```
### socket.removeAllListeners(\[eventName\])[​](_docs_v4_listening-to-events.md#socketremovealllistenerseventname)

Removes all listeners, or those of the specified _eventName_.
```
// for a specific event  
socket.removeAllListeners("details");  
// for all events  
socket.removeAllListeners();  
```
Since Socket.IO v3, a new API inspired from the [EventEmitter2](https://github.com/EventEmitter2/EventEmitter2) library allows to declare catch-all listeners.

This feature is available on both the client and the server.

### socket.onAny(listener)[​](_docs_v4_listening-to-events.md#socketonanylistener)

Adds a listener that will be fired when any event is emitted.
```
socket.onAny((eventName, ...args) => {  
  // ...});  
```
caution

[Acknowledgements](_docs_v4_emitting-events_.md#acknowledgements) are not caught in the catch-all listener.
```
socket.emit("foo", (value) => {  
  // ...});  
  
socket.onAnyOutgoing(() => {  
  // triggered when the event is sent});  
  
socket.onAny(() => {  
  // not triggered when the acknowledgement is received});  
```
### socket.prependAny(listener)[​](_docs_v4_listening-to-events.md#socketprependanylistener)

Adds a listener that will be fired when any event is emitted. The listener is added to the beginning of the listeners array.
```
socket.prependAny((eventName, ...args) => {  
  // ...});  
```
### socket.offAny(\[listener\])[​](_docs_v4_listening-to-events.md#socketoffanylistener)

Removes all catch-all listeners, or the given listener.
```
const listener = (eventName, ...args) => {  
  console.log(eventName, args);}  
  
socket.onAny(listener);  
  
// and then later...  
socket.offAny(listener);  
  
// or all listeners  
socket.offAny();  
```
### socket.onAnyOutgoing(listener)[​](_docs_v4_listening-to-events.md#socketonanyoutgoinglistener)

Register a new catch-all listener for outgoing packets.
```
socket.onAnyOutgoing((event, ...args) => {  
  // ...});  
```
caution

[Acknowledgements](_docs_v4_emitting-events_.md#acknowledgements) are not caught in the catch-all listener.
```
socket.on("foo", (value, callback) => {  
  callback("OK");});  
  
socket.onAny(() => {  
  // triggered when the event is received});  
  
socket.onAnyOutgoing(() => {  
  // not triggered when the acknowledgement is sent});  
```
### socket.prependAnyOutgoing(listener)[​](_docs_v4_listening-to-events.md#socketprependanyoutgoinglistener)

Register a new catch-all listener for outgoing packets. The listener is added to the beginning of the listeners array.
```
socket.prependAnyOutgoing((event, ...args) => {  
  // ...});  
```
### socket.offAnyOutgoing(\[listener\])[​](_docs_v4_listening-to-events.md#socketoffanyoutgoinglistener)

Removes the previously registered listener. If no listener is provided, all catch-all listeners are removed.
```
const listener = (eventName, ...args) => {  
  console.log(eventName, args);}  
  
socket.onAnyOutgoing(listener);  
  
// remove a single listener  
socket.offAnyOutgoing(listener);  
  
// remove all listeners  
socket.offAnyOutgoing();  
```
The validation of the event arguments is out of the scope of the Socket.IO library.

There are many packages in the JS ecosystem which cover this use case, among them:

* [zod](https://zod.dev/)
* [joi](https://www.npmjs.com/package/joi)
* [ajv](https://www.npmjs.com/package/ajv)
* [validatorjs](https://www.npmjs.com/package/validatorjs)

Example with [joi](https://joi.dev/api/) and [acknowledgements](_docs_v4_emitting-events_.md#acknowledgements):
```
const Joi = require("joi");  
  
const userSchema = Joi.object({  
  username: Joi.string().max(30).required(),  email: Joi.string().email().required()});  
  
io.on("connection", (socket) => {  
  socket.on("create user", (payload, callback) => {    if (typeof callback !== "function") {      // not an acknowledgement      return socket.disconnect();    }    const { error, value } = userSchema.validate(payload);    if (error) {      return callback({        status: "Bad Request",        error      });    }    // do something with the value, and then    callback({      status: "OK"    });  });  
});  
```
There is currently no built-in error handling in the Socket.IO library, which means you must catch any error that could be thrown in a listener.
```
io.on("connection", (socket) => {  
  socket.on("list items", async (callback) => {    try {      const items = await findItems();      callback({        status: "OK",        items      });    } catch (e) {      callback({        status: "NOK"      });    }  });});  
```
This can be refactored into:
```
const errorHandler = (handler) => {  
  const handleError = (err) => {    console.error("please handle me", err);  };  
  return (...args) => {    try {      const ret = handler.apply(this, args);      if (ret && typeof ret.catch === "function") {        // async handler        ret.catch(handleError);      }    } catch (e) {      // sync handler      handleError(e);    }  };};  
  
// server or client side  
socket.on("hello", errorHandler(() => {  
  throw new Error("let's panic");}));  
```

#### _docs_v4_load-testing.md

> Source: https://socket.io/docs/v4/load-testing
> Scraped: 4/14/2025, 11:55:40 PM

Since Socket.IO has its [own protocol](https://github.com/socketio/socket.io-protocol), including handshake, heartbeats and custom packet encoding, the easiest way to load test your Socket.IO server is to use the Socket.IO client library and create _a lot of_ clients.

Artillery is a great tool for load testing your application. It allows creating connections, sending events and checking acknowledgments.

Its only limitation is that you cannot easily test server-to-client events, as the Artillery DSL is more suited for classic client-to-server communication. Which brings us to [our next section](_docs_v4_load-testing.md#manual-client-creation).

Here's a basic script to create a thousand Socket.IO clients and monitor the number of packets received per second:
```
const { io } = require("socket.io-client");  
  
const URL = process.env.URL || "http://localhost:3000";  
const MAX_CLIENTS = 1000;  
const POLLING_PERCENTAGE = 0.05;  
const CLIENT_CREATION_INTERVAL_IN_MS = 10;  
const EMIT_INTERVAL_IN_MS = 1000;  
  
let clientCount = 0;  
let lastReport = new Date().getTime();  
let packetsSinceLastReport = 0;  
  
const createClient = () => {  
  // for demonstration purposes, some clients stay stuck in HTTP long-polling  const transports =    Math.random() < POLLING_PERCENTAGE ? ["polling"] : ["polling", "websocket"];  
  const socket = io(URL, {    transports,  });  
  setInterval(() => {    socket.emit("client to server event");  }, EMIT_INTERVAL_IN_MS);  
  socket.on("server to client event", () => {    packetsSinceLastReport++;  });  
  socket.on("disconnect", (reason) => {    console.log(`disconnect due to ${reason}`);  });  
  if (++clientCount < MAX_CLIENTS) {    setTimeout(createClient, CLIENT_CREATION_INTERVAL_IN_MS);  }};  
  
createClient();  
  
const printReport = () => {  
  const now = new Date().getTime();  const durationSinceLastReport = (now - lastReport) / 1000;  const packetsPerSeconds = (    packetsSinceLastReport / durationSinceLastReport  ).toFixed(2);  
  console.log(    `client count: ${clientCount} ; average packets received per second: ${packetsPerSeconds}`  );  
  packetsSinceLastReport = 0;  lastReport = now;};  
  
setInterval(printReport, 5000);  
```
You can use it as a starting point for load testing your own application.

#### _docs_v4_logging-and-debugging.md

> Source: https://socket.io/docs/v4/logging-and-debugging
> Scraped: 4/14/2025, 11:55:31 PM

Socket.IO is now completely instrumented by a minimalistic yet tremendously powerful utility called [debug](https://github.com/visionmedia/debug) by TJ Holowaychuk.

Before 1.0, the Socket.IO server would default to logging everything out to the console. This turned out to be annoyingly verbose for many users (although extremely useful for others), so now we default to being completely silent by default.

The basic idea is that each module used by Socket.IO provides different debugging scopes that give you insight into the internals. By default, all output is suppressed, and you can opt into seeing messages by supplying the `DEBUG` env variable (Node.JS) or the `localStorage.debug` property (Browsers).

You can see it in action for example on our homepage:

The best way to see what information is available is to use the `*`:

or in the browser:
```
localStorage.debug = '*';  
```
And then filter by the scopes you’re interested in. You can prefix the `*` with scopes, separated by comma if there is more than one. For example, to only see debug statements from the socket.io client on Node.js try this:
```
DEBUG=socket.io:client* node yourfile.js  
```
To see all debug messages from the engine _and_ socket.io:
```
DEBUG=engine,socket.io* node yourfile.js  
```
### Removing debug from your browser bundle[​](_docs_v4_logging-and-debugging.md#removing-debug-from-your-browser-bundle)

While useful during development, the debug package adds an extra weight to the final bundle (about 4KB minified and gzipped), that's why it is excluded from the slim bundle (more details about the various browser bundles can be found [here](_docs_v4_client-installation_.md#from-a-cdn)).

If you are using webpack, you can remove it with [webpack-remove-debug](https://github.com/johngodley/webpack-remove-debug):
```
{  
  module: {    rules: [      {        test: /\.js$/,        loader: 'webpack-remove-debug'      }    ]  }}  
```
Please note that error logs such as:

*   `net::ERR_INTERNET_DISCONNECTED`
*   `net::ERR_CONNECTION_REFUSED`
*   `WebSocket is already in CLOSING or CLOSED state`
*   `Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at xxx. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).`
*   `The connection to xxx was interrupted while the page was loading`

are not emitted by the Socket.IO library but by the browser itself, and are therefore out of our control.

#### _docs_v4_memory-usage.md

> Source: https://socket.io/docs/v4/memory-usage
> Scraped: 4/14/2025, 11:55:31 PM

The resources consumed by your Socket.IO server will mainly depend on:

*   the number of connected clients
*   the number of messages ([basic emit](_docs_v4_emitting-events_.md#basic-emit), [emit with acknowledgement](_docs_v4_emitting-events_.md#acknowledgements) and [broadcast](_docs_v4_broadcasting-events_.md)) received and sent per second

info

The memory usage of the Socket.IO server should scale **linearly** with the number of connected clients.

tip

By default, a reference to the first HTTP request of each session is kept in memory. This reference is needed when working with `express-session` for example (see [here](_how-to_use-with-express-session.md)), but can be discarded to save memory:
```
io.engine.on("connection", (rawSocket) => {  
  rawSocket.request = null;});  
```
The source code to reproduce the results presented in this page can be found [there](https://github.com/socketio/socket.io-benchmarks).

See also:

* [Load testing](_docs_v4_load-testing_.md)
* [Performance tuning](_docs_v4_performance-tuning_.md)

The memory usage of the Socket.IO server heavily depends on the memory usage of the underlying WebSocket server implementation.

The chart below displays the memory usage of the Socket.IO server, from 0 up to 10 000 connected clients, with:

*   a Socket.IO server based on the [`ws`](https://github.com/websockets/ws) package (used by default)
*   a Socket.IO server based on the [`eiows`](https://github.com/mmdevries/eiows) package, a C++ WebSocket server implementation (see [installation steps](_docs_v4_server-installation_.md#other-websocket-server-implementations))
*   a Socket.IO server based on the [`µWebSockets.js`](https://github.com/uNetworking/uWebSockets.js) package, a C++ alternative to the Node.js native HTTP server (see [installation steps](_docs_v4_server-installation_.md#usage-with-uwebsockets))
*   a plain WebSocket server based on the [`ws`](https://github.com/websockets/ws) package

![Chart of the memory usage per WebSocket server implementation](https://socket.io/assets/images/memory-usage-per-impl-0f33f953418d9d533b3c996ea134bc96.png)

Tested on `Ubuntu 22.04 LTS` with Node.js `v20.3.0`, with the following package versions:

*   `socket.io@4.7.2`
*   `eiows@6.7.2`
*   `uWebSockets.js@20.33.0`
*   `ws@8.11.0`

The chart below displays the memory usage of the Socket.IO server over time, from 0 up to 10 000 connected clients.

![Chart of the memory usage over time](https://socket.io/assets/images/memory-usage-over-time-79ea9e6413d1fb93cfc2f5e9cf2d7c82.png)

note

For demonstration purposes, we manually call the garbage collector at the end of each wave of clients:
```
io.on("connection", (socket) => {  
  socket.on("disconnect", () => {    const lastToDisconnect = io.of("/").sockets.size === 0;    if (lastToDisconnect) {      gc();    }  });});  
```
Which explains the clean drop in memory usage when the last client disconnects. This is not needed in your application, the garbage collection will be automatically triggered when necessary.

#### _docs_v4_middlewares.md

> Source: https://socket.io/docs/v4/middlewares
> Scraped: 4/14/2025, 11:55:40 PM

A middleware function is a function that gets executed for every incoming connection.

Middleware functions can be useful for:

*   logging
*   authentication / authorization
*   rate limiting

Note: this function will be executed only once per connection (even if the connection consists in multiple HTTP requests).

info

If you are looking for Express middlewares, please check [this section](_docs_v4_middlewares.md#compatibility-with-express-middleware).

A middleware function has access to the [Socket instance](_docs_v4_server-socket-instance_.md) and to the next registered middleware function.
```
io.use((socket, next) => {  
  if (isValid(socket.request)) {    next();  } else {    next(new Error("invalid"));  }});  
```
You can register several middleware functions, and they will be executed sequentially:
```
io.use((socket, next) => {  
  next();});  
  
io.use((socket, next) => {  
  next(new Error("thou shall not pass"));});  
  
io.use((socket, next) => {  
  // not executed, since the previous middleware has returned an error  next();});  
```
Please make sure to call `next()` in any case. Otherwise, the connection will be left hanging until it is closed after a given timeout.

**Important note**: the Socket instance is not actually connected when the middleware gets executed, which means that no `disconnect` event will be emitted if the connection eventually fails.

For example, if the client manually closes the connection:
```
// server-side  
io.use((socket, next) => {  
  setTimeout(() => {    // next is called after the client disconnection    next();  }, 1000);  
  socket.on("disconnect", () => {    // not triggered  });});  
  
io.on("connection", (socket) => {  
  // not triggered});  
  
// client-side  
const socket = io();  
setTimeout(() => {  
  socket.disconnect();}, 500);  
```
The client can send credentials with the `auth` option:
```
// plain object  
const socket = io({  
  auth: {    token: "abc"  }});  
  
// or with a function  
const socket = io({  
  auth: (cb) => {    cb({      token: "abc"    });  }});  
```
Those credentials can be accessed in the [handshake](_docs_v4_server-socket-instance_.md#sockethandshake) object on the server-side:
```
io.use((socket, next) => {  
  const token = socket.handshake.auth.token;  // ...});  
```
If the `next` method is called with an Error object, the connection will be refused and the client will receive an `connect_error` event.
```
// client-side  
socket.on("connect_error", (err) => {  
  console.log(err.message); // prints the message associated with the error});  
```
You can attach additional details to the Error object:
```
// server-side  
io.use((socket, next) => {  
  const err = new Error("not authorized");  err.data = { content: "Please retry later" }; // additional details  next(err);});  
  
// client-side  
socket.on("connect_error", (err) => {  
  console.log(err instanceof Error); // true  console.log(err.message); // not authorized  console.log(err.data); // { content: "Please retry later" }});  
```
Since they are not bound to a usual HTTP request/response cycle, Socket.IO middlewares are not really compatible with [Express middlewares](https://expressjs.com/en/guide/using-middleware.html).

That being said, starting with version `4.6.0`, Express middlewares are now supported by the underlying engine:
```
io.engine.use((req, res, next) => {  
  // do something  
  next();});  
```
The middlewares will be called for each incoming HTTP requests, including upgrade requests.

Example with [`express-session`](https://www.npmjs.com/package/express-session):
```
import session from "express-session";  
  
io.engine.use(session({  
  secret: "keyboard cat",  resave: false,  saveUninitialized: true,  cookie: { secure: true }}));  
```
Example with [`helmet`](https://www.npmjs.com/package/helmet):
```
import helmet from "helmet";  
  
io.engine.use(helmet());  
```
If the middleware must be only applied to the handshake request (and not for each HTTP request), you can check for the existence of the `sid` query parameter.

Example with [`passport-jwt`](https://www.npmjs.com/package/passport-jwt):
```
io.engine.use((req, res, next) => {  
  const isHandshake = req._query.sid === undefined;  if (isHandshake) {    passport.authenticate("jwt", { session: false })(req, res, next);  } else {    next();  }});  
```

#### _docs_v4_migrating-from-2-x-to-3-0.md

> Source: https://socket.io/docs/v4/migrating-from-2-x-to-3-0
> Scraped: 4/14/2025, 11:55:41 PM

This release should fix most of the inconsistencies of the Socket.IO library and provide a more intuitive behavior for the end users. It is the result of the feedback of the community over the years. A big thanks to everyone involved!

**TL;DR:** due to several breaking changes, a v2 client will not be able to connect to a v3 server (and vice versa)

Update: As of [Socket.IO 3.1.0](_blog_socket-io-3-1-0_.md), the v3 server is now able to communicate with v2 clients. More information [below](_docs_v4_migrating-from-2-x-to-3-0.md#how-to-upgrade-an-existing-production-deployment). A v3 client is still not be able to connect to a v2 server though.

For the low-level details, please see:

* [Engine.IO protocol v4](https://github.com/socketio/engine.io-protocol#difference-between-v3-and-v4)
* [Socket.IO protocol v5](https://github.com/socketio/socket.io-protocol#difference-between-v5-and-v4)

Here is the complete list of changes:

* [Configuration](_docs_v4_migrating-from-2-x-to-3-0.md#configuration)
    
    * [Saner default values](_docs_v4_migrating-from-2-x-to-3-0.md#saner-default-values)
    * [CORS handling](_docs_v4_migrating-from-2-x-to-3-0.md#cors-handling)
    * [No more cookie by default](_docs_v4_migrating-from-2-x-to-3-0.md#no-more-cookie-by-default)
* [API change](_docs_v4_migrating-from-2-x-to-3-0.md#aPI-change)
    
    * [io.set() is removed](_docs_v4_migrating-from-2-x-to-3-0.md#ioset-is-removed)
    * [No more implicit connection to the default namespace](_docs_v4_migrating-from-2-x-to-3-0.md#no-more-implicit-connection-to-the-default-namespace)
    * [Namespace.connected is renamed to Namespace.sockets and is now a Map](_docs_v4_migrating-from-2-x-to-3-0.md#namespaceconnected-is-renamed-to-namespacesockets-and-is-now-a-map)
    * [Socket.rooms is now a Set](_docs_v4_migrating-from-2-x-to-3-0.md#socketrooms-is-now-a-set)
    * [Socket.binary() is removed](_docs_v4_migrating-from-2-x-to-3-0.md#socketbinary-is-removed)
    * [Socket.join() and Socket.leave() are now synchronous](_docs_v4_migrating-from-2-x-to-3-0.md#socketjoin-and-socketleave-are-now-synchronous)
    * [Socket.use() is removed](_docs_v4_migrating-from-2-x-to-3-0.md#socketuse-is-removed)
    * [A middleware error will now emit an Error object](_docs_v4_migrating-from-2-x-to-3-0.md#a-middleware-error-will-now-emit-an-error-object)
    * [Add a clear distinction between the Manager query option and the Socket query option](_docs_v4_migrating-from-2-x-to-3-0.md#add-a-clear-distinction-between-the-manager-query-option-and-the-socket-query-option)
    * [The Socket instance will no longer forward the events emitted by its Manager](_docs_v4_migrating-from-2-x-to-3-0.md#the-socket-instance-will-no-longer-forward-the-events-emitted-by-its-manager)
    * [Namespace.clients() is renamed to Namespace.allSockets() and now returns a Promise](_docs_v4_migrating-from-2-x-to-3-0.md#namespaceclients-is-renamed-to-namespaceallsockets-and-now-returns-a-promise)
    * [Client bundles](_docs_v4_migrating-from-2-x-to-3-0.md#client-bundles)
    * [No more "pong" event for retrieving latency](_docs_v4_migrating-from-2-x-to-3-0.md#no-more-pong-event-for-retrieving-latency)
    * [ES modules syntax](_docs_v4_migrating-from-2-x-to-3-0.md#eS-modules-syntax)
    * [`emit()` chains are not possible anymore](_docs_v4_migrating-from-2-x-to-3-0.md#emit-chains-are-not-possible-anymore)
    * [Room names are not coerced to string anymore](_docs_v4_migrating-from-2-x-to-3-0.md#room-names-are-not-coerced-to-string-anymore)
* [New features](_docs_v4_migrating-from-2-x-to-3-0.md#new-features)
    
    * [Catch-all listeners](_docs_v4_migrating-from-2-x-to-3-0.md#catch-all-listeners)
    * [Volatile events (client)](_docs_v4_migrating-from-2-x-to-3-0.md#volatile-events-client)
    * [Official bundle with the msgpack parser](_docs_v4_migrating-from-2-x-to-3-0.md#official-bundle-with-the-msgpack-parser)
* [Miscellaneous](_docs_v4_migrating-from-2-x-to-3-0.md#miscellaneous)
    
    * [The Socket.IO codebase has been rewritten to TypeScript](_docs_v4_migrating-from-2-x-to-3-0.md#the-socketio-codebase-has-been-rewritten-to-typescript)
    * [Support for IE8 and Node.js 8 is officially dropped](_docs_v4_migrating-from-2-x-to-3-0.md#support-for-ie8-and-nodejs-8-is-officially-dropped)
* [How to upgrade an existing production deployment](_docs_v4_migrating-from-2-x-to-3-0.md#how-to-upgrade-an-existing-production-deployment)
    
* [Known migration issues](_docs_v4_migrating-from-2-x-to-3-0.md#known-migration-issues)
    

### Configuration[​](_docs_v4_migrating-from-2-x-to-3-0.md#configuration)

#### Saner default values[​](_docs_v4_migrating-from-2-x-to-3-0.md#saner-default-values)

*   the default value of `maxHttpBufferSize` was decreased from `100MB` to `1MB`.
*   the WebSocket [permessage-deflate extension](https://tools.ietf.org/html/draft-ietf-hybi-permessage-compression-19) is now disabled by default
*   you must now explicitly list the domains that are allowed (for CORS, see [below](_docs_v4_migrating-from-2-x-to-3-0.md#cORS-handling))
*   the `withCredentials` option now defaults to `false` on the client side

#### CORS handling[​](_docs_v4_migrating-from-2-x-to-3-0.md#cors-handling)

In v2, the Socket.IO server automatically added the necessary headers to allow [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS).

This behavior, while convenient, was not great in terms of security, because it meant that all domains were allowed to reach your Socket.IO server, unless otherwise specified with the `origins` option.

That's why, as of Socket.IO v3:

*   CORS is now disabled by default
*   the `origins` option (used to provide a list of authorized domains) and the `handlePreflightRequest` option (used to edit the `Access-Control-Allow-xxx` headers) are replaced by the `cors` option, which will be forwarded to the [cors](https://www.npmjs.com/package/cors) package.

The complete list of options can be found [here](https://github.com/expressjs/cors#configuration-options).

Before:
```
const io = require("socket.io")(httpServer, {  
  origins: ["https://example.com"],  
  // optional, useful for custom headers  handlePreflightRequest: (req, res) => {    res.writeHead(200, {      "Access-Control-Allow-Origin": "https://example.com",      "Access-Control-Allow-Methods": "GET,POST",      "Access-Control-Allow-Headers": "my-custom-header",      "Access-Control-Allow-Credentials": true    });    res.end();  }});  
```
After:
```
const io = require("socket.io")(httpServer, {  
  cors: {    origin: "https://example.com",    methods: ["GET", "POST"],    allowedHeaders: ["my-custom-header"],    credentials: true  }});  
```
#### No more cookie by default[​](_docs_v4_migrating-from-2-x-to-3-0.md#no-more-cookie-by-default)

In previous versions, an `io` cookie was sent by default. This cookie can be used to enable sticky-session, which is still required when you have several servers and HTTP long-polling enabled (more information [here](_docs_v4_using-multiple-nodes_.md)).

However, this cookie is not needed in some cases (i.e. single server deployment, sticky-session based on IP) so it must now be explicitly enabled.

Before:
```
const io = require("socket.io")(httpServer, {  
  cookieName: "io",  cookieHttpOnly: false,  cookiePath: "/custom"});  
```
After:
```
const io = require("socket.io")(httpServer, {  
  cookie: {    name: "test",    httpOnly: false,    path: "/custom"  }});  
```
All other options (domain, maxAge, sameSite, ...) are now supported. Please see [here](https://github.com/jshttp/cookie/) for the complete list of options.

### API change[​](_docs_v4_migrating-from-2-x-to-3-0.md#api-change)

Below are listed the non backward-compatible changes.

#### io.set() is removed[​](_docs_v4_migrating-from-2-x-to-3-0.md#ioset-is-removed)

This method was deprecated in the 1.0 release and kept for backward-compatibility. It is now removed.

It was replaced by middlewares.

Before:
```
io.set("authorization", (handshakeData, callback) => {  
  // make sure the handshake data looks good  callback(null, true); // error first, "authorized" boolean second });  
```
After:
```
io.use((socket, next) => {  
  var handshakeData = socket.request;  // make sure the handshake data looks good as before  // if error do this:    // next(new Error("not authorized"));  // else just call next  next();});  
```
#### No more implicit connection to the default namespace[​](_docs_v4_migrating-from-2-x-to-3-0.md#no-more-implicit-connection-to-the-default-namespace)

This change impacts the users of the multiplexing feature (what we call Namespace in Socket.IO).

In previous versions, a client would always connect to the default namespace (`/`), even if it requested access to another namespace. This meant that the middlewares registered for the default namespace were triggered, which may be quite surprising.
```
// client-side  
const socket = io("/admin");  
  
// server-side  
io.use((socket, next) => {  
  // not triggered anymore});  
  
io.on("connection", socket => {  
  // not triggered anymore})  
  
io.of("/admin").use((socket, next) => {  
  // triggered});  
```
Besides, we will now refer to the "main" namespace instead of the "default" namespace.

#### Namespace.connected is renamed to Namespace.sockets and is now a Map[​](_docs_v4_migrating-from-2-x-to-3-0.md#namespaceconnected-is-renamed-to-namespacesockets-and-is-now-a-map)

The `connected` object (used to store all the Socket connected to the given Namespace) could be used to retrieve a Socket object from its id. It is now an ES6 [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

Before:
```
// get a socket by ID in the main namespace  
const socket = io.of("/").connected[socketId];  
  
// get a socket by ID in the "admin" namespace  
const socket = io.of("/admin").connected[socketId];  
  
// loop through all sockets  
const sockets = io.of("/").connected;  
for (const id in sockets) {  
  if (sockets.hasOwnProperty(id)) {    const socket = sockets[id];    // ...  }}  
  
// get the number of connected sockets  
const count = Object.keys(io.of("/").connected).length;  
```
After:
```
// get a socket by ID in the main namespace  
const socket = io.of("/").sockets.get(socketId);  
  
// get a socket by ID in the "admin" namespace  
const socket = io.of("/admin").sockets.get(socketId);  
  
// loop through all sockets  
for (const [_, socket] of io.of("/").sockets) {  
  // ...}  
  
// get the number of connected sockets  
const count = io.of("/").sockets.size;  
```
#### Socket.rooms is now a Set[​](_docs_v4_migrating-from-2-x-to-3-0.md#socketrooms-is-now-a-set)

The `rooms` property contains the list of rooms the Socket is currently in. It was an object, it is now an ES6 [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

Before:
```
io.on("connection", (socket) => {  
  
  console.log(Object.keys(socket.rooms)); // [ <socket.id> ]  
  socket.join("room1");  
  console.log(Object.keys(socket.rooms)); // [ <socket.id>, "room1" ]  
});  
```
After:
```
io.on("connection", (socket) => {  
  
  console.log(socket.rooms); // Set { <socket.id> }  
  socket.join("room1");  
  console.log(socket.rooms); // Set { <socket.id>, "room1" }  
});  
```
#### Socket.binary() is removed[​](_docs_v4_migrating-from-2-x-to-3-0.md#socketbinary-is-removed)

The `binary` method could be used to indicate that a given event did not contain any binary data (in order to skip the lookup done by the library and improve performance in certain conditions).

It was replaced by the ability to provide your own parser, which was added in Socket.IO 2.0.

Before:
```
socket.binary(false).emit("hello", "no binary");  
```
After:
```
const io = require("socket.io")(httpServer, {  
  parser: myCustomParser});  
```
Please see [socket.io-msgpack-parser](https://github.com/socketio/socket.io-msgpack-parser) for example.

#### Socket.join() and Socket.leave() are now synchronous[​](_docs_v4_migrating-from-2-x-to-3-0.md#socketjoin-and-socketleave-are-now-synchronous)

The asynchronicity was needed for the first versions of the Redis adapter, but this is not the case anymore.

For reference, an Adapter is an object that stores the relationships between Sockets and [Rooms](_docs_v4_rooms_.md). There are two official adapters: the in-memory adapter (built-in) and the [Redis adapter](https://github.com/socketio/socket.io-redis) based on Redis [pub-sub mechanism](https://redis.io/topics/pubsub).

Before:
```
socket.join("room1", () => {  
 io.to("room1").emit("hello");});  
  
socket.leave("room2", () => {  
  io.to("room2").emit("bye");});  
```
After:
```
socket.join("room1");  
io.to("room1").emit("hello");  
  
socket.leave("room2");  
io.to("room2").emit("bye");  
```
Note: custom adapters may return a Promise, so the previous example becomes:
```
await socket.join("room1");  
io.to("room1").emit("hello");  
```
#### Socket.use() is removed[​](_docs_v4_migrating-from-2-x-to-3-0.md#socketuse-is-removed)

`socket.use()` could be used as a catch-all listener. But its API was not really intuitive. It is replaced by [socket.onAny()](_docs_v4_migrating-from-2-x-to-3-0.md#catch-all-listeners).

**UPDATE**: the `Socket.use()` method was restored in [`socket.io@3.0.5`](https://github.com/socketio/socket.io/releases/3.0.5).

Before:
```
socket.use((packet, next) => {  
  console.log(packet.data);  next();});  
```
After:
```
socket.onAny((event, ...args) => {  
  console.log(event);});  
```
#### A middleware error will now emit an Error object[​](_docs_v4_migrating-from-2-x-to-3-0.md#a-middleware-error-will-now-emit-an-error-object)

The `error` event is renamed to `connect_error` and the object emitted is now an actual Error:

Before:
```
// server-side  
io.use((socket, next) => {  
  next(new Error("not authorized"));});  
  
// client-side  
socket.on("error", err => {  
  console.log(err); // not authorized});  
  
// or with an object  
// server-side  
io.use((socket, next) => {  
  const err = new Error("not authorized");  err.data = { content: "Please retry later" }; // additional details  next(err);});  
  
// client-side  
socket.on("error", err => {  
  console.log(err); // { content: "Please retry later" }});  
```
After:
```
// server-side  
io.use((socket, next) => {  
  const err = new Error("not authorized");  err.data = { content: "Please retry later" }; // additional details  next(err);});  
  
// client-side  
socket.on("connect_error", err => {  
  console.log(err instanceof Error); // true  console.log(err.message); // not authorized  console.log(err.data); // { content: "Please retry later" }});  
```
#### Add a clear distinction between the Manager query option and the Socket query option[​](_docs_v4_migrating-from-2-x-to-3-0.md#add-a-clear-distinction-between-the-manager-query-option-and-the-socket-query-option)

In previous versions, the `query` option was used in two distinct places:

*   in the query parameters of the HTTP requests (`GET /socket.io/?EIO=3&abc=def`)
*   in the `CONNECT` packet

Let's take the following example:
```
const socket = io({  
  query: {    token: "abc"  }});  
```
Under the hood, here's what happened in the `io()` method:
```
const { Manager } = require("socket.io-client");  
  
// a new Manager is created (which will manage the low-level connection)  
const manager = new Manager({  
  query: { // sent in the query parameters    token: "abc"  }});  
  
// and then a Socket instance is created for the namespace (here, the main namespace, "/")  
const socket = manager.socket("/", {  
  query: { // sent in the CONNECT packet    token: "abc"  }});  
```
This behavior could lead to weird behaviors, for example when the Manager was reused for another namespace (multiplexing):
```
// client-side  
const socket1 = io({  
  query: {    token: "abc"  }});  
  
const socket2 = io("/my-namespace", {  
  query: {    token: "def"  }});  
  
// server-side  
io.on("connection", (socket) => {  
  console.log(socket.handshake.query.token); // abc (ok!)});  
  
io.of("/my-namespace").on("connection", (socket) => {  
  console.log(socket.handshake.query.token); // abc (what?)});  
```
That's why the `query` option of the Socket instance is renamed to `auth` in Socket.IO v3:
```
// plain object  
const socket = io({  
  auth: {    token: "abc"  }});  
  
// or with a function  
const socket = io({  
  auth: (cb) => {    cb({      token: "abc"    });  }});  
  
// server-side  
io.on("connection", (socket) => {  
  console.log(socket.handshake.auth.token); // abc});  
```
Note: the `query` option of the Manager can still be used in order to add a specific query parameter to the HTTP requests.

#### The Socket instance will no longer forward the events emitted by its Manager[​](_docs_v4_migrating-from-2-x-to-3-0.md#the-socket-instance-will-no-longer-forward-the-events-emitted-by-its-manager)

In previous versions, the Socket instance emitted the events related to the state of the underlying connection. This will not be the case anymore.

You can still have access to those events on the Manager instance (the `io` property of the socket) :

Before:
```
socket.on("reconnect_attempt", () => {});  
```
After:
```
socket.io.on("reconnect_attempt", () => {});  
```
Here is the updated list of events emitted by the Manager:

Name

Description

Previously (if different)

open

successful (re)connection

\-

error

(re)connection failure or error after a successful connection

connect\_error

close

disconnection

\-

ping

ping packet

\-

packet

data packet

\-

reconnect\_attempt

reconnection attempt

reconnect\_attempt & reconnecting

reconnect

successful reconnection

\-

reconnect\_error

reconnection failure

\-

reconnect\_failed

reconnection failure after all attempts

\-

Here is the updated list of events emitted by the Socket:

Name

Description

Previously (if different)

connect

successful connection to a Namespace

\-

connect\_error

connection failure

error

disconnect

disconnection

\-

And finally, here's the updated list of reserved events that you cannot use in your application:

*   `connect` (used on the client-side)
*   `connect_error` (used on the client-side)
*   `disconnect` (used on both sides)
*   `disconnecting` (used on the server-side)
*   `newListener` and `removeListener` (EventEmitter [reserved events](https://nodejs.org/api/events.html#events_event_newlistener))
```
socket.emit("connect_error"); // will now throw an Error  
```
#### Namespace.clients() is renamed to Namespace.allSockets() and now returns a Promise[​](_docs_v4_migrating-from-2-x-to-3-0.md#namespaceclients-is-renamed-to-namespaceallsockets-and-now-returns-a-promise)

This function returns the list of socket IDs that are connected to this namespace.

Before:
```
// all sockets in default namespace  
io.clients((error, clients) => {  
  console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]});  
  
// all sockets in the "chat" namespace  
io.of("/chat").clients((error, clients) => {  
  console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]});  
  
// all sockets in the "chat" namespace and in the "general" room  
io.of("/chat").in("general").clients((error, clients) => {  
  console.log(clients); // => [Anw2LatarvGVVXEIAAAD]});  
```
After:
```
// all sockets in default namespace  
const ids = await io.allSockets();  
  
// all sockets in the "chat" namespace  
const ids = await io.of("/chat").allSockets();  
  
// all sockets in the "chat" namespace and in the "general" room  
const ids = await io.of("/chat").in("general").allSockets();  
```
Note: this function was (and still is) supported by the Redis adapter, which means that it will return the list of socket IDs across all the Socket.IO servers.

#### Client bundles[​](_docs_v4_migrating-from-2-x-to-3-0.md#client-bundles)

There are now 3 distinct bundles:

Name

Size

Description

socket.io.js

34.7 kB gzip

Unminified version, with [debug](https://www.npmjs.com/package/debug)

socket.io.min.js

14.7 kB min+gzip

Production version, without [debug](https://www.npmjs.com/package/debug)

socket.io.msgpack.min.js

15.3 kB min+gzip

Production version, without [debug](https://www.npmjs.com/package/debug) and with the [msgpack parser](https://github.com/socketio/socket.io-msgpack-parser)

By default, all of them are served by the server, at `/socket.io/<name>`.

Before:
```
<!-- note: this bundle was actually minified but included the debug package -->  
<script src="/socket.io/socket.io.js"></script>  
```
After:
```
<!-- during development -->  
<script src="/socket.io/socket.io.js"></script>  
<!-- for production -->  
<script src="/socket.io/socket.io.min.js"></script>  
```
#### No more "pong" event for retrieving latency[​](_docs_v4_migrating-from-2-x-to-3-0.md#no-more-pong-event-for-retrieving-latency)

In Socket.IO v2, you could listen to the `pong` event on the client-side, which included the duration of the last health check round-trip.

Due to the reversal of the heartbeat mechanism (more information [here](_blog_engine-io-4-release_.md#heartbeat-mechanism-reversal)), this event has been removed.

Before:
```
socket.on("pong", (latency) => {  
  console.log(latency);});  
```
After:
```
// server-side  
io.on("connection", (socket) => {  
  socket.on("ping", (cb) => {    if (typeof cb === "function")      cb();  });});  
  
// client-side  
setInterval(() => {  
  const start = Date.now();  
  // volatile, so the packet will be discarded if the socket is not connected  socket.volatile.emit("ping", () => {    const latency = Date.now() - start;    // ...  });}, 5000);  
```
#### ES modules syntax[​](_docs_v4_migrating-from-2-x-to-3-0.md#es-modules-syntax)

The ECMAScript modules syntax is now similar to the Typescript one (see [below](_docs_v4_migrating-from-2-x-to-3-0.md#the-socketio-codebase-has-been-rewritten-to-typescript)).

Before (using default import):
```
// server-side  
import Server from "socket.io";  
  
const io = new Server(8080);  
  
// client-side  
import io from 'socket.io-client';  
  
const socket = io();  
```
After (with named import):
```
// server-side  
import { Server } from "socket.io";  
  
const io = new Server(8080);  
  
// client-side  
import { io } from 'socket.io-client';  
  
const socket = io();  
```
#### `emit()` chains are not possible anymore[​](_docs_v4_migrating-from-2-x-to-3-0.md#emit-chains-are-not-possible-anymore)

The `emit()` method now matches the [`EventEmitter.emit()`](https://nodejs.org/dist/latest/docs/api/events.html#events_emitter_emit_eventname_args) method signature, and returns `true` instead of the current object.

Before:
```
socket.emit("event1").emit("event2");  
```
After:
```
socket.emit("event1");  
socket.emit("event2");  
```
#### Room names are not coerced to string anymore[​](_docs_v4_migrating-from-2-x-to-3-0.md#room-names-are-not-coerced-to-string-anymore)

We are now using Maps and Sets internally instead of plain objects, so the room names are not implicitly coerced to string anymore.

Before:
```
// mixed types were possible  
socket.join(42);  
io.to("42").emit("hello");  
// also worked  
socket.join("42");  
io.to(42).emit("hello");  
```
After:
```
// one way  
socket.join("42");  
io.to("42").emit("hello");  
// or another  
socket.join(42);  
io.to(42).emit("hello");  
```
### New features[​](_docs_v4_migrating-from-2-x-to-3-0.md#new-features)

Some of those new features may be backported to the `2.4.x` branch, depending on the feedback of the users.

#### Catch-all listeners[​](_docs_v4_migrating-from-2-x-to-3-0.md#catch-all-listeners)

This feature is inspired from the [EventEmitter2](https://github.com/EventEmitter2/EventEmitter2) library (which is not used directly in order not to increase the browser bundle size).

It is available for both the server and the client sides:
```
// server  
io.on("connection", (socket) => {  
  socket.onAny((event, ...args) => {});  socket.prependAny((event, ...args) => {});  socket.offAny(); // remove all listeners  socket.offAny(listener);  const listeners = socket.listenersAny();});  
  
// client  
const socket = io();  
socket.onAny((event, ...args) => {});  
socket.prependAny((event, ...args) => {});  
socket.offAny(); // remove all listeners  
socket.offAny(listener);  
const listeners = socket.listenersAny();  
```
#### Volatile events (client)[​](_docs_v4_migrating-from-2-x-to-3-0.md#volatile-events-client)

A volatile event is an event that is allowed to be dropped if the low-level transport is not ready yet (for example when an HTTP POST request is already pending).

This feature was already available on the server-side. It might be useful on the client-side as well, for example when the socket is not connected (by default, packets are buffered until reconnection).
```
socket.volatile.emit("volatile event", "might or might not be sent");  
```
#### Official bundle with the msgpack parser[​](_docs_v4_migrating-from-2-x-to-3-0.md#official-bundle-with-the-msgpack-parser)

A bundle with the [socket.io-msgpack-parser](https://github.com/socketio/socket.io-msgpack-parser) will now be provided (either on the CDN or served by the server at `/socket.io/socket.io.msgpack.min.js`).

Pros:

*   events with binary content are sent as 1 WebSocket frame (instead of 2+ with the default parser)
*   payloads with lots of numbers should be smaller

Cons:

*   no IE9 support ([https://caniuse.com/mdn-javascript\_builtins\_arraybuffer](https://caniuse.com/mdn-javascript_builtins_arraybuffer))
*   a slightly bigger bundle size
```
// server-side  
const io = require("socket.io")(httpServer, {  
  parser: require("socket.io-msgpack-parser")});  
```
No additional configuration is needed on the client-side.

### Miscellaneous[​](_docs_v4_migrating-from-2-x-to-3-0.md#miscellaneous)

#### The Socket.IO codebase has been rewritten to TypeScript[​](_docs_v4_migrating-from-2-x-to-3-0.md#the-socketio-codebase-has-been-rewritten-to-typescript)

Which means `npm i -D @types/socket.io` should not be needed anymore.

Server:
```
import { Server, Socket } from "socket.io";  
  
const io = new Server(8080);  
  
io.on("connection", (socket: Socket) => {  
    console.log(`connect ${socket.id}`);  
    socket.on("disconnect", () => {        console.log(`disconnect ${socket.id}`);    });});  
```
Client:
```
import { io } from "socket.io-client";  
  
const socket = io("/");  
  
socket.on("connect", () => {  
    console.log(`connect ${socket.id}`);});  
```
Plain javascript is obviously still fully supported.

#### Support for IE8 and Node.js 8 is officially dropped[​](_docs_v4_migrating-from-2-x-to-3-0.md#support-for-ie8-and-nodejs-8-is-officially-dropped)

IE8 is no longer testable on the Sauce Labs platform, and requires a lot of efforts for very few users (if any?), so we are dropping support for it.

Besides, Node.js 8 is now [EOL](https://github.com/nodejs/Release). Please upgrade as soon as possible!

### How to upgrade an existing production deployment[​](_docs_v4_migrating-from-2-x-to-3-0.md#how-to-upgrade-an-existing-production-deployment)

*   first, update the servers with `allowEIO3` set to `true` (added in `socket.io@3.1.0`)
```
const io = require("socket.io")({  
  allowEIO3: true // false by default});  
```
Note: If you are using the Redis adapter to [broadcast packets between nodes](_docs_v4_broadcasting-events_.md#with-multiple-socketio-servers), you must use `socket.io-redis@5` with `socket.io@2` and `socket.io-redis@6` with `socket.io@3`. Please note that both versions are compatible, so you can update each server one by one (no big bang is needed).

*   then, update the clients

This step may actually take some time, as some clients may still have a v2 client in cache.

You can check the version of the connection with:
```
io.on("connection", (socket) => {  
  const version = socket.conn.protocol; // either 3 or 4});  
```
This matches the value of the `EIO` query parameter in the HTTP requests.

*   and finally, once every client was updated, set `allowEIO3` to `false` (which is the default value)
```
const io = require("socket.io")({  
  allowEIO3: false});  
```
With `allowEIO3` set to `false`, v2 clients will now receive an HTTP 400 error (`Unsupported protocol version`) when connecting.

### Known migration issues[​](_docs_v4_migrating-from-2-x-to-3-0.md#known-migration-issues)

*   `stream_1.pipeline is not a function`
```
TypeError: stream_1.pipeline is not a function  
    at Function.sendFile (.../node_modules/socket.io/dist/index.js:249:26)    at Server.serve (.../node_modules/socket.io/dist/index.js:225:16)    at Server.srv.on (.../node_modules/socket.io/dist/index.js:186:22)    at emitTwo (events.js:126:13)    at Server.emit (events.js:214:7)    at parserOnIncoming (_http_server.js:602:12)    at HTTPParser.parserOnHeadersComplete (_http_common.js:116:23)
```
This error is probably due to your version of Node.js. The [pipeline](https://nodejs.org/api/stream.html#stream_stream_pipeline_source_transforms_destination_callback) method was introduced in Node.js 10.0.0.

*   `error TS2416: Property 'emit' in type 'Namespace' is not assignable to the same property in base type 'EventEmitter'.`
```
node_modules/socket.io/dist/namespace.d.ts(89,5): error TS2416: Property 'emit' in type 'Namespace' is not assignable to the same property in base type 'EventEmitter'.  
  Type '(ev: string, ...args: any[]) => Namespace' is not assignable to type '(event: string | symbol, ...args: any[]) => boolean'.    Type 'Namespace' is not assignable to type 'boolean'.node_modules/socket.io/dist/socket.d.ts(84,5): error TS2416: Property 'emit' in type 'Socket' is not assignable to the same property in base type 'EventEmitter'.  
  Type '(ev: string, ...args: any[]) => this' is not assignable to type '(event: string | symbol, ...args: any[]) => boolean'.    Type 'this' is not assignable to type 'boolean'.      Type 'Socket' is not assignable to type 'boolean'.
```
The signature of the `emit()` method was fixed in version `3.0.1` ([commit](https://github.com/socketio/socket.io/commit/50671d984a81535a6a15c704546ca7465e2ea295)).

*   the client is disconnected when sending a big payload (> 1MB)

This is probably due to the fact that the default value of `maxHttpBufferSize` is now `1MB`. When receiving a packet that is larger than this, the server disconnects the client, in order to prevent malicious clients from overloading the server.

You can adjust the value when creating the server:
```
const io = require("socket.io")(httpServer, {  
  maxHttpBufferSize: 1e8});  
```
*   `Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at xxx/socket.io/?EIO=4&transport=polling&t=NMnp2WI. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).`

Since Socket.IO v3, you need to explicitly enable [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS). The documentation can be found [here](_docs_v4_handling-cors_.md).

*   `Uncaught TypeError: packet.data is undefined`

It seems that you are using a v3 client to connect to a v2 server, which is not possible. Please see the [following section](_docs_v4_migrating-from-2-x-to-3-0.md#how-to-upgrade-an-existing-production-deployment).

*   `Object literal may only specify known properties, and 'extraHeaders' does not exist in type 'ConnectOpts'`

Since the codebase has been rewritten to TypeScript (more information [here](_docs_v4_migrating-from-2-x-to-3-0.md#the-socketio-codebase-has-been-rewritten-to-typescript)), `@types/socket.io-client` is no longer needed and will actually conflict with the typings coming from the `socket.io-client` package.

*   missing cookie in a cross-origin context

You now need to explicitly enable cookies if the front is not served from the same domain as the backend:

_Server_
```
import { Server } from "socket.io";  
  
const io = new Server({  
  cors: {    origin: ["https://front.domain.com"],    credentials: true  }});  
```
_Client_
```
import { io } from "socket.io-client";  
  
const socket = io("https://backend.domain.com", {  
  withCredentials: true});  
```
Reference:

* [Handling CORS](_docs_v4_handling-cors_.md)
* [`cors`](_docs_v4_server-api_.md#cors) option
* [`withCredentials`](_docs_v4_client-api_.md#withcredentials) option

#### _docs_v4_migrating-from-3-x-to-4-0.md

> Source: https://socket.io/docs/v4/migrating-from-3-x-to-4-0
> Scraped: 4/14/2025, 11:55:36 PM

The 4.0.0 release adds quite a lot of new features, which are detailed [below](_docs_v4_migrating-from-3-x-to-4-0.md#new-features), but it also contains a few API breaking changes (hence the major bump).

Please note that these breaking changes only impact the API on the server side. The Socket.IO protocol itself was not updated, so a v3 client **will** be able to reach a v4 server and vice-versa. Besides, the compatibility mode ([`allowEIO3: true`](_docs_v4_server-options_.md#alloweio3)) is still available between a Socket.IO v2 client and a Socket.IO v4 server.

Here is the complete list of changes:

* [Breaking changes](_docs_v4_migrating-from-3-x-to-4-0.md#breaking-changes)
    * [`io.to()` is now immutable](_docs_v4_migrating-from-3-x-to-4-0.md#ioto-is-now-immutable)
    * [`wsEngine` option](_docs_v4_migrating-from-3-x-to-4-0.md#wsengine-option)
* [Configuration](_docs_v4_migrating-from-3-x-to-4-0.md#configuration)
    * [Ensure compatibility with Swift v15 clients](_docs_v4_migrating-from-3-x-to-4-0.md#ensure-compatibility-with-swift-v15-clients)
    * [The default value of `pingTimeout` was increased](_docs_v4_migrating-from-3-x-to-4-0.md#the-default-value-of-pingtimeout-was-increased)
* [New features](_docs_v4_migrating-from-3-x-to-4-0.md#new-features)
    * [Allow excluding specific rooms when broadcasting](_docs_v4_migrating-from-3-x-to-4-0.md#allow-excluding-specific-rooms-when-broadcasting)
    * [Allow to pass an array to `io.to()`](_docs_v4_migrating-from-3-x-to-4-0.md#allow-to-pass-an-array-to-ioto)
    * [Additional utility methods](_docs_v4_migrating-from-3-x-to-4-0.md#additional-utility-methods)
    * [Typed events](_docs_v4_migrating-from-3-x-to-4-0.md#typed-events)
    * [`autoUnref` option](_docs_v4_migrating-from-3-x-to-4-0.md#autounref-option)
* [Known migration issues](_docs_v4_migrating-from-3-x-to-4-0.md#known-migration-issues)

### Breaking changes[​](_docs_v4_migrating-from-3-x-to-4-0.md#breaking-changes)

#### `io.to()` is now immutable[​](_docs_v4_migrating-from-3-x-to-4-0.md#ioto-is-now-immutable)

Previously, broadcasting to a given room (by calling `io.to()`) would mutate the io instance, which could lead to surprising behaviors, like:
```
io.to("room1");  
io.to("room2").emit(/* ... */); // also sent to room1  
  
// or with async/await  
io.to("room3").emit("details", await fetchDetails()); // random behavior: maybe in room3, maybe to all clients  
```
Calling `io.to()` (or any other broadcast modifier) will now return an immutable instance.

Examples:
```
const operator1 = io.to("room1");  
const operator2 = operator1.to("room2");  
const operator3 = socket.broadcast;  
const operator4 = socket.to("room3").to("room4");  
  
operator1.emit(/* ... */); // only to clients in "room1"  
operator2.emit(/* ... */); // to clients in "room1" or in "room2"  
operator3.emit(/* ... */); // to all clients but the sender  
operator4.emit(/* ... */); // to clients in "room3" or in "room4" but the sender  
```
#### `wsEngine` option[​](_docs_v4_migrating-from-3-x-to-4-0.md#wsengine-option)

The format of the [`wsEngine`](_docs_v4_server-options_.md#wsengine) option was updated in order to get rid of the following error:

`Critical dependency: the request of a dependency is an expression`

when bundling the server with webpack.

Before:
```
const io = require("socket.io")(httpServer, {  
  wsEngine: "eiows"});  
```
After:
```
const io = require("socket.io")(httpServer, {  
  wsEngine: require("eiows").Server});  
```
### Configuration[​](_docs_v4_migrating-from-3-x-to-4-0.md#configuration)

#### Ensure compatibility with Swift v15 clients[​](_docs_v4_migrating-from-3-x-to-4-0.md#ensure-compatibility-with-swift-v15-clients)

Before version 16.0.0, the Swift client would not include the `EIO` query parameter in the HTTP requests, and the Socket.IO v3 server would infer `EIO=4` by default.

That's why a Swift client v15 was not able to connect to the server, even when the compatibility mode was enabled ([`allowEIO3: true`](_docs_v4_server-options_.md#alloweio3)), unless you explicitly specified the query param:
```
let manager = SocketManager(socketURL: URL(string: "http://localhost:8080")!, config: [  
  .log(true),  .connectParams(["EIO": "3"])])  
let socket = manager.defaultSocket  
```
The Socket.IO v4 server will now infer `EIO=3` if the `EIO` query param is not included.

#### The default value of `pingTimeout` was increased[​](_docs_v4_migrating-from-3-x-to-4-0.md#the-default-value-of-pingtimeout-was-increased)

The default value of [`pingTimeout`](_docs_v4_server-options_.md#pingtimeout) (used in the [heartbeat mechanism](_docs_v4_how-it-works_.md#disconnection-detection)) value was updated from 60000 to 5000 in `socket.io@2.1.0` (March 2018).

The reasoning back then:

Some users experienced long delays between disconnection on the server-side and on the client-side. The "disconnect" event would take a long time to fire in the browser, probably due to a timer being delayed. Hence the change.

That being said, the current value (5s) caused unexpected disconnections when a big payload was sent over a slow network, because it prevents the ping-pong packets from being exchanged between the client and the server. This can also happen when a synchronous task blocks the server for more than 5 seconds.

The new value (20s) thus seems like a good balance between quick disconnection detection and tolerance to various delays.

### New features[​](_docs_v4_migrating-from-3-x-to-4-0.md#new-features)

#### Allow excluding specific rooms when broadcasting[​](_docs_v4_migrating-from-3-x-to-4-0.md#allow-excluding-specific-rooms-when-broadcasting)

Thanks to the awesome work of [Sebastiaan Marynissen](https://github.com/sebamarynissen), you can now exclude a specific room when broadcasting:
```
io.except("room1").emit(/* ... */); // to all clients except the ones in "room1"  
io.to("room2").except("room3").emit(/* ... */); // to all clients in "room2" except the ones in "room3"  
  
socket.broadcast.except("room1").emit(/* ... */); // to all clients except the ones in "room1" and the sender  
socket.except("room1").emit(/* ... */); // same as above  
socket.to("room4").except("room5").emit(/* ... */); // to all clients in "room4" except the ones in "room5" and the sender  
```
#### Allow to pass an array to `io.to()`[​](_docs_v4_migrating-from-3-x-to-4-0.md#allow-to-pass-an-array-to-ioto)

The `to()` method now accepts an array of rooms.

Before:
```
const rooms = ["room1", "room2", "room3"];  
for (const room of rooms) {  
  io.to(room);}  
// broadcast to clients in "room1", "room2" or "room3"  
// WARNING !!! this does not work anymore in v4, see the breaking change above  
io.emit(/* ... */);  
```
After:
```
io.to(["room1", "room2", "room3"]).emit(/* ... */);  
  
socket.to(["room1", "room2", "room3"]).emit(/* ... */);  
```
#### Additional utility methods[​](_docs_v4_migrating-from-3-x-to-4-0.md#additional-utility-methods)

Some (long-awaited) methods were added:

*   `socketsJoin`: makes the matching socket instances join the specified rooms
```
// make all Socket instances join the "room1" room  
io.socketsJoin("room1");  
  
// make all Socket instances of the "admin" namespace in the "room1" room join the "room2" room  
io.of("/admin").in("room1").socketsJoin("room2");  
```
*   `socketsLeave`: makes the matching socket instances leave the specified rooms
```
// make all Socket instances leave the "room1" room  
io.socketsLeave("room1");  
  
// make all Socket instances of the "admin" namespace in the "room1" room leave the "room2" room  
io.of("/admin").in("room1").socketsLeave("room2");  
```
*   `disconnectSockets`: makes the matching socket instances disconnect
```
// make all Socket instances disconnect  
io.disconnectSockets();  
  
// make all Socket instances of the "admin" namespace in the "room1" room disconnect  
io.of("/admin").in("room1").disconnectSockets();  
  
// this also works with a single socket ID  
io.of("/admin").in(theSocketId).disconnectSockets();  
```
*   `fetchSockets`: returns the matching socket instances
```
// return all Socket instances of the main namespace  
const sockets = await io.fetchSockets();  
  
// return all Socket instances of the "admin" namespace in the "room1" room  
const sockets = await io.of("/admin").in("room1").fetchSockets();  
  
// this also works with a single socket ID  
const sockets = await io.in(theSocketId).fetchSockets();  
```
The `sockets` variable in the example above is an array of objects exposing a subset of the usual Socket class:
```
for (const socket of sockets) {  
  console.log(socket.id);  console.log(socket.handshake);  console.log(socket.rooms);  socket.emit(/* ... */);  socket.join(/* ... */);  socket.leave(/* ... */);  socket.disconnect(/* ... */);}  
```
Those methods share the same semantics as broadcasting, and the same filters apply:
```
io.of("/admin").in("room1").except("room2").local.disconnectSockets();  
```
Which makes all Socket instances of the "admin" namespace

*   in the "room1" room (`in("room1")` or `to("room1")`)
*   except the ones in "room2" (`except("room2")`)
*   and only on the current Socket.IO server (`local`)

disconnect.

#### Typed events[​](_docs_v4_migrating-from-3-x-to-4-0.md#typed-events)

Thanks to the awesome work of [Maxime Kjaer](https://github.com/MaximeKjaer), TypeScript users can now type the events sent between the client and the server.

First, you declare the signature of each event:
```
interface ClientToServerEvents {  
  noArg: () => void;  basicEmit: (a: number, b: string, c: number[]) => void;}  
  
interface ServerToClientEvents {  
  withAck: (d: string, cb: (e: number) => void) => void;}  
```
And you can now use them on the client side:
```
import { io, Socket } from "socket.io-client";  
  
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();  
  
socket.emit("noArg");  
  
socket.emit("basicEmit", 1, "2", [3]);  
  
socket.on("withAck", (d, cb) => {  
    cb(4);});  
```
Your IDE should now properly infer the type of each argument:

Similarly on the server side (the `ServerToClientEvents` and `ClientToServerEvents` are reversed):
```
import { Server } from "socket.io";  
  
const io = new Server<ClientToServerEvents, ServerToClientEvents>(3000);  
  
io.on("connection", (socket) => {  
    socket.on("noArg", () => {      // ...    });  
    socket.on("basicEmit", (a, b, c) => {      // ...    });  
    socket.emit("withAck", "42", (e) => {        console.log(e);    });});  
```
By default, the events are untyped and the arguments will be inferred as `any`.

#### `autoUnref` option[​](_docs_v4_migrating-from-3-x-to-4-0.md#autounref-option)

And finally, thanks to the awesome work of [KC Erb](https://github.com/KCErb), the `autoUnref` option was added.

With `autoUnref` set to true (default: false), the Socket.IO client will allow the program to exit if there is no other active timer/TCP socket in the event system (even if the client is connected):
```
const socket = io({  
  autoUnref: true});  
```
Note: this option only applies to Node.js clients.

### Known migration issues[​](_docs_v4_migrating-from-3-x-to-4-0.md#known-migration-issues)

*   `cannot get emit of undefined`

The following expression:
```
socket.to("room1").broadcast.emit(/* ... */);  
```
was working in Socket.IO v3 but is now considered invalid, as the `broadcast` flag is useless because the `to("room1")` method already puts the Socket instance in broadcasting mode.
```
// VALID  
socket.broadcast.emit(/* ... */); // to all clients but the sender  
socket.to("room1").emit(/* ... */); // to clients in "room1" but the sender  
  
// VALID (but useless 'broadcast' flag)  
socket.broadcast.to("room1").emit(/* ... */);  
  
// INVALID  
socket.to("room1").broadcast.emit(/* ... */);  
```

#### _docs_v4_mongo-adapter.md

> Source: https://socket.io/docs/v4/mongo-adapter
> Scraped: 4/14/2025, 11:55:35 PM

Version: 4.x

The MongoDB adapter relies on MongoDB's [Change Streams](https://docs.mongodb.com/manual/changeStreams/) (and thus requires a replica set or a sharded cluster).

Every packet that is sent to multiple clients (e.g. `io.to("room1").emit()` or `socket.broadcast.emit()`) is:

*   sent to all matching clients connected to the current server
*   inserted in a MongoDB capped collection, and received by the other Socket.IO servers of the cluster

![Diagram of how the MongoDB adapter works](https://socket.io/images/mongo-adapter.png)![Diagram of how the MongoDB adapter works](https://socket.io/images/mongo-adapter-dark.png)

The source code of this adapter can be found [here](https://github.com/socketio/socket.io-mongo-adapter).

Feature

`socket.io` version

Support

Socket management

`4.0.0`

✅ YES (since version `0.1.0`)

Inter-server communication

`4.1.0`

✅ YES (since version `0.1.0`)

Broadcast with acknowledgements

[`4.5.0`](_docs_v4_changelog_4.5.0.md)

✅ YES (since version `0.2.0`)

Connection state recovery

[`4.6.0`](_docs_v4_changelog_4.6.0.md)

✅ YES (since version `0.3.0`)
```
npm install @socket.io/mongo-adapter mongodb  
```
For TypeScript users, you might also need `@types/mongodb`.

Broadcasting packets within a Socket.IO cluster is achieved by creating MongoDB documents and using a [change stream](https://docs.mongodb.com/manual/changeStreams/) on each Socket.IO server.

There are two ways to clean up the documents in MongoDB:

*   a [capped collection](https://www.mongodb.com/docs/manual/core/capped-collections/)
*   a [TTL index](https://www.mongodb.com/docs/manual/core/index-ttl/)

### Usage with a capped collection[​](_docs_v4_mongo-adapter.md#usage-with-a-capped-collection)
```
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/mongo-adapter";  
import { MongoClient } from "mongodb";  
  
const DB = "mydb";  
const COLLECTION = "socket.io-adapter-events";  
  
const io = new Server();  
  
const mongoClient = new MongoClient("mongodb://localhost:27017/?replicaSet=rs0");  
  
await mongoClient.connect();  
  
try {  
  await mongoClient.db(DB).createCollection(COLLECTION, {    capped: true,    size: 1e6  });} catch (e) {  
  // collection already exists}  
const mongoCollection = mongoClient.db(DB).collection(COLLECTION);  
  
io.adapter(createAdapter(mongoCollection));  
io.listen(3000);  
```
### Usage with a TTL index[​](_docs_v4_mongo-adapter.md#usage-with-a-ttl-index)
```
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/mongo-adapter";  
import { MongoClient } from "mongodb";  
  
const DB = "mydb";  
const COLLECTION = "socket.io-adapter-events";  
  
const io = new Server();  
  
const mongoClient = new MongoClient("mongodb://localhost:27017/?replicaSet=rs0");  
  
await mongoClient.connect();  
  
const mongoCollection = mongoClient.db(DB).collection(COLLECTION);  
  
await mongoCollection.createIndex(  
  { createdAt: 1 },  { expireAfterSeconds: 3600, background: true });  
  
io.adapter(createAdapter(mongoCollection, {  
  addCreatedAtField: true}));  
  
io.listen(3000);  
```
Name

Description

Default value

Added in

`uid`

the ID of this node

a random id

`v0.1.0`

`requestsTimeout`

the timeout for inter-server requests such as `fetchSockets()` or `serverSideEmit()` with ack

`5000`

`v0.1.0`

`heartbeatInterval`

the number of ms between two heartbeats

`5000`

`v0.1.0`

`heartbeatTimeout`

the number of ms without heartbeat before we consider a node down

`10000`

`v0.1.0`

`addCreatedAtField`

whether to add a `createdAt` field to each MongoDB document

`false`

`v0.2.0`

### Do I still need to enable sticky sessions when using the MongoDB adapter?[​](_docs_v4_mongo-adapter.md#do-i-still-need-to-enable-sticky-sessions-when-using-the-mongodb-adapter)

Yes. Failing to do so will result in HTTP 400 responses (you are reaching a server that is not aware of the Socket.IO session).

More information can be found [here](_docs_v4_using-multiple-nodes_.md#why-is-sticky-session-required).

### What happens when the MongoDB cluster is down?[​](_docs_v4_mongo-adapter.md#what-happens-when-the-mongodb-cluster-is-down)

In case the connection to the MongoDB cluster is severed, the behavior will depend on the value of the `bufferMaxEntries` option of the MongoDB client:

*   if its value is `-1` (default), the packets will be buffered until reconnection.
*   if its value is `0`, the packets will only be sent to the clients that are connected to the current server.

Documentation: [http://mongodb.github.io/node-mongodb-native/3.6/api/global.html#MongoClientOptions](http://mongodb.github.io/node-mongodb-native/3.6/api/global.html#MongoClientOptions)

Version

Release date

Release notes

Diff

`0.3.2`

January 2024

[link](https://github.com/socketio/socket.io-mongo-adapter/releases/tag/0.3.2)

[`0.3.1...0.3.2`](https://github.com/socketio/socket.io-mongo-adapter/compare/0.3.1...0.3.2)

`0.3.1`

January 2024

[link](https://github.com/socketio/socket.io-mongo-adapter/releases/tag/0.3.1)

[`0.3.0...0.3.1`](https://github.com/socketio/socket.io-mongo-adapter/compare/0.3.0...0.3.1)

`0.3.0`

February 2023

[link](https://github.com/socketio/socket.io-mongo-adapter/releases/tag/0.3.0)

[`0.2.1...0.3.0`](https://github.com/socketio/socket.io-mongo-adapter/compare/0.2.1...0.3.0)

`0.2.1`

May 2022

[link](https://github.com/socketio/socket.io-mongo-adapter/releases/tag/0.2.1)

[`0.2.0...0.2.1`](https://github.com/socketio/socket.io-mongo-adapter/compare/0.2.0...0.2.1)

`0.2.0`

April 2022

[link](https://github.com/socketio/socket.io-mongo-adapter/releases/tag/0.2.0)

[`0.1.0...0.2.0`](https://github.com/socketio/socket.io-mongo-adapter/compare/0.1.0...0.2.0)

`0.1.0`

June 2021

[link](https://github.com/socketio/socket.io-mongo-adapter/releases/tag/0.1.0)

[Complete changelog](https://github.com/socketio/socket.io-mongo-adapter/blob/main/CHANGELOG.md)

The MongoDB emitter allows sending packets to the connected clients from another Node.js process:

![Diagram of how the MongoDB adapter works](https://socket.io/images/mongo-emitter.png)![Diagram of how the MongoDB adapter works](https://socket.io/images/mongo-emitter-dark.png)

### Installation[​](_docs_v4_mongo-adapter.md#installation-1)
```
npm install @socket.io/mongo-emitter mongodb  
```
### Usage[​](_docs_v4_mongo-adapter.md#usage-1)
```
const { Emitter } = require("@socket.io/mongo-emitter");  
const { MongoClient } = require("mongodb");  
  
const mongoClient = new MongoClient("mongodb://localhost:27017/?replicaSet=rs0");  
  
const main = async () => {  
  await mongoClient.connect();  
  const mongoCollection = mongoClient.db("mydb").collection("socket.io-adapter-events");  const emitter = new Emitter(mongoCollection);  
  setInterval(() => {    emitter.emit("ping", new Date());  }, 1000);}  
  
main();  
```
Please refer to the cheatsheet [here](_docs_v4_adapter_.md#emitter-cheatsheet).

#### _docs_v4_namespaces.md

> Source: https://socket.io/docs/v4/namespaces
> Scraped: 4/14/2025, 11:55:32 PM

A Namespace is a communication channel that allows you to split the logic of your application over a single shared connection (also called "multiplexing").

![Namespace diagram](https://socket.io/images/namespaces.png)![Namespace diagram](https://socket.io/images/namespaces-dark.png)

Each namespace has its own:

* [event handlers](_docs_v4_listening-to-events_.md)
```
io.of("/orders").on("connection", (socket) => {  
  socket.on("order:list", () => {});  socket.on("order:create", () => {});});  
  
io.of("/users").on("connection", (socket) => {  
  socket.on("user:list", () => {});});  
```
* [rooms](_docs_v4_rooms_.md)
```
const orderNamespace = io.of("/orders");  
  
orderNamespace.on("connection", (socket) => {  
  socket.join("room1");  orderNamespace.to("room1").emit("hello");});  
  
const userNamespace = io.of("/users");  
  
userNamespace.on("connection", (socket) => {  
  socket.join("room1"); // distinct from the room in the "orders" namespace  userNamespace.to("room1").emit("holà");});  
```
* [middlewares](_docs_v4_middlewares_.md)
```
const orderNamespace = io.of("/orders");  
  
orderNamespace.use((socket, next) => {  
  // ensure the socket has access to the "orders" namespace, and then  next();});  
  
const userNamespace = io.of("/users");  
  
userNamespace.use((socket, next) => {  
  // ensure the socket has access to the "users" namespace, and then  next();});  
```
Possible use cases:

*   you want to create a special namespace that only authorized users have access to, so the logic related to those users is separated from the rest of the application
```
const adminNamespace = io.of("/admin");  
  
adminNamespace.use((socket, next) => {  
  // ensure the user has sufficient rights  next();});  
  
adminNamespace.on("connection", socket => {  
  socket.on("delete user", () => {    // ...  });});  
```
*   your application has multiple tenants so you want to dynamically create one namespace per tenant
```
const workspaces = io.of(/^\/\w+$/);  
  
workspaces.on("connection", socket => {  
  const workspace = socket.nsp;  
  workspace.emit("hello");});  
```
## Main namespace[​](_docs_v4_namespaces.md#main-namespace)

Until now, you interacted with the main namespace, called `/`. The `io` instance inherits all of its methods:
```
io.on("connection", (socket) => {});  
io.use((socket, next) => { next() });  
io.emit("hello");  
// are actually equivalent to  
io.of("/").on("connection", (socket) => {});  
io.of("/").use((socket, next) => { next() });  
io.of("/").emit("hello");  
```
Some tutorials may also mention `io.sockets`, it's simply an alias for `io.of("/")`.
```
io.sockets === io.of("/")  
```
To set up a custom namespace, you can call the `of` function on the server-side:
```
const nsp = io.of("/my-namespace");  
  
nsp.on("connection", socket => {  
  console.log("someone connected");});  
  
nsp.emit("hi", "everyone!");  
```
Same-origin version:
```
const socket = io(); // or io("/"), the main namespace  
const orderSocket = io("/orders"); // the "orders" namespace  
const userSocket = io("/users"); // the "users" namespace  
```
Cross-origin/Node.js version:
```
const socket = io("https://example.com"); // or io("https://example.com/"), the main namespace  
const orderSocket = io("https://example.com/orders"); // the "orders" namespace  
const userSocket = io("https://example.com/users"); // the "users" namespace  
```
In the example above, only one WebSocket connection will be established, and the packets will automatically be routed to the right namespace.

Please note that multiplexing will be disabled in the following cases:

*   multiple creation for the same namespace
```
const socket1 = io();  
const socket2 = io(); // no multiplexing, two distinct WebSocket connections  
```
*   different domains
```
const socket1 = io("https://first.example.com");  
const socket2 = io("https://second.example.com"); // no multiplexing, two distinct WebSocket connections  
```
*   usage of the [forceNew](_docs_v4_client-options_.md#forcenew) option
```
const socket1 = io();  
const socket2 = io("/admin", { forceNew: true }); // no multiplexing, two distinct WebSocket connections  
```
It is also possible to dynamically create namespaces, either with a regular expression:
```
io.of(/^\/dynamic-\d+$/);  
```
or with a function:
```
io.of((name, auth, next) => {  
  next(null, true); // or false, when the creation is denied});  
```
You can have access to the new namespace in the `connection` event:
```
io.of(/^\/dynamic-\d+$/).on("connection", (socket) => {  
  const namespace = socket.nsp;});  
```
The return value of the `of()` method is what we call the parent namespace, from which you can:

*   register [middlewares](_docs_v4_middlewares_.md)
```
const parentNamespace = io.of(/^\/dynamic-\d+$/);  
  
parentNamespace.use((socket, next) => { next() });  
```
The middleware will automatically be registered on each child namespace.

* [broadcast](_docs_v4_broadcasting-events_.md) events
```
const parentNamespace = io.of(/^\/dynamic-\d+$/);  
  
parentNamespace.emit("hello"); // will be sent to users in /dynamic-1, /dynamic-2, ...  
```
caution

Existing namespaces have priority over dynamic namespaces. For example:
```
// register "dynamic-101" namespace  
io.of("/dynamic-101");  
  
io.of(/^\/dynamic-\d+$/).on("connection", (socket) => {  
  // will not be called for a connection on the "dynamic-101" namespace});  
```
The complete API exposed by the Namespace instance can be found [here](_docs_v4_server-api_.md#namespace).

#### _docs_v4_performance-tuning.md

> Source: https://socket.io/docs/v4/performance-tuning
> Scraped: 4/14/2025, 11:55:40 PM

Here are some tips to improve the performance of your Socket.IO server:

* [at the Socket.IO level](_docs_v4_performance-tuning.md#at-the-socketio-level)
* [at the OS level](_docs_v4_performance-tuning.md#at-the-os-level)

You might also be interested in [scaling to multiple nodes](_docs_v4_using-multiple-nodes_.md).

Since, in most cases, the Socket.IO connection will be established with WebSocket, the performance of your Socket.IO server will be strongly linked to the performance of the underlying WebSocket server ([`ws`](https://github.com/websockets/ws), by default).

### Install `ws` native add-ons[​](_docs_v4_performance-tuning.md#install-ws-native-add-ons)

`ws` comes with two optional binary add-ons which improve certain operations. Prebuilt binaries are available for the most popular platforms so you don't necessarily need to have a C++ compiler installed on your machine.

* [bufferutil](https://www.npmjs.com/package/bufferutil): Allows to efficiently perform operations such as masking and unmasking the data payload of the WebSocket frames.
* [utf-8-validate](https://www.npmjs.com/package/utf-8-validate): Allows to efficiently check if a message contains valid UTF-8 as required by the spec.

To install those packages:
```
$ npm install --save-optional bufferutil utf-8-validate  
```
Please note that these packages are optional, the WebSocket server will fallback to the Javascript implementation if they are not available. More information can be found [here](https://github.com/websockets/ws/#opt-in-for-performance-and-spec-compliance).

### Use another WebSocket server implementation[​](_docs_v4_performance-tuning.md#use-another-websocket-server-implementation)

For example, you can use the [eiows](https://www.npmjs.com/package/eiows) package, which is a fork of the (now deprecated) [uws](https://www.npmjs.com/package/uws) package:

And then use the [`wsEngine`](_docs_v4_server-options_.md#wsengine) option:
```
const { createServer } = require("http");  
const { Server } = require("socket.io");  
  
const httpServer = createServer();  
const io = new Server(httpServer, {  
  wsEngine: require("eiows").Server});  
```
### Use a custom parser[​](_docs_v4_performance-tuning.md#use-a-custom-parser)

If you send binary data over the Socket.IO connection, using a [custom parser](_docs_v4_custom-parser_.md) like the one based on [msgpack](_docs_v4_custom-parser_.md#the-msgpack-parser) might be interesting, as by default each buffer will be sent in its own WebSocket frame.

Usage:

_Server_
```
const { createServer } = require("http");  
const { Server } = require("socket.io");  
const parser = require("socket.io-msgpack-parser");  
  
const httpServer = createServer();  
const io = new Server(httpServer, {  
  parser});  
```
_Client_
```
const { io } = require("socket.io-client");  
const parser = require("socket.io-msgpack-parser");  
  
const socket = io("https://example.com", {  
  parser});  
```
### Discard the initial HTTP request[​](_docs_v4_performance-tuning.md#discard-the-initial-http-request)

By default, a reference to the first HTTP request of each session is kept in memory. This reference is needed when working with `express-session` for example (see [here](_how-to_use-with-express-session.md)), but can be discarded to save memory:
```
io.engine.on("connection", (rawSocket) => {  
  rawSocket.request = null;});  
```
Before:

![Memory usage before](https://socket.io/assets/images/memory-usage-with-request-b554b6f42f70ccccc481b2b70b3f7faa.png)

After:

![Memory usage with request discarded](https://socket.io/assets/images/memory-usage-without-request-bd0c586f131951e79f68c17a29104e98.png)

There are lots of good articles on how to tune your OS to accept a large number of connections. Please see [this one](https://medium.com/@elliekang/scaling-to-a-millions-websocket-concurrent-connections-at-spoon-radio-bbadd6ec1901) for example.

While [load testing](_docs_v4_load-testing_.md) your Socket.IO server, you will likely reach the two following limits:

*   maximum number of open files

If you can't go over 1000 concurrent connections (new clients are not able to connect), you have most certainly reached the maximum number of open files:

To increase this number, create a new file `/etc/security/limits.d/custom.conf` with the following content (requires root privileges):
```
* soft nofile 1048576  
* hard nofile 1048576  
```
And then reload your session. Your new limit should now be updated:

*   maximum number of available local ports

If you can't go over 28000 concurrent connections, you have most certainly reached the maximum number of available local ports:
```
$ cat /proc/sys/net/ipv4/ip_local_port_range  
32768   60999  
```
To increase this number, create a new file `/etc/sysctl.d/net.ipv4.ip_local_port_range.conf` with the following content (again, requires root privileges):
```
net.ipv4.ip_local_port_range = 10000 65535  
```
Note: we used `10000` as a lower bound so it does not include the ports that are used by the services on the machine (like `5432` for a PostgreSQL server), but you can totally use a lower value (down to `1024`).

Once you reboot your machine, you will now be able to happily go to 55k concurrent connections (per incoming IP).

See also:

* [https://unix.stackexchange.com/a/130798](https://unix.stackexchange.com/a/130798)

#### _docs_v4_pm2.md

> Source: https://socket.io/docs/v4/pm2
> Scraped: 4/14/2025, 11:55:40 PM

PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

You can find its documentation here: [https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)

To scale a Socket.IO server with PM2, there are three solutions:

*   disable HTTP long-polling on the client-side
```
const socket = io({  
  transports: ["websocket"]});  
```
Though in that case, there will be no fallback to HTTP long-polling if the WebSocket connection cannot be established.

*   use a distinct port for each worker, and a load-balancer like nginx in front of them
    
*   use `@socket.io/pm2`
    
```
npm install -g @socket.io/pm2  
```
If `pm2` is already installed, you will have to remove it first:

`@socket.io/pm2` can be used as a drop-in replacement for `pm2`, and supports all the commands of the class `pm2` utility.

The only difference comes from [this commit](https://github.com/socketio/pm2/commit/8c29a7feb6cbde3c8ef9eb072fee284686f1553f).

`worker.js`
```
const { createServer } = require("http");  
const { Server } = require("socket.io");  
const { createAdapter } = require("@socket.io/cluster-adapter");  
const { setupWorker } = require("@socket.io/sticky");  
  
const httpServer = createServer();  
const io = new Server(httpServer);  
  
io.adapter(createAdapter());  
  
setupWorker(io);  
  
io.on("connection", (socket) => {  
  console.log(`connect ${socket.id}`);});  
```
`ecosystem.config.js`
```
module.exports = {  
  apps : [{    script    : "worker.js",    instances : "max",    exec_mode : "cluster"  }]}  
```
And then run `pm2 start ecosystem.config.js` (or `pm2 start worker.js -i 0`). That's it! You can now reach the Socket.IO cluster on port 8080.

When [scaling to multiple nodes](_docs_v4_using-multiple-nodes_.md), there are two things to do:

*   enable sticky sessions, so that the HTTP requests of a Socket.IO session are routed to the same worker
*   use a custom adapter, so that the packets are broadcast to all clients, even if they are connected to another worker

In order to achieve this, `@socket.io/pm2` includes two additional packages:

* [`@socket.io/sticky`](https://github.com/socketio/socket.io-sticky)
* [`@socket.io/cluster-adapter`](https://github.com/socketio/socket.io-cluster-adapter)

The only difference with `pm2` comes from [this commit](https://github.com/socketio/pm2/commit/8c29a7feb6cbde3c8ef9eb072fee284686f1553f):

*   the God process now creates its own HTTP server and routes the HTTP requests to the right worker
*   the God process also relays the packets between the workers, so that `io.emit()` correctly reaches all clients

Please note that if you have several hosts each running a PM2 cluster, you will have to use another adapter, like the [Redis adapter](_docs_v4_redis-adapter_.md).

The source code of the fork can be found [here](https://github.com/socketio/pm2). We will try to closely follow the releases of the `pm2` package.

#### _docs_v4_postgres-adapter.md

> Source: https://socket.io/docs/v4/postgres-adapter
> Scraped: 4/14/2025, 11:55:35 PM

Every packet that is sent to multiple clients (e.g. `io.to("room1").emit()` or `socket.broadcast.emit()`) is:

For TypeScript users, you might also need `@types/pg`.
```
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/postgres-adapter";  
import pg from "pg";  
  
const io = new Server();  
  
const pool = new pg.Pool({  
  user: "postgres",  host: "localhost",  database: "postgres",  password: "changeit",  port: 5432,});  
  
pool.query(`  
  CREATE TABLE IF NOT EXISTS socket_io_attachments (      id          bigserial UNIQUE,      created_at  timestamptz DEFAULT NOW(),      payload     bytea  );`);  
  
pool.on("error", (err) => {  
  console.error("Postgres error", err);});  
  
io.adapter(createAdapter(pool));  
io.listen(3000);  
```
Yes. Failing to do so will result in HTTP 400 responses (you are reaching a server that is not aware of the Socket.IO session).

In case the connection to the Postgres server is severed, the packets will only be sent to the clients that are connected to the current server.

The Postgres emitter allows sending packets to the connected clients from another Node.js process:
```
const { Emitter } = require("@socket.io/postgres-emitter");  
const { Pool } = require("pg");  
  
const pool = new Pool({  
  user: "postgres",  host: "localhost",  database: "postgres",  password: "changeit",  port: 5432,});  
  
const emitter = new Emitter(pool);  
  
setInterval(() => {  
  emitter.emit("ping", new Date());}, 1000);  
```

#### _docs_v4_redis-adapter.md

> Source: https://socket.io/docs/v4/redis-adapter
> Scraped: 4/14/2025, 11:55:36 PM

The Redis adapter relies on the Redis [Pub/Sub mechanism](https://redis.io/topics/pubsub).

Every packet that is sent to multiple clients (e.g. `io.to("room1").emit()` or `socket.broadcast.emit()`) is:

*   sent to all matching clients connected to the current server
*   published in a Redis channel, and received by the other Socket.IO servers of the cluster

![Diagram of how the Redis adapter works](https://socket.io/images/broadcasting-redis.png)![Diagram of how the Redis adapter works](https://socket.io/images/broadcasting-redis-dark.png)

The source code of this adapter can be found [here](https://github.com/socketio/socket.io-redis-adapter).

Feature

`socket.io` version

Support

Socket management

`4.0.0`

✅ YES (since version `6.1.0`)

Inter-server communication

`4.1.0`

✅ YES (since version `7.0.0`)

Broadcast with acknowledgements

[`4.5.0`](_docs_v4_changelog_4.5.0.md)

✅ YES (since version `7.2.0`)

Connection state recovery

[`4.6.0`](_docs_v4_changelog_4.6.0.md)

❌ NO
```
npm install @socket.io/redis-adapter  
```
Redis Adapter version

Socket.IO server version

4.x

1.x

5.x

2.x

6.0.x

3.x

6.1.x

4.x

7.x and above

4.3.1 and above

### With the `redis` package[​](_docs_v4_redis-adapter.md#with-the-redis-package)
```
import { createClient } from "redis";  
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/redis-adapter";  
  
const pubClient = createClient({ url: "redis://localhost:6379" });  
const subClient = pubClient.duplicate();  
  
await Promise.all([  
  pubClient.connect(),  subClient.connect()]);  
  
const io = new Server({  
  adapter: createAdapter(pubClient, subClient)});  
  
io.listen(3000);  
```
### With the `redis` package and a Redis cluster[​](_docs_v4_redis-adapter.md#with-the-redis-package-and-a-redis-cluster)
```
import { createCluster } from "redis";  
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/redis-adapter";  
  
const pubClient = createCluster({  
  rootNodes: [    {      url: "redis://localhost:7000",    },    {      url: "redis://localhost:7001",    },    {      url: "redis://localhost:7002",    },  ],});  
const subClient = pubClient.duplicate();  
  
await Promise.all([  
  pubClient.connect(),  subClient.connect()]);  
  
const io = new Server({  
  adapter: createAdapter(pubClient, subClient)});  
  
io.listen(3000);  
```
### With the `ioredis` package[​](_docs_v4_redis-adapter.md#with-the-ioredis-package)
```
import { Redis } from "ioredis";  
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/redis-adapter";  
  
const pubClient = new Redis();  
const subClient = pubClient.duplicate();  
  
const io = new Server({  
  adapter: createAdapter(pubClient, subClient)});  
  
io.listen(3000);  
```
### With the `ioredis` package and a Redis cluster[​](_docs_v4_redis-adapter.md#with-the-ioredis-package-and-a-redis-cluster)
```
import { Cluster } from "ioredis";  
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/redis-adapter";  
  
const pubClient = new Cluster([  
  {    host: "localhost",    port: 7000,  },  {    host: "localhost",    port: 7001,  },  {    host: "localhost",    port: 7002,  },]);  
const subClient = pubClient.duplicate();  
  
const io = new Server({  
  adapter: createAdapter(pubClient, subClient)});  
  
io.listen(3000);  
```
### With Redis sharded Pub/Sub[​](_docs_v4_redis-adapter.md#with-redis-sharded-pubsub)

Sharded Pub/Sub was introduced in Redis 7.0 in order to help scaling the usage of Pub/Sub in cluster mode.

Reference: [https://redis.io/docs/interact/pubsub/#sharded-pubsub](https://redis.io/docs/interact/pubsub/#sharded-pubsub)

A dedicated adapter can be created with the `createShardedAdapter()` method:
```
import { Server } from "socket.io";  
import { createClient } from "redis";  
import { createShardedAdapter } from "@socket.io/redis-adapter";  
  
const pubClient = createClient({ host: "localhost", port: 6379 });  
const subClient = pubClient.duplicate();  
  
await Promise.all([  
  pubClient.connect(),  subClient.connect()]);  
  
const io = new Server({  
  adapter: createShardedAdapter(pubClient, subClient)});  
  
io.listen(3000);  
```
Minimum requirements:

*   Redis 7.0
* [`redis@4.6.0`](https://github.com/redis/node-redis/commit/3b1bad229674b421b2bc6424155b20d4d3e45bd1)

caution

It is not currently possible to use the sharded adapter with the `ioredis` package and a Redis cluster ([reference](https://github.com/luin/ioredis/issues/1759)).

### Default adapter[​](_docs_v4_redis-adapter.md#default-adapter)

Name

Description

Default value

`key`

The prefix for the Redis Pub/Sub channels.

`socket.io`

`requestsTimeout`

After this timeout the adapter will stop waiting from responses to request.

`5_000`

`publishOnSpecificResponseChannel`

Whether to publish a response to the channel specific to the requesting node.

`false`

`parser`

The parser to use for encoding and decoding messages sent to Redis.

`-`

tip

Setting the `publishOnSpecificResponseChannel` option to `true` is more efficient since the responses (for example when calling `fetchSockets()` or `serverSideEmit()`) are only sent to the requesting server, and not to all the servers.

However, it currently defaults to `false` for backward-compatibility.

### Sharded adapter[​](_docs_v4_redis-adapter.md#sharded-adapter)

Name

Description

Default value

`channelPrefix`

The prefix for the Redis Pub/Sub channels.

`socket.io`

`subscriptionMode`

The subscription mode impacts the number of Redis Pub/Sub channels used by the adapter.

`dynamic`

Available values for the `subscriptionMode` option:

Value

\# of Pub/Sub channels

Description

`static`

2 per namespace

Useful when used with dynamic namespaces.

`dynamic` (default)

(2 + 1 per public room) per namespace

Useful when some rooms have a low number of clients (so only a few Socket.IO servers are notified).

`dynamic-private`

(2 + 1 per room) per namespace

Like `dynamic` but creates separate channels for private rooms as well. Useful when there is lots of 1:1 communication via `socket.emit()` calls.

### Is there any data stored in Redis?[​](_docs_v4_redis-adapter.md#is-there-any-data-stored-in-redis)

No, the Redis adapter uses the [Pub/Sub mechanism](https://redis.io/topics/pubsub) to forward the packets between the Socket.IO servers, so there are no keys stored in Redis.

### Do I still need to enable sticky sessions when using the Redis adapter?[​](_docs_v4_redis-adapter.md#do-i-still-need-to-enable-sticky-sessions-when-using-the-redis-adapter)

Yes. Failing to do so will result in HTTP 400 responses (you are reaching a server that is not aware of the Socket.IO session).

More information can be found [here](_docs_v4_using-multiple-nodes_.md#why-is-sticky-session-required).

### What happens when the Redis server is down?[​](_docs_v4_redis-adapter.md#what-happens-when-the-redis-server-is-down)

In case the connection to the Redis server is severed, the packets will only be sent to the clients that are connected to the current server.

The package was renamed from `socket.io-redis` to `@socket.io/redis-adapter` in [v7](https://github.com/socketio/socket.io-redis-adapter/releases/tag/7.0.0), in order to match the name of the Redis emitter (`@socket.io/redis-emitter`).

To migrate to the new package, you'll need to make sure to provide your own Redis clients, as the package will no longer create Redis clients on behalf of the user.

Before:
```
const redisAdapter = require("socket.io-redis");  
  
io.adapter(redisAdapter({ host: "localhost", port: 6379 }));  
```
After:
```
const { createClient } = require("redis");  
const { createAdapter } = require("@socket.io/redis-adapter");  
  
const pubClient = createClient({ url: "redis://localhost:6379" });  
const subClient = pubClient.duplicate();  
  
io.adapter(createAdapter(pubClient, subClient));  
```
tip

The communication protocol between the Socket.IO servers has not been updated, so you can have some servers with `socket.io-redis` and some others with `@socket.io/redis-adapter` at the same time.

Version

Release date

Release notes

Diff

`8.3.0`

March 2024

[link](https://github.com/socketio/socket.io-redis-adapter/releases/tag/8.3.0)

[`8.2.1...8.3.0`](https://github.com/socketio/socket.io-redis-adapter/compare/8.2.1...8.3.0)

`8.2.1`

May 2023

[link](https://github.com/socketio/socket.io-redis-adapter/releases/tag/8.2.1)

[`8.2.0...8.2.1`](https://github.com/socketio/socket.io-redis-adapter/compare/8.2.0...8.2.1)

`8.2.0`

May 2023

[link](https://github.com/socketio/socket.io-redis-adapter/releases/tag/8.2.0)

[`8.1.0...8.2.0`](https://github.com/socketio/socket.io-redis-adapter/compare/8.1.0...8.2.0)

`8.1.0`

February 2023

[link](https://github.com/socketio/socket.io-redis-adapter/releases/tag/8.1.0)

[`8.0.0...8.1.0`](https://github.com/socketio/socket.io-redis-adapter/compare/8.0.0...8.1.0)

`8.0.0`

December 2022

[link](https://github.com/socketio/socket.io-redis-adapter/releases/tag/8.0.0)

[`7.2.0...8.0.0`](https://github.com/socketio/socket.io-redis-adapter/compare/7.2.0...8.0.0)

`7.2.0`

May 2022

[link](https://github.com/socketio/socket.io-redis-adapter/releases/tag/7.2.0)

[`7.1.0...7.2.0`](https://github.com/socketio/socket.io-redis-adapter/compare/7.1.0...7.2.0)

[Complete changelog](https://github.com/socketio/socket.io-redis-adapter/blob/main/CHANGELOG.md)

The Redis emitter allows sending packets to the connected clients from another Node.js process:

![Diagram of how the Redis emitter works](https://socket.io/images/redis-emitter.png)![Diagram of how the Redis emitter works](https://socket.io/images/redis-emitter-dark.png)

This emitter is also available in several languages:

*   Javascript: [https://github.com/socketio/socket.io-redis-emitter](https://github.com/socketio/socket.io-redis-emitter)
*   Java: [https://github.com/sunsus/socket.io-java-emitter](https://github.com/sunsus/socket.io-java-emitter)
*   Python: [https://pypi.org/project/socket.io-emitter/](https://pypi.org/project/socket.io-emitter/)
*   PHP: [https://github.com/rase-/socket.io-php-emitter](https://github.com/rase-/socket.io-php-emitter)
*   Golang: [https://github.com/yosuke-furukawa/socket.io-go-emitter](https://github.com/yosuke-furukawa/socket.io-go-emitter)
*   Perl: [https://metacpan.org/pod/SocketIO::Emitter](https://metacpan.org/pod/SocketIO::Emitter)
*   Rust: [https://github.com/epli2/socketio-rust-emitter](https://github.com/epli2/socketio-rust-emitter)

### Installation[​](_docs_v4_redis-adapter.md#installation-1)
```
npm install @socket.io/redis-emitter redis  
```
### Usage[​](_docs_v4_redis-adapter.md#usage-1)
```
import { Emitter } from "@socket.io/redis-emitter";  
import { createClient } from "redis";  
  
const redisClient = createClient({ url: "redis://localhost:6379" });  
  
redisClient.connect().then(() => {  
  const emitter = new Emitter(redisClient);  
  setInterval(() => {    emitter.emit("time", new Date);  }, 5000);});  
```
Note: with `redis@3`, calling `connect()` on the Redis client is not needed:
```
import { Emitter } from "@socket.io/redis-emitter";  
import { createClient } from "redis";  
  
const redisClient = createClient({ url: "redis://localhost:6379" });  
const emitter = new Emitter(redisClient);  
  
setInterval(() => {  
  emitter.emit("time", new Date);}, 5000);  
```
Please refer to the cheatsheet [here](_docs_v4_adapter_.md#emitter-cheatsheet).

### Migrating from `socket.io-emitter`[​](_docs_v4_redis-adapter.md#migrating-from-socketio-emitter)

The package was renamed from `socket.io-emitter` to `@socket.io/redis-emitter` in [v4](https://github.com/socketio/socket.io-redis-emitter/releases/tag/4.0.0), in order to better reflect the relationship with Redis.

To migrate to the new package, you'll need to make sure to provide your own Redis clients, as the package will no longer create Redis clients on behalf of the user.

Before:
```
const io = require("socket.io-emitter")({ host: "127.0.0.1", port: 6379 });  
```
After:
```
const { Emitter } = require("@socket.io/redis-emitter");  
const { createClient } = require("redis");  
  
const redisClient = createClient();  
const io = new Emitter(redisClient);  
```
### Latest releases[​](_docs_v4_redis-adapter.md#latest-releases-1)

Version

Release date

Release notes

Diff

`5.1.0`

January 2023

[link](https://github.com/socketio/socket.io-redis-emitter/releases/tag/5.1.0)

[`5.0.0...5.1.0`](https://github.com/socketio/socket.io-redis-emitter/compare/5.0.0...5.1.0)

`5.0.0`

September 2022

[link](https://github.com/socketio/socket.io-redis-emitter/releases/tag/5.0.1)

[`4.1.1...5.0.0`](https://github.com/socketio/socket.io-redis-emitter/compare/4.1.1...5.0.0)

`4.1.1`

January 2022

[link](https://github.com/socketio/socket.io-redis-emitter/releases/tag/4.1.1)

[`4.1.0...4.1.1`](https://github.com/socketio/socket.io-redis-emitter/compare/4.1.0...4.1.1)

`4.1.0`

May 2021

[link](https://github.com/socketio/socket.io-redis-emitter/releases/tag/4.1.0)

[`4.0.0...4.1.0`](https://github.com/socketio/socket.io-redis-emitter/compare/4.0.0...4.1.0)

`4.0.0`

March 2021

[link](https://github.com/socketio/socket.io-redis-emitter/releases/tag/4.0.0)

[`3.2.0...4.0.0`](https://github.com/socketio/socket.io-redis-emitter/compare/3.2.0...4.0.0)

[Complete changelog](https://github.com/socketio/socket.io-redis-emitter/blob/main/CHANGELOG.md)

#### _docs_v4_redis-streams-adapter.md

> Source: https://socket.io/docs/v4/redis-streams-adapter
> Scraped: 4/14/2025, 11:55:35 PM

The adapter will use a [Redis stream](https://redis.io/docs/data-types/streams/) to forward packets between the Socket.IO servers.

The main difference with the existing Redis adapter (which use the [Redis Pub/Sub mechanism](https://redis.io/docs/manual/pubsub/)) is that this adapter will properly handle any temporary disconnection to the Redis server and resume the stream without losing any packets.

info

*   a single stream is used for all namespaces
*   the `maxLen` option allows to limit the size of the stream
*   unlike the adapter based on Redis PUB/SUB mechanism, this adapter will properly handle any temporary disconnection to the Redis server and resume the stream
*   if [connection state recovery](_docs_v4_connection-state-recovery.md) is enabled, the sessions will be stored in Redis as a classic key/value pair

tip

This adapter is also compatible with [Valkey](https://valkey.io/).

Source code: [https://github.com/socketio/socket.io-redis-streams-adapter](https://github.com/socketio/socket.io-redis-streams-adapter)

Feature

`socket.io` version

Support

Socket management

`4.0.0`

✅ YES (since version `0.1.0`)

Inter-server communication

`4.1.0`

✅ YES (since version `0.1.0`)

Broadcast with acknowledgements

[`4.5.0`](_docs_v4_changelog_4.5.0.md)

✅ YES (since version `0.1.0`)

Connection state recovery

[`4.6.0`](_docs_v4_changelog_4.6.0.md)

✅ YES (since version `0.1.0`)
```
npm install @socket.io/redis-streams-adapter redis  
```
### With the `redis` package[​](_docs_v4_redis-streams-adapter.md#with-the-redis-package)
```
import { createClient } from "redis";  
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/redis-streams-adapter";  
  
const redisClient = createClient({ url: "redis://localhost:6379" });  
  
await redisClient.connect();  
  
const io = new Server({  
  adapter: createAdapter(redisClient)});  
  
io.listen(3000);  
```
### With the `redis` package and a Redis cluster[​](_docs_v4_redis-streams-adapter.md#with-the-redis-package-and-a-redis-cluster)
```
import { createCluster } from "redis";  
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/redis-streams-adapter";  
  
const redisClient = createCluster({  
  rootNodes: [    {      url: "redis://localhost:7000",    },    {      url: "redis://localhost:7001",    },    {      url: "redis://localhost:7002",    },  ],});  
  
await redisClient.connect();  
  
const io = new Server({  
  adapter: createAdapter(redisClient)});  
  
io.listen(3000);  
```
### With the `ioredis` package[​](_docs_v4_redis-streams-adapter.md#with-the-ioredis-package)
```
import { Redis } from "ioredis";  
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/redis-streams-adapter";  
  
const redisClient = new Redis();  
  
const io = new Server({  
  adapter: createAdapter(redisClient)});  
  
io.listen(3000);  
```
### With the `ioredis` package and a Redis cluster[​](_docs_v4_redis-streams-adapter.md#with-the-ioredis-package-and-a-redis-cluster)
```
import { Cluster } from "ioredis";  
import { Server } from "socket.io";  
import { createAdapter } from "@socket.io/redis-streams-adapter";  
  
const redisClient = new Cluster([  
  {    host: "localhost",    port: 7000,  },  {    host: "localhost",    port: 7001,  },  {    host: "localhost",    port: 7002,  },]);  
  
const io = new Server({  
  adapter: createAdapter(redisClient)});  
  
io.listen(3000);  
```
Name

Description

Default value

`streamName`

The name of the Redis stream.

`socket.io`

`maxLen`

The maximum size of the stream. Almost exact trimming (~) is used.

`10_000`

`readCount`

The number of elements to fetch per XREAD call.

`100`

`sessionKeyPrefix`

The prefix of the key used to store the Socket.IO session, when the connection state recovery feature is enabled.

`sio:session:`

`heartbeatInterval`

The number of ms between two heartbeats.

`5_000`

`heartbeatTimeout`

The number of ms without heartbeat before we consider a node down.

`10_000`

### Do I still need to enable sticky sessions when using the Redis Streams adapter?[​](_docs_v4_redis-streams-adapter.md#do-i-still-need-to-enable-sticky-sessions-when-using-the-redis-streams-adapter)

Yes. Failing to do so will result in HTTP 400 responses (you are reaching a server that is not aware of the Socket.IO session).

More information can be found [here](_docs_v4_using-multiple-nodes_.md#why-is-sticky-session-required).

### What happens when the Redis server is down?[​](_docs_v4_redis-streams-adapter.md#what-happens-when-the-redis-server-is-down)

Unlike the classic [Redis adapter](_docs_v4_redis-adapter_.md), this adapter will properly handle any temporary disconnection to the Redis server and resume the stream without losing any packets.

Version

Release date

Release notes

Diff

`0.2.2`

May 2024

[link](https://github.com/socketio/socket.io-redis-streams-adapter/releases/tag/0.2.2)

[`0.2.1...0.2.2`](https://github.com/socketio/socket.io-redis-streams-adapter/compare/0.2.1...0.2.2)

`0.2.1`

March 2024

[link](https://github.com/socketio/socket.io-redis-streams-adapter/releases/tag/0.2.1)

[`0.2.0...0.2.1`](https://github.com/socketio/socket.io-redis-streams-adapter/compare/0.2.0...0.2.1)

`0.2.0`

February 2024

[link](https://github.com/socketio/socket.io-redis-streams-adapter/releases/tag/0.2.0)

[`0.1.0...0.2.0`](https://github.com/socketio/socket.io-redis-streams-adapter/compare/0.1.0...0.2.0)

`0.1.0`

April 2023

[link](https://github.com/socketio/socket.io-redis-streams-adapter/releases/tag/0.1.0)

[Complete changelog](https://github.com/socketio/socket.io-redis-streams-adapter/blob/main/CHANGELOG.md)

#### _docs_v4_reverse-proxy.md

> Source: https://socket.io/docs/v4/reverse-proxy
> Scraped: 4/14/2025, 11:55:40 PM

You will find below the configuration needed for deploying a Socket.IO server behind a reverse-proxy solution, such as:

* [nginx](_docs_v4_reverse-proxy.md#nginx)
* [Apache HTTPD](_docs_v4_reverse-proxy.md#apache-httpd)
* [Node.js `http-proxy`](_docs_v4_reverse-proxy.md#nodejs-http-proxy)
* [Caddy 2](_docs_v4_reverse-proxy.md#caddy-2)

In a multi-server setup, please check the documentation [here](_docs_v4_using-multiple-nodes_.md).

Content of `/etc/nginx/nginx.conf`:
```
http {  
  server {    listen 80;  
    location / {      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;      proxy_set_header Host $host;  
      proxy_pass http://localhost:3000;  
      proxy_http_version 1.1;      proxy_set_header Upgrade $http_upgrade;      proxy_set_header Connection "upgrade";    }  }}  
```
# must be bigger than pingInterval (25s by default) + pingTimeout (20s by default)  

ProxyTimeout 60  
```
Related:

* [mod\_proxy\_wstunnel documentation](https://httpd.apache.org/docs/2.4/en/mod/mod_proxy_wstunnel.html)
* [configuration in a multi-server setup](_docs_v4_using-multiple-nodes_.md#apache-httpd-configuration)

Installation: `npm i http-proxy`
```
const httpProxy = require("http-proxy");  
  
httpProxy  
  .createProxyServer({    target: "http://localhost:3000",    ws: true,  })  .listen(80);
```
[Documentation](https://github.com/http-party/node-http-proxy#readme)

Content of `Caddyfile` for [Caddy 2](https://caddyserver.com/v2), if you only want to forward the Socket.IO requests
```
example.com {  
    reverse_proxy /socket.io/* localhost:3000}  
```
Or, if you want a custom path:
```
example.com {  
  rewrite /path /path/  handle_path /path/* {    rewrite * /socket.io{path}    reverse_proxy localhost:3000  }}  
```
Related

* [Solution forum post](https://caddy.community/t/i-cant-get-socket-io-proxy-to-work-on-v2/8703/2)
* [Caddyfile reverse proxy](https://caddyserver.com/docs/caddyfile/patterns#reverse-proxy)
* [Caddyfile directives](https://caddyserver.com/docs/caddyfile/directives)

#### _docs_v4_rooms.md

> Source: https://socket.io/docs/v4/rooms
> Scraped: 4/14/2025, 11:55:33 PM

A _room_ is an arbitrary channel that sockets can `join` and `leave`. It can be used to broadcast events to a subset of clients:

![Broadcasting to all clients in a room](https://socket.io/images/rooms.png)![Broadcasting to all clients in a room](https://socket.io/images/rooms-dark.png)

info

Please note that rooms are a **server-only** concept (i.e. the client does not have access to the list of rooms it has joined).

You can call `join` to subscribe the socket to a given channel:
```
io.on("connection", (socket) => {  
  socket.join("some room");});  
```
And then simply use `to` or `in` (they are the same) when broadcasting or emitting:
```
io.to("some room").emit("some event");  
```
Or exclude a room:
```
io.except("some room").emit("some event");  
```
You can also emit to several rooms at the same time:
```
io.to("room1").to("room2").to("room3").emit("some event");  
```
In that case, a [union](https://en.wikipedia.org/wiki/Union_(set_theory)) is performed: every socket that is at least in one of the rooms will get the event **once** (even if the socket is in two or more rooms).

You can also broadcast to a room from a given socket:
```
io.on("connection", (socket) => {  
  socket.to("some room").emit("some event");});  
```
In that case, every socket in the room **excluding** the sender will get the event.

![Broadcasting to all clients in a room excepting the sender](https://socket.io/images/rooms2.png)![Broadcasting to all clients in a room excepting the sender](https://socket.io/images/rooms2-dark.png)

To leave a channel you call `leave` in the same fashion as `join`.

*   broadcast data to each device / tab of a given user
```
function computeUserIdFromHeaders(headers) {  
  // to be implemented}  
  
io.on("connection", async (socket) => {  
  const userId = await computeUserIdFromHeaders(socket.handshake.headers);  
  socket.join(userId);  
  // and then later  io.to(userId).emit("hi");});  
```
*   send notifications about a given entity
```
io.on("connection", async (socket) => {  
  const projects = await fetchProjects(socket);  
  projects.forEach(project => socket.join("project:" + project.id));  
  // and then later  io.to("project:4321").emit("project updated");});  
```
Upon disconnection, sockets `leave` all the channels they were part of automatically, and no special teardown is needed on your part.

You can fetch the rooms the Socket was in by listening to the `disconnecting` event:
```
io.on("connection", socket => {  
  socket.on("disconnecting", () => {    console.log(socket.rooms); // the Set contains at least the socket ID  });  
  socket.on("disconnect", () => {    // socket.rooms.size === 0  });});  
```
Like [global broadcasting](_docs_v4_broadcasting-events_.md#with-multiple-socketio-servers), broadcasting to rooms also works with multiple Socket.IO servers.

You just need to replace the default [Adapter](_docs_v4_glossary_.md#adapter) by the Redis Adapter. More information about it [here](_docs_v4_redis-adapter_.md).

![Broadcasting to all clients in a room with Redis](https://socket.io/images/rooms-redis.png)![Broadcasting to all clients in a room with Redis](https://socket.io/images/rooms-redis-dark.png)

The "room" feature is implemented by what we call an Adapter. This Adapter is a server-side component which is responsible for:

*   storing the relationships between the Socket instances and the rooms
*   broadcasting events to all (or a subset of) clients

You can find the code of the default in-memory adapter [here](https://github.com/socketio/socket.io-adapter).

Basically, it consists in two [ES6 Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map):

*   `sids`: `Map<SocketId, Set<Room>>`
*   `rooms`: `Map<Room, Set<SocketId>>`

Calling `socket.join("the-room")` will result in:

*   in the `sids` Map, adding "the-room" to the Set identified by the socket ID
*   in the `rooms` Map, adding the socket ID in the Set identified by the string "the-room"

Those two maps are then used when broadcasting:

*   a broadcast to all sockets (`io.emit()`) loops through the `sids` Map, and send the packet to all sockets
*   a broadcast to a given room (`io.to("room21").emit()`) loops through the Set in the `rooms` Map, and sends the packet to all matching sockets

You can access those objects with:
```
// main namespace  
const rooms = io.of("/").adapter.rooms;  
const sids = io.of("/").adapter.sids;  
  
// custom namespace  
const rooms = io.of("/my-namespace").adapter.rooms;  
const sids = io.of("/my-namespace").adapter.sids;  
```
Notes:

*   those objects are not meant to be directly modified, you should always use [`socket.join(...)`](_docs_v4_server-api_.md#socketjoinroom) and [`socket.leave(...)`](_docs_v4_server-api_.md#socketleaveroom) instead.
*   in a [multi-server](_docs_v4_using-multiple-nodes_.md) setup, the `rooms` and `sids` objects are not shared between the Socket.IO servers (a room may only "exist" on one server and not on another).

Starting with `socket.io@3.1.0`, the underlying Adapter will emit the following events:

*   `create-room` (argument: room)
*   `delete-room` (argument: room)
*   `join-room` (argument: room, id)
*   `leave-room` (argument: room, id)

Example:
```
io.of("/").adapter.on("create-room", (room) => {  
  console.log(`room ${room} was created`);});  
  
io.of("/").adapter.on("join-room", (room, id) => {  
  console.log(`socket ${id} has joined room ${room}`);});  
```

#### _docs_v4_server-api.md

> Source: https://socket.io/docs/v4/server-api
> Scraped: 4/14/2025, 11:55:34 PM

![Server in the class diagram for the server](https://socket.io/images/server-class-diagram-server.png)![Server in the class diagram for the server](https://socket.io/images/server-class-diagram-server-dark.png)

### Constructor[​](_docs_v4_server-api.md#constructor)

#### new Server(httpServer\[, options\])[​](_docs_v4_server-api.md#new-serverhttpserver-options)

*   `httpServer` [`<http.Server>`](https://nodejs.org/api/http.html#class-httpserver) | [`<https.Server>`](https://nodejs.org/api/https.html#class-httpsserver)
*   `options` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
```
import { createServer } from "http";  
import { Server } from "socket.io";  
  
const httpServer = createServer();  
const io = new Server(httpServer, {  
  // options});  
  
io.on("connection", (socket) => {  
  // ...});  
  
httpServer.listen(3000);  
```
The complete list of available options can be found [here](_docs_v4_server-options_.md).

#### new Server(port\[, options\])[​](_docs_v4_server-api.md#new-serverport-options)

*   `port` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
*   `options` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
```
import { Server } from "socket.io";  
  
const io = new Server(3000, {  
  // options});  
  
io.on("connection", (socket) => {  
  // ...});  
```
The complete list of available options can be found [here](_docs_v4_server-options_.md).

#### new Server(options)[​](_docs_v4_server-api.md#new-serveroptions)

*   `options` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
```
import { Server } from "socket.io";  
  
const io = new Server({  
  // options});  
  
io.on("connection", (socket) => {  
  // ...});  
  
io.listen(3000);  
```
The complete list of available options can be found [here](_docs_v4_server-options_.md).

### Events[​](_docs_v4_server-api.md#events)

#### Event: 'connect'[​](_docs_v4_server-api.md#event-connect)

Synonym of [Event: "connection"](_docs_v4_server-api.md#event-connection).

#### Event: 'connection'[​](_docs_v4_server-api.md#event-connection)

*   `socket` _(Socket)_ socket connection with client

Fired upon a connection from client.
```
io.on("connection", (socket) => {  
  // ...});  
```
#### Event: 'new\_namespace'[​](_docs_v4_server-api.md#event-new_namespace)

*   `namespace` [`Namespace`](_docs_v4_server-api.md#namespace)

Fired when a new namespace is created:
```
io.on("new_namespace", (namespace) => {  
  // ...});  
```
This can be useful for example:

*   to attach a shared middleware to each namespace
```
io.on("new_namespace", (namespace) => {  
  namespace.use(myMiddleware);});  
```
*   to track the [dynamically created](_docs_v4_namespaces_.md#dynamic-namespaces) namespaces
```
io.of(/\/nsp-\w+/);  
  
io.on("new_namespace", (namespace) => {  
  console.log(namespace.name);});  
```
### Attributes[​](_docs_v4_server-api.md#attributes)

#### server.engine[​](_docs_v4_server-api.md#serverengine)

A reference to the underlying Engine.IO server. See [here](_docs_v4_server-api.md#engine).

#### server.sockets[​](_docs_v4_server-api.md#serversockets)

* [`<Namespace>`](_docs_v4_server-api.md#namespace)

An alias for the main namespace (`/`).
```
io.sockets.emit("hi", "everyone");  
// is equivalent to  
io.of("/").emit("hi", "everyone");  
```
### Methods[​](_docs_v4_server-api.md#methods)

#### server.adapter(\[value\])[​](_docs_v4_server-api.md#serveradaptervalue)

*   `value` [`<Adapter>`](_docs_v4_adapter_.md)
*   **Returns** [`<Server>`](_docs_v4_server-api.md#server) | [`<Adapter>`](_docs_v4_adapter_.md)

Sets the adapter `value`. Defaults to an instance of the `Adapter` that ships with socket.io which is memory based. See [socket.io-adapter](https://github.com/socketio/socket.io-adapter). If no arguments are supplied this method returns the current value.
```
import { Server } from "socket.io"; import { createAdapter } from "@socket.io/redis-adapter";  
import { createClient } from "redis";  
  
const io = new Server();  
  
const pubClient = createClient({ host: "localhost", port: 6379 });  
const subClient = pubClient.duplicate();  
  
io.adapter(createAdapter(pubClient, subClient));  
  
// redis@3  
io.listen(3000);  
  
// redis@4  
Promise.all([pubClient.connect(), subClient.connect()]).then(() => {  
  io.listen(3000);});  
```
#### server.attach(httpServer\[, options\])[​](_docs_v4_server-api.md#serverattachhttpserver-options)

*   `httpServer` [`<http.Server>`](https://nodejs.org/api/http.html#class-httpserver) | [`<https.Server>`](https://nodejs.org/api/https.html#class-httpsserver)
*   `options` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Attaches the `Server` to an `httpServer` with the supplied `options`.
```
import { createServer } from "http";  
import { Server } from "socket.io";  
  
const httpServer = createServer();  
const io = new Server();  
  
io.attach(httpServer);  
  
io.on("connection", (socket) => {  
  // ...});  
  
httpServer.listen(3000);  
```
#### server.attach(port\[, options\])[​](_docs_v4_server-api.md#serverattachport-options)

*   `port` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
*   `options` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Attaches the `Server` on the given `port` with the supplied `options`.
```
import { Server } from "socket.io";  
  
const io = new Server();  
  
io.attach(3000);  
  
io.on("connection", (socket) => {  
  // ...});  
```
#### server.attachApp(app\[, options\])[​](_docs_v4_server-api.md#serverattachappapp-options)

*   `app` [`<uws.App>`](https://unetworking.github.io/uWebSockets.js/generated/interfaces/TemplatedApp.html)
*   `options` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Attaches the Socket.IO server to an [µWebSockets.js](https://github.com/uNetworking/uWebSockets.js) app:
```
import { App } from "uWebSockets.js";  
import { Server } from "socket.io";  
  
const app = App();  
const io = new Server();  
  
io.attachApp(app);  
  
io.on("connection", (socket) => {  
  // ...});  
  
app.listen(3000, (token) => {  
  if (!token) {    console.warn("port already in use");  }});  
```
#### server.bind(engine)[​](_docs_v4_server-api.md#serverbindengine)

*   `engine` `<engine.Server>`
*   **Returns** [`<Server>`](_docs_v4_server-api.md#server)

Advanced use only. Binds the server to a specific engine.io `Server` (or compatible API) instance.
```
import { createServer } from "node:http";  
import { Server as Engine } from "engine.io";  
import { Server } from "socket.io";  
  
const httpServer = createServer((req, res) => {  
  res.writeHead(404).end();});  
  
const engine = new Engine();  
  
engine.attach(httpServer, {  
  path: "/socket.io/"});  
  
const io = new Server();  
  
io.bind(engine);  
  
httpServer.listen(3000);  
```
#### server.close(\[callback\])[​](_docs_v4_server-api.md#serverclosecallback)

*   `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Closes the Socket.IO server and disconnect all clients. The `callback` argument is optional and will be called when all connections are closed.

info

This also closes the underlying HTTP server.
```
import { createServer } from "http";  
import { Server } from "socket.io";  
  
const PORT = 3030;  
const io = new Server(PORT);  
  
io.close();  
  
const httpServer = createServer();  
  
httpServer.listen(PORT); // PORT is free to use  
  
io.attach(httpServer);  
```
note

Only closing the underlying HTTP server is not sufficient, as it will only prevent the server from accepting new connections but clients connected with WebSocket will not be disconnected right away.

Reference: [https://nodejs.org/api/http.html#serverclosecallback](https://nodejs.org/api/http.html#serverclosecallback)

#### server.disconnectSockets(\[close\])[​](_docs_v4_server-api.md#serverdisconnectsocketsclose)

_Added in v4.0.0_

Alias for [`io.of("/").disconnectSockets(close)`](_docs_v4_server-api.md#namespacedisconnectsocketsclose).
```
// make all Socket instances disconnect  
io.disconnectSockets();  
  
// make all Socket instances in the "room1" room disconnect (and close the low-level connection)  
io.in("room1").disconnectSockets(true);  
```
tip

This method also works within a cluster of multiple Socket.IO servers, with a compatible adapter like the [Postgres adapter](_docs_v4_postgres-adapter_.md).

In that case, if you only want to affect the socket instances on the given node, you need to use the `local` flag:
```
// make all Socket instances that are currently connected on the given node disconnect  
io.local.disconnectSockets();  
```
See [here](_docs_v4_server-instance_.md#utility-methods).

#### server.emit(eventName\[, ...args\])[​](_docs_v4_server-api.md#serveremiteventname-args)

History

Version

Changes

v4.5.0

`io.emit()` now supports acknowledgements.

v1.0.0

Initial implementation.

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `args` `any[]`
*   **Returns** `true`

Emits an event to all connected clients in the main namespace.

Any number of parameters can be included, and all serializable data structures are supported:
```
io.emit("hello", 1, "2", { "3": 4 }, Buffer.from([5]));  
```
And on the receiving side:
```
socket.on("hello", (arg1, arg2, arg3, arg4) => {  
  console.log(arg1); // 1  console.log(arg2); // "2"  console.log(arg3); // { "3": 4 }  console.log(arg4); // ArrayBuffer or Buffer, depending on the platform});  
```
info

The arguments will automatically be serialized, so calling `JSON.stringify()` is not needed.

You can use [`to()`](_docs_v4_server-api.md#servertoroom) and [`except()`](_docs_v4_server-api.md#serverexceptrooms) to send the packet to specific clients:
```
// the “hello” event will be broadcast to all connected clients that are either  
// in the "room1" room or in the "room2" room, excluding those in the "room3" room  
io.to("room1").to("room2").except("room3").emit("hello");  
```
Starting with version `4.5.0`, it is now possible to use acknowledgements when broadcasting:
```
io.timeout(10000).emit("some-event", (err, responses) => {  
  if (err) {    // some clients did not acknowledge the event in the given delay  } else {    console.log(responses); // one response per client  }});  
```
caution

Calling [`timeout()`](_docs_v4_server-api.md#servertimeoutvalue) is mandatory in that case.

#### server.emitWithAck(eventName\[, ...args\])[​](_docs_v4_server-api.md#serveremitwithackeventname-args)

_Added in v4.6.0_

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `args` `any[]`
*   **Returns** [`Promise<any[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Promised-based version of broadcasting and expecting an acknowledgement from all targeted clients:
```
try {  
  const responses = await io.timeout(10000).emitWithAck("some-event");  console.log(responses); // one response per client} catch (e) {  
  // some clients did not acknowledge the event in the given delay}  
```
The example above is equivalent to:
```
io.timeout(10000).emit("some-event", (err, responses) => {  
  if (err) {    // some clients did not acknowledge the event in the given delay  } else {    console.log(responses); // one response per client  }});  
```
And on the receiving side:
```
socket.on("some-event", (callback) => {  
  callback("got it"); // only one argument is expected});  
```
#### server.except(rooms)[​](_docs_v4_server-api.md#serverexceptrooms)

_Added in v4.0.0_

*   `rooms` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<string[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   **Returns** `BroadcastOperator`

Sets a modifier for a subsequent event emission that the event will only be _broadcast_ to clients that have not joined the given `rooms`.
```
// the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room  
io.except("room-101").emit("foo", "bar");  
  
// with an array of rooms  
io.except(["room-101", "room-102"]).emit("foo", "bar");  
  
// with multiple chained calls  
io.except("room-101").except("room-102").emit("foo", "bar");  
```
#### server.fetchSockets()[​](_docs_v4_server-api.md#serverfetchsockets)

_Added in v4.0.0_

Alias for [`io.of("/").fetchSocket()`](_docs_v4_server-api.md#namespacefetchsockets).
```
// return all Socket instances of the main namespace  
const sockets = await io.fetchSockets();  
  
// return all Socket instances in the "room1" room of the main namespace  
const sockets = await io.in("room1").fetchSockets();  
```
Sample usage:
```
io.on("connection", (socket) => {  
  const userId = computeUserId(socket);  
  socket.join(userId);  
  socket.on("disconnect", async () => {    const sockets = await io.in(userId).fetchSockets();    if (sockets.length === 0) {      // no more active connections for the given user    }  });});  
```
tip

This method also works within a cluster of multiple Socket.IO servers, with a compatible adapter like the [Postgres adapter](_docs_v4_postgres-adapter_.md).

In that case, if you only want to return the socket instances on the given node, you need to use the `local` flag:
```
// return all Socket instances that are currently connected on the given node  
const sockets = await io.local.fetchSockets();  
```
See [here](_docs_v4_server-instance_.md#utility-methods).

#### server.in(room)[​](_docs_v4_server-api.md#serverinroom)

_Added in v1.0.0_

Synonym of [server.to(room)](_docs_v4_server-api.md#servertoroom), but might feel clearer in some cases:
```
// disconnect all clients in the "room-101" room  
io.in("room-101").disconnectSockets();  
```
#### server.listen(httpServer\[, options\])[​](_docs_v4_server-api.md#serverlistenhttpserver-options)

Synonym of [server.attach(httpServer\[, options\])](_docs_v4_server-api.md#serverattachhttpserver-options).

#### server.listen(port\[, options\])[​](_docs_v4_server-api.md#serverlistenport-options)

Synonym of [server.attach(port\[, options\])](_docs_v4_server-api.md#serverattachport-options).

#### server.of(nsp)[​](_docs_v4_server-api.md#serverofnsp)

*   `nsp` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<RegExp>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) | [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** [`<Namespace>`](_docs_v4_server-api.md#namespace)

Initializes and retrieves the given `Namespace` by its pathname identifier `nsp`. If the namespace was already initialized it returns it immediately.
```
const adminNamespace = io.of("/admin");  
```
A regex or a function can also be provided, in order to create namespace in a dynamic way:
```
const dynamicNsp = io.of(/^\/dynamic-\d+$/).on("connection", (socket) => {  
  const newNamespace = socket.nsp; // newNamespace.name === "/dynamic-101"  
  // broadcast to all clients in the given sub-namespace  newNamespace.emit("hello");});  
  
// client-side  
const socket = io("/dynamic-101");  
  
// broadcast to all clients in each sub-namespace  
dynamicNsp.emit("hello");  
  
// use a middleware for each sub-namespace  
dynamicNsp.use((socket, next) => { /* ... */ });  
```
With a function:
```
io.of((name, query, next) => {  
  // the checkToken method must return a boolean, indicating whether the client is able to connect or not.  next(null, checkToken(query.token));}).on("connection", (socket) => { /* ... */ });  
```
#### server.on(eventName, listener)[​](_docs_v4_server-api.md#serveroneventname-listener)

_Inherited from the [EventEmitter class](https://nodejs.org/api/events.html#class-eventemitter)._

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `listener` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** [`<Server>`](_docs_v4_server-api.md#server)

Adds the `listener` function to the end of the listeners array for the event named `eventName`.

Available events:

* [`connection`](_docs_v4_server-api.md#event-connection)
* [`new_namespace`](_docs_v4_server-api.md#event-new_namespace)
*   any custom event from the [`serverSideEmit`](_docs_v4_server-api.md#namespaceserversideemiteventname-args) method
```
io.on("connection", (socket) => {  
  // ...});  
```
#### server.onconnection(socket)[​](_docs_v4_server-api.md#serveronconnectionsocket)

*   `socket` `<engine.Socket>`
*   **Returns** [`<Server>`](_docs_v4_server-api.md#server)

Advanced use only. Creates a new `socket.io` client from the incoming engine.io (or compatible API) `Socket`.
```
import { Server } from "socket.io";  
import { Server as Engine } from "engine.io";  
  
const engine = new Engine();  
const io = new Server();  
  
engine.on("connection", (socket) => {  
  io.onconnection(socket);});  
  
engine.listen(3000);  
```
#### server.path(\[value\])[​](_docs_v4_server-api.md#serverpathvalue)

*   `value` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   **Returns** [`<Server>`](_docs_v4_server-api.md#server) | [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)

Sets the path `value` under which `engine.io` and the static files will be served. Defaults to `/socket.io/`. If no arguments are supplied this method returns the current value.
```
import { Server } from "socket.io";  
  
const io = new Server();  
  
io.path("/myownpath/");  
```
danger

The `path` value must match the one on the client side:
```
import { io } from "socket.io-client";  
  
const socket = io({  
  path: "/myownpath/"});  
```
#### server.serveClient(\[value\])[​](_docs_v4_server-api.md#serverserveclientvalue)

*   `value` [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)
*   **Returns** [`<Server>`](_docs_v4_server-api.md#server) | [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

If `value` is `true` the attached server will serve the client files. Defaults to `true`. This method has no effect after `listen` is called. If no arguments are supplied this method returns the current value.
```
import { Server } from "socket.io";  
  
const io = new Server();  
  
io.serveClient(false);  
  
io.listen(3000);  
```
#### server.serverSideEmit(eventName\[, ...args\]\[, ack\])[​](_docs_v4_server-api.md#serverserversideemiteventname-args)

_Added in v4.1.0_

Alias for: [`io.of("/").serverSideEmit(/* ... */);`](_docs_v4_server-api.md#namespaceserversideemiteventname-args)

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   `args` `<any[]>`
*   `ack` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** `true`

Sends a message to the other Socket.IO servers of the [cluster](_docs_v4_using-multiple-nodes_.md).

Syntax:
```
io.serverSideEmit("hello", "world");  
```
And on the receiving side:
```
io.on("hello", (arg1) => {  
  console.log(arg1); // prints "world"});  
```
Acknowledgements are supported too:
```
// server A  
io.serverSideEmit("ping", (err, responses) => {  
  console.log(responses[0]); // prints "pong"});  
  
// server B  
io.on("ping", (cb) => {  
  cb("pong");});  
```
Notes:

*   the `connection`, `connect` and `new_namespace` strings are reserved and cannot be used in your application.
    
*   you can send any number of arguments, but binary structures are currently not supported (the array of arguments will be `JSON.stringify`\-ed)
    

Example:
```
io.serverSideEmit("hello", "world", 1, "2", { 3: "4" });  
```
*   the acknowledgement callback might be called with an error, if the other Socket.IO servers do not respond after a given delay
```
io.serverSideEmit("ping", (err, responses) => {  
  if (err) {    // at least one Socket.IO server has not responded    // the 'responses' array contains all the responses already received though  } else {    // success! the 'responses' array contains one object per other Socket.IO server in the cluster  }});  
```
#### server.serverSideEmitWithAck(eventName\[, ...args\])[​](_docs_v4_server-api.md#serverserversideemitwithackeventname-args)

_Added in v4.6.0_

Alias for: [`io.of("/").serverSideEmitWithAck(/* ... */);`](_docs_v4_server-api.md#namespaceserversideemitwithackeventname-args)

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   `args` `<any[]>`
*   `ack` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** [`Promise<any[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Promised-based version of broadcasting and expecting an acknowledgement from the other Socket.IO servers of the [cluster](_docs_v4_using-multiple-nodes_.md).
```
try {  
  const responses = await io.serverSideEmitWithAck("some-event");  console.log(responses); // one response per server (except itself)} catch (e) {  
  // some servers did not acknowledge the event in the given delay}  
```
The example above is equivalent to:
```
io.serverSideEmit("some-event", (err, responses) => {  
  if (err) {    // some servers did not acknowledge the event in the given delay  } else {    console.log(responses); // one response per server (except itself)  }});  
```
And on the receiving side:
```
io.on("some-event", (callback) => {  
  callback("got it"); // only one argument is expected});  
```
#### server.socketsJoin(rooms)[​](_docs_v4_server-api.md#serversocketsjoinrooms)

_Added in v4.0.0_

Alias for [`io.of("/").socketsJoin(rooms)`](_docs_v4_server-api.md#namespacesocketsjoinrooms).
```
// make all Socket instances join the "room1" room  
io.socketsJoin("room1");  
  
// make all Socket instances in the "room1" room join the "room2" and "room3" rooms  
io.in("room1").socketsJoin(["room2", "room3"]);  
  
// this also works with a single socket ID  
io.in(theSocketId).socketsJoin("room1");  
```
tip

This method also works within a cluster of multiple Socket.IO servers, with a compatible adapter like the [Postgres adapter](_docs_v4_postgres-adapter_.md).

In that case, if you only want to affect the socket instances on the given node, you need to use the `local` flag:
```
// make all Socket instances that are currently connected on the given node join the "room1" room  
io.local.socketsJoin("room1");  
```
See [here](_docs_v4_server-instance_.md#utility-methods).

#### server.socketsLeave(rooms)[​](_docs_v4_server-api.md#serversocketsleaverooms)

_Added in v4.0.0_

Alias for [`io.of("/").socketsLeave(rooms)`](_docs_v4_server-api.md#namespacesocketsleaverooms).
```
// make all Socket instances leave the "room1" room  
io.socketsLeave("room1");  
  
// make all Socket instances in the "room1" room leave the "room2" and "room3" rooms  
io.in("room1").socketsLeave(["room2", "room3"]);  
  
// this also works with a single socket ID  
io.in(theSocketId).socketsLeave("room1");  
```
tip

This method also works within a cluster of multiple Socket.IO servers, with a compatible adapter like the [Postgres adapter](_docs_v4_postgres-adapter_.md).

In that case, if you only want to affect the socket instances on the given node, you need to use the `local` flag:
```
// make all Socket instances that are currently connected on the given node leave the "room1" room  
io.local.socketsLeave("room1");  
```
See [here](_docs_v4_server-instance_.md#utility-methods).

#### server.timeout(value)[​](_docs_v4_server-api.md#servertimeoutvalue)

_Added in v4.5.0_

*   `value` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
*   **Returns** `BroadcastOperator`

Sets a modifier for a subsequent event emission that the callback will be called with an error when the given number of milliseconds have elapsed without an acknowledgement from all targeted clients:
```
io.timeout(10000).emit("some-event", (err, responses) => {  
  if (err) {    // some clients did not acknowledge the event in the given delay  } else {    console.log(responses); // one response per client  }});  
```
#### server.to(room)[​](_docs_v4_server-api.md#servertoroom)

History

Version

Changes

v4.0.0

Allow to pass an array of rooms.

v1.0.0

Initial implementation.

*   `room` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<string[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   **Returns** `BroadcastOperator` for chaining

Sets a modifier for a subsequent event emission that the event will only be _broadcast_ to clients that have joined the given `room`.

To emit to multiple rooms, you can call `to` several times.
```
// the “foo” event will be broadcast to all connected clients in the “room-101” room  
io.to("room-101").emit("foo", "bar");  
  
// with an array of rooms (a client will be notified at most once)  
io.to(["room-101", "room-102"]).emit("foo", "bar");  
  
// with multiple chained calls  
io.to("room-101").to("room-102").emit("foo", "bar");  
```
#### server.use(fn)[​](_docs_v4_server-api.md#serverusefn)

_Added in v1.0.0_

Alias for [`io.of("/").use(fn)`](_docs_v4_server-api.md#namespaceusefn).

*   `fn` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Registers a middleware for the main namespace, which is a function that gets executed for every incoming `Socket`, and receives as parameters the socket and a function to optionally defer execution to the next registered middleware.

Errors passed to middleware callbacks are sent as special `connect_error` packets to clients.

_Server_
```
io.use((socket, next) => {  
  const err = new Error("not authorized");  err.data = { content: "Please retry later" }; // additional details  next(err);});  
```
_Client_
```
socket.on("connect_error", err => {  
  console.log(err instanceof Error); // true  console.log(err.message); // not authorized  console.log(err.data); // { content: "Please retry later" }});  
```
More information can be found [here](_docs_v4_middlewares_.md).

info

If you are looking for Express middlewares, please check [this section](_docs_v4_server-api.md#engineusemiddleware).

![Namespace in the class diagram for the server](https://socket.io/images/server-class-diagram-namespace.png)![Namespace in the class diagram for the server](https://socket.io/images/server-class-diagram-namespace-dark.png)

Represents a pool of sockets connected under a given scope identified by a pathname (eg: `/chat`).

More information can be found [here](_docs_v4_namespaces_.md).

### Attributes[​](_docs_v4_server-api.md#attributes-1)

#### namespace.adapter[​](_docs_v4_server-api.md#namespaceadapter)

* [`<Adapter>`](_docs_v4_adapter_.md)

The ["Adapter"](_docs_v4_glossary_.md#adapter) used for the namespace.

**Note:** the adapter of the main namespace can be accessed with `io.of("/").adapter`.

More information about it [here](_docs_v4_adapter_.md).
```
const adapter = io.of("/my-namespace").adapter;  
```
#### namespace.name[​](_docs_v4_server-api.md#namespacename)

* [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)

The namespace identifier property.

#### namespace.sockets[​](_docs_v4_server-api.md#namespacesockets)

* [`Map<SocketId, Socket>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

A map of [Socket](_docs_v4_server-api.md#socket) instances that are connected to this namespace.
```
// number of sockets in this namespace (on this node)  
const socketCount = io.of("/admin").sockets.size;  
```
### Events[​](_docs_v4_server-api.md#events-1)

#### Event: 'connect'[​](_docs_v4_server-api.md#event-connect-1)

Synonym of [Event: "connection"](_docs_v4_server-api.md#event-connection-1).

#### Event: 'connection'[​](_docs_v4_server-api.md#event-connection-1)

*   `socket` [`<Socket>`](_docs_v4_server-api.md#socket)

Fired upon a connection from client.
```
// main namespace  
io.on("connection", (socket) => {  
  // ...});  
  
// custom namespace  
io.of("/admin").on("connection", (socket) => {  
  // ...});  
```
### Methods[​](_docs_v4_server-api.md#methods-1)

#### namespace.allSockets()[​](_docs_v4_server-api.md#namespaceallsockets)

*   **Returns** `Promise<Set<SocketId>>`

Gets a list of socket IDs connected to this namespace (across all nodes if applicable).
```
// all sockets in the main namespace  
const ids = await io.allSockets();  
  
// all sockets in the main namespace and in the "user:1234" room  
const ids = await io.in("user:1234").allSockets();  
  
// all sockets in the "chat" namespace  
const ids = await io.of("/chat").allSockets();  
  
// all sockets in the "chat" namespace and in the "general" room  
const ids = await io.of("/chat").in("general").allSockets();  
```
#### namespace.disconnectSockets(\[close\])[​](_docs_v4_server-api.md#namespacedisconnectsocketsclose)

_Added in v4.0.0_

*   `close` [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type) whether to close the underlying connection
*   **Returns** `void`

Makes the matching Socket instances disconnect.
```
// make all Socket instances disconnect  
io.disconnectSockets();  
  
// make all Socket instances in the "room1" room disconnect (and discard the low-level connection)  
io.in("room1").disconnectSockets(true);  
  
// make all Socket instances in the "room1" room of the "admin" namespace disconnect  
io.of("/admin").in("room1").disconnectSockets();  
  
// this also works with a single socket ID  
io.of("/admin").in(theSocketId).disconnectSockets();  
```
#### namespace.emit(eventName\[, ...args\])[​](_docs_v4_server-api.md#namespaceemiteventname-args)

History

Version

Changes

v4.5.0

`io.emit()` now supports acknowledgements.

v1.0.0

Initial implementation.

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `args` `any[]`
*   **Returns** `true`

Emits an event to all connected clients in the given namespace.
```
io.of("/chat").emit("hello");  
```
Any number of parameters can be included, and all serializable data structures are supported:
```
io.of("/chat").emit("hello", 1, "2", { "3": 4 }, Buffer.from([5]));  
```
And on the receiving side:
```
socket.on("hello", (arg1, arg2, arg3, arg4) => {  
  console.log(arg1); // 1  console.log(arg2); // "2"  console.log(arg3); // { "3": 4 }  console.log(arg4); // ArrayBuffer or Buffer, depending on the platform});  
```
info

The arguments will automatically be serialized, so calling `JSON.stringify()` is not needed.

You can use [`to()`](_docs_v4_server-api.md#namespacetoroom) and [`except()`](_docs_v4_server-api.md#namespaceexceptrooms) to send the packet to specific clients:
```
// the “hello” event will be broadcast to all connected clients that are either  
// in the "room1" room or in the "room2" room, excluding those in the "room3" room  
io.of("/chat").to("room1").to("room2").except("room3").emit("hello");  
```
Starting with version `4.5.0`, it is now possible to use acknowledgements when broadcasting:
```
io.of("/chat").timeout(10000).emit("some-event", (err, responses) => {  
  if (err) {    // some clients did not acknowledge the event in the given delay  } else {    console.log(responses); // one response per client  }});  
```
caution

Calling [`timeout()`](_docs_v4_server-api.md#namespacetimeoutvalue) is mandatory in that case.

#### namespace.emitWithAck(eventName\[, ...args\])[​](_docs_v4_server-api.md#namespaceemitwithackeventname-args)

_Added in v4.6.0_

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `args` `any[]`
*   **Returns** [`Promise<any[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Promised-based version of broadcasting and expecting an acknowledgement from all targeted clients in the given namespace:
```
try {  
  const responses = await io.of("/chat").timeout(10000).emitWithAck("some-event");  console.log(responses); // one response per client} catch (e) {  
  // some clients did not acknowledge the event in the given delay}  
```
The example above is equivalent to:
```
io.of("/chat").timeout(10000).emit("some-event", (err, responses) => {  
  if (err) {    // some clients did not acknowledge the event in the given delay  } else {    console.log(responses); // one response per client  }});  
```
And on the receiving side:
```
socket.on("some-event", (callback) => {  
  callback("got it"); // only one argument is expected});  
```
#### namespace.except(rooms)[​](_docs_v4_server-api.md#namespaceexceptrooms)

_Added in v4.0.0_

*   `rooms` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<string[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   **Returns** `BroadcastOperator`

Sets a modifier for a subsequent event emission that the event will only be _broadcast_ to clients that have not joined the given `rooms`.
```
const myNamespace = io.of("/my-namespace");  
  
// the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room  
myNamespace.except("room-101").emit("foo", "bar");  
  
// with an array of rooms  
myNamespace.except(["room-101", "room-102"]).emit("foo", "bar");  
  
// with multiple chained calls  
myNamespace.except("room-101").except("room-102").emit("foo", "bar");  
```
#### namespace.fetchSockets()[​](_docs_v4_server-api.md#namespacefetchsockets)

_Added in v4.0.0_

*   **Returns** [`Socket[]`](_docs_v4_server-api.md#socket) | `RemoteSocket[]`

Returns the matching Socket instances:
```
// return all Socket instances in the main namespace  
const sockets = await io.fetchSockets();  
  
// return all Socket instances in the "room1" room of the main namespace  
const sockets = await io.in("room1").fetchSockets();  
  
// return all Socket instances in the "room1" room of the "admin" namespace  
const sockets = await io.of("/admin").in("room1").fetchSockets();  
  
// this also works with a single socket ID  
const sockets = await io.in(theSocketId).fetchSockets();  
```
The `sockets` variable in the example above is an array of objects exposing a subset of the usual Socket class:
```
for (const socket of sockets) {  
  console.log(socket.id);  console.log(socket.handshake);  console.log(socket.rooms);  console.log(socket.data);  socket.emit(/* ... */);  socket.join(/* ... */);  socket.leave(/* ... */);  socket.disconnect(/* ... */);}  
```
The `data` attribute is an arbitrary object that can be used to share information between Socket.IO servers:
```
// server A  
io.on("connection", (socket) => {  
  socket.data.username = "alice";});  
  
// server B  
const sockets = await io.fetchSockets();  
console.log(sockets[0].data.username); // "alice"  
```
**Important note**: this method (and `socketsJoin`, `socketsLeave` and `disconnectSockets` too) is compatible with the Redis adapter (starting with `socket.io-redis@6.1.0`), which means that they will work across Socket.IO servers.

#### namespace.in(room)[​](_docs_v4_server-api.md#namespaceinroom)

_Added in v1.0.0_

Synonym of [namespace.to(room)](_docs_v4_server-api.md#namespacetoroom), but might feel clearer in some cases:
```
const myNamespace = io.of("/my-namespace");  
  
// disconnect all clients in the "room-101" room  
myNamespace.in("room-101").disconnectSockets();  
```
#### namespace.serverSideEmit(eventName\[, ...args\]\[, ack\])[​](_docs_v4_server-api.md#namespaceserversideemiteventname-args)

_Added in v4.1.0_

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   `args` `<any[]>`
*   `ack` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** `true`

Sends a message to the other Socket.IO servers of the [cluster](_docs_v4_using-multiple-nodes_.md).

Syntax:
```
io.of("/chat").serverSideEmit("hello", "world");  
```
And on the receiving side:
```
io.of("/chat").on("hello", (arg1) => {  
  console.log(arg1); // prints "world"});  
```
Acknowledgements are supported too:
```
// server A  
io.of("/chat").serverSideEmit("ping", (err, responses) => {  
  console.log(responses[0]); // prints "pong"});  
  
// server B  
io.of("/chat").on("ping", (cb) => {  
  cb("pong");});  
```
Notes:

*   the `connection`, `connect` and `new_namespace` strings are reserved and cannot be used in your application.
    
*   you can send any number of arguments, but binary structures are currently not supported (the array of arguments will be `JSON.stringify`\-ed)
    

Example:
```
io.of("/chat").serverSideEmit("hello", "world", 1, "2", { 3: "4" });  
```
*   the acknowledgement callback might be called with an error, if the other Socket.IO servers do not respond after a given delay
```
io.of("/chat").serverSideEmit("ping", (err, responses) => {  
  if (err) {    // at least one Socket.IO server has not responded    // the 'responses' array contains all the responses already received though  } else {    // success! the 'responses' array contains one object per other Socket.IO server in the cluster  }});  
```
#### namespace.serverSideEmitWithAck(eventName\[, ...args\])[​](_docs_v4_server-api.md#namespaceserversideemitwithackeventname-args)

_Added in v4.6.0_

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   `args` `<any[]>`
*   `ack` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** [`Promise<any[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Promised-based version of broadcasting and expecting an acknowledgement from the other Socket.IO servers of the [cluster](_docs_v4_using-multiple-nodes_.md).
```
try {  
  const responses = await io.of("/chat").serverSideEmitWithAck("some-event");  console.log(responses); // one response per server (except itself)} catch (e) {  
  // some servers did not acknowledge the event in the given delay}  
```
The example above is equivalent to:
```
io.of("/chat").serverSideEmit("some-event", (err, responses) => {  
  if (err) {    // some servers did not acknowledge the event in the given delay  } else {    console.log(responses); // one response per server (except itself)  }});  
```
And on the receiving side:
```
io.of("/chat").on("some-event", (callback) => {  
  callback("got it"); // only one argument is expected});  
```
#### namespace.socketsJoin(rooms)[​](_docs_v4_server-api.md#namespacesocketsjoinrooms)

_Added in v4.0.0_

*   `rooms` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<string[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   **Returns** `void`

Makes the matching Socket instances join the specified rooms:
```
// make all Socket instances join the "room1" room  
io.socketsJoin("room1");  
  
// make all Socket instances in the "room1" room join the "room2" and "room3" rooms  
io.in("room1").socketsJoin(["room2", "room3"]);  
  
// make all Socket instances in the "room1" room of the "admin" namespace join the "room2" room  
io.of("/admin").in("room1").socketsJoin("room2");  
  
// this also works with a single socket ID  
io.in(theSocketId).socketsJoin("room1");  
```
More information can be found [here](_docs_v4_server-instance_.md#utility-methods).

#### namespace.socketsLeave(rooms)[​](_docs_v4_server-api.md#namespacesocketsleaverooms)

_Added in v4.0.0_

*   `rooms` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<string[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   **Returns** `void`

Makes the matching Socket instances leave the specified rooms:
```
// make all Socket instances leave the "room1" room  
io.socketsLeave("room1");  
  
// make all Socket instances in the "room1" room leave the "room2" and "room3" rooms  
io.in("room1").socketsLeave(["room2", "room3"]);  
  
// make all Socket instances in the "room1" room of the "admin" namespace leave the "room2" room  
io.of("/admin").in("room1").socketsLeave("room2");  
  
// this also works with a single socket ID  
io.in(theSocketId).socketsLeave("room1");  
```
#### namespace.timeout(value)[​](_docs_v4_server-api.md#namespacetimeoutvalue)

_Added in v4.5.0_

*   `value` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
*   **Returns** `BroadcastOperator`

Sets a modifier for a subsequent event emission that the callback will be called with an error when the given number of milliseconds have elapsed without an acknowledgement from the client:
```
io.of("/chat").timeout(10000).emit("some-event", (err, responses) => {  
  if (err) {    // some clients did not acknowledge the event in the given delay  } else {    console.log(responses); // one response per client  }});  
```
#### namespace.to(room)[​](_docs_v4_server-api.md#namespacetoroom)

History

Version

Changes

v4.0.0

Allow to pass an array of rooms.

v1.0.0

Initial implementation.

*   `room` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<string[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   **Returns** `BroadcastOperator` for chaining

Sets a modifier for a subsequent event emission that the event will only be _broadcast_ to clients that have joined the given `room`.

To emit to multiple rooms, you can call `to` several times.
```
const myNamespace = io.of("/my-namespace");  
  
// the “foo” event will be broadcast to all connected clients in the “room-101” room  
myNamespace.to("room-101").emit("foo", "bar");  
  
// with an array of rooms (a client will be notified at most once)  
myNamespace.to(["room-101", "room-102"]).emit("foo", "bar");  
  
// with multiple chained calls  
myNamespace.to("room-101").to("room-102").emit("foo", "bar");  
```
#### namespace.use(fn)[​](_docs_v4_server-api.md#namespaceusefn)

_Added in v1.0.0_

*   `fn` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Registers a middleware for the given namespace, which is a function that gets executed for every incoming `Socket`, and receives as parameters the socket and a function to optionally defer execution to the next registered middleware.

Errors passed to middleware callbacks are sent as special `connect_error` packets to clients.

_Server_
```
io.of("/chat").use((socket, next) => {  
  const err = new Error("not authorized");  err.data = { content: "Please retry later" }; // additional details  next(err);});  
```
_Client_
```
socket.on("connect_error", err => {  
  console.log(err instanceof Error); // true  console.log(err.message); // not authorized  console.log(err.data); // { content: "Please retry later" }});  
```
More information can be found [here](_docs_v4_middlewares_.md).

info

If you are looking for Express middlewares, please check [this section](_docs_v4_server-api.md#engineusemiddleware).

### Flags[​](_docs_v4_server-api.md#flags)

#### Flag: 'local'[​](_docs_v4_server-api.md#flag-local)

Sets a modifier for a subsequent event emission that the event data will only be _broadcast_ to the current node (when [scaling to multiple nodes](_docs_v4_using-multiple-nodes_.md)).
```
io.local.emit("an event", { some: "data" });  
```
#### Flag: 'volatile'[​](_docs_v4_server-api.md#flag-volatile)

Sets a modifier for a subsequent event emission that the event data may be lost if the clients are not ready to receive messages (because of network slowness or other issues, or because they’re connected through long polling and is in the middle of a request-response cycle).
```
io.volatile.emit("an event", { some: "data" }); // the clients may or may not receive it  
```
![Socket in the class diagram for the server](https://socket.io/images/server-class-diagram-socket.png)![Socket in the class diagram for the server](https://socket.io/images/server-class-diagram-socket-dark.png)

A `Socket` is the fundamental class for interacting with browser clients. A `Socket` belongs to a certain `Namespace` (by default `/`) and uses an underlying `Client` to communicate.

It should be noted the `Socket` doesn't relate directly to the actual underlying TCP/IP `socket` and it is only the name of the class.

Within each `Namespace`, you can also define arbitrary channels (called `room`) that the `Socket` can join and leave. That provides a convenient way to broadcast to a group of `Socket`s (see `Socket#to` below).

The `Socket` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). The `Socket` class overrides the `emit` method, and does not modify any other `EventEmitter` method. All methods documented here which also appear as `EventEmitter` methods (apart from `emit`) are implemented by `EventEmitter`, and documentation for `EventEmitter` applies.

More information can be found [here](_docs_v4_server-socket-instance_.md).

### Events[​](_docs_v4_server-api.md#events-2)

#### Event: 'disconnect'[​](_docs_v4_server-api.md#event-disconnect)

*   `reason` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) the reason of the disconnection (either client or server-side)

Fired upon disconnection.
```
io.on("connection", (socket) => {  
  socket.on("disconnect", (reason) => {    // ...  });});  
```
Possible reasons:

Reason

Description

`server namespace disconnect`

The socket was forcefully disconnected with [socket.disconnect()](_docs_v4_server-api_.md#socketdisconnectclose).

`client namespace disconnect`

The client has manually disconnected the socket using [socket.disconnect()](_docs_v4_client-api_.md#socketdisconnect).

`server shutting down`

The server is, well, shutting down.

`ping timeout`

The client did not send a PONG packet in the `pingTimeout` delay.

`transport close`

The connection was closed (example: the user has lost connection, or the network was changed from WiFi to 4G).

`transport error`

The connection has encountered an error.

`parse error`

The server has received an invalid packet from the client.

`forced close`

The server has received an invalid packet from the client.

`forced server close`

The client did not join a namespace in time (see the [`connectTimeout`](_docs_v4_server-options_.md#connecttimeout) option) and was forcefully closed.

#### Event: 'disconnecting'[​](_docs_v4_server-api.md#event-disconnecting)

_Added in v1.5.0_

*   `reason` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) the reason of the disconnection (either client or server-side)

Fired when the client is going to be disconnected (but hasn't left its `rooms` yet).
```
io.on("connection", (socket) => {  
  socket.on("disconnecting", (reason) => {    console.log(socket.rooms); // Set { ... }  });});  
```
With an asynchronous handler, you will need to create a copy of the `rooms` attribute:
```
io.on("connection", (socket) => {  
  socket.on("disconnecting", async (reason) => {    const rooms = new Set(socket.rooms);  
    await someLongRunningOperation();  
    // socket.rooms will be empty there    console.log(rooms);  });});  
```
caution

Those events, along with `connect`, `connect_error`, `newListener` and `removeListener`, are special events that shouldn't be used in your application:
```
// BAD, will throw an error  
socket.emit("disconnect");  
```
### Attributes[​](_docs_v4_server-api.md#attributes-2)

#### socket.client[​](_docs_v4_server-api.md#socketclient)

* [`<Client>`](_docs_v4_server-api.md#client)

A reference to the underlying `Client` object.

#### socket.conn[​](_docs_v4_server-api.md#socketconn)

*   `<engine.Socket>`

A reference to the underlying `Client` transport connection (engine.io `Socket` object). This allows access to the IO transport layer, which still (mostly) abstracts the actual TCP/IP socket.
```
io.on("connection", (socket) => {  
  console.log("initial transport", socket.conn.transport.name); // prints "polling"  
  socket.conn.once("upgrade", () => {    // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)    console.log("upgraded transport", socket.conn.transport.name); // prints "websocket"  });  
  socket.conn.on("packet", ({ type, data }) => {    // called for each packet received  });  
  socket.conn.on("packetCreate", ({ type, data }) => {    // called for each packet sent  });  
  socket.conn.on("drain", () => {    // called when the write buffer is drained  });  
  socket.conn.on("heartbeat", () => {    // called after each round trip of the heartbeat mechanism    console.log("heartbeat");  });  
  socket.conn.on("close", (reason) => {    // called when the underlying connection is closed  });});  
```
#### socket.data[​](_docs_v4_server-api.md#socketdata)

_Added in v4.0.0_

An arbitrary object that can be used in conjunction with the [`fetchSockets()`](_docs_v4_server-api.md#namespacefetchsockets) utility method:
```
io.on("connection", (socket) => {  
  socket.data.username = "alice";});  
  
const sockets = await io.fetchSockets();  
console.log(sockets[0].data.username); // "alice"  
```
tip

This also works within a Socket.IO cluster, with a compatible adapter like the [Postgres adapter](_docs_v4_postgres-adapter_.md).

#### socket.handshake[​](_docs_v4_server-api.md#sockethandshake)

* [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

The handshake details:

Field

Type

Description

headers

`IncomingHttpHeaders`

The headers sent as part of the handshake.

time

[`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)

The date of creation (as string).

address

[`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)

The ip address of the client.

xdomain

[`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

Whether the connection is cross-domain.

secure

[`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

Whether the connection is made over SSL.

issued

[`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)

The date of creation (as unix timestamp).

url

[`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)

The request URL string.

query

`Record<string, string or string[]>`

The query parameters of the first request.

auth

`Record<string, any>`

The authentication payload. See also [here](_docs_v4_middlewares_.md).

Usage:
```
io.use((socket, next) => {  
  let handshake = socket.handshake;  // ...});  
  
io.on("connection", (socket) => {  
  let handshake = socket.handshake;  // ...});  
```
Example:
```
const handshake = {  
  headers: {    "user-agent": "node-XMLHttpRequest",    accept: "*/*",    host: "localhost:3000",    connection: "close"  },  time: "Wed Jan 01 2020 01:00:00 GMT+0100 (Central European Standard Time)",  address: "::ffff:127.0.0.1",  xdomain: false,  secure: false,  issued: 1577836800000,  url: "/socket.io/?EIO=4&transport=polling&t=OPAfXv5&b64=1",  query: {    EIO: "4",    transport: "polling",    t: "OPAfXv5",    b64: "1"  },  auth: {}}  
```
Note: the `headers` attribute refers to the headers of the first HTTP request of the session, and won't be updated by the subsequent HTTP requests.
```
io.on("connection", (socket) => {  
  console.log(socket.handshake.headers === socket.request.headers); // prints "true"});  
```
#### socket.id[​](_docs_v4_server-api.md#socketid)

* [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)

A unique identifier for the session, that comes from the underlying `Client`.

caution

The `id` attribute is an **ephemeral** ID that is not meant to be used in your application (or only for debugging purposes) because:

*   this ID is regenerated after each reconnection (for example when the WebSocket connection is severed, or when the user refreshes the page)
*   two different browser tabs will have two different IDs
*   there is no message queue stored for a given ID on the server (i.e. if the client is disconnected, the messages sent from the server to this ID are lost)

Please use a regular session ID instead (either sent in a cookie, or stored in the localStorage and sent in the [`auth`](_docs_v4_client-options_.md#auth) payload).

#### socket.recovered[​](_docs_v4_server-api.md#socketrecovered)

_Added in v4.6.0_

* [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

Whether the connection state was successfully recovered during the last reconnection.
```
io.on("connection", (socket) => {  
  if (socket.recovered) {    // recovery was successful: socket.id, socket.rooms and socket.data were restored  } else {    // new or unrecoverable session  }});  
```
More information about this feature [here](_docs_v4_connection-state-recovery.md).

#### socket.request[​](_docs_v4_server-api.md#socketrequest)

* [`<http.IncomingMessage>`](https://nodejs.org/api/http.html#class-httpincomingmessage)

A getter proxy that returns the reference to the `request` that originated the underlying engine.io `Client`. Useful for accessing request headers such as `Cookie` or `User-Agent`.
```
import { parse } from "cookie";  
  
io.on("connection", (socket) => {  
  const cookies = parse(socket.request.headers.cookie || "");});  
```
Note: `socket.request` refers to the first HTTP request of the session, and won't be updated by the subsequent HTTP requests.
```
io.on("connection", (socket) => {  
  console.log(socket.request.headers === socket.handshake.headers); // prints "true"});  
```
If you don't need this reference, you can discard it in order to reduce the memory footprint:
```
io.on("connection", (socket) => {  
  delete socket.conn.request;});  
```
#### socket.rooms[​](_docs_v4_server-api.md#socketrooms)

* [`Set<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

A Set of strings identifying the rooms this client is in.
```
io.on("connection", (socket) => {  
  
  console.log(socket.rooms); // Set { <socket.id> }  
  socket.join("room1");  
  console.log(socket.rooms); // Set { <socket.id>, "room1" }  
});  
```
### Methods[​](_docs_v4_server-api.md#methods-2)

#### socket.compress(value)[​](_docs_v4_server-api.md#socketcompressvalue)

*   `value` [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type) whether to following packet will be compressed
*   **Returns** `Socket` for chaining

Sets a modifier for a subsequent event emission that the event data will only be _compressed_ if the value is `true`. Defaults to `true` when you don't call the method.
```
io.on("connection", (socket) => {  
  socket.compress(false).emit("uncompressed", "that's rough");});  
```
#### socket.disconnect(\[close\])[​](_docs_v4_server-api.md#socketdisconnectclose)

*   `close` [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type) whether to close the underlying connection
*   **Returns** [`Socket`](_docs_v4_server-api.md#socket)

Disconnects this socket. If value of close is `true`, closes the underlying connection. Otherwise, it just disconnects the namespace.
```
io.on("connection", (socket) => {  
  setTimeout(() => socket.disconnect(true), 5000);});  
```
#### socket.emit(eventName\[, ...args\]\[, ack\])[​](_docs_v4_server-api.md#socketemiteventname-args)

_(overrides `EventEmitter.emit`)_

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `args` `<any[]>`
*   `ack` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** `true`

Emits an event to the socket identified by the string name. Any other parameters can be included. All serializable data structures are supported, including `Buffer`.
```
io.on("connection", () => {  
  socket.emit("hello", "world");  socket.emit("with-binary", 1, "2", { 3: "4", 5: Buffer.from([6]) });});  
```
The `ack` argument is optional and will be called with the client's answer.

_Server_
```
io.on("connection", (socket) => {  
  socket.emit("hello", "world", (response) => {    console.log(response); // "got it"  });});  
```
_Client_
```
socket.on("hello", (arg, callback) => {  
  console.log(arg); // "world"  callback("got it");});  
```
#### socket.emitWithAck(eventName\[, ...args\])[​](_docs_v4_server-api.md#socketemitwithackeventname-args)

_Added in v4.6.0_

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `args` `any[]`
*   **Returns** [`Promise<any>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Promised-based version of emitting and expecting an acknowledgement from the given client:
```
io.on("connection", async (socket) => {  
  // without timeout  const response = await socket.emitWithAck("hello", "world");  
  // with a specific timeout  try {    const response = await socket.timeout(10000).emitWithAck("hello", "world");  } catch (err) {    // the client did not acknowledge the event in the given delay  }});  
```
The example above is equivalent to:
```
io.on("connection", (socket) => {  
  // without timeout  socket.emit("hello", "world", (val) => {    // ...  });  
  // with a specific timeout  socket.timeout(10000).emit("hello", "world", (err, val) => {    // ...  });});  
```
And on the receiving side:
```
socket.on("hello", (arg1, callback) => {  
  callback("got it"); // only one argument is expected});  
```
#### socket.eventNames()[​](_docs_v4_server-api.md#socketeventnames)

Inherited from `EventEmitter` (along with other methods not mentioned here). See the Node.js documentation for the [events](https://nodejs.org/docs/latest/api/events.html) module.

#### socket.except(rooms)[​](_docs_v4_server-api.md#socketexceptrooms)

_Added in v4.0.0_

*   `rooms` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<string[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   **Returns** `BroadcastOperator`

Sets a modifier for a subsequent event emission that the event will only be _broadcast_ to clients that have not joined the given `rooms` (the socket itself being excluded).
```
// to all clients except the ones in "room1" and the sender  
socket.broadcast.except("room1").emit(/* ... */);  
  
// same as above  
socket.except("room1").emit(/* ... */);  
  
// to all clients in "room4" except the ones in "room5" and the sender  
socket.to("room4").except("room5").emit(/* ... */);  
```
#### socket.in(room)[​](_docs_v4_server-api.md#socketinroom)

_Added in v1.0.0_

Synonym of [socket.to(room)](_docs_v4_server-api.md#sockettoroom).

#### socket.join(room)[​](_docs_v4_server-api.md#socketjoinroom)

*   `room` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<string[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   **Returns** `void` | `Promise`

Adds the socket to the given `room` or to the list of rooms.
```
io.on("connection", (socket) => {  
  socket.join("room 237");    console.log(socket.rooms); // Set { <socket.id>, "room 237" }  
  
  socket.join(["room 237", "room 238"]);  
  io.to("room 237").emit("a new user has joined the room"); // broadcast to everyone in the room});  
```
The mechanics of joining rooms are handled by the `Adapter` that has been configured (see `Server#adapter` above), defaulting to [socket.io-adapter](https://github.com/socketio/socket.io-adapter).

For your convenience, each socket automatically joins a room identified by its id (see `Socket#id`). This makes it easy to broadcast messages to other sockets:
```
io.on("connection", (socket) => {  
  socket.on("say to someone", (id, msg) => {    // send a private message to the socket with the given id    socket.to(id).emit("my message", msg);  });});  
```
#### socket.leave(room)[​](_docs_v4_server-api.md#socketleaveroom)

*   `room` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   **Returns** `void` | `Promise`

Removes the socket from the given `room`.
```
io.on("connection", (socket) => {  
  socket.leave("room 237");  
  io.to("room 237").emit(`user ${socket.id} has left the room`);});  
```
info

Rooms are left automatically upon disconnection.

#### socket.listenersAny()[​](_docs_v4_server-api.md#socketlistenersany)

*   **Returns** [`<Function[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Returns the list of registered catch-all listeners.
```
const listeners = socket.listenersAny();  
```
#### socket.listenersAnyOutgoing()[​](_docs_v4_server-api.md#socketlistenersanyoutgoing)

_Added in v4.5.0_

*   **Returns** [`<Function[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Returns the list of registered catch-all listeners for outgoing packets.
```
const listeners = socket.listenersAnyOutgoing();  
```
#### socket.offAny(\[listener\])[​](_docs_v4_server-api.md#socketoffanylistener)

*   `listener` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Removes the previously registered listener. If no listener is provided, all catch-all listeners are removed.
```
const myListener = () => { /* ... */ };  
  
socket.onAny(myListener);  
  
// then, later  
socket.offAny(myListener);  
  
socket.offAny();  
```
#### socket.offAnyOutgoing(\[listener\])[​](_docs_v4_server-api.md#socketoffanyoutgoinglistener)

_Added in v4.5.0_

*   `listener` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Removes the previously registered listener. If no listener is provided, all catch-all listeners are removed.
```
const myListener = () => { /* ... */ };  
  
socket.onAnyOutgoing(myListener);  
  
// remove a single listener  
socket.offAnyOutgoing(myListener);  
  
// remove all listeners  
socket.offAnyOutgoing();  
```
#### socket.on(eventName, callback)[​](_docs_v4_server-api.md#socketoneventname-callback)

_Inherited from the [EventEmitter class](https://nodejs.org/api/events.html#class-eventemitter)._

*   `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)
*   `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** [`<Socket>`](_docs_v4_server-api.md#socket)

Register a new handler for the given event.
```
socket.on("news", (data) => {  
  console.log(data);});  
// with several arguments  
socket.on("news", (arg1, arg2, arg3) => {  
  // ...});  
// or with acknowledgement  
socket.on("news", (data, callback) => {  
  callback(0);});  
```
#### socket.onAny(callback)[​](_docs_v4_server-api.md#socketonanycallback)

*   `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Register a new catch-all listener.
```
socket.onAny((event, ...args) => {  
  console.log(`got ${event}`);});  
```
caution

[Acknowledgements](_docs_v4_emitting-events_.md#acknowledgements) are not caught in the catch-all listener.
```
socket.emit("foo", (value) => {  
  // ...});  
  
socket.onAnyOutgoing(() => {  
  // triggered when the event is sent});  
  
socket.onAny(() => {  
  // not triggered when the acknowledgement is received});  
```
#### socket.onAnyOutgoing(callback)[​](_docs_v4_server-api.md#socketonanyoutgoingcallback)

_Added in v4.5.0_

*   `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Register a new catch-all listener for outgoing packets.
```
socket.onAnyOutgoing((event, ...args) => {  
  console.log(`got ${event}`);});  
```
caution

[Acknowledgements](_docs_v4_emitting-events_.md#acknowledgements) are not caught in the catch-all listener.
```
socket.on("foo", (value, callback) => {  
  callback("OK");});  
  
socket.onAny(() => {  
  // triggered when the event is received});  
  
socket.onAnyOutgoing(() => {  
  // not triggered when the acknowledgement is sent});  
```
#### socket.once(eventName, listener)[​](_docs_v4_server-api.md#socketonceeventname-listener)

Inherited from `EventEmitter` (along with other methods not mentioned here). See the Node.js documentation for the [events](https://nodejs.org/docs/latest/api/events.html) module.

#### socket.prependAny(callback)[​](_docs_v4_server-api.md#socketprependanycallback)

*   `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Register a new catch-all listener. The listener is added to the beginning of the listeners array.
```
socket.prependAny((event, ...args) => {  
  console.log(`got ${event}`);});  
```
#### socket.prependAnyOutgoing(callback)[​](_docs_v4_server-api.md#socketprependanyoutgoingcallback)

_Added in v4.5.0_

*   `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Register a new catch-all listener for outgoing packets. The listener is added to the beginning of the listeners array.
```
socket.prependAnyOutgoing((event, ...args) => {  
  console.log(`got ${event}`);});  
```
#### socket.removeAllListeners(\[eventName\])[​](_docs_v4_server-api.md#socketremovealllistenerseventname)

Inherited from `EventEmitter` (along with other methods not mentioned here). See the Node.js documentation for the [events](https://nodejs.org/docs/latest/api/events.html) module.

#### socket.removeListener(eventName, listener)[​](_docs_v4_server-api.md#socketremovelistenereventname-listener)

Inherited from `EventEmitter` (along with other methods not mentioned here). See the Node.js documentation for the [events](https://nodejs.org/docs/latest/api/events.html) module.

#### socket.send(\[...args\]\[, ack\])[​](_docs_v4_server-api.md#socketsendargs)

*   `args` `<any[]>`
*   `ack` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   **Returns** [`Socket`](_docs_v4_server-api.md#socket)

Sends a `message` event. See [socket.emit(eventName\[, ...args\]\[, ack\])](_docs_v4_server-api.md#socketemiteventname-args-ack).

#### socket.timeout(value)[​](_docs_v4_server-api.md#sockettimeoutvalue)

_Added in v4.4.0_

*   `value` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)
*   **Returns** [`<Socket>`](_docs_v4_server-api.md#socket)

Sets a modifier for a subsequent event emission that the callback will be called with an error when the given number of milliseconds have elapsed without an acknowledgement from the client:
```
socket.timeout(5000).emit("my-event", (err) => {  
  if (err) {    // the client did not acknowledge the event in the given delay  }});  
```
#### socket.to(room)[​](_docs_v4_server-api.md#sockettoroom)

History

Version

Changes

v4.0.0

Allow to pass an array of rooms.

v1.0.0

Initial implementation.

*   `room` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) | [`<string[]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
*   **Returns** `Socket` for chaining

Sets a modifier for a subsequent event emission that the event will only be _broadcast_ to clients that have joined the given `room` (the socket itself being excluded).

To emit to multiple rooms, you can call `to` several times.
```
io.on("connection", (socket) => {  
  
  // to one room  socket.to("others").emit("an event", { some: "data" });  
  // to multiple rooms  socket.to("room1").to("room2").emit("hello");  
  // or with an array  socket.to(["room1", "room2"]).emit("hello");  
  // a private message to another socket  socket.to(/* another socket id */).emit("hey");  
  // WARNING: `socket.to(socket.id).emit()` will NOT work  // Please use `io.to(socket.id).emit()` instead.});  
```
**Note:** acknowledgements are not supported when broadcasting.

#### socket.use(fn)[​](_docs_v4_server-api.md#socketusefn)

History

Version

Changes

v3.0.5

Restoration of the first implementation.

v3.0.0

Removal in favor of `socket.onAny()`.

v1.7.2

The `error` event is sent directly to the client.

v1.6.0

First implementation.

*   `fn` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Registers a middleware, which is a function that gets executed for every incoming `Packet` and receives as parameter the packet and a function to optionally defer execution to the next registered middleware.

Errors passed to the middleware callback are then emitted as `error` events on the server-side:
```
io.on("connection", (socket) => {  
  socket.use(([event, ...args], next) => {    if (isUnauthorized(event)) {      return next(new Error("unauthorized event"));    }    // do not forget to call next    next();  });  
  socket.on("error", (err) => {    if (err && err.message === "unauthorized event") {      socket.disconnect();    }  });});  
```
### Flags[​](_docs_v4_server-api.md#flags-1)

#### Flag: 'broadcast'[​](_docs_v4_server-api.md#flag-broadcast)

Sets a modifier for a subsequent event emission that the event data will only be _broadcast_ to every sockets but the sender.
```
io.on("connection", (socket) => {  
  socket.broadcast.emit("an event", { some: "data" }); // everyone gets it but the sender});  
```
#### Flag: 'volatile'[​](_docs_v4_server-api.md#flag-volatile-1)

Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to receive messages (because of network slowness or other issues, or because they’re connected through long polling and is in the middle of a request-response cycle).
```
io.on("connection", (socket) => {  
  socket.volatile.emit("an event", { some: "data" }); // the client may or may not receive it});  
```
![Client in the class diagram for the server](https://socket.io/images/server-class-diagram-client.png)![Client in the class diagram for the server](https://socket.io/images/server-class-diagram-client-dark.png)

The `Client` class represents an incoming transport (engine.io) connection. A `Client` can be associated with many multiplexed `Socket`s that belong to different `Namespace`s.

### Attributes[​](_docs_v4_server-api.md#attributes-3)

#### client.conn[​](_docs_v4_server-api.md#clientconn)

*   `<engine.Socket>`

A reference to the underlying `engine.io` `Socket` connection.

#### client.request[​](_docs_v4_server-api.md#clientrequest)

* [`<http.IncomingMessage>`](https://nodejs.org/api/http.html#class-httpincomingmessage)

A getter proxy that returns the reference to the `request` that originated the engine.io connection. Useful for accessing request headers such as `Cookie` or `User-Agent`.

The Engine.IO server, which manages the WebSocket / HTTP long-polling connections. More information [here](_docs_v4_how-it-works_.md).

Its source code can be found here: [https://github.com/socketio/engine.io](https://github.com/socketio/engine.io)

### Events[​](_docs_v4_server-api.md#events-3)

#### Event: 'connection\_error'[​](_docs_v4_server-api.md#event-connection_error)

_Added in v4.1.0_

*   `error` [`<Error>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
```
io.engine.on("connection_error", (err) => {  
  console.log(err.req);      // the request object  console.log(err.code);     // the error code, for example 1  console.log(err.message);  // the error message, for example "Session ID unknown"  console.log(err.context);  // some additional error context});  
```
This event will be emitted when a connection is abnormally closed. Here is the list of possible error codes:

Code

Message

0

"Transport unknown"

1

"Session ID unknown"

2

"Bad handshake method"

3

"Bad request"

4

"Forbidden"

5

"Unsupported protocol version"

_Added in v4.1.0_

*   `headers` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) a hash of headers, indexed by header name
*   `request` [`<http.IncomingMessage>`](https://nodejs.org/docs/latest/api/http.html#http_class_http_incomingmessage) the incoming request

This event will be emitted just before writing the response headers of **each** HTTP request of the session (including the WebSocket upgrade), allowing you to customize them.
```
import { serialize, parse } from "cookie";  
  
io.engine.on("headers", (headers, request) => {  
  if (!request.headers.cookie) return;  const cookies = parse(request.headers.cookie);  if (!cookies.randomId) {    headers["set-cookie"] = serialize("randomId", "abc", { maxAge: 86400 });  }});  
```
_Added in v4.1.0_

*   `headers` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) a hash of headers, indexed by header name
*   `request` [`<http.IncomingMessage>`](https://nodejs.org/docs/latest/api/http.html#http_class_http_incomingmessage) the incoming request

This event will be emitted just before writing the response headers of **the first** HTTP request of the session (the handshake), allowing you to customize them.
```
import { serialize } from "cookie";  
  
io.engine.on("initial_headers", (headers, request) => {  
  headers["set-cookie"] = serialize("uid", "1234", { sameSite: "strict" });});  
```
If you need to perform some asynchronous operations, you will need to use the [`allowRequest`](_docs_v4_server-options_.md#allowrequest) option:
```
import { serialize } from "cookie";  
  
const io = new Server(httpServer, {  
  allowRequest: async (req, callback) => {    const session = await fetchSession(req);    req.session = session;    callback(null, true);  }});  
  
io.engine.on("initial_headers", (headers, req) => {  
  if (req.session) {    headers["set-cookie"] = serialize("sid", req.session.id, { sameSite: "strict" });  }});  
```
### Attributes[​](_docs_v4_server-api.md#attributes-4)

#### engine.clientsCount[​](_docs_v4_server-api.md#engineclientscount)

_Added in v1.0.0_

* [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)

The number of currently connected clients.
```
const count = io.engine.clientsCount;  
// may or may not be similar to the count of Socket instances in the main namespace, depending on your usage  
const count2 = io.of("/").sockets.size;  
```
### Methods[​](_docs_v4_server-api.md#methods-3)

#### engine.generateId[​](_docs_v4_server-api.md#enginegenerateid)

* [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

The function used to generate a new session ID. Defaults to [base64id](https://github.com/faeldt/base64id).
```
const uuid = require("uuid");  
  
io.engine.generateId = () => {  
  return uuid.v4(); // must be unique across all Socket.IO servers}  
```
#### engine.handleUpgrade(request, socket, head)[​](_docs_v4_server-api.md#enginehandleupgraderequest-socket-head)

_Added in v1.0.0_

*   `request` [`<http.IncomingMessage>`](https://nodejs.org/docs/latest/api/http.html#http_class_http_incomingmessage) the incoming request
*   `socket` [`<stream.Duplex>`](https://nodejs.org/docs/latest/api/stream.html#stream_class_stream_duplex) the network socket between the server and client
*   `head` [`<Buffer>`](https://nodejs.org/docs/latest/api/buffer.html#buffer_class_buffer) the first packet of the upgraded stream (may be empty)

This method can be used to inject an HTTP upgrade:

Example with both a Socket.IO server and a plain WebSocket server:
```
import { createServer } from "http";  
import { Server as WsServer } from "ws";  
import { Server } from "socket.io";  
  
const httpServer = createServer();  
const wss = new WsServer({ noServer: true });  
const io = new Server(httpServer);  
  
httpServer.removeAllListeners("upgrade");  
  
httpServer.on("upgrade", (req, socket, head) => {  
  if (req.url === "/") {    wss.handleUpgrade(req, socket, head, (ws) => {      wss.emit("connection", ws, req);    });  } else if (req.url.startsWith("/socket.io/")) {    io.engine.handleUpgrade(req, socket, head);  } else {    socket.destroy();  }});  
  
httpServer.listen(3000);  
```
#### engine.use(middleware)[​](_docs_v4_server-api.md#engineusemiddleware)

_Added in v4.6.0_

* [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Adds a new [Express middleware](https://expressjs.com/en/guide/using-middleware.html).
```
io.engine.use((req, res, next) => {  
  // do something  
  next();});  
```
The middlewares will be called for each incoming HTTP requests, including upgrade requests.

Example with [`express-session`](https://www.npmjs.com/package/express-session):
```
import session from "express-session";  
  
io.engine.use(session({  
  secret: "keyboard cat",  resave: false,  saveUninitialized: true,  cookie: { secure: true }}));  
```
Example with [`helmet`](https://www.npmjs.com/package/helmet):
```
import helmet from "helmet";  
  
io.engine.use(helmet());  
```

#### _docs_v4_server-application-structure.md

> Source: https://socket.io/docs/v4/server-application-structure
> Scraped: 4/14/2025, 11:55:40 PM

You will find below two suggestions on how to register your event handlers.

Please note that these are merely suggestions and not strict guidelines that you must follow. Please adapt it to your own liking!

### Each file registers its own event handlers[​](_docs_v4_server-application-structure.md#each-file-registers-its-own-event-handlers)

Here, the entrypoint is kept tidy, but the event listeners may be less discoverable (though strong naming convention/ctrl+f will help).

`index.js`
```
const httpServer = require("http").createServer();  
const io = require("socket.io")(httpServer);  
  
const registerOrderHandlers = require("./orderHandler");  
const registerUserHandlers = require("./userHandler");  
  
const onConnection = (socket) => {  
  registerOrderHandlers(io, socket);  registerUserHandlers(io, socket);}  
  
io.on("connection", onConnection);  
```
`orderHandler.js`
```
module.exports = (io, socket) => {  
  const createOrder = (payload) => {    // ...  }  
  const readOrder = (orderId, callback) => {    // ...  }  
  socket.on("order:create", createOrder);  socket.on("order:read", readOrder);}  
```
### All event handlers are registered in the `index.js` file[​](_docs_v4_server-application-structure.md#all-event-handlers-are-registered-in-the-indexjs-file)

Here, each event name is located in the same place, which is great for discoverability, but could get out of hand in a medium/big application.

`index.js`
```
const httpServer = require("http").createServer();  
const io = require("socket.io")(httpServer);  
  
const { createOrder, readOrder } = require("./orderHandler")(io);  
const { updatePassword } = require("./userHandler")(io);  
  
const onConnection = (socket) => {  
  socket.on("order:create", createOrder);  socket.on("order:read", readOrder);  
  socket.on("user:update-password", updatePassword);}  
  
io.on("connection", onConnection);  
```
`orderHandler.js`
```
module.exports = (io) => {  
  const createOrder = function (payload) {    const socket = this; // hence the 'function' above, as an arrow function will not work    // ...  };  
  const readOrder = function (orderId, callback) {    // ...  };  
  return {    createOrder,    readOrder  }}  
```

#### _docs_v4_server-initialization.md

> Source: https://socket.io/docs/v4/server-initialization
> Scraped: 4/14/2025, 11:55:39 PM

Once you have [installed](_docs_v4_server-installation_.md) the Socket.IO server library, you can now init the server. The complete list of options can be found [here](_docs_v4_server-options_.md).

tip

For TypeScript users, it is possible to provide type hints for the events. Please check [this](_docs_v4_typescript_.md).

### Standalone[​](_docs_v4_server-initialization.md#standalone)

*   CommonJS
*   ES modules
*   TypeScript
```
const { Server } = require("socket.io");  
  
const io = new Server({ /* options */ });  
  
io.on("connection", (socket) => {  
  // ...});  
  
io.listen(3000);  
```
You can also pass the port as the first argument:

*   CommonJS
*   ES modules
*   TypeScript
```
const { Server } = require("socket.io");  
  
const io = new Server(3000, { /* options */ });  
  
io.on("connection", (socket) => {  
  // ...});  
```
This implicitly starts a Node.js [HTTP server](https://nodejs.org/docs/latest/api/http.html#http_class_http_server), which can be accessed through `io.httpServer`.

### With an HTTP server[​](_docs_v4_server-initialization.md#with-an-http-server)

*   CommonJS
*   ES modules
*   TypeScript
```
const { createServer } = require("http");  
const { Server } = require("socket.io");  
  
const httpServer = createServer();  
const io = new Server(httpServer, { /* options */ });  
  
io.on("connection", (socket) => {  
  // ...});  
  
httpServer.listen(3000);  
```
### With an HTTPS server[​](_docs_v4_server-initialization.md#with-an-https-server)

*   CommonJS
*   ES modules
*   TypeScript
```
const { readFileSync } = require("fs");  
const { createServer } = require("https");  
const { Server } = require("socket.io");  
  
const httpsServer = createServer({  
  key: readFileSync("/path/to/my/key.pem"),  cert: readFileSync("/path/to/my/cert.pem")});  
  
const io = new Server(httpsServer, { /* options */ });  
  
io.on("connection", (socket) => {  
  // ...});  
  
httpsServer.listen(3000);  
```
### With an HTTP/2 server[​](_docs_v4_server-initialization.md#with-an-http2-server)

*   CommonJS
*   ES modules
*   TypeScript
```
const { readFileSync } = require("fs");  
const { createSecureServer } = require("http2");  
const { Server } = require("socket.io");  
  
const httpServer = createSecureServer({  
  allowHTTP1: true,  key: readFileSync("/path/to/my/key.pem"),  cert: readFileSync("/path/to/my/cert.pem")});  
  
const io = new Server(httpServer, { /* options */ });  
  
io.on("connection", (socket) => {  
  // ...});  
  
httpServer.listen(3000);  
```
### With Express[​](_docs_v4_server-initialization.md#with-express)

*   CommonJS
*   ES modules
*   TypeScript
```
const express = require("express");  
const { createServer } = require("http");  
const { Server } = require("socket.io");  
  
const app = express();  
const httpServer = createServer(app);  
const io = new Server(httpServer, { /* options */ });  
  
io.on("connection", (socket) => {  
  // ...});  
  
httpServer.listen(3000);  
```
caution

Using `app.listen(3000)` will not work here, as it creates a new HTTP server.

More information [here](http://expressjs.com/).

### With Koa[​](_docs_v4_server-initialization.md#with-koa)

*   CommonJS
*   ES modules
*   TypeScript
```
const Koa = require("koa");  
const { createServer } = require("http");  
const { Server } = require("socket.io");  
  
const app = new Koa();  
const httpServer = createServer(app.callback());  
const io = new Server(httpServer, { /* options */ });  
  
io.on("connection", (socket) => {  
  // ...});  
  
httpServer.listen(3000);  
```
More information [here](https://koajs.com/).

### With Nest[​](_docs_v4_server-initialization.md#with-nest)

See the documentation [here](https://docs.nestjs.com/websockets/gateways).

caution

NestJS v7 and below relies on Socket.IO v2, while NestJS v8 relies on Socket.IO v4. Please use a [compatible client](_docs_v4_client-installation_.md#version-compatibility).

### With Fastify[​](_docs_v4_server-initialization.md#with-fastify)

You need to register the [`fastify-socket.io`](https://github.com/alemagio/fastify-socket.io) plugin:

*   CommonJS
*   ES modules
*   TypeScript
```
const fastify = require("fastify");  
const fastifyIO = require("fastify-socket.io");  
  
const server = fastify();  
server.register(fastifyIO);  
  
server.get("/", (req, reply) => {  
  server.io.emit("hello");});  
  
server.ready().then(() => {  
  // we need to wait for the server to be ready, else `server.io` is undefined  server.io.on("connection", (socket) => {    // ...  });});  
  
server.listen({ port: 3000 });  
```
### With µWebSockets.js[​](_docs_v4_server-initialization.md#with-uwebsocketsjs)
```
import { App } from "uWebSockets.js";  
import { Server } from "socket.io";  
  
const app = App();  
const io = new Server();  
  
io.attachApp(app);  
  
io.on("connection", (socket) => {  
  // ...});  
  
app.listen(3000, (token) => {  
  if (!token) {    console.warn("port already in use");  }});  
```
Reference: [https://github.com/uNetworking/uWebSockets.js](https://github.com/uNetworking/uWebSockets.js)

### With Hono (Node.js)[​](_docs_v4_server-initialization.md#with-hono-nodejs)

*   CommonJS
*   ES modules
*   TypeScript
```
const { Hono } = require("hono");  
const { serve } = require("@hono/node-server");  
const { Server } = require("socket.io");  
  
const app = new Hono();  
  
const httpServer = serve({  
    fetch: app.fetch,    port: 3000,});  
  
const io = new Server(httpServer, {  
    /* options */});  
  
io.on("connection", (socket) => {  
    // ...});  
```
More information [here](https://hono.dev/).

The complete list of available options can be found [here](_docs_v4_server-options_.md).

#### _docs_v4_server-installation.md

> Source: https://socket.io/docs/v4/server-installation
> Scraped: 4/14/2025, 11:55:32 PM

info

The latest release is currently `4.8.1`, released in October 2024.

You can find the release notes [here](_docs_v4_changelog_4.8.1.md).

Please make sure that [Node.js](https://nodejs.org/en/) is installed on your system. The current Long Term Support (LTS) release is an ideal starting point, see [here](https://github.com/nodejs/Release#release-schedule).

info

At least Node.js 10 is needed, older versions are not supported anymore.

To install the latest release:

*   NPM
*   Yarn
*   pnpm
*   Bun

To install a specific version:

*   NPM
*   Yarn
*   pnpm
*   Bun
```
npm install socket.io@version  
```
By default, Socket.IO use the WebSocket server provided by the [ws](https://www.npmjs.com/package/ws) package.

There are 2 optional packages that can be installed alongside this package. These packages are binary add-ons which improve certain operations. Prebuilt binaries are available for the most popular platforms so you don't necessarily need to have a C++ compiler installed on your machine.

* [bufferutil](https://www.npmjs.com/package/bufferutil): Allows to efficiently perform operations such as masking and unmasking the data payload of the WebSocket frames.
* [utf-8-validate](https://www.npmjs.com/package/utf-8-validate): Allows to efficiently check if a message contains valid UTF-8 as required by the spec.

To install those packages:

*   NPM
*   Yarn
*   pnpm
*   Bun
```
npm install --save-optional bufferutil utf-8-validate  
```
Please note that these packages are optional, the WebSocket server will fallback to the Javascript implementation if they are not available. More information can be found [here](https://github.com/websockets/ws/#opt-in-for-performance-and-spec-compliance).

Any Websocket server implementation which exposes the same API as ws (notably the [handleUpgrade](https://github.com/websockets/ws/blob/master/doc/ws.md#serverhandleupgraderequest-socket-head-callback) method) can be used.

For example, you can use the [eiows](https://www.npmjs.com/package/eiows) package, which is a fork of the (now deprecated) [uws](https://www.npmjs.com/package/uws) package:

*   NPM
*   Yarn
*   pnpm
*   Bun

And then use the `wsEngine` option:
```
const { Server } = require("socket.io");  
const eiows = require("eiows");  
  
const io = new Server(3000, {  
  wsEngine: eiows.Server});  
```
This implementation "allows, but doesn't guarantee" significant performance and memory-usage improvements over the default implementation. As usual, please benchmark it against your own usage.

Starting with version [4.4.0](_blog_socket-io-4-4-0_.md), a Socket.IO server can now bind to a [`µWebSockets.js`](https://github.com/uNetworking/uWebSockets.js) server.

Installation:

*   NPM
*   Yarn
*   pnpm
*   Bun
```
npm install uWebSockets.js@uNetworking/uWebSockets.js#v20.4.0  
```
Usage:
```
const { App } = require("uWebSockets.js");  
const { Server } = require("socket.io");  
  
const app = App();  
const io = new Server();  
  
io.attachApp(app);  
  
io.on("connection", (socket) => {  
  // ...});  
  
app.listen(3000, (token) => {  
  if (!token) {    console.warn("port already in use");  }});  
```
### Dependency tree[​](_docs_v4_server-installation.md#dependency-tree)

A basic installation of the server includes **21** packages, of which **6** are maintained by our team:
```
└─┬ socket.io@4.8.1  
  ├─┬ accepts@1.3.8  │ ├─┬ mime-types@2.1.35  │ │ └── mime-db@1.52.0  │ └── negotiator@0.6.3  ├── base64id@2.0.0  ├─┬ cors@2.8.5  │ ├── object-assign@4.1.1  │ └── vary@1.1.2  ├─┬ debug@4.3.7  │ └── ms@2.1.3  ├─┬ engine.io@6.6.4  │ ├─┬ @types/cors@2.8.17  │ │ └── @types/node@22.13.9 deduped  │ ├─┬ @types/node@22.13.9  │ │ └── undici-types@6.20.0  │ ├── accepts@1.3.8 deduped  │ ├── base64id@2.0.0 deduped  │ ├── cookie@0.7.2  │ ├── cors@2.8.5 deduped  │ ├── debug@4.3.7 deduped  │ ├── engine.io-parser@5.2.3  │ └─┬ ws@8.17.1  │   ├── UNMET OPTIONAL DEPENDENCY bufferutil@^4.0.1  │   └── UNMET OPTIONAL DEPENDENCY utf-8-validate@>=5.0.2  ├─┬ socket.io-adapter@2.5.5  │ ├── debug@4.3.7 deduped  │ └── ws@8.17.1 deduped  └─┬ socket.io-parser@4.2.4    ├── @socket.io/component-emitter@3.1.2    └── debug@4.3.7 deduped
```
### Transitive versions[​](_docs_v4_server-installation.md#transitive-versions)

The `engine.io` package brings the engine that is responsible for managing the low-level connections (HTTP long-polling or WebSocket). See also: [How it works](_docs_v4_how-it-works_.md)

`socket.io` version

`engine.io` version

`ws` version

`4.8.x`

`6.6.x`

`8.17.x`

`4.7.x`

`6.5.x`

`8.17.x`

`4.6.x`

`6.4.x`

`8.11.x`

`4.5.x`

`6.2.x`

`8.2.x`

`4.4.x`

`6.1.x`

`8.2.x`

`4.3.x`

`6.0.x`

`8.2.x`

`4.2.x`

`5.2.x`

`7.4.x`

`4.1.x`

`5.1.x`

`7.4.x`

`4.0.x`

`5.0.x`

`7.4.x`

`3.1.x`

`4.1.x`

`7.4.x`

`3.0.x`

`4.0.x`

`7.4.x`

`2.5.x`

`3.6.x`

`7.5.x`

`2.4.x`

`3.5.x`

`7.4.x`

#### _docs_v4_server-instance.md

> Source: https://socket.io/docs/v4/server-instance
> Scraped: 4/14/2025, 11:55:36 PM

The Server instance (often called `io` in the code examples) has a few attributes that may be of use in your application.

It also inherits all the methods of the [main namespace](_docs_v4_namespaces_.md#main-namespace), like [`namespace.use()`](_docs_v4_server-api_.md#namespaceusefn) (see [here](_docs_v4_middlewares_.md)) or [`namespace.allSockets()`](_docs_v4_server-api_.md#namespaceallsockets).

A reference to the underlying Engine.IO server.

It can be used to fetch the number of currently connected clients:
```
const count = io.engine.clientsCount;  
// may or may not be similar to the count of Socket instances in the main namespace, depending on your usage  
const count2 = io.of("/").sockets.size;  
```
Or to generate a custom session ID (the `sid` query parameter):
```
const uuid = require("uuid");  
  
io.engine.generateId = (req) => {  
  return uuid.v4(); // must be unique across all Socket.IO servers}  
```
As of `socket.io@4.1.0`, the Engine.IO server emits three special events:

*   `initial_headers`: will be emitted just before writing the response headers of the first HTTP request of the session (the handshake), allowing you to customize them.
```
io.engine.on("initial_headers", (headers, req) => {  
  headers["test"] = "123";  headers["set-cookie"] = "mycookie=456";});  
```
*   `headers`: will be emitted just before writing the response headers of each HTTP request of the session (including the WebSocket upgrade), allowing you to customize them.
```
io.engine.on("headers", (headers, req) => {  
  headers["test"] = "789";});  
```
*   `connection_error`: will be emitted when a connection is abnormally closed
```
io.engine.on("connection_error", (err) => {  
  console.log(err.req);      // the request object  console.log(err.code);     // the error code, for example 1  console.log(err.message);  // the error message, for example "Session ID unknown"  console.log(err.context);  // some additional error context});  
```
Here is the list of possible error codes:

Code

Message

0

"Transport unknown"

1

"Session ID unknown"

2

"Bad handshake method"

3

"Bad request"

4

"Forbidden"

5

"Unsupported protocol version"

Some utility methods were added in Socket.IO v4.0.0 to manage the Socket instances and their rooms:

* [`socketsJoin`](_docs_v4_server-instance.md#socketsjoin): makes the matching socket instances join the specified rooms
* [`socketsLeave`](_docs_v4_server-instance.md#socketsleave): makes the matching socket instances leave the specified rooms
* [`disconnectSockets`](_docs_v4_server-instance.md#disconnectsockets): makes the matching socket instances disconnect
* [`fetchSockets`](_docs_v4_server-instance.md#fetchsockets): returns the matching socket instances

The [`serverSideEmit`](_docs_v4_server-instance.md#serversideemit) method was added in Socket.IO v4.1.0.

Those methods share the same semantics as broadcasting, and the same filters apply:
```
io.of("/admin").in("room1").except("room2").local.disconnectSockets();  
```
Which makes all Socket instances of the "admin" namespace

*   in the "room1" room (`in("room1")` or `to("room1")`)
*   except the ones in "room2" (`except("room2")`)
*   and only on the current Socket.IO server (`local`)

disconnect.

Please note that they are also compatible with the Redis adapter (starting with `socket.io-redis@6.1.0`), which means that they will work across Socket.IO servers.

### `socketsJoin`[​](_docs_v4_server-instance.md#socketsjoin)

This method makes the matching Socket instances join the specified rooms:
```
// make all Socket instances join the "room1" room  
io.socketsJoin("room1");  
  
// make all Socket instances in the "room1" room join the "room2" and "room3" rooms  
io.in("room1").socketsJoin(["room2", "room3"]);  
  
// make all Socket instances in the "room1" room of the "admin" namespace join the "room2" room  
io.of("/admin").in("room1").socketsJoin("room2");  
  
// this also works with a single socket ID  
io.in(theSocketId).socketsJoin("room1");  
```
### `socketsLeave`[​](_docs_v4_server-instance.md#socketsleave)

This method makes the matching Socket instances leave the specified rooms:
```
// make all Socket instances leave the "room1" room  
io.socketsLeave("room1");  
  
// make all Socket instances in the "room1" room leave the "room2" and "room3" rooms  
io.in("room1").socketsLeave(["room2", "room3"]);  
  
// make all Socket instances in the "room1" room of the "admin" namespace leave the "room2" room  
io.of("/admin").in("room1").socketsLeave("room2");  
  
// this also works with a single socket ID  
io.in(theSocketId).socketsLeave("room1");  
```
### `disconnectSockets`[​](_docs_v4_server-instance.md#disconnectsockets)

This method makes the matching Socket instances disconnect:
```
// make all Socket instances disconnect  
io.disconnectSockets();  
  
// make all Socket instances in the "room1" room disconnect (and discard the low-level connection)  
io.in("room1").disconnectSockets(true);  
  
// make all Socket instances in the "room1" room of the "admin" namespace disconnect  
io.of("/admin").in("room1").disconnectSockets();  
  
// this also works with a single socket ID  
io.of("/admin").in(theSocketId).disconnectSockets();  
```
### `fetchSockets`[​](_docs_v4_server-instance.md#fetchsockets)

This method returns the matching Socket instances:
```
// return all Socket instances of the main namespace  
const sockets = await io.fetchSockets();  
  
// return all Socket instances in the "room1" room of the main namespace  
const sockets = await io.in("room1").fetchSockets();  
  
// return all Socket instances in the "room1" room of the "admin" namespace  
const sockets = await io.of("/admin").in("room1").fetchSockets();  
  
// this also works with a single socket ID  
const sockets = await io.in(theSocketId).fetchSockets();  
```
The `sockets` variable in the example above is an array of objects exposing a subset of the usual Socket class:
```
for (const socket of sockets) {  
  console.log(socket.id);  console.log(socket.handshake);  console.log(socket.rooms);  console.log(socket.data);  socket.emit(/* ... */);  socket.join(/* ... */);  socket.leave(/* ... */);  socket.disconnect(/* ... */);}  
```
The `data` attribute is an arbitrary object that can be used to share information between Socket.IO servers:
```
// server A  
io.on("connection", (socket) => {  
  socket.data.username = "alice";});  
  
// server B  
const sockets = await io.fetchSockets();  
console.log(sockets[0].data.username); // "alice"  
```
### `serverSideEmit`[​](_docs_v4_server-instance.md#serversideemit)

This method allows to emit events to the other Socket.IO servers of the cluster, in a [multi-server setup](_docs_v4_using-multiple-nodes_.md).

Syntax:
```
io.serverSideEmit("hello", "world");  
```
And on the receiving side:
```
io.on("hello", (arg1) => {  
  console.log(arg1); // prints "world"});  
```
Acknowledgements are supported too:
```
// server A  
io.serverSideEmit("ping", (err, responses) => {  
  console.log(responses[0]); // prints "pong"});  
  
// server B  
io.on("ping", (cb) => {  
  cb("pong");});  
```
Notes:

*   the `connection`, `connect` and `new_namespace` strings are reserved and cannot be used in your application.
    
*   you can send any number of arguments, but binary structures are currently not supported (the array of arguments will be `JSON.stringify`\-ed)
    

Example:
```
io.serverSideEmit("hello", "world", 1, "2", { 3: "4" });  
```
*   the acknowledgement callback might be called with an error, if the other Socket.IO servers do not respond after a given delay
```
io.serverSideEmit("ping", (err, responses) => {  
  if (err) {    // at least one Socket.IO server has not responded    // the 'responses' array contains all the responses already received though  } else {    // success! the 'responses' array contains one object per other Socket.IO server in the cluster  }});  
```
The Server instance emits one single event (well, technically two, but `connect` is an alias for `connection`):

* [`connection`](_docs_v4_server-instance.md#connection)

### `connection`[​](_docs_v4_server-instance.md#connection)

This event is fired upon a new connection. The first argument is a [Socket instance](_docs_v4_server-socket-instance_.md).
```
io.on("connection", (socket) => {  
  // ...});  
```
The complete API exposed by the Server instance can be found [here](_docs_v4_server-api_.md#server).

#### _docs_v4_server-options.md

> Source: https://socket.io/docs/v4/server-options
> Scraped: 4/14/2025, 11:55:40 PM

The following options affect the behavior of the Socket.IO server.

### `adapter`[​](_docs_v4_server-options.md#adapter)

Default value: `require("socket.io-adapter")` (in-memory adapter, whose source code can be found [here](https://github.com/socketio/socket.io-adapter/))

The ["Adapter"](_docs_v4_glossary_.md#adapter) to use.

Example with the [Redis adapter](_docs_v4_redis-adapter_.md):

*   CommonJS
*   ES modules
*   TypeScript
```
const { Server } = require("socket.io");  
const { createAdapter } = require("@socket.io/redis-adapter");  
const { createClient } = require("redis");  
  
const pubClient = createClient({ host: "localhost", port: 6379 });  
const subClient = pubClient.duplicate();  
  
const io = new Server({  
  adapter: createAdapter(pubClient, subClient)});  
  
io.listen(3000);  
```
### `cleanupEmptyChildNamespaces`[​](_docs_v4_server-options.md#cleanupemptychildnamespaces)

_Added in v4.6.0_

Default value: `false`

Whether to remove [child namespaces](_docs_v4_namespaces_.md#dynamic-namespaces) that have no sockets connected to them.

This option might be useful if you create a lot of dynamic namespaces, since each namespace creates its own adapter instance.

With this option enabled (disabled by default), when a socket disconnects from a dynamic namespace and if there are no other sockets connected to it then the namespace will be cleaned up and its adapter will be closed.

### `connectionStateRecovery`[​](_docs_v4_server-options.md#connectionstaterecovery)

_Added in v4.6.0_

Default value: `undefined`

The option for the [Connection state recovery](_docs_v4_connection-state-recovery.md) feature:
```
const io = new Server(httpServer, {  
  connectionStateRecovery: {    // the backup duration of the sessions and the packets    maxDisconnectionDuration: 2 * 60 * 1000,    // whether to skip middlewares upon successful recovery    skipMiddlewares: true,  }});  
```
If the `skipMiddlewares` option is set to `true`, then the middlewares will be skipped when the connection is successfully recovered:
```
function computeUserIdFromHeaders(headers) {  
  // to be implemented}  
  
// this middleware will be skipped if the connection is successfully recovered  
io.use(async (socket, next) => {  
  socket.data.userId = await computeUserIdFromHeaders(socket.handshake.headers);  
  next();});  
  
io.on("connection", (socket) => {  
  // the userId attribute will either come:  // - from the middleware above (first connection or failed recovery)  // - from the recevery mechanism  console.log("userId", socket.data.userId);});  
```
### `connectTimeout`[​](_docs_v4_server-options.md#connecttimeout)

Default value: `45000`

The number of ms before disconnecting a client that has not successfully joined a namespace.

### `parser`[​](_docs_v4_server-options.md#parser)

Default value: `socket.io-parser`

The parser to use. Please see the documentation [here](_docs_v4_custom-parser_.md).

### `path`[​](_docs_v4_server-options.md#path)

Default value: `/socket.io/`

It is the name of the path that is captured on the server side.

caution

The server and the client values must match (unless you are using a path-rewriting proxy in between).

_Server_
```
import { createServer } from "http";  
import { Server } from "socket.io";  
  
const httpServer = createServer();  
const io = new Server(httpServer, {  
  path: "/my-custom-path/"});  
```
_Client_
```
import { io } from "socket.io-client";  
  
const socket = io("https://example.com", {  
  path: "/my-custom-path/"});  
```
### `serveClient`[​](_docs_v4_server-options.md#serveclient)

Default value: `true`

Whether to serve the client files. If `true`, the different bundles will be served at the following location:

*   `<url>/socket.io/socket.io.js`
*   `<url>/socket.io/socket.io.min.js`
*   `<url>/socket.io/socket.io.msgpack.min.js`

(including their associated source maps)

### `addTrailingSlash`[​](_docs_v4_server-options.md#addtrailingslash)

_Added in v4.6.0_

Default value: `true`

The trailing slash which was added by default can now be disabled:
```
import { createServer } from "node:http";  
import { Server } from "socket.io";  
  
const httpServer = createServer();  
const io = new Server(httpServer, {  
addTrailingSlash: false  
});  
```
In the example above, the clients can omit the trailing slash and use `/socket.io` instead of `/socket.io/`.

### `allowEIO3`[​](_docs_v4_server-options.md#alloweio3)

Default value: `false`

Whether to enable compatibility with Socket.IO v2 clients.

### `allowRequest`[​](_docs_v4_server-options.md#allowrequest)

Default: `-`

A function that receives a given handshake or upgrade request as its first parameter, and can decide whether to continue or not.

Example:
```
const io = new Server(httpServer, {  
  allowRequest: (req, callback) => {    const isOriginValid = check(req);    callback(null, isOriginValid);  }});  
```
This can also be used in conjunction with the [`initial_headers`](_docs_v4_server-api_.md#event-initial_headers) event, to send a cookie to the client:
```
import { serialize } from "cookie";  
  
const io = new Server(httpServer, {  
  allowRequest: async (req, callback) => {    const session = await fetchSession(req);    req.session = session;    callback(null, true);  }});  
  
io.engine.on("initial_headers", (headers, req) => {  
  if (req.session) {    headers["set-cookie"] = serialize("sid", req.session.id, { sameSite: "strict" });  }});  
```
### `allowUpgrades`[​](_docs_v4_server-options.md#allowupgrades)

Default value: `true`

Whether to allow transport upgrades.

### `cookie`[​](_docs_v4_server-options.md#cookie)

Default value: `-`

The list of options that will be forwarded to the [`cookie`](https://github.com/jshttp/cookie/) module. Available options:

*   domain
*   encode
*   expires
*   httpOnly
*   maxAge
*   path
*   sameSite
*   secure

Example:
```
import { Server } from "socket.io";  
  
const io = new Server(httpServer, {  
  cookie: {    name: "my-cookie",    httpOnly: true,    sameSite: "strict",    maxAge: 86400  }});  
```
info

Since Socket.IO v3, there is no cookie sent by default anymore ([reference](_docs_v4_migrating-from-2-x-to-3-0_.md#no-more-cookie-by-default)).

### `cors`[​](_docs_v4_server-options.md#cors)

Default value: `-`

The list of options that will be forwarded to the [`cors`](https://www.npmjs.com/package/cors) module. More information can be found [here](_docs_v4_handling-cors_.md).

Examples:

*   allow a given origin
```
const io = new Server(httpServer, {  
  cors: {    origin: ["https://example.com"]  }});  
```
*   allow a given origin for local development
```
const io = new Server(httpServer, {  
  cors: {    origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000"]  }});  
```
*   allow the given origins, headers and credentials (such as cookies, authorization headers or TLS client certificates)
```
const io = new Server(httpServer, {  
  cors: {    origin: ["https://example.com", "https://dev.example.com"],    allowedHeaders: ["my-custom-header"],    credentials: true  }});  
```
note

If you want the browser to send credentials such as cookies, authorization headers or TLS client certificates, you also need to set [`withCredentials`](_docs_v4_client-options_.md#withcredentials) option to `true` on the client side:
```
import { io } from "socket.io-client";  
  
const socket = io("https://my-backend.com", {  
  withCredentials: true});  
```
More information [here](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).

*   allow any origin
```
const io = new Server(httpServer, {  
  cors: {    origin: "*"  }});  
```
danger

Please note that in that case, you are basically disabling the security provided by Cross-Origin Resource Sharing (CORS), as any domain will be able to reach your server. Please use with caution.

Available options:

Option

Description

`origin`

Configures the **Access-Control-Allow-Origin** CORS header.

`methods`

Configures the **Access-Control-Allow-Methods** CORS header. Expects a comma-delimited string (ex: 'GET,PUT,POST') or an array (ex: `['GET', 'PUT', 'POST']`).

`allowedHeaders`

Configures the **Access-Control-Allow-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Type,Authorization') or an array (ex: `['Content-Type', 'Authorization']`). If not specified, defaults to reflecting the headers specified in the request's **Access-Control-Request-Headers** header.

`exposedHeaders`

Configures the **Access-Control-Expose-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Range,X-Content-Range') or an array (ex: `['Content-Range', 'X-Content-Range']`). If not specified, no custom headers are exposed.

`credentials`

Configures the **Access-Control-Allow-Credentials** CORS header. Set to `true` to pass the header, otherwise it is omitted.

`maxAge`

Configures the **Access-Control-Max-Age** CORS header. Set to an integer to pass the header, otherwise it is omitted.

`preflightContinue`

Pass the CORS preflight response to the next handler.

`optionsSuccessStatus`

Provides a status code to use for successful `OPTIONS` requests, since some legacy browsers (IE11, various SmartTVs) choke on `204`.

Possible values for the `origin` option:

*   `Boolean` - set `origin` to `true` to reflect the [request origin](http://tools.ietf.org/html/draft-abarth-origin-09), as defined by `req.header('Origin')`, or set it to `false` to disable CORS.
*   `String` - set `origin` to a specific origin. For example if you set it to `"http://example.com"` only requests from "[http://example.com"](http://example.com"/) will be allowed.
*   `RegExp` - set `origin` to a regular expression pattern which will be used to test the request origin. If it's a match, the request origin will be reflected. For example the pattern `/example\.com$/` will reflect any request that is coming from an origin ending with "example.com".
*   `Array` - set `origin` to an array of valid origins. Each origin can be a `String` or a `RegExp`. For example `["http://example1.com", /\.example2\.com$/]` will accept any request from "[http://example1.com"](http://example1.com"/) or from a subdomain of "example2.com".
*   `Function` - set `origin` to a function implementing some custom logic. The function takes the request origin as the first parameter and a callback (which expects the signature `err [object], allow [bool]`) as the second.

note

The option is named `origin` (and not `origins`) even with multiple domains:
```
const io = new Server(httpServer, {  
  cors: {    // BAD    origins: ["https://example.com"],    // GOOD    origin: ["https://example.com"],  }});  
```
caution

You can't use `origin: "*"` when setting `credentials: true`:
```
// THIS WON'T WORK  
const io = new Server(httpServer, {  
  cors: {    origin: "*",    credentials: true  }});  
```
You will see an error like this in the browser console:

> Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at ‘.../socket.io/?EIO=4&transport=polling&t=NvQfU77’. (Reason: Credential is not supported if the CORS header ‘Access-Control-Allow-Origin’ is ‘\*’)

You need to either provide a list of domains (recommended solution) or use the following method:
```
const io = new Server(httpServer, {  
  cors: {    origin: (_req, callback) => {      callback(null, true);    },    credentials: true  }});  
```
Please note that in that case, like with `origin: "*"` or `origin: true`, you are basically disabling the security provided by Cross-Origin Resource Sharing (CORS), as any domain will be able to reach your server. Please use with caution.

### `httpCompression`[​](_docs_v4_server-options.md#httpcompression)

_Added in v1.4.0_

Default value: `true`

Whether to enable the compression for the HTTP long-polling transport.

Please note that if `httpCompression` is set to `false`, the compress flag used when emitting (`socket.compress(true).emit(...)`) will be ignored when the connection is established with HTTP long-polling requests.

All options from the Node.js [`zlib` module](https://nodejs.org/api/zlib.html#zlib_class_options) are supported.

Example:
```
const io = new Server(httpServer, {  
  httpCompression: {    // Engine.IO options    threshold: 2048, // defaults to 1024    // Node.js zlib options    chunkSize: 8 * 1024, // defaults to 16 * 1024    windowBits: 14, // defaults to 15    memLevel: 7, // defaults to 8  }});  
```
### `maxHttpBufferSize`[​](_docs_v4_server-options.md#maxhttpbuffersize)

Default value: `1e6` (1 MB)

This defines how many bytes a single message can be, before closing the socket. You may increase or decrease this value depending on your needs.
```
const io = new Server(httpServer, {  
  maxHttpBufferSize: 1e8});  
```
It matches the [maxPayload](https://github.com/websockets/ws/blob/master/doc/ws.md#new-websocketserveroptions-callback) option of the ws package.

### `perMessageDeflate`[​](_docs_v4_server-options.md#permessagedeflate)

History

Version

Changes

v3.0.0

The permessage-deflate extension is now disabled by default.

v1.4.0

First implementation.

Default value: `false`

Whether to enable the [permessage-deflate extension](https://tools.ietf.org/html/draft-ietf-hybi-permessage-compression-19) for the WebSocket transport. This extension is known to add a significant overhead in terms of performance and memory consumption, so we suggest to only enable it if it is really needed.

Please note that if `perMessageDeflate` is set to `false` (which is the default), the compress flag used when emitting (`socket.compress(true).emit(...)`) will be ignored when the connection is established with WebSockets, as the permessage-deflate extension cannot be enabled on a per-message basis.

All options from the [`ws` module](https://github.com/websockets/ws/blob/master/README.md#websocket-compression) are supported:
```
const io = new Server(httpServer, {  
  perMessageDeflate: {    threshold: 2048, // defaults to 1024  
    zlibDeflateOptions: {      chunkSize: 8 * 1024, // defaults to 16 * 1024    },  
    zlibInflateOptions: {      windowBits: 14, // defaults to 15      memLevel: 7, // defaults to 8    },  
    clientNoContextTakeover: true, // defaults to negotiated value.    serverNoContextTakeover: true, // defaults to negotiated value.    serverMaxWindowBits: 10, // defaults to negotiated value.  
    concurrencyLimit: 20, // defaults to 10  }});  
```
### `pingInterval`[​](_docs_v4_server-options.md#pinginterval)

Default value: `25000`

This value is used in the heartbeat mechanism, which periodically checks if the connection is still alive between the server and the client.

The server sends a ping packet every `pingInterval` ms, and if the client does not answer with a pong within `pingTimeout` ms, the server considers that the connection is closed.

Similarly, if the client does not receive a ping packet from the server within `pingInterval + pingTimeout` ms, then the client also considers that the connection is closed.

In both cases, the disconnection reason will be: `ping timeout`
```
socket.on("disconnect", (reason) => {  
  console.log(reason); // "ping timeout"});  
```
caution

Using a small value like `1000` (one heartbeat per second) will incur some load on your server, which might become noticeable with a few thousands connected clients.

### `pingTimeout`[​](_docs_v4_server-options.md#pingtimeout)

History

Version

Changes

v4.0.0

`pingTimeout` now defaults to `20000` ms.

v2.1.0

Defaults to `5000` ms.

v1.0.0

Defaults to `60000` ms.

Default value: `20000`

See [above](_docs_v4_server-options.md#pinginterval).

caution

Using a smaller value means that a temporarily unresponsive server might trigger a lot of client reconnections.

On the contrary, using a bigger value means that a broken connection will take longer to get detected (and you might get a warning on React Native if `pingInterval + pingTimeout` is bigger than 60 seconds).

### `transports`[​](_docs_v4_server-options.md#transports)

Default value: `["polling", "websocket"]`

The low-level transports that are allowed on the server-side.

Example with WebTransport enabled:
```
const io = new Server({  
  transports: ["polling", "websocket", "webtransport"]});  
```
Please check the WebTransport example [here](_get-started_webtransport.md).

### `upgradeTimeout`[​](_docs_v4_server-options.md#upgradetimeout)

Default value: `10000`

This is the delay in milliseconds before an uncompleted transport upgrade is cancelled.

### `wsEngine`[​](_docs_v4_server-options.md#wsengine)

Default value: `require("ws").Server` (source code can be found [here](https://github.com/websockets/ws))

The WebSocket server implementation to use. Please see the documentation [here](_docs_v4_server-installation_.md#other-websocket-server-implementations).

Example:
```
const io = new Server(httpServer, {  
  wsEngine: require("eiows").Server});  
```

#### _docs_v4_server-socket-instance.md

> Source: https://socket.io/docs/v4/server-socket-instance
> Scraped: 4/14/2025, 11:55:39 PM

A `Socket` is the fundamental class for interacting with the client. It inherits all the methods of the Node.js [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter), like [emit](_docs_v4_server-api_.md#socketemiteventname-args), [on](_docs_v4_server-api_.md#socketoneventname-callback), [once](_docs_v4_server-api_.md#socketonceeventname-listener) or [removeListener](_docs_v4_server-api_.md#socketremovelistenereventname-listener).

![Bidirectional communication between server and client](https://socket.io/images/bidirectional-communication-socket.png)![Bidirectional communication between server and client](https://socket.io/images/bidirectional-communication-socket-dark.png)

Besides:

* [emitting](_docs_v4_emitting-events_.md#basic-emit) and [listening to](_docs_v4_listening-to-events_.md) events
* [broadcasting events](_docs_v4_broadcasting-events_.md#to-all-connected-clients-except-the-sender)
* [joining and leaving rooms](_docs_v4_rooms_.md#joining-and-leaving)

The Socket instance has a few attributes that may be of use in your application:

Each new connection is assigned a random 20-characters identifier.

This identifier is synced with the value on the client-side.
```
// server-side  
io.on("connection", (socket) => {  
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL});  
  
// client-side  
socket.on("connect", () => {  
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL});  
```
caution

Please note that, unless [connection state recovery](_docs_v4_connection-state-recovery.md) is enabled, the `id` attribute is an **ephemeral** ID that is not meant to be used in your application (or only for debugging purposes) because:

*   this ID is regenerated after each reconnection (for example when the WebSocket connection is severed, or when the user refreshes the page)
*   two different browser tabs will have two different IDs
*   there is no message queue stored for a given ID on the server (i.e. if the client is disconnected, the messages sent from the server to this ID are lost)

Please use a regular session ID instead (either sent in a cookie, or stored in the localStorage and sent in the [`auth`](_docs_v4_client-options_.md#auth) payload).

### `disconnect`[​](_docs_v4_server-socket-instance.md#disconnect)

This event is fired by the Socket instance upon disconnection.
```
io.on("connection", (socket) => {  
  socket.on("disconnect", (reason) => {    // ...  });});  
```
Here is the list of possible reasons:

Reason

Description

`server namespace disconnect`

The socket was forcefully disconnected with [socket.disconnect()](_docs_v4_server-api_.md#socketdisconnectclose).

`client namespace disconnect`

The client has manually disconnected the socket using [socket.disconnect()](_docs_v4_client-api_.md#socketdisconnect).

`server shutting down`

The server is, well, shutting down.

`ping timeout`

The client did not send a PONG packet in the `pingTimeout` delay.

`transport close`

The connection was closed (example: the user has lost connection, or the network was changed from WiFi to 4G).

`transport error`

The connection has encountered an error.

`parse error`

The server has received an invalid packet from the client.

`forced close`

The server has received an invalid packet from the client.

`forced server close`

The client did not join a namespace in time (see the [`connectTimeout`](_docs_v4_server-options_.md#connecttimeout) option) and was forcefully closed.

### `disconnecting`[​](_docs_v4_server-socket-instance.md#disconnecting)

This event is similar to `disconnect` but is fired a bit earlier, when the [Socket#rooms](_docs_v4_server-socket-instance_.md#socketrooms) set is not empty yet
```
io.on("connection", (socket) => {  
  socket.on("disconnecting", (reason) => {    for (const room of socket.rooms) {      if (room !== socket.id) {        socket.to(room).emit("user has left", socket.id);      }    }  });});  
```
Note: those events, along with `connect`, `connect_error`, `newListener` and `removeListener`, are special events that shouldn't be used in your application:
```
// BAD, will throw an error  
socket.emit("disconnect");  
```
The complete API exposed by the Socket instance can be found [here](_docs_v4_server-api_.md#socket).

#### _docs_v4_server-with-bundlers.md

> Source: https://socket.io/docs/v4/server-with-bundlers
> Scraped: 4/14/2025, 11:55:39 PM

While less common than frontend bundling, it is totally possible to create a bundle for the server.

### Without serving the client files[​](_docs_v4_server-with-bundlers.md#without-serving-the-client-files)

Installation:
```
npm install -D webpack webpack-cli socket.io bufferutil utf-8-validate  
```
`index.js`
```
const { Server } = require("socket.io");  
  
const io = new Server({  
  serveClient: false});  
  
io.on("connection", socket => {  
  console.log(`connect ${socket.id}`);  
  socket.on("disconnect", (reason) => {    console.log(`disconnect ${socket.id} due to ${reason}`);  });});  
  
io.listen(3000);  
```
`webpack.config.js`
```
const path = require("path");  
  
module.exports = {  
  entry: "./index.js",  target: "node",  mode: "production",  output: {    path: path.resolve(__dirname, "dist"),    filename: "index.js",  }};  
```
Note: `bufferutil` and `utf-8-validate` are two optional dependencies from the `ws` package. You can also set them as "external" with:
```
const path = require("path");  
  
module.exports = {  
  entry: "./index.js",  target: "node",  mode: "production",  output: {    path: path.resolve(__dirname, "dist"),    filename: "index.js",  },  externals: {    bufferutil: "bufferutil",    "utf-8-validate": "utf-8-validate",  },};  
```
Documentation: [https://webpack.js.org/configuration/externals/](https://webpack.js.org/configuration/externals/)

### Including serving the client files[​](_docs_v4_server-with-bundlers.md#including-serving-the-client-files)

In that case, we'll have to use [Asset modules](https://webpack.js.org/guides/asset-modules/) and override the `sendFile` function of the Socket.IO server:

`index.js`
```
const { Server } = require("socket.io");  
  
const clientFile = require("./node_modules/socket.io/client-dist/socket.io.min?raw");  
const clientMap = require("./node_modules/socket.io/client-dist/socket.io.min.js.map?raw");  
  
Server.sendFile = (filename, req, res) => {  
  res.end(filename.endsWith(".map") ? clientMap : clientFile);};  
  
const io = new Server();  
  
io.on("connection", socket => {  
  console.log(`connect ${socket.id}`);  
  socket.on("disconnect", (reason) => {    console.log(`disconnect ${socket.id} due to ${reason}`);  });});  
  
io.listen(3000);  
```
`webpack.config.js`
```
const path = require("path");  
  
module.exports = {  
  entry: "./index.js",  target: "node",  mode: "production",  output: {    path: path.resolve(__dirname, "dist"),    filename: "index.js",  },  module: {    rules: [      {        resourceQuery: /raw/,        type: "asset/source",      },    ],  },};  
```

#### _docs_v4_socket-io-protocol.md

> Source: https://socket.io/docs/v4/socket-io-protocol
> Scraped: 4/14/2025, 11:55:32 PM

This document describes the 5th version of the Socket.IO protocol.

The source of this document can be found [here](https://github.com/socketio/socket.io-protocol).

**Table of content** [Introduction](_docs_v4_socket-io-protocol.md#introduction)
* [Exchange protocol](_docs_v4_socket-io-protocol.md#exchange-protocol)
    * [Connection to a namespace](_docs_v4_socket-io-protocol.md#connection-to-a-namespace)
    * [Sending and receiving data](_docs_v4_socket-io-protocol.md#sending-and-receiving-data)
    * [Acknowledgement](_docs_v4_socket-io-protocol.md#acknowledgement)
    * [Disconnection from a namespace](_docs_v4_socket-io-protocol.md#disconnection-from-a-namespace)
* [Packet encoding](_docs_v4_socket-io-protocol.md#packet-encoding)
    * [Format](_docs_v4_socket-io-protocol.md#format)
    * [Examples](_docs_v4_socket-io-protocol.md#examples)
        * [Connection to a namespace](_docs_v4_socket-io-protocol.md#connection-to-a-namespace-1)
        * [Sending and receiving data](_docs_v4_socket-io-protocol.md#sending-and-receiving-data-1)
        * [Acknowledgement](_docs_v4_socket-io-protocol.md#acknowledgement-1)
        * [Disconnection from a namespace](_docs_v4_socket-io-protocol.md#disconnection-from-a-namespace-1)
* [Sample session](_docs_v4_socket-io-protocol.md#sample-session)
* [History](_docs_v4_socket-io-protocol.md#history)
    * [Difference between v5 and v4](_docs_v4_socket-io-protocol.md#difference-between-v5-and-v4)
    * [Difference between v4 and v3](_docs_v4_socket-io-protocol.md#difference-between-v4-and-v3)
    * [Difference between v3 and v2](_docs_v4_socket-io-protocol.md#difference-between-v3-and-v2)
    * [Difference between v2 and v1](_docs_v4_socket-io-protocol.md#difference-between-v2-and-v1)
    * [Initial revision](_docs_v4_socket-io-protocol.md#initial-revision)
* [Test suite](_docs_v4_socket-io-protocol.md#test-suite)

The Socket.IO protocol enables [full-duplex](https://en.wikipedia.org/wiki/Duplex_(telecommunications)#FULL-DUPLEX) and low-overhead communication between a client and a server.

It is built on top of [the Engine.IO protocol](https://github.com/socketio/engine.io-protocol), which handles the low-level plumbing with WebSocket and HTTP long-polling.

The Socket.IO protocol adds the following features:

*   multiplexing (referred as ["namespace"](_docs_v4_namespaces.md) in the Socket.IO jargon)

Example with the JavaScript API:

_Server_
```
// declare the namespace  
const namespace = io.of("/admin");  
// handle the connection to the namespace  
namespace.on("connection", (socket) => {  
  // ...});  
```
_Client_
```
// reach the main namespace  
const socket1 = io();  
// reach the "/admin" namespace (with the same underlying WebSocket connection)  
const socket2 = io("/admin");  
// handle the connection to the namespace  
socket2.on("connect", () => {  
  // ...});  
```
*   acknowledgement of packets

Example with the JavaScript API:
```
// on one side  
socket.emit("hello", "foo", (arg) => {  
  console.log("received", arg);});  
  
// on the other side  
socket.on("hello", (arg, ack) => {  
  ack("bar");});  
```
The reference implementation is written in [TypeScript](https://www.typescriptlang.org/):

*   server: [https://github.com/socketio/socket.io](https://github.com/socketio/socket.io)
*   client: [https://github.com/socketio/socket.io-client](https://github.com/socketio/socket.io-client)

A Socket.IO packet contains the following fields:

*   a packet type (integer)
*   a namespace (string)
*   optionally, a payload (Object | Array)
*   optionally, an acknowledgment id (integer)

Here is the list of available packet types:

Type

ID

Usage

CONNECT

0

Used during the [connection to a namespace](_docs_v4_socket-io-protocol.md#connection-to-a-namespace).

DISCONNECT

1

Used when [disconnecting from a namespace](_docs_v4_socket-io-protocol.md#disconnection-from-a-namespace).

EVENT

2

Used to [send data](_docs_v4_socket-io-protocol.md#sending-and-receiving-data) to the other side.

ACK

3

Used to [acknowledge](_docs_v4_socket-io-protocol.md#acknowledgement) an event.

CONNECT\_ERROR

4

Used during the [connection to a namespace](_docs_v4_socket-io-protocol.md#connection-to-a-namespace).

BINARY\_EVENT

5

Used to [send binary data](_docs_v4_socket-io-protocol.md#sending-and-receiving-data) to the other side.

BINARY\_ACK

6

Used to [acknowledge](_docs_v4_socket-io-protocol.md#acknowledgement) an event (the response includes binary data).

### Connection to a namespace[​](_docs_v4_socket-io-protocol.md#connection-to-a-namespace)

At the beginning of a Socket.IO session, the client MUST send a `CONNECT` packet:

The server MUST respond with either:

*   a `CONNECT` packet if the connection is successful, with the session ID in the payload
*   or a `CONNECT_ERROR` packet if the connection is not allowed
```
CLIENT                                                      SERVER  
  
  │  ───────────────────────────────────────────────────────►  │  │             { type: CONNECT, namespace: "/" }              │  │  ◄───────────────────────────────────────────────────────  │  │   { type: CONNECT, namespace: "/", data: { sid: "..." } }  │
```
If the server does not receive a `CONNECT` packet first, then it MUST close the connection immediately.

A client MAY be connected to multiple namespaces at the same time, with the same underlying WebSocket connection.

Examples:

*   with the main namespace (named `"/"`)
```
Client > { type: CONNECT, namespace: "/" }  
Server > { type: CONNECT, namespace: "/", data: { sid: "wZX3oN0bSVIhsaknAAAI" } }  
```
*   with a custom namespace
```
Client > { type: CONNECT, namespace: "/admin" }  
Server > { type: CONNECT, namespace: "/admin", data: { sid: "oSO0OpakMV_3jnilAAAA" } }  
```
*   with an additional payload
```
Client > { type: CONNECT, namespace: "/admin", data: { "token": "123" } }  
Server > { type: CONNECT, namespace: "/admin", data: { sid: "iLnRaVGHY4B75TeVAAAB" } }  
```
*   in case the connection is refused
```
Client > { type: CONNECT, namespace: "/" }  
Server > { type: CONNECT_ERROR, namespace: "/", data: { message: "Not authorized" } }  
```
### Sending and receiving data[​](_docs_v4_socket-io-protocol.md#sending-and-receiving-data)

Once the [connection to a namespace](_docs_v4_socket-io-protocol.md#connection-to-a-namespace) is established, the client and the server can begin exchanging data:
```
CLIENT                                                      SERVER  
  
  │  ───────────────────────────────────────────────────────►  │  │        { type: EVENT, namespace: "/", data: ["foo"] }      │  │                                                            │  │  ◄───────────────────────────────────────────────────────  │  │        { type: EVENT, namespace: "/", data: ["bar"] }      │
```
The payload is mandatory and MUST be a non-empty array. If that's not the case, then the receiver MUST close the connection.

Examples:

*   with the main namespace
```
Client > { type: EVENT, namespace: "/", data: ["foo"] }  
```
*   with a custom namespace
```
Server > { type: EVENT, namespace: "/admin", data: ["bar"] }  
```
*   with binary data
```
Client > { type: BINARY_EVENT, namespace: "/", data: ["baz", <Buffer <01 02 03 04>> ] }  
```
### Acknowledgement[​](_docs_v4_socket-io-protocol.md#acknowledgement)

The sender MAY include an event ID in order to request an acknowledgement from the receiver:
```
CLIENT                                                      SERVER  
  
  │  ───────────────────────────────────────────────────────►  │  │   { type: EVENT, namespace: "/", data: ["foo"], id: 12 }   │  │  ◄───────────────────────────────────────────────────────  │  │    { type: ACK, namespace: "/", data: ["bar"], id: 12 }    │
```
The receiver MUST respond with an `ACK` packet with the same event ID.

The payload is mandatory and MUST be an array (possibly empty).

Examples:

*   with the main namespace
```
Client > { type: EVENT, namespace: "/", data: ["foo"], id: 12 }  
Server > { type: ACK, namespace: "/", data: [], id: 12 }  
```
*   with a custom namespace
```
Server > { type: EVENT, namespace: "/admin", data: ["foo"], id: 13 }  
Client > { type: ACK, namespace: "/admin", data: ["bar"], id: 13 }  
```
*   with binary data
```
Client > { type: BINARY_EVENT, namespace: "/", data: ["foo", <buffer <01 02 03 04> ], id: 14 }  
Server > { type: ACK, namespace: "/", data: ["bar"], id: 14 }  
  
or  
  
Server > { type: EVENT, namespace: "/", data: ["foo" ], id: 15 }  
Client > { type: BINARY_ACK, namespace: "/", data: ["bar", <buffer <01 02 03 04>], id: 15 }  
```
### Disconnection from a namespace[​](_docs_v4_socket-io-protocol.md#disconnection-from-a-namespace)

At any time, one side can end the connection to a namespace by sending a `DISCONNECT` packet:
```
CLIENT                                                      SERVER  
  
  │  ───────────────────────────────────────────────────────►  │  │           { type: DISCONNECT, namespace: "/" }             │
```
No response is expected from the other side. The low-level connection MAY be kept alive if the client is connected to another namespace.

This section details the encoding used by the default parser which is included in Socket.IO server and client, and whose source can be found [here](https://github.com/socketio/socket.io-parser).

The JavaScript server and client implementations also supports custom parsers, which have different tradeoffs and may benefit to certain kind of applications. Please see [socket.io-json-parser](https://github.com/socketio/socket.io-json-parser) or [socket.io-msgpack-parser](https://github.com/socketio/socket.io-msgpack-parser) for example.

Please also note that each Socket.IO packet is sent as a Engine.IO `message` packet (more information [here](https://github.com/socketio/engine.io-protocol)), so the encoded result will be prefixed by the character `"4"` when sent over the wire (in the request/response body with HTTP long-polling, or in the WebSocket frame).

### Format[​](_docs_v4_socket-io-protocol.md#format)
```
<packet type>[<# of binary attachments>-][<namespace>,][<acknowledgment id>][JSON-stringified payload without binary]  

  
+ binary attachments extracted  
```
Note: the namespace is only included if it is different from the main namespace (`/`)

### Examples[​](_docs_v4_socket-io-protocol.md#examples)

#### Connection to a namespace[​](_docs_v4_socket-io-protocol.md#connection-to-a-namespace-1)

*   with the main namespace

_Packet_
```
{ type: CONNECT, namespace: "/" }  
```
_Encoded_

*   with a custom namespace

_Packet_
```
{ type: CONNECT, namespace: "/admin", data: { sid: "oSO0OpakMV_3jnilAAAA" } }  
```
_Encoded_
```
0/admin,{"sid":"oSO0OpakMV_3jnilAAAA"}  
```
*   in case the connection is refused

_Packet_
```
{ type: CONNECT_ERROR, namespace: "/", data: { message: "Not authorized" } }  
```
_Encoded_
```
4{"message":"Not authorized"}  
```
#### Sending and receiving data[​](_docs_v4_socket-io-protocol.md#sending-and-receiving-data-1)

*   with the main namespace

_Packet_
```
{ type: EVENT, namespace: "/", data: ["foo"] }  
```
_Encoded_

*   with a custom namespace

_Packet_
```
{ type: EVENT, namespace: "/admin", data: ["bar"] }  
```
_Encoded_

*   with binary data

_Packet_
```
{ type: BINARY_EVENT, namespace: "/", data: ["baz", <Buffer <01 02 03 04>> ] }  
```
_Encoded_
```
51-["baz",{"_placeholder":true,"num":0}]  
  
+ <Buffer <01 02 03 04>>  
```
*   with multiple attachments

_Packet_
```
{ type: BINARY_EVENT, namespace: "/admin", data: ["baz", <Buffer <01 02>>, <Buffer <03 04>> ] }  
```
_Encoded_
```
52-/admin,["baz",{"_placeholder":true,"num":0},{"_placeholder":true,"num":1}]  
  
+ <Buffer <01 02>>  
+ <Buffer <03 04>>  
```
Please remember that each Socket.IO packet is wrapped in a Engine.IO `message` packet, so they will be prefixed by the character `"4"` when sent over the wire.

Example: `{ type: EVENT, namespace: "/", data: ["foo"] }` will be sent as `42["foo"]`

#### Acknowledgement[​](_docs_v4_socket-io-protocol.md#acknowledgement-1)

*   with the main namespace

_Packet_
```
{ type: EVENT, namespace: "/", data: ["foo"], id: 12 }  
```
_Encoded_

*   with a custom namespace

_Packet_
```
{ type: ACK, namespace: "/admin", data: ["bar"], id: 13 }  
```
_Encoded_

*   with binary data

_Packet_
```
{ type: BINARY_ACK, namespace: "/", data: ["bar", <Buffer <01 02 03 04>>], id: 15 }  
```
_Encoded_
```
61-15["bar",{"_placeholder":true,"num":0}]  
  
+ <Buffer <01 02 03 04>>  
```
#### Disconnection from a namespace[​](_docs_v4_socket-io-protocol.md#disconnection-from-a-namespace-1)

*   with the main namespace

_Packet_
```
{ type: DISCONNECT, namespace: "/" }  
```
_Encoded_

*   with a custom namespace
```
{ type: DISCONNECT, namespace: "/admin" }  
```
_Encoded_

Here is an example of what is sent over the wire when combining both the Engine.IO and the Socket.IO protocols.

*   Request n°1 (open packet)
```
GET /socket.io/?EIO=4&transport=polling&t=N8hyd6w  
< HTTP/1.1 200 OK  
< Content-Type: text/plain; charset=UTF-8  
0{"sid":"lv_VI97HAXpY6yYWAAAC","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":5000,"maxPayload":1000000}  
```
Details:
```
0           => Engine.IO "open" packet type  
{"sid":...  => the Engine.IO handshake data  
```
Note: the `t` query param is used to ensure that the request is not cached by the browser.

*   Request n°2 (namespace connection request):
```
POST /socket.io/?EIO=4&transport=polling&t=N8hyd7H&sid=lv_VI97HAXpY6yYWAAAC  
< HTTP/1.1 200 OK  
< Content-Type: text/plain; charset=UTF-8  
40  
```
Details:
```
4           => Engine.IO "message" packet type  
0           => Socket.IO "CONNECT" packet type  
```
*   Request n°3 (namespace connection approval)
```
GET /socket.io/?EIO=4&transport=polling&t=N8hyd7H&sid=lv_VI97HAXpY6yYWAAAC  
< HTTP/1.1 200 OK  
< Content-Type: text/plain; charset=UTF-8  
40{"sid":"wZX3oN0bSVIhsaknAAAI"}  
```
*   Request n°4

`socket.emit('hey', 'Jude')` is executed on the server:
```
GET /socket.io/?EIO=4&transport=polling&t=N8hyd7H&sid=lv_VI97HAXpY6yYWAAAC  
< HTTP/1.1 200 OK  
< Content-Type: text/plain; charset=UTF-8  
42["hey","Jude"]  
```
Details:
```
4           => Engine.IO "message" packet type  
2           => Socket.IO "EVENT" packet type  
[...]       => content  
```
*   Request n°5 (message out)

`socket.emit('hello'); socket.emit('world');` is executed on the client:
```
POST /socket.io/?EIO=4&transport=polling&t=N8hzxke&sid=lv_VI97HAXpY6yYWAAAC  
> Content-Type: text/plain; charset=UTF-8  
42["hello"]\x1e42["world"]  
< HTTP/1.1 200 OK  
< Content-Type: text/plain; charset=UTF-8  
ok  
```
Details:
```
4           => Engine.IO "message" packet type  
2           => Socket.IO "EVENT" packet type  
["hello"]   => the 1st content  
\x1e        => separator  
4           => Engine.IO "message" packet type  
2           => Socket.IO "EVENT" packet type  
["world"]   => the 2nd content  
```
*   Request n°6 (WebSocket upgrade)
```
GET /socket.io/?EIO=4&transport=websocket&sid=lv_VI97HAXpY6yYWAAAC  
< HTTP/1.1 101 Switching Protocols  
```
WebSocket frames:
```
< 2probe                                        => Engine.IO probe request  
> 3probe                                        => Engine.IO probe response  
> 5                                             => Engine.IO "upgrade" packet type  
> 42["hello"]  
> 42["world"]  
> 40/admin,                                     => request access to the admin namespace (Socket.IO "CONNECT" packet)  
< 40/admin,{"sid":"-G5j-67EZFp-q59rADQM"}       => grant access to the admin namespace  
> 42/admin,1["tellme"]                          => Socket.IO "EVENT" packet with acknowledgement  
< 461-/admin,1[{"_placeholder":true,"num":0}]   => Socket.IO "BINARY_ACK" packet with a placeholder  
< <binary>                                      => the binary attachment (sent in the following frame)  
... after a while without message  
> 2                                             => Engine.IO "ping" packet type  
< 3                                             => Engine.IO "pong" packet type  
> 1                                             => Engine.IO "close" packet type  
```
## History[​](_docs_v4_socket-io-protocol.md#history)

### Difference between v5 and v4[​](_docs_v4_socket-io-protocol.md#difference-between-v5-and-v4)

The 5th revision (current) of the Socket.IO protocol is used in Socket.IO v3 and above (`v3.0.0` was released in November 2020).

It is built on top of the 4th revision of [the Engine.IO protocol](https://github.com/socketio/engine.io-protocol) (hence the `EIO=4` query parameter).

List of changes:

*   remove the implicit connection to the default namespace

In previous versions, a client was always connected to the default namespace, even if it requested access to another namespace.

This is not the case anymore, the client must send a `CONNECT` packet in any case.

Commits: [09b6f23](https://github.com/socketio/socket.io/commit/09b6f2333950b8afc8c1400b504b01ad757876bd) (server) and [249e0be](https://github.com/socketio/socket.io-client/commit/249e0bef9071e7afd785485961c4eef0094254e8) (client)

*   rename `ERROR` to `CONNECT_ERROR`

The meaning and the code number (4) are not modified: this packet type is still used by the server when the connection to a namespace is refused. But we feel the name is more self-descriptive.

Commits: [d16c035](https://github.com/socketio/socket.io/commit/d16c035d258b8deb138f71801cb5aeedcdb3f002) (server) and [13e1db7c](https://github.com/socketio/socket.io-client/commit/13e1db7c94291c583d843beaa9e06ee041ae4f26) (client).

*   the `CONNECT` packet now can contain a payload

The client can send a payload for authentication/authorization purposes. Example:
```
{  
  "type": 0,  "nsp": "/admin",  "data": {    "token": "123"  }}  
```
In case of success, the server responds with a payload contain the ID of the Socket. Example:
```
{  
  "type": 0,  "nsp": "/admin",  "data": {    "sid": "CjdVH4TQvovi1VvgAC5Z"  }}  
```
This change means that the ID of the Socket.IO connection will now be different from the ID of the underlying Engine.IO connection (the one that is found in the query parameters of the HTTP requests).

Commits: [2875d2c](https://github.com/socketio/socket.io/commit/2875d2cfdfa463e64cb520099749f543bbc4eb15) (server) and [bbe94ad](https://github.com/socketio/socket.io-client/commit/bbe94adb822a306c6272e977d394e3e203cae25d) (client)

*   the payload `CONNECT_ERROR` packet is now an object instead of a plain string

Commits: [54bf4a4](https://github.com/socketio/socket.io/commit/54bf4a44e9e896dfb64764ee7bd4e8823eb7dc7b) (server) and [0939395](https://github.com/socketio/socket.io-client/commit/09393952e3397a0c71f239ea983f8ec1623b7c21) (client)

### Difference between v4 and v3[​](_docs_v4_socket-io-protocol.md#difference-between-v4-and-v3)

The 4th revision of the Socket.IO protocol is used in Socket.IO v1 (`v1.0.3` was released in June 2014) and v2 (`v2.0.0` was released in May 2017).

The details of the revision can be found here: [https://github.com/socketio/socket.io-protocol/tree/v4](https://github.com/socketio/socket.io-protocol/tree/v4)

It is built on top of the 3rd revision of [the Engine.IO protocol](https://github.com/socketio/engine.io-protocol) (hence the `EIO=3` query parameter).

List of changes:

*   add a `BINARY_ACK` packet type

Previously, an `ACK` packet was always treated as if it may contain binary objects, with recursive search for such objects, which could hurt performance.

Reference: [https://github.com/socketio/socket.io-parser/commit/ca4f42a922ba7078e840b1bc09fe3ad618acc065](https://github.com/socketio/socket.io-parser/commit/ca4f42a922ba7078e840b1bc09fe3ad618acc065)

### Difference between v3 and v2[​](_docs_v4_socket-io-protocol.md#difference-between-v3-and-v2)

The 3rd revision of the Socket.IO protocol is used in early Socket.IO v1 versions (`socket.io@1.0.0...1.0.2`) (released in May 2014).

The details of the revision can be found here: [https://github.com/socketio/socket.io-protocol/tree/v3](https://github.com/socketio/socket.io-protocol/tree/v3)

List of changes:

*   remove the usage of msgpack to encode packets containing binary objects (see also [299849b](https://github.com/socketio/socket.io-parser/commit/299849b00294c3bc95817572441f3aca8ffb1f65))

### Difference between v2 and v1[​](_docs_v4_socket-io-protocol.md#difference-between-v2-and-v1)

List of changes:

*   add a `BINARY_EVENT` packet type

This was added during the work towards Socket.IO 1.0, in order to add support for binary objects. The `BINARY_EVENT` packets were encoded with [msgpack](https://msgpack.org/).

### Initial revision[​](_docs_v4_socket-io-protocol.md#initial-revision)

This first revision was the result of the split between the Engine.IO protocol (low-level plumbing with WebSocket / HTTP long-polling, heartbeat) and the Socket.IO protocol. It was never included in a Socket.IO release, but paved the way for the next iterations.

The test suite in the [`test-suite/`](https://github.com/socketio/socket.io-protocol/tree/main/test-suite) directory lets you check the compliance of a server implementation.

Usage:

*   in Node.js: `npm ci && npm test`
*   in a browser: simply open the `index.html` file in your browser

For reference, here is expected configuration for the JavaScript server to pass all tests:
```
import { Server } from "socket.io";  
  
const io = new Server(3000, {  
  pingInterval: 300,  pingTimeout: 200,  maxPayload: 1000000,  cors: {    origin: "*"  }});  
  
io.on("connection", (socket) => {  
  socket.emit("auth", socket.handshake.auth);  
  socket.on("message", (...args) => {    socket.emit.apply(socket, ["message-back", ...args]);  });  
  socket.on("message-with-ack", (...args) => {    const ack = args.pop();    ack(...args);  })});  
  
io.of("/custom").on("connection", (socket) => {  
  socket.emit("auth", socket.handshake.auth);});  
```

#### _docs_v4_testing.md

> Source: https://socket.io/docs/v4/testing
> Scraped: 4/14/2025, 11:55:32 PM

```
const { createServer } = require("node:http");  
const { Server } = require("socket.io");  
const ioc = require("socket.io-client");  
const { assert } = require("chai");  
  
function waitFor(socket, event) {  
  return new Promise((resolve) => {    socket.once(event, resolve);  });}  
  
describe("my awesome project", () => {  
  let io, serverSocket, clientSocket;  
  before((done) => {    const httpServer = createServer();    io = new Server(httpServer);    httpServer.listen(() => {      const port = httpServer.address().port;      clientSocket = ioc(`http://localhost:${port}`);      io.on("connection", (socket) => {        serverSocket = socket;      });      clientSocket.on("connect", done);    });  });  
  after(() => {    io.close();    clientSocket.disconnect();  });  
  it("should work", (done) => {    clientSocket.on("hello", (arg) => {      assert.equal(arg, "world");      done();    });    serverSocket.emit("hello", "world");  });  
  it("should work with an acknowledgement", (done) => {    serverSocket.on("hi", (cb) => {      cb("hola");    });    clientSocket.emit("hi", (arg) => {      assert.equal(arg, "hola");      done();    });  });  
  it("should work with emitWithAck()", async () => {    serverSocket.on("foo", (cb) => {      cb("bar");    });    const result = await clientSocket.emitWithAck("foo");    assert.equal(result, "bar");  });  
  it("should work with waitFor()", () => {    clientSocket.emit("baz");  
    return waitFor(serverSocket, "baz");  });});  
```

#### _docs_v4_troubleshooting-connection-issues.md

> Source: https://socket.io/docs/v4/troubleshooting-connection-issues
> Scraped: 4/14/2025, 11:55:31 PM

tip

The [Admin UI](_docs_v4_admin-ui_.md) can give you additional insights about the status of your Socket.IO deployment.

Common/known issues:

* [the socket is not able to connect](_docs_v4_troubleshooting-connection-issues.md#problem-the-socket-is-not-able-to-connect)
* [the socket gets disconnected](_docs_v4_troubleshooting-connection-issues.md#problem-the-socket-gets-disconnected)
* [the socket is stuck in HTTP long-polling](_docs_v4_troubleshooting-connection-issues.md#problem-the-socket-is-stuck-in-http-long-polling)

Other common gotchas:

* [Duplicate event registration](_docs_v4_troubleshooting-connection-issues.md#duplicate-event-registration)
* [Delayed event handler registration](_docs_v4_troubleshooting-connection-issues.md#delayed-event-handler-registration)
* [Usage of the `socket.id` attribute](_docs_v4_troubleshooting-connection-issues.md#usage-of-the-socketid-attribute)
* [Deployment on a serverless platform](_docs_v4_troubleshooting-connection-issues.md#deployment-on-a-serverless-platform)

### Troubleshooting steps[​](_docs_v4_troubleshooting-connection-issues.md#troubleshooting-steps)

On the client side, the `connect_error` event provides additional information:
```
socket.on("connect_error", (err) => {  
  // the reason of the error, for example "xhr poll error"  console.log(err.message);  
  // some additional description, for example the status code of the initial HTTP response  console.log(err.description);  
  // some additional context, for example the XMLHttpRequest object  console.log(err.context);});  
```
On the server side, the `connection_error` event may also provide some additional insights:
```
io.engine.on("connection_error", (err) => {  
  console.log(err.req);      // the request object  console.log(err.code);     // the error code, for example 1  console.log(err.message);  // the error message, for example "Session ID unknown"  console.log(err.context);  // some additional error context});  
```
Here is the list of possible error codes:

Code

Message

Possible explanations

0

"Transport unknown"

This should not happen under normal circumstances.

1

"Session ID unknown"

Usually, this means that sticky sessions are not enabled (see [below](_docs_v4_troubleshooting-connection-issues.md#you-didnt-enable-sticky-sessions-in-a-multi-server-setup)).

2

"Bad handshake method"

This should not happen under normal circumstances.

3

"Bad request"

Usually, this means that a proxy in front of your server is not properly forwarding the WebSocket headers (see [here](_docs_v4_reverse-proxy_.md)).

4

"Forbidden"

The connection was denied by the [`allowRequest()`](_docs_v4_server-options_.md#allowrequest) method.

5

"Unsupported protocol version"

The version of the client is not compatible with the server (see [here](_docs_v4_troubleshooting-connection-issues.md#the-client-is-not-compatible-with-the-version-of-the-server)).

### Possible explanations[​](_docs_v4_troubleshooting-connection-issues.md#possible-explanations)

#### You are trying to reach a plain WebSocket server[​](_docs_v4_troubleshooting-connection-issues.md#you-are-trying-to-reach-a-plain-websocket-server)

As explained in the ["What Socket.IO is not"](_docs_v4_.md#what-socketio-is-not) section, the Socket.IO client is not a WebSocket implementation and thus will not be able to establish a connection with a WebSocket server, even with `transports: ["websocket"]`:
```
const socket = io("ws://echo.websocket.org", {  
  transports: ["websocket"]});  
```
#### The server is not reachable[​](_docs_v4_troubleshooting-connection-issues.md#the-server-is-not-reachable)

Please make sure the Socket.IO server is actually reachable at the given URL. You can test it with:
```
curl "<the server URL>/socket.io/?EIO=4&transport=polling"  
```
which should return something like this:
```
0{"sid":"Lbo5JLzTotvW3g2LAAAA","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":20000}  
```
If that's not the case, please check that the Socket.IO server is running, and that there is nothing in between that prevents the connection.

note

v1/v2 servers (which implement the v3 of the protocol, hence the `EIO=3`) will return something like this:
```
96:0{"sid":"ptzi_578ycUci8WLB9G1","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":5000}2:40  
```
#### The client is not compatible with the version of the server[​](_docs_v4_troubleshooting-connection-issues.md#the-client-is-not-compatible-with-the-version-of-the-server)

Maintaining backward compatibility is a top priority for us, but in some particular cases we had to implement some breaking changes at the protocol level:

*   from v1.x to v2.0.0 (released in May 2017), to improve the compatibility with non-Javascript clients (see [here](https://github.com/socketio/engine.io/issues/315))
*   from v2.x to v3.0.0 (released in November 2020), to fix some long-standing issues in the protocol once for all (see [here](_docs_v4_migrating-from-2-x-to-3-0_.md))

info

`v4.0.0` contains some breaking changes in the API of the JavaScript server. The Socket.IO protocol itself was not updated, so a v3 client will be able to reach a v4 server and vice-versa (see [here](_docs_v4_migrating-from-3-x-to-4-0_.md)).

For example, reaching a v3/v4 server with a v1/v2 client will result in the following response:
```
< HTTP/1.1 400 Bad Request  
< Content-Type: application/json  
  
{"code":5,"message":"Unsupported protocol version"}  
```
Here is the compatibility table for the [JS client](https://github.com/socketio/socket.io-client/):

JS Client version

Socket.IO server version

1.x

2.x

3.x

4.x

1.x

**YES**

NO

NO

NO

2.x

NO

**YES***YES**1

**YES**1

3.x

NO

NO

**YES***YES**

4.x

NO

NO

**YES***YES**

\[1\] Yes, with [allowEIO3: true](_docs_v4_server-options_.md#alloweio3)

Here is the compatibility table for the [Java client](https://github.com/socketio/socket.io-client-java/):

Java Client version

Socket.IO server version

2.x

3.x

4.x

1.x

**YES***YES**1

**YES**1

2.x

NO

**YES***YES**

\[1\] Yes, with [allowEIO3: true](_docs_v4_server-options_.md#alloweio3)

Here is the compatibility table for the [Swift client](https://github.com/socketio/socket.io-client-swift/):

Swift Client version

Socket.IO server version

2.x

3.x

4.x

v15.x

**YES***YES**1

**YES**2

v16.x

**YES**3

**YES***YES**

\[1\] Yes, with [allowEIO3: true](_docs_v4_server-options_.md#alloweio3) (server) and `.connectParams(["EIO": "3"])` (client):
```
SocketManager(socketURL: URL(string:"http://localhost:8087/")!, config: [.connectParams(["EIO": "3"])])  
```
\[2\] Yes, [allowEIO3: true](_docs_v4_server-options_.md#alloweio3) (server)

\[3\] Yes, with `.version(.two)` (client):
```
SocketManager(socketURL: URL(string:"http://localhost:8087/")!, config: [.version(.two)])  
```
If you see the following error in your console:
```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at ...  
```
It probably means that:

*   either you are not actually reaching the Socket.IO server (see [above](_docs_v4_troubleshooting-connection-issues.md#the-server-is-not-reachable))
*   or you didn't enable [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS) on the server-side.

Please see the documentation [here](_docs_v4_handling-cors_.md).

#### You didn't enable sticky sessions (in a multi server setup)[​](_docs_v4_troubleshooting-connection-issues.md#you-didnt-enable-sticky-sessions-in-a-multi-server-setup)

When scaling to multiple Socket.IO servers, you need to make sure that all the requests of a given Socket.IO session reach the same Socket.IO server. The explanation can be found [here](_docs_v4_using-multiple-nodes_.md#why-is-sticky-session-required).

Failure to do so will result in HTTP 400 responses with the code: `{"code":1,"message":"Session ID unknown"}`

Please see the documentation [here](_docs_v4_using-multiple-nodes_.md).

#### The request path does not match on both sides[​](_docs_v4_troubleshooting-connection-issues.md#the-request-path-does-not-match-on-both-sides)

By default, the client sends — and the server expects — HTTP requests with the "/socket.io/" request path.

This can be controlled with the `path` option:

_Server_
```
import { Server } from "socket.io";  
  
const io = new Server({  
  path: "/my-custom-path/"});  
  
io.listen(3000);  
```
_Client_
```
import { io } from "socket.io-client";  
  
const socket = io(SERVER_URL, {  
  path: "/my-custom-path/"});  
```
In that case, the HTTP requests will look like `<SERVER_URL>/my-custom-path/?EIO=4&transport=polling[&...]`.

caution
```
import { io } from "socket.io-client";  
  
const socket = io("/my-custom-path/");  
```
means the client will try to reach the [namespace](_docs_v4_namespaces_.md) named "/my-custom-path/", but the request path will still be "/socket.io/".

### Troubleshooting steps[​](_docs_v4_troubleshooting-connection-issues.md#troubleshooting-steps-1)

First and foremost, please note that disconnections are common and expected, even on a stable Internet connection:

*   anything between the user and the Socket.IO server may encounter a temporary failure or be restarted
*   the server itself may be killed as part of an autoscaling policy
*   the user may lose connection or switch from WiFi to 4G, in case of a mobile browser
*   the browser itself may freeze an inactive tab

That being said, the Socket.IO client will always try to reconnect, unless specifically told [otherwise](_docs_v4_client-options_.md#reconnection).

The `disconnect` event provides additional information:
```
socket.on("disconnect", (reason, details) => {  
  // the reason of the disconnection, for example "transport error"  console.log(reason);  
  // the low-level reason of the disconnection, for example "xhr post error"  console.log(details.message);  
  // some additional description, for example the status code of the HTTP response  console.log(details.description);  
  // some additional context, for example the XMLHttpRequest object  console.log(details.context);});  
```
The possible reasons are listed [here](_docs_v4_client-socket-instance_.md#disconnect).

### Possible explanations[​](_docs_v4_troubleshooting-connection-issues.md#possible-explanations-1)

#### Something between the server and the client closes the connection[​](_docs_v4_troubleshooting-connection-issues.md#something-between-the-server-and-the-client-closes-the-connection)

If the disconnection happens at a regular interval, this might indicate that something between the server and the client is not properly configured and closes the connection:

*   nginx

The value of nginx's [`proxy_read_timeout`](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_read_timeout) (60 seconds by default) must be bigger than Socket.IO's [`pingInterval + pingTimeout`](_docs_v4_server-options_.md#pinginterval) (45 seconds by default), else it will forcefully close the connection if no data is sent after the given delay and the client will get a "transport close" error.

*   Apache HTTP Server

The value of httpd's [`ProxyTimeout`](https://httpd.apache.org/docs/2.4/mod/mod_proxy.html#proxytimeout) (60 seconds by default) must be bigger than Socket.IO's [`pingInterval + pingTimeout`](_docs_v4_server-options_.md#pinginterval) (45 seconds by default), else it will forcefully close the connection if no data is sent after the given delay and the client will get a "transport close" error.

#### The browser tab was minimized and heartbeat has failed[​](_docs_v4_troubleshooting-connection-issues.md#the-browser-tab-was-minimized-and-heartbeat-has-failed)

When a browser tab is not in focus, some browsers (like [Chrome](https://developer.chrome.com/blog/timer-throttling-in-chrome-88/#intensive-throttling)) throttle JavaScript timers, which could lead to a disconnection by ping timeout **in Socket.IO v2**, as the heartbeat mechanism relied on `setTimeout` function on the client side.

As a workaround, you can increase the `pingTimeout` value on the server side:
```
const io = new Server({  
  pingTimeout: 60000});  
```
Please note that upgrading to Socket.IO v4 (at least `socket.io-client@4.1.3`, due to [this](https://github.com/socketio/engine.io-client/commit/f30a10b7f45517fcb3abd02511c58a89e0ef498f)) should prevent this kind of issues, as the heartbeat mechanism has been reversed (the server now sends PING packets).

#### The client is not compatible with the version of the server[​](_docs_v4_troubleshooting-connection-issues.md#the-client-is-not-compatible-with-the-version-of-the-server-1)

Since the format of the packets sent over the WebSocket transport is similar in v2 and v3/v4, you might be able to connect with an incompatible client (see [above](_docs_v4_troubleshooting-connection-issues.md#the-client-is-not-compatible-with-the-version-of-the-server)), but the connection will eventually be closed after a given delay.

So if you are experiencing a regular disconnection after 30 seconds (which was the sum of the values of [pingTimeout](_docs_v4_server-options_.md#pingtimeout) and [pingInterval](_docs_v4_server-options_.md#pinginterval) in Socket.IO v2), this is certainly due to a version incompatibility.

#### You are trying to send a huge payload[​](_docs_v4_troubleshooting-connection-issues.md#you-are-trying-to-send-a-huge-payload)

If you get disconnected while sending a huge payload, this may mean that you have reached the [`maxHttpBufferSize`](_docs_v4_server-options_.md#maxhttpbuffersize) value, which defaults to 1 MB. Please adjust it according to your needs:
```
const io = require("socket.io")(httpServer, {  
  maxHttpBufferSize: 1e8});  
```
A huge payload taking more time to upload than the value of the [`pingTimeout`](_docs_v4_server-options_.md#pingtimeout) option can also trigger a disconnection (since the [heartbeat mechanism](_docs_v4_how-it-works_.md#disconnection-detection) fails during the upload). Please adjust it according to your needs:
```
const io = require("socket.io")(httpServer, {  
  pingTimeout: 60000});  
```
### Troubleshooting steps[​](_docs_v4_troubleshooting-connection-issues.md#troubleshooting-steps-2)

In most cases, you should see something like this:

![Network monitor upon success](https://socket.io/assets/images/network-monitor-2e47dbe233100aa290595f8687a9fcba.png)

1.  the Engine.IO handshake (contains the session ID — here, `zBjrh...AAAK` — that is used in subsequent requests)
2.  the Socket.IO handshake request (contains the value of the `auth` option)
3.  the Socket.IO handshake response (contains the [Socket#id](_docs_v4_server-socket-instance_.md#socketid))
4.  the WebSocket connection
5.  the first HTTP long-polling request, which is closed once the WebSocket connection is established

If you don't see a [HTTP 101 Switching Protocols](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101) response for the 4th request, that means that something between the server and your browser is preventing the WebSocket connection.

Please note that this is not necessarily blocking since the connection is still established with HTTP long-polling, but it is less efficient.

You can get the name of the current transport with:

**Client-side**
```
socket.on("connect", () => {  
  const transport = socket.io.engine.transport.name; // in most cases, "polling"  
  socket.io.engine.on("upgrade", () => {    const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"  });});  
```
**Server-side**
```
io.on("connection", (socket) => {  
  const transport = socket.conn.transport.name; // in most cases, "polling"  
  socket.conn.on("upgrade", () => {    const upgradedTransport = socket.conn.transport.name; // in most cases, "websocket"  });});  
```
### Possible explanations[​](_docs_v4_troubleshooting-connection-issues.md#possible-explanations-2)

#### A proxy in front of your servers does not accept the WebSocket connection[​](_docs_v4_troubleshooting-connection-issues.md#a-proxy-in-front-of-your-servers-does-not-accept-the-websocket-connection)

If a proxy like nginx or Apache HTTPD is not properly configured to accept WebSocket connections, then you might get a `TRANSPORT_MISMATCH` error:
```
io.engine.on("connection_error", (err) => {  
  console.log(err.code);     // 3  console.log(err.message);  // "Bad request"  console.log(err.context);  // { name: 'TRANSPORT_MISMATCH', transport: 'websocket', previousTransport: 'polling' }});  
```
Which means that the Socket.IO server does not receive the necessary `Connection: upgrade` header (you can check the `err.req.headers` object).

Please see the documentation [here](_docs_v4_reverse-proxy_.md).

#### [`express-status-monitor`](https://www.npmjs.com/package/express-status-monitor) runs its own socket.io instance[​](_docs_v4_troubleshooting-connection-issues.md#express-status-monitor-runs-its-own-socketio-instance)

Please see the solution [here](https://github.com/RafalWilinski/express-status-monitor).

### Duplicate event registration[​](_docs_v4_troubleshooting-connection-issues.md#duplicate-event-registration)

On the client side, the `connect` event will be emitted every time the socket reconnects, so the event listeners must be registered outside the `connect` event listener:

BAD ⚠️
```
socket.on("connect", () => {  
  socket.on("foo", () => {    // ...  });});  
```
GOOD 👍
```
socket.on("connect", () => {  
  // ...});  
  
socket.on("foo", () => {  
  // ...});  
```
If that's not the case, your event listener might be called multiple times.

### Delayed event handler registration[​](_docs_v4_troubleshooting-connection-issues.md#delayed-event-handler-registration)

BAD ⚠️
```
io.on("connection", async (socket) => {  
  await longRunningOperation();  
  // WARNING! Some packets might be received by the server but without handler  socket.on("hello", () => {    // ...  });});  
```
GOOD 👍
```
io.on("connection", async (socket) => {  
  socket.on("hello", () => {    // ...  });  
  await longRunningOperation();});  
```
### Usage of the `socket.id` attribute[​](_docs_v4_troubleshooting-connection-issues.md#usage-of-the-socketid-attribute)

Please note that, unless [connection state recovery](_docs_v4_connection-state-recovery.md) is enabled, the `id` attribute is an **ephemeral** ID that is not meant to be used in your application (or only for debugging purposes) because:

*   this ID is regenerated after each reconnection (for example when the WebSocket connection is severed, or when the user refreshes the page)
*   two different browser tabs will have two different IDs
*   there is no message queue stored for a given ID on the server (i.e. if the client is disconnected, the messages sent from the server to this ID are lost)

Please use a regular session ID instead (either sent in a cookie, or stored in the localStorage and sent in the [`auth`](_docs_v4_client-options_.md#auth) payload).

### Deployment on a serverless platform[​](_docs_v4_troubleshooting-connection-issues.md#deployment-on-a-serverless-platform)

Since most serverless platforms (such as Vercel) bill by the duration of the request handler, maintaining a long-running connection with Socket.IO (or even plain WebSocket) is not recommended.

References:

* [https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections](https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections)
* [https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html)

#### _docs_v4_tutorial_api-overview.md

> Source: https://socket.io/docs/v4/tutorial/api-overview
> Scraped: 4/14/2025, 11:55:37 PM

Before we go any further, let's take a quick tour of the API provided by Socket.IO:

The following methods are available for both the client and the server.

### Basic emit[​](_docs_v4_tutorial_api-overview.md#basic-emit)

As we have seen in [step #4](_docs_v4_tutorial_step-4.md), you can send any data to the other side with `socket.emit()`:

*   From client to server
*   From server to client

_Client_
```
socket.emit('hello', 'world');  
```
_Server_
```
io.on('connection', (socket) => {  
  socket.on('hello', (arg) => {    console.log(arg); // 'world'  });});  
```
You can send any number of arguments, and all serializable data structures are supported, including binary objects like [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) or [Buffer](https://nodejs.org/docs/latest/api/buffer.html#buffer_buffer) (Node.js only):

*   From client to server
*   From server to client

_Client_
```
socket.emit('hello', 1, '2', { 3: '4', 5: Uint8Array.from([6]) });  
```
_Server_
```
io.on('connection', (socket) => {  
  socket.on('hello', (arg1, arg2, arg3) => {    console.log(arg1); // 1    console.log(arg2); // '2'    console.log(arg3); // { 3: '4', 5: <Buffer 06> }  });});  
```
tip

Calling `JSON.stringify()` on objects is not needed:
```
// BAD  
socket.emit('hello', JSON.stringify({ name: 'John' }));  
  
// GOOD  
socket.emit('hello', { name: 'John' });  
```
### Acknowledgements[​](_docs_v4_tutorial_api-overview.md#acknowledgements)

Events are great, but in some cases you may want a more classic request-response API. In Socket.IO, this feature is named "acknowledgements".

It comes in two flavors:

#### With a callback function[​](_docs_v4_tutorial_api-overview.md#with-a-callback-function)

You can add a callback as the last argument of the `emit()`, and this callback will be called once the other side has acknowledged the event:

*   From client to server
*   From server to client

_Client_
```
socket.timeout(5000).emit('request', { foo: 'bar' }, 'baz', (err, response) => {  
  if (err) {    // the server did not acknowledge the event in the given delay  } else {    console.log(response.status); // 'ok'  }});  
```
_Server_
```
io.on('connection', (socket) => {  
  socket.on('request', (arg1, arg2, callback) => {    console.log(arg1); // { foo: 'bar' }    console.log(arg2); // 'baz'    callback({      status: 'ok'    });  });});  
```
#### With a Promise[​](_docs_v4_tutorial_api-overview.md#with-a-promise)

The `emitWithAck()` method provides the same functionality, but returns a Promise which will resolve once the other side acknowledges the event:

*   From client to server
*   From server to client

_Client_
```
try {  
  const response = await socket.timeout(5000).emitWithAck('request', { foo: 'bar' }, 'baz');  console.log(response.status); // 'ok'} catch (e) {  
  // the server did not acknowledge the event in the given delay}  
```
_Server_
```
io.on('connection', (socket) => {  
  socket.on('request', (arg1, arg2, callback) => {    console.log(arg1); // { foo: 'bar' }    console.log(arg2); // 'baz'    callback({      status: 'ok'    });  });});  
```
caution

Environments that [do not support Promises](https://caniuse.com/promises) (such as Internet Explorer) will need to add a polyfill or use a compiler like [babel](https://babeljs.io/) in order to use this feature (but this is out of the scope of this tutorial).

### Catch-all listeners[​](_docs_v4_tutorial_api-overview.md#catch-all-listeners)

A catch-all listeners is a listener that will be called for any incoming event. This is useful for debugging your application:

_Sender_
```
socket.emit('hello', 1, '2', { 3: '4', 5: Uint8Array.from([6]) });  
```
_Receiver_
```
socket.onAny((eventName, ...args) => {  
  console.log(eventName); // 'hello'  console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]});  
```
Similarly, for outgoing packets:
```
socket.onAnyOutgoing((eventName, ...args) => {  
  console.log(eventName); // 'hello'  console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]});  
```
### Broadcasting[​](_docs_v4_tutorial_api-overview.md#broadcasting)

As we have seen in [step #5](_docs_v4_tutorial_step-5.md), you can broadcast an event to all connected clients with `io.emit()`:
```
io.emit('hello', 'world');  
```
![The 'hello' event is sent to all connected clients](https://socket.io/images/tutorial/broadcasting.png)![The 'hello' event is sent to all connected clients](https://socket.io/images/tutorial/broadcasting-dark.png)

### Rooms[​](_docs_v4_tutorial_api-overview.md#rooms)

In Socket.IO jargon, a _room_ is an arbitrary channel that sockets can join and leave. It can be used to broadcast events to a subset of connected clients:
```
io.on('connection', (socket) => {  
  // join the room named 'some room'  socket.join('some room');    // broadcast to all connected clients in the room  
  io.to('some room').emit('hello', 'world');  
  // broadcast to all connected clients except those in the room  io.except('some room').emit('hello', 'world');  
  // leave the room  socket.leave('some room');});  
```
![The 'hello' event is sent to all connected clients in the targeted room](https://socket.io/images/tutorial/room.png)![The 'hello' event is sent to all connected clients in the targeted room](https://socket.io/images/tutorial/room-dark.png)

That's basically it! For future reference, the whole API can be found [here](_docs_v4_server-api_.md) (server) and [here](_docs_v4_client-api_.md) (client).

#### _docs_v4_tutorial_ending-notes.md

> Source: https://socket.io/docs/v4/tutorial/ending-notes
> Scraped: 4/14/2025, 11:55:40 PM

```
const express = require('express');  
const { createServer } = require('node:http');  
const { join } = require('node:path');  
const { Server } = require('socket.io');  
const sqlite3 = require('sqlite3');  
const { open } = require('sqlite');  
const { availableParallelism } = require('node:os');  
const cluster = require('node:cluster');  
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');  
  
if (cluster.isPrimary) {  
  const numCPUs = availableParallelism();  for (let i = 0; i < numCPUs; i++) {    cluster.fork({      PORT: 3000 + i    });  }  
  return setupPrimary();}  
  
async function main() {  
  const db = await open({    filename: 'chat.db',    driver: sqlite3.Database  });  
  await db.exec(`    CREATE TABLE IF NOT EXISTS messages (      id INTEGER PRIMARY KEY AUTOINCREMENT,      client_offset TEXT UNIQUE,      content TEXT    );  `);  
  const app = express();  const server = createServer(app);  const io = new Server(server, {    connectionStateRecovery: {},    adapter: createAdapter()  });  
  app.get('/', (req, res) => {    res.sendFile(join(__dirname, 'index.html'));  });  
  io.on('connection', async (socket) => {    socket.on('chat message', async (msg, clientOffset, callback) => {      let result;      try {        result = await db.run('INSERT INTO messages (content, client_offset) VALUES (?, ?)', msg, clientOffset);      } catch (e) {        if (e.errno === 19 /* SQLITE_CONSTRAINT */ ) {          callback();        } else {          // nothing to do, just let the client retry        }        return;      }      io.emit('chat message', msg, result.lastID);      callback();    });  
    if (!socket.recovered) {      try {        await db.each('SELECT id, content FROM messages WHERE id > ?',          [socket.handshake.auth.serverOffset || 0],          (_err, row) => {            socket.emit('chat message', row.content, row.id);          }        )      } catch (e) {        // something went wrong      }    }  });  
  const port = process.env.PORT;  
  server.listen(port, () => {    console.log(`server running at http://localhost:${port}`);  });}  
  
main();  
```

#### _docs_v4_tutorial_handling-disconnections.md

> Source: https://socket.io/docs/v4/tutorial/handling-disconnections
> Scraped: 4/14/2025, 11:55:39 PM

Version: 4.x

Now, let's highlight two really important properties of Socket.IO:

1.  a Socket.IO client is not always connected
2.  a Socket.IO server does not store any event

caution

Even over a stable network, it is not possible to maintain a connection alive forever.

Which means that your application needs to be able to synchronize the local state of the client with the global state on the server after a temporary disconnection.

note

The Socket.IO client will automatically try to reconnect after a small delay. However, any missed event during the disconnection period will effectively be lost for this client.

In the context of our chat application, this implies that a disconnected client might miss some messages:

![The disconnected client does not receive the 'chat message' event](https://socket.io/images/tutorial/disconnected.png)![The disconnected client does not receive the 'chat message' event](https://socket.io/images/tutorial/disconnected-dark.png)

We will see in the next steps how we can improve this.

#### _docs_v4_tutorial_introduction.md

> Source: https://socket.io/docs/v4/tutorial/introduction
> Scraped: 4/14/2025, 11:55:31 PM

## Getting started

Welcome to the Socket.IO tutorial!

In this tutorial we'll create a basic chat application. It requires almost no basic prior knowledge of Node.JS or Socket.IO, so it’s ideal for users of all knowledge levels.

Writing a chat application with popular web applications stacks like LAMP (PHP) has normally been very hard. It involves polling the server for changes, keeping track of timestamps, and it’s a lot slower than it should be.

Sockets have traditionally been the solution around which most real-time chat systems are architected, providing a bi-directional communication channel between a client and a server.

This means that the server can _push_ messages to clients. Whenever you write a chat message, the idea is that the server will get it and push it to all other connected clients.

### Tooling[​](_docs_v4_tutorial_introduction.md#tooling)

Any text editor (from a basic text editor to a complete IDE such as [VS Code](https://code.visualstudio.com/)) should be sufficient to complete this tutorial.

Additionally, at the end of each step you will find a link to some online platforms ([CodeSandbox](https://codesandbox.io/) and [StackBlitz](https://stackblitz.com/), namely), allowing you to run the code directly from your browser:

![Screenshot of the CodeSandbox platform](https://socket.io/assets/images/codesandbox-2e332899094eb186d2e1ced75ac2cded.png)

### Syntax settings[​](_docs_v4_tutorial_introduction.md#syntax-settings)

In the Node.js world, there are two ways to import modules:

*   the standard way: ECMAScript modules (or ESM)
```
import { Server } from "socket.io";  
```
Reference: [https://nodejs.org/api/esm.html](https://nodejs.org/api/esm.html)

*   the legacy way: CommonJS
```
const { Server } = require("socket.io");  
```
Reference: [https://nodejs.org/api/modules.html](https://nodejs.org/api/modules.html)

Socket.IO supports both syntax.

tip

We recommend using the ESM syntax in your project, though this might not always be feasible due to some packages not supporting this syntax.

For your convenience, throughout the tutorial, each code block allows you to select your preferred syntax:

*   CommonJS
*   ES modules
```
const { Server } = require("socket.io");  
```
Ready? Click "Next" to get started.

#### _docs_v4_tutorial_step-1.md

> Source: https://socket.io/docs/v4/tutorial/step-1
> Scraped: 4/14/2025, 11:55:35 PM

The first goal is to set up a simple HTML webpage that serves out a form and a list of messages. We’re going to use the Node.JS web framework `express` to this end. Make sure [Node.JS](https://nodejs.org/) is installed.

First let’s create a `package.json` manifest file that describes our project. I recommend you place it in a dedicated empty directory (I’ll call mine `socket-chat-example`).

*   CommonJS
*   ES modules
```
{  
  "name": "socket-chat-example",  "version": "0.0.1",  "description": "my first socket.io app",  "type": "commonjs",  "dependencies": {}}  
```
caution

The "name" property must be unique, you cannot use a value like "socket.io" or "express", because npm will complain when installing the dependency.

Now, in order to easily populate the `dependencies` property with the things we need, we’ll use `npm install`:

Once it's installed we can create an `index.js` file that will set up our application.

*   CommonJS
*   ES modules
```
const express = require('express');  
const { createServer } = require('node:http');  
  
const app = express();  
const server = createServer(app);  
  
app.get('/', (req, res) => {  
  res.send('<h1>Hello world</h1>');});  
  
server.listen(3000, () => {  
  console.log('server running at http://localhost:3000');});  
```
This means that:

*   Express initializes `app` to be a function handler that you can supply to an HTTP server (as seen in line 5).
*   We define a route handler `/` that gets called when we hit our website home.
*   We make the http server listen on port 3000.

If you run `node index.js` you should see the following:

![A console saying that the server has started listening on port 3000](https://socket.io/images/chat-1.png)

And if you point your browser to `http://localhost:3000`:

![A browser displaying a big 'Hello World'](https://socket.io/images/chat-2.png)

So far, so good!

#### _docs_v4_tutorial_step-2.md

> Source: https://socket.io/docs/v4/tutorial/step-2
> Scraped: 4/14/2025, 11:55:35 PM

So far in `index.js` we’re calling `res.send` and passing it a string of HTML. Our code would look very confusing if we just placed our entire application’s HTML there, so instead we're going to create a `index.html` file and serve that instead.

Let’s refactor our route handler to use `sendFile` instead.
```
<!DOCTYPE html>  
<html>  
  <head>    <meta name="viewport" content="width=device-width,initial-scale=1.0">    <title>Socket.IO chat</title>    <style>      body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }  
      #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }      #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }      #input:focus { outline: none; }      #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }  
      #messages { list-style-type: none; margin: 0; padding: 0; }      #messages > li { padding: 0.5rem 1rem; }      #messages > li:nth-child(odd) { background: #efefef; }    </style>  </head>  <body>    <ul id="messages"></ul>    <form id="form" action="">      <input id="input" autocomplete="off" /><button>Send</button>    </form>  </body></html>  
```
If you restart the process (by hitting Control+C and running `node index.js` again) and refresh the page it should look like this:

#### _docs_v4_tutorial_step-3.md

> Source: https://socket.io/docs/v4/tutorial/step-3
> Scraped: 4/14/2025, 11:55:36 PM

Socket.IO is composed of two parts:

*   A server that integrates with (or mounts on) the Node.JS HTTP Server (the [`socket.io`](https://www.npmjs.com/package/socket.io) package)
*   A client library that loads on the browser side (the [`socket.io-client`](https://www.npmjs.com/package/socket.io-client) package)

During development, `socket.io` serves the client automatically for us, as we’ll see, so for now we only have to install one module:

That will install the module and add the dependency to `package.json`. Now let’s edit `index.js` to add it:

*   CommonJS
*   ES modules
```
const express = require('express');  
const { createServer } = require('node:http');  
const { join } = require('node:path');  
const { Server } = require('socket.io');  
  
const app = express();  
const server = createServer(app);  
const io = new Server(server);  
  
app.get('/', (req, res) => {  
  res.sendFile(join(__dirname, 'index.html'));});  
  
io.on('connection', (socket) => {  
  console.log('a user connected');});  
  
server.listen(3000, () => {  
  console.log('server running at http://localhost:3000');});  
```
Notice that I initialize a new instance of `socket.io` by passing the `server` (the HTTP server) object. Then I listen on the `connection` event for incoming sockets and log it to the console.

Now in index.html add the following snippet before the `</body>` (end body tag):

*   ES6
*   ES5
```
<script src="/socket.io/socket.io.js"></script>  
<script>  
  const socket = io();</script>  
```
That’s all it takes to load the `socket.io-client`, which exposes an `io` global (and the endpoint `GET /socket.io/socket.io.js`), and then connect.

If you would like to use the local version of the client-side JS file, you can find it at `node_modules/socket.io/client-dist/socket.io.js`.

tip

You can also use a CDN instead of the local files (e.g. `<script src="https://cdn.socket.io/4.8.1/socket.io.min.js"></script>`).

Notice that I’m not specifying any URL when I call `io()`, since it defaults to trying to connect to the host that serves the page.

note

If you're behind a reverse proxy such as apache or nginx please take a look at [the documentation for it](_docs_v4_reverse-proxy_.md).

If you're hosting your app in a folder that is _not_ the root of your website (e.g., `https://example.com/chatapp`) then you also need to specify the [path](_docs_v4_server-options_.md#path) in both the server and the client.

If you now restart the process (by hitting Control+C and running `node index.js` again) and then refresh the webpage you should see the console print “a user connected”.

Try opening several tabs, and you’ll see several messages.

![A console displaying several messages, indicating that some users have connected](https://socket.io/images/chat-4.png)

Each socket also fires a special `disconnect` event:
```
io.on('connection', (socket) => {  
  console.log('a user connected');  socket.on('disconnect', () => {    console.log('user disconnected');  });});  
```
Then if you refresh a tab several times you can see it in action.

![A console displaying several messages, indicating that some users have connected and disconnected](https://socket.io/images/chat-5.png)

#### _docs_v4_tutorial_step-4.md

> Source: https://socket.io/docs/v4/tutorial/step-4
> Scraped: 4/14/2025, 11:55:36 PM

*   [](index.md)
*   Step #4: Emitting events

Version: 4.x

The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do, and [binary data](_blog_introducing-socket-io-1-0_.md#binary) is supported too.

Let’s make it so that when the user types in a message, the server gets it as a `chat message` event. The `script` section in `index.html` should now look as follows:

*   ES6
*   ES5
```
<script src="/socket.io/socket.io.js"></script>  
<script>  
  const socket = io();  
  const form = document.getElementById('form');  const input = document.getElementById('input');  
  form.addEventListener('submit', (e) => {    e.preventDefault();    if (input.value) {      socket.emit('chat message', input.value);      input.value = '';    }  });</script>  
```
And in `index.js` we print out the `chat message` event:
```
io.on('connection', (socket) => {  
  socket.on('chat message', (msg) => {    console.log('message: ' + msg);  });});  
```
The result should be like the following video:

[

Previous

Step #3: Integrating Socket.IO

](_docs_v4_tutorial_step-3.md)[

Next

Step #5: Broadcasting

](_docs_v4_tutorial_step-5.md)

#### _docs_v4_tutorial_step-5.md

> Source: https://socket.io/docs/v4/tutorial/step-5
> Scraped: 4/14/2025, 11:55:37 PM

The next goal is for us to emit the event from the server to the rest of the users.

In order to send an event to everyone, Socket.IO gives us the `io.emit()` method.
```
// this will emit the event to all connected sockets  
io.emit('hello', 'world'); 
```
If you want to send a message to everyone except for a certain emitting socket, we have the `broadcast` flag for emitting from that socket:
```
io.on('connection', (socket) => {  
  socket.broadcast.emit('hi');});  
```
In this case, for the sake of simplicity we’ll send the message to everyone, including the sender.
```
io.on('connection', (socket) => {  
  socket.on('chat message', (msg) => {    io.emit('chat message', msg);  });});  
```
And on the client side when we capture a `chat message` event we’ll include it in the page.

*   ES6
*   ES5
```
<script src="/socket.io/socket.io.js"></script>  
<script>  
  const socket = io();  
  const form = document.getElementById('form');  const input = document.getElementById('input');  const messages = document.getElementById('messages');  
  form.addEventListener('submit', (e) => {    e.preventDefault();    if (input.value) {      socket.emit('chat message', input.value);      input.value = '';    }  });  
  socket.on('chat message', (msg) => {    const item = document.createElement('li');    item.textContent = msg;    messages.appendChild(item);    window.scrollTo(0, document.body.scrollHeight);  });</script>  
```
Let's see it in action:

#### _docs_v4_tutorial_step-6.md

> Source: https://socket.io/docs/v4/tutorial/step-6
> Scraped: 4/14/2025, 11:55:39 PM

First, let's handle disconnections by pretending that there was no disconnection: this feature is called "Connection state recovery".

This feature will **temporarily** store all the events that are sent by the server and will try to restore the state of a client when it reconnects:

*   restore its rooms
*   send any missed events

It must be enabled on the server side:

index.js
```
const io = new Server(server, {  
  connectionStateRecovery: {}});  
```
Let's see it in action:

As you can see in the video above, the "realtime" message is eventually delivered when the connection is reestablished.

note

The "Disconnect" button was added for demonstration purposes.

Code

*   ES6
*   ES5
```
<form id="form" action="">  
  <input id="input" autocomplete="off" /><button>Send</button>  <button id="toggle-btn">Disconnect</button></form>  
  
<script>  
  const toggleButton = document.getElementById('toggle-btn');  
  toggleButton.addEventListener('click', (e) => {    e.preventDefault();    if (socket.connected) {      toggleButton.innerText = 'Connect';      socket.disconnect();    } else {      toggleButton.innerText = 'Disconnect';      socket.connect();    }  });</script>  
```
Great! Now, you may ask:

> But this is an awesome feature, why isn't this enabled by default?

There are several reasons for this:

*   it doesn't always work, for example if the server abruptly crashes or gets restarted, then the client state might not be saved
*   it is not always possible to enable this feature when scaling up

tip

That being said, it is indeed a great feature since you don't have to synchronize the state of the client after a temporary disconnection (for example, when the user switches from WiFi to 4G).

We will explore a more general solution in the next step.

#### _docs_v4_tutorial_step-7.md

> Source: https://socket.io/docs/v4/tutorial/step-7
> Scraped: 4/14/2025, 11:55:39 PM

Version: 4.x

There are two common ways to synchronize the state of the client upon reconnection:

*   either the server sends the whole state
*   or the client keeps track of the last event it has processed and the server sends the missing pieces

Both are totally valid solutions and choosing one will depend on your use case. In this tutorial, we will go with the latter.

First, let's persist the messages of our chat application. Today there are plenty of great options, we will use [SQLite](https://www.sqlite.org/) here.

tip

If you are not familiar with SQLite, there are plenty of tutorials available online, like [this one](https://www.sqlitetutorial.net/).

Let's install the necessary packages:

*   NPM
*   Yarn
*   pnpm
*   Bun
```
npm install sqlite sqlite3  
```
We will simply store each message in a SQL table:

*   CommonJS
*   ES modules

index.js
```
const express = require('express');  
const { createServer } = require('node:http');  
const { join } = require('node:path');  
const { Server } = require('socket.io');  
const sqlite3 = require('sqlite3');  
const { open } = require('sqlite');  
  
async function main() {  
  // open the database file  const db = await open({    filename: 'chat.db',    driver: sqlite3.Database  });  
  // create our 'messages' table (you can ignore the 'client_offset' column for now)  await db.exec(`    CREATE TABLE IF NOT EXISTS messages (        id INTEGER PRIMARY KEY AUTOINCREMENT,        client_offset TEXT UNIQUE,        content TEXT    );  `);  
  const app = express();  const server = createServer(app);  const io = new Server(server, {    connectionStateRecovery: {}  });  
  app.get('/', (req, res) => {    res.sendFile(join(__dirname, 'index.html'));  });  
  io.on('connection', (socket) => {    socket.on('chat message', async (msg) => {      let result;      try {        // store the message in the database        result = await db.run('INSERT INTO messages (content) VALUES (?)', msg);      } catch (e) {        // TODO handle the failure        return;      }      // include the offset with the message      io.emit('chat message', msg, result.lastID);    });  });  
  server.listen(3000, () => {    console.log('server running at http://localhost:3000');  });}  
  
main();  
```
The client will then keep track of the offset:

*   ES6
*   ES5

index.html
```
<script>  
  const socket = io({    auth: {      serverOffset: 0    }  });  
  const form = document.getElementById('form');  const input = document.getElementById('input');  const messages = document.getElementById('messages');  
  form.addEventListener('submit', (e) => {    e.preventDefault();    if (input.value) {      socket.emit('chat message', input.value);      input.value = '';    }  });  
  socket.on('chat message', (msg, serverOffset) => {    const item = document.createElement('li');    item.textContent = msg;    messages.appendChild(item);    window.scrollTo(0, document.body.scrollHeight);    socket.auth.serverOffset = serverOffset;  });</script>  
```
And finally the server will send the missing messages upon (re)connection:

index.js
```
// [...]  
  
io.on('connection', async (socket) => {  
  socket.on('chat message', async (msg) => {    let result;    try {      result = await db.run('INSERT INTO messages (content) VALUES (?)', msg);    } catch (e) {      // TODO handle the failure      return;    }    io.emit('chat message', msg, result.lastID);  });  
  if (!socket.recovered) {    // if the connection state recovery was not successful    try {      await db.each('SELECT id, content FROM messages WHERE id > ?',        [socket.handshake.auth.serverOffset || 0],        (_err, row) => {          socket.emit('chat message', row.content, row.id);        }      )    } catch (e) {      // something went wrong    }  }});  
  
// [...]  
```
Let's see it in action:

As you can see in the video above, it works both after a temporary disconnection and a full page refresh.

tip

The difference with the "Connection state recovery" feature is that a successful recovery might not need to hit your main database (it might fetch the messages from a Redis stream for example).

OK, now let's talk about the client delivery.

#### _docs_v4_tutorial_step-8.md

> Source: https://socket.io/docs/v4/tutorial/step-8
> Scraped: 4/14/2025, 11:55:39 PM

Let's see how we can make sure that the server always receives the messages sent by the clients.

info

By default, Socket.IO provides an "at most once" guarantee of delivery (also known as "fire and forget"), which means that there will be no retry in case the message does not reach the server.

When a client gets disconnected, any call to `socket.emit()` is buffered until reconnection:

In the video above, the "realtime" message is buffered until the connection is reestablished.

This behavior might be totally sufficient for your application. However, there are a few cases where a message could be lost:

*   the connection is severed while the event is being sent
*   the server crashes or get restarted while processing the event
*   the database is temporarily not available

We can implement an "at least once" guarantee:

*   manually with an acknowledgement:
```
function emit(socket, event, arg) {  
  socket.timeout(5000).emit(event, arg, (err) => {    if (err) {      // no ack from the server, let's retry      emit(socket, event, arg);    }  });}  
  
emit(socket, 'hello', 'world');  
```
*   or with the `retries` option:
```
const socket = io({  
  ackTimeout: 10000,  retries: 3});  
  
socket.emit('hello', 'world');  
```
In both cases, the client will retry to send the message until it gets an acknowledgement from the server:
```
io.on('connection', (socket) => {  
  socket.on('hello', (value, callback) => {    // once the event is successfully handled    callback();  });})  
```
tip

With the `retries` option, the order of the messages is guaranteed, as the messages are queued and sent one by one. This is not the case with the first option.

The problem with retries is that the server might now receive the same message multiple times, so it needs a way to uniquely identify each message, and only store it once in the database.

Let's see how we can implement an "exactly once" guarantee in our chat application.

We will start by assigning a unique identifier to each message on the client side:

*   ES6
*   ES5

index.html
```
<script>  
  let counter = 0;  
  const socket = io({    auth: {      serverOffset: 0    },    // enable retries    ackTimeout: 10000,    retries: 3,  });  
  const form = document.getElementById('form');  const input = document.getElementById('input');  const messages = document.getElementById('messages');  
  form.addEventListener('submit', (e) => {    e.preventDefault();    if (input.value) {      // compute a unique offset      const clientOffset = `${socket.id}-${counter++}`;      socket.emit('chat message', input.value, clientOffset);      input.value = '';    }  });  
  socket.on('chat message', (msg, serverOffset) => {    const item = document.createElement('li');    item.textContent = msg;    messages.appendChild(item);    window.scrollTo(0, document.body.scrollHeight);    socket.auth.serverOffset = serverOffset;  });</script>  
```
note

The `socket.id` attribute is a random 20-characters identifier which is assigned to each connection.

We could also have used [`getRandomValues()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) to generate a unique offset.

And then we store this offset alongside the message on the server side:

index.js
```
// [...]  
  
io.on('connection', async (socket) => {  
  socket.on('chat message', async (msg, clientOffset, callback) => {    let result;    try {      result = await db.run('INSERT INTO messages (content, client_offset) VALUES (?, ?)', msg, clientOffset);    } catch (e) {      if (e.errno === 19 /* SQLITE_CONSTRAINT */ ) {        // the message was already inserted, so we notify the client        callback();      } else {        // nothing to do, just let the client retry      }      return;    }    io.emit('chat message', msg, result.lastID);    // acknowledge the event    callback();  });  
  if (!socket.recovered) {    try {      await db.each('SELECT id, content FROM messages WHERE id > ?',        [socket.handshake.auth.serverOffset || 0],        (_err, row) => {          socket.emit('chat message', row.content, row.id);        }      )    } catch (e) {      // something went wrong    }  }});  
  
// [...]  
```
This way, the UNIQUE constraint on the `client_offset` column prevents the duplication of the message.

caution

Do not forget to acknowledge the event, or else the client will keep retrying (up to `retries` times).
```
socket.on('chat message', async (msg, clientOffset, callback) => {  
  // ... and finally  callback();});  
```
info

Again, the default guarantee ("at most once") might be sufficient for your application, but now you know how it can be made more reliable.

In the next step, we will see how we can scale our application horizontally.

#### _docs_v4_tutorial_step-9.md

> Source: https://socket.io/docs/v4/tutorial/step-9
> Scraped: 4/14/2025, 11:55:39 PM

Version: 4.x

Now that our application is resilient to temporary network interruptions, let's see how we can horizontally scale it in order to be able to support thousands of concurrent clients.

note

*   Horizontal scaling (also known as "scaling out") means adding new servers to your infrastructure to cope with new demands
*   Vertical scaling (also known as "scaling up") means adding more resources (processing power, memory, storage, ...) to your existing infrastructure

First step: let's use all the available cores of the host. By default, Node.js runs your Javascript code in a single thread, which means that even with a 32-core CPU, only one core will be used. Fortunately, the Node.js [`cluster` module](https://nodejs.org/api/cluster.html#cluster) provides a convenient way to create one worker thread per core.

We will also need a way to forward events between the Socket.IO servers. We call this component an "Adapter".

![The 'hello' event is forwarded to the other servers](https://socket.io/images/tutorial/adapter.png)![The 'hello' event is forwarded to the other servers](https://socket.io/images/tutorial/adapter-dark.png)

So let's install the cluster adapter:

*   NPM
*   Yarn
*   pnpm
*   Bun
```
npm install @socket.io/cluster-adapter  
```
Now we plug it in:

*   CommonJS
*   ES modules

index.js
```
const express = require('express');  
const { createServer } = require('node:http');  
const { join } = require('node:path');  
const { Server } = require('socket.io');  
const sqlite3 = require('sqlite3');  
const { open } = require('sqlite');  
const { availableParallelism } = require('node:os');  
const cluster = require('node:cluster');  
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');  
  
if (cluster.isPrimary) {  
  const numCPUs = availableParallelism();  // create one worker per available core  for (let i = 0; i < numCPUs; i++) {    cluster.fork({      PORT: 3000 + i    });  }    // set up the adapter on the primary thread  
  return setupPrimary();}  
  
async function main() {  
  const app = express();  const server = createServer(app);  const io = new Server(server, {    connectionStateRecovery: {},    // set up the adapter on each worker thread    adapter: createAdapter()  });  
  // [...]  
  // each worker will listen on a distinct port  const port = process.env.PORT;  
  server.listen(port, () => {    console.log(`server running at http://localhost:${port}`);  });}  
  
main();  
```
That's it! This will spawn one worker thread per CPU available on your machine. Let's see it in action:

As you can see in the address bar, each browser tab is connected to a different Socket.IO server, and the adapter is simply forwarding the `chat message` events between them.

note

In most cases, you would also need to ensure that all the HTTP requests of a Socket.IO session reach the same server (also known as "sticky session"). This is not needed here though, as each Socket.IO server has its own port.

More information [here](_docs_v4_using-multiple-nodes_.md).

And that finally completes our chat application! In this tutorial, we have seen how to:

*   send an event between the client and the server
*   broadcast an event to all or a subset of connected clients
*   handle temporary disconnections
*   scale out

You should now have a better overview of the features provided by Socket.IO. Now it's your time to build your own realtime application!

#### _docs_v4_typescript.md

> Source: https://socket.io/docs/v4/typescript
> Scraped: 4/14/2025, 11:55:31 PM

Starting with v3, Socket.IO now has first class support for [TypeScript](https://www.typescriptlang.org/).

First, declare some types:
```
interface ServerToClientEvents {  
  noArg: () => void;  basicEmit: (a: number, b: string, c: Buffer) => void;  withAck: (d: string, callback: (e: number) => void) => void;}  
  
interface ClientToServerEvents {  
  hello: () => void;}  
  
interface InterServerEvents {  
  ping: () => void;}  
  
interface SocketData {  
  name: string;  age: number;}  
```
And use them when creating your server:
```
const io = new Server<  
  ClientToServerEvents,  ServerToClientEvents,  InterServerEvents,  SocketData>();  
```
Then, profit from the help of your IDE!

The events declared in the `ServerToClientEvents` interface are used when sending and broadcasting events:
```
io.on("connection", (socket) => {  
  socket.emit("noArg");  socket.emit("basicEmit", 1, "2", Buffer.from([3]));  socket.emit("withAck", "4", (e) => {    // e is inferred as number  });  
  // works when broadcast to all  io.emit("noArg");  
  // works when broadcasting to a room  io.to("room1").emit("basicEmit", 1, "2", Buffer.from([3]));});  
```
The ones declared in the `ClientToServerEvents` interface are used when receiving events:
```
io.on("connection", (socket) => {  
  socket.on("hello", () => {    // ...  });});  
```
The ones declared in the `InterServerEvents` interface are used for inter-server communication (added in `socket.io@4.1.0`):
```
io.serverSideEmit("ping");  
  
io.on("ping", () => {  
  // ...});  
```
And finally, the `SocketData` type is used to type the `socket.data` attribute (added in `socket.io@4.4.0`):
```
io.on("connection", (socket) => {  
  socket.data.name = "john";  socket.data.age = 42;});  
```
caution

These type hints do not replace proper validation/sanitization of the input. As usual, never trust user input.

On the client side, you can reuse the same `ServerToClientEvents` and `ClientToServerEvents` interfaces:
```
import { io, Socket } from "socket.io-client";  
  
// please note that the types are reversed  
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();  
```
Similarly, the events declared in the `ClientToServerEvents` interface are used when sending events:

And the ones declared in `ServerToClientEvents` are used when receiving events:
```
socket.on("noArg", () => {  
  // ...});  
  
socket.on("basicEmit", (a, b, c) => {  
  // a is inferred as number, b as string and c as buffer});  
  
socket.on("withAck", (d, callback) => {  
  // d is inferred as string and callback as a function that takes a number as argument});  
```
Since each [Namespace](_docs_v4_namespaces_.md) can have its own set of events, you can also provide some types for each one of them:
```
import { Server } from "socket.io";  
  
// types for the main namespace  
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();  
  
// types for the namespace named "/my-namespace"  
interface NamespaceSpecificClientToServerEvents {  
  foo: (arg: string) => void}  
  
interface NamespaceSpecificServerToClientEvents {  
  bar: (arg: string) => void;}  
  
interface NamespaceSpecificInterServerEvents {  
  // ...}  
  
interface NamespaceSpecificSocketData {  
  // ...}  
  
const myNamespace: Namespace<  
  NamespaceSpecificClientToServerEvents,  NamespaceSpecificServerToClientEvents,  NamespaceSpecificInterServerEvents,  NamespaceSpecificSocketData  > = io.of("/my-namespace");  
myNamespace.on("connection", (socket) => {  
  socket.on("foo", () => {    // ...  });  
  socket.emit("bar", "123");});  
```
And on the client side:
```
import { io, Socket } from "socket.io-client";  
  
const socket: Socket<  
  NamespaceSpecificServerToClientEvents,  NamespaceSpecificClientToServerEvents  > = io("/my-namespace");  
socket.on("bar", (arg) => {  
  console.log(arg); // "123"});  
```

#### _docs_v4_using-multiple-nodes.md

> Source: https://socket.io/docs/v4/using-multiple-nodes
> Scraped: 4/14/2025, 11:55:32 PM

When deploying multiple Socket.IO servers, there are two things to take care of:

*   enabling sticky session, if HTTP long-polling is enabled (which is the default): see [below](_docs_v4_using-multiple-nodes.md#enabling-sticky-session)
*   using a compatible adapter, see [here](_docs_v4_adapter_.md)

If you plan to distribute the load of connections among different processes or machines, you have to make sure that all requests associated with a particular session ID reach the process that originated them.

### Why is sticky-session required[​](_docs_v4_using-multiple-nodes.md#why-is-sticky-session-required)

This is because the HTTP long-polling transport sends multiple HTTP requests during the lifetime of the Socket.IO session.

In fact, Socket.IO could technically work without sticky sessions, with the following synchronization (in dashed lines):

![Using multiple nodes without sticky sessions](https://socket.io/images/mutiple-nodes-no-sticky.png)![Using multiple nodes without sticky sessions](https://socket.io/images/multiple-nodes-no-sticky-dark.png)

While obviously possible to implement, we think that this synchronization process between the Socket.IO servers would result in a big performance hit for your application.

Remarks:

*   without enabling sticky-session, you will experience HTTP 400 errors due to "Session ID unknown"
*   the WebSocket transport does not have this limitation, since it relies on a single TCP connection for the whole session. Which means that if you disable the HTTP long-polling transport (which is a perfectly valid choice in 2021), you won't need sticky sessions:
```
const socket = io("https://io.yourhost.com", {  
  // WARNING: in that case, there is no fallback to long-polling  transports: [ "websocket" ] // or [ "websocket", "polling" ] (the order matters)});  
```
Documentation: [`transports`](_docs_v4_client-options_.md#transports)

### Enabling sticky-session[​](_docs_v4_using-multiple-nodes.md#enabling-sticky-session)

To achieve sticky-session, there are two main solutions:

*   routing clients based on a cookie (recommended solution)
*   routing clients based on their originating address

You will find below some examples with common load-balancing solutions:

* [nginx](_docs_v4_using-multiple-nodes.md#nginx-configuration) (IP-based)
* [nginx Ingress (Kubernetes)](_docs_v4_using-multiple-nodes.md#nginx-ingress-kubernetes) (IP-based)
* [Apache HTTPD](_docs_v4_using-multiple-nodes.md#apache-httpd-configuration) (cookie-based)
* [HAProxy](_docs_v4_using-multiple-nodes.md#haproxy-configuration) (cookie-based)
* [Traefik](_docs_v4_using-multiple-nodes.md#traefik) (cookie-based)
* [Node.js `cluster` module](_docs_v4_using-multiple-nodes.md#using-nodejs-cluster)

For other platforms, please refer to the relevant documentation:

*   Kubernetes: [https://kubernetes.github.io/ingress-nginx/examples/affinity/cookie/](https://kubernetes.github.io/ingress-nginx/examples/affinity/cookie/)
*   AWS (Application Load Balancers): [https://docs.aws.amazon.com/elasticloadbalancing/latest/application/sticky-sessions.html](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/sticky-sessions.html)
*   GCP: [https://cloud.google.com/load-balancing/docs/backend-service#session\_affinity](https://cloud.google.com/load-balancing/docs/backend-service#session_affinity)
*   Heroku: [https://devcenter.heroku.com/articles/session-affinity](https://devcenter.heroku.com/articles/session-affinity)

**Important note**: if you are in a CORS situation (the front domain is different from the server domain) and session affinity is achieved with a cookie, you need to allow credentials:

_Server_
```
const io = require("socket.io")(httpServer, {  
  cors: {    origin: "https://front-domain.com",    methods: ["GET", "POST"],    credentials: true  }});  
```
_Client_
```
const io = require("socket.io-client");  
const socket = io("https://server-domain.com", {  
  withCredentials: true});  
```
Without it, the cookie will not be sent by the browser and you will experience HTTP 400 "Session ID unknown" responses. More information [here](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).

### nginx configuration[​](_docs_v4_using-multiple-nodes.md#nginx-configuration)

Within the `http { }` section of your `nginx.conf` file, you can declare a `upstream` section with a list of Socket.IO process you want to balance load between:
```
http {  
  server {    listen 3000;    server_name io.yourhost.com;  
    location / {      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;      proxy_set_header Host $host;  
      proxy_pass http://nodes;  
      # enable WebSockets      proxy_http_version 1.1;      proxy_set_header Upgrade $http_upgrade;      proxy_set_header Connection "upgrade";    }  }  

  upstream nodes {    # enable sticky session with either "hash" (uses the complete IP address)    hash $remote_addr consistent;    # or "ip_hash" (uses the first three octets of the client IPv4 address, or the entire IPv6 address)    # ip_hash;    # or "sticky" (needs commercial subscription)    # sticky cookie srv_id expires=1h domain=.example.com path=/;  

    server app01:3000;    server app02:3000;    server app03:3000;  }}  
```
Notice the `hash` instruction that indicates the connections will be sticky.

Make sure you also configure `worker_processes` in the topmost level to indicate how many workers nginx should use. You might also want to look into tweaking the `worker_connections` setting within the `events { }` block.

Links:

* [Example](https://github.com/socketio/socket.io/tree/main/examples/cluster-nginx)
* [nginx Documentation](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#hash)

caution

The value of nginx's [`proxy_read_timeout`](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_read_timeout) (60 seconds by default) must be bigger than Socket.IO's [`pingInterval + pingTimeout`](_docs_v4_server-options_.md#pinginterval) (45 seconds by default), else nginx will forcefully close the connection if no data is sent after the given delay and the client will get a "transport close" error.

### nginx Ingress (Kubernetes)[​](_docs_v4_using-multiple-nodes.md#nginx-ingress-kubernetes)

Within the `annotations` section of your Ingress configuration, you can declare an upstream hashing based on the client's IP address, so that the Ingress controller always assigns the requests from a given IP address to the same pod:
```
apiVersion: networking.k8s.io/v1  
kind: Ingress  
metadata:  
  name: your-ingress  namespace: your-namespace  annotations:    nginx.ingress.kubernetes.io/configuration-snippet: |      set $forwarded_client_ip "";      if ($http_x_forwarded_for ~ "^([^,]+)") {        set $forwarded_client_ip $1;      }      set $client_ip $remote_addr;      if ($forwarded_client_ip != "") {        set $client_ip $forwarded_client_ip;      }    nginx.ingress.kubernetes.io/upstream-hash-by: "$client_ip"spec:  
  ingressClassName: nginx  rules:    - host: io.yourhost.com      http:        paths:          - path: /            pathType: Prefix            backend:              service:                name: your-service                port:                  number: 80
```
Notes:

*   `nginx.ingress.kubernetes.io/upstream-hash-by: "$client_ip"`

This annotation instructs the NGINX Ingress Controller to use the client's IP address for routing incoming traffic to a specific Pod in your Kubernetes cluster. This is crucial for maintaining sticky sessions.

*   `nginx.ingress.kubernetes.io/configuration-snippet`

This custom NGINX configuration snippet serves a dual purpose:

1.  If the request passes through upstream reverse proxies or API gateways that append an `X-Forwarded-For` header, this snippet extracts the first IP address from that header and uses it to update the $client\_ip.
    
2.  In the absence of such proxies or gateways, the snippet simply uses the remote\_addr, which is the IP address of the client directly connected to the ingress.
    

This ensures that the correct client IP is used for the sticky session logic, enabled by the `nginx.ingress.kubernetes.io/upstream-hash-by: "$client_ip"` annotation. The snippet is particularly important when your architecture includes upstream network components like reverse proxies or API gateways.

Links:

* [Ingress Nginx Documentation](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#custom-nginx-upstream-hashing)
* [X-Forwarded-For Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)

### Apache HTTPD configuration[​](_docs_v4_using-multiple-nodes.md#apache-httpd-configuration)
```
Header add Set-Cookie "SERVERID=sticky.%{BALANCER_WORKER_ROUTE}e; path=/" env=BALANCER_ROUTE_CHANGED  
  
<Proxy "balancer://nodes_polling">  
    BalancerMember "http://app01:3000" route=app01    BalancerMember "http://app02:3000" route=app02    BalancerMember "http://app03:3000" route=app03    ProxySet stickysession=SERVERID</Proxy>  
  
<Proxy "balancer://nodes_ws">  
    BalancerMember "ws://app01:3000" route=app01    BalancerMember "ws://app02:3000" route=app02    BalancerMember "ws://app03:3000" route=app03    ProxySet stickysession=SERVERID</Proxy>  
  
RewriteEngine On  
RewriteCond %{HTTP:Upgrade} =websocket [NC]  
RewriteRule /(.*) balancer://nodes_ws/$1 [P,L]  
RewriteCond %{HTTP:Upgrade} !=websocket [NC]  
RewriteRule /(.*) balancer://nodes_polling/$1 [P,L]  
  
# must be bigger than pingInterval (25s by default) + pingTimeout (20s by default)  

ProxyTimeout 60  
```
Links:

* [Example](https://github.com/socketio/socket.io/tree/main/examples/cluster-httpd)
* [Documentation](https://httpd.apache.org/docs/2.4/en/mod/mod_proxy.html#proxypass)

### HAProxy configuration[​](_docs_v4_using-multiple-nodes.md#haproxy-configuration)
```
# Reference: http://blog.haproxy.com/2012/11/07/websockets-load-balancing-with-haproxy/  

  
listen chat  
  bind *:80  default_backend nodes  
backend nodes  
  option httpchk HEAD /health  http-check expect status 200  cookie io prefix indirect nocache # using the `io` cookie set upon handshake  server app01 app01:3000 check cookie app01  server app02 app02:3000 check cookie app02  server app03 app03:3000 check cookie app03
```
Links:

* [Example](https://github.com/socketio/socket.io/tree/main/examples/cluster-haproxy)
* [Documentation](http://cbonte.github.io/haproxy-dconv/2.4/configuration.html#cookie)

### Traefik[​](_docs_v4_using-multiple-nodes.md#traefik)

Using container labels:
```
# docker-compose.yml  

services:  
  traefik:    image: traefik:2.4    volumes:      - /var/run/docker.sock:/var/run/docker.sock    links:      - server  
  server:    image: my-image:latest    labels:      - "traefik.http.routers.my-service.rule=PathPrefix(`/`)"      - traefik.http.services.my-service.loadBalancer.sticky.cookie.name=server_id      - traefik.http.services.my-service.loadBalancer.sticky.cookie.httpOnly=true
```
With the [File provider](https://doc.traefik.io/traefik/v2.0/providers/file/):
```
## Dynamic configuration  

http:  
  services:    my-service:      rule: "PathPrefix(`/`)"      loadBalancer:        sticky:          cookie:            name: server_id            httpOnly: true
```
Links:

* [Example](https://github.com/socketio/socket.io/tree/main/examples/cluster-traefik)
* [Documentation](https://doc.traefik.io/traefik/v2.0/routing/services/#sticky-sessions)

### Using Node.js Cluster[​](_docs_v4_using-multiple-nodes.md#using-nodejs-cluster)

Just like nginx, Node.js comes with built-in clustering support through the `cluster` module.

There are several solutions, depending on your use case:

NPM package

How it works

[`@socket.io/sticky`](https://github.com/darrachequesne/socket.io-sticky)

the routing is based on the `sid` query parameter

[`sticky-session`](https://github.com/indutny/sticky-session)

the routing is based on `connection.remoteAddress`

[`socketio-sticky-session`](https://github.com/wzrdtales/socket-io-sticky-session)

the routing based on the `x-forwarded-for` header)

Example with `@socket.io/sticky`:
```
const cluster = require("cluster");  
const http = require("http");  
const { Server } = require("socket.io");  
const numCPUs = require("os").cpus().length;  
const { setupMaster, setupWorker } = require("@socket.io/sticky");  
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");  
  
if (cluster.isMaster) {  
  console.log(`Master ${process.pid} is running`);  
  const httpServer = http.createServer();  
  // setup sticky sessions  setupMaster(httpServer, {    loadBalancingMethod: "least-connection",  });  
  // setup connections between the workers  setupPrimary();  
  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)  // Node.js < 16.0.0  cluster.setupMaster({    serialization: "advanced",  });  // Node.js > 16.0.0  // cluster.setupPrimary({  //   serialization: "advanced",  // });  
  httpServer.listen(3000);  
  for (let i = 0; i < numCPUs; i++) {    cluster.fork();  }  
  cluster.on("exit", (worker) => {    console.log(`Worker ${worker.process.pid} died`);    cluster.fork();  });} else {  
  console.log(`Worker ${process.pid} started`);  
  const httpServer = http.createServer();  const io = new Server(httpServer);  
  // use the cluster adapter  io.adapter(createAdapter());  
  // setup connection with the primary process  setupWorker(io);  
  io.on("connection", (socket) => {    /* ... */  });}  
```
Now that you have multiple Socket.IO nodes accepting connections, if you want to broadcast events to all clients (or to the clients in a certain [room](_docs_v4_rooms_.md)) you’ll need some way of passing messages between processes or computers.

The interface in charge of routing messages is what we call the [Adapter](_docs_v4_adapter_.md).

