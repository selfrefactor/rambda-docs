import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {FooComponent} from './foo/foo.component'
import {GridComponent} from './grid/grid.component'
import {SingleMethodComponent} from './single-method/single-method.component'
import {WholeComponent} from './whole/whole.component'

const routes: Routes = [
  {path: '', component: WholeComponent},
  {path: ':method', component: WholeComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
