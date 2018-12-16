import babelFunc from './babel-lowercase';
import tsFunc from './typescript-lowercase';

import {
  exportBabelMacro,
  exportTypeScriptMacro,
} from 'interop-export-macros.tsmacro';

/**
 * lowercase input string
 * @param input only a StringLiteral
 * @returns lowercased StringLiteral
 */
declare function lowercase(input: string): string;

// export default will be ignored in generated js file
// but it will still work in .d.ts file
export default lowercase;

exportTypeScriptMacro(tsFunc);
exportBabelMacro(babelFunc);
