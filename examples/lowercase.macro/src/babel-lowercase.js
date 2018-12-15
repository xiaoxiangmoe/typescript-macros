const { createMacro } = require('babel-plugin-macros');
function lowercaseMacro({ references, state, babel, config }) {
  references.default.forEach(referencePath => {
    if (referencePath.parentPath.type !== 'CallExpression') {
      throw new Error('Not allowed');
    }

    const t = babel.types;

    const args = referencePath.parentPath.node.arguments;
    if (args.length !== 1) {
      throw new Error("args's length should be 1");
    }
    const arg = args[0];

    if (arg.type !== 'StringLiteral') {
      throw new Error('only allow StringLiteral as arg');
    }

    referencePath.parentPath.replaceWith(
      t.stringLiteral(arg.value.toLowerCase())
    );
  });
}
export default createMacro(lowercaseMacro);
// export default createMacro;
