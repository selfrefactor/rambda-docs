import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {handleReplChange} from '../_modules/handle-repl-change'
import {
  MethodsDataService,
  SingleMethod,
} from '../services/methods-data.service'

const EmptyMethod: SingleMethod = {
  example: '',
  allTypings: '',
  rambdaSource: '',
  typing: '',
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
    console.log(method, 'route method')
    if (!this.allMethods.includes(method)) return

    this.selectedMethod = method
    this.data = this.dataService.getMethod(method)
  }

  async onReplChange(newReplContent: string) {
    console.log({newReplContent})
    if (this.replEvaluateLock) return
    this.replEvaluateLock = true
    this.replResult = await handleReplChange(newReplContent)
    console.log(this.replResult, 'repl result')
    this.replEvaluateLock = false
  }
}
