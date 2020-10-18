import {Injectable} from '@angular/core'
import allMethods from '../../../data.json'

export interface SingleMethod {
  allTypings: string,
  categories?: string[],
  example?: string,
  explanation?: string,
  notes?: string,
  rambdaSource: string,
  rambdaSpecs?: string,
  typing: string,
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
  getAllKeys() {
    return Object.keys(this.data)
  }
  getMethod(prop: string) {
    return this.data[prop]
  }
}
