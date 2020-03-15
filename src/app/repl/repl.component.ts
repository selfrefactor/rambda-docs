import {OnDestroy, Component, OnInit, Output, EventEmitter} from '@angular/core'
import {Subject} from 'rxjs'
import {debounceTime} from 'rxjs/operators'

@Component({
  selector: 'app-repl',
  templateUrl: './repl.component.html',
  styleUrls: ['./repl.component.scss'],
})
export class ReplComponent implements OnInit, OnDestroy {
  content: any
  @Output() outputReplEvent = new EventEmitter<string>()
  debouncer: Subject<string> = new Subject<string>()

  constructor() {}

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(1000)).subscribe(value => this.outputReplEvent.emit(value))
  }

  handleChange(e: string) {
    this.debouncer.next(e)
  }
  ngOnDestroy() {
    this.debouncer.unsubscribe()
  }
}
