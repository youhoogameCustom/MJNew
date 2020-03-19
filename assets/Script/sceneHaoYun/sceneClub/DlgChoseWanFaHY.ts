import DlgBase from "../../common/DlgBase";

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
export default class DlgChoseWanFaHY extends DlgBase {

    @property(cc.ToggleContainer)
    mTypes : cc.ToggleContainer = null ;
 
    @property(cc.Node)
    mBtnShowDlg : cc.Node = null ;

    mPosWhenClosed : cc.Vec2 = null ;
    start () {
        this.mPosWhenClosed = cc.v2(this.node.position) ;
        this.captureEventNode.active = false ;
    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose) ;
        this.mBtnShowDlg.active = false ;
        let idx : number = jsUserData ;
        let tog : cc.Toggle = this.mTypes.toggleItems[idx] ;
        tog.isChecked = true ;
        // move in
        cc.tween(this.node).to(0.3,{position : cc.v2(this.mPosWhenClosed.x - this.pBgImgArea.getContentSize().width * 1.1,this.mPosWhenClosed.y)},{ easing: 'sineIn'} ).start(); 
        this.captureEventNode.active = true ;
    }

    onToggle( c : cc.Toggle , idx : number )
    {
        let self = this ;
        this.mTypes.toggleItems.every( ( v : cc.Toggle, idx : number )=>{ if ( v.isChecked ){ self.pFuncResult(idx); return false ;} return true ;} ) ;
    }

    closeDlg()
    {
        // move back ;
        this.mBtnShowDlg.active = true ;
        cc.tween(this.node).to(0.3,{position : this.mPosWhenClosed},{ easing: 'sineIn'} ).start();

        this.captureEventNode.active = false ;
    }

    // update (dt) {}
}
