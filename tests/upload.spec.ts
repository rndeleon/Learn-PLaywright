import { test, expect } from '@playwright/test';
import exp from 'constants';
const path = require('path')

test.describe('Upload File', () => {
    test('has title', async ({ page }) => {
        //Goto URL
        await page.goto("https://practice.sdetunicorns.com/cart/");
        //Confirm correct URL
        await expect(page).toHaveTitle("Cart – Practice E-Commerce Site");

        //Provide path for the sample file to be uploaded
        const filePath = path.join(__dirname,'../data/logotitle.png');

        //For input file find the 
        await page.setInputFiles('input#upfile_1', filePath);

        //Upload File
        await page.locator('input#upload_1').click();
        
        //Assert file upload
        await expect(page.locator('#wfu_messageblock_header_1_label_1'))
        .toContainText('File logotitle.png uploaded successfully');
    })
})