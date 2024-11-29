import {test, expect} from "@playwright/test";
import { log } from "console";
import { off } from "process";



test("Create Contact and submit , Exercise", async ({page}) => {
    const fields = {
        name: "Name",
        email: "Email",
        phone: "Phone",
    };

    async function fillContactField(label: string, value: string) {
        const requiredContactFields = page.locator(`//div[@class="evf-frontend-grid evf-grid-1"]//span[text()="${label}"]/../following-sibling::input`);
        await requiredContactFields.fill(value);
    }

    const submitButton = page.locator('button', { hasText: 'Submit' });
    const contactConfirmation = page.locator('//div[contains(text(),"Thanks for contacting us! We will be in touch with you shortly")]')
    //Goto URL
    await page.goto("https://practice.sdetunicorns.com");
    //Click contact from primary menu
    await page.locator('#zak-primary-menu :text("Contact")').click();
    //Verify contact page
    await expect(page).toHaveTitle("Contact – Practice E-Commerce Site");

    await fillContactField(fields.name, "John Doe");
    await fillContactField(fields.email, "test@example.com");
    await fillContactField(fields.phone, "1234567890");

    await submitButton.click();
    await expect(contactConfirmation).toBeVisible();
})