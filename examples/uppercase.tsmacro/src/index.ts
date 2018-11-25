import * as ts from 'typescript';
import { TypeScriptMacroNodeTransformFunction } from 'typescript-macros';

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

export const __typescriptMacroNodeTransformFunction: TypeScriptMacroNodeTransformFunction = ({
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
      return ts.createStringLiteral(param.text.toUpperCase());
    }
  }
};
