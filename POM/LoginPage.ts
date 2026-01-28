import { Page,Locator } from "@playwright/test";
import { ElementUtil } from "../Utilities/ElementUtil.js";
import { HomePage } from "./HomePage.js";
import { base } from "@faker-js/faker";

export class LoginPage{

    //Page Objects
    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly accountIcon:Locator;
    private readonly loginLink:Locator;
    private readonly userName:Locator;
    private readonly nextButton:Locator;
    private readonly password:Locator;
    private readonly loginButton:Locator;

    //Page Class Constructor
    constructor(page:Page){
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.accountIcon=page.locator('#user-panel');
        this.loginLink=page.locator(`button[value='Login / Create Account']`);
        this.userName=page.locator(`//input[@placeholder='Username (Email)']`);
        this.nextButton=page.locator(`//button[text()='NEXT']`);
        this.password=page.locator(`//input[@placeholder='Password']`);
        this.loginButton=page.locator(`//button[text()='LOGIN']`);
    }

    //Page Actions

    async goto(baseURL: string | undefined){
        await this.page.goto(baseURL+'.org')
    }

    async doLogin(userName:string,password:string){
        await this.eleUtil.doClick(this.accountIcon);
        await this.eleUtil.doClick(this.loginLink);
        await this.eleUtil.waitForElementVisible(this.userName);
        await this.eleUtil.pressSequentially(this.userName,userName,undefined,{delay:100});
        await this.eleUtil.doClick(this.nextButton);
        await this.eleUtil.doFill(this.password,password);
        await this.eleUtil.doClick(this.loginButton);
        return new HomePage(this.page);
    }
}