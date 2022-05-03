const { test, expect } = require('@playwright/test');

test('Sovellus toimii oikein', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page).toHaveTitle(/React App/);

});