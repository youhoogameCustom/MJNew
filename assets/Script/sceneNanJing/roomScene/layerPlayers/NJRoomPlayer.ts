import RoomPlayer, { eRoomPlayerState } from "../../../scene/roomScene/layerPlayers/RoomPlayer";
import { IRoomPlayerData } from "../../../scene/roomScene/IRoomSceneData";

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
export default class NJRoomPlayer extends RoomPlayer {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    mHuaNode : cc.Node = null ;
    // onLoad () {}

    start () {

    }

    set state( rs : eRoomPlayerState )
    {
        this.mState = rs ;
        switch ( this.mState )
        {
            case eRoomPlayerState.RPS_Empty:
            {
                //this.mCommonInfoNode.active = false ;
                //this.mReadyIcon.active = false ;
                //this.mInfoItem.node.active = false ;
                //this.mBtnSitdown.active = false ;
                this.node.active = false ;
            }
            break;
            case eRoomPlayerState.RPS_Normal:
            {
                this.node.active = true ;
                //this.mCommonInfoNode.active = true ;
                //this.mBtnSitdown.active = false ;
                this.mTextChat.node.parent.active = false ;
                this.mVoiceChat.node.parent.active = false ;
                this.mEmoji.node.active = false ;
                this.mBankIconPos.active = false ;
                this.mInfoItem.node.active = true ;
            }
            break;
            case eRoomPlayerState.RPS_WaitSitDown:
            {
                //this.mCommonInfoNode.active = false ;
                this.mReadyIcon.active = false ;
                //this.mBtnSitdown.active = true ;
            }
            break ;
        }

    }

    set huaCnt( cnt : number ) 
    {
        this.mHuaCnt.string = " x " + cnt ;
    }

    refresh( data : IRoomPlayerData ) : void 
    {
        super.refresh(data);
        if ( data == null )
        {
            return ;
        }

        this.huaCnt = data.huaCnt ;
    }

    // update (dt) {}
}
