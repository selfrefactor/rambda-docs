import { HttpClient } from '@angular/common/http'
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
import {MonacoEditorComponent, MonacoEditorLoaderService} from '@materia-ui/ngx-monaco-editor'
import {OnChange} from 'property-watch-decorator'
import { delay } from 'rambdax'

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
    quickSuggestionsDelay: 700,
    showUnused: false,
    copyWithSyntaxHighlighting: false,
    lineHeight: 19, // should be dynamic
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
  attachToCode(){
    setTimeout(() => {
      this.code = this.initialState
    }, 10)
  }
  async loadTypescript(){
    await delay(1000)

    this.httpClient
            .get('files/rambda', { responseType: 'text' })
            .subscribe({
              next: data => {
                if((window as any).monaco === undefined) return console.log('skip definitions load');

                console.log('loaded definitions');

                (window as any).monaco.languages.typescript.typescriptDefaults.addExtraLib(
                  data,
                  ''
                );
              }
            });
  }

  ngOnInit() {
    this.attachToCode()
    this.loadTypescript()
  }

  constructor(
    private monacoLoader: MonacoEditorLoaderService,
    private httpClient: HttpClient,
  ){}
}
