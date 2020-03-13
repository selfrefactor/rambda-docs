import {Component, OnInit, Input, Output} from '@angular/core'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  demoContent = 'foo'
  @Input() background: string
  constructor() {}

  ngOnInit(): void {
    console.log(this.background)
  }
}
