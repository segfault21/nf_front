import { Plugin } from 'vite'
import vitePluginCssModules from 'vite-plugin-css-modules'

import { generateCssTypes } from './stylesTypesGenerator'

export default (): Plugin => ({
  ...vitePluginCssModules({
    postcssModulesOpts: {
      generateScopedName: '[local]___[hash:base64:5]',
      localsConvention: 'camelCase',
      getJSON: generateCssTypes,
    },
  }),
  enforce: 'post',
  apply: 'serve',
})
