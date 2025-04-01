---
url: https://babeljs.io/docs/babel-plugin-proposal-import-wasm-source
scrapeDate: 2025-03-31T20:55:11.256Z
library: docs

exactVersionMatch: false
---

Transforms `import source` declarations to `WebAssembly.Module` objects, assuming that `import source` is being used to import the source of a WebAssembly Module.

The transformation applied by this plugin depends on your top-level [`targets`](_docs_options.md#targets) to detect whether the generated code should be compatible with Node.js, browsers, or both. When targeting Node.js, the generated code will also change depending on whether you are compiling modules to CommonJS or not.

caution

This plugin cannot be used when compiling modules to AMD, SystemJS, or UMD.

## Example[​](_docs_babel-plugin-proposal-import-wasm-source.md#example)

input.js
```
import source libMod from "./lib.wasm";  
```
will be transformed to
*   Browsers
*   Node.js (ESM)
*   Node.js (CommonJS)

output.js
```
const libMod = await WebAssembly.compileStreaming(fetch(import.meta.resolve("./lib.wasm")));  
```
## Installation[​](_docs_babel-plugin-proposal-import-wasm-source.md#installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/plugin-proposal-import-wasm-source  
```
## Usage[​](_docs_babel-plugin-proposal-import-wasm-source.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-plugin-proposal-import-wasm-source.md#with-a-configuration-file-recommended)

babel.config.json
```
{  
  "plugins": [    "@babel/plugin-proposal-import-wasm-source"  ]}  
```
### Via CLI[​](_docs_babel-plugin-proposal-import-wasm-source.md#via-cli)

Shell
```
babel --plugins=@babel/plugin-proposal-import-wasm-source script.js  
```
### Via Node API[​](_docs_babel-plugin-proposal-import-wasm-source.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  plugins: [    "@babel/plugin-proposal-import-wasm-source"  ],});  
```
## References[​](_docs_babel-plugin-proposal-import-wasm-source.md#references)
*   [Proposal: Source Phase Imports](https://github.com/tc39/proposal-source-phase-imports/)