# @-.-/uppercase.tsmacro

build

```ts
import uppercase from '@-.-/uppercase.tsmacro';
export function foo() {
  return uppercase('Hello world!');
}
```

to

```js
function foo() {
  return 'HELLO WORLD!';
}

export { foo };
```
