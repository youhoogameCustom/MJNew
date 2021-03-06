import ClubData from "./ClubData";
import { eMsgPort } from "../../common/MessageIdentifer";
import ClientApp from "../../globalModule/ClientApp";
import { IOneMsgCallback } from "../../common/NetworkInterface";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export default abstract class IClubDataComponent  {
    private nLastFetchDataTime : number = 0 ;
    private _ClubData : ClubData = null ;
    private _type : number = 0 ;
    protected _fetchDataPromiseResolve : ()=>void = null ;
    getClub() : ClubData { return this._ClubData ;}

    init( clubData : ClubData, type : number )
    {
        this._ClubData = clubData ;
        this.nLastFetchDataTime = 0 ;
        this._type = type ;
    }

    getType() : number
    {
        return this._type;
    }

    get clubID() : number
    {
        return this.getClub().getClubID();
    }

    abstract fetchData( isforce : boolean ) : void;
    abstract asyncFetchData( isforce : boolean ) : Promise<any>;
    
    doInformDataRefreshed( isResetInterval : boolean )
    {
        if ( isResetInterval )
        {
            this.nLastFetchDataTime = Date.now();
        }

        if ( this._fetchDataPromiseResolve != null )
        {
            this._fetchDataPromiseResolve();
            this._fetchDataPromiseResolve = null ;
        }

        this.getClub().onDataRefreshed(this);
    }

    isDataOutOfDate() : boolean  // by seconds 
    {
        let interval = (Date.now() - this.nLastFetchDataTime ) ;
        console.log( "isDataOutOfDate = " + interval );
        return interval > 1000 * 150 ; // 15 seconds , refresh rate
    }

    onMsg( msgID : number , msgData : Object ) : boolean 
    {
        return false ;
    }

    sendClubMsg( msgID : number , msgData : Object )
    {
        this._ClubData.sendMsg(msgData,msgID,eMsgPort.ID_MSG_PORT_CLUB,ClientApp.getInstance().getClientPlayerData().getSelfUID()) ;
    }

    sendClubMsgWithCallBack( msgID : number , msgData : Object , callBack? : IOneMsgCallback )
    {
        this._ClubData.sendMsg(msgData,msgID,eMsgPort.ID_MSG_PORT_CLUB,ClientApp.getInstance().getClientPlayerData().getSelfUID(),callBack) ;
    }  

    onDestroy()
    {
        cc.systemEvent.targetOff(this);
    }
}
