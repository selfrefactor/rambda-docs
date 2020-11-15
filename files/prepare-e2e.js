const got = require('got')
const {delay} = require('rambdax')
// const urlBase = 'https://github.com'
const urlBase = 'http://localhost:4200'

async function checkAngularActive(url) {
  try {
    await got(url)
    return true
  } catch (error) {
    return false
  }
}

async function runAngularServe(){
  await delay(40000)
}

void (async function prepareEndToEnd() {
  const angularIsActive = await checkAngularActive(urlBase)
  if(!angularIsActive) await runAngularServe()
  console.log({angularIsActive})
})()
