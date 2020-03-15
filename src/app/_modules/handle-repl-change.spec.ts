import {addConst, handleReplChange} from './handle-repl-change'

test('adds const when it is missing', () => {
  const withoutConst = 'R.add(1,2)'
  const withConst = `const result = ${withoutConst}`
  const expected = `"const result = R.add(1,2)"`
  expect(addConst(withoutConst)).toMatchInlineSnapshot(expected)
  expect(addConst(withConst)).toMatchInlineSnapshot(expected)
})
