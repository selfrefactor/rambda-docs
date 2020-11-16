import { ms } from 'string-fn'
import { wrapPlaywright } from 'init-playwright'

jest.setTimeout(ms('12 minutes'))
const urlBase = 'http://localhost:4200'
const methodUrl = `${urlBase}/all`

describe('workspace-project App', () => {
  it('should display welcome message', async () => {
    const fn = async _ => {
      await _.page.fill('.search__input', 'fid')
      console.log(1)
      return 1
    }
    const result = await wrapPlaywright({url: methodUrl, fn, fallback: -1})
    console.log(result)
    // expect(result).toBeGreaterThan(100)
  });
});
