// tslint:disable: missing-jsdoc

import * as ts from 'typescript';
import { isMacroImportDeclaration } from './isMacroImportDeclaration';

/**
 * get all TypeScriptMacro import declarations
 *
 * @param node typescript source file
 * @returns array of import declarations whose moduleSpecifier ends with `.tsmacro`
 *
 * ### sample usage
 *
 * if node is `ts.SourceFile` as below:
 *
 * ```ts
 * import { useAutoMemo } from '@-.-/hooks.tsmacro';
 * import * as React from 'react';
 * import { useAutoMemo as useAutoMemo2 } from '@-.-/hooks.tsmacro';
 * import uppercase from '@-.-/uppercase.tsmacro';
 * import 'foobar.tsmacro';
 * ```
 *
 * call this function will return an Array which length is 4 (all import declaration nodes except import react).
 */
export function getMacroImportDeclarations(node: ts.SourceFile) {
  const declarations = node.statements.filter(x =>
    ts.isImportDeclaration(x),
  ) as ts.ImportDeclaration[];

  return declarations.filter(isMacroImportDeclaration);
}
