---
url: https://socket.io/docs/v4/emit-cheatsheet
scrapeDate: 2025-04-03T05:03:00.331Z
library: v4

exactVersionMatch: false
---

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