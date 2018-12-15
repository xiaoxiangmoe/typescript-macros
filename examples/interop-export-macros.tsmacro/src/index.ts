import * as ts from 'typescript';
import { TypeScriptMacroNodeTransformFunction } from 'typescript-macros';

import { collectVariableUsage } from 'tsutils';

/**
 * uppercase input string
 * @param input only a StringLiteral
 * @returns uppercased StringLiteral
 */
function uppercase(input: string): string {
  console.error(new Error('no runtime output'));
  return input.toUpperCase();
}

// FIXME: this is a bug of micro bundle.
// only can ex🦀️port default value by named ex🦀️port.
// and can't include ex🦀️port keyword in comments.
export { uppercase as default };

function isLastStatementInSourceFile(node: ts.Node) {
  if (!ts.isSourceFile(node.parent)) {
    throw new Error('parent is not SourceFile');
  }
  const { statements } = node.parent;
  return statements[statements.length - 1] === node;
}
export function exportBabelMacro(a: any) {
  return;
}
export function exportTypeScriptMacro(a: any) {
  return;
}
export const __typescriptMacroNodeTransformFunction: TypeScriptMacroNodeTransformFunction = ({
  reference,
  node,
}) => {
  if (ts.isSourceFile(node.parent)) {
    if (ts.isExportAssignment(node)) {
      return ts.createEmptyStatement();
    }

    if (
      ts.isExpressionStatement(node) &&
      ts.isCallExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      ['exportTypeScriptMacro', 'exportBabelMacro'].includes(reference(
        node.expression.expression,
      ) as string)
    ) {
      const args = node.expression.arguments;
      if (args.length !== 1) {
        throw new Error('only allow 1 arg');
      }
      const arg = args[0];
      if (!ts.isIdentifier(arg)) {
        throw new Error('only allow Identifier in arg');
      }

      return reference(node.expression.expression) === 'exportTypeScriptMacro'
        ? ts.createExportDeclaration(
            [],
            [],
            ts.createNamedExports([
              ts.createExportSpecifier(
                arg.text,
                '__typescriptMacroNodeTransformFunction',
              ),
            ]),
          )
        : ts.createExportAssignment(
            [],
            [],
            false,
            ts.createIdentifier(arg.text),
          );
    }
  }

  return node;
};
