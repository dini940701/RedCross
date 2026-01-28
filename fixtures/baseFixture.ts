import { test as base,expect } from "@playwright/test";
import { HomePage } from "../POM/HomePage.js";
import { LoginPage } from "../POM/LoginPage.js";

type myFixture={
    homePage:HomePage;
}

export const test=base.extend<myFixture>({
    homePage:async({page,baseURL},use,testinfo)=>{
        const loginPage=new LoginPage(page);
        await loginPage.goto(baseURL);
        const acceptCookiesBtn = page.locator(`button#onetrust-accept-btn-handler`);
        if (await acceptCookiesBtn.isVisible({ timeout: 1000 })) {
            await acceptCookiesBtn.click();
        }
        const userName=testinfo.project.metadata.appUserName;
        const password=testinfo.project.metadata.appPassword;
        const homePage=await loginPage.doLogin(userName,password);
        expect(await homePage.isUserLoggedIn()).toBeTruthy();
        await use(homePage);
    }
})

export {expect};