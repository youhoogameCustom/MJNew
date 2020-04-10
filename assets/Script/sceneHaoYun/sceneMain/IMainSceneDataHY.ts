import IDlgRecorderDataHY from "../sceneClub/dlgRecorder/IDlgRecorderDataHY";
import IOpts from "../../opts/IOpts";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
export interface IRankItemDataHY
{
    rankIdx : number ; // zero base 
    uid : number ;
    rounds : number ; 
}

export interface IDlgRankDataHY
{
    selfUID : number ;
    selfRankIdx : number ; // -1 means not enter rank ;
    selfRounds : number ; 

    getRankItemCnt() : number ;
    getRanItemData( idx : number ) : IRankItemDataHY ;   
    reqRankData( ret : ()=>void ) : void ;  
}

export interface IShopDiamonItemDataHY
{
    id : number ;
    desc : string ;
    extraDiamond : number ;
    price : number ;
}

export interface IShopExchangeItemDataHY
{
    id : number ;
    desc : string ;
    iconURL : string ;
    scorePrice : number ;
}

export interface IDlgShopExchangeDataHY
{
    diamondSelf : number ;
    scoreSelf : number ;
    isDefaultExchangePage : boolean ;
    reqShopData( pret : ()=>void ) : void ;
    getBindedInviteCode() : string ;

    getDiamondItems() : IShopDiamonItemDataHY[] ;
    getExhangeItems() : IShopExchangeItemDataHY[] ;

    reqBuyDiamond( itemID : number ) : void ;
    reqExchangeItem( itemID : number, pret : ( ret : number , content : string )=>void ) : void ;
}

export interface IDlgBindPhoneDataHY
{
    reqVerifyCode( phone : string ) : void ;
    reqBindPhone( phone : string , code : string , pwd : string, pret : ( ret : number, content : string )=>void  ) : void ;
}

export interface IMailItemHY
{
    content : string ;
    timeStr : string ;
}

export interface IDlgMailDataHY
{
    reqMailData( pret : ()=>void ) : void ;
    getMailItems() : IMailItemHY[] ; 
}

export default interface IMainSceneDataHY {
    selfUID : number ;
    diamondSelf : number ;
    notice : string ;
    getRank3() : number[] ;
    reqData( pret : ()=>void ) : void ;
    getRecorderData() : IDlgRecorderDataHY;
    getRankData() : IDlgRankDataHY ;
    getShopExchangeData() : IDlgShopExchangeDataHY ;
    getMailData() : IDlgMailDataHY ;
    getDlgBindPhoneData() : IDlgBindPhoneDataHY ;

    reqCreateRoom( opts : IOpts , pret : ( ret : number , roomID : number, content : string )=>void ) : void ;
    reqJoinRoom( nroomID : number ) : void ;

    getBindedInviteCode() : string ;
    reqBindInviteCode( newCode : string , pret : ( ret : number , content : string )=>void ) : void ;
}
