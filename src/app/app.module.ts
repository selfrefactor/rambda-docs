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
import {ReplComponent} from './repl/repl.component'
import {CodemirrorModule} from '@ctrl/ngx-codemirror'
import {CellComponent, GridComponent, SubGridComponent} from 'grid-fn'
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { ReplxComponent } from './replx/replx.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CellComponent,
    SubGridComponent,
    SingleMethodComponent,
    WholeComponent,
    ReplComponent,
    ReplxComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MonacoEditorModule,
    CodemirrorModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
