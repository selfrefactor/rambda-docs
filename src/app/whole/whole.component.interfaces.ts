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
  | 'Async'
  | 'Lenses'
  | 'Object'
  | 'Number'
  | 'List'
  | 'Function'
  | 'Logic'

type SnippetModeProp =
  | 'rambdaSource'
  | 'rambdaSpecs'
  | 'allTypings'
  | 'failedRamdaSpecs'
  | 'typescriptDefinitionTest'

export interface SnippetMode {
  text: string,
  mode: SnippetModeProp,
}
export const ALL_SNIPPET_MODES: SnippetMode[] = [
  {text: 'Source', mode: 'rambdaSource'},
  {
    text: 'Typescript definitions',
    mode: 'allTypings',

  },
  {text: 'Tests', mode: 'rambdaSpecs'},
  {
    text: 'Typescript definitions tests',
    mode: 'typescriptDefinitionTest',
  },
  {
    text: 'Failed Ramda tests',
    mode: 'failedRamdaSpecs',
  },
]
export const DefaultSnippetMode: SnippetMode = ALL_SNIPPET_MODES[0]

export const ALL_CATEGORIES: Category[] = [
  'All',
  'Async',
  'Lenses',
  'Function',
  'List',
  'Number',
  'Logic',
  'Object',
  'String',
]
