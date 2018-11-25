import * as ts from 'typescript';
import { TypeScriptMacroNodeTransformFunction } from 'typescript-macros';

export function keys<T extends object>(): (keyof T)[] {
  console.error(new Error('no runtime output'));
  return [];
}

export const __typescriptMacroNodeTransformFunction: TypeScriptMacroNodeTransformFunction = ({
  reference,
  languageService,
  node,
}) => {
  if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
    const refName = reference(node.expression);
    if (refName !== false) {
      if (refName !== (keys as any).name) {
        // FIXME: Functions should have a property 'name'. remove this any until TS support this.
        throw Error(`no ${refName} export`);
      }
      if (node.arguments.length !== 0) {
        throw Error('only allow 0 param');
      }
      const typeChecker = languageService.getProgram()!.getTypeChecker();
      if (!node.typeArguments) {
        return ts.createArrayLiteral([]);
      }
      const type = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
      const properties = typeChecker.getPropertiesOfType(type);
      return ts.createArrayLiteral(
        properties.map(property => ts.createLiteral(property.name)),
      );
    }
  }
  return node;
};
