# Compiled Documentation

Generated on 2025-04-13T09:24:08.062Z

### 0

#### _docs_0.15.md

> Source: https://moleculer.services/docs/0.15
> Scraped: 4/13/2025, 3:24:01 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/index.md)

Moleculer is a fast, modern and powerful microservices framework for [Node.js](https://nodejs.org/en/). It helps you to build efficient, reliable & scalable services. Moleculer provides many features for building and managing your microservices.

## [](_docs_0.15.md#Features)Features

*   Promise-based solution (async/await compatible)
*   request-reply concept
*   support event driven architecture with balancing
*   built-in service registry & dynamic service discovery
*   load balanced requests & events (round-robin, random, cpu-usage, latency, sharding)
*   many fault tolerance features (Circuit Breaker, Bulkhead, Retry, Timeout, Fallback)
*   plugin/middleware system
*   support versioned services
*   support [Stream](https://nodejs.org/dist/latest-v10.x/docs/api/stream.html)s
*   service mixins
*   built-in caching solution (Memory, MemoryLRU, Redis)
*   pluggable loggers (Console, File, Pino, Bunyan, Winston, Debug, Datadog, Log4js)
*   pluggable transporters (TCP, NATS, MQTT, Redis, NATS Streaming, Kafka, AMQP 0.9, AMQP 1.0)
*   pluggable serializers (JSON, Avro, MsgPack, Protocol Buffer, Thrift)
*   pluggable parameter validator
*   multiple services on a node/server
*   master-less architecture, all nodes are equal
*   parameter validation with [fastest-validator](https://github.com/icebob/fastest-validator)
*   built-in metrics feature with reporters (Console, CSV, Datadog, Event, Prometheus, StatsD)
*   built-in tracing feature with exporters (Console, Datadog, Event, Jaeger, Zipkin)
*   official [API gateway](https://github.com/moleculerjs/moleculer-web), [Database access](https://github.com/moleculerjs/moleculer-db) and many other modules…

## [](_docs_0.15.md#How-fast)How fast?

We spent a lot of hours to improve the performance of Moleculer and create the fastest microservices framework for Node.js.

[![Benchmark local](https://moleculer.services/docs/assets/benchmark/benchmark_local.svg)](http://cloud.highcharts.com/show/utideti)  
[![Benchmark remote](https://moleculer.services/docs/assets/benchmark/benchmark_remote.svg)](http://cloud.highcharts.com/show/abyfite)

Check the results on your computer! Just clone [this repo](https://github.com/icebob/microservices-benchmark) and run `npm install && npm start`.

[Check out our benchmark results.](_docs_0.15_benchmark.md)

> **Versioning**
> 
> Until Moleculer reaches a `1.0` release, breaking changes will be released with a new minor version. For example `0.14.1`, and `0.14.4` will be backward compatible, but `0.15.0` will have breaking changes.

> **Node.js support**
> 
> Moleculer follows Node.js [release cycles](https://nodejs.org/en/about/releases/) meaning that the minimum required node version is `18`.

#### _docs_0.15_.md

> Source: https://moleculer.services/docs/0.15/
> Scraped: 4/13/2025, 3:23:58 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/index.md)

Moleculer is a fast, modern and powerful microservices framework for [Node.js](https://nodejs.org/en/). It helps you to build efficient, reliable & scalable services. Moleculer provides many features for building and managing your microservices.

## [](_docs_0.15_.md#Features)Features

*   Promise-based solution (async/await compatible)
*   request-reply concept
*   support event driven architecture with balancing
*   built-in service registry & dynamic service discovery
*   load balanced requests & events (round-robin, random, cpu-usage, latency, sharding)
*   many fault tolerance features (Circuit Breaker, Bulkhead, Retry, Timeout, Fallback)
*   plugin/middleware system
*   support versioned services
*   support [Stream](https://nodejs.org/dist/latest-v10.x/docs/api/stream.html)s
*   service mixins
*   built-in caching solution (Memory, MemoryLRU, Redis)
*   pluggable loggers (Console, File, Pino, Bunyan, Winston, Debug, Datadog, Log4js)
*   pluggable transporters (TCP, NATS, MQTT, Redis, NATS Streaming, Kafka, AMQP 0.9, AMQP 1.0)
*   pluggable serializers (JSON, Avro, MsgPack, Protocol Buffer, Thrift)
*   pluggable parameter validator
*   multiple services on a node/server
*   master-less architecture, all nodes are equal
*   parameter validation with [fastest-validator](https://github.com/icebob/fastest-validator)
*   built-in metrics feature with reporters (Console, CSV, Datadog, Event, Prometheus, StatsD)
*   built-in tracing feature with exporters (Console, Datadog, Event, Jaeger, Zipkin)
*   official [API gateway](https://github.com/moleculerjs/moleculer-web), [Database access](https://github.com/moleculerjs/moleculer-db) and many other modules…

## [](_docs_0.15_.md#How-fast)How fast?

We spent a lot of hours to improve the performance of Moleculer and create the fastest microservices framework for Node.js.

[![Benchmark local](https://moleculer.services/docs/0.15/assets/benchmark/benchmark_local.svg)](http://cloud.highcharts.com/show/utideti)  
[![Benchmark remote](https://moleculer.services/docs/0.15/assets/benchmark/benchmark_remote.svg)](http://cloud.highcharts.com/show/abyfite)

Check the results on your computer! Just clone [this repo](https://github.com/icebob/microservices-benchmark) and run `npm install && npm start`.

[Check out our benchmark results.](_docs_0.15_benchmark.md)

> **Versioning**
> 
> Until Moleculer reaches a `1.0` release, breaking changes will be released with a new minor version. For example `0.14.1`, and `0.14.4` will be backward compatible, but `0.15.0` will have breaking changes.

> **Node.js support**
> 
> Moleculer follows Node.js [release cycles](https://nodejs.org/en/about/releases/) meaning that the minimum required node version is `18`.

#### _docs_0.15_actions.md

> Source: https://moleculer.services/docs/0.15/actions
> Scraped: 4/13/2025, 3:24:01 AM

The actions are the callable/public methods of the service. The action calling represents a remote-procedure-call (RPC). It has request parameters & returns response, like a HTTP request.

If you have multiple instances of services, the broker will load balance the request among instances. [Read more about balancing](_docs_0.15_balancing.md).

![Action balancing diagram](https://moleculer.services/docs/0.15/assets/action-balancing.gif)

## [](_docs_0.15_actions.md#Call-services)Call services

To call a service use the `broker.call` method. The broker looks for the service (and a node) which has the given action and call it. The function returns a `Promise`.

### [](_docs_0.15_actions.md#Syntax)Syntax
```
const res = await broker.call(actionName, params, opts);  
```
The `actionName` is a dot-separated string. The first part of it is the service name, while the second part of it represents the action name. So if you have a `posts` service with a `create` action, you can call it as `posts.create`.

The `params` is an object which is passed to the action as a part of the [Context](_docs_0.15_context.md). The service can access it via `ctx.params`. _It is optional. If you don’t define, it will be `{}`_.

The `opts` is an object to set/override some request parameters, e.g.: `timeout`, `retryCount`. _It is optional._

**Available calling options:**

Moleculer provides various calling options to customize the behavior of service calls. These options include timeout, retries, fallback response, target nodeID, metadata, parent context, and request ID.

Name

Type

Default

Description

`timeout`

`Number`

`null`

Timeout of request in milliseconds. If the request is timed out and you don’t define `fallbackResponse`, broker will throw a `RequestTimeout` error. To disable set `0`. If it’s not defined, the `requestTimeout` value from broker options will be used. [Read more](_docs_0.15_fault-tolerance.md#Timeout).

`retries`

`Number`

`null`

Count of retry of request. If the request is timed out, broker will try to call again. To disable set `0`. If it’s not defined, the `retryPolicy.retries` value from broker options will be used. [Read more](_docs_0.15_fault-tolerance.md#Retry).

`fallbackResponse`

`Any`

`null`

Returns it, if the request has failed. [Read more](_docs_0.15_fault-tolerance.md#Fallback).

`nodeID`

`String`

`null`

Target nodeID. If set, it will make a direct call to the specified node.

`meta`

`Object`

`{}`

Metadata of request. Access it via `ctx.meta` in actions handlers. It will be transferred & merged at nested calls, as well.

`parentCtx`

`Context`

`null`

Parent `Context` instance. Use it to chain the calls.

`requestID`

`String`

`null`

Request ID or Correlation ID. Use it for tracing.

### [](_docs_0.15_actions.md#Usages)Usages

**Call without params**
```
const res = await broker.call("user.list");  
```
**Call with params**
```
const res = await broker.call("user.get", { id: 3 });  
```
**Call with params and options**
```
const res = await broker.call("user.recommendation", { limit: 5 }, {  
    timeout: 500,  
    retries: 3,  
    fallbackResponse: defaultRecommendation  
});  
```
**Call with promise error handling**
```
broker.call("posts.update", { id: 2, title: "Modified post title" })  
    .then(res => console.log("Post updated!"))  
    .catch(err => console.error("Unable to update Post!", err));  
```
**Direct call: get health info from the “node-21” node**
```
const res = await broker.call("$node.health", null, { nodeID: "node-21" })  
```
### [](_docs_0.15_actions.md#Metadata)Metadata

Metadata in Moleculer allows you to send additional information along with service calls. This metadata can be accessed in action handlers via `ctx.meta` and is useful for passing context-specific details or configuration parameters. Please note that in nested calls the `meta` is merged.
```
broker.createService({  
    name: "test",  
    actions: {  
        first(ctx) {  
            return ctx.call("test.second", null, { meta: {  
                b: 5  
            }});  
        },  
        second(ctx) {  
            console.log(ctx.meta);  
              
        }  
    }  
});  
  
broker.call("test.first", null, { meta: {  
    a: "John"  
}});  
```
The `meta` is sent back to the caller service. Use it to send extra meta information back to the caller. E.g.: send response headers back to API gateway or set resolved logged in user to metadata.
```
broker.createService({  
    name: "test",  
    actions: {  
        async first(ctx) {  
            await ctx.call("test.second", null, { meta: {  
                a: "John"  
            }});  
  
            console.log(ctx.meta);  
              
        },  
        second(ctx) {  
              
            ctx.meta.b = 5;  
        }  
    }  
});  
```
When making internal calls to actions (`this.actions.xy()`) you should set `parentCtx` to pass `meta` data.

**Internal calls**
```
broker.createService({  
  name: "mod",  
  actions: {  
    hello(ctx) {  
      console.log(ctx.meta);  
        
      ctx.meta.age = 123  
      return this.actions.subHello(ctx.params, { parentCtx: ctx });  
    },  
  
    subHello(ctx) {  
      console.log("meta from subHello:", ctx.meta);  
        
      return "hi!";  
    }  
  }  
});  
  
broker.call("mod.hello", { param: 1 }, { meta: { user: "John" } });  
```
### [](_docs_0.15_actions.md#Headers)Headers

Headers in Moleculer serve a similar purpose to HTTP headers, allowing you to attach additional information to service calls.

> Please note, header keys start with `$` means internal header keys (e.g. `$streamObjectMode`). We recommend to don’t use this prefix for your keys to avoid conflicts.

**Setting headers in action calls**
```
broker.call("posts.list", { limit: 100 }, {  
  headers: {  
    customProp: "customValue"  
  }  
});  
```
> You can also set header when emitting or boradcasting events.

**Read headers inside action handler**
```
  
module.exports = {  
  name: "posts",  
  actions: {  
    list(ctx) {  
      const customProp = ctx.headers.customProp;  
    },  
  },  
};  
```
### [](_docs_0.15_actions.md#Metadata-vs-Headers)Metadata vs Headers

#### [](_docs_0.15_actions.md#Metadata-1)Metadata

*   Purpose: Provides additional context or configuration parameters for service calls.
*   Scope: Global within Moleculer, passed to all subsequent actions.
*   Access: Accessed via `ctx.meta` within action handlers.

**Usage**:

*   Sending context-specific details like authentication tokens.
*   Propagating information across nested service calls.

#### [](_docs_0.15_actions.md#Headers-1)Headers

*   Purpose: Attaches metadata to individual service calls.
*   Scope: Specific to each service call, not automatically propagated.
*   Access: Accessed via `ctx.headers` within action handlers.

**Usage**   Adding request-specific metadata like content type.
*   Passing transient information for a single call.

#### [](_docs_0.15_actions.md#Key-Differences)Key Differences

*   Scope: Metadata is global and passed to all subsequent actions, while headers are specific to each call.
*   Propagation: Metadata is automatically propagated, headers need explicit passing.
*   Merge: Metadata is merged in nested calls, headers are not.
*   Accessibility: Metadata accessed via `ctx.meta`, headers via `ctx.headers`.

### [](_docs_0.15_actions.md#Timeout)Timeout

Timeouts define the maximum time a service call waits for a response from another service. This helps prevent applications from hanging indefinitely while waiting for unresponsive services.

Timeout Levels:

*   **Global Broker Timeout**: This default timeout applies to all service calls unless overridden at lower levels. It’s set using the [`requestTimeout`](_docs_0.15_fault-tolerance.md#Timeout) option in the broker configuration.
*   **Action-Specific Timeout**: You can define a specific timeout for an individual action within its definition. This overrides the global broker timeout for that particular action.
*   **Call-Level Timeout**: When calling a service, you can provide a `timeout` option directly within the call parameters. This overrides both the global and action-specific timeouts for that specific call.

**Example**  
```
  
module.exports = {  
    nodeID: "node-1",  
    requestTimeout: 3000   
};  
  
   
module.exports = {  
    name: "greeter",  
    actions: {  
        normal: {  
            handler(ctx) {  
                return "Normal";  
            }  
        },  
         slow: {  
            timeout: 5000,   
            handler(ctx) {  
                return "Slow";  
            }  
        }  
    },  
```
**Calling examples**
```
  
await broker.call("greeter.normal");  
  
  
await broker.call("greeter.slow");  
  
  
await broker.call("greeter.slow", null, { timeout: 1000 });  
```
### [](_docs_0.15_actions.md#Multiple-calls)Multiple calls

#### [](_docs_0.15_actions.md#Calling-multiple-actions)Calling multiple actions

Moleculer.js allows you to execute multiple service calls simultaneously using the `broker.mcall` or `ctx.mcall` methods. This is useful for scenarios where you need data from different services to build a final response or perform actions in parallel.

**Call Definition formats**:

*   `Array` of Objects: Each object in the array represents a single call with the following properties:
    *   `action`: (Required) The name of the service action to be called.
    *   `params`: (Optional) An object containing parameters to be passed to the action.
    *   `options`: (Optional) An object containing additional options for the specific call (e.g., timeout).
*   `Object` with Nested Properties: Here, the object itself acts as a container for multiple calls. Each key represents the service name, and the value is another object defining the action and parameters for that service.

**Common Options**:  
You can optionally provide a second argument to `mcall` to specify common options that apply to all calls within the request. This object can include properties like `meta` or `timeout`.

**`mcall` with Array <Object>**
```
await broker.mcall(  
    \[  
        { action: 'posts.find', params: { author: 1 }, options: { } },  
        { action: 'users.find', params: { name: 'John' } }  
    \],  
    {  
          
        meta: { token: '63f20c2d-8902-4d86-ad87-b58c9e2333c2' }  
    }  
);  
```
**`mcall` with Object and options.meta**
```
await broker.mcall(  
    {  
        posts: { action: 'posts.find', params: { author: 1 }, options: { } },  
        users: { action: 'users.find', params: { name: 'John' } }  
    },   
    {  
          
        meta: { token: '63f20c2d-8902-4d86-ad87-b58c9e2333c2' }  
    }  
);  
```
#### [](_docs_0.15_actions.md#Response-handling)Response handling

The `mcall` method offers a `settled` option that allows you to receive detailed information about the results of each call, including their success or failure status. With `settled: true`, `mcall` always resolves as a `Promise`, and the response contains an array with objects for each call. Each object has a status property (“fulfilled” for success, “rejected” for failure) and a `value` property containing the response data (for successful calls) or the error reason (for failed calls). Note that, without this option you won’t know how many (and which) calls were rejected.

**Example**
```
const res = await broker.mcall(\[  
    { action: "posts.find", params: { limit: 2, offset: 0 },  
    { action: "users.find", params: { limit: 2, sort: "username" } },  
    { action: "service.notfound", params: { notfound: 1 } }  
\], { settled: true });  
console.log(res);  
```
The `res` will be something similar to
```
\[  
    { status: "fulfilled", value: \[\] },  
    { status: "fulfilled", value: \[\] },  
    { status: "rejected", reason: {} }  
\]  
```
## [](_docs_0.15_actions.md#Streaming)Streaming

Stream handling enables efficient transfer of data streams between services. This feature is particularly useful for processing large files, encoding/decoding streams, or compressing/decompressing data on the fly. The stream instance is passed as a calling options, so you can use `params` as a normal action call.

### [](_docs_0.15_actions.md#Examples)Examples

**Send a file to a service as a stream**
```
const stream = fs.createReadStream(fileName);  
ctx.call("file.save", { filename: "as.txt" }, { stream: fs.createReadStream() });  
```
> **Object Mode Streaming**
> 
> [Object Mode Streaming](https://nodejs.org/api/stream.html#stream_object_mode) is also supported. In order to enable it set `$streamObjectMode: true` in [`meta`](_docs_0.15_actions.md#Metadata).

**Receiving a stream in a service**
```
  
module.exports = {  
    name: "file",  
    actions: {  
        save(ctx) {  
              
            const stream = ctx.stream;  
            const s = fs.createWriteStream(ctx.params.filename);  
            stream.pipe(s);  
        }  
    }  
};  
```
**Return a stream as response in a service**
```
module.exports = {  
    name: "storage",  
    actions: {  
        get: {  
            params: {  
                filename: "string"  
            },  
            handler(ctx) {  
                return fs.createReadStream(\`/tmp/${ctx.params.filename}\`);  
            }  
        }  
    }  
};  
```
**Process received stream on the caller side**
```
const filename = "avatar-123.jpg";  
broker.call("storage.get", { filename })  
    .then(stream => {  
        const s = fs.createWriteStream(\`./${filename}\`);  
        stream.pipe(s);  
        s.on("close", () => broker.logger.info("File has been received"));  
    })  
```
## [](_docs_0.15_actions.md#Action-visibility)Action visibility

Action `visibility` determines the accessibility and invocation permissions of service actions. By defining visibility levels, developers can control who can invoke actions and under what circumstances.

**Functionality**   **Public Access**: Actions with `published` or `null` visibility are considered public and can be invoked locally, remotely, and published via API Gateway.
*   **Remote Invocation**: `public` actions can be called both locally and remotely but are not exposed via API Gateway publication.
*   **Local Access Only**: Actions with `protected` visibility are restricted to services located on the same node, ensuring they cannot be called remotely.
*   **Internal Use Only**: `private` actions are exclusively callable internally within the service, via `this.actions.xy()` syntax.

**Change visibility**
```
module.exports = {  
    name: "posts",  
    actions: {  
          
        find(ctx) {},  
        clean: {  
              
            visibility: "private",  
            handler(ctx) {}  
        }  
    },  
    methods: {  
        cleanEntities() {  
              
            return this.actions.clean();  
        }  
    }  
}  
```
> The default values is `null` (means `published`) due to backward compatibility.

## [](_docs_0.15_actions.md#Action-hooks)Action hooks

Action hooks allow you to inject middleware functions into the request-response lifecycle of service actions. These hooks can execute `before`, `after`, or on `errors` during action invocation, enabling tasks like parameter validation, response manipulation, and error handling. A hook is either a `Function` or a `String`. In case of a `String` it must be equal to service’s [method](_docs_0.15_services.md#Methods) name.

### [](_docs_0.15_actions.md#Before-hooks)Before hooks

In before hooks, it receives the `ctx`, it can manipulate the `ctx.params`, `ctx.meta`, or add custom variables into `ctx.locals` what you can use in the action handlers.  
If there are any problem, it can throw an `Error`. _Please note, you can’t break/skip the further executions of hooks or action handler._

**Main usages:**   parameter sanitization
*   parameter validation
*   entity finding
*   authorization

### [](_docs_0.15_actions.md#After-hooks)After hooks

In after hooks, it receives the `ctx` and the `response`. It can manipulate or completely change the response.  
In the hook, it has to return the response.

**Main usages:**   property populating
*   remove sensitive data.
*   wrapping the response into an `Object`
*   convert the structure of the response

### [](_docs_0.15_actions.md#Error-hooks)Error hooks

The error hooks are called when an `Error` is thrown during action calling. It receives the `ctx` and the `err`. It can handle the error and return another response (fallback) or throws further the error.

**Main usages:**   error handling
*   wrap the error into another one
*   fallback response

### [](_docs_0.15_actions.md#Service-level-declaration)Service level declaration

Hooks can be assigned to a specific action (by indicating action `name`), all actions (`*`) in service or by indicating a wildcard (e.g., `create-*`). The latter will be applied to all actions whose name starts with `create-`. Action names can also be combined using a pipe symbol (e.g., `create|update`)

> Please notice that hook registration order matter as it defines sequence by which hooks are executed. For more information take a look at [hook execution order](_docs_0.15_actions.md#Execution-order).

**Before hooks**
```
const DbService = require("moleculer-db");  
  
module.exports = {  
    name: "posts",  
    mixins: \[DbService\]  
    hooks: {  
        before: {  
              
              
            "\*": "resolveLoggedUser",  
  
              
            remove: \[  
                function isAuthenticated(ctx) {  
                    if (!ctx.user)  
                        throw new Error("Forbidden");  
                },  
                function isOwner(ctx) {  
                    if (!this.checkOwner(ctx.params.id, ctx.user.id))  
                        throw new Error("Only owner can remove it.");  
                }  
            \],  
              
            "create-\*": \[  
                async function (ctx){}  
            \],  
              
            "\*-user": \[  
                async function (ctx){}  
            \],  
              
            "create-\*|\*-user": \[  
                async function (ctx){}  
            \],  
        }  
    },  
  
    methods: {  
        async resolveLoggedUser(ctx) {  
            if (ctx.meta.user)  
                ctx.user = await ctx.call("users.get", { id: ctx.meta.user.id });  
        }  
    }  
}  
```
**After & Error hooks**
```
const DbService = require("moleculer-db");  
  
module.exports = {  
    name: "users",  
    mixins: \[DbService\]  
    hooks: {  
        after: {  
              
            "\*": function(ctx, res) {  
                  
                delete res.password;  
  
                  
                return res;  
            },  
            get: \[  
                // Add a new virtual field to the entity  
                async function (ctx, res) {  
                    res.friends = await ctx.call("friends.count", { query: { follower: res.\_id }});  
  
                    return res;  
                },  
                  
                async function (ctx, res) {  
                    if (res.referrer)  
                        res.referrer = await ctx.call("users.get", { id: res.\_id });  
  
                    return res;  
                }  
            \],  
              
            "create-\*": \[  
                async function (ctx, res){}  
            \],  
              
            "\*-user": \[  
                async function (ctx, res){}  
            \],  
        },  
        error: {  
              
            "\*": function(ctx, err) {  
                this.logger.error(\`Error occurred when '${ctx.action.name}' action was called\`, err);  
  
                  
                throw err;  
            },  
              
            "create-\*": \[  
                async function (ctx, err){}  
            \],  
              
            "\*-user": \[  
                async function (ctx, err){}  
            \],  
        }  
    }  
};  
```
### [](_docs_0.15_actions.md#Action-level-declaration)Action level declaration

Hooks can be also registered inside action declaration.

> Please note that hook registration order matter as it defines sequence by which hooks are executed. For more information take a look at [hook execution order](_docs_0.15_actions.md#Execution-order).

**Before & After hooks**
```
broker.createService({  
    name: "greeter",  
    actions: {  
        hello: {  
            hooks: {  
                before(ctx) {  
                    broker.logger.info("Before action hook");  
                },  
                after(ctx, res) {  
                    broker.logger.info("After action hook"));  
                    return res;  
                }  
            },  
  
            handler(ctx) {  
                broker.logger.info("Action handler");  
                return \`Hello ${ctx.params.name}\`;  
            }  
        }  
    }  
});  
```
### [](_docs_0.15_actions.md#Execution-order)Execution order

It is important to keep in mind that hooks have a specific execution order. This is especially important to remember when multiple hooks are registered at different ([service](_docs_0.15_actions.md#Service-level-declaration) and/or [action](_docs_0.15_actions.md#Action-level-declaration)) levels. Overall, the hooks have the following execution logic:

*   `before` hooks: global (`*`) `->` service level `->` action level.
    
*   `after` hooks: action level `->` service level `->` global (`*`).
    

> When using several hooks it might be difficult visualize their execution order. However, you can set the [`logLevel` to `debug`](_docs_0.15_logging.md#Log-Level-Setting) to quickly check the execution order of global and service level hooks.

**Example of a global, service & action level hook execution chain**
```
broker.createService({  
    name: "greeter",  
    hooks: {  
        before: {  
            "\*"(ctx) {  
                broker.logger.info(chalk.cyan("Before all hook"));  
            },  
            hello(ctx) {  
                broker.logger.info(chalk.magenta("  Before hook"));  
            }  
        },  
        after: {  
            "\*"(ctx, res) {  
                broker.logger.info(chalk.cyan("After all hook"));  
                return res;  
            },  
            hello(ctx, res) {  
                broker.logger.info(chalk.magenta("  After hook"));  
                return res;  
            }  
        },  
    },  
  
    actions: {  
        hello: {  
            hooks: {  
                before(ctx) {  
                    broker.logger.info(chalk.yellow.bold("    Before action hook"));  
                },  
                after(ctx, res) {  
                    broker.logger.info(chalk.yellow.bold("    After action hook"));  
                    return res;  
                }  
            },  
  
            handler(ctx) {  
                broker.logger.info(chalk.green.bold("      Action handler"));  
                return \`Hello ${ctx.params.name}\`;  
            }  
        }  
    }  
});  
```
**Output produced by global, service & action level hooks**
```
INFO  - Before all hook  
INFO  -   Before hook  
INFO  -     Before action hook  
INFO  -       Action handler  
INFO  -     After action hook  
INFO  -   After hook  
INFO  - After all hook  
```
### [](_docs_0.15_actions.md#Reusability)Reusability

Ensuring hook reusability is crucial for maintaining clean and modular code. By defining hooks as standalone functions or [mixins](_docs_0.15_services.md#Mixins), you can easily share them across multiple actions and services, ensuring code efficiency and consistency.
```
  
module.exports = {  
    methods: {  
        checkIsAuthenticated(ctx) {  
            if (!ctx.meta.user)  
                throw new Error("Unauthenticated");  
        },  
        checkUserRole(ctx) {  
            if (ctx.action.role && ctx.meta.user.role != ctx.action.role)  
                throw new Error("Forbidden");  
        },  
        checkOwner(ctx) {  
              
        }  
    }  
}  
```
```
  
const MyAuthMixin = require("./authorize.mixin");  
  
module.exports = {  
    name: "posts",  
    mixins: \[MyAuthMixin\]  
    hooks: {  
        before: {  
            "\*": \["checkIsAuthenticated"\],  
            create: \["checkUserRole"\],  
            update: \["checkUserRole", "checkOwner"\],  
            remove: \["checkUserRole", "checkOwner"\]  
        }  
    },  
  
    actions: {  
        find: {  
              
            handler(ctx) {}  
        },  
        create: {  
            role: "admin",  
            handler(ctx) {}  
        },  
        update: {  
            role: "user",  
            handler(ctx) {}  
        }  
    }  
};  
```
### [](_docs_0.15_actions.md#Local-Storage)Local Storage

Local storage in Moleculer provides a lightweight mechanism for storing temporary data within the context of a service action. This storage, accessible via `ctx.locals`, allows you to pass additional information to action handlers and maintain state across hook executions.

**Setting `ctx.locals` in before hook**
```
module.exports = {  
    name: "user",  
  
    hooks: {  
        before: {  
            async get(ctx) {  
                const entity = await this.findEntity(ctx.params.id);  
                ctx.locals.entity = entity;  
            }  
        }  
    },  
  
    actions: {  
        get: {  
            params: {  
                id: "number"  
            },  
            handler(ctx) {  
                this.logger.info("Entity", ctx.locals.entity);  
            }  
        }  
    }  
}  
```

#### _docs_0.15_api.md

> Source: https://moleculer.services/docs/0.15/api
> Scraped: 4/13/2025, 3:24:04 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/api/index.md)

## [](_docs_0.15_api.md#ServiceBroker)[ServiceBroker](_docs_0.15_api_service-broker.md)

ServiceBroker class methods and properties.

## [](_docs_0.15_api.md#Service)[Service](_docs_0.15_api_service.md)

Service class methods and properties.

## [](_docs_0.15_api.md#Context)[Context](_docs_0.15_api_context.md)

Context class methods and properties.

## [](_docs_0.15_api.md#Protocol)[Protocol](_docs_0.15_protocol.html.md)

Communication protocol of Moleculer.

#### _docs_0.15_api_context.md

> Source: https://moleculer.services/docs/0.15/api/context
> Scraped: 4/13/2025, 3:24:03 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/api/context.md)

## [](_docs_0.15_api_context.md#Context)Context

`new Context(broker, endpoint)`

Context class for action calls

### [](_docs_0.15_api_context.md#Properties)Properties

Property

Type

Default

Description

`id`

String

\-

Context ID

`broker`

ServiceBroker

\-

Broker instance

`action`

Action

\-

Action definition

`nodeID`

\-

Node ID

`caller`

String

\-

Action name of the caller. E.g.: `v3.myService.myAction`

`parentID`

String

\-

Parent Context ID

`tracing`

Boolean

\-

Need send metrics events

`level`

\-

Level of context

## [](_docs_0.15_api_context.md#Static-Members)Static Members

### [](_docs_0.15_api_context.md#constructor-NaN)constructor

`new Context(broker: ServiceBroker, endpoint: Endpoint)`

Creates an instance of Context.

#### [](_docs_0.15_api_context.md#Parameters)Parameters

Property

Type

Default

Description

`broker`

ServiceBroker

\-

Broker instance

`endpoint`

Endpoint

\-

Endpoint (action & nodeID)

### [](_docs_0.15_api_context.md#create)create

`create(broker: ServiceBroker, endpoint: Endpoint, params, opts: Object): Context`

Create a new Context instance

#### [](_docs_0.15_api_context.md#Parameters-1)Parameters

Property

Type

Default

Description

`broker`

ServiceBroker

\-

\-

`endpoint`

Endpoint

\-

\-

`params`

\-

\-

`opts`

Object

\-

\-

### [](_docs_0.15_api_context.md#id)id

`id`

Context ID getter

#### [](_docs_0.15_api_context.md#Parameters-2)Parameters

Property

Type

Default

Description

### [](_docs_0.15_api_context.md#setParams)setParams

`setParams(newParams: Object, cloning: Boolean)`

Set params of context

#### [](_docs_0.15_api_context.md#Parameters-3)Parameters

Property

Type

Default

Description

`newParams`

Object

\-

\-

`cloning`

Boolean

\-

\-

### [](_docs_0.15_api_context.md#call)call

`call(actionName: String, params, opts): Promise`

Call an other action. It creates a sub-context.

#### [](_docs_0.15_api_context.md#Parameters-4)Parameters

Property

Type

Default

Description

`actionName`

String

\-

\-

`params`

\-

\-

`opts`

\-

\-

#### [](_docs_0.15_api_context.md#Examples)Examples

**Call an other service with params & options**
```
ctx.call("posts.get", { id: 12 }, { timeout: 1000 });  
```
### [](_docs_0.15_api_context.md#emit)emit

`emit(eventName: string, data, groups, payload: any)`

Emit an event (grouped & balanced global event)

#### [](_docs_0.15_api_context.md#Parameters-5)Parameters

Property

Type

Default

Description

`eventName`

string

\-

\-

`groups`

\-

\-

`payload`

any

\-

\-

#### [](_docs_0.15_api_context.md#Examples-1)Examples
```
ctx.emit("user.created", { entity: user, creator: ctx.meta.user });  
```
### [](_docs_0.15_api_context.md#broadcast)broadcast

`broadcast(eventName: string, data, groups, payload: any)`

Emit an event for all local & remote services

#### [](_docs_0.15_api_context.md#Parameters-6)Parameters

Property

Type

Default

Description

`eventName`

string

\-

\-

`groups`

\-

\-

`payload`

any

\-

\-

#### [](_docs_0.15_api_context.md#Examples-2)Examples
```
ctx.broadcast("user.created", { entity: user, creator: ctx.meta.user });  
```

#### _docs_0.15_api_events.html.md

> Source: https://moleculer.services/docs/0.15/api/events.html
> Scraped: 4/13/2025, 3:24:04 AM

# Page not found

Looks like you’ve followed a broken link or entered a URL that doesn’t exist on this site.

* * *

If this is your site, and you weren’t expecting a 404 for this path, please visit Netlify’s [“page not found” support guide](https://answers.netlify.com/t/support-guide-i-ve-deployed-my-site-but-i-still-see-page-not-found/125?utm_source=404page&utm_campaign=community_tracking) for troubleshooting tips.

#### _docs_0.15_api_service-broker.md

> Source: https://moleculer.services/docs/0.15/api/service-broker
> Scraped: 4/13/2025, 3:24:03 AM

## [](_docs_0.15_api_service-broker.md#defaultOptions)defaultOptions

`defaultOptions`

Default broker options

## [](_docs_0.15_api_service-broker.md#ServiceBroker)ServiceBroker

`new ServiceBroker(options)`

Service broker class

## [](_docs_0.15_api_service-broker.md#Static-Members)Static Members

### [](_docs_0.15_api_service-broker.md#constructor-NaN)constructor

`new ServiceBroker(options: Object)`

Creates an instance of ServiceBroker.

#### [](_docs_0.15_api_service-broker.md#Parameters)Parameters

Property

Type

Default

Description

`options`

Object

\-

\-

### [](_docs_0.15_api_service-broker.md#registerMiddlewares)registerMiddlewares

`registerMiddlewares(userMiddlewares)`

Register middlewares (user & internal)

#### [](_docs_0.15_api_service-broker.md#Parameters-1)Parameters

Property

Type

Default

Description

### [](_docs_0.15_api_service-broker.md#start)start

`start()`

Start broker. If has transporter, transporter.connect will be called.

### [](_docs_0.15_api_service-broker.md#stop)stop

`stop()`

Stop broker. If has transporter, transporter.disconnect will be called.

### [](_docs_0.15_api_service-broker.md#repl)repl

`repl()`

Switch the console to REPL mode.

#### [](_docs_0.15_api_service-broker.md#Examples)Examples
```
broker.start().then(() => broker.repl());  
```
### [](_docs_0.15_api_service-broker.md#getLogger)getLogger

`getLogger(module: String, props): Logger`

Get a custom logger for sub-modules (service, transporter, cacher, context…etc)

#### [](_docs_0.15_api_service-broker.md#Parameters-2)Parameters

Property

Type

Default

Description

`module`

String

\-

Name of module

`props`

\-

Module properties (service name, version, …etc

### [](_docs_0.15_api_service-broker.md#fatal)fatal

`fatal(message: String, err, needExit: boolean)`

Fatal error. Print the message to console and exit the process (if need)

#### [](_docs_0.15_api_service-broker.md#Parameters-3)Parameters

Property

Type

Default

Description

`message`

String

\-

\-

`err`

\-

\-

`needExit`

\-

\-

### [](_docs_0.15_api_service-broker.md#loadServices)loadServices

`loadServices(folder: string, fileMask: string): Number`

Load services from a folder

#### [](_docs_0.15_api_service-broker.md#Parameters-4)Parameters

Property

Type

Default

Description

`folder`

\-

Folder of services

`fileMask`

\-

Service filename mask

### [](_docs_0.15_api_service-broker.md#loadService)loadService

`loadService(filePath, Path: string): Service`

Load a service from file

#### [](_docs_0.15_api_service-broker.md#Parameters-5)Parameters

Property

Type

Default

Description

`Path`

string

\-

of service

### [](_docs_0.15_api_service-broker.md#watchService)watchService

`watchService(service: Service)`

Watch a service file and hot reload if it’s changed.

#### [](_docs_0.15_api_service-broker.md#Parameters-6)Parameters

Property

Type

Default

Description

`service`

Service

\-

\-

### [](_docs_0.15_api_service-broker.md#createService)createService

`createService(schema: any): Service`

Create a new service by schema

#### [](_docs_0.15_api_service-broker.md#Parameters-7)Parameters

Property

Type

Default

Description

`schema`

any

\-

Schema of service or a Service class

### [](_docs_0.15_api_service-broker.md#addLocalService)addLocalService

`addLocalService(service: Service)`

Add a local service instance

#### [](_docs_0.15_api_service-broker.md#Parameters-8)Parameters

Property

Type

Default

Description

`service`

Service

\-

\-

### [](_docs_0.15_api_service-broker.md#registerLocalService)registerLocalService

`registerLocalService(registryItem: Object)`

Register a local service to Service Registry

#### [](_docs_0.15_api_service-broker.md#Parameters-9)Parameters

Property

Type

Default

Description

`registryItem`

Object

\-

\-

### [](_docs_0.15_api_service-broker.md#destroyService)destroyService

`destroyService(service: Service)`

Destroy a local service

#### [](_docs_0.15_api_service-broker.md#Parameters-10)Parameters

Property

Type

Default

Description

`service`

Service

\-

\-

### [](_docs_0.15_api_service-broker.md#servicesChanged)servicesChanged

`servicesChanged(localService)`

It will be called when a new local or remote service  
is registered or unregistered.

#### [](_docs_0.15_api_service-broker.md#Parameters-11)Parameters

Property

Type

Default

Description

### [](_docs_0.15_api_service-broker.md#registerInternalServices)registerInternalServices

`registerInternalServices()`

Register internal services

### [](_docs_0.15_api_service-broker.md#getLocalService)getLocalService

`getLocalService(name|obj): Service`

Get a local service by name (e.g. `posts` or `v2.posts`) or by object (e.g. `{ name: "posts", version: 2 }`)

#### [](_docs_0.15_api_service-broker.md#Parameters-12)Parameters

Property

Type

Default

Description

`name`

String|Object

\-

\-

### [](_docs_0.15_api_service-broker.md#waitForServices)waitForServices

`waitForServices(serviceNames, timeout: Number, interval: Number, logger): Promise`

Wait for other services

#### [](_docs_0.15_api_service-broker.md#Parameters-13)Parameters

Property

Type

Default

Description

`serviceNames`

\-

\-

`timeout`

Number

\-

Timeout in milliseconds

`interval`

Number

\-

Check interval in milliseconds

### [](_docs_0.15_api_service-broker.md#findNextActionEndpoint)findNextActionEndpoint

`findNextActionEndpoint(actionName: String, opts): undefined`

Find the next available endpoint for action

#### [](_docs_0.15_api_service-broker.md#Parameters-14)Parameters

Property

Type

Default

Description

`actionName`

String

\-

\-

`opts`

\-

\-

### [](_docs_0.15_api_service-broker.md#call)call

`call(actionName: String, params: Object, opts: Object): Promise`

Call an action

#### [](_docs_0.15_api_service-broker.md#Parameters-15)Parameters

Property

Type

Default

Description

`actionName`

String

\-

name of action

`params`

Object

\-

params of action

`opts`

Object

\-

options of call (optional)

### [](_docs_0.15_api_service-broker.md#mcall)mcall

`mcall(def, options): Promise<Array<Object>|Object>|PromiseSettledResult`

Multiple action calls.

#### [](_docs_0.15_api_service-broker.md#Parameters-16)Parameters

Property

Type

Default

Description

`def`

Array/Object

\-

Calling definitions.

`opts`

Object

\-

Calling options for each call.

`opts.settled`

Boolean

false

Set `true` for result of each promise with reject (only works from node.js version >= 12.9.0)

#### [](_docs_0.15_api_service-broker.md#Examples-1)Examples

Call `mcall` with an array:
```
broker.mcall(\[  
	{ action: "posts.find", params: { limit: 5, offset: 0 } },  
	{ action: "users.find", params: { limit: 5, sort: "username" }, options: { timeout: 500 } }  
\]).then(results => {  
	let posts = results\[0\];  
	let users = results\[1\];  
})  
```
Call `mcall` with an Object:
```
broker.mcall({  
	posts: { action: "posts.find", params: { limit: 5, offset: 0 } },  
	users: { action: "users.find", params: { limit: 5, sort: "username" }, options: { timeout: 500 } }  
}).then(results => {  
	let posts = results.posts;  
	let users = results.users;  
})  
```
**`mcall` with options**
```
await broker.mcall(  
    \[  
        { action: 'posts.find', params: { author: 1 }, options: { } },  
        { action: 'users.find', params: { name: 'John' } },  
        { action: 'service.notfound', params: { notfound: 1 } },  
    \],  
    {  
          
        settled: true,  
          
        meta: { userId: 12345 }  
    }  
);  
```
### [](_docs_0.15_api_service-broker.md#emit)emit

`emit(eventName: string, payload: any, groups)`

Emit an event (grouped & balanced global event)

#### [](_docs_0.15_api_service-broker.md#Parameters-17)Parameters

Property

Type

Default

Description

`eventName`

string

\-

\-

`payload`

any

\-

\-

`groups`

\-

\-

### [](_docs_0.15_api_service-broker.md#broadcast)broadcast

`broadcast(eventName: string, payload: any, groups)`

Broadcast an event for all local & remote services

#### [](_docs_0.15_api_service-broker.md#Parameters-18)Parameters

Property

Type

Default

Description

`eventName`

string

\-

\-

`payload`

any

\-

\-

`groups`

\-

\-

### [](_docs_0.15_api_service-broker.md#broadcastLocal)broadcastLocal

`broadcastLocal(eventName: string, payload: any, groups, nodeID)`

Broadcast an event for all local services

#### [](_docs_0.15_api_service-broker.md#Parameters-19)Parameters

Property

Type

Default

Description

`eventName`

string

\-

\-

`payload`

any

\-

\-

`groups`

\-

\-

`nodeID`

\-

\-

### [](_docs_0.15_api_service-broker.md#ping)ping

`ping(nodeID, timeout): Promise`

Send ping to a node (or all nodes if nodeID is null)

#### [](_docs_0.15_api_service-broker.md#Parameters-20)Parameters

Property

Type

Default

Description

`nodeID`

\-

\-

`timeout`

\-

\-

### [](_docs_0.15_api_service-broker.md#getHealthStatus)getHealthStatus

`getHealthStatus(): Promise`

Get local node health status

### [](_docs_0.15_api_service-broker.md#getLocalNodeInfo)getLocalNodeInfo

`getLocalNodeInfo()`

Get local node info.

### [](_docs_0.15_api_service-broker.md#getEventGroups)getEventGroups

`getEventGroups(eventName: String)`

Get event groups by event name

#### [](_docs_0.15_api_service-broker.md#Parameters-21)Parameters

Property

Type

Default

Description

`eventName`

String

\-

\-

### [](_docs_0.15_api_service-broker.md#emitLocalServices)emitLocalServices

`emitLocalServices(event: String, payload: any, groups: any, sender: String, broadcast: boolean)`

Emit event to local nodes. It is called from transit when a remote event received  
or from

#### [](_docs_0.15_api_service-broker.md#Parameters-22)Parameters

Property

Type

Default

Description

`event`

String

\-

\-

`payload`

any

\-

\-

`groups`

any

\-

\-

`sender`

String

\-

\-

`broadcast`

boolean

\-

\-

### [](_docs_0.15_api_service-broker.md#getCpuUsage)getCpuUsage

`getCpuUsage(): undefined`

Get node overall CPU usage

### [](_docs_0.15_api_service-broker.md#MOLECULER-VERSION)MOLECULER\_VERSION

`MOLECULER_VERSION`

Version of Moleculer

### [](_docs_0.15_api_service-broker.md#PROTOCOL-VERSION)PROTOCOL\_VERSION

`PROTOCOL_VERSION`

Version of Protocol

### [](_docs_0.15_api_service-broker.md#defaultOptions-1)defaultOptions

`defaultOptions`

Default configuration

#### _docs_0.15_api_service.md

> Source: https://moleculer.services/docs/0.15/api/service
> Scraped: 4/13/2025, 3:24:03 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/api/service.md)

## [](_docs_0.15_api_service.md#Service)Service

`new Service(broker, schema)`

Service class

## [](_docs_0.15_api_service.md#Instance-Members)Instance Members

### [](_docs_0.15_api_service.md#parseServiceSchema)parseServiceSchema

`parseServiceSchema(schema: Object)`

Parse Service schema & register as local service

#### [](_docs_0.15_api_service.md#Parameters)Parameters

Property

Type

Default

Description

`schema`

Object

\-

of Service

### [](_docs_0.15_api_service.md#applyMixins)applyMixins

`applyMixins(schema: Schema): Schema`

Apply

#### [](_docs_0.15_api_service.md#Parameters-1)Parameters

Property

Type

Default

Description

`schema`

Schema

\-

\-

### [](_docs_0.15_api_service.md#mergeSchemas)mergeSchemas

`mergeSchemas(mixinSchema: Object, svcSchema: Object): Object`

Merge two Service schema

#### [](_docs_0.15_api_service.md#Parameters-2)Parameters

Property

Type

Default

Description

`mixinSchema`

Object

\-

Mixin schema

`svcSchema`

Object

\-

Service schema

## [](_docs_0.15_api_service.md#Static-Members)Static Members

### [](_docs_0.15_api_service.md#constructor-NaN)constructor

`new Service(broker: ServiceBroker, schema: Object)`

Creates an instance of Service by schema.

#### [](_docs_0.15_api_service.md#Parameters-3)Parameters

Property

Type

Default

Description

`broker`

ServiceBroker

\-

broker of service

`schema`

Object

\-

schema of service

### [](_docs_0.15_api_service.md#waitForServices)waitForServices

`waitForServices(serviceNames, timeout: Number, interval: Number): Promise`

Wait for other services

#### [](_docs_0.15_api_service.md#Parameters-4)Parameters

Property

Type

Default

Description

`serviceNames`

\-

\-

`timeout`

Number

\-

Timeout in milliseconds

`interval`

Number

\-

Check interval in milliseconds

#### _docs_0.15_balancing.md

> Source: https://moleculer.services/docs/0.15/balancing
> Scraped: 4/13/2025, 3:24:01 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/balancing.md)

Moleculer has several built-in load balancing strategies. If a service is running on multiple node instances, ServiceRegistry uses these strategies to select a single node from the available ones.

## [](_docs_0.15_balancing.md#Built-in-strategies)Built-in strategies

To configure strategy, set `strategy` broker options under `registry` property. It can be either a name (in case of built-in strategies) or a `Strategy` class which inherited from `BaseStrategy` (in case of custom strategies).

### [](_docs_0.15_balancing.md#RoundRobin-strategy)RoundRobin strategy

This strategy selects a node based on [round-robin](https://en.wikipedia.org/wiki/Round-robin_DNS) algorithm.

**Usage**
```
  
module.exports = {  
    registry: {  
        strategy: "RoundRobin"  
    }  
};  
```
### [](_docs_0.15_balancing.md#Random-strategy)Random strategy

This strategy selects a node randomly.

**Usage**
```
  
module.exports = {  
    registry: {  
        strategy: "Random"  
    }  
};  
```
### [](_docs_0.15_balancing.md#CPU-usage-based-strategy)CPU usage-based strategy

This strategy selects a node that has the lowest CPU usage. Since the node list can be very long, it gets samples and selects the node with the lowest CPU usage only from a sample instead of the whole node list.

**Usage**
```
  
module.exports = {  
    registry: {  
        strategy: "CpuUsage"  
    }  
};  
```
**Strategy options**

Name

Type

Default

Description

`sampleCount`

`Number`

`3`

The number of samples. _To turn of sampling, set to `0`._

`lowCpuUsage`

`Number`

`10`

The low CPU usage percent (%). The node which has lower CPU usage than this value is selected immediately.

**Usage with custom options**
```
  
module.exports = {  
    registry: {  
        strategy: "CpuUsage",  
        strategyOptions: {  
            sampleCount: 3,  
            lowCpuUsage: 10  
        }  
    }  
};  
```
### [](_docs_0.15_balancing.md#Latency-based-strategy)Latency-based strategy

This strategy selects a node that has the lowest latency, measured by periodic ping commands. Notice that the strategy only ping one node / host. Since the node list can be very long, it gets samples and selects the host with the lowest latency only from a sample instead of the whole node list.

**Usage**
```
  
module.exports = {  
    registry: {  
        strategy: "Latency"  
    }  
};  
```
**Strategy options**

Name

Type

Default

Description

`sampleCount`

`Number`

`5`

The number of samples. If you have a lot of hosts/nodes, it’s recommended to _increase_ the value. _To turn of sampling, set to `0`._

`lowLatency`

`Number`

`10`

The low latency (ms). The node which has lower latency than this value is selected immediately.

`collectCount`

`Number`

`5`

The number of measured latency per host to keep in order to calculate the average latency.

`pingInterval`

`Number`

`10`

Ping interval in seconds. If you have a lot of host/nodes, it’s recommended to _increase_ the value.

**Usage with custom options**
```
  
module.exports = {  
    registry: {  
        strategy: "Latency",  
        strategyOptions: {  
            sampleCount: 15,  
            lowLatency: 20,  
            collectCount: 10,  
            pingInterval: 15  
        }  
    }  
};  
```
### [](_docs_0.15_balancing.md#Sharding-strategy)Sharding strategy

Shard invocation strategy is based on [consistent-hashing](https://www.toptal.com/big-data/consistent-hashing) algorithm. It uses a key value from context `params` or `meta` to route the request to nodes. It means that requests with same key value will be routed to the same node.

**Example of a shard key `name` in context `params`**
```
  
module.exports = {  
    registry: {  
        strategy: "Shard",  
        strategyOptions: {  
            shardKey: "name"  
        }  
    }  
};  
```
**Example of a shard key `user.id` in context `meta`**
```
  
module.exports = {  
    registry: {  
        strategy: "Shard",  
        strategyOptions: {  
            shardKey: "#user.id"  
        }  
    }  
};  
```
> If shard key is in context’s `meta` it must be declared with a `#` at the beginning. The actual `#` is ignored.

**Strategy options**

Name

Type

Default

Description

`shardKey`

`String`

`null`

Shard key

`vnodes`

`Number`

`10`

Number of virtual nodes

`ringSize`

`Number`

`2^32`

Size of the ring

`cacheSize`

`Number`

`1000`

Size of the cache

**All available options of Shard strategy**
```
  
module.exports = {  
    registry: {  
        strategy: "Shard",  
        strategyOptions: {  
            shardKey: "#user.id",  
            vnodes: 10,  
            ringSize: 1000,  
            cacheSize: 1000  
        }  
    }  
};  
```
## [](_docs_0.15_balancing.md#Overwrite-global-options)Overwrite global options

You can overwrite globally defined load balancing strategy in action/event definitions.

**Using ‘Shard’ strategy for ‘hello’ action instead of global ‘RoundRobin’**
```
  
module.exports = {  
    registry: {  
        strategy: "RoundRobin"  
    }  
};  
  
  
module.exports = {  
    name: "greeter",  
    actions: {  
        hello: {  
            params: {  
                name: "string"  
            },  
            strategy: "Shard",  
            strategyOptions: {  
                shardKey: "name"  
            },  
            handler(ctx) {  
                return \`Hello ${ctx.params.name}\`;  
            }  
        }  
    }  
};  
```
## [](_docs_0.15_balancing.md#Custom-strategy)Custom strategy

Custom strategy can be created. We recommend to copy the source of [RandomStrategy](https://github.com/moleculerjs/moleculer/blob/master/src/strategies/random.js) and implement the `select` method.

### [](_docs_0.15_balancing.md#Create-custom-strategy)Create custom strategy
```
const BaseStrategy = require("moleculer").Strategies.Base;  
  
class MyStrategy extends BaseStrategy {  
    select(list, ctx) {  }  
}  
  
module.exports = MyStrategy;  
```
### [](_docs_0.15_balancing.md#Use-custom-strategy)Use custom strategy
```
const { ServiceBroker } = require("moleculer");  
const MyStrategy = require("./my-strategy");  
  
const Strategies = require("moleculer").Strategies  
  
Strategies.register("myCustomStrategy", MyStrategy)  
  
  
  
module.exports = {  
    registry: {  
          
        strategy: "myCustomStrategy"  
    }  
};  
```
## [](_docs_0.15_balancing.md#Preferring-local-services)Preferring local services

The ServiceBroker first tries to call the local instances of service (if exists) to reduce network latencies. It means, if the given service is available on the local broker, the configured strategy will be skipped and the broker will call the local service always.  
This logic can be turned off in broker options with `preferLocal: false` property under the `registry` key.
```
  
module.exports = {  
    registry: {  
        preferLocal: false  
    }  
};  
```

#### _docs_0.15_benchmark.md

> Source: https://moleculer.services/docs/0.15/benchmark
> Scraped: 4/13/2025, 3:24:01 AM

In development, we measure every critical part of the framework to ensure the best possible performance.

We [tested](https://github.com/icebob/microservices-benchmark) Moleculer against some other frameworks and measured the request times.
```
Suite: Local call  
√ broker.call (normal)\*             1,595,635 rps  
√ broker.call (with params)\*        1,662,917 rps  
  
   broker.call (normal)\* (#)            0%      (1,595,635 rps)   (avg: 626ns)  
   broker.call (with params)\*       +4.22%      (1,662,917 rps)   (avg: 601ns)  
\-----------------------------------------------------------------------  
  
Suite: Call with middlewares  
√ No middlewares\*        1,621,427 rps  
√ 5 middlewares\*           664,141 rps  
  
   No middlewares\* (#)       0%      (1,621,427 rps)   (avg: 616ns)  
   5 middlewares\*       -59.04%        (664,141 rps)   (avg: 1μs)  
\-----------------------------------------------------------------------  
  
Suite: Call with metrics  
√ No metrics\*          1,546,373 rps  
√ With metrics\*          486,737 rps  
  
   No metrics\* (#)         0%      (1,546,373 rps)   (avg: 646ns)  
   With metrics\*      -68.52%        (486,737 rps)   (avg: 2μs)  
\-----------------------------------------------------------------------  
  
Suite: Remote call with FakeTransporter  
√ Remote call echo.reply\*                         42,409 rps  
√ Remote call echo.reply with tracking\*           45,739 rps  
  
   Remote call echo.reply\* (#)                     0%         (42,409 rps)   (avg: 23μs)  
   Remote call echo.reply with tracking\*       +7.85%         (45,739 rps)   (avg: 21μs)  
\-----------------------------------------------------------------------  
  
Suite: Context tracking  
√ broker.call (without tracking)\*        1,606,966 rps  
√ broker.call (with tracking)\*           1,588,692 rps  
  
   broker.call (without tracking)\* (#)       0%      (1,606,966 rps)   (avg: 622ns)  
   broker.call (with tracking)\*          -1.14%      (1,588,692 rps)   (avg: 629ns)  
\-----------------------------------------------------------------------  
```
```
Suite: Call methods  
√ broker.call (normal)\*             1,660,419 rps  
√ broker.call (with params)\*        1,706,815 rps  
  
   broker.call (normal)\* (#)            0%      (1,660,419 rps)   (avg: 602ns)  
   broker.call (with params)\*       +2.79%      (1,706,815 rps)   (avg: 585ns)  
\-----------------------------------------------------------------------  
  
Suite: Call with middlewares  
√ Call without middlewares\*        1,604,740 rps  
√ Call with 1 middleware\*          1,195,061 rps  
√ Call with 5 middlewares\*           655,822 rps  
  
   Call without middlewares\* (#)       0%      (1,604,740 rps)   (avg: 623ns)  
   Call with 1 middleware\*        -25.53%      (1,195,061 rps)   (avg: 836ns)  
   Call with 5 middlewares\*       -59.13%        (655,822 rps)   (avg: 1μs)  
\-----------------------------------------------------------------------  
  
Suite: Call with cachers  
√ No cacher\*                            1,180,739 rps  
√ Built-in cacher\*                        611,911 rps  
√ Built-in cacher (keys filter)\*          893,071 rps  
  
   No cacher\* (#)                           0%      (1,180,739 rps)   (avg: 846ns)  
   Built-in cacher\*                    -48.18%        (611,911 rps)   (avg: 1μs)  
   Built-in cacher (keys filter)\*      -24.36%        (893,071 rps)   (avg: 1μs)  
\-----------------------------------------------------------------------  
  
Suite: Call with param validator  
√ No validator\*                 1,192,808 rps  
√ With validator passes\*        1,138,172 rps  
√ With validator fail\*              4,829 rps  
  
   No validator\* (#)                0%      (1,192,808 rps)   (avg: 838ns)  
   With validator passes\*       -4.58%      (1,138,172 rps)   (avg: 878ns)  
   With validator fail\*         -99.6%          (4,829 rps)   (avg: 207μs)  
\-----------------------------------------------------------------------  
  
Suite: Call with metrics  
√ No metrics\*          1,601,825 rps  
√ With metrics\*          493,759 rps  
  
   No metrics\* (#)         0%      (1,601,825 rps)   (avg: 624ns)  
   With metrics\*      -69.18%        (493,759 rps)   (avg: 2μs)  
\-----------------------------------------------------------------------  
```
```
Suite: Set & get 1k data with cacher  
√ Memory\*        2,233,922 rps  
√ Redis\*            10,729 rps  
  
   Memory\*           0%      (2,233,922 rps)   (avg: 447ns)  
   Redis\*       -99.52%         (10,729 rps)   (avg: 93μs)  
\-----------------------------------------------------------------------  
  
Suite: Test getCacheKey  
√ Dynamic         2,783,031 rps  
√ Static          6,787,824 rps  
  
   Dynamic          -59%      (2,783,031 rps)   (avg: 359ns)  
   Static             0%      (6,787,824 rps)   (avg: 147ns)  
\-----------------------------------------------------------------------  
  
Suite: Test cloning on MemoryCacher  
√ Without cloning\*        4,608,810 rps  
√ With cloning\*             182,449 rps  
  
   Without cloning\*           0%      (4,608,810 rps)   (avg: 216ns)  
   With cloning\*         -96.04%        (182,449 rps)   (avg: 5μs)  
\-----------------------------------------------------------------------  
```
```
Suite: Emit event  
√ Emit event without subscribers                                     7,093,574 rps  
√ Emit simple event to 1 subscribers                                 6,318,996 rps  
√ Emit simple event to 20 subscribers                                6,428,321 rps  
√ Emit wildcard event to 20 subscribers                              6,684,002 rps  
√ Emit multi-wildcard event to 20 subscribers without params         7,176,790 rps  
√ Emit multi-wildcard event to 20 subscribers with params            6,577,082 rps  
  
   Emit event without subscribers (#)                                    0%      (7,093,574 rps)   (avg: 140ns)  
   Emit simple event to 1 subscribers                               -10.92%      (6,318,996 rps)   (avg: 158ns)  
   Emit simple event to 20 subscribers                               -9.38%      (6,428,321 rps)   (avg: 155ns)  
   Emit wildcard event to 20 subscribers                             -5.77%      (6,684,002 rps)   (avg: 149ns)  
   Emit multi-wildcard event to 20 subscribers without params        +1.17%      (7,176,790 rps)   (avg: 139ns)  
   Emit multi-wildcard event to 20 subscribers with params           -7.28%      (6,577,082 rps)   (avg: 152ns)  
\-----------------------------------------------------------------------  
```
```
JSON length: 89  
Avro length: 38  
MsgPack length: 69  
ProtoBuf length: 45  
Thrift length: 76  
Suite: Serialize packet with 10bytes  
√ JSON               811,290 rps  
√ Avro               624,283 rps  
√ MsgPack             76,703 rps  
√ ProtoBuf           770,425 rps  
√ Thrift             110,583 rps  
  
   JSON (#)            0%        (811,290 rps)   (avg: 1μs)  
   Avro           -23.05%        (624,283 rps)   (avg: 1μs)  
   MsgPack        -90.55%         (76,703 rps)   (avg: 13μs)  
   ProtoBuf        -5.04%        (770,425 rps)   (avg: 1μs)  
   Thrift         -86.37%        (110,583 rps)   (avg: 9μs)  
\-----------------------------------------------------------------------  
  
JSON length: 229  
Avro length: 179  
MsgPack length: 210  
ProtoBuf length: 200  
Thrift length: 258  
Suite: Serialize packet with 150bytes  
√ JSON               437,439 rps  
√ Avro               348,092 rps  
√ MsgPack             63,000 rps  
√ ProtoBuf           408,807 rps  
√ Thrift              93,022 rps  
  
   JSON (#)            0%        (437,439 rps)   (avg: 2μs)  
   Avro           -20.42%        (348,092 rps)   (avg: 2μs)  
   MsgPack         -85.6%         (63,000 rps)   (avg: 15μs)  
   ProtoBuf        -6.55%        (408,807 rps)   (avg: 2μs)  
   Thrift         -78.73%         (93,022 rps)   (avg: 10μs)  
\-----------------------------------------------------------------------  
  
JSON length: 1131  
Avro length: 1081  
MsgPack length: 1113  
ProtoBuf length: 1170  
Thrift length: 1364  
Suite: Serialize packet with 1kbytes  
√ JSON               148,417 rps  
√ Avro               125,403 rps  
√ MsgPack             17,387 rps  
√ ProtoBuf           143,478 rps  
√ Thrift              63,276 rps  
  
   JSON (#)            0%        (148,417 rps)   (avg: 6μs)  
   Avro           -15.51%        (125,403 rps)   (avg: 7μs)  
   MsgPack        -88.29%         (17,387 rps)   (avg: 57μs)  
   ProtoBuf        -3.33%        (143,478 rps)   (avg: 6μs)  
   Thrift         -57.37%         (63,276 rps)   (avg: 15μs)  
\-----------------------------------------------------------------------  
  
JSON length: 10528  
Avro length: 10479  
MsgPack length: 10510  
ProtoBuf length: 11213  
Thrift length: 12699  
Suite: Serialize packet with 10kbytes  
√ JSON                19,147 rps  
√ Avro                18,598 rps  
√ MsgPack              2,343 rps  
√ ProtoBuf            20,118 rps  
√ Thrift              14,284 rps  
  
   JSON (#)            0%         (19,147 rps)   (avg: 52μs)  
   Avro            -2.86%         (18,598 rps)   (avg: 53μs)  
   MsgPack        -87.77%          (2,343 rps)   (avg: 426μs)  
   ProtoBuf        +5.07%         (20,118 rps)   (avg: 49μs)  
   Thrift         -25.39%         (14,284 rps)   (avg: 70μs)  
\-----------------------------------------------------------------------  
  
JSON length: 50601  
Avro length: 50552  
MsgPack length: 50583  
ProtoBuf length: 54187  
Thrift length: 61472  
Suite: Serialize packet with 50kbytes  
√ JSON                 4,110 rps  
√ Avro                 4,032 rps  
√ MsgPack                481 rps  
√ ProtoBuf             4,362 rps  
√ Thrift               3,401 rps  
  
   JSON (#)            0%          (4,110 rps)   (avg: 243μs)  
   Avro             -1.9%          (4,032 rps)   (avg: 248μs)  
   MsgPack         -88.3%            (481 rps)   (avg: 2ms)  
   ProtoBuf        +6.13%          (4,362 rps)   (avg: 229μs)  
   Thrift         -17.26%          (3,401 rps)   (avg: 294μs)  
\-----------------------------------------------------------------------  
  
JSON length: 101100  
Avro length: 101051  
MsgPack length: 101084  
ProtoBuf length: 108312  
Thrift length: 122849  
Suite: Serialize packet with 100kbytes  
√ JSON                 2,075 rps  
√ Avro                 2,045 rps  
√ MsgPack                234 rps  
√ ProtoBuf             2,202 rps  
√ Thrift               1,752 rps  
  
   JSON (#)            0%          (2,075 rps)   (avg: 481μs)  
   Avro            -1.47%          (2,045 rps)   (avg: 488μs)  
   MsgPack        -88.73%            (234 rps)   (avg: 4ms)  
   ProtoBuf         +6.1%          (2,202 rps)   (avg: 454μs)  
   Thrift         -15.57%          (1,752 rps)   (avg: 570μs)  
\-----------------------------------------------------------------------  
  
JSON length: 1010082  
Avro length: 1010033  
MsgPack length: 1010066  
ProtoBuf length: 1082562  
Thrift length: 1227635  
Suite: Serialize packet with 1Mbytes  
√ JSON                   187 rps  
√ Avro                   184 rps  
√ MsgPack                 22 rps  
√ ProtoBuf               195 rps  
√ Thrift                 156 rps  
  
   JSON (#)            0%            (187 rps)   (avg: 5ms)  
   Avro            -1.81%            (184 rps)   (avg: 5ms)  
   MsgPack        -88.04%             (22 rps)   (avg: 44ms)  
   ProtoBuf        +4.44%            (195 rps)   (avg: 5ms)  
   Thrift         -16.75%            (156 rps)   (avg: 6ms)  
\-----------------------------------------------------------------------  
```

#### _docs_0.15_broker.md

> Source: https://moleculer.services/docs/0.15/broker
> Scraped: 4/13/2025, 3:24:01 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/broker.md)

The `ServiceBroker` is the main component of Moleculer. It handles services, calls actions, emits events and communicates with remote nodes. You must create a `ServiceBroker` instance on every node.

![Broker logical diagram](https://moleculer.services/docs/0.15/assets/service-broker.svg)

## [](_docs_0.15_broker.md#Create-a-ServiceBroker)Create a ServiceBroker

> **Quick tip:** You don’t need to create manually ServiceBroker in your project. Use the [Moleculer Runner](_docs_0.15_runner.md) to create and execute a broker and load services. [Read more about Moleculer Runner](_docs_0.15_runner.md).

**Create broker with default settings:**
```
const { ServiceBroker } = require("moleculer");  
const broker = new ServiceBroker();  
```
**Create broker with custom settings:**
```
const { ServiceBroker } = require("moleculer");  
const broker = new ServiceBroker({  
    nodeID: "my-node"  
});  
```
**Create broker with transporter to communicate with remote nodes:**
```
const { ServiceBroker } = require("moleculer");  
const broker = new ServiceBroker({  
    nodeID: "node-1",  
    transporter: "nats://localhost:4222",  
    logLevel: "debug",  
    requestTimeout: 5 \* 1000  
});  
```
### [](_docs_0.15_broker.md#Metadata-option)Metadata option

Use `metadata` property to store custom values. It can be useful for a custom [middleware](_docs_0.15_middlewares.md#Loading-amp-Extending) or [strategy](_docs_0.15_balancing.md#Custom-strategy).
```
const broker = new ServiceBroker({  
    nodeID: "broker-2",  
    transporter: "NATS",  
    metadata: {  
        region: "eu-west1"  
    }  
});  
```
> The `metadata` property can be obtained by running `$node.list` action.

> The `metadata` property is transferred to other nodes.

## [](_docs_0.15_broker.md#Ping)Ping

To ping remote nodes, use `broker.ping` method. You can ping a node, or all available nodes. It returns a `Promise` which contains the received ping information (latency, time difference). A timeout value can be defined.

### [](_docs_0.15_broker.md#Ping-a-node-with-1-second-timeout)Ping a node with 1 second timeout
```
broker.ping("node-123", 1000).then(res => broker.logger.info(res));  
```
**Output**
```
{   
    nodeID: 'node-123',   
    elapsedTime: 16,   
    timeDiff: \-3   
}  
```
> The `timeDiff` value is the difference of the system clock between these two nodes.

### [](_docs_0.15_broker.md#Ping-multiple-nodes)Ping multiple nodes
```
broker.ping(\["node-100", "node-102"\]).then(res => broker.logger.info(res));  
```
**Output**
```
{   
    "node-100": {   
        nodeID: 'node-100',   
        elapsedTime: 10,   
        timeDiff: \-2   
    },  
    "node-102": {   
        nodeID: 'node-102',   
        elapsedTime: 250,   
        timeDiff: 850   
    }   
}  
```
### [](_docs_0.15_broker.md#Ping-all-available-nodes)Ping all available nodes
```
broker.ping().then(res => broker.logger.info(res));  
```
**Output**
```
{   
    "node-100": {   
        nodeID: 'node-100',   
        elapsedTime: 10,   
        timeDiff: \-2   
    } ,  
    "node-101": {   
        nodeID: 'node-101',   
        elapsedTime: 18,   
        timeDiff: 32   
    },   
    "node-102": {   
        nodeID: 'node-102',   
        elapsedTime: 250,   
        timeDiff: 850   
    }   
}  
```
## [](_docs_0.15_broker.md#Properties-of-ServiceBroker)Properties of ServiceBroker

Name

Type

Description

`broker.options`

`Object`

Broker options.

`broker.Promise`

`Promise`

Bluebird Promise class.

`broker.started`

`Boolean`

Broker state.

`broker.namespace`

`String`

Namespace.

`broker.nodeID`

`String`

Node ID.

`broker.instanceID`

`String`

Instance ID.

`broker.metadata`

`Object`

Metadata from broker options.

`broker.logger`

`Logger`

Logger class of ServiceBroker.

`broker.cacher`

`Cacher`

Cacher instance

`broker.serializer`

`Serializer`

Serializer instance.

`broker.validator`

`Any`

Parameter Validator instance.

`broker.services`

`Array<Service>`

Local services.

`broker.metrics`

`MetricRegistry`

Built-in Metric Registry.

`broker.tracer`

`Tracer`

Built-in Tracer instance.

`broker.errorRegenerator`

`Regenerator`

Built-in Regenerator instance.

## [](_docs_0.15_broker.md#Methods-of-ServiceBroker)Methods of ServiceBroker

Name

Response

Description

`broker.start()`

`Promise`

Start broker.

`broker.stop()`

`Promise`

Stop broker.

`broker.repl()`

\-

Start REPL mode.

`broker.errorHandler(err, info)`

\-

Call the global error handler.

`broker.getLogger(module, props)`

`Logger`

Get a child logger.

`broker.fatal(message, err, needExit)`

\-

Throw an error and exit the process.

`broker.loadServices(folder, fileMask)`

`Number`

Load services from a folder.

`broker.loadService(filePath)`

`Service`

Load a service from file.

`broker.createService(schema)`

`Service`

Create a service from schema.

`broker.destroyService(service)`

`Promise`

Destroy a loaded local service.

`broker.getLocalService(name)`

`Service`

Get a local service instance by full name (e.g. `v2.posts`)

`broker.waitForServices(serviceNames, timeout, interval)`

`Promise`

Wait for services.

`broker.call(actionName, params, opts)`

`Promise`

Call a service.

`broker.mcall(def)`

`Promise`

Multiple service calling.

`broker.emit(eventName, payload, opts)`

\-

Emit a balanced event.

`broker.broadcast(eventName, payload, opts)`

\-

Broadcast an event.

`broker.broadcastLocal(eventName, payload, opts)`

\-

Broadcast an event to local services only.

`broker.ping(nodeID, timeout)`

`Promise`

Ping remote nodes.

`broker.hasEventListener("eventName")`

`Boolean`

Checks if broker is listening to an event.

`broker.getEventListeners("eventName")`

`Array<Object>`

Returns all registered event listeners for an event name.

`broker.generateUid()`

`String`

Generate an UUID/token.

`broker.callMiddlewareHook(name, args, opts)`

\-

Call an async hook in the registered middlewares.

`broker.callMiddlewareHookSync(name, args, opts)`

\-

Call a sync hook in the registered middlewares.

`broker.isMetricsEnabled()`

`Boolean`

Check the metrics feature is enabled.

`broker.isTracingEnabled()`

`Boolean`

Check the tracing feature is enabled.

## [](_docs_0.15_broker.md#Global-error-handler)Global error handler

The global error handler is generic way to handle exceptions. It catches the unhandled errors of action & event handlers.

**Catch, handle & log the error**
```
const broker = new ServiceBroker({  
    errorHandler(err, info) {  
          
        this.logger.warn("Error handled:", err);  
    }  
});  
```
**Catch & throw further the error**
```
const broker = new ServiceBroker({  
    errorHandler(err, info) {  
        this.logger.warn("Log the error:", err);  
        throw err;   
    }  
});  
```
> The `info` object contains the broker and the service instances, the current context and the action or the event definition.

#### _docs_0.15_caching.md

> Source: https://moleculer.services/docs/0.15/caching
> Scraped: 4/13/2025, 3:24:01 AM

Moleculer has a built-in caching solution to cache responses of service actions. To enable it, set a `cacher` type in [broker option](_docs_0.15_configuration.md#Broker-options) and set the `cache: true` in [action definition](_docs_0.15_services.md#Actions) what you want to cache.

**Cached action example**
```
const { ServiceBroker } = require("moleculer");  
  
  
const broker = new ServiceBroker({  
    cacher: "Memory"  
});  
  
  
broker.createService({  
    name: "users",  
    actions: {  
        list: {  
              
            cache: true,   
            handler(ctx) {  
                this.logger.info("Handler called!");  
                return \[  
                    { id: 1, name: "John" },  
                    { id: 2, name: "Jane" }  
                \]  
            }  
        }  
    }  
});  
  
broker.start()  
    .then(() => {  
          
        return broker.call("users.list").then(res => broker.logger.info("Users count:", res.length));  
    })  
    .then(() => {  
          
        return broker.call("users.list").then(res => broker.logger.info("Users count from cache:", res.length));  
    });  
```
**Console messages:**
```
\[2017-08-18T13:04:33.845Z\] INFO  dev-pc/BROKER: Broker started.  
\[2017-08-18T13:04:33.848Z\] INFO  dev-pc/USERS: Handler called!  
\[2017-08-18T13:04:33.849Z\] INFO  dev-pc/BROKER: Users count: 2  
\[2017-08-18T13:04:33.849Z\] INFO  dev-pc/BROKER: Users count from cache: 2  
```
As you can see, the `Handler called` message appears only once because the response of second request is returned from the cache.

> [Try it on Runkit](https://runkit.com/icebob/moleculer-cacher-example2)

## [](_docs_0.15_caching.md#Cache-keys)Cache keys

The cacher generates keys from service name, action name and the params of context.  
The syntax of key is:
```
<serviceName>.<actionName>:<parameters or hash of parameters>  
```
So if you call the `posts.list` action with params `{ limit: 5, offset: 20 }`, the cacher calculates a hash from the params. So the next time, when you call this action with the same params, it will find the entry in the cache by key.

**Example hashed cache key for “posts.find” action**
```
posts.find:limit|5|offset|20  
```
The params object can contain properties that are not relevant for the cache key. Also, it can cause performance issues if the key is too long. Therefore it is recommended to set an object for `cache` property which contains a list of essential parameter names under the `keys` property.  
To use meta keys in cache `keys` use the `#` prefix.

**Strict the list of `params`, `meta`, `headers` properties used for generating keys**
```
  
module.exports = {  
  name: "posts",  
  actions: {  
    list: {  
      cache: {  
        keys: \[  
          "limit",   
          "#tenant",   
          "@customProp",   
        \],  
      },  
      handler(ctx) {  
        const tenant = ctx.meta.tenant;  
        const limit = ctx.params.limit;  
        const customProp = ctx.headers.customProp;          
      },  
    },  
  },  
};  
```
> **Performance tip**
> 
> This solution is pretty fast, so we recommend to use it in production. ![](https://img.shields.io/badge/performance-%2B20%25-brightgreen.svg)

### [](_docs_0.15_caching.md#Limiting-cache-key-length)Limiting cache key length

Occasionally, the key can be very long, which can cause performance issues. To avoid it, maximize the length of concatenated params in the key with `maxParamsLength` cacher option. When the key is longer than the configured limit value, the cacher calculates a hash (SHA256) from the full key and adds it to the end of the key.

> The minimum of `maxParamsLength` is `44` (SHA 256 hash length in Base64).
> 
> To disable this feature, set it to `0` or `null`.

**Generate a full key from the whole params without limit**
```
cacher.getCacheKey("posts.find", { id: 2, title: "New post", content: "It can be very very looooooooooooooooooong content. So this key will also be too long" });  
  
```
**Generate a limited-length key**
```
const broker = new ServiceBroker({  
    cacher: {  
        type: "Memory",  
        options: {  
            maxParamsLength: 60  
        }  
    }  
});  
  
cacher.getCacheKey("posts.find", { id: 2, title: "New post", content: "It can be very very looooooooooooooooooong content. So this key will also be too long" });  
  
```
## [](_docs_0.15_caching.md#Conditional-caching)Conditional caching

Conditional caching allows you to bypass cached responses and execute an action to obtain fresh data based on specific conditions or criteria. To bypass the cache set `ctx.meta.$cache` to `false` before calling an action.

**Example of turning off the caching for the `greeter.hello` action**
```
broker.call("greeter.hello", { name: "Moleculer" }, { meta: { $cache: false }}))  
```
As an alternative, a custom function can be implemented to enable bypassing the cache. The custom function accepts as an argument the context (`ctx`) instance therefore it has access any params or meta data. This allows to pass the bypass flag within the request.

**Example of a custom conditional caching function**
```
  
module.exports = {  
    name: "greeter",  
    actions: {  
        hello: {  
            cache: {  
                enabled: ctx => ctx.params.noCache !== true,   
                keys: \["name"\]  
            },  
            handler(ctx) {  
                this.logger.debug(chalk.yellow("Execute handler"));  
                return \`Hello ${ctx.params.name}\`;  
            }  
        }  
    }  
};  
  
  
broker.call("greeter.hello", { name: "Moleculer", noCache: true }))  
```
## [](_docs_0.15_caching.md#TTL)TTL

Default TTL setting can be overriden in action definition.
```
const broker = new ServiceBroker({  
    cacher: {  
        type: "memory",  
        options: {  
            ttl: 30   
        }  
    }  
});  
  
broker.createService({  
    name: "posts",  
    actions: {  
        list: {  
            cache: {  
                  
                ttl: 5  
            },  
            handler(ctx) {  
                  
            }  
        }  
    }  
});  
```
## [](_docs_0.15_caching.md#Custom-key-generator)Custom key-generator

To overwrite the built-in cacher key generator, set your own function as `keygen` in cacher options.
```
const broker = new ServiceBroker({  
    cacher: {  
        type: "memory",  
        options: {  
            keygen(name, params, meta, keys) {  
                  
                  
                  
                  
                  
                return "";  
            }  
        }  
    }  
});  
```
## [](_docs_0.15_caching.md#Manual-caching)Manual caching

The cacher module can be used manually. Just call the `get`, `set`, `del` methods of `broker.cacher`.
```
  
broker.cacher.set("mykey.a", { a: 5 });  
  
  
const obj = await broker.cacher.get("mykey.a")  
  
  
await broker.cacher.del("mykey.a");  
  
  
await broker.cacher.clean("mykey.\*\*");  
  
  
await broker.cacher.clean();  
```
Additionally, the complete [ioredis](https://github.com/luin/ioredis) client API is available at `broker.cacher.client` when using the built-in Redis cacher:
```
  
const pipeline = broker.cacher.client.pipeline();  
  
pipeline.set('mykey.a', 'myvalue.a');  
pipeline.set('mykey.b', 'myvalue.b');  
  
pipeline.exec();  
```
## [](_docs_0.15_caching.md#Clear-cache)Clear cache

Clearing the cache is a necessary operation to ensure data consistency and accuracy within your application. It allows you to remove outdated or stale cached entries, providing a clean slate for storing updated information

**Example to clean the cache inside actions**
```
{  
    name: "users",  
    actions: {  
        create(ctx) {  
              
            const user = new User(ctx.params);  
  
              
            this.broker.cacher.clean();  
  
              
            this.broker.cacher.clean("users.\*\*");  
  
              
            this.broker.cacher.clean(\[ "users.\*\*", "posts.\*\*" \]);  
  
              
            this.broker.cacher.del("users.list");  
  
              
            this.broker.cacher.del(\[ "users.model:5", "users.model:8" \]);  
        }  
    }  
}  
```
### [](_docs_0.15_caching.md#Clear-cache-among-multiple-service-instances)Clear cache among multiple service instances

Clearing the cache among multiple service instances is essential to synchronize data across distributed systems and maintain consistency in a microservices architecture.

The best practice to clear cache entries among multiple service instances is to use broadcast events. Note that this is only required for non-centralized cachers like `Memory` or `MemoryLRU`.

**Example**
```
module.exports = {  
    name: "users",  
    actions: {  
        create(ctx) {  
              
            const user = new User(ctx.params);  
  
              
            this.cleanCache();  
  
            return user;  
        }  
    },  
  
    methods: {  
        cleanCache() {  
              
            this.broker.broadcast("cache.clean.users");  
        }  
    },  
  
    events: {  
        "cache.clean.users"() {  
            if (this.broker.cacher) {  
                this.broker.cacher.clean("users.\*\*");  
            }  
        }  
    }  
};  
```
### [](_docs_0.15_caching.md#Clear-cache-among-different-services)Clear cache among different services

Service dependency is a common situation. E.g. `posts` service stores information from `users` service in cached entries (in case of populating).

**Example cache entry in `posts` service**
```
{  
    \_id: 1,  
    title: "My post",  
    content: "Some content",  
    author: {  
        \_id: 130,  
        fullName: "John Doe",  
        avatar: "https://..."  
    },  
    createdAt: 1519729167666  
}  
```
The `author` field is received from `users` service. So if the `users` service clears cache entries, the `posts` service has to clear own cache entries, as well. Therefore you should also subscribe to the `cache.clear.users` event in `posts` service.

To make it easier, create a `CacheCleaner` mixin and define in the dependent services schema.

**cache.cleaner.mixin.js**
```
module.exports = function(serviceNames) {  
    const events = {};  
  
    serviceNames.forEach(name => {  
        events\[\`cache.clean.${name}\`\] = function() {  
            if (this.broker.cacher) {  
                this.logger.debug(\`Clear local '${this.name}' cache\`);  
                this.broker.cacher.clean(\`${this.name}.\*\`);  
            }  
        };  
    });  
  
    return {  
        events  
    };  
};  
```
**posts.service.js**
```
const CacheCleaner = require("./cache.cleaner.mixin");  
  
module.exports = {  
    name: "posts",  
    mixins: \[CacheCleaner(\[  
        "users",  
        "posts"  
    \])\],  
  
    actions: {  
          
    }  
};  
```
With this solution if the `users` service emits a `cache.clean.users` event, the `posts` service will also clear its own cache entries.

## [](_docs_0.15_caching.md#Cache-locking)Cache locking

Cache locking is a mechanism used to prevent race conditions and ensure data integrity by temporarily preventing concurrent access to cached resources.

Moleculer also supports cache locking feature. For detailed info [check this PR](https://github.com/moleculerjs/moleculer/pull/490).

**Enable Lock**
```
const broker = new ServiceBroker({  
    cacher: {  
        ttl: 60,  
        lock: true,   
    }  
});  
```
**Enable with TTL**
```
const broker = new ServiceBroker({  
    cacher: {  
        ttl: 60,  
        lock: {  
            ttl: 15,   
            staleTime: 10,   
        }  
    }  
});  
```
**Disable Lock**
```
const broker = new ServiceBroker({  
    cacher: {  
        ttl: 60,  
        lock: {  
            enable: false,   
            ttl: 15,   
            staleTime: 10,   
        }  
    }  
});  
```
**Example for Redis cacher with `redlock` library**
```
const broker = new ServiceBroker({  
  cacher: {  
    type: "Redis",  
    options: {  
        
      prefix: "MOL",  
        
      ttl: 30,  
        
      monitor: false,  
        
      redis: {  
        host: "redis-server",  
        port: 6379,  
        password: "1234",  
        db: 0  
      },  
      lock: {  
        ttl: 15,   
        staleTime: 10,   
      },  
        
      redlock: {  
          
        clients: \[client1, client2, client3\],  
          
          
        driftFactor: 0.01,   
  
          
          
        retryCount: 10,  
  
          
        retryDelay: 200,   
  
          
          
          
        retryJitter: 200   
      }  
    }  
  }  
});  
```
## [](_docs_0.15_caching.md#Built-in-Caching-Modules)Built-in Caching Modules

### [](_docs_0.15_caching.md#Memory-cacher)Memory cacher

`MemoryCacher` is a built-in memory cache module. It stores entries in the heap memory.

**Enable memory cacher**
```
const broker = new ServiceBroker({  
    cacher: "Memory"  
});  
```
Or
```
const broker = new ServiceBroker({  
    cacher: true  
});  
```
**Enable with options**
```
const broker = new ServiceBroker({  
    cacher: {  
        type: "Memory",  
        options: {  
            ttl: 30   
            clone: true   
        }  
    }  
});  
```
**Options**

Name

Type

Default

Description

`ttl`

`Number`

`null`

Time-to-live in seconds.

`clone`

`Boolean` or `Function`

`false`

Clone the cached data when return it.

`keygen`

`Function`

`null`

Custom cache key generator function.

`maxParamsLength`

`Number`

`null`

Maximum length of params in generated keys.

`lock`

`Boolean` or `Object`

`null`

Enable lock feature.

#### [](_docs_0.15_caching.md#Cloning)Cloning

The cacher uses the lodash `_.cloneDeep` method for cloning. To change it, set a `Function` to the `clone` option instead of a `Boolean`.

**Custom clone function with JSON parse & stringify**
```
const broker = new ServiceBroker({   
    cacher: {  
        type: "Memory",  
        options: {  
            clone: data => JSON.parse(JSON.stringify(data))  
        }  
    }  
});  
```
### [](_docs_0.15_caching.md#LRU-memory-cacher)LRU memory cacher

`LRU memory cacher` is a built-in [LRU cache](https://github.com/isaacs/node-lru-cache) module. It deletes the least-recently-used items.

**Enable LRU cacher**
```
const broker = new ServiceBroker({  
    cacher: "MemoryLRU"  
});  
```
**With options**
```
let broker = new ServiceBroker({  
    logLevel: "debug",  
    cacher: {  
        type: "MemoryLRU",  
        options: {  
              
            max: 100,  
              
            ttl: 3  
        }  
    }  
});  
```
**Options**

Name

Type

Default

Description

`ttl`

`Number`

`null`

Time-to-live in seconds.

`max`

`Number`

`null`

Maximum items in the cache.

`clone`

`Boolean` or `Function`

`false`

Clone the cached data when return it.

`keygen`

`Function`

`null`

Custom cache key generator function.

`maxParamsLength`

`Number`

`null`

Maximum length of params in generated keys.

`lock`

`Boolean` or `Object`

`null`

Enable lock feature.

> **Dependencies**
> 
> To be able to use this cacher, install the `lru-cache` module with the `npm install lru-cache --save` command.

### [](_docs_0.15_caching.md#Redis-cacher)Redis cacher

`RedisCacher` is a built-in [Redis](https://redis.io/) based distributed cache module. It uses [`ioredis`](https://github.com/luin/ioredis) library.  
Use it, if you have multiple instances of services because if one instance stores some data in the cache, other instances will find it.

**Enable Redis cacher**
```
const broker = new ServiceBroker({  
    cacher: "Redis"  
});  
```
**With connection string**
```
const broker = new ServiceBroker({  
    cacher: "redis://redis-server:6379"  
});  
```
**With options**
```
const broker = new ServiceBroker({  
    cacher: {  
        type: "Redis",  
        options: {  
              
            prefix: "MOL",              
              
            ttl: 30,   
              
            monitor: false,  
              
            redis: {  
                host: "redis-server",  
                port: 6379,  
                password: "1234",  
                db: 0  
            }  
        }  
    }  
});  
```
**With MessagePack serializer**  
You can define a serializer for Redis Cacher. By default, it uses the JSON serializer.
```
const broker = new ServiceBroker({  
    nodeID: "node-123",  
    cacher: {  
        type: "Redis",  
        options: {  
            ttl: 30,  
  
              
            serializer: "MsgPack",  
  
            redis: {  
                host: "my-redis"  
            }  
        }  
    }  
});  
```
**With Redis Cluster Client**
```
const broker = new ServiceBroker({  
    cacher: {  
        type: "Redis",  
        options: {  
            ttl: 30,   
  
            cluster: {  
                nodes: \[  
                    { port: 6380, host: "127.0.0.1" },  
                    { port: 6381, host: "127.0.0.1" },  
                    { port: 6382, host: "127.0.0.1" }  
                \],  
                options: {  }  
            }     
        }  
    }  
});  
```
**Options**

Name

Type

Default

Description

`prefix`

`String`

`null`

Prefix for generated keys.

`ttl`

`Number`

`null`

Time-to-live in seconds. Disabled: 0 or null

`monitor`

`Boolean`

`false`

Enable Redis client [monitoring feature](https://github.com/luin/ioredis#monitor). If enabled, every client operation will be logged (on debug level)

`redis`

`Object`

`null`

Custom Redis options. Will be passed to the `new Redis()` constructor. [Read more](https://github.com/luin/ioredis#connect-to-redis).

`keygen`

`Function`

`null`

Custom cache key generator function.

`maxParamsLength`

`Number`

`null`

Maximum length of params in generated keys.

`serializer`

`String`

`"JSON"`

Name of a built-in serializer.

`cluster`

`Object`

`null`

Redis Cluster client configuration. [More information](https://github.com/luin/ioredis#cluster)

`lock`

`Boolean` or `Object`

`null`

Enable lock feature.

`pingInterval`

`Number`

`null`

Emit a Redis PING command every `pingInterval` milliseconds. Can be used to keep connections alive which may have idle timeouts.

> **Dependencies**
> 
> To be able to use this cacher, install the `ioredis` module with the `npm install ioredis --save` command.

## [](_docs_0.15_caching.md#Creating-a-Custom-Caching-Module)Creating a Custom Caching Module

Custom cache module can be created. We recommend to copy the source of [MemoryCacher](https://github.com/moleculerjs/moleculer/blob/master/src/cachers/memory.js) or [RedisCacher](https://github.com/moleculerjs/moleculer/blob/master/src/cachers/redis.js) and implement the `get`, `set`, `del` and `clean` methods.

### [](_docs_0.15_caching.md#Create-custom-cacher)Create custom cacher
```
const BaseCacher = require("moleculer").Cachers.Base;  
  
class MyCacher extends BaseCacher {  
    async get(key) {  }  
    async set(key, data, ttl) {  }  
    async del(key) {  }  
    async clean(match = "\*\*") {  }  
}  
```
### [](_docs_0.15_caching.md#Use-custom-cacher)Use custom cacher
```
const { ServiceBroker } = require("moleculer");  
const MyCacher = require("./my-cacher");  
  
const broker = new ServiceBroker({  
    cacher: new MyCacher()  
});  
```
### [](_docs_0.15_caching.md#Handling-missing-cache-entries)Handling missing cache entries

To be able to distinguish between a cache miss and a cache with a `null` value you can use the `missingResponse` option what allows you to define a custom response for cache misses.

By default, the cache miss response is `undefined`.

**Example: using a custom symbol to detect missing entries**
```
const missingSymbol = Symbol("MISSING");  
  
  
module.exports = {  
    cacher: {  
        type: "Memory",  
        options: {  
            missingResponse: missingSymbol  
        }  
    }  
}  
  
  
  
const res = await cacher.get("not-existing-key");  
if (res === cacher.opts.missingSymbol) {  
    console.log("It's not cached.");  
}  
```

#### _docs_0.15_clustering.md

> Source: https://moleculer.services/docs/0.15/clustering
> Scraped: 4/13/2025, 3:24:03 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/clustering.md)

Moleculer framework supports several software architectures.

## [](_docs_0.15_clustering.md#Monolith-architecture)Monolith architecture

In this version, all services are running on the same node like a monolith. There is no network latency and no transporter module. _The local calls are the fastest._

![Monolith architecture](https://moleculer.services/docs/0.15/assets/architectures/monolith.svg)

## [](_docs_0.15_clustering.md#Microservices-architecture)Microservices architecture

This is the well-known microservices architecture when all services are running on individual nodes and communicate via transporter. In this case, the network latency is not negligible. However, your services can be scaled to be resilient and fault-tolerant.

![Microservices architecture](https://moleculer.services/docs/0.15/assets/architectures/microservices.svg)

## [](_docs_0.15_clustering.md#Mixed-architecture)Mixed architecture

In this case, we are running coherent services in a group on the same node. It combines the advantages of monolith and microservices architectures. For example, if the `posts` service calls the `users` service multiple times, put them to the same node, so that the network latency between these services is cut down. If the node is overloaded, just scale it up.

![Mixed architecture](https://moleculer.services/docs/0.15/assets/architectures/mixed.svg)

> **Tip**
> 
> The ServiceBroker first tries to call the local instances of service (if exists) to reduce network latencies. This logic can be turned off in [broker options](_docs_0.15_configuration.md#Broker-options) with `preferLocal: false` property under the `registry` key.

## [](_docs_0.15_clustering.md#How-choose)How choose

Do you choose between monolith and microservices when developing your application? Do you choose monolith approach because its easy to develop? Do you prefer microservices architecture because it is reliable and highly scalable? With Moleculer you don’t have to choose. You can have the best of both approaches. During the development of your application load all services is single node. This way you can quickly debug and test of your application logic. When ready, simply distribute your services across multiple nodes. Don’t worry, you don’t have to change a single line of code in your services. Just select a transporter, load one service per node and you’re done. Your application is running in microservices architecture.

#### _docs_0.15_concepts.md

> Source: https://moleculer.services/docs/0.15/concepts
> Scraped: 4/13/2025, 3:24:01 AM

This guide covers the core concepts of any Moleculer application.

## [](_docs_0.15_concepts.md#Service)Service

A [service](_docs_0.15_services.md) is a simple JavaScript module containing some part of a complex application. It is isolated and self-contained, meaning that even if it goes offline or crashes the remaining services would be unaffected.

## [](_docs_0.15_concepts.md#Node)Node

A node is a simple OS process running on a local or external network. A single instance of a node can host one or many services.

### [](_docs_0.15_concepts.md#Local-Services)Local Services

Two (or more) services running on a single node are considered local services. They share hardware resources and use local bus to communicate with each other, no network latency ([transporter](_docs_0.15_concepts.md#Transporter) is not used).

### [](_docs_0.15_concepts.md#Remote-Services)Remote Services

Services distributed across multiple nodes are considered remote. In this case, the communication is done via [transporter](_docs_0.15_concepts.md#Transporter).

## [](_docs_0.15_concepts.md#Service-Broker)Service Broker

[Service Broker](_docs_0.15_broker.md) is the heart of Moleculer. It is responsible for management and communication between services (local and remote). Each node must have an instance of Service Broker.

## [](_docs_0.15_concepts.md#Transporter)Transporter

[Transporter](_docs_0.15_networking.md) is a communication bus that services use to exchange messages. It transfers events, requests and responses.

## [](_docs_0.15_concepts.md#Gateway)Gateway

[API Gateway](_docs_0.15_moleculer-web.md) exposes Moleculer services to end-users. The gateway is a regular Moleculer service running a (HTTP, WebSockets, etc.) server. It handles the incoming requests, maps them into service calls, and then returns appropriate responses.

## [](_docs_0.15_concepts.md#Overall-View)Overall View

There’s nothing better than an example to see how all these concepts fit together. So let’s consider a hypothetical online store that only lists its products. It doesn’t actually sell anything online.

### [](_docs_0.15_concepts.md#Architecture)Architecture

From the architectural point-of-view the online store can be seen as a composition of 2 independent services: the `products` service and the `gateway` service. The first one is responsible for storage and management of the products while the second simply receives user´s requests and conveys them to the `products` service.

Now let’s take a look at how this hypothetical store can be created with Moleculer.

To ensure that our system is resilient to failures we will run the `products` and the `gateway` services in dedicated [nodes](_docs_0.15_concepts.md#Node) (`node-1` and `node-2`). If you recall, running services at dedicated nodes means that the [transporter](_docs_0.15_concepts.md#Transporter) module is required for inter services communication. Most of the transporters supported by Moleculer rely on a message broker for inter services communication, so we’re going to need one up and running. Overall, the internal architecture of our store is represented in the figure below.

Now, assuming that our services are up and running, the online store can serve user’s requests. So let’s see what actually happens with a request to list all available products. First, the request (`GET /products`) is received by the HTTP server running at `node-1`. The incoming request is simply passed from the HTTP server to the [gateway](_docs_0.15_concepts.md#Gateway) service that does all the processing and mapping. In this case in particular, the user´s request is mapped into a `listProducts` action of the `products` service. Next, the request is passed to the [broker](_docs_0.15_concepts.md#Service-Broker), which checks whether the `products` service is a [local](_docs_0.15_concepts.md#Local-Services) or a [remote](_docs_0.15_concepts.md#Remote-Services) service. In this case, the `products` service is remote so the broker needs to use the [transporter](_docs_0.15_concepts.md#Transporter) module to deliver the request. The transporter simply grabs the request and sends it through the communication bus. Since both nodes (`node-1` and `node-2`) are connected to the same communication bus (message broker), the request is successfully delivered to the `node-2`. Upon reception, the broker of `node-2` will parse the incoming request and forward it to the `products` service. Finally, the `products` service invokes the `listProducts` action and returns the list of all available products. The response is simply forwarded back to the end-user.

**Flow of user’s request**

![Architecture Overview](https://moleculer.services/docs/0.15/assets/overview.svg)

All the details that we’ve just seen might seem scary and complicated but you don’t need to be afraid. Moleculer does all the heavy lifting for you! You (the developer) only need to focus on the application logic. Take a look at the actual [implementation](_docs_0.15_concepts.md#Implementation) of our online store.

### [](_docs_0.15_concepts.md#Implementation)Implementation

Now that we’ve defined the architecture of our shop, let’s implement it. We’re going to use NATS, an open source messaging system, as a communication bus. So go ahead and get the latest version of [NATS Server](https://docs.nats.io/running-a-nats-service/introduction/installation). Run it with the default settings. You should get the following message:
```
\[18141\] 2016/10/31 13:13:40.732616 \[INF\] Starting nats-server version 0.9.4  
\[18141\] 2016/10/31 13:13:40.732704 \[INF\] Listening for client connections on 0.0.0.0:4222  
\[18141\] 2016/10/31 13:13:40.732967 \[INF\] Server is ready  
```
Next, create a new directory for our application, create a new `package.json` and install the dependencies. We´re going to use `moleculer` to create our services, `moleculer-web` as the HTTP gateway and `nats` for communication. In the end your `package.json` should look like this:
```
// package.json  
{  
  "name": "moleculer-store",  
  "dependencies": {  
    "moleculer": "^0.14.0",  
    "moleculer-web": "^0.9.0",  
    "nats": "^1.3.2"  
  }  
}  
```
Finally, we need to configure the brokers and create our services. So let’s create a new file (`index.js`) and do it:
```
  
const { ServiceBroker } = require("moleculer");  
const HTTPServer = require("moleculer-web");  
  
  
  
const brokerNode1 = new ServiceBroker({  
  nodeID: "node-1",  
  transporter: "NATS"  
});  
  
  
brokerNode1.createService({  
    
  name: "gateway",  
    
  mixins: \[HTTPServer\],  
  
  settings: {  
    routes: \[  
      {  
        aliases: {  
            
          "GET /products": "products.listProducts"  
        }  
      }  
    \]  
  }  
});  
  
  
  
const brokerNode2 = new ServiceBroker({  
  nodeID: "node-2",  
  transporter: "NATS"  
});  
  
  
brokerNode2.createService({  
    
  name: "products",  
  
  actions: {  
      
    listProducts(ctx) {  
      return \[  
        { name: "Apples", price: 5 },  
        { name: "Oranges", price: 3 },  
        { name: "Bananas", price: 2 }  
      \];  
    }  
  }  
});  
  
  
Promise.all(\[brokerNode1.start(), brokerNode2.start()\]);  
```
Now run `node index.js` in your terminal and open the link [`http://localhost:3000/products`](http://localhost:3000/products). You should get the following response:
```
\[  
    { "name": "Apples", "price": 5 },  
    { "name": "Oranges", "price": 3 },  
    { "name": "Bananas", "price": 2 }  
\]  
```
With just a couple dozen of lines of code we’ve created 2 isolated services capable of serving user’s requests and list the products. Moreover, our services can be easily scaled to become resilient and fault-tolerant. Impressive, right?

Head out to the [Documentation](_docs_0.15_broker.md) section for more details or check the [Examples](_docs_0.15_examples.md) page for more complex examples.

#### _docs_0.15_configuration.md

> Source: https://moleculer.services/docs/0.15/configuration
> Scraped: 4/13/2025, 3:24:01 AM

These options can be used in `ServiceBroker` constructor or in `moleculer.config.js` file.
```
{  
    namespace: "dev",  
    nodeID: "node-25",  
  
    logger: true,  
    logLevel: "info",  
    logFormatter: "default",  
    logObjectPrinter: null,  
  
    transporter: "nats://localhost:4222",  
  
    requestTimeout: 5000,  
    retryPolicy: {  
        enabled: true,  
        retries: 5,  
        delay: 100,  
        maxDelay: 1000,  
        factor: 2,  
        check: err => err && !!err.retryable  
    },  
  
    contextParamsCloning: false,  
    maxCallLevel: 100,  
    heartbeatInterval: 5,  
    heartbeatTimeout: 15,  
      
    tracking: {  
        enabled: true,  
        shutdownTimeout: 5000,  
    },  
  
    disableBalancer: false,  
  
    registry: {  
        strategy: "RoundRobin",  
        preferLocal: true  
    },  
  
    circuitBreaker: {  
        enabled: true,  
        threshold: 0.5,  
        windowTime: 60,  
        minRequestCount: 20,  
        halfOpenTime: 10 \* 1000,  
        check: err => err && err.code >= 500  
    },     
  
    bulkhead: {  
        enabled: true,  
        concurrency: 10,  
        maxQueueSize: 100,  
    },  
  
    transit: {  
        maxQueueSize: 50 \* 1000,  
        disableReconnect: false,  
        disableVersionCheck: false,  
        packetLogFilter: \["HEARTBEAT"\]  
    },  
  
    uidGenerator: null,  
  
    errorHandler: null,  
      
    cacher: "MemoryLRU",  
    serializer: "JSON",  
  
    validator: true,  
    errorRegenerator: null,  
  
    metrics: {  
        enabled: true,  
        reporter: \[  
            "Console"  
        \]  
    },  
  
    tracing: {  
        enabled: true,  
        exporter: \[  
            "Console"  
        \]  
    },  
  
    internalServices: true,  
    internalMiddlewares: true,  
  
    hotReload: true,  
  
    middlewares: \["MyMiddleware"\],  
  
    replOptions: {  
        delimiter: "mol # ",  

        customCommands: \[  
            {  
                command: "hello <name>",			  
                action(broker, args) {  
                      
                }  
            }  
        \]          
    },  
  
    metadata: {  
        region: "eu-west1"  
    },  
  
    skipProcessEventRegistration: false,  
    maxSafeObjectSize: null,  
  
    ServiceFactory: null,  
    ContextFactory: null,  
  
    created(broker) {},  
  
    started(broker) {},  
  
    stopped(broker) {}  
}  
```

#### _docs_0.15_context.md

> Source: https://moleculer.services/docs/0.15/context
> Scraped: 4/13/2025, 3:24:01 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/context.md)

When you call an action or emit an event, the broker creates a `Context` instance that contains all request information and passes it to the action/event handler as a single argument.

## [](_docs_0.15_context.md#Properties-of-Context)Properties of Context

Name

Type

Description

`ctx.id`

`String`

Context ID

`ctx.broker`

`ServiceBroker`

Instance of the broker.

`ctx.nodeID`

`String`

The caller or target Node ID.

`ctx.action`

`Object`

Instance of action definition.

`ctx.event`

`Object`

Instance of event definition.

`ctx.eventName`

`Object`

The emitted event name.

`ctx.eventType`

`String`

Type of event (“emit” or “broadcast”).

`ctx.eventGroups`

`Array<String>`

Groups of event.

`ctx.caller`

`String`

Service full name of the caller. E.g.: `v3.myService`

`ctx.requestID`

`String`

Request ID. If you make nested-calls, it will be the same ID.

`ctx.parentID`

`String`

Parent context ID (in nested-calls).

`ctx.params`

`Any`

Request params. _Second argument from `broker.call`._

`ctx.meta`

`Any`

Request metadata. _It will be also transferred to nested-calls._

`ctx.locals`

`Any`

Local data.

`ctx.level`

`Number`

Request level (in nested-calls). The first level is `1`.

`ctx.span`

`Span`

Current active span.

## [](_docs_0.15_context.md#Methods-of-Context)Methods of Context

Name

Response

Description

`ctx.call()`

`Promise`

Make nested-call. Same arguments like in `broker.call`

`ctx.emit()`

`void`

Emit an event, same as `broker.emit`

`ctx.broadcast()`

`void`

Broadcast an event, same as `broker.broadcast`

`ctx.startSpan(name, opts)`

`Span`

Creates a new child span.

`ctx.finishSpan(span)`

`void`

Finishes a span.

`ctx.toJSON()`

`Object`

Convert `Context` to a printable JSON.

`ctx.copy()`

`this`

Create a copy of the `Context` instance.

## [](_docs_0.15_context.md#Context-tracking)Context tracking

If you want graceful service shutdowns, enable the Context tracking feature in broker options. If you enable it, all services will wait for all running contexts before shutdown. A timeout value can be defined with `shutdownTimeout` broker option. The default values is `5` seconds.

**Enable context tracking & change the timeout value**
```
const broker = new ServiceBroker({  
    nodeID: "node-1",  
    tracking: {  
        enabled: true,  
        shutdownTimeout: 10 \* 1000  
    }  
});  
```
> The shutdown timeout can be overwritten by `$shutdownTimeout` property in service settings.

**Disable tracking in calling option**
```
await broker.call("posts.find", {}, { tracking: false });  
```

#### _docs_0.15_contributing.md

> Source: https://moleculer.services/docs/0.15/contributing
> Scraped: 4/13/2025, 3:24:03 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/contributing.md)

We welcome you to join the development of Moleculer. This document helps you through the process.

## [](_docs_0.15_contributing.md#Before-You-Start)Before You Start

Please follow the coding style:

*   Use tabs with size of 4 for indents.
*   Always use strict mode & semicolons.
*   Use double quotes instead of single quotes.

## [](_docs_0.15_contributing.md#Contribution-in-the-core-modules)Contribution in the core modules

Follow this workflow if you would like to modify the core modules.

### [](_docs_0.15_contributing.md#Workflow)Workflow

1.  Fork the [moleculerjs/moleculer](https://github.com/moleculerjs/moleculer) repo.
    
2.  Clone the repository to your computer and install dependencies.
    
    ```
    $ git clone https://github.com/<username>/moleculer.git  
    $ cd moleculer  
    $ npm install  
    
    ```
    
3.  Start Moleculer in dev mode
    
    ```
    $ npm run dev  
    
    ```
    
    or in continuous test mode
    
    ```
    $ npm run ci  
    
    ```
    
4.  Fix the bug or add a new feature.
    
5.  Run tests & check the coverage report.
    
    ```
    $ npm test  
    
    ```
    
    > If you added new features, please add relevant new test cases! We aim to 100% cover.
    
    > Your pull request will only get merged when tests passed and covered all codes. Don’t forget to run tests before submission.
    
6.  Commit & push the branch.
    
7.  Create a pull request and describe the change.
    
8.  If you’ve changed APIs, update the [documentation](https://github.com/moleculerjs/site), as well.
    

## [](_docs_0.15_contributing.md#Contribution-to-create-a-new-Moleculer-module)Contribution to create a new Moleculer module

Follow this workflow if you would like to create a new module for Moleculer

### [](_docs_0.15_contributing.md#Workflow-1)Workflow

1.  Install the command-line tool.
    
    ```
    $ npm install moleculer-cli -g  
    
    ```
    
2.  Create a new module skeleton (named `moleculer-awesome`).
    
    ```
    $ moleculer init module moleculer-awesome  
    
    ```
    
3.  Edit `src/index.js` and implement the logic.
    
4.  For development use the `dev` mode (it starts your module with `example/simple/index.js`)
    
    ```
    $ npm run dev  
    
    ```
    
    or the continuous test mode
    
    ```
    $ npm run ci  
    
    ```
    
5.  Create tests in `test/unit/index.spec.js` & cover the full source.
    
    ```
    $ npm test  
    
    ```
    
6.  If it’s done and you think it will be useful for other users, [tell us!](https://github.com/moleculerjs/moleculer/issues)
    

## [](_docs_0.15_contributing.md#Reporting-Issues)Reporting Issues

When you encounter some problems when using Moleculer, you can find the solutions in [FAQ](_docs_0.15_faq.md) or ask us on [Discord](https://discord.gg/TSEcDRP) or on [StackOverflow](https://stackoverflow.com/questions/tagged/moleculer). If you can’t find the answer, please report it on [GitHub Issues](https://github.com/moleculerjs/moleculer/issues).

Thank you!

#### _docs_0.15_deploying.md

> Source: https://moleculer.services/docs/0.15/deploying
> Scraped: 4/13/2025, 3:24:04 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/deploying.md)

## [](_docs_0.15_deploying.md#Docker-deployment)Docker deployment

The example below shows how to use [moleculer-runner](_docs_0.15_runner.md) and Docker to deploy Moleculer services across multiple containers.

> Note that moleculer-runner is capable of reading environment variables, which are heavily used in Docker deployments. [More info about runner’s configuration loading logic](_docs_0.15_runner.md#Configuration-loading-logic).

> The Docker files shown here are from [moleculer-demo](_docs_0.15_usage.md#Create-a-Moleculer-project) project.

> For mode detailed info about Docker and Kubernetes please check the [docker demo](https://github.com/moleculerjs/docker-demo) repository.

### [](_docs_0.15_deploying.md#Dockerfile)Dockerfile

Dockerfile to run Moleculer services
```
FROM node:current-alpine  
  
ENV NODE\_ENV=production  
  
RUN mkdir /app  
WORKDIR /app  
  
COPY package.json package-lock.json ./  
  
RUN npm install --production  
  
COPY . .  
  
CMD \["npm", "start"\]  
```
### [](_docs_0.15_deploying.md#Docker-Compose)Docker Compose

Docker compose files to run Moleculer services with NATS & Traefik (load balancing the API Gateway)

Set the necessary environment variables.  
**docker-compose.env**
```
NAMESPACE=  
LOGGER=true  
LOGLEVEL=info  
SERVICEDIR=services   
  
TRANSPORTER=nats://nats:4222   
MONGO\_URI=mongodb://mongo/project-demo   
```
Configure the containers.  
**docker-compose.yml**
```
version: "3.3"  
  
services:  
  
  api:  
    build:  
      context: .  
    image: project-demo  
    env\_file: docker-compose.env  
    environment:  
      SERVICES: api   
      PORT: 3000      
    depends\_on:  
      - nats  
    labels:  
      - "traefik.enable=true"  
      - "traefik.http.routers.api-gw.rule=PathPrefix(\`/\`)"  
      - "traefik.http.services.api-gw.loadbalancer.server.port=3000"  
    networks:  
      - internal  
  
  greeter:  
    build:  
      context: .  
    image: project-demo  
    env\_file: docker-compose.env  
    environment:  
      SERVICES: greeter   
    depends\_on:  
      - nats  
    networks:  
      - internal  
  
  products:  
    build:  
      context: .  
    image: project-demo  
    env\_file: docker-compose.env  
    environment:  
      SERVICES: products   
    depends\_on:  
      - mongo  
      - nats  
    networks:  
      - internal  
  
  mongo:  
    image: mongo:4  
    volumes:  
      - data:/data/db  
    networks:  
      - internal  
  
  nats:  
    image: nats:2  
    networks:  
      - internal  
  
  traefik:  
    image: traefik:v2.1  
    command:  
      - "--api.insecure=true"   
      - "--providers.docker=true"  
      - "--providers.docker.exposedbydefault=false"  
    ports:  
      - 3000:80  
      - 3001:8080  
    volumes:  
      - /var/run/docker.sock:/var/run/docker.sock:ro  
    networks:  
      - internal  
      - default  
  
networks:  
  internal:  
  
volumes:  
  data:  
```
**Start containers**
```
$ docker-compose up -d  
```
Access your app on `http://<docker-host>:3000/`. Traefik dashboard UI on `http://<docker-host>:3001/`

## [](_docs_0.15_deploying.md#Kubernetes-deployment)Kubernetes deployment

Moleculer community members are [working on](https://github.com/moleculerjs/moleculer/issues/512) Kubernetes integration. You can check [dkuida](https://github.com/dkuida)‘s [step by step tutorial](https://dankuida.com/moleculer-deployment-thoughts-8e0fc8c0fb07), [lehno](https://github.com/lehno)‘s [code samples](https://github.com/lehno/moleculer-k8s-examples) and [tobydeh](https://github.com/tobydeh)‘s [deployment guide](https://gist.github.com/tobydeh/0aa33a5b672821f777165159b6a22cc5).

#### _docs_0.15_errors.md

> Source: https://moleculer.services/docs/0.15/errors
> Scraped: 4/13/2025, 3:24:01 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/errors.md)

Moleculer has some built-in `Error` to raise an error in services.

## [](_docs_0.15_errors.md#Base-error-classes)Base error classes

### [](_docs_0.15_errors.md#MoleculerError)`MoleculerError`

The base error class.

**Parameters**

Name

Type

Default

Description

`message`

`String`

Error message

`code`

`Number`

`500`

Error code

`type`

`String`

Error type

`data`

`any`

Any relevant data

**Example**
```
const { MoleculerError } = require("moleculer").Errors;  
  
throw new MoleculerError("Something happened", 501, "ERR\_SOMETHING", { a: 5, nodeID: "node-666" });  
```
### [](_docs_0.15_errors.md#MoleculerRetryableError)`MoleculerRetryableError`

Error for retryable errors. It uses in `broker.call`. The broker retries requests if they rejected a `MoleculerRetryableError`.

**Parameters**

Name

Type

Default

Description

`message`

`String`

Error message

`code`

`Number`

`500`

Error code

`type`

`String`

Error type

`data`

`any`

Any relevant data

**Example**
```
const { MoleculerRetryableError } = require("moleculer").Errors;  
  
throw new MoleculerRetryableError("Some retryable thing happened", 501, "ERR\_SOMETHING", { a: 5, nodeID: "node-666" });  
```
### [](_docs_0.15_errors.md#MoleculerServerError)`MoleculerServerError`

Error for retryable server errors. Parameters are same as `MoleculerRetryableError`.

### [](_docs_0.15_errors.md#MoleculerClientError)`MoleculerClientError`

Error for client error which is **not** retryable. Parameters are same as `MoleculerError`.

## [](_docs_0.15_errors.md#Internal-error-classes)Internal error classes

### [](_docs_0.15_errors.md#ServiceNotFoundError)`ServiceNotFoundError`

Throw it if you `call` a not registered service action.  
Error code: **404**  
Retryable: **true**  
Type: `SERVICE_NOT_FOUND`

### [](_docs_0.15_errors.md#ServiceNotAvailableError)`ServiceNotAvailableError`

Throw it if you `call` a currently unavailable service action. E.g. node disconnected which contains this service or circuit breaker is opened.  
Error code: **404**  
Retryable: **true**  
Type: `SERVICE_NOT_AVAILABLE`

### [](_docs_0.15_errors.md#RequestTimeoutError)`RequestTimeoutError`

Throw it if your request is timed out.  
Error code: **504**  
Retryable: **true**  
Type: `REQUEST_TIMEOUT`

### [](_docs_0.15_errors.md#RequestSkippedError)`RequestSkippedError`

Throw it if your nested call is skipped because the execution is timed out due to distributed timeout.  
Error code: **514**  
Retryable: **false**  
Type: `REQUEST_SKIPPED`

### [](_docs_0.15_errors.md#RequestRejectedError)`RequestRejectedError`

Throw it if the called node is disconnected during requesting.  
Error code: **503**  
Retryable: **true**  
Type: `REQUEST_REJECTED`

### [](_docs_0.15_errors.md#QueueIsFullError)`QueueIsFullError`

Throw it if there are too many active requests.  
Error code: **429**  
Retryable: **true**  
Type: `QUEUE_FULL`

### [](_docs_0.15_errors.md#ValidationError)`ValidationError`

Validator throws it if the calling parameters are not valid.  
Error code: **422**  
Retryable: **false**  
Type: `VALIDATION_ERROR` _(default)_

### [](_docs_0.15_errors.md#MaxCallLevelError)`MaxCallLevelError`

Throw it if your nested calls reached the `maxCallLevel` value (to avoid infinite calling loops).  
Error code: **500**  
Retryable: **false**  
Type: `MAX_CALL_LEVEL`

### [](_docs_0.15_errors.md#ServiceSchemaError)`ServiceSchemaError`

Throw it if your service schema is not valid.  
Error code: **500**  
Retryable: **false**  
Type: `SERVICE_SCHEMA_ERROR`

### [](_docs_0.15_errors.md#BrokerOptionsError)`BrokerOptionsError`

Throw it if your broker options are not valid.  
Error code: **500**  
Retryable: **false**  
Type: `BROKER_OPTIONS_ERROR`

### [](_docs_0.15_errors.md#GracefulStopTimeoutError)`GracefulStopTimeoutError`

Throw it if shutdown is timed out.  
Error code: **500**  
Retryable: **false**  
Type: `GRACEFUL_STOP_TIMEOUT`

### [](_docs_0.15_errors.md#ProtocolVersionMismatchError)`ProtocolVersionMismatchError`

Throw it if an old nodeID connected with older protocol version.  
Error code: **500**  
Retryable: **false**  
Type: `PROTOCOL_VERSION_MISMATCH`

### [](_docs_0.15_errors.md#InvalidPacketDataError)`InvalidPacketDataError`

Throw it if transporter receives unknown data.  
Error code: **500**  
Retryable: **false**  
Type: `INVALID_PACKET_DATA`

## [](_docs_0.15_errors.md#Create-custom-errors)Create custom errors

The following example shows how to create a custom `Error` class which is inherited from `MoleculerError`.
```
const { MoleculerError } = require("moleculer").Errors;  
  
class MyBusinessError extends MoleculerError {  
    constructor(msg, data) {  
        super(msg || \`This is my business error.\`, 500, "MY\_BUSINESS\_ERROR", data);  
    }  
}  
```
## [](_docs_0.15_errors.md#Preserve-custom-error-classes-while-transferring-between-remote-nodes)Preserve custom error classes while transferring between remote nodes

For this purpose provide your own `Regenerator`. We recommend looking at the source code of [Errors.Regenerator](https://github.com/moleculerjs/moleculer/blob/master/src/errors.js) and implementing `restore`, `extractPlainError` or `restoreCustomError` methods.

### [](_docs_0.15_errors.md#Public-interface-of-Regenerator)Public interface of Regenerator

Method

Return

Description

`restore(plainError, payload)`

`Error`

Restores an `Error` object

`extractPlainError(err)`

`Object`

Extracts a plain error object from `Error` object

`restoreCustomError(plainError, payload)`

`Error` or `undefined`

Hook to restore a custom error in a child class. Prefer to use this method instead of the `restore` method.

#### [](_docs_0.15_errors.md#Create-custom-regenerator)Create custom regenerator
```
const { Regenerator, MoleculerError } = require("moleculer").Errors;  
const { ServiceBroker } = require("moleculer");  
  
class TimestampedError extends MoleculerError {  
    constructor(message, code, type, data, timestamp) {  
        super(message, code, type, data);  
        this.timestamp = timestamp;  
    }  
}  
  
class CustomRegenerator extends Regenerator {  
    restoreCustomError(plainError, payload) {  
        const { name, message, code, type, data, timestamp } = plainError;  
        switch (name) {  
            case "TimestampedError":  
                return new TimestampedError(message, code, type, data, timestamp);  
        }  
    }  
  
    extractPlainError(err) {  
        return {  
            ...super.extractPlainError(err),  
            timestamp: err.timestamp  
        };  
    }  
}  
  
module.exports = CustomRegenerator;  
```
#### [](_docs_0.15_errors.md#Use-custom-regenerator)Use custom regenerator
```
  
const CustomRegenerator = require("./custom-regenerator");  
  
module.exports = {  
    errorRegenerator: new CustomRegenerator()  
}  
```

#### _docs_0.15_events.md

> Source: https://moleculer.services/docs/0.15/events
> Scraped: 4/13/2025, 3:24:01 AM

Broker has a built-in event bus to support [Event-driven architecture](http://microservices.io/patterns/data/event-driven-architecture.html) and to send events to local and remote services.

> Please note that built-in events are fire-and-forget meaning that if the service is offline, the event will be lost. For persistent, durable and reliable events please check [moleculer-channels](https://github.com/moleculerjs/moleculer-channels).

## [](_docs_0.15_events.md#Balanced-events)Balanced events

Even listeners are arrange into logical groups. It ensures that only one listener from each designated group receives an event. This approach is useful for scenarios where you want to distribute event handling among services while avoiding duplicate processing within a group.

Understanding Groups:

*   Services are automatically assigned groups based on their names.
*   You can override the default group assignment by specifying a group property within the event definition of a service. (See example below)

> **Example:** Consider two services: `users` and `payments`. Both subscribe to the `user.created` event. If you have three `users` instances and two `payments` instances, emitting `user.created` will trigger the event handler in exactly one `users` service and one `payments` service.

![Balanced events diagram](https://moleculer.services/docs/0.15/assets/balanced-events.gif)

The group name comes from the service name, but it can be overwritten in event definition in services.

**Example**
```
module.exports = {  
    name: "payment",  
    events: {  
        "order.created": {  
              
            group: "other",  
            handler(ctx) {  
                console.log("Payload:", ctx.params);  
                console.log("Sender:", ctx.nodeID);  
                console.log("Metadata:", ctx.meta);  
                console.log("The called event name:", ctx.eventName);  
            }  
        }  
    }  
}  
```
**Benefits of Balanced Events**:

*   **Efficient Distribution**: Events are distributed fairly across service groups, preventing overloading of individual instances.
*   **Scalability**: As you add or remove service instances, balanced events automatically adjust to maintain balanced distribution.
*   **Coordination**: When multiple services need to react to an event but only specific actions are required within each group, balanced events promote coordination.

> **Tips:**
> 
> *   **Event Naming Conventions**: Establish clear naming conventions (e.g., snake\_case, PascalCase) for events to enhance readability and maintainability.
> *   **Event Payload Structure**: Define a consistent structure for event payloads to ensure subscribers understand the received data.
> *   **Error Handling**: Implement error handling mechanisms for event publishing and handling to ensure robustness.

## [](_docs_0.15_events.md#Emit-balanced-events)Emit balanced events

Send balanced events with `broker.emit` function.

**Using `broker.emit` for Balanced Events**:

*   **Event Name**: The first parameter to `broker.emit` is the event name (string). This name should clearly describe the event and its purpose.
*   **Payload (Optional)**: The second parameter is the event payload, an object containing data relevant to the event. If you don’t need to send any data, you can omit this parameter.
*   **Target Groups (Optional)**: By default, the event is delivered to the group named after the service that emits it. However, you can specify which groups should receive the event using the groups property within a third optional object. This object takes an array of service group names as its value.
```
  
broker.emit("user.created", user);  
```
Specify which groups/services shall receive the event:
```
  
broker.emit("user.created", user, { groups: \["mail", "payments"\] });  
```
**Key Points**:

*   Balanced events are ideal for distributing tasks among services while avoiding redundant processing within groups.
*   Use clear and descriptive event names for better communication within your application.
*   The `groups` option allows you to target specific service groups for event delivery.

## [](_docs_0.15_events.md#Broadcast-event)Broadcast event

The broadcast event is sent to all available local & remote services. It is not balanced, all service instances will receive it.  
This approach is useful for situations where all services need to be informed about a specific event, invalidating caches, or updating configurations.

![Broadcast events diagram](https://moleculer.services/docs/0.15/assets/broadcast-events.gif)

Send broadcast events with `broker.broadcast` method.
```
broker.broadcast("config.changed", config);  
```
Specify which groups/services shall receive the event:
```
  
broker.broadcast("user.created", { user }, "mail");  
  
  
broker.broadcast("user.created", { user }, \["user", "purchase"\]);  
```
## [](_docs_0.15_events.md#Local-broadcast-event)Local broadcast event

Send broadcast events only to all local services with `broker.broadcastLocal` method.
```
broker.broadcastLocal("config.changed", config);  
```
## [](_docs_0.15_events.md#Balanced-vs-Broadcast-events)Balanced vs Broadcast events

**Balanced Events**   Purpose: Targeted communication for distributing tasks or messages fairly across designated service groups.
*   Delivery: Delivered to only one listener from each designated group, preventing duplicate processing.
*   Targeting: Services belong to groups by default (service name), or can be overridden by specifying a group property in the event definition.  
    Scalability: Automatically adjusts to maintain balanced distribution within groups as service instances are added or removed.

**Usage**:

*   Distributing tasks like sending welcome emails to new users (one `users` service instance handles it).
*   Handling events requiring specific processing within different groups (e.g., `payments` group processes new orders).

**Broadcast Events**   Purpose: System-wide notification for informing all services about a specific event.
*   Delivery: Delivered to all available local and remote service instances, regardless of group affiliation.
*   Targeting (Optional): Can optionally target specific service names within an array, but generally discouraged for maintainability.

**Usage**:

*   Notifying all services about configuration changes (e.g., config.updated event triggers service restarts).
*   Broadcasting system-wide events like server maintenance windows.

**Key Differences**   Delivery: Balanced events target specific groups, broadcasts reach all services.
*   Redundancy: Balanced events prevent duplicate processing within groups, broadcasts might lead to redundant data processing.
*   Scalability: Balanced events scale well with service instances, broadcasts can overload services if used frequently.

## [](_docs_0.15_events.md#Subscribe-to-events)Subscribe to events

Event context is useful if you are using event-driven architecture and want to trace your events. If you are familiar with [Action Context](_docs_0.15_context.md) you will feel at home. Event context is very similar to Action Context, except for a few new event related properties. [Check the complete list of properties](_docs_0.15_context.md). Overall, the event to allows you to trace events, understand their origin, and make informed decisions within your event handlers

**Context-based event handler & emit a nested event**
```
module.exports = {  
    name: "accounts",  
    events: {  
        "user.created"(ctx) {  
            console.log("Payload:", ctx.params);  
            console.log("Sender:", ctx.nodeID);  
            console.log("Metadata:", ctx.meta);  
            console.log("The called event name:", ctx.eventName);  
  
            ctx.emit("accounts.created", { user: ctx.params.user });  
        }  
    }  
};  
```
## [](_docs_0.15_events.md#Wildcard-event-subscription)Wildcard event subscription

Subscribe to events in [‘events’ property of services](_docs_0.15_services.md#events). It is possible to subscribe to multiple events with a single handler using wildcards.

Different wildcards are available for event name matching:

*   `?`: Matches a single character within the event name.
*   `*`: Matches any sequence of characters within the event name.
*   `**`: Matches any event name (use with caution).
```
module.exports = {  
    events: {  
          
        "user.created"(ctx) {  
            console.log("User created:", ctx.params);  
        },  
  
          
        "user.???ated"(ctx) {  
            console.log("User event:", ctx.params);  
        },  
  
  
          
        "user.\*"(ctx) {  
            console.log("User event:", ctx.params);  
        }  
          
          
        "\*\*"(ctx) {  
            console.log(\`Event '${event}' received from ${sender} node:\`, payload);  
        }  
    }  
}  
```
## [](_docs_0.15_events.md#Event-parameter-validation)Event parameter validation

Similar to action parameter validation, event parameter validation allows you to define expected data structures for events, ensuring that the data received by event handlers is valid and consistent. By defining a validation schema for event parameters, you can enforce data integrity and prevent unexpected behavior within your event handlers.

Like in action definition, you should define `params` in event definition and the built-in `Validator` validates the parameters in events.
```
  
module.exports = {  
    name: "mailer",  
    events: {  
        "send.mail": {  
              
            params: {  
                from: "string|optional",    
                to: "email",   
                subject: "string"   
            },  
            handler(ctx) {  
                this.logger.info("Event received, parameters OK!", ctx.params);  
                  
            }  
        }  
    }  
};  
```
### [](_docs_0.15_events.md#Handling-Validation-Errors)Handling Validation Errors:

The validation errors are not sent back to the caller, they are logged and you can catch them with the [global error handler](_docs_0.15_broker.md#Global-error-handler).

## [](_docs_0.15_events.md#Internal-events)Internal events

The broker broadcasts some internal events. These events always starts with `$` prefix.

## [](_docs_0.15_events.md#services-changed)`$services.changed`

The broker sends this event if the local node or a remote node loads or destroys services.

**Payload**

Name

Type

Description

`localService`

`Boolean`

True if a local service changed.

## [](_docs_0.15_events.md#circuit-breaker-opened)`$circuit-breaker.opened`

The broker sends this event when the circuit breaker module change its state to `open`.

**Payload**

Name

Type

Description

`nodeID`

`String`

Node ID

`action`

`String`

Action name

`failures`

`Number`

Count of failures

## [](_docs_0.15_events.md#circuit-breaker-half-opened)`$circuit-breaker.half-opened`

The broker sends this event when the circuit breaker module change its state to `half-open`.

**Payload**

Name

Type

Description

`nodeID`

`String`

Node ID

`action`

`String`

Action name

## [](_docs_0.15_events.md#circuit-breaker-closed)`$circuit-breaker.closed`

The broker sends this event when the circuit breaker module change its state to `closed`.

**Payload**

Name

Type

Description

`nodeID`

`String`

Node ID

`action`

`String`

Action name

## [](_docs_0.15_events.md#node-connected)`$node.connected`

The broker sends this event when a node connected or reconnected.

**Payload**

Name

Type

Description

`node`

`Node`

Node info object

`reconnected`

`Boolean`

Is reconnected?

## [](_docs_0.15_events.md#node-updated)`$node.updated`

The broker sends this event when it has received an INFO message from a node, (i.e. a service is loaded or destroyed).

**Payload**

Name

Type

Description

`node`

`Node`

Node info object

## [](_docs_0.15_events.md#node-disconnected)`$node.disconnected`

The broker sends this event when a node disconnected (gracefully or unexpectedly).

**Payload**

Name

Type

Description

`node`

`Node`

Node info object

`unexpected`

`Boolean`

`true` - Not received heartbeat, `false` - Received `DISCONNECT` message from node.

## [](_docs_0.15_events.md#broker-started)`$broker.started`

The broker sends this event once `broker.start()` is called and all local services are started.

## [](_docs_0.15_events.md#broker-stopped)`$broker.stopped`

The broker sends this event once `broker.stop()` is called and all local services are stopped.

## [](_docs_0.15_events.md#transporter-connected)`$transporter.connected`

The transporter sends this event once the transporter is connected.

## [](_docs_0.15_events.md#transporter-disconnected)`$transporter.disconnected`

The transporter sends this event once the transporter is disconnected.

## [](_docs_0.15_events.md#broker-error)`$broker.error`

Effective error handling is vital for maintaining the reliability of your MoleculerJS application. Moleculer emits various error events to alert you to issues during operation:

The broker emits this event when an error occurs in the [broker](_docs_0.15_broker.md) itself.  
**Event payload**
```
{  
  "error": "<the error object with all properties>"  
  "module": "broker"   
  "type": "error-type"   
}  
```
## [](_docs_0.15_events.md#transit-error)`$transit.error`

The broker emits this event when an error occurs in the transit module, ie, during the message transportation between nodes.  
**Event payload**
```
{  
  "error": "<the error object with all properties>"  
  "module": "transit"   
  "type": "error-type"   
}  
```
## [](_docs_0.15_events.md#transporter-error)`$transporter.error`

The broker emits this event when an error occurs in the [transporter](_docs_0.15_networking.md#Transporters) module. This signals a network error.  
**Event payload**
```
{  
  "error": "<the error object with all properties>"  
  "module": "transit"   
  "type": "error-type"   
}  
```
## [](_docs_0.15_events.md#cacher-error)`$cacher.error`

The broker emits this event when an error occurs in the [cacher](_docs_0.15_caching.md) module.  
**Event payload**
```
{  
  "error": "<the error object with all properties>"  
  "module": "transit"   
  "type": "error-type"   
}  
```
## [](_docs_0.15_events.md#discoverer-error)`$discoverer.error`

The broker emits this event when an error occurs in the [discoverer](_docs_0.15_registry.md) module.  
**Event payload**
```
{  
  "error": "<the error object with all properties>"  
  "module": "transit"   
  "type": "error-type"   
}  
```
Each event provides detailed information about the error, allowing you to diagnose and address issues promptly. Implementing error event listeners is recommended as it allows you to ensure the stability of your microservices application.

#### _docs_0.15_examples.md

> Source: https://moleculer.services/docs/0.15/examples
> Scraped: 4/13/2025, 3:24:00 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/examples.md)

## [](_docs_0.15_examples.md#Project-examples)Project examples

### [](_docs_0.15_examples.md#Realworld-backend-server)Realworld backend server

This is a [RealWorld.io](https://realworld.io/) example backend server with Moleculer microservices framework.

**Key features**   7 microservices
*   NeDB or MongoDB database without Mongoose
*   User login & signup
*   User authentication with JWT
*   Memory caching
*   Docker files

**Repo: [https://github.com/moleculerjs/moleculer-examples/tree/master/conduit#readme](https://github.com/moleculerjs/moleculer-examples/tree/master/conduit#readme)**

### [](_docs_0.15_examples.md#Blog)Blog

This is a simple blog example.

**Key features**   Docker files
*   ExpressJS www server with Pug template engine
*   MongoDB database with [moleculer-db](https://github.com/moleculerjs/moleculer-db) and [moleculer-db-adapter-mongoose](https://github.com/moleculerjs/moleculer-db/tree/master/packages/moleculer-db-adapter-mongoose) modules
*   NATS transporter
*   Redis cacher
* [Traefik](https://traefik.io/) reverse proxy (in micro arch)
*   static frontend

**Repo: [https://github.com/moleculerjs/moleculer-examples/blob/master/blog#readme](https://github.com/moleculerjs/moleculer-examples/blob/master/blog#readme)**

## [](_docs_0.15_examples.md#Short-examples)Short examples

The main Moleculer repository contains [some examples](https://github.com/moleculerjs/moleculer/blob/master/examples/).

> To try them, at first, you should clone the Moleculer repo with the following command:
> 
> `git clone https://github.com/moleculerjs/moleculer.git`

### [](_docs_0.15_examples.md#Simple)Simple

This is a simple demo with a Math service which can `add`, `sub`, `mult` and `divide` two numbers.
```
$ npm run demo simple  
```
[Source code is available on Github](https://github.com/moleculerjs/moleculer/blob/master/examples/simple/index.js)

### [](_docs_0.15_examples.md#Server-amp-client-nodes)Server & client nodes

In this example, you can start any servers & clients. The servers serve the `math.add` action and clients call it in a loop. You can start multiple instances from both.  
_They use TCP transporter, but you can change it with `TRANSPORTER` env variable._

**Start a server**
```
$ node examples/client-server/server  
```
**Start a client**
```
$ node examples/client-server/client  
```
[Source code is available on Github](https://github.com/moleculerjs/moleculer/tree/master/examples/client-server)

### [](_docs_0.15_examples.md#Middlewares)Middlewares

This example demonstrates how the middleware system works.
```
$ npm run demo middlewares  
```
[Source code is available on Github](https://github.com/moleculerjs/moleculer/blob/master/examples/middlewares/index.js)

### [](_docs_0.15_examples.md#Runner)Runner

This example shows how you can start a broker and load services with [Moleculer Runner](_docs_0.15_runner.md)
```
$ node ./bin/moleculer-runner.js -c examples/runner/moleculer.config.js -r examples/user.service.js  
```
It starts a broker with options from `moleculer.config.js`, loads the user service from `user.service.js` file and switch to REPL mode.

[Source code is available on Github](https://github.com/moleculerjs/moleculer/blob/master/examples/runner)

### [](_docs_0.15_examples.md#Load-tester)Load tester

With this example, you can start a load test. The server & client prints how many requests executed in a second.

**Start server**
```
$ node examples/loadtest/server  
```
**Start & fork clients (number of CPU cores)**
```
$ node examples/loadtest/clients  
```
[Source code is available on Github](https://github.com/moleculerjs/moleculer/blob/master/examples/loadtest)

#### _docs_0.15_faq.md

> Source: https://moleculer.services/docs/0.15/faq
> Scraped: 4/13/2025, 3:24:03 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/faq.md)

## [](_docs_0.15_faq.html.md#Core-amp-Common)Core & Common

## [](_docs_0.15_faq.html.md#Why-am-I-getting-NATS-error-Could-not-connect-to-server-Error-connect-ECONNREFUSED-127-0-0-1-4222-error-message-when-starting-my-project)Why am I getting `NATS error. Could not connect to server: Error: connect ECONNREFUSED 127.0.0.1:4222` error message when starting my project?

The NATS server is not part of the Moleculer. You have to install & start it before starting your project. Download it from here: [https://nats.io/download/nats-io/nats-server/](https://nats.io/download/nats-io/nats-server/)
```
\[7480\] 2019/10/06 14:18:05.801763 \[INF\] Starting nats-server version 2.0.0  
\[7480\] 2019/10/06 14:18:05.805763 \[INF\] Git commit \[not set\]  
\[7480\] 2019/10/06 14:18:05.809763 \[INF\] Listening for client connections on 0.0.0.0:4222  
\[7480\] 2019/10/06 14:18:05.809763 \[INF\] Server id is NCHICRYD3SMATIT6QMO557ZDHQUY5JUYPO25TK4SAQYP7IPCIOGKTIRU  
\[7480\] 2019/10/06 14:18:05.810763 \[INF\] Server is ready  
```
## [](_docs_0.15_faq.html.md#How-can-I-start-services-with-Moleculer-Runner-in-debug-mode)How can I start services with Moleculer Runner in debug mode?

Use the following command:
```
$ node --inspect=0.0.0.0:9229 node\_modules/moleculer/bin/moleculer-runner services  
```
## [](_docs_0.15_faq.html.md#How-to-add-V8-flags-for-Moleculer-Runner)How to add V8 flags for Moleculer Runner?
```
$ node --max-old-space-size=8192 node\_modules/moleculer/bin/moleculer-runner services  
```
## [](_docs_0.15_faq.html.md#What-happens-if-I-emit-an-event-and-the-service-with-the-event-handler-is-offline)What happens if I emit an event and the service with the event handler is offline?

Moleculer’s events are fire-and-forget meaning that if the service is offline, the event will be lost. If you want persistent events you should look for the transporters that offer this kind of capabilities.

## [](_docs_0.15_faq.html.md#Why-the-broker-exits-without-any-error-when-I-start-my-service)Why the broker exits without any error when I start my service?

If there is no continuously running process (e.g., transporter connection, API gateway, DB connection) that keeps event loop running then the process will exit. It’s normal behavior and not a bug. If you want to keep your service broker running then you should keep the event loop “busy”. Try to enable the transporter in `moleculer.config.js`.

## [](_docs_0.15_faq.html.md#API-Gateway-moleculer-web)API Gateway (moleculer-web)

## [](_docs_0.15_faq.html.md#Why-am-I-getting-413-request-entity-too-large-error-message-when-sending-a-big-POST-body)Why am I getting `413 - request entity too large` error message when sending a big POST body?

You should configure the `bodyParsers` to overwrite the default `100kb` POST body limit. [More info](https://github.com/expressjs/body-parser#limit).
```
module.exports = {  
    name: "api",  
    settings: {  
        routes: \[{  
            path: "/api",  
              
              
            bodyParsers: {  
                json: { limit: "2MB" },  
                urlencoded: { extended: true, limit: "2MB" }  
            }  
        }\]  
    }  
}  
```
> **Recommendation**
> 
> Use [streaming feature](_docs_0.13_actions.md#Streaming) when you want to send big data to a service or receive from a service.

## [](_docs_0.15_faq.html.md#How-do-I-reformat-error-responses)How do I reformat error responses?

You should define an `onError` hook in API Gateway settings. [More info](_docs_0.13_moleculer-web.md#Error-handlers).
```
  
module.exports = {  
    mixins: \[ApiService\],  
    settings: {  
          
        onError(req, res, err) {  
            res.setHeader("Content-Type", "application/json");  
            res.writeHead(err.code || 500);  
            res.end(JSON.stringify({  
                success: false,  
                message: err.message  
            }));  
        }         
    }  
};  
```
## [](_docs_0.15_faq.html.md#Why-am-I-getting-502-Bad-Gateway-when-api-gateway-is-behind-ALB-on-AWS)Why am I getting `502 - Bad Gateway` when api-gateway is behind ALB on AWS?

You need to adjust the keepAliveTimeouts in the HTTP server. You can access the HTTP server instance in `created()` function of api-gateway. More info [here](https://github.com/moleculerjs/moleculer-web/issues/226).
```
module.exports = {  
    mixins: \[ApiService\],  
  
    created() {  
          
        this.server.keepAliveTimeout = 65000;  
          
        this.server.headersTimeout = 66000;  
    }  
};  
```
## [](_docs_0.15_faq.html.md#DB-Adapters-moleculer-db)DB Adapters (moleculer-db)

## [](_docs_0.15_faq.html.md#How-can-I-manage-multiple-entities-tables-per-service)How can I manage multiple entities/tables per service?

At the moment, [Moleculer DB](_docs_0.15_moleculer-db.md) only supports [one model per service](https://microservices.io/patterns/data/database-per-service.html). This design works well if you are using a NoSQL database, especially Document database, because you can easily nest all child entities. However, for SQL databases things get tricky because you can have multiple and complex relations between the entities/tables. Due to this, its difficult (with the current workforce) to create a solution that will work for everyone. Therefore, for scenarios with multiple entities and relationships you will have to write your own adapter.

## [](_docs_0.15_faq.html.md#moleculer-db-violates-Domain-Driven-Design-DDD)`moleculer-db` violates Domain-Driven Design (DDD)?

`moleculer-db` is a simple (and optional) service mixin to handle one DB entity/table. By no means it obliges or forces you to change your mindset or your way of implementing/modeling things. If the features provided by the `moleculer-db` don’t fit your needs then you should write your own service with custom actions.

#### _docs_0.15_fault-tolerance.md

> Source: https://moleculer.services/docs/0.15/fault-tolerance
> Scraped: 4/13/2025, 3:24:01 AM

MoleculerJS incorporates a range of built-in fault-tolerance mechanisms designed to enhance the reliability and resilience of your microservices architecture. These features are configurable within the broker options, allowing you to enable or disable them based on your specific requirements and use cases.

## [](_docs_0.15_fault-tolerance.md#Circuit-Breaker)Circuit Breaker

Moleculer has a built-in circuit-breaker solution. It is a threshold-based implementation. It uses a time window to check the failed request rate. Once the threshold value is reached, it trips the circuit breaker.

> **What is the circuit breaker?**
> 
> The Circuit Breaker can prevent an application from repeatedly trying to execute an operation that’s likely to fail. Allowing it to continue without waiting for the fault to be fixed or wasting CPU cycles while it determines that the fault is long lasting. The Circuit Breaker pattern also enables an application to detect whether the fault has been resolved. If the problem appears to have been fixed, the application can try to invoke the operation.
> 
> Read more about circuit breaker on [Martin Fowler blog](https://martinfowler.com/bliki/CircuitBreaker.html) or on [Microsoft Azure Docs](https://docs.microsoft.com/azure/architecture/patterns/circuit-breaker).

If you enable it, all service calls will be protected by the circuit breaker.

**Enable it in the broker options**
```
const broker = new ServiceBroker({  
    circuitBreaker: {  
        enabled: true,  
        threshold: 0.5,  
        minRequestCount: 20,  
        windowTime: 60,   
        halfOpenTime: 5 \* 1000,   
        check: err => err && err.code >= 500  
    }  
});  
```
### [](_docs_0.15_fault-tolerance.md#Settings)Settings

Name

Type

Default

Description

`enabled`

`Boolean`

`false`

Enable feature

`threshold`

`Number`

`0.5`

Threshold value. `0.5` means that 50% should be failed for tripping.

`minRequestCount`

`Number`

`20`

Minimum request count. Below it, CB does not trip.

`windowTime`

`Number`

`60`

Number of seconds for time window.

`halfOpenTime`

`Number`

`10000`

Number of milliseconds to switch from `open` to `half-open` state

`check`

`Function`

`err && err.code >= 500`

A function to check failed requests.

> If the circuit-breaker state is changed, ServiceBroker will send [internal events](_docs_0.15_events.md#circuit-breaker-opened).

These global options can be overridden in action definition, as well.
```
  
module.export = {  
    name: "users",  
    actions: {  
        create: {  
            circuitBreaker: {  
                  
                threshold: 0.3,  
                windowTime: 30  
            },  
            handler(ctx) {}  
        }  
    }  
};  
```
## [](_docs_0.15_fault-tolerance.md#Retry)Retry

There is an exponential backoff retry solution. It can recall failed requests with response [`MoleculerRetryableError`](_docs_0.14_errors.md#MoleculerRetryableError).

**Enable it in the broker options**
```
const broker = new ServiceBroker({  
    retryPolicy: {  
        enabled: true,  
        retries: 5,  
        delay: 100,  
        maxDelay: 2000,  
        factor: 2,  
        check: err => err && !!err.retryable  
    }  
});  
```
### [](_docs_0.15_fault-tolerance.md#Settings-1)Settings

Name

Type

Default

Description

`enabled`

`Boolean`

`false`

Enable feature.

`retries`

`Number`

`5`

Count of retries.

`delay`

`Number`

`100`

First delay in milliseconds.

`maxDelay`

`Number`

`2000`

Maximum delay in milliseconds.

`factor`

`Number`

`2`

Backoff factor for delay. `2` means exponential backoff.

`check`

`Function`

`err && !!err.retryable`

A function to check failed requests.

**Overwrite the retries value in calling option**
```
broker.call("posts.find", {}, { retries: 3 });  
```
**Overwrite the retry policy values in action definitions**
```
  
module.export = {  
    name: "users",  
    actions: {  
        find: {  
            retryPolicy: {  
                  
                retries: 3,  
                delay: 500  
            },  
            handler(ctx) {}  
        },  
        create: {  
            retryPolicy: {  
                  
                enabled: false  
            },  
            handler(ctx) {}  
        }  
    }  
};  
```
## [](_docs_0.15_fault-tolerance.md#Timeout)Timeout

Timeout can be set for service calling. It can be set globally in broker options, or in calling options. If the timeout is defined and request is timed out, broker will throw a `RequestTimeoutError` error.

**Enable it in the broker options**
```
const broker = new ServiceBroker({  
    requestTimeout: 5 \* 1000   
});  
```
**Overwrite the timeout value in calling option**
```
broker.call("posts.find", {}, { timeout: 3000 });  
```
### [](_docs_0.15_fault-tolerance.md#Distributed-timeouts)Distributed timeouts

Moleculer uses [distributed timeouts](https://www.getambassador.io/learn/service-mesh/resilience-for-distributed-systems/#:~:text=too%20many%20times.-,Deadlines,-In%20addition%20to). In case of nested calls, the timeout value is decremented with the elapsed time. If the timeout value is less or equal than 0, the next nested calls will be skipped (`RequestSkippedError`) because the first call has already been rejected with a `RequestTimeoutError` error.

## [](_docs_0.15_fault-tolerance.md#Bulkhead)Bulkhead

Bulkhead feature is implemented in Moleculer framework to control the concurrent request handling of actions.

**Enable it in the broker options**
```
const broker = new ServiceBroker({  
    bulkhead: {  
        enabled: true,  
        concurrency: 3,  
        maxQueueSize: 10,  
    }  
});  
```
### [](_docs_0.15_fault-tolerance.md#Global-Settings)Global Settings

Name

Type

Default

Description

`enabled`

`Boolean`

`false`

Enable feature.

`concurrency`

`Number`

`3`

Maximum concurrent executions.

`maxQueueSize`

`Number`

`10`

Maximum size of queue

The `concurrency` value restricts the concurrent request executions. If the `maxQueueSize` is bigger than `0`, broker stores the additional requests in a queue if all slots are taken. If the queue size reaches the `maxQueueSize` limit, broker will throw `QueueIsFull` exception for every addition requests.

### [](_docs_0.15_fault-tolerance.md#Action-Settings)Action Settings

[Global settings](_docs_0.15_fault-tolerance.md#Global-Settings) can be overridden in action definition.

**Overwrite the retry policy values in action definitions**
```
  
module.export = {  
    name: "users",  
    actions: {  
        find: {  
            bulkhead: {  
                  
                enabled: false  
            },  
            handler(ctx) {}  
        },  
        create: {  
            bulkhead: {  
                  
                concurrency: 10  
            },  
            handler(ctx) {}  
        }  
    }  
};  
```
### [](_docs_0.15_fault-tolerance.md#Events-Settings)Events Settings

Event handlers also support [bulkhead](_docs_0.15_fault-tolerance.md#Bulkhead) feature.

**Example**
```
  
module.exports = {  
    name: "my-service",  
    events: {  
        "user.created": {  
            bulkhead: {  
                enabled: true,  
                concurrency: 1  
            },  
            async handler(ctx) {  
                  
            }  
        }  
    }  
}  
```
## [](_docs_0.15_fault-tolerance.md#Fallback)Fallback

Fallback feature is useful, when you don’t want to give back errors to the users. Instead, call an other action or return some common content. Fallback response can be set in calling options or in action definition. It should be a `Function` which returns a `Promise` with any content. The broker passes the current `Context` & `Error` objects to this function as arguments.

**Fallback response setting in calling options**
```
const result = await broker.call("users.recommendation", { userID: 5 }, {  
    timeout: 500,  
    fallbackResponse(ctx, err) {  
          
        return broker.cacher.get("users.fallbackRecommendation:" + ctx.params.userID);  
    }  
});  
```
### [](_docs_0.15_fault-tolerance.md#Fallback-in-action-definition)Fallback in action definition

Fallback response can be also defined in receiver-side, in action definition.

> Please note, this fallback response will only be used if the error occurs within action handler. If the request is called from a remote node and the request is timed out on the remote node, the fallback response is not be used. In this case, use the `fallbackResponse` in calling option.

**Fallback as a function**
```
module.exports = {  
    name: "recommends",  
    actions: {  
        add: {  
            fallback: (ctx, err) => "Some cached result",  
            handler(ctx) {  
                  
            }  
        }  
    }  
};  
```
**Fallback as method name string**
```
module.exports = {  
    name: "recommends",  
    actions: {  
        add: {  
              
            fallback: "getCachedResult",  
            handler(ctx) {  
                  
            }  
        }  
    },  
  
    methods: {  
        getCachedResult(ctx, err) {  
            return "Some cached result";  
        }  
    }  
};  
```

#### _docs_0.15_lifecycle.md

> Source: https://moleculer.services/docs/0.15/lifecycle
> Scraped: 4/13/2025, 3:24:01 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/lifecycle.md)

## [](_docs_0.15_lifecycle.md#Broker-lifecycle)Broker lifecycle

This section describes what happens when the broker is starting & stopping.

### [](_docs_0.15_lifecycle.md#Starting-logic)Starting logic

When starting, the broker tries to establish a connection with the transporter. When it’s done, it doesn’t publish the local service list to remote nodes because it can’t accept request yet. It starts all services (calls every [service `started` handler](_docs_0.15_lifecycle.md#started-event-handler)). Once all services started successfully, broker publishes the local service list to remote nodes. Hence, remote nodes only send requests after all local services are properly initialized and started.

![Broker starting lifecycle diagram](https://moleculer.services/docs/0.15/assets/lifecycle/broker-start.svg)

> **Avoid deadlocks**
> 
> Deadlocks can occur when two services wait for each other. E.g.: `users` service has `dependencies: ["posts"]` and `posts` service has `dependencies: ["users"]`. To avoid it, remove the concerned service from `dependencies` and use `this.waitForServices` method in `started` handler instead.

### [](_docs_0.15_lifecycle.md#Stopping-logic)Stopping logic

When you call `broker.stop` or stop the process, at first broker publishes an empty service list to remote nodes, so they will route the requests to other instances instead of services that are stopping. Next, the broker starts [stopping](_docs_0.15_lifecycle.md#stopped-event-handler) all local services. After that, the transporter disconnects and process exits.

![Broker stopping lifecycle diagram](https://moleculer.services/docs/0.15/assets/lifecycle/broker-stop.svg)

## [](_docs_0.15_lifecycle.md#Service-lifecycle)Service lifecycle

This section describes what happens when a service is starting & stopping and how you should use the lifecycle event handler.

### [](_docs_0.15_lifecycle.md#created-event-handler)`created` event handler

This handler is triggered when the service instance is created (e.g.: at `broker.createService` or `broker.loadService`).  
You can use it to create other module instances (e.g. http server, database modules) and store them in `this`.
```
const http = require("http");  
  
module.exports = {  
    name: "www",  
    created() {  
          
        this.server = http.createServer(this.httpHandler);  
    }  
};  
```
> This is a sync event handler. You **cannot** return a `Promise` and you **cannot** use `async/await`.

### [](_docs_0.15_lifecycle.md#started-event-handler)`started` event handler

This handler is triggered when the `broker.start` is called and the broker starts all local services. Use it to connect to database, listen servers…etc.
```
module.exports = {  
    name: "users",  
    async started() {  
        try {  
            await this.db.connect();  
        } catch(e) {  
            throw new MoleculerServerError("Unable to connect to database.", e.message);  
        }  
    }  
};  
```
> This is an async event handler. A `Promise` can be returned or use `async/await`.

### [](_docs_0.15_lifecycle.md#stopped-event-handler)`stopped` event handler

This handler is triggered when the `broker.stop` is called and the broker starts stopping all local services. Use it to close database connections, close sockets…etc.
```
module.exports = {  
    name: "users",  
    async stopped() {  
        try {  
            await this.db.disconnect();  
        } catch(e) {  
            this.logger.warn("Unable to stop database connection gracefully.", e);  
        }  
    }  
};  
```
> This is an async event handler. A `Promise` can be returned or use `async/await`.

### [](_docs_0.15_lifecycle.md#merged-event-handler)`merged` event handler

This handler is called after the service schemas (including [mixins](_docs_0.15_services.md#Mixins)) has been merged but before service is registered. It means you can manipulate the merged service schema before it’s processed.
```
  
module.exports = {  
    name: "posts",  
  
    settings: {},  
  
    actions: {  
        find: {  
            params: {  
                limit: "number"  
            },  
            handler(ctx) {  
                  
            }  
        }  
    },  
  
    merged(schema) {  
          
        schema.settings.myProp = "myValue";  
          
        schema.actions.find.params.offset = "number";  
    }  
};  
```

#### _docs_0.15_logging.md

> Source: https://moleculer.services/docs/0.15/logging
> Scraped: 4/13/2025, 3:24:02 AM

All Moleculer’s core modules have a custom logger instance. They are inherited from the broker logger instance which can be configured in the [broker options](_docs_0.15_configuration.md#Broker-options).

> The `v0.14` version contains breaking changes. This means that you can’t use the old way of configuring the logger. If you are using the built-in default console logger, this breaking change doesn’t affect you. For more info check the [Migration Guide](https://github.com/moleculerjs/moleculer/blob/next/docs/MIGRATION_GUIDE_0.14.md).

## [](_docs_0.15_logging.md#Built-in-Loggers)Built-in Loggers

### [](_docs_0.15_logging.md#Console-default)Console (default)

This logger prints all log messages to the `console`. It supports several built-in formatters or you can use your custom formatter, as well.

**Shorthand configuration with default options**
```
  
module.exports = {  
    logger: "Console",  
};  
  
  
module.exports = {  
      
    logger: true,  
};  
```
**Full configuration**
```
  
module.exports = {  
    logger: {  
        type: "Console",  
        options: {  
              
            level: "info",  
              
            colors: true,  
              
            moduleColors: false,  
              
            formatter: "full",  
              
            objectPrinter: null,  
              
            autoPadding: false  
        }  
    }  
};  
```
#### [](_docs_0.15_logging.md#Formatters)Formatters

##### [](_docs_0.15_logging.md#full-formatter-default)`full` formatter (default)
```
  
module.exports = {  
    logger: {  
        type: "Console",  
        options: {  
            formatter: "full"   
        }  
    }  
};  
```
**Preview**  
![Console](https://moleculer.services/docs/0.15/assets/logging/console-full.png#zoomable)

##### [](_docs_0.15_logging.md#short-formatter)`short` formatter
```
  
module.exports = {  
    logger: {  
        type: "Console",  
        options: {  
            formatter: "short"  
        }  
    }  
};  
```
**Preview**  
![Console](https://moleculer.services/docs/0.15/assets/logging/console-short.png#zoomable)

##### [](_docs_0.15_logging.md#simple-formatter)`simple` formatter
```
  
module.exports = {  
    logger: {  
        type: "Console",  
        options: {  
            formatter: "simple"  
        }  
    }  
};  
```
**Preview**  
![Console](https://moleculer.services/docs/0.15/assets/logging/console-simple.png#zoomable)

##### [](_docs_0.15_logging.md#json-formatter)`json` formatter
```
  
module.exports = {  
    logger: {  
        type: "Console",  
        options: {  
            formatter: "json"  
        }  
    }  
};  
```
**Preview**  
![Console](https://moleculer.services/docs/0.15/assets/logging/console-json.png#zoomable)

##### [](_docs_0.15_logging.md#Custom-formatter)Custom formatter
```
  
module.exports = {  
    logger: {  
        type: "Console",  
        options: {  
            formatter: (level, args, bindings) => \[\`\[${level.toUpperCase()}\]\`, ...args\]  
        }  
    }  
};  
```
**Preview**  
![Console](https://moleculer.services/docs/0.15/assets/logging/console-custom.png#zoomable)

### [](_docs_0.15_logging.md#File)File

This logger saves all log messages to file(s). It supports JSON & formatted text files or you can use your custom formatter, as well.

**Shorthand configuration with default options**
```
  
module.exports = {  
    logger: "File",  
};  
```
_It will save the log messages to the `logs` folder in the current directory with `moleculer-{date}.log` filename._

**Full configuration**
```
  
module.exports = {  
    logger: {  
        type: "File",  
        options: {  
              
            level: "info",  
              
            folder: "./logs",  
              
            filename: "moleculer-{date}.log",  
              
            formatter: "json",  
              
            objectPrinter: null,  
              
            eol: "\\n",  
              
            interval: 1 \* 1000  
        }  
    }  
};  
```
## [](_docs_0.15_logging.md#External-Loggers)External Loggers

### [](_docs_0.15_logging.md#Pino)Pino

This logger uses the [Pino](https://github.com/pinojs/pino) logger.

**Shorthand configuration with default options**
```
  
module.exports = {  
    logger: "Pino",  
};  
```
**Full configuration**
```
  
module.exports = {  
    logger: {  
        type: "Pino",  
        options: {  
              
            level: "info",  
  
            pino: {  
                  
                options: null,  
  
                  
                destination: "/logs/moleculer.log",  
            }  
        }  
    }  
};  
```
> To use this logger please install the `pino` module with `npm install pino --save` command.

**Preview**  
![Pino](https://moleculer.services/docs/0.15/assets/logging/pino.png#zoomable)

### [](_docs_0.15_logging.md#Bunyan)Bunyan

This logger uses the [Bunyan](https://github.com/trentm/node-bunyan) logger.

**Shorthand configuration with default options**
```
  
module.exports = {  
    logger: "Bunyan",  
};  
```
**Full configuration**
```
  
module.exports = {  
    logger: {  
        type: "Bunyan",  
        options: {  
              
            level: "info",  
  
            bunyan: {  
                  
                name: "moleculer"  
            }  
        }  
    }  
};  
```
> To use this logger please install the `bunyan` module with `npm install bunyan --save` command.

**Preview**  
![Bunyan](https://moleculer.services/docs/0.15/assets/logging/bunyan.png#zoomable)

### [](_docs_0.15_logging.md#Winston)Winston

This logger uses the [Winston](https://github.com/winstonjs/winston) logger.

**Shorthand configuration with default options**
```
  
module.exports = {  
    logger: "Winston",  
};  
```
**Full configuration**
```
  
const winston = require("winston");  
  
module.exports = {  
    logger: {  
        type: "Winston",  
        options: {  
              
            level: "info",  
  
            winston: {  
                  
                transports: \[  
                    new winston.transports.Console(),  
                    new winston.transports.File({ filename: "/logs/moleculer.log" })  
                \]  
            }  
        }  
    }  
};  
```
> To use this logger please install the `winston` module with `npm install winston --save` command.

**Preview**  
![Winston](https://moleculer.services/docs/0.15/assets/logging/winston.png#zoomable)

### [](_docs_0.15_logging.md#debug)`debug`

This logger uses the [debug](https://github.com/visionmedia/debug) logger.  
To see messages you have to set the `DEBUG` environment variable to `export DEBUG=moleculer:*`.

**Shorthand configuration with default options**
```
  
module.exports = {  
    logger: "Debug",  
};  
```
**Full configuration**
```
  
module.exports = {  
    logger: {  
        type: "Debug",  
        options: {  
              
            level: "info",  
        }  
    }  
};  
```
> To use this logger please install the `debug` module with `npm install debug --save` command.

**Preview**  
![debug](https://moleculer.services/docs/0.15/assets/logging/debug.png#zoomable)

### [](_docs_0.15_logging.md#Log4js)Log4js

This logger uses the [Log4js](https://github.com/log4js-node/log4js-node) logger.

**Shorthand configuration with default options**
```
  
module.exports = {  
    logger: "Log4js",  
};  
```
**Full configuration**
```
  
module.exports = {  
    logger: {  
        type: "Log4js",  
        options: {  
              
            level: "info",  
              
            log4js: {  
                  
                appenders: {  
                    app: { type: "file", filename: "/logs/moleculer.log" }  
                },  
                categories: {  
                    default: { appenders: \[ "app" \], level: "debug" }  
                }  
            }  
        }  
    }  
};  
```
> To use this logger please install the `log4js` module with `npm install log4js --save` command.

**Preview**  
![Log4js](https://moleculer.services/docs/0.15/assets/logging/log4js.png#zoomable)

### [](_docs_0.15_logging.md#Datadog)Datadog

This logger uploads log messages to the [Datadog](https://www.datadoghq.com/) server.

> Please note, this logger doesn’t print any messages to the console, just collects & uploads. Use it beside another logger which also prints the messages.

**Shorthand configuration with default options**
```
  
module.exports = {  
    logger: "Datadog",  
};  
```
**Full configuration**
```
  
module.exports = {  
    logger: {  
        type: "Datadog",  
        options: {  
              
            level: "info",  
              
            url: "https://http-intake.logs.datadoghq.com/v1/input/",  
              
            apiKey: process.env.DATADOG\_API\_KEY,  
              
            ddSource: "moleculer",  
              
            env: undefined,  
              
            hostname: os.hostname(),  
              
            objectPrinter: null,  
              
            interval: 10 \* 1000  
        }  
    }  
};  
```
**Preview**  
![Datadog Log Explorer](https://moleculer.services/docs/0.15/assets/logging/datadog-log-explorer.png#zoomable)

## [](_docs_0.15_logging.md#Multiple-Loggers)Multiple Loggers

This new logger configuration admits usage of multiple loggers even from the same logger type and different logging levels.

**Define multiple loggers with different logging levels**
```
  
module.exports = {  
    logger: \[  
        {  
            type: "Console",  
            options: {  
                level: "info",  
            }  
        },  
        {              
            type: "File",  
            options: {  
                level: "info",  
                folder: "/logs/moleculer",  
                filename: "all-{date}.log",  
                formatter: "{timestamp} {level} {nodeID}/{mod}: {msg}"  
            }  
        },  
        {  
            type: "File",  
            options: {  
                level: "error",  
                folder: "/logs/moleculer",  
                filename: "errors-{date}.json",  
                formatter: "json"  
            }  
        }  
    \]     
};  
```
This example shows a configuration of `Console` logger, a `File` logger that saves all log messages in formatted text file and another `File` logger that only saves error messages in JSON format.

### [](_docs_0.15_logging.md#Filtering)Filtering

You can configure your loggers to only log data of certain services or modules.  
**Example**
```
  
module.exports = {  
    logger: \[  
          
        "Console",  
        {              
              
            type: "File",  
            options: {  
                level: {  
                    "GREETER": false,  
                    "\*\*": "info"  
                },  
                filename: "moleculer-{date}.log"  
            }  
        },  
        {  
              
            type: "File",  
            options: {  
                level: {  
                    "GREETER": "debug",  
                    "\*\*": false  
                },  
                filename: "greeter-{date}.log"  
            }  
        }  
    \],  
  
    logLevel: "info"   
};  
```
## [](_docs_0.15_logging.md#Log-Level-Setting)Log Level Setting

To configure logging levels, you can use the well-known `logLevel` broker option which can be a `String` or an `Object`. However, it is also possible to overwrite it in all logger `options` with the `level` property.

**Complex logging level configuration**
```
  
module.exports = {  
    logger: \[  
          
        "Console",  
        {              
            type: "File",  
            options: {  
                  
                level: {  
                    "GREETER": false,  
                    "\*\*": "warn"  
                }  
            }  
        }  
    \],  
    logLevel: {  
        "TRACING": "trace",  
        "TRANS\*": "warn",  
        "GREETER": "debug",  
        "\*\*": "info",  
    }  
};  
```
## [](_docs_0.15_logging.md#Custom-logger)Custom logger

If you have your custom logger you should wrap it into a `BaseLogger` class and implement at least the `getLogHandler` method.

**Using a custom logger**
```
  
 const BaseLogger = require("moleculer").Loggers.Base;  
  
class MyLogger extends BaseLogger {  
    getLogHandler(bindings) {  
        return (type, args) => console\[type\](\`\[MYLOG-${bindings.mod}\]\`, ...args);  
    }  
}  
  
module.exports = {  
    logger: new MyLogger()  
};  
```

#### _docs_0.15_metrics.md

> Source: https://moleculer.services/docs/0.15/metrics
> Scraped: 4/13/2025, 3:24:01 AM

Moleculer has a built-in metrics module that collects a lot of internal Moleculer & process metric values. Moreover, you can easily define your custom metrics. There are several built-in metrics reporters like `Console`, [Prometheus](https://prometheus.io/), [Datadog](https://www.datadoghq.com/), etc.

> If you want to use [legacy (<= v0.13) metrics](_modules.md#metrics) use `EventLegacy` tracing exporter. [More info](_docs_0.15_tracing.md#Event-legacy).

**Enable metrics & define console reporter**
```
  
module.exports = {  
    metrics: {  
        enabled: true,  
        reporter: \[  
            "Console"  
        \]  
    }  
};  
```
## [](_docs_0.15_metrics.md#Options)Options

Name

Type

Default

Description

`enabled`

`Boolean`

`false`

Enable tracing feature.

`reporter`

`Object` or `Array<Object>`

`null`

Metric reporter configuration. [More info](_docs_0.15_metrics.md#Metrics-Reporters)

`collectProcessMetrics`

`Boolean`

Collect process & OS related metrics. Default: `process.env.NODE_ENV !== "test"`

`collectInterval`

`Number`

`5`

Collect time period in seconds.

`defaultBuckets`

`Array<Number>`

Default bucket values for histograms. Default: `[0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]`

`defaultQuantiles`

`Array<Number>`

Default quantiles for histograms. Default: `[0.5, 0.9, 0.95, 0.99, 0.999]`

`defaultMaxAgeSeconds`

`Number`

`60`

Max age seconds for quantile calculation.

`defaultAgeBuckets`

`Number`

`10`

Number of buckets for quantile calculation.

`defaultAggregator`

`String`

`sum`

Value aggregator method.

## [](_docs_0.15_metrics.md#Metrics-Reporters)Metrics Reporters

Moleculer has several built-in reporters. All of them have the following options:

Name

Type

Default

Description

`includes`

`String` or `Array<String>`

`null`

List of metrics to be exported. [Default metrics](_docs_0.15_metrics.md#Built-in-Internal-Metrics)

`excludes`

`String` or `Array<String>`

`null`

List of metrics to be excluded. [Default metrics](_docs_0.15_metrics.md#Built-in-Internal-Metrics)

`metricNamePrefix`

`String`

`null`

Prefix to be added to metric names

`metricNameSuffix`

`String`

`null`

Suffix to be added to metric names

`metricNameFormatter`

`Function`

`null`

Metric name formatter

`labelNameFormatter`

`Function`

`null`

Label name formatter

**Example of metrics options**
```
  
module.exports = {  
    metrics: {  
        enabled: true,  
        reporter: \[  
            {  
                type: "Console",  
                options: {  
                    includes: \["moleculer.\*\*.total"\],  
                    excludes: \["moleculer.broker.\*\*","moleculer.request.\*\*"\],  
                      
                    metricNamePrefix: "mol:",   
                    metricNameSuffix: ".value",   
                  
                    metricNameFormatter: name => name.toUpperCase().replace(/\[.:\]/g, "\_"),  
                    labelNameFormatter: name => name.toUpperCase().replace(/\[.:\]/g, "\_")  
                }  
            }  
        \]  
    }  
};  
```
### [](_docs_0.15_metrics.md#Console)Console

This is a debugging reporter which periodically prints the metrics to the console.
```
  
module.exports = {  
    metrics: {  
        enabled: true,  
        reporter: \[  
            {  
                type: "Console",  
                options: {  
                      
                    interval: 5,  
                      
                    logger: null,  
                      
                    colors: true,  
                      
                    onlyChanges: true  
                }  
            }  
        \]  
    }  
};  
```
### [](_docs_0.15_metrics.md#CSV)CSV

Comma-Separated Values (CSV) reporter saves changes to a CSV file.
```
  
module.exports = {  
    metrics: {  
        enabled: true,  
        reporter: \[  
            {  
                type: "CSV",  
                options: {  
                      
                    folder: "./reports/metrics",  
                      
                    delimiter: ",",  
                      
                    rowDelimiter: "\\n",  
                      
                      
                      
                    mode: "metric",  
                      
                    types: null,  
                      
                    interval: 5,  
                      
                    filenameFormatter: null,  
                      
                    rowFormatter: null,  
                }  
            }  
        \]  
    }  
};  
```
### [](_docs_0.15_metrics.md#Event)Event

Event reporter sends Moleculer events with metric values.
```
  
module.exports = {  
    metrics: {  
        enabled: true,  
        reporter: \[  
            {  
                type: "Event",  
                options: {  
                      
                    eventName: "$metrics.snapshot",  
                      
                    broadcast: false,  
                      
                    groups: null,  
                      
                    onlyChanges: false,  
                      
                    interval: 5,  
                }  
            }  
        \]  
    }  
};  
```
### [](_docs_0.15_metrics.md#Datadog)Datadog

Datadog reporter sends metrics to the [Datadog server](https://www.datadoghq.com/).
```
  
module.exports = {  
    metrics: {  
        enabled: true,  
        reporter: \[  
            {  
                type: "Datadog",  
                options: {  
                      
                    host: "my-host",  
                      
                    baseUrl: "https://api.datadoghq.eu/api/",   
                      
                    apiVersion: "v1",  
                      
                    path: "/series",  
                      
                    apiKey: process.env.DATADOG\_API\_KEY,  
                      
                    defaultLabels: (registry) => ({  
                        namespace: registry.broker.namespace,  
                        nodeID: registry.broker.nodeID  
                    }),  
                      
                    interval: 10  
                }  
            }  
        \]  
    }  
};  
```
### [](_docs_0.15_metrics.md#Prometheus)Prometheus

Prometheus reporter publishes metrics in Prometheus format. The [Prometheus](https://prometheus.io/) server can collect them. Default port is `3030`.
```
  
module.exports = {  
    metrics: {  
        enabled: true,  
        reporter: \[  
            {  
                type: "Prometheus",  
                options: {  
                      
                    port: 3030,  
                      
                    path: "/metrics",  
                      
                    defaultLabels: registry => ({  
                        namespace: registry.broker.namespace,  
                        nodeID: registry.broker.nodeID  
                    })  
                }  
            }  
        \]  
    }  
};  
```
### [](_docs_0.15_metrics.md#StatsD)StatsD

The StatsD reporter sends metric values to [StatsD](https://github.com/statsd/statsd) server via UDP.
```
  
module.exports = {  
    metrics: {  
        enabled: true,  
        reporter: \[  
            {  
                type: "StatsD",  
                options: {  
                      
                    host: "localhost",  
                      
                    port: 8125,  
                      
                    maxPayloadSize: 1300  
                }  
            }  
        \]  
    }  
};  
```
### [](_docs_0.15_metrics.md#Customer-Reporter)Customer Reporter

Custom metrics module can be created. We recommend to copy the source of [Console Reporter](https://github.com/moleculerjs/moleculer/blob/master/src/metrics/reporters/console.js) and implement the `init`, `stop`, `metricChanged` methods.

**Create custom metrics**
```
const BaseReporter = require("moleculer").MetricReporters.Base;  
  
class MyMetricsReporter extends BaseReporter {  
    init() {  }  
    stop() {  }  
    metricChanged() {  }  
}  
```
**Use custom metrics**
```
  
const MyMetricsReporter = require("./my-metrics-reporter");  
  
module.exports = {  
    metrics: {  
        enabled: true,  
        reporter: \[  
            new MyMetricsReporter(),  
        \]  
    }  
};  
```
## [](_docs_0.15_metrics.md#Supported-Metric-Types)Supported Metric Types

### [](_docs_0.15_metrics.md#Counter)Counter

A counter is a cumulative metric that represents a single monotonically increasing counter whose value can only increase or be reset to zero. For example, you can use a counter to represent the number of requests served, tasks completed, or errors. It can also provide 1-minute rate.

Counter provides the following methods
```
increment(labels?: GenericObject, value?: number, timestamp?: number)  
set(value: number, labels?: GenericObject, timestamp?: number)  
```
### [](_docs_0.15_metrics.md#Gauge)Gauge

A gauge is a metric that represents a single numerical value that can arbitrarily go up and down. Gauges are typically used for measured values like current memory usage, but also “counts” that can go up and down, like the number of concurrent requests. It can also provide 1-minute rate.

Gauge provides the following methods:
```
increment(labels?: GenericObject, value?: number, timestamp?: number)  
decrement(labels?: GenericObject, value?: number, timestamp?: number)  
set(value: number, labels?: GenericObject, timestamp?: number)  
```
### [](_docs_0.15_metrics.md#Histogram)Histogram

A histogram samples observations (usually things like request durations or response sizes) and counts them in configurable buckets. It also provides a sum of all observed values and calculates configurable quantiles over a sliding time window. It can also provide 1-minute rate.

Histogram provides the following methods:
```
observe(value: number, labels?: GenericObject, timestamp?: number)  
```
### [](_docs_0.15_metrics.md#Info)Info

An info is a single string or number value like process arguments, hostname or version numbers.

Info provides the following methods:
```
set(value: any | null, labels?: GenericObject, timestamp?: number)  
```
## [](_docs_0.15_metrics.md#Built-in-Internal-Metrics)Built-in Internal Metrics

### [](_docs_0.15_metrics.md#Process-metrics)Process metrics

*   `process.arguments` (info)
*   `process.pid` (info)
*   `process.ppid` (info)
*   `process.memory.heap.size.total` (gauge)
*   `process.memory.heap.size.used` (gauge)
*   `process.memory.rss` (gauge)
*   `process.memory.external` (gauge)
*   `process.memory.heap.space.size.total` (gauge)
*   `process.memory.heap.space.size.used` (gauge)
*   `process.memory.heap.space.size.available` (gauge)
*   `process.memory.heap.space.size.physical` (gauge)
*   `process.memory.heap.stat.heap.size.total` (gauge)
*   `process.memory.heap.stat.executable.size.total` (gauge)
*   `process.memory.heap.stat.physical.size.total` (gauge)
*   `process.memory.heap.stat.available.size.total` (gauge)
*   `process.memory.heap.stat.used.heap.size` (gauge)
*   `process.memory.heap.stat.heap.size.limit` (gauge)
*   `process.memory.heap.stat.mallocated.memory` (gauge)
*   `process.memory.heap.stat.peak.mallocated.memory` (gauge)
*   `process.memory.heap.stat.zap.garbage` (gauge)
*   `process.uptime` (gauge)
*   `process.versions.node` (info)

### [](_docs_0.15_metrics.md#OS-metrics)OS metrics

*   `os.memory.free` (gauge)
*   `os.memory.total` (gauge)
*   `os.memory.used` (gauge)
*   `os.uptime` (gauge)
*   `os.type` (info)
*   `os.release` (info)
*   `os.hostname` (info)
*   `os.arch` (info)
*   `os.platform` (info)
*   `os.user.uid` (info)
*   `os.user.gid` (info)
*   `os.user.username` (info)
*   `os.user.homedir` (info)
*   `os.network.address` (info)
*   `os.network.mac` (info)
*   `os.datetime.unix` (gauge)
*   `os.datetime.iso` (info)
*   `os.datetime.utc` (info)
*   `os.datetime.tz.offset` (gauge)
*   `os.cpu.load.1` (gauge)
*   `os.cpu.load.5` (gauge)
*   `os.cpu.load.15` (gauge)
*   `os.cpu.utilization` (gauge)
*   `os.cpu.user` (gauge)
*   `os.cpu.system` (gauge)
*   `os.cpu.total` (gauge)
*   `os.cpu.info.model` (info)
*   `os.cpu.info.speed` (gauge)
*   `os.cpu.info.times.user` (gauge)
*   `os.cpu.info.times.sys` (gauge)

### [](_docs_0.15_metrics.md#Moleculer-metrics)Moleculer metrics

*   `moleculer.node.type` (info)
*   `moleculer.node.versions.moleculer` (info)
*   `moleculer.node.versions.protocol` (info)
*   `moleculer.broker.namespace` (info)
*   `moleculer.broker.started` (gauge)
*   `moleculer.broker.local.services.total` (gauge)
*   `moleculer.broker.middlewares.total` (gauge)
*   `moleculer.registry.nodes.total` (gauge)
*   `moleculer.registry.nodes.online.total` (gauge)
*   `moleculer.registry.services.total` (gauge)
*   `moleculer.registry.service.endpoints.total` (gauge)
*   `moleculer.registry.actions.total` (gauge)
*   `moleculer.registry.action.endpoints.total` (gauge)
*   `moleculer.registry.events.total` (gauge)
*   `moleculer.registry.event.endpoints.total` (gauge)
*   `moleculer.request.bulkhead.inflight` (gauge)
*   `moleculer.request.bulkhead.queue.size` (gauge)
*   `moleculer.event.bulkhead.inflight` (gauge)
*   `moleculer.event.bulkhead.queue.size` (gauge)
*   `moleculer.event.received.time` (histogram)
*   `moleculer.event.received.error.total`(counter)
*   `moleculer.event.received.active` (gauge)
*   `moleculer.request.timeout.total` (counter)
*   `moleculer.request.retry.attempts.total` (counter)
*   `moleculer.request.fallback.total` (counter)
*   `moleculer.request.total` (counter)
*   `moleculer.request.active` (gauge)
*   `moleculer.request.error.total` (counter)
*   `moleculer.request.time` (histogram)
*   `moleculer.request.levels` (counter)
*   `moleculer.event.emit.total` (counter)
*   `moleculer.event.broadcast.total` (counter)
*   `moleculer.event.broadcast-local.total` (counter)
*   `moleculer.event.received.total` (counter)
*   `moleculer.transit.publish.total` (counter)
*   `moleculer.transit.receive.total` (counter)
*   `moleculer.transit.requests.active` (gauge)
*   `moleculer.transit.streams.send.active` (gauge)
*   `moleculer.transporter.packets.sent.total` (counter)
*   `moleculer.transporter.packets.sent.bytes` (counter)
*   `moleculer.transporter.packets.received.total` (counter)
*   `moleculer.transporter.packets.received.bytes` (counter)

## [](_docs_0.15_metrics.md#Customizing)Customizing

### [](_docs_0.15_metrics.md#New-metric-registration)New metric registration

You can easily create custom metrics.

**Create a counter**
```
  
module.exports = {  
    name: "posts",  
  
    actions: {  
          
        get(ctx) {  
              
            this.broker.metrics.increment("posts.get.total", 1);  
  
            return this.posts;  
        }  
    },  
  
    created() {  
          
        this.broker.metrics.register({   
            type: "counter",   
            name: "posts.get.total",   
            description: "Number of requests of posts",   
            unit: "request",  
            rate: true   
        });  
    }  
};  
```
**Create a gauge with labels**
```
  
module.exports = {  
    name: "posts",  
  
    actions: {  
          
        create(ctx) {  
              
            this.broker.metrics.increment("posts.total", { userID: ctx.params.author }, 1);  
            return posts;  
        },  
  
          
        remove(ctx) {  
              
            this.broker.metrics.decrement("posts.total", { userID: ctx.params.author }, 1);  
            return posts;  
        },  
  
    },  
  
    created() {  
          
        this.broker.metrics.register({   
            type: "gauge",   
            name: "posts.total",   
            labelNames: \["userID"\]  
            description: "Number of posts by user",  
            unit: "post"  
        });  
    }  
};  
```
**Create a histogram with buckets & quantiles**
```
  
module.exports = {  
    name: "posts",  
  
    actions: {  
          
        create(ctx) {  
              
            const timeEnd = this.broker.metrics.timer("posts.creation.time");  
            const post = await this.adapter.create(ctx.params);  
            const duration = timeEnd();  
              
            this.logger.debug("Post created. Elapsed time: ", duration, "ms");  
            return post;  
        }  
    },  
  
    created() {  
          
        this.broker.metrics.register({   
            type: "histogram",   
            name: "posts.creation.time",   
            description: "Post creation time",  
            unit: "millisecond",  
            linearBuckets: {  
                start: 0,  
                width: 100,  
                count: 10  
            },  
            quantiles: \[0.5, 0.9, 0.95, 0.99\],  
            maxAgeSeconds: 60,  
            ageBuckets: 10  
        });  
    }  
};  
```

#### _docs_0.15_middlewares.md

> Source: https://moleculer.services/docs/0.15/middlewares
> Scraped: 4/13/2025, 3:24:01 AM

Moleculer supports middlewares. It’s same as plugins in other frameworks. The middleware is an `Object` with hooks & wrapper functions. It allows to wrap action handlers, event handlers, broker methods and hook lifecycle events.

**Example**
```
  
module.exports = {  
    name: "Awesome",  
  
    localAction(next, action) {  
        return function(ctx) {  
            console.log(\`My middleware is called before the \`${ctx.action.name}\` action executed.\`);  
            return next(ctx);  
        }  
    }  
};  
```
## [](_docs_0.15_middlewares.md#Wrapping-handlers)Wrapping handlers

Some hooks are wrappers. It means that you can wrap the original handler and return a new Function.  
Wrap hooks are which the first parameter is `next`.

**Wrap local action handler**
```
const MyDoSomethingMiddleware = {  
    localAction(next, action) {  
        if (action.myFunc) {  
              
            return function(ctx) {  
                doSomethingBeforeHandler(ctx);  
  
                return next(ctx)  
                    .then(res => {  
                        doSomethingAfterHandler(res);  
                          
                        return res;  
                    })  
                    .catch(err => {  
                        doSomethingAfterHandlerIfFailed(err);  
  
                          
                        throw err;  
                    });  
            }  
        }  
  
          
          
        return next;  
    }  
};  
```
**Example validator middleware**
```
const MyValidator = {  
    localAction(next, action) {  
          
        if (\_.isObject(action.params)) {  
            return ctx => {  
                this.validate(action.params, ctx.params);  
                return next(ctx);  
            };  
        }  
        return next;  
    }  
};  
```
The `next` is the original handler or the following wrapped handler. The middleware should return either the original `handler` or a new wrapped handler. As you can see above, the middleware checks whether the action has a `params` property. If yes, it will return a wrapped handler which calls the validator module before calling the original `handler`. If the `params` property is not defined, it simply returns the original `handler` (skip wrapping).

> If you don’t call the original `next` in the middleware it will break the request. It can be used in cachers. For example, if it finds the requested data in the cache, it’ll return the cached data instead of calling the `next`.

**Example cacher middleware**
```
const MyCacher = {  
    localAction(next, action) {  
        return async function cacherMiddleware(ctx) {  
            const cacheKey = this.getCacheKey(action.name, ctx.params, ctx);  
            const content = await this.get(cacheKey);  
            if (content != null) {  
                  
                ctx.cachedResult = true;  
                return content;  
            }  
  
              
            const result = await next(ctx);  
  
              
            this.set(cacheKey, result);  
            return result;  
  
        }.bind(this);  
    }  
};  
```
> The `next()` always returns a `Promise`. So you can access to responses and manipulate them, as well.

## [](_docs_0.15_middlewares.md#Decorate-core-modules-extend-functionality)Decorate core modules (extend functionality)

Middleware functions can be used to add new features to `ServiceBroker` or `Service` classes.

**Decorate broker with a new `allCall` method**
```
  
module.exports = {  
    middlewares: \[  
        {  
              
            created(broker) {  
                  
                broker.allCall = function(action, params, opts = {}) {  
                    const nodeIDs = this.registry.getNodeList({ onlyAvailable: true })  
                        .map(node => node.id);  
  
                      
                    return Promise.all(  
                        nodeIDs.map(nodeID => broker.call(action, params, Object.assign({ nodeID }, opts)))  
                    );  
                }  
            }  
        }  
    \]  
};  
```
Call the new method in order to call `$node.health` on every nodes:
```
const res = await broker.allCall("$node.health");  
```
## [](_docs_0.15_middlewares.md#Hooks)Hooks

### [](_docs_0.15_middlewares.md#localAction-next-action)`localAction(next, action)`

This hook wraps the local action handlers.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    localAction(next, action) {  
        return function(ctx) {  
              
            return next(ctx)  
                .then(res => {  
                      
                    return res;  
                })  
                .catch(err => {  
                      
                    throw err;  
                });  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#remoteAction-next-action)`remoteAction(next, action)`

This hook wraps the remote action handlers.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    remoteAction(next, action) {  
        return function(ctx) {  
              
            return next(ctx)  
                .then(res => {  
                      
                    return res;  
                })  
                .catch(err => {  
                      
                    throw err;  
                });  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#localEvent-next-event)`localEvent(next, event)`

This hook wraps the local event handlers.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    localEvent(next, event) {  
        return (ctx) => {  
			return next(ctx);  
		};  
    }  
}  
```
### [](_docs_0.15_middlewares.md#localMethod-next-method)`localMethod(next, method)`

This hook wraps service methods.
```
  
module.exports = {  
    name: "MyMiddleware",  
  
    localMethod(next, method) {  
        return (...args) => {  
            console.log(\`The '${method.name}' method is called in '${method.service.fullName}' service.\`, args);  
            return next(...args);  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#createService-next)`createService(next)`

This hook wraps the `broker.createService` method.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    createService(next) {  
        return function(schema, schemaMods) {  
            console.log("The 'createService' is called.");  
            return next(schema, schemaMods);  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#destroyService-next)`destroyService(next)`

This hook wraps the `broker.destroyService` method
```
  
module.export = {  
    name: "MyMiddleware",  
  
    destroyService(next) {  
        return function(service) {  
            console.log("The 'destroyService' is called.");  
            return next(service);  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#call-next)`call(next)`

This hook wraps the `broker.call` method.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    call(next) {  
        return function(actionName, params, opts) {  
            console.log("The 'call' is called.", actionName);  
            return next(actionName, params, opts).then(res => {  
                console.log("Response:", res);  
                return res;  
            });  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#mcall-next)`mcall(next)`

This hook wraps the `broker.mcall` method.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    mcall(next) {  
        return function() {  
            console.log("The 'mcall' is called.");  
            return next(...arguments).then(res => {  
                console.log("Response:", res);  
                return res;  
            });  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#emit-next)`emit(next)`

This hook wraps the `broker.emit` method.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    emit(next) {  
        return function(eventName, payload, opts) {  
            console.log("The 'emit' is called.", eventName);  
            return next(eventName, payload, opts);  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#broadcast-next)`broadcast(next)`

This hook wraps the `broker.broadcast` method.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    broadcast(next) {  
        return function(eventName, payload, opts) {  
            console.log("The 'broadcast' is called.", eventName);  
            return next(eventName, payload, opts);  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#broadcastLocal-next)`broadcastLocal(next)`

This hook wraps the `broker.broadcastLocal` method.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    broadcastLocal(next) {  
        return function(eventName, payload, opts) {  
            console.log("The 'broadcastLocal' is called.", eventName);  
            return next(eventName, payload, opts);  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#serviceCreated-service-sync)`serviceCreated(service)` _(sync)_

This hook is called after local service creating.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    serviceCreated(service) {  
        console.log("Service created", service.fullName);  
    }  
}  
```
### [](_docs_0.15_middlewares.md#serviceStarting-service-async)`serviceStarting(service)` _(async)_

This hook is called before service starting.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    serviceStarting(service) {  
        console.log("Service is starting", service.fullName);  
    }  
}  
```
### [](_docs_0.15_middlewares.md#serviceStarted-service-async)`serviceStarted(service)` _(async)_

This hook is called after service starting.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    serviceStarted(service) {  
        console.log("Service started", service.fullName);  
    }  
}  
```
### [](_docs_0.15_middlewares.md#serviceStopping-service-async)`serviceStopping(service)` _(async)_

This hook is called before service stopping.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    serviceStopping(service) {  
        console.log("Service is stopping", service.fullName);  
    }  
}  
```
### [](_docs_0.15_middlewares.md#serviceStopped-service-async)`serviceStopped(service)` _(async)_

This hook is called after service stopping.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    serviceStopped(service) {  
        console.log("Service stopped", service.fullName);  
    }  
}  
```
### [](_docs_0.15_middlewares.md#registerLocalService-next)`registerLocalService(next)`

This hook wraps broker’s local service registering method.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    registerLocalService(next) {  
        return (service) => {  
            console.log("Registering a local service", service.name);  
            return next(service);  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#serviceCreating-service-schema)`serviceCreating(service, schema)`

This hook is called during local service creation (after mixins are applied, so service schema is merged completely).
```
  
module.export = {  
    name: "MyMiddleware",  
  
    serviceCreating(service, schema) {  
          
        schema.myProp = "John";  
    }  
}  
```
### [](_docs_0.15_middlewares.md#transitPublish-next)`transitPublish(next)`

This hook is called before sending a communication packet.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    transitPublish(next) {  
        return (packet) => {  
            return next(packet);  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#transitMessageHandler-next)`transitMessageHandler(next)`

This hook is called before transit receives & parses an incoming message.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    transitMessageHandler(next) {  
        return (cmd, packet) => {  
            return next(cmd, packet);  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#transporterSend-next)`transporterSend(next)`

This hook is called after serialization but before the transporter sends a communication packet.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    transporterSend(next) {  
        return (topic, data, meta) => {  
              
            return next(topic, data, meta);  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#transporterReceive-next)`transporterReceive(next)`

This hook is called after transporter received a communication packet but before serialization.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    transporterReceive(next) {  
        return (cmd, data, s) => {  
              
            return next(cmd, data, s);  
        };  
    }  
}  
```
### [](_docs_0.15_middlewares.md#newLogEntry-type-args-bindings-sync)`newLogEntry(type, args, bindings)` _(sync)_

This hook is called when a new log messages iscreated.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    newLogEntry(type, args, bindings) {  
          
    }  
}  
```
### [](_docs_0.15_middlewares.md#created-broker-async)`created(broker)` _(async)_

This hook is called when broker created.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    created(broker) {  
        console.log("Broker created");  
    }  
}  
```
### [](_docs_0.15_middlewares.md#starting-broker-async)`starting(broker)` _(async)_

This hook is called before broker starting.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    starting(broker) {  
        console.log("Broker is starting");  
    }  
}  
```
### [](_docs_0.15_middlewares.md#started-broker-async)`started(broker)` _(async)_

This hook is called after broker starting.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    started(broker) {  
        console.log("Broker started");  
    }  
}  
```
### [](_docs_0.15_middlewares.md#stopping-broker-async)`stopping(broker)` _(async)_

This hook is called before broker stopping.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    stopping(broker) {  
        console.log("Broker is stopping");  
    }  
}  
```
### [](_docs_0.15_middlewares.md#stopped-broker-async)`stopped(broker)` _(async)_

This hook is called after broker stopped.
```
  
module.export = {  
    name: "MyMiddleware",  
  
    stopped(broker) {  
        console.log("Broker stopped");  
    }  
}  
```
## [](_docs_0.15_middlewares.md#Internal-middlewares)Internal middlewares

Many integrated features have been exposed as internal middlewares. These middlewares are loaded by default when broker is created. However, they can be turned off by setting the `internalMiddlewares: false` in broker option. In this case you must explicitly specify the required middlewares in the `middlewares: []` broker option.

**Internal middlewares**

Class name

Type

Description

`ActionHook`

Optional

Action hooks handler. [Read more](_docs_0.15_actions.md#Action-hooks)

`Validator`

Optional

Parameter validation. [Read more](_docs_0.15_validating.md)

`Bulkhead`

Optional

Bulkhead feature. [Read more](_docs_0.15_fault-tolerance.md#Bulkhead)

`Cacher`

Optional

Cacher middleware. [Read more](_docs_0.15_caching.md)

`ContextTracker`

Optional

Context tracker feature. [Read more](_docs_0.15_actions.md#Context-tracking)

`CircuitBreaker`

Optional

Circuit Breaker feature. [Read more](_docs_0.15_fault-tolerance.md#Circuit-Breaker)

`Timeout`

Always

Timeout feature. [Read more](_docs_0.15_fault-tolerance.md#Timeout)

`Retry`

Always

Retry feature. [Read more](_docs_0.15_fault-tolerance.md#Retry)

`Fallback`

Always

Fallback feature. [Read more](_docs_0.15_fault-tolerance.md#Fallback)

`ErrorHandler`

Always

Error handling.

`Tracing`

Optional

Tracing feature. [Read more](_docs_0.15_tracing.md)

`Metrics`

Optional

Metrics feature. [Read more](_docs_0.15_metrics.md)

`Debounce`

Optional

Debounce feature. [Read more](_docs_0.15_middlewares.md#Debounce)

`Throttle`

Optional

Throttle feature. [Read more](_docs_0.15_middlewares.md#Throttle)

`Transmit.Encryption`

Optional

Transmission encryption middleware. [Read more](_docs_0.15_middlewares.md#Encryption)

`Transmit.Compression`

Optional

Transmission compression middleware. [Read more](_docs_0.15_middlewares.md#Compression)

`Debugging.TransitLogger`

Optional

Transit Logger. [Read more](_docs_0.15_middlewares.md#Transit-Logger)

`Debugging.ActionLogger`

Optional

Action logger. [Read more](_docs_0.15_middlewares.md#Action-Logger)

**Access to internal middlewares**
```
const { Bulkhead, Retry } = require("moleculer").Middlewares;  
```
### [](_docs_0.15_middlewares.md#Transmission-Middleware)Transmission Middleware

#### [](_docs_0.15_middlewares.md#Encryption)Encryption

AES encryption middleware protects all inter-services communications that use the transporter module.  
This middleware uses built-in Node [`crypto`](https://nodejs.org/api/crypto.html) lib.
```
  
const crypto = require("crypto");  
const { Middlewares } = require("moleculer");  
const initVector = crypto.randomBytes(16);  
  
module.exports = {  
  middlewares: \[  
    Middlewares.Transmit.Encryption("secret-password", "aes-256-cbc", initVector)   
  \]  
};  
```
#### [](_docs_0.15_middlewares.md#Compression)Compression

Compression middleware reduces the size of the messages that go through the transporter module.  
This middleware uses built-in Node [`zlib`](https://nodejs.org/api/zlib.html) lib.
```
  
const { Middlewares } = require("moleculer");  
  
  
module.exports = {  
  middlewares: \[  
    Middlewares.Transmit.Compression("deflate")   
  \]  
};  
```
### [](_docs_0.15_middlewares.md#Debug-Middlewares)Debug Middlewares

#### [](_docs_0.15_middlewares.md#Transit-Logger)Transit Logger

Transit logger middleware allows to easily track the messages that are exchanged between services.
```
  
const { Middlewares } = require("moleculer");  
  
  
module.exports = {  
  middlewares: \[  
    Middlewares.Debugging.TransitLogger({  
      logPacketData: false,  
      folder: null,  
      colors: {  
        send: "magenta",  
        receive: "blue"  
      },  
      packetFilter: \["HEARTBEAT"\]  
    })  
  \]  
};  
```
**Complete option list**

Class name

Type

Default

Description

`logger`

`Object` or `Function`

`null`

Logger class. [Read more](_docs_0.15_logging.md).

`logLevel`

`String`

`info`

Log level for built-in console logger. [Read more](_docs_0.15_logging.md).

`logPacketData`

`Boolean`

`false`

Logs packet parameters

`folder`

`Object`

`null`

Folder where logs will be written

`extension`

`String`

`.json`

File extension of log file

`color.receive`

`String`

`grey`

Supports all [Chalk colors](https://github.com/chalk/chalk#colors)

`color.send`

`String`

`grey`

Supports all [Chalk colors](https://github.com/chalk/chalk#colors)

`packetFilter`

`Array<String>`

`HEARTBEAT`

Type of [packets](https://github.com/moleculer-framework/protocol/blob/master/4.0/PROTOCOL.md) to skip

#### [](_docs_0.15_middlewares.md#Action-Logger)Action Logger

Action Logger middleware tracks “how” service actions were executed.
```
  
const { Middlewares } = require("moleculer");  
  
  
module.exports = {  
  middlewares: \[  
    Middlewares.Debugging.ActionLogger({  
      logParams: true,  
      logResponse: true,  
      folder: null,  
      colors: {  
        send: "magenta",  
        receive: "blue"  
      },  
      whitelist: \["\*\*"\]  
    })  
  \]  
};  
```
**Complete option list**

Class name

Type

Default

Description

`logger`

`Object` or `Function`

`null`

Logger class. [Read more](_docs_0.15_logging.md).

`logLevel`

`String`

`info`

Log level for built-in console logger. [Read more](_docs_0.15_logging.md).

`logParams`

`Boolean`

`false`

Logs request parameters

`logMeta`

`Boolean`

`false`

Logs meta parameters

`folder`

`String`

`null`

Path do folder where logs will be written

`extension`

`String`

`.json`

File extension of log file

`color.request`

`String`

`yellow`

Supports all [Chalk colors](https://github.com/chalk/chalk#colors)

`color.response`

`String`

`cyan`

Supports all [Chalk colors](https://github.com/chalk/chalk#colors)

`colors.error`

`String`

`red`

Supports all [Chalk colors](https://github.com/chalk/chalk#colors)

`whitelist`

`Array<String>`

`["**"]`

Actions to log. Uses the same whitelisting mechanism as in [API Gateway](_docs_0.15_moleculer-web.md#Whitelist).

### [](_docs_0.15_middlewares.md#Event-Execution-Rate)Event Execution Rate

#### [](_docs_0.15_middlewares.md#Throttle)Throttle

Throttling is a straightforward reduction of the trigger rate. It will cause the event listener to ignore some portion of the events while still firing the listeners at a constant (but reduced) rate. Same functionality as [lodash’s `_.throttle`](https://lodash.com/docs/4.17.14#throttle). For more info about throttling check [this article](https://css-tricks.com/debouncing-throttling-explained-examples).
```
  
module.exports = {  
    name: "my",  
    events: {  
        "config.changed": {  
            throttle: 3000,  
              
            handler(ctx) { }  
        }  
    }  
};  
```
#### [](_docs_0.15_middlewares.md#Debounce)Debounce

Unlike throttling, debouncing is a technique of keeping the trigger rate at exactly 0 until a period of calm, and then triggering the listener exactly once. Same functionality as [lodash’s `_.debounce`](https://lodash.com/docs/4.17.14#debounce). For more info about debouncing check [this article](https://css-tricks.com/debouncing-throttling-explained-examples).
```
  
module.exports = {  
    name: "my",  
    events: {  
        "config.changed": {  
            debounce: 5000,  
              
            handler(ctx) { }  
        }  
    }  
};  
```
## [](_docs_0.15_middlewares.md#Loading-amp-Extending)Loading & Extending

If you want to use the built-in middlewares use their names in `middlewares[]` broker option. Also, the `Middlewares` can be easily extended with custom functions.

**Load middleware by name**
```
  
const { Middlewares } = require("moleculer");  
  
  
Middlewares.MyCustom = {  
    created(broker) {  
        broker.logger.info("My custom middleware is created!");  
    }  
};  
  
module.exports = {  
    logger: true,  
    middlewares: \[  
          
        "MyCustom"  
    \]  
};  
```
## [](_docs_0.15_middlewares.md#Global-view)Global view

![Middlewares diagram](https://moleculer.services/docs/0.15/assets/middlewares.svg)

#### _docs_0.15_moleculer-cli.md

> Source: https://moleculer.services/docs/0.15/moleculer-cli
> Scraped: 4/13/2025, 3:24:03 AM

## [](_docs_0.15_moleculer-cli.md#moleculer-cli)moleculer-cli [![npm](https://img.shields.io/npm/v/moleculer-cli.svg?maxAge=3600)](https://www.npmjs.com/package/moleculer-cli)

This is a [command-line tool](https://github.com/moleculerjs/moleculer-cli) for Moleculer to help developing & testing.

## [](_docs_0.15_moleculer-cli.md#Install)Install
```
$ npm i -g moleculer-cli  
```
## [](_docs_0.15_moleculer-cli.md#Commands)Commands

## [](_docs_0.15_moleculer-cli.md#Init)Init

The `init` command is used to scaffold a new Moleculer project.
```
$ moleculer init project my-project  
```
The above command downloads the template from [moleculerjs/moleculer-template-project](https://github.com/moleculerjs/moleculer-template-project), prompts some information and generates a new module to the `./my-project` folder.

### [](_docs_0.15_moleculer-cli.md#Answers-from-file)Answers from file

You can put the question answers into a JSON file and load it with the `--answers` argument. It can be useful to generate project programmatically.
```
$ moleculer init project my-project --answers ./answers.json  
```
### [](_docs_0.15_moleculer-cli.md#Disable-installing-dependencies)Disable installing dependencies

You can disable the automatic NPM dependency installation with `--no-install` argument. It can be useful to generate project programmatically.
```
$ moleculer init project my-project --answers ./answers.json --no-install  
```
### [](_docs_0.15_moleculer-cli.md#Official-templates)[Official templates](https://github.com/topics/moleculer-template)

* [**project**](https://github.com/moleculerjs/moleculer-template-project) - Generate a common Moleculer-based project. _Use it if you want to start a new project which is based on Moleculer framework_
    *   sample service (`greeter`)
    *   official [API Gateway](https://github.com/moleculerjs/moleculer-web) (optional)
    *   Docker & Docker Compose files
    *   tests & coverage with [Jest](http://facebook.github.io/jest/)
    *   lint with [ESLint](http://eslint.org/)

* [**nano**](https://github.com/moleculerjs/moleculer-template-nano) - Minimal project template for one microservice. _Use it if you want to create a microservice which connect to others via transporter_
    *   sample service (`greeter`)
    *   Docker & Docker Compose files
    *   tests & coverage with [Jest](http://facebook.github.io/jest/)
    *   lint with [ESLint](http://eslint.org/)
    *   Minimal Docker file

* [**module**](https://github.com/moleculerjs/moleculer-template-module) - Generate a new Moleculer module project (e.g.: `moleculer-xyz`). _Use it if you want to create a module for Moleculer framework_
    *   empty service skeleton
    *   examples skeleton
    *   readme skeleton
    *   tests & coverage with [Jest](http://facebook.github.io/jest/)
    *   lint with [ESLint](http://eslint.org/)

### [](_docs_0.15_moleculer-cli.md#Custom-templates)Custom templates
```
$ moleculer init username/repo my-project  
```
Where username/repo is the GitHub repo shorthand for your fork.

The shorthand repo notation is passed to [download-git-repo](https://gitlab.com/flippidippi/download-git-repo) so it can be `bitbucket:username/repo` for a Bitbucket repo and `username/repo#branch` for tags or branches.

### [](_docs_0.15_moleculer-cli.md#Local-Templates)Local Templates

Instead of a GitHub repo, use a template from local filesystem:
```
$ moleculer init ./path/to-custom-template my-project  
```
### [](_docs_0.15_moleculer-cli.md#Template-aliases)Template aliases

To simplify usage of custom templates (local and remote), it is possible to register an alias and use that afterwards instead of the whole repository url.
```
$ moleculer alias\-template myAlias somegithubuser/reponame  
$ moleculer alias\-template otherAlias ./path/to/some-local/custom/template  
  
  
$ moleculer init myAlias my-project  
```
All registered template aliases are stored in the file `~/.moleculer-templates.json` and can also be edited manually.

### [](_docs_0.15_moleculer-cli.md#Creating-Custom-Templates)Creating Custom Templates

Moleculer templates consist of a `meta.js` file and a `template` directory.

##### [](_docs_0.15_moleculer-cli.md#meta-js)`meta.js`

The `meta.js` file exports a function that returns an object defining the Moleculer CLI init interface. The function takes a parameter `values` that gives access to external values passed in from the CLI. The object has several keys which are explained below.

The `questions` property is an array of objects defining the questions asked in the init process. These objects are [Inquirer.js objects](https://github.com/SBoudrias/Inquirer.js#objects). Data collected here is stored in the Metalsmith `metadata` object.

The `metalsmith` property allows custom code to be executed at different points in the transformation process. The `before` function executes before the transformation is run, the `after` function executes after the transformation is run, and the `complete` function executes after the transformation is run and the files are copied to the destination directory.

The `metalsmith` functions take an argument `metalsmith` which gives a reference to the [Metalsmith](https://github.com/segmentio/metalsmith#metalsmith) object. A common use is to get the Metalsmith metadata by calling `metalsmith.metadata()` and then adding or mutating properties on the metadata object so it will be available for the rest of the transformation.

The `filters` object takes a set of keys matching a path and a value matching the name of a question variable. If the question variable’s value is `false`, the specified path will be ignored during the transformation and those files will not be added to the project being intialized.

The `completeMessage` property takes a multiline string that will be displayed after the initialization is completed.

##### [](_docs_0.15_moleculer-cli.md#template)`template`

The `template` directory contains files which will be transformed using [Handlebars](https://handlebarsjs.com/) and then copied to the destination directory. Handlebars is given the `metadata` object from Metalsmith to be the source for string replacement.

Handlebars can also transform file names.

## [](_docs_0.15_moleculer-cli.md#Start)Start

This command starts a new `ServiceBroker` locally and switches to REPL mode.
```
$ moleculer start  
```
**Options**
```
\--version     Show version number                                    \[boolean\]  
\--help        Show help                                              \[boolean\]  
\--config, -c  Load configuration from a file            \[string\] \[default: ""\]  
\--ns          Namespace                                 \[string\] \[default: ""\]  
\--level       Logging level                         \[string\] \[default: "info"\]  
\--id          NodeID                                  \[string\] \[default: null\]  
\--hot, -h     Enable hot-reload                     \[boolean\] \[default: false\]  
\--commands    Custom REPL command file mask (e.g.: ./commands/\*.js)  
                                                      \[string\] \[default: null\]  
```
## [](_docs_0.15_moleculer-cli.md#Connect)Connect

This command starts a new `ServiceBroker`, connects to a transporter server and switches to REPL mode.
```
  
$ moleculer connect  
  
  
$ moleculer connect nats://localhost:4222  
  
  
$ moleculer connect redis://localhost  
  
  
$ moleculer connect mqtt://localhost  
  
  
$ moleculer connect amqp://localhost:5672  
  
  
$ moleculer connect --config ./moleculer.config.js  
```
**Options**
```
\--version     Show version number                                    \[boolean\]  
\--help        Show help                                              \[boolean\]  
\--config, -c  Load configuration from a file            \[string\] \[default: ""\]  
\--ns          Namespace                                 \[string\] \[default: ""\]  
\--level       Logging level                         \[string\] \[default: "info"\]  
\--id          NodeID                                  \[string\] \[default: null\]  
\--hot, -h     Enable hot-reload                     \[boolean\] \[default: false\]  
\--serializer  Serializer                              \[string\] \[default: null\]  
\--commands    Custom REPL command file mask (e.g.: ./commands/\*.js)  
                                                      \[string\] \[default: null\]  
```
## [](_docs_0.15_moleculer-cli.md#Call)Call

The `call` command can be used establish a connection with a Moleculer project and call an action with parameters. The result (stringified JSON) will be printed to the console. This means that you can process the result with another tool. The calling parameters should start with `@` prefix and the meta parameters should start with `#` prefix.

**Options**
```
\--version          Show version number                               \[boolean\]  
\--help             Show help                                         \[boolean\]  
\--config, -c       Load configuration from a file       \[string\] \[default: ""\]  
\--transporter, -t  Transporter connection string (NATS, nats://127.0.0.1:4222,  
                   ...etc)                            \[string\] \[default: null\]  
\--ns               Namespace                            \[string\] \[default: ""\]  
\--level            Logging level                  \[string\] \[default: "silent"\]  
\--id               NodeID                             \[string\] \[default: null\]  
\--serializer       Serializer                         \[string\] \[default: null\]  
```
**Example with params**
```
moleculer call math.add --transporter NATS --@a 5 --@b 3  
```
**Example with params & meta**
```
moleculer call math.add --transporter NATS --@a 5 --@b 3 --  
```
**Example with post processing the result with [jq](https://stedolan.github.io/jq/)**
```
moleculer call "\\$node.health" | jq '.mem.free'  
```
> The transporter can be defined via `TRANSPORTER` environment variable, as well.

**Example with transporter env var**
```
TRANSPORTER=nats://localhost:42222 moleculer call math.add --@a 5 --@b 3  
```
## [](_docs_0.15_moleculer-cli.md#Emit)Emit

The `emit` command can be used establish a connection with a Moleculer project and emit an event with a payload. The calling parameters should start with `@` prefix and the meta parameters should start with `#` prefix.

**Options**
```
\--version          Show version number                               \[boolean\]  
\--help             Show help                                         \[boolean\]  
\--config, -c       Load configuration from a file       \[string\] \[default: ""\]  
\--transporter, -t  Transporter connection string (NATS, nats://127.0.0.1:4222,  
                   ...etc)                            \[string\] \[default: null\]  
\--ns               Namespace                            \[string\] \[default: ""\]  
\--level            Logging level                  \[string\] \[default: "silent"\]  
\--id               NodeID                             \[string\] \[default: null\]  
\--serializer       Serializer                         \[string\] \[default: null\]  
\--broadcast, -b    Send broadcast event             \[boolean\] \[default: false\]  
\--group, -g        Event groups                       \[string\] \[default: null\]  
```
**Example with params**
```
moleculer emit user.created --transporter NATS --@id 3 --@name John  
```
**Example with params & meta**
```
moleculer emit math.add --transporter NATS --@id 3 --@name John --  
```
**Example with broadcast & groups**
```
moleculer emit math.add --transporter NATS --broadcast --@id 3 --@name John --group accounts  
```
**Example with multi groups**
```
moleculer emit math.add --transporter NATS --broadcast --@id 3 --@name John --group accounts --group mail  
```
> The transporter can be defined via `TRANSPORTER` environment variable, as well.

**Example with transporter env var**
```
TRANSPORTER=nats://localhost:42222 moleculer call math.add --@a 5 --@b 3  
```

#### _docs_0.15_moleculer-db.md

> Source: https://moleculer.services/docs/0.15/moleculer-db
> Scraped: 4/13/2025, 3:24:04 AM

Moleculer framework has an official set of [DB adapters](https://github.com/moleculerjs/moleculer-db). Use them to persist your data in a database.

> **Database per service**
> 
> Moleculer follows the _one database per service_ pattern. To learn more about this design pattern and its implications check this [article](https://microservices.io/patterns/data/database-per-service.html). For _multiple entities/tables per service_ approach check [FAQ](_docs_0.15_faq.md#DB-Adapters-moleculer-db).

## [](_docs_0.15_moleculer-db.md#Features)Features

*   default CRUD actions
* [cached](_docs_0.15_caching.md) actions
*   pagination support
*   pluggable adapter ([NeDB](https://github.com/louischatriot/nedb) is the default memory adapter for testing & prototyping)
*   official adapters for MongoDB, PostgreSQL, SQLite, MySQL, MSSQL.
*   fields filtering
*   populating
*   encode/decode IDs
*   entity lifecycle events for notifications

> **Try it in your browser!**
> 
> [![Edit moleculer-db](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/moleculerjs/sandbox-moleculer-db/tree/master/?fontsize=14)

## [](_docs_0.15_moleculer-db.md#Base-Adapter)Base Adapter [![NPM version](https://img.shields.io/npm/v/moleculer-db.svg)](https://www.npmjs.com/package/moleculer-db)

Moleculer’s default adapter is based on [NeDB](https://github.com/louischatriot/nedb). Use it to quickly set up and test you prototype.

> Only use this adapter for prototyping and testing. When you are ready to go into production simply swap to [Mongo](_docs_0.15_moleculer-db.md#Mongo-Adapter), [Mongoose](_docs_0.15_moleculer-db.md#Mongoose-Adapter) or [Sequelize](_docs_0.15_moleculer-db.md#Sequelize-Adapter) adapters as they all implement common [Settings](_docs_0.15_moleculer-db.md#Settings), [Actions](_docs_0.15_moleculer-db.md#Actions) and [Methods](_docs_0.15_moleculer-db.md#Methods).

### [](_docs_0.15_moleculer-db.md#Install)Install
```
$ npm install moleculer-db --save  
```
### [](_docs_0.15_moleculer-db.md#Usage)Usage
```
"use strict";  
  
const { ServiceBroker } = require("moleculer");  
const DbService = require("moleculer-db");  
  
const broker = new ServiceBroker();  
  
  
broker.createService({  
    name: "users",  
  
      
    mixins: \[DbService\],  
  
    settings: {  
        fields: \["\_id", "username", "name"\],  
        entityValidator: {  
			username: "string"  
		}  
    },  
  
    afterConnected() {  
          
    }  
});  
  
broker.start()  
  
  
.then(() => broker.call("users.create", {  
    username: "john",  
    name: "John Doe",  
    status: 1  
}))  
  
  
.then(() => broker.call("users.find").then(console.log));  
  
  
.then(() => broker.call("users.list", { page: 2, pageSize: 10 }).then(console.log));  
  
  
.then(() => broker.call("users.get", { id: 2 }).then(console.log));  
  
  
.then(() => broker.call("users.update", { id: 2, name: "Jane Doe" }).then(console.log));  
  
  
.then(() => broker.call("users.remove", { id: 2 }).then(console.log));  
```
> More examples can be found on [GitHub](https://github.com/moleculerjs/moleculer-db/tree/master/packages/moleculer-db/examples)

## [](_docs_0.15_moleculer-db.md#Settings)Settings

All DB adapters share a common set of settings:

Property

Type

Default

Description

`idField`

`String`

**required**

Name of ID field.

`fields`

`Array.<String>`

`null`

Field filtering list. It must be an `Array`. If the value is `null` or `undefined` doesn’t filter the fields of entities.

`populates`

`Array`

`null`

Schema for population. [Read more](_docs_0.15_moleculer-db.md#Populating).

`pageSize`

`Number`

**required**

Default page size in `list` action.

`maxPageSize`

`Number`

**required**

Maximum page size in `list` action.

`maxLimit`

`Number`

**required**

Maximum value of limit in `find` action. Default: `-1` (no limit)

`entityValidator`

`Object`, `function`

`null`

Validator schema or a function to validate the incoming entity in `create` & ‘insert’ actions.

> `idField` does not work with Sequelize adapter as you can freely set your own ID while creating the model.

## [](_docs_0.15_moleculer-db.md#Customization)Customization

As with all mixins, the standard [merge algorithm](_docs_0.15_services.md#Merge-algorithm) allows you to override the defaults applied by this mixin. For example to disable an action you can set the action to `false` in your service.

**Example**
```
"use strict";  
const { ServiceBroker } = require("moleculer");  
const DbService = require("moleculer-db");  
  
const broker = new ServiceBroker();  
  
broker.createService({  
    name: "db-with-hooks",  
  
      
    mixins: \[DbService\],  
      
    actions: {  
          
        remove: false,  
          
        create: {  
            visibility: "public",  
        },  
        insert: {  
            visibility: "public",  
        }  
          
    }  
});  
```
## [](_docs_0.15_moleculer-db.md#Actions)Actions

DB adapters also implement CRUD operations. These [actions](_docs_0.15_actions.md) are [`published`](_docs_0.15_actions.md#Action-visibility) methods and can be called by other services.

### [](_docs_0.15_moleculer-db.md#find)`find` ![Cached action](https://img.shields.io/badge/cache-true-blue.svg)

Find entities by query.

#### [](_docs_0.15_moleculer-db.md#Parameters)Parameters

Property

Type

Default

Description

`populate`

`Array.<String>`

\-

Populated fields.

`fields`

`Array.<String>`

\-

Fields filter.

`limit`

`Number`

**required**

Max count of rows.

`offset`

`Number`

**required**

Count of skipped rows.

`sort`

`String`

**required**

Sorted fields.

`search`

`String`

**required**

Search text.

`searchFields`

`String`

**required**

Fields for searching.

`query`

`Object`

**required**

Query object. Passes to adapter.

#### [](_docs_0.15_moleculer-db.md#Results)Results

**Type:** `Array.<Object>` - List of found entities.

### [](_docs_0.15_moleculer-db.md#count)`count` ![Cached action](https://img.shields.io/badge/cache-true-blue.svg)

Get count of entities by query.

#### [](_docs_0.15_moleculer-db.md#Parameters-1)Parameters

Property

Type

Default

Description

`search`

`String`

**required**

Search text.

`searchFields`

`String`

**required**

Fields list for searching.

`query`

`Object`

**required**

Query object. Passes to adapter.

#### [](_docs_0.15_moleculer-db.md#Results-1)Results

**Type:** `Number` - Count of found entities.

### [](_docs_0.15_moleculer-db.md#list)`list` ![Cached action](https://img.shields.io/badge/cache-true-blue.svg)

List entities by filters and pagination results.

#### [](_docs_0.15_moleculer-db.md#Parameters-2)Parameters

Property

Type

Default

Description

`populate`

`Array.<String>`

\-

Populated fields.

`fields`

`Array.<String>`

\-

Fields filter.

`page`

`Number`

**required**

Page number.

`pageSize`

`Number`

**required**

Size of a page.

`sort`

`String`

**required**

Sorted fields.

`search`

`String`

**required**

Search text.

`searchFields`

`String`

**required**

Fields for searching.

`query`

`Object`

**required**

Query object. Passes to adapter.

#### [](_docs_0.15_moleculer-db.md#Results-2)Results

**Type:** `Object` - List of found entities and count.

### [](_docs_0.15_moleculer-db.md#create)`create`

Create a new entity.

#### [](_docs_0.15_moleculer-db.md#Parameters-3)Parameters

Property

Type

Default

Description

\-

\-

\-

\-

_No input parameters._

#### [](_docs_0.15_moleculer-db.md#Results-3)Results

**Type:** `Object` - Saved entity.

### [](_docs_0.15_moleculer-db.md#insert)`insert`

Create many new entities.

#### [](_docs_0.15_moleculer-db.md#Parameters-4)Parameters

Property

Type

Default

Description

`entity`

`Object`

\-

Entity to save.

`entities`

`Array.<Object>`

\-

Entities to save.

#### [](_docs_0.15_moleculer-db.md#Results-4)Results

**Type:** `Object`, `Array.<Object>` - Saved entity(ies).

### [](_docs_0.15_moleculer-db.md#get)`get` ![Cached action](https://img.shields.io/badge/cache-true-blue.svg)

Get entity by ID.

##### [](_docs_0.15_moleculer-db.md#Parameters-5)Parameters

Property

Type

Default

Description

`id`

`any`, `Array.<any>`

**required**

ID(s) of entity.

`populate`

`Array.<String>`

\-

Field list for populate.

`fields`

`Array.<String>`

\-

Fields filter.

`mapping`

`Boolean`

\-

Convert the returned `Array` to `Object` where the key is the value of `id`.

#### [](_docs_0.15_moleculer-db.md#Results-5)Results

**Type:** `Object`, `Array.<Object>` - Found entity(ies).

### [](_docs_0.15_moleculer-db.md#update)`update`

Update an entity by ID.

> After update, clear the cache & call lifecycle events.

#### [](_docs_0.15_moleculer-db.md#Parameters-6)Parameters

Property

Type

Default

Description

\-

\-

\-

\-

_No input parameters._

#### [](_docs_0.15_moleculer-db.md#Results-6)Results

**Type:** `Object` - Updated entity.

### [](_docs_0.15_moleculer-db.md#remove)`remove`

Remove an entity by ID.

#### [](_docs_0.15_moleculer-db.md#Parameters-7)Parameters

Property

Type

Default

Description

`id`

`any`

**required**

ID of entity.

#### [](_docs_0.15_moleculer-db.md#Results-7)Results

**Type:** `Number` - Count of removed entities.

## [](_docs_0.15_moleculer-db.md#Methods)Methods

DB adapters also has a set of helper [methods](_docs_0.15_services.md#Methods).

### [](_docs_0.15_moleculer-db.md#getById)`getById`

Get entity(ies) by ID(s).

#### [](_docs_0.15_moleculer-db.md#Parameters-8)Parameters

Property

Type

Default

Description

`id`

`String`, `Number`, `Array`

**required**

ID or IDs.

`decoding`

`Boolean`

**required**

Need to decode IDs.

#### [](_docs_0.15_moleculer-db.md#Results-8)Results

**Type:** `Object`, `Array.<Object>` - Found entity(ies).

### [](_docs_0.15_moleculer-db.md#clearCache)`clearCache`

Clear cached entities

#### [](_docs_0.15_moleculer-db.md#Parameters-9)Parameters

Property

Type

Default

Description

\-

\-

\-

\-

_No input parameters._

#### [](_docs_0.15_moleculer-db.md#Results-9)Results

**Type:** `Promise`

### [](_docs_0.15_moleculer-db.md#encodeID)`encodeID`

Encode ID of entity.

#### [](_docs_0.15_moleculer-db.md#Parameters-10)Parameters

Property

Type

Default

Description

`id`

`any`

**required**

\-

#### [](_docs_0.15_moleculer-db.md#Results-10)Results

**Type:** `any`

### [](_docs_0.15_moleculer-db.md#decodeID)`decodeID`

Decode ID of entity.

#### [](_docs_0.15_moleculer-db.md#Parameters-11)Parameters

Property

Type

Default

Description

`id`

`any`

**required**

\-

#### [](_docs_0.15_moleculer-db.md#Results-11)Results

**Type:** `any`

### [](_docs_0.15_moleculer-db.md#find-1)`_find` ![Cached action](https://img.shields.io/badge/cache-true-blue.svg)

Find entities by query.

#### [](_docs_0.15_moleculer-db.md#Parameters-12)Parameters

Property

Type

Default

Description

`populate`

`Array.<String>`

\-

Populated fields.

`fields`

`Array.<String>`

\-

Fields filter.

`limit`

`Number`

**required**

Max count of rows.

`offset`

`Number`

**required**

Count of skipped rows.

`sort`

`String`

**required**

Sorted fields.

`search`

`String`

**required**

Search text.

`searchFields`

`String`

**required**

Fields for searching.

`query`

`Object`

**required**

Query object. Passes to adapter.

#### [](_docs_0.15_moleculer-db.md#Results-12)Results

**Type:** `Array.<Object>`

List of found entities.

### [](_docs_0.15_moleculer-db.md#count-1)`_count` ![Cached action](https://img.shields.io/badge/cache-true-blue.svg)

Get count of entities by query.

#### [](_docs_0.15_moleculer-db.md#Parameters-13)Parameters

Property

Type

Default

Description

`search`

`String`

**required**

Search text.

`searchFields`

`String`

**required**

Fields list for searching.

`query`

`Object`

**required**

Query object. Passes to adapter.

#### [](_docs_0.15_moleculer-db.md#Results-13)Results

**Type:** `Number`

Count of found entities.

### [](_docs_0.15_moleculer-db.md#list-1)`_list` ![Cached action](https://img.shields.io/badge/cache-true-blue.svg)

List entities by filters and pagination results.

#### [](_docs_0.15_moleculer-db.md#Parameters-14)Parameters

Property

Type

Default

Description

`populate`

`Array.<String>`

\-

Populated fields.

`fields`

`Array.<String>`

\-

Fields filter.

`page`

`Number`

**required**

Page number.

`pageSize`

`Number`

**required**

Size of a page.

`sort`

`String`

**required**

Sorted fields.

`search`

`String`

**required**

Search text.

`searchFields`

`String`

**required**

Fields for searching.

`query`

`Object`

**required**

Query object. Passes to adapter.

#### [](_docs_0.15_moleculer-db.md#Results-14)Results

**Type:** `Object`

List of found entities and count.

### [](_docs_0.15_moleculer-db.md#create-1)`_create`

Create a new entity.

#### [](_docs_0.15_moleculer-db.md#Parameters-15)Parameters

Property

Type

Default

Description

`params`

`Object`

\-

Entity to save.

#### [](_docs_0.15_moleculer-db.md#Results-15)Results

**Type:** `Object`

Saved entity.

### [](_docs_0.15_moleculer-db.md#insert-1)`_insert`

Create many new entities.

#### [](_docs_0.15_moleculer-db.md#Parameters-16)Parameters

Property

Type

Default

Description

`entity`

`Object`

\-

Entity to save.

`entities`

`Array.<Object>`

\-

Entities to save.

#### [](_docs_0.15_moleculer-db.md#Results-16)Results

**Type:** `Object`, `Array.<Object>`

Saved entity(ies).

### [](_docs_0.15_moleculer-db.md#get-1)`_get` ![Cached action](https://img.shields.io/badge/cache-true-blue.svg)

Get entity by ID.

#### [](_docs_0.15_moleculer-db.md#Parameters-17)Parameters

Property

Type

Default

Description

`id`

`any`, `Array.<any>`

**required**

ID(s) of entity.

`populate`

`Array.<String>`

\-

Field list for populate.

`fields`

`Array.<String>`

\-

Fields filter.

`mapping`

`Boolean`

\-

Convert the returned `Array` to `Object` where the key is the value of `id`.

#### [](_docs_0.15_moleculer-db.md#Results-17)Results

**Type:** `Object`, `Array.<Object>`

Found entity(ies).

### [](_docs_0.15_moleculer-db.md#update-1)`_update`

Update an entity by ID.

> After update, clear the cache & call lifecycle events.

#### [](_docs_0.15_moleculer-db.md#Parameters-18)Parameters

Property

Type

Default

Description

`params`

`Object`

\-

Entity to update.

#### [](_docs_0.15_moleculer-db.md#Results-18)Results

**Type:** `Object`

Updated entity.

### [](_docs_0.15_moleculer-db.md#remove-1)`_remove`

Remove an entity by ID.

#### [](_docs_0.15_moleculer-db.md#Parameters-19)Parameters

Property

Type

Default

Description

`id`

`any`

**required**

ID of entity.

#### [](_docs_0.15_moleculer-db.md#Results-19)Results

**Type:** `Number`

Count of removed entities.

## [](_docs_0.15_moleculer-db.md#Data-Manipulation)Data Manipulation

You can easily use [Action hooks](_docs_0.15_actions.md#Action-hooks) to modify (e.g. add timestamps, hash user’s passwords or remove sensitive info) before or after saving the data in DB. Hooks will only run before or after actions. If you need to run your data manipulations before or after the this.\_create(), this.\_update() or this.\_remove() methods, you can use the [Lifecycle events](_docs_0.15_moleculer-db.md#Lifecycle-entity-events)

**Example of hooks adding a timestamp and removing sensitive data**
```
"use strict";  
const { ServiceBroker } = require("moleculer");  
const DbService = require("moleculer-db");  
  
const broker = new ServiceBroker();  
  
broker.createService({  
  name: "db-with-hooks",  
  
    
  mixins: \[DbService\],  
  
    
  hooks: {  
    before: {  
      create: \[  
        function addTimestamp(ctx) {  
            
          ctx.params.createdAt = new Date();  
          return ctx;  
        }  
      \]  
    },  
    after: {  
      get: \[  
        // Arrow function as a Hook  
        (ctx, res) => {  
            
          delete res.mail;  
          delete res.phoneNumber;  
  
          return res;  
        }  
      \]  
    }  
  }  
});  
  
const user = {  
  name: "John Doe",  
  mail: "[\[email protected\]](_cdn-cgi_l_email-protection.md)",  
  phoneNumber: 123456789  
};  
  
broker.start()  
    
    
  .then(() => broker.call("db-with-hooks.create", user))  
    
    
  .then(entry => broker.call("db-with-hooks.get", { id: entry.\_id }))  
  .then(res => console.log(res))  
  .catch(err => console.error(err));  
```
## [](_docs_0.15_moleculer-db.md#Populating)Populating

The service allows you to easily populate fields from other services. For example: If you have an `author` field in `post` entity, you can populate it with `users` service by ID of author. If the field is an `Array` of IDs, it will populate all entities via only one request

**Example of populate schema**
```
broker.createService({  
    name: "posts",  
    mixins: \[DbService\],  
    settings: {  
        populates: {  
              
            "voters": "users.get",  
              
              
            "liked.by": "users.get"  
  
              
            "author": {  
                action: "users.get",  
                params: {  
                    fields: "username fullName"  
                }  
            },  
              
              
              
            "reviewer": {  
                field: "reviewerId",  
                action: "users.get",  
                params: {  
                    fields: "username fullName"  
                }  
            },  
  
              
            "rate"(ids, items, rule, ctx) {  
                  
                  
                  
                  
                  
                return Promise.resolve(...);  
            }  
        }  
    }  
});  
  
  
broker.call("posts.find", { populate: \["author"\]}).then(console.log);  
  
broker.call("posts.find", { populate: \["liked.by"\]}).then(console.log);  
```
Recursive population is also supported. For example, if the users service populates a group field:
```
broker.createService({  
    name: "users",  
    mixins: \[DbService\],  
    settings: {  
        populates: {  
            "group": "groups.get"  
        }  
    }  
});  
```
Then you can populate the group of a post author or liker like this:
```
  
broker.call("posts.find", { populate: \["author.group"\]}).then(console.log);  
  
broker.call("posts.find", { populate: \["liked.by.group"\]}).then(console.log);  
```
> The `populate` parameter is available in `find`, `list` and `get` actions.

## [](_docs_0.15_moleculer-db.md#Lifecycle-entity-events)Lifecycle entity events

There are 6 lifecycle entity events which are called when entities are manipulated.
```
broker.createService({  
    name: "posts",  
    mixins: \[DbService\],  
    settings: {},  
  
    afterConnected() {  
        this.logger.info("Connected successfully");  
    },  
      
    beforeEntityCreate(json, ctx) {  
        this.logger.info("New entity will be created");  
        json.createdAt = new Date()  
        json.updatedAt = new Date()  
        return json;   
    },  
      
    beforeEntityUpdate(json, ctx) {  
        this.logger.info("Entity will be updated");  
        json.updatedAt = new Date()  
        return json;  
    },  
      
    beforeEntityRemove(json, ctx) {  
        this.logger.info("Entity will be removed");  
        return json;  
    },  
  
    entityCreated(json, ctx) {  
        this.logger.info("New entity created!");  
    },  
  
    entityUpdated(json, ctx) {  
          
        this.logger.info(\`Entity updated by '${ctx.meta.user.name}' user!\`);  
    },  
  
    entityRemoved(json, ctx) {  
        this.logger.info("Entity removed", json);  
    },      
});  
```
> Please note! If you manipulate multiple entities (updateMany, removeMany), the `json` parameter will be a `Number` instead of entities!

## [](_docs_0.15_moleculer-db.md#Extend-with-custom-actions)Extend with custom actions

Naturally you can extend this service with your custom actions.
```
const DbService = require("moleculer-db");  
  
module.exports = {  
    name: "posts",  
    mixins: \[DbService\],  
  
    settings: {  
        fields: \["\_id", "title", "content", "votes"\]  
    },  
  
    actions: {  
          
        vote(ctx) {  
            return this.adapter.updateById(ctx.params.id, { $inc: { votes: 1 } });  
        },  
  
          
        byAuthors(ctx) {  
            return this.find({  
                query: {  
                    author: ctx.params.authorID  
                },  
                limit: ctx.params.limit || 10,  
                sort: "-createdAt"  
            });  
        }  
    }  
}  
```
## [](_docs_0.15_moleculer-db.md#Mongo-Adapter)Mongo Adapter [![NPM version](https://img.shields.io/npm/v/moleculer-db-adapter-mongo.svg)](https://www.npmjs.com/package/moleculer-db-adapter-mongo)

This adapter is based on [MongoDB](http://mongodb.github.io/node-mongodb-native/).

### [](_docs_0.15_moleculer-db.md#Install-1)Install
```
$ npm install moleculer-db moleculer-db-adapter-mongo --save  
```
> **Dependencies**
> 
> To use this adapter you need to install [MongoDB](https://www.mongodb.com/) on you system.

### [](_docs_0.15_moleculer-db.md#Usage-1)Usage
```
"use strict";  
  
const { ServiceBroker } = require("moleculer");  
const DbService = require("moleculer-db");  
const MongoDBAdapter = require("moleculer-db-adapter-mongo");  
  
const broker = new ServiceBroker();  
  
  
broker.createService({  
    name: "posts",  
    mixins: \[DbService\],  
    adapter: new MongoDBAdapter("mongodb://localhost/moleculer-demo"),  
    collection: "posts"  
});  
  
  
broker.start()  
  
.then(() => broker.call("posts.create", {  
    title: "My first post",  
    content: "Lorem ipsum...",  
    votes: 0  
}))  
  
  
.then(() => broker.call("posts.find").then(console.log));  
```
### [](_docs_0.15_moleculer-db.md#Options)Options

**Example with connection URI**
```
new MongoDBAdapter("mongodb://localhost/moleculer-db")  
```
**Example with connection URI & options**
```
new MongoDBAdapter("mongodb://db-server-hostname/my-db", {  
    keepAlive: 1  
})  
```
> More MongoDB examples can be found on [GitHub](https://github.com/moleculerjs/moleculer-db/tree/master/packages/moleculer-db-adapter-mongo/examples)

## [](_docs_0.15_moleculer-db.md#Mongoose-Adapter)Mongoose Adapter [![NPM version](https://img.shields.io/npm/v/moleculer-db-adapter-mongoose.svg)](https://www.npmjs.com/package/moleculer-db-adapter-mongoose)

This adapter is based on [Mongoose](https://mongoosejs.com/docs/).

### [](_docs_0.15_moleculer-db.md#Install-2)Install
```
$ npm install moleculer-db moleculer-db-adapter-mongoose mongoose --save  
```
> **Dependencies**
> 
> To use this adapter you need to install [MongoDB](https://www.mongodb.com/) on you system.

### [](_docs_0.15_moleculer-db.md#Usage-2)Usage
```
"use strict";  
  
const { ServiceBroker } = require("moleculer");  
const DbService = require("moleculer-db");  
const MongooseAdapter = require("moleculer-db-adapter-mongoose");  
const mongoose = require("mongoose");  
  
const broker = new ServiceBroker();  
  
  
broker.createService({  
    name: "posts",  
    mixins: \[DbService\],  
    adapter: new MongooseAdapter("mongodb://localhost/moleculer-demo"),  
    model: mongoose.model("Post", mongoose.Schema({  
        title: { type: String },  
        content: { type: String },  
        votes: { type: Number, default: 0}  
    }))  
});  
  
  
broker.start()  
  
.then(() => broker.call("posts.create", {  
    title: "My first post",  
    content: "Lorem ipsum...",  
    votes: 0  
}))  
  
  
.then(() => broker.call("posts.find").then(console.log));  
```
### [](_docs_0.15_moleculer-db.md#Options-1)Options

**Example with connection URI**
```
new MongooseAdapter("mongodb://localhost/moleculer-db")  
```
**Example with URI and options**
```
new MongooseAdapter("mongodb://db-server-hostname/my-db", {  
    user: process.env.MONGO\_USERNAME,  
    pass: process.env.MONGO\_PASSWORD  
    keepAlive: true  
})  
```
### [](_docs_0.15_moleculer-db.md#Connect-to-multiple-DBs)Connect to multiple DBs

If your services are running on separate nodes and you wish to connect to multiple databases then you can use `model` in your service definition. On the other hand, if your services are running on a single node and you wish to connect to multiple databases, you should define the `schema` that will make multiple connections for you.

> More Mongoose examples can be found on [GitHub](https://github.com/moleculerjs/moleculer-db/tree/master/packages/moleculer-db-adapter-mongoose/examples)

## [](_docs_0.15_moleculer-db.md#Sequelize-Adapter)Sequelize Adapter [![NPM version](https://img.shields.io/npm/v/moleculer-db-adapter-sequelize.svg)](https://www.npmjs.com/package/moleculer-db-adapter-sequelize)

SQL adapter (Postgres, MySQL, SQLite & MSSQL) for Moleculer DB service with [Sequelize](https://github.com/sequelize/sequelize).

### [](_docs_0.15_moleculer-db.md#Install-3)Install
```
$ npm install moleculer-db-adapter-sequelize --save  
```
You have to install additional packages for your database server:
```
  
$ npm install sqlite3 --save  
  
  
$ npm install mysql2 --save  
  
  
$ npm install pg pg-hstore --save  
  
  
$ npm install tedious --save  
```
### [](_docs_0.15_moleculer-db.md#Usage-3)Usage
```
"use strict";  
  
const { ServiceBroker } = require("moleculer");  
const DbService = require("moleculer-db");  
const SqlAdapter = require("moleculer-db-adapter-sequelize");  
const Sequelize = require("sequelize");  
  
const broker = new ServiceBroker();  
  
  
broker.createService({  
    name: "posts",  
    mixins: \[DbService\],  
    adapter: new SqlAdapter("sqlite://:memory:"),  
    model: {  
        name: "post",  
        define: {  
            title: Sequelize.STRING,  
            content: Sequelize.TEXT,  
            votes: Sequelize.INTEGER,  
            author: Sequelize.INTEGER,  
            status: Sequelize.BOOLEAN  
        },  
        options: {  
              
        }  
    },  
});  
  
  
broker.start()  
  
.then(() => broker.call("posts.create", {  
    title: "My first post",  
    content: "Lorem ipsum...",  
    votes: 0  
}))  
  
  
.then(() => broker.call("posts.find").then(console.log));  
```
### [](_docs_0.15_moleculer-db.md#Options-2)Options

Every constructor arguments are passed to the `Sequelize` constructor. Read more about [Sequelize connection](http://docs.sequelizejs.com/manual/installation/getting-started.html).

**Example with connection URI***Example with connection options**
```
new SqlAdapter('database', 'username', 'password', {  
    host: 'localhost',  
    dialect: 'mysql'|'sqlite'|'postgres'|'mssql',  
  
    pool: {  
        max: 5,  
        min: 0,  
        idle: 10000  
    },  
  
    noSync: true   
  
      
    storage: 'path/to/database.sqlite'  
});  
```
> More Sequelize examples can be found on [GitHub](https://github.com/moleculerjs/moleculer-db/tree/master/packages/moleculer-db-adapter-sequelize/examples)

#### _docs_0.15_moleculer-repl.md

> Source: https://moleculer.services/docs/0.15/moleculer-repl
> Scraped: 4/13/2025, 3:24:04 AM

## [](_docs_0.15_moleculer-repl.md#moleculer-repl)moleculer repl [![npm](https://img.shields.io/npm/v/moleculer-repl.svg?maxAge=3600)](https://www.npmjs.com/package/moleculer-repl)

The [moleculer-repl](https://github.com/moleculerjs/moleculer-repl) is an interactive developer console for Moleculer.

## [](_docs_0.15_moleculer-repl.md#Install)Install
```
npm i moleculer-repl  
```
## [](_docs_0.15_moleculer-repl.md#Usage)Usage

**Switch broker to REPL mode**
```
const broker = new ServiceBroker();  
  
broker.start().then(() => {  
      
    broker.repl();  
});  
```
## [](_docs_0.15_moleculer-repl.md#REPL-Commands)REPL Commands
```
Commands:  
  actions \[options\]                                          List of actions  
  bench \[options\] <action> \[jsonParams\] \[meta\]               Benchmark service action  
  broadcast <eventName>                                      Broadcast an event  
  broadcastLocal <eventName>                                 Broadcast an event locally  
  cache                                                      Manage cache  
  call \[options\] <actionName> \[jsonParams\] \[meta\]            Call an action  
  dcall \[options\] <nodeID> <actionName> \[jsonParams\] \[meta\]  Direct call an action  
  clear \[pattern\]                                            Clear cache entries  
  cls                                                        Clear console  
  destroy <serviceName>                                      Destroy a local service  
  emit <eventName>                                           Emit an event  
  env                                                        List of environment variables  
  events \[options\]                                           List of event listeners  
  info                                                       Information about broker  
  listener                                                   Adds or removes event listeners  
  load <servicePath>                                         Load a service from file  
  loadFolder <serviceFolder> \[fileMask\]                      Load all services from folder  
  metrics \[options\]                                          List metrics  
  nodes \[options\]                                            List of nodes  
  exit|q                                                     Exit application  
  services \[options\]                                         List of services  
  help \[command\]                                             display help for command  
```
### [](_docs_0.15_moleculer-repl.md#List-nodes)List nodes
```
mol $ nodes  
```
**Options**
```
\-a, --all             list all (offline) nodes  
\-d, --details         detailed list  
\-f, --filter <match>  filter nodes (e.g.: 'node-\*')  
\--raw                 print service registry to JSON  
\--save \[filename\]     save service registry to a JSON file  
```
**Output**  
![image](https://moleculer.services/docs/0.15/assets/repl/nodes.png)

**Detailed output**  
![image](https://moleculer.services/docs/0.15/assets/repl/nodes-detailed.png)

### [](_docs_0.15_moleculer-repl.md#List-services)List services
```
mol $ services  
```
**Options**
```
\-a, --all             list all (offline) services  
\-d, --details         print endpoints  
\-f, --filter <match>  filter services (e.g.: 'user\*')  
\-i, --skipinternal    skip internal services  
\-l, --local           only local services  
```
**Output**  
![image](https://moleculer.services/docs/0.15/assets/repl/services.png)

**Detailed output**  
![image](https://moleculer.services/docs/0.15/assets/repl/services-detailed.png)

### [](_docs_0.15_moleculer-repl.md#List-actions)List actions
```
mol $ actions  
```
**Options**
```
\-a, --all             list all (offline) actions  
\-d, --details         print endpoints  
\-f, --filter <match>  filter actions (e.g.: 'users.\*')  
\-i, --skipinternal    skip internal actions  
\-l, --local           only local actions  
```
**Output**  
![image](https://moleculer.services/docs/0.15/assets/repl/actions.png)

**Detailed output**  
![image](https://moleculer.services/docs/0.15/assets/repl/actions-detailed.png)

### [](_docs_0.15_moleculer-repl.md#List-events)List events
```
mol $ events  
```
**Options**
```
\-a, --all             list all (offline) event listeners  
\-d, --details         print endpoints  
\-f, --filter <match>  filter event listeners (e.g.: 'user.\*')  
\-i, --skipinternal    skip internal event listeners  
\-l, --local           only local event listeners  
```
**Output**  
![image](https://moleculer.services/docs/0.15/assets/repl/events.png)

**Detailed output**  
![image](https://moleculer.services/docs/0.15/assets/repl/events-detailed.png)

### [](_docs_0.15_moleculer-repl.md#Show-common-information)Show common information
```
mol $ info  
```
**Output**  
![image](https://cloud.githubusercontent.com/assets/306521/26260974/aaea9b02-3ccf-11e7-9e1c-ec9150518791.png)

### [](_docs_0.15_moleculer-repl.md#List-environment-variables)List environment variables
```
mol $ env  
```
### [](_docs_0.15_moleculer-repl.md#Call-an-action)Call an action
```
mol $ call "test.hello"  
```
**Output**  
![image](https://moleculer.services/docs/0.15/assets/repl/call1.png)

**Options**
```
\--help               output usage information  
\--load \[filename\]    Load params from file  
\--stream \[filename\]  Send a file as stream  
\--save \[filename\]    Save response to file  
```
#### [](_docs_0.15_moleculer-repl.md#Call-an-action-with-parameters)Call an action with parameters
```
mol $ call "math.add" --a 5 --b Bob --c --no\-d --e.f "hello"  
```
Params will be `{ a: 5, b: 'Bob', c: true, d: false, e: { f: 'hello' } }`

#### [](_docs_0.15_moleculer-repl.md#Call-an-action-with-params-meta-amp-options)Call an action with params, meta & options
```
mol $ call "math.add" --a 5 --  
```
Params will be `{ a: 5 }`, meta will be `{ b: 'Bob' }` and options will be `{ timeout: 1 }`.

#### [](_docs_0.15_moleculer-repl.md#Call-with-JSON-string-parameter)Call with JSON string parameter
```
mol $ call "math.add" '{"a": 5, "b": "Bob", "c": true, "d": false, "e": { "f": "hello" } }'  
```
Params will be `{ a: 5, b: 'Bob', c: true, d: false, e: { f: 'hello' } }`

#### [](_docs_0.15_moleculer-repl.md#Call-with-parameters-from-file)Call with parameters from file
```
mol $ call "math.add" --load  
```
It tries to load the `<current_dir>/math.add.params.json` file to params.
```
mol $ call "math.add" --load my-params.json  
```
It tries to load the `my-params.jon` file to params.

#### [](_docs_0.15_moleculer-repl.md#Call-with-file-stream)Call with file stream
```
mol $ call "math.add" --stream my-picture.jpg  
```
It loads the `my-picture.png` file and send to the `math.add` action as a `Stream`.

#### [](_docs_0.15_moleculer-repl.md#Call-and-save-response-to-file)Call and save response to file
```
mol $ call "math.add" --save  
```
It saved the response to the `<current_dir>/posts.find.response.json` file. The extension is `.json` when the response is `object`. Otherwise it is `.txt`.
```
mol $ call "math.add" --save my-response.json  
```
It saved the response to the `my-response.json` file.

### [](_docs_0.15_moleculer-repl.md#Direct-call)Direct call

Get health info from `node-12` node
```
mol $ dcall "node-12" "$node.health"  
```
> Parameter passing is similar to `call` command.

### [](_docs_0.15_moleculer-repl.md#Emit-an-event)Emit an event
```
mol $ emit "user.created"  
```
#### [](_docs_0.15_moleculer-repl.md#Emit-an-event-with-parameters)Emit an event with parameters
```
mol $ emit "user.created" --a 5 --b Bob --c --no\-d --e.f "hello"  
```
Params will be `{ a: 5, b: 'Bob', c: true, d: false, e: { f: 'hello' } }`

#### [](_docs_0.15_moleculer-repl.md#Emit-an-event-with-params-amp-meta)Emit an event with params & meta
```
mol $ emit "user.created" --a 5 --  
```
Params will be `{ a: 5 }`, meta will be `{ b: 'Bob' }` and options will be `{ groups: acb }`.

### [](_docs_0.15_moleculer-repl.md#Benchmark-services)Benchmark services

Moleculer REPL module has a new bench command to measure your services.
```
  
mol $ bench math.add  
  
  
mol $ bench --num 5000 math.add  
  
  
mol $ bench --time 30 math.add  
```
**Options**
```
\--num <number>     Number of iterates  
\--time <seconds>   Time of bench  
\--nodeID <nodeID>  NodeID (direct call)  
```
**Output**  
![image](https://moleculer.services/docs/0.15/assets/repl/bench.gif)

#### [](_docs_0.15_moleculer-repl.md#Parameters)Parameters

Please note, parameters can be passed only as JSON string.
```
mol $ bench math.add '{ "a": 50, "b": 32 }'  
```
### [](_docs_0.15_moleculer-repl.md#Load-a-service-from-file)Load a service from file
```
mol $ load "./math.service.js"  
```
### [](_docs_0.15_moleculer-repl.md#Load-all-services-from-a-folder)Load all services from a folder
```
mol $ load "./services"  
```
### [](_docs_0.15_moleculer-repl.md#List-metrics)List metrics
```
mol $ metrics  
```
**Options**
```
\-f, --filter <match>  filter metrics (e.g.: 'moleculer.\*\*')  
```
**Output**  
![image](https://moleculer.services/docs/0.15/assets/repl/metrics.png#zoomable)

### [](_docs_0.15_moleculer-repl.md#Cache-Keys)Cache Keys

You can list keys of cache entries with
```
mol $ cache keys  
```
**Options**
```
\-f, --filter <match>  filter keys  
```
### [](_docs_0.15_moleculer-repl.md#Cache-Clear)Cache Clear

You clear the cache with:
```
mol $ cache clear  
```
that by default removes all the entries. If you want to remove a subset of entries, you must add a `pattern`:

**Clear with pattern**
```
mol $ cache clear greeter.\*  
```
### [](_docs_0.15_moleculer-repl.md#Event-listener)Event listener

REPL can subscribe and listen to events. To subscribe use:
```
mol $ listener add user.created  
```
**Subscribe with group option**
```
mol $ listener add user.created --group abcd  
```
To unsubscribe use:
```
mol $ listener remove user.created  
```
To list all events that REPL is listening to use
```
mol $ listener list  
```
### [](_docs_0.15_moleculer-repl.md#Custom-commands)Custom commands

Custom REPL commands can be defined in broker options to extend Moleculer REPL commands.
```
  
module.exports = {  
  replOptions: {  
    delimiter: "mol # ",  

    customCommands: \[  
      {  
        command: "hello <name>",  
        description: "Call the greeter.hello service with name",  
        alias: "hi",  
        options: \[  
          { option: "-u, --uppercase", description: "Uppercase the name" },  
        \],  
        types: {  
          string: \["name"\],  
          boolean: \["u", "uppercase"\],  
        },  
          
          
          
        allowUnknownOptions: true,  
        action(broker, args ) {  
          const name = args.options.uppercase  
            ? args.name.toUpperCase()  
            : args.name;  
          return broker.call("greeter.hello", { name }).then(console.log);  
        },  
      },  
    \],  
  },  
};  
```
```
mol $ hello -u John  
Hello JOHN  
```

#### _docs_0.15_moleculer-web.md

> Source: https://moleculer.services/docs/0.15/moleculer-web
> Scraped: 4/13/2025, 3:24:01 AM

## [](_docs_0.15_moleculer-web.html.md#moleculer-web)moleculer-web [![npm](https://img.shields.io/npm/v/moleculer-web.svg?maxAge=3600)](https://www.npmjs.com/package/moleculer-web)

The [moleculer-web](https://github.com/moleculerjs/moleculer-web) is the official API gateway service for Moleculer framework. Use it to publish your services as RESTful APIs.

## [](_docs_0.15_moleculer-web.html.md#Features)Features

*   support HTTP & HTTPS
*   serve static files
*   multiple routes
*   support Connect-like middlewares in global-level, route-level and alias-level.
*   alias names (with named parameters & REST routes)
*   whitelist
*   multiple body parsers (json, urlencoded)
*   CORS headers
*   Rate limiter
*   before & after call hooks
*   Buffer & Stream handling
*   middleware mode (use as a middleware with Express)

> **Try it in your browser!**
> 
> [![Edit moleculer-web](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/moleculerjs/sandbox-moleculer-api-routing/tree/master/?fontsize=14)

## [](_docs_0.15_moleculer-web.html.md#Install)Install
```
npm i moleculer-web  
```
## [](_docs_0.15_moleculer-web.html.md#Usage)Usage

### [](_docs_0.15_moleculer-web.html.md#Run-with-default-settings)Run with default settings

This example uses API Gateway service with default settings.  
You can access all services (including internal `$node.`) via `http://localhost:3000/`
```
const { ServiceBroker } = require("moleculer");  
const ApiService = require("moleculer-web");  
  
const broker = new ServiceBroker();  
  
  
broker.createService(ApiService);  
  
  
broker.start();  
```
**Example URLs:**   Call `test.hello` action: `http://localhost:3000/test/hello`
    
*   Call `math.add` action with params: `http://localhost:3000/math/add?a=25&b=13`
    
*   Get health info of node: `http://localhost:3000/~node/health`
    
*   List all actions: `http://localhost:3000/~node/actions`
    

## [](_docs_0.15_moleculer-web.html.md#Whitelist)Whitelist

If you don’t want to publish all actions, you can filter them with whitelist option.  
Use match strings or regexp in list. _To enable all actions, use `"**"` item._
```
broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        routes: \[{  
            path: "/api",  
  
            whitelist: \[  
                  
                "posts.\*",  
                  
                "users.list",  
                  
                /^math\\.\\w+$/  
            \]  
        }\]  
    }  
});  
```
## [](_docs_0.15_moleculer-web.html.md#Aliases)Aliases

You can use alias names instead of action names. You can also specify the method. Otherwise it will handle every method types.

Using named parameters in aliases is possible. Named parameters are defined by prefixing a colon to the parameter name (`:name`).
```
broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        routes: \[{  
            aliases: {  
                  
                "login": "auth.login",  
  
                  
                "POST users": "users.create",  
  
                  
                  
                "GET greeter/:name": "test.greeter",  
            }  
        }\]  
    }  
});  
```
> The named parameter is handled with [path-to-regexp](https://github.com/pillarjs/path-to-regexp) module. Therefore you can use [optional](https://github.com/pillarjs/path-to-regexp#optional) and [repeated](https://github.com/pillarjs/path-to-regexp#zero-or-more) parameters, as well.

> **Aliases Action**
> 
> The API gateway implements `listAliases` [action](_docs_0.15_actions.md) that lists the HTTP endpoints to actions mappings.

You can also create RESTful APIs.
```
broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        routes: \[{  
            aliases: {  
                "GET users": "users.list",  
                "GET users/:id": "users.get",  
                "POST users": "users.create",  
                "PUT users/:id": "users.update",  
                "DELETE users/:id": "users.remove"  
            }  
        }\]  
    }  
});  
```
For REST routes you can also use this simple shorthand alias:
```
broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        routes: \[{  
            aliases: {  
                "REST users": "users"  
            }  
        }\]  
    }  
});  
```
> To use this shorthand alias, create a service which has `list`, `get`, `create`, `update` and `remove` actions.

You can make use of custom functions within the declaration of aliases. In this case, the handler’s signature is `function (req, res) {...}`.

> Please note that Moleculer uses native Node.js [HTTP server](https://nodejs.org/api/http.html)
```
broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        routes: \[{  
            aliases: {  
                "POST upload"(req, res) {  
                    this.parseUploadedFile(req, res);  
                },  
                "GET custom"(req, res) {  
                    res.end('hello from custom handler')  
                }  
            }  
        }\]  
    }  
});  
```
> There are some internal pointer in `req` & `res` objects:
> 
> *   `req.$ctx` are pointed to request context.
> *   `req.$service` & `res.$service` are pointed to this service instance.
> *   `req.$route` & `res.$route` are pointed to the resolved route definition.
> *   `req.$params` is pointed to the resolved parameters (from query string & post body)
> *   `req.$alias` is pointed to the resolved alias definition.
> *   `req.$action` is pointed to the resolved action.
> *   `req.$endpoint` is pointed to the resolved action endpoint.
> *   `req.$next` is pointed to the `next()` handler if the request comes from ExpressJS.
> 
> E.g.: To access the broker, use `req.$service.broker`.

### [](_docs_0.15_moleculer-web.html.md#Mapping-policy)Mapping policy

The `route` has a `mappingPolicy` property to handle routes without aliases.

**Available options:**   `all` - enable to request all routes with or without aliases (default)
*   `restrict` - enable to request only the routes with aliases.
```
broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        routes: \[{  
            mappingPolicy: "restrict",  
            aliases: {  
                "POST add": "math.add"  
            }  
        }\]  
    }  
});  
```
You can’t request the `/math.add` or `/math/add` URLs, only `POST /add`.

### [](_docs_0.15_moleculer-web.html.md#File-upload-aliases)File upload aliases

API Gateway has implemented file uploads. You can upload files as a multipart form data (thanks to [busboy](https://github.com/mscdex/busboy) library) or as a raw request body. In both cases, the file is transferred to an action as a `Stream`. In multipart form data mode you can upload multiple files, as well.

**Example**
```
const ApiGateway = require("moleculer-web");  
  
module.exports = {  
    mixins: \[ApiGateway\],  
    settings: {  
        path: "/upload",  
  
        routes: \[  
            {  
                path: "",  
  
                aliases: {  
                      
                    "POST /": "multipart:file.save",  
                      
                      
                    "PUT /:id": "stream:file.save",  
  
                      
                    "POST /multi": {  
                        type: "multipart",  
                          
                        busboyConfig: {  
                            limits: { files: 3 }  
                        },  
                        action: "file.save"  
                    }  
                },  
  
                  
                  
                busboyConfig: {  
                    limits: { files: 1 }  
                      
                      
                },  
  
                mappingPolicy: "restrict"  
            }  
        \]  
    }  
});  
```
**Multipart parameters**

In order to access the files passed by multipart-form these specific fields can be used inside the action:

*   `ctx.params` is the Readable stream containing the file passed to the endpoint
*   `ctx.meta.$params` parameters from URL querystring
*   `ctx.meta.$multipart` contains the additional text form-data fields _must be sent before other files fields_.

### [](_docs_0.15_moleculer-web.html.md#Auto-alias)Auto-alias

The auto-alias feature allows you to declare your route alias directly in your services. The gateway will dynamically build the full routes from service schema.

> Gateway will regenerate the routes every time a service joins or leaves the network.

Use `whitelist` parameter to specify services that the Gateway should track and build the routes.

**Example**
```
  
module.exports = {  
    mixins: \[ApiGateway\],  
  
    settings: {  
        routes: \[  
            {  
                path: "/api",  
  
                whitelist: \[  
                    "v2.posts.\*",  
                    "test.\*"  
                \],  
  
                aliases: {  
                    "GET /hi": "test.hello"  
                },  
  
                autoAliases: true  
            }  
        \]  
    }  
};  
```
```
  
module.exports = {  
    name: "posts",  
    version: 2,  
  
    settings: {  
          
          
          
          
    },  
  
    actions: {  
        list: {  
              
            rest: "GET /",  
            handler(ctx) {}  
        },  
  
        get: {  
              
            rest: "GET /:id",  
            handler(ctx) {}  
        },  
  
        create: {  
            rest: "POST /",  
            handler(ctx) {}  
        },  
  
        update: {  
            rest: "PUT /:id",  
            handler(ctx) {}  
        },  
  
        remove: {  
            rest: "DELETE /:id",  
            handler(ctx) {}  
        }  
    }  
};  
```
**The generated aliases**
```
GET     /api/hi             => test.hello  
GET     /api/v2/posts       => v2.posts.list  
GET     /api/v2/posts/:id   => v2.posts.get  
POST    /api/v2/posts       => v2.posts.create  
PUT     /api/v2/posts/:id   => v2.posts.update  
DELETE  /api/v2/posts/:id   => v2.posts.remove  
```
**Service level rest parameters**   **fullPath**, override all the path generated with a new custom one
*   **basePath**, path to the service, by default is the one declared in `settings.rest`
*   **path**, path to the action
*   **method**, method used to access the action

path is appended after the basePath  
The combination path+basePath it’s not the same as using fullPath. For example:
```
  
module.exports = {  
    name: "posts",  
    version: 2,  
  
    settings: {  
          
        rest: "posts/"  
    },  
  
    actions: {  
        tags: {  
              
            rest: \[{  
                method: "GET",  
                fullPath: "/tags"  
            }, {  
                method: "GET",  
                basePath: "/my/awesome"  
            }\],  
            handler(ctx) {}  
        }  
    }  
};  
```
Will create those endpoints:
```
GET     /tags  
GET     /api/my/awesome/tags  
```
fullPath ignores that prefix applied in the API gateway!

The _rest_ param can be also be an array with elements with same structure discussed before. The can be applied both on settings and action level.  
For example:
```
  
module.exports = {  
  name: "posts",  
  settings: {  
    rest: 'my/awesome/posts'  
  },  
  actions: {  
    get: {  
      rest: \[  
        "GET /:id",  
        { method: 'GET', fullPath: '/posts' }  
        { method: 'GET', path: '/' },   
        { method: 'GET', path: '/:id', basePath: 'demo\_posts' }  
    \],  
      handler(ctx) {}  
    },  
  }  
};  
```
Produce those endpoints
```
GET     /api/my/awesome/posts/:id/  => posts.get  
GET     /posts                      => posts.get  
GET     /api/my/awesome/posts/      => posts.get  
POST    /api/demo\_posts/:id         => posts.get  
```
## [](_docs_0.15_moleculer-web.html.md#Parameters)Parameters

API gateway collects parameters from URL querystring, request params & request body and merges them. The results is placed to the `req.$params`.

### [](_docs_0.15_moleculer-web.html.md#Disable-merging)Disable merging

To disable parameter merging set `mergeParams: false` in route settings. In this case the parameters is separated.

**Example**
```
broker.createService({  
    mixins: \[ApiService\],  
    settings: {  
        routes: \[{  
            path: "/",  
            mergeParams: false  
        }\]  
    }  
});  
```
**Un-merged `req.$params`:**
```
{  
      
    query: {  
        category: "general",  
    }  
  
      
    body: {  
        title: "Hello",  
        content: "...",  
        createdAt: 1530796920203  
    },  
  
      
    params: {  
        id: 5  
    }  
}  
```
### [](_docs_0.15_moleculer-web.html.md#Query-string-parameters)Query string parameters

More information: [https://github.com/ljharb/qs](https://github.com/ljharb/qs)

**Array parameters**  
URL: `GET /api/opt-test?a=1&a=2`
```
a: \["1", "2"\]  
```
**Nested objects & arrays**  
URL: `GET /api/opt-test?foo[bar]=a&foo[bar]=b&foo[baz]=c`
```
foo: {   
    bar: \["a", "b"\],   
    baz: "c"   
}  
```
## [](_docs_0.15_moleculer-web.html.md#Middlewares)Middlewares

It supports Connect-like middlewares in global-level, route-level & alias-level. Signature: `function(req, res, next) {...}`. For more info check [express middleware](https://expressjs.com/en/guide/using-middleware.html)

**Examples**
```
broker.createService({  
    mixins: \[ApiService\],  
    settings: {  
          
        use: \[  
            cookieParser(),  
            helmet()  
        \],  
  
        routes: \[  
            {  
                path: "/",  
  
                  
                use: \[  
                    compression(),  
                      
                    passport.initialize(),  
                    passport.session(),  
  
                    serveStatic(path.join(\_\_dirname, "public"))  
                \],  
                  
                aliases: {  
                    "GET /secret": \[  
                          
                        auth.isAuthenticated(),  
                        auth.hasRole("admin"),  
                        "top.secret"   
                    \]  
                }  
            }  
        \]  
    }  
});  
```
Use [swagger-stats UI](https://swaggerstats.io/) for quick look on the “health” of your API (TypeScript)
```
import { Service, ServiceSchema } from "moleculer";  
import ApiGatewayService from "moleculer-web";  
const swStats = require("swagger-stats");  
  
const swMiddleware = swStats.getMiddleware();  
  
broker.createService({  
    mixins: \[ApiGatewayService\],  
    name: "gw-main",  
  
    settings: {  
        cors: {  
            methods: \["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"\],  
            origin: "\*",  
        },  
  
        routes: \[  
              
        \],  
  
        use: \[swMiddleware\],  
    },  
  
    async started(this: Service): Promise<void\> {  
        this.addRoute({  
            path: "/",  
            use: \[swMiddleware\],  
        });  
    },  
} as ServiceSchema);  
```
### [](_docs_0.15_moleculer-web.html.md#Error-handler-middleware)Error-handler middleware

There is support to use error-handler middlewares in the API Gateway. So if you pass an `Error` to the `next(err)` function, it will call error handler middlewares which have signature as `(err, req, res, next)`.
```
broker.createService({  
    mixins: \[ApiService\],  
    settings: {  
          
        use: \[  
            cookieParser(),  
            helmet()  
        \],  
  
        routes: \[  
            {  
                path: "/",  
  
                  
                use: \[  
                    compression(),  
                      
                    passport.initialize(),  
                    passport.session(),  
  
                    function(err, req, res, next) {  
                        this.logger.error("Error is occured in middlewares!");  
                        this.sendError(req, res, err);  
                    }  
                \],  
```
## [](_docs_0.15_moleculer-web.html.md#Serve-static-files)Serve static files

It serves assets with the [serve-static](https://github.com/expressjs/serve-static) module like ExpressJS.
```
broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        assets: {  
              
            folder: "./assets",  
  
              
            options: {}  
        }		  
    }  
});  
```
## [](_docs_0.15_moleculer-web.html.md#Calling-options)Calling options

The `route` has a `callOptions` property which is passed to `broker.call`. So you can set `timeout`, `retries` or `fallbackResponse` options for routes. [Read more about calling options](_docs_0.15_actions.md#Call-services)

> Please note that you can also set the timeout for an action directly in its [definition](_docs_0.15_actions.md#Timeout)
```
broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        routes: \[{  
  
            callOptions: {  
                timeout: 500,  
                retries: 3,  
                fallbackResponse(ctx, err) { ... }  
            }  
  
        }\]  
    }  
});  
```
## [](_docs_0.15_moleculer-web.html.md#Multiple-routes)Multiple routes

You can create multiple routes with different prefix, whitelist, alias, calling options & authorization.

> When using multiple routes you should explicitly set the body parser(s) for each route.
```
broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        routes: \[  
            {  
                path: "/admin",  
  
                authorization: true,  
  
                whitelist: \[  
                    "$node.\*",  
                    "users.\*",  
                \],  
  
                bodyParsers: {  
                    json: true  
                }  
            },  
            {  
                path: "/",  
  
                whitelist: \[  
                    "posts.\*",  
                    "math.\*",  
                \],  
  
                bodyParsers: {  
                    json: true  
                }  
            }  
        \]  
    }  
});  
```
## [](_docs_0.15_moleculer-web.html.md#Response-type-amp-status-code)Response type & status code

When the response is received from an action handler, the API gateway detects the type of response and set the `Content-Type` in the `res` headers. The status code is `200` by default. Of course you can overwrite these values, moreover, you can define custom response headers, too.

To define response headers & status code use `ctx.meta` fields:

**Available meta fields:**   `ctx.meta.$statusCode` - set `res.statusCode`.
*   `ctx.meta.$statusMessage` - set `res.statusMessage`.
*   `ctx.meta.$responseType` - set `Content-Type` in header.
*   `ctx.meta.$responseHeaders` - set all keys in header.
*   `ctx.meta.$location` - set `Location` key in header for redirects.

**Example**
```
module.exports = {  
    name: "export",  
    actions: {  
          
        downloadCSV(ctx) {  
            ctx.meta.$responseType = "text/csv";  
            ctx.meta.$responseHeaders = {  
                "Content-Disposition": \`attachment; filename="data-${ctx.params.id}.csv"\`  
            };  
              
            return csvFileStream;  
        },  
  
          
        redirectSample(ctx) {  
            ctx.meta.$statusCode = 302;  
            ctx.meta.$location = "/login";  
  
            return;  
        }  
    }  
}  
```
You can implement authorization. Do 2 things to enable it.

1.  Set `authorization: true` in your routes
2.  Define the `authorize` method in service.

**Example authorization**
```
const E = require("moleculer-web").Errors;  
  
broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        routes: \[{  
              
            authorization: true  
        }\]  
    },  
  
    methods: {  
          
        authorize(ctx, route, req, res) {  
              
            let auth = req.headers\["authorization"\];  
            if (auth && auth.startsWith("Bearer")) {  
                let token = auth.slice(7);  
  
                  
                if (token == "123456") {  
                      
                    ctx.meta.user = { id: 1, name: "John Doe" };  
                    return Promise.resolve(ctx);  
  
                } else {  
                      
                    return Promise.reject(new E.UnAuthorizedError(E.ERR\_INVALID\_TOKEN));  
                }  
  
            } else {  
                  
                return Promise.reject(new E.UnAuthorizedError(E.ERR\_NO\_TOKEN));  
            }  
        }  
  
    }  
}  
```
> You can find a more detailed role-based JWT authorization example in [full example](https://github.com/moleculerjs/moleculer-web/blob/master/examples/full/index.js#L239).

## [](_docs_0.15_moleculer-web.html.md#Authentication)Authentication

To enable the support for authentication, you need to do something similar to what is describe in the Authorization paragraph. Also in this case you have to:

1.  Set `authentication: true` in your routes
2.  Define your custom `authenticate` method in your service

The returned value will be set to the `ctx.meta.user` property. You can use it in your actions to get the logged in user entity.

**Example authentication**
```
broker.createService({  
    mixins: ApiGatewayService,  
  
    settings: {  
        routes: \[{  
              
            authentication: true  
        }\]  
    },  
  
    methods: {  
        authenticate(ctx, route, req, res) {  
            let accessToken = req.query\["access\_token"\];  
            if (accessToken) {  
                if (accessToken === "12345") {  
                      
                    return Promise.resolve({ id: 1, username: "john.doe", name: "John Doe" });  
                } else {  
                      
                    return Promise.reject();  
                }  
            } else {  
                  
                return Promise.resolve(null);  
            }  
        }  
    }  
});  
```
## [](_docs_0.15_moleculer-web.html.md#Route-hooks)Route hooks

The `route` has before & after call hooks. You can use it to set `ctx.meta`, access `req.headers` or modify the response `data`.
```
broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        routes: \[  
            {  
                path: "/",  
  
                onBeforeCall(ctx, route, req, res) {  
                      
                    ctx.meta.userAgent = req.headers\["user-agent"\];  
                },  
  
                onAfterCall(ctx, route, req, res, data) {  
                      
                    return doSomething(ctx, res, data);  
                }  
            }  
        \]  
    }  
});  
```
> In previous versions of Moleculer Web, you couldn’t manipulate the `data` in `onAfterCall`. Now you can, but you must always return the new or original `data`.

## [](_docs_0.15_moleculer-web.html.md#Error-handlers)Error handlers

You can add route-level & global-level custom error handlers.

> In handlers, you must call the `res.end`. Otherwise, the request is unhandled.
```
broker.createService({  
    mixins: \[ApiService\],  
    settings: {  
  
        routes: \[{  
            path: "/api",  
  
              
            onError(req, res, err) {  
                res.setHeader("Content-Type", "application/json; charset=utf-8");  
                res.writeHead(500);  
                res.end(JSON.stringify(err));  
            }  
        }\],  
  
          
        onError(req, res, err) {  
            res.setHeader("Content-Type", "text/plain");  
            res.writeHead(501);  
            res.end("Global error: " + err.message);  
        }		  
    }  
}  
```
### [](_docs_0.15_moleculer-web.html.md#Error-formatter)Error formatter

API gateway implements a helper function that formats the error. You can use it to filter out the unnecessary data.
```
broker.createService({  
    mixins: \[ApiService\],  
    methods: {  
        reformatError(err) {  
              
            return \_.pick(err, \["name", "message", "code", "type", "data"\]);  
        },  
    }  
}  
```
## [](_docs_0.15_moleculer-web.html.md#CORS-headers)CORS headers

You can use [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) headers in Moleculer-Web service.

**Usage**
```
const svc = broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
  
          
        cors: {  
              
            origin: "\*",  
              
            methods: \["GET", "OPTIONS", "POST", "PUT", "DELETE"\],  
              
            allowedHeaders: \[\],  
              
            exposedHeaders: \[\],  
              
            credentials: false,  
              
            maxAge: 3600  
        },  
  
        routes: \[{  
            path: "/api",  
  
              
            cors: {  
                origin: \["http://localhost:3000", "https://localhost:4000"\],  
                methods: \["GET", "OPTIONS", "POST"\],  
                credentials: true  
            },  
        }\]  
    }  
});  
```
## [](_docs_0.15_moleculer-web.html.md#Rate-limiter)Rate limiter

The Moleculer-Web has a built-in rate limiter with a memory store.

**Usage**
```
const svc = broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        rateLimit: {  
              
              
            window: 60 \* 1000,  
  
              
            limit: 30,  
              
              
            headers: true,  
  
              
            key: (req) => {  
                return req.headers\["x-forwarded-for"\] ||  
                    req.connection.remoteAddress ||  
                    req.socket.remoteAddress ||  
                    req.connection.socket.remoteAddress;  
            },  
              
        }  
    }  
});  
```
### [](_docs_0.15_moleculer-web.html.md#Custom-Store-example)Custom Store example
```
class CustomStore {  
    constructor(clearPeriod, opts) {  
        this.hits = new Map();  
        this.resetTime = Date.now() + clearPeriod;  
  
        setInterval(() => {  
            this.resetTime = Date.now() + clearPeriod;  
            this.reset();  
        }, clearPeriod);  
    }  
  
      
  
  
  
  
  
    inc(key) {  
        let counter = this.hits.get(key) || 0;  
        counter++;  
        this.hits.set(key, counter);  
        return counter;  
    }  
  
      
  
  
    reset() {  
        this.hits.clear();  
    }  
}  
```
## [](_docs_0.15_moleculer-web.html.md#ETag)ETag

The `etag` option value can be `false`, `true`, `weak`, `strong`, or a custom `Function`. For full details check the [code](https://github.com/moleculerjs/moleculer-web/pull/92).
```
const ApiGateway = require("moleculer-web");  
  
module.exports = {  
    mixins: \[ApiGateway\],  
    settings: {  
          
        etag: false,  
        routes: \[  
            {  
                path: "/",  
                  
                etag: true  
            }  
        \]  
    }  
}  
```
**Custom `etag` Function**
```
module.exports = {  
    mixins: \[ApiGateway\],  
    settings: {  
          
        etag: (body) => generateHash(body)  
    }  
}  
```
Please note, it doesn’t work with stream responses. In this case, you should generate the `etag` by yourself.

**Custom `etag` for streaming**
```
module.exports = {  
    name: "export",  
    actions: {  
          
        downloadCSV(ctx) {  
            ctx.meta.$responseType = "text/csv";  
            ctx.meta.$responseHeaders = {  
                "Content-Disposition": \`attachment; filename="data-${ctx.params.id}.csv"\`,  
                "ETag": '<your etag here>'  
            };  
            return csvFileStream;  
        }  
    }  
}  
```
## [](_docs_0.15_moleculer-web.html.md#HTTP2-Server)HTTP2 Server

API Gateway provides an experimental support for HTTP2. You can turn it on with `http2: true` in service settings.  
**Example**
```
const ApiGateway = require("moleculer-web");  
  
module.exports = {  
    mixins: \[ApiGateway\],  
    settings: {  
        port: 8443,  
  
          
        https: {  
            key: fs.readFileSync("key.pem"),  
            cert: fs.readFileSync("cert.pem")  
        },  
  
          
        http2: true  
    }  
});  
```
## [](_docs_0.15_moleculer-web.html.md#ExpressJS-middleware-usage)ExpressJS middleware usage

You can use Moleculer-Web as a middleware in an [ExpressJS](http://expressjs.com/) application.

**Usage**
```
const svc = broker.createService({  
    mixins: \[ApiService\],  
  
    settings: {  
        server: false   
    }  
});  
  
  
const app = express();  
  
  
app.use("/api", svc.express());  
  
  
app.listen(3000);  
  
  
broker.start();  
```
## [](_docs_0.15_moleculer-web.html.md#Full-service-settings)Full service settings

List of all settings of Moleculer Web service:
```
settings: {  
  
      
    port: 3000,  
  
      
    ip: "0.0.0.0",  
  
      
    https: {  
        key: fs.readFileSync("ssl/key.pem"),  
        cert: fs.readFileSync("ssl/cert.pem")  
    },  
  
      
	  
	server: true,  
    		  
      
    path: "/api",  
      
      
    use: \[  
        compression(),  
        cookieParser()  
    \],  
      
      
    logRequestParams: "info",  
      
      
    logResponseData: "debug",  
  
      
    http2: false,  
  
      
	httpServerTimeout: null,  
  
      
    optimizeOrder: true,  
  
      
    qsOptions: {},  
  
      
    routes: \[  
        {  
              
            path: "/admin",  
  
              
            whitelist: \[  
                "users.get",  
                "$node.\*"  
            \],  
  
              
            authorization: true,  
  
              
            mergeParams: true,  
              
              
            use: \[  
                helmet(),  
                passport.initialize()  
            \],  
  
              
            aliases: {  
                "POST users": "users.create",  
                "health": "$node.health"  
            },  
  
            mappingPolicy: "all",  
  
              
            bodyParsers: {  
                json: true,  
                urlencoded: { extended: true }  
            }  
        },  
        {  
              
            path: "",  
  
              
            whitelist: \[  
                "posts.\*",  
                "file.\*",  
                /^math\\.\\w+$/  
            \],  
  
              
            authorization: false,  
              
              
            aliases: {  
                "add": "math.add",  
                "GET sub": "math.sub",  
                "POST divide": "math.div",  
                "GET greeter/:name": "test.greeter",  
                "GET /": "test.hello",  
                "POST upload"(req, res) {  
                    this.parseUploadedFile(req, res);  
                }  
            },  
  
            mappingPolicy: "restrict",  
              
              
            bodyParsers: {  
                json: false,  
                urlencoded: { extended: true }  
            },  
  
              
            callOptions: {  
                timeout: 3000,  
                retries: 3,  
                fallbackResponse: "Static fallback response"  
            },  
  
              
            onBeforeCall(ctx, route, req, res) {  
                ctx.meta.userAgent = req.headers\["user-agent"\];  
            },  
  
              
            onAfterCall(ctx, route, req, res, data) {  
                res.setHeader("X-Custom-Header", "123456");  
                return data;  
            },  
              
              
            onError(req, res, err) {  
                res.setHeader("Content-Type", "text/plain");  
                res.writeHead(err.code || 500);  
                res.end("Route error: " + err.message);  
            }  
        }  
    \],  
  
      
    assets: {  
          
        folder: "./examples/www/assets",  
          
          
        options: {}  
    },  
  
      
    onError(req, res, err) {  
        res.setHeader("Content-Type", "text/plain");  
        res.writeHead(err.code || 500);  
        res.end("Global error: " + err.message);  
    }      
}  
```
## [](_docs_0.15_moleculer-web.html.md#Service-Methods)Service Methods

### [](_docs_0.15_moleculer-web.html.md#addRoute)`addRoute`

This service [method](_docs_0.15_services.md#Methods) (`this.addRoute(opts, toBottom = true)`) add/replace a route. For example, you can call it from your mixins to define new routes (e.g. swagger route, graphql route, etc.).

> Please note that if a route already exists this method will replace previous route configuration with a new one.

### [](_docs_0.15_moleculer-web.html.md#removeRoute)`removeRoute`

Service method removes the route by path (`this.removeRoute("/admin")`).

## [](_docs_0.15_moleculer-web.html.md#Examples)Examples

* [Simple](https://github.com/moleculerjs/moleculer-web/blob/master/examples/simple/index.js)
    
    *   simple gateway with default settings.
* [SSL server](https://github.com/moleculerjs/moleculer-web/blob/master/examples/ssl/index.js)
    
    *   open HTTPS server
    *   whitelist handling
* [WWW with assets](https://github.com/moleculerjs/moleculer-web/blob/master/examples/www/index.js)
    
    *   serve static files from the `assets` folder
    *   whitelist
    *   aliases
    *   multiple body-parsers
* [Authorization](https://github.com/moleculerjs/moleculer-web/blob/master/examples/authorization/index.js)
    
    *   simple authorization demo
    *   set the authorized user to `Context.meta`
* [REST](https://github.com/moleculerjs/moleculer-web/blob/master/examples/rest/index.js)
    
    *   simple server with RESTful aliases
    *   example `posts` service with CRUD actions
* [Express](https://github.com/moleculerjs/moleculer-web/blob/master/examples/express/index.js)
    
    *   webserver with Express
    *   use moleculer-web as a middleware
* [Socket.io](https://github.com/moleculerjs/moleculer-web/blob/master/examples/socket.io/index.js)
    
    *   start socket.io websocket server
    *   call action and send back the response via websocket
    *   send Moleculer events to the browser via websocket
* [Full](https://github.com/moleculerjs/moleculer-web/blob/master/examples/full/index.js)
    
    *   SSL
    *   static files
    *   middlewares
    *   multiple routes with different roles
    *   role-based authorization with JWT
    *   whitelist
    *   aliases with named params
    *   multiple body-parsers
    *   before & after hooks
    *   metrics, statistics & validation from Moleculer
    *   custom error handlers
* [Webpack](https://github.com/moleculerjs/moleculer-web/blob/master/examples/webpack)
    
    *   Webpack development environment for client-side developing
    *   webpack config file
    *   compression
    *   static file serving
* [Webpack-Vue](https://github.com/moleculerjs/moleculer-web/blob/master/examples/webpack-vue)
    
    *   Webpack+Vue development environment for VueJS client developing
    *   webpack config file
    *   Hot-replacement
    *   Babel, SASS, SCSS, Vue SFC

#### _docs_0.15_networking.md

> Source: https://moleculer.services/docs/0.15/networking
> Scraped: 4/13/2025, 3:24:01 AM

To enable communication between nodes (ServiceBrokers), you must configure a transporter. The available transporters typically connect to a central message broker, facilitating reliable message exchange among remote nodes. These message brokers primarily support the publish/subscribe messaging pattern.

![Networking diagram](https://moleculer.services/docs/0.15/assets/networking.svg)

## [](_docs_0.15_networking.md#Transporters)Transporters

The transporter module in Moleculer plays a critical role in facilitating communication between services running on multiple nodes. It manages the transmission of events, request calls, and processing responses among nodes in the network. A key feature is its ability to evenly distribute requests among multiple instances of a service running on different nodes, which enhances scalability and efficiency.

**Abstraction for Seamless Switching**

The communication logic is abstracted away from the transporter class itself. This allows for seamless switching between different transporters without requiring any modifications to your service code. You can choose the most suitable transporter for your needs (e.g., TCP, NATS, Redis) without impacting your service logic, offering flexibility and future-proofing for your application.

### [](_docs_0.15_networking.md#TCP-transporter)TCP transporter

![Stable transporter](https://img.shields.io/badge/status-stable-green.svg)  
This is a no-dependency, zero-configuration TCP transporter. It uses [Gossip protocol](https://en.wikipedia.org/wiki/Gossip_protocol) to disseminate node statuses, service list and heartbeats. It contains an integrated UDP discovery feature to detect new and disconnected nodes on the network.  
If the UDP is prohibited on your network, use `urls` option. It is a list of remote endpoints (host/ip, port, nodeID). It can be a static list in your configuration or a file path which contains the list.

**Use TCP transporter with default options**
```
  
module.exports = {  
    transporter: "TCP"  
};  
```
**All TCP transporter options with default values**
```
  
module.exports = {  
    logger: true,  
    transporter: {  
        type: "TCP",  
        options: {  
              
            udpDiscovery: true,  
              
            udpReuseAddr: true,  
  
              
            udpPort: 4445,  
              
            udpBindAddress: null,  
              
            udpPeriod: 30,  
  
              
            udpMulticast: "239.0.0.0",  
              
            udpMulticastTTL: 1,  
  
              
            udpBroadcast: false,  
  
              
            port: null,  
              
            urls: null,  
              
            useHostname: true,  
  
              
            gossipPeriod: 2,  
              
            maxConnections: 32,  
              
            maxPacketSize: 1 \* 1024 \* 1024              
        }  
    }  
};  
```
**TCP transporter with static endpoint list**
```
  
module.exports = {  
    nodeID: "node-1",  
    logger: true,  
    transporter: {  
        type: "TCP",  
        options: {  
            udpDiscovery: false,  
            urls: \[  
                "172.17.0.1:6000/node-1",  
                "172.17.0.2:6000/node-2",  
                "172.17.0.3:6000/node-3"                  
            \],  
        }  
    }  
};  
```
_You don’t need to set `port` because it find & parse the self TCP port from URL list._

**TCP transporter with shorthand static endpoint list**  
It needs to start with `tcp://`.
```
  
module.exports = {  
    nodeID: "node-1",  
    transporter: "tcp://172.17.0.1:6000/node-1,172.17.0.2:6000/node-2,172.17.0.3:6000/node-3"  
};  
```
**TCP transporter with static endpoint list file**
```
  
module.exports = {  
    nodeID: "node-1",  
    transporter: "file://./nodes.json"  
};  
```
```
  
\[  
    "127.0.0.1:6001/client-1",  
    "127.0.0.1:7001/server-1",  
    "127.0.0.1:7002/server-2"  
\]  
```
> **Serviceless node**
> 
> Please note, you don’t need to list all remote nodes. It’s enough at least one node which is online. For example, create a “serviceless” gossiper node, which does nothing, just shares other remote nodes addresses by gossip messages. So all nodes must know only the gossiper node address to be able to communicate with all other nodes.

### [](_docs_0.15_networking.md#NATS-Transporter)NATS Transporter

![Stable transporter](https://img.shields.io/badge/status-stable-green.svg)  
Built-in transporter for [NATS](http://nats.io/).

> NATS Server is a simple, high performance open source messaging system for cloud-native applications, IoT messaging, and microservices architectures.
```
  
module.exports = {  
    nodeID: "server-1",  
    transporter: "nats://nats.server:4222"  
};  
```
> **Dependencies**
> 
> To use this transporter install the `nats` module with `npm install nats --save` command.

#### [](_docs_0.15_networking.md#Examples)Examples

**Connect to ‘nats://localhost:4222’**
```
  
module.exports = {  
    transporter: "NATS"  
};  
```
**Connect to a remote NATS server**
```
  
module.exports = {  
    transporter: "nats://nats-server:4222"  
};  
```
**Connect to a remote NATS server with auth**
```
  
module.exports = {  
    transporter: "nats://user:pass@nats-server:4222"  
};  
```
**Connect with options**
```
  
module.exports = {  
    transporter: {  
        type: "NATS",  
        options: {  
            servers: \["nats://localhost:4222"\],  
            user: "admin",  
            pass: "1234"  
        }  
    }  
};  
```
**Connect with TLS**
```
  
module.exports = {  
    transporter: {  
        type: "NATS",  
        options: {  
            servers: \["nats://localhost:4222"\]  
              
            tls: {  
                key: fs.readFileSync('./client-key.pem'),  
                cert: fs.readFileSync('./client-cert.pem'),  
                ca: \[ fs.readFileSync('./ca.pem') \]  
            }  
        }  
    }  
};  
```
### [](_docs_0.15_networking.md#Redis-Transporter)Redis Transporter

![Stable transporter](https://img.shields.io/badge/status-stable-green.svg)  
Built-in transporter for [Redis](http://redis.io/).
```
  
module.exports = {  
    nodeID: "server-1",  
    transporter: "redis://redis.server:6379"  
};  
```
> **Dependencies**
> 
> To use this transporter install the `ioredis` module with `npm install ioredis --save` command.

#### [](_docs_0.15_networking.md#Examples-1)Examples

**Connect with default settings**
```
  
module.exports = {  
    transporter: "Redis"  
};  
```
**Connect with connection string**
```
  
module.exports = {  
    transporter: "redis://localhost:6379"  
};  
```
**Connect to a secure Redis server**
```
  
module.exports = {  
    transporter: "rediss://localhost:6379"  
};  
```
**Connect with options**
```
  
module.exports = {  
    transporter: {  
        type: "Redis",  
        options: {  
            host: "redis-server",  
            db: 0  
        }  
    }  
};  
```
**Connect to Redis cluster**
```
  
module.exports = {  
    transporter: {  
        type: "Redis",  
        options: {  
            cluster: {  
                nodes: \[  
                    { host: "localhost", port: 6379 },  
                    { host: "localhost", port: 6378 }  
                \]  
            }  
        }  
    }  
};  
```
### [](_docs_0.15_networking.md#MQTT-Transporter)MQTT Transporter

![Stable transporter](https://img.shields.io/badge/status-stable-green.svg)  
Built-in transporter for [MQTT](http://mqtt.org/) protocol _(e.g.: [Mosquitto](https://mosquitto.org/))_.
```
  
module.exports = {  
    nodeID: "server-1",  
    transporter: "mqtt://mqtt-server:1883"  
};  
```
> **Dependencies**
> 
> To use this transporter install the `mqtt` module with `npm install mqtt --save` command.

#### [](_docs_0.15_networking.md#Examples-2)Examples

**Connect with default settings**
```
  
module.exports = {  
    transporter: "MQTT"  
};  
```
**Connect with connection string**
```
  
module.exports = {  
    transporter: "mqtt://mqtt-server:1883"  
};  
```
**Connect to secure MQTT server**
```
  
module.exports = {  
    transporter: "mqtts://mqtt-server:1883"  
};  
```
**Connect with options**
```
  
module.exports = {  
    transporter: {  
        type: "MQTT",  
        options: {  
            host: "mqtt-server",  
            port: 1883,  
            qos: 0,  
            topicSeparator: "."  
        }  
    }  
};  
```
### [](_docs_0.15_networking.md#AMQP-0-9-Transporter)AMQP (0.9) Transporter

![Stable transporter](https://img.shields.io/badge/status-stable-green.svg)  
Built-in transporter for [AMQP](https://www.amqp.org/) 0.9 protocol _(e.g.: [RabbitMQ](https://www.rabbitmq.com/))_.
```
  
module.exports = {  
    nodeID: "server-1",  
    transporter: "amqp://rabbitmq-server:5672"  
};  
```
> **Dependencies**
> 
> To use this transporter install the `amqplib` module with `npm install amqplib --save` command.

#### [](_docs_0.15_networking.md#Transporter-options)Transporter options

Options can be passed to `amqp.connect()` method.

**Connect to ‘amqp://guest:guest@localhost:5672’**
```
  
module.exports = {  
    transporter: "AMQP"  
});  
```
**Connect to a remote server**
```
  
module.exports = {  
    transporter: "amqp://rabbitmq-server:5672"  
});  
```
**Connect to a secure server**
```
  
module.exports = {  
    transporter: "amqps://rabbitmq-server:5672"  
});  
```
**Connect to a remote server with options & credentials**
```
  
module.exports = {  
    transporter: {  
        type: "AMQP",  
        options: {  
            url: "amqp://user:pass@rabbitmq-server:5672",  
            eventTimeToLive: 5000,  
            prefetch: 1,  
            socketOptions: {  
                servername: process.env.RABBIT\_SERVER\_NAME  
            }  
              
            autoDeleteQueues: true  
        }  
    }  
};  
```
### [](_docs_0.15_networking.md#AMQP-1-0-Transporter)AMQP 1.0 Transporter

![Experimental transporter](https://img.shields.io/badge/status-experimental-orange.svg)  
Built-in transporter for [AMQP 1.0](https://www.amqp.org/resources/specifications) protocol _(e.g.: [ActiveMq](https://activemq.apache.org/) or [RabbitMQ](https://www.rabbitmq.com/) + [rabbitmq-amqp1.0 plugin](https://github.com/rabbitmq/rabbitmq-amqp1.0))_.

> Please note, it is an **experimental** transporter. **Do not use it in production yet!**
```
  
module.exports = {  
    transporter: "amqp10://activemq-server:5672"  
};  
```
> **Dependencies**
> 
> To use this transporter install the `rhea-promise` module with `npm install rhea-promise --save` command.

#### [](_docs_0.15_networking.md#Transporter-options-1)Transporter options

Options can be passed to `rhea.connection.open()` method, the topics, the queues, and the messages themselves.

**Connect to ‘amqp10://guest:guest@localhost:5672’**
```
  
module.exports = {  
    transporter: "AMQP10"  
};  
```
**Connect to a remote server**
```
  
module.exports = {  
    transporter: "amqp10://activemq-server:5672"  
};  
```
**Connect to a remote server with options & credentials**
```
  
module.exports = {  
    transporter: {  
        url: "amqp10://user:pass@activemq-server:5672",  
        eventTimeToLive: 5000,  
        heartbeatTimeToLive: 5000,  
        connectionOptions: {   
            ca: "",   
            servername: "",   
            key: "",   
            cert: ""   
        },  
        queueOptions: {},   
        topicOptions: {},   
        messageOptions: {},   
        topicPrefix: "topic://",   
        prefetch: 1  
    }  
};  
```
### [](_docs_0.15_networking.md#Kafka-Transporter)Kafka Transporter

![Stable transporter](https://img.shields.io/badge/status-stable-green.svg)  
Built-in transporter for [Kafka](https://kafka.apache.org/).

> It is a simple implementation. It transfers Moleculer packets to consumers via pub/sub. There are not implemented offset, replay…etc features.

> **Dependencies**
> 
> To use this transporter install the `kafkajs` module with `npm install kafkajs --save` command.

**Connect to Zookeeper**
```
  
module.exports = {  
    transporter: "kafka://192.168.51.29:2181"  
};  
```
**Connect to Zookeeper with custom options**
```
  
module.exports = {  
    transporter: {  
        type: "Kafka",  
        options: {  
              
            client: {  
                brokers: \[\]  
            },  
  
              
            producer: {},  
  
              
            consumer: {},  
  
              
            publish: {},  
  
              
            publishMessage: {  
                partition: 0  
            }  
        }  
    }  
};  
```
### [](_docs_0.15_networking.md#Custom-transporter)Custom transporter

Custom transporter module can be created. We recommend to copy the source of [NatsTransporter](https://github.com/moleculerjs/moleculer/blob/master/src/transporters/nats.js) and implement the `connect`, `disconnect`, `subscribe` and `send` methods.

#### [](_docs_0.15_networking.md#Create-custom-transporter)Create custom transporter
```
const BaseTransporter = require("moleculer").Transporters.Base;  
  
class MyTransporter extends BaseTransporter {  
    connect() {  }  
    disconnect() {  }  
    subscribe() {  }  
    send() {  }  
}  
```
#### [](_docs_0.15_networking.md#Use-custom-transporter)Use custom transporter
```
  
const MyTransporter = require("./my-transporter");  
  
module.exports = {  
    transporter: new MyTransporter()  
};  
```
## [](_docs_0.15_networking.md#Disabled-balancer)Disabled balancer

Some transporter servers have built-in balancer solution. E.g.: RabbitMQ, NATS. If you want to use the transporter balancer instead of Moleculer balancer, set the `disableBalancer` broker option to `true`.

**Example**
```
  
module.exports = {  
    disableBalancer: true,  
    transporter: "nats://some-server:4222"  
};  
```
> **Please note**
> 
> If you disable the built-in Moleculer balancer, all requests & events will be transferred via transporter (including local requests). E.g. you have a local math service and you call `math.add` locally, the request will be sent via transporter.

## [](_docs_0.15_networking.md#Serialization)Serialization

Transporter needs a serializer module which serializes & deserializes the transferred packets. The default serializer is the `JSONSerializer` but there are several built-in serializer.

> Note that certain data types (e.g., Date, Map, BigInt) cannot be serialized with native JSON serializer. If you are working with this kind of data consider using [JSONExt](_docs_0.15_networking.md#json-extended-serializer) or [Notepack](_docs_0.15_networking.md#Notepack-serializer) serializers.

**Example**
```
  
module.exports = {  
    nodeID: "server-1",  
    transporter: "NATS",  
};  
```
### [](_docs_0.15_networking.md#JSON-serializer)JSON serializer

This is the default serializer. It serializes the packets to JSON string and deserializes the received data to packet.
```
  
module.exports = {  
    serializer: "JSON"   
};  
```
### [](_docs_0.15_networking.md#JSON-Extended-serializer)JSON Extended serializer

We implemented a new JSON serializer which (unlike the native JSON serializer) is able to serializer `Buffer`, `BigInt`, `Date`, `Map`, `Set` and `RegExp` classes.

**Example**
```
  
module.exports = {  
    serializer: "JSONExt"  
}  
```
#### [](_docs_0.15_networking.md#Custom-extensions)Custom extensions

You can extend the serializer with custom types.

##### [](_docs_0.15_networking.md#Example-to-extend-with-a-custom-class-serializing-deserializing)Example to extend with a custom class serializing/deserializing
```
class MyClass {  
  constructor(a, b) {  
    this.a = a;  
    this.b = b;  
  }  
}  
```
```
  
module.exports = {  
  serializer: {  
    type: "JSONExt",  
    options: {  
      customs: \[  
        {  
            
          prefix: "AB",  
  
            
          check: (v) => v instanceof MyClass,  
  
            
          serialize: (v) => v.a + "|" + v.b,  
  
            
          deserialize: (v) => {  
            const \[a, b\] = v.split("|");  
            return new MyClass(parseInt(a), b);  
          },  
        },  
      \],  
    },  
  },  
};  
```
### [](_docs_0.15_networking.md#MsgPack-serializer)MsgPack serializer

Built-in [MsgPack](https://github.com/mcollina/msgpack5) serializer.
```
  
module.exports = {  
    serializer: "MsgPack"  
};  
```
> **Dependencies**
> 
> To use this serializer install the `msgpack5` module with `npm install msgpack5 --save` command.

### [](_docs_0.15_networking.md#Notepack-serializer)Notepack serializer

Built-in [Notepack](https://github.com/darrachequesne/notepack) serializer.
```
  
module.exports = {  
    serializer: "Notepack"  
};  
```
> **Dependencies**
> 
> To use this serializer install the `notepack` module with `npm install notepack.io --save` command.

### [](_docs_0.15_networking.md#CBOR-serializer)CBOR serializer

CBOR ([cbor-x](https://github.com/kriszyp/cbor-x)) is the [fastest](https://github.com/moleculerjs/moleculer/pull/905) than any other serializers.

Example
```
  
module.exports = {  
    logger: true,  
    serializer: "CBOR"  
};  
```
### [](_docs_0.15_networking.md#Custom-serializer)Custom serializer

Custom serializer module can be created. We recommend to copy the source of [JSONSerializer](https://github.com/moleculerjs/moleculer/blob/master/src/serializers/json.js) and implement the `serialize` and `deserialize` methods.

#### [](_docs_0.15_networking.md#Create-custom-serializer)Create custom serializer
```
const BaseSerializer = require("moleculer").Serializers.Base;  
  
class MySerializer extends BaseSerializer {  
    serialize(obj, type) {  }  
    deserialize(buf, type) {  }  
}  
```
#### [](_docs_0.15_networking.md#Use-custom-serializer)Use custom serializer
```
  
const MySerializer = require("./my-serializer");  
  
module.exports = {  
    serializer: new MySerializer()  
};  
```

#### _docs_0.15_registry.md

> Source: https://moleculer.services/docs/0.15/registry
> Scraped: 4/13/2025, 3:24:01 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/registry.md)

## [](_docs_0.15_registry.md#Dynamic-service-discovery)Dynamic service discovery

Within the Moleculer framework, a dedicated module handles node discovery and performs periodic heartbeat verification. This discovery mechanism operates dynamically, eliminating the need for nodes to possess prior knowledge of one another during startup. Upon initialization, each node broadcasts its presence to all others, enabling each node to construct its own local service registry.

In the event of a node crash or shutdown, neighboring nodes will detect the absence and consequently update their respective registries by removing the affected services. This dynamic behavior ensures that subsequent requests are only routed to live, operational nodes, thereby maintaining system resilience and continuity of service.

### [](_docs_0.15_registry.md#Local)Local

Local discovery (default option) uses the [transporter](_docs_0.15_networking.md#Transporters) module to exchange node info and heartbeat packets (for more info about packet structure check [Moleculer protocol](https://github.com/moleculer-framework/protocol/blob/master/4.0/PROTOCOL.md)). It’s the simplest and the fastest among the available discovery mechanisms as it doesn’t require any external solutions. However, this discovery method also has some drawbacks, especially for large scale deployments with `>100` nodes. The heartbeat packets can generate large amount traffic that can saturate the communication bus and, therefore, deteriorate the performance of actions and events, i.e., slow down the delivery of request/response and event packets.

> Please note the TCP transporter uses Gossip protocol & UDP packets for discovery & heartbeats, it means it can work only with local discovery mechanism.

**Local Discovery with default options**
```
  
module.exports = {  
    registry: {  
        discoverer: "Local"  
    }      
}  
```
**Local Discovery with custom options**
```
  
module.exports = {  
    registry: {  
        discoverer: {  
            type: "Local",  
            options: {  
                  
                heartbeatInterval: 10,  
  
                  
                heartbeatTimeout: 30,  
  
                  
                disableHeartbeatChecks: false,  
  
                  
                disableOfflineNodeRemoving: false,  
  
                  
                cleanOfflineNodesTimeout: 10 \* 60  
            }  
        }  
    }      
}  
```
### [](_docs_0.15_registry.md#Redis)Redis

![Experimental transporter](https://img.shields.io/badge/status-experimental-orange.svg)  
Redis-based discovery uses a dedicated connection with the [Redis server](https://redis.io/) to exchange discovery and heartbeat packets. This approach reduces the load over the transporter module, it’s used exclusively for the exchange of the request, response, event packets.

When Redis-based discovery method is enabled, Moleculer nodes periodically publish and fetch the info from Redis and update their internal service registry. Redis key expiration mechanism removes nodes that don’t publish heartbeat packets for a certain period of time. This allows Moleculer nodes to detect that a specific node has disconnected.

Please note that this method is slower to detect new nodes as it relies on periodic heartbeat checks at Redis server. The periodicity depends on the `heartbeatInterval` broker option.

> To use Redis discovery install the `ioredis` module with the `npm install ioredis --save` command.

**Example of connection to a local Redis server**
```
  
module.exports = {  
    registry: {  
        discoverer: "Redis"  
    }      
}  
```
**Example of connection to a remote Redis server**
```
  
module.exports = {  
    registry: {  
        discoverer: "redis://redis-server:6379"  
    }      
}  
```
**Example with options**
```
  
module.exports = {  
    registry: {  
        discoverer: {  
            type: "Redis",  
            options: {  
                redis: {  
                      
                      
                    port: 6379,  
                    host: "redis-server",  
                    password: "123456",  
                    db: 3  
                }  
  
                  
                serializer: "JSON",  
  
                  
                  
                fullCheck: 10,  
  
                  
                scanLength: 100,  
  
                  
                monitor: true,  
                  
                  
  
                  
                heartbeatInterval: 10,  
  
                  
                heartbeatTimeout: 30,  
  
                  
                disableHeartbeatChecks: false,  
  
                  
                disableOfflineNodeRemoving: false,  
  
                  
                cleanOfflineNodesTimeout: 10 \* 60  
            }  
        }  
    }      
}  
```
> Tip: To further reduce network traffic use [MsgPack/Notepack serializers](_docs_0.15_networking.md#MsgPack-serializer) instead of JSON.

### [](_docs_0.15_registry.md#etcd3)etcd3

![Experimental transporter](https://img.shields.io/badge/status-experimental-orange.svg)

Etcd3-based discovery method is very similar to [Redis-based discovery](_docs_0.15_registry.md#Redis). It stores heartbeat and discovery packets at [etcd3 server](https://etcd.io/). etcd3’s [lease](https://etcd.io/docs/v3.4.0/learning/api/#lease-api) option will remove heartbeat info of nodes that have crashed or disconnected from the network.

This method has the same strengths and weaknesses of Redis-based discovery. It doesn’t use the transporter module for the discovery but it’s also slower to detect new or disconnected nodes.

> To use etcd3 discovery install the `etcd3` module with the `npm install etcd3 --save` command.

**Example to connect local etcd3 server**
```
  
module.exports = {  
    registry: {  
        discoverer: "Etcd3"  
    }      
}  
```
**Example to connect remote etcd3 server**
```
  
module.exports = {  
    registry: {  
        discoverer: "etcd3://etcd-server:2379"  
    }      
}  
```
**Example with options**
```
  
module.exports = {  
    registry: {  
        discoverer: {  
            type: "Etcd3",  
            options: {  
                etcd: {  
                      
                      
                    hosts: "etcd-server:2379",  
                    auth: "12345678"  
                }  
  
                  
                serializer: "JSON",  
  
                  
                  
                fullCheck: 10,  
                  
                  
  
                  
                heartbeatInterval: 10,  
  
                  
                heartbeatTimeout: 30,  
  
                  
                disableHeartbeatChecks: false,  
  
                  
                disableOfflineNodeRemoving: false,  
  
                  
                cleanOfflineNodesTimeout: 10 \* 60  
            }  
        }  
    }      
}  
```
> Tip: To further reduce network traffic use [MsgPack/Notepack serializers](_docs_0.15_networking.md#MsgPack-serializer) instead of JSON.

### [](_docs_0.15_registry.md#Customization)Customization

You can create your custom discovery mechanism. We recommend to copy the source of Redis Discoverer and implement the necessary methods.

## [](_docs_0.15_registry.md#Built-in-Service-Registry)Built-in Service Registry

Moleculer has a built-in service registry module. It stores all information about services, actions, event listeners and nodes. When you call a service or emit an event, broker asks the registry to look up a node which is able to execute the request. If there are multiple nodes, it uses load-balancing strategy to select the next node.

> Read more about [load-balancing & strategies](_docs_0.15_balancing.md).

> Registry data is available via [internal service](_docs_0.15_services.md#Internal-Services).

#### _docs_0.15_runner.md

> Source: https://moleculer.services/docs/0.15/runner
> Scraped: 4/13/2025, 3:24:01 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/runner.md)

Moleculer Runner is a helper script that helps you run Moleculer projects. With it, you don’t need to create a ServiceBroker instance with options. Instead, you can create a `moleculer.config.js` file in the root of repo with broker options. Then simply call the `moleculer-runner` in NPM script, and it will automatically load the configuration file, create the broker and load the services. Alternatively, you can declare your configuration as environment variables.

> **Production-ready**
> 
> Use the `moleculer.config.js` during development or store common options. In production, you can overwrite the values with the environment variables!

## [](_docs_0.15_runner.md#Syntax)Syntax
```
$ moleculer-runner \[options\] \[service files or directories or glob masks\]  
```
> Note: It runs in this format in NPM scripts only. To call it directly from your console, use the `./node_modules/.bin/moleculer-runner --repl` or `node ./node_modules/moleculer/bin/moleculer-runner.js --repl` format.

## [](_docs_0.15_runner.md#Options)Options

Option

Type

Default

Description

`-r`, `--repl`

`Boolean`

`false`

If true, it switches to [REPL](_docs_0.15_moleculer-repl.md) mode after broker started.

`-s`, `--silent`

`Boolean`

`false`

Disable the broker logger. It prints nothing to the console.

`-H`, `--hot`

`Boolean`

`false`

Hot reload services when they change.

`-c`, `--config <file>`

`String`

`null`

Load configuration file from a different path or a different filename.

`-e`, `--env`

`Boolean`

`false`

Load environment variables from the ‘.env’ file from the current folder.

`-E`, `--envfile <file>`

`String`

`null`

Load environment variables from the specified file.

`-i`, `--instances`

`Number`

`null`

Launch \[number\] node instances or `max` for all cpu cores (with `cluster` module)

**Example NPM scripts**
```
{  
    "scripts": {  
        "dev": "moleculer-runner --repl --hot --config moleculer.dev.config.js services",  
        "start": "moleculer-runner --instances=max services"  
    }  
}  
```
The `dev` script loads development configurations from the `moleculer.dev.config.js` file, start all services from the `services` folder, enable hot-reloading and switches to REPL mode. Run it with the `npm run dev` command.

The `start` script is to load the default `moleculer.config.js` file if it exists, otherwise only loads options from environment variables. Starts 4 instances of broker, then they start all services from the `services` folder. Run it with `npm start` command.

## [](_docs_0.15_runner.md#Configuration-loading-logic)Configuration loading logic

The runner does the following steps to load & merge configurations:

1.  Load the config file defined in `MOLECULER_CONFIG` environment variable. If it does not exist, it throws an error.
2.  It loads config file defined in CLI options. If it does not exist, it throws an error. Note that `MOLECULER_CONFIG` has priority over CLI meaning that if both are defined `MOLECULER_CONFIG` is the one that’s going to be used.
3.  If not defined, it loads the `moleculer.config.js` file from the current directory. If it does not exist, it loads the `moleculer.config.json` file.
4.  Once a config file has been loaded, it merges options with the default options of the ServiceBroker.
5.  The runner observes the options step by step and tries to overwrite them from environment variables. Once `logLevel: "warn"` is set in the config file, but the `LOGLEVEL=debug` environment variable is defined, the runner overwrites it, and it results: `logLevel: "debug"`.

> To overwrite broker’s deeply nested default options, which are not present in `moleculer.config.js`, via environment variables, use the `MOL_` prefix and double underscore `__` for nested properties in `.env` file. For example, to set the [cacher prefix](_docs_0.15_caching.md#Built-in-cachers) to `MOL` you should declare as `MOL_CACHER__OPTIONS__PREFIX=MOL`.

### [](_docs_0.15_runner.md#Configuration-file)Configuration file

The structure of the configuration file is the same as that of the [broker options](_docs_0.15_configuration.md#Broker-options). Every property has the same name.

**Example config file**
```
  
module.exports = {  
    nodeID: "node-test",  
    logger: true,  
    logLevel: "debug",  
  
    transporter: "nats://localhost:4222",  
    requestTimeout: 5 \* 1000,  
  
    circuitBreaker: {  
        enabled: true  
    },  
  
    metrics: true  
};  
```
### [](_docs_0.15_runner.md#Asynchronous-Configuration-file)Asynchronous Configuration file

Moleculer Runner also supports asynchronous configuration files. In this case `moleculer.config.js` must export a `Function` that returns a `Promise` (or you can use `async/await`).
```
  
const fetch = require("node-fetch");  
  
module.exports = async function() {  
	const res = await fetch("https://pastebin.com/raw/SLZRqfHX");  
	return await res.json();  
};  
```
> This function runs with the `MoleculerRunner` instance as the `this` context. Useful if you need to access the flags passed to the runner. Check the [MoleculerRunner](https://github.com/moleculerjs/moleculer/blob/master/src/runner.js) source more details.

### [](_docs_0.15_runner.md#Environment-variables)Environment variables

The runner transforms the property names to uppercase. If nested, the runner concatenates names with `_`.

**Example environment variables**
```
NODEID=node-test  
LOGGER=true  
LOGLEVEL=debug  
  
  
TRANSPORTER=nats://localhost:4222  
REQUESTTIMEOUT=5000  
  
  
CIRCUITBREAKER\_ENABLED=true  
  
METRICS=true  
```
## [](_docs_0.15_runner.md#Services-loading-logic)Services loading logic

The runner loads service files or folders defined in CLI arguments. If you define folder(s), the runner loads all services `**/*.service.js` from specified one(s) (including sub-folders too). Services & service folder can be loaded with `SERVICES` and `SERVICEDIR` environment variables.

**Loading steps:**

1.  If `SERVICEDIR` env found, but no `SERVICES` env, it loads all services from the `SERVICEDIR` directory.
2.  If `SERVICEDIR` & `SERVICES` env found, it loads the specified services from the `SERVICEDIR` directory.
3.  If no `SERVICEDIR`, but `SERVICES` env found, it loads the specified services from the current directory.
4.  Check the CLI arguments. If filename found, it loads them. If directory found, it loads them. If glob pattern found, it applies and load the found files.

> Please note: shorthand names can also be used in `SERVICES` env var.

**Example**
```
SERVICEDIR=services  
SERVICES=math,post,user  
```
It loads the `math.service.js`, `post.service.js` and `user.service.js` files from the `services` folder.
```
SERVICEDIR=my-services  
```
It loads all `*.service.js` files from the `my-services` folder (including sub-folders too).

### [](_docs_0.15_runner.md#Glob-patterns)Glob patterns

If you want to be more specific, use glob patterns. It is useful when loading all services except certain ones.
```
$ moleculer-runner services !services/others/\*\*/\*.service.js services/others/mandatory/main.service.js  
```
**Explanations:**   `services` - legacy mode. Load all services from the `services` folder with `**/*.service.js` file mask.
*   `!services/others/**/*.service.js` - skip all services in the `services/others` folder and sub-folders.
*   `services/others/mandatory/main.service.js` - load the exact service.

> The glob patterns work in the `SERVICES` environment variables, as well.

## [](_docs_0.15_runner.md#Built-in-clustering)Built-in clustering

Moleculer Runner has a built-in clustering function to start multiple instances from your broker.

Example to start all services from the `services` folder in 4 instances.
```
$ moleculer-runner --instances 4 services  
```
> **Clustered Node ID**
> 
> The `nodeID` will be suffixed with the worker ID. E.g. if you define `my-node` nodeID in options, and starts 4 instances, the instance nodeIDs will be `my-node-1`, `my-node-2`, `my-node-3`, `my-node-4`.

## [](_docs_0.15_runner.md#env-files).env files

Moleculer runner can load `.env` file at starting. There are two new cli options to load env file:

*   `-e, --env` - Load environment variables from the ‘.env’ file from the current folder.
*   `-E, --envfile <filename>` - Load environment variables from the specified file.

**Example**
```
  
$ moleculer-runner --env  
  
  
$ moleculer-runner --envfile .my-env  
```
> **Dependencies**
> 
> To use this feature, install the `dotenv` module with `npm install dotenv --save` command.

#### _docs_0.15_services.md

> Source: https://moleculer.services/docs/0.15/services
> Scraped: 4/13/2025, 3:24:00 AM

The `Service` represents a microservice in the Moleculer framework. You can define actions and subscribe to events. To create a service you must define a schema. The service schema is similar to [a component of VueJS](https://vuejs.org/v2/guide/components.html#What-are-Components).

## [](_docs_0.15_services.md#Schema)Schema

The schema has some main parts `name`, `version`, `settings`, `actions`, `methods`, `events` that are described below.

**Simple service schema to define two actions**
```
  
module.exports = {  
    name: "math",  
    actions: {  
        add(ctx) {  
            return Number(ctx.params.a) + Number(ctx.params.b);  
        },  
  
        sub(ctx) {  
            return Number(ctx.params.a) - Number(ctx.params.b);  
        }  
    }  
}  
```
## [](_docs_0.15_services.md#Name-amp-Version)Name & Version

Services are defined using a schema-based approach. This section explores the two mandatory properties that form the foundation of a service definition:

### [](_docs_0.15_services.md#name)`name`

*   This property represents a unique identifier for your service within the Moleculer application.
*   It serves as the first part of the action name when invoking actions provided by the service.

### [](_docs_0.15_services.md#version)`version`

*   This optional property allows you to define multiple versions of the same service within your application.
*   When specified, it acts as a prefix to the action name, enabling versioning for your service’s functionality. The version can be either a number or a string.
```
  
module.exports = {  
  name: "posts",  
  version: 2,   
  actions: {  
    find() { ... }   
  },  
};  
```
To call this `find` action on version `2` service:
```
broker.call("v2.posts.find");  
```
> **REST call**
> 
> Via [API Gateway](_docs_0.15_moleculer-web.md), make a request to `GET /v2/posts/find`.

#### [](_docs_0.15_services.md#Disabling-Prefixes)Disabling Prefixes

Moleculer.js provides a way to disable both service name and version prefixing within service settings using the `$noServiceNamePrefix` and `$noVersionPrefix` properties, respectively. However, it’s generally recommended to maintain these prefixes for better organization and clarity within your microservices architecture.

**Additional Considerations**   Consider utilizing versioning for services that undergo significant changes over time, allowing for a smooth transition between versions.
*   Remember that disabling prefixes can lead to naming conflicts if multiple services have the same action names.

## [](_docs_0.15_services.md#Settings)Settings

The `settings` property is a static store, where you can store every settings/options to your service. You can reach it via `this.settings` inside the service.
```
  
module.exports = {  
    name: "mailer",  
    settings: {  
        transport: "mailgun"  
    },  
  
    action: {  
        send(ctx) {  
            if (this.settings.transport == "mailgun") {  
                ...  
            }  
        }  
    }  
}  
```
> Note: The `settings` is also obtainable on remote nodes. It is transferred during service discovering.

### [](_docs_0.15_services.md#Internal-Settings)Internal Settings

There are some internal settings which are used by core modules. These setting names start with `$` _(dollar sign)_.

Name

Type

Default

Description

`$noVersionPrefix`

`Boolean`

`false`

Disable version prefixing in action names.

`$noServiceNamePrefix`

`Boolean`

`false`

Disable service name prefixing in action names.

`$dependencyTimeout`

`Number`

`0`

Timeout for dependency waiting.

`$shutdownTimeout`

`Number`

`0`

Timeout for waiting for active requests at shutdown.

`$secureSettings`

`Array`

`[]`

List of secure settings.

### [](_docs_0.15_services.md#Secure-service-settings)Secure service settings

To protect your tokens & API keys, define a `$secureSettings: []` property in service settings and set the protected property keys. The protected settings won’t be published to other nodes and it won’t appear in Service Registry. These settings will only available under `this.settings` inside the service functions.
```
  
module.exports = {  
    name: "mailer",  
    settings: {  
        $secureSettings: \["transport.auth.user", "transport.auth.pass"\],  
  
        from: "[\[email protected\]](_cdn-cgi_l_email-protection.md)",  
        transport: {  
            service: 'gmail',  
            auth: {  
                user: '[\[email protected\]](_cdn-cgi_l_email-protection.md)',  
                pass: 'yourpass'  
            }  
        }  
    }          
      
};  
```
## [](_docs_0.15_services.md#Mixins)Mixins

Mixins are a flexible way to distribute reusable functionalities for Moleculer services. The Service constructor merges these mixins with the current schema. When a service uses mixins, all properties present in the mixin will be “mixed” into the current service.

**Example how to extend `moleculer-web` service**
```
  
const ApiGwService = require("moleculer-web");  
  
module.exports = {  
    name: "api",  
    mixins: \[ApiGwService\]  
    settings: {  
          
        port: 8080  
    },  
    actions: {  
        myAction() {  
              
        }  
    }  
}  
```
The above example creates an `api` service which inherits all properties from `ApiGwService` but overwrite the port setting and extend it with a new `myAction` action.

### [](_docs_0.15_services.md#Merge-algorithm)Merge algorithm

The merge algorithm depends on the property type.

Property

Algorithm

`name`, `version`

Merge & overwrite.

`settings`

Deep extend with [defaultsDeep](https://lodash.com/docs/4.17.4#defaultsDeep).

`metadata`

Deep extend with [defaultsDeep](https://lodash.com/docs/4.17.4#defaultsDeep).

`actions`

Deep extend with [defaultsDeep](https://lodash.com/docs/4.17.4#defaultsDeep). _You can disable an action from mixin if you set to `false` in your service._

`hooks`

Deep extend with [defaultsDeep](https://lodash.com/docs/4.17.4#defaultsDeep).

`methods`

Merge & overwrite.

`events`

Concatenate listeners.

`created`, `started`, `stopped`

Concatenate listeners.

`mixins`

Merge & overwrite.

`dependencies`

Merge & overwrite.

_any custom_

Merge & overwrite.

> **Merge algorithm examples**
> 
> **Merge & overwrite**: if serviceA has `a: 5`, `b: 8` and serviceB has `c: 10`, `b: 15`, the mixed service will have `a: 5`, `b: 15` and `c: 10`.  
> **Concatenate**: if serviceA & serviceB subscribe to `users.created` event, both event handler will be called when the `users.created` event emitted.

## [](_docs_0.15_services.md#Actions)Actions

The actions are the callable/public methods of the service. They are callable with `broker.call` or `ctx.call`.  
The action could be a `Function` (shorthand for handler) or an object with some properties and `handler`.  
The actions should be placed under the `actions` key in the schema. For more information check the [actions documentation](_docs_0.15_actions.md).
```
  
module.exports = {  
    name: "math",  
    actions: {  
          
        add(ctx) {  
            return Number(ctx.params.a) + Number(ctx.params.b);  
        },  
  
          
          
        mult: {  
            cache: false,  
            params: {  
                a: "number",  
                b: "number"  
            },  
            handler(ctx) {  
                  
                if (!ctx.action.cache)  
                    return Number(ctx.params.a) \* Number(ctx.params.b);  
            }  
        }  
    }  
};  
```
You can call the above actions as
```
const res = await broker.call("math.add", { a: 5, b: 7 });  
const res = await broker.call("math.mult", { a: 10, b: 31 });  
```
Inside actions, you can call other nested actions in other services with `ctx.call` method. It is an alias to `broker.call`, but it sets itself as parent context (due to correct tracing chains).
```
  
module.exports = {  
    name: "posts",  
    actions: {  
        async get(ctx) {  
              
            let post = posts\[ctx.params.id\];  
  
              
              
            const user = await ctx.call("users.get", { id: post.author });  
            if (user) {  
                  
                post.author = user;  
            }  
  
            return post;  
        }  
    }  
};  
```
> In action handlers the `this` is always pointed to the Service instance.

## [](_docs_0.15_services.md#Events)Events

You can subscribe to events under the `events` key. For more information check the [events documentation](_docs_0.15_events.md).
```
  
module.exports = {  
    name: "report",  
  
    events: {  
          
        "user.created"(ctx) {  
            this.logger.info("User created:", ctx.params);  
              
        },  
  
          
        "user.\*"(ctx) {  
            console.log("Payload:", ctx.params);  
            console.log("Sender:", ctx.nodeID);  
            console.log("Metadata:", ctx.meta);  
            console.log("The called event name:", ctx.eventName);  
        }  
  
          
        "$node.connected"(ctx) {  
            this.logger.info(\`Node '${ctx.params.id}' is connected!\`);  
        }  
    }  
};  
```
> In event handlers the `this` is always pointed to the Service instance.

### [](_docs_0.15_services.md#Grouping)Grouping

The broker groups the event listeners by group name. By default, the group name is the service name. But you can overwrite it in the event definition.
```
  
module.exports = {  
    name: "payment",  
    events: {  
        "order.created": {  
              
            group: "other",  
            handler(payload) {  
                  
            }  
        }  
    }  
}  
```
## [](_docs_0.15_services.md#Methods)Methods

To define private methods within a service, place your functions under the `methods` key in the schema. These methods are not directly callable with `broker.call`, but can be invoked internally within the service, such as from action handlers, event handlers, and lifecycle event handlers.

**Usage**
```
  
module.exports = {  
    name: "mailer",  
    actions: {  
        send(ctx) {  
              
            return this.sendMail(ctx.params.recipients, ctx.params.subject, ctx.params.body);  
        }  
    },  
  
    methods: {  
          
        sendMail(recipients, subject, body) {  
            return new Promise((resolve, reject) => {  
                ...  
            });  
        }  
    }  
};  
```
If you want to wrap a method with a [middleware](_docs_0.15_middlewares.md#localMethod-next-method) use the following notation:
```
  
module.exports = {  
    name: "posts",  
  
    methods: {  
        list: {  
            async handler(count) {  
                  
                return posts;  
            }  
        }  
    }  
};  
```
> The method name can’t be `name`, `version`, `settings`, `metadata`, `schema`, `broker`, `actions`, `logger`, because these words are reserved in the schema.

> In methods the `this` is always pointed to the Service instance.

## [](_docs_0.15_services.md#Lifecycle-Events)Lifecycle Events

There are some lifecycle service events, that will be triggered by broker. They are placed in the root of schema.  
For more information check the [lifecycle events documentation](_docs_0.15_lifecycle.md).
```
  
module.exports = {  
    name: "www",  
    actions: {...},  
    events: {...},  
    methods: {...},  
  
    created() {  
          
    },  
  
    merged() {  
          
    },  
      
    async started() {  
          
    }  
  
    async stopped() {  
          
    }  
};  
```
## [](_docs_0.15_services.md#Dependencies)Dependencies

If your service depends on other services, use the `dependencies` property in the schema. The service waits for dependent services before calls the `started` lifecycle event handler.
```
  
module.exports = {  
  name: "posts",  
  settings: {  
      $dependencyTimeout: 30000   
  },  
  dependencies: \[  
      "likes",   
      "v2.auth",   
      { name: "users", version: 2 },   
      { name: "comments", version: "staging" }   
  \],  
  async started() {  
      this.logger.info("It will be called after all dependent services are available.");  
      const users = await this.broker.call("users.list");  
  }  
  ....  
}  
```
The `started` service handler is called once the `likes`, `v2.auth`, `v2.users`, `staging.comments` services are available (either the local or remote nodes).

### [](_docs_0.15_services.md#Wait-for-services-via-ServiceBroker)Wait for services via ServiceBroker

To wait for services, you can also use the `waitForServices` method of `ServiceBroker`. It returns a `Promise` which will be resolved, when all defined services are available & started.

**Parameters**

Parameter

Type

Default

Description

`services`

`String` or `Array`

\-

Service list to waiting

`timeout`

`Number`

`0`

Waiting timeout. `0` means no timeout. If reached, a `MoleculerServerError` will be rejected.

`interval`

`Number`

`1000`

Frequency of watches in milliseconds

**Example**
```
broker.waitForServices(\["posts", "v2.users"\]).then(() => {  
      
});  
```
**Set timeout & interval**
```
broker.waitForServices("accounts", 10 \* 1000, 500).then(() => {  
      
}).catch(err => {  
      
});  
```
## [](_docs_0.15_services.md#Metadata)Metadata

The `Service` schema has a `metadata` property. You can store here any meta information about service. You can access it as `this.metadata` inside service functions.

> Core modules don’t use it. You can store in it whatever you want.
```
module.exports = {  
    name: "posts",  
    settings: {},  
    metadata: {  
        scalable: true,  
        priority: 5  
    },  
  
    actions: { ... }  
};  
```
> The `metadata` is also obtainable on remote nodes. It is transferred during service discovering.

## [](_docs_0.15_services.md#Properties-of-Service-Instances)Properties of Service Instances

In service functions, `this` is always pointed to the Service instance. It has some properties & methods what you can use in your service functions.

Name

Type

Description

`this.name`

`String`

Name of service (from schema)

`this.version`

`Number` or `String`

Version of service (from schema)

`this.fullName`

`String`

Name of version prefix

`this.settings`

`Object`

Settings of service (from schema)

`this.metadata`

`Object`

Metadata of service (from schema)

`this.schema`

`Object`

Schema definition of service

`this.broker`

`ServiceBroker`

Instance of broker

`this.Promise`

`Promise`

Class of Promise (Bluebird)

`this.logger`

`Logger`

Logger instance

`this.actions`

`Object`

Actions of service. _Service can call own actions directly_

`this.waitForServices`

`Function`

Link to `broker.waitForServices` method

`this.currentContext`

`Context`

Get or set the current Context object.

## [](_docs_0.15_services.md#Service-creation)Service creation

There are several ways to create and load a service.

### [](_docs_0.15_services.md#broker-createService)broker.createService()

For testing, developing or prototyping, use the `broker.createService` method to load & create a service by schema. It’s simplest & fastest.
```
broker.createService({  
    name: "math",  
    actions: {  
        add(ctx) {  
            return Number(ctx.params.a) + Number(ctx.params.b);  
        }  
    }  
});  
```
### [](_docs_0.15_services.md#Load-service-from-file)Load service from file

The recommended way is to place your service code into a single file and load it with the broker.

**math.service.js**
```
  
module.exports = {  
    name: "math",  
    actions: {  
        add(ctx) {  
            return Number(ctx.params.a) + Number(ctx.params.b);  
        },  
        sub(ctx) {  
            return Number(ctx.params.a) - Number(ctx.params.b);  
        }  
    }  
}  
```
**Load it with broker:**
```
  
const broker = new ServiceBroker();  
  
  
broker.loadService("./math.service");  
  
  
broker.start();  
```
In the service file you can also create the Service instance. In this case, you have to export a function which returns the instance of [Service](_docs_0.15_services.md#service).
```
const { Service } = require("moleculer");  
  
  
module.exports = function(broker) {  
    return new Service(broker, {  
        name: "math",  
        actions: {  
            add(ctx) {  
                return Number(ctx.params.a) + Number(ctx.params.b);  
            },  
            sub(ctx) {  
                return Number(ctx.params.a) - Number(ctx.params.b);  
            }  
        }  
    });  
}  
```
Or create a function which returns with the schema of service
```
  
module.exports = function() {  
    let users = \[....\];  
  
    return {  
        name: "math",  
        actions: {  
            create(ctx) {  
                users.push(ctx.params);  
            }  
        }  
    };  
}  
```
### [](_docs_0.15_services.md#Load-multiple-services-from-a-folder)Load multiple services from a folder

If you have many services (and you will have) we suggest to put them to a `services` folder and load all of them with the `broker.loadServices` method.

**Syntax**
```
broker.loadServices(folder = "./services", fileMask = "\*\*/\*.service.js");  
```
**Example**
```
  
broker.loadServices();  
  
  
broker.loadServices("./");  
  
  
broker.loadServices("./svc", "user\*.service.js");  
```
### [](_docs_0.15_services.md#Load-with-Moleculer-Runner-recommended)Load with Moleculer Runner (recommended)

We recommend to use the [Moleculer Runner](_docs_0.15_runner.md) to start a ServiceBroker and load services. [Read more about Moleculer Runner](_docs_0.15_runner.md). It is the easiest way to start a node.

## [](_docs_0.15_services.md#Hot-Reloading-Services)Hot Reloading Services

Moleculer has a built-in hot-reloading function. During development, it can be very useful because it reloads your services when you modify it. You can enable it in broker options or in [Moleculer Runner](_docs_0.15_runner.md). [Demo video how it works.](https://www.youtube.com/watch?v=l9FsAvje4F4)

**Enable in broker options**
```
const broker = new ServiceBroker({  
    hotReload: true  
});  
  
broker.loadService("./services/test.service.js");  
```
**Enable it in Moleculer Runner**

Turn it on with `--hot` or `-H` flags.
```
$ moleculer-runner --hot ./services/test.service.js  
```
> Hot reloading function is working only with Moleculer Runner or if you load your services with `broker.loadService` or `broker.loadServices`. It doesn’t work with `broker.createService`.

> Hot reload mechanism watches the service files and their dependencies. Every time a file change is detected the hot-reload mechanism will track the services that depend on it and will restart them.

## [](_docs_0.15_services.md#Local-Variables)Local Variables

If you would like to use local properties/variables in your service, declare them in the `created` event handler.

**Example for local variables**
```
const http = require("http");  
  
module.exports = {  
    name: "www",  
  
    settings: {  
        port: 3000  
    },  
  
    created() {  
          
        this.server = http.createServer(this.httpHandler);  
    },  
  
    started() {  
          
        this.server.listen(this.settings.port);  
    },  
  
    stopped() {  
          
        this.server.close();  
    },  
  
    methods() {  
          
        httpHandler(req, res) {  
            res.end("Hello Moleculer!");  
        }  
    }  
}  
```
> **Naming restriction**
> 
> It is important to be aware that you can’t use variable name which is reserved for service or coincides with your method names! E.g. `this.name`, `this.version`, `this.settings`, `this.schema`…etc.

## [](_docs_0.15_services.md#ES6-Classes)ES6 Classes

If you prefer ES6 classes to Moleculer service schema, you can write your services in ES6 classes. There are two ways to do it.

### [](_docs_0.15_services.md#Native-ES6-classes-with-schema-parsing)Native ES6 classes with schema parsing

Define `actions` and `events` handlers as class methods and call the `parseServiceSchema` method in constructor with schema definition where the handlers pointed to these class methods.
```
const Service = require("moleculer").Service;  
  
class GreeterService extends Service {  
  
    constructor(broker) {  
        super(broker);  
  
        this.parseServiceSchema({  
            name: "greeter",  
            version: "v2",  
            meta: {  
                scalable: true  
            },  
            dependencies: \[  
                "auth",  
                "users"  
            \],  
  
            settings: {  
                upperCase: true  
            },  
            actions: {  
                hello: this.hello,  
                welcome: {  
                    cache: {  
                        keys: \["name"\]  
                    },  
                    params: {  
                        name: "string"  
                    },  
                    handler: this.welcome  
                }  
            },  
            events: {  
                "user.created": this.userCreated  
            },  
            created: this.serviceCreated,  
            started: this.serviceStarted,  
            stopped: this.serviceStopped,  
        });  
    }  
  
      
    hello() {  
        return "Hello Moleculer";  
    }  
  
      
    welcome(ctx) {  
        return this.sayWelcome(ctx.params.name);  
    }  
  
      
    sayWelcome(name) {  
        this.logger.info("Say hello to", name);  
        return \`Welcome, ${this.settings.upperCase ? name.toUpperCase() : name}\`;  
    }  
  
      
    userCreated(user) {  
        this.broker.call("mail.send", { user });  
    }  
  
    serviceCreated() {  
        this.logger.info("ES6 Service created.");  
    }  
  
    serviceStarted() {  
        this.logger.info("ES6 Service started.");  
    }  
  
    serviceStopped() {  
        this.logger.info("ES6 Service stopped.");  
    }  
}  
  
module.exports = GreeterService;  
```
### [](_docs_0.15_services.md#Use-decorators)Use decorators

Thanks for [@ColonelBundy](https://github.com/ColonelBundy), you can use ES7/TS decorators as well: [moleculer-decorators](https://github.com/ColonelBundy/moleculer-decorators)

> **Need a compiler**
> 
> Please note, you must use Typescript or Babel to compile decorators.

**Example service**
```
const { ServiceBroker } = require('moleculer');  
const { Service, Action, Event, Method } = require('moleculer-decorators');  
const web = require('moleculer-web');  
const broker = new ServiceBroker();  
  
@Service({  
    mixins: \[web\],  
    settings: {  
        port: 3000,  
        routes: \[  
              
        \]  
    }  
})  
class MyService {  
    @Action()  
    Login(ctx) {  
          
    }  
  
      
    @Action({  
        cache: false,  
        params: {  
            a: "number",  
            b: "number"  
        }  
    })  
    Login2(ctx) {  
          
    }  
  
    @Event  
    'event.name'(ctx) {  
          
    }  
  
    @Method  
    authorize(ctx, route, req, res) {  
          
    }  
  
    hello() {   
          
    }  
  
    started() {   
          
    }  
  
    created() {   
          
    }  
  
    stopped() {   
          
    }  
}  
  
broker.createService(MyService);  
broker.start();  
```
## [](_docs_0.15_services.md#Internal-Services)Internal Services

The `ServiceBroker` contains some internal services to check the node health or get some registry information. You can disable them by setting `internalServices: false` in broker options.

### [](_docs_0.15_services.md#List-of-nodes)List of nodes

It lists all known nodes (including local node).
```
broker.call("$node.list").then(res => console.log(res));  
```
**Parameters**

Name

Type

Default

Description

`withServices`

`Boolean`

`false`

List with services.

`onlyAvailable`

`Boolean`

`false`

List only available nodes.

### [](_docs_0.15_services.md#List-of-services)List of services

It lists all registered services (local & remote).
```
broker.call("$node.services").then(res => console.log(res));  
```
**Parameters**

Name

Type

Default

Description

`onlyLocal`

`Boolean`

`false`

List only local services.

`skipInternal`

`Boolean`

`false`

Skip the internal services (`$node`).

`withActions`

`Boolean`

`false`

List with actions.

`onlyAvailable`

`Boolean`

`false`

List only available services.

### [](_docs_0.15_services.md#List-of-local-actions)List of local actions

It lists all registered actions (local & remote).
```
broker.call("$node.actions").then(res => console.log(res));  
```
It has some options which you can declare within `params`.

**Options**

Name

Type

Default

Description

`onlyLocal`

`Boolean`

`false`

List only local actions.

`skipInternal`

`Boolean`

`false`

Skip the internal actions (`$node`).

`withEndpoints`

`Boolean`

`false`

List with endpoints _(nodes)_.

`onlyAvailable`

`Boolean`

`false`

List only available actions.

### [](_docs_0.15_services.md#List-of-local-events)List of local events

It lists all event subscriptions.
```
broker.call("$node.events").then(res => console.log(res));  
```
It has some options which you can declare within `params`.

**Options**

Name

Type

Default

Description

`onlyLocal`

`Boolean`

`false`

List only local subscriptions.

`skipInternal`

`Boolean`

`false`

Skip the internal event subscriptions `$`.

`withEndpoints`

`Boolean`

`false`

List with endpoints _(nodes)_.

`onlyAvailable`

`Boolean`

`false`

List only available subscriptions.

### [](_docs_0.15_services.md#List-of-metrics)List of metrics

It lists all metrics.
```
broker.call("$node.metrics").then(res => console.log(res));  
```
It has some options which you can declare within `params`.

**Options**

Name

Type

Default

Description

`types`

`String` or `Array`

`null`

[Type](_docs_0.15_metrics.md#Supported-Metric-Types) of metrics to include in response.

`includes`

`String` or `Array`

`null`

List of metrics to be included in response.

`excludes`

`String` or `Array`

`null`

List of metrics to be excluded from the response.

### [](_docs_0.15_services.md#Retrieving-broker-options)Retrieving broker options

It returns the broker options.
```
broker.call("$node.options").then(res => console.log(res));  
```
### [](_docs_0.15_services.md#Health-of-node)Health of node

It returns the health info of local node (including process & OS information).
```
broker.call("$node.health").then(res => console.log(res));  
```
Example health info:
```
{  
    "cpu": {  
        "load1": 0,  
        "load5": 0,  
        "load15": 0,  
        "cores": 4,  
        "utilization": 0  
    },  
    "mem": {  
        "free": 1217519616,  
        "total": 17161699328,  
        "percent": 7.094400109979598  
    },  
    "os": {  
        "uptime": 366733.2786046,  
        "type": "Windows\_NT",  
        "release": "6.1.7601",  
        "hostname": "Developer-PC",  
        "arch": "x64",  
        "platform": "win32",  
        "user": {  
            "uid": \-1,  
            "gid": \-1,  
            "username": "Developer",  
            "homedir": "C:\\\\Users\\\\Developer",  
            "shell": null  
        }  
    },  
    "process": {  
        "pid": 13096,  
        "memory": {  
            "rss": 47173632,  
            "heapTotal": 31006720,  
            "heapUsed": 22112024  
        },  
        "uptime": 25.447  
    },  
    "client": {  
        "type": "nodejs",  
        "version": "0.12.0",  
        "langVersion": "v8.9.4"  
    },  
    "net": {  
        "ip": \[  
            "192.168.2.100",  
            "192.168.232.1",  
            "192.168.130.1",  
            "192.168.56.1",  
            "192.168.99.1"  
        \]  
    },  
    "time": {  
        "now": 1487338958409,  
        "iso": "2018-02-17T13:42:38.409Z",  
        "utc": "Fri, 17 Feb 2018 13:42:38 GMT"  
    }  
}  
```
> Please note, internal service actions are not traced.

### [](_docs_0.15_services.md#Extending)Extending

Internal service can be easily extended with custom functionalities. To do it you must define a mixin schema in broker´s `internalServices` option.
```
  
module.exports = {  
    nodeID: "node-1",  
    logger: true,  
    internalServices: {  
        $node: {  
            actions: {  
                  
                hello(ctx) {  
                    return \`Hello Moleculer!\`;  
                }  
            }  
        }  
    }  
};  
```

#### _docs_0.15_testing.md

> Source: https://moleculer.services/docs/0.15/testing
> Scraped: 4/13/2025, 3:24:03 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/testing.md)

Writing (unit) tests is a crucial part of software development as it ensures that all the components of an application work as expected. This page covers how to test a typical Moleculer-based application.

> **Testing Frameworks**
> 
> Please note that we use [Jest](https://jestjs.io/) for testing. However, you can also use any other testing framework that offers the same capabilities.

## [](_docs_0.15_testing.md#Common-File-Structure)Common File Structure

The snippet presented bellow is a skeleton structure for writing unit tests for a Moleculer service.
```
const { ServiceBroker } = require("moleculer");  
  
const ServiceSchema = require("../../services/<SERVICE-NAME>.service");  
  
describe("Test '<SERVICE-NAME>'", () => {  
      
    let broker = new ServiceBroker({ logger: false });  
      
    let service = broker.createService(ServiceSchema);  
  
      
    beforeAll(() => broker.start());  
      
    afterAll(() => broker.stop());  
  
      
});  
```
To test the service two things are `required`: the `ServiceBroker` class and the schema of the service that is going to be tested. Next thing to do is to create an instance of `ServiceBroker` and, after that, create the actual instance of the service. Then Jest’s `beforeAll()` helper function is used to start the service broker and, after all tests are complete the broker is stopped with the `afterAll()`.

With this setup in place we are ready to write the actual tests.

> TIP: Disable the logs, by setting `logger` to `false` during `broker` creation, to avoid polluting the console.

## [](_docs_0.15_testing.md#Unit-Tests)Unit Tests

### [](_docs_0.15_testing.md#Actions)Actions

#### [](_docs_0.15_testing.md#Simple)Simple

A typical (yet very simplistic) [action](_docs_0.15_actions.md) looks like the one presented bellow:
```
  
module.exports = {  
    name: "helper",  
  
    actions: {  
        toUpperCase: {  
              
            params: {  
                name: "string"  
            },  
            handler(ctx) {  
                  
                ctx.emit("name.uppercase", ctx.params.name);  
  
                return ctx.params.name.toUpperCase();  
            }  
        }  
    }  
};  
```
The `toUpperCase` action of `helper` service receives a parameter `name` as input and, as a result, returns the uppercase `name`. This action also emits an (`name.uppercase`) event every time it’s called. Moreover, the `toUpperCase` has some parameter validation, it only accepts `name` parameter if it’s a string. So for the `toUpperCase` action there are three things that could be tested: the output value that it produces, if it emits an event and the parameter validation.

**Unit tests for the `helper` service actions**
```
const { ServiceBroker, Context } = require("moleculer");  
const { ValidationError } = require("moleculer").Errors;  
  
const HelperSchema = require("../../services/helper.service");  
  
describe("Test 'helper' actions", () => {  
    let broker = new ServiceBroker({ logger: false });  
    let service = broker.createService(HelperSchema);  
    beforeAll(() => broker.start());  
    afterAll(() => broker.stop());  
  
    describe("Test 'helper.toUpperCase' action", () => {  
        it("should return uppercase name", async () => {  
              
            const result = await broker.call("helper.toUpperCase", {  
                name: "John"  
            });  
  
              
            expect(result).toBe("JOHN");  
        });  
  
        it("should reject with a ValidationError", async () => {  
            expect.assertions(1);  
            try {  
                await broker.call("helper.toUpperCase", { name: 123 });  
            } catch (err) {  
                  
                expect(err).toBeInstanceOf(ValidationError);  
            }  
        });  
  
        it("should emit 'name.uppercase' event ", async () => {  
              
            jest.spyOn(Context.prototype, "emit");  
  
              
            await broker.call("helper.toUpperCase", { name: "john" });  
  
              
            expect(Context.prototype.emit).toBeCalledTimes(1);  
            expect(Context.prototype.emit).toHaveBeenCalledWith(  
                "name.uppercase",  
                "john"  
            );  
        });  
    });  
});  
```
#### [](_docs_0.15_testing.md#DB-Adapters)DB Adapters

Some actions persist the data that they receive. To test such actions it is necessary to mock the [DB adapter](_docs_0.15_moleculer-db.md). The example below shows how to do it:
```
const DbService = require("moleculer-db");  
  
module.exports = {  
    name: "users",  
      
      
    mixins: \[DbService\],  
  
    actions: {  
        create: {  
            handler(ctx) {  
                  
                return this.adapter.insert(ctx.params);  
            }  
        }  
    }  
};  
```
**Unit tests for the `users` service actions with DB**
```
const { ServiceBroker } = require("moleculer");  
const UsersSchema = require("../../services/users.service");  
const MailSchema = require("../../services/mail.service");  
  
describe("Test 'users' service", () => {  
    let broker = new ServiceBroker({ logger: false });  
    let usersService = broker.createService(UsersSchema);  
  
      
    const mockInsert = jest.fn(params =>  
        Promise.resolve({ id: 123, name: params.name })  
    );  
  
    beforeAll(() => broker.start());  
    afterAll(() => broker.stop());  
  
    describe("Test 'users.create' action", () => {  
        it("should create new user", async () => {  
              
            usersService.adapter.insert = mockInsert;  
  
              
            let result = await broker.call("users.create", { name: "John" });  
  
              
            expect(result).toEqual({ id: 123, name: "John" });  
              
            expect(mockInsert).toBeCalledTimes(1);  
            expect(mockInsert).toBeCalledWith({ name: "John" });  
        });  
    });  
});  
```
### [](_docs_0.15_testing.md#Events)Events

[Events](_docs_0.15_events.md) are tricky to test as they are fire-and-forget, i.e., they don’t return any values. However, it is possible to test the “internal” behavior of an event. For this kind of tests the `Service` class implements a helper function called `emitLocalEventHandler` that allows to call the event handler directly.
```
module.exports = {  
    name: "helper",  
  
    events: {  
        async "helper.sum"(ctx) {  
              
            return this.sum(ctx.params.a, ctx.params.b);  
        }  
    },  
  
    methods: {  
        sum(a, b) {  
            return a + b;  
        }  
    }  
};  
```
**Unit tests for the `helper` service events**
```
describe("Test 'helper' events", () => {  
    let broker = new ServiceBroker({ logger: false });  
    let service = broker.createService(HelperSchema);  
    beforeAll(() => broker.start());  
    afterAll(() => broker.stop());  
  
    describe("Test 'helper.sum' event", () => {  
        it("should call the event handler", async () => {  
              
            service.sum = jest.fn();  
  
              
            await service.emitLocalEventHandler("helper.sum", { a: 5, b: 5 });  
              
            expect(service.sum).toBeCalledTimes(1);  
            expect(service.sum).toBeCalledWith(5, 5);  
  
              
            service.sum.mockRestore();  
        });  
    });  
});  
```
### [](_docs_0.15_testing.md#Methods)Methods

[Methods](_docs_0.15_services.md#Methods) are private functions that are only available within the service scope. This means that it’s not possible to call them from other services or use the broker to do it. So to test a certain method we need to call it directly from the service instance that implements it.
```
module.exports = {  
    name: "helper",  
  
    methods: {  
        sum(a, b) {  
            return a + b;  
        }  
    }  
};  
```
**Unit tests for the `helper` service methods**
```
describe("Test 'helper' methods", () => {  
    let broker = new ServiceBroker({ logger: false });  
    let service = broker.createService(HelperSchema);  
    beforeAll(() => broker.start());  
    afterAll(() => broker.stop());  
  
    describe("Test 'sum' method", () => {  
        it("should add two numbers", () => {  
              
            const result = service.sum(1, 2);  
  
            expect(result).toBe(3);  
        });  
    });  
});  
```
### [](_docs_0.15_testing.md#Local-Variables)Local Variables

Just as [methods](_docs_0.15_testing.md#Methods), [local variables](_docs_0.15_services.md#Local-Variables) are also only available within the service scope. This means that to test them we need to use the same strategy that is used in methods tests.
```
module.exports = {  
    name: "helper",  
  
      
  
    created() {  
        this.someValue = 123;  
    }  
};  
```
**Unit tests for the `helper` service local variables**
```
describe("Test 'helper' local variables", () => {  
    let broker = new ServiceBroker({ logger: false });  
    let service = broker.createService(HelperSchema);  
    beforeAll(() => broker.start());  
    afterAll(() => broker.stop());  
  
    it("should init 'someValue'", () => {  
        expect(service.someValue).toBe(123);  
    });  
});  
```
## [](_docs_0.15_testing.md#Integration-Tests)Integration Tests

Integration tests involve testing two (or more) services to ensure that the interactions between them work properly.

### [](_docs_0.15_testing.md#Services)Services

Situations when one service depends on another one are very common. The example bellow shows that `notify` action of `users` service depends on the `mail` service. This means that to test the `notify` action we need to mock the `send` action of `email` service.
```
  
module.exports = {  
    name: "users",  
  
    actions: {  
        notify: {  
            handler(ctx) {  
                  
                return ctx.call("mail.send", { message: "Hi there!" });  
            }  
        }  
    }  
};  
```
```
  
module.exports = {  
    name: "mail",  
  
    actions: {  
        send: {  
            handler(ctx) {  
                  
                return "Email Sent";  
            }  
        }  
    }  
};  
```
**Integration tests for `users` service**
```
const { ServiceBroker } = require("moleculer");  
const UsersSchema = require("../../services/users.service");  
const MailSchema = require("../../services/mail.service");  
  
describe("Test 'users' service", () => {  
    let broker = new ServiceBroker({ logger: false });  
    let usersService = broker.createService(UsersSchema);  
  
      
    const mockSend = jest.fn(() => Promise.resolve("Fake Mail Sent"));  
      
    MailSchema.actions.send = mockSend;  
      
    let mailService = broker.createService(MailSchema);  
  
    beforeAll(() => broker.start());  
    afterAll(() => broker.stop());  
  
    describe("Test 'users.notify' action", () => {  
        it("should notify the user", async () => {  
            let result = await broker.call("users.notify");  
  
            expect(result).toBe("Fake Mail Sent");  
              
            expect(mockSend).toBeCalledTimes(1);  
        });  
    });  
});  
```
### [](_docs_0.15_testing.md#API-Gateway)API Gateway

The logic that our services implement is also usually available via [API gateway](_docs_0.15_moleculer-web.md). This means that we also need to write integration tests for the API gateway. The example bellows show to to it:

> **Testing Frameworks**
> 
> Please note that for the API gateway tests we use [supertest](https://github.com/visionmedia/supertest). Again, this is not mandatory and you can use any other tool that offers the same capabilities.
```
  
const ApiGateway = require("moleculer-web");  
  
module.exports = {  
    name: "api",  
    mixins: \[ApiGateway\],  
  
    settings: {  
        port: process.env.PORT || 3000,  
        routes: \[  
            {  
                path: "/api",  
  
                whitelist: \["\*\*"\]  
            }  
        \]  
    }  
};  
```
```
  
module.exports = {  
    name: "users",  
  
    actions: {  
        status: {  
              
            rest: "/users/status",  
            handler(ctx) {  
                  
                return { status: "Active" };  
            }  
        }  
    }  
};  
```
**API integration tests**
```
process.env.PORT = 0;   
  
const request = require("supertest");  
const { ServiceBroker } = require("moleculer");  
  
const APISchema = require("../../services/api.service");  
const UsersSchema = require("../../services/users.service");  
  
describe("Test 'api' endpoints", () => {  
    let broker = new ServiceBroker({ logger: false });  
    let usersService = broker.createService(UsersSchema);  
    let apiService = broker.createService(APISchema);  
  
    beforeAll(() => broker.start());  
    afterAll(() => broker.stop());  
  
    it("test '/api/users/status'", () => {  
        return request(apiService.server)  
            .get("/api/users/status")  
            .then(res => {  
                expect(res.body).toEqual({ status: "Active" });  
            });  
    });  
  
    it("test '/api/unknown-route'", () => {  
        return request(apiService.server)  
            .get("/api/unknown-route")  
            .then(res => {  
                expect(res.statusCode).toBe(404);  
            });  
    });  
});  
```

#### _docs_0.15_tracing.md

> Source: https://moleculer.services/docs/0.15/tracing
> Scraped: 4/13/2025, 3:24:01 AM

Moleculer has a built-in tracing module that collects tracing information inside a Moleculer application. Moreover, you can easily create your custom tracing spans. There are several built-in tracing exporter like [Zipkin](https://zipkin.apache.org/), [Jaeger](https://www.jaegertracing.io/), [Datadog](https://www.datadoghq.com/), etc.

**Enable tracing**
```
  
module.exports = {  
    tracing: true  
};  
```
**Enable tracing with options**
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        exporter: "Console",  
        events: true,  
        stackTrace: true  
    }  
};  
```
## [](_docs_0.15_tracing.md#Options)Options

Name

Type

Default

Description

`enabled`

`Boolean`

`false`

Enable tracing feature.

`exporter`

`Object` or `Array<Object>`

`null`

Tracing exporter configuration. [More info](_docs_0.15_tracing.md#Tracing-Exporters)

`sampling`

`Object`

Sampling settings. [More info](_docs_0.15_tracing.md#Sampling)

`actions`

`Boolean`

`true`

Tracing the service actions.

`events`

`Boolean`

`false`

Tracing the service events.

`errorFields`

`Array<String>`

`["name", "message", "code", "type", "data"]`

Error object fields which are added into span tags.

`stackTrace`

`Boolean`

`false`

Add stack trace info into span tags in case of error.

`tags`

`Object`

`null`

Add custom span tags to all actions and events spans. [More info](_docs_0.15_tracing.md#Global-action-and-event-tags)

`defaultTags`

`Object`

`null`

Default tags. It will be added to all spans.

## [](_docs_0.15_tracing.md#Sampling)Sampling

The Moleculer Tracer supports several sampling methods. The determination whether to sample or not is made on the root span and propagated to all child spans. This ensures that a complete trace is always exported regardless of the sample method or the rate selected.

### [](_docs_0.15_tracing.md#Constant-sampling)Constant sampling

This sampling method uses a constant sampling rate value from `0` to `1`. The `1` means all spans will be sampled, the `0` means none of them.

**Samples all spans**
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        sampling: {  
            rate: 1.0  
        }  
    }  
};  
```
**Samples half of all spans**
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        sampling: {  
            rate: 0.5  
        }  
    }  
};  
```
### [](_docs_0.15_tracing.md#Rate-limiting-sampling)Rate limiting sampling

This sampling method uses a rate limiter. You can configure how many spans will be sampled in a second.

**Samples 2 spans per second**
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        sampling: {  
            tracesPerSecond: 2  
        }  
    }  
};  
```
**Samples 1 span per 10 seconds**
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        sampling: {  
            tracesPerSecond: 0.1  
        }  
    }  
};  
```
## [](_docs_0.15_tracing.md#Tracing-Exporters)Tracing Exporters

The tracing module supports several exporters, custom tracing spans and integration with instrumentation libraries (like [`dd-trace`](https://github.com/DataDog/dd-trace-js)).

### [](_docs_0.15_tracing.md#Console)Console

This is a debugging exporter which prints full local trace to the console.

![Console Trace Graph](https://moleculer.services/docs/0.15/assets/tracing/console.png#zoomable)

> Console exporter can’t follow remote calls, only locals.
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        exporter: {  
            type: "Console",  
            options: {  
                  
                logger: null,  
                  
                colors: true,  
                  
                width: 100,  
                  
                gaugeWidth: 40  
            }  
        }  
    }  
};  
```
### [](_docs_0.15_tracing.md#Datadog)Datadog

Datadog exporter sends tracing data to [Datadog](https://www.datadoghq.com/) server via `dd-trace`.

![Datadog Trace Graph](https://moleculer.services/docs/0.15/assets/tracing/datadog-trace-graph.png#zoomable)
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        exporter: {  
            type: "Datadog",  
            options: {  
                  
                agentUrl: process.env.DD\_AGENT\_URL || "http://localhost:8126",  
                  
                env: process.env.DD\_ENVIRONMENT || null,  
                  
                samplingPriority: "AUTO\_KEEP",  
                  
                defaultTags: null,  
                  
                tracerOptions: null,  
            }  
        }  
    }  
};  
```
> To use this exporter, install the `dd-trace` module with `npm install dd-trace --save` command.

### [](_docs_0.15_tracing.md#Event)Event

Event exporter sends Moleculer events (`$tracing.spans`) with tracing data.
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        exporter: {  
            type: "Event",  
            options: {  
                  
                eventName: "$tracing.spans",  
                  
                sendStartSpan: false,  
                  
                sendFinishSpan: true,  
                  
                broadcast: false,  
                  
                groups: null,  
                  
                interval: 5,  
                  
                spanConverter: null,  
                  
                defaultTags: null  
            }  
        }  
    }  
};  
```
### [](_docs_0.15_tracing.md#Jaeger)Jaeger

Jaeger exporter sends tracing spans information to a [Jaeger](https://www.jaegertracing.io/) server.

![Jaeger Trace Graph](https://moleculer.services/docs/0.15/assets/tracing/jaeger.png#zoomable)
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        exporter: {  
            type: "Jaeger",  
            options: {  
                  
                endpoint: null,  
                  
                host: "127.0.0.1",  
                  
                port: 6832,  
                  
                sampler: {  
                      
                    type: "Const",  
                      
                    options: {}  
                },  
                  
                tracerOptions: {},  
                  
                defaultTags: null  
            }  
        }  
    }  
};  
```
> To use this exporter, install the `jaeger-client` module with `npm install jaeger-client --save` command.

### [](_docs_0.15_tracing.md#Zipkin)Zipkin

Zipkin exporter sends tracing spans information to a [Zipkin](https://zipkin.io/) server.

![Zipkin Trace Graph](https://moleculer.services/docs/0.15/assets/tracing/zipkin.png#zoomable)
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        exporter: {  
            type: "Zipkin",  
            options: {  
                  
                baseURL: "http://localhost:9411",  
                  
                interval: 5,  
                  
                payloadOptions: {  
                      
                    debug: false,  
                      
                    shared: false  
                },  
                  
                defaultTags: null  
            }  
        }  
    }  
};  
```
### [](_docs_0.15_tracing.md#NewRelic)NewRelic

NewRelic exporter sends tracing spans information in Zipkin v2 format to a [NewRelic](https://newrelic.com/) server.
```
  
{  
    tracing: {  
        enabled: true,  
        events: true,  
        exporter: \[  
            {  
                type: 'NewRelic',  
                options: {  
                      
                    baseURL: 'https://trace-api.newrelic.com',  
                      
                    insertKey: 'my-secret-key',  
                      
                    interval: 5,  
                      
                    payloadOptions: {  
                          
                        debug: false,  
                          
                        shared: false,  
                    },  
                      
                    defaultTags: null,  
                },  
            },  
        \],  
    },      
}  
```
### [](_docs_0.15_tracing.md#Customer-Exporter)Customer Exporter

Custom tracing module can be created. We recommend to copy the source of [Console Exporter](https://github.com/moleculerjs/moleculer/blob/master/src/tracing/exporters/console.js) and implement the `init`, `stop`, `spanStarted` and `spanFinished` methods.

**Create custom tracing**
```
const TracerBase = require("moleculer").TracerExporters.Base;  
  
class MyTracingExporters extends TracerBase {  
    init() {  }  
    stop() {  }  
    spanStarted() {  }  
    spanFinished() {  }  
}  
```
**Use custom tracing**
```
  
const MyTracingExporters = require("./my-tracing-exporter");  
  
module.exports = {  
    tracing: {  
        enabled: true,  
        exporter: \[  
            new MyTracingExporters(),  
        \]  
    }  
};  
```
## [](_docs_0.15_tracing.md#Multiple-exporters)Multiple exporters

You can define multiple tracing exporters.
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        exporter: \[  
            "Console",  
            {  
                type: "Zipkin",  
                options: {  
                    baseURL: "http://localhost:9411",  
                }  
            }  
            {  
                type: "Jaeger",  
                options: {  
                    host: "127.0.0.1",  
                }  
            }  
        \]  
    }  
};  
```
## [](_docs_0.15_tracing.md#User-defined-tracing-spans)User-defined tracing spans

To add new spans inside an action or event handler, just call the `ctx.startSpan` and `ctx.finishSpan` methods.
```
  
module.exports = {  
    name: "posts",  
    actions: {  
        async find(ctx) {  
            const span1 = ctx.startSpan("get data from DB", {  
                tags: {  
                    ...ctx.params  
                }  
            });   
            const data = await this.getDataFromDB(ctx.params);  
            ctx.finishSpan(span1);  
  
            const span2 = ctx.startSpan("populating");  
            const res = await this.populate(data);  
            ctx.finishSpan(span2);  
  
            return res;  
        }  
    }  
};  
```
### [](_docs_0.15_tracing.md#Create-span-without-context)Create span without context

If `Context` is not available, you can create spans via `broker.tracer`.
```
  
module.exports = {  
    name: "posts",  
    started() {  
          
        const span = this.broker.tracer.startSpan("initializing db", {  
            tags: {  
                dbHost: this.settings.dbHost  
            }  
        });  
  
        await this.db.connect(this.settings.dbHost);  
  
          
        const span2 = span.startSpan("create tables");  
  
        await this.createDatabaseTables();  
  
          
        span2.finish();  
  
          
        span.finish();  
    }  
};  
```
## [](_docs_0.15_tracing.md#Connecting-spans-while-using-external-communication-module)Connecting spans while using external communication module

It is possible to connect the spans even while communicating via external queue (e.g., [moleculer-channels](https://github.com/moleculerjs/moleculer-channels)). To do it you just need to pass the `parentID` and `requestID` to the handler and then use those IDs to start a custom span.

**Connecting spans**
```
module.exports = {  
	name: "trace",  
	actions: {  
		async extractTraces(ctx) {  
			  
			const { parentID, requestID: traceID } = ctx;  
  
			  
			await this.broker.sendToChannel("trace.setSpanID", {  
				  
				parentID,  
				traceID,  
			});  
		},  
	},  
  
	  
	channels: {  
		"trace.setSpanID"(payload) {  
			  
			const span = this.broker.tracer.startSpan("my.span", payload);  
  
			  
  
			span.finish();   
		},  
	},  
};  
```
## [](_docs_0.15_tracing.md#Customizing)Customizing

### [](_docs_0.15_tracing.md#Custom-Span-Names)Custom Span Names

You can customize the span name of you traces. In this case, you must specify the `spanName` that must be a static `String` or a `Function`.

**Creating a custom name for a trace via Function**
```
  
module.exports = {  
    name: "posts",  
    actions: {  
        get: {  
            tracing: {  
                spanName: ctx => \`Get a post by ID: ${ctx.params.id}\`  
            },  
            async handler(ctx) {  
                  
            }  
        }  
    }  
};  
```
### [](_docs_0.15_tracing.md#Adding-Tags-from-Context)Adding Tags from Context

You can customize what context `params` or `meta` values are added to span tags.

**Default**  
The default behaviour is that add all properties from `ctx.params` only.
```
  
module.exports = {  
    name: "posts",  
    actions: {  
        get: {  
            tracing: {  
                  
                tags: {  
                    params: true,  
                    meta: false,  
                }  
            },  
            async handler(ctx) {  
                  
            }  
        }  
    }  
};  
```
**Custom params example**
```
  
module.exports = {  
    name: "posts",  
    actions: {  
        get: {  
            tracing: {  
                tags: {  
                      
                    params: \["id"\],  
                      
                    meta: \["loggedIn.username"\],  
                      
                    response: \["id", "title"\]  
                }  
            },  
            async handler(ctx) {  
                  
            }  
        }  
    }  
};  
```
**Example with custom function**  
You can define a custom `Function` to fill the span tags from the `Context`.
```
  
module.exports = {  
    name: "posts",  
    actions: {  
        get: {  
            tracing: {  
                tags(ctx, response) {  
                    return {  
                        params: ctx.params,  
                        meta: ctx.meta,  
                        custom: {  
                            a: 5  
                        },  
                        response  
                    };  
                }  
            },  
            async handler(ctx) {  
                  
            }  
        }  
    }  
};  
```
> Please note, when used with an action the function will be called two times in case of successful execution. First with `ctx` and the second time with `ctx` & `response` as the response of the action call.

## [](_docs_0.15_tracing.md#Global-action-and-event-tags)Global action and event tags

Custom action and event span tags can be defined using the `tags` property in the tracer [options](_docs_0.15_tracing.md#Options). These will be applied to all action and event spans unless overridden in the service schema’s action and event definitions. All custom tag types defined [above](_docs_0.15_tracing.md#Customizing) are valid. Any tags defined in the service schema’s action and event definitions will take precendence but the merge of `params`, `meta`, and `response` tag definitions are shallow, meaning that it is possible to do things like define `meta` tags globally and `response` tags locally in each service.
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        tags: {  
            action: {  
                  
                params: false,  
                  
                meta: \["loggedIn.username"\],  
                  
                response: true,  
            },  
            event(ctx) {  
                return {  
                    params: ctx.params,  
                    meta: ctx.meta,  
                      
                    caller: ctx.caller,  
                    custom: {  
                        a: 5  
                    },  
                };  
            },              
        }  
    }  
};  
```
> Custom tags defined using the `tags` property have access to `ctx` and if used with an action the `response`. The tags defined in `defaultTags` must either be a static object or a function that accepts the `tracer` instance and returns an object. It also has access to the `broker` instance via the `tracer` instance but does not have access to `ctx`.

**Example of Event tracing**  
You can tracing the events, as well. To enable it, set `events: true` in tracing broker options.
```
  
module.exports = {  
    tracing: {  
        enabled: true,  
        events: true  
    }  
};  
```
## [](_docs_0.15_tracing.md#safetyTags-and-Maximum-call-stack-error)safetyTags and Maximum call stack error

In general, sending non-serializable parameters (e.g. http request, socket instance, stream instance, etc.) in `ctx.params` or `ctx.meta` is not recommended. If tracing is enabled, the tracer exporter will try to recursively flatten these params (with [`flattenTags` method](https://github.com/moleculerjs/moleculer/blob/c48d5a05a4f4a1656075faaabc64085ccccf7ef9/src/tracing/exporters/base.js#L87-L101)) which will cause the `Maximum call stack error`.

To avoid this issue, you can use the `safetyTags` option in exporter options. If set to `true`, the exporters remove the cyclic properties before flattening the tags in the spans. This option is available in all built-in exporters.

> **Performance impact**
> 
> Please note, this option has a **significant** [impact in performance](https://github.com/moleculerjs/moleculer/issues/908#issuecomment-817806332). For this reason it’s not enabled by default.

**Enabling globally the safetyTags**
```
  
{  
    tracing: {  
        exporter: \[{  
            type: "Zipkin",  
            options: {  
                safetyTags: true,  
                baseURL: "http://127.0.0.1:9411"  
            }  
        }\]  
    }  
}  
```
To avoid affecting all actions, you can enable this function at action-level. In this case, the remaining actions will be unaffected.  
**Enabling safetyTags at action-level**
```
broker.createService({  
    name: "greeter",  
    actions: {  
        hello: {  
            tracing: {  
                safetyTags: true  
            },  
            handler(ctx) {  
                return \`Hello!\`;  
            }  
        }  
    }  
});  
```

#### _docs_0.15_usage.html.md

> Source: https://moleculer.services/docs/0.15/usage.html
> Scraped: 4/13/2025, 3:24:07 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/usage.md)

## [](_docs_0.15_usage.html.md#Install-Moleculer)Install Moleculer

Moleculer can be installed with `npm` or `yarn`.
```
$ npm i moleculer --save  
```
## [](_docs_0.15_usage.html.md#Create-your-first-microservice)Create your first microservice

This basic example shows how to create a small `math` service to add two numbers and call it locally.
```
const { ServiceBroker } = require("moleculer");  
  
  
const broker = new ServiceBroker();  
  
  
broker.createService({  
    name: "math",  
    actions: {  
        add(ctx) {  
            return Number(ctx.params.a) + Number(ctx.params.b);  
        }  
    }  
});  
  
  
broker.start()  
      
    .then(() => broker.call("math.add", { a: 5, b: 3 }))  
      
    .then(res => console.log("5 + 3 =", res))  
    .catch(err => console.error(\`Error occured! ${err.message}\`));  
```
> **Try it in your browser!**
> 
> Open this example on [Runkit!](https://runkit.com/icebob/moleculer-usage)

## [](_docs_0.15_usage.html.md#Create-a-Moleculer-project)Create a Moleculer project

In this example we use the official [Moleculer CLI tool](_docs_0.15_moleculer-cli.md) to create a new Moleculer-based microservices project with a sample service and an API Gateway to call it from the browser via REST API.

1.  Install `moleculer-cli` globally
    
    ```
    $ npm i moleculer-cli -g  
    
    ```
    
2.  Create a new project (named `moleculer-demo`)
    
    ```
    $ moleculer init project moleculer-demo  
    
    ```
    
    ![](https://moleculer.services/docs/0.15/assets/usage/usage-demo-1.gif)
    
    > Press `ENTER` to all questions _(accept default answers)_
    
    > Don’t forget to install and start [NATS Server](https://docs.nats.io/nats-server/installation). Otherwise, you will get the following error:  
    > `NATS error. Could not connect to server: Error: connect ECONNREFUSED 127.0.0.1:4222`
    
3.  Open project folder
    
    ```
    $ cd moleculer-demo  
    
    ```
    
4.  Start project
    
    ```
    $ npm run dev  
    
    ```
    
    ![](https://moleculer.services/docs/0.15/assets/usage/usage-demo-2.gif)
    
5.  Open the [http://localhost:3000/](http://localhost:3000/) link in your browser. It shows a start page which contains two links to call the `greeter` service via [API gateway](https://github.com/moleculerjs/moleculer-web).
    

> **Congratulations!**
> 
> You have just created your first Moleculer-based microservices project! Next, check out Moleculer’s [core concepts](_docs_0.15_concepts.md) page to get familiar with them and to see how they fit together. Otherwise, check our [examples](_docs_0.15_examples.md) or [demo projects](https://github.com/moleculerjs/moleculer-examples).

You can also check the video below that explains ins and outs of the project that you’ve just created.

## [](_docs_0.15_usage.html.md#Moleculer-Demo-Playground)Moleculer Demo Playground

If you don’t want to install [moleculer-demo](_docs_0.15_usage.md#Create-a-Moleculer-project) on your machine you can use interactive playground.

#### _docs_0.15_usage.md

> Source: https://moleculer.services/docs/0.15/usage
> Scraped: 4/13/2025, 3:24:04 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/usage.md)

## [](_docs_0.15_usage.md#Install-Moleculer)Install Moleculer

Moleculer can be installed with `npm` or `yarn`.
```
$ npm i moleculer --save  
```
## [](_docs_0.15_usage.md#Create-your-first-microservice)Create your first microservice

This basic example shows how to create a small `math` service to add two numbers and call it locally.
```
const { ServiceBroker } = require("moleculer");  
  
  
const broker = new ServiceBroker();  
  
  
broker.createService({  
    name: "math",  
    actions: {  
        add(ctx) {  
            return Number(ctx.params.a) + Number(ctx.params.b);  
        }  
    }  
});  
  
  
broker.start()  
      
    .then(() => broker.call("math.add", { a: 5, b: 3 }))  
      
    .then(res => console.log("5 + 3 =", res))  
    .catch(err => console.error(\`Error occured! ${err.message}\`));  
```
> **Try it in your browser!**
> 
> Open this example on [Runkit!](https://runkit.com/icebob/moleculer-usage)

## [](_docs_0.15_usage.md#Create-a-Moleculer-project)Create a Moleculer project

In this example we use the official [Moleculer CLI tool](_docs_0.15_moleculer-cli.md) to create a new Moleculer-based microservices project with a sample service and an API Gateway to call it from the browser via REST API.

1.  Install `moleculer-cli` globally
    
    ```
    $ npm i moleculer-cli -g  
    
    ```
    
2.  Create a new project (named `moleculer-demo`)
    
    ```
    $ moleculer init project moleculer-demo  
    
    ```
    
    ![](https://moleculer.services/docs/0.15/assets/usage/usage-demo-1.gif)
    
    > Press `ENTER` to all questions _(accept default answers)_
    
    > Don’t forget to install and start [NATS Server](https://docs.nats.io/nats-server/installation). Otherwise, you will get the following error:  
    > `NATS error. Could not connect to server: Error: connect ECONNREFUSED 127.0.0.1:4222`
    
3.  Open project folder
    
    ```
    $ cd moleculer-demo  
    
    ```
    
4.  Start project
    
    ```
    $ npm run dev  
    
    ```
    
    ![](https://moleculer.services/docs/0.15/assets/usage/usage-demo-2.gif)
    
5.  Open the [http://localhost:3000/](http://localhost:3000/) link in your browser. It shows a start page which contains two links to call the `greeter` service via [API gateway](https://github.com/moleculerjs/moleculer-web).
    

> **Congratulations!**
> 
> You have just created your first Moleculer-based microservices project! Next, check out Moleculer’s [core concepts](_docs_0.15_concepts.md) page to get familiar with them and to see how they fit together. Otherwise, check our [examples](_docs_0.15_examples.md) or [demo projects](https://github.com/moleculerjs/moleculer-examples).

You can also check the video below that explains ins and outs of the project that you’ve just created.

## [](_docs_0.15_usage.md#Moleculer-Demo-Playground)Moleculer Demo Playground

If you don’t want to install [moleculer-demo](_docs_0.15_usage.md#Create-a-Moleculer-project) on your machine you can use interactive playground.

#### _docs_0.15_validating.md

> Source: https://moleculer.services/docs/0.15/validating
> Scraped: 4/13/2025, 3:24:00 AM

You are viewing documentation for a beta release that is currently undergoing final testing before its official release. For the latest stable version [click here.](_docs_0.14_.md)

[](https://github.com/moleculerjs/site/edit/master/source/docs/0.15/validating.md)

Validation middleware is used for [Actions](_docs_0.15_actions.md) and [Events](_docs_0.15_events.md) parameter validation.

## [](_docs_0.15_validating.md#Fastest-Validator)Fastest Validator

By default, Moleculer uses the [fastest-validator](https://github.com/icebob/fastest-validator) library.

**Default usage**
```
  
module.exports = {  
    nodeID: "node-100",  
    validator: true   
}  
```
**Setting validator by name**
```
  
module.exports = {  
    nodeID: "node-100",  
    validator: "Fastest"   
}  
```
**Example with options**
```
  
module.exports = {  
    nodeID: "node-100",  
    validator: {  
        type: "Fastest",  
        options: {  
            useNewCustomCheckerFunction: true,  
            defaults: {  },  
            messages: {  },  
            aliases: {  }  
        }  
    }  
}  
```
### [](_docs_0.15_validating.md#Actions-Validation)Actions Validation

In order to perform parameter validation you need to define `params` property in action definition and create validation schema for the incoming `ctx.params`.

**Example**
```
const { ServiceBroker } = require("moleculer");  
  
const broker = new ServiceBroker({  
    validator: true   
});  
  
broker.createService({  
    name: "say",  
    actions: {  
        hello: {  
              
            params: {  
                name: { type: "string", min: 2 }  
            },  
            handler(ctx) {  
                return "Hello " + ctx.params.name;  
            }  
        }  
    }  
});  
  
broker.call("say.hello").then(console.log)  
    .catch(err => console.error(err.message));  
  
  
broker.call("say.hello", { name: 123 }).then(console.log)  
    .catch(err => console.error(err.message));  
  
  
broker.call("say.hello", { name: "Walter" }).then(console.log)  
    .catch(err => console.error(err.message));  
  
```
[Play it on Runkit](https://runkit.com/icebob/moleculer-validation-example)

**Example validation schema**
```
{  
    id: { type: "number", positive: true, integer: true },  
    name: { type: "string", min: 3, max: 255 },  
    status: "boolean"   
}  
```
> **Documentation**
> 
> Find more information about validation schema in the [documentation of the library](https://github.com/icebob/fastest-validator#readme)

#### [](_docs_0.15_validating.md#Async-custom-validator)Async custom validator

FastestValidator (`>= v1.11.0`) supports async custom validators, meaning that you can [pass metadata for custom validator functions](https://github.com/icebob/fastest-validator/blob/master/CHANGELOG.md#meta-information-for-custom-validators). In Moleculer, the FastestValidator passes the `ctx` as metadata. It means you can access the current context, service, broker. This allows you to make async calls (e.g calling another service) in custom checker functions. To enable it you must set `useNewCustomCheckerFunction` to `true` in `moleculer.config.js`

**Enabling custom async validation**
```
  
module.exports = {  
    validator: {  
        type: "FastestValidator",  
        options: {  
            useNewCustomCheckerFunction: true,  
            defaults: {  },  
            messages: {  },  
            aliases: {  }  
        }  
    }  
}  
```
**Using custom async validation**
```
  
module.exports = {  
    name: "posts",  
    actions: {  
        params: {  
            $$async: true,  
            owner: { type: "string", custom: async (value, errors, schema, name, parent, context) => {  
                const ctx = context.meta;  
  
                const res = await ctx.call("users.isValid", { id: value });  
                if (res !== true)  
                    errors.push({ type: "invalidOwner", field: "owner", actual: value });  
                return value;  
            } },   
        },  
          
    }  
}  
```
### [](_docs_0.15_validating.md#Events-Validation)Events Validation

Event parameter validation is also supported. To enable it, define `params` in event definition.

> Please note that the validation errors are not sent back to the caller, as happens with action errors. Event validation errors are logged but you can also catch them with the [global error handler](_docs_0.15_broker.md#Global-error-handler).
```
  
module.exports = {  
    name: "mailer",  
    events: {  
        "send.mail": {  
              
              
            params: {  
                from: "string|optional",  
                to: "email",  
                subject: "string"  
            },  
            handler(ctx) {  
                this.logger.info("Event received, parameters OK!", ctx.params);  
            }  
        }  
    }  
};  
```
## [](_docs_0.15_validating.md#Custom-validator)Custom validator

You can also implement custom validators. We recommend to copy the source of [Fastest Validator](https://github.com/moleculerjs/moleculer/blob/master/src/validators/fastest.js) and implement the `compile` and `validate` methods.

**Creating custom validator**
```
  
const BaseValidator = require("moleculer").Validators.Base;  
  
class MyValidator extends BaseValidator {}  
  
module.exports = {  
    nodeID: "node-100",  
    validator: new MyValidator()  
}  
```
**Build Joi validator**
```
const { ServiceBroker } = require("moleculer");  
const BaseValidator = require("moleculer").Validators.Base;  
const { ValidationError } = require("moleculer").Errors;  
const Joi = require("joi");  
  
  
class JoiValidator extends BaseValidator {  
	constructor() {  
		super();  
	}  
  
	compile(schema) {  
		return (params) => this.validate(params, schema);  
	}  
  
	validate(params, schema) {  
		const res = schema.validate(params);  
		if (res.error)  
			throw new ValidationError(res.error.message, null, res.error.details);  
  
		return true;  
	}  
}  
  
let broker = new ServiceBroker({  
	logger: true,  
	validator: new JoiValidator   
});  
  
  
  
broker.createService({  
	name: "greeter",  
	actions: {  
		hello: {  
			  
  
  
			params: Joi.object().keys({  
				name: Joi.string().min(4).max(30).required()  
			}),  
			handler(ctx) {  
				return \`Hello ${ctx.params.name}\`;  
			}  
		}  
	}  
});  
  
broker.start()  
	.then(() => broker.call("greeter.hello").then(res => broker.logger.info(res)))  
	.catch(err => broker.logger.error(err.message, err.data))  
	  
	.then(() => broker.call("greeter.hello", { name: 100 }).then(res => broker.logger.info(res)))  
	.catch(err => broker.logger.error(err.message, err.data))  
	  
	.then(() => broker.call("greeter.hello", { name: "Joe" }).then(res => broker.logger.info(res)))  
	.catch(err => broker.logger.error(err.message, err.data))  
	  
	.then(() => broker.call("greeter.hello", { name: "John" }).then(res => broker.logger.info(res)))  
	.catch(err => broker.logger.error(err.message, err.data));  
```
> **Find more validators**
> 
> [Check the modules page and find more validators.](_modules.md#validation)

