import {Component, EventEmitter, OnInit,Input, Output, ViewChild, ViewEncapsulation, OnChanges} from '@angular/core'
import {MonacoEditorComponent} from '@materia-ui/ngx-monaco-editor'
import {OnChange} from 'property-watch-decorator'

@Component({
  selector: 'app-replx',
  templateUrl: './replx.component.html',
  styleUrls: ['./replx.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReplxComponent implements OnInit, OnChanges {
  @ViewChild(MonacoEditorComponent, {static: false})
  editor: MonacoEditorComponent
  editorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    fontSize: 19,
    minimap: {
      enabled: false,
    },
    fixedOverflowWidgets: true,
  }
  @Output() outputReplEvent = new EventEmitter<string>()
  @Input() initialState: string

  @OnChange<string>(function(this: ReplxComponent, code: string) {
    this.outputReplEvent.emit(code)
  })
  code = ''

  ngOnChanges() {
    this.code = this.initialState
  }
  ngOnInit() {
    console.log('init replx', this.initialState)
    setTimeout(() => {
      this.code = this.initialState
    }, 0);
  }

  // changeMonacoSettings() {
  //   setTimeout(() => {
  // this.editor.editor?.focus();
  //   }, 0);
  // }
}
