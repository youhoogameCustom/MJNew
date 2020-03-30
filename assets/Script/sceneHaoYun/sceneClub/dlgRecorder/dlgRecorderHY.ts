import DlgBase from "../../../common/DlgBase";
import ListView, { IAbsAdapter } from "../../../commonItem/ListView";
import IDlgRecorderDataHY from "./IDlgRecorderDataHY";
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
export default class DlgRecorderHY extends DlgBase implements IAbsAdapter {

    @property(ListView)
    mRecorderList : ListView = null ;

    @property(DlgBase)
    mDlgDetail : DlgBase = null ;
     
    mData : IDlgRecorderDataHY = null ;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void  )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose ) ;
        if ( null != this.mData )
        {
            this.mData.leaveRecorderDlg();
        }

        this.mData = jsUserData ;
        let self = this ;
        this.mData.reqRcorderData(()=>{ self.refresh();} ) ;
    }

    protected refresh()
    {
        this.mRecorderList.setAdapter(this);
        this.mRecorderList.notifyUpdate();
    }

    getCount(): number 
    {
        if ( null != this.mData )
        {
            return this.mData.getRecorderCnt();
        }
        return 0 ;
    }

    _getView(item: cc.Node, posIndex: number): cc.Node 
    {
        let com = item.getComponent(RecorderItemHY) ;
        let pdata = this.mData.getRecorderItemData(posIndex);
        com.refresh(true,pdata,this.callBackItemData.bind( this ) ) ;
        return item ;
    }

    callBackItemData( idx : number )
    {
        let self = this ;
        this.mData.getRecorderItemData(idx).reqDetail(()=>{
            self.mDlgDetail.showDlg(null,this.mData.getRecorderItemData(idx) ) ;
        } ) ;
    }

    closeDlg()
    {
        super.closeDlg();
        this.mData.leaveRecorderDlg();
    }
    // update (dt) {}
}
