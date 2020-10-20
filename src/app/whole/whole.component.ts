import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {handleReplChange} from '../_modules/handle-repl-change'
import {MethodsDataService} from '../services/methods-data.service'
import {
  Mode,
  ALL_MODES,
  EmptyMethod,
  SingleMode,
  SnippetMode,
} from './whole.component.interfaces'
import {SingleMethod} from '../services/methods-data.service.interfaces'
import {remove} from 'rambdax'

@Component({
  selector: 'app-whole',
  templateUrl: './whole.component.html',
  styleUrls: ['./whole.component.scss'],
})
export class WholeComponent implements OnInit {
  activeMethod: string
  allMethods: string[]
  data: SingleMethod = EmptyMethod
  replEvaluateLock = false
  replResult = ''
  selectedMethod = ''
  currentCodeSnippet = ''
  codeSnippetMode: SnippetMode = 'source'
  selectedMode: Mode = 'repl'
  allModes = ALL_MODES

  constructor(
    private route: ActivatedRoute,
    private dataService: MethodsDataService
  ) {}

  ngOnInit() {
    this.allMethods = this.dataService.getAllKeys()

    this.route.params.subscribe(routeParams => {
      this.onRouteChange(routeParams.method)
    })
  }

  selectMethod(method) {
    this.selectedMethod = method

    this.data = this.dataService.getMethod(method)

    if (this.codeSnippetMode !== 'source') {
      this.codeSnippetMode = 'source'
    }

    const prop = this.dataService.getDataKey(this.codeSnippetMode)
    const currentCodeSnippetRaw = this.dataService.applyHighlighter(
      this.data[prop]
    )
    this.currentCodeSnippet = remove([
      '<pre class="shiki" style="background-color: #2e3440">',
      '</pre>',
    ])(currentCodeSnippetRaw)
    console.log(this.currentCodeSnippet)
  }

  onRouteChange(method: string) {
    if (!this.allMethods.includes(method)) return

    this.selectMethod(method)
  }

  async onReplChange(newReplContent: string) {
    // Safeguard for async methods combined with change of mode
    // ============================================
    if (this.selectedMode !== 'repl') return

    if (this.replEvaluateLock) return
    this.replEvaluateLock = true
    this.replResult = await handleReplChange(newReplContent)
    this.replEvaluateLock = false
  }

  selectMode(input: SingleMode) {
    this.selectedMethod = input.mode
  }
}
