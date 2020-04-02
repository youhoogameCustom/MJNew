import PlayerInfoItem from "../../commonItem/PlayerInfoItem";
import LedLabel from "../../commonItem/ledLabel";
import DlgBase from "../../common/DlgBase";
import IMianSceneDataHY from "./IMainSceneDataHY"

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
export default class MainScene extends cc.Component {

    @property(PlayerInfoItem)
    mSelfInfo : PlayerInfoItem = null ;

    @property(cc.Label)
    mDiamond : cc.Label = null ;

    @property(LedLabel)
    mNotice : LedLabel = null  ;

    @property([PlayerInfoItem])
    mRankPlayers : PlayerInfoItem[] = [] ;

    @property(DlgBase)
    mDlgRank : DlgBase = null ;

    @property(DlgBase)
    mDlgCreateRoom : DlgBase = null ;

    @property(DlgBase)
    mDlgJoin : DlgBase = null ;

    @property(DlgBase)
    mDlgExchange : DlgBase = null ;

    @property(DlgBase)
    mDlgActive : DlgBase = null ;

    @property(DlgBase)
    mDlgRecorder : DlgBase = null ;

    @property(DlgBase)
    mDlgRules : DlgBase = null ;

    @property(DlgBase)
    mDlgMail : DlgBase = null ;

    @property(DlgBase)
    mDlgSetting : DlgBase = null ;

    @property(DlgBase)
    mDlgBindPhone : DlgBase = null ;

    @property(DlgBase)
    mDlgAddDiamond : DlgBase = null ;

    mData : IMianSceneDataHY = null ;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        if ( this.mData )
        {
            let self = this ;
            this.mData.reqData( ()=>{self.refresh(); } );
        }
    }

    protected refresh()
    {
        if ( null == this.mData )
        {
            console.error( "main scene data should not be null" );
            return ;
        }
        this.mSelfInfo.refreshInfo(this.mData.selfUID);
        this.mDiamond.string = this.mData.diamondSelf + "" ;
        this.mNotice.string = this.mData.notice ;
        // refresh rank detail ;
        for ( let v of this.mRankPlayers )
        {
            v.node.active = false ;
        }

        let vRanks = this.mData.getRank3();
        let cnt = vRanks.length < this.mRankPlayers.length ? vRanks.length : this.mRankPlayers.length ;
        for ( let idx = 0 ; idx < cnt ; ++idx )
        {
            this.mRankPlayers[idx].node.active = true ;
            this.mRankPlayers[idx].refreshInfo(vRanks[idx]);
        }
    }

    onBtnAddDiamond()
    {

    }

    onBtnMail()
    {

    }

    onBtnInviteCode()
    {

    }

    onBtnSetting()
    {

    }

    onBtnRankDetail()
    {

    }

    onBtnClub()
    {

    }

    onBtnCreateRoom()
    {

    }

    onBtnJoinRoom()
    {

    }

    onBtnDouDiZhu()
    {

    }

    onBtnExchange()
    {

    }

    onBtnActive()
    {

    }

    onBtnRecorder()
    {

    }

    onBtnRules()
    {

    }

    onBtnBindPhone()
    {

    }

    // update (dt) {}
}
