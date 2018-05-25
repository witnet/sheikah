# TypeScript StyleGuide and Coding Conventions

This is the style guide and coding conventions used in Sheikah project and it's based in Basarat Ali's own [style and coding conventions](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md).

Sections:

* [Variable and Function](#variable-and-function)
* [Class](#class)
* [Interface](#interface)
* [Type](#type)
* [Namespace](#namespace)
* [Module](#module)
* [Enum](#enum)
* [`null` vs. `undefined`](#null-vs-undefined)
* [Formatting](#formatting)
* [Single vs. Double Quotes](#quotes)
* [Tabs vs. Spaces](#spaces)
* [Use semicolons](#semicolons)
* [Annotate Arrays as `Type[]`](#array)
* [File Names](#filename)
* [`type` vs `interface`](#type-vs-interface)

## Variable and Function
* Use `camelCase` for variable and function names

> Reason: Conventional JavaScript

**Bad**
```ts
const FooVar;
const BarFunc = () => { }
```
**Good**
```ts
const fooVar;
const barFunc = () => { }
```

* Always use `const` and arrow-function syntax.

**Bad**
```ts
function fooFunc() {
}
```
**Good**
```ts
const fooFunc = () => { }
```

To define function overloads you can use:

```ts
const fooFunc: {
  (number): number;
  (boolean): boolean;
  // ...
} = (x: any) => {
  // ...
}
```

## Class

* Use `PascalCase` for class names.

> Reason: This is actually fairly conventional in standard JavaScript.

**Bad**
```ts
class foo { }
```
**Good**
```ts
class Foo { }
```

* Use `camelCase` of class members and methods

> Reason: Naturally follows from variable and function naming convention.

**Bad**
```ts
class Foo {
    Bar: number;
    Baz() { }
}
```
**Good**
```ts
class Foo {
    bar: number;
    baz() { }
}
```

* Do not use name for properties and methods that repeat the class name

> Reason: They are redundant.

**Bad**

```ts
class Foo {
  valueFoo;

  doSomethingFoo() {}
}
```

**Good**

```ts
class Foo {
  value;

  doSomething() {}
}
```

## Interface

* Use `PascalCase` for name.

> Reason: Similar to class

* Use `camelCase` for members.

> Reason: Similar to class

* **Don't** prefix with `I`

> Reason: Unconventional. `lib.d.ts` defines important interfaces without an `I` (e.g. Window, Document etc).

**Bad**
```ts
interface IFoo {
}
```
**Good**
```ts
interface Foo {
}
```

## Type

* Use `PascalCase` for name.

> Reason: Similar to class

* Use `camelCase` for members.

> Reason: Similar to class


## Namespace

* Use `PascalCase` for names

> Reason: Convention followed by the TypeScript team. Namespaces are effectively just a class with static members. Class names are `PascalCase` => Namespace names are `PascalCase`

**Bad**
```ts
namespace foo {
}
```
**Good**
```ts
namespace Foo {
}
```

## Module

* Do not use names for members that repeat the module name.

> Reason: They are redundant.

**Bad**

```ts
// foo.ts

const doSomethingFoo = () => {};
```

**Good**

```ts
// foo.ts

const doSomething = () => {};
```

* Prefer to import modules under an alias and not their members.

> Reason: To avoid name collisions.

**Bad**

```ts
import {foo} from "foo"
```

**Good**

```ts
import * as Foo from "foo"
```

## Enum

* Use `PascalCase` for enum names

> Reason: Similar to Class. Is a Type.

**Bad**
```ts
enum color {
}
```
**Good**
```ts
enum Color {
}
```

* Use `PascalCase` for enum member

> Reason: Convention followed by TypeScript team i.e. the language creators e.g `SyntaxKind.StringLiteral`. Also helps with translation (code generation) of other languages into TypeScript.

**Bad**
```ts
enum Color {
    red
}
```
**Good**
```ts
enum Color {
    Red
}
```

## Null vs. Undefined

* Prefer not to use either for explicit unavailability

> Reason: these values are commonly used to keep a consistent structure between values. In TypeScript you use *types* to denote the structure

**Bad**
```ts
let foo = {x:123,y:undefined};
```
**Good**
```ts
let foo:{x:number,y?:number} = {x:123};
```

* Do not use `undefined` or `null` as return values in general, use instead an object like `{valid:boolean,value?:Foo}` instead.

***Bad***
```ts
return null;
```
```ts
return undefined;
```
***Good***
```ts
return {valid: false};
```
```ts
return {valid: true, value: "some value"};
```

* Use `null` where its a part of the API or conventional

> Reason: It is conventional in Node.js e.g. `error` is `null` for NodeBack style callbacks.

**Bad**
```ts
cb(undefined)
```
**Good**
```ts
cb(null)
```

* Use *truthy* check for **objects** being `null` or `undefined`

**Bad**
```ts
if (error === null)
```
**Good**
```ts
if (error)
```

* Use `===` / `!==` (not `==` / `!=`) to check for `null` / `undefined` on primitives.

> Reason: Be explicit and avoid relying on JavaScript's implicit conversion rules that makes comparing: null == undefined, to be true.

**Bad**
```ts
if (error != undefined) {
  // executed if error is null or undefined
}
```
**Good**
```ts
if (error !== undefined && error !== null) {
  // executed if error is null or undefined
}
```

## Formatting
The TypeScript compiler ships with a very nice formatting language service. Whatever output it gives by default is good enough to reduce the cognitive overload on the team.

Use [`tsfmt`](https://github.com/vvakame/typescript-formatter) to automatically format your code on the command line. Also your IDE (atom/vscode/vs/sublime) already has formatting support built-in.

Examples:
```ts
// Space before type i.e. foo:<space>string
const foo: string = "hello";
```

## Quotes

* Prefer double quotes (`"`) unless escaping.

> Allows easier copy paste of objects into JSON. Allows people to use other languages to work without changing their quote character. Allows you to use apostrophes e.g. `He's not going.`.

* When you can't use double quotes, try using back ticks (\`).

> Reason: These generally represent the intent of complex enough strings.

## Spaces

* Use `2` spaces. Not tabs.

> Reason: More JavaScript teams do this (e.g. [airbnb](https://github.com/airbnb/javascript), [idiomatic](https://github.com/rwaldron/idiomatic.js), [standard](https://github.com/feross/standard), [npm](https://github.com/npm/npm), [node](https://github.com/nodejs/node), [google/angular](https://github.com/angular/angular/), [facebook/react](https://github.com/facebook/react)). The TypeScript/VSCode teams use 4 spaces but are definitely the exception in the ecosystem.

## Semicolons

* Do not use semicolons.

> Reasons: Although recommended by TC39 as well they are not really needed and add more verbosity.

## Array

* Annotate arrays as `foos:Array<Foo>` instead of `foos:Foo[]`.

> Reasons: Its easier to read. It is more explicit and more uniform to with the rest of generic types.

## Filename
Name files with `camelCase`. E.g. `accordian.tsx`, `myControl.tsx`, `utils.ts`, `map.ts` etc.

> Reason: Conventional across many JS teams.

## type vs. interface

* Use `type` when you *might* need a union or intersection or to improve readability:

```ts
type Foo = number | { someProperty: number }
```

```ts
type Name = string
```

* Use `interface` when you need `extends` or `implements` or to enforce type-checking via a discriminant field e.g

```ts
interface Foo {
  foo: string;
}
interface FooBar extends Foo {
  bar: string;
}
class X implements FooBar {
  foo: string;
  bar: string;
}
```

```ts
interface Foo {
  type: "foo";
}
interface Bar {
  type: "bar";
}

const foo(v: Foo): void => {
  // ...
}

foo({type: "foo"}) // => OK

foo({type: "bar"}) // => ERROR
```

* Otherwise use whatever makes you happy that day.
