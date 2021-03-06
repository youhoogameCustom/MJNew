// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import Prompt from "./Prompt"
import DlgBase from "../common/DlgBase"
import { eGameType } from "../common/clientDefine";
import { eMsgPort } from "../common/MessageIdentifer";
@ccclass
export default class Utility  {

    public static showTip( strDesc : string, isOneBtn? : boolean, pfResult? : ( jsResult : Object ) => void , pfOnClose? : ( pTargetDlg : DlgBase ) => void )
    {
        let node = cc.find("persisteNodeClientApp");
        let pompt = node.getComponent(Prompt);
        pompt.showDlg(strDesc,isOneBtn,pfResult,pfOnClose ) ;
    }

    public static showPromptText( strDesc : string , nDisplayTime : number = 2 )
    {
        let node = cc.find("persisteNodeClientApp");
        let pompt = node.getComponent(Prompt);
        pompt.showPromptText(strDesc,nDisplayTime) ;
    }

    public static doWait()
    {

    }

    public static onWaitArrived()
    {

    } 
    
    public static audioBtnClick()
    {
        let url = "sound/Button32";
        cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
            if ( err )
            {
                console.error( "load btn audio error + url = " + url );
                return ;
            }
            cc.audioEngine.playEffect(clip, false);  
        });
    }

    public static bgMusic( idx : number )
    {
        let url = "bgMusic/bg_music1"+idx;
        cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
            if ( err )
            {
                console.error( "load btn audio error + url = " + url );
                return ;
            }
            cc.audioEngine.playMusic(clip,true);  
        });
    }

    public static getMsgPortByGameType( game : eGameType ) : eMsgPort
    {
        switch( game )
        {
            case eGameType.eGame_CFMJ:
            {
                return eMsgPort.ID_MSG_PORT_CFMJ;
            }
            break;
            case eGameType.eGame_NCMJ:
            {
                return eMsgPort.ID_MSG_PORT_NCMJ;
            }
            break ;
            case eGameType.eGame_AHMJ:
            {
                return eMsgPort.ID_MSG_PORT_AHMJ;
            }
            break ;
            case eGameType.eGame_DDMJ:
            {
                return eMsgPort.ID_MSG_PORT_DDMJ;
            }
            break ;
            case eGameType.eGame_SZMJ:
            {
                return eMsgPort.ID_MSG_PORT_SZMJ;
            }
            break;
            case eGameType.eGame_SDMJ:
            {
                return eMsgPort.ID_MSG_PORT_SDMJ;
            }
            break ;
            case eGameType.eGame_NJMJ:
            {
                return eMsgPort.ID_MSG_PORT_NJMJ ;
            }
            break ;
            case eGameType.eGame_LuoMJ:
            {
                return eMsgPort.ID_MSG_PORT_LUOMJ;
            }
            break ;
            case eGameType.eGame_ARQMJ:
            {
                return eMsgPort.ID_MSG_PORT_ARQMJ ;
            }
            case eGameType.eGame_MQMJ:
            {
                return eMsgPort.ID_MSG_PORT_MQMJ ;
            }
        }

        cc.error( "get can not parse port from gametype = " + game );
        return undefined ;
    }

    public static getMsgPortByRoomID( nRoomID : number ) {
        // begin(2) , portTypeCrypt (2),commonNum(2)
        let nComNum = nRoomID % 100;
        let portTypeCrypt = (Math.floor(nRoomID / 100)) % 100;
        if (nComNum >= 50) {
            portTypeCrypt = portTypeCrypt + 100 - nComNum;
        } else {
            portTypeCrypt = portTypeCrypt + 100 + nComNum;
        }
        return (portTypeCrypt %= 100);
    }

    public static requestPhoneVerifyCode( phoneNum : string ) 
    {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                let response = xhr.responseText;
                let ret : Object = JSON.parse(response);
                if ( ret["status"] == "fail")
                {
                    Prompt.promptText(ret["message"]);
                }
            }
        };
        let url = "http://cf2.youhoox.com/?ct=club&ac=send_code&mobile=" + phoneNum ;
        xhr.open("GET", url, true);
        xhr.send();
    }

    public static checkPhoneVerifyCode( phoneNum : string , code : string )
    {
        return new Promise(( resolve , reject )=>{
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    let response = xhr.responseText;
                    console.log(response);
                    let ret : Object = JSON.parse(response);
                    if ( ret["status"] != "fail")
                    {
                         resolve();
                    }
                    else
                    {
                        reject();
                    }
                }
            };
            let url = "http://cf2.youhoox.com/?ct=club&ac=check_code&mobile=" + phoneNum + "&code=" + code;
            xhr.open("GET", url, true);
            xhr.send();
        } );
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
