import {HttpClientModule} from '@angular/common/http'
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
// import {MatSliderModule} from '@angular/material/slider'
import {WholeComponent} from './whole/whole.component'
import {CellComponent, GridComponent, SubGridComponent} from 'grid-fn'
import {MonacoEditorModule} from '@materia-ui/ngx-monaco-editor'
import {ReplComponent} from './repl/repl.component'
import {PurehtmlPipe} from './utils/purehtml.pipe';
import { InspectorModule } from '@ngneat/inspector';
// import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    PurehtmlPipe,
    GridComponent,
    CellComponent,
    SubGridComponent,
    WholeComponent,
    ReplComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    AppRoutingModule,
    InspectorModule.forRoot(),
    // environment.production ? [] : InspectorModule.forRoot(),
    // MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
