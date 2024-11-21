import {test, expect} from "@playwright/test";

test.describe("Home", () => {
    test("Open Homepage and verify title",async ({page}) => {
        await page.goto("https://practice.sdetunicorns.com");

        await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns"); 
    });
});

test.describe("About", () => {
    test("Open about page and verify title", async ({page}) => {
        await page.goto("https://practice.sdetunicorns.com/about/");

        await expect(page).toHaveTitle("About – Practice E-Commerce Site");     
    })
})

test.describe("Click Get Started using CSS selector", () => {
    test("Click get started", async ({page}) => {
        await page.goto("https://practice.sdetunicorns.com");

        await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns"); 
        //Locate element and click
        await page.locator("#get-started").click();

        await expect(page).toHaveURL(/.*get-started/);
        
    })
})

test("Verify text using text locator", async ({page}) => {
    await page.goto("https://practice.sdetunicorns.com");

    const headingText = await page.locator('text=Think different. Make different.')

    await expect(headingText).toBeVisible();

    await expect(page.getByText("Think different. Make different.")).toBeVisible();  
})

test("Verify Home link is enabled using CSS selector and text selector", async ({page}) => {
    await page.goto("https://practice.sdetunicorns.com");

    //Find Home text inside primary menu
    // const homeText = await page.locator('#zak-primary-menu >> text=Home');

    //Using combination of CSS and text more proper than previous command
    const homeText = await page.locator('#zak-primary-menu :text("Home")');
    //Expect element to be enabled
    await expect(homeText).toBeEnabled();
})