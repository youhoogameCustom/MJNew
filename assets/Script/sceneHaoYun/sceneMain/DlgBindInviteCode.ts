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
export default class DlgBindInviteCode extends DlgBase {

    @property(cc.EditBox)
    mInviteCode: cc.EditBox = null;

    mAlreadyCode : string = "" ;

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void  )
    {
        this.mAlreadyCode = jsUserData ;
        super.showDlg(pfResult,jsUserData,pfOnClose );
        this.mInviteCode.string = jsUserData as string ;
    }

    onBtnBind()
    {
        if ( this.mInviteCode.string.length < 1 )
        {
            Prompt.promptText( "邀请码不能为空" );
            return ;
        }

        if ( this.mAlreadyCode.length > 1 )
        {
            Prompt.promptText( "已经绑定了邀请码：["+ this.mAlreadyCode + "] 不能绑定其他邀请码" );
            return ;
        }

        if ( this.pFuncResult != null )
        {
            this.pFuncResult( this.mInviteCode.string );
        }
        return ;
    }
}
