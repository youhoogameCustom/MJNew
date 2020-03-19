import IDlgMemberDataHY from "./dlgMember/IDlgMemberDataHY";

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
 
export default interface ISceneClubHYData 
{
    getCurClubOwnerUID() : number ;
    getCurClubNotice() : string ;
    getCurClubID() : number ;
    setCurClubID( clubID : number ) : void ;

    getDeskCnt( seatCnt : number ) : number ;
    getDeskItemData(seatCnt : number , idx : number ) : IDeskItemHYData  ;  

    getCLubListData() : IClubListHYData;

    getDlgMemberData() : IDlgMemberDataHY ;
    
    getCreateClubVerifyData() : ICreateClubVerifyDataHY ;

    reqJoinClub( clubID : string , pResultCallBack: ( ret : number , content : string )=>void ) : void ;
}
