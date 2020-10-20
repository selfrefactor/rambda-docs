import {HttpClientModule} from '@angular/common/http'
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {MatSliderModule} from '@angular/material/slider'
import {SingleMethodComponent} from './single-method/single-method.component'
import {WholeComponent} from './whole/whole.component'
import {CellComponent, GridComponent, SubGridComponent} from 'grid-fn'
import {MonacoEditorModule} from '@materia-ui/ngx-monaco-editor'
import {ReplComponent} from './repl/repl.component'
import {PurehtmlPipe} from './utils/purehtml.pipe'

@NgModule({
  declarations: [
    PurehtmlPipe,
    AppComponent,
    GridComponent,
    CellComponent,
    SubGridComponent,
    SingleMethodComponent,
    WholeComponent,
    ReplComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MonacoEditorModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
