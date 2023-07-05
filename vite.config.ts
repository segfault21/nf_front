import alias from '@rollup/plugin-alias'
import reactRefresh from '@vitejs/plugin-react-refresh'
import * as dotenv from 'dotenv'
import { defineConfig } from 'vite'
import PkgConfig from 'vite-plugin-package-config'
import svgr from 'vite-plugin-svgr'
import WindiCSS from 'vite-plugin-windicss'

import reactCssModule from './vite-tools/react-css-modules'

const path = require('path')

dotenv.config()

const generateScopedName = '[path][name]__[local]'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },
  clearScreen: false,
  plugins: [
    // @ts-ignore
    alias({
      entries: [
        { find: '~', replacement: path.resolve('./src/') + path.sep },
        {
          find: /^components\//,
          replacement: path.resolve('./src/components/') + path.sep,
        },
        {
          find: /^assets\//,
          replacement: path.resolve('./src/assets/') + path.sep,
        },
        {
          find: /^api\//,
          replacement: path.resolve('./src/api/') + path.sep,
        },
      ],
    }),
    reactCssModule({
      generateScopedName,
      excludeFiles: [/main\.tsx/],
      filetypes: {
        '.css': {
          syntax: 'postcss',
        },
      },
    }),
    PkgConfig(),
    reactRefresh(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        typescript: false,
        replaceAttrValues: { '#323232': 'currentColor', white: 'currentColor' },
      },
    }),
    WindiCSS({
      scan: {
        dirs: ['.'], // all files in the cwd
        fileExtensions: ['js', 'ts', 'tsx'], // also enabled scanning for js/ts
      },
    }),
  ],
  css: {
    modules: {
      generateScopedName,
      localsConvention: 'camelCase',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const startsWith = (name) => {
            const dirname = __dirname.replace(/\\/g, '/')
            return id.replace(dirname + '/node_modules/', '').startsWith(name)
          }

          if (id === '/@windicss/windi.css') return 'windy'

          if (startsWith('react')) return 'react'
          if (startsWith('lodash')) return 'lodash'
          if (startsWith('faker')) return 'faker'
          if (startsWith('mobx')) return 'mobx'

          // if (id.includes('/node_modules/')) return 'vendor'
        },
      },
    },
  },
})
