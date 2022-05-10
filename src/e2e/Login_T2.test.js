const { test, expect } = require('@playwright/test');

/* K_T2 Testitapaus

-   K_T2 - K_T2 - Kirjautuminen virheellisellä salasanalla ei onnistu
-   Kokeillaan kirjautumista avamaalla kirjautumislomake ja syöttämällä toimivan käyttäjätunnuksen tiedot lomakkeelle, mutta salasana laitetaan väärin.
-   Lopputuloksena hyväksytty kirjautuminen.

*/

test('K_T2 - Kirjautuminen virheellisellä salasanalla ei onnistu', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    await page.locator('[data-testid=MenuIcon]').click();

    await page.click('text=Kirjaudu');

    await page.fill('text=Käyttäjänimi', 'Playwrighta');

    await page.fill('text=Salasana', 'abc');

    await page.click('text=Kirjaudu tunnukselle');

    // eslint-disable-next-line jest/valid-expect
    const locator = page.locator('.MuiAlert-filledError');
    await expect(locator).toBeTruthy();

    const textLocator = page.locator('[data-test-id=alertmessage]'); // Tsekataan vielä tarkempi tieto statuksella, jonka järjestelmä asettaa attribuuttiin
    await expect(textLocator).toHaveAttribute('status', 'error');
    await expect(textLocator).toHaveText("Käyttäjätunnus ja salasana ei täsmää"); // Validoidaan alertin teksti myös
  
});