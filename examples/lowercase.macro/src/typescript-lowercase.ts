import * as ts from 'typescript';
import { TypeScriptMacroNodeTransformFunction } from 'typescript-macros';

const transformFunction: TypeScriptMacroNodeTransformFunction = ({
  reference,
  node,
}) => {
  if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
    const refName = reference(node.expression);
    if (refName !== false) {
      if (refName !== 'default') {
        throw Error('only allow default export');
      }
      if (node.arguments.length !== 1) {
        throw Error('only allow 1 param');
      }
      const param = node.arguments[0];
      if (!ts.isStringLiteralLike(param)) {
        throw Error('only allow StringLiteral & NoSubstitutionTemplateLiteral');
      }
      return ts.createStringLiteral(param.text.toLowerCase());
    }
  }

  return node;
};

export default transformFunction;
