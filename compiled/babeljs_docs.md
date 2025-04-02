# Compiled Documentation

Generated on 2025-04-02T22:57:59.042Z

### docs

#### _docs.md

> Source: https://babeljs.io/docs
> Scraped: 4/2/2025, 4:57:33 PM

## Babel is a JavaScript compiler[​](_docs.md#babel-is-a-javascript-compiler)

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

## ES2015 and beyond[​](_docs.md#es2015-and-beyond)

Babel has support for the latest version of JavaScript through syntax transformers.

These [plugins](_docs_plugins-list.md) allow you to use new syntax, **right now** without waiting for browser support. Check out our [usage guide](_docs_usage.md) to get started.

## JSX and React[​](_docs.md#jsx-and-react)

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
## Type Annotations (Flow and TypeScript)[​](_docs.md#type-annotations-flow-and-typescript)

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
## Pluggable[​](_docs.md#pluggable)

Babel is built out of plugins. Compose your own transformation pipeline using existing plugins or write your own. Easily use a set of plugins by using or creating a [preset](_docs_plugins.md#presets). [Learn more →](_docs_plugins.md)

Create a plugin on the fly with [astexplorer.net](https://astexplorer.net/#/KJ8AjD6maa) or use [generator-babel-plugin](https://github.com/babel/generator-babel-plugin) to generate a plugin template.

example-babel-plugin.js
```
// A plugin is just a function  
export default function({ types: t }) {  
  return {    visitor: {      Identifier(path) {        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ        path.node.name = [...name]          .reverse()          .join("");      },    },  };}  
```
## Debuggable[​](_docs.md#debuggable)

**Source map** support so you can debug your compiled code with ease.

## Spec Compliant[​](_docs.md#spec-compliant)

Babel tries to stay true to the ECMAScript standard, as much as reasonably possible. It may also have specific options to be more spec compliant as a tradeoff to performance.

## Compact[​](_docs.md#compact)

Babel tries using the least amount of code possible with no dependence on a bulky runtime.

This may be difficult to do in cases, and there are ["assumptions"](_docs_assumptions.md) options that tradeoff spec compliancy for readability, file size, and speed.

#### _docs_.md

> Source: https://babeljs.io/docs/
> Scraped: 4/2/2025, 4:57:31 PM

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

#### _docs_assumptions.md

> Source: https://babeljs.io/docs/assumptions
> Scraped: 4/2/2025, 4:57:36 PM

By default Babel tries to compile your code so that it matches the native behavior as closely as possible. However, this sometimes means generating more output code, or slower output code, just to support some edge cases you don't care about.

Since Babel 7.13.0, you can specify an `assumptions` option in your configuration to tell Babel which assumptions it can make about your code, to better optimize the compilation result. _Note_: this replaces the various `loose` options in plugins in favor of top-level options that can apply to multiple plugins ([RFC link](https://github.com/babel/rfcs/blob/master/rfcs/0003-top-level-assumptions.md)).

For example:

babel.config.json
```
{  
  "targets": ">0.5%",  "assumptions": {    "noDocumentAll": true,    "noClassCalls": true  },  "presets": ["@babel/preset-env"]}  
```
caution

This is advanced functionality. Please be careful when enabling assumptions, because they are not spec-compliant and may break your code in unexpected ways.

## `arrayLikeIsIterable`[​](_docs_assumptions.md#arraylikeisiterable)

When spreading or iterating an array-like object, assume that it implements a `[Symbol.iterator]` method with the same behavior of the native `Array.prototype[Symbol.iterator]`, and thus directly iterate over its element by index.

This can be useful, for example, to iterate DOM collections in older browsers.

JavaScript
```
let images = $("img");  
  
for (const img of images) {  
  console.log(img);}  
  
const copy = [...images];  
```
## `constantReexports`[​](_docs_assumptions.md#constantreexports)

When re-exporting a binding from a module, assume that it doesn't change and thus it's safe to directly export it, as if you were doing

JavaScript
```
import { value as val } from "dep";  
  
export const value = val;  
```
_NOTE:_ This also affects the `transform-modules-umd` and `transform-modules-amd` plugins.

JavaScript
```
export { value } from "dependency";  
```
## `constantSuper`[​](_docs_assumptions.md#constantsuper)

The super class of a class can be changed at any time by using `Object.setPrototypeOf`, making it impossible for Babel to statically know it. When this option is enabled, Babel assumes that it's never changed and thus it is always the value that was placed in the `extends` clause in the class declaration.

JavaScript
```
class Child extends Base {  
  method() {    super.method(2);  }}  
```
When compiling ESM to CJS, Babel defines a `__esModule` property on the `module.exports` object. Assume that you never iterate over the keys of `module.exports` or of `require("your-module")` using `for..in` or `Object.keys`, and thus it's safe to define `__esModule` as enumerable.

## `ignoreFunctionLength`[​](_docs_assumptions.md#ignorefunctionlength)

Functions have a `.length` property that reflect the number of parameters up to the last non-default parameter. When this option is enabled, assume that the compiled code does not rely on this `.length` property.

JavaScript
```
function fn(a, b = 2, c, d = 3) {  
  return a + b + c + d;}  
```
## `ignoreToPrimitiveHint`[​](_docs_assumptions.md#ignoretoprimitivehint)

When using language features that might call the [`[Symbol.toPrimitive]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive) method of objects, assume that they don't change their behavior based on the `hint` parameter.

## `iterableIsArray`[​](_docs_assumptions.md#iterableisarray)

When using an iterable object (in array destructuring, for-of or spreads), assume that it is an array.

JavaScript
```
const [first, ...rest] = obj;  
  
call(first, ...obj);  
let arr = [first, ...obj];  
  
for (const el of obj) {  
  console.log(el);}  
```
## `mutableTemplateObject`[​](_docs_assumptions.md#mutabletemplateobject)

Don't use `Object.freeze` for the template object created for tagged template literals. This effectively means using the `taggedTemplateLiteralLoose` helper instead of `taggedTemplateLiteral`.

## `noClassCalls`[​](_docs_assumptions.md#noclasscalls)

When transforming classes, assume that they are always instantiate with `new` and they are never called as functions.

JavaScript
```
class Test {  
  constructor() {    this.x = 2;  }}  
```
## `noDocumentAll`[​](_docs_assumptions.md#nodocumentall)

When using operators that check for `null` or `undefined`, assume that they are never used with the special value `document.all`.

JavaScript
```
let score = points ?? 0;  
let name = user?.name;  
```
## `noIncompleteNsImportDetection`[​](_docs_assumptions.md#noincompletensimportdetection)

Assume that no own property of a module export object is observed before initialization. For example, when trying to access `ns.foo`, it will return `undefined` both with this assumption turned on or off. The difference is that `Object.prototype.hasOwnProperty.call(ns, "foo")` would return `false` when `noIncompleteNsImportDetection: true`.

## `noNewArrows`[​](_docs_assumptions.md#nonewarrows)

Assume that the code never tries to instantiate arrow functions using `new`, which is disallowed according to the specification.

_NOTE:_ This assumption defaults to `true`. It will default to `false` starting from Babel 8.

JavaScript
```
let getSum = (a, b) => {  
  return { sum: a + b }};  
```
## `noUninitializedPrivateFieldAccess`[​](_docs_assumptions.md#nouninitializedprivatefieldaccess)

History

Version

Changes

v7.24.0

Added `noUninitializedPrivateFieldAccess` assumption

Assume that code never attempts to access private fields on classes before they are initialized. For example:

JavaScript
```
class Foo {  
  x = this.#y; // #y is not initialized yet  #y = 2;}  
```
JavaScript
```
class MyClass {  
  static #id = 123;  
  method() {    return MyClass.#id;  }}  
```
## `objectRestNoSymbols`[​](_docs_assumptions.md#objectrestnosymbols)

When using rest patterns in object destructuring, assume that destructured objects don't have symbol keys or that it's not a problem if they are not copied.

JavaScript
```
let { name, ...attrs } = obj;  
```
## `privateFieldsAsProperties`[​](_docs_assumptions.md#privatefieldsasproperties)

Assume that "soft privacy" is enough for private fields, and thus they can be stored as public non-enumerable properties with an unique name (rather than using an external `WeakMap`). This makes debugging compiled private fields easier.

JavaScript
```
class Foo {  
  #method() {}  
  #field = 2;  
  run() {    this.#method();    this.#field++;  }}  
```
caution

When using inline Babel helpers, generated string keys are unique per-file and not globally. This could cause conflicts when extending classes from a different fields with private fields with the same name.

## `privateFieldsAsSymbols`[​](_docs_assumptions.md#privatefieldsassymbols)

History

Version

Changes

v7.21.0

Added `privateFieldsAsSymbols` assumption

Assume that "soft privacy" is enough for private fields, and thus they can be stored as public properties with a symbol key (rather than using an external `WeakMap`). This makes debugging compiled private fields easier.
```
class Foo {  
  #method() {}  
  #field = 2;  
  run() {    this.#method();    this.#field++;  }}  
```
## `pureGetters`[​](_docs_assumptions.md#puregetters)

Assume that getters, if present, don't have side-effects and can be accessed multiple times.

## `setClassMethods`[​](_docs_assumptions.md#setclassmethods)

When declaring classes, assume that methods don't shadow accessors or non-writable properties on the superclass prototype, and that the program doesn't depend on methods being non-enumerable. Thus, it's safe to assign methods rather than using `Object.defineProperty`.

JavaScript
```
class Foo extends Bar {  
  method() {}  
  static check() {}}  
```
## `setComputedProperties`[​](_docs_assumptions.md#setcomputedproperties)

When using computed object properties, assume that the object doesn't contain properties that overwrite setter defined in the same object, and thus it's safe to assign them rather than defining them using `Object.defineProperty`.

JavaScript
```
let obj = {  
  set name(value) {},  [key]: val}  
```
## `setPublicClassFields`[​](_docs_assumptions.md#setpublicclassfields)

When using public class fields, assume that they don't shadow any getter in the current class, in its subclasses or in its superclass. Thus, it's safe to assign them rather than using `Object.defineProperty`.

JavaScript
```
class Test {  
  field = 2;  
  static staticField = 3;}  
```
## `setSpreadProperties`[​](_docs_assumptions.md#setspreadproperties)

When using object spread, assume that spreaded properties don't trigger getters on the target object and thus it's safe to assign them rather than defining them using `Object.defineProperty`.

JavaScript
```
const result = {  
  set name(value) {},  ...obj,};  
```
## `skipForOfIteratorClosing`[​](_docs_assumptions.md#skipforofiteratorclosing)

When using `for-of` with an iterator, it should always be closed with `.return()` and with `.throw()` in case of an error. When this option is called Babel assumes that those methods are not defined or empty, and it avoids calling them.

JavaScript
```
for (const val of iterable) {  
  console.log(val);}  
```
## `superIsCallableConstructor`[​](_docs_assumptions.md#superiscallableconstructor)

When extending classes, assume that the super class is callable. This means that it won't be possible to extend native classes or built-ins, but only compiled classes or ES5 `function` constructors.

JavaScript
```
class Child extends Parent {  
  constructor() {    super(42);  }}  
```
## Migrating from `@babel/preset-env`'s `"loose"` and `"spec"` modes[​](_docs_assumptions.md#migrating-from-babelpreset-envs-loose-and-spec-modes)

`@babel/preset-env`'s `loose` option is equivalent to the following configuration:

JSON
```
{  
  "presets": [    ["@babel/preset-env", { "exclude": ["transform-typeof-symbol"] }]  ],  "assumptions": {    "arrayLikeIsIterable": true,    "constantReexports": true,    "ignoreFunctionLength": true,    "ignoreToPrimitiveHint": true,    "mutableTemplateObject": true,    "noClassCalls": true,    "noDocumentAll": true,    "objectRestNoSymbols": true,    "privateFieldsAsProperties": true,    "pureGetters": true,    "setClassMethods": true,    "setComputedProperties": true,    "setPublicClassFields": true,    "setSpreadProperties": true,    "skipForOfIteratorClosing": true,    "superIsCallableConstructor": true  }}  
```
`@babel/preset-env`'s `spec` option is equivalent to the following configuration:

JSON
```
{  
  "presets": ["@babel/preset-env"],  "assumptions": {    "noNewArrows": false,  }}  
```

#### _docs_babel-cli.md

> Source: https://babeljs.io/docs/babel-cli
> Scraped: 4/2/2025, 4:57:36 PM

Babel comes with a built-in CLI which can be used to compile files from the command line.

In addition, various entry point scripts live in the top-level package at `@babel/cli/bin`. There is a shell-executable utility script, `babel-external-helpers.js`, and the main Babel cli script, `babel.js`.

## Install[​](_docs_babel-cli.md#install)

While you _can_ install Babel CLI globally on your machine, it's much better to install it **locally** project by project.

There are two primary reasons for this.

1.  Different projects on the same machine can depend on different versions of Babel allowing you to update them individually.
2.  Not having an implicit dependency on the environment you are working in makes your project far more portable and easier to setup.

We can install Babel CLI locally by running:
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/core @babel/cli  
```
note

If you do not have a `package.json`, create one before installing. This will ensure proper interaction with the `npx` command.

After that finishes installing, your `package.json` file should include:
```
{  
  "devDependencies": {+   "@babel/cli": "^7.0.0",  
+   "@babel/core": "^7.0.0"  
  }}  
```
## Usage[​](_docs_babel-cli.md#usage)

note

Please install `@babel/cli` and `@babel/core` first before `npx babel`, otherwise `npx` will install out-of-dated `babel` 6.x. Other than [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b), you can also drop it inside of an [npm run script](https://docs.npmjs.com/cli/run-script) or you may instead execute with the relative path instead. `./node_modules/.bin/babel`

### Print Usage[​](_docs_babel-cli.md#print-usage)

### Compile Files[​](_docs_babel-cli.md#compile-files)

Compile the file `script.js` and **output to stdout**.

Shell
```
npx babel script.js  
# output...  
```
If you would like to **output to a file** you may use `--out-file` or `-o`.

Shell
```
npx babel script.js --out-file script-compiled.js  
```
To compile a file **every time that you change it**, use the `--watch` or `-w` option:

Shell
```
npx babel script.js --watch --out-file script-compiled.js  
```
### Compile with Source Maps[​](_docs_babel-cli.md#compile-with-source-maps)

note

Since v7.19.3, if this parameter is not specified, `@babel/cli` will follow the [configuration files](_docs_en_config-files.md).

If you would then like to add a **source map file** you can use `--source-maps` or `-s`.

Shell
```
npx babel script.js --out-file script-compiled.js --source-maps  
```
Or, if you'd rather have **inline source maps**, use `--source-maps inline` instead.

Shell
```
npx babel script.js --out-file script-compiled.js --source-maps inline  
```
### Compile Directories[​](_docs_babel-cli.md#compile-directories)

Compile the entire `src` directory and output it to the `lib` directory by using either `--out-dir` or `-d`. This doesn't overwrite any other files or directories in `lib`.

Shell
```
npx babel src --out-dir lib  
```
Compile the entire `src` directory and output it as a single concatenated file.

Shell
```
npx babel src --out-file script-compiled.js  
```
#### Directories with TypeScript Files[​](_docs_babel-cli.md#directories-with-typescript-files)

Use the `--extensions` option to specify what file extensions Babel should handle when compiling the entire `src` directory. The default `--extensions` can be accessed from [`Babel.DEFAULT_EXTENSIONS`](_docs_babel-core.md#default_extensions).

Shell
```
npx babel src --out-dir lib \  
  --extensions .ts,.js,.tsx,.jsx,.cjs,.mjs \  --presets=@babel/preset-typescript,@babel/preset-env,@babel/preset-react
```
### Ignore files[​](_docs_babel-cli.md#ignore-files)

Ignore spec and test files

Shell
```
npx babel src --out-dir lib --ignore "src/**/*.spec.js","src/**/*.test.js"  
```
### Copy files[​](_docs_babel-cli.md#copy-files)

Copy files that will not be compiled

Shell
```
npx babel src --out-dir lib --copy-files  
```
If you don't want to copy ignored JavaScript files:

History

Version

Changes

v7.8.0

Added `--copy-ignored`

v7.8.4

Change `copyeIgnored` option default to `true`, it can be disabled by `--no-copy-ignored`

Shell
```
npx babel src --out-dir lib --copy-files --no-copy-ignored  
```
### Piping Files[​](_docs_babel-cli.md#piping-files)

Pipe a file in via stdin and output it to `script-compiled.js`

Shell
```
npx babel --out-file script-compiled.js < script.js  
```
### Using Plugins[​](_docs_babel-cli.md#using-plugins)

Use the `--plugins` option to specify plugins to use in compilation

Shell
```
npx babel script.js --out-file script-compiled.js --plugins=@babel/transform-class-properties,@babel/transform-modules-amd  
```
### Using Presets[​](_docs_babel-cli.md#using-presets)

Use the `--presets` option to specify presets to use in compilation

Shell
```
npx babel script.js --out-file script-compiled.js --presets=@babel/preset-env,@babel/flow  
```
### Using Config Files[​](_docs_babel-cli.md#using-config-files)

#### Ignoring .babelrc.json or .babelrc[​](_docs_babel-cli.md#ignoring-babelrcjson-or-babelrc)

Ignore the configuration from the project's `.babelrc` or `.babelrc.json` file and use the cli options e.g. for a custom build

Shell
```
npx babel --no-babelrc script.js --out-file script-compiled.js --presets=@babel/preset-env,@babel/preset-react  
```
#### Custom config path[​](_docs_babel-cli.md#custom-config-path)

Shell
```
npx babel --config-file /path/to/my/babel.config.json --out-dir dist ./src  
```
See [here](_docs_config-files.md) for more information about config files.

### Set File Extensions[​](_docs_babel-cli.md#set-file-extensions)

Added in: `v7.8.0`

By default, the transpiled file will use the `.js` extension.

You can control the output file extension with `--out-file-extension`

Shell
```
npx babel src --out-dir lib --out-file-extension .mjs  
```
You can also preserve the input file extension with `--keep-file-extension`

Shell
```
npx babel src-with-mjs-and-cjs --out-dir lib --keep-file-extension  
```
Note that `--keep-file-extension` and `--out-file-extension` cannot be used together.

### Advanced Usage[​](_docs_babel-cli.md#advanced-usage)

There are many more options available, see [options](_docs_options.md), `babel --help` and other sections for more information.

#### _docs_babel-core.md

> Source: https://babeljs.io/docs/babel-core
> Scraped: 4/2/2025, 4:57:36 PM

JavaScript
```
var babel = require("@babel/core");  
import { transform } from "@babel/core";  
import * as babel from "@babel/core";  
```
All transformations will use your local [configuration files](_docs_config-files.md).

## transform[​](_docs_babel-core.md#transform)

> babel.transform(code: string, [options?](_docs_options.md): Object, callback: Function)

Transforms the passed in `code`. Calling a callback with an object with the generated code, source map, and AST.

JavaScript
```
babel.transform(code, options, function(err, result) {  
  result; // => { code, map, ast }});  
```
**Example**

JavaScript
```
babel.transform("code();", options, function(err, result) {  
  result.code;  result.map;  result.ast;});  
```
info

In Babel 6, this method was synchronous and `transformSync` did not exist. For backward-compatibility, this function will behave synchronously if no callback is given. If you're starting with Babel 7 and need synchronous behavior, please use `transformSync` since this backward-compatibility will be dropped in Babel 8.

## transformSync[​](_docs_babel-core.md#transformsync)

> babel.transformSync(code: string, [options?](_docs_options.md): Object)

Transforms the passed in `code`. Returning an object with the generated code, source map, and AST.

JavaScript
```
babel.transformSync(code, options); // => { code, map, ast }  
```
**Example**

JavaScript
```
var result = babel.transformSync("code();", options);  
result.code;  
result.map;  
result.ast;  
```
## transformAsync[​](_docs_babel-core.md#transformasync)

> babel.transformAsync(code: string, [options?](_docs_options.md): Object)

Transforms the passed in `code`. Returning an promise for an object with the generated code, source map, and AST.

JavaScript
```
babel.transformAsync(code, options); // => Promise<{ code, map, ast }>  
```
**Example**

JavaScript
```
babel.transformAsync("code();", options).then(result => {  
  result.code;  result.map;  result.ast;});  
```
## transformFile[​](_docs_babel-core.md#transformfile)

> babel.transformFile(filename: string, [options?](_docs_options.md): Object, callback: Function)

Asynchronously transforms the entire contents of a file.

JavaScript
```
babel.transformFile(filename, options, callback);  
```
**Example**

JavaScript
```
babel.transformFile("filename.js", options, function(err, result) {  
  result; // => { code, map, ast }});  
```
## transformFileSync[​](_docs_babel-core.md#transformfilesync)

> babel.transformFileSync(filename: string, [options?](_docs_options.md): Object)

Synchronous version of `babel.transformFile`. Returns the transformed contents of the `filename`.

JavaScript
```
babel.transformFileSync(filename, options); // => { code, map, ast }  
```
**Example**

JavaScript
```
babel.transformFileSync("filename.js", options).code;  
```
## transformFileAsync[​](_docs_babel-core.md#transformfileasync)

> babel.transformFileAsync(filename: string, [options?](_docs_options.md): Object)

Promise version of `babel.transformFile`. Returns a promise for the transformed contents of the `filename`.

JavaScript
```
babel.transformFileAsync(filename, options); // => Promise<{ code, map, ast }>  
```
**Example**

JavaScript
```
babel.transformFileAsync("filename.js", options).then(result => {  
  result.code;});  
```
## transformFromAst[​](_docs_babel-core.md#transformfromast)

> babel.transformFromAst(ast: Object, code?: string, [options?](_docs_options.md): Object, callback: Function): FileNode | null

Given an [AST](https://astexplorer.net/), transform it.

JavaScript
```
const sourceCode = "if (true) return;";  
const parsedAst = babel.parseSync(sourceCode, {  
  parserOpts: { allowReturnOutsideFunction: true },});  
babel.transformFromAst(parsedAst, sourceCode, options, function(err, result) {  
  const { code, map, ast } = result;});  
```
info

In Babel 6, this method was synchronous and `transformFromAstSync` did not exist. For backward-compatibility, this function will behave synchronously if no callback is given. If you're starting with Babel 7 and need synchronous behavior, please use `transformFromAstSync` since this backward-compatibility will be dropped in Babel 8.

## transformFromAstSync[​](_docs_babel-core.md#transformfromastsync)

> babel.transformFromAstSync(ast: Object, code?: string, [options?](_docs_options.md): Object)

Given an [AST](https://astexplorer.net/), transform it.

JavaScript
```
const sourceCode = "if (true) return;";  
const parsedAst = babel.parseSync(sourceCode, {  
  parserOpts: { allowReturnOutsideFunction: true },});  
const { code, map, ast } = babel.transformFromAstSync(  
  parsedAst,  sourceCode,  options);  
```
## transformFromAstAsync[​](_docs_babel-core.md#transformfromastasync)

> babel.transformFromAstAsync(ast: Object, code?: string, [options?](_docs_options.md): Object)

Given an [AST](https://astexplorer.net/), transform it.

JavaScript
```
const sourceCode = "if (true) return;";  
babel  
  .parseAsync(sourceCode, { parserOpts: { allowReturnOutsideFunction: true } })  .then(parsedAst => {    return babel.transformFromAstAsync(parsedAst, sourceCode, options);  })  .then(({ code, map, ast }) => {    // ...  });
```
## parse[​](_docs_babel-core.md#parse)

> babel.parse(code: string, [options?](_docs_options.md): Object, callback: Function)

Given some code, parse it using Babel's standard behavior. Referenced presets and plugins will be loaded such that optional syntax plugins are automatically enabled.

info

In Babel 7's early betas, this method was synchronous and `parseSync` did not exist. For backward-compatibility, this function will behave synchronously if no callback is given. If you're starting with Babel 7 stable and need synchronous behavior, please use `parseSync` since this backward-compatibility will be dropped in Babel 8.

## parseSync[​](_docs_babel-core.md#parsesync)

> babel.parseSync(code: string, [options?](_docs_options.md): Object)

Returns an AST.

Given some code, parse it using Babel's standard behavior. Referenced presets and plugins will be loaded such that optional syntax plugins are automatically enabled.

## parseAsync[​](_docs_babel-core.md#parseasync)

> babel.parseAsync(code: string, [options?](_docs_options.md): Object)

Returns a promise for an AST.

Given some code, parse it using Babel's standard behavior. Referenced presets and plugins will be loaded such that optional syntax plugins are automatically enabled.

## Advanced APIs[​](_docs_babel-core.md#advanced-apis)

Many systems that wrap Babel like to automatically inject plugins and presets, or override options. To accomplish this goal, Babel exposes several functions that aid in loading the configuration part-way without transforming.

### loadOptions[​](_docs_babel-core.md#loadoptions)

> babel.loadOptions([options?](_docs_options.md): Object)

Resolve Babel's options fully, resulting in an options object where:
*   `opts.plugins` is a full list of `Plugin` instances.
*   `opts.presets` is empty and all presets are flattened into `opts`.
*   It can be safely passed back to Babel. Fields like [`"babelrc"`](_docs_options.md#babelrc) have been set to `false` so that later calls to Babel will not make a second attempt to load config files.

`Plugin` instances aren't meant to be manipulated directly, but often callers will serialize this `opts` to JSON to use it as a cache key representing the options Babel has received. Caching on this isn't 100% guaranteed to invalidate properly, but it is the best we have at the moment.

### loadPartialConfig[​](_docs_babel-core.md#loadpartialconfig)

> babel.loadPartialConfig([options?](_docs_options.md): Object): PartialConfig

To allow systems to easily manipulate and validate a user's config, this function resolves the plugins and presets and proceeds no further. The expectation is that callers will take the config's `.options`, manipulate it as they see fit and pass it back to Babel again.

This function accepts one additional option as part of the options object in addition to the standard [options](_docs_options.md): `showIgnoredFiles`. When set to true, `loadPartialConfig` always returns a result when a file is ignored, rather than `null`. This is useful in order to allow the caller to access the list of files that influenced this outcome, e.g. for watch mode. The caller can determine whether a file was ignored based on the returned `fileHandling` property.
*   `babelrc: string | void` - The path of the [file-relative configuration](_docs_config-files.md#file-relative-configuration) file, if there was one.
*   `babelignore: string | void` - The path of the `.babelignore` file, if there was one.
*   `config: string | void` - The path of the [project-wide config file](_docs_config-files.md#project-wide-configuration) file, if there was one.
*   `options: ValidatedOptions` - The partially resolved options, which can be manipulated and passed back to Babel again.
    *   `plugins: Array<ConfigItem>` - See below.
    *   `presets: Array<ConfigItem>` - See below.
    *   It can be safely passed back to Babel. Options like [`"babelrc"`](_docs_options.md#babelrc) have been set to false so that later calls to Babel will not make a second attempt to load config files.
*   `hasFilesystemConfig(): boolean` - Check if the resolved config loaded any settings from the filesystem.
*   `fileHandling` - This is set to `"transpile"`, `"ignored"`, or `"unsupported"` to indicate to the caller what to do with this file.
*   `files` - A `Set` of file paths that were read to build the resulting config, including project wide config files, local config files, extended config files, ignore files, etc. Useful for implementing watch mode or cache invalidation.

[`ConfigItem`](_docs_babel-core.md#configitem-type) instances expose properties to introspect the values, but each item should be treated as immutable. If changes are desired, the item should be removed from the list and replaced with either a normal Babel config value, or with a replacement item created by `babel.createConfigItem`. See that function for information about `ConfigItem` fields.

### createConfigItem[​](_docs_babel-core.md#createconfigitem)

> babel.createConfigItem(value: string | {} | Function | \[string | {} | Function, {} | void\], { dirname?: string, type?: "preset" | "plugin" }): ConfigItem

Allows build tooling to create and cache config items up front. If this function is called multiple times for a given plugin, Babel will call the plugin's function itself multiple times. If you have a clear set of expected plugins and presets to inject, pre-constructing the config items would be recommended.

### `ConfigItem` type[​](_docs_babel-core.md#configitem-type)

Each `ConfigItem` exposes all of the information Babel knows. The fields are:
*   `value: {} | Function` - The resolved value of the plugin.
*   `options: {} | void` - The options object passed to the plugin.
*   `dirname: string` - The path that the options are relative to.
*   `name: string | void` - The name that the user gave the plugin instance, e.g. `plugins: [ ['env', {}, 'my-env'] ]`
*   `file: Object | void` - Information about the plugin's file, if Babel knows it.
    *   `request: string` - The file that the user requested, e.g. `"@babel/env"`
    *   `resolved: string` - The full path of the resolved file, e.g. `"/tmp/node_modules/@babel/preset-env/lib/index.js"`

## DEFAULT\_EXTENSIONS[​](_docs_babel-core.md#default_extensions)

> babel.DEFAULT\_EXTENSIONS: readonly string\[\];

A list of default extensions supported by babel (".js", ".jsx", ".es6", ".es", ".mjs", "cjs"). This list is used by @babel/register and @babel/cli to determine which files need transpiling. Extending this list isn't possible, however @babel/cli does provide ways to support other extensions with `--extensions`.

## Options[​](_docs_babel-core.md#options)

See [the full option list here](_docs_options.md).

#### _docs_babel-plugin-proposal-decorators.md

> Source: https://babeljs.io/docs/babel-plugin-proposal-decorators
> Scraped: 3/31/2025, 2:55:11 PM

## Example[​](_docs_babel-plugin-proposal-decorators.md#example)

### Simple class decorator[​](_docs_babel-plugin-proposal-decorators.md#simple-class-decorator)

JavaScript
```
@annotation  
class MyClass {}  
  
function annotation(target) {  
  target.annotated = true;}  
```
### Class decorator[​](_docs_babel-plugin-proposal-decorators.md#class-decorator)

JavaScript
```
@isTestable(true)  
class MyClass {}  
  
function isTestable(value) {  
  return function decorator(target) {    target.isTestable = value;  };}  
```
### Class method decorator[​](_docs_babel-plugin-proposal-decorators.md#class-function-decorator)

JavaScript
```
class C {  
  message = "hello!";  
  @bound  m() {    console.log(this.message);  }}  
  
function bound(value, { name, addInitializer }) {  
  addInitializer(function () {    this[name] = this[name].bind(this);  });}  
```
## Installation[​](_docs_babel-plugin-proposal-decorators.md#installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/plugin-proposal-decorators  
```
## Usage[​](_docs_babel-plugin-proposal-decorators.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-plugin-proposal-decorators.md#with-a-configuration-file-recommended)

babel.config.json
```
{  
  "plugins": [    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }]  ]}  
```
### Via Node API[​](_docs_babel-plugin-proposal-decorators.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  plugins: [    ["@babel/plugin-proposal-decorators", { version: "2023-11" }],  ]});  
```
## Options[​](_docs_babel-plugin-proposal-decorators.md#options)

History

Version

Changes

`v7.24.0`

Added support for `version: "2023-11"`

`v7.22.0`

Added support for `version: "2023-05"`

`v7.21.0`

Added support for `version: "2023-01"`

`v7.19.0`

Added support for `version: "2022-03"`

`v7.17.0`

Added the `version` option with support for `"2021-12"`, `"2018-09"` and `"legacy"`

### `version`[​](_docs_babel-plugin-proposal-decorators.md#version)

`"2023-11"`, `"2023-05"`, `"2023-01"`, `"2022-03"`, `"2021-12"`, `"2018-09"` or `"legacy"`.

Selects the decorators proposal to use:
*   `"2023-11"` is the proposal version after the updates that reached consensus in the November 2023 TC39 meetings, intergrating [this change](https://github.com/pzuraq/ecma262/pull/12)
*   `"2023-05"` is the proposal version after the updates that reached consensus in the March and May 2023 TC39 meetings, integrating [these changes](https://github.com/pzuraq/ecma262/compare/e86128e13b63a3c2efc3728f76c8332756752b02...c4465e44d514c6c1dba810487ec2721ccd6b08f9).
*   `"2023-01"` is the proposal version after the updates that reached consensus in the January 2023 TC39 meeting, integrating [`pzuraq/ecma262#4`](https://github.com/pzuraq/ecma262/pull/4).
*   `"2022-03"` is the proposal version that reached consensus for Stage 3 in the March 2022 TC39 meeting. You can read more about it at [`tc39/proposal-decorators@8ca65c046d`](https://github.com/tc39/proposal-decorators/tree/8ca65c046dd5e9aa3846a1fe5df343a6f7efd9f8).
*   `"2021-12"` is the proposal version as it was presented to TC39 in Dec 2021. You can read more about it at [`tc39/proposal-decorators@d6c056fa06`](https://github.com/tc39/proposal-decorators/tree/d6c056fa061646178c34f361bad33d583316dc85).
*   `"2018-09"` is the proposal version that was initially promoted to Stage 2 presented to TC39 in Sept 2018. You can read more about it at [`tc39/proposal-decorators@7fa580b40f`](https://github.com/tc39/proposal-decorators/tree/7fa580b40f2c19c561511ea2c978e307ae689a1b).
*   `legacy` is the legacy Stage 1 proposal, defined at [`wycats/javascript-decorators@e1bf8d41bf`](https://github.com/wycats/javascript-decorators/blob/e1bf8d41bfa2591d949dd3bbf013514c8904b913/README.md). The legacy mode will not have feature updates, and there are known [discrepancies between Babel and TypeScript](https://github.com/babel/babel/issues/8864#issuecomment-688535867). It's recommended to migrate to the `"2023-11"` proposal.

caution

Babel 8 will only support `"2023-11"` and `"legacy"`. If you are using a different decorators version, it's recommended to migrate to `"2023-11"`.

The spec repo provides a brief [summary of the differences between these versions](https://github.com/tc39/proposal-decorators#how-does-this-proposal-compare-to-other-versions-of-decorators).

If you specify the `decoratorsBeforeExport` option, `version` defaults to `"2018-09"`, otherwise it is a required option.

### `decoratorsBeforeExport`[​](_docs_babel-plugin-proposal-decorators.md#decoratorsbeforeexport)

This option:
*   is disallowed when using `version: "legacy"`, `version: "2022-03"`, `version: "2023-01"`, `version: "2023-05"` or `version: "2023-11"`;
*   is required when using `version: "2018-09"`;
*   is optional and defaults to `false` when using `version: "2021-12"`.

`boolean`

JavaScript
```
// decoratorsBeforeExport: false  
export @decorator class Bar {}  
  
// decoratorsBeforeExport: true  
@decorator  
export class Foo {}  
```
This option was originally added to help tc39 collect feedback from the community by allowing experimentation with the proposed syntaxes. The proposal has now settled on allowing decorators either before or after `export`.

### `legacy`[​](_docs_babel-plugin-proposal-decorators.md#legacy)

Deprecated

Use `version: "legacy"` instead. This option is a legacy alias.

`boolean`, defaults to `false`.

Use the legacy (stage 1) decorators syntax and behavior.

#### NOTE: Compatibility with `@babel/plugin-transform-class-properties`[​](_docs_babel-plugin-proposal-decorators.md#note-compatibility-with-babelplugin-transform-class-properties)

If you are including your plugins manually and using class elements transforms such as
*   `@babel/plugin-transform-class-properties`
*   `@babel/plugin-transform-private-methods`
*   `@babel/plugin-transform-private-property-in-object`
*   `@babel/plugin-transform-class-static-block`

make sure that `@babel/plugin-proposal-decorators` comes _before_ them.

babel.config.json
```
{  
  "plugins": [-   "@babel/plugin-transform-class-properties",  
    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }]+   "@babel/plugin-transform-class-properties"  
  ]}  
```
If you are already using `@babel/preset-env` and Stage 3 decorators, you can safely remove the class elements transform, Babel will automatically apply decorators transform before any presets:

babel.config.json
```
{  
  "presets": [    ["@babel/preset-env"],  ],  "plugins": [-   "@babel/plugin-transform-class-properties",  
    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }]  ]}  
```
If you are using `@babel/preset-env` and legacy decorators, you must ensure the class elements transform is enabled regardless of your targets, because Babel only supports compiling legacy decorators when also compiling class properties:

babel.config.json
```
{  
  "presets": [    ["@babel/preset-env", {+     "include": [  
+       "@babel/plugin-transform-class-properties"  
+     ]  
    }],  ],  "plugins": [-   "@babel/plugin-transform-class-properties",  
    ["@babel/plugin-proposal-decorators", { "version": "legacy" }]  ]}  
```
The `include` option will enable the transforms included in `@babel/preset-env` so you can safely remove them from your `package.json`.

tip

You can read more about configuring plugin options [here](_docs_en_plugins.md#plugin-options)

When using decorators which either access or modify the metadata in the decorator context, you need to use `Symbol.metadata`. When `Symbol.metadata` is not available, Babel defaults to `Symbol.for("Symbol.metadata")`: this may be incompatible with other packages that use a different fallback.

To ensure that `Symbol.metadata` is available globally and matches the symbol used by the Babel decorators plugin during transpilation, you will need to either include a polyfill that defines it, or define it yourself:

symbol-metadata-polyfill.js
```
Symbol.metadata = Symbol.for("Symbol.metadata");  
```
You can also use a third-party polyfill, such as `core-js/proposals/decorator-metadata-v2.js`. Make sure that the polyfill is executed before any code that uses decorators or accesses `Symbol.metadata`.

## References[​](_docs_babel-plugin-proposal-decorators.md#references)
*   [Proposal: JavaScript Decorators](https://github.com/tc39/proposal-decorators)

#### _docs_babel-plugin-proposal-do-expressions.md

> Source: https://babeljs.io/docs/babel-plugin-proposal-do-expressions
> Scraped: 3/31/2025, 2:55:11 PM

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

#### _docs_babel-plugin-proposal-export-default-from.md

> Source: https://babeljs.io/docs/babel-plugin-proposal-export-default-from
> Scraped: 3/31/2025, 2:55:11 PM

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

#### _docs_babel-plugin-proposal-function-bind.md

> Source: https://babeljs.io/docs/babel-plugin-proposal-function-bind
> Scraped: 3/31/2025, 2:55:11 PM

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

#### _docs_babel-plugin-proposal-import-wasm-source.md

> Source: https://babeljs.io/docs/babel-plugin-proposal-import-wasm-source
> Scraped: 3/31/2025, 2:55:11 PM

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

#### _docs_babel-plugin-transform-react-jsx-development.md

> Source: https://babeljs.io/docs/babel-plugin-transform-react-jsx-development
> Scraped: 4/2/2025, 4:57:06 PM

info

This plugin is included in `@babel/preset-react`

This plugin is a developer version of [`@babel/plugin-transform-react-jsx`](_docs_babel-plugin-transform-react-jsx.md). It is designed to provide enhanced validation error messages and precise code location information for debugging React apps. Note that this plugin is intended to be used in a development environment, as it generates significantly more outputs than the production build.

If you are using [`@babel/preset-react`](_docs_babel-preset-react.md), it will be automatically enabled by the [`development`](_docs_babel-preset-react.md#development) option so you don't have to install it.

## Example[​](_docs_babel-plugin-transform-react-jsx-development.md#example)

**In**

input.jsx
```
const profile = (  
  <div>    <img src="avatar.png" className="profile" />    <h3>{[user.firstName, user.lastName].join(" ")}</h3>  </div>);  
```
**Out**

output.js
```
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";  
  
const _jsxFileName = "input.jsx";  
const profile = _jsxDEV("div", {  
  children: [    _jsxDEV("img", {      src: "avatar.png",      className: "profile",    }, undefined, false, { fileName: _jsxFileName, lineNumber: 3, columnNumber: 5 }, this),    _jsxDEV("h3", {      children: [user.firstName, user.lastName].join(" "),    }, undefined, false, { fileName: _jsxFileName, lineNumber: 4, columnNumber: 5 }, this),  ]},  undefined, false, { fileName: _jsxFileName, lineNumber: 2, columnNumber: 3 }, this);  
```
## Installation[​](_docs_babel-plugin-transform-react-jsx-development.md#installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/plugin-transform-react-jsx-development  
```
## Usage[​](_docs_babel-plugin-transform-react-jsx-development.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-plugin-transform-react-jsx-development.md#with-a-configuration-file-recommended)

Without options:

babel.config.json
```
{  
  "plugins": ["@babel/plugin-transform-react-jsx-development"]}  
```
With options:

babel.config.json
```
{  
  "plugins": [    [      "@babel/plugin-transform-react-jsx-development",      {        "throwIfNamespace": false, // defaults to true        "runtime": "automatic", // defaults to classic        "importSource": "custom-jsx-library" // defaults to react      }    ]  ]}  
```
### Via CLI[​](_docs_babel-plugin-transform-react-jsx-development.md#via-cli)

Shell
```
babel --plugins @babel/plugin-transform-react-jsx-development script.js  
```
### Via Node API[​](_docs_babel-plugin-transform-react-jsx-development.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  plugins: ["@babel/plugin-transform-react-jsx-development"],});  
```
## Options[​](_docs_babel-plugin-transform-react-jsx-development.md#options)

It accepts the same options as [`@babel/plugin-transform-react-jsx`](_docs_babel-plugin-transform-react-jsx.md#options).

#### _docs_babel-plugin-transform-react-jsx.md

> Source: https://babeljs.io/docs/babel-plugin-transform-react-jsx
> Scraped: 4/2/2025, 4:57:05 PM

info

This plugin is included in `@babel/preset-react`

This plugin generates production-ready JS code. If you are developing a React app in a development environment, please use [`@babel/plugin-transform-react-jsx-development`](_docs_babel-plugin-transform-react-jsx-development.md) for a better debugging experience.

## Example[​](_docs_babel-plugin-transform-react-jsx.md#example)

### React Automatic Runtime[​](_docs_babel-plugin-transform-react-jsx.md#react-automatic-runtime)

Automatic runtime is a feature added in `v7.9.0`. With this runtime enabled, the functions that JSX compiles to will be imported automatically.

**In**

JavaScript
```
const profile = (  
  <div>    <img src="avatar.png" className="profile" />    <h3>{[user.firstName, user.lastName].join(" ")}</h3>  </div>);  
```
**Out**

JavaScript
```
import { jsx as _jsx } from "react/jsx-runtime";  
import { jsxs as _jsxs } from "react/jsx-runtime";  
  
const profile = _jsxs("div", {  
  children: [    _jsx("img", {      src: "avatar.png",      className: "profile",    }),    _jsx("h3", {      children: [user.firstName, user.lastName].join(" "),    }),  ],});  
```
#### Customizing the Automatic Runtime Import[​](_docs_babel-plugin-transform-react-jsx.md#customizing-the-automatic-runtime-import)

**In**

JavaScript
```
/** @jsxImportSource custom-jsx-library */  
  
const profile = (  
  <div>    <img src="avatar.png" className="profile" />    <h3>{[user.firstName, user.lastName].join(" ")}</h3>  </div>);  
```
**Out**

JavaScript
```
import { jsx as _jsx } from "custom-jsx-library/jsx-runtime";  
import { jsxs as _jsxs } from "custom-jsx-library/jsx-runtime";  
  
const profile = _jsxs("div", {  
  children: [    _jsx("img", {      src: "avatar.png",      className: "profile",    }),    _jsx("h3", {      children: [user.firstName, user.lastName].join(" "),    }),  ],});  
```
**In**

JavaScript
```
/** @jsxRuntime classic */  
  
const profile = (  
  <div>    <img src="avatar.png" className="profile" />    <h3>{[user.firstName, user.lastName].join(" ")}</h3>  </div>);  
```
**Out**

JavaScript
```
const profile = React.createElement(  
  "div",  null,  React.createElement("img", { src: "avatar.png", className: "profile" }),  React.createElement("h3", null, [user.firstName, user.lastName].join(" ")));  
```
### React Classic Runtime[​](_docs_babel-plugin-transform-react-jsx.md#react-classic-runtime)

If you do not want (or cannot use) auto importing, you can use the classic runtime, which is the default behavior for v7 and prior.

**In**

JavaScript
```
const profile = (  
  <div>    <img src="avatar.png" className="profile" />    <h3>{[user.firstName, user.lastName].join(" ")}</h3>  </div>);  
```
**Out**

JavaScript
```
const profile = React.createElement(  
  "div",  null,  React.createElement("img", { src: "avatar.png", className: "profile" }),  React.createElement("h3", null, [user.firstName, user.lastName].join(" ")));  
```
#### Customizing the Classic Runtime Import[​](_docs_babel-plugin-transform-react-jsx.md#customizing-the-classic-runtime-import)

**In**

JavaScript
```
/** @jsx Preact.h */  
  
import Preact from "preact";  
  
const profile = (  
  <div>    <img src="avatar.png" className="profile" />    <h3>{[user.firstName, user.lastName].join(" ")}</h3>  </div>);  
```
**Out**

JavaScript
```
/** @jsx Preact.h */  
  
import Preact from "preact";  
  
const profile = Preact.h(  
  "div",  null,  Preact.h("img", { src: "avatar.png", className: "profile" }),  Preact.h("h3", null, [user.firstName, user.lastName].join(" ")));  
```
### Fragments[​](_docs_babel-plugin-transform-react-jsx.md#fragments)

[Fragments](https://reactjs.org/docs/fragments.html) are a feature available in React 16.2.0+.

#### React Automatic Runtime[​](_docs_babel-plugin-transform-react-jsx.md#react-automatic-runtime-1)

**In**

JavaScript
```
const descriptions = items.map((item) => (  
  <>    <dt>{item.name}</dt>    <dd>{item.value}</dd>  </>));  
```
**Out**

JavaScript
```
import { jsxs as _jsxs } from "react/jsx-runtime";  
import { Fragment as _Fragment } from "react/jsx-runtime";  
import { jsx as _jsx } from "react/jsx-runtime";  
  
const descriptions = items.map((item) =>  
  _jsxs(_Fragment, {    children: [      _jsx("dt", {        children: item.name,      }),      _jsx("dd", {        children: item.value,      }),    ],  }));  
```
#### React Classic Runtime[​](_docs_babel-plugin-transform-react-jsx.md#react-classic-runtime-1)

**In**

JavaScript
```
const descriptions = items.map((item) => (  
  <>    <dt>{item.name}</dt>    <dd>{item.value}</dd>  </>));  
```
**Out**

JavaScript
```
const descriptions = items.map((item) =>  
  React.createElement(    React.Fragment,    null,    React.createElement("dt", null, item.name),    React.createElement("dd", null, item.value)  ));  
```
#### Customizing with the Classic Runtime[​](_docs_babel-plugin-transform-react-jsx.md#customizing-with-the-classic-runtime)

**In**

JavaScript
```
/** @jsx Preact.h */  
/** @jsxFrag Preact.Fragment */  
  
import Preact from "preact";  
  
var descriptions = items.map((item) => (  
  <>    <dt>{item.name}</dt>    <dd>{item.value}</dd>  </>));  
```
**Out**

JavaScript
```
/** @jsx Preact.h */  
/** @jsxFrag Preact.Fragment */  
  
import Preact from "preact";  
  
var descriptions = items.map((item) =>  
  Preact.h(    Preact.Fragment,    null,    Preact.h("dt", null, item.name),    Preact.h("dd", null, item.value)  ));  
```
Note that if a custom pragma is specified, then a custom fragment pragma must also be specified if the fragment syntax `<></>` is used. Otherwise, an error will be thrown.

## Installation[​](_docs_babel-plugin-transform-react-jsx.md#installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/plugin-transform-react-jsx  
```
## Usage[​](_docs_babel-plugin-transform-react-jsx.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-plugin-transform-react-jsx.md#with-a-configuration-file-recommended)

Without options:

babel.config.json
```
{  
  "plugins": ["@babel/plugin-transform-react-jsx"]}  
```
With options:

babel.config.json
```
{  
  "plugins": [    [      "@babel/plugin-transform-react-jsx",      {        "throwIfNamespace": false, // defaults to true        "runtime": "automatic", // defaults to classic        "importSource": "custom-jsx-library" // defaults to react      }    ]  ]}  
```
### Via CLI[​](_docs_babel-plugin-transform-react-jsx.md#via-cli)

Shell
```
babel --plugins @babel/plugin-transform-react-jsx script.js  
```
### Via Node API[​](_docs_babel-plugin-transform-react-jsx.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  plugins: ["@babel/plugin-transform-react-jsx"],});  
```
## Options[​](_docs_babel-plugin-transform-react-jsx.md#options)

### Both Runtimes[​](_docs_babel-plugin-transform-react-jsx.md#both-runtimes)

#### `throwIfNamespace`[​](_docs_babel-plugin-transform-react-jsx.md#throwifnamespace)

`boolean`, defaults to `true`.

Toggles whether or not to throw an error if an XML namespaced tag name is used. For example:

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

tip

You can read more about configuring plugin options [here](_docs_en_plugins.md#plugin-options)

#### `runtime`[​](_docs_babel-plugin-transform-react-jsx.md#runtime)

`classic | automatic`, defaults to `classic`

Added in: `v7.9.0`

Decides which runtime to use.

`automatic` auto imports the functions that JSX transpiles to. `classic` does not automatically import anything.

### React Automatic Runtime[​](_docs_babel-plugin-transform-react-jsx.md#react-automatic-runtime-2)

#### importSource[​](_docs_babel-plugin-transform-react-jsx.md#importsource)

`string`, defaults to `react`.

Added in: `v7.9.0`

Replaces the import source when importing functions.

### React Classic Runtime[​](_docs_babel-plugin-transform-react-jsx.md#react-classic-runtime-2)

#### `pragma`[​](_docs_babel-plugin-transform-react-jsx.md#pragma)

`string`, defaults to `React.createElement`.

Replace the function used when compiling JSX expressions. It should be a qualified name (e.g. `React.createElement`) or an identifier (e.g. `createElement`).

Note that the `@jsx React.DOM` pragma has been deprecated as of React v0.12

#### `pragmaFrag`[​](_docs_babel-plugin-transform-react-jsx.md#pragmafrag)

`string`, defaults to `React.Fragment`.

Replace the component used when compiling JSX fragments. It should be a valid JSX tag name.

### `useBuiltIns`[​](_docs_babel-plugin-transform-react-jsx.md#usebuiltins)

`boolean`, defaults to `false`.

When spreading props, use `Object.assign` directly instead of Babel's extend helper.

### `useSpread`[​](_docs_babel-plugin-transform-react-jsx.md#usespread)

`boolean`, defaults to `false`.

When spreading props, use inline object with spread elements directly instead of Babel's extend helper or `Object.assign`.

#### _docs_babel-plugin-transform-runtime.md

> Source: https://babeljs.io/docs/babel-plugin-transform-runtime
> Scraped: 4/2/2025, 4:57:36 PM

A plugin that enables the re-use of Babel's injected helper code to save on codesize.

note

Instance methods such as `"foobar".includes("foo")` will only work with `core-js@3`. If you need to polyfill them, you can directly import `"core-js"` or use `@babel/preset-env`'s `useBuiltIns` option.

## Installation[​](_docs_babel-plugin-transform-runtime.md#installation)

Install it as development dependency.
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/plugin-transform-runtime  
```
and [`@babel/runtime`](_docs_babel-runtime.md) as a production dependency (since it's for the "runtime").
*   npm
*   Yarn
*   pnpm
```
npm install --save @babel/runtime  
```
The transformation plugin is typically used only in development, but the runtime itself will be depended on by your deployed code. See the examples below for more details.

danger

When this plugin is enabled, the `useBuiltIns` option in `@babel/preset-env` must not be set. Otherwise, this plugin may not able to completely sandbox the environment.

## Why?[​](_docs_babel-plugin-transform-runtime.md#why)

Babel uses very small helpers for common functions such as `_extend`. By default this will be added to every file that requires it. This duplication is sometimes unnecessary, especially when your application is spread out over multiple files.

This is where the `@babel/plugin-transform-runtime` plugin comes in: all of the helpers will reference the module `@babel/runtime` to avoid duplication across your compiled output. The runtime will be compiled into your build.

Another purpose of this transformer is to create a sandboxed environment for your code. If you directly import [core-js](https://github.com/zloirock/core-js) or [@babel/polyfill](_docs_babel-polyfill.md) and the built-ins it provides such as `Promise`, `Set` and `Map`, those will pollute the global scope. While this might be ok for an app or a command line tool, it becomes a problem if your code is a library which you intend to publish for others to use or if you can't exactly control the environment in which your code will run.

The transformer will alias these built-ins to `core-js` so you can use them seamlessly without having to require the polyfill.

See the [technical details](_docs_babel-plugin-transform-runtime.md#technical-details) section for more information on how this works and the types of transformations that occur.

## Usage[​](_docs_babel-plugin-transform-runtime.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-plugin-transform-runtime.md#with-a-configuration-file-recommended)

Without options:

babel.config.json
```
{  
  "plugins": ["@babel/plugin-transform-runtime"]}  
```
With options (and their defaults):

babel.config.json
```
{  
  "plugins": [    [      "@babel/plugin-transform-runtime",      {        "absoluteRuntime": false,        "corejs": false,        "helpers": true,        "regenerator": true,        "version": "7.0.0-beta.0"      }    ]  ]}  
```
The plugin defaults to assuming that all polyfillable APIs will be provided by the user. Otherwise the [`corejs`](_docs_babel-plugin-transform-runtime.md#corejs) option needs to be specified.

### Via CLI[​](_docs_babel-plugin-transform-runtime.md#via-cli)

Shell
```
babel --plugins @babel/plugin-transform-runtime script.js  
```
### Via Node API[​](_docs_babel-plugin-transform-runtime.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  plugins: ["@babel/plugin-transform-runtime"],});  
```
## Options[​](_docs_babel-plugin-transform-runtime.md#options)

### `absoluteRuntime`[​](_docs_babel-plugin-transform-runtime.md#absoluteruntime)

`boolean` or `string`, defaults to `false`.

This allows users to run `transform-runtime` broadly across a whole project. By default, `transform-runtime` imports from `@babel/runtime/foo` directly, but that only works if `@babel/runtime` is in the `node_modules` of the file that is being compiled. This can be problematic for nested `node_modules`, npm-linked modules, or CLIs that reside outside the user's project, among other cases. To avoid worrying about how the runtime module's location is resolved, this allows users to resolve the runtime once up front, and then insert absolute paths to the runtime into the output code.

Using absolute paths is not desirable if files are compiled for use at a later time, but in contexts where a file is compiled and then immediately consumed, they can be quite helpful.

tip

You can read more about configuring plugin options [here](_docs_en_plugins.md#plugin-options)

### `corejs`[​](_docs_babel-plugin-transform-runtime.md#corejs)

`false`, `2`, `3` or `{ version: 2 | 3, proposals: boolean }`, defaults to `false`.

e.g. `['@babel/plugin-transform-runtime', { corejs: 3 }],`

History

Version

Changes

`v7.4.0`

Supports `{ proposals: boolean }`

Specifying a number will rewrite the helpers that need polyfillable APIs to reference helpers from that (major) version of `core-js` instead Please note that `corejs: 2` only supports global variables (e.g. `Promise`) and static properties (e.g. `Array.from`), while `corejs: 3` also supports instance properties (e.g. `[].includes`).

By default, `@babel/plugin-transform-runtime` doesn't polyfill proposals. If you are using `corejs: 3`, you can opt into this by enabling using the `proposals: true` option.

This option requires changing the dependency used to provide the necessary runtime helpers:

`corejs` option

Install command

`false`

`npm install --save @babel/runtime`

`2`

`npm install --save @babel/runtime-corejs2`

`3`

`npm install --save @babel/runtime-corejs3`

### `helpers`[​](_docs_babel-plugin-transform-runtime.md#helpers)

`boolean`, defaults to `true`.

Toggles whether or not inlined Babel helpers (`classCallCheck`, `extends`, etc.) are replaced with calls to `@babel/runtime` (or equivalent package).

For more information, see [Helper aliasing](_docs_babel-plugin-transform-runtime.md#helper-aliasing).

caution

The `helpers` option will be removed in Babel 8, as this plugin will only be used to inject helpers (including `regeneratorRuntime`, which will be handled as any other Babel helper).

### `moduleName`[​](_docs_babel-plugin-transform-runtime.md#modulename)

History

Version

Changes

`v7.24.0`

Added `moduleName` option

`string`, defaults to `@babel/runtime`.

This option controls which package of helpers `@babel/plugin-transform-runtime` will use when injecting imports. It uses the following priority:
*   `moduleName` option, if specified
*   Helpers module suggested by any `babel-plugin-polyfill-*` plugin
    *   `babel-plugin-polyfill-corejs3` suggests `@babel/runtime-corejs3`
    *   `babel-plugin-polyfill-corejs2` suggests `@babel/runtime-corejs2`
*   Fallback to `@babel/runtime`

Note that specifying the [`corejs`](_docs_babel-plugin-transform-runtime.md#corejs) option will internally enable the corresponding `babel-plugin-polyfill-corejs*` plugin, thus it has an effect on the final module name.

### `regenerator`[​](_docs_babel-plugin-transform-runtime.md#regenerator)

`boolean`, defaults to `true`.

In older Babel version, this option used to toggles whether or not generator functions were transformed to use a regenerator runtime that does not pollute the global scope.

For more information, see [Regenerator aliasing](_docs_babel-plugin-transform-runtime.md#regenerator-aliasing).

caution

The `regenerator` option will be removed in Babel 8, as it will not be necessary anymore.

### `useESModules`[​](_docs_babel-plugin-transform-runtime.md#useesmodules)

`boolean`, defaults to `false`.

History

Version

Changes

`v7.13.0`

This option has been deprecated

When enabled, the transform will use helpers that do not get run through `@babel/plugin-transform-modules-commonjs`. This allows for smaller builds in module systems like webpack, since it doesn't need to preserve commonjs semantics.

For example, here is the `classCallCheck` helper with `useESModules` disabled:

JavaScript
```
exports.__esModule = true;  
  
exports.default = function(instance, Constructor) {  
  if (!(instance instanceof Constructor)) {    throw new TypeError("Cannot call a class as a function");  }};  
```
And, with it enabled:

JavaScript
```
export default function(instance, Constructor) {  
  if (!(instance instanceof Constructor)) {    throw new TypeError("Cannot call a class as a function");  }}  
```
caution

The `useESModules` option has been deprecated and will be removed in Babel 8: starting from version `7.13.0`, `@babel/runtime`'s `package.json` uses `"exports"` option to automatically choose between CJS and ESM helpers.

### `version`[​](_docs_babel-plugin-transform-runtime.md#version)

By default transform-runtime assumes that `@babel/runtime@7.0.0` is installed. If you have later versions of `@babel/runtime` (or their corejs counterparts e.g. `@babel/runtime-corejs3`) installed or listed as a dependency, transform-runtime can use more advanced features.

For example if you depend on `@babel/runtime@^7.24.0` you can transpile your code with

babel.config.json
```
{  
  "plugins": [    ["@babel/plugin-transform-runtime", {      "version": "^7.24.0"    }]  ]}  
```
which results in a smaller bundle size.

## Technical details[​](_docs_babel-plugin-transform-runtime.md#technical-details)

The `transform-runtime` transformer plugin does three things:
*   Automatically requires `@babel/runtime/regenerator` when you use generators/async functions (toggleable with the `regenerator` option).
*   Can use `core-js` for helpers if necessary instead of assuming it will be polyfilled by the user (toggleable with the `corejs` option)
*   Automatically removes the inline Babel helpers and uses the module `@babel/runtime/helpers` instead (toggleable with the `helpers` option).

What does this actually mean though? Basically, you can use built-ins such as `Promise`, `Set`, `Symbol`, etc., as well use all the Babel features that require a polyfill seamlessly, without global pollution, making it extremely suitable for libraries.

Make sure you include `@babel/runtime` as a dependency.

### Regenerator aliasing[​](_docs_babel-plugin-transform-runtime.md#regenerator-aliasing)

Whenever you use a generator function or async function:

the following is generated:

JavaScript
```
"use strict";  
  
var _marked = [foo].map(regeneratorRuntime.mark);  
  
function foo() {  
  return regeneratorRuntime.wrap(    function foo$(_context) {      while (1) {        switch ((_context.prev = _context.next)) {          case 0:          case "end":            return _context.stop();        }      }    },    _marked[0],    this  );}  
```
This isn't ideal since it relies on the regenerator runtime being included, which pollutes the global scope.

With the `runtime` transformer, however, it is compiled to:

JavaScript
```
"use strict";  
  
var _regenerator = require("@babel/runtime/regenerator");  
  
var _regenerator2 = _interopRequireDefault(_regenerator);  
  
function _interopRequireDefault(obj) {  
  return obj && obj.__esModule ? obj : { default: obj };}  
  
var _marked = [foo].map(_regenerator2.default.mark);  
  
function foo() {  
  return _regenerator2.default.wrap(    function foo$(_context) {      while (1) {        switch ((_context.prev = _context.next)) {          case 0:          case "end":            return _context.stop();        }      }    },    _marked[0],    this  );}  
```
This means that you can use the regenerator runtime without polluting your current environment.

### `core-js` aliasing[​](_docs_babel-plugin-transform-runtime.md#core-js-aliasing)

Sometimes you may want to use new built-ins such as `Map`, `Set`, `Promise` etc. Your only way to use these is usually to include a globally polluting polyfill.

This is with the `corejs` option.

The plugin transforms the following:

JavaScript
```
var sym = Symbol();  
  
var promise = Promise.resolve();  
  
var check = arr.includes("yeah!");  
  
console.log(arr[Symbol.iterator]());  
```
into the following:

JavaScript
```
import _getIterator from "@babel/runtime-corejs3/core-js/get-iterator";  
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";  
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";  
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";  
  
var sym = _Symbol();  
  
var promise = _Promise.resolve();  
  
var check = _includesInstanceProperty(arr).call(arr, "yeah!");  
  
console.log(_getIterator(arr));  
```
This means is that you can seamlessly use these native built-ins and methods without worrying about where they come from.

**NOTE:** Instance methods such as `"foobar".includes("foo")` will only work when using `corejs: 3`.

### Helper aliasing[​](_docs_babel-plugin-transform-runtime.md#helper-aliasing)

Usually Babel will place helpers at the top of your file to do common tasks to avoid duplicating the code around in the current file. Sometimes these helpers can get a little bulky and add unnecessary duplication across files. The `runtime` transformer replaces all the helper calls to a module.

That means that the following code:

usually turns into:

JavaScript
```
"use strict";  
  
function _classCallCheck(instance, Constructor) {  
  if (!(instance instanceof Constructor)) {    throw new TypeError("Cannot call a class as a function");  }}  
  
var Person = function Person() {  
  _classCallCheck(this, Person);};  
```
the `runtime` transformer however turns this into:

JavaScript
```
"use strict";  
  
var _classCallCheck2 = require("@babel/runtime/helpers/classCallCheck");  
  
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);  
  
function _interopRequireDefault(obj) {  
  return obj && obj.__esModule ? obj : { default: obj };}  
  
var Person = function Person() {  
  (0, _classCallCheck3.default)(this, Person);};  
```
## Removed options[​](_docs_babel-plugin-transform-runtime.md#removed-options)

The following options were removed in Babel 7.0.0:
*   `useBuiltIns`
*   `polyfill`

#### _docs_babel-plugin-transform-typescript.md

> Source: https://babeljs.io/docs/babel-plugin-transform-typescript
> Scraped: 4/2/2025, 4:54:09 PM

info

This plugin is included in `@babel/preset-typescript`

This plugin adds support for the types syntax used by the [TypeScript programming language](https://www.typescriptlang.org/). However, this plugin does not add the ability to type-check the JavaScript passed to it. For that, you will need to install and set up TypeScript.

Note that although the TypeScript compiler `tsc` actively supports certain JavaScript proposals such as optional chaining (`?.`), nullish coalescing (`??`) and class properties (`this.#x`), this preset does not include these features because they are not the types syntax available in TypeScript only. We recommend using `preset-env` with `preset-typescript` if you want to transpile these features.

## Example[​](_docs_babel-plugin-transform-typescript.md#example)

**In***Out**

## Installation[​](_docs_babel-plugin-transform-typescript.md#installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/plugin-transform-typescript  
```
## Usage[​](_docs_babel-plugin-transform-typescript.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-plugin-transform-typescript.md#with-a-configuration-file-recommended)

babel.config.json
```
{  
  "plugins": ["@babel/plugin-transform-typescript"]}  
```
### Via CLI[​](_docs_babel-plugin-transform-typescript.md#via-cli)

Shell
```
babel --plugins @babel/plugin-transform-typescript script.js  
```
### Via Node API[​](_docs_babel-plugin-transform-typescript.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  plugins: ["@babel/plugin-transform-typescript"],});  
```
## Options[​](_docs_babel-plugin-transform-typescript.md#options)

### `allowDeclareFields`[​](_docs_babel-plugin-transform-typescript.md#allowdeclarefields)

`boolean`, defaults to `false`

Added in `v7.7.0`

note

This will be enabled by default in Babel 8

When enabled, type-only class fields are only removed if they are prefixed with the `declare` modifier:

JavaScript
```
class A {  
  declare foo: string; // Removed  bar: string; // Initialized to undefined}  
```
### `allowNamespaces`[​](_docs_babel-plugin-transform-typescript.md#allownamespaces)

`boolean`, defaults to `true`.

History

Version

Changes

`v7.5.0`

Added `allowNamespaces`, defaults to `false`

`v7.13.0`

defaults to `true`

Enables compilation of TypeScript namespaces.

### `disallowAmbiguousJSXLike`[​](_docs_babel-plugin-transform-typescript.md#disallowambiguousjsxlike)

`boolean`, defaults to `false`

Added in: `v7.16.0`

Even when JSX parsing is not enabled, this option disallows using syntax that would be ambiguous with JSX (`<X> y` type assertions and `<X>() => {}` type arguments). It matches the `tsc` behavior when parsing `.mts` and `.mjs` files.

### `dts`[​](_docs_babel-plugin-transform-typescript.md#dts)

`boolean`, defaults to `false`

Added in: `v7.20.0`

This option will enable parsing within a TypeScript ambient context, where certain syntax have different rules (like `.d.ts` files and inside `declare module` blocks). Please see [Official Handbook](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) and [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/type-system/intro) for more information about ambient contexts.

### `isTSX`[​](_docs_babel-plugin-transform-typescript.md#istsx)

`boolean`, defaults to `false`

Forcibly enables `jsx` parsing. Otherwise angle brackets will be treated as TypeScript's legacy type assertion `var foo = <string>bar;`. Also, `isTSX: true` requires `allExtensions: true`.

### `jsxPragma`[​](_docs_babel-plugin-transform-typescript.md#jsxpragma)

`string`, defaults to `React.createElement`

Replace the function used when compiling JSX expressions. This is so that we know that the import is not a type import, and should not be removed.

### `jsxPragmaFrag`[​](_docs_babel-plugin-transform-typescript.md#jsxpragmafrag)

`string`, defaults to `React.Fragment`

Replace the function used when compiling JSX fragment expressions. This is so that we know that the import is not a type import, and should not be removed.

### `onlyRemoveTypeImports`[​](_docs_babel-plugin-transform-typescript.md#onlyremovetypeimports)

`boolean`, defaults to `false`

Added in: `v7.9.0`

When set to `true`, the transform will only remove [type-only imports](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-exports) (introduced in TypeScript 3.8). This should only be used if you are using TypeScript >= 3.8.

JavaScript
```
class A {  
  declare foo: string; // Removed  bar: string; // Initialized to undefined  prop?: string; // Initialized to undefined  prop1!: string // Initialized to undefined}  
```
### `optimizeConstEnums`[​](_docs_babel-plugin-transform-typescript.md#optimizeconstenums)

`boolean`, defaults to `false`

Added in: `v7.15.0`

When set to `true`, Babel will inline enum values rather than using the usual `enum` output:
```
// Input  
const enum Animals {  
  Fish,}  
console.log(Animals.Fish);  
  
// Default output  
var Animals;  
  
(function(Animals) {  
  Animals[(Animals["Fish"] = 0)] = "Fish";})(Animals || (Animals = {}));  
  
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
## TypeScript Compiler Options[​](_docs_babel-plugin-transform-typescript.md#typescript-compiler-options)

The official TypeScript compiler has many [options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for configuring how it compiles and type checks. While many don't apply, some behaviors might be useful and their equivalents in Babel can be enabled by some configuration options or plugins.
*   `--alwaysStrict` You can use the `strictMode` [parser option](_docs_en_babel-parser.md#options):
    
    JavaScript
    
    ```
    module.exports = {  
      parserOpts: { strictMode: true },};  
    
    ```
    
*   `--downlevelIteration` You can use the `@babel/plugin-transform-for-of` plugin. If you are using `@babel/preset-env`, `for...of` is already transpiled using iterators when it isn't supported by your compilation target(s).
    
*   `--emitDecoratorMetadata` This option isn't supported by an official Babel package since it is a TypeScript-specific addition and not part of the decorators proposal. If you rely on this feature, you can use the community plugin [babel-plugin-transform-typescript-metadata](https://github.com/leonardfactory/babel-plugin-transform-typescript-metadata#readme).
    
*   `--esModuleInterop` This is the default behavior of Babel when transpiling ECMAScript modules.
    
*   `--experimentalDecorators` This option enables support for the "legacy" decorator proposal. You can enable it in Babel using the `@babel/plugin-proposal-decorators` plugin, but please be aware, there are some minor differences.
    
    JavaScript
    
    ```
    module.exports = {  
      plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],};  
    
    ```
    
*   `--importHelpers` This is the equivalent of the `@babel/plugin-transform-runtime` package.
    
*   `---importsNotUsedAsValues` You can use the `onlyRemoveTypeImports` option to replicate this behavior. `onlyRemoveTypeImports: true` is equivalent to `importsNotUsedAsValues: preserve`, while `onlyRemoveTypeImports: false` is equivalent to `importsNotUsedAsValues: remove`. There is no equivalent for `importsNotUsedAsValues: error`.
    
*   `--inlineSourceMap` You can set the [`sourceMaps: "inline"`](_docs_en_options.md#sourcemaps) option in your `babel.config.json` file.
    
*   `--isolatedModules` This is the default Babel behavior, and it can't be turned off because Babel doesn't support cross-file analysis.
    
*   `--jsx` JSX support is provided using another plugin. If you want your output to contains JSX code (i.e. `--jsx preserve`), you need the `@babel/plugin-syntax-jsx` plugin; if you want to transpile it to standard JavaScript (i.e. `--jsx react` or `--jsx react-native`), you should use the `@babel/plugin-transform-react-jsx` plugin.
    
*   `--jsxFactory` It can be customized using the [`pragma` option](_docs_en_babel-plugin-transform-react-jsx.md#pragma) of the `@babel/plugin-transform-react-jsx` package. You also need to set the `jsxPragma` option of this plugin.
    
*   `--module`, `-m` If you are using a bundler (Webpack or Rollup), this option is set automatically. If you are using `@babel/preset-env`, you can use the [`modules` option](_docs_en_babel-preset-env.md#modules); otherwise you can load the specific plugin.
    
    **`--module` value***`@babel/preset-env`'s `modules`***Single plugin**
    
    `None`
    
    `false`
    
    /
    
    `CommonJS`
    
    `"commonjs"` or `"cjs"`
    
    `@babel/plugin-transform-modules-commonjs`
    
    `AMD`
    
    `"amd"`
    
    `@babel/plugin-transform-modules-amd`
    
    `System`
    
    `"systemjs"`
    
    `@babel/plugin-transform-modules-systemjs`
    
    `UMD`
    
    `"umd"`
    
    `@babel/plugin-transform-modules-umd`
    
    `ES6` or `ES2015`
    
    `false`
    
    /
    
*   `--outDir` When using `@babel/cli`, you can set the [`--out-dir` option](_docs_en_babel-cli.md#compile-directories).
    
*   `--outFile` Babel doesn't support concatenating output files: you should use a bundler (like Webpack, Rollup or Parcel) for that. When using `@babel/cli`, you can compile a single file using the [`--out-file` option](_docs_en_babel-cli.md#compile-files).
    
*   `--sourceMap` You can use the top-level [`sourceMaps: true` option](_docs_en_options.md#sourcemaps).
    
*   `--target` Babel doesn't support targeting a specific version of the language, but you can choose which engines you want to target using [`@babel/preset-env`](_docs_en_babel-preset-env.md). If you prefer, you can enable [individual plugins](_docs_en_plugins.md) for every ECMAScript feature.
    
*   `--useDefineForClassFields` You can use the [`setPublicClassFields`](_docs_assumptions.md#setpublicclassfields) assumption to replicate this behavior.
    
*   `--watch`, `-w` When using `@babel/cli`, you can specify the [`--watch` option](_docs_en_babel-cli.md#compile-files).
    

## Caveats[​](_docs_babel-plugin-transform-typescript.md#caveats)

Because there are features of the TypeScript language which rely on the full type-system to be available to make changes at runtime. This section of caveats is quite long, however, it's worth noting that a few of these features are only found in older TypeScript codebases and have modern JavaScript equivalents which you are probably already using.

1.  Since Babel does not type-check, code which is syntactically correct, but would fail the TypeScript type-checking may successfully get transformed, and often in unexpected or invalid ways.
    
2.  Changes to your `tsconfig.json` are not reflected in babel. The build process will always behave as though [`isolatedModules`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) is turned on, there are Babel-native alternative ways to set a lot of the [`tsconfig.json` options](_docs_babel-plugin-transform-typescript.md#typescript-compiler-options) however.
    
3.  **Q**: Why doesn't Babel allow export of a `var` or `let`?
    
    **A**: The TypeScript compiler dynamically changes how these variables are used depending on whether or not the value is mutated. Ultimately, this depends on a type-model and is outside the scope of Babel. A best-effort implementation would transform context-dependent usages of the variable to always use the `Namespace.Value` version instead of `Value`, in case it was mutated outside of the current file. Allowing `var` or `let` from Babel (as the transform is not-yet-written) is therefore is more likely than not to present itself as a bug when used as-if it was not `const`.
    

### Impartial Namespace Support[​](_docs_babel-plugin-transform-typescript.md#impartial-namespace-support)

If you have existing code which uses the TypeScript-only [namespace](https://www.typescriptlang.org/docs/handbook/namespaces.html) features. Babel supports a subset of TypeScript's namespace features. If you are considering writing new code which uses namespace, using the ES2015 `import`/`export` is recommended instead. It's [not going away](https://github.com/microsoft/TypeScript/issues/30994#issuecomment-484150549), but there are modern alternatives.
*   Type-only `namespace`s should be marked with `declare` and will subsequently be safely removed.
    
*   `export`ing a variable using `var` or `let` in a `namespace` will result in an error: _"Namespaces exporting non-const are not supported by Babel. Change to const or ..."_
    
    **Workaround**: Use `const`. If some form of mutation is required, explicitly use an object with internal mutability.
    
*   `namespace`s will not share their scope. In TypeScript, it is valid to refer to contextual items that a `namespace` extends without qualifying them, and the compiler will add the qualifier. In Babel, there is no type-model, and it is impossible to dynamically change references to match the established type of the parent object.
    
    Consider this code:
    
    ```
    namespace N {  
      export const V = 1;}  
    namespace N {  
      export const W = V;}  
    
    ```
    
    The TypeScript compiler compiles it to something like this:
    
    JavaScript
    
    ```
    var N = {};  
    (function(N) {  
      N.V = 1;})(N);  
    (function(N) {  
      N.W = N.V;})(N);  
    
    ```
    
    While Babel will transform it to something like this:
    
    JavaScript
    
    ```
    var N;  
    (function(_N) {  
      const V = (_N = 1);})(N || (N = {}));  
    (function(_N) {  
      const W = V;})(N || (N = {}));  
    
    ```
    
    As Babel doesn't understand the type of `N`, the reference to `V` will be `undefined` resulting in an error.
    
    **Workaround**: Explicitly refer to values not in the same namespace definition, even if they would be in the scope according to TypeScript. Examples:
    
    ```
    namespace N {  
      export const V = 1;}  
    namespace N {  
      export const W = N.V;}  
    
    ```
    
    Or:
    
    ```
    namespace N {  
      export const V = 1;  export const W = V;}  
    
    ```

#### _docs_babel-polyfill.md

> Source: https://babeljs.io/docs/babel-polyfill
> Scraped: 4/2/2025, 4:57:36 PM

danger

🚨 As of Babel 7.4.0, this package has been deprecated in favor of directly including `core-js/stable` (to polyfill ECMAScript features):

If you are compiling generators or async function to ES5, and you are using a version of `@babel/core` or `@babel/plugin-transform-regenerator` older than `7.18.0`, you must also load the [`regenerator runtime`](https://github.com/facebook/regenerator/tree/main/packages/runtime) package. It is automatically loaded when using `@babel/preset-env`'s `useBuiltIns: "usage"` option or `@babel/plugin-transform-runtime`.

Babel includes a [polyfill](https://en.wikipedia.org/wiki/Polyfill_(programming)) that includes a custom [regenerator runtime](https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js) and [core-js](https://github.com/zloirock/core-js).

This will emulate a full ES2015+ environment (no < Stage 4 proposals) and is intended to be used in an application rather than a library/tool. (this polyfill is automatically loaded when using `babel-node`).

This means you can use new built-ins like `Promise` or `WeakMap`, static methods like `Array.from` or `Object.assign`, instance methods like `Array.prototype.includes`, and generator functions (provided you use the [regenerator](_docs_babel-plugin-transform-regenerator.md) plugin). The polyfill adds to the global scope as well as native prototypes like `String` in order to do this.

## Installation[​](_docs_babel-polyfill.md#installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save @babel/polyfill  
```
info

Because this is a polyfill (which will run before your source code), we need it to be a `dependency`, not a `devDependency`

## Size[​](_docs_babel-polyfill.md#size)

The polyfill is provided as a convenience but you should use it with [`@babel/preset-env`](_docs_babel-preset-env.md) and the [`useBuiltIns` option](_docs_babel-preset-env.md#usebuiltins) so that it doesn't include the whole polyfill which isn't always needed. Otherwise, we would recommend you import the individual polyfills manually.

## TC39 Proposals[​](_docs_babel-polyfill.md#tc39-proposals)

If you need to use a proposal that is not Stage 4, `@babel/polyfill` will not automatically import those for you. You will have to import those from another polyfill like [`core-js`](https://github.com/zloirock/core-js) individually. We may work towards including this as separate files in `@babel/polyfill` soon.

## Usage in Node / Browserify / Webpack[​](_docs_babel-polyfill.md#usage-in-node--browserify--webpack)

To include the polyfill you need to require it at the top of the **entry point** to your application.

Make sure it is called before all other code/require statements!

JavaScript
```
require("@babel/polyfill");  
```
If you are using ES6's `import` syntax in your application's **entry point**, you should instead import the polyfill at the top of the **entry point** to ensure the polyfills are loaded first:

JavaScript
```
import "@babel/polyfill";  
```
With webpack, there are multiple ways to include the polyfills:
*   When used alongside [`@babel/preset-env`](_docs_babel-preset-env.md),
    
    *   If `useBuiltIns: 'usage'` is specified in `.babelrc` then do not include `@babel/polyfill` in either `webpack.config.js` entry array nor source. Note, `@babel/polyfill` still needs to be installed.
        
    *   If `useBuiltIns: 'entry'` is specified in `.babelrc` then include `@babel/polyfill` at the top of the entry point to your application via `require` or `import` as discussed above.
        
    *   If `useBuiltIns` key is not specified or it is explicitly set with `useBuiltIns: false` in your .babelrc, add `@babel/polyfill` directly to the entry array in your `webpack.config.js`.
        

webpack.config.js
```
module.exports = {  
  entry: ["@babel/polyfill", "./app/js"],};  
```
*   If [`@babel/preset-env`](_docs_babel-preset-env.md) is not used then add `@babel/polyfill` to webpack entry array as discussed above. It can still be added at the top of the entry point to application via `import` or `require`, but this is not recommended.

caution

We do not recommend that you import the whole polyfill directly: either try the `useBuiltIns` options or import only the polyfills you need manually (either from this package or somewhere else).

## Usage in Browser[​](_docs_babel-polyfill.md#usage-in-browser)

Available from the `dist/polyfill.js` file within a `@babel/polyfill` npm release. This needs to be included **before** all your compiled Babel code. You can either prepend it to your compiled code or include it in a `<script>` before it.

**NOTE:** Do not `require` this via browserify etc, use `@babel/polyfill`.

## Details[​](_docs_babel-polyfill.md#details)

tip

If you are looking for something that won't modify globals to be used in a tool/library, checkout the [`transform-runtime`](_docs_babel-plugin-transform-runtime.md) plugin. This means you won't be able to use the instance methods mentioned above like `Array.prototype.includes`.

Note: Depending on what ES2015 methods you actually use, you may not need to use `@babel/polyfill` or the runtime plugin. You may want to only [load the specific polyfills you are using](https://github.com/zloirock/core-js#commonjs-api) (like `Object.assign`) or just document that the environment the library is being loaded in should include certain polyfills.

#### _docs_babel-preset-env.md

> Source: https://babeljs.io/docs/babel-preset-env
> Scraped: 4/2/2025, 4:57:36 PM

`@babel/preset-env` is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!
*   [Install](_docs_babel-preset-env.md#install)
*   [How Does it Work?](_docs_babel-preset-env.md#how-does-it-work)
*   [Browserslist Integration](_docs_babel-preset-env.md#browserslist-integration)
*   [Options](_docs_babel-preset-env.md#options)

## Install[​](_docs_babel-preset-env.md#install)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/preset-env  
```
## How Does it Work?[​](_docs_babel-preset-env.md#how-does-it-work)

`@babel/preset-env` would not be possible if not for a number of awesome open-source projects, like [`browserslist`](https://github.com/browserslist/browserslist), [`compat-table`](https://github.com/kangax/compat-table), and [`electron-to-chromium`](https://github.com/Kilian/electron-to-chromium).

We leverage these data sources to maintain [mappings of which version](https://github.com/babel/babel/blob/main/packages/babel-compat-data/data/plugins.json) of our supported target environments gained support of a JavaScript syntax or browser feature, as well as a mapping of those syntaxes and features to Babel transform plugins and core-js polyfills.

note

`@babel/preset-env` won't include any JavaScript syntax proposals less than Stage 3 because at that stage in the TC39 process, it wouldn't be implemented by any browsers anyway. Those would need to be included manually. The `shippedProposals` option will include Stage 3 proposals that some browsers have already implemented.

`@babel/preset-env` takes any [target environments you've specified](_docs_babel-preset-env.md#targets) and checks them against its mappings to compile a list of plugins and passes it to Babel.

## Browserslist Integration[​](_docs_babel-preset-env.md#browserslist-integration)

For browser- or Electron-based projects, we recommend using a [`.browserslistrc`](https://github.com/browserslist/browserslist) file to specify targets. You may already have this configuration file as it is used by many tools in the ecosystem, like [autoprefixer](https://github.com/postcss/autoprefixer), [stylelint](https://stylelint.io/), [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat) and many others.

By default `@babel/preset-env` will use [browserslist config sources](https://github.com/ai/browserslist#queries) _unless_ either the [targets](_docs_babel-preset-env.md#targets) or [ignoreBrowserslistConfig](_docs_babel-preset-env.md#ignorebrowserslistconfig) options are set.

tip

If you are relying on browserslist's defaults query (either explicitly or by having no browserslist config), you will want to check out the [No targets](_docs_options.md#no-targets) section for information on preset-env's behavior.

For example, to only include polyfills and code transforms needed for users whose browsers have >0.25% market share (ignoring browsers without security updates like IE 10 and BlackBerry):

babel.config.json
```
{  
  "presets": [    [      "@babel/preset-env",      {        "useBuiltIns": "entry",        "corejs": "3.22"      }    ]  ]}  
```
or

package.json
```
{ "browserslist": "> 0.25%, not dead" }  
```
note

Please note that since `v7.4.5` the browserslist query is resolved with [`mobileToDesktop: true`](https://github.com/browserslist/browserslist#js-api). For example, if you want to create a snapshot of a query run `npx browserslist --mobile-to-desktop ">0.25%, not dead"`.

## Options[​](_docs_babel-preset-env.md#options)

For more information on setting options for a preset, refer to the [preset options](_docs_presets.md#preset-options) documentation.

### `targets`[​](_docs_babel-preset-env.md#targets)

`string | Array<string> | { [string]: string }`, defaults to the top-level `targets` option if no browserslist-related option is specified in `@babel/preset-env`'s docs, otherwise to `{}`.

For usage, refer to the [`targets` option](_docs_options.md#targets) documentation.

### `bugfixes`[​](_docs_babel-preset-env.md#bugfixes)

`boolean`, defaults to `false`.

Added in: `v7.9.0`

note

This option will be enabled by default in Babel 8.

By default, `@babel/preset-env` (and Babel plugins in general) grouped ECMAScript syntax features into collections of closely related smaller features. These groups can be large and include a lot of edge cases, for example "function arguments" includes destructured, default and rest parameters. From this grouping information, Babel enables or disables each group based on the browser support target you specify to `@babel/preset-env`’s `targets` option.

When this option is enabled, `@babel/preset-env` tries to compile the broken syntax to the closest _non-broken modern syntax_ supported by your target browsers. Depending on your `targets` and on how many modern syntax you are using, this can lead to a significant size reduction in the compiled app. This option merges the features of [`@babel/preset-modules`](https://github.com/babel/preset-modules) without having to use another preset.

### `spec`[​](_docs_babel-preset-env.md#spec)

`boolean`, defaults to `false`.

Enable more spec compliant, but potentially slower, transformations for any plugins in this preset that support them.

### `loose`[​](_docs_babel-preset-env.md#loose)

`boolean`, defaults to `false`.

Enable ["loose" transformations](http://2ality.com/2015/12/babel6-loose-mode.html) for any plugins in this preset that allow them.

### `modules`[​](_docs_babel-preset-env.md#modules)

`"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false`, defaults to `"auto"`.

Enable transformation of ES module syntax to another module type. Note that `cjs` is just an alias for `commonjs`.

Setting this to `false` will preserve ES modules. Use this only if you intend to ship native ES Modules to browsers. If you are using a bundler with Babel, the default `modules: "auto"` is always preferred.

#### `modules: "auto"`[​](_docs_babel-preset-env.md#modules-auto)

By default `@babel/preset-env` uses [`caller`](_docs_options.md#caller) data to determine whether ES modules and module features (e.g. `import()`) should be transformed. Generally `caller` data will be specified in the bundler plugins (e.g. `babel-loader`, `@rollup/plugin-babel`) and thus it is not recommended to pass `caller` data yourself -- The passed `caller` may overwrite the one from bundler plugins and in the future you may get suboptimal results if bundlers supports new module features.

### `debug`[​](_docs_babel-preset-env.md#debug)

`boolean`, defaults to `false`.

Outputs to `console.log` the polyfills and transform plugins enabled by `preset-env` and, if applicable, which one of your targets that needed it.

### `include`[​](_docs_babel-preset-env.md#include)

`Array<string|RegExp>`, defaults to `[]`.

History

Version

Changes

`v7.4.0`

Support injecting `core-js@3` polyfills

An array of plugins to always include.

Valid options include any:
*   [Babel plugins](https://github.com/babel/babel/blob/main/packages/babel-preset-env/src/available-plugins.ts) - both full and shorthand names are supported, for example the following are functionally equivalent:
    *   `@babel/plugin-transform-spread`
    *   `@babel/transform-spread`
    *   `babel-transform-spread`
    *   `transform-spread`
*   Built-ins (both for [core-js@3](https://github.com/babel/babel/blob/master/packages/babel-preset-env/src/polyfills/corejs3/built-in-definitions.js) and [core-js@2](https://github.com/babel/babel/blob/master/packages/babel-preset-env/src/polyfills/corejs2/built-in-definitions.js), such as `es.map`, `es.set`, or `es.object.assign`.

Plugin names can be fully or partially specified (or using `RegExp`).

Acceptable inputs:
*   Full name (`string`): `"es.math.sign"`
*   Partial name (`string`): `"es.math.*"` (resolves to all plugins with `es.math` prefix)
*   `RegExp` Object: `/^transform-.*$/` or `new RegExp("^transform-modules-.*")`

Note that the above `.` is the `RegExp` equivalent to match any character, and not the actual `'.'` character. Also note that to match any character `.*` is used in `RegExp` as opposed to `*` in `glob` format.

This option is useful if there is a bug in a native implementation, or a combination of a non-supported feature + a supported one doesn't work.

For example, Node 4 supports native classes but not spread. If `super` is used with a spread argument, then the `@babel/plugin-transform-classes` transform needs to be `include`d, as it is not possible to transpile a spread with `super` otherwise.

note

The `include` and `exclude` options _only_ work with the [plugins included with this preset](https://github.com/babel/babel/blob/main/packages/babel-preset-env/src/available-plugins.ts); so, for example, including `@babel/plugin-proposal-do-expressions` or excluding `@babel/plugin-proposal-function-bind` will throw errors. To use a plugin _not_ included with this preset, add them to your ["plugins"](_docs_options.md#plugins) directly.

### `exclude`[​](_docs_babel-preset-env.md#exclude)

`Array<string|RegExp>`, defaults to `[]`.

An array of plugins to always exclude/remove.

The possible options are the same as the `include` option.

This option is useful for excluding a transform like `@babel/plugin-transform-regenerator`, for example if you are using another plugin like [fast-async](https://github.com/MatAtBread/fast-async) instead of [Babel's async-to-gen](_docs_babel-plugin-transform-async-generator-functions.md).

### `useBuiltIns`[​](_docs_babel-preset-env.md#usebuiltins)

`"usage"` | `"entry"` | `false`, defaults to `false`.

This option configures how `@babel/preset-env` handles polyfills.

When either the `usage` or `entry` options are used, `@babel/preset-env` will add direct references to `core-js` modules as bare imports (or requires). This means `core-js` will be resolved relative to the file itself and needs to be accessible.

Since `@babel/polyfill` was deprecated in 7.4.0, we recommend directly adding `core-js` and setting the version via the [`corejs`](_docs_babel-preset-env.md#corejs) option.
*   npm
*   Yarn
*   pnpm
```
npm install core-js@3 --save  
  
# or  
  
npm install core-js@2 --save  
```
#### `useBuiltIns: 'entry'`[​](_docs_babel-preset-env.md#usebuiltins-entry)

History

Version

Changes

`v7.4.0`

It replaces `"core-js/stable"` and `"regenerator-runtime/runtime"` entry imports

`v7.0.0`

It replaces `"@babel/polyfill"` entry imports

tip

Only use `import "core-js";` once in your whole app.

If you are using `@babel/polyfill`, it already includes `core-js`: importing it twice will throw an error.

Multiple imports or requires of those packages might cause global collisions and other issues that are hard to trace. We recommend creating a single entry file that only contains the `import` statements.

This option enables a new plugin that replaces the `import "core-js/stable";` and `require("core-js");` statements with individual imports to different `core-js` entry points based on environment.

**In***Out (different based on environment)**

JavaScript
```
import "core-js/modules/es.string.pad-start";  
import "core-js/modules/es.string.pad-end";  
```
Importing `"core-js"` loads polyfills for every possible ECMAScript feature: what if you know that you only need some of them? When using `core-js@3`, `@babel/preset-env` is able to optimize every single `core-js` entrypoint and their combinations. For example, you might want to only polyfill array methods and new `Math` proposals:

**In**

JavaScript
```
import "core-js/es/array";  
import "core-js/proposals/math-extensions";  
```
**Out (different based on environment)**

JavaScript
```
import "core-js/modules/es.array.unscopables.flat";  
import "core-js/modules/es.array.unscopables.flat-map";  
import "core-js/modules/esnext.math.clamp";  
import "core-js/modules/esnext.math.deg-per-rad";  
import "core-js/modules/esnext.math.degrees";  
import "core-js/modules/esnext.math.fscale";  
import "core-js/modules/esnext.math.rad-per-deg";  
import "core-js/modules/esnext.math.radians";  
import "core-js/modules/esnext.math.scale";  
```
You can read [core-js](https://github.com/zloirock/core-js)'s documentation for more information about the different entry points.

note

When using `core-js@2` (either explicitly using the [`corejs: "2"`](_docs_babel-preset-env.md#corejs) option or implicitly), `@babel/preset-env` will also transform imports and requires of `@babel/polyfill`. This behavior is deprecated because it isn't possible to use `@babel/polyfill` with different `core-js` versions.

#### `useBuiltIns: 'usage'`[​](_docs_babel-preset-env.md#usebuiltins-usage)

Adds specific imports for polyfills when they are used in each file. We take advantage of the fact that a bundler will load the same polyfill only once.

**In***Out (if environment doesn't support it)**

a.js
```
import "core-js/modules/es.promise";  
var a = new Promise();  
```
b.js
```
import "core-js/modules/es.map";  
var b = new Map();  
```
**Out (if environment supports it)**

#### `useBuiltIns: false`[​](_docs_babel-preset-env.md#usebuiltins-false)

Don't add polyfills automatically per file, and don't transform `import "core-js"` or `import "@babel/polyfill"` to individual polyfills.

### `corejs`[​](_docs_babel-preset-env.md#corejs)

Added in: `v7.4.0`

`string` or `{ version: string, proposals: boolean }`, defaults to `"2.0"`. The `version` string can be any supported `core-js` versions. For example, `"3.33"` or `"2.0"`.

This option only has an effect when used alongside `useBuiltIns: usage` or `useBuiltIns: entry`, and ensures `@babel/preset-env` injects the polyfills supported by your `core-js` version. It is recommended to specify the minor version otherwise `"3"` will be interpreted as `"3.0"` which may not include polyfills for the latest features.

By default, only polyfills for stable ECMAScript features are injected: if you want to polyfill proposals, you have three different options:
*   when using `useBuiltIns: "entry"`, you can directly import a [proposal polyfill](https://github.com/zloirock/core-js/tree/master/packages/core-js/proposals): `import "core-js/proposals/string-replace-all"`.
*   when using `useBuiltIns: "usage"` you have two different alternatives:
    *   set the [`shippedProposals`](_docs_babel-preset-env.md#shippedproposals) option to `true`. This will enable polyfills and transforms for proposal which have already been shipped in browsers for a while.
    *   use `corejs: { version: "3.8", proposals: true }`. This will enable polyfilling of every proposal supported by `core-js@3.8`.

### `forceAllTransforms`[​](_docs_babel-preset-env.md#forcealltransforms)

`boolean`, defaults to `false`.

**Example**

With Babel 7's [JavaScript config file](_docs_config-files.md#javascript) support, you can force all transforms to be run if env is set to `production`.

babel.config.js
```
module.exports = function(api) {  
  return {    presets: [      [        "@babel/preset-env",        {          targets: {            chrome: 59,            edge: 13,            firefox: 50,          },          // for uglifyjs...          forceAllTransforms: api.env("production"),        },      ],    ],  };};  
```
danger

`targets.uglify` is deprecated and will be removed in the next major in favor of this.

By default, this preset will run all the transforms needed for the targeted environment(s). Enable this option if you want to force running _all_ transforms, which is useful if the output will be run through UglifyJS or an environment that only supports ES5.

tip

If you require an alternative minifier which _does_ support ES6 syntax, we recommend [Terser](https://www.npmjs.com/package/terser).

### `configPath`[​](_docs_babel-preset-env.md#configpath)

`string`, defaults to `process.cwd()`

The starting point where the config search for browserslist will start, and ascend to the system root until found.

### `ignoreBrowserslistConfig`[​](_docs_babel-preset-env.md#ignorebrowserslistconfig)

`boolean`, defaults to `false`

Toggles whether or not [browserslist config sources](https://github.com/ai/browserslist#queries) are used, which includes searching for any browserslist files or referencing the browserslist key inside package.json. This is useful for projects that use a browserslist config for files that won't be compiled with Babel.

### `browserslistEnv`[​](_docs_babel-preset-env.md#browserslistenv)

Added in: `v7.10.0` `string`, defaults to `undefined`

The [Browserslist environment](https://github.com/browserslist/browserslist#configuring-for-different-environments) to use.

### `shippedProposals`[​](_docs_babel-preset-env.md#shippedproposals)

`boolean`, defaults to `false`

History

Version

Changes

`v7.14.0`

Include private field brand checks

`v7.12.0`

Include class static block and import assertions

`v7.10.0`

Include class properties and private methods

`v7.9.0`

Include numeric separator

Toggles enabling support for builtin/feature proposals that have shipped in browsers. If your target environments have native support for a feature proposal, its matching parser syntax plugin is enabled instead of performing any transform. Note that this _does not_ enable the same transformations as [`@babel/preset-stage-3`](_docs_babel-preset-stage-3.md), since proposals can continue to change before landing in browsers.

The following are currently supported:

**Builtins** injected when using `useBuiltIns: "usage"`
*   [esnext.global-this](https://github.com/tc39/proposal-global) (only supported by `core-js@3`)
*   [esnext.string.match-all](https://github.com/tc39/proposal-string-matchall) (only supported by `core-js@3`)

**Features**   [Import attributes](https://github.com/tc39/proposal-import-attributes) (parsing only)

**Materialized Features** These features were behind `shippedProposals` flag in older Babel versions. They are now generally available.
*   [class properties](https://github.com/tc39/proposal-class-fields)
*   [Class static block](https://github.com/tc39/proposal-class-static-block)
*   [numeric separator](https://github.com/tc39/proposal-numeric-separator)
*   [Private field brand checks](https://github.com/tc39/proposal-private-fields-in-in)
*   [private methods](https://github.com/tc39/proposal-private-methods)

> You can read more about configuring preset options [here](_docs_en_presets.md#preset-options)

## Caveats[​](_docs_babel-preset-env.md#caveats)

### Ineffective browserslist queries[​](_docs_babel-preset-env.md#ineffective-browserslist-queries)

While `op_mini all` is a valid browserslist query, preset-env currently ignores it due to [lack of support data](https://github.com/kangax/compat-table/issues/1057) for Opera Mini.

#### _docs_babel-preset-flow.md

> Source: https://babeljs.io/docs/babel-preset-flow
> Scraped: 4/2/2025, 4:57:34 PM

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

#### _docs_babel-preset-react.md

> Source: https://babeljs.io/docs/babel-preset-react
> Scraped: 4/2/2025, 4:57:34 PM

This preset always includes the following plugins:
*   [@babel/plugin-syntax-jsx](_docs_babel-plugin-syntax-jsx.md)
*   [@babel/plugin-transform-react-jsx](_docs_babel-plugin-transform-react-jsx.md)
*   [@babel/plugin-transform-react-display-name](_docs_babel-plugin-transform-react-display-name.md)

And with the `development` option:

Classic runtime adds:
*   [@babel/plugin-transform-react-jsx-self](_docs_babel-plugin-transform-react-jsx-self.md)
*   [@babel/plugin-transform-react-jsx-source](_docs_babel-plugin-transform-react-jsx-source.md)

Automatic runtime (since `v7.9.0`) adds the functionality for these plugins automatically when the `development` option is enabled. If you have automatic runtime enabled, adding [@babel/plugin-transform-react-jsx-self](_docs_babel-plugin-transform-react-jsx-self.md) or [@babel/plugin-transform-react-jsx-source](_docs_babel-plugin-transform-react-jsx-source.md) will error.

> Note: Flow syntax support is no longer enabled in v7. For that, you will need to add the [Flow preset](_docs_babel-preset-flow.md).

## Installation[​](_docs_babel-preset-react.md#installation)

> You can also check out the React [Getting Started page](https://react.dev/learn/installation)
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/preset-react  
```
## Usage[​](_docs_babel-preset-react.md#usage)

### With a configuration file (Recommended)[​](_docs_babel-preset-react.md#with-a-configuration-file-recommended)

Without options:

babel.config.json
```
{  
  "presets": ["@babel/preset-react"]}  
```
With options:

babel.config.json
```
{  
  "presets": [    [      "@babel/preset-react",      {        "pragma": "dom", // default pragma is React.createElement (only in classic runtime)        "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)        "throwIfNamespace": false, // defaults to true        "runtime": "classic" // defaults to classic        // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)      }    ]  ]}  
```
### Via CLI[​](_docs_babel-preset-react.md#via-cli)

Shell
```
babel --presets @babel/preset-react script.js  
```
### Via Node API[​](_docs_babel-preset-react.md#via-node-api)

JavaScript
```
require("@babel/core").transformSync("code", {  
  presets: ["@babel/preset-react"],});  
```
## Options[​](_docs_babel-preset-react.md#options)

### Both Runtimes[​](_docs_babel-preset-react.md#both-runtimes)

#### `runtime`[​](_docs_babel-preset-react.md#runtime)

`classic | automatic`, defaults to `classic`

Added in: `v7.9.0`

> Note: The default runtime will be switched to `automatic` in Babel 8.

Decides which runtime to use.

`automatic` auto imports the functions that JSX transpiles to. `classic` does not automatic import anything.

#### `development`[​](_docs_babel-preset-react.md#development)

`boolean`, defaults to `false`.

This toggles behavior specific to development, such as adding `__source` and `__self`.

This is useful when combined with the [env option](_docs_options.md#env) configuration or [js config files](_docs_config-files.md#javascript).

#### `throwIfNamespace`[​](_docs_babel-preset-react.md#throwifnamespace)

`boolean`, defaults to `true`.

Toggles whether or not to throw an error if a XML namespaced tag name is used. For example:

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

#### `pure`[​](_docs_babel-preset-react.md#pure)

`boolean`, defaults to `true`.

Enables `@babel/plugin-transform-react-pure-annotations`. It will mark top-level React method calls as pure for tree shaking.

### React Automatic Runtime[​](_docs_babel-preset-react.md#react-automatic-runtime)

#### importSource[​](_docs_babel-preset-react.md#importsource)

`string`, defaults to `react`.

Added in: `v7.9.0`

Replaces the import source when importing functions.

### React Classic Runtime[​](_docs_babel-preset-react.md#react-classic-runtime)

#### `pragma`[​](_docs_babel-preset-react.md#pragma)

`string`, defaults to `React.createElement`.

Replace the function used when compiling JSX expressions. It should be a qualified name (e.g. `React.createElement`) or an identifier (e.g. `createElement`).

#### `pragmaFrag`[​](_docs_babel-preset-react.md#pragmafrag)

`string`, defaults to `React.Fragment`.

Replace the component used when compiling JSX fragments. It should be a valid JSX tag name.

#### `useBuiltIns`[​](_docs_babel-preset-react.md#usebuiltins)

`boolean`, defaults to `false`.

warning

This option will be removed in Babel 8. Set `useBuiltIns` to `true` if you are targeting to modern browsers.

Will use the native built-in instead of trying to polyfill behavior for any plugins that require one.

#### `useSpread`[​](_docs_babel-preset-react.md#usespread)

`boolean`, defaults to `false`.

Added in: `v7.7.0`

warning

This option will be removed in Babel 8. Set `useSpread` to `true` if you are targeting to modern browsers.

When spreading props, use inline object with spread elements directly instead of Babel's extend helper or `Object.assign`.

### babel.config.js[​](_docs_babel-preset-react.md#babelconfigjs)

babel.config.js
```
module.exports = {  
  presets: [    [      "@babel/preset-react",      {        development: process.env.BABEL_ENV === "development",      },    ],  ],};  
```
### babel.config.json[​](_docs_babel-preset-react.md#babelconfigjson)

> Note: the `env` option will likely get deprecated soon

babel.config.json
```
{  
  "presets": ["@babel/preset-react"],  "env": {    "development": {      "presets": [["@babel/preset-react", { "development": true }]]    }  }}  
```
> You can read more about configuring preset options [here](_docs_en_presets.md#preset-options)

#### _docs_babel-preset-typescript.md

> Source: https://babeljs.io/docs/babel-preset-typescript
> Scraped: 4/2/2025, 4:57:34 PM

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

#### _docs_config-files.md

> Source: https://babeljs.io/docs/config-files
> Scraped: 4/2/2025, 4:57:37 PM

## Configuration File Types[​](_docs_config-files.md#configuration-file-types)

Babel has two parallel config file formats, which can be used together, or independently.

History

Version

Changes

`v7.21.0`

Support `.babelrc.cts` and `babel.config.cts` (Experimental)

`v7.8.0`

Support `.babelrc.mjs` and `babel.config.mjs`

`v7.7.0`

Support `.babelrc.json`, `.babelrc.cjs`, `babel.config.json`, `babel.config.cjs`
*   Project-wide configuration
    *   `babel.config.*` files, with the following extensions: `.json`, `.js`, `.cjs`, `.mjs`, `.cts`.
*   File-relative configuration
    *   `.babelrc.*` files, with the following extensions: `.json`, `.js`, `.cjs`, `.mjs`, `.cts`.
    *   `.babelrc` file, with no extension.
    *   `package.json` files, with a `"babel"` key.

## Project-wide configuration[​](_docs_config-files.md#project-wide-configuration)

New in Babel 7.x, Babel has a concept of a ["root"](_docs_options.md#root) directory, which defaults to the current working directory. For project-wide configuration, Babel will automatically search for a `babel.config.json` file, or an equivalent one using the [supported extensions](_docs_config-files.md#supported-file-extensions), in this root directory. Alternatively, users can use an explicit ["configFile"](_docs_options.md#configfile) value to override the default config file search behavior.

Because project-wide config files are separated from the physical location of the config file, they can be ideal for configuration that must apply broadly, even allowing plugins and presets to easily apply to files in `node_modules` or in symlinked packages, which were traditionally quite painful to configure in Babel 6.x.

The primary downside of this project-wide config is that, because it relies on the working directory, it can be more painful to use in monorepos if the working directory is not the monorepo root. See the [monorepo](_docs_config-files.md#monorepos) documentation for examples of how to use config files in that context.

Project-wide configs can also be disabled by setting ["configFile"](_docs_options.md#configfile) to `false`.

## File-relative configuration[​](_docs_config-files.md#file-relative-configuration)

Babel loads `.babelrc.json` files, or an equivalent one using the [supported extensions](_docs_config-files.md#supported-file-extensions), by searching up the directory structure starting from the ["filename"](_docs_options.md#filename) being compiled (limited by the caveats below). This can be powerful because it allows you to create independent configurations for subsections of a package. File-relative configurations are also [merged](_docs_options.md#merging) over top of project-wide config values, making them potentially useful for specific overrides, though that can also be accomplished through ["overrides"](_docs_options.md#overrides).

There are a few edge cases to consider when using a file-relative config:
*   Searching will stop once a directory containing a `package.json` is found, so a relative config only applies within a single package.
*   The ["filename"](_docs_options.md#filename) being compiled must be inside of ["babelrcRoots"](_docs_options.md#babelrcroots) packages, or else searching will be skipped entirely.

These caveats mean that:
*   `.babelrc.json` files _only_ apply to files within their own package
*   `.babelrc.json` files in packages that aren't Babel's 'root' are ignored unless you opt in with ["babelrcRoots"](_docs_options.md#babelrcroots).

See the [monorepo](_docs_config-files.md#monorepos) documentation for more discussion on how to configure monorepos that have many packages. File-relative configs can also be disabled by setting ["babelrc"](_docs_options.md#babelrc) to `false`.

### 6.x vs 7.x `.babelrc` loading[​](_docs_config-files.md#6x-vs-7x-babelrc-loading)

Users coming from Babel 6.x will likely trip up on these two edge cases, which are new in Babel 7.x. These two restrictions were added to address common footguns in Babel 6.x:
*   `.babelrc` files applied to `node_modules` dependencies, often unexpectedly.
*   `.babelrc` files _failed_ to apply to symlinked `node_modules` when people expected them to behave like normal dependencies.
*   `.babelrc` files _in_ `node_modules` dependencies would be detected, even though the plugins and presets inside they were generally not installed, and may not even be valid in the version of Babel compiling the file.

These cases will _primarily_ cause issues for users with a monorepo structure, because if you have
```
.babelrc  
packages/  
  mod1/    package.json    src/index.js  mod2/    package.json    src/index.js
```
the config will now be entirely ignored, because it is across a package boundary.

One alternative would be to create a `.babelrc` in each sub-package that uses ["extends"](_docs_options.md#extends) as

.babelrc.json
```
{ "extends": "../../.babelrc" }  
```
Unfortunately, this approach can be a bit repetitive, and depending on how Babel is being used, could require setting ["babelrcRoots"](_docs_options.md#babelrcroots).

Given that, it may be more desirable to rename the `.babelrc` to be a [project-wide "babel.config.json"](_docs_config-files.md#project-wide-configuration). As mentioned in the project-wide section above, this may then require explicitly setting ["configFile"](_docs_options.md#configfile) since Babel will not find the config file if the working directory isn't correct.

## Supported file extensions[​](_docs_config-files.md#supported-file-extensions)

Babel can be configured using any file extension natively supported by Node.js, as mentioned in [Configuration File Types](_docs_config-files.md#configuration-file-types) section:
*   `babel.config.json` and `.babelrc.json` are parsed as JSON5 and should contain an object matching the [options](_docs_options.md) format that Babel accepts. They have been supported since `v7.7.0`.
    
    We recommend using this file type wherever possible: JS config files are handy if you have complex configuration that is conditional or otherwise computed at build time. However, the downside is that JS configs are less statically analyzable, and therefore have negative effects on cacheability, linting, IDE autocomplete, etc. Since `babel.config.json` and `.babelrc.json` are static JSON files, it allows other tools that use Babel such as bundlers to cache the results of Babel safely, which can be a huge build performance win.
    
*   `babel.config.cjs` and `.babelrc.cjs` allow you to define your configuration as CommonJS, using `module.exports`. They have been supported since `v7.7.0`.
    
*   `babel.config.mjs` and `.babelrc.mjs` use native ECMAScript modules. They are supported by Node.js 13.2+ (or older versions via the `--experimental-modules` flag). Please remember that native ECMAScript modules are asynchronous (that's why `import()` always returns a promise!): for this reason, `.mjs` config files will throw when calling Babel synchronously. They have been supported since `v7.8.0`.
    
*   `babel.config.js` and `.babelrc.js` behave like the `.mjs` equivalents when your `package.json` file contains the [`"type": "module"`](https://nodejs.org/api/esm.html#esm_code_package_json_code_code_type_code_field) option, otherwise they are exactly the same as the `.cjs` files.
    
*   `babel.config.cts` and `.babelrc.cts` allow you to define your configuration as Typescript + CommonJS. You must either install `@babel/preset-typescript`, or run Babel using `ts-node`.
    
    note
    
    🚧 This functionality is experimental. It's not possible yet to use `babel.config.ts` and `babel.config.mts` files, pending stabilization of the Node.js ESM loader API.
    

JavaScript configuration files can either export an object, or a function that when called will return the generated configuration. Function-returning configs are given a few special powers because they can access an API exposed by Babel itself. See [Config Function API](_docs_config-files.md#config-function-api) for more information.

note

For compatibility reasons, `.babelrc` is an alias for `.babelrc.json`.

## Monorepos[​](_docs_config-files.md#monorepos)

Monorepo-structured repositories usually contain many packages, which means that they frequently run into the caveats mentioned in [file-relative configuration](_docs_config-files.md#file-relative-configuration) and config file loading in general. This section is aimed at helping users understand how to approach monorepo configuration.

With monorepo setups, the core thing to understand is that Babel treats your working directory as its logical ["root"](_docs_options.md#root), which causes problems if you want to run Babel tools within a specific sub-package without having Babel apply to the repo as a whole.

Separately, it is also important to decide if you want to use [`.babelrc.json`](_docs_config-files.md#file-relative-configuration) files or just a central [`babel.config.json`](_docs_config-files.md#project-wide-configuration). [`.babelrc.json`](_docs_config-files.md#file-relative-configuration) files are not required for subfolder-specific configuration like they were in Babel 6, so often they are not needed in Babel 7, in favor of [`babel.config.json`](_docs_config-files.md#project-wide-configuration).

### Root `babel.config.json` file[​](_docs_config-files.md#root-babelconfigjson-file)

The first step in any monorepo structure should be to create a [`babel.config.json`](_docs_config-files.md#project-wide-configuration) file in repository root. This establishes Babel's core concept of the base directory of your repository. Even if you want to use [`.babelrc.json`](_docs_config-files.md#file-relative-configuration) files to configure each separate package, it is important to have as a place for repo-level options.

You can often place all of your repo configuration in the root [`babel.config.json`](_docs_config-files.md#project-wide-configuration). With ["overrides"](_docs_options.md#overrides), you can easily specify configuration that only applies to certain subfolders of your repository, which can often be easier to follow than creating many `.babelrc.json` files across the repo.

The first issue you'll likely run into is that by default, Babel expects to load [`babel.config.json`](_docs_config-files.md#project-wide-configuration) files from the directory set as its ["root"](_docs_options.md#root), which means that if you create a [`babel.config.json`](_docs_config-files.md#project-wide-configuration), but run Babel inside an individual package, e.g.

Shell
```
cd packages/some-package;  
babel src -d dist  
```
the ["root"](_docs_options.md#root) Babel is using in that context is _not_ your monorepo root, and it won't be able to find the [`babel.config.json`](_docs_config-files.md#project-wide-configuration) file.

If all of your build scripts run relative to your repository root, things should already work, but if you are running your Babel compilation process from within a subpackage, you need to tell Babel where to look for the config. There are a few ways to do that, but the recommended way is the ["rootMode"](_docs_options.md#rootmode) option with `"upward"`, which will make Babel search from the working directory upward looking for your [`babel.config.json`](_docs_config-files.md#project-wide-configuration) file, and will use its location as the ["root"](_docs_options.md#root) value.

One helpful way to test if your config is being detected is to place a `console.log()` call inside of it if it is a [`babel.config.json`](_docs_config-files.md#project-wide-configuration) JavaScript file: the log will execute the first time Babel loads it.

How you set this value varies by project, but here are a few examples:

#### CLI[​](_docs_config-files.md#cli)

Shell
```
babel --root-mode upward src -d lib  
```
#### @babel/register[​](_docs_config-files.md#babelregister)

JavaScript
```
require("@babel/register")({  
  rootMode: "upward",});  
```
#### Webpack[​](_docs_config-files.md#webpack)

webpack.config.js
```
module: {  
  rules: [    {      loader: "babel-loader",      options: {        rootMode: "upward",      },    },  ];}  
```
#### Jest[​](_docs_config-files.md#jest)

Jest is often installed at the root of the monorepo and may not require configuration, but if it is installed per-package it can unfortunately be more complex to configure.

The main part is creating a custom jest transformer file that wraps `babel-jest`'s default behavior in order to set the option, e.g.

wrapper.js
```
module.exports = require("babel-jest").default.createTransformer({  
  rootMode: "upward",});  
```
and with that saved somewhere, you'd then use that file in the place of `babel-jest` in your Jest options via the [transform option](https://jestjs.io/docs/en/configuration#transform-object-string-string):

jest.config.js
```
"transform": {  
  "^.+\\.jsx?$": "./path/to/wrapper.js"},  
```
so all JS files will be processed with your version of `babel-jest` with the option enabled.

note

When using `babel-jest` < 27, you must omit the `.default` part: `require("babel-jest").createTransformer({ ...`.

#### Others[​](_docs_config-files.md#others)

There are tons of tools, but at the core of it is that they need the `rootMode` option enabled if the working directory is not already the monorepo root.

### Subpackage `.babelrc.json` files[​](_docs_config-files.md#subpackage-babelrcjson-files)

Similar to the way [`babel.config.json`](_docs_config-files.md#project-wide-configuration) files are required to be in the ["root"](_docs_options.md#root), [`.babelrc.json`](_docs_config-files.md#file-relative-configuration) files must be in the root _package_, by default. This means that, the same way the working directory affects [`babel.config.json`](_docs_config-files.md#project-wide-configuration) loading, it also affects [`.babelrc.json`](_docs_config-files.md#file-relative-configuration) loading.

Assuming you've already gotten your [`babel.config.json`](_docs_config-files.md#project-wide-configuration) file loaded properly as discussed above, Babel will only process [`.babelrc.json`](_docs_config-files.md#file-relative-configuration) files inside that root package (and not subpackages), so given for instance
```
package.json  
babel.config.js  
packages/  
  mod/    package.json    .babelrc.json    index.js
```
compiling the `packages/mod/index.js` file will not load `packages/mod/.babelrc.json` because this [`.babelrc.json`](_docs_config-files.md#file-relative-configuration) is within a sub-package, not the root package.

To enable processing of that [`.babelrc.json`](_docs_config-files.md#file-relative-configuration), you will want to use the ["babelrcRoots"](_docs_options.md#babelrcroots) option from inside your [`babel.config.json`](_docs_config-files.md#project-wide-configuration) file to do

JavaScript
```
babelrcRoots: [  
  ".",  "packages/*",],  
```
so that Babel will consider all `packages/*` packages as allowed to load [`.babelrc.json`](_docs_config-files.md#file-relative-configuration) files, along with the original repo root.

## Config Function API[​](_docs_config-files.md#config-function-api)

JS config files may export a function that will be passed config function API:

JavaScript
```
module.exports = function(api) {  
  return {};};  
```
The `api` object exposes everything Babel itself exposes from its index module, along with config-file specific APIs:

### `api.version`[​](_docs_config-files.md#apiversion)

Type: `string`  

The version string for the Babel version that is loading the config file.

### `api.cache`[​](_docs_config-files.md#apicache)

JS configs are great because they can compute a config on the fly, but the downside there is that it makes caching harder. Babel wants to avoid re-executing the config function every time a file is compiled, because then it would also need to re-execute any plugin and preset functions referenced in that config.

To avoid this, Babel expects users of config functions to tell it how to manage caching within a config file.
*   `api.cache.forever()` - Permacache the computed config and never call the function again.
*   `api.cache.never()` - Do not cache this config, and re-execute the function every time.
*   `api.cache.using(() => process.env.NODE_ENV)` - Cache based on the value of `NODE_ENV`. Any time the `using` callback returns a value other than the one that was expected, the overall config function will be called again and a new entry will be added to the cache.
*   `api.cache.invalidate(() => process.env.NODE_ENV)` - Cache based on the value of `NODE_ENV`. Any time the `using` callback returns a value other than the one that was expected, the overall config function will be called again and all entries in the cache will be replaced with the result.
*   `api.cache(true)` - Same as `api.cache.forever()`
*   `api.cache(false)` - Same as `api.cache.never()`

Since the actual callback result is used to check if the cache entry is valid, it is recommended that:
*   Callbacks should be small and side-effect free.
*   Callbacks should return values with the smallest range possible. For example, the `.using(() => process.env.NODE_ENV)` usage above is not ideal because it would create an unknown number of cache entries depending on how many values of `NODE_ENV` are detected. It would be safer to do `.using(() => process.env.NODE_ENV === "development")` because then the cache entry can only ever be `true` or `false`.

### `api.env(...)`[​](_docs_config-files.md#apienv)

Since `NODE_ENV` is a fairly common way to toggle behavior, Babel also includes an API function meant specifically for that. This API is used as a quick way to check the ["envName"](_docs_options.md#envname) that Babel was loaded with, which takes `NODE_ENV` into account if no other overriding environment is set.

It has a few different forms:
*   `api.env("production")` returns `true` if `envName === "production"`.
*   `api.env(["development", "test"])` returns `true` if `["development", "test"].includes(envName)`.
*   `api.env()` returns the current `envName` string.
*   `api.env(envName => envName.startsWith("test-"))` returns `true` if the env starts with "test-".

note

This function internally makes use of [`api.cache`](_docs_config-files.md#apicache) mentioned above to ensure that Babel is aware that this build depends on a specific `envName`. You should not use it alongside with `api.cache.forever()` or `api.cache.never()`.

### `api.caller(cb)`[​](_docs_config-files.md#apicallercb)

This API is used as a way to access the `caller` data that has been passed to Babel. Since many instances of Babel may be running in the same process with different `caller` values, this API is designed to automatically configure `api.cache`, the same way `api.env()` does.

The `caller` value is available as the first parameter of the callback function. It is best used with something like

JavaScript
```
function isBabelRegister(caller) {  
  return !!(caller && caller.name === "@babel/register");}  
  
module.exports = function(api) {  
  const isRegister = api.caller(isBabelRegister);  
  return {    // ...  };};  
```
to toggle configuration behavior based on a specific environment.

### `api.assertVersion(range)`[​](_docs_config-files.md#apiassertversionrange)

While `api.version` can be useful in general, it's sometimes nice to just declare your version. This API exposes a simple way to do that with:

JavaScript
```
module.exports = function(api) {  
  api.assertVersion("^7.2");  
  return {    // ...  };};  
```

#### _docs_configuration.md

> Source: https://babeljs.io/docs/configuration
> Scraped: 4/2/2025, 4:57:34 PM

Babel can be configured! Many other tools have similar configs: ESLint (`.eslintrc`), Prettier (`.prettierrc`).

All Babel API [options](_docs_options.md) are allowed. However, if the option requires JavaScript, you may want to use a JavaScript [configuration file](_docs_config-files.md).

## What's your use case?[​](_docs_configuration.md#whats-your-use-case)
*   You are using a monorepo?
*   You want to compile `node_modules`?

> [`babel.config.json`](_docs_configuration.md#babelconfigjson) is for you!
*   You have a configuration that only applies to a single part of your project?

> [`.babelrc.json`](_docs_configuration.md#babelrcjson) is for you!
*   Guy Fieri is your hero?

> We recommend using the [`babel.config.json`](_docs_config-files.md#project-wide-configuration) format.

### `babel.config.json`[​](_docs_configuration.md#babelconfigjson)

Create a file called `babel.config.json` with the following content at the root of your project (where the `package.json` is).

babel.config.json
```
{  
  "presets": [...],  "plugins": [...]}  
```
Check out the [`babel.config.json` documentation](_docs_config-files.md#project-wide-configuration) to see more configuration options.

### `.babelrc.json`[​](_docs_configuration.md#babelrcjson)

Create a file called `.babelrc.json` with the following content in your project.

.babelrc.json
```
{  
  "presets": [...],  "plugins": [...]}  
```
Check out the [.babelrc documentation](_docs_config-files.md#file-relative-configuration) to see more configuration options.

### `package.json`[​](_docs_configuration.md#packagejson)

Alternatively, you can choose to specify your [`.babelrc.json`](_docs_configuration.md#babelrcjson) config from within `package.json` using the `babel` key like so:

package.json
```
{  
  "name": "my-package",  "version": "1.0.0",  "babel": {    "presets": [ ... ],    "plugins": [ ... ],  }}  
```
### JavaScript configuration files[​](_docs_configuration.md#javascript-configuration-files)

You can also write `babel.config.js` ([like we're doing](https://github.com/babel/babel/blob/main/babel.config.js)), and `.babelrc.js` files using JavaScript:

babel.config.js
```
module.exports = function (api) {  
  api.cache(true);  
  const presets = [ ... ];  const plugins = [ ... ];  
  return {    presets,    plugins  };}  
```
You are allowed to access any Node.js APIs, for example a dynamic configuration based on the process environment:

babel.config.js
```
module.exports = function (api) {  
  api.cache(true);  
  const presets = [ ... ];  const plugins = [ ... ];  
  if (process.env["ENV"] === "prod") {    plugins.push(...);  }  
  return {    presets,    plugins  };}  
```
You can read more about JavaScript configuration files in the [dedicated documentation](_docs_config-files.md)

## Using the CLI (`@babel/cli`)[​](_docs_configuration.md#using-the-cli-babelcli)

Shell
```
babel --plugins @babel/plugin-transform-arrow-functions script.js  
```
Check out the [babel-cli documentation](_docs_babel-cli.md) to see more configuration options.

## Using the API (`@babel/core`)[​](_docs_configuration.md#using-the-api-babelcore)

JavaScript
```
require("@babel/core").transformSync("code", {  
  plugins: ["@babel/plugin-transform-arrow-functions"],});  
```
Check out the [babel-core documentation](_docs_babel-core.md) to see more configuration options.

## Print effective configs[​](_docs_configuration.md#print-effective-configs)

You can tell Babel to print effective configs on a given input path
*   Shell
*   powershell
```
  
# *nix or WSL  
BABEL_SHOW_CONFIG_FOR=./src/myComponent.jsx npm start  
```
`BABEL_SHOW_CONFIG_FOR` accepts both absolute and relative _file_ paths. If it is a relative path, it will be resolved from [`cwd`](_docs_options.md#cwd).

Once Babel processes the input file specified by `BABEL_SHOW_CONFIG_FOR`, Babel will print effective configs to the console. Here is an example output:
```
Babel configs on "/path/to/cwd/src/index.js" (ascending priority):  
config /path/to/cwd/babel.config.json  
{  
  "sourceType": "script",  "plugins": [    "@foo/babel-plugin-1"  ],  "extends": "./my-extended.js"}  
  
config /path/to/cwd/babel.config.json .env["test"]  
{  
  "plugins": [    [      "@foo/babel-plugin-3",      {        "noDocumentAll": true      },    ]  ]}  
  
config /path/to/cwd/babel.config.json .overrides[0]  
{  
  "test": "src/index.js",  "sourceMaps": true}  
  
config /path/to/cwd/.babelrc  
{}  
  
programmatic options from @babel/cli  
{  
  "sourceFileName": "./src/index.js",  "presets": [    "@babel/preset-env"  ],  "configFile": "./my-config.js",  "caller": {    "name": "@babel/cli"  },  "filename": "./src/index.js"}  
```
Babel will print effective config sources ordered by ascending priority. Using the example above, the priority is:
```
babel.config.json < .babelrc < programmatic options from @babel/cli  
```
In other words, `babel.config.json` is overwritten by `.babelrc`, and `.babelrc` is overwritten by programmatic options.

For each config source, Babel prints applicable config items (e.g. [`overrides`](_docs_options.md#overrides) and [`env`](_docs_options.md#env)) in the order of ascending priority. Generally each config sources has at least one config item -- the root content of configs. If you have configured `overrides` or `env`, Babel will not print them in the root, but will instead output a separate config item titled as `.overrides[index]`, where `index` is the position of the item. This helps determine whether the item is effective on the input and which configs it will override.

If your input is ignored by `ignore` or `only`, Babel will print that this file is ignored.

### How Babel merges config items[​](_docs_configuration.md#how-babel-merges-config-items)

Babel's configuration merging is relatively straightforward. Options will overwrite existing options when they are present and their value is not `undefined`. There are, however, a few special cases:
*   For `assumptions`, `parserOpts` and `generatorOpts`, objects are merged, rather than replaced.
*   For `plugins` and `presets`, they are replaced based on the identity of the plugin/preset object/function itself combined with the name of the entry.

#### Option (except plugin/preset) merging[​](_docs_configuration.md#option-except-pluginpreset-merging)

As an example, consider a config with:

JavaScript
```
{  
  sourceType: "script",  assumptions: {    setClassFields: true,    iterableIsArray: false  },  env: {    test: {      sourceType: "module",      assumptions: {        iterableIsArray: true,      },    }  }};  
```
When `NODE_ENV` is `test`, the `sourceType` option will be replaced and the `assumptions` option will be merged. The effective config is:

JavaScript
```
{  
  sourceType: "module", // sourceType: "script" is overwritten  assumptions: {    setClassFields: true,    iterableIsArray: true, // assumptions are merged by Object.assign  },}  
```
#### Plugin/Preset merging[​](_docs_configuration.md#pluginpreset-merging)

As an example, consider a config with:

JavaScript
```
plugins: [  
  './other',  ['./plug', { thing: true, field1: true }]],  
overrides: [{  
  plugins: [    ['./plug', { thing: false, field2: true }],  ]}]  
```
The `overrides` item will be merged on top of the top-level options. Importantly, the `plugins` array as a whole doesn't just replace the top-level one. The merging logic will see that `"./plug"` is the same plugin in both cases, and `{ thing: false, field2: true }` will replace the original options, resulting in a config as

JavaScript
```
plugins: [  
  './other',  ['./plug', { thing: false, field2: true }],],  
```
Since merging is based on identity + name, it is considered an error to use the same plugin with the same name twice in the same `plugins`/`presets` array. For example

JavaScript
```
plugins: ["./plug", "./plug"];  
```
is considered an error, because it's identical to `plugins: ['./plug']`. Additionally, even

JavaScript
```
plugins: [["./plug", { one: true }], ["./plug", { two: true }]];  
```
is considered an error, because the second one would just always replace the first one.

If you actually _do_ want to instantiate two separate instances of a plugin, you must assign each one a name to disambiguate them. For example:

JavaScript
```
plugins: [  
  ["./plug", { one: true }, "first-instance-name"],  ["./plug", { two: true }, "second-instance-name"],];  
```
because each instance has been given a unique name and thus a unique identity.

#### _docs_learn.md

> Source: https://babeljs.io/docs/learn
> Scraped: 4/2/2025, 4:57:35 PM

es6features

This document was originally taken from Luke Hoban's excellent [es6features](https://git.io/es6features) repo. Go give it a star on GitHub!

REPL

Be sure to try these features out in the online [REPL](_repl.md).

## Introduction[​](_docs_learn.md#introduction)

> ECMAScript 2015 is an ECMAScript standard that was ratified in June 2015.

ES2015 is a significant update to the language, and the first major update to the language since ES5 was standardized in 2009. Implementation of these features in major JavaScript engines is [underway now](https://compat-table.github.io/compat-table/es6).

See the [ES2015 standard](http://www.ecma-international.org/ecma-262/6.0/index.html) for full specification of the ECMAScript 2015 language.

## ECMAScript 2015 Features[​](_docs_learn.md#ecmascript-2015-features)

### Arrows and Lexical This[​](_docs_learn.md#arrows-and-lexical-this)

Arrows are a function shorthand using the `=>` syntax. They are syntactically similar to the related feature in C#, Java 8 and CoffeeScript. They support both expression and statement bodies. Unlike functions, arrows share the same lexical `this` as their surrounding code. If an arrow is inside another function, it shares the "arguments" variable of its parent function.

JavaScript
```
// Expression bodies  
var odds = evens.map(v => v + 1);  
var nums = evens.map((v, i) => v + i);  
  
// Statement bodies  
nums.forEach(v => {  
  if (v % 5 === 0)    fives.push(v);});  
  
// Lexical this  
var bob = {  
  _name: "Bob",  _friends: [],  printFriends() {    this._friends.forEach(f =>      console.log(this._name + " knows " + f));  }};  
  
// Lexical arguments  
function square() {  
  let example = () => {    let numbers = [];    for (let number of arguments) {      numbers.push(number * number);    }  
    return numbers;  };  
  return example();}  
  
square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]  
```
### Classes[​](_docs_learn.md#classes)

ES2015 classes are syntactic sugar over the prototype-based OO pattern. Having a single convenient declarative form makes class patterns easier to use, and encourages interoperability. Classes support prototype-based inheritance, super calls, instance and static methods and constructors.

JavaScript
```
class SkinnedMesh extends THREE.Mesh {  
  constructor(geometry, materials) {    super(geometry, materials);  
    this.idMatrix = SkinnedMesh.defaultMatrix();    this.bones = [];    this.boneMatrices = [];    //...  }  update(camera) {    //...    super.update();  }  static defaultMatrix() {    return new THREE.Matrix4();  }}  
```
### Enhanced Object Literals[​](_docs_learn.md#enhanced-object-literals)

Object literals are extended to support setting the prototype at construction, shorthand for `foo: foo` assignments, defining methods and making super calls. Together, these also bring object literals and class declarations closer together, and let object-based design benefit from some of the same conveniences.

JavaScript
```
var obj = {  
    // Sets the prototype. "__proto__" or '__proto__' would also work.    __proto__: theProtoObj,    // Computed property name does not set prototype or trigger early error for    // duplicate __proto__ properties.    ['__proto__']: somethingElse,    // Shorthand for ‘handler: handler’    handler,    // Methods    toString() {     // Super calls     return "d " + super.toString();    },    // Computed (dynamic) property names    [ "prop_" + (() => 42)() ]: 42};  
```
caution

The `**proto**` property requires native support, and was deprecated in previous ECMAScript versions. Most engines now support the property, but [some do not](https://compat-table.github.io/compat-table/es6/#proto-in-object-literals-note). Also, note that only [web browsers](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-additional-ecmascript-features-for-web-browsers) are required to implement it, as it's in [Annex B](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.prototype.__proto__). It is available in Node.

### Template Strings[​](_docs_learn.md#template-strings)

Template strings provide syntactic sugar for constructing strings. This is similar to string interpolation features in Perl, Python and more. Optionally, a tag can be added to allow the string construction to be customized, avoiding injection attacks or constructing higher level data structures from string contents.

JavaScript
```
// Basic literal string creation  
`This is a pretty little template string.`  
  
// Multiline strings  
`In ES5 this is  
 not legal.`  
// Interpolate variable bindings  
var name = "Bob", time = "today";  
`Hello ${name}, how are you ${time}?`  
  
// Unescaped template strings  
String.raw`In ES5 "\n" is a line-feed.`  
  
// Construct an HTTP request prefix is used to interpret the replacements and construction  
GET`http://foo.org/bar?a=${a}&b=${b}  
    Content-Type: application/json    X-Credentials: ${credentials}    { "foo": ${foo},      "bar": ${bar}}`(myOnReadyStateChangeHandler);
```
### Destructuring[​](_docs_learn.md#destructuring)

Destructuring allows binding using pattern matching, with support for matching arrays and objects. Destructuring is fail-soft, similar to standard object lookup `foo["bar"]`, producing `undefined` values when not found.

JavaScript
```
// list matching  
var [a, ,b] = [1,2,3];  
a === 1;  
b === 3;  
  
// object matching  
var { op: a, lhs: { op: b }, rhs: c }  
       = getASTNode()  
// object matching shorthand  
// binds `op`, `lhs` and `rhs` in scope  
var {op, lhs, rhs} = getASTNode()  
  
// Can be used in parameter position  
function g({name: x}) {  
  console.log(x);}  
g({name: 5})  
  
// Fail-soft destructuring  
var [a] = [];  
a === undefined;  
  
// Fail-soft destructuring with defaults  
var [a = 1] = [];  
a === 1;  
  
// Destructuring + defaults arguments  
function r({x, y, w = 10, h = 10}) {  
  return x + y + w + h;}  
r({x:1, y:2}) === 23  
```
### Default + Rest + Spread[​](_docs_learn.md#default--rest--spread)

Callee-evaluated default parameter values. Turn an array into consecutive arguments in a function call. Bind trailing parameters to an array. Rest replaces the need for `arguments` and addresses common cases more directly.

JavaScript
```
function f(x, y=12) {  
  // y is 12 if not passed (or passed as undefined)  return x + y;}  
f(3) == 15  
```
JavaScript
```
function f(x, ...y) {  
  // y is an Array  return x * y.length;}  
f(3, "hello", true) == 6  
```
JavaScript
```
function f(x, y, z) {  
  return x + y + z;}  
// Pass each elem of array as argument  
f(...[1,2,3]) == 6  
```
### Let + Const[​](_docs_learn.md#let--const)

Block-scoped binding constructs. `let` is the new `var`. `const` is single-assignment. Static restrictions prevent use before assignment.

JavaScript
```
function f() {  
  {    let x;    {      // this is ok since it's a block scoped name      const x = "sneaky";      // error, was just defined with `const` above      x = "foo";    }    // this is ok since it was declared with `let`    x = "bar";    // error, already declared above in this block    let x = "inner";  }}  
```
### Iterators + For..Of[​](_docs_learn.md#iterators--forof)

Iterator objects enable custom iteration like CLR IEnumerable or Java Iterable. Generalize `for..in` to custom iterator-based iteration with `for..of`. Don’t require realizing an array, enabling lazy design patterns like LINQ.

JavaScript
```
let fibonacci = {  
  [Symbol.iterator]() {    let pre = 0, cur = 1;    return {      next() {        [pre, cur] = [cur, pre + cur];        return { done: false, value: cur }      }    }  }}  
  
for (var n of fibonacci) {  
  // truncate the sequence at 1000  if (n > 1000)    break;  console.log(n);}  
```
Iteration is based on these duck-typed interfaces (using [TypeScript](https://www.typescriptlang.org/) type syntax for exposition only):
```
interface IteratorResult {  
  done: boolean;  value: any;}  
interface Iterator {  
  next(): IteratorResult;}  
interface Iterable {  
  [Symbol.iterator](): Iterator}  
```
Support via polyfill

In order to use Iterators you must include the Babel [polyfill](_docs_babel-polyfill.md).

### Generators[​](_docs_learn.md#generators)

Generators simplify iterator-authoring using `function*` and `yield`. A function declared as function\* returns a Generator instance. Generators are subtypes of iterators which include additional `next` and `throw`. These enable values to flow back into the generator, so `yield` is an expression form which returns a value (or throws).

Note: Can also be used to enable ‘await’-like async programming, see also ES7 `await` [proposal](https://github.com/lukehoban/ecmascript-asyncawait).

JavaScript
```
var fibonacci = {  
  [Symbol.iterator]: function*() {    var pre = 0, cur = 1;    for (;;) {      var temp = pre;      pre = cur;      cur += temp;      yield cur;    }  }}  
  
for (var n of fibonacci) {  
  // truncate the sequence at 1000  if (n > 1000)    break;  console.log(n);}  
```
The generator interface is (using [TypeScript](https://www.typescriptlang.org/) type syntax for exposition only):
```
interface Generator extends Iterator {  
    next(value?: any): IteratorResult;    throw(exception: any);}  
```
Support via polyfill

In order to use Generators you must include the Babel [polyfill](_docs_babel-polyfill.md).

### Comprehensions[​](_docs_learn.md#comprehensions)

Removed in Babel 6.0

### Unicode[​](_docs_learn.md#unicode)

Non-breaking additions to support full Unicode, including new unicode literal form in strings and new RegExp `u` mode to handle code points, as well as new APIs to process strings at the 21bit code points level. These additions support building global apps in JavaScript.

JavaScript
```
// same as ES5.1  
"𠮷".length == 2  
  
// new RegExp behaviour, opt-in ‘u’  
"𠮷".match(/./u)[0].length == 2  
  
// new form  
"\u{20BB7}" == "𠮷"  
"𠮷" == "\uD842\uDFB7"  
  
// new String ops  
"𠮷".codePointAt(0) == 0x20BB7  
  
// for-of iterates code points  
for(var c of "𠮷") {  
  console.log(c);}  
```
### Modules[​](_docs_learn.md#modules)

Language-level support for modules for component definition. Codifies patterns from popular JavaScript module loaders (AMD, CommonJS). Runtime behaviour defined by a host-defined default loader. Implicitly async model – no code executes until requested modules are available and processed.

JavaScript
```
// lib/math.js  
export function sum(x, y) {  
  return x + y;}  
export var pi = 3.141593;  
```
JavaScript
```
// app.js  
import * as math from "lib/math";  
console.log("2π = " + math.sum(math.pi, math.pi));  
```
JavaScript
```
// otherApp.js  
import {sum, pi} from "lib/math";  
console.log("2π = " + sum(pi, pi));  
```
Some additional features include `export default` and `export *`:

JavaScript
```
// lib/mathplusplus.js  
export * from "lib/math";  
export var e = 2.71828182846;  
export default function(x) {  
    return Math.exp(x);}  
```
JavaScript
```
// app.js  
import exp, {pi, e} from "lib/mathplusplus";  
console.log("e^π = " + exp(pi));  
```
Module Formatters

Babel can transpile ES2015 Modules to several different formats including Common.js, AMD, System, and UMD. You can even create your own. For more details see the [modules docs](_docs_plugins_.md).

### Module Loaders[​](_docs_learn.md#module-loaders)

Not part of ES2015

This is left as implementation-defined within the ECMAScript 2015 specification. The eventual standard will be in WHATWG's [Loader specification](https://whatwg.github.io/loader/), but that is currently a work in progress. What is below is from a previous ES2015 draft.

Module loaders support:
*   Dynamic loading
*   State isolation
*   Global namespace isolation
*   Compilation hooks
*   Nested virtualization

The default module loader can be configured, and new loaders can be constructed to evaluate and load code in isolated or constrained contexts.

JavaScript
```
// Dynamic loading – ‘System’ is default loader  
System.import("lib/math").then(function(m) {  
  alert("2π = " + m.sum(m.pi, m.pi));});  
  
// Create execution sandboxes – new Loaders  
var loader = new Loader({  
  global: fixup(window) // replace ‘console.log’});  
loader.eval("console.log(\"hello world!\");");  
  
// Directly manipulate module cache  
System.get("jquery");  
System.set("jquery", Module({$: $})); // WARNING: not yet finalized  
```
Additional polyfill needed

Since Babel defaults to using common.js modules, it does not include the polyfill for the module loader API. Get it [here](https://github.com/ModuleLoader/es6-module-loader).

Using Module Loader

In order to use this, you'll need to tell Babel to use the `system` module formatter. Also be sure to check out [System.js](https://github.com/systemjs/systemjs).

### Map + Set + WeakMap + WeakSet[​](_docs_learn.md#map--set--weakmap--weakset)

Efficient data structures for common algorithms. WeakMaps provides leak-free object-key’d side tables.

JavaScript
```
// Sets  
var s = new Set();  
s.add("hello").add("goodbye").add("hello");  
s.size === 2;  
s.has("hello") === true;  
  
// Maps  
var m = new Map();  
m.set("hello", 42);  
m.set(s, 34);  
m.get(s) == 34;  
  
// Weak Maps  
var wm = new WeakMap();  
wm.set(s, { extra: 42 });  
wm.size === undefined  
  
// Weak Sets  
var ws = new WeakSet();  
ws.add({ data: 42 });  
// Because the added object has no other references, it will not be held in the set  
```
Support via polyfill

In order to support Maps, Sets, WeakMaps, and WeakSets in all environments you must include the Babel [polyfill](_docs_babel-polyfill.md).

### Proxies[​](_docs_learn.md#proxies)

Proxies enable creation of objects with the full range of behaviors available to host objects. Can be used for interception, object virtualization, logging/profiling, etc.

JavaScript
```
// Proxying a normal object  
var target = {};  
var handler = {  
  get: function (receiver, name) {    return `Hello, ${name}!`;  }};  
  
var p = new Proxy(target, handler);  
p.world === "Hello, world!";  
```
JavaScript
```
// Proxying a function object  
var target = function () { return "I am the target"; };  
var handler = {  
  apply: function (receiver, ...args) {    return "I am the proxy";  }};  
  
var p = new Proxy(target, handler);  
p() === "I am the proxy";  
```
There are traps available for all of the runtime-level meta-operations:

JavaScript
```
var handler =  
{  
  // target.prop  get: ...,  // target.prop = value  set: ...,  // 'prop' in target  has: ...,  // delete target.prop  deleteProperty: ...,  // target(...args)  apply: ...,  // new target(...args)  construct: ...,  // Object.getOwnPropertyDescriptor(target, 'prop')  getOwnPropertyDescriptor: ...,  // Object.defineProperty(target, 'prop', descriptor)  defineProperty: ...,  // Object.getPrototypeOf(target), Reflect.getPrototypeOf(target),  // target.__proto__, object.isPrototypeOf(target), object instanceof target  getPrototypeOf: ...,  // Object.setPrototypeOf(target), Reflect.setPrototypeOf(target)  setPrototypeOf: ...,  // Object.keys(target)  ownKeys: ...,  // Object.preventExtensions(target)  preventExtensions: ...,  // Object.isExtensible(target)  isExtensible :...}  
```
Unsupported feature

Due to the limitations of ES5, Proxies cannot be transpiled or polyfilled. See support in [various JavaScript engines](https://compat-table.github.io/compat-table/es6/#test-Proxy).

### Symbols[​](_docs_learn.md#symbols)

Symbols enable access control for object state. Symbols allow properties to be keyed by either `string` (as in ES5) or `symbol`. Symbols are a new primitive type. Optional `name` parameter used in debugging - but is not part of identity. Symbols are unique (like gensym), but not private since they are exposed via reflection features like `Object.getOwnPropertySymbols`.

JavaScript
```
(function() {  
  
  // module scoped symbol  var key = Symbol("key");  
  function MyClass(privateData) {    this[key] = privateData;  }  
  MyClass.prototype = {    doStuff: function() {      ... this[key] ...    }  };  
  // Limited support from Babel, full support requires native implementation.  typeof key === "symbol"})();  
  
var c = new MyClass("hello")  
c["key"] === undefined  
```
Limited support via polyfill

Limited support requires the Babel [polyfill](_docs_babel-polyfill.md). Due to language limitations, some features can't be transpiled or polyfilled. See core.js's [caveats section](https://github.com/zloirock/core-js#caveats-when-using-symbol-polyfill) for more details.

### Subclassable Built-ins[​](_docs_learn.md#subclassable-built-ins)

In ES2015, built-ins like `Array`, `Date` and DOM `Element`s can be subclassed.

JavaScript
```
// User code of Array subclass  
class MyArray extends Array {  
    constructor(...args) { super(...args); }}  
  
var arr = new MyArray();  
arr[1] = 12;  
arr.length == 2  
```
Partial support

Built-in subclassability should be evaluated on a case-by-case basis as classes such as `HTMLElement` **can** be subclassed while many such as `Date`, `Array` and `Error` **cannot** be due to ES5 engine limitations.

### Math + Number + String + Object APIs[​](_docs_learn.md#math--number--string--object-apis)

Many new library additions, including core Math libraries, Array conversion helpers, and Object.assign for copying.

JavaScript
```
Number.EPSILON  
Number.isInteger(Infinity) // false  
Number.isNaN("NaN") // false  
  
Math.acosh(3) // 1.762747174039086  
Math.hypot(3, 4) // 5  
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2  
  
"abcde".includes("cd") // true  
"abc".repeat(3) // "abcabcabc"  
  
Array.from(document.querySelectorAll("*")) // Returns a real Array  
Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior  
[0, 0, 0].fill(7, 1) // [0,7,7]  
[1,2,3].findIndex(x => x == 2) // 1  
["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]  
["a", "b", "c"].keys() // iterator 0, 1, 2  
["a", "b", "c"].values() // iterator "a", "b", "c"  
  
Object.assign(Point, { origin: new Point(0,0) })  
```
Limited support from polyfill

Most of these APIs are supported by the Babel [polyfill](_docs_babel-polyfill.md). However, certain features are omitted for various reasons (e.g. `String.prototype.normalize` needs a lot of additional code to support). You can find more polyfills [here](https://github.com/addyosmani/es6-tools#polyfills).

### Binary and Octal Literals[​](_docs_learn.md#binary-and-octal-literals)

Two new numeric literal forms are added for binary (`b`) and octal (`o`).

JavaScript
```
0b111110111 === 503 // true  
0o767 === 503 // true  
```
Only supports literal form

Babel is only able to transform `0o767` and not `Number("0o767")`.

### Promises[​](_docs_learn.md#promises)

Promises are a library for asynchronous programming. Promises are a first class representation of a value that may be made available in the future. Promises are used in many existing JavaScript libraries.

JavaScript
```
function timeout(duration = 0) {  
    return new Promise((resolve, reject) => {        setTimeout(resolve, duration);    })}  
  
var p = timeout(1000).then(() => {  
    return timeout(2000);}).then(() => {  
    throw new Error("hmm");}).catch(err => {  
    return Promise.all([timeout(100), timeout(200)]);})  
```
Support via polyfill

In order to support Promises you must include the Babel [polyfill](_docs_babel-polyfill.md).

### Reflect API[​](_docs_learn.md#reflect-api)

Full reflection API exposing the runtime-level meta-operations on objects. This is effectively the inverse of the Proxy API, and allows making calls corresponding to the same meta-operations as the proxy traps. Especially useful for implementing proxies.

JavaScript
```
var O = {a: 1};  
Object.defineProperty(O, 'b', {value: 2});  
O[Symbol('c')] = 3;  
  
Reflect.ownKeys(O); // ['a', 'b', Symbol(c)]  
  
function C(a, b){  
  this.c = a + b;}  
var instance = Reflect.construct(C, [20, 22]);  
instance.c; // 42  
```
Support via polyfill

In order to use the Reflect API you must include the Babel [polyfill](_docs_babel-polyfill.md).

### Tail Calls[​](_docs_learn.md#tail-calls)

Calls in tail-position are guaranteed to not grow the stack unboundedly. Makes recursive algorithms safe in the face of unbounded inputs.

JavaScript
```
function factorial(n, acc = 1) {  
    "use strict";    if (n <= 1) return acc;    return factorial(n - 1, n * acc);}  
  
// Stack overflow in most implementations today,  
// but safe on arbitrary inputs in ES2015  
factorial(100000)  
```
Temporarily Removed in Babel 6

Only explicit self referencing tail recursion was supported due to the complexity and performance impact of supporting tail calls globally. Removed due to other bugs and will be re-implemented.

#### _docs_options.md

> Source: https://babeljs.io/docs/options
> Scraped: 4/2/2025, 4:57:37 PM

*   [Primary options](_docs_options.md#primary-options)
*   [Config Loading options](_docs_options.md#config-loading-options)
*   [Plugin and Preset configuration](_docs_options.md#plugin-and-preset-options)
*   [Config Merging options](_docs_options.md#config-merging-options)
*   [Source Map options](_docs_options.md#source-map-options)
*   [Misc options](_docs_options.md#misc-options)
*   [Code Generator options](_docs_options.md#code-generator-options)
*   [AMD / UMD / SystemJS options](_docs_options.md#amd--umd--systemjs-module-options)
*   [Option concepts](_docs_options.md#options-concepts)

Options can be passed to Babel in a variety of ways. When passed directly to Babel, you can just pass the options object. When Babel is used via a wrapper, it may also be necessary, or at least more useful, to pass the options via [configuration files](_docs_config-files.md).

If passing options via `@babel/cli` you'll need to `kebab-case` the names. i.e.
```
npx babel --root-mode upward file.js # equivalent of passing the rootMode config option  
```
## Primary options[​](_docs_options.md#primary-options)

These options are only allowed as part of Babel's programmatic options, so they are primarily for use by tools that wrap around Babel, or people calling `babel.transform` directly. Users of Babel's integrations, like `babel-loader` or [`@babel/register`](_docs_babel-core.md#options) are unlikely to use these.

### `cwd`[​](_docs_options.md#cwd)

Type: `string`  
Default: `process.cwd()`  

The working directory that all paths in the programmatic options will be resolved relative to.

### `caller`[​](_docs_options.md#caller)

Type: An object with the shape of
```
interface CallerData {  
  name: string;  supportsStaticESM?: boolean;  supportsDynamicImport?: boolean;  supportsTopLevelAwait?: boolean;  supportsExportNamespaceFrom?: boolean;}  
```
History

Version

Changes

v7.11.0

Add `supportsExportNamespaceFrom`

v7.7.0

Add `supportsTopLevelAwait`

v7.5.0

Add `supportsDynamicImport`

Utilities may pass a `caller` object to identify themselves to Babel and pass capability-related flags for use by configs, presets and plugins. For example

JavaScript
```
babel.transformFileSync("example.js", {  
  caller: {    name: "my-custom-tool",    supportsStaticESM: true,  },});  
```
would allow plugins and presets to decide that, since ES modules are supported, they will skip compilation of ES modules into CommonJS modules.

### `filename`[​](_docs_options.md#filename)

Type: `string`  

The filename associated with the code currently being compiled, if there is one. The filename is optional, but not all of Babel's functionality is available when the filename is unknown, because a subset of options rely on the filename for their functionality.

The three primary cases users could run into are:
*   The filename is exposed to plugins. Some plugins may require the presence of the filename.
*   Options like [`"test"`](_docs_options.md#test), [`"exclude"`](_docs_options.md#exclude), and [`"ignore"`](_docs_options.md#ignore) require the filename for string/RegExp matching.
*   `.babelrc.json` or `.babelrc` files are loaded relative to the file being compiled. If this option is omitted, Babel will behave as if `babelrc: false` has been set.

### `filenameRelative`[​](_docs_options.md#filenamerelative)

Type: `string`  
Default: `path.relative(opts.cwd, opts.filename)` (if [`"filename"`](_docs_options.md#filename) was passed)  

Used as the default value for Babel's `sourceFileName` option, and used as part of generation of filenames for the AMD / UMD / SystemJS module transforms.

### `code`[​](_docs_options.md#code)

Type: `boolean`  
Default: `true`  

Babel's default return value includes `code` and `map` properties with the resulting generated code. In some contexts where multiple calls to Babel are being made, it can be helpful to disable code generation and instead use `ast: true` to get the AST directly in order to avoid doing unnecessary work.

### `ast`[​](_docs_options.md#ast)

Type: `boolean`  
Default: `false`  

Babel's default is to generate a string and a sourcemap, but in some contexts it can be useful to get the AST itself. The primary use case for this would be a chain of multiple transform passes, along the lines of

JavaScript
```
const filename = "example.js";  
const source = fs.readFileSync(filename, "utf8");  
  
// Load and compile file normally, but skip code generation.  
const { ast } = babel.transformSync(source, {  
  filename,  ast: true,  code: false,});  
  
// Minify the file in a second pass and generate the output code here.  
const { code, map } = babel.transformFromAstSync(ast, source, {  
  filename,  presets: ["minify"],  babelrc: false,  configFile: false,});  
```
Note: This option is not on by default because the majority of users won't need it and because we'd like to eventually add a caching layer to Babel. Having to cache the AST structure will take significantly more space.

### `cloneInputAst`[​](_docs_options.md#cloneinputast)

Type: `boolean`  
Default: `true`  
Added in `v7.11.0`

By default `babel.transformFromAst` will clone the input AST to avoid mutations. Specifying `cloneInputAst: false` can improve parsing performance if the input AST is not used elsewhere.

## Config Loading options[​](_docs_options.md#config-loading-options)

Loading configuration can get a little complex as environments can have several types of configuration files, and those configuration files can have various nested configuration objects that apply depending on the configuration.

### `root`[​](_docs_options.md#root)

Type: `string`  
Default: `opts.cwd`  
Placement: Only allowed in Babel's programmatic options  

The initial path that will be processed based on the [`"rootMode"`](_docs_options.md#rootmode) to determine the conceptual root folder for the current Babel project. This is used in two primary cases:
*   The base directory when checking for the default [`"configFile"`](_docs_options.md#configfile) value
*   The default value for [`"babelrcRoots"`](_docs_options.md#babelrcroots).

### `rootMode`[​](_docs_options.md#rootmode)

Type: `"root" | "upward" | "upward-optional"`  
Default: `"root"`  
Placement: Only allowed in Babel's programmatic options  
Added in: `v7.1.0`

This option, combined with the [`"root"`](_docs_options.md#root) value, defines how Babel chooses its project root. The different modes define different ways that Babel can process the [`"root"`](_docs_options.md#root) value to get the final project root.

Note: `babel.config.json` is supported from Babel 7.8.0. In older Babel 7 versions, only `babel.config.js` is supported.
*   `"root"` - Passes the [`"root"`](_docs_options.md#root) value through as unchanged.
*   `"upward"` - Walks upward from the [`"root"`](_docs_options.md#root) directory, looking for a directory containing a [`babel.config.json`](_docs_config-files.md#project-wide-configuration) file, and throws an error if a [`babel.config.json`](_docs_config-files.md#project-wide-configuration) is not found.
*   `"upward-optional"` - Walk upward from the [`"root"`](_docs_options.md#root) directory, looking for a directory containing a [`babel.config.json`](_docs_config-files.md#project-wide-configuration) file, and falls back to [`"root"`](_docs_options.md#root) if a [`babel.config.json`](_docs_config-files.md#project-wide-configuration) is not found.

`"root"` is the default mode because it avoids the risk that Babel will accidentally load a `babel.config.json` that is entirely outside of the current project folder. If you use `"upward-optional"`, be aware that it will walk up the directory structure all the way to the filesystem root, and it is always possible that someone will have a forgotten `babel.config.json` in their home directory, which could cause unexpected errors in your builds.

Users with monorepo project structures that run builds/tests on a per-package basis may well want to use `"upward"` since monorepos often have a [`babel.config.json`](_docs_config-files.md#project-wide-configuration) in the project root. Running Babel in a monorepo subdirectory without `"upward"`, will cause Babel to skip loading any [`babel.config.json`](_docs_config-files.md#project-wide-configuration) files in the project root, which can lead to unexpected errors and compilation failure.

### `envName`[​](_docs_options.md#envname)

Type: `string`  
Default: `process.env.BABEL_ENV || process.env.NODE_ENV || "development"`  
Placement: Only allowed in Babel's programmatic options  

The current active environment used during configuration loading. This value is used as the key when resolving [`"env"`](_docs_options.md#env) configs, and is also available inside configuration functions, plugins, and presets, via the [`api.env()`](_docs_config-files.md#apienv) function.

### `configFile`[​](_docs_options.md#configfile)

Type: `string | boolean`  
Default: `path.resolve(opts.root, "babel.config.json")`, if it exists, `false` otherwise  
Placement: Only allowed in Babel's programmatic options  

Defaults to searching for a default `babel.config.json` file, but can be passed the path of any JS or JSON5 config file.

NOTE: This option does _not_ affect loading of [`.babelrc.json`](_docs_config-files.md#file-relative-configuration) files, so while it may be tempting to do `configFile: "./foo/.babelrc.json"`, it is not recommended. If the given [`.babelrc.json`](_docs_config-files.md#file-relative-configuration) is loaded via the standard file-relative logic, you'll end up loading the same config file twice, merging it with itself. If you are linking a specific config file, it is recommended to stick with a naming scheme that is independent of the "babelrc" name.

### `babelrc`[​](_docs_options.md#babelrc)

Type: `boolean`  
Default: `true` as long as the `filename` option has been specified  
Placement: Allowed in Babel's programmatic options, or inside of the loaded [`"configFile"`](_docs_options.md#configfile). A programmatic option will override a config file one.  

`true` will enable searching for [configuration files](_docs_config-files.md#file-relative-configuration) and the legacy `.babelignore` file relative to the [`"filename"`](_docs_options.md#filename) provided to Babel.

A `babelrc` value passed in the programmatic options will override one set within a configuration file.

Note: `.babelrc.json` files are only loaded if the current [`"filename"`](_docs_options.md#filename) is inside of a package that matches one of the [`"babelrcRoots"`](_docs_options.md#babelrcroots) packages.

### `babelrcRoots`[​](_docs_options.md#babelrcroots)

Type: `boolean | MatchPattern | Array<MatchPattern>`  
Default: `opts.root`  
Placement: Allowed in Babel's programmatic options, or inside of the loaded `configFile`. A programmatic option will override a config file one.  

By default, Babel will only search for `.babelrc.json` files within the [`"root"`](_docs_options.md#root) package because otherwise Babel cannot know if a given `.babelrc.json` is meant to be loaded, or if it's [`"plugins"`](_docs_options.md#plugins) and [`"presets"`](_docs_options.md#presets) have even been installed, since the file being compiled could be inside `node_modules`, or have been symlinked into the project.

This option allows users to provide a list of other packages that should be considered "root" packages when considering whether to load `.babelrc.json` files.

For example, a monorepo setup that wishes to allow individual packages to have their own configs might want to do

JavaScript
```
babelrcRoots: [  
  // Keep the root as a root  ".",  
  // Also consider monorepo packages "root" and load their .babelrc.json files.  "./packages/*",];  
```
## Plugin and Preset options[​](_docs_options.md#plugin-and-preset-options)

### `plugins`[​](_docs_options.md#plugins)

Type: `Array<PluginEntry | Plugin>` ([`PluginEntry`](_docs_options.md#pluginpreset-entries))  
Default: `[]`  

An array of plugins to activate when processing this file. For more information on how individual entries interact, especially when used across multiple nested [`"env"`](_docs_options.md#env) and [`"overrides"`](_docs_options.md#overrides) configs, see [merging](_docs_options.md#merging).

Note: The option also allows `Plugin` instances from Babel itself, but using these directly is not recommended. If you need to create a persistent representation of a plugin or preset, you should use [`babel.createConfigItem()`](_docs_babel-core.md#createconfigitem).

### `presets`[​](_docs_options.md#presets)

Type: `Array<PresetEntry>` ([`PresetEntry`](_docs_options.md#pluginpreset-entries))  
Default: `[]`  

An array of presets to activate when processing this file. For more information on how individual entries interact, especially when used across multiple nested [`"env"`](_docs_options.md#env) and [`"overrides"`](_docs_options.md#overrides) configs, see [merging](_docs_options.md#merging).

Note: The format of presets is identical to plugins, except for the fact that name normalization expects "preset-" instead of "plugin-", and presets cannot be instances of `Plugin`.

### `passPerPreset`[​](_docs_options.md#passperpreset)

Type: `boolean`  
Default: `false`  
Status: _Deprecated_  

Instructs Babel to run each of the presets in the `presets` array as an independent pass. This option tends to introduce a lot of confusion around the exact ordering of plugins, but can be useful if you absolutely need to run a set of operations as independent compilation passes.

Note: This option may be removed in future Babel versions as we add better support for defining ordering between plugins.

## Output targets[​](_docs_options.md#output-targets)

### `targets`[​](_docs_options.md#targets)

Type: `string | Array<string> | { [string]: string }`  
Default: `{}`  
Placement: Allowed in Babel's programmatic options, or in config files  
Added in: `v7.13.0`  

History

Version

Changes

`v7.20.0`

Support `deno` target

`v7.15.0`

Support `rhino` target

Describes the environments you support/target for your project.

This can either be a [browserslist-compatible](https://github.com/ai/browserslist) query (with [caveats](_docs_babel-preset-env.md#ineffective-browserslist-queries)):

babel.config.json
```
{  
  "targets": "> 0.25%, not dead"}  
```
Or an object of minimum environment versions to support:

babel.config.json
```
{  
  "targets": {    "chrome": "58",    "ie": "11"  }}  
```
Supported environments: `android`, `chrome`, `deno`, `edge`, `electron`, `firefox`, `ie`, `ios`, `node`, `opera`, `rhino`, `safari`, `samsung`.

If a minor version is not specified, Babel will interpret it as `MAJOR.0`. For example, `"node": 12` will be considered as Node.js 12.0.

#### No targets[​](_docs_options.md#no-targets)

When no targets are specified: Babel will assume you are targeting the oldest browsers possible. For example, `@babel/preset-env` will transform all ES2015-ES2020 code to be ES5 compatible.

tip

We recommend setting `targets` to reduce the output code size.

babel.config.json
```
{  
  "presets": ["@babel/preset-env"]}  
```
Because of this, Babel's behavior is different than [browserslist](https://github.com/browserslist/browserslist#queries): it does _not_ use the `defaults` query when there are no targets are found in your Babel _or_ browserslist config(s). If you want to use the `defaults` query, you will need to explicitly pass it as a target:

We recognize this isn’t ideal and will be revisiting this in Babel v8.

#### `targets.esmodules`[​](_docs_options.md#targetsesmodules)

Type: `boolean` | "intersect"

History

Version

Changes

`v7.13.0`

Support `"intersect"`

You may also target browsers supporting [ES Modules](https://www.ecma-international.org/ecma-262/6.0/#sec-modules). When the `esmodules` option is `"intersect"`, it will intersect with the `browsers` target and `browserslist`'s targets. You can use this approach in combination with `<script type="module"></script>` to conditionally serve smaller scripts to users ([https://jakearchibald.com/2017/es-modules-in-browsers/#nomodule-for-backwards-compatibility](https://jakearchibald.com/2017/es-modules-in-browsers/#nomodule-for-backwards-compatibility)).

babel.config.json
```
{  
  // Resolve to "Chrome 61+, FF60+, Safari 11+"  "targets": {    "esmodules": "intersect", // Chrome 61+, FF 60+, Safari 10.1+    "browsers": "chrome 58, firefox 60, safari 11"  }}  
```
When `esmodules` option is `true`, it will override the `browsers` target or `browserslist`'s targets.

tip

If you use browserslist `defaults` as the target, or you plan to support any mainstream browsers released in or after 2019, you can safely remove `esmodules` because these browsers already support ES Modules.

#### `targets.node`[​](_docs_options.md#targetsnode)

Type: `string | "current" | true`.

If you want to compile against the current node version, you can specify `"node": true` or `"node": "current"`, which would be the same as `"node": process.versions.node`.

Alternatively, you can specify the node version in a browserslist query:

babel.config.json
```
{  
  "targets": "node 12" // not recommended}  
```
In this case, browserslist will resolve it to the _latest_ version available in the `node-releases` library. Because Node.js may support new language features in minor releases, a program generated for Node.js 12.22 may throw a syntax error on Node.js 12.0. We recommend that you always specify a minor version when using node queries with browserslist:

babel.config.json
```
{  
  "targets": "node 12.0"}  
```
#### `targets.safari`[​](_docs_options.md#targetssafari)

Type: `string | "tp"`.

If you want to compile against the [technology preview](https://developer.apple.com/safari/technology-preview/) version of Safari, you can specify `"safari": "tp"`.

#### `targets.browsers`[​](_docs_options.md#targetsbrowsers)

Type: `string | Array<string>`.

A query to select browsers (ex: last 2 versions, > 5%, safari tp) using [browserslist](https://github.com/ai/browserslist).

Note, browsers' results are overridden by explicit items from `targets`.

#### `targets.deno`[​](_docs_options.md#targetsdeno)

Type: `string`.

The minimum supported version is 1.0.

babel.config.json
```
{  
  "targets": {    "deno": "1.9"  }}  
```
### `browserslistConfigFile`[​](_docs_options.md#browserslistconfigfile)

Type: `boolean`  
Default: `true`  
Placement: Allowed in Babel's programmatic options, or in config files  
Added in: `v7.13.0`  

Toggles whether or not [browserslist config sources](https://github.com/ai/browserslist#queries) are used, which includes searching for any browserslist files or referencing the browserslist key inside package.json. This is useful for projects that use a browserslist config for files that won't be compiled with Babel.

If a string is specified, it must represent the path of a browserslist configuration file. Relative paths are resolved relative to the configuration file which specifies this option, or to `cwd` when it's passed as part of the programmatic options.

### `browserslistEnv`[​](_docs_options.md#browserslistenv)

Type: `string`  
Default: `undefined`  
Placement: Allowed in Babel's programmatic options, or in config files  
Added in: `v7.13.0`  

The [Browserslist environment](https://github.com/browserslist/browserslist#configuring-for-different-environments) to use.

## Config Merging options[​](_docs_options.md#config-merging-options)

### `extends`[​](_docs_options.md#extends)

Type: `string`  
Placement: Not allowed inside of presets  

Configs may "extend" other configuration files. Config fields in the current config will be [merged](_docs_options.md#merging) on top of the extended file's configuration.

### `env`[​](_docs_options.md#env)

Type: `{ [envKey: string]: Options }`  
Placement: May not be nested inside of another `env` block.  

Allows for entire nested configuration options that will only be enabled if the `envKey` matches the `envName` option.

Note: `env[envKey]` options will be [merged](_docs_options.md#merging) on top of the options specified in the root object.

### `overrides`[​](_docs_options.md#overrides)

Type: `Array<Options>`  
Placement: May not be nested inside of another `overrides` object, or within an `env` block.  

Allows users to provide an array of options that will be [merged](_docs_options.md#merging) into the current configuration one at a time. This feature is best used alongside the [`"test"`](_docs_options.md#test)/[`"include"`](_docs_options.md#include)/[`"exclude"`](_docs_options.md#exclude) options to provide conditions for which an override should apply. For example:

JavaScript
```
overrides: [{  
  test: "./vendor/large.min.js",  compact: true,}],  
```
could be used to enable the `compact` option for one specific file that is known to be large and minified, and tell Babel not to bother trying to print the file nicely.

### `test`[​](_docs_options.md#test)

Type: `MatchPattern | Array<MatchPattern>` ([`MatchPattern`](_docs_options.md#matchpattern))  

If all patterns fail to match, the current configuration object is considered inactive and is ignored during config processing. This option is most useful when used within an `overrides` option object, but it's allowed anywhere.

Note: These toggles do not affect the programmatic and config-loading options in earlier sections, since they are taken into account long before the configuration that is prepared for merging.

### `include`[​](_docs_options.md#include)

Type: `MatchPattern | Array<MatchPattern>` ([`MatchPattern`](_docs_options.md#matchpattern))  

This option is a synonym for [`"test"`](_docs_options.md#test).

### `exclude`[​](_docs_options.md#exclude)

Type: `MatchPattern | Array<MatchPattern>` ([`MatchPattern`](_docs_options.md#matchpattern))  

If any of patterns match, the current configuration object is considered inactive and is ignored during config processing. This option is most useful when used within an `overrides` option object, but it's allowed anywhere.

Note: These toggles do not affect the programmatic and config-loading options in earlier sections, since they are taken into account long before the configuration that is prepared for merging.

### `ignore`[​](_docs_options.md#ignore)

Type: `Array<MatchPattern>` ([`MatchPattern`](_docs_options.md#matchpattern))  
Placement: Not allowed inside of presets  

If any of the patterns match, Babel will immediately stop all processing of the current build. For example, a user may want to do something like

to explicitly disable Babel compilation of files inside the `lib` directory.

Note: This option disables _all_ Babel processing of a file. While that has its uses, it is also worth considering the [`"exclude"`](_docs_options.md#exclude) option as a less aggressive alternative.

### `only`[​](_docs_options.md#only)

Type: `Array<MatchPattern>` ([`MatchPattern`](_docs_options.md#matchpattern))  
Placement: Not allowed inside of presets  

If all of the patterns fail to match, Babel will immediately stop all processing of the current build. For example, a user may want to do something like

to explicitly enable Babel compilation of files inside the `src` directory while disabling everything else.

Note: This option disables _all_ Babel processing of a file. While that has its uses, it is also worth considering the [`"test"`](_docs_options.md#test)/[`"include"`](_docs_options.md#include) options as a less aggressive alternative.

## Source Map options[​](_docs_options.md#source-map-options)

### `inputSourceMap`[​](_docs_options.md#inputsourcemap)

Type: `boolean | SourceMap`  
Default: `true`  

`true` will attempt to load an input sourcemap from the file itself, if it contains a `//# sourceMappingURL=...` comment. If no map is found, or the map fails to load and parse, it will be silently discarded.

If an object is provided, it will be treated as the source map object itself.

### `sourceMaps`[​](_docs_options.md#sourcemaps)

Type: `boolean | "inline" | "both"`  
Default: `false`  
*   `true` to generate a sourcemap for the code and include it in the result object.
*   `"inline"` to generate a sourcemap and append it as a data URL to the end of the code, but not include it in the result object.
*   `"both"` is the same as inline, but will include the map in the result object.

Options in configuration files have no effect on whether `@babel/cli` writes files separate `.map` files to disk. When the `--source-maps` CLI option is passed to `@babel/cli` it will also control whether `.map` files are written:
*   `true` will write the map to a `.map` file on disk
*   `"inline"` will write the file directly, so it will have a `data:` containing the map
*   `"both"` will write the file with a `data:` URL and _also_ a `.map`.

Note: These options are bit weird, so it may make the most sense to just use `true` and handle the rest in your own code, depending on your use case.

### `sourceMap`[​](_docs_options.md#sourcemap)

This is an synonym for `sourceMaps`. Using `sourceMaps` is recommended.

### `sourceFileName`[​](_docs_options.md#sourcefilename)

Type: `string`  
Default: `path.basename(opts.filenameRelative)` when available, or `"unknown"`  

The name to use for the file inside the source map object.

### `sourceRoot`[​](_docs_options.md#sourceroot)

Type: `string`  

The `sourceRoot` fields to set in the generated source map, if one is desired.

## Misc options[​](_docs_options.md#misc-options)

### `sourceType`[​](_docs_options.md#sourcetype)

Type: `"script" | "module" | "unambiguous"`  
Default: "module"  
*   `"script"` - Parse the file using the ECMAScript Script grammar. No `import`/`export` statements allowed, and files are not in strict mode.
*   `"module"` - Parse the file using the ECMAScript Module grammar. Files are automatically strict, and `import`/`export` statements are allowed.
*   `"unambiguous"` - Consider the file a "module" if `import`/`export` statements are present, or else consider it a "script".

`unambiguous` can be quite useful in contexts where the type is unknown, but it can lead to false matches because it's perfectly valid to have a module file that does not use `import`/`export` statements.

This option is important because the type of the current file affects both parsing of input files, and certain transforms that may wish to add `import`/`require` usage to the current file.

For instance, [`@babel/plugin-transform-runtime`](_docs_babel-plugin-transform-runtime.md) relies on the type of the current document to decide whether to insert an `import` declaration, or a `require()` call. [`@babel/preset-env`](_docs_babel-preset-env.md) also does the same for its [`"useBuiltIns"`](_docs_babel-preset-env.md#usebuiltins) option. Since Babel defaults to treating files are ES modules, generally these plugins/presets will insert `import` statements. Setting the correct `sourceType` can be important because having the wrong type can lead to cases where Babel would insert `import` statements into files that are meant to be CommonJS files. This can be particularly important in projects where compilation of `node_modules` dependencies is being performed, because inserting an `import` statements can cause Webpack and other tooling to see a file as an ES module, breaking what would otherwise be a functional CommonJS file.

Note: This option will not affect parsing of `.mjs` files, as they are currently hard-coded to always parse as `"module"` files.

### `assumptions`[​](_docs_options.md#assumptions)

Type: `{ [assumption: string]: boolean }`  
Default: `{}`  
Added in: `v7.13.0`  
Placement: Allowed in programmatic options, config files and presets.  

Set assumptions that Babel can make in order to produce smaller output:

babel.config.json
```
{  
  "assumptions": {    "iterableIsArray": true  },  "presets": ["@babel/preset-env"]}  
```
For more informations, check the [assumptions](_docs_assumptions.md) documentation page.

### `highlightCode`[​](_docs_options.md#highlightcode)

Type: `boolean`  
Default: `true`  

Highlight tokens in code snippets in Babel's error messages to make them easier to read.

### `wrapPluginVisitorMethod`[​](_docs_options.md#wrappluginvisitormethod)

Type: `(key: string, nodeType: string, fn: Function) => Function`  

Allows users to add a wrapper on each visitor in order to inspect the visitor process as Babel executes the plugins.
*   `key` is a simple opaque string that represents the plugin being executed.
*   `nodeType` is the type of AST node currently being visited.
*   `fn` is the visitor function itself.

Users can return a replacement function that should call the original function after performing whatever logging and analysis they wish to do.

### `parserOpts`[​](_docs_options.md#parseropts)

Type: `{}`  

An opaque object containing options to pass through to the parser being used.

For available parser options, see [Parser Options](_docs_babel-parser.md#options).

### `generatorOpts`[​](_docs_options.md#generatoropts)

Type: `{}`  

An opaque object containing options to pass through to the code generator being used. See [Code Generator Options](_docs_options.md#code-generator-options) for most used options.

## Code Generator options[​](_docs_options.md#code-generator-options)

### `retainLines`[​](_docs_options.md#retainlines)

Type: `boolean`  
Default: `false`  

Babel will make an effort to generate code such that items are printed on the same line that they were on in the original file. This option exists so that users who cannot use source maps can get vaguely useful error line numbers, but it is only a best-effort, and is not guaranteed in all cases with all plugins.

### `compact`[​](_docs_options.md#compact)

Type: `boolean | "auto"`  
Default: `"auto"`  

"auto" will set the value by evaluating `code.length > 500_000`

All optional newlines and whitespace will be omitted when generating code in compact mode.

### `minified`[​](_docs_options.md#minified)

Type: `boolean`  
Default: `false`  

Includes `compact: true`, omits block-end semicolons, omits `()` from `new Foo()` when possible, and may output shorter versions of literals.

Type: `string`  

Allows specifying a prefix comment to insert before pieces of code that were not present in the original file.

Note: The definition of what is and isn't present in the original file can get a little ugly, so usage of this option is _not recommended_. If you need to annotate code somehow, it is better to do so using a Babel plugin.

Type: `string`  

Allows specifying a prefix comment to insert after pieces of code that were not present in the original file.

Note: The definition of what is and isn't present in the original file can get a little ugly, so usage of this option is _not recommended_. If you need to annotate code somehow, it is better to do so using a Babel plugin.

Type: `boolean`  
Default: `true`  

Provides a default comment state for `shouldPrintComment` if no function is given. See the default value of that option for more info.

Type: `(value: string) => boolean`  
Default without `minified`: `(val) => opts.comments || /@license|@preserve/.test(val)`  
Default with `minified`: `() => opts.comments`  

A function that can decide whether a given comment should be included in the output code from Babel.

### Advanced Usage[​](_docs_options.md#advanced-usage)

For more code generator options, see [Generator Options](_docs_babel-generator.md#options).

## AMD / UMD / SystemJS module options[​](_docs_options.md#amd--umd--systemjs-module-options)

### `moduleIds`[​](_docs_options.md#moduleids)

Type: `boolean`  
Default: `!!opts.moduleId`  

Enables module ID generation.

### `moduleId`[​](_docs_options.md#moduleid)

Type: `string`  

A hard-coded ID to use for the module. Cannot be used alongside `getModuleId`.

### `getModuleId`[​](_docs_options.md#getmoduleid)

Type: `(name: string) => string`  

Given the babel-generated module name, return the name to use. Returning a falsy value will use the original `name`.

### `moduleRoot`[​](_docs_options.md#moduleroot)

Type: `string`  

A root path to include on generated module names.

## Options Concepts[​](_docs_options.md#options-concepts)

### `MatchPattern`[​](_docs_options.md#matchpattern)

Type: `string | RegExp | (filename: string | void, context: { caller: { name: string } | void, envName: string, dirname: string ) => boolean`

Several Babel options perform tests against file paths. In general, these options support a common pattern approach where each pattern can be
*   `string` - A file path with simple support for `**`, `*`, and `*.ext`. Any file or parent folder matching the pattern counts as a match. The path follow's Node's normal path logic, so on POSIX is must be `/`\-separated, but on Windows both `/` and `\` are supported.
*   `RegExp` - A regular expression to match against the normalized filename. On POSIX the path RegExp will run against a `/`\-separated path, and on Windows it will be on a `\`\-separated path.

Importantly, if either of these are used, Babel requires that the `filename` option be present, and will consider it an error otherwise.
*   `(filename: string | void, context: { caller: { name: string } | void, envName: string, dirname: string }) => boolean` is a general callback that should return a boolean to indicate whether it is a match or not. The function is passed the filename or `undefined` if one was not given to Babel. It is also passed the current `envName` and `caller` options that were specified by the top-level call to Babel and `dirname` that is either a directory of the configuration file or the current working directory (if the transformation was called programmatically).

note

Matching based on strings does _not_ support full glob patterns. `**` matches 0 or more path parts, `*` matches exactly 1 path part, and `*.ext` matches a wildcard with an extension. Using `*` in any other way, for example, as part of a path or file name, is not supported. If you need complex pattern matching, use regex matching, or a self-defined function in the configuration.

Here are some examples, on how matching works:

Description

Pattern

Matches

Does Not Match

Exact path matching

`foo/bar`

`/src/foo/bar`

`/src/foo`, `/src/foo/baz`, `/src/foo/bar/baz`

Single wildcard (`*`)

`*/bar`

`/src/foo/bar`, `/src/xyz/bar`

`/src/foo/baz`, `/src/bar`, `/src/foo/bar/baz`

Double wildcard (`**`)

`**/bar`

`/src/bar`, `/src/foo/bar`, `/src/a/b/c/bar`

`/src/bar/foo`, `/src/barfoo`

File extension pattern (`*.ext`)

`foo/*.js`

`/src/foo/test.js`, `/src/foo/index.js/`

`/src/foo/test.ts`, `/src/foo/test.js.map`

Combined patterns

`**/test/*.js`

`/src/test/file.js`, `/src/a/b/test/file.js`

`/src/test.js`, `/src/test/sub/file.js`

Here are examples, where `*` does _not_ have a wildcard function:

Description

Pattern

Does Not Match

Star in path

`test*me/*.js`

`/src/testme/1.js`, `/src/testme/2.js`, `/src/test-me/3.js`

Star in file name

`foo*bar.js`

`/src/foobar.js`, `/src/foo-bar.js`

Star in extension

`file.ts*`

`/src/file.ts`, `/src/file.tsx`

### Merging[​](_docs_options.md#merging)

Please refer to [How Babel merges config items](_docs_configuration.md#how-babel-merges-config-items).

### Plugin/Preset entries[​](_docs_options.md#pluginpreset-entries)

#### `PluginEntry` / `PresetEntry`[​](_docs_options.md#pluginentry--presetentry)

Individual plugin/preset items can have several different structures:
*   `EntryTarget` - Individual plugin
*   `[EntryTarget, EntryOptions]` - Individual plugin w/ options
*   `[EntryTarget, EntryOptions, string]` - Individual plugin with options and name (see [merging](_docs_options.md#merging) for more info on names)
*   `ConfigItem` - A plugin configuration item created by `babel.createConfigItem()`.

The same `EntryTarget` may be used multiple times unless each one is given a different name, and doing so will result in a duplicate-plugin/preset error.

That can be a little hard to read, so as an example:

JavaScript
```
plugins: [  
  // EntryTarget  '@babel/plugin-transform-classes',  
  // [EntryTarget, EntryOptions]  ['@babel/plugin-transform-arrow-functions', { spec: true }],  
  // [EntryTarget, EntryOptions, string]  ['@babel/plugin-transform-for-of', { loose: true }, "some-name"],  
  // ConfigItem  babel.createConfigItem(require("@babel/plugin-transform-spread")),],  
```
#### `EntryTarget`[​](_docs_options.md#entrytarget)

Type: `string | {} | Function`  

A plugin/preset target can come from a few different sources:
*   `string` - A `require`\-style path or plugin/preset identifier. Identifiers will be passed through [name normalization](_docs_options.md#name-normalization).
*   `{} | Function` - An actual plugin/preset object or function after it has been `require()`ed.

#### `EntryOptions`[​](_docs_options.md#entryoptions)

Type: `undefined | {} | false`

Options are passed through to each plugin/preset when they are executed. `undefined` will be normalized to an empty object.

`false` indicates that an entry is entirely disabled. This can be useful in contexts where ordering is important, but a separate condition is needed to decide if something is enabled. For instance:

JavaScript
```
plugins: [  
  'one',  ['two', false],  'three',],  
overrides: [{  
  test: "./src",  plugins: [    'two',  ]}]  
```
would enable the `two` plugin for files in `src`, but `two` would still execute between `one` and `three`.

### Name Normalization[​](_docs_options.md#name-normalization)

By default, Babel expects plugins to have a `babel-plugin-` or `babel-preset-` prefix in their name. To avoid repetition, Babel has a name normalization phase will automatically add these prefixes when loading items. This boils down to a few primary rules:
*   Absolute paths pass through untouched.
*   Relative paths starting with `./` pass through untouched.
*   References to files _within_ a package are untouched.
*   Any identifier prefixed with `module:` will have the prefix removed but otherwise be untouched.
*   `plugin-`/`preset-` will be injected at the start of any `@babel`\-scoped package that doesn't have it as a prefix.
*   `babel-plugin-`/`babel-preset-` will be injected as a prefix any unscoped package that doesn't have it as a prefix.
*   `babel-plugin-`/`babel-preset-` will be injected as a prefix any `@`\-scoped package that doesn't have it _anywhere_ in their name.
*   `babel-plugin`/`babel-preset` will be injected as the package name if only the `@`\-scope name is given.

Here are some examples, when applied in a plugin context:

Input

Normalized

`"/dir/plugin.js"`

`"/dir/plugin.js"`

`"./dir/plugin.js"`

`"./dir/plugin.js"`

`"mod"`

`"babel-plugin-mod"`

`"mod/plugin"`

`"mod/plugin"`

`"babel-plugin-mod"`

`"babel-plugin-mod"`

`"@babel/mod"`

`"@babel/plugin-mod"`

`"@babel/plugin-mod"`

`"@babel/plugin-mod"`

`"@babel/mod/plugin"`

`"@babel/mod/plugin"`

`"@scope"`

`"@scope/babel-plugin"`

`"@scope/babel-plugin"`

`"@scope/babel-plugin"`

`"@scope/mod"`

`"@scope/babel-plugin-mod"`

`"@scope/babel-plugin-mod"`

`"@scope/babel-plugin-mod"`

`"@scope/prefix-babel-plugin-mod"`

`"@scope/prefix-babel-plugin-mod"`

`"@scope/mod/plugin"`

`"@scope/mod/plugin"`

`"module:foo"`

`"foo"`

#### _docs_plugins-list.md

> Source: https://babeljs.io/docs/plugins-list
> Scraped: 4/2/2025, 4:57:34 PM

[Skip to main content](#__docusaurus_skipToContent_fallback)

# Plugins List

## JavaScript[​](#javascript)

### TC39 Proposals[​](#tc39-proposals)

#### Stage 3[​](#stage-3)
*   [decorators](_docs_babel-plugin-proposal-decorators.md)
*   [import-wasm-source](_docs_babel-plugin-proposal-import-wasm-source.md)

#### Early stages[​](#early-stages)
*   [do-expressions](_docs_babel-plugin-proposal-do-expressions.md)
*   [export-default-from](_docs_babel-plugin-proposal-export-default-from.md)
*   [function-bind](_docs_babel-plugin-proposal-function-bind.md)
*   [function-sent](_docs_babel-plugin-proposal-function-sent.md)
*   [partial-application](_docs_babel-plugin-proposal-partial-application.md)
*   [pipeline-operator](_docs_babel-plugin-proposal-pipeline-operator.md)
*   [throw-expressions](_docs_babel-plugin-proposal-throw-expressions.md)
*   [record-and-tuple](_docs_babel-plugin-proposal-record-and-tuple.md)

### ES2025[​](#es2025)
*   [duplicate-named-capturing-groups-regex](_docs_babel-plugin-transform-duplicate-named-capturing-groups-regex.md)
*   [json-modules](_docs_babel-plugin-transform-json-modules.md)
*   [regexp-modifiers](_docs_babel-plugin-transform-regexp-modifiers.md)

### ES2024[​](#es2024)
*   [unicode-sets-regex](_docs_babel-plugin-transform-unicode-sets-regex.md)

### ES2022[​](#es2022)
*   [class-properties](_docs_babel-plugin-transform-class-properties.md)
*   [class-static-block](_docs_babel-plugin-transform-class-static-block.md)
*   [private-property-in-object](_docs_babel-plugin-transform-private-property-in-object.md)
*   [private-methods](_docs_babel-plugin-transform-private-methods.md)

### ES2021[​](#es2021)
*   [logical-assignment-operators](_docs_babel-plugin-transform-logical-assignment-operators.md)
*   [numeric-separator](_docs_babel-plugin-transform-numeric-separator.md)

### ES2020[​](#es2020)
*   [dynamic-import](_docs_babel-plugin-transform-dynamic-import.md)
*   [export-namespace-from](_docs_babel-plugin-transform-export-namespace-from.md)
*   [nullish-coalescing-operator](_docs_babel-plugin-transform-nullish-coalescing-operator.md)
*   [optional-chaining](_docs_babel-plugin-transform-optional-chaining.md)

### ES2019[​](#es2019)
*   [optional-catch-binding](_docs_babel-plugin-transform-optional-catch-binding.md)
*   [json-strings](_docs_babel-plugin-transform-json-strings.md)

### ES2018[​](#es2018)
*   [async-generator-functions](_docs_babel-plugin-transform-async-generator-functions.md)
*   [dotall-regex](_docs_babel-plugin-transform-dotall-regex.md)
*   [named-capturing-groups-regex](_docs_babel-plugin-transform-named-capturing-groups-regex.md)
*   [object-rest-spread](_docs_babel-plugin-transform-object-rest-spread.md)
*   [unicode-property-regex](_docs_babel-plugin-transform-unicode-property-regex.md)

### ES2017[​](#es2017)
*   [async-to-generator](_docs_babel-plugin-transform-async-to-generator.md)

### ES2016[​](#es2016)
*   [exponentiation-operator](_docs_babel-plugin-transform-exponentiation-operator.md)

### ES2015[​](#es2015)
*   [arrow-functions](_docs_babel-plugin-transform-arrow-functions.md)
*   [block-scoped-functions](_docs_babel-plugin-transform-block-scoped-functions.md)
*   [block-scoping](_docs_babel-plugin-transform-block-scoping.md)
*   [classes](_docs_babel-plugin-transform-classes.md)
*   [computed-properties](_docs_babel-plugin-transform-computed-properties.md)
*   [destructuring](_docs_babel-plugin-transform-destructuring.md)
*   [duplicate-keys](_docs_babel-plugin-transform-duplicate-keys.md)
*   [for-of](_docs_babel-plugin-transform-for-of.md)
*   [function-name](_docs_babel-plugin-transform-function-name.md)
*   [instanceof](_docs_babel-plugin-transform-instanceof.md)
*   [literals](_docs_babel-plugin-transform-literals.md)
*   [new-target](_docs_babel-plugin-transform-new-target.md)
*   [object-super](_docs_babel-plugin-transform-object-super.md)
*   [parameters](_docs_babel-plugin-transform-parameters.md)
*   [shorthand-properties](_docs_babel-plugin-transform-shorthand-properties.md)
*   [spread](_docs_babel-plugin-transform-spread.md)
*   [sticky-regex](_docs_babel-plugin-transform-sticky-regex.md)
*   [template-literals](_docs_babel-plugin-transform-template-literals.md)
*   [typeof-symbol](_docs_babel-plugin-transform-typeof-symbol.md)
*   [unicode-escapes](_docs_babel-plugin-transform-unicode-escapes.md)
*   [unicode-regex](_docs_babel-plugin-transform-unicode-regex.md)

### ES5[​](#es5)
*   [property-mutators](_docs_babel-plugin-transform-property-mutators.md)

### ES3[​](#es3)
*   [member-expression-literals](_docs_babel-plugin-transform-member-expression-literals.md)
*   [property-literals](_docs_babel-plugin-transform-property-literals.md)
*   [reserved-words](_docs_babel-plugin-transform-reserved-words.md)

### Module Formats[​](#module-formats)
*   [modules-amd](_docs_babel-plugin-transform-modules-amd.md)
*   [modules-commonjs](_docs_babel-plugin-transform-modules-commonjs.md)
*   [modules-systemjs](_docs_babel-plugin-transform-modules-systemjs.md)
*   [modules-umd](_docs_babel-plugin-transform-modules-umd.md)

### React[​](#react)
*   [react-constant-elements](_docs_babel-plugin-transform-react-constant-elements.md)
*   [react-inline-elements](_docs_babel-plugin-transform-react-inline-elements.md)

#### React Preset[​](#react-preset)
*   [react-display-name](_docs_babel-plugin-transform-react-display-name.md)
*   [react-jsx](_docs_babel-plugin-transform-react-jsx.md)
*   [react-jsx-compat](_docs_babel-plugin-transform-react-jsx-compat.md)
*   [react-jsx-self](_docs_babel-plugin-transform-react-jsx-self.md)
*   [react-jsx-source](_docs_babel-plugin-transform-react-jsx-source.md)

### Flow[​](#flow)
*   [flow-strip-types](_docs_babel-plugin-transform-flow-strip-types.md)

### TypeScript[​](#typescript)
*   [typescript](_docs_babel-plugin-transform-typescript.md)

### Misc[​](#misc)
*   [external-helpers](_docs_babel-plugin-external-helpers.md)
*   [jscript](_docs_babel-plugin-transform-jscript.md)
*   [object-assign](_docs_babel-plugin-transform-object-assign.md)
*   [object-set-prototype-of-to-assign](_docs_babel-plugin-transform-object-set-prototype-of-to-assign.md)
*   [proto-to-assign](_docs_babel-plugin-transform-proto-to-assign.md)
*   [regenerator](_docs_babel-plugin-transform-regenerator.md)
*   [runtime](_docs_babel-plugin-transform-runtime.md)
*   [strict-mode](_docs_babel-plugin-transform-strict-mode.md)

#### Syntax Only[​](#syntax-only)
*   [syntax-bigint](_docs_babel-plugin-syntax-bigint.md) (ES2020)
*   [syntax-dynamic-import](_docs_babel-plugin-syntax-dynamic-import.md) (ES2020)
*   [syntax-import-meta](_docs_babel-plugin-syntax-import-meta.md) (ES2020)
*   [syntax-top-level-await](_docs_babel-plugin-syntax-top-level-await.md) (ES2022)

#### _docs_plugins.md

> Source: https://babeljs.io/docs/plugins
> Scraped: 4/2/2025, 4:57:35 PM

Babel's code transformations are enabled by applying plugins (or [presets](_docs_presets.md)) to your [configuration file](_docs_config-files.md).

## Using a Plugin[​](_docs_plugins.md#using-a-plugin)

If the plugin is on [npm](https://www.npmjs.com/search?q=babel-plugin), you can pass in the name of the plugin and Babel will check that it's installed in `node_modules`. This is added to the [plugins](_docs_options.md#presets) config option, which takes an array.

babel.config.json
```
{  
  "plugins": ["babel-plugin-myPlugin", "@babel/plugin-transform-runtime"]}  
```
You can also specify a relative/absolute path to your plugin.

babel.config.json
```
{  
  "plugins": ["./node_modules/asdf/plugin"]}  
```
See [name normalization](_docs_options.md#name-normalization) for more specifics on configuring the path of a plugin or preset.

## Transform Plugins[​](_docs_plugins.md#transform-plugins)

These plugins apply transformations to your code.

info

Transform plugins will enable the corresponding syntax plugin so you don't have to specify both.

## Syntax Plugins[​](_docs_plugins.md#syntax-plugins)

Most syntax is transformable by Babel. In rarer cases (if the transform isn't implemented yet, or there isn't a default way to do so), you can use plugins such as `@babel/plugin-syntax-bigint` to only allow Babel to **parse** specific types of syntax. Or you want to preserve the source code because you only want Babel to do code analysis or codemods.

tip

You don't need to specify the syntax plugin if the corresponding transform plugin is used already, since it enables it automatically.

Alternatively, you can also provide any [`plugins` option](_docs_babel-parser.md#plugins) from the Babel parser:

Your `.babelrc`:

JSON
```
{  
  "parserOpts": {    "plugins": ["jsx", "flow"]  }}  
```
## Plugin Ordering[​](_docs_plugins.md#plugin-ordering)

> Ordering matters for each visitor in the plugin.

This means if two transforms both visit the "Program" node, the transforms will run in either plugin or preset order.
*   Plugins run before Presets.
*   Plugin ordering is first to last.
*   Preset ordering is reversed (last to first).

For example:

babel.config.json
```
{  
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]}  
```
Will run `transform-decorators-legacy` then `transform-class-properties`.

It is important to remember that with presets, the order is _reversed_. The following:

babel.config.json
```
{  
  "presets": ["@babel/preset-env", "@babel/preset-react"]}  
```
Will run in the following order: `@babel/preset-react` then `@babel/preset-env`.

## Plugin Options[​](_docs_plugins.md#plugin-options)

Both plugins and presets can have options specified by wrapping the name and an options object in an array inside your config.

For specifying no options, these are all equivalent:

babel.config.json
```
{  
  "plugins": ["pluginA", ["pluginA"], ["pluginA", {}]]}  
```
To specify an option, pass an object with the keys as the option names.

babel.config.json
```
{  
  "plugins": [    [      "transform-async-to-module-method",      {        "module": "bluebird",        "method": "coroutine"      }    ]  ]}  
```
Settings options for presets works exactly the same:

babel.config.json
```
{  
  "presets": [    [      "env",      {        "loose": true,        "modules": false      }    ]  ]}  
```
## Plugin Development[​](_docs_plugins.md#plugin-development)

Please refer to the excellent [babel-handbook](https://github.com/thejameskyle/babel-handbook) to learn how to create your own plugins.

The simple plugin that reverses names (from the homepage):

JavaScript
```
export default function() {  
  return {    visitor: {      Identifier(path) {        const name = path.node.name;        // reverse the name: JavaScript -> tpircSavaJ        path.node.name = name          .split("")          .reverse()          .join("");      },    },  };}  
```

#### _docs_presets.md

> Source: https://babeljs.io/docs/presets
> Scraped: 4/2/2025, 4:57:34 PM

Babel presets can act as sharable set of Babel plugins and/or config [`options`](_docs_options.md).

## Official Presets[​](_docs_presets.md#official-presets)

We've assembled a few presets for common environments:
*   [@babel/preset-env](_docs_babel-preset-env.md) for compiling ES2015+ syntax
*   [@babel/preset-typescript](_docs_babel-preset-typescript.md) for [TypeScript](https://www.typescriptlang.org/)
*   [@babel/preset-react](_docs_babel-preset-react.md) for [React](https://reactjs.org/)
*   [@babel/preset-flow](_docs_babel-preset-flow.md) for [Flow](https://flow.org/)

## Other Integrations[​](_docs_presets.md#other-integrations)

If you aren't using Babel directly, the framework you are using may have its own configuration for you to use or extend. Many other community maintained presets are available [on npm](https://www.npmjs.com/search?q=babel-preset)!

[Next.js](https://nextjs.org/docs/advanced-features/customizing-babel-config) | [Nuxt.js](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build#babel) | [Parcel](https://en.parceljs.org/javascript.html#babel) | [Jest](https://jestjs.io/docs/getting-started#using-babel) | [Gatsby](https://www.gatsbyjs.com/docs/how-to/custom-configuration/babel)

## Using a Preset[​](_docs_presets.md#using-a-preset)

Within a Babel config, if the preset is on [npm](https://www.npmjs.com/search?q=babel-preset), you can pass in the name of the preset and Babel will check that it's installed in `node_modules` already. This is added to the [presets](_docs_options.md#presets) config option, which takes an array.

babel.config.json
```
{  
  "presets": ["babel-preset-myPreset", "@babel/preset-env"]}  
```
Otherwise, you can also specify a relative or absolute path to your presets.

babel.config.json
```
{  
  "presets": ["./myProject/myPreset"]}  
```
See [name normalization](_docs_options.md#name-normalization) for more specifics on configuring the path of a plugin or preset.

## Stage-X (Experimental Presets)[​](_docs_presets.md#stage-x-experimental-presets)

Deprecated

As of Babel 7, we've decided to deprecate the Stage-X presets and stop publishing them. Because these proposals are inherently subject to change, it seems better to ask users to specify individual proposals as plugins vs. a catch all preset that you would need to check up on anyway. Check out our [blog](_blog_2018_07_27_removing-babels-stage-presets.md) for more context.

Any transforms in stage-x presets are changes to the language that haven't been approved to be part of a release of JavaScript (such as ES6/ES2015).

The [TC39](https://github.com/tc39) categorizes proposals into the following stages:
*   [Stage 0](_docs_babel-preset-stage-0.md) - Strawman: just an idea, possible Babel plugin.
*   [Stage 1](_docs_babel-preset-stage-1.md) - Proposal: this is worth working on.
*   [Stage 2](_docs_babel-preset-stage-2.md) - Draft: initial spec.
*   [Stage 3](_docs_babel-preset-stage-3.md) - Candidate: complete spec and initial browser implementations.
*   Stage 4 - Finished: will be added to the next yearly release.

For more information, be sure to check out the [current TC39 proposals](https://github.com/tc39/proposals) and its [process document](https://tc39.github.io/process-document).

The TC39 stage process is also explained in detail across a few posts by Yehuda Katz (@wycatz) over at [thefeedbackloop.xyz](https://thefeedbackloop.xyz/): [Stage 0 and 1](https://thefeedbackloop.xyz/tc39-a-process-sketch-stages-0-and-1/), [Stage 2](https://thefeedbackloop.xyz/tc39-process-sketch-stage-2/), [Stage 3](https://thefeedbackloop.xyz/tc39-process-sketch-stage-3/)

## Creating a Preset[​](_docs_presets.md#creating-a-preset)

To make your own preset (either for local usage or to npm), you need to export a config object.

> It could just return an array of plugins..

JavaScript
```
module.exports = function() {  
  return {    plugins: ["pluginA", "pluginB", "pluginC"],  };};  
```
> Presets can contain other presets, and plugins with options.

JavaScript
```
module.exports = () => ({  
  presets: [require("@babel/preset-env")],  plugins: [    [require("@babel/plugin-transform-class-properties"), { loose: true }],    require("@babel/plugin-transform-object-rest-spread"),  ],});  
```
For more info, check out the [babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md#making-your-own-preset) section on presets.

## Preset Ordering[​](_docs_presets.md#preset-ordering)

Preset ordering is reversed (last to first).

babel.config.json
```
{  
  "presets": ["a", "b", "c"]}  
```
Will run in the following order: `c`, `b`, then `a`.

This was mostly for ensuring backwards compatibility, since most users listed "es2015" before "stage-0".

## Preset Options[​](_docs_presets.md#preset-options)

Both plugins and presets can have options specified by wrapping the name and an options object in an array inside your config.

For specifying no options, these are all equivalent:

babel.config.json
```
{  
  "presets": [    "presetA", // bare string    ["presetA"], // wrapped in array    ["presetA", {}] // 2nd argument is an empty options object  ]}  
```
To specify an option, pass an object with the keys as the option names.

babel.config.json
```
{  
  "presets": [    [      "@babel/preset-env",      {        "loose": true,        "modules": false      }    ]  ]}  
```

#### _docs_usage.md

> Source: https://babeljs.io/docs/usage
> Scraped: 4/2/2025, 4:57:34 PM

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

#### _docs_v7-migration.md

> Source: https://babeljs.io/docs/v7-migration
> Scraped: 4/2/2025, 4:57:34 PM

Refer users to this document when upgrading to Babel 7. Check [here](_docs_v7-migration-api.md) for API/integration changes.

Because not every breaking change will affect every project, we've sorted the sections by the likelihood of a change breaking tests when upgrading.

## All of Babel[​](_docs_v7-migration.md#all-of-babel)

> Support for Node.js 0.10, 0.12, 4 and 5 has been dropped [#5025](https://github.com/babel/babel/pull/5025), [#5041](https://github.com/babel/babel/pull/5041), [#7755](https://github.com/babel/babel/pull/7755), [#5186](https://github.com/babel/babel/pull/5186)

We highly encourage you to use a newer version of Node.js (LTS v8) since the previous versions are not maintained. See [nodejs/LTS](https://github.com/nodejs/LTS) for more information.

This just means Babel _itself_ won't run on older versions of Node. It can still _output_ code that runs on old Node versions.

## Config Lookup Changes[​](_docs_v7-migration.md#config-lookup-changes)

For more info, read our [6.x vs 7.x comparison](_docs_config-files.md#6x-vs-7x-babelrc-loading).

Babel has had issues previously with handling `node_modules`, symlinks, and monorepos. We've made some changes to account for this: Babel will stop lookup at the `package.json` boundary instead of looking up the chain. For monorepos we have added a new `babel.config.js` file that centralizes our config across all the packages (alternatively you could make a config per package). In 7.1, we've introduced a [`rootMode`](_docs_options.md#rootmode) option for further lookup if necessary.

## [Yearly Preset Deprecations](_blog_2017_12_27_nearing-the-7.0-release.html.md#deprecated-yearly-presets-eg-babel-preset-es20xx)[​](_docs_v7-migration.md#yearly-preset-deprecations)

The "env" preset has been out for more than a year now, and completely replaces some of the presets we've had and suggested earlier.
*   `babel-preset-es2015`
*   `babel-preset-es2016`
*   `babel-preset-es2017`
*   `babel-preset-latest`
*   A combination of the above ^

These presets should be substituted with the "env" preset.

## [Stage Preset Deprecations](_blog_2018_07_27_removing-babels-stage-presets.md)[​](_docs_v7-migration.md#stage-preset-deprecations)

We are removing the stage presets in favor of explicit proposal usage. Can check the [stage-0 README](https://github.com/babel/babel/tree/755ec192e22c6b6e00782e4810366d0166fdbebd/packages/babel-preset-stage-0#babelpreset-stage-0) for more migration steps.

To do this automatically you can run [`npx babel-upgrade`](https://github.com/babel/babel-upgrade) (PR added [here](https://github.com/babel/babel-upgrade/pull/69)).

## [Remove proposal polyfills in `@babel/polyfill`](https://github.com/babel/babel/issues/8416)[​](_docs_v7-migration.md#remove-proposal-polyfills-in-babelpolyfill)

Based on similar thinking, we have removed the polyfill proposals from `@babel/polyfill`.

Right now `@babel/polyfill` is mostly just an alias of `core-js` v2. [Source](https://github.com/babel/babel/blob/master/packages/babel-polyfill/src/index.js)

Before it used to just be 2 imports:

JavaScript
```
import "core-js/shim"; // included < Stage 4 proposals  
import "regenerator-runtime/runtime";  
```
If you want to use proposals, you will need to import these independently. You should import them directly from the [`core-js`](https://github.com/zloirock/core-js/tree/v2#usage) package or another package on npm.

e.g.

JavaScript
```
// for core-js v2:  
import "core-js/fn/array/flat-map";  
  
// for core-js v3:  
import "core-js/features/array/flat-map";  
```
Below is a list of Stage < 3 proposal polyfills in `core-js` v2.

Details

JavaScript
```
// core-js v2  
  
// Stage 3  
import "core-js/fn/string/trim-left";  
import "core-js/fn/string/trim-right";  
import "core-js/fn/string/match-all";  
import "core-js/fn/array/flat-map";  
import "core-js/fn/array/flatten"; // RENAMED  
import "core-js/fn/global";  
  
// Stage 1  
import "core-js/fn/symbol/observable";  
import "core-js/fn/promise/try";  
import "core-js/fn/observable";  
  
// Stage 1 Math Extensions  
import "core-js/fn/math/clamp";  
import "core-js/fn/math/deg-per-rad";  
import "core-js/fn/math/degrees";  
import "core-js/fn/math/fscale";  
import "core-js/fn/math/iaddh";  
import "core-js/fn/math/isubh";  
import "core-js/fn/math/imulh";  
import "core-js/fn/math/rad-per-deg";  
import "core-js/fn/math/radians";  
import "core-js/fn/math/scale";  
import "core-js/fn/math/umulh";  
import "core-js/fn/math/signbit";  
  
// Stage 1 "of and from on collection constructors"  
import "core-js/fn/map/of";  
import "core-js/fn/set/of";  
import "core-js/fn/weak-map/of";  
import "core-js/fn/weak-set/of";  
import "core-js/fn/map/from";  
import "core-js/fn/set/from";  
import "core-js/fn/weak-map/from";  
import "core-js/fn/weak-set/from";  
  
// Stage 0  
import "core-js/fn/string/at";  
  
// Nonstandard  
import "core-js/fn/object/define-getter";  
import "core-js/fn/object/define-setter";  
import "core-js/fn/object/lookup-getter";  
import "core-js/fn/object/lookup-setter";  
// import "core-js/fn/map/to-json"; // Not available standalone  
// import "core-js/fn/set/to-json"; // Not available standalone  
  
import "core-js/fn/system/global";  
import "core-js/fn/error/is-error";  
import "core-js/fn/asap";  
  
// Decorator metadata? Not sure of stage/proposal  
import "core-js/fn/reflect/define-metadata";  
import "core-js/fn/reflect/delete-metadata";  
import "core-js/fn/reflect/get-metadata";  
import "core-js/fn/reflect/get-metadata-keys";  
import "core-js/fn/reflect/get-own-metadata";  
import "core-js/fn/reflect/get-own-metadata-keys";  
import "core-js/fn/reflect/has-metadata";  
import "core-js/fn/reflect/has-own-metadata";  
import "core-js/fn/reflect/metadata";  
```
## [Versioning/Dependencies](_blog_2017_12_27_nearing-the-7.0-release.html.md#peer-dependencies--integrations)[​](_docs_v7-migration.md#versioningdependencies)

Most plugins/top level packages now have a `peerDependency` on `@babel/core`.

## Package Renames[​](_docs_v7-migration.md#package-renames)
*   `babylon` is now `@babel/parser`

You can still use the shorthand version of a package name (remove the `preset-` or `plugin-`) in the config, but I'm choosing to use the whole package name for clarity (maybe we should just remove that, given it doesn't save that much typing anyway).
```
{  
-  "presets": ["@babel/preset-react"],  
+  "presets": ["@babel/react"], // this is equivalent  
-  "plugins": ["@babel/transform-runtime"],  
+  "plugins": ["@babel/plugin-transform-runtime"], // same  
}  
```
### Scoped Packages[​](_docs_v7-migration.md#scoped-packages)

The most important change is finally switching all packages to [scoped packages](_blog_2017_12_27_nearing-the-7.0-release.html.md#renames-scoped-packages-babel-x) (the folder names in the [monorepo](https://github.com/babel/babel/tree/main/packages) are not changed but the name in its `package.json` is).

This means there will be no more issues with accidental/intentional name squatting, a clear separation from community plugins, and a simpler naming convention.

Your dependencies will need to be modified like so:

`babel-cli` -> `@babel/cli`. For us, we basically started by replacing `babel-` with `@babel/`.

#### Use in the config[​](_docs_v7-migration.md#use-in-the-config)

You can still use the shorthand way of specifying a preset or plugin. However because of the switch to scoped packages, you still have to specify the `@babel/` just like if you had your own preset to add to the config.

babel.config.js
```
module.exports = {  
  presets: ["@babel/env"], // "@babel/preset-env"  plugins: ["@babel/transform-arrow-functions"], // same as "@babel/plugin-transform-arrow-functions"};  
```
### [Switch to `-proposal-` for TC39 Proposals](_blog_2017_12_27_nearing-the-7.0-release.html.md#renames-proposal)[​](_docs_v7-migration.md#switch-to--proposal--for-tc39-proposals)

This means any plugin that isn't in a yearly release (ES2015, ES2016, etc) should be renamed to `-proposal`. This is so we can better signify that a proposal isn't officially in JavaScript.

Examples:
*   `@babel/plugin-transform-function-bind` is now `@babel/plugin-proposal-function-bind` (Stage 0)
*   `@babel/plugin-transform-class-properties` is now `@babel/plugin-proposal-class-properties` (Stage 3)

This also means that when a proposal moves to Stage 4, we should rename the package.

### [Remove the year from package names](_blog_2017_12_27_nearing-the-7.0-release.html.md#renames-drop-the-year-from-the-plugin-name)[​](_docs_v7-migration.md#remove-the-year-from-package-names)

Some of the plugins had `-es3-` or `-es2015-` in the names, but these were unnecessary.

`@babel/plugin-transform-es2015-classes` became `@babel/plugin-transform-classes`.

## `"use strict"` and `this` in CommonJS[​](_docs_v7-migration.md#use-strict-and-this-in-commonjs)

Babel 6's transformations for ES6 modules ran indiscriminately on whatever files it was told to process, never taking into account if the file actually had ES6 imports/exports in them. This had the effect of rewriting file-scoped references to `this` to be `undefined` and inserting `"use strict"` at the top of all CommonJS modules that were processed by Babel.

JavaScript
```
// output.js v6  
"use strict"; // assumed strict modules  
undefined; // changed this to undefined  
```
This behavior has been restricted in Babel 7 so that for the `transform-es2015-modules-commonjs` transform, the file is only changed if it has ES6 imports or exports in the file. (Editor's note: This may change again if we land [https://github.com/babel/babel/issues/6242](https://github.com/babel/babel/issues/6242), so we'll want to revisit this before publishing).

JavaScript
```
// output.js v6 and v7  
"use strict";  
require("a");  
```
If you were relying on Babel to inject `"use strict"` into all of your CommonJS modules automatically, you'll want to explicitly use the `transform-strict-mode` plugin in your Babel config.

## Separation of the React and Flow presets[​](_docs_v7-migration.md#separation-of-the-react-and-flow-presets)

`babel-preset-react` has always included the flow plugin. This has caused a lot of issues with users that accidentally use `flow` syntax unintentionally due to a typo, or adding it in without typechecking with `flow` itself, resulting in errors.

This issue was compounded when we decided to support TypeScript. If you wanted to use the React and TypeScript presets, we would have to figure out a way to turn on/off the syntax, automatically, via file type or the directive. In the end, it was easier to separate the presets entirely.

Presets enable Babel to parse types provided by Flow / TypeScript (and other dialects / languages), then strip them out when compiling down to JavaScript.
```
{  
-  "presets": ["@babel/preset-react"]  
+  "presets": ["@babel/preset-react", "@babel/preset-flow"] // parse & remove flow types  
+  "presets": ["@babel/preset-react", "@babel/preset-typescript"] // parse & remove typescript types  
}  
```
## Option parsing[​](_docs_v7-migration.md#option-parsing)

Babel's config options are stricter than in Babel 6. Where a comma-separated list for presets, e.g. `"presets": 'es2015, es2016'` technically worked before, it will now fail and needs to be changed to an array [#5463](https://github.com/babel/babel/pull/5463).

Note this does not apply to the CLI, where `--presets es2015,es2016` will certainly still work.
```
{  
-  "presets": "@babel/preset-env, @babel/preset-react"  
+  "presets": ["@babel/preset-env", "@babel/preset-react"]  
}  
```
## Plugin/Preset Exports[​](_docs_v7-migration.md#pluginpreset-exports)

All plugins/presets should now export a function rather than an object for consistency ([via babel/babel#6494](https://github.com/babel/babel/pull/6494)). This will help us with caching.

## Resolving string-based config values[​](_docs_v7-migration.md#resolving-string-based-config-values)

In Babel 6, values passed to Babel directly (not from a config file), were resolved relative to the files being compiled, which led to lots of confusion.

In Babel 7, values are resolved consistently either relative to the config file that loaded them, or relative to the working directory.

For `presets` and `plugins` values, this change means that the CLI will behave nicely in cases such as

Shell
```
babel --presets @babel/preset-env ../file.js  
```
Assuming your `node_modules` folder is in `.`, in Babel 6 this would fail because the preset could not be found.

This change also affects `only` and `ignore` which will be expanded on next.

## Path-based `only` and `ignore` patterns[​](_docs_v7-migration.md#path-based-only-and-ignore-patterns)

In Babel 6, `only` and `ignore` were treated as a general matching string, rather than a filepath glob. This meant that for instance `*.foo.js` would match `./**/*.foo.js`, which was confusing and surprising to most users.

In Babel 7, these are now treated as path-based glob patterns which can either be relative or absolute paths. This means that if you were using these patterns, you'll probably need to at least add a `**/` prefix to them now to ensure that your patterns match deeply into directories.

`only` and `ignore` patterns _do_ still also work for directories, so you could also use `only: './tests'` to only compile files in your `tests` directory, with no need to use `**/*.js` to match all nested files.

## Babel's CLI commands[​](_docs_v7-migration.md#babels-cli-commands)

The `--copy-files` argument for the `babel` command, which tells Babel to copy all files in a directory that Babel doesn't know how to handle, will also now copy files that failed an `only`/`ignore` check, where before it would silently skip all ignored files.

### `@babel/node`[​](_docs_v7-migration.md#babelnode)

The `babel-node` command in Babel 6 was part of the `babel-cli` package. In Babel 7, this command has been split out into its own `@babel/node` package, so if you are using that command, you'll want to add this new dependency.

### `@babel/runtime`, `@babel/plugin-transform-runtime`[​](_docs_v7-migration.md#babelruntime-babelplugin-transform-runtime)

We have separated out Babel's helpers from its "polyfilling" behavior in runtime. More details in the [PR](https://github.com/babel/babel/pull/8266).

[`@babel/runtime`](_docs_babel-runtime.md) now only contains the helpers, and if you need `core-js` you can use [`@babel/runtime-corejs2`](_docs_babel-runtime-corejs2.md) and the option provided in the transform. For both you still need the [`@babel/plugin-transform-runtime`](_docs_babel-plugin-transform-runtime.md)

#### Only Helpers[​](_docs_v7-migration.md#only-helpers)

Shell
```
# install the runtime as a dependency  
npm install @babel/runtime  
# install the plugin as a devDependency  
npm install @babel/plugin-transform-runtime --save-dev  
```
babel.config.json
```
{  
  "plugins": ["@babel/plugin-transform-runtime"]}  
```
#### Helpers + polyfilling from `core-js`[​](_docs_v7-migration.md#helpers--polyfilling-from-core-js)

So if you need `core-js` support with `transform-runtime`, you would now pass the `corejs` option and use the `@babel/runtime-corejs2` dependency instead of `@babel/runtime`.

Shell
```
# install the runtime as a dependency  
npm install @babel/runtime-corejs2  
# install the plugin as a devDependency  
npm install @babel/plugin-transform-runtime --save-dev  
```
```
{  
  "plugins": [-   ["@babel/plugin-transform-runtime"],  
+   ["@babel/plugin-transform-runtime", {  
+     "corejs": 2,  
+   }],  
  ]}  
```
* * *

## Spec Compliancy[​](_docs_v7-migration.md#spec-compliancy)

### `@babel/plugin-proposal-object-rest-spread`[​](_docs_v7-migration.md#babelplugin-proposal-object-rest-spread)

> A trailing comma cannot come after a RestElement in objects [#290](https://github.com/babel/babylon/pull/290) ![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)
```
var {  
-  ...y, // trailing comma is a SyntaxError  
+  ...y  
} = { a: 1 };  
```
* * *

> Since Object Spread defines new properties and `Object.assign` just sets them, Babel has changed the default behavior to be more spec compliant.
*   [objectSpread helper function](https://github.com/babel/babel/blob/007bfb656502a44f6ab50cd64750cc4b38f9efff/packages/babel-helpers/src/helpers.js#L375)
*   [extends helper function](https://github.com/babel/babel/blob/007bfb656502a44f6ab50cd64750cc4b38f9efff/packages/babel-helpers/src/helpers.js#L357-L373)

JavaScript
```
// v7 default behavior: ["proposal-object-rest-spread"]  
function _objectSpread(target) { ... }  
  
z = _objectSpread({  
  x}, y);  
```
JavaScript
```
// Old v6 behavior: ["proposal-object-rest-spread", { "loose": true }]  
function _extends(target) { ... }  
  
z = _extends({  
  x}, y);  
```
JavaScript
```
// Substitute for Object.assign: ["proposal-object-rest-spread", { "loose": true, "useBuiltIns": true }]  
z = Object.assign(  
  {    x,  },  y);  
```
### `@babel/plugin-proposal-class-properties`[​](_docs_v7-migration.md#babelplugin-proposal-class-properties)

The default behavior is changed to what was previously "spec" by default

JavaScript
```
// input  
class Bork {  
  static a = "foo";  y;}  
```
JavaScript
```
// v7 default behavior: ["@babel/plugin-proposal-class-properties"]  
var Bork = function Bork() {  
  Object.defineProperty(this, "y", {    enumerable: true,    writable: true,    value: void 0,  });};  
  
Object.defineProperty(Bork, "a", {  
  enumerable: true,  writable: true,  value: "foo",});  
```
JavaScript
```
// old v6 behavior: ["@babel/plugin-proposal-class-properties", { "loose": true }]  
var Bork = function Bork() {  
  this.y = void 0;};  
  
Bork.a = "foo";  
```
### Split `@babel/plugin-transform-export-extensions` into the two renamed proposals[​](_docs_v7-migration.md#split-babelplugin-transform-export-extensions-into-the-two-renamed-proposals)

This is a long time coming but this was finally changed.

`@babel/plugin-proposal-export-default-from`

`@babel/plugin-proposal-export-namespace-from`

JavaScript
```
export * as ns from "mod";  
```
### `@babel/plugin-transform-template-literals`[​](_docs_v7-migration.md#babelplugin-transform-template-literals)

> Template Literals Revision updated [#5523](https://github.com/babel/babel/pull/5523) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

See the proposal for [Template Literals Revision](https://tc39.github.io/proposal-template-literal-revision/).

It causes Babel 6 to throw `Bad character escape sequence (5:6)`.

JavaScript
```
tag`\unicode and \u{55}`;  
```
This has been fixed in Babel 7 and generates something like the following:

JavaScript
```
// default  
function _taggedTemplateLiteral(strings, raw) {  
  return Object.freeze(    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })  );}  
var _templateObject = /*#__PURE__*/ _taggedTemplateLiteral(  
  [void 0],  ["\\unicode and \\u{55}"]);  
tag(_templateObject);  
```
JavaScript
```
// loose mode  
function _taggedTemplateLiteralLoose(strings, raw) {  
  strings.raw = raw;  return strings;}  
var _templateObject = /*#__PURE__*/ _taggedTemplateLiteralLoose(  
  [void 0],  ["\\unicode and \\u{55}"]);  
tag(_templateObject);  
```
* * *

> Default to previous "spec" mode for regular template literals

JavaScript
```
// default v7 behavior: ["@babel/plugin-transform-template-literals"]  
"foo".concat(bar);  
```
JavaScript
```
// old v6 behavior: ["@babel/plugin-transform-template-literals", { "loose": true }]  
"foo" + bar;  
```
### `@babel/plugin-proposal-decorators`[​](_docs_v7-migration.md#babelplugin-proposal-decorators)

In anticipation of the new decorators proposal implementation, we've decided to make it the new default behavior. This means that to continue using the current decorators syntax/behavior, you must set the `legacy` option as `true`.
```
 {   "plugins": [-    "@babel/plugin-proposal-decorators"  
+    ["@babel/plugin-proposal-decorators", { "legacy": true }]  
   ] }
```
> NOTE: If you are using `@babel/preset-stage-0` or `@babel/preset-stage-1`, which include this plugin, you must pass them the `decoratorsLegacy` option.

### `@babel/plugin-proposal-pipeline-operator`[​](_docs_v7-migration.md#babelplugin-proposal-pipeline-operator)

Newer proposals in flux will error by default and will require everyone to opt into a specific proposal while things are still < Stage 2. This is explained more in this [post](_blog_2018_07_19_whats-happening-with-the-pipeline-proposal.md).
```
{  
  "plugins": [-   "@babel/plugin-proposal-pipeline-operator"  
+   ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]  
  ]}  
```
### Removed `babel-plugin-transform-class-constructor-call`[​](_docs_v7-migration.md#removed-babel-plugin-transform-class-constructor-call)

> babel-plugin-transform-class-constructor-call has been removed [#5119](https://github.com/babel/babel/pull/5119) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

TC39 decided to drop this proposal. You can move your logic into the constructor or into a static method.

See [/docs/plugins/transform-class-constructor-call/](https://old.babeljs.io/docs/plugins/transform-class-constructor-call/) for more information.
```
  class Point {    constructor(x, y) {      this.x = x;      this.y = y;    }  
-  call constructor(x, y) {  
+  static secondConstructor(x, y) {  
      return new Point(x, y);    }  }  
  let p1 = new Point(1, 2);- let p2 = Point(3, 4);  
+ let p2 = Point.secondConstructor(3, 4);
```
### `@babel/plugin-async-to-generator`[​](_docs_v7-migration.md#babelplugin-async-to-generator)

We merged `babel-plugin-transform-async-to-module-method` into the regular async plugin by just making it an option.
```
{  
  "plugins": [-    ["@babel/transform-async-to-module-method"]  
+    ["@babel/transform-async-to-generator", {  
+      "module": "bluebird",  
+      "method": "coroutine"  
+    }]  
  ]}  
```
## `babel`[​](_docs_v7-migration.md#babel)

> Dropping the `babel` package [#5293](https://github.com/babel/babel/pull/5293) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

This package currently gives you an error message to install `babel-cli` instead in v6. I think we can do something interesting with this name though.

## `@babel/register`[​](_docs_v7-migration.md#babelregister)

> `babel-core/register.js` has been removed [#5132](https://github.com/babel/babel/pull/5132) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

The deprecated usage of `babel-core/register` has been removed in Babel 7; instead use the standalone package `@babel/register`.

Install `@babel/register` as a new dependency:
*   npm
*   Yarn
*   pnpm
```
npm install --save-dev @babel/register  
```
Upgrading with Mocha:
```
- mocha --require babel-core/register  
+ mocha --require @babel/register  
```
`@babel/register` will also now only compile files in the current working directly (was done to fix issues with symlinking).

`@babel/register` options are now replaced instead of merged

## `@babel/generator`[​](_docs_v7-migration.md#babelgenerator)

> Dropping the `quotes` option [#5154](https://github.com/babel/babel/pull/5154)\] ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

If you want formatting for compiled output you can use recast/prettier/escodegen/fork babel-generator.

This option was only available through `babel-generator` explicitly until v6.18.0 when we exposed `parserOpts` and `generatorOpts`. Because there was a bug in that release, no one should've used this option in Babel itself.

> Dropping the `flowUsesCommas` option [#5123](https://github.com/babel/babel/pull/5123) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

Currently there are 2 supported syntaxes (`,` and `;`) in Flow Object Types.

This change just makes babel-generator output `,` instead of `;`.

## `@babel/core`[​](_docs_v7-migration.md#babelcore)

> Remove `babel-core/src/api/browser.js` [#5124](https://github.com/babel/babel/pull/5124) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

`babel-browser` was already removed in 6.0. If you need to use Babel in the browser or a non-Node environment, use [@babel/standalone](_docs_babel-standalone.md).

Babel will return `filename` as an absolute path [#8044](https://github.com/babel/babel/pull/8044)

## `@babel/preset-env`[​](_docs_v7-migration.md#babelpreset-env)

`loose` mode will now automatically exclude the `typeof-symbol` transform (a lot of projects using loose mode were doing this).

