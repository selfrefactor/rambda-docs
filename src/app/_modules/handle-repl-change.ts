import {RambdaTypes, anyPass, includes, replace, type, unless} from 'rambdax'

const replaceRambdaRef = replace(/R\./gm, 'RMock.')

const hasResultConst = anyPass([
  includes('const result ='),
  includes('const result='),
  includes('let result='),
  includes('let result ='),
])

interface ResultHolder {
  async: boolean,
  payload: any,
  type: RambdaTypes,
}

export const addConst = unless(hasResultConst, x => `const result = ${x}`)
export const addSemiColon = unless<string, string>(
  x => x.endsWith(';'),
  x => `${x};`
)
export const stringifyResult = x => {
  if (type(x) === 'Object') {
    return JSON.stringify(x, null, 2)
  }

  return JSON.stringify(x)
}

async function evaluateCode(
  codeToEvaluate,
  maybeRambdaxMock
): Promise<string | ResultHolder> {
  if (maybeRambdaxMock) {
    const RMock = maybeRambdaxMock
  }
  let resultHolder: ResultHolder
  try {
    eval(codeToEvaluate)
    return resultHolder
  } catch (e) {
    return e.message === undefined ? 'ERROR' : e.message
  }
}

export function handleReplChange(
  input,
  maybeRambdaxMock = undefined
): Promise<string> {
  return new Promise(resolve => {
    const code = addSemiColon(addConst(input.trim()))
    const codeToEvaluateRaw = `
    ${code}
    const resultType = R.type(result)

    resultHolder = {
      async: ['Promise', 'Async'].includes(resultType),
      type: resultType,
      payload: result
    }
    `
    const codeToEvaluate =
      maybeRambdaxMock === undefined
        ? codeToEvaluateRaw
        : replaceRambdaRef(codeToEvaluateRaw)

    evaluateCode(codeToEvaluate, maybeRambdaxMock).then(evaluated => {
      if (typeof evaluated === 'string') {
        return resolve(evaluated)
      }
      const resultHolder = evaluated

      if (!['Async', 'Promise'].includes(resultHolder.type)) {
        return resolve(stringifyResult(resultHolder.payload))
      }

      const promised =
        resultHolder.type === 'Async'
          ? resultHolder.payload()
          : resultHolder.payload

      promised
        .then(promisedResult => {
          resolve(stringifyResult(promisedResult))
        })
        .catch(e => {
          resolve(e.message === undefined ? 'ERROR' : e.message)
        })
    })
  })
}
