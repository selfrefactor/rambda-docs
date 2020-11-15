const got = require('got')
const {exec} = require('helpers-fn')
const {ms} = require('string-fn')
const {waitFor} = require('rambdax')

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
  let flag = false
  exec({
    cwd: __dirname,
    command: 'yarn in',
    onLog: x => {
      if(x.includes('Compiled success')){
        flag = true
      } 
    }
  })
  const angularIsActive = await waitFor(() =>  flag, ms('4 minutes'), 400)()
  if(!angularIsActive) throw new Error('!angularIsActive')

  await exec({
    cwd: __dirname,
    command: 'yarn test:playwright'
  })
  console.log('done');
  process.exit()
}

void (async function prepareEndToEnd() {
  const angularIsActive = await checkAngularActive(urlBase)
  if(!angularIsActive) return runAngularServe()

  await exec({
    cwd: __dirname,
    command: 'yarn test:playwright'
  })
  process.exit()
})()
