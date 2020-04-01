import LoginScene from "../../scene/loginScene";
import DlgBase from "../../common/DlgBase";
import Network from "../../common/Network";
import { eMsgType, eMsgPort } from "../../common/MessageIdentifer";
import ClientApp from "../../globalModule/ClientApp";
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
export default class LoginSceneHY extends LoginScene {

    @property(DlgBase)
    mLoginByPhone : DlgBase = null ;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
    onBtnLoginByPhone()
    {
        let self = this ;
        this.mLoginByPhone.showDlg(( data : {acc : string , pwd : string } )=>{
            let msgLogin = {};
            msgLogin["cAccount"] = data.acc ;
            msgLogin["cPassword"] = data.pwd ;
            Network.getInstance().sendMsg(msgLogin,eMsgType.MSG_PLAYER_LOGIN,eMsgPort.ID_MSG_PORT_GATE,1,
                ( jsmg : Object )=>{
                    let ret : number = jsmg["nRet"] ;
                    //self.pTipMask.active = ret == 0 ;
                    if ( ret == 0 )  // clientData will recieved base data , and invoke loading scene ;
                    {
                        // save a valid account , most used when developing state ;
                        ClientApp.getInstance().getConfigMgr().getClientConfig().storeValidAccound(data.acc,data.pwd );
                        console.log("login scene login ok");
                        return true ;
                    }

                    Prompt.promptText("登录失败code=" + ret );
                    self.pTipMask.active = false ;
                    return true ;
                });
            self.pTipMask.active = true ;
        }) ;
    }
}
