import DlgBase from "../../common/DlgBase";
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
export default class DlgJoinClubOrRoom extends DlgBase {

    @property(cc.Label)
    mInputedNumber: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose);
        this.mInputedNumber.string = "" ;
    }

    onBtnNum( btn : cc.Event )
    {
        if ( this.mInputedNumber.string.length > 8 )
        {
            Prompt.promptText( "ID 太长了" );
            return ;
        }

        let name = btn.target.name ;
        this.mInputedNumber.string = this.mInputedNumber.string + name ;
    }

    onBtnDelete()
    {
        if ( this.mInputedNumber.string.length >= 1 )
        {
            this.mInputedNumber.string = this.mInputedNumber.string.substr(0,this.mInputedNumber.string.length -1 ) ;
        }
    }

    onBtnComform()
    {
        if ( this.mInputedNumber.string.length < 1 )
        {
            Prompt.promptText( "ID为空" );
            return ;
        }

        if ( this.pFuncResult != null )
        {
            this.pFuncResult(this.mInputedNumber.string );
        }
    }
    // update (dt) {}
}
