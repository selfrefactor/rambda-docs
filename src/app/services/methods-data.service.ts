import {Injectable} from '@angular/core'
import {interpolate, switcher, head} from 'rambdax'
// WITH_RAMBDAX
// import allMethods from '../../../new-data-rambdax.json'
// WITHOUT_RAMBDAX
import allCategories from '../../../categories.json'
// WITHOUT_RAMBDAX
import allMethods from '../../../assets/new-data.json'
// WITH_RAMBDAX
// import allCategories from '../../../categories-rambdax.json'
import resolver from '../../../assets/resolver.json'
import {
  ALL_CATEGORIES,
  Category,
  SnippetMode,
} from '../whole/whole.component.interfaces'
import {
  CodeSnippet,
  Data,
  DataCategory,
  SingleMethod,
} from './methods-data.service.interfaces'
import FuzzySet from 'fuzzyset'

interface Fuzzy{
  get: (x:string)=> [number, string][]
}

const FUZZY_LIMIT = 0.3
const FUZZY_CONSERVATIVE_LIMIT = 0.5

@Injectable({
  providedIn: 'root',
})
export class MethodsDataService {
  data: Data
  categories: DataCategory
  fuzzy: Fuzzy
  fuzzyConservative: Fuzzy
  constructor() {
    this.data = allMethods
    this.categories = allCategories
    this.fuzzy = FuzzySet(Object.keys(allMethods), false, 1, 2)
    this.fuzzyConservative = FuzzySet(Object.keys(allMethods), true, 2, 3)
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
  isValidCategory(category: any): category is Category {
    if (!category) return false
    if (category === 'All') return true
    return this.categories[category] !== undefined
  }
  getFirstMethodForCategory(category: Category) {
    return head(this.categories[category])
  }

  getCategoryData(input: {
    currentFilter: Category,
    methodCategories: string[],
  }): {
      activeIndex: number,
      methodIndexes: number[],
      visibleMethods: string[],
    } {
    const methodIndexes = []

    if (input.methodCategories.length > 0) {
      ALL_CATEGORIES.forEach((category, i) => {
        if (input.methodCategories.includes(category)) {
          methodIndexes.push(i)
        }
      })
    }

    if (input.currentFilter === 'All') {
      return {
        activeIndex: 0,
        methodIndexes,
        visibleMethods: this.getAllKeys(),
      }
    }

    const activeIndex = ALL_CATEGORIES.indexOf(input.currentFilter)
    const visibleMethods = this.categories[input.currentFilter]
    return {
      activeIndex,
      methodIndexes,
      visibleMethods,
    }
  }

  applySearch(searchString: string) {
    const fuzzyResult = this.fuzzy.get(searchString)
      .filter(([score]) => score > FUZZY_LIMIT)
      .map(([, x]) => x)
    const fuzzyResultConservative = this.fuzzyConservative.get(searchString)
      .filter(([score]) => score > FUZZY_CONSERVATIVE_LIMIT)

      const diff =  fuzzyResult.length - fuzzyResultConservative.length
      if(diff > 20 && fuzzyResultConservative.length === 0) return []
      
    return fuzzyResult
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
