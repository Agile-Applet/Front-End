const { test, expect } = require('@playwright/test');

/* K_T1 Testitapaus */

test('K_T1 - Kirjautuminen oikeilla tiedoilla onnistuu', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    await page.locator('[data-testid=MenuIcon]').click();

    await page.click('text=Kirjaudu');

    await page.fill('text=Käyttäjänimi', 'Playwright');

    await page.fill('text=Salasana', 'abc1');

    await page.click('text=Kirjaudu');

    // eslint-disable-next-line jest/valid-expect
    const locator = page.locator('.MuiAlert-filledSuccess');
    await expect(locator).toBeTruthy();
  
});