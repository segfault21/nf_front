const prettier = require('prettier')
const fs = require('fs/promises')
const path = require('path')
const prettierOptions = prettier.resolveConfig(__dirname)

const canAccess = async (directoryPath) => {
  try {
    await fs.access(directoryPath)
    return true
  } catch {
    return false
  }
}

module.exports = {
  plugins: [
    require('./vite-tools/css-d-ts')({
      transformContent: async ({ content }) =>
        prettier.format(content, {
          parser: 'typescript',
          ...(await prettierOptions),
        }),
      writeFile: async ({ paths, content }) => {
        const directoryPath = path.dirname(paths.dtsFile).replace(/\\/g, '/')
        const dirname = __dirname.replace(/\\/g, '/')
        if (!directoryPath.startsWith(dirname)) return

        if (!(await canAccess(directoryPath))) {
          fs.mkdir(directoryPath, { recursive: true })
        }

        await fs.writeFile(paths.dtsFile, content)
      },
    }),
    require('postcss-import'),
    require('postcss-nested'),
    // cssDTs,
  ],
}
