import { Page,Locator } from '@playwright/test';
import { ElementUtil } from '../Utilities/ElementUtil.js';
import { PDP } from '../POM/PDP.js';

export class SRP {
    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly resultCount:Locator;


    constructor(page:Page) {
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.resultCount=page.locator('div.desktop-pagingbar div.results-hits');
    }

    async searchResultCount():Promise<string>{
        const text=await this.eleUtil.getInnerText(this.resultCount);
        return text;
    }

    async selectProduct(productName:string){
        console.log(`Product Name : ${productName}`);
        await this.eleUtil.doClick(this.page.getByRole('link',{name:`${productName}`}));
        return new PDP(this.page);
    }
}