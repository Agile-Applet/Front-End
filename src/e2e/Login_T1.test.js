const { test, expect } = require('@playwright/test');

/* K_T1 Testitapaus 

-   K_T1 - Kirjautuminen oikeilla tiedoilla onnistuu
-   Kokeillaan kirjautumista avamaalla kirjautumislomake ja syöttämällä toimivan käyttäjätunnuksen tiedot lomakkeelle.
-   Hyväksymisehdot: status attribuutti=(success), järjestelmän antaman tekstin validointi
-   Lopputuloksena: hyväksytty kirjautuminen.

*/

test('K_T1 - Kirjautuminen oikeilla tiedoilla onnistuu', async ({ page }) => {

    //test.setTimeout(10000); // Maksimisuoritusajan määritys testikohtaisesti

    await page.goto('http://localhost:3000'); // Navigoidaan sivustolle
  
    await page.locator('[data-testid=MenuIcon]').click(); // Klikataan sivupalkki auki

    await page.click('text=Kirjaudu'); // Klikataan kirjautumismodaali auki navigoinnista
 
    await page.fill('text=Käyttäjänimi', 'Playwright'); // Täytetään käyttäjänimi kenttään 'Playwright' lomakkeella

    await page.fill('text=Salasana', 'testi'); // Täytetään salasana kenttään 'testi' lomakkeellla

    await page.locator('text=Kirjaudu tunnukselle').click(); // Klikataan kirjautumista lomakkeella

    // eslint-disable-next-line jest/valid-expect
    const locator = page.locator('.MuiAlert-filledSuccess'); // Tsekataan eka, että dialogin ilmoituksen luokka on success (aina onnistuneissa tapahtumissa)
    await expect(locator).toBeTruthy();

    const textLocator = page.locator('[data-test-id=alertmessage]'); // Haetaan test-id attribuutilla dialogi-elementti, jotta voimme tarkistaa vastaukset
    await expect(textLocator).toHaveAttribute('status', 'success'); // Katsotaan attribuutin status arvo, joka voi olla esim. (error,success)
    await expect(textLocator).toHaveText("Olet kirjautunut sisään onnistuneesti"); // Validoidaan dialogin/alertin teksti myös (järjestelmä palauttaa tapauskohtaisesti)
  
});