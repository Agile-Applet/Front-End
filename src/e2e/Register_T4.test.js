const { test, expect } = require('@playwright/test');

/* R_T4 Testitapaus */

test('R_T4 - Rekisteröityminen palveluun ilman määritettyä tunnusta ei onnistu', async ({ page }) => {

    await page.goto('http://localhost:3000');
  
    await page.locator('[data-testid=MenuIcon]').click();

    await page.click('text=Rekisteröidy');

    await page.fill('text=Käyttäjänimi', '');

    await page.fill('text=Salasana', 'abc123');

    await page.fill('text=Vahvista salasana', 'abc123');

    await page.click('text=Rekisteröidy');

    // eslint-disable-next-line jest/valid-expect
    const locator = page.locator('.MuiAlert-filledError');
    await expect(locator).toBeTruthy();
  
});