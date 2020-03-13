import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {FooComponent} from './foo/foo.component'
import {WordsComponent} from './words/words.component'
import {GridComponent} from './grid/grid.component'

const routes: Routes = [
  {path: '', component: FooComponent},
  {path: 'grid', component: GridComponent},
  {path: 'words', component: WordsComponent},
  {path: 'foo', component: FooComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
