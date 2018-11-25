// tslint:disable: missing-jsdoc

import * as ts from 'typescript';
import { getUses } from './getUses';

export type IdentifiersMap = { readonly [key: string]: ts.Identifier[] };

/**
 * get binding identifiers of `ImportDeclaration`
 *
 * @param node typescript source file
 * @returns map of Identifiers, whos key is import name and value is referenced identifiers
 */
export function getBindingIdentifiers(
  node: ts.ImportDeclaration,
): IdentifiersMap {
  if (node.importClause == null) {
    return {};
  }

  // tslint:disable-next-line: readonly-keyword
  const ret: { [key: string]: ts.Identifier[] } = {};

  if (node.importClause.namedBindings !== undefined) {
    if (ts.isNamespaceImport(node.importClause.namedBindings)) {
      throw new Error('namespace import are not allowd');
    }
    if (ts.isNamedImports(node.importClause.namedBindings)) {
      node.importClause.namedBindings.elements.forEach(
        ({ propertyName, name }) => {
          const key =
            propertyName === undefined ? name.text : propertyName.text;
          ret[key] = getUses(name);
        },
      );
    }
  }
  // default import
  if (node.importClause.name !== undefined) {
    const then = getUses(node.importClause.name);
    ret.default = [...(ret.default === undefined ? [] : ret.default), ...then];
  }

  return ret;
}
