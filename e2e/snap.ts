import { log } from 'helpers-fn'
import {playwrightInit, Resolution} from 'playwright-init'
import {wrap, WrapOutput} from 'playwright-wrap'

export interface TestData{
  label: string
  screen: Resolution
}

function waitForRepl(_: WrapOutput){
  return async () => {
    const el = await _.page.$('#test-id')
    if(!el) throw new Error('no element with #test-id')
    const replReadyIndicator = await el.getAttribute('data-repl-ready')

    return replReadyIndicator === 'true'
  }
}

export async function snap(url: string, input: TestData){
  log(input.label, 'info')
  const {browser, page} = await playwrightInit({
    resolution: input.screen,
    headless: true,
    logFlag: false,
    browser: 'chromium',
    url,
  })
  try {
    const _ = wrap(page)
    
    await _.waitForPredicate(waitForRepl(_), 10000)
    await _.snap(input.label)
    await browser.close()
    return input.label
  } catch (error) {
    console.log(error, 'try.catch')
    await browser.close()
    return false
  }
}
// const urlBase = 'http://localhost:4200/all'

// snap(urlBase, {label: 'tiny', screen: {x: 1024, y: 768}})