import babel from './babel-lowercase';
import __typescriptMacroNodeTransformFunction from './typescript-lowercase';

/**
 * lowercase input string
 * @param input only a StringLiteral
 * @returns lowercased StringLiteral
 */
function lowercase(input: string): string {
  console.error(new Error('no runtime output'));
  return input.toLowerCase();
}

export default babel as typeof lowercase;

export { __typescriptMacroNodeTransformFunction };
