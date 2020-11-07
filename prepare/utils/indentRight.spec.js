import { indentRight } from './indentRight'
import {add} from '../../data.json'

test('R.add', () => {
  indentRight(add.rambdaSource)
})