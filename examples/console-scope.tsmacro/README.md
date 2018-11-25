# @-.-/console-scope.tsmacro

build

```ts
import scope from '@-.-/console-scope.tsmacro';
export function foo() {
  scope();
  const a = 1;
  const b = 2;
}

export function bar() {
  const a = 1;
  scope();
  const b = 2;
}
```

to

```js
function foo() {
  console.log('begin scope:foo');
  const a = 1;
  console.log('a<--', a);
  const b = 2;
  console.log('b<--', b);
}

function bar() {
  console.log('begin scope:bar');
  const a = 1;
  console.log('a<--', a);
  const b = 2;
  console.log('b<--', b);
}

export { foo, bar };
```
