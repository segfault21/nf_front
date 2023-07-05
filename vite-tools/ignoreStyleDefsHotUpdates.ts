import { Plugin } from 'vite'

export default (): Plugin => ({
  enforce: 'pre',
  name: 'test',
  handleHotUpdate: (ctx) => {
    if (
      ctx.file.endsWith('pcss.d.ts') ||
      ctx.file.endsWith('styl.d.ts') ||
      ctx.file.endsWith('css.d.ts')
    ) {
      return []
    }
    return ctx.modules
  },
})
