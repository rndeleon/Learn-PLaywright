import { test, expect } from '@playwright/test';
import exp from 'constants';
import CartPage from '../pages/cart.page';
const path = require('path')

test.describe('Upload File', () => {
    test('Upload File', async ({ page }) => {
        //Goto URL
        await page.goto("https://practice.sdetunicorns.com/cart/");
        //Confirm correct URL
        await expect(page).toHaveTitle("Cart – Practice E-Commerce Site");

        //Provide path for the sample file to be uploaded
        const filePath = path.join(__dirname,'../data/logotitle.png');

        //Upload input file  
        await page.setInputFiles('input#upfile_1', filePath);

        //Upload File
        await page.locator('input#upload_1').click();
        
        //Assert file upload
        await expect(page.locator('#wfu_messageblock_header_1_label_1'))
        .toContainText('File logotitle.png uploaded successfully');
    })
})

test.describe('Upload File from hidden path', () => {
    test('Upload hidden file', async ({ page }) => {
        //Goto URL
        await page.goto("https://practice.sdetunicorns.com/cart/");
        //Confirm correct URL
        await expect(page).toHaveTitle("Cart – Practice E-Commerce Site");

        //Provide path for the sample file to be uploaded
        const filePath = path.join(__dirname,'../data/logotitle.png');

        //Manipulate DOM if input file is hidded and not interactable
        await page.evaluate(() => {
            const selector = document.querySelector('input#upfile_1');
            if(selector){
                selector.className = ''
            }
        })

        //Upload input file
        await page.setInputFiles('input#upfile_1', filePath);

        //Upload File
        await page.locator('input#upload_1').click();
        
        //Assert file upload
        await expect(page.locator('#wfu_messageblock_header_1_label_1'))
        .toContainText('File logotitle.png uploaded successfully');
    })
})

test.describe('Upload File Wait', () => {
    let cartPage : CartPage;

    test('Wait for state', async ({ page }) => {
        //Goto URL
        await page.goto("https://practice.sdetunicorns.com/cart/");
        //Confirm correct URL
        await expect(page).toHaveTitle("Cart – Practice E-Commerce Site");

        //Provide path for the sample file to be uploaded
        const filePath = path.join(__dirname,'../data/3mb-file.pdf');

        //Upload input file  
        await page.setInputFiles('input#upfile_1', filePath);

        //Upload File
        await page.locator('input#upload_1').click();
        
        await page.locator('#wfu_messageblock_header_1_label_1')
            .waitFor({ state: 'visible', timeout: 10000})

        //Assert file upload
        await expect(page.locator('#wfu_messageblock_header_1_label_1'))
        .toContainText('uploaded successfully');
    })

    test('Assertion Timeout', async ({ page }) => {
        //Goto URL
        await page.goto("https://practice.sdetunicorns.com/cart/");
        //Confirm correct URL
        await expect(page).toHaveTitle("Cart – Practice E-Commerce Site");

        //Provide path for the sample file to be uploaded
        const filePath = path.join(__dirname,'../data/3mb-file.pdf');

        //Upload input file  
        await page.setInputFiles('input#upfile_1', filePath);

        //Upload File
        await page.locator('input#upload_1').click();

        //Assert file upload
        await expect(page.locator('#wfu_messageblock_header_1_label_1'))
        .toContainText('uploaded successfully', {timeout: 15000});
    })
})

test.describe('Upload Multiple File', () => {
    let cartPage : CartPage;

    const fileName = ['logotitle.png','3mb-file.pdf']

    for (const name of fileName) {
        test(`Should upload a ${name}`, async ({ page }) => {
            cartPage = new CartPage(page);
            //Goto URL
            await page.goto("https://practice.sdetunicorns.com/cart/");
            //Confirm correct URL
            await expect(page).toHaveTitle("Cart – Practice E-Commerce Site");

            //Provide path for the sample file to be uploaded
            const filePath = path.join(__dirname,`../data/${name}`);

            cartPage.uploadComponent().uploadFile(filePath);

            //Assert file upload
            await expect(cartPage.uploadComponent().successTxt)
            .toContainText('uploaded successfully', {timeout: 15000});
        })
    }
})