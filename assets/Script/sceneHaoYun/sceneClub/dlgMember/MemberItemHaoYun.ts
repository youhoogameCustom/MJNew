import { IMemberItemDataHY } from "./IDlgMemberDataHY";
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
export default class MemberItemHaoYun extends cc.Component {

    @property(PlayerInfoItem)
    mPlayerInfo : PlayerInfoItem = null ;

    @property(cc.Label)
    mRemark : cc.Label = null ;

    @property(cc.Label)
    mUID : cc.Label = null ;

    @property(cc.Label)
    mOfflineTime : cc.Label = null ;

    @property(cc.Label)
    mJob : cc.Label = null ;

    @property(cc.Node)
    mBtnExit : cc.Node = null ;

    @property(cc.Node)
    mBtnOperate : cc.Node = null ;
     
    @property(cc.Node)
    mBtnInvite : cc.Node = null ;

    mPlayerUID : number = 0 ;

    mfCallBack : ( uid : number , isAct : boolean, isExit : boolean, isInvite : boolean  )=>void = null ;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    refresh( itemData : IMemberItemDataHY , pcallBack : ( uid : number , isAct : boolean, isExit : boolean, isInvite : boolean  )=>void )
    {
        this.mPlayerInfo.refreshInfo(itemData.uid);
        this.mRemark.node.active = itemData.remarkName.length > 0 ;
        if ( itemData.remarkName.length > 0 )
        {
            this.mRemark.string = "(" + itemData.remarkName + ")";
        }

        this.mUID.string = itemData.uid + "" ;
        this.mOfflineTime.string = itemData.offlineTime.length > 2 ? itemData.offlineTime : "在线" ;
        this.mOfflineTime.node.color = cc.Color.WHITE.fromHEX( itemData.offlineTime.length > 2 ? "#935134" : "#3CAC4C" );
        this.mJob.node.active = itemData.isInClub ;
        if ( itemData.isInClub )
        {
            this.mJob.string = itemData.job;
        }

        this.mBtnExit.active = itemData.isSelf ;
        this.mBtnOperate.active = itemData.canOperate ;
        this.mBtnInvite.active = itemData.isInClub == false;

        this.mPlayerUID = itemData.uid ;

        this.mfCallBack = pcallBack ;
    }

    onBtnExit()
    {
        if ( null != this.mfCallBack )
        {
            this.mfCallBack(this.mPlayerUID,false,true,false ) ;
        }
    }

    onBtnOperate()
    {
        if ( null != this.mfCallBack )
        {
            this.mfCallBack(this.mPlayerUID,true,false,false ) ;
        }
    }

    onBtnInvite()
    {
        if ( null != this.mfCallBack )
        {
            this.mfCallBack(this.mPlayerUID,false,false,true ) ;
        }
    }
}
