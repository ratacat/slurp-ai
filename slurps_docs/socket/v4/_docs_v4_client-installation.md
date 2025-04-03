---
url: https://socket.io/docs/v4/client-installation
scrapeDate: 2025-04-03T05:03:01.991Z
library: v4

exactVersionMatch: false
---

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