import { IShopDiamonItemDataHY } from "../IMainSceneDataHY";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopDiamondItemHY extends cc.Component {

    @property(cc.Label)
    mDesc : cc.Label = null ;

    @property(cc.Node)
    mExtraDiamond : cc.Node = null ;

    @property(cc.Label)
    mAddExtra : cc.Label = null ;

    @property(cc.Label)
    mPrice : cc.Label = null ;

    mItemID : number = 0 ;

    pCallBack : ( itemId : number )=>void = null ;

    refresh( data : IShopDiamonItemDataHY , pcallBack : ( itemID : number )=>void )
    {
        this.mDesc.string = data.desc ;
        this.mExtraDiamond.active = data.extraDiamond > 0 ;
        if ( data.extraDiamond > 0 )
        {
            this.mAddExtra.string = data.extraDiamond + "" ;
        }

        this.mPrice.string = "￥ " + data.price ;
        this.pCallBack = pcallBack ;
        this.mItemID = data.id ;
    }

    onBtnItem()
    {
        if ( null != this.pCallBack )
        {
            this.pCallBack( this.mItemID );
        }
    }
}
