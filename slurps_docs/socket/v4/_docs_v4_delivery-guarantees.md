---
url: https://socket.io/docs/v4/delivery-guarantees
scrapeDate: 2025-04-03T05:03:00.179Z
library: v4

exactVersionMatch: false
---

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