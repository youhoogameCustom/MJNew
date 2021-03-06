import MJRoomData from "../../../scene/roomScene/roomData/MJRoomData";
import OptsNanJing from "../../../opts/OptsNanJing";
import MJRoomBaseData from "../../../scene/roomScene/roomData/MJRoomBaseData";
import MJPlayerData from "../../../scene/roomScene/roomData/MJPlayerData";
import NJResultTotalData from "./NJResultTotalData";
import NJResultSingleData from "./NJResultSingleData";

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
export default class NJRoomData extends MJRoomData {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    createCompoentData() : void
    {
        this.mOpts = new OptsNanJing();
        this.mBaseData = new MJRoomBaseData();
        this.mSinglResultData = new NJResultSingleData();
        this.mTotalResultData = new NJResultTotalData();
 
        let icnt = 4 ;
        while ( icnt-- )
        {
            this.mPlayers.push( new MJPlayerData() );
        }
    }
    // update (dt) {}
}
