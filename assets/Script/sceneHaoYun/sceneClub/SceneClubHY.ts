import PlayerInfoItem from "../../commonItem/PlayerInfoItem";
import LedLabel from "../../commonItem/ledLabel";
import ListView, { IAbsAdapter } from "../../commonItem/ListView";
import DlgBase from "../../common/DlgBase";
import ISceneClubHYData from "./ISceneClubHYData";
import DeskItemHY, { IDeskItemHYDelegate } from "./DeskItemHY";
import TestSceneClubHYData from "./TestSceneClubHYData";
import Prompt from "../../globalModule/Prompt";
import ClientApp from "../../globalModule/ClientApp";
import SceneClubDataHY from "./data/SceneClubDataHY";
import { SceneName } from "../../common/clientDefine";

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
export default class SceneClubHY extends cc.Component implements IAbsAdapter, IDeskItemHYDelegate {

    @property(cc.Node)
    mClubContentRoot : cc.Node = null ;

    @property(cc.Node)
    mClubEmptyRoot : cc.Node = null ;

    @property(PlayerInfoItem)
    mClubOwnerInfo : PlayerInfoItem = null ;

    @property(LedLabel)
    mNotice : LedLabel = null ;

    @property(ListView)
    mDeskList : ListView = null ;

    @property(DlgBase)
    mDlgMembers : DlgBase = null ;

    @property(cc.Node)
    mBtnMember : cc.Node = null ;

    @property(DlgBase)
    mDlgChoseWanFa : DlgBase = null ;

    @property(DlgBase)
    mDlgChangeClubHY : DlgBase = null ;

    @property(DlgBase)
    mDlgCreateClubTip : DlgBase = null ;

    @property(DlgBase)
    mDlgCreateClub : DlgBase = null ;

    @property(DlgBase)
    mDlgJoinClub : DlgBase = null ;

    @property(cc.Node)
    mBtnExitClub : cc.Node = null ;

    @property(cc.Node)
    mBtnControlCenter : cc.Node = null ;

    @property(DlgBase)
    mDlgControlCenter : DlgBase = null ;

    @property(DlgBase)
    mDlgRecorder : DlgBase = null ;

    @property(DlgBase)
    mDlgNotice : DlgBase = null ;


    mData : ISceneClubHYData = null ;
    mCurSeatCntType : number = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        if ( this.mData == null )
        {
            if ( G_TEST )
            {
                this.mData = new TestSceneClubHYData();
            }
            else
            {
                this.mData = ClientApp.getInstance().getClientPlayerData().getClubs() as SceneClubDataHY;
                if ( this.mData == null )
                {
                    let p = new SceneClubDataHY();
                    ClientApp.getInstance().getClientPlayerData().setClubs( p );
                    this.mData = p ;  
                }
            }
        }
    }

    start () {
        let self = this ;
        this.mData.reqDatas(()=>{ 
            self.mDeskList.setAdapter(self) ;
            self.refreshClub();
        } ) ;
    }

    onDestroy()
    {
        this.mData.leaveScene();
    }

    protected refreshClub()
    {
        this.mClubEmptyRoot.active = this.mData.getCurClubID() == 0 ;
        this.mClubContentRoot.active = !this.mClubEmptyRoot.active ;
        if ( this.mClubEmptyRoot.active )
        {
            return ;
        }

        let ownerID = this.mData.getCurClubOwnerUID();
        if ( 0 == ownerID )
        {
            this.mClubContentRoot.active = false ;
            this.mClubEmptyRoot.active = true ;
            return ;
        }

        this.mClubOwnerInfo.refreshInfo(ownerID);
        this.mNotice.string = this.mData.getCurClubNotice();
        this.refreshDeskList();
    }

    protected getCurSeatCntType() : number 
    {
        return this.mCurSeatCntType ;
    }

    protected refreshDeskList()
    {
        this.mDeskList.notifyUpdate();
        console.log( "refresh desk list" );
    }
    // desk list delegate
    getCount(): number 
    {
        return Math.floor((this.mData.getDeskCnt(this.getCurSeatCntType()) + 1) / 2) ;
    }

    _getView(item: cc.Node, posIndex: number): cc.Node
    {
        let vdataIdxs = [ posIndex * 2 , posIndex*2+1] ;
        for ( let idx = 0 ; idx < vdataIdxs.length ; ++idx )
        {
            let itemData = this.mData.getDeskItemData( this.getCurSeatCntType(),vdataIdxs[idx] ) ;
            item.children[idx].active = null != itemData ;
            if ( null != itemData )
            {
                let p = item.children[idx].getComponent(DeskItemHY);
                p.refresh( itemData,this )

                //console.log( "pos index = " + posIndex + " idx = " + idx + " pos : " + item.children[idx].position );
            }
        }
        return item ;
    }

    // IDeskItemHYDelegate
    onClickOpt( roomID : number ) : void 
    {
        console.log( "click opt room id = " + roomID );
    }

    onClickEnter( roomID : number  ) : void 
    {
        console.log( "click enter room id = " + roomID );
    }
    // dlg change club 
    onBtnShowDlgChangeClub()
    {
        this.mDlgChangeClubHY.showDlg(this.onChosedNewClub.bind(this),this.mData.getCLubListData(),this.onCloseDlgChangeClub.bind(this)) ;
    }

    onChosedNewClub( clubID : number )
    {
        this.mData.setCurClubID(clubID);
        this.refreshClub() ;
        console.log( "onChosedNewClub( clubID : number )" );
    }

    onCloseDlgChangeClub()
    {
        // may be need move desk list 
        console.log( "close change club dlg" );
    }

    // dlg wanfa 
    onBtnShowDlgWanFa()
    {
        this.mDlgChoseWanFa.showDlg(this.onChosedWanFa.bind(this),this.mCurSeatCntType) ;
    }

    onChosedWanFa( seatCntType : number )
    {
        this.mCurSeatCntType = seatCntType ;
        this.refreshDeskList();
        console.log( "onChosedWanFa club dlg" );
    }

    onBtnMembers()
    {
        this.mDlgMembers.showDlg(null,this.mData.getDlgMemberData()) ;
    }

    onBtnCreateClub()
    {
        let self = this ;
        this.mDlgCreateClubTip.showDlg(()=>{
            self.mDlgCreateClub.showDlg(null,self.mData.getCreateClubVerifyData() ) ;
        },null ) ;
    }

    onBtnJoinClub()
    {
        let self = this ;
        this.mDlgJoinClub.showDlg(( clubID : string )=>{
            console.log( "reqest join id = " + clubID );
            self.mData.reqJoinClub(parseInt(clubID),( ret : number , content : string )=>{
                Prompt.promptText(content) ;
                if ( ret == 0 )
                {
                    self.mDlgJoinClub.closeDlg();
                }
            } ) ;
        }) ;
    }

    onBtnSetting()
    {
        if ( this.mData == null )
        {
            return ;
        }

        this.mBtnControlCenter.active = !this.mBtnControlCenter.active && this.mData.isSelfClubMgr();
        this.mBtnExitClub.active = !this.mBtnExitClub.active && ( this.mData.isSelfClubMgr() == false ) ;
    }

    onBtnExitClub()
    {
        this.mBtnExitClub.active = false ;
        let data = this.mData ;
        Prompt.promptDlg("您确定要退出俱乐部吗？退出后，需要重新申请通过后才能加入",false,( js : Object )=>{data.reqExitClub();} ) ;
    }

    onBtnContronlCenter()
    {
        this.mBtnControlCenter.active = false ;
        this.mDlgControlCenter.showDlg(null,this.mData.getControlCenterData() ) ;
    }

    onBtnRecorder()
    {
        this.mDlgRecorder.showDlg(null,this.mData.getRecorderData() ) ;
    }

    onBtnNotice()
    {
        this.mDlgNotice.showDlg(null,this.mData.getDlgNoticeData()) ;
    }

    onBtnBack()
    {
        cc.director.loadScene(SceneName.Scene_Main) ;
    }
}
