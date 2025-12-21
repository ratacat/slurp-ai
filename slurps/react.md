---
title: "react Documentation"
source: "https://react.dev/reference"
scraped: "2025-12-21T05:41:11.193Z"
tokens: 226821
---
# react Documentation

> Source: https://react.dev/reference
> Generated: 12/20/2025, 10:41:11 PM

### react

#### _reference.md

> Source: https://react.dev/reference
> Scraped: 12/20/2025, 10:40:48 PM

This section provides detailed reference documentation for working with React. For an introduction to React, please visit the [Learn](_learn.md) section.

The React reference documentation is broken down into functional subsections:

## React

Programmatic React features:

* [Hooks](_reference_react_hooks.md) - Use different React features from your components.
* [Components](_reference_react_components.md) - Built-in components that you can use in your JSX.
* [APIs](_reference_react_apis.md) - APIs that are useful for defining components.
* [Directives](_reference_rsc_directives.md) - Provide instructions to bundlers compatible with React Server Components.

## React DOM

React DOM contains features that are only supported for web applications (which run in the browser DOM environment). This section is broken into the following:

* [Hooks](_reference_react-dom_hooks.md) - Hooks for web applications which run in the browser DOM environment.
* [Components](_reference_react-dom_components.md) - React supports all of the browser built-in HTML and SVG components.
* [APIs](_reference_react-dom.md) - The `react-dom` package contains methods supported only in web applications.
* [Client APIs](_reference_react-dom_client.md) - The `react-dom/client` APIs let you render React components on the client (in the browser).
* [Server APIs](_reference_react-dom_server.md) - The `react-dom/server` APIs let you render React components to HTML on the server.
* [Static APIs](_reference_react-dom_static.md) - The `react-dom/static` APIs let you generate static HTML for React components.

## React Compiler

The React Compiler is a build-time optimization tool that automatically memoizes your React components and values:

* [Configuration](_reference_react-compiler_configuration.md) - Configuration options for React Compiler.
* [Directives](_reference_react-compiler_directives.md) - Function-level directives to control compilation.
* [Compiling Libraries](_reference_react-compiler_compiling-libraries.md) - Guide for shipping pre-compiled library code.

## ESLint Plugin React Hooks

The [ESLint plugin for React Hooks](_reference_eslint-plugin-react-hooks.md) helps enforce the Rules of React:

* [Lints](_reference_eslint-plugin-react-hooks.md) - Detailed documentation for each lint with examples.

## Rules of React

React has idioms — or rules — for how to express patterns in a way that is easy to understand and yields high-quality applications:

* [Components and Hooks must be pure](_reference_rules_components-and-hooks-must-be-pure.md) – Purity makes your code easier to understand, debug, and allows React to automatically optimize your components and hooks correctly.
* [React calls Components and Hooks](_reference_rules_react-calls-components-and-hooks.md) – React is responsible for rendering components and hooks when necessary to optimize the user experience.
* [Rules of Hooks](_reference_rules_rules-of-hooks.md) – Hooks are defined using JavaScript functions, but they represent a special type of reusable UI logic with restrictions on where they can be called.

## Legacy APIs

* [Legacy APIs](_reference_react_legacy.md) - Exported from the `react` package, but not recommended for use in newly written code.

#### _reference_dev-tools_react-performance-tracks.md

> Source: https://react.dev/reference/dev-tools/react-performance-tracks
> Scraped: 12/20/2025, 10:41:10 PM

React Performance tracks are specialized custom entries that appear on the Performance panel’s timeline in your browser developer tools.

These tracks are designed to provide developers with comprehensive insights into their React application’s performance by visualizing React-specific events and metrics alongside other critical data sources such as network requests, JavaScript execution, and event loop activity, all synchronized on a unified timeline within the Performance panel for a complete understanding of application behavior.

![React Performance Tracks](https://react.dev/images/docs/performance-tracks/overview.png)![React Performance Tracks](https://react.dev/images/docs/performance-tracks/overview.dark.png)

* [Usage](_reference_dev-tools_react-performance-tracks.md#usage)
    * [Using profiling builds](_reference_dev-tools_react-performance-tracks.md#using-profiling-builds)
* [Tracks](_reference_dev-tools_react-performance-tracks.md#tracks)
    * [Scheduler](_reference_dev-tools_react-performance-tracks.md#scheduler)
    * [Components](_reference_dev-tools_react-performance-tracks.md#components)
    * [Server](_reference_dev-tools_react-performance-tracks.md#server)

* * *

## Usage

React Performance tracks are only available in development and profiling builds of React:

*   **Development**: enabled by default.
*   **Profiling**: Only Scheduler tracks are enabled by default. The Components track only lists Components that are in subtrees wrapped with [`<Profiler>`](_reference_react_Profiler.md). If you have [React Developer Tools extension](_learn_react-developer-tools.md) enabled, all Components are included in the Components track even if they’re not wrapped in `<Profiler>`. Server tracks are not available in profiling builds.

If enabled, tracks should appear automatically in the traces you record with the Performance panel of browsers that provide [extensibility APIs](https://developer.chrome.com/docs/devtools/performance/extension).

### Pitfall

The profiling instrumentation that powers React Performance tracks adds some additional overhead, so it is disabled in production builds by default. Server Components and Server Requests tracks are only available in development builds.

### Using profiling builds

In addition to production and development builds, React also includes a special profiling build. To use profiling builds, you have to use `react-dom/profiling` instead of `react-dom/client`. We recommend that you alias `react-dom/client` to `react-dom/profiling` at build time via bundler aliases instead of manually updating each `react-dom/client` import. Your framework might have built-in support for enabling React’s profiling build.

* * *

## Tracks

### Scheduler

The Scheduler is an internal React concept used for managing tasks with different priorities. This track consists of 4 subtracks, each representing work of a specific priority:

*   **Blocking** - The synchronous updates, which could’ve been initiated by user interactions.
*   **Transition** - Non-blocking work that happens in the background, usually initiated via [`startTransition`](_reference_react_startTransition.md).
*   **Suspense** - Work related to Suspense boundaries, such as displaying fallbacks or revealing content.
*   **Idle** - The lowest priority work that is done when there are no other tasks with higher priority.

![Scheduler track](https://react.dev/images/docs/performance-tracks/scheduler.png)![Scheduler track](https://react.dev/images/docs/performance-tracks/scheduler.dark.png)

#### Renders

Every render pass consists of multiple phases that you can see on a timeline:

*   **Update** - this is what caused a new render pass.
*   **Render** - React renders the updated subtree by calling render functions of components. You can see the rendered components subtree on [Components track](_reference_dev-tools_react-performance-tracks.md#components), which follows the same color scheme.
*   **Commit** - After rendering components, React will submit the changes to the DOM and run layout effects, like [`useLayoutEffect`](_reference_react_useLayoutEffect.md).
*   **Remaining Effects** - React runs passive effects of a rendered subtree. This usually happens after the paint, and this is when React runs hooks like [`useEffect`](_reference_react_useEffect.md). One known exception is user interactions, like clicks, or other discrete events. In this scenario, this phase could run before the paint.

![Scheduler track: updates](https://react.dev/images/docs/performance-tracks/scheduler-update.png)![Scheduler track: updates](https://react.dev/images/docs/performance-tracks/scheduler-update.dark.png)

[Learn more about renders and commits](_learn_render-and-commit.md).

#### Cascading updates

Cascading updates is one of the patterns for performance regressions. If an update was scheduled during a render pass, React could discard completed work and start a new pass.

In development builds, React can show you which Component scheduled a new update. This includes both general updates and cascading ones. You can see the enhanced stack trace by clicking on the “Cascading update” entry, which should also display the name of the method that scheduled an update.

![Scheduler track: cascading updates](https://react.dev/images/docs/performance-tracks/scheduler-cascading-update.png)![Scheduler track: cascading updates](https://react.dev/images/docs/performance-tracks/scheduler-cascading-update.dark.png)

[Learn more about Effects](_learn_you-might-not-need-an-effect.md).

### Components

The Components track visualizes the durations of React components. They are displayed as a flamegraph, where each entry represents the duration of the corresponding component render and all its descendant children components.

![Components track: render durations](https://react.dev/images/docs/performance-tracks/components-render.png)![Components track: render durations](https://react.dev/images/docs/performance-tracks/components-render.dark.png)

Similar to render durations, effect durations are also represented as a flamegraph, but with a different color scheme that aligns with the corresponding phase on the Scheduler track.

![Components track: effects durations](https://react.dev/images/docs/performance-tracks/components-effects.png)![Components track: effects durations](https://react.dev/images/docs/performance-tracks/components-effects.dark.png)

### Note

Unlike renders, not all effects are shown on the Components track by default.

To maintain performance and prevent UI clutter, React will only display those effects, which had a duration of 0.05ms or longer, or triggered an update.

Additional events may be displayed during the render and effects phases:

*   Mount - A corresponding subtree of component renders or effects was mounted.
*   Unmount - A corresponding subtree of component renders or effects was unmounted.
*   Reconnect - Similar to Mount, but limited to cases when [`<Activity>`](_reference_react_Activity.md) is used.
*   Disconnect - Similar to Unmount, but limited to cases when [`<Activity>`](_reference_react_Activity.md) is used.

#### Changed props

In development builds, when you click on a component render entry, you can inspect potential changes in props. You can use this information to identify unnecessary renders.

![Components track: changed props](https://react.dev/images/docs/performance-tracks/changed-props.png)![Components track: changed props](https://react.dev/images/docs/performance-tracks/changed-props.dark.png)

### Server

![React Server Performance Tracks](https://react.dev/images/docs/performance-tracks/server-overview.png)![React Server Performance Tracks](https://react.dev/images/docs/performance-tracks/server-overview.dark.png)

#### Server Requests

The Server Requests track visualized all Promises that eventually end up in a React Server Component. This includes any `async` operations like calling `fetch` or async Node.js file operations.

React will try to combine Promises that are started from inside third-party code into a single span representing the the duration of the entire operation blocking 1st party code. For example, a third party library method called `getUser` that calls `fetch` internally multiple times will be represented as a single span called `getUser`, instead of showing multiple `fetch` spans.

Clicking on spans will show you a stack trace of where the Promise was created as well as a view of the value that the Promise resolved to, if available.

Rejected Promises are displayed as red with their rejected value.

#### Server Components

The Server Components tracks visualize the durations of React Server Components Promises they awaited. Timings are displayed as a flamegraph, where each entry represents the duration of the corresponding component render and all its descendant children components.

If you await a Promise, React will display duration of that Promise. To see all I/O operations, use the Server Requests track.

Different colors are used to indicate the duration of the component render. The darker the color, the longer the duration.

The Server Components track group will always contain a “Primary” track. If React is able to render Server Components concurrently, it will display addititional “Parallel” tracks. If more than 8 Server Components are rendered concurrently, React will associate them with the last “Parallel” track instead of adding more tracks.

#### _reference_eslint-plugin-react-hooks.md

> Source: https://react.dev/reference/eslint-plugin-react-hooks
> Scraped: 12/20/2025, 10:41:09 PM

This plugin helps you catch violations of React’s rules at build time, ensuring your components and hooks follow React’s rules for correctness and performance. The lints cover both fundamental React patterns (exhaustive-deps and rules-of-hooks) and issues flagged by React Compiler. React Compiler diagnostics are automatically surfaced by this ESLint plugin, and can be used even if your app hasn’t adopted the compiler yet.

### Note

When the compiler reports a diagnostic, it means that the compiler was able to statically detect a pattern that is not supported or breaks the Rules of React. When it detects this, it **automatically** skips over those components and hooks, while keeping the rest of your app compiled. This ensures optimal coverage of safe optimizations that won’t break your app.

What this means for linting, is that you don’t need to fix all violations immediately. Address them at your own pace to gradually increase the number of optimized components.

#### _reference_eslint-plugin-react-hooks_lints_component-hook-factories.md

> Source: https://react.dev/reference/eslint-plugin-react-hooks/lints/component-hook-factories
> Scraped: 12/20/2025, 10:41:08 PM

Validates against higher order functions defining nested components or hooks. Components and hooks should be defined at the module level.

## Rule Details

Defining components or hooks inside other functions creates new instances on every call. React treats each as a completely different component, destroying and recreating the entire component tree, losing all state, and causing performance problems.

### Invalid

Examples of incorrect code for this rule:
```
// ❌ Factory function creating components

function createComponent(defaultValue) {

return function Component() {

// ...

};

}

// ❌ Component defined inside component

function Parent() {

function Child() {

// ...

}

return <Child />;

}

// ❌ Hook factory function

function createCustomHook(endpoint) {

return function useData() {

// ...

};

}
```
### Valid

Examples of correct code for this rule:
```
// ✅ Component defined at module level

function Component({ defaultValue }) {

// ...

}

// ✅ Custom hook at module level

function useData(endpoint) {

// ...

}
```
## Troubleshooting

### I need dynamic component behavior

You might think you need a factory to create customized components:
```
// ❌ Wrong: Factory pattern

function makeButton(color) {

return function Button({children}) {

return (

<button style={{backgroundColor: color}}>

{children}

</button>

);

};

}

const RedButton = makeButton('red');

const BlueButton = makeButton('blue');
```
Pass [JSX as children](_learn_passing-props-to-a-component.md#passing-jsx-as-children) instead:
```
// ✅ Better: Pass JSX as children

function Button({color, children}) {

return (

<button style={{backgroundColor: color}}>

{children}

</button>

);

}

function App() {

return (

<>

<Button color="red">Red</Button>

<Button color="blue">Blue</Button>

</>

);

}
```

#### _reference_eslint-plugin-react-hooks_lints_config.md

> Source: https://react.dev/reference/eslint-plugin-react-hooks/lints/config
> Scraped: 12/20/2025, 10:41:09 PM

Validates the compiler [configuration options](_reference_react-compiler_configuration.md).

## Rule Details

React Compiler accepts various [configuration options](_reference_react-compiler_configuration.md) to control its behavior. This rule validates that your configuration uses correct option names and value types, preventing silent failures from typos or incorrect settings.

### Invalid

Examples of incorrect code for this rule:
```
// ❌ Unknown option name

module.exports = {

plugins: [

['babel-plugin-react-compiler', {

compileMode: 'all' // Typo: should be compilationMode

}]

]

};

// ❌ Invalid option value

module.exports = {

plugins: [

['babel-plugin-react-compiler', {

compilationMode: 'everything' // Invalid: use 'all' or 'infer'

}]

]

};
```
### Valid

Examples of correct code for this rule:
```
// ✅ Valid compiler configuration

module.exports = {

plugins: [

['babel-plugin-react-compiler', {

compilationMode: 'infer',

panicThreshold: 'critical_errors'

}]

]

};
```
## Troubleshooting

### Configuration not working as expected

Your compiler configuration might have typos or incorrect values:
```
// ❌ Wrong: Common configuration mistakes

module.exports = {

plugins: [

['babel-plugin-react-compiler', {

// Typo in option name

compilationMod: 'all',

// Wrong value type

panicThreshold: true,

// Unknown option

optimizationLevel: 'max'

}]

]

};
```
Check the [configuration documentation](_reference_react-compiler_configuration.md) for valid options:
```
// ✅ Better: Valid configuration

module.exports = {

plugins: [

['babel-plugin-react-compiler', {

compilationMode: 'all', // or 'infer'

panicThreshold: 'none', // or 'critical_errors', 'all_errors'

// Only use documented options

}]

]

};
```

#### _reference_eslint-plugin-react-hooks_lints_error-boundaries.md

> Source: https://react.dev/reference/eslint-plugin-react-hooks/lints/error-boundaries
> Scraped: 12/20/2025, 10:41:09 PM

Validates usage of Error Boundaries instead of try/catch for errors in child components.

## Rule Details

Try/catch blocks can’t catch errors that happen during React’s rendering process. Errors thrown in rendering methods or hooks bubble up through the component tree. Only [Error Boundaries](_reference_react_Component.md#catching-rendering-errors-with-an-error-boundary) can catch these errors.

### Invalid

Examples of incorrect code for this rule:
```
// ❌ Try/catch won't catch render errors

function Parent() {

try {

return <ChildComponent />; // If this throws, catch won't help

} catch (error) {

return Error occurred;

}

}
```
### Valid

Examples of correct code for this rule:
```
// ✅ Using error boundary

function Parent() {

return (

<ErrorBoundary>

<ChildComponent />

</ErrorBoundary>

);

}
```
## Troubleshooting

### Why is the linter telling me not to wrap `use` in `try`/`catch`?

The `use` hook doesn’t throw errors in the traditional sense, it suspends component execution. When `use` encounters a pending promise, it suspends the component and lets React show a fallback. Only Suspense and Error Boundaries can handle these cases. The linter warns against `try`/`catch` around `use` to prevent confusion as the `catch` block would never run.
```
// ❌ Try/catch around `use` hook

function Component({promise}) {

try {

const data = use(promise); // Won't catch - `use` suspends, not throws

return {data};

} catch (error) {

return Failed to load; // Unreachable

}

}

// ✅ Error boundary catches `use` errors

function App() {

return (

<ErrorBoundary fallback={Failed to load}>

<Suspense fallback={Loading...}>

<DataComponent promise={fetchData()} />

</Suspense>

</ErrorBoundary>

);

}
```

#### _reference_eslint-plugin-react-hooks_lints_exhaustive-deps.md

> Source: https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps
> Scraped: 12/20/2025, 10:41:09 PM

Validates that dependency arrays for React hooks contain all necessary dependencies.

## Rule Details

React hooks like `useEffect`, `useMemo`, and `useCallback` accept dependency arrays. When a value referenced inside these hooks isn’t included in the dependency array, React won’t re-run the effect or recalculate the value when that dependency changes. This causes stale closures where the hook uses outdated values.

## Common Violations

This error often happens when you try to “trick” React about dependencies to control when an effect runs. Effects should synchronize your component with external systems. The dependency array tells React which values the effect uses, so React knows when to re-synchronize.

If you find yourself fighting with the linter, you likely need to restructure your code. See [Removing Effect Dependencies](_learn_removing-effect-dependencies.md) to learn how.

### Invalid

Examples of incorrect code for this rule:
```
// ❌ Missing dependency

useEffect(() => {

console.log(count);

}, []); // Missing 'count'

// ❌ Missing prop

useEffect(() => {

fetchUser(userId);

}, []); // Missing 'userId'

// ❌ Incomplete dependencies

useMemo(() => {

return items.sort(sortOrder);

}, [items]); // Missing 'sortOrder'
```
### Valid

Examples of correct code for this rule:
```
// ✅ All dependencies included

useEffect(() => {

console.log(count);

}, [count]);

// ✅ All dependencies included

useEffect(() => {

fetchUser(userId);

}, [userId]);
```
## Troubleshooting

### Adding a function dependency causes infinite loops

You have an effect, but you’re creating a new function on every render:
```
// ❌ Causes infinite loop

const logItems = () => {

console.log(items);

};

useEffect(() => {

logItems();

}, [logItems]); // Infinite loop!
```
In most cases, you don’t need the effect. Call the function where the action happens instead:
```
// ✅ Call it from the event handler

const logItems = () => {

console.log(items);

};

return <button onClick={logItems}>Log</button>;

// ✅ Or derive during render if there's no side effect

items.forEach(item => {

console.log(item);

});
```
If you genuinely need the effect (for example, to subscribe to something external), make the dependency stable:
```
// ✅ useCallback keeps the function reference stable

const logItems = useCallback(() => {

console.log(items);

}, [items]);

useEffect(() => {

logItems();

}, [logItems]);

// ✅ Or move the logic straight into the effect

useEffect(() => {

console.log(items);

}, [items]);
```
### Running an effect only once

You want to run an effect once on mount, but the linter complains about missing dependencies:
```
// ❌ Missing dependency

useEffect(() => {

sendAnalytics(userId);

}, []); // Missing 'userId'
```
Either include the dependency (recommended) or use a ref if you truly need to run once:
```
// ✅ Include dependency

useEffect(() => {

sendAnalytics(userId);

}, [userId]);

// ✅ Or use a ref guard inside an effect

const sent = useRef(false);

useEffect(() => {

if (sent.current) {

return;

}

sent.current = true;

sendAnalytics(userId);

}, [userId]);
```
## Options

You can configure custom effect hooks using shared ESLint settings (available in `eslint-plugin-react-hooks` 6.1.1 and later):
```
{

"settings": {

"react-hooks": {

"additionalEffectHooks": "(useMyEffect|useCustomEffect)"

}

}

}
```
*   `additionalEffectHooks`: Regex pattern matching custom hooks that should be checked for exhaustive dependencies. This configuration is shared across all `react-hooks` rules.

For backward compatibility, this rule also accepts a rule-level option:
```
{

"rules": {

"react-hooks/exhaustive-deps": ["warn", {

"additionalHooks": "(useMyCustomHook|useAnotherHook)"

}]

}

}
```
*   `additionalHooks`: Regex for hooks that should be checked for exhaustive dependencies. **Note:** If this rule-level option is specified, it takes precedence over the shared `settings` configuration.

#### _reference_eslint-plugin-react-hooks_lints_gating.md

> Source: https://react.dev/reference/eslint-plugin-react-hooks/lints/gating
> Scraped: 12/20/2025, 10:41:09 PM

Validates configuration of [gating mode](_reference_react-compiler_gating.md).

## Rule Details

Gating mode lets you gradually adopt React Compiler by marking specific components for optimization. This rule ensures your gating configuration is valid so the compiler knows which components to process.

### Invalid

Examples of incorrect code for this rule:
```
// ❌ Missing required fields

module.exports = {

plugins: [

['babel-plugin-react-compiler', {

gating: {

importSpecifierName: '__experimental_useCompiler'

// Missing 'source' field

}

}]

]

};

// ❌ Invalid gating type

module.exports = {

plugins: [

['babel-plugin-react-compiler', {

gating: '__experimental_useCompiler' // Should be object

}]

]

};
```
### Valid

Examples of correct code for this rule:
```
// ✅ Complete gating configuration

module.exports = {

plugins: [

['babel-plugin-react-compiler', {

gating: {

importSpecifierName: 'isCompilerEnabled', // exported function name

source: 'featureFlags' // module name

}

}]

]

};

// featureFlags.js

export function isCompilerEnabled() {

// ...

}

// ✅ No gating (compile everything)

module.exports = {

plugins: [

['babel-plugin-react-compiler', {

// No gating field - compiles all components

}]

]

};
```

#### _reference_eslint-plugin-react-hooks_lints_globals.md

> Source: https://react.dev/reference/eslint-plugin-react-hooks/lints/globals
> Scraped: 12/20/2025, 10:41:09 PM

Validates against assignment/mutation of globals during render, part of ensuring that [side effects must run outside of render](_reference_rules_components-and-hooks-must-be-pure.md#side-effects-must-run-outside-of-render).

## Rule Details

Global variables exist outside React’s control. When you modify them during render, you break React’s assumption that rendering is pure. This can cause components to behave differently in development vs production, break Fast Refresh, and make your app impossible to optimize with features like React Compiler.

### Invalid

Examples of incorrect code for this rule:
```
// ❌ Global counter

let renderCount = 0;

function Component() {

renderCount++; // Mutating global

return Count: {renderCount};

}

// ❌ Modifying window properties

function Component({userId}) {

window.currentUser = userId; // Global mutation

return User: {userId};

}

// ❌ Global array push

const events = [];

function Component({event}) {

events.push(event); // Mutating global array

return Events: {events.length};

}

// ❌ Cache manipulation

const cache = {};

function Component({id}) {

if (!cache[id]) {

cache[id] = fetchData(id); // Modifying cache during render

}

return {cache[id]};

}
```
### Valid

Examples of correct code for this rule:
```
// ✅ Use state for counters

function Component() {

const [clickCount, setClickCount] = useState(0);

const handleClick = () => {

setClickCount(c => c + 1);

};

return (

<button onClick={handleClick}>

      Clicked: {clickCount} times

</button>

);

}

// ✅ Use context for global values

function Component() {

const user = useContext(UserContext);

return User: {user.id};

}

// ✅ Synchronize external state with React

function Component({title}) {

useEffect(() => {

document.title = title; // OK in effect

}, [title]);

return Page: {title};

}
```

#### _reference_eslint-plugin-react-hooks_lints_immutability.md

> Source: https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability
> Scraped: 12/20/2025, 10:41:10 PM

A component’s props and state are immutable snapshots. Never mutate them directly. Instead, pass new props down, and use the setter function from `useState`.
```
// ❌ Array push mutation

function Component() {

const [items, setItems] = useState([1, 2, 3]);

const addItem = () => {

items.push(4); // Mutating!

setItems(items); // Same reference, no re-render

};

}

// ❌ Object property assignment

function Component() {

const [user, setUser] = useState({name: 'Alice'});

const updateName = () => {

user.name = 'Bob'; // Mutating!

setUser(user); // Same reference

};

}

// ❌ Sort without spreading

function Component() {

const [items, setItems] = useState([3, 1, 2]);

const sortItems = () => {

setItems(items.sort()); // sort mutates!

};

}
```

#### _reference_eslint-plugin-react-hooks_lints_rules-of-hooks.md

> Source: https://react.dev/reference/eslint-plugin-react-hooks/lints/rules-of-hooks
> Scraped: 12/20/2025, 10:41:09 PM

Validates that components and hooks follow the [Rules of Hooks](_reference_rules_rules-of-hooks.md).

## Rule Details

React relies on the order in which hooks are called to correctly preserve state between renders. Each time your component renders, React expects the exact same hooks to be called in the exact same order. When hooks are called conditionally or in loops, React loses track of which state corresponds to which hook call, leading to bugs like state mismatches and “Rendered fewer/more hooks than expected” errors.

## Common Violations

These patterns violate the Rules of Hooks:

*   **Hooks in conditions** (`if`/`else`, ternary, `&&`/`||`)
*   **Hooks in loops** (`for`, `while`, `do-while`)
*   **Hooks after early returns**   **Hooks in callbacks/event handlers**   **Hooks in async functions**   **Hooks in class methods**   **Hooks at module level**

### Note

### `use` hook

The `use` hook is different from other React hooks. You can call it conditionally and in loops:
```
// ✅ `use` can be conditional

if (shouldFetch) {

const data = use(fetchPromise);

}

// ✅ `use` can be in loops

for (const promise of promises) {

results.push(use(promise));

}
```
However, `use` still has restrictions:

*   Can’t be wrapped in try/catch
*   Must be called inside a component or hook

Learn more: [`use` API Reference](_reference_react_use.md)

### Invalid

Examples of incorrect code for this rule:
```
// ❌ Hook in condition

if (isLoggedIn) {

const [user, setUser] = useState(null);

}

// ❌ Hook after early return

if (!data) return <Loading />;

const [processed, setProcessed] = useState(data);

// ❌ Hook in callback

<button onClick={() => {

const [clicked, setClicked] = useState(false);

}}/>

// ❌ `use` in try/catch

try {

const data = use(promise);

} catch (e) {

// error handling

}

// ❌ Hook at module level

const globalState = useState(0); // Outside component
```
### Valid

Examples of correct code for this rule:
```
function Component({ isSpecial, shouldFetch, fetchPromise }) {

// ✅ Hooks at top level

const [count, setCount] = useState(0);

const [name, setName] = useState('');

if (!isSpecial) {

return null;

}

if (shouldFetch) {

// ✅ `use` can be conditional

const data = use(fetchPromise);

return {data};

}

return {name}: {count};

}
```
## Troubleshooting

### I want to fetch data based on some condition

You’re trying to conditionally call useEffect:
```
// ❌ Conditional hook

if (isLoggedIn) {

useEffect(() => {

fetchUserData();

}, []);

}
```
Call the hook unconditionally, check condition inside:
```
// ✅ Condition inside hook

useEffect(() => {

if (isLoggedIn) {

fetchUserData();

}

}, [isLoggedIn]);
```
### Note

There are better ways to fetch data rather than in a useEffect. Consider using TanStack Query, useSWR, or React Router 6.4+ for data fetching. These solutions handle deduplicating requests, caching responses, and avoiding network waterfalls.

Learn more: [Fetching Data](_learn_synchronizing-with-effects.md#fetching-data)

### I need different state for different scenarios

You’re trying to conditionally initialize state:
```
// ❌ Conditional state

if (userType === 'admin') {

const [permissions, setPermissions] = useState(adminPerms);

} else {

const [permissions, setPermissions] = useState(userPerms);

}
```
Always call useState, conditionally set the initial value:
```
// ✅ Conditional initial value

const [permissions, setPermissions] = useState(

userType === 'admin' ? adminPerms : userPerms

);
```
## Options

You can configure custom effect hooks using shared ESLint settings (available in `eslint-plugin-react-hooks` 6.1.1 and later):
```
{

"settings": {

"react-hooks": {

"additionalEffectHooks": "(useMyEffect|useCustomEffect)"

}

}

}
```
*   `additionalEffectHooks`: Regex pattern matching custom hooks that should be treated as effects. This allows `useEffectEvent` and similar event functions to be called from your custom effect hooks.

This shared configuration is used by both `rules-of-hooks` and `exhaustive-deps` rules, ensuring consistent behavior across all hook-related linting.

#### _reference_react-compiler_compilationMode.md

> Source: https://react.dev/reference/react-compiler/compilationMode
> Scraped: 12/20/2025, 10:41:09 PM

The `compilationMode` option controls how the React Compiler selects which functions to compile.
```
{

  compilationMode: 'infer' // or 'annotation', 'syntax', 'all'

}
```
* [Reference](_reference_react-compiler_compilationMode.md#reference)
    * [`compilationMode`](_reference_react-compiler_compilationMode.md#compilationmode)
* [Usage](_reference_react-compiler_compilationMode.md#usage)
    * [Default inference mode](_reference_react-compiler_compilationMode.md#default-inference-mode)
    * [Incremental adoption with annotation mode](_reference_react-compiler_compilationMode.md#incremental-adoption)
    * [Using Flow syntax mode](_reference_react-compiler_compilationMode.md#flow-syntax-mode)
    * [Opting out specific functions](_reference_react-compiler_compilationMode.md#opting-out)
* [Troubleshooting](_reference_react-compiler_compilationMode.md#troubleshooting)
    * [Component not being compiled in infer mode](_reference_react-compiler_compilationMode.md#component-not-compiled-infer)

* * *

## Reference

### `compilationMode`

Controls the strategy for determining which functions the React Compiler will optimize.

#### Type
```
'infer' | 'syntax' | 'annotation' | 'all'
```
#### Default value

`'infer'`

#### Options

*   **`'infer'`** (default): The compiler uses intelligent heuristics to identify React components and hooks:

    *   Functions explicitly annotated with `"use memo"` directive
    *   Functions that are named like components (PascalCase) or hooks (`use` prefix) AND create JSX and/or call other hooks
*   **`'annotation'`**: Only compile functions explicitly marked with the `"use memo"` directive. Ideal for incremental adoption.

*   **`'syntax'`**: Only compile components and hooks that use Flow’s [component](https://flow.org/en/docs/react/component-syntax/) and [hook](https://flow.org/en/docs/react/hook-syntax/) syntax.

*   **`'all'`**: Compile all top-level functions. Not recommended as it may compile non-React functions.

#### Caveats

*   The `'infer'` mode requires functions to follow React naming conventions to be detected
*   Using `'all'` mode may negatively impact performance by compiling utility functions
*   The `'syntax'` mode requires Flow and won’t work with TypeScript
*   Regardless of mode, functions with `"use no memo"` directive are always skipped

* * *

## Usage

### Default inference mode

The default `'infer'` mode works well for most codebases that follow React conventions:
```
{

  compilationMode: 'infer'

}
```
With this mode, these functions will be compiled:
```
// ✅ Compiled: Named like a component + returns JSX

function Button(props) {

return <button>{props.label}</button>;

}

// ✅ Compiled: Named like a hook + calls hooks

function useCounter() {

const [count, setCount] = useState(0);

return [count, setCount];

}

// ✅ Compiled: Explicit directive

function expensiveCalculation(data) {

"use memo";

return data.reduce(/* ... */);

}

// ❌ Not compiled: Not a component/hook pattern

function calculateTotal(items) {

return items.reduce((a, b) => a + b, 0);

}
```
### Incremental adoption with annotation mode

For gradual migration, use `'annotation'` mode to only compile marked functions:
```
{

  compilationMode: 'annotation'

}
```
Then explicitly mark functions to compile:
```
// Only this function will be compiled

function ExpensiveList(props) {

"use memo";

return (

<ul>

{props.items.map(item => (

<li key={item.id}>{item.name}</li>

))}

</ul>

);

}

// This won't be compiled without the directive

function NormalComponent(props) {

return {props.content};

}
```
### Using Flow syntax mode

If your codebase uses Flow instead of TypeScript:
```
{

  compilationMode: 'syntax'

}
```
Then use Flow’s component syntax:
```
// Compiled: Flow component syntax

component Button(label: string) {

return <button>{label}</button>;

}

// Compiled: Flow hook syntax

hook useCounter(initial: number) {

const [count, setCount] = useState(initial);

return [count, setCount];

}

// Not compiled: Regular function syntax

function helper(data) {

return process(data);

}
```
### Opting out specific functions

Regardless of compilation mode, use `"use no memo"` to skip compilation:
```
function ComponentWithSideEffects() {

"use no memo"; // Prevent compilation

// This component has side effects that shouldn't be memoized

logToAnalytics('component_rendered');

return Content;

}
```
* * *

## Troubleshooting

### Component not being compiled in infer mode

In `'infer'` mode, ensure your component follows React conventions:
```
// ❌ Won't be compiled: lowercase name

function button(props) {

return <button>{props.label}</button>;

}

// ✅ Will be compiled: PascalCase name

function Button(props) {

return <button>{props.label}</button>;

}

// ❌ Won't be compiled: doesn't create JSX or call hooks

function useData() {

return window.localStorage.getItem('data');

}

// ✅ Will be compiled: calls a hook

function useData() {

const [data] = useState(() => window.localStorage.getItem('data'));

return data;

}
```

#### _reference_react-compiler_compiling-libraries.md

> Source: https://react.dev/reference/react-compiler/compiling-libraries
> Scraped: 12/20/2025, 10:41:08 PM

This guide helps library authors understand how to use React Compiler to ship optimized library code to their users.

* [Why Ship Compiled Code?](_reference_react-compiler_compiling-libraries.md#why-ship-compiled-code)
* [Setting Up Compilation](_reference_react-compiler_compiling-libraries.md#setting-up-compilation)
* [Backwards Compatibility](_reference_react-compiler_compiling-libraries.md#backwards-compatibility)
    * [1\. Install the runtime package](_reference_react-compiler_compiling-libraries.md#install-runtime-package)
    * [2\. Configure the target version](_reference_react-compiler_compiling-libraries.md#configure-target-version)
* [Testing Strategy](_reference_react-compiler_compiling-libraries.md#testing-strategy)
* [Troubleshooting](_reference_react-compiler_compiling-libraries.md#troubleshooting)
    * [Library doesn’t work with older React versions](_reference_react-compiler_compiling-libraries.md#library-doesnt-work-with-older-react-versions)
    * [Compilation conflicts with other Babel plugins](_reference_react-compiler_compiling-libraries.md#compilation-conflicts-with-other-babel-plugins)
    * [Runtime module not found](_reference_react-compiler_compiling-libraries.md#runtime-module-not-found)
* [Next Steps](_reference_react-compiler_compiling-libraries.md#next-steps)

## Why Ship Compiled Code?

As a library author, you can compile your library code before publishing to npm. This provides several benefits:

*   **Performance improvements for all users** - Your library users get optimized code even if they aren’t using React Compiler yet
*   **No configuration required by users** - The optimizations work out of the box
*   **Consistent behavior** - All users get the same optimized version regardless of their build setup

## Setting Up Compilation

Add React Compiler to your library’s build process:
```
npm install -D babel-plugin-react-compiler@latest
```
Configure your build tool to compile your library. For example, with Babel:
```
// babel.config.js

module.exports = {

plugins: [

'babel-plugin-react-compiler',

],

// ... other config

};
```
## Backwards Compatibility

If your library supports React versions below 19, you’ll need additional configuration:

### 1\. Install the runtime package

We recommend installing react-compiler-runtime as a direct dependency:
```
npm install react-compiler-runtime@latest
```
```
{

"dependencies": {

"react-compiler-runtime": "^1.0.0"

},

"peerDependencies": {

"react": "^17.0.0 || ^18.0.0 || ^19.0.0"

}

}
```
### 2\. Configure the target version

Set the minimum React version your library supports:
```
{

  target: '17', // Minimum supported React version

}
```
## Testing Strategy

Test your library both with and without compilation to ensure compatibility. Run your existing test suite against the compiled code, and also create a separate test configuration that bypasses the compiler. This helps catch any issues that might arise from the compilation process and ensures your library works correctly in all scenarios.

## Troubleshooting

### Library doesn’t work with older React versions

If your compiled library throws errors in React 17 or 18:

1.  Verify you’ve installed `react-compiler-runtime` as a dependency
2.  Check that your `target` configuration matches your minimum supported React version
3.  Ensure the runtime package is included in your published bundle

### Compilation conflicts with other Babel plugins

Some Babel plugins may conflict with React Compiler:

1.  Place `babel-plugin-react-compiler` early in your plugin list
2.  Disable conflicting optimizations in other plugins
3.  Test your build output thoroughly

### Runtime module not found

If users see “Cannot find module ‘react-compiler-runtime’“:

1.  Ensure the runtime is listed in `dependencies`, not `devDependencies`
2.  Check that your bundler includes the runtime in the output
3.  Verify the package is published to npm with your library

## Next Steps

*   Learn about [debugging techniques](_learn_react-compiler_debugging.md) for compiled code
*   Check the [configuration options](_reference_react-compiler_configuration.md) for all compiler options
*   Explore [compilation modes](_reference_react-compiler_compilationMode.md) for selective optimization

#### _reference_react-compiler_configuration.md

> Source: https://react.dev/reference/react-compiler/configuration
> Scraped: 12/20/2025, 10:41:08 PM

This page lists all configuration options available in React Compiler.

### Note

For most apps, the default options should work out of the box. If you have a special need, you can use these advanced options.
```
// babel.config.js

module.exports = {

plugins: [

[

'babel-plugin-react-compiler', {

// compiler options

}

]

]

};
```
* * *

## Compilation Control

These options control _what_ the compiler optimizes and _how_ it selects components and hooks to compile.

* [`compilationMode`](_reference_react-compiler_compilationMode.md) controls the strategy for selecting functions to compile (e.g., all functions, only annotated ones, or intelligent detection).
```
{

  compilationMode: 'annotation' // Only compile "use memo" functions

}
```
* * *

## Version Compatibility

React version configuration ensures the compiler generates code compatible with your React version.

[`target`](_reference_react-compiler_target.md) specifies which React version you’re using (17, 18, or 19).
```
// For React 18 projects

{

  target: '18' // Also requires react-compiler-runtime package

}
```
* * *

## Error Handling

These options control how the compiler responds to code that doesn’t follow the [Rules of React](_reference_rules.md).

[`panicThreshold`](_reference_react-compiler_panicThreshold.md) determines whether to fail the build or skip problematic components.
```
// Recommended for production

{

  panicThreshold: 'none' // Skip components with errors instead of failing the build

}
```
* * *

## Debugging

Logging and analysis options help you understand what the compiler is doing.

[`logger`](_reference_react-compiler_logger.md) provides custom logging for compilation events.
```
{

  logger: {

logEvent(filename, event) {

if (event.kind === 'CompileSuccess') {

console.log('Compiled:', filename);

}

}

}

}
```
* * *

## Feature Flags

Conditional compilation lets you control when optimized code is used.

[`gating`](_reference_react-compiler_gating.md) enables runtime feature flags for A/B testing or gradual rollouts.
```
{

  gating: {

    source: 'my-feature-flags',

importSpecifierName: 'isCompilerEnabled'

}

}
```
* * *

## Common Configuration Patterns

### Default configuration

For most React 19 applications, the compiler works without configuration:
```
// babel.config.js

module.exports = {

plugins: [

'babel-plugin-react-compiler'

]

};
```
### React 17/18 projects

Older React versions need the runtime package and target configuration:
```
npm install react-compiler-runtime@latest
```
```
{

  target: '18' // or '17'

}
```
### Incremental adoption

Start with specific directories and expand gradually:
```
{

  compilationMode: 'annotation' // Only compile "use memo" functions

}
```

#### _reference_react-compiler_directives.md

> Source: https://react.dev/reference/react-compiler/directives
> Scraped: 12/20/2025, 10:41:09 PM

React Compiler directives are special string literals that control whether specific functions are compiled.
```
function MyComponent() {

"use memo"; // Opt this component into compilation

return {/* ... */};

}
```
* [Overview](_reference_react-compiler_directives.md#overview)
    * [Available directives](_reference_react-compiler_directives.md#available-directives)
    * [Quick comparison](_reference_react-compiler_directives.md#quick-comparison)
* [Usage](_reference_react-compiler_directives.md#usage)
    * [Function-level directives](_reference_react-compiler_directives.md#function-level)
    * [Module-level directives](_reference_react-compiler_directives.md#module-level)
    * [Compilation modes interaction](_reference_react-compiler_directives.md#compilation-modes)
* [Best practices](_reference_react-compiler_directives.md#best-practices)
    * [Use directives sparingly](_reference_react-compiler_directives.md#use-sparingly)
    * [Document directive usage](_reference_react-compiler_directives.md#document-usage)
    * [Plan for removal](_reference_react-compiler_directives.md#plan-removal)
* [Common patterns](_reference_react-compiler_directives.md#common-patterns)
    * [Gradual adoption](_reference_react-compiler_directives.md#gradual-adoption)
* [Troubleshooting](_reference_react-compiler_directives.md#troubleshooting)
    * [Common issues](_reference_react-compiler_directives.md#common-issues)
* [See also](_reference_react-compiler_directives.md#see-also)

* * *

## Overview

React Compiler directives provide fine-grained control over which functions are optimized by the compiler. They are string literals placed at the beginning of a function body or at the top of a module.

### Available directives

*   **[`"use memo"`](_reference_react-compiler_directives_use-memo.md)** - Opts a function into compilation
*   **[`"use no memo"`](_reference_react-compiler_directives_use-no-memo.md)** - Opts a function out of compilation

### Quick comparison

| Directive | Purpose | When to use |
| --- | --- | --- |
| [`"use memo"`](_reference_react-compiler_directives_use-memo.md) | Force compilation | When using `annotation` mode or to override `infer` mode heuristics |
| [`"use no memo"`](_reference_react-compiler_directives_use-no-memo.md) | Prevent compilation | Debugging issues or working with incompatible code |

* * *

## Usage

### Function-level directives

Place directives at the beginning of a function to control its compilation:
```
// Opt into compilation

function OptimizedComponent() {

"use memo";

return This will be optimized;

}

// Opt out of compilation

function UnoptimizedComponent() {

"use no memo";

return This won't be optimized;

}
```
### Module-level directives

Place directives at the top of a file to affect all functions in that module:
```
// At the very top of the file

"use memo";

// All functions in this file will be compiled

function Component1() {

return Compiled;

}

function Component2() {

return Also compiled;

}

// Can be overridden at function level

function Component3() {

"use no memo"; // This overrides the module directive

return Not compiled;

}
```
### Compilation modes interaction

Directives behave differently depending on your [`compilationMode`](_reference_react-compiler_compilationMode.md):

*   **`annotation` mode**: Only functions with `"use memo"` are compiled
*   **`infer` mode**: Compiler decides what to compile, directives override decisions
*   **`all` mode**: Everything is compiled, `"use no memo"` can exclude specific functions

* * *

## Best practices

### Use directives sparingly

Directives are escape hatches. Prefer configuring the compiler at the project level:
```
// ✅ Good - project-wide configuration

{

  plugins: [

['babel-plugin-react-compiler', {

compilationMode: 'infer'

}]

]

}

// ⚠️ Use directives only when needed

function SpecialCase() {

"use no memo"; // Document why this is needed

// ...

}
```
### Document directive usage

Always explain why a directive is used:
```
// ✅ Good - clear explanation

function DataGrid() {

"use no memo"; // TODO: Remove after fixing issue with dynamic row heights (JIRA-123)

// Complex grid implementation

}

// ❌ Bad - no explanation

function Mystery() {

"use no memo";

// ...

}
```
### Plan for removal

Opt-out directives should be temporary:

1.  Add the directive with a TODO comment
2.  Create a tracking issue
3.  Fix the underlying problem
4.  Remove the directive
```
function TemporaryWorkaround() {

"use no memo"; // TODO: Remove after upgrading ThirdPartyLib to v2.0

return ;

}
```
* * *

## Common patterns

### Gradual adoption

When adopting the React Compiler in a large codebase:
```
// Start with annotation mode

{

  compilationMode: 'annotation'

}

// Opt in stable components

function StableComponent() {

"use memo";

// Well-tested component

}

// Later, switch to infer mode and opt out problematic ones

function ProblematicComponent() {

"use no memo"; // Fix issues before removing

// ...

}
```
* * *

## Troubleshooting

For specific issues with directives, see the troubleshooting sections in:

* [`"use memo"` troubleshooting](_reference_react-compiler_directives_use-memo.md#troubleshooting)
* [`"use no memo"` troubleshooting](_reference_react-compiler_directives_use-no-memo.md#troubleshooting)

### Common issues

1.  **Directive ignored**: Check placement (must be first) and spelling
2.  **Compilation still happens**: Check `ignoreUseNoForget` setting
3.  **Module directive not working**: Ensure it’s before all imports

* * *

## See also

* [`compilationMode`](_reference_react-compiler_compilationMode.md) - Configure how the compiler chooses what to optimize
* [`Configuration`](_reference_react-compiler_configuration.md) - Full compiler configuration options
* [React Compiler documentation](_learn_react-compiler.md) - Getting started guide

#### _reference_react-compiler_directives_use-memo.md

> Source: https://react.dev/reference/react-compiler/directives/use-memo
> Scraped: 12/20/2025, 10:41:09 PM

`"use memo"` marks a function for React Compiler optimization.

### Note

In most cases, you don’t need `"use memo"`. It’s primarily needed in `annotation` mode where you must explicitly mark functions for optimization. In `infer` mode, the compiler automatically detects components and hooks by their naming patterns (PascalCase for components, `use` prefix for hooks). If a component or hook isn’t being compiled in `infer` mode, you should fix its naming convention rather than forcing compilation with `"use memo"`.

* [Reference](_reference_react-compiler_directives_use-memo.md#reference)
    * [`"use memo"`](_reference_react-compiler_directives_use-memo.md#use-memo)
    * [How `"use memo"` marks functions for optimization](_reference_react-compiler_directives_use-memo.md#how-use-memo-marks)
    * [When to use `"use memo"`](_reference_react-compiler_directives_use-memo.md#when-to-use)
* [Usage](_reference_react-compiler_directives_use-memo.md#usage)
    * [Working with different compilation modes](_reference_react-compiler_directives_use-memo.md#compilation-modes)
* [Troubleshooting](_reference_react-compiler_directives_use-memo.md#troubleshooting)
    * [Verifying optimization](_reference_react-compiler_directives_use-memo.md#verifying-optimization)
    * [See also](_reference_react-compiler_directives_use-memo.md#see-also)

* * *

## Reference

### `"use memo"`

Add `"use memo"` at the beginning of a function to mark it for React Compiler optimization.
```
function MyComponent() {

"use memo";

// ...

}
```
When a function contains `"use memo"`, the React Compiler will analyze and optimize it during build time. The compiler will automatically memoize values and components to prevent unnecessary re-computations and re-renders.

#### Caveats

*   `"use memo"` must be at the very beginning of a function body, before any imports or other code (comments are OK).
*   The directive must be written with double or single quotes, not backticks.
*   The directive must exactly match `"use memo"`.
*   Only the first directive in a function is processed; additional directives are ignored.
*   The effect of the directive depends on your [`compilationMode`](_reference_react-compiler_compilationMode.md) setting.

### How `"use memo"` marks functions for optimization

In a React app that uses the React Compiler, functions are analyzed at build time to determine if they can be optimized. By default, the compiler automatically infers which components to memoize, but this can depend on your [`compilationMode`](_reference_react-compiler_compilationMode.md) setting if you’ve set it.

`"use memo"` explicitly marks a function for optimization, overriding the default behavior:

*   In `annotation` mode: Only functions with `"use memo"` are optimized
*   In `infer` mode: The compiler uses heuristics, but `"use memo"` forces optimization
*   In `all` mode: Everything is optimized by default, making `"use memo"` redundant

The directive creates a clear boundary in your codebase between optimized and non-optimized code, giving you fine-grained control over the compilation process.

### When to use `"use memo"`

You should consider using `"use memo"` when:

#### You’re using annotation mode

In `compilationMode: 'annotation'`, the directive is required for any function you want optimized:
```
// ✅ This component will be optimized

function OptimizedList() {

"use memo";

// ...

}

// ❌ This component won't be optimized

function SimpleWrapper() {

// ...

}
```
#### You’re gradually adopting React Compiler

Start with `annotation` mode and selectively optimize stable components:
```
// Start by optimizing leaf components

function Button({ onClick, children }) {

"use memo";

// ...

}

// Gradually move up the tree as you verify behavior

function ButtonGroup({ buttons }) {

"use memo";

// ...

}
```
* * *

## Usage

### Working with different compilation modes

The behavior of `"use memo"` changes based on your compiler configuration:
```
// babel.config.js

module.exports = {

plugins: [

['babel-plugin-react-compiler', {

compilationMode: 'annotation' // or 'infer' or 'all'

}]

]

};
```
#### Annotation mode
```
// ✅ Optimized with "use memo"

function ProductCard({ product }) {

"use memo";

// ...

}

// ❌ Not optimized (no directive)

function ProductList({ products }) {

// ...

}
```
#### Infer mode (default)
```
// Automatically memoized because this is named like a Component

function ComplexDashboard({ data }) {

// ...

}

// Skipped: Is not named like a Component

function simpleDisplay({ text }) {

// ...

}
```
In `infer` mode, the compiler automatically detects components and hooks by their naming patterns (PascalCase for components, `use` prefix for hooks). If a component or hook isn’t being compiled in `infer` mode, you should fix its naming convention rather than forcing compilation with `"use memo"`.

* * *

## Troubleshooting

### Verifying optimization

To confirm your component is being optimized:

1.  Check the compiled output in your build
2.  Use React DevTools to check for Memo ✨ badge

### See also

* [`"use no memo"`](_reference_react-compiler_directives_use-no-memo.md) - Opt out of compilation
* [`compilationMode`](_reference_react-compiler_compilationMode.md) - Configure compilation behavior
* [React Compiler](_learn_react-compiler.md) - Getting started guide

#### _reference_react-compiler_directives_use-no-memo.md

> Source: https://react.dev/reference/react-compiler/directives/use-no-memo
> Scraped: 12/20/2025, 10:41:09 PM

`"use no memo"` prevents a function from being optimized by React Compiler.

* [Reference](_reference_react-compiler_directives_use-no-memo.md#reference)
    * [`"use no memo"`](_reference_react-compiler_directives_use-no-memo.md#use-no-memo)
    * [How `"use no memo"` opts-out of optimization](_reference_react-compiler_directives_use-no-memo.md#how-use-no-memo-opts-out)
    * [When to use `"use no memo"`](_reference_react-compiler_directives_use-no-memo.md#when-to-use)
* [Usage](_reference_react-compiler_directives_use-no-memo.md#usage)
* [Troubleshooting](_reference_react-compiler_directives_use-no-memo.md#troubleshooting)
    * [Directive not preventing compilation](_reference_react-compiler_directives_use-no-memo.md#not-preventing)
    * [Best practices](_reference_react-compiler_directives_use-no-memo.md#best-practices)
    * [See also](_reference_react-compiler_directives_use-no-memo.md#see-also)

* * *

## Reference

### `"use no memo"`

Add `"use no memo"` at the beginning of a function to prevent React Compiler optimization.
```
function MyComponent() {

"use no memo";

// ...

}
```
When a function contains `"use no memo"`, the React Compiler will skip it entirely during optimization. This is useful as a temporary escape hatch when debugging or when dealing with code that doesn’t work correctly with the compiler.

#### Caveats

*   `"use no memo"` must be at the very beginning of a function body, before any imports or other code (comments are OK).
*   The directive must be written with double or single quotes, not backticks.
*   The directive must exactly match `"use no memo"` or its alias `"use no forget"`.
*   This directive takes precedence over all compilation modes and other directives.
*   It’s intended as a temporary debugging tool, not a permanent solution.

### How `"use no memo"` opts-out of optimization

React Compiler analyzes your code at build time to apply optimizations. `"use no memo"` creates an explicit boundary that tells the compiler to skip a function entirely.

This directive takes precedence over all other settings:

*   In `all` mode: The function is skipped despite the global setting
*   In `infer` mode: The function is skipped even if heuristics would optimize it

The compiler treats these functions as if the React Compiler wasn’t enabled, leaving them exactly as written.

### When to use `"use no memo"`

`"use no memo"` should be used sparingly and temporarily. Common scenarios include:

#### Debugging compiler issues

When you suspect the compiler is causing issues, temporarily disable optimization to isolate the problem:
```
function ProblematicComponent({ data }) {

"use no memo"; // TODO: Remove after fixing issue #123

// Rules of React violations that weren't statically detected

// ...

}
```
#### Third-party library integration

When integrating with libraries that might not be compatible with the compiler:
```
function ThirdPartyWrapper() {

"use no memo";

useThirdPartyHook(); // Has side effects that compiler might optimize incorrectly

// ...

}
```
* * *

## Usage

The `"use no memo"` directive is placed at the beginning of a function body to prevent React Compiler from optimizing that function:
```
function MyComponent() {

"use no memo";

// Function body

}
```
The directive can also be placed at the top of a file to affect all functions in that module:
```
"use no memo";

// All functions in this file will be skipped by the compiler
```
`"use no memo"` at the function level overrides the module level directive.

* * *

## Troubleshooting

### Directive not preventing compilation

If `"use no memo"` isn’t working:
```
// ❌ Wrong - directive after code

function Component() {

const data = getData();

"use no memo"; // Too late!

}

// ✅ Correct - directive first

function Component() {

"use no memo";

const data = getData();

}
```
Also check:

*   Spelling - must be exactly `"use no memo"`
*   Quotes - must use single or double quotes, not backticks

### Best practices

**Always document why** you’re disabling optimization:
```
// ✅ Good - clear explanation and tracking

function DataProcessor() {

"use no memo"; // TODO: Remove after fixing rule of react violation

// ...

}

// ❌ Bad - no explanation

function Mystery() {

"use no memo";

// ...

}
```
### See also

* [`"use memo"`](_reference_react-compiler_directives_use-memo.md) - Opt into compilation
* [React Compiler](_learn_react-compiler.md) - Getting started guide

#### _reference_react-compiler_gating.md

> Source: https://react.dev/reference/react-compiler/gating
> Scraped: 12/20/2025, 10:41:09 PM

The `gating` option enables conditional compilation, allowing you to control when optimized code is used at runtime.
```
{

  gating: {

    source: 'my-feature-flags',

importSpecifierName: 'shouldUseCompiler'

}

}
```
* [Reference](_reference_react-compiler_gating.md#reference)
    * [`gating`](_reference_react-compiler_gating.md#gating)
* [Usage](_reference_react-compiler_gating.md#usage)
    * [Basic feature flag setup](_reference_react-compiler_gating.md#basic-setup)
* [Troubleshooting](_reference_react-compiler_gating.md#troubleshooting)
    * [Feature flag not working](_reference_react-compiler_gating.md#flag-not-working)
    * [Import errors](_reference_react-compiler_gating.md#import-errors)

* * *

## Reference

### `gating`

Configures runtime feature flag gating for compiled functions.

#### Type
```
{

  source: string;

  importSpecifierName: string;

} | null
```
#### Default value

`null`

#### Properties

*   **`source`**: Module path to import the feature flag from
*   **`importSpecifierName`**: Name of the exported function to import

#### Caveats

*   The gating function must return a boolean
*   Both compiled and original versions increase bundle size
*   The import is added to every file with compiled functions

* * *

## Usage

### Basic feature flag setup

1.  Create a feature flag module:
```
// src/utils/feature-flags.js

export function shouldUseCompiler() {

// your logic here

return getFeatureFlag('react-compiler-enabled');

}
```
1.  Configure the compiler:
```
{

  gating: {

    source: './src/utils/feature-flags',

importSpecifierName: 'shouldUseCompiler'

}

}
```
1.  The compiler generates gated code:
```
// Input

function Button(props) {

return <button>{props.label}</button>;

}

// Output (simplified)

import { shouldUseCompiler } from './src/utils/feature-flags';

const Button = shouldUseCompiler()

  ? function Button_optimized(props) { /* compiled version */ }

  : function Button_original(props) { /* original version */ };
```
Note that the gating function is evaluated once at module time, so once the JS bundle has been parsed and evaluated the choice of component stays static for the rest of the browser session.

* * *

## Troubleshooting

### Feature flag not working

Verify your flag module exports the correct function:
```
// ❌ Wrong: Default export

export default function shouldUseCompiler() {

return true;

}

// ✅ Correct: Named export matching importSpecifierName

export function shouldUseCompiler() {

return true;

}
```
### Import errors

Ensure the source path is correct:
```
// ❌ Wrong: Relative to babel.config.js

{

  source: './src/flags',

importSpecifierName: 'flag'

}

// ✅ Correct: Module resolution path

{

  source: '@myapp/feature-flags',

importSpecifierName: 'flag'

}

// ✅ Also correct: Absolute path from project root

{

  source: './src/utils/flags',

importSpecifierName: 'flag'

}
```

#### _reference_react-compiler_logger.md

> Source: https://react.dev/reference/react-compiler/logger
> Scraped: 12/20/2025, 10:41:09 PM

The `logger` option provides custom logging for React Compiler events during compilation.
```
{

  logger: {

logEvent(filename, event) {

console.log(`[Compiler] ${event.kind}: ${filename}`);

}

}

}
```
* [Reference](_reference_react-compiler_logger.md#reference)
    * [`logger`](_reference_react-compiler_logger.md#logger)
* [Usage](_reference_react-compiler_logger.md#usage)
    * [Basic logging](_reference_react-compiler_logger.md#basic-logging)
    * [Detailed error logging](_reference_react-compiler_logger.md#detailed-error-logging)

* * *

## Reference

### `logger`

Configures custom logging to track compiler behavior and debug issues.

#### Type
```
{

  logEvent: (filename: string | null, event: LoggerEvent) => void;

} | null
```
#### Default value

`null`

#### Methods

*   **`logEvent`**: Called for each compiler event with the filename and event details

#### Event types

*   **`CompileSuccess`**: Function successfully compiled
*   **`CompileError`**: Function skipped due to errors
*   **`CompileDiagnostic`**: Non-fatal diagnostic information
*   **`CompileSkip`**: Function skipped for other reasons
*   **`PipelineError`**: Unexpected compilation error
*   **`Timing`**: Performance timing information

#### Caveats

*   Event structure may change between versions
*   Large codebases generate many log entries

* * *

## Usage

### Basic logging

Track compilation success and failures:
```
{

  logger: {

logEvent(filename, event) {

switch (event.kind) {

case 'CompileSuccess': {

console.log(`✅ Compiled: ${filename}`);

break;

}

case 'CompileError': {

console.log(`❌ Skipped: ${filename}`);

break;

}

default: {}

}

}

}

}
```
### Detailed error logging

Get specific information about compilation failures:
```
{

  logger: {

logEvent(filename, event) {

if (event.kind === 'CompileError') {

console.error(`\nCompilation failed: ${filename}`);

console.error(`Reason: ${event.detail.reason}`);

if (event.detail.description) {

console.error(`Details: ${event.detail.description}`);

}

if (event.detail.loc) {

const { line, column } = event.detail.loc.start;

console.error(`Location: Line ${line}, Column ${column}`);

}

if (event.detail.suggestions) {

console.error('Suggestions:', event.detail.suggestions);

}

}

}

}

}
```

#### _reference_react-compiler_panicThreshold.md

> Source: https://react.dev/reference/react-compiler/panicThreshold
> Scraped: 12/20/2025, 10:41:08 PM

The `panicThreshold` option controls how the React Compiler handles errors during compilation.
```
{

  panicThreshold: 'none' // Recommended

}
```
* [Reference](_reference_react-compiler_panicThreshold.md#reference)
    * [`panicThreshold`](_reference_react-compiler_panicThreshold.md#panicthreshold)
* [Usage](_reference_react-compiler_panicThreshold.md#usage)
    * [Production configuration (recommended)](_reference_react-compiler_panicThreshold.md#production-configuration)
    * [Development debugging](_reference_react-compiler_panicThreshold.md#development-debugging)

* * *

## Reference

### `panicThreshold`

Determines whether compilation errors should fail the build or skip optimization.

#### Type
```
'none' | 'critical_errors' | 'all_errors'
```
#### Default value

`'none'`

#### Options

*   **`'none'`** (default, recommended): Skip components that can’t be compiled and continue building
*   **`'critical_errors'`**: Fail the build only on critical compiler errors
*   **`'all_errors'`**: Fail the build on any compiler diagnostic

#### Caveats

*   Production builds should always use `'none'`
*   Build failures prevent your application from building
*   The compiler automatically detects and skips problematic code with `'none'`
*   Higher thresholds are only useful during development for debugging

* * *

## Usage

### Production configuration (recommended)

For production builds, always use `'none'`. This is the default value:
```
{

  panicThreshold: 'none'

}
```
This ensures:

*   Your build never fails due to compiler issues
*   Components that can’t be optimized run normally
*   Maximum components get optimized
*   Stable production deployments

### Development debugging

Temporarily use stricter thresholds to find issues:
```
const isDevelopment = process.env.NODE_ENV === 'development';

{

  panicThreshold: isDevelopment ? 'critical_errors' : 'none',

logger: {

logEvent(filename, event) {

if (isDevelopment && event.kind === 'CompileError') {

// ...

}

}

}

}
```

#### _reference_react-compiler_target.md

> Source: https://react.dev/reference/react-compiler/target
> Scraped: 12/20/2025, 10:41:09 PM

The `target` option specifies which React version the compiler should generate code for.
```
{

  target: '19' // or '18', '17'

}
```
* [Reference](_reference_react-compiler_target.md#reference)
    * [`target`](_reference_react-compiler_target.md#target)
* [Usage](_reference_react-compiler_target.md#usage)
    * [Targeting React 19 (default)](_reference_react-compiler_target.md#targeting-react-19)
    * [Targeting React 17 or 18](_reference_react-compiler_target.md#targeting-react-17-or-18)
* [Troubleshooting](_reference_react-compiler_target.md#troubleshooting)
    * [Runtime errors about missing compiler runtime](_reference_react-compiler_target.md#missing-runtime)
    * [Runtime package not working](_reference_react-compiler_target.md#runtime-not-working)
    * [Checking compiled output](_reference_react-compiler_target.md#checking-output)

* * *

## Reference

### `target`

Configures the React version compatibility for the compiled output.

#### Type

#### Default value

`'19'`

#### Valid values

*   **`'19'`**: Target React 19 (default). No additional runtime required.
*   **`'18'`**: Target React 18. Requires `react-compiler-runtime` package.
*   **`'17'`**: Target React 17. Requires `react-compiler-runtime` package.

#### Caveats

*   Always use string values, not numbers (e.g., `'17'` not `17`)
*   Don’t include patch versions (e.g., use `'18'` not `'18.2.0'`)
*   React 19 includes built-in compiler runtime APIs
*   React 17 and 18 require installing `react-compiler-runtime@latest`

* * *

## Usage

### Targeting React 19 (default)

For React 19, no special configuration is needed:
```
{

// defaults to target: '19'

}
```
The compiler will use React 19’s built-in runtime APIs:
```
// Compiled output uses React 19's native APIs

import { c as _c } from 'react/compiler-runtime';
```
### Targeting React 17 or 18

For React 17 and React 18 projects, you need two steps:

1.  Install the runtime package:
```
npm install react-compiler-runtime@latest
```
1.  Configure the target:
```
// For React 18

{

  target: '18'

}

// For React 17

{

  target: '17'

}
```
The compiler will use the polyfill runtime for both versions:
```
// Compiled output uses the polyfill

import { c as _c } from 'react-compiler-runtime';
```
* * *

## Troubleshooting

### Runtime errors about missing compiler runtime

If you see errors like “Cannot find module ‘react/compiler-runtime’“:

1.  Check your React version:

2.  If using React 17 or 18, install the runtime:

    ```
    npm install react-compiler-runtime@latest

    ```
3.  Ensure your target matches your React version:

    ```
    {

      target: '18' // Must match your React major version

    }

    ```
### Runtime package not working

Ensure the runtime package is:

1.  Installed in your project (not globally)
2.  Listed in your `package.json` dependencies
3.  The correct version (`@latest` tag)
4.  Not in `devDependencies` (it’s needed at runtime)

### Checking compiled output

To verify the correct runtime is being used, note the different import (`react/compiler-runtime` for builtin, `react-compiler-runtime` standalone package for 17/18):
```
// For React 19 (built-in runtime)

import { c } from 'react/compiler-runtime'

//                      ^

// For React 17/18 (polyfill runtime)

import { c } from 'react-compiler-runtime'

//                      ^
```

#### _reference_react-dom.md

> Source: https://react.dev/reference/react-dom
> Scraped: 12/20/2025, 10:41:05 PM

The `react-dom` package contains methods that are only supported for the web applications (which run in the browser DOM environment). They are not supported for React Native.

* * *

## APIs

These APIs can be imported from your components. They are rarely used:

* [`createPortal`](_reference_react-dom_createPortal.md) lets you render child components in a different part of the DOM tree.
* [`flushSync`](_reference_react-dom_flushSync.md) lets you force React to flush a state update and update the DOM synchronously.

## Resource Preloading APIs

These APIs can be used to make apps faster by pre-loading resources such as scripts, stylesheets, and fonts as soon as you know you need them, for example before navigating to another page where the resources will be used.

[React-based frameworks](_learn_creating-a-react-app.md) frequently handle resource loading for you, so you might not have to call these APIs yourself. Consult your framework’s documentation for details.

* [`prefetchDNS`](_reference_react-dom_prefetchDNS.md) lets you prefetch the IP address of a DNS domain name that you expect to connect to.
* [`preconnect`](_reference_react-dom_preconnect.md) lets you connect to a server you expect to request resources from, even if you don’t know what resources you’ll need yet.
* [`preload`](_reference_react-dom_preload.md) lets you fetch a stylesheet, font, image, or external script that you expect to use.
* [`preloadModule`](_reference_react-dom_preloadModule.md) lets you fetch an ESM module that you expect to use.
* [`preinit`](_reference_react-dom_preinit.md) lets you fetch and evaluate an external script or fetch and insert a stylesheet.
* [`preinitModule`](_reference_react-dom_preinitModule.md) lets you fetch and evaluate an ESM module.

* * *

## Entry points

The `react-dom` package provides two additional entry points:

* [`react-dom/client`](_reference_react-dom_client.md) contains APIs to render React components on the client (in the browser).
* [`react-dom/server`](_reference_react-dom_server.md) contains APIs to render React components on the server.

* * *

## Removed APIs

These APIs were removed in React 19:

* [`findDOMNode`](https://18.react.dev/reference/react-dom/findDOMNode): see [alternatives](https://18.react.dev/reference/react-dom/findDOMNode#alternatives).
* [`hydrate`](https://18.react.dev/reference/react-dom/hydrate): use [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) instead.
* [`render`](https://18.react.dev/reference/react-dom/render): use [`createRoot`](_reference_react-dom_client_createRoot.md) instead.
* [`unmountComponentAtNode`](_reference_react-dom_unmountComponentAtNode.md): use [`root.unmount()`](_reference_react-dom_client_createRoot.md#root-unmount) instead.
* [`renderToNodeStream`](https://18.react.dev/reference/react-dom/server/renderToNodeStream): use [`react-dom/server`](_reference_react-dom_server.md) APIs instead.
* [`renderToStaticNodeStream`](https://18.react.dev/reference/react-dom/server/renderToStaticNodeStream): use [`react-dom/server`](_reference_react-dom_server.md) APIs instead.

#### _reference_react-dom_client.md

> Source: https://react.dev/reference/react-dom/client
> Scraped: 12/20/2025, 10:41:05 PM

The `react-dom/client` APIs let you render React components on the client (in the browser). These APIs are typically used at the top level of your app to initialize your React tree. A [framework](_learn_creating-a-react-app.md#full-stack-frameworks) may call them for you. Most of your components don’t need to import or use them.

* * *

## Client APIs

* [`createRoot`](_reference_react-dom_client_createRoot.md) lets you create a root to display React components inside a browser DOM node.
* [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) lets you display React components inside a browser DOM node whose HTML content was previously generated by [`react-dom/server`.](_reference_react-dom_server.md)

* * *

## Browser support

React supports all popular browsers, including Internet Explorer 9 and above. Some polyfills are required for older browsers such as IE 9 and IE 10.

#### _reference_react-dom_client_createRoot.md

> Source: https://react.dev/reference/react-dom/client/createRoot
> Scraped: 12/20/2025, 10:41:06 PM

`createRoot` lets you create a root to display React components inside a browser DOM node.
```
const root = createRoot(domNode, options?)
```
* [Reference](_reference_react-dom_client_createRoot.md#reference)
    * [`createRoot(domNode, options?)`](_reference_react-dom_client_createRoot.md#createroot)
    * [`root.render(reactNode)`](_reference_react-dom_client_createRoot.md#root-render)
    * [`root.unmount()`](_reference_react-dom_client_createRoot.md#root-unmount)
* [Usage](_reference_react-dom_client_createRoot.md#usage)
    * [Rendering an app fully built with React](_reference_react-dom_client_createRoot.md#rendering-an-app-fully-built-with-react)
    * [Rendering a page partially built with React](_reference_react-dom_client_createRoot.md#rendering-a-page-partially-built-with-react)
    * [Updating a root component](_reference_react-dom_client_createRoot.md#updating-a-root-component)
    * [Error logging in production](_reference_react-dom_client_createRoot.md#error-logging-in-production)
* [Troubleshooting](_reference_react-dom_client_createRoot.md#troubleshooting)
    * [I’ve created a root, but nothing is displayed](_reference_react-dom_client_createRoot.md#ive-created-a-root-but-nothing-is-displayed)
    * [I’m getting an error: “You passed a second argument to root.render”](_reference_react-dom_client_createRoot.md#im-getting-an-error-you-passed-a-second-argument-to-root-render)
    * [I’m getting an error: “Target container is not a DOM element”](_reference_react-dom_client_createRoot.md#im-getting-an-error-target-container-is-not-a-dom-element)
    * [I’m getting an error: “Functions are not valid as a React child.”](_reference_react-dom_client_createRoot.md#im-getting-an-error-functions-are-not-valid-as-a-react-child)
    * [My server-rendered HTML gets re-created from scratch](_reference_react-dom_client_createRoot.md#my-server-rendered-html-gets-re-created-from-scratch)

* * *

## Reference

### `createRoot(domNode, options?)`

Call `createRoot` to create a React root for displaying content inside a browser DOM element.
```
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');

const root = createRoot(domNode);
```
React will create a root for the `domNode`, and take over managing the DOM inside it. After you’ve created a root, you need to call [`root.render`](_reference_react-dom_client_createRoot.md#root-render) to display a React component inside of it:

An app fully built with React will usually only have one `createRoot` call for its root component. A page that uses “sprinkles” of React for parts of the page may have as many separate roots as needed.

[See more examples below.](_reference_react-dom_client_createRoot.md#usage)

#### Parameters

*   `domNode`: A [DOM element.](https://developer.mozilla.org/en-US/docs/Web/API/Element) React will create a root for this DOM element and allow you to call functions on the root, such as `render` to display rendered React content.

*   **optional** `options`: An object with options for this React root.

    *   **optional** `onCaughtError`: Callback called when React catches an error in an Error Boundary. Called with the `error` caught by the Error Boundary, and an `errorInfo` object containing the `componentStack`.
    *   **optional** `onUncaughtError`: Callback called when an error is thrown and not caught by an Error Boundary. Called with the `error` that was thrown, and an `errorInfo` object containing the `componentStack`.
    *   **optional** `onRecoverableError`: Callback called when React automatically recovers from errors. Called with an `error` React throws, and an `errorInfo` object containing the `componentStack`. Some recoverable errors may include the original error cause as `error.cause`.
    *   **optional** `identifierPrefix`: A string prefix React uses for IDs generated by [`useId`.](_reference_react_useId.md) Useful to avoid conflicts when using multiple roots on the same page.

#### Returns

`createRoot` returns an object with two methods: [`render`](_reference_react-dom_client_createRoot.md#root-render) and [`unmount`.](_reference_react-dom_client_createRoot.md#root-unmount)

#### Caveats

*   If your app is server-rendered, using `createRoot()` is not supported. Use [`hydrateRoot()`](_reference_react-dom_client_hydrateRoot.md) instead.
*   You’ll likely have only one `createRoot` call in your app. If you use a framework, it might do this call for you.
*   When you want to render a piece of JSX in a different part of the DOM tree that isn’t a child of your component (for example, a modal or a tooltip), use [`createPortal`](_reference_react-dom_createPortal.md) instead of `createRoot`.

* * *

### `root.render(reactNode)`

Call `root.render` to display a piece of [JSX](_learn_writing-markup-with-jsx.md) (“React node”) into the React root’s browser DOM node.

React will display `<App />` in the `root`, and take over managing the DOM inside it.

[See more examples below.](_reference_react-dom_client_createRoot.md#usage)

#### Parameters

*   `reactNode`: A _React node_ that you want to display. This will usually be a piece of JSX like `<App />`, but you can also pass a React element constructed with [`createElement()`](_reference_react_createElement.md), a string, a number, `null`, or `undefined`.

#### Returns

`root.render` returns `undefined`.

#### Caveats

*   The first time you call `root.render`, React will clear all the existing HTML content inside the React root before rendering the React component into it.

*   If your root’s DOM node contains HTML generated by React on the server or during the build, use [`hydrateRoot()`](_reference_react-dom_client_hydrateRoot.md) instead, which attaches the event handlers to the existing HTML.

*   If you call `render` on the same root more than once, React will update the DOM as necessary to reflect the latest JSX you passed. React will decide which parts of the DOM can be reused and which need to be recreated by [“matching it up”](_learn_preserving-and-resetting-state.md) with the previously rendered tree. Calling `render` on the same root again is similar to calling the [`set` function](_reference_react_useState.md#setstate) on the root component: React avoids unnecessary DOM updates.

*   Although rendering is synchronous once it starts, `root.render(...)` is not. This means code after `root.render()` may run before any effects (`useLayoutEffect`, `useEffect`) of that specific render are fired. This is usually fine and rarely needs adjustment. In rare cases where effect timing matters, you can wrap `root.render(...)` in [`flushSync`](_reference_react-dom_flushSync.md) to ensure the initial render runs fully synchronously.

    ```
    const root = createRoot(document.getElementById('root'));

    root.render(<App />);

    // 🚩 The HTML will not include the rendered  yet:

    console.log(document.body.innerHTML);

    ```
* * *

### `root.unmount()`

Call `root.unmount` to destroy a rendered tree inside a React root.

An app fully built with React will usually not have any calls to `root.unmount`.

This is mostly useful if your React root’s DOM node (or any of its ancestors) may get removed from the DOM by some other code. For example, imagine a jQuery tab panel that removes inactive tabs from the DOM. If a tab gets removed, everything inside it (including the React roots inside) would get removed from the DOM as well. In that case, you need to tell React to “stop” managing the removed root’s content by calling `root.unmount`. Otherwise, the components inside the removed root won’t know to clean up and free up global resources like subscriptions.

Calling `root.unmount` will unmount all the components in the root and “detach” React from the root DOM node, including removing any event handlers or state in the tree.

#### Parameters

`root.unmount` does not accept any parameters.

#### Returns

`root.unmount` returns `undefined`.

#### Caveats

*   Calling `root.unmount` will unmount all the components in the tree and “detach” React from the root DOM node.

*   Once you call `root.unmount` you cannot call `root.render` again on the same root. Attempting to call `root.render` on an unmounted root will throw a “Cannot update an unmounted root” error. However, you can create a new root for the same DOM node after the previous root for that node has been unmounted.

* * *

## Usage

### Rendering an app fully built with React

If your app is fully built with React, create a single root for your entire app.
```
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render();
```
Usually, you only need to run this code once at startup. It will:

1.  Find the browser DOM node defined in your HTML.
2.  Display the React component for your app inside.

**If your app is fully built with React, you shouldn’t need to create any more roots, or to call [`root.render`](_reference_react-dom_client_createRoot.md#root-render) again.**

From this point on, React will manage the DOM of your entire app. To add more components, [nest them inside the `App` component.](_learn_importing-and-exporting-components.md) When you need to update the UI, each of your components can do this by [using state.](_reference_react_useState.md) When you need to display extra content like a modal or a tooltip outside the DOM node, [render it with a portal.](_reference_react-dom_createPortal.md)

### Note

When your HTML is empty, the user sees a blank page until the app’s JavaScript code loads and runs:

This can feel very slow! To solve this, you can generate the initial HTML from your components [on the server or during the build.](_reference_react-dom_server.md) Then your visitors can read text, see images, and click links before any of the JavaScript code loads. We recommend [using a framework](_learn_creating-a-react-app.md#full-stack-frameworks) that does this optimization out of the box. Depending on when it runs, this is called _server-side rendering (SSR)_ or _static site generation (SSG)._

### Pitfall

**Apps using server rendering or static generation must call [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) instead of `createRoot`.** React will then _hydrate_ (reuse) the DOM nodes from your HTML instead of destroying and re-creating them.

* * *

### Rendering a page partially built with React

If your page [isn’t fully built with React](_learn_add-react-to-an-existing-project.md#using-react-for-a-part-of-your-existing-page), you can call `createRoot` multiple times to create a root for each top-level piece of UI managed by React. You can display different content in each root by calling [`root.render`.](_reference_react-dom_client_createRoot.md#root-render)

Here, two different React components are rendered into two DOM nodes defined in the `index.html` file:

You could also create a new DOM node with [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) and add it to the document manually.
```
const domNode = document.createElement('div');

const root = createRoot(domNode);

root.render(<Comment />);

document.body.appendChild(domNode); // You can add it anywhere in the document
```
To remove the React tree from the DOM node and clean up all the resources used by it, call [`root.unmount`.](_reference_react-dom_client_createRoot.md#root-unmount)

This is mostly useful if your React components are inside an app written in a different framework.

* * *

### Updating a root component

You can call `render` more than once on the same root. As long as the component tree structure matches up with what was previously rendered, React will [preserve the state.](_learn_preserving-and-resetting-state.md) Notice how you can type in the input, which means that the updates from repeated `render` calls every second in this example are not destructive:

It is uncommon to call `render` multiple times. Usually, your components will [update state](_reference_react_useState.md) instead.

### Error logging in production

By default, React will log all errors to the console. To implement your own error reporting, you can provide the optional error handler root options `onUncaughtError`, `onCaughtError` and `onRecoverableError`:
```
import { createRoot } from "react-dom/client";

import { reportCaughtError } from "./reportError";

const container = document.getElementById("root");

const root = createRoot(container, {

onCaughtError: (error, errorInfo) => {

if (error.message !== "Known error") {

reportCaughtError({

error,

componentStack: errorInfo.componentStack,

});

}

},

});
```
The onCaughtError option is a function called with two arguments:

1.  The error that was thrown.
2.  An errorInfo object that contains the componentStack of the error.

Together with `onUncaughtError` and `onRecoverableError`, you can can implement your own error reporting system:
```
import { createRoot } from "react-dom/client";
import App from "./App.js";
import {
  onCaughtErrorProd,
  onRecoverableErrorProd,
  onUncaughtErrorProd,
} from "./reportError";
const container = document.getElementById("root");
const root = createRoot(container, {
  onCaughtError: onCaughtErrorProd,
  onRecoverableError: onRecoverableErrorProd,
  onUncaughtError: onUncaughtErrorProd,
});
root.render(<App />);
```
## Troubleshooting

### I’ve created a root, but nothing is displayed

Make sure you haven’t forgotten to actually _render_ your app into the root:
```
import { createRoot } from 'react-dom/client';

import App from './App.js';

const root = createRoot(document.getElementById('root'));

root.render(<App />);
```
Until you do that, nothing is displayed.

* * *

### I’m getting an error: “You passed a second argument to root.render”

A common mistake is to pass the options for `createRoot` to `root.render(...)`:

Warning: You passed a second argument to root.render(…) but it only accepts one argument.

To fix, pass the root options to `createRoot(...)`, not `root.render(...)`:
```
// 🚩 Wrong: root.render only takes one argument.

root.render(App, {onUncaughtError});

// ✅ Correct: pass options to createRoot.

const root = createRoot(container, {onUncaughtError});

root.render(<App />);
```
* * *

### I’m getting an error: “Target container is not a DOM element”

This error means that whatever you’re passing to `createRoot` is not a DOM node.

If you’re not sure what’s happening, try logging it:
```
const domNode = document.getElementById('root');

console.log(domNode); // ???

const root = createRoot(domNode);

root.render(<App />);
```
For example, if `domNode` is `null`, it means that [`getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) returned `null`. This will happen if there is no node in the document with the given ID at the time of your call. There may be a few reasons for it:

1.  The ID you’re looking for might differ from the ID you used in the HTML file. Check for typos!
2.  Your bundle’s `<script>` tag cannot “see” any DOM nodes that appear _after_ it in the HTML.

Another common way to get this error is to write `createRoot(<App />)` instead of `createRoot(domNode)`.

* * *

### I’m getting an error: “Functions are not valid as a React child.”

This error means that whatever you’re passing to `root.render` is not a React component.

This may happen if you call `root.render` with `Component` instead of `<Component />`:
```
// 🚩 Wrong: App is a function, not a Component.

root.render(App);

// ✅ Correct:  is a component.

root.render(<App />);
```
Or if you pass a function to `root.render`, instead of the result of calling it:
```
// 🚩 Wrong: createApp is a function, not a component.

root.render(createApp);

// ✅ Correct: call createApp to return a component.

root.render(createApp());
```
* * *

### My server-rendered HTML gets re-created from scratch

If your app is server-rendered and includes the initial HTML generated by React, you might notice that creating a root and calling `root.render` deletes all that HTML, and then re-creates all the DOM nodes from scratch. This can be slower, resets focus and scroll positions, and may lose other user input.

Server-rendered apps must use [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) instead of `createRoot`:
```
import { hydrateRoot } from 'react-dom/client';

import App from './App.js';

hydrateRoot(

document.getElementById('root'),

<App />

);
```
Note that its API is different. In particular, usually there will be no further `root.render` call.

#### _reference_react-dom_client_hydrateRoot.md

> Source: https://react.dev/reference/react-dom/client/hydrateRoot
> Scraped: 12/20/2025, 10:41:06 PM

`hydrateRoot` lets you display React components inside a browser DOM node whose HTML content was previously generated by [`react-dom/server`.](_reference_react-dom_server.md)
```
const root = hydrateRoot(domNode, reactNode, options?)
```
* [Reference](_reference_react-dom_client_hydrateRoot.md#reference)
    * [`hydrateRoot(domNode, reactNode, options?)`](_reference_react-dom_client_hydrateRoot.md#hydrateroot)
    * [`root.render(reactNode)`](_reference_react-dom_client_hydrateRoot.md#root-render)
    * [`root.unmount()`](_reference_react-dom_client_hydrateRoot.md#root-unmount)
* [Usage](_reference_react-dom_client_hydrateRoot.md#usage)
    * [Hydrating server-rendered HTML](_reference_react-dom_client_hydrateRoot.md#hydrating-server-rendered-html)
    * [Hydrating an entire document](_reference_react-dom_client_hydrateRoot.md#hydrating-an-entire-document)
    * [Suppressing unavoidable hydration mismatch errors](_reference_react-dom_client_hydrateRoot.md#suppressing-unavoidable-hydration-mismatch-errors)
    * [Handling different client and server content](_reference_react-dom_client_hydrateRoot.md#handling-different-client-and-server-content)
    * [Updating a hydrated root component](_reference_react-dom_client_hydrateRoot.md#updating-a-hydrated-root-component)
    * [Error logging in production](_reference_react-dom_client_hydrateRoot.md#error-logging-in-production)
* [Troubleshooting](_reference_react-dom_client_hydrateRoot.md#troubleshooting)
    * [I’m getting an error: “You passed a second argument to root.render”](_reference_react-dom_client_hydrateRoot.md#im-getting-an-error-you-passed-a-second-argument-to-root-render)

* * *

## Reference

### `hydrateRoot(domNode, reactNode, options?)`

Call `hydrateRoot` to “attach” React to existing HTML that was already rendered by React in a server environment.
```
import { hydrateRoot } from 'react-dom/client';

const domNode = document.getElementById('root');

const root = hydrateRoot(domNode, reactNode);
```
React will attach to the HTML that exists inside the `domNode`, and take over managing the DOM inside it. An app fully built with React will usually only have one `hydrateRoot` call with its root component.

[See more examples below.](_reference_react-dom_client_hydrateRoot.md#usage)

#### Parameters

*   `domNode`: A [DOM element](https://developer.mozilla.org/en-US/docs/Web/API/Element) that was rendered as the root element on the server.

*   `reactNode`: The “React node” used to render the existing HTML. This will usually be a piece of JSX like `<App />` which was rendered with a `ReactDOM Server` method such as `renderToPipeableStream(<App />)`.

*   **optional** `options`: An object with options for this React root.

    *   **optional** `onCaughtError`: Callback called when React catches an error in an Error Boundary. Called with the `error` caught by the Error Boundary, and an `errorInfo` object containing the `componentStack`.
    *   **optional** `onUncaughtError`: Callback called when an error is thrown and not caught by an Error Boundary. Called with the `error` that was thrown and an `errorInfo` object containing the `componentStack`.
    *   **optional** `onRecoverableError`: Callback called when React automatically recovers from errors. Called with the `error` React throws, and an `errorInfo` object containing the `componentStack`. Some recoverable errors may include the original error cause as `error.cause`.
    *   **optional** `identifierPrefix`: A string prefix React uses for IDs generated by [`useId`.](_reference_react_useId.md) Useful to avoid conflicts when using multiple roots on the same page. Must be the same prefix as used on the server.

#### Returns

`hydrateRoot` returns an object with two methods: [`render`](_reference_react-dom_client_hydrateRoot.md#root-render) and [`unmount`.](_reference_react-dom_client_hydrateRoot.md#root-unmount)

#### Caveats

*   `hydrateRoot()` expects the rendered content to be identical with the server-rendered content. You should treat mismatches as bugs and fix them.
*   In development mode, React warns about mismatches during hydration. There are no guarantees that attribute differences will be patched up in case of mismatches. This is important for performance reasons because in most apps, mismatches are rare, and so validating all markup would be prohibitively expensive.
*   You’ll likely have only one `hydrateRoot` call in your app. If you use a framework, it might do this call for you.
*   If your app is client-rendered with no HTML rendered already, using `hydrateRoot()` is not supported. Use [`createRoot()`](_reference_react-dom_client_createRoot.md) instead.

* * *

### `root.render(reactNode)`

Call `root.render` to update a React component inside a hydrated React root for a browser DOM element.

React will update `<App />` in the hydrated `root`.

[See more examples below.](_reference_react-dom_client_hydrateRoot.md#usage)

#### Parameters

*   `reactNode`: A “React node” that you want to update. This will usually be a piece of JSX like `<App />`, but you can also pass a React element constructed with [`createElement()`](_reference_react_createElement.md), a string, a number, `null`, or `undefined`.

#### Returns

`root.render` returns `undefined`.

#### Caveats

*   If you call `root.render` before the root has finished hydrating, React will clear the existing server-rendered HTML content and switch the entire root to client rendering.

* * *

### `root.unmount()`

Call `root.unmount` to destroy a rendered tree inside a React root.

An app fully built with React will usually not have any calls to `root.unmount`.

This is mostly useful if your React root’s DOM node (or any of its ancestors) may get removed from the DOM by some other code. For example, imagine a jQuery tab panel that removes inactive tabs from the DOM. If a tab gets removed, everything inside it (including the React roots inside) would get removed from the DOM as well. You need to tell React to “stop” managing the removed root’s content by calling `root.unmount`. Otherwise, the components inside the removed root won’t clean up and free up resources like subscriptions.

Calling `root.unmount` will unmount all the components in the root and “detach” React from the root DOM node, including removing any event handlers or state in the tree.

#### Parameters

`root.unmount` does not accept any parameters.

#### Returns

`root.unmount` returns `undefined`.

#### Caveats

*   Calling `root.unmount` will unmount all the components in the tree and “detach” React from the root DOM node.

*   Once you call `root.unmount` you cannot call `root.render` again on the root. Attempting to call `root.render` on an unmounted root will throw a “Cannot update an unmounted root” error.

* * *

## Usage

### Hydrating server-rendered HTML

If your app’s HTML was generated by [`react-dom/server`](_reference_react-dom_client_createRoot.md), you need to _hydrate_ it on the client.
```
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document.getElementById('root'), );
```
This will hydrate the server HTML inside the browser DOM node with the React component for your app. Usually, you will do it once at startup. If you use a framework, it might do this behind the scenes for you.

To hydrate your app, React will “attach” your components’ logic to the initial generated HTML from the server. Hydration turns the initial HTML snapshot from the server into a fully interactive app that runs in the browser.

You shouldn’t need to call `hydrateRoot` again or to call it in more places. From this point on, React will be managing the DOM of your application. To update the UI, your components will [use state](_reference_react_useState.md) instead.

### Pitfall

The React tree you pass to `hydrateRoot` needs to produce **the same output** as it did on the server.

This is important for the user experience. The user will spend some time looking at the server-generated HTML before your JavaScript code loads. Server rendering creates an illusion that the app loads faster by showing the HTML snapshot of its output. Suddenly showing different content breaks that illusion. This is why the server render output must match the initial render output on the client.

The most common causes leading to hydration errors include:

*   Extra whitespace (like newlines) around the React-generated HTML inside the root node.
*   Using checks like `typeof window !== 'undefined'` in your rendering logic.
*   Using browser-only APIs like [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) in your rendering logic.
*   Rendering different data on the server and the client.

React recovers from some hydration errors, but **you must fix them like other bugs.** In the best case, they’ll lead to a slowdown; in the worst case, event handlers can get attached to the wrong elements.

* * *

### Hydrating an entire document

Apps fully built with React can render the entire document as JSX, including the [`<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html) tag:
```
function App() {

return (

<html>

<head>

<meta charSet="utf-8" />

<meta name="viewport" content="width=device-width, initial-scale=1" />

<link rel="stylesheet" href="/styles.css"></link>

<title>My app</title>

</head>

<body>

<Router />

</body>

</html>

);

}
```
To hydrate the entire document, pass the [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Window/document) global as the first argument to `hydrateRoot`:
```
import { hydrateRoot } from 'react-dom/client';

import App from './App.js';

hydrateRoot(document, <App />);
```
* * *

### Suppressing unavoidable hydration mismatch errors

If a single element’s attribute or text content is unavoidably different between the server and the client (for example, a timestamp), you may silence the hydration mismatch warning.

To silence hydration warnings on an element, add `suppressHydrationWarning={true}`:

This only works one level deep, and is intended to be an escape hatch. Don’t overuse it. React will **not** attempt to patch mismatched text content.

* * *

### Handling different client and server content

If you intentionally need to render something different on the server and the client, you can do a two-pass rendering. Components that render something different on the client can read a [state variable](_reference_react_useState.md) like `isClient`, which you can set to `true` in an [Effect](_reference_react_useEffect.md):

This way the initial render pass will render the same content as the server, avoiding mismatches, but an additional pass will happen synchronously right after hydration.

### Pitfall

This approach makes hydration slower because your components have to render twice. Be mindful of the user experience on slow connections. The JavaScript code may load significantly later than the initial HTML render, so rendering a different UI immediately after hydration may also feel jarring to the user.

* * *

### Updating a hydrated root component

After the root has finished hydrating, you can call [`root.render`](_reference_react-dom_client_hydrateRoot.md#root-render) to update the root React component. **Unlike with [`createRoot`](_reference_react-dom_client_createRoot.md), you don’t usually need to do this because the initial content was already rendered as HTML.**

If you call `root.render` at some point after hydration, and the component tree structure matches up with what was previously rendered, React will [preserve the state.](_learn_preserving-and-resetting-state.md) Notice how you can type in the input, which means that the updates from repeated `render` calls every second in this example are not destructive:

It is uncommon to call [`root.render`](_reference_react-dom_client_hydrateRoot.md#root-render) on a hydrated root. Usually, you’ll [update state](_reference_react_useState.md) inside one of the components instead.

### Error logging in production

By default, React will log all errors to the console. To implement your own error reporting, you can provide the optional error handler root options `onUncaughtError`, `onCaughtError` and `onRecoverableError`:
```
import { hydrateRoot } from "react-dom/client";

import App from "./App.js";

import { reportCaughtError } from "./reportError";

const container = document.getElementById("root");

const root = hydrateRoot(container, <App />, {

onCaughtError: (error, errorInfo) => {

if (error.message !== "Known error") {

reportCaughtError({

error,

componentStack: errorInfo.componentStack,

});

}

},

});
```
The onCaughtError option is a function called with two arguments:

1.  The error that was thrown.
2.  An errorInfo object that contains the componentStack of the error.

Together with `onUncaughtError` and `onRecoverableError`, you can implement your own error reporting system:
```
import { hydrateRoot } from "react-dom/client";
import App from "./App.js";
import {
  onCaughtErrorProd,
  onRecoverableErrorProd,
  onUncaughtErrorProd,
} from "./reportError";
const container = document.getElementById("root");
hydrateRoot(container, <App />, {
  onCaughtError: onCaughtErrorProd,
  onRecoverableError: onRecoverableErrorProd,
  onUncaughtError: onUncaughtErrorProd,
});
```
## Troubleshooting

### I’m getting an error: “You passed a second argument to root.render”

A common mistake is to pass the options for `hydrateRoot` to `root.render(...)`:

Warning: You passed a second argument to root.render(…) but it only accepts one argument.

To fix, pass the root options to `hydrateRoot(...)`, not `root.render(...)`:
```
// 🚩 Wrong: root.render only takes one argument.

root.render(App, {onUncaughtError});

// ✅ Correct: pass options to createRoot.

const root = hydrateRoot(container, <App />, {onUncaughtError});
```

#### _reference_react-dom_components.md

> Source: https://react.dev/reference/react-dom/components
> Scraped: 12/20/2025, 10:41:01 PM

React supports all of the browser built-in [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) and [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Element) components.

* * *

## Common components

All of the built-in browser components support some props and events.

* [Common components (e.g. ``)](_reference_react-dom_components_common.md)

This includes React-specific props like `ref` and `dangerouslySetInnerHTML`.

* * *

## Form components

These built-in browser components accept user input:

* [`<input>`](_reference_react-dom_components_input.md)
* [`<select>`](_reference_react-dom_components_select.md)
* [`<textarea>`](_reference_react-dom_components_textarea.md)

They are special in React because passing the `value` prop to them makes them _[controlled.](_reference_react-dom_components_input.md#controlling-an-input-with-a-state-variable)_

* * *

## Resource and Metadata Components

These built-in browser components let you load external resources or annotate the document with metadata:

* [`<link>`](_reference_react-dom_components_link.md)
* [`<meta>`](_reference_react-dom_components_meta.md)
* [`<script>`](_reference_react-dom_components_script.md)
* [`<style>`](_reference_react-dom_components_style.md)
* [`<title>`](_reference_react-dom_components_title.md)

They are special in React because React can render them into the document head, suspend while resources are loading, and enact other behaviors that are described on the reference page for each specific component.

* * *

## All HTML components

React supports all built-in browser HTML components. This includes:

* [`<aside>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside)
* [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
* [`<b>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b)
* [`<base>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base)
* [`<bdi>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi)
* [`<bdo>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo)
* [`<blockquote>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote)
* [`<body>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body)
* [`<br>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br)
* [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
* [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)
* [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption)
* [`<cite>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite)
* [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code)
* [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col)
* [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup)
* [`<data>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data)
* [`<datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist)
* [`<dd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd)
* [`<del>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del)
* [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
* [`<dfn>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn)
* [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
* [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div)
* [`<dl>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl)
* [`<dt>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt)
* [`<em>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em)
* [`<embed>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed)
* [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset)
* [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption)
* [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
* [`<footer>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer)
* [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
* [`<h1>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1)
* [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head)
* [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header)
* [`<hgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup)
* [`<hr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr)
* [`<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html)
* [`<i>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i)
* [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
* [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
* [`<input>`](_reference_react-dom_components_input.md)
* [`<ins>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins)
* [`<kbd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd)
* [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
* [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend)
* [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li)
* [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)
* [`<main>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main)
* [`<map>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map)
* [`<mark>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)
* [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu)
* [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
* [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter)
* [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
* [`<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript)
* [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object)
* [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol)
* [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup)
* [`<option>`](_reference_react-dom_components_option.md)
* [`<output>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output)
* [`<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p)
* [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
* [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre)
* [`<progress>`](_reference_react-dom_components_progress.md)
* [`<q>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q)
* [`<rp>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp)
* [`<rt>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt)
* [`<ruby>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby)
* [`<s>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s)
* [`<samp>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp)
* [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
* [`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section)
* [`<select>`](_reference_react-dom_components_select.md)
* [`<slot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot)
* [`<small>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small)
* [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source)
* [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span)
* [`<strong>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong)
* [`<style>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style)
* [`<sub>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub)
* [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary)
* [`<sup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup)
* [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
* [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody)
* [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td)
* [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
* [`<textarea>`](_reference_react-dom_components_textarea.md)
* [`<tfoot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot)
* [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th)
* [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead)
* [`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)
* [`<title>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)
* [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr)
* [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track)
* [`<u>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u)
* [`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)
* [`<var>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var)
* [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
* [`<wbr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr)

### Note

Similar to the [DOM standard,](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) React uses a `camelCase` convention for prop names. For example, you’ll write `tabIndex` instead of `tabindex`. You can convert existing HTML to JSX with an [online converter.](https://transform.tools/html-to-jsx)

* * *

### Custom HTML elements

If you render a tag with a dash, like `<my-element>`, React will assume you want to render a [custom HTML element.](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)

If you render a built-in browser HTML element with an [`is`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is) attribute, it will also be treated as a custom element.

#### Setting values on custom elements

Custom elements have two methods of passing data into them:

1.  Attributes: Which are displayed in markup and can only be set to string values
2.  Properties: Which are not displayed in markup and can be set to arbitrary JavaScript values

By default, React will pass values bound in JSX as attributes:
```
<my-element value="Hello, world!"></my-element>
```
Non-string JavaScript values passed to custom elements will be serialized by default:
```
// Will be passed as `"1,2,3"` as the output of `[1,2,3].toString()`

<my-element value={[1,2,3]}></my-element>
```
React will, however, recognize an custom element’s property as one that it may pass arbitrary values to if the property name shows up on the class during construction:

#### Listening for events on custom elements

A common pattern when using custom elements is that they may dispatch [`CustomEvent`s](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) rather than accept a function to call when an event occur. You can listen for these events using an `on` prefix when binding to the event via JSX.

#### _reference_react-dom_components_common.md

> Source: https://react.dev/reference/react-dom/components/common
> Scraped: 12/20/2025, 10:41:02 PM

All built-in browser components, such as [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div), support some common props and events.

* [Reference](_reference_react-dom_components_common.md#reference)
    * [Common components (e.g. ``)](_reference_react-dom_components_common.md#common)
    * [`ref` callback function](_reference_react-dom_components_common.md#ref-callback)
    * [React event object](_reference_react-dom_components_common.md#react-event-object)
    * [`AnimationEvent` handler function](_reference_react-dom_components_common.md#animationevent-handler)
    * [`ClipboardEvent` handler function](_reference_react-dom_components_common.md#clipboadevent-handler)
    * [`CompositionEvent` handler function](_reference_react-dom_components_common.md#compositionevent-handler)
    * [`DragEvent` handler function](_reference_react-dom_components_common.md#dragevent-handler)
    * [`FocusEvent` handler function](_reference_react-dom_components_common.md#focusevent-handler)
    * [`Event` handler function](_reference_react-dom_components_common.md#event-handler)
    * [`InputEvent` handler function](_reference_react-dom_components_common.md#inputevent-handler)
    * [`KeyboardEvent` handler function](_reference_react-dom_components_common.md#keyboardevent-handler)
    * [`MouseEvent` handler function](_reference_react-dom_components_common.md#mouseevent-handler)
    * [`PointerEvent` handler function](_reference_react-dom_components_common.md#pointerevent-handler)
    * [`TouchEvent` handler function](_reference_react-dom_components_common.md#touchevent-handler)
    * [`TransitionEvent` handler function](_reference_react-dom_components_common.md#transitionevent-handler)
    * [`UIEvent` handler function](_reference_react-dom_components_common.md#uievent-handler)
    * [`WheelEvent` handler function](_reference_react-dom_components_common.md#wheelevent-handler)
* [Usage](_reference_react-dom_components_common.md#usage)
    * [Applying CSS styles](_reference_react-dom_components_common.md#applying-css-styles)
    * [Manipulating a DOM node with a ref](_reference_react-dom_components_common.md#manipulating-a-dom-node-with-a-ref)
    * [Dangerously setting the inner HTML](_reference_react-dom_components_common.md#dangerously-setting-the-inner-html)
    * [Handling mouse events](_reference_react-dom_components_common.md#handling-mouse-events)
    * [Handling pointer events](_reference_react-dom_components_common.md#handling-pointer-events)
    * [Handling focus events](_reference_react-dom_components_common.md#handling-focus-events)
    * [Handling keyboard events](_reference_react-dom_components_common.md#handling-keyboard-events)

* * *

## Reference

### Common components (e.g. ``)
```
Some content
```
[See more examples below.](_reference_react-dom_components_common.md#usage)

#### Props

These special React props are supported for all built-in components:

*   `children`: A React node (an element, a string, a number, [a portal,](_reference_react-dom_createPortal.md) an empty node like `null`, `undefined` and booleans, or an array of other React nodes). Specifies the content inside the component. When you use JSX, you will usually specify the `children` prop implicitly by nesting tags like ``.

*   `dangerouslySetInnerHTML`: An object of the form `{ __html: '<p>some html</p>' }` with a raw HTML string inside. Overrides the [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property of the DOM node and displays the passed HTML inside. This should be used with extreme caution! If the HTML inside isn’t trusted (for example, if it’s based on user data), you risk introducing an [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) vulnerability. [Read more about using `dangerouslySetInnerHTML`.](_reference_react-dom_components_common.md#dangerously-setting-the-inner-html)

*   `ref`: A ref object from [`useRef`](_reference_react_useRef.md) or [`createRef`](_reference_react_createRef.md), or a [`ref` callback function,](_reference_react-dom_components_common.md#ref-callback) or a string for [legacy refs.](https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs) Your ref will be filled with the DOM element for this node. [Read more about manipulating the DOM with refs.](_reference_react-dom_components_common.md#manipulating-a-dom-node-with-a-ref)

*   `suppressContentEditableWarning`: A boolean. If `true`, suppresses the warning that React shows for elements that both have `children` and `contentEditable={true}` (which normally do not work together). Use this if you’re building a text input library that manages the `contentEditable` content manually.

*   `suppressHydrationWarning`: A boolean. If you use [server rendering,](_reference_react-dom_server.md) normally there is a warning when the server and the client render different content. In some rare cases (like timestamps), it is very hard or impossible to guarantee an exact match. If you set `suppressHydrationWarning` to `true`, React will not warn you about mismatches in the attributes and the content of that element. It only works one level deep, and is intended to be used as an escape hatch. Don’t overuse it. [Read about suppressing hydration errors.](_reference_react-dom_client_hydrateRoot.md#suppressing-unavoidable-hydration-mismatch-errors)

*   `style`: An object with CSS styles, for example `{ fontWeight: 'bold', margin: 20 }`. Similarly to the DOM [`style`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property, the CSS property names need to be written as `camelCase`, for example `fontWeight` instead of `font-weight`. You can pass strings or numbers as values. If you pass a number, like `width: 100`, React will automatically append `px` (“pixels”) to the value unless it’s a [unitless property.](https://github.com/facebook/react/blob/81d4ee9ca5c405dce62f64e61506b8e155f38d8d/packages/react-dom-bindings/src/shared/CSSProperty.js#L8-L57) We recommend using `style` only for dynamic styles where you don’t know the style values ahead of time. In other cases, applying plain CSS classes with `className` is more efficient. [Read more about `className` and `style`.](_reference_react-dom_components_common.md#applying-css-styles)

These standard DOM props are also supported for all built-in components:

* [`accessKey`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey): A string. Specifies a keyboard shortcut for the element. [Not generally recommended.](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey#accessibility_concerns)
* [`aria-*`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes): ARIA attributes let you specify the accessibility tree information for this element. See [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes) for a complete reference. In React, all ARIA attribute names are exactly the same as in HTML.
* [`autoCapitalize`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize): A string. Specifies whether and how the user input should be capitalized.
* [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className): A string. Specifies the element’s CSS class name. [Read more about applying CSS styles.](_reference_react-dom_components_common.md#applying-css-styles)
* [`contentEditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable): A boolean. If `true`, the browser lets the user edit the rendered element directly. This is used to implement rich text input libraries like [Lexical.](https://lexical.dev/) React warns if you try to pass React children to an element with `contentEditable={true}` because React will not be able to update its content after user edits.
* [`data-*`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*): Data attributes let you attach some string data to the element, for example `data-fruit="banana"`. In React, they are not commonly used because you would usually read data from props or state instead.
* [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir): Either `'ltr'` or `'rtl'`. Specifies the text direction of the element.
* [`draggable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable): A boolean. Specifies whether the element is draggable. Part of [HTML Drag and Drop API.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
* [`enterKeyHint`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/enterKeyHint): A string. Specifies which action to present for the enter key on virtual keyboards.
* [`htmlFor`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor): A string. For [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) and [`<output>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output), lets you [associate the label with some control.](_reference_react-dom_components_input.md#providing-a-label-for-an-input) Same as [`for` HTML attribute.](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for) React uses the standard DOM property names (`htmlFor`) instead of HTML attribute names.
* [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden): A boolean or a string. Specifies whether the element should be hidden.
* [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id): A string. Specifies a unique identifier for this element, which can be used to find it later or connect it with other elements. Generate it with [`useId`](_reference_react_useId.md) to avoid clashes between multiple instances of the same component.
* [`is`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is): A string. If specified, the component will behave like a [custom element.](_reference_react-dom_components.md#custom-html-elements)
* [`inputMode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode): A string. Specifies what kind of keyboard to display (for example, text, number or telephone).
* [`itemProp`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop): A string. Specifies which property the element represents for structured data crawlers.
* [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang): A string. Specifies the language of the element.
* [`onAnimationEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event): An [`AnimationEvent` handler](_reference_react-dom_components_common.md#animationevent-handler) function. Fires when a CSS animation completes.
*   `onAnimationEndCapture`: A version of `onAnimationEnd` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onAnimationIteration`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationiteration_event): An [`AnimationEvent` handler](_reference_react-dom_components_common.md#animationevent-handler) function. Fires when an iteration of a CSS animation ends, and another one begins.
*   `onAnimationIterationCapture`: A version of `onAnimationIteration` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onAnimationStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event): An [`AnimationEvent` handler](_reference_react-dom_components_common.md#animationevent-handler) function. Fires when a CSS animation starts.
*   `onAnimationStartCapture`: `onAnimationStart`, but fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onAuxClick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event): A [`MouseEvent` handler](_reference_react-dom_components_common.md#mouseevent-handler) function. Fires when a non-primary pointer button was clicked.
*   `onAuxClickCapture`: A version of `onAuxClick` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
*   `onBeforeInput`: An [`InputEvent` handler](_reference_react-dom_components_common.md#inputevent-handler) function. Fires before the value of an editable element is modified. React does _not_ yet use the native [`beforeinput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event) event, and instead attempts to polyfill it using other events.
*   `onBeforeInputCapture`: A version of `onBeforeInput` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
*   `onBlur`: A [`FocusEvent` handler](_reference_react-dom_components_common.md#focusevent-handler) function. Fires when an element lost focus. Unlike the built-in browser [`blur`](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) event, in React the `onBlur` event bubbles.
*   `onBlurCapture`: A version of `onBlur` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onClick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event): A [`MouseEvent` handler](_reference_react-dom_components_common.md#mouseevent-handler) function. Fires when the primary button was clicked on the pointing device.
*   `onClickCapture`: A version of `onClick` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onCompositionStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event): A [`CompositionEvent` handler](_reference_react-dom_components_common.md#compositionevent-handler) function. Fires when an [input method editor](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) starts a new composition session.
*   `onCompositionStartCapture`: A version of `onCompositionStart` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onCompositionEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event): A [`CompositionEvent` handler](_reference_react-dom_components_common.md#compositionevent-handler) function. Fires when an [input method editor](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) completes or cancels a composition session.
*   `onCompositionEndCapture`: A version of `onCompositionEnd` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onCompositionUpdate`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event): A [`CompositionEvent` handler](_reference_react-dom_components_common.md#compositionevent-handler) function. Fires when an [input method editor](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) receives a new character.
*   `onCompositionUpdateCapture`: A version of `onCompositionUpdate` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onContextMenu`](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event): A [`MouseEvent` handler](_reference_react-dom_components_common.md#mouseevent-handler) function. Fires when the user tries to open a context menu.
*   `onContextMenuCapture`: A version of `onContextMenu` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onCopy`](https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event): A [`ClipboardEvent` handler](_reference_react-dom_components_common.md#clipboardevent-handler) function. Fires when the user tries to copy something into the clipboard.
*   `onCopyCapture`: A version of `onCopy` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onCut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/cut_event): A [`ClipboardEvent` handler](_reference_react-dom_components_common.md#clipboardevent-handler) function. Fires when the user tries to cut something into the clipboard.
*   `onCutCapture`: A version of `onCut` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
*   `onDoubleClick`: A [`MouseEvent` handler](_reference_react-dom_components_common.md#mouseevent-handler) function. Fires when the user clicks twice. Corresponds to the browser [`dblclick` event.](https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event)
*   `onDoubleClickCapture`: A version of `onDoubleClick` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onDrag`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event): A [`DragEvent` handler](_reference_react-dom_components_common.md#dragevent-handler) function. Fires while the user is dragging something.
*   `onDragCapture`: A version of `onDrag` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onDragEnd`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event): A [`DragEvent` handler](_reference_react-dom_components_common.md#dragevent-handler) function. Fires when the user stops dragging something.
*   `onDragEndCapture`: A version of `onDragEnd` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onDragEnter`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter_event): A [`DragEvent` handler](_reference_react-dom_components_common.md#dragevent-handler) function. Fires when the dragged content enters a valid drop target.
*   `onDragEnterCapture`: A version of `onDragEnter` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onDragOver`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event): A [`DragEvent` handler](_reference_react-dom_components_common.md#dragevent-handler) function. Fires on a valid drop target while the dragged content is dragged over it. You must call `e.preventDefault()` here to allow dropping.
*   `onDragOverCapture`: A version of `onDragOver` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onDragStart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event): A [`DragEvent` handler](_reference_react-dom_components_common.md#dragevent-handler) function. Fires when the user starts dragging an element.
*   `onDragStartCapture`: A version of `onDragStart` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onDrop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event): A [`DragEvent` handler](_reference_react-dom_components_common.md#dragevent-handler) function. Fires when something is dropped on a valid drop target.
*   `onDropCapture`: A version of `onDrop` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
*   `onFocus`: A [`FocusEvent` handler](_reference_react-dom_components_common.md#focusevent-handler) function. Fires when an element receives focus. Unlike the built-in browser [`focus`](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event) event, in React the `onFocus` event bubbles.
*   `onFocusCapture`: A version of `onFocus` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onGotPointerCapture`](https://developer.mozilla.org/en-US/docs/Web/API/Element/gotpointercapture_event): A [`PointerEvent` handler](_reference_react-dom_components_common.md#pointerevent-handler) function. Fires when an element programmatically captures a pointer.
*   `onGotPointerCaptureCapture`: A version of `onGotPointerCapture` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onKeyDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event): A [`KeyboardEvent` handler](_reference_react-dom_components_common.md#keyboardevent-handler) function. Fires when a key is pressed.
*   `onKeyDownCapture`: A version of `onKeyDown` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onKeyPress`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event): A [`KeyboardEvent` handler](_reference_react-dom_components_common.md#keyboardevent-handler) function. Deprecated. Use `onKeyDown` or `onBeforeInput` instead.
*   `onKeyPressCapture`: A version of `onKeyPress` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onKeyUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event): A [`KeyboardEvent` handler](_reference_react-dom_components_common.md#keyboardevent-handler) function. Fires when a key is released.
*   `onKeyUpCapture`: A version of `onKeyUp` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onLostPointerCapture`](https://developer.mozilla.org/en-US/docs/Web/API/Element/lostpointercapture_event): A [`PointerEvent` handler](_reference_react-dom_components_common.md#pointerevent-handler) function. Fires when an element stops capturing a pointer.
*   `onLostPointerCaptureCapture`: A version of `onLostPointerCapture` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onMouseDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event): A [`MouseEvent` handler](_reference_react-dom_components_common.md#mouseevent-handler) function. Fires when the pointer is pressed down.
*   `onMouseDownCapture`: A version of `onMouseDown` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onMouseEnter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event): A [`MouseEvent` handler](_reference_react-dom_components_common.md#mouseevent-handler) function. Fires when the pointer moves inside an element. Does not have a capture phase. Instead, `onMouseLeave` and `onMouseEnter` propagate from the element being left to the one being entered.
* [`onMouseLeave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event): A [`MouseEvent` handler](_reference_react-dom_components_common.md#mouseevent-handler) function. Fires when the pointer moves outside an element. Does not have a capture phase. Instead, `onMouseLeave` and `onMouseEnter` propagate from the element being left to the one being entered.
* [`onMouseMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event): A [`MouseEvent` handler](_reference_react-dom_components_common.md#mouseevent-handler) function. Fires when the pointer changes coordinates.
*   `onMouseMoveCapture`: A version of `onMouseMove` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onMouseOut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event): A [`MouseEvent` handler](_reference_react-dom_components_common.md#mouseevent-handler) function. Fires when the pointer moves outside an element, or if it moves into a child element.
*   `onMouseOutCapture`: A version of `onMouseOut` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onMouseUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event): A [`MouseEvent` handler](_reference_react-dom_components_common.md#mouseevent-handler) function. Fires when the pointer is released.
*   `onMouseUpCapture`: A version of `onMouseUp` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onPointerCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointercancel_event): A [`PointerEvent` handler](_reference_react-dom_components_common.md#pointerevent-handler) function. Fires when the browser cancels a pointer interaction.
*   `onPointerCancelCapture`: A version of `onPointerCancel` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onPointerDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerdown_event): A [`PointerEvent` handler](_reference_react-dom_components_common.md#pointerevent-handler) function. Fires when a pointer becomes active.
*   `onPointerDownCapture`: A version of `onPointerDown` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onPointerEnter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerenter_event): A [`PointerEvent` handler](_reference_react-dom_components_common.md#pointerevent-handler) function. Fires when a pointer moves inside an element. Does not have a capture phase. Instead, `onPointerLeave` and `onPointerEnter` propagate from the element being left to the one being entered.
* [`onPointerLeave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerleave_event): A [`PointerEvent` handler](_reference_react-dom_components_common.md#pointerevent-handler) function. Fires when a pointer moves outside an element. Does not have a capture phase. Instead, `onPointerLeave` and `onPointerEnter` propagate from the element being left to the one being entered.
* [`onPointerMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event): A [`PointerEvent` handler](_reference_react-dom_components_common.md#pointerevent-handler) function. Fires when a pointer changes coordinates.
*   `onPointerMoveCapture`: A version of `onPointerMove` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onPointerOut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event): A [`PointerEvent` handler](_reference_react-dom_components_common.md#pointerevent-handler) function. Fires when a pointer moves outside an element, if the pointer interaction is cancelled, and [a few other reasons.](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event)
*   `onPointerOutCapture`: A version of `onPointerOut` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onPointerUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerup_event): A [`PointerEvent` handler](_reference_react-dom_components_common.md#pointerevent-handler) function. Fires when a pointer is no longer active.
*   `onPointerUpCapture`: A version of `onPointerUp` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onPaste`](https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event): A [`ClipboardEvent` handler](_reference_react-dom_components_common.md#clipboardevent-handler) function. Fires when the user tries to paste something from the clipboard.
*   `onPasteCapture`: A version of `onPaste` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onScroll`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when an element has been scrolled. This event does not bubble.
*   `onScrollCapture`: A version of `onScroll` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onSelect`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires after the selection inside an editable element like an input changes. React extends the `onSelect` event to work for `contentEditable={true}` elements as well. In addition, React extends it to fire for empty selection and on edits (which may affect the selection).
*   `onSelectCapture`: A version of `onSelect` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onTouchCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event): A [`TouchEvent` handler](_reference_react-dom_components_common.md#touchevent-handler) function. Fires when the browser cancels a touch interaction.
*   `onTouchCancelCapture`: A version of `onTouchCancel` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onTouchEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event): A [`TouchEvent` handler](_reference_react-dom_components_common.md#touchevent-handler) function. Fires when one or more touch points are removed.
*   `onTouchEndCapture`: A version of `onTouchEnd` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onTouchMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchmove_event): A [`TouchEvent` handler](_reference_react-dom_components_common.md#touchevent-handler) function. Fires one or more touch points are moved.
*   `onTouchMoveCapture`: A version of `onTouchMove` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onTouchStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event): A [`TouchEvent` handler](_reference_react-dom_components_common.md#touchevent-handler) function. Fires when one or more touch points are placed.
*   `onTouchStartCapture`: A version of `onTouchStart` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onTransitionEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event): A [`TransitionEvent` handler](_reference_react-dom_components_common.md#transitionevent-handler) function. Fires when a CSS transition completes.
*   `onTransitionEndCapture`: A version of `onTransitionEnd` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onWheel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event): A [`WheelEvent` handler](_reference_react-dom_components_common.md#wheelevent-handler) function. Fires when the user rotates a wheel button.
*   `onWheelCapture`: A version of `onWheel` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`role`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles): A string. Specifies the element role explicitly for assistive technologies.
* [`slot`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles): A string. Specifies the slot name when using shadow DOM. In React, an equivalent pattern is typically achieved by passing JSX as props, for example `<Layout left={<Sidebar />} right={<Content />} />`.
* [`spellCheck`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck): A boolean or null. If explicitly set to `true` or `false`, enables or disables spellchecking.
* [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex): A number. Overrides the default Tab button behavior. [Avoid using values other than `-1` and `0`.](https://www.tpgi.com/using-the-tabindex-attribute/)
* [`title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title): A string. Specifies the tooltip text for the element.
* [`translate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/translate): Either `'yes'` or `'no'`. Passing `'no'` excludes the element content from being translated.

You can also pass custom attributes as props, for example `mycustomprop="someValue"`. This can be useful when integrating with third-party libraries. The custom attribute name must be lowercase and must not start with `on`. The value will be converted to a string. If you pass `null` or `undefined`, the custom attribute will be removed.

These events fire only for the [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) elements:

* [`onReset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when a form gets reset.
*   `onResetCapture`: A version of `onReset` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onSubmit`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when a form gets submitted.
*   `onSubmitCapture`: A version of `onSubmit` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)

These events fire only for the [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) elements. Unlike browser events, they bubble in React:

* [`onCancel`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the user tries to dismiss the dialog.
*   `onCancelCapture`: A version of `onCancel` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onClose`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when a dialog has been closed.
*   `onCloseCapture`: A version of `onClose` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)

These events fire only for the [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) elements. Unlike browser events, they bubble in React:

* [`onToggle`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDetailsElement/toggle_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the user toggles the details.
*   `onToggleCapture`: A version of `onToggle` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)

These events fire for [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe), [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object), [`<embed>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed), [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link), and [SVG `<image>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_Image_Tag) elements. Unlike browser events, they bubble in React:

*   `onLoad`: An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the resource has loaded.
*   `onLoadCapture`: A version of `onLoad` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onError`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the resource could not be loaded.
*   `onErrorCapture`: A version of `onError` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)

These events fire for resources like [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) and [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video). Unlike browser events, they bubble in React:

* [`onAbort`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/abort_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the resource has not fully loaded, but not due to an error.
*   `onAbortCapture`: A version of `onAbort` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onCanPlay`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when there’s enough data to start playing, but not enough to play to the end without buffering.
*   `onCanPlayCapture`: A version of `onCanPlay` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onCanPlayThrough`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when there’s enough data that it’s likely possible to start playing without buffering until the end.
*   `onCanPlayThroughCapture`: A version of `onCanPlayThrough` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onDurationChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the media duration has updated.
*   `onDurationChangeCapture`: A version of `onDurationChange` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onEmptied`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the media has become empty.
*   `onEmptiedCapture`: A version of `onEmptied` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onEncrypted`](https://w3c.github.io/encrypted-media/#dom-evt-encrypted): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the browser encounters encrypted media.
*   `onEncryptedCapture`: A version of `onEncrypted` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onEnded`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the playback stops because there’s nothing left to play.
*   `onEndedCapture`: A version of `onEnded` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onError`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the resource could not be loaded.
*   `onErrorCapture`: A version of `onError` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onLoadedData`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the current playback frame has loaded.
*   `onLoadedDataCapture`: A version of `onLoadedData` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onLoadedMetadata`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when metadata has loaded.
*   `onLoadedMetadataCapture`: A version of `onLoadedMetadata` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onLoadStart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the browser started loading the resource.
*   `onLoadStartCapture`: A version of `onLoadStart` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onPause`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the media was paused.
*   `onPauseCapture`: A version of `onPause` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onPlay`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the media is no longer paused.
*   `onPlayCapture`: A version of `onPlay` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onPlaying`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the media starts or restarts playing.
*   `onPlayingCapture`: A version of `onPlaying` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onProgress`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires periodically while the resource is loading.
*   `onProgressCapture`: A version of `onProgress` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onRateChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when playback rate changes.
*   `onRateChangeCapture`: A version of `onRateChange` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
*   `onResize`: An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when video changes size.
*   `onResizeCapture`: A version of `onResize` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onSeeked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when a seek operation completes.
*   `onSeekedCapture`: A version of `onSeeked` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onSeeking`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when a seek operation starts.
*   `onSeekingCapture`: A version of `onSeeking` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onStalled`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the browser is waiting for data but it keeps not loading.
*   `onStalledCapture`: A version of `onStalled` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onSuspend`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when loading the resource was suspended.
*   `onSuspendCapture`: A version of `onSuspend` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onTimeUpdate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the current playback time updates.
*   `onTimeUpdateCapture`: A version of `onTimeUpdate` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onVolumeChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the volume has changed.
*   `onVolumeChangeCapture`: A version of `onVolumeChange` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onWaiting`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires when the playback stopped due to temporary lack of data.
*   `onWaitingCapture`: A version of `onWaiting` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)

#### Caveats

*   You cannot pass both `children` and `dangerouslySetInnerHTML` at the same time.
*   Some events (like `onAbort` and `onLoad`) don’t bubble in the browser, but bubble in React.

* * *

### `ref` callback function

Instead of a ref object (like the one returned by [`useRef`](_reference_react_useRef.md#manipulating-the-dom-with-a-ref)), you may pass a function to the `ref` attribute.
```
 {

console.log('Attached', node);

return () => {

console.log('Clean up', node)

}

}}>
```
[See an example of using the `ref` callback.](_learn_manipulating-the-dom-with-refs.md#how-to-manage-a-list-of-refs-using-a-ref-callback)

When the `` DOM node is added to the screen, React will call your `ref` callback with the DOM `node` as the argument. When that `` DOM node is removed, React will call your the cleanup function returned from the callback.

React will also call your `ref` callback whenever you pass a _different_ `ref` callback. In the above example, `(node) => { ... }` is a different function on every render. When your component re-renders, the _previous_ function will be called with `null` as the argument, and the _next_ function will be called with the DOM node.

#### Parameters

*   `node`: A DOM node. React will pass you the DOM node when the ref gets attached. Unless you pass the same function reference for the `ref` callback on every render, the callback will get temporarily cleanup and re-create during every re-render of the component.

### Note

#### React 19 added cleanup functions for `ref` callbacks.

To support backwards compatibility, if a cleanup function is not returned from the `ref` callback, `node` will be called with `null` when the `ref` is detached. This behavior will be removed in a future version.

#### Returns

*   **optional** `cleanup function`: When the `ref` is detached, React will call the cleanup function. If a function is not returned by the `ref` callback, React will call the callback again with `null` as the argument when the `ref` gets detached. This behavior will be removed in a future version.

#### Caveats

*   When Strict Mode is on, React will **run one extra development-only setup+cleanup cycle** before the first real setup. This is a stress-test that ensures that your cleanup logic “mirrors” your setup logic and that it stops or undoes whatever the setup is doing. If this causes a problem, implement the cleanup function.
*   When you pass a _different_ `ref` callback, React will call the _previous_ callback’s cleanup function if provided. If no cleanup function is defined, the `ref` callback will be called with `null` as the argument. The _next_ function will be called with the DOM node.

* * *

### React event object

Your event handlers will receive a _React event object._ It is also sometimes known as a “synthetic event”.
```
<button onClick={e => {

console.log(e); // React event object

}} />
```
It conforms to the same standard as the underlying DOM events, but fixes some browser inconsistencies.

Some React events do not map directly to the browser’s native events. For example in `onMouseLeave`, `e.nativeEvent` will point to a `mouseout` event. The specific mapping is not part of the public API and may change in the future. If you need the underlying browser event for some reason, read it from `e.nativeEvent`.

#### Properties

React event objects implement some of the standard [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) properties:

* [`bubbles`](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles): A boolean. Returns whether the event bubbles through the DOM.
* [`cancelable`](https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable): A boolean. Returns whether the event can be canceled.
* [`currentTarget`](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget): A DOM node. Returns the node to which the current handler is attached in the React tree.
* [`defaultPrevented`](https://developer.mozilla.org/en-US/docs/Web/API/Event/defaultPrevented): A boolean. Returns whether `preventDefault` was called.
* [`eventPhase`](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase): A number. Returns which phase the event is currently in.
* [`isTrusted`](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted): A boolean. Returns whether the event was initiated by user.
* [`target`](https://developer.mozilla.org/en-US/docs/Web/API/Event/target): A DOM node. Returns the node on which the event has occurred (which could be a distant child).
* [`timeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp): A number. Returns the time when the event occurred.

Additionally, React event objects provide these properties:

*   `nativeEvent`: A DOM [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event). The original browser event object.

#### Methods

React event objects implement some of the standard [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) methods:

* [`preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault): Prevents the default browser action for the event.
* [`stopPropagation()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation): Stops the event propagation through the React tree.

Additionally, React event objects provide these methods:

*   `isDefaultPrevented()`: Returns a boolean value indicating whether `preventDefault` was called.
*   `isPropagationStopped()`: Returns a boolean value indicating whether `stopPropagation` was called.
*   `persist()`: Not used with React DOM. With React Native, call this to read event’s properties after the event.
*   `isPersistent()`: Not used with React DOM. With React Native, returns whether `persist` has been called.

#### Caveats

*   The values of `currentTarget`, `eventPhase`, `target`, and `type` reflect the values your React code expects. Under the hood, React attaches event handlers at the root, but this is not reflected in React event objects. For example, `e.currentTarget` may not be the same as the underlying `e.nativeEvent.currentTarget`. For polyfilled events, `e.type` (React event type) may differ from `e.nativeEvent.type` (underlying type).

* * *

### `AnimationEvent` handler function

An event handler type for the [CSS animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) events.
```
 console.log('onAnimationStart')}

onAnimationIteration={e => console.log('onAnimationIteration')}

onAnimationEnd={e => console.log('onAnimationEnd')}

/>
```
#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`AnimationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent) properties:
    * [`animationName`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent/animationName)
    * [`elapsedTime`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent/elapsedTime)
    * [`pseudoElement`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent/pseudoElement)

* * *

### `ClipboardEvent` handler function

An event handler type for the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) events.
```
<input

onCopy={e => console.log('onCopy')}

onCut={e => console.log('onCut')}

onPaste={e => console.log('onPaste')}

/>
```
#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`ClipboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent) properties:

    * [`clipboardData`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent/clipboardData)

* * *

### `CompositionEvent` handler function

An event handler type for the [input method editor (IME)](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) events.
```
<input

onCompositionStart={e => console.log('onCompositionStart')}

onCompositionUpdate={e => console.log('onCompositionUpdate')}

onCompositionEnd={e => console.log('onCompositionEnd')}

/>
```
#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`CompositionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent) properties:
    * [`data`](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent/data)

* * *

### `DragEvent` handler function

An event handler type for the [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) events.
```
<>

 console.log('onDragStart')}

onDragEnd={e => console.log('onDragEnd')}

>

    Drag source

 console.log('onDragEnter')}

onDragLeave={e => console.log('onDragLeave')}

onDragOver={e => { e.preventDefault(); console.log('onDragOver'); }}

onDrop={e => console.log('onDrop')}

>

    Drop target

</>
```
#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent) properties:

    * [`dataTransfer`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer)

    It also includes the inherited [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) properties:

    * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
    * [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
    * [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
    * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
    * [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
    * [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
    * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
    * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
    * [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
    * [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
    * [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
    * [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
    * [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
    * [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
    * [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
    * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)

    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:

    * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `FocusEvent` handler function

An event handler type for the focus events.
```
<input

onFocus={e => console.log('onFocus')}

onBlur={e => console.log('onBlur')}

/>
```
[See an example.](_reference_react-dom_components_common.md#handling-focus-events)

#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`FocusEvent`](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent) properties:

    * [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget)

    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:

    * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `Event` handler function

An event handler type for generic events.

#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with no additional properties.

* * *

### `InputEvent` handler function

An event handler type for the `onBeforeInput` event.
```
<input onBeforeInput={e => console.log('onBeforeInput')} />
```
#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`InputEvent`](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent) properties:
    * [`data`](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/data)

* * *

### `KeyboardEvent` handler function

An event handler type for keyboard events.
```
<input

onKeyDown={e => console.log('onKeyDown')}

onKeyUp={e => console.log('onKeyUp')}

/>
```
[See an example.](_reference_react-dom_components_common.md#handling-keyboard-events)

#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) properties:

    * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/altKey)
    * [`charCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode)
    * [`code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
    * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey)
    * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState)
    * [`key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
    * [`keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)
    * [`locale`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/locale)
    * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey)
    * [`location`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location)
    * [`repeat`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat)
    * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey)
    * [`which`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which)

    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:

    * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `MouseEvent` handler function

An event handler type for mouse events.
```
 console.log('onClick')}

onMouseEnter={e => console.log('onMouseEnter')}

onMouseOver={e => console.log('onMouseOver')}

onMouseDown={e => console.log('onMouseDown')}

onMouseUp={e => console.log('onMouseUp')}

onMouseLeave={e => console.log('onMouseLeave')}

/>
```
[See an example.](_reference_react-dom_components_common.md#handling-mouse-events)

#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) properties:

    * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
    * [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
    * [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
    * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
    * [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
    * [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
    * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
    * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
    * [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
    * [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
    * [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
    * [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
    * [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
    * [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
    * [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
    * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)

    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:

    * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `PointerEvent` handler function

An event handler type for [pointer events.](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
```
 console.log('onPointerEnter')}

onPointerMove={e => console.log('onPointerMove')}

onPointerDown={e => console.log('onPointerDown')}

onPointerUp={e => console.log('onPointerUp')}

onPointerLeave={e => console.log('onPointerLeave')}

/>
```
[See an example.](_reference_react-dom_components_common.md#handling-pointer-events)

#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) properties:

    * [`height`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/height)
    * [`isPrimary`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/isPrimary)
    * [`pointerId`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerId)
    * [`pointerType`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType)
    * [`pressure`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pressure)
    * [`tangentialPressure`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tangentialPressure)
    * [`tiltX`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltX)
    * [`tiltY`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltY)
    * [`twist`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/twist)
    * [`width`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/width)

    It also includes the inherited [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) properties:

    * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
    * [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
    * [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
    * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
    * [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
    * [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
    * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
    * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
    * [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
    * [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
    * [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
    * [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
    * [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
    * [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
    * [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
    * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)

    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:

    * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `TouchEvent` handler function

An event handler type for [touch events.](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
```
 console.log('onTouchStart')}

onTouchMove={e => console.log('onTouchMove')}

onTouchEnd={e => console.log('onTouchEnd')}

onTouchCancel={e => console.log('onTouchCancel')}

/>
```
#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`TouchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) properties:

    * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/altKey)
    * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/ctrlKey)
    * [`changedTouches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/changedTouches)
    * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/getModifierState)
    * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/metaKey)
    * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/shiftKey)
    * [`touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches)
    * [`targetTouches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/targetTouches)

    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:

    * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `TransitionEvent` handler function

An event handler type for the CSS transition events.
```
 console.log('onTransitionEnd')}

/>
```
#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`TransitionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent) properties:
    * [`elapsedTime`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/elapsedTime)
    * [`propertyName`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/propertyName)
    * [`pseudoElement`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/pseudoElement)

* * *

### `UIEvent` handler function

An event handler type for generic UI events.
```
 console.log('onScroll')}

/>
```
#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:
    * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `WheelEvent` handler function

An event handler type for the `onWheel` event.
```
 console.log('onWheel')}

/>
```
#### Parameters

*   `e`: A [React event object](_reference_react-dom_components_common.md#react-event-object) with these extra [`WheelEvent`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent) properties:

    * [`deltaMode`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode)
    * [`deltaX`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaX)
    * [`deltaY`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaY)
    * [`deltaZ`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaZ)

    It also includes the inherited [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) properties:

    * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
    * [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
    * [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
    * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
    * [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
    * [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
    * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
    * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
    * [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
    * [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
    * [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
    * [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
    * [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
    * [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
    * [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
    * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)

    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:

    * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

## Usage

### Applying CSS styles

In React, you specify a CSS class with [`className`.](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) It works like the `class` attribute in HTML:
```
<img className="avatar" />
```
Then you write the CSS rules for it in a separate CSS file:
```
/* In your CSS */

.avatar {

border-radius: 50%;

}
```
React does not prescribe how you add CSS files. In the simplest case, you’ll add a [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) tag to your HTML. If you use a build tool or a framework, consult its documentation to learn how to add a CSS file to your project.

Sometimes, the style values depend on data. Use the `style` attribute to pass some styles dynamically:
```
<img

className="avatar"

style={{

width: user.imageSize,

height: user.imageSize

}}

/>
```
In the above example, `style={{}}` is not a special syntax, but a regular `{}` object inside the `style={ }` [JSX curly braces.](_learn_javascript-in-jsx-with-curly-braces.md) We recommend only using the `style` attribute when your styles depend on JavaScript variables.

##### Deep Dive

#### How to apply multiple CSS classes conditionally?

To apply CSS classes conditionally, you need to produce the `className` string yourself using JavaScript.

For example, `className={'row ' + (isSelected ? 'selected': '')}` will produce either `className="row"` or `className="row selected"` depending on whether `isSelected` is `true`.

To make this more readable, you can use a tiny helper library like [`classnames`:](https://github.com/JedWatson/classnames)
```
import cn from 'classnames';

function Row({ isSelected }) {

return (

      ...

);

}
```
It is especially convenient if you have multiple conditional classes:
```
import cn from 'classnames';

function Row({ isSelected, size }) {

return (

      ...

);

}
```
* * *

### Manipulating a DOM node with a ref

Sometimes, you’ll need to get the browser DOM node associated with a tag in JSX. For example, if you want to focus an `<input>` when a button is clicked, you need to call [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the browser `<input>` DOM node.

To obtain the browser DOM node for a tag, [declare a ref](_reference_react_useRef.md) and pass it as the `ref` attribute to that tag:
```
import { useRef } from 'react';

export default function Form() {

const inputRef = useRef(null);

// ...

return (

<input ref={inputRef} />

// ...
```
React will put the DOM node into `inputRef.current` after it’s been rendered to the screen.

Read more about [manipulating DOM with refs](_learn_manipulating-the-dom-with-refs.md) and [check out more examples.](_reference_react_useRef.md#usage)

For more advanced use cases, the `ref` attribute also accepts a [callback function.](_reference_react-dom_components_common.md#ref-callback)

* * *

### Dangerously setting the inner HTML

You can pass a raw HTML string to an element like so:
```
const markup = { __html: '

some raw html

' };

return ;
```
**This is dangerous. As with the underlying DOM [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property, you must exercise extreme caution! Unless the markup is coming from a completely trusted source, it is trivial to introduce an [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) vulnerability this way.**

For example, if you use a Markdown library that converts Markdown to HTML, you trust that its parser doesn’t contain bugs, and the user only sees their own input, you can display the resulting HTML like this:

The `{__html}` object should be created as close to where the HTML is generated as possible, like the above example does in the `renderMarkdownToHTML` function. This ensures that all raw HTML being used in your code is explicitly marked as such, and that only variables that you expect to contain HTML are passed to `dangerouslySetInnerHTML`. It is not recommended to create the object inline like ``.

To see why rendering arbitrary HTML is dangerous, replace the code above with this:
```
const post = {

// Imagine this content is stored in the database.

content: `![]()`

};

export default function MarkdownPreview() {

// 🔴 SECURITY HOLE: passing untrusted input to dangerouslySetInnerHTML

const markup = { __html: post.content };

return ;

}
```
The code embedded in the HTML will run. A hacker could use this security hole to steal user information or to perform actions on their behalf. **Only use `dangerouslySetInnerHTML` with trusted and sanitized data.** * *

### Handling mouse events

This example shows some common [mouse events](_reference_react-dom_components_common.md#mouseevent-handler) and when they fire.

* * *

### Handling pointer events

This example shows some common [pointer events](_reference_react-dom_components_common.md#pointerevent-handler) and when they fire.

* * *

### Handling focus events

In React, [focus events](_reference_react-dom_components_common.md#focusevent-handler) bubble. You can use the `currentTarget` and `relatedTarget` to differentiate if the focusing or blurring events originated from outside of the parent element. The example shows how to detect focusing a child, focusing the parent element, and how to detect focus entering or leaving the whole subtree.

* * *

### Handling keyboard events

This example shows some common [keyboard events](_reference_react-dom_components_common.md#keyboardevent-handler) and when they fire.

#### _reference_react-dom_components_form.md

> Source: https://react.dev/reference/react-dom/components/form
> Scraped: 12/20/2025, 10:41:01 PM

### Handle form submission with a Server Function

Render a `<form>` with an input and submit button. Pass a Server Function (a function marked with [`'use server'`](_reference_rsc_use-server.md)) to the `action` prop of form to run the function when the form is submitted.

Passing a Server Function to `<form action>` allow users to submit forms without JavaScript enabled or before the code has loaded. This is beneficial to users who have a slow connection, device, or have JavaScript disabled and is similar to the way forms work when a URL is passed to the `action` prop.

You can use hidden form fields to provide data to the `<form>`’s action. The Server Function will be called with the hidden form field data as an instance of [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).
```
import { updateCart } from './lib.js';

function AddToCart({productId}) {

async function addToCart(formData) {

'use server'

const productId = formData.get('productId')

await updateCart(productId)

}

return (

<form action={addToCart}>

<input type="hidden" name="productId" value={productId} />

<button type="submit">Add to Cart</button>

</form>

);

}
```
In lieu of using hidden form fields to provide data to the `<form>`’s action, you can call the `bind` method to supply it with extra arguments. This will bind a new argument (`productId`) to the function in addition to the `formData` that is passed as an argument to the function.
```
import { updateCart } from './lib.js';

function AddToCart({productId}) {

async function addToCart(productId, formData) {

"use server";

await updateCart(productId)

}

const addProductToCart = addToCart.bind(null, productId);

return (

<form action={addProductToCart}>

<button type="submit">Add to Cart</button>

</form>

);

}
```
When `<form>` is rendered by a [Server Component](_reference_rsc_use-client.md), and a [Server Function](_reference_rsc_server-functions.md) is passed to the `<form>`’s `action` prop, the form is [progressively enhanced](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement).

### Display a pending state during form submission

To display a pending state when a form is being submitted, you can call the `useFormStatus` Hook in a component rendered in a `<form>` and read the `pending` property returned.

Here, we use the `pending` property to indicate the form is submitting.
```
import { useFormStatus } from "react-dom";
import { submitForm } from "./actions.js";
function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
function Form({ action }) {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}
export default function App() {
  return <Form action={submitForm} />;
}
```
To learn more about the `useFormStatus` Hook see the [reference documentation](_reference_react-dom_hooks_useFormStatus.md).

### Optimistically updating form data

The `useOptimistic` Hook provides a way to optimistically update the user interface before a background operation, like a network request, completes. In the context of forms, this technique helps to make apps feel more responsive. When a user submits a form, instead of waiting for the server’s response to reflect the changes, the interface is immediately updated with the expected outcome.

For example, when a user types a message into the form and hits the “Send” button, the `useOptimistic` Hook allows the message to immediately appear in the list with a “Sending…” label, even before the message is actually sent to a server. This “optimistic” approach gives the impression of speed and responsiveness. The form then attempts to truly send the message in the background. Once the server confirms the message has been received, the “Sending…” label is removed.
```
import { useOptimistic, useState, useRef } from "react";
import { deliverMessage } from "./actions.js";
function Thread({ messages, sendMessage }) {
  const formRef = useRef();
  async function formAction(formData) {
    addOptimisticMessage(formData.get("message"));
    formRef.current.reset();
    await sendMessage(formData);
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
    ]
  );
  return (
    <>
      {optimisticMessages.map((message, index) => (

          {message.text}
          {!!message.sending && <small> (Sending...)</small>}

      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello there!", sending: false, key: 1 }
  ]);
  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get("message"));
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }
  return ;
}
```
### Handling form submission errors

In some cases the function called by a `<form>`’s `action` prop throws an error. You can handle these errors by wrapping `<form>` in an Error Boundary. If the function called by a `<form>`’s `action` prop throws an error, the fallback for the error boundary will be displayed.
```
import { ErrorBoundary } from "react-error-boundary";
export default function Search() {
  function search() {
    throw new Error("search error");
  }
  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <form action={search}>
        <input name="query" />
        <button type="submit">Search</button>
      </form>
    </ErrorBoundary>
  );
}
```
### Display a form submission error without JavaScript

Displaying a form submission error message before the JavaScript bundle loads for progressive enhancement requires that:

1.  `<form>` be rendered by a [Client Component](_reference_rsc_use-client.md)
2.  the function passed to the `<form>`’s `action` prop be a [Server Function](_reference_rsc_server-functions.md)
3.  the `useActionState` Hook be used to display the error message

`useActionState` takes two parameters: a [Server Function](_reference_rsc_server-functions.md) and an initial state. `useActionState` returns two values, a state variable and an action. The action returned by `useActionState` should be passed to the `action` prop of the form. The state variable returned by `useActionState` can be used to display an error message. The value returned by the Server Function passed to `useActionState` will be used to update the state variable.
```
import { useActionState } from "react";
import { signUpNewUser } from "./api";
export default function Page() {
  async function signup(prevState, formData) {
    "use server";
    const email = formData.get("email");
    try {
      await signUpNewUser(email);
      alert(`Added "${email}"`);
    } catch (err) {
      return err.toString();
    }
  }
  const [message, signupAction] = useActionState(signup, null);
  return (
    <>
      <h1>Signup for my newsletter</h1>
      <p>Signup with the same email twice to see an error</p>
      <form action={signupAction} id="signup-form">
        <label htmlFor="email">Email: </label>
        <input name="email" id="email" placeholder="react@example.com" />
        <button>Sign up</button>
        {!!message && <p>{message}</p>}
      </form>
    </>
  );
}
```
Learn more about updating state from a form action with the [`useActionState`](_reference_react_useActionState.md) docs

### Handling multiple submission types

Forms can be designed to handle multiple submission actions based on the button pressed by the user. Each button inside a form can be associated with a distinct action or behavior by setting the `formAction` prop.

When a user taps a specific button, the form is submitted, and a corresponding action, defined by that button’s attributes and action, is executed. For instance, a form might submit an article for review by default but have a separate button with `formAction` set to save the article as a draft.
```
export default function Search() {
  function publish(formData) {
    const content = formData.get("content");
    const button = formData.get("button");
    alert(`'${content}' was published with the '${button}' button`);
  }
  function save(formData) {
    const content = formData.get("content");
    alert(`Your draft of '${content}' has been saved!`);
  }
  return (
    <form action={publish}>
      <textarea name="content" rows={4} cols={40} />
      <br />
      <button type="submit" name="button" value="submit">Publish</button>
      <button formAction={save}>Save draft</button>
    </form>
  );
}
```

#### _reference_react-dom_components_input.md

> Source: https://react.dev/reference/react-dom/components/input
> Scraped: 12/20/2025, 10:41:02 PM

The [built-in browser `<input>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) lets you render different kinds of form inputs.

* [Reference](_reference_react-dom_components_input.md#reference)
    * [`<input>`](_reference_react-dom_components_input.md#input)
* [Usage](_reference_react-dom_components_input.md#usage)
    * [Displaying inputs of different types](_reference_react-dom_components_input.md#displaying-inputs-of-different-types)
    * [Providing a label for an input](_reference_react-dom_components_input.md#providing-a-label-for-an-input)
    * [Providing an initial value for an input](_reference_react-dom_components_input.md#providing-an-initial-value-for-an-input)
    * [Reading the input values when submitting a form](_reference_react-dom_components_input.md#reading-the-input-values-when-submitting-a-form)
    * [Controlling an input with a state variable](_reference_react-dom_components_input.md#controlling-an-input-with-a-state-variable)
    * [Optimizing re-rendering on every keystroke](_reference_react-dom_components_input.md#optimizing-re-rendering-on-every-keystroke)
* [Troubleshooting](_reference_react-dom_components_input.md#troubleshooting)
    * [My text input doesn’t update when I type into it](_reference_react-dom_components_input.md#my-text-input-doesnt-update-when-i-type-into-it)
    * [My checkbox doesn’t update when I click on it](_reference_react-dom_components_input.md#my-checkbox-doesnt-update-when-i-click-on-it)
    * [My input caret jumps to the beginning on every keystroke](_reference_react-dom_components_input.md#my-input-caret-jumps-to-the-beginning-on-every-keystroke)
    * [I’m getting an error: “A component is changing an uncontrolled input to be controlled”](_reference_react-dom_components_input.md#im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled)

* * *

## Reference

### `<input>`

To display an input, render the [built-in browser `<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) component.

[See more examples below.](_reference_react-dom_components_input.md#usage)

#### Props

`<input>` supports all [common element props.](_reference_react-dom_components_common.md#common-props)

* [`formAction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formaction): A string or function. Overrides the parent `<form action>` for `type="submit"` and `type="image"`. When a URL is passed to `action` the form will behave like a standard HTML form. When a function is passed to `formAction` the function will handle the form submission. See [`<form action>`](_reference_react-dom_components_form.md#props).

You can [make an input controlled](_reference_react-dom_components_input.md#controlling-an-input-with-a-state-variable) by passing one of these props:

* [`checked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#checked): A boolean. For a checkbox input or a radio button, controls whether it is selected.
* [`value`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#value): A string. For a text input, controls its text. (For a radio button, specifies its form data.)

When you pass either of them, you must also pass an `onChange` handler that updates the passed value.

These `<input>` props are only relevant for uncontrolled inputs:

* [`defaultChecked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#defaultChecked): A boolean. Specifies [the initial value](_reference_react-dom_components_input.md#providing-an-initial-value-for-an-input) for `type="checkbox"` and `type="radio"` inputs.
* [`defaultValue`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#defaultValue): A string. Specifies [the initial value](_reference_react-dom_components_input.md#providing-an-initial-value-for-an-input) for a text input.

These `<input>` props are relevant both for uncontrolled and controlled inputs:

* [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#accept): A string. Specifies which filetypes are accepted by a `type="file"` input.
* [`alt`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#alt): A string. Specifies the alternative image text for a `type="image"` input.
* [`capture`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#capture): A string. Specifies the media (microphone, video, or camera) captured by a `type="file"` input.
* [`autoComplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete): A string. Specifies one of the possible [autocomplete behaviors.](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values)
* [`autoFocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus): A boolean. If `true`, React will focus the element on mount.
* [`dirname`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#dirname): A string. Specifies the form field name for the element’s directionality.
* [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled): A boolean. If `true`, the input will not be interactive and will appear dimmed.
*   `children`: `<input>` does not accept children.
* [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#form): A string. Specifies the `id` of the `<form>` this input belongs to. If omitted, it’s the closest parent form.
* [`formAction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formaction): A string. Overrides the parent `<form action>` for `type="submit"` and `type="image"`.
* [`formEnctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formenctype): A string. Overrides the parent `<form enctype>` for `type="submit"` and `type="image"`.
* [`formMethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formmethod): A string. Overrides the parent `<form method>` for `type="submit"` and `type="image"`.
* [`formNoValidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formnovalidate): A string. Overrides the parent `<form noValidate>` for `type="submit"` and `type="image"`.
* [`formTarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formtarget): A string. Overrides the parent `<form target>` for `type="submit"` and `type="image"`.
* [`height`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#height): A string. Specifies the image height for `type="image"`.
* [`list`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#list): A string. Specifies the `id` of the `<datalist>` with the autocomplete options.
* [`max`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max): A number. Specifies the maximum value of numerical and datetime inputs.
* [`maxLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength): A number. Specifies the maximum length of text and other inputs.
* [`min`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min): A number. Specifies the minimum value of numerical and datetime inputs.
* [`minLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength): A number. Specifies the minimum length of text and other inputs.
* [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#multiple): A boolean. Specifies whether multiple values are allowed for `<type="file"` and `type="email"`.
* [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name): A string. Specifies the name for this input that’s [submitted with the form.](_reference_react-dom_components_input.md#reading-the-input-values-when-submitting-a-form)
*   `onChange`: An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Required for [controlled inputs.](_reference_react-dom_components_input.md#controlling-an-input-with-a-state-variable) Fires immediately when the input’s value is changed by the user (for example, it fires on every keystroke). Behaves like the browser [`input` event.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)
*   `onChangeCapture`: A version of `onChange` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onInput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires immediately when the value is changed by the user. For historical reasons, in React it is idiomatic to use `onChange` instead which works similarly.
*   `onInputCapture`: A version of `onInput` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onInvalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires if an input fails validation on form submit. Unlike the built-in `invalid` event, the React `onInvalid` event bubbles.
*   `onInvalidCapture`: A version of `onInvalid` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onSelect`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires after the selection inside the `<input>` changes. React extends the `onSelect` event to also fire for empty selection and on edits (which may affect the selection).
*   `onSelectCapture`: A version of `onSelect` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern): A string. Specifies the pattern that the `value` must match.
* [`placeholder`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder): A string. Displayed in a dimmed color when the input value is empty.
* [`readOnly`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly): A boolean. If `true`, the input is not editable by the user.
* [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#required): A boolean. If `true`, the value must be provided for the form to submit.
* [`size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#size): A number. Similar to setting width, but the unit depends on the control.
* [`src`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#src): A string. Specifies the image source for a `type="image"` input.
* [`step`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step): A positive number or an `'any'` string. Specifies the distance between valid values.
* [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#type): A string. One of the [input types.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)
* [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#width): A string. Specifies the image width for a `type="image"` input.

#### Caveats

*   Checkboxes need `checked` (or `defaultChecked`), not `value` (or `defaultValue`).
*   If a text input receives a string `value` prop, it will be [treated as controlled.](_reference_react-dom_components_input.md#controlling-an-input-with-a-state-variable)
*   If a checkbox or a radio button receives a boolean `checked` prop, it will be [treated as controlled.](_reference_react-dom_components_input.md#controlling-an-input-with-a-state-variable)
*   An input can’t be both controlled and uncontrolled at the same time.
*   An input cannot switch between being controlled or uncontrolled over its lifetime.
*   Every controlled input needs an `onChange` event handler that synchronously updates its backing value.

* * *

## Usage

### Displaying inputs of different types

To display an input, render an `<input>` component. By default, it will be a text input. You can pass `type="checkbox"` for a checkbox, `type="radio"` for a radio button, [or one of the other input types.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)

* * *

### Providing a label for an input

Typically, you will place every `<input>` inside a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) tag. This tells the browser that this label is associated with that input. When the user clicks the label, the browser will automatically focus the input. It’s also essential for accessibility: a screen reader will announce the label caption when the user focuses the associated input.

If you can’t nest `<input>` into a `<label>`, associate them by passing the same ID to `<input id>` and [`<label htmlFor>`.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor) To avoid conflicts between multiple instances of one component, generate such an ID with [`useId`.](_reference_react_useId.md)

* * *

### Providing an initial value for an input

You can optionally specify the initial value for any input. Pass it as the `defaultValue` string for text inputs. Checkboxes and radio buttons should specify the initial value with the `defaultChecked` boolean instead.

* * *

### Reading the input values when submitting a form

Add a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) around your inputs with a [`<button type="submit">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) inside. It will call your `<form onSubmit>` event handler. By default, the browser will send the form data to the current URL and refresh the page. You can override that behavior by calling `e.preventDefault()`. Read the form data with [`new FormData(e.target)`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

### Note

Give a `name` to every `<input>`, for example `<input name="firstName" defaultValue="Taylor" />`. The `name` you specified will be used as a key in the form data, for example `{ firstName: "Taylor" }`.

### Pitfall

By default, a `<button>` inside a `<form>` without a `type` attribute will submit it. This can be surprising! If you have your own custom `Button` React component, consider using [`<button type="button">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) instead of `<button>` (with no type). Then, to be explicit, use `<button type="submit">` for buttons that _are_ supposed to submit the form.

* * *

### Controlling an input with a state variable

An input like `<input />` is _uncontrolled._ Even if you [pass an initial value](_reference_react-dom_components_input.md#providing-an-initial-value-for-an-input) like `<input defaultValue="Initial text" />`, your JSX only specifies the initial value. It does not control what the value should be right now.

**To render a _controlled_ input, pass the `value` prop to it (or `checked` for checkboxes and radios).** React will force the input to always have the `value` you passed. Usually, you would do this by declaring a [state variable:](_reference_react_useState.md)
```
function Form() {

const [firstName, setFirstName] = useState(''); // Declare a state variable...

// ...

return (

<input

value={firstName} // ...force the input's value to match the state variable...

onChange={e => setFirstName(e.target.value)} // ... and update the state variable on any edits!

/>

);

}
```
A controlled input makes sense if you needed state anyway—for example, to re-render your UI on every edit:
```
function Form() {

const [firstName, setFirstName] = useState('');

return (

<>

<label>

        First name:

<input value={firstName} onChange={e => setFirstName(e.target.value)} />

</label>

{firstName !== '' && <p>Your name is {firstName}.</p>}

      ...
```
It’s also useful if you want to offer multiple ways to adjust the input state (for example, by clicking a button):
```
function Form() {

// ...

const [age, setAge] = useState('');

const ageAsNumber = Number(age);

return (

<>

<label>

        Age:

<input

value={age}

onChange={e => setAge(e.target.value)}

type="number"

/>

<button onClick={() => setAge(ageAsNumber + 10)}>

          Add 10 years

</button>
```
The `value` you pass to controlled components should not be `undefined` or `null`. If you need the initial value to be empty (such as with the `firstName` field below), initialize your state variable to an empty string (`''`).

### Pitfall

**If you pass `value` without `onChange`, it will be impossible to type into the input.** When you control an input by passing some `value` to it, you _force_ it to always have the value you passed. So if you pass a state variable as a `value` but forget to update that state variable synchronously during the `onChange` event handler, React will revert the input after every keystroke back to the `value` that you specified.

* * *

### Optimizing re-rendering on every keystroke

When you use a controlled input, you set the state on every keystroke. If the component containing your state re-renders a large tree, this can get slow. There’s a few ways you can optimize re-rendering performance.

For example, suppose you start with a form that re-renders all page content on every keystroke:
```
function App() {

const [firstName, setFirstName] = useState('');

return (

<>

<form>

<input value={firstName} onChange={e => setFirstName(e.target.value)} />

</form>

<PageContent />

</>

);

}
```
Since `<PageContent />` doesn’t rely on the input state, you can move the input state into its own component:
```
function App() {

return (

<>

<SignupForm />

<PageContent />

</>

);

}

function SignupForm() {

const [firstName, setFirstName] = useState('');

return (

<form>

<input value={firstName} onChange={e => setFirstName(e.target.value)} />

</form>

);

}
```
This significantly improves performance because now only `SignupForm` re-renders on every keystroke.

If there is no way to avoid re-rendering (for example, if `PageContent` depends on the search input’s value), [`useDeferredValue`](_reference_react_useDeferredValue.md#deferring-re-rendering-for-a-part-of-the-ui) lets you keep the controlled input responsive even in the middle of a large re-render.

* * *

## Troubleshooting

### My text input doesn’t update when I type into it

If you render an input with `value` but no `onChange`, you will see an error in the console:
```
// 🔴 Bug: controlled text input with no onChange handler

<input value={something} />
```
You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.

As the error message suggests, if you only wanted to [specify the _initial_ value,](_reference_react-dom_components_input.md#providing-an-initial-value-for-an-input) pass `defaultValue` instead:
```
// ✅ Good: uncontrolled input with an initial value

<input defaultValue={something} />
```
If you want [to control this input with a state variable,](_reference_react-dom_components_input.md#controlling-an-input-with-a-state-variable) specify an `onChange` handler:
```
// ✅ Good: controlled input with onChange

<input value={something} onChange={e => setSomething(e.target.value)} />
```
If the value is intentionally read-only, add a `readOnly` prop to suppress the error:
```
// ✅ Good: readonly controlled input without on change

<input value={something} readOnly={true} />
```
* * *

### My checkbox doesn’t update when I click on it

If you render a checkbox with `checked` but no `onChange`, you will see an error in the console:
```
// 🔴 Bug: controlled checkbox with no onChange handler

<input type="checkbox" checked={something} />
```
You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.

As the error message suggests, if you only wanted to [specify the _initial_ value,](_reference_react-dom_components_input.md#providing-an-initial-value-for-an-input) pass `defaultChecked` instead:
```
// ✅ Good: uncontrolled checkbox with an initial value

<input type="checkbox" defaultChecked={something} />
```
If you want [to control this checkbox with a state variable,](_reference_react-dom_components_input.md#controlling-an-input-with-a-state-variable) specify an `onChange` handler:
```
// ✅ Good: controlled checkbox with onChange

<input type="checkbox" checked={something} onChange={e => setSomething(e.target.checked)} />
```
### Pitfall

You need to read `e.target.checked` rather than `e.target.value` for checkboxes.

If the checkbox is intentionally read-only, add a `readOnly` prop to suppress the error:
```
// ✅ Good: readonly controlled input without on change

<input type="checkbox" checked={something} readOnly={true} />
```
* * *

### My input caret jumps to the beginning on every keystroke

If you [control an input,](_reference_react-dom_components_input.md#controlling-an-input-with-a-state-variable) you must update its state variable to the input’s value from the DOM during `onChange`.

You can’t update it to something other than `e.target.value` (or `e.target.checked` for checkboxes):
```
function handleChange(e) {

// 🔴 Bug: updating an input to something other than e.target.value

setFirstName(e.target.value.toUpperCase());

}
```
You also can’t update it asynchronously:
```
function handleChange(e) {

// 🔴 Bug: updating an input asynchronously

setTimeout(() => {

setFirstName(e.target.value);

}, 100);

}
```
To fix your code, update it synchronously to `e.target.value`:
```
function handleChange(e) {

// ✅ Updating a controlled input to e.target.value synchronously

setFirstName(e.target.value);

}
```
If this doesn’t fix the problem, it’s possible that the input gets removed and re-added from the DOM on every keystroke. This can happen if you’re accidentally [resetting state](_learn_preserving-and-resetting-state.md) on every re-render, for example if the input or one of its parents always receives a different `key` attribute, or if you nest component function definitions (which is not supported and causes the “inner” component to always be considered a different tree).

* * *

### I’m getting an error: “A component is changing an uncontrolled input to be controlled”

If you provide a `value` to the component, it must remain a string throughout its lifetime.

You cannot pass `value={undefined}` first and later pass `value="some string"` because React won’t know whether you want the component to be uncontrolled or controlled. A controlled component should always receive a string `value`, not `null` or `undefined`.

If your `value` is coming from an API or a state variable, it might be initialized to `null` or `undefined`. In that case, either set it to an empty string (`''`) initially, or pass `value={someValue ?? ''}` to ensure `value` is a string.

Similarly, if you pass `checked` to a checkbox, ensure it’s always a boolean.

#### _reference_react-dom_components_link.md

> Source: https://react.dev/reference/react-dom/components/link
> Scraped: 12/20/2025, 10:41:05 PM

The [built-in browser `<link>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) lets you use external resources such as stylesheets or annotate the document with link metadata.
```
<link rel="icon" href="favicon.ico" />
```
* [Reference](_reference_react-dom_components_link.md#reference)
    * [`<link>`](_reference_react-dom_components_link.md#link)
* [Usage](_reference_react-dom_components_link.md#usage)
    * [Linking to related resources](_reference_react-dom_components_link.md#linking-to-related-resources)
    * [Linking to a stylesheet](_reference_react-dom_components_link.md#linking-to-a-stylesheet)
    * [Controlling stylesheet precedence](_reference_react-dom_components_link.md#controlling-stylesheet-precedence)
    * [Deduplicated stylesheet rendering](_reference_react-dom_components_link.md#deduplicated-stylesheet-rendering)
    * [Annotating specific items within the document with links](_reference_react-dom_components_link.md#annotating-specific-items-within-the-document-with-links)

* * *

## Reference

### `<link>`

To link to external resources such as stylesheets, fonts, and icons, or to annotate the document with link metadata, render the [built-in browser `<link>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link). You can render `<link>` from any component and React will [in most cases](_reference_react-dom_components_link.md#special-rendering-behavior) place the corresponding DOM element in the document head.
```
<link rel="icon" href="favicon.ico" />
```
[See more examples below.](_reference_react-dom_components_link.md#usage)

#### Props

`<link>` supports all [common element props.](_reference_react-dom_components_common.md#common-props)

*   `rel`: a string, required. Specifies the [relationship to the resource](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). React [treats links with `rel="stylesheet"` differently](_reference_react-dom_components_link.md#special-rendering-behavior) from other links.

These props apply when `rel="stylesheet"`:

*   `precedence`: a string. Tells React where to rank the `<link>` DOM node relative to others in the document `<head>`, which determines which stylesheet can override the other. React will infer that precedence values it discovers first are “lower” and precedence values it discovers later are “higher”. Many style systems can work fine using a single precedence value because style rules are atomic. Stylesheets with the same precedence go together whether they are `<link>` or inline `<style>` tags or loaded using [`preinit`](_reference_react-dom_preinit.md) functions.
*   `media`: a string. Restricts the stylesheet to a certain [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries).
*   `title`: a string. Specifies the name of an [alternative stylesheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets).

These props apply when `rel="stylesheet"` but disable React’s [special treatment of stylesheets](_reference_react-dom_components_link.md#special-rendering-behavior):

*   `disabled`: a boolean. Disables the stylesheet.
*   `onError`: a function. Called when the stylesheet fails to load.
*   `onLoad`: a function. Called when the stylesheet finishes being loaded.

These props apply when `rel="preload"` or `rel="modulepreload"`:

*   `as`: a string. The type of resource. Its possible values are `audio`, `document`, `embed`, `fetch`, `font`, `image`, `object`, `script`, `style`, `track`, `video`, `worker`.
*   `imageSrcSet`: a string. Applicable only when `as="image"`. Specifies the [source set of the image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).
*   `imageSizes`: a string. Applicable only when `as="image"`. Specifies the [sizes of the image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

These props apply when `rel="icon"` or `rel="apple-touch-icon"`:

*   `sizes`: a string. The [sizes of the icon](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

These props apply in all cases:

*   `href`: a string. The URL of the linked resource.
*   `crossOrigin`: a string. The [CORS policy](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) to use. Its possible values are `anonymous` and `use-credentials`. It is required when `as` is set to `"fetch"`.
*   `referrerPolicy`: a string. The [Referrer header](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#referrerpolicy) to send when fetching. Its possible values are `no-referrer-when-downgrade` (the default), `no-referrer`, `origin`, `origin-when-cross-origin`, and `unsafe-url`.
*   `fetchPriority`: a string. Suggests a relative priority for fetching the resource. The possible values are `auto` (the default), `high`, and `low`.
*   `hrefLang`: a string. The language of the linked resource.
*   `integrity`: a string. A cryptographic hash of the resource, to [verify its authenticity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
*   `type`: a string. The MIME type of the linked resource.

Props that are **not recommended** for use with React:

*   `blocking`: a string. If set to `"render"`, instructs the browser not to render the page until the stylesheet is loaded. React provides more fine-grained control using Suspense.

#### Special rendering behavior

React will always place the DOM element corresponding to the `<link>` component within the document’s `<head>`, regardless of where in the React tree it is rendered. The `<head>` is the only valid place for `<link>` to exist within the DOM, yet it’s convenient and keeps things composable if a component representing a specific page can render `<link>` components itself.

There are a few exceptions to this:

*   If the `<link>` has a `rel="stylesheet"` prop, then it has to also have a `precedence` prop to get this special behavior. This is because the order of stylesheets within the document is significant, so React needs to know how to order this stylesheet relative to others, which you specify using the `precedence` prop. If the `precedence` prop is omitted, there is no special behavior.
*   If the `<link>` has an [`itemProp`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop) prop, there is no special behavior, because in this case it doesn’t apply to the document but instead represents metadata about a specific part of the page.
*   If the `<link>` has an `onLoad` or `onError` prop, because in that case you are managing the loading of the linked resource manually within your React component.

#### Special behavior for stylesheets

In addition, if the `<link>` is to a stylesheet (namely, it has `rel="stylesheet"` in its props), React treats it specially in the following ways:

*   The component that renders `<link>` will [suspend](_reference_react_Suspense.md) while the stylesheet is loading.
*   If multiple components render links to the same stylesheet, React will de-duplicate them and only put a single link into the DOM. Two links are considered the same if they have the same `href` prop.

There are two exception to this special behavior:

*   If the link doesn’t have a `precedence` prop, there is no special behavior, because the order of stylesheets within the document is significant, so React needs to know how to order this stylesheet relative to others, which you specify using the `precedence` prop.
*   If you supply any of the `onLoad`, `onError`, or `disabled` props, there is no special behavior, because these props indicate that you are managing the loading of the stylesheet manually within your component.

This special treatment comes with two caveats:

*   React will ignore changes to props after the link has been rendered. (React will issue a warning in development if this happens.)
*   React may leave the link in the DOM even after the component that rendered it has been unmounted.

* * *

## Usage

You can annotate the document with links to related resources such as an icon, canonical URL, or pingback. React will place this metadata within the document `<head>` regardless of where in the React tree it is rendered.

### Linking to a stylesheet

If a component depends on a certain stylesheet in order to be displayed correctly, you can render a link to that stylesheet within the component. Your component will [suspend](_reference_react_Suspense.md) while the stylesheet is loading. You must supply the `precedence` prop, which tells React where to place this stylesheet relative to others — stylesheets with higher precedence can override those with lower precedence.

### Note

When you want to use a stylesheet, it can be beneficial to call the [preinit](_reference_react-dom_preinit.md) function. Calling this function may allow the browser to start fetching the stylesheet earlier than if you just render a `<link>` component, for example by sending an [HTTP Early Hints response](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103).

### Controlling stylesheet precedence

Stylesheets can conflict with each other, and when they do, the browser goes with the one that comes later in the document. React lets you control the order of stylesheets with the `precedence` prop. In this example, three components render stylesheets, and the ones with the same precedence are grouped together in the `<head>`.
```
import ShowRenderedHTML from './ShowRenderedHTML.js';
export default function HomePage() {
  return (
    <ShowRenderedHTML>
      <FirstComponent />
      <SecondComponent />

      ...
    </ShowRenderedHTML>
  );
}
function FirstComponent() {
  return <link rel="stylesheet" href="first.css" precedence="first" />;
}
function SecondComponent() {
  return <link rel="stylesheet" href="second.css" precedence="second" />;
}
function ThirdComponent() {
  return <link rel="stylesheet" href="third.css" precedence="first" />;
}
```
Note the `precedence` values themselves are arbitrary and their naming is up to you. React will infer that precedence values it discovers first are “lower” and precedence values it discovers later are “higher”.

### Deduplicated stylesheet rendering

If you render the same stylesheet from multiple components, React will place only a single `<link>` in the document head.

### Annotating specific items within the document with links

You can use the `<link>` component with the `itemProp` prop to annotate specific items within the document with links to related resources. In this case, React will _not_ place these annotations within the document `<head>` but will place them like any other React component.
```
<section itemScope>

<h3>Annotating specific items</h3>

<link itemProp="author" href="http://example.com/" />

<p>...</p>

</section>
```

#### _reference_react-dom_components_meta.md

> Source: https://react.dev/reference/react-dom/components/meta
> Scraped: 12/20/2025, 10:41:05 PM

The [built-in browser `<meta>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) lets you add metadata to the document.
```
<meta name="keywords" content="React, JavaScript, semantic markup, html" />
```
* [Reference](_reference_react-dom_components_meta.md#reference)
    * [`<meta>`](_reference_react-dom_components_meta.md#meta)
* [Usage](_reference_react-dom_components_meta.md#usage)
    * [Annotating the document with metadata](_reference_react-dom_components_meta.md#annotating-the-document-with-metadata)
    * [Annotating specific items within the document with metadata](_reference_react-dom_components_meta.md#annotating-specific-items-within-the-document-with-metadata)

* * *

## Reference

### `<meta>`

To add document metadata, render the [built-in browser `<meta>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta). You can render `<meta>` from any component and React will always place the corresponding DOM element in the document head.
```
<meta name="keywords" content="React, JavaScript, semantic markup, html" />
```
[See more examples below.](_reference_react-dom_components_meta.md#usage)

#### Props

`<meta>` supports all [common element props.](_reference_react-dom_components_common.md#common-props)

It should have _exactly one_ of the following props: `name`, `httpEquiv`, `charset`, `itemProp`. The `<meta>` component does something different depending on which of these props is specified.

*   `name`: a string. Specifies the [kind of metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name) to be attached to the document.
*   `charset`: a string. Specifies the character set used by the document. The only valid value is `"utf-8"`.
*   `httpEquiv`: a string. Specifies a directive for processing the document.
*   `itemProp`: a string. Specifies metadata about a particular item within the document rather than the document as a whole.
*   `content`: a string. Specifies the metadata to be attached when used with the `name` or `itemProp` props or the behavior of the directive when used with the `httpEquiv` prop.

#### Special rendering behavior

React will always place the DOM element corresponding to the `<meta>` component within the document’s `<head>`, regardless of where in the React tree it is rendered. The `<head>` is the only valid place for `<meta>` to exist within the DOM, yet it’s convenient and keeps things composable if a component representing a specific page can render `<meta>` components itself.

There is one exception to this: if `<meta>` has an [`itemProp`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop) prop, there is no special behavior, because in this case it doesn’t represent metadata about the document but rather metadata about a specific part of the page.

* * *

## Usage

### Annotating the document with metadata

You can annotate the document with metadata such as keywords, a summary, or the author’s name. React will place this metadata within the document `<head>` regardless of where in the React tree it is rendered.
```
<meta name="author" content="John Smith" />

<meta name="keywords" content="React, JavaScript, semantic markup, html" />

<meta name="description" content="API reference for the  component in React DOM" />
```
You can render the `<meta>` component from any component. React will put a `<meta>` DOM node in the document `<head>`.

### Annotating specific items within the document with metadata

You can use the `<meta>` component with the `itemProp` prop to annotate specific items within the document with metadata. In this case, React will _not_ place these annotations within the document `<head>` but will place them like any other React component.
```
<section itemScope>

<h3>Annotating specific items</h3>

<meta itemProp="description" content="API reference for using  with itemProp" />

<p>...</p>

</section>
```

#### _reference_react-dom_components_option.md

> Source: https://react.dev/reference/react-dom/components/option
> Scraped: 12/20/2025, 10:41:00 PM

The [built-in browser `<option>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) lets you render an option inside a [`<select>`](_reference_react-dom_components_select.md) box.
```
<select>

<option value="someOption">Some option</option>

<option value="otherOption">Other option</option>

</select>
```
* [Reference](_reference_react-dom_components_option.md#reference)
    * [`<option>`](_reference_react-dom_components_option.md#option)
* [Usage](_reference_react-dom_components_option.md#usage)
    * [Displaying a select box with options](_reference_react-dom_components_option.md#displaying-a-select-box-with-options)

* * *

## Reference

### `<option>`

The [built-in browser `<option>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) lets you render an option inside a [`<select>`](_reference_react-dom_components_select.md) box.
```
<select>

<option value="someOption">Some option</option>

<option value="otherOption">Other option</option>

</select>
```
[See more examples below.](_reference_react-dom_components_option.md#usage)

#### Props

`<option>` supports all [common element props.](_reference_react-dom_components_common.md#common-props)

Additionally, `<option>` supports these props:

* [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#disabled): A boolean. If `true`, the option will not be selectable and will appear dimmed.
* [`label`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#label): A string. Specifies the meaning of the option. If not specified, the text inside the option is used.
* [`value`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#value): The value to be used [when submitting the parent `<select>` in a form](_reference_react-dom_components_select.md#reading-the-select-box-value-when-submitting-a-form) if this option is selected.

#### Caveats

*   React does not support the `selected` attribute on `<option>`. Instead, pass this option’s `value` to the parent [`<select defaultValue>`](_reference_react-dom_components_select.md#providing-an-initially-selected-option) for an uncontrolled select box, or [`<select value>`](_reference_react-dom_components_select.md#controlling-a-select-box-with-a-state-variable) for a controlled select.

* * *

## Usage

### Displaying a select box with options

Render a `<select>` with a list of `<option>` components inside to display a select box. Give each `<option>` a `value` representing the data to be submitted with the form.

[Read more about displaying a `<select>` with a list of `<option>` components.](_reference_react-dom_components_select.md)

#### _reference_react-dom_components_progress.md

> Source: https://react.dev/reference/react-dom/components/progress
> Scraped: 12/20/2025, 10:41:00 PM

The [built-in browser `<progress>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) lets you render a progress indicator.

* [Reference](_reference_react-dom_components_progress.md#reference)
    * [`<progress>`](_reference_react-dom_components_progress.md#progress)
* [Usage](_reference_react-dom_components_progress.md#usage)
    * [Controlling a progress indicator](_reference_react-dom_components_progress.md#controlling-a-progress-indicator)

* * *

## Reference

### `<progress>`

To display a progress indicator, render the [built-in browser `<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) component.

[See more examples below.](_reference_react-dom_components_progress.md#usage)

#### Props

`<progress>` supports all [common element props.](_reference_react-dom_components_common.md#common-props)

Additionally, `<progress>` supports these props:

* [`max`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#max): A number. Specifies the maximum `value`. Defaults to `1`.
* [`value`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#value): A number between `0` and `max`, or `null` for indeterminate progress. Specifies how much was done.

* * *

## Usage

### Controlling a progress indicator

To display a progress indicator, render a `<progress>` component. You can pass a number `value` between `0` and the `max` value you specify. If you don’t pass a `max` value, it will assumed to be `1` by default.

If the operation is not ongoing, pass `value={null}` to put the progress indicator into an indeterminate state.

#### _reference_react-dom_components_script.md

> Source: https://react.dev/reference/react-dom/components/script
> Scraped: 12/20/2025, 10:41:05 PM

The [built-in browser `<script>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) lets you add a script to your document.
```
<script> alert("hi!") </script>
```
* [Reference](_reference_react-dom_components_script.md#reference)
    * [`<script>`](_reference_react-dom_components_script.md#script)
* [Usage](_reference_react-dom_components_script.md#usage)
    * [Rendering an external script](_reference_react-dom_components_script.md#rendering-an-external-script)
    * [Rendering an inline script](_reference_react-dom_components_script.md#rendering-an-inline-script)

* * *

## Reference

### `<script>`

To add inline or external scripts to your document, render the [built-in browser `<script>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script). You can render `<script>` from any component and React will [in certain cases](_reference_react-dom_components_script.md#special-rendering-behavior) place the corresponding DOM element in the document head and de-duplicate identical scripts.
```
<script> alert("hi!") </script>

<script src="script.js" />
```
[See more examples below.](_reference_react-dom_components_script.md#usage)

#### Props

`<script>` supports all [common element props.](_reference_react-dom_components_common.md#common-props)

It should have _either_ `children` or a `src` prop.

*   `children`: a string. The source code of an inline script.
*   `src`: a string. The URL of an external script.

Other supported props:

*   `async`: a boolean. Allows the browser to defer execution of the script until the rest of the document has been processed — the preferred behavior for performance.
*   `crossOrigin`: a string. The [CORS policy](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) to use. Its possible values are `anonymous` and `use-credentials`.
*   `fetchPriority`: a string. Lets the browser rank scripts in priority when fetching multiple scripts at the same time. Can be `"high"`, `"low"`, or `"auto"` (the default).
*   `integrity`: a string. A cryptographic hash of the script, to [verify its authenticity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
*   `noModule`: a boolean. Disables the script in browsers that support ES modules — allowing for a fallback script for browsers that do not.
*   `nonce`: a string. A cryptographic [nonce to allow the resource](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) when using a strict Content Security Policy.
*   `referrer`: a string. Says [what Referer header to send](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#referrerpolicy) when fetching the script and any resources that the script fetches in turn.
*   `type`: a string. Says whether the script is a [classic script, ES module, or import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type).

Props that disable React’s [special treatment of scripts](_reference_react-dom_components_script.md#special-rendering-behavior):

*   `onError`: a function. Called when the script fails to load.
*   `onLoad`: a function. Called when the script finishes being loaded.

Props that are **not recommended** for use with React:

*   `blocking`: a string. If set to `"render"`, instructs the browser not to render the page until the scriptsheet is loaded. React provides more fine-grained control using Suspense.
*   `defer`: a string. Prevents the browser from executing the script until the document is done loading. Not compatible with streaming server-rendered components. Use the `async` prop instead.

#### Special rendering behavior

React can move `<script>` components to the document’s `<head>` and de-duplicate identical scripts.

To opt into this behavior, provide the `src` and `async={true}` props. React will de-duplicate scripts if they have the same `src`. The `async` prop must be true to allow scripts to be safely moved.

This special treatment comes with two caveats:

*   React will ignore changes to props after the script has been rendered. (React will issue a warning in development if this happens.)
*   React may leave the script in the DOM even after the component that rendered it has been unmounted. (This has no effect as scripts just execute once when they are inserted into the DOM.)

* * *

## Usage

### Rendering an external script

If a component depends on certain scripts in order to be displayed correctly, you can render a `<script>` within the component. However, the component might be committed before the script has finished loading. You can start depending on the script content once the `load` event is fired e.g. by using the `onLoad` prop.

React will de-duplicate scripts that have the same `src`, inserting only one of them into the DOM even if multiple components render it.
```
import ShowRenderedHTML from './ShowRenderedHTML.js';
function Map({lat, long}) {
  return (
    <>
      <script async src="map-api.js" onLoad={() => console.log('script loaded')} />

    </>
  );
}
export default function Page() {
  return (
    <ShowRenderedHTML>
      <Map />
    </ShowRenderedHTML>
  );
}
```
### Note

When you want to use a script, it can be beneficial to call the [preinit](_reference_react-dom_preinit.md) function. Calling this function may allow the browser to start fetching the script earlier than if you just render a `<script>` component, for example by sending an [HTTP Early Hints response](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103).

### Rendering an inline script

To include an inline script, render the `<script>` component with the script source code as its children. Inline scripts are not de-duplicated or moved to the document `<head>`.
```
import ShowRenderedHTML from './ShowRenderedHTML.js';
function Tracking() {
  return (
    <script>
      ga('send', 'pageview');
    </script>
  );
}
export default function Page() {
  return (
    <ShowRenderedHTML>
      <h1>My Website</h1>

      <p>Welcome</p>
    </ShowRenderedHTML>
  );
}
```

#### _reference_react-dom_components_select.md

> Source: https://react.dev/reference/react-dom/components/select
> Scraped: 12/20/2025, 10:41:02 PM

The [built-in browser `<select>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) lets you render a select box with options.
```
<select>

<option value="someOption">Some option</option>

<option value="otherOption">Other option</option>

</select>
```
* [Reference](_reference_react-dom_components_select.md#reference)
    * [`<select>`](_reference_react-dom_components_select.md#select)
* [Usage](_reference_react-dom_components_select.md#usage)
    * [Displaying a select box with options](_reference_react-dom_components_select.md#displaying-a-select-box-with-options)
    * [Providing a label for a select box](_reference_react-dom_components_select.md#providing-a-label-for-a-select-box)
    * [Providing an initially selected option](_reference_react-dom_components_select.md#providing-an-initially-selected-option)
    * [Enabling multiple selection](_reference_react-dom_components_select.md#enabling-multiple-selection)
    * [Reading the select box value when submitting a form](_reference_react-dom_components_select.md#reading-the-select-box-value-when-submitting-a-form)
    * [Controlling a select box with a state variable](_reference_react-dom_components_select.md#controlling-a-select-box-with-a-state-variable)

* * *

## Reference

### `<select>`

To display a select box, render the [built-in browser `<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) component.
```
<select>

<option value="someOption">Some option</option>

<option value="otherOption">Other option</option>

</select>
```
[See more examples below.](_reference_react-dom_components_select.md#usage)

#### Props

`<select>` supports all [common element props.](_reference_react-dom_components_common.md#common-props)

You can [make a select box controlled](_reference_react-dom_components_select.md#controlling-a-select-box-with-a-state-variable) by passing a `value` prop:

*   `value`: A string (or an array of strings for [`multiple={true}`](_reference_react-dom_components_select.md#enabling-multiple-selection)). Controls which option is selected. Every value string match the `value` of some `<option>` nested inside the `<select>`.

When you pass `value`, you must also pass an `onChange` handler that updates the passed value.

If your `<select>` is uncontrolled, you may pass the `defaultValue` prop instead:

*   `defaultValue`: A string (or an array of strings for [`multiple={true}`](_reference_react-dom_components_select.md#enabling-multiple-selection)). Specifies [the initially selected option.](_reference_react-dom_components_select.md#providing-an-initially-selected-option)

These `<select>` props are relevant both for uncontrolled and controlled select boxes:

* [`autoComplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#autocomplete): A string. Specifies one of the possible [autocomplete behaviors.](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values)
* [`autoFocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#autofocus): A boolean. If `true`, React will focus the element on mount.
*   `children`: `<select>` accepts [`<option>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option), [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup), and [`<datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) components as children. You can also pass your own components as long as they eventually render one of the allowed components. If you pass your own components that eventually render `<option>` tags, each `<option>` you render must have a `value`.
* [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#disabled): A boolean. If `true`, the select box will not be interactive and will appear dimmed.
* [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#form): A string. Specifies the `id` of the `<form>` this select box belongs to. If omitted, it’s the closest parent form.
* [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#multiple): A boolean. If `true`, the browser allows [multiple selection.](_reference_react-dom_components_select.md#enabling-multiple-selection)
* [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#name): A string. Specifies the name for this select box that’s [submitted with the form.](_reference_react-dom_components_select.md#reading-the-select-box-value-when-submitting-a-form)
*   `onChange`: An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Required for [controlled select boxes.](_reference_react-dom_components_select.md#controlling-a-select-box-with-a-state-variable) Fires immediately when the user picks a different option. Behaves like the browser [`input` event.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)
*   `onChangeCapture`: A version of `onChange` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onInput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires immediately when the value is changed by the user. For historical reasons, in React it is idiomatic to use `onChange` instead which works similarly.
*   `onInputCapture`: A version of `onInput` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onInvalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires if an input fails validation on form submit. Unlike the built-in `invalid` event, the React `onInvalid` event bubbles.
*   `onInvalidCapture`: A version of `onInvalid` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#required): A boolean. If `true`, the value must be provided for the form to submit.
* [`size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#size): A number. For `multiple={true}` selects, specifies the preferred number of initially visible items.

#### Caveats

*   Unlike in HTML, passing a `selected` attribute to `<option>` is not supported. Instead, use [`<select defaultValue>`](_reference_react-dom_components_select.md#providing-an-initially-selected-option) for uncontrolled select boxes and [`<select value>`](_reference_react-dom_components_select.md#controlling-a-select-box-with-a-state-variable) for controlled select boxes.
*   If a select box receives a `value` prop, it will be [treated as controlled.](_reference_react-dom_components_select.md#controlling-a-select-box-with-a-state-variable)
*   A select box can’t be both controlled and uncontrolled at the same time.
*   A select box cannot switch between being controlled or uncontrolled over its lifetime.
*   Every controlled select box needs an `onChange` event handler that synchronously updates its backing value.

* * *

## Usage

### Displaying a select box with options

Render a `<select>` with a list of `<option>` components inside to display a select box. Give each `<option>` a `value` representing the data to be submitted with the form.

* * *

### Providing a label for a select box

Typically, you will place every `<select>` inside a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) tag. This tells the browser that this label is associated with that select box. When the user clicks the label, the browser will automatically focus the select box. It’s also essential for accessibility: a screen reader will announce the label caption when the user focuses the select box.

If you can’t nest `<select>` into a `<label>`, associate them by passing the same ID to `<select id>` and [`<label htmlFor>`.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor) To avoid conflicts between multiple instances of one component, generate such an ID with [`useId`.](_reference_react_useId.md)
```
import { useId } from 'react';
export default function Form() {
  const vegetableSelectId = useId();
  return (
    <>
      <label>
        Pick a fruit:
        <select name="selectedFruit">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
      </label>
      <hr />
      <label htmlFor={vegetableSelectId}>
        Pick a vegetable:
      </label>
      <select id={vegetableSelectId} name="selectedVegetable">
        <option value="cucumber">Cucumber</option>
        <option value="corn">Corn</option>
        <option value="tomato">Tomato</option>
      </select>
    </>
  );
}
```
* * *

### Providing an initially selected option

By default, the browser will select the first `<option>` in the list. To select a different option by default, pass that `<option>`’s `value` as the `defaultValue` to the `<select>` element.

### Pitfall

Unlike in HTML, passing a `selected` attribute to an individual `<option>` is not supported.

* * *

### Enabling multiple selection

Pass `multiple={true}` to the `<select>` to let the user select multiple options. In that case, if you also specify `defaultValue` to choose the initially selected options, it must be an array.
```
export default function FruitPicker() {
  return (
    <label>
      Pick some fruits:
      <select
        name="selectedFruit"
        defaultValue={['orange', 'banana']}
        multiple={true}
      >
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>
    </label>
  );
}
```
* * *

### Reading the select box value when submitting a form

Add a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) around your select box with a [`<button type="submit">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) inside. It will call your `<form onSubmit>` event handler. By default, the browser will send the form data to the current URL and refresh the page. You can override that behavior by calling `e.preventDefault()`. Read the form data with [`new FormData(e.target)`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).
```
export default function EditPost() {
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    fetch('/some-api', { method: form.method, body: formData });
    console.log(new URLSearchParams(formData).toString());
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    console.log([...formData.entries()]);
  }
  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Pick your favorite fruit:
        <select name="selectedFruit" defaultValue="orange">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
      </label>
      <label>
        Pick all your favorite vegetables:
        <select
          name="selectedVegetables"
          multiple={true}
          defaultValue={['corn', 'tomato']}
        >
          <option value="cucumber">Cucumber</option>
          <option value="corn">Corn</option>
          <option value="tomato">Tomato</option>
        </select>
      </label>
      <hr />
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```
### Note

Give a `name` to your `<select>`, for example `<select name="selectedFruit" />`. The `name` you specified will be used as a key in the form data, for example `{ selectedFruit: "orange" }`.

If you use `<select multiple={true}>`, the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) you’ll read from the form will include each selected value as a separate name-value pair. Look closely at the console logs in the example above.

### Pitfall

By default, _any_ `<button>` inside a `<form>` will submit it. This can be surprising! If you have your own custom `Button` React component, consider returning [`<button type="button">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button) instead of `<button>`. Then, to be explicit, use `<button type="submit">` for buttons that _are_ supposed to submit the form.

* * *

### Controlling a select box with a state variable

A select box like `<select />` is _uncontrolled._ Even if you [pass an initially selected value](_reference_react-dom_components_select.md#providing-an-initially-selected-option) like `<select defaultValue="orange" />`, your JSX only specifies the initial value, not the value right now.

**To render a _controlled_ select box, pass the `value` prop to it.** React will force the select box to always have the `value` you passed. Typically, you will control a select box by declaring a [state variable:](_reference_react_useState.md)
```
function FruitPicker() {

const [selectedFruit, setSelectedFruit] = useState('orange'); // Declare a state variable...

// ...

return (

<select

value={selectedFruit} // ...force the select's value to match the state variable...

onChange={e => setSelectedFruit(e.target.value)} // ... and update the state variable on any change!

>

<option value="apple">Apple</option>

<option value="banana">Banana</option>

<option value="orange">Orange</option>

</select>

);

}
```
This is useful if you want to re-render some part of the UI in response to every selection.
```
import { useState } from 'react';
export default function FruitPicker() {
  const [selectedFruit, setSelectedFruit] = useState('orange');
  const [selectedVegs, setSelectedVegs] = useState(['corn', 'tomato']);
  return (
    <>
      <label>
        Pick a fruit:
        <select
          value={selectedFruit}
          onChange={e => setSelectedFruit(e.target.value)}
        >
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
      </label>
      <hr />
      <label>
        Pick all your favorite vegetables:
        <select
          multiple={true}
          value={selectedVegs}
          onChange={e => {
            const options = [...e.target.selectedOptions];
            const values = options.map(option => option.value);
            setSelectedVegs(values);
          }}
        >
          <option value="cucumber">Cucumber</option>
          <option value="corn">Corn</option>
          <option value="tomato">Tomato</option>
        </select>
      </label>
      <hr />
      <p>Your favorite fruit: {selectedFruit}</p>
      <p>Your favorite vegetables: {selectedVegs.join(', ')}</p>
    </>
  );
}
```
### Pitfall

**If you pass `value` without `onChange`, it will be impossible to select an option.** When you control a select box by passing some `value` to it, you _force_ it to always have the value you passed. So if you pass a state variable as a `value` but forget to update that state variable synchronously during the `onChange` event handler, React will revert the select box after every keystroke back to the `value` that you specified.

Unlike in HTML, passing a `selected` attribute to an individual `<option>` is not supported.

#### _reference_react-dom_components_style.md

> Source: https://react.dev/reference/react-dom/components/style
> Scraped: 12/20/2025, 10:41:05 PM

The [built-in browser `<style>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style) lets you add inline CSS stylesheets to your document.
```
<style>{` p { color: red; } `}</style>
```
* [Reference](_reference_react-dom_components_style.md#reference)
    * [`<style>`](_reference_react-dom_components_style.md#style)
* [Usage](_reference_react-dom_components_style.md#usage)
    * [Rendering an inline CSS stylesheet](_reference_react-dom_components_style.md#rendering-an-inline-css-stylesheet)

* * *

## Reference

### `<style>`

To add inline styles to your document, render the [built-in browser `<style>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style). You can render `<style>` from any component and React will [in certain cases](_reference_react-dom_components_style.md#special-rendering-behavior) place the corresponding DOM element in the document head and de-duplicate identical styles.
```
<style>{` p { color: red; } `}</style>
```
[See more examples below.](_reference_react-dom_components_style.md#usage)

#### Props

`<style>` supports all [common element props.](_reference_react-dom_components_common.md#common-props)

*   `children`: a string, required. The contents of the stylesheet.
*   `precedence`: a string. Tells React where to rank the `<style>` DOM node relative to others in the document `<head>`, which determines which stylesheet can override the other. React will infer that precedence values it discovers first are “lower” and precedence values it discovers later are “higher”. Many style systems can work fine using a single precedence value because style rules are atomic. Stylesheets with the same precedence go together whether they are `<link>` or inline `<style>` tags or loaded using [`preinit`](_reference_react-dom_preinit.md) functions.
*   `href`: a string. Allows React to [de-duplicate styles](_reference_react-dom_components_style.md#special-rendering-behavior) that have the same `href`.
*   `media`: a string. Restricts the stylesheet to a certain [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries).
*   `nonce`: a string. A cryptographic [nonce to allow the resource](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) when using a strict Content Security Policy.
*   `title`: a string. Specifies the name of an [alternative stylesheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets).

Props that are **not recommended** for use with React:

*   `blocking`: a string. If set to `"render"`, instructs the browser not to render the page until the stylesheet is loaded. React provides more fine-grained control using Suspense.

#### Special rendering behavior

React can move `<style>` components to the document’s `<head>`, de-duplicate identical stylesheets, and [suspend](_reference_react_Suspense.md) while the stylesheet is loading.

To opt into this behavior, provide the `href` and `precedence` props. React will de-duplicate styles if they have the same `href`. The precedence prop tells React where to rank the `<style>` DOM node relative to others in the document `<head>`, which determines which stylesheet can override the other.

This special treatment comes with three caveats:

*   React will ignore changes to props after the style has been rendered. (React will issue a warning in development if this happens.)
*   React will drop all extraneous props when using the `precedence` prop (beyond `href` and `precedence`).
*   React may leave the style in the DOM even after the component that rendered it has been unmounted.

* * *

## Usage

### Rendering an inline CSS stylesheet

If a component depends on certain CSS styles in order to be displayed correctly, you can render an inline stylesheet within the component.

The `href` prop should uniquely identify the stylesheet, because React will de-duplicate stylesheets that have the same `href`. If you supply a `precedence` prop, React will reorder inline stylesheets based on the order these values appear in the component tree.

Inline stylesheets will not trigger Suspense boundaries while they’re loading. Even if they load async resources like fonts or images.
```
import ShowRenderedHTML from './ShowRenderedHTML.js';
import { useId } from 'react';
function PieChart({data, colors}) {
  const id = useId();
  const stylesheet = colors.map((color, index) =>
    `#${id} .color-${index}: \{ color: "${color}"; \}`
  ).join();
  return (
    <>
      <style href={"PieChart-" + JSON.stringify(colors)} precedence="medium">
        {stylesheet}
      </style>
      <svg id={id}>
        …
      </svg>
    </>
  );
}
export default function App() {
  return (
    <ShowRenderedHTML>
      <PieChart data="..." colors={['red', 'green', 'blue']} />
    </ShowRenderedHTML>
  );
}
```

#### _reference_react-dom_components_textarea.md

> Source: https://react.dev/reference/react-dom/components/textarea
> Scraped: 12/20/2025, 10:41:02 PM

The [built-in browser `<textarea>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) lets you render a multiline text input.

* [Reference](_reference_react-dom_components_textarea.md#reference)
    * [`<textarea>`](_reference_react-dom_components_textarea.md#textarea)
* [Usage](_reference_react-dom_components_textarea.md#usage)
    * [Displaying a text area](_reference_react-dom_components_textarea.md#displaying-a-text-area)
    * [Providing a label for a text area](_reference_react-dom_components_textarea.md#providing-a-label-for-a-text-area)
    * [Providing an initial value for a text area](_reference_react-dom_components_textarea.md#providing-an-initial-value-for-a-text-area)
    * [Reading the text area value when submitting a form](_reference_react-dom_components_textarea.md#reading-the-text-area-value-when-submitting-a-form)
    * [Controlling a text area with a state variable](_reference_react-dom_components_textarea.md#controlling-a-text-area-with-a-state-variable)
* [Troubleshooting](_reference_react-dom_components_textarea.md#troubleshooting)
    * [My text area doesn’t update when I type into it](_reference_react-dom_components_textarea.md#my-text-area-doesnt-update-when-i-type-into-it)
    * [My text area caret jumps to the beginning on every keystroke](_reference_react-dom_components_textarea.md#my-text-area-caret-jumps-to-the-beginning-on-every-keystroke)
    * [I’m getting an error: “A component is changing an uncontrolled input to be controlled”](_reference_react-dom_components_textarea.md#im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled)

* * *

## Reference

### `<textarea>`

To display a text area, render the [built-in browser `<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) component.
```
<textarea name="postContent" />
```
[See more examples below.](_reference_react-dom_components_textarea.md#usage)

#### Props

`<textarea>` supports all [common element props.](_reference_react-dom_components_common.md#common-props)

You can [make a text area controlled](_reference_react-dom_components_textarea.md#controlling-a-text-area-with-a-state-variable) by passing a `value` prop:

*   `value`: A string. Controls the text inside the text area.

When you pass `value`, you must also pass an `onChange` handler that updates the passed value.

If your `<textarea>` is uncontrolled, you may pass the `defaultValue` prop instead:

*   `defaultValue`: A string. Specifies [the initial value](_reference_react-dom_components_textarea.md#providing-an-initial-value-for-a-text-area) for a text area.

These `<textarea>` props are relevant both for uncontrolled and controlled text areas:

* [`autoComplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#autocomplete): Either `'on'` or `'off'`. Specifies the autocomplete behavior.
* [`autoFocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#autofocus): A boolean. If `true`, React will focus the element on mount.
*   `children`: `<textarea>` does not accept children. To set the initial value, use `defaultValue`.
* [`cols`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#cols): A number. Specifies the default width in average character widths. Defaults to `20`.
* [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#disabled): A boolean. If `true`, the input will not be interactive and will appear dimmed.
* [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#form): A string. Specifies the `id` of the `<form>` this input belongs to. If omitted, it’s the closest parent form.
* [`maxLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#maxlength): A number. Specifies the maximum length of text.
* [`minLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#minlength): A number. Specifies the minimum length of text.
* [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name): A string. Specifies the name for this input that’s [submitted with the form.](_reference_react-dom_components_textarea.md#reading-the-textarea-value-when-submitting-a-form)
*   `onChange`: An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Required for [controlled text areas.](_reference_react-dom_components_textarea.md#controlling-a-text-area-with-a-state-variable) Fires immediately when the input’s value is changed by the user (for example, it fires on every keystroke). Behaves like the browser [`input` event.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)
*   `onChangeCapture`: A version of `onChange` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onInput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires immediately when the value is changed by the user. For historical reasons, in React it is idiomatic to use `onChange` instead which works similarly.
*   `onInputCapture`: A version of `onInput` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onInvalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires if an input fails validation on form submit. Unlike the built-in `invalid` event, the React `onInvalid` event bubbles.
*   `onInvalidCapture`: A version of `onInvalid` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`onSelect`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/select_event): An [`Event` handler](_reference_react-dom_components_common.md#event-handler) function. Fires after the selection inside the `<textarea>` changes. React extends the `onSelect` event to also fire for empty selection and on edits (which may affect the selection).
*   `onSelectCapture`: A version of `onSelect` that fires in the [capture phase.](_learn_responding-to-events.md#capture-phase-events)
* [`placeholder`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#placeholder): A string. Displayed in a dimmed color when the text area value is empty.
* [`readOnly`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#readonly): A boolean. If `true`, the text area is not editable by the user.
* [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#required): A boolean. If `true`, the value must be provided for the form to submit.
* [`rows`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows): A number. Specifies the default height in average character heights. Defaults to `2`.
* [`wrap`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#wrap): Either `'hard'`, `'soft'`, or `'off'`. Specifies how the text should be wrapped when submitting a form.

#### Caveats

*   Passing children like `<textarea>something</textarea>` is not allowed. [Use `defaultValue` for initial content.](_reference_react-dom_components_textarea.md#providing-an-initial-value-for-a-text-area)
*   If a text area receives a string `value` prop, it will be [treated as controlled.](_reference_react-dom_components_textarea.md#controlling-a-text-area-with-a-state-variable)
*   A text area can’t be both controlled and uncontrolled at the same time.
*   A text area cannot switch between being controlled or uncontrolled over its lifetime.
*   Every controlled text area needs an `onChange` event handler that synchronously updates its backing value.

* * *

## Usage

### Displaying a text area

Render `<textarea>` to display a text area. You can specify its default size with the [`rows`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows) and [`cols`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#cols) attributes, but by default the user will be able to resize it. To disable resizing, you can specify `resize: none` in the CSS.

* * *

### Providing a label for a text area

Typically, you will place every `<textarea>` inside a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) tag. This tells the browser that this label is associated with that text area. When the user clicks the label, the browser will focus the text area. It’s also essential for accessibility: a screen reader will announce the label caption when the user focuses the text area.

If you can’t nest `<textarea>` into a `<label>`, associate them by passing the same ID to `<textarea id>` and [`<label htmlFor>`.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor) To avoid conflicts between instances of one component, generate such an ID with [`useId`.](_reference_react_useId.md)

* * *

### Providing an initial value for a text area

You can optionally specify the initial value for the text area. Pass it as the `defaultValue` string.

### Pitfall

Unlike in HTML, passing initial text like `<textarea>Some content</textarea>` is not supported.

* * *

### Reading the text area value when submitting a form

Add a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) around your textarea with a [`<button type="submit">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) inside. It will call your `<form onSubmit>` event handler. By default, the browser will send the form data to the current URL and refresh the page. You can override that behavior by calling `e.preventDefault()`. Read the form data with [`new FormData(e.target)`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

### Note

Give a `name` to your `<textarea>`, for example `<textarea name="postContent" />`. The `name` you specified will be used as a key in the form data, for example `{ postContent: "Your post" }`.

### Pitfall

By default, _any_ `<button>` inside a `<form>` will submit it. This can be surprising! If you have your own custom `Button` React component, consider returning [`<button type="button">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button) instead of `<button>`. Then, to be explicit, use `<button type="submit">` for buttons that _are_ supposed to submit the form.

* * *

### Controlling a text area with a state variable

A text area like `<textarea />` is _uncontrolled._ Even if you [pass an initial value](_reference_react-dom_components_textarea.md#providing-an-initial-value-for-a-text-area) like `<textarea defaultValue="Initial text" />`, your JSX only specifies the initial value, not the value right now.

**To render a _controlled_ text area, pass the `value` prop to it.** React will force the text area to always have the `value` you passed. Typically, you will control a text area by declaring a [state variable:](_reference_react_useState.md)
```
function NewPost() {

const [postContent, setPostContent] = useState(''); // Declare a state variable...

// ...

return (

<textarea

value={postContent} // ...force the input's value to match the state variable...

onChange={e => setPostContent(e.target.value)} // ... and update the state variable on any edits!

/>

);

}
```
This is useful if you want to re-render some part of the UI in response to every keystroke.

### Pitfall

**If you pass `value` without `onChange`, it will be impossible to type into the text area.** When you control a text area by passing some `value` to it, you _force_ it to always have the value you passed. So if you pass a state variable as a `value` but forget to update that state variable synchronously during the `onChange` event handler, React will revert the text area after every keystroke back to the `value` that you specified.

* * *

## Troubleshooting

### My text area doesn’t update when I type into it

If you render a text area with `value` but no `onChange`, you will see an error in the console:
```
// 🔴 Bug: controlled text area with no onChange handler

<textarea value={something} />
```
You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.

As the error message suggests, if you only wanted to [specify the _initial_ value,](_reference_react-dom_components_textarea.md#providing-an-initial-value-for-a-text-area) pass `defaultValue` instead:
```
// ✅ Good: uncontrolled text area with an initial value

<textarea defaultValue={something} />
```
If you want [to control this text area with a state variable,](_reference_react-dom_components_textarea.md#controlling-a-text-area-with-a-state-variable) specify an `onChange` handler:
```
// ✅ Good: controlled text area with onChange

<textarea value={something} onChange={e => setSomething(e.target.value)} />
```
If the value is intentionally read-only, add a `readOnly` prop to suppress the error:
```
// ✅ Good: readonly controlled text area without on change

<textarea value={something} readOnly={true} />
```
* * *

### My text area caret jumps to the beginning on every keystroke

If you [control a text area,](_reference_react-dom_components_textarea.md#controlling-a-text-area-with-a-state-variable) you must update its state variable to the text area’s value from the DOM during `onChange`.

You can’t update it to something other than `e.target.value`:
```
function handleChange(e) {

// 🔴 Bug: updating an input to something other than e.target.value

setFirstName(e.target.value.toUpperCase());

}
```
You also can’t update it asynchronously:
```
function handleChange(e) {

// 🔴 Bug: updating an input asynchronously

setTimeout(() => {

setFirstName(e.target.value);

}, 100);

}
```
To fix your code, update it synchronously to `e.target.value`:
```
function handleChange(e) {

// ✅ Updating a controlled input to e.target.value synchronously

setFirstName(e.target.value);

}
```
If this doesn’t fix the problem, it’s possible that the text area gets removed and re-added from the DOM on every keystroke. This can happen if you’re accidentally [resetting state](_learn_preserving-and-resetting-state.md) on every re-render. For example, this can happen if the text area or one of its parents always receives a different `key` attribute, or if you nest component definitions (which is not allowed in React and causes the “inner” component to remount on every render).

* * *

### I’m getting an error: “A component is changing an uncontrolled input to be controlled”

If you provide a `value` to the component, it must remain a string throughout its lifetime.

You cannot pass `value={undefined}` first and later pass `value="some string"` because React won’t know whether you want the component to be uncontrolled or controlled. A controlled component should always receive a string `value`, not `null` or `undefined`.

If your `value` is coming from an API or a state variable, it might be initialized to `null` or `undefined`. In that case, either set it to an empty string (`''`) initially, or pass `value={someValue ?? ''}` to ensure `value` is a string.

#### _reference_react-dom_components_title.md

> Source: https://react.dev/reference/react-dom/components/title
> Scraped: 12/20/2025, 10:41:05 PM

The [built-in browser `<title>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) lets you specify the title of the document.

* [Reference](_reference_react-dom_components_title.md#reference)
    * [`<title>`](_reference_react-dom_components_title.md#title)
* [Usage](_reference_react-dom_components_title.md#usage)
    * [Set the document title](_reference_react-dom_components_title.md#set-the-document-title)
    * [Use variables in the title](_reference_react-dom_components_title.md#use-variables-in-the-title)

* * *

## Reference

### `<title>`

To specify the title of the document, render the [built-in browser `<title>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title). You can render `<title>` from any component and React will always place the corresponding DOM element in the document head.

[See more examples below.](_reference_react-dom_components_title.md#usage)

#### Props

`<title>` supports all [common element props.](_reference_react-dom_components_common.md#common-props)

*   `children`: `<title>` accepts only text as a child. This text will become the title of the document. You can also pass your own components as long as they only render text.

#### Special rendering behavior

React will always place the DOM element corresponding to the `<title>` component within the document’s `<head>`, regardless of where in the React tree it is rendered. The `<head>` is the only valid place for `<title>` to exist within the DOM, yet it’s convenient and keeps things composable if a component representing a specific page can render its `<title>` itself.

There are two exception to this:

*   If `<title>` is within an `<svg>` component, then there is no special behavior, because in this context it doesn’t represent the document’s title but rather is an [accessibility annotation for that SVG graphic](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title).
*   If the `<title>` has an [`itemProp`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop) prop, there is no special behavior, because in this case it doesn’t represent the document’s title but rather metadata about a specific part of the page.

### Pitfall

Only render a single `<title>` at a time. If more than one component renders a `<title>` tag at the same time, React will place all of those titles in the document head. When this happens, the behavior of browsers and search engines is undefined.

* * *

## Usage

### Set the document title

Render the `<title>` component from any component with text as its children. React will put a `<title>` DOM node in the document `<head>`.

### Use variables in the title

The children of the `<title>` component must be a single string of text. (Or a single number or a single object with a `toString` method.) It might not be obvious, but using JSX curly braces like this:
```
<title>Results page {pageNumber}</title> // 🔴 Problem: This is not a single string
```
… actually causes the `<title>` component to get a two-element array as its children (the string `"Results page"` and the value of `pageNumber`). This will cause an error. Instead, use string interpolation to pass `<title>` a single string:
```
<title>{`Results page ${pageNumber}`}</title>
```

#### _reference_react-dom_createPortal.md

> Source: https://react.dev/reference/react-dom/createPortal
> Scraped: 12/20/2025, 10:41:05 PM

`createPortal` lets you render some children into a different part of the DOM.
```
<SomeComponent />

{createPortal(children, domNode, key?)}
```
* [Reference](_reference_react-dom_createPortal.md#reference)
    * [`createPortal(children, domNode, key?)`](_reference_react-dom_createPortal.md#createportal)
* [Usage](_reference_react-dom_createPortal.md#usage)
    * [Rendering to a different part of the DOM](_reference_react-dom_createPortal.md#rendering-to-a-different-part-of-the-dom)
    * [Rendering a modal dialog with a portal](_reference_react-dom_createPortal.md#rendering-a-modal-dialog-with-a-portal)
    * [Rendering React components into non-React server markup](_reference_react-dom_createPortal.md#rendering-react-components-into-non-react-server-markup)
    * [Rendering React components into non-React DOM nodes](_reference_react-dom_createPortal.md#rendering-react-components-into-non-react-dom-nodes)

* * *

## Reference

### `createPortal(children, domNode, key?)`

To create a portal, call `createPortal`, passing some JSX, and the DOM node where it should be rendered:
```
import { createPortal } from 'react-dom';

// ...

<p>This child is placed in the parent div.</p>

{createPortal(

<p>This child is placed in the document body.</p>,

document.body

)}
```
[See more examples below.](_reference_react-dom_createPortal.md#usage)

A portal only changes the physical placement of the DOM node. In every other way, the JSX you render into a portal acts as a child node of the React component that renders it. For example, the child can access the context provided by the parent tree, and events bubble up from children to parents according to the React tree.

#### Parameters

*   `children`: Anything that can be rendered with React, such as a piece of JSX (e.g. `` or `<SomeComponent />`), a [Fragment](_reference_react_Fragment.md) (`<>...</>`), a string or a number, or an array of these.

*   `domNode`: Some DOM node, such as those returned by `document.getElementById()`. The node must already exist. Passing a different DOM node during an update will cause the portal content to be recreated.

*   **optional** `key`: A unique string or number to be used as the portal’s [key.](_learn_rendering-lists.md#keeping-list-items-in-order-with-key)

#### Returns

`createPortal` returns a React node that can be included into JSX or returned from a React component. If React encounters it in the render output, it will place the provided `children` inside the provided `domNode`.

#### Caveats

*   Events from portals propagate according to the React tree rather than the DOM tree. For example, if you click inside a portal, and the portal is wrapped in ``, that `onClick` handler will fire. If this causes issues, either stop the event propagation from inside the portal, or move the portal itself up in the React tree.

* * *

## Usage

### Rendering to a different part of the DOM

_Portals_ let your components render some of their children into a different place in the DOM. This lets a part of your component “escape” from whatever containers it may be in. For example, a component can display a modal dialog or a tooltip that appears above and outside of the rest of the page.

To create a portal, render the result of `createPortal` with some JSX and the DOM node where it should go:
```
import { createPortal } from 'react-dom';

function MyComponent() {

return (

<p>This child is placed in the parent div.</p>

{createPortal(

This child is placed in the document body.

,

document.body

)}

);

}
```
React will put the DOM nodes for the JSX you passed inside of the DOM node you provided.

Without a portal, the second `<p>` would be placed inside the parent ``, but the portal “teleported” it into the [`document.body`:](https://developer.mozilla.org/en-US/docs/Web/API/Document/body)

Notice how the second paragraph visually appears outside the parent `` with the border. If you inspect the DOM structure with developer tools, you’ll see that the second `<p>` got placed directly into the `<body>`:
```
<body>

    ...

<p>This child is placed inside the parent div.</p>

    ...

<p>This child is placed in the document body.</p>

</body>
```
A portal only changes the physical placement of the DOM node. In every other way, the JSX you render into a portal acts as a child node of the React component that renders it. For example, the child can access the context provided by the parent tree, and events still bubble up from children to parents according to the React tree.

* * *

### Rendering a modal dialog with a portal

You can use a portal to create a modal dialog that floats above the rest of the page, even if the component that summons the dialog is inside a container with `overflow: hidden` or other styles that interfere with the dialog.

In this example, the two containers have styles that disrupt the modal dialog, but the one rendered into a portal is unaffected because, in the DOM, the modal is not contained within the parent JSX elements.

### Pitfall

It’s important to make sure that your app is accessible when using portals. For instance, you may need to manage keyboard focus so that the user can move the focus in and out of the portal in a natural way.

Follow the [WAI-ARIA Modal Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal) when creating modals. If you use a community package, ensure that it is accessible and follows these guidelines.

* * *

### Rendering React components into non-React server markup

Portals can be useful if your React root is only part of a static or server-rendered page that isn’t built with React. For example, if your page is built with a server framework like Rails, you can create areas of interactivity within static areas such as sidebars. Compared with having [multiple separate React roots,](_reference_react-dom_client_createRoot.md#rendering-a-page-partially-built-with-react) portals let you treat the app as a single React tree with shared state even though its parts render to different parts of the DOM.
```
import { createPortal } from 'react-dom';
const sidebarContentEl = document.getElementById('sidebar-content');
export default function App() {
  return (
    <>
      <MainContent />
      {createPortal(
        <SidebarContent />,
        sidebarContentEl
      )}
    </>
  );
}
function MainContent() {
  return <p>This part is rendered by React</p>;
}
function SidebarContent() {
  return <p>This part is also rendered by React!</p>;
}
```
* * *

### Rendering React components into non-React DOM nodes

You can also use a portal to manage the content of a DOM node that’s managed outside of React. For example, suppose you’re integrating with a non-React map widget and you want to render React content inside a popup. To do this, declare a `popupContainer` state variable to store the DOM node you’re going to render into:
```
const [popupContainer, setPopupContainer] = useState(null);
```
When you create the third-party widget, store the DOM node returned by the widget so you can render into it:
```
useEffect(() => {

if (mapRef.current === null) {

const map = createMapWidget(containerRef.current);

mapRef.current = map;

const popupDiv = addPopupToMapWidget(map);

setPopupContainer(popupDiv);

}

}, []);
```
This lets you use `createPortal` to render React content into `popupContainer` once it becomes available:
```
return (

{popupContainer !== null && createPortal(

<p>Hello from React!</p>,

popupContainer

)}

);
```
Here is a complete example you can play with:
```
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createMapWidget, addPopupToMapWidget } from './map-widget.js';
export default function Map() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [popupContainer, setPopupContainer] = useState(null);
  useEffect(() => {
    if (mapRef.current === null) {
      const map = createMapWidget(containerRef.current);
      mapRef.current = map;
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, []);
  return (

      {popupContainer !== null && createPortal(
        <p>Hello from React!</p>,
        popupContainer
      )}

  );
}
```

#### _reference_react-dom_flushSync.md

> Source: https://react.dev/reference/react-dom/flushSync
> Scraped: 12/20/2025, 10:41:05 PM

### Pitfall

Using `flushSync` is uncommon and can hurt the performance of your app.

`flushSync` lets you force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.

* [Reference](_reference_react-dom_flushSync.md#reference)
    * [`flushSync(callback)`](_reference_react-dom_flushSync.md#flushsync)
* [Usage](_reference_react-dom_flushSync.md#usage)
    * [Flushing updates for third-party integrations](_reference_react-dom_flushSync.md#flushing-updates-for-third-party-integrations)
* [Troubleshooting](_reference_react-dom_flushSync.md#troubleshooting)
    * [I’m getting an error: “flushSync was called from inside a lifecycle method”](_reference_react-dom_flushSync.md#im-getting-an-error-flushsync-was-called-from-inside-a-lifecycle-method)

* * *

## Reference

### `flushSync(callback)`

Call `flushSync` to force React to flush any pending work and update the DOM synchronously.
```
import { flushSync } from 'react-dom';

flushSync(() => {

setSomething(123);

});
```
Most of the time, `flushSync` can be avoided. Use `flushSync` as last resort.

[See more examples below.](_reference_react-dom_flushSync.md#usage)

#### Parameters

*   `callback`: A function. React will immediately call this callback and flush any updates it contains synchronously. It may also flush any pending updates, or Effects, or updates inside of Effects. If an update suspends as a result of this `flushSync` call, the fallbacks may be re-shown.

#### Returns

`flushSync` returns `undefined`.

#### Caveats

*   `flushSync` can significantly hurt performance. Use sparingly.
*   `flushSync` may force pending Suspense boundaries to show their `fallback` state.
*   `flushSync` may run pending Effects and synchronously apply any updates they contain before returning.
*   `flushSync` may flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

* * *

## Usage

### Flushing updates for third-party integrations

When integrating with third-party code such as browser APIs or UI libraries, it may be necessary to force React to flush updates. Use `flushSync` to force React to flush any state updates inside the callback synchronously:
```
flushSync(() => {

setSomething(123);

});

// By this line, the DOM is updated.
```
This ensures that, by the time the next line of code runs, React has already updated the DOM.

**Using `flushSync` is uncommon, and using it often can significantly hurt the performance of your app.** If your app only uses React APIs, and does not integrate with third-party libraries, `flushSync` should be unnecessary.

However, it can be helpful for integrating with third-party code like browser APIs.

Some browser APIs expect results inside of callbacks to be written to the DOM synchronously, by the end of the callback, so the browser can do something with the rendered DOM. In most cases, React handles this for you automatically. But in some cases it may be necessary to force a synchronous update.

For example, the browser `onbeforeprint` API allows you to change the page immediately before the print dialog opens. This is useful for applying custom print styles that allow the document to display better for printing. In the example below, you use `flushSync` inside of the `onbeforeprint` callback to immediately “flush” the React state to the DOM. Then, by the time the print dialog opens, `isPrinting` displays “yes”:

Without `flushSync`, the print dialog will display `isPrinting` as “no”. This is because React batches the updates asynchronously and the print dialog is displayed before the state is updated.

### Pitfall

`flushSync` can significantly hurt performance, and may unexpectedly force pending Suspense boundaries to show their fallback state.

Most of the time, `flushSync` can be avoided, so use `flushSync` as a last resort.

* * *

## Troubleshooting

### I’m getting an error: “flushSync was called from inside a lifecycle method”

React cannot `flushSync` in the middle of a render. If you do, it will noop and warn:

Warning: flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.

This includes calling `flushSync` inside:

*   rendering a component.
*   `useLayoutEffect` or `useEffect` hooks.
*   Class component lifecycle methods.

For example, calling `flushSync` in an Effect will noop and warn:
```
import { useEffect } from 'react';

import { flushSync } from 'react-dom';

function MyComponent() {

useEffect(() => {

// 🚩 Wrong: calling flushSync inside an effect

flushSync(() => {

setSomething(newValue);

});

}, []);

return {/* ... */};

}
```
To fix this, you usually want to move the `flushSync` call to an event:
```
function handleClick() {

// ✅ Correct: flushSync in event handlers is safe

flushSync(() => {

setSomething(newValue);

});

}
```
If it’s difficult to move to an event, you can defer `flushSync` in a microtask:
```
useEffect(() => {

// ✅ Correct: defer flushSync to a microtask

queueMicrotask(() => {

flushSync(() => {

setSomething(newValue);

});

});

}, []);
```
This will allow the current render to finish and schedule another syncronous render to flush the updates.

### Pitfall

`flushSync` can significantly hurt performance, but this particular pattern is even worse for performance. Exhaust all other options before calling `flushSync` in a microtask as an escape hatch.

#### _reference_react-dom_hooks.md

> Source: https://react.dev/reference/react-dom/hooks
> Scraped: 12/20/2025, 10:40:59 PM

The `react-dom` package contains Hooks that are only supported for web applications (which run in the browser DOM environment). These Hooks are not supported in non-browser environments like iOS, Android, or Windows applications. If you are looking for Hooks that are supported in web browsers _and other environments_ see [the React Hooks page](_reference_react_hooks.md). This page lists all the Hooks in the `react-dom` package.

* * *

## Form Hooks

_Forms_ let you create interactive controls for submitting information. To manage forms in your components, use one of these Hooks:

* [`useFormStatus`](_reference_react-dom_hooks_useFormStatus.md) allows you to make updates to the UI based on the status of a form.
```
function Form({ action }) {

async function increment(n) {

return n + 1;

}

const [count, incrementFormAction] = useActionState(increment, 0);

return (

<form action={action}>

<button formAction={incrementFormAction}>Count: {count}</button>

<Button />

</form>

);

}

function Button() {

const { pending } = useFormStatus();

return (

<button disabled={pending} type="submit">

      Submit

</button>

);

}
```

#### _reference_react-dom_hooks_useFormStatus.md

> Source: https://react.dev/reference/react-dom/hooks/useFormStatus
> Scraped: 12/20/2025, 10:41:00 PM

`useFormStatus` is a Hook that gives you status information of the last form submission.
```
const { pending, data, method, action } = useFormStatus();
```
* [Reference](_reference_react-dom_hooks_useFormStatus.md#reference)
    * [`useFormStatus()`](_reference_react-dom_hooks_useFormStatus.md#use-form-status)
* [Usage](_reference_react-dom_hooks_useFormStatus.md#usage)
    * [Display a pending state during form submission](_reference_react-dom_hooks_useFormStatus.md#display-a-pending-state-during-form-submission)
    * [Read the form data being submitted](_reference_react-dom_hooks_useFormStatus.md#read-form-data-being-submitted)
* [Troubleshooting](_reference_react-dom_hooks_useFormStatus.md#troubleshooting)
    * [`status.pending` is never `true`](_reference_react-dom_hooks_useFormStatus.md#pending-is-never-true)

* * *

## Reference

### `useFormStatus()`

The `useFormStatus` Hook provides status information of the last form submission.
```
import { useFormStatus } from "react-dom";

import action from './actions';

function Submit() {

const status = useFormStatus();

return <button disabled={status.pending}>Submit</button>

}

export default function App() {

return (

<form action={action}>

<Submit />

</form>

);

}
```
To get status information, the `Submit` component must be rendered within a `<form>`. The Hook returns information like the `pending` property which tells you if the form is actively submitting.

In the above example, `Submit` uses this information to disable `<button>` presses while the form is submitting.

[See more examples below.](_reference_react-dom_hooks_useFormStatus.md#usage)

#### Parameters

`useFormStatus` does not take any parameters.

#### Returns

A `status` object with the following properties:

*   `pending`: A boolean. If `true`, this means the parent `<form>` is pending submission. Otherwise, `false`.

*   `data`: An object implementing the [`FormData interface`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) that contains the data the parent `<form>` is submitting. If there is no active submission or no parent `<form>`, it will be `null`.

*   `method`: A string value of either `'get'` or `'post'`. This represents whether the parent `<form>` is submitting with either a `GET` or `POST` [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). By default, a `<form>` will use the `GET` method and can be specified by the [`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method) property.

*   `action`: A reference to the function passed to the `action` prop on the parent `<form>`. If there is no parent `<form>`, the property is `null`. If there is a URI value provided to the `action` prop, or no `action` prop specified, `status.action` will be `null`.

#### Caveats

*   The `useFormStatus` Hook must be called from a component that is rendered inside a `<form>`.
*   `useFormStatus` will only return status information for a parent `<form>`. It will not return status information for any `<form>` rendered in that same component or children components.

* * *

## Usage

### Display a pending state during form submission

To display a pending state while a form is submitting, you can call the `useFormStatus` Hook in a component rendered in a `<form>` and read the `pending` property returned.

Here, we use the `pending` property to indicate the form is submitting.
```
import { useFormStatus } from "react-dom";
import { submitForm } from "./actions.js";
function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
function Form({ action }) {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}
export default function App() {
  return <Form action={submitForm} />;
}
```
### Pitfall

##### `useFormStatus` will not return status information for a `<form>` rendered in the same component.

The `useFormStatus` Hook only returns status information for a parent `<form>` and not for any `<form>` rendered in the same component calling the Hook, or child components.
```
function Form() {

// 🚩 `pending` will never be true

// useFormStatus does not track the form rendered in this component

const { pending } = useFormStatus();

return <form action={submit}></form>;

}
```
Instead call `useFormStatus` from inside a component that is located inside `<form>`.
```
function Submit() {

// ✅ `pending` will be derived from the form that wraps the Submit component

const { pending } = useFormStatus();

return <button disabled={pending}>...</button>;

}

function Form() {

// This is the

 `useFormStatus` tracks

return (

<form action={submit}>

<Submit />

</form>

);

}
```
### Read the form data being submitted

You can use the `data` property of the status information returned from `useFormStatus` to display what data is being submitted by the user.

Here, we have a form where users can request a username. We can use `useFormStatus` to display a temporary status message confirming what username they have requested.
```
import {useState, useMemo, useRef} from 'react';
import {useFormStatus} from 'react-dom';
export default function UsernameForm() {
  const {pending, data} = useFormStatus();
  return (

      <h3>Request a Username: </h3>
      <input type="text" name="username" disabled={pending}/>
      <button type="submit" disabled={pending}>
        Submit
      </button>
      <br />
      <p>{data ? `Requesting ${data?.get("username")}...`: ''}</p>

  );
}
```
* * *

## Troubleshooting

### `status.pending` is never `true`

`useFormStatus` will only return status information for a parent `<form>`.

If the component that calls `useFormStatus` is not nested in a `<form>`, `status.pending` will always return `false`. Verify `useFormStatus` is called in a component that is a child of a `<form>` element.

`useFormStatus` will not track the status of a `<form>` rendered in the same component. See [Pitfall](_reference_react-dom_hooks_useFormStatus.md#useformstatus-will-not-return-status-information-for-a-form-rendered-in-the-same-component) for more details.

#### _reference_react-dom_preconnect.md

> Source: https://react.dev/reference/react-dom/preconnect
> Scraped: 12/20/2025, 10:41:05 PM

`preconnect` lets you eagerly connect to a server that you expect to load resources from.
```
preconnect("https://example.com");
```
To preconnect to a host, call the `preconnect` function from `react-dom`.

The `preconnect` function provides the browser with a hint that it should open a connection to the given server. If the browser chooses to do so, this can speed up the loading of resources from that server.

`preconnect` returns nothing.

Call `preconnect` when rendering a component if you know that its children will load external resources from that host.

Call `preconnect` in an event handler before transitioning to a page or state where external resources will be needed. This gets the process started earlier than if you call it during the rendering of the new page or state.

#### _reference_react-dom_prefetchDNS.md

> Source: https://react.dev/reference/react-dom/prefetchDNS
> Scraped: 12/20/2025, 10:41:05 PM

`prefetchDNS` lets you eagerly look up the IP of a server that you expect to load resources from.
```
prefetchDNS("https://example.com");
```
To look up a host, call the `prefetchDNS` function from `react-dom`.

The prefetchDNS function provides the browser with a hint that it should look up the IP address of a given server. If the browser chooses to do so, this can speed up the loading of resources from that server.

`prefetchDNS` returns nothing.

Call `prefetchDNS` when rendering a component if you know that its children will load external resources from that host.

Call `prefetchDNS` in an event handler before transitioning to a page or state where external resources will be needed. This gets the process started earlier than if you call it during the rendering of the new page or state.

#### _reference_react-dom_preinit.md

> Source: https://react.dev/reference/react-dom/preinit
> Scraped: 12/20/2025, 10:41:05 PM

### Note

[React-based frameworks](_learn_creating-a-react-app.md) frequently handle resource loading for you, so you might not have to call this API yourself. Consult your framework’s documentation for details.

`preinit` lets you eagerly fetch and evaluate a stylesheet or external script.
```
preinit("https://example.com/script.js", {as: "script"});
```
To preinit a script or stylesheet, call the `preinit` function from `react-dom`.

The `preinit` function provides the browser with a hint that it should start downloading and executing the given resource, which can save time. Scripts that you `preinit` are executed when they finish downloading. Stylesheets that you preinit are inserted into the document, which causes them to go into effect right away.

`preinit` returns nothing.

Call `preinit` when rendering a component if you know that it or its children will use a specific resource, and you’re OK with the resource being evaluated and thereby taking effect immediately upon being downloaded.

#### _reference_react-dom_preinitModule.md

> Source: https://react.dev/reference/react-dom/preinitModule
> Scraped: 12/20/2025, 10:41:06 PM

### Note

[React-based frameworks](_learn_creating-a-react-app.md) frequently handle resource loading for you, so you might not have to call this API yourself. Consult your framework’s documentation for details.

`preinitModule` lets you eagerly fetch and evaluate an ESM module.
```
preinitModule("https://example.com/module.js", {as: "script"});
```
* [Reference](_reference_react-dom_preinitModule.md#reference)
    * [`preinitModule(href, options)`](_reference_react-dom_preinitModule.md#preinitmodule)
* [Usage](_reference_react-dom_preinitModule.md#usage)
    * [Preloading when rendering](_reference_react-dom_preinitModule.md#preloading-when-rendering)
    * [Preloading in an event handler](_reference_react-dom_preinitModule.md#preloading-in-an-event-handler)

* * *

## Reference

### `preinitModule(href, options)`

To preinit an ESM module, call the `preinitModule` function from `react-dom`.
```
import { preinitModule } from 'react-dom';

function AppRoot() {

preinitModule("https://example.com/module.js", {as: "script"});

// ...

}
```
[See more examples below.](_reference_react-dom_preinitModule.md#usage)

The `preinitModule` function provides the browser with a hint that it should start downloading and executing the given module, which can save time. Modules that you `preinit` are executed when they finish downloading.

#### Parameters

*   `href`: a string. The URL of the module you want to download and execute.
*   `options`: an object. It contains the following properties:
    *   `as`: a required string. It must be `'script'`.
    *   `crossOrigin`: a string. The [CORS policy](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) to use. Its possible values are `anonymous` and `use-credentials`.
    *   `integrity`: a string. A cryptographic hash of the module, to [verify its authenticity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
    *   `nonce`: a string. A cryptographic [nonce to allow the module](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) when using a strict Content Security Policy.

#### Returns

`preinitModule` returns nothing.

#### Caveats

*   Multiple calls to `preinitModule` with the same `href` have the same effect as a single call.
*   In the browser, you can call `preinitModule` in any situation: while rendering a component, in an Effect, in an event handler, and so on.
*   In server-side rendering or when rendering Server Components, `preinitModule` only has an effect if you call it while rendering a component or in an async context originating from rendering a component. Any other calls will be ignored.

* * *

## Usage

### Preloading when rendering

Call `preinitModule` when rendering a component if you know that it or its children will use a specific module and you’re OK with the module being evaluated and thereby taking effect immediately upon being downloaded.
```
import { preinitModule } from 'react-dom';

function AppRoot() {

preinitModule("https://example.com/module.js", {as: "script"});

return ...;

}
```
If you want the browser to download the module but not to execute it right away, use [`preloadModule`](_reference_react-dom_preloadModule.md) instead. If you want to preinit a script that isn’t an ESM module, use [`preinit`](_reference_react-dom_preinit.md).

### Preloading in an event handler

Call `preinitModule` in an event handler before transitioning to a page or state where the module will be needed. This gets the process started earlier than if you call it during the rendering of the new page or state.
```
import { preinitModule } from 'react-dom';

function CallToAction() {

const onClick = () => {

preinitModule("https://example.com/module.js", {as: "script"});

startWizard();

}

return (

<button onClick={onClick}>Start Wizard</button>

);

}
```

#### _reference_react-dom_preload.md

> Source: https://react.dev/reference/react-dom/preload
> Scraped: 12/20/2025, 10:41:06 PM

### Note

[React-based frameworks](_learn_creating-a-react-app.md) frequently handle resource loading for you, so you might not have to call this API yourself. Consult your framework’s documentation for details.

`preload` lets you eagerly fetch a resource such as a stylesheet, font, or external script that you expect to use.
```
preload("https://example.com/font.woff2", {as: "font"});
```
To preload a resource, call the `preload` function from `react-dom`.

The `preload` function provides the browser with a hint that it should start downloading the given resource, which can save time.

`preload` returns nothing.

Call `preload` when rendering a component if you know that it or its children will use a specific resource.

#### _reference_react-dom_preloadModule.md

> Source: https://react.dev/reference/react-dom/preloadModule
> Scraped: 12/20/2025, 10:41:05 PM

### Note

[React-based frameworks](_learn_creating-a-react-app.md) frequently handle resource loading for you, so you might not have to call this API yourself. Consult your framework’s documentation for details.

`preloadModule` lets you eagerly fetch an ESM module that you expect to use.
```
preloadModule("https://example.com/module.js", {as: "script"});
```
* [Reference](_reference_react-dom_preloadModule.md#reference)
    * [`preloadModule(href, options)`](_reference_react-dom_preloadModule.md#preloadmodule)
* [Usage](_reference_react-dom_preloadModule.md#usage)
    * [Preloading when rendering](_reference_react-dom_preloadModule.md#preloading-when-rendering)
    * [Preloading in an event handler](_reference_react-dom_preloadModule.md#preloading-in-an-event-handler)

* * *

## Reference

### `preloadModule(href, options)`

To preload an ESM module, call the `preloadModule` function from `react-dom`.
```
import { preloadModule } from 'react-dom';

function AppRoot() {

preloadModule("https://example.com/module.js", {as: "script"});

// ...

}
```
[See more examples below.](_reference_react-dom_preloadModule.md#usage)

The `preloadModule` function provides the browser with a hint that it should start downloading the given module, which can save time.

#### Parameters

*   `href`: a string. The URL of the module you want to download.
*   `options`: an object. It contains the following properties:
    *   `as`: a required string. It must be `'script'`.
    *   `crossOrigin`: a string. The [CORS policy](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) to use. Its possible values are `anonymous` and `use-credentials`.
    *   `integrity`: a string. A cryptographic hash of the module, to [verify its authenticity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
    *   `nonce`: a string. A cryptographic [nonce to allow the module](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) when using a strict Content Security Policy.

#### Returns

`preloadModule` returns nothing.

#### Caveats

*   Multiple calls to `preloadModule` with the same `href` have the same effect as a single call.
*   In the browser, you can call `preloadModule` in any situation: while rendering a component, in an Effect, in an event handler, and so on.
*   In server-side rendering or when rendering Server Components, `preloadModule` only has an effect if you call it while rendering a component or in an async context originating from rendering a component. Any other calls will be ignored.

* * *

## Usage

### Preloading when rendering

Call `preloadModule` when rendering a component if you know that it or its children will use a specific module.
```
import { preloadModule } from 'react-dom';

function AppRoot() {

preloadModule("https://example.com/module.js", {as: "script"});

return ...;

}
```
If you want the browser to start executing the module immediately (rather than just downloading it), use [`preinitModule`](_reference_react-dom_preinitModule.md) instead. If you want to load a script that isn’t an ESM module, use [`preload`](_reference_react-dom_preload.md).

### Preloading in an event handler

Call `preloadModule` in an event handler before transitioning to a page or state where the module will be needed. This gets the process started earlier than if you call it during the rendering of the new page or state.
```
import { preloadModule } from 'react-dom';

function CallToAction() {

const onClick = () => {

preloadModule("https://example.com/module.js", {as: "script"});

startWizard();

}

return (

<button onClick={onClick}>Start Wizard</button>

);

}
```

#### _reference_react-dom_server.md

> Source: https://react.dev/reference/react-dom/server
> Scraped: 12/20/2025, 10:41:06 PM

The `react-dom/server` APIs let you server-side render React components to HTML. These APIs are only used on the server at the top level of your app to generate the initial HTML. A [framework](_learn_creating-a-react-app.md#full-stack-frameworks) may call them for you. Most of your components don’t need to import or use them.

These methods are only available in the environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), which includes browsers, Deno, and some modern edge runtimes:

### Note

Node.js also includes these methods for compatibility, but they are not recommended due to worse performance. Use the [dedicated Node.js APIs](_reference_react-dom_server.md#server-apis-for-nodejs-streams) instead.

They have limited functionality compared to the streaming APIs.

#### _reference_react-dom_server_renderToPipeableStream.md

> Source: https://react.dev/reference/react-dom/server/renderToPipeableStream
> Scraped: 12/20/2025, 10:41:06 PM

`renderToPipeableStream` renders a React tree to a pipeable [Node.js Stream.](https://nodejs.org/api/stream.html)
```
const { pipe, abort } = renderToPipeableStream(reactNode, options?)
```
* [Reference](_reference_react-dom_server_renderToPipeableStream.md#reference)
    * [`renderToPipeableStream(reactNode, options?)`](_reference_react-dom_server_renderToPipeableStream.md#rendertopipeablestream)
* [Usage](_reference_react-dom_server_renderToPipeableStream.md#usage)
    * [Rendering a React tree as HTML to a Node.js Stream](_reference_react-dom_server_renderToPipeableStream.md#rendering-a-react-tree-as-html-to-a-nodejs-stream)
    * [Streaming more content as it loads](_reference_react-dom_server_renderToPipeableStream.md#streaming-more-content-as-it-loads)
    * [Specifying what goes into the shell](_reference_react-dom_server_renderToPipeableStream.md#specifying-what-goes-into-the-shell)
    * [Logging crashes on the server](_reference_react-dom_server_renderToPipeableStream.md#logging-crashes-on-the-server)
    * [Recovering from errors inside the shell](_reference_react-dom_server_renderToPipeableStream.md#recovering-from-errors-inside-the-shell)
    * [Recovering from errors outside the shell](_reference_react-dom_server_renderToPipeableStream.md#recovering-from-errors-outside-the-shell)
    * [Setting the status code](_reference_react-dom_server_renderToPipeableStream.md#setting-the-status-code)
    * [Handling different errors in different ways](_reference_react-dom_server_renderToPipeableStream.md#handling-different-errors-in-different-ways)
    * [Waiting for all content to load for crawlers and static generation](_reference_react-dom_server_renderToPipeableStream.md#waiting-for-all-content-to-load-for-crawlers-and-static-generation)
    * [Aborting server rendering](_reference_react-dom_server_renderToPipeableStream.md#aborting-server-rendering)

### Note

* * *

## Reference

### `renderToPipeableStream(reactNode, options?)`

Call `renderToPipeableStream` to render your React tree as HTML into a [Node.js Stream.](https://nodejs.org/api/stream.html#writable-streams)
```
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {

bootstrapScripts: ['/main.js'],

onShellReady() {

response.setHeader('content-type', 'text/html');

pipe(response);

}

});
```
On the client, call [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) to make the server-generated HTML interactive.

[See more examples below.](_reference_react-dom_server_renderToPipeableStream.md#usage)

#### Parameters

*   `reactNode`: A React node you want to render to HTML. For example, a JSX element like `<App />`. It is expected to represent the entire document, so the `App` component should render the `<html>` tag.

*   **optional** `options`: An object with streaming options.

    *   **optional** `bootstrapScriptContent`: If specified, this string will be placed in an inline `<script>` tag.
    *   **optional** `bootstrapScripts`: An array of string URLs for the `<script>` tags to emit on the page. Use this to include the `<script>` that calls [`hydrateRoot`.](_reference_react-dom_client_hydrateRoot.md) Omit it if you don’t want to run React on the client at all.
    *   **optional** `bootstrapModules`: Like `bootstrapScripts`, but emits [`<script type="module">`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) instead.
    *   **optional** `identifierPrefix`: A string prefix React uses for IDs generated by [`useId`.](_reference_react_useId.md) Useful to avoid conflicts when using multiple roots on the same page. Must be the same prefix as passed to [`hydrateRoot`.](_reference_react-dom_client_hydrateRoot.md#parameters)
    *   **optional** `namespaceURI`: A string with the root [namespace URI](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#important_namespace_uris) for the stream. Defaults to regular HTML. Pass `'http://www.w3.org/2000/svg'` for SVG or `'http://www.w3.org/1998/Math/MathML'` for MathML.
    *   **optional** `nonce`: A [`nonce`](http://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#nonce) string to allow scripts for [`script-src` Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src).
    *   **optional** `onAllReady`: A callback that fires when all rendering is complete, including both the [shell](_reference_react-dom_server_renderToPipeableStream.md#specifying-what-goes-into-the-shell) and all additional [content.](_reference_react-dom_server_renderToPipeableStream.md#streaming-more-content-as-it-loads) You can use this instead of `onShellReady` [for crawlers and static generation.](_reference_react-dom_server_renderToPipeableStream.md#waiting-for-all-content-to-load-for-crawlers-and-static-generation) If you start streaming here, you won’t get any progressive loading. The stream will contain the final HTML.
    *   **optional** `onError`: A callback that fires whenever there is a server error, whether [recoverable](_reference_react-dom_server_renderToPipeableStream.md#recovering-from-errors-outside-the-shell) or [not.](_reference_react-dom_server_renderToPipeableStream.md#recovering-from-errors-inside-the-shell) By default, this only calls `console.error`. If you override it to [log crash reports,](_reference_react-dom_server_renderToPipeableStream.md#logging-crashes-on-the-server) make sure that you still call `console.error`. You can also use it to [adjust the status code](_reference_react-dom_server_renderToPipeableStream.md#setting-the-status-code) before the shell is emitted.
    *   **optional** `onShellReady`: A callback that fires right after the [initial shell](_reference_react-dom_server_renderToPipeableStream.md#specifying-what-goes-into-the-shell) has been rendered. You can [set the status code](_reference_react-dom_server_renderToPipeableStream.md#setting-the-status-code) and call `pipe` here to start streaming. React will [stream the additional content](_reference_react-dom_server_renderToPipeableStream.md#streaming-more-content-as-it-loads) after the shell along with the inline `<script>` tags that replace the HTML loading fallbacks with the content.
    *   **optional** `onShellError`: A callback that fires if there was an error rendering the initial shell. It receives the error as an argument. No bytes were emitted from the stream yet, and neither `onShellReady` nor `onAllReady` will get called, so you can [output a fallback HTML shell.](_reference_react-dom_server_renderToPipeableStream.md#recovering-from-errors-inside-the-shell)
    *   **optional** `progressiveChunkSize`: The number of bytes in a chunk. [Read more about the default heuristic.](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-server/src/ReactFizzServer.js#L210-L225)

#### Returns

`renderToPipeableStream` returns an object with two methods:

*   `pipe` outputs the HTML into the provided [Writable Node.js Stream.](https://nodejs.org/api/stream.html#writable-streams) Call `pipe` in `onShellReady` if you want to enable streaming, or in `onAllReady` for crawlers and static generation.
*   `abort` lets you [abort server rendering](_reference_react-dom_server_renderToPipeableStream.md#aborting-server-rendering) and render the rest on the client.

* * *

## Usage

### Rendering a React tree as HTML to a Node.js Stream

Call `renderToPipeableStream` to render your React tree as HTML into a [Node.js Stream:](https://nodejs.org/api/stream.html#writable-streams)
```
import { renderToPipeableStream } from 'react-dom/server';

// The route handler syntax depends on your backend framework

app.use('/', (request, response) => {

const { pipe } = renderToPipeableStream(, {

bootstrapScripts: ['/main.js'],

onShellReady() {

response.setHeader('content-type', 'text/html');

pipe(response);

}

});

});
```
Along with the root component, you need to provide a list of bootstrap `<script>` paths. Your root component should return **the entire document including the root `<html>` tag.**

For example, it might look like this:
```
export default function App() {

return (

<html>

<head>

<meta charSet="utf-8" />

<meta name="viewport" content="width=device-width, initial-scale=1" />

<link rel="stylesheet" href="/styles.css"></link>

<title>My app</title>

</head>

<body>

<Router />

</body>

</html>

);

}
```
React will inject the [doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) and your bootstrap `<script>` tags into the resulting HTML stream:
```
<!DOCTYPE html>

<html>

</html>

<script src="/main.js" async=""></script>
```
On the client, your bootstrap script should [hydrate the entire `document` with a call to `hydrateRoot`:](_reference_react-dom_client_hydrateRoot.md#hydrating-an-entire-document)
```
import { hydrateRoot } from 'react-dom/client';

import App from './App.js';

hydrateRoot(document, );
```
This will attach event listeners to the server-generated HTML and make it interactive.

##### Deep Dive

#### Reading CSS and JS asset paths from the build output

The final asset URLs (like JavaScript and CSS files) are often hashed after the build. For example, instead of `styles.css` you might end up with `styles.123456.css`. Hashing static asset filenames guarantees that every distinct build of the same asset will have a different filename. This is useful because it lets you safely enable long-term caching for static assets: a file with a certain name would never change content.

However, if you don’t know the asset URLs until after the build, there’s no way for you to put them in the source code. For example, hardcoding `"/styles.css"` into JSX like earlier wouldn’t work. To keep them out of your source code, your root component can read the real filenames from a map passed as a prop:
```
export default function App({ assetMap }) {

return (

<html>

<head>

        ...

<link rel="stylesheet" href={assetMap['styles.css']}></link>

        ...

</head>

      ...

</html>

);

}
```
On the server, render `<App assetMap={assetMap} />` and pass your `assetMap` with the asset URLs:
```
// You'd need to get this JSON from your build tooling, e.g. read it from the build output.

const assetMap = {

'styles.css': '/styles.123456.css',

'main.js': '/main.123456.js'

};

app.use('/', (request, response) => {

const { pipe } = renderToPipeableStream(<App assetMap={assetMap} />, {

bootstrapScripts: [assetMap['main.js']],

onShellReady() {

response.setHeader('content-type', 'text/html');

pipe(response);

}

});

});
```
Since your server is now rendering `<App assetMap={assetMap} />`, you need to render it with `assetMap` on the client too to avoid hydration errors. You can serialize and pass `assetMap` to the client like this:
```
// You'd need to get this JSON from your build tooling.

const assetMap = {

'styles.css': '/styles.123456.css',

'main.js': '/main.123456.js'

};

app.use('/', (request, response) => {

const { pipe } = renderToPipeableStream(<App assetMap={assetMap} />, {

// Careful: It's safe to stringify() this because this data isn't user-generated.

bootstrapScriptContent: `window.assetMap = ${JSON.stringify(assetMap)};`,

bootstrapScripts: [assetMap['main.js']],

onShellReady() {

response.setHeader('content-type', 'text/html');

pipe(response);

}

});

});
```
In the example above, the `bootstrapScriptContent` option adds an extra inline `<script>` tag that sets the global `window.assetMap` variable on the client. This lets the client code read the same `assetMap`:
```
import { hydrateRoot } from 'react-dom/client';

import App from './App.js';

hydrateRoot(document, <App assetMap={window.assetMap} />);
```
Both client and server render `App` with the same `assetMap` prop, so there are no hydration errors.

* * *

### Streaming more content as it loads

Streaming allows the user to start seeing the content even before all the data has loaded on the server. For example, consider a profile page that shows a cover, a sidebar with friends and photos, and a list of posts:
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Sidebar>

<Friends />

<Photos />

</Sidebar>

<Posts />

</ProfileLayout>

);

}
```
Imagine that loading data for `<Posts />` takes some time. Ideally, you’d want to show the rest of the profile page content to the user without waiting for the posts. To do this, [wrap `Posts` in a `<Suspense>` boundary:](_reference_react_Suspense.md#displaying-a-fallback-while-content-is-loading)
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Sidebar>

<Friends />

<Photos />

</Sidebar>

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</ProfileLayout>

);

}
```
This tells React to start streaming the HTML before `Posts` loads its data. React will send the HTML for the loading fallback (`PostsGlimmer`) first, and then, when `Posts` finishes loading its data, React will send the remaining HTML along with an inline `<script>` tag that replaces the loading fallback with that HTML. From the user’s perspective, the page will first appear with the `PostsGlimmer`, later replaced by the `Posts`.

You can further [nest `<Suspense>` boundaries](_reference_react_Suspense.md#revealing-nested-content-as-it-loads) to create a more granular loading sequence:
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Suspense fallback={<BigSpinner />}>

<Sidebar>

<Friends />

<Photos />

</Sidebar>

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</Suspense>

</ProfileLayout>

);

}
```
In this example, React can start streaming the page even earlier. Only `ProfileLayout` and `ProfileCover` must finish rendering first because they are not wrapped in any `<Suspense>` boundary. However, if `Sidebar`, `Friends`, or `Photos` need to load some data, React will send the HTML for the `BigSpinner` fallback instead. Then, as more data becomes available, more content will continue to be revealed until all of it becomes visible.

Streaming does not need to wait for React itself to load in the browser, or for your app to become interactive. The HTML content from the server will get progressively revealed before any of the `<script>` tags load.

[Read more about how streaming HTML works.](https://github.com/reactwg/react-18/discussions/37)

### Note

**Only Suspense-enabled data sources will activate the Suspense component.** They include:

*   Data fetching with Suspense-enabled frameworks like [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) and [Next.js](https://nextjs.org/docs/getting-started/react-essentials)
*   Lazy-loading component code with [`lazy`](_reference_react_lazy.md)
*   Reading the value of a Promise with [`use`](_reference_react_use.md)

Suspense **does not** detect when data is fetched inside an Effect or event handler.

The exact way you would load data in the `Posts` component above depends on your framework. If you use a Suspense-enabled framework, you’ll find the details in its data fetching documentation.

Suspense-enabled data fetching without the use of an opinionated framework is not yet supported. The requirements for implementing a Suspense-enabled data source are unstable and undocumented. An official API for integrating data sources with Suspense will be released in a future version of React.

* * *

### Specifying what goes into the shell

The part of your app outside of any `<Suspense>` boundaries is called _the shell:_
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Suspense fallback={<BigSpinner />}>

<Sidebar>

<Friends />

<Photos />

</Sidebar>

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</Suspense>

</ProfileLayout>

);

}
```
It determines the earliest loading state that the user may see:
```
<ProfileLayout>

<ProfileCover />

<BigSpinner />

</ProfileLayout>
```
If you wrap the whole app into a `<Suspense>` boundary at the root, the shell will only contain that spinner. However, that’s not a pleasant user experience because seeing a big spinner on the screen can feel slower and more annoying than waiting a bit more and seeing the real layout. This is why usually you’ll want to place the `<Suspense>` boundaries so that the shell feels _minimal but complete_—like a skeleton of the entire page layout.

The `onShellReady` callback fires when the entire shell has been rendered. Usually, you’ll start streaming then:
```
const { pipe } = renderToPipeableStream(<App />, {

bootstrapScripts: ['/main.js'],

onShellReady() {

response.setHeader('content-type', 'text/html');

pipe(response);

}

});
```
By the time `onShellReady` fires, components in nested `<Suspense>` boundaries might still be loading data.

* * *

### Logging crashes on the server

By default, all errors on the server are logged to console. You can override this behavior to log crash reports:
```
const { pipe } = renderToPipeableStream(<App />, {

bootstrapScripts: ['/main.js'],

onShellReady() {

response.setHeader('content-type', 'text/html');

pipe(response);

},

onError(error) {

console.error(error);

logServerCrashReport(error);

}

});
```
If you provide a custom `onError` implementation, don’t forget to also log errors to the console like above.

* * *

### Recovering from errors inside the shell

In this example, the shell contains `ProfileLayout`, `ProfileCover`, and `PostsGlimmer`:
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</ProfileLayout>

);

}
```
If an error occurs while rendering those components, React won’t have any meaningful HTML to send to the client. Override `onShellError` to send a fallback HTML that doesn’t rely on server rendering as the last resort:
```
const { pipe } = renderToPipeableStream(<App />, {

bootstrapScripts: ['/main.js'],

onShellReady() {

response.setHeader('content-type', 'text/html');

pipe(response);

},

onShellError(error) {

response.statusCode = 500;

response.setHeader('content-type', 'text/html');

response.send('
# Something went wrong

');

},

onError(error) {

console.error(error);

logServerCrashReport(error);

}

});
```
If there is an error while generating the shell, both `onError` and `onShellError` will fire. Use `onError` for error reporting and use `onShellError` to send the fallback HTML document. Your fallback HTML does not have to be an error page. Instead, you may include an alternative shell that renders your app on the client only.

* * *

### Recovering from errors outside the shell

In this example, the `<Posts />` component is wrapped in `<Suspense>` so it is _not_ a part of the shell:
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</ProfileLayout>

);

}
```
If an error happens in the `Posts` component or somewhere inside it, React will [try to recover from it:](_reference_react_Suspense.md#providing-a-fallback-for-server-errors-and-client-only-content)

1.  It will emit the loading fallback for the closest `<Suspense>` boundary (`PostsGlimmer`) into the HTML.
2.  It will “give up” on trying to render the `Posts` content on the server anymore.
3.  When the JavaScript code loads on the client, React will _retry_ rendering `Posts` on the client.

If retrying rendering `Posts` on the client _also_ fails, React will throw the error on the client. As with all the errors thrown during rendering, the [closest parent error boundary](_reference_react_Component.md#static-getderivedstatefromerror) determines how to present the error to the user. In practice, this means that the user will see a loading indicator until it is certain that the error is not recoverable.

If retrying rendering `Posts` on the client succeeds, the loading fallback from the server will be replaced with the client rendering output. The user will not know that there was a server error. However, the server `onError` callback and the client [`onRecoverableError`](_reference_react-dom_client_hydrateRoot.md#hydrateroot) callbacks will fire so that you can get notified about the error.

* * *

### Setting the status code

Streaming introduces a tradeoff. You want to start streaming the page as early as possible so that the user can see the content sooner. However, once you start streaming, you can no longer set the response status code.

By [dividing your app](_reference_react-dom_server_renderToPipeableStream.md#specifying-what-goes-into-the-shell) into the shell (above all `<Suspense>` boundaries) and the rest of the content, you’ve already solved a part of this problem. If the shell errors, you’ll get the `onShellError` callback which lets you set the error status code. Otherwise, you know that the app may recover on the client, so you can send “OK”.
```
const { pipe } = renderToPipeableStream(<App />, {

bootstrapScripts: ['/main.js'],

onShellReady() {

response.statusCode = 200;

response.setHeader('content-type', 'text/html');

pipe(response);

},

onShellError(error) {

response.statusCode = 500;

response.setHeader('content-type', 'text/html');

response.send('
# Something went wrong

');

},

onError(error) {

console.error(error);

logServerCrashReport(error);

}

});
```
If a component _outside_ the shell (i.e. inside a `<Suspense>` boundary) throws an error, React will not stop rendering. This means that the `onError` callback will fire, but you will still get `onShellReady` instead of `onShellError`. This is because React will try to recover from that error on the client, [as described above.](_reference_react-dom_server_renderToPipeableStream.md#recovering-from-errors-outside-the-shell)

However, if you’d like, you can use the fact that something has errored to set the status code:
```
let didError = false;

const { pipe } = renderToPipeableStream(<App />, {

bootstrapScripts: ['/main.js'],

onShellReady() {

response.statusCode = didError ? 500 : 200;

response.setHeader('content-type', 'text/html');

pipe(response);

},

onShellError(error) {

response.statusCode = 500;

response.setHeader('content-type', 'text/html');

response.send('
# Something went wrong

');

},

onError(error) {

didError = true;

console.error(error);

logServerCrashReport(error);

}

});
```
This will only catch errors outside the shell that happened while generating the initial shell content, so it’s not exhaustive. If knowing whether an error occurred for some content is critical, you can move it up into the shell.

* * *

### Handling different errors in different ways

You can [create your own `Error` subclasses](https://javascript.info/custom-errors) and use the [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) operator to check which error is thrown. For example, you can define a custom `NotFoundError` and throw it from your component. Then your `onError`, `onShellReady`, and `onShellError` callbacks can do something different depending on the error type:
```
let didError = false;

let caughtError = null;

function getStatusCode() {

if (didError) {

if (caughtError instanceof NotFoundError) {

return 404;

} else {

return 500;

}

} else {

return 200;

}

}

const { pipe } = renderToPipeableStream(<App />, {

bootstrapScripts: ['/main.js'],

onShellReady() {

response.statusCode = getStatusCode();

response.setHeader('content-type', 'text/html');

pipe(response);

},

onShellError(error) {

response.statusCode = getStatusCode();

response.setHeader('content-type', 'text/html');

response.send('
# Something went wrong

');

},

onError(error) {

didError = true;

caughtError = error;

console.error(error);

logServerCrashReport(error);

}

});
```
Keep in mind that once you emit the shell and start streaming, you can’t change the status code.

* * *

### Waiting for all content to load for crawlers and static generation

Streaming offers a better user experience because the user can see the content as it becomes available.

However, when a crawler visits your page, or if you’re generating the pages at the build time, you might want to let all of the content load first and then produce the final HTML output instead of revealing it progressively.

You can wait for all the content to load using the `onAllReady` callback:
```
let didError = false;

let isCrawler = // ... depends on your bot detection strategy ...

const { pipe } = renderToPipeableStream(<App />, {

bootstrapScripts: ['/main.js'],

onShellReady() {

if (!isCrawler) {

response.statusCode = didError ? 500 : 200;

response.setHeader('content-type', 'text/html');

pipe(response);

}

},

onShellError(error) {

response.statusCode = 500;

response.setHeader('content-type', 'text/html');

response.send('
# Something went wrong

');

},

onAllReady() {

if (isCrawler) {

response.statusCode = didError ? 500 : 200;

response.setHeader('content-type', 'text/html');

pipe(response);

}

},

onError(error) {

didError = true;

console.error(error);

logServerCrashReport(error);

}

});
```
A regular visitor will get a stream of progressively loaded content. A crawler will receive the final HTML output after all the data loads. However, this also means that the crawler will have to wait for _all_ data, some of which might be slow to load or error. Depending on your app, you could choose to send the shell to the crawlers too.

* * *

### Aborting server rendering

You can force the server rendering to “give up” after a timeout:
```
const { pipe, abort } = renderToPipeableStream(<App />, {

// ...

});

setTimeout(() => {

abort();

}, 10000);
```
React will flush the remaining loading fallbacks as HTML, and will attempt to render the rest on the client.

#### _reference_react-dom_server_renderToReadableStream.md

> Source: https://react.dev/reference/react-dom/server/renderToReadableStream
> Scraped: 12/20/2025, 10:41:06 PM

`renderToReadableStream` renders a React tree to a [Readable Web Stream.](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
```
const stream = await renderToReadableStream(reactNode, options?)
```
* [Reference](_reference_react-dom_server_renderToReadableStream.md#reference)
    * [`renderToReadableStream(reactNode, options?)`](_reference_react-dom_server_renderToReadableStream.md#rendertoreadablestream)
* [Usage](_reference_react-dom_server_renderToReadableStream.md#usage)
    * [Rendering a React tree as HTML to a Readable Web Stream](_reference_react-dom_server_renderToReadableStream.md#rendering-a-react-tree-as-html-to-a-readable-web-stream)
    * [Streaming more content as it loads](_reference_react-dom_server_renderToReadableStream.md#streaming-more-content-as-it-loads)
    * [Specifying what goes into the shell](_reference_react-dom_server_renderToReadableStream.md#specifying-what-goes-into-the-shell)
    * [Logging crashes on the server](_reference_react-dom_server_renderToReadableStream.md#logging-crashes-on-the-server)
    * [Recovering from errors inside the shell](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-inside-the-shell)
    * [Recovering from errors outside the shell](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-outside-the-shell)
    * [Setting the status code](_reference_react-dom_server_renderToReadableStream.md#setting-the-status-code)
    * [Handling different errors in different ways](_reference_react-dom_server_renderToReadableStream.md#handling-different-errors-in-different-ways)
    * [Waiting for all content to load for crawlers and static generation](_reference_react-dom_server_renderToReadableStream.md#waiting-for-all-content-to-load-for-crawlers-and-static-generation)
    * [Aborting server rendering](_reference_react-dom_server_renderToReadableStream.md#aborting-server-rendering)

### Note

* * *

## Reference

### `renderToReadableStream(reactNode, options?)`

Call `renderToReadableStream` to render your React tree as HTML into a [Readable Web Stream.](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
```
import { renderToReadableStream } from 'react-dom/server';

async function handler(request) {

const stream = await renderToReadableStream(<App />, {

bootstrapScripts: ['/main.js']

});

return new Response(stream, {

headers: { 'content-type': 'text/html' },

});

}
```
On the client, call [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) to make the server-generated HTML interactive.

[See more examples below.](_reference_react-dom_server_renderToReadableStream.md#usage)

#### Parameters

*   `reactNode`: A React node you want to render to HTML. For example, a JSX element like `<App />`. It is expected to represent the entire document, so the `App` component should render the `<html>` tag.

*   **optional** `options`: An object with streaming options.

    *   **optional** `bootstrapScriptContent`: If specified, this string will be placed in an inline `<script>` tag.
    *   **optional** `bootstrapScripts`: An array of string URLs for the `<script>` tags to emit on the page. Use this to include the `<script>` that calls [`hydrateRoot`.](_reference_react-dom_client_hydrateRoot.md) Omit it if you don’t want to run React on the client at all.
    *   **optional** `bootstrapModules`: Like `bootstrapScripts`, but emits [`<script type="module">`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) instead.
    *   **optional** `identifierPrefix`: A string prefix React uses for IDs generated by [`useId`.](_reference_react_useId.md) Useful to avoid conflicts when using multiple roots on the same page. Must be the same prefix as passed to [`hydrateRoot`.](_reference_react-dom_client_hydrateRoot.md#parameters)
    *   **optional** `namespaceURI`: A string with the root [namespace URI](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#important_namespace_uris) for the stream. Defaults to regular HTML. Pass `'http://www.w3.org/2000/svg'` for SVG or `'http://www.w3.org/1998/Math/MathML'` for MathML.
    *   **optional** `nonce`: A [`nonce`](http://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#nonce) string to allow scripts for [`script-src` Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src).
    *   **optional** `onError`: A callback that fires whenever there is a server error, whether [recoverable](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-outside-the-shell) or [not.](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-inside-the-shell) By default, this only calls `console.error`. If you override it to [log crash reports,](_reference_react-dom_server_renderToReadableStream.md#logging-crashes-on-the-server) make sure that you still call `console.error`. You can also use it to [adjust the status code](_reference_react-dom_server_renderToReadableStream.md#setting-the-status-code) before the shell is emitted.
    *   **optional** `progressiveChunkSize`: The number of bytes in a chunk. [Read more about the default heuristic.](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-server/src/ReactFizzServer.js#L210-L225)
    *   **optional** `signal`: An [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that lets you [abort server rendering](_reference_react-dom_server_renderToReadableStream.md#aborting-server-rendering) and render the rest on the client.

#### Returns

`renderToReadableStream` returns a Promise:

*   If rendering the [shell](_reference_react-dom_server_renderToReadableStream.md#specifying-what-goes-into-the-shell) is successful, that Promise will resolve to a [Readable Web Stream.](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
*   If rendering the shell fails, the Promise will be rejected. [Use this to output a fallback shell.](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-inside-the-shell)

The returned stream has an additional property:

*   `allReady`: A Promise that resolves when all rendering is complete, including both the [shell](_reference_react-dom_server_renderToReadableStream.md#specifying-what-goes-into-the-shell) and all additional [content.](_reference_react-dom_server_renderToReadableStream.md#streaming-more-content-as-it-loads) You can `await stream.allReady` before returning a response [for crawlers and static generation.](_reference_react-dom_server_renderToReadableStream.md#waiting-for-all-content-to-load-for-crawlers-and-static-generation) If you do that, you won’t get any progressive loading. The stream will contain the final HTML.

* * *

## Usage

### Rendering a React tree as HTML to a Readable Web Stream

Call `renderToReadableStream` to render your React tree as HTML into a [Readable Web Stream:](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
```
import { renderToReadableStream } from 'react-dom/server';

async function handler(request) {

const stream = await renderToReadableStream(, {

bootstrapScripts: ['/main.js']

});

return new Response(stream, {

headers: { 'content-type': 'text/html' },

});

}
```
Along with the root component, you need to provide a list of bootstrap `<script>` paths. Your root component should return **the entire document including the root `<html>` tag.**

For example, it might look like this:
```
export default function App() {

return (

<html>

<head>

<meta charSet="utf-8" />

<meta name="viewport" content="width=device-width, initial-scale=1" />

<link rel="stylesheet" href="/styles.css"></link>

<title>My app</title>

</head>

<body>

<Router />

</body>

</html>

);

}
```
React will inject the [doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) and your bootstrap `<script>` tags into the resulting HTML stream:
```
<!DOCTYPE html>

<html>

</html>

<script src="/main.js" async=""></script>
```
On the client, your bootstrap script should [hydrate the entire `document` with a call to `hydrateRoot`:](_reference_react-dom_client_hydrateRoot.md#hydrating-an-entire-document)
```
import { hydrateRoot } from 'react-dom/client';

import App from './App.js';

hydrateRoot(document, );
```
This will attach event listeners to the server-generated HTML and make it interactive.

##### Deep Dive

#### Reading CSS and JS asset paths from the build output

The final asset URLs (like JavaScript and CSS files) are often hashed after the build. For example, instead of `styles.css` you might end up with `styles.123456.css`. Hashing static asset filenames guarantees that every distinct build of the same asset will have a different filename. This is useful because it lets you safely enable long-term caching for static assets: a file with a certain name would never change content.

However, if you don’t know the asset URLs until after the build, there’s no way for you to put them in the source code. For example, hardcoding `"/styles.css"` into JSX like earlier wouldn’t work. To keep them out of your source code, your root component can read the real filenames from a map passed as a prop:
```
export default function App({ assetMap }) {

return (

<html>

<head>

<title>My app</title>

<link rel="stylesheet" href={assetMap['styles.css']}></link>

</head>

      ...

</html>

);

}
```
On the server, render `<App assetMap={assetMap} />` and pass your `assetMap` with the asset URLs:
```
// You'd need to get this JSON from your build tooling, e.g. read it from the build output.

const assetMap = {

'styles.css': '/styles.123456.css',

'main.js': '/main.123456.js'

};

async function handler(request) {

const stream = await renderToReadableStream(<App assetMap={assetMap} />, {

bootstrapScripts: [assetMap['/main.js']]

});

return new Response(stream, {

headers: { 'content-type': 'text/html' },

});

}
```
Since your server is now rendering `<App assetMap={assetMap} />`, you need to render it with `assetMap` on the client too to avoid hydration errors. You can serialize and pass `assetMap` to the client like this:
```
// You'd need to get this JSON from your build tooling.

const assetMap = {

'styles.css': '/styles.123456.css',

'main.js': '/main.123456.js'

};

async function handler(request) {

const stream = await renderToReadableStream(<App assetMap={assetMap} />, {

// Careful: It's safe to stringify() this because this data isn't user-generated.

bootstrapScriptContent: `window.assetMap = ${JSON.stringify(assetMap)};`,

bootstrapScripts: [assetMap['/main.js']],

});

return new Response(stream, {

headers: { 'content-type': 'text/html' },

});

}
```
In the example above, the `bootstrapScriptContent` option adds an extra inline `<script>` tag that sets the global `window.assetMap` variable on the client. This lets the client code read the same `assetMap`:
```
import { hydrateRoot } from 'react-dom/client';

import App from './App.js';

hydrateRoot(document, <App assetMap={window.assetMap} />);
```
Both client and server render `App` with the same `assetMap` prop, so there are no hydration errors.

* * *

### Streaming more content as it loads

Streaming allows the user to start seeing the content even before all the data has loaded on the server. For example, consider a profile page that shows a cover, a sidebar with friends and photos, and a list of posts:
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Sidebar>

<Friends />

<Photos />

</Sidebar>

<Posts />

</ProfileLayout>

);

}
```
Imagine that loading data for `<Posts />` takes some time. Ideally, you’d want to show the rest of the profile page content to the user without waiting for the posts. To do this, [wrap `Posts` in a `<Suspense>` boundary:](_reference_react_Suspense.md#displaying-a-fallback-while-content-is-loading)
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Sidebar>

<Friends />

<Photos />

</Sidebar>

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</ProfileLayout>

);

}
```
This tells React to start streaming the HTML before `Posts` loads its data. React will send the HTML for the loading fallback (`PostsGlimmer`) first, and then, when `Posts` finishes loading its data, React will send the remaining HTML along with an inline `<script>` tag that replaces the loading fallback with that HTML. From the user’s perspective, the page will first appear with the `PostsGlimmer`, later replaced by the `Posts`.

You can further [nest `<Suspense>` boundaries](_reference_react_Suspense.md#revealing-nested-content-as-it-loads) to create a more granular loading sequence:
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Suspense fallback={<BigSpinner />}>

<Sidebar>

<Friends />

<Photos />

</Sidebar>

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</Suspense>

</ProfileLayout>

);

}
```
In this example, React can start streaming the page even earlier. Only `ProfileLayout` and `ProfileCover` must finish rendering first because they are not wrapped in any `<Suspense>` boundary. However, if `Sidebar`, `Friends`, or `Photos` need to load some data, React will send the HTML for the `BigSpinner` fallback instead. Then, as more data becomes available, more content will continue to be revealed until all of it becomes visible.

Streaming does not need to wait for React itself to load in the browser, or for your app to become interactive. The HTML content from the server will get progressively revealed before any of the `<script>` tags load.

[Read more about how streaming HTML works.](https://github.com/reactwg/react-18/discussions/37)

### Note

**Only Suspense-enabled data sources will activate the Suspense component.** They include:

*   Data fetching with Suspense-enabled frameworks like [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) and [Next.js](https://nextjs.org/docs/getting-started/react-essentials)
*   Lazy-loading component code with [`lazy`](_reference_react_lazy.md)
*   Reading the value of a Promise with [`use`](_reference_react_use.md)

Suspense **does not** detect when data is fetched inside an Effect or event handler.

The exact way you would load data in the `Posts` component above depends on your framework. If you use a Suspense-enabled framework, you’ll find the details in its data fetching documentation.

Suspense-enabled data fetching without the use of an opinionated framework is not yet supported. The requirements for implementing a Suspense-enabled data source are unstable and undocumented. An official API for integrating data sources with Suspense will be released in a future version of React.

* * *

### Specifying what goes into the shell

The part of your app outside of any `<Suspense>` boundaries is called _the shell:_
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Suspense fallback={<BigSpinner />}>

<Sidebar>

<Friends />

<Photos />

</Sidebar>

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</Suspense>

</ProfileLayout>

);

}
```
It determines the earliest loading state that the user may see:
```
<ProfileLayout>

<ProfileCover />

<BigSpinner />

</ProfileLayout>
```
If you wrap the whole app into a `<Suspense>` boundary at the root, the shell will only contain that spinner. However, that’s not a pleasant user experience because seeing a big spinner on the screen can feel slower and more annoying than waiting a bit more and seeing the real layout. This is why usually you’ll want to place the `<Suspense>` boundaries so that the shell feels _minimal but complete_—like a skeleton of the entire page layout.

The async call to `renderToReadableStream` will resolve to a `stream` as soon as the entire shell has been rendered. Usually, you’ll start streaming then by creating and returning a response with that `stream`:
```
async function handler(request) {

const stream = await renderToReadableStream(<App />, {

bootstrapScripts: ['/main.js']

});

return new Response(stream, {

headers: { 'content-type': 'text/html' },

});

}
```
By the time the `stream` is returned, components in nested `<Suspense>` boundaries might still be loading data.

* * *

### Logging crashes on the server

By default, all errors on the server are logged to console. You can override this behavior to log crash reports:
```
async function handler(request) {

const stream = await renderToReadableStream(<App />, {

bootstrapScripts: ['/main.js'],

onError(error) {

console.error(error);

logServerCrashReport(error);

}

});

return new Response(stream, {

headers: { 'content-type': 'text/html' },

});

}
```
If you provide a custom `onError` implementation, don’t forget to also log errors to the console like above.

* * *

### Recovering from errors inside the shell

In this example, the shell contains `ProfileLayout`, `ProfileCover`, and `PostsGlimmer`:
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</ProfileLayout>

);

}
```
If an error occurs while rendering those components, React won’t have any meaningful HTML to send to the client. Wrap your `renderToReadableStream` call in a `try...catch` to send a fallback HTML that doesn’t rely on server rendering as the last resort:
```
async function handler(request) {

try {

const stream = await renderToReadableStream(<App />, {

bootstrapScripts: ['/main.js'],

onError(error) {

console.error(error);

logServerCrashReport(error);

}

});

return new Response(stream, {

headers: { 'content-type': 'text/html' },

});

} catch (error) {

return new Response('
# Something went wrong

', {

status: 500,

headers: { 'content-type': 'text/html' },

});

}

}
```
If there is an error while generating the shell, both `onError` and your `catch` block will fire. Use `onError` for error reporting and use the `catch` block to send the fallback HTML document. Your fallback HTML does not have to be an error page. Instead, you may include an alternative shell that renders your app on the client only.

* * *

### Recovering from errors outside the shell

In this example, the `<Posts />` component is wrapped in `<Suspense>` so it is _not_ a part of the shell:
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</ProfileLayout>

);

}
```
If an error happens in the `Posts` component or somewhere inside it, React will [try to recover from it:](_reference_react_Suspense.md#providing-a-fallback-for-server-errors-and-client-only-content)

1.  It will emit the loading fallback for the closest `<Suspense>` boundary (`PostsGlimmer`) into the HTML.
2.  It will “give up” on trying to render the `Posts` content on the server anymore.
3.  When the JavaScript code loads on the client, React will _retry_ rendering `Posts` on the client.

If retrying rendering `Posts` on the client _also_ fails, React will throw the error on the client. As with all the errors thrown during rendering, the [closest parent error boundary](_reference_react_Component.md#static-getderivedstatefromerror) determines how to present the error to the user. In practice, this means that the user will see a loading indicator until it is certain that the error is not recoverable.

If retrying rendering `Posts` on the client succeeds, the loading fallback from the server will be replaced with the client rendering output. The user will not know that there was a server error. However, the server `onError` callback and the client [`onRecoverableError`](_reference_react-dom_client_hydrateRoot.md#hydrateroot) callbacks will fire so that you can get notified about the error.

* * *

### Setting the status code

Streaming introduces a tradeoff. You want to start streaming the page as early as possible so that the user can see the content sooner. However, once you start streaming, you can no longer set the response status code.

By [dividing your app](_reference_react-dom_server_renderToReadableStream.md#specifying-what-goes-into-the-shell) into the shell (above all `<Suspense>` boundaries) and the rest of the content, you’ve already solved a part of this problem. If the shell errors, your `catch` block will run which lets you set the error status code. Otherwise, you know that the app may recover on the client, so you can send “OK”.
```
async function handler(request) {

try {

const stream = await renderToReadableStream(<App />, {

bootstrapScripts: ['/main.js'],

onError(error) {

console.error(error);

logServerCrashReport(error);

}

});

return new Response(stream, {

status: 200,

headers: { 'content-type': 'text/html' },

});

} catch (error) {

return new Response('
# Something went wrong

', {

status: 500,

headers: { 'content-type': 'text/html' },

});

}

}
```
If a component _outside_ the shell (i.e. inside a `<Suspense>` boundary) throws an error, React will not stop rendering. This means that the `onError` callback will fire, but your code will continue running without getting into the `catch` block. This is because React will try to recover from that error on the client, [as described above.](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-outside-the-shell)

However, if you’d like, you can use the fact that something has errored to set the status code:
```
async function handler(request) {

try {

let didError = false;

const stream = await renderToReadableStream(<App />, {

bootstrapScripts: ['/main.js'],

onError(error) {

didError = true;

console.error(error);

logServerCrashReport(error);

}

});

return new Response(stream, {

status: didError ? 500 : 200,

headers: { 'content-type': 'text/html' },

});

} catch (error) {

return new Response('
# Something went wrong

', {

status: 500,

headers: { 'content-type': 'text/html' },

});

}

}
```
This will only catch errors outside the shell that happened while generating the initial shell content, so it’s not exhaustive. If knowing whether an error occurred for some content is critical, you can move it up into the shell.

* * *

### Handling different errors in different ways

You can [create your own `Error` subclasses](https://javascript.info/custom-errors) and use the [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) operator to check which error is thrown. For example, you can define a custom `NotFoundError` and throw it from your component. Then you can save the error in `onError` and do something different before returning the response depending on the error type:
```
async function handler(request) {

let didError = false;

let caughtError = null;

function getStatusCode() {

if (didError) {

if (caughtError instanceof NotFoundError) {

return 404;

} else {

return 500;

}

} else {

return 200;

}

}

try {

const stream = await renderToReadableStream(<App />, {

bootstrapScripts: ['/main.js'],

onError(error) {

didError = true;

caughtError = error;

console.error(error);

logServerCrashReport(error);

}

});

return new Response(stream, {

status: getStatusCode(),

headers: { 'content-type': 'text/html' },

});

} catch (error) {

return new Response('
# Something went wrong

', {

status: getStatusCode(),

headers: { 'content-type': 'text/html' },

});

}

}
```
Keep in mind that once you emit the shell and start streaming, you can’t change the status code.

* * *

### Waiting for all content to load for crawlers and static generation

Streaming offers a better user experience because the user can see the content as it becomes available.

However, when a crawler visits your page, or if you’re generating the pages at the build time, you might want to let all of the content load first and then produce the final HTML output instead of revealing it progressively.

You can wait for all the content to load by awaiting the `stream.allReady` Promise:
```
async function handler(request) {

try {

let didError = false;

const stream = await renderToReadableStream(<App />, {

bootstrapScripts: ['/main.js'],

onError(error) {

didError = true;

console.error(error);

logServerCrashReport(error);

}

});

let isCrawler = // ... depends on your bot detection strategy ...

if (isCrawler) {

await stream.allReady;

}

return new Response(stream, {

status: didError ? 500 : 200,

headers: { 'content-type': 'text/html' },

});

} catch (error) {

return new Response('
# Something went wrong

', {

status: 500,

headers: { 'content-type': 'text/html' },

});

}

}
```
A regular visitor will get a stream of progressively loaded content. A crawler will receive the final HTML output after all the data loads. However, this also means that the crawler will have to wait for _all_ data, some of which might be slow to load or error. Depending on your app, you could choose to send the shell to the crawlers too.

* * *

### Aborting server rendering

You can force the server rendering to “give up” after a timeout:
```
async function handler(request) {

try {

const controller = new AbortController();

setTimeout(() => {

controller.abort();

}, 10000);

const stream = await renderToReadableStream(<App />, {

signal: controller.signal,

bootstrapScripts: ['/main.js'],

onError(error) {

didError = true;

console.error(error);

logServerCrashReport(error);

}

});

// ...
```
React will flush the remaining loading fallbacks as HTML, and will attempt to render the rest on the client.

#### _reference_react-dom_server_renderToStaticMarkup.md

> Source: https://react.dev/reference/react-dom/server/renderToStaticMarkup
> Scraped: 12/20/2025, 10:41:06 PM

`renderToStaticMarkup` renders a non-interactive React tree to an HTML string.
```
const html = renderToStaticMarkup(reactNode, options?)
```
* [Reference](_reference_react-dom_server_renderToStaticMarkup.md#reference)
    * [`renderToStaticMarkup(reactNode, options?)`](_reference_react-dom_server_renderToStaticMarkup.md#rendertostaticmarkup)
* [Usage](_reference_react-dom_server_renderToStaticMarkup.md#usage)
    * [Rendering a non-interactive React tree as HTML to a string](_reference_react-dom_server_renderToStaticMarkup.md#rendering-a-non-interactive-react-tree-as-html-to-a-string)

* * *

## Reference

### `renderToStaticMarkup(reactNode, options?)`

On the server, call `renderToStaticMarkup` to render your app to HTML.
```
import { renderToStaticMarkup } from 'react-dom/server';

const html = renderToStaticMarkup(<Page />);
```
It will produce non-interactive HTML output of your React components.

[See more examples below.](_reference_react-dom_server_renderToStaticMarkup.md#usage)

#### Parameters

*   `reactNode`: A React node you want to render to HTML. For example, a JSX node like `<Page />`.
*   **optional** `options`: An object for server render.
    *   **optional** `identifierPrefix`: A string prefix React uses for IDs generated by [`useId`.](_reference_react_useId.md) Useful to avoid conflicts when using multiple roots on the same page.

#### Returns

An HTML string.

#### Caveats

*   `renderToStaticMarkup` output cannot be hydrated.

*   `renderToStaticMarkup` has limited Suspense support. If a component suspends, `renderToStaticMarkup` immediately sends its fallback as HTML.

*   `renderToStaticMarkup` works in the browser, but using it in the client code is not recommended. If you need to render a component to HTML in the browser, [get the HTML by rendering it into a DOM node.](_reference_react-dom_server_renderToString.md#removing-rendertostring-from-the-client-code)

* * *

## Usage

### Rendering a non-interactive React tree as HTML to a string

Call `renderToStaticMarkup` to render your app to an HTML string which you can send with your server response:
```
import { renderToStaticMarkup } from 'react-dom/server';

// The route handler syntax depends on your backend framework

app.use('/', (request, response) => {

const html = renderToStaticMarkup(<Page />);

response.send(html);

});
```
This will produce the initial non-interactive HTML output of your React components.

### Pitfall

This method renders **non-interactive HTML that cannot be hydrated.** This is useful if you want to use React as a simple static page generator, or if you’re rendering completely static content like emails.

Interactive apps should use [`renderToString`](_reference_react-dom_server_renderToString.md) on the server and [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) on the client.

#### _reference_react-dom_server_renderToString.md

> Source: https://react.dev/reference/react-dom/server/renderToString
> Scraped: 12/20/2025, 10:41:06 PM

### Pitfall

`renderToString` renders a React tree to an HTML string.
```
const html = renderToString(reactNode, options?)
```
* [Reference](_reference_react-dom_server_renderToString.md#reference)
    * [`renderToString(reactNode, options?)`](_reference_react-dom_server_renderToString.md#rendertostring)
* [Usage](_reference_react-dom_server_renderToString.md#usage)
    * [Rendering a React tree as HTML to a string](_reference_react-dom_server_renderToString.md#rendering-a-react-tree-as-html-to-a-string)
* [Alternatives](_reference_react-dom_server_renderToString.md#alternatives)
    * [Migrating from `renderToString` to a streaming render on the server](_reference_react-dom_server_renderToString.md#migrating-from-rendertostring-to-a-streaming-method-on-the-server)
    * [Migrating from `renderToString` to a static prerender on the server](_reference_react-dom_server_renderToString.md#migrating-from-rendertostring-to-a-static-prerender-on-the-server)
    * [Removing `renderToString` from the client code](_reference_react-dom_server_renderToString.md#removing-rendertostring-from-the-client-code)
* [Troubleshooting](_reference_react-dom_server_renderToString.md#troubleshooting)
    * [When a component suspends, the HTML always contains a fallback](_reference_react-dom_server_renderToString.md#when-a-component-suspends-the-html-always-contains-a-fallback)

* * *

## Reference

### `renderToString(reactNode, options?)`

On the server, call `renderToString` to render your app to HTML.
```
import { renderToString } from 'react-dom/server';

const html = renderToString(<App />);
```
On the client, call [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) to make the server-generated HTML interactive.

[See more examples below.](_reference_react-dom_server_renderToString.md#usage)

#### Parameters

*   `reactNode`: A React node you want to render to HTML. For example, a JSX node like `<App />`.

*   **optional** `options`: An object for server render.

    *   **optional** `identifierPrefix`: A string prefix React uses for IDs generated by [`useId`.](_reference_react_useId.md) Useful to avoid conflicts when using multiple roots on the same page. Must be the same prefix as passed to [`hydrateRoot`.](_reference_react-dom_client_hydrateRoot.md#parameters)

#### Returns

An HTML string.

#### Caveats

*   `renderToString` has limited Suspense support. If a component suspends, `renderToString` immediately sends its fallback as HTML.

*   `renderToString` works in the browser, but using it in the client code is [not recommended.](_reference_react-dom_server_renderToString.md#removing-rendertostring-from-the-client-code)

* * *

## Usage

### Rendering a React tree as HTML to a string

Call `renderToString` to render your app to an HTML string which you can send with your server response:
```
import { renderToString } from 'react-dom/server';

// The route handler syntax depends on your backend framework

app.use('/', (request, response) => {

const html = renderToString(<App />);

response.send(html);

});
```
This will produce the initial non-interactive HTML output of your React components. On the client, you will need to call [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) to _hydrate_ that server-generated HTML and make it interactive.

### Pitfall

* * *

## Alternatives

### Migrating from `renderToString` to a streaming render on the server

`renderToString` returns a string immediately, so it does not support streaming content as it loads.

When possible, we recommend using these fully-featured alternatives:

*   If you use Node.js, use [`renderToPipeableStream`.](_reference_react-dom_server_renderToPipeableStream.md)
*   If you use Deno or a modern edge runtime with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), use [`renderToReadableStream`.](_reference_react-dom_server_renderToReadableStream.md)

You can continue using `renderToString` if your server environment does not support streams.

* * *

### Migrating from `renderToString` to a static prerender on the server

`renderToString` returns a string immediately, so it does not support waiting for data to load for static HTML generation.

We recommend using these fully-featured alternatives:

*   If you use Node.js, use [`prerenderToNodeStream`.](_reference_react-dom_static_prerenderToNodeStream.md)
*   If you use Deno or a modern edge runtime with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), use [`prerender`.](_reference_react-dom_static_prerender.md)

You can continue using `renderToString` if your static site generation environment does not support streams.

* * *

### Removing `renderToString` from the client code

Sometimes, `renderToString` is used on the client to convert some component to HTML.
```
// 🚩 Unnecessary: using renderToString on the client

import { renderToString } from 'react-dom/server';

const html = renderToString(<MyIcon />);

console.log(html); // For example, "..."
```
Importing `react-dom/server` **on the client** unnecessarily increases your bundle size and should be avoided. If you need to render some component to HTML in the browser, use [`createRoot`](_reference_react-dom_client_createRoot.md) and read HTML from the DOM:
```
import { createRoot } from 'react-dom/client';

import { flushSync } from 'react-dom';

const div = document.createElement('div');

const root = createRoot(div);

flushSync(() => {

root.render(<MyIcon />);

});

console.log(div.innerHTML); // For example, "..."
```
The [`flushSync`](_reference_react-dom_flushSync.md) call is necessary so that the DOM is updated before reading its [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property.

* * *

## Troubleshooting

### When a component suspends, the HTML always contains a fallback

`renderToString` does not fully support Suspense.

If some component suspends (for example, because it’s defined with [`lazy`](_reference_react_lazy.md) or fetches data), `renderToString` will not wait for its content to resolve. Instead, `renderToString` will find the closest [`<Suspense>`](_reference_react_Suspense.md) boundary above it and render its `fallback` prop in the HTML. The content will not appear until the client code loads.

To solve this, use one of the [recommended streaming solutions.](_reference_react-dom_server_renderToString.md#alternatives) For server side rendering, they can stream content in chunks as it resolves on the server so that the user sees the page being progressively filled in before the client code loads. For static site generation, they can wait for all the content to resolve before generating the static HTML.

#### _reference_react-dom_server_resume.md

> Source: https://react.dev/reference/react-dom/server/resume
> Scraped: 12/20/2025, 10:41:06 PM

`resume` streams a pre-rendered React tree to a [Readable Web Stream.](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
```
const stream = await resume(reactNode, postponedState, options?)
```
* [Reference](_reference_react-dom_server_resume.md#reference)
    * [`resume(node, postponedState, options?)`](_reference_react-dom_server_resume.md#resume)
* [Usage](_reference_react-dom_server_resume.md#usage)
    * [Resuming a prerender](_reference_react-dom_server_resume.md#resuming-a-prerender)
    * [Further reading](_reference_react-dom_server_resume.md#further-reading)

### Note

* * *

## Reference

### `resume(node, postponedState, options?)`

Call `resume` to resume rendering a pre-rendered React tree as HTML into a [Readable Web Stream.](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
```
import { resume } from 'react-dom/server';

import {getPostponedState} from './storage';

async function handler(request, writable) {

const postponed = await getPostponedState(request);

const resumeStream = await resume(<App />, postponed);

return resumeStream.pipeTo(writable)

}
```
[See more examples below.](_reference_react-dom_server_resume.md#usage)

#### Parameters

*   `reactNode`: The React node you called `prerender` with. For example, a JSX element like `<App />`. It is expected to represent the entire document, so the `App` component should render the `<html>` tag.
*   `postponedState`: The opaque `postpone` object returned from a [prerender API](_reference_react-dom_static_index.md), loaded from wherever you stored it (e.g. redis, a file, or S3).
*   **optional** `options`: An object with streaming options.
    *   **optional** `nonce`: A [`nonce`](http://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#nonce) string to allow scripts for [`script-src` Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src).
    *   **optional** `signal`: An [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that lets you [abort server rendering](_reference_react-dom_server_resume.md#aborting-server-rendering) and render the rest on the client.
    *   **optional** `onError`: A callback that fires whenever there is a server error, whether [recoverable](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-outside-the-shell) or [not.](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-inside-the-shell) By default, this only calls `console.error`. If you override it to [log crash reports,](_reference_react-dom_server_renderToReadableStream.md#logging-crashes-on-the-server) make sure that you still call `console.error`.

#### Returns

`resume` returns a Promise:

*   If `resume` successfully produced a [shell](_reference_react-dom_server_renderToReadableStream.md#specifying-what-goes-into-the-shell), that Promise will resolve to a [Readable Web Stream.](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) that can be piped to a [Writable Web Stream.](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream).
*   If an error happens in the shell, the Promise will reject with that error.

The returned stream has an additional property:

*   `allReady`: A Promise that resolves when all rendering is complete. You can `await stream.allReady` before returning a response [for crawlers and static generation.](_reference_react-dom_server_renderToReadableStream.md#waiting-for-all-content-to-load-for-crawlers-and-static-generation) If you do that, you won’t get any progressive loading. The stream will contain the final HTML.

#### Caveats

*   `resume` does not accept options for `bootstrapScripts`, `bootstrapScriptContent`, or `bootstrapModules`. Instead, you need to pass these options to the `prerender` call that generates the `postponedState`. You can also inject bootstrap content into the writable stream manually.
*   `resume` does not accept `identifierPrefix` since the prefix needs to be the same in both `prerender` and `resume`.
*   Since `nonce` cannot be provided to prerender, you should only provide `nonce` to `resume` if you’re not providing scripts to prerender.
*   `resume` re-renders from the root until it finds a component that was not fully pre-rendered. Only fully prerendered Components (the Component and its children finished prerendering) are skipped entirely.

## Usage

### Resuming a prerender
```
import {
  flushReadableStreamToFrame,
  getUser,
  Postponed,
  sleep,
} from "./demo-helpers";
import { StrictMode, Suspense, use, useEffect } from "react";
import { prerender } from "react-dom/static";
import { resume } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
function Header() {
  return <header>Me and my descendants can be prerendered</header>;
}
const { promise: cookies, resolve: resolveCookies } = Promise.withResolvers();
function Main() {
  const { sessionID } = use(cookies);
  const user = getUser(sessionID);
  useEffect(() => {
    console.log("reached interactivity!");
  }, []);
  return (
    <main>
      Hello, {user.name}!
      <button onClick={() => console.log("hydrated!")}>
        Clicking me requires hydration.
      </button>
    </main>
  );
}
function Shell({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
function App() {
  return (
    <Shell>
      <Suspense fallback="loading header">
        <Header />
      </Suspense>
      <Suspense fallback="loading main">
        <Main />
      </Suspense>
    </Shell>
  );
}
async function main(frame) {
  const controller = new AbortController();
  const prerenderedApp = prerender(<App />, {
    signal: controller.signal,
    onError(error) {
      if (error instanceof Postponed) {
      } else {
        console.error(error);
      }
    },
  });
  setTimeout(() => {
    controller.abort(new Postponed());
  });
  const { prelude, postponed } = await prerenderedApp;
  await flushReadableStreamToFrame(prelude, frame);
  await sleep(2000);
  resolveCookies({ sessionID: "abc" });
  const stream = await resume(<App />, postponed);
  await flushReadableStreamToFrame(stream, frame);
  await sleep(2000);
  hydrateRoot(frame.contentWindow.document, <App />);
}
main(document.getElementById("container"));
```

#### _reference_react-dom_server_resumeToPipeableStream.md

> Source: https://react.dev/reference/react-dom/server/resumeToPipeableStream
> Scraped: 12/20/2025, 10:41:07 PM

`resumeToPipeableStream` streams a pre-rendered React tree to a pipeable [Node.js Stream.](https://nodejs.org/api/stream.html)
```
const {pipe, abort} = await resumeToPipeableStream(reactNode, postponedState, options?)
```
* [Reference](_reference_react-dom_server_resumeToPipeableStream.md#reference)
    * [`resumeToPipeableStream(node, postponed, options?)`](_reference_react-dom_server_resumeToPipeableStream.md#resume-to-pipeable-stream)
* [Usage](_reference_react-dom_server_resumeToPipeableStream.md#usage)
    * [Further reading](_reference_react-dom_server_resumeToPipeableStream.md#further-reading)

### Note

This API is specific to Node.js. Environments with [Web Streams,](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) like Deno and modern edge runtimes, should use [`resume`](_reference_react-dom_server_renderToReadableStream.md) instead.

* * *

## Reference

### `resumeToPipeableStream(node, postponed, options?)`

Call `resume` to resume rendering a pre-rendered React tree as HTML into a [Node.js Stream.](https://nodejs.org/api/stream.html#writable-streams)
```
import { resume } from 'react-dom/server';

import {getPostponedState} from './storage';

async function handler(request, response) {

const postponed = await getPostponedState(request);

const {pipe} = resumeToPipeableStream(<App />, postponed, {

onShellReady: () => {

pipe(response);

}

});

}
```
[See more examples below.](_reference_react-dom_server_resumeToPipeableStream.md#usage)

#### Parameters

*   `reactNode`: The React node you called `prerender` with. For example, a JSX element like `<App />`. It is expected to represent the entire document, so the `App` component should render the `<html>` tag.
*   `postponedState`: The opaque `postpone` object returned from a [prerender API](_reference_react-dom_static_index.md), loaded from wherever you stored it (e.g. redis, a file, or S3).
*   **optional** `options`: An object with streaming options.
    *   **optional** `nonce`: A [`nonce`](http://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#nonce) string to allow scripts for [`script-src` Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src).
    *   **optional** `signal`: An [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that lets you [abort server rendering](_reference_react-dom_server_resumeToPipeableStream.md#aborting-server-rendering) and render the rest on the client.
    *   **optional** `onError`: A callback that fires whenever there is a server error, whether [recoverable](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-outside-the-shell) or [not.](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-inside-the-shell) By default, this only calls `console.error`. If you override it to [log crash reports,](_reference_react-dom_server_renderToReadableStream.md#logging-crashes-on-the-server) make sure that you still call `console.error`.
    *   **optional** `onShellReady`: A callback that fires right after the [shell](_reference_react-dom_server_resumeToPipeableStream.md#specifying-what-goes-into-the-shell) has finished. You can call `pipe` here to start streaming. React will [stream the additional content](_reference_react-dom_server_resumeToPipeableStream.md#streaming-more-content-as-it-loads) after the shell along with the inline `<script>` tags that replace the HTML loading fallbacks with the content.
    *   **optional** `onShellError`: A callback that fires if there was an error rendering the shell. It receives the error as an argument. No bytes were emitted from the stream yet, and neither `onShellReady` nor `onAllReady` will get called, so you can [output a fallback HTML shell](_reference_react-dom_server_resumeToPipeableStream.md#recovering-from-errors-inside-the-shell) or use the prelude.

#### Returns

`resume` returns an object with two methods:

*   `pipe` outputs the HTML into the provided [Writable Node.js Stream.](https://nodejs.org/api/stream.html#writable-streams) Call `pipe` in `onShellReady` if you want to enable streaming, or in `onAllReady` for crawlers and static generation.
*   `abort` lets you [abort server rendering](_reference_react-dom_server_resumeToPipeableStream.md#aborting-server-rendering) and render the rest on the client.

#### Caveats

*   `resumeToPipeableStream` does not accept options for `bootstrapScripts`, `bootstrapScriptContent`, or `bootstrapModules`. Instead, you need to pass these options to the `prerender` call that generates the `postponedState`. You can also inject bootstrap content into the writable stream manually.
*   `resumeToPipeableStream` does not accept `identifierPrefix` since the prefix needs to be the same in both `prerender` and `resumeToPipeableStream`.
*   Since `nonce` cannot be provided to prerender, you should only provide `nonce` to `resumeToPipeableStream` if you’re not providing scripts to prerender.
*   `resumeToPipeableStream` re-renders from the root until it finds a component that was not fully pre-rendered. Only fully prerendered Components (the Component and its children finished prerendering) are skipped entirely.

## Usage

### Further reading

Resuming behaves like `renderToReadableStream`. For more examples, check out the [usage section of `renderToReadableStream`](_reference_react-dom_server_renderToReadableStream.md#usage). The [usage section of `prerender`](_reference_react-dom_static_prerender.md#usage) includes examples of how to use `prerenderToNodeStream` specifically.

#### _reference_react-dom_static.md

> Source: https://react.dev/reference/react-dom/static
> Scraped: 12/20/2025, 10:41:08 PM

The `react-dom/static` APIs let you generate static HTML for React components. They have limited functionality compared to the streaming APIs. A [framework](_learn_creating-a-react-app.md#full-stack-frameworks) may call them for you. Most of your components don’t need to import or use them.

* * *

## Static APIs for Web Streams

These methods are only available in the environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), which includes browsers, Deno, and some modern edge runtimes:

* [`prerender`](_reference_react-dom_static_prerender.md) renders a React tree to static HTML with a [Readable Web Stream.](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
*   Experimental only [`resumeAndPrerender`](_reference_react-dom_static_resumeAndPrerender.md) continues a prerendered React tree to static HTML with a [Readable Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).

Node.js also includes these methods for compatibility, but they are not recommended due to worse performance. Use the [dedicated Node.js APIs](_reference_react-dom_static.md#static-apis-for-nodejs-streams) instead.

* * *

## Static APIs for Node.js Streams

These methods are only available in the environments with [Node.js Streams](https://nodejs.org/api/stream.html):

* [`prerenderToNodeStream`](_reference_react-dom_static_prerenderToNodeStream.md) renders a React tree to static HTML with a [Node.js Stream.](https://nodejs.org/api/stream.html)
*   Experimental only [`resumeAndPrerenderToNodeStream`](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md) continues a prerendered React tree to static HTML with a [Node.js Stream.](https://nodejs.org/api/stream.html)

#### _reference_react-dom_static_prerender.md

> Source: https://react.dev/reference/react-dom/static/prerender
> Scraped: 12/20/2025, 10:41:09 PM

`prerender` renders a React tree to a static HTML string using a [Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).
```
const {prelude, postponed} = await prerender(reactNode, options?)
```
* [Reference](_reference_react-dom_static_prerender.md#reference)
    * [`prerender(reactNode, options?)`](_reference_react-dom_static_prerender.md#prerender)
* [Usage](_reference_react-dom_static_prerender.md#usage)
    * [Rendering a React tree to a stream of static HTML](_reference_react-dom_static_prerender.md#rendering-a-react-tree-to-a-stream-of-static-html)
    * [Rendering a React tree to a string of static HTML](_reference_react-dom_static_prerender.md#rendering-a-react-tree-to-a-string-of-static-html)
    * [Waiting for all data to load](_reference_react-dom_static_prerender.md#waiting-for-all-data-to-load)
    * [Aborting prerendering](_reference_react-dom_static_prerender.md#aborting-prerendering)
* [Troubleshooting](_reference_react-dom_static_prerender.md#troubleshooting)
    * [My stream doesn’t start until the entire app is rendered](_reference_react-dom_static_prerender.md#my-stream-doesnt-start-until-the-entire-app-is-rendered)

### Note

* * *

## Reference

### `prerender(reactNode, options?)`

Call `prerender` to render your app to static HTML.
```
import { prerender } from 'react-dom/static';

async function handler(request, response) {

const {prelude} = await prerender(<App />, {

bootstrapScripts: ['/main.js']

});

return new Response(prelude, {

headers: { 'content-type': 'text/html' },

});

}
```
On the client, call [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) to make the server-generated HTML interactive.

[See more examples below.](_reference_react-dom_static_prerender.md#usage)

#### Parameters

*   `reactNode`: A React node you want to render to HTML. For example, a JSX node like `<App />`. It is expected to represent the entire document, so the App component should render the `<html>` tag.

*   **optional** `options`: An object with static generation options.

    *   **optional** `bootstrapScriptContent`: If specified, this string will be placed in an inline `<script>` tag.
    *   **optional** `bootstrapScripts`: An array of string URLs for the `<script>` tags to emit on the page. Use this to include the `<script>` that calls [`hydrateRoot`.](_reference_react-dom_client_hydrateRoot.md) Omit it if you don’t want to run React on the client at all.
    *   **optional** `bootstrapModules`: Like `bootstrapScripts`, but emits [`<script type="module">`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) instead.
    *   **optional** `identifierPrefix`: A string prefix React uses for IDs generated by [`useId`.](_reference_react_useId.md) Useful to avoid conflicts when using multiple roots on the same page. Must be the same prefix as passed to [`hydrateRoot`.](_reference_react-dom_client_hydrateRoot.md#parameters)
    *   **optional** `namespaceURI`: A string with the root [namespace URI](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#important_namespace_uris) for the stream. Defaults to regular HTML. Pass `'http://www.w3.org/2000/svg'` for SVG or `'http://www.w3.org/1998/Math/MathML'` for MathML.
    *   **optional** `onError`: A callback that fires whenever there is a server error, whether [recoverable](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-outside-the-shell) or [not.](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-inside-the-shell) By default, this only calls `console.error`. If you override it to [log crash reports,](_reference_react-dom_server_renderToReadableStream.md#logging-crashes-on-the-server) make sure that you still call `console.error`. You can also use it to [adjust the status code](_reference_react-dom_server_renderToReadableStream.md#setting-the-status-code) before the shell is emitted.
    *   **optional** `progressiveChunkSize`: The number of bytes in a chunk. [Read more about the default heuristic.](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-server/src/ReactFizzServer.js#L210-L225)
    *   **optional** `signal`: An [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that lets you [abort prerendering](_reference_react-dom_static_prerender.md#aborting-prerendering) and render the rest on the client.

#### Returns

`prerender` returns a Promise:

*   If rendering the is successful, the Promise will resolve to an object containing:
    *   `prelude`: a [Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) of HTML. You can use this stream to send a response in chunks, or you can read the entire stream into a string.
    *   `postponed`: a JSON-serializeable, opaque object that can be passed to [`resume`](_reference_react-dom_server_resume.md) if `prerender` did not finish. Otherwise `null` indicating that the `prelude` contains all the content and no resume is necessary.
*   If rendering fails, the Promise will be rejected. [Use this to output a fallback shell.](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-inside-the-shell)

#### Caveats

`nonce` is not an available option when prerendering. Nonces must be unique per request and if you use nonces to secure your application with [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) it would be inappropriate and insecure to include the nonce value in the prerender itself.

### Note

### When should I use `prerender`?

The static `prerender` API is used for static server-side generation (SSG). Unlike `renderToString`, `prerender` waits for all data to load before resolving. This makes it suitable for generating static HTML for a full page, including data that needs to be fetched using Suspense. To stream content as it loads, use a streaming server-side render (SSR) API like [renderToReadableStream](_reference_react-dom_server_renderToReadableStream.md).

`prerender` can be aborted and later either continued with `resumeAndPrerender` or resumed with `resume` to support partial pre-rendering.

* * *

## Usage

### Rendering a React tree to a stream of static HTML

Call `prerender` to render your React tree to static HTML into a [Readable Web Stream:](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream):
```
import { prerender } from 'react-dom/static';

async function handler(request) {

const {prelude} = await prerender(, {

bootstrapScripts: ['/main.js']

});

return new Response(prelude, {

headers: { 'content-type': 'text/html' },

});

}
```
Along with the root component, you need to provide a list of bootstrap `<script>` paths. Your root component should return **the entire document including the root `<html>` tag.**

For example, it might look like this:
```
export default function App() {

return (

<html>

<head>

<meta charSet="utf-8" />

<meta name="viewport" content="width=device-width, initial-scale=1" />

<link rel="stylesheet" href="/styles.css"></link>

<title>My app</title>

</head>

<body>

<Router />

</body>

</html>

);

}
```
React will inject the [doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) and your bootstrap `<script>` tags into the resulting HTML stream:
```
<!DOCTYPE html>

<html>

</html>

<script src="/main.js" async=""></script>
```
On the client, your bootstrap script should [hydrate the entire `document` with a call to `hydrateRoot`:](_reference_react-dom_client_hydrateRoot.md#hydrating-an-entire-document)
```
import { hydrateRoot } from 'react-dom/client';

import App from './App.js';

hydrateRoot(document, );
```
This will attach event listeners to the static server-generated HTML and make it interactive.

##### Deep Dive

#### Reading CSS and JS asset paths from the build output

The final asset URLs (like JavaScript and CSS files) are often hashed after the build. For example, instead of `styles.css` you might end up with `styles.123456.css`. Hashing static asset filenames guarantees that every distinct build of the same asset will have a different filename. This is useful because it lets you safely enable long-term caching for static assets: a file with a certain name would never change content.

However, if you don’t know the asset URLs until after the build, there’s no way for you to put them in the source code. For example, hardcoding `"/styles.css"` into JSX like earlier wouldn’t work. To keep them out of your source code, your root component can read the real filenames from a map passed as a prop:
```
export default function App({ assetMap }) {

return (

<html>

<head>

<title>My app</title>

<link rel="stylesheet" href={assetMap['styles.css']}></link>

</head>

      ...

</html>

);

}
```
On the server, render `<App assetMap={assetMap} />` and pass your `assetMap` with the asset URLs:
```
// You'd need to get this JSON from your build tooling, e.g. read it from the build output.

const assetMap = {

'styles.css': '/styles.123456.css',

'main.js': '/main.123456.js'

};

async function handler(request) {

const {prelude} = await prerender(<App assetMap={assetMap} />, {

bootstrapScripts: [assetMap['/main.js']]

});

return new Response(prelude, {

headers: { 'content-type': 'text/html' },

});

}
```
Since your server is now rendering `<App assetMap={assetMap} />`, you need to render it with `assetMap` on the client too to avoid hydration errors. You can serialize and pass `assetMap` to the client like this:
```
// You'd need to get this JSON from your build tooling.

const assetMap = {

'styles.css': '/styles.123456.css',

'main.js': '/main.123456.js'

};

async function handler(request) {

const {prelude} = await prerender(<App assetMap={assetMap} />, {

// Careful: It's safe to stringify() this because this data isn't user-generated.

bootstrapScriptContent: `window.assetMap = ${JSON.stringify(assetMap)};`,

bootstrapScripts: [assetMap['/main.js']],

});

return new Response(prelude, {

headers: { 'content-type': 'text/html' },

});

}
```
In the example above, the `bootstrapScriptContent` option adds an extra inline `<script>` tag that sets the global `window.assetMap` variable on the client. This lets the client code read the same `assetMap`:
```
import { hydrateRoot } from 'react-dom/client';

import App from './App.js';

hydrateRoot(document, <App assetMap={window.assetMap} />);
```
Both client and server render `App` with the same `assetMap` prop, so there are no hydration errors.

* * *

### Rendering a React tree to a string of static HTML

Call `prerender` to render your app to a static HTML string:
```
import { prerender } from 'react-dom/static';

async function renderToString() {

const {prelude} = await prerender(<App />, {

bootstrapScripts: ['/main.js']

});

const reader = prelude.getReader();

let content = '';

while (true) {

const {done, value} = await reader.read();

if (done) {

return content;

}

content += Buffer.from(value).toString('utf8');

}

}
```
This will produce the initial non-interactive HTML output of your React components. On the client, you will need to call [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) to _hydrate_ that server-generated HTML and make it interactive.

* * *

### Waiting for all data to load

`prerender` waits for all data to load before finishing the static HTML generation and resolving. For example, consider a profile page that shows a cover, a sidebar with friends and photos, and a list of posts:
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Sidebar>

<Friends />

<Photos />

</Sidebar>

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</ProfileLayout>

);

}
```
Imagine that `<Posts />` needs to load some data, which takes some time. Ideally, you’d want wait for the posts to finish so it’s included in the HTML. To do this, you can use Suspense to suspend on the data, and `prerender` will wait for the suspended content to finish before resolving to the static HTML.

### Note

**Only Suspense-enabled data sources will activate the Suspense component.** They include:

*   Data fetching with Suspense-enabled frameworks like [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) and [Next.js](https://nextjs.org/docs/getting-started/react-essentials)
*   Lazy-loading component code with [`lazy`](_reference_react_lazy.md)
*   Reading the value of a Promise with [`use`](_reference_react_use.md)

Suspense **does not** detect when data is fetched inside an Effect or event handler.

The exact way you would load data in the `Posts` component above depends on your framework. If you use a Suspense-enabled framework, you’ll find the details in its data fetching documentation.

Suspense-enabled data fetching without the use of an opinionated framework is not yet supported. The requirements for implementing a Suspense-enabled data source are unstable and undocumented. An official API for integrating data sources with Suspense will be released in a future version of React.

* * *

### Aborting prerendering

You can force the prerender to “give up” after a timeout:
```
async function renderToString() {

const controller = new AbortController();

setTimeout(() => {

controller.abort()

}, 10000);

try {

// the prelude will contain all the HTML that was prerendered

// before the controller aborted.

const {prelude} = await prerender(<App />, {

signal: controller.signal,

});

//...
```
Any Suspense boundaries with incomplete children will be included in the prelude in the fallback state.

This can be used for partial prerendering together with [`resume`](_reference_react-dom_server_resume.md) or [`resumeAndPrerender`](_reference_react-dom_static_resumeAndPrerender.md).

## Troubleshooting

### My stream doesn’t start until the entire app is rendered

The `prerender` response waits for the entire app to finish rendering, including waiting for all Suspense boundaries to resolve, before resolving. It is designed for static site generation (SSG) ahead of time and does not support streaming more content as it loads.

To stream content as it loads, use a streaming server render API like [renderToReadableStream](_reference_react-dom_server_renderToReadableStream.md).

#### _reference_react-dom_static_prerenderToNodeStream.md

> Source: https://react.dev/reference/react-dom/static/prerenderToNodeStream
> Scraped: 12/20/2025, 10:41:09 PM

`prerenderToNodeStream` renders a React tree to a static HTML string using a [Node.js Stream.](https://nodejs.org/api/stream.html)
```
const {prelude, postponed} = await prerenderToNodeStream(reactNode, options?)
```
* [Reference](_reference_react-dom_static_prerenderToNodeStream.md#reference)
    * [`prerenderToNodeStream(reactNode, options?)`](_reference_react-dom_static_prerenderToNodeStream.md#prerender)
* [Usage](_reference_react-dom_static_prerenderToNodeStream.md#usage)
    * [Rendering a React tree to a stream of static HTML](_reference_react-dom_static_prerenderToNodeStream.md#rendering-a-react-tree-to-a-stream-of-static-html)
    * [Rendering a React tree to a string of static HTML](_reference_react-dom_static_prerenderToNodeStream.md#rendering-a-react-tree-to-a-string-of-static-html)
    * [Waiting for all data to load](_reference_react-dom_static_prerenderToNodeStream.md#waiting-for-all-data-to-load)
    * [Aborting prerendering](_reference_react-dom_static_prerenderToNodeStream.md#aborting-prerendering)
* [Troubleshooting](_reference_react-dom_static_prerenderToNodeStream.md#troubleshooting)
    * [My stream doesn’t start until the entire app is rendered](_reference_react-dom_static_prerenderToNodeStream.md#my-stream-doesnt-start-until-the-entire-app-is-rendered)

### Note

This API is specific to Node.js. Environments with [Web Streams,](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) like Deno and modern edge runtimes, should use [`prerender`](_reference_react-dom_static_prerender.md) instead.

* * *

## Reference

### `prerenderToNodeStream(reactNode, options?)`

Call `prerenderToNodeStream` to render your app to static HTML.
```
import { prerenderToNodeStream } from 'react-dom/static';

// The route handler syntax depends on your backend framework

app.use('/', async (request, response) => {

const { prelude } = await prerenderToNodeStream(<App />, {

bootstrapScripts: ['/main.js'],

});

response.setHeader('Content-Type', 'text/plain');

prelude.pipe(response);

});
```
On the client, call [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) to make the server-generated HTML interactive.

[See more examples below.](_reference_react-dom_static_prerenderToNodeStream.md#usage)

#### Parameters

*   `reactNode`: A React node you want to render to HTML. For example, a JSX node like `<App />`. It is expected to represent the entire document, so the App component should render the `<html>` tag.

*   **optional** `options`: An object with static generation options.

    *   **optional** `bootstrapScriptContent`: If specified, this string will be placed in an inline `<script>` tag.
    *   **optional** `bootstrapScripts`: An array of string URLs for the `<script>` tags to emit on the page. Use this to include the `<script>` that calls [`hydrateRoot`.](_reference_react-dom_client_hydrateRoot.md) Omit it if you don’t want to run React on the client at all.
    *   **optional** `bootstrapModules`: Like `bootstrapScripts`, but emits [`<script type="module">`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) instead.
    *   **optional** `identifierPrefix`: A string prefix React uses for IDs generated by [`useId`.](_reference_react_useId.md) Useful to avoid conflicts when using multiple roots on the same page. Must be the same prefix as passed to [`hydrateRoot`.](_reference_react-dom_client_hydrateRoot.md#parameters)
    *   **optional** `namespaceURI`: A string with the root [namespace URI](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#important_namespace_uris) for the stream. Defaults to regular HTML. Pass `'http://www.w3.org/2000/svg'` for SVG or `'http://www.w3.org/1998/Math/MathML'` for MathML.
    *   **optional** `onError`: A callback that fires whenever there is a server error, whether [recoverable](_reference_react-dom_server_renderToPipeableStream.md#recovering-from-errors-outside-the-shell) or [not.](_reference_react-dom_server_renderToPipeableStream.md#recovering-from-errors-inside-the-shell) By default, this only calls `console.error`. If you override it to [log crash reports,](_reference_react-dom_server_renderToPipeableStream.md#logging-crashes-on-the-server) make sure that you still call `console.error`. You can also use it to [adjust the status code](_reference_react-dom_server_renderToPipeableStream.md#setting-the-status-code) before the shell is emitted.
    *   **optional** `progressiveChunkSize`: The number of bytes in a chunk. [Read more about the default heuristic.](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-server/src/ReactFizzServer.js#L210-L225)
    *   **optional** `signal`: An [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that lets you [abort prerendering](_reference_react-dom_static_prerenderToNodeStream.md#aborting-prerendering) and render the rest on the client.

#### Returns

`prerenderToNodeStream` returns a Promise:

*   If rendering the is successful, the Promise will resolve to an object containing:
    *   `prelude`: a [Node.js Stream.](https://nodejs.org/api/stream.html) of HTML. You can use this stream to send a response in chunks, or you can read the entire stream into a string.
    *   `postponed`: a JSON-serializeable, opaque object that can be passed to [`resumeToPipeableStream`](_reference_react-dom_server_resumeToPipeableStream.md) if `prerenderToNodeStream` did not finish. Otherwise `null` indicating that the `prelude` contains all the content and no resume is necessary.
*   If rendering fails, the Promise will be rejected. [Use this to output a fallback shell.](_reference_react-dom_server_renderToPipeableStream.md#recovering-from-errors-inside-the-shell)

#### Caveats

`nonce` is not an available option when prerendering. Nonces must be unique per request and if you use nonces to secure your application with [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) it would be inappropriate and insecure to include the nonce value in the prerender itself.

### Note

### When should I use `prerenderToNodeStream`?

The static `prerenderToNodeStream` API is used for static server-side generation (SSG). Unlike `renderToString`, `prerenderToNodeStream` waits for all data to load before resolving. This makes it suitable for generating static HTML for a full page, including data that needs to be fetched using Suspense. To stream content as it loads, use a streaming server-side render (SSR) API like [renderToReadableStream](_reference_react-dom_server_renderToReadableStream.md).

`prerenderToNodeStream` can be aborted and resumed later with `resumeToPipeableStream` to support partial pre-rendering.

* * *

## Usage

### Rendering a React tree to a stream of static HTML

Call `prerenderToNodeStream` to render your React tree to static HTML into a [Node.js Stream](https://nodejs.org/api/stream.html):
```
import { prerenderToNodeStream } from 'react-dom/static';

// The route handler syntax depends on your backend framework

app.use('/', async (request, response) => {

const { prelude } = await prerenderToNodeStream(, {

bootstrapScripts: ['/main.js'],

});

response.setHeader('Content-Type', 'text/plain');

prelude.pipe(response);

});
```
Along with the root component, you need to provide a list of bootstrap `<script>` paths. Your root component should return **the entire document including the root `<html>` tag.**

For example, it might look like this:
```
export default function App() {

return (

<html>

<head>

<meta charSet="utf-8" />

<meta name="viewport" content="width=device-width, initial-scale=1" />

<link rel="stylesheet" href="/styles.css"></link>

<title>My app</title>

</head>

<body>

<Router />

</body>

</html>

);

}
```
React will inject the [doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) and your bootstrap `<script>` tags into the resulting HTML stream:
```
<!DOCTYPE html>

<html>

</html>

<script src="/main.js" async=""></script>
```
On the client, your bootstrap script should [hydrate the entire `document` with a call to `hydrateRoot`:](_reference_react-dom_client_hydrateRoot.md#hydrating-an-entire-document)
```
import { hydrateRoot } from 'react-dom/client';

import App from './App.js';

hydrateRoot(document, );
```
This will attach event listeners to the static server-generated HTML and make it interactive.

##### Deep Dive

#### Reading CSS and JS asset paths from the build output

The final asset URLs (like JavaScript and CSS files) are often hashed after the build. For example, instead of `styles.css` you might end up with `styles.123456.css`. Hashing static asset filenames guarantees that every distinct build of the same asset will have a different filename. This is useful because it lets you safely enable long-term caching for static assets: a file with a certain name would never change content.

However, if you don’t know the asset URLs until after the build, there’s no way for you to put them in the source code. For example, hardcoding `"/styles.css"` into JSX like earlier wouldn’t work. To keep them out of your source code, your root component can read the real filenames from a map passed as a prop:
```
export default function App({ assetMap }) {

return (

<html>

<head>

<title>My app</title>

<link rel="stylesheet" href={assetMap['styles.css']}></link>

</head>

      ...

</html>

);

}
```
On the server, render `<App assetMap={assetMap} />` and pass your `assetMap` with the asset URLs:
```
// You'd need to get this JSON from your build tooling, e.g. read it from the build output.

const assetMap = {

'styles.css': '/styles.123456.css',

'main.js': '/main.123456.js'

};

app.use('/', async (request, response) => {

const { prelude } = await prerenderToNodeStream(<App />, {

bootstrapScripts: [assetMap['/main.js']]

});

response.setHeader('Content-Type', 'text/html');

prelude.pipe(response);

});
```
Since your server is now rendering `<App assetMap={assetMap} />`, you need to render it with `assetMap` on the client too to avoid hydration errors. You can serialize and pass `assetMap` to the client like this:
```
// You'd need to get this JSON from your build tooling.

const assetMap = {

'styles.css': '/styles.123456.css',

'main.js': '/main.123456.js'

};

app.use('/', async (request, response) => {

const { prelude } = await prerenderToNodeStream(<App />, {

// Careful: It's safe to stringify() this because this data isn't user-generated.

bootstrapScriptContent: `window.assetMap = ${JSON.stringify(assetMap)};`,

bootstrapScripts: [assetMap['/main.js']],

});

response.setHeader('Content-Type', 'text/html');

prelude.pipe(response);

});
```
In the example above, the `bootstrapScriptContent` option adds an extra inline `<script>` tag that sets the global `window.assetMap` variable on the client. This lets the client code read the same `assetMap`:
```
import { hydrateRoot } from 'react-dom/client';

import App from './App.js';

hydrateRoot(document, <App assetMap={window.assetMap} />);
```
Both client and server render `App` with the same `assetMap` prop, so there are no hydration errors.

* * *

### Rendering a React tree to a string of static HTML

Call `prerenderToNodeStream` to render your app to a static HTML string:
```
import { prerenderToNodeStream } from 'react-dom/static';

async function renderToString() {

const {prelude} = await prerenderToNodeStream(<App />, {

bootstrapScripts: ['/main.js']

});

return new Promise((resolve, reject) => {

let data = '';

prelude.on('data', chunk => {

data += chunk;

});

prelude.on('end', () => resolve(data));

prelude.on('error', reject);

});

}
```
This will produce the initial non-interactive HTML output of your React components. On the client, you will need to call [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) to _hydrate_ that server-generated HTML and make it interactive.

* * *

### Waiting for all data to load

`prerenderToNodeStream` waits for all data to load before finishing the static HTML generation and resolving. For example, consider a profile page that shows a cover, a sidebar with friends and photos, and a list of posts:
```
function ProfilePage() {

return (

<ProfileLayout>

<ProfileCover />

<Sidebar>

<Friends />

<Photos />

</Sidebar>

<Suspense fallback={<PostsGlimmer />}>

<Posts />

</Suspense>

</ProfileLayout>

);

}
```
Imagine that `<Posts />` needs to load some data, which takes some time. Ideally, you’d want wait for the posts to finish so it’s included in the HTML. To do this, you can use Suspense to suspend on the data, and `prerenderToNodeStream` will wait for the suspended content to finish before resolving to the static HTML.

### Note

**Only Suspense-enabled data sources will activate the Suspense component.** They include:

*   Data fetching with Suspense-enabled frameworks like [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) and [Next.js](https://nextjs.org/docs/getting-started/react-essentials)
*   Lazy-loading component code with [`lazy`](_reference_react_lazy.md)
*   Reading the value of a Promise with [`use`](_reference_react_use.md)

Suspense **does not** detect when data is fetched inside an Effect or event handler.

The exact way you would load data in the `Posts` component above depends on your framework. If you use a Suspense-enabled framework, you’ll find the details in its data fetching documentation.

Suspense-enabled data fetching without the use of an opinionated framework is not yet supported. The requirements for implementing a Suspense-enabled data source are unstable and undocumented. An official API for integrating data sources with Suspense will be released in a future version of React.

* * *

### Aborting prerendering

You can force the prerender to “give up” after a timeout:
```
async function renderToString() {

const controller = new AbortController();

setTimeout(() => {

controller.abort()

}, 10000);

try {

// the prelude will contain all the HTML that was prerendered

// before the controller aborted.

const {prelude} = await prerenderToNodeStream(<App />, {

signal: controller.signal,

});

//...
```
Any Suspense boundaries with incomplete children will be included in the prelude in the fallback state.

This can be used for partial prerendering together with [`resumeToPipeableStream`](_reference_react-dom_server_resumeToPipeableStream.md) or [`resumeAndPrerenderToNodeStream`](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md).

## Troubleshooting

### My stream doesn’t start until the entire app is rendered

The `prerenderToNodeStream` response waits for the entire app to finish rendering, including waiting for all Suspense boundaries to resolve, before resolving. It is designed for static site generation (SSG) ahead of time and does not support streaming more content as it loads.

To stream content as it loads, use a streaming server render API like [renderToPipeableStream](_reference_react-dom_server_renderToPipeableStream.md).

#### _reference_react-dom_static_resumeAndPrerender.md

> Source: https://react.dev/reference/react-dom/static/resumeAndPrerender
> Scraped: 12/20/2025, 10:41:09 PM

`resumeAndPrerender` continues a prerendered React tree to a static HTML string using a [Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).
```
const { prelude,postpone } = await resumeAndPrerender(reactNode, postponedState, options?)
```
* [Reference](_reference_react-dom_static_resumeAndPrerender.md#reference)
    * [`resumeAndPrerender(reactNode, postponedState, options?)`](_reference_react-dom_static_resumeAndPrerender.md#resumeandprerender)
* [Usage](_reference_react-dom_static_resumeAndPrerender.md#usage)
    * [Further reading](_reference_react-dom_static_resumeAndPrerender.md#further-reading)

### Note

* * *

## Reference

### `resumeAndPrerender(reactNode, postponedState, options?)`

Call `resumeAndPrerender` to continue a prerendered React tree to a static HTML string.
```
import { resumeAndPrerender } from 'react-dom/static';

import { getPostponedState } from 'storage';

async function handler(request, response) {

const postponedState = getPostponedState(request);

const { prelude } = await resumeAndPrerender(<App />, postponedState, {

bootstrapScripts: ['/main.js']

});

return new Response(prelude, {

headers: { 'content-type': 'text/html' },

});

}
```
On the client, call [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) to make the server-generated HTML interactive.

[See more examples below.](_reference_react-dom_static_resumeAndPrerender.md#usage)

#### Parameters

*   `reactNode`: The React node you called `prerender` (or a previous `resumeAndPrerender`) with. For example, a JSX element like `<App />`. It is expected to represent the entire document, so the `App` component should render the `<html>` tag.
*   `postponedState`: The opaque `postpone` object returned from a [prerender API](_reference_react-dom_static_index.md), loaded from wherever you stored it (e.g. redis, a file, or S3).
*   **optional** `options`: An object with streaming options.
    *   **optional** `signal`: An [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that lets you [abort server rendering](_reference_react-dom_static_resumeAndPrerender.md#aborting-server-rendering) and render the rest on the client.
    *   **optional** `onError`: A callback that fires whenever there is a server error, whether [recoverable](_reference_react-dom_static_resumeAndPrerender.md#recovering-from-errors-outside-the-shell) or [not.](_reference_react-dom_static_resumeAndPrerender.md#recovering-from-errors-inside-the-shell) By default, this only calls `console.error`. If you override it to [log crash reports,](_reference_react-dom_static_resumeAndPrerender.md#logging-crashes-on-the-server) make sure that you still call `console.error`.

#### Returns

`prerender` returns a Promise:

*   If rendering the is successful, the Promise will resolve to an object containing:
    *   `prelude`: a [Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) of HTML. You can use this stream to send a response in chunks, or you can read the entire stream into a string.
    *   `postponed`: an JSON-serializeable, opaque object that can be passed to [`resume`](_reference_react-dom_server_resume.md) or [`resumeAndPrerender`](_reference_react-dom_static_resumeAndPrerender.md) if `prerender` is aborted.
*   If rendering fails, the Promise will be rejected. [Use this to output a fallback shell.](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-inside-the-shell)

#### Caveats

`nonce` is not an available option when prerendering. Nonces must be unique per request and if you use nonces to secure your application with [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) it would be inappropriate and insecure to include the nonce value in the prerender itself.

### Note

### When should I use `resumeAndPrerender`?

The static `resumeAndPrerender` API is used for static server-side generation (SSG). Unlike `renderToString`, `resumeAndPrerender` waits for all data to load before resolving. This makes it suitable for generating static HTML for a full page, including data that needs to be fetched using Suspense. To stream content as it loads, use a streaming server-side render (SSR) API like [renderToReadableStream](_reference_react-dom_server_renderToReadableStream.md).

`resumeAndPrerender` can be aborted and later either continued with another `resumeAndPrerender` or resumed with `resume` to support partial pre-rendering.

* * *

## Usage

### Further reading

`resumeAndPrerender` behaves similarly to [`prerender`](_reference_react-dom_static_prerender.md) but can be used to continue a previously started prerendering process that was aborted. For more information about resuming a prerendered tree, see the [resume documentation](_reference_react-dom_server_resume.md#resuming-a-prerender).

#### _reference_react-dom_static_resumeAndPrerenderToNodeStream.md

> Source: https://react.dev/reference/react-dom/static/resumeAndPrerenderToNodeStream
> Scraped: 12/20/2025, 10:41:09 PM

`resumeAndPrerenderToNodeStream` continues a prerendered React tree to a static HTML string using a a [Node.js Stream.](https://nodejs.org/api/stream.html).
```
const {prelude, postponed} = await resumeAndPrerenderToNodeStream(reactNode, postponedState, options?)
```
* [Reference](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md#reference)
    * [`resumeAndPrerenderToNodeStream(reactNode, postponedState, options?)`](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md#resumeandprerendertolnodestream)
* [Usage](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md#usage)
    * [Further reading](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md#further-reading)

### Note

This API is specific to Node.js. Environments with [Web Streams,](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) like Deno and modern edge runtimes, should use [`prerender`](_reference_react-dom_static_prerender.md) instead.

* * *

## Reference

### `resumeAndPrerenderToNodeStream(reactNode, postponedState, options?)`

Call `resumeAndPrerenderToNodeStream` to continue a prerendered React tree to a static HTML string.
```
import { resumeAndPrerenderToNodeStream } from 'react-dom/static';

import { getPostponedState } from 'storage';

async function handler(request, writable) {

const postponedState = getPostponedState(request);

const { prelude } = await resumeAndPrerenderToNodeStream(<App />, JSON.parse(postponedState));

prelude.pipe(writable);

}
```
On the client, call [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) to make the server-generated HTML interactive.

[See more examples below.](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md#usage)

#### Parameters

*   `reactNode`: The React node you called `prerender` (or a previous `resumeAndPrerenderToNodeStream`) with. For example, a JSX element like `<App />`. It is expected to represent the entire document, so the `App` component should render the `<html>` tag.
*   `postponedState`: The opaque `postpone` object returned from a [prerender API](_reference_react-dom_static_index.md), loaded from wherever you stored it (e.g. redis, a file, or S3).
*   **optional** `options`: An object with streaming options.
    *   **optional** `signal`: An [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that lets you [abort server rendering](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md#aborting-server-rendering) and render the rest on the client.
    *   **optional** `onError`: A callback that fires whenever there is a server error, whether [recoverable](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md#recovering-from-errors-outside-the-shell) or [not.](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md#recovering-from-errors-inside-the-shell) By default, this only calls `console.error`. If you override it to [log crash reports,](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md#logging-crashes-on-the-server) make sure that you still call `console.error`.

#### Returns

`resumeAndPrerenderToNodeStream` returns a Promise:

*   If rendering the is successful, the Promise will resolve to an object containing:
    *   `prelude`: a [Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) of HTML. You can use this stream to send a response in chunks, or you can read the entire stream into a string.
    *   `postponed`: an JSON-serializeable, opaque object that can be passed to [`resumeToNodeStream`](_reference_react-dom_server_resume.md) or [`resumeAndPrerenderToNodeStream`](_reference_react-dom_static_resumeAndPrerenderToNodeStream.md) if `resumeAndPrerenderToNodeStream` is aborted.
*   If rendering fails, the Promise will be rejected. [Use this to output a fallback shell.](_reference_react-dom_server_renderToReadableStream.md#recovering-from-errors-inside-the-shell)

#### Caveats

`nonce` is not an available option when prerendering. Nonces must be unique per request and if you use nonces to secure your application with [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) it would be inappropriate and insecure to include the nonce value in the prerender itself.

### Note

### When should I use `resumeAndPrerenderToNodeStream`?

The static `resumeAndPrerenderToNodeStream` API is used for static server-side generation (SSG). Unlike `renderToString`, `resumeAndPrerenderToNodeStream` waits for all data to load before resolving. This makes it suitable for generating static HTML for a full page, including data that needs to be fetched using Suspense. To stream content as it loads, use a streaming server-side render (SSR) API like [renderToReadableStream](_reference_react-dom_server_renderToReadableStream.md).

`resumeAndPrerenderToNodeStream` can be aborted and later either continued with another `resumeAndPrerenderToNodeStream` or resumed with `resume` to support partial pre-rendering.

* * *

## Usage

### Further reading

`resumeAndPrerenderToNodeStream` behaves similarly to [`prerender`](_reference_react-dom_static_prerender.md) but can be used to continue a previously started prerendering process that was aborted. For more information about resuming a prerendered tree, see the [resume documentation](_reference_react-dom_server_resume.md#resuming-a-prerender).

#### _reference_react_Activity.md

> Source: https://react.dev/reference/react/Activity
> Scraped: 12/20/2025, 10:41:01 PM

`<Activity>` lets you hide and restore the UI and internal state of its children.
```
<Activity mode={visibility}>

<Sidebar />

</Activity>
```
* [Reference](_reference_react_Activity.md#reference)
    * [`<Activity>`](_reference_react_Activity.md#activity)
* [Usage](_reference_react_Activity.md#usage)
    * [Restoring the state of hidden components](_reference_react_Activity.md#restoring-the-state-of-hidden-components)
    * [Restoring the DOM of hidden components](_reference_react_Activity.md#restoring-the-dom-of-hidden-components)
    * [Pre-rendering content that’s likely to become visible](_reference_react_Activity.md#pre-rendering-content-thats-likely-to-become-visible)
    * [Speeding up interactions during page load](_reference_react_Activity.md#speeding-up-interactions-during-page-load)
* [Troubleshooting](_reference_react_Activity.md#troubleshooting)
    * [My hidden components have unwanted side effects](_reference_react_Activity.md#my-hidden-components-have-unwanted-side-effects)
    * [My hidden components have Effects that aren’t running](_reference_react_Activity.md#my-hidden-components-have-effects-that-arent-running)

* * *

## Reference

### `<Activity>`

You can use Activity to hide part of your application:
```
<Activity mode={isShowingSidebar ? "visible" : "hidden"}>

</Activity>
```
When an Activity boundary is hidden, React will visually hide its children using the `display: "none"` CSS property. It will also destroy their Effects, cleaning up any active subscriptions.

While hidden, children still re-render in response to new props, albeit at a lower priority than the rest of the content.

When the boundary becomes visible again, React will reveal the children with their previous state restored, and re-create their Effects.

In this way, Activity can be thought of as a mechanism for rendering “background activity”. Rather than completely discarding content that’s likely to become visible again, you can use Activity to maintain and restore that content’s UI and internal state, while ensuring that your hidden content has no unwanted side effects.

[See more examples below.](_reference_react_Activity.md#usage)

#### Props

*   `children`: The UI you intend to show and hide.
*   `mode`: A string value of either `'visible'` or `'hidden'`. If omitted, defaults to `'visible'`.

#### Caveats

*   If an Activity is rendered inside of a [ViewTransition](_reference_react_ViewTransition.md), and it becomes visible as a result of an update caused by [startTransition](_reference_react_startTransition.md), it will activate the ViewTransition’s `enter` animation. If it becomes hidden, it will activate its `exit` animation.
*   An Activity that just renders text will not render anything rather than rendering hidden text, because there’s no corresponding DOM element to apply visibility changes to. For example, `<Activity mode="hidden"><ComponentThatJustReturnsText /></Activity>` will not produce any output in the DOM for `const ComponentThatJustReturnsText = () => "Hello, World!"`.

* * *

## Usage

### Restoring the state of hidden components

In React, when you want to conditionally show or hide a component, you typically mount or unmount it based on that condition:
```
{isShowingSidebar && (

<Sidebar />

)}
```
But unmounting a component destroys its internal state, which is not always what you want.

When you hide a component using an Activity boundary instead, React will “save” its state for later:
```
<Activity mode={isShowingSidebar ? "visible" : "hidden"}>

<Sidebar />

</Activity>
```
This makes it possible to hide and then later restore components in the state they were previously in.

The following example has a sidebar with an expandable section. You can press “Overview” to reveal the three subitems below it. The main app area also has a button that hides and shows the sidebar.

Try expanding the Overview section, and then toggling the sidebar closed then open:
```
import { useState } from 'react';
import Sidebar from './Sidebar.js';
export default function App() {
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);
  return (
    <>
      {isShowingSidebar && (
        <Sidebar />
      )}
      <main>
        <button onClick={() => setIsShowingSidebar(!isShowingSidebar)}>
          Toggle sidebar
        </button>
        <h1>Main content</h1>
      </main>
    </>
  );
}
```
The Overview section always starts out collapsed. Because we unmount the sidebar when `isShowingSidebar` flips to `false`, all its internal state is lost.

This is a perfect use case for Activity. We can preserve the internal state of our sidebar, even when visually hiding it.

Let’s replace the conditional rendering of our sidebar with an Activity boundary:
```
// Before

{isShowingSidebar && (

<Sidebar />

)}

// After

<Activity mode={isShowingSidebar ? 'visible' : 'hidden'}>

<Sidebar />

</Activity>
```
and check out the new behavior:
```
import { Activity, useState } from 'react';
import Sidebar from './Sidebar.js';
export default function App() {
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);
  return (
    <>
      <Activity mode={isShowingSidebar ? 'visible' : 'hidden'}>
        <Sidebar />
      </Activity>
      <main>
        <button onClick={() => setIsShowingSidebar(!isShowingSidebar)}>
          Toggle sidebar
        </button>
        <h1>Main content</h1>
      </main>
    </>
  );
}
```
Our sidebar’s internal state is now restored, without any changes to its implementation.

* * *

### Restoring the DOM of hidden components

Since Activity boundaries hide their children using `display: none`, their children’s DOM is also preserved when hidden. This makes them great for maintaining ephemeral state in parts of the UI that the user is likely to interact with again.

In this example, the Contact tab has a `<textarea>` where the user can enter a message. If you enter some text, change to the Home tab, then change back to the Contact tab, the draft message is lost:

This is because we’re fully unmounting `Contact` in `App`. When the Contact tab unmounts, the `<textarea>` element’s internal DOM state is lost.

If we switch to using an Activity boundary to show and hide the active tab, we can preserve the state of each tab’s DOM. Try entering text and switching tabs again, and you’ll see the draft message is no longer reset:
```
import { Activity, useState } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Contact from './Contact.js';
export default function App() {
  const [activeTab, setActiveTab] = useState('contact');
  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'contact'}
        onClick={() => setActiveTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
        <Home />
      </Activity>
      <Activity mode={activeTab === 'contact' ? 'visible' : 'hidden'}>
        <Contact />
      </Activity>
    </>
  );
}
```
Again, the Activity boundary let us preserve the Contact tab’s internal state without changing its implementation.

* * *

### Pre-rendering content that’s likely to become visible

So far, we’ve seen how Activity can hide some content that the user has interacted with, without discarding that content’s ephemeral state.

But Activity boundaries can also be used to _prepare_ content that the user has yet to see for the first time:
```
<Activity mode="hidden">

<SlowComponent />

</Activity>
```
When an Activity boundary is hidden during its initial render, its children won’t be visible on the page — but they will _still be rendered_, albeit at a lower priority than the visible content, and without mounting their Effects.

This _pre-rendering_ allows the children to load any code or data they need ahead of time, so that later, when the Activity boundary becomes visible, the children can appear faster with reduced loading times.

Let’s look at an example.

In this demo, the Posts tab loads some data. If you press it, you’ll see a Suspense fallback displayed while the data is being fetched:
```
import { useState, Suspense } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Posts from './Posts.js';
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'posts'}
        onClick={() => setActiveTab('posts')}
      >
        Posts
      </TabButton>
      <hr />
      <Suspense fallback={<h1>🌀 Loading...</h1>}>
        {activeTab === 'home' && <Home />}
        {activeTab === 'posts' && <Posts />}
      </Suspense>
    </>
  );
}
```
This is because `App` doesn’t mount `Posts` until its tab is active.

If we update `App` to use an Activity boundary to show and hide the active tab, `Posts` will be pre-rendered when the app first loads, allowing it to fetch its data before it becomes visible.

Try clicking the Posts tab now:
```
import { Activity, useState, Suspense } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Posts from './Posts.js';
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'posts'}
        onClick={() => setActiveTab('posts')}
      >
        Posts
      </TabButton>
      <hr />
      <Suspense fallback={<h1>🌀 Loading...</h1>}>
        <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
          <Home />
        </Activity>
        <Activity mode={activeTab === 'posts' ? 'visible' : 'hidden'}>
          <Posts />
        </Activity>
      </Suspense>
    </>
  );
}
```
`Posts` was able to prepare itself for a faster render, thanks to the hidden Activity boundary.

* * *

Pre-rendering components with hidden Activity boundaries is a powerful way to reduce loading times for parts of the UI that the user is likely to interact with next.

### Note

**Only Suspense-enabled data sources will be fetched during pre-rendering.** They include:

*   Data fetching with Suspense-enabled frameworks like [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) and [Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)
*   Lazy-loading component code with [`lazy`](_reference_react_lazy.md)
*   Reading the value of a cached Promise with [`use`](_reference_react_use.md)

Activity **does not** detect data that is fetched inside an Effect.

The exact way you would load data in the `Posts` component above depends on your framework. If you use a Suspense-enabled framework, you’ll find the details in its data fetching documentation.

Suspense-enabled data fetching without the use of an opinionated framework is not yet supported. The requirements for implementing a Suspense-enabled data source are unstable and undocumented. An official API for integrating data sources with Suspense will be released in a future version of React.

* * *

### Speeding up interactions during page load

React includes an under-the-hood performance optimization called Selective Hydration. It works by hydrating your app’s initial HTML _in chunks_, enabling some components to become interactive even if other components on the page haven’t loaded their code or data yet.

Suspense boundaries participate in Selective Hydration, because they naturally divide your component tree into units that are independent from one another:
```
function Page() {

return (

<>

<MessageComposer />

<Suspense fallback="Loading chats...">

<Chats />

</Suspense>

</>

)

}
```
Here, `MessageComposer` can be fully hydrated during the initial render of the page, even before `Chats` is mounted and starts to fetch its data.

So by breaking up your component tree into discrete units, Suspense allows React to hydrate your app’s server-rendered HTML in chunks, enabling parts of your app to become interactive as fast as possible.

But what about pages that don’t use Suspense?

Take this tabs example:
```
function Page() {

const [activeTab, setActiveTab] = useState('home');

return (

<>

<TabButton onClick={() => setActiveTab('home')}>

        Home

</TabButton>

<TabButton onClick={() => setActiveTab('video')}>

        Video

</TabButton>

{activeTab === 'home' && (

<Home />

)}

{activeTab === 'video' && (

<Video />

)}

</>

)

}
```
Here, React must hydrate the entire page all at once. If `Home` or `Video` are slower to render, they could make the tab buttons feel unresponsive during hydration.

Adding Suspense around the active tab would solve this:
```
function Page() {

const [activeTab, setActiveTab] = useState('home');

return (

<>

<TabButton onClick={() => setActiveTab('home')}>

        Home

</TabButton>

<TabButton onClick={() => setActiveTab('video')}>

        Video

</TabButton>

<Suspense fallback={<Placeholder />}>

{activeTab === 'home' && (

<Home />

)}

{activeTab === 'video' && (

<Video />

)}

</Suspense>

</>

)

}
```
…but it would also change the UI, since the `Placeholder` fallback would be displayed on the initial render.

Instead, we can use Activity. Since Activity boundaries show and hide their children, they already naturally divide the component tree into independent units. And just like Suspense, this feature allows them to participate in Selective Hydration.

Let’s update our example to use Activity boundaries around the active tab:
```
function Page() {

const [activeTab, setActiveTab] = useState('home');

return (

<>

<TabButton onClick={() => setActiveTab('home')}>

        Home

</TabButton>

<TabButton onClick={() => setActiveTab('video')}>

        Video

</TabButton>

<Activity mode={activeTab === "home" ? "visible" : "hidden"}>

<Home />

</Activity>

<Activity mode={activeTab === "video" ? "visible" : "hidden"}>

<Video />

</Activity>

</>

)

}
```
Now our initial server-rendered HTML looks the same as it did in the original version, but thanks to Activity, React can hydrate the tab buttons first, before it even mounts `Home` or `Video`.

* * *

Thus, in addition to hiding and showing content, Activity boundaries help improve your app’s performance during hydration by letting React know which parts of your page can become interactive in isolation.

And even if your page doesn’t ever hide part of its content, you can still add always-visible Activity boundaries to improve hydration performance:
```
function Page() {

return (

<>

<Post />

<Activity>

<Comments />

</Activity>

</>

);

}
```
* * *

## Troubleshooting

### My hidden components have unwanted side effects

An Activity boundary hides its content by setting `display: none` on its children and cleaning up any of their Effects. So, most well-behaved React components that properly clean up their side effects will already be robust to being hidden by Activity.

But there _are_ some situations where a hidden component behaves differently than an unmounted one. Most notably, since a hidden component’s DOM is not destroyed, any side effects from that DOM will persist, even after the component is hidden.

As an example, consider a `<video>` tag. Typically it doesn’t require any cleanup, because even if you’re playing a video, unmounting the tag stops the video and audio from playing in the browser. Try playing the video and then pressing Home in this demo:
```
import { useState } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Video from './Video.js';
export default function App() {
  const [activeTab, setActiveTab] = useState('video');
  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'video'}
        onClick={() => setActiveTab('video')}
      >
        Video
      </TabButton>
      <hr />
      {activeTab === 'home' && <Home />}
      {activeTab === 'video' && <Video />}
    </>
  );
}
```
The video stops playing as expected.

Now, let’s say we wanted to preserve the timecode where the user last watched, so that when they tab back to the video, it doesn’t start over from the beginning again.

This is a great use case for Activity!

Let’s update `App` to hide the inactive tab with a hidden Activity boundary instead of unmounting it, and see how the demo behaves this time:
```
import { Activity, useState } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Video from './Video.js';
export default function App() {
  const [activeTab, setActiveTab] = useState('video');
  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'video'}
        onClick={() => setActiveTab('video')}
      >
        Video
      </TabButton>
      <hr />
      <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
        <Home />
      </Activity>
      <Activity mode={activeTab === 'video' ? 'visible' : 'hidden'}>
        <Video />
      </Activity>
    </>
  );
}
```
Whoops! The video and audio continue to play even after it’s been hidden, because the tab’s `<video>` element is still in the DOM.

To fix this, we can add an Effect with a cleanup function that pauses the video:
```
export default function VideoTab() {

const ref = useRef();

useLayoutEffect(() => {

const videoRef = ref.current;

return () => {

videoRef.pause()

}

}, []);

return (

<video

ref={ref}

controls

playsInline

src="..."

/>

);

}
```
We call `useLayoutEffect` instead of `useEffect` because conceptually the clean-up code is tied to the component’s UI being visually hidden. If we used a regular effect, the code could be delayed by (say) a re-suspending Suspense boundary or a View Transition.

Let’s see the new behavior. Try playing the video, switching to the Home tab, then back to the Video tab:
```
import { Activity, useState } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Video from './Video.js';
export default function App() {
  const [activeTab, setActiveTab] = useState('video');
  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'video'}
        onClick={() => setActiveTab('video')}
      >
        Video
      </TabButton>
      <hr />
      <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
        <Home />
      </Activity>
      <Activity mode={activeTab === 'video' ? 'visible' : 'hidden'}>
        <Video />
      </Activity>
    </>
  );
}
```
It works great! Our cleanup function ensures that the video stops playing if it’s ever hidden by an Activity boundary, and even better, because the `<video>` tag is never destroyed, the timecode is preserved, and the video itself doesn’t need to be initialized or downloaded again when the user switches back to keep watching it.

This is a great example of using Activity to preserve ephemeral DOM state for parts of the UI that become hidden, but the user is likely to interact with again soon.

* * *

Our example illustrates that for certain tags like `<video>`, unmounting and hiding have different behavior. If a component renders DOM that has a side effect, and you want to prevent that side effect when an Activity boundary hides it, add an Effect with a return function to clean it up.

The most common cases of this will be from the following tags:

*   `<video>`
*   `<audio>`
*   `<iframe>`

Typically, though, most of your React components should already be robust to being hidden by an Activity boundary. And conceptually, you should think of “hidden” Activities as being unmounted.

To eagerly discover other Effects that don’t have proper cleanup, which is important not only for Activity boundaries but for many other behaviors in React, we recommend using [`<StrictMode>`](_reference_react_StrictMode.md).

* * *

### My hidden components have Effects that aren’t running

When an `<Activity>` is “hidden”, all its children’s Effects are cleaned up. Conceptually, the children are unmounted, but React saves their state for later. This is a feature of Activity because it means subscriptions won’t be active for hidden parts of the UI, reducing the amount of work needed for hidden content.

If you’re relying on an Effect mounting to clean up a component’s side effects, refactor the Effect to do the work in the returned cleanup function instead.

To eagerly find problematic Effects, we recommend adding [`<StrictMode>`](_reference_react_StrictMode.md) which will eagerly perform Activity unmounts and mounts to catch any unexpected side-effects.

#### _reference_react_Fragment.md

> Source: https://react.dev/reference/react/Fragment
> Scraped: 12/20/2025, 10:40:54 PM

`<Fragment>`, often used via `<>...</>` syntax, lets you group elements without a wrapper node.

### Canary

Fragments can also accept refs, which enable interacting with underlying DOM nodes without adding wrapper elements. See reference and usage below.
```
<>

<OneChild />

<AnotherChild />

</>
```
* [Reference](_reference_react_Fragment.md#reference)
    * [`<Fragment>`](_reference_react_Fragment.md#fragment)
    * [Canary only FragmentInstance](_reference_react_Fragment.md#fragmentinstance)
* [Usage](_reference_react_Fragment.md#usage)
    * [Returning multiple elements](_reference_react_Fragment.md#returning-multiple-elements)
    * [Assigning multiple elements to a variable](_reference_react_Fragment.md#assigning-multiple-elements-to-a-variable)
    * [Grouping elements with text](_reference_react_Fragment.md#grouping-elements-with-text)
    * [Rendering a list of Fragments](_reference_react_Fragment.md#rendering-a-list-of-fragments)
    * [Canary only Using Fragment refs for DOM interaction](_reference_react_Fragment.md#using-fragment-refs-for-dom-interaction)
    * [Canary only Tracking visibility with Fragment refs](_reference_react_Fragment.md#tracking-visibility-with-fragment-refs)
    * [Canary only Focus management with Fragment refs](_reference_react_Fragment.md#focus-management-with-fragment-refs)

* * *

## Reference

### `<Fragment>`

Wrap elements in `<Fragment>` to group them together in situations where you need a single element. Grouping elements in `Fragment` has no effect on the resulting DOM; it is the same as if the elements were not grouped. The empty JSX tag `<></>` is shorthand for `<Fragment></Fragment>` in most cases.

#### Props

*   **optional** `key`: Fragments declared with the explicit `<Fragment>` syntax may have [keys.](_learn_rendering-lists.md#keeping-list-items-in-order-with-key)
*   Canary only **optional** `ref`: A ref object (e.g. from [`useRef`](_reference_react_useRef.md)) or [callback function](_reference_react-dom_components_common.md#ref-callback). React provides a `FragmentInstance` as the ref value that implements methods for interacting with the DOM nodes wrapped by the Fragment.

### Canary only FragmentInstance

When you pass a ref to a fragment, React provides a `FragmentInstance` object with methods for interacting with the DOM nodes wrapped by the fragment:

**Event handling methods:**   `addEventListener(type, listener, options?)`: Adds an event listener to all first-level DOM children of the Fragment.
*   `removeEventListener(type, listener, options?)`: Removes an event listener from all first-level DOM children of the Fragment.
*   `dispatchEvent(event)`: Dispatches an event to a virtual child of the Fragment to call any added listeners and can bubble to the DOM parent.

**Layout methods:**   `compareDocumentPosition(otherNode)`: Compares the document position of the Fragment with another node.
    *   If the Fragment has children, the native `compareDocumentPosition` value is returned.
    *   Empty Fragments will attempt to compare positioning within the React tree and include `Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC`.
    *   Elements that have a different relationship in the React tree and DOM tree due to portaling or other insertions are `Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC`.
*   `getClientRects()`: Returns a flat array of `DOMRect` objects representing the bounding rectangles of all children.
*   `getRootNode()`: Returns the root node containing the Fragment’s parent DOM node.

**Focus management methods:**   `focus(options?)`: Focuses the first focusable DOM node in the Fragment. Focus is attempted on nested children depth-first.
*   `focusLast(options?)`: Focuses the last focusable DOM node in the Fragment. Focus is attempted on nested children depth-first.
*   `blur()`: Removes focus if `document.activeElement` is within the Fragment.

**Observer methods:**   `observeUsing(observer)`: Starts observing the Fragment’s DOM children with an IntersectionObserver or ResizeObserver.
*   `unobserveUsing(observer)`: Stops observing the Fragment’s DOM children with the specified observer.

#### Caveats

*   If you want to pass `key` to a Fragment, you can’t use the `<>...</>` syntax. You have to explicitly import `Fragment` from `'react'` and render `<Fragment key={yourKey}>...</Fragment>`.

*   React does not [reset state](_learn_preserving-and-resetting-state.md) when you go from rendering `<><Child /></>` to `[<Child />]` or back, or when you go from rendering `<><Child /></>` to `<Child />` and back. This only works a single level deep: for example, going from `<><><Child /></></>` to `<Child />` resets the state. See the precise semantics [here.](https://gist.github.com/clemmy/b3ef00f9507909429d8aa0d3ee4f986b)

*   Canary only If you want to pass `ref` to a Fragment, you can’t use the `<>...</>` syntax. You have to explicitly import `Fragment` from `'react'` and render `<Fragment ref={yourRef}>...</Fragment>`.

* * *

## Usage

### Returning multiple elements

Use `Fragment`, or the equivalent `<>...</>` syntax, to group multiple elements together. You can use it to put multiple elements in any place where a single element can go. For example, a component can only return one element, but by using a Fragment you can group multiple elements together and then return them as a group:
```
function Post() {

return (

<>

<PostTitle />

<PostBody />

</>

);

}
```
Fragments are useful because grouping elements with a Fragment has no effect on layout or styles, unlike if you wrapped the elements in another container like a DOM element. If you inspect this example with the browser tools, you’ll see that all `<h1>` and `<article>` DOM nodes appear as siblings without wrappers around them:
```
export default function Blog() {
  return (
    <>
      <Post title="An update" body="It's been a while since I posted..." />
      <Post title="My new blog" body="I am starting a new blog!" />
    </>
  )
}
function Post({ title, body }) {
  return (
    <>
      <PostTitle title={title} />
      <PostBody body={body} />
    </>
  );
}
function PostTitle({ title }) {
  return <h1>{title}</h1>
}
function PostBody({ body }) {
  return (
    <article>
      <p>{body}</p>
    </article>
  );
}
```
##### Deep Dive

#### How to write a Fragment without the special syntax?

The example above is equivalent to importing `Fragment` from React:
```
import { Fragment } from 'react';

function Post() {

return (

<Fragment>

<PostTitle />

<PostBody />

</Fragment>

);

}
```
Usually you won’t need this unless you need to [pass a `key` to your `Fragment`.](_reference_react_Fragment.md#rendering-a-list-of-fragments)

* * *

### Assigning multiple elements to a variable

Like any other element, you can assign Fragment elements to variables, pass them as props, and so on:
```
function CloseDialog() {

const buttons = (

<>

<OKButton />

<CancelButton />

</>

);

return (

<AlertDialog buttons={buttons}>

      Are you sure you want to leave this page?

</AlertDialog>

);

}
```
* * *

### Grouping elements with text

You can use `Fragment` to group text together with components:
```
function DateRangePicker({ start, end }) {

return (

<>

      From

<DatePicker date={start} />

      to

<DatePicker date={end} />

</>

);

}
```
* * *

### Rendering a list of Fragments

Here’s a situation where you need to write `Fragment` explicitly instead of using the `<></>` syntax. When you [render multiple elements in a loop](_learn_rendering-lists.md), you need to assign a `key` to each element. If the elements within the loop are Fragments, you need to use the normal JSX element syntax in order to provide the `key` attribute:
```
function Blog() {

return posts.map(post =>

<Fragment key={post.id}>

<PostTitle title={post.title} />

<PostBody body={post.body} />

</Fragment>

);

}
```
You can inspect the DOM to verify that there are no wrapper elements around the Fragment children:
```
import { Fragment } from 'react';
const posts = [
  { id: 1, title: 'An update', body: "It's been a while since I posted..." },
  { id: 2, title: 'My new blog', body: 'I am starting a new blog!' }
];
export default function Blog() {
  return posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  );
}
function PostTitle({ title }) {
  return <h1>{title}</h1>
}
function PostBody({ body }) {
  return (
    <article>
      <p>{body}</p>
    </article>
  );
}
```
* * *

### Canary only Using Fragment refs for DOM interaction

Fragment refs allow you to interact with the DOM nodes wrapped by a Fragment without adding extra wrapper elements. This is useful for event handling, visibility tracking, focus management, and replacing deprecated patterns like `ReactDOM.findDOMNode()`.
```
import { Fragment } from 'react';

function ClickableFragment({ children, onClick }) {

return (

<Fragment ref={fragmentInstance => {

fragmentInstance.addEventListener('click', handleClick);

return () => fragmentInstance.removeEventListener('click', handleClick);

}}>

{children}

</Fragment>

);

}
```
* * *

### Canary only Tracking visibility with Fragment refs

Fragment refs are useful for visibility tracking and intersection observation. This enables you to monitor when content becomes visible without requiring the child Components to expose refs:
```
import { Fragment, useRef, useLayoutEffect } from 'react';

function VisibilityObserverFragment({ threshold = 0.5, onVisibilityChange, children }) {

const fragmentRef = useRef(null);

useLayoutEffect(() => {

const observer = new IntersectionObserver(

(entries) => {

onVisibilityChange(entries.some(entry => entry.isIntersecting))

},

{ threshold }

);

fragmentRef.current.observeUsing(observer);

return () => fragmentRef.current.unobserveUsing(observer);

}, [threshold, onVisibilityChange]);

return (

<Fragment ref={fragmentRef}>

{children}

</Fragment>

);

}

function MyComponent() {

const handleVisibilityChange = (isVisible) => {

console.log('Component is', isVisible ? 'visible' : 'hidden');

};

return (

<VisibilityObserverFragment onVisibilityChange={handleVisibilityChange}>

<SomeThirdPartyComponent />

<AnotherComponent />

</VisibilityObserverFragment>

);

}
```
This pattern is an alternative to Effect-based visibility logging, which is an anti-pattern in most cases. Relying on Effects alone does not guarantee that the rendered Component is observable by the user.

* * *

### Canary only Focus management with Fragment refs

Fragment refs provide focus management methods that work across all DOM nodes within the Fragment:
```
import { Fragment, useRef } from 'react';

function FocusFragment({ children }) {

return (

<Fragment ref={(fragmentInstance) => fragmentInstance?.focus()}>

{children}

</Fragment>

);

}
```
The `focus()` method focuses the first focusable element within the Fragment, while `focusLast()` focuses the last focusable element.

#### _reference_react_Profiler.md

> Source: https://react.dev/reference/react/Profiler
> Scraped: 12/20/2025, 10:40:54 PM

`<Profiler>` lets you measure rendering performance of a React tree programmatically.
```
<Profiler id="App" onRender={onRender}>

<App />

</Profiler>
```
* [Reference](_reference_react_Profiler.md#reference)
    * [`<Profiler>`](_reference_react_Profiler.md#profiler)
    * [`onRender` callback](_reference_react_Profiler.md#onrender-callback)
* [Usage](_reference_react_Profiler.md#usage)
    * [Measuring rendering performance programmatically](_reference_react_Profiler.md#measuring-rendering-performance-programmatically)
    * [Measuring different parts of the application](_reference_react_Profiler.md#measuring-different-parts-of-the-application)

* * *

## Reference

### `<Profiler>`

Wrap a component tree in a `<Profiler>` to measure its rendering performance.
```
<Profiler id="App" onRender={onRender}>

<App />

</Profiler>
```
#### Props

*   `id`: A string identifying the part of the UI you are measuring.
*   `onRender`: An [`onRender` callback](_reference_react_Profiler.md#onrender-callback) that React calls every time components within the profiled tree update. It receives information about what was rendered and how much time it took.

#### Caveats

*   Profiling adds some additional overhead, so **it is disabled in the production build by default.** To opt into production profiling, you need to enable a [special production build with profiling enabled.](_reference_dev-tools_react-performance-tracks.md#using-profiling-builds)

* * *

### `onRender` callback

React will call your `onRender` callback with information about what was rendered.
```
function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {

// Aggregate or log render timings...

}
```
#### Parameters

*   `id`: The string `id` prop of the `<Profiler>` tree that has just committed. This lets you identify which part of the tree was committed if you are using multiple profilers.
*   `phase`: `"mount"`, `"update"` or `"nested-update"`. This lets you know whether the tree has just been mounted for the first time or re-rendered due to a change in props, state, or Hooks.
*   `actualDuration`: The number of milliseconds spent rendering the `<Profiler>` and its descendants for the current update. This indicates how well the subtree makes use of memoization (e.g. [`memo`](_reference_react_memo.md) and [`useMemo`](_reference_react_useMemo.md)). Ideally this value should decrease significantly after the initial mount as many of the descendants will only need to re-render if their specific props change.
*   `baseDuration`: The number of milliseconds estimating how much time it would take to re-render the entire `<Profiler>` subtree without any optimizations. It is calculated by summing up the most recent render durations of each component in the tree. This value estimates a worst-case cost of rendering (e.g. the initial mount or a tree with no memoization). Compare `actualDuration` against it to see if memoization is working.
*   `startTime`: A numeric timestamp for when React began rendering the current update.
*   `commitTime`: A numeric timestamp for when React committed the current update. This value is shared between all profilers in a commit, enabling them to be grouped if desirable.

* * *

## Usage

### Measuring rendering performance programmatically

Wrap the `<Profiler>` component around a React tree to measure its rendering performance.
```
<App>

<Profiler id="Sidebar" onRender={onRender}>

<Sidebar />

</Profiler>

<PageContent />

</App>
```
It requires two props: an `id` (string) and an `onRender` callback (function) which React calls any time a component within the tree “commits” an update.

### Pitfall

### Note

`<Profiler>` lets you gather measurements programmatically. If you’re looking for an interactive profiler, try the Profiler tab in [React Developer Tools](_learn_react-developer-tools.md). It exposes similar functionality as a browser extension.

Components wrapped in `<Profiler>` will also be marked in the [Component tracks](_reference_dev-tools_react-performance-tracks.md#components) of React Performance tracks even in profiling builds. In development builds, all components are marked in the Components track regardless of whether they’re wrapped in `<Profiler>`.

* * *

### Measuring different parts of the application

You can use multiple `<Profiler>` components to measure different parts of your application:
```
<App>

<Profiler id="Sidebar" onRender={onRender}>

<Sidebar />

</Profiler>

<Profiler id="Content" onRender={onRender}>

<Content />

</Profiler>

</App>
```
You can also nest `<Profiler>` components:
```
<App>

<Profiler id="Sidebar" onRender={onRender}>

<Sidebar />

</Profiler>

<Profiler id="Content" onRender={onRender}>

<Content>

<Profiler id="Editor" onRender={onRender}>

<Editor />

</Profiler>

</Content>

</Profiler>

</App>
```
Although `<Profiler>` is a lightweight component, it should be used only when necessary. Each use adds some CPU and memory overhead to an application.

* * *

#### _reference_react_StrictMode.md

> Source: https://react.dev/reference/react/StrictMode
> Scraped: 12/20/2025, 10:40:56 PM

`<StrictMode>` lets you find common bugs in your components early during development.
```
<StrictMode>

<App />

</StrictMode>
```
* [Reference](_reference_react_StrictMode.md#reference)
    * [`<StrictMode>`](_reference_react_StrictMode.md#strictmode)
* [Usage](_reference_react_StrictMode.md#usage)
    * [Enabling Strict Mode for entire app](_reference_react_StrictMode.md#enabling-strict-mode-for-entire-app)
    * [Enabling Strict Mode for a part of the app](_reference_react_StrictMode.md#enabling-strict-mode-for-a-part-of-the-app)
    * [Fixing bugs found by double rendering in development](_reference_react_StrictMode.md#fixing-bugs-found-by-double-rendering-in-development)
    * [Fixing bugs found by re-running Effects in development](_reference_react_StrictMode.md#fixing-bugs-found-by-re-running-effects-in-development)
    * [Fixing bugs found by re-running ref callbacks in development](_reference_react_StrictMode.md#fixing-bugs-found-by-re-running-ref-callbacks-in-development)
    * [Fixing deprecation warnings enabled by Strict Mode](_reference_react_StrictMode.md#fixing-deprecation-warnings-enabled-by-strict-mode)

* * *

## Reference

### `<StrictMode>`

Use `StrictMode` to enable additional development behaviors and warnings for the component tree inside:
```
import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(

<StrictMode>

<App />

</StrictMode>

);
```
[See more examples below.](_reference_react_StrictMode.md#usage)

Strict Mode enables the following development-only behaviors:

*   Your components will [re-render an extra time](_reference_react_StrictMode.md#fixing-bugs-found-by-double-rendering-in-development) to find bugs caused by impure rendering.
*   Your components will [re-run Effects an extra time](_reference_react_StrictMode.md#fixing-bugs-found-by-re-running-effects-in-development) to find bugs caused by missing Effect cleanup.
*   Your components will [re-run refs callbacks an extra time](_reference_react_StrictMode.md#fixing-bugs-found-by-re-running-ref-callbacks-in-development) to find bugs caused by missing ref cleanup.
*   Your components will [be checked for usage of deprecated APIs.](_reference_react_StrictMode.md#fixing-deprecation-warnings-enabled-by-strict-mode)

#### Props

`StrictMode` accepts no props.

#### Caveats

*   There is no way to opt out of Strict Mode inside a tree wrapped in `<StrictMode>`. This gives you confidence that all components inside `<StrictMode>` are checked. If two teams working on a product disagree whether they find the checks valuable, they need to either reach consensus or move `<StrictMode>` down in the tree.

* * *

## Usage

### Enabling Strict Mode for entire app

Strict Mode enables extra development-only checks for the entire component tree inside the `<StrictMode>` component. These checks help you find common bugs in your components early in the development process.

To enable Strict Mode for your entire app, wrap your root component with `<StrictMode>` when you render it:
```
import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(

<StrictMode>

<App />

</StrictMode>

);
```
We recommend wrapping your entire app in Strict Mode, especially for newly created apps. If you use a framework that calls [`createRoot`](_reference_react-dom_client_createRoot.md) for you, check its documentation for how to enable Strict Mode.

Although the Strict Mode checks **only run in development,** they help you find bugs that already exist in your code but can be tricky to reliably reproduce in production. Strict Mode lets you fix bugs before your users report them.

### Note

* * *

### Enabling Strict Mode for a part of the app

You can also enable Strict Mode for any part of your application:
```
import { StrictMode } from 'react';

function App() {

return (

<>

<Header />

<StrictMode>

<main>

<Sidebar />

<Content />

</main>

</StrictMode>

<Footer />

</>

);

}
```
In this example, Strict Mode checks will not run against the `Header` and `Footer` components. However, they will run on `Sidebar` and `Content`, as well as all of the components inside them, no matter how deep.

### Note

When `StrictMode` is enabled for a part of the app, React will only enable behaviors that are possible in production. For example, if `<StrictMode>` is not enabled at the root of the app, it will not [re-run Effects an extra time](_reference_react_StrictMode.md#fixing-bugs-found-by-re-running-effects-in-development) on initial mount, since this would cause child effects to double fire without the parent effects, which cannot happen in production.

* * *

### Fixing bugs found by double rendering in development

[React assumes that every component you write is a pure function.](_learn_keeping-components-pure.md) This means that React components you write must always return the same JSX given the same inputs (props, state, and context).

Components breaking this rule behave unpredictably and cause bugs. To help you find accidentally impure code, Strict Mode calls some of your functions (only the ones that should be pure) **twice in development.** This includes:

*   Your component function body (only top-level logic, so this doesn’t include code inside event handlers)
*   Functions that you pass to [`useState`](_reference_react_useState.md), [`set` functions](_reference_react_useState.md#setstate), [`useMemo`](_reference_react_useMemo.md), or [`useReducer`](_reference_react_useReducer.md)
*   Some class component methods like [`constructor`](_reference_react_Component.md#constructor), [`render`](_reference_react_Component.md#render), [`shouldComponentUpdate`](_reference_react_Component.md#shouldcomponentupdate) ([see the whole list](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects))

If a function is pure, running it twice does not change its behavior because a pure function produces the same result every time. However, if a function is impure (for example, it mutates the data it receives), running it twice tends to be noticeable (that’s what makes it impure!) This helps you spot and fix the bug early.

**Here is an example to illustrate how double rendering in Strict Mode helps you find bugs early.**

This `StoryTray` component takes an array of `stories` and adds one last “Create Story” item at the end:

There is a mistake in the code above. However, it is easy to miss because the initial output appears correct.

This mistake will become more noticeable if the `StoryTray` component re-renders multiple times. For example, let’s make the `StoryTray` re-render with a different background color whenever you hover over it:
```
import { useState } from 'react';
export default function StoryTray({ stories }) {
  const [isHover, setIsHover] = useState(false);
  const items = stories;
  items.push({ id: 'create', label: 'Create Story' });
  return (
    <ul
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
      style={{
        backgroundColor: isHover ? '#ddd' : '#fff'
      }}
    >
      {items.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```
Notice how every time you hover over the `StoryTray` component, “Create Story” gets added to the list again. The intention of the code was to add it once at the end. But `StoryTray` directly modifies the `stories` array from the props. Every time `StoryTray` renders, it adds “Create Story” again at the end of the same array. In other words, `StoryTray` is not a pure function—running it multiple times produces different results.

To fix this problem, you can make a copy of the array, and modify that copy instead of the original one:
```
export default function StoryTray({ stories }) {

const items = stories.slice(); // Clone the array

// ✅ Good: Pushing into a new array

items.push({ id: 'create', label: 'Create Story' });
```
This would [make the `StoryTray` function pure.](_learn_keeping-components-pure.md) Each time it is called, it would only modify a new copy of the array, and would not affect any external objects or variables. This solves the bug, but you had to make the component re-render more often before it became obvious that something is wrong with its behavior.

**In the original example, the bug wasn’t obvious. Now let’s wrap the original (buggy) code in `<StrictMode>`:***Strict Mode _always_ calls your rendering function twice, so you can see the mistake right away** (“Create Story” appears twice). This lets you notice such mistakes early in the process. When you fix your component to render in Strict Mode, you _also_ fix many possible future production bugs like the hover functionality from before:
```
import { useState } from 'react';
export default function StoryTray({ stories }) {
  const [isHover, setIsHover] = useState(false);
  const items = stories.slice();
  items.push({ id: 'create', label: 'Create Story' });
  return (
    <ul
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
      style={{
        backgroundColor: isHover ? '#ddd' : '#fff'
      }}
    >
      {items.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```
Without Strict Mode, it was easy to miss the bug until you added more re-renders. Strict Mode made the same bug appear right away. Strict Mode helps you find bugs before you push them to your team and to your users.

[Read more about keeping components pure.](_learn_keeping-components-pure.md)

### Note

If you have [React DevTools](_learn_react-developer-tools.md) installed, any `console.log` calls during the second render call will appear slightly dimmed. React DevTools also offers a setting (off by default) to suppress them completely.

* * *

### Fixing bugs found by re-running Effects in development

Strict Mode can also help find bugs in [Effects.](_learn_synchronizing-with-effects.md)

Every Effect has some setup code and may have some cleanup code. Normally, React calls setup when the component _mounts_ (is added to the screen) and calls cleanup when the component _unmounts_ (is removed from the screen). React then calls cleanup and setup again if its dependencies changed since the last render.

When Strict Mode is on, React will also run **one extra setup+cleanup cycle in development for every Effect.** This may feel surprising, but it helps reveal subtle bugs that are hard to catch manually.

**Here is an example to illustrate how re-running Effects in Strict Mode helps you find bugs early.**

Consider this example that connects a component to a chat:

There is an issue with this code, but it might not be immediately clear.

To make the issue more obvious, let’s implement a feature. In the example below, `roomId` is not hardcoded. Instead, the user can select the `roomId` that they want to connect to from a dropdown. Click “Open chat” and then select different chat rooms one by one. Keep track of the number of active connections in the console:

You’ll notice that the number of open connections always keeps growing. In a real app, this would cause performance and network problems. The issue is that [your Effect is missing a cleanup function:](_learn_synchronizing-with-effects.md#step-3-add-cleanup-if-needed)
```
useEffect(() => {

const connection = createConnection(serverUrl, roomId);

connection.connect();

return () => connection.disconnect();

}, [roomId]);
```
Now that your Effect “cleans up” after itself and destroys the outdated connections, the leak is solved. However, notice that the problem did not become visible until you’ve added more features (the select box).

**In the original example, the bug wasn’t obvious. Now let’s wrap the original (buggy) code in `<StrictMode>`:***With Strict Mode, you immediately see that there is a problem** (the number of active connections jumps to 2). Strict Mode runs an extra setup+cleanup cycle for every Effect. This Effect has no cleanup logic, so it creates an extra connection but doesn’t destroy it. This is a hint that you’re missing a cleanup function.

Strict Mode lets you notice such mistakes early in the process. When you fix your Effect by adding a cleanup function in Strict Mode, you _also_ fix many possible future production bugs like the select box from before:

Notice how the active connection count in the console doesn’t keep growing anymore.

Without Strict Mode, it was easy to miss that your Effect needed cleanup. By running _setup → cleanup → setup_ instead of _setup_ for your Effect in development, Strict Mode made the missing cleanup logic more noticeable.

[Read more about implementing Effect cleanup.](_learn_synchronizing-with-effects.md#how-to-handle-the-effect-firing-twice-in-development)

* * *

### Fixing bugs found by re-running ref callbacks in development

Strict Mode can also help find bugs in [callbacks refs.](_learn_manipulating-the-dom-with-refs.md)

Every callback `ref` has some setup code and may have some cleanup code. Normally, React calls setup when the element is _created_ (is added to the DOM) and calls cleanup when the element is _removed_ (is removed from the DOM).

When Strict Mode is on, React will also run **one extra setup+cleanup cycle in development for every callback `ref`.** This may feel surprising, but it helps reveal subtle bugs that are hard to catch manually.

Consider this example, which allows you to select an animal and then scroll to one of them. Notice when you switch from “Cats” to “Dogs”, the console logs show that the number of animals in the list keeps growing, and the “Scroll to” buttons stop working:
```
import { useRef, useState } from "react";
export default function CatFriends() {
  const itemsRef = useRef([]);
  const [catList, setCatList] = useState(setupCatList);
  const [cat, setCat] = useState('neo');
  function scrollToCat(index) {
    const list = itemsRef.current;
    const {node} = list[index];
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
  const cats = catList.filter(c => c.type === cat)
  return (
    <>
      <nav>
        <button onClick={() => setCat('neo')}>Neo</button>
        <button onClick={() => setCat('millie')}>Millie</button>
      </nav>
      <hr />
      <nav>
        Scroll to:{cats.map((cat, index) => (
          <button key={cat.src} onClick={() => scrollToCat(index)}>
            {index}
          </button>
        ))}
      </nav>

        <ul>
          {cats.map((cat) => (
            <li
              key={cat.src}
              ref={(node) => {
                const list = itemsRef.current;
                const item = {cat: cat, node};
                list.push(item);
                console.log(`✅ Adding cat to the map. Total cats: ${list.length}`);
                if (list.length > 10) {
                  console.log('❌ Too many cats in the list!');
                }
                return () => {
                }
              }}
            >
              <img src={cat.src} />
            </li>
          ))}
        </ul>

    </>
  );
}
function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'neo', src: "https://placecats.com/neo/320/240?" + i});
  }
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'millie', src: "https://placecats.com/millie/320/240?" + i});
  }
  return catList;
}
```
**This is a production bug!** Since the ref callback doesn’t remove animals from the list in the cleanup, the list of animals keeps growing. This is a memory leak that can cause performance problems in a real app, and breaks the behavior of the app.

The issue is the ref callback doesn’t cleanup after itself:
```
<li

ref={node => {

const list = itemsRef.current;

const item = {animal, node};

list.push(item);

return () => {

// 🚩 No cleanup, this is a bug!

}

}}

</li>
```
Now let’s wrap the original (buggy) code in `<StrictMode>`:
```
import { useRef, useState } from "react";
export default function CatFriends() {
  const itemsRef = useRef([]);
  const [catList, setCatList] = useState(setupCatList);
  const [cat, setCat] = useState('neo');
  function scrollToCat(index) {
    const list = itemsRef.current;
    const {node} = list[index];
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
  const cats = catList.filter(c => c.type === cat)
  return (
    <>
      <nav>
        <button onClick={() => setCat('neo')}>Neo</button>
        <button onClick={() => setCat('millie')}>Millie</button>
      </nav>
      <hr />
      <nav>
        Scroll to:{cats.map((cat, index) => (
          <button key={cat.src} onClick={() => scrollToCat(index)}>
            {index}
          </button>
        ))}
      </nav>

        <ul>
          {cats.map((cat) => (
            <li
              key={cat.src}
              ref={(node) => {
                const list = itemsRef.current;
                const item = {cat: cat, node};
                list.push(item);
                console.log(`✅ Adding cat to the map. Total cats: ${list.length}`);
                if (list.length > 10) {
                  console.log('❌ Too many cats in the list!');
                }
                return () => {
                }
              }}
            >
              <img src={cat.src} />
            </li>
          ))}
        </ul>

    </>
  );
}
function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'neo', src: "https://placecats.com/neo/320/240?" + i});
  }
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'millie', src: "https://placecats.com/millie/320/240?" + i});
  }
  return catList;
}
```
**With Strict Mode, you immediately see that there is a problem**. Strict Mode runs an extra setup+cleanup cycle for every callback ref. This callback ref has no cleanup logic, so it adds refs but doesn’t remove them. This is a hint that you’re missing a cleanup function.

Strict Mode lets you eagerly find mistakes in callback refs. When you fix your callback by adding a cleanup function in Strict Mode, you _also_ fix many possible future production bugs like the “Scroll to” bug from before:
```
import { useRef, useState } from "react";
export default function CatFriends() {
  const itemsRef = useRef([]);
  const [catList, setCatList] = useState(setupCatList);
  const [cat, setCat] = useState('neo');
  function scrollToCat(index) {
    const list = itemsRef.current;
    const {node} = list[index];
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
  const cats = catList.filter(c => c.type === cat)
  return (
    <>
      <nav>
        <button onClick={() => setCat('neo')}>Neo</button>
        <button onClick={() => setCat('millie')}>Millie</button>
      </nav>
      <hr />
      <nav>
        Scroll to:{cats.map((cat, index) => (
          <button key={cat.src} onClick={() => scrollToCat(index)}>
            {index}
          </button>
        ))}
      </nav>

        <ul>
          {cats.map((cat) => (
            <li
              key={cat.src}
              ref={(node) => {
                const list = itemsRef.current;
                const item = {cat: cat, node};
                list.push(item);
                console.log(`✅ Adding cat to the map. Total cats: ${list.length}`);
                if (list.length > 10) {
                  console.log('❌ Too many cats in the list!');
                }
                return () => {
                  list.splice(list.indexOf(item), 1);
                  console.log(`❌ Removing cat from the map. Total cats: ${itemsRef.current.length}`);
                }
              }}
            >
              <img src={cat.src} />
            </li>
          ))}
        </ul>

    </>
  );
}
function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'neo', src: "https://placecats.com/neo/320/240?" + i});
  }
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'millie', src: "https://placecats.com/millie/320/240?" + i});
  }
  return catList;
}
```
Now on inital mount in StrictMode, the ref callbacks are all setup, cleaned up, and setup again:
```
...

✅ Adding animal to the map. Total animals: 10

...

❌ Removing animal from the map. Total animals: 0

...

✅ Adding animal to the map. Total animals: 10
```
**This is expected.** Strict Mode confirms that the ref callbacks are cleaned up correctly, so the size never grows above the expected amount. After the fix, there are no memory leaks, and all the features work as expected.

Without Strict Mode, it was easy to miss the bug until you clicked around to app to notice broken features. Strict Mode made the bugs appear right away, before you push them to production.

* * *

### Fixing deprecation warnings enabled by Strict Mode

React warns if some component anywhere inside a `<StrictMode>` tree uses one of these deprecated APIs:

*   `UNSAFE_` class lifecycle methods like [`UNSAFE_componentWillMount`](_reference_react_Component.md#unsafe_componentwillmount). [See alternatives.](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#migrating-from-legacy-lifecycles)

These APIs are primarily used in older [class components](_reference_react_Component.md) so they rarely appear in modern apps.

#### _reference_react_Suspense.md

> Source: https://react.dev/reference/react/Suspense
> Scraped: 12/20/2025, 10:40:56 PM

`<Suspense>` lets you display a fallback until its children have finished loading.
```
<Suspense fallback={<Loading />}>

<SomeComponent />

</Suspense>
```
* [Reference](_reference_react_Suspense.md#reference)
    * [`<Suspense>`](_reference_react_Suspense.md#suspense)
* [Usage](_reference_react_Suspense.md#usage)
    * [Displaying a fallback while content is loading](_reference_react_Suspense.md#displaying-a-fallback-while-content-is-loading)
    * [Revealing content together at once](_reference_react_Suspense.md#revealing-content-together-at-once)
    * [Revealing nested content as it loads](_reference_react_Suspense.md#revealing-nested-content-as-it-loads)
    * [Showing stale content while fresh content is loading](_reference_react_Suspense.md#showing-stale-content-while-fresh-content-is-loading)
    * [Preventing already revealed content from hiding](_reference_react_Suspense.md#preventing-already-revealed-content-from-hiding)
    * [Indicating that a Transition is happening](_reference_react_Suspense.md#indicating-that-a-transition-is-happening)
    * [Resetting Suspense boundaries on navigation](_reference_react_Suspense.md#resetting-suspense-boundaries-on-navigation)
    * [Providing a fallback for server errors and client-only content](_reference_react_Suspense.md#providing-a-fallback-for-server-errors-and-client-only-content)
* [Troubleshooting](_reference_react_Suspense.md#troubleshooting)
    * [How do I prevent the UI from being replaced by a fallback during an update?](_reference_react_Suspense.md#preventing-unwanted-fallbacks)

* * *

## Reference

### `<Suspense>`

#### Props

*   `children`: The actual UI you intend to render. If `children` suspends while rendering, the Suspense boundary will switch to rendering `fallback`.
*   `fallback`: An alternate UI to render in place of the actual UI if it has not finished loading. Any valid React node is accepted, though in practice, a fallback is a lightweight placeholder view, such as a loading spinner or skeleton. Suspense will automatically switch to `fallback` when `children` suspends, and back to `children` when the data is ready. If `fallback` suspends while rendering, it will activate the closest parent Suspense boundary.

#### Caveats

*   React does not preserve any state for renders that got suspended before they were able to mount for the first time. When the component has loaded, React will retry rendering the suspended tree from scratch.
*   If Suspense was displaying content for the tree, but then it suspended again, the `fallback` will be shown again unless the update causing it was caused by [`startTransition`](_reference_react_startTransition.md) or [`useDeferredValue`](_reference_react_useDeferredValue.md).
*   If React needs to hide the already visible content because it suspended again, it will clean up [layout Effects](_reference_react_useLayoutEffect.md) in the content tree. When the content is ready to be shown again, React will fire the layout Effects again. This ensures that Effects measuring the DOM layout don’t try to do this while the content is hidden.
*   React includes under-the-hood optimizations like _Streaming Server Rendering_ and _Selective Hydration_ that are integrated with Suspense. Read [an architectural overview](https://github.com/reactwg/react-18/discussions/37) and watch [a technical talk](https://www.youtube.com/watch?v=pj5N-Khihgc) to learn more.

* * *

## Usage

### Displaying a fallback while content is loading

You can wrap any part of your application with a Suspense boundary:
```
<Suspense fallback={}>

</Suspense>
```
React will display your loading fallback until all the code and data needed by the children has been loaded.

In the example below, the `Albums` component _suspends_ while fetching the list of albums. Until it’s ready to render, React switches the closest Suspense boundary above to show the fallback—your `Loading` component. Then, when the data loads, React hides the `Loading` fallback and renders the `Albums` component with data.
```
import { Suspense } from 'react';
import Albums from './Albums.js';
export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  );
}
function Loading() {
  return <h2>🌀 Loading...</h2>;
}
```
### Note

**Only Suspense-enabled data sources will activate the Suspense component.** They include:

*   Data fetching with Suspense-enabled frameworks like [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) and [Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)
*   Lazy-loading component code with [`lazy`](_reference_react_lazy.md)
*   Reading the value of a cached Promise with [`use`](_reference_react_use.md)

Suspense **does not** detect when data is fetched inside an Effect or event handler.

The exact way you would load data in the `Albums` component above depends on your framework. If you use a Suspense-enabled framework, you’ll find the details in its data fetching documentation.

Suspense-enabled data fetching without the use of an opinionated framework is not yet supported. The requirements for implementing a Suspense-enabled data source are unstable and undocumented. An official API for integrating data sources with Suspense will be released in a future version of React.

* * *

### Revealing content together at once

By default, the whole tree inside Suspense is treated as a single unit. For example, even if _only one_ of these components suspends waiting for some data, _all_ of them together will be replaced by the loading indicator:
```
<Suspense fallback={<Loading />}>

<Biography />

<Panel>

<Albums />

</Panel>

</Suspense>
```
Then, after all of them are ready to be displayed, they will all appear together at once.

In the example below, both `Biography` and `Albums` fetch some data. However, because they are grouped under a single Suspense boundary, these components always “pop in” together at the same time.
```
import { Suspense } from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';
export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Biography artistId={artist.id} />
        <Panel>
          <Albums artistId={artist.id} />
        </Panel>
      </Suspense>
    </>
  );
}
function Loading() {
  return <h2>🌀 Loading...</h2>;
}
```
Components that load data don’t have to be direct children of the Suspense boundary. For example, you can move `Biography` and `Albums` into a new `Details` component. This doesn’t change the behavior. `Biography` and `Albums` share the same closest parent Suspense boundary, so their reveal is coordinated together.
```
<Suspense fallback={<Loading />}>

<Details artistId={artist.id} />

</Suspense>

function Details({ artistId }) {

return (

<>

<Biography artistId={artistId} />

<Panel>

<Albums artistId={artistId} />

</Panel>

</>

);

}
```
* * *

### Revealing nested content as it loads

When a component suspends, the closest parent Suspense component shows the fallback. This lets you nest multiple Suspense components to create a loading sequence. Each Suspense boundary’s fallback will be filled in as the next level of content becomes available. For example, you can give the album list its own fallback:
```
<Suspense fallback={<BigSpinner />}>

<Biography />

<Suspense fallback={<AlbumsGlimmer />}>

<Panel>

<Albums />

</Panel>

</Suspense>

</Suspense>
```
With this change, displaying the `Biography` doesn’t need to “wait” for the `Albums` to load.

The sequence will be:

1.  If `Biography` hasn’t loaded yet, `BigSpinner` is shown in place of the entire content area.
2.  Once `Biography` finishes loading, `BigSpinner` is replaced by the content.
3.  If `Albums` hasn’t loaded yet, `AlbumsGlimmer` is shown in place of `Albums` and its parent `Panel`.
4.  Finally, once `Albums` finishes loading, it replaces `AlbumsGlimmer`.
```
import { Suspense } from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';
export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<BigSpinner />}>
        <Biography artistId={artist.id} />
        <Suspense fallback={<AlbumsGlimmer />}>
          <Panel>
            <Albums artistId={artist.id} />
          </Panel>
        </Suspense>
      </Suspense>
    </>
  );
}
function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
function AlbumsGlimmer() {
  return (

  );
}
```
Suspense boundaries let you coordinate which parts of your UI should always “pop in” together at the same time, and which parts should progressively reveal more content in a sequence of loading states. You can add, move, or delete Suspense boundaries in any place in the tree without affecting the rest of your app’s behavior.

Don’t put a Suspense boundary around every component. Suspense boundaries should not be more granular than the loading sequence that you want the user to experience. If you work with a designer, ask them where the loading states should be placed—it’s likely that they’ve already included them in their design wireframes.

* * *

### Showing stale content while fresh content is loading

In this example, the `SearchResults` component suspends while fetching the search results. Type `"a"`, wait for the results, and then edit it to `"ab"`. The results for `"a"` will get replaced by the loading fallback.
```
import { Suspense, useState } from 'react';
import SearchResults from './SearchResults.js';
export default function App() {
  const [query, setQuery] = useState('');
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={query} />
      </Suspense>
    </>
  );
}
```
A common alternative UI pattern is to _defer_ updating the list and to keep showing the previous results until the new results are ready. The [`useDeferredValue`](_reference_react_useDeferredValue.md) Hook lets you pass a deferred version of the query down:
```
export default function App() {

const [query, setQuery] = useState('');

const deferredQuery = useDeferredValue(query);

return (

<>

<label>

        Search albums:

<input value={query} onChange={e => setQuery(e.target.value)} />

</label>

<Suspense fallback={<h2>Loading...</h2>}>

<SearchResults query={deferredQuery} />

</Suspense>

</>

);

}
```
The `query` will update immediately, so the input will display the new value. However, the `deferredQuery` will keep its previous value until the data has loaded, so `SearchResults` will show the stale results for a bit.

To make it more obvious to the user, you can add a visual indication when the stale result list is displayed:
```
<SearchResults query={deferredQuery} />
```
Enter `"a"` in the example below, wait for the results to load, and then edit the input to `"ab"`. Notice how instead of the Suspense fallback, you now see the dimmed stale result list until the new results have loaded:
```
import { Suspense, useState, useDeferredValue } from 'react';
import SearchResults from './SearchResults.js';
export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>

          <SearchResults query={deferredQuery} />

      </Suspense>
    </>
  );
}
```
### Note

Both deferred values and [Transitions](_reference_react_Suspense.md#preventing-already-revealed-content-from-hiding) let you avoid showing Suspense fallback in favor of inline indicators. Transitions mark the whole update as non-urgent so they are typically used by frameworks and router libraries for navigation. Deferred values, on the other hand, are mostly useful in application code where you want to mark a part of UI as non-urgent and let it “lag behind” the rest of the UI.

* * *

### Preventing already revealed content from hiding

When a component suspends, the closest parent Suspense boundary switches to showing the fallback. This can lead to a jarring user experience if it was already displaying some content. Try pressing this button:
```
import { Suspense, useState } from 'react';
import IndexPage from './IndexPage.js';
import ArtistPage from './ArtistPage.js';
import Layout from './Layout.js';
export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}
function Router() {
  const [page, setPage] = useState('/');
  function navigate(url) {
    setPage(url);
  }
  let content;
  if (page === '/') {
    content = (
      <IndexPage navigate={navigate} />
    );
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  }
  return (
    <Layout>
      {content}
    </Layout>
  );
}
function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
```
When you pressed the button, the `Router` component rendered `ArtistPage` instead of `IndexPage`. A component inside `ArtistPage` suspended, so the closest Suspense boundary started showing the fallback. The closest Suspense boundary was near the root, so the whole site layout got replaced by `BigSpinner`.

To prevent this, you can mark the navigation state update as a _Transition_ with [`startTransition`:](_reference_react_startTransition.md)
```
function Router() {

const [page, setPage] = useState('/');

function navigate(url) {

startTransition(() => {

setPage(url);

});

}

// ...
```
This tells React that the state transition is not urgent, and it’s better to keep showing the previous page instead of hiding any already revealed content. Now clicking the button “waits” for the `Biography` to load:
```
import { Suspense, startTransition, useState } from 'react';
import IndexPage from './IndexPage.js';
import ArtistPage from './ArtistPage.js';
import Layout from './Layout.js';
export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}
function Router() {
  const [page, setPage] = useState('/');
  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }
  let content;
  if (page === '/') {
    content = (
      <IndexPage navigate={navigate} />
    );
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  }
  return (
    <Layout>
      {content}
    </Layout>
  );
}
function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
```
A Transition doesn’t wait for _all_ content to load. It only waits long enough to avoid hiding already revealed content. For example, the website `Layout` was already revealed, so it would be bad to hide it behind a loading spinner. However, the nested `Suspense` boundary around `Albums` is new, so the Transition doesn’t wait for it.

### Note

Suspense-enabled routers are expected to wrap the navigation updates into Transitions by default.

* * *

### Indicating that a Transition is happening

In the above example, once you click the button, there is no visual indication that a navigation is in progress. To add an indicator, you can replace [`startTransition`](_reference_react_startTransition.md) with [`useTransition`](_reference_react_useTransition.md) which gives you a boolean `isPending` value. In the example below, it’s used to change the website header styling while a Transition is happening:
```
import { Suspense, useState, useTransition } from 'react';
import IndexPage from './IndexPage.js';
import ArtistPage from './ArtistPage.js';
import Layout from './Layout.js';
export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}
function Router() {
  const [page, setPage] = useState('/');
  const [isPending, startTransition] = useTransition();
  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }
  let content;
  if (page === '/') {
    content = (
      <IndexPage navigate={navigate} />
    );
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  }
  return (
    <Layout isPending={isPending}>
      {content}
    </Layout>
  );
}
function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
```
* * *

### Resetting Suspense boundaries on navigation

During a Transition, React will avoid hiding already revealed content. However, if you navigate to a route with different parameters, you might want to tell React it is _different_ content. You can express this with a `key`:
```
<ProfilePage key={queryParams.id} />
```
Imagine you’re navigating within a user’s profile page, and something suspends. If that update is wrapped in a Transition, it will not trigger the fallback for already visible content. That’s the expected behavior.

However, now imagine you’re navigating between two different user profiles. In that case, it makes sense to show the fallback. For example, one user’s timeline is _different content_ from another user’s timeline. By specifying a `key`, you ensure that React treats different users’ profiles as different components, and resets the Suspense boundaries during navigation. Suspense-integrated routers should do this automatically.

* * *

### Providing a fallback for server errors and client-only content

If you use one of the [streaming server rendering APIs](_reference_react-dom_server.md) (or a framework that relies on them), React will also use your `<Suspense>` boundaries to handle errors on the server. If a component throws an error on the server, React will not abort the server render. Instead, it will find the closest `<Suspense>` component above it and include its fallback (such as a spinner) into the generated server HTML. The user will see a spinner at first.

On the client, React will attempt to render the same component again. If it errors on the client too, React will throw the error and display the closest [Error Boundary.](_reference_react_Component.md#static-getderivedstatefromerror) However, if it does not error on the client, React will not display the error to the user since the content was eventually displayed successfully.

You can use this to opt out some components from rendering on the server. To do this, throw an error in the server environment and then wrap them in a `<Suspense>` boundary to replace their HTML with fallbacks:
```
<Suspense fallback={<Loading />}>

<Chat />

</Suspense>

function Chat() {

if (typeof window === 'undefined') {

throw Error('Chat should only render on the client.');

}

// ...

}
```
The server HTML will include the loading indicator. It will be replaced by the `Chat` component on the client.

* * *

## Troubleshooting

### How do I prevent the UI from being replaced by a fallback during an update?

Replacing visible UI with a fallback creates a jarring user experience. This can happen when an update causes a component to suspend, and the nearest Suspense boundary is already showing content to the user.

To prevent this from happening, [mark the update as non-urgent using `startTransition`](_reference_react_Suspense.md#preventing-already-revealed-content-from-hiding). During a Transition, React will wait until enough data has loaded to prevent an unwanted fallback from appearing:
```
function handleNextPageClick() {

// If this update suspends, don't hide the already displayed content

startTransition(() => {

setCurrentPage(currentPage + 1);

});

}
```
This will avoid hiding existing content. However, any newly rendered `Suspense` boundaries will still immediately display fallbacks to avoid blocking the UI and let the user see the content as it becomes available.

**React will only prevent unwanted fallbacks during non-urgent updates**. It will not delay a render if it’s the result of an urgent update. You must opt in with an API like [`startTransition`](_reference_react_startTransition.md) or [`useDeferredValue`](_reference_react_useDeferredValue.md).

If your router is integrated with Suspense, it should wrap its updates into [`startTransition`](_reference_react_startTransition.md) automatically.

#### _reference_react_ViewTransition.md

> Source: https://react.dev/reference/react/ViewTransition
> Scraped: 12/20/2025, 10:41:02 PM

### Canary

`<ViewTransition>` lets you animate elements that update inside a Transition.
```
import {ViewTransition} from 'react';

<ViewTransition>

...

</ViewTransition>
```
* [Reference](_reference_react_ViewTransition.md#reference)
    * [`<ViewTransition>`](_reference_react_ViewTransition.md#viewtransition)
    * [View Transition Class](_reference_react_ViewTransition.md#view-transition-class)
    * [Styling View Transitions](_reference_react_ViewTransition.md#styling-view-transitions)
* [Usage](_reference_react_ViewTransition.md#usage)
    * [Animating an element on enter/exit](_reference_react_ViewTransition.md#animating-an-element-on-enter)
    * [Animating a shared element](_reference_react_ViewTransition.md#animating-a-shared-element)
    * [Animating reorder of items in a list](_reference_react_ViewTransition.md#animating-reorder-of-items-in-a-list)
    * [Animating from Suspense content](_reference_react_ViewTransition.md#animating-from-suspense-content)
    * [Opting-out of an animation](_reference_react_ViewTransition.md#opting-out-of-an-animation)
    * [Customizing animations](_reference_react_ViewTransition.md#customizing-animations)
    * [Customizing animations with types](_reference_react_ViewTransition.md#customizing-animations-with-types)
    * [Building View Transition enabled routers](_reference_react_ViewTransition.md#building-view-transition-enabled-routers)
* [Troubleshooting](_reference_react_ViewTransition.md#troubleshooting)
    * [My `<ViewTransition>` is not activating](_reference_react_ViewTransition.md#my-viewtransition-is-not-activating)
    * [I’m getting an error “There are two `<ViewTransition name=%s>` components with the same name mounted at the same time.”](_reference_react_ViewTransition.md#two-viewtransition-with-same-name)

* * *

## Reference

### `<ViewTransition>`

Wrap elements in `<ViewTransition>` to animate them when they update inside a [Transition](_reference_react_useTransition.md). React uses the following heuristics to determine if a View Transition activates for an animation:

*   `enter`: If a `ViewTransition` itself gets inserted in this Transition, then this will activate.
*   `exit`: If a `ViewTransition` itself gets deleted in this Transition, then this will activate.
*   `update`: If a `ViewTransition` has any DOM mutations inside it that React is doing (such as a prop changing) or if the `ViewTransition` boundary itself changes size or position due to an immediate sibling. If there are nested `ViewTransition` then the mutation applies to them and not the parent.
*   `share`: If a named `ViewTransition` is inside a deleted subtree and another named `ViewTransition` with the same name is part of an inserted subtree in the same Transition, they form a Shared Element Transition, and it animates from the deleted one to the inserted one.

By default, `<ViewTransition>` animates with a smooth cross-fade (the browser default view transition). You can customize the animation by providing a [View Transition Class](_reference_react_ViewTransition.md#view-transition-class) to the `<ViewTransition>` component. You can customize animations for each kind of trigger (see [Styling View Transitions](_reference_react_ViewTransition.md#styling-view-transitions)).

##### Deep Dive

#### How does `<ViewTransition>` work?

Under the hood, React applies `view-transition-name` to inline styles of the nearest DOM node nested inside the `<ViewTransition>` component. If there are multiple sibling DOM nodes like `<ViewTransition></ViewTransition>` then React adds a suffix to the name to make each unique but conceptually they’re part of the same one. React doesn’t apply these eagerly but only at the time that boundary should participate in an animation.

React automatically calls `startViewTransition` itself behind the scenes so you should never do that yourself. In fact, if you have something else on the page running a ViewTransition React will interrupt it. So it’s recommended that you use React itself to coordinate these. If you had other ways of trigger ViewTransitions in the past, we recommend that you migrate to the built-in way.

If there are other React ViewTransitions already running then React will wait for them to finish before starting the next one. However, importantly if there are multiple updates happening while the first one is running, those will all be batched into one. If you start A->B. Then in the meantime you get an update to go to C and then D. When the first A->B animation finishes the next one will animate from B->D.

The `getSnapshotBeforeUpdate` life-cycle will be called before `startViewTransition` and some `view-transition-name` will update at the same time.

Then React calls `startViewTransition`. Inside the `updateCallback`, React will:

*   Apply its mutations to the DOM and invoke useInsertionEffects.
*   Wait for fonts to load.
*   Call componentDidMount, componentDidUpdate, useLayoutEffect and refs.
*   Wait for any pending Navigation to finish.
*   Then React will measure any changes to the layout to see which boundaries will need to animate.

After the ready Promise of the `startViewTransition` is resolved, React will then revert the `view-transition-name`. Then React will invoke the `onEnter`, `onExit`, `onUpdate` and `onShare` callbacks to allow for manual programmatic control over the Animations. This will be after the built-in default ones have already been computed.

If a `flushSync` happens to get in the middle of this sequence, then React will skip the Transition since it relies on being able to complete synchronously.

After the finished Promise of the `startViewTransition` is resolved, React will then invoke `useEffect`. This prevents those from interfering with the performance of the Animation. However, this is not a guarantee because if another `setState` happens while the Animation is running it’ll still have to invoke the `useEffect` earlier to preserve the sequential guarantees.

#### Props

By default, `<ViewTransition>` animates with a smooth cross-fade. You can customize the animation, or specify a shared element transition, with these props:

*   **optional** `enter`: A string or object. The [View Transition Class](_reference_react_ViewTransition.md#view-transition-class) to apply when enter is activated.
*   **optional** `exit`: A string or object. The [View Transition Class](_reference_react_ViewTransition.md#view-transition-class) to apply when exit is activated.
*   **optional** `update`: A string or object. The [View Transition Class](_reference_react_ViewTransition.md#view-transition-class) to apply when an update is activated.
*   **optional** `share`: A string or object. The [View Transition Class](_reference_react_ViewTransition.md#view-transition-class) to apply when a shared element is activated.
*   **optional** `default`: A string or object. The [View Transition Class](_reference_react_ViewTransition.md#view-transition-class) used when no other matching activation prop is found.
*   **optional** `name`: A string or object. The name of the View Transition used for shared element transitions. If not provided, React will use a unique name for each View Transition to prevent unexpected animations.

#### Callback

These callbacks allow you to adjust the animation imperatively using the [animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) APIs:

*   **optional** `onEnter`: A function. React calls `onEnter` after an “enter” animation.
*   **optional** `onExit`: A function. React calls `onExit` after an “exit” animation.
*   **optional** `onShare`: A function. React calls `onShare` after a “share” animation.
*   **optional** `onUpdate`: A function. React calls `onUpdate` after an “update” animation.

Each callback receives as arguments:

*   `element`: The DOM element that was animated.
*   `types`: The [Transition Types](_reference_react_addTransitionType.md) included in the animation.

### View Transition Class

The View Transition Class is the CSS class name(s) applied by React during the transition when the ViewTransition activates. It can be a string or an object.

*   `string`: the `class` added on the child elements when activated. If `'none'` is provided, no class will be added.
*   `object`: the class added on the child elements will be the key matching View Transition type added with `addTransitionType`. The object can also specify a `default` to use if no matching type is found.

The value `'none'` can be used to prevent a View Transition from activating for a specific trigger.

### Styling View Transitions

### Note

In many early examples of View Transitions around the web, you’ll have seen using a [`view-transition-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name) and then style it using `::view-transition-...(my-name)` selectors. We don’t recommend that for styling. Instead, we normally recommend using a View Transition Class instead.

To customize the animation for a `<ViewTransition>` you can provide a View Transition Class to one of the activation props. The View Transition Class is a CSS class name that React applies to the child elements when the ViewTransition activates.

For example, to customize an “enter” animation, provide a class name to the `enter` prop:
```
<ViewTransition enter="slide-in">
```
When the `<ViewTransition>` activates an “enter” animation, React will add the class name `slide-in`. Then you can refer to this class using [view transition pseudo selectors](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API#pseudo-elements) to build reusable animations:
```
::view-transition-group(.slide-in) {

}

::view-transition-old(.slide-in) {

}

::view-transition-new(.slide-in) {

}
```
In the future, CSS libraries may add built-in animations using View Transition Classes to make this easier to use.

#### Caveats

*   By default, `setState` updates immediately and does not activate `<ViewTransition>`, only updates wrapped in a [Transition](_reference_react_useTransition.md). You can also use [`<Suspense>`](_reference_react_Suspense.md) to opt-in to a Transition to [reveal content](_reference_react_Suspense.md#revealing-content-together-at-once).
*   `<ViewTransition>` creates an image that can be moved around, scaled and cross-faded. Unlike Layout Animations you may have seen in React Native or Motion, this means that not every individual Element inside of it animates its position. This can lead to better performance and a more continuous feeling, smooth animation compared to animating every individual piece. However, it can also lose continuity in things that should be moving by themselves. So you might have to add more `<ViewTransition>` boundaries manually as a result.
*   Many users may prefer not having animations on the page. React doesn’t automatically disable animations for this case. We recommend that using the `@media (prefers-reduced-motion)` media query to disable animations or tone them down based on user preference. In the future, CSS libraries may have this built-in to their presets.
*   Currently, `<ViewTransition>` only works in the DOM. We’re working on adding support for React Native and other platforms.

* * *

## Usage

### Animating an element on enter/exit

Enter/Exit Transitions trigger when a `<ViewTransition>` is added or removed by a component in a transition:
```
function Child() {

return (

<ViewTransition>

Hi

</ViewTransition>

);

}

function Parent() {

const [show, setShow] = useState();

if (show) {

return <Child />;

}

return null;

}
```
When `setShow` is called, `show` switches to `true` and the `Child` component is rendered. When `setShow` is called inside `startTransition`, and `Child` renders a `ViewTransition` before any other DOM nodes, an `enter` animation is triggered.

When `show` switches back to `false`, an `exit` animation is triggered.
```
import {
  ViewTransition,
  useState,
  startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"
function Item() {
  return (
    <ViewTransition>
      <Video video={videos[0]}/>
    </ViewTransition>
  );
}
export default function Component() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            setShowItem((prev) => !prev);
          });
        }}
      >{showItem ? '➖' : '➕'}</button>
      {showItem ? <Item /> : null}
    </>
  );
}
```
### Pitfall

`<ViewTransition>` only activates if it is placed before any DOM node. If `Child` instead looked like this, no animation would trigger:
```
function Component() {

return <ViewTransition>Hi</ViewTransition>;

}
```
* * *

### Animating a shared element

Normally, we don’t recommend assigning a name to a `<ViewTransition>` and instead let React assign it an automatic name. The reason you might want to assign a name is to animate between completely different components when one tree unmounts and another tree mounts at the same time. To preserve continuity.
```
<ViewTransition name={UNIQUE_NAME}>

<Child />

</ViewTransition>
```
When one tree unmounts and another mounts, if there’s a pair where the same name exists in the unmounting tree and the mounting tree, they trigger the “share” animation on both. It animates from the unmounting side to the mounting side.

Unlike an exit/enter animation this can be deeply inside the deleted/mounted tree. If a `<ViewTransition>` would also be eligible for exit/enter, then the “share” animation takes precedence.

If Transition first unmounts one side and then leads to a `<Suspense>` fallback being shown before eventually the new name being mounted, then no shared element transition happens.
```
import {
  ViewTransition,
  useState,
  startTransition
} from "react";
import {Video, Thumbnail, FullscreenVideo} from "./Video";
import videos from "./data";
export default function Component() {
  const [fullscreen, setFullscreen] = useState(false);
  if (fullscreen) {
    return <FullscreenVideo
      video={videos[0]}
      onExit={() => startTransition(() => setFullscreen(false))}
    />
  }
  return <Video
    video={videos[0]}
    onClick={() => startTransition(() => setFullscreen(true))}
  />
}
```
### Note

If either the mounted or unmounted side of a pair is outside the viewport, then no pair is formed. This ensures that it doesn’t fly in or out of the viewport when something is scrolled. Instead it’s treated as a regular enter/exit by itself.

This does not happen if the same Component instance changes position, which triggers an “update”. Those animate regardless if one position is outside the viewport.

There’s currently a quirk where if a deeply nested unmounted `<ViewTransition>` is inside the viewport but the mounted side is not within the viewport, then the unmounted side animates as its own “exit” animation even if it’s deeply nested instead of as part of the parent animation.

### Pitfall

It’s important that there’s only one thing with the same name mounted at a time in the entire app. Therefore it’s important to use unique namespaces for the name to avoid conflicts. To ensure you can do this you might want to add a constant in a separate module that you import.
```
export const MY_NAME = "my-globally-unique-name";

import {MY_NAME} from './shared-name';

...

<ViewTransition name={MY_NAME}>
```
* * *

### Animating reorder of items in a list
```
items.map(item => <Component key={item.id} item={item} />)
```
When reordering a list, without updating the content, the “update” animation triggers on each `<ViewTransition>` in the list if they’re outside a DOM node. Similar to enter/exit animations.

This means that this will trigger the animation on this `<ViewTransition>`:
```
function Component() {

return <ViewTransition>...</ViewTransition>;

}
```
```
import {
  ViewTransition,
  useState,
  startTransition
} from "react";
import {Video} from "./Video";
import videos from "./data";
export default function Component() {
  const [orderedVideos, setOrderedVideos] = useState(videos);
  const reorder = () => {
    startTransition(() => {
      setOrderedVideos((prev) => {
        return [...prev.sort(() => Math.random() - 0.5)];
      });
    });
  };
  return (
    <>
      <button onClick={reorder}>🎲</button>

        {orderedVideos.map((video, i) => {
          return (
            <ViewTransition key={video.title}>
              <Video video={video} />
            </ViewTransition>
          );
        })}

    </>
  );
}
```
However, this wouldn’t animate each individual item:
```
function Component() {

return <ViewTransition>...</ViewTransition>;

}
```
Instead, any parent `<ViewTransition>` would cross-fade. If there is no parent `<ViewTransition>` then there’s no animation in that case.
```
import {
  ViewTransition,
  useState,
  startTransition
} from "react";
import {Video} from "./Video";
import videos from "./data";
export default function Component() {
  const [orderedVideos, setOrderedVideos] = useState(videos);
  const reorder = () => {
    startTransition(() => {
      setOrderedVideos((prev) => {
        return [...prev.sort(() => Math.random() - 0.5)];
      });
    });
  };
  return (
    <>
      <button onClick={reorder}>🎲</button>
      <ViewTransition>

          {orderedVideos.map((video, i) => {
            return <Video video={video} key={video.title} />;
          })}

      </ViewTransition>
    </>
  );
}
```
This means you might want to avoid wrapper elements in lists where you want to allow the Component to control its own reorder animation:
```
items.map(item => <Component key={item.id} item={item} />)
```
The above rule also applies if one of the items updates to resize, which then causes the siblings to resize, it’ll also animate its sibling `<ViewTransition>` but only if they’re immediate siblings.

This means that during an update, which causes a lot of re-layout, it doesn’t individually animate every `<ViewTransition>` on the page. That would lead to a lot of noisy animations which distracts from the actual change. Therefore React is more conservative about when an individual animation triggers.

### Pitfall

It’s important to properly use keys to preserve identity when reordering lists. It might seem like you could use “name”, shared element transitions, to animate reorders but that would not trigger if one side was outside the viewport. To animate a reorder you often want to show that it went to a position outside the viewport.

* * *

### Animating from Suspense content

Just like any Transition, React waits for data and new CSS (`<link rel="stylesheet" precedence="...">`) before running the animation. In addition to this, ViewTransitions also wait up to 500ms for new fonts to load before starting the animation to avoid them flickering in later. For the same reason, an image wrapped in ViewTransition will wait for the image to load.

If it’s inside a new Suspense boundary instance, then the fallback is shown first. After the Suspense boundary fully loads, it triggers the `<ViewTransition>` to animate the reveal to the content.

Currently, this only happens for client-side Transition. In the future, this will also animate Suspense boundary for streaming SSR when content from the server suspends during the initial load.

There are two ways to animate Suspense boundaries depending on where you place the `<ViewTransition>`:

Update:
```
<ViewTransition>

<Suspense fallback={<A />}>

<B />

</Suspense>

</ViewTransition>
```
In this scenario when the content goes from A to B, it’ll be treated as an “update” and apply that class if appropriate. Both A and B will get the same view-transition-name and therefore they’re acting as a cross-fade by default.
```
import {
  ViewTransition,
  useState,
  startTransition,
  Suspense
} from 'react';
import {Video, VideoPlaceholder} from "./Video";
import {useLazyVideoData} from "./data"
function LazyVideo() {
  const video = useLazyVideoData();
  return (
    <Video video={video}/>
  );
}
export default function Component() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            setShowItem((prev) => !prev);
          });
        }}
      >{showItem ? '➖' : '➕'}</button>
      {showItem ? (
        <ViewTransition>
          <Suspense fallback={<VideoPlaceholder />}>
            <LazyVideo />
          </Suspense>
        </ViewTransition>
      ) : null}
    </>
  );
}
```
Enter/Exit:
```
<Suspense fallback={<ViewTransition><A /></ViewTransition>}>

<ViewTransition><B /></ViewTransition>

</Suspense>
```
In this scenario, these are two separate ViewTransition instances each with their own `view-transition-name`. This will be treated as an “exit” of the `<A>` and an “enter” of the `<B>`.

You can achieve different effects depending on where you choose to place the `<ViewTransition>` boundary.

* * *

### Opting-out of an animation

Sometimes you’re wrapping a large existing component, like a whole page, and you want to animate some updates, such as changing the theme. However, you don’t want it to opt-in all updates inside the whole page to cross-fade when they’re updating. Especially if you’re incrementally adding more animations.

You can use the class “none” to opt-out of an animation. By wrapping your children in a “none” you can disable animations for updates to them while the parent still triggers.
```
<ViewTransition>

<ViewTransition update="none">

{children}

</ViewTransition>

</ViewTransition>
```
This will only animate if the theme changes and not if only the children update. The children can still opt-in again with their own `<ViewTransition>` but at least it’s manual again.

* * *

### Customizing animations

By default, `<ViewTransition>` includes the default cross-fade from the browser.

To customize animations, you can provide props to the `<ViewTransition>` component to specify which animations to use, based on how the `<ViewTransition>` activates.

For example, we can slow down the default cross fade animation:
```
<ViewTransition default="slow-fade">

<Video />

</ViewTransition>
```
And define slow-fade in CSS using view transition classes:
```
::view-transition-old(.slow-fade) {

animation-duration: 500ms;

}

::view-transition-new(.slow-fade) {

animation-duration: 500ms;

}
```
```
import {
  ViewTransition,
  useState,
  startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"
function Item() {
  return (
    <ViewTransition default="slow-fade">
      <Video video={videos[0]}/>
    </ViewTransition>
  );
}
export default function Component() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            setShowItem((prev) => !prev);
          });
        }}
      >{showItem ? '➖' : '➕'}</button>
      {showItem ? <Item /> : null}
    </>
  );
}
```
In addition to setting the `default`, you can also provide configurations for `enter`, `exit`, `update`, and `share` animations.
```
import {
  ViewTransition,
  useState,
  startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"
function Item() {
  return (
    <ViewTransition enter="slide-in" exit="slide-out">
      <Video video={videos[0]}/>
    </ViewTransition>
  );
}
export default function Component() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            setShowItem((prev) => !prev);
          });
        }}
      >{showItem ? '➖' : '➕'}</button>
      {showItem ? <Item /> : null}
    </>
  );
}
```
### Customizing animations with types

You can use the [`addTransitionType`](_reference_react_addTransitionType.md) API to add a class name to the child elements when a specific transition type is activated for a specific activation trigger. This allows you to customize the animation for each type of transition.

For example, to customize the animation for all forward and backward navigations:
```
<ViewTransition default={{

'navigation-back': 'slide-right',

'navigation-forward': 'slide-left',

}}>

...

</ViewTransition>

// in your router:

startTransition(() => {

addTransitionType('navigation-' + navigationType);

});
```
When the ViewTransition activates a “navigation-back” animation, React will add the class name “slide-right”. When the ViewTransition activates a “navigation-forward” animation, React will add the class name “slide-left”.

In the future, routers and other libraries may add support for standard view-transition types and styles.
```
import {
  ViewTransition,
  addTransitionType,
  useState,
  startTransition,
} from "react";
import {Video} from "./Video";
import videos from "./data"
function Item() {
  return (
    <ViewTransition enter={
        {
          "add-video-back": "slide-in-back",
          "add-video-forward": "slide-in-forward"
        }
      }
      exit={
        {
          "remove-video-back": "slide-in-forward",
          "remove-video-forward": "slide-in-back"
        }
      }>
      <Video video={videos[0]}/>
    </ViewTransition>
  );
}
export default function Component() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>

        <button
          onClick={() => {
            startTransition(() => {
              if (showItem) {
                addTransitionType("remove-video-back")
              } else {
                addTransitionType("add-video-back")
              }
              setShowItem((prev) => !prev);
            });
          }}
        >⬅️</button>
        <button
          onClick={() => {
            startTransition(() => {
              if (showItem) {
                addTransitionType("remove-video-forward")
              } else {
                addTransitionType("add-video-forward")
              }
              setShowItem((prev) => !prev);
            });
          }}
        >➡️</button>

      {showItem ? <Item /> : null}
    </>
  );
}
```
### Building View Transition enabled routers

React waits for any pending Navigation to finish to ensure that scroll restoration happens within the animation. If the Navigation is blocked on React, your router must unblock in `useLayoutEffect` since `useEffect` would lead to a deadlock.

If a `startTransition` is started from the legacy popstate event, such as during a “back”-navigation then it must finish synchronously to ensure scroll and form restoration works correctly. This is in conflict with running a View Transition animation. Therefore, React will skip animations from popstate. Therefore animations won’t run for the back button. You can fix this by upgrading your router to use the Navigation API.

* * *

## Troubleshooting

### My `<ViewTransition>` is not activating

`<ViewTransition>` only activates if it is placed before any DOM node:
```
function Component() {

return (

<ViewTransition>Hi</ViewTransition>

);

}
```
To fix, ensure that the `<ViewTransition>` comes before any other DOM nodes:
```
function Component() {

return (

<ViewTransition>

Hi

</ViewTransition>

);

}
```
### I’m getting an error “There are two `<ViewTransition name=%s>` components with the same name mounted at the same time.”

This error occurs when two `<ViewTransition>` components with the same `name` are mounted at the same time:
```
function Item() {

// 🚩 All items will get the same "name".

return <ViewTransition name="item">...</ViewTransition>;

}

function ItemList({items}) {

return (

<>

{item.map(item => <Item key={item.id} />)}

</>

);

}
```
This will cause the View Transition to error. In development, React detects this issue to surface it and logs two errors:

There are two `<ViewTransition name=%s>` components with the same name mounted at the same time. This is not supported and will cause View Transitions to error. Try to use a more unique name e.g. by using a namespace prefix and adding the id of an item to the name.

at Item

at ItemList

The existing `<ViewTransition name=%s>` duplicate has this stack trace.

at Item

at ItemList

To fix, ensure that there’s only one `<ViewTransition>` with the same name mounted at a time in the entire app by ensuring the `name` is unique, or adding an `id` to the name:
```
function Item({id}) {

// ✅ All items will get the same "name".

return <ViewTransition name={`item-${id}`}>...</ViewTransition>;

}

function ItemList({items}) {

return (

<>

{item.map(item => <Item key={item.id} item={item} />)}

</>

);

}
```

#### _reference_react_act.md

> Source: https://react.dev/reference/react/act
> Scraped: 12/20/2025, 10:41:00 PM

`act` is a test helper to apply pending React updates before making assertions.

To prepare a component for assertions, wrap the code rendering it and performing updates inside an `await act()` call. This makes your test run closer to how React works in the browser.

### Note

You might find using `act()` directly a bit too verbose. To avoid some of the boilerplate, you could use a library like [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), whose helpers are wrapped with `act()`.

* [Reference](_reference_react_act.md#reference)
    * [`await act(async actFn)`](_reference_react_act.md#await-act-async-actfn)
* [Usage](_reference_react_act.md#usage)
    * [Rendering components in tests](_reference_react_act.md#rendering-components-in-tests)
    * [Dispatching events in tests](_reference_react_act.md#dispatching-events-in-tests)
* [Troubleshooting](_reference_react_act.md#troubleshooting)
    * [I’m getting an error: “The current testing environment is not configured to support act(…)”](_reference_react_act.md#error-the-current-testing-environment-is-not-configured-to-support-act)

* * *

## Reference

### `await act(async actFn)`

When writing UI tests, tasks like rendering, user events, or data fetching can be considered as “units” of interaction with a user interface. React provides a helper called `act()` that makes sure all updates related to these “units” have been processed and applied to the DOM before you make any assertions.

The name `act` comes from the [Arrange-Act-Assert](https://wiki.c2.com/?ArrangeActAssert) pattern.
```
it ('renders with button disabled', async () => {

await act(async () => {

root.render(<TestComponent />)

});

expect(container.querySelector('button')).toBeDisabled();

});
```
### Note

We recommend using `act` with `await` and an `async` function. Although the sync version works in many cases, it doesn’t work in all cases and due to the way React schedules updates internally, it’s difficult to predict when you can use the sync version.

We will deprecate and remove the sync version in the future.

#### Parameters

*   `async actFn`: An async function wrapping renders or interactions for components being tested. Any updates triggered within the `actFn`, are added to an internal act queue, which are then flushed together to process and apply any changes to the DOM. Since it is async, React will also run any code that crosses an async boundary, and flush any updates scheduled.

#### Returns

`act` does not return anything.

## Usage

When testing a component, you can use `act` to make assertions about its output.

For example, let’s say we have this `Counter` component, the usage examples below show how to test it:
```
function Counter() {

const [count, setCount] = useState(0);

const handleClick = () => {

setCount(prev => prev + 1);

}

useEffect(() => {

document.title = `You clicked ${count} times`;

}, [count]);

return (

<p>You clicked {count} times</p>

<button onClick={handleClick}>

        Click me

</button>

)

}
```
### Rendering components in tests

To test the render output of a component, wrap the render inside `act()`:
```
import {act} from 'react';

import ReactDOMClient from 'react-dom/client';

import Counter from './Counter';

it('can render and update a counter', async () => {

container = document.createElement('div');

document.body.appendChild(container);

// ✅ Render the component inside act().

await act(() => {

ReactDOMClient.createRoot(container).render(<Counter />);

});

const button = container.querySelector('button');

const label = container.querySelector('p');

expect(label.textContent).toBe('You clicked 0 times');

expect(document.title).toBe('You clicked 0 times');

});
```
Here, we create a container, append it to the document, and render the `Counter` component inside `act()`. This ensures that the component is rendered and its effects are applied before making assertions.

Using `act` ensures that all updates have been applied before we make assertions.

### Dispatching events in tests

To test events, wrap the event dispatch inside `act()`:
```
import {act} from 'react';

import ReactDOMClient from 'react-dom/client';

import Counter from './Counter';

it.only('can render and update a counter', async () => {

const container = document.createElement('div');

document.body.appendChild(container);

await act( async () => {

ReactDOMClient.createRoot(container).render(<Counter />);

});

// ✅ Dispatch the event inside act().

await act(async () => {

button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

});

const button = container.querySelector('button');

const label = container.querySelector('p');

expect(label.textContent).toBe('You clicked 1 times');

expect(document.title).toBe('You clicked 1 times');

});
```
Here, we render the component with `act`, and then dispatch the event inside another `act()`. This ensures that all updates from the event are applied before making assertions.

### Pitfall

Don’t forget that dispatching DOM events only works when the DOM container is added to the document. You can use a library like [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) to reduce the boilerplate code.

## Troubleshooting

### I’m getting an error: “The current testing environment is not configured to support act(…)”

Using `act` requires setting `global.IS_REACT_ACT_ENVIRONMENT=true` in your test environment. This is to ensure that `act` is only used in the correct environment.

If you don’t set the global, you will see an error like this:

Warning: The current testing environment is not configured to support act(…)

To fix, add this to your global setup file for React tests:
```
global.IS_REACT_ACT_ENVIRONMENT=true
```
### Note

#### _reference_react_addTransitionType.md

> Source: https://react.dev/reference/react/addTransitionType
> Scraped: 12/20/2025, 10:41:01 PM

### Canary

`addTransitionType` lets you specify the cause of a transition.
```
startTransition(() => {

addTransitionType('my-transition-type');

setState(newState);

});
```
* [Reference](_reference_react_addTransitionType.md#reference)
    * [`addTransitionType`](_reference_react_addTransitionType.md#addtransitiontype)
* [Usage](_reference_react_addTransitionType.md#usage)
    * [Adding the cause of a transition](_reference_react_addTransitionType.md#adding-the-cause-of-a-transition)
    * [Customize animations using browser view transition types](_reference_react_addTransitionType.md#customize-animations-using-browser-view-transition-types)
    * [Customize animations using `View Transition` Class](_reference_react_addTransitionType.md#customize-animations-using-view-transition-class)
    * [Customize animations using `ViewTransition` events](_reference_react_addTransitionType.md#customize-animations-using-viewtransition-events)

* * *

## Reference

### `addTransitionType`

#### Parameters

*   `type`: The type of transition to add. This can be any string.

#### Returns

`addTransitionType` does not return anything.

#### Caveats

*   If multiple transitions are combined, all Transition Types are collected. You can also add more than one type to a Transition.
*   Transition Types are reset after each commit. This means a `<Suspense>` fallback will associate the types after a `startTransition`, but revealing the content does not.

* * *

## Usage

### Adding the cause of a transition

Call `addTransitionType` inside of `startTransition` to indicate the cause of a transition:
```
import { startTransition, addTransitionType } from 'react';

function Submit({action) {

function handleClick() {

startTransition(() => {

addTransitionType('submit-click');

action();

});

}

return <button onClick={handleClick}>Click me</button>;

}
```
When you call addTransitionType inside the scope of startTransition, React will associate submit-click as one of the causes for the Transition.

Currently, Transition Types can be used to customize different animations based on what caused the Transition. You have three different ways to choose from for how to use them:

* [Customize animations using browser view transition types](_reference_react_addTransitionType.md#customize-animations-using-browser-view-transition-types)
* [Customize animations using `View Transition` Class](_reference_react_addTransitionType.md#customize-animations-using-view-transition-class)
* [Customize animations using `ViewTransition` events](_reference_react_addTransitionType.md#customize-animations-using-viewtransition-events)

In the future, we plan to support more use cases for using the cause of a transition.

* * *

### Customize animations using browser view transition types

When a [`ViewTransition`](_reference_react_ViewTransition.md) activates from a transition, React adds all the Transition Types as browser [view transition types](https://www.w3.org/TR/css-view-transitions-2/#active-view-transition-pseudo-examples) to the element.

This allows you to customize different animations based on CSS scopes:
```
function Component() {

return (

<ViewTransition>

Hello

</ViewTransition>

);

}

startTransition(() => {

addTransitionType('my-transition-type');

setShow(true);

});
```
```
:root:active-view-transition-type(my-transition-type) {

&::view-transition-...(...) {

    ...

}

}
```
* * *

### Customize animations using `View Transition` Class

You can customize animations for an activated `ViewTransition` based on type by passing an object to the View Transition Class:
```
function Component() {

return (

<ViewTransition enter={{

'my-transition-type': 'my-transition-class',

}}>

Hello

</ViewTransition>

);

}

// ...

startTransition(() => {

addTransitionType('my-transition-type');

setState(newState);

});
```
If multiple types match, then they’re joined together. If no types match then the special “default” entry is used instead. If any type has the value “none” then that wins and the ViewTransition is disabled (not assigned a name).

These can be combined with enter/exit/update/layout/share props to match based on kind of trigger and Transition Type.
```
<ViewTransition enter={{

'navigation-back': 'enter-right',

'navigation-forward': 'enter-left',

}}

exit={{

'navigation-back': 'exit-right',

'navigation-forward': 'exit-left',

}}>
```
* * *

### Customize animations using `ViewTransition` events

You can imperatively customize animations for an activated `ViewTransition` based on type using View Transition events:
```
<ViewTransition onUpdate={(inst, types) => {

if (types.includes('navigation-back')) {

...

} else if (types.includes('navigation-forward')) {

...

} else {

...

}

}}>
```
This allows you to pick different imperative Animations based on the cause.

#### _reference_react_apis.md

> Source: https://react.dev/reference/react/apis
> Scraped: 12/20/2025, 10:41:00 PM

In addition to [Hooks](_reference_react_hooks.md) and [Components](_reference_react_components.md), the `react` package exports a few other APIs that are useful for defining components. This page lists all the remaining modern React APIs.

* * * [`createContext`](_reference_react_createContext.md) lets you define and provide context to the child components. Used with [`useContext`.](_reference_react_useContext.md)
* [`lazy`](_reference_react_lazy.md) lets you defer loading a component’s code until it’s rendered for the first time.
* [`memo`](_reference_react_memo.md) lets your component skip re-renders with same props. Used with [`useMemo`](_reference_react_useMemo.md) and [`useCallback`.](_reference_react_useCallback.md)
* [`startTransition`](_reference_react_startTransition.md) lets you mark a state update as non-urgent. Similar to [`useTransition`.](_reference_react_useTransition.md)
* [`act`](_reference_react_act.md) lets you wrap renders and interactions in tests to ensure updates have processed before making assertions.

* * *

## Resource APIs

_Resources_ can be accessed by a component without having them as part of their state. For example, a component can read a message from a Promise or read styling information from a context.

To read a value from a resource, use this API:

* [`use`](_reference_react_use.md) lets you read the value of a resource like a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [context](_learn_passing-data-deeply-with-context.md).
```
function MessageComponent({ messagePromise }) {

const message = use(messagePromise);

const theme = use(ThemeContext);

// ...

}
```

#### _reference_react_cache.md

> Source: https://react.dev/reference/react/cache
> Scraped: 12/20/2025, 10:41:00 PM

### React Server Components

`cache` lets you cache the result of a data fetch or computation.
```
const cachedFn = cache(fn);
```
* [Reference](_reference_react_cache.md#reference)
    * [`cache(fn)`](_reference_react_cache.md#cache)
* [Usage](_reference_react_cache.md#usage)
    * [Cache an expensive computation](_reference_react_cache.md#cache-expensive-computation)
    * [Share a snapshot of data](_reference_react_cache.md#take-and-share-snapshot-of-data)
    * [Preload data](_reference_react_cache.md#preload-data)
* [Troubleshooting](_reference_react_cache.md#troubleshooting)
    * [My memoized function still runs even though I’ve called it with the same arguments](_reference_react_cache.md#memoized-function-still-runs)

* * *

## Reference

### `cache(fn)`

Call `cache` outside of any components to create a version of the function with caching.
```
import {cache} from 'react';

import calculateMetrics from 'lib/metrics';

const getMetrics = cache(calculateMetrics);

function Chart({data}) {

const report = getMetrics(data);

// ...

}
```
When `getMetrics` is first called with `data`, `getMetrics` will call `calculateMetrics(data)` and store the result in cache. If `getMetrics` is called again with the same `data`, it will return the cached result instead of calling `calculateMetrics(data)` again.

[See more examples below.](_reference_react_cache.md#usage)

#### Parameters

*   `fn`: The function you want to cache results for. `fn` can take any arguments and return any value.

#### Returns

`cache` returns a cached version of `fn` with the same type signature. It does not call `fn` in the process.

When calling `cachedFn` with given arguments, it first checks if a cached result exists in the cache. If a cached result exists, it returns the result. If not, it calls `fn` with the arguments, stores the result in the cache, and returns the result. The only time `fn` is called is when there is a cache miss.

### Note

The optimization of caching return values based on inputs is known as [_memoization_](https://en.wikipedia.org/wiki/Memoization). We refer to the function returned from `cache` as a memoized function.

#### Caveats

*   React will invalidate the cache for all memoized functions for each server request.
*   Each call to `cache` creates a new function. This means that calling `cache` with the same function multiple times will return different memoized functions that do not share the same cache.
*   `cachedFn` will also cache errors. If `fn` throws an error for certain arguments, it will be cached, and the same error is re-thrown when `cachedFn` is called with those same arguments.
*   `cache` is for use in [Server Components](_reference_rsc_server-components.md) only.

* * *

## Usage

### Cache an expensive computation

Use `cache` to skip duplicate work.
```
import {cache} from 'react';

import calculateUserMetrics from 'lib/user';

const getUserMetrics = cache(calculateUserMetrics);

function Profile({user}) {

const metrics = getUserMetrics(user);

// ...

}

function TeamReport({users}) {

for (let user in users) {

const metrics = getUserMetrics(user);

// ...

}

// ...

}
```
If the same `user` object is rendered in both `Profile` and `TeamReport`, the two components can share work and only call `calculateUserMetrics` once for that `user`.

Assume `Profile` is rendered first. It will call `getUserMetrics`, and check if there is a cached result. Since it is the first time `getUserMetrics` is called with that `user`, there will be a cache miss. `getUserMetrics` will then call `calculateUserMetrics` with that `user` and write the result to cache.

When `TeamReport` renders its list of `users` and reaches the same `user` object, it will call `getUserMetrics` and read the result from cache.

If `calculateUserMetrics` can be aborted by passing an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal), you can use [`cacheSignal()`](_reference_react_cacheSignal.md) to cancel the expensive computation if React has finished rendering. `calculateUserMetrics` may already handle cancellation internally by using `cacheSignal` directly.

### Pitfall

##### Calling different memoized functions will read from different caches.

To access the same cache, components must call the same memoized function.
```
// Temperature.js

import {cache} from 'react';

import {calculateWeekReport} from './report';

export function Temperature({cityData}) {

// 🚩 Wrong: Calling `cache` in component creates new `getWeekReport` for each render

const getWeekReport = cache(calculateWeekReport);

const report = getWeekReport(cityData);

// ...

}
```
```
// Precipitation.js

import {cache} from 'react';

import {calculateWeekReport} from './report';

// 🚩 Wrong: `getWeekReport` is only accessible for `Precipitation` component.

const getWeekReport = cache(calculateWeekReport);

export function Precipitation({cityData}) {

const report = getWeekReport(cityData);

// ...

}
```
In the above example, `Precipitation` and `Temperature` each call `cache` to create a new memoized function with their own cache look-up. If both components render for the same `cityData`, they will do duplicate work to call `calculateWeekReport`.

In addition, `Temperature` creates a new memoized function each time the component is rendered which doesn’t allow for any cache sharing.

To maximize cache hits and reduce work, the two components should call the same memoized function to access the same cache. Instead, define the memoized function in a dedicated module that can be [`import`\-ed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) across components.
```
// getWeekReport.js

import {cache} from 'react';

import {calculateWeekReport} from './report';

export default cache(calculateWeekReport);
```
```
// Temperature.js

import getWeekReport from './getWeekReport';

export default function Temperature({cityData}) {

const report = getWeekReport(cityData);

// ...

}
```
```
// Precipitation.js

import getWeekReport from './getWeekReport';

export default function Precipitation({cityData}) {

const report = getWeekReport(cityData);

// ...

}
```
Here, both components call the same memoized function exported from `./getWeekReport.js` to read and write to the same cache.

To share a snapshot of data between components, call `cache` with a data-fetching function like `fetch`. When multiple components make the same data fetch, only one request is made and the data returned is cached and shared across components. All components refer to the same snapshot of data across the server render.
```
import {cache} from 'react';

import {fetchTemperature} from './api.js';

const getTemperature = cache(async (city) => {

return await fetchTemperature(city);

});

async function AnimatedWeatherCard({city}) {

const temperature = await getTemperature(city);

// ...

}

async function MinimalWeatherCard({city}) {

const temperature = await getTemperature(city);

// ...

}
```
If `AnimatedWeatherCard` and `MinimalWeatherCard` both render for the same city, they will receive the same snapshot of data from the memoized function.

If `AnimatedWeatherCard` and `MinimalWeatherCard` supply different city arguments to `getTemperature`, then `fetchTemperature` will be called twice and each call site will receive different data.

The city acts as a cache key.

### Note

Asynchronous rendering is only supported for Server Components.
```
async function AnimatedWeatherCard({city}) {

const temperature = await getTemperature(city);

// ...

}
```
To render components that use asynchronous data in Client Components, see [`use()` documentation](_reference_react_use.md).

### Preload data

By caching a long-running data fetch, you can kick off asynchronous work prior to rendering the component.
```
const getUser = cache(async (id) => {

return await db.user.query(id);

});

async function Profile({id}) {

const user = await getUser(id);

return (

<section>

<img src={user.profilePic} />

<h2>{user.name}</h2>

</section>

);

}

function Page({id}) {

// ✅ Good: start fetching the user data

getUser(id);

// ... some computational work

return (

<>

<Profile id={id} />

</>

);

}
```
When rendering `Page`, the component calls `getUser` but note that it doesn’t use the returned data. This early `getUser` call kicks off the asynchronous database query that occurs while `Page` is doing other computational work and rendering children.

When rendering `Profile`, we call `getUser` again. If the initial `getUser` call has already returned and cached the user data, when `Profile` asks and waits for this data, it can simply read from the cache without requiring another remote procedure call. If the initial data request hasn’t been completed, preloading data in this pattern reduces delay in data-fetching.

##### Deep Dive

#### Caching asynchronous work

When evaluating an [asynchronous function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), you will receive a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for that work. The promise holds the state of that work (_pending_, _fulfilled_, _failed_) and its eventual settled result.

In this example, the asynchronous function `fetchData` returns a promise that is awaiting the `fetch`.
```
async function fetchData() {

return await fetch(`https://...`);

}

const getData = cache(fetchData);

async function MyComponent() {

getData();

// ... some computational work

await getData();

// ...

}
```
In calling `getData` the first time, the promise returned from `fetchData` is cached. Subsequent look-ups will then return the same promise.

Notice that the first `getData` call does not `await` whereas the second does. [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) is a JavaScript operator that will wait and return the settled result of the promise. The first `getData` call simply initiates the `fetch` to cache the promise for the second `getData` to look-up.

If by the second call the promise is still _pending_, then `await` will pause for the result. The optimization is that while we wait on the `fetch`, React can continue with computational work, thus reducing the wait time for the second call.

If the promise is already settled, either to an error or the _fulfilled_ result, `await` will return that value immediately. In both outcomes, there is a performance benefit.

### Pitfall

##### Calling a memoized function outside of a component will not use the cache.
```
import {cache} from 'react';

const getUser = cache(async (userId) => {

return await db.user.query(userId);

});

// 🚩 Wrong: Calling memoized function outside of component will not memoize.

getUser('demo-id');

async function DemoProfile() {

// ✅ Good: `getUser` will memoize.

const user = await getUser('demo-id');

return <Profile user={user} />;

}
```
React only provides cache access to the memoized function in a component. When calling `getUser` outside of a component, it will still evaluate the function but not read or update the cache.

This is because cache access is provided through a [context](_learn_passing-data-deeply-with-context.md) which is only accessible from a component.

##### Deep Dive

#### When should I use `cache`, [`memo`](_reference_react_memo.md), or [`useMemo`](_reference_react_useMemo.md)?

All mentioned APIs offer memoization but the difference is what they’re intended to memoize, who can access the cache, and when their cache is invalidated.

#### `useMemo`

In general, you should use [`useMemo`](_reference_react_useMemo.md) for caching an expensive computation in a Client Component across renders. As an example, to memoize a transformation of data within a component.
```
'use client';

function WeatherReport({record}) {

const avgTemp = useMemo(() => calculateAvg(record), record);

// ...

}

function App() {

const record = getRecord();

return (

<>

<WeatherReport record={record} />

<WeatherReport record={record} />

</>

);

}
```
In this example, `App` renders two `WeatherReport`s with the same record. Even though both components do the same work, they cannot share work. `useMemo`’s cache is only local to the component.

However, `useMemo` does ensure that if `App` re-renders and the `record` object doesn’t change, each component instance would skip work and use the memoized value of `avgTemp`. `useMemo` will only cache the last computation of `avgTemp` with the given dependencies.

#### `cache`

In general, you should use `cache` in Server Components to memoize work that can be shared across components.
```
const cachedFetchReport = cache(fetchReport);

function WeatherReport({city}) {

const report = cachedFetchReport(city);

// ...

}

function App() {

const city = "Los Angeles";

return (

<>

</>

);

}
```
Re-writing the previous example to use `cache`, in this case the second instance of `WeatherReport` will be able to skip duplicate work and read from the same cache as the first `WeatherReport`. Another difference from the previous example is that `cache` is also recommended for memoizing data fetches, unlike `useMemo` which should only be used for computations.

At this time, `cache` should only be used in Server Components and the cache will be invalidated across server requests.

#### `memo`

You should use [`memo`](_reference_react_memo.md) to prevent a component re-rendering if its props are unchanged.
```
'use client';

function WeatherReport({record}) {

const avgTemp = calculateAvg(record);

// ...

}

const MemoWeatherReport = memo(WeatherReport);

function App() {

const record = getRecord();

return (

<>

<MemoWeatherReport record={record} />

<MemoWeatherReport record={record} />

</>

);

}
```
In this example, both `MemoWeatherReport` components will call `calculateAvg` when first rendered. However, if `App` re-renders, with no changes to `record`, none of the props have changed and `MemoWeatherReport` will not re-render.

Compared to `useMemo`, `memo` memoizes the component render based on props vs. specific computations. Similar to `useMemo`, the memoized component only caches the last render with the last prop values. Once the props change, the cache invalidates and the component re-renders.

* * *

## Troubleshooting

### My memoized function still runs even though I’ve called it with the same arguments

See prior mentioned pitfalls

* [Calling different memoized functions will read from different caches.](_reference_react_cache.md#pitfall-different-memoized-functions)
* [Calling a memoized function outside of a component will not use the cache.](_reference_react_cache.md#pitfall-memoized-call-outside-component)

If none of the above apply, it may be a problem with how React checks if something exists in cache.

If your arguments are not [primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) (ex. objects, functions, arrays), ensure you’re passing the same object reference.

When calling a memoized function, React will look up the input arguments to see if a result is already cached. React will use shallow equality of the arguments to determine if there is a cache hit.
```
import {cache} from 'react';

const calculateNorm = cache((vector) => {

// ...

});

function MapMarker(props) {

// 🚩 Wrong: props is an object that changes every render.

const length = calculateNorm(props);

// ...

}

function App() {

return (

<>

<MapMarker x={10} y={10} z={10} />

<MapMarker x={10} y={10} z={10} />

</>

);

}
```
In this case the two `MapMarker`s look like they’re doing the same work and calling `calculateNorm` with the same value of `{x: 10, y: 10, z:10}`. Even though the objects contain the same values, they are not the same object reference as each component creates its own `props` object.

React will call [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) on the input to verify if there is a cache hit.
```
import {cache} from 'react';

const calculateNorm = cache((x, y, z) => {

// ...

});

function MapMarker(props) {

// ✅ Good: Pass primitives to memoized function

const length = calculateNorm(props.x, props.y, props.z);

// ...

}

function App() {

return (

<>

<MapMarker x={10} y={10} z={10} />

<MapMarker x={10} y={10} z={10} />

</>

);

}
```
One way to address this could be to pass the vector dimensions to `calculateNorm`. This works because the dimensions themselves are primitives.

Another solution may be to pass the vector object itself as a prop to the component. We’ll need to pass the same object to both component instances.
```
import {cache} from 'react';

const calculateNorm = cache((vector) => {

// ...

});

function MapMarker(props) {

// ✅ Good: Pass the same `vector` object

const length = calculateNorm(props.vector);

// ...

}

function App() {

const vector = [10, 10, 10];

return (

<>

<MapMarker vector={vector} />

<MapMarker vector={vector} />

</>

);

}
```

#### _reference_react_cacheSignal.md

> Source: https://react.dev/reference/react/cacheSignal
> Scraped: 12/20/2025, 10:41:00 PM

`cacheSignal` allows you to know when the `cache()` lifetime is over.
```
const signal = cacheSignal();
```
Call `cacheSignal` to get an `AbortSignal`.

When React has finished rendering, the `AbortSignal` will be aborted. This allows you to cancel any in-flight work that is no longer needed. Rendering is considered finished when:

This function does not accept any parameters.

`cacheSignal` returns an `AbortSignal` if called during rendering. Otherwise `cacheSignal()` returns `null`.

Call `cacheSignal` to abort in-flight requests.

If a function throws, it may be due to cancellation (e.g. the Database connection has been closed). You can use the `aborted` property to check if the error was due to cancellation or a real error. You may want to ignore errors that were due to cancellation.

#### _reference_react_captureOwnerStack.md

> Source: https://react.dev/reference/react/captureOwnerStack
> Scraped: 12/20/2025, 10:41:01 PM

`captureOwnerStack` reads the current Owner Stack in development and returns it as a string if available.
```
const stack = captureOwnerStack();
```
* [Reference](_reference_react_captureOwnerStack.md#reference)
    * [`captureOwnerStack()`](_reference_react_captureOwnerStack.md#captureownerstack)
* [Usage](_reference_react_captureOwnerStack.md#usage)
    * [Enhance a custom error overlay](_reference_react_captureOwnerStack.md#enhance-a-custom-error-overlay)
* [Troubleshooting](_reference_react_captureOwnerStack.md#troubleshooting)
    * [The Owner Stack is `null`](_reference_react_captureOwnerStack.md#the-owner-stack-is-null)
    * [`captureOwnerStack` is not available](_reference_react_captureOwnerStack.md#captureownerstack-is-not-available)

* * *

## Reference

### `captureOwnerStack()`

Call `captureOwnerStack` to get the current Owner Stack.
```
import * as React from 'react';

function Component() {

if (process.env.NODE_ENV !== 'production') {

const ownerStack = React.captureOwnerStack();

console.log(ownerStack);

}

}
```
#### Parameters

`captureOwnerStack` does not take any parameters.

#### Returns

`captureOwnerStack` returns `string | null`.

Owner Stacks are available in

*   Component render
*   Effects (e.g. `useEffect`)
*   React’s event handlers (e.g. `<button onClick={...} />`)
*   React error handlers ([React Root options](_reference_react-dom_client_createRoot.md#parameters) `onCaughtError`, `onRecoverableError`, and `onUncaughtError`)

If no Owner Stack is available, `null` is returned (see [Troubleshooting: The Owner Stack is `null`](_reference_react_captureOwnerStack.md#the-owner-stack-is-null)).

#### Caveats

*   Owner Stacks are only available in development. `captureOwnerStack` will always return `null` outside of development.

##### Deep Dive

#### Owner Stack vs Component Stack

The Owner Stack is different from the Component Stack available in React error handlers like [`errorInfo.componentStack` in `onUncaughtError`](_reference_react-dom_client_hydrateRoot.md#error-logging-in-production).

For example, consider the following code:
```
import {captureOwnerStack} from 'react';
import {createRoot} from 'react-dom/client';
import App, {Component} from './App.js';
import './styles.css';
createRoot(document.createElement('div'), {
  onUncaughtError: (error, errorInfo) => {
    console.log(errorInfo.componentStack);
    console.log(captureOwnerStack());
  },
}).render(
  <App>
    <Component label="disabled" />
  </App>
);
```
`SubComponent` would throw an error. The Component Stack of that error would be
```
at SubComponent

at fieldset

at Component

at main

at React.Suspense

at App
```
However, the Owner Stack would only read

Neither `App` nor the DOM components (e.g. `fieldset`) are considered Owners in this Stack since they didn’t contribute to “creating” the node containing `SubComponent`. `App` and DOM components only forwarded the node. `App` just rendered the `children` node as opposed to `Component` which created a node containing `SubComponent` via `<SubComponent />`.

Neither `Navigation` nor `legend` are in the stack at all since it’s only a sibling to a node containing `<SubComponent />`.

`SubComponent` is omitted because it’s already part of the callstack.

## Usage

### Enhance a custom error overlay
```
import { captureOwnerStack } from "react";

import { instrumentedConsoleError } from "./errorOverlay";

const originalConsoleError = console.error;

console.error = function patchedConsoleError(...args) {

originalConsoleError.apply(console, args);

const ownerStack = captureOwnerStack();

onConsoleError({

// Keep in mind that in a real application, console.error can be

// called with multiple arguments which you should account for.

consoleMessage: args[0],

ownerStack,

});

};
```
If you intercept `console.error` calls to highlight them in an error overlay, you can call `captureOwnerStack` to include the Owner Stack.
```
import { captureOwnerStack } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import { onConsoleError } from "./errorOverlay";
import './styles.css';
const originalConsoleError = console.error;
console.error = function patchedConsoleError(...args) {
  originalConsoleError.apply(console, args);
  const ownerStack = captureOwnerStack();
  onConsoleError({
    consoleMessage: args[0],
    ownerStack,
  });
};
const container = document.getElementById("root");
createRoot(container).render(<App />);
```
## Troubleshooting

### The Owner Stack is `null`

The call of `captureOwnerStack` happened outside of a React controlled function e.g. in a `setTimeout` callback, after a `fetch` call or in a custom DOM event handler. During render, Effects, React event handlers, and React error handlers (e.g. `hydrateRoot#options.onCaughtError`) Owner Stacks should be available.

In the example below, clicking the button will log an empty Owner Stack because `captureOwnerStack` was called during a custom DOM event handler. The Owner Stack must be captured earlier e.g. by moving the call of `captureOwnerStack` into the Effect body.
```
import {captureOwnerStack, useEffect} from 'react';
export default function App() {
  useEffect(() => {
    function handleEvent() {
      console.log('Owner Stack: ', captureOwnerStack());
    }
    document.addEventListener('click', handleEvent);
    return () => {
      document.removeEventListener('click', handleEvent);
    }
  })
  return <button>Click me to see that Owner Stacks are not available in custom DOM event handlers</button>;
}
```
### `captureOwnerStack` is not available

`captureOwnerStack` is only exported in development builds. It will be `undefined` in production builds. If `captureOwnerStack` is used in files that are bundled for production and development, you should conditionally access it from a namespace import.
```
// Don't use named imports of `captureOwnerStack` in files that are bundled for development and production.

import {captureOwnerStack} from 'react';

// Use a namespace import instead and access `captureOwnerStack` conditionally.

import * as React from 'react';

if (process.env.NODE_ENV !== 'production') {

const ownerStack = React.captureOwnerStack();

console.log('Owner Stack', ownerStack);

}
```

#### _reference_react_components.md

> Source: https://react.dev/reference/react/components
> Scraped: 12/20/2025, 10:40:53 PM

React exposes a few built-in components that you can use in your JSX.

* * *

## Built-in components

* [`<Fragment>`](_reference_react_Fragment.md), alternatively written as `<>...</>`, lets you group multiple JSX nodes together.
* [`<Profiler>`](_reference_react_Profiler.md) lets you measure rendering performance of a React tree programmatically.
* [`<Suspense>`](_reference_react_Suspense.md) lets you display a fallback while the child components are loading.
* [`<StrictMode>`](_reference_react_StrictMode.md) enables extra development-only checks that help you find bugs early.
* [`<Activity>`](_reference_react_Activity.md) lets you hide and restore the UI and internal state of its children.

* * *

## Your own components

You can also [define your own components](_learn_your-first-component.md) as JavaScript functions.

#### _reference_react_createContext.md

> Source: https://react.dev/reference/react/createContext
> Scraped: 12/20/2025, 10:41:00 PM

`createContext` lets you create a [context](_learn_passing-data-deeply-with-context.md) that components can provide or read.
```
const SomeContext = createContext(defaultValue)
```
* [Reference](_reference_react_createContext.md#reference)
    * [`createContext(defaultValue)`](_reference_react_createContext.md#createcontext)
    * [`SomeContext` Provider](_reference_react_createContext.md#provider)
    * [`SomeContext.Consumer`](_reference_react_createContext.md#consumer)
* [Usage](_reference_react_createContext.md#usage)
    * [Creating context](_reference_react_createContext.md#creating-context)
    * [Importing and exporting context from a file](_reference_react_createContext.md#importing-and-exporting-context-from-a-file)
* [Troubleshooting](_reference_react_createContext.md#troubleshooting)
    * [I can’t find a way to change the context value](_reference_react_createContext.md#i-cant-find-a-way-to-change-the-context-value)

* * *

## Reference

### `createContext(defaultValue)`

Call `createContext` outside of any components to create a context.
```
import { createContext } from 'react';

const ThemeContext = createContext('light');
```
[See more examples below.](_reference_react_createContext.md#usage)

#### Parameters

*   `defaultValue`: The value that you want the context to have when there is no matching context provider in the tree above the component that reads context. If you don’t have any meaningful default value, specify `null`. The default value is meant as a “last resort” fallback. It is static and never changes over time.

#### Returns

`createContext` returns a context object.

**The context object itself does not hold any information.** It represents _which_ context other components read or provide. Typically, you will use [`SomeContext`](_reference_react_createContext.md#provider) in components above to specify the context value, and call [`useContext(SomeContext)`](_reference_react_useContext.md) in components below to read it. The context object has a few properties:

*   `SomeContext` lets you provide the context value to components.
*   `SomeContext.Consumer` is an alternative and rarely used way to read the context value.
*   `SomeContext.Provider` is a legacy way to provide the context value before React 19.

* * *

### `SomeContext` Provider

Wrap your components into a context provider to specify the value of this context for all components inside:
```
function App() {

const [theme, setTheme] = useState('light');

// ...

return (

<Page />

);

}
```
### Note

Starting in React 19, you can render `<SomeContext>` as a provider.

In older versions of React, use `<SomeContext.Provider>`.

#### Props

*   `value`: The value that you want to pass to all the components reading this context inside this provider, no matter how deep. The context value can be of any type. A component calling [`useContext(SomeContext)`](_reference_react_useContext.md) inside of the provider receives the `value` of the innermost corresponding context provider above it.

* * *

### `SomeContext.Consumer`

Before `useContext` existed, there was an older way to read context:
```
function Button() {

// 🟡 Legacy way (not recommended)

return (

{theme => (

<button className={theme} />

)}

);

}
```
Although this older way still works, **newly written code should read context with [`useContext()`](_reference_react_useContext.md) instead:**
```
function Button() {

// ✅ Recommended way

const theme = useContext(ThemeContext);

return <button className={theme} />;

}
```
#### Props

*   `children`: A function. React will call the function you pass with the current context value determined by the same algorithm as [`useContext()`](_reference_react_useContext.md) does, and render the result you return from this function. React will also re-run this function and update the UI whenever the context from the parent components changes.

* * *

## Usage

### Creating context

Context lets components [pass information deep down](_learn_passing-data-deeply-with-context.md) without explicitly passing props.

Call `createContext` outside any components to create one or more contexts.
```
import { createContext } from 'react';

const ThemeContext = createContext('light');

const AuthContext = createContext(null);
```
`createContext` returns a context object. Components can read context by passing it to [`useContext()`](_reference_react_useContext.md):
```
function Button() {

const theme = useContext(ThemeContext);

// ...

}

function Profile() {

const currentUser = useContext(AuthContext);

// ...

}
```
By default, the values they receive will be the default values you have specified when creating the contexts. However, by itself this isn’t useful because the default values never change.

Context is useful because you can **provide other, dynamic values from your components:**
```
function App() {

const [theme, setTheme] = useState('dark');

const [currentUser, setCurrentUser] = useState({ name: 'Taylor' });

// ...

return (

<AuthContext value={currentUser}>

<Page />

</AuthContext>

);

}
```
Now the `Page` component and any components inside it, no matter how deep, will “see” the passed context values. If the passed context values change, React will re-render the components reading the context as well.

[Read more about reading and providing context and see examples.](_reference_react_useContext.md)

* * *

### Importing and exporting context from a file

Often, components in different files will need access to the same context. This is why it’s common to declare contexts in a separate file. Then you can use the [`export` statement](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) to make context available for other files:
```
// Contexts.js

import { createContext } from 'react';

export const ThemeContext = createContext('light');

export const AuthContext = createContext(null);
```
Components declared in other files can then use the [`import`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import) statement to read or provide this context:
```
// Button.js

import { ThemeContext } from './Contexts.js';

function Button() {

const theme = useContext(ThemeContext);

// ...

}
```
```
// App.js

import { ThemeContext, AuthContext } from './Contexts.js';

function App() {

// ...

return (

<AuthContext value={currentUser}>

<Page />

</AuthContext>

);

}
```
This works similar to [importing and exporting components.](_learn_importing-and-exporting-components.md)

* * *

## Troubleshooting

### I can’t find a way to change the context value

Code like this specifies the _default_ context value:
```
const ThemeContext = createContext('light');
```
This value never changes. React only uses this value as a fallback if it can’t find a matching provider above.

To make context change over time, [add state and wrap components in a context provider.](_reference_react_useContext.md#updating-data-passed-via-context)

#### _reference_react_experimental_taintObjectReference.md

> Source: https://react.dev/reference/react/experimental_taintObjectReference
> Scraped: 12/20/2025, 10:41:00 PM

## experimental\_taintObjectReference - This feature is available in the latest Experimental version of React

### Experimental Feature

**This API is experimental and is not available in a stable version of React yet.**

You can try it by upgrading React packages to the most recent experimental version:

*   `react@experimental`
*   `react-dom@experimental`
*   `eslint-plugin-react-hooks@experimental`

Experimental versions of React may contain bugs. Don’t use them in production.

This API is only available inside React Server Components.

`taintObjectReference` lets you prevent a specific object instance from being passed to a Client Component like a `user` object.
```
experimental_taintObjectReference(message, object);
```
To prevent passing a key, hash or token, see [`taintUniqueValue`](_reference_react_experimental_taintUniqueValue.md).

* [Reference](_reference_react_experimental_taintObjectReference.md#reference)
    * [`taintObjectReference(message, object)`](_reference_react_experimental_taintObjectReference.md#taintobjectreference)
* [Usage](_reference_react_experimental_taintObjectReference.md#usage)
    * [Prevent user data from unintentionally reaching the client](_reference_react_experimental_taintObjectReference.md#prevent-user-data-from-unintentionally-reaching-the-client)

* * *

## Reference

### `taintObjectReference(message, object)`

Call `taintObjectReference` with an object to register it with React as something that should not be allowed to be passed to the Client as is:
```
import {experimental_taintObjectReference} from 'react';

experimental_taintObjectReference(

'Do not pass ALL environment variables to the client.',

process.env

);
```
[See more examples below.](_reference_react_experimental_taintObjectReference.md#usage)

#### Parameters

*   `message`: The message you want to display if the object gets passed to a Client Component. This message will be displayed as a part of the Error that will be thrown if the object gets passed to a Client Component.

*   `object`: The object to be tainted. Functions and class instances can be passed to `taintObjectReference` as `object`. Functions and classes are already blocked from being passed to Client Components but the React’s default error message will be replaced by what you defined in `message`. When a specific instance of a Typed Array is passed to `taintObjectReference` as `object`, any other copies of the Typed Array will not be tainted.

#### Returns

`experimental_taintObjectReference` returns `undefined`.

#### Caveats

*   Recreating or cloning a tainted object creates a new untainted object which may contain sensitive data. For example, if you have a tainted `user` object, `const userInfo = {name: user.name, ssn: user.ssn}` or `{...user}` will create new objects which are not tainted. `taintObjectReference` only protects against simple mistakes when the object is passed through to a Client Component unchanged.

### Pitfall

**Do not rely on just tainting for security.** Tainting an object doesn’t prevent leaking of every possible derived value. For example, the clone of a tainted object will create a new untainted object. Using data from a tainted object (e.g. `{secret: taintedObj.secret}`) will create a new value or object that is not tainted. Tainting is a layer of protection; a secure app will have multiple layers of protection, well designed APIs, and isolation patterns.

* * *

## Usage

### Prevent user data from unintentionally reaching the client

A Client Component should never accept objects that carry sensitive data. Ideally, the data fetching functions should not expose data that the current user should not have access to. Sometimes mistakes happen during refactoring. To protect against these mistakes happening down the line we can “taint” the user object in our data API.
```
import {experimental_taintObjectReference} from 'react';

export async function getUser(id) {

const user = await db`SELECT * FROM users WHERE id = ${id}`;

experimental_taintObjectReference(

'Do not pass the entire user object to the client. ' +

'Instead, pick off the specific properties you need for this use case.',

user,

);

return user;

}
```
Now whenever anyone tries to pass this object to a Client Component, an error will be thrown with the passed in error message instead.

##### Deep Dive

#### Protecting against leaks in data fetching

If you’re running a Server Components environment that has access to sensitive data, you have to be careful not to pass objects straight through:
```
// api.js

export async function getUser(id) {

const user = await db`SELECT * FROM users WHERE id = ${id}`;

return user;

}
```
```
import { getUser } from 'api.js';

import { InfoCard } from 'components.js';

export async function Profile(props) {

const user = await getUser(props.userId);

// DO NOT DO THIS

return <InfoCard user={user} />;

}
```
```
// components.js

"use client";

export async function InfoCard({ user }) {

return {user.name};

}
```
Ideally, the `getUser` should not expose data that the current user should not have access to. To prevent passing the `user` object to a Client Component down the line we can “taint” the user object:
```
// api.js

import {experimental_taintObjectReference} from 'react';

export async function getUser(id) {

const user = await db`SELECT * FROM users WHERE id = ${id}`;

experimental_taintObjectReference(

'Do not pass the entire user object to the client. ' +

'Instead, pick off the specific properties you need for this use case.',

user,

);

return user;

}
```
Now if anyone tries to pass the `user` object to a Client Component, an error will be thrown with the passed in error message.

#### _reference_react_experimental_taintUniqueValue.md

> Source: https://react.dev/reference/react/experimental_taintUniqueValue
> Scraped: 12/20/2025, 10:41:01 PM

### Experimental Feature

**This API is experimental and is not available in a stable version of React yet.**

You can try it by upgrading React packages to the most recent experimental version:

*   `react@experimental`
*   `react-dom@experimental`
*   `eslint-plugin-react-hooks@experimental`

Experimental versions of React may contain bugs. Don’t use them in production.

This API is only available inside [React Server Components](_reference_rsc_use-client.md).

`taintUniqueValue` lets you prevent unique values from being passed to Client Components like passwords, keys, or tokens.
```
taintUniqueValue(errMessage, lifetime, value)
```
To prevent passing an object containing sensitive data, see [`taintObjectReference`](_reference_react_experimental_taintObjectReference.md).

* [Reference](_reference_react_experimental_taintUniqueValue.md#reference)
    * [`taintUniqueValue(message, lifetime, value)`](_reference_react_experimental_taintUniqueValue.md#taintuniquevalue)
* [Usage](_reference_react_experimental_taintUniqueValue.md#usage)
    * [Prevent a token from being passed to Client Components](_reference_react_experimental_taintUniqueValue.md#prevent-a-token-from-being-passed-to-client-components)

* * *

## Reference

### `taintUniqueValue(message, lifetime, value)`

Call `taintUniqueValue` with a password, token, key or hash to register it with React as something that should not be allowed to be passed to the Client as is:
```
import {experimental_taintUniqueValue} from 'react';

experimental_taintUniqueValue(

'Do not pass secret keys to the client.',

process,

process.env.SECRET_KEY

);
```
[See more examples below.](_reference_react_experimental_taintUniqueValue.md#usage)

#### Parameters

*   `message`: The message you want to display if `value` is passed to a Client Component. This message will be displayed as a part of the Error that will be thrown if `value` is passed to a Client Component.

*   `lifetime`: Any object that indicates how long `value` should be tainted. `value` will be blocked from being sent to any Client Component while this object still exists. For example, passing `globalThis` blocks the value for the lifetime of an app. `lifetime` is typically an object whose properties contains `value`.

*   `value`: A string, bigint or TypedArray. `value` must be a unique sequence of characters or bytes with high entropy such as a cryptographic token, private key, hash, or a long password. `value` will be blocked from being sent to any Client Component.

#### Returns

`experimental_taintUniqueValue` returns `undefined`.

#### Caveats

*   Deriving new values from tainted values can compromise tainting protection. New values created by uppercasing tainted values, concatenating tainted string values into a larger string, converting tainted values to base64, substringing tainted values, and other similar transformations are not tainted unless you explicitly call `taintUniqueValue` on these newly created values.
*   Do not use `taintUniqueValue` to protect low-entropy values such as PIN codes or phone numbers. If any value in a request is controlled by an attacker, they could infer which value is tainted by enumerating all possible values of the secret.

* * *

## Usage

### Prevent a token from being passed to Client Components

To ensure that sensitive information such as passwords, session tokens, or other unique values do not inadvertently get passed to Client Components, the `taintUniqueValue` function provides a layer of protection. When a value is tainted, any attempt to pass it to a Client Component will result in an error.

The `lifetime` argument defines the duration for which the value remains tainted. For values that should remain tainted indefinitely, objects like [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) or `process` can serve as the `lifetime` argument. These objects have a lifespan that spans the entire duration of your app’s execution.
```
import {experimental_taintUniqueValue} from 'react';

experimental_taintUniqueValue(

'Do not pass a user password to the client.',

globalThis,

process.env.SECRET_KEY

);
```
If the tainted value’s lifespan is tied to a object, the `lifetime` should be the object that encapsulates the value. This ensures the tainted value remains protected for the lifetime of the encapsulating object.
```
import {experimental_taintUniqueValue} from 'react';

export async function getUser(id) {

const user = await db`SELECT * FROM users WHERE id = ${id}`;

experimental_taintUniqueValue(

'Do not pass a user session token to the client.',

user,

user.session.token

);

return user;

}
```
In this example, the `user` object serves as the `lifetime` argument. If this object gets stored in a global cache or is accessible by another request, the session token remains tainted.

### Pitfall

**Do not rely solely on tainting for security.** Tainting a value doesn’t block every possible derived value. For example, creating a new value by upper casing a tainted string will not taint the new value.
```
import {experimental_taintUniqueValue} from 'react';

const password = 'correct horse battery staple';

experimental_taintUniqueValue(

'Do not pass the password to the client.',

globalThis,

password

);

const uppercasePassword = password.toUpperCase() // `uppercasePassword` is not tainted
```
In this example, the constant `password` is tainted. Then `password` is used to create a new value `uppercasePassword` by calling the `toUpperCase` method on `password`. The newly created `uppercasePassword` is not tainted.

Other similar ways of deriving new values from tainted values like concatenating it into a larger string, converting it to base64, or returning a substring create untained values.

Tainting only protects against simple mistakes like explicitly passing secret values to the client. Mistakes in calling the `taintUniqueValue` like using a global store outside of React, without the corresponding lifetime object, can cause the tainted value to become untainted. Tainting is a layer of protection; a secure app will have multiple layers of protection, well designed APIs, and isolation patterns.

##### Deep Dive

#### Using `server-only` and `taintUniqueValue` to prevent leaking secrets

If you’re running a Server Components environment that has access to private keys or passwords such as database passwords, you have to be careful not to pass that to a Client Component.
```
export async function Dashboard(props) {

// DO NOT DO THIS

return <Overview password={process.env.API_PASSWORD} />;

}
```
```
"use client";

import {useEffect} from '...'

export async function Overview({ password }) {

useEffect(() => {

const headers = { Authorization: password };

fetch(url, { headers }).then(...);

}, [password]);

...

}
```
This example would leak the secret API token to the client. If this API token can be used to access data this particular user shouldn’t have access to, it could lead to a data breach.

Ideally, secrets like this are abstracted into a single helper file that can only be imported by trusted data utilities on the server. The helper can even be tagged with [`server-only`](https://www.npmjs.com/package/server-only) to ensure that this file isn’t imported on the client.
```
import "server-only";

export function fetchAPI(url) {

const headers = { Authorization: process.env.API_PASSWORD };

return fetch(url, { headers });

}
```
Sometimes mistakes happen during refactoring and not all of your colleagues might know about this. To protect against this mistakes happening down the line we can “taint” the actual password:
```
import "server-only";

import {experimental_taintUniqueValue} from 'react';

experimental_taintUniqueValue(

'Do not pass the API token password to the client. ' +

'Instead do all fetches on the server.'

process,

process.env.API_PASSWORD

);
```
Now whenever anyone tries to pass this password to a Client Component, or send the password to a Client Component with a Server Function, an error will be thrown with message you defined when you called `taintUniqueValue`.

* * *

#### _reference_react_hooks.md

> Source: https://react.dev/reference/react/hooks
> Scraped: 12/20/2025, 10:40:54 PM

_Hooks_ let you use different React features from your components. You can either use the built-in Hooks or combine them to build your own. This page lists all built-in Hooks in React.

* * *

## State Hooks

_State_ lets a component [“remember” information like user input.](_learn_state-a-components-memory.md) For example, a form component can use state to store the input value, while an image gallery component can use state to store the selected image index.

To add state to a component, use one of these Hooks:

* [`useState`](_reference_react_useState.md) declares a state variable that you can update directly.
* [`useReducer`](_reference_react_useReducer.md) declares a state variable with the update logic inside a [reducer function.](_learn_extracting-state-logic-into-a-reducer.md)
```
function ImageGallery() {

const [index, setIndex] = useState(0);

// ...
```
* * *

## Context Hooks

_Context_ lets a component [receive information from distant parents without passing it as props.](_learn_passing-props-to-a-component.md) For example, your app’s top-level component can pass the current UI theme to all components below, no matter how deep.

* [`useContext`](_reference_react_useContext.md) reads and subscribes to a context.
```
function Button() {

const theme = useContext(ThemeContext);

// ...
```
* * *

## Ref Hooks

_Refs_ let a component [hold some information that isn’t used for rendering,](_learn_referencing-values-with-refs.md) like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component. Refs are an “escape hatch” from the React paradigm. They are useful when you need to work with non-React systems, such as the built-in browser APIs.

* [`useRef`](_reference_react_useRef.md) declares a ref. You can hold any value in it, but most often it’s used to hold a DOM node.
* [`useImperativeHandle`](_reference_react_useImperativeHandle.md) lets you customize the ref exposed by your component. This is rarely used.
```
function Form() {

const inputRef = useRef(null);

// ...
```
* * *

## Effect Hooks

_Effects_ let a component [connect to and synchronize with external systems.](_learn_synchronizing-with-effects.md) This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.

* [`useEffect`](_reference_react_useEffect.md) connects a component to an external system.
```
function ChatRoom({ roomId }) {

useEffect(() => {

const connection = createConnection(roomId);

connection.connect();

return () => connection.disconnect();

}, [roomId]);

// ...
```
Effects are an “escape hatch” from the React paradigm. Don’t use Effects to orchestrate the data flow of your application. If you’re not interacting with an external system, [you might not need an Effect.](_learn_you-might-not-need-an-effect.md)

There are two rarely used variations of `useEffect` with differences in timing:

* [`useLayoutEffect`](_reference_react_useLayoutEffect.md) fires before the browser repaints the screen. You can measure layout here.
* [`useInsertionEffect`](_reference_react_useInsertionEffect.md) fires before React makes changes to the DOM. Libraries can insert dynamic CSS here.

* * *

## Performance Hooks

A common way to optimize re-rendering performance is to skip unnecessary work. For example, you can tell React to reuse a cached calculation or to skip a re-render if the data has not changed since the previous render.

To skip calculations and unnecessary re-rendering, use one of these Hooks:

* [`useMemo`](_reference_react_useMemo.md) lets you cache the result of an expensive calculation.
* [`useCallback`](_reference_react_useCallback.md) lets you cache a function definition before passing it down to an optimized component.
```
function TodoList({ todos, tab, theme }) {

const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

// ...

}
```
Sometimes, you can’t skip re-rendering because the screen actually needs to update. In that case, you can improve performance by separating blocking updates that must be synchronous (like typing into an input) from non-blocking updates which don’t need to block the user interface (like updating a chart).

To prioritize rendering, use one of these Hooks:

* [`useTransition`](_reference_react_useTransition.md) lets you mark a state transition as non-blocking and allow other updates to interrupt it.
* [`useDeferredValue`](_reference_react_useDeferredValue.md) lets you defer updating a non-critical part of the UI and let other parts update first.

* * *

## Other Hooks

These Hooks are mostly useful to library authors and aren’t commonly used in the application code.

* [`useDebugValue`](_reference_react_useDebugValue.md) lets you customize the label React DevTools displays for your custom Hook.
* [`useId`](_reference_react_useId.md) lets a component associate a unique ID with itself. Typically used with accessibility APIs.
* [`useSyncExternalStore`](_reference_react_useSyncExternalStore.md) lets a component subscribe to an external store.

* [`useActionState`](_reference_react_useActionState.md) allows you to manage state of actions.

* * *

## Your own Hooks

You can also [define your own custom Hooks](_learn_reusing-logic-with-custom-hooks.md#extracting-your-own-custom-hook-from-a-component) as JavaScript functions.

#### _reference_react_lazy.md

> Source: https://react.dev/reference/react/lazy
> Scraped: 12/20/2025, 10:41:01 PM

`lazy` lets you defer loading component’s code until it is rendered for the first time.
```
const SomeComponent = lazy(load)
```
* [Reference](_reference_react_lazy.md#reference)
    * [`lazy(load)`](_reference_react_lazy.md#lazy)
    * [`load` function](_reference_react_lazy.md#load)
* [Usage](_reference_react_lazy.md#usage)
    * [Lazy-loading components with Suspense](_reference_react_lazy.md#suspense-for-code-splitting)
* [Troubleshooting](_reference_react_lazy.md#troubleshooting)
    * [My `lazy` component’s state gets reset unexpectedly](_reference_react_lazy.md#my-lazy-components-state-gets-reset-unexpectedly)

* * *

## Reference

### `lazy(load)`

Call `lazy` outside your components to declare a lazy-loaded React component:
```
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
```
[See more examples below.](_reference_react_lazy.md#usage)

#### Parameters

*   `load`: A function that returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or another _thenable_ (a Promise-like object with a `then` method). React will not call `load` until the first time you attempt to render the returned component. After React first calls `load`, it will wait for it to resolve, and then render the resolved value’s `.default` as a React component. Both the returned Promise and the Promise’s resolved value will be cached, so React will not call `load` more than once. If the Promise rejects, React will `throw` the rejection reason for the nearest Error Boundary to handle.

#### Returns

`lazy` returns a React component you can render in your tree. While the code for the lazy component is still loading, attempting to render it will _suspend._ Use [`<Suspense>`](_reference_react_Suspense.md) to display a loading indicator while it’s loading.

* * *

### `load` function

#### Parameters

`load` receives no parameters.

#### Returns

You need to return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or some other _thenable_ (a Promise-like object with a `then` method). It needs to eventually resolve to an object whose `.default` property is a valid React component type, such as a function, [`memo`](_reference_react_memo.md), or a [`forwardRef`](_reference_react_forwardRef.md) component.

* * *

## Usage

### Lazy-loading components with Suspense

Usually, you import components with the static [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) declaration:
```
import MarkdownPreview from './MarkdownPreview.js';
```
To defer loading this component’s code until it’s rendered for the first time, replace this import with:
```
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
```
This code relies on [dynamic `import()`,](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) which might require support from your bundler or framework. Using this pattern requires that the lazy component you’re importing was exported as the `default` export.

Now that your component’s code loads on demand, you also need to specify what should be displayed while it is loading. You can do this by wrapping the lazy component or any of its parents into a [`<Suspense>`](_reference_react_Suspense.md) boundary:
```
<Suspense fallback={<Loading />}>

<h2>Preview</h2>

<MarkdownPreview />

</Suspense>
```
In this example, the code for `MarkdownPreview` won’t be loaded until you attempt to render it. If `MarkdownPreview` hasn’t loaded yet, `Loading` will be shown in its place. Try ticking the checkbox:

This demo loads with an artificial delay. The next time you untick and tick the checkbox, `Preview` will be cached, so there will be no loading state. To see the loading state again, click “Reset” on the sandbox.

[Learn more about managing loading states with Suspense.](_reference_react_Suspense.md)

* * *

## Troubleshooting

### My `lazy` component’s state gets reset unexpectedly

Do not declare `lazy` components _inside_ other components:
```
import { lazy } from 'react';

function Editor() {

// 🔴 Bad: This will cause all state to be reset on re-renders

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

// ...

}
```
Instead, always declare them at the top level of your module:
```
import { lazy } from 'react';

// ✅ Good: Declare lazy components outside of your components

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

function Editor() {

// ...

}
```

#### _reference_react_memo.md

> Source: https://react.dev/reference/react/memo
> Scraped: 12/20/2025, 10:41:01 PM

`memo` lets you skip re-rendering a component when its props are unchanged.
```
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```
### Note

[React Compiler](_learn_react-compiler.md) automatically applies the equivalent of `memo` to all components, reducing the need for manual memoization. You can use the compiler to handle component memoization automatically.

* [Reference](_reference_react_memo.md#reference)
    * [`memo(Component, arePropsEqual?)`](_reference_react_memo.md#memo)
* [Usage](_reference_react_memo.md#usage)
    * [Skipping re-rendering when props are unchanged](_reference_react_memo.md#skipping-re-rendering-when-props-are-unchanged)
    * [Updating a memoized component using state](_reference_react_memo.md#updating-a-memoized-component-using-state)
    * [Updating a memoized component using a context](_reference_react_memo.md#updating-a-memoized-component-using-a-context)
    * [Minimizing props changes](_reference_react_memo.md#minimizing-props-changes)
    * [Specifying a custom comparison function](_reference_react_memo.md#specifying-a-custom-comparison-function)
    * [Do I still need React.memo if I use React Compiler?](_reference_react_memo.md#react-compiler-memo)
* [Troubleshooting](_reference_react_memo.md#troubleshooting)
    * [My component re-renders when a prop is an object, array, or function](_reference_react_memo.md#my-component-rerenders-when-a-prop-is-an-object-or-array)

* * *

## Reference

### `memo(Component, arePropsEqual?)`

Wrap a component in `memo` to get a _memoized_ version of that component. This memoized version of your component will usually not be re-rendered when its parent component is re-rendered as long as its props have not changed. But React may still re-render it: memoization is a performance optimization, not a guarantee.
```
import { memo } from 'react';

const SomeComponent = memo(function SomeComponent(props) {

// ...

});
```
[See more examples below.](_reference_react_memo.md#usage)

#### Parameters

*   `Component`: The component that you want to memoize. The `memo` does not modify this component, but returns a new, memoized component instead. Any valid React component, including functions and [`forwardRef`](_reference_react_forwardRef.md) components, is accepted.

*   **optional** `arePropsEqual`: A function that accepts two arguments: the component’s previous props, and its new props. It should return `true` if the old and new props are equal: that is, if the component will render the same output and behave in the same way with the new props as with the old. Otherwise it should return `false`. Usually, you will not specify this function. By default, React will compare each prop with [`Object.is`.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

#### Returns

`memo` returns a new React component. It behaves the same as the component provided to `memo` except that React will not always re-render it when its parent is being re-rendered unless its props have changed.

* * *

## Usage

### Skipping re-rendering when props are unchanged

React normally re-renders a component whenever its parent re-renders. With `memo`, you can create a component that React will not re-render when its parent re-renders so long as its new props are the same as the old props. Such a component is said to be _memoized_.

To memoize a component, wrap it in `memo` and use the value that it returns in place of your original component:
```
const Greeting = memo(function Greeting({ name }) {

return <h1>Hello, {name}!</h1>;

});

export default Greeting;
```
A React component should always have [pure rendering logic.](_learn_keeping-components-pure.md) This means that it must return the same output if its props, state, and context haven’t changed. By using `memo`, you are telling React that your component complies with this requirement, so React doesn’t need to re-render as long as its props haven’t changed. Even with `memo`, your component will re-render if its own state changes or if a context that it’s using changes.

In this example, notice that the `Greeting` component re-renders whenever `name` is changed (because that’s one of its props), but not when `address` is changed (because it’s not passed to `Greeting` as a prop):

### Note

**You should only rely on `memo` as a performance optimization.** If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add `memo` to improve performance.

##### Deep Dive

#### Should you add memo everywhere?

If your app is like this site, and most interactions are coarse (like replacing a page or an entire section), memoization is usually unnecessary. On the other hand, if your app is more like a drawing editor, and most interactions are granular (like moving shapes), then you might find memoization very helpful.

Optimizing with `memo` is only valuable when your component re-renders often with the same exact props, and its re-rendering logic is expensive. If there is no perceptible lag when your component re-renders, `memo` is unnecessary. Keep in mind that `memo` is completely useless if the props passed to your component are _always different,_ such as if you pass an object or a plain function defined during rendering. This is why you will often need [`useMemo`](_reference_react_useMemo.md#skipping-re-rendering-of-components) and [`useCallback`](_reference_react_useCallback.md#skipping-re-rendering-of-components) together with `memo`.

There is no benefit to wrapping a component in `memo` in other cases. There is no significant harm to doing that either, so some teams choose to not think about individual cases, and memoize as much as possible. The downside of this approach is that code becomes less readable. Also, not all memoization is effective: a single value that’s “always new” is enough to break memoization for an entire component.

**In practice, you can make a lot of memoization unnecessary by following a few principles:**

1.  When a component visually wraps other components, let it [accept JSX as children.](_learn_passing-props-to-a-component.md#passing-jsx-as-children) This way, when the wrapper component updates its own state, React knows that its children don’t need to re-render.
2.  Prefer local state and don’t [lift state up](_learn_sharing-state-between-components.md) any further than necessary. For example, don’t keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
3.  Keep your [rendering logic pure.](_learn_keeping-components-pure.md) If re-rendering a component causes a problem or produces some noticeable visual artifact, it’s a bug in your component! Fix the bug instead of adding memoization.
4.  Avoid [unnecessary Effects that update state.](_learn_you-might-not-need-an-effect.md) Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
5.  Try to [remove unnecessary dependencies from your Effects.](_learn_removing-effect-dependencies.md) For example, instead of memoization, it’s often simpler to move some object or a function inside an Effect or outside the component.

If a specific interaction still feels laggy, [use the React Developer Tools profiler](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) to see which components would benefit the most from memoization, and add memoization where needed. These principles make your components easier to debug and understand, so it’s good to follow them in any case. In the long term, we’re researching [doing granular memoization automatically](https://www.youtube.com/watch?v=lGEMwh32soc) to solve this once and for all.

* * *

### Updating a memoized component using state

Even when a component is memoized, it will still re-render when its own state changes. Memoization only has to do with props that are passed to the component from its parent.

If you set a state variable to its current value, React will skip re-rendering your component even without `memo`. You may still see your component function being called an extra time, but the result will be discarded.

* * *

### Updating a memoized component using a context

Even when a component is memoized, it will still re-render when a context that it’s using changes. Memoization only has to do with props that are passed to the component from its parent.

To make your component re-render only when a _part_ of some context changes, split your component in two. Read what you need from the context in the outer component, and pass it down to a memoized child as a prop.

* * *

### Minimizing props changes

When you use `memo`, your component re-renders whenever any prop is not _shallowly equal_ to what it was previously. This means that React compares every prop in your component with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. Note that `Object.is(3, 3)` is `true`, but `Object.is({}, {})` is `false`.

To get the most out of `memo`, minimize the times that the props change. For example, if the prop is an object, prevent the parent component from re-creating that object every time by using [`useMemo`:](_reference_react_useMemo.md)
```
function Page() {

const [name, setName] = useState('Taylor');

const [age, setAge] = useState(42);

const person = useMemo(

() => ({ name, age }),

[name, age]

);

return <Profile person={person} />;

}

const Profile = memo(function Profile({ person }) {

// ...

});
```
A better way to minimize props changes is to make sure the component accepts the minimum necessary information in its props. For example, it could accept individual values instead of a whole object:
```
function Page() {

const [name, setName] = useState('Taylor');

const [age, setAge] = useState(42);

return <Profile name={name} age={age} />;

}

const Profile = memo(function Profile({ name, age }) {

// ...

});
```
Even individual values can sometimes be projected to ones that change less frequently. For example, here a component accepts a boolean indicating the presence of a value rather than the value itself:
```
function GroupsLanding({ person }) {

const hasGroups = person.groups !== null;

return <CallToAction hasGroups={hasGroups} />;

}

const CallToAction = memo(function CallToAction({ hasGroups }) {

// ...

});
```
When you need to pass a function to memoized component, either declare it outside your component so that it never changes, or [`useCallback`](_reference_react_useCallback.md#skipping-re-rendering-of-components) to cache its definition between re-renders.

* * *

### Specifying a custom comparison function

In rare cases it may be infeasible to minimize the props changes of a memoized component. In that case, you can provide a custom comparison function, which React will use to compare the old and new props instead of using shallow equality. This function is passed as a second argument to `memo`. It should return `true` only if the new props would result in the same output as the old props; otherwise it should return `false`.
```
const Chart = memo(function Chart({ dataPoints }) {

// ...

}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {

return (

oldProps.dataPoints.length === newProps.dataPoints.length &&

oldProps.dataPoints.every((oldPoint, index) => {

const newPoint = newProps.dataPoints[index];

return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;

})

);

}
```
If you do this, use the Performance panel in your browser developer tools to make sure that your comparison function is actually faster than re-rendering the component. You might be surprised.

When you do performance measurements, make sure that React is running in the production mode.

### Pitfall

If you provide a custom `arePropsEqual` implementation, **you must compare every prop, including functions.** Functions often [close over](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) the props and state of parent components. If you return `true` when `oldProps.onClick !== newProps.onClick`, your component will keep “seeing” the props and state from a previous render inside its `onClick` handler, leading to very confusing bugs.

Avoid doing deep equality checks inside `arePropsEqual` unless you are 100% sure that the data structure you’re working with has a known limited depth. **Deep equality checks can become incredibly slow** and can freeze your app for many seconds if someone changes the data structure later.

* * *

### Do I still need React.memo if I use React Compiler?

When you enable [React Compiler](_learn_react-compiler.md), you typically don’t need `React.memo` anymore. The compiler automatically optimizes component re-rendering for you.

Here’s how it works:

**Without React Compiler**, you need `React.memo` to prevent unnecessary re-renders:
```
// Parent re-renders every second

function Parent() {

const [seconds, setSeconds] = useState(0);

useEffect(() => {

const interval = setInterval(() => {

setSeconds(s => s + 1);

}, 1000);

return () => clearInterval(interval);

}, []);

return (

<>

<h1>Seconds: {seconds}</h1>

<ExpensiveChild name="John" />

</>

);

}

// Without memo, this re-renders every second even though props don't change

const ExpensiveChild = memo(function ExpensiveChild({ name }) {

console.log('ExpensiveChild rendered');

return Hello, {name}!;

});
```
**With React Compiler enabled**, the same optimization happens automatically:
```
// No memo needed - compiler prevents re-renders automatically

function ExpensiveChild({ name }) {

console.log('ExpensiveChild rendered');

return Hello, {name}!;

}
```
Here’s the key part of what the React Compiler generates:
```
function Parent() {

const $ = _c(7);

const [seconds, setSeconds] = useState(0);

// ... other code ...

let t3;

if ($[4] === Symbol.for("react.memo_cache_sentinel")) {

t3 = <ExpensiveChild name="John" />;

$[4] = t3;

} else {

t3 = $[4];

}

// ... return statement ...

}
```
Notice the highlighted lines: The compiler wraps `<ExpensiveChild name="John" />` in a cache check. Since the `name` prop is always `"John"`, this JSX is created once and reused on every parent re-render. This is exactly what `React.memo` does - it prevents the child from re-rendering when its props haven’t changed.

The React Compiler automatically:

1.  Tracks that the `name` prop passed to `ExpensiveChild` hasn’t changed
2.  Reuses the previously created JSX for `<ExpensiveChild name="John" />`
3.  Skips re-rendering `ExpensiveChild` entirely

This means **you can safely remove `React.memo` from your components when using React Compiler**. The compiler provides the same optimization automatically, making your code cleaner and easier to maintain.

### Note

The compiler’s optimization is actually more comprehensive than `React.memo`. It also memoizes intermediate values and expensive computations within your components, similar to combining `React.memo` with `useMemo` throughout your component tree.

* * *

## Troubleshooting

### My component re-renders when a prop is an object, array, or function

React compares old and new props by shallow equality: that is, it considers whether each new prop is reference-equal to the old prop. If you create a new object or array each time the parent is re-rendered, even if the individual elements are each the same, React will still consider it to be changed. Similarly, if you create a new function when rendering the parent component, React will consider it to have changed even if the function has the same definition. To avoid this, [simplify props or memoize props in the parent component](_reference_react_memo.md#minimizing-props-changes).

#### _reference_react_startTransition.md

> Source: https://react.dev/reference/react/startTransition
> Scraped: 12/20/2025, 10:41:00 PM

`startTransition` lets you render a part of the UI in the background.

The `startTransition` function lets you mark a state update as a Transition.

`startTransition` does not return anything.

*   `startTransition` does not provide a way to track whether a Transition is pending. To show a pending indicator while the Transition is ongoing, you need [`useTransition`](_reference_react_useTransition.md) instead.

*   You can wrap an update into a Transition only if you have access to the `set` function of that state. If you want to start a Transition in response to some prop or a custom Hook return value, try [`useDeferredValue`](_reference_react_useDeferredValue.md) instead.

*   The function you pass to `startTransition` is called immediately, marking all state updates that happen while it executes as Transitions. If you try to perform state updates in a `setTimeout`, for example, they won’t be marked as Transitions.

*   You must wrap any state updates after any async requests in another `startTransition` to mark them as Transitions. This is a known limitation that we will fix in the future (see [Troubleshooting](_reference_react_useTransition.md#react-doesnt-treat-my-state-update-after-await-as-a-transition)).

*   A state update marked as a Transition will be interrupted by other state updates. For example, if you update a chart component inside a Transition, but then start typing into an input while the chart is in the middle of a re-render, React will restart the rendering work on the chart component after handling the input state update.

*   Transition updates can’t be used to control text inputs.

*   If there are multiple ongoing Transitions, React currently batches them together. This is a limitation that may be removed in a future release.

You can mark a state update as a _Transition_ by wrapping it in a `startTransition` call:

Transitions let you keep the user interface updates responsive even on slow devices.

With a Transition, your UI stays responsive in the middle of a re-render. For example, if the user clicks a tab but then change their mind and click another tab, they can do that without waiting for the first re-render to finish.

### Note

#### _reference_react_use.md

> Source: https://react.dev/reference/react/use
> Scraped: 12/20/2025, 10:41:01 PM

`use` is a React API that lets you read the value of a resource like a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [context](_learn_passing-data-deeply-with-context.md).
```
const value = use(resource);
```
* [Reference](_reference_react_use.md#reference)
    * [`use(resource)`](_reference_react_use.md#use)
* [Usage](_reference_react_use.md#usage)
    * [Reading context with `use`](_reference_react_use.md#reading-context-with-use)
    * [Streaming data from the server to the client](_reference_react_use.md#streaming-data-from-server-to-client)
    * [Dealing with rejected Promises](_reference_react_use.md#dealing-with-rejected-promises)
* [Troubleshooting](_reference_react_use.md#troubleshooting)
    * [“Suspense Exception: This is not a real error!”](_reference_react_use.md#suspense-exception-error)

* * *

## Reference

### `use(resource)`

Call `use` in your component to read the value of a resource like a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [context](_learn_passing-data-deeply-with-context.md).
```
import { use } from 'react';

function MessageComponent({ messagePromise }) {

const message = use(messagePromise);

const theme = use(ThemeContext);

// ...
```
Unlike React Hooks, `use` can be called within loops and conditional statements like `if`. Like React Hooks, the function that calls `use` must be a Component or Hook.

When called with a Promise, the `use` API integrates with [`Suspense`](_reference_react_Suspense.md) and [Error Boundaries](_reference_react_Component.md#catching-rendering-errors-with-an-error-boundary). The component calling `use` _suspends_ while the Promise passed to `use` is pending. If the component that calls `use` is wrapped in a Suspense boundary, the fallback will be displayed. Once the Promise is resolved, the Suspense fallback is replaced by the rendered components using the data returned by the `use` API. If the Promise passed to `use` is rejected, the fallback of the nearest Error Boundary will be displayed.

[See more examples below.](_reference_react_use.md#usage)

#### Parameters

*   `resource`: this is the source of the data you want to read a value from. A resource can be a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or a [context](_learn_passing-data-deeply-with-context.md).

#### Returns

The `use` API returns the value that was read from the resource like the resolved value of a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [context](_learn_passing-data-deeply-with-context.md).

#### Caveats

*   The `use` API must be called inside a Component or a Hook.
*   When fetching data in a [Server Component](_reference_rsc_server-components.md), prefer `async` and `await` over `use`. `async` and `await` pick up rendering from the point where `await` was invoked, whereas `use` re-renders the component after the data is resolved.
*   Prefer creating Promises in [Server Components](_reference_rsc_server-components.md) and passing them to [Client Components](_reference_rsc_use-client.md) over creating Promises in Client Components. Promises created in Client Components are recreated on every render. Promises passed from a Server Component to a Client Component are stable across re-renders. [See this example](_reference_react_use.md#streaming-data-from-server-to-client).

* * *

## Usage

### Reading context with `use`

When a [context](_learn_passing-data-deeply-with-context.md) is passed to `use`, it works similarly to [`useContext`](_reference_react_useContext.md). While `useContext` must be called at the top level of your component, `use` can be called inside conditionals like `if` and loops like `for`. `use` is preferred over `useContext` because it is more flexible.
```
import { use } from 'react';

function Button() {

const theme = use(ThemeContext);

// ...
```
`use` returns the context value for the context you passed. To determine the context value, React searches the component tree and finds **the closest context provider above** for that particular context.

To pass context to a `Button`, wrap it or one of its parent components into the corresponding context provider.
```
function MyPage() {

return (

<Form />

);

}

function Form() {

// ... renders buttons inside ...

}
```
It doesn’t matter how many layers of components there are between the provider and the `Button`. When a `Button` _anywhere_ inside of `Form` calls `use(ThemeContext)`, it will receive `"dark"` as the value.

Unlike [`useContext`](_reference_react_useContext.md), `use` can be called in conditionals and loops like `if`.
```
function HorizontalRule({ show }) {

if (show) {

const theme = use(ThemeContext);

return <hr className={theme} />;

}

return false;

}
```
`use` is called from inside a `if` statement, allowing you to conditionally read values from a Context.

### Pitfall

Like `useContext`, `use(context)` always looks for the closest context provider _above_ the component that calls it. It searches upwards and **does not** consider context providers in the component from which you’re calling `use(context)`.
```
import { createContext, use } from 'react';
const ThemeContext = createContext(null);
export default function MyApp() {
  return (

      <Form />

  )
}
function Form() {
  return (
    <Panel title="Welcome">
      <Button show={true}>Sign up</Button>
      <Button show={false}>Log in</Button>
    </Panel>
  );
}
function Panel({ title, children }) {
  const theme = use(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}
function Button({ show, children }) {
  if (show) {
    const theme = use(ThemeContext);
    const className = 'button-' + theme;
    return (
      <button className={className}>
        {children}
      </button>
    );
  }
  return false
}
```
### Streaming data from the server to the client

Data can be streamed from the server to the client by passing a Promise as a prop from a Server Component to a Client Component.
```
import { fetchMessage } from './lib.js';

import { Message } from './message.js';

export default function App() {

const messagePromise = fetchMessage();

return (

<Suspense fallback={<p>waiting for message...</p>}>

<Message messagePromise={messagePromise} />

</Suspense>

);

}
```
The Client Component then takes the Promise it received as a prop and passes it to the `use` API. This allows the Client Component to read the value from the Promise that was initially created by the Server Component.
```
// message.js

'use client';

import { use } from 'react';

export function Message({ messagePromise }) {

const messageContent = use(messagePromise);

return <p>Here is the message: {messageContent}</p>;

}
```
Because `Message` is wrapped in [`Suspense`](_reference_react_Suspense.md), the fallback will be displayed until the Promise is resolved. When the Promise is resolved, the value will be read by the `use` API and the `Message` component will replace the Suspense fallback.
```
"use client";
import { use, Suspense } from "react";
function Message({ messagePromise }) {
  const messageContent = use(messagePromise);
  return <p>Here is the message: {messageContent}</p>;
}
export function MessageContainer({ messagePromise }) {
  return (
    <Suspense fallback={<p>⌛Downloading message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}
```
### Note

When passing a Promise from a Server Component to a Client Component, its resolved value must be serializable to pass between server and client. Data types like functions aren’t serializable and cannot be the resolved value of such a Promise.

##### Deep Dive

#### Should I resolve a Promise in a Server or Client Component?

A Promise can be passed from a Server Component to a Client Component and resolved in the Client Component with the `use` API. You can also resolve the Promise in a Server Component with `await` and pass the required data to the Client Component as a prop.
```
export default async function App() {

const messageContent = await fetchMessage();

return <Message messageContent={messageContent} />

}
```
But using `await` in a [Server Component](_reference_rsc_server-components.md) will block its rendering until the `await` statement is finished. Passing a Promise from a Server Component to a Client Component prevents the Promise from blocking the rendering of the Server Component.

### Dealing with rejected Promises

In some cases a Promise passed to `use` could be rejected. You can handle rejected Promises by either:

1.  [Displaying an error to users with an Error Boundary.](_reference_react_use.md#displaying-an-error-to-users-with-error-boundary)
2.  [Providing an alternative value with `Promise.catch`](_reference_react_use.md#providing-an-alternative-value-with-promise-catch)

### Pitfall

#### Displaying an error to users with an Error Boundary

If you’d like to display an error to your users when a Promise is rejected, you can use an [Error Boundary](_reference_react_Component.md#catching-rendering-errors-with-an-error-boundary). To use an Error Boundary, wrap the component where you are calling the `use` API in an Error Boundary. If the Promise passed to `use` is rejected the fallback for the Error Boundary will be displayed.
```
"use client";
import { use, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
export function MessageContainer({ messagePromise }) {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <Suspense fallback={<p>⌛Downloading message...</p>}>
        <Message messagePromise={messagePromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
function Message({ messagePromise }) {
  const content = use(messagePromise);
  return <p>Here is the message: {content}</p>;
}
```
#### Providing an alternative value with `Promise.catch`

If you’d like to provide an alternative value when the Promise passed to `use` is rejected you can use the Promise’s [`catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) method.
```
import { Message } from './message.js';

export default function App() {

const messagePromise = new Promise((resolve, reject) => {

reject();

}).catch(() => {

return "no new message found.";

});

return (

<Suspense fallback={<p>waiting for message...</p>}>

<Message messagePromise={messagePromise} />

</Suspense>

);

}
```
To use the Promise’s `catch` method, call `catch` on the Promise object. `catch` takes a single argument: a function that takes an error message as an argument. Whatever is returned by the function passed to `catch` will be used as the resolved value of the Promise.

* * *

## Troubleshooting

### “Suspense Exception: This is not a real error!”

You are either calling `use` outside of a React Component or Hook function, or calling `use` in a try–catch block. If you are calling `use` inside a try–catch block, wrap your component in an Error Boundary, or call the Promise’s `catch` to catch the error and resolve the Promise with another value. [See these examples](_reference_react_use.md#dealing-with-rejected-promises).

If you are calling `use` outside a React Component or Hook function, move the `use` call to a React Component or Hook function.
```
function MessageComponent({messagePromise}) {

function download() {

// ❌ the function calling `use` is not a Component or Hook

const message = use(messagePromise);

// ...
```
Instead, call `use` outside any component closures, where the function that calls `use` is a Component or Hook.
```
function MessageComponent({messagePromise}) {

// ✅ `use` is being called from a component.

const message = use(messagePromise);

// ...
```

#### _reference_react_useActionState.md

> Source: https://react.dev/reference/react/useActionState
> Scraped: 12/20/2025, 10:40:54 PM

`useActionState` is a Hook that allows you to update state based on the result of a form action.
```
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```
### Note

In earlier React Canary versions, this API was part of React DOM and called `useFormState`.

* [Reference](_reference_react_useActionState.md#reference)
    * [`useActionState(action, initialState, permalink?)`](_reference_react_useActionState.md#useactionstate)
* [Usage](_reference_react_useActionState.md#usage)
    * [Using information returned by a form action](_reference_react_useActionState.md#using-information-returned-by-a-form-action)
* [Troubleshooting](_reference_react_useActionState.md#troubleshooting)
    * [My action can no longer read the submitted form data](_reference_react_useActionState.md#my-action-can-no-longer-read-the-submitted-form-data)

* * *

## Reference

### `useActionState(action, initialState, permalink?)`

Call `useActionState` at the top level of your component to create component state that is updated [when a form action is invoked](_reference_react-dom_components_form.md). You pass `useActionState` an existing form action function as well as an initial state, and it returns a new action that you use in your form, along with the latest form state and whether the Action is still pending. The latest form state is also passed to the function that you provided.
```
import { useActionState } from "react";

async function increment(previousState, formData) {

return previousState + 1;

}

function StatefulForm({}) {

const [state, formAction] = useActionState(increment, 0);

return (

<form>

{state}

<button formAction={formAction}>Increment</button>

</form>

)

}
```
The form state is the value returned by the action when the form was last submitted. If the form has not yet been submitted, it is the initial state that you pass.

If used with a Server Function, `useActionState` allows the server’s response from submitting the form to be shown even before hydration has completed.

[See more examples below.](_reference_react_useActionState.md#usage)

#### Parameters

*   `fn`: The function to be called when the form is submitted or button pressed. When the function is called, it will receive the previous state of the form (initially the `initialState` that you pass, subsequently its previous return value) as its initial argument, followed by the arguments that a form action normally receives.
*   `initialState`: The value you want the state to be initially. It can be any serializable value. This argument is ignored after the action is first invoked.
*   **optional** `permalink`: A string containing the unique page URL that this form modifies. For use on pages with dynamic content (eg: feeds) in conjunction with progressive enhancement: if `fn` is a [server function](_reference_rsc_server-functions.md) and the form is submitted before the JavaScript bundle loads, the browser will navigate to the specified permalink URL, rather than the current page’s URL. Ensure that the same form component is rendered on the destination page (including the same action `fn` and `permalink`) so that React knows how to pass the state through. Once the form has been hydrated, this parameter has no effect.

#### Returns

`useActionState` returns an array with the following values:

1.  The current state. During the first render, it will match the `initialState` you have passed. After the action is invoked, it will match the value returned by the action.
2.  A new action that you can pass as the `action` prop to your `form` component or `formAction` prop to any `button` component within the form. The action can also be called manually within [`startTransition`](_reference_react_startTransition.md).
3.  The `isPending` flag that tells you whether there is a pending Transition.

#### Caveats

*   When used with a framework that supports React Server Components, `useActionState` lets you make forms interactive before JavaScript has executed on the client. When used without Server Components, it is equivalent to component local state.
*   The function passed to `useActionState` receives an extra argument, the previous or initial state, as its first argument. This makes its signature different than if it were used directly as a form action without using `useActionState`.

* * *

## Usage

### Using information returned by a form action

Call `useActionState` at the top level of your component to access the return value of an action from the last time a form was submitted.
```
import { useActionState } from 'react';

import { action } from './actions.js';

function MyComponent() {

const [state, formAction] = useActionState(action, null);

// ...

return (

<form action={formAction}>

{/* ... */}

</form>

);

}
```
`useActionState` returns an array with the following items:

1.  The current state of the form, which is initially set to the initial state you provided, and after the form is submitted is set to the return value of the action you provided.
2.  A new action that you pass to `<form>` as its `action` prop or call manually within `startTransition`.
3.  A pending state that you can utilise while your action is processing.

When the form is submitted, the action function that you provided will be called. Its return value will become the new current state of the form.

The action that you provide will also receive a new first argument, namely the current state of the form. The first time the form is submitted, this will be the initial state you provided, while with subsequent submissions, it will be the return value from the last time the action was called. The rest of the arguments are the same as if `useActionState` had not been used.
```
function action(currentState, formData) {

// ...

return 'next state';

}
```
## Troubleshooting

### My action can no longer read the submitted form data

When you wrap an action with `useActionState`, it gets an extra argument _as its first argument_. The submitted form data is therefore its _second_ argument instead of its first as it would usually be. The new first argument that gets added is the current state of the form.
```
function action(currentState, formData) {

// ...

}
```

#### _reference_react_useCallback.md

> Source: https://react.dev/reference/react/useCallback
> Scraped: 12/20/2025, 10:40:54 PM

`useCallback` is a React Hook that lets you cache a function definition between re-renders.
```
const cachedFn = useCallback(fn, dependencies)
```
### Note

[React Compiler](_learn_react-compiler.md) automatically memoizes values and functions, reducing the need for manual `useCallback` calls. You can use the compiler to handle memoization automatically.

* [Reference](_reference_react_useCallback.md#reference)
    * [`useCallback(fn, dependencies)`](_reference_react_useCallback.md#usecallback)
* [Usage](_reference_react_useCallback.md#usage)
    * [Skipping re-rendering of components](_reference_react_useCallback.md#skipping-re-rendering-of-components)
    * [Updating state from a memoized callback](_reference_react_useCallback.md#updating-state-from-a-memoized-callback)
    * [Preventing an Effect from firing too often](_reference_react_useCallback.md#preventing-an-effect-from-firing-too-often)
    * [Optimizing a custom Hook](_reference_react_useCallback.md#optimizing-a-custom-hook)
* [Troubleshooting](_reference_react_useCallback.md#troubleshooting)
    * [Every time my component renders, `useCallback` returns a different function](_reference_react_useCallback.md#every-time-my-component-renders-usecallback-returns-a-different-function)
    * [I need to call `useCallback` for each list item in a loop, but it’s not allowed](_reference_react_useCallback.md#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)

* * *

## Reference

### `useCallback(fn, dependencies)`

Call `useCallback` at the top level of your component to cache a function definition between re-renders:
```
import { useCallback } from 'react';

export default function ProductPage({ productId, referrer, theme }) {

const handleSubmit = useCallback((orderDetails) => {

post('/product/' + productId + '/buy', {

referrer,

orderDetails,

});

}, [productId, referrer]);
```
[See more examples below.](_reference_react_useCallback.md#usage)

#### Parameters

*   `fn`: The function value that you want to cache. It can take any arguments and return any values. React will return (not call!) your function back to you during the initial render. On next renders, React will give you the same function again if the `dependencies` have not changed since the last render. Otherwise, it will give you the function that you have passed during the current render, and store it in case it can be reused later. React will not call your function. The function is returned to you so you can decide when and whether to call it.

*   `dependencies`: The list of all reactive values referenced inside of the `fn` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](_learn_editor-setup.md#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison algorithm.

#### Returns

On the initial render, `useCallback` returns the `fn` function you have passed.

During subsequent renders, it will either return an already stored `fn` function from the last render (if the dependencies haven’t changed), or return the `fn` function you have passed during this render.

#### Caveats

*   `useCallback` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
*   React **will not throw away the cached function unless there is a specific reason to do that.** For example, in development, React throws away the cache when you edit the file of your component. Both in development and in production, React will throw away the cache if your component suspends during the initial mount. In the future, React may add more features that take advantage of throwing away the cache—for example, if React adds built-in support for virtualized lists in the future, it would make sense to throw away the cache for items that scroll out of the virtualized table viewport. This should match your expectations if you rely on `useCallback` as a performance optimization. Otherwise, a [state variable](_reference_react_useState.md#im-trying-to-set-state-to-a-function-but-it-gets-called-instead) or a [ref](_reference_react_useRef.md#avoiding-recreating-the-ref-contents) may be more appropriate.

* * *

## Usage

### Skipping re-rendering of components

When you optimize rendering performance, you will sometimes need to cache the functions that you pass to child components. Let’s first look at the syntax for how to do this, and then see in which cases it’s useful.

To cache a function between re-renders of your component, wrap its definition into the `useCallback` Hook:
```
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {

const handleSubmit = useCallback((orderDetails) => {

post('/product/' + productId + '/buy', {

referrer,

orderDetails,

});

}, [productId, referrer]);

// ...
```
You need to pass two things to `useCallback`:

1.  A function definition that you want to cache between re-renders.
2.  A list of dependencies including every value within your component that’s used inside your function.

On the initial render, the returned function you’ll get from `useCallback` will be the function you passed.

On the following renders, React will compare the dependencies with the dependencies you passed during the previous render. If none of the dependencies have changed (compared with [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), `useCallback` will return the same function as before. Otherwise, `useCallback` will return the function you passed on _this_ render.

In other words, `useCallback` caches a function between re-renders until its dependencies change.

**Let’s walk through an example to see when this is useful.**

Say you’re passing a `handleSubmit` function down from the `ProductPage` to the `ShippingForm` component:
```
function ProductPage({ productId, referrer, theme }) {

// ...

return (

<ShippingForm onSubmit={handleSubmit} />

);
```
You’ve noticed that toggling the `theme` prop freezes the app for a moment, but if you remove `<ShippingForm />` from your JSX, it feels fast. This tells you that it’s worth trying to optimize the `ShippingForm` component.

**By default, when a component re-renders, React re-renders all of its children recursively.** This is why, when `ProductPage` re-renders with a different `theme`, the `ShippingForm` component _also_ re-renders. This is fine for components that don’t require much calculation to re-render. But if you verified a re-render is slow, you can tell `ShippingForm` to skip re-rendering when its props are the same as on last render by wrapping it in [`memo`:](_reference_react_memo.md)
```
import { memo } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {

// ...

});
```
**With this change, `ShippingForm` will skip re-rendering if all of its props are the _same_ as on the last render.** This is when caching a function becomes important! Let’s say you defined `handleSubmit` without `useCallback`:
```
function ProductPage({ productId, referrer, theme }) {

// Every time the theme changes, this will be a different function...

function handleSubmit(orderDetails) {

post('/product/' + productId + '/buy', {

referrer,

orderDetails,

});

}

return (

{/* ... so ShippingForm's props will never be the same, and it will re-render every time */}

<ShippingForm onSubmit={handleSubmit} />

);

}
```
**In JavaScript, a `function () {}` or `() => {}` always creates a _different_ function,** similar to how the `{}` object literal always creates a new object. Normally, this wouldn’t be a problem, but it means that `ShippingForm` props will never be the same, and your [`memo`](_reference_react_memo.md) optimization won’t work. This is where `useCallback` comes in handy:
```
function ProductPage({ productId, referrer, theme }) {

// Tell React to cache your function between re-renders...

const handleSubmit = useCallback((orderDetails) => {

post('/product/' + productId + '/buy', {

referrer,

orderDetails,

});

}, [productId, referrer]); // ...so as long as these dependencies don't change...

return (

{/* ...ShippingForm will receive the same props and can skip re-rendering */}

<ShippingForm onSubmit={handleSubmit} />

);

}
```
**By wrapping `handleSubmit` in `useCallback`, you ensure that it’s the _same_ function between the re-renders** (until dependencies change). You don’t _have to_ wrap a function in `useCallback` unless you do it for some specific reason. In this example, the reason is that you pass it to a component wrapped in [`memo`,](_reference_react_memo.md) and this lets it skip re-rendering. There are other reasons you might need `useCallback` which are described further on this page.

### Note

**You should only rely on `useCallback` as a performance optimization.** If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add `useCallback` back.

##### Deep Dive

You will often see [`useMemo`](_reference_react_useMemo.md) alongside `useCallback`. They are both useful when you’re trying to optimize a child component. They let you [memoize](https://en.wikipedia.org/wiki/Memoization) (or, in other words, cache) something you’re passing down:
```
import { useMemo, useCallback } from 'react';

function ProductPage({ productId, referrer }) {

const product = useData('/product/' + productId);

const requirements = useMemo(() => { // Calls your function and caches its result

return computeRequirements(product);

}, [product]);

const handleSubmit = useCallback((orderDetails) => { // Caches your function itself

post('/product/' + productId + '/buy', {

referrer,

orderDetails,

});

}, [productId, referrer]);

return (

<ShippingForm requirements={requirements} onSubmit={handleSubmit} />

);

}
```
The difference is in _what_ they’re letting you cache:

*   **[`useMemo`](_reference_react_useMemo.md) caches the _result_ of calling your function.** In this example, it caches the result of calling `computeRequirements(product)` so that it doesn’t change unless `product` has changed. This lets you pass the `requirements` object down without unnecessarily re-rendering `ShippingForm`. When necessary, React will call the function you’ve passed during rendering to calculate the result.
*   **`useCallback` caches _the function itself._** Unlike `useMemo`, it does not call the function you provide. Instead, it caches the function you provided so that `handleSubmit` _itself_ doesn’t change unless `productId` or `referrer` has changed. This lets you pass the `handleSubmit` function down without unnecessarily re-rendering `ShippingForm`. Your code won’t run until the user submits the form.

If you’re already familiar with [`useMemo`,](_reference_react_useMemo.md) you might find it helpful to think of `useCallback` as this:
```
// Simplified implementation (inside React)

function useCallback(fn, dependencies) {

return useMemo(() => fn, dependencies);

}
```
[Read more about the difference between `useMemo` and `useCallback`.](_reference_react_useMemo.md#memoizing-a-function)

##### Deep Dive

#### Should you add useCallback everywhere?

If your app is like this site, and most interactions are coarse (like replacing a page or an entire section), memoization is usually unnecessary. On the other hand, if your app is more like a drawing editor, and most interactions are granular (like moving shapes), then you might find memoization very helpful.

Caching a function with `useCallback` is only valuable in a few cases:

*   You pass it as a prop to a component wrapped in [`memo`.](_reference_react_memo.md) You want to skip re-rendering if the value hasn’t changed. Memoization lets your component re-render only if dependencies changed.
*   The function you’re passing is later used as a dependency of some Hook. For example, another function wrapped in `useCallback` depends on it, or you depend on this function from [`useEffect.`](_reference_react_useEffect.md)

There is no benefit to wrapping a function in `useCallback` in other cases. There is no significant harm to doing that either, so some teams choose to not think about individual cases, and memoize as much as possible. The downside is that code becomes less readable. Also, not all memoization is effective: a single value that’s “always new” is enough to break memoization for an entire component.

Note that `useCallback` does not prevent _creating_ the function. You’re always creating a function (and that’s fine!), but React ignores it and gives you back a cached function if nothing changed.

**In practice, you can make a lot of memoization unnecessary by following a few principles:**

1.  When a component visually wraps other components, let it [accept JSX as children.](_learn_passing-props-to-a-component.md#passing-jsx-as-children) Then, if the wrapper component updates its own state, React knows that its children don’t need to re-render.
2.  Prefer local state and don’t [lift state up](_learn_sharing-state-between-components.md) any further than necessary. Don’t keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
3.  Keep your [rendering logic pure.](_learn_keeping-components-pure.md) If re-rendering a component causes a problem or produces some noticeable visual artifact, it’s a bug in your component! Fix the bug instead of adding memoization.
4.  Avoid [unnecessary Effects that update state.](_learn_you-might-not-need-an-effect.md) Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
5.  Try to [remove unnecessary dependencies from your Effects.](_learn_removing-effect-dependencies.md) For example, instead of memoization, it’s often simpler to move some object or a function inside an Effect or outside the component.

If a specific interaction still feels laggy, [use the React Developer Tools profiler](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) to see which components benefit the most from memoization, and add memoization where needed. These principles make your components easier to debug and understand, so it’s good to follow them in any case. In long term, we’re researching [doing memoization automatically](https://www.youtube.com/watch?v=lGEMwh32soc) to solve this once and for all.

* * *

### Updating state from a memoized callback

Sometimes, you might need to update state based on previous state from a memoized callback.

This `handleAddTodo` function specifies `todos` as a dependency because it computes the next todos from it:
```
function TodoList() {

const [todos, setTodos] = useState([]);

const handleAddTodo = useCallback((text) => {

const newTodo = { id: nextId++, text };

setTodos([...todos, newTodo]);

}, [todos]);

// ...
```
You’ll usually want memoized functions to have as few dependencies as possible. When you read some state only to calculate the next state, you can remove that dependency by passing an [updater function](_reference_react_useState.md#updating-state-based-on-the-previous-state) instead:
```
function TodoList() {

const [todos, setTodos] = useState([]);

const handleAddTodo = useCallback((text) => {

const newTodo = { id: nextId++, text };

setTodos(todos => [...todos, newTodo]);

}, []); // ✅ No need for the todos dependency

// ...
```
Here, instead of making `todos` a dependency and reading it inside, you pass an instruction about _how_ to update the state (`todos => [...todos, newTodo]`) to React. [Read more about updater functions.](_reference_react_useState.md#updating-state-based-on-the-previous-state)

* * *

### Preventing an Effect from firing too often

Sometimes, you might want to call a function from inside an [Effect:](_learn_synchronizing-with-effects.md)
```
function ChatRoom({ roomId }) {

const [message, setMessage] = useState('');

function createOptions() {

return {

serverUrl: 'https://localhost:1234',

roomId: roomId

};

}

useEffect(() => {

const options = createOptions();

const connection = createConnection(options);

connection.connect();

// ...
```
This creates a problem. [Every reactive value must be declared as a dependency of your Effect.](_learn_lifecycle-of-reactive-effects.md#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) However, if you declare `createOptions` as a dependency, it will cause your Effect to constantly reconnect to the chat room:
```
useEffect(() => {

const options = createOptions();

const connection = createConnection(options);

connection.connect();

return () => connection.disconnect();

}, [createOptions]); // 🔴 Problem: This dependency changes on every render

// ...
```
To solve this, you can wrap the function you need to call from an Effect into `useCallback`:
```
function ChatRoom({ roomId }) {

const [message, setMessage] = useState('');

const createOptions = useCallback(() => {

return {

serverUrl: 'https://localhost:1234',

roomId: roomId

};

}, [roomId]); // ✅ Only changes when roomId changes

useEffect(() => {

const options = createOptions();

const connection = createConnection(options);

connection.connect();

return () => connection.disconnect();

}, [createOptions]); // ✅ Only changes when createOptions changes

// ...
```
This ensures that the `createOptions` function is the same between re-renders if the `roomId` is the same. **However, it’s even better to remove the need for a function dependency.** Move your function _inside_ the Effect:
```
function ChatRoom({ roomId }) {

const [message, setMessage] = useState('');

useEffect(() => {

function createOptions() { // ✅ No need for useCallback or function dependencies!

return {

serverUrl: 'https://localhost:1234',

roomId: roomId

};

}

const options = createOptions();

const connection = createConnection(options);

connection.connect();

return () => connection.disconnect();

}, [roomId]); // ✅ Only changes when roomId changes

// ...
```
Now your code is simpler and doesn’t need `useCallback`. [Learn more about removing Effect dependencies.](_learn_removing-effect-dependencies.md#move-dynamic-objects-and-functions-inside-your-effect)

* * *

### Optimizing a custom Hook

If you’re writing a [custom Hook,](_learn_reusing-logic-with-custom-hooks.md) it’s recommended to wrap any functions that it returns into `useCallback`:
```
function useRouter() {

const { dispatch } = useContext(RouterStateContext);

const navigate = useCallback((url) => {

dispatch({ type: 'navigate', url });

}, [dispatch]);

const goBack = useCallback(() => {

dispatch({ type: 'back' });

}, [dispatch]);

return {

navigate,

goBack,

};

}
```
This ensures that the consumers of your Hook can optimize their own code when needed.

* * *

## Troubleshooting

### Every time my component renders, `useCallback` returns a different function

Make sure you’ve specified the dependency array as a second argument!

If you forget the dependency array, `useCallback` will return a new function every time:
```
function ProductPage({ productId, referrer }) {

const handleSubmit = useCallback((orderDetails) => {

post('/product/' + productId + '/buy', {

referrer,

orderDetails,

});

}); // 🔴 Returns a new function every time: no dependency array

// ...
```
This is the corrected version passing the dependency array as a second argument:
```
function ProductPage({ productId, referrer }) {

const handleSubmit = useCallback((orderDetails) => {

post('/product/' + productId + '/buy', {

referrer,

orderDetails,

});

}, [productId, referrer]); // ✅ Does not return a new function unnecessarily

// ...
```
If this doesn’t help, then the problem is that at least one of your dependencies is different from the previous render. You can debug this problem by manually logging your dependencies to the console:
```
const handleSubmit = useCallback((orderDetails) => {

// ..

}, [productId, referrer]);

console.log([productId, referrer]);
```
You can then right-click on the arrays from different re-renders in the console and select “Store as a global variable” for both of them. Assuming the first one got saved as `temp1` and the second one got saved as `temp2`, you can then use the browser console to check whether each dependency in both arrays is the same:
```
Object.is(temp1[0], temp2[0]); // Is the first dependency the same between the arrays?

Object.is(temp1[1], temp2[1]); // Is the second dependency the same between the arrays?

Object.is(temp1[2], temp2[2]); // ... and so on for every dependency ...
```
When you find which dependency is breaking memoization, either find a way to remove it, or [memoize it as well.](_reference_react_useMemo.md#memoizing-a-dependency-of-another-hook)

* * *

### I need to call `useCallback` for each list item in a loop, but it’s not allowed

Suppose the `Chart` component is wrapped in [`memo`](_reference_react_memo.md). You want to skip re-rendering every `Chart` in the list when the `ReportList` component re-renders. However, you can’t call `useCallback` in a loop:
```
function ReportList({ items }) {

return (

<article>

{items.map(item => {

// 🔴 You can't call useCallback in a loop like this:

const handleClick = useCallback(() => {

sendReport(item)

}, [item]);

return (

<figure key={item.id}>

<Chart onClick={handleClick} />

</figure>

);

})}

</article>

);

}
```
Instead, extract a component for an individual item, and put `useCallback` there:
```
function ReportList({ items }) {

return (

<article>

{items.map(item =>

<Report key={item.id} item={item} />

)}

</article>

);

}

function Report({ item }) {

// ✅ Call useCallback at the top level:

const handleClick = useCallback(() => {

sendReport(item)

}, [item]);

return (

<figure>

<Chart onClick={handleClick} />

</figure>

);

}
```
Alternatively, you could remove `useCallback` in the last snippet and instead wrap `Report` itself in [`memo`.](_reference_react_memo.md) If the `item` prop does not change, `Report` will skip re-rendering, so `Chart` will skip re-rendering too:
```
function ReportList({ items }) {

// ...

}

const Report = memo(function Report({ item }) {

function handleClick() {

sendReport(item);

}

return (

<figure>

<Chart onClick={handleClick} />

</figure>

);

});
```

#### _reference_react_useContext.md

> Source: https://react.dev/reference/react/useContext
> Scraped: 12/20/2025, 10:40:54 PM

`useContext` is a React Hook that lets you read and subscribe to [context](_learn_passing-data-deeply-with-context.md) from your component.
```
const value = useContext(SomeContext)
```
* [Reference](_reference_react_useContext.md#reference)
    * [`useContext(SomeContext)`](_reference_react_useContext.md#usecontext)
* [Usage](_reference_react_useContext.md#usage)
    * [Passing data deeply into the tree](_reference_react_useContext.md#passing-data-deeply-into-the-tree)
    * [Updating data passed via context](_reference_react_useContext.md#updating-data-passed-via-context)
    * [Specifying a fallback default value](_reference_react_useContext.md#specifying-a-fallback-default-value)
    * [Overriding context for a part of the tree](_reference_react_useContext.md#overriding-context-for-a-part-of-the-tree)
    * [Optimizing re-renders when passing objects and functions](_reference_react_useContext.md#optimizing-re-renders-when-passing-objects-and-functions)
* [Troubleshooting](_reference_react_useContext.md#troubleshooting)
    * [My component doesn’t see the value from my provider](_reference_react_useContext.md#my-component-doesnt-see-the-value-from-my-provider)
    * [I am always getting `undefined` from my context although the default value is different](_reference_react_useContext.md#i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different)

* * *

## Reference

### `useContext(SomeContext)`

Call `useContext` at the top level of your component to read and subscribe to [context.](_learn_passing-data-deeply-with-context.md)
```
import { useContext } from 'react';

function MyComponent() {

const theme = useContext(ThemeContext);

// ...
```
[See more examples below.](_reference_react_useContext.md#usage)

#### Parameters

*   `SomeContext`: The context that you’ve previously created with [`createContext`](_reference_react_createContext.md). The context itself does not hold the information, it only represents the kind of information you can provide or read from components.

#### Returns

`useContext` returns the context value for the calling component. It is determined as the `value` passed to the closest `SomeContext` above the calling component in the tree. If there is no such provider, then the returned value will be the `defaultValue` you have passed to [`createContext`](_reference_react_createContext.md) for that context. The returned value is always up-to-date. React automatically re-renders components that read some context if it changes.

#### Caveats

*   `useContext()` call in a component is not affected by providers returned from the _same_ component. The corresponding `<Context>` **needs to be _above_** the component doing the `useContext()` call.
*   React **automatically re-renders** all the children that use a particular context starting from the provider that receives a different `value`. The previous and the next values are compared with the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. Skipping re-renders with [`memo`](_reference_react_memo.md) does not prevent the children receiving fresh context values.
*   If your build system produces duplicates modules in the output (which can happen with symlinks), this can break context. Passing something via context only works if `SomeContext` that you use to provide context and `SomeContext` that you use to read it are **_exactly_ the same object**, as determined by a `===` comparison.

* * *

## Usage

### Passing data deeply into the tree

Call `useContext` at the top level of your component to read and subscribe to [context.](_learn_passing-data-deeply-with-context.md)
```
import { useContext } from 'react';

function Button() {

const theme = useContext(ThemeContext);

// ...
```
`useContext` returns the context value for the context you passed. To determine the context value, React searches the component tree and finds **the closest context provider above** for that particular context.

To pass context to a `Button`, wrap it or one of its parent components into the corresponding context provider:
```
function MyPage() {

return (

<Form />

);

}

function Form() {

// ... renders buttons inside ...

}
```
It doesn’t matter how many layers of components there are between the provider and the `Button`. When a `Button` _anywhere_ inside of `Form` calls `useContext(ThemeContext)`, it will receive `"dark"` as the value.

### Pitfall

`useContext()` always looks for the closest provider _above_ the component that calls it. It searches upwards and **does not** consider providers in the component from which you’re calling `useContext()`.
```
import { createContext, useContext } from 'react';
const ThemeContext = createContext(null);
export default function MyApp() {
  return (

      <Form />

  )
}
function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}
function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}
function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```
* * *

### Updating data passed via context

Often, you’ll want the context to change over time. To update context, combine it with [state.](_reference_react_useState.md) Declare a state variable in the parent component, and pass the current state down as the context value to the provider.
```
function MyPage() {

const [theme, setTheme] = useState('dark');

return (

<Form />

<Button onClick={() => {

setTheme('light');

}}>

        Switch to light theme

</Button>

);

}
```
Now any `Button` inside of the provider will receive the current `theme` value. If you call `setTheme` to update the `theme` value that you pass to the provider, all `Button` components will re-render with the new `'light'` value.

#### Examples of updating context

#### Updating a value via context

In this example, the `MyApp` component holds a state variable which is then passed to the `ThemeContext` provider. Checking the “Dark mode” checkbox updates the state. Changing the provided value re-renders all the components using that context.
```
import { createContext, useContext, useState } from 'react';
const ThemeContext = createContext(null);
export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (

      <Form />
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label>

  )
}
function Form({ children }) {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}
function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}
function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```
Note that `value="dark"` passes the `"dark"` string, but `value={theme}` passes the value of the JavaScript `theme` variable with [JSX curly braces.](_learn_javascript-in-jsx-with-curly-braces.md) Curly braces also let you pass context values that aren’t strings.

* * *

### Specifying a fallback default value

If React can’t find any providers of that particular context in the parent tree, the context value returned by `useContext()` will be equal to the default value that you specified when you [created that context](_reference_react_createContext.md):
```
const ThemeContext = createContext(null);
```
The default value **never changes**. If you want to update context, use it with state as [described above.](_reference_react_useContext.md#updating-data-passed-via-context)

Often, instead of `null`, there is some more meaningful value you can use as a default, for example:
```
const ThemeContext = createContext('light');
```
This way, if you accidentally render some component without a corresponding provider, it won’t break. This also helps your components work well in a test environment without setting up a lot of providers in the tests.

In the example below, the “Toggle theme” button is always light because it’s **outside any theme context provider** and the default context theme value is `'light'`. Try editing the default theme to be `'dark'`.
```
import { createContext, useContext, useState } from 'react';
const ThemeContext = createContext('light');
export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <>

        <Form />

      <Button onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}>
        Toggle theme
      </Button>
    </>
  )
}
function Form({ children }) {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}
function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}
function Button({ children, onClick }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
```
* * *

### Overriding context for a part of the tree

You can override the context for a part of the tree by wrapping that part in a provider with a different value.
```
  ...

<Footer />

  ...
```
You can nest and override providers as many times as you need.

#### Examples of overriding context

#### Overriding a theme

Here, the button _inside_ the `Footer` receives a different context value (`"light"`) than the buttons outside (`"dark"`).
```
import { createContext, useContext } from 'react';
const ThemeContext = createContext(null);
export default function MyApp() {
  return (

      <Form />

  )
}
function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>

        <Footer />

    </Panel>
  );
}
function Footer() {
  return (
    <footer>
      <Button>Settings</Button>
    </footer>
  );
}
function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      {title && <h1>{title}</h1>}
      {children}
    </section>
  )
}
function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```
* * *

### Optimizing re-renders when passing objects and functions

You can pass any values via context, including objects and functions.
```
function MyApp() {

const [currentUser, setCurrentUser] = useState(null);

function login(response) {

storeCredentials(response.credentials);

setCurrentUser(response.user);

}

return (

<AuthContext value={{ currentUser, login }}>

<Page />

</AuthContext>

);

}
```
Here, the context value is a JavaScript object with two properties, one of which is a function. Whenever `MyApp` re-renders (for example, on a route update), this will be a _different_ object pointing at a _different_ function, so React will also have to re-render all components deep in the tree that call `useContext(AuthContext)`.

In smaller apps, this is not a problem. However, there is no need to re-render them if the underlying data, like `currentUser`, has not changed. To help React take advantage of that fact, you may wrap the `login` function with [`useCallback`](_reference_react_useCallback.md) and wrap the object creation into [`useMemo`](_reference_react_useMemo.md). This is a performance optimization:
```
import { useCallback, useMemo } from 'react';

function MyApp() {

const [currentUser, setCurrentUser] = useState(null);

const login = useCallback((response) => {

storeCredentials(response.credentials);

setCurrentUser(response.user);

}, []);

const contextValue = useMemo(() => ({

currentUser,

login

}), [currentUser, login]);

return (

<AuthContext value={contextValue}>

<Page />

</AuthContext>

);

}
```
As a result of this change, even if `MyApp` needs to re-render, the components calling `useContext(AuthContext)` won’t need to re-render unless `currentUser` has changed.

Read more about [`useMemo`](_reference_react_useMemo.md#skipping-re-rendering-of-components) and [`useCallback`.](_reference_react_useCallback.md#skipping-re-rendering-of-components)

* * *

## Troubleshooting

### My component doesn’t see the value from my provider

There are a few common ways that this can happen:

1.  You’re rendering `<SomeContext>` in the same component (or below) as where you’re calling `useContext()`. Move `<SomeContext>` _above and outside_ the component calling `useContext()`.
2.  You may have forgotten to wrap your component with `<SomeContext>`, or you might have put it in a different part of the tree than you thought. Check whether the hierarchy is right using [React DevTools.](_learn_react-developer-tools.md)
3.  You might be running into some build issue with your tooling that causes `SomeContext` as seen from the providing component and `SomeContext` as seen by the reading component to be two different objects. This can happen if you use symlinks, for example. You can verify this by assigning them to globals like `window.SomeContext1` and `window.SomeContext2` and then checking whether `window.SomeContext1 === window.SomeContext2` in the console. If they’re not the same, fix that issue on the build tool level.

### I am always getting `undefined` from my context although the default value is different

You might have a provider without a `value` in the tree:
```
// 🚩 Doesn't work: no value prop

<Button />
```
If you forget to specify `value`, it’s like passing `value={undefined}`.

You may have also mistakingly used a different prop name by mistake:
```
// 🚩 Doesn't work: prop should be called "value"

<Button />
```
In both of these cases you should see a warning from React in the console. To fix them, call the prop `value`:
```
// ✅ Passing the value prop

<Button />
```
Note that the [default value from your `createContext(defaultValue)` call](_reference_react_useContext.md#specifying-a-fallback-default-value) is only used **if there is no matching provider above at all.** If there is a `<SomeContext value={undefined}>` component somewhere in the parent tree, the component calling `useContext(SomeContext)` _will_ receive `undefined` as the context value.

#### _reference_react_useDebugValue.md

> Source: https://react.dev/reference/react/useDebugValue
> Scraped: 12/20/2025, 10:40:53 PM

`useDebugValue` is a React Hook that lets you add a label to a custom Hook in [React DevTools.](_learn_react-developer-tools.md)
```
useDebugValue(value, format?)
```
* [Reference](_reference_react_useDebugValue.md#reference)
    * [`useDebugValue(value, format?)`](_reference_react_useDebugValue.md#usedebugvalue)
* [Usage](_reference_react_useDebugValue.md#usage)
    * [Adding a label to a custom Hook](_reference_react_useDebugValue.md#adding-a-label-to-a-custom-hook)
    * [Deferring formatting of a debug value](_reference_react_useDebugValue.md#deferring-formatting-of-a-debug-value)

* * *

## Reference

### `useDebugValue(value, format?)`

Call `useDebugValue` at the top level of your [custom Hook](_learn_reusing-logic-with-custom-hooks.md) to display a readable debug value:
```
import { useDebugValue } from 'react';

function useOnlineStatus() {

// ...

useDebugValue(isOnline ? 'Online' : 'Offline');

// ...

}
```
[See more examples below.](_reference_react_useDebugValue.md#usage)

#### Parameters

*   `value`: The value you want to display in React DevTools. It can have any type.
*   **optional** `format`: A formatting function. When the component is inspected, React DevTools will call the formatting function with the `value` as the argument, and then display the returned formatted value (which may have any type). If you don’t specify the formatting function, the original `value` itself will be displayed.

#### Returns

`useDebugValue` does not return anything.

## Usage

### Adding a label to a custom Hook

Call `useDebugValue` at the top level of your [custom Hook](_learn_reusing-logic-with-custom-hooks.md) to display a readable debug value for [React DevTools.](_learn_react-developer-tools.md)
```
import { useDebugValue } from 'react';

function useOnlineStatus() {

// ...

useDebugValue(isOnline ? 'Online' : 'Offline');

// ...

}
```
This gives components calling `useOnlineStatus` a label like `OnlineStatus: "Online"` when you inspect them:

![A screenshot of React DevTools showing the debug value](https://react.dev/images/docs/react-devtools-usedebugvalue.png)

Without the `useDebugValue` call, only the underlying data (in this example, `true`) would be displayed.
```
import { useSyncExternalStore, useDebugValue } from 'react';
export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
```
### Note

Don’t add debug values to every custom Hook. It’s most valuable for custom Hooks that are part of shared libraries and that have a complex internal data structure that’s difficult to inspect.

* * *

### Deferring formatting of a debug value

You can also pass a formatting function as the second argument to `useDebugValue`:
```
useDebugValue(date, date => date.toDateString());
```
Your formatting function will receive the debug value as a parameter and should return a formatted display value. When your component is inspected, React DevTools will call this function and display its result.

This lets you avoid running potentially expensive formatting logic unless the component is actually inspected. For example, if `date` is a Date value, this avoids calling `toDateString()` on it for every render.

#### _reference_react_useDeferredValue.md

> Source: https://react.dev/reference/react/useDeferredValue
> Scraped: 12/20/2025, 10:40:54 PM

`useDeferredValue` is a React Hook that lets you defer updating a part of the UI.
```
const deferredValue = useDeferredValue(value)
```
* [Reference](_reference_react_useDeferredValue.md#reference)
    * [`useDeferredValue(value, initialValue?)`](_reference_react_useDeferredValue.md#usedeferredvalue)
* [Usage](_reference_react_useDeferredValue.md#usage)
    * [Showing stale content while fresh content is loading](_reference_react_useDeferredValue.md#showing-stale-content-while-fresh-content-is-loading)
    * [Indicating that the content is stale](_reference_react_useDeferredValue.md#indicating-that-the-content-is-stale)
    * [Deferring re-rendering for a part of the UI](_reference_react_useDeferredValue.md#deferring-re-rendering-for-a-part-of-the-ui)

* * *

## Reference

### `useDeferredValue(value, initialValue?)`

Call `useDeferredValue` at the top level of your component to get a deferred version of that value.
```
import { useState, useDeferredValue } from 'react';

function SearchPage() {

const [query, setQuery] = useState('');

const deferredQuery = useDeferredValue(query);

// ...

}
```
[See more examples below.](_reference_react_useDeferredValue.md#usage)

#### Parameters

*   `value`: The value you want to defer. It can have any type.
*   **optional** `initialValue`: A value to use during the initial render of a component. If this option is omitted, `useDeferredValue` will not defer during the initial render, because there’s no previous version of `value` that it can render instead.

#### Returns

*   `currentValue`: During the initial render, the returned deferred value will be the `initialValue`, or the same as the value you provided. During updates, React will first attempt a re-render with the old value (so it will return the old value), and then try another re-render in the background with the new value (so it will return the updated value).

#### Caveats

*   When an update is inside a Transition, `useDeferredValue` always returns the new `value` and does not spawn a deferred render, since the update is already deferred.

*   The values you pass to `useDeferredValue` should either be primitive values (like strings and numbers) or objects created outside of rendering. If you create a new object during rendering and immediately pass it to `useDeferredValue`, it will be different on every render, causing unnecessary background re-renders.

*   When `useDeferredValue` receives a different value (compared with [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), in addition to the current render (when it still uses the previous value), it schedules a re-render in the background with the new value. The background re-render is interruptible: if there’s another update to the `value`, React will restart the background re-render from scratch. For example, if the user is typing into an input faster than a chart receiving its deferred value can re-render, the chart will only re-render after the user stops typing.

*   `useDeferredValue` is integrated with [`<Suspense>`.](_reference_react_Suspense.md) If the background update caused by a new value suspends the UI, the user will not see the fallback. They will see the old deferred value until the data loads.

*   `useDeferredValue` does not by itself prevent extra network requests.

*   There is no fixed delay caused by `useDeferredValue` itself. As soon as React finishes the original re-render, React will immediately start working on the background re-render with the new deferred value. Any updates caused by events (like typing) will interrupt the background re-render and get prioritized over it.

*   The background re-render caused by `useDeferredValue` does not fire Effects until it’s committed to the screen. If the background re-render suspends, its Effects will run after the data loads and the UI updates.

* * *

## Usage

### Showing stale content while fresh content is loading

Call `useDeferredValue` at the top level of your component to defer updating some part of your UI.
```
import { useState, useDeferredValue } from 'react';

function SearchPage() {

const [query, setQuery] = useState('');

const deferredQuery = useDeferredValue(query);

// ...

}
```
During the initial render, the deferred value will be the same as the value you provided.

During updates, the deferred value will “lag behind” the latest value. In particular, React will first re-render _without_ updating the deferred value, and then try to re-render with the newly received value in the background.

**Let’s walk through an example to see when this is useful.**

### Note

In this example, the `SearchResults` component [suspends](_reference_react_Suspense.md#displaying-a-fallback-while-content-is-loading) while fetching the search results. Try typing `"a"`, waiting for the results, and then editing it to `"ab"`. The results for `"a"` get replaced by the loading fallback.
```
import { Suspense, useState } from 'react';
import SearchResults from './SearchResults.js';
export default function App() {
  const [query, setQuery] = useState('');
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={query} />
      </Suspense>
    </>
  );
}
```
A common alternative UI pattern is to _defer_ updating the list of results and to keep showing the previous results until the new results are ready. Call `useDeferredValue` to pass a deferred version of the query down:
```
export default function App() {

const [query, setQuery] = useState('');

const deferredQuery = useDeferredValue(query);

return (

<>

<label>

        Search albums:

<input value={query} onChange={e => setQuery(e.target.value)} />

</label>

<Suspense fallback={<h2>Loading...</h2>}>

<SearchResults query={deferredQuery} />

</Suspense>

</>

);

}
```
The `query` will update immediately, so the input will display the new value. However, the `deferredQuery` will keep its previous value until the data has loaded, so `SearchResults` will show the stale results for a bit.

Enter `"a"` in the example below, wait for the results to load, and then edit the input to `"ab"`. Notice how instead of the Suspense fallback, you now see the stale result list until the new results have loaded:
```
import { Suspense, useState, useDeferredValue } from 'react';
import SearchResults from './SearchResults.js';
export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```
##### Deep Dive

#### How does deferring a value work under the hood?

You can think of it as happening in two steps:

1.  **First, React re-renders with the new `query` (`"ab"`) but with the old `deferredQuery` (still `"a"`).** The `deferredQuery` value, which you pass to the result list, is _deferred:_ it “lags behind” the `query` value.

2.  **In the background, React tries to re-render with _both_ `query` and `deferredQuery` updated to `"ab"`.** If this re-render completes, React will show it on the screen. However, if it suspends (the results for `"ab"` have not loaded yet), React will abandon this rendering attempt, and retry this re-render again after the data has loaded. The user will keep seeing the stale deferred value until the data is ready.

The deferred “background” rendering is interruptible. For example, if you type into the input again, React will abandon it and restart with the new value. React will always use the latest provided value.

Note that there is still a network request per each keystroke. What’s being deferred here is displaying results (until they’re ready), not the network requests themselves. Even if the user continues typing, responses for each keystroke get cached, so pressing Backspace is instant and doesn’t fetch again.

* * *

### Indicating that the content is stale

In the example above, there is no indication that the result list for the latest query is still loading. This can be confusing to the user if the new results take a while to load. To make it more obvious to the user that the result list does not match the latest query, you can add a visual indication when the stale result list is displayed:
```
<SearchResults query={deferredQuery} />
```
With this change, as soon as you start typing, the stale result list gets slightly dimmed until the new result list loads. You can also add a CSS transition to delay dimming so that it feels gradual, like in the example below:
```
import { Suspense, useState, useDeferredValue } from 'react';
import SearchResults from './SearchResults.js';
export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>

          <SearchResults query={deferredQuery} />

      </Suspense>
    </>
  );
}
```
* * *

### Deferring re-rendering for a part of the UI

You can also apply `useDeferredValue` as a performance optimization. It is useful when a part of your UI is slow to re-render, there’s no easy way to optimize it, and you want to prevent it from blocking the rest of the UI.

Imagine you have a text field and a component (like a chart or a long list) that re-renders on every keystroke:
```
function App() {

const [text, setText] = useState('');

return (

<>

<input value={text} onChange={e => setText(e.target.value)} />

<SlowList text={text} />

</>

);

}
```
First, optimize `SlowList` to skip re-rendering when its props are the same. To do this, [wrap it in `memo`:](_reference_react_memo.md#skipping-re-rendering-when-props-are-unchanged)
```
const SlowList = memo(function SlowList({ text }) {

// ...

});
```
However, this only helps if the `SlowList` props are _the same_ as during the previous render. The problem you’re facing now is that it’s slow when they’re _different,_ and when you actually need to show different visual output.

Concretely, the main performance problem is that whenever you type into the input, the `SlowList` receives new props, and re-rendering its entire tree makes the typing feel janky. In this case, `useDeferredValue` lets you prioritize updating the input (which must be fast) over updating the result list (which is allowed to be slower):
```
function App() {

const [text, setText] = useState('');

const deferredText = useDeferredValue(text);

return (

<>

<input value={text} onChange={e => setText(e.target.value)} />

<SlowList text={deferredText} />

</>

);

}
```
This does not make re-rendering of the `SlowList` faster. However, it tells React that re-rendering the list can be deprioritized so that it doesn’t block the keystrokes. The list will “lag behind” the input and then “catch up”. Like before, React will attempt to update the list as soon as possible, but will not block the user from typing.

#### The difference between useDeferredValue and unoptimized re-rendering

#### Deferred re-rendering of the list

In this example, each item in the `SlowList` component is **artificially slowed down** so that you can see how `useDeferredValue` lets you keep the input responsive. Type into the input and notice that typing feels snappy while the list “lags behind” it.

### Pitfall

This optimization requires `SlowList` to be wrapped in [`memo`.](_reference_react_memo.md) This is because whenever the `text` changes, React needs to be able to re-render the parent component quickly. During that re-render, `deferredText` still has its previous value, so `SlowList` is able to skip re-rendering (its props have not changed). Without [`memo`,](_reference_react_memo.md) it would have to re-render anyway, defeating the point of the optimization.

##### Deep Dive

#### How is deferring a value different from debouncing and throttling?

There are two common optimization techniques you might have used before in this scenario:

*   _Debouncing_ means you’d wait for the user to stop typing (e.g. for a second) before updating the list.
*   _Throttling_ means you’d update the list every once in a while (e.g. at most once a second).

While these techniques are helpful in some cases, `useDeferredValue` is better suited to optimizing rendering because it is deeply integrated with React itself and adapts to the user’s device.

Unlike debouncing or throttling, it doesn’t require choosing any fixed delay. If the user’s device is fast (e.g. powerful laptop), the deferred re-render would happen almost immediately and wouldn’t be noticeable. If the user’s device is slow, the list would “lag behind” the input proportionally to how slow the device is.

Also, unlike with debouncing or throttling, deferred re-renders done by `useDeferredValue` are interruptible by default. This means that if React is in the middle of re-rendering a large list, but the user makes another keystroke, React will abandon that re-render, handle the keystroke, and then start rendering in the background again. By contrast, debouncing and throttling still produce a janky experience because they’re _blocking:_ they merely postpone the moment when rendering blocks the keystroke.

If the work you’re optimizing doesn’t happen during rendering, debouncing and throttling are still useful. For example, they can let you fire fewer network requests. You can also use these techniques together.

#### _reference_react_useEffect.md

> Source: https://react.dev/reference/react/useEffect
> Scraped: 12/20/2025, 10:40:56 PM

`useEffect` is a React Hook that lets you [synchronize a component with an external system.](_learn_synchronizing-with-effects.md)
```
useEffect(setup, dependencies?)
```
* [Reference](_reference_react_useEffect.md#reference)
    * [`useEffect(setup, dependencies?)`](_reference_react_useEffect.md#useeffect)
* [Usage](_reference_react_useEffect.md#usage)
    * [Connecting to an external system](_reference_react_useEffect.md#connecting-to-an-external-system)
    * [Wrapping Effects in custom Hooks](_reference_react_useEffect.md#wrapping-effects-in-custom-hooks)
    * [Controlling a non-React widget](_reference_react_useEffect.md#controlling-a-non-react-widget)
    * [Fetching data with Effects](_reference_react_useEffect.md#fetching-data-with-effects)
    * [Specifying reactive dependencies](_reference_react_useEffect.md#specifying-reactive-dependencies)
    * [Updating state based on previous state from an Effect](_reference_react_useEffect.md#updating-state-based-on-previous-state-from-an-effect)
    * [Removing unnecessary object dependencies](_reference_react_useEffect.md#removing-unnecessary-object-dependencies)
    * [Removing unnecessary function dependencies](_reference_react_useEffect.md#removing-unnecessary-function-dependencies)
    * [Reading the latest props and state from an Effect](_reference_react_useEffect.md#reading-the-latest-props-and-state-from-an-effect)
    * [Displaying different content on the server and the client](_reference_react_useEffect.md#displaying-different-content-on-the-server-and-the-client)
* [Troubleshooting](_reference_react_useEffect.md#troubleshooting)
    * [My Effect runs twice when the component mounts](_reference_react_useEffect.md#my-effect-runs-twice-when-the-component-mounts)
    * [My Effect runs after every re-render](_reference_react_useEffect.md#my-effect-runs-after-every-re-render)
    * [My Effect keeps re-running in an infinite cycle](_reference_react_useEffect.md#my-effect-keeps-re-running-in-an-infinite-cycle)
    * [My cleanup logic runs even though my component didn’t unmount](_reference_react_useEffect.md#my-cleanup-logic-runs-even-though-my-component-didnt-unmount)
    * [My Effect does something visual, and I see a flicker before it runs](_reference_react_useEffect.md#my-effect-does-something-visual-and-i-see-a-flicker-before-it-runs)

* * *

## Reference

### `useEffect(setup, dependencies?)`

Call `useEffect` at the top level of your component to declare an Effect:
```
import { useState, useEffect } from 'react';

import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {

const [serverUrl, setServerUrl] = useState('https://localhost:1234');

useEffect(() => {

const connection = createConnection(serverUrl, roomId);

connection.connect();

return () => {

connection.disconnect();

};

}, [serverUrl, roomId]);

// ...

}
```
[See more examples below.](_reference_react_useEffect.md#usage)

#### Parameters

*   `setup`: The function with your Effect’s logic. Your setup function may also optionally return a _cleanup_ function. When your [component commits](_learn_render-and-commit.md#step-3-react-commits-changes-to-the-dom), React will run your setup function. After every commit with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. After your component is removed from the DOM, React will run your cleanup function.

*   **optional** `dependencies`: The list of all reactive values referenced inside of the `setup` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](_learn_editor-setup.md#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. If you omit this argument, your Effect will re-run after every commit of the component. [See the difference between passing an array of dependencies, an empty array, and no dependencies at all.](_reference_react_useEffect.md#examples-dependencies)

#### Returns

`useEffect` returns `undefined`.

#### Caveats

*   `useEffect` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.

*   If you’re **not trying to synchronize with some external system,** [you probably don’t need an Effect.](_learn_you-might-not-need-an-effect.md)

*   When Strict Mode is on, React will **run one extra development-only setup+cleanup cycle** before the first real setup. This is a stress-test that ensures that your cleanup logic “mirrors” your setup logic and that it stops or undoes whatever the setup is doing. If this causes a problem, [implement the cleanup function.](_learn_synchronizing-with-effects.md#how-to-handle-the-effect-firing-twice-in-development)

*   If some of your dependencies are objects or functions defined inside the component, there is a risk that they will **cause the Effect to re-run more often than needed.** To fix this, remove unnecessary [object](_reference_react_useEffect.md#removing-unnecessary-object-dependencies) and [function](_reference_react_useEffect.md#removing-unnecessary-function-dependencies) dependencies. You can also [extract state updates](_reference_react_useEffect.md#updating-state-based-on-previous-state-from-an-effect) and [non-reactive logic](_reference_react_useEffect.md#reading-the-latest-props-and-state-from-an-effect) outside of your Effect.

*   If your Effect wasn’t caused by an interaction (like a click), React will generally let the browser **paint the updated screen first before running your Effect.** If your Effect is doing something visual (for example, positioning a tooltip), and the delay is noticeable (for example, it flickers), replace `useEffect` with [`useLayoutEffect`.](_reference_react_useLayoutEffect.md)

*   If your Effect is caused by an interaction (like a click), **React may run your Effect before the browser paints the updated screen**. This ensures that the result of the Effect can be observed by the event system. Usually, this works as expected. However, if you must defer the work until after paint, such as an `alert()`, you can use `setTimeout`. See [reactwg/react-18/128](https://github.com/reactwg/react-18/discussions/128) for more information.

*   Even if your Effect was caused by an interaction (like a click), **React may allow the browser to repaint the screen before processing the state updates inside your Effect.** Usually, this works as expected. However, if you must block the browser from repainting the screen, you need to replace `useEffect` with [`useLayoutEffect`.](_reference_react_useLayoutEffect.md)

*   Effects **only run on the client.** They don’t run during server rendering.

* * *

## Usage

### Connecting to an external system

Some components need to stay connected to the network, some browser API, or a third-party library, while they are displayed on the page. These systems aren’t controlled by React, so they are called _external._

To [connect your component to some external system,](_learn_synchronizing-with-effects.md) call `useEffect` at the top level of your component:
```
import { useState, useEffect } from 'react';

import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {

const [serverUrl, setServerUrl] = useState('https://localhost:1234');

useEffect(() => {

const connection = createConnection(serverUrl, roomId);

connection.connect();

return () => {

connection.disconnect();

};

}, [serverUrl, roomId]);

// ...

}
```
You need to pass two arguments to `useEffect`:

1.  A _setup function_ with setup code that connects to that system.
    *   It should return a _cleanup function_ with cleanup code that disconnects from that system.
2.  A list of dependencies including every value from your component used inside of those functions.

**React calls your setup and cleanup functions whenever it’s necessary, which may happen multiple times:**

1.  Your setup code runs when your component is added to the page _(mounts)_.
2.  After every commit of your component where the dependencies have changed:
    *   First, your cleanup code runs with the old props and state.
    *   Then, your setup code runs with the new props and state.
3.  Your cleanup code runs one final time after your component is removed from the page _(unmounts)._

**Let’s illustrate this sequence for the example above.**

When the `ChatRoom` component above gets added to the page, it will connect to the chat room with the initial `serverUrl` and `roomId`. If either `serverUrl` or `roomId` change as a result of a commit (say, if the user picks a different chat room in a dropdown), your Effect will _disconnect from the previous room, and connect to the next one._ When the `ChatRoom` component is removed from the page, your Effect will disconnect one last time.

**To [help you find bugs,](_learn_synchronizing-with-effects.md#step-3-add-cleanup-if-needed) in development React runs setup and cleanup one extra time before the setup.** This is a stress-test that verifies your Effect’s logic is implemented correctly. If this causes visible issues, your cleanup function is missing some logic. The cleanup function should stop or undo whatever the setup function was doing. The rule of thumb is that the user shouldn’t be able to distinguish between the setup being called once (as in production) and a _setup_ → _cleanup_ → _setup_ sequence (as in development). [See common solutions.](_learn_synchronizing-with-effects.md#how-to-handle-the-effect-firing-twice-in-development)

**Try to [write every Effect as an independent process](_learn_lifecycle-of-reactive-effects.md#each-effect-represents-a-separate-synchronization-process) and [think about a single setup/cleanup cycle at a time.](_learn_lifecycle-of-reactive-effects.md#thinking-from-the-effects-perspective)** It shouldn’t matter whether your component is mounting, updating, or unmounting. When your cleanup logic correctly “mirrors” the setup logic, your Effect is resilient to running setup and cleanup as often as needed.

### Note

#### Examples of connecting to an external system

#### Connecting to a chat server

In this example, the `ChatRoom` component uses an Effect to stay connected to an external system defined in `chat.js`. Press “Open chat” to make the `ChatRoom` component appear. This sandbox runs in development mode, so there is an extra connect-and-disconnect cycle, as [explained here.](_learn_synchronizing-with-effects.md#step-3-add-cleanup-if-needed) Try changing the `roomId` and `serverUrl` using the dropdown and the input, and see how the Effect re-connects to the chat. Press “Close chat” to see the Effect disconnect one last time.
```
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);
  return (
    <>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}
export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
```
* * *

### Wrapping Effects in custom Hooks

Effects are an [“escape hatch”:](_learn_escape-hatches.md) you use them when you need to “step outside React” and when there is no better built-in solution for your use case. If you find yourself often needing to manually write Effects, it’s usually a sign that you need to extract some [custom Hooks](_learn_reusing-logic-with-custom-hooks.md) for common behaviors your components rely on.

For example, this `useChatRoom` custom Hook “hides” the logic of your Effect behind a more declarative API:
```
function useChatRoom({ serverUrl, roomId }) {

useEffect(() => {

const options = {

serverUrl: serverUrl,

roomId: roomId

};

const connection = createConnection(options);

connection.connect();

return () => connection.disconnect();

}, [roomId, serverUrl]);

}
```
Then you can use it from any component like this:
```
function ChatRoom({ roomId }) {

const [serverUrl, setServerUrl] = useState('https://localhost:1234');

useChatRoom({

roomId: roomId,

serverUrl: serverUrl

});

// ...
```
There are also many excellent custom Hooks for every purpose available in the React ecosystem.

[Learn more about wrapping Effects in custom Hooks.](_learn_reusing-logic-with-custom-hooks.md)

#### Examples of wrapping Effects in custom Hooks

#### Custom `useChatRoom` Hook

This example is identical to one of the [earlier examples,](_reference_react_useEffect.md#examples-connecting) but the logic is extracted to a custom Hook.
```
import { useState } from 'react';
import { useChatRoom } from './useChatRoom.js';
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });
  return (
    <>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}
export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
```
* * *

### Controlling a non-React widget

Sometimes, you want to keep an external system synchronized to some prop or state of your component.

For example, if you have a third-party map widget or a video player component written without React, you can use an Effect to call methods on it that make its state match the current state of your React component. This Effect creates an instance of a `MapWidget` class defined in `map-widget.js`. When you change the `zoomLevel` prop of the `Map` component, the Effect calls the `setZoom()` on the class instance to keep it synchronized:
```
import { useRef, useEffect } from 'react';
import { MapWidget } from './map-widget.js';
export default function Map({ zoomLevel }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current);
    }
    const map = mapRef.current;
    map.setZoom(zoomLevel);
  }, [zoomLevel]);
  return (

  );
}
```
In this example, a cleanup function is not needed because the `MapWidget` class manages only the DOM node that was passed to it. After the `Map` React component is removed from the tree, both the DOM node and the `MapWidget` class instance will be automatically garbage-collected by the browser JavaScript engine.

* * *

### Fetching data with Effects

You can use an Effect to fetch data for your component. Note that [if you use a framework,](_learn_creating-a-react-app.md#full-stack-frameworks) using your framework’s data fetching mechanism will be a lot more efficient than writing Effects manually.

If you want to fetch data from an Effect manually, your code might look like this:
```
import { useState, useEffect } from 'react';

import { fetchBio } from './api.js';

export default function Page() {

const [person, setPerson] = useState('Alice');

const [bio, setBio] = useState(null);

useEffect(() => {

let ignore = false;

setBio(null);

fetchBio(person).then(result => {

if (!ignore) {

setBio(result);

}

});

return () => {

ignore = true;

};

}, [person]);

// ...
```
Note the `ignore` variable which is initialized to `false`, and is set to `true` during cleanup. This ensures [your code doesn’t suffer from “race conditions”:](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect) network responses may arrive in a different order than you sent them.
```
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';
export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);
  useEffect(() => {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;
    }
  }, [person]);
  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p><i>{bio ?? 'Loading...'}</i></p>
    </>
  );
}
```
You can also rewrite using the [`async` / `await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) syntax, but you still need to provide a cleanup function:
```
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';
export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);
  useEffect(() => {
    async function startFetching() {
      setBio(null);
      const result = await fetchBio(person);
      if (!ignore) {
        setBio(result);
      }
    }
    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    }
  }, [person]);
  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p><i>{bio ?? 'Loading...'}</i></p>
    </>
  );
}
```
Writing data fetching directly in Effects gets repetitive and makes it difficult to add optimizations like caching and server rendering later. [It’s easier to use a custom Hook—either your own or maintained by the community.](_learn_reusing-logic-with-custom-hooks.md#when-to-use-custom-hooks)

##### Deep Dive

#### What are good alternatives to data fetching in Effects?

Writing `fetch` calls inside Effects is a [popular way to fetch data](https://www.robinwieruch.de/react-hooks-fetch-data/), especially in fully client-side apps. This is, however, a very manual approach and it has significant downsides:

*   **Effects don’t run on the server.** This means that the initial server-rendered HTML will only include a loading state with no data. The client computer will have to download all JavaScript and render your app only to discover that now it needs to load the data. This is not very efficient.
*   **Fetching directly in Effects makes it easy to create “network waterfalls”.** You render the parent component, it fetches some data, renders the child components, and then they start fetching their data. If the network is not very fast, this is significantly slower than fetching all data in parallel.
*   **Fetching directly in Effects usually means you don’t preload or cache data.** For example, if the component unmounts and then mounts again, it would have to fetch the data again.
*   **It’s not very ergonomic.** There’s quite a bit of boilerplate code involved when writing `fetch` calls in a way that doesn’t suffer from bugs like [race conditions.](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)

This list of downsides is not specific to React. It applies to fetching data on mount with any library. Like with routing, data fetching is not trivial to do well, so we recommend the following approaches:

*   **If you use a [framework](_learn_creating-a-react-app.md#full-stack-frameworks), use its built-in data fetching mechanism.** Modern React frameworks have integrated data fetching mechanisms that are efficient and don’t suffer from the above pitfalls.
*   **Otherwise, consider using or building a client-side cache.** Popular open source solutions include [TanStack Query](https://tanstack.com/query/latest/), [useSWR](https://swr.vercel.app/), and [React Router 6.4+.](https://beta.reactrouter.com/en/main/start/overview) You can build your own solution too, in which case you would use Effects under the hood but also add logic for deduplicating requests, caching responses, and avoiding network waterfalls (by preloading data or hoisting data requirements to routes).

You can continue fetching data directly in Effects if neither of these approaches suit you.

* * *

### Specifying reactive dependencies

**Notice that you can’t “choose” the dependencies of your Effect.** Every reactive value used by your Effect’s code must be declared as a dependency. Your Effect’s dependency list is determined by the surrounding code:
```
function ChatRoom({ roomId }) { // This is a reactive value

const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // This is a reactive value too

useEffect(() => {

const connection = createConnection(serverUrl, roomId); // This Effect reads these reactive values

connection.connect();

return () => connection.disconnect();

}, [serverUrl, roomId]); // ✅ So you must specify them as dependencies of your Effect

// ...

}
```
If either `serverUrl` or `roomId` change, your Effect will reconnect to the chat using the new values.

**[Reactive values](_learn_lifecycle-of-reactive-effects.md#effects-react-to-reactive-values) include props and all variables and functions declared directly inside of your component.** Since `roomId` and `serverUrl` are reactive values, you can’t remove them from the dependencies. If you try to omit them and [your linter is correctly configured for React,](_learn_editor-setup.md#linting) the linter will flag this as a mistake you need to fix:
```
function ChatRoom({ roomId }) {

const [serverUrl, setServerUrl] = useState('https://localhost:1234');

useEffect(() => {

const connection = createConnection(serverUrl, roomId);

connection.connect();

return () => connection.disconnect();

}, []); // 🔴 React Hook useEffect has missing dependencies: 'roomId' and 'serverUrl'

// ...

}
```
**To remove a dependency, you need to [“prove” to the linter that it _doesn’t need_ to be a dependency.](_learn_removing-effect-dependencies.md#removing-unnecessary-dependencies)** For example, you can move `serverUrl` out of your component to prove that it’s not reactive and won’t change on re-renders:
```
const serverUrl = 'https://localhost:1234'; // Not a reactive value anymore

function ChatRoom({ roomId }) {

useEffect(() => {

const connection = createConnection(serverUrl, roomId);

connection.connect();

return () => connection.disconnect();

}, [roomId]); // ✅ All dependencies declared

// ...

}
```
Now that `serverUrl` is not a reactive value (and can’t change on a re-render), it doesn’t need to be a dependency. **If your Effect’s code doesn’t use any reactive values, its dependency list should be empty (`[]`):**
```
const serverUrl = 'https://localhost:1234'; // Not a reactive value anymore

const roomId = 'music'; // Not a reactive value anymore

function ChatRoom() {

useEffect(() => {

const connection = createConnection(serverUrl, roomId);

connection.connect();

return () => connection.disconnect();

}, []); // ✅ All dependencies declared

// ...

}
```
[An Effect with empty dependencies](_learn_lifecycle-of-reactive-effects.md#what-an-effect-with-empty-dependencies-means) doesn’t re-run when any of your component’s props or state change.

### Pitfall

If you have an existing codebase, you might have some Effects that suppress the linter like this:
```
useEffect(() => {

// ...

// 🔴 Avoid suppressing the linter like this:

// eslint-ignore-next-line react-hooks/exhaustive-deps

}, []);
```
**When dependencies don’t match the code, there is a high risk of introducing bugs.** By suppressing the linter, you “lie” to React about the values your Effect depends on. [Instead, prove they’re unnecessary.](_learn_removing-effect-dependencies.md#removing-unnecessary-dependencies)

#### Examples of passing reactive dependencies

#### Passing a dependency array

If you specify the dependencies, your Effect runs **after the initial commit _and_ after commits with changed dependencies.**
```
useEffect(() => {

// ...

}, [a, b]); // Runs again if a or b are different
```
In the below example, `serverUrl` and `roomId` are [reactive values,](_learn_lifecycle-of-reactive-effects.md#effects-react-to-reactive-values) so they both must be specified as dependencies. As a result, selecting a different room in the dropdown or editing the server URL input causes the chat to re-connect. However, since `message` isn’t used in the Effect (and so it isn’t a dependency), editing the message doesn’t re-connect to the chat.
```
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  const [message, setMessage] = useState('');
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
  return (
    <>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
      <label>
        Your message:{' '}
        <input value={message} onChange={e => setMessage(e.target.value)} />
      </label>
    </>
  );
}
export default function App() {
  const [show, setShow] = useState(false);
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
        <button onClick={() => setShow(!show)}>
          {show ? 'Close chat' : 'Open chat'}
        </button>
      </label>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId}/>}
    </>
  );
}
```
* * *

### Updating state based on previous state from an Effect

When you want to update state based on previous state from an Effect, you might run into a problem:
```
function Counter() {

const [count, setCount] = useState(0);

useEffect(() => {

const intervalId = setInterval(() => {

setCount(count + 1); // You want to increment the counter every second...

}, 1000)

return () => clearInterval(intervalId);

}, [count]); // 🚩 ... but specifying `count` as a dependency always resets the interval.

// ...

}
```
Since `count` is a reactive value, it must be specified in the list of dependencies. However, that causes the Effect to cleanup and setup again every time the `count` changes. This is not ideal.

To fix this, [pass the `c => c + 1` state updater](_reference_react_useState.md#updating-state-based-on-the-previous-state) to `setCount`:

Now that you’re passing `c => c + 1` instead of `count + 1`, [your Effect no longer needs to depend on `count`.](_learn_removing-effect-dependencies.md#are-you-reading-some-state-to-calculate-the-next-state) As a result of this fix, it won’t need to cleanup and setup the interval again every time the `count` changes.

* * *

### Removing unnecessary object dependencies

If your Effect depends on an object or a function created during rendering, it might run too often. For example, this Effect re-connects after every commit because the `options` object is [different for every render:](_learn_removing-effect-dependencies.md#does-some-reactive-value-change-unintentionally)
```
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {

const [message, setMessage] = useState('');

const options = { // 🚩 This object is created from scratch on every re-render

serverUrl: serverUrl,

roomId: roomId

};

useEffect(() => {

const connection = createConnection(options); // It's used inside the Effect

connection.connect();

return () => connection.disconnect();

}, [options]); // 🚩 As a result, these dependencies are always different on a commit

// ...
```
Avoid using an object created during rendering as a dependency. Instead, create the object inside the Effect:
```
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';
const serverUrl = 'https://localhost:1234';
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}
export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```
Now that you create the `options` object inside the Effect, the Effect itself only depends on the `roomId` string.

With this fix, typing into the input doesn’t reconnect the chat. Unlike an object which gets re-created, a string like `roomId` doesn’t change unless you set it to another value. [Read more about removing dependencies.](_learn_removing-effect-dependencies.md)

* * *

### Removing unnecessary function dependencies

If your Effect depends on an object or a function created during rendering, it might run too often. For example, this Effect re-connects after every commit because the `createOptions` function is [different for every render:](_learn_removing-effect-dependencies.md#does-some-reactive-value-change-unintentionally)
```
function ChatRoom({ roomId }) {

const [message, setMessage] = useState('');

function createOptions() { // 🚩 This function is created from scratch on every re-render

return {

serverUrl: serverUrl,

roomId: roomId

};

}

useEffect(() => {

const options = createOptions(); // It's used inside the Effect

const connection = createConnection();

connection.connect();

return () => connection.disconnect();

}, [createOptions]); // 🚩 As a result, these dependencies are always different on a commit

// ...
```
By itself, creating a function from scratch on every re-render is not a problem. You don’t need to optimize that. However, if you use it as a dependency of your Effect, it will cause your Effect to re-run after every commit.

Avoid using a function created during rendering as a dependency. Instead, declare it inside the Effect:
```
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';
const serverUrl = 'https://localhost:1234';
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  useEffect(() => {
    function createOptions() {
      return {
        serverUrl: serverUrl,
        roomId: roomId
      };
    }
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}
export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```
Now that you define the `createOptions` function inside the Effect, the Effect itself only depends on the `roomId` string. With this fix, typing into the input doesn’t reconnect the chat. Unlike a function which gets re-created, a string like `roomId` doesn’t change unless you set it to another value. [Read more about removing dependencies.](_learn_removing-effect-dependencies.md)

* * *

### Reading the latest props and state from an Effect

By default, when you read a reactive value from an Effect, you have to add it as a dependency. This ensures that your Effect “reacts” to every change of that value. For most dependencies, that’s the behavior you want.

**However, sometimes you’ll want to read the _latest_ props and state from an Effect without “reacting” to them.** For example, imagine you want to log the number of the items in the shopping cart for every page visit:
```
function Page({ url, shoppingCart }) {

useEffect(() => {

logVisit(url, shoppingCart.length);

}, [url, shoppingCart]); // ✅ All dependencies declared

// ...

}
```
**What if you want to log a new page visit after every `url` change, but _not_ if only the `shoppingCart` changes?** You can’t exclude `shoppingCart` from dependencies without breaking the [reactivity rules.](_reference_react_useEffect.md#specifying-reactive-dependencies) However, you can express that you _don’t want_ a piece of code to “react” to changes even though it is called from inside an Effect. [Declare an _Effect Event_](_learn_separating-events-from-effects.md#declaring-an-effect-event) with the [`useEffectEvent`](_reference_react_useEffectEvent.md) Hook, and move the code reading `shoppingCart` inside of it:
```
function Page({ url, shoppingCart }) {

const onVisit = useEffectEvent(visitedUrl => {

logVisit(visitedUrl, shoppingCart.length)

});

useEffect(() => {

onVisit(url);

}, [url]); // ✅ All dependencies declared

// ...

}
```
**Effect Events are not reactive and must always be omitted from dependencies of your Effect.** This is what lets you put non-reactive code (where you can read the latest value of some props and state) inside of them. By reading `shoppingCart` inside of `onVisit`, you ensure that `shoppingCart` won’t re-run your Effect.

[Read more about how Effect Events let you separate reactive and non-reactive code.](_learn_separating-events-from-effects.md#reading-latest-props-and-state-with-effect-events)

* * *

### Displaying different content on the server and the client

If your app uses server rendering (either [directly](_reference_react-dom_server.md) or via a [framework](_learn_creating-a-react-app.md#full-stack-frameworks)), your component will render in two different environments. On the server, it will render to produce the initial HTML. On the client, React will run the rendering code again so that it can attach your event handlers to that HTML. This is why, for [hydration](_reference_react-dom_client_hydrateRoot.md#hydrating-server-rendered-html) to work, your initial render output must be identical on the client and the server.

In rare cases, you might need to display different content on the client. For example, if your app reads some data from [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), it can’t possibly do that on the server. Here is how you could implement this:
```
function MyComponent() {

const [didMount, setDidMount] = useState(false);

useEffect(() => {

setDidMount(true);

}, []);

if (didMount) {

// ... return client-only JSX ...

}  else {

// ... return initial JSX ...

}

}
```
While the app is loading, the user will see the initial render output. Then, when it’s loaded and hydrated, your Effect will run and set `didMount` to `true`, triggering a re-render. This will switch to the client-only render output. Effects don’t run on the server, so this is why `didMount` was `false` during the initial server render.

Use this pattern sparingly. Keep in mind that users with a slow connection will see the initial content for quite a bit of time—potentially, many seconds—so you don’t want to make jarring changes to your component’s appearance. In many cases, you can avoid the need for this by conditionally showing different things with CSS.

* * *

## Troubleshooting

### My Effect runs twice when the component mounts

When Strict Mode is on, in development, React runs setup and cleanup one extra time before the actual setup.

This is a stress-test that verifies your Effect’s logic is implemented correctly. If this causes visible issues, your cleanup function is missing some logic. The cleanup function should stop or undo whatever the setup function was doing. The rule of thumb is that the user shouldn’t be able to distinguish between the setup being called once (as in production) and a setup → cleanup → setup sequence (as in development).

Read more about [how this helps find bugs](_learn_synchronizing-with-effects.md#step-3-add-cleanup-if-needed) and [how to fix your logic.](_learn_synchronizing-with-effects.md#how-to-handle-the-effect-firing-twice-in-development)

* * *

### My Effect runs after every re-render

First, check that you haven’t forgotten to specify the dependency array:
```
useEffect(() => {

// ...

}); // 🚩 No dependency array: re-runs after every commit!
```
If you’ve specified the dependency array but your Effect still re-runs in a loop, it’s because one of your dependencies is different on every re-render.

You can debug this problem by manually logging your dependencies to the console:
```
useEffect(() => {

// ..

}, [serverUrl, roomId]);

console.log([serverUrl, roomId]);
```
You can then right-click on the arrays from different re-renders in the console and select “Store as a global variable” for both of them. Assuming the first one got saved as `temp1` and the second one got saved as `temp2`, you can then use the browser console to check whether each dependency in both arrays is the same:
```
Object.is(temp1[0], temp2[0]); // Is the first dependency the same between the arrays?

Object.is(temp1[1], temp2[1]); // Is the second dependency the same between the arrays?

Object.is(temp1[2], temp2[2]); // ... and so on for every dependency ...
```
When you find the dependency that is different on every re-render, you can usually fix it in one of these ways:

* [Updating state based on previous state from an Effect](_reference_react_useEffect.md#updating-state-based-on-previous-state-from-an-effect)
* [Removing unnecessary object dependencies](_reference_react_useEffect.md#removing-unnecessary-object-dependencies)
* [Removing unnecessary function dependencies](_reference_react_useEffect.md#removing-unnecessary-function-dependencies)
* [Reading the latest props and state from an Effect](_reference_react_useEffect.md#reading-the-latest-props-and-state-from-an-effect)

As a last resort (if these methods didn’t help), wrap its creation with [`useMemo`](_reference_react_useMemo.md#memoizing-a-dependency-of-another-hook) or [`useCallback`](_reference_react_useCallback.md#preventing-an-effect-from-firing-too-often) (for functions).

* * *

### My Effect keeps re-running in an infinite cycle

If your Effect runs in an infinite cycle, these two things must be true:

*   Your Effect is updating some state.
*   That state leads to a re-render, which causes the Effect’s dependencies to change.

Before you start fixing the problem, ask yourself whether your Effect is connecting to some external system (like DOM, network, a third-party widget, and so on). Why does your Effect need to set state? Does it synchronize with that external system? Or are you trying to manage your application’s data flow with it?

If there is no external system, consider whether [removing the Effect altogether](_learn_you-might-not-need-an-effect.md) would simplify your logic.

If you’re genuinely synchronizing with some external system, think about why and under what conditions your Effect should update the state. Has something changed that affects your component’s visual output? If you need to keep track of some data that isn’t used by rendering, a [ref](_reference_react_useRef.md#referencing-a-value-with-a-ref) (which doesn’t trigger re-renders) might be more appropriate. Verify your Effect doesn’t update the state (and trigger re-renders) more than needed.

Finally, if your Effect is updating the state at the right time, but there is still a loop, it’s because that state update leads to one of the Effect’s dependencies changing. [Read how to debug dependency changes.](_reference_react_useEffect.md#my-effect-runs-after-every-re-render)

* * *

### My cleanup logic runs even though my component didn’t unmount

The cleanup function runs not only during unmount, but before every re-render with changed dependencies. Additionally, in development, React [runs setup+cleanup one extra time immediately after component mounts.](_reference_react_useEffect.md#my-effect-runs-twice-when-the-component-mounts)

If you have cleanup code without corresponding setup code, it’s usually a code smell:
```
useEffect(() => {

// 🔴 Avoid: Cleanup logic without corresponding setup logic

return () => {

doSomething();

};

}, []);
```
Your cleanup logic should be “symmetrical” to the setup logic, and should stop or undo whatever setup did:
```
useEffect(() => {

const connection = createConnection(serverUrl, roomId);

connection.connect();

return () => {

connection.disconnect();

};

}, [serverUrl, roomId]);
```
[Learn how the Effect lifecycle is different from the component’s lifecycle.](_learn_lifecycle-of-reactive-effects.md#the-lifecycle-of-an-effect)

* * *

### My Effect does something visual, and I see a flicker before it runs

If your Effect must block the browser from [painting the screen,](_learn_render-and-commit.md#epilogue-browser-paint) replace `useEffect` with [`useLayoutEffect`](_reference_react_useLayoutEffect.md). Note that **this shouldn’t be needed for the vast majority of Effects.** You’ll only need this if it’s crucial to run your Effect before the browser paint: for example, to measure and position a tooltip before the user sees it.

#### _reference_react_useEffectEvent.md

> Source: https://react.dev/reference/react/useEffectEvent
> Scraped: 12/20/2025, 10:40:53 PM

`useEffectEvent` is a React Hook that lets you extract non-reactive logic from your Effects into a reusable function called an [Effect Event](_learn_separating-events-from-effects.md#declaring-an-effect-event).
```
const onSomething = useEffectEvent(callback)
```
* [Reference](_reference_react_useEffectEvent.md#reference)
    * [`useEffectEvent(callback)`](_reference_react_useEffectEvent.md#useeffectevent)
* [Usage](_reference_react_useEffectEvent.md#usage)
    * [Reading the latest props and state](_reference_react_useEffectEvent.md#reading-the-latest-props-and-state)

## Reference

### `useEffectEvent(callback)`

Call `useEffectEvent` at the top level of your component to declare an Effect Event. Effect Events are functions you can call inside Effects, such as `useEffect`:
```
import { useEffectEvent, useEffect } from 'react';

function ChatRoom({ roomId, theme }) {

const onConnected = useEffectEvent(() => {

showNotification('Connected!', theme);

});

useEffect(() => {

const connection = createConnection(serverUrl, roomId);

connection.on('connected', () => {

onConnected();

});

connection.connect();

return () => connection.disconnect();

}, [roomId]);

// ...

}
```
[See more examples below.](_reference_react_useEffectEvent.md#usage)

#### Parameters

*   `callback`: A function containing the logic for your Effect Event. When you define an Effect Event with `useEffectEvent`, the `callback` always accesses the latest values from props and state when it is invoked. This helps avoid issues with stale closures.

#### Returns

Returns an Effect Event function. You can call this function inside `useEffect`, `useLayoutEffect`, or `useInsertionEffect`.

#### Caveats

*   **Only call inside Effects:** Effect Events should only be called within Effects. Define them just before the Effect that uses them. Do not pass them to other components or hooks. The [`eslint-plugin-react-hooks`](_reference_eslint-plugin-react-hooks.md) linter (version 6.1.1 or higher) will enforce this restriction to prevent calling Effect Events in the wrong context.
*   **Not a dependency shortcut:** Do not use `useEffectEvent` to avoid specifying dependencies in your Effect’s dependency array. This can hide bugs and make your code harder to understand. Prefer explicit dependencies or use refs to compare previous values if needed.
*   **Use for non-reactive logic:** Only use `useEffectEvent` to extract logic that does not depend on changing values.

* * *

## Usage

### Reading the latest props and state

Typically, when you access a reactive value inside an Effect, you must include it in the dependency array. This makes sure your Effect runs again whenever that value changes, which is usually the desired behavior.

But in some cases, you may want to read the most recent props or state inside an Effect without causing the Effect to re-run when those values change.

To [read the latest props or state](_learn_separating-events-from-effects.md#reading-latest-props-and-state-with-effect-events) in your Effect, without making those values reactive, include them in an Effect Event.
```
import { useEffect, useContext, useEffectEvent } from 'react';

function Page({ url }) {

const { items } = useContext(ShoppingCartContext);

const numberOfItems = items.length;

const onNavigate = useEffectEvent((visitedUrl) => {

logVisit(visitedUrl, numberOfItems);

});

useEffect(() => {

onNavigate(url);

}, [url]);

// ...

}
```
In this example, the Effect should re-run after a render when `url` changes (to log the new page visit), but it should **not** re-run when `numberOfItems` changes. By wrapping the logging logic in an Effect Event, `numberOfItems` becomes non-reactive. It’s always read from the latest value without triggering the Effect.

You can pass reactive values like `url` as arguments to the Effect Event to keep them reactive while accessing the latest non-reactive values inside the event.

#### _reference_react_useId.md

> Source: https://react.dev/reference/react/useId
> Scraped: 12/20/2025, 10:40:54 PM

`useId` is a React Hook for generating unique IDs that can be passed to accessibility attributes.

* [Reference](_reference_react_useId.md#reference)
    * [`useId()`](_reference_react_useId.md#useid)
* [Usage](_reference_react_useId.md#usage)
    * [Generating unique IDs for accessibility attributes](_reference_react_useId.md#generating-unique-ids-for-accessibility-attributes)
    * [Generating IDs for several related elements](_reference_react_useId.md#generating-ids-for-several-related-elements)
    * [Specifying a shared prefix for all generated IDs](_reference_react_useId.md#specifying-a-shared-prefix-for-all-generated-ids)
    * [Using the same ID prefix on the client and the server](_reference_react_useId.md#using-the-same-id-prefix-on-the-client-and-the-server)

* * *

## Reference

### `useId()`

Call `useId` at the top level of your component to generate a unique ID:
```
import { useId } from 'react';

function PasswordField() {

const passwordHintId = useId();

// ...
```
[See more examples below.](_reference_react_useId.md#usage)

#### Parameters

`useId` does not take any parameters.

#### Returns

`useId` returns a unique ID string associated with this particular `useId` call in this particular component.

#### Caveats

*   `useId` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.

*   `useId` **should not be used to generate keys** in a list. [Keys should be generated from your data.](_learn_rendering-lists.md#where-to-get-your-key)

*   `useId` currently cannot be used in [async Server Components](_reference_rsc_server-components.md#async-components-with-server-components).

* * *

## Usage

### Pitfall

### Generating unique IDs for accessibility attributes

Call `useId` at the top level of your component to generate a unique ID:
```
import { useId } from 'react';

function PasswordField() {

const passwordHintId = useId();

// ...
```
You can then pass the generated ID to different attributes:
```
<>

<input type="password" aria-describedby={passwordHintId} />

<p id={passwordHintId}>

</>
```
**Let’s walk through an example to see when this is useful.** [HTML accessibility attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) like [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) let you specify that two tags are related to each other. For example, you can specify that an element (like an input) is described by another element (like a paragraph).

In regular HTML, you would write it like this:
```
<label>

  Password:

<input

type="password"

aria-describedby="password-hint"

/>

</label>

<p id="password-hint">

  The password should contain at least 18 characters

</p>
```
However, hardcoding IDs like this is not a good practice in React. A component may be rendered more than once on the page—but IDs have to be unique! Instead of hardcoding an ID, generate a unique ID with `useId`:
```
import { useId } from 'react';

function PasswordField() {

const passwordHintId = useId();

return (

<>

<label>

        Password:

<input

type="password"

aria-describedby={passwordHintId}

/>

</label>

<p id={passwordHintId}>

        The password should contain at least 18 characters

</p>

</>

);

}
```
Now, even if `PasswordField` appears multiple times on the screen, the generated IDs won’t clash.
```
import { useId } from 'react';
function PasswordField() {
  const passwordHintId = useId();
  return (
    <>
      <label>
        Password:
        <input
          type="password"
          aria-describedby={passwordHintId}
        />
      </label>
      <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
    </>
  );
}
export default function App() {
  return (
    <>
      <h2>Choose password</h2>
      <PasswordField />
      <h2>Confirm password</h2>
      <PasswordField />
    </>
  );
}
```
[Watch this video](https://www.youtube.com/watch?v=0dNzNcuEuOo) to see the difference in the user experience with assistive technologies.

### Pitfall

With [server rendering](_reference_react-dom_server.md), **`useId` requires an identical component tree on the server and the client**. If the trees you render on the server and the client don’t match exactly, the generated IDs won’t match.

##### Deep Dive

#### Why is useId better than an incrementing counter?

You might be wondering why `useId` is better than incrementing a global variable like `nextId++`.

The primary benefit of `useId` is that React ensures that it works with [server rendering.](_reference_react-dom_server.md) During server rendering, your components generate HTML output. Later, on the client, [hydration](_reference_react-dom_client_hydrateRoot.md) attaches your event handlers to the generated HTML. For hydration to work, the client output must match the server HTML.

This is very difficult to guarantee with an incrementing counter because the order in which the Client Components are hydrated may not match the order in which the server HTML was emitted. By calling `useId`, you ensure that hydration will work, and the output will match between the server and the client.

Inside React, `useId` is generated from the “parent path” of the calling component. This is why, if the client and the server tree are the same, the “parent path” will match up regardless of rendering order.

* * *

If you need to give IDs to multiple related elements, you can call `useId` to generate a shared prefix for them:

This lets you avoid calling `useId` for every single element that needs a unique ID.

* * *

### Specifying a shared prefix for all generated IDs

If you render multiple independent React applications on a single page, pass `identifierPrefix` as an option to your [`createRoot`](_reference_react-dom_client_createRoot.md#parameters) or [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) calls. This ensures that the IDs generated by the two different apps never clash because every identifier generated with `useId` will start with the distinct prefix you’ve specified.

* * *

### Using the same ID prefix on the client and the server

If you [render multiple independent React apps on the same page](_reference_react_useId.md#specifying-a-shared-prefix-for-all-generated-ids), and some of these apps are server-rendered, make sure that the `identifierPrefix` you pass to the [`hydrateRoot`](_reference_react-dom_client_hydrateRoot.md) call on the client side is the same as the `identifierPrefix` you pass to the [server APIs](_reference_react-dom_server.md) such as [`renderToPipeableStream`.](_reference_react-dom_server_renderToPipeableStream.md)
```
// Server

import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(

<App />,

{ identifierPrefix: 'react-app1' }

);
```
```
// Client

import { hydrateRoot } from 'react-dom/client';

const domNode = document.getElementById('root');

const root = hydrateRoot(

domNode,

reactNode,

{ identifierPrefix: 'react-app1' }

);
```
You do not need to pass `identifierPrefix` if you only have one React app on the page.

#### _reference_react_useImperativeHandle.md

> Source: https://react.dev/reference/react/useImperativeHandle
> Scraped: 12/20/2025, 10:40:53 PM

`useImperativeHandle` is a React Hook that lets you customize the handle exposed as a [ref.](_learn_manipulating-the-dom-with-refs.md)
```
useImperativeHandle(ref, createHandle, dependencies?)
```
* [Reference](_reference_react_useImperativeHandle.md#reference)
    * [`useImperativeHandle(ref, createHandle, dependencies?)`](_reference_react_useImperativeHandle.md#useimperativehandle)
* [Usage](_reference_react_useImperativeHandle.md#usage)
    * [Exposing a custom ref handle to the parent component](_reference_react_useImperativeHandle.md#exposing-a-custom-ref-handle-to-the-parent-component)
    * [Exposing your own imperative methods](_reference_react_useImperativeHandle.md#exposing-your-own-imperative-methods)

* * *

## Reference

### `useImperativeHandle(ref, createHandle, dependencies?)`

Call `useImperativeHandle` at the top level of your component to customize the ref handle it exposes:
```
import { useImperativeHandle } from 'react';

function MyInput({ ref }) {

useImperativeHandle(ref, () => {

return {

// ... your methods ...

};

}, []);

// ...
```
[See more examples below.](_reference_react_useImperativeHandle.md#usage)

#### Parameters

*   `ref`: The `ref` you received as a prop to the `MyInput` component.

*   `createHandle`: A function that takes no arguments and returns the ref handle you want to expose. That ref handle can have any type. Usually, you will return an object with the methods you want to expose.

*   **optional** `dependencies`: The list of all reactive values referenced inside of the `createHandle` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](_learn_editor-setup.md#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. If a re-render resulted in a change to some dependency, or if you omitted this argument, your `createHandle` function will re-execute, and the newly created handle will be assigned to the ref.

### Note

#### Returns

`useImperativeHandle` returns `undefined`.

* * *

## Usage

### Exposing a custom ref handle to the parent component

To expose a DOM node to the parent element, pass in the `ref` prop to the node.
```
function MyInput({ ref }) {

return <input ref={ref} />;

};
```
With the code above, [a ref to `MyInput` will receive the `<input>` DOM node.](_learn_manipulating-the-dom-with-refs.md) However, you can expose a custom value instead. To customize the exposed handle, call `useImperativeHandle` at the top level of your component:
```
import { useImperativeHandle } from 'react';

function MyInput({ ref }) {

useImperativeHandle(ref, () => {

return {

// ... your methods ...

};

}, []);

return <input />;

};
```
Note that in the code above, the `ref` is no longer passed to the `<input>`.

For example, suppose you don’t want to expose the entire `<input>` DOM node, but you want to expose two of its methods: `focus` and `scrollIntoView`. To do this, keep the real browser DOM in a separate ref. Then use `useImperativeHandle` to expose a handle with only the methods that you want the parent component to call:
```
import { useRef, useImperativeHandle } from 'react';

function MyInput({ ref }) {

const inputRef = useRef(null);

useImperativeHandle(ref, () => {

return {

focus() {

inputRef.current.focus();

},

scrollIntoView() {

inputRef.current.scrollIntoView();

},

};

}, []);

return <input ref={inputRef} />;

};
```
Now, if the parent component gets a ref to `MyInput`, it will be able to call the `focus` and `scrollIntoView` methods on it. However, it will not have full access to the underlying `<input>` DOM node.

* * *

### Exposing your own imperative methods

The methods you expose via an imperative handle don’t have to match the DOM methods exactly. For example, this `Post` component exposes a `scrollAndFocusAddComment` method via an imperative handle. This lets the parent `Page` scroll the list of comments _and_ focus the input field when you click the button:

### Pitfall

**Do not overuse refs.** You should only use refs for _imperative_ behaviors that you can’t express as props: for example, scrolling to a node, focusing a node, triggering an animation, selecting text, and so on.

**If you can express something as a prop, you should not use a ref.** For example, instead of exposing an imperative handle like `{ open, close }` from a `Modal` component, it is better to take `isOpen` as a prop like `<Modal isOpen={isOpen} />`. [Effects](_learn_synchronizing-with-effects.md) can help you expose imperative behaviors via props.

#### _reference_react_useInsertionEffect.md

> Source: https://react.dev/reference/react/useInsertionEffect
> Scraped: 12/20/2025, 10:40:53 PM

### Pitfall

`useInsertionEffect` is for CSS-in-JS library authors. Unless you are working on a CSS-in-JS library and need a place to inject the styles, you probably want [`useEffect`](_reference_react_useEffect.md) or [`useLayoutEffect`](_reference_react_useLayoutEffect.md) instead.

`useInsertionEffect` allows inserting elements into the DOM before any layout Effects fire.
```
useInsertionEffect(setup, dependencies?)
```
* [Reference](_reference_react_useInsertionEffect.md#reference)
    * [`useInsertionEffect(setup, dependencies?)`](_reference_react_useInsertionEffect.md#useinsertioneffect)
* [Usage](_reference_react_useInsertionEffect.md#usage)
    * [Injecting dynamic styles from CSS-in-JS libraries](_reference_react_useInsertionEffect.md#injecting-dynamic-styles-from-css-in-js-libraries)

* * *

## Reference

### `useInsertionEffect(setup, dependencies?)`

Call `useInsertionEffect` to insert styles before any Effects fire that may need to read layout:
```
import { useInsertionEffect } from 'react';

// Inside your CSS-in-JS library

function useCSS(rule) {

useInsertionEffect(() => {

// ... inject  tags here ...

});

return rule;

}
```
[See more examples below.](_reference_react_useInsertionEffect.md#usage)

#### Parameters

*   `setup`: The function with your Effect’s logic. Your setup function may also optionally return a _cleanup_ function. When your component is added to the DOM, but before any layout Effects fire, React will run your setup function. After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. When your component is removed from the DOM, React will run your cleanup function.

*   **optional** `dependencies`: The list of all reactive values referenced inside of the `setup` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](_learn_editor-setup.md#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison algorithm. If you don’t specify the dependencies at all, your Effect will re-run after every re-render of the component.

#### Returns

`useInsertionEffect` returns `undefined`.

#### Caveats

*   Effects only run on the client. They don’t run during server rendering.
*   You can’t update state from inside `useInsertionEffect`.
*   By the time `useInsertionEffect` runs, refs are not attached yet.
*   `useInsertionEffect` may run either before or after the DOM has been updated. You shouldn’t rely on the DOM being updated at any particular time.
*   Unlike other types of Effects, which fire cleanup for every Effect and then setup for every Effect, `useInsertionEffect` will fire both cleanup and setup one component at a time. This results in an “interleaving” of the cleanup and setup functions.

* * *

## Usage

### Injecting dynamic styles from CSS-in-JS libraries

Traditionally, you would style React components using plain CSS.
```
// In your JS file:

<button className="success" />

// In your CSS file:

.success { color: green; }
```
Some teams prefer to author styles directly in JavaScript code instead of writing CSS files. This usually requires using a CSS-in-JS library or a tool. There are three common approaches to CSS-in-JS:

1.  Static extraction to CSS files with a compiler
2.  Inline styles, e.g. ``
3.  Runtime injection of `<style>` tags

If you use CSS-in-JS, we recommend a combination of the first two approaches (CSS files for static styles, inline styles for dynamic styles). **We don’t recommend runtime `<style>` tag injection for two reasons:**

1.  Runtime injection forces the browser to recalculate the styles a lot more often.
2.  Runtime injection can be very slow if it happens at the wrong time in the React lifecycle.

The first problem is not solvable, but `useInsertionEffect` helps you solve the second problem.

Call `useInsertionEffect` to insert the styles before any layout Effects fire:
```
// Inside your CSS-in-JS library

let isInserted = new Set();

function useCSS(rule) {

useInsertionEffect(() => {

// As explained earlier, we don't recommend runtime injection of  tags.

// But if you have to do it, then it's important to do in useInsertionEffect.

if (!isInserted.has(rule)) {

isInserted.add(rule);

document.head.appendChild(getStyleForRule(rule));

}

});

return rule;

}

function Button() {

const className = useCSS('...');

return ;

}
```
Similarly to `useEffect`, `useInsertionEffect` does not run on the server. If you need to collect which CSS rules have been used on the server, you can do it during rendering:
```
let collectedRulesSet = new Set();

function useCSS(rule) {

if (typeof window === 'undefined') {

collectedRulesSet.add(rule);

}

useInsertionEffect(() => {

// ...

});

return rule;

}
```
[Read more about upgrading CSS-in-JS libraries with runtime injection to `useInsertionEffect`.](https://github.com/reactwg/react-18/discussions/110)

##### Deep Dive

#### How is this better than injecting styles during rendering or useLayoutEffect?

If you insert styles during rendering and React is processing a [non-blocking update,](_reference_react_useTransition.md#perform-non-blocking-updates-with-actions) the browser will recalculate the styles every single frame while rendering a component tree, which can be **extremely slow.**

`useInsertionEffect` is better than inserting styles during [`useLayoutEffect`](_reference_react_useLayoutEffect.md) or [`useEffect`](_reference_react_useEffect.md) because it ensures that by the time other Effects run in your components, the `<style>` tags have already been inserted. Otherwise, layout calculations in regular Effects would be wrong due to outdated styles.

#### _reference_react_useLayoutEffect.md

> Source: https://react.dev/reference/react/useLayoutEffect
> Scraped: 12/20/2025, 10:40:54 PM

### Pitfall

`useLayoutEffect` can hurt performance. Prefer [`useEffect`](_reference_react_useEffect.md) when possible.

`useLayoutEffect` is a version of [`useEffect`](_reference_react_useEffect.md) that fires before the browser repaints the screen.
```
useLayoutEffect(setup, dependencies?)
```
* [Reference](_reference_react_useLayoutEffect.md#reference)
    * [`useLayoutEffect(setup, dependencies?)`](_reference_react_useLayoutEffect.md#useinsertioneffect)
* [Usage](_reference_react_useLayoutEffect.md#usage)
    * [Measuring layout before the browser repaints the screen](_reference_react_useLayoutEffect.md#measuring-layout-before-the-browser-repaints-the-screen)
* [Troubleshooting](_reference_react_useLayoutEffect.md#troubleshooting)
    * [I’m getting an error: “`useLayoutEffect` does nothing on the server”](_reference_react_useLayoutEffect.md#im-getting-an-error-uselayouteffect-does-nothing-on-the-server)

* * *

## Reference

### `useLayoutEffect(setup, dependencies?)`

Call `useLayoutEffect` to perform the layout measurements before the browser repaints the screen:
```
import { useState, useRef, useLayoutEffect } from 'react';

function Tooltip() {

const ref = useRef(null);

const [tooltipHeight, setTooltipHeight] = useState(0);

useLayoutEffect(() => {

const { height } = ref.current.getBoundingClientRect();

setTooltipHeight(height);

}, []);

// ...
```
[See more examples below.](_reference_react_useLayoutEffect.md#usage)

#### Parameters

*   `setup`: The function with your Effect’s logic. Your setup function may also optionally return a _cleanup_ function. Before your [component commits](_learn_render-and-commit.md#step-3-react-commits-changes-to-the-dom), React will run your setup function. After every commit with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. Before your component is removed from the DOM, React will run your cleanup function.

*   **optional** `dependencies`: The list of all reactive values referenced inside of the `setup` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](_learn_editor-setup.md#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. If you omit this argument, your Effect will re-run after every commit of the component.

#### Returns

`useLayoutEffect` returns `undefined`.

#### Caveats

*   `useLayoutEffect` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a component and move the Effect there.

*   When Strict Mode is on, React will **run one extra development-only setup+cleanup cycle** before the first real setup. This is a stress-test that ensures that your cleanup logic “mirrors” your setup logic and that it stops or undoes whatever the setup is doing. If this causes a problem, [implement the cleanup function.](_learn_synchronizing-with-effects.md#how-to-handle-the-effect-firing-twice-in-development)

*   If some of your dependencies are objects or functions defined inside the component, there is a risk that they will **cause the Effect to re-run more often than needed.** To fix this, remove unnecessary [object](_reference_react_useEffect.md#removing-unnecessary-object-dependencies) and [function](_reference_react_useEffect.md#removing-unnecessary-function-dependencies) dependencies. You can also [extract state updates](_reference_react_useEffect.md#updating-state-based-on-previous-state-from-an-effect) and [non-reactive logic](_reference_react_useEffect.md#reading-the-latest-props-and-state-from-an-effect) outside of your Effect.

*   Effects **only run on the client.** They don’t run during server rendering.

*   The code inside `useLayoutEffect` and all state updates scheduled from it **block the browser from repainting the screen.** When used excessively, this makes your app slow. When possible, prefer [`useEffect`.](_reference_react_useEffect.md)

*   If you trigger a state update inside `useLayoutEffect`, React will execute all remaining Effects immediately including `useEffect`.

* * *

## Usage

### Measuring layout before the browser repaints the screen

Most components don’t need to know their position and size on the screen to decide what to render. They only return some JSX. Then the browser calculates their _layout_ (position and size) and repaints the screen.

Sometimes, that’s not enough. Imagine a tooltip that appears next to some element on hover. If there’s enough space, the tooltip should appear above the element, but if it doesn’t fit, it should appear below. In order to render the tooltip at the right final position, you need to know its height (i.e. whether it fits at the top).

To do this, you need to render in two passes:

1.  Render the tooltip anywhere (even with a wrong position).
2.  Measure its height and decide where to place the tooltip.
3.  Render the tooltip _again_ in the correct place.

**All of this needs to happen before the browser repaints the screen.** You don’t want the user to see the tooltip moving. Call `useLayoutEffect` to perform the layout measurements before the browser repaints the screen:
```
function Tooltip() {

const ref = useRef(null);

const [tooltipHeight, setTooltipHeight] = useState(0); // You don't know real height yet

useLayoutEffect(() => {

const { height } = ref.current.getBoundingClientRect();

setTooltipHeight(height); // Re-render now that you know the real height

}, []);

// ...use tooltipHeight in the rendering logic below...

}
```
Here’s how this works step by step:

1.  `Tooltip` renders with the initial `tooltipHeight = 0` (so the tooltip may be wrongly positioned).
2.  React places it in the DOM and runs the code in `useLayoutEffect`.
3.  Your `useLayoutEffect` [measures the height](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of the tooltip content and triggers an immediate re-render.
4.  `Tooltip` renders again with the real `tooltipHeight` (so the tooltip is correctly positioned).
5.  React updates it in the DOM, and the browser finally displays the tooltip.

Hover over the buttons below and see how the tooltip adjusts its position depending on whether it fits:
```
import { useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TooltipContainer from './TooltipContainer.js';
export default function Tooltip({ children, targetRect }) {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
    console.log('Measured tooltip height: ' + height);
  }, []);
  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      tooltipY = targetRect.bottom;
    }
  }
  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body
  );
}
```
Notice that even though the `Tooltip` component has to render in two passes (first, with `tooltipHeight` initialized to `0` and then with the real measured height), you only see the final result. This is why you need `useLayoutEffect` instead of [`useEffect`](_reference_react_useEffect.md) for this example. Let’s look at the difference in detail below.

#### useLayoutEffect vs useEffect

#### `useLayoutEffect` blocks the browser from repainting

React guarantees that the code inside `useLayoutEffect` and any state updates scheduled inside it will be processed **before the browser repaints the screen.** This lets you render the tooltip, measure it, and re-render the tooltip again without the user noticing the first extra render. In other words, `useLayoutEffect` blocks the browser from painting.
```
import { useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TooltipContainer from './TooltipContainer.js';
export default function Tooltip({ children, targetRect }) {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      tooltipY = targetRect.bottom;
    }
  }
  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body
  );
}
```
### Note

Rendering in two passes and blocking the browser hurts performance. Try to avoid this when you can.

* * *

## Troubleshooting

### I’m getting an error: “`useLayoutEffect` does nothing on the server”

The purpose of `useLayoutEffect` is to let your component [use layout information for rendering:](_reference_react_useLayoutEffect.md#measuring-layout-before-the-browser-repaints-the-screen)

1.  Render the initial content.
2.  Measure the layout _before the browser repaints the screen._
3.  Render the final content using the layout information you’ve read.

When you or your framework uses [server rendering](_reference_react-dom_server.md), your React app renders to HTML on the server for the initial render. This lets you show the initial HTML before the JavaScript code loads.

The problem is that on the server, there is no layout information.

In the [earlier example](_reference_react_useLayoutEffect.md#measuring-layout-before-the-browser-repaints-the-screen), the `useLayoutEffect` call in the `Tooltip` component lets it position itself correctly (either above or below content) depending on the content height. If you tried to render `Tooltip` as a part of the initial server HTML, this would be impossible to determine. On the server, there is no layout yet! So, even if you rendered it on the server, its position would “jump” on the client after the JavaScript loads and runs.

Usually, components that rely on layout information don’t need to render on the server anyway. For example, it probably doesn’t make sense to show a `Tooltip` during the initial render. It is triggered by a client interaction.

However, if you’re running into this problem, you have a few different options:

*   Replace `useLayoutEffect` with [`useEffect`.](_reference_react_useEffect.md) This tells React that it’s okay to display the initial render result without blocking the paint (because the original HTML will become visible before your Effect runs).

*   Alternatively, [mark your component as client-only.](_reference_react_Suspense.md#providing-a-fallback-for-server-errors-and-client-only-content) This tells React to replace its content up to the closest [`<Suspense>`](_reference_react_Suspense.md) boundary with a loading fallback (for example, a spinner or a glimmer) during server rendering.

*   Alternatively, you can render a component with `useLayoutEffect` only after hydration. Keep a boolean `isMounted` state that’s initialized to `false`, and set it to `true` inside a `useEffect` call. Your rendering logic can then be like `return isMounted ? <RealContent /> : <FallbackContent />`. On the server and during the hydration, the user will see `FallbackContent` which should not call `useLayoutEffect`. Then React will replace it with `RealContent` which runs on the client only and can include `useLayoutEffect` calls.

*   If you synchronize your component with an external data store and rely on `useLayoutEffect` for different reasons than measuring layout, consider [`useSyncExternalStore`](_reference_react_useSyncExternalStore.md) instead which [supports server rendering.](_reference_react_useSyncExternalStore.md#adding-support-for-server-rendering)

#### _reference_react_useMemo.md

> Source: https://react.dev/reference/react/useMemo
> Scraped: 12/20/2025, 10:40:55 PM

`useMemo` is a React Hook that lets you cache the result of a calculation between re-renders.
```
const cachedValue = useMemo(calculateValue, dependencies)
```
### Note

[React Compiler](_learn_react-compiler.md) automatically memoizes values and functions, reducing the need for manual `useMemo` calls. You can use the compiler to handle memoization automatically.

* [Reference](_reference_react_useMemo.md#reference)
    * [`useMemo(calculateValue, dependencies)`](_reference_react_useMemo.md#usememo)
* [Usage](_reference_react_useMemo.md#usage)
    * [Skipping expensive recalculations](_reference_react_useMemo.md#skipping-expensive-recalculations)
    * [Skipping re-rendering of components](_reference_react_useMemo.md#skipping-re-rendering-of-components)
    * [Preventing an Effect from firing too often](_reference_react_useMemo.md#preventing-an-effect-from-firing-too-often)
    * [Memoizing a dependency of another Hook](_reference_react_useMemo.md#memoizing-a-dependency-of-another-hook)
    * [Memoizing a function](_reference_react_useMemo.md#memoizing-a-function)
* [Troubleshooting](_reference_react_useMemo.md#troubleshooting)
    * [My calculation runs twice on every re-render](_reference_react_useMemo.md#my-calculation-runs-twice-on-every-re-render)
    * [My `useMemo` call is supposed to return an object, but returns undefined](_reference_react_useMemo.md#my-usememo-call-is-supposed-to-return-an-object-but-returns-undefined)
    * [Every time my component renders, the calculation in `useMemo` re-runs](_reference_react_useMemo.md#every-time-my-component-renders-the-calculation-in-usememo-re-runs)
    * [I need to call `useMemo` for each list item in a loop, but it’s not allowed](_reference_react_useMemo.md#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)

* * *

## Reference

### `useMemo(calculateValue, dependencies)`

Call `useMemo` at the top level of your component to cache a calculation between re-renders:
```
import { useMemo } from 'react';

function TodoList({ todos, tab }) {

const visibleTodos = useMemo(

() => filterTodos(todos, tab),

[todos, tab]

);

// ...

}
```
[See more examples below.](_reference_react_useMemo.md#usage)

#### Parameters

*   `calculateValue`: The function calculating the value that you want to cache. It should be pure, should take no arguments, and should return a value of any type. React will call your function during the initial render. On next renders, React will return the same value again if the `dependencies` have not changed since the last render. Otherwise, it will call `calculateValue`, return its result, and store it so it can be reused later.

*   `dependencies`: The list of all reactive values referenced inside of the `calculateValue` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](_learn_editor-setup.md#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison.

#### Returns

On the initial render, `useMemo` returns the result of calling `calculateValue` with no arguments.

During next renders, it will either return an already stored value from the last render (if the dependencies haven’t changed), or call `calculateValue` again, and return the result that `calculateValue` has returned.

#### Caveats

*   `useMemo` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
*   In Strict Mode, React will **call your calculation function twice** in order to [help you find accidental impurities.](_reference_react_useMemo.md#my-calculation-runs-twice-on-every-re-render) This is development-only behavior and does not affect production. If your calculation function is pure (as it should be), this should not affect your logic. The result from one of the calls will be ignored.
*   React **will not throw away the cached value unless there is a specific reason to do that.** For example, in development, React throws away the cache when you edit the file of your component. Both in development and in production, React will throw away the cache if your component suspends during the initial mount. In the future, React may add more features that take advantage of throwing away the cache—for example, if React adds built-in support for virtualized lists in the future, it would make sense to throw away the cache for items that scroll out of the virtualized table viewport. This should be fine if you rely on `useMemo` solely as a performance optimization. Otherwise, a [state variable](_reference_react_useState.md#avoiding-recreating-the-initial-state) or a [ref](_reference_react_useRef.md#avoiding-recreating-the-ref-contents) may be more appropriate.

### Note

Caching return values like this is also known as [_memoization_,](https://en.wikipedia.org/wiki/Memoization) which is why this Hook is called `useMemo`.

* * *

## Usage

### Skipping expensive recalculations

To cache a calculation between re-renders, wrap it in a `useMemo` call at the top level of your component:
```
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {

const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

// ...

}
```
You need to pass two things to `useMemo`:

1.  A calculation function that takes no arguments, like `() =>`, and returns what you wanted to calculate.
2.  A list of dependencies including every value within your component that’s used inside your calculation.

On the initial render, the value you’ll get from `useMemo` will be the result of calling your calculation.

On every subsequent render, React will compare the dependencies with the dependencies you passed during the last render. If none of the dependencies have changed (compared with [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), `useMemo` will return the value you already calculated before. Otherwise, React will re-run your calculation and return the new value.

In other words, `useMemo` caches a calculation result between re-renders until its dependencies change.

**Let’s walk through an example to see when this is useful.**

By default, React will re-run the entire body of your component every time that it re-renders. For example, if this `TodoList` updates its state or receives new props from its parent, the `filterTodos` function will re-run:
```
function TodoList({ todos, tab, theme }) {

const visibleTodos = filterTodos(todos, tab);

// ...

}
```
Usually, this isn’t a problem because most calculations are very fast. However, if you’re filtering or transforming a large array, or doing some expensive computation, you might want to skip doing it again if data hasn’t changed. If both `todos` and `tab` are the same as they were during the last render, wrapping the calculation in `useMemo` like earlier lets you reuse `visibleTodos` you’ve already calculated before.

This type of caching is called _[memoization.](https://en.wikipedia.org/wiki/Memoization)_

### Note

**You should only rely on `useMemo` as a performance optimization.** If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add `useMemo` to improve performance.

##### Deep Dive

#### How to tell if a calculation is expensive?

In general, unless you’re creating or looping over thousands of objects, it’s probably not expensive. If you want to get more confidence, you can add a console log to measure the time spent in a piece of code:
```
console.time('filter array');

const visibleTodos = filterTodos(todos, tab);

console.timeEnd('filter array');
```
Perform the interaction you’re measuring (for example, typing into the input). You will then see logs like `filter array: 0.15ms` in your console. If the overall logged time adds up to a significant amount (say, `1ms` or more), it might make sense to memoize that calculation. As an experiment, you can then wrap the calculation in `useMemo` to verify whether the total logged time has decreased for that interaction or not:
```
console.time('filter array');

const visibleTodos = useMemo(() => {

return filterTodos(todos, tab); // Skipped if todos and tab haven't changed

}, [todos, tab]);

console.timeEnd('filter array');
```
`useMemo` won’t make the _first_ render faster. It only helps you skip unnecessary work on updates.

Keep in mind that your machine is probably faster than your users’ so it’s a good idea to test the performance with an artificial slowdown. For example, Chrome offers a [CPU Throttling](https://developer.chrome.com/blog/new-in-devtools-61/#throttling) option for this.

Also note that measuring performance in development will not give you the most accurate results. (For example, when [Strict Mode](_reference_react_StrictMode.md) is on, you will see each component render twice rather than once.) To get the most accurate timings, build your app for production and test it on a device like your users have.

##### Deep Dive

#### Should you add useMemo everywhere?

If your app is like this site, and most interactions are coarse (like replacing a page or an entire section), memoization is usually unnecessary. On the other hand, if your app is more like a drawing editor, and most interactions are granular (like moving shapes), then you might find memoization very helpful.

Optimizing with `useMemo` is only valuable in a few cases:

*   The calculation you’re putting in `useMemo` is noticeably slow, and its dependencies rarely change.
*   You pass it as a prop to a component wrapped in [`memo`.](_reference_react_memo.md) You want to skip re-rendering if the value hasn’t changed. Memoization lets your component re-render only when dependencies aren’t the same.
*   The value you’re passing is later used as a dependency of some Hook. For example, maybe another `useMemo` calculation value depends on it. Or maybe you are depending on this value from [`useEffect.`](_reference_react_useEffect.md)

There is no benefit to wrapping a calculation in `useMemo` in other cases. There is no significant harm to doing that either, so some teams choose to not think about individual cases, and memoize as much as possible. The downside of this approach is that code becomes less readable. Also, not all memoization is effective: a single value that’s “always new” is enough to break memoization for an entire component.

**In practice, you can make a lot of memoization unnecessary by following a few principles:**

1.  When a component visually wraps other components, let it [accept JSX as children.](_learn_passing-props-to-a-component.md#passing-jsx-as-children) This way, when the wrapper component updates its own state, React knows that its children don’t need to re-render.
2.  Prefer local state and don’t [lift state up](_learn_sharing-state-between-components.md) any further than necessary. For example, don’t keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
3.  Keep your [rendering logic pure.](_learn_keeping-components-pure.md) If re-rendering a component causes a problem or produces some noticeable visual artifact, it’s a bug in your component! Fix the bug instead of adding memoization.
4.  Avoid [unnecessary Effects that update state.](_learn_you-might-not-need-an-effect.md) Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
5.  Try to [remove unnecessary dependencies from your Effects.](_learn_removing-effect-dependencies.md) For example, instead of memoization, it’s often simpler to move some object or a function inside an Effect or outside the component.

If a specific interaction still feels laggy, [use the React Developer Tools profiler](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) to see which components would benefit the most from memoization, and add memoization where needed. These principles make your components easier to debug and understand, so it’s good to follow them in any case. In the long term, we’re researching [doing granular memoization automatically](https://www.youtube.com/watch?v=lGEMwh32soc) to solve this once and for all.

* * *

### Skipping re-rendering of components

In some cases, `useMemo` can also help you optimize performance of re-rendering child components. To illustrate this, let’s say this `TodoList` component passes the `visibleTodos` as a prop to the child `List` component:
```
export default function TodoList({ todos, tab, theme }) {

// ...

return (

<List items={visibleTodos} />

);

}
```
You’ve noticed that toggling the `theme` prop freezes the app for a moment, but if you remove `<List />` from your JSX, it feels fast. This tells you that it’s worth trying to optimize the `List` component.

**By default, when a component re-renders, React re-renders all of its children recursively.** This is why, when `TodoList` re-renders with a different `theme`, the `List` component _also_ re-renders. This is fine for components that don’t require much calculation to re-render. But if you’ve verified that a re-render is slow, you can tell `List` to skip re-rendering when its props are the same as on last render by wrapping it in [`memo`:](_reference_react_memo.md)
```
import { memo } from 'react';

const List = memo(function List({ items }) {

// ...

});
```
**With this change, `List` will skip re-rendering if all of its props are the _same_ as on the last render.** This is where caching the calculation becomes important! Imagine that you calculated `visibleTodos` without `useMemo`:
```
export default function TodoList({ todos, tab, theme }) {

// Every time the theme changes, this will be a different array...

const visibleTodos = filterTodos(todos, tab);

return (

{/* ... so List's props will never be the same, and it will re-render every time */}

<List items={visibleTodos} />

);

}
```
**In the above example, the `filterTodos` function always creates a _different_ array,** similar to how the `{}` object literal always creates a new object. Normally, this wouldn’t be a problem, but it means that `List` props will never be the same, and your [`memo`](_reference_react_memo.md) optimization won’t work. This is where `useMemo` comes in handy:
```
export default function TodoList({ todos, tab, theme }) {

// Tell React to cache your calculation between re-renders...

const visibleTodos = useMemo(

() => filterTodos(todos, tab),

[todos, tab] // ...so as long as these dependencies don't change...

);

return (

{/* ...List will receive the same props and can skip re-rendering */}

<List items={visibleTodos} />

);

}
```
**By wrapping the `visibleTodos` calculation in `useMemo`, you ensure that it has the _same_ value between the re-renders** (until dependencies change). You don’t _have to_ wrap a calculation in `useMemo` unless you do it for some specific reason. In this example, the reason is that you pass it to a component wrapped in [`memo`,](_reference_react_memo.md) and this lets it skip re-rendering. There are a few other reasons to add `useMemo` which are described further on this page.

##### Deep Dive

#### Memoizing individual JSX nodes

Instead of wrapping `List` in [`memo`](_reference_react_memo.md), you could wrap the `<List />` JSX node itself in `useMemo`:
```
export default function TodoList({ todos, tab, theme }) {

const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

const children = useMemo(() => <List items={visibleTodos} />, [visibleTodos]);

return (

{children}

);

}
```
The behavior would be the same. If the `visibleTodos` haven’t changed, `List` won’t be re-rendered.

A JSX node like `<List items={visibleTodos} />` is an object like `{ type: List, props: { items: visibleTodos } }`. Creating this object is very cheap, but React doesn’t know whether its contents is the same as last time or not. This is why by default, React will re-render the `List` component.

However, if React sees the same exact JSX as during the previous render, it won’t try to re-render your component. This is because JSX nodes are [immutable.](https://en.wikipedia.org/wiki/Immutable_object) A JSX node object could not have changed over time, so React knows it’s safe to skip a re-render. However, for this to work, the node has to _actually be the same object_, not merely look the same in code. This is what `useMemo` does in this example.

Manually wrapping JSX nodes into `useMemo` is not convenient. For example, you can’t do this conditionally. This is usually why you would wrap components with [`memo`](_reference_react_memo.md) instead of wrapping JSX nodes.

* * *

### Preventing an Effect from firing too often

Sometimes, you might want to use a value inside an [Effect:](_learn_synchronizing-with-effects.md)
```
function ChatRoom({ roomId }) {

const [message, setMessage] = useState('');

const options = {

serverUrl: 'https://localhost:1234',

roomId: roomId

}

useEffect(() => {

const connection = createConnection(options);

connection.connect();

// ...
```
This creates a problem. [Every reactive value must be declared as a dependency of your Effect.](_learn_lifecycle-of-reactive-effects.md#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) However, if you declare `options` as a dependency, it will cause your Effect to constantly reconnect to the chat room:
```
useEffect(() => {

const connection = createConnection(options);

connection.connect();

return () => connection.disconnect();

}, [options]); // 🔴 Problem: This dependency changes on every render

// ...
```
To solve this, you can wrap the object you need to call from an Effect in `useMemo`:
```
function ChatRoom({ roomId }) {

const [message, setMessage] = useState('');

const options = useMemo(() => {

return {

serverUrl: 'https://localhost:1234',

roomId: roomId

};

}, [roomId]); // ✅ Only changes when roomId changes

useEffect(() => {

const connection = createConnection(options);

connection.connect();

return () => connection.disconnect();

}, [options]); // ✅ Only changes when options changes

// ...
```
This ensures that the `options` object is the same between re-renders if `useMemo` returns the cached object.

However, since `useMemo` is performance optimization, not a semantic guarantee, React may throw away the cached value if [there is a specific reason to do that](_reference_react_useMemo.md#caveats). This will also cause the effect to re-fire, **so it’s even better to remove the need for a function dependency** by moving your object _inside_ the Effect:
```
function ChatRoom({ roomId }) {

const [message, setMessage] = useState('');

useEffect(() => {

const options = { // ✅ No need for useMemo or object dependencies!

serverUrl: 'https://localhost:1234',

roomId: roomId

}

const connection = createConnection(options);

connection.connect();

return () => connection.disconnect();

}, [roomId]); // ✅ Only changes when roomId changes

// ...
```
Now your code is simpler and doesn’t need `useMemo`. [Learn more about removing Effect dependencies.](_learn_removing-effect-dependencies.md#move-dynamic-objects-and-functions-inside-your-effect)

### Memoizing a dependency of another Hook

Suppose you have a calculation that depends on an object created directly in the component body:
```
function Dropdown({ allItems, text }) {

const searchOptions = { matchMode: 'whole-word', text };

const visibleItems = useMemo(() => {

return searchItems(allItems, searchOptions);

}, [allItems, searchOptions]); // 🚩 Caution: Dependency on an object created in the component body

// ...
```
Depending on an object like this defeats the point of memoization. When a component re-renders, all of the code directly inside the component body runs again. **The lines of code creating the `searchOptions` object will also run on every re-render.** Since `searchOptions` is a dependency of your `useMemo` call, and it’s different every time, React knows the dependencies are different, and recalculate `searchItems` every time.

To fix this, you could memoize the `searchOptions` object _itself_ before passing it as a dependency:
```
function Dropdown({ allItems, text }) {

const searchOptions = useMemo(() => {

return { matchMode: 'whole-word', text };

}, [text]); // ✅ Only changes when text changes

const visibleItems = useMemo(() => {

return searchItems(allItems, searchOptions);

}, [allItems, searchOptions]); // ✅ Only changes when allItems or searchOptions changes

// ...
```
In the example above, if the `text` did not change, the `searchOptions` object also won’t change. However, an even better fix is to move the `searchOptions` object declaration _inside_ of the `useMemo` calculation function:
```
function Dropdown({ allItems, text }) {

const visibleItems = useMemo(() => {

const searchOptions = { matchMode: 'whole-word', text };

return searchItems(allItems, searchOptions);

}, [allItems, text]); // ✅ Only changes when allItems or text changes

// ...
```
Now your calculation depends on `text` directly (which is a string and can’t “accidentally” become different).

* * *

### Memoizing a function

Suppose the `Form` component is wrapped in [`memo`.](_reference_react_memo.md) You want to pass a function to it as a prop:
```
export default function ProductPage({ productId, referrer }) {

function handleSubmit(orderDetails) {

post('/product/' + productId + '/buy', {

referrer,

orderDetails

});

}

return <Form onSubmit={handleSubmit} />;

}
```
Just as `{}` creates a different object, function declarations like `function() {}` and expressions like `() => {}` produce a _different_ function on every re-render. By itself, creating a new function is not a problem. This is not something to avoid! However, if the `Form` component is memoized, presumably you want to skip re-rendering it when no props have changed. A prop that is _always_ different would defeat the point of memoization.

To memoize a function with `useMemo`, your calculation function would have to return another function:
```
export default function Page({ productId, referrer }) {

const handleSubmit = useMemo(() => {

return (orderDetails) => {

post('/product/' + productId + '/buy', {

referrer,

orderDetails

});

};

}, [productId, referrer]);

return <Form onSubmit={handleSubmit} />;

}
```
This looks clunky! **Memoizing functions is common enough that React has a built-in Hook specifically for that. Wrap your functions into [`useCallback`](_reference_react_useCallback.md) instead of `useMemo`** to avoid having to write an extra nested function:
```
export default function Page({ productId, referrer }) {

const handleSubmit = useCallback((orderDetails) => {

post('/product/' + productId + '/buy', {

referrer,

orderDetails

});

}, [productId, referrer]);

return <Form onSubmit={handleSubmit} />;

}
```
The two examples above are completely equivalent. The only benefit to `useCallback` is that it lets you avoid writing an extra nested function inside. It doesn’t do anything else. [Read more about `useCallback`.](_reference_react_useCallback.md)

* * *

## Troubleshooting

### My calculation runs twice on every re-render

In [Strict Mode](_reference_react_StrictMode.md), React will call some of your functions twice instead of once:
```
function TodoList({ todos, tab }) {

// This component function will run twice for every render.

const visibleTodos = useMemo(() => {

// This calculation will run twice if any of the dependencies change.

return filterTodos(todos, tab);

}, [todos, tab]);

// ...
```
This is expected and shouldn’t break your code.

This **development-only** behavior helps you [keep components pure.](_learn_keeping-components-pure.md) React uses the result of one of the calls, and ignores the result of the other call. As long as your component and calculation functions are pure, this shouldn’t affect your logic. However, if they are accidentally impure, this helps you notice and fix the mistake.

For example, this impure calculation function mutates an array you received as a prop:
```
const visibleTodos = useMemo(() => {

// 🚩 Mistake: mutating a prop

todos.push({ id: 'last', text: 'Go for a walk!' });

const filtered = filterTodos(todos, tab);

return filtered;

}, [todos, tab]);
```
React calls your function twice, so you’d notice the todo is added twice. Your calculation shouldn’t change any existing objects, but it’s okay to change any _new_ objects you created during the calculation. For example, if the `filterTodos` function always returns a _different_ array, you can mutate _that_ array instead:
```
const visibleTodos = useMemo(() => {

const filtered = filterTodos(todos, tab);

// ✅ Correct: mutating an object you created during the calculation

filtered.push({ id: 'last', text: 'Go for a walk!' });

return filtered;

}, [todos, tab]);
```
Read [keeping components pure](_learn_keeping-components-pure.md) to learn more about purity.

Also, check out the guides on [updating objects](_learn_updating-objects-in-state.md) and [updating arrays](_learn_updating-arrays-in-state.md) without mutation.

* * *

### My `useMemo` call is supposed to return an object, but returns undefined

This code doesn’t work:
```
// 🔴 You can't return an object from an arrow function with () => {

const searchOptions = useMemo(() => {

    matchMode: 'whole-word',

text: text

}, [text]);
```
In JavaScript, `() => {` starts the arrow function body, so the `{` brace is not a part of your object. This is why it doesn’t return an object, and leads to mistakes. You could fix it by adding parentheses like `({` and `})`:
```
// This works, but is easy for someone to break again

const searchOptions = useMemo(() => ({

matchMode: 'whole-word',

text: text

}), [text]);
```
However, this is still confusing and too easy for someone to break by removing the parentheses.

To avoid this mistake, write a `return` statement explicitly:
```
// ✅ This works and is explicit

const searchOptions = useMemo(() => {

return {

matchMode: 'whole-word',

text: text

};

}, [text]);
```
* * *

### Every time my component renders, the calculation in `useMemo` re-runs

Make sure you’ve specified the dependency array as a second argument!

If you forget the dependency array, `useMemo` will re-run the calculation every time:
```
function TodoList({ todos, tab }) {

// 🔴 Recalculates every time: no dependency array

const visibleTodos = useMemo(() => filterTodos(todos, tab));

// ...
```
This is the corrected version passing the dependency array as a second argument:
```
function TodoList({ todos, tab }) {

// ✅ Does not recalculate unnecessarily

const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

// ...
```
If this doesn’t help, then the problem is that at least one of your dependencies is different from the previous render. You can debug this problem by manually logging your dependencies to the console:
```
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

console.log([todos, tab]);
```
You can then right-click on the arrays from different re-renders in the console and select “Store as a global variable” for both of them. Assuming the first one got saved as `temp1` and the second one got saved as `temp2`, you can then use the browser console to check whether each dependency in both arrays is the same:
```
Object.is(temp1[0], temp2[0]); // Is the first dependency the same between the arrays?

Object.is(temp1[1], temp2[1]); // Is the second dependency the same between the arrays?

Object.is(temp1[2], temp2[2]); // ... and so on for every dependency ...
```
When you find which dependency breaks memoization, either find a way to remove it, or [memoize it as well.](_reference_react_useMemo.md#memoizing-a-dependency-of-another-hook)

* * *

### I need to call `useMemo` for each list item in a loop, but it’s not allowed

Suppose the `Chart` component is wrapped in [`memo`](_reference_react_memo.md). You want to skip re-rendering every `Chart` in the list when the `ReportList` component re-renders. However, you can’t call `useMemo` in a loop:
```
function ReportList({ items }) {

return (

<article>

{items.map(item => {

// 🔴 You can't call useMemo in a loop like this:

const data = useMemo(() => calculateReport(item), [item]);

return (

<figure key={item.id}>

<Chart data={data} />

</figure>

);

})}

</article>

);

}
```
Instead, extract a component for each item and memoize data for individual items:
```
function ReportList({ items }) {

return (

<article>

{items.map(item =>

<Report key={item.id} item={item} />

)}

</article>

);

}

function Report({ item }) {

// ✅ Call useMemo at the top level:

const data = useMemo(() => calculateReport(item), [item]);

return (

<figure>

<Chart data={data} />

</figure>

);

}
```
Alternatively, you could remove `useMemo` and instead wrap `Report` itself in [`memo`.](_reference_react_memo.md) If the `item` prop does not change, `Report` will skip re-rendering, so `Chart` will skip re-rendering too:
```
function ReportList({ items }) {

// ...

}

const Report = memo(function Report({ item }) {

const data = calculateReport(item);

return (

<figure>

<Chart data={data} />

</figure>

);

});
```

#### _reference_react_useOptimistic.md

> Source: https://react.dev/reference/react/useOptimistic
> Scraped: 12/20/2025, 10:40:54 PM

`useOptimistic` is a React Hook that lets you optimistically update the UI.
```
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```
* [Reference](_reference_react_useOptimistic.md#reference)
    * [`useOptimistic(state, updateFn)`](_reference_react_useOptimistic.md#use)
* [Usage](_reference_react_useOptimistic.md#usage)
    * [Optimistically updating forms](_reference_react_useOptimistic.md#optimistically-updating-with-forms)

* * *

## Reference

### `useOptimistic(state, updateFn)`

`useOptimistic` is a React Hook that lets you show a different state while an async action is underway. It accepts some state as an argument and returns a copy of that state that can be different during the duration of an async action such as a network request. You provide a function that takes the current state and the input to the action, and returns the optimistic state to be used while the action is pending.

This state is called the “optimistic” state because it is usually used to immediately present the user with the result of performing an action, even though the action actually takes time to complete.
```
import { useOptimistic } from 'react';

function AppContainer() {

const [optimisticState, addOptimistic] = useOptimistic(

state,

// updateFn

(currentState, optimisticValue) => {

// merge and return new state

// with optimistic value

}

);

}
```
[See more examples below.](_reference_react_useOptimistic.md#usage)

#### Parameters

*   `state`: the value to be returned initially and whenever no action is pending.
*   `updateFn(currentState, optimisticValue)`: a function that takes the current state and the optimistic value passed to `addOptimistic` and returns the resulting optimistic state. It must be a pure function. `updateFn` takes in two parameters. The `currentState` and the `optimisticValue`. The return value will be the merged value of the `currentState` and `optimisticValue`.

#### Returns

*   `optimisticState`: The resulting optimistic state. It is equal to `state` unless an action is pending, in which case it is equal to the value returned by `updateFn`.
*   `addOptimistic`: `addOptimistic` is the dispatching function to call when you have an optimistic update. It takes one argument, `optimisticValue`, of any type and will call the `updateFn` with `state` and `optimisticValue`.

* * *

## Usage

### Optimistically updating forms

The `useOptimistic` Hook provides a way to optimistically update the user interface before a background operation, like a network request, completes. In the context of forms, this technique helps to make apps feel more responsive. When a user submits a form, instead of waiting for the server’s response to reflect the changes, the interface is immediately updated with the expected outcome.

For example, when a user types a message into the form and hits the “Send” button, the `useOptimistic` Hook allows the message to immediately appear in the list with a “Sending…” label, even before the message is actually sent to a server. This “optimistic” approach gives the impression of speed and responsiveness. The form then attempts to truly send the message in the background. Once the server confirms the message has been received, the “Sending…” label is removed.

#### _reference_react_useReducer.md

> Source: https://react.dev/reference/react/useReducer
> Scraped: 12/20/2025, 10:40:56 PM

`useReducer` is a React Hook that lets you add a [reducer](_learn_extracting-state-logic-into-a-reducer.md) to your component.
```
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```
* [Reference](_reference_react_useReducer.md#reference)
    * [`useReducer(reducer, initialArg, init?)`](_reference_react_useReducer.md#usereducer)
    * [`dispatch` function](_reference_react_useReducer.md#dispatch)
* [Usage](_reference_react_useReducer.md#usage)
    * [Adding a reducer to a component](_reference_react_useReducer.md#adding-a-reducer-to-a-component)
    * [Writing the reducer function](_reference_react_useReducer.md#writing-the-reducer-function)
    * [Avoiding recreating the initial state](_reference_react_useReducer.md#avoiding-recreating-the-initial-state)
* [Troubleshooting](_reference_react_useReducer.md#troubleshooting)
    * [I’ve dispatched an action, but logging gives me the old state value](_reference_react_useReducer.md#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value)
    * [I’ve dispatched an action, but the screen doesn’t update](_reference_react_useReducer.md#ive-dispatched-an-action-but-the-screen-doesnt-update)
    * [A part of my reducer state becomes undefined after dispatching](_reference_react_useReducer.md#a-part-of-my-reducer-state-becomes-undefined-after-dispatching)
    * [My entire reducer state becomes undefined after dispatching](_reference_react_useReducer.md#my-entire-reducer-state-becomes-undefined-after-dispatching)
    * [I’m getting an error: “Too many re-renders”](_reference_react_useReducer.md#im-getting-an-error-too-many-re-renders)
    * [My reducer or initializer function runs twice](_reference_react_useReducer.md#my-reducer-or-initializer-function-runs-twice)

* * *

## Reference

### `useReducer(reducer, initialArg, init?)`

Call `useReducer` at the top level of your component to manage its state with a [reducer.](_learn_extracting-state-logic-into-a-reducer.md)
```
import { useReducer } from 'react';

function reducer(state, action) {

// ...

}

function MyComponent() {

const [state, dispatch] = useReducer(reducer, { age: 42 });

// ...
```
[See more examples below.](_reference_react_useReducer.md#usage)

#### Parameters

*   `reducer`: The reducer function that specifies how the state gets updated. It must be pure, should take the state and action as arguments, and should return the next state. State and action can be of any types.
*   `initialArg`: The value from which the initial state is calculated. It can be a value of any type. How the initial state is calculated from it depends on the next `init` argument.
*   **optional** `init`: The initializer function that should return the initial state. If it’s not specified, the initial state is set to `initialArg`. Otherwise, the initial state is set to the result of calling `init(initialArg)`.

#### Returns

`useReducer` returns an array with exactly two values:

1.  The current state. During the first render, it’s set to `init(initialArg)` or `initialArg` (if there’s no `init`).
2.  The [`dispatch` function](_reference_react_useReducer.md#dispatch) that lets you update the state to a different value and trigger a re-render.

#### Caveats

*   `useReducer` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
*   The `dispatch` function has a stable identity, so you will often see it omitted from Effect dependencies, but including it will not cause the Effect to fire. If the linter lets you omit a dependency without errors, it is safe to do. [Learn more about removing Effect dependencies.](_learn_removing-effect-dependencies.md#move-dynamic-objects-and-functions-inside-your-effect)
*   In Strict Mode, React will **call your reducer and initializer twice** in order to [help you find accidental impurities.](_reference_react_useReducer.md#my-reducer-or-initializer-function-runs-twice) This is development-only behavior and does not affect production. If your reducer and initializer are pure (as they should be), this should not affect your logic. The result from one of the calls is ignored.

* * *

### `dispatch` function

The `dispatch` function returned by `useReducer` lets you update the state to a different value and trigger a re-render. You need to pass the action as the only argument to the `dispatch` function:
```
const [state, dispatch] = useReducer(reducer, { age: 42 });

function handleClick() {

dispatch({ type: 'incremented_age' });

// ...
```
React will set the next state to the result of calling the `reducer` function you’ve provided with the current `state` and the action you’ve passed to `dispatch`.

#### Parameters

*   `action`: The action performed by the user. It can be a value of any type. By convention, an action is usually an object with a `type` property identifying it and, optionally, other properties with additional information.

#### Returns

`dispatch` functions do not have a return value.

#### Caveats

*   The `dispatch` function **only updates the state variable for the _next_ render**. If you read the state variable after calling the `dispatch` function, [you will still get the old value](_reference_react_useReducer.md#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value) that was on the screen before your call.

*   If the new value you provide is identical to the current `state`, as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison, React will **skip re-rendering the component and its children.** This is an optimization. React may still need to call your component before ignoring the result, but it shouldn’t affect your code.

*   React [batches state updates.](_learn_queueing-a-series-of-state-updates.md) It updates the screen **after all the event handlers have run** and have called their `set` functions. This prevents multiple re-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use [`flushSync`.](_reference_react-dom_flushSync.md)

* * *

## Usage

### Adding a reducer to a component

Call `useReducer` at the top level of your component to manage state with a [reducer.](_learn_extracting-state-logic-into-a-reducer.md)
```
import { useReducer } from 'react';

function reducer(state, action) {

// ...

}

function MyComponent() {

const [state, dispatch] = useReducer(reducer, { age: 42 });

// ...
```
`useReducer` returns an array with exactly two items:

1.  The current state of this state variable, initially set to the initial state you provided.
2.  The `dispatch` function that lets you change it in response to interaction.

To update what’s on the screen, call `dispatch` with an object representing what the user did, called an _action_:
```
function handleClick() {

dispatch({ type: 'incremented_age' });

}
```
React will pass the current state and the action to your reducer function. Your reducer will calculate and return the next state. React will store that next state, render your component with it, and update the UI.

`useReducer` is very similar to [`useState`](_reference_react_useState.md), but it lets you move the state update logic from event handlers into a single function outside of your component. Read more about [choosing between `useState` and `useReducer`.](_learn_extracting-state-logic-into-a-reducer.md#comparing-usestate-and-usereducer)

* * *

### Writing the reducer function

A reducer function is declared like this:
```
function reducer(state, action) {

// ...

}
```
Then you need to fill in the code that will calculate and return the next state. By convention, it is common to write it as a [`switch` statement.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) For each `case` in the `switch`, calculate and return some next state.
```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

return {

name: state.name,

age: state.age + 1

};

}

case 'changed_name': {

return {

name: action.nextName,

age: state.age

};

}

}

throw Error('Unknown action: ' + action.type);

}
```
Actions can have any shape. By convention, it’s common to pass objects with a `type` property identifying the action. It should include the minimal necessary information that the reducer needs to compute the next state.
```
function Form() {

const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 });

function handleButtonClick() {

dispatch({ type: 'incremented_age' });

}

function handleInputChange(e) {

dispatch({

type: 'changed_name',

nextName: e.target.value

});

}

// ...
```
The action type names are local to your component. [Each action describes a single interaction, even if that leads to multiple changes in data.](_learn_extracting-state-logic-into-a-reducer.md#writing-reducers-well) The shape of the state is arbitrary, but usually it’ll be an object or an array.

Read [extracting state logic into a reducer](_learn_extracting-state-logic-into-a-reducer.md) to learn more.

### Pitfall

State is read-only. Don’t modify any objects or arrays in state:
```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

// 🚩 Don't mutate an object in state like this:

state.age = state.age + 1;

return state;

}
```
Instead, always return new objects from your reducer:
```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

// ✅ Instead, return a new object

return {

...state,

age: state.age + 1

};

}
```
Read [updating objects in state](_learn_updating-objects-in-state.md) and [updating arrays in state](_learn_updating-arrays-in-state.md) to learn more.

* * *

### Avoiding recreating the initial state

React saves the initial state once and ignores it on the next renders.
```
function createInitialState(username) {

// ...

}

function TodoList({ username }) {

const [state, dispatch] = useReducer(reducer, createInitialState(username));

// ...
```
Although the result of `createInitialState(username)` is only used for the initial render, you’re still calling this function on every render. This can be wasteful if it’s creating large arrays or performing expensive calculations.

To solve this, you may **pass it as an _initializer_ function** to `useReducer` as the third argument instead:
```
function createInitialState(username) {

// ...

}

function TodoList({ username }) {

const [state, dispatch] = useReducer(reducer, username, createInitialState);

// ...
```
Notice that you’re passing `createInitialState`, which is the _function itself_, and not `createInitialState()`, which is the result of calling it. This way, the initial state does not get re-created after initialization.

In the above example, `createInitialState` takes a `username` argument. If your initializer doesn’t need any information to compute the initial state, you may pass `null` as the second argument to `useReducer`.

* * *

## Troubleshooting

### I’ve dispatched an action, but logging gives me the old state value

Calling the `dispatch` function **does not change state in the running code**:
```
function handleClick() {

console.log(state.age);  // 42

dispatch({ type: 'incremented_age' }); // Request a re-render with 43

console.log(state.age);  // Still 42!

setTimeout(() => {

console.log(state.age); // Also 42!

}, 5000);

}
```
This is because [states behaves like a snapshot.](_learn_state-as-a-snapshot.md) Updating state requests another render with the new state value, but does not affect the `state` JavaScript variable in your already-running event handler.

If you need to guess the next state value, you can calculate it manually by calling the reducer yourself:
```
const action = { type: 'incremented_age' };

dispatch(action);

const nextState = reducer(state, action);

console.log(state);     // { age: 42 }

console.log(nextState); // { age: 43 }
```
* * *

### I’ve dispatched an action, but the screen doesn’t update

React will **ignore your update if the next state is equal to the previous state,** as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. This usually happens when you change an object or an array in state directly:
```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

// 🚩 Wrong: mutating existing object

state.age++;

return state;

}

case 'changed_name': {

// 🚩 Wrong: mutating existing object

state.name = action.nextName;

return state;

}

// ...

}

}
```
You mutated an existing `state` object and returned it, so React ignored the update. To fix this, you need to ensure that you’re always [updating objects in state](_learn_updating-objects-in-state.md) and [updating arrays in state](_learn_updating-arrays-in-state.md) instead of mutating them:
```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

// ✅ Correct: creating a new object

return {

...state,

age: state.age + 1

};

}

case 'changed_name': {

// ✅ Correct: creating a new object

return {

...state,

name: action.nextName

};

}

// ...

}

}
```
* * *

### A part of my reducer state becomes undefined after dispatching

Make sure that every `case` branch **copies all of the existing fields** when returning the new state:
```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

return {

...state, // Don't forget this!

age: state.age + 1

};

}

// ...
```
Without `...state` above, the returned next state would only contain the `age` field and nothing else.

* * *

### My entire reducer state becomes undefined after dispatching

If your state unexpectedly becomes `undefined`, you’re likely forgetting to `return` state in one of the cases, or your action type doesn’t match any of the `case` statements. To find why, throw an error outside the `switch`:
```
function reducer(state, action) {

switch (action.type) {

case 'incremented_age': {

// ...

}

case 'edited_name': {

// ...

}

}

throw Error('Unknown action: ' + action.type);

}
```
You can also use a static type checker like TypeScript to catch such mistakes.

* * *

### I’m getting an error: “Too many re-renders”

You might get an error that says: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` Typically, this means that you’re unconditionally dispatching an action _during render_, so your component enters a loop: render, dispatch (which causes a render), render, dispatch (which causes a render), and so on. Very often, this is caused by a mistake in specifying an event handler:
```
// 🚩 Wrong: calls the handler during render

return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler

return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function

return <button onClick={(e) => handleClick(e)}>Click me</button>
```
If you can’t find the cause of this error, click on the arrow next to the error in the console and look through the JavaScript stack to find the specific `dispatch` function call responsible for the error.

* * *

### My reducer or initializer function runs twice

In [Strict Mode](_reference_react_StrictMode.md), React will call your reducer and initializer functions twice. This shouldn’t break your code.

This **development-only** behavior helps you [keep components pure.](_learn_keeping-components-pure.md) React uses the result of one of the calls, and ignores the result of the other call. As long as your component, initializer, and reducer functions are pure, this shouldn’t affect your logic. However, if they are accidentally impure, this helps you notice the mistakes.

For example, this impure reducer function mutates an array in state:
```
function reducer(state, action) {

switch (action.type) {

case 'added_todo': {

// 🚩 Mistake: mutating state

state.todos.push({ id: nextId++, text: action.text });

return state;

}

// ...

}

}
```
Because React calls your reducer function twice, you’ll see the todo was added twice, so you’ll know that there is a mistake. In this example, you can fix the mistake by [replacing the array instead of mutating it](_learn_updating-arrays-in-state.md#adding-to-an-array):
```
function reducer(state, action) {

switch (action.type) {

case 'added_todo': {

// ✅ Correct: replacing with new state

return {

...state,

todos: [

...state.todos,

{ id: nextId++, text: action.text }

]

};

}

// ...

}

}
```
Now that this reducer function is pure, calling it an extra time doesn’t make a difference in behavior. This is why React calling it twice helps you find mistakes. **Only component, initializer, and reducer functions need to be pure.** Event handlers don’t need to be pure, so React will never call your event handlers twice.

Read [keeping components pure](_learn_keeping-components-pure.md) to learn more.

#### _reference_react_useRef.md

> Source: https://react.dev/reference/react/useRef
> Scraped: 12/20/2025, 10:40:53 PM

`useRef` is a React Hook that lets you reference a value that’s not needed for rendering.
```
const ref = useRef(initialValue)
```
* [Reference](_reference_react_useRef.md#reference)
    * [`useRef(initialValue)`](_reference_react_useRef.md#useref)
* [Usage](_reference_react_useRef.md#usage)
    * [Referencing a value with a ref](_reference_react_useRef.md#referencing-a-value-with-a-ref)
    * [Manipulating the DOM with a ref](_reference_react_useRef.md#manipulating-the-dom-with-a-ref)
    * [Avoiding recreating the ref contents](_reference_react_useRef.md#avoiding-recreating-the-ref-contents)
* [Troubleshooting](_reference_react_useRef.md#troubleshooting)
    * [I can’t get a ref to a custom component](_reference_react_useRef.md#i-cant-get-a-ref-to-a-custom-component)

* * *

## Reference

### `useRef(initialValue)`

Call `useRef` at the top level of your component to declare a [ref.](_learn_referencing-values-with-refs.md)
```
import { useRef } from 'react';

function MyComponent() {

const intervalRef = useRef(0);

const inputRef = useRef(null);

// ...
```
[See more examples below.](_reference_react_useRef.md#usage)

#### Parameters

*   `initialValue`: The value you want the ref object’s `current` property to be initially. It can be a value of any type. This argument is ignored after the initial render.

#### Returns

`useRef` returns an object with a single property:

*   `current`: Initially, it’s set to the `initialValue` you have passed. You can later set it to something else. If you pass the ref object to React as a `ref` attribute to a JSX node, React will set its `current` property.

On the next renders, `useRef` will return the same object.

#### Caveats

*   You can mutate the `ref.current` property. Unlike state, it is mutable. However, if it holds an object that is used for rendering (for example, a piece of your state), then you shouldn’t mutate that object.
*   When you change the `ref.current` property, React does not re-render your component. React is not aware of when you change it because a ref is a plain JavaScript object.
*   Do not write _or read_ `ref.current` during rendering, except for [initialization.](_reference_react_useRef.md#avoiding-recreating-the-ref-contents) This makes your component’s behavior unpredictable.
*   In Strict Mode, React will **call your component function twice** in order to [help you find accidental impurities.](_reference_react_useState.md#my-initializer-or-updater-function-runs-twice) This is development-only behavior and does not affect production. Each ref object will be created twice, but one of the versions will be discarded. If your component function is pure (as it should be), this should not affect the behavior.

* * *

## Usage

### Referencing a value with a ref

Call `useRef` at the top level of your component to declare one or more [refs.](_learn_referencing-values-with-refs.md)
```
import { useRef } from 'react';

function Stopwatch() {

const intervalRef = useRef(0);

// ...
```
`useRef` returns a ref object with a single `current` property initially set to the initial value you provided.

On the next renders, `useRef` will return the same object. You can change its `current` property to store information and read it later. This might remind you of [state](_reference_react_useState.md), but there is an important difference.

**Changing a ref does not trigger a re-render.** This means refs are perfect for storing information that doesn’t affect the visual output of your component. For example, if you need to store an [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) and retrieve it later, you can put it in a ref. To update the value inside the ref, you need to manually change its `current` property:
```
function handleStartClick() {

const intervalId = setInterval(() => {

// ...

}, 1000);

intervalRef.current = intervalId;

}
```
Later, you can read that interval ID from the ref so that you can call [clear that interval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval):
```
function handleStopClick() {

const intervalId = intervalRef.current;

clearInterval(intervalId);

}
```
By using a ref, you ensure that:

*   You can **store information** between re-renders (unlike regular variables, which reset on every render).
*   Changing it **does not trigger a re-render** (unlike state variables, which trigger a re-render).
*   The **information is local** to each copy of your component (unlike the variables outside, which are shared).

Changing a ref does not trigger a re-render, so refs are not appropriate for storing information you want to display on the screen. Use state for that instead. Read more about [choosing between `useRef` and `useState`.](_learn_referencing-values-with-refs.md#differences-between-refs-and-state)

#### Examples of referencing a value with useRef

#### Click counter

This component uses a ref to keep track of how many times the button was clicked. Note that it’s okay to use a ref instead of state here because the click count is only read and written in an event handler.
```
import { useRef } from 'react';
export default function Counter() {
  let ref = useRef(0);
  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }
  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```
If you show `{ref.current}` in the JSX, the number won’t update on click. This is because setting `ref.current` does not trigger a re-render. Information that’s used for rendering should be state instead.

### Pitfall

**Do not write _or read_ `ref.current` during rendering.**

React expects that the body of your component [behaves like a pure function](_learn_keeping-components-pure.md):

*   If the inputs ([props](_learn_passing-props-to-a-component.md), [state](_learn_state-a-components-memory.md), and [context](_learn_passing-data-deeply-with-context.md)) are the same, it should return exactly the same JSX.
*   Calling it in a different order or with different arguments should not affect the results of other calls.

Reading or writing a ref **during rendering** breaks these expectations.
```
function MyComponent() {

// ...

// 🚩 Don't write a ref during rendering

myRef.current = 123;

// ...

// 🚩 Don't read a ref during rendering

return <h1>{myOtherRef.current}</h1>;

}
```
You can read or write refs **from event handlers or effects instead**.
```
function MyComponent() {

// ...

useEffect(() => {

// ✅ You can read or write refs in effects

myRef.current = 123;

});

// ...

function handleClick() {

// ✅ You can read or write refs in event handlers

doSomething(myOtherRef.current);

}

// ...

}
```
If you _have to_ read [or write](_reference_react_useState.md#storing-information-from-previous-renders) something during rendering, [use state](_reference_react_useState.md) instead.

When you break these rules, your component might still work, but most of the newer features we’re adding to React will rely on these expectations. Read more about [keeping your components pure.](_learn_keeping-components-pure.md#where-you-_can_-cause-side-effects)

* * *

### Manipulating the DOM with a ref

It’s particularly common to use a ref to manipulate the [DOM.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API) React has built-in support for this.

First, declare a ref object with an initial value of `null`:
```
import { useRef } from 'react';

function MyComponent() {

const inputRef = useRef(null);

// ...
```
Then pass your ref object as the `ref` attribute to the JSX of the DOM node you want to manipulate:
```
// ...

return <input ref={inputRef} />;
```
After React creates the DOM node and puts it on the screen, React will set the `current` property of your ref object to that DOM node. Now you can access the `<input>`’s DOM node and call methods like [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus):
```
function handleClick() {

inputRef.current.focus();

}
```
React will set the `current` property back to `null` when the node is removed from the screen.

Read more about [manipulating the DOM with refs.](_learn_manipulating-the-dom-with-refs.md)

#### Examples of manipulating the DOM with useRef

#### Focusing a text input

In this example, clicking the button will focus the input:
```
import { useRef } from 'react';
export default function Form() {
  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```
* * *

### Avoiding recreating the ref contents

React saves the initial ref value once and ignores it on the next renders.
```
function Video() {

const playerRef = useRef(new VideoPlayer());

// ...
```
Although the result of `new VideoPlayer()` is only used for the initial render, you’re still calling this function on every render. This can be wasteful if it’s creating expensive objects.

To solve it, you may initialize the ref like this instead:
```
function Video() {

const playerRef = useRef(null);

if (playerRef.current === null) {

playerRef.current = new VideoPlayer();

}

// ...
```
Normally, writing or reading `ref.current` during render is not allowed. However, it’s fine in this case because the result is always the same, and the condition only executes during initialization so it’s fully predictable.

##### Deep Dive

#### How to avoid null checks when initializing useRef later

If you use a type checker and don’t want to always check for `null`, you can try a pattern like this instead:
```
function Video() {

const playerRef = useRef(null);

function getPlayer() {

if (playerRef.current !== null) {

return playerRef.current;

}

const player = new VideoPlayer();

playerRef.current = player;

return player;

}

// ...
```
Here, the `playerRef` itself is nullable. However, you should be able to convince your type checker that there is no case in which `getPlayer()` returns `null`. Then use `getPlayer()` in your event handlers.

* * *

## Troubleshooting

### I can’t get a ref to a custom component

If you try to pass a `ref` to your own component like this:
```
const inputRef = useRef(null);

return <MyInput ref={inputRef} />;
```
You might get an error in the console:

TypeError: Cannot read properties of null

By default, your own components don’t expose refs to the DOM nodes inside them.

To fix this, find the component that you want to get a ref to:
```
export default function MyInput({ value, onChange }) {

return (

<input

value={value}

onChange={onChange}

/>

);

}
```
And then add `ref` to the list of props your component accepts and pass `ref` as a prop to the relevant child [built-in component](_reference_react-dom_components_common.md) like this:
```
function MyInput({ value, onChange, ref }) {

return (

<input

value={value}

onChange={onChange}

ref={ref}

/>

);

};

export default MyInput;
```
Then the parent component can get a ref to it.

Read more about [accessing another component’s DOM nodes.](_learn_manipulating-the-dom-with-refs.md#accessing-another-components-dom-nodes)

#### _reference_react_useState.md

> Source: https://react.dev/reference/react/useState
> Scraped: 12/20/2025, 10:40:56 PM

`useState` is a React Hook that lets you add a [state variable](_learn_state-a-components-memory.md) to your component.
```
const [state, setState] = useState(initialState)
```
* [Reference](_reference_react_useState.md#reference)
    * [`useState(initialState)`](_reference_react_useState.md#usestate)
    * [`set` functions, like `setSomething(nextState)`](_reference_react_useState.md#setstate)
* [Usage](_reference_react_useState.md#usage)
    * [Adding state to a component](_reference_react_useState.md#adding-state-to-a-component)
    * [Updating state based on the previous state](_reference_react_useState.md#updating-state-based-on-the-previous-state)
    * [Updating objects and arrays in state](_reference_react_useState.md#updating-objects-and-arrays-in-state)
    * [Avoiding recreating the initial state](_reference_react_useState.md#avoiding-recreating-the-initial-state)
    * [Resetting state with a key](_reference_react_useState.md#resetting-state-with-a-key)
    * [Storing information from previous renders](_reference_react_useState.md#storing-information-from-previous-renders)
* [Troubleshooting](_reference_react_useState.md#troubleshooting)
    * [I’ve updated the state, but logging gives me the old value](_reference_react_useState.md#ive-updated-the-state-but-logging-gives-me-the-old-value)
    * [I’ve updated the state, but the screen doesn’t update](_reference_react_useState.md#ive-updated-the-state-but-the-screen-doesnt-update)
    * [I’m getting an error: “Too many re-renders”](_reference_react_useState.md#im-getting-an-error-too-many-re-renders)
    * [My initializer or updater function runs twice](_reference_react_useState.md#my-initializer-or-updater-function-runs-twice)
    * [I’m trying to set state to a function, but it gets called instead](_reference_react_useState.md#im-trying-to-set-state-to-a-function-but-it-gets-called-instead)

* * *

## Reference

### `useState(initialState)`

Call `useState` at the top level of your component to declare a [state variable.](_learn_state-a-components-memory.md)
```
import { useState } from 'react';

function MyComponent() {

const [age, setAge] = useState(28);

const [name, setName] = useState('Taylor');

const [todos, setTodos] = useState(() => createTodos());

// ...
```
The convention is to name state variables like `[something, setSomething]` using [array destructuring.](https://javascript.info/destructuring-assignment)

[See more examples below.](_reference_react_useState.md#usage)

#### Parameters

*   `initialState`: The value you want the state to be initially. It can be a value of any type, but there is a special behavior for functions. This argument is ignored after the initial render.
    *   If you pass a function as `initialState`, it will be treated as an _initializer function_. It should be pure, should take no arguments, and should return a value of any type. React will call your initializer function when initializing the component, and store its return value as the initial state. [See an example below.](_reference_react_useState.md#avoiding-recreating-the-initial-state)

#### Returns

`useState` returns an array with exactly two values:

1.  The current state. During the first render, it will match the `initialState` you have passed.
2.  The [`set` function](_reference_react_useState.md#setstate) that lets you update the state to a different value and trigger a re-render.

#### Caveats

*   `useState` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
*   In Strict Mode, React will **call your initializer function twice** in order to [help you find accidental impurities.](_reference_react_useState.md#my-initializer-or-updater-function-runs-twice) This is development-only behavior and does not affect production. If your initializer function is pure (as it should be), this should not affect the behavior. The result from one of the calls will be ignored.

* * *

### `set` functions, like `setSomething(nextState)`

The `set` function returned by `useState` lets you update the state to a different value and trigger a re-render. You can pass the next state directly, or a function that calculates it from the previous state:
```
const [name, setName] = useState('Edward');

function handleClick() {

setName('Taylor');

setAge(a => a + 1);

// ...
```
#### Parameters

*   `nextState`: The value that you want the state to be. It can be a value of any type, but there is a special behavior for functions.
    *   If you pass a function as `nextState`, it will be treated as an _updater function_. It must be pure, should take the pending state as its only argument, and should return the next state. React will put your updater function in a queue and re-render your component. During the next render, React will calculate the next state by applying all of the queued updaters to the previous state. [See an example below.](_reference_react_useState.md#updating-state-based-on-the-previous-state)

#### Returns

`set` functions do not have a return value.

#### Caveats

*   The `set` function **only updates the state variable for the _next_ render**. If you read the state variable after calling the `set` function, [you will still get the old value](_reference_react_useState.md#ive-updated-the-state-but-logging-gives-me-the-old-value) that was on the screen before your call.

*   If the new value you provide is identical to the current `state`, as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison, React will **skip re-rendering the component and its children.** This is an optimization. Although in some cases React may still need to call your component before skipping the children, it shouldn’t affect your code.

*   React [batches state updates.](_learn_queueing-a-series-of-state-updates.md) It updates the screen **after all the event handlers have run** and have called their `set` functions. This prevents multiple re-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use [`flushSync`.](_reference_react-dom_flushSync.md)

*   The `set` function has a stable identity, so you will often see it omitted from Effect dependencies, but including it will not cause the Effect to fire. If the linter lets you omit a dependency without errors, it is safe to do. [Learn more about removing Effect dependencies.](_learn_removing-effect-dependencies.md#move-dynamic-objects-and-functions-inside-your-effect)

*   Calling the `set` function _during rendering_ is only allowed from within the currently rendering component. React will discard its output and immediately attempt to render it again with the new state. This pattern is rarely needed, but you can use it to **store information from the previous renders**. [See an example below.](_reference_react_useState.md#storing-information-from-previous-renders)

*   In Strict Mode, React will **call your updater function twice** in order to [help you find accidental impurities.](_reference_react_useState.md#my-initializer-or-updater-function-runs-twice) This is development-only behavior and does not affect production. If your updater function is pure (as it should be), this should not affect the behavior. The result from one of the calls will be ignored.

* * *

## Usage

### Adding state to a component

Call `useState` at the top level of your component to declare one or more [state variables.](_learn_state-a-components-memory.md)
```
import { useState } from 'react';

function MyComponent() {

const [age, setAge] = useState(42);

const [name, setName] = useState('Taylor');

// ...
```
The convention is to name state variables like `[something, setSomething]` using [array destructuring.](https://javascript.info/destructuring-assignment)

`useState` returns an array with exactly two items:

1.  The current state of this state variable, initially set to the initial state you provided.
2.  The `set` function that lets you change it to any other value in response to interaction.

To update what’s on the screen, call the `set` function with some next state:
```
function handleClick() {

setName('Robin');

}
```
React will store the next state, render your component again with the new values, and update the UI.

### Pitfall

#### Basic useState examples

#### Counter (number)

In this example, the `count` state variable holds a number. Clicking the button increments it.

* * *

### Updating state based on the previous state

Suppose the `age` is `42`. This handler calls `setAge(age + 1)` three times:
```
function handleClick() {

setAge(age + 1); // setAge(42 + 1)

setAge(age + 1); // setAge(42 + 1)

setAge(age + 1); // setAge(42 + 1)

}
```
However, after one click, `age` will only be `43` rather than `45`! This is because calling the `set` function [does not update](_learn_state-as-a-snapshot.md) the `age` state variable in the already running code. So each `setAge(age + 1)` call becomes `setAge(43)`.

To solve this problem, **you may pass an _updater function_** to `setAge` instead of the next state:
```
function handleClick() {

setAge(a => a + 1); // setAge(42 => 43)

setAge(a => a + 1); // setAge(43 => 44)

setAge(a => a + 1); // setAge(44 => 45)

}
```
Here, `a => a + 1` is your updater function. It takes the pending state and calculates the next state from it.

React puts your updater functions in a [queue.](_learn_queueing-a-series-of-state-updates.md) Then, during the next render, it will call them in the same order:

1.  `a => a + 1` will receive `42` as the pending state and return `43` as the next state.
2.  `a => a + 1` will receive `43` as the pending state and return `44` as the next state.
3.  `a => a + 1` will receive `44` as the pending state and return `45` as the next state.

There are no other queued updates, so React will store `45` as the current state in the end.

By convention, it’s common to name the pending state argument for the first letter of the state variable name, like `a` for `age`. However, you may also call it like `prevAge` or something else that you find clearer.

React may [call your updaters twice](_reference_react_useState.md#my-initializer-or-updater-function-runs-twice) in development to verify that they are [pure.](_learn_keeping-components-pure.md)

##### Deep Dive

#### Is using an updater always preferred?

You might hear a recommendation to always write code like `setAge(a => a + 1)` if the state you’re setting is calculated from the previous state. There is no harm in it, but it is also not always necessary.

In most cases, there is no difference between these two approaches. React always makes sure that for intentional user actions, like clicks, the `age` state variable would be updated before the next click. This means there is no risk of a click handler seeing a “stale” `age` at the beginning of the event handler.

However, if you do multiple updates within the same event, updaters can be helpful. They’re also helpful if accessing the state variable itself is inconvenient (you might run into this when optimizing re-renders).

If you prefer consistency over slightly more verbose syntax, it’s reasonable to always write an updater if the state you’re setting is calculated from the previous state. If it’s calculated from the previous state of some _other_ state variable, you might want to combine them into one object and [use a reducer.](_learn_extracting-state-logic-into-a-reducer.md)

#### The difference between passing an updater and passing the next state directly

#### Passing the updater function

This example passes the updater function, so the “+3” button works.
```
import { useState } from 'react';
export default function Counter() {
  const [age, setAge] = useState(42);
  function increment() {
    setAge(a => a + 1);
  }
  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <button onClick={() => {
        increment();
      }}>+1</button>
    </>
  );
}
```
* * *

### Updating objects and arrays in state

You can put objects and arrays into state. In React, state is considered read-only, so **you should _replace_ it rather than _mutate_ your existing objects**. For example, if you have a `form` object in state, don’t mutate it:
```
// 🚩 Don't mutate an object in state like this:

form.firstName = 'Taylor';
```
Instead, replace the whole object by creating a new one:
```
// ✅ Replace state with a new object

setForm({

...form,

firstName: 'Taylor'

});
```
Read [updating objects in state](_learn_updating-objects-in-state.md) and [updating arrays in state](_learn_updating-arrays-in-state.md) to learn more.

#### Examples of objects and arrays in state

#### Form (object)

In this example, the `form` state variable holds an object. Each input has a change handler that calls `setForm` with the next state of the entire form. The `{ ...form }` spread syntax ensures that the state object is replaced rather than mutated.
```
import { useState } from 'react';
export default function Form() {
  const [form, setForm] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  });
  return (
    <>
      <label>
        First name:
        <input
          value={form.firstName}
          onChange={e => {
            setForm({
              ...form,
              firstName: e.target.value
            });
          }}
        />
      </label>
      <label>
        Last name:
        <input
          value={form.lastName}
          onChange={e => {
            setForm({
              ...form,
              lastName: e.target.value
            });
          }}
        />
      </label>
      <label>
        Email:
        <input
          value={form.email}
          onChange={e => {
            setForm({
              ...form,
              email: e.target.value
            });
          }}
        />
      </label>
      <p>
        {form.firstName}{' '}
        {form.lastName}{' '}
        ({form.email})
      </p>
    </>
  );
}
```
* * *

### Avoiding recreating the initial state

React saves the initial state once and ignores it on the next renders.
```
function TodoList() {

const [todos, setTodos] = useState(createInitialTodos());

// ...
```
Although the result of `createInitialTodos()` is only used for the initial render, you’re still calling this function on every render. This can be wasteful if it’s creating large arrays or performing expensive calculations.

To solve this, you may **pass it as an _initializer_ function** to `useState` instead:
```
function TodoList() {

const [todos, setTodos] = useState(createInitialTodos);

// ...
```
Notice that you’re passing `createInitialTodos`, which is the _function itself_, and not `createInitialTodos()`, which is the result of calling it. If you pass a function to `useState`, React will only call it during initialization.

React may [call your initializers twice](_reference_react_useState.md#my-initializer-or-updater-function-runs-twice) in development to verify that they are [pure.](_learn_keeping-components-pure.md)

#### The difference between passing an initializer and passing the initial state directly

#### Passing the initializer function

This example passes the initializer function, so the `createInitialTodos` function only runs during initialization. It does not run when component re-renders, such as when you type into the input.
```
import { useState } from 'react';
function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: 'Item ' + (i + 1)
    });
  }
  return initialTodos;
}
export default function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState('');
  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        setTodos([{
          id: todos.length,
          text: text
        }, ...todos]);
      }}>Add</button>
      <ul>
        {todos.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```
* * *

### Resetting state with a key

You’ll often encounter the `key` attribute when [rendering lists.](_learn_rendering-lists.md) However, it also serves another purpose.

You can **reset a component’s state by passing a different `key` to a component.** In this example, the Reset button changes the `version` state variable, which we pass as a `key` to the `Form`. When the `key` changes, React re-creates the `Form` component (and all of its children) from scratch, so its state gets reset.

Read [preserving and resetting state](_learn_preserving-and-resetting-state.md) to learn more.
```
import { useState } from 'react';
export default function App() {
  const [version, setVersion] = useState(0);
  function handleReset() {
    setVersion(version + 1);
  }
  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <Form key={version} />
    </>
  );
}
function Form() {
  const [name, setName] = useState('Taylor');
  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Hello, {name}.</p>
    </>
  );
}
```
* * *

### Storing information from previous renders

Usually, you will update state in event handlers. However, in rare cases you might want to adjust state in response to rendering — for example, you might want to change a state variable when a prop changes.

In most cases, you don’t need this:

*   **If the value you need can be computed entirely from the current props or other state, [remove that redundant state altogether.](_learn_choosing-the-state-structure.md#avoid-redundant-state)** If you’re worried about recomputing too often, the [`useMemo` Hook](_reference_react_useMemo.md) can help.
*   If you want to reset the entire component tree’s state, [pass a different `key` to your component.](_reference_react_useState.md#resetting-state-with-a-key)
*   If you can, update all the relevant state in the event handlers.

In the rare case that none of these apply, there is a pattern you can use to update state based on the values that have been rendered so far, by calling a `set` function while your component is rendering.

Here’s an example. This `CountLabel` component displays the `count` prop passed to it:
```
export default function CountLabel({ count }) {

return <h1>{count}</h1>

}
```
Say you want to show whether the counter has _increased or decreased_ since the last change. The `count` prop doesn’t tell you this — you need to keep track of its previous value. Add the `prevCount` state variable to track it. Add another state variable called `trend` to hold whether the count has increased or decreased. Compare `prevCount` with `count`, and if they’re not equal, update both `prevCount` and `trend`. Now you can show both the current count prop and _how it has changed since the last render_.
```
import { useState } from 'react';
export default function CountLabel({ count }) {
  const [prevCount, setPrevCount] = useState(count);
  const [trend, setTrend] = useState(null);
  if (prevCount !== count) {
    setPrevCount(count);
    setTrend(count > prevCount ? 'increasing' : 'decreasing');
  }
  return (
    <>
      <h1>{count}</h1>
      {trend && <p>The count is {trend}</p>}
    </>
  );
}
```
Note that if you call a `set` function while rendering, it must be inside a condition like `prevCount !== count`, and there must be a call like `setPrevCount(count)` inside of the condition. Otherwise, your component would re-render in a loop until it crashes. Also, you can only update the state of the _currently rendering_ component like this. Calling the `set` function of _another_ component during rendering is an error. Finally, your `set` call should still [update state without mutation](_reference_react_useState.md#updating-objects-and-arrays-in-state) — this doesn’t mean you can break other rules of [pure functions.](_learn_keeping-components-pure.md)

This pattern can be hard to understand and is usually best avoided. However, it’s better than updating state in an effect. When you call the `set` function during render, React will re-render that component immediately after your component exits with a `return` statement, and before rendering the children. This way, children don’t need to render twice. The rest of your component function will still execute (and the result will be thrown away). If your condition is below all the Hook calls, you may add an early `return;` to restart rendering earlier.

* * *

## Troubleshooting

### I’ve updated the state, but logging gives me the old value

Calling the `set` function **does not change state in the running code**:
```
function handleClick() {

console.log(count);  // 0

setCount(count + 1); // Request a re-render with 1

console.log(count);  // Still 0!

setTimeout(() => {

console.log(count); // Also 0!

}, 5000);

}
```
This is because [states behaves like a snapshot.](_learn_state-as-a-snapshot.md) Updating state requests another render with the new state value, but does not affect the `count` JavaScript variable in your already-running event handler.

If you need to use the next state, you can save it in a variable before passing it to the `set` function:
```
const nextCount = count + 1;

setCount(nextCount);

console.log(count);     // 0

console.log(nextCount); // 1
```
* * *

### I’ve updated the state, but the screen doesn’t update

React will **ignore your update if the next state is equal to the previous state,** as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. This usually happens when you change an object or an array in state directly:
```
obj.x = 10;  // 🚩 Wrong: mutating existing object

setObj(obj); // 🚩 Doesn't do anything
```
You mutated an existing `obj` object and passed it back to `setObj`, so React ignored the update. To fix this, you need to ensure that you’re always [_replacing_ objects and arrays in state instead of _mutating_ them](_reference_react_useState.md#updating-objects-and-arrays-in-state):
```
// ✅ Correct: creating a new object

setObj({

...obj,

x: 10

});
```
* * *

### I’m getting an error: “Too many re-renders”

You might get an error that says: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` Typically, this means that you’re unconditionally setting state _during render_, so your component enters a loop: render, set state (which causes a render), render, set state (which causes a render), and so on. Very often, this is caused by a mistake in specifying an event handler:
```
// 🚩 Wrong: calls the handler during render

return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler

return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function

return <button onClick={(e) => handleClick(e)}>Click me</button>
```
If you can’t find the cause of this error, click on the arrow next to the error in the console and look through the JavaScript stack to find the specific `set` function call responsible for the error.

* * *

### My initializer or updater function runs twice

In [Strict Mode](_reference_react_StrictMode.md), React will call some of your functions twice instead of once:
```
function TodoList() {

// This component function will run twice for every render.

const [todos, setTodos] = useState(() => {

// This initializer function will run twice during initialization.

return createTodos();

});

function handleClick() {

setTodos(prevTodos => {

// This updater function will run twice for every click.

return [...prevTodos, createTodo()];

});

}

// ...
```
This is expected and shouldn’t break your code.

This **development-only** behavior helps you [keep components pure.](_learn_keeping-components-pure.md) React uses the result of one of the calls, and ignores the result of the other call. As long as your component, initializer, and updater functions are pure, this shouldn’t affect your logic. However, if they are accidentally impure, this helps you notice the mistakes.

For example, this impure updater function mutates an array in state:
```
setTodos(prevTodos => {

// 🚩 Mistake: mutating state

prevTodos.push(createTodo());

});
```
Because React calls your updater function twice, you’ll see the todo was added twice, so you’ll know that there is a mistake. In this example, you can fix the mistake by [replacing the array instead of mutating it](_reference_react_useState.md#updating-objects-and-arrays-in-state):
```
setTodos(prevTodos => {

// ✅ Correct: replacing with new state

return [...prevTodos, createTodo()];

});
```
Now that this updater function is pure, calling it an extra time doesn’t make a difference in behavior. This is why React calling it twice helps you find mistakes. **Only component, initializer, and updater functions need to be pure.** Event handlers don’t need to be pure, so React will never call your event handlers twice.

Read [keeping components pure](_learn_keeping-components-pure.md) to learn more.

* * *

### I’m trying to set state to a function, but it gets called instead

You can’t put a function into state like this:
```
const [fn, setFn] = useState(someFunction);

function handleClick() {

setFn(someOtherFunction);

}
```
Because you’re passing a function, React assumes that `someFunction` is an [initializer function](_reference_react_useState.md#avoiding-recreating-the-initial-state), and that `someOtherFunction` is an [updater function](_reference_react_useState.md#updating-state-based-on-the-previous-state), so it tries to call them and store the result. To actually _store_ a function, you have to put `() =>` before them in both cases. Then React will store the functions you pass.
```
const [fn, setFn] = useState(() => someFunction);

function handleClick() {

setFn(() => someOtherFunction);

}
```

#### _reference_react_useSyncExternalStore.md

> Source: https://react.dev/reference/react/useSyncExternalStore
> Scraped: 12/20/2025, 10:40:54 PM

`useSyncExternalStore` is a React Hook that lets you subscribe to an external store.
```
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```
* [Reference](_reference_react_useSyncExternalStore.md#reference)
    * [`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`](_reference_react_useSyncExternalStore.md#usesyncexternalstore)
* [Usage](_reference_react_useSyncExternalStore.md#usage)
    * [Subscribing to an external store](_reference_react_useSyncExternalStore.md#subscribing-to-an-external-store)
    * [Subscribing to a browser API](_reference_react_useSyncExternalStore.md#subscribing-to-a-browser-api)
    * [Extracting the logic to a custom Hook](_reference_react_useSyncExternalStore.md#extracting-the-logic-to-a-custom-hook)
    * [Adding support for server rendering](_reference_react_useSyncExternalStore.md#adding-support-for-server-rendering)
* [Troubleshooting](_reference_react_useSyncExternalStore.md#troubleshooting)
    * [I’m getting an error: “The result of `getSnapshot` should be cached”](_reference_react_useSyncExternalStore.md#im-getting-an-error-the-result-of-getsnapshot-should-be-cached)
    * [My `subscribe` function gets called after every re-render](_reference_react_useSyncExternalStore.md#my-subscribe-function-gets-called-after-every-re-render)

* * *

## Reference

### `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`

Call `useSyncExternalStore` at the top level of your component to read a value from an external data store.
```
import { useSyncExternalStore } from 'react';

import { todosStore } from './todoStore.js';

function TodosApp() {

const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);

// ...

}
```
It returns the snapshot of the data in the store. You need to pass two functions as arguments:

1.  The `subscribe` function should subscribe to the store and return a function that unsubscribes.
2.  The `getSnapshot` function should read a snapshot of the data from the store.

[See more examples below.](_reference_react_useSyncExternalStore.md#usage)

#### Parameters

*   `subscribe`: A function that takes a single `callback` argument and subscribes it to the store. When the store changes, it should invoke the provided `callback`, which will cause React to re-call `getSnapshot` and (if needed) re-render the component. The `subscribe` function should return a function that cleans up the subscription.

*   `getSnapshot`: A function that returns a snapshot of the data in the store that’s needed by the component. While the store has not changed, repeated calls to `getSnapshot` must return the same value. If the store changes and the returned value is different (as compared by [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), React re-renders the component.

*   **optional** `getServerSnapshot`: A function that returns the initial snapshot of the data in the store. It will be used only during server rendering and during hydration of server-rendered content on the client. The server snapshot must be the same between the client and the server, and is usually serialized and passed from the server to the client. If you omit this argument, rendering the component on the server will throw an error.

#### Returns

The current snapshot of the store which you can use in your rendering logic.

#### Caveats

*   The store snapshot returned by `getSnapshot` must be immutable. If the underlying store has mutable data, return a new immutable snapshot if the data has changed. Otherwise, return a cached last snapshot.

*   If a different `subscribe` function is passed during a re-render, React will re-subscribe to the store using the newly passed `subscribe` function. You can prevent this by declaring `subscribe` outside the component.

*   If the store is mutated during a [non-blocking Transition update](_reference_react_useTransition.md), React will fall back to performing that update as blocking. Specifically, for every Transition update, React will call `getSnapshot` a second time just before applying changes to the DOM. If it returns a different value than when it was called originally, React will restart the update from scratch, this time applying it as a blocking update, to ensure that every component on screen is reflecting the same version of the store.

*   It’s not recommended to _suspend_ a render based on a store value returned by `useSyncExternalStore`. The reason is that mutations to the external store cannot be marked as [non-blocking Transition updates](_reference_react_useTransition.md), so they will trigger the nearest [`Suspense` fallback](_reference_react_Suspense.md), replacing already-rendered content on screen with a loading spinner, which typically makes a poor UX.

    For example, the following are discouraged:

    ```
    const LazyProductDetailPage = lazy(() => import('./ProductDetailPage.js'));

    function ShoppingApp() {

    const selectedProductId = useSyncExternalStore(...);

    // ❌ Calling `use` with a Promise dependent on `selectedProductId`

    const data = use(fetchItem(selectedProductId))

    // ❌ Conditionally rendering a lazy component based on `selectedProductId`

    return selectedProductId != null ? <LazyProductDetailPage /> : <FeaturedProducts />;

    }

    ```
* * *

## Usage

### Subscribing to an external store

Most of your React components will only read data from their [props,](_learn_passing-props-to-a-component.md) [state,](_reference_react_useState.md) and [context.](_reference_react_useContext.md) However, sometimes a component needs to read some data from some store outside of React that changes over time. This includes:

*   Third-party state management libraries that hold state outside of React.
*   Browser APIs that expose a mutable value and events to subscribe to its changes.

Call `useSyncExternalStore` at the top level of your component to read a value from an external data store.
```
import { useSyncExternalStore } from 'react';

import { todosStore } from './todoStore.js';

function TodosApp() {

const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);

// ...

}
```
It returns the snapshot of the data in the store. You need to pass two functions as arguments:

1.  The `subscribe` function should subscribe to the store and return a function that unsubscribes.
2.  The `getSnapshot` function should read a snapshot of the data from the store.

React will use these functions to keep your component subscribed to the store and re-render it on changes.

For example, in the sandbox below, `todosStore` is implemented as an external store that stores data outside of React. The `TodosApp` component connects to that external store with the `useSyncExternalStore` Hook.
```
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';
export default function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
```
### Note

When possible, we recommend using built-in React state with [`useState`](_reference_react_useState.md) and [`useReducer`](_reference_react_useReducer.md) instead. The `useSyncExternalStore` API is mostly useful if you need to integrate with existing non-React code.

* * *

### Subscribing to a browser API

Another reason to add `useSyncExternalStore` is when you want to subscribe to some value exposed by the browser that changes over time. For example, suppose that you want your component to display whether the network connection is active. The browser exposes this information via a property called [`navigator.onLine`.](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine)

This value can change without React’s knowledge, so you should read it with `useSyncExternalStore`.
```
import { useSyncExternalStore } from 'react';

function ChatIndicator() {

const isOnline = useSyncExternalStore(subscribe, getSnapshot);

// ...

}
```
To implement the `getSnapshot` function, read the current value from the browser API:
```
function getSnapshot() {

return navigator.onLine;

}
```
### Adding support for server rendering

If your React app uses [server rendering,](_reference_react-dom_server.md) your React components will also run outside the browser environment to generate the initial HTML. This creates a few challenges when connecting to an external store:

*   If you’re connecting to a browser-only API, it won’t work because it does not exist on the server.
*   If you’re connecting to a third-party data store, you’ll need its data to match between the server and client.

To solve these issues, pass a `getServerSnapshot` function as the third argument to `useSyncExternalStore`:
```
import { useSyncExternalStore } from 'react';

export function useOnlineStatus() {

const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

return isOnline;

}

function getSnapshot() {

return navigator.onLine;

}

function getServerSnapshot() {

return true; // Always show "Online" for server-generated HTML

}

function subscribe(callback) {

// ...

}
```
The `getServerSnapshot` function is similar to `getSnapshot`, but it runs only in two situations:

*   It runs on the server when generating the HTML.
*   It runs on the client during [hydration](_reference_react-dom_client_hydrateRoot.md), i.e. when React takes the server HTML and makes it interactive.

This lets you provide the initial snapshot value which will be used before the app becomes interactive. If there is no meaningful initial value for the server rendering, omit this argument to [force rendering on the client.](_reference_react_Suspense.md#providing-a-fallback-for-server-errors-and-client-only-content)

### Note

Make sure that `getServerSnapshot` returns the same exact data on the initial client render as it returned on the server. For example, if `getServerSnapshot` returned some prepopulated store content on the server, you need to transfer this content to the client. One way to do this is to emit a `<script>` tag during server rendering that sets a global like `window.MY_STORE_DATA`, and read from that global on the client in `getServerSnapshot`. Your external store should provide instructions on how to do that.

* * *

## Troubleshooting

### I’m getting an error: “The result of `getSnapshot` should be cached”

This error means your `getSnapshot` function returns a new object every time it’s called, for example:
```
function getSnapshot() {

// 🔴 Do not return always different objects from getSnapshot

return {

todos: myStore.todos

};

}
```
React will re-render the component if `getSnapshot` return value is different from the last time. This is why, if you always return a different value, you will enter an infinite loop and get this error.

Your `getSnapshot` object should only return a different object if something has actually changed. If your store contains immutable data, you can return that data directly:
```
function getSnapshot() {

// ✅ You can return immutable data

return myStore.todos;

}
```
If your store data is mutable, your `getSnapshot` function should return an immutable snapshot of it. This means it _does_ need to create new objects, but it shouldn’t do this for every single call. Instead, it should store the last calculated snapshot, and return the same snapshot as the last time if the data in the store has not changed. How you determine whether mutable data has changed depends on your mutable store.

* * *

### My `subscribe` function gets called after every re-render

This `subscribe` function is defined _inside_ a component so it is different on every re-render:
```
function ChatIndicator() {

// 🚩 Always a different function, so React will resubscribe on every re-render

function subscribe() {

// ...

}

const isOnline = useSyncExternalStore(subscribe, getSnapshot);

// ...

}
```
React will resubscribe to your store if you pass a different `subscribe` function between re-renders. If this causes performance issues and you’d like to avoid resubscribing, move the `subscribe` function outside:
```
// ✅ Always the same function, so React won't need to resubscribe

function subscribe() {

// ...

}

function ChatIndicator() {

const isOnline = useSyncExternalStore(subscribe, getSnapshot);

// ...

}
```
Alternatively, wrap `subscribe` into [`useCallback`](_reference_react_useCallback.md) to only resubscribe when some argument changes:
```
function ChatIndicator({ userId }) {

// ✅ Same function as long as userId doesn't change

const subscribe = useCallback(() => {

// ...

}, [userId]);

const isOnline = useSyncExternalStore(subscribe, getSnapshot);

// ...

}
```

#### _reference_react_useTransition.md

> Source: https://react.dev/reference/react/useTransition
> Scraped: 12/20/2025, 10:40:55 PM

`useTransition` is a React Hook that lets you render a part of the UI in the background.
```
const [isPending, startTransition] = useTransition()
```
* [Reference](_reference_react_useTransition.md#reference)
    * [`useTransition()`](_reference_react_useTransition.md#usetransition)
    * [`startTransition(action)`](_reference_react_useTransition.md#starttransition)
* [Usage](_reference_react_useTransition.md#usage)
    * [Perform non-blocking updates with Actions](_reference_react_useTransition.md#perform-non-blocking-updates-with-actions)
    * [Exposing `action` prop from components](_reference_react_useTransition.md#exposing-action-props-from-components)
    * [Displaying a pending visual state](_reference_react_useTransition.md#displaying-a-pending-visual-state)
    * [Preventing unwanted loading indicators](_reference_react_useTransition.md#preventing-unwanted-loading-indicators)
    * [Building a Suspense-enabled router](_reference_react_useTransition.md#building-a-suspense-enabled-router)
    * [Displaying an error to users with an error boundary](_reference_react_useTransition.md#displaying-an-error-to-users-with-error-boundary)
* [Troubleshooting](_reference_react_useTransition.md#troubleshooting)
    * [Updating an input in a Transition doesn’t work](_reference_react_useTransition.md#updating-an-input-in-a-transition-doesnt-work)
    * [React doesn’t treat my state update as a Transition](_reference_react_useTransition.md#react-doesnt-treat-my-state-update-as-a-transition)
    * [React doesn’t treat my state update after `await` as a Transition](_reference_react_useTransition.md#react-doesnt-treat-my-state-update-after-await-as-a-transition)
    * [I want to call `useTransition` from outside a component](_reference_react_useTransition.md#i-want-to-call-usetransition-from-outside-a-component)
    * [The function I pass to `startTransition` executes immediately](_reference_react_useTransition.md#the-function-i-pass-to-starttransition-executes-immediately)
    * [My state updates in Transitions are out of order](_reference_react_useTransition.md#my-state-updates-in-transitions-are-out-of-order)

* * *

## Reference

### `useTransition()`

Call `useTransition` at the top level of your component to mark some state updates as Transitions.
```
import { useTransition } from 'react';

function TabContainer() {

const [isPending, startTransition] = useTransition();

// ...

}
```
[See more examples below.](_reference_react_useTransition.md#usage)

#### Parameters

`useTransition` does not take any parameters.

#### Returns

`useTransition` returns an array with exactly two items:

1.  The `isPending` flag that tells you whether there is a pending Transition.
2.  The [`startTransition` function](_reference_react_useTransition.md#starttransition) that lets you mark updates as a Transition.

* * *

### `startTransition(action)`

The `startTransition` function returned by `useTransition` lets you mark an update as a Transition.
```
function TabContainer() {

const [isPending, startTransition] = useTransition();

const [tab, setTab] = useState('about');

function selectTab(nextTab) {

startTransition(() => {

setTab(nextTab);

});

}

// ...

}
```
### Note

#### Functions called in `startTransition` are called “Actions”.

The function passed to `startTransition` is called an “Action”. By convention, any callback called inside `startTransition` (such as a callback prop) should be named `action` or include the “Action” suffix:
```
function SubmitButton({ submitAction }) {

const [isPending, startTransition] = useTransition();

return (

<button

disabled={isPending}

onClick={() => {

startTransition(async () => {

await submitAction();

});

}}

>

      Submit

</button>

);

}
```
#### Parameters

*   `action`: A function that updates some state by calling one or more [`set` functions](_reference_react_useState.md#setstate). React calls `action` immediately with no parameters and marks all state updates scheduled synchronously during the `action` function call as Transitions. Any async calls that are awaited in the `action` will be included in the Transition, but currently require wrapping any `set` functions after the `await` in an additional `startTransition` (see [Troubleshooting](_reference_react_useTransition.md#react-doesnt-treat-my-state-update-after-await-as-a-transition)). State updates marked as Transitions will be [non-blocking](_reference_react_useTransition.md#perform-non-blocking-updates-with-actions) and [will not display unwanted loading indicators](_reference_react_useTransition.md#preventing-unwanted-loading-indicators).

#### Returns

`startTransition` does not return anything.

#### Caveats

*   `useTransition` is a Hook, so it can only be called inside components or custom Hooks. If you need to start a Transition somewhere else (for example, from a data library), call the standalone [`startTransition`](_reference_react_startTransition.md) instead.

*   You can wrap an update into a Transition only if you have access to the `set` function of that state. If you want to start a Transition in response to some prop or a custom Hook value, try [`useDeferredValue`](_reference_react_useDeferredValue.md) instead.

*   The function you pass to `startTransition` is called immediately, marking all state updates that happen while it executes as Transitions. If you try to perform state updates in a `setTimeout`, for example, they won’t be marked as Transitions.

*   You must wrap any state updates after any async requests in another `startTransition` to mark them as Transitions. This is a known limitation that we will fix in the future (see [Troubleshooting](_reference_react_useTransition.md#react-doesnt-treat-my-state-update-after-await-as-a-transition)).

*   The `startTransition` function has a stable identity, so you will often see it omitted from Effect dependencies, but including it will not cause the Effect to fire. If the linter lets you omit a dependency without errors, it is safe to do. [Learn more about removing Effect dependencies.](_learn_removing-effect-dependencies.md#move-dynamic-objects-and-functions-inside-your-effect)

*   A state update marked as a Transition will be interrupted by other state updates. For example, if you update a chart component inside a Transition, but then start typing into an input while the chart is in the middle of a re-render, React will restart the rendering work on the chart component after handling the input update.

*   Transition updates can’t be used to control text inputs.

*   If there are multiple ongoing Transitions, React currently batches them together. This is a limitation that may be removed in a future release.

## Usage

### Perform non-blocking updates with Actions

Call `useTransition` at the top of your component to create Actions, and access the pending state:
```
import {useState, useTransition} from 'react';

function CheckoutForm() {

const [isPending, startTransition] = useTransition();

// ...

}
```
`useTransition` returns an array with exactly two items:

1.  The `isPending` flag that tells you whether there is a pending Transition.
2.  The `startTransition` function that lets you create an Action.

To start a Transition, pass a function to `startTransition` like this:
```
import {useState, useTransition} from 'react';

import {updateQuantity} from './api';

function CheckoutForm() {

const [isPending, startTransition] = useTransition();

const [quantity, setQuantity] = useState(1);

function onSubmit(newQuantity) {

startTransition(async function () {

const savedQuantity = await updateQuantity(newQuantity);

startTransition(() => {

setQuantity(savedQuantity);

});

});

}

// ...

}
```
The function passed to `startTransition` is called the “Action”. You can update state and (optionally) perform side effects within an Action, and the work will be done in the background without blocking user interactions on the page. A Transition can include multiple Actions, and while a Transition is in progress, your UI stays responsive. For example, if the user clicks a tab but then changes their mind and clicks another tab, the second click will be immediately handled without waiting for the first update to finish.

To give the user feedback about in-progress Transitions, the `isPending` state switches to `true` at the first call to `startTransition`, and stays `true` until all Actions complete and the final state is shown to the user. Transitions ensure side effects in Actions to complete in order to [prevent unwanted loading indicators](_reference_react_useTransition.md#preventing-unwanted-loading-indicators), and you can provide immediate feedback while the Transition is in progress with `useOptimistic`.

#### The difference between Actions and regular event handling

#### Updating the quantity in an Action

In this example, the `updateQuantity` function simulates a request to the server to update the item’s quantity in the cart. This function is _artificially slowed down_ so that it takes at least a second to complete the request.

Update the quantity multiple times quickly. Notice that the pending “Total” state is shown while any requests are in progress, and the “Total” updates only after the final request is complete. Because the update is in an Action, the “quantity” can continue to be updated while the request is in progress.
```
import { useState, useTransition } from "react";
import { updateQuantity } from "./api";
import Item from "./Item";
import Total from "./Total";
export default function App({}) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const updateQuantityAction = async newQuantity => {
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() => {
        setQuantity(savedQuantity);
      });
    });
  };
  return (

      <h1>Checkout</h1>
      <Item action={updateQuantityAction}/>
      <hr />
      <Total quantity={quantity} isPending={isPending} />

  );
}
```
This is a basic example to demonstrate how Actions work, but this example does not handle requests completing out of order. When updating the quantity multiple times, it’s possible for the previous requests to finish after later requests causing the quantity to update out of order. This is a known limitation that we will fix in the future (see [Troubleshooting](_reference_react_useTransition.md#my-state-updates-in-transitions-are-out-of-order) below).

For common use cases, React provides built-in abstractions such as:

* [`useActionState`](_reference_react_useActionState.md)
* [`<form>` actions](_reference_react-dom_components_form.md)
* [Server Functions](_reference_rsc_server-functions.md)

These solutions handle request ordering for you. When using Transitions to build your own custom hooks or libraries that manage async state transitions, you have greater control over the request ordering, but you must handle it yourself.

* * *

### Exposing `action` prop from components

You can expose an `action` prop from a component to allow a parent to call an Action.

For example, this `TabButton` component wraps its `onClick` logic in an `action` prop:
```
export default function TabButton({ action, children, isActive }) {

const [isPending, startTransition] = useTransition();

if (isActive) {

return <b>{children}</b>

}

return (

<button onClick={() => {

startTransition(async () => {

// await the action that's passed in.

// This allows it to be either sync or async.

await action();

});

}}>

{children}

</button>

);

}
```
Because the parent component updates its state inside the `action`, that state update gets marked as a Transition. This means you can click on “Posts” and then immediately click “Contact” and it does not block user interactions:
```
import { useTransition } from 'react';
export default function TabButton({ action, children, isActive }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  return (
    <button onClick={async () => {
      startTransition(async () => {
        await action();
      });
    }}>
      {children}
    </button>
  );
}
```
### Note

When exposing an `action` prop from a component, you should `await` it inside the transition.

This allows the `action` callback to be either synchronous or asynchronous without requiring an additional `startTransition` to wrap the `await` in the action.

* * *

### Displaying a pending visual state

You can use the `isPending` boolean value returned by `useTransition` to indicate to the user that a Transition is in progress. For example, the tab button can have a special “pending” visual state:
```
function TabButton({ action, children, isActive }) {

const [isPending, startTransition] = useTransition();

// ...

if (isPending) {

return <b className="pending">{children}</b>;

}

// ...
```
Notice how clicking “Posts” now feels more responsive because the tab button itself updates right away:
```
import { useTransition } from 'react';
export default function TabButton({ action, children, isActive }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  return (
    <button onClick={() => {
      startTransition(async () => {
        await action();
      });
    }}>
      {children}
    </button>
  );
}
```
* * *

### Preventing unwanted loading indicators

In this example, the `PostsTab` component fetches some data using [use](_reference_react_use.md). When you click the “Posts” tab, the `PostsTab` component _suspends_, causing the closest loading fallback to appear:
```
import { Suspense, useState } from 'react';
import TabButton from './TabButton.js';
import AboutTab from './AboutTab.js';
import PostsTab from './PostsTab.js';
import ContactTab from './ContactTab.js';
export default function TabContainer() {
  const [tab, setTab] = useState('about');
  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
      <TabButton
        isActive={tab === 'about'}
        action={() => setTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        action={() => setTab('posts')}
      >
        Posts
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        action={() => setTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </Suspense>
  );
}
```
Hiding the entire tab container to show a loading indicator leads to a jarring user experience. If you add `useTransition` to `TabButton`, you can instead display the pending state in the tab button instead.

Notice that clicking “Posts” no longer replaces the entire tab container with a spinner:
```
import { useTransition } from 'react';
export default function TabButton({ action, children, isActive }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  return (
    <button onClick={() => {
      startTransition(async () => {
        await action();
      });
    }}>
      {children}
    </button>
  );
}
```
[Read more about using Transitions with Suspense.](_reference_react_Suspense.md#preventing-already-revealed-content-from-hiding)

### Note

Transitions only “wait” long enough to avoid hiding _already revealed_ content (like the tab container). If the Posts tab had a [nested `<Suspense>` boundary,](_reference_react_Suspense.md#revealing-nested-content-as-it-loads) the Transition would not “wait” for it.

* * *

### Building a Suspense-enabled router

If you’re building a React framework or a router, we recommend marking page navigations as Transitions.
```
function Router() {

const [page, setPage] = useState('/');

const [isPending, startTransition] = useTransition();

function navigate(url) {

startTransition(() => {

setPage(url);

});

}

// ...
```
This is recommended for three reasons:

* [Transitions are interruptible,](_reference_react_useTransition.md#perform-non-blocking-updates-with-actions) which lets the user click away without waiting for the re-render to complete.
* [Transitions prevent unwanted loading indicators,](_reference_react_useTransition.md#preventing-unwanted-loading-indicators) which lets the user avoid jarring jumps on navigation.
* [Transitions wait for all pending actions](_reference_react_useTransition.md#perform-non-blocking-updates-with-actions) which lets the user wait for side effects to complete before the new page is shown.

Here is a simplified router example using Transitions for navigations.
```
import { Suspense, useState, useTransition } from 'react';
import IndexPage from './IndexPage.js';
import ArtistPage from './ArtistPage.js';
import Layout from './Layout.js';
export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}
function Router() {
  const [page, setPage] = useState('/');
  const [isPending, startTransition] = useTransition();
  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }
  let content;
  if (page === '/') {
    content = (
      <IndexPage navigate={navigate} />
    );
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  }
  return (
    <Layout isPending={isPending}>
      {content}
    </Layout>
  );
}
function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
```
### Note

[Suspense-enabled](_reference_react_Suspense.md) routers are expected to wrap the navigation updates into Transitions by default.

* * *

### Displaying an error to users with an error boundary

If a function passed to `startTransition` throws an error, you can display an error to your user with an [error boundary](_reference_react_Component.md#catching-rendering-errors-with-an-error-boundary). To use an error boundary, wrap the component where you are calling the `useTransition` in an error boundary. Once the function passed to `startTransition` errors, the fallback for the error boundary will be displayed.
```
import { useTransition } from "react";
import { ErrorBoundary } from "react-error-boundary";
export function AddCommentContainer() {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <AddCommentButton />
    </ErrorBoundary>
  );
}
function addComment(comment) {
  if (comment == null) {
    throw new Error("Example Error: An error thrown to trigger error boundary");
  }
}
function AddCommentButton() {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => {
        startTransition(() => {
          addComment();
        });
      }}
    >
      Add comment
    </button>
  );
}
```
* * *

## Troubleshooting

### Updating an input in a Transition doesn’t work

You can’t use a Transition for a state variable that controls an input:
```
const [text, setText] = useState('');

// ...

function handleChange(e) {

// ❌ Can't use Transitions for controlled input state

startTransition(() => {

setText(e.target.value);

});

}

// ...

return <input value={text} onChange={handleChange} />;
```
This is because Transitions are non-blocking, but updating an input in response to the change event should happen synchronously. If you want to run a Transition in response to typing, you have two options:

1.  You can declare two separate state variables: one for the input state (which always updates synchronously), and one that you will update in a Transition. This lets you control the input using the synchronous state, and pass the Transition state variable (which will “lag behind” the input) to the rest of your rendering logic.
2.  Alternatively, you can have one state variable, and add [`useDeferredValue`](_reference_react_useDeferredValue.md) which will “lag behind” the real value. It will trigger non-blocking re-renders to “catch up” with the new value automatically.

* * *

### React doesn’t treat my state update as a Transition

When you wrap a state update in a Transition, make sure that it happens _during_ the `startTransition` call:
```
startTransition(() => {

// ✅ Setting state *during* startTransition call

setPage('/about');

});
```
The function you pass to `startTransition` must be synchronous. You can’t mark an update as a Transition like this:
```
startTransition(() => {

// ❌ Setting state *after* startTransition call

setTimeout(() => {

setPage('/about');

}, 1000);

});
```
Instead, you could do this:
```
setTimeout(() => {

startTransition(() => {

// ✅ Setting state *during* startTransition call

setPage('/about');

});

}, 1000);
```
* * *

### React doesn’t treat my state update after `await` as a Transition

When you use `await` inside a `startTransition` function, the state updates that happen after the `await` are not marked as Transitions. You must wrap state updates after each `await` in a `startTransition` call:
```
startTransition(async () => {

await someAsyncFunction();

// ❌ Not using startTransition after await

setPage('/about');

});
```
However, this works instead:
```
startTransition(async () => {

await someAsyncFunction();

// ✅ Using startTransition *after* await

startTransition(() => {

setPage('/about');

});

});
```
This is a JavaScript limitation due to React losing the scope of the async context. In the future, when [AsyncContext](https://github.com/tc39/proposal-async-context) is available, this limitation will be removed.

* * *

### I want to call `useTransition` from outside a component

You can’t call `useTransition` outside a component because it’s a Hook. In this case, use the standalone [`startTransition`](_reference_react_startTransition.md) method instead. It works the same way, but it doesn’t provide the `isPending` indicator.

* * *

### The function I pass to `startTransition` executes immediately

If you run this code, it will print 1, 2, 3:
```
console.log(1);

startTransition(() => {

console.log(2);

setPage('/about');

});

console.log(3);
```
**It is expected to print 1, 2, 3.** The function you pass to `startTransition` does not get delayed. Unlike with the browser `setTimeout`, it does not run the callback later. React executes your function immediately, but any state updates scheduled _while it is running_ are marked as Transitions. You can imagine that it works like this:
```
// A simplified version of how React works

let isInsideTransition = false;

function startTransition(scope) {

isInsideTransition = true;

scope();

isInsideTransition = false;

}

function setState() {

if (isInsideTransition) {

// ... schedule a Transition state update ...

} else {

// ... schedule an urgent state update ...

}

}
```
### My state updates in Transitions are out of order

If you `await` inside `startTransition`, you might see the updates happen out of order.

In this example, the `updateQuantity` function simulates a request to the server to update the item’s quantity in the cart. This function _artificially returns every other request after the previous_ to simulate race conditions for network requests.

Try updating the quantity once, then update it quickly multiple times. You might see the incorrect total:
```
import { useState, useTransition } from "react";
import { updateQuantity } from "./api";
import Item from "./Item";
import Total from "./Total";
export default function App({}) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [clientQuantity, setClientQuantity] = useState(1);
  const updateQuantityAction = newQuantity => {
    setClientQuantity(newQuantity);
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() => {
        setQuantity(savedQuantity);
      });
    });
  };
  return (

      <h1>Checkout</h1>
      <Item action={updateQuantityAction}/>
      <hr />
      <Total clientQuantity={clientQuantity} savedQuantity={quantity} isPending={isPending} />

  );
}
```
When clicking multiple times, it’s possible for previous requests to finish after later requests. When this happens, React currently has no way to know the intended order. This is because the updates are scheduled asynchronously, and React loses context of the order across the async boundary.

This is expected, because Actions within a Transition do not guarantee execution order. For common use cases, React provides higher-level abstractions like [`useActionState`](_reference_react_useActionState.md) and [`<form>` actions](_reference_react-dom_components_form.md) that handle ordering for you. For advanced use cases, you’ll need to implement your own queuing and abort logic to handle this.

Example of `useActionState` handling execution order:
```
import { useState, useActionState } from "react";
import { updateQuantity } from "./api";
import Item from "./Item";
import Total from "./Total";
export default function App({}) {
  const [clientQuantity, setClientQuantity] = useState(1);
  const [quantity, updateQuantityAction, isPending] = useActionState(
    async (prevState, payload) => {
      setClientQuantity(payload);
      const savedQuantity = await updateQuantity(payload);
      return savedQuantity;
    },
    1
  );
  return (

      <h1>Checkout</h1>
      <Item action={updateQuantityAction}/>
      <hr />
      <Total clientQuantity={clientQuantity} savedQuantity={quantity} isPending={isPending} />

  );
}
```

