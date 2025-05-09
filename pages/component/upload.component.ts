import { Page, Locator } from "@playwright/test";

class UploadComponent {
    private page : Page;
    uploadInput: string;
    uploadBtn: Locator;
    successTxt: Locator;

    constructor(page: Page) {
        this.page = page;

        this.uploadInput = 'input#upfile_1';
        this.uploadBtn = page.locator('input#upload_1');
        this.successTxt = page.locator('#wfu_messageblock_header_1_label_1');

        
    }

    async uploadFile(filePath: string){
        await this.page.setInputFiles(this.uploadInput, filePath);
        await this.uploadBtn.click();
    }

    async navigateToBlog(){
        await this.page.goto("https://practice.sdetunicorns.com/blog/");
    }
} 
export default UploadComponent;
