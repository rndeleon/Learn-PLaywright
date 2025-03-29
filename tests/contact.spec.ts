import {test, expect} from "@playwright/test";
import { log } from "console";
import { off } from "process";
import ContactPage from "../pages/contact.page";
import { faker } from '@faker-js/faker';

let contactPage : ContactPage;

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

test.describe('Contact', () => {
    test('Fill contact form and verify success message', async ({ page }) => {
      // open contact page
      await page.goto('https://practice.sdetunicorns.com/contact')
  
      //  fill out the input fields
      await page.locator('.contact-name input').fill('Test Name')
      await page.locator('.contact-email input').fill('test@mail.com')
      await page.locator('.contact-phone input').fill('134567864')
      await page.locator('.contact-message textarea').fill('This is a test message')
  
      // add a soft assertion
      await expect.soft(page.locator('.contact-message textarea')).toHaveText("Fail test message")
  
      // click submit
      await page.locator('button[type=submit]').click()
  
      expect(test.info().errors.length).toBeLessThan(1)
  
      // verify success message
      const successAlert = page.locator('div[role="alert"]')
      await expect(successAlert).toHaveText('for contacting us! We will be in touch with you shortly')
    })
})

//debug
test.describe('Contact Debug Trace', () => {
    test('Fill contact form and verify success message', async ({ page }) => {
      // open contact page
      await page.goto('https://practice.sdetunicorns.com/contact')

      //  fill out the input fields
      await page.locator('.contact-name input').fill('Test Name')
      await page.locator('.contact-email input').fill('test@mail.com')
      await page.locator('.contact-phone input').fill('134567864')
      await page.locator('.contact-message textarea').fill('This is a test message')
  
      // add a soft assertion
    //   await expect.soft(page.locator('.contact-message textarea')).toHaveText("Fail test message")
  
      // click submit
      await page.locator('button[type=submit]').click()
  
      expect(test.info().errors.length).toBeLessThan(1)
  
      // verify success message
      const successAlert = page.locator('div[role="alert"]')
      await expect(successAlert).toContainText('Thanks for contacting us!l')
    })
})

test.describe('Contact with POM test', () => {
  test('Fill contact form and verify success message', async ({ page }) => {
    let contactPage = new ContactPage(page);

    await contactPage.navigateToContact();

    await contactPage.submitForm(faker.person.fullName(),faker.internet.email(),faker.phone.number(),faker.lorem.sentence())

    expect(test.info().errors.length).toBeLessThan(1)

    // verify success message
    await expect(contactPage.successAlert).toContainText('Thanks for contacting us!')
  })
})