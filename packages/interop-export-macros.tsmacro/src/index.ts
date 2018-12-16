import * as ts from 'typescript';
import { TypeScriptMacroNodeTransformFunction } from 'typescript-macros';

/**
 * It will export babel macro for users
 * @param babelMacroFunction
 */
function exportBabelMacro(babelMacroFunction: Function): void {}

/**
 * It will export typescript macro for users
 * @param tsMacroFunction
 */
function exportTypeScriptMacro(
  tsMacroFunction: TypeScriptMacroNodeTransformFunction,
): void {}

export { exportBabelMacro, exportTypeScriptMacro };

export const ____$$$$____typescriptMacroNodeTransformFunction____$$$$____: TypeScriptMacroNodeTransformFunction = ({
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
                '____$$$$____typescriptMacroNodeTransformFunction____$$$$____',
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
