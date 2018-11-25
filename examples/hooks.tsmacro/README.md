# @-.-/hooks.tsmacro

build

```tsx
import { useAutoMemo } from '@-.-/hooks.tsmacro';
import * as React from 'react';

export const MyComponent: React.FC<{ labels: Array<string> }> = ({
  labels
}) => {
  const myComputation = useAutoMemo(() =>
    labels.map(label => label.toUpperCase())
  );
  return <div>{JSON.stringify(myComputation)}</div>;
};
```

to

```js
import { useMemo, createElement } from 'react';

const MyComponent = ({ labels }) => {
  const myComputation = useMemo(
    () => labels.map(label => label.toUpperCase()),
    [labels]
  );
  return createElement('div', null, JSON.stringify(myComputation));
};

export { MyComponent };
```
