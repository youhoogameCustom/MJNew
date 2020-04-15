import DlgBase from "../../../common/DlgBase";
import ListView, { IAbsAdapter } from "../../../commonItem/ListView";
import IDlgMemberDataHY from "./IDlgMemberDataHY";
import ApplyItemHY from "./ApplyItemHY";
import LogItemHY from "./LogItemHY";
import Prompt from "../../../globalModule/Prompt";
import TimeLock from "../../../common/TimeLocker";
import MemberItemHaoYun from "./MemberItemHaoYun";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export enum eMemberPage
{
    ePage_Member,
    ePage_Apply,
    ePage_Log,
    ePage_Max,
} ;

const {ccclass, property} = cc._decorator;
@ccclass
export default class DlgMemberHY extends DlgBase implements IAbsAdapter {

    @property(cc.ToggleContainer)
    mPageTypes : cc.ToggleContainer = null ;

    @property([ListView])
    mPages : ListView[] = [];

    @property(cc.Node)
    mEmptyContent : cc.Node = null ;

    @property(cc.EditBox)
    mSeachContent : cc.EditBox = null ;

    @property(cc.Label)
    mLabelOnLine : cc.Label = null ;

    @property(DlgBase)
    mDlgMemberOpeate : DlgBase = null ;

    mIsShowSeatchResult : boolean = false ;

    mData : IDlgMemberDataHY = null ;

    mSearchCD : TimeLock = new TimeLock() ;
    mInviteRightNowCD : TimeLock = new TimeLock() ;

    // LIFE-CYCLE CALLBACKS:
    private _curPage : eMemberPage = eMemberPage.ePage_Max ;
    get curPage() : eMemberPage
    {
        if ( this._curPage < eMemberPage.ePage_Max && this.mPageTypes.toggleItems[this._curPage].isChecked )
        {
            return this._curPage ;
        }

        for ( let idx = 0 ; idx < this.mPageTypes.toggleItems.length ; ++idx )
        {
            if ( this.mPageTypes.toggleItems[idx].isChecked )
            {
                this._curPage = idx ;
                return this._curPage ;
            } 
        }
        this._curPage = eMemberPage.ePage_Max ;
        return this._curPage ;
    }
    // onLoad () {}

    start () {

    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void  )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose);
        if ( null != this.mData )
        {
            this.mData.leaveMembers();
        }

        this.mData = jsUserData ;

        let self = this ;
        this.mData.reqMembersDatas(()=>{ 
            for ( let v of self.mPages )
            {
                v.setAdapter(self);
            }
            self.refreshPage();
         });
        
    }
    // update (dt) {}
    onToggle( checkToggle : cc.Toggle )
    {
        this.refreshPage();
    }

    protected refreshPage()
    {
        if ( this.curPage != eMemberPage.ePage_Max )
        {
            this.mPages[this.curPage].notifyUpdate();
        }
        else
        {
            console.log( "page type error" );
        }

        if ( eMemberPage.ePage_Member == this.curPage && this.mData != null )
        {
            this.mLabelOnLine.string = this.mData.getOnlineCntDesc();
        }
    }

    // page list IAbsAdapter
    getCount(): number 
    {
        if ( null == this.mData )
        {
            this.mEmptyContent.active = true ;
            return 0 ;
        }

        let cnt : number = 0 ;
        switch ( this.curPage )
        {
            case eMemberPage.ePage_Apply:
                {
                    cnt = this.mData.getApplyCnt();
                }
                break ;
            case eMemberPage.ePage_Log:
                {
                    cnt = this.mData.getLogCnt();
                }
                break ;
            case eMemberPage.ePage_Member:
                {
                    cnt = this.mData.getMemberCnt(this.mIsShowSeatchResult);
                }
                break ;
            default:
                console.log( "page type error for get count" );
                cnt = 0 ;
        }
        this.mEmptyContent.active = cnt == 0 ;
        return cnt ;
    }

    _getView(item: cc.Node, posIndex: number): cc.Node 
    {
        switch ( this.curPage )
        {
            case eMemberPage.ePage_Apply:
                {
                     let p = item.getComponent(ApplyItemHY);
                     if ( p )
                     {
                         p.refresh( this.mData.getApplyItemData( posIndex),this.callBackForApplyItem.bind(this) );
                     }
                     else
                     {
                         console.error( "get applyItem compoent is null" );
                     }
                }
                break ;
            case eMemberPage.ePage_Log:
                {
                     let p = item.getComponent(LogItemHY);
                     if ( p )
                     {
                         p.refresh( this.mData.getLogItemData(posIndex) );
                     }
                     else
                     {
                         console.error( "get logItem component is null" );
                     }
                }
                break ;
            case eMemberPage.ePage_Member:
                {
                     let p = item.getComponent(MemberItemHaoYun);
                     if ( p )
                     {
                         p.refresh( this.mData.getMemberItemData(posIndex,this.mIsShowSeatchResult),this.callBackForMemberItem.bind(this) );
                     }
                     else
                     {
                         console.error( "get memberItem is null" );
                     }
                }
                break ;
            default:
                console.log( "page type error for _getView" );
        }
        return item ;
    }

    callBackForMemberItem( uid : number , isAct : boolean, isExit : boolean, isInvite : boolean )
    {
        console.log( "call back is uid = "+ uid +" act = " + isAct + " is exit = " + isExit + " isInvite = " + isInvite  );
        if ( isExit )
        {
            this.mData.reqExitClub() ;
        }
        else if ( isInvite )
        {
            this.mData.reqInvite(uid,( ret : number , retContent : string )=>{ 
                if ( G_TEST == false )
                {
                    Prompt.promptText(retContent) ;
                }
            } ) ;
        }
        else
        {
            // show operate dlg ;
            this.mDlgMemberOpeate.showDlg(null,this.mData.getDlgMemberOperateData(uid)) ;
        }
    }

    callBackForApplyItem( eventID : number , isAgree : boolean )
    {
        this.mData.reqResponeApply(eventID,isAgree,( ret : number , retContent : string )=>{
            if ( G_TEST == false )
            {
                Prompt.promptText(retContent);
            }
        } ) ;
    }

    onBtnSeach()
    {
        if ( this.mSearchCD.isLocking )
        {
            if ( false == G_TEST )
            {
                Prompt.promptText( "您的操作太频繁，请稍作休息" );
            }
            return ;
        }

        if ( this.mSeachContent.string.length == 0 )
        {
            if ( this.mIsShowSeatchResult )
            {
                this.mIsShowSeatchResult = false ;
                this.refreshPage();
            }
            return ;
        }

        let numID = parseInt(this.mSeachContent.string ) ; 
        if ( numID < 10000 )
        {
            if ( G_TEST == false )
            {
                Prompt.promptText( "请输入有效的玩家ID" );
            }
            else
            {
                console.warn( "invalid player uid = " + numID );
            }
            return ;
        }

        // do seatch
        let self = this ; 
        this.mData.reqSearch(numID,( ret : number , retContent : string )=>{
            if ( 0 == ret )
            {
                self.mIsShowSeatchResult = true ;
                self.refreshPage();
            }
            else
            {
                if ( false == G_TEST )
                {
                    Prompt.promptDlg(retContent) ;
                }
            }
        } ) ;

        if ( false == G_TEST )
        {
            Prompt.promptText( "正在搜索，请稍等" );
        }
        console.log( "seaching ...." );

        self.mSearchCD.lock() ;
    }

    onBtnInvite()
    {
        if ( this.mInviteRightNowCD.isLocking )
        {
            if ( false == G_TEST )
            {
                Prompt.promptText( "您的操作太频繁，请稍作休息" );
            }
            return ;
        }
        let numID = parseInt( this.mSeachContent.string.length < 2 ? "0" : this.mSeachContent.string ) ; 
        if ( numID < 10000 )
        {
            if ( G_TEST == false )
            {
                Prompt.promptText( "请输入有效的玩家ID" );
            }
            else
            {
                console.warn( "invalid player uid = " + numID );
            }
            return ;
        }

        // do invite
        let self = this ; 
        this.mData.reqInvite(numID,( ret : number , retContent : string )=>{
            if ( false == G_TEST )
            {
                Prompt.promptDlg(retContent) ;
            }
        } ) ;

        if ( false == G_TEST )
        {
            Prompt.promptText( "邀请已发出，请稍等" );
        }
        console.log( "inviting ...." );
        self.mInviteRightNowCD.lock();
    }
    
    closeDlg()
    {
        this.mData.leaveMembers();
        super.closeDlg();
    }
}
