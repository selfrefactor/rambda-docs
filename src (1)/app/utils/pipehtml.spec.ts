import {PurehtmlPipe} from './purehtml.pipe'
import {emptySanityzer, purehtmlTestInput} from './mocks'

test('happy', () => {
  const pipeInstance = new PurehtmlPipe(emptySanityzer)
  expect(pipeInstance.transform('')).toBe('')

  const result = pipeInstance.transform(purehtmlTestInput)
  expect(result).toBe(purehtmlTestInput)
})
