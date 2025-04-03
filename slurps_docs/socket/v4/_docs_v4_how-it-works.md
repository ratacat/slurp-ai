---
url: https://socket.io/docs/v4/how-it-works
scrapeDate: 2025-04-03T05:03:00.199Z
library: v4

exactVersionMatch: false
---

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