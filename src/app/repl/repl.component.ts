import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  OnChanges,
} from '@angular/core'
import {MonacoEditorComponent} from '@materia-ui/ngx-monaco-editor'
import {OnChange} from 'property-watch-decorator'

@Component({
  selector: 'app-repl',
  templateUrl: './repl.component.html',
  styleUrls: ['./repl.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReplComponent implements OnInit, OnChanges {
  @ViewChild(MonacoEditorComponent, {static: false})
  editor: MonacoEditorComponent
  editorOptions = {
    theme: 'vs', // 'vs-dark' 'hc-black' 'vs'
    language: 'typescript',
    fontSize: 17,
    contextmenu:false,
    codeLens: false,
    quickSuggestionsDelay: 1000,
    showUnused: false,
    copyWithSyntaxHighlighting: false,
    lineHeight: 19,
    disableMonospaceOptimizations: true,
    cursorBlinking: 'smooth', // "blink" | "smooth" | "phase" | "expand" | "solid"
    lineNumbers: false,
    minimap: {
      enabled: false,
    },
    fixedOverflowWidgets: true,
  }
  @Output() outputReplEvent = new EventEmitter<string>()
  @Input() initialState: string

  @OnChange<string>(function(this: ReplComponent, code: string) {
    this.outputReplEvent.emit(code)
  })
  code = ''

  ngOnChanges() {
    this.code = this.initialState
  }
  ngOnInit() {
    setTimeout(() => {
      this.code = this.initialState
    }, 0)
  }

  // changeMonacoSettings() {
  //   setTimeout(() => {
  // this.editor.editor?.focus();
  //   }, 0);
  // }
}
