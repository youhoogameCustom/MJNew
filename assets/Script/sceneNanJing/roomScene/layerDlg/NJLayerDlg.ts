import LayerDlg from "../../../scene/roomScene/layerDlg/LayerDlg";
import DlgHuaDetail from "../../../scene/roomSceneSZ/layerDlg/DlgHuaDetail";
import MJRoomData from "../../../scene/roomScene/roomData/MJRoomData";
import NJDlgResultSingle from "./dlgResultSingle/NJDlgResultSingle";
import NJTestDataResultSingle from "./dlgResultSingle/NJTestDataResultSingle";
import NJDlgResultTotal from "./dlgResultTotal/NJDlgResultTotal";
import TestTotalResultDataNJ from "./dlgResultTotal/TestTotalResultDataNJ";

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

    @property(NJDlgResultSingle)
    mDlgResultSingleNJ : NJDlgResultSingle = null ;

    @property(NJDlgResultTotal)
    mDlgResultTotalNJ : NJDlgResultTotal = null ;

    mRoomData : MJRoomData = null ;
 
    showDlgHuaDetail()
    {
        this.mDlgHuaDetail.showDlg(null,this.mRoomData );
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
        if ( G_TEST )
        {
            let self = this ;
            setTimeout(() => {
                let data = new TestTotalResultDataNJ();
                self.mDlgResultTotalNJ.showDlg(null,data,null) ;
            }, 2000 );
        }

    }

    showDlgResultSingle() : void 
    {
        this.mDlgResultSingleNJ.showDlg( this.onDlgResultSingleResult.bind( this ),this.mData.getSingleResultDlgData()) ;
    }

    protected onDlgResultSingleResult( isFinal : boolean )
    {
        if ( isFinal )
        {
            this.mDlgResultTotalNJ.showDlg(null,this.mData.getTotalResultDlgData()) ;
        }
        else
        {
            this.mData.reqDoReady();
        }
    }

    // dlg total result
    showDlgResultTotal() : void 
    {
        this.mDlgResultSingleNJ.setIsFinal(true);
        if ( this.mDlgResultSingleNJ.isShow() )
        {
            return ;
        }
        this.mDlgResultTotal.showDlg(null,this.mData.getTotalResultDlgData()) ;
    }

    // update (dt) {}
}
