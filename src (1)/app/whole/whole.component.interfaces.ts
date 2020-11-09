import {SingleMethod} from '../services/methods-data.service.interfaces'

export const EmptyMethod: SingleMethod = {
  example: '',
  allTypings: '',
  rambdaSource: '',
  typing: '',
}
export type Category =
  | 'All'
  | 'String'
  | 'Lenses'
  | 'Object'
  | 'Number'
  | 'List'
  | 'Function'
  | 'Logic'

export type RambdaxCategory =
  | Category
  | 'Async'

type SnippetModeProp =
  | 'rambdaSource'
  | 'rambdaSpecs'
  | 'allTypings'
  | 'typescriptDefinitionTest'
  | 'benchmarkSource'
  | 'failedRamdaSpecs'

export interface SnippetMode {
  text: string,
  mode: SnippetModeProp,
}
export const ALL_SNIPPET_MODES: SnippetMode[] = [
  {text: 'Source', mode: 'rambdaSource'},
  {text: 'Tests', mode: 'rambdaSpecs'},
  {
    text: 'All TS definitions',
    mode: 'allTypings',
  },
  {
    text: 'TS definitions tests',
    mode: 'typescriptDefinitionTest',
  },
  {text: 'Benchmarks', mode: 'benchmarkSource'},
  {
    text: 'Failed Ramda tests',
    mode: 'failedRamdaSpecs',
  },
]
export const DefaultSnippetMode: SnippetMode = ALL_SNIPPET_MODES[0]

export const ALL_CATEGORIES: Category[] = [
  'All',
  'Lenses',
  'Function',
  'List',
  'Number',
  'Logic',
  'Object',
  'String',
]
