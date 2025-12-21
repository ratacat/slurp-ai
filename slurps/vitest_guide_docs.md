# Compiled Documentation

Generated on 2025-04-15T07:07:32.563Z

### guide

#### \_guide.md

> Source: https://vitest.dev/guide
> Scraped: 4/15/2025, 1:07:29 AM

## Getting Started [​](index.md#getting-started)

## Overview [​](index.md#overview)

Vitest (pronounced as _"veetest"_) is a next generation testing framework powered by Vite.

You can learn more about the rationale behind the project in the [Why Vitest](_guide_why.md) section.

## Trying Vitest Online [​](index.md#trying-vitest-online)

You can try Vitest online on [StackBlitz](https://vitest.new/). It runs Vitest directly in the browser, and it is almost identical to the local setup but doesn't require installing anything on your machine.

## Adding Vitest to Your Project [​](index.md#adding-vitest-to-your-project)

[Learn how to install by Video](https://vueschool.io/lessons/how-to-install-vitest?friend=vueuse)

npmyarnpnpmbun

bash

```
npm install -D vitest
```

TIP

Vitest requires Vite >=v5.0.0 and Node >=v18.0.0

It is recommended that you install a copy of `vitest` in your `package.json`, using one of the methods listed above. However, if you would prefer to run `vitest` directly, you can use `npx vitest` (the `npx` tool comes with npm and Node.js).

The `npx` tool will execute the specified command. By default, `npx` will first check if the command exists in the local project's binaries. If it is not found there, `npx` will look in the system's `$PATH` and execute it if found. If the command is not found in either location, `npx` will install it in a temporary location prior to execution.

## Writing Tests [​](index.md#writing-tests)

As an example, we will write a simple test that verifies the output of a function that adds two numbers.

sum.js

js

```
export function sum(a, b) {
  return a + b
}
```

sum.test.js

js

```
import { expect, test } from 'vitest'
import { sum } from './sum.js'
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

TIP

By default, tests must contain `.test.` or `.spec.` in their file name.

## Configuring Vitest [​](index.md#configuring-vitest)

One of the main advantages of Vitest is its unified configuration with Vite. If present, `vitest` will read your root `vite.config.ts` to match with the plugins and setup as your Vite app. For example, your Vite [resolve.alias](https://vitejs.dev/config/shared-options.html#resolve-alias) and [plugins](https://vitejs.dev/guide/using-plugins) configuration will work out-of-the-box. If you want a different configuration during testing, you can:

- Create `vitest.config.ts`, which will have the higher priority
- Pass `--config` option to CLI, e.g. `vitest --config ./path/to/vitest.config.ts`
- Use `process.env.VITEST` or `mode` property on `defineConfig` (will be set to `test` if not overridden) to conditionally apply different configuration in `vite.config.ts`

Vitest supports the same extensions for your configuration file as Vite does: `.js`, `.mjs`, `.cjs`, `.ts`, `.cts`, `.mts`. Vitest does not support `.json` extension.

If you are not using Vite as your build tool, you can configure Vitest using the `test` property in your config file:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    // ...
  },
})
```

TIP

Even if you do not use Vite yourself, Vitest relies heavily on it for its transformation pipeline. For that reason, you can also configure any property described in [Vite documentation](https://vitejs.dev/config/).

If you are already using Vite, add `test` property in your Vite config. You'll also need to add a reference to Vitest types using a [triple slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-) at the top of your config file.

vite.config.ts

ts

```
/// <reference types="vitest" />
import { defineConfig } from 'vite'
export default defineConfig({
  test: {
    // ...
  },
})
```

The `<reference types="vitest" />` will stop working in the next major update, but you can start migrating to `vitest/config` in Vitest 2.1:

vite.config.ts

ts

```
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
export default defineConfig({
  test: {
    // ... Specify options here.
  },
})
```

See the list of config options in the [Config Reference](_config_.md)

WARNING

If you decide to have two separate config files for Vite and Vitest, make sure to define the same Vite options in your Vitest config file since it will override your Vite file, not extend it. You can also use `mergeConfig` method from `vite` or `vitest/config` entries to merge Vite config with Vitest config:

vitest.config.mjsvite.config.mjs

ts

```
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'
export default mergeConfig(viteConfig, defineConfig({
  test: {
    // ...
  },
}))
```

ts

```
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [Vue()],
})
```

However, we recommend using the same file for both Vite and Vitest, instead of creating two separate files.

## Workspaces Support [​](index.md#workspaces-support)

Run different project configurations inside the same project with [Vitest Workspaces](_guide_workspace.md). You can define a list of files and folders that define your workspace in `vitest.workspace` file. The file supports `js`/`ts`/`json` extensions. This feature works great with monorepo setups.

vitest.workspace.ts

ts

```
import { defineWorkspace } from 'vitest/config'
export default defineWorkspace([
  // you can use a list of glob patterns to define your workspaces
  // Vitest expects a list of config files
  // or directories where there is a config file
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  // you can even run the same tests,
  // but with different configs in the same "vitest" process
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    },
  },
])
```

## Command Line Interface [​](index.md#command-line-interface)

In a project where Vitest is installed, you can use the `vitest` binary in your npm scripts, or run it directly with `npx vitest`. Here are the default npm scripts in a scaffolded Vitest project:

package.json

json

```
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

To run tests once without watching for file changes, use `vitest run`. You can specify additional CLI options like `--port` or `--https`. For a full list of CLI options, run `npx vitest --help` in your project.

Learn more about the [Command Line Interface](_guide_cli.md)

## Automatic Dependency Installation [​](index.md#automatic-dependency-installation)

Vitest will prompt you to install certain dependencies if they are not already installed. You can disable this behavior by setting the `VITEST_SKIP_INSTALL_CHECKS=1` environment variable.

## IDE Integrations [​](index.md#ide-integrations)

We also provided an official extension for Visual Studio Code to enhance your testing experience with Vitest.

[Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)

Learn more about [IDE Integrations](_guide_ide.md)

## Examples [​](index.md#examples)

Example

Source

Playground

`basic`

[GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/basic)

[Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/basic?initialPath=__vitest__/)

`fastify`

[GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/fastify)

[Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/fastify?initialPath=__vitest__/)

`in-source-test`

[GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/in-source-test)

[Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/in-source-test?initialPath=__vitest__/)

`lit`

[GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/lit)

[Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/lit?initialPath=__vitest__/)

`vue`

[GitHub](https://github.com/vitest-tests/browser-examples/tree/main/examples/vue)

[Play Online](https://stackblitz.com/fork/github/vitest-tests/browser-examples/tree/main/examples/vue?initialPath=__vitest__/)

`marko`

[GitHub](https://github.com/marko-js/examples/tree/master/examples/library-ts)

[Play Online](https://stackblitz.com/fork/github/marko-js/examples/tree/master/examples/library-ts/)

`preact`

[GitHub](https://github.com/vitest-tests/browser-examples/tree/main/examples/preact)

[Play Online](https://stackblitz.com/fork/github/vitest-tests/browser-examples/tree/main/examples/preact?initialPath=__vitest__/)

`react`

[GitHub](https://github.com/vitest-tests/browser-examples/tree/main/examples/react)

[Play Online](https://stackblitz.com/fork/github/vitest-tests/browser-examples/tree/main/examples/react?initialPath=__vitest__/)

`solid`

[GitHub](https://github.com/vitest-tests/browser-examples/tree/main/examples/solid)

[Play Online](https://stackblitz.com/fork/github/vitest-tests/browser-examples/tree/main/examples/solid?initialPath=__vitest__/)

`svelte`

[GitHub](https://github.com/vitest-tests/browser-examples/tree/main/examples/svelte)

[Play Online](https://stackblitz.com/fork/github/vitest-tests/browser-examples/tree/main/examples/svelte?initialPath=__vitest__/)

`sveltekit`

[GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/sveltekit)

[Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/sveltekit?initialPath=__vitest__/)

`profiling`

[GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/profiling)

Not Available

`typecheck`

[GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/typecheck)

[Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/typecheck?initialPath=__vitest__/)

`workspace`

[GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/workspace)

[Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/workspace?initialPath=__vitest__/)

## Projects using Vitest [​](index.md#projects-using-vitest)

- [unocss](https://github.com/unocss/unocss)
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- [vue](https://github.com/vuejs/core)
- [vite](https://github.com/vitejs/vite)
- [vitesse](https://github.com/antfu/vitesse)
- [vitesse-lite](https://github.com/antfu/vitesse-lite)
- [fluent-vue](https://github.com/demivan/fluent-vue)
- [vueuse](https://github.com/vueuse/vueuse)
- [milkdown](https://github.com/Saul-Mirone/milkdown)
- [gridjs-svelte](https://github.com/iamyuu/gridjs-svelte)
- [spring-easing](https://github.com/okikio/spring-easing)
- [bytemd](https://github.com/bytedance/bytemd)
- [faker](https://github.com/faker-js/faker)
- [million](https://github.com/aidenybai/million)
- [Vitamin](https://github.com/wtchnm/Vitamin)
- [neodrag](https://github.com/PuruVJ/neodrag)
- [svelte-multiselect](https://github.com/janosh/svelte-multiselect)
- [iconify](https://github.com/iconify/iconify)
- [tdesign-vue-next](https://github.com/Tencent/tdesign-vue-next)
- [cz-git](https://github.com/Zhengqbbb/cz-git)

## Using Unreleased Commits [​](index.md#using-unreleased-commits)

Each commit on main branch and a PR with a `cr-tracked` label are published to [pkg.pr.new](https://github.com/stackblitz-labs/pkg.pr.new). You can install it by `npm i https://pkg.pr.new/vitest@{commit}`.

If you want to test your own modification locally, you can build and link it yourself ([pnpm](https://pnpm.io/) is required):

bash

```
git clone https://github.com/vitest-dev/vitest.git
cd vitest
pnpm install
cd packages/vitest
pnpm run build
pnpm link --global # you can use your preferred package manager for this step
```

Then go to the project where you are using Vitest and run `pnpm link --global vitest` (or the package manager that you used to link `vitest` globally).

## Community [​](index.md#community)

If you have questions or need help, reach out to the community at [Discord](https://chat.vitest.dev/) and [GitHub Discussions](https://github.com/vitest-dev/vitest/discussions).

#### \_guide_browser.html.md

> Source: https://vitest.dev/guide/browser.html
> Scraped: 4/15/2025, 1:07:28 AM

## Browser Mode Experimental [​](index.md#browser-mode)

This page provides information about the experimental browser mode feature in the Vitest API, which allows you to run your tests in the browser natively, providing access to browser globals like window and document. This feature is currently under development, and APIs may change in the future.

TIP

If you are looking for documentation for `expect`, `vi` or any general API like workspaces or type testing, refer to the ["Getting Started" guide](_guide_.md).

![Vitest UI](https://vitest.dev/ui-browser-1-light.png)![Vitest UI](https://vitest.dev/ui-browser-1-dark.png)

## Installation [​](index.md#installation)

For easier setup, you can use `vitest init browser` command to install required dependencies and create browser configuration.

npmyarnpnpmbun

bash

```
npx vitest init browser
```

bash

```
yarn exec vitest init browser
```

bash

```
pnpx vitest init browser
```

bash

```
bunx vitest init browser
```

### Manual Installation [​](index.md#manual-installation)

You can also install packages manually. By default, Browser Mode doesn't require any additional E2E provider to run tests locally because it reuses your existing browser.

npmyarnpnpmbun

bash

```
npm install -D vitest @vitest/browser
```

bash

```
yarn add -D vitest @vitest/browser
```

bash

```
pnpm add -D vitest @vitest/browser
```

bash

```
bun add -D vitest @vitest/browser
```

WARNING

However, to run tests in CI you need to install either [`playwright`](https://npmjs.com/package/playwright) or [`webdriverio`](https://www.npmjs.com/package/webdriverio). We also recommend switching to either one of them for testing locally instead of using the default `preview` provider since it relies on simulating events instead of using Chrome DevTools Protocol.

If you don't already use one of these tools, we recommend starting with Playwright because it supports parallel execution, which makes your tests run faster. Additionally, Playwright uses [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) which is generally faster than WebDriver.

[Playwright](https://npmjs.com/package/playwright) is a framework for Web Testing and Automation.

npmyarnpnpmbun

bash

```
npm install -D vitest @vitest/browser playwright
```

bash

```
yarn add -D vitest @vitest/browser playwright
```

bash

```
pnpm add -D vitest @vitest/browser playwright
```

bash

```
bun add -D vitest @vitest/browser playwright
```

## Configuration [​](index.md#configuration)

To activate browser mode in your Vitest configuration, you can use the `--browser=name` flag or set the `browser.enabled` field to `true` in your Vitest configuration file. Here is an example configuration using the browser field:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    browser: {
      provider: 'playwright', // or 'webdriverio'
      enabled: true,
      // at least one instance is required
      instances: [
        { browser: 'chromium' },
      ],
    },
  }
})
```

INFO

Vitest assigns port `63315` to avoid conflicts with the development server, allowing you to run both in parallel. You can change that with the [`browser.api`](_config_.md#browser-api) option.

Since Vitest 2.1.5, the CLI no longer prints the Vite URL automatically. You can press "b" to print the URL when running in watch mode.

If you have not used Vite before, make sure you have your framework's plugin installed and specified in the config. Some frameworks might require extra configuration to work - check their Vite related documentation to be sure.

reactvuesveltesolidmarko

ts

```
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        { browser: 'chromium' },
      ],
    }
  }
})
```

ts

```
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        { browser: 'chromium' },
      ],
    }
  }
})
```

ts

```
import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
export default defineConfig({
  plugins: [svelte()],
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        { browser: 'chromium' },
      ],
    }
  }
})
```

ts

```
import { defineConfig } from 'vitest/config'
import solidPlugin from 'vite-plugin-solid'
export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        { browser: 'chromium' },
      ],
    }
  }
})
```

ts

```
import { defineConfig } from 'vitest/config'
import marko from '@marko/vite'
export default defineConfig({
  plugins: [marko()],
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        { browser: 'chromium' },
      ],
    }
  }
})
```

If you need to run some tests using Node-based runner, you can define a [workspace](_guide_workspace.md) file with separate configurations for different testing strategies:

vitest.workspace.ts

ts

```
import { defineWorkspace } from 'vitest/config'
export default defineWorkspace([
  {
    test: {
      // an example of file based convention,
      // you don't have to follow it
      include: [
        'tests/unit/**/*.{test,spec}.ts',
        'tests/**/*.unit.{test,spec}.ts',
      ],
      name: 'unit',
      environment: 'node',
    },
  },
  {
    test: {
      // an example of file based convention,
      // you don't have to follow it
      include: [
        'tests/browser/**/*.{test,spec}.ts',
        'tests/**/*.browser.{test,spec}.ts',
      ],
      name: 'browser',
      browser: {
        enabled: true,
        instances: [
          { browser: 'chromium' },
        ],
      },
    },
  },
])
```

## Browser Option Types [​](index.md#browser-option-types)

The browser option in Vitest depends on the provider. Vitest will fail, if you pass `--browser` and don't specify its name in the config file. Available options:

- `webdriverio` supports these browsers:
  - `firefox`
  - `chrome`
  - `edge`
  - `safari`
- `playwright` supports these browsers:
  - `firefox`
  - `webkit`
  - `chromium`

## TypeScript [​](index.md#typescript)

By default, TypeScript doesn't recognize providers options and extra `expect` properties. If you don't use any providers, make sure the `@vitest/browser/matchers` is referenced somewhere in your tests, [setup file](_config_.md#setupfiles) or a [config file](_config_.md) to pick up the extra `expect` definitions. If you are using custom providers, make sure to add `@vitest/browser/providers/playwright` or `@vitest/browser/providers/webdriverio` to the same file so TypeScript can pick up definitions for custom options:

defaultplaywrightwebdriverio

ts

```
/// <reference types="@vitest/browser/matchers" />
```

ts

```
/// <reference types="@vitest/browser/providers/playwright" />
```

ts

```
/// <reference types="@vitest/browser/providers/webdriverio" />
```

Alternatively, you can also add them to `compilerOptions.types` field in your `tsconfig.json` file. Note that specifying anything in this field will disable [auto loading](https://www.typescriptlang.org/tsconfig/#types) of `@types/*` packages.

defaultplaywrightwebdriverio

json

```
{
  "compilerOptions": {
    "types": ["@vitest/browser/matchers"]
  }
}
```

json

```
{
  "compilerOptions": {
    "types": ["@vitest/browser/providers/playwright"]
  }
}
```

json

```
{
  "compilerOptions": {
    "types": ["@vitest/browser/providers/webdriverio"]
  }
}
```

## Browser Compatibility [​](index.md#browser-compatibility)

Vitest uses [Vite dev server](https://vitejs.dev/guide/#browser-support) to run your tests, so we only support features specified in the [`esbuild.target`](https://vitejs.dev/config/shared-options.html#esbuild) option (`esnext` by default).

By default, Vite targets browsers which support the native [ES Modules](https://caniuse.com/es6-module), native [ESM dynamic import](https://caniuse.com/es6-module-dynamic-import), and [`import.meta`](https://caniuse.com/mdn-javascript_operators_import_meta). On top of that, we utilize [`BroadcastChannel`](https://caniuse.com/?search=BroadcastChannel) to communicate between iframes:

- Chrome >=87
- Firefox >=78
- Safari >=15.4
- Edge >=88

## Running Tests [​](index.md#running-tests)

When you specify a browser name in the browser option, Vitest will try to run the specified browser using `preview` by default, and then run the tests there. If you don't want to use `preview`, you can configure the custom browser provider by using `browser.provider` option.

To specify a browser using the CLI, use the `--browser` flag followed by the browser name, like this:

sh

```
npx vitest --browser=chrome
```

Or you can provide browser options to CLI with dot notation:

sh

```
npx vitest --browser.headless
```

By default, Vitest will automatically open the browser UI for development. Your tests will run inside an iframe in the center. You can configure the viewport by selecting the preferred dimensions, calling `page.viewport` inside the test, or setting default values in [the config](_config_.md#browser-viewport).

## Headless [​](index.md#headless)

Headless mode is another option available in the browser mode. In headless mode, the browser runs in the background without a user interface, which makes it useful for running automated tests. The headless option in Vitest can be set to a boolean value to enable or disable headless mode.

When using headless mode, Vitest won't open the UI automatically. If you want to continue using the UI but have tests run headlessly, you can install the [`@vitest/ui`](_guide_ui.md) package and pass the `--ui` flag when running Vitest.

Here's an example configuration enabling headless mode:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    browser: {
      provider: 'playwright',
      enabled: true,
      headless: true,
    },
  }
})
```

You can also set headless mode using the `--browser.headless` flag in the CLI, like this:

sh

```
npx vitest --browser.headless
```

In this case, Vitest will run in headless mode using the Chrome browser.

WARNING

Headless mode is not available by default. You need to use either [`playwright`](https://npmjs.com/package/playwright) or [`webdriverio`](https://www.npmjs.com/package/webdriverio) providers to enable this feature.

## Examples [​](index.md#examples)

By default, you don't need any external packages to work with the Browser Mode:

example.test.js

js

```
import { expect, test } from 'vitest'
import { page } from '@vitest/browser/context'
import { render } from './my-render-function.js'
test('properly handles form inputs', async () => {
  render() // mount DOM elements
  // Asserts initial state.
  await expect.element(page.getByText('Hi, my name is Alice')).toBeInTheDocument()
  // Get the input DOM node by querying the associated label.
  const usernameInput = page.getByLabelText(/username/i)
  // Type the name into the input. This already validates that the input
  // is filled correctly, no need to check the value manually.
  await usernameInput.fill('Bob')
  await expect.element(page.getByText('Hi, my name is Bob')).toBeInTheDocument()
})
```

However, Vitest also provides packages to render components for several popular frameworks out of the box:

- [`vitest-browser-vue`](https://github.com/vitest-dev/vitest-browser-vue) to render [vue](https://vuejs.org/) components
- [`vitest-browser-svelte`](https://github.com/vitest-dev/vitest-browser-svelte) to render [svelte](https://svelte.dev/) components
- [`vitest-browser-react`](https://github.com/vitest-dev/vitest-browser-react) to render [react](https://react.dev/) components

Community packages are available for other frameworks:

- [`vitest-browser-lit`](https://github.com/EskiMojo14/vitest-browser-lit) to render [lit](https://lit.dev/) components

If your framework is not represented, feel free to create your own package - it is a simple wrapper around the framework renderer and `page.elementLocator` API. We will add a link to it on this page. Make sure it has a name starting with `vitest-browser-`.

Besides rendering components and locating elements, you will also need to make assertions. Vitest forks the [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom) library to provide a wide range of DOM assertions out of the box. Read more at the [Assertions API](_guide_browser_assertion-api.md).

ts

```
import { expect } from 'vitest'
import { page } from '@vitest/browser/context'
// element is rendered correctly
await expect.element(page.getByText('Hello World')).toBeInTheDocument()
```

Vitest exposes a [Context API](_guide_browser_context.md) with a small set of utilities that might be useful to you in tests. For example, if you need to make an interaction, like clicking an element or typing text into an input, you can use `userEvent` from `@vitest/browser/context`. Read more at the [Interactivity API](_guide_browser_interactivity-api.md).

ts

```
import { page, userEvent } from '@vitest/browser/context'
await userEvent.fill(page.getByLabelText(/username/i), 'Alice')
// or just locator.fill
await page.getByLabelText(/username/i).fill('Alice')
```

vuesveltereactlit

ts

```
import { render } from 'vitest-browser-vue'
import Component from './Component.vue'
test('properly handles v-model', async () => {
  const screen = render(Component)
  // Asserts initial state.
  await expect.element(screen.getByText('Hi, my name is Alice')).toBeInTheDocument()
  // Get the input DOM node by querying the associated label.
  const usernameInput = screen.getByLabelText(/username/i)
  // Type the name into the input. This already validates that the input
  // is filled correctly, no need to check the value manually.
  await usernameInput.fill('Bob')
  await expect.element(screen.getByText('Hi, my name is Bob')).toBeInTheDocument()
})
```

ts

```
import { render } from 'vitest-browser-svelte'
import { expect, test } from 'vitest'
import Greeter from './greeter.svelte'
test('greeting appears on click', async () => {
  const screen = render(Greeter, { name: 'World' })
  const button = screen.getByRole('button')
  await button.click()
  const greeting = screen.getByText(/hello world/iu)
  await expect.element(greeting).toBeInTheDocument()
})
```

tsx

```
import { render } from 'vitest-browser-react'
import Fetch from './fetch'
test('loads and displays greeting', async () => {
  // Render a React element into the DOM
  const screen = render(<Fetch url="/greeting" />)
  await screen.getByText('Load Greeting').click()
  // wait before throwing an error if it cannot find an element
  const heading = screen.getByRole('heading')
  // assert that the alert message is correct
  await expect.element(heading).toHaveTextContent('hello there')
  await expect.element(screen.getByRole('button')).toBeDisabled()
})
```

ts

```
import { render } from 'vitest-browser-lit'
import { html } from 'lit'
import './greeter-button'
test('greeting appears on click', async () => {
  const screen = render(html`<greeter-button name="World"></greeter-button>`)
  const button = screen.getByRole('button')
  await button.click()
  const greeting = screen.getByText(/hello world/iu)
  await expect.element(greeting).toBeInTheDocument()
})
```

Vitest doesn't support all frameworks out of the box, but you can use external tools to run tests with these frameworks. We also encourage the community to create their own `vitest-browser` wrappers - if you have one, feel free to add it to the examples above.

For unsupported frameworks, we recommend using `testing-library` packages:

- [`@testing-library/preact`](https://testing-library.com/docs/preact-testing-library/intro) to render [preact](https://preactjs.com/) components
- [`@solidjs/testing-library`](https://testing-library.com/docs/solid-testing-library/intro) to render [solid](https://www.solidjs.com/) components
- [`@marko/testing-library`](https://testing-library.com/docs/marko-testing-library/intro) to render [marko](https://markojs.com/) components

You can also see more examples in [`browser-examples`](https://github.com/vitest-tests/browser-examples) repository.

WARNING

`testing-library` provides a package `@testing-library/user-event`. We do not recommend using it directly because it simulates events instead of actually triggering them - instead, use [`userEvent`](_guide_browser_interactivity-api.md) imported from `@vitest/browser/context` that uses Chrome DevTools Protocol or Webdriver (depending on the provider) under the hood.

preactsolidmarko

tsx

```
// based on @testing-library/preact example
// https://testing-library.com/docs/preact-testing-library/example
import { h } from 'preact'
import { page } from '@vitest/browser/context'
import { render } from '@testing-library/preact'
import HiddenMessage from '../hidden-message'
test('shows the children when the checkbox is checked', async () => {
  const testMessage = 'Test Message'
  const { baseElement } = render(
    <HiddenMessage>{testMessage}</HiddenMessage>,
  )
  const screen = page.elementLocator(baseElement)
  // .query() will return the element or null if it cannot be found.
  // .element() will return the element or throw an error if it cannot be found.
  expect(screen.getByText(testMessage).query()).not.toBeInTheDocument()
  // The queries can accept a regex to make your selectors more
  // resilient to content tweaks and changes.
  await screen.getByLabelText(/show/i).click()
  await expect.element(screen.getByText(testMessage)).toBeInTheDocument()
})
```

tsx

```
// baed on @testing-library/solid API
// https://testing-library.com/docs/solid-testing-library/api
import { render } from '@testing-library/solid'
it('uses params', async () => {
  const App = () => (
    <>
      <Route
        path="/ids/:id"
        component={() => (
          <p>
            Id:
            {useParams()?.id}
          </p>
        )}
      />
      <Route path="/" component={() => <p>Start</p>} />
    </>
  )
  const { baseElement } = render(() => <App />, { location: 'ids/1234' })
  const screen = page.elementLocator(baseElement)
  await expect.screen(screen.getByText('Id: 1234')).toBeInTheDocument()
})
```

ts

```
// baed on @testing-library/marko API
// https://testing-library.com/docs/marko-testing-library/api
import { render, screen } from '@marko/testing-library'
import Greeting from './greeting.marko'
test('renders a message', async () => {
  const { baseElement } = await render(Greeting, { name: 'Marko' })
  const screen = page.elementLocator(baseElement)
  await expect.element(screen.getByText(/Marko/)).toBeInTheDocument()
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h1>Hello, Marko!</h1>
  `)
})
```

## Limitations [​](index.md#limitations)

### Thread Blocking Dialogs [​](index.md#thread-blocking-dialogs)

When using Vitest Browser, it's important to note that thread blocking dialogs like `alert` or `confirm` cannot be used natively. This is because they block the web page, which means Vitest cannot continue communicating with the page, causing the execution to hang.

In such situations, Vitest provides default mocks with default returned values for these APIs. This ensures that if the user accidentally uses synchronous popup web APIs, the execution would not hang. However, it's still recommended for the user to mock these web APIs for better experience. Read more in [Mocking](_guide_mocking.md).

#### \_guide_browser_assertion-api.md

> Source: https://vitest.dev/guide/browser/assertion-api
> Scraped: 4/15/2025, 1:07:31 AM

## Assertion API [​](index.md#assertion-api)

Vitest provides a wide range of DOM assertions out of the box forked from [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom) library with the added support for locators and built-in retry-ability.

TypeScript Support

If you are using [TypeScript](_guide_browser_.md#typescript) or want to have correct type hints in `expect`, make sure you have `@vitest/browser/context` referenced somewhere. If you never imported from there, you can add a `reference` comment in any file that's covered by your `tsconfig.json`:

ts

```
/// <reference types="@vitest/browser/context" />
```

Tests in the browser might fail inconsistently due to their asynchronous nature. Because of this, it is important to have a way to guarantee that assertions succeed even if the condition is delayed (by a timeout, network request, or animation, for example). For this purpose, Vitest provides retriable assertions out of the box via the [`expect.poll`](_api_expect.md#poll) and `expect.element` APIs:

ts

```
import { expect, test } from 'vitest'
import { page } from '@vitest/browser/context'
test('error banner is rendered', async () => {
  triggerError()
  // This creates a locator that will try to find the element
  // when any of its methods are called.
  // This call by itself doesn't check the existence of the element.
  const banner = page.getByRole('alert', {
    name: /error/i,
  })
  // Vitest provides `expect.element` with built-in retry-ability
  // It will repeatedly check that the element exists in the DOM and that
  // the content of `element.textContent` is equal to "Error!"
  // until all the conditions are met
  await expect.element(banner).toHaveTextContent('Error!')
})
```

We recommend to always use `expect.element` when working with `page.getBy*` locators to reduce test flakiness. Note that `expect.element` accepts a second option:

ts

```
interface ExpectPollOptions {
  // The interval to retry the assertion for in milliseconds
  // Defaults to "expect.poll.interval" config option
  interval?: number
  // Time to retry the assertion for in milliseconds
  // Defaults to "expect.poll.timeout" config option
  timeout?: number
  // The message printed when the assertion fails
  message?: string
}
```

TIP

`expect.element` is a shorthand for `expect.poll(() => element)` and works in exactly the same way.

`toHaveTextContent` and all other assertions are still available on a regular `expect` without a built-in retry-ability mechanism:

ts

```
// will fail immediately if .textContent is not `'Error!'`
expect(banner).toHaveTextContent('Error!')
```

## toBeDisabled [​](index.md#tobedisabled)

ts

```
function toBeDisabled(): Promise<void>
```

Allows you to check whether an element is disabled from the user's perspective.

Matches if the element is a form control and the `disabled` attribute is specified on this element or the element is a descendant of a form element with a `disabled` attribute.

Note that only native control elements such as HTML `button`, `input`, `select`, `textarea`, `option`, `optgroup` can be disabled by setting "disabled" attribute. "disabled" attribute on other elements is ignored, unless it's a custom element.

html

```
<button
  data-testid="button"
  type="submit"
  disabled
>
  submit
</button>
```

ts

```
await expect.element(getByTestId('button')).toBeDisabled() // ✅
await expect.element(getByTestId('button')).not.toBeDisabled() // ❌
```

## toBeEnabled [​](index.md#tobeenabled)

ts

```
function toBeEnabled(): Promise<void>
```

Allows you to check whether an element is not disabled from the user's perspective.

Works like [`not.toBeDisabled()`](index.md#tobedisabled). Use this matcher to avoid double negation in your tests.

html

```
<button
  data-testid="button"
  type="submit"
  disabled
>
  submit
</button>
```

ts

```
await expect.element(getByTestId('button')).toBeEnabled() // ✅
await expect.element(getByTestId('button')).not.toBeEnabled() // ❌
```

## toBeEmptyDOMElement [​](index.md#tobeemptydomelement)

ts

```
function toBeEmptyDOMElement(): Promise<void>
```

This allows you to assert whether an element has no visible content for the user. It ignores comments but will fail if the element contains white-space.

html

```
<span data-testid="not-empty"><span data-testid="empty"></span></span>
<span data-testid="with-whitespace"> </span>
<span data-testid="with-comment"><!-- comment --></span>
```

ts

```
await expect.element(getByTestId('empty')).toBeEmptyDOMElement()
await expect.element(getByTestId('not-empty')).not.toBeEmptyDOMElement()
await expect.element(
  getByTestId('with-whitespace')
).not.toBeEmptyDOMElement()
```

## toBeInTheDocument [​](index.md#tobeinthedocument)

ts

```
function toBeInTheDocument(): Promise<void>
```

Assert whether an element is present in the document or not.

html

```
<svg data-testid="svg-element"></svg>
```

ts

```
await expect.element(getByTestId('svg-element')).toBeInTheDocument()
await expect.element(getByTestId('does-not-exist')).not.toBeInTheDocument()
```

WARNING

This matcher does not find detached elements. The element must be added to the document to be found by `toBeInTheDocument`. If you desire to search in a detached element, please use: [`toContainElement`](index.md#tocontainelement).

## toBeInvalid [​](index.md#tobeinvalid)

ts

```
function toBeInvalid(): Promise<void>
```

This allows you to check if an element, is currently invalid.

An element is invalid if it has an [`aria-invalid` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid) with no value or a value of `"true"`, or if the result of [`checkValidity()`](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) is `false`.

html

```
<input data-testid="no-aria-invalid" />
<input data-testid="aria-invalid" aria-invalid />
<input data-testid="aria-invalid-value" aria-invalid="true" />
<input data-testid="aria-invalid-false" aria-invalid="false" />
<form data-testid="valid-form">
  <input />
</form>
<form data-testid="invalid-form">
  <input required />
</form>
```

ts

```
await expect.element(getByTestId('no-aria-invalid')).not.toBeInvalid()
await expect.element(getByTestId('aria-invalid')).toBeInvalid()
await expect.element(getByTestId('aria-invalid-value')).toBeInvalid()
await expect.element(getByTestId('aria-invalid-false')).not.toBeInvalid()
await expect.element(getByTestId('valid-form')).not.toBeInvalid()
await expect.element(getByTestId('invalid-form')).toBeInvalid()
```

## toBeRequired [​](index.md#toberequired)

ts

```
function toBeRequired(): Promise<void>
```

This allows you to check if a form element is currently required.

An element is required if it is having a `required` or `aria-required="true"` attribute.

html

```
<input data-testid="required-input" required />
<input data-testid="aria-required-input" aria-required="true" />
<input data-testid="conflicted-input" required aria-required="false" />
<input data-testid="aria-not-required-input" aria-required="false" />
<input data-testid="optional-input" />
<input data-testid="unsupported-type" type="image" required />
<select data-testid="select" required></select>
<textarea data-testid="textarea" required></textarea>
<div data-testid="supported-role" role="tree" required></div>
<div data-testid="supported-role-aria" role="tree" aria-required="true"></div>
```

ts

```
await expect.element(getByTestId('required-input')).toBeRequired()
await expect.element(getByTestId('aria-required-input')).toBeRequired()
await expect.element(getByTestId('conflicted-input')).toBeRequired()
await expect.element(getByTestId('aria-not-required-input')).not.toBeRequired()
await expect.element(getByTestId('optional-input')).not.toBeRequired()
await expect.element(getByTestId('unsupported-type')).not.toBeRequired()
await expect.element(getByTestId('select')).toBeRequired()
await expect.element(getByTestId('textarea')).toBeRequired()
await expect.element(getByTestId('supported-role')).not.toBeRequired()
await expect.element(getByTestId('supported-role-aria')).toBeRequired()
```

## toBeValid [​](index.md#tobevalid)

ts

```
function toBeValid(): Promise<void>
```

This allows you to check if the value of an element, is currently valid.

An element is valid if it has no [`aria-invalid` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid) or an attribute value of "false". The result of [`checkValidity()`](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) must also be `true` if it's a form element.

html

```
<input data-testid="no-aria-invalid" />
<input data-testid="aria-invalid" aria-invalid />
<input data-testid="aria-invalid-value" aria-invalid="true" />
<input data-testid="aria-invalid-false" aria-invalid="false" />
<form data-testid="valid-form">
  <input />
</form>
<form data-testid="invalid-form">
  <input required />
</form>
```

ts

```
await expect.element(getByTestId('no-aria-invalid')).toBeValid()
await expect.element(getByTestId('aria-invalid')).not.toBeValid()
await expect.element(getByTestId('aria-invalid-value')).not.toBeValid()
await expect.element(getByTestId('aria-invalid-false')).toBeValid()
await expect.element(getByTestId('valid-form')).toBeValid()
await expect.element(getByTestId('invalid-form')).not.toBeValid()
```

## toBeVisible [​](index.md#tobevisible)

ts

```
function toBeVisible(): Promise<void>
```

This allows you to check if an element is currently visible to the user.

Element is considered visible when it has non-empty bounding box and does not have `visibility:hidden` computed style.

Note that according to this definition:

- Elements of zero size **are not** considered visible.
- Elements with `display:none` **are not** considered visible.
- Elements with `opacity:0` **are** considered visible.

To check that at least one element from the list is visible, use `locator.first()`.

ts

```
// A specific element is visible.
await expect.element(page.getByText('Welcome')).toBeVisible()
// At least one item in the list is visible.
await expect.element(page.getByTestId('todo-item').first()).toBeVisible()
// At least one of the two elements is visible, possibly both.
await expect.element(
  page.getByRole('button', { name: 'Sign in' })
    .or(page.getByRole('button', { name: 'Sign up' }))
    .first()
).toBeVisible()
```

## toContainElement [​](index.md#tocontainelement)

ts

```
function toContainElement(element: HTMLElement | SVGElement | null): Promise<void>
```

This allows you to assert whether an element contains another element as a descendant or not.

html

```
<span data-testid="ancestor"><span data-testid="descendant"></span></span>
```

ts

```
const ancestor = getByTestId('ancestor')
const descendant = getByTestId('descendant')
const nonExistantElement = getByTestId('does-not-exist')
await expect.element(ancestor).toContainElement(descendant)
await expect.element(descendant).not.toContainElement(ancestor)
await expect.element(ancestor).not.toContainElement(nonExistantElement)
```

## toContainHTML [​](index.md#tocontainhtml)

ts

```
function toContainHTML(htmlText: string): Promise<void>
```

Assert whether a string representing a HTML element is contained in another element. The string should contain valid html, and not any incomplete html.

html

```
<span data-testid="parent"><span data-testid="child"></span></span>
```

ts

```
// These are valid usages
await expect.element(getByTestId('parent')).toContainHTML('<span data-testid="child"></span>')
await expect.element(getByTestId('parent')).toContainHTML('<span data-testid="child" />')
await expect.element(getByTestId('parent')).not.toContainHTML('<br />')
// These won't work
await expect.element(getByTestId('parent')).toContainHTML('data-testid="child"')
await expect.element(getByTestId('parent')).toContainHTML('data-testid')
await expect.element(getByTestId('parent')).toContainHTML('</span>')
```

WARNING

Chances are you probably do not need to use this matcher. We encourage testing from the perspective of how the user perceives the app in a browser. That's why testing against a specific DOM structure is not advised.

It could be useful in situations where the code being tested renders html that was obtained from an external source, and you want to validate that that html code was used as intended.

It should not be used to check DOM structure that you control. Please, use [`toContainElement`](index.md#tocontainelement) instead.

## toHaveAccessibleDescription [​](index.md#tohaveaccessibledescription)

ts

```
function toHaveAccessibleDescription(description?: string | RegExp): Promise<void>
```

This allows you to assert that an element has the expected [accessible description](https://w3c.github.io/accname/).

You can pass the exact string of the expected accessible description, or you can make a partial match passing a regular expression, or by using [`expect.stringContaining`](_api_expect.md#expect-stringcontaining) or [`expect.stringMatching`](_api_expect.md#expect-stringmatching).

html

```
<a
  data-testid="link"
  href="/"
  aria-label="Home page"
  title="A link to start over"
  >Start</a
>
<a data-testid="extra-link" href="/about" aria-label="About page">About</a>
<img src="avatar.jpg" data-testid="avatar" alt="User profile pic" />
<img
  src="logo.jpg"
  data-testid="logo"
  alt="Company logo"
  aria-describedby="t1"
/>
<span id="t1" role="presentation">The logo of Our Company</span>
<img
  src="logo.jpg"
  data-testid="logo2"
  alt="Company logo"
  aria-description="The logo of Our Company"
/>
```

ts

```
await expect.element(getByTestId('link')).toHaveAccessibleDescription()
await expect.element(getByTestId('link')).toHaveAccessibleDescription('A link to start over')
await expect.element(getByTestId('link')).not.toHaveAccessibleDescription('Home page')
await expect.element(getByTestId('extra-link')).not.toHaveAccessibleDescription()
await expect.element(getByTestId('avatar')).not.toHaveAccessibleDescription()
await expect.element(getByTestId('logo')).not.toHaveAccessibleDescription('Company logo')
await expect.element(getByTestId('logo')).toHaveAccessibleDescription(
  'The logo of Our Company',
)
await expect.element(getByTestId('logo2')).toHaveAccessibleDescription(
  'The logo of Our Company',
)
```

## toHaveAccessibleErrorMessage [​](index.md#tohaveaccessibleerrormessage)

ts

```
function toHaveAccessibleErrorMessage(message?: string | RegExp): Promise<void>
```

This allows you to assert that an element has the expected [accessible error message](https://w3c.github.io/aria/#aria-errormessage).

You can pass the exact string of the expected accessible error message. Alternatively, you can perform a partial match by passing a regular expression or by using [`expect.stringContaining`](_api_expect.md#expect-stringcontaining) or [`expect.stringMatching`](_api_expect.md#expect-stringmatching).

html

```
<input
  aria-label="Has Error"
  aria-invalid="true"
  aria-errormessage="error-message"
/>
<div id="error-message" role="alert">This field is invalid</div>
<input aria-label="No Error Attributes" />
<input
  aria-label="Not Invalid"
  aria-invalid="false"
  aria-errormessage="error-message"
/>
```

ts

```
// Inputs with Valid Error Messages
await expect.element(getByRole('textbox', { name: 'Has Error' })).toHaveAccessibleErrorMessage()
await expect.element(getByRole('textbox', { name: 'Has Error' })).toHaveAccessibleErrorMessage(
  'This field is invalid',
)
await expect.element(getByRole('textbox', { name: 'Has Error' })).toHaveAccessibleErrorMessage(
  /invalid/i,
)
await expect.element(
  getByRole('textbox', { name: 'Has Error' }),
).not.toHaveAccessibleErrorMessage('This field is absolutely correct!')
// Inputs without Valid Error Messages
await expect.element(
  getByRole('textbox', { name: 'No Error Attributes' }),
).not.toHaveAccessibleErrorMessage()
await expect.element(
  getByRole('textbox', { name: 'Not Invalid' }),
).not.toHaveAccessibleErrorMessage()
```

## toHaveAccessibleName [​](index.md#tohaveaccessiblename)

ts

```
function toHaveAccessibleName(name?: string | RegExp): Promise<void>
```

This allows you to assert that an element has the expected [accessible name](https://w3c.github.io/accname/). It is useful, for instance, to assert that form elements and buttons are properly labelled.

You can pass the exact string of the expected accessible name, or you can make a partial match passing a regular expression, or by using [`expect.stringContaining`](_api_expect.md#expect-stringcontaining) or [`expect.stringMatching`](_api_expect.md#expect-stringmatching).

html

```
<img data-testid="img-alt" src="" alt="Test alt" />
<img data-testid="img-empty-alt" src="" alt="" />
<svg data-testid="svg-title"><title>Test title</title></svg>
<button data-testid="button-img-alt"><img src="" alt="Test" /></button>
<p><img data-testid="img-paragraph" src="" alt="" /> Test content</p>
<button data-testid="svg-button"><svg><title>Test</title></svg></p>
<div><svg data-testid="svg-without-title"></svg></div>
<input data-testid="input-title" title="test" />
```

javascript

```
await expect.element(getByTestId('img-alt')).toHaveAccessibleName('Test alt')
await expect.element(getByTestId('img-empty-alt')).not.toHaveAccessibleName()
await expect.element(getByTestId('svg-title')).toHaveAccessibleName('Test title')
await expect.element(getByTestId('button-img-alt')).toHaveAccessibleName()
await expect.element(getByTestId('img-paragraph')).not.toHaveAccessibleName()
await expect.element(getByTestId('svg-button')).toHaveAccessibleName()
await expect.element(getByTestId('svg-without-title')).not.toHaveAccessibleName()
await expect.element(getByTestId('input-title')).toHaveAccessibleName()
```

## toHaveAttribute [​](index.md#tohaveattribute)

ts

```
function toHaveAttribute(attribute: string, value?: unknown): Promise<void>
```

This allows you to check whether the given element has an attribute or not. You can also optionally check that the attribute has a specific expected value or partial match using [`expect.stringContaining`](_api_expect.md#expect-stringcontaining) or [`expect.stringMatching`](_api_expect.md#expect-stringmatching).

html

```
<button data-testid="ok-button" type="submit" disabled>ok</button>
```

ts

```
const button = getByTestId('ok-button')
await expect.element(button).toHaveAttribute('disabled')
await expect.element(button).toHaveAttribute('type', 'submit')
await expect.element(button).not.toHaveAttribute('type', 'button')
await expect.element(button).toHaveAttribute(
  'type',
  expect.stringContaining('sub')
)
await expect.element(button).toHaveAttribute(
  'type',
  expect.not.stringContaining('but')
)
```

## toHaveClass [​](index.md#tohaveclass)

ts

```
function toHaveClass(...classNames: string[], options?: { exact: boolean }): Promise<void>
function toHaveClass(...classNames: (string | RegExp)[]): Promise<void>
```

This allows you to check whether the given element has certain classes within its `class` attribute. You must provide at least one class, unless you are asserting that an element does not have any classes.

The list of class names may include strings and regular expressions. Regular expressions are matched against each individual class in the target element, and it is NOT matched against its full `class` attribute value as whole.

WARNING

Note that you cannot use `exact: true` option when only regular expressions are provided.

html

```
<button data-testid="delete-button" class="btn extra btn-danger">
  Delete item
</button>
<button data-testid="no-classes">No Classes</button>
```

ts

```
const deleteButton = getByTestId('delete-button')
const noClasses = getByTestId('no-classes')
await expect.element(deleteButton).toHaveClass('extra')
await expect.element(deleteButton).toHaveClass('btn-danger btn')
await expect.element(deleteButton).toHaveClass(/danger/, 'btn')
await expect.element(deleteButton).toHaveClass('btn-danger', 'btn')
await expect.element(deleteButton).not.toHaveClass('btn-link')
await expect.element(deleteButton).not.toHaveClass(/link/)
// ⚠️ regexp matches against individual classes, not the whole classList
await expect.element(deleteButton).not.toHaveClass(/btn extra/)
// the element has EXACTLY a set of classes (in any order)
await expect.element(deleteButton).toHaveClass('btn-danger extra btn', {
  exact: true
})
// if it has more than expected it is going to fail
await expect.element(deleteButton).not.toHaveClass('btn-danger extra', {
  exact: true
})
await expect.element(noClasses).not.toHaveClass()
```

## toHaveFocus [​](index.md#tohavefocus)

ts

```
function toHaveFocus(): Promise<void>
```

This allows you to assert whether an element has focus or not.

html

```
<div><input type="text" data-testid="element-to-focus" /></div>
```

ts

```
const input = page.getByTestId('element-to-focus')
input.element().focus()
await expect.element(input).toHaveFocus()
input.element().blur()
await expect.element(input).not.toHaveFocus()
```

## toHaveFormValues [​](index.md#tohaveformvalues)

ts

```
function toHaveFormValues(expectedValues: Record<string, unknown>): Promise<void>
```

This allows you to check if a form or fieldset contains form controls for each given name, and having the specified value.

TIP

It is important to stress that this matcher can only be invoked on a [form](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement) or a [fieldset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFieldSetElement) element.

This allows it to take advantage of the [`.elements`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements) property in `form` and `fieldset` to reliably fetch all form controls within them.

This also avoids the possibility that users provide a container that contains more than one `form`, thereby intermixing form controls that are not related, and could even conflict with one another.

This matcher abstracts away the particularities with which a form control value is obtained depending on the type of form control. For instance, `<input>` elements have a `value` attribute, but `<select>` elements do not. Here's a list of all cases covered:

- `<input type="number">` elements return the value as a **number**, instead of a string.
- `<input type="checkbox">` elements:
  - if there's a single one with the given `name` attribute, it is treated as a **boolean**, returning `true` if the checkbox is checked, `false` if unchecked.
  - if there's more than one checkbox with the same `name` attribute, they are all treated collectively as a single form control, which returns the value as an **array** containing all the values of the selected checkboxes in the collection.
- `<input type="radio">` elements are all grouped by the `name` attribute, and such a group treated as a single form control. This form control returns the value as a **string** corresponding to the `value` attribute of the selected radio button within the group.
- `<input type="text">` elements return the value as a **string**. This also applies to `<input>` elements having any other possible `type` attribute that's not explicitly covered in different rules above (e.g. `search`, `email`, `date`, `password`, `hidden`, etc.)
- `<select>` elements without the `multiple` attribute return the value as a **string** corresponding to the `value` attribute of the selected `option`, or `undefined` if there's no selected option.
- `<select multiple>` elements return the value as an **array** containing all the values of the [selected options](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedOptions).
- `<textarea>` elements return their value as a **string**. The value corresponds to their node content.

The above rules make it easy, for instance, to switch from using a single select control to using a group of radio buttons. Or to switch from a multi select control, to using a group of checkboxes. The resulting set of form values used by this matcher to compare against would be the same.

html

```
<form data-testid="login-form">
  <input type="text" name="username" value="jane.doe" />
  <input type="password" name="password" value="12345678" />
  <input type="checkbox" name="rememberMe" checked />
  <button type="submit">Sign in</button>
</form>
```

ts

```
await expect.element(getByTestId('login-form')).toHaveFormValues({
  username: 'jane.doe',
  rememberMe: true,
})
```

## toHaveStyle [​](index.md#tohavestyle)

ts

```
function toHaveStyle(css: string | Partial<CSSStyleDeclaration>): Promise<void>
```

This allows you to check if a certain element has some specific css properties with specific values applied. It matches only if the element has _all_ the expected properties applied, not just some of them.

html

```
<button
  data-testid="delete-button"
  style="display: none; background-color: red"
>
  Delete item
</button>
```

ts

```
const button = getByTestId('delete-button')
await expect.element(button).toHaveStyle('display: none')
await expect.element(button).toHaveStyle({ display: 'none' })
await expect.element(button).toHaveStyle(`
  background-color: red;
  display: none;
`)
await expect.element(button).toHaveStyle({
  backgroundColor: 'red',
  display: 'none',
})
await expect.element(button).not.toHaveStyle(`
  background-color: blue;
  display: none;
`)
await expect.element(button).not.toHaveStyle({
  backgroundColor: 'blue',
  display: 'none',
})
```

This also works with rules that are applied to the element via a class name for which some rules are defined in a stylesheet currently active in the document. The usual rules of css precedence apply.

## toHaveTextContent [​](index.md#tohavetextcontent)

ts

```
function toHaveTextContent(
  text: string | RegExp,
  options?: { normalizeWhitespace: boolean }
): Promise<void>
```

This allows you to check whether the given node has a text content or not. This supports elements, but also text nodes and fragments.

When a `string` argument is passed through, it will perform a partial case-sensitive match to the node content.

To perform a case-insensitive match, you can use a `RegExp` with the `/i` modifier.

If you want to match the whole content, you can use a `RegExp` to do it.

html

```
<span data-testid="text-content">Text Content</span>
```

ts

```
const element = getByTestId('text-content')
await expect.element(element).toHaveTextContent('Content')
// to match the whole content
await expect.element(element).toHaveTextContent(/^Text Content$/)
// to use case-insensitive match
await expect.element(element).toHaveTextContent(/content$/i)
await expect.element(element).not.toHaveTextContent('content')
```

## toHaveValue [​](index.md#tohavevalue)

ts

```
function toHaveValue(value: string | string[] | number | null): Promise<void>
```

This allows you to check whether the given form element has the specified value. It accepts `<input>`, `<select>` and `<textarea>` elements with the exception of `<input type="checkbox">` and `<input type="radio">`, which can be meaningfully matched only using [`toBeChecked`](index.md#tobechecked) or [`toHaveFormValues`](index.md#tohaveformvalues).

It also accepts elements with roles `meter`, `progressbar`, `slider` or `spinbutton` and checks their `aria-valuenow` attribute (as a number).

For all other form elements, the value is matched using the same algorithm as in [`toHaveFormValues`](index.md#tohaveformvalues) does.

html

```
<input type="text" value="text" data-testid="input-text" />
<input type="number" value="5" data-testid="input-number" />
<input type="text" data-testid="input-empty" />
<select multiple data-testid="select-number">
  <option value="first">First Value</option>
  <option value="second" selected>Second Value</option>
  <option value="third" selected>Third Value</option>
</select>
```

ts

```
const textInput = getByTestId('input-text')
const numberInput = getByTestId('input-number')
const emptyInput = getByTestId('input-empty')
const selectInput = getByTestId('select-number')
await expect.element(textInput).toHaveValue('text')
await expect.element(numberInput).toHaveValue(5)
await expect.element(emptyInput).not.toHaveValue()
await expect.element(selectInput).toHaveValue(['second', 'third'])
```

## toHaveDisplayValue [​](index.md#tohavedisplayvalue)

typescript

```
function toHaveDisplayValue(
  value: string | RegExp | (string | RegExp)[]
): Promise<void>
```

This allows you to check whether the given form element has the specified displayed value (the one the end user will see). It accepts `<input>`, `<select>` and `<textarea>` elements with the exception of `<input type="checkbox">` and `<input type="radio">`, which can be meaningfully matched only using [`toBeChecked`](index.md#tobechecked) or [`toHaveFormValues`](index.md#tohaveformvalues).

html

```
<label for="input-example">First name</label>
<input type="text" id="input-example" value="Luca" />
<label for="textarea-example">Description</label>
<textarea id="textarea-example">An example description here.</textarea>
<label for="single-select-example">Fruit</label>
<select id="single-select-example">
  <option value="">Select a fruit...</option>
  <option value="banana">Banana</option>
  <option value="ananas">Ananas</option>
  <option value="avocado">Avocado</option>
</select>
<label for="multiple-select-example">Fruits</label>
<select id="multiple-select-example" multiple>
  <option value="">Select a fruit...</option>
  <option value="banana" selected>Banana</option>
  <option value="ananas">Ananas</option>
  <option value="avocado" selected>Avocado</option>
</select>
```

ts

```
const input = page.getByLabelText('First name')
const textarea = page.getByLabelText('Description')
const selectSingle = page.getByLabelText('Fruit')
const selectMultiple = page.getByLabelText('Fruits')
await expect.element(input).toHaveDisplayValue('Luca')
await expect.element(input).toHaveDisplayValue(/Luc/)
await expect.element(textarea).toHaveDisplayValue('An example description here.')
await expect.element(textarea).toHaveDisplayValue(/example/)
await expect.element(selectSingle).toHaveDisplayValue('Select a fruit...')
await expect.element(selectSingle).toHaveDisplayValue(/Select/)
await expect.element(selectMultiple).toHaveDisplayValue([/Avocado/, 'Banana'])
```

## toBeChecked [​](index.md#tobechecked)

ts

```
function toBeChecked(): Promise<void>
```

This allows you to check whether the given element is checked. It accepts an `input` of type `checkbox` or `radio` and elements with a `role` of `checkbox`, `radio` or `switch` with a valid `aria-checked` attribute of `"true"` or `"false"`.

html

```
<input type="checkbox" checked data-testid="input-checkbox-checked" />
<input type="checkbox" data-testid="input-checkbox-unchecked" />
<div role="checkbox" aria-checked="true" data-testid="aria-checkbox-checked" />
<div
  role="checkbox"
  aria-checked="false"
  data-testid="aria-checkbox-unchecked"
/>
<input type="radio" checked value="foo" data-testid="input-radio-checked" />
<input type="radio" value="foo" data-testid="input-radio-unchecked" />
<div role="radio" aria-checked="true" data-testid="aria-radio-checked" />
<div role="radio" aria-checked="false" data-testid="aria-radio-unchecked" />
<div role="switch" aria-checked="true" data-testid="aria-switch-checked" />
<div role="switch" aria-checked="false" data-testid="aria-switch-unchecked" />
```

ts

```
const inputCheckboxChecked = getByTestId('input-checkbox-checked')
const inputCheckboxUnchecked = getByTestId('input-checkbox-unchecked')
const ariaCheckboxChecked = getByTestId('aria-checkbox-checked')
const ariaCheckboxUnchecked = getByTestId('aria-checkbox-unchecked')
await expect.element(inputCheckboxChecked).toBeChecked()
await expect.element(inputCheckboxUnchecked).not.toBeChecked()
await expect.element(ariaCheckboxChecked).toBeChecked()
await expect.element(ariaCheckboxUnchecked).not.toBeChecked()
const inputRadioChecked = getByTestId('input-radio-checked')
const inputRadioUnchecked = getByTestId('input-radio-unchecked')
const ariaRadioChecked = getByTestId('aria-radio-checked')
const ariaRadioUnchecked = getByTestId('aria-radio-unchecked')
await expect.element(inputRadioChecked).toBeChecked()
await expect.element(inputRadioUnchecked).not.toBeChecked()
await expect.element(ariaRadioChecked).toBeChecked()
await expect.element(ariaRadioUnchecked).not.toBeChecked()
const ariaSwitchChecked = getByTestId('aria-switch-checked')
const ariaSwitchUnchecked = getByTestId('aria-switch-unchecked')
await expect.element(ariaSwitchChecked).toBeChecked()
await expect.element(ariaSwitchUnchecked).not.toBeChecked()
```

## toBePartiallyChecked [​](index.md#tobepartiallychecked)

typescript

```
function toBePartiallyChecked(): Promise<void>
```

This allows you to check whether the given element is partially checked. It accepts an `input` of type `checkbox` and elements with a `role` of `checkbox` with a `aria-checked="mixed"`, or `input` of type `checkbox` with `indeterminate` set to `true`

html

```
<input type="checkbox" aria-checked="mixed" data-testid="aria-checkbox-mixed" />
<input type="checkbox" checked data-testid="input-checkbox-checked" />
<input type="checkbox" data-testid="input-checkbox-unchecked" />
<div role="checkbox" aria-checked="true" data-testid="aria-checkbox-checked" />
<div
  role="checkbox"
  aria-checked="false"
  data-testid="aria-checkbox-unchecked"
/>
<input type="checkbox" data-testid="input-checkbox-indeterminate" />
```

ts

```
const ariaCheckboxMixed = getByTestId('aria-checkbox-mixed')
const inputCheckboxChecked = getByTestId('input-checkbox-checked')
const inputCheckboxUnchecked = getByTestId('input-checkbox-unchecked')
const ariaCheckboxChecked = getByTestId('aria-checkbox-checked')
const ariaCheckboxUnchecked = getByTestId('aria-checkbox-unchecked')
const inputCheckboxIndeterminate = getByTestId('input-checkbox-indeterminate')
await expect.element(ariaCheckboxMixed).toBePartiallyChecked()
await expect.element(inputCheckboxChecked).not.toBePartiallyChecked()
await expect.element(inputCheckboxUnchecked).not.toBePartiallyChecked()
await expect.element(ariaCheckboxChecked).not.toBePartiallyChecked()
await expect.element(ariaCheckboxUnchecked).not.toBePartiallyChecked()
inputCheckboxIndeterminate.element().indeterminate = true
await expect.element(inputCheckboxIndeterminate).toBePartiallyChecked()
```

## toHaveRole [​](index.md#tohaverole)

ts

```
function toHaveRole(role: ARIARole): Promise<void>
```

This allows you to assert that an element has the expected [role](https://www.w3.org/TR/html-aria/#docconformance).

This is useful in cases where you already have access to an element via some query other than the role itself, and want to make additional assertions regarding its accessibility.

The role can match either an explicit role (via the `role` attribute), or an implicit one via the [implicit ARIA semantics](https://www.w3.org/TR/html-aria/#docconformance).

html

```
<button data-testid="button">Continue</button>
<div role="button" data-testid="button-explicit">Continue</button>
<button role="switch button" data-testid="button-explicit-multiple">Continue</button>
<a href="/about" data-testid="link">About</a>
<a data-testid="link-invalid">Invalid link<a/>
```

ts

```
await expect.element(getByTestId('button')).toHaveRole('button')
await expect.element(getByTestId('button-explicit')).toHaveRole('button')
await expect.element(getByTestId('button-explicit-multiple')).toHaveRole('button')
await expect.element(getByTestId('button-explicit-multiple')).toHaveRole('switch')
await expect.element(getByTestId('link')).toHaveRole('link')
await expect.element(getByTestId('link-invalid')).not.toHaveRole('link')
await expect.element(getByTestId('link-invalid')).toHaveRole('generic')
```

WARNING

Roles are matched literally by string equality, without inheriting from the ARIA role hierarchy. As a result, querying a superclass role like `checkbox` will not include elements with a subclass role like `switch`.

Also note that unlike `testing-library`, Vitest ignores all custom roles except the first valid one, following Playwright's behaviour:

jsx

```
<div data-testid="switch" role="switch alert"></div>
await expect.element(getByTestId('switch')).toHaveRole('switch') // ✅
await expect.element(getByTestId('switch')).toHaveRole('alert') // ❌
```

## toHaveSelection [​](index.md#tohaveselection)

ts

```
function toHaveSelection(selection?: string): Promise<void>
```

This allows to assert that an element has a [text selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection).

This is useful to check if text or part of the text is selected within an element. The element can be either an input of type text, a textarea, or any other element that contains text, such as a paragraph, span, div etc.

WARNING

The expected selection is a string, it does not allow to check for selection range indeces.

html

```
<div>
  <input type="text" value="text selected text" data-testid="text" />
  <textarea data-testid="textarea">text selected text</textarea>
  <p data-testid="prev">prev</p>
  <p data-testid="parent">
    text <span data-testid="child">selected</span> text
  </p>
  <p data-testid="next">next</p>
</div>
```

ts

```
getByTestId('text').element().setSelectionRange(5, 13)
await expect.element(getByTestId('text')).toHaveSelection('selected')
getByTestId('textarea').element().setSelectionRange(0, 5)
await expect.element('textarea').toHaveSelection('text ')
const selection = document.getSelection()
const range = document.createRange()
selection.removeAllRanges()
selection.empty()
selection.addRange(range)
// selection of child applies to the parent as well
range.selectNodeContents(getByTestId('child').element())
await expect.element(getByTestId('child')).toHaveSelection('selected')
await expect.element(getByTestId('parent')).toHaveSelection('selected')
// selection that applies from prev all, parent text before child, and part child.
range.setStart(getByTestId('prev').element(), 0)
range.setEnd(getByTestId('child').element().childNodes[0], 3)
await expect.element(queryByTestId('prev')).toHaveSelection('prev')
await expect.element(queryByTestId('child')).toHaveSelection('sel')
await expect.element(queryByTestId('parent')).toHaveSelection('text sel')
await expect.element(queryByTestId('next')).not.toHaveSelection()
// selection that applies from part child, parent text after child and part next.
range.setStart(getByTestId('child').element().childNodes[0], 3)
range.setEnd(getByTestId('next').element().childNodes[0], 2)
await expect.element(queryByTestId('child')).toHaveSelection('ected')
await expect.element(queryByTestId('parent')).toHaveSelection('ected text')
await expect.element(queryByTestId('prev')).not.toHaveSelection()
await expect.element(queryByTestId('next')).toHaveSelection('ne')
```

#### \_guide_browser_commands.md

> Source: https://vitest.dev/guide/browser/commands
> Scraped: 4/15/2025, 1:07:31 AM

## Commands [​](index.md#commands)

Command is a function that invokes another function on the server and passes down the result back to the browser. Vitest exposes several built-in commands you can use in your browser tests.

## Built-in Commands [​](index.md#built-in-commands)

### Files Handling [​](index.md#files-handling)

You can use `readFile`, `writeFile` and `removeFile` API to handle files inside your browser tests. All paths are resolved relative to the test file even if they are called in a helper function located in another file.

By default, Vitest uses `utf-8` encoding but you can override it with options.

TIP

This API follows [`server.fs`](https://vitejs.dev/config/server-options.html#server-fs-allow) limitations for security reasons.

ts

```
import { server } from '@vitest/browser/context'
const { readFile, writeFile, removeFile } = server.commands
it('handles files', async () => {
  const file = './test.txt'
  await writeFile(file, 'hello world')
  const content = await readFile(file)
  expect(content).toBe('hello world')
  await removeFile(file)
})
```

## CDP Session [​](index.md#cdp-session)

Vitest exposes access to raw Chrome Devtools Protocol via the `cdp` method exported from `@vitest/browser/context`. It is mostly useful to library authors to build tools on top of it.

ts

```
import { cdp } from '@vitest/browser/context'
const input = document.createElement('input')
document.body.appendChild(input)
input.focus()
await cdp().send('Input.dispatchKeyEvent', {
  type: 'keyDown',
  text: 'a',
})
expect(input).toHaveValue('a')
```

WARNING

CDP session works only with `playwright` provider and only when using `chromium` browser. You can read more about it in playwright's [`CDPSession`](https://playwright.dev/docs/api/class-cdpsession) documentation.

## Custom Commands [​](index.md#custom-commands)

You can also add your own commands via [`browser.commands`](_guide_browser_config.md#browser-commands) config option. If you develop a library, you can provide them via a `config` hook inside a plugin:

ts

```
import type { Plugin } from 'vitest/config'
import type { BrowserCommand } from 'vitest/node'
const myCustomCommand: BrowserCommand<[arg1: string, arg2: string]> = ({
  testPath,
  provider
}, arg1, arg2) => {
  if (provider.name === 'playwright') {
    console.log(testPath, arg1, arg2)
    return { someValue: true }
  }
  throw new Error(`provider ${provider.name} is not supported`)
}
export default function BrowserCommands(): Plugin {
  return {
    name: 'vitest:custom-commands',
    config() {
      return {
        test: {
          browser: {
            commands: {
              myCustomCommand,
            }
          }
        }
      }
    }
  }
}
```

Then you can call it inside your test by importing it from `@vitest/browser/context`:

ts

```
import { commands } from '@vitest/browser/context'
import { expect, test } from 'vitest'
test('custom command works correctly', async () => {
  const result = await commands.myCustomCommand('test1', 'test2')
  expect(result).toEqual({ someValue: true })
})
// if you are using TypeScript, you can augment the module
declare module '@vitest/browser/context' {
  interface BrowserCommands {
    myCustomCommand: (arg1: string, arg2: string) => Promise<{
      someValue: true
    }>
  }
}
```

WARNING

Custom functions will override built-in ones if they have the same name.

### Custom `playwright` commands [​](index.md#custom-playwright-commands)

Vitest exposes several `playwright` specific properties on the command context.

- `page` references the full page that contains the test iframe. This is the orchestrator HTML and you most likely shouldn't touch it to not break things.
- `frame` is an async method that will resolve tester [`Frame`](https://playwright.dev/docs/api/class-frame). It has a similar API to the `page`, but it doesn't support certain methods. If you need to query an element, you should prefer using `context.iframe` instead because it is more stable and faster.
- `iframe` is a [`FrameLocator`](https://playwright.dev/docs/api/class-framelocator) that should be used to query other elements on the page.
- `context` refers to the unique [BrowserContext](https://playwright.dev/docs/api/class-browsercontext).

ts

```
import { BrowserCommand } from 'vitest/node'
export const myCommand: BrowserCommand<[string, number]> = async (
  ctx,
  arg1: string,
  arg2: number
) => {
  if (ctx.provider.name === 'playwright') {
    const element = await ctx.iframe.findByRole('alert')
    const screenshot = await element.screenshot()
    // do something with the screenshot
    return difference
  }
}
```

TIP

If you are using TypeScript, don't forget to reference `@vitest/browser/providers/playwright` in your [setup file](_config_.md#setupfile) or a [config file](_config_.md) to get autocompletion in the config and in `userEvent` and `page` options:

ts

```
/// <reference types="@vitest/browser/providers/playwright" />
```

### Custom `webdriverio` commands [​](index.md#custom-webdriverio-commands)

Vitest exposes some `webdriverio` specific properties on the context object.

- `browser` is the `WebdriverIO.Browser` API.

Vitest automatically switches the `webdriver` context to the test iframe by calling `browser.switchToFrame` before the command is called, so `$` and `$$` methods refer to the elements inside the iframe, not in the orchestrator, but non-webdriver APIs will still refer to the parent frame context.

TIP

If you are using TypeScript, don't forget to reference `@vitest/browser/providers/webdriverio` in your [setup file](_config_.md#setupfile) or a [config file](_config_.md) to get autocompletion:

ts

```
/// <reference types="@vitest/browser/providers/webdriverio" />
```

#### \_guide_browser_config.md

> Source: https://vitest.dev/guide/browser/config
> Scraped: 4/15/2025, 1:07:29 AM

## Browser Config Reference [​](index.md#browser-config-reference)

You can change the browser configuration by updating the `test.browser` field in your [config file](_config_.md). An example of a simple config file:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        {
          browser: 'chromium',
          setupFile: './chromium-setup.js',
        },
      ],
    },
  },
})
```

Please, refer to the ["Config Reference"](_config_.md) article for different config examples.

WARNING

_All listed options_ on this page are located within a `test` property inside the configuration:

vitest.config.js

ts

```
export default defineConfig({
  test: {
    browser: {},
  },
})
```

## browser.enabled [​](index.md#browser-enabled)

- **Type:** `boolean`
- **Default:** `false`
- **CLI:** `--browser`, `--browser.enabled=false`

Run all tests inside a browser by default. Note that `--browser` only works if you have at least one [`browser.instances`](index.md#browser-instances) item.

## browser.instances [​](index.md#browser-instances)

- **Type:** `BrowserConfig`
- **Default:** `[{ browser: name }]`

Defines multiple browser setups. Every config has to have at least a `browser` field. The config supports your providers configurations:

- [Configuring Playwright](_guide_browser_playwright.md)
- [Configuring WebdriverIO](_guide_browser_webdriverio.md)

TIP

To have a better type safety when using built-in providers, you should reference one of these types (for provider that you are using) in your [config file](_config_.md):

ts

```
/// <reference types="@vitest/browser/providers/playwright" />
/// <reference types="@vitest/browser/providers/webdriverio" />
```

In addition to that, you can also specify most of the [project options](_config_.md) (not marked with a \* icon) and some of the `browser` options like `browser.testerHtmlPath`.

WARNING

Every browser config inherits options from the root config:

vitest.config.ts

ts

```
export default defineConfig({
  test: {
    setupFile: ['./root-setup-file.js'],
    browser: {
      enabled: true,
      testerHtmlPath: './custom-path.html',
      instances: [
        {
          // will have both setup files: "root" and "browser"
          setupFile: ['./browser-setup-file.js'],
          // implicitly has "testerHtmlPath" from the root config
          // testerHtmlPath: './custom-path.html',
        },
      ],
    },
  },
})
```

During development, Vitest supports only one [non-headless](index.md#browser-headless) configuration. You can limit the headed project yourself by specifying `headless: false` in the config, or by providing the `--browser.headless=false` flag, or by filtering projects with `--project=chromium` flag.

For more examples, refer to the ["Multiple Setups" guide](_guide_browser_multiple-setups.md).

List of available `browser` options:

- [`browser.headless`](index.md#browser-headless)
- [`browser.locators`](index.md#browser-locators)
- [`browser.viewport`](index.md#browser-viewport)
- [`browser.testerHtmlPath`](index.md#browser-testerhtmlpath)
- [`browser.screenshotDirectory`](index.md#browser-screenshotdirectory)
- [`browser.screenshotFailures`](index.md#browser-screenshotfailures)

By default, Vitest creates an array with a single element which uses the [`browser.name`](index.md#browser-name) field as a `browser`. Note that this behaviour will be removed with Vitest 4.

Under the hood, Vitest transforms these instances into separate [test projects](_advanced_api_test-project.md) sharing a single Vite server for better caching performance.

## browser.name deprecated [​](index.md#browser-name)

- **Type:** `string`
- **CLI:** `--browser=safari`

DANGER

This API is deprecated an will be removed in Vitest 4. Please, use [`browser.instances`](index.md#browser-instances) option instead.

Run all tests in a specific browser. Possible options in different providers:

- `webdriverio`: `firefox`, `chrome`, `edge`, `safari`
- `playwright`: `firefox`, `webkit`, `chromium`
- custom: any string that will be passed to the provider

## browser.headless [​](index.md#browser-headless)

- **Type:** `boolean`
- **Default:** `process.env.CI`
- **CLI:** `--browser.headless`, `--browser.headless=false`

Run the browser in a `headless` mode. If you are running Vitest in CI, it will be enabled by default.

## browser.isolate [​](index.md#browser-isolate)

- **Type:** `boolean`
- **Default:** `true`
- **CLI:** `--browser.isolate`, `--browser.isolate=false`

Run every test in a separate iframe.

## browser.testerHtmlPath [​](index.md#browser-testerhtmlpath)

- **Type:** `string`

A path to the HTML entry point. Can be relative to the root of the project. This file will be processed with [`transformIndexHtml`](https://vite.dev/guide/api-plugin#transformindexhtml) hook.

## browser.api [​](index.md#browser-api)

- **Type:** `number | { port?, strictPort?, host? }`
- **Default:** `63315`
- **CLI:** `--browser.api=63315`, `--browser.api.port=1234, --browser.api.host=example.com`

Configure options for Vite server that serves code in the browser. Does not affect [`test.api`](index.md#api) option. By default, Vitest assigns port `63315` to avoid conflicts with the development server, allowing you to run both in parallel.

## browser.provider experimental [​](index.md#browser-provider)

- **Type:** `'webdriverio' | 'playwright' | 'preview' | string`
- **Default:** `'preview'`
- **CLI:** `--browser.provider=playwright`

ADVANCED API

The provider API is highly experimental and can change between patches. If you just need to run tests in a browser, use the [`browser.instances`](index.md#browser-instances) option instead.

Path to a provider that will be used when running browser tests. Vitest provides three providers which are `preview` (default), `webdriverio` and `playwright`. Custom providers should be exported using `default` export and have this shape:

ts

```
export interface BrowserProvider {
  name: string
  supportsParallelism: boolean
  getSupportedBrowsers: () => readonly string[]
  beforeCommand?: (command: string, args: unknown[]) => Awaitable<void>
  afterCommand?: (command: string, args: unknown[]) => Awaitable<void>
  getCommandsContext: (sessionId: string) => Record<string, unknown>
  openPage: (sessionId: string, url: string, beforeNavigate?: () => Promise<void>) => Promise<void>
  getCDPSession?: (sessionId: string) => Promise<CDPSession>
  close: () => Awaitable<void>
  initialize(
    ctx: TestProject,
    options: BrowserProviderInitializationOptions
  ): Awaitable<void>
}
```

## browser.providerOptions deprecated [​](index.md#browser-provideroptions)

- **Type:** `BrowserProviderOptions`

DANGER

This API is deprecated an will be removed in Vitest 4. Please, use [`browser.instances`](index.md#browser-instances) option instead.

Options that will be passed down to provider when calling `provider.initialize`.

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    browser: {
      providerOptions: {
        launch: {
          devtools: true,
        },
      },
    },
  },
})
```

TIP

To have a better type safety when using built-in providers, you should reference one of these types (for provider that you are using) in your [config file](_config_.md):

ts

```
/// <reference types="@vitest/browser/providers/playwright" />
/// <reference types="@vitest/browser/providers/webdriverio" />
```

## browser.ui [​](index.md#browser-ui)

- **Type:** `boolean`
- **Default:** `!isCI`
- **CLI:** `--browser.ui=false`

Should Vitest UI be injected into the page. By default, injects UI iframe during development.

## browser.viewport [​](index.md#browser-viewport)

- **Type:** `{ width, height }`
- **Default:** `414x896`

Default iframe's viewport.

## browser.locators [​](index.md#browser-locators)

Options for built-in [browser locators](_guide_browser_locators.md).

### browser.locators.testIdAttribute [​](index.md#browser-locators-testidattribute)

- **Type:** `string`
- **Default:** `data-testid`

Attribute used to find elements with `getByTestId` locator.

## browser.screenshotDirectory [​](index.md#browser-screenshotdirectory)

- **Type:** `string`
- **Default:** `__screenshots__` in the test file directory

Path to the screenshots directory relative to the `root`.

## browser.screenshotFailures [​](index.md#browser-screenshotfailures)

- **Type:** `boolean`
- **Default:** `!browser.ui`

Should Vitest take screenshots if the test fails.

## browser.orchestratorScripts [​](index.md#browser-orchestratorscripts)

- **Type:** `BrowserScript[]`
- **Default:** `[]`

Custom scripts that should be injected into the orchestrator HTML before test iframes are initiated. This HTML document only sets up iframes and doesn't actually import your code.

The script `src` and `content` will be processed by Vite plugins. Script should be provided in the following shape:

ts

```
export interface BrowserScript {
  /** If "content" is provided and type is "module", this will be its identifier.
   * If you are using TypeScript, you can add `.ts` extension here for example.
   * @default `injected-${index}.js`
   */
  id?: string
  /** JavaScript content to be injected. This string is processed by Vite plugins if type is "module".
   * You can use `id` to give Vite a hint about the file extension.
   */
  content?: string
  /** Path to the script. This value is resolved by Vite so it can be a node module or a file path.
   */
  src?: string
  /** If the script should be loaded asynchronously.
   */
  async?: boolean
  /** Script type.
   * @default 'module'
   */
  type?: string
}
```

## browser.testerScripts [​](index.md#browser-testerscripts)

- **Type:** `BrowserScript[]`
- **Default:** `[]`

DANGER

This API is deprecated an will be removed in Vitest 4. Please, use [`browser.testerHtmlPath`](index.md#browser-testerhtmlpath) field instead.

Custom scripts that should be injected into the tester HTML before the tests environment is initiated. This is useful to inject polyfills required for Vitest browser implementation. It is recommended to use [`setupFiles`](index.md#setupfiles) in almost all cases instead of this.

The script `src` and `content` will be processed by Vite plugins.

## browser.commands [​](index.md#browser-commands)

- **Type:** `Record<string, BrowserCommand>`
- **Default:** `{ readFile, writeFile, ... }`

Custom [commands](_guide_browser_commands.md) that can be imported during browser tests from `@vitest/browser/commands`.

## browser.connectTimeout [​](index.md#browser-connecttimeout)

- **Type:** `number`
- **Default:** `60_000`

The timeout in milliseconds. If connection to the browser takes longer, the test suite will fail.

INFO

This is the time it should take for the browser to establish the WebSocket connection with the Vitest server. In normal circumstances, this timeout should never be reached.

#### \_guide_browser_context.md

> Source: https://vitest.dev/guide/browser/context
> Scraped: 4/15/2025, 1:07:31 AM

## Context API [​](index.md#context-api)

Vitest exposes a context module via `@vitest/browser/context` entry point. As of 2.0, it exposes a small set of utilities that might be useful to you in tests.

## `userEvent` [​](index.md#userevent)

ts

```
/** Handler for user interactions. The support is implemented by the browser provider (`playwright` or `webdriverio`).
 * If used with `preview` provider, fallbacks to simulated events via `@testing-library/user-event`.
 * @experimental
 */
export const userEvent: {
  setup: () => UserEvent
  cleanup: () => Promise<void>
  click: (element: Element, options?: UserEventClickOptions) => Promise<void>
  dblClick: (element: Element, options?: UserEventDoubleClickOptions) => Promise<void>
  tripleClick: (element: Element, options?: UserEventTripleClickOptions) => Promise<void>
  selectOptions: (
    element: Element,
    values: HTMLElement | HTMLElement[] | string | string[],
    options?: UserEventSelectOptions,
  ) => Promise<void>
  keyboard: (text: string) => Promise<void>
  type: (element: Element, text: string, options?: UserEventTypeOptions) => Promise<void>
  clear: (element: Element) => Promise<void>
  tab: (options?: UserEventTabOptions) => Promise<void>
  hover: (element: Element, options?: UserEventHoverOptions) => Promise<void>
  unhover: (element: Element, options?: UserEventHoverOptions) => Promise<void>
  fill: (element: Element, text: string, options?: UserEventFillOptions) => Promise<void>
  dragAndDrop: (source: Element, target: Element, options?: UserEventDragAndDropOptions) => Promise<void>
}
```

## `commands` [​](index.md#commands)

ts

```
/** Available commands for the browser.
 * A shortcut to `server.commands`.
 */
export const commands: BrowserCommands
```

## `page` [​](index.md#page)

The `page` export provides utilities to interact with the current `page`.

WARNING

While it exposes some utilities from Playwright's `page`, it is not the same object. Since the browser context is evaluated in the browser, your tests don't have access to Playwright's `page` because it runs on the server.

Use [Commands API](_guide_browser_commands.md) if you need to have access to Playwright's `page` object.

ts

```
export const page: {
  /** Change the size of iframe's viewport.
   */
  viewport(width: number, height: number): Promise<void>
  /** Make a screenshot of the test iframe or a specific element.
   * @returns Path to the screenshot file or path and base64.
   */
  screenshot(options: Omit<ScreenshotOptions, 'base64'> & { base64: true }): Promise<{
    path: string
    base64: string
  }>
  screenshot(options?: ScreenshotOptions): Promise<string>
  /** Extend default `page` object with custom methods.
   */
  extend(methods: Partial<BrowserPage>): BrowserPage
  /** Wrap an HTML element in a `Locator`. When querying for elements, the search will always return this element.
   */
  elementLocator(element: Element): Locator
  /** Locator APIs. See its documentation for more details.
   */
  getByRole(role: ARIARole | string, options?: LocatorByRoleOptions): Locator
  getByLabelText(text: string | RegExp, options?: LocatorOptions): Locator
  getByTestId(text: string | RegExp): Locator
  getByAltText(text: string | RegExp, options?: LocatorOptions): Locator
  getByPlaceholder(text: string | RegExp, options?: LocatorOptions): Locator
  getByText(text: string | RegExp, options?: LocatorOptions): Locator
  getByTitle(text: string | RegExp, options?: LocatorOptions): Locator
}
```

## `cdp` [​](index.md#cdp)

The `cdp` export returns the current Chrome DevTools Protocol session. It is mostly useful to library authors to build tools on top of it.

WARNING

CDP session works only with `playwright` provider and only when using `chromium` browser. You can read more about it in playwright's [`CDPSession`](https://playwright.dev/docs/api/class-cdpsession) documentation.

ts

```
export const cdp: () => CDPSession
```

## `server` [​](index.md#server)

The `server` export represents the Node.js environment where the Vitest server is running. It is mostly useful for debugging or limiting your tests based on the environment.

ts

```
export const server: {
  /** Platform the Vitest server is running on.
   * The same as calling `process.platform` on the server.
   */
  platform: Platform
  /** Runtime version of the Vitest server.
   * The same as calling `process.version` on the server.
   */
  version: string
  /** Name of the browser provider.
   */
  provider: string
  /** Name of the current browser.
   */
  browser: string
  /** Available commands for the browser.
   */
  commands: BrowserCommands
  /** Serialized test config.
   */
  config: SerializedConfig
}
```

#### \_guide_browser_interactivity-api.md

> Source: https://vitest.dev/guide/browser/interactivity-api
> Scraped: 4/15/2025, 1:07:30 AM

## Interactivity API [​](index.md#interactivity-api)

Vitest implements a subset of [`@testing-library/user-event`](https://testing-library.com/docs/user-event/intro) APIs using [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) or [webdriver](https://www.w3.org/TR/webdriver/) instead of faking events which makes the browser behaviour more reliable and consistent with how users interact with a page.

ts

```
import { userEvent } from '@vitest/browser/context'
await userEvent.click(document.querySelector('.button'))
```

Almost every `userEvent` method inherits its provider options. To see all available options in your IDE, add `webdriver` or `playwright` types (depending on your provider) to your [setup file](_config_.md#setupfile) or a [config file](_config_.md) (depending on what is in `included` in your `tsconfig.json`):

playwrightwebdriverio

ts

```
/// <reference types="@vitest/browser/providers/playwright" />
```

ts

```
/// <reference types="@vitest/browser/providers/webdriverio" />
```

## userEvent.setup [​](index.md#userevent-setup)

ts

```
function setup(): UserEvent
```

Creates a new user event instance. This is useful if you need to keep the state of keyboard to press and release buttons correctly.

WARNING

Unlike `@testing-library/user-event`, the default `userEvent` instance from `@vitest/browser/context` is created once, not every time its methods are called! You can see the difference in how it works in this snippet:

ts

```
import { userEvent as vitestUserEvent } from '@vitest/browser/context'
import { userEvent as originalUserEvent } from '@testing-library/user-event'
await vitestUserEvent.keyboard('{Shift}') // press shift without releasing
await vitestUserEvent.keyboard('{/Shift}') // releases shift
await originalUserEvent.keyboard('{Shift}') // press shift without releasing
await originalUserEvent.keyboard('{/Shift}') // DID NOT release shift because the state is different
```

This behaviour is more useful because we do not emulate the keyboard, we actually press the Shift, so keeping the original behaviour would cause unexpected issues when typing in the field.

## userEvent.click [​](index.md#userevent-click)

ts

```
function click(
  element: Element | Locator,
  options?: UserEventClickOptions,
): Promise<void>
```

Click on an element. Inherits provider's options. Please refer to your provider's documentation for detailed explanation about how this method works.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('clicks on an element', async () => {
  const logo = page.getByRole('img', { name: /logo/ })
  await userEvent.click(logo)
  // or you can access it directly on the locator
  await logo.click()
})
```

References:

- [Playwright `locator.click` API](https://playwright.dev/docs/api/class-locator#locator-click)
- [WebdriverIO `element.click` API](https://webdriver.io/docs/api/element/click/)
- [testing-library `click` API](https://testing-library.com/docs/user-event/convenience/#click)

## userEvent.dblClick [​](index.md#userevent-dblclick)

ts

```
function dblClick(
  element: Element | Locator,
  options?: UserEventDoubleClickOptions,
): Promise<void>
```

Triggers a double click event on an element.

Please refer to your provider's documentation for detailed explanation about how this method works.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('triggers a double click on an element', async () => {
  const logo = page.getByRole('img', { name: /logo/ })
  await userEvent.dblClick(logo)
  // or you can access it directly on the locator
  await logo.dblClick()
})
```

References:

- [Playwright `locator.dblclick` API](https://playwright.dev/docs/api/class-locator#locator-dblclick)
- [WebdriverIO `element.doubleClick` API](https://webdriver.io/docs/api/element/doubleClick/)
- [testing-library `dblClick` API](https://testing-library.com/docs/user-event/convenience/#dblClick)

## userEvent.tripleClick [​](index.md#userevent-tripleclick)

ts

```
function tripleClick(
  element: Element | Locator,
  options?: UserEventTripleClickOptions,
): Promise<void>
```

Triggers a triple click event on an element. Since there is no `tripleclick` in browser api, this method will fire three click events in a row, and so you must check [click event detail](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event#usage_notes) to filter the event: `evt.detail === 3`.

Please refer to your provider's documentation for detailed explanation about how this method works.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('triggers a triple click on an element', async () => {
  const logo = page.getByRole('img', { name: /logo/ })
  let tripleClickFired = false
  logo.addEventListener('click', (evt) => {
    if (evt.detail === 3) {
      tripleClickFired = true
    }
  })
  await userEvent.tripleClick(logo)
  // or you can access it directly on the locator
  await logo.tripleClick()
  expect(tripleClickFired).toBe(true)
})
```

References:

- [Playwright `locator.click` API](https://playwright.dev/docs/api/class-locator#locator-click): implemented via `click` with `clickCount: 3` .
- [WebdriverIO `browser.action` API](https://webdriver.io/docs/api/browser/action/): implemented via actions api with `move` plus three `down + up + pause` events in a row
- [testing-library `tripleClick` API](https://testing-library.com/docs/user-event/convenience/#tripleClick)

## userEvent.fill [​](index.md#userevent-fill)

ts

```
function fill(
  element: Element | Locator,
  text: string,
): Promise<void>
```

Set a value to the `input/textarea/conteneditable` field. This will remove any existing text in the input before setting the new value.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('update input', async () => {
  const input = page.getByRole('input')
  await userEvent.fill(input, 'foo') // input.value == foo
  await userEvent.fill(input, '{{a[[') // input.value == {{a[[
  await userEvent.fill(input, '{Shift}') // input.value == {Shift}
  // or you can access it directly on the locator
  await input.fill('foo') // input.value == foo
})
```

This methods focuses the element, fills it and triggers an `input` event after filling. You can use an empty string to clear the field.

References:

- [Playwright `locator.fill` API](https://playwright.dev/docs/api/class-locator#locator-fill)
- [WebdriverIO `element.setValue` API](https://webdriver.io/docs/api/element/setValue)
- [testing-library `type` API](https://testing-library.com/docs/user-event/utility/#type)

## userEvent.keyboard [​](index.md#userevent-keyboard)

ts

```
function keyboard(text: string): Promise<void>
```

The `userEvent.keyboard` allows you to trigger keyboard strokes. If any input has a focus, it will type characters into that input. Otherwise, it will trigger keyboard events on the currently focused element (`document.body` if there are no focused elements).

This API supports [user-event `keyboard` syntax](https://testing-library.com/docs/user-event/keyboard).

ts

```
import { userEvent } from '@vitest/browser/context'
test('trigger keystrokes', async () => {
  await userEvent.keyboard('foo') // translates to: f, o, o
  await userEvent.keyboard('{{a[[') // translates to: {, a, [
  await userEvent.keyboard('{Shift}{f}{o}{o}') // translates to: Shift, f, o, o
  await userEvent.keyboard('{a>5}') // press a without releasing it and trigger 5 keydown
  await userEvent.keyboard('{a>5/}') // press a for 5 keydown and then release it
})
```

References:

- [Playwright `Keyboard` API](https://playwright.dev/docs/api/class-keyboard)
- [WebdriverIO `action('key')` API](https://webdriver.io/docs/api/browser/action#key-input-source)
- [testing-library `type` API](https://testing-library.com/docs/user-event/utility/#type)

## userEvent.tab [​](index.md#userevent-tab)

ts

```
function tab(options?: UserEventTabOptions): Promise<void>
```

Sends a `Tab` key event. This is a shorthand for `userEvent.keyboard('{tab}')`.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('tab works', async () => {
  const [input1, input2] = page.getByRole('input').elements()
  expect(input1).toHaveFocus()
  await userEvent.tab()
  expect(input2).toHaveFocus()
  await userEvent.tab({ shift: true })
  expect(input1).toHaveFocus()
})
```

References:

- [Playwright `Keyboard` API](https://playwright.dev/docs/api/class-keyboard)
- [WebdriverIO `action('key')` API](https://webdriver.io/docs/api/browser/action#key-input-source)
- [testing-library `tab` API](https://testing-library.com/docs/user-event/convenience/#tab)

## userEvent.type [​](index.md#userevent-type)

ts

```
function type(
  element: Element | Locator,
  text: string,
  options?: UserEventTypeOptions,
): Promise<void>
```

The `type` method implements `@testing-library/user-event`'s [`type`](https://testing-library.com/docs/user-event/utility/#type) utility built on top of [`keyboard`](https://testing-library.com/docs/user-event/keyboard) API.

This function allows you to type characters into an input/textarea/conteneditable element. It supports [user-event `keyboard` syntax](https://testing-library.com/docs/user-event/keyboard).

If you just need to press characters without an input, use [`userEvent.keyboard`](index.md#userevent-keyboard) API.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('update input', async () => {
  const input = page.getByRole('input')
  await userEvent.type(input, 'foo') // input.value == foo
  await userEvent.type(input, '{{a[[') // input.value == foo{a[
  await userEvent.type(input, '{Shift}') // input.value == foo{a[
})
```

INFO

Vitest doesn't expose `.type` method on the locator like `input.type` because it exists only for compatibility with the `userEvent` library. Consider using `.fill` instead as it is faster.

References:

- [Playwright `locator.press` API](https://playwright.dev/docs/api/class-locator#locator-press)
- [WebdriverIO `action('key')` API](https://webdriver.io/docs/api/browser/action#key-input-source)
- [testing-library `type` API](https://testing-library.com/docs/user-event/utility/#type)

## userEvent.clear [​](index.md#userevent-clear)

ts

```
function clear(element: Element | Locator, options?: UserEventClearOptions): Promise<void>
```

This method clears the input element content.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('clears input', async () => {
  const input = page.getByRole('input')
  await userEvent.fill(input, 'foo')
  expect(input).toHaveValue('foo')
  await userEvent.clear(input)
  // or you can access it directly on the locator
  await input.clear()
  expect(input).toHaveValue('')
})
```

References:

- [Playwright `locator.clear` API](https://playwright.dev/docs/api/class-locator#locator-clear)
- [WebdriverIO `element.clearValue` API](https://webdriver.io/docs/api/element/clearValue)
- [testing-library `clear` API](https://testing-library.com/docs/user-event/utility/#clear)

## userEvent.selectOptions [​](index.md#userevent-selectoptions)

ts

```
function selectOptions(
  element: Element | Locator,
  values:
    | HTMLElement
    | HTMLElement[]
    | Locator
    | Locator[]
    | string
    | string[],
  options?: UserEventSelectOptions,
): Promise<void>
```

The `userEvent.selectOptions` allows selecting a value in a `<select>` element.

WARNING

If select element doesn't have [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-multiple) attribute, Vitest will select only the first element in the array.

Unlike `@testing-library`, Vitest doesn't support [listbox](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role) at the moment, but we plan to add support for it in the future.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('clears input', async () => {
  const select = page.getByRole('select')
  await userEvent.selectOptions(select, 'Option 1')
  // or you can access it directly on the locator
  await select.selectOptions('Option 1')
  expect(select).toHaveValue('option-1')
  await userEvent.selectOptions(select, 'option-1')
  expect(select).toHaveValue('option-1')
  await userEvent.selectOptions(select, [
    page.getByRole('option', { name: 'Option 1' }),
    page.getByRole('option', { name: 'Option 2' }),
  ])
  expect(select).toHaveValue(['option-1', 'option-2'])
})
```

WARNING

`webdriverio` provider doesn't support selecting multiple elements because it doesn't provide API to do so.

References:

- [Playwright `locator.selectOption` API](https://playwright.dev/docs/api/class-locator#locator-select-option)
- [WebdriverIO `element.selectByIndex` API](https://webdriver.io/docs/api/element/selectByIndex)
- [testing-library `selectOptions` API](https://testing-library.com/docs/user-event/utility/#-selectoptions-deselectoptions)

## userEvent.hover [​](index.md#userevent-hover)

ts

```
function hover(
  element: Element | Locator,
  options?: UserEventHoverOptions,
): Promise<void>
```

This method moves the cursor position to the selected element. Please refer to your provider's documentation for detailed explanation about how this method works.

WARNING

If you are using `webdriverio` provider, the cursor will move to the center of the element by default.

If you are using `playwright` provider, the cursor moves to "some" visible point of the element.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('hovers logo element', async () => {
  const logo = page.getByRole('img', { name: /logo/ })
  await userEvent.hover(logo)
  // or you can access it directly on the locator
  await logo.hover()
})
```

References:

- [Playwright `locator.hover` API](https://playwright.dev/docs/api/class-locator#locator-hover)
- [WebdriverIO `element.moveTo` API](https://webdriver.io/docs/api/element/moveTo/)
- [testing-library `hover` API](https://testing-library.com/docs/user-event/convenience/#hover)

## userEvent.unhover [​](index.md#userevent-unhover)

ts

```
function unhover(
  element: Element | Locator,
  options?: UserEventHoverOptions,
): Promise<void>
```

This works the same as [`userEvent.hover`](index.md#userevent-hover), but moves the cursor to the `document.body` element instead.

WARNING

By default, the cursor position is in "some" visible place (in `playwright` provider) or in the center (in `webdriverio` provider) of the body element, so if the currently hovered element is already in the same position, this method will have no effect.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('unhover logo element', async () => {
  const logo = page.getByRole('img', { name: /logo/ })
  await userEvent.unhover(logo)
  // or you can access it directly on the locator
  await logo.unhover()
})
```

References:

- [Playwright `locator.hover` API](https://playwright.dev/docs/api/class-locator#locator-hover)
- [WebdriverIO `element.moveTo` API](https://webdriver.io/docs/api/element/moveTo/)
- [testing-library `hover` API](https://testing-library.com/docs/user-event/convenience/#hover)

## userEvent.upload [​](index.md#userevent-upload)

ts

```
function upload(
  element: Element | Locator,
  files: string[] | string | File[] | File,
  options?: UserEventUploadOptions,
): Promise<void>
```

Change a file input element to have the specified files.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('can upload a file', async () => {
  const input = page.getByRole('button', { name: /Upload files/ })
  const file = new File(['file'], 'file.png', { type: 'image/png' })
  await userEvent.upload(input, file)
  // or you can access it directly on the locator
  await input.upload(file)
  // you can also use file paths relative to the test file
  await userEvent.upload(input, '../fixtures/file.png')
})
```

WARNING

`webdriverio` provider supports this command only in `chrome` and `edge` browsers. It also only supports string types at the moment.

References:

- [Playwright `locator.setInputFiles` API](https://playwright.dev/docs/api/class-locator#locator-set-input-files)
- [WebdriverIO `browser.uploadFile` API](https://webdriver.io/docs/api/browser/uploadFile)
- [testing-library `upload` API](https://testing-library.com/docs/user-event/utility/#upload)

## userEvent.dragAndDrop [​](index.md#userevent-draganddrop)

ts

```
function dragAndDrop(
  source: Element | Locator,
  target: Element | Locator,
  options?: UserEventDragAndDropOptions,
): Promise<void>
```

Drags the source element on top of the target element. Don't forget that the `source` element has to have the `draggable` attribute set to `true`.

ts

```
import { page, userEvent } from '@vitest/browser/context'
test('drag and drop works', async () => {
  const source = page.getByRole('img', { name: /logo/ })
  const target = page.getByTestId('logo-target')
  await userEvent.dragAndDrop(source, target)
  // or you can access it directly on the locator
  await source.dropTo(target)
  await expect.element(target).toHaveTextContent('Logo is processed')
})
```

WARNING

This API is not supported by the default `preview` provider.

References:

- [Playwright `frame.dragAndDrop` API](https://playwright.dev/docs/api/class-frame#frame-drag-and-drop)
- [WebdriverIO `element.dragAndDrop` API](https://webdriver.io/docs/api/element/dragAndDrop/)

## userEvent.copy [​](index.md#userevent-copy)

ts

```
function copy(): Promise<void>
```

Copy the selected text to the clipboard.

js

```
import { page, userEvent } from '@vitest/browser/context'
test('copy and paste', async () => {
  // write to 'source'
  await userEvent.click(page.getByPlaceholder('source'))
  await userEvent.keyboard('hello')
  // select and copy 'source'
  await userEvent.dblClick(page.getByPlaceholder('source'))
  await userEvent.copy()
  // paste to 'target'
  await userEvent.click(page.getByPlaceholder('target'))
  await userEvent.paste()
  await expect.element(page.getByPlaceholder('source')).toHaveTextContent('hello')
  await expect.element(page.getByPlaceholder('target')).toHaveTextContent('hello')
})
```

References:

- [testing-library `copy` API](https://testing-library.com/docs/user-event/convenience/#copy)

## userEvent.cut [​](index.md#userevent-cut)

ts

```
function cut(): Promise<void>
```

Cut the selected text to the clipboard.

js

```
import { page, userEvent } from '@vitest/browser/context'
test('copy and paste', async () => {
  // write to 'source'
  await userEvent.click(page.getByPlaceholder('source'))
  await userEvent.keyboard('hello')
  // select and cut 'source'
  await userEvent.dblClick(page.getByPlaceholder('source'))
  await userEvent.cut()
  // paste to 'target'
  await userEvent.click(page.getByPlaceholder('target'))
  await userEvent.paste()
  await expect.element(page.getByPlaceholder('source')).toHaveTextContent('')
  await expect.element(page.getByPlaceholder('target')).toHaveTextContent('hello')
})
```

References:

- [testing-library `cut` API](https://testing-library.com/docs/user-event/clipboard#cut)

## userEvent.paste [​](index.md#userevent-paste)

ts

```
function paste(): Promise<void>
```

Paste the text from the clipboard. See [`userEvent.copy`](index.md#userevent-copy) and [`userEvent.cut`](index.md#userevent-cut) for usage examples.

References:

- [testing-library `paste` API](https://testing-library.com/docs/user-event/clipboard#paste)

#### \_guide_browser_locators.md

> Source: https://vitest.dev/guide/browser/locators
> Scraped: 4/15/2025, 1:07:31 AM

## Locators [​](index.md#locators)

A locator is a representation of an element or a number of elements. Every locator is defined by a string called a selector. Vitest abstracts this selector by providing convenient methods that generate them behind the scenes.

The locator API uses a fork of [Playwright's locators](https://playwright.dev/docs/api/class-locator) called [Ivya](https://npmjs.com/ivya). However, Vitest provides this API to every [provider](_guide_browser_config.md#browser-provider), not just playwright.

## getByRole [​](index.md#getbyrole)

ts

```
function getByRole(
  role: ARIARole | string,
  options?: LocatorByRoleOptions,
): Locator
```

Creates a way to locate an element by its [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles), [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes) and [accessible name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name).

TIP

If you only query for a single element with `getByText('The name')` it's oftentimes better to use `getByRole(expectedRole, { name: 'The name' })`. The accessible name query does not replace other queries such as `*ByAltText` or `*ByTitle`. While the accessible name can be equal to these attributes, it does not replace the functionality of these attributes.

Consider the following DOM structure.

html

```
<h3>Sign up</h3>
<label>
  Login
  <input type="text" />
</label>
<label>
  Password
  <input type="password" />
</label>
<br/>
<button>Submit</button>
```

You can locate each element by its implicit role:

ts

```
await expect.element(
  page.getByRole('heading', { name: 'Sign up' })
).toBeVisible()
await page.getByRole('textbox', { name: 'Login' }).fill('admin')
await page.getByRole('textbox', { name: 'Password' }).fill('admin')
await page.getByRole('button', { name: /submit/i }).click()
```

WARNING

Roles are matched by string equality, without inheriting from the ARIA role hierarchy. As a result, querying a superclass role like `checkbox` will not include elements with a subclass role like `switch`.

By default, many semantic elements in HTML have a role; for example, `<input type="radio">` has the "radio" role. Non-semantic elements in HTML do not have a role; `<div>` and `<span>` without added semantics return `null`. The `role` attribute can provide semantics.

Providing roles via `role` or `aria-*` attributes to built-in elements that already have an implicit role is **highly discouraged** by ARIA guidelines.

##### Options [​](index.md#options)

- `exact: boolean`

  Whether the `name` is matched exactly: case-sensitive and whole-string. Disabled by default. This option is ignored if `name` is a regular expression. Note that exact match still trims whitespace.

  tsx

  ```
  <button>Hello World</button>
  page.getByRole('button', { name: 'hello world' }) // ✅
  page.getByRole('button', { name: 'hello world', exact: true }) // ❌
  page.getByRole('button', { name: 'Hello World', exact: true }) // ✅
  ```

- `checked: boolean`

  Should checked elements (set by `aria-checked` or `<input type="checkbox"/>`) be included or not. By default, the filter is not applied.

  See [`aria-checked`](https://www.w3.org/TR/wai-aria-1.2/#aria-checked) for more information

  tsx

  ```
  <>
    <button role="checkbox" aria-checked="true" />
    <input type="checkbox" checked />
  </>
  page.getByRole('checkbox', { checked: true }) // ✅
  page.getByRole('checkbox', { checked: false }) // ❌
  ```

- `disabled: boolean`

  Should disabled elements be included or not. By default, the filter is not applied. Note that unlike other attributes, `disable` state is inherited.

  See [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled) for more information

  tsx

  ```
  <input type="text" disabled />
  page.getByRole('textbox', { disabled: true }) // ✅
  page.getByRole('textbox', { disabled: false }) // ❌
  ```

- `expanded: boolean`

  Should expanded elements be included or not. By default, the filter is not applied.

  See [`aria-expanded`](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded) for more information

  tsx

  ```
  <a aria-expanded="true" href="example.com">Link</a>
  page.getByRole('link', { expanded: true }) // ✅
  page.getByRole('link', { expanded: false }) // ❌
  ```

- `includeHidden: boolean`

  Should elements that are [normally excluded](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion) from the accessibility tree be queried. By default, only non-hidden elements are matched by role selector.

  Note that roles `none` and `presentation` are always included.

  tsx

  ```
  <button style="display: none" />
  page.getByRole('button') // ❌
  page.getByRole('button', { includeHidden: false }) // ❌
  page.getByRole('button', { includeHidden: true }) // ✅
  ```

- `level: number`

  A number attribute that is usually present for `heading`, `listitem`, `row`, `treeitem` roles with default values for `<h1>-<h6>` elements. By default, the filter is not applied.

  See [`aria-level`](https://www.w3.org/TR/wai-aria-1.2/#aria-level) for more information

  tsx

  ```
  <>
    <h1>Heading Level One</h1>
    <div role="heading" aria-level="1">Second Heading Level One</div>
  </>
  page.getByRole('heading', { level: 1 }) // ✅
  page.getByRole('heading', { level: 2 }) // ❌
  ```

- `name: string | RegExp`

  [An accessible name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name). By default, matching is case-insensitive and searches for a substring. Use `exact` option to control this behavior.

  tsx

  ```
  <button>Click Me!</button>
  page.getByRole('button', { name: 'Click Me!' }) // ✅
  page.getByRole('button', { name: 'click me!' }) // ✅
  page.getByRole('button', { name: 'Click Me?' }) // ❌
  ```

- `pressed: boolean`

  Should pressed elements be included or not. By default, the filter is not applied.

  See [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed) for more information

  tsx

  ```
  <button aria-pressed="true">👍</button>
  page.getByRole('button', { pressed: true }) // ✅
  page.getByRole('button', { pressed: false }) // ❌
  ```

- `selected: boolean`

  Should selected elements be included or not. By default, the filter is not applied.

  See [`aria-selected`](https://www.w3.org/TR/wai-aria-1.2/#aria-selected) for more information

  tsx

  ```
  <button role="tab" aria-selected="true">Vue</button>
  page.getByRole('button', { selected: true }) // ✅
  page.getByRole('button', { selected: false }) // ❌
  ```

## getByAltText [​](index.md#getbyalttext)

ts

```
function getByAltText(
  text: string | RegExp,
  options?: LocatorOptions,
): Locator
```

Creates a locator capable of finding an element with an `alt` attribute that matches the text. Unlike testing-library's implementation, Vitest will match any element that has a matching `alt` attribute.

tsx

```
<img alt="Incredibles 2 Poster" src="/incredibles-2.png" />
page.getByAltText(/incredibles.*? poster/i) // ✅
page.getByAltText('non existing alt text') // ❌
```

#### Options [​](index.md#options-1)

- `exact: boolean`

  Whether the `text` is matched exactly: case-sensitive and whole-string. Disabled by default. This option is ignored if `text` is a regular expression. Note that exact match still trims whitespace.

## getByLabelText [​](index.md#getbylabeltext)

ts

```
function getByLabelText(
  text: string | RegExp,
  options?: LocatorOptions,
): Locator
```

Creates a locator capable of finding an element that has an associated label.

The `page.getByLabelText('Username')` locator will find every input in the example bellow:

html

```
// for/htmlFor relationship between label and form element id
<label for="username-input">Username</label>
<input id="username-input" />
// The aria-labelledby attribute with form elements
<label id="username-label">Username</label>
<input aria-labelledby="username-label" />
// Wrapper labels
<label>Username <input /></label>
// Wrapper labels where the label text is in another child element
<label>
  <span>Username</span>
  <input />
</label>
// aria-label attributes
// Take care because this is not a label that users can see on the page,
// so the purpose of your input must be obvious to visual users.
<input aria-label="Username" />
```

#### Options [​](index.md#options-2)

- `exact: boolean`

  Whether the `text` is matched exactly: case-sensitive and whole-string. Disabled by default. This option is ignored if `text` is a regular expression. Note that exact match still trims whitespace.

## getByPlaceholder [​](index.md#getbyplaceholder)

ts

```
function getByPlaceholder(
  text: string | RegExp,
  options?: LocatorOptions,
): Locator
```

Creates a locator capable of finding an element that has the specified `placeholder` attribute. Vitest will match any element that has a matching `placeholder` attribute, not just `input`.

tsx

```
<input placeholder="Username" />
page.getByPlaceholder('Username') // ✅
page.getByPlaceholder('not found') // ❌
```

WARNING

It is generally better to rely on a label using [`getByLabelText`](index.md#getbylabeltext) than a placeholder.

#### Options [​](index.md#options-3)

- `exact: boolean`

  Whether the `text` is matched exactly: case-sensitive and whole-string. Disabled by default. This option is ignored if `text` is a regular expression. Note that exact match still trims whitespace.

## getByText [​](index.md#getbytext)

ts

```
function getByText(
  text: string | RegExp,
  options?: LocatorOptions,
): Locator
```

Creates a locator capable of finding an element that contains the specified text. The text will be matched against TextNode's [`nodeValue`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue) or input's value if the type is `button` or `reset`. Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.

tsx

```
<a href="/about">About ℹ️</a>
page.getByText(/about/i) // ✅
page.getByText('about', { exact: true }) // ❌
```

TIP

This locator is useful for locating non-interactive elements. If you need to locate an interactive element, like a button or an input, prefer [`getByRole`](index.md#getbyrole).

#### Options [​](index.md#options-4)

- `exact: boolean`

  Whether the `text` is matched exactly: case-sensitive and whole-string. Disabled by default. This option is ignored if `text` is a regular expression. Note that exact match still trims whitespace.

## getByTitle [​](index.md#getbytitle)

ts

```
function getByTitle(
  text: string | RegExp,
  options?: LocatorOptions,
): Locator
```

Creates a locator capable of finding an element that has the specified `title` attribute. Unlike testing-library's `getByTitle`, Vitest cannot find `title` elements within an SVG.

tsx

```
<span title="Delete" id="2"></span>
page.getByTitle('Delete') // ✅
page.getByTitle('Create') // ❌
```

#### Options [​](index.md#options-5)

- `exact: boolean`

  Whether the `text` is matched exactly: case-sensitive and whole-string. Disabled by default. This option is ignored if `text` is a regular expression. Note that exact match still trims whitespace.

## getByTestId [​](index.md#getbytestid)

ts

```
function getByTestId(text: string | RegExp): Locator
```

Creates a locator capable of finding an element that matches the specified test id attribute. You can configure the attribute name with [`browser.locators.testIdAttribute`](_guide_browser_config.md#browser-locators-testidattribute).

tsx

```
<div data-testid="custom-element" />
page.getByTestId('custom-element') // ✅
page.getByTestId('non-existing-element') // ❌
```

WARNING

It is recommended to use this only after the other locators don't work for your use case. Using `data-testid` attributes does not resemble how your software is used and should be avoided if possible.

#### Options [​](index.md#options-6)

- `exact: boolean`

  Whether the `text` is matched exactly: case-sensitive and whole-string. Disabled by default. This option is ignored if `text` is a regular expression. Note that exact match still trims whitespace.

## nth [​](index.md#nth)

ts

```
function nth(index: number): Locator
```

This method returns a new locator that matches only a specific index within a multi-element query result. It's zero based, `nth(0)` selects the first element. Unlike `elements()[n]`, the `nth` locator will be retried until the element is present.

html

```
<div aria-label="one"><input/><input/><input/></div>
<div aria-label="two"><input/></div>
```

tsx

```
page.getByRole('textbox').nth(0) // ✅
page.getByRole('textbox').nth(4) // ❌
```

TIP

Before resorting to `nth`, you may find it useful to use chained locators to narrow down your search. Sometimes there is no better way to distinguish than by element position; although this can lead to flake, it's better than nothing.

tsx

```
page.getByLabel('two').getByRole('input') // ✅ better alternative to page.getByRole('textbox').nth(3)
page.getByLabel('one').getByRole('input') // ❌ too ambiguous
page.getByLabel('one').getByRole('input').nth(1) // ✅ pragmatic compromise
```

## first [​](index.md#first)

ts

```
function first(): Locator
```

This method returns a new locator that matches only the first index of a multi-element query result. It is sugar for `nth(0)`.

html

```
<input/> <input/> <input/>
```

tsx

```
page.getByRole('textbox').first() // ✅
```

## last [​](index.md#last)

ts

```
function last(): Locator
```

This method returns a new locator that matches only the last index of a multi-element query result. It is sugar for `nth(-1)`.

html

```
<input/> <input/> <input/>
```

tsx

```
page.getByRole('textbox').last() // ✅
```

## and [​](index.md#and)

ts

```
function and(locator: Locator): Locator
```

This method creates a new locator that matches both the parent and provided locator. The following example finds a button with a specific title:

ts

```
page.getByRole('button').and(page.getByTitle('Subscribe'))
```

## or [​](index.md#or)

ts

```
function or(locator: Locator): Locator
```

This method creates a new locator that matches either one or both locators.

WARNING

Note that if locator matches more than a single element, calling another method might throw an error if it expects a single element:

tsx

```
<>
  <button>Click me</button>
  <a href="https://vitest.dev">Error happened!</a>
</>
page.getByRole('button')
  .or(page.getByRole('link'))
  .click() // ❌ matches multiple elements
```

## filter [​](index.md#filter)

ts

```
function filter(options: LocatorOptions): Locator
```

This methods narrows down the locator according to the options, such as filtering by text. It can be chained to apply multiple filters.

### has [​](index.md#has)

- **Type:** `Locator`

This options narrows down the selector to match elements that contain other elements matching provided locator. For example, with this HTML:

html

```
<article>
  <div>Vitest</div>
</article>
<article>
  <div>Rolldown</div>
</article>
```

We can narrow down the locator to only find the `article` with `Vitest` text inside:

ts

```
page.getByRole('article').filter({ has: page.getByText('Vitest') }) // ✅
```

WARNING

Provided locator (`page.getByText('Vitest')` in the example) must be relative to the parent locator (`page.getByRole('article')` in the example). It will be queried starting with the parent locator, not the document root.

Meaning, you cannot pass down a locator that queries the element outside of the parent locator:

ts

```
page.getByText('Vitest').filter({ has: page.getByRole('article') }) // ❌
```

This example will fail because the `article` element is outside the element with `Vitest` text.

TIP

This method can be chained to narrow down the element even further:

ts

```
page.getByRole('article')
  .filter({ has: page.getByRole('button', { name: 'delete row' }) })
  .filter({ has: page.getByText('Vitest') })
```

### hasNot [​](index.md#hasnot)

- **Type:** `Locator`

This option narrows down the selector to match elements that do not contain other elements matching provided locator. For example, with this HTML:

html

```
<article>
  <div>Vitest</div>
</article>
<article>
  <div>Rolldown</div>
</article>
```

We can narrow down the locator to only find the `article` that doesn't have `Rolldown` inside.

ts

```
page.getByRole('article')
  .filter({ hasNot: page.getByText('Rolldown') }) // ✅
page.getByRole('article')
  .filter({ hasNot: page.getByText('Vitest') }) // ❌
```

WARNING

Note that provided locator is queried against the parent, not the document root, just like [`has`](index.md#has) option.

### hasText [​](index.md#hastext)

- **Type:** `string | RegExp`

This options narrows down the selector to only match elements that contain provided text somewhere inside. When the `string` is passed, matching is case-insensitive and searches for a substring.

html

```
<article>
  <div>Vitest</div>
</article>
<article>
  <div>Rolldown</div>
</article>
```

Both locators will find the same element because the search is case-insensitive:

ts

```
page.getByRole('article').filter({ hasText: 'Vitest' }) // ✅
page.getByRole('article').filter({ hasText: 'Vite' }) // ✅
```

### hasNotText [​](index.md#hasnottext)

- **Type:** `string | RegExp`

This options narrows down the selector to only match elements that do not contain provided text somewhere inside. When the `string` is passed, matching is case-insensitive and searches for a substring.

## Methods [​](index.md#methods)

All methods are asynchronous and must be awaited. Since Vitest 3, tests will fail if a method is not awaited.

### click [​](index.md#click)

ts

```
function click(options?: UserEventClickOptions): Promise<void>
```

Click on an element. You can use the options to set the cursor position.

ts

```
import { page } from '@vitest/browser/context'
await page.getByRole('img', { name: 'Rose' }).click()
```

- [See more at `userEvent.click`](_guide_browser_interactivity-api.md#userevent-click)

### dblClick [​](index.md#dblclick)

ts

```
function dblClick(options?: UserEventDoubleClickOptions): Promise<void>
```

Triggers a double click event on an element. You can use the options to set the cursor position.

ts

```
import { page } from '@vitest/browser/context'
await page.getByRole('img', { name: 'Rose' }).dblClick()
```

- [See more at `userEvent.dblClick`](_guide_browser_interactivity-api.md#userevent-dblclick)

### tripleClick [​](index.md#tripleclick)

ts

```
function tripleClick(options?: UserEventTripleClickOptions): Promise<void>
```

Triggers a triple click event on an element. Since there is no `tripleclick` in browser api, this method will fire three click events in a row.

ts

```
import { page } from '@vitest/browser/context'
await page.getByRole('img', { name: 'Rose' }).tripleClick()
```

- [See more at `userEvent.tripleClick`](_guide_browser_interactivity-api.md#userevent-tripleclick)

### clear [​](index.md#clear)

ts

```
function clear(options?: UserEventClearOptions): Promise<void>
```

Clears the input element content.

ts

```
import { page } from '@vitest/browser/context'
await page.getByRole('textbox', { name: 'Full Name' }).clear()
```

- [See more at `userEvent.clear`](_guide_browser_interactivity-api.md#userevent-clear)

### hover [​](index.md#hover)

ts

```
function hover(options?: UserEventHoverOptions): Promise<void>
```

Moves the cursor position to the selected element.

ts

```
import { page } from '@vitest/browser/context'
await page.getByRole('img', { name: 'Rose' }).hover()
```

- [See more at `userEvent.hover`](_guide_browser_interactivity-api.md#userevent-hover)

### unhover [​](index.md#unhover)

ts

```
function unhover(options?: UserEventHoverOptions): Promise<void>
```

This works the same as [`locator.hover`](index.md#hover), but moves the cursor to the `document.body` element instead.

ts

```
import { page } from '@vitest/browser/context'
await page.getByRole('img', { name: 'Rose' }).unhover()
```

- [See more at `userEvent.unhover`](_guide_browser_interactivity-api.md#userevent-unhover)

### fill [​](index.md#fill)

ts

```
function fill(text: string, options?: UserEventFillOptions): Promise<void>
```

Sets the value of the current `input`, `textarea` or `conteneditable` element.

ts

```
import { page } from '@vitest/browser/context'
await page.getByRole('input', { name: 'Full Name' }).fill('Mr. Bean')
```

- [See more at `userEvent.fill`](_guide_browser_interactivity-api.md#userevent-fill)

### dropTo [​](index.md#dropto)

ts

```
function dropTo(
  target: Locator,
  options?: UserEventDragAndDropOptions,
): Promise<void>
```

Drags the current element to the target location.

ts

```
import { page } from '@vitest/browser/context'
const paris = page.getByText('Paris')
const france = page.getByText('France')
await paris.dropTo(france)
```

- [See more at `userEvent.dragAndDrop`](_guide_browser_interactivity-api.md#userevent-draganddrop)

### selectOptions [​](index.md#selectoptions)

ts

```
function selectOptions(
  values:
    | HTMLElement
    | HTMLElement[]
    | Locator
    | Locator[]
    | string
    | string[],
  options?: UserEventSelectOptions,
): Promise<void>
```

Choose one or more values from a `<select>` element.

ts

```
import { page } from '@vitest/browser/context'
const languages = page.getByRole('select', { name: 'Languages' })
await languages.selectOptions('EN')
await languages.selectOptions(['ES', 'FR'])
await languages.selectOptions([
  languages.getByRole('option', { name: 'Spanish' }),
  languages.getByRole('option', { name: 'French' }),
])
```

- [See more at `userEvent.selectOptions`](_guide_browser_interactivity-api.md#userevent-selectoptions)

### screenshot [​](index.md#screenshot)

ts

```
function screenshot(options: LocatorScreenshotOptions & { base64: true }): Promise<{
  path: string
  base64: string
}>
function screenshot(options?: LocatorScreenshotOptions & { base64?: false }): Promise<string>
```

Creates a screenshot of the element matching the locator's selector.

You can specify the save location for the screenshot using the `path` option, which is relative to the current test file. If the `path` option is not set, Vitest will default to using [`browser.screenshotDirectory`](_guide_browser_config.md#browser-screenshotdirectory) (`__screenshot__` by default), along with the names of the file and the test to determine the screenshot's filepath.

If you also need the content of the screenshot, you can specify `base64: true` to return it alongside the filepath where the screenshot is saved.

ts

```
import { page } from '@vitest/browser/context'
const button = page.getByRole('button', { name: 'Click Me!' })
const path = await button.screenshot()
const { path, base64 } = await button.screenshot({
  path: './button-click-me.png',
  base64: true, // also return base64 string
})
// path - fullpath to the screenshot
// bas64 - base64 encoded string of the screenshot
```

### query [​](index.md#query)

ts

```
function query(): Element | null
```

This method returns a single element matching the locator's selector or `null` if no element is found.

If multiple elements match the selector, this method will throw an error. Use [`.elements()`](index.md#elements) when you need all matching DOM Elements or [`.all()`](index.md#all) if you need an array of locators matching the selector.

Consider the following DOM structure:

html

```
<div>Hello <span>World</span></div>
<div>Hello</div>
```

These locators will not throw an error:

ts

```
page.getByText('Hello World').query() // ✅ HTMLDivElement
page.getByText('Hello Germany').query() // ✅ null
page.getByText('World').query() // ✅ HTMLSpanElement
page.getByText('Hello', { exact: true }).query() // ✅ HTMLSpanElement
```

These locators will throw an error:

ts

```
// returns multiple elements
page.getByText('Hello').query() // ❌
page.getByText(/^Hello/).query() // ❌
```

### element [​](index.md#element)

ts

```
function element(): Element
```

This method returns a single element matching the locator's selector.

If _no element_ matches the selector, an error is thrown. Consider using [`.query()`](index.md#query) when you just need to check if the element exists.

If _multiple elements_ match the selector, an error is thrown. Use [`.elements()`](index.md#elements) when you need all matching DOM Elements or [`.all()`](index.md#all) if you need an array of locators matching the selector.

TIP

This method can be useful if you need to pass it down to an external library. It is called automatically when locator is used with `expect.element` every time the assertion is [retried](_guide_browser_assertion-api.md):

ts

```
await expect.element(page.getByRole('button')).toBeDisabled()
```

Consider the following DOM structure:

html

```
<div>Hello <span>World</span></div>
<div>Hello Germany</div>
<div>Hello</div>
```

These locators will not throw an error:

ts

```
page.getByText('Hello World').element() // ✅
page.getByText('Hello Germany').element() // ✅
page.getByText('World').element() // ✅
page.getByText('Hello', { exact: true }).element() // ✅
```

These locators will throw an error:

ts

```
// returns multiple elements
page.getByText('Hello').element() // ❌
page.getByText(/^Hello/).element() // ❌
// returns no elements
page.getByText('Hello USA').element() // ❌
```

### elements [​](index.md#elements)

ts

```
function elements(): Element[]
```

This method returns an array of elements matching the locator's selector.

This function never throws an error. If there are no elements matching the selector, this method will return an empty array.

Consider the following DOM structure:

html

```
<div>Hello <span>World</span></div>
<div>Hello</div>
```

These locators will always succeed:

ts

```
page.getByText('Hello World').elements() // ✅ [HTMLElement]
page.getByText('World').elements() // ✅ [HTMLElement]
page.getByText('Hello', { exact: true }).elements() // ✅ [HTMLElement]
page.getByText('Hello').element() // ✅ [HTMLElement, HTMLElement]
page.getByText('Hello USA').elements() // ✅ []
```

### all [​](index.md#all)

ts

```
function all(): Locator[]
```

This method returns an array of new locators that match the selector.

Internally, this method calls `.elements` and wraps every element using [`page.elementLocator`](_guide_browser_context.md#page).

- [See `locator.elements()`](index.md#elements)

## Properties [​](index.md#properties)

### selector [​](index.md#selector)

The `selector` is a string that will be used to locate the element by the browser provider. Playwright will use a `playwright` locator syntax while `preview` and `webdriverio` will use CSS.

DANGER

You should not use this string in your test code. The `selector` string should only be used when working with the Commands API:

commands.ts

ts

```
import type { BrowserCommand } from 'vitest/node'
const test: BrowserCommand<string> = function test(context, selector) {
  // playwright
  await context.iframe.locator(selector).click()
  // webdriverio
  await context.browser.$(selector).click()
}
```

example.test.ts

ts

```
import { test } from 'vitest'
import { commands, page } from '@vitest/browser/context'
test('works correctly', async () => {
  await commands.test(page.getByText('Hello').selector) // ✅
  // vitest will automatically unwrap it to a string
  await commands.test(page.getByText('Hello')) // ✅
})
```

#### \_guide_browser_multiple-setups.md

> Source: https://vitest.dev/guide/browser/multiple-setups
> Scraped: 4/15/2025, 1:07:31 AM

## Multiple Setups [​](index.md#multiple-setups)

Since Vitest 3, you can specify several different browser setups using the new [`browser.instances`](_guide_browser_config.md#browser-instances) option.

The main advantage of using the `browser.instances` over the [workspace](_guide_workspace.md) is improved caching. Every project will use the same Vite server meaning the file transform and [dependency pre-bundling](https://vite.dev/guide/dep-pre-bundling.html) has to happen only once.

## Several Browsers [​](index.md#several-browsers)

You can use the `browser.instances` field to specify options for different browsers. For example, if you want to run the same tests in different browsers, the minimal configuration will look like this:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      instances: [
        { browser: 'chromium' },
        { browser: 'firefox' },
        { browser: 'webkit' },
      ],
    },
  },
})
```

## Different Setups [​](index.md#different-setups)

You can also specify different config options independently from the browser (although, the instances _can_ also have `browser` fields):

vitest.config.tsexample.test.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      instances: [
        {
          browser: 'chromium',
          name: 'chromium-1',
          setupFiles: ['./ratio-setup.ts'],
          provide: {
            ratio: 1,
          }
        },
        {
          browser: 'chromium',
          name: 'chromium-2',
          provide: {
            ratio: 2,
          }
        },
      ],
    },
  },
})
```

ts

```
import { expect, inject, test } from 'vitest'
import { globalSetupModifier } from './example.js'
test('ratio works', () => {
  expect(inject('ratio') * globalSetupModifier).toBe(14)
})
```

In this example Vitest will run all tests in `chromium` browser, but execute a `'./ratio-setup.ts'` file only in the first configuration and inject a different `ratio` value depending on the [`provide` field](_config_.md#provide).

WARNING

Note that you need to define the custom `name` value if you are using the same browser name because Vitest will assign the `browser` as the project name otherwise.

## Filtering [​](index.md#filtering)

You can filter what projects to run with the [`--project` flag](_guide_cli.md#project). Vitest will automatically assign the browser name as a project name if it is not assigned manually. If the root config already has a name, Vitest will merge them: `custom` -> `custom (browser)`.

shell

```
$ vitest --project=chromium
```

defaultcustom

ts

```
export default defineConfig({
  test: {
    browser: {
      instances: [
        // name: chromium
        { browser: 'chromium' },
        // name: custom
        { browser: 'firefox', name: 'custom' },
      ]
    }
  }
})
```

ts

```
export default defineConfig({
  test: {
    name: 'custom',
    browser: {
      instances: [
        // name: custom (chromium)
        { browser: 'chromium' },
        // name: manual
        { browser: 'firefox', name: 'manual' },
      ]
    }
  }
})
```

WARNING

Vitest cannot run multiple instances that have `headless` mode set to `false` (the default behaviour). During development, you can select what project to run in your terminal:

shell

```
? Found multiple projects that run browser tests in headed mode: "chromium", "firefox".
Vitest cannot run multiple headed browsers at the same time. Select a single project
to run or cancel and run tests with "headless: true" option. Note that you can also
start tests with --browser=name or --project=name flag. › - Use arrow-keys. Return to submit.
❯   chromium
    firefox
```

If you have several non-headless projects in CI (i.e. the `headless: false` is set manually in the config and not overridden in CI env), Vitest will fail the run and won't start any tests.

The ability to run tests in headless mode is not affected by this. You can still run all instances in parallel as long as they don't have `headless: false`.

#### \_guide_browser_playwright.md

> Source: https://vitest.dev/guide/browser/playwright
> Scraped: 4/15/2025, 1:07:30 AM

## Configuring Playwright [​](index.md#configuring-playwright)

By default, TypeScript doesn't recognize providers options and extra `expect` properties. Make sure to reference `@vitest/browser/providers/playwright` so TypeScript can pick up definitions for custom options:

vitest.shims.d.ts

ts

```
/// <reference types="@vitest/browser/providers/playwright" />
```

Alternatively, you can also add it to `compilerOptions.types` field in your `tsconfig.json` file. Note that specifying anything in this field will disable [auto loading](https://www.typescriptlang.org/tsconfig/#types) of `@types/*` packages.

tsconfig.json

json

```
{
  "compilerOptions": {
    "types": ["@vitest/browser/providers/playwright"]
  }
}
```

Vitest opens a single page to run all tests in the same file. You can configure the `launch` and `context` properties in `instances`:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    browser: {
      instances: [
        {
          browser: 'firefox',
          launch: {},
          context: {},
        },
      ],
    },
  },
})
```

WARNING

Before Vitest 3, these options were located on `test.browser.providerOptions` property:

vitest.config.ts

ts

```
export default defineConfig({
  test: {
    browser: {
      providerOptions: {
        launch: {},
        context: {},
      },
    },
  },
})
```

`providerOptions` is deprecated in favour of `instances`.

## launch [​](index.md#launch)

These options are directly passed down to `playwright[browser].launch` command. You can read more about the command and available arguments in the [Playwright documentation](https://playwright.dev/docs/api/class-browsertype#browser-type-launch).

WARNING

Vitest will ignore `launch.headless` option. Instead, use [`test.browser.headless`](_guide_browser_config.md#browser-headless).

Note that Vitest will push debugging flags to `launch.args` if [`--inspect`](_guide_cli.md#inspect) is enabled.

## context [​](index.md#context)

Vitest creates a new context for every test file by calling [`browser.newContext()`](https://playwright.dev/docs/api/class-browsercontext). You can configure this behaviour by specifying [custom arguments](https://playwright.dev/docs/api/class-apirequest#api-request-new-context).

TIP

Note that the context is created for every _test file_, not every _test_ like in playwright test runner.

WARNING

Vitest always sets `ignoreHTTPSErrors` to `true` in case your server is served via HTTPS and `serviceWorkers` to `'allow'` to support module mocking via [MSW](https://mswjs.io/).

It is also recommended to use [`test.browser.viewport`](_guide_browser_config.md#browser-headless) instead of specifying it here as it will be lost when tests are running in headless mode.

## `actionTimeout` 3.0.0+ [​](index.md#actiontimeout-3-0-0)

- **Default:** no timeout, 1 second before 3.0.0

This value configures the default timeout it takes for Playwright to wait until all accessibility checks pass and [the action](_guide_browser_interactivity-api.md) is actually done.

You can also configure the action timeout per-action:

ts

```
import { page, userEvent } from '@vitest/browser/context'
await userEvent.click(page.getByRole('button'), {
  timeout: 1_000,
})
```

#### \_guide_browser_webdriverio.md

> Source: https://vitest.dev/guide/browser/webdriverio
> Scraped: 4/15/2025, 1:07:30 AM

## Configuring WebdriverIO [​](index.md#configuring-webdriverio)

Playwright vs WebdriverIO

If you do not already use WebdriverIO in your project, we recommend starting with [Playwright](_guide_browser_playwright.md) as it is easier to configure and has more flexible API.

By default, TypeScript doesn't recognize providers options and extra `expect` properties. Make sure to reference `@vitest/browser/providers/webdriverio` so TypeScript can pick up definitions for custom options:

vitest.shims.d.ts

ts

```
/// <reference types="@vitest/browser/providers/webdriverio" />
```

Alternatively, you can also add it to `compilerOptions.types` field in your `tsconfig.json` file. Note that specifying anything in this field will disable [auto loading](https://www.typescriptlang.org/tsconfig/#types) of `@types/*` packages.

tsconfig.json

json

```
{
  "compilerOptions": {
    "types": ["@vitest/browser/providers/webdriverio"]
  }
}
```

Vitest opens a single page to run all tests in the same file. You can configure any property specified in `RemoteOptions` in `instances`:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    browser: {
      instances: [
        {
          browser: 'chrome',
          capabilities: {
            browserVersion: 86,
            platformName: 'Windows 10',
          },
        },
      ],
    },
  },
})
```

WARNING

Before Vitest 3, these options were located on `test.browser.providerOptions` property:

vitest.config.ts

ts

```
export default defineConfig({
  test: {
    browser: {
      providerOptions: {
        capabilities: {},
      },
    },
  },
})
```

`providerOptions` is deprecated in favour of `instances`.

You can find most available options in the [WebdriverIO documentation](https://webdriver.io/docs/configuration/). Note that Vitest will ignore all test runner options because we only use `webdriverio`'s browser capabilities.

TIP

Most useful options are located on `capabilities` object. WebdriverIO allows nested capabilities, but Vitest will ignore those options because we rely on a different mechanism to spawn several browsers.

Note that Vitest will ignore `capabilities.browserName`. Use [`test.browser.instances.name`](_guide_browser_config.md#browser-capabilities-name) instead.

#### \_guide_browser_why.md

> Source: https://vitest.dev/guide/browser/why
> Scraped: 4/15/2025, 1:07:30 AM

## Why Browser Mode [​](index.md#why-browser-mode)

## Motivation [​](index.md#motivation)

We developed the Vitest browser mode feature to help improve testing workflows and achieve more accurate and reliable test results. This experimental addition to our testing API allows developers to run tests in a native browser environment. In this section, we'll explore the motivations behind this feature and its benefits for testing.

### Different Ways of Testing [​](index.md#different-ways-of-testing)

There are different ways to test JavaScript code. Some testing frameworks simulate browser environments in Node.js, while others run tests in real browsers. In this context, [jsdom](https://www.npmjs.com/package/jsdom) is an example of a spec implementation that simulates a browser environment by being used with a test runner like Jest or Vitest, while other testing tools such as [WebdriverIO](https://webdriver.io/) or [Cypress](https://www.cypress.io/) allow developers to test their applications in a real browser or in case of [Playwright](https://playwright.dev/) provide you a browser engine.

### The Simulation Caveat [​](index.md#the-simulation-caveat)

Testing JavaScript programs in simulated environments such as jsdom or happy-dom has simplified the test setup and provided an easy-to-use API, making them suitable for many projects and increasing confidence in test results. However, it is crucial to keep in mind that these tools only simulate a browser environment and not an actual browser, which may result in some discrepancies between the simulated environment and the real environment. Therefore, false positives or negatives in test results may occur.

To achieve the highest level of confidence in our tests, it's crucial to test in a real browser environment. This is why we developed the browser mode feature in Vitest, allowing developers to run tests natively in a browser and gain more accurate and reliable test results. With browser-level testing, developers can be more confident that their application will work as intended in a real-world scenario.

## Drawbacks [​](index.md#drawbacks)

When using Vitest browser, it is important to consider the following drawbacks:

### Early Development [​](index.md#early-development)

The browser mode feature of Vitest is still in its early stages of development. As such, it may not yet be fully optimized, and there may be some bugs or issues that have not yet been ironed out. It is recommended that users augment their Vitest browser experience with a standalone browser-side test runner like WebdriverIO, Cypress or Playwright.

### Longer Initialization [​](index.md#longer-initialization)

Vitest browser requires spinning up the provider and the browser during the initialization process, which can take some time. This can result in longer initialization times compared to other testing patterns.

#### \_guide_cli.md

> Source: https://vitest.dev/guide/cli
> Scraped: 4/15/2025, 1:07:27 AM

## Command Line Interface [​](index.md#command-line-interface)

## Commands [​](index.md#commands)

### `vitest` [​](index.md#vitest)

Start Vitest in the current directory. Will enter the watch mode in development environment and run mode in CI automatically.

You can pass an additional argument as the filter of the test files to run. For example:

Will run only the test file that contains `foobar` in their paths. This filter only checks inclusion and doesn't support regexp or glob patterns (unless your terminal processes it before Vitest receives the filter).

Since Vitest 3, you can also specify the test by filename and line number:

bash

```
$ vitest basic/foo.test.ts:10
```

WARNING

Note that Vitest requires the full filename for this feature to work. It can be relative to the current working directory or an absolute file path.

bash

```
$ vitest basic/foo.js:10 # ✅

$ vitest ./basic/foo.js:10 # ✅

$ vitest /users/project/basic/foo.js:10 # ✅

$ vitest foo:10 # ❌

$ vitest ./basic/foo:10 # ❌
```

At the moment Vitest also doesn't support ranges:

bash

```
$ vitest basic/foo.test.ts:10, basic/foo.test.ts:25 # ✅

$ vitest basic/foo.test.ts:10-25 # ❌
```

### `vitest run` [​](index.md#vitest-run)

Perform a single run without watch mode.

### `vitest watch` [​](index.md#vitest-watch)

Run all test suites but watch for changes and rerun tests when they change. Same as calling `vitest` without an argument. Will fallback to `vitest run` in CI.

### `vitest dev` [​](index.md#vitest-dev)

Alias to `vitest watch`.

### `vitest related` [​](index.md#vitest-related)

Run only tests that cover a list of source files. Works with static imports (e.g., `import('./index.js')` or `import index from './index.js`), but not the dynamic ones (e.g., `import(filepath)`). All files should be relative to root folder.

Useful to run with [`lint-staged`](https://github.com/okonet/lint-staged) or with your CI setup.

bash

```
vitest related /src/index.ts /src/hello-world.js
```

TIP

Don't forget that Vitest runs with enabled watch mode by default. If you are using tools like `lint-staged`, you should also pass `--run` option, so that command can exit normally.

.lintstagedrc.js

js

```
export default {
  '*.{js,ts}': 'vitest related --run',
}
```

### `vitest bench` [​](index.md#vitest-bench)

Run only [benchmark](_guide_features.md#benchmarking) tests, which compare performance results.

### `vitest init` [​](index.md#vitest-init)

`vitest init <name>` can be used to setup project configuration. At the moment, it only supports [`browser`](_guide_browser_.md) value:

### `vitest list` [​](index.md#vitest-list)

`vitest list` command inherits all `vitest` options to print the list of all matching tests. This command ignores `reporters` option. By default, it will print the names of all tests that matched the file filter and name pattern:

shell

```
vitest list filename.spec.ts -t="some-test"
```

txt

```
describe > some-test
describe > some-test > test 1
describe > some-test > test 2
```

You can pass down `--json` flag to print tests in JSON format or save it in a separate file:

bash

```
vitest list filename.spec.ts -t="some-test" --json=./file.json
```

If `--json` flag doesn't receive a value, it will output the JSON into stdout.

You also can pass down `--filesOnly` flag to print the test files only:

bash

```
vitest list --filesOnly
```

txt

```
tests/test1.test.ts
tests/test2.test.ts
```

## Options [​](index.md#options)

TIP

Vitest supports both camel case and kebab case for CLI arguments. For example, `--passWithNoTests` and `--pass-with-no-tests` will both work (`--no-color` and `--inspect-brk` are the exceptions).

Vitest also supports different ways of specifying the value: `--reporter dot` and `--reporter=dot` are both valid.

If option supports an array of values, you need to pass the option multiple times:

```
vitest --reporter=dot --reporter=default
```

Boolean options can be negated with `no-` prefix. Specifying the value as `false` also works:

```
vitest --no-api
vitest --api=false
```

### root [​](index.md#root)

- **CLI:** `-r, --root <path>`
- **Config:** [root](_config_.md#root)

Root path

### config [​](index.md#config)

- **CLI:** `-c, --config <path>`

Path to config file

### update [​](index.md#update)

- **CLI:** `-u, --update`
- **Config:** [update](_config_.md#update)

Update snapshot

### watch [​](index.md#watch)

- **CLI:** `-w, --watch`
- **Config:** [watch](_config_.md#watch)

Enable watch mode

### testNamePattern [​](index.md#testnamepattern)

- **CLI:** `-t, --testNamePattern <pattern>`
- **Config:** [testNamePattern](_config_.md#testnamepattern)

Run tests with full names matching the specified regexp pattern

### dir [​](index.md#dir)

- **CLI:** `--dir <path>`
- **Config:** [dir](_config_.md#dir)

Base directory to scan for the test files

### ui [​](index.md#ui)

- **CLI:** `--ui`
- **Config:** [ui](_config_.md#ui)

Enable UI

### open [​](index.md#open)

- **CLI:** `--open`
- **Config:** [open](_config_.md#open)

Open UI automatically (default: `!process.env.CI`)

### api.port [​](index.md#api-port)

- **CLI:** `--api.port [port]`

Specify server port. Note if the port is already being used, Vite will automatically try the next available port so this may not be the actual port the server ends up listening on. If true will be set to `51204`

### api.host [​](index.md#api-host)

- **CLI:** `--api.host [host]`

Specify which IP addresses the server should listen on. Set this to `0.0.0.0` or `true` to listen on all addresses, including LAN and public addresses

### api.strictPort [​](index.md#api-strictport)

- **CLI:** `--api.strictPort`

Set to true to exit if port is already in use, instead of automatically trying the next available port

### silent [​](index.md#silent)

- **CLI:** `--silent [value]`
- **Config:** [silent](_config_.md#silent)

Silent console output from tests. Use `'passed-only'` to see logs from failing tests only.

### hideSkippedTests [​](index.md#hideskippedtests)

- **CLI:** `--hideSkippedTests`

Hide logs for skipped tests

### reporters [​](index.md#reporters)

- **CLI:** `--reporter <name>`
- **Config:** [reporters](_config_.md#reporters)

Specify reporters

### outputFile [​](index.md#outputfile)

- **CLI:** `--outputFile <filename/-s>`
- **Config:** [outputFile](_config_.md#outputfile)

Write test results to a file when supporter reporter is also specified, use cac's dot notation for individual outputs of multiple reporters (example: `--outputFile.tap=./tap.txt`)

### coverage.all [​](index.md#coverage-all)

- **CLI:** `--coverage.all`
- **Config:** [coverage.all](_config_.md#coverage-all)

Whether to include all files, including the untested ones into report

### coverage.provider [​](index.md#coverage-provider)

- **CLI:** `--coverage.provider <name>`
- **Config:** [coverage.provider](_config_.md#coverage-provider)

Select the tool for coverage collection, available values are: "v8", "istanbul" and "custom"

### coverage.enabled [​](index.md#coverage-enabled)

- **CLI:** `--coverage.enabled`
- **Config:** [coverage.enabled](_config_.md#coverage-enabled)

Enables coverage collection. Can be overridden using the `--coverage` CLI option (default: `false`)

### coverage.include [​](index.md#coverage-include)

- **CLI:** `--coverage.include <pattern>`
- **Config:** [coverage.include](_config_.md#coverage-include)

Files included in coverage as glob patterns. May be specified more than once when using multiple patterns (default: `**`)

### coverage.exclude [​](index.md#coverage-exclude)

- **CLI:** `--coverage.exclude <pattern>`
- **Config:** [coverage.exclude](_config_.md#coverage-exclude)

Files to be excluded in coverage. May be specified more than once when using multiple extensions (default: Visit [`coverage.exclude`](_config_.md#coverage-exclude))

### coverage.extension [​](index.md#coverage-extension)

- **CLI:** `--coverage.extension <extension>`
- **Config:** [coverage.extension](_config_.md#coverage-extension)

Extension to be included in coverage. May be specified more than once when using multiple extensions (default: `[".js", ".cjs", ".mjs", ".ts", ".mts", ".tsx", ".jsx", ".vue", ".svelte"]`)

### coverage.clean [​](index.md#coverage-clean)

- **CLI:** `--coverage.clean`
- **Config:** [coverage.clean](_config_.md#coverage-clean)

Clean coverage results before running tests (default: true)

### coverage.cleanOnRerun [​](index.md#coverage-cleanonrerun)

- **CLI:** `--coverage.cleanOnRerun`
- **Config:** [coverage.cleanOnRerun](_config_.md#coverage-cleanonrerun)

Clean coverage report on watch rerun (default: true)

### coverage.reportsDirectory [​](index.md#coverage-reportsdirectory)

- **CLI:** `--coverage.reportsDirectory <path>`
- **Config:** [coverage.reportsDirectory](_config_.md#coverage-reportsdirectory)

Directory to write coverage report to (default: ./coverage)

### coverage.reporter [​](index.md#coverage-reporter)

- **CLI:** `--coverage.reporter <name>`
- **Config:** [coverage.reporter](_config_.md#coverage-reporter)

Coverage reporters to use. Visit [`coverage.reporter`](_config_.md#coverage-reporter) for more information (default: `["text", "html", "clover", "json"]`)

### coverage.reportOnFailure [​](index.md#coverage-reportonfailure)

- **CLI:** `--coverage.reportOnFailure`
- **Config:** [coverage.reportOnFailure](_config_.md#coverage-reportonfailure)

Generate coverage report even when tests fail (default: `false`)

### coverage.allowExternal [​](index.md#coverage-allowexternal)

- **CLI:** `--coverage.allowExternal`
- **Config:** [coverage.allowExternal](_config_.md#coverage-allowexternal)

Collect coverage of files outside the project root (default: `false`)

### coverage.skipFull [​](index.md#coverage-skipfull)

- **CLI:** `--coverage.skipFull`
- **Config:** [coverage.skipFull](_config_.md#coverage-skipfull)

Do not show files with 100% statement, branch, and function coverage (default: `false`)

### coverage.thresholds.100 [​](index.md#coverage-thresholds-100)

- **CLI:** `--coverage.thresholds.100`
- **Config:** [coverage.thresholds.100](_config_.md#coverage-thresholds-100)

Shortcut to set all coverage thresholds to 100 (default: `false`)

### coverage.thresholds.perFile [​](index.md#coverage-thresholds-perfile)

- **CLI:** `--coverage.thresholds.perFile`
- **Config:** [coverage.thresholds.perFile](_config_.md#coverage-thresholds-perfile)

Check thresholds per file. See `--coverage.thresholds.lines`, `--coverage.thresholds.functions`, `--coverage.thresholds.branches` and `--coverage.thresholds.statements` for the actual thresholds (default: `false`)

### coverage.thresholds.autoUpdate [​](index.md#coverage-thresholds-autoupdate)

- **CLI:** `--coverage.thresholds.autoUpdate`
- **Config:** [coverage.thresholds.autoUpdate](_config_.md#coverage-thresholds-autoupdate)

Update threshold values: "lines", "functions", "branches" and "statements" to configuration file when current coverage is above the configured thresholds (default: `false`)

### coverage.thresholds.lines [​](index.md#coverage-thresholds-lines)

- **CLI:** `--coverage.thresholds.lines <number>`

Threshold for lines. Visit [istanbuljs](https://github.com/istanbuljs/nyc#coverage-thresholds) for more information. This option is not available for custom providers

### coverage.thresholds.functions [​](index.md#coverage-thresholds-functions)

- **CLI:** `--coverage.thresholds.functions <number>`

Threshold for functions. Visit [istanbuljs](https://github.com/istanbuljs/nyc#coverage-thresholds) for more information. This option is not available for custom providers

### coverage.thresholds.branches [​](index.md#coverage-thresholds-branches)

- **CLI:** `--coverage.thresholds.branches <number>`

Threshold for branches. Visit [istanbuljs](https://github.com/istanbuljs/nyc#coverage-thresholds) for more information. This option is not available for custom providers

### coverage.thresholds.statements [​](index.md#coverage-thresholds-statements)

- **CLI:** `--coverage.thresholds.statements <number>`

Threshold for statements. Visit [istanbuljs](https://github.com/istanbuljs/nyc#coverage-thresholds) for more information. This option is not available for custom providers

### coverage.ignoreClassMethods [​](index.md#coverage-ignoreclassmethods)

- **CLI:** `--coverage.ignoreClassMethods <name>`
- **Config:** [coverage.ignoreClassMethods](_config_.md#coverage-ignoreclassmethods)

Array of class method names to ignore for coverage. Visit [istanbuljs](https://github.com/istanbuljs/nyc#ignoring-methods) for more information. This option is only available for the istanbul providers (default: `[]`)

### coverage.processingConcurrency [​](index.md#coverage-processingconcurrency)

- **CLI:** `--coverage.processingConcurrency <number>`
- **Config:** [coverage.processingConcurrency](_config_.md#coverage-processingconcurrency)

Concurrency limit used when processing the coverage results. (default min between 20 and the number of CPUs)

### coverage.customProviderModule [​](index.md#coverage-customprovidermodule)

- **CLI:** `--coverage.customProviderModule <path>`
- **Config:** [coverage.customProviderModule](_config_.md#coverage-customprovidermodule)

Specifies the module name or path for the custom coverage provider module. Visit [Custom Coverage Provider](_guide_coverage.md#custom-coverage-provider) for more information. This option is only available for custom providers

### coverage.watermarks.statements [​](index.md#coverage-watermarks-statements)

- **CLI:** `--coverage.watermarks.statements <watermarks>`

High and low watermarks for statements in the format of `<high>,<low>`

### coverage.watermarks.lines [​](index.md#coverage-watermarks-lines)

- **CLI:** `--coverage.watermarks.lines <watermarks>`

High and low watermarks for lines in the format of `<high>,<low>`

### coverage.watermarks.branches [​](index.md#coverage-watermarks-branches)

- **CLI:** `--coverage.watermarks.branches <watermarks>`

High and low watermarks for branches in the format of `<high>,<low>`

### coverage.watermarks.functions [​](index.md#coverage-watermarks-functions)

- **CLI:** `--coverage.watermarks.functions <watermarks>`

High and low watermarks for functions in the format of `<high>,<low>`

### mode [​](index.md#mode)

- **CLI:** `--mode <name>`
- **Config:** [mode](_config_.md#mode)

Override Vite mode (default: `test` or `benchmark`)

### workspace [​](index.md#workspace)

- **CLI:** `--workspace <path>`
- **Config:** [workspace](_config_.md#workspace)

Path to a workspace configuration file

### isolate [​](index.md#isolate)

- **CLI:** `--isolate`
- **Config:** [isolate](_config_.md#isolate)

Run every test file in isolation. To disable isolation, use `--no-isolate` (default: `true`)

### globals [​](index.md#globals)

- **CLI:** `--globals`
- **Config:** [globals](_config_.md#globals)

Inject apis globally

### dom [​](index.md#dom)

- **CLI:** `--dom`

Mock browser API with happy-dom

### browser.enabled [​](index.md#browser-enabled)

- **CLI:** `--browser.enabled`
- **Config:** [browser.enabled](_guide_browser_config.md#browser-enabled)

Run tests in the browser. Equivalent to `--browser.enabled` (default: `false`)

### browser.name [​](index.md#browser-name)

- **CLI:** `--browser.name <name>`
- **Config:** [browser.name](_guide_browser_config.md#browser-name)

Run all tests in a specific browser. Some browsers are only available for specific providers (see `--browser.provider`). Visit [`browser.name`](_guide_browser_config_.md#browser-name) for more information

### browser.headless [​](index.md#browser-headless)

- **CLI:** `--browser.headless`
- **Config:** [browser.headless](_guide_browser_config.md#browser-headless)

Run the browser in headless mode (i.e. without opening the GUI (Graphical User Interface)). If you are running Vitest in CI, it will be enabled by default (default: `process.env.CI`)

### browser.api.port [​](index.md#browser-api-port)

- **CLI:** `--browser.api.port [port]`
- **Config:** [browser.api.port](_guide_browser_config.md#browser-api-port)

Specify server port. Note if the port is already being used, Vite will automatically try the next available port so this may not be the actual port the server ends up listening on. If true will be set to `63315`

### browser.api.host [​](index.md#browser-api-host)

- **CLI:** `--browser.api.host [host]`
- **Config:** [browser.api.host](_guide_browser_config.md#browser-api-host)

Specify which IP addresses the server should listen on. Set this to `0.0.0.0` or `true` to listen on all addresses, including LAN and public addresses

### browser.api.strictPort [​](index.md#browser-api-strictport)

- **CLI:** `--browser.api.strictPort`
- **Config:** [browser.api.strictPort](_guide_browser_config.md#browser-api-strictport)

Set to true to exit if port is already in use, instead of automatically trying the next available port

### browser.provider [​](index.md#browser-provider)

- **CLI:** `--browser.provider <name>`
- **Config:** [browser.provider](_guide_browser_config.md#browser-provider)

Provider used to run browser tests. Some browsers are only available for specific providers. Can be "webdriverio", "playwright", "preview", or the path to a custom provider. Visit [`browser.provider`](_config_.md#browser-provider) for more information (default: `"preview"`)

### browser.providerOptions [​](index.md#browser-provideroptions)

- **CLI:** `--browser.providerOptions <options>`
- **Config:** [browser.providerOptions](_guide_browser_config.md#browser-provideroptions)

Options that are passed down to a browser provider. Visit [`browser.providerOptions`](_config_.md#browser-provideroptions) for more information

### browser.isolate [​](index.md#browser-isolate)

- **CLI:** `--browser.isolate`
- **Config:** [browser.isolate](_guide_browser_config.md#browser-isolate)

Run every browser test file in isolation. To disable isolation, use `--browser.isolate=false` (default: `true`)

### browser.ui [​](index.md#browser-ui)

- **CLI:** `--browser.ui`
- **Config:** [browser.ui](_guide_browser_config.md#browser-ui)

Show Vitest UI when running tests (default: `!process.env.CI`)

### browser.fileParallelism [​](index.md#browser-fileparallelism)

- **CLI:** `--browser.fileParallelism`
- **Config:** [browser.fileParallelism](_guide_browser_config.md#browser-fileparallelism)

Should browser test files run in parallel. Use `--browser.fileParallelism=false` to disable (default: `true`)

### browser.connectTimeout [​](index.md#browser-connecttimeout)

- **CLI:** `--browser.connectTimeout <timeout>`
- **Config:** [browser.connectTimeout](_guide_browser_config.md#browser-connecttimeout)

If connection to the browser takes longer, the test suite will fail (default: `60_000`)

### pool [​](index.md#pool)

- **CLI:** `--pool <pool>`
- **Config:** [pool](_config_.md#pool)

Specify pool, if not running in the browser (default: `forks`)

### poolOptions.threads.isolate [​](index.md#pooloptions-threads-isolate)

- **CLI:** `--poolOptions.threads.isolate`
- **Config:** [poolOptions.threads.isolate](_config_.md#pooloptions-threads-isolate)

Isolate tests in threads pool (default: `true`)

### poolOptions.threads.singleThread [​](index.md#pooloptions-threads-singlethread)

- **CLI:** `--poolOptions.threads.singleThread`
- **Config:** [poolOptions.threads.singleThread](_config_.md#pooloptions-threads-singlethread)

Run tests inside a single thread (default: `false`)

### poolOptions.threads.maxThreads [​](index.md#pooloptions-threads-maxthreads)

- **CLI:** `--poolOptions.threads.maxThreads <workers>`
- **Config:** [poolOptions.threads.maxThreads](_config_.md#pooloptions-threads-maxthreads)

Maximum number or percentage of threads to run tests in

### poolOptions.threads.minThreads [​](index.md#pooloptions-threads-minthreads)

- **CLI:** `--poolOptions.threads.minThreads <workers>`
- **Config:** [poolOptions.threads.minThreads](_config_.md#pooloptions-threads-minthreads)

Minimum number or percentage of threads to run tests in

### poolOptions.threads.useAtomics [​](index.md#pooloptions-threads-useatomics)

- **CLI:** `--poolOptions.threads.useAtomics`
- **Config:** [poolOptions.threads.useAtomics](_config_.md#pooloptions-threads-useatomics)

Use Atomics to synchronize threads. This can improve performance in some cases, but might cause segfault in older Node versions (default: `false`)

### poolOptions.vmThreads.isolate [​](index.md#pooloptions-vmthreads-isolate)

- **CLI:** `--poolOptions.vmThreads.isolate`
- **Config:** [poolOptions.vmThreads.isolate](_config_.md#pooloptions-vmthreads-isolate)

Isolate tests in threads pool (default: `true`)

### poolOptions.vmThreads.singleThread [​](index.md#pooloptions-vmthreads-singlethread)

- **CLI:** `--poolOptions.vmThreads.singleThread`
- **Config:** [poolOptions.vmThreads.singleThread](_config_.md#pooloptions-vmthreads-singlethread)

Run tests inside a single thread (default: `false`)

### poolOptions.vmThreads.maxThreads [​](index.md#pooloptions-vmthreads-maxthreads)

- **CLI:** `--poolOptions.vmThreads.maxThreads <workers>`
- **Config:** [poolOptions.vmThreads.maxThreads](_config_.md#pooloptions-vmthreads-maxthreads)

Maximum number or percentage of threads to run tests in

### poolOptions.vmThreads.minThreads [​](index.md#pooloptions-vmthreads-minthreads)

- **CLI:** `--poolOptions.vmThreads.minThreads <workers>`
- **Config:** [poolOptions.vmThreads.minThreads](_config_.md#pooloptions-vmthreads-minthreads)

Minimum number or percentage of threads to run tests in

### poolOptions.vmThreads.useAtomics [​](index.md#pooloptions-vmthreads-useatomics)

- **CLI:** `--poolOptions.vmThreads.useAtomics`
- **Config:** [poolOptions.vmThreads.useAtomics](_config_.md#pooloptions-vmthreads-useatomics)

Use Atomics to synchronize threads. This can improve performance in some cases, but might cause segfault in older Node versions (default: `false`)

### poolOptions.vmThreads.memoryLimit [​](index.md#pooloptions-vmthreads-memorylimit)

- **CLI:** `--poolOptions.vmThreads.memoryLimit <limit>`
- **Config:** [poolOptions.vmThreads.memoryLimit](_config_.md#pooloptions-vmthreads-memorylimit)

Memory limit for VM threads pool. If you see memory leaks, try to tinker this value.

### poolOptions.forks.isolate [​](index.md#pooloptions-forks-isolate)

- **CLI:** `--poolOptions.forks.isolate`
- **Config:** [poolOptions.forks.isolate](_config_.md#pooloptions-forks-isolate)

Isolate tests in forks pool (default: `true`)

### poolOptions.forks.singleFork [​](index.md#pooloptions-forks-singlefork)

- **CLI:** `--poolOptions.forks.singleFork`
- **Config:** [poolOptions.forks.singleFork](_config_.md#pooloptions-forks-singlefork)

Run tests inside a single child_process (default: `false`)

### poolOptions.forks.maxForks [​](index.md#pooloptions-forks-maxforks)

- **CLI:** `--poolOptions.forks.maxForks <workers>`
- **Config:** [poolOptions.forks.maxForks](_config_.md#pooloptions-forks-maxforks)

Maximum number or percentage of processes to run tests in

### poolOptions.forks.minForks [​](index.md#pooloptions-forks-minforks)

- **CLI:** `--poolOptions.forks.minForks <workers>`
- **Config:** [poolOptions.forks.minForks](_config_.md#pooloptions-forks-minforks)

Minimum number or percentage of processes to run tests in

### poolOptions.vmForks.isolate [​](index.md#pooloptions-vmforks-isolate)

- **CLI:** `--poolOptions.vmForks.isolate`
- **Config:** [poolOptions.vmForks.isolate](_config_.md#pooloptions-vmforks-isolate)

Isolate tests in forks pool (default: `true`)

### poolOptions.vmForks.singleFork [​](index.md#pooloptions-vmforks-singlefork)

- **CLI:** `--poolOptions.vmForks.singleFork`
- **Config:** [poolOptions.vmForks.singleFork](_config_.md#pooloptions-vmforks-singlefork)

Run tests inside a single child_process (default: `false`)

### poolOptions.vmForks.maxForks [​](index.md#pooloptions-vmforks-maxforks)

- **CLI:** `--poolOptions.vmForks.maxForks <workers>`
- **Config:** [poolOptions.vmForks.maxForks](_config_.md#pooloptions-vmforks-maxforks)

Maximum number or percentage of processes to run tests in

### poolOptions.vmForks.minForks [​](index.md#pooloptions-vmforks-minforks)

- **CLI:** `--poolOptions.vmForks.minForks <workers>`
- **Config:** [poolOptions.vmForks.minForks](_config_.md#pooloptions-vmforks-minforks)

Minimum number or percentage of processes to run tests in

### poolOptions.vmForks.memoryLimit [​](index.md#pooloptions-vmforks-memorylimit)

- **CLI:** `--poolOptions.vmForks.memoryLimit <limit>`
- **Config:** [poolOptions.vmForks.memoryLimit](_config_.md#pooloptions-vmforks-memorylimit)

Memory limit for VM forks pool. If you see memory leaks, try to tinker this value.

### fileParallelism [​](index.md#fileparallelism)

- **CLI:** `--fileParallelism`
- **Config:** [fileParallelism](_config_.md#fileparallelism)

Should all test files run in parallel. Use `--no-file-parallelism` to disable (default: `true`)

### maxWorkers [​](index.md#maxworkers)

- **CLI:** `--maxWorkers <workers>`
- **Config:** [maxWorkers](_config_.md#maxworkers)

Maximum number or percentage of workers to run tests in

### minWorkers [​](index.md#minworkers)

- **CLI:** `--minWorkers <workers>`
- **Config:** [minWorkers](_config_.md#minworkers)

Minimum number or percentage of workers to run tests in

### environment [​](index.md#environment)

- **CLI:** `--environment <name>`
- **Config:** [environment](_config_.md#environment)

Specify runner environment, if not running in the browser (default: `node`)

### passWithNoTests [​](index.md#passwithnotests)

- **CLI:** `--passWithNoTests`
- **Config:** [passWithNoTests](_config_.md#passwithnotests)

Pass when no tests are found

### logHeapUsage [​](index.md#logheapusage)

- **CLI:** `--logHeapUsage`
- **Config:** [logHeapUsage](_config_.md#logheapusage)

Show the size of heap for each test when running in node

### allowOnly [​](index.md#allowonly)

- **CLI:** `--allowOnly`
- **Config:** [allowOnly](_config_.md#allowonly)

Allow tests and suites that are marked as only (default: `!process.env.CI`)

### dangerouslyIgnoreUnhandledErrors [​](index.md#dangerouslyignoreunhandlederrors)

- **CLI:** `--dangerouslyIgnoreUnhandledErrors`
- **Config:** [dangerouslyIgnoreUnhandledErrors](_config_.md#dangerouslyignoreunhandlederrors)

Ignore any unhandled errors that occur

### sequence.shuffle.files [​](index.md#sequence-shuffle-files)

- **CLI:** `--sequence.shuffle.files`
- **Config:** [sequence.shuffle.files](_config_.md#sequence-shuffle-files)

Run files in a random order. Long running tests will not start earlier if you enable this option. (default: `false`)

### sequence.shuffle.tests [​](index.md#sequence-shuffle-tests)

- **CLI:** `--sequence.shuffle.tests`
- **Config:** [sequence.shuffle.tests](_config_.md#sequence-shuffle-tests)

Run tests in a random order (default: `false`)

### sequence.concurrent [​](index.md#sequence-concurrent)

- **CLI:** `--sequence.concurrent`
- **Config:** [sequence.concurrent](_config_.md#sequence-concurrent)

Make tests run in parallel (default: `false`)

### sequence.seed [​](index.md#sequence-seed)

- **CLI:** `--sequence.seed <seed>`
- **Config:** [sequence.seed](_config_.md#sequence-seed)

Set the randomization seed. This option will have no effect if `--sequence.shuffle` is falsy. Visit ["Random Seed" page](https://en.wikipedia.org/wiki/Random_seed) for more information

### sequence.hooks [​](index.md#sequence-hooks)

- **CLI:** `--sequence.hooks <order>`
- **Config:** [sequence.hooks](_config_.md#sequence-hooks)

Changes the order in which hooks are executed. Accepted values are: "stack", "list" and "parallel". Visit [`sequence.hooks`](_config_.md#sequence-hooks) for more information (default: `"parallel"`)

### sequence.setupFiles [​](index.md#sequence-setupfiles)

- **CLI:** `--sequence.setupFiles <order>`
- **Config:** [sequence.setupFiles](_config_.md#sequence-setupfiles)

Changes the order in which setup files are executed. Accepted values are: "list" and "parallel". If set to "list", will run setup files in the order they are defined. If set to "parallel", will run setup files in parallel (default: `"parallel"`)

### inspect [​](index.md#inspect)

- **CLI:** `--inspect [[host:]port]`
- **Config:** [inspect](_config_.md#inspect)

Enable Node.js inspector (default: `127.0.0.1:9229`)

### inspectBrk [​](index.md#inspectbrk)

- **CLI:** `--inspectBrk [[host:]port]`
- **Config:** [inspectBrk](_config_.md#inspectbrk)

Enable Node.js inspector and break before the test starts

### testTimeout [​](index.md#testtimeout)

- **CLI:** `--testTimeout <timeout>`
- **Config:** [testTimeout](_config_.md#testtimeout)

Default timeout of a test in milliseconds (default: `5000`). Use `0` to disable timeout completely.

### hookTimeout [​](index.md#hooktimeout)

- **CLI:** `--hookTimeout <timeout>`
- **Config:** [hookTimeout](_config_.md#hooktimeout)

Default hook timeout in milliseconds (default: `10000`). Use `0` to disable timeout completely.

### bail [​](index.md#bail)

- **CLI:** `--bail <number>`
- **Config:** [bail](_config_.md#bail)

Stop test execution when given number of tests have failed (default: `0`)

### retry [​](index.md#retry)

- **CLI:** `--retry <times>`
- **Config:** [retry](_config_.md#retry)

Retry the test specific number of times if it fails (default: `0`)

### diff.aAnnotation [​](index.md#diff-aannotation)

- **CLI:** `--diff.aAnnotation <annotation>`
- **Config:** [diff.aAnnotation](_config_.md#diff-aannotation)

Annotation for expected lines (default: `Expected`)

### diff.aIndicator [​](index.md#diff-aindicator)

- **CLI:** `--diff.aIndicator <indicator>`
- **Config:** [diff.aIndicator](_config_.md#diff-aindicator)

Indicator for expected lines (default: `-`)

### diff.bAnnotation [​](index.md#diff-bannotation)

- **CLI:** `--diff.bAnnotation <annotation>`
- **Config:** [diff.bAnnotation](_config_.md#diff-bannotation)

Annotation for received lines (default: `Received`)

### diff.bIndicator [​](index.md#diff-bindicator)

- **CLI:** `--diff.bIndicator <indicator>`
- **Config:** [diff.bIndicator](_config_.md#diff-bindicator)

Indicator for received lines (default: `+`)

### diff.commonIndicator [​](index.md#diff-commonindicator)

- **CLI:** `--diff.commonIndicator <indicator>`
- **Config:** [diff.commonIndicator](_config_.md#diff-commonindicator)

Indicator for common lines (default: )

### diff.contextLines [​](index.md#diff-contextlines)

- **CLI:** `--diff.contextLines <lines>`
- **Config:** [diff.contextLines](_config_.md#diff-contextlines)

Number of lines of context to show around each change (default: `5`)

### diff.emptyFirstOrLastLinePlaceholder [​](index.md#diff-emptyfirstorlastlineplaceholder)

- **CLI:** `--diff.emptyFirstOrLastLinePlaceholder <placeholder>`
- **Config:** [diff.emptyFirstOrLastLinePlaceholder](_config_.md#diff-emptyfirstorlastlineplaceholder)

Placeholder for an empty first or last line (default: `""`)

### diff.expand [​](index.md#diff-expand)

- **CLI:** `--diff.expand`
- **Config:** [diff.expand](_config_.md#diff-expand)

Expand all common lines (default: `true`)

### diff.includeChangeCounts [​](index.md#diff-includechangecounts)

- **CLI:** `--diff.includeChangeCounts`
- **Config:** [diff.includeChangeCounts](_config_.md#diff-includechangecounts)

Include comparison counts in diff output (default: `false`)

### diff.omitAnnotationLines [​](index.md#diff-omitannotationlines)

- **CLI:** `--diff.omitAnnotationLines`
- **Config:** [diff.omitAnnotationLines](_config_.md#diff-omitannotationlines)

Omit annotation lines from the output (default: `false`)

### diff.printBasicPrototype [​](index.md#diff-printbasicprototype)

- **CLI:** `--diff.printBasicPrototype`
- **Config:** [diff.printBasicPrototype](_config_.md#diff-printbasicprototype)

Print basic prototype Object and Array (default: `true`)

### diff.maxDepth [​](index.md#diff-maxdepth)

- **CLI:** `--diff.maxDepth <maxDepth>`
- **Config:** [diff.maxDepth](_config_.md#diff-maxdepth)

Limit the depth to recurse when printing nested objects (default: `20`)

### diff.truncateThreshold [​](index.md#diff-truncatethreshold)

- **CLI:** `--diff.truncateThreshold <threshold>`
- **Config:** [diff.truncateThreshold](_config_.md#diff-truncatethreshold)

Number of lines to show before and after each change (default: `0`)

### diff.truncateAnnotation [​](index.md#diff-truncateannotation)

- **CLI:** `--diff.truncateAnnotation <annotation>`
- **Config:** [diff.truncateAnnotation](_config_.md#diff-truncateannotation)

Annotation for truncated lines (default: `... Diff result is truncated`)

### exclude [​](index.md#exclude)

- **CLI:** `--exclude <glob>`
- **Config:** [exclude](_config_.md#exclude)

Additional file globs to be excluded from test

### expandSnapshotDiff [​](index.md#expandsnapshotdiff)

- **CLI:** `--expandSnapshotDiff`
- **Config:** [expandSnapshotDiff](_config_.md#expandsnapshotdiff)

Show full diff when snapshot fails

### disableConsoleIntercept [​](index.md#disableconsoleintercept)

- **CLI:** `--disableConsoleIntercept`
- **Config:** [disableConsoleIntercept](_config_.md#disableconsoleintercept)

Disable automatic interception of console logging (default: `false`)

### typecheck.enabled [​](index.md#typecheck-enabled)

- **CLI:** `--typecheck.enabled`
- **Config:** [typecheck.enabled](_config_.md#typecheck-enabled)

Enable typechecking alongside tests (default: `false`)

### typecheck.only [​](index.md#typecheck-only)

- **CLI:** `--typecheck.only`
- **Config:** [typecheck.only](_config_.md#typecheck-only)

Run only typecheck tests. This automatically enables typecheck (default: `false`)

### typecheck.checker [​](index.md#typecheck-checker)

- **CLI:** `--typecheck.checker <name>`
- **Config:** [typecheck.checker](_config_.md#typecheck-checker)

Specify the typechecker to use. Available values are: "tsc" and "vue-tsc" and a path to an executable (default: `"tsc"`)

### typecheck.allowJs [​](index.md#typecheck-allowjs)

- **CLI:** `--typecheck.allowJs`
- **Config:** [typecheck.allowJs](_config_.md#typecheck-allowjs)

Allow JavaScript files to be typechecked. By default takes the value from tsconfig.json

### typecheck.ignoreSourceErrors [​](index.md#typecheck-ignoresourceerrors)

- **CLI:** `--typecheck.ignoreSourceErrors`
- **Config:** [typecheck.ignoreSourceErrors](_config_.md#typecheck-ignoresourceerrors)

Ignore type errors from source files

### typecheck.tsconfig [​](index.md#typecheck-tsconfig)

- **CLI:** `--typecheck.tsconfig <path>`
- **Config:** [typecheck.tsconfig](_config_.md#typecheck-tsconfig)

Path to a custom tsconfig file

### project [​](index.md#project)

- **CLI:** `--project <name>`
- **Config:** [project](_config_.md#project)

The name of the project to run if you are using Vitest workspace feature. This can be repeated for multiple projects: `--project=1 --project=2`. You can also filter projects using wildcards like `--project=packages*`, and exclude projects with `--project=!pattern`.

### slowTestThreshold [​](index.md#slowtestthreshold)

- **CLI:** `--slowTestThreshold <threshold>`
- **Config:** [slowTestThreshold](_config_.md#slowtestthreshold)

Threshold in milliseconds for a test or suite to be considered slow (default: `300`)

### teardownTimeout [​](index.md#teardowntimeout)

- **CLI:** `--teardownTimeout <timeout>`
- **Config:** [teardownTimeout](_config_.md#teardowntimeout)

Default timeout of a teardown function in milliseconds (default: `10000`)

### maxConcurrency [​](index.md#maxconcurrency)

- **CLI:** `--maxConcurrency <number>`
- **Config:** [maxConcurrency](_config_.md#maxconcurrency)

Maximum number of concurrent tests in a suite (default: `5`)

### expect.requireAssertions [​](index.md#expect-requireassertions)

- **CLI:** `--expect.requireAssertions`
- **Config:** [expect.requireAssertions](_config_.md#expect-requireassertions)

Require that all tests have at least one assertion

### expect.poll.interval [​](index.md#expect-poll-interval)

- **CLI:** `--expect.poll.interval <interval>`
- **Config:** [expect.poll.interval](_config_.md#expect-poll-interval)

Poll interval in milliseconds for `expect.poll()` assertions (default: `50`)

### expect.poll.timeout [​](index.md#expect-poll-timeout)

- **CLI:** `--expect.poll.timeout <timeout>`
- **Config:** [expect.poll.timeout](_config_.md#expect-poll-timeout)

Poll timeout in milliseconds for `expect.poll()` assertions (default: `1000`)

### printConsoleTrace [​](index.md#printconsoletrace)

- **CLI:** `--printConsoleTrace`
- **Config:** [printConsoleTrace](_config_.md#printconsoletrace)

Always print console stack traces

### includeTaskLocation [​](index.md#includetasklocation)

- **CLI:** `--includeTaskLocation`
- **Config:** [includeTaskLocation](_config_.md#includetasklocation)

Collect test and suite locations in the `location` property

### run [​](index.md#run)

- **CLI:** `--run`

Disable watch mode

### color [​](index.md#color)

- **CLI:** `--no-color`

Removes colors from the console output

### clearScreen [​](index.md#clearscreen)

- **CLI:** `--clearScreen`

Clear terminal screen when re-running tests during watch mode (default: `true`)

### configLoader [​](index.md#configloader)

- **CLI:** `--configLoader <loader>`

Use `bundle` to bundle the config with esbuild or `runner` (experimental) to process it on the fly. This is only available in vite version 6.1.0 and above. (default: `bundle`)

### standalone [​](index.md#standalone)

- **CLI:** `--standalone`

Start Vitest without running tests. File filters will be ignored, tests will be running only on change (default: `false`)

### changed [​](index.md#changed)

- **Type**: `boolean | string`
- **Default**: false

Run tests only against changed files. If no value is provided, it will run tests against uncommitted changes (including staged and unstaged).

To run tests against changes made in the last commit, you can use `--changed HEAD~1`. You can also pass commit hash (e.g. `--changed 09a9920`) or branch name (e.g. `--changed origin/develop`).

When used with code coverage the report will contain only the files that were related to the changes.

If paired with the [`forceRerunTriggers`](_config_.md#forcereruntriggers) config option it will run the whole test suite if at least one of the files listed in the `forceRerunTriggers` list changes. By default, changes to the Vitest config file and `package.json` will always rerun the whole suite.

### shard [​](index.md#shard)

- **Type**: `string`
- **Default**: disabled

Test suite shard to execute in a format of `<index>`/`<count>`, where

- `count` is a positive integer, count of divided parts
- `index` is a positive integer, index of divided part

This command will divide all tests into `count` equal parts, and will run only those that happen to be in an `index` part. For example, to split your tests suite into three parts, use this:

sh

```
vitest run --shard=1/3
vitest run --shard=2/3
vitest run --shard=3/3
```

WARNING

You cannot use this option with `--watch` enabled (enabled in dev by default).

TIP

If `--reporter=blob` is used without an output file, the default path will include the current shard config to avoid collisions with other Vitest processes.

### merge-reports [​](index.md#merge-reports)

- **Type:** `boolean | string`

Merges every blob report located in the specified folder (`.vitest-reports` by default). You can use any reporters with this command (except [`blob`](_guide_reporters.md#blob-reporter)):

sh

```
vitest --merge-reports --reporter=junit
```

#### \_guide_common-errors.md

> Source: https://vitest.dev/guide/common-errors
> Scraped: 4/15/2025, 1:07:29 AM

## Common Errors [​](index.md#common-errors)

## Cannot find module './relative-path' [​](index.md#cannot-find-module-relative-path)

If you receive an error that module cannot be found, it might mean several different things:

- 1.  You misspelled the path. Make sure the path is correct.
- 1.  It's possible that you rely on `baseUrl` in your `tsconfig.json`. Vite doesn't take into account `tsconfig.json` by default, so you might need to install [`vite-tsconfig-paths`](https://www.npmjs.com/package/vite-tsconfig-paths) yourself, if you rely on this behaviour.

ts

```
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
  plugins: [tsconfigPaths()]
})
```

Or rewrite your path to not be relative to root:

diff

```
- import helpers from 'src/helpers'
+ import helpers from '../src/helpers'
```

- 1.  Make sure you don't have relative [aliases](_config_.md#alias). Vite treats them as relative to the file where the import is instead of the root.

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    alias: {
      '@/': './src/',
      '@/': new URL('./src/', import.meta.url).pathname,
    }
  }
})
```

## Cannot mock "./mocked-file.js" because it is already loaded [​](index.md#cannot-mock-mocked-file-js-because-it-is-already-loaded)

This error happens when `vi.mock` method is called on a module that was already loaded. Vitest throws this error because this call has no effect since cached modules are preferred.

Remember that `vi.mock` is always hoisted - it means that the module was loaded before the test file started executing - most likely in a setup file. To fix the error, remove the import or clear the cache at the end of a setup file - beware that setup file and your test file will reference different modules in that case.

setupFile.js

ts

```
import { vi } from 'vitest'
import { sideEffect } from './mocked-file.js'
sideEffect()
vi.resetModules()
```

## Failed to terminate worker [​](index.md#failed-to-terminate-worker)

This error can happen when NodeJS's `fetch` is used with default [`pool: 'threads'`](_config_.md#threads). This issue is tracked on issue [Timeout abort can leave process(es) running in the background #3077](https://github.com/vitest-dev/vitest/issues/3077).

As work-around you can switch to [`pool: 'forks'`](_config_.md#forks) or [`pool: 'vmForks'`](_config_.md#vmforks).

vitest.config.jsCLI

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    pool: 'forks',
  },
})
```

## Segfaults and native code errors [​](index.md#segfaults-and-native-code-errors)

Running [native NodeJS modules](https://nodejs.org/api/addons.html) in `pool: 'threads'` can run into cryptic errors coming from the native code.

- `Segmentation fault (core dumped)`
- `thread '<unnamed>' panicked at 'assertion failed`
- `Abort trap: 6`
- `internal error: entered unreachable code`

In these cases the native module is likely not built to be multi-thread safe. As work-around, you can switch to `pool: 'forks'` which runs the test cases in multiple `node:child_process` instead of multiple `node:worker_threads`.

vitest.config.jsCLI

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    pool: 'forks',
  },
})
```

#### \_guide_comparisons.md

> Source: https://vitest.dev/guide/comparisons
> Scraped: 4/15/2025, 1:07:29 AM

## Comparisons with Other Test Runners [​](index.md#comparisons-with-other-test-runners)

## Jest [​](index.md#jest)

[Jest](https://jestjs.io/) took over the Testing Framework space by providing out-of-the-box support for most JavaScript projects, a comfortable API (`it` and `expect`), and the full pack of testing features that most setups would require (snapshots, mocks, coverage). We are thankful to the Jest team and community for creating a delightful testing API and pushing forward a lot of the testing patterns that are now a standard in the web ecosystem.

It is possible to use Jest in Vite setups. [@sodatea](https://bsky.app/profile/haoqun.dev) built [vite-jest](https://github.com/sodatea/vite-jest#readme), which aims to provide first-class Vite integration for [Jest](https://jestjs.io/). The last [blockers in Jest](https://github.com/sodatea/vite-jest/blob/main/packages/vite-jest/README.md#vite-jest) have been solved, so this is a valid option for your unit tests.

However, in a world where we have [Vite](https://vitejs.dev/) providing support for the most common web tooling (TypeScript, JSX, most popular UI Frameworks), Jest represents a duplication of complexity. If your app is powered by Vite, having two different pipelines to configure and maintain is not justifiable. With Vitest you get to define the configuration for your dev, build and test environments as a single pipeline, sharing the same plugins and the same vite.config.js.

Even if your library is not using Vite (for example, if it is built with esbuild or Rollup), Vitest is an interesting option as it gives you a faster run for your unit tests and a jump in DX thanks to the default watch mode using Vite instant Hot Module Reload (HMR). Vitest offers compatibility with most of the Jest API and ecosystem libraries, so in most projects, it should be a drop-in replacement for Jest.

## Cypress [​](index.md#cypress)

[Cypress](https://www.cypress.io/) is a browser-based test runner and a complementary tool to Vitest. If you'd like to use Cypress, we suggest using Vitest for all headless logic in your application and Cypress for all browser-based logic.

Cypress is known as an end-to-end testing tool, but their [new component test runner](https://on.cypress.io/component) has great support for testing Vite components and is an ideal choice to test anything that renders in a browser.

Browser-based runners, like Cypress, WebdriverIO and Web Test Runner, will catch issues that Vitest cannot because they use the real browser and real browser APIs.

Cypress's test driver is focused on determining if elements are visible, accessible, and interactive. Cypress is purpose-built for UI development and testing and its DX is centered around test driving your visual components. You see your component rendered alongside the test reporter. Once the test is complete, the component remains interactive and you can debug any failures that occur using your browser devtools.

In contrast, Vitest is focused on delivering the best DX possible for lightning fast, _headless_ testing. Node-based runners like Vitest support various partially-implemented browser environments, like `jsdom`, which implement enough for you to quickly unit test any code that references browser APIs. The tradeoff is that these browser environments have limitations in what they can implement. For example, [jsdom is missing a number of features](https://github.com/jsdom/jsdom/issues?q=is%3Aissue+is%3Aopen+sort%3Acomments-desc) like `window.navigation` or a layout engine (`offsetTop`, etc).

Lastly, in contrast to the Web Test Runner, the Cypress test runner is more like an IDE than a test runner because you also see the real rendered component in the browser, along with its test results and logs.

Cypress has also been [integrating Vite in their products](https://www.youtube.com/watch?v=7S5cbY8iYLk): re-building their App's UI using [Vitesse](https://github.com/antfu/vitesse) and using Vite to test drive their project's development.

We believe that Cypress isn't a good option for unit testing headless code, but that using Cypress (for E2E and Component Testing) and Vitest (for unit tests) would cover your app's testing needs.

## WebdriverIO [​](index.md#webdriverio)

[WebdriverIO](https://webdriver.io/) is, similar to Cypress, a browser-based alternative test runner and a complementary tool to Vitest. It can be used as an end-to-end testing tool as well as for testing [web components](https://webdriver.io/docs/component-testing). It even uses components of Vitest under the hood, e.g. for [mocking and stubbing](https://webdriver.io/docs/mocksandspies/) within component tests.

WebdriverIO comes with the same advantages as Cypress allowing you to test your logic in real browser. However, it uses actual [web standards](https://w3c.github.io/webdriver/) for automation, which overcomes some of the tradeoffs and limitation when running tests in Cypress. Furthermore, it allows you to run tests on mobile as well, giving you access to test your application in even more environments.

## Web Test Runner [​](index.md#web-test-runner)

[@web/test-runner](https://modern-web.dev/docs/test-runner/overview/) runs tests inside a headless browser, providing the same execution environment as your web application without the need for mocking out browser APIs or the DOM. This also makes it possible to debug inside a real browser using the devtools, although there is no UI shown for stepping through the test, as there is in Cypress tests.

To use @web/test-runner with a Vite project, use [@remcovaes/web-test-runner-vite-plugin](https://github.com/remcovaes/web-test-runner-vite-plugin). @web/test-runner does not include assertion or mocking libraries, so it is up to you to add them.

## uvu [​](index.md#uvu)

[uvu](https://github.com/lukeed/uvu) is a test runner for Node.js and the browser. It runs tests in a single thread, so tests are not isolated and can leak across files. Vitest, however, uses worker threads to isolate tests and run them in parallel.

For transforming your code, uvu relies on require and loader hooks. Vitest uses [Vite](https://vitejs.dev/), so files are transformed with the full power of Vite's plugin system. In a world where we have Vite providing support for the most common web tooling (TypeScript, JSX, most popular UI Frameworks), uvu represents a duplication of complexity. If your app is powered by Vite, having two different pipelines to configure and maintain is not justifiable. With Vitest you get to define the configuration for your dev, build and test environments as a single pipeline, sharing the same plugins and the same configuration.

uvu does not provide an intelligent watch mode to rerun the changed tests, while Vitest gives you amazing DX thanks to the default watch mode using Vite instant Hot Module Reload (HMR).

uvu is a fast option for running simple tests, but Vitest can be faster and more reliable for more complex tests and projects.

#### \_guide_coverage.md

> Source: https://vitest.dev/guide/coverage
> Scraped: 4/15/2025, 1:07:27 AM

## Coverage [​](index.md#coverage)

Vitest supports Native code coverage via [`v8`](https://v8.dev/blog/javascript-code-coverage) and instrumented code coverage via [`istanbul`](https://istanbul.js.org/).

## Coverage Providers [​](index.md#coverage-providers)

Both `v8` and `istanbul` support are optional. By default, `v8` will be used.

You can select the coverage tool by setting `test.coverage.provider` to `v8` or `istanbul`:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul' // or 'v8'
    },
  },
})
```

When you start the Vitest process, it will prompt you to install the corresponding support package automatically.

Or if you prefer to install them manually:

v8istanbul

bash

```
npm i -D @vitest/coverage-v8
```

bash

```
npm i -D @vitest/coverage-istanbul
```

## Coverage Setup [​](index.md#coverage-setup)

TIP

It's recommended to always define [`coverage.include`](_config_.md#coverage-include) in your configuration file. This helps Vitest to reduce the amount of files picked by [`coverage.all`](_config_.md#coverage-all).

To test with coverage enabled, you can pass the `--coverage` flag in CLI. By default, reporter `['text', 'html', 'clover', 'json']` will be used.

package.json

json

```
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

To configure it, set `test.coverage` options in your config file:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

## Custom Coverage Reporter [​](index.md#custom-coverage-reporter)

You can use custom coverage reporters by passing either the name of the package or absolute path in `test.coverage.reporter`:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    coverage: {
      reporter: [
        // Specify reporter using name of the NPM package
        ['@vitest/custom-coverage-reporter', { someOption: true }],
        // Specify reporter using local path
        '/absolute/path/to/custom-reporter.cjs',
      ],
    },
  },
})
```

Custom reporters are loaded by Istanbul and must match its reporter interface. See [built-in reporters' implementation](https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib) for reference.

custom-reporter.cjs

js

```
const { ReportBase } = require('istanbul-lib-report')
module.exports = class CustomReporter extends ReportBase {
  constructor(opts) {
    super()
    // Options passed from configuration are available here
    this.file = opts.file
  }
  onStart(root, context) {
    this.contentWriter = context.writer.writeFile(this.file)
    this.contentWriter.println('Start of custom coverage report')
  }
  onEnd() {
    this.contentWriter.println('End of custom coverage report')
    this.contentWriter.close()
  }
}
```

## Custom Coverage Provider [​](index.md#custom-coverage-provider)

It's also possible to provide your custom coverage provider by passing `'custom'` in `test.coverage.provider`:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    coverage: {
      provider: 'custom',
      customProviderModule: 'my-custom-coverage-provider'
    },
  },
})
```

The custom providers require a `customProviderModule` option which is a module name or path where to load the `CoverageProviderModule` from. It must export an object that implements `CoverageProviderModule` as default export:

my-custom-coverage-provider.ts

ts

```
import type {
  CoverageProvider,
  CoverageProviderModule,
  ResolvedCoverageOptions,
  Vitest
} from 'vitest'
const CustomCoverageProviderModule: CoverageProviderModule = {
  getProvider(): CoverageProvider {
    return new CustomCoverageProvider()
  },
  // Implements rest of the CoverageProviderModule ...
}
class CustomCoverageProvider implements CoverageProvider {
  name = 'custom-coverage-provider'
  options!: ResolvedCoverageOptions
  initialize(ctx: Vitest) {
    this.options = ctx.config.coverage
  }
  // Implements rest of the CoverageProvider ...
}
export default CustomCoverageProviderModule
```

Please refer to the type definition for more details.

## Changing the Default Coverage Folder Location [​](index.md#changing-the-default-coverage-folder-location)

When running a coverage report, a `coverage` folder is created in the root directory of your project. If you want to move it to a different directory, use the `test.coverage.reportsDirectory` property in the `vite.config.js` file.

vitest.config.js

js

```
import { defineConfig } from 'vite'
export default defineConfig({
  test: {
    coverage: {
      reportsDirectory: './tests/unit/coverage'
    }
  }
})
```

## Ignoring Code [​](index.md#ignoring-code)

Both coverage providers have their own ways how to ignore code from coverage reports:

- [`v8`](https://github.com/istanbuljs/v8-to-istanbul#ignoring-uncovered-lines)
- [`ìstanbul`](https://github.com/istanbuljs/nyc#parsing-hints-ignoring-lines)

When using TypeScript the source codes are transpiled using `esbuild`, which strips all comments from the source codes ([esbuild#516](https://github.com/evanw/esbuild/issues/516)). Comments which are considered as [legal comments](https://esbuild.github.io/api/#legal-comments) are preserved.

For `istanbul` provider you can include a `@preserve` keyword in the ignore hint. Beware that these ignore hints may now be included in final production build as well.

diff

```
-/* istanbul ignore if */
+/* istanbul ignore if -- @preserve */
if (condition) {
```

For `v8` this does not cause any issues. You can use `v8 ignore` comments with Typescript as usual:

ts

```
/* v8 ignore next 3 */
if (condition) {
```

## Other Options [​](index.md#other-options)

To see all configurable options for coverage, see the [coverage Config Reference](_config_.md#coverage).

You can check your coverage report in [Vitest UI](_guide_ui.md).

Vitest UI will enable coverage report when it is enabled explicitly and the html coverage reporter is present, otherwise it will not be available:

- enable `coverage.enabled=true` in your configuration or run Vitest with `--coverage.enabled=true` flag
- add `html` to the `coverage.reporter` list: you can also enable `subdir` option to put coverage report in a subdirectory

![html coverage activation in Vitest UI](https://vitest.dev/vitest-ui-show-coverage-light.png)![html coverage activation in Vitest UI](https://vitest.dev/vitest-ui-show-coverage-dark.png)![html coverage in Vitest UI](https://vitest.dev/ui-coverage-1-light.png)![html coverage in Vitest UI](https://vitest.dev/ui-coverage-1-dark.png)

#### \_guide_debugging.md

> Source: https://vitest.dev/guide/debugging
> Scraped: 4/15/2025, 1:07:29 AM

## Debugging [​](index.md#debugging)

TIP

When debugging tests you might want to use following options:

- [`--test-timeout=0`](_guide_cli.md#testtimeout) to prevent tests from timing out when stopping at breakpoints
- [`--no-file-parallelism`](_guide_cli.md#fileparallelism) to prevent test files from running parallel

## VS Code [​](index.md#vs-code)

Quick way to debug tests in VS Code is via `JavaScript Debug Terminal`. Open a new `JavaScript Debug Terminal` and run `npm run test` or `vitest` directly. _this works with any code run in Node, so will work with most JS testing frameworks_

![image](https://user-images.githubusercontent.com/5594348/212169143-72bf39ce-f763-48f5-822a-0c8b2e6a8484.png)

You can also add a dedicated launch configuration to debug a test file in VS Code:

json

```
{
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${relativeFile}"],
      "smartStep": true,
      "console": "integratedTerminal"
    }
  ]
}
```

Then in the debug tab, ensure 'Debug Current Test File' is selected. You can then open the test file you want to debug and press F5 to start debugging.

### Browser mode [​](index.md#browser-mode)

To debug [Vitest Browser Mode](_guide_browser_.md), pass `--inspect` or `--inspect-brk` in CLI or define it in your Vitest configuration:

CLIvitest.config.js

bash

```
vitest --inspect-brk --browser --no-file-parallelism
```

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    inspectBrk: true,
    fileParallelism: false,
    browser: {
      provider: 'playwright',
      instances: [{ browser: 'chromium' }]
    },
  },
})
```

By default Vitest will use port `9229` as debugging port. You can overwrite it with by passing value in `--inspect-brk`:

bash

```
vitest --inspect-brk=127.0.0.1:3000 --browser --no-file-parallelism
```

Use following [VSCode Compound configuration](https://code.visualstudio.com/docs/editor/debugging#_compound-launch-configurations) for launching Vitest and attaching debugger in the browser:

json

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Run Vitest Browser",
      "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "console": "integratedTerminal",
      "args": ["--inspect-brk", "--browser", "--no-file-parallelism"]
    },
    {
      "type": "chrome",
      "request": "attach",
      "name": "Attach to Vitest Browser",
      "port": 9229
    }
  ],
  "compounds": [
    {
      "name": "Debug Vitest Browser",
      "configurations": ["Attach to Vitest Browser", "Run Vitest Browser"],
      "stopAll": true
    }
  ]
}
```

## IntelliJ IDEA [​](index.md#intellij-idea)

Create a [vitest](https://www.jetbrains.com/help/idea/vitest.html#createRunConfigVitest) run configuration. Use the following settings to run all tests in debug mode:

Setting

Value

Working directory

`/path/to/your-project-root`

Then run this configuration in debug mode. The IDE will stop at JS/TS breakpoints set in the editor.

Vitest also supports debugging tests without IDEs. However this requires that tests are not run parallel. Use one of the following commands to launch Vitest.

sh

```
# To run in a single worker

vitest --inspect-brk --pool threads --poolOptions.threads.singleThread
# To run in a single child process

vitest --inspect-brk --pool forks --poolOptions.forks.singleFork
# To run in browser mode

vitest --inspect-brk --browser --no-file-parallelism
```

If you are using Vitest 1.1 or higher, you can also just provide `--no-file-parallelism` flag:

sh

```
# If pool is unknown

vitest --inspect-brk --no-file-parallelism
```

Once Vitest starts it will stop execution and wait for you to open developer tools that can connect to [Node.js inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/). You can use Chrome DevTools for this by opening `chrome://inspect` on browser.

In watch mode you can keep the debugger open during test re-runs by using the `--poolOptions.threads.isolate false` options.

#### \_guide_environment.md

> Source: https://vitest.dev/guide/environment
> Scraped: 4/15/2025, 1:07:28 AM

## Test Environment [​](index.md#test-environment)

Vitest provides [`environment`](_config_.md#environment) option to run code inside a specific environment. You can modify how environment behaves with [`environmentOptions`](_config_.md#environmentoptions) option.

By default, you can use these environments:

- `node` is default environment
- `jsdom` emulates browser environment by providing Browser API, uses [`jsdom`](https://github.com/jsdom/jsdom) package
- `happy-dom` emulates browser environment by providing Browser API, and considered to be faster than jsdom, but lacks some API, uses [`happy-dom`](https://github.com/capricorn86/happy-dom) package
- `edge-runtime` emulates Vercel's [edge-runtime](https://edge-runtime.vercel.app/), uses [`@edge-runtime/vm`](https://www.npmjs.com/package/@edge-runtime/vm) package

INFO

When using `jsdom` or `happy-dom` environments, Vitest follows the same rules that Vite does when importing [CSS](https://vitejs.dev/guide/features#css) and [assets](https://vitejs.dev/guide/features#static-assets). If importing external dependency fails with `unknown extension .css` error, you need to inline the whole import chain manually by adding all packages to [`server.deps.external`](_config_.md#server-deps-external). For example, if the error happens in `package-3` in this import chain: `source code -> package-1 -> package-2 -> package-3`, you need to add all three packages to `server.deps.external`.

The `require` of CSS and assets inside the external dependencies are resolved automatically.

WARNING

"Environments" exist only when running tests in Node.js.

`browser` is not considered an environment in Vitest. If you wish to run part of your tests using [Browser Mode](_guide_browser_.md), you can create a [workspace project](_guide_browser_.md#workspace-config).

## Environments for Specific Files [​](index.md#environments-for-specific-files)

When setting `environment` option in your config, it will apply to all the test files in your project. To have more fine-grained control, you can use control comments to specify environment for specific files. Control comments are comments that start with `@vitest-environment` and are followed by the environment name:

ts

```
// @vitest-environment jsdom
import { expect, test } from 'vitest'
test('test', () => {
  expect(typeof window).not.toBe('undefined')
})
```

Or you can also set [`environmentMatchGlobs`](_config_.md#environmentmatchglobs) option specifying the environment based on the glob patterns.

## Custom Environment [​](index.md#custom-environment)

You can create your own package to extend Vitest environment. To do so, create package with the name `vitest-environment-${name}` or specify a path to a valid JS/TS file. That package should export an object with the shape of `Environment`:

ts

```
import type { Environment } from 'vitest/environments'
export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',
  // optional - only if you support "experimental-vm" pool
  async setupVM() {
    const vm = await import('node:vm')
    const context = vm.createContext()
    return {
      getVmContext() {
        return context
      },
      teardown() {
        // called after all tests with this env have been run
      }
    }
  },
  setup() {
    // custom setup
    return {
      teardown() {
        // called after all tests with this env have been run
      }
    }
  }
}
```

WARNING

Vitest requires `transformMode` option on environment object. It should be equal to `ssr` or `web`. This value determines how plugins will transform source code. If it's set to `ssr`, plugin hooks will receive `ssr: true` when transforming or resolving files. Otherwise, `ssr` is set to `false`.

You also have access to default Vitest environments through `vitest/environments` entry:

ts

```
import { builtinEnvironments, populateGlobal } from 'vitest/environments'
console.log(builtinEnvironments) // { jsdom, happy-dom, node, edge-runtime }
```

Vitest also provides `populateGlobal` utility function, which can be used to move properties from object into the global namespace:

ts

```
interface PopulateOptions {
  // should non-class functions be bind to the global namespace
  bindFunctions?: boolean
}
interface PopulateResult {
  // a list of all keys that were copied, even if value doesn't exist on original object
  keys: Set<string>
  // a map of original object that might have been overridden with keys
  // you can return these values inside `teardown` function
  originals: Map<string | symbol, any>
}
export function populateGlobal(global: any, original: any, options: PopulateOptions): PopulateResult
```

#### \_guide_extending-matchers.md

> Source: https://vitest.dev/guide/extending-matchers
> Scraped: 4/15/2025, 1:07:29 AM

## Extending Matchers [​](index.md#extending-matchers)

Since Vitest is compatible with both Chai and Jest, you can use either the `chai.use` API or `expect.extend`, whichever you prefer.

This guide will explore extending matchers with `expect.extend`. If you are interested in Chai's API, check [their guide](https://www.chaijs.com/guide/plugins/).

To extend default matchers, call `expect.extend` with an object containing your matchers.

ts

```
expect.extend({
  toBeFoo(received, expected) {
    const { isNot } = this
    return {
      // do not alter your "pass" based on isNot. Vitest does it for you
      pass: received === 'foo',
      message: () => `${received} is${isNot ? ' not' : ''} foo`
    }
  }
})
```

If you are using TypeScript, you can extend default `Assertion` interface in an ambient declaration file (e.g: `vitest.d.ts`) with the code below:

ts

```
import 'vitest'
interface CustomMatchers<R = unknown> {
  toBeFoo: () => R
}
declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
```

WARNING

Don't forget to include the ambient declaration file in your `tsconfig.json`.

The return value of a matcher should be compatible with the following interface:

ts

```
interface ExpectationResult {
  pass: boolean
  message: () => string
  // If you pass these, they will automatically appear inside a diff when
  // the matcher does not pass, so you don't need to print the diff yourself
  actual?: unknown
  expected?: unknown
}
```

WARNING

If you create an asynchronous matcher, don't forget to `await` the result (`await expect('foo').toBeFoo()`) in the test itself.

The first argument inside a matcher's function is the received value (the one inside `expect(received)`). The rest are arguments passed directly to the matcher.

Matcher function have access to `this` context with the following properties:

- `isNot`

  Returns true, if matcher was called on `not` (`expect(received).not.toBeFoo()`).

- `promise`

  If matcher was called on `resolved/rejected`, this value will contain the name of modifier. Otherwise, it will be an empty string.

- `equals`

  This is a utility function that allows you to compare two values. It will return `true` if values are equal, `false` otherwise. This function is used internally for almost every matcher. It supports objects with asymmetric matchers by default.

- `utils`

  This contains a set of utility functions that you can use to display messages.

`this` context also contains information about the current test. You can also get it by calling `expect.getState()`. The most useful properties are:

- `currentTestName`

  Full name of the current test (including describe block).

- `testPath`

  Path to the current test.

#### \_guide_features.md

> Source: https://vitest.dev/guide/features
> Scraped: 4/15/2025, 1:07:27 AM

## Features [​](index.md#features)

- [Vite](https://vitejs.dev/)'s config, transformers, resolvers, and plugins
- Use the same setup from your app to run the tests!
- Smart & instant watch mode, like HMR for tests!
- Component testing for Vue, React, Svelte, Lit, Marko and more
- Out-of-the-box TypeScript / JSX support
- ESM first, top level await
- Workers multi-threading via [Tinypool](https://github.com/tinylibs/tinypool)

- Filtering, timeouts, concurrent for suite and tests

- [Browser Mode](_guide_browser_.md) for running component tests in the browser

- Sharding support

[Learn how to write your first test by Video](https://vueschool.io/lessons/your-first-test?friend=vueuse)

Vite's config, transformers, resolvers, and plugins. Use the same setup from your app to run the tests.

Learn more at [Configuring Vitest](_guide_.md#configuring-vitest).

## Watch Mode [​](index.md#watch-mode)

When you modify your source code or the test files, Vitest smartly searches the module graph and only reruns the related tests, just like how HMR works in Vite!

`vitest` starts in `watch mode` **by default in development environment** and `run mode` in CI environment (when `process.env.CI` presents) smartly. You can use `vitest watch` or `vitest run` to explicitly specify the desired mode.

Start Vitest with the `--standalone` flag to keep it running in the background. It won't run any tests until they change. Vitest will not run tests if the source code is changed until the test that imports the source has been run

## Common Web Idioms Out-Of-The-Box [​](index.md#common-web-idioms-out-of-the-box)

Out-of-the-box ES Module / TypeScript / JSX support / PostCSS

## Threads [​](index.md#threads)

By default Vitest runs test files in multiple processes using [`node:child_process`](https://nodejs.org/api/child_process.html) via [Tinypool](https://github.com/tinylibs/tinypool) (a lightweight fork of [Piscina](https://github.com/piscinajs/piscina)), allowing tests to run simultaneously. If you want to speed up your test suite even further, consider enabling `--pool=threads` to run tests using [`node:worker_threads`](https://nodejs.org/api/worker_threads.html) (beware that some packages might not work with this setup).

To run tests in a single thread or process, see [`poolOptions`](_config_.md#pooloptions).

Vitest also isolates each file's environment so env mutations in one file don't affect others. Isolation can be disabled by passing `--no-isolate` to the CLI (trading correctness for run performance).

## Test Filtering [​](index.md#test-filtering)

Vitest provides many ways to narrow down the tests to run in order to speed up testing so you can focus on development.

Learn more about [Test Filtering](_guide_filtering.md).

## Running Tests Concurrently [​](index.md#running-tests-concurrently)

Use `.concurrent` in consecutive tests to start them in parallel.

ts

```
import { describe, it } from 'vitest'
// The two tests marked with concurrent will be started in parallel
describe('suite', () => {
  it('serial test', async () => { /* ... */ })
  it.concurrent('concurrent test 1', async ({ expect }) => { /* ... */ })
  it.concurrent('concurrent test 2', async ({ expect }) => { /* ... */ })
})
```

If you use `.concurrent` on a suite, every test in it will be started in parallel.

ts

```
import { describe, it } from 'vitest'
// All tests within this suite will be started in parallel
describe.concurrent('suite', () => {
  it('concurrent test 1', async ({ expect }) => { /* ... */ })
  it('concurrent test 2', async ({ expect }) => { /* ... */ })
  it.concurrent('concurrent test 3', async ({ expect }) => { /* ... */ })
})
```

You can also use `.skip`, `.only`, and `.todo` with concurrent suites and tests. Read more in the [API Reference](_api_.md#test-concurrent).

WARNING

When running concurrent tests, Snapshots and Assertions must use `expect` from the local [Test Context](_guide_test-context.md) to ensure the right test is detected.

## Snapshot [​](index.md#snapshot)

[Jest-compatible](https://jestjs.io/docs/snapshot-testing) snapshot support.

ts

```
import { expect, it } from 'vitest'
it('renders correctly', () => {
  const result = render()
  expect(result).toMatchSnapshot()
})
```

Learn more at [Snapshot](_guide_snapshot.md).

## Chai and Jest `expect` Compatibility [​](index.md#chai-and-jest-expect-compatibility)

[Chai](https://www.chaijs.com/) is built-in for assertions with [Jest `expect`](https://jestjs.io/docs/expect)\-compatible APIs.

Notice that if you are using third-party libraries that add matchers, setting [`test.globals`](_config_.md#globals) to `true` will provide better compatibility.

## Mocking [​](index.md#mocking)

[Tinyspy](https://github.com/tinylibs/tinyspy) is built-in for mocking with `jest`\-compatible APIs on `vi` object.

ts

```
import { expect, vi } from 'vitest'
const fn = vi.fn()
fn('hello', 1)
expect(vi.isMockFunction(fn)).toBe(true)
expect(fn.mock.calls[0]).toEqual(['hello', 1])
fn.mockImplementation((arg: string) => arg)
fn('world', 2)
expect(fn.mock.results[1].value).toBe('world')
```

Vitest supports both [happy-dom](https://github.com/capricorn86/happy-dom) or [jsdom](https://github.com/jsdom/jsdom) for mocking DOM and browser APIs. They don't come with Vitest, you will need to install them separately:

After that, change the `environment` option in your config file:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'happy-dom', // or 'jsdom', 'node'
  },
})
```

Learn more at [Mocking](_guide_mocking.md).

## Coverage [​](index.md#coverage)

Vitest supports Native code coverage via [`v8`](https://v8.dev/blog/javascript-code-coverage) and instrumented code coverage via [`istanbul`](https://istanbul.js.org/).

package.json

json

```
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

Learn more at [Coverage](_guide_coverage.md).

## In-Source Testing [​](index.md#in-source-testing)

Vitest also provides a way to run tests within your source code along with the implementation, similar to [Rust's module tests](https://doc.rust-lang.org/book/ch11-03-test-organization.html#the-tests-module-and-cfgtest).

This makes the tests share the same closure as the implementations and able to test against private states without exporting. Meanwhile, it also brings the feedback loop closer for development.

src/index.ts

ts

```
// the implementation
export function add(...args: number[]): number {
  return args.reduce((a, b) => a + b, 0)
}
// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('add', () => {
    expect(add()).toBe(0)
    expect(add(1)).toBe(1)
    expect(add(1, 2, 3)).toBe(6)
  })
}
```

Learn more at [In-source testing](_guide_in-source.md).

## Benchmarking Experimental [​](index.md#benchmarking)

You can run benchmark tests with [`bench`](_api_.md#bench) function via [Tinybench](https://github.com/tinylibs/tinybench) to compare performance results.

sort.bench.ts

ts

```
import { bench, describe } from 'vitest'
describe('sort', () => {
  bench('normal', () => {
    const x = [1, 5, 4, 2, 3]
    x.sort((a, b) => {
      return a - b
    })
  })
  bench('reverse', () => {
    const x = [1, 5, 4, 2, 3]
    x.reverse().sort((a, b) => {
      return a - b
    })
  })
})
```

![Benchmark report](https://github.com/vitest-dev/vitest/assets/4232207/6f0383ea-38ba-4f14-8a05-ab243afea01d)![Benchmark report](https://github.com/vitest-dev/vitest/assets/4232207/efbcb427-ecf1-4882-88de-210cd73415f6)

## Type Testing Experimental [​](index.md#type-testing)

You can [write tests](_guide_testing-types.md) to catch type regressions. Vitest comes with [`expect-type`](https://github.com/mmkal/expect-type) package to provide you with a similar and easy to understand API.

types.test-d.ts

ts

```
import { assertType, expectTypeOf, test } from 'vitest'
import { mount } from './mount.js'
test('my types work properly', () => {
  expectTypeOf(mount).toBeFunction()
  expectTypeOf(mount).parameter(0).toMatchTypeOf<{ name: string }>()
  // @ts-expect-error name is a string
  assertType(mount({ name: 42 }))
})
```

## Sharding [​](index.md#sharding)

Run tests on different machines using [`--shard`](_guide_cli.md#shard) and [`--reporter=blob`](_guide_reporters.md#blob-reporter) flags. All test and coverage results can be merged at the end of your CI pipeline using `--merge-reports` command:

bash

```
vitest --shard=1/2 --reporter=blob --coverage
vitest --shard=2/2 --reporter=blob --coverage
vitest --merge-reports --reporter=junit --coverage
```

See [`Improving Performance | Sharding`](_guide_improving-performance.md#sharding) for more information.

## Environment Variables [​](index.md#environment-variables)

Vitest exclusively autoloads environment variables prefixed with `VITE_` from `.env` files to maintain compatibility with frontend-related tests, adhering to [Vite's established convention](https://vitejs.dev/guide/env-and-mode.html#env-files). To load every environmental variable from `.env` files anyway, you can use `loadEnv` method imported from `vite`:

vitest.config.ts

ts

```
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
export default defineConfig(({ mode }) => ({
  test: {
    // mode defines what ".env.{mode}" file to choose if exists
    env: loadEnv(mode, process.cwd(), ''),
  },
}))
```

#### \_guide_filtering.md

> Source: https://vitest.dev/guide/filtering
> Scraped: 4/15/2025, 1:07:27 AM

## Test Filtering [​](index.md#test-filtering)

Filtering, timeouts, concurrent for suite and tests

## CLI [​](index.md#cli)

You can use CLI to filter test files by name:

Will only execute test files that contain `basic`, e.g.

```
basic.test.ts
basic-foo.test.ts
basic/foo.test.ts
```

You can also use the `-t, --testNamePattern <pattern>` option to filter tests by full name. This can be helpful when you want to filter by the name defined within a file rather than the filename itself.

Since Vitest 3, you can also specify the test by filename and line number:

bash

```
$ vitest basic/foo.test.ts:10
```

WARNING

Note that Vitest requires the full filename for this feature to work. It can be relative to the current working directory or an absolute file path.

bash

```
$ vitest basic/foo.js:10 # ✅

$ vitest ./basic/foo.js:10 # ✅

$ vitest /users/project/basic/foo.js:10 # ✅

$ vitest foo:10 # ❌

$ vitest ./basic/foo:10 # ❌
```

At the moment Vitest also doesn't support ranges:

bash

```
$ vitest basic/foo.test.ts:10, basic/foo.test.ts:25 # ✅

$ vitest basic/foo.test.ts:10-25 # ❌
```

## Specifying a Timeout [​](index.md#specifying-a-timeout)

You can optionally pass a timeout in milliseconds as a third argument to tests. The default is [5 seconds](_config_.md#testtimeout).

ts

```
import { test } from 'vitest'
test('name', async () => { /* ... */ }, 1000)
```

Hooks also can receive a timeout, with the same 5 seconds default.

ts

```
import { beforeAll } from 'vitest'
beforeAll(async () => { /* ... */ }, 1000)
```

## Skipping Suites and Tests [​](index.md#skipping-suites-and-tests)

Use `.skip` to avoid running certain suites or tests

ts

```
import { assert, describe, it } from 'vitest'
describe.skip('skipped suite', () => {
  it('test', () => {
    // Suite skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})
describe('suite', () => {
  it.skip('skipped test', () => {
    // Test skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})
```

## Selecting Suites and Tests to Run [​](index.md#selecting-suites-and-tests-to-run)

Use `.only` to only run certain suites or tests

ts

```
import { assert, describe, it } from 'vitest'
// Only this suite (and others marked with only) are run
describe.only('suite', () => {
  it('test', () => {
    assert.equal(Math.sqrt(4), 3)
  })
})
describe('another suite', () => {
  it('skipped test', () => {
    // Test skipped, as tests are running in Only mode
    assert.equal(Math.sqrt(4), 3)
  })
  it.only('test', () => {
    // Only this test (and others marked with only) are run
    assert.equal(Math.sqrt(4), 2)
  })
})
```

## Unimplemented Suites and Tests [​](index.md#unimplemented-suites-and-tests)

Use `.todo` to stub suites and tests that should be implemented

ts

```
import { describe, it } from 'vitest'
// An entry will be shown in the report for this suite
describe.todo('unimplemented suite')
// An entry will be shown in the report for this test
describe('suite', () => {
  it.todo('unimplemented test')
})
```

#### \_guide_ide.md

> Source: https://vitest.dev/guide/ide
> Scraped: 4/15/2025, 1:07:29 AM

## IDE Integrations [​](index.md#ide-integrations)

## VS Code Official [​](index.md#vs-code)

![](https://raw.githubusercontent.com/vitest-dev/vscode/main/img/cover.png)

[GitHub](https://github.com/vitest-dev/vscode) | [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)

![](https://i.ibb.co/bJCbCf2/202203292020.gif)

## JetBrains IDE [​](index.md#jetbrains-ide)

WebStorm, PhpStorm, IntelliJ IDEA Ultimate, and other JetBrains IDEs come with built-in support for Vitest.

![](https://raw.githubusercontent.com/kricact/WS-info/main/banners/vitest-jb.png)

[WebStorm Help](https://www.jetbrains.com/help/webstorm/vitest.html) | [IntelliJ IDEA Ultimate Help](https://www.jetbrains.com/help/idea/vitest.html) | [PhpStorm Help](https://www.jetbrains.com/help/phpstorm/vitest.html)

![Vitest WebStorm Demo](https://raw.githubusercontent.com/kricact/WS-info/main/gifs/vitest-run-all.gif)

## Wallaby.js Paid (free for OSS) [​](index.md#wallaby-js-paid-free-for-oss)

Created by [The Wallaby Team](https://wallabyjs.com/)

[Wallaby.js](https://wallabyjs.com/) runs your Vitest tests immediately as you type, highlighting results in your IDE right next to your code.

![](https://wallabyjs.com/assets/img/vitest_cover.png)

[VS Code](https://marketplace.visualstudio.com/items?itemName=WallabyJs.wallaby-vscode) | [JetBrains](https://plugins.jetbrains.com/plugin/15742-wallaby) | [Visual Studio](https://marketplace.visualstudio.com/items?itemName=vs-publisher-999439.WallabyjsforVisualStudio2022) | [Sublime Text](https://packagecontrol.io/packages/Wallaby)

![Wallaby VS Code Demo](https://wallabyjs.com/assets/img/vitest_demo.gif)

#### \_guide_improving-performance.md

> Source: https://vitest.dev/guide/improving-performance
> Scraped: 4/15/2025, 1:07:29 AM

## Improving Performance [​](index.md#improving-performance)

## Test isolation [​](index.md#test-isolation)

By default Vitest runs every test file in an isolated environment based on the [pool](_config_.md#pool):

- `threads` pool runs every test file in a separate [`Worker`](https://nodejs.org/api/worker_threads.html#class-worker)
- `forks` pool runs every test file in a separate [forked child process](https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options)
- `vmThreads` pool runs every test file in a separate [VM context](https://nodejs.org/api/vm.html#vmcreatecontextcontextobject-options), but it uses workers for parallelism

This greatly increases test times, which might not be desirable for projects that don't rely on side effects and properly cleanup their state (which is usually true for projects with `node` environment). In this case disabling isolation will improve the speed of your tests. To do that, you can provide `--no-isolate` flag to the CLI or set [`test.isolate`](_config_.md#isolate) property in the config to `false`.

CLIvitest.config.js

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    isolate: false,
    // you can also disable isolation only for specific pools
    poolOptions: {
      forks: {
        isolate: false,
      },
    },
  },
})
```

TIP

If you are using `vmThreads` pool, you cannot disable isolation. Use `threads` pool instead to improve your tests performance.

For some projects, it might also be desirable to disable parallelism to improve startup time. To do that, provide `--no-file-parallelism` flag to the CLI or set [`test.fileParallelism`](_config_.md#fileparallelism) property in the config to `false`.

CLIvitest.config.js

bash

```
vitest --no-file-parallelism
```

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    fileParallelism: false,
  },
})
```

## Pool [​](index.md#pool)

By default Vitest runs tests in `pool: 'forks'`. While `'forks'` pool is better for compatibility issues ([hanging process](_guide_common-errors.md#failed-to-terminate-worker) and [segfaults](_guide_common-errors.md#segfaults-and-native-code-errors)), it may be slightly slower than `pool: 'threads'` in larger projects.

You can try to improve test run time by switching `pool` option in configuration:

CLIvitest.config.js

bash

```
vitest --pool=threads
```

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    pool: 'threads',
  },
})
```

## Sharding [​](index.md#sharding)

Test sharding means running a small subset of test cases at a time. It can be useful when you have multiple machines that could be used to run tests simultaneously.

To split Vitest tests on multiple different runs, use [`--shard`](_guide_cli.md#shard) option with [`--reporter=blob`](_guide_reporters.md#blob-reporter) option:

sh

```
vitest run --reporter=blob --shard=1/3 # 1st machine

vitest run --reporter=blob --shard=2/3 # 2nd machine

vitest run --reporter=blob --shard=3/3 # 3rd machine
```

Collect the results stored in `.vitest-reports` directory from each machine and merge them with [`--merge-reports`](_guide_cli.md#merge-reports) option:

Github action example

This setup is also used at [https://github.com/vitest-tests/test-sharding](https://github.com/vitest-tests/test-sharding).

yaml

```
# Inspired from https://playwright.dev/docs/test-sharding

name: Tests
on:
  push:
    branches:
      - main
jobs:
  tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install pnpm
        uses: pnpm/action-setup@a7487c7e89a18df4991f7f222e4898a00d66ddda # v4.1.0

      - name: Install dependencies
        run: pnpm i
      - name: Run tests
        run: pnpm run test --reporter=blob --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
      - name: Upload blob report to GitHub Actions Artifacts
        if: ${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: .vitest-reports/*
          include-hidden-files: true
          retention-days: 1
  merge-reports:
    if: ${{ !cancelled() }}
    needs: [tests]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install pnpm
        uses: pnpm/action-setup@a7487c7e89a18df4991f7f222e4898a00d66ddda # v4.1.0

      - name: Install dependencies
        run: pnpm i
      - name: Download blob reports from GitHub Actions Artifacts
        uses: actions/download-artifact@v4
        with:
          path: .vitest-reports
          pattern: blob-report-*
          merge-multiple: true
      - name: Merge reports
        run: npx vitest --merge-reports
```

TIP

Test sharding can also become useful on high CPU-count machines.

Vitest will run only a single Vite server in its main thread. Rest of the threads are used to run test files. In a high CPU-count machine the main thread can become a bottleneck as it cannot handle all the requests coming from the threads. For example in 32 CPU machine the main thread is responsible to handle load coming from 31 test threads.

To reduce the load from main thread's Vite server you can use test sharding. The load can be balanced on multiple Vite server.

sh

```
# Example for splitting tests on 32 CPU to 4 shards.

# As each process needs 1 main thread, there's 7 threads for test runners (1+7)*4 = 32
# Use VITEST_MAX_THREADS or VITEST_MAX_FORKS depending on the pool:

VITEST_MAX_THREADS=7 vitest run --reporter=blob --shard=1/4 & \
VITEST_MAX_THREADS=7 vitest run --reporter=blob --shard=2/4 & \
VITEST_MAX_THREADS=7 vitest run --reporter=blob --shard=3/4 & \
VITEST_MAX_THREADS=7 vitest run --reporter=blob --shard=4/4 & \
wait # https://man7.org/linux/man-pages/man2/waitpid.2.html

vitest --merge-reports
```

#### \_guide_in-source.md

> Source: https://vitest.dev/guide/in-source
> Scraped: 4/15/2025, 1:07:29 AM

## In-Source Testing [​](index.md#in-source-testing)

Vitest provides a way to run tests within your source code along side the implementation, similar to [Rust's module tests](https://doc.rust-lang.org/book/ch11-03-test-organization.html#the-tests-module-and-cfgtest).

This makes the tests share the same closure as the implementations and able to test against private states without exporting. Meanwhile, it also brings a closer feedback loop for development.

WARNING

This guide explains how to write tests inside your source code. If you need to write tests in separate test files, follow the ["Writing Tests" guide](_guide_.md#writing-tests).

## Setup [​](index.md#setup)

To get started, put a `if (import.meta.vitest)` block at the end of your source file and write some tests inside it. For example:

src/index.ts

ts

```
// the implementation
export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0)
}
// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('add', () => {
    expect(add()).toBe(0)
    expect(add(1)).toBe(1)
    expect(add(1, 2, 3)).toBe(6)
  })
}
```

Update the `includeSource` config for Vitest to grab the files under `src/`:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
})
```

Then you can start to test!

## Production Build [​](index.md#production-build)

For the production build, you will need to set the `define` options in your config file, letting the bundler do the dead code elimination. For example, in Vite

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
})
```

### Other Bundlers [​](index.md#other-bundlers)

unbuild

build.config.ts

ts

```
import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
  replace: {
    'import.meta.vitest': 'undefined',
  },
  // other options
})
```

Learn more: [unbuild](https://github.com/unjs/unbuild)

Rollup

rollup.config.js

ts

```
import replace from '@rollup/plugin-replace'
export default {
  plugins: [
    replace({
      'import.meta.vitest': 'undefined',
    })
  ],
  // other options
}
```

Learn more: [Rollup](https://rollupjs.org/)

## TypeScript [​](index.md#typescript)

To get TypeScript support for `import.meta.vitest`, add `vitest/importMeta` to your `tsconfig.json`:

tsconfig.json

json

```
{
  "compilerOptions": {
    "types": [
      "vitest/importMeta"
    ]
  }
}
```

Reference to [`examples/in-source-test`](https://github.com/vitest-dev/vitest/tree/main/examples/in-source-test) for the full example.

## Notes [​](index.md#notes)

This feature could be useful for:

- Unit testing for small-scoped functions or utilities
- Prototyping
- Inline Assertion

It's recommended to **use separate test files instead** for more complex tests like components or E2E testing.

#### \_guide_migration.md

> Source: https://vitest.dev/guide/migration
> Scraped: 4/15/2025, 1:07:29 AM

## Migration Guide [​](index.md#migration-guide)

## Migrating to Vitest 3.0 [​](index.md#vitest-3)

### Test Options as a Third Argument [​](index.md#test-options-as-a-third-argument)

Vitest 3.0 prints a warning if you pass down an object as a third argument to `test` or `describe` functions:

ts

```
test('validation works', () => {
  // ...
}, { retry: 3 })
test('validation works', { retry: 3 }, () => {
  // ...
})
```

The next major version will throw an error if the third argument is an object. Note that the timeout number is not deprecated:

ts

```
test('validation works', () => {
  // ...
}, 1000) // Ok ✅
```

### `browser.name` and `browser.providerOptions` are Deprecated [​](index.md#browser-name-and-browser-provideroptions-are-deprecated)

Both [`browser.name`](_guide_browser_config.md#browser-name) and [`browser.providerOptions`](_guide_browser_config.md#browser-provideroptions) will be removed in Vitest 4. Instead of them, use the new [`browser.instances`](_guide_browser_config.md#browser-instances) option:

ts

```
export default defineConfig({
  test: {
    browser: {
      name: 'chromium',
      providerOptions: {
        launch: { devtools: true },
      },
      instances: [
        {
          browser: 'chromium',
          launch: { devtools: true },
        },
      ],
    },
  },
})
```

With the new `browser.instances` field you can also specify multiple browser configurations.

### `spy.mockReset` Now Restores the Original Implementation [​](index.md#spy-mockreset-now-restores-the-original-implementation)

There was no good way to reset the spy to the original implementation without reaplying the spy. Now, `spy.mockReset` will reset the implementation function to the original one instead of a fake noop.

ts

```
const foo = {
  bar: () => 'Hello, world!'
}
vi.spyOn(foo, 'bar').mockImplementation(() => 'Hello, mock!')
foo.bar() // 'Hello, mock!'
foo.bar.mockReset()
foo.bar() // undefined
foo.bar() // 'Hello, world!'
```

### `vi.spyOn` Reuses Mock if Method is Already Mocked [​](index.md#vi-spyon-reuses-mock-if-method-is-already-mocked)

Previously, Vitest would always assign a new spy when spying on an object. This caused errors with `mockRestore` because it would restore the spy to the previous spy instead of the original function:

ts

```
vi.spyOn(fooService, 'foo').mockImplementation(() => 'bar')
vi.spyOn(fooService, 'foo').mockImplementation(() => 'bar')
vi.restoreAllMocks()
vi.isMockFunction(fooService.foo) // true
vi.isMockFunction(fooService.foo) // false
```

### Fake Timers Defaults [​](index.md#fake-timers-defaults)

Vitest no longer provides default `fakeTimers.toFake` options. Now, Vitest will mock any timer-related API if it is available (except `nextTick`). Namely, `performance.now()` is now mocked when `vi.useFakeTimers` is called.

ts

```
vi.useFakeTimers()
performance.now() // original
performance.now() // fake
```

You can revert to the previous behaviour by specifying timers when calling `vi.useFakeTimers` or globally in the config:

ts

```
export default defineConfig({
  test: {
    fakeTimers: {
      toFake: [
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval',
        'setImmediate',
        'clearImmediate',
        'Date',
      ]
    },
  },
})
```

### More Strict Error Equality [​](index.md#more-strict-error-equality)

Vitest now checks more properties when comparing errors via `toEqual` or `toThrowError`. Vitest now compares `name`, `message`, `cause` and `AggregateError.errors`. For `Error.cause`, the comparison is done asymmetrically:

ts

```
expect(new Error('hi', { cause: 'x' })).toEqual(new Error('hi')) // ✅
expect(new Error('hi')).toEqual(new Error('hi', { cause: 'x' })) // ❌
```

In addition to more properties check, Vitest now compares error prototypes. For example, if `TypeError` was thrown, the equality check should reference `TypeError`, not `Error`:

ts

```
expect(() => {
  throw new TypeError('type error')
})
  .toThrowError(new Error('type error'))
  .toThrowError(new TypeError('type error'))
```

See PR for more details: [#5876](https://github.com/vitest-dev/vitest/pull/5876).

### `module` condition export is not resolved by default on Vite 6 [​](index.md#module-condition-export-is-not-resolved-by-default-on-vite-6)

Vite 6 allows more flexible [`resolve.conditions`](https://vite.dev/config/shared-options#resolve-conditions) options and Vitest configures it to exclude `module` conditional export by default. See also [Vite 6 migration guide](https://v6.vite.dev/guide/migration#default-value-for-resolve-conditions) for the detail of Vite side changes.

### `Custom` Type is Deprecated API [​](index.md#custom-type-is-deprecated)

The `Custom` type is now an alias for the `Test` type. Note that Vitest updated the public types in 2.1 and changed exported names to `RunnerCustomCase` and `RunnerTestCase`:

ts

```
import {
  RunnerCustomCase,
  RunnerTestCase,
} from 'vitest'
```

If you are using `getCurrentSuite().custom()`, the `type` of the returned task is now is equal to `'test'`. The `Custom` type will be removed in Vitest 4.

### The `WorkspaceSpec` Type is No Longer Used API [​](index.md#the-workspacespec-type-is-no-longer-used)

In the public API this type was used in custom [sequencers](_config_.md#sequence-sequencer) before. Please, migrate to [`TestSpecification`](_advanced_api_test-specification.md) instead.

### `onTestFinished` and `onTestFailed` Now Receive a Context [​](index.md#ontestfinished-and-ontestfailed-now-receive-a-context)

The [`onTestFinished`](_api_.md#ontestfinished) and [`onTestFailed`](_api_.md#ontestfailed) hooks previously received a test result as the first argument. Now, they receive a test context, like `beforeEach` and `afterEach`.

### Changes to the Snapshot API API [​](index.md#changes-to-the-snapshot-api)

The public Snapshot API in `@vitest/snapshot` was changed to support multiple states within a single run. See PR for more details: [#6817](https://github.com/vitest-dev/vitest/pull/6817)

Note that this changes only affect developers using the Snapshot API directly. There were no changes to `.toMatchSnapshot` API.

### Changes to `resolveConfig` Type Signature API [​](index.md#changes-to-resolveconfig-type-signature)

The [`resolveConfig`](_advanced_api_.md#resolveconfig) is now more useful. Instead of accepting already resolved Vite config, it now accepts a user config and returns resolved config.

This function is not used internally and exposed exclusively as a public API.

### Cleaned up `vitest/reporters` types API [​](index.md#cleaned-up-vitest-reporters-types)

The `vitest/reporters` entrypoint now only exports reporters implementations and options types. If you need access to `TestCase`/`TestSuite` and other task related types, import them additionally from `vitest/node`.

### Coverage ignores test files even when `coverage.excludes` is overwritten. [​](index.md#coverage-ignores-test-files-even-when-coverage-excludes-is-overwritten)

It is no longer possible to include test files in coverage report by overwriting `coverage.excludes`. Test files are now always excluded.

## Migrating to Vitest 2.0 [​](index.md#vitest-2)

### Default Pool is `forks` [​](index.md#default-pool-is-forks)

Vitest 2.0 changes the default configuration for `pool` to `'forks'` for better stability. You can read the full motivation in [PR](https://github.com/vitest-dev/vitest/pull/5047).

If you've used `poolOptions` without specifying a `pool`, you might need to update the configuration:

ts

```
export default defineConfig({
  test: {
    poolOptions: {
      threads: {
        singleThread: true,
      },
      forks: {
        singleFork: true,
      },
    }
  }
})
```

### Hooks are Running in a Stack [​](index.md#hooks-are-running-in-a-stack)

Before Vitest 2.0, all hooks ran in parallel. In 2.0, all hooks run serially. Additionally, `afterAll`/`afterEach` hooks run in reverse order.

To revert to the parallel execution of hooks, change [`sequence.hooks`](_config_.md#sequence-hooks) to `'parallel'`:

ts

```
export default defineConfig({
  test: {
    sequence: {
      hooks: 'parallel',
    },
  },
})
```

### `suite.concurrent` Runs All Tests Concurrently [​](index.md#suite-concurrent-runs-all-tests-concurrently)

Previously, specifying `concurrent` on a suite would group concurrent tests by suites, running them sequentially. Now, following Jest's behavior, all tests run concurrently (subject to [`maxConcurrency`](_config_.md#maxconcurrency) limits).

### V8 Coverage's `coverage.ignoreEmptyLines` is Enabled by Default [​](index.md#v8-coverage-s-coverage-ignoreemptylines-is-enabled-by-default)

The default value of `coverage.ignoreEmptyLines` is now true. This significant change may affect code coverage reports, requiring adjustments to coverage thresholds for some projects. This adjustment only affects the default setting when `coverage.provider` is `'v8'`.

### Removal of the `watchExclude` Option [​](index.md#removal-of-the-watchexclude-option)

Vitest uses Vite's watcher. Exclude files or directories by adding them to `server.watch.ignored`:

ts

```
export default defineConfig({
  server: {
    watch: {
      ignored: ['!node_modules/examplejs']
    }
  }
})
```

### `--segfault-retry` Removed [​](index.md#segfault-retry-removed)

With the changes to default pool, this option is no longer needed. If you experience segfault errors, try switching to `'forks'` pool. If the problem persists, please open a new issue with a reproduction.

### Empty Task In Suite Tasks Removed [​](index.md#empty-task-in-suite-tasks-removed)

This is the change to the advanced [task API](_advanced_runner.md#your-task-function). Previously, traversing `.suite` would eventually lead to the empty internal suite that was used instead of a file task.

This makes `.suite` optional; if the task is defined at the top level, it will not have a suite. You can fallback to the `.file` property that is now present on all tasks (including the file task itself, so be careful not to fall into the endless recursion).

This change also removes the file from `expect.getState().currentTestName` and makes `expect.getState().testPath` required.

### `task.meta` is Added to the JSON Reporter [​](index.md#task-meta-is-added-to-the-json-reporter)

JSON reporter now prints `task.meta` for every assertion result.

### Simplified Generic Types of Mock Functions (e.g. `vi.fn<T>`, `Mock<T>`) [​](index.md#simplified-generic-types-of-mock-functions-e-g-vi-fn-t-mock-t)

Previously `vi.fn<TArgs, TReturn>` accepted two generic types separately for arguments and return value. This is changed to directly accept a function type `vi.fn<T>` to simplify the usage.

ts

```
import { vi } from 'vitest'
import type { Mock } from 'vitest'
const add = (x: number, y: number): number => x + y
// using vi.fn<T>
const mockAdd = vi.fn<Parameters<typeof add>, ReturnType<typeof add>>()
const mockAdd = vi.fn<typeof add>()
// using Mock<T>
const mockAdd: Mock<Parameters<typeof add>, ReturnType<typeof add>> = vi.fn()
const mockAdd: Mock<typeof add> = vi.fn()
```

### Accessing Resolved `mock.results` [​](index.md#accessing-resolved-mock-results)

Previously Vitest resolved `mock.results` values if the function returned a Promise. Now there is a separate [`mock.settledResults`](_api_mock.md#mock-settledresults) property that populates only when the returned Promise is resolved or rejected.

ts

```
const fn = vi.fn().mockResolvedValueOnce('result')
await fn()
const result = fn.mock.results[0] // 'result'
const result = fn.mock.results[0] // 'Promise<result>'
const settledResult = fn.mock.settledResults[0] // 'result'
```

With this change, we also introduce new [`toHaveResolved*`](_api_expect.md#tohaveresolved) matchers similar to `toHaveReturned` to make migration easier if you used `toHaveReturned` before:

ts

```
const fn = vi.fn().mockResolvedValueOnce('result')
await fn()
expect(fn).toHaveReturned('result')
expect(fn).toHaveResolved('result')
```

### Browser Mode [​](index.md#browser-mode)

Vitest Browser Mode had a lot of changes during the beta cycle. You can read about our philosophy on the Browser Mode in the [GitHub discussion page](https://github.com/vitest-dev/vitest/discussions/5828).

Most of the changes were additive, but there were some small breaking changes:

- `none` provider was renamed to `preview` [#5842](https://github.com/vitest-dev/vitest/pull/5826)
- `preview` provider is now a default [#5842](https://github.com/vitest-dev/vitest/pull/5826)
- `indexScripts` is renamed to `orchestratorScripts` [#5842](https://github.com/vitest-dev/vitest/pull/5842)

### Deprecated Options Removed [​](index.md#deprecated-options-removed)

Some deprecated options were removed:

- `vitest typecheck` command - use `vitest --typecheck` instead
- `VITEST_JUNIT_CLASSNAME` and `VITEST_JUNIT_SUITE_NAME` env variables (use reporter options instead)
- check for `c8` coverage (use coverage-v8 instead)
- export of `SnapshotEnvironment` from `vitest` - import it from `vitest/snapshot` instead
- `SpyInstance` is removed in favor of `MockInstance`

## Migrating to Vitest 1.0 [​](index.md#migrating-to-vitest-1-0)

### Minimum Requirements [​](index.md#minimum-requirements)

Vitest 1.0 requires Vite 5.0 and Node.js 18 or higher.

All `@vitest/*` sub packages require Vitest version 1.0.

### Snapshots Update [#3961](https://github.com/vitest-dev/vitest/pull/3961) [​](index.md#snapshots-update-3961)

Quotes in snapshots are no longer escaped, and all snapshots use backtick quotes (\`) even if the string is just a single line.

1.  Quotes are no longer escaped:

diff

```
expect({ foo: 'bar' }).toMatchInlineSnapshot(`
  Object {
-    \\"foo\\": \\"bar\\",
+    "foo": "bar",
  }
`)
```

1.  One-line snapshots now use "\`" quotes instead of ':

diff

```
- expect('some string').toMatchInlineSnapshot('"some string"')
+ expect('some string').toMatchInlineSnapshot(`"some string"`)
```

There were also [changes](https://github.com/vitest-dev/vitest/pull/4076) to `@vitest/snapshot` package. If you are not using it directly, you don't need to change anything.

- You no longer need to extend `SnapshotClient` just to override `equalityCheck` method: just pass it down as `isEqual` when initiating an instance
- `client.setTest` was renamed to `client.startCurrentRun`
- `client.resetCurrent` was renamed to `client.finishCurrentRun`

### Pools are Standardized [#4172](https://github.com/vitest-dev/vitest/pull/4172) [​](index.md#pools-are-standardized-4172)

We removed a lot of configuration options to make it easier to configure the runner to your needs. Please, have a look at migration examples if you rely on `--threads` or other related flags.

- `--threads` is now `--pool=threads`
- `--no-threads` is now `--pool=forks`
- `--single-thread` is now `--poolOptions.threads.singleThread`
- `--experimental-vm-threads` is now `--pool=vmThreads`
- `--experimental-vm-worker-memory-limit` is now `--poolOptions.vmThreads.memoryLimit`
- `--isolate` is now `--poolOptions.<pool-name>.isolate` and `browser.isolate`
- `test.maxThreads` is now `test.poolOptions.<pool-name>.maxThreads`
- `test.minThreads` is now `test.poolOptions.<pool-name>.minThreads`
- `test.useAtomics` is now `test.poolOptions.<pool-name>.useAtomics`
- `test.poolMatchGlobs.child_process` is now `test.poolMatchGlobs.forks`
- `test.poolMatchGlobs.experimentalVmThreads` is now `test.poolMatchGlobs.vmThreads`

diff

```
{
  scripts: {
-    "test": "vitest --no-threads"
     // For identical behaviour:
+    "test": "vitest --pool forks --poolOptions.forks.singleFork"
     // Or multi parallel forks:
+    "test": "vitest --pool forks"
  }
}
```

diff

```
{
  scripts: {
-    "test": "vitest --experimental-vm-threads"
+    "test": "vitest --pool vmThreads"
  }
}
```

diff

```
{
  scripts: {
-    "test": "vitest --isolate false"
+    "test": "vitest --poolOptions.threads.isolate false"
  }
}
```

diff

```
{
  scripts: {
-    "test": "vitest --no-threads --isolate false"
+    "test": "vitest --pool forks --poolOptions.forks.isolate false"
  }
}
```

### Changes to Coverage [#4265](https://github.com/vitest-dev/vitest/pull/4265), [#4442](https://github.com/vitest-dev/vitest/pull/4442) [​](index.md#changes-to-coverage-4265-4442)

Option `coverage.all` is now enabled by default. This means that all project files matching `coverage.include` pattern will be processed even if they are not executed.

Coverage thresholds API's shape was changed, and it now supports specifying thresholds for specific files using glob patterns:

diff

```
export default defineConfig({
  test: {
    coverage: {
-      perFile: true,
-      thresholdAutoUpdate: true,
-      100: true,
-      lines: 100,
-      functions: 100,
-      branches: 100,
-      statements: 100,
+      thresholds: {
+        perFile: true,
+        autoUpdate: true,
+        100: true,
+        lines: 100,
+        functions: 100,
+        branches: 100,
+        statements: 100,
+      }
    }
  }
})
```

### Mock Types [#4400](https://github.com/vitest-dev/vitest/pull/4400) [​](index.md#mock-types-4400)

A few types were removed in favor of Jest-style "Mock" naming.

diff

```
- import { EnhancedSpy, SpyInstance } from 'vitest'
+ import { MockInstance } from 'vitest'
```

WARNING

`SpyInstance` is deprecated in favor of `MockInstance` and will be removed in the next major release.

### Timer mocks [#3925](https://github.com/vitest-dev/vitest/pull/3925) [​](index.md#timer-mocks-3925)

`vi.useFakeTimers()` no longer automatically mocks [`process.nextTick`](https://nodejs.org/api/process.html#processnexttickcallback-args). It is still possible to mock `process.nextTick` by explicitly specifying it by using `vi.useFakeTimers({ toFake: ['nextTick'] })`.

However, mocking `process.nextTick` is not possible when using `--pool=forks`. Use a different `--pool` option if you need `process.nextTick` mocking.

## Migrating from Jest [​](index.md#jest)

Vitest has been designed with a Jest compatible API, in order to make the migration from Jest as simple as possible. Despite those efforts, you may still run into the following differences:

### Globals as a Default [​](index.md#globals-as-a-default)

Jest has their [globals API](https://jestjs.io/docs/api) enabled by default. Vitest does not. You can either enable globals via [the `globals` configuration setting](_config_.md#globals) or update your code to use imports from the `vitest` module instead.

If you decide to keep globals disabled, be aware that common libraries like [`testing-library`](https://testing-library.com/) will not run auto DOM [cleanup](https://testing-library.com/docs/svelte-testing-library/api/#cleanup).

### `spy.mockReset` [​](index.md#spy-mockreset)

Jest's [`mockReset`](https://jestjs.io/docs/mock-function-api#mockfnmockreset) replaces the mock implementation with an empty function that returns `undefined`.

Vitest's [`mockReset`](_api_mock.md#mockreset) resets the mock implementation to its original. That is, resetting a mock created by `vi.fn(impl)` will reset the mock implementation to `impl`.

### Module Mocks [​](index.md#module-mocks)

When mocking a module in Jest, the factory argument's return value is the default export. In Vitest, the factory argument has to return an object with each export explicitly defined. For example, the following `jest.mock` would have to be updated as follows:

ts

```
jest.mock('./some-path', () => 'hello')
vi.mock('./some-path', () => ({
  default: 'hello',
}))
```

For more details please refer to the [`vi.mock` api section](_api_vi.md#vi-mock).

### Auto-Mocking Behaviour [​](index.md#auto-mocking-behaviour)

Unlike Jest, mocked modules in `<root>/__mocks__` are not loaded unless `vi.mock()` is called. If you need them to be mocked in every test, like in Jest, you can mock them inside [`setupFiles`](_config_.md#setupfiles).

### Importing the Original of a Mocked Package [​](index.md#importing-the-original-of-a-mocked-package)

If you are only partially mocking a package, you might have previously used Jest's function `requireActual`. In Vitest, you should replace these calls with `vi.importActual`.

ts

```
const { cloneDeep } = jest.requireActual('lodash/cloneDeep')
const { cloneDeep } = await vi.importActual('lodash/cloneDeep')
```

### Extends mocking to external libraries [​](index.md#extends-mocking-to-external-libraries)

Where Jest does it by default, when mocking a module and wanting this mocking to be extended to other external libraries that use the same module, you should explicitly tell which 3rd-party library you want to be mocked, so the external library would be part of your source code, by using [server.deps.inline](_config_.md#server-deps-inline).

```
server.deps.inline: ["lib-name"]
```

### expect.getState().currentTestName [​](index.md#expect-getstate-currenttestname)

Vitest's `test` names are joined with a `>` symbol to make it easier to distinguish tests from suites, while Jest uses an empty space ().

diff

```
- `${describeTitle} ${testTitle}`
+ `${describeTitle} > ${testTitle}`
```

### Envs [​](index.md#envs)

Just like Jest, Vitest sets `NODE_ENV` to `test`, if it wasn't set before. Vitest also has a counterpart for `JEST_WORKER_ID` called `VITEST_POOL_ID` (always less than or equal to `maxThreads`), so if you rely on it, don't forget to rename it. Vitest also exposes `VITEST_WORKER_ID` which is a unique ID of a running worker - this number is not affected by `maxThreads`, and will increase with each created worker.

### Replace property [​](index.md#replace-property)

If you want to modify the object, you will use [replaceProperty API](https://jestjs.io/docs/jest-object#jestreplacepropertyobject-propertykey-value) in Jest, you can use [`vi.stubEnv`](_api_.md#vi-stubenv) or [`vi.spyOn`](_api_vi.md#vi-spyon) to do the same also in Vitest.

### Done Callback [​](index.md#done-callback)

From Vitest v0.10.0, the callback style of declaring tests is deprecated. You can rewrite them to use `async`/`await` functions, or use Promise to mimic the callback style.

js

```
it('should work', (done) => {
it('should work', () => new Promise(done => {
  // ...
  done()
})
}))
```

### Hooks [​](index.md#hooks)

`beforeAll`/`beforeEach` hooks may return [teardown function](_api_.md#setup-and-teardown) in Vitest. Because of that you may need to rewrite your hooks declarations, if they return something other than `undefined` or `null`:

ts

```
beforeEach(() => setActivePinia(createTestingPinia()))
beforeEach(() => { setActivePinia(createTestingPinia()) })
```

In Jest hooks are called sequentially (one after another). By default, Vitest runs hooks in parallel. To use Jest's behavior, update [`sequence.hooks`](_config_.md#sequence-hooks) option:

ts

```
export default defineConfig({
  test: {
    sequence: {
      hooks: 'list',
    }
  }
})
```

### Types [​](index.md#types)

Vitest doesn't have an equivalent to `jest` namespace, so you will need to import types directly from `vitest`:

ts

```
let fn: jest.Mock<(name: string) => number>
import type { Mock } from 'vitest'
let fn: Mock<(name: string) => number>
```

### Timers [​](index.md#timers)

Vitest doesn't support Jest's legacy timers.

### Timeout [​](index.md#timeout)

If you used `jest.setTimeout`, you would need to migrate to `vi.setConfig`:

ts

```
jest.setTimeout(5_000)
vi.setConfig({ testTimeout: 5_000 })
```

### Vue Snapshots [​](index.md#vue-snapshots)

This is not a Jest-specific feature, but if you previously were using Jest with vue-cli preset, you will need to install [`jest-serializer-vue`](https://github.com/eddyerburgh/jest-serializer-vue) package, and use it inside [setupFiles](_config_.md#setupfiles):

vite.config.jstests/unit/setup.js

js

```
import { defineConfig } from 'vite'
export default defineConfig({
  test: {
    setupFiles: ['./tests/unit/setup.js']
  }
})
```

js

```
import vueSnapshotSerializer from 'jest-serializer-vue'
expect.addSnapshotSerializer(vueSnapshotSerializer)
```

Otherwise your snapshots will have a lot of escaped `"` characters.

#### \_guide_mocking.md

> Source: https://vitest.dev/guide/mocking
> Scraped: 4/15/2025, 1:07:28 AM

## Mocking [​](index.md#mocking)

When writing tests it's only a matter of time before you need to create a "fake" version of an internal — or external — service. This is commonly referred to as **mocking**. Vitest provides utility functions to help you out through its `vi` helper. You can import it from `vitest` or access it globally if [`global` configuration](_config_.md#globals) is enabled.

WARNING

Always remember to clear or restore mocks before or after each test run to undo mock state changes between runs! See [`mockReset`](_api_mock.md#mockreset) docs for more info.

If you are not familiar with `vi.fn`, `vi.mock` or `vi.spyOn` methods, check the [API section](_api_vi.md) first.

## Dates [​](index.md#dates)

Sometimes you need to be in control of the date to ensure consistency when testing. Vitest uses [`@sinonjs/fake-timers`](https://github.com/sinonjs/fake-timers) package for manipulating timers, as well as system date. You can find more about the specific API in detail [here](_api_vi.md#vi-setsystemtime).

### Example [​](index.md#example)

js

```
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
const businessHours = [9, 17]
function purchase() {
  const currentHour = new Date().getHours()
  const [open, close] = businessHours
  if (currentHour > open && currentHour < close) {
    return { message: 'Success' }
  }
  return { message: 'Error' }
}
describe('purchasing flow', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })
  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })
  it('allows purchases within business hours', () => {
    // set hour within business hours
    const date = new Date(2000, 1, 1, 13)
    vi.setSystemTime(date)
    // access Date.now() will result in the date set above
    expect(purchase()).toEqual({ message: 'Success' })
  })
  it('disallows purchases outside of business hours', () => {
    // set hour outside business hours
    const date = new Date(2000, 1, 1, 19)
    vi.setSystemTime(date)
    // access Date.now() will result in the date set above
    expect(purchase()).toEqual({ message: 'Error' })
  })
})
```

## Functions [​](index.md#functions)

Mocking functions can be split up into two different categories; _spying & mocking_.

Sometimes all you need is to validate whether or not a specific function has been called (and possibly which arguments were passed). In these cases a spy would be all we need which you can use directly with `vi.spyOn()` ([read more here](_api_vi.md#vi-spyon)).

However spies can only help you **spy** on functions, they are not able to alter the implementation of those functions. In the case where we do need to create a fake (or mocked) version of a function we can use `vi.fn()` ([read more here](_api_vi.md#vi-fn)).

We use [Tinyspy](https://github.com/tinylibs/tinyspy) as a base for mocking functions, but we have our own wrapper to make it `jest` compatible. Both `vi.fn()` and `vi.spyOn()` share the same methods, however only the return result of `vi.fn()` is callable.

### Example [​](index.md#example-1)

js

```
import { afterEach, describe, expect, it, vi } from 'vitest'
const messages = {
  items: [
    { message: 'Simple test message', from: 'Testman' },
    // ...
  ],
  getLatest, // can also be a `getter or setter if supported`
}
function getLatest(index = messages.items.length - 1) {
  return messages.items[index]
}
describe('reading messages', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should get the latest message with a spy', () => {
    const spy = vi.spyOn(messages, 'getLatest')
    expect(spy.getMockName()).toEqual('getLatest')
    expect(messages.getLatest()).toEqual(
      messages.items[messages.items.length - 1],
    )
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockImplementationOnce(() => 'access-restricted')
    expect(messages.getLatest()).toEqual('access-restricted')
    expect(spy).toHaveBeenCalledTimes(2)
  })
  it('should get with a mock', () => {
    const mock = vi.fn().mockImplementation(getLatest)
    expect(mock()).toEqual(messages.items[messages.items.length - 1])
    expect(mock).toHaveBeenCalledTimes(1)
    mock.mockImplementationOnce(() => 'access-restricted')
    expect(mock()).toEqual('access-restricted')
    expect(mock).toHaveBeenCalledTimes(2)
    expect(mock()).toEqual(messages.items[messages.items.length - 1])
    expect(mock).toHaveBeenCalledTimes(3)
  })
})
```

### More [​](index.md#more)

- [Jest's Mock Functions](https://jestjs.io/docs/mock-function-api)

## Globals [​](index.md#globals)

You can mock global variables that are not present with `jsdom` or `node` by using [`vi.stubGlobal`](_api_vi.md#vi-stubglobal) helper. It will put the value of the global variable into a `globalThis` object.

ts

```
import { vi } from 'vitest'
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
// now you can access it as `IntersectionObserver` or `window.IntersectionObserver`
```

## Modules [​](index.md#modules)

Mock modules observe third-party-libraries, that are invoked in some other code, allowing you to test arguments, output or even redeclare its implementation.

See the [`vi.mock()` API section](_api_vi.md#vi-mock) for a more in-depth detailed API description.

### Automocking Algorithm [​](index.md#automocking-algorithm)

If your code is importing a mocked module, without any associated `__mocks__` file or `factory` for this module, Vitest will mock the module itself by invoking it and mocking every export.

The following principles apply

- All arrays will be emptied
- All primitives and collections will stay the same
- All objects will be deeply cloned
- All instances of classes and their prototypes will be deeply cloned

### Virtual Modules [​](index.md#virtual-modules)

Vitest supports mocking Vite [virtual modules](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention). It works differently from how virtual modules are treated in Jest. Instead of passing down `virtual: true` to a `vi.mock` function, you need to tell Vite that module exists otherwise it will fail during parsing. You can do that in several ways:

1.  Provide an alias

vitest.config.js

ts

```
import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'
export default defineConfig({
  test: {
    alias: {
      '$app/forms': resolve('./mocks/forms.js'),
    },
  },
})
```

1.  Provide a plugin that resolves a virtual module

vitest.config.js

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  plugins: [
    {
      name: 'virtual-modules',
      resolveId(id) {
        if (id === '$app/forms') {
          return 'virtual:$app/forms'
        }
      },
    },
  ],
})
```

The benefit of the second approach is that you can dynamically create different virtual entrypoints. If you redirect several virtual modules into a single file, then all of them will be affected by `vi.mock`, so make sure to use unique identifiers.

### Mocking Pitfalls [​](index.md#mocking-pitfalls)

Beware that it is not possible to mock calls to methods that are called inside other methods of the same file. For example, in this code:

foobar.js

ts

```
export function foo() {
  return 'foo'
}
export function foobar() {
  return `${foo()}bar`
}
```

It is not possible to mock the `foo` method from the outside because it is referenced directly. So this code will have no effect on the `foo` call inside `foobar` (but it will affect the `foo` call in other modules):

foobar.test.ts

ts

```
import { vi } from 'vitest'
import * as mod from './foobar.js'
// this will only affect "foo" outside of the original module
vi.spyOn(mod, 'foo')
vi.mock('./foobar.js', async (importOriginal) => {
  return {
    ...await importOriginal<typeof import('./foobar.js')>(),
    // this will only affect "foo" outside of the original module
    foo: () => 'mocked'
  }
})
```

You can confirm this behaviour by providing the implementation to the `foobar` method directly:

foobar.test.js

ts

```
import * as mod from './foobar.js'
vi.spyOn(mod, 'foo')
// exported foo references mocked method
mod.foobar(mod.foo)
```

foobar.js

ts

```
export function foo() {
  return 'foo'
}
export function foobar(injectedFoo) {
  return injectedFoo === foo // false
}
```

This is the intended behaviour. It is usually a sign of bad code when mocking is involved in such a manner. Consider refactoring your code into multiple files or improving your application architecture by using techniques such as [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection).

### Example [​](index.md#example-2)

js

```
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Client } from 'pg'
import { failure, success } from './handlers.js'
// get todos
export async function getTodos(event, context) {
  const client = new Client({
    // ...clientOptions
  })
  await client.connect()
  try {
    const result = await client.query('SELECT * FROM todos;')
    client.end()
    return success({
      message: `${result.rowCount} item(s) returned`,
      data: result.rows,
      status: true,
    })
  }
  catch (e) {
    console.error(e.stack)
    client.end()
    return failure({ message: e, status: false })
  }
}
vi.mock('pg', () => {
  const Client = vi.fn()
  Client.prototype.connect = vi.fn()
  Client.prototype.query = vi.fn()
  Client.prototype.end = vi.fn()
  return { Client }
})
vi.mock('./handlers.js', () => {
  return {
    success: vi.fn(),
    failure: vi.fn(),
  }
})
describe('get a list of todo items', () => {
  let client
  beforeEach(() => {
    client = new Client()
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should return items successfully', async () => {
    client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 })
    await getTodos()
    expect(client.connect).toBeCalledTimes(1)
    expect(client.query).toBeCalledWith('SELECT * FROM todos;')
    expect(client.end).toBeCalledTimes(1)
    expect(success).toBeCalledWith({
      message: '0 item(s) returned',
      data: [],
      status: true,
    })
  })
  it('should throw an error', async () => {
    const mError = new Error('Unable to retrieve rows')
    client.query.mockRejectedValueOnce(mError)
    await getTodos()
    expect(client.connect).toBeCalledTimes(1)
    expect(client.query).toBeCalledWith('SELECT * FROM todos;')
    expect(client.end).toBeCalledTimes(1)
    expect(failure).toBeCalledWith({ message: mError, status: false })
  })
})
```

## File System [​](index.md#file-system)

Mocking the file system ensures that the tests do not depend on the actual file system, making the tests more reliable and predictable. This isolation helps in avoiding side effects from previous tests. It allows for testing error conditions and edge cases that might be difficult or impossible to replicate with an actual file system, such as permission issues, disk full scenarios, or read/write errors.

Vitest doesn't provide any file system mocking API out of the box. You can use `vi.mock` to mock the `fs` module manually, but it's hard to maintain. Instead, we recommend using [`memfs`](https://www.npmjs.com/package/memfs) to do that for you. `memfs` creates an in-memory file system, which simulates file system operations without touching the actual disk. This approach is fast and safe, avoiding any potential side effects on the real file system.

### Example [​](index.md#example-3)

To automatically redirect every `fs` call to `memfs`, you can create `__mocks__/fs.cjs` and `__mocks__/fs/promises.cjs` files at the root of your project:

\_\_mocks\_\_/fs.cjs\_\_mocks\_\_/fs/promises.cjs

ts

```
// we can also use `import`, but then
// every export should be explicitly defined
const { fs } = require('memfs')
module.exports = fs
```

ts

```
// we can also use `import`, but then
// every export should be explicitly defined
const { fs } = require('memfs')
module.exports = fs.promises
```

read-hello-world.js

ts

```
import { readFileSync } from 'node:fs'
export function readHelloWorld(path) {
  return readFileSync(path, 'utf-8')
}
```

hello-world.test.js

ts

```
import { beforeEach, expect, it, vi } from 'vitest'
import { fs, vol } from 'memfs'
import { readHelloWorld } from './read-hello-world.js'
// tell vitest to use fs mock from __mocks__ folder
// this can be done in a setup file if fs should always be mocked
vi.mock('node:fs')
vi.mock('node:fs/promises')
beforeEach(() => {
  // reset the state of in-memory fs
  vol.reset()
})
it('should return correct text', () => {
  const path = '/hello-world.txt'
  fs.writeFileSync(path, 'hello world')
  const text = readHelloWorld(path)
  expect(text).toBe('hello world')
})
it('can return a value multiple times', () => {
  // you can use vol.fromJSON to define several files
  vol.fromJSON(
    {
      './dir1/hw.txt': 'hello dir1',
      './dir2/hw.txt': 'hello dir2',
    },
    // default cwd
    '/tmp',
  )
  expect(readHelloWorld('/tmp/dir1/hw.txt')).toBe('hello dir1')
  expect(readHelloWorld('/tmp/dir2/hw.txt')).toBe('hello dir2')
})
```

## Requests [​](index.md#requests)

Because Vitest runs in Node, mocking network requests is tricky; web APIs are not available, so we need something that will mimic network behavior for us. We recommend [Mock Service Worker](https://mswjs.io/) to accomplish this. It allows you to mock `http`, `WebSocket` and `GraphQL` network requests, and is framework agnostic.

Mock Service Worker (MSW) works by intercepting the requests your tests make, allowing you to use it without changing any of your application code. In-browser, this uses the [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). In Node.js, and for Vitest, it uses the [`@mswjs/interceptors`](https://github.com/mswjs/interceptors) library. To learn more about MSW, read their [introduction](https://mswjs.io/docs/)

### Configuration [​](index.md#configuration)

You can use it like below in your [setup file](_config_.md#setupfiles)

HTTP SetupGraphQL SetupWebSocket Setup

js

```
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
const posts = [
  {
    userId: 1,
    id: 1,
    title: 'first post title',
    body: 'first post body',
  },
  // ...
]
export const restHandlers = [
  http.get('https://rest-endpoint.example/path/to/posts', () => {
    return HttpResponse.json(posts)
  }),
]
const server = setupServer(...restHandlers)
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
// Close server after all tests
afterAll(() => server.close())
// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())
```

js

```
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { graphql, HttpResponse } from 'msw'
const posts = [
  {
    userId: 1,
    id: 1,
    title: 'first post title',
    body: 'first post body',
  },
  // ...
]
const graphqlHandlers = [
  graphql.query('ListPosts', () => {
    return HttpResponse.json({
      data: { posts },
    })
  }),
]
const server = setupServer(...graphqlHandlers)
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
// Close server after all tests
afterAll(() => server.close())
// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())
```

js

```
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { ws } from 'msw'
const chat = ws.link('wss://chat.example.com')
const wsHandlers = [
  chat.addEventListener('connection', ({ client }) => {
    client.addEventListener('message', (event) => {
      console.log('Received message from client:', event.data)
      // Echo the received message back to the client
      client.send(`Server received: ${event.data}`)
    })
  }),
]
const server = setupServer(...wsHandlers)
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
// Close server after all tests
afterAll(() => server.close())
// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())
```

> Configuring the server with `onUnhandledRequest: 'error'` ensures that an error is thrown whenever there is a request that does not have a corresponding request handler.

### More [​](index.md#more-1)

There is much more to MSW. You can access cookies and query parameters, define mock error responses, and much more! To see all you can do with MSW, read [their documentation](https://mswjs.io/docs).

## Timers [​](index.md#timers)

When we test code that involves timeouts or intervals, instead of having our tests wait it out or timeout, we can speed up our tests by using "fake" timers that mock calls to `setTimeout` and `setInterval`.

See the [`vi.useFakeTimers` API section](_api_vi.md#vi-usefaketimers) for a more in depth detailed API description.

### Example [​](index.md#example-4)

js

```
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
function executeAfterTwoHours(func) {
  setTimeout(func, 1000 * 60 * 60 * 2) // 2 hours
}
function executeEveryMinute(func) {
  setInterval(func, 1000 * 60) // 1 minute
}
const mock = vi.fn(() => console.log('executed'))
describe('delayed execution', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should execute the function', () => {
    executeAfterTwoHours(mock)
    vi.runAllTimers()
    expect(mock).toHaveBeenCalledTimes(1)
  })
  it('should not execute the function', () => {
    executeAfterTwoHours(mock)
    // advancing by 2ms won't trigger the func
    vi.advanceTimersByTime(2)
    expect(mock).not.toHaveBeenCalled()
  })
  it('should execute every minute', () => {
    executeEveryMinute(mock)
    vi.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(1)
    vi.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(2)
  })
})
```

## Classes [​](index.md#classes)

You can mock an entire class with a single `vi.fn` call - since all classes are also functions, this works out of the box. Beware that currently Vitest doesn't respect the `new` keyword so the `new.target` is always `undefined` in the body of a function.

ts

```
class Dog {
  name: string
  constructor(name: string) {
    this.name = name
  }
  static getType(): string {
    return 'animal'
  }
  speak(): string {
    return 'bark!'
  }
  isHungry() {}
  feed() {}
}
```

We can re-create this class with ES5 functions:

ts

```
const Dog = vi.fn(function (name) {
  this.name = name
})
// notice that static methods are mocked directly on the function,
// not on the instance of the class
Dog.getType = vi.fn(() => 'mocked animal')
// mock the "speak" and "feed" methods on every instance of a class
// all `new Dog()` instances will inherit these spies
Dog.prototype.speak = vi.fn(() => 'loud bark!')
Dog.prototype.feed = vi.fn()
```

WHEN TO USE?

Generally speaking, you would re-create a class like this inside the module factory if the class is re-exported from another module:

ts

```
import { Dog } from './dog.js'
vi.mock(import('./dog.js'), () => {
  const Dog = vi.fn()
  Dog.prototype.feed = vi.fn()
  // ... other mocks
  return { Dog }
})
```

This method can also be used to pass an instance of a class to a function that accepts the same interface:

src/feed.ts

ts

```
function feed(dog: Dog) {
  // ...
}
```

tests/dog.test.ts

ts

```
import { expect, test, vi } from 'vitest'
import { feed } from '../src/feed.js'
const Dog = vi.fn()
Dog.prototype.feed = vi.fn()
test('can feed dogs', () => {
  const dogMax = new Dog('Max')
  feed(dogMax)
  expect(dogMax.feed).toHaveBeenCalled()
  expect(dogMax.isHungry()).toBe(false)
})
```

Now, when we create a new instance of the `Dog` class its `speak` method (alongside `feed`) is already mocked:

ts

```
const dog = new Dog('Cooper')
dog.speak() // loud bark!
// you can use built-in assertions to check the validity of the call
expect(dog.speak).toHaveBeenCalled()
```

We can reassign the return value for a specific instance:

ts

```
const dog = new Dog('Cooper')
// "vi.mocked" is a type helper, since
// TypeScript doesn't know that Dog is a mocked class,
// it wraps any function in a MockInstance<T> type
// without validating if the function is a mock
vi.mocked(dog.speak).mockReturnValue('woof woof')
dog.speak() // woof woof
```

To mock the property, we can use the `vi.spyOn(dog, 'name', 'get')` method. This makes it possible to use spy assertions on the mocked property:

ts

```
const dog = new Dog('Cooper')
const nameSpy = vi.spyOn(dog, 'name', 'get').mockReturnValue('Max')
expect(dog.name).toBe('Max')
expect(nameSpy).toHaveBeenCalledTimes(1)
```

TIP

You can also spy on getters and setters using the same method.

## Cheat Sheet [​](index.md#cheat-sheet)

INFO

`vi` in the examples below is imported directly from `vitest`. You can also use it globally, if you set `globals` to `true` in your [config](_config_.md).

I want to…

### Mock exported variables [​](index.md#mock-exported-variables)

example.js

js

```
export const getter = 'variable'
```

example.test.ts

ts

```
import * as exports from './example.js'
vi.spyOn(exports, 'getter', 'get').mockReturnValue('mocked')
```

### Mock an exported function [​](index.md#mock-an-exported-function)

1.  Example with `vi.mock`:

WARNING

Don't forget that a `vi.mock` call is hoisted to top of the file. It will always be executed before all imports.

example.js

ts

```
export function method() {}
```

ts

```
import { method } from './example.js'
vi.mock('./example.js', () => ({
  method: vi.fn()
}))
```

1.  Example with `vi.spyOn`:

ts

```
import * as exports from './example.js'
vi.spyOn(exports, 'method').mockImplementation(() => {})
```

### Mock an exported class implementation [​](index.md#mock-an-exported-class-implementation)

1.  Example with `vi.mock` and `.prototype`:

example.js

ts

```
export class SomeClass {}
```

ts

```
import { SomeClass } from './example.js'
vi.mock(import('./example.js'), () => {
  const SomeClass = vi.fn()
  SomeClass.prototype.someMethod = vi.fn()
  return { SomeClass }
})
// SomeClass.mock.instances will have SomeClass
```

1.  Example with `vi.spyOn`:

ts

```
import * as mod from './example.js'
const SomeClass = vi.fn()
SomeClass.prototype.someMethod = vi.fn()
vi.spyOn(mod, 'SomeClass').mockImplementation(SomeClass)
```

### Spy on an object returned from a function [​](index.md#spy-on-an-object-returned-from-a-function)

1.  Example using cache:

example.js

ts

```
export function useObject() {
  return { method: () => true }
}
```

useObject.js

ts

```
import { useObject } from './example.js'
const obj = useObject()
obj.method()
```

useObject.test.js

ts

```
import { useObject } from './example.js'
vi.mock(import('./example.js'), () => {
  let _cache
  const useObject = () => {
    if (!_cache) {
      _cache = {
        method: vi.fn(),
      }
    }
    // now every time that useObject() is called it will
    // return the same object reference
    return _cache
  }
  return { useObject }
})
const obj = useObject()
// obj.method was called inside some-path
expect(obj.method).toHaveBeenCalled()
```

### Mock part of a module [​](index.md#mock-part-of-a-module)

ts

```
import { mocked, original } from './some-path.js'
vi.mock(import('./some-path.js'), async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    mocked: vi.fn()
  }
})
original() // has original behaviour
mocked() // is a spy function
```

WARNING

Don't forget that this only [mocks _external_ access](index.md#mocking-pitfalls). In this example, if `original` calls `mocked` internally, it will always call the function defined in the module, not in the mock factory.

### Mock the current date [​](index.md#mock-the-current-date)

To mock `Date`'s time, you can use `vi.setSystemTime` helper function. This value will **not** automatically reset between different tests.

Beware that using `vi.useFakeTimers` also changes the `Date`'s time.

ts

```
const mockDate = new Date(2022, 0, 1)
vi.setSystemTime(mockDate)
const now = new Date()
expect(now.valueOf()).toBe(mockDate.valueOf())
// reset mocked time
vi.useRealTimers()
```

### Mock a global variable [​](index.md#mock-a-global-variable)

You can set global variable by assigning a value to `globalThis` or using [`vi.stubGlobal`](_api_vi.md#vi-stubglobal) helper. When using `vi.stubGlobal`, it will **not** automatically reset between different tests, unless you enable [`unstubGlobals`](_config_.md#unstubglobals) config option or call [`vi.unstubAllGlobals`](_api_vi.md#vi-unstuballglobals).

ts

```
vi.stubGlobal('__VERSION__', '1.0.0')
expect(__VERSION__).toBe('1.0.0')
```

### Mock `import.meta.env` [​](index.md#mock-import-meta-env)

1.  To change environmental variable, you can just assign a new value to it.

WARNING

The environmental variable value will **_not_** automatically reset between different tests.

ts

```
import { beforeEach, expect, it } from 'vitest'
// you can reset it in beforeEach hook manually
const originalViteEnv = import.meta.env.VITE_ENV
beforeEach(() => {
  import.meta.env.VITE_ENV = originalViteEnv
})
it('changes value', () => {
  import.meta.env.VITE_ENV = 'staging'
  expect(import.meta.env.VITE_ENV).toBe('staging')
})
```

1.  If you want to automatically reset the value(s), you can use the `vi.stubEnv` helper with the [`unstubEnvs`](_config_.md#unstubenvs) config option enabled (or call [`vi.unstubAllEnvs`](_api_vi.md#vi-unstuballenvs) manually in a `beforeEach` hook):

ts

```
import { expect, it, vi } from 'vitest'
// before running tests "VITE_ENV" is "test"
import.meta.env.VITE_ENV === 'test'
it('changes value', () => {
  vi.stubEnv('VITE_ENV', 'staging')
  expect(import.meta.env.VITE_ENV).toBe('staging')
})
it('the value is restored before running an other test', () => {
  expect(import.meta.env.VITE_ENV).toBe('test')
})
```

vitest.config.ts

ts

```
export default defineConfig({
  test: {
    unstubEnvs: true,
  },
})
```

#### \_guide_profiling-test-performance.md

> Source: https://vitest.dev/guide/profiling-test-performance
> Scraped: 4/15/2025, 1:07:29 AM

## Profiling Test Performance [​](index.md#profiling-test-performance)

When you run Vitest it reports multiple time metrics of your tests:

> bash
>
> ```
> RUN  v2.1.1 /x/vitest/examples/profiling
> ✓ test/prime-number.test.ts (1) 4517ms
>   ✓ generate prime number 4517ms
> Test Files  1 passed (1)
>      Tests  1 passed (1)
>   Start at  09:32:53
>   Duration  4.80s (transform 44ms, setup 0ms, collect 35ms, tests 4.52s, environment 0ms, prepare 81ms)
>   # Time metrics ^^
> ```

> ```
>
> ```

- Transform: How much time was spent transforming the files. See [File Transform](index.md#file-transform).
- Setup: Time spent for running the [`setupFiles`](_config_.md#setupfiles) files.
- Collect: Time spent for collecting all tests in the test files. This includes the time it took to import all file dependencies.
- Tests: Time spent for actually running the test cases.
- Environment: Time spent for setting up the test [`environment`](_config_.md#environment), for example JSDOM.
- Prepare: Time Vitest uses to prepare the test runner.

## Test runner [​](index.md#test-runner)

In cases where your test execution time is high, you can generate a profile of the test runner. See NodeJS documentation for following options:

- [`--cpu-prof`](https://nodejs.org/api/cli.html#--cpu-prof)
- [`--heap-prof`](https://nodejs.org/api/cli.html#--heap-prof)
- [`--prof`](https://nodejs.org/api/cli.html#--prof)

WARNING

The `--prof` option does not work with `pool: 'threads'` due to `node:worker_threads` limitations.

To pass these options to Vitest's test runner, define `poolOptions.<pool>.execArgv` in your Vitest configuration:

ForksThreads

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    pool: 'forks',
    poolOptions: {
      forks: {
        execArgv: [
          '--cpu-prof',
          '--cpu-prof-dir=test-runner-profile',
          '--heap-prof',
          '--heap-prof-dir=test-runner-profile'
        ],
        // To generate a single profile
        singleFork: true,
      },
    },
  },
})
```

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    pool: 'threads',
    poolOptions: {
      threads: {
        execArgv: [
          '--cpu-prof',
          '--cpu-prof-dir=test-runner-profile',
          '--heap-prof',
          '--heap-prof-dir=test-runner-profile'
        ],
        // To generate a single profile
        singleThread: true,
      },
    },
  },
})
```

After the tests have run there should be a `test-runner-profile/*.cpuprofile` and `test-runner-profile/*.heapprofile` files generated. See [Inspecting profiling records](index.md#inspecting-profiling-records) for instructions how to analyze these files.

See [Profiling | Examples](https://github.com/vitest-dev/vitest/tree/main/examples/profiling) for example.

## Main thread [​](index.md#main-thread)

Profiling main thread is useful for debugging Vitest's Vite usage and [`globalSetup`](_config_.md#globalsetup) files. This is also where your Vite plugins are running.

To do this you'll need to pass arguments to the Node process that runs Vitest.

bash

```
$ node --cpu-prof --cpu-prof-dir=main-profile ./node_modules/vitest/vitest.mjs --run
#      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                                  ^^^^^

#               NodeJS arguments                                           Vitest arguments
```

After the tests have run there should be a `main-profile/*.cpuprofile` file generated. See [Inspecting profiling records](index.md#inspecting-profiling-records) for instructions how to analyze these files.

## File transform [​](index.md#file-transform)

In cases where your test transform and collection time is high, you can use `DEBUG=vite-node:*` environment variable to see which files are being transformed and executed by `vite-node`.

bash

```
$ DEBUG=vite-node:* vitest --run
 RUN  v2.1.1 /x/vitest/examples/profiling
  vite-node:server:request /x/vitest/examples/profiling/global-setup.ts +0ms
  vite-node:client:execute /x/vitest/examples/profiling/global-setup.ts +0ms
  vite-node:server:request /x/vitest/examples/profiling/test/prime-number.test.ts +45ms
  vite-node:client:execute /x/vitest/examples/profiling/test/prime-number.test.ts +26ms
  vite-node:server:request /src/prime-number.ts +9ms
  vite-node:client:execute /x/vitest/examples/profiling/src/prime-number.ts +9ms
  vite-node:server:request /src/unnecessary-file.ts +6ms
  vite-node:client:execute /x/vitest/examples/profiling/src/unnecessary-file.ts +4ms
...
```

This profiling strategy is a good way to identify unnecessary transforms caused by [barrel files](https://vitejs.dev/guide/performance.html#avoid-barrel-files). If these logs contain files that should not be loaded when your test is run, you might have barrel files that are importing files unnecessarily.

You can also use [Vitest UI](_guide_ui.md) to debug slowness caused by barrel file. The example below shows how importing files without barrel file reduces amount of transformed files by ~85%.

File treeexample.test.ts

```
├── src
│   └── utils
│       ├── currency.ts
│       ├── formatters.ts  <-- File to test
│       ├── index.ts
│       ├── location.ts
│       ├── math.ts
│       ├── time.ts
│       └── users.ts
├── test
│   └── formatters.test.ts
└── vitest.config.ts
```

ts

```
import { expect, test } from 'vitest'
import { formatter } from '../src/utils'
import { formatter } from '../src/utils/formatters'
test('formatter works', () => {
  expect(formatter).not.toThrow()
})
```

![Vitest UI demonstrating barrel file issues](https://vitest.dev/module-graph-barrel-file.png)

To see how files are transformed, you can use `VITE_NODE_DEBUG_DUMP` environment variable to write transformed files in the file system:

bash

```
$ VITE_NODE_DEBUG_DUMP=true vitest --run
[vite-node] [debug] dump modules to /x/examples/profiling/.vite-node/dump
 RUN  v2.1.1 /x/vitest/examples/profiling
...
$ ls .vite-node/dump/
_x_examples_profiling_global-setup_ts-1292904907.js
_x_examples_profiling_test_prime-number_test_ts-1413378098.js
_src_prime-number_ts-525172412.js
```

## Inspecting profiling records [​](index.md#inspecting-profiling-records)

You can inspect the contents of `*.cpuprofile` and `*.heapprofile` with various tools. See list below for examples.

- [Speedscope](https://www.speedscope.app/)
- [Performance Profiling JavaScript in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/profiling#_analyzing-a-profile)
- [Profile Node.js performance with the Performance panel | developer.chrome.com](https://developer.chrome.com/docs/devtools/performance/nodejs#analyze)
- [Memory panel overview | developer.chrome.com](https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots#view_snapshots)

#### \_guide_reporters.md

> Source: https://vitest.dev/guide/reporters
> Scraped: 4/15/2025, 1:07:27 AM

## Reporters [​](index.md#reporters)

Vitest provides several built-in reporters to display test output in different formats, as well as the ability to use custom reporters. You can select different reporters either by using the `--reporter` command line option, or by including a `reporters` property in your [configuration file](_config_.md#reporters). If no reporter is specified, Vitest will use the `default` reporter as described below.

Using reporters via command line:

bash

```
npx vitest --reporter=verbose
```

Using reporters via [`vitest.config.ts`](_config_.md):

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    reporters: ['verbose']
  },
})
```

Some reporters can be customized by passing additional options to them. Reporter specific options are described in sections below.

ts

```
export default defineConfig({
  test: {
    reporters: [
      'default',
      ['junit', { suiteName: 'UI tests' }]
    ],
  },
})
```

## Reporter Output [​](index.md#reporter-output)

By default, Vitest's reporters will print their output to the terminal. When using the `json`, `html` or `junit` reporters, you can instead write your tests' output to a file by including an `outputFile` [configuration option](_config_.md#outputfile) either in your Vite configuration file or via CLI.

CLIvitest.config.ts

bash

```
npx vitest --reporter=json --outputFile=./test-output.json
```

ts

```
export default defineConfig({
  test: {
    reporters: ['json'],
    outputFile: './test-output.json'
  },
})
```

## Combining Reporters [​](index.md#combining-reporters)

You can use multiple reporters simultaneously to print your test results in different formats. For example:

bash

```
npx vitest --reporter=json --reporter=default
```

ts

```
export default defineConfig({
  test: {
    reporters: ['json', 'default'],
    outputFile: './test-output.json'
  },
})
```

The above example will both print the test results to the terminal in the default style and write them as JSON to the designated output file.

When using multiple reporters, it's also possible to designate multiple output files, as follows:

ts

```
export default defineConfig({
  test: {
    reporters: ['junit', 'json', 'verbose'],
    outputFile: {
      junit: './junit-report.xml',
      json: './json-report.json',
    },
  },
})
```

This example will write separate JSON and XML reports as well as printing a verbose report to the terminal.

## Built-in Reporters [​](index.md#built-in-reporters)

### Default Reporter [​](index.md#default-reporter)

By default (i.e. if no reporter is specified), Vitest will display summary of running tests and their status at the bottom. Once a suite passes, its status will be reported on top of the summary.

You can disable the summary by configuring the reporter:

vitest.config.ts

ts

```
export default defineConfig({
  test: {
    reporters: [
      ['default', { summary: false }]
    ]
  },
})
```

Example output for tests in progress:

bash

```
 ✓ test/example-1.test.ts (5 tests | 1 skipped) 306ms
 ✓ test/example-2.test.ts (5 tests | 1 skipped) 307ms
 ❯ test/example-3.test.ts 3/5
 ❯ test/example-4.test.ts 1/5
 Test Files 2 passed (4)
      Tests 10 passed | 3 skipped (65)
   Start at 11:01:36
   Duration 2.00s
```

Final output after tests have finished:

bash

```
 ✓ test/example-1.test.ts (5 tests | 1 skipped) 306ms
 ✓ test/example-2.test.ts (5 tests | 1 skipped) 307ms
 ✓ test/example-3.test.ts (5 tests | 1 skipped) 307ms
 ✓ test/example-4.test.ts (5 tests | 1 skipped) 307ms
 Test Files  4 passed (4)
      Tests  16 passed | 4 skipped (20)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```

### Basic Reporter [​](index.md#basic-reporter)

The `basic` reporter is equivalent to `default` reporter without `summary`.

CLIvitest.config.ts

bash

```
npx vitest --reporter=basic
```

ts

```
export default defineConfig({
  test: {
    reporters: ['basic']
  },
})
```

Example output using basic reporter:

bash

```
✓ __tests__/file1.test.ts (2) 725ms
✓ __tests__/file2.test.ts (2) 746ms
 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```

### Verbose Reporter [​](index.md#verbose-reporter)

Verbose reporter is same as `default` reporter, but it also displays each individual test after the suite has finished. It also displays currently running tests that are taking longer than [`slowTestThreshold`](_config_.md#slowtestthreshold). Similar to `default` reporter, you can disable the summary by configuring the reporter.

CLIvitest.config.ts

bash

```
npx vitest --reporter=verbose
```

ts

```
export default defineConfig({
  test: {
    reporters: [
      ['verbose', { summary: false }]
    ]
  },
})
```

Example output for tests in progress with default `slowTestThreshold: 300`:

bash

```
 ✓ __tests__/example-1.test.ts (2) 725ms
   ✓ first test file (2) 725ms
     ✓ 2 + 2 should equal 4
     ✓ 4 - 2 should equal 2
 ❯ test/example-2.test.ts 3/5
   ↳ should run longer than three seconds 1.57s
 ❯ test/example-3.test.ts 1/5
 Test Files 2 passed (4)
      Tests 10 passed | 3 skipped (65)
   Start at 11:01:36
   Duration 2.00s
```

Example of final terminal output for a passing test suite:

bash

```
✓ __tests__/file1.test.ts (2) 725ms
   ✓ first test file (2) 725ms
     ✓ 2 + 2 should equal 4
     ✓ 4 - 2 should equal 2
✓ __tests__/file2.test.ts (2) 746ms
  ✓ second test file (2) 746ms
    ✓ 1 + 1 should equal 2
    ✓ 2 - 1 should equal 1
 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```

### Dot Reporter [​](index.md#dot-reporter)

Prints a single dot for each completed test to provide minimal output while still showing all tests that have run. Details are only provided for failed tests, along with the `basic` reporter summary for the suite.

CLIvitest.config.ts

bash

```
npx vitest --reporter=dot
```

ts

```
export default defineConfig({
  test: {
    reporters: ['dot']
  },
})
```

Example terminal output for a passing test suite:

bash

```
....
 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  12:34:32
   Duration  1.26s (transform 35ms, setup 1ms, collect 90ms, tests 1.47s, environment 0ms, prepare 267ms)
```

### JUnit Reporter [​](index.md#junit-reporter)

Outputs a report of the test results in JUnit XML format. Can either be printed to the terminal or written to an XML file using the [`outputFile`](_config_.md#outputfile) configuration option.

CLIvitest.config.ts

bash

```
npx vitest --reporter=junit
```

ts

```
export default defineConfig({
  test: {
    reporters: ['junit']
  },
})
```

Example of a JUnit XML report:

xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<testsuites name="vitest tests" tests="2" failures="1" errors="0" time="0.503">
    <testsuite name="__tests__/test-file-1.test.ts" timestamp="2023-10-19T17:41:58.580Z" hostname="My-Computer.local" tests="2" failures="1" errors="0" skipped="0" time="0.013">
        <testcase classname="__tests__/test-file-1.test.ts" name="first test file &gt; 2 + 2 should equal 4" time="0.01">
            <failure message="expected 5 to be 4 // Object.is equality" type="AssertionError">
AssertionError: expected 5 to be 4 // Object.is equality
 ❯ __tests__/test-file-1.test.ts:20:28
            </failure>
        </testcase>
        <testcase classname="__tests__/test-file-1.test.ts" name="first test file &gt; 4 - 2 should equal 2" time="0">
        </testcase>
    </testsuite>
</testsuites>
```

The outputted XML contains nested `testsuites` and `testcase` tags. These can also be customized via reporter options `suiteName` and `classnameTemplate`. `classnameTemplate` can either be a template string or a function.

The supported placeholders for the `classnameTemplate` option are:

- filename
- filepath

ts

```
export default defineConfig({
  test: {
    reporters: [
      ['junit', { suiteName: 'custom suite name', classnameTemplate: 'filename:{filename} - filepath:{filepath}' }]
    ]
  },
})
```

### JSON Reporter [​](index.md#json-reporter)

Generates a report of the test results in a JSON format compatible with Jest's `--json` option. Can either be printed to the terminal or written to a file using the [`outputFile`](_config_.md#outputfile) configuration option.

CLIvitest.config.ts

bash

```
npx vitest --reporter=json
```

ts

```
export default defineConfig({
  test: {
    reporters: ['json']
  },
})
```

Example of a JSON report:

json

```
{
  "numTotalTestSuites": 4,
  "numPassedTestSuites": 2,
  "numFailedTestSuites": 1,
  "numPendingTestSuites": 1,
  "numTotalTests": 4,
  "numPassedTests": 1,
  "numFailedTests": 1,
  "numPendingTests": 1,
  "numTodoTests": 1,
  "startTime": 1697737019307,
  "success": false,
  "testResults": [
    {
      "assertionResults": [
        {
          "ancestorTitles": [
            "",
            "first test file"
          ],
          "fullName": " first test file 2 + 2 should equal 4",
          "status": "failed",
          "title": "2 + 2 should equal 4",
          "duration": 9,
          "failureMessages": [
            "expected 5 to be 4 // Object.is equality"
          ],
          "location": {
            "line": 20,
            "column": 28
          },
          "meta": {}
        }
      ],
      "startTime": 1697737019787,
      "endTime": 1697737019797,
      "status": "failed",
      "message": "",
      "name": "/root-directory/__tests__/test-file-1.test.ts"
    }
  ],
  "coverageMap": {}
}
```

INFO

Since Vitest 3, the JSON reporter includes coverage information in `coverageMap` if coverage is enabled.

### HTML Reporter [​](index.md#html-reporter)

Generates an HTML file to view test results through an interactive [GUI](_guide_ui.md). After the file has been generated, Vitest will keep a local development server running and provide a link to view the report in a browser.

Output file can be specified using the [`outputFile`](_config_.md#outputfile) configuration option. If no `outputFile` option is provided, a new HTML file will be created.

CLIvitest.config.ts

bash

```
npx vitest --reporter=html
```

ts

```
export default defineConfig({
  test: {
    reporters: ['html']
  },
})
```

TIP

This reporter requires installed [`@vitest/ui`](_guide_ui.md) package.

### TAP Reporter [​](index.md#tap-reporter)

Outputs a report following [Test Anything Protocol](https://testanything.org/) (TAP).

CLIvitest.config.ts

bash

```
npx vitest --reporter=tap
```

ts

```
export default defineConfig({
  test: {
    reporters: ['tap']
  },
})
```

Example of a TAP report:

bash

```
TAP version 13
1..1
not ok 1 - __tests__/test-file-1.test.ts # time=14.00ms {

    1..1
    not ok 1 - first test file # time=13.00ms {

        1..2
        not ok 1 - 2 + 2 should equal 4 # time=11.00ms

            ---
            error:
                name: "AssertionError"
                message: "expected 5 to be 4 // Object.is equality"
            at: "/root-directory/__tests__/test-file-1.test.ts:20:28"
            actual: "5"
            expected: "4"
            ...
        ok 2 - 4 - 2 should equal 2 # time=1.00ms

    }
}
```

### TAP Flat Reporter [​](index.md#tap-flat-reporter)

Outputs a TAP flat report. Like the `tap` reporter, test results are formatted to follow TAP standards, but test suites are formatted as a flat list rather than a nested hierarchy.

CLIvitest.config.ts

bash

```
npx vitest --reporter=tap-flat
```

ts

```
export default defineConfig({
  test: {
    reporters: ['tap-flat']
  },
})
```

Example of a TAP flat report:

bash

```
TAP version 13
1..2
not ok 1 - __tests__/test-file-1.test.ts > first test file > 2 + 2 should equal 4 # time=11.00ms

    ---
    error:
        name: "AssertionError"
        message: "expected 5 to be 4 // Object.is equality"
    at: "/root-directory/__tests__/test-file-1.test.ts:20:28"
    actual: "5"
    expected: "4"
    ...
ok 2 - __tests__/test-file-1.test.ts > first test file > 4 - 2 should equal 2 # time=0.00ms
```

### Hanging Process Reporter [​](index.md#hanging-process-reporter)

Displays a list of hanging processes, if any are preventing Vitest from exiting safely. The `hanging-process` reporter does not itself display test results, but can be used in conjunction with another reporter to monitor processes while tests run. Using this reporter can be resource-intensive, so should generally be reserved for debugging purposes in situations where Vitest consistently cannot exit the process.

CLIvitest.config.ts

bash

```
npx vitest --reporter=hanging-process
```

ts

```
export default defineConfig({
  test: {
    reporters: ['hanging-process']
  },
})
```

### Github Actions Reporter [​](index.md#github-actions-reporter)

Output [workflow commands](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-error-message) to provide annotations for test failures. This reporter is automatically enabled with a [`default`](index.md#default-reporter) reporter when `process.env.GITHUB_ACTIONS === 'true'`.

If you configure non-default reporters, you need to explicitly add `github-actions`.

ts

```
export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
  },
})
```

![Github Actions](https://github.com/vitest-dev/vitest/assets/4232207/336cddc2-df6b-4b8a-8e72-4d00010e37f5)![Github Actions](https://github.com/vitest-dev/vitest/assets/4232207/ce8447c1-0eab-4fe1-abef-d0d322290dca)

### Blob Reporter [​](index.md#blob-reporter)

Stores test results on the machine so they can be later merged using [`--merge-reports`](_guide_cli.md#merge-reports) command. By default, stores all results in `.vitest-reports` folder, but can be overridden with `--outputFile` or `--outputFile.blob` flags.

bash

```
npx vitest --reporter=blob --outputFile=reports/blob-1.json
```

We recommend using this reporter if you are running Vitest on different machines with the [`--shard`](_guide_cli.md#shard) flag. All blob reports can be merged into any report by using `--merge-reports` command at the end of your CI pipeline:

bash

```
npx vitest --merge-reports=reports --reporter=json --reporter=default
```

TIP

Both `--reporter=blob` and `--merge-reports` do not work in watch mode.

## Custom Reporters [​](index.md#custom-reporters)

You can use third-party custom reporters installed from NPM by specifying their package name in the reporters' option:

CLIvitest.config.ts

bash

```
npx vitest --reporter=some-published-vitest-reporter
```

ts

```
export default defineConfig({
  test: {
    reporters: ['some-published-vitest-reporter']
  },
})
```

Additionally, you can define your own [custom reporters](_advanced_reporters.md) and use them by specifying their file path:

bash

```
npx vitest --reporter=./path/to/reporter.ts
```

Custom reporters should implement the [Reporter interface](https://github.com/vitest-dev/vitest/blob/main/packages/vitest/src/node/types/reporter.ts).

#### \_guide_snapshot.md

> Source: https://vitest.dev/guide/snapshot
> Scraped: 4/15/2025, 1:07:27 AM

## Snapshot [​](index.md#snapshot)

[Learn Snapshot by video from Vue School](https://vueschool.io/lessons/snapshots-in-vitest?friend=vueuse)

Snapshot tests are a very useful tool whenever you want to make sure the output of your functions does not change unexpectedly.

When using snapshot, Vitest will take a snapshot of the given value, then compare it to a reference snapshot file stored alongside the test. The test will fail if the two snapshots do not match: either the change is unexpected, or the reference snapshot needs to be updated to the new version of the result.

## Use Snapshots [​](index.md#use-snapshots)

To snapshot a value, you can use the [`toMatchSnapshot()`](_api_expect.md#tomatchsnapshot) from `expect()` API:

ts

```
import { expect, it } from 'vitest'
it('toUpperCase', () => {
  const result = toUpperCase('foobar')
  expect(result).toMatchSnapshot()
})
```

The first time this test is run, Vitest creates a snapshot file that looks like this:

js

```
// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html
exports['toUpperCase 1'] = '"FOOBAR"'
```

The snapshot artifact should be committed alongside code changes, and reviewed as part of your code review process. On subsequent test runs, Vitest will compare the rendered output with the previous snapshot. If they match, the test will pass. If they don't match, either the test runner found a bug in your code that should be fixed, or the implementation has changed and the snapshot needs to be updated.

WARNING

When using Snapshots with async concurrent tests, `expect` from the local [Test Context](_guide_test-context.md) must be used to ensure the right test is detected.

## Inline Snapshots [​](index.md#inline-snapshots)

Similarly, you can use the [`toMatchInlineSnapshot()`](_api_expect.md#tomatchinlinesnapshot) to store the snapshot inline within the test file.

ts

```
import { expect, it } from 'vitest'
it('toUpperCase', () => {
  const result = toUpperCase('foobar')
  expect(result).toMatchInlineSnapshot()
})
```

Instead of creating a snapshot file, Vitest will modify the test file directly to update the snapshot as a string:

ts

```
import { expect, it } from 'vitest'
it('toUpperCase', () => {
  const result = toUpperCase('foobar')
  expect(result).toMatchInlineSnapshot('"FOOBAR"')
})
```

This allows you to see the expected output directly without jumping across different files.

WARNING

When using Snapshots with async concurrent tests, `expect` from the local [Test Context](_guide_test-context.md) must be used to ensure the right test is detected.

## Updating Snapshots [​](index.md#updating-snapshots)

When the received value doesn't match the snapshot, the test fails and shows you the difference between them. When the snapshot change is expected, you may want to update the snapshot from the current state.

In watch mode, you can press the `u` key in the terminal to update the failed snapshot directly.

Or you can use the `--update` or `-u` flag in the CLI to make Vitest update snapshots.

## File Snapshots [​](index.md#file-snapshots)

When calling `toMatchSnapshot()`, we store all snapshots in a formatted snap file. That means we need to escape some characters (namely the double-quote `"` and backtick `` ` ``) in the snapshot string. Meanwhile, you might lose the syntax highlighting for the snapshot content (if they are in some language).

In light of this, we introduced [`toMatchFileSnapshot()`](_api_expect.md#tomatchfilesnapshot) to explicitly match against a file. This allows you to assign any file extension to the snapshot file, and makes them more readable.

ts

```
import { expect, it } from 'vitest'
it('render basic', async () => {
  const result = renderHTML(h('div', { class: 'foo' }))
  await expect(result).toMatchFileSnapshot('./test/basic.output.html')
})
```

It will compare with the content of `./test/basic.output.html`. And can be written back with the `--update` flag.

## Image Snapshots [​](index.md#image-snapshots)

It's also possible to snapshot images using [`jest-image-snapshot`](https://github.com/americanexpress/jest-image-snapshot).

bash

```
npm i -D jest-image-snapshot
```

ts

```
test('image snapshot', () => {
  expect(readFileSync('./test/stubs/input-image.png'))
    .toMatchImageSnapshot()
})
```

## Custom Serializer [​](index.md#custom-serializer)

You can add your own logic to alter how your snapshots are serialized. Like Jest, Vitest has default serializers for built-in JavaScript types, HTML elements, ImmutableJS and for React elements.

You can explicitly add custom serializer by using [`expect.addSnapshotSerializer`](_api_expect.md#expect-addsnapshotserializer) API.

ts

```
expect.addSnapshotSerializer({
  serialize(val, config, indentation, depth, refs, printer) {
    // `printer` is a function that serializes a value using existing plugins.
    return `Pretty foo: ${printer(
      val.foo,
      config,
      indentation,
      depth,
      refs,
    )}`
  },
  test(val) {
    return val && Object.prototype.hasOwnProperty.call(val, 'foo')
  },
})
```

We also support [snapshotSerializers](_config_.md#snapshotserializers) option to implicitly add custom serializers.

path/to/custom-serializer.ts

ts

```
import { SnapshotSerializer } from 'vitest'
export default {
  serialize(val, config, indentation, depth, refs, printer) {
    // `printer` is a function that serializes a value using existing plugins.
    return `Pretty foo: ${printer(
      val.foo,
      config,
      indentation,
      depth,
      refs,
    )}`
  },
  test(val) {
    return val && Object.prototype.hasOwnProperty.call(val, 'foo')
  },
} satisfies SnapshotSerializer
```

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    snapshotSerializers: ['path/to/custom-serializer.ts'],
  },
})
```

After adding a test like this:

ts

```
test('foo snapshot test', () => {
  const bar = {
    foo: {
      x: 1,
      y: 2,
    },
  }
  expect(bar).toMatchSnapshot()
})
```

You will get the following snapshot:

```
Pretty foo: Object {
  "x": 1,
  "y": 2,
}
```

We are using Jest's `pretty-format` for serializing snapshots. You can read more about it here: [pretty-format](https://github.com/facebook/jest/blob/main/packages/pretty-format/README.md#serialize).

## Difference from Jest [​](index.md#difference-from-jest)

Vitest provides an almost compatible Snapshot feature with [Jest's](https://jestjs.io/docs/snapshot-testing) with a few exceptions:

#### 1\. Comment header in the snapshot file is different [​](index.md#_1-comment-header-in-the-snapshot-file-is-different)

diff

```
- // Jest Snapshot v1, https://goo.gl/fbAQLP
+ // Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html
```

This does not really affect the functionality but might affect your commit diff when migrating from Jest.

#### 2\. `printBasicPrototype` is default to `false` [​](index.md#_2-printbasicprototype-is-default-to-false)

Both Jest and Vitest's snapshots are powered by [`pretty-format`](https://github.com/facebook/jest/blob/main/packages/pretty-format). In Vitest we set `printBasicPrototype` default to `false` to provide a cleaner snapshot output, while in Jest <29.0.0 it's `true` by default.

ts

```
import { expect, test } from 'vitest'
test('snapshot', () => {
  const bar = [
    {
      foo: 'bar',
    },
  ]
  // in Jest
  expect(bar).toMatchInlineSnapshot(`
    Array [
      Object {
        "foo": "bar",
      },
    ]
  `)
  // in Vitest
  expect(bar).toMatchInlineSnapshot(`
    [
      {
        "foo": "bar",
      },
    ]
  `)
})
```

We believe this is a more reasonable default for readability and overall DX. If you still prefer Jest's behavior, you can change your config:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    snapshotFormat: {
      printBasicPrototype: true,
    },
  },
})
```

#### 3\. Chevron `>` is used as a separator instead of colon `:` for custom messages [​](index.md#_3-chevron-is-used-as-a-separator-instead-of-colon-for-custom-messages)

Vitest uses chevron `>` as a separator instead of colon `:` for readability, when a custom message is passed during creation of a snapshot file.

For the following example test code:

js

```
test('toThrowErrorMatchingSnapshot', () => {
  expect(() => {
    throw new Error('error')
  }).toThrowErrorMatchingSnapshot('hint')
})
```

In Jest, the snapshot will be:

console

```
exports[`toThrowErrorMatchingSnapshot: hint 1`] = `"error"`;
```

In Vitest, the equivalent snapshot will be:

console

```
exports[`toThrowErrorMatchingSnapshot > hint 1`] = `[Error: error]`;
```

#### 4\. default `Error` snapshot is different for `toThrowErrorMatchingSnapshot` and `toThrowErrorMatchingInlineSnapshot` [​](index.md#_4-default-error-snapshot-is-different-for-tothrowerrormatchingsnapshot-and-tothrowerrormatchinginlinesnapshot)

js

```
import { expect, test } from 'vitest'
test('snapshot', () => {
  // in Jest and Vitest
  expect(new Error('error')).toMatchInlineSnapshot(`[Error: error]`)
  // Jest snapshots `Error.message` for `Error` instance
  // Vitest prints the same value as toMatchInlineSnapshot
  expect(() => {
    throw new Error('error')
  }).toThrowErrorMatchingInlineSnapshot(`"error"`)
  }).toThrowErrorMatchingInlineSnapshot(`[Error: error]`)
})
```

#### \_guide_test-context.md

> Source: https://vitest.dev/guide/test-context
> Scraped: 4/15/2025, 1:07:29 AM

## Test Context [​](index.md#test-context)

Inspired by [Playwright Fixtures](https://playwright.dev/docs/test-fixtures), Vitest's test context allows you to define utils, states, and fixtures that can be used in your tests.

## Usage [​](index.md#usage)

The first argument for each test callback is a test context.

ts

```
import { it } from 'vitest'
it('should work', (ctx) => {
  // prints name of the test
  console.log(ctx.task.name)
})
```

## Built-in Test Context [​](index.md#built-in-test-context)

#### `context.task` [​](index.md#context-task)

A readonly object containing metadata about the test.

#### `context.expect` [​](index.md#context-expect)

The `expect` API bound to the current test:

ts

```
import { it } from 'vitest'
it('math is easy', ({ expect }) => {
  expect(2 + 2).toBe(4)
})
```

This API is useful for running snapshot tests concurrently because global expect cannot track them:

ts

```
import { it } from 'vitest'
it.concurrent('math is easy', ({ expect }) => {
  expect(2 + 2).toMatchInlineSnapshot()
})
it.concurrent('math is hard', ({ expect }) => {
  expect(2 * 2).toMatchInlineSnapshot()
})
```

#### `context.skip` [​](index.md#context-skip)

Skips subsequent test execution and marks test as skipped:

ts

```
import { expect, it } from 'vitest'
it('math is hard', ({ skip }) => {
  skip()
  expect(2 + 2).toBe(5)
})
```

## Extend Test Context [​](index.md#extend-test-context)

Vitest provides two different ways to help you extend the test context.

### `test.extend` [​](index.md#test-extend)

Like [Playwright](https://playwright.dev/docs/api/class-test#test-extend), you can use this method to define your own `test` API with custom fixtures and reuse it anywhere.

For example, we first create `myTest` with two fixtures, `todos` and `archive`.

my-test.ts

ts

```
import { test } from 'vitest'
const todos = []
const archive = []
export const myTest = test.extend({
  todos: async ({}, use) => {
    // setup the fixture before each test function
    todos.push(1, 2, 3)
    // use the fixture value
    await use(todos)
    // cleanup the fixture after each test function
    todos.length = 0
  },
  archive
})
```

Then we can import and use it.

my-test.test.ts

ts

```
import { expect } from 'vitest'
import { myTest } from './my-test.js'
myTest('add items to todos', ({ todos }) => {
  expect(todos.length).toBe(3)
  todos.push(4)
  expect(todos.length).toBe(4)
})
myTest('move items from todos to archive', ({ todos, archive }) => {
  expect(todos.length).toBe(3)
  expect(archive.length).toBe(0)
  archive.push(todos.pop())
  expect(todos.length).toBe(2)
  expect(archive.length).toBe(1)
})
```

We can also add more fixtures or override existing fixtures by extending `myTest`.

ts

```
export const myTest2 = myTest.extend({
  settings: {
    // ...
  }
})
```

#### Fixture initialization [​](index.md#fixture-initialization)

Vitest runner will smartly initialize your fixtures and inject them into the test context based on usage.

ts

```
import { test } from 'vitest'
async function todosFn({ task }, use) {
  await use([1, 2, 3])
}
const myTest = test.extend({
  todos: todosFn,
  archive: []
})
// todosFn will not run
myTest('', () => {})
myTest('', ({ archive }) => {})
// todosFn will run
myTest('', ({ todos }) => {})
```

WARNING

When using `test.extend()` with fixtures, you should always use the object destructuring pattern `{ todos }` to access context both in fixture function and test function.

ts

```
myTest('context must be destructured', (context) => {
  expect(context.todos.length).toBe(2)
})
myTest('context must be destructured', ({ todos }) => {
  expect(todos.length).toBe(2)
})
```

#### Automatic fixture [​](index.md#automatic-fixture)

Vitest also supports the tuple syntax for fixtures, allowing you to pass options for each fixture. For example, you can use it to explicitly initialize a fixture, even if it's not being used in tests.

ts

```
import { test as base } from 'vitest'
const test = base.extend({
  fixture: [
    async ({}, use) => {
      // this function will run
      setup()
      await use()
      teardown()
    },
    { auto: true } // Mark as an automatic fixture
  ],
})
test('works correctly')
```

#### Default fixture [​](index.md#default-fixture)

Since Vitest 3, you can provide different values in different [projects](_guide_workspace.md). To enable this feature, pass down `{ injected: true }` to the options. If the key is not specified in the [project configuration](_config_.md#provide), then the default value will be used.

fixtures.test.tsvitest.workspace.ts

ts

```
import { test as base } from 'vitest'
const test = base.extend({
  url: [
    // default value if "url" is not defined in the config
    '/default',
    // mark the fixture as "injected" to allow the override
    { injected: true },
  ],
})
test('works correctly', ({ url }) => {
  // url is "/default" in "project-new"
  // url is "/full" in "project-full"
  // url is "/empty" in "project-empty"
})
```

ts

```
import { defineWorkspace } from 'vitest/config'
export default defineWorkspace([
  {
    test: {
      name: 'project-new',
    },
  },
  {
    test: {
      name: 'project-full',
      provide: {
        url: '/full',
      },
    },
  },
  {
    test: {
      name: 'project-empty',
      provide: {
        url: '/empty',
      },
    },
  },
])
```

#### Scoping Values to Suite 3.1.0+ [​](index.md#scoping-values-to-suite)

Since Vitest 3.1, you can override context values per suite and its children by using the `test.scoped` API:

ts

```
import { test as baseTest, describe, expect } from 'vitest'
const test = baseTest.extend({
  dependency: 'default',
  dependant: ({ dependency }, use) => use({ dependency })
})
describe('use scoped values', () => {
  test.scoped({ dependency: 'new' })
  test('uses scoped value', ({ dependant }) => {
    // `dependant` uses the new overriden value that is scoped
    // to all tests in this suite
    expect(dependant).toEqual({ dependency: 'new' })
  })
  describe('keeps using scoped value', () => {
    test('uses scoped value', ({ dependant }) => {
      // nested suite inherited the value
      expect(dependant).toEqual({ dependency: 'new' })
    })
  })
})
test('keep using the default values', ({ dependant }) => {
  // the `dependency` is using the default
  // value outside of the suite with .scoped
  expect(dependant).toEqual({ dependency: 'default' })
})
```

This API is particularly useful if you have a context value that relies on a dynamic variable like a database connection:

ts

```
const test = baseTest.extend<{
  db: Database
  schema: string
}>({
  db: async ({ schema }, use) => {
    const db = await createDb({ schema })
    await use(db)
    await cleanup(db)
  },
  schema: '',
})
describe('one type of schema', () => {
  test.scoped({ schema: 'schema-1' })
  // ... tests
})
describe('another type of schema', () => {
  test.scoped({ schema: 'schema-2' })
  // ... tests
})
```

#### TypeScript [​](index.md#typescript)

To provide fixture types for all your custom contexts, you can pass the fixtures type as a generic.

ts

```
interface MyFixtures {
  todos: number[]
  archive: number[]
}
const myTest = test.extend<MyFixtures>({
  todos: [],
  archive: []
})
myTest('types are defined correctly', ({ todos, archive }) => {
  expectTypeOf(todos).toEqualTypeOf<number[]>()
  expectTypeOf(archive).toEqualTypeOf<number[]>()
})
```

### `beforeEach` and `afterEach` [​](index.md#beforeeach-and-aftereach)

The contexts are different for each test. You can access and extend them within the `beforeEach` and `afterEach` hooks.

ts

```
import { beforeEach, it } from 'vitest'
beforeEach(async (context) => {
  // extend context
  context.foo = 'bar'
})
it('should work', ({ foo }) => {
  console.log(foo) // 'bar'
})
```

#### TypeScript [​](index.md#typescript-1)

To provide property types for all your custom contexts, you can aggregate the `TestContext` type by adding

ts

```
declare module 'vitest' {
  export interface TestContext {
    foo?: string
  }
}
```

If you want to provide property types only for specific `beforeEach`, `afterEach`, `it` and `test` hooks, you can pass the type as a generic.

ts

```
interface LocalTestContext {
  foo: string
}
beforeEach<LocalTestContext>(async (context) => {
  // typeof context is 'TestContext & LocalTestContext'
  context.foo = 'bar'
})
it<LocalTestContext>('should work', ({ foo }) => {
  // typeof foo is 'string'
  console.log(foo) // 'bar'
})
```

#### \_guide_testing-types.md

> Source: https://vitest.dev/guide/testing-types
> Scraped: 4/15/2025, 1:07:28 AM

## Testing Types [​](index.md#testing-types)

Vitest allows you to write tests for your types, using `expectTypeOf` or `assertType` syntaxes. By default all tests inside `*.test-d.ts` files are considered type tests, but you can change it with [`typecheck.include`](_config_.md#typecheck-include) config option.

Under the hood Vitest calls `tsc` or `vue-tsc`, depending on your config, and parses results. Vitest will also print out type errors in your source code, if it finds any. You can disable it with [`typecheck.ignoreSourceErrors`](_config_.md#typecheck-ignoresourceerrors) config option.

Keep in mind that Vitest doesn't run these files, they are only statically analyzed by the compiler. Meaning, that if you use a dynamic name or `test.each` or `test.for`, the test name will not be evaluated - it will be displayed as is.

WARNING

Before Vitest 2.1, your `typecheck.include` overrode the `include` pattern, so your runtime tests did not actually run; they were only type-checked.

Since Vitest 2.1, if your `include` and `typecheck.include` overlap, Vitest will report type tests and runtime tests as separate entries.

Using CLI flags, like `--allowOnly` and `-t` are also supported for type checking.

mount.test-d.ts

ts

```
import { assertType, expectTypeOf } from 'vitest'
import { mount } from './mount.js'
test('my types work properly', () => {
  expectTypeOf(mount).toBeFunction()
  expectTypeOf(mount).parameter(0).toMatchTypeOf<{ name: string }>()
  // @ts-expect-error name is a string
  assertType(mount({ name: 42 }))
})
```

Any type error triggered inside a test file will be treated as a test error, so you can use any type trick you want to test types of your project.

You can see a list of possible matchers in [API section](_api_expect-typeof.md).

## Reading Errors [​](index.md#reading-errors)

If you are using `expectTypeOf` API, refer to the [expect-type documentation on its error messages](https://github.com/mmkal/expect-type#error-messages).

When types don't match, `.toEqualTypeOf` and `.toMatchTypeOf` use a special helper type to produce error messages that are as actionable as possible. But there's a bit of an nuance to understanding them. Since the assertions are written "fluently", the failure should be on the "expected" type, not the "actual" type (`expect<Actual>().toEqualTypeOf<Expected>()`). This means that type errors can be a little confusing - so this library produces a `MismatchInfo` type to try to make explicit what the expectation is. For example:

ts

```
expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: string }>()
```

Is an assertion that will fail, since `{a: 1}` has type `{a: number}` and not `{a: string}`. The error message in this case will read something like this:

```
test/test.ts:999:999 - error TS2344: Type '{ a: string; }' does not satisfy the constraint '{ a: \\"Expected: string, Actual: number\\"; }'.
  Types of property 'a' are incompatible.
    Type 'string' is not assignable to type '\\"Expected: string, Actual: number\\"'.
999 expectTypeOf({a: 1}).toEqualTypeOf<{a: string}>()
```

Note that the type constraint reported is a human-readable messaging specifying both the "expected" and "actual" types. Rather than taking the sentence `Types of property 'a' are incompatible // Type 'string' is not assignable to type "Expected: string, Actual: number"` literally - just look at the property name (`'a'`) and the message: `Expected: string, Actual: number`. This will tell you what's wrong, in most cases. Extremely complex types will of course be more effort to debug, and may require some experimentation. Please [raise an issue](https://github.com/mmkal/expect-type) if the error messages are actually misleading.

The `toBe...` methods (like `toBeString`, `toBeNumber`, `toBeVoid` etc.) fail by resolving to a non-callable type when the `Actual` type under test doesn't match up. For example, the failure for an assertion like `expectTypeOf(1).toBeString()` will look something like this:

```
test/test.ts:999:999 - error TS2349: This expression is not callable.
  Type 'ExpectString<number>' has no call signatures.
999 expectTypeOf(1).toBeString()
                    ~~~~~~~~~~
```

The `This expression is not callable` part isn't all that helpful - the meaningful error is the next line, `Type 'ExpectString<number> has no call signatures`. This essentially means you passed a number but asserted it should be a string.

If TypeScript added support for ["throw" types](https://github.com/microsoft/TypeScript/pull/40468) these error messages could be improved significantly. Until then they will take a certain amount of squinting.

#### Concrete "expected" objects vs typeargs [​](index.md#concrete-expected-objects-vs-typeargs)

Error messages for an assertion like this:

ts

```
expectTypeOf({ a: 1 }).toEqualTypeOf({ a: '' })
```

Will be less helpful than for an assertion like this:

ts

```
expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: string }>()
```

This is because the TypeScript compiler needs to infer the typearg for the `.toEqualTypeOf({a: ''})` style, and this library can only mark it as a failure by comparing it against a generic `Mismatch` type. So, where possible, use a typearg rather than a concrete type for `.toEqualTypeOf` and `toMatchTypeOf`. If it's much more convenient to compare two concrete types, you can use `typeof`:

ts

```
const one = valueFromFunctionOne({ some: { complex: inputs } })
const two = valueFromFunctionTwo({ some: { other: inputs } })
expectTypeOf(one).toEqualTypeof<typeof two>()
```

If you find it hard working with `expectTypeOf` API and figuring out errors, you can always use more simple `assertType` API:

ts

```
const answer = 42
assertType<number>(answer)
// @ts-expect-error answer is not a string
assertType<string>(answer)
```

TIP

When using `@ts-expect-error` syntax, you might want to make sure that you didn't make a typo. You can do that by including your type files in [`test.include`](_config_.md#include) config option, so Vitest will also actually _run_ these tests and fail with `ReferenceError`.

This will pass, because it expects an error, but the word “answer” has a typo, so it's a false positive error:

ts

```
// @ts-expect-error answer is not a string
assertType<string>(answr)
```

## Run Typechecking [​](index.md#run-typechecking)

To enable typechecking, just add [`--typecheck`](_config_.md#typecheck) flag to your Vitest command in `package.json`:

package.json

json

```
{
  "scripts": {
    "test": "vitest --typecheck"
  }
}
```

Now you can run typecheck:

Vitest uses `tsc --noEmit` or `vue-tsc --noEmit`, depending on your configuration, so you can remove these scripts from your pipeline.

#### \_guide_ui.md

> Source: https://vitest.dev/guide/ui
> Scraped: 4/15/2025, 1:07:27 AM

Powered by Vite, Vitest also has a dev server under the hood when running the tests. This allows Vitest to provide a beautiful UI to view and interact with your tests. The Vitest UI is optional, so you'll need to install it with:

Then you can start the tests with UI by passing the `--ui` flag:

Then you can visit the Vitest UI at [`http://localhost:51204/__vitest__/`](http://localhost:51204/__vitest__/)

WARNING

The UI is interactive and requires a running Vite server, so make sure to run Vitest in `watch` mode (the default). Alternatively, you can generate a static HTML report that looks identical to the Vitest UI by specifying `html` in config's `reporters` option.

![Vitest UI](https://vitest.dev/ui-1-light.png)![Vitest UI](https://vitest.dev/ui-1-dark.png)

UI can also be used as a reporter. Use `'html'` reporter in your Vitest configuration to generate HTML output and preview the results of your tests:

vitest.config.ts

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    reporters: ['html'],
  },
})
```

You can check your coverage report in Vitest UI: see [Vitest UI Coverage](_guide_coverage.md#vitest-ui) for more details.

WARNING

If you still want to see how your tests are running in real time in the terminal, don't forget to add `default` reporter to `reporters` option: `['default', 'html']`.

TIP

To preview your HTML report, you can use the [vite preview](https://vitejs.dev/guide/cli#vite-preview) command:

sh

```
npx vite preview --outDir ./html
```

You can configure output with [`outputFile`](_config_.md#outputfile) config option. You need to specify `.html` path there. For example, `./html/index.html` is the default value.

#### \_guide_why.md

> Source: https://vitest.dev/guide/why
> Scraped: 4/15/2025, 1:07:26 AM

## Why Vitest [​](index.md#why-vitest)

## The Need for a Vite Native Test Runner [​](index.md#the-need-for-a-vite-native-test-runner)

Vite's out-of-the-box support for common web patterns, features like glob imports and SSR primitives, and its many plugins and integrations are fostering a vibrant ecosystem. Its dev and build story are key to its success. For docs, there are several SSG-based alternatives powered by Vite. Vite's Unit Testing story hasn't been clear though. Existing options like [Jest](https://jestjs.io/) were created in a different context. There is a lot of duplication between Jest and Vite, forcing users to configure two different pipelines.

Using Vite dev server to transform your files during testing, enables the creation of a simple runner that doesn't need to deal with the complexity of transforming source files and can solely focus on providing the best DX during testing. A test runner that uses the same configuration of your App (through `vite.config.js`), sharing a common transformation pipeline during dev, build, and test time. That is extensible with the same plugin API that lets you and the maintainers of your tools provide first-class integration with Vite. A tool that is built with Vite in mind from the start, taking advantage of its improvements in DX, like its instant Hot Module Reload (HMR). This is Vitest, a next generation testing framework powered by Vite.

Given Jest's massive adoption, Vitest provides a compatible API that allows you to use it as a drop-in replacement in most projects. It also includes the most common features required when setting up your unit tests (mocking, snapshots, coverage). Vitest cares a lot about performance and uses Worker threads to run as much as possible in parallel. Some ports have seen test running an order of magnitude faster. Watch mode is enabled by default, aligning itself with the way Vite pushes for a dev first experience. Even with all these improvements in DX, Vitest stays lightweight by carefully choosing its dependencies (or directly inlining needed pieces).

**Vitest aims to position itself as the Test Runner of choice for Vite projects, and as a solid alternative even for projects not using Vite.**

Continue reading in the [Getting Started Guide](_guide_.md)

## How is Vitest Different from X? [​](index.md#how-is-vitest-different-from-x)

You can check out the [Comparisons](_guide_comparisons.md) section for more details on how Vitest differs from other similar tools.

#### \_guide_workspace.md

> Source: https://vitest.dev/guide/workspace
> Scraped: 4/15/2025, 1:07:27 AM

## Workspace [​](index.md#workspace)

Vitest provides a way to define multiple project configurations within a single Vitest process. This feature is particularly useful for monorepo setups but can also be used to run tests with different configurations, such as `resolve.alias`, `plugins`, or `test.browser` and more.

## Defining a Workspace [​](index.md#defining-a-workspace)

A workspace must include a `vitest.workspace` or `vitest.projects` file in its root directory (located in the same folder as your root configuration file or working directory if it doesn't exist). Note that `projects` is just an alias and does not change the behavior or semantics of this feature. Vitest supports `ts`, `js`, and `json` extensions for this file.

Since Vitest 3, you can also define a workspace in the root config. In this case, Vitest will ignore the `vitest.workspace` file in the root, if one exists.

NAMING

Please note that this feature is named `workspace`, not `workspaces` (without an "s" at the end).

A workspace is a list of inlined configs, files, or glob patterns referencing your projects. For example, if you have a folder named `packages` that contains your projects, you can either create a workspace file or define an array in the root config:

vitest.workspace.tsvitest.config.ts 3.0.0+

ts

```
export default [
  'packages/*'
]
```

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    workspace: ['packages/*'],
  },
})
```

Vitest will treat every folder in `packages` as a separate project even if it doesn't have a config file inside. If this glob pattern matches any file it will be considered a Vitest config even if it doesn't have a `vitest` in its name.

WARNING

Vitest does not treat the root `vitest.config` file as a workspace project unless it is explicitly specified in the workspace configuration. Consequently, the root configuration will only influence global options such as `reporters` and `coverage`. Note that Vitest will always run certain plugin hooks, like `apply`, `config`, `configResolved` or `configureServer`, specified in the root config file. Vitest also uses the same plugins to execute global setups, workspace files and custom coverage provider.

You can also reference projects with their config files:

vitest.workspace.tsvitest.config.ts 3.0.0+

ts

```
export default [
  'packages/*/vitest.config.{e2e,unit}.ts'
]
```

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    workspace: ['packages/*/vitest.config.{e2e,unit}.ts'],
  },
})
```

This pattern will only include projects with a `vitest.config` file that contains `e2e` or `unit` before the extension.

You can also define projects using inline configuration. The workspace file supports both syntaxes simultaneously.

vitest.workspace.tsvitest.config.ts 3.0.0+

ts

```
import { defineWorkspace } from 'vitest/config'
// defineWorkspace provides a nice type hinting DX
export default defineWorkspace([
  // matches every folder and file inside the `packages` folder
  'packages/*',
  {
    // add "extends" to merge two configs together
    extends: './vite.config.js',
    test: {
      include: ['tests/**/*.{browser}.test.{ts,js}'],
      // it is recommended to define a name when using inline configs
      name: 'happy-dom',
      environment: 'happy-dom',
    }
  },
  {
    test: {
      include: ['tests/**/*.{node}.test.{ts,js}'],
      name: 'node',
      environment: 'node',
    }
  }
])
```

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    workspace: [
      // matches every folder and file inside the `packages` folder
      'packages/*',
      {
        // add "extends: true" to inherit the options from the root config
        extends: true,
        test: {
          include: ['tests/**/*.{browser}.test.{ts,js}'],
          // it is recommended to define a name when using inline configs
          name: 'happy-dom',
          environment: 'happy-dom',
        }
      },
      {
        test: {
          include: ['tests/**/*.{node}.test.{ts,js}'],
          name: 'node',
          environment: 'node',
        }
      }
    ]
  }
})
```

WARNING

All projects must have unique names; otherwise, Vitest will throw an error. If a name is not provided in the inline configuration, Vitest will assign a number. For project configurations defined with glob syntax, Vitest will default to using the "name" property in the nearest `package.json` file or, if none exists, the folder name.

If you do not use inline configurations, you can create a small JSON file in your root directory or just specify it in the root config:

vitest.workspace.jsonvitest.config.ts 3.0.0+

ts

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    workspace: ['packages/*'],
  },
})
```

Workspace projects do not support all configuration properties. For better type safety, use the `defineProject` method instead of `defineConfig` within project configuration files:

packages/a/vitest.config.ts

ts

```
import {  } from 'vitest/config'
export default ({
  : {
    : 'jsdom',
    // "reporters" is not supported in a project config,
    // so it will show an error
    reporters: ['json']

No overload matches this call.
  The last overload gave the following error.
    Object literal may only specify known properties, and 'reporters' does not exist in type 'ProjectConfig'.

  }
})
```

## Running tests [​](index.md#running-tests)

To run tests inside the workspace, define a script in your root `package.json`:

package.json

json

```
{
  "scripts": {
    "test": "vitest"
  }
}
```

Now tests can be run using your package manager:

If you need to run tests only inside a single project, use the `--project` CLI option:

npmyarnpnpmbun

bash

```
npm run test --project e2e
```

bash

```
yarn test --project e2e
```

bash

```
pnpm run test --project e2e
```

bash

```
bun test --project e2e
```

TIP

CLI option `--project` can be used multiple times to filter out several projects:

npmyarnpnpmbun

bash

```
npm run test --project e2e --project unit
```

bash

```
yarn test --project e2e --project unit
```

bash

```
pnpm run test --project e2e --project unit
```

bash

```
bun test --project e2e --project unit
```

## Configuration [​](index.md#configuration)

None of the configuration options are inherited from the root-level config file, even if the workspace is defined inside that config and not in a separate `vitest.workspace` file. You can create a shared config file and merge it with the project config yourself:

packages/a/vitest.config.ts

ts

```
import { defineProject, mergeConfig } from 'vitest/config'
import configShared from '../vitest.shared.js'
export default mergeConfig(
  configShared,
  defineProject({
    test: {
      environment: 'jsdom',
    }
  })
)
```

Additionally, at the `defineWorkspace` level, you can use the `extends` option to inherit from your root-level configuration. All options will be merged.

vitest.workspace.tsvitest.config.ts 3.0.0+

ts

```
import { defineWorkspace } from 'vitest/config'
export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    test: {
      name: 'unit',
      include: ['**/*.unit.test.ts'],
    },
  },
  {
    extends: './vitest.config.ts',
    test: {
      name: 'integration',
      include: ['**/*.integration.test.ts'],
    },
  },
])
```

ts

```
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  test: {
    pool: 'threads',
    workspace: [
      {
        // will inherit options from this config like plugins and pool
        extends: true,
        test: {
          name: 'unit',
          include: ['**/*.unit.test.ts'],
        },
      },
      {
        // won't inherit any options from this config
        // this is the default behaviour
        extends: false,
        test: {
          name: 'integration',
          include: ['**/*.integration.test.ts'],
        },
      },
    ],
  },
})
```

Some of the configuration options are not allowed in a project config. Most notably:

- `coverage`: coverage is done for the whole workspace
- `reporters`: only root-level reporters can be supported
- `resolveSnapshotPath`: only root-level resolver is respected
- all other options that don't affect test runners

TIP

All configuration options that are not supported inside a project configuration are marked with a \* sign in the ["Config"](_config_.md) guide.
