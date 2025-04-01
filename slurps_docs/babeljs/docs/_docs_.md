---
url: https://babeljs.io/docs/
scrapeDate: 2025-03-31T20:55:05.520Z
library: docs

exactVersionMatch: false
---

## Babel is a JavaScript compiler[​](_docs_.md#babel-is-a-javascript-compiler)

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. Here are the main things Babel can do for you:
*   Transform syntax
*   Polyfill features that are missing in your target environment (through a third-party polyfill such as [core-js](https://github.com/zloirock/core-js))
*   Source code transformations (codemods)
*   And more! (check out these [videos](_videos.md) for inspiration)

JavaScript
```
// Babel Input: ES2015 arrow function  
[1, 2, 3].map(n => n + 1);  
  
// Babel Output: ES5 equivalent  
[1, 2, 3].map(function(n) {  
  return n + 1;});  
```
tip

For an awesome tutorial on compilers, check out [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler), which also explains how Babel itself works on a high level.

## ES2015 and beyond[​](_docs_.md#es2015-and-beyond)

Babel has support for the latest version of JavaScript through syntax transformers.

These [plugins](_docs_plugins-list.md) allow you to use new syntax, **right now** without waiting for browser support. Check out our [usage guide](_docs_usage.md) to get started.

## JSX and React[​](_docs_.md#jsx-and-react)

Babel can convert JSX syntax! Check out our [React preset](_docs_babel-preset-react.md) to get started. Use it together with the [babel-sublime](https://github.com/babel/babel-sublime) package to bring syntax highlighting to a whole new level.

You can install this preset with
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/preset-react  
```
and add `@babel/preset-react` to your Babel configuration.

JSX
```
export default function DiceRoll(){  
  const getRandomNumber = () => {    return Math.ceil(Math.random() * 6);  };  
  const [num, setNum] = useState(getRandomNumber());  
  const handleClick = () => {    const newNum = getRandomNumber();    setNum(newNum);  };  
  return (    <div>      Your dice roll: {num}.      <button onClick={handleClick}>Click to get a new number</button>    </div>  );};  
```
## Type Annotations (Flow and TypeScript)[​](_docs_.md#type-annotations-flow-and-typescript)

Babel can strip out type annotations! Check out either our [Flow preset](_docs_babel-preset-flow.md) or [TypeScript preset](_docs_babel-preset-typescript.md) to get started. Keep in mind that **Babel doesn't do type checking**; you'll still have to install and use Flow or TypeScript to check types.

You can install the flow preset with
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/preset-flow  
```
JavaScript
```
// @flow  
function square(n: number): number {  
  return n * n;}  
```
or the typescript preset with
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/preset-typescript  
```
JavaScript
```
function Greeter(greeting: string) {  
  this.greeting = greeting;}  
```
## Pluggable[​](_docs_.md#pluggable)

Babel is built out of plugins. Compose your own transformation pipeline using existing plugins or write your own. Easily use a set of plugins by using or creating a [preset](_docs_plugins.md#presets). [Learn more →](_docs_plugins.md)

Create a plugin on the fly with [astexplorer.net](https://astexplorer.net/#/KJ8AjD6maa) or use [generator-babel-plugin](https://github.com/babel/generator-babel-plugin) to generate a plugin template.

example-babel-plugin.js
```
// A plugin is just a function  
export default function({ types: t }) {  
  return {    visitor: {      Identifier(path) {        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ        path.node.name = [...name]          .reverse()          .join("");      },    },  };}  
```
## Debuggable[​](_docs_.md#debuggable)

**Source map** support so you can debug your compiled code with ease.

## Spec Compliant[​](_docs_.md#spec-compliant)

Babel tries to stay true to the ECMAScript standard, as much as reasonably possible. It may also have specific options to be more spec compliant as a tradeoff to performance.

## Compact[​](_docs_.md#compact)

Babel tries using the least amount of code possible with no dependence on a bulky runtime.

This may be difficult to do in cases, and there are ["assumptions"](_docs_assumptions.md) options that tradeoff spec compliancy for readability, file size, and speed.