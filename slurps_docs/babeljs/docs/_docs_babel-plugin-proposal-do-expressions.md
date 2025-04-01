---
url: https://babeljs.io/docs/babel-plugin-proposal-do-expressions
scrapeDate: 2025-03-31T20:55:11.351Z
library: docs

exactVersionMatch: false
---

## Detail[​](_docs_babel-plugin-proposal-do-expressions.md#detail)

> The `do { .. }` expression executes a block (with one or many statements in it), and the final statement completion value inside the block becomes the completion value of the do expression.

from [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch5.md#statement-completion-values), Types & Grammar -> Chapter 5 -> Section Statement Completion Values

It can be seen as a complex version of the [ternary operator](http://mdn.io/ternary):

JavaScript
```
let a = do {  
  if (x > 10) {    ("big");  } else {    ("small");  }};  
// is equivalent to:  
let a = x > 10 ? "big" : "small";  
```
This example is not the best usage because it is too simple and using a ternary operator is a better option but you can have a much more complex condition in the `do { ... }` expression with several `if ... else` chains:

JavaScript
```
let x = 100;  
let y = 20;  
  
let a = do {  
  if (x > 10) {    if (y > 20) {      ("big x, big y");    } else {      ("big x, small y");    }  } else {    if (y > 10) {      ("small x, big y");    } else {      ("small x, small y");    }  }};  
```
## Example[​](_docs_babel-plugin-proposal-do-expressions.md#example)

### In JSX[​](_docs_babel-plugin-proposal-do-expressions.md#in-jsx)

One of the most useful usage of the `do` expression is inside JSX. If we want to conditionally display a component we usually have to call another function which would implement the condition and return the correct value, for example:

JavaScript
```
const getColoredComponent = color => {  
  if (color === "blue") {    return <BlueComponent />;  }  if (color === "red") {    return <RedComponent />;  }  if (color === "green") {    return <GreenComponent />;  }};  
  
const Component = props => (  
  <div className="myComponent">{getColoredComponent()}</div>);  
```
Using a do expression you can add logic inside JSX:

JavaScript
```
const Component = props => (  
  <div className="myComponent">    {do {      if (color === "blue") {        <BlueComponent />;      } else if (color === "red") {        <RedComponent />;      } else if (color === "green") {        <GreenComponent />;      }    }}  </div>);  
```
## Installation[​](_docs_babel-plugin-proposal-do-expressions.md#installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/plugin-proposal-do-expressions  
```
## Usage[​](_docs_babel-plugin-proposal-do-expressions.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-plugin-proposal-do-expressions.md#with-a-configuration-file-recommended)

babel.config.json
```
{  
  "plugins": ["@babel/plugin-proposal-do-expressions"]}  
```
### Via CLI[​](_docs_babel-plugin-proposal-do-expressions.md#via-cli)

Shell
```
babel --plugins @babel/plugin-proposal-do-expressions script.js  
```
### Via Node API[​](_docs_babel-plugin-proposal-do-expressions.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  plugins: ["@babel/plugin-proposal-do-expressions"],});  
```
## References[​](_docs_babel-plugin-proposal-do-expressions.md#references)
*   [Proposal: `do` expressions](https://github.com/tc39/proposal-do-expressions)
*   [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch5.md#statement-completion-values)
*   Very handy for conditions inside JSX: [reactjs/react-future#35](https://github.com/reactjs/react-future/issues/35#issuecomment-120009203)