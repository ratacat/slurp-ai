---
title: "vitest Documentation"
source: "https://vitest.dev/guide/"
scraped: "2025-12-21T01:47:10.064Z"
tokens: 24423
---
# vitest Documentation

> Source: https://vitest.dev/guide/
> Generated: 12/20/2025, 6:47:10 PM

### vitest

#### _guide.md

> Source: https://vitest.dev/guide
> Scraped: 12/20/2025, 6:47:07 PM

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

Vitest requires Vite >=v6.0.0 and Node >=v20.0.0

It is recommended that you install a copy of `vitest` in your `package.json`, using one of the methods listed above. However, if you would prefer to run `vitest` directly, you can use `npx vitest` (the `npx` tool comes with npm and Node.js).

The `npx` tool will execute the specified command. By default, `npx` will first check if the command exists in the local project's binaries. If it is not found there, `npx` will look in the system's `$PATH` and execute it if found. If the command is not found in either location, `npx` will install it in a temporary location prior to execution.

## Writing Tests [​](index.md#writing-tests)

As an example, we will write a simple test that verifies the output of a function that adds two numbers.

sum.js
```
export function sum(a, b) {
  return a + b
}
```
sum.test.js
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

*   Create `vitest.config.ts`, which will have the higher priority
*   Pass `--config` option to CLI, e.g. `vitest --config ./path/to/vitest.config.ts`
*   Use `process.env.VITEST` or `mode` property on `defineConfig` (will be set to `test` if not overridden) to conditionally apply different configuration in `vite.config.ts`. Note that like any other environment variable, `VITEST` is also exposed on `import.meta.env` in your tests

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
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
export default defineConfig({
  test: {
    // ...
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

## Projects Support [​](index.md#projects-support)

Run different project configurations inside the same project with [Test Projects](_guide_projects.md). You can define a list of files and folders that define your projects in `vitest.config` file.

vitest.config.ts

ts
```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    projects: [
      // you can use a list of glob patterns to define your projects
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
    ],
  },
})
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

`projects`

[GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/projects)

[Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/projects?initialPath=__vitest__/)

## Projects using Vitest [​](index.md#projects-using-vitest)

* [unocss](https://github.com/unocss/unocss)
* [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
* [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
* [vue](https://github.com/vuejs/core)
* [vite](https://github.com/vitejs/vite)
* [vitesse](https://github.com/antfu/vitesse)
* [vitesse-lite](https://github.com/antfu/vitesse-lite)
* [fluent-vue](https://github.com/demivan/fluent-vue)
* [vueuse](https://github.com/vueuse/vueuse)
* [milkdown](https://github.com/Saul-Mirone/milkdown)
* [gridjs-svelte](https://github.com/iamyuu/gridjs-svelte)
* [spring-easing](https://github.com/okikio/spring-easing)
* [bytemd](https://github.com/bytedance/bytemd)
* [faker](https://github.com/faker-js/faker)
* [million](https://github.com/aidenybai/million)
* [Vitamin](https://github.com/wtchnm/Vitamin)
* [neodrag](https://github.com/PuruVJ/neodrag)
* [svelte-multiselect](https://github.com/janosh/svelte-multiselect)
* [iconify](https://github.com/iconify/iconify)
* [tdesign-vue-next](https://github.com/Tencent/tdesign-vue-next)
* [cz-git](https://github.com/Zhengqbbb/cz-git)

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

#### _guide_browser.md

> Source: https://vitest.dev/guide/browser
> Scraped: 12/20/2025, 6:47:07 PM

## Browser Mode [​](index.md#browser-mode)

This page provides information about the browser mode feature in the Vitest API, which allows you to run your tests in the browser natively, providing access to browser globals like window and document.

TIP

If you are looking for documentation for `expect`, `vi` or any general API like test projects or type testing, refer to the ["Getting Started" guide](_guide_.md).

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

You can also install packages manually. Vitest always requires a provider to be defined. You can chose either [`preview`](_config_browser_preview.md), [`playwright`](_config_browser_playwright.md) or [`webdriverio`](_config_browser_webdriverio.md).

If you want to just preview how your tests look, you can use the `preview` provider:

npmyarnpnpmbun

bash
```
npm install -D vitest @vitest/browser-preview
```
bash
```
yarn add -D vitest @vitest/browser-preview
```
bash
```
pnpm add -D vitest @vitest/browser-preview
```
bash
```
bun add -D vitest @vitest/browser-preview
```
WARNING

However, to run tests in CI you need to install either [`playwright`](https://npmjs.com/package/playwright) or [`webdriverio`](https://www.npmjs.com/package/webdriverio). We also recommend switching to either one of them for testing locally instead of using the default `preview` provider since it relies on simulating events instead of using Chrome DevTools Protocol.

If you don't already use one of these tools, we recommend starting with Playwright because it supports parallel execution, which makes your tests run faster.

[Playwright](https://npmjs.com/package/playwright) is a framework for Web Testing and Automation.

npmyarnpnpmbun

bash
```
npm install -D vitest @vitest/browser-playwright
```
bash
```
yarn add -D vitest @vitest/browser-playwright
```
bash
```
pnpm add -D vitest @vitest/browser-playwright
```
bash
```
bun add -D vitest @vitest/browser-playwright
```
## Configuration [​](index.md#configuration)

To activate browser mode in your Vitest configuration, set the `browser.enabled` field to `true` in your Vitest configuration file. Here is an example configuration using the browser field:

vitest.config.ts

ts
```
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
export default defineConfig({
  test: {
    browser: {
      provider: playwright(),
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

The CLI does not prints the Vite server URL automatically. You can press "b" to print the URL when running in watch mode.

If you have not used Vite before, make sure you have your framework's plugin installed and specified in the config. Some frameworks might require extra configuration to work - check their Vite related documentation to be sure.

reactvuesveltesolidmarkoqwik

ts
```
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
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
import { playwright } from '@vitest/browser-playwright'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
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
import { playwright } from '@vitest/browser-playwright'
export default defineConfig({
  plugins: [svelte()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
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
import { playwright } from '@vitest/browser-playwright'
export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
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
import { playwright } from '@vitest/browser-playwright'
export default defineConfig({
  plugins: [marko()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
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
import { qwikVite } from '@builder.io/qwik/optimizer'
import { playwright } from '@vitest/browser-playwright'
// optional, run the tests in SSR mode
import { testSSR } from 'vitest-browser-qwik/ssr-plugin'
export default defineConfig({
  plugins: [testSSR(), qwikVite()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }]
    },
  },
})
```
If you need to run some tests using Node-based runner, you can define a [`projects`](_guide_projects.md) option with separate configurations for different testing strategies:

vitest.config.ts

ts
```
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
export default defineConfig({
  test: {
    projects: [
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
            provider: playwright(),
            instances: [
              { browser: 'chromium' },
            ],
          },
        },
      },
    ],
  },
})
```
## Browser Option Types [​](index.md#browser-option-types)

The browser option in Vitest depends on the provider. Vitest will fail, if you pass `--browser` and don't specify its name in the config file. Available options:

*   `webdriverio` supports these browsers:
    *   `firefox`
    *   `chrome`
    *   `edge`
    *   `safari`
*   `playwright` supports these browsers:
    *   `firefox`
    *   `webkit`
    *   `chromium`

## Browser Compatibility [​](index.md#browser-compatibility)

Vitest uses [Vite dev server](https://vitejs.dev/guide/#browser-support) to run your tests, so we only support features specified in the [`esbuild.target`](https://vitejs.dev/config/shared-options.html#esbuild) option (`esnext` by default).

By default, Vite targets browsers which support the native [ES Modules](https://caniuse.com/es6-module), native [ESM dynamic import](https://caniuse.com/es6-module-dynamic-import), and [`import.meta`](https://caniuse.com/mdn-javascript_operators_import_meta). On top of that, we utilize [`BroadcastChannel`](https://caniuse.com/?search=BroadcastChannel) to communicate between iframes:

*   Chrome >=87
*   Firefox >=78
*   Safari >=15.4
*   Edge >=88

## Running Tests [​](index.md#running-tests)

When you specify a browser name in the browser option, Vitest will try to run the specified browser using `preview` by default, and then run the tests there. If you don't want to use `preview`, you can configure the custom browser provider by using `browser.provider` option.

To specify a browser using the CLI, use the `--browser` flag followed by the browser name, like this:

sh
```
npx vitest --browser=chromium
```
Or you can provide browser options to CLI with dot notation:

sh
```
npx vitest --browser.headless
```
WARNING

Since Vitest 3.2, if you don't have the `browser` option in your config but specify the `--browser` flag, Vitest will fail because it can't assume that config is meant for the browser and not Node.js tests.

By default, Vitest will automatically open the browser UI for development. Your tests will run inside an iframe in the center. You can configure the viewport by selecting the preferred dimensions, calling `page.viewport` inside the test, or setting default values in [the config](_config_.md#browser-viewport).

## Headless [​](index.md#headless)

Headless mode is another option available in the browser mode. In headless mode, the browser runs in the background without a user interface, which makes it useful for running automated tests. The headless option in Vitest can be set to a boolean value to enable or disable headless mode.

When using headless mode, Vitest won't open the UI automatically. If you want to continue using the UI but have tests run headlessly, you can install the [`@vitest/ui`](_guide_ui.md) package and pass the `--ui` flag when running Vitest.

Here's an example configuration enabling headless mode:

vitest.config.ts

ts
```
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
export default defineConfig({
  test: {
    browser: {
      provider: playwright(),
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
import { page } from 'vitest/browser'
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

* [`vitest-browser-vue`](https://github.com/vitest-dev/vitest-browser-vue) to render [vue](https://vuejs.org/) components
* [`vitest-browser-svelte`](https://github.com/vitest-dev/vitest-browser-svelte) to render [svelte](https://svelte.dev/) components
* [`vitest-browser-react`](https://github.com/vitest-dev/vitest-browser-react) to render [react](https://react.dev/) components

Community packages are available for other frameworks:

* [`vitest-browser-lit`](https://github.com/EskiMojo14/vitest-browser-lit) to render [lit](https://lit.dev/) components
* [`vitest-browser-preact`](https://github.com/JoviDeCroock/vitest-browser-preact) to render [preact](https://preactjs.com/) components
* [`vitest-browser-qwik`](https://github.com/kunai-consulting/vitest-browser-qwik) to render [qwik](https://qwik.dev/) components

If your framework is not represented, feel free to create your own package - it is a simple wrapper around the framework renderer and `page.elementLocator` API. We will add a link to it on this page. Make sure it has a name starting with `vitest-browser-`.

Besides rendering components and locating elements, you will also need to make assertions. Vitest forks the [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom) library to provide a wide range of DOM assertions out of the box. Read more at the [Assertions API](_api_browser_assertions.md).

ts
```
import { expect } from 'vitest'
import { page } from 'vitest/browser'
// element is rendered correctly
await expect.element(page.getByText('Hello World')).toBeInTheDocument()
```
Vitest exposes a [Context API](_api_browser_context.md) with a small set of utilities that might be useful to you in tests. For example, if you need to make an interaction, like clicking an element or typing text into an input, you can use `userEvent` from `vitest/browser`. Read more at the [Interactivity API](_api_browser_interactivity.md).

ts
```
import { page, userEvent } from 'vitest/browser'
await userEvent.fill(page.getByLabelText(/username/i), 'Alice')
// or just locator.fill
await page.getByLabelText(/username/i).fill('Alice')
```
vuesveltereactlitpreactqwik

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
tsx
```
import { render } from 'vitest-browser-preact'
import { createElement } from 'preact'
import Greeting from '.Greeting'
test('greeting appears on click', async () => {
  const screen = render(<Greeting />)
  const button = screen.getByRole('button')
  await button.click()
  const greeting = screen.getByText(/hello world/iu)
  await expect.element(greeting).toBeInTheDocument()
})
```
tsx
```
import { render } from 'vitest-browser-qwik'
import Greeting from './greeting'
test('greeting appears on click', async () => {
  // renderSSR and renderHook are also available
  const screen = render(<Greeting />)
  const button = screen.getByRole('button')
  await button.click()
  const greeting = screen.getByText(/hello world/iu)
  await expect.element(greeting).toBeInTheDocument()
})
```
Vitest doesn't support all frameworks out of the box, but you can use external tools to run tests with these frameworks. We also encourage the community to create their own `vitest-browser` wrappers - if you have one, feel free to add it to the examples above.

For unsupported frameworks, we recommend using `testing-library` packages:

* [`@solidjs/testing-library`](https://testing-library.com/docs/solid-testing-library/intro) to render [solid](https://www.solidjs.com/) components
* [`@marko/testing-library`](https://testing-library.com/docs/marko-testing-library/intro) to render [marko](https://markojs.com/) components

You can also see more examples in [`browser-examples`](https://github.com/vitest-tests/browser-examples) repository.

WARNING

`testing-library` provides a package `@testing-library/user-event`. We do not recommend using it directly because it simulates events instead of actually triggering them - instead, use [`userEvent`](_api_browser_interactivity.md) imported from `vitest/browser` that uses Chrome DevTools Protocol or Webdriver (depending on the provider) under the hood.

solidmarko

tsx
```
// based on @testing-library/solid API
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
// based on @testing-library/marko API
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

### Spying on Module Exports [​](index.md#spying-on-module-exports)

Browser Mode uses the browser's native ESM support to serve modules. The module namespace object is sealed and can't be reconfigured, unlike in Node.js tests where Vitest can patch the Module Runner. This means you can't call `vi.spyOn` on an imported object:

ts
```
import { vi } from 'vitest'
import * as module from './module.js'
vi.spyOn(module, 'method') // ❌ throws an error
```
To bypass this limitation, Vitest supports `{ spy: true }` option in `vi.mock('./module.js')`. This will automatically spy on every export in the module without replacing them with fake ones.

ts
```
import { vi } from 'vitest'
import * as module from './module.js'
vi.mock('./module.js', { spy: true })
vi.mocked(module.method).mockImplementation(() => {
  // ...
})
```
However, the only way to mock exported _variables_ is to export a method that will change the internal value:

module.jsmodule.test.ts

js
```
export let MODE = 'test'
export function changeMode(newMode) {
  MODE = newMode
}
```
js
```
import { expect } from 'vitest'
import { changeMode, MODE } from './module.js'
changeMode('production')
expect(MODE).toBe('production')
```

#### _guide_browser_component-testing.md

> Source: https://vitest.dev/guide/browser/component-testing
> Scraped: 12/20/2025, 6:47:08 PM

## Component Testing [​](index.md#component-testing)

Component testing is a testing strategy that focuses on testing individual UI components in isolation. Unlike end-to-end tests that test entire user flows, component tests verify that each component works correctly on its own, making them faster to run and easier to debug.

Vitest provides comprehensive support for component testing across multiple frameworks including Vue, React, Svelte, Lit, Preact, Qwik, Solid, Marko, and more. This guide covers the specific patterns, tools, and best practices for testing components effectively with Vitest.

## Why Component Testing? [​](index.md#why-component-testing)

Component testing sits between unit tests and end-to-end tests, offering several advantages:

*   **Faster feedback** - Test individual components without loading entire applications
*   **Isolated testing** - Focus on component behavior without external dependencies
*   **Better debugging** - Easier to pinpoint issues in specific components
*   **Comprehensive coverage** - Test edge cases and error states more easily

## Browser Mode for Component Testing [​](index.md#browser-mode-for-component-testing)

Component testing in Vitest uses **Browser Mode** to run tests in real browser environments using Playwright, WebdriverIO, or preview mode. This provides the most accurate testing environment as your components run in real browsers with actual DOM implementations, CSS rendering, and browser APIs.

### Why Browser Mode? [​](index.md#why-browser-mode)

Browser Mode is the recommended approach for component testing because it provides the most accurate testing environment. Unlike DOM simulation libraries, Browser Mode catches real-world issues that can affect your users.

TIP

Browser Mode catches issues that DOM simulation libraries might miss, including:

*   CSS layout and styling problems
*   Real browser API behavior
*   Accurate event handling and propagation
*   Proper focus management and accessibility features

### Purpose of this Guide [​](index.md#purpose-of-this-guide)

This guide focuses specifically on **component testing patterns and best practices** using Vitest's capabilities. While many examples use Browser Mode (as it's the recommended approach), the focus here is on component-specific testing strategies rather than browser configuration details.

For detailed browser setup, configuration options, and advanced browser features, refer to the [Browser Mode documentation](_guide_browser_.md).

## What Makes a Good Component Test [​](index.md#what-makes-a-good-component-test)

Good component tests focus on **behavior and user experience** rather than implementation details:

*   **Test the contract** - How components receive inputs (props) and produce outputs (events, renders)
*   **Test user interactions** - Clicks, form submissions, keyboard navigation
*   **Test edge cases** - Error states, loading states, empty states
*   **Avoid testing internals** - State variables, private methods, CSS classes

### Component Testing Hierarchy [​](index.md#component-testing-hierarchy)
```
1. Critical User Paths → Always test these
2. Error Handling      → Test failure scenarios
3. Edge Cases          → Empty data, extreme values
4. Accessibility       → Screen readers, keyboard nav
5. Performance         → Large datasets, animations
```
## Component Testing Strategies [​](index.md#component-testing-strategies)

### Isolation Strategy [​](index.md#isolation-strategy)

Test components in isolation by mocking dependencies:

tsx
```
// For API requests, we recommend MSW (Mock Service Worker)
// See: https://vitest.dev/guide/mocking/requests
//
// vi.mock(import('../api/userService'), () => ({
//   fetchUser: vi.fn().mockResolvedValue({ name: 'John' })
// }))
// Mock child components to focus on parent logic
vi.mock(import('../components/UserCard'), () => ({
  default: vi.fn(({ user }) => `<div>User: ${user.name}</div>`)
}))
test('UserProfile handles loading and data states', async () => {
  const { getByText } = render(<UserProfile userId="123" />)
  // Test loading state
  await expect.element(getByText('Loading...')).toBeInTheDocument()
  // Test for data to load (expect.element auto-retries)
  await expect.element(getByText('User: John')).toBeInTheDocument()
})
```
### Integration Strategy [​](index.md#integration-strategy)

Test component collaboration and data flow:

tsx
```
test('ProductList filters and displays products correctly', async () => {
  const mockProducts = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
    { id: 2, name: 'Book', category: 'Education', price: 29 }
  ]
  const { getByLabelText, getByText } = render(
    <ProductList products={mockProducts} />
  )
  // Initially shows all products
  await expect.element(getByText('Laptop')).toBeInTheDocument()
  await expect.element(getByText('Book')).toBeInTheDocument()
  // Filter by category
  await userEvent.selectOptions(
    getByLabelText(/category/i),
    'Electronics'
  )
  // Only electronics should remain
  await expect.element(getByText('Laptop')).toBeInTheDocument()
  await expect.element(queryByText('Book')).not.toBeInTheDocument()
})
```
## Testing Library Integration [​](index.md#testing-library-integration)

While Vitest provides official packages for popular frameworks ([`vitest-browser-vue`](https://www.npmjs.com/package/vitest-browser-vue), [`vitest-browser-react`](https://www.npmjs.com/package/vitest-browser-react), [`vitest-browser-svelte`](https://www.npmjs.com/package/vitest-browser-svelte)), you can integrate with [Testing Library](https://testing-library.com/) for frameworks not yet officially supported.

### When to Use Testing Library [​](index.md#when-to-use-testing-library)

*   Your framework doesn't have an official Vitest browser package yet
*   You're migrating existing tests that use Testing Library
*   You prefer Testing Library's API for specific testing scenarios

### Integration Pattern [​](index.md#integration-pattern)

The key is using `page.elementLocator()` to bridge Testing Library's DOM output with Vitest's browser mode APIs:

jsx
```
// For Solid.js components
import { render } from '@testing-library/solid'
import { page } from 'vitest/browser'
test('Solid component handles user interaction', async () => {
  // Use Testing Library to render the component
  const { baseElement, getByRole } = render(() =>
    <Counter initialValue={0} />
  )
  // Bridge to Vitest's browser mode for interactions and assertions
  const screen = page.elementLocator(baseElement)
  // Use Vitest's page queries for finding elements
  const incrementButton = screen.getByRole('button', { name: /increment/i })
  // Use Vitest's assertions and interactions
  await expect.element(screen.getByText('Count: 0')).toBeInTheDocument()
  // Trigger user interaction using Vitest's page API
  await incrementButton.click()
  await expect.element(screen.getByText('Count: 1')).toBeInTheDocument()
})
```
### Available Testing Library Packages [​](index.md#available-testing-library-packages)

Popular Testing Library packages that work well with Vitest:

* [`@testing-library/solid`](https://github.com/solidjs/solid-testing-library) - For Solid.js
* [`@marko/testing-library`](https://testing-library.com/docs/marko-testing-library/intro) - For Marko
* [`@testing-library/svelte`](https://testing-library.com/docs/svelte-testing-library/intro) - Alternative to [`vitest-browser-svelte`](https://www.npmjs.com/package/vitest-browser-svelte)
* [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro) - Alternative to [`vitest-browser-vue`](https://www.npmjs.com/package/vitest-browser-vue)

Migration Path

If your framework gets official Vitest support later, you can gradually migrate by replacing Testing Library's `render` function while keeping most of your test logic intact.

## Best Practices [​](index.md#best-practices)

### 1\. Use Browser Mode for CI/CD [​](index.md#_1-use-browser-mode-for-ci-cd)

Ensure tests run in real browser environments for the most accurate testing. Browser Mode provides accurate CSS rendering, real browser APIs, and proper event handling.

### 2\. Test User Interactions [​](index.md#_2-test-user-interactions)

Simulate real user behavior using Vitest's [Interactivity API](_api_browser_interactivity.md). Use `page.getByRole()` and `userEvent` methods as shown in our [Advanced Testing Patterns](index.md#advanced-testing-patterns):

tsx
```
// Good: Test actual user interactions
await page.getByRole('button', { name: /submit/i }).click()
await page.getByLabelText(/email/i).fill('user@example.com')
// Avoid: Testing implementation details
// component.setState({ email: 'user@example.com' })
```
### 3\. Test Accessibility [​](index.md#_3-test-accessibility)

Ensure components work for all users by testing keyboard navigation, focus management, and ARIA attributes. See our [Testing Accessibility](index.md#testing-accessibility) example for practical patterns:

tsx
```
// Test keyboard navigation
await userEvent.keyboard('{Tab}')
await expect.element(document.activeElement).toHaveFocus()
// Test ARIA attributes
await expect.element(modal).toHaveAttribute('aria-modal', 'true')
```
### 4\. Mock External Dependencies [​](index.md#_4-mock-external-dependencies)

Focus tests on component logic by mocking APIs and external services. This makes tests faster and more reliable. See our [Isolation Strategy](index.md#isolation-strategy) for examples:

tsx
```
// For API requests, we recommend using MSW (Mock Service Worker)
// See: https://vitest.dev/guide/mocking/requests
// This provides more realistic request/response mocking
// For module mocking, use the import() syntax
vi.mock(import('../components/UserCard'), () => ({
  default: vi.fn(() => <div>Mocked UserCard</div>)
}))
```
### 5\. Use Meaningful Test Descriptions [​](index.md#_5-use-meaningful-test-descriptions)

Write test descriptions that explain the expected behavior, not implementation details:

tsx
```
// Good: Describes user-facing behavior
test('shows error message when email format is invalid')
test('disables submit button while form is submitting')
// Avoid: Implementation-focused descriptions
test('calls validateEmail function')
test('sets isSubmitting state to true')
```
## Advanced Testing Patterns [​](index.md#advanced-testing-patterns)

### Testing Component State Management [​](index.md#testing-component-state-management)

tsx
```
// Testing stateful components and state transitions
test('ShoppingCart manages items correctly', async () => {
  const { getByText, getByTestId } = render(<ShoppingCart />)
  // Initially empty
  await expect.element(getByText('Your cart is empty')).toBeInTheDocument()
  // Add item
  await page.getByRole('button', { name: /add laptop/i }).click()
  // Verify state change
  await expect.element(getByText('1 item')).toBeInTheDocument()
  await expect.element(getByText('Laptop - $999')).toBeInTheDocument()
  // Test quantity updates
  await page.getByRole('button', { name: /increase quantity/i }).click()
  await expect.element(getByText('2 items')).toBeInTheDocument()
})
```
### Testing Async Components with Data Fetching [​](index.md#testing-async-components-with-data-fetching)

tsx
```
// Option 1: Recommended - Use MSW (Mock Service Worker) for API mocking
import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
// Set up MSW worker with API handlers
const worker = setupWorker(
  http.get('/api/users/:id', ({ params }) => {
    // Describe the happy path
    return HttpResponse.json({ id: params.id, name: 'John Doe', email: 'john@example.com' })
  })
)
// Start the worker before all tests
beforeAll(() => worker.start())
afterEach(() => worker.resetHandlers())
afterAll(() => worker.stop())
test('UserProfile handles loading, success, and error states', async () => {
  // Test success state
  const { getByText } = render(<UserProfile userId="123" />)
  // expect.element auto-retries until elements are found
  await expect.element(getByText('John Doe')).toBeInTheDocument()
  await expect.element(getByText('john@example.com')).toBeInTheDocument()
  // Test error state by overriding the handler for this test
  worker.use(
    http.get('/api/users/:id', () => {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 })
    })
  )
  const { getByText: getErrorText } = render(<UserProfile userId="999" />)
  await expect.element(getErrorText('Error: User not found')).toBeInTheDocument()
})
```
### Testing Component Communication [​](index.md#testing-component-communication)

tsx
```
// Test parent-child component interaction
test('parent and child components communicate correctly', async () => {
  const mockOnSelectionChange = vi.fn()
  const { getByText } = render(
    <ProductCatalog onSelectionChange={mockOnSelectionChange}>
      <ProductFilter />
      <ProductGrid />
    </ProductCatalog>
  )
  // Interact with child component
  await page.getByRole('checkbox', { name: /electronics/i }).click()
  // Verify parent receives the communication
  expect(mockOnSelectionChange).toHaveBeenCalledWith({
    category: 'electronics',
    filters: ['electronics']
  })
  // Verify other child component updates (expect.element auto-retries)
  await expect.element(getByText('Showing Electronics products')).toBeInTheDocument()
})
```
### Testing Complex Forms with Validation [​](index.md#testing-complex-forms-with-validation)

tsx
```
test('ContactForm handles complex validation scenarios', async () => {
  const mockSubmit = vi.fn()
  const { getByLabelText, getByText } = render(
    <ContactForm onSubmit={mockSubmit} />
  )
  const nameInput = page.getByLabelText(/full name/i)
  const emailInput = page.getByLabelText(/email/i)
  const messageInput = page.getByLabelText(/message/i)
  const submitButton = page.getByRole('button', { name: /send message/i })
  // Test validation triggers
  await submitButton.click()
  await expect.element(getByText('Name is required')).toBeInTheDocument()
  await expect.element(getByText('Email is required')).toBeInTheDocument()
  await expect.element(getByText('Message is required')).toBeInTheDocument()
  // Test partial validation
  await nameInput.fill('John Doe')
  await submitButton.click()
  await expect.element(getByText('Name is required')).not.toBeInTheDocument()
  await expect.element(getByText('Email is required')).toBeInTheDocument()
  // Test email format validation
  await emailInput.fill('invalid-email')
  await submitButton.click()
  await expect.element(getByText('Please enter a valid email')).toBeInTheDocument()
  // Test successful submission
  await emailInput.fill('john@example.com')
  await messageInput.fill('Hello, this is a test message.')
  await submitButton.click()
  expect(mockSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, this is a test message.'
  })
})
```
### Testing Error Boundaries [​](index.md#testing-error-boundaries)

tsx
```
// Test how components handle and recover from errors
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Component error!')
  }
  return <div>Component working fine</div>
}
test('ErrorBoundary catches and displays errors gracefully', async () => {
  const { getByText, rerender } = render(
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ThrowError shouldThrow={false} />
    </ErrorBoundary>
  )
  // Initially working
  await expect.element(getByText('Component working fine')).toBeInTheDocument()
  // Trigger error
  rerender(
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  )
  // Error boundary should catch it
  await expect.element(getByText('Something went wrong')).toBeInTheDocument()
})
```
### Testing Accessibility [​](index.md#testing-accessibility)

tsx
```
test('Modal component is accessible', async () => {
  const { getByRole, getByLabelText } = render(
    <Modal isOpen={true} title="Settings">
      <SettingsForm />
    </Modal>
  )
  // Test focus management - modal should receive focus when opened
  // This is crucial for screen reader users to know a modal opened
  const modal = getByRole('dialog')
  await expect.element(modal).toHaveFocus()
  // Test ARIA attributes - these provide semantic information to screen readers
  await expect.element(modal).toHaveAttribute('aria-labelledby') // Links to title element
  await expect.element(modal).toHaveAttribute('aria-modal', 'true') // Indicates modal behavior
  // Test keyboard navigation - Escape key should close modal
  // This is required by ARIA authoring practices
  await userEvent.keyboard('{Escape}')
  // expect.element auto-retries until modal is removed
  await expect.element(modal).not.toBeInTheDocument()
  // Test focus trap - tab navigation should cycle within modal
  // This prevents users from tabbing to content behind the modal
  const firstInput = getByLabelText(/username/i)
  const lastButton = getByRole('button', { name: /save/i })
  // Use click to focus on the first input, then test tab navigation
  await firstInput.click()
  await userEvent.keyboard('{Shift>}{Tab}{/Shift}') // Shift+Tab goes backwards
  await expect.element(lastButton).toHaveFocus() // Should wrap to last element
})
```
## Debugging Component Tests [​](index.md#debugging-component-tests)

### 1\. Use Browser Dev Tools [​](index.md#_1-use-browser-dev-tools)

Browser Mode runs tests in real browsers, giving you access to full developer tools. When tests fail, you can:

*   **Open browser dev tools** during test execution (F12 or right-click → Inspect)
*   **Set breakpoints** in your test code or component code
*   **Inspect the DOM** to see the actual rendered output
*   **Check console errors** for JavaScript errors or warnings
*   **Monitor network requests** to debug API calls

For headful mode debugging, add `headless: false` to your browser config temporarily.

### 2\. Add Debug Statements [​](index.md#_2-add-debug-statements)

Use strategic logging to understand test failures:

tsx
```
test('debug form validation', async () => {
  render(<ContactForm />)
  const submitButton = page.getByRole('button', { name: /submit/i })
  await submitButton.click()
  // Debug: Check if element exists with different query
  const errorElement = page.getByText('Email is required')
  console.log('Error element found:', errorElement.length)
  await expect.element(errorElement).toBeInTheDocument()
})
```
### 3\. Inspect Rendered Output [​](index.md#_3-inspect-rendered-output)

When components don't render as expected, investigate systematically:

**Use Vitest's browser UI:**   Run tests with browser mode enabled
*   Open the browser URL shown in the terminal to see tests running
*   Visual inspection helps identify CSS issues, layout problems, or missing elements

**Test element queries:**

tsx
```
// Debug why elements can't be found
const button = page.getByRole('button', { name: /submit/i })
console.log('Button count:', button.length) // Should be 1
// Try alternative queries if the first one fails
if (button.length === 0) {
  console.log('All buttons:', page.getByRole('button').length)
  console.log('By test ID:', page.getByTestId('submit-btn').length)
}
```
### 4\. Verify Selectors [​](index.md#_4-verify-selectors)

Selector issues are common causes of test failures. Debug them systematically:

**Check accessible names:**

tsx
```
// If getByRole fails, check what roles/names are available
const buttons = page.getByRole('button').all()
for (const button of buttons) {
  // Use element() to get the DOM element and access native properties
  const element = button.element()
  const accessibleName = element.getAttribute('aria-label') || element.textContent
  console.log(`Button: "${accessibleName}"`)
}
```
**Test different query strategies:**

tsx
```
// Multiple ways to find the same element using .or for auto-retrying
const submitButton = page.getByRole('button', { name: /submit/i }) // By accessible name
  .or(page.getByTestId('submit-button')) // By test ID
  .or(page.getByText('Submit')) // By exact text
// Note: Vitest doesn't have page.locator(), use specific getBy* methods instead
```
**Common selector debugging patterns:**

tsx
```
test('debug element queries', async () => {
  render(<LoginForm />)
  // Check if element is visible and enabled
  const emailInput = page.getByLabelText(/email/i)
  await expect.element(emailInput).toBeVisible() // Will show if element is visible and print DOM if not
})
```
### 5\. Debugging Async Issues [​](index.md#_5-debugging-async-issues)

Component tests often involve timing issues:

tsx
```
test('debug async component behavior', async () => {
  render(<AsyncUserProfile userId="123" />)
  // expect.element will automatically retry and show helpful error messages
  await expect.element(page.getByText('John Doe')).toBeInTheDocument()
})
```
## Migration from Other Testing Frameworks [​](index.md#migration-from-other-testing-frameworks)

### From Jest + Testing Library [​](index.md#from-jest-testing-library)

Most Jest + Testing Library tests work with minimal changes:

ts
```
// Before (Jest)
import { render, screen } from '@testing-library/react'
// After (Vitest)
import { render } from 'vitest-browser-react'
```
### Key Differences [​](index.md#key-differences)

*   Use `await expect.element()` instead of `expect()` for DOM assertions
*   Use `vitest/browser` for user interactions instead of `@testing-library/user-event`
*   Browser Mode provides real browser environment for accurate testing

## Learn More [​](index.md#learn-more)

* [Browser Mode Documentation](_guide_browser_.md)
* [Assertion API](_api_browser_assertions.md)
* [Interactivity API](_api_browser_interactivity.md)
* [Example Repository](https://github.com/vitest-tests/browser-examples)

#### _guide_browser_multiple-setups.md

> Source: https://vitest.dev/guide/browser/multiple-setups
> Scraped: 12/20/2025, 6:47:07 PM

## Multiple Setups [​](index.md#multiple-setups)

You can specify several different browser setups using the [`browser.instances`](_config_browser_instances.md) option.

The main advantage of using the `browser.instances` over the [test projects](_guide_projects.md) is improved caching. Every project will use the same Vite server meaning the file transform and [dependency pre-bundling](https://vite.dev/guide/dep-pre-bundling.html) has to happen only once.

## Several Browsers [​](index.md#several-browsers)

You can use the `browser.instances` field to specify options for different browsers. For example, if you want to run the same tests in different browsers, the minimal configuration will look like this:

vitest.config.ts

ts
```
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
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
import { playwright } from '@vitest/browser-playwright'
export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        {
          browser: 'chromium',
          name: 'chromium-1',
          setupFiles: ['./ratio-setup.ts'],
          provide: {
            ratio: 1,
          },
        },
        {
          browser: 'chromium',
          name: 'chromium-2',
          provide: {
            ratio: 2,
          },
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

#### _guide_browser_trace-view.md

> Source: https://vitest.dev/guide/browser/trace-view
> Scraped: 12/20/2025, 6:47:07 PM

## Trace View [​](index.md#trace-view)

Vitest Browser Mode supports generating Playwright's [trace files](https://playwright.dev/docs/trace-viewer#viewing-remote-traces). To enable tracing, you need to set the [`trace`](_config_browser_trace.md) option in the `test.browser` configuration.

vitest.config.jsCLI

ts
```
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
export default defineConfig({
  test: {
    browser: {
      provider: playwright(),
      trace: 'on',
    },
  },
})
```
bash
```
vitest --browser.trace=on
```
By default, Vitest will generate a trace file for each test. You can also configure it to only generate traces on test failures by setting `trace` to `'on-first-retry'`, `'on-all-retries'` or `'retain-on-failure'`. The files will be saved in `__traces__` folder next to your test files. The name of the trace includes the project name, the test name, the [`repeats` count and `retry` count](_api_.md#test-api-reference):
```
chromium-my-test-0-0.trace.zip
^^^^^^^^ project name
         ^^^^^^ test name
                ^ repeat count
                  ^ retry count
```
To change the output directory, you can set the `tracesDir` option in the `test.browser.trace` configuration. This way all traces will be stored in the same directory, grouped by the test file.

vitest.config.js

ts
```
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
export default defineConfig({
  test: {
    browser: {
      provider: playwright(),
      trace: {
        mode: 'on',
        // the path is relative to the root of the project
        tracesDir: './playwright-traces',
      },
    },
  },
})
```
The traces are available in reporters as [annotations](_guide_test-annotations.md). For example, in the HTML reporter, you can find the link to the trace file in the test details.

## Preview [​](index.md#preview)

To open the trace file, you can use the Playwright Trace Viewer. Run the following command in your terminal:

bash
```
npx playwright show-trace "path-to-trace-file"
```
This will start the Trace Viewer and load the specified trace file.

Alternatively, you can open the Trace Viewer in your browser at [https://trace.playwright.dev](https://trace.playwright.dev/) and upload the trace file there.

## Limitations [​](index.md#limitations)

At the moment, Vitest cannot populate the "Sources" tab in the Trace Viewer. This means that while you can see the actions and screenshots captured during the test, you won't be able to view the source code of your tests directly within the Trace Viewer. You will need to refer back to your code editor to see the test implementation.

#### _guide_browser_visual-regression-testing.md

> Source: https://vitest.dev/guide/browser/visual-regression-testing
> Scraped: 12/20/2025, 6:47:08 PM

## Visual Regression Testing [​](index.md#visual-regression-testing)

Vitest can run visual regression tests out of the box. It captures screenshots of your UI components and pages, then compares them against reference images to detect unintended visual changes.

Unlike functional tests that verify behavior, visual tests catch styling issues, layout shifts, and rendering problems that might otherwise go unnoticed without thorough manual testing.

## Why Visual Regression Testing? [​](index.md#why-visual-regression-testing)

Visual bugs don’t throw errors, they just look wrong. That’s where visual testing comes in.

*   That button still submits the form... but why is it hot pink now?
*   The text fits perfectly... until someone views it on mobile
*   Everything works great... except those two containers are out of viewport
*   That careful CSS refactor works... but broke the layout on a page no one tests

Visual regression testing acts as a safety net for your UI, automatically catching these visual changes before they reach production.

## Getting Started [​](index.md#getting-started)

Browser Rendering Differences

Visual regression tests are **inherently unstable across different environments**. Screenshots will look different on different machines because of:

*   Font rendering (the big one. Windows, macOS, Linux, they all render text differently)
*   GPU drivers and hardware acceleration
*   Whether you're running headless or not
*   Browser settings and versions
*   ...and honestly, sometimes just the phase of the moon

That's why Vitest includes the browser and platform in screenshot names (like `button-chromium-darwin.png`).

For stable tests, use the same environment everywhere. We **strongly recommend** cloud services like [Azure App Testing](https://azure.microsoft.com/en-us/products/app-testing/) or [Docker containers](https://playwright.dev/docs/docker).

Visual regression testing in Vitest can be done through the [`toMatchScreenshot` assertion](_api_browser_assertions.md#tomatchscreenshot):

ts
```
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'
test('hero section looks correct', async () => {
  // ...the rest of the test
  // capture and compare screenshot
  await expect(page.getByTestId('hero')).toMatchScreenshot('hero-section')
})
```
### Creating References [​](index.md#creating-references)

When you run a visual test for the first time, Vitest creates a reference (also called baseline) screenshot and fails the test with the following error message:
```
expect(element).toMatchScreenshot()
No existing reference screenshot found; a new one was created. Review it before running tests again.
Reference screenshot:
  tests/__screenshots__/hero.test.ts/hero-section-chromium-darwin.png
```
This is normal. Check that the screenshot looks right, then run the test again. Vitest will now compare future runs against this baseline.

TIP

Reference screenshots live in `__screenshots__` folders next to your tests. **Don't forget to commit them!**

### Screenshot Organization [​](index.md#screenshot-organization)

By default, screenshots are organized as:
```
.
├── __screenshots__
│   └── test-file.test.ts
│       ├── test-name-chromium-darwin.png
│       ├── test-name-firefox-linux.png
│       └── test-name-webkit-win32.png
└── test-file.test.ts
```
The naming convention includes:

*   **Test name**: either the first argument of the `toMatchScreenshot()` call, or automatically generated from the test's name.
*   **Browser name**: `chrome`, `chromium`, `firefox` or `webkit`.
*   **Platform**: `aix`, `darwin`, `freebsd`, `linux`, `openbsd`, `sunos`, or `win32`.

This ensures screenshots from different environments don't overwrite each other.

### Updating References [​](index.md#updating-references)

When you intentionally change your UI, you'll need to update the reference screenshots:

Review updated screenshots before committing to make sure changes are intentional.

## How Visual Tests Work [​](index.md#how-visual-tests-work)

Visual regression tests need stable screenshots to compare against. But pages aren't instantly stable as images load, animations finish, fonts render, and layouts settle.

Vitest handles this automatically through "Stable Screenshot Detection":

1.  Vitest takes a first screenshot (or uses the reference screenshot if available) as baseline
2.  It takes another screenshot and compares it with the baseline
    *   If the screenshots match, the page is stable and testing continues
    *   If they differ, Vitest uses the newest screenshot as the baseline and repeats
3.  This continues until stability is achieved or the timeout is reached

This ensures that transient visual changes (like loading spinners or animations) don't cause false failures. If something never stops animating though, you'll hit the timeout, so consider [disabling animations during testing](index.md#disable-animations).

If a stable screenshot is captured after retries (one or more) and a reference screenshot exists, Vitest performs a final comparison with the reference using `createDiff: true`. This will generate a diff image if they don't match.

During stability detection, Vitest calls comparators with `createDiff: false` since it only needs to know if screenshots match. This keeps the detection process fast.

## Configuring Visual Tests [​](index.md#configuring-visual-tests)

### Global Configuration [​](index.md#global-configuration)

Configure visual regression testing defaults in your [Vitest config](_config_browser_expect.md#tomatchscreenshot):

vitest.config.ts

ts
```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    browser: {
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            // 0-1, how different can colors be?
            threshold: 0.2,
            // 1% of pixels can differ
            allowedMismatchedPixelRatio: 0.01,
          },
        },
      },
    },
  },
})
```
### Per-Test Configuration [​](index.md#per-test-configuration)

Override global settings for specific tests:

ts
```
await expect(element).toMatchScreenshot('button-hover', {
  comparatorName: 'pixelmatch',
  comparatorOptions: {
    // more lax comparison for text-heavy elements
    allowedMismatchedPixelRatio: 0.1,
  },
})
```
## Best Practices [​](index.md#best-practices)

### Test Specific Elements [​](index.md#test-specific-elements)

Unless you explicitly want to test the whole page, prefer capturing specific components to reduce false positives:

ts
```
// ❌ Captures entire page; prone to unrelated changes
await expect(page).toMatchScreenshot()
// ✅ Captures only the component under test
await expect(page.getByTestId('product-card')).toMatchScreenshot()
```
### Handle Dynamic Content [​](index.md#handle-dynamic-content)

Dynamic content like timestamps, user data, or random values will cause tests to fail. You can either mock the sources of dynamic content or mask them when using the Playwright provider by using the [`mask` option](https://playwright.dev/docs/api/class-page#page-screenshot-option-mask) in `screenshotOptions`.

ts
```
await expect(page.getByTestId('profile')).toMatchScreenshot({
  screenshotOptions: {
    mask: [page.getByTestId('last-seen')],
  },
})
```
### Disable Animations [​](index.md#disable-animations)

Animations can cause flaky tests. Disable them during testing by injecting a custom CSS snippet:

css
```
*, *::before, *::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
}
```
TIP

When using the Playwright provider, animations are automatically disabled when using the assertion: the `animations` option's value in `screenshotOptions` is set to `"disabled"` by default.

### Set Appropriate Thresholds [​](index.md#set-appropriate-thresholds)

Tuning thresholds is tricky. It depends on the content, test environment, what's acceptable for your app, and might also change based on the test.

Vitest does not set a default for the mismatching pixels, that's up for the user to decide based on their needs. The recommendation is to use `allowedMismatchedPixelRatio`, so that the threshold is computed on the size of the screenshot and not a fixed number.

When setting both `allowedMismatchedPixelRatio` and `allowedMismatchedPixels`, Vitest uses whichever limit is stricter.

### Set consistent viewport sizes [​](index.md#set-consistent-viewport-sizes)

As the browser instance might have a different default size, it's best to set a specific viewport size, either on the test or the instance configuration:

ts
```
await page.viewport(1280, 720)
```
vitest.config.ts

ts
```
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        {
          browser: 'chromium',
          viewport: { width: 1280, height: 720 },
        },
      ],
    },
  },
})
```
### Use Git LFS [​](index.md#use-git-lfs)

Store reference screenshots in [Git LFS](https://github.com/git-lfs/git-lfs?tab=readme-ov-file) if you plan to have a large test suite.

## Debugging Failed Tests [​](index.md#debugging-failed-tests)

When a visual test fails, Vitest provides three images to help debug:

1.  **Reference screenshot**: the expected baseline image
2.  **Actual screenshot**: what was captured during the test
3.  **Diff image**: highlights the differences, but this might not get generated

You'll see something like:
```
expect(element).toMatchScreenshot()
Screenshot does not match the stored reference.
245 pixels (ratio 0.03) differ.
Reference screenshot:
  tests/__screenshots__/button.test.ts/button-chromium-darwin.png
Actual screenshot:
  tests/.vitest-attachments/button.test.ts/button-chromium-darwin-actual.png
Diff image:
  tests/.vitest-attachments/button.test.ts/button-chromium-darwin-diff.png
```
### Understanding the diff image [​](index.md#understanding-the-diff-image)

*   **Red pixels** are areas that differ between reference and actual
*   **Yellow pixels** are anti-aliasing differences (when anti-alias is not ignored)
*   **Transparent/original** are unchanged areas

TIP

If the diff is mostly red, something's really wrong. If it's speckled with a few red pixels around text, you probably just need to bump your threshold.

## Common Issues and Solutions [​](index.md#common-issues-and-solutions)

### False Positives from Font Rendering [​](index.md#false-positives-from-font-rendering)

Font availability and rendering varies significantly between systems. Some possible solutions might be to:

*   Use web fonts and wait for them to load:
    
    ts
    
    ```
    // wait for fonts to load
    await document.fonts.ready
    // continue with your tests
    ```
    
*   Increase comparison threshold for text-heavy areas:
    
    ts
    
    ```
    await expect(page.getByTestId('article-summary')).toMatchScreenshot({
      comparatorName: 'pixelmatch',
      comparatorOptions: {
        // 10% of the pixels are allowed to change
        allowedMismatchedPixelRatio: 0.1,
      },
    })
    ```
    
*   Use a cloud service or containerized environment for consistent font rendering.
    

### Flaky Tests or Different Screenshot Sizes [​](index.md#flaky-tests-or-different-screenshot-sizes)

If tests pass and fail randomly, or if screenshots have different dimensions between runs:

*   Wait for everything to load, including loading indicators
*   Set explicit viewport sizes: `await page.viewport(1920, 1080)`
*   Check for responsive behavior at viewport boundaries
*   Check for unintended animations or transitions
*   Increase test timeout for large screenshots
*   Use a cloud service or containerized environment

## Visual Regression Testing for Teams [​](index.md#visual-regression-testing-for-teams)

Remember when we mentioned visual tests need a stable environment? Well, here's the thing: your local machine isn't it.

For teams, you've basically got three options:

1.  **Self-hosted runners**, complex to set up, painful to maintain
2.  **GitHub Actions**, free (for open source), works with any provider
3.  **Cloud services**, like [Azure App Testing](https://azure.microsoft.com/en-us/products/app-testing/), built for this exact problem

We'll focus on options 2 and 3 since they're the quickest to get running.

To be upfront, the main trade-offs for each are:

*   **GitHub Actions**: visual tests only run in CI (developers can't run them locally)
*   **Microsoft's service**: works everywhere but costs money and only works with Playwright

The trick here is keeping visual tests separate from your regular tests, otherwise, you'll waste hours checking failing logs of screenshot mismatches.

#### Organizing Your Tests [​](index.md#organizing-your-tests)

First, isolate your visual tests. Stick them in a `visual` folder (or whatever makes sense for your project):

package.json

json
```
{
  "scripts": {
    "test:unit": "vitest --exclude tests/visual/*.test.ts",
    "test:visual": "vitest tests/visual/*.test.ts"
  }
}
```
Now developers can run `npm run test:unit` locally without visual tests getting in the way. Visual tests stay in CI where the environment is consistent.

Alternative

Not a fan of glob patterns? You could also use separate [Test Projects](_guide_projects.md) instead and run them using:

*   `vitest --project unit`
*   `vitest --project visual`

#### CI Setup [​](index.md#ci-setup)

Your CI needs browsers installed. How you do this depends on your provider:

[Playwright](https://npmjs.com/package/playwright) makes this easy. Just pin your version and add this before running tests:

.github/workflows/ci.yml

yaml
```
# ...the rest of the workflow

- name: Install Playwright Browsers
  run: npx --no playwright install --with-deps --only-shell
```
Then run your visual tests:

.github/workflows/ci.yml

yaml
```
# ...the rest of the workflow

# ...browser setup

- name: Visual Regression Testing
  run: npm run test:visual
```
#### The Update Workflow [​](index.md#the-update-workflow)

Here's where it gets interesting. You don't want to update screenshots on every PR automatically _(chaos!)_. Instead, create a manually-triggered workflow that developers can run when they intentionally change the UI.

The workflow below:

*   Only runs on feature branches (never on main)
*   Credits the person who triggered it as co-author
*   Prevents concurrent runs on the same branch
*   Shows a nice summary:
    *   **When screenshots changed**, it lists what changed
        
        ![Action summary after updates](https://vitest.dev/vrt-gha-summary-update-light.png)![Action summary after updates](https://vitest.dev/vrt-gha-summary-update-dark.png)
    *   **When nothing changed**, well, it tells you that too
        
        ![Action summary after no updates](https://vitest.dev/vrt-gha-summary-no-update-light.png)![Action summary after no updates](https://vitest.dev/vrt-gha-summary-no-update-dark.png)

TIP

This is just one approach. Some teams prefer PR comments (`/update-screenshots`), others use labels. Adjust it to fit your workflow!

The important part is having a controlled way to update baselines.

.github/workflows/update-screenshots.yml

yaml
```
name: Update Visual Regression Screenshots
on:
  workflow_dispatch: # manual trigger only

env:
  AUTHOR_NAME: 'github-actions[bot]'
  AUTHOR_EMAIL: '41898282+github-actions[bot]@users.noreply.github.com'
  COMMIT_MESSAGE: |
    test: update visual regression screenshots
    Co-authored-by: ${{ github.actor }} <${{ github.actor_id }}+${{ github.actor }}@users.noreply.github.com>
jobs:
  update-screenshots:
    runs-on: ubuntu-24.04
    # safety first: don't run on main

    if: github.ref_name != github.event.repository.default_branch
    # one at a time per branch

    concurrency:
      group: visual-regression-screenshots@${{ github.ref_name }}
      cancel-in-progress: true
    permissions:
      contents: write # needs to push changes

    steps:
      - name: Checkout selected branch
        uses: actions/checkout@v4
        with:
          ref: ${{ github.ref_name }}
          # use PAT if triggering other workflows

          # token: ${{ secrets.GITHUB_TOKEN }}

      - name: Configure Git
        run: |
          git config --global user.name "${{ env.AUTHOR_NAME }}"
          git config --global user.email "${{ env.AUTHOR_EMAIL }}"
      # your setup steps here (node, pnpm, whatever)

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx --no playwright install --with-deps --only-shell
      # the magic happens below 🪄

      - name: Update Visual Regression Screenshots
        run: npm run test:visual --update
      # check what changed

      - name: Check for changes
        id: check_changes
        run: |
          CHANGED_FILES=$(git status --porcelain | awk '{print $2}')
          if [ "${CHANGED_FILES:+x}" ]; then
            echo "changes=true" >> $GITHUB_OUTPUT
            echo "Changes detected"
            # save the list for the summary

            echo "changed_files<<EOF" >> $GITHUB_OUTPUT
            echo "$CHANGED_FILES" >> $GITHUB_OUTPUT
            echo "EOF" >> $GITHUB_OUTPUT
            echo "changed_count=$(echo "$CHANGED_FILES" | wc -l)" >> $GITHUB_OUTPUT
          else
            echo "changes=false" >> $GITHUB_OUTPUT
            echo "No changes detected"
          fi
      # commit if there are changes

      - name: Commit changes
        if: steps.check_changes.outputs.changes == 'true'
        run: |
          git add -A
          git commit -m "${{ env.COMMIT_MESSAGE }}"
      - name: Push changes
        if: steps.check_changes.outputs.changes == 'true'
        run: git push origin ${{ github.ref_name }}
      # pretty summary for humans

      - name: Summary
        run: |
          if [[ "${{ steps.check_changes.outputs.changes }}" == "true" ]]; then
            echo "### 📸 Visual Regression Screenshots Updated" >> $GITHUB_STEP_SUMMARY

            echo "" >> $GITHUB_STEP_SUMMARY
            echo "Successfully updated **${{ steps.check_changes.outputs.changed_count }}** screenshot(s) on \`${{ github.ref_name }}\`" >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "#### Changed Files:" >> $GITHUB_STEP_SUMMARY

            echo "\`\`\`" >> $GITHUB_STEP_SUMMARY
            echo "${{ steps.check_changes.outputs.changed_files }}" >> $GITHUB_STEP_SUMMARY
            echo "\`\`\`" >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "✅ The updated screenshots have been committed and pushed. Your visual regression baseline is now up to date!" >> $GITHUB_STEP_SUMMARY
          else
            echo "### ℹ️ No Screenshot Updates Required" >> $GITHUB_STEP_SUMMARY

            echo "" >> $GITHUB_STEP_SUMMARY
            echo "The visual regression test command ran successfully but no screenshots needed updating." >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "All screenshots are already up to date! 🎉" >> $GITHUB_STEP_SUMMARY
          fi
```
### So Which One? [​](index.md#so-which-one)

Both approaches work. The real question is what pain points matter most to your team.

If you're already deep in the GitHub ecosystem, GitHub Actions is hard to beat. Free for open source, works with any browser provider, and you control everything.

The downside? That "works on my machine" conversation when someone generates screenshots locally and they don't match CI expectations anymore.

A cloud service makes sense if developers need to run visual tests locally.

Some teams have designers checking their work or developers who prefer catching issues before pushing. It allows skipping the push-wait-check-fix-push cycle.

Still on the fence? Start with GitHub Actions. You can always add a cloud service later if local testing becomes a pain point.

#### _guide_browser_why.md

> Source: https://vitest.dev/guide/browser/why
> Scraped: 12/20/2025, 6:47:07 PM

## Why Browser Mode [​](index.md#why-browser-mode)

## Motivation [​](index.md#motivation)

We developed the Vitest browser mode feature to help improve testing workflows and achieve more accurate and reliable test results. This addition to our testing API allows developers to run tests in a native browser environment. In this section, we'll explore the motivations behind this feature and its benefits for testing.

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

#### _guide_features.md

> Source: https://vitest.dev/guide/features
> Scraped: 12/20/2025, 6:47:07 PM

## Features [​](index.md#features)

* [Vite](https://vitejs.dev/)'s config, transformers, resolvers, and plugins
    
*   Use the same setup from your app to run the tests!
    
*   Smart & instant watch mode, like HMR for tests!
    
*   Component testing for Vue, React, Svelte, Lit, Marko and more
    
*   Out-of-the-box TypeScript / JSX support
    
*   ESM first, top level await
    

*   Filtering, timeouts, concurrent for suite and tests
    

* [Browser Mode](_guide_browser_.md) for running component tests in the browser
    

*   Sharding Support
    
*   Reporting Uncaught Errors
    

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

By default Vitest runs test files in [multiple processes](_guide_parallelism.md) using [`node:child_process`](https://nodejs.org/api/child_process.html), allowing tests to run simultaneously. If you want to speed up your test suite even further, consider enabling `--pool=threads` to run tests using [`node:worker_threads`](https://nodejs.org/api/worker_threads.html) (beware that some packages might not work with this setup). To run tests in a single thread or process, see [`fileParallelism`](_config_.md#fileparallelism).

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
  expectTypeOf(mount).parameter(0).toExtend<{ name: string }>()
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
## Unhandled Errors [​](index.md#unhandled-errors)

By default, Vitest catches and reports all [unhandled rejections](https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event), [uncaught exceptions](https://nodejs.org/api/process.html#event-uncaughtexception) (in Node.js) and [error](https://developer.mozilla.org/en-US/docs/Web/API/Window/error_event) events (in the [browser](_guide_browser_.md)).

You can disable this behaviour by catching them manually. Vitest assumes the callback is handled by you and won't report the error.

setup.node.jssetup.browser.js

ts
```
// in Node.js
process.on('unhandledRejection', () => {
  // your own handler
})
process.on('uncaughtException', () => {
  // your own handler
})
```
ts
```
// in the browser
window.addEventListener('error', () => {
  // your own handler
})
window.addEventListener('unhandledrejection', () => {
  // your own handler
})
```
Alternatively, you can also ignore reported errors with a [`dangerouslyIgnoreUnhandledErrors`](_config_.md#dangerouslyignoreunhandlederrors) option. Vitest will still report them, but they won't affect the test result (exit code won't be changed).

If you need to test that error was not caught, you can create a test that looks like this:

ts
```
test('my function throws uncaught error', async ({ onTestFinished }) => {
  const unhandledRejectionListener = vi.fn()
  process.on('unhandledRejection', unhandledRejectionListener)
  onTestFinished(() => {
    process.off('unhandledRejection', unhandledRejectionListener)
  })
  callMyFunctionThatRejectsError()
  await expect.poll(unhandledRejectionListener).toHaveBeenCalled()
})
```

#### _guide_why.md

> Source: https://vitest.dev/guide/why
> Scraped: 12/20/2025, 6:47:07 PM

## Why Vitest [​](index.md#why-vitest)

## The Need for a Vite Native Test Runner [​](index.md#the-need-for-a-vite-native-test-runner)

Vite's out-of-the-box support for common web patterns, features like glob imports and SSR primitives, and its many plugins and integrations are fostering a vibrant ecosystem. Its dev and build story are key to its success. For docs, there are several SSG-based alternatives powered by Vite. Vite's Unit Testing story hasn't been clear though. Existing options like [Jest](https://jestjs.io/) were created in a different context. There is a lot of duplication between Jest and Vite, forcing users to configure two different pipelines.

Using Vite dev server to transform your files during testing, enables the creation of a simple runner that doesn't need to deal with the complexity of transforming source files and can solely focus on providing the best DX during testing. A test runner that uses the same configuration of your App (through `vite.config.js`), sharing a common transformation pipeline during dev, build, and test time. That is extensible with the same plugin API that lets you and the maintainers of your tools provide first-class integration with Vite. A tool that is built with Vite in mind from the start, taking advantage of its improvements in DX, like its instant Hot Module Reload (HMR). This is Vitest, a next generation testing framework powered by Vite.

Given Jest's massive adoption, Vitest provides a compatible API that allows you to use it as a drop-in replacement in most projects. It also includes the most common features required when setting up your unit tests (mocking, snapshots, coverage). Vitest cares a lot about performance and uses Worker threads to run as much as possible in parallel. Some ports have seen test running an order of magnitude faster. Watch mode is enabled by default, aligning itself with the way Vite pushes for a dev first experience. Even with all these improvements in DX, Vitest stays lightweight by carefully choosing its dependencies (or directly inlining needed pieces).

**Vitest aims to position itself as the Test Runner of choice for Vite projects, and as a solid alternative even for projects not using Vite.**

Continue reading in the [Getting Started Guide](_guide_.md)

## How is Vitest Different from X? [​](index.md#how-is-vitest-different-from-x)

You can check out the [Comparisons](_guide_comparisons.md) section for more details on how Vitest differs from other similar tools.

