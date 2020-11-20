import typescript from 'rollup-plugin-typescript2';
import sass from 'rollup-plugin-sass'
import pkg from './package.json'

export default {
  input: 'src/PointerRipple.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    sass({
      insert: true
    }),
  ],
}
