import {test, expect} from "@playwright/test";
import { log } from "console";
import { off } from "process";

test("Access Blog and count posts", async ({page}) => {
    //Goto URL
    await page.goto("https://practice.sdetunicorns.com/blog/");
    
    //Get element list of latest post
    const recentPostList = page.locator('.zak-secondary  li')

    //Check list lenght of recent post
    expect(await recentPostList.allInnerTexts()).toHaveLength(5)
    //Alternative solution
    expect(await recentPostList.count()).toEqual(5)

    //Loop through list from element
    for (const postTitle of await recentPostList.allInnerTexts()) {
        //Quicker way without if condition
        expect(postTitle.length).toBeGreaterThan(10);
        //Original Answer
        // if (postTitle.length >= 10){
        //     console.log (postTitle + " Is over 10 characters")
        // }
    }

})