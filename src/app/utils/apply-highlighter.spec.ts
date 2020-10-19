import {delay} from 'rambdax'
import {interval} from 'rxjs'
import {take, publish, refCount} from 'rxjs/operators'
import {applyHighlighter} from './apply-highlighter'

test('happy', async() => {
  await applyHighlighter()
})
