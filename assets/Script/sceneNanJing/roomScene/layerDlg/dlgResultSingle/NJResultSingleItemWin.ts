import NJResultSingleItem from "./NJResultSingleItem";
import { INJDlgResultSingleItemDataWin, INJDlgResultSingleItemData } from "./INJDlgResultSingleData";
import { eFanxingType } from "../../../../scene/roomScene/roomDefine";

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
export default class NJResultSingleItemWin extends NJResultSingleItem {

    @property(cc.Prefab)
    mHuDetailLabel : cc.Prefab = null ;

    @property(cc.Node)
    mHuDetailLayout : cc.Node = null ;

    clear()
    {
        super.clear();
        this.mHuDetailLayout.removeAllChildren();
    }

    refresh( data : INJDlgResultSingleItemData ) 
    {
        data.isFollowHu = true ;
        super.refresh(data);
        let localData = data as INJDlgResultSingleItemDataWin ;
        let info = localData.getWinInfo();
        this.addHuItemInfo( "成牌+10" );

        for ( let huType of info.fanxingType )
        {
            this.addHuItemInfo( this.getHuTypeDesc(huType) );
        }

        let huaZa = info.isHuaZa ? "(花砸2)" : "" ;
        if ( info.hardHua > 0 )
        {
            this.addHuItemInfo( "硬花+" + info.hardHua + huaZa );
        }

        if ( info.sofHua > 0 )
        {
            this.addHuItemInfo( "软花+" + info.sofHua + huaZa );
        }

        if ( info.isBiXiaHu )
        {
            this.addHuItemInfo( "比下胡x2" ) ;
        } 
    }

    protected addHuItemInfo( content : string )
    {
        let node = cc.instantiate(this.mHuDetailLabel);
        let label = node.getComponentInChildren(cc.Label) ;
        label.string = content ;
        this.mHuDetailLayout.addChild(node);
    }

    protected getHuTypeDesc( type : eFanxingType ) : string 
    {
        return "对对胡+20";
    }

    set waiBaoScore( n : number )
    {
        //this.setLabelNumer(this.mWaiBaoScore,n);
    }

    set punishScore( n : number )
    {
        this.mPunishScore.string = n + "" ;
    }

    set totalScore( n : number )
    {
         this.mTotalScore.string = "+" + n ;
    }
}
