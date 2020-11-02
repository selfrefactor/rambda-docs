export interface CodeSnippet {
  typing: string,
  allTypings: string,
  rambdaSource: string,
  typescriptDefinitionTest?: string,
  rambdaSpecs?: string,
}
export interface SingleMethod extends CodeSnippet {
  categories?: string[],
  example?: string,
  explanation?: string,
  notes?: string,
  typing: string,
}

export interface Data {
  [key: string]: SingleMethod,
}

export interface DataCategory {
  [key: string]: string[],
}
