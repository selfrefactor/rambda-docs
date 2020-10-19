import shiki from 'shiki'
import {delay} from 'rambdax'

export async function applyHighlighter() {
  return console.log(shiki)
  shiki
    .getHighlighter({
      theme: 'nord',
    })
    .then(console.log)
  return await delay(2000)
  // console.log(result)
  // const a = result.codeToHtml('const a = 1', 'js')
  // console.log(a)
}
