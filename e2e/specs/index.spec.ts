import {it, expect} from '@playwright/test'
import {wrapTest} from '../utils'
import {foo} from '../foo'

it('compares page screenshot', async({page}) => {
  await wrapTest({page, fn: foo, expect})
})
