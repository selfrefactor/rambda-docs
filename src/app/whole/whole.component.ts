import {Component, OnInit} from '@angular/core'
import {Router, ActivatedRoute} from '@angular/router'
import {handleReplChange} from '../_modules/handle-repl-change'
import { MethodsDataService } from '../services/methods-data.service'

interface SingleMethod {
  name: string,
  example: string,
}
const add: SingleMethod = {
  name: 'add',
  example: 'R.add(1,2)',
}
const update: SingleMethod = {
  name: 'update',
  example: 'R.update(0,10, [1,2,3])',
}
const defaultMethod: SingleMethod = {
  name: '',
  example: '',
}

const allData = {
  add,
  update,
}

@Component({
  selector: 'app-whole',
  templateUrl: './whole.component.html',
  styleUrls: ['./whole.component.scss'],
})
export class WholeComponent implements OnInit {
  activeMethod: string
  data: SingleMethod = add
  notExist = false
  replEvaluateLock = false
  replResult = ''
  allMethods: Array<string>

  constructor(private route: ActivatedRoute, private router: Router, private dataService: MethodsDataService) {}

  ngOnInit() {
    this.init()
    this.route.params.subscribe(routeParams => {
      this.activeMethod = routeParams.method
      console.log(routeParams.method)
      if (!allData[routeParams.method]) {
        return this.notExist = true
      }

      // if (this.notExist)       this.notExist = false;
      if (this.notExist) this.notExist = false

      this.data = allData[routeParams.method]
    })
  }
  init(){
    this.allMethods = this.dataService.getAllKeys()
  }

  changeMethod(e: string) {
    console.log(e)
  }

  async onReplChange(newReplContent: string) {
    if (this.replEvaluateLock) return
    this.replEvaluateLock = true
    this.replResult = await handleReplChange(newReplContent)
    this.replEvaluateLock = false
  }
}
