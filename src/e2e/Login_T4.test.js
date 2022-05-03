const { test, expect } = require('@playwright/test');

/* K_T4 Testitapaus */

/*test('K_T4 - Kirjautuminen ulos onnistuu', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.locator('[data-testid=MenuIcon]').click();

    await page.click('text=Kirjaudu');

    await page.fill('text=Käyttäjänimi', 'Playwright');

    await page.fill('text=Salasana', 'abc1');

    await page.click('text=Kirjaudu');
  
    await page.locator('[data-testid=ExitToAppIcon]').click();

    await page.locator('[data-testid=MenuIcon]').click();

    const locator = page.locator('[data-testid=LoginIcon]');
    await expect(locator).not.toHaveText("Kirjaudu ulos");
  
});*/