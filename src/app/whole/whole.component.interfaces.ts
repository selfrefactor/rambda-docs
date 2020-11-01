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
export type Mode = 'source' | 'all.typings' | 'tests' | 'typings.tests'
export const DefaultMode: Mode = 'source'

export type SnippetMode =
  | 'source'
  | 'tests'
  | 'all.typings'
  | 'typings.tests'

export interface SingleMode {
  text: string,
  mode: Mode,
}
export const ALL_MODES: SingleMode[] = [
  {text: 'Source', mode: 'source'},
  {
    text: 'Typescript definitions',
    mode: 'all.typings',
  },
  {text: 'Tests', mode: 'tests'},
  {
    text: 'Typescript definitions tests',
    mode: 'typings.tests',
  },
]
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
