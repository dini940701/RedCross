import { Page,Locator } from "@playwright/test";
import { ElementUtil } from "../Utilities/ElementUtil.js";
import { SRP } from "../POM/SRP.js";

export class HomePage {
    readonly page:Page
    private readonly eleUtil:ElementUtil;
    private readonly accountIcon:Locator;
    private readonly logoutLink:Locator; 
    private readonly searchBar:Locator;
    private readonly searchIcon:Locator;
    private readonly productsLink:Locator;
    private readonly searchButton:Locator;


    constructor(page:Page) {
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.accountIcon=page.locator('#user-panel');
        this.logoutLink=page.getByTitle('Go to: Logout');
        this.searchBar=page.locator(`input[name='q']`);
        this.searchIcon=page.getByTitle('Search');
        this.productsLink=page.locator('.enableproducts');
        this.searchButton=page.locator('form.simple-search-action button.header-geo-submit');
    }

    async isUserLoggedIn(){
        await this.eleUtil.doClick(this.accountIcon)
        return await this.eleUtil.isVisible(this.logoutLink);
    }

    async doSearch(searchKey:string){
        await this.eleUtil.doClick(this.searchIcon);
        await this.eleUtil.doClick(this.productsLink);
        await this.eleUtil.doFill(this.searchBar,searchKey);
        await this.eleUtil.doClick(this.searchButton);
        return new SRP(this.page);
    }
}