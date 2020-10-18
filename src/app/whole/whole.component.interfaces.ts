import {SingleMethod} from '../services/methods-data.service'

export const EmptyMethod: SingleMethod = {
  example: '',
  allTypings: '',
  rambdaSource: '',
  typing: '',
}

export type Mode = 'repl' | 'all.typings' | 'tests' | 'typings.tests'

export interface SingleMode {
  text: string,
  mode: Mode,
}
export const ALL_MODES: SingleMode[] = [
  {text: 'REPL', mode: 'repl'},
  {text: 'Typescript definitions', mode: 'all.typings'},
  {text: 'Tests', mode: 'tests'},
  {text: 'Typescript definitions tests', mode: 'typings.tests'},
]
