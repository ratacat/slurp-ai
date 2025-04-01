---
url: https://babeljs.io/docs/babel-plugin-proposal-export-default-from
scrapeDate: 2025-03-31T20:55:11.366Z
library: docs

exactVersionMatch: false
---

## Example[​](_docs_babel-plugin-proposal-export-default-from.md#example)

## Installation[​](_docs_babel-plugin-proposal-export-default-from.md#installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/plugin-proposal-export-default-from  
```
## Usage[​](_docs_babel-plugin-proposal-export-default-from.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-plugin-proposal-export-default-from.md#with-a-configuration-file-recommended)

babel.config.json
```
{  
  "plugins": ["@babel/plugin-proposal-export-default-from"]}  
```
### Via CLI[​](_docs_babel-plugin-proposal-export-default-from.md#via-cli)

Shell
```
babel --plugins @babel/plugin-proposal-export-default-from script.js  
```
### Via Node API[​](_docs_babel-plugin-proposal-export-default-from.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  plugins: ["@babel/plugin-proposal-export-default-from"],});  
```
## References[​](_docs_babel-plugin-proposal-export-default-from.md#references)
*   [Proposal: Additional export-from statements in ES7](https://github.com/leebyron/ecmascript-more-export-from) (Withdrawn)
*   [ECMAScript Proposal: export default from](https://github.com/leebyron/ecmascript-export-default-from)