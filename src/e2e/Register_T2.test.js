const { test, expect } = require('@playwright/test');

/* R_T2 Testitapaus

-   R_T2 -  Rekisteröityminen puutteellisella salasanalla ei onnistu
-   Kokeillaan rekisteröintiä avaamalla lomake, syöttämällä puutteellinen salasana lomakkeelle ja painetaan rekisteröitymistä
-   Lopputuloksena rekisteröinti hylätään ja käyttäjätunnustusta ei rekisteröidä

*/

test('R_T2 - Rekisteröityminen puutteellisella salasanalla ei onnistu', async ({ page }) => {

    let rnd = Math.floor(Math.random() * 9999999999);
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

    const textLocator = page.locator('[data-test-id=alertmessage]'); // Tsekataan vielä tarkempi tieto statuksella, jonka järjestelmä asettaa attribuuttiin
    await expect(textLocator).toHaveAttribute('status', 'success');
    await expect(textLocator).toHaveText("Olet rekisteröitynyt onnistuneesti"); // Validoidaan alertin teksti myös
  
});