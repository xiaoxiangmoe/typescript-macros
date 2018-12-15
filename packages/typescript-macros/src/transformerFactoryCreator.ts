// tslint:disable: no-shadowed-variable missing-jsdoc

import * as ts from 'typescript';
import {
  TransformerFactoryCreator,
  TypeScriptMacroNodeTransformFunction,
} from './types';
import {
  getBindingIdentifiers,
  IdentifiersMap,
} from './utils/getBindingIdentifiers';
import { getMacroImportDeclarations } from './utils/getMacroImportDeclarations';
import { isMacroImportDeclaration } from './utils/isMacroImportDeclaration';

export const transformerFactoryCreator: TransformerFactoryCreator = languageService => {
  const beforeTransformerFactory: ts.TransformerFactory<
    ts.SourceFile
  > = context => node => {
    const visitEachChild = <T extends ts.Node>(node: T, visitor: ts.Visitor) =>
      ts.visitEachChild(node, visitor, context);

    const visitorFactory = ({
      bindings,
      transFunc,
    }: {
      readonly bindings: IdentifiersMap;
      readonly transFunc: TypeScriptMacroNodeTransformFunction;
    }) => {
      const visitor: ts.Visitor = node => {
        if (ts.isImportDeclaration(node)) {
          return isMacroImportDeclaration(node) ? undefined : node;
        }
        const ret = transFunc({
          reference(node) {
            const a = Object.entries(bindings).find(([key, ids]) =>
              ids.includes(node),
            );
            return a === undefined ? false : a[0];
          },
          node,
          languageService,
        });
        return ret === undefined ||
          ts.isExportAssignment(ret) ||
          ts.isExportDeclaration(ret)
          ? ret
          : visitEachChild(ret, visitor);
      };
      return visitor;
    };

    // tslint:disable
    const imDeclarations = getMacroImportDeclarations(node).map(x => ({
      bindings: getBindingIdentifiers(x),
      transFunc: require(x.moduleSpecifier.getText().slice(1, -1))
        .__typescriptMacroNodeTransformFunction as TypeScriptMacroNodeTransformFunction
      /* Magic number 1 and -1 is for remove leading and ending quote */
    }));
    const a = imDeclarations.reduce(
      (node, curr) => visitEachChild(node, visitorFactory(curr)),
      node
    );
    return a;
    // tslint:enable
  };
  return {
    before: [beforeTransformerFactory],
    after: [],
  };
};
