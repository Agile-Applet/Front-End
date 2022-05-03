const { test, expect } = require('@playwright/test');

test('Holdemi renderöityy oikein', async ({ page }) => {
  await page.goto('http://localhost:3000/holdem');

  await expect(page).toHaveTitle(/React App/);

});