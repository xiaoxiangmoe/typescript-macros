// rollup.config.js
// const keysTransformer = require('ts-transformer-keys/transformer').default;
// import tsMacro from './src/typescript-plugin-macros';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/main.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  output: {
    file: 'dist/main.js',
    format: 'esm'
  }
};
