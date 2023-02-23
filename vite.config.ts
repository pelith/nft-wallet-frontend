import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd()).VITE_APP_ENV

  return defineConfig({
    define: {},
    resolve: {
      alias: {
        // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
        // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
        // process and buffer are excluded because already managed by node-globals-polyfill
        // info: https://stackoverflow.com/questions/69286329/polyfill-node-os-module-with-vite-rollup-js
        util: 'rollup-plugin-node-polyfills/polyfills/util',
        'ethers/lib': 'ethers/lib.esm',
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: [svgr(), react()],
    build: {
      minify: env !== 'development',
      target: ['es2020'],
      rollupOptions: {
        plugins: [nodePolyfills()],
        // treeshake: false,
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },
  })
}
