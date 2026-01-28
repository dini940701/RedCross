import { Page,Locator } from '@playwright/test';
import { ElementUtil } from '../Utilities/ElementUtil.js';

export class PDP {
    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly header:Locator;
    private readonly imageCount:Locator;
    private readonly detailsTab:Locator;
    private metaData:Locator;
    private prodMap=new Map<string,string|number|null>;

    constructor(page:Page) {
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.header=page.locator('h1');
        this.imageCount=page.locator('div.product-image-container a');
        this.detailsTab=page.locator('div.product-content-tabs div.tab-2');
        this.metaData=page.locator('div.tab_content ul li');
    }

    async getHeader(){
        return await this.eleUtil.getInnerText(this.header);
    }

    async getImageCount(){
        return await this.imageCount.count();
    }

    private async getProductMetaData(){
        await this.eleUtil.doClick(this.detailsTab);
        const prodData=await this.eleUtil.getAllInnerTexts(this.metaData);
        for(const data of prodData){
            const key=data[0].trim();
            const value=data[1].trim();
            this.prodMap.set(key,value);
        }
    }

    private async getProdData(){
        for(const [key,value] of this.prodMap){
            console.log(key,value);
        }
    }

    async getProdDetails(){
        this.prodMap.set('header',await this.getHeader());
        this.prodMap.set('ImageCount',await this.getImageCount());
        await this.getProductMetaData();
        await this.getProdData();
        return this.prodMap;
    }
}