import DlgBase from "../../../common/DlgBase";
import ShopDiamondItemHY from "./ShopDiamondItemHY";
import { IDlgShopExchangeDataHY } from "../IMainSceneDataHY";
import ShopExchangeItemHY from "./ShopExchangeItemHY";
import Prompt from "../../../globalModule/Prompt";
import ClientPlayerData from "../../../clientData/ClientPlayerData";

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
export default class DlgShopExchangeHY extends DlgBase {

    @property(cc.Label)
    mCurDaimond: cc.Label = null;

    @property(cc.Label)
    mCurScore: cc.Label = null;

    //@property(cc.Label)
    //mCurInviteCode: cc.Label = null;

    @property([ShopDiamondItemHY])
    mShopDiamondItems : ShopDiamondItemHY[] = [] ;
    
    @property(cc.Node)
    mExchangeLayout : cc.Node = null ;

    @property(cc.Prefab)
    mExchangeItemPrefab : cc.Prefab = null ;

    @property(cc.Toggle)
    mToggleDiamond : cc.Toggle = null ;

    mCacherExhangeItems : cc.Node[] = [] ;

    mData : IDlgShopExchangeDataHY = null ;

    // LIFE-CYCLE CALLBACKS:

    set isDefaultDiamondPage( is : boolean )
    {
        this.mToggleDiamond.isChecked = is ;
    }
    // onLoad () {}
    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void  )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose );
        this.clear();
        this.mData = jsUserData ;
        let self = this ;
        this.isDefaultDiamondPage = this.mData.isDefaultExchangePage == false ;
        this.mData.reqShopData( ()=>{ self.refresh() ;} );

        this.registerMoneyUpdate();
    }

    protected registerMoneyUpdate()
    {
        let self = this ;
        cc.systemEvent.on(ClientPlayerData.EVENT_REFRESH_MONEY,()=>{
            self.mCurDaimond.string = self.mData.diamondSelf + "" ;
            self.mCurScore.string = self.mData.scoreSelf + "" ;
        } ,this );
    }

    protected refresh()
    {
        this.clear();
        this.mCurDaimond.string = this.mData.diamondSelf + "" ;
        this.mCurScore.string = this.mData.scoreSelf + "" ;
        //this.mCurInviteCode.string = this.mData.getBindedInviteCode();

        // diamond items ;
        let vDiamonItems = this.mData.getDiamondItems();
        this.mShopDiamondItems.forEach(( v : ShopDiamondItemHY )=>{ v.node.active = false ; } ) ;
        let diamondItemsCnt = vDiamonItems.length < this.mShopDiamondItems.length ? vDiamonItems.length : this.mShopDiamondItems.length ;
        for ( let idx = 0 ; idx < diamondItemsCnt ; ++idx )
        {
            this.mShopDiamondItems[idx].node.active = true ;
            this.mShopDiamondItems[idx].refresh(vDiamonItems[idx],this.callBackDiamondItem.bind(this) ) ;
        }

        // exchange items ;
        let items = this.mData.getExhangeItems();
        for ( let v of items )
        {
            let p = this.mCacherExhangeItems.length > 0 ? this.mCacherExhangeItems.pop() : cc.instantiate(this.mExchangeItemPrefab) ;
            p.getComponent(ShopExchangeItemHY).refresh( v,this.callBackExchangeItem.bind( this ) ) ;
            this.mExchangeLayout.addChild( p );
        }
    }

    protected clear()
    {
        let v = this.mCacherExhangeItems ;
        this.mExchangeLayout.children.forEach( ( node : cc.Node )=>{ v.push(node); }) ;
        this.mExchangeLayout.removeAllChildren();
    }

    callBackDiamondItem( itemID : number )
    {
        this.mData.reqBuyDiamond( itemID );
    }

    callBackExchangeItem( itemID : number, price : number  )
    {
        if ( price > this.mData.scoreSelf )
        {
            Prompt.promptText( "当前积分不足，无法兑换" );
            return ;
        }

        let self = this ;
        this.mData.reqExchangeItem( itemID,( ret : number , content : string )=>{
            Prompt.promptText(content);
            if ( ret == 0 )
            {
                self.mCurScore.string = ( parseInt(self.mCurScore.string) - price ) + "" ;
            }
        } );
    }

    // update (dt) {}
}
