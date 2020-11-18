import {HttpClient} from '@angular/common/http'
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
import {
  MonacoEditorComponent,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor'
import {OnChange} from 'property-watch-decorator'
import {take, filter} from 'rxjs/operators'

import {switcher, delay } from 'rambdax'

function getReplFontSize(forcedWindowHeight?: number): number {
  const height = forcedWindowHeight ? forcedWindowHeight : window.innerHeight
  const fontSize =  switcher<number>(height)
    .is((x: number) => x > 1200, 22)
    .is((x: number) => x > 1100, 19)
    .is((x: number) => x > 1000, 14)
    .is((x: number) => x > 800, 13)
    .default(12)

  return fontSize  
}

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
    theme: 'vs-dark', // 'hc-black', // 'vs' 'hc-black' 'vs-dark'
    language: 'typescript',
    fontSize: getReplFontSize(),
    contextmenu: false,
    codeLens: false,
    quickSuggestionsDelay: 700,
    showUnused: false,
    copyWithSyntaxHighlighting: false,
    lineHeight: 18, // should be dynamic
    disableMonospaceOptimizations: true,
    cursorBlinking: 'smooth', // "blink" | "smooth" | "phase" | "expand" | "solid"
    lineNumbers: false,
    minimap: {
      enabled: false,
    },
    fixedOverflowWidgets: true,
  }
  @Output() outputReplEvent = new EventEmitter<string>()
  @Output() setReplReadyEvent = new EventEmitter<void>()
  @Input() initialState: string

  @OnChange<string>(function(this: ReplComponent, code: string) {
    this.outputReplEvent.emit(code)
  })
  code = ''

  ngOnChanges() {
    this.code = this.initialState
  }
  attachToCode() {
    setTimeout(() => {
      this.code = this.initialState
    }, 10)
  }
  /*
    if(window.monaco)` are required in order to protect against previous bugs

    `files/ramda` is without extension on purpose as otherwise Angular CLI parses it
  */
  async loadTypescript() {
    this.monacoLoader.isMonacoLoaded$
      .pipe(
        filter(isLoaded => isLoaded),
        take(1)
      )
      .subscribe({
        next: () => {
          this.httpClient
            .get('files/rambda', {responseType: 'text'})
            .subscribe({
              next: data => {
                if ((window as any).monaco === undefined) {
                  return console.log('error in definitions load')
                }
                (window as any).monaco.languages.typescript.typescriptDefaults.addExtraLib(
                  data,
                  ''
                )
                delay(500).then(() => this.setReplReadyEvent.emit())
              },
            })
        },
      })
  }

  ngOnInit() {
    this.attachToCode()
    this.loadTypescript()
  }

  constructor(
    private monacoLoader: MonacoEditorLoaderService,
    private httpClient: HttpClient
  ) {}
}
