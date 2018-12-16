/**
 * type defines for macros
 */

import * as ts from 'typescript';

export interface NodeTransformParameter {
  /**
   * the node which is visited
   */
  readonly node: ts.Node;
  /**
   * the languageService of whole Transformer
   *
   * it may not work at ts-loader and awesome-typescript loader for lack of corresponding API support.(need PR for these projects)
   * @experimental
   */
  readonly languageService: ts.LanguageService;
  /**
   * function to determine if it is the identifier imported by this import declaration
   *
   * @param node the Identifier node
   * @returns false if it is not variable imported by this macros. string for the referenced bind of this macros.
   */
  reference(node: ts.Identifier): false | string;
}
/**
 * all macros should export ____$$$$____typescriptMacroNodeTransformFunction____$$$$____
 *
 * which is function and whose type sig is TypeScriptMacroNodeTransformFunctions
 *
 */
export type TypeScriptMacroNodeTransformFunction = (
  param: NodeTransformParameter,
) => ts.Node | undefined;

export type TransformerFactoryCreator = (
  languageService: ts.LanguageService,
) => ts.CustomTransformers;
