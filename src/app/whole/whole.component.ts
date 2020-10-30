import {ActivatedRoute} from '@angular/router'
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
} from './whole.component.interfaces'
import {SingleMethod} from '../services/methods-data.service.interfaces'

function parseExplanation(explanation) {
  if (!explanation) return ['']
  if (!explanation.includes('\n')) return [explanation]

  return explanation.split('\n')
}

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
  explanation: string[] = ['']
  currentCodeSnippet = ''
  codeSnippetMode: SnippetMode = 'source'
  allTypings = ''
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
    this.explanation = parseExplanation(this.data.explanation)

    console.log(this.data.explanation.includes('\n'))
    if (this.codeSnippetMode !== 'source') {
      this.codeSnippetMode = 'source'
    }

    const prop = this.dataService.getDataKey(this.codeSnippetMode)
    this.currentCodeSnippet = this.dataService.applyHighlighter(
      this.data[prop]
    )
    if (!this.data.allTypings) return

    this.allTypings = this.dataService.applyHighlighter(this.data.allTypings)
  }

  onRouteChange(method: string) {
    if (!this.allMethods.includes(method)) return

    this.selectMethod(method)
  }

  ngAfterViewInit() {}

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
