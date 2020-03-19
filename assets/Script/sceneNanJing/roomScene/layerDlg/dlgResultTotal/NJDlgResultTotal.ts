import DlgBase from "../../../../common/DlgBase";
import NJResultTotalItem from "./NJResultTotalItem";
import { INJDlgResultTotalData } from "./INJDlgResultTotalData";

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
export default class NJDlgResultTotal extends DlgBase {

    @property(cc.Label)
    mRoomID : cc.Label = null ;

    @property(cc.Node)
    mIconYuanZi : cc.Node = null ;

    @property([NJResultTotalItem])
    mResultItems : NJResultTotalItem[] = [] ;

    @property(cc.Label)
    mTime : cc.Label = null ;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void  )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose);
        let now = new Date() ;
        this.mTime.string = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + "  " + now.toLocaleTimeString("chinese", { hour12: false });
        this.refresh(jsUserData);
    }
 

    protected refresh( data : INJDlgResultTotalData )
    {
        this.mRoomID.string = "房间号：" + data.getRoomID();
        this.mIconYuanZi.active = data.isYuanZi();
        let items = data.getItemDatas();
        for ( let idx = 0 ; idx < this.mResultItems.length ; ++idx )
        {
            this.mResultItems[idx].node.active = idx < items.length ;
            if ( this.mResultItems[idx].node.active  )
            {
                this.mResultItems[idx].refresh( items[idx] );
            }
        }
    }

    onBtnGoMainPage()
    {
        
    }
    // update (dt) {}
}
