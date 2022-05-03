const { test, expect } = require('@playwright/test');

/* R_T1 Testitapaus */

test('R_T1 - Rekisteröityminen oikeilla tiedoilla onnistuu', async ({ page }) => {

    let rnd = Math.floor(9999);
    let username = "playwright" + rnd;
    let password = "abc" + rnd;

    await page.goto('http://localhost:3000');
  
    await page.locator('[data-testid=MenuIcon]').click();

    await page.click('text=Rekisteröidy');

    await page.fill('text=Käyttäjänimi', username);

    await page.fill('text=Salasana', password);

    await page.fill('text=Vahvista salasana', password);

    await page.click('text=Rekisteröidy');

    // eslint-disable-next-line jest/valid-expect
    const locator = page.locator('.MuiAlert-filledSuccess');
    await expect(locator).toBeTruthy();
  
});