---
url: https://babeljs.io/docs/assumptions
scrapeDate: 2025-03-31T20:55:10.071Z
library: docs

exactVersionMatch: false
---

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