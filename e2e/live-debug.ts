import {playwrightInit} from 'playwright-init'
import {wrap} from 'playwright-wrap'
import {foo} from './foo'
import expect from 'expect'

async function applyLiveDebug(testFn) {
  const {browser, page} = await playwrightInit({
    headless: false,
    logFlag: false,
    browser: 'chromium',
    url: 'about:blank',
  })
  try {
    const _ = wrap(page)
    await testFn({page, _, expect})
    await browser.close()
  } catch (error) {
    console.log(error, 'try.catch')
    await browser.close()
  }
}

void (async function liveDebug() {
  await applyLiveDebug(foo)
})()
