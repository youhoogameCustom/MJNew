import ClubDataBase from "../../../clientData/clubData/ClubDataBase";
import { IControlCenterDataHY } from "../ISceneClubHYData";
import IOpts from "../../../opts/IOpts";
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

const {ccclass, property} = cc._decorator;

@ccclass
export default class ClubDataBaseDataHY extends ClubDataBase implements IControlCenterDataHY {

    ///----IControlCenterDataHY
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

    }

    reqAddWanFa( opts : IOpts , pRet : ( ret : number , content : string )=>void) 
    {

    }

    reqDeleteWanFa( idx : number , pRet : ( ret : number , content : string )=>void )
    {

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

    reqDismiss() : void 
    {
        this.reqDismissClub() ;
    }
}
