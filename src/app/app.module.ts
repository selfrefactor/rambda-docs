import {HttpClientModule} from '@angular/common/http'
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {FooComponent} from './foo/foo.component'
import {MatSliderModule} from '@angular/material/slider'
import {GridComponent} from './grid/grid.component'
import {CellComponent} from './cell/cell.component'
import {SubGridComponent} from './sub-grid/sub-grid.component'
import {SingleMethodComponent} from './single-method/single-method.component'
import {WholeComponent} from './whole/whole.component'
import {GridFnComponent} from 'grid-fn'
import {ReplComponent} from './repl/repl.component'
import {CodemirrorModule} from '@ctrl/ngx-codemirror'

@NgModule({
  declarations: [
    AppComponent,
    FooComponent,
    GridComponent,
    CellComponent,
    SubGridComponent,
    SingleMethodComponent,
    WholeComponent,
    GridFnComponent,
    ReplComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CodemirrorModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
