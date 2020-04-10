import IModule from "../../../common/IModule";
import IMainSceneDataHY, { IDlgBindPhoneDataHY, IDlgShopExchangeDataHY, IDlgMailDataHY, IDlgRankDataHY } from "../IMainSceneDataHY";
import IOpts from "../../../opts/IOpts";
import ClientApp from "../../../globalModule/ClientApp";
import DataRecorderHY from "./DataRecorderHY";
import IDlgRecorderDataHY from "../../sceneClub/dlgRecorder/IDlgRecorderDataHY";
import { eMsgType, eMsgPort } from "../../../common/MessageIdentifer";
import Utility from "../../../globalModule/Utility";
import { SceneName } from "../../../common/clientDefine";
import DlgRankDataHY from "./DlgRankDataHY";
import DlgMailDataHY from "./DlgMailDataHY";
import DlgShopExchangeDataHY from "./DlgShopExchangeDataHY";

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
export default class MainSceneDataHY extends IModule implements IMainSceneDataHY,IDlgBindPhoneDataHY {

    mRank3 : number[] = [] ;
    mRecorderData : DataRecorderHY = null ;
    mRankData : IDlgRankDataHY = null ;
    mMailData : IDlgMailDataHY = null ;
    mShopData : IDlgShopExchangeDataHY = null ;

    get selfUID() : number
    {
        if ( G_TEST )
        {
            return 0 ;
        }
        return ClientApp.getInstance().getClientPlayerData().getSelfUID();
    } 

    get diamondSelf() : number
    {
        if ( G_TEST )
        {
            return 0 ;
        }
        return ClientApp.getInstance().getClientPlayerData().getBaseData().diamond ;
    }

    get notice() : string
    {
        return "this is a notice , it should be fixed" ;
    }

    getRank3() : number[] 
    {
        return this.mRank3 ;
    }

    reqData( pret : ()=>void ) : void 
    {
        pret();
    }

    getRecorderData() : IDlgRecorderDataHY
    {
        if ( this.mRecorderData == null )
        {
            this.mRecorderData = new DataRecorderHY( this.selfUID,false );
        }

        return this.mRecorderData ;
    }

    getRankData() : IDlgRankDataHY 
    {
        if ( null == this.mRankData )
        {
            this.mRankData = new DlgRankDataHY(this);
        }
        return this.mRankData ;
    }

    getShopExchangeData() : IDlgShopExchangeDataHY 
    {
        if ( null == this.mShopData )
        {
            this.mShopData = new DlgShopExchangeDataHY(this);
        }
        return this.mShopData ;
    }

    getMailData() : IDlgMailDataHY 
    {
        if ( null == this.mMailData )
        {
            this.mMailData = new DlgMailDataHY(this);
        }
        return this.mMailData ;
    }

    getDlgBindPhoneData() : IDlgBindPhoneDataHY 
    {
        return this ;
    }

    reqCreateRoom( opts : IOpts , pret : ( ret : number , roomID : number, content : string )=>void ) : void 
    {
        let msgCreateRoom = opts.jsOpts ;
        msgCreateRoom["uid"] = this.selfUID;
        console.log( "reqCreateRoom" );
        let port = Utility.getMsgPortByGameType(opts.gameType);
        this.sendMsg(msgCreateRoom,eMsgType.MSG_CREATE_ROOM,port,msgCreateRoom["uid"],( msg : Object)=>{
            let ret = msg["ret"] ;
            let roomID = msg["roomID"] ;
            pret(ret,roomID,ret == 0 ? "创建房间成功" : ("error code " + ret ) ) ;
            return true ;
        });
    }

    reqJoinRoom( nroomID : number ) : void 
    {
        let baseData = ClientApp.getInstance().getClientPlayerData().getBaseData();
        let msg = { } ;
        msg["roomID"] = nroomID;
        msg["uid"] = baseData.uid;
        let port = Utility.getMsgPortByRoomID(nroomID); 
        if ( eMsgPort.ID_MSG_PORT_ALL_SERVER <= port || port < eMsgPort.ID_MSG_PORT_LUOMJ  )
        {
            Utility.showTip( "房间不存在或已经解散 code" + 0 );
            return ;
        }

        this.sendMsg(msg,eMsgType.MSG_ENTER_ROOM,port,nroomID,( msg : Object)=>
        {
            let ret = msg["ret"] ;
            if ( ret )
            {
                Utility.showTip( "房间不存在或已经解散 code" + ret );
                return true;
            }
            console.log( "set join room id = " + nroomID );
            ClientApp.getInstance().getClientPlayerData().getBaseData().stayInRoomID = nroomID ;
            cc.director.loadScene(SceneName.Scene_Room ) ;
            return true ;
        } );
    }

    getBindedInviteCode() : string 
    {
        return "not implement" ;
    }

    reqBindInviteCode( newCode : string , pret : ( ret : number , content : string )=>void ) : void 
    {

    }

    // IDlgBindPhoneDataHY
    reqVerifyCode( phone : string ) : void 
    {
        Utility.requestPhoneVerifyCode(phone) ;
    }

    reqBindPhone( phoneNum : string , code : string , pwd : string, pret : ( ret : number, content : string )=>void  ) : void 
    {
        // do check code 
        let self = this ;
        Utility.checkPhoneVerifyCode(phoneNum,code).then( ()=>{
            let msg = {} ;
            msg["account"] = phoneNum ;
            msg["password"] = pwd ;
            self.sendMsg(msg,eMsgType.MSG_PLAYER_BIND_ACCOUNT1,eMsgPort.ID_MSG_PORT_DATA,this.selfUID,( ret : Object)=>{
                let vret = ["操作已经成功","该手机已经绑定其他账号","玩家id错误","","","账号或者密码错误","","操作超时"] ;
                let retcode = ret["ret"] ;
                pret(retcode, retcode < vret.length ? vret[retcode] : ( "操作错误code = " + retcode) );
                return true ;
            } ) ;
        }
        ,()=>{
            pret(-1,"手机号验证失败" );
        } ) ;
    }


    //---- from super
    onMsg( msgID : eMsgType, msg : Object   ) : boolean
    {
         if ( this.mMailData != null && ( ( this.mMailData as DlgMailDataHY ).onMsg(msgID,msg ) ))
         {
            return true ;
         }

         return super.onMsg(msgID,msg) ;
    }
}
