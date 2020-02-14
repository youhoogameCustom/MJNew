import LayerDlg from "../../../scene/roomScene/layerDlg/LayerDlg";
import DlgHuaDetail from "../../../scene/roomSceneSZ/layerDlg/DlgHuaDetail";
import MJRoomData from "../../../scene/roomScene/roomData/MJRoomData";

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
export default class NJLayerDlg extends LayerDlg {

    @property(DlgHuaDetail)
    mDlgHuaDetail : DlgHuaDetail = null ;

    mRoomData : MJRoomData = null ;
 
    showDlgHuaDetail()
    {
        this.mDlgHuaDetail.showDlg(null,this.mRoomData );
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
    }

    // update (dt) {}
}
