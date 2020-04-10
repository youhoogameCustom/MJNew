import PlayerInfoItem from "../../commonItem/PlayerInfoItem";
import LedLabel from "../../commonItem/ledLabel";
import DlgBase from "../../common/DlgBase";
import IMianSceneDataHY from "./IMainSceneDataHY"
import Prompt from "../../globalModule/Prompt";
import IOpts from "../../opts/IOpts";
import { SceneName } from "../../common/clientDefine";
import MainSceneDataHY from "./data/MainSceneDataHY";

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
    mDlgBindInviteCode : DlgBase = null ;

    @property(MainSceneDataHY)
    mData : MainSceneDataHY = null ;
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
        let data = this.mData.getShopExchangeData();
        data.isDefaultExchangePage = false ;
        this.mDlgExchange.showDlg(null,data ) ;
    }

    onBtnMail()
    {
        this.mDlgMail.showDlg(null,this.mData.getMailData());
    }

    onBtnInviteCode()
    {
        let self = this ;
        let code = this.mData.getBindedInviteCode() ;
        this.mDlgBindInviteCode.showDlg(( newCode : string )=>{
            self.mData.reqBindInviteCode(newCode,( ret : number , content : string )=>{
                Prompt.promptText(content);
                if ( ret == 0 )
                {
                    self.mDlgBindInviteCode.closeDlg();
                }
            } ) ;
        },code) ;
    }

    onBtnSetting()
    {
        this.mDlgSetting.showDlg();
    }

    onBtnInviteFriend()
    {
        console.log( "invite friend" );
    }

    onBtnRankDetail()
    {
        this.mDlgRank.showDlg(null, this.mData.getRankData() ) ;
    }

    onBtnClub()
    {
        cc.director.loadScene(SceneName.Scene_Club) ;
    }

    onBtnCreateRoom()
    {
        let data = this.mData ;
        this.mDlgCreateRoom.showDlg(( opts : IOpts )=>{ 
            data.reqCreateRoom(opts,( ret : number, roomID : number , content : string )=>{
                if ( 0 == ret )
                {
                    data.reqJoinRoom(roomID) ;
                }
                else
                {
                    Prompt.promptText( content ) ;
                }
            }) ;
        }) ;
    }

    onBtnJoinRoom()
    {
        let self = this ;
        this.mDlgJoin.showDlg(( roomID : string )=>{
            if ( roomID.length < 6 )
            {
                Prompt.promptText("请输入正确的房间号");
                return ;
            }
            self.mData.reqJoinRoom( parseInt(roomID) ) ;
        }) ;
    }

    onBtnDouDiZhu()
    {
        Prompt.promptText( "暂未开放，敬请期待" );
    }

    onBtnExchange()
    {
        let data = this.mData.getShopExchangeData();
        data.isDefaultExchangePage = true ;
        this.mDlgExchange.showDlg(null,data ) ;
    }

    onBtnActive()
    {
        this.mDlgActive.showDlg() ;
    }

    onBtnRecorder()
    {
        this.mDlgRecorder.showDlg(null,this.mData.getRecorderData() ) ;
    }

    onBtnRules()
    {
        this.mDlgRules.showDlg();
    }

    onBtnBindPhone()
    {
        this.mDlgBindPhone.showDlg(null,this.mData.getDlgBindPhoneData() );
    }

    // update (dt) {}
}
