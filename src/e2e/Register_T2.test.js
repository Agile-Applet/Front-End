const { test, expect } = require('@playwright/test');

/* R_T2 Testitapaus */

test('R_T2 - Rekisteröityminen puutteellisella salasanalla ei onnistu', async ({ page }) => {

    let rnd = Math.floor(9999);
    let username = "playwright" + rnd;

    await page.goto('http://localhost:3000');
  
    await page.locator('[data-testid=MenuIcon]').click();

    await page.click('text=Rekisteröidy');

    await page.fill('text=Käyttäjänimi', username);

    await page.fill('text=Salasana', '123');

    await page.fill('text=Vahvista salasana', '123');

    await page.click('text=Rekisteröidy');

    // eslint-disable-next-line jest/valid-expect
    const locator = page.locator('.MuiAlert-filledError');
    await expect(locator).toBeTruthy();
  
});