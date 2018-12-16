import { exportTypeScriptMacro } from 'interop-export-macros.tsmacro';
import * as ts from 'typescript';
import { TypeScriptMacroNodeTransformFunction } from 'typescript-macros';

function scope(): void {
  throw new Error('no runtime output');
}

// warning: if we use export default, It will be ignored because export default if design for babel-plugin-macros
export { scope as default };

const transform: TypeScriptMacroNodeTransformFunction = ({
  reference,
  node,
}) => {
  const isScopeStatement = (x: ts.Statement) =>
    ts.isExpressionStatement(x) &&
    ts.isCallExpression(x.expression) &&
    ts.isIdentifier(x.expression.expression) &&
    reference(x.expression.expression) === 'default';

  const isAssignStatement = (x: ts.Statement): x is ts.VariableStatement => {
    if (!ts.isVariableStatement(x)) {
      return false;
    }
    if (x.declarationList.declarations.length !== 1) {
      return false;
    }
    const node = x.declarationList.declarations[0];
    return true;
  };

  const createAstFromString = (input: string) =>
    (ts.createSourceFile('temp.ts', input, node.getSourceFile().languageVersion)
      .statements[0] as ts.ExpressionStatement).expression;

  if (
    ts.isFunctionDeclaration(node) &&
    node.body !== undefined &&
    node.body.statements.some(isScopeStatement)
  ) {
    return ts.createFunctionDeclaration(
      node.decorators,
      node.modifiers,
      node.asteriskToken,
      node.name,
      node.typeParameters,
      node.parameters,
      node.type,
      ts.createBlock([
        ts.createExpressionStatement(
          createAstFromString(
            `console.log('begin scope:${
              node.name ? node.name.text : 'anonymous'
            }')`,
          ),
        ),
        ...node.body.statements.flatMap(x =>
          isScopeStatement(x)
            ? []
            : isAssignStatement(x)
            ? [
                x,
                ts.createExpressionStatement(
                  createAstFromString(
                    `console.log('${x.declarationList.declarations[0].name.getText()} <--',${x.declarationList.declarations[0].name.getText()})`,
                  ),
                ),
              ]
            : [x],
        ),
      ]),
    );
  }

  return node;
};

exportTypeScriptMacro(transform);
