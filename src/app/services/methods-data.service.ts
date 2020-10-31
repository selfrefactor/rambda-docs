import {Injectable} from '@angular/core'
import {interpolate, switcher, replace, equals} from 'rambdax'
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
  getMethod(prop: string) {
    return this.data[prop]
  }
  getCategoryMethods(category: Category) {
    if (category === 'All') return this.getAllKeys()
    if (this.categories[category] === undefined) return this.getAllKeys()

    return this.categories[category]
  }
  getActiveCategoryIndexes(input: {
    // prevState: number[],
    currentFilter: Category, 
    prop: keyof Data, 
    methodCategories: string[]
  }) {
    if(input.currentFilter === 'All'){
      const methodIndexes = []
      
      ALL_CATEGORIES.forEach((category, i) => {
        console.log({category, i}, input.methodCategories)
        if(input.methodCategories.includes(category)){
          methodIndexes.push(i)
        }
      })

      return {
        activeIndex: 0,
        methodIndexes
      }
    }
    // const isGenericState = equals([0], input.prevState)
    // if(isGenericState)
    // console.log({prop, methodCategories})  
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
