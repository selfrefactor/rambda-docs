import {applyHighlighter} from './apply-highlighter'
import data from '../../../new-data.json'

test('happy', () => {
  const parsed = applyHighlighter(data.add.typing)
  console.log(parsed)
})
