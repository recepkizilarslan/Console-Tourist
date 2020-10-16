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
            await page.type('#content > div.post > form > input[type=text]:nth-child(1)', 'admin')
            await page.type('#content > div.post > form > input[type=password]:nth-child(3)', 'admin123456')
            await page.click('#content > div.post > form > input[type=submit]:nth-child(7)')
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