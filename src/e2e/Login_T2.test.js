const { test, expect } = require('@playwright/test');

/* K_T2 Testitapaus */

test('K_T2 - Kirjautuminen virheellisellä salasanalla ei onnistu', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    await page.locator('[data-testid=MenuIcon]').click();

    await page.click('text=Kirjaudu');

    await page.fill('text=Käyttäjänimi', 'Playwright');

    await page.fill('text=Salasana', 'abc');

    await page.click('text=Kirjaudu');

    // eslint-disable-next-line jest/valid-expect
    const locator = page.locator('.MuiAlert-filledError');
    await expect(locator).toBeTruthy();
  
});