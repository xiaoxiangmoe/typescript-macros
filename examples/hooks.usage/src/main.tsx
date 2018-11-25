import { useAutoMemo } from '@-.-/hooks.tsmacro';
import * as React from 'react';

export const MyComponent: React.FC<{ readonly labels: string[] }> = ({
  labels,
}) => {
  const myComputation = useAutoMemo(() =>
    labels.map(label => label.toUpperCase()),
  );
  return <div>{JSON.stringify(myComputation)}</div>;
};
