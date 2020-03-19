  // Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
export interface IMemberItemDataHY
{
    uid : number ;
    remarkName : string ;
    offlineTime : string ; // empty string means online ;
    job : string ; 
    canOperate : boolean ; 
    isSelf : boolean ;
    isInClub : boolean ;
}

export interface IDlgMemberOptDataHY extends IMemberItemDataHY
{
    canTransfer : boolean ;
    canUpgrade : boolean ;
    canDowngrade : boolean ;
    canKickOut : boolean ;
    isForbitonEnter : boolean ;

    reqTransfer( pret : ( ret : number , result : string )=>void ) : void ;
    reqUpgrade( pret : ( ret : number , result : string )=>void ) : void ;
    reqKickOut( pret : ( ret : number , result : string )=>void ) : void ;
    reqSwitchForbiton( pret : ( ret : number , result : string )=>void ) : void ;
    reqModifyRemark( pret : ( ret : number , result : string )=>void ) : void ; 
}

export interface IApplyItemDataHY
{
    applyUID : number ;
    applyContent : string ;
}

export interface ILogItemDataHY
{
    logContent : string ;
    time : string ;
}

 export default interface IDlgMemberDataHY {

    getMemberCnt( isSeatchResult : boolean ) : number ;
    getMemberItemData( idx : number, isSeatchResult : boolean ) : IMemberItemDataHY ;

    getApplyCnt() : number ;
    getApplyItemData( idx : number ) : IApplyItemDataHY ;

    getLogCnt() : number ;
    getLogItemData( idx : number ) : ILogItemDataHY ;

    reqExitClub() : void ;
    reqInvite( uid : number , pRet : ( ret : number , retContent : string )=>void ) : void ;
    reqResponeApply( uid : number , isAgree : boolean ,pRet : ( ret : number , retContent : string )=>void ) ;
    reqSearch( uid : number , pRet : ( ret : number , retContent : string )=>void );

    getOnlineCntDesc() : string ;

    getDlgMemberOperateData( memberUID : number ) : IDlgMemberOptDataHY ;
}
