const {mapAsync, omit, merge, match, remove, forEach, replace, piped, map, interpolate, path} = require('rambdax')
const shiki = require('shiki')
const tripTankTheme = shiki.loadTheme(`${__dirname}/assets/TripTank.json`)
const initialResolver = {
  '{{LINE}}':'<span class="line">',
  '{{START}}':'<pre class="shiki" style="background-color: #25252A">',
  '{{END}}':'</span></span></code></pre>'
}

function finalFix(x){
  const benchmarkSummary = path('benchmarkInfo.methodSummary', x) ? path('benchmarkInfo.methodSummary',x) : ''
  if(!benchmarkSummary) return x

  return {
    ...omit('benchmarkInfo', x),
    benchmarkSummary
  } 
}

class ApplyHighlighter {
  constructor() {
    this.codeToHtml = () => {
      throw new Error('codeToHtml is not ready')
    }
    this.resolver = initialResolver
  }
  
  async init() {
    const {codeToHtml} = await shiki.getHighlighter({
      theme: tripTankTheme,
      // theme: 'nord',
    })
    this.codeToHtml = codeToHtml
  }

  findColor(input){
    const [colorPart] = match(/color:\s#[a-fA-F0-9]{6,8}/, input)
    if(!colorPart) return

    return remove('color: #', colorPart)
  }

  appendToResolver(highlighted){
    if(!highlighted) return

    const found = match(/<span\sstyle="color:\s#[a-fA-F0-9]{6,8}">/gm, highlighted)

    if(found.length === 0) return
    let template = highlighted

    found.forEach(singleMatch => {
      const color = this.findColor(singleMatch)
      if(!color) return

      if(this.resolver[color] === undefined){

        this.resolver[color] = singleMatch
      }
      template = replace(new RegExp(singleMatch, 'g'), `{{${color}}}`, template)
    })
    
    forEach((x, prop) => {
      template = replace(new RegExp(x, 'g'), prop, template)
    })(initialResolver)

    return template
  }

  async apply(source) {
    const iterator = async (data) => {
      const all = {}
      all.benchmarkSource = path('benchmarkInfo.benchmarkContent', data) ? this.codeToHtml(path('benchmarkInfo.benchmarkContent',data), 'js'):''
      all.rambdaSource = this.codeToHtml(data.rambdaSource, 'js')
      all.rambdaSpecs = data.rambdaSpecs ? this.codeToHtml(data.rambdaSpecs, 'js'): ''
      all.failedRamdaSpecs = data.failedRamdaSpecs ? this.codeToHtml(data.failedRamdaSpecs, 'js'): ''
      all.allTypings = data.allTypings ? this.codeToHtml(data.allTypings, 'ts'): ''
      all.typing = data.typing ? this.codeToHtml(data.typing.trim(), 'ts'): ''
      all.typescriptDefinitionTest = data.typescriptDefinitionTest ? this.codeToHtml(data.typescriptDefinitionTest, 'ts'): ''

      const parsedData = piped(
        all,
        map(x => this.appendToResolver(x)),
      )

      return finalFix({...data, ...parsedData})

      /*
        forEach(x => this.appendToResolver(x), all)
        forEach(appendToResolver, all) => `this` issue with Ramda

        R.renamePropsWith
      */
    }

    const toSave = await mapAsync(iterator, source)

    const resolverObject = {}
    forEach((x, prop) => {
      const newKey = remove(['{{','}}'], prop)
      resolverObject[newKey] = x
    })(this.resolver)

    return {toSave, resolver: resolverObject}
  }

  render(input, resolver){
    return interpolate(input, resolver)
  }
}

exports.ApplyHighlighter = ApplyHighlighter
