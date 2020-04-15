import ClubDataBase from "../../../clientData/clubData/ClubDataBase";
import { IControlCenterDataHY } from "../ISceneClubHYData";
import IOpts from "../../../opts/IOpts";
import { eMsgType } from "../../../common/MessageIdentifer";
import OptsFactory from "../../../opts/OptsFactory";

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
export default class ClubDataBaseDataHY extends ClubDataBase implements IControlCenterDataHY {

    ///----IControlCenterDataHY
    pResultCallBackAddWanFa :  ( ret : number , content : string )=>void = null ;

    get clubName() : string
    {
        return this.name ;
    }

    get isOpening() : boolean
    {
        return this.isStoped == false ;
    }

    get isSelfCreater() : boolean
    {
        return this.isSelfClubOwner();
    }

    getWanFaList() : { idx : number , content : string }[] 
    {
        let v :  { idx : number , content : string } [] = [] ;
        let opss = this._dataJs["opts"]["optsInfo"] ;
        if ( opss == null )
        {
            opss = [] ;
            opss.push({ optsIdx : 0 , optsValue : this._dataJs["opts"] });
        }

        for ( let item of opss )
        {
            let idx = item["optsIdx"] ;
            let opts = OptsFactory.createOpts(item["optsValue"]) ;
            v.push( { idx : idx,content : opts.getRuleDesc() } );
        }
        return v ;
    }

    reqAddWanFa( opts : IOpts , pRet : ( ret : number , content : string )=>void) 
    {
        let clubID = this.clubID;
        let msg = {} ;
        msg["clubID"] = clubID ;
        msg["opts"] = opts.jsOpts ;
        let self = this ;
        this.sendClubMsgWithCallBack(eMsgType.MSG_CLUB_ADD_ROOM_OPTS,msg,( js : Object )=>{
            let ret : number = js["ret"] ;
            if ( ret == 0 )
            {
                self.fetchData(true);
                self.pResultCallBackAddWanFa = pRet ;
                return true ;
            }

            let verror = [ "添加成功" , "权限不足","玩法数量超过限制","重复玩法","无效玩家对象"] ;
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

    reqDeleteWanFa( idx : number , pRet : ( ret : number , content : string )=>void )
    {
        let clubID = this.clubID;
        let msg = {} ;
        msg["clubID"] = clubID ;
        msg["idx"] = idx ;
        let self = this ;
        this.sendClubMsgWithCallBack(eMsgType.MSG_CLUB_ERASE_ROOM_OPTS,msg,( js : Object )=>{
            let ret : number = js["ret"] ;
            if ( ret == 0 )
            {
                self.fetchData(true);
            }

            let verror = [ "删除成功" , "权限不足","操作失败","参数错误","无效玩家对象"] ;
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

    reqChangeName( newName : string , pRet : ( ret : number , content : string )=>void )
    {
        let clubID = this.clubID;
        let msg = {} ;
        msg["clubID"] = clubID ;
        msg["name"] = newName ;
        let self = this ;
        this.sendClubMsgWithCallBack(eMsgType.MSG_CLUB_UPDATE_NAME,msg,( js : Object )=>{
            let ret : number = js["ret"] ;
            if ( ret == 0 )
            {
                self.name = newName;
            }

            let verror = [ "改名字成功" , "权限不足","新名字与旧名字一样了","名字已经被其他俱乐部使用了","无效玩家对象"] ;
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

    reqSwitchState( pRet : ( ret : number , content : string )=>void ) 
    {
        let msg = {} ;
        msg["clubID"] = this.clubID;
        msg["isPause"] = this.isStoped ? 0 : 1 ; // just do switch ;
        let self = this ;
        this.sendClubMsgWithCallBack(eMsgType.MSG_CLUB_SET_STATE,msg,( js : Object )=>{
            let ret : number = js["ret"] ;
            if ( ret == 0 )
            {
                self.isStoped = !self.isStoped;
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
            pRet(ret,info) ;
            return true ;
        } );
    }

    onMsg( msgID : number , msgData : Object ) : boolean
    {
        let ret = super.onMsg(msgID,msgData) ;
        if ( ret && msgID == eMsgType.MSG_CLUB_REQ_INFO )
        {
             if ( this.pResultCallBackAddWanFa != null )
             {
                 this.pResultCallBackAddWanFa(0,"添加成功");
                 this.pResultCallBackAddWanFa = null ;
             }
        }
        return ret ;
    }

    reqDismiss() : void 
    {
        this.reqDismissClub() ;
    }
}
