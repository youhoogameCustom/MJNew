import MJRoomScene from "../../scene/roomScene/MJRoomScene";
import LayerPlayerCards from "../../scene/roomScene/layerCards/LayerPlayerCards";
import NJLayerPlayers from "./layerPlayers/NJLayerPlayers";
import NJLayerDlg from "./layerDlg/NJLayerDlg";
import NJLayerRoomInfo from "./layerRoomInfo/NJLayerRoomInfo";
import INJRoomDataDelegate from "./roomData/INJRoomDataDelegate";
import NJRealTimeSettle from "./roomData/NJRealTimeSettle";

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
export default class NJRoomScene extends MJRoomScene {
    // LIFE-CYCLE CALLBACKS:

    onLoad ()
    {
        super.onLoad();

        this.mRoomData.mSceneDelegate = this ;
        this.mLayerCards = this.mLayerPlayerCard.getComponent(LayerPlayerCards);
        this.mLayerPlayers = this.mLayerPlayersNode.getComponent(NJLayerPlayers);
        this.mLayerDlg = this.mLayerDlgNode.getComponent( NJLayerDlg );
        this.mLayerRoomInfo = this.mLayerInfo.getComponent( NJLayerRoomInfo );
        ( this.mLayerPlayers as NJLayerPlayers).mScene = this ;
        ( this.mLayerDlg as NJLayerDlg).mRoomData = this.mRoomData ;
    }
    
    // update (dt) {}
}
