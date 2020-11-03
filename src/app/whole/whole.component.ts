import {ActivatedRoute, Router} from '@angular/router'
// import roughjs from 'roughjs/bin/rough'
// https://github.com/selfrefactor/rambda-docs/blob/4456ae2b9a513df560680485f8b080574e845331/src/app/app.module.ts
import 'wired-elements'
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {handleReplChange} from '../_modules/handle-repl-change'
import {MethodsDataService} from '../services/methods-data.service'
import {
  ALL_SNIPPET_MODES,
  EmptyMethod,
  SnippetMode,
  Category,
  ALL_CATEGORIES,
  DefaultSnippetMode,
} from './whole.component.interfaces'
import {SingleMethod} from '../services/methods-data.service.interfaces'
import {fromEvent} from 'rxjs'
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators'

function parseExplanation(explanation) {
  if (!explanation) return []
  if (!explanation.includes('\n')) return [explanation]

  return explanation.split('\n')
}

function fixReplInput(replInput: string) {
  if (replInput.includes('const result')) return replInput

  return `const result = ${replInput}`
}

function getVisibleSnippetModes(input: SingleMethod): SnippetMode[] {
  return ALL_SNIPPET_MODES.filter(snippetMode =>
    Boolean(input[snippetMode.mode])
  )
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
  typescriptDefinition = ''
  searchText = ''
  codeSnippetMode: SnippetMode = DefaultSnippetMode
  currentSnippetModes: SnippetMode[] = []
  currentCodeSnippet = ''
  data: SingleMethod = EmptyMethod
  explanation: string[] = []
  highlightBackground = '#25252A'
  methodCategoriesIndexes: number[] = []
  replEvaluateLock = false
  replResult = ''
  selectedMethod = ''
  selectedSnippedMode: SnippetMode = DefaultSnippetMode
  visibleMethods: string[]
  searchActive = false
  searchResults: string[]
  replInitialState: string
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef

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

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value
        }),
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe(text => this.applySearch(text))
  }

  onRouteChange(method?: string, category?: string) {
    if (!method && category) {
      /*
      No method selected; only filter methods on home page
      */
      return this.handleHomePageFilter(category)
    }

    if (method === this.activeMethod && category) return console.log('skip')
    if (method !== this.activeMethod && category) {
      /*
        Selected category while on method page
      */
      return this.handleMethodPageFilter(method, category)
    }

    if (!this.allMethods.includes(method)) return console.log('skip')

    this.selectMethod(method)
  }

  selectMethod(method: string) {
    this.selectedMethod = method

    this.data = this.dataService.getMethod(method)

    /*
      Can be removed once all examples are fixed
    */
    this.replInitialState = fixReplInput(this.data.example)

    /*
      Need better solution
    */
    this.explanation = parseExplanation(this.data.explanation)

    /*
      Show only code snippet modes that we have data for
    */
    this.currentSnippetModes = getVisibleSnippetModes(this.data)

    const categoryData = this.dataService.getCategoryData({
      currentFilter: this.activeCategory,
      methodCategories: this.data.categories,
    })
    this.visibleMethods = categoryData.visibleMethods
    this.methodCategoriesIndexes = categoryData.methodIndexes
    this.activeCategoryIndex = categoryData.activeIndex

    /*
      This defines that each method change resets snippet mode - this might change
    */
    if (this.codeSnippetMode !== DefaultSnippetMode) {
      this.codeSnippetMode = DefaultSnippetMode
    }

    const prop = this.dataService.getDataKey(this.codeSnippetMode)
    this.currentCodeSnippet = this.dataService.applyHighlighter(
      this.data[prop]
    )

    this.typescriptDefinition = this.dataService.applyHighlighter(
      this.data.typing
    )
  }

  handleHomePageFilter(category: string) {
    if (!this.dataService.isValidCategory(category)) return
    const categoryData = this.dataService.getCategoryData({
      currentFilter: category,
      methodCategories: [],
    })

    this.activeCategory = category
    this.visibleMethods = categoryData.visibleMethods
    this.activeCategoryIndex = categoryData.activeIndex
    this.methodCategoriesIndexes = categoryData.methodIndexes
  }

  handleMethodPageFilter(method: string, category: string) {
    if (!this.dataService.isValidCategory(category))
      return console.log('skip as invalid category')

    this.activeCategory = category
    this.selectMethod(method)
  }

  async onReplChange(newReplContent: string) {
    if (this.replEvaluateLock) return
    this.replEvaluateLock = true
    this.replResult = await handleReplChange(newReplContent)
    this.replEvaluateLock = false
  }

  selectMode(newMode: SnippetMode) {
    if (newMode.mode === this.codeSnippetMode.mode) return

    this.currentCodeSnippet = this.dataService.applyHighlighter(
      this.data[newMode.mode]
    )
    this.codeSnippetMode = newMode
  }

  getRedirectPath(category: Category, i: number) {
    const requireMethodChange =
      !this.methodCategoriesIndexes.includes(i) && category !== 'All'

    if (requireMethodChange) {
      const newMethod = this.dataService.getFirstMethodForCategory(category)

      return `/${newMethod}${SEPARATOR}${category}`
    }

    return `/${this.selectedMethod}${SEPARATOR}${category}`
  }

  selectCategory(newCategory: Category, i: number) {
    if (this.activeCategory === newCategory)
      return console.log('skip select category')

    this.router.navigate([this.getRedirectPath(newCategory, i)])
  }

  applySearch(searchString) {
    if (searchString === '') {
      return this.searchActive = false
    }

    this.searchResults = this.dataService.applySearch(searchString)
    if (!this.searchActive) this.searchActive = true
  }

  getCategoryClass(index: number) {
    const methodCategoriesIndexes = [0, ...this.methodCategoriesIndexes]
    if (
      this.activeCategoryIndex === index &&
      methodCategoriesIndexes.includes(index)
    ) {
      return 'category__active--both'
    }
    if (this.activeCategoryIndex === index) {
      return 'category__active--category'
    }
    if (methodCategoriesIndexes.includes(index)) {
      return 'category__active--method'
    }
    return 'category__item'
  }
}
