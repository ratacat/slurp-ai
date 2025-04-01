---
url: https://babeljs.io/docs/babel-preset-flow
scrapeDate: 2025-03-31T20:55:08.663Z
library: docs

exactVersionMatch: false
---

This preset is recommended if you use [Flow](https://flow.org/en/docs/getting-started/), a static type checker for JavaScript code. It includes the following plugins:
*   [@babel/plugin-transform-flow-strip-types](_docs_babel-plugin-transform-flow-strip-types.md)

## Example[​](_docs_babel-preset-flow.md#example)

**In**

JavaScript
```
function foo(one: any, two: number, three?): string {}  
```
**Out**

JavaScript
```
function foo(one, two, three) {}  
```
## Installation[​](_docs_babel-preset-flow.md#installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/preset-flow  
```
## Usage[​](_docs_babel-preset-flow.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-preset-flow.md#with-a-configuration-file-recommended)

babel.config.json
```
{  
  "presets": ["@babel/preset-flow"]}  
```
### Via CLI[​](_docs_babel-preset-flow.md#via-cli)

Shell
```
babel --presets @babel/preset-flow script.js  
```
### Via Node API[​](_docs_babel-preset-flow.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  presets: ["@babel/preset-flow"],});  
```
## Options[​](_docs_babel-preset-flow.md#options)

### `all`[​](_docs_babel-preset-flow.md#all)

`boolean`, defaults to `false`.

Flow will only parse Flow-specific features if a `@flow` pragma is present atop the file, or the [`all` option](https://flow.org/en/docs/config/options/#toc-all-boolean) is set inside the `.flowconfig`.

If you are using the `all` option in your Flow config, be sure to set this option to `true` to get matching behavior.

For example, without either of the above set, the following call expression with a type argument:

Would get parsed as a nested binary expression:

### `allowDeclareFields`[​](_docs_babel-preset-flow.md#allowdeclarefields)

`boolean`, defaults to `false`

Added in: `v7.9.0`

note

This will be enabled by default in Babel 8

When enabled, type-only class fields are only removed if they are prefixed with the `declare` modifier:

JavaScript
```
class A {  
  declare foo: string; // Removed  bar: string; // Initialized to undefined}  
```
### `ignoreExtensions`[​](_docs_babel-preset-flow.md#ignoreextensions)

`boolean`, defaults to `true`

Added in: `v7.24.0`

When it is set to `true`, Babel will apply the flow transform to all extensions. When it is set to `false`, Babel will avoid the flow transform for `*.tsx` files.

### `experimental_useHermesParser`[​](_docs_babel-preset-flow.md#experimental_usehermesparser)

`boolean`, defaults to `false`

Added in: `v7.24.0`

The [Hermes](https://hermesengine.dev/) team is maintaining an alternative Flow parser for Babel, which is better kept up-to-date with the latest Flow syntax features. You can enable it by setting this option to `true`.

warning

The Hermes parser does not currently attach comments to the AST. This can cause problems with transforms that depend on the presence of specific comments.

> You can read more about configuring preset options [here](_docs_en_presets.md#preset-options)