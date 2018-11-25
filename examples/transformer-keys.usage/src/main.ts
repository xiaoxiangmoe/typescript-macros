import { keys } from '@-.-/transformer-keys.tsmacro';

interface Props {
  readonly id: string;
  readonly name: string;
  readonly age: number;
}
const keysOfProps = keys<Props>();

console.log(keysOfProps); // ['id', 'name', 'age']
