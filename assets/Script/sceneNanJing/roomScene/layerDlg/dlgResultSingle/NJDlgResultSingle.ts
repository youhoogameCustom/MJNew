import DlgBase from "../../../../common/DlgBase";
import NJResultSingleItemWin from "./NJResultSingleItemWin";
import NJResultSingleItem from "./NJResultSingleItem";
import INJDlgResultSingleData, { eSingleResultType } from "./INJDlgResultSingleData";
import MJCardFactory2D from "../../../../scene/roomScene/layerCards/cards2D/MJCardFactory2D";

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
export default class NJDlgResultSingle extends DlgBase {

   // @property(cc.Node)
   // mIconHu : cc.Node = null ;
    
    @property(cc.Node)
    mIconDianPao : cc.Node = null ;

    @property(cc.Node) 
    mIconLiuJu : cc.Node = null ;

    @property(cc.Node)
    mIconZiMo : cc.Node = null ;

    @property(cc.Label)
    mTime : cc.Label = null ;

    //@property(cc.Node)
    //mLiuJuTitle : cc.Node = null ;

    @property(NJResultSingleItemWin)
    mWinPlayerItem :NJResultSingleItemWin = null ;

    @property([NJResultSingleItem])
    mPlayerItems : NJResultSingleItem[] = [] ;

    @property(cc.Node)
    mItemsNode : cc.Node = null ;

    @property(MJCardFactory2D)
    mCardFactory : MJCardFactory2D = null ;
    // LIFE-CYCLE CALLBACKS:

protected isFinal : boolean = false ;
    onLoad () 
    {
        super.onLoad();
        this.mWinPlayerItem.setCardFactory(this.mCardFactory);
        for ( let item of this.mPlayerItems )
        {
            item.setCardFactory( this.mCardFactory ) ;
        }
    }

    start () {
        
    }

    setIsFinal( isFinal : boolean )
    {
        this.isFinal = isFinal ;
    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void  )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose);
        let now = new Date() ;
        let s = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + "\n" + now.toLocaleTimeString("chinese", { hour12: false });
        this.mTime.string = s ;
        this.refresh(jsUserData);
    }

    onBtnGoOn()
    {
        if ( this.pFuncResult != null )
        {
            this.pFuncResult( this.isFinal );
        }
        
        this.closeDlg();
    }

    protected refresh( data : INJDlgResultSingleData )
    {
        let type = data.getResultType();
        this.mIconDianPao.active = type == eSingleResultType.eType_DianPao ;
        this.mIconZiMo.active = type == eSingleResultType.eType_ZiMo ;
        this.mIconLiuJu.active = type == eSingleResultType.eType_LiuJu ;
        this.mItemsNode.position = cc.p(0, type == eSingleResultType.eType_LiuJu ? 158 : 110 ) ;

        //this.mLiuJuTitle.active = type == eSingleResultType.eType_LiuJu ;
        for ( let item of this.mPlayerItems )
        {
            item.node.active = false ;
        }

        this.mPlayerItems[0].node.active = type == eSingleResultType.eType_LiuJu  ;

        this.mWinPlayerItem.node.active = type != eSingleResultType.eType_LiuJu ;
        
        let datas = data.getItemDatas();
        if ( type != eSingleResultType.eType_LiuJu )
        {
            this.mWinPlayerItem.refresh(data.getWinItemData()) ;
            for ( let idx = 0 ; idx < datas.length ; ++idx )
            {
                this.mPlayerItems[idx+1].node.active = true ;
                this.mPlayerItems[idx+1].refresh(datas[idx]);
            }
        }
        else
        {
            for ( let idx = 0 ; idx < datas.length ; ++idx )
            {
                this.mPlayerItems[idx].node.active = true ;
                this.mPlayerItems[idx].refresh(datas[idx]);
            }
        }
    }
    // update (dt) {}
}
