---
url: https://babeljs.io/docs/babel-plugin-proposal-function-bind
scrapeDate: 2025-03-31T20:55:11.538Z
library: docs

exactVersionMatch: false
---

## Detail[​](_docs_babel-plugin-proposal-function-bind.md#detail)

JavaScript
```
obj::func;  
// is equivalent to:  
func.bind(obj)  
  
::obj.func;  
// is equivalent to:  
obj.func.bind(obj);  
  
obj::func(val);  
// is equivalent to:  
func  
  .call(obj, val)  
::obj.func(val);  
// is equivalent to:  
obj.func.call(obj, val);  
```
## Example[​](_docs_babel-plugin-proposal-function-bind.md#example)

### Basic[​](_docs_babel-plugin-proposal-function-bind.md#basic)

JavaScript
```
const box = {  
  weight: 2,  getWeight() {    return this.weight;  },};  
  
const { getWeight } = box;  
  
console.log(box.getWeight()); // prints '2'  
  
const bigBox = { weight: 10 };  
console.log(bigBox::getWeight()); // prints '10'  
  
// Can be chained:  
function add(val) {  
  return this + val;}  
  
console.log(bigBox::getWeight()::add(5)); // prints '15'  
```
### Using with `document.querySelectorAll`[​](_docs_babel-plugin-proposal-function-bind.md#using-with-documentqueryselectorall)

It can be very handy when used with `document.querySelectorAll`:

JavaScript
```
const { map, filter } = Array.prototype;  
  
let sslUrls = document  
  .querySelectorAll("a")  ::map(node => node.href)  ::filter(href => href.substring(0, 5) === "https");  
console.log(sslUrls);  
```
`document.querySelectorAll` returns a `NodeList` element which is not a plain array, so you normally can't use the `map` function on it, and have to use it this way: `Array.prototype.map.call(document.querySelectorAll(...), node => { ... })`. The above code using the `::` will work because it is equivalent to:

JavaScript
```
const { map, filter } = Array.prototype;  
  
let sslUrls = document.querySelectorAll("a");  
sslUrls = map.call(sslUrls, node => node.href);  
sslUrls = filter.call(sslUrls, href => href.substring(0, 5) === "https");  
  
console.log(sslUrls);  
```
### Auto self binding[​](_docs_babel-plugin-proposal-function-bind.md#auto-self-binding)

When nothing is specified before the `::` operator, the function is bound to its object:

JavaScript
```
$(".some-link").on("click", ::view.reset);  
// is equivalent to:  
$(".some-link").on("click", view.reset.bind(view));  
```
## Installation[​](_docs_babel-plugin-proposal-function-bind.md#installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/plugin-proposal-function-bind  
```
## Usage[​](_docs_babel-plugin-proposal-function-bind.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-plugin-proposal-function-bind.md#with-a-configuration-file-recommended)

babel.config.json
```
{  
  "plugins": ["@babel/plugin-proposal-function-bind"]}  
```
### Via CLI[​](_docs_babel-plugin-proposal-function-bind.md#via-cli)

Shell
```
babel --plugins @babel/plugin-proposal-function-bind script.js  
```
### Via Node API[​](_docs_babel-plugin-proposal-function-bind.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  plugins: ["@babel/plugin-proposal-function-bind"],});  
```
## References[​](_docs_babel-plugin-proposal-function-bind.md#references)
*   [Proposal](https://github.com/zenparsing/es-function-bind)
*   [Babel Blog: Function Bind Syntax](_blog_2015_05_14_function-bind.md)