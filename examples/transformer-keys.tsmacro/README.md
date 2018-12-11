# @-.-/transformer-keys.usage

build

```ts
import { keys } from '@-.-/transformer-keys.tsmacro';

interface Props {
  readonly id: string;
  readonly name: string;
  readonly age: number;
}
const keysOfProps = keys<Props>();

console.log(keysOfProps); // ['id', 'name', 'age']
```

to

```js
var keysOfProps = ['id', 'name', 'age'];
console.log(keysOfProps); // ['id', 'name', 'age']
```

see: [kimamula/ts-transformer-keys](https://github.com/kimamula/ts-transformer-keys)
