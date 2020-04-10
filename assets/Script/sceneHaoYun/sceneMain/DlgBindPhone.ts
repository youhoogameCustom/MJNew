import DlgBase from "../../common/DlgBase";
import Prompt from "../../globalModule/Prompt";
import TimeLock from "../../common/TimeLocker";
import { IDlgBindPhoneDataHY } from "./IMainSceneDataHY";

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
export default class DlgBindPhone extends DlgBase {

    @property(cc.EditBox)
    mPhoneNum : cc.EditBox = null ;

    @property(cc.EditBox)
    mVerifyCode : cc.EditBox = null ;

    @property(cc.EditBox)
    mPwd : cc.EditBox = null ;
    // LIFE-CYCLE CALLBACKS:
    mReqCodeLocker : TimeLock = new TimeLock(30) ;
    mData : IDlgBindPhoneDataHY = null ;
    // onLoad () {}

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void  )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose) ; 
        this.mData = jsUserData ;
    }

    onBtnRequestVerifyCode()
    {
        if(!(/^1[3456789]\d{9}$/.test(this.mPhoneNum.string)))
        { 
            Prompt.promptText("手机号码有误，请重填");
            return; 
        } 

        if ( this.mReqCodeLocker.isLocking )
        {
            Prompt.promptText("正在等待接受验证码，请稍后再重试");
            return; 
        }

        this.mData.reqVerifyCode( this.mPhoneNum.string ) ;
        this.mReqCodeLocker.lock();
    }

    onBtnComfirm()
    {
        if(!(/^1[3456789]\d{9}$/.test(this.mPhoneNum.string)))
        { 
            Prompt.promptText("手机号码有误，请重填");
            return; 
        }

        if ( this.mVerifyCode.string.length < 4 )
        {
            Prompt.promptText( "验证码不能为空" );
            return ;
        }

        let pat=new RegExp("[^a-zA-Z0-9\_]","i");
        if ( pat.test(this.mPwd.string ) == true )
        {
            Prompt.promptDlg("密码里含有非法字符,只能包含数字，字母 ,下划线");
            return ;
        }

        let self = this ;
        this.mData.reqBindPhone(this.mPhoneNum.string,this.mVerifyCode.string,this.mPwd.string, ( ret : number , conetnt : string )=>{
            Prompt.promptText(conetnt); 
            if ( ret == 0 )
            {
                self.closeDlg();
            }
        } ) ;
    }
}
