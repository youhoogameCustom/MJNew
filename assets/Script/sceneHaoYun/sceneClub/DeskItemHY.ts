import { IDeskItemHYData } from "./ISceneClubHYData";
import PlayerInfoItem from "../../commonItem/PlayerInfoItem";

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
export interface IDeskItemHYDelegate
{
    onClickOpt( roomID : number ) : void ;
    onClickEnter( roomID : number  ) : void ;
}

@ccclass
export default class DeskItemHY extends cc.Component {

    protected mDelegate : IDeskItemHYDelegate = null ;
    @property(cc.Node)
    mContentNode : cc.Node = null ;

    @property(cc.Node)
    mEmptyNode : cc.Node = null ;
    
    @property([PlayerInfoItem])
    mPlayers : PlayerInfoItem[] = [] ;

    @property(cc.Label)
    mRoomID : cc.Label = null ;

    @property(cc.Label)
    mRound : cc.Label = null ;

    @property(cc.Label)
    mDesc : cc.Label = null ;
    // LIFE-CYCLE CALLBACKS:
    mRoomIDNum : number = 0 ;
    // onLoad () {}

    start () {

    }

    refresh( data : IDeskItemHYData, delegate : IDeskItemHYDelegate  )
    {
        this.mDelegate = delegate ;
        this.mContentNode.active = false == data.isEmpty();
        this.mEmptyNode.active = !this.mContentNode.active ;
        this.mRound.string = data.getRound();
        if ( this.mEmptyNode.active )
        {
            return ;
        }

        this.mRoomIDNum = data.getRoomID();
        this.mRoomID.string = "" + this.mRoomIDNum ;
        this.mPlayers.forEach( ( v : PlayerInfoItem )=>{ v.node.active = true ; } ) ;
        let players = data.getPlayers();
        for ( let p of players )
        {
            this.mPlayers[p.posIdx].node.active = true ;
            this.mPlayers[p.posIdx].refreshInfo(p.uid);
        }
    }

    onBtnQuestionMark()
    {
        if ( null != this.mDelegate )
        {
            this.mDelegate.onClickOpt(this.mRoomIDNum) ;
        }
    }

    onBtnEnterDesk()
    {
        if ( null != this.mDelegate )
        {
            this.mDelegate.onClickEnter(this.mRoomIDNum) ;
        }
    }
    // update (dt) {}
}
