const got = require('got')
const {exec, monitor, log} = require('helpers-fn')
const {ms} = require('string-fn')
const {resolve} = require('path')
const execa = require('execa')
const {waitFor} = require('rambdax')
const CWD = resolve(__dirname, '../')

const localUrl = 'http://localhost:4200'
const SUCCESS_MARKER = 'Compiled successfully.'

async function checkAngularActive(url) {
  try {
    await got(url)
    return true
  } catch (error) {
    return false
  }
}

const COMMAND = process.env.E2E_TEST_MODE ? 
  `yarn test:${process.env.E2E_TEST_MODE}` : 'yarn test:e2e'

async function startAngular() {
  let flag = false
  const angularChildProcess = execa.command('yarn in', { cwd: CWD });

  angularChildProcess.stdout.on('data', logData => {
    if(logData.toString().includes(SUCCESS_MARKER)){
      flag = true
    }
  });
  const condition = () => flag;
  await Promise.race([
    waitFor(condition, ms('6min'), 6 * 60)(),
    angularChildProcess,
  ]);
  await exec({
    cwd: __dirname,
    command: COMMAND,
  })
  angularChildProcess.cancel();
  const monitorData = await monitor.stop()
  log(monitorData, 'obj')
}

async function whenAlreadyRunning(){
  await exec({
    cwd: __dirname,
    command: COMMAND
  })
  const monitorData = await monitor.stop()
  log(monitorData, 'obj')
}

void (async function prepareEndToEnd() {
  await monitor.start()

  const angularIsActive = await checkAngularActive(localUrl)
  if (!angularIsActive) return startAngular()
  
  return whenAlreadyRunning()
})()
