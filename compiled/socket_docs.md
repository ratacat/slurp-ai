# Compiled Documentation

Generated on 2025-04-03T05:03:02.064Z

### v4

#### _docs_v4.md

> Source: https://socket.io/docs/v4
> Scraped: 4/2/2025, 11:03:00 PM

tip

If you are new to Socket.IO, we recommend checking out our [tutorial](_docs_v4_tutorial_introduction.md).

Socket.IO is a library that enables **low-latency**, **bidirectional** and **event-based** communication between a client and a server.

![Diagram of a communication between a server and a client](https://socket.io/images/bidirectional-communication2.png)![Diagram of a communication between a server and a client](https://socket.io/images/bidirectional-communication2-dark.png)

The Socket.IO connection can be established with different low-level transports:
*   HTTP long-polling
*   [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
*   [WebTransport](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API)

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
*   [Get started example](_get-started_chat.md)
*   [Server installation](_docs_v4_server-installation_.md)
*   [Client installation](_docs_v4_client-installation_.md)

#### _docs_v4_.md

> Source: https://socket.io/docs/v4/
> Scraped: 4/2/2025, 11:02:57 PM

tip

If you are new to Socket.IO, we recommend checking out our [tutorial](_docs_v4_tutorial_introduction.md).

Socket.IO is a library that enables **low-latency**, **bidirectional** and **event-based** communication between a client and a server.

![Diagram of a communication between a server and a client](https://socket.io/images/bidirectional-communication2.png)![Diagram of a communication between a server and a client](https://socket.io/images/bidirectional-communication2-dark.png)

The Socket.IO connection can be established with different low-level transports:
*   HTTP long-polling
*   [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
*   [WebTransport](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API)

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
*   [Get started example](_get-started_chat.md)
*   [Server installation](_docs_v4_server-installation_.md)
*   [Client installation](_docs_v4_client-installation_.md)

#### _docs_v4_broadcasting-events.md

> Source: https://socket.io/docs/v4/broadcasting-events
> Scraped: 4/2/2025, 11:03:01 PM

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
> Scraped: 4/2/2025, 11:03:00 PM

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

#### _docs_v4_client-api.md

> Source: https://socket.io/docs/v4/client-api
> Scraped: 4/2/2025, 11:02:59 PM

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
*   [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)

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
*   [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

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
*   [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

Whether the socket is currently connected to the server.
```
const socket = io();  
  
console.log(socket.connected); // false  
  
socket.on("connect", () => {  
  console.log(socket.connected); // true});  
```
#### socket.disconnected[​](_docs_v4_client-api.md#socketdisconnected)
*   [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

Whether the socket is currently disconnected from the server.
```
const socket = io();  
  
console.log(socket.disconnected); // true  
  
socket.on("connect", () => {  
  console.log(socket.disconnected); // false});  
```
#### socket.id[​](_docs_v4_client-api.md#socketid)
*   [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)

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
*   [`<Manager>`](_docs_v4_client-api.md#manager)

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
*   [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

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

#### _docs_v4_client-installation.md

> Source: https://socket.io/docs/v4/client-installation
> Scraped: 4/2/2025, 11:03:01 PM

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
*   [v2 to v3](_docs_v4_migrating-from-2-x-to-3-0_.md)
*   [v3 to v4](_docs_v4_migrating-from-3-x-to-4-0_.md)

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
> Scraped: 4/2/2025, 11:03:01 PM

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

#### _docs_v4_connection-state-recovery.md

> Source: https://socket.io/docs/v4/connection-state-recovery
> Scraped: 4/2/2025, 11:03:00 PM

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

#### _docs_v4_delivery-guarantees.md

> Source: https://socket.io/docs/v4/delivery-guarantees
> Scraped: 4/2/2025, 11:03:00 PM

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
*   [`socket.auth`](_docs_v4_client-options_.md#socket-options) (client)
*   [`socket.handshake`](_docs_v4_server-api_.md#sockethandshake) (server)

#### _docs_v4_emit-cheatsheet.md

> Source: https://socket.io/docs/v4/emit-cheatsheet
> Scraped: 4/2/2025, 11:03:00 PM

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

#### _docs_v4_how-it-works.md

> Source: https://socket.io/docs/v4/how-it-works
> Scraped: 4/2/2025, 11:03:00 PM

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
*   [HTTP long-polling](_docs_v4_how-it-works.md#http-long-polling)
*   [WebSocket](_docs_v4_how-it-works.md#websocket)

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
*   [packet buffering](_docs_v4_client-offline-behavior_.md#buffered-events)
*   [acknowledgments](_docs_v4_emitting-events_.md#acknowledgements)
*   broadcasting [to all clients](_docs_v4_broadcasting-events_.md) or [to a subset of clients](_docs_v4_rooms_.md) (what we call "Room")
*   [multiplexing](_docs_v4_namespaces_.md) (what we call "Namespace")

A detailed version of the Socket.IO protocol can be found [here](_docs_v4_socket-io-protocol_.md).

The source code of the reference implementation (written in TypeScript) can be found here:
*   server: [https://github.com/socketio/socket.io](https://github.com/socketio/socket.io)
*   client: [https://github.com/socketio/socket.io-client](https://github.com/socketio/socket.io-client)
*   parser: [https://github.com/socketio/socket.io-parser](https://github.com/socketio/socket.io-parser)

#### _docs_v4_logging-and-debugging.md

> Source: https://socket.io/docs/v4/logging-and-debugging
> Scraped: 4/2/2025, 11:03:00 PM

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
> Scraped: 4/2/2025, 11:03:01 PM

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
*   [Load testing](_docs_v4_load-testing_.md)
*   [Performance tuning](_docs_v4_performance-tuning_.md)

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

#### _docs_v4_rooms.md

> Source: https://socket.io/docs/v4/rooms
> Scraped: 4/2/2025, 11:03:01 PM

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
> Scraped: 4/2/2025, 11:02:59 PM

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
*   [`<Namespace>`](_docs_v4_server-api.md#namespace)

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
*   [`connection`](_docs_v4_server-api.md#event-connection)
*   [`new_namespace`](_docs_v4_server-api.md#event-new_namespace)
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
*   [`<Adapter>`](_docs_v4_adapter_.md)

The ["Adapter"](_docs_v4_glossary_.md#adapter) used for the namespace.

**Note:** the adapter of the main namespace can be accessed with `io.of("/").adapter`.

More information about it [here](_docs_v4_adapter_.md).
```
const adapter = io.of("/my-namespace").adapter;  
```
#### namespace.name[​](_docs_v4_server-api.md#namespacename)
*   [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)

The namespace identifier property.

#### namespace.sockets[​](_docs_v4_server-api.md#namespacesockets)
*   [`Map<SocketId, Socket>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

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
*   [`<Client>`](_docs_v4_server-api.md#client)

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
*   [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

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
*   [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)

A unique identifier for the session, that comes from the underlying `Client`.

caution

The `id` attribute is an **ephemeral** ID that is not meant to be used in your application (or only for debugging purposes) because:
*   this ID is regenerated after each reconnection (for example when the WebSocket connection is severed, or when the user refreshes the page)
*   two different browser tabs will have two different IDs
*   there is no message queue stored for a given ID on the server (i.e. if the client is disconnected, the messages sent from the server to this ID are lost)

Please use a regular session ID instead (either sent in a cookie, or stored in the localStorage and sent in the [`auth`](_docs_v4_client-options_.md#auth) payload).

#### socket.recovered[​](_docs_v4_server-api.md#socketrecovered)

_Added in v4.6.0_
*   [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)

Whether the connection state was successfully recovered during the last reconnection.
```
io.on("connection", (socket) => {  
  if (socket.recovered) {    // recovery was successful: socket.id, socket.rooms and socket.data were restored  } else {    // new or unrecoverable session  }});  
```
More information about this feature [here](_docs_v4_connection-state-recovery.md).

#### socket.request[​](_docs_v4_server-api.md#socketrequest)
*   [`<http.IncomingMessage>`](https://nodejs.org/api/http.html#class-httpincomingmessage)

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
*   [`Set<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

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
*   [`<http.IncomingMessage>`](https://nodejs.org/api/http.html#class-httpincomingmessage)

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
*   [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type)

The number of currently connected clients.
```
const count = io.engine.clientsCount;  
// may or may not be similar to the count of Socket instances in the main namespace, depending on your usage  
const count2 = io.of("/").sockets.size;  
```
### Methods[​](_docs_v4_server-api.md#methods-3)

#### engine.generateId[​](_docs_v4_server-api.md#enginegenerateid)
*   [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

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
*   [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

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

#### _docs_v4_server-installation.md

> Source: https://socket.io/docs/v4/server-installation
> Scraped: 4/2/2025, 11:03:01 PM

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
*   [bufferutil](https://www.npmjs.com/package/bufferutil): Allows to efficiently perform operations such as masking and unmasking the data payload of the WebSocket frames.
*   [utf-8-validate](https://www.npmjs.com/package/utf-8-validate): Allows to efficiently check if a message contains valid UTF-8 as required by the spec.

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

#### _docs_v4_testing.md

> Source: https://socket.io/docs/v4/testing
> Scraped: 4/2/2025, 11:03:01 PM

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
> Scraped: 4/2/2025, 11:03:00 PM

tip

The [Admin UI](_docs_v4_admin-ui_.md) can give you additional insights about the status of your Socket.IO deployment.

Common/known issues:
*   [the socket is not able to connect](_docs_v4_troubleshooting-connection-issues.md#problem-the-socket-is-not-able-to-connect)
*   [the socket gets disconnected](_docs_v4_troubleshooting-connection-issues.md#problem-the-socket-gets-disconnected)
*   [the socket is stuck in HTTP long-polling](_docs_v4_troubleshooting-connection-issues.md#problem-the-socket-is-stuck-in-http-long-polling)

Other common gotchas:
*   [Duplicate event registration](_docs_v4_troubleshooting-connection-issues.md#duplicate-event-registration)
*   [Delayed event handler registration](_docs_v4_troubleshooting-connection-issues.md#delayed-event-handler-registration)
*   [Usage of the `socket.id` attribute](_docs_v4_troubleshooting-connection-issues.md#usage-of-the-socketid-attribute)
*   [Deployment on a serverless platform](_docs_v4_troubleshooting-connection-issues.md#deployment-on-a-serverless-platform)

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
*   [https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections](https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections)
*   [https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html)

#### _docs_v4_tutorial_introduction.md

> Source: https://socket.io/docs/v4/tutorial/introduction
> Scraped: 4/2/2025, 11:02:59 PM

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

#### _docs_v4_typescript.md

> Source: https://socket.io/docs/v4/typescript
> Scraped: 4/2/2025, 11:03:01 PM

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

