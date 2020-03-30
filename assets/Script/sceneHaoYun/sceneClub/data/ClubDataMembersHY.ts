import ClubDataMembers, { ClubMember } from "../../../clientData/clubData/ClubDataMembers";
import { IMemberItemDataHY, IDlgMemberOptDataHY } from "../dlgMember/IDlgMemberDataHY";
import { eClubPrivilige } from "../../../clientData/clubData/ClubDefine";
import ClientApp from "../../../globalModule/ClientApp";
import { eMsgType, eMsgPort } from "../../../common/MessageIdentifer";
import * as _ from "lodash"
import Network from "../../../common/Network";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
class ClubMemberHY extends ClubMember implements IDlgMemberOptDataHY
{
    //uid : number ;
    remarkName : string = "";
    offlineTime : string = ""; // empty string means online ;
    get job() : string 
    {
        switch ( this.privliage )
        {
            case eClubPrivilige.eClubPrivilige_Creator:
                return "创建者";
            case eClubPrivilige.eClubPrivilige_Manager:
                return "管理员";
            case eClubPrivilige.eClubPrivilige_Normal:
                return "会员" ;
            case eClubPrivilige.eClubPrivilige_Forbid:
                return "禁止进入";
            default:
                return "未知";
        }
    } 

    get canOperate() : boolean
    {
        return this.isInClub && this.isSelf == false ;
    } 
    
    get isSelf() : boolean
    {
        return this.uid == ClientApp.getInstance().getClientPlayerData().getSelfUID();
    }

    isInClub : boolean = true ;

    get canTransfer() : boolean
    {
        return this._members.getClub().getClubBase().isSelfClubOwner();
    }
    //canUpgrade : boolean ;
    //canDowngrade : boolean ;
    get canKickOut() : boolean
    {
        return this.canBeKick ;
    }

    get isForbitonEnter() : boolean
    {
        return this.privliage == eClubPrivilige.eClubPrivilige_Forbid ;
    }

    set isForbitonEnter( b : boolean )
    {
        this.privliage = b ? eClubPrivilige.eClubPrivilige_Forbid : eClubPrivilige.eClubPrivilige_Normal ;
    }

    reqTransfer( pret : ( ret : number , result : string )=>void ) : void 
    {
        this.reqSetMemberPrivige(eClubPrivilige.eClubPrivilige_Creator,pret ) ;
    }

    reqUpgrade( pret : ( ret : number , result : string )=>void ) : void 
    {
        if ( this.isForbitonEnter )
        {
            pret( 1, "当前为禁止进入状态，请先解除后，再操作。" );
            return ;
        }

        this.reqSetMemberPrivige( this.privliage == eClubPrivilige.eClubPrivilige_Manager ? eClubPrivilige.eClubPrivilige_Manager : eClubPrivilige.eClubPrivilige_Normal,pret ) ;
    }

    reqKickOut( pret : ( ret : number , result : string )=>void ) : void 
    {
        let msg = {} ;
        msg["clubID"] = this._members.getClub().clubID;
        msg["kickUID"] = this.uid ;
        let self = this ;
        this._members.sendClubMsgWithCallBack( eMsgType.MSG_CLUB_UPDATE_PRIVILIGE , msg, ( msgData : Object )=>{
            let ret = msgData["ret"] ;
            let verror = ["操作成功","该玩家不是俱乐部会员","权限不足","","错误玩家对象"] ;
            if ( ret < verror.length )
            {
                pret(ret,verror[ret]);
            }
            else
            {
                pret(ret,"error code " + ret);
            }

            if ( 0 == ret )
            {
                _.remove(self._members.vMembers,( a :ClubMember )=>{ return a.uid == self.uid ;}) ;
            }
            return true ;
        } ) ;
        
    }

    reqSwitchForbiton( pret : ( ret : number , result : string )=>void ) : void 
    {
        this.reqSetMemberPrivige( this.isForbitonEnter ? eClubPrivilige.eClubPrivilige_Normal : eClubPrivilige.eClubPrivilige_Forbid,pret ) ;
    }

    reqModifyRemark( pret : ( ret : number , result : string )=>void ) : void 
    {

    }
    
    protected reqSetMemberPrivige( privliage : eClubPrivilige ,pret : ( ret : number , result : string )=>void )
    {
        let msg = {} ;
        msg["clubID"] = this._members.getClub().clubID;
        msg["playerUID"] = this.uid ;
        msg["privilige"] = privliage ;
        let self = this ;
        this._members.sendClubMsgWithCallBack( eMsgType.MSG_CLUB_UPDATE_PRIVILIGE , msg, ( msgData : Object )=>{
            let ret = msgData["ret"] ;
            let verror = ["操作成功","权限不足","管理员数量超过限制","该玩家不是俱乐部会员","错误玩家对象","权限相同"] ;
            if ( ret < verror.length )
            {
                pret(ret,verror[ret]);
            }
            else
            {
                pret(ret,"error code " + ret);
            }

            if ( 0 == ret )
            {
                self.privliage = privliage ;
            }
            return true ;
        } ) ;
    }
}
 
export default class ClubDataMembersHY extends ClubDataMembers {

    mSeachResult : ClubMemberHY = null ;
    mSeachUID : number = 0 ;

    getMemberCnt() : number
    {
        return this.vMembers.length ;
    }

    getMemberItemData( idx : number, isSeatchResult : boolean ) : IMemberItemDataHY 
    {
        if ( isSeatchResult == false )
        {
            return this.vMembers[idx] as ClubMemberHY ;
        }

        return this.mSeachResult ;
    }

    getOnlineCntDesc() : string 
    {
        let cnt = 0 ;
        for ( let v of this.vMembers )
        {
            if ( v.isOnline )
            {
                ++cnt ;
            }
        }

        return "在线：" + cnt + "/" + this.vMembers.length ;
    }

    getDlgMemberOperateData( memberUID : number ) : IDlgMemberOptDataHY 
    {
        return super.getClubMember(memberUID) as ClubMemberHY ;
    }

    reqSearch( uid : number , pRet : ( ret : number , retContent : string )=>void )
    {
        this.mSeachUID = uid ;
        this.mSeachResult = this.getClubMember(uid) as ClubMemberHY ;
        if ( this.mSeachResult != null )
        {
            pRet(0,"搜索成功");
            return ;
        }

        // do sou suo 
        let js = {} ;
        js["nReqID"] = uid ;
        js["isDetail"] = 1 ;
        let self = this ;
        Network.getInstance().sendMsg(js,eMsgType.MSG_REQUEST_PLAYER_DATA,eMsgPort.ID_MSG_PORT_DATA,uid,( jsmsg : Object )=>{
            let readUID = jsmsg["uid"] ;
            if ( readUID == null || readUID != self.mSeachUID )
            {
                console.error( "req player data info error uid = " + uid + " not seach id " );
                return false;
            }    

            if ( jsmsg["ret"] != 0 )
            {
                pRet( jsmsg["ret"] ,"找不到该玩家，请核对玩家ID") ;
                return true ;
            }

            self.mSeachResult = new ClubMemberHY() ;
            self.mSeachResult.uid = self.mSeachUID ;
            self.mSeachResult.isInClub = false ;
            self.mSeachResult.isOnline = jsmsg["isOnline"] == 1 ;
            self.mSeachResult.dataMembers = this ;
            pRet( 0,"操作成功") ;
            return false ;
        } ) ;
    }

    reqInvite( uid : number , pRet : ( ret : number , retContent : string )=>void ) : void 
    {

    }

    protected createMemberItem() : ClubMember
    {
        return new ClubMemberHY();
    }
}
