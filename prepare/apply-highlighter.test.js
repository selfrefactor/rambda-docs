const {
  ApplyHighlighter: ApplyHighlighterClass,
} = require('./apply-highlighter')
const {readJson, outputJson} = require('fs-extra')
const {resolve} = require('path')

const sourceFilePath = resolve(__dirname, '../data.json')
const sourceRambdaxFilePath = resolve(__dirname, '../data-rambdax.json')
const outputFilePath = resolve(__dirname, '../new-data.json')
const outputRambdaxFilePath = resolve(__dirname, '../new-data-rambdax.json')
const resolverFilePath = resolve(__dirname, '../resolver.json')


async function fooTest(){
  const resolver = await readJson(resolverFilePath)
  const ApplyHighlighter = new ApplyHighlighterClass()
}

const WITH_RAMBDAX = false

void (async function test() {
  // return await fooTest()
  
  const source = await readJson(WITH_RAMBDAX ? sourceRambdaxFilePath: sourceFilePath)

  const ApplyHighlighter = new ApplyHighlighterClass()
  await ApplyHighlighter.init()
  const {toSave, resolver} = await ApplyHighlighter.apply(source)

  await outputJson(WITH_RAMBDAX ? outputRambdaxFilePath: outputFilePath, toSave)
  await outputJson(resolverFilePath, resolver)
})()
