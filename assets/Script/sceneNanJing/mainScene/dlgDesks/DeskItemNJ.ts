import { IDeskItemDataNJ } from "./IDlgDesksDataNJ";
import PlayerInfoItem from "../../../commonItem/PlayerInfoItem";

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
export default class DeskItemNJ extends cc.Component {

    protected pfCallBack : ( roomID : number )=>void = null ;

    @property( [PlayerInfoItem ] )
    mPlayers : PlayerInfoItem[] = [] ;

    @property(cc.Label)
    mRound : cc.Label = null ;

    @property(cc.Node)
    mIconBao : cc.Node = null ;

    @property(cc.Node)
    mIconFeng : cc.Node = null ;

    @property(cc.Node)
    mIconJie : cc.Node = null ;

    @property(cc.Node)
    mIconZa : cc.Node = null ;

    mRoomID : number = 0 ;
    // LIFE-CYCLE CALLBACKS:

    refresh( data : IDeskItemDataNJ , callBack : ( roomID : number )=>void )
    {
        this.pfCallBack = callBack ;
        this.mRoomID = data.roomID ;
        this.mRound.node.active = data.isRoomStarted ;
        this.mIconBao.active = (!data.isRoomStarted) && data.isBao;
        this.mIconFeng.active = ( !data.isRoomStarted)  && data.isFeng;
        this.mIconJie.active = ( !data.isRoomStarted ) && data.isJie ;
        this.mIconZa.active = (!data.isRoomStarted ) && data.isZa ;
        if ( data.isRoomStarted )
        {
            this.mRound.string = data.roundDesc ;
        }

        for ( let item of this.mPlayers )
        {
            item.node.active = false ;
        }

        let uids = data.getPlayers();
        for ( let idx = 0 ; idx < uids.length ; ++idx )
        {
            this.mPlayers[idx].node.active = true ;
            this.mPlayers[idx].refreshInfo(uids[idx]);
        }
    }

    onBtnClickItem()
    {
        if ( this.pfCallBack != null )
        {
            this.pfCallBack( this.mRoomID );
        }
    }
}
