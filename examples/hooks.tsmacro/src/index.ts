import { useMemo } from 'react';
import { collectVariableUsage } from 'tsutils';
import * as ts from 'typescript';
import { TypeScriptMacroNodeTransformFunction } from 'typescript-macros';

export function useAutoMemo<T>(factory: () => T) {
  console.error('Can\'t use useAutoMemo function in runtime');
  return useMemo(factory, []);
}

export const ____$$$$____typescriptMacroNodeTransformFunction____$$$$____: TypeScriptMacroNodeTransformFunction = ({
  reference,
  node,
}) => {
  if (
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    reference(node.expression) === useAutoMemo.name
  ) {
    if (node.arguments.length !== 1) {
      throw new Error('arguments\'s length should be 1');
    }
    const factory = node.arguments[0];
    if (!(ts.isArrowFunction(factory) || ts.isFunctionExpression(factory))) {
      throw new Error('factory should be FunctionExpression or ArrowFunction');
    }

    const createAstFromString = (input: string) =>
      (ts.createSourceFile(
        'temp.ts',
        input,
        node.getSourceFile().languageVersion,
      ).statements[0] as ts.ExpressionStatement).expression;

    const allVariables = Array.from(
      collectVariableUsage(node.getSourceFile()).entries(),
    );

    const isParent = (node: ts.Node, maybeParentNode: ts.Node): boolean =>
      node.parent === undefined
        ? false
        : node.parent === maybeParentNode
        ? true
        : isParent(node.parent, maybeParentNode);
    const freeVariables = allVariables
      .filter(
        ([declare, info]) =>
          !isParent(declare, factory) &&
          info.uses.some(x => isParent(x.location, factory)),
      )
      .map(([declare, info]) => declare.text);

    const a = createAstFromString(
      `React.useMemo(null,[${freeVariables.join(',')}]) `,
    ) as ts.CallExpression;

    return ts.createCall(a.expression, node.typeArguments, [
      node.arguments[0],
      a.arguments[1],
    ]);
  }
  return node;
};
