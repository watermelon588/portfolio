const { chromium } = require('C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const page = await browser.newPage();
  await page.setContent('<p>ready</p>');
  console.log(await page.textContent('p'));
  await browser.close();
})();
