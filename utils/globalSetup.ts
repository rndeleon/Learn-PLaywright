import { FullConfig, chromium } from "@playwright/test";

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    await page.goto('https://practice.sdetunicorns.com/my-account/')
    await page.context().storageState({path: 'notLoggedInState.json'});

    //Login
    await page.locator('#username').fill('practiceuser1');
    await page.locator('#password').fill('PracticePass1!');
    await page.locator("button[name*='login']").click();

    // save signed-in state to a 'loggedInState.json'
    await page.context().storageState({path: 'loggedInState.json'});
    await browser.close();
}


export default globalSetup;