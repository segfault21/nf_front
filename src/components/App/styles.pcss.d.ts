declare namespace StylesMStylNamespace {
  export interface IStylesMStyl {
    app: string
  }
}

declare const StylesMStylModule: StylesMStylNamespace.IStylesMStyl & {
  locals: StylesMStylNamespace.IStylesMStyl
}

export = StylesMStylModule
