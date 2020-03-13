import {Component, OnInit, Input, Output, ViewChildren, QueryList
} from '@angular/core'

interface TopLeft{
  x: number
  y: number
}

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  @Input() width: number
  @Input() height: number
  @Input() topLeft: TopLeft
  @Input() evalStyle: any
  constructor() {}

  ngOnInit(): void {
    console.log({w: this.width, ty: this.topLeft, ev: this.evalStyle})
  }
}
