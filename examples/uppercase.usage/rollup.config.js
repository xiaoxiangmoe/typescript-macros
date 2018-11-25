// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
// const keysTransformer = require('ts-transformer-keys/transformer').default;
// import tsMacro from './src/typescript-plugin-macros';

import {transformerFactoryCreator} from 'typescript-macros';

export default {
  input: 'src/main.ts',
  plugins: [
    typescript({ transformers: [transformerFactoryCreator] })
  ],
  output: {
    file: 'dist/main.js',
    format: 'es'
  }
};
