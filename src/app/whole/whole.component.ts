import {ActivatedRoute, Router} from '@angular/router'
// import roughjs from 'roughjs/bin/rough'
// https://github.com/selfrefactor/rambda-docs/blob/4456ae2b9a513df560680485f8b080574e845331/src/app/app.module.ts
import 'wired-elements'
import {Component, OnInit} from '@angular/core'
import {handleReplChange} from '../_modules/handle-repl-change'
import {MethodsDataService} from '../services/methods-data.service'
import {
  Mode,
  ALL_MODES,
  EmptyMethod,
  SingleMode,
  SnippetMode,
  Category,
  ALL_CATEGORIES,
  DefaultMode,
} from './whole.component.interfaces'
import {SingleMethod} from '../services/methods-data.service.interfaces'

function parseExplanation(explanation) {
  if (!explanation) return []
  if (!explanation.includes('\n')) return [explanation]

  return explanation.split('\n')
}

function fixReplInput(replInput: string) {  
  if(replInput.startsWith('const result')) return replInput

  return `const result = ${replInput}`
}

const SEPARATOR = '--'

@Component({
  selector: 'app-whole',
  templateUrl: './whole.component.html',
  styleUrls: ['./whole.component.scss'],
})
export class WholeComponent implements OnInit {
  activeCategory: Category = 'All'
  activeCategoryIndex = 0
  activeMethod: string
  allCategories = ALL_CATEGORIES
  allMethods: string[]
  allModes = ALL_MODES
  allTypings = ''
  codeSnippetMode: SnippetMode = DefaultMode
  currentCodeSnippet = ''
  data: SingleMethod = EmptyMethod
  explanation: string[] = []
  highlightBackground = '#25252A'
  methodCategoriesIndexes: number[] = []
  replEvaluateLock = false
  replResult = ''
  selectedMethod = ''
  selectedMode: Mode = DefaultMode
  visibleMethods: string[]
  replInitialState: string

  constructor(
    private route: ActivatedRoute,
    private dataService: MethodsDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.allMethods = this.dataService.getAllKeys()
    this.visibleMethods = this.allMethods
    this.route.params.subscribe(routeParams => {
      if (routeParams.method === undefined) return

      const [method, category] = routeParams.method.split(SEPARATOR)
      this.onRouteChange(method, category)
    })
  }

  onRouteChange(method?: string, category?: string) {
    console.log({method, category})

    if (!method && category) {
      // No method selected; only filter methods on home page
      // ============================================
      return this.handleHomePageFilter(category)
    }

    if (!this.allMethods.includes(method)) return console.log('skip')
    
    const actualCategory = this.dataService.isValidCategory(category) ? category : 'All'
    this.selectMethod(method, actualCategory)
  }

  selectMethod(method: string, category: Category) {
    this.selectedMethod = method

    this.data = this.dataService.getMethod(method)
    this.replInitialState = fixReplInput(this.data.example)
    
    this.explanation = parseExplanation(this.data.explanation)

    const categoryData = this.dataService.getCategoryData({
      currentFilter: this.activeCategory,
      prop: method,
      methodCategories: this.data.categories,
    })
    this.visibleMethods = categoryData.visibleMethods
    this.methodCategoriesIndexes = categoryData.methodIndexes
    this.activeCategoryIndex = categoryData.activeIndex

    if (this.codeSnippetMode !== DefaultMode) {
      this.codeSnippetMode = DefaultMode
    }

    const prop = this.dataService.getDataKey(this.codeSnippetMode)
    this.currentCodeSnippet = this.dataService.applyHighlighter(
      this.data[prop]
    )
    if (!this.data.allTypings) return

    this.allTypings = this.dataService.applyHighlighter(this.data.allTypings)
  }

  handleHomePageFilter(category: string) {
    if (!this.dataService.isValidCategory(category)) return
    const categoryData = this.dataService.getCategoryData({
      currentFilter: category,
      prop: undefined,
      methodCategories: [],
    })

    this.activeCategory = category
    this.visibleMethods = categoryData.visibleMethods
    this.activeCategoryIndex = categoryData.activeIndex
    this.methodCategoriesIndexes = categoryData.methodIndexes
  }

  async onReplChange(newReplContent: string) {
    if (this.replEvaluateLock) return
    this.replEvaluateLock = true
    this.replResult = await handleReplChange(newReplContent)
    this.replEvaluateLock = false
  }

  selectMode(input: SingleMode) {
    console.log({input, a: this.codeSnippetMode})
    // this.selectedMethod = input.mode
  }

  selectCategory(newCategory: Category) {
    if (this.activeCategory === newCategory) return

    this.router
      .navigate([`/${this.selectedMethod}${SEPARATOR}${newCategory}`])
      .then(e => {
        if (e) {
          console.log('Navigation is successful!')
        } else {
          console.log('Navigation has failed!')
        }
      })
    // this.activeCategory = newCategory
  }

  getCategoryClass(category: Category, index: number) {
    if (this.activeCategoryIndex === index) {
      return 'category__active--category'
    }
    if (this.methodCategoriesIndexes.includes(index)) {
      return 'category__active--method'
    }
    return 'category__item'
  }
}

/*
					<!-- [class.activeClass]="codeSnippetMode===singleMode.mode" -->
  
*/
