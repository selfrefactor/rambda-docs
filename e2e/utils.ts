const { add } = require('rambdax')
const { wrap } = require('playwright-wrap')

async function wrapTest({page, fn, expect}){
  const _ = wrap(page)
  await fn({_, expect, page})
}

exports.wrapTest = wrapTest