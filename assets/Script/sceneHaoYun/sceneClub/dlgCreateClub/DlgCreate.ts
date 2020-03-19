import DlgBase from "../../../common/DlgBase";
import Prompt from "../../../globalModule/Prompt";
import { ICreateClubVerifyDataHY } from "../ISceneClubHYData";
import TimeLock from "../../../common/TimeLocker";

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
export default class DlgCreate extends DlgBase {

    @property(cc.EditBox)
    mName: cc.EditBox = null;

    @property(cc.EditBox)
    mPhoneNum: cc.EditBox = null;

    @property(cc.EditBox)
    mVerifyCode: cc.EditBox = null;

    @property(cc.Button)
    mBtnReqCode : cc.Button = null ;

    mData : ICreateClubVerifyDataHY = null ;
    mReqCodeLocker : TimeLock = new TimeLock(30) ;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose);
        this.mData = jsUserData ;
        this.mName.string = "" ;
        this.mPhoneNum.string = "" ;
        this.mVerifyCode.string = "" ;
    }

    onBtnGetCode()
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

    onBtnDoCreate()
    {
        if ( this.mName.string.length < 3 )
        {
            Prompt.promptText( "名字长度不合法" );
            return ;
        }

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

        let self = this ;
        this.mData.reqDoCreate(this.mPhoneNum.string,this.mVerifyCode.string,this.mName.string,( ret : number , content : string )=>{
            Prompt.promptText(content);
            if ( 0 == ret )
            {
                self.mReqCodeLocker.reset();
                self.closeDlg();
            }
        } ) ;
    }

    

    // update (dt) {}
}
