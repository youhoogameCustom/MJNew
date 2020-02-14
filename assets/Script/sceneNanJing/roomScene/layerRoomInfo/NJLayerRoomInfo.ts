import LayerRoomInfo from "../../../scene/roomScene/layerRoomInfo/LayerRoomInfo";
import IRoomSceneData from "../../../scene/roomScene/IRoomSceneData";
import ClientApp from "../../../globalModule/ClientApp";

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
export default class NJLayerRoomInfo extends LayerRoomInfo {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
    }

    // refresh( data : IRoomSceneData ) : void 
    // {
    //     this.mData = data.getRoomInfoData();
    //     this.unscheduleAllCallbacks();
    //     this.roomID.string = this.mData.getRoomID().toString() ;
    //     this.rules.string = this.mData.getRule() ;
    //     this.leftMJCardCnt = this.mData.getLeftMJCnt() ;
    //     this.version.string = ClientApp.getInstance().getConfigMgr().getClientConfig().VERSION;
        
    //     this.schedule(this.refreshTime,60,cc.macro.REPEAT_FOREVER,0);
    //     this.schedule(this.refreshBatteryLevel,300,cc.macro.REPEAT_FOREVER,0);
    // }

    // update (dt) {}
}
