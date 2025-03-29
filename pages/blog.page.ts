import { Locator, Page, expect } from "@playwright/test";

class BlogPage {
    private page : Page;
    recentPostList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.recentPostList = page.locator('.zak-secondary  li');
    }

    async navigateToBlog(){
        await this.page.goto('https://practice.sdetunicorns.com/blog/');
    }
}
export default BlogPage