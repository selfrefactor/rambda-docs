import {playwrightInit, Resolution} from 'playwright-init'
import {wrap} from 'playwright-wrap'
import {ms} from 'string-fn'
import { delay, mapFastAsync } from 'rambdax'
const urlBase = 'http://localhost:4200'
const methodUrl = `${urlBase}/all`

jest.setTimeout(ms('5 minutes'))

interface TestData{
  label: string
  screen: Resolution
}

const TEST_DATA: TestData[] = [
  {label: 'small', screen: {x: 1024, y: 768}},
  {label: 'tiny', screen: {x: 1280, y: 720}},
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
    await delay(5000)
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
  const result = await mapFastAsync(testIterator, TEST_DATA)
  console.log({result})
})