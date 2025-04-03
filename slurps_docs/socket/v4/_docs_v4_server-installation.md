---
url: https://socket.io/docs/v4/server-installation
scrapeDate: 2025-04-03T05:03:01.991Z
library: v4

exactVersionMatch: false
---

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