import DlgBase from "../../../common/DlgBase";
import { IRecorderItemDataHY } from "./IDlgRecorderDataHY";
import RecorderItemHY from "./RecorderItemHY";

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
export default class DlgRecorderDetail extends DlgBase {

    @property(cc.Node)
    mList : cc.Node = null ;

    @property(cc.Prefab)
    mItemPrefab : cc.Prefab = null ;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void  )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose ) ;
        let data : IRecorderItemDataHY = jsUserData ;
        let items = data.getDetails();
        this.mList.removeAllChildren();
        for ( let item of items )
        {
            let p = cc.instantiate(this.mItemPrefab).getComponent(RecorderItemHY);
            p.refresh(false,item,this.callBackItem.bind(this) ) ;
            this.mList.addChild(p.node);
        }
    }

    callBackItem( replayID : number )
    {
        console.log( "go to replay scene" );
    }

    // update (dt) {}
}
