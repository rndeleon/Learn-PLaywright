import {test, expect} from "@playwright/test";
import { log } from "console";
import { off } from "process";

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
    const homeTextCss = await page.locator('#zak-primary-menu >> text=Home');

    //Using combination of CSS and text more proper than previous command
    const homeCssText = await page.locator('#zak-primary-menu :text("Home")');

    const homeCssHasText = await page.locator('#zak-primary-menu:has-text("Home")');
    //Expect element to be enabled
    await expect(homeCssHasText).toBeEnabled();
})


test("Verify Search icon and click using xpath", async ({page}) => {
    await page.goto("https://practice.sdetunicorns.com");

    //Find the search icon
    const searchIcon = await page.locator(`
    //div[@class="zak-header-actions zak-header-actions--desktop"]
    //a[@class="zak-header-search__toggle"]
    `);

    //Expect element to be enabled
    await expect(searchIcon).toBeVisible();
})

test("Verify Text of all nav link", async ({page}) => {
    const expectedNavlinkstext = [
        "Home",
        "About",
        "Shop",
        "Blog",
        "Contact",
        "My account"
    ];

    //Open URL
    await page.goto("https://practice.sdetunicorns.com");

    //Find the nav Link containing multiple Menu
    const navLinks = page.locator('#zak-primary-menu li[id*=menu]');

    log (await navLinks.allTextContents())
    //Verify nav links test
    expect(await navLinks.allTextContents()).toEqual(expectedNavlinkstext);
})


test("Verify Text of nth nav link", async ({page}) => {
    const expectedNavlinkstext = [
        "Home",
        "About",
        "Shop",
        "Blog",
        "Contact",
        "My account"
    ];

    //Open URL
    await page.goto("https://practice.sdetunicorns.com");

    //Find the nav Link containing multiple Menu
    const navLinks = page.locator('#zak-primary-menu li[id*=menu]').nth(0)

    //Verify nav link single text
    expect(await navLinks.textContent()).toEqual(expectedNavlinkstext[0]);
})

test("Verify Text of nav links using loop", async ({page}) => {
    const expectedNavlinkstext = [
        "Home",
        "About",
        "Shop",
        "Blog",
        "Contact",
        "My account"
    ];

    //Open URL
    await page.goto("https://practice.sdetunicorns.com");

    //Find the nav Link containing multiple Menu
    const navLinks = page.locator('#zak-primary-menu li[id*=menu]');

    //Pring out all the list
    for (const navText of await navLinks.elementHandles()) {
        console.log(await navText.textContent())
    }
    
})