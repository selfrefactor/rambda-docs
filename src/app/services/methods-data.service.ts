import {Injectable} from '@angular/core'
import {interpolate, switcher, replace, equals, filter } from 'rambdax'
// WITH_RAMBDAX
// import allMethods from '../../../new-data-rambdax.json'
// WITHOUT_RAMBDAX
import allCategories from '../../../categories.json'
// WITHOUT_RAMBDAX
import allMethods from '../../../new-data.json'
// WITH_RAMBDAX
// import allCategories from '../../../categories-rambdax.json'
import resolver from '../../../resolver.json'
import {ALL_CATEGORIES, Category, SnippetMode} from '../whole/whole.component.interfaces'
import {
  CodeSnippet,
  Data,
  DataCategory,
  SingleMethod,
} from './methods-data.service.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MethodsDataService {
  data: Data
  categories: DataCategory
  constructor() {
    this.data = allMethods
    this.categories = allCategories
  }
  getAllKeys() {
    return Object.keys(this.data)
  }
  getMethod(prop: string): SingleMethod {
    return this.data[prop]
  }
  getCategoryMethods(category: Category) {
    if (category === 'All') return this.getAllKeys()
    if (this.categories[category] === undefined) return this.getAllKeys()

    return this.categories[category]
  }
  isValidCategory(category: string) : category is Category {
    return this.categories[category] !== undefined
  }
  getCategoryData(input: {
    currentFilter: Category, 
    prop?: keyof Data, 
    methodCategories: string[]
  }): {activeIndex: number, methodIndexes: number[], visibleMethods: string[]} {
    
    const methodIndexes = []
    
    if(input.methodCategories.length > 0){
      ALL_CATEGORIES.forEach((category, i) => {
        if(input.methodCategories.includes(category)){
          methodIndexes.push(i)
        }
      })
    }
    
    if(input.currentFilter === 'All'){

      return {
        activeIndex: 0,
        methodIndexes,
        visibleMethods: this.getAllKeys()
      }
    }

    const activeIndex = ALL_CATEGORIES.indexOf(input.currentFilter)
    const visibleMethods = this.categories[input.currentFilter]
    return {
      activeIndex,
      methodIndexes,
      visibleMethods
    }
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
