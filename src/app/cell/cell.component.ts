import {Component, Input, HostBinding, OnInit} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {ok, shuffle} from 'rambdax'

const possibleOutlineColors = ['pink', 'green', 'red', 'blue', 'purple']

interface TopLeft {
  x: number
  y: number
}

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
})
export class CellComponent implements OnInit {
  @Input() outline: boolean
  @Input() width: number
  @Input() height: number
  @Input() topLeft: TopLeft
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    ok(this.width, this.height, this.topLeft)(Number, Number, {x: Number, y: Number})
  }
  @HostBinding('style.grid-row')
  get gridRow() {
    return this.sanitizer.bypassSecurityTrustStyle(`${this.topLeft.y + 1} / span ${this.height}`)
  }
  @HostBinding('style.grid-column')
  get gridColumn() {
    return this.sanitizer.bypassSecurityTrustStyle(`${this.topLeft.x + 1} / span ${this.width}`)
  }
  @HostBinding('style.outline')
  get outlineCell() {
    return this.outline ? `1px solid ${shuffle(possibleOutlineColors)[0]}` : null
  }

  getStyle() {
    return {
      background: 'grey',
      outline: '1px solid pink',
    }
  }
}
