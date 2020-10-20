import {Injectable} from '@angular/core'
// WITHOUT_RAMBDAX
import allMethods from '../../../new-data.json'
// WITH_RAMBDAX
// import allMethods from '../../../new-data-rambdax.json'
import resolver from '../../../resolver.json'
import {interpolate, switcher} from 'rambdax'
import {SnippetMode} from '../whole/whole.component.interfaces'
import {
  CodeSnippet,
  Data,
  SingleMethod,
} from './methods-data.service.interfaces'

@Injectable({
  providedIn: 'root',
})
export class MethodsDataService {
  data: Data
  constructor() {
    this.data = allMethods
  }
  getAllKeys() {
    return Object.keys(this.data)
  }
  getMethod(prop: string) {
    return this.data[prop]
  }
  applyHighlighter(input: string) {
    return interpolate(input, resolver)
  }
  getDataKey(prop: SnippetMode): keyof CodeSnippet {
    // TODO: R.switcher typings can be improved
    // ============================================
    return switcher<keyof CodeSnippet>(prop)
      .is('source', 'rambdaSource')
      .is('tests', 'allTypings')
      .is('all.typings', 'allTypings')
      .is('typings.test', 'typescriptDefinitionTest')
      .default('rambdaSource')
  }
}
