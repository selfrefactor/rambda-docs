import {Component, OnInit, Input, HostBinding} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'

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
})
export class CellComponent implements OnInit {
  @Input() width: number
  @Input() height: number
  @Input() topLeft: TopLeft
  @Input() evalStyle: any
  @HostBinding('style.color') color = 'grey'
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // console.log({h: this.height, w: this.width, ty: this.topLeft, ev: this.evalStyle})
  }
  @HostBinding('style.grid-row')
  get gridRow() {
    return this.sanitizer.bypassSecurityTrustStyle(`${this.topLeft.y + 1} / span ${this.height}`)
  }
  @HostBinding('style.grid-column')
  get gridColumn() {
    return this.sanitizer.bypassSecurityTrustStyle(`${this.topLeft.x + 1} / span ${this.width}`)
  }

  getStyle() {
    return {
      background: 'grey',
      'grid-column': `${zeroBasedOrder(this.topLeft.x)} / span ${this.width}`,
      'grid-row': `${zeroBasedOrder(this.topLeft.y)} / span ${this.height}`,
    }
  }
}
