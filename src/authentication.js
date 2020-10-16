const puppeteer = require('puppeteer');

module.exports = async function TryLogin(uri) {
        try {
            //open a instance
            const browser = await puppeteer.launch({headless :false});
            //open a page
            const page = await browser.newPage();
            
            //set viewport
            await page.setViewport({
                width: 1366,
                height: 768
            });

            //------ START Login steps ------
            await page.goto(uri);
            await page.type('#user', 'recep')
            await page.type('#Password', '1234Aa')
            await page.click('#login')
            await page.waitForNavigation();
            //------ END Login steps ------
            

            //return cookies
            var cookie=await page.cookies();

            //close page
              page.close();

            //close browser
             browser.close();

            return cookie;

        } catch (e) {
            throw e;
        }
}