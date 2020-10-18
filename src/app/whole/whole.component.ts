import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {handleReplChange} from '../_modules/handle-repl-change'
import {
  MethodsDataService,
  SingleMethod,
} from '../services/methods-data.service'
import {Mode, ALL_MODES, EmptyMethod, SingleMode } from './whole.component.interfaces'

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

  onRouteChange(method: string) {
    if (!this.allMethods.includes(method)) return

    this.selectedMethod = method
    this.data = this.dataService.getMethod(method)
    console.log(this.data)
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
