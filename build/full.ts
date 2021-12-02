import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'
import filesize from 'rollup-plugin-filesize'
import { parallel } from 'gulp'
import { SilenceUiPack } from './plugins/silence-ui-pack'
import { pkgSiPath, siPath } from '../path/path'
import { genExternal, writeBundles } from './utils/rollupUtil'
import type { TaskFunction } from "undertaker"


export const buildFull = (minify: boolean) => async () => {
  const bundle = await rollup({
    input: path.resolve(pkgSiPath, 'index.ts'),
    plugins: [
      await SilenceUiPack(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      vue({
        target: 'browser',
        exposeFilename: false,
      }),
      commonjs(),
      esbuild({
        minify,
        sourceMap: minify,
        target: 'es2018',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),

        // options
        preventAssignment: true,
      }),
      filesize(),
    ],
    external: await genExternal({ full: true }),
  })
  const banner = `/*! Silence Ui v 0.0.1 */\n`
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(siPath, `dist/index.full${minify ? '.min' : ''}.js`),
      exports: 'named',
      name: 'SilenceUi',
      globals: {
        vue: 'Vue',
      },
      sourcemap: minify,
      banner,
    },
    {
      format: 'esm',
      file: path.resolve(
        siPath,
        `dist/index.full${minify ? '.min' : ''}.mjs`
      ),
      sourcemap: minify,
      banner,
    },
  ])
}

export const buildFullBundle: TaskFunction = parallel(
    buildFull(true),
    buildFull(false)
)
