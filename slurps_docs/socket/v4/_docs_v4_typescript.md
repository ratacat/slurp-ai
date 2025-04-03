---
url: https://socket.io/docs/v4/typescript
scrapeDate: 2025-04-03T05:03:01.218Z
library: v4

exactVersionMatch: false
---

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