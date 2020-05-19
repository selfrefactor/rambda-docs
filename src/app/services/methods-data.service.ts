import {Injectable} from '@angular/core'
import allMethods from '../../../data.json'

interface SingleMethod {
  rambdaSource: string,
}

interface Data {
  [key: string]: SingleMethod,
}

@Injectable({
  providedIn: 'root',
})
export class MethodsDataService {
  data: Data
  constructor() {
    this.data = allMethods
  }
  getMethodsList() {
    return Object.keys(this.data)
  }
}
