import {Component, OnInit, Input, Output, ViewChildren, QueryList} from '@angular/core'

interface TopLeft {
  x: number
  y: number
}

function zeroBasedOrder(x) {
  return x + 1
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
    // console.log({h: this.height, w: this.width, ty: this.topLeft, ev: this.evalStyle})
  }
  getStyle() {
    return {
      background: 'grey',
      'grid-column': `${zeroBasedOrder(this.topLeft.x)} / span ${this.width}`,
      'grid-row': `${zeroBasedOrder(this.topLeft.y)} / span ${this.height}`,
    }
  }
}
