import IDlgMemberDataHY, { IMemberItemDataHY, IApplyItemDataHY, ILogItemDataHY, IDlgMemberOptDataHY } from "./IDlgMemberDataHY";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

class MemberItemData implements IDlgMemberOptDataHY
{
    uid : number = 100;
    remarkName : string = "mike";
    offlineTime : string = "" ; // empty string means online ;
    job : string = "chair man"; 
    canOperate : boolean = true; 
    isSelf : boolean = false ;
    isInClub : boolean = true;

    canTransfer : boolean = true;
    canUpgrade : boolean = true;
    canDowngrade : boolean = false;
    canKickOut : boolean = true;
    isForbitonEnter : boolean = true;

    reqTransfer( pret : ( ret : number , result : string )=>void ) : void 
    {

    }

    reqUpgrade( pret : ( ret : number , result : string )=>void ) : void 
    {

    }

    reqKickOut( pret : ( ret : number , result : string )=>void ) : void 
    {

    }

    reqSwitchForbiton( pret : ( ret : number , result : string )=>void ) : void 
    {

    }

    reqModifyRemark( newmark : string , pret : ( ret : number , result : string )=>void ) : void 
    {

    }
}

class applyItemData implements IApplyItemDataHY
{
    eventID : number = 102;
    applyContent : string = "want to join you club";
}

class logItemData implements ILogItemDataHY
{
    logContent : string = "some thing is ok yes";
    logTimeStr : string = "2020-1-1 20:12:22";
}

export default class TestDlgMemberDataHY implements IDlgMemberDataHY {

    vMembers : MemberItemData[] = [] ;
    vApplyItems : applyItemData[] = [] ;

    vLogItems : logItemData[] = [] ;

    reqMembersDatas( pret : ()=>void ) : void 
    {
        pret();
    }

    leaveMembers() : void 
    {

    }

    getMemberCnt( isSeatchResult : boolean ) : number 
    {
        return isSeatchResult ? 1 : 20 ;
    }

    getMemberItemData( idx : number, isSeatchResult : boolean ) : IMemberItemDataHY 
    {
        if ( this.vMembers.length <= idx )
        {
            this.vMembers.push( new MemberItemData() );
        }

        return this.vMembers[idx] ;
    }

    getApplyCnt() : number 
    {
        return 20 ;
    }

    getApplyItemData( idx : number ) : IApplyItemDataHY 
    {
        if ( this.vApplyItems.length <= idx )
        {
            this.vApplyItems.push( new applyItemData() );
        }

        return this.vApplyItems[idx] ;
    }

    getLogCnt() : number 
    {
        return 20 ;
    }

    getLogItemData( idx : number ) : ILogItemDataHY 
    {
        if ( this.vLogItems.length <= idx )
        {
            this.vLogItems.push( new logItemData() );
        }

        return this.vLogItems[idx] ;
    }

    reqExitClub() : void 
    {

    }

    reqInvite( uid : number , pRet : ( ret : number , retContent : string )=>void ) : void 
    {

    }

    reqResponeApply( uid : number , isAgree : boolean ,pRet : ( ret : number , retContent : string )=>void ) 
    {

    }

    reqSearch( uid : number , pRet : ( ret : number , retContent : string )=>void )
    {

    }

    getOnlineCntDesc() : string 
    {
        return "在线 10/20" ;
    }

    getDlgMemberOperateData( memberUID : number ) : IDlgMemberOptDataHY 
    {
        return this.vMembers[0] ;
    }
 
}
