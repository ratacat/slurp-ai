---
url: https://socket.io/docs/v4/client-offline-behavior
scrapeDate: 2025-04-03T05:03:01.889Z
library: v4

exactVersionMatch: false
---

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