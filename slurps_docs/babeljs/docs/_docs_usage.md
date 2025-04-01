---
url: https://babeljs.io/docs/usage
scrapeDate: 2025-03-31T20:55:08.866Z
library: docs

exactVersionMatch: false
---

There are quite a few tools in the Babel toolchain that try to make it easy for you to use Babel whether you're an "end-user" or building an integration of Babel itself. This will be a quick introduction to those tools and you can read more about them in the "Usage" section of the docs.

> If you're using a framework, the work of configuring Babel might be different or actually already handled for you. Check out our [interactive setup guide](_setup.md) instead.

## Overview[​](_docs_usage.md#overview)

This guide will show you how to compile your JavaScript application code that uses ES2015+ syntax into code that works in current browsers. That will involve both transforming new syntax and polyfilling missing features.

The entire process to set this up involves:

1.  Running these commands to install the packages:
    
    *   npm
    *   Yarn
    *   pnpm
    
    ```
    npm install --save-dev @babel/core @babel/cli @babel/preset-env  
    
    ```
    
2.  Creating a config file named `babel.config.json` (requires `v7.8.0` and above) in the root of your project with this content:
    
    babel.config.json
    
    ```
    {  
      "presets": [    [      "@babel/preset-env",      {        "targets": {          "edge": "17",          "firefox": "60",          "chrome": "67",          "safari": "11.1"        },        "useBuiltIns": "usage",        "corejs": "3.6.5"      }    ]  ]}  
    
    ```
    
    > The browsers list above is just an arbitrary example. You will have to adapt it for the browsers you want to support. See [here](_docs_babel-preset-env.md) for more `@babel/preset-env` options.
    

Or `babel.config.js` if you are using an older Babel version

babel.config.js
```
const presets = [  
  [    "@babel/preset-env",    {      targets: {        edge: "17",        firefox: "60",        chrome: "67",        safari: "11.1",      },      useBuiltIns: "usage",      corejs: "3.6.4",    },  ],];  
  
module.exports = { presets };  
```
1.  And running this command to compile all your code from the `src` directory to `lib`:
    
    Shell
    
    ```
    ./node_modules/.bin/babel src --out-dir lib  
    
    ```
    
    > You can use the npm package runner that comes with npm@5.2.0 to shorten that command by replacing `./node_modules/.bin/babel` with `npx babel`
    

Read on for a step-by-step explanation of how this works and an introduction to each of the tools used.

## Basic usage with CLI[​](_docs_usage.md#basic-usage-with-cli)

All the Babel modules you'll need are published as separate npm packages scoped under `@babel` (since version 7). This modular design allows for various tools each designed for a specific use case. Here we'll look at `@babel/core` and `@babel/cli`.

### Core Library[​](_docs_usage.md#core-library)

The core functionality of Babel resides at the [@babel/core](_docs_babel-core.md) module. After installing it:
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/core  
```
you can `require` it directly in your JavaScript program and use it like this:

JavaScript
```
const babel = require("@babel/core");  
  
babel.transformSync("code", optionsObject);  
```
As an end-user though, you'll probably want to install other tools that serve as an interface to `@babel/core` and integrate well with your development process. Even so, you might still want to check its documentation page to learn about the options, most of which can be set from the other tools as well.

### CLI tool[​](_docs_usage.md#cli-tool)

[@babel/cli](_docs_babel-cli.md) is a tool that allows you to use babel from the terminal. Here's the installation command and a basic usage example:
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/core @babel/cli  
  
./node_modules/.bin/babel src --out-dir lib  
```
This will parse all the JavaScript files in the `src` directory, apply any transformations we have told it to, and output each file to the `lib` directory. Since we haven't told it to apply any transformations yet, the output code will be identical to the input (exact code styling is not preserved). We can specify what transformations we want by passing them as options.

We used the `--out-dir` option above. You can view the rest of the options accepted by the cli tool by running it with `--help`. But the most important to us right now are `--plugins` and `--presets`.

## Plugins & Presets[​](_docs_usage.md#plugins--presets)

Transformations come in the form of plugins, which are small JavaScript programs that instruct Babel on how to carry out transformations to the code. You can even write your own plugins to apply any transformations you want to your code. To transform ES2015+ syntax into ES5 we can rely on official plugins like `@babel/plugin-transform-arrow-functions`:
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/plugin-transform-arrow-functions  
  
./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions  
```
Now any arrow functions in our code will be transformed into ES5 compatible function expressions:

JavaScript
```
const fn = () => 1;  
  
// converted to  
  
var fn = function fn() {  
  return 1;};  
```
That's a good start! But we also have other ES2015+ features in our code that we want transformed. Instead of adding all the plugins we want one by one, we can use a "preset" which is just a pre-determined set of plugins.

Just like with plugins, you can create your own presets too to share any combination of plugins you need. For our use case here, there's an excellent preset named `env`.
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/preset-env  
  
./node_modules/.bin/babel src --out-dir lib --presets=@babel/env  
```
Without any configuration, this preset will include all plugins to support modern JavaScript (ES2015, ES2016, etc.). But presets can take options too. Rather than passing both cli and preset options from the terminal, let's look at another way of passing options: configuration files.

## Configuration[​](_docs_usage.md#configuration)

> There are a few different ways to use configuration files depending on your needs. Be sure to read our in-depth guide on how to [configure Babel](_docs_configuration.md) for more information.

For now, let's create a file called `babel.config.json` (requires `v7.8.0` and above) with the following content:

babel.config.json
```
{  
  "presets": [    [      "@babel/preset-env",      {        "targets": {          "edge": "17",          "firefox": "60",          "chrome": "67",          "safari": "11.1"        }      }    ]  ]}  
```
Now the `env` preset will only load transformation plugins for features that are not available in our target browsers. We're all set for syntax. Let's look at polyfills next.

## Polyfill[​](_docs_usage.md#polyfill)

> 🚨 As of Babel 7.4.0, this package has been deprecated in favor of directly including `core-js/stable` (to polyfill ECMAScript features):
> 
> If you are compiling generators or async function to ES5, and you are using a version of `@babel/core` or `@babel/plugin-transform-regenerator` older than `7.18.0`, you must also load the [`regenerator runtime`](https://github.com/facebook/regenerator/tree/main/packages/runtime) package. It is automatically loaded when using `@babel/preset-env`'s `useBuiltIns: "usage"` option or `@babel/plugin-transform-runtime`.

The [@babel/polyfill](_docs_babel-polyfill.md) module includes [core-js](https://github.com/zloirock/core-js) and a custom [regenerator runtime](https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js) to emulate a full ES2015+ environment.

This means you can use new built-ins like `Promise` or `WeakMap`, static methods like `Array.from` or `Object.assign`, instance methods like `Array.prototype.includes`, and generator functions (when used alongside the regenerator plugin). The polyfill adds to the global scope as well as native prototypes like `String` in order to do this.

For library/tool authors this may be too much. If you don't need the instance methods like `Array.prototype.includes` you can do without polluting the global scope altogether by using the [transform runtime](_docs_babel-plugin-transform-runtime.md) plugin instead of `@babel/polyfill`.

To go one step further, if you know exactly what features you need polyfills for, you can require them directly from [core-js](https://github.com/zloirock/core-js#commonjs).

Since we're building an application we can just install `@babel/polyfill`:
*   npm
*   Yarn
*   pnpm
```
npm install --save @babel/polyfill  
```
> Note the `--save` option instead of `--save-dev` as this is a polyfill that needs to run before your source code.

Now luckily for us, we're using the `env` preset which has a `"useBuiltIns"` option that when set to `"usage"` will practically apply the last optimization mentioned above where you only include the polyfills you need. With this new option the configuration changes like this:

babel.config.json
```
{  
  "presets": [    [      "@babel/preset-env",      {        "targets": {          "edge": "17",          "firefox": "60",          "chrome": "67",          "safari": "11.1"        },        "useBuiltIns": "usage"      }    ]  ]}  
```
Babel will now inspect all your code for features that are missing in your target environments and include only the required polyfills. For example this code:

JavaScript
```
Promise.resolve().finally();  
```
would turn into this (because Edge 17 doesn't have `Promise.prototype.finally`):

JavaScript
```
require("core-js/modules/es.promise.finally");  
  
Promise.resolve().finally();  
```
If we weren't using the `env` preset with the `"useBuiltIns"` option set to `"usage"` (defaults to "false") we would've had to require the full polyfill _only once_ in our entry point before any other code.

For example:

babel.config.json
```
{  
  "presets": [    [      "@babel/preset-env",      {        "targets": {          "edge": "17",          "firefox": "60",          "chrome": "67",          "safari": "11.1"        },        "useBuiltIns": "entry"      }    ]  ]}  
```
Then import [core-js](https://github.com/zloirock/core-js) (to polyfill ECMAScript features) first, in our entry file to emulate a full ES2015+ environment since [@babel/polyfill](_docs_babel-polyfill.md) has been [deprecated](_docs_usage.md#polyfill-deprecated):

## Summary[​](_docs_usage.md#summary)

We used `@babel/cli` to run Babel from the terminal, `@babel/polyfill` to polyfill all the new JavaScript features, and the `env` preset to only include the transformations and polyfills for the features that we use and that are missing in our target browsers.

For more information on setting up Babel with your build system, IDE, and more, check out our [interactive setup guide](_setup.md).