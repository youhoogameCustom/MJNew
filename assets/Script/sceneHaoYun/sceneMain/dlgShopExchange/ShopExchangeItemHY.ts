import { IShopExchangeItemDataHY } from "../IMainSceneDataHY";
import PhotoItem from "../../../commonItem/photoItem";

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
export default class ShopExchangeItemHY extends cc.Component {

    @property(cc.Label)
    mDesc : cc.Label = null ;

    @property(PhotoItem)
    mExchangeIcon : PhotoItem = null ;

    @property(cc.Label)
    mPrice : cc.Label = null ;

    mItemID : number = 0 ;
    mPriceCnt : number = 0 ;

    pCallBack : ( id : number, price : number )=>void = null ;
    refresh( data : IShopExchangeItemDataHY , pcallBack : ( id : number, price : number  )=>void)
    {
        this.mDesc.string = data.desc ;
        this.mExchangeIcon.photoURL = data.iconURL ;
        this.mPrice.string = data.scorePrice + "" ;

        this.mItemID = data.id ;
        this.mPriceCnt = data.scorePrice ;

        this.pCallBack = pcallBack ;
    }

    onBtnItem()
    {
        if ( this.pCallBack != null )
        {
            this.pCallBack( this.mItemID,this.mPriceCnt );
        }
    }
}
