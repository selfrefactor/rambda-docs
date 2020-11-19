import {ms} from 'string-fn'
import {mapAsync} from 'rambdax'
const urlBase = 'http://localhost:4200'
const testUrl = `${urlBase}/all`
import {TestData, snap} from './snap'

jest.setTimeout(ms('2 minutes'))

const TEST_DATA: TestData[] = [
  {label: 'tiny', screen: {x: 1024, y: 768}},
  {label: 'smaller', screen: {x: 1280, y: 720}},
  {label: 'small', screen: {x: 1366, y: 768}},
  {label: 'medium', screen: {x: 1600, y: 900}},
  {label: 'big', screen: {x: 1920, y: 1080}},
  {label: 'huge', screen: {x: 2256, y: 1504}},
]

test('happy', async() => {
  console.time('snap')
  await mapAsync(async x => {
    await snap(testUrl, x)
  }, TEST_DATA)
  console.timeEnd('snap')
})
