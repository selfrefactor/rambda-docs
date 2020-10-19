const {
  ApplyHighlighter: ApplyHighlighterClass,
} = require('./apply-highlighter')
const {readJson, outputJson} = require('fs-extra')
const {resolve} = require('path')

const sourceFilePath = resolve(__dirname, '../data.json')
const outputFilePath = resolve(__dirname, '../foo.json')
const resolverFilePath = resolve(__dirname, '../resolver.json')

const testInput = `{{START}}<code>{{LINE}}{{81A1C1}}export</span>{{D8DEE9FF}} </span>{{81A1C1}}function</span>{{D8DEE9FF}} </span>{{88C0D0}}add</span>{{ECEFF4}}(</span>{{D8DEE9}}a</span>{{ECEFF4}},</span>{{D8DEE9FF}} </span>{{D8DEE9}}b</span>{{ECEFF4}})</span>{{D8DEE9FF}} </span>{{ECEFF4}}{</span></span>\n{{LINE}}{{D8DEE9FF}}  </span>{{81A1C1}}if</span>{{D8DEE9FF}} (</span>{{81A1C1}}arguments</span>{{ECEFF4}}.</span>{{D8DEE9FF}}length </span>{{81A1C1}}===</span>{{D8DEE9FF}} </span>{{B48EAD}}1</span>{{D8DEE9FF}})</span></span>\n{{LINE}}{{D8DEE9FF}}    </span>{{81A1C1}}return</span>{{D8DEE9FF}} </span>{{ECEFF4}}(</span>{{D8DEE9}}_b</span>{{ECEFF4}})</span>{{D8DEE9FF}} </span>{{81A1C1}}=&gt;</span>{{D8DEE9FF}} </span>{{88C0D0}}add</span>{{D8DEE9FF}}(</span>{{D8DEE9}}a</span>{{ECEFF4}},</span>{{D8DEE9FF}} </span>{{D8DEE9}}_b</span>{{D8DEE9FF}})</span>{{81A1C1}};</span></span>\n\n{{LINE}}{{D8DEE9FF}}  </span>{{81A1C1}}return</span>{{D8DEE9FF}} </span>{{8FBCBB}}Number</span>{{D8DEE9FF}}(</span>{{D8DEE9}}a</span>{{D8DEE9FF}}) </span>{{81A1C1}}+</span>{{D8DEE9FF}} </span>{{8FBCBB}}Number</span>{{D8DEE9FF}}(</span>{{D8DEE9}}b</span>{{D8DEE9FF}})</span>{{81A1C1}};</span></span>\n{{LINE}}{{ECEFF4}}}</span></span></code></pre>`

async function fooTest(){
  const resolver = await readJson(resolverFilePath)
  const ApplyHighlighter = new ApplyHighlighterClass()
  const a = ApplyHighlighter.render(testInput, resolver)
  console.log({a})
}

void (async function test() {
  return await fooTest()
  const source = await readJson(sourceFilePath)

  const ApplyHighlighter = new ApplyHighlighterClass()
  await ApplyHighlighter.init()
  const {toSave, resolver} = await ApplyHighlighter.apply(source)
  // console.log(toSave.add);
  const rendered = ApplyHighlighter.render(testInput)
  console.log(rendered)
  // await outputJson(outputFilePath, toSave)
  // await outputJson(resolverFilePath, resolver)
})()
