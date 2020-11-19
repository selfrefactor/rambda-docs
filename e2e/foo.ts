const url = 'https://stackoverflow.com'

export async function foo({_, page, expect}) {
  await page.goto(url)
  const all = await _.count('div')
  console.log({all})
  expect(all).toBeGreaterThan(11)
}
