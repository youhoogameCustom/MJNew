import PlayerInfoItem from "../../../../commonItem/PlayerInfoItem";
import { INJTotalResultItemData } from "./INJDlgResultTotalData";

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
export default class NJResultTotalItem extends cc.Component {

    @property(PlayerInfoItem)
    mPlayerInfo : PlayerInfoItem = null ;
    
    @property(cc.Label)
    mScore : cc.Label = null ;

    @property(cc.Label)
    mWaiBao : cc.Label = null ;

    @property(cc.Label)
    mCoin : cc.Label = null ;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    refresh( itemData : INJTotalResultItemData )
    {
        this.mPlayerInfo.refreshInfo(itemData.uid);
        this.setLabelNumer(this.mScore,itemData.score);
        this.setLabelNumer(this.mWaiBao,itemData.waibao);
        this.setLabelNumer(this.mCoin, itemData.coin );
    }

    protected setLabelNumer( label : cc.Label , num : number )
    {
        label.string = ( ( num > 0 ) ? "+" : "" ) + num;
        label.node.color = cc.Color.WHITE.fromHEX( num < 0 ? "#59e0ff":"#ffd800" ) ;
    }

    // update (dt) {}
}
