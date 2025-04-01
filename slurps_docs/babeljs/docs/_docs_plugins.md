---
url: https://babeljs.io/docs/plugins
scrapeDate: 2025-03-31T20:55:09.658Z
library: docs

exactVersionMatch: false
---

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