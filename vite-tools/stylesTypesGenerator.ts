import * as fs from 'fs/promises'
import * as prettier from 'prettier'

const typesTemplate = (types) => {
  const typesPart = Object.keys(types)
    .map((name) => `    '${name}': string`)
    .join('\n')

  return `
  declare namespace StylesMStylNamespace {
    export interface IStylesMStyl {
  ${typesPart}
    }
  }

  declare const StylesMStylModule: StylesMStylNamespace.IStylesMStyl & {
    locals: StylesMStylNamespace.IStylesMStyl
  }

  export = StylesMStylModule
`
}

export const generateCssTypes = (file, json) => {
  prettier.resolveConfig(file).then((options) => {
    // console.log('Hi')
    let declaration = typesTemplate(json)
    declaration = prettier.format(declaration, {
      ...options,
      parser: 'typescript',
    })
    fs.readFile(file + '.d.ts', 'utf8')
      .then((existing) => {
        if (existing !== declaration)
          fs.writeFile(file + '.d.ts', declaration, 'utf8')
      })
      .catch(() => fs.writeFile(file + '.d.ts', declaration, 'utf8'))
  })
}
