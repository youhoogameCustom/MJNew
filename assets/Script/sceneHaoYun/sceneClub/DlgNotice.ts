import DlgBase from "../../common/DlgBase";
import { IDlgNoticeData } from "./ISceneClubHYData";
import Prompt from "../../globalModule/Prompt";

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
export default class DlgNotice extends DlgBase {

    @property(cc.Label)
    mClubName: cc.Label = null;

    @property(cc.EditBox)
    mInputedNotice : cc.EditBox = null ;

    @property(cc.Node)
    mBtnModify : cc.Node = null ;

    @property(cc.Node)
    mBtnDoModify : cc.Node = null ;

    mData : IDlgNoticeData = null ;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose);
        this.mData = jsUserData ;

        this.mInputedNotice.string = this.mData.clubNotice ;
        this.mClubName.string = this.mData.clubName ;
        this.mBtnModify.active = this.mData.isSelfMgr();
        this.mBtnDoModify.active = false ;
    }

    onBtnModify()
    {
        this.mInputedNotice.focus();
        this.mBtnModify.active = false ;
        this.mBtnDoModify.active = !this.mBtnModify.active ;
    }

    onBtnDoModify()
    {
        this.mBtnModify.active = true ;
        this.mBtnDoModify.active = !this.mBtnModify.active ;

        if ( this.mInputedNotice.string == this.mData.clubNotice )
        {
            Prompt.promptText( "公告没有改变" );
            return ;
        }

        let self = this ;
        this.mData.reqModifyNotice(this.mInputedNotice.string,( ret : number , content : string )=>{
            Prompt.promptText(content);
            if ( ret )
            {
                self.mInputedNotice.string = self.mData.clubNotice;
            }
        } ) ;
    }

    onEditBegin()
    {
        if ( this.mData.isSelfMgr() == false )
        {
            this.mInputedNotice.blur();
            return ;
        }

        this.mBtnDoModify.active = true ;
        this.mBtnModify.active = false ;
    }

    // update (dt) {}
}
