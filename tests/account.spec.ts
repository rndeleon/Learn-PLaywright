import { test , expect , Page} from '@playwright/test';

test.describe('My Account Before Each', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/my-account/')
        await page.locator('#username').fill('practiceuser1');
        await page.locator('#password').fill('PracticePass1!');
        await page.locator("button[name*='login']").click();
        await expect(page.locator("a[href*='customer-logout']")).toBeVisible()
    })
    test('Acess Orders', async ({page}) => {
        await page.goto('/my-account/')
        await page.locator("li a[href*='orders']").click();
        await expect(page).toHaveURL(/.*orders/);
    });

    test('Acess Downloads', async ({page}) => {
        await page.goto('/my-account/')
        await page.locator("li a[href*='downloads']").click();
        await expect(page).toHaveURL(/.*downloads/);
    });
})

// .serial to run in sequence
test.describe.serial('My Account Before All', () => {
    // beforeAll cant use the same page
    // Workaround is to create a global page
    let page: Page
    //Will still fail and need to run in a sequentially
    test.beforeAll(async ({browser}) => {
        page = await browser.newPage();

        await page.goto('/my-account/')
        await page.locator('#username').fill('practiceuser1');
        await page.locator('#password').fill('PracticePass1!');
        await page.locator("button[name*='login']").click();
        await expect(page.locator("a[href*='customer-logout']")).toBeVisible()
    });
    // Need to remove the page since we are already using a global variable
    test('Acess Orders', async () => {
        await page.goto('/my-account/')
        await page.locator("li a[href*='orders']").click();
        await expect(page).toHaveURL(/.*orders/);
    });

    test('Acess Downloads', async () => {
        await page.goto('/my-account/')
        await page.locator("li a[href*='downloads']").click();
        await expect(page).toHaveURL(/.*downloads/);
    });
})

// Using global setup
test.describe('My Account Global Setup', () => {
   
    test('Acess Orders', async ({page}) => {
        await page.goto('/my-account/')
        await page.locator("li a[href*='orders']").click();
        await expect(page).toHaveURL(/.*orders/);
    });

    test('Acess Downloads', async ({page}) => {
        await page.goto('/my-account/')
        await page.locator("li a[href*='downloads']").click();
        await expect(page).toHaveURL(/.*downloads/);
    });
})


test.describe('Account Page Visible', () => {
    test.use({storageState: 'notLoggedInState.json'})
    
    test('Verify login and register is visible',async ({page}) => {
        await page.goto('/my-account')
        await expect(page.locator('h2:has-text("Login")')).toBeVisible();
        await expect(page.locator('h2:has-text("Register")')).toBeVisible();
    });
});