import {interpolate} from 'rambdax'
import resolver from '../../../resolver.json'

export function applyHighlighter(input) {
  return interpolate(input, resolver)
}
