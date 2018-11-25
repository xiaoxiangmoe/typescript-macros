// tslint:disable: missing-jsdoc

import { collectVariableUsage } from 'tsutils';
import * as ts from 'typescript';

/**
 * return the use identifiers's list of declaration
 * @param declarationIdentifier identifier of Declaration
 * @returns identifier list of the uses of declaration
 */
export function getUses(declarationIdentifier: ts.Identifier) {
  // tslint:disable-next-line: no-non-null-assertion
  return collectVariableUsage(declarationIdentifier.getSourceFile())
    .get(declarationIdentifier)!
    .uses.map(x => x.location);
}
