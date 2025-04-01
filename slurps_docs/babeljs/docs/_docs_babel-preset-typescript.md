---
url: https://babeljs.io/docs/babel-preset-typescript
scrapeDate: 2025-03-31T20:55:09.557Z
library: docs

exactVersionMatch: false
---

This preset is recommended if you use [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html), a typed superset of JavaScript. It includes the following plugins:
*   [@babel/plugin-transform-typescript](_docs_babel-plugin-transform-typescript.md)

> You will need to specify `--extensions ".ts"` for `@babel/cli` & `@babel/node` cli's to handle `.ts` files.

## Example[​](_docs_babel-preset-typescript.md#example)

**In***Out**

## Installation[​](_docs_babel-preset-typescript.md#installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/preset-typescript  
```
## Usage[​](_docs_babel-preset-typescript.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-preset-typescript.md#with-a-configuration-file-recommended)

babel.config.json
```
{  
  "presets": ["@babel/preset-typescript"]}  
```
### Via CLI[​](_docs_babel-preset-typescript.md#via-cli)

Shell
```
babel --presets @babel/preset-typescript script.ts  
```
### Via Node API[​](_docs_babel-preset-typescript.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  presets: ["@babel/preset-typescript"],  filename: 'script.ts',});  
```
## Options[​](_docs_babel-preset-typescript.md#options)

### `isTSX`[​](_docs_babel-preset-typescript.md#istsx)

`boolean`, defaults to `false`

Forcibly enables `jsx` parsing. Otherwise angle brackets will be treated as typescript's legacy type assertion `var foo = <string>bar;`. Also, `isTSX: true` requires `allExtensions: true`.

### `jsxPragma`[​](_docs_babel-preset-typescript.md#jsxpragma)

`string`, defaults to `React`

Replace the function used when compiling JSX expressions. This is so that we know that the import is not a type import, and should not be removed.

### `jsxPragmaFrag`[​](_docs_babel-preset-typescript.md#jsxpragmafrag)

`string`, defaults to `React.Fragment`

Replace the function used when compiling JSX fragment expressions. This is so that we know that the import is not a type import, and should not be removed.

### `allExtensions`[​](_docs_babel-preset-typescript.md#allextensions)

`boolean`, defaults to `false`

Indicates that every file should be parsed as TS, TSX, or as TS without JSX ambiguities (depending on the `isTSX` and `disallowAmbiguousJSXLike` options).

### `allowNamespaces`[​](_docs_babel-preset-typescript.md#allownamespaces)

`boolean`, uses the default set by [`@babel/plugin-transform-typescript`](_docs_en_babel-plugin-transform-typescript.md#allownamespaces).

Added in: `v7.6.0`

Enables compilation of TypeScript namespaces.

### `allowDeclareFields`[​](_docs_babel-preset-typescript.md#allowdeclarefields)

`boolean`, defaults to `false`

Added in: `v7.7.0`

> NOTE: This will be enabled by default in Babel 8

When enabled, type-only class fields are only removed if they are prefixed with the `declare` modifier:
```
class A {  
  declare foo: string; // Removed  bar: string; // Initialized to undefined  prop?: string; // Initialized to undefined  prop1!: string // Initialized to undefined}  
```
### `disallowAmbiguousJSXLike`[​](_docs_babel-preset-typescript.md#disallowambiguousjsxlike)

`boolean`, defaults to `true` for `.mts` and `.cts` files and to `false` otherwise.

Added in: `v7.16.0`

Even when JSX parsing is not enabled, this option disallows using syntax that would be ambiguous with JSX (`<X> y` type assertions and `<X>() => {}` type arguments). It matches the `tsc` behavior when parsing `.mts` and `.mjs` files.

### `ignoreExtensions`[​](_docs_babel-preset-typescript.md#ignoreextensions)

`boolean`, defaults to `false`

Added in: `v7.21.4`

When it is set to `false`, Babel will automatically provide required plugins for `*.ts`, `*.tsx`, `*.mts` and `*.cts` files.

When it is set to `true`, Babel will provide a general TS plugin. If you want to transpile source as if it were `*.tsx`, enable the `@babel/preset-react` preset and this plugin should work with the JSX transform seamlessly. For example,

babel.config.json
```
{  
  "presets": ["@babel/preset-react"],  "overrides": [{    "test": "*.vue",    "presets": [      ["@babel/preset-typescript"], { "ignoreExtensions": true }    ]  }]}  
```
### `onlyRemoveTypeImports`[​](_docs_babel-preset-typescript.md#onlyremovetypeimports)

`boolean`, defaults to `false`

Added in: `v7.9.0`

When set to `true`, the transform will only remove [type-only imports](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-exports) (introduced in TypeScript 3.8). This should only be used if you are using TypeScript >= 3.8.

### `optimizeConstEnums`[​](_docs_babel-preset-typescript.md#optimizeconstenums)

`boolean`, defaults to `false`

Added in: `v7.15.0`

When set to `true`, Babel will inline enum values rather than using the usual `enum` output:
```
// Input  
const enum Animals {  
  Fish}  
console.log(Animals.Fish);  
  
// Default output  
var Animals;  
  
(function (Animals) {  
  Animals[Animals["Fish"] = 0] = "Fish";})(Animals || (Animals = {}));  
  
console.log(Animals.Fish);  
  
// `optimizeConstEnums` output  
console.log(0);  
```
This option differs from TypeScript's `--isolatedModules` behavior, which ignores the `const` modifier and compiles them as normal enums, and aligns Babel's behavior with TypeScript's default behavior.

However, when _exporting_ a `const enum` Babel will compile it to a plain object literal so that it doesn't need to rely on cross-file analysis when compiling it:
```
// Input  
export const enum Animals {  
  Fish,}  
  
// `optimizeConstEnums` output  
export var Animals = {  
  Fish: 0,};  
```
> You can read more about configuring preset options [here](_docs_en_presets.md#preset-options).

### `rewriteImportExtensions`[​](_docs_babel-preset-typescript.md#rewriteimportextensions)

`boolean`, defaults to `false`

Added in: `v7.23.0`

When set to `true`, Babel will rewrite `.ts`/`.mts`/`.cts` extensions in import declarations to `.js`/`.mjs`/`.cjs`. This options mirrors TypeScripts's [`rewriteRelativeImportExtensions`](https://www.typescriptlang.org/tsconfig/#rewriteRelativeImportExtensions) option.

This option, when used together with TypeScript's [`allowImportingTsExtension`](https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions) option, allows to write complete relative specifiers in import declarations while using the same extension used by the source files.

As an example, given this project structure (where `src` contains the source files, and `dist` the compiled files):
```
.  
├── src  
│   ├── main.ts  
│   └── dep.ts  
├── dist  
│   ├── main.js  
│   └── dep.js  
├── babel.config.json  
└── tsconfig.json  
```
and with the following configuration files:

babel.config.json

tsconfig.json
```
{  
  "presets": [    ["@babel/preset-typescript", {      "rewriteImportExtensions": true    }]  ]}  
```
```
{  
  "compilerOptions": {    "lib": ["esnext"],    "noEmit": true,    "isolatedModules": true,    "moduleResolution": "nodenext",    "allowImportingTsExtensions": true  }}  
  
```
you will be able to write `import x from "./dep.ts"` in `main.ts`, and Babel will transform it to `import x from "./dep.js"` when compiling `main.ts` to `main.js`.