import {ms} from 'string-fn'
import {playwrightScreens} from 'playwright-screens'
import { WrapOutput } from 'playwright-wrap'
const urlBase = 'http://localhost:4200'
const testUrl = `${urlBase}/all`

jest.setTimeout(ms('2 minutes'))

function waitFor(_: WrapOutput) {
  return async() => {
    const el = await _.page.$('#test-id')
    if (!el) throw new Error('no element with #test-id')
    const replReadyIndicator = await el.getAttribute('data-repl-ready')

    return replReadyIndicator === 'true'
  }
}

async function waitForReady(_: WrapOutput){
  await _.waitForPredicate(waitFor(_), 10000)
  return true
}


test('happy', async() => {
  console.time('snap')

  await playwrightScreens({
    url: testUrl,
    waitForReady
  })
  console.timeEnd('snap')
})
