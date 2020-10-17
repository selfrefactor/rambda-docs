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
  selector: 'app-single-method',
  templateUrl: './single-method.component.html',
  styleUrls: ['./single-method.component.scss'],
})
export class SingleMethodComponent implements OnInit {
  activeMethod: string
  data: SingleMethod
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.activeMethod = routeParams.method
      this.data = allData[routeParams.method]
    })
  }
}
