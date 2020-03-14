import {Component, Input, HostBinding} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'

interface TopLeft {
  x: number
  y: number
}

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
})
export class CellComponent{
  @Input() width: number
  @Input() height: number
  @Input() topLeft: TopLeft
  @Input() evalStyle: any
  constructor(private sanitizer: DomSanitizer) {}

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
    }
  }
}
