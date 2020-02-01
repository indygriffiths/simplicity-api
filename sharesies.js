const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const USERNAME_SELECTOR = 'input[type=email]'
const PASSWORD_SELECTOR = 'input[type=password]'
const BUTTON_SELECTOR = 'button[type=submit]'

async function run() {
  const browser = await puppeteer.launch({
    headless: (process.argv.indexOf("-headless") > -1)
  });
  
  try {
    const page = await browser.newPage();

    await page.goto('https://app.sharesies.nz/login');
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);

    await page.click(BUTTON_SELECTOR);

    await page.waitForSelector("text[class*='fundTotal']", { visible: true, timeout: 10 * 1000 });

    const result = await page.evaluate(() => {
      let fundtotal = document.querySelector("text[class*='fundTotal']").innerHTML;
      return fundtotal
    });

    console.log(result);

    browser.close();
  }

  catch (e) {
    browser.close();
  }
}

run();
