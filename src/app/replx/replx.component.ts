import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core'
import {
  MonacoEditorComponent,
} from '@materia-ui/ngx-monaco-editor'
import {OnChange} from 'property-watch-decorator'

@Component({
  selector: 'app-replx',
  templateUrl: './replx.component.html',
  styleUrls: ['./replx.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReplxComponent implements OnInit {
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

  @OnChange<string>(function(this: ReplxComponent, code: string) {
    console.log({code})
  })
  code = 'const a = 1'

  ngOnInit() {
    console.log('init replx')
  }

  // changeMonacoSettings() {
  //   setTimeout(() => {
  // this.editor.editor?.focus();
  //   }, 0);
  // }
}
