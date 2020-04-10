import { IDlgShopExchangeDataHY, IShopDiamonItemDataHY, IShopExchangeItemDataHY } from "../IMainSceneDataHY";
import MainSceneDataHY from "./MainSceneDataHY";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

class ShopDiamondItemData implements IShopDiamonItemDataHY
{
    id : number ;
    desc : string ;
    extraDiamond : number ;
    price : number ;
}

class ShopExchangeItemData implements IShopExchangeItemDataHY
{
    id : number ;
    desc : string ;
    iconURL : string ;
    scorePrice : number ;
}

export default class DlgShopExchangeDataHY implements IDlgShopExchangeDataHY {

    get diamondSelf() : number
    {
        return this.mSceneData.diamondSelf ;
    } 

    get scoreSelf() : number 
    {
        return -1 ;
    }

    isDefaultExchangePage : boolean = false;

    mSceneData : MainSceneDataHY = null ;
    mDiamondItems : IShopDiamonItemDataHY[] = [] ;
    mExchangeItems : IShopExchangeItemDataHY[] = [] ;

    constructor( data : MainSceneDataHY )
    {
        this.mSceneData = data ;
    }

    reqShopData( pret : ()=>void ) : void 
    {

    }

    getBindedInviteCode() : string 
    {
        return this.mSceneData.getBindedInviteCode();
    }

    getDiamondItems() : IShopDiamonItemDataHY[] 
    {
        return this.mDiamondItems ;
    }

    getExhangeItems() : IShopExchangeItemDataHY[] 
    {
        return this.mExchangeItems ;
    }

    reqBuyDiamond( itemID : number ) : void 
    {

    }

    reqExchangeItem( itemID : number, pret : ( ret : number , content : string )=>void ) : void 
    {

    }
}
