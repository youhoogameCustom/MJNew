import DlgBase from "../../common/DlgBase";
import ListView, { IAbsAdapter } from "../../commonItem/ListView";
import { IClubListHYData } from "./ISceneClubHYData";
import DlgChangeClubItemHY from "./DlgChangeClubItemHY";

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
export default class DlgChangeClubHY extends DlgBase implements IAbsAdapter {
    @property(cc.Node)
    mBtnShowDlg : cc.Node = null ;

    @property(ListView)
    mClubList : ListView = null ;

    @property(cc.ToggleContainer)
    mItems : cc.ToggleContainer = null ;

    @property(cc.Node)
    mCreateJoinBtnList : cc.Node = null ;
    
    mPosWhenClosed : cc.Vec2 = null ;

    mData : IClubListHYData = null ;

    mCurCheckClubID : number = -1 ;

    mCheckedToggle : cc.Toggle = null ;
    start () {
        this.mPosWhenClosed = cc.v2(this.node.position) ;
        this.captureEventNode.active = false ;
        this.mClubList.setAdapter(this);
    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose) ;
        this.mBtnShowDlg.active = false ;
        this.mData = jsUserData ;
        this.mCheckedToggle = null ;
        this.mClubList.notifyUpdate();
        // move in
        cc.tween(this.node).to(0.3,{position : cc.v2(this.mPosWhenClosed.x + this.pBgImgArea.getContentSize().width,this.mPosWhenClosed.y)},{ easing: 'sineIn'} ).start(); 
        this.captureEventNode.active = true ;
    }

    closeDlg()
    {
        // move back ;
        this.mBtnShowDlg.active = true ;
        cc.tween(this.node).to(0.3,{position : this.mPosWhenClosed},{ easing: 'sineIn'} ).start();
        if ( this.pOnCloseCallBack != null )
        {
            this.pOnCloseCallBack(this);
        }

        this.captureEventNode.active = false ;
        this.mCreateJoinBtnList.active = false ;
    }
    // update (dt) {}

    // list delegate
    getCount(): number 
    {
        if ( this.mData == null )
        {
            return 0 ;
        }
        
        return this.mData.getClubListCnt();
    }

    _getView(item: cc.Node, posIndex: number): cc.Node 
    {
        let p = item.getComponent(DlgChangeClubItemHY);
        if ( p != null )
        {
            let data = this.mData.getClubListItemData(posIndex) ;
            p.refresh(data) ;
            p.isChecked = data.clubID == this.mData.getCurSelectedClubID();
            p.interactable = p.isChecked == false ;
            if ( p.isChecked )
            {
                this.mCheckedToggle = p ;
            }
        }
        return item ;
    }

    onToggle( c : cc.Toggle , idx : any )
    {
        if ( this.mCheckedToggle != null )
        {
            this.mCheckedToggle.interactable = true ;
        }
        c.interactable = false ;
        this.mCheckedToggle = c ;
        console.log( "onToggle( c : cc.Toggle , idx : any )" );
        let self = this ;
        this.mItems.toggleItems.every( ( v : cc.Toggle, idx : number )=>{
                if ( v.isChecked )
                { 
                    let item = v.node.getComponent(DlgChangeClubItemHY) ;
                    if ( null == item )
                    {
                        console.error( "why check component is null ?" );
                        return false ;
                    }

                    if ( item.clubID == self.mCurCheckClubID )
                    {
                        return false;
                    }

                    console.log( " id = and id " + item.clubID + "  = " + self.mCurCheckClubID );
                    self.mCurCheckClubID = item.clubID;
                    self.pFuncResult(item.clubID); 
                    return false ;
                } 
                return true ;
            } ) ;
    }

    onBtnJoinCreate()
    {
        this.mCreateJoinBtnList.active = !this.mCreateJoinBtnList.active ;
    }
}
