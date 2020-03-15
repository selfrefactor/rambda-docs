import 'codemirror/mode/javascript/javascript'
import {enableProdMode} from '@angular/core'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import * as R from 'rambdax'
window.R = R

import {AppModule} from './app/app.module'
import {environment} from './environments/environment'

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err))
