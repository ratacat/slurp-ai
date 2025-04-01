---
url: https://babeljs.io/docs/config-files
scrapeDate: 2025-03-31T20:55:10.385Z
library: docs

exactVersionMatch: false
---

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