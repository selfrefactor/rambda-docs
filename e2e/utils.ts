import {wrap} from 'playwright-wrap'

export async function wrapTest({page, fn, expect}) {
  const _ = wrap(page)
  await fn({_, expect, page})
}
