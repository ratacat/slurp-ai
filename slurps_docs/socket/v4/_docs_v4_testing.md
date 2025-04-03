---
url: https://socket.io/docs/v4/testing
scrapeDate: 2025-04-03T05:03:01.571Z
library: v4

exactVersionMatch: false
---

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