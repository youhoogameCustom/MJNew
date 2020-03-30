import DlgBase from "../../../common/DlgBase";
import { IControlCenterDataHY } from "../ISceneClubHYData";
import ControlCenterWanFaItemHY from "./ControlCenterWanFaItemHY";
import Prompt from "../../../globalModule/Prompt";
import IOpts from "../../../opts/IOpts";


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
export default class DlgControlCenter extends DlgBase {

    @property(cc.Prefab)
    mWanFaItem : cc.Prefab = null ;

    @property(cc.Node)
    mWanFaList : cc.Node = null ;
    
    @property(DlgBase)
    mDlgCreateWanFa : DlgBase = null ;

    @property(cc.Label)
    mCurName : cc.Label = null ;

    @property(cc.EditBox)
    mNewNameInput : cc.EditBox = null ;

    @property(cc.Label)
    mClubSate : cc.Label = null ; // is club opening , or pause ;

    @property(cc.Node)
    mBtnOpen : cc.Node = null ;

    @property(cc.Node)
    mBtnPause : cc.Node = null ;

  

    mData : IControlCenterDataHY = null ;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose);
        this.mData = jsUserData ;
        this.refresh();
    }

    protected refresh()
    {
        // refresh wanFa List ;
        this.mWanFaList.removeAllChildren();
        let list = this.mData.getWanFaList();
        for ( let i of list )
        {
            let item = cc.instantiate(this.mWanFaItem).getComponent(ControlCenterWanFaItemHY);
            item.refresh(i.content,i.idx,this.callBackDeleteWanFa.bind(this) ) ;
            this.mWanFaList.addChild(item.node);
        }

        // refresh change name ;
        this.mCurName.string = this.mData.clubName ;
        this.mNewNameInput.string = "" ;

        // club state 
        this.refreshClubState();
    }

    protected refreshClubState()
    {
        // club state 
        this.mClubSate.string = this.mData.isOpening ? "俱乐部当前处在营业状态，是否需要打烊？" : "俱乐部当前已经打烊，是否需要重新营业？";
        this.mBtnOpen.active = this.mData.isOpening == false;
        this.mBtnPause.active = !this.mBtnOpen.active ;
    }

    onBtnAddWanFa()
    {
        let self = this ;
        this.mDlgCreateWanFa.showDlg(( opts : IOpts )=>{
            self.mData.reqAddWanFa(opts,( ret : number , content : string )=>{
                Prompt.promptText(content);
                if ( 0 == ret )
                {
                    this.refresh();
                }
            } ) ;
        }) ;
    }

    callBackDeleteWanFa( idx : number , item : cc.Node )
    {
        this.mData.reqDeleteWanFa(idx,(ret : number , content : string )=>{
            Prompt.promptText(content);
            if ( 0 == ret )
            {
                item.removeFromParent();
            }
        } ) ;
    }

    onBtnComfirmModifyName()
    {
        if ( this.mNewNameInput.string.length < 1 )
        {
            Prompt.promptText( "新名字长度不合法" );
            return ;
        }

        if ( this.mNewNameInput.string == this.mCurName.string )
        {
            Prompt.promptText( "新名字和旧名字相同" );
            return ;
        }

        let pat=new RegExp("[^a-zA-Z0-9\_\u4e00-\u9fa5]","i");
        if ( pat.test(this.mNewNameInput.string ) == true )
        {
            Prompt.promptDlg("新名字含有非法字符,名字只能包含数字，字母，汉字，下划线");
            return ;
        }

        let self = this ;
        this.mData.reqChangeName(this.mNewNameInput.string,( ret : number , content : string )=>{
            if ( 0 == ret )
            {
                self.mCurName.string = self.mNewNameInput.string ;
            }

            Prompt.promptText(content);
        } ) ;
    }

    onBtnSwitchClubState()
    {
        let self = this ;
        this.mData.reqSwitchState( ( ret : number , content : string )=>{
            Prompt.promptText(content);
            self.refreshClubState();
        } ) ;
    }

    onBtnDismiss()
    {
        if ( this.mData.isSelfCreater == false )
        {
            Prompt.promptText( "只有俱乐部主才能解散俱乐部！" );
            return ;
        }

        this.mData.reqDismiss();
        this.closeDlg();
    }
    // update (dt) {}
}
