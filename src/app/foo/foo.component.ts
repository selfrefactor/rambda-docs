import {Component, OnInit, OnChanges} from '@angular/core'

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss'],
})
export class FooComponent implements OnInit {
  name = 'foo'
  constructor() {}

  ngOnInit() {
    console.log(1)
  }
}
