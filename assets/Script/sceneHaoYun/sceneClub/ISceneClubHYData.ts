import IDlgMemberDataHY from "./dlgMember/IDlgMemberDataHY";
import IOpts from "../../opts/IOpts";
import IDlgRecorderDataHY from "./dlgRecorder/IDlgRecorderDataHY";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export interface IDeskItemHYData
{
    isEmpty() : boolean ;
    getPlayers() : {posIdx : number , uid : number }[] ;
    getRoomID() : number ;
    getRound() : string ;
    getDesc() : string ;
}

export interface IClubListItemHYData
{
    clubID : number ;
    ownerUID : number ;
    name : string ;
    memberCnt : number ;
}

export interface IClubListHYData
{
    getClubListCnt() : number ;
    getClubListItemData( idx : number ) : IClubListItemHYData ;
    getCurSelectedClubID() : number ;
}

export interface ICreateClubVerifyDataHY
{
    reqVerifyCode( phoneNum : string ) : void ;
    reqDoCreate( phoneNum : string , code : string , clubName : string, pResultCallBack: ( ret : number , content : string )=>void ) : void;
}
 

export interface IControlCenterDataHY
{
    clubName : string ;
    isOpening : boolean ;
    isSelfCreater : boolean ;
    getWanFaList() : { idx : number , content : string }[] ;
    reqAddWanFa( opts : IOpts , pRet : ( ret : number , content : string )=>void) ;
    reqDeleteWanFa( idx : number , pRet : ( ret : number , content : string )=>void );
    reqChangeName( newName : string , pRet : ( ret : number , content : string )=>void );
    reqSwitchState( pRet : ( ret : number , content : string )=>void ) ;
    reqDismiss() : void ;
}

export interface IDlgNoticeData
{
    isSelfMgr() : boolean ;
    clubName : string ;
    clubNotice : string ;
    reqModifyNotice( notice : string , pret : ( ret : number , content : string )=>void ) : void ;
}

export class ClubEventHY
{
    static Event_AddClub : string = "Event_AddClub";
    static Event_RemoveClub : string = "Event_RemoveClub" ;
    static Event_UpdateNotice : string = "Event_UpdateNotice" ;
}

export default interface ISceneClubHYData 
{
    reqDatas( pRet : ()=>void ) : void ;
    leaveScene() : void;
    getCurClubOwnerUID() : number ;
    getCurClubNotice() : string ;
    getCurClubID() : number ;
    setCurClubID( clubID : number ) : void ;

    getDeskCnt( seatCnt : number ) : number ;
    getDeskItemData(seatCnt : number , idx : number ) : IDeskItemHYData  ;  

    getCLubListData() : IClubListHYData;

    getDlgMemberData() : IDlgMemberDataHY ;
    
    getCreateClubVerifyData() : ICreateClubVerifyDataHY ;

    reqJoinClub( clubID : number , pResultCallBack: ( ret : number , content : string )=>void ) : void ;

    isSelfClubMgr() : boolean ;
    reqExitClub() : void ;

    getControlCenterData() : IControlCenterDataHY ;

    getRecorderData() : IDlgRecorderDataHY;

    getDlgNoticeData() : IDlgNoticeData ;
}
