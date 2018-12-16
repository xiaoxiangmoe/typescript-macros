import typescript from 'rollup-plugin-typescript2';

import { transformerFactoryCreator } from 'typescript-macros';

export default {
  input: 'src/index.ts',
  plugins: [typescript({ transformers: [transformerFactoryCreator] })],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      interop: true
    },
    {
      file: 'dist/index.mjs',
      format: 'esm'
    }
  ]
};
