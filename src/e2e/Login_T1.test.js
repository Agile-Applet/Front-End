const { test, expect } = require('@playwright/test');

/* K_T1 Testitapaus 

-   K_T1 - Kirjautuminen oikeilla tiedoilla onnistuu
-   Kokeillaan kirjautumista avamaalla kirjautumislomake ja syöttämällä toimivan käyttäjätunnuksen tiedot lomakkeelle.
-   Lopputuloksena hyväksytty kirjautuminen.

*/

test('K_T1 - Kirjautuminen oikeilla tiedoilla onnistuu', async ({ page }) => {

    //test.setTimeout(10000); // Maksimisuoritusajan määritys testikohtaisesti

    await page.goto('http://localhost:3000'); // Navigoidaan sivustolle
  
    await page.locator('[data-testid=MenuIcon]').click(); // Klikataan sivupalkki auki

    await page.click('text=Kirjaudu'); // Klikataan kirjautumismodaali auki
 
    await page.fill('text=Käyttäjänimi', 'Playwright'); // Täytetään käyttäjänimi kenttään 'Playwright'

    await page.fill('text=Salasana', 'abc123'); // Täytetään salasana kenttään 'testi'

    await page.locator('text=Kirjaudu tunnukselle').click(); // Klikataan kirjautumista

    // eslint-disable-next-line jest/valid-expect
    const locator = page.locator('.MuiAlert-filledSuccess'); // Tsekataan eka, että alertti on success (aina kaikissa onnistuneissa tapahtumissa)
    await expect(locator).toBeTruthy();

    const textLocator = page.locator('[data-test-id=alertmessage]'); // Tsekataan vielä tarkempi tieto statuksella, jonka järjestelmä asettaa attribuuttiin
    await expect(textLocator).toHaveAttribute('status', 'success');
    await expect(textLocator).toHaveText("Olet kirjautunut sisään onnistuneesti"); // Validoidaan alertin teksti myös
  
});