import {playwrightInit, Resolution} from 'playwright-init'
import {wrap} from 'playwright-wrap'
import {ms} from 'string-fn'
import { delay, mapAsyncLimit } from 'rambdax'
const urlBase = 'http://localhost:4200'
const methodUrl = `${urlBase}/all`

jest.setTimeout(ms('5 minutes'))

interface TestData{
  label: string
  screen: Resolution
}

const TEST_DATA: TestData[] = [
  {label: 'tiny', screen: {x: 1024, y: 768}},
  {label: 'smaller', screen: {x: 1280, y: 720}},
  {label: 'small', screen: {x: 1366, y: 768}},
  {label: 'medium', screen: {x: 1600, y: 900}},
  {label: 'big', screen: {x: 1920, y: 1080}},
  {label: 'huge', screen: {x: 2256, y: 1504}},
]

async function testIterator(input: TestData){
  const {browser, page} = await playwrightInit({
    resolution: input.screen,
    headless: true,
    logFlag: false,
    browser: 'chromium',
    url: methodUrl,
  })
  try {
    const _ = wrap(page)
    await delay(8000)
    await _.snap(input.label)
    await browser.close()
    return input.label
  } catch (error) {
    console.log(error, 'try.catch')
    await browser.close()
    return false
  }
}

test('happy', async () => {
  console.time('snap')
  const result = await mapAsyncLimit(testIterator, 3, TEST_DATA)
  console.log({result})
  console.timeEnd('snap')
})