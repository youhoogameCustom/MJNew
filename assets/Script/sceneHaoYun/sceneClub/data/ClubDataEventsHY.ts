import ClubDataEvent, { ClubEvent } from "../../../clientData/clubData/ClubDataEvent";
import { IApplyItemDataHY, ILogItemDataHY } from "../dlgMember/IDlgMemberDataHY";
import { eMsgType } from "../../../common/MessageIdentifer";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

 class ClubEventItemHY extends ClubEvent implements IApplyItemDataHY,ILogItemDataHY
 {
    get applyContent() : string
    {
        return this.eventString;
    }

    // get logContent() : string
    // {
    //     return this.eventString ;
    // }

    // get logTimeStr() : string 
    // {
    //     return this.timeStr ;
    // }
 }

export default class ClubDataEventsHY extends ClubDataEvent {

    getApplyCnt() : number 
    {
        return this.vEvents.length ;
    }

    getApplyItemData( idx : number ) : IApplyItemDataHY 
    {
        return this.vEvents[idx] as ClubEventItemHY ;
    }

    getLogCnt() : number 
    {
        return this.vEventLog.length ;
    }

    getLogItemData( idx : number ) : ILogItemDataHY 
    {
        return this.vEventLog[idx] ;
    }

    reqResponeApply( eventID : number , isAgree : boolean ,pRet : ( ret : number , retContent : string )=>void ) 
    {
        let msg = {} ;
        msg["eventID"] = eventID;
        msg["detial"] = {} ;
        msg["detial"]["isAgree"] = isAgree ? 1 : 0 ;
        msg["clubID"] = this.clubID; 
        let self = this ;
        this.sendClubMsgWithCallBack(eMsgType.MSG_CLUB_PROCESS_EVENT,msg,( js : Object )=>{
            let ret : number = js["ret"] ;
            if ( ret == 0 )
            {
                self.fetchData(true);
            }

            let verror = [ "已经处理","事件不存在","已经被其他管理员处理了","权限不足","你没有登录","参数错误" ];
            let info = "" ;
            if ( ret < verror.length )
            {
                info = verror[ret] ;
            }
            else
            {
                info = "error code = " + ret ;
            }
            pRet(ret,info) ;
            return true ;
        } );
    }

    createEvent() : ClubEvent
    {
        return new ClubEventItemHY();
    }
}
