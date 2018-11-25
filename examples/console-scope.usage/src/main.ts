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
