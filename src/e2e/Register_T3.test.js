const { test, expect } = require('@playwright/test');

/* R_T3 Testitapaus */

test('R_T3 - Rekisteröityminen palveluun varatulla tunnuksella ei onnistu', async ({ page }) => {

    await page.goto('http://localhost:3000');
  
    await page.locator('[data-testid=MenuIcon]').click();

    await page.click('text=Rekisteröidy');

    await page.fill('text=Käyttäjänimi', 'Playwright');

    await page.fill('text=Salasana', 'abc123');

    await page.fill('text=Vahvista salasana', 'abc123');

    await page.click('text=Rekisteröidy');

    // eslint-disable-next-line jest/valid-expect
    const locator = page.locator('.MuiAlert-filledError');
    await expect(locator).toBeTruthy();

    const textLocator = page.locator('[data-test-id=alertmessage]'); // Tsekataan vielä tarkempi tieto statuksella, jonka järjestelmä asettaa attribuuttiin
    await expect(textLocator).toHaveAttribute('status', 'error');
    await expect(textLocator).toHaveText("Käyttäjätunnus on jo varattu"); // Validoidaan alertin teksti myös
  
});