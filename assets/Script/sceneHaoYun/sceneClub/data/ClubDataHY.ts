import ClubData from "../../../clientData/clubData/ClubData";
import IDlgMemberDataHY, { IMemberItemDataHY, IApplyItemDataHY, ILogItemDataHY, IDlgMemberOptDataHY } from "../dlgMember/IDlgMemberDataHY";
import { IClubListItemHYData, IDlgNoticeData } from "../ISceneClubHYData";
import ClientPlayerClubs from "../../../clientData/ClientPlayerClubs";
import { eClubDataComponent } from "../../../clientData/clubData/ClubDefine";
import ClubDataRoomsHY from "./ClubDataRoomsHY";
import ClubDataRecorderHY from "./ClubDataRecorderHY";
import ClubDataBase from "../../../clientData/clubData/ClubDataBase";
import ClubDataEventsHY from "./ClubDataEventsHY";
import ClubDataMembersHY from "./ClubDataMembersHY";
import { eMsgType } from "../../../common/MessageIdentifer";
import IClubDataComponent from "../../../clientData/clubData/IClubDataComponent";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

 
export default class ClubDataHY extends ClubData implements IDlgMemberDataHY , IClubListItemHYData , IDlgNoticeData {

    pCallBackMeberDataRefresh : ()=>void = null ;

    init( clubID : number, clubs : ClientPlayerClubs )
    {
        this._PlayerClubs = clubs ;
        this._ClubID = clubID ;
        this.vClubDataComponents[eClubDataComponent.eClub_BaseData] = new ClubDataBase();
        this.vClubDataComponents[eClubDataComponent.eClub_Events] = new ClubDataEventsHY();
        this.vClubDataComponents[eClubDataComponent.eClub_Members] = new ClubDataMembersHY();
        this.vClubDataComponents[eClubDataComponent.eClub_Recorders] = new ClubDataRecorderHY();
        this.vClubDataComponents[eClubDataComponent.eClub_Rooms] = new ClubDataRoomsHY();
        for ( let v of Object.keys(this.vClubDataComponents) )
        {
            let type = parseInt(v);
            this.vClubDataComponents[type].init(this,type) ;
        }
        
        this.vClubDataComponents[eClubDataComponent.eClub_BaseData].fetchData(false);
        this.vClubDataComponents[eClubDataComponent.eClub_Events].fetchData(false);
        this.vClubDataComponents[eClubDataComponent.eClub_Rooms].fetchData(false);
    }
    
    onDataRefreshed( data : IClubDataComponent )
    {
        super.onDataRefreshed(data); 
        if ( data.getType() == eClubDataComponent.eClub_Members )
        {
            if ( this.pCallBackMeberDataRefresh != null )
            {
                this.pCallBackMeberDataRefresh(); 
            }
        }
    }

    // ---IDlgMemberDataHY
    reqMembersDatas( pret : ()=>void ) : void 
    {
        this.pCallBackMeberDataRefresh = pret ;
        if ( this.getClubMembers().isDataOutOfDate() )
        {
            this.getClubMembers().fetchData(true);
            return ;
        }
        this.pCallBackMeberDataRefresh();
    }

    leaveMembers() : void 
    {
        this.pCallBackMeberDataRefresh = null ;
    }

    getMemberCnt( isSeatchResult : boolean ) : number 
    {
        let cnt = ( this.getClubMembers() as ClubDataMembersHY ).getMemberCnt();
        if ( cnt != 0  )
        {
            return cnt ;
        }

        return this.getClubBase().curMemberCnt ;
    }

    getMemberItemData( idx : number, isSeatchResult : boolean ) : IMemberItemDataHY 
    {
        let p = this.getClubMembers() as ClubDataMembersHY ;
        return p.getMemberItemData(idx,isSeatchResult ) ;
    }

    getApplyCnt() : number 
    {
        return ( this.getClubEvents() as ClubDataEventsHY ).getApplyCnt();
    }

    getApplyItemData( idx : number ) : IApplyItemDataHY 
    {
        return ( this.getClubEvents() as ClubDataEventsHY ).getApplyItemData(idx);
    }

    getLogCnt() : number 
    {
        return ( this.getClubEvents() as ClubDataEventsHY ).getLogCnt();
    }

    getLogItemData( idx : number ) : ILogItemDataHY 
    {
        return ( this.getClubEvents() as ClubDataEventsHY ).getLogItemData(idx);
    }

    reqExitClub() : void 
    {
        this._PlayerClubs.reqLeaveCurClub();
    }

    reqInvite( uid : number , pRet : ( ret : number , retContent : string )=>void ) : void 
    {
        let p = this.getClubMembers() as ClubDataMembersHY ;
        p.reqInvite(uid,pRet ) ;
    }

    reqResponeApply( eventID : number , isAgree : boolean ,pRet : ( ret : number , retContent : string )=>void ) 
    {
        ( this.getClubEvents() as ClubDataEventsHY ).reqResponeApply(eventID,isAgree,pRet );
    }

    reqSearch( uid : number , pRet : ( ret : number , retContent : string )=>void )
    {
        let p = this.getClubMembers() as ClubDataMembersHY ;
        p.reqSearch(uid,pRet ) ;
    }

    getOnlineCntDesc() : string 
    {
        return (this.getClubMembers() as ClubDataMembersHY).getOnlineCntDesc() ;
    }

    getDlgMemberOperateData( memberUID : number ) : IDlgMemberOptDataHY 
    {
        return (this.getClubMembers() as ClubDataMembersHY).getDlgMemberOperateData(memberUID) ;
    }

    //----IClubListItemHYData
    get clubID (): number 
    {
        return super.getClubID();
    }

    get ownerUID() : number
    {
        return super.getClubBase().creatorUID ;
    }

    get name() : string 
    {
        return super.getClubBase().name ;
    }

    get memberCnt() : number
    {
        return this.getMemberCnt(false);
    } 

    ///----IDlgNoticeData
    isSelfMgr() : boolean 
    {
        return super.isSelfPlayerMgr();
    }

    //clubName : string ;
    get clubNotice() : string 
    {
        return super.getClubBase().notice ;
    }

    reqModifyNotice( notice : string , pret : ( ret : number , content : string )=>void ) : void 
    {
        let msg = {} ;
        msg["clubID"] = this.clubID;
        msg["notice"] = notice ;
        let self = this ;
        this._PlayerClubs.sendClubMsg(msg,eMsgType.MSG_CLUB_UPDATE_NOTICE,( js : Object )=>{
            let ret : number = js["ret"] ;
            if ( ret == 0 )
            {
                self.getClubBase().notice = notice;
            }

            let verror = ["操作成功","权限不足"] ;
            let info = "" ;
            if ( ret < verror.length )
            {
                info = verror[ret] ;
            }
            else
            {
                info = "error code = " + ret ;
            }
            pret(ret,info) ;
            return true ;
        } );
    }
}
