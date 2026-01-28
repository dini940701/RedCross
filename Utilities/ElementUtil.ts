import { Locator,Page } from '@playwright/test';

type flexibleLocator=string | Locator;

export class ElementUtil {
    private page:Page;
    private defaultTimeout:number=80000;
    constructor(page:Page,timeout:number=80000) {
        this.page=page;
        this.defaultTimeout=timeout;
    }

    private getLocator(locator:flexibleLocator,index?:number):Locator{
        if(typeof locator==='string'){
            if(index !== undefined){
                return this.page.locator(locator).nth(index);
            }
            else{
                return this.page.locator(locator).first();
            }
        }
        else{
            if(index !== undefined){
                return locator.nth(index);
            }
            else{
                return locator.first();
            }
        }
    }

    async doFill(locator:flexibleLocator,value:string,index?:number,options?:{timeout?:number}):Promise<void>{
        await this.getLocator(locator,index).fill(value,{
            timeout:options?.timeout || this.defaultTimeout
        });
    }

    async pressSequentially(locator:flexibleLocator,value:string,index?:number,options?:{delay?:number}):Promise<void>{
        await this.getLocator(locator,index).pressSequentially(value,{
            delay:options?.delay
        });
    }

    async doClick(locator:flexibleLocator,index?:number,options?:{force?:boolean,timeout?:number}):Promise<void>{
        await this.getLocator(locator,index).click({
            force:options?.force,
            timeout:options?.timeout || this.defaultTimeout
        });
    }

    async doubleClick(locator:flexibleLocator,index?:number,options?:{timeout?:number}):Promise<void>{
        await this.getLocator(locator,index).dblclick({
            timeout:options?.timeout || this.defaultTimeout
        },);
    }

    async rightClick(locator:flexibleLocator,options?:{button?: 'left' | 'right' | 'middle' | undefined}):Promise<void>{
        await this.getLocator(locator).click({
            button:options?.button
        });
    }

    async selectDropDown(locator:flexibleLocator,value:string,options?:{timeout?:number}):Promise<void>{
        await this.getLocator(locator).selectOption(value,{
            timeout:options?.timeout || this.defaultTimeout
        });
    }

    async selectByLabelDropdown(locator:flexibleLocator, labelValue:string){
        await this.getLocator(locator).selectOption({label:labelValue});
    }

    async selectByIndexDropdown(locator:flexibleLocator, indexValue:number){
        await this.getLocator(locator).selectOption({index:indexValue});
    }

    async getInnerText(locator:flexibleLocator):Promise<string>{
        const innerText=await this.getLocator(locator).innerText();
        return innerText;
    }

    async getTextContent(locator:flexibleLocator):Promise<string | null>{
        const text=await this.getLocator(locator).textContent();
        return text;
    }

    async getAllInnerTexts(locator:flexibleLocator):Promise<string[]>{
        const allInnerTexts=await this.getLocator(locator).allInnerTexts();
        return allInnerTexts;
    }
    
    async getInputValue(locator:flexibleLocator):Promise<string>{
        const inputValue=await this.getLocator(locator).inputValue();
        return inputValue;
    }

    //============================ Element Visibility & State Check ================//

    async isVisible(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isVisible({timeout:this.defaultTimeout});
    }

    async isHidden(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isHidden({timeout:this.defaultTimeout});
    }

    async isEnabled(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isEnabled({timeout:this.defaultTimeout});
    }

    async isDisabled(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isDisabled({timeout:this.defaultTimeout});
    }

    async isChecked(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isChecked({timeout:this.defaultTimeout});
    }

    async isEditable(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isEditable({timeout:this.defaultTimeout});
    }

    //====================wait utils===========//

    async waitForElementVisible(locator:flexibleLocator,timeout:number=5000,index?:number){
        try{
            await this.getLocator(locator,index).waitFor({state:'visible',timeout});
            return true;
        }
        catch{
            return false;
        }
    }

    async waitForElementAttached(locator:flexibleLocator,timeout:number=5000):Promise<boolean>{
        try{
            await this.getLocator(locator).waitFor({state:'attached',timeout});
            return true;
        }
        catch{
            return false;
        }
    }

    async waitForLoadState(state?:'load'|'domcontentloaded'|'networkidle'|undefined,options?:{timeout?:number}):Promise<void>{
        await this.page.waitForLoadState(state,{
            timeout: options?.timeout || this.defaultTimeout
        });
    }

    async sleep(timeout:number):Promise<void>{
        await this.page.waitForTimeout(timeout);
    }

    //==========File Upload==============//

    async setInputFiles(locator:flexibleLocator,file:string|string[]):Promise<void>{
        await this.getLocator(locator).setInputFiles(file);
    }
}