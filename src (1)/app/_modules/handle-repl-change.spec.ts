import * as R from 'rambdax'

import {addConst, handleReplChange} from './handle-repl-change'

test('adds const when it is missing', () => {
  const withoutConst = 'R.add(1,2)'
  const withConst = `const result = ${withoutConst}`
  const expected = '"const result = R.add(1,2)"'
  expect(addConst(withoutConst)).toMatchInlineSnapshot(expected)
  expect(addConst(withConst)).toMatchInlineSnapshot(expected)
})

test('sync', async () => {
  const code = `
  const fn = R.compose(
    R.join('|'),
    R.map(R.add(2)),
    R.filter(x => x > 2),
    R.map(x => x *2 )
  )
  const result = fn([1,2,3])  
  `
  const result = await handleReplChange(code, R)
  expect(result).toMatchInlineSnapshot('"\\"6|8\\""')
})

test('sync error', async () => {
  const code = `
  const result = R.compose(
    R.join('|'),
    R.map(),
  )(1)
  `
  const result = await handleReplChange(code, R)
  expect(result).toMatchInlineSnapshot('"fn is not a function"')
})

test('async', async () => {
  const code = `
  const result = R.composeAsync(
    x => ({x}),
    R.map(R.add(2)),
    R.filter(x => x > 2),
    R.map(x => x *2 )
  )([1,2,3])
  `
  const result = await handleReplChange(code, R)
  expect(result).toMatchInlineSnapshot(`
    "{
      \\"x\\": [
        6,
        8
      ]
    }"
  `)
})

test('async error', async () => {
  const code = `
  const result = R.composeAsync(
    R.map()
  )([1,2,3])
  `
  const result = await handleReplChange(code, R)
  expect(result).toMatchInlineSnapshot('"fn is not a function"')
})
