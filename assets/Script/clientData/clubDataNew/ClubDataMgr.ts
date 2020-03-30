import { eMsgType, eMsgPort } from "../../common/MessageIdentifer";
import { IOneMsgCallback } from "../../common/NetworkInterface";
import ClientApp from "../../globalModule/ClientApp";
import Network from "../../common/Network";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export default class ClubDataMgr {

    init()
    {

    }

    sendClubMsg( jsMsg : any , msgID : number, callBack? : IOneMsgCallback ) : boolean
    {
        let selfUID = ClientApp.getInstance().getClientPlayerData().getSelfUID() ;
        return Network.getInstance().sendMsg( jsMsg, msgID, eMsgPort.ID_MSG_PORT_CLUB, selfUID ,callBack) ;
    }

    onMsg( msgID : eMsgType , msg : Object ) : boolean 
    {
        return false ;
    }
}
