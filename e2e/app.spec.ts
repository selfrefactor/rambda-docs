import { wrapPlaywright } from 'init-playwright'

const url = 'http://localhost:4200'


describe('workspace-project App', () => {
  it('should display welcome message', async () => {
    const fn = async _ => {
      return await _.count('div')
    }
    const result = await wrapPlaywright({url, fn, fallback: -1})
    console.log(result)
    // expect(result).toBeGreaterThan(100)
  });
});
