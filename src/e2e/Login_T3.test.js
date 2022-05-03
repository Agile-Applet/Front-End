const { test, expect } = require('@playwright/test');

/* K_T3 Testitapaus */

test('K_T3 - Kirjautuminen virheellisellä käyttäjätunnuksella ei onnistu', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    await page.locator('[data-testid=MenuIcon]').click();

    await page.click('text=Kirjaudu');

    await page.fill('text=Käyttäjänimi', 'Wright');

    await page.fill('text=Salasana', 'abc1');

    await page.click('text=Kirjaudu');

    // eslint-disable-next-line jest/valid-expect
    const locator = page.locator('.MuiAlert-filledError');
    await expect(locator).toBeTruthy();
  
});