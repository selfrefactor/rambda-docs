import { it, expect } from "@playwright/test";
import {wrap} from 'playwright-wrap'

it("compares page screenshot", async ({ page, browserName }) => {
  await page.goto("https://stackoverflow.com");
  const _ = wrap(page)
  const aa = await _.count('div')
  const screenshot = await page.screenshot();
  console.log(aa);
  
  
  expect(screenshot).toMatchSnapshot(`test-${browserName}.png`, { threshold: 0.2 });
});