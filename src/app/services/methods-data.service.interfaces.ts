export interface CodeSnippet {
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
