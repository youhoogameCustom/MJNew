import PlayerInfoItem from "../../../commonItem/PlayerInfoItem";
import DlgBase from "../../../common/DlgBase";
import { IDlgMemberOptDataHY } from "./IDlgMemberDataHY";
import Prompt from "../../../globalModule/Prompt";

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
export default class DlgMemberOptHY extends DlgBase {

    @property(PlayerInfoItem)
    mPlayerInfo : PlayerInfoItem = null ;

    @property(cc.Label)
    mJob: cc.Label = null;

    @property(cc.EditBox)
    mRemark : cc.EditBox = null ;

    @property(cc.Node)
    mBtnTransfer : cc.Node = null ;

    @property(cc.Toggle)
    mToggleUpgrade : cc.Toggle = null ;

    @property(cc.Node)
    mBtnKickOut : cc.Node = null ;

    @property(cc.Toggle)
    mToggleForbitonEnter : cc.Toggle = null ;

    mData : IDlgMemberOptDataHY = null ;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void  )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose);
        this.mData = jsUserData ;
        this.refresh();
    }

    protected refresh()
    {
        this.mPlayerInfo.refreshInfo( this.mData.uid );
        this.mRemark.string = this.mData.remarkName;
        this.mJob.string = this.mData.job;
        this.mBtnTransfer.active = this.mData.canTransfer;
        this.mToggleUpgrade.node.active = this.mData.canUpgrade || this.mData.canDowngrade;
        this.mBtnKickOut.active = this.mData.canKickOut;
        this.mToggleForbitonEnter.isChecked = !this.mData.isForbitonEnter ;
        if ( this.mToggleUpgrade.node.active )
        {
            this.mToggleUpgrade.isChecked = this.mData.canUpgrade ;
        }
    }

    onBtnTransfer()
    {
        let self = this ;
        this.mData.reqTransfer(( ret : number , content : string )=>{ 
            if ( false == G_TEST )
            {
                Prompt.promptText(content);
            }

            if ( ret == 0 )
            {
                self.closeDlg();
            }
        });
    }

    onToggleUpgrade()
    {
        let self = this ;
        this.mData.reqUpgrade(( ret : number , content : string )=>{ 
            if ( false == G_TEST )
            {
                Prompt.promptText(content);
            }

            if ( ret != 0 )
            {
                self.mToggleUpgrade.isChecked = !self.mToggleUpgrade.isChecked ;
            }
        });
    }

    onBtnKickOut()
    {
        let self = this ;
        this.mData.reqKickOut(( ret : number , content : string )=>{ 
            if ( false == G_TEST )
            {
                Prompt.promptText(content);
            }

            if ( 0 == ret )
            {
                self.closeDlg();
            }
        });
    }

    onToggleForbiten()
    {
        let self = this ;
        this.mData.reqSwitchForbiton( ( ret : number , tip : string )=>{
            if ( false == G_TEST )
            {
                Prompt.promptText(tip);
            }

            if ( 0 != ret )
            {
                self.mToggleForbitonEnter.isChecked = !self.mToggleForbitonEnter.isChecked;
            }
        } ) ;
    }

    onBtnModifyRemark()
    {
        if ( this.mRemark.string == this.mData.remarkName )
        {
            if ( false == G_TEST )
            {
                Prompt.promptDlg("备注内容未发生改变");
                return ;
            }

            let self = this ;
            this.mData.reqModifyRemark( this.mRemark.string  ,( ret : number , tip : string )=>{
                if ( false == G_TEST )
                {
                    Prompt.promptText(tip);
                }

                if ( ret != 0 )
                {
                    self.mRemark.string = self.mData.remarkName;
                }

            } ) ;
        }
    }
    // update (dt) {}
}
