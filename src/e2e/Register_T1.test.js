const { test, expect } = require('@playwright/test');

/* R_T1 Testitapaus 

-   R_T1 - Rekisteröityminen oikeilla tiedoilla onnistuu
-   Kokeillaan rekisteröintiä avaamalla lomake, syöttämällä sopivat oikeat tieedot lomakkeelle ja painetaan rekisteröitymistä
-   Hyväksymisehdot: status attribuutti=(success), järjestelmän antaman tekstin validointi
-   Lopputuloksena rekisteröinti hyväksytään ja käyttäjätunnus syntyy tietokantaan

*/

test('R_T1 - Rekisteröityminen oikeilla tiedoilla onnistuu', async ({ page }) => {

    let rnd = Math.floor(Math.random() * 9999999999);
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

    const textLocator = page.locator('[data-test-id=alertmessage]'); // Tsekataan vielä tarkempi tieto statuksella, jonka järjestelmä asettaa attribuuttiin
    await expect(textLocator).toHaveAttribute('status', 'success');
    await expect(textLocator).toHaveText("Olet rekisteröitynyt onnistuneesti"); // Validoidaan alertin teksti myös
  
});