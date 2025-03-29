import {test, expect} from "@playwright/test";
import { log } from "console";
import { off } from "process";
import BlogPage from "../pages/blog.page";

let blogPage : BlogPage;
test("Access Blog and count posts", async ({page}) => {
    blogPage = new BlogPage(page);

    // Open Blog Page
    await blogPage.navigateToBlog();

    //Loop through list from element
    for (const postTitle of await blogPage.recentPostList.allInnerTexts()) {
        expect(postTitle.length).toBeGreaterThan(10);
    }

    expect(await blogPage.recentPostList.allInnerTexts()).toHaveLength(5);
})