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
export default class DlgLoginByPhone extends DlgBase {

    @property(cc.EditBox)
    mPhoneNumber: cc.EditBox = null;

    @property(cc.EditBox)
    mPasword: cc.EditBox = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onBtnNext()
    {
        if ( this.mPhoneNumber.string.length == 0 || this.mPasword.string.length == 0 )
        {
            Prompt.promptText( "手机号和密码都不能为空" );
            return ;
        }

        if(!(/^1[3456789]\d{9}$/.test(this.mPhoneNumber.string)))
        { 
            Prompt.promptText("手机号码有误，请重填");
            return; 
        }

        let pat=new RegExp("[^a-zA-Z0-9\_]","i");
        if ( pat.test(this.mPasword.string ) == true )
        {
            Prompt.promptDlg("密码包含非法字符,只能包含数字，字母，下划线");
            return ;
        }

        if ( this.pFuncResult != null )
        {
            this.pFuncResult({ acc : this.mPhoneNumber.string, pwd : this.mPasword.string });
        }
    }

    onBtnForget()
    {
        
    }

    // update (dt) {}
}
