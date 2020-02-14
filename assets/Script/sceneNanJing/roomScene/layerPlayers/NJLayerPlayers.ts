import LayerPlayers from "../../../scene/roomScene/layerPlayers/LayerPlayers";
import NJRoomPlayer from "./NJRoomPlayer";
import NJRealTimeSettle from "../roomData/NJRealTimeSettle";
import DlgShopItem from "../../../scene/mainScene/shop/dlgShopItem";

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
export default class NJLayerPlayers extends LayerPlayers {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
    }

    onPlayerRefreshHuaCnt( playerSvrIdx : number , huaCnt : number )
    {
        let playerIdx = this.mData.svrIdxToClientIdx( playerSvrIdx );
        this.mPlayers[playerIdx].huaCnt = huaCnt ;
        let keep = 4;//( this.mRoomData.mOpts as OptsSuZhou ).ruleMode == 1 ? 2 : 3 ;
        (this.mPlayers[playerIdx] as NJRoomPlayer).huaCntColor = cc.Color.GREEN.fromHEX( huaCnt > keep ? "#00f200" : "#c96b82" ) ;
    }

    onPlayerRealTimeSettle( settle : NJRealTimeSettle ) : void 
    {
        for ( let itme of settle.detail )
        {
            let playerIdx = this.mData.svrIdxToClientIdx( itme.idx );
            this.mPlayers[playerIdx].chip = itme.chip ;
        }
    }

    // update (dt) {}
}
