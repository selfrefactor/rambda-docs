import {Component, OnInit} from '@angular/core'
import {Router, ActivatedRoute} from '@angular/router'

interface SingleMethod {
  name: string
  example: string
}

const add: SingleMethod = {
  name: 'add',
  example: 'R.add(1,2)',
}
const update: SingleMethod = {
  name: 'update',
  example: 'R.update(0,10, [1,2,3])',
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
  data: SingleMethod
  notExist = false
  replResult = ''

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.activeMethod = routeParams.method
      if (!allData[routeParams.method]) {
        return (this.notExist = true)
      }

      if (this.notExist) this.notExist = false

      this.data = allData[routeParams.method]
    })
  }

  changeMethod(e) {
    console.log(e)
  }

  handleReplChange(newReplContent: string) {
    let replResult
    try {
      replResult = eval(newReplContent)
      this.replResult = replResult
    } catch (_) {}
    console.log(replResult)
  }
}
