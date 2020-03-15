import {map, type, anyPass, includes, unless} from 'rambdax'

const hasResultConst = anyPass([
  includes('const result ='),
  includes('const result='),
  includes('let result='),
  includes('let result ='),
])

export const addConst = unless(hasResultConst, x => `const result = ${x}`)

export function handleReplChange(codeRaw) {
  const code = addConst(codeRaw)
  return code
}
