import { Injectable } from '@angular/core'
import { interpolate, switcher } from 'rambdax'
// WITH_RAMBDAX
// import allMethods from '../../../new-data-rambdax.json'
// WITHOUT_RAMBDAX
import allCategories from '../../../categories.json'
// WITHOUT_RAMBDAX
import allMethods from '../../../new-data.json'
// WITH_RAMBDAX
// import allCategories from '../../../categories-rambdax.json'
import resolver from '../../../resolver.json'
import { Category, SnippetMode } from '../whole/whole.component.interfaces'
import {
  CodeSnippet,

  Data, DataCategory
} from './methods-data.service.interfaces'

@Injectable({
  providedIn: 'root',
})
export class MethodsDataService {
  data: Data
  categories:  DataCategory
  constructor() {
    this.data = allMethods
    this.categories = allCategories
  }
  getAllKeys() {
    return Object.keys(this.data)
  }
  getMethod(prop: string) {
    return this.data[prop]
  }
  getCategoryMethods(category: Category) {
    if(category === 'all') return this.getAllKeys()
    if(this.categories[category] === undefined) return this.getAllKeys()
    
    return this.categories[category]
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
