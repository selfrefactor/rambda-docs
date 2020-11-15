const got = require('got')
const {exec} = require('helpers-fn')
const {ms} = require('string-fn')
const {resolve} = require('path')
const execa = require('execa')
const {waitFor, delay} = require('rambdax')
const CWD = resolve(__dirname, '../')

const localUrl = 'http://localhost:4200'

async function checkAngularActive(url) {
  try {
    await got(url)
    return true
  } catch (error) {
    return false
  }
}

const SUCCESS_MARKER = 'Compiled successfully.'

async function startAngular() {
  const webpackLogs = [];
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
    command: 'yarn test:playwright',
  })
  angularChildProcess.cancel();

  await delay(3000)
  console.log('done')
}

void (async function prepareEndToEnd() {
  const angularIsActive = await checkAngularActive(localUrl)
  if (!angularIsActive) return startAngular()

  await exec({
    cwd: __dirname,
    command: 'yarn test:playwright',
  })
})()
