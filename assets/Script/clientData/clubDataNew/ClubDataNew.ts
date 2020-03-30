import IOpts from "../../opts/IOpts";
import { eMsgType } from "../../common/MessageIdentifer";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export default class ClubDataNew {

    vOpts : IOpts[] = [] ;
    clubID : number = 0 ;
    
    protected mJsInfo : Object = null ;

    get name() : string 
    {
        if ( null == this.mJsInfo )
        {
            return "null" ;
        }
        return this.mJsInfo["name"];
    }
 
    get notice() : string
    {
        if ( null == this.mJsInfo )
        {
            return "null" ;
        }
        return this.mJsInfo["notice"] ;
    }

    get creatorUID() : number
    {
        if ( null == this.mJsInfo )
        {
            return 0 ;
        }
        return this.mJsInfo["creator"] ;
    }

    get diamond() : number
    {
        return this.mJsInfo["diamond"] ;
    }

    get state() : number
    {
        return this.mJsInfo["state"] ;
    }

    get isStoped() : boolean
    {
        return this.state == 1 ;
    }

    get capacity() : number
    {
        return this.mJsInfo["capacity"] ;
    }

    onMsg( msgID : number , msgData : Object ) : boolean
    {
        switch ( msgID )
        {
            // case eMsgType.MSG_CLUB_REQ_INFO:
            // {
            //     let clubID = msgData["clubID"] ;
            //     if ( clubID != this.clubID )
            //     {
            //         return false ;
            //     }
    
            //     this._dataJs = msgData;
            //     this.doInformDataRefreshed(true);
            //     return true ;
            // }
            // break ;
            // case eMsgType.MSG_CLUB_SET_ROOM_OPTS:
            // {
            //     let ret : number = msgData["ret"] ;
            //     let vError = [ "玩法更改成功" , "权限不足","code 2"," code 3","无效玩家对象"] ;
            //     if ( ret < vError.length )
            //     {
            //         Utility.showPromptText(vError[ret]) ;
            //         if ( 0 == ret )
            //         {
            //             this.doInformDataRefreshed(true);
            //         }
            //     }
            //     else
            //     {
            //         Utility.showTip("unknown error code = " + ret ) ;
            //         this.fetchData(true);
            //     }
            // }
            // break ;
            // case eMsgType.MSG_CLUB_UPDATE_NAME:
            // {
            //     let ret : number = msgData["ret"] ;
            //     let vError = [ "改名字成功" , "权限不足","新名字与旧名字一样了","名字已经被其他俱乐部使用了","无效玩家对象"] ;
            //     if ( ret < vError.length )
            //     {
            //         Utility.showPromptText(vError[ret]) ;
            //         if ( 0 == ret )
            //         {
            //             this.doInformDataRefreshed(true);
            //         }
            //     }
            //     else
            //     {
            //         Utility.showTip("unknown error code = " + ret ) ;
            //         this.fetchData(true);
            //     }
            //     return true ;
            // }
            // break;
            // case eMsgType.MSG_CLUB_SET_STATE:
            // {
            //     let ret : number = msgData["ret"] ;
            //     let vError = [ "操作成功" , "权限不足"] ;
            //     if ( ret < vError.length )
            //     {
            //         Utility.showPromptText(vError[ret]) ;
            //         if ( 0 == ret )
            //         {
            //             this.doInformDataRefreshed(true);
            //         }
            //     }
            //     else
            //     {
            //         Utility.showTip("unknown error code = " + ret ) ;
            //         this.fetchData(true);
            //     }
            // }
            // break ;
            // default:
            // return false ;
        }
 
        return true ;
    }
}
