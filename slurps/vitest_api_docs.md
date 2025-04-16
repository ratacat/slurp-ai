# Compiled Documentation

Generated on 2025-04-15T07:07:47.424Z

### api

#### _api.md

> Source: https://vitest.dev/api
> Scraped: 4/15/2025, 1:07:45 AM

## Test API Reference [​](index.md#test-api-reference)

The following types are used in the type signatures below

ts
```
type Awaitable<T> = T | PromiseLike<T>
type TestFunction = () => Awaitable<void>
interface TestOptions {
  /** Will fail the test if it takes too long to execute
   */
  timeout?: number
  /** Will retry the test specific number of times if it fails
   * @default 0
   */
  retry?: number
  /** Will repeat the same test several times even if it fails each time
   * If you have "retry" option and it fails, it will use every retry in each cycle
   * Useful for debugging random failings
   * @default 0
   */
  repeats?: number
}
```
When a test function returns a promise, the runner will wait until it is resolved to collect async expectations. If the promise is rejected, the test will fail.

TIP

In Jest, `TestFunction` can also be of type `(done: DoneCallback) => void`. If this form is used, the test will not be concluded until `done` is called. You can achieve the same using an `async` function, see the [Migration guide Done Callback section](_guide_migration.md#done-callback).

Most options support both dot-syntax and object-syntax allowing you to use whatever style you prefer.

dot-syntaxobject-syntax

ts
```
import { test } from 'vitest'
test.skip('skipped test', () => {
  // some logic that fails right now
})
```
ts
```
import { test } from 'vitest'
test('skipped test', { skip: true }, () => {
  // some logic that fails right now
})
```
## test [​](index.md#test)

*   **Alias:** `it`

`test` defines a set of related expectations. It receives the test name and a function that holds the expectations to test.

Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before terminating. The default is 5 seconds, and can be configured globally with [testTimeout](_config_.md#testtimeout)

ts
```
import { expect, test } from 'vitest'
test('should work as expected', () => {
  expect(Math.sqrt(4)).toBe(2)
})
```
### test.extend [​](index.md#test-extended)

*   **Alias:** `it.extend`

Use `test.extend` to extend the test context with custom fixtures. This will return a new `test` and it's also extendable, so you can compose more fixtures or override existing ones by extending it as you need. See [Extend Test Context](_guide_test-context.md#test-extend) for more information.

ts
```
import { expect, test } from 'vitest'
const todos = []
const archive = []
const myTest = test.extend({
  todos: async ({ task }, use) => {
    todos.push(1, 2, 3)
    await use(todos)
    todos.length = 0
  },
  archive
})
myTest('add item', ({ todos }) => {
  expect(todos.length).toBe(3)
  todos.push(4)
  expect(todos.length).toBe(4)
})
```
### test.skip [​](index.md#test-skip)

*   **Alias:** `it.skip`

If you want to skip running certain tests, but you don't want to delete the code due to any reason, you can use `test.skip` to avoid running them.

ts
```
import { assert, test } from 'vitest'
test.skip('skipped test', () => {
  // Test skipped, no error
  assert.equal(Math.sqrt(4), 3)
})
```
You can also skip test by calling `skip` on its [context](_guide_test-context.md) dynamically:

ts
```
import { assert, test } from 'vitest'
test('skipped test', (context) => {
  context.skip()
  // Test skipped, no error
  assert.equal(Math.sqrt(4), 3)
})
```
Since Vitest 3.1, if the condition is unknonwn, you can provide it to the `skip` method as the first arguments:

ts
```
import { assert, test } from 'vitest'
test('skipped test', (context) => {
  context.skip(Math.random() < 0.5, 'optional message')
  // Test skipped, no error
  assert.equal(Math.sqrt(4), 3)
})
```
### test.skipIf [​](index.md#test-skipif)

*   **Alias:** `it.skipIf`

In some cases you might run tests multiple times with different environments, and some of the tests might be environment-specific. Instead of wrapping the test code with `if`, you can use `test.skipIf` to skip the test whenever the condition is truthy.

ts
```
import { assert, test } from 'vitest'
const isDev = process.env.NODE_ENV === 'development'
test.skipIf(isDev)('prod only test', () => {
  // this test only runs in production
})
```
WARNING

You cannot use this syntax when using Vitest as [type checker](_guide_testing-types.md).

### test.runIf [​](index.md#test-runif)

*   **Alias:** `it.runIf`

Opposite of [test.skipIf](index.md#test-skipif).

ts
```
import { assert, test } from 'vitest'
const isDev = process.env.NODE_ENV === 'development'
test.runIf(isDev)('dev only test', () => {
  // this test only runs in development
})
```
WARNING

You cannot use this syntax when using Vitest as [type checker](_guide_testing-types.md).

### test.only [​](index.md#test-only)

*   **Alias:** `it.only`

Use `test.only` to only run certain tests in a given suite. This is useful when debugging.

Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before terminating. The default is 5 seconds, and can be configured globally with [testTimeout](_config_.md#testtimeout).

ts
```
import { assert, test } from 'vitest'
test.only('test', () => {
  // Only this test (and others marked with only) are run
  assert.equal(Math.sqrt(4), 2)
})
```
Sometimes it is very useful to run `only` tests in a certain file, ignoring all other tests from the whole test suite, which pollute the output.

In order to do that run `vitest` with specific file containing the tests in question.
```
# vitest interesting.test.ts
```
### test.concurrent [​](index.md#test-concurrent)

*   **Alias:** `it.concurrent`

`test.concurrent` marks consecutive tests to be run in parallel. It receives the test name, an async function with the tests to collect, and an optional timeout (in milliseconds).

ts
```
import { describe, test } from 'vitest'
// The two tests marked with concurrent will be run in parallel
describe('suite', () => {
  test('serial test', async () => { /* ... */ })
  test.concurrent('concurrent test 1', async () => { /* ... */ })
  test.concurrent('concurrent test 2', async () => { /* ... */ })
})
```
`test.skip`, `test.only`, and `test.todo` works with concurrent tests. All the following combinations are valid:

ts
```
test.concurrent(/* ... */)
test.skip.concurrent(/* ... */) // or test.concurrent.skip(/* ... */)
test.only.concurrent(/* ... */) // or test.concurrent.only(/* ... */)
test.todo.concurrent(/* ... */) // or test.concurrent.todo(/* ... */)
```
When running concurrent tests, Snapshots and Assertions must use `expect` from the local [Test Context](_guide_test-context.md) to ensure the right test is detected.

ts
```
test.concurrent('test 1', async ({ expect }) => {
  expect(foo).toMatchSnapshot()
})
test.concurrent('test 2', async ({ expect }) => {
  expect(foo).toMatchSnapshot()
})
```
WARNING

You cannot use this syntax when using Vitest as [type checker](_guide_testing-types.md).

### test.sequential [​](index.md#test-sequential)

*   **Alias:** `it.sequential`

`test.sequential` marks a test as sequential. This is useful if you want to run tests in sequence within `describe.concurrent` or with the `--sequence.concurrent` command option.

ts
```
import { describe, test } from 'vitest'
// with config option { sequence: { concurrent: true } }
test('concurrent test 1', async () => { /* ... */ })
test('concurrent test 2', async () => { /* ... */ })
test.sequential('sequential test 1', async () => { /* ... */ })
test.sequential('sequential test 2', async () => { /* ... */ })
// within concurrent suite
describe.concurrent('suite', () => {
  test('concurrent test 1', async () => { /* ... */ })
  test('concurrent test 2', async () => { /* ... */ })
  test.sequential('sequential test 1', async () => { /* ... */ })
  test.sequential('sequential test 2', async () => { /* ... */ })
})
```
### test.todo [​](index.md#test-todo)

*   **Alias:** `it.todo`

Use `test.todo` to stub tests to be implemented later. An entry will be shown in the report for the tests so you know how many tests you still need to implement.

ts
```
// An entry will be shown in the report for this test
test.todo('unimplemented test')
```
### test.fails [​](index.md#test-fails)

*   **Alias:** `it.fails`

Use `test.fails` to indicate that an assertion will fail explicitly.

ts
```
import { expect, test } from 'vitest'
function myAsyncFunc() {
  return new Promise(resolve => resolve(1))
}
test.fails('fail test', async () => {
  await expect(myAsyncFunc()).rejects.toBe(1)
})
```
WARNING

You cannot use this syntax when using Vitest as [type checker](_guide_testing-types.md).

### test.each [​](index.md#test-each)

*   **Alias:** `it.each`

TIP

While `test.each` is provided for Jest compatibility, Vitest also has [`test.for`](index.md#test-for) with an additional feature to integrate [`TestContext`](_guide_test-context.md).

Use `test.each` when you need to run the same test with different variables. You can inject parameters with [printf formatting](https://nodejs.org/api/util.html#util_util_format_format_args) in the test name in the order of the test function parameters.

*   `%s`: string
*   `%d`: number
*   `%i`: integer
*   `%f`: floating point value
*   `%j`: json
*   `%o`: object
*   `%#`: 0-based index of the test case
*   `%$`: 1-based index of the test case
*   `%%`: single percent sign ('%')

ts
```
import { expect, test } from 'vitest'
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', (a, b, expected) => {
  expect(a + b).toBe(expected)
})
// this will return
// ✓ add(1, 1) -> 2
// ✓ add(1, 2) -> 3
// ✓ add(2, 1) -> 3
```
You can also access object properties and array elements with `$` prefix:

ts
```
test.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 1, expected: 3 },
])('add($a, $b) -> $expected', ({ a, b, expected }) => {
  expect(a + b).toBe(expected)
})
// this will return
// ✓ add(1, 1) -> 2
// ✓ add(1, 2) -> 3
// ✓ add(2, 1) -> 3
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add($0, $1) -> $2', (a, b, expected) => {
  expect(a + b).toBe(expected)
})
// this will return
// ✓ add(1, 1) -> 2
// ✓ add(1, 2) -> 3
// ✓ add(2, 1) -> 3
```
You can also access Object attributes with `.`, if you are using objects as arguments:

ts
```
test.each`
a               | b      | expected
${{ val: 1 }}   | ${'b'} | ${'1b'}
${{ val: 2 }}   | ${'b'} | ${'2b'}
${{ val: 3 }}   | ${'b'} | ${'3b'}
`('add($a.val, $b) -> $expected', ({ a, b, expected }) => {
  expect(a.val + b).toBe(expected)
})
// this will return
// ✓ add(1, b) -> 1b
// ✓ add(2, b) -> 2b
// ✓ add(3, b) -> 3b
```
Starting from Vitest 0.25.3, you can also use template string table.

*   First row should be column names, separated by `|`;
*   One or more subsequent rows of data supplied as template literal expressions using `${value}` syntax.

ts
```
import { expect, test } from 'vitest'
test.each`
  a               | b      | expected
  ${1}            | ${1}   | ${2}
  ${'a'}          | ${'b'} | ${'ab'}
  ${[]}           | ${'b'} | ${'b'}
  ${{}}           | ${'b'} | ${'[object Object]b'}
  ${{ asd: 1 }}   | ${'b'} | ${'[object Object]b'}
`('returns $expected when $a is added $b', ({ a, b, expected }) => {
  expect(a + b).toBe(expected)
})
```
TIP

Vitest processes `$values` with Chai `format` method. If the value is too truncated, you can increase [chaiConfig.truncateThreshold](_config_.md#chaiconfig-truncatethreshold) in your config file.

WARNING

You cannot use this syntax when using Vitest as [type checker](_guide_testing-types.md).

### test.for [​](index.md#test-for)

*   **Alias:** `it.for`

Alternative of `test.each` to provide [`TestContext`](_guide_test-context.md).

The difference from `test.each` is how array case is provided in the arguments. Other non array case (including template string usage) works exactly same.

ts
```
// `each` spreads array case
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', (a, b, expected) => { 
  expect(a + b).toBe(expected)
})
// `for` doesn't spread array case
test.for([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', ([a, b, expected]) => { 
  expect(a + b).toBe(expected)
})
```
2nd argument is [`TestContext`](_guide_test-context.md) and it can be used for concurrent snapshot, for example,

ts
```
test.concurrent.for([
  [1, 1],
  [1, 2],
  [2, 1],
])('add(%i, %i)', ([a, b], { expect }) => {
  expect(a + b).matchSnapshot()
})
```
## bench [​](index.md#bench)

*   **Type:** `(name: string | Function, fn: BenchFunction, options?: BenchOptions) => void`

`bench` defines a benchmark. In Vitest terms benchmark is a function that defines a series of operations. Vitest runs this function multiple times to display different performance results.

Vitest uses [`tinybench`](https://github.com/tinylibs/tinybench) library under the hood, inheriting all its options that can be used as a third argument.

ts
```
import { bench } from 'vitest'
bench('normal sorting', () => {
  const x = [1, 5, 4, 2, 3]
  x.sort((a, b) => {
    return a - b
  })
}, { time: 1000 })
```
ts
```
export interface Options {
  /** time needed for running a benchmark task (milliseconds)
   * @default 500
   */
  time?: number
  /** number of times that a task should run if even the time option is finished
   * @default 10
   */
  iterations?: number
  /** function to get the current timestamp in milliseconds
   */
  now?: () => number
  /** An AbortSignal for aborting the benchmark
   */
  signal?: AbortSignal
  /** Throw if a task fails (events will not work if true)
   */
  throws?: boolean
  /** warmup time (milliseconds)
   * @default 100ms
   */
  warmupTime?: number
  /** warmup iterations
   * @default 5
   */
  warmupIterations?: number
  /** setup function to run before each benchmark task (cycle)
   */
  setup?: Hook
  /** teardown function to run after each benchmark task (cycle)
   */
  teardown?: Hook
}
```
After the test case is run, the output structure information is as follows:
```
  name                      hz     min     max    mean     p75     p99    p995    p999     rme  samples
· normal sorting  6,526,368.12  0.0001  0.3638  0.0002  0.0002  0.0002  0.0002  0.0004  ±1.41%   652638
```
ts
```
export interface TaskResult {
  /* the last error that was thrown while running the task
   */
  error?: unknown
  /** The amount of time in milliseconds to run the benchmark task (cycle).
   */
  totalTime: number
  /** the minimum value in the samples
   */
  min: number
  /** the maximum value in the samples
   */
  max: number
  /** the number of operations per second
   */
  hz: number
  /** how long each operation takes (ms)
   */
  period: number
  /** task samples of each task iteration time (ms)
   */
  samples: number[]
  /** samples mean/average (estimate of the population mean)
   */
  mean: number
  /** samples variance (estimate of the population variance)
   */
  variance: number
  /** samples standard deviation (estimate of the population standard deviation)
   */
  sd: number
  /** standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean)
   */
  sem: number
  /** degrees of freedom
   */
  df: number
  /** critical value of the samples
   */
  critical: number
  /** margin of error
   */
  moe: number
  /** relative margin of error
   */
  rme: number
  /** median absolute deviation
   */
  mad: number
  /** p50/median percentile
   */
  p50: number
  /** p75 percentile
   */
  p75: number
  /** p99 percentile
   */
  p99: number
  /** p995 percentile
   */
  p995: number
  /** p999 percentile
   */
  p999: number
}
```
### bench.skip [​](index.md#bench-skip)

*   **Type:** `(name: string | Function, fn: BenchFunction, options?: BenchOptions) => void`

You can use `bench.skip` syntax to skip running certain benchmarks.

ts
```
import { bench } from 'vitest'
bench.skip('normal sorting', () => {
  const x = [1, 5, 4, 2, 3]
  x.sort((a, b) => {
    return a - b
  })
})
```
### bench.only [​](index.md#bench-only)

*   **Type:** `(name: string | Function, fn: BenchFunction, options?: BenchOptions) => void`

Use `bench.only` to only run certain benchmarks in a given suite. This is useful when debugging.

ts
```
import { bench } from 'vitest'
bench.only('normal sorting', () => {
  const x = [1, 5, 4, 2, 3]
  x.sort((a, b) => {
    return a - b
  })
})
```
### bench.todo [​](index.md#bench-todo)

*   **Type:** `(name: string | Function) => void`

Use `bench.todo` to stub benchmarks to be implemented later.

ts
```
import { bench } from 'vitest'
bench.todo('unimplemented test')
```
## describe [​](index.md#describe)

When you use `test` or `bench` in the top level of file, they are collected as part of the implicit suite for it. Using `describe` you can define a new suite in the current context, as a set of related tests or benchmarks and other nested suites. A suite lets you organize your tests and benchmarks so reports are more clear.

ts
```
// basic.spec.ts
// organizing tests
import { describe, expect, test } from 'vitest'
const person = {
  isActive: true,
  age: 32,
}
describe('person', () => {
  test('person is defined', () => {
    expect(person).toBeDefined()
  })
  test('is active', () => {
    expect(person.isActive).toBeTruthy()
  })
  test('age limit', () => {
    expect(person.age).toBeLessThanOrEqual(32)
  })
})
```
ts
```
// basic.bench.ts
// organizing benchmarks
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
You can also nest describe blocks if you have a hierarchy of tests or benchmarks:

ts
```
import { describe, expect, test } from 'vitest'
function numberToCurrency(value: number | string) {
  if (typeof value !== 'number') {
    throw new TypeError('Value must be a number')
  }
  return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
describe('numberToCurrency', () => {
  describe('given an invalid number', () => {
    test('composed of non-numbers to throw error', () => {
      expect(() => numberToCurrency('abc')).toThrowError()
    })
  })
  describe('given a valid number', () => {
    test('returns the correct currency format', () => {
      expect(numberToCurrency(10000)).toBe('10,000.00')
    })
  })
})
```
### describe.skip [​](index.md#describe-skip)

*   **Alias:** `suite.skip`

Use `describe.skip` in a suite to avoid running a particular describe block.

ts
```
import { assert, describe, test } from 'vitest'
describe.skip('skipped suite', () => {
  test('sqrt', () => {
    // Suite skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})
```
### describe.skipIf [​](index.md#describe-skipif)

*   **Alias:** `suite.skipIf`

In some cases, you might run suites multiple times with different environments, and some of the suites might be environment-specific. Instead of wrapping the suite with `if`, you can use `describe.skipIf` to skip the suite whenever the condition is truthy.

ts
```
import { describe, test } from 'vitest'
const isDev = process.env.NODE_ENV === 'development'
describe.skipIf(isDev)('prod only test suite', () => {
  // this test suite only runs in production
})
```
WARNING

You cannot use this syntax when using Vitest as [type checker](_guide_testing-types.md).

### describe.runIf [​](index.md#describe-runif)

*   **Alias:** `suite.runIf`

Opposite of [describe.skipIf](index.md#describe-skipif).

ts
```
import { assert, describe, test } from 'vitest'
const isDev = process.env.NODE_ENV === 'development'
describe.runIf(isDev)('dev only test suite', () => {
  // this test suite only runs in development
})
```
WARNING

You cannot use this syntax when using Vitest as [type checker](_guide_testing-types.md).

### describe.only [​](index.md#describe-only)

*   **Type:** `(name: string | Function, fn: TestFunction, options?: number | TestOptions) => void`

Use `describe.only` to only run certain suites

ts
```
import { assert, describe, test } from 'vitest'
// Only this suite (and others marked with only) are run
describe.only('suite', () => {
  test('sqrt', () => {
    assert.equal(Math.sqrt(4), 3)
  })
})
describe('other suite', () => {
  // ... will be skipped
})
```
Sometimes it is very useful to run `only` tests in a certain file, ignoring all other tests from the whole test suite, which pollute the output.

In order to do that run `vitest` with specific file containing the tests in question.
```
# vitest interesting.test.ts
```
### describe.concurrent [​](index.md#describe-concurrent)

*   **Alias:** `suite.concurrent`

`describe.concurrent` runs all inner suites and tests in parallel

ts
```
import { describe, test } from 'vitest'
// All suites and tests within this suite will be run in parallel
describe.concurrent('suite', () => {
  test('concurrent test 1', async () => { /* ... */ })
  describe('concurrent suite 2', async () => {
    test('concurrent test inner 1', async () => { /* ... */ })
    test('concurrent test inner 2', async () => { /* ... */ })
  })
  test.concurrent('concurrent test 3', async () => { /* ... */ })
})
```
`.skip`, `.only`, and `.todo` works with concurrent suites. All the following combinations are valid:

ts
```
describe.concurrent(/* ... */)
describe.skip.concurrent(/* ... */) // or describe.concurrent.skip(/* ... */)
describe.only.concurrent(/* ... */) // or describe.concurrent.only(/* ... */)
describe.todo.concurrent(/* ... */) // or describe.concurrent.todo(/* ... */)
```
When running concurrent tests, Snapshots and Assertions must use `expect` from the local [Test Context](_guide_test-context.md) to ensure the right test is detected.

ts
```
describe.concurrent('suite', () => {
  test('concurrent test 1', async ({ expect }) => {
    expect(foo).toMatchSnapshot()
  })
  test('concurrent test 2', async ({ expect }) => {
    expect(foo).toMatchSnapshot()
  })
})
```
WARNING

You cannot use this syntax when using Vitest as [type checker](_guide_testing-types.md).

### describe.sequential [​](index.md#describe-sequential)

*   **Alias:** `suite.sequential`

`describe.sequential` in a suite marks every test as sequential. This is useful if you want to run tests in sequence within `describe.concurrent` or with the `--sequence.concurrent` command option.

ts
```
import { describe, test } from 'vitest'
describe.concurrent('suite', () => {
  test('concurrent test 1', async () => { /* ... */ })
  test('concurrent test 2', async () => { /* ... */ })
  describe.sequential('', () => {
    test('sequential test 1', async () => { /* ... */ })
    test('sequential test 2', async () => { /* ... */ })
  })
})
```
### describe.shuffle [​](index.md#describe-shuffle)

*   **Alias:** `suite.shuffle`

Vitest provides a way to run all tests in random order via CLI flag [`--sequence.shuffle`](_guide_cli.md) or config option [`sequence.shuffle`](_config_.md#sequence-shuffle), but if you want to have only part of your test suite to run tests in random order, you can mark it with this flag.

ts
```
import { describe, test } from 'vitest'
// or describe('suite', { shuffle: true }, ...)
describe.shuffle('suite', () => {
  test('random test 1', async () => { /* ... */ })
  test('random test 2', async () => { /* ... */ })
  test('random test 3', async () => { /* ... */ })
  // `shuffle` is inherited
  describe('still random', () => {
    test('random 4.1', async () => { /* ... */ })
    test('random 4.2', async () => { /* ... */ })
  })
  // disable shuffle inside
  describe('not random', { shuffle: false }, () => {
    test('in order 5.1', async () => { /* ... */ })
    test('in order 5.2', async () => { /* ... */ })
  })
})
// order depends on sequence.seed option in config (Date.now() by default)
```
`.skip`, `.only`, and `.todo` works with random suites.

WARNING

You cannot use this syntax when using Vitest as [type checker](_guide_testing-types.md).

### describe.todo [​](index.md#describe-todo)

*   **Alias:** `suite.todo`

Use `describe.todo` to stub suites to be implemented later. An entry will be shown in the report for the tests so you know how many tests you still need to implement.

ts
```
// An entry will be shown in the report for this suite
describe.todo('unimplemented suite')
```
### describe.each [​](index.md#describe-each)

*   **Alias:** `suite.each`

TIP

While `describe.each` is provided for Jest compatibility, Vitest also has [`describe.for`](index.md#describe-for) which simplifies argument types and aligns with [`test.for`](index.md#test-for).

Use `describe.each` if you have more than one test that depends on the same data.

ts
```
import { describe, expect, test } from 'vitest'
describe.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 1, expected: 3 },
])('describe object add($a, $b)', ({ a, b, expected }) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected)
  })
  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected)
  })
  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected)
  })
})
```
Starting from Vitest 0.25.3, you can also use template string table.

*   First row should be column names, separated by `|`;
*   One or more subsequent rows of data supplied as template literal expressions using `${value}` syntax.

ts
```
import { describe, expect, test } from 'vitest'
describe.each`
  a               | b      | expected
  ${1}            | ${1}   | ${2}
  ${'a'}          | ${'b'} | ${'ab'}
  ${[]}           | ${'b'} | ${'b'}
  ${{}}           | ${'b'} | ${'[object Object]b'}
  ${{ asd: 1 }}   | ${'b'} | ${'[object Object]b'}
`('describe template string add($a, $b)', ({ a, b, expected }) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected)
  })
})
```
WARNING

You cannot use this syntax when using Vitest as [type checker](_guide_testing-types.md).

### describe.for [​](index.md#describe-for)

*   **Alias:** `suite.for`

The difference from `describe.each` is how array case is provided in the arguments. Other non array case (including template string usage) works exactly same.

ts
```
// `each` spreads array case
describe.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', (a, b, expected) => { 
  test('test', () => {
    expect(a + b).toBe(expected)
  })
})
// `for` doesn't spread array case
describe.for([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', ([a, b, expected]) => { 
  test('test', () => {
    expect(a + b).toBe(expected)
  })
})
```
## Setup and Teardown [​](index.md#setup-and-teardown)

These functions allow you to hook into the life cycle of tests to avoid repeating setup and teardown code. They apply to the current context: the file if they are used at the top-level or the current suite if they are inside a `describe` block. These hooks are not called, when you are running Vitest as a type checker.

### beforeEach [​](index.md#beforeeach)

*   **Type:** `beforeEach(fn: () => Awaitable<void>, timeout?: number)`

Register a callback to be called before each of the tests in the current context runs. If the function returns a promise, Vitest waits until the promise resolve before running the test.

Optionally, you can pass a timeout (in milliseconds) defining how long to wait before terminating. The default is 5 seconds.

ts
```
import { beforeEach } from 'vitest'
beforeEach(async () => {
  // Clear mocks and add some testing data after before each test run
  await stopMocking()
  await addUser({ name: 'John' })
})
```
Here, the `beforeEach` ensures that user is added for each test.

`beforeEach` also accepts an optional cleanup function (equivalent to `afterEach`).

ts
```
import { beforeEach } from 'vitest'
beforeEach(async () => {
  // called once before each test run
  await prepareSomething()
  // clean up function, called once after each test run
  return async () => {
    await resetSomething()
  }
})
```
### afterEach [​](index.md#aftereach)

*   **Type:** `afterEach(fn: () => Awaitable<void>, timeout?: number)`

Register a callback to be called after each one of the tests in the current context completes. If the function returns a promise, Vitest waits until the promise resolve before continuing.

Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before terminating. The default is 5 seconds.

ts
```
import { afterEach } from 'vitest'
afterEach(async () => {
  await clearTestingData() // clear testing data after each test run
})
```
Here, the `afterEach` ensures that testing data is cleared after each test runs.

TIP

Vitest 1.3.0 added [`onTestFinished`](index.md#ontestfinished) hook. You can call it during the test execution to cleanup any state after the test has finished running.

### beforeAll [​](index.md#beforeall)

*   **Type:** `beforeAll(fn: () => Awaitable<void>, timeout?: number)`

Register a callback to be called once before starting to run all tests in the current context. If the function returns a promise, Vitest waits until the promise resolve before running tests.

Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before terminating. The default is 5 seconds.

ts
```
import { beforeAll } from 'vitest'
beforeAll(async () => {
  await startMocking() // called once before all tests run
})
```
Here the `beforeAll` ensures that the mock data is set up before tests run.

`beforeAll` also accepts an optional cleanup function (equivalent to `afterAll`).

ts
```
import { beforeAll } from 'vitest'
beforeAll(async () => {
  // called once before all tests run
  await startMocking()
  // clean up function, called once after all tests run
  return async () => {
    await stopMocking()
  }
})
```
### afterAll [​](index.md#afterall)

*   **Type:** `afterAll(fn: () => Awaitable<void>, timeout?: number)`

Register a callback to be called once after all tests have run in the current context. If the function returns a promise, Vitest waits until the promise resolve before continuing.

Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before terminating. The default is 5 seconds.

ts
```
import { afterAll } from 'vitest'
afterAll(async () => {
  await stopMocking() // this method is called after all tests run
})
```
Here the `afterAll` ensures that `stopMocking` method is called after all tests run.

## Test Hooks [​](index.md#test-hooks)

Vitest provides a few hooks that you can call _during_ the test execution to cleanup the state when the test has finished running.

WARNING

These hooks will throw an error if they are called outside of the test body.

### onTestFinished [​](index.md#ontestfinished)

This hook is always called after the test has finished running. It is called after `afterEach` hooks since they can influence the test result. It receives an `ExtendedContext` object like `beforeEach` and `afterEach`.

ts
```
import { onTestFinished, test } from 'vitest'
test('performs a query', () => {
  const db = connectDb()
  onTestFinished(() => db.close())
  db.query('SELECT * FROM users')
})
```
WARNING

If you are running tests concurrently, you should always use `onTestFinished` hook from the test context since Vitest doesn't track concurrent tests in global hooks:

ts
```
import { test } from 'vitest'
test.concurrent('performs a query', ({ onTestFinished }) => {
  const db = connectDb()
  onTestFinished(() => db.close())
  db.query('SELECT * FROM users')
})
```
This hook is particularly useful when creating reusable logic:

ts
```
// this can be in a separate file
function getTestDb() {
  const db = connectMockedDb()
  onTestFinished(() => db.close())
  return db
}
test('performs a user query', async () => {
  const db = getTestDb()
  expect(
    await db.query('SELECT * from users').perform()
  ).toEqual([])
})
test('performs an organization query', async () => {
  const db = getTestDb()
  expect(
    await db.query('SELECT * from organizations').perform()
  ).toEqual([])
})
```
TIP

This hook is always called in reverse order and is not affected by [`sequence.hooks`](_config_.md#sequence-hooks) option.

Note that this hook is not called if test was skipped with a dynamic `ctx.skip()` call:

ts
```
test('skipped dynamically', (t) => {
  onTestFinished(() => {}) // not called
  t.skip()
})
```
### onTestFailed [​](index.md#ontestfailed)

This hook is called only after the test has failed. It is called after `afterEach` hooks since they can influence the test result. It receives an `ExtendedContext` object like `beforeEach` and `afterEach`. This hook is useful for debugging.

ts
```
import { onTestFailed, test } from 'vitest'
test('performs a query', () => {
  const db = connectDb()
  onTestFailed((e) => {
    console.log(e.result.errors)
  })
  db.query('SELECT * FROM users')
})
```
WARNING

If you are running tests concurrently, you should always use `onTestFailed` hook from the test context since Vitest doesn't track concurrent tests in global hooks:

ts
```
import { test } from 'vitest'
test.concurrent('performs a query', ({ onTestFailed }) => {
  const db = connectDb()
  onTestFailed((result) => {
    console.log(result.errors)
  })
  db.query('SELECT * FROM users')
})
```

#### _api_assert-type.md

> Source: https://vitest.dev/api/assert-type
> Scraped: 4/15/2025, 1:07:45 AM

## assertType [​](index.md#asserttype)

WARNING

During runtime this function doesn't do anything. To [enable typechecking](_guide_testing-types.md#run-typechecking), don't forget to pass down `--typecheck` flag.

*   **Type:** `<T>(value: T): void`

You can use this function as an alternative for [`expectTypeOf`](_api_expect-typeof.md) to easily assert that the argument type is equal to the generic provided.

ts
```
import { assertType } from 'vitest'
function concat(a: string, b: string): string
function concat(a: number, b: number): number
function concat(a: string | number, b: string | number): string | number
assertType<string>(concat('a', 'b'))
assertType<number>(concat(1, 2))
// @ts-expect-error wrong types
assertType(concat('a', 2))
```

#### _api_assert.md

> Source: https://vitest.dev/api/assert
> Scraped: 4/15/2025, 1:07:46 AM

## assert [​](index.md#assert)

Vitest reexports the `assert` method from [`chai`](https://www.chaijs.com/api/assert/) for verifying invariants.

## assert [​](index.md#assert-1)

*   **Type:** `(expression: any, message?: string) => asserts expression`

Assert that the given `expression` is truthy, otherwise the assertion fails.

ts
```
import { assert, test } from 'vitest'
test('assert', () => {
  assert('foo' !== 'bar', 'foo should not be equal to bar')
})
```
## fail [​](index.md#fail)

*   **Type:**   `(message?: string) => never`
    *   `<T>(actual: T, expected: T, message?: string, operator?: string) => never`

Force an assertion failure.

ts
```
import { assert, test } from 'vitest'
test('assert.fail', () => {
  assert.fail('error message on failure')
  assert.fail('foo', 'bar', 'foo is not bar', '===')
})
```
## isOk [​](index.md#isok)

*   **Type:** `<T>(value: T, message?: string) => void`
*   **Alias** `ok`

Assert that the given `value` is truthy.

ts
```
import { assert, test } from 'vitest'
test('assert.isOk', () => {
  assert.isOk('foo', 'every truthy is ok')
  assert.isOk(false, 'this will fail since false is not truthy')
})
```
## isNotOk [​](index.md#isnotok)

*   **Type:** `<T>(value: T, message?: string) => void`
*   **Alias** `notOk`

Assert that the given `value` is falsy.

ts
```
import { assert, test } from 'vitest'
test('assert.isNotOk', () => {
  assert.isNotOk('foo', 'this will fail, every truthy is not ok')
  assert.isNotOk(false, 'this will pass since false is falsy')
})
```
## equal [​](index.md#equal)

*   **Type:** `<T>(actual: T, expected: T, message?: string) => void`

Asserts non-strict equality (==) of `actual` and `expected`.

ts
```
import { assert, test } from 'vitest'
test('assert.equal', () => {
  assert.equal(Math.sqrt(4), '2')
})
```
## notEqual [​](index.md#notequal)

*   **Type:** `<T>(actual: T, expected: T, message?: string) => void`

Asserts non-strict inequality (!=) of `actual` and `expected`.

ts
```
import { assert, test } from 'vitest'
test('assert.equal', () => {
  assert.notEqual(Math.sqrt(4), 3)
})
```
## strictEqual [​](index.md#strictequal)

*   **Type:** `<T>(actual: T, expected: T, message?: string) => void`

Asserts strict equality (===) of `actual` and `expected`.

ts
```
import { assert, test } from 'vitest'
test('assert.strictEqual', () => {
  assert.strictEqual(Math.sqrt(4), 2)
})
```
## deepEqual [​](index.md#deepequal)

*   **Type:** `<T>(actual: T, expected: T, message?: string) => void`

Asserts that `actual` is deeply equal to `expected`.

ts
```
import { assert, test } from 'vitest'
test('assert.deepEqual', () => {
  assert.deepEqual({ color: 'green' }, { color: 'green' })
})
```
## notDeepEqual [​](index.md#notdeepequal)

*   **Type:** `<T>(actual: T, expected: T, message?: string) => void`

Assert that `actual` is not deeply equal to `expected`.

ts
```
import { assert, test } from 'vitest'
test('assert.notDeepEqual', () => {
  assert.notDeepEqual({ color: 'green' }, { color: 'red' })
})
```
## isAbove [​](index.md#isabove)

*   **Type:** `(valueToCheck: number, valueToBeAbove: number, message?: string) => void`

Assert that `valueToCheck` is strictly greater than (>) `valueToBeAbove`.

ts
```
import { assert, test } from 'vitest'
test('assert.isAbove', () => {
  assert.isAbove(5, 2, '5 is strictly greater than 2')
})
```
## isAtLeast [​](index.md#isatleast)

*   **Type:** `(valueToCheck: number, valueToBeAtLeast: number, message?: string) => void`

Assert that `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`.

ts
```
import { assert, test } from 'vitest'
test('assert.isAtLeast', () => {
  assert.isAtLeast(5, 2, '5 is greater or equal to 2')
  assert.isAtLeast(3, 3, '3 is greater or equal to 3')
})
```
## isBelow [​](index.md#isbelow)

*   **Type:** `(valueToCheck: number, valueToBeBelow: number, message?: string) => void`

Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`.

ts
```
import { assert, test } from 'vitest'
test('assert.isBelow', () => {
  assert.isBelow(3, 6, '3 is strictly less than 6')
})
```
## isAtMost [​](index.md#isatmost)

*   **Type:** `(valueToCheck: number, valueToBeAtMost: number, message?: string) => void`

Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`.

ts
```
import { assert, test } from 'vitest'
test('assert.isAtMost', () => {
  assert.isAtMost(3, 6, '3 is less than or equal to 6')
  assert.isAtMost(4, 4, '4 is less than or equal to 4')
})
```
## isTrue [​](index.md#istrue)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is true.

ts
```
import { assert, test } from 'vitest'
const testPassed = true
test('assert.isTrue', () => {
  assert.isTrue(testPassed)
})
```
## isNotTrue [​](index.md#isnottrue)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not true.

ts
```
import { assert, test } from 'vitest'
const testPassed = 'ok'
test('assert.isNotTrue', () => {
  assert.isNotTrue(testPassed)
})
```
## isFalse [​](index.md#isfalse)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is false.

ts
```
import { assert, test } from 'vitest'
const testPassed = false
test('assert.isFalse', () => {
  assert.isFalse(testPassed)
})
```
## isNotFalse [​](index.md#isnotfalse)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not false.

ts
```
import { assert, test } from 'vitest'
const testPassed = 'no'
test('assert.isNotFalse', () => {
  assert.isNotFalse(testPassed)
})
```
## isNull [​](index.md#isnull)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is null.

ts
```
import { assert, test } from 'vitest'
const error = null
test('assert.isNull', () => {
  assert.isNull(error, 'error is null')
})
```
## isNotNull [​](index.md#isnotnull)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not null.

ts
```
import { assert, test } from 'vitest'
const error = { message: 'error was occurred' }
test('assert.isNotNull', () => {
  assert.isNotNull(error, 'error is not null but object')
})
```
## isNaN [​](index.md#isnan)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is NaN.

ts
```
import { assert, test } from 'vitest'
const calculation = 1 * 'vitest'
test('assert.isNaN', () => {
  assert.isNaN(calculation, '1 * "vitest" is NaN')
})
```
## isNotNaN [​](index.md#isnotnan)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not NaN.

ts
```
import { assert, test } from 'vitest'
const calculation = 1 * 2
test('assert.isNotNaN', () => {
  assert.isNotNaN(calculation, '1 * 2 is Not NaN but 2')
})
```
## exists [​](index.md#exists)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is neither null nor undefined.

ts
```
import { assert, test } from 'vitest'
const name = 'foo'
test('assert.exists', () => {
  assert.exists(name, 'foo is neither null nor undefined')
})
```
## notExists [​](index.md#notexists)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is either null nor undefined.

ts
```
import { assert, test } from 'vitest'
const foo = null
const bar = undefined
test('assert.notExists', () => {
  assert.notExists(foo, 'foo is null so not exist')
  assert.notExists(bar, 'bar is undefined so not exist')
})
```
## isUndefined [​](index.md#isundefined)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is undefined.

ts
```
import { assert, test } from 'vitest'
const name = undefined
test('assert.isUndefined', () => {
  assert.isUndefined(name, 'name is undefined')
})
```
## isDefined [​](index.md#isdefined)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not undefined.

ts
```
import { assert, test } from 'vitest'
const name = 'foo'
test('assert.isDefined', () => {
  assert.isDefined(name, 'name is not undefined')
})
```
## isFunction [​](index.md#isfunction)

*   **Type:** `<T>(value: T, message?: string) => void`
*   **Alias:** `isCallable` Asserts that `value` is a function.

ts
```
import { assert, test } from 'vitest'
function name() { return 'foo' };
test('assert.isFunction', () => {
  assert.isFunction(name, 'name is function')
})
```
## isNotFunction [​](index.md#isnotfunction)

*   **Type:** `<T>(value: T, message?: string) => void`
*   **Alias:** `isNotCallable`

Asserts that `value` is not a function.

ts
```
import { assert, test } from 'vitest'
const name = 'foo'
test('assert.isNotFunction', () => {
  assert.isNotFunction(name, 'name is not function but string')
})
```
## isObject [​](index.md#isobject)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is an object of type Object (as revealed by Object.prototype.toString). The assertion does not match subclassed objects.

ts
```
import { assert, test } from 'vitest'
const someThing = { color: 'red', shape: 'circle' }
test('assert.isObject', () => {
  assert.isObject(someThing, 'someThing is object')
})
```
## isNotObject [​](index.md#isnotobject)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not an object of type Object (as revealed by Object.prototype.toString). The assertion does not match subclassed objects.

ts
```
import { assert, test } from 'vitest'
const someThing = 'redCircle'
test('assert.isNotObject', () => {
  assert.isNotObject(someThing, 'someThing is not object but string')
})
```
## isArray [​](index.md#isarray)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is an array.

ts
```
import { assert, test } from 'vitest'
const color = ['red', 'green', 'yellow']
test('assert.isArray', () => {
  assert.isArray(color, 'color is array')
})
```
## isNotArray [​](index.md#isnotarray)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not an array.

ts
```
import { assert, test } from 'vitest'
const color = 'red'
test('assert.isNotArray', () => {
  assert.isNotArray(color, 'color is not array but string')
})
```
## isString [​](index.md#isstring)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is a string.

ts
```
import { assert, test } from 'vitest'
const color = 'red'
test('assert.isString', () => {
  assert.isString(color, 'color is string')
})
```
## isNotString [​](index.md#isnotstring)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not a string.

ts
```
import { assert, test } from 'vitest'
const color = ['red', 'green', 'yellow']
test('assert.isNotString', () => {
  assert.isNotString(color, 'color is not string but array')
})
```
## isNumber [​](index.md#isnumber)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is a number.

ts
```
import { assert, test } from 'vitest'
const colors = 3
test('assert.isNumber', () => {
  assert.isNumber(colors, 'colors is number')
})
```
## isNotNumber [​](index.md#isnotnumber)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not a number.

ts
```
import { assert, test } from 'vitest'
const colors = '3 colors'
test('assert.isNotNumber', () => {
  assert.isNotNumber(colors, 'colors is not number but strings')
})
```
## isFinite [​](index.md#isfinite)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is a finite number (not NaN, Infinity).

ts
```
import { assert, test } from 'vitest'
const colors = 3
test('assert.isFinite', () => {
  assert.isFinite(colors, 'colors is number not NaN or Infinity')
})
```
## isBoolean [​](index.md#isboolean)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is a boolean.

ts
```
import { assert, test } from 'vitest'
const isReady = true
test('assert.isBoolean', () => {
  assert.isBoolean(isReady, 'isReady is a boolean')
})
```
## isNotBoolean [​](index.md#isnotboolean)

*   **Type:** `<T>(value: T, message?: string) => void`

Asserts that `value` is not a boolean.

ts
```
import { assert, test } from 'vitest'
const isReady = 'sure'
test('assert.isBoolean', () => {
  assert.isBoolean(isReady, 'isReady is not a boolean but string')
})
```
## typeOf [​](index.md#typeof)

*   **Type:** `<T>(value: T, name: string, message?: string) => void`

Asserts that `value`’s type is `name`, as determined by Object.prototype.toString.

ts
```
import { assert, test } from 'vitest'
test('assert.typeOf', () => {
  assert.typeOf({ color: 'red' }, 'object', 'we have an object')
  assert.typeOf(['red', 'green'], 'array', 'we have an array')
  assert.typeOf('red', 'string', 'we have a string')
  assert.typeOf(/red/, 'regexp', 'we have a regular expression')
  assert.typeOf(null, 'null', 'we have a null')
  assert.typeOf(undefined, 'undefined', 'we have an undefined')
})
```
## notTypeOf [​](index.md#nottypeof)

*   **Type:** `<T>(value: T, name: string, message?: string) => void`

Asserts that `value`’s type is not `name`, as determined by Object.prototype.toString.

ts
```
import { assert, test } from 'vitest'
test('assert.notTypeOf', () => {
  assert.notTypeOf('red', 'number', '"red" is not a number')
})
```
## instanceOf [​](index.md#instanceof)

*   **Type:** `<T>(value: T, constructor: Function, message?: string) => void`

Asserts that `value` is an instance of `constructor`.

ts
```
import { assert, test } from 'vitest'
function Person(name) { this.name = name }
const foo = new Person('foo')
class Tea {
  constructor(name) {
    this.name = name
  }
}
const coffee = new Tea('coffee')
test('assert.instanceOf', () => {
  assert.instanceOf(foo, Person, 'foo is an instance of Person')
  assert.instanceOf(coffee, Tea, 'coffee is an instance of Tea')
})
```
## notInstanceOf [​](index.md#notinstanceof)

*   **Type:** `<T>(value: T, constructor: Function, message?: string) => void`

Asserts that `value` is not an instance of `constructor`.

ts
```
import { assert, test } from 'vitest'
function Person(name) { this.name = name }
const foo = new Person('foo')
class Tea {
  constructor(name) {
    this.name = name
  }
}
const coffee = new Tea('coffee')
test('assert.instanceOf', () => {
  assert.instanceOf(foo, Tea, 'foo is not an instance of Tea')
})
```
## include [​](index.md#include)

*   **Type:**   `(haystack: string, needle: string, message?: string) => void`
    *   `<T>(haystack: readonly T[] | ReadonlySet<T> | ReadonlyMap<any, T>, needle: T, message?: string) => void`
    *   `<T extends object>(haystack: WeakSet<T>, needle: T, message?: string) => void`
    *   `<T>(haystack: T, needle: Partial<T>, message?: string) => void`

Asserts that `haystack` includes `needle`. Can be used to assert the inclusion of a value in an array, a substring in a string, or a subset of properties in an object.

ts
```
import { assert, test } from 'vitest'
test('assert.include', () => {
  assert.include([1, 2, 3], 2, 'array contains value')
  assert.include('foobar', 'foo', 'string contains substring')
  assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property')
})
```
## notInclude [​](index.md#notinclude)

*   **Type:**   `(haystack: string, needle: string, message?: string) => void`
    *   `<T>(haystack: readonly T[] | ReadonlySet<T> | ReadonlyMap<any, T>, needle: T, message?: string) => void`
    *   `<T extends object>(haystack: WeakSet<T>, needle: T, message?: string) => void`
    *   `<T>(haystack: T, needle: Partial<T>, message?: string) => void`

Asserts that `haystack` does not include `needle`. It can be used to assert the absence of a value in an array, a substring in a string, or a subset of properties in an object.

ts
```
import { assert, test } from 'vitest'
test('assert.notInclude', () => {
  assert.notInclude([1, 2, 3], 4, 'array doesn\'t contain 4')
  assert.notInclude('foobar', 'baz', 'foobar doesn\'t contain baz')
  assert.notInclude({ foo: 'bar', hello: 'universe' }, { foo: 'baz' }, 'object doesn\'t contain property')
})
```
## deepInclude [​](index.md#deepinclude)

*   **Type:**   `(haystack: string, needle: string, message?: string) => void`
*   `<T>(haystack: readonly T[] | ReadonlySet<T> | ReadonlyMap<any, T>, needle: T, message?: string) => void`
*   `<T>(haystack: T, needle: T extends WeakSet<any> ? never : Partial<T>, message?: string) => void`

Asserts that `haystack` includes `needle`. Can be used to assert the inclusion of a value in an array or a subset of properties in an object. Deep equality is used.

ts
```
import { assert, test } from 'vitest'
const obj1 = { a: 1 }
const obj2 = { b: 2 }
test('assert.deepInclude', () => {
  assert.deepInclude([obj1, obj2], { a: 1 })
  assert.deepInclude({ foo: obj1, bar: obj2 }, { foo: { a: 1 } })
})
```
## notDeepInclude [​](index.md#notdeepinclude)

*   **Type:**   `(haystack: string, needle: string, message?: string) => void`
    *   `<T>(haystack: readonly T[] | ReadonlySet<T> | ReadonlyMap<any, T>, needle: T, message?: string) => void`
    *   `<T>(haystack: T, needle: T extends WeakSet<any> ? never : Partial<T>, message?: string) => void`

Asserts that `haystack` does not include `needle`. It can be used to assert the absence of a value in an array or a subset of properties in an object. Deep equality is used.

ts
```
import { assert, test } from 'vitest'
const obj1 = { a: 1 }
const obj2 = { b: 2 }
test('assert.notDeepInclude', () => {
  assert.notDeepInclude([obj1, obj2], { a: 10 })
  assert.notDeepInclude({ foo: obj1, bar: obj2 }, { foo: { a: 10 } })
})
```
## nestedInclude [​](index.md#nestedinclude)

*   **Type:** `(haystack: any, needle: any, message?: string) => void`

Asserts that `haystack` includes `needle`. Can be used to assert the inclusion of a subset of properties in an object. Enables the use of dot- and bracket-notation for referencing nested properties. ‘\[\]’ and ‘.’ in property names can be escaped using double backslashes.

ts
```
import { assert, test } from 'vitest'
test('assert.nestedInclude', () => {
  assert.nestedInclude({ '.a': { b: 'x' } }, { '\\.a.[b]': 'x' })
  assert.nestedInclude({ a: { '[b]': 'x' } }, { 'a.\\[b\\]': 'x' })
})
```
## notNestedInclude [​](index.md#notnestedinclude)

*   **Type:** `(haystack: any, needle: any, message?: string) => void`

Asserts that `haystack` does not include `needle`. Can be used to assert the inclusion of a subset of properties in an object. Enables the use of dot- and bracket-notation for referencing nested properties. ‘\[\]’ and ‘.’ in property names can be escaped using double backslashes.

ts
```
import { assert, test } from 'vitest'
test('assert.nestedInclude', () => {
  assert.notNestedInclude({ '.a': { b: 'x' } }, { '\\.a.b': 'y' })
  assert.notNestedInclude({ a: { '[b]': 'x' } }, { 'a.\\[b\\]': 'y' })
})
```
## deepNestedInclude [​](index.md#deepnestedinclude)

*   **Type:** `(haystack: any, needle: any, message?: string) => void`

Asserts that `haystack` includes `needle`. Can be used to assert the inclusion of a subset of properties in an object while checking for deep equality. Enables the use of dot- and bracket-notation for referencing nested properties. ‘\[\]’ and ‘.’ in property names can be escaped using double backslashes.

ts
```
import { assert, test } from 'vitest'
test('assert.deepNestedInclude', () => {
  assert.deepNestedInclude({ a: { b: [{ x: 1 }] } }, { 'a.b[0]': { x: 1 } })
  assert.deepNestedInclude({ '.a': { '[b]': { x: 1 } } }, { '\\.a.\\[b\\]': { x: 1 } })
})
```
## notDeepNestedInclude [​](index.md#notdeepnestedinclude)

*   **Type:** `(haystack: any, needle: any, message?: string) => void`

Asserts that `haystack` not includes `needle`. Can be used to assert the absence of a subset of properties in an object while checking for deep equality. Enables the use of dot- and bracket-notation for referencing nested properties. ‘\[\]’ and ‘.’ in property names can be escaped using double backslashes.

ts
```
import { assert, test } from 'vitest'
test('assert.notDeepNestedInclude', () => {
  assert.notDeepNestedInclude({ a: { b: [{ x: 1 }] } }, { 'a.b[0]': { y: 1 } })
  assert.notDeepNestedInclude({ '.a': { '[b]': { x: 1 } } }, { '\\.a.\\[b\\]': { y: 2 } })
})
```
## ownInclude [​](index.md#owninclude)

*   **Type:** `(haystack: any, needle: any, message?: string) => void`

Asserts that `haystack` includes `needle`. Can be used to assert the inclusion of a subset of properties in an object while ignoring inherited properties.

ts
```
import { assert, test } from 'vitest'
test('assert.ownInclude', () => {
  assert.ownInclude({ a: 1 }, { a: 1 })
})
```
## notOwnInclude [​](index.md#notowninclude)

*   **Type:** `(haystack: any, needle: any, message?: string) => void`

Asserts that `haystack` includes `needle`. Can be used to assert the absence of a subset of properties in an object while ignoring inherited properties.

ts
```
import { assert, test } from 'vitest'
const obj1 = {
  b: 2
}
const obj2 = object.create(obj1)
obj2.a = 1
test('assert.notOwnInclude', () => {
  assert.notOwnInclude(obj2, { b: 2 })
})
```
## deepOwnInclude [​](index.md#deepowninclude)

*   **Type:** `(haystack: any, needle: any, message?: string) => void`

Asserts that `haystack` includes `needle`. Can be used to assert the inclusion of a subset of properties in an object while ignoring inherited properties and checking for deep equality.

ts
```
import { assert, test } from 'vitest'
test('assert.deepOwnInclude', () => {
  assert.deepOwnInclude({ a: { b: 2 } }, { a: { b: 2 } })
})
```
## notDeepOwnInclude [​](index.md#notdeepowninclude)

*   **Type:** `(haystack: any, needle: any, message?: string) => void`

Asserts that `haystack` not includes `needle`. Can be used to assert the absence of a subset of properties in an object while ignoring inherited properties and checking for deep equality.

ts
```
import { assert, test } from 'vitest'
test('assert.notDeepOwnInclude', () => {
  assert.notDeepOwnInclude({ a: { b: 2 } }, { a: { c: 3 } })
})
```
## match [​](index.md#match)

*   **Type:** `(value: string, regexp: RegExp, message?: string) => void`

Asserts that `value` matches the regular expression `regexp`.

ts
```
import { assert, test } from 'vitest'
test('assert.match', () => {
  assert.match('foobar', /^foo/, 'regexp matches')
})
```
## notMatch [​](index.md#notmatch)

*   **Type:** `(value: string, regexp: RegExp, message?: string) => void`

Asserts that `value` does not matches the regular expression `regexp`.

ts
```
import { assert, test } from 'vitest'
test('assert.notMatch', () => {
  assert.notMatch('foobar', /^foo/, 'regexp does not match')
})
```
## property [​](index.md#property)

*   **Type:** `<T>(object: T, property: string, message?: string) => void`

Asserts that `object` has a direct or inherited property named by `property`

ts
```
import { assert, test } from 'vitest'
test('assert.property', () => {
  assert.property({ tea: { green: 'matcha' } }, 'tea')
  assert.property({ tea: { green: 'matcha' } }, 'toString')
})
```
## notProperty [​](index.md#notproperty)

*   **Type:** `<T>(object: T, property: string, message?: string) => void`

Asserts that `object` does not have a direct or inherited property named by `property`

ts
```
import { assert, test } from 'vitest'
test('assert.notProperty', () => {
  assert.notProperty({ tea: { green: 'matcha' } }, 'coffee')
})
```
## propertyVal [​](index.md#propertyval)

*   **Type:** `<T, V>(object: T, property: string, value: V, message?: string) => void`

Asserts that `object` has a direct or inherited property named by `property` with a value given by `value`. Uses a strict equality check (===).

ts
```
import { assert, test } from 'vitest'
test('assert.notPropertyVal', () => {
  assert.propertyVal({ tea: 'is good' }, 'tea', 'is good')
})
```
## notPropertyVal [​](index.md#notpropertyval)

*   **Type:** `<T, V>(object: T, property: string, value: V, message?: string) => void`

Asserts that `object` does not have a direct or inherited property named by `property` with a value given by `value`. Uses a strict equality check (===).

ts
```
import { assert, test } from 'vitest'
test('assert.notPropertyVal', () => {
  assert.notPropertyVal({ tea: 'is good' }, 'tea', 'is bad')
  assert.notPropertyVal({ tea: 'is good' }, 'coffee', 'is good')
})
```
## deepPropertyVal [​](index.md#deeppropertyval)

*   **Type:** `<T, V>(object: T, property: string, value: V, message?: string) => void`

Asserts that `object` has a direct or inherited property named by `property` with a value given by `value`. Uses a deep equality check.

ts
```
import { assert, test } from 'vitest'
test('assert.deepPropertyVal', () => {
  assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' })
})
```
## notDeepPropertyVal [​](index.md#notdeeppropertyval)

*   **Type:** `<T, V>(object: T, property: string, value: V, message?: string) => void`

Asserts that `object` does not have a direct or inherited property named by `property` with a value given by `value`. Uses a deep equality check.

ts
```
import { assert, test } from 'vitest'
test('assert.deepPropertyVal', () => {
  assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' })
  assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' })
  assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' })
})
```
## nestedProperty [​](index.md#nestedproperty)

*   **Type:** `<T>(object: T, property: string, message?: string) => void`

Asserts that `object` has a direct or inherited property named by `property`, which can be a string using dot- and bracket-notation for nested reference.

ts
```
import { assert, test } from 'vitest'
test('assert.deepPropertyVal', () => {
  assert.nestedProperty({ tea: { green: 'matcha' } }, 'tea.green')
})
```
## notNestedProperty [​](index.md#notnestedproperty)

*   **Type:** `<T>(object: T, property: string, message?: string) => void`

Asserts that `object` does not have a direct or inherited property named by `property`, which can be a string using dot- and bracket-notation for nested reference.

ts
```
import { assert, test } from 'vitest'
test('assert.deepPropertyVal', () => {
  assert.notNestedProperty({ tea: { green: 'matcha' } }, 'tea.oolong')
})
```
## nestedPropertyVal [​](index.md#nestedpropertyval)

*   **Type:** `<T>(object: T, property: string, value: any, message?: string) => void`

Asserts that `object` has a property named by `property` with value given by `value`. `property` can use dot- and bracket-notation for nested reference. Uses a strict equality check (===).

ts
```
import { assert, test } from 'vitest'
test('assert.nestedPropertyVal', () => {
  assert.nestedPropertyVal({ tea: { green: 'matcha' } }, 'tea.green', 'matcha')
})
```
## notNestedPropertyVal [​](index.md#notnestedpropertyval)

*   **Type:** `<T>(object: T, property: string, value: any, message?: string) => void`

Asserts that `object` does not have a property named by `property` with value given by `value`. `property` can use dot- and bracket-notation for nested reference. Uses a strict equality check (===).

ts
```
import { assert, test } from 'vitest'
test('assert.notNestedPropertyVal', () => {
  assert.notNestedPropertyVal({ tea: { green: 'matcha' } }, 'tea.green', 'konacha')
  assert.notNestedPropertyVal({ tea: { green: 'matcha' } }, 'coffee.green', 'matcha')
})
```
## deepNestedPropertyVal [​](index.md#deepnestedpropertyval)

*   **Type:** `<T>(object: T, property: string, value: any, message?: string) => void`

Asserts that `object` has a property named by `property` with a value given by `value`. `property` can use dot- and bracket-notation for nested reference. Uses a deep equality check (===).

ts
```
import { assert, test } from 'vitest'
test('assert.notNestedPropertyVal', () => {
  assert.notNestedPropertyVal({ tea: { green: 'matcha' } }, 'tea.green', 'konacha')
  assert.notNestedPropertyVal({ tea: { green: 'matcha' } }, 'coffee.green', 'matcha')
})
```
## notDeepNestedPropertyVal [​](index.md#notdeepnestedpropertyval)

*   **Type:** `<T>(object: T, property: string, value: any, message?: string) => void`

Asserts that `object` does not have a property named by `property` with value given by `value`. `property` can use dot- and bracket-notation for nested reference. Uses a deep equality check.

ts
```
import { assert, test } from 'vitest'
test('assert.notDeepNestedPropertyVal', () => {
  assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' })
  assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' })
  assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' })
})
```
## lengthOf [​](index.md#lengthof)

*   **Type:** `<T extends { readonly length?: number | undefined } | { readonly size?: number | undefined }>(object: T, length: number, message?: string) => void`

Asserts that `object` has a `length` or `size` with the expected value.

ts
```
import { assert, test } from 'vitest'
test('assert.lengthOf', () => {
  assert.lengthOf([1, 2, 3], 3, 'array has length of 3')
  assert.lengthOf('foobar', 6, 'string has length of 6')
  assert.lengthOf(new Set([1, 2, 3]), 3, 'set has size of 3')
  assert.lengthOf(new Map([['a', 1], ['b', 2], ['c', 3]]), 3, 'map has size of 3')
})
```
## hasAnyKeys [​](index.md#hasanykeys)

*   **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: string]: any }, message?: string) => void`

Asserts that `object` has at least one of the `keys` provided. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

ts
```
import { assert, test } from 'vitest'
test('assert.hasAnyKeys', () => {
  assert.hasAnyKeys({ foo: 1, bar: 2, baz: 3 }, ['foo', 'iDontExist', 'baz'])
  assert.hasAnyKeys({ foo: 1, bar: 2, baz: 3 }, { foo: 30, iDontExist: 99, baz: 1337 })
  assert.hasAnyKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ foo: 1 }, 'key'])
  assert.hasAnyKeys(new Set([{ foo: 'bar' }, 'anotherKey']), [{ foo: 'bar' }, 'anotherKey'])
})
```
## hasAllKeys [​](index.md#hasallkeys)

*   **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: string]: any }, message?: string) => void`

Asserts that `object` has all and only all of the `keys` provided. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

ts
```
import { assert, test } from 'vitest'
test('assert.hasAllKeys', () => {
  assert.hasAllKeys({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar', 'baz'])
  assert.hasAllKeys({ foo: 1, bar: 2, baz: 3 }, { foo: 30, bar: 99, baz: 1337 })
  assert.hasAllKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ foo: 1 }, 'key'])
  assert.hasAllKeys(new Set([{ foo: 'bar' }, 'anotherKey'], [{ foo: 'bar' }, 'anotherKey']))
})
```
## containsAllKeys [​](index.md#containsallkeys)

*   **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: string]: any }, message?: string) => void`

Asserts that `object` has all of the `keys` provided but may have more keys not listed. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

ts
```
import { assert, test } from 'vitest'
test('assert.containsAllKeys', () => {
  assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, ['foo', 'baz'])
  assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar', 'baz'])
  assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, { foo: 30, baz: 1337 })
  assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, { foo: 30, bar: 99, baz: 1337 })
  assert.containsAllKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ foo: 1 }])
  assert.containsAllKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ foo: 1 }, 'key'])
  assert.containsAllKeys(new Set([{ foo: 'bar' }, 'anotherKey'], [{ foo: 'bar' }]))
  assert.containsAllKeys(new Set([{ foo: 'bar' }, 'anotherKey'], [{ foo: 'bar' }, 'anotherKey']))
})
```
## doesNotHaveAnyKeys [​](index.md#doesnothaveanykeys)

*   **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: string]: any }, message?: string) => void`

Asserts that `object` has none of the `keys` provided. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

ts
```
import { assert, test } from 'vitest'
test('assert.doesNotHaveAnyKeys', () => {
  assert.doesNotHaveAnyKeys({ foo: 1, bar: 2, baz: 3 }, ['one', 'two', 'example'])
  assert.doesNotHaveAnyKeys({ foo: 1, bar: 2, baz: 3 }, { one: 1, two: 2, example: 'foo' })
  assert.doesNotHaveAnyKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ one: 'two' }, 'example'])
  assert.doesNotHaveAnyKeys(new Set([{ foo: 'bar' }, 'anotherKey'], [{ one: 'two' }, 'example']))
})
```
## doesNotHaveAllKeys [​](index.md#doesnothaveallkeys)

*   **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: string]: any }, message?: string) => void`

Asserts that `object` does not have at least one of the `keys` provided. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

ts
```
import { assert, test } from 'vitest'
test('assert.hasAnyKeys', () => {
  assert.doesNotHaveAnyKeys({ foo: 1, bar: 2, baz: 3 }, ['one', 'two', 'example'])
  assert.doesNotHaveAnyKeys({ foo: 1, bar: 2, baz: 3 }, { one: 1, two: 2, example: 'foo' })
  assert.doesNotHaveAnyKeys(new Map([[{ foo: 1 }, 'bar'], ['key', 'value']]), [{ one: 'two' }, 'example'])
  assert.doesNotHaveAnyKeys(new Set([{ foo: 'bar' }, 'anotherKey']), [{ one: 'two' }, 'example'])
})
```
## hasAnyDeepKeys [​](index.md#hasanydeepkeys)

*   **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: string]: any }, message?: string) => void`

Asserts that `object` has at least one of the `keys` provided. Since Sets and Maps can have objects as keys you can use this assertion to perform a deep comparison. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

ts
```
import { assert, test } from 'vitest'
test('assert.hasAnyDeepKeys', () => {
  assert.hasAnyDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [1, 2]]), { one: 'one' })
  assert.hasAnyDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [1, 2]]), [{ one: 'one' }, { two: 'two' }])
  assert.hasAnyDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [{ two: 'two' }, 'valueTwo']]), [{ one: 'one' }, { two: 'two' }])
  assert.hasAnyDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), { one: 'one' })
  assert.hasAnyDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ one: 'one' }, { three: 'three' }])
  assert.hasAnyDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ one: 'one' }, { two: 'two' }])
})
```
## hasAllDeepKeys [​](index.md#hasalldeepkeys)

*   **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: string]: any }, message?: string) => void`

Asserts that `object` has all and only all of the `keys` provided. Since Sets and Maps can have objects as keys you can use this assertion to perform a deep comparison. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

ts
```
import { assert, test } from 'vitest'
test('assert.hasAnyDeepKeys', () => {
  assert.hasAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne']]), { one: 'one' })
  assert.hasAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [{ two: 'two' }, 'valueTwo']]), [{ one: 'one' }, { two: 'two' }])
  assert.hasAllDeepKeys(new Set([{ one: 'one' }]), { one: 'one' })
  assert.hasAllDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ one: 'one' }, { two: 'two' }])
})
```
## containsAllDeepKeys [​](index.md#containsalldeepkeys)

*   **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: string]: any }, message?: string) => void`

Asserts that `object` contains all of the `keys` provided. Since Sets and Maps can have objects as keys you can use this assertion to perform a deep comparison. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

ts
```
import { assert, test } from 'vitest'
test('assert.containsAllDeepKeys', () => {
  assert.containsAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [1, 2]]), { one: 'one' })
  assert.containsAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [{ two: 'two' }, 'valueTwo']]), [{ one: 'one' }, { two: 'two' }])
  assert.containsAllDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), { one: 'one' })
  assert.containsAllDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ one: 'one' }, { two: 'two' }])
})
```
## doesNotHaveAnyDeepKeys [​](index.md#doesnothaveanydeepkeys)

*   **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: string]: any }, message?: string) => void`

Asserts that `object` has none of the `keys` provided. Since Sets and Maps can have objects as keys you can use this assertion to perform a deep comparison. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

ts
```
import { assert, test } from 'vitest'
test('assert.doesNotHaveAnyDeepKeys', () => {
  assert.doesNotHaveAnyDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [1, 2]]), { thisDoesNot: 'exist' })
  assert.doesNotHaveAnyDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [{ two: 'two' }, 'valueTwo']]), [{ twenty: 'twenty' }, { fifty: 'fifty' }])
  assert.doesNotHaveAnyDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), { twenty: 'twenty' })
  assert.doesNotHaveAnyDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ twenty: 'twenty' }, { fifty: 'fifty' }])
})
```
## doesNotHaveAllDeepKeys [​](index.md#doesnothavealldeepkeys)

*   **Type:** `<T>(object: T, keys: Array<Object | string> | { [key: string]: any }, message?: string) => void`

Asserts that `object` does not have at least one of the `keys` provided. Since Sets and Maps can have objects as keys you can use this assertion to perform a deep comparison. You can also provide a single object instead of a keys array and its keys will be used as the expected set of keys.

ts
```
import { assert, test } from 'vitest'
test('assert.doesNotHaveAllDeepKeys', () => {
  assert.doesNotHaveAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [1, 2]]), { thisDoesNot: 'exist' })
  assert.doesNotHaveAllDeepKeys(new Map([[{ one: 'one' }, 'valueOne'], [{ two: 'two' }, 'valueTwo']]), [{ twenty: 'twenty' }, { one: 'one' }])
  assert.doesNotHaveAllDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), { twenty: 'twenty' })
  assert.doesNotHaveAllDeepKeys(new Set([{ one: 'one' }, { two: 'two' }]), [{ one: 'one' }, { fifty: 'fifty' }])
})
```
## throws [​](index.md#throws)

*   **Type:**   `(fn: () => void, errMsgMatcher?: RegExp | string, ignored?: any, message?: string) => void`
    *   `(fn: () => void, errorLike?: ErrorConstructor | Error | null, errMsgMatcher?: RegExp | string | null, message?: string) => void`
*   **Alias:**   `throw`
    *   `Throw`

If `errorLike` is an Error constructor, asserts that `fn` will throw an error that is an instance of `errorLike`. If errorLike is an Error instance, asserts that the error thrown is the same instance as `errorLike`. If `errMsgMatcher` is provided, it also asserts that the error thrown will have a message matching `errMsgMatcher`.

ts
```
import { assert, test } from 'vitest'
test('assert.throws', () => {
  assert.throws(fn, 'Error thrown must have this msg')
  assert.throws(fn, /Error thrown must have a msg that matches this/)
  assert.throws(fn, ReferenceError)
  assert.throws(fn, errorInstance)
  assert.throws(fn, ReferenceError, 'Error thrown must be a ReferenceError and have this msg')
  assert.throws(fn, errorInstance, 'Error thrown must be the same errorInstance and have this msg')
  assert.throws(fn, ReferenceError, /Error thrown must be a ReferenceError and match this/)
  assert.throws(fn, errorInstance, /Error thrown must be the same errorInstance and match this/)
})
```
## doesNotThrow [​](index.md#doesnotthrow)

*   **Type:** `(fn: () => void, errMsgMatcher?: RegExp | string, ignored?: any, message?: string) => void`
*   **Type:** `(fn: () => void, errorLike?: ErrorConstructor | Error | null, errMsgMatcher?: RegExp | string | null, message?: string) => void`

If `errorLike` is an Error constructor, asserts that `fn` will not throw an error that is an instance of `errorLike`. If errorLike is an Error instance, asserts that the error thrown is not the same instance as `errorLike`. If `errMsgMatcher` is provided, it also asserts that the error thrown will not have a message matching `errMsgMatcher`.

ts
```
import { assert, test } from 'vitest'
test('assert.doesNotThrow', () => {
  assert.doesNotThrow(fn, 'Any Error thrown must not have this message')
  assert.doesNotThrow(fn, /Any Error thrown must not match this/)
  assert.doesNotThrow(fn, Error)
  assert.doesNotThrow(fn, errorInstance)
  assert.doesNotThrow(fn, Error, 'Error must not have this message')
  assert.doesNotThrow(fn, errorInstance, 'Error must not have this message')
  assert.doesNotThrow(fn, Error, /Error must not match this/)
  assert.doesNotThrow(fn, errorInstance, /Error must not match this/)
})
```
## operator [​](index.md#operator)

*   **Type:** `(val1: OperatorComparable, operator: Operator, val2: OperatorComparable, message?: string) => void`

Compare `val1` and `val2` using `operator`.

ts
```
import { assert, test } from 'vitest'
test('assert.operator', () => {
  assert.operator(1, '<', 2, 'everything is ok')
})
```
## closeTo [​](index.md#closeto)

*   **Type:** `(actual: number, expected: number, delta: number, message?: string) => void`
*   **Alias:** `approximately`

Asserts that the `actual` is equal `expected`, to within a +/- `delta` range.

ts
```
import { assert, test } from 'vitest'
test('assert.closeTo', () => {
  assert.closeTo(1.5, 1, 0.5, 'numbers are close')
})
```
## sameMembers [​](index.md#samemembers)

*   **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` have the same members in any order. Uses a strict equality check (===).

ts
```
import { assert, test } from 'vitest'
test('assert.sameMembers', () => {
  assert.sameMembers([1, 2, 3], [2, 1, 3], 'same members')
})
```
## notSameMembers [​](index.md#notsamemembers)

*   **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` don't have the same members in any order. Uses a strict equality check (===).

ts
```
import { assert, test } from 'vitest'
test('assert.sameMembers', () => {
  assert.notSameMembers([1, 2, 3], [5, 1, 3], 'not same members')
})
```
## sameDeepMembers [​](index.md#samedeepmembers)

*   **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` have the same members in any order. Uses a deep equality check.

ts
```
import { assert, test } from 'vitest'
test('assert.sameDeepMembers', () => {
  assert.sameDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members')
})
```
## notSameDeepMembers [​](index.md#notsamedeepmembers)

*   **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` don’t have the same members in any order. Uses a deep equality check.

ts
```
import { assert, test } from 'vitest'
test('assert.sameDeepMembers', () => {
  assert.sameDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members')
})
```
## sameOrderedMembers [​](index.md#sameorderedmembers)

*   **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` have the same members in the same order. Uses a strict equality check (===).

ts
```
import { assert, test } from 'vitest'
test('assert.sameOrderedMembers', () => {
  assert.sameOrderedMembers([1, 2, 3], [1, 2, 3], 'same ordered members')
})
```
## notSameOrderedMembers [​](index.md#notsameorderedmembers)

*   **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` have the same members in the same order. Uses a strict equality check (===).

ts
```
import { assert, test } from 'vitest'
test('assert.notSameOrderedMembers', () => {
  assert.notSameOrderedMembers([1, 2, 3], [2, 1, 3], 'not same ordered members')
})
```
## sameDeepOrderedMembers [​](index.md#samedeeporderedmembers)

*   **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` have the same members in the same order. Uses a deep equality check.

ts
```
import { assert, test } from 'vitest'
test('assert.sameDeepOrderedMembers', () => {
  assert.sameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { c: 3 }], 'same deep ordered members')
})
```
## notSameDeepOrderedMembers [​](index.md#notsamedeeporderedmembers)

*   **Type:** `<T>(set1: T[], set2: T[], message?: string) => void`

Asserts that `set1` and `set2` don’t have the same members in the same order. Uses a deep equality check.

ts
```
import { assert, test } from 'vitest'
test('assert.notSameDeepOrderedMembers', () => {
  assert.notSameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { z: 5 }], 'not same deep ordered members')
  assert.notSameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }, { c: 3 }], 'not same deep ordered members')
})
```
## includeMembers [​](index.md#includemembers)

*   **Type:** `<T>(superset: T[], subset: T[], message?: string) => void`

Asserts that `subset` is included in `superset` in any order. Uses a strict equality check (===). Duplicates are ignored.

ts
```
import { assert, test } from 'vitest'
test('assert.includeMembers', () => {
  assert.includeMembers([1, 2, 3], [2, 1, 2], 'include members')
})
```
## notIncludeMembers [​](index.md#notincludemembers)

*   **Type:** `<T>(superset: T[], subset: T[], message?: string) => void`

Asserts that `subset` isn't included in `superset` in any order. Uses a strict equality check (===). Duplicates are ignored.

ts
```
import { assert, test } from 'vitest'
test('assert.notIncludeMembers', () => {
  assert.notIncludeMembers([1, 2, 3], [5, 1], 'not include members')
})
```
## includeDeepMembers [​](index.md#includedeepmembers)

*   **Type:** `<T>(superset: T[], subset: T[], message?: string) => void`

Asserts that `subset` is included in `superset` in any order. Uses a deep equality check. Duplicates are ignored.

ts
```
import { assert, test } from 'vitest'
test('assert.includeDeepMembers', () => {
  assert.includeDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }, { b: 2 }], 'include deep members')
})
```
## notIncludeDeepMembers [​](index.md#notincludedeepmembers)

*   **Type:** `<T>(superset: T[], subset: T[], message?: string) => void`

Asserts that `subset` isn’t included in `superset` in any order. Uses a deep equality check. Duplicates are ignored.

ts
```
import { assert, test } from 'vitest'
test('assert.notIncludeDeepMembers', () => {
  assert.notIncludeDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { f: 5 }], 'not include deep members')
})
```
## includeOrderedMembers [​](index.md#includeorderedmembers)

*   **Type:** `<T>(superset: T[], subset: T[], message?: string) => void`

Asserts that `subset` is included in `superset` in the same order beginning with the first element in `superset`. Uses a strict equality check (===).

ts
```
import { assert, test } from 'vitest'
test('assert.includeOrderedMembers', () => {
  assert.includeOrderedMembers([1, 2, 3], [1, 2], 'include ordered members')
})
```
## notIncludeOrderedMembers [​](index.md#notincludeorderedmembers)

*   **Type:** `<T>(superset: T[], subset: T[], message?: string) => void`

Asserts that `subset` isn't included in `superset` in the same order beginning with the first element in `superset`. Uses a strict equality check (===).

ts
```
import { assert, test } from 'vitest'
test('assert.notIncludeOrderedMembers', () => {
  assert.notIncludeOrderedMembers([1, 2, 3], [2, 1], 'not include ordered members')
  assert.notIncludeOrderedMembers([1, 2, 3], [2, 3], 'not include ordered members')
})
```
## includeDeepOrderedMembers [​](index.md#includedeeporderedmembers)

*   **Type:** `<T>(superset: T[], subset: T[], message?: string) => void`

Asserts that `subset` is included in `superset` in the same order beginning with the first element in `superset`. Uses a deep equality check.

ts
```
import { assert, test } from 'vitest'
test('assert.includeDeepOrderedMembers', () => {
  assert.includeDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }], 'include deep ordered members')
})
```
## notIncludeDeepOrderedMembers [​](index.md#notincludedeeporderedmembers)

*   **Type:** `<T>(superset: T[], subset: T[], message?: string) => void`

Asserts that `subset` isn’t included in `superset` in the same order beginning with the first element in superset. Uses a deep equality check.

ts
```
import { assert, test } from 'vitest'
test('assert.includeDeepOrderedMembers', () => {
  assert.notIncludeDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { f: 5 }], 'not include deep ordered members')
  assert.notIncludeDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }], 'not include deep ordered members')
  assert.notIncludeDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { c: 3 }], 'not include deep ordered members')
})
```
## oneOf [​](index.md#oneof)

*   **Type:** `<T>(inList: T, list: T[], message?: string) => void`

Asserts that non-object, non-array value `inList` appears in the flat array `list`.

ts
```
import { assert, test } from 'vitest'
test('assert.oneOf', () => {
  assert.oneOf(1, [2, 1], 'Not found in list')
})
```
## changes [​](index.md#changes)

*   **Type:** `<T>(modifier: Function, object: T, property: string, message?: string) => void`

Asserts that a `modifier` changes the `object` of a `property`.

ts
```
import { assert, test } from 'vitest'
test('assert.changes', () => {
  const obj = { val: 10 }
  function fn() { obj.val = 22 };
  assert.changes(fn, obj, 'val')
})
```
## changesBy [​](index.md#changesby)

*   **Type:** `<T>(modifier: Function, object: T, property: string, change: number, message?: string) => void`

Asserts that a `modifier` changes the `object` of a `property` by a `change`.

ts
```
import { assert, test } from 'vitest'
test('assert.changesBy', () => {
  const obj = { val: 10 }
  function fn() { obj.val += 2 };
  assert.changesBy(fn, obj, 'val', 2)
})
```
## doesNotChange [​](index.md#doesnotchange)

*   **Type:** `<T>(modifier: Function, object: T, property: string, message?: string) => void`

Asserts that a `modifier` does not changes the `object` of a `property`.

ts
```
import { assert, test } from 'vitest'
test('assert.doesNotChange', () => {
  const obj = { val: 10 }
  function fn() { obj.val += 2 };
  assert.doesNotChange(fn, obj, 'val', 2)
})
```
## changesButNotBy [​](index.md#changesbutnotby)

*   **Type:** `<T>(modifier: Function, object: T, property: string, change:number, message?: string) => void`

Asserts that a `modifier` does not change the `object` of a `property` or of a `modifier` return value by a `change`.

ts
```
import { assert, test } from 'vitest'
test('assert.changesButNotBy', () => {
  const obj = { val: 10 }
  function fn() { obj.val += 10 };
  assert.changesButNotBy(fn, obj, 'val', 5)
})
```
## increases [​](index.md#increases)

*   **Type:** `<T>(modifier: Function, object: T, property: string, message?: string) => void`

Asserts that a `modifier` increases a numeric `object`'s `property`.

ts
```
import { assert, test } from 'vitest'
test('assert.increases', () => {
  const obj = { val: 10 }
  function fn() { obj.val = 13 };
  assert.increases(fn, obj, 'val')
})
```
## increasesBy [​](index.md#increasesby)

*   **Type:** `<T>(modifier: Function, object: T, property: string, change: number, message?: string) => void`

Asserts that a `modifier` increases a numeric `object`'s `property` or a `modifier` return value by an `change`.

ts
```
import { assert, test } from 'vitest'
test('assert.increasesBy', () => {
  const obj = { val: 10 }
  function fn() { obj.val += 10 };
  assert.increasesBy(fn, obj, 'val', 10)
})
```
## doesNotIncrease [​](index.md#doesnotincrease)

*   **Type:** `<T>(modifier: Function, object: T, property: string, message?: string) => void`

Asserts that a `modifier` does not increases a numeric `object`'s `property`.

ts
```
import { assert, test } from 'vitest'
test('assert.doesNotIncrease', () => {
  const obj = { val: 10 }
  function fn() { obj.val = 8 }
  assert.doesNotIncrease(fn, obj, 'val')
})
```
## increasesButNotBy [​](index.md#increasesbutnotby)

*   **Type:** `<T>(modifier: Function, object: T, property: string, change: number, message?: string) => void`

Asserts that a `modifier` does not increases a numeric `object`'s `property` or a `modifier` return value by an `change`.

ts
```
import { assert, test } from 'vitest'
test('assert.increasesButNotBy', () => {
  const obj = { val: 10 }
  function fn() { obj.val += 15 };
  assert.increasesButNotBy(fn, obj, 'val', 10)
})
```
## decreases [​](index.md#decreases)

*   **Type:** `<T>(modifier: Function, object: T, property: string, message?: string) => void`

Asserts that a `modifier` decreases a numeric `object`'s `property`.

ts
```
import { assert, test } from 'vitest'
test('assert.decreases', () => {
  const obj = { val: 10 }
  function fn() { obj.val = 5 };
  assert.decreases(fn, obj, 'val')
})
```
## decreasesBy [​](index.md#decreasesby)

*   **Type:** `<T>(modifier: Function, object: T, property: string, change: number, message?: string) => void`

Asserts that a `modifier` decreases a numeric `object`'s `property` or a `modifier` return value by a `change`.

ts
```
import { assert, test } from 'vitest'
test('assert.decreasesBy', () => {
  const obj = { val: 10 }
  function fn() { obj.val -= 5 };
  assert.decreasesBy(fn, obj, 'val', 5)
})
```
## doesNotDecrease [​](index.md#doesnotdecrease)

*   **Type:** `<T>(modifier: Function, object: T, property: string, message?: string) => void`

Asserts that a `modifier` dose not decrease a numeric `object`'s `property`.

ts
```
import { assert, test } from 'vitest'
test('assert.doesNotDecrease', () => {
  const obj = { val: 10 }
  function fn() { obj.val = 15 }
  assert.doesNotDecrease(fn, obj, 'val')
})
```
## doesNotDecreaseBy [​](index.md#doesnotdecreaseby)

*   **Type:** `<T>(modifier: Function, object: T, property: string, change: number, message?: string) => void`

Asserts that a `modifier` does not decrease a numeric `object`'s `property` or a `modifier` return value by a `change`.

ts
```
import { assert, test } from 'vitest'
test('assert.doesNotDecreaseBy', () => {
  const obj = { val: 10 }
  function fn() { obj.val = 5 };
  assert.doesNotDecreaseBy(fn, obj, 'val', 1)
})
```
## decreasesButNotBy [​](index.md#decreasesbutnotby)

*   **Type:** `<T>(modifier: Function, object: T, property: string, change: number, message?: string) => void`

Asserts that a `modifier` does not decrease a numeric `object`'s `property` or a `modifier` return value by a `change`.

ts
```
import { assert, test } from 'vitest'
test('assert.decreasesButNotBy', () => {
  const obj = { val: 10 }
  function fn() { obj.val = 5 };
  assert.decreasesButNotBy(fn, obj, 'val', 1)
})
```
## ifError [​](index.md#iferror)

*   **Type:** `<T>(object: T, message?: string) => void`

Asserts if `object` is not a false value, and throws if it is a true value. This is added to allow for chai to be a drop-in replacement for Node’s assert class.

ts
```
import { assert, test } from 'vitest'
test('assert.ifError', () => {
  const err = new Error('I am a custom error')
  assert.ifError(err) // Rethrows err!
})
```
## isExtensible [​](index.md#isextensible)

*   **Type:** `<T>(object: T, message?: string) => void`
*   **Alias:** `extensible`

Asserts that `object` is extensible (can have new properties added to it).

ts
```
import { assert, test } from 'vitest'
test('assert.isExtensible', () => {
  assert.isExtensible({})
})
```
## isNotExtensible [​](index.md#isnotextensible)

*   **Type:** `<T>(object: T, message?: string) => void`
*   **Alias:** `notExtensible`

Asserts that `object` is not extensible (can not have new properties added to it).

ts
```
import { assert, test } from 'vitest'
test('assert.isNotExtensible', () => {
  const nonExtensibleObject = Object.preventExtensions({})
  const sealedObject = Object.seal({})
  const frozenObject = Object.freeze({})
  assert.isNotExtensible(nonExtensibleObject)
  assert.isNotExtensible(sealedObject)
  assert.isNotExtensible(frozenObject)
})
```
## isSealed [​](index.md#issealed)

*   **Type:** `<T>(object: T, message?: string) => void`
*   **Alias:** `sealed`

Asserts that `object` is sealed (cannot have new properties added to it and its existing properties cannot be removed).

ts
```
import { assert, test } from 'vitest'
test('assert.isSealed', () => {
  const sealedObject = Object.seal({})
  const frozenObject = Object.seal({})
  assert.isSealed(sealedObject)
  assert.isSealed(frozenObject)
})
```
## isNotSealed [​](index.md#isnotsealed)

*   **Type:** `<T>(object: T, message?: string) => void`
*   **Alias:** `notSealed`

Asserts that `object` is not sealed (can have new properties added to it and its existing properties can be removed).

ts
```
import { assert, test } from 'vitest'
test('assert.isNotSealed', () => {
  assert.isNotSealed({})
})
```
## isFrozen [​](index.md#isfrozen)

*   **Type:** `<T>(object: T, message?: string) => void`
*   **Alias:** `frozen`

Asserts that object is frozen (cannot have new properties added to it and its existing properties cannot be modified).

ts
```
import { assert, test } from 'vitest'
test('assert.isFrozen', () => {
  const frozenObject = Object.freeze({})
  assert.frozen(frozenObject)
})
```
## isNotFrozen [​](index.md#isnotfrozen)

*   **Type:** `<T>(object: T, message?: string) => void`
*   **Alias:** `notFrozen`

Asserts that `object` is not frozen (can have new properties added to it and its existing properties can be modified).

ts
```
import { assert, test } from 'vitest'
test('assert.isNotFrozen', () => {
  assert.isNotFrozen({})
})
```
## isEmpty [​](index.md#isempty)

*   **Type:** `<T>(target: T, message?: string) => void`
*   **Alias:** `empty`

Asserts that the `target` does not contain any values. For arrays and strings, it checks the length property. For Map and Set instances, it checks the size property. For non-function objects, it gets the count of its own enumerable string keys.

ts
```
import { assert, test } from 'vitest'
test('assert.isEmpty', () => {
  assert.isEmpty([])
  assert.isEmpty('')
  assert.isEmpty(new Map())
  assert.isEmpty({})
})
```
## isNotEmpty [​](index.md#isnotempty)

*   **Type:** `<T>(object: T, message?: string) => void`
*   **Alias:** `notEmpty`

Asserts that the `target` contains values. For arrays and strings, it checks the length property. For Map and Set instances, it checks the size property. For non-function objects, it gets the count of its own enumerable string keys.

ts
```
import { assert, test } from 'vitest'
test('assert.isNotEmpty', () => {
  assert.isNotEmpty([1, 2])
  assert.isNotEmpty('34')
  assert.isNotEmpty(new Set([5, 6]))
  assert.isNotEmpty({ key: 7 })
})
```

#### _api_expect-typeof.md

> Source: https://vitest.dev/api/expect-typeof
> Scraped: 4/15/2025, 1:07:44 AM

## expectTypeOf [​](index.md#expecttypeof)

WARNING

During runtime this function doesn't do anything. To [enable typechecking](_guide_testing-types.md#run-typechecking), don't forget to pass down `--typecheck` flag.

*   **Type:** `<T>(a: unknown) => ExpectTypeOf`

## not [​](index.md#not)

*   **Type:** `ExpectTypeOf`

You can negate all assertions, using `.not` property.

## toEqualTypeOf [​](index.md#toequaltypeof)

*   **Type:** `<T>(expected: T) => void`

This matcher will check if the types are fully equal to each other. This matcher will not fail if two objects have different values, but the same type. It will fail however if an object is missing a property.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: number }>()
expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 1 })
expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 2 })
expectTypeOf({ a: 1, b: 1 }).not.toEqualTypeOf<{ a: number }>()
```
## toMatchTypeOf [​](index.md#tomatchtypeof)

*   **Type:** `<T>(expected: T) => void`

This matcher checks if expect type extends provided type. It is different from `toEqual` and is more similar to [expect's](_api_expect.md) `toMatchObject()`. With this matcher, you can check if an object “matches” a type.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf({ a: 1, b: 1 }).toMatchTypeOf({ a: 1 })
expectTypeOf<number>().toMatchTypeOf<string | number>()
expectTypeOf<string | number>().not.toMatchTypeOf<number>()
```
## extract [​](index.md#extract)

*   **Type:** `ExpectTypeOf<ExtractedUnion>`

You can use `.extract` to narrow down types for further testing.

ts
```
import { expectTypeOf } from 'vitest'
type ResponsiveProp<T> = T | T[] | { xs?: T; sm?: T; md?: T }
interface CSSProperties { margin?: string; padding?: string }
function getResponsiveProp<T>(_props: T): ResponsiveProp<T> {
  return {}
}
const cssProperties: CSSProperties = { margin: '1px', padding: '2px' }
expectTypeOf(getResponsiveProp(cssProperties))
  .extract<{ xs?: any }>() // extracts the last type from a union
  .toEqualTypeOf<{ xs?: CSSProperties; sm?: CSSProperties; md?: CSSProperties }>()
expectTypeOf(getResponsiveProp(cssProperties))
  .extract<unknown[]>() // extracts an array from a union
  .toEqualTypeOf<CSSProperties[]>()
```
WARNING

If no type is found in the union, `.extract` will return `never`.

## exclude [​](index.md#exclude)

*   **Type:** `ExpectTypeOf<NonExcludedUnion>`

You can use `.exclude` to remove types from a union for further testing.

ts
```
import { expectTypeOf } from 'vitest'
type ResponsiveProp<T> = T | T[] | { xs?: T; sm?: T; md?: T }
interface CSSProperties { margin?: string; padding?: string }
function getResponsiveProp<T>(_props: T): ResponsiveProp<T> {
  return {}
}
const cssProperties: CSSProperties = { margin: '1px', padding: '2px' }
expectTypeOf(getResponsiveProp(cssProperties))
  .exclude<unknown[]>()
  .exclude<{ xs?: unknown }>() // or just .exclude<unknown[] | { xs?: unknown }>()
  .toEqualTypeOf<CSSProperties>()
```
WARNING

If no type is found in the union, `.exclude` will return `never`.

## returns [​](index.md#returns)

*   **Type:** `ExpectTypeOf<ReturnValue>`

You can use `.returns` to extract return value of a function type.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(() => {}).returns.toBeVoid()
expectTypeOf((a: number) => [a, a]).returns.toEqualTypeOf([1, 2])
```
WARNING

If used on a non-function type, it will return `never`, so you won't be able to chain it with other matchers.

## parameters [​](index.md#parameters)

*   **Type:** `ExpectTypeOf<Parameters>`

You can extract function arguments with `.parameters` to perform assertions on its value. Parameters are returned as an array.

ts
```
import { expectTypeOf } from 'vitest'
type NoParam = () => void
type HasParam = (s: string) => void
expectTypeOf<NoParam>().parameters.toEqualTypeOf<[]>()
expectTypeOf<HasParam>().parameters.toEqualTypeOf<[string]>()
```
WARNING

If used on a non-function type, it will return `never`, so you won't be able to chain it with other matchers.

## parameter [​](index.md#parameter)

*   **Type:** `(nth: number) => ExpectTypeOf`

You can extract a certain function argument with `.parameter(number)` call to perform other assertions on it.

ts
```
import { expectTypeOf } from 'vitest'
function foo(a: number, b: string) {
  return [a, b]
}
expectTypeOf(foo).parameter(0).toBeNumber()
expectTypeOf(foo).parameter(1).toBeString()
```
WARNING

If used on a non-function type, it will return `never`, so you won't be able to chain it with other matchers.

## constructorParameters [​](index.md#constructorparameters)

*   **Type:** `ExpectTypeOf<ConstructorParameters>`

You can extract constructor parameters as an array of values and perform assertions on them with this method.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(Date).constructorParameters.toEqualTypeOf<[] | [string | number | Date]>()
```
WARNING

If used on a non-function type, it will return `never`, so you won't be able to chain it with other matchers.

## instance [​](index.md#instance)

*   **Type:** `ExpectTypeOf<ConstructableInstance>`

This property gives access to matchers that can be performed on an instance of the provided class.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(Date).instance.toHaveProperty('toISOString')
```
WARNING

If used on a non-function type, it will return `never`, so you won't be able to chain it with other matchers.

## items [​](index.md#items)

*   **Type:** `ExpectTypeOf<T>`

You can get array item type with `.items` to perform further assertions.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf([1, 2, 3]).items.toEqualTypeOf<number>()
expectTypeOf([1, 2, 3]).items.not.toEqualTypeOf<string>()
```
## resolves [​](index.md#resolves)

*   **Type:** `ExpectTypeOf<ResolvedPromise>`

This matcher extracts resolved value of a `Promise`, so you can perform other assertions on it.

ts
```
import { expectTypeOf } from 'vitest'
async function asyncFunc() {
  return 123
}
expectTypeOf(asyncFunc).returns.resolves.toBeNumber()
expectTypeOf(Promise.resolve('string')).resolves.toBeString()
```
WARNING

If used on a non-promise type, it will return `never`, so you won't be able to chain it with other matchers.

## guards [​](index.md#guards)

*   **Type:** `ExpectTypeOf<Guard>`

This matcher extracts guard value (e.g., `v is number`), so you can perform assertions on it.

ts
```
import { expectTypeOf } from 'vitest'
function isString(v: any): v is string {
  return typeof v === 'string'
}
expectTypeOf(isString).guards.toBeString()
```
WARNING

Returns `never`, if the value is not a guard function, so you won't be able to chain it with other matchers.

## asserts [​](index.md#asserts)

*   **Type:** `ExpectTypeOf<Assert>`

This matcher extracts assert value (e.g., `assert v is number`), so you can perform assertions on it.

ts
```
import { expectTypeOf } from 'vitest'
function assertNumber(v: any): asserts v is number {
  if (typeof v !== 'number') {
    throw new TypeError('Nope !')
  }
}
expectTypeOf(assertNumber).asserts.toBeNumber()
```
WARNING

Returns `never`, if the value is not an assert function, so you won't be able to chain it with other matchers.

## toBeAny [​](index.md#tobeany)

*   **Type:** `() => void`

With this matcher you can check, if provided type is `any` type. If the type is too specific, the test will fail.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf<any>().toBeAny()
expectTypeOf({} as any).toBeAny()
expectTypeOf('string').not.toBeAny()
```
## toBeUnknown [​](index.md#tobeunknown)

*   **Type:** `() => void`

This matcher checks, if provided type is `unknown` type.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf().toBeUnknown()
expectTypeOf({} as unknown).toBeUnknown()
expectTypeOf('string').not.toBeUnknown()
```
## toBeNever [​](index.md#tobenever)

*   **Type:** `() => void`

This matcher checks, if provided type is a `never` type.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf<never>().toBeNever()
expectTypeOf((): never => {}).returns.toBeNever()
```
## toBeFunction [​](index.md#tobefunction)

*   **Type:** `() => void`

This matcher checks, if provided type is a `function`.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(42).not.toBeFunction()
expectTypeOf((): never => {}).toBeFunction()
```
## toBeObject [​](index.md#tobeobject)

*   **Type:** `() => void`

This matcher checks, if provided type is an `object`.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(42).not.toBeObject()
expectTypeOf({}).toBeObject()
```
## toBeArray [​](index.md#tobearray)

*   **Type:** `() => void`

This matcher checks, if provided type is `Array<T>`.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(42).not.toBeArray()
expectTypeOf([]).toBeArray()
expectTypeOf([1, 2]).toBeArray()
expectTypeOf([{}, 42]).toBeArray()
```
## toBeString [​](index.md#tobestring)

*   **Type:** `() => void`

This matcher checks, if provided type is a `string`.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(42).not.toBeString()
expectTypeOf('').toBeString()
expectTypeOf('a').toBeString()
```
## toBeBoolean [​](index.md#tobeboolean)

*   **Type:** `() => void`

This matcher checks, if provided type is `boolean`.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(42).not.toBeBoolean()
expectTypeOf(true).toBeBoolean()
expectTypeOf<boolean>().toBeBoolean()
```
## toBeVoid [​](index.md#tobevoid)

*   **Type:** `() => void`

This matcher checks, if provided type is `void`.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(() => {}).returns.toBeVoid()
expectTypeOf<void>().toBeVoid()
```
## toBeSymbol [​](index.md#tobesymbol)

*   **Type:** `() => void`

This matcher checks, if provided type is a `symbol`.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(Symbol(1)).toBeSymbol()
expectTypeOf<symbol>().toBeSymbol()
```
## toBeNull [​](index.md#tobenull)

*   **Type:** `() => void`

This matcher checks, if provided type is `null`.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(null).toBeNull()
expectTypeOf<null>().toBeNull()
expectTypeOf(undefined).not.toBeNull()
```
## toBeUndefined [​](index.md#tobeundefined)

*   **Type:** `() => void`

This matcher checks, if provided type is `undefined`.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(undefined).toBeUndefined()
expectTypeOf<undefined>().toBeUndefined()
expectTypeOf(null).not.toBeUndefined()
```
## toBeNullable [​](index.md#tobenullable)

*   **Type:** `() => void`

This matcher checks, if you can use `null` or `undefined` with provided type.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf<undefined | 1>().toBeNullable()
expectTypeOf<null | 1>().toBeNullable()
expectTypeOf<undefined | null | 1>().toBeNullable()
```
## toBeCallableWith [​](index.md#tobecallablewith)

*   **Type:** `() => void`

This matcher ensures you can call provided function with a set of parameters.

ts
```
import { expectTypeOf } from 'vitest'
type NoParam = () => void
type HasParam = (s: string) => void
expectTypeOf<NoParam>().toBeCallableWith()
expectTypeOf<HasParam>().toBeCallableWith('some string')
```
WARNING

If used on a non-function type, it will return `never`, so you won't be able to chain it with other matchers.

## toBeConstructibleWith [​](index.md#tobeconstructiblewith)

*   **Type:** `() => void`

This matcher ensures you can create a new instance with a set of constructor parameters.

ts
```
import { expectTypeOf } from 'vitest'
expectTypeOf(Date).toBeConstructibleWith(new Date())
expectTypeOf(Date).toBeConstructibleWith('01-01-2000')
```
WARNING

If used on a non-function type, it will return `never`, so you won't be able to chain it with other matchers.

## toHaveProperty [​](index.md#tohaveproperty)

*   **Type:** `<K extends keyof T>(property: K) => ExpectTypeOf<T[K>`

This matcher checks if a property exists on the provided object. If it exists, it also returns the same set of matchers for the type of this property, so you can chain assertions one after another.

ts
```
import { expectTypeOf } from 'vitest'
const obj = { a: 1, b: '' }
expectTypeOf(obj).toHaveProperty('a')
expectTypeOf(obj).not.toHaveProperty('c')
expectTypeOf(obj).toHaveProperty('a').toBeNumber()
expectTypeOf(obj).toHaveProperty('b').toBeString()
expectTypeOf(obj).toHaveProperty('a').not.toBeString()
```

#### _api_expect.md

> Source: https://vitest.dev/api/expect
> Scraped: 4/15/2025, 1:07:45 AM

## expect [​](index.md#expect)

The following types are used in the type signatures below

ts
```
type Awaitable<T> = T | PromiseLike<T>
```
`expect` is used to create assertions. In this context `assertions` are functions that can be called to assert a statement. Vitest provides `chai` assertions by default and also `Jest` compatible assertions built on top of `chai`.

For example, this code asserts that an `input` value is equal to `2`. If it's not, the assertion will throw an error, and the test will fail.

ts
```
import {  } from 'vitest'
const  = .(4)
()..(2) // chai API
().(2) // jest API
```
Technically this example doesn't use [`test`](_api_.md#test) function, so in the console you will see Node.js error instead of Vitest output. To learn more about `test`, please read [Test API Reference](_api_.md).

Also, `expect` can be used statically to access matcher functions, described later, and more.

## soft [​](index.md#soft)

*   **Type:** `ExpectStatic & (actual: any) => Assertions`

`expect.soft` functions similarly to `expect`, but instead of terminating the test execution upon a failed assertion, it continues running and marks the failure as a test failure. All errors encountered during the test will be displayed until the test is completed.

ts
```
import { expect, test } from 'vitest'
test('expect.soft test', () => {
  expect.soft(1 + 1).toBe(3) // mark the test as fail and continue
  expect.soft(1 + 2).toBe(4) // mark the test as fail and continue
})
// reporter will report both errors at the end of the run
```
It can also be used with `expect`. if `expect` assertion fails, the test will be terminated and all errors will be displayed.

ts
```
import { expect, test } from 'vitest'
test('expect.soft test', () => {
  expect.soft(1 + 1).toBe(3) // mark the test as fail and continue
  expect(1 + 2).toBe(4) // failed and terminate the test, all previous errors will be output
  expect.soft(1 + 3).toBe(5) // do not run
})
```
WARNING

`expect.soft` can only be used inside the [`test`](_api_.md#test) function.

## poll [​](index.md#poll)

ts
```
interface ExpectPoll extends ExpectStatic {
  (actual: () => T, options: { interval; timeout; message }): Promise<Assertions<T>>
}
```
`expect.poll` reruns the _assertion_ until it is succeeded. You can configure how many times Vitest should rerun the `expect.poll` callback by setting `interval` and `timeout` options.

If an error is thrown inside the `expect.poll` callback, Vitest will retry again until the timeout runs out.

ts
```
import { expect, test } from 'vitest'
test('element exists', async () => {
  asyncInjectElement()
  await expect.poll(() => document.querySelector('.element')).toBeTruthy()
})
```
WARNING

`expect.poll` makes every assertion asynchronous, so you need to await it. Since Vitest 3, if you forget to await it, the test will fail with a warning to do so.

`expect.poll` doesn't work with several matchers:

*   Snapshot matchers are not supported because they will always succeed. If your condition is flaky, consider using [`vi.waitFor`](_api_vi.md#vi-waitfor) instead to resolve it first:

ts
```
import { expect, vi } from 'vitest'
const flakyValue = await vi.waitFor(() => getFlakyValue())
expect(flakyValue).toMatchSnapshot()
```
*   `.resolves` and `.rejects` are not supported. `expect.poll` already awaits the condition if it's asynchronous.
*   `toThrow` and its aliases are not supported because the `expect.poll` condition is always resolved before the matcher gets the value

## not [​](index.md#not)

Using `not` will negate the assertion. For example, this code asserts that an `input` value is not equal to `2`. If it's equal, the assertion will throw an error, and the test will fail.

ts
```
import { expect, test } from 'vitest'
const input = Math.sqrt(16)
expect(input).not.to.equal(2) // chai API
expect(input).not.toBe(2) // jest API
```
## toBe [​](index.md#tobe)

*   **Type:** `(value: any) => Awaitable<void>`

`toBe` can be used to assert if primitives are equal or that objects share the same reference. It is equivalent of calling `expect(Object.is(3, 3)).toBe(true)`. If the objects are not the same, but you want to check if their structures are identical, you can use [`toEqual`](index.md#toequal).

For example, the code below checks if the trader has 13 apples.

ts
```
import { expect, test } from 'vitest'
const stock = {
  type: 'apples',
  count: 13,
}
test('stock has 13 apples', () => {
  expect(stock.type).toBe('apples')
  expect(stock.count).toBe(13)
})
test('stocks are the same', () => {
  const refStock = stock // same reference
  expect(stock).toBe(refStock)
})
```
Try not to use `toBe` with floating-point numbers. Since JavaScript rounds them, `0.1 + 0.2` is not strictly `0.3`. To reliably assert floating-point numbers, use [`toBeCloseTo`](index.md#tobecloseto) assertion.

## toBeCloseTo [​](index.md#tobecloseto)

*   **Type:** `(value: number, numDigits?: number) => Awaitable<void>`

Use `toBeCloseTo` to compare floating-point numbers. The optional `numDigits` argument limits the number of digits to check _after_ the decimal point. For example:

ts
```
import { expect, test } from 'vitest'
test.fails('decimals are not equal in javascript', () => {
  expect(0.2 + 0.1).toBe(0.3) // 0.2 + 0.1 is 0.30000000000000004
})
test('decimals are rounded to 5 after the point', () => {
  // 0.2 + 0.1 is 0.30000 | "000000000004" removed
  expect(0.2 + 0.1).toBeCloseTo(0.3, 5)
  // nothing from 0.30000000000000004 is removed
  expect(0.2 + 0.1).not.toBeCloseTo(0.3, 50)
})
```
## toBeDefined [​](index.md#tobedefined)

*   **Type:** `() => Awaitable<void>`

`toBeDefined` asserts that the value is not equal to `undefined`. Useful use case would be to check if function _returned_ anything.

ts
```
import { expect, test } from 'vitest'
function getApples() {
  return 3
}
test('function returned something', () => {
  expect(getApples()).toBeDefined()
})
```
## toBeUndefined [​](index.md#tobeundefined)

*   **Type:** `() => Awaitable<void>`

Opposite of `toBeDefined`, `toBeUndefined` asserts that the value _is_ equal to `undefined`. Useful use case would be to check if function hasn't _returned_ anything.

ts
```
import { expect, test } from 'vitest'
function getApplesFromStock(stock: string) {
  if (stock === 'Bill') {
    return 13
  }
}
test('mary doesn\'t have a stock', () => {
  expect(getApplesFromStock('Mary')).toBeUndefined()
})
```
## toBeTruthy [​](index.md#tobetruthy)

*   **Type:** `() => Awaitable<void>`

`toBeTruthy` asserts that the value is true when converted to boolean. Useful if you don't care for the value, but just want to know it can be converted to `true`.

For example, having this code you don't care for the return value of `stocks.getInfo` - it maybe a complex object, a string, or anything else. The code will still work.

ts
```
import { Stocks } from './stocks.js'
const stocks = new Stocks()
stocks.sync('Bill')
if (stocks.getInfo('Bill')) {
  stocks.sell('apples', 'Bill')
}
```
So if you want to test that `stocks.getInfo` will be truthy, you could write:

ts
```
import { expect, test } from 'vitest'
import { Stocks } from './stocks.js'
const stocks = new Stocks()
test('if we know Bill stock, sell apples to him', () => {
  stocks.sync('Bill')
  expect(stocks.getInfo('Bill')).toBeTruthy()
})
```
Everything in JavaScript is truthy, except `false`, `null`, `undefined`, `NaN`, `0`, `-0`, `0n`, `""` and `document.all`.

## toBeFalsy [​](index.md#tobefalsy)

*   **Type:** `() => Awaitable<void>`

`toBeFalsy` asserts that the value is false when converted to boolean. Useful if you don't care for the value, but just want to know if it can be converted to `false`.

For example, having this code you don't care for the return value of `stocks.stockFailed` - it may return any falsy value, but the code will still work.

ts
```
import { Stocks } from './stocks.js'
const stocks = new Stocks()
stocks.sync('Bill')
if (!stocks.stockFailed('Bill')) {
  stocks.sell('apples', 'Bill')
}
```
So if you want to test that `stocks.stockFailed` will be falsy, you could write:

ts
```
import { expect, test } from 'vitest'
import { Stocks } from './stocks.js'
const stocks = new Stocks()
test('if Bill stock hasn\'t failed, sell apples to him', () => {
  stocks.syncStocks('Bill')
  expect(stocks.stockFailed('Bill')).toBeFalsy()
})
```
Everything in JavaScript is truthy, except `false`, `null`, `undefined`, `NaN`, `0`, `-0`, `0n`, `""` and `document.all`.

## toBeNull [​](index.md#tobenull)

*   **Type:** `() => Awaitable<void>`

`toBeNull` simply asserts if something is `null`. Alias for `.toBe(null)`.

ts
```
import { expect, test } from 'vitest'
function apples() {
  return null
}
test('we don\'t have apples', () => {
  expect(apples()).toBeNull()
})
```
## toBeNaN [​](index.md#tobenan)

*   **Type:** `() => Awaitable<void>`

`toBeNaN` simply asserts if something is `NaN`. Alias for `.toBe(NaN)`.

ts
```
import { expect, test } from 'vitest'
let i = 0
function getApplesCount() {
  i++
  return i > 1 ? Number.NaN : i
}
test('getApplesCount has some unusual side effects...', () => {
  expect(getApplesCount()).not.toBeNaN()
  expect(getApplesCount()).toBeNaN()
})
```
## toBeOneOf [​](index.md#tobeoneof)

*   **Type:** `(sample: Array<any>) => any`

`toBeOneOf` asserts if a value matches any of the values in the provided array.

ts
```
import { expect, test } from 'vitest'
test('fruit is one of the allowed values', () => {
  expect(fruit).toBeOneOf(['apple', 'banana', 'orange'])
})
```
The asymmetric matcher is particularly useful when testing optional properties that could be either `null` or `undefined`:

ts
```
test('optional properties can be null or undefined', () => {
  const user = {
    firstName: 'John',
    middleName: undefined,
    lastName: 'Doe'
  }
  expect(user).toEqual({
    firstName: expect.any(String),
    middleName: expect.toBeOneOf([expect.any(String), undefined]),
    lastName: expect.any(String),
  })
})
```
TIP

You can use `expect.not` with this matcher to ensure a value does NOT match any of the provided options.

## toBeTypeOf [​](index.md#tobetypeof)

*   **Type:** `(c: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined') => Awaitable<void>`

`toBeTypeOf` asserts if an actual value is of type of received type.

ts
```
import { expect, test } from 'vitest'
const actual = 'stock'
test('stock is type of string', () => {
  expect(actual).toBeTypeOf('string')
})
```
## toBeInstanceOf [​](index.md#tobeinstanceof)

*   **Type:** `(c: any) => Awaitable<void>`

`toBeInstanceOf` asserts if an actual value is instance of received class.

ts
```
import { expect, test } from 'vitest'
import { Stocks } from './stocks.js'
const stocks = new Stocks()
test('stocks are instance of Stocks', () => {
  expect(stocks).toBeInstanceOf(Stocks)
})
```
## toBeGreaterThan [​](index.md#tobegreaterthan)

*   **Type:** `(n: number | bigint) => Awaitable<void>`

`toBeGreaterThan` asserts if actual value is greater than received one. Equal values will fail the test.

ts
```
import { expect, test } from 'vitest'
import { getApples } from './stocks.js'
test('have more then 10 apples', () => {
  expect(getApples()).toBeGreaterThan(10)
})
```
## toBeGreaterThanOrEqual [​](index.md#tobegreaterthanorequal)

*   **Type:** `(n: number | bigint) => Awaitable<void>`

`toBeGreaterThanOrEqual` asserts if actual value is greater than received one or equal to it.

ts
```
import { expect, test } from 'vitest'
import { getApples } from './stocks.js'
test('have 11 apples or more', () => {
  expect(getApples()).toBeGreaterThanOrEqual(11)
})
```
## toBeLessThan [​](index.md#tobelessthan)

*   **Type:** `(n: number | bigint) => Awaitable<void>`

`toBeLessThan` asserts if actual value is less than received one. Equal values will fail the test.

ts
```
import { expect, test } from 'vitest'
import { getApples } from './stocks.js'
test('have less then 20 apples', () => {
  expect(getApples()).toBeLessThan(20)
})
```
## toBeLessThanOrEqual [​](index.md#tobelessthanorequal)

*   **Type:** `(n: number | bigint) => Awaitable<void>`

`toBeLessThanOrEqual` asserts if actual value is less than received one or equal to it.

ts
```
import { expect, test } from 'vitest'
import { getApples } from './stocks.js'
test('have 11 apples or less', () => {
  expect(getApples()).toBeLessThanOrEqual(11)
})
```
## toEqual [​](index.md#toequal)

*   **Type:** `(received: any) => Awaitable<void>`

`toEqual` asserts if actual value is equal to received one or has the same structure, if it is an object (compares them recursively). You can see the difference between `toEqual` and [`toBe`](index.md#tobe) in this example:

ts
```
import { expect, test } from 'vitest'
const stockBill = {
  type: 'apples',
  count: 13,
}
const stockMary = {
  type: 'apples',
  count: 13,
}
test('stocks have the same properties', () => {
  expect(stockBill).toEqual(stockMary)
})
test('stocks are not the same', () => {
  expect(stockBill).not.toBe(stockMary)
})
```
WARNING

For `Error` objects, non-enumerable properties such as `name`, `message`, `cause` and `AggregateError.errors` are also compared. For `Error.cause`, the comparison is done asymmetrically:

ts
```
// success
expect(new Error('hi', { cause: 'x' })).toEqual(new Error('hi'))
// fail
expect(new Error('hi')).toEqual(new Error('hi', { cause: 'x' }))
```
To test if something was thrown, use [`toThrowError`](index.md#tothrowerror) assertion.

## toStrictEqual [​](index.md#tostrictequal)

*   **Type:** `(received: any) => Awaitable<void>`

`toStrictEqual` asserts if the actual value is equal to the received one or has the same structure if it is an object (compares them recursively), and of the same type.

Differences from [`.toEqual`](index.md#toequal):

*   Keys with `undefined` properties are checked. e.g. `{a: undefined, b: 2}` does not match `{b: 2}` when using `.toStrictEqual`.
*   Array sparseness is checked. e.g. `[, 1]` does not match `[undefined, 1]` when using `.toStrictEqual`.
*   Object types are checked to be equal. e.g. A class instance with fields `a` and `b` will not equal a literal object with fields `a` and `b`.

ts
```
import { expect, test } from 'vitest'
class Stock {
  constructor(type) {
    this.type = type
  }
}
test('structurally the same, but semantically different', () => {
  expect(new Stock('apples')).toEqual({ type: 'apples' })
  expect(new Stock('apples')).not.toStrictEqual({ type: 'apples' })
})
```
## toContain [​](index.md#tocontain)

*   **Type:** `(received: string) => Awaitable<void>`

`toContain` asserts if the actual value is in an array. `toContain` can also check whether a string is a substring of another string. If you are running tests in a browser-like environment, this assertion can also check if class is contained in a `classList`, or an element is inside another one.

ts
```
import { expect, test } from 'vitest'
import { getAllFruits } from './stocks.js'
test('the fruit list contains orange', () => {
  expect(getAllFruits()).toContain('orange')
  const element = document.querySelector('#el')
  // element has a class
  expect(element.classList).toContain('flex')
  // element is inside another one
  expect(document.querySelector('#wrapper')).toContain(element)
})
```
## toContainEqual [​](index.md#tocontainequal)

*   **Type:** `(received: any) => Awaitable<void>`

`toContainEqual` asserts if an item with a specific structure and values is contained in an array. It works like [`toEqual`](index.md#toequal) inside for each element.

ts
```
import { expect, test } from 'vitest'
import { getFruitStock } from './stocks.js'
test('apple available', () => {
  expect(getFruitStock()).toContainEqual({ fruit: 'apple', count: 5 })
})
```
## toHaveLength [​](index.md#tohavelength)

*   **Type:** `(received: number) => Awaitable<void>`

`toHaveLength` asserts if an object has a `.length` property and it is set to a certain numeric value.

ts
```
import { expect, test } from 'vitest'
test('toHaveLength', () => {
  expect('abc').toHaveLength(3)
  expect([1, 2, 3]).toHaveLength(3)
  expect('').not.toHaveLength(3) // doesn't have .length of 3
  expect({ length: 3 }).toHaveLength(3)
})
```
## toHaveProperty [​](index.md#tohaveproperty)

*   **Type:** `(key: any, received?: any) => Awaitable<void>`

`toHaveProperty` asserts if a property at provided reference `key` exists for an object.

You can provide an optional value argument also known as deep equality, like the `toEqual` matcher to compare the received property value.

ts
```
import { expect, test } from 'vitest'
const invoice = {
  'isActive': true,
  'P.O': '12345',
  'customer': {
    first_name: 'John',
    last_name: 'Doe',
    location: 'China',
  },
  'total_amount': 5000,
  'items': [
    {
      type: 'apples',
      quantity: 10,
    },
    {
      type: 'oranges',
      quantity: 5,
    },
  ],
}
test('John Doe Invoice', () => {
  expect(invoice).toHaveProperty('isActive') // assert that the key exists
  expect(invoice).toHaveProperty('total_amount', 5000) // assert that the key exists and the value is equal
  expect(invoice).not.toHaveProperty('account') // assert that this key does not exist
  // Deep referencing using dot notation
  expect(invoice).toHaveProperty('customer.first_name')
  expect(invoice).toHaveProperty('customer.last_name', 'Doe')
  expect(invoice).not.toHaveProperty('customer.location', 'India')
  // Deep referencing using an array containing the key
  expect(invoice).toHaveProperty('items[0].type', 'apples')
  expect(invoice).toHaveProperty('items.0.type', 'apples') // dot notation also works
  // Deep referencing using an array containing the keyPath
  expect(invoice).toHaveProperty(['items', 0, 'type'], 'apples')
  expect(invoice).toHaveProperty(['items', '0', 'type'], 'apples') // string notation also works
  // Wrap your key in an array to avoid the key from being parsed as a deep reference
  expect(invoice).toHaveProperty(['P.O'], '12345')
})
```
## toMatch [​](index.md#tomatch)

*   **Type:** `(received: string | regexp) => Awaitable<void>`

`toMatch` asserts if a string matches a regular expression or a string.

ts
```
import { expect, test } from 'vitest'
test('top fruits', () => {
  expect('top fruits include apple, orange and grape').toMatch(/apple/)
  expect('applefruits').toMatch('fruit') // toMatch also accepts a string
})
```
## toMatchObject [​](index.md#tomatchobject)

*   **Type:** `(received: object | array) => Awaitable<void>`

`toMatchObject` asserts if an object matches a subset of the properties of an object.

You can also pass an array of objects. This is useful if you want to check that two arrays match in their number of elements, as opposed to `arrayContaining`, which allows for extra elements in the received array.

ts
```
import { expect, test } from 'vitest'
const johnInvoice = {
  isActive: true,
  customer: {
    first_name: 'John',
    last_name: 'Doe',
    location: 'China',
  },
  total_amount: 5000,
  items: [
    {
      type: 'apples',
      quantity: 10,
    },
    {
      type: 'oranges',
      quantity: 5,
    },
  ],
}
const johnDetails = {
  customer: {
    first_name: 'John',
    last_name: 'Doe',
    location: 'China',
  },
}
test('invoice has john personal details', () => {
  expect(johnInvoice).toMatchObject(johnDetails)
})
test('the number of elements must match exactly', () => {
  // Assert that an array of object matches
  expect([{ foo: 'bar' }, { baz: 1 }]).toMatchObject([
    { foo: 'bar' },
    { baz: 1 },
  ])
})
```
## toThrowError [​](index.md#tothrowerror)

*   **Type:** `(received: any) => Awaitable<void>`
    
*   **Alias:** `toThrow`
    

`toThrowError` asserts if a function throws an error when it is called.

You can provide an optional argument to test that a specific error is thrown:

*   `RegExp`: error message matches the pattern
*   `string`: error message includes the substring
*   `Error`, `AsymmetricMatcher`: compare with a received object similar to `toEqual(received)`

TIP

You must wrap the code in a function, otherwise the error will not be caught, and test will fail.

This does not apply for async calls as [rejects](index.md#rejects) correctly unwraps the promise:

ts
```
test('expect rejects toThrow', async ({ expect }) => {
  const promise = Promise.reject(new Error('Test'))
  await expect(promise).rejects.toThrowError()
})
```
For example, if we want to test that `getFruitStock('pineapples')` throws, we could write:

ts
```
import { expect, test } from 'vitest'
function getFruitStock(type: string) {
  if (type === 'pineapples') {
    throw new Error('Pineapples are not in stock')
  }
  // Do some other stuff
}
test('throws on pineapples', () => {
  // Test that the error message says "stock" somewhere: these are equivalent
  expect(() => getFruitStock('pineapples')).toThrowError(/stock/)
  expect(() => getFruitStock('pineapples')).toThrowError('stock')
  // Test the exact error message
  expect(() => getFruitStock('pineapples')).toThrowError(
    /^Pineapples are not in stock$/,
  )
  expect(() => getFruitStock('pineapples')).toThrowError(
    new Error('Pineapples are not in stock'),
  )
  expect(() => getFruitStock('pineapples')).toThrowError(expect.objectContaining({
    message: 'Pineapples are not in stock',
  }))
})
```
TIP

To test async functions, use in combination with [rejects](index.md#rejects).

js
```
function getAsyncFruitStock() {
  return Promise.reject(new Error('empty'))
}
test('throws on pineapples', async () => {
  await expect(() => getAsyncFruitStock()).rejects.toThrowError('empty')
})
```
## toMatchSnapshot [​](index.md#tomatchsnapshot)

*   **Type:** `<T>(shape?: Partial<T> | string, message?: string) => void`

This ensures that a value matches the most recent snapshot.

You can provide an optional `hint` string argument that is appended to the test name. Although Vitest always appends a number at the end of a snapshot name, short descriptive hints might be more useful than numbers to differentiate multiple snapshots in a single it or test block. Vitest sorts snapshots by name in the corresponding `.snap` file.

TIP

When a snapshot mismatches and causes the test to fail, if the mismatch is expected, you can press `u` key to update the snapshot once. Or you can pass `-u` or `--update` CLI options to make Vitest always update the tests.

ts
```
import { expect, test } from 'vitest'
test('matches snapshot', () => {
  const data = { foo: new Set(['bar', 'snapshot']) }
  expect(data).toMatchSnapshot()
})
```
You can also provide a shape of an object, if you are testing just a shape of an object, and don't need it to be 100% compatible:

ts
```
import { expect, test } from 'vitest'
test('matches snapshot', () => {
  const data = { foo: new Set(['bar', 'snapshot']) }
  expect(data).toMatchSnapshot({ foo: expect.any(Set) })
})
```
## toMatchInlineSnapshot [​](index.md#tomatchinlinesnapshot)

*   **Type:** `<T>(shape?: Partial<T> | string, snapshot?: string, message?: string) => void`

This ensures that a value matches the most recent snapshot.

Vitest adds and updates the inlineSnapshot string argument to the matcher in the test file (instead of an external `.snap` file).

ts
```
import { expect, test } from 'vitest'
test('matches inline snapshot', () => {
  const data = { foo: new Set(['bar', 'snapshot']) }
  // Vitest will update following content when updating the snapshot
  expect(data).toMatchInlineSnapshot(`
    {
      "foo": Set {
        "bar",
        "snapshot",
      },
    }
  `)
})
```
You can also provide a shape of an object, if you are testing just a shape of an object, and don't need it to be 100% compatible:

ts
```
import { expect, test } from 'vitest'
test('matches snapshot', () => {
  const data = { foo: new Set(['bar', 'snapshot']) }
  expect(data).toMatchInlineSnapshot(
    { foo: expect.any(Set) },
    `
    {
      "foo": Any<Set>,
    }
  `
  )
})
```
## toMatchFileSnapshot [​](index.md#tomatchfilesnapshot)

*   **Type:** `<T>(filepath: string, message?: string) => Promise<void>`

Compare or update the snapshot with the content of a file explicitly specified (instead of the `.snap` file).

ts
```
import { expect, it } from 'vitest'
it('render basic', async () => {
  const result = renderHTML(h('div', { class: 'foo' }))
  await expect(result).toMatchFileSnapshot('./test/basic.output.html')
})
```
Note that since file system operation is async, you need to use `await` with `toMatchFileSnapshot()`. If `await` is not used, Vitest treats it like `expect.soft`, meaning the code after the statement will continue to run even if the snapshot mismatches. After the test finishes, Vitest will check the snapshot and fail if there is a mismatch.

## toThrowErrorMatchingSnapshot [​](index.md#tothrowerrormatchingsnapshot)

*   **Type:** `(message?: string) => void`

The same as [`toMatchSnapshot`](index.md#tomatchsnapshot), but expects the same value as [`toThrowError`](index.md#tothrowerror).

## toThrowErrorMatchingInlineSnapshot [​](index.md#tothrowerrormatchinginlinesnapshot)

*   **Type:** `(snapshot?: string, message?: string) => void`

The same as [`toMatchInlineSnapshot`](index.md#tomatchinlinesnapshot), but expects the same value as [`toThrowError`](index.md#tothrowerror).

## toHaveBeenCalled [​](index.md#tohavebeencalled)

*   **Type:** `() => Awaitable<void>`

This assertion is useful for testing that a function has been called. Requires a spy function to be passed to `expect`.

ts
```
import { expect, test, vi } from 'vitest'
const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}
test('spy function', () => {
  const buySpy = vi.spyOn(market, 'buy')
  expect(buySpy).not.toHaveBeenCalled()
  market.buy('apples', 10)
  expect(buySpy).toHaveBeenCalled()
})
```
## toHaveBeenCalledTimes [​](index.md#tohavebeencalledtimes)

*   **Type**: `(amount: number) => Awaitable<void>`

This assertion checks if a function was called a certain amount of times. Requires a spy function to be passed to `expect`.

ts
```
import { expect, test, vi } from 'vitest'
const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}
test('spy function called two times', () => {
  const buySpy = vi.spyOn(market, 'buy')
  market.buy('apples', 10)
  market.buy('apples', 20)
  expect(buySpy).toHaveBeenCalledTimes(2)
})
```
## toHaveBeenCalledWith [​](index.md#tohavebeencalledwith)

*   **Type**: `(...args: any[]) => Awaitable<void>`

This assertion checks if a function was called at least once with certain parameters. Requires a spy function to be passed to `expect`.

ts
```
import { expect, test, vi } from 'vitest'
const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}
test('spy function', () => {
  const buySpy = vi.spyOn(market, 'buy')
  market.buy('apples', 10)
  market.buy('apples', 20)
  expect(buySpy).toHaveBeenCalledWith('apples', 10)
  expect(buySpy).toHaveBeenCalledWith('apples', 20)
})
```
## toHaveBeenCalledBefore 3.0.0+ [​](index.md#tohavebeencalledbefore)

*   **Type**: `(mock: MockInstance, failIfNoFirstInvocation?: boolean) => Awaitable<void>`

This assertion checks if a `Mock` was called before another `Mock`.

ts
```
test('calls mock1 before mock2', () => {
  const mock1 = vi.fn()
  const mock2 = vi.fn()
  mock1()
  mock2()
  mock1()
  expect(mock1).toHaveBeenCalledBefore(mock2)
})
```
## toHaveBeenCalledAfter 3.0.0+ [​](index.md#tohavebeencalledafter)

*   **Type**: `(mock: MockInstance, failIfNoFirstInvocation?: boolean) => Awaitable<void>`

This assertion checks if a `Mock` was called after another `Mock`.

ts
```
test('calls mock1 after mock2', () => {
  const mock1 = vi.fn()
  const mock2 = vi.fn()
  mock2()
  mock1()
  mock2()
  expect(mock1).toHaveBeenCalledAfter(mock2)
})
```
## toHaveBeenCalledExactlyOnceWith 3.0.0+ [​](index.md#tohavebeencalledexactlyoncewith)

*   **Type**: `(...args: any[]) => Awaitable<void>`

This assertion checks if a function was called exactly once and with certain parameters. Requires a spy function to be passed to `expect`.

ts
```
import { expect, test, vi } from 'vitest'
const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}
test('spy function', () => {
  const buySpy = vi.spyOn(market, 'buy')
  market.buy('apples', 10)
  expect(buySpy).toHaveBeenCalledExactlyOnceWith('apples', 10)
})
```
## toHaveBeenLastCalledWith [​](index.md#tohavebeenlastcalledwith)

*   **Type**: `(...args: any[]) => Awaitable<void>`

This assertion checks if a function was called with certain parameters at its last invocation. Requires a spy function to be passed to `expect`.

ts
```
import { expect, test, vi } from 'vitest'
const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}
test('spy function', () => {
  const buySpy = vi.spyOn(market, 'buy')
  market.buy('apples', 10)
  market.buy('apples', 20)
  expect(buySpy).not.toHaveBeenLastCalledWith('apples', 10)
  expect(buySpy).toHaveBeenLastCalledWith('apples', 20)
})
```
## toHaveBeenNthCalledWith [​](index.md#tohavebeennthcalledwith)

*   **Type**: `(time: number, ...args: any[]) => Awaitable<void>`

This assertion checks if a function was called with certain parameters at the certain time. The count starts at 1. So, to check the second entry, you would write `.toHaveBeenNthCalledWith(2, ...)`.

Requires a spy function to be passed to `expect`.

ts
```
import { expect, test, vi } from 'vitest'
const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}
test('first call of spy function called with right params', () => {
  const buySpy = vi.spyOn(market, 'buy')
  market.buy('apples', 10)
  market.buy('apples', 20)
  expect(buySpy).toHaveBeenNthCalledWith(1, 'apples', 10)
})
```
## toHaveReturned [​](index.md#tohavereturned)

*   **Type**: `() => Awaitable<void>`

This assertion checks if a function has successfully returned a value at least once (i.e., did not throw an error). Requires a spy function to be passed to `expect`.

ts
```
import { expect, test, vi } from 'vitest'
function getApplesPrice(amount: number) {
  const PRICE = 10
  return amount * PRICE
}
test('spy function returned a value', () => {
  const getPriceSpy = vi.fn(getApplesPrice)
  const price = getPriceSpy(10)
  expect(price).toBe(100)
  expect(getPriceSpy).toHaveReturned()
})
```
## toHaveReturnedTimes [​](index.md#tohavereturnedtimes)

*   **Type**: `(amount: number) => Awaitable<void>`

This assertion checks if a function has successfully returned a value an exact amount of times (i.e., did not throw an error). Requires a spy function to be passed to `expect`.

ts
```
import { expect, test, vi } from 'vitest'
test('spy function returns a value two times', () => {
  const sell = vi.fn((product: string) => ({ product }))
  sell('apples')
  sell('bananas')
  expect(sell).toHaveReturnedTimes(2)
})
```
## toHaveReturnedWith [​](index.md#tohavereturnedwith)

*   **Type**: `(returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully returned a value with certain parameters at least once. Requires a spy function to be passed to `expect`.

ts
```
import { expect, test, vi } from 'vitest'
test('spy function returns a product', () => {
  const sell = vi.fn((product: string) => ({ product }))
  sell('apples')
  expect(sell).toHaveReturnedWith({ product: 'apples' })
})
```
## toHaveLastReturnedWith [​](index.md#tohavelastreturnedwith)

*   **Type**: `(returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully returned a certain value when it was last invoked. Requires a spy function to be passed to `expect`.

ts
```
import { expect, test, vi } from 'vitest'
test('spy function returns bananas on a last call', () => {
  const sell = vi.fn((product: string) => ({ product }))
  sell('apples')
  sell('bananas')
  expect(sell).toHaveLastReturnedWith({ product: 'bananas' })
})
```
## toHaveNthReturnedWith [​](index.md#tohaventhreturnedwith)

*   **Type**: `(time: number, returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully returned a value with certain parameters on a certain call. Requires a spy function to be passed to `expect`.

ts
```
import { expect, test, vi } from 'vitest'
test('spy function returns bananas on second call', () => {
  const sell = vi.fn((product: string) => ({ product }))
  sell('apples')
  sell('bananas')
  expect(sell).toHaveNthReturnedWith(2, { product: 'bananas' })
})
```
## toHaveResolved [​](index.md#tohaveresolved)

*   **Type**: `() => Awaitable<void>`

This assertion checks if a function has successfully resolved a value at least once (i.e., did not reject). Requires a spy function to be passed to `expect`.

If the function returned a promise, but it was not resolved yet, this will fail.

ts
```
import { expect, test, vi } from 'vitest'
import db from './db/apples.js'
async function getApplesPrice(amount: number) {
  return amount * await db.get('price')
}
test('spy function resolved a value', async () => {
  const getPriceSpy = vi.fn(getApplesPrice)
  const price = await getPriceSpy(10)
  expect(price).toBe(100)
  expect(getPriceSpy).toHaveResolved()
})
```
## toHaveResolvedTimes [​](index.md#tohaveresolvedtimes)

*   **Type**: `(amount: number) => Awaitable<void>`

This assertion checks if a function has successfully resolved a value an exact amount of times (i.e., did not reject). Requires a spy function to be passed to `expect`.

This will only count resolved promises. If the function returned a promise, but it was not resolved yet, it will not be counted.

ts
```
import { expect, test, vi } from 'vitest'
test('spy function resolved a value two times', async () => {
  const sell = vi.fn((product: string) => Promise.resolve({ product }))
  await sell('apples')
  await sell('bananas')
  expect(sell).toHaveResolvedTimes(2)
})
```
## toHaveResolvedWith [​](index.md#tohaveresolvedwith)

*   **Type**: `(returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully resolved a certain value at least once. Requires a spy function to be passed to `expect`.

If the function returned a promise, but it was not resolved yet, this will fail.

ts
```
import { expect, test, vi } from 'vitest'
test('spy function resolved a product', async () => {
  const sell = vi.fn((product: string) => Promise.resolve({ product }))
  await sell('apples')
  expect(sell).toHaveResolvedWith({ product: 'apples' })
})
```
## toHaveLastResolvedWith [​](index.md#tohavelastresolvedwith)

*   **Type**: `(returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully resolved a certain value when it was last invoked. Requires a spy function to be passed to `expect`.

If the function returned a promise, but it was not resolved yet, this will fail.

ts
```
import { expect, test, vi } from 'vitest'
test('spy function resolves bananas on a last call', async () => {
  const sell = vi.fn((product: string) => Promise.resolve({ product }))
  await sell('apples')
  await sell('bananas')
  expect(sell).toHaveLastResolvedWith({ product: 'bananas' })
})
```
## toHaveNthResolvedWith [​](index.md#tohaventhresolvedwith)

*   **Type**: `(time: number, returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully resolved a certain value on a specific invocation. Requires a spy function to be passed to `expect`.

If the function returned a promise, but it was not resolved yet, this will fail.

ts
```
import { expect, test, vi } from 'vitest'
test('spy function returns bananas on second call', async () => {
  const sell = vi.fn((product: string) => Promise.resolve({ product }))
  await sell('apples')
  await sell('bananas')
  expect(sell).toHaveNthResolvedWith(2, { product: 'bananas' })
})
```
## toSatisfy [​](index.md#tosatisfy)

*   **Type:** `(predicate: (value: any) => boolean) => Awaitable<void>`

This assertion checks if a value satisfies a certain predicate.

ts
```
import { describe, expect, it } from 'vitest'
const isOdd = (value: number) => value % 2 !== 0
describe('toSatisfy()', () => {
  it('pass with 0', () => {
    expect(1).toSatisfy(isOdd)
  })
  it('pass with negation', () => {
    expect(2).not.toSatisfy(isOdd)
  })
})
```
## resolves [​](index.md#resolves)

*   **Type:** `Promisify<Assertions>`

`resolves` is intended to remove boilerplate when asserting asynchronous code. Use it to unwrap value from the pending promise and assert its value with usual assertions. If the promise rejects, the assertion will fail.

It returns the same `Assertions` object, but all matchers now return `Promise`, so you would need to `await` it. Also works with `chai` assertions.

For example, if you have a function, that makes an API call and returns some data, you may use this code to assert its return value:

ts
```
import { expect, test } from 'vitest'
async function buyApples() {
  return fetch('/buy/apples').then(r => r.json())
}
test('buyApples returns new stock id', async () => {
  // toEqual returns a promise now, so you HAVE to await it
  await expect(buyApples()).resolves.toEqual({ id: 1 }) // jest API
  await expect(buyApples()).resolves.to.equal({ id: 1 }) // chai API
})
```
WARNING

If the assertion is not awaited, then you will have a false-positive test that will pass every time. To make sure that assertions are actually called, you may use [`expect.assertions(number)`](index.md#expect-assertions).

Since Vitest 3, if a method is not awaited, Vitest will show a warning at the end of the test. In Vitest 4, the test will be marked as "failed" if the assertion is not awaited.

## rejects [​](index.md#rejects)

*   **Type:** `Promisify<Assertions>`

`rejects` is intended to remove boilerplate when asserting asynchronous code. Use it to unwrap reason why the promise was rejected, and assert its value with usual assertions. If the promise successfully resolves, the assertion will fail.

It returns the same `Assertions` object, but all matchers now return `Promise`, so you would need to `await` it. Also works with `chai` assertions.

For example, if you have a function that fails when you call it, you may use this code to assert the reason:

ts
```
import { expect, test } from 'vitest'
async function buyApples(id) {
  if (!id) {
    throw new Error('no id')
  }
}
test('buyApples throws an error when no id provided', async () => {
  // toThrow returns a promise now, so you HAVE to await it
  await expect(buyApples()).rejects.toThrow('no id')
})
```
WARNING

If the assertion is not awaited, then you will have a false-positive test that will pass every time. To make sure that assertions were actually called, you can use [`expect.assertions(number)`](index.md#expect-assertions).

Since Vitest 3, if a method is not awaited, Vitest will show a warning at the end of the test. In Vitest 4, the test will be marked as "failed" if the assertion is not awaited.

## expect.assertions [​](index.md#expect-assertions)

*   **Type:** `(count: number) => void`

After the test has passed or failed verify that a certain number of assertions was called during a test. A useful case would be to check if an asynchronous code was called.

For example, if we have a function that asynchronously calls two matchers, we can assert that they were actually called.

ts
```
import { expect, test } from 'vitest'
async function doAsync(...cbs) {
  await Promise.all(
    cbs.map((cb, index) => cb({ index })),
  )
}
test('all assertions are called', async () => {
  expect.assertions(2)
  function callback1(data) {
    expect(data).toBeTruthy()
  }
  function callback2(data) {
    expect(data).toBeTruthy()
  }
  await doAsync(callback1, callback2)
})
```
WARNING

When using `assertions` with async concurrent tests, `expect` from the local [Test Context](_guide_test-context.md) must be used to ensure the right test is detected.

## expect.hasAssertions [​](index.md#expect-hasassertions)

*   **Type:** `() => void`

After the test has passed or failed verify that at least one assertion was called during a test. A useful case would be to check if an asynchronous code was called.

For example, if you have a code that calls a callback, we can make an assertion inside a callback, but the test will always pass if we don't check if an assertion was called.

ts
```
import { expect, test } from 'vitest'
import { db } from './db.js'
const cbs = []
function onSelect(cb) {
  cbs.push(cb)
}
// after selecting from db, we call all callbacks
function select(id) {
  return db.select({ id }).then((data) => {
    return Promise.all(
      cbs.map(cb => cb(data)),
    )
  })
}
test('callback was called', async () => {
  expect.hasAssertions()
  onSelect((data) => {
    // should be called on select
    expect(data).toBeTruthy()
  })
  // if not awaited, test will fail
  // if you don't have expect.hasAssertions(), test will pass
  await select(3)
})
```
## expect.unreachable [​](index.md#expect-unreachable)

*   **Type:** `(message?: string) => never`

This method is used to assert that a line should never be reached.

For example, if we want to test that `build()` throws due to receiving directories having no `src` folder, and also handle each error separately, we could do this:

ts
```
import { expect, test } from 'vitest'
async function build(dir) {
  if (dir.includes('no-src')) {
    throw new Error(`${dir}/src does not exist`)
  }
}
const errorDirs = [
  'no-src-folder',
  // ...
]
test.each(errorDirs)('build fails with "%s"', async (dir) => {
  try {
    await build(dir)
    expect.unreachable('Should not pass build')
  }
  catch (err: any) {
    expect(err).toBeInstanceOf(Error)
    expect(err.stack).toContain('build')
    switch (dir) {
      case 'no-src-folder':
        expect(err.message).toBe(`${dir}/src does not exist`)
        break
      default:
        // to exhaust all error tests
        expect.unreachable('All error test must be handled')
        break
    }
  }
})
```
## expect.anything [​](index.md#expect-anything)

*   **Type:** `() => any`

This asymmetric matcher, when used with equality check, will always return `true`. Useful, if you just want to be sure that the property exist.

ts
```
import { expect, test } from 'vitest'
test('object has "apples" key', () => {
  expect({ apples: 22 }).toEqual({ apples: expect.anything() })
})
```
## expect.any [​](index.md#expect-any)

*   **Type:** `(constructor: unknown) => any`

This asymmetric matcher, when used with an equality check, will return `true` only if the value is an instance of a specified constructor. Useful, if you have a value that is generated each time, and you only want to know that it exists with a proper type.

ts
```
import { expect, test } from 'vitest'
import { generateId } from './generators.js'
test('"id" is a number', () => {
  expect({ id: generateId() }).toEqual({ id: expect.any(Number) })
})
```
## expect.closeTo [​](index.md#expect-closeto)

*   **Type:** `(expected: any, precision?: number) => any`

`expect.closeTo` is useful when comparing floating point numbers in object properties or array item. If you need to compare a number, please use `.toBeCloseTo` instead.

The optional `precision` argument limits the number of digits to check **after** the decimal point. For the default value `2`, the test criterion is `Math.abs(expected - received) < 0.005 (that is, 10 ** -2 / 2)`.

For example, this test passes with a precision of 5 digits:

js
```
test('compare float in object properties', () => {
  expect({
    title: '0.1 + 0.2',
    sum: 0.1 + 0.2,
  }).toEqual({
    title: '0.1 + 0.2',
    sum: expect.closeTo(0.3, 5),
  })
})
```
## expect.arrayContaining [​](index.md#expect-arraycontaining)

*   **Type:** `<T>(expected: T[]) => any`

When used with an equality check, this asymmetric matcher will return `true` if the value is an array and contains specified items.

ts
```
import { expect, test } from 'vitest'
test('basket includes fuji', () => {
  const basket = {
    varieties: [
      'Empire',
      'Fuji',
      'Gala',
    ],
    count: 3
  }
  expect(basket).toEqual({
    count: 3,
    varieties: expect.arrayContaining(['Fuji'])
  })
})
```
TIP

You can use `expect.not` with this matcher to negate the expected value.

## expect.objectContaining [​](index.md#expect-objectcontaining)

*   **Type:** `(expected: any) => any`

When used with an equality check, this asymmetric matcher will return `true` if the value has a similar shape.

ts
```
import { expect, test } from 'vitest'
test('basket has empire apples', () => {
  const basket = {
    varieties: [
      {
        name: 'Empire',
        count: 1,
      }
    ],
  }
  expect(basket).toEqual({
    varieties: [
      expect.objectContaining({ name: 'Empire' }),
    ]
  })
})
```
TIP

You can use `expect.not` with this matcher to negate the expected value.

## expect.stringContaining [​](index.md#expect-stringcontaining)

*   **Type:** `(expected: any) => any`

When used with an equality check, this asymmetric matcher will return `true` if the value is a string and contains a specified substring.

ts
```
import { expect, test } from 'vitest'
test('variety has "Emp" in its name', () => {
  const variety = {
    name: 'Empire',
    count: 1,
  }
  expect(variety).toEqual({
    name: expect.stringContaining('Emp'),
    count: 1,
  })
})
```
TIP

You can use `expect.not` with this matcher to negate the expected value.

## expect.stringMatching [​](index.md#expect-stringmatching)

*   **Type:** `(expected: any) => any`

When used with an equality check, this asymmetric matcher will return `true` if the value is a string and contains a specified substring or if the string matches a regular expression.

ts
```
import { expect, test } from 'vitest'
test('variety ends with "re"', () => {
  const variety = {
    name: 'Empire',
    count: 1,
  }
  expect(variety).toEqual({
    name: expect.stringMatching(/re$/),
    count: 1,
  })
})
```
TIP

You can use `expect.not` with this matcher to negate the expected value.

## expect.addSnapshotSerializer [​](index.md#expect-addsnapshotserializer)

*   **Type:** `(plugin: PrettyFormatPlugin) => void`

This method adds custom serializers that are called when creating a snapshot. This is an advanced feature - if you want to know more, please read a [guide on custom serializers](_guide_snapshot.md#custom-serializer).

If you are adding custom serializers, you should call this method inside [`setupFiles`](_config_.md#setupfiles). This will affect every snapshot.

TIP

If you previously used Vue CLI with Jest, you might want to install [jest-serializer-vue](https://www.npmjs.com/package/jest-serializer-vue). Otherwise, your snapshots will be wrapped in a string, which cases `"` to be escaped.

## expect.extend [​](index.md#expect-extend)

*   **Type:** `(matchers: MatchersObject) => void`

You can extend default matchers with your own. This function is used to extend the matchers object with custom matchers.

When you define matchers that way, you also create asymmetric matchers that can be used like `expect.stringContaining`.

ts
```
import { expect, test } from 'vitest'
test('custom matchers', () => {
  expect.extend({
    toBeFoo: (received, expected) => {
      if (received !== 'foo') {
        return {
          message: () => `expected ${received} to be foo`,
          pass: false,
        }
      }
    },
  })
  expect('foo').toBeFoo()
  expect({ foo: 'foo' }).toEqual({ foo: expect.toBeFoo() })
})
```
TIP

If you want your matchers to appear in every test, you should call this method inside [`setupFiles`](_config_.md#setupfiles).

This function is compatible with Jest's `expect.extend`, so any library that uses it to create custom matchers will work with Vitest.

If you are using TypeScript, since Vitest 0.31.0 you can extend default `Assertion` interface in an ambient declaration file (e.g: `vitest.d.ts`) with the code below:

ts
```
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

## expect.addEqualityTesters [​](index.md#expect-addequalitytesters)

*   **Type:** `(tester: Array<Tester>) => void`

You can use this method to define custom testers, which are methods used by matchers, to test if two objects are equal. It is compatible with Jest's `expect.addEqualityTesters`.

ts
```
import { expect, test } from 'vitest'
class AnagramComparator {
  public word: string
  constructor(word: string) {
    this.word = word
  }
  equals(other: AnagramComparator): boolean {
    const cleanStr1 = this.word.replace(/ /g, '').toLowerCase()
    const cleanStr2 = other.word.replace(/ /g, '').toLowerCase()
    const sortedStr1 = cleanStr1.split('').sort().join('')
    const sortedStr2 = cleanStr2.split('').sort().join('')
    return sortedStr1 === sortedStr2
  }
}
function isAnagramComparator(a: unknown): a is AnagramComparator {
  return a instanceof AnagramComparator
}
function areAnagramsEqual(a: unknown, b: unknown): boolean | undefined {
  const isAAnagramComparator = isAnagramComparator(a)
  const isBAnagramComparator = isAnagramComparator(b)
  if (isAAnagramComparator && isBAnagramComparator) {
    return a.equals(b)
  }
  else if (isAAnagramComparator === isBAnagramComparator) {
    return undefined
  }
  else {
    return false
  }
}
expect.addEqualityTesters([areAnagramsEqual])
test('custom equality tester', () => {
  expect(new AnagramComparator('listen')).toEqual(new AnagramComparator('silent'))
})
```

#### _api_mock.md

> Source: https://vitest.dev/api/mock
> Scraped: 4/15/2025, 1:07:45 AM

## Mock Functions [​](index.md#mock-functions)

You can create a mock function to track its execution with `vi.fn` method. If you want to track a method on an already created object, you can use `vi.spyOn` method:

js
```
import { vi } from 'vitest'
const fn = vi.fn()
fn('hello world')
fn.mock.calls[0] === ['hello world']
const market = {
  getApples: () => 100
}
const getApplesSpy = vi.spyOn(market, 'getApples')
market.getApples()
getApplesSpy.mock.calls.length === 1
```
You should use mock assertions (e.g., [`toHaveBeenCalled`](_api_expect.md#tohavebeencalled)) on [`expect`](_api_expect.md) to assert mock result. This API reference describes available properties and methods to manipulate mock behavior.

TIP

The custom function implementation in the types below is marked with a generic `<T>`.

## getMockImplementation [​](index.md#getmockimplementation)

ts
```
function getMockImplementation(): T | undefined
```
Returns current mock implementation if there is one.

If the mock was created with [`vi.fn`](_api_vi.md#vi-fn), it will use the provided method as the mock implementation.

If the mock was created with [`vi.spyOn`](_api_vi.md#vi-spyon), it will return `undefined` unless a custom implementation is provided.

## getMockName [​](index.md#getmockname)

ts
```
function getMockName(): string
```
Use it to return the name assigned to the mock with the `.mockName(name)` method. By default, it will return `vi.fn()`.

## mockClear [​](index.md#mockclear)

ts
```
function mockClear(): MockInstance<T>
```
Clears all information about every call. After calling it, all properties on `.mock` will return to their initial state. This method does not reset implementations. It is useful for cleaning up mocks between different assertions.

ts
```
const person = {
  greet: (name: string) => `Hello ${name}`,
}
const spy = vi.spyOn(person, 'greet').mockImplementation(() => 'mocked')
expect(person.greet('Alice')).toBe('mocked')
expect(spy.mock.calls).toEqual([['Alice']])
// clear call history but keep mock implementation
spy.mockClear()
expect(spy.mock.calls).toEqual([])
expect(person.greet('Bob')).toBe('mocked')
expect(spy.mock.calls).toEqual([['Bob']])
```
To automatically call this method before each test, enable the [`clearMocks`](_config_.md#clearmocks) setting in the configuration.

## mockName [​](index.md#mockname)

ts
```
function mockName(name: string): MockInstance<T>
```
Sets the internal mock name. This is useful for identifying the mock when an assertion fails.

## mockImplementation [​](index.md#mockimplementation)

ts
```
function mockImplementation(fn: T): MockInstance<T>
```
Accepts a function to be used as the mock implementation. TypeScript expects the arguments and return type to match those of the original function.

ts
```
const mockFn = vi.fn().mockImplementation((apples: number) => apples + 1)
// or: vi.fn(apples => apples + 1);
const NelliesBucket = mockFn(0)
const BobsBucket = mockFn(1)
NelliesBucket === 1 // true
BobsBucket === 2 // true
mockFn.mock.calls[0][0] === 0 // true
mockFn.mock.calls[1][0] === 1 // true
```
## mockImplementationOnce [​](index.md#mockimplementationonce)

ts
```
function mockImplementationOnce(fn: T): MockInstance<T>
```
Accepts a function to be used as the mock implementation. TypeScript expects the arguments and return type to match those of the original function. This method can be chained to produce different results for multiple function calls.

ts
```
const myMockFn = vi
  .fn()
  .mockImplementationOnce(() => true) // 1st call
  .mockImplementationOnce(() => false) // 2nd call
myMockFn() // 1st call: true
myMockFn() // 2nd call: false
```
When the mocked function runs out of implementations, it will invoke the default implementation set with `vi.fn(() => defaultValue)` or `.mockImplementation(() => defaultValue)` if they were called:

ts
```
const myMockFn = vi
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call')
// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn())
```
## withImplementation [​](index.md#withimplementation)

ts
```
function withImplementation(
  fn: T,
  cb: () => void
): MockInstance<T>
function withImplementation(
  fn: T,
  cb: () => Promise<void>
): Promise<MockInstance<T>>
```
Overrides the original mock implementation temporarily while the callback is being executed.

js
```
const myMockFn = vi.fn(() => 'original')
myMockFn.withImplementation(() => 'temp', () => {
  myMockFn() // 'temp'
})
myMockFn() // 'original'
```
Can be used with an asynchronous callback. The method has to be awaited to use the original implementation afterward.

ts
```
test('async callback', () => {
  const myMockFn = vi.fn(() => 'original')
  // We await this call since the callback is async
  await myMockFn.withImplementation(
    () => 'temp',
    async () => {
      myMockFn() // 'temp'
    },
  )
  myMockFn() // 'original'
})
```
Note that this method takes precedence over the [`mockImplementationOnce`](index.md#mockimplementationonce).

## mockRejectedValue [​](index.md#mockrejectedvalue)

ts
```
function mockRejectedValue(value: unknown): MockInstance<T>
```
Accepts an error that will be rejected when async function is called.

ts
```
const asyncMock = vi.fn().mockRejectedValue(new Error('Async error'))
await asyncMock() // throws Error<'Async error'>
```
## mockRejectedValueOnce [​](index.md#mockrejectedvalueonce)

ts
```
function mockRejectedValueOnce(value: unknown): MockInstance<T>
```
Accepts a value that will be rejected during the next function call. If chained, each consecutive call will reject the specified value.

ts
```
const asyncMock = vi
  .fn()
  .mockResolvedValueOnce('first call')
  .mockRejectedValueOnce(new Error('Async error'))
await asyncMock() // 'first call'
await asyncMock() // throws Error<'Async error'>
```
## mockReset [​](index.md#mockreset)

ts
```
function mockReset(): MockInstance<T>
```
Does what [`mockClear`](index.md#mockClear) does and resets inner implementation to the original function. This also resets all "once" implementations.

Note that resetting a mock from `vi.fn()` will set implementation to an empty function that returns `undefined`. resetting a mock from `vi.fn(impl)` will restore implementation to `impl`.

This is useful when you want to reset a mock to its original state.

ts
```
const person = {
  greet: (name: string) => `Hello ${name}`,
}
const spy = vi.spyOn(person, 'greet').mockImplementation(() => 'mocked')
expect(person.greet('Alice')).toBe('mocked')
expect(spy.mock.calls).toEqual([['Alice']])
// clear call history and reset implementation, but method is still spied
spy.mockReset()
expect(spy.mock.calls).toEqual([])
expect(person.greet).toBe(spy)
expect(person.greet('Bob')).toBe('Hello Bob')
expect(spy.mock.calls).toEqual([['Bob']])
```
To automatically call this method before each test, enable the [`mockReset`](_config_.md#mockreset) setting in the configuration.

## mockRestore [​](index.md#mockrestore)

ts
```
function mockRestore(): MockInstance<T>
```
Does what [`mockReset`](index.md#mockReset) does and restores original descriptors of spied-on objects.

Note that restoring a mock from `vi.fn()` will set implementation to an empty function that returns `undefined`. Restoring a mock from `vi.fn(impl)` will restore implementation to `impl`.

ts
```
const person = {
  greet: (name: string) => `Hello ${name}`,
}
const spy = vi.spyOn(person, 'greet').mockImplementation(() => 'mocked')
expect(person.greet('Alice')).toBe('mocked')
expect(spy.mock.calls).toEqual([['Alice']])
// clear call history and restore spied object method
spy.mockRestore()
expect(spy.mock.calls).toEqual([])
expect(person.greet).not.toBe(spy)
expect(person.greet('Bob')).toBe('Hello Bob')
expect(spy.mock.calls).toEqual([])
```
To automatically call this method before each test, enable the [`restoreMocks`](_config_.md#restoremocks) setting in the configuration.

## mockResolvedValue [​](index.md#mockresolvedvalue)

ts
```
function mockResolvedValue(value: Awaited<ReturnType<T>>): MockInstance<T>
```
Accepts a value that will be resolved when the async function is called. TypeScript will only accept values that match the return type of the original function.

ts
```
const asyncMock = vi.fn().mockResolvedValue(42)
await asyncMock() // 42
```
## mockResolvedValueOnce [​](index.md#mockresolvedvalueonce)

ts
```
function mockResolvedValueOnce(value: Awaited<ReturnType<T>>): MockInstance<T>
```
Accepts a value that will be resolved during the next function call. TypeScript will only accept values that match the return type of the original function. If chained, each consecutive call will resolve the specified value.

ts
```
const asyncMock = vi
  .fn()
  .mockResolvedValue('default')
  .mockResolvedValueOnce('first call')
  .mockResolvedValueOnce('second call')
await asyncMock() // first call
await asyncMock() // second call
await asyncMock() // default
await asyncMock() // default
```
## mockReturnThis [​](index.md#mockreturnthis)

ts
```
function mockReturnThis(): MockInstance<T>
```
Use this if you need to return the `this` context from the method without invoking the actual implementation. This is a shorthand for:

ts
```
spy.mockImplementation(function () {
  return this
})
```
## mockReturnValue [​](index.md#mockreturnvalue)

ts
```
function mockReturnValue(value: ReturnType<T>): MockInstance<T>
```
Accepts a value that will be returned whenever the mock function is called. TypeScript will only accept values that match the return type of the original function.

ts
```
const mock = vi.fn()
mock.mockReturnValue(42)
mock() // 42
mock.mockReturnValue(43)
mock() // 43
```
## mockReturnValueOnce [​](index.md#mockreturnvalueonce)

ts
```
function mockReturnValueOnce(value: ReturnType<T>): MockInstance<T>
```
Accepts a value that will be returned whenever the mock function is called. TypeScript will only accept values that match the return type of the original function.

When the mocked function runs out of implementations, it will invoke the default implementation set with `vi.fn(() => defaultValue)` or `.mockImplementation(() => defaultValue)` if they were called:

ts
```
const myMockFn = vi
  .fn()
  .mockReturnValue('default')
  .mockReturnValueOnce('first call')
  .mockReturnValueOnce('second call')
// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn())
```
## mock.calls [​](index.md#mock-calls)

ts
```
const calls: Parameters<T>[]
```
This is an array containing all arguments for each call. One item of the array is the arguments of that call.

js
```
const fn = vi.fn()
fn('arg1', 'arg2')
fn('arg3')
fn.mock.calls === [
  ['arg1', 'arg2'], // first call
  ['arg3'], // second call
]
```
## mock.lastCall [​](index.md#mock-lastcall)

ts
```
const lastCall: Parameters<T> | undefined
```
This contains the arguments of the last call. If mock wasn't called, it will return `undefined`.

## mock.results [​](index.md#mock-results)

ts
```
interface MockResultReturn<T> {
  type: 'return'
  /** The value that was returned from the function.
   * If function returned a Promise, then this will be a resolved value.
   */
  value: T
}
interface MockResultIncomplete {
  type: 'incomplete'
  value: undefined
}
interface MockResultThrow {
  type: 'throw'
  /** An error that was thrown during function execution.
   */
  value: any
}
type MockResult<T> =
  | MockResultReturn<T>
  | MockResultThrow
  | MockResultIncomplete
const results: MockResult<ReturnType<T>>[]
```
This is an array containing all values that were `returned` from the function. One item of the array is an object with properties `type` and `value`. Available types are:

*   `'return'` - function returned without throwing.
*   `'throw'` - function threw a value.

The `value` property contains the returned value or thrown error. If the function returned a `Promise`, then `result` will always be `'return'` even if the promise was rejected.

js
```
const fn = vi.fn()
  .mockReturnValueOnce('result')
  .mockImplementationOnce(() => { throw new Error('thrown error') })
const result = fn() // returned 'result'
try {
  fn() // threw Error
}
catch {}
fn.mock.results === [
  // first result
  {
    type: 'return',
    value: 'result',
  },
  // last result
  {
    type: 'throw',
    value: Error,
  },
]
```
## mock.settledResults [​](index.md#mock-settledresults)

ts
```
interface MockSettledResultFulfilled<T> {
  type: 'fulfilled'
  value: T
}
interface MockSettledResultRejected {
  type: 'rejected'
  value: any
}
export type MockSettledResult<T> =
  | MockSettledResultFulfilled<T>
  | MockSettledResultRejected
const settledResults: MockSettledResult<Awaited<ReturnType<T>>>[]
```
An array containing all values that were `resolved` or `rejected` from the function.

This array will be empty if the function was never resolved or rejected.

js
```
const fn = vi.fn().mockResolvedValueOnce('result')
const result = fn()
fn.mock.settledResults === []
await result
fn.mock.settledResults === [
  {
    type: 'fulfilled',
    value: 'result',
  },
]
```
## mock.invocationCallOrder [​](index.md#mock-invocationcallorder)

ts
```
const invocationCallOrder: number[]
```
This property returns the order of the mock function's execution. It is an array of numbers that are shared between all defined mocks.

js
```
const fn1 = vi.fn()
const fn2 = vi.fn()
fn1()
fn2()
fn1()
fn1.mock.invocationCallOrder === [1, 3]
fn2.mock.invocationCallOrder === [2]
```
## mock.contexts [​](index.md#mock-contexts)

ts
```
const contexts: ThisParameterType<T>[]
```
This property is an array of `this` values used during each call to the mock function.

js
```
const fn = vi.fn()
const context = {}
fn.apply(context)
fn.call(context)
fn.mock.contexts[0] === context
fn.mock.contexts[1] === context
```
## mock.instances [​](index.md#mock-instances)

ts
```
const instances: ReturnType<T>[]
```
This property is an array containing all instances that were created when the mock was called with the `new` keyword. Note that this is an actual context (`this`) of the function, not a return value.

WARNING

If mock was instantiated with `new MyClass()`, then `mock.instances` will be an array with one value:

js
```
const MyClass = vi.fn()
const a = new MyClass()
MyClass.mock.instances[0] === a
```
If you return a value from constructor, it will not be in `instances` array, but instead inside `results`:

js
```
const Spy = vi.fn(() => ({ method: vi.fn() }))
const a = new Spy()
Spy.mock.instances[0] !== a
Spy.mock.results[0] === a
```

#### _api_vi.md

> Source: https://vitest.dev/api/vi
> Scraped: 4/15/2025, 1:07:45 AM

## Vi [​](index.md#vi)

Vitest provides utility functions to help you out through its `vi` helper. You can access it globally (when [globals configuration](_config_.md#globals) is enabled), or import it from `vitest` directly:

js
```
import { vi } from 'vitest'
```
## Mock Modules [​](index.md#mock-modules)

This section describes the API that you can use when [mocking a module](_guide_mocking.md#modules). Beware that Vitest doesn't support mocking modules imported using `require()`.

### vi.mock [​](index.md#vi-mock)

*   **Type**: `(path: string, factory?: MockOptions | ((importOriginal: () => unknown) => unknown)) => void`
*   **Type**: `<T>(path: Promise<T>, factory?: MockOptions | ((importOriginal: () => T) => T | Promise<T>)) => void`

Substitutes all imported modules from provided `path` with another module. You can use configured Vite aliases inside a path. The call to `vi.mock` is hoisted, so it doesn't matter where you call it. It will always be executed before all imports. If you need to reference some variables outside of its scope, you can define them inside [`vi.hoisted`](index.md#vi-hoisted) and reference them inside `vi.mock`.

WARNING

`vi.mock` works only for modules that were imported with the `import` keyword. It doesn't work with `require`.

In order to hoist `vi.mock`, Vitest statically analyzes your files. It indicates that `vi` that was not directly imported from the `vitest` package (for example, from some utility file) cannot be used. Use `vi.mock` with `vi` imported from `vitest`, or enable [`globals`](_config_.md#globals) config option.

Vitest will not mock modules that were imported inside a [setup file](_config_.md#setupfiles) because they are cached by the time a test file is running. You can call [`vi.resetModules()`](index.md#vi-resetmodules) inside [`vi.hoisted`](index.md#vi-hoisted) to clear all module caches before running a test file.

If the `factory` function is defined, all imports will return its result. Vitest calls factory only once and caches results for all subsequent imports until [`vi.unmock`](index.md#vi-unmock) or [`vi.doUnmock`](index.md#vi-dounmock) is called.

Unlike in `jest`, the factory can be asynchronous. You can use [`vi.importActual`](index.md#vi-importactual) or a helper with the factory passed in as the first argument, and get the original module inside.

You can also provide an object with a `spy` property instead of a factory function. If `spy` is `true`, then Vitest will automock the module as usual, but it won't override the implementation of exports. This is useful if you just want to assert that the exported method was called correctly by another method.

ts
```
import { calculator } from './src/calculator.ts'
vi.mock('./src/calculator.ts', { spy: true })
// calls the original implementation,
// but allows asserting the behaviour later
const result = calculator(1, 2)
expect(result).toBe(3)
expect(calculator).toHaveBeenCalledWith(1, 2)
expect(calculator).toHaveReturned(3)
```
Vitest also supports a module promise instead of a string in the `vi.mock` and `vi.doMock` methods for better IDE support. When the file is moved, the path will be updated, and `importOriginal` inherits the type automatically. Using this signature will also enforce factory return type to be compatible with the original module (keeping exports optional).

ts
```
.(import('./path/to/module.js'), async () => {
  const  = await () // type is inferred
  return {
    ...,
    // replace some exports
    : .(),
  }
})
```
Under the hood, Vitest still operates on a string and not a module object.

If you are using TypeScript with `paths` aliases configured in `tsconfig.json` however, the compiler won't be able to correctly resolve import types. In order to make it work, make sure to replace all aliased imports, with their corresponding relative paths. Eg. use `import('./path/to/module.js')` instead of `import('@/module')`.

WARNING

`vi.mock` is hoisted (in other words, _moved_) to **top of the file**. It means that whenever you write it (be it inside `beforeEach` or `test`), it will actually be called before that.

This also means that you cannot use any variables inside the factory that are defined outside the factory.

If you need to use variables inside the factory, try [`vi.doMock`](index.md#vi-domock). It works the same way but isn't hoisted. Beware that it only mocks subsequent imports.

You can also reference variables defined by `vi.hoisted` method if it was declared before `vi.mock`:

ts
```
import { namedExport } from './path/to/module.js'
const mocks = vi.hoisted(() => {
  return {
    namedExport: vi.fn(),
  }
})
vi.mock('./path/to/module.js', () => {
  return {
    namedExport: mocks.namedExport,
  }
})
vi.mocked(namedExport).mockReturnValue(100)
expect(namedExport()).toBe(100)
expect(namedExport).toBe(mocks.namedExport)
```
WARNING

If you are mocking a module with default export, you will need to provide a `default` key within the returned factory function object. This is an ES module-specific caveat; therefore, `jest` documentation may differ as `jest` uses CommonJS modules. For example,

ts
```
vi.mock('./path/to/module.js', () => {
  return {
    default: { myDefaultKey: vi.fn() },
    namedExport: vi.fn(),
    // etc...
  }
})
```
If there is a `__mocks__` folder alongside a file that you are mocking, and the factory is not provided, Vitest will try to find a file with the same name in the `__mocks__` subfolder and use it as an actual module. If you are mocking a dependency, Vitest will try to find a `__mocks__` folder in the [root](_config_.md#root) of the project (default is `process.cwd()`). You can tell Vitest where the dependencies are located through the [`deps.moduleDirectories`](_config_.md#deps-moduledirectories) config option.

For example, you have this file structure:
```
- __mocks__
  - axios.js
- src
  __mocks__
    - increment.js
  - increment.js
- tests
  - increment.test.js
```
If you call `vi.mock` in a test file without a factory or options provided, it will find a file in the `__mocks__` folder to use as a module:

increment.test.js

ts
```
import { vi } from 'vitest'
// axios is a default export from `__mocks__/axios.js`
import axios from 'axios'
// increment is a named export from `src/__mocks__/increment.js`
import { increment } from '../increment.js'
vi.mock('axios')
vi.mock('../increment.js')
axios.get(`/apples/${increment(1)}`)
```
WARNING

Beware that if you don't call `vi.mock`, modules **are not** mocked automatically. To replicate Jest's automocking behaviour, you can call `vi.mock` for each required module inside [`setupFiles`](_config_.md#setupfiles).

If there is no `__mocks__` folder or a factory provided, Vitest will import the original module and auto-mock all its exports. For the rules applied, see [algorithm](_guide_mocking.md#automocking-algorithm).

### vi.doMock [​](index.md#vi-domock)

*   **Type**: `(path: string, factory?: MockOptions | ((importOriginal: () => unknown) => unknown)) => void`
*   **Type**: `<T>(path: Promise<T>, factory?: MockOptions | ((importOriginal: () => T) => T | Promise<T>)) => void`

The same as [`vi.mock`](index.md#vi-mock), but it's not hoisted to the top of the file, so you can reference variables in the global file scope. The next [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) of the module will be mocked.

WARNING

This will not mock modules that were imported before this was called. Don't forget that all static imports in ESM are always [hoisted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#hoisting), so putting this before static import will not force it to be called before the import:

ts
```
vi.doMock('./increment.js') // this will be called _after_ the import statement
import { increment } from './increment.js'
```
increment.js

ts
```
export function increment(number) {
  return number + 1
}
```
increment.test.js

ts
```
import { beforeEach, test } from 'vitest'
import { increment } from './increment.js'
// the module is not mocked, because vi.doMock is not called yet
increment(1) === 2
let mockedIncrement = 100
beforeEach(() => {
  // you can access variables inside a factory
  vi.doMock('./increment.js', () => ({ increment: () => ++mockedIncrement }))
})
test('importing the next module imports mocked one', async () => {
  // original import WAS NOT MOCKED, because vi.doMock is evaluated AFTER imports
  expect(increment(1)).toBe(2)
  const { increment: mockedIncrement } = await import('./increment.js')
  // new dynamic import returns mocked module
  expect(mockedIncrement(1)).toBe(101)
  expect(mockedIncrement(1)).toBe(102)
  expect(mockedIncrement(1)).toBe(103)
})
```
### vi.mocked [​](index.md#vi-mocked)

*   **Type**: `<T>(obj: T, deep?: boolean) => MaybeMockedDeep<T>`
*   **Type**: `<T>(obj: T, options?: { partial?: boolean; deep?: boolean }) => MaybePartiallyMockedDeep<T>`

Type helper for TypeScript. Just returns the object that was passed.

When `partial` is `true` it will expect a `Partial<T>` as a return value. By default, this will only make TypeScript believe that the first level values are mocked. You can pass down `{ deep: true }` as a second argument to tell TypeScript that the whole object is mocked, if it actually is.

example.ts

ts
```
export function add(x: number, y: number): number {
  return x + y
}
export function fetchSomething(): Promise<Response> {
  return fetch('https://vitest.dev/')
}
```
example.test.ts

ts
```
import * as example from './example'
vi.mock('./example')
test('1 + 1 equals 10', async () => {
  vi.mocked(example.add).mockReturnValue(10)
  expect(example.add(1, 1)).toBe(10)
})
test('mock return value with only partially correct typing', async () => {
  vi.mocked(example.fetchSomething).mockResolvedValue(new Response('hello'))
  vi.mocked(example.fetchSomething, { partial: true }).mockResolvedValue({ ok: false })
  // vi.mocked(example.someFn).mockResolvedValue({ ok: false }) // this is a type error
})
```
### vi.importActual [​](index.md#vi-importactual)

*   **Type**: `<T>(path: string) => Promise<T>`

Imports module, bypassing all checks if it should be mocked. Can be useful if you want to mock module partially.

ts
```
vi.mock('./example.js', async () => {
  const originalModule = await vi.importActual('./example.js')
  return { ...originalModule, get: vi.fn() }
})
```
### vi.importMock [​](index.md#vi-importmock)

*   **Type**: `<T>(path: string) => Promise<MaybeMockedDeep<T>>`

Imports a module with all of its properties (including nested properties) mocked. Follows the same rules that [`vi.mock`](index.md#vi-mock) does. For the rules applied, see [algorithm](_guide_mocking.md#automocking-algorithm).

### vi.unmock [​](index.md#vi-unmock)

*   **Type**: `(path: string | Promise<Module>) => void`

Removes module from the mocked registry. All calls to import will return the original module even if it was mocked before. This call is hoisted to the top of the file, so it will only unmock modules that were defined in `setupFiles`, for example.

### vi.doUnmock [​](index.md#vi-dounmock)

*   **Type**: `(path: string | Promise<Module>) => void`

The same as [`vi.unmock`](index.md#vi-unmock), but is not hoisted to the top of the file. The next import of the module will import the original module instead of the mock. This will not unmock previously imported modules.

increment.js

ts
```
export function increment(number) {
  return number + 1
}
```
increment.test.js

ts
```
import { increment } from './increment.js'
// increment is already mocked, because vi.mock is hoisted
increment(1) === 100
// this is hoisted, and factory is called before the import on line 1
vi.mock('./increment.js', () => ({ increment: () => 100 }))
// all calls are mocked, and `increment` always returns 100
increment(1) === 100
increment(30) === 100
// this is not hoisted, so other import will return unmocked module
vi.doUnmock('./increment.js')
// this STILL returns 100, because `vi.doUnmock` doesn't reevaluate a module
increment(1) === 100
increment(30) === 100
// the next import is unmocked, now `increment` is the original function that returns count + 1
const { increment: unmockedIncrement } = await import('./increment.js')
unmockedIncrement(1) === 2
unmockedIncrement(30) === 31
```
### vi.resetModules [​](index.md#vi-resetmodules)

*   **Type**: `() => Vitest`

Resets modules registry by clearing the cache of all modules. This allows modules to be reevaluated when reimported. Top-level imports cannot be re-evaluated. Might be useful to isolate modules where local state conflicts between tests.

ts
```
import { vi } from 'vitest'
import { data } from './data.js' // Will not get reevaluated beforeEach test
beforeEach(() => {
  vi.resetModules()
})
test('change state', async () => {
  const mod = await import('./some/path.js') // Will get reevaluated
  mod.changeLocalState('new value')
  expect(mod.getLocalState()).toBe('new value')
})
test('module has old state', async () => {
  const mod = await import('./some/path.js') // Will get reevaluated
  expect(mod.getLocalState()).toBe('old value')
})
```
### vi.dynamicImportSettled [​](index.md#vi-dynamicimportsettled)

Wait for all imports to load. Useful, if you have a synchronous call that starts importing a module that you cannot wait otherwise.

ts
```
import { expect, test } from 'vitest'
// cannot track import because Promise is not returned
function renderComponent() {
  import('./component.js').then(({ render }) => {
    render()
  })
}
test('operations are resolved', async () => {
  renderComponent()
  await vi.dynamicImportSettled()
  expect(document.querySelector('.component')).not.toBeNull()
})
```
TIP

If during a dynamic import another dynamic import is initiated, this method will wait until all of them are resolved.

This method will also wait for the next `setTimeout` tick after the import is resolved so all synchronous operations should be completed by the time it's resolved.

## Mocking Functions and Objects [​](index.md#mocking-functions-and-objects)

This section describes how to work with [method mocks](_api_mock.md) and replace environmental and global variables.

### vi.fn [​](index.md#vi-fn)

*   **Type:** `(fn?: Function) => Mock`

Creates a spy on a function, though can be initiated without one. Every time a function is invoked, it stores its call arguments, returns, and instances. Also, you can manipulate its behavior with [methods](_api_mock.md). If no function is given, mock will return `undefined`, when invoked.

ts
```
const getApples = vi.fn(() => 0)
getApples()
expect(getApples).toHaveBeenCalled()
expect(getApples).toHaveReturnedWith(0)
getApples.mockReturnValueOnce(5)
const res = getApples()
expect(res).toBe(5)
expect(getApples).toHaveNthReturnedWith(2, 5)
```
### vi.isMockFunction [​](index.md#vi-ismockfunction)

*   **Type:** `(fn: Function) => boolean`

Checks that a given parameter is a mock function. If you are using TypeScript, it will also narrow down its type.

### vi.clearAllMocks [​](index.md#vi-clearallmocks)

Calls [`.mockClear()`](_api_mock.md#mockclear) on all spies. This will clear mock history without affecting mock implementations.

### vi.resetAllMocks [​](index.md#vi-resetallmocks)

Calls [`.mockReset()`](_api_mock.md#mockreset) on all spies. This will clear mock history and reset each mock's implementation to its original.

### vi.restoreAllMocks [​](index.md#vi-restoreallmocks)

Calls [`.mockRestore()`](_api_mock.md#mockrestore) on all spies. This will clear mock history, restore all original mock implementations, and restore original descriptors of spied-on objects.

### vi.spyOn [​](index.md#vi-spyon)

*   **Type:** `<T, K extends keyof T>(object: T, method: K, accessType?: 'get' | 'set') => MockInstance`

Creates a spy on a method or getter/setter of an object similar to [`vi.fn()`](index.md#vi-fn). It returns a [mock function](_api_mock.md).

ts
```
let apples = 0
const cart = {
  getApples: () => 42,
}
const spy = vi.spyOn(cart, 'getApples').mockImplementation(() => apples)
apples = 1
expect(cart.getApples()).toBe(1)
expect(spy).toHaveBeenCalled()
expect(spy).toHaveReturnedWith(1)
```
TIP

You can call [`vi.restoreAllMocks`](index.md#vi-restoreallmocks) inside [`afterEach`](_api_.md#aftereach) (or enable [`test.restoreMocks`](_config_.md#restoreMocks)) to restore all methods to their original implementations. This will restore the original [object descriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), so you won't be able to change method's implementation:

ts
```
const cart = {
  getApples: () => 42,
}
const spy = vi.spyOn(cart, 'getApples').mockReturnValue(10)
console.log(cart.getApples()) // 10
vi.restoreAllMocks()
console.log(cart.getApples()) // 42
spy.mockReturnValue(10)
console.log(cart.getApples()) // still 42!
```
TIP

It is not possible to spy on exported methods in [Browser Mode](_guide_browser_.md). Instead, you can spy on every exported method by calling `vi.mock("./file-path.js", { spy: true })`. This will mock every export but keep its implementation intact, allowing you to assert if the method was called correctly.

ts
```
import { calculator } from './src/calculator.ts'
vi.mock('./src/calculator.ts', { spy: true })
calculator(1, 2)
expect(calculator).toHaveBeenCalledWith(1, 2)
expect(calculator).toHaveReturned(3)
```
And while it is possible to spy on exports in `jsdom` or other Node.js environments, this might change in the future.

### vi.stubEnv [​](index.md#vi-stubenv)

*   **Type:** `<T extends string>(name: T, value: T extends "PROD" | "DEV" | "SSR" ? boolean : string | undefined) => Vitest`

Changes the value of environmental variable on `process.env` and `import.meta.env`. You can restore its value by calling `vi.unstubAllEnvs`.

ts
```
import { vi } from 'vitest'
// `process.env.NODE_ENV` and `import.meta.env.NODE_ENV`
// are "development" before calling "vi.stubEnv"
vi.stubEnv('NODE_ENV', 'production')
process.env.NODE_ENV === 'production'
import.meta.env.NODE_ENV === 'production'
vi.stubEnv('NODE_ENV', undefined)
process.env.NODE_ENV === undefined
import.meta.env.NODE_ENV === undefined
// doesn't change other envs
import.meta.env.MODE === 'development'
```
TIP

You can also change the value by simply assigning it, but you won't be able to use `vi.unstubAllEnvs` to restore previous value:

ts
```
import.meta.env.MODE = 'test'
```
### vi.unstubAllEnvs [​](index.md#vi-unstuballenvs)

*   **Type:** `() => Vitest`

Restores all `import.meta.env` and `process.env` values that were changed with `vi.stubEnv`. When it's called for the first time, Vitest remembers the original value and will store it, until `unstubAllEnvs` is called again.

ts
```
import { vi } from 'vitest'
// `process.env.NODE_ENV` and `import.meta.env.NODE_ENV`
// are "development" before calling stubEnv
vi.stubEnv('NODE_ENV', 'production')
process.env.NODE_ENV === 'production'
import.meta.env.NODE_ENV === 'production'
vi.stubEnv('NODE_ENV', 'staging')
process.env.NODE_ENV === 'staging'
import.meta.env.NODE_ENV === 'staging'
vi.unstubAllEnvs()
// restores to the value that were stored before the first "stubEnv" call
process.env.NODE_ENV === 'development'
import.meta.env.NODE_ENV === 'development'
```
### vi.stubGlobal [​](index.md#vi-stubglobal)

*   **Type:** `(name: string | number | symbol, value: unknown) => Vitest`

Changes the value of global variable. You can restore its original value by calling `vi.unstubAllGlobals`.

ts
```
import { vi } from 'vitest'
// `innerWidth` is "0" before calling stubGlobal
vi.stubGlobal('innerWidth', 100)
innerWidth === 100
globalThis.innerWidth === 100
// if you are using jsdom or happy-dom
window.innerWidth === 100
```
TIP

You can also change the value by simply assigning it to `globalThis` or `window` (if you are using `jsdom` or `happy-dom` environment), but you won't be able to use `vi.unstubAllGlobals` to restore original value:

ts
```
globalThis.innerWidth = 100
// if you are using jsdom or happy-dom
window.innerWidth = 100
```
### vi.unstubAllGlobals [​](index.md#vi-unstuballglobals)

*   **Type:** `() => Vitest`

Restores all global values on `globalThis`/`global` (and `window`/`top`/`self`/`parent`, if you are using `jsdom` or `happy-dom` environment) that were changed with `vi.stubGlobal`. When it's called for the first time, Vitest remembers the original value and will store it, until `unstubAllGlobals` is called again.

ts
```
import { vi } from 'vitest'
const Mock = vi.fn()
// IntersectionObserver is "undefined" before calling "stubGlobal"
vi.stubGlobal('IntersectionObserver', Mock)
IntersectionObserver === Mock
global.IntersectionObserver === Mock
globalThis.IntersectionObserver === Mock
// if you are using jsdom or happy-dom
window.IntersectionObserver === Mock
vi.unstubAllGlobals()
globalThis.IntersectionObserver === undefined
'IntersectionObserver' in globalThis === false
// throws ReferenceError, because it's not defined
IntersectionObserver === undefined
```
## Fake Timers [​](index.md#fake-timers)

This sections describes how to work with [fake timers](_guide_mocking.md#timers).

### vi.advanceTimersByTime [​](index.md#vi-advancetimersbytime)

*   **Type:** `(ms: number) => Vitest`

This method will invoke every initiated timer until the specified number of milliseconds is passed or the queue is empty - whatever comes first.

ts
```
let i = 0
setInterval(() => console.log(++i), 50)
vi.advanceTimersByTime(150)
// log: 1
// log: 2
// log: 3
```
### vi.advanceTimersByTimeAsync [​](index.md#vi-advancetimersbytimeasync)

*   **Type:** `(ms: number) => Promise<Vitest>`

This method will invoke every initiated timer until the specified number of milliseconds is passed or the queue is empty - whatever comes first. This will include asynchronously set timers.

ts
```
let i = 0
setInterval(() => Promise.resolve().then(() => console.log(++i)), 50)
await vi.advanceTimersByTimeAsync(150)
// log: 1
// log: 2
// log: 3
```
### vi.advanceTimersToNextTimer [​](index.md#vi-advancetimerstonexttimer)

*   **Type:** `() => Vitest`

Will call next available timer. Useful to make assertions between each timer call. You can chain call it to manage timers by yourself.

ts
```
let i = 0
setInterval(() => console.log(++i), 50)
vi.advanceTimersToNextTimer() // log: 1
  .advanceTimersToNextTimer() // log: 2
  .advanceTimersToNextTimer() // log: 3
```
### vi.advanceTimersToNextTimerAsync [​](index.md#vi-advancetimerstonexttimerasync)

*   **Type:** `() => Promise<Vitest>`

Will call next available timer and wait until it's resolved if it was set asynchronously. Useful to make assertions between each timer call.

ts
```
let i = 0
setInterval(() => Promise.resolve().then(() => console.log(++i)), 50)
await vi.advanceTimersToNextTimerAsync() // log: 1
expect(console.log).toHaveBeenCalledWith(1)
await vi.advanceTimersToNextTimerAsync() // log: 2
await vi.advanceTimersToNextTimerAsync() // log: 3
```
### vi.advanceTimersToNextFrame 2.1.0+ [​](index.md#vi-advancetimerstonextframe)

*   **Type:** `() => Vitest`

Similar to [`vi.advanceTimersByTime`](_api_vi.md#vi-advancetimersbytime), but will advance timers by the milliseconds needed to execute callbacks currently scheduled with `requestAnimationFrame`.

ts
```
let frameRendered = false
requestAnimationFrame(() => {
  frameRendered = true
})
vi.advanceTimersToNextFrame()
expect(frameRendered).toBe(true)
```
### vi.getTimerCount [​](index.md#vi-gettimercount)

*   **Type:** `() => number`

Get the number of waiting timers.

### vi.clearAllTimers [​](index.md#vi-clearalltimers)

Removes all timers that are scheduled to run. These timers will never run in the future.

### vi.getMockedSystemTime [​](index.md#vi-getmockedsystemtime)

*   **Type**: `() => Date | null`

Returns mocked current date. If date is not mocked the method will return `null`.

### vi.getRealSystemTime [​](index.md#vi-getrealsystemtime)

*   **Type**: `() => number`

When using `vi.useFakeTimers`, `Date.now` calls are mocked. If you need to get real time in milliseconds, you can call this function.

### vi.runAllTicks [​](index.md#vi-runallticks)

*   **Type:** `() => Vitest`

Calls every microtask that was queued by `process.nextTick`. This will also run all microtasks scheduled by themselves.

### vi.runAllTimers [​](index.md#vi-runalltimers)

*   **Type:** `() => Vitest`

This method will invoke every initiated timer until the timer queue is empty. It means that every timer called during `runAllTimers` will be fired. If you have an infinite interval, it will throw after 10 000 tries (can be configured with [`fakeTimers.loopLimit`](_config_.md#faketimers-looplimit)).

ts
```
let i = 0
setTimeout(() => console.log(++i))
const interval = setInterval(() => {
  console.log(++i)
  if (i === 3) {
    clearInterval(interval)
  }
}, 50)
vi.runAllTimers()
// log: 1
// log: 2
// log: 3
```
### vi.runAllTimersAsync [​](index.md#vi-runalltimersasync)

*   **Type:** `() => Promise<Vitest>`

This method will asynchronously invoke every initiated timer until the timer queue is empty. It means that every timer called during `runAllTimersAsync` will be fired even asynchronous timers. If you have an infinite interval, it will throw after 10 000 tries (can be configured with [`fakeTimers.loopLimit`](_config_.md#faketimers-looplimit)).

ts
```
setTimeout(async () => {
  console.log(await Promise.resolve('result'))
}, 100)
await vi.runAllTimersAsync()
// log: result
```
### vi.runOnlyPendingTimers [​](index.md#vi-runonlypendingtimers)

*   **Type:** `() => Vitest`

This method will call every timer that was initiated after [`vi.useFakeTimers`](index.md#vi-usefaketimers) call. It will not fire any timer that was initiated during its call.

ts
```
let i = 0
setInterval(() => console.log(++i), 50)
vi.runOnlyPendingTimers()
// log: 1
```
### vi.runOnlyPendingTimersAsync [​](index.md#vi-runonlypendingtimersasync)

*   **Type:** `() => Promise<Vitest>`

This method will asynchronously call every timer that was initiated after [`vi.useFakeTimers`](index.md#vi-usefaketimers) call, even asynchronous ones. It will not fire any timer that was initiated during its call.

ts
```
setTimeout(() => {
  console.log(1)
}, 100)
setTimeout(() => {
  Promise.resolve().then(() => {
    console.log(2)
    setInterval(() => {
      console.log(3)
    }, 40)
  })
}, 10)
await vi.runOnlyPendingTimersAsync()
// log: 2
// log: 3
// log: 3
// log: 1
```
### vi.setSystemTime [​](index.md#vi-setsystemtime)

*   **Type**: `(date: string | number | Date) => void`

If fake timers are enabled, this method simulates a user changing the system clock (will affect date related API like `hrtime`, `performance.now` or `new Date()`) - however, it will not fire any timers. If fake timers are not enabled, this method will only mock `Date.*` calls.

Useful if you need to test anything that depends on the current date - for example [Luxon](https://github.com/moment/luxon/) calls inside your code.

Accepts the same string and number arguments as the `Date`.

ts
```
const date = new Date(1998, 11, 19)
vi.useFakeTimers()
vi.setSystemTime(date)
expect(Date.now()).toBe(date.valueOf())
vi.useRealTimers()
```
### vi.useFakeTimers [​](index.md#vi-usefaketimers)

*   **Type:** `(config?: FakeTimerInstallOpts) => Vitest`

To enable mocking timers, you need to call this method. It will wrap all further calls to timers (such as `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`, `setImmediate`, `clearImmediate`, and `Date`) until [`vi.useRealTimers()`](index.md#vi-userealtimers) is called.

Mocking `nextTick` is not supported when running Vitest inside `node:child_process` by using `--pool=forks`. NodeJS uses `process.nextTick` internally in `node:child_process` and hangs when it is mocked. Mocking `nextTick` is supported when running Vitest with `--pool=threads`.

The implementation is based internally on [`@sinonjs/fake-timers`](https://github.com/sinonjs/fake-timers).

TIP

`vi.useFakeTimers()` does not automatically mock `process.nextTick` and `queueMicrotask`. But you can enable it by specifying the option in `toFake` argument: `vi.useFakeTimers({ toFake: ['nextTick', 'queueMicrotask'] })`.

### vi.isFakeTimers [​](index.md#vi-isfaketimers)

*   **Type:** `() => boolean`

Returns `true` if fake timers are enabled.

### vi.useRealTimers [​](index.md#vi-userealtimers)

*   **Type:** `() => Vitest`

When timers are run out, you may call this method to return mocked timers to its original implementations. All timers that were scheduled before will be discarded.

## Miscellaneous [​](index.md#miscellaneous)

A set of useful helper functions that Vitest provides.

### vi.waitFor [​](index.md#vi-waitfor)

*   **Type:** `<T>(callback: WaitForCallback<T>, options?: number | WaitForOptions) => Promise<T>`

Wait for the callback to execute successfully. If the callback throws an error or returns a rejected promise it will continue to wait until it succeeds or times out.

If options is set to a number, the effect is equivalent to setting `{ timeout: options }`.

This is very useful when you need to wait for some asynchronous action to complete, for example, when you start a server and need to wait for it to start.

ts
```
import { expect, test, vi } from 'vitest'
import { createServer } from './server.js'
test('Server started successfully', async () => {
  const server = createServer()
  await vi.waitFor(
    () => {
      if (!server.isReady) {
        throw new Error('Server not started')
      }
      console.log('Server started')
    },
    {
      timeout: 500, // default is 1000
      interval: 20, // default is 50
    }
  )
  expect(server.isReady).toBe(true)
})
```
It also works for asynchronous callbacks

ts
```
// @vitest-environment jsdom
import { expect, test, vi } from 'vitest'
import { getDOMElementAsync, populateDOMAsync } from './dom.js'
test('Element exists in a DOM', async () => {
  // start populating DOM
  populateDOMAsync()
  const element = await vi.waitFor(async () => {
    // try to get the element until it exists
    const element = await getDOMElementAsync() as HTMLElement | null
    expect(element).toBeTruthy()
    expect(element.dataset.initialized).toBeTruthy()
    return element
  }, {
    timeout: 500, // default is 1000
    interval: 20, // default is 50
  })
  expect(element).toBeInstanceOf(HTMLElement)
})
```
If `vi.useFakeTimers` is used, `vi.waitFor` automatically calls `vi.advanceTimersByTime(interval)` in every check callback.

### vi.waitUntil [​](index.md#vi-waituntil)

*   **Type:** `<T>(callback: WaitUntilCallback<T>, options?: number | WaitUntilOptions) => Promise<T>`

This is similar to `vi.waitFor`, but if the callback throws any errors, execution is immediately interrupted and an error message is received. If the callback returns falsy value, the next check will continue until truthy value is returned. This is useful when you need to wait for something to exist before taking the next step.

Look at the example below. We can use `vi.waitUntil` to wait for the element to appear on the page, and then we can do something with the element.

ts
```
import { expect, test, vi } from 'vitest'
test('Element render correctly', async () => {
  const element = await vi.waitUntil(
    () => document.querySelector('.element'),
    {
      timeout: 500, // default is 1000
      interval: 20, // default is 50
    }
  )
  // do something with the element
  expect(element.querySelector('.element-child')).toBeTruthy()
})
```
### vi.hoisted [​](index.md#vi-hoisted)

*   **Type**: `<T>(factory: () => T) => T`

All static `import` statements in ES modules are hoisted to the top of the file, so any code that is defined before the imports will actually be executed after imports are evaluated.

However, it can be useful to invoke some side effects like mocking dates before importing a module.

To bypass this limitation, you can rewrite static imports into dynamic ones like this:

diff
```
callFunctionWithSideEffect()
- import { value } from './some/module.js'
+ const { value } = await import('./some/module.js')
```
When running `vitest`, you can do this automatically by using `vi.hoisted` method. Under the hood, Vitest will convert static imports into dynamic ones with preserved live-bindings.

diff
```
- callFunctionWithSideEffect()
import { value } from './some/module.js'
+ vi.hoisted(() => callFunctionWithSideEffect())
```
IMPORTS ARE NOT AVAILABLE

Running code before the imports means that you cannot access imported variables because they are not defined yet:

ts
```
import { value } from './some/module.js'
vi.hoisted(() => { value }) // throws an error
```
This code will produce an error:
```
Cannot access '__vi_import_0__' before initialization
```
If you need to access a variable from another module inside of `vi.hoisted`, use dynamic import:

ts
```
await vi.hoisted(async () => {
  const { value } = await import('./some/module.js')
})
```
However, it is discourage to import anything inside of `vi.hoisted` because imports are already hoisted - if you need to execute something before the tests are running, just execute it in the imported module itself.

This method returns the value that was returned from the factory. You can use that value in your `vi.mock` factories if you need easy access to locally defined variables:

ts
```
import { expect, vi } from 'vitest'
import { originalMethod } from './path/to/module.js'
const { mockedMethod } = vi.hoisted(() => {
  return { mockedMethod: vi.fn() }
})
vi.mock('./path/to/module.js', () => {
  return { originalMethod: mockedMethod }
})
mockedMethod.mockReturnValue(100)
expect(originalMethod()).toBe(100)
```
Note that this method can also be called asynchronously even if your environment doesn't support top-level await:

ts
```
const json = await vi.hoisted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  return response.json()
})
```
### vi.setConfig [​](index.md#vi-setconfig)

*   **Type**: `RuntimeConfig`

Updates config for the current test file. This method supports only config options that will affect the current test file:

ts
```
vi.setConfig({
  allowOnly: true,
  testTimeout: 10_000,
  hookTimeout: 10_000,
  clearMocks: true,
  restoreMocks: true,
  fakeTimers: {
    now: new Date(2021, 11, 19),
    // supports the whole object
  },
  maxConcurrency: 10,
  sequence: {
    hooks: 'stack'
    // supports only "sequence.hooks"
  }
})
```
### vi.resetConfig [​](index.md#vi-resetconfig)

*   **Type**: `RuntimeConfig`

If [`vi.setConfig`](index.md#vi-setconfig) was called before, this will reset config to the original state.

