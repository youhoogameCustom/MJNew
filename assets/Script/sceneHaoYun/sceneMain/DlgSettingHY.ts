import ProgressSlider from "../../commonItem/progressSlider";
import SettingConfig from "../../config/SettingConfig";
import ClientApp from "../../globalModule/ClientApp";
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
export default class DlgSettingHY extends DlgBase {

    @property(ProgressSlider)
    mMusic : ProgressSlider = null;

    @property(ProgressSlider)
    mAudioEffect : ProgressSlider = null;

    @property(cc.Toggle)
    mChuPai : cc.Toggle = null ;

    @property(cc.Toggle)
    mDaoJu : cc.Toggle = null ;

    @property(cc.ToggleContainer)
    mCardBackClr : cc.ToggleContainer = null ;

    @property(cc.ToggleContainer)
    mDeskClr : cc.ToggleContainer = null ;

    mData : SettingConfig = null ;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void  )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose) ; 
        if ( null == this.mData && G_TEST == false  )
        {
            this.mData = ClientApp.getInstance().getConfigMgr().getSettingConfig();
        }

        this.refresh();
    }

    protected refresh()
    {
        if ( G_TEST )
        {
            return ;
        }

        this.mMusic.progress = this.mData.musicVolume ;
        this.mAudioEffect.progress = this.mData.effectVolume ;
        this.mChuPai.isChecked = this.mData.isSingleClickChuPai ;
        this.mDaoJu.isChecked = this.mData.isAvoidDaoJu ;

        let cardIdx = this.mData.mjBgIdx ;
        if ( cardIdx >= this.mCardBackClr.toggleItems.length )
        {
            cardIdx = 0 ;
        }
        this.mCardBackClr.toggleItems[cardIdx].isChecked = true ;
        
        let deskIdx = this.mData.deskBgIdx ;
        if ( deskIdx >= this.mDeskClr.toggleItems.length )
        {
            deskIdx = 0 ;
        }
        this.mDeskClr.toggleItems[cardIdx].isChecked = true ;
    }

    onProgressMusic()
    {
        if ( G_TEST == false )
        {
            this.mData.musicVolume =  this.mMusic.progress
        }
        
        //console.log("onProgressMusic = + " + this.mMusic.progress );
        cc.audioEngine.setMusicVolume(this.mMusic.progress) ;
    }

    onProgressAudio()
    {
        if ( G_TEST == false )
        {
            this.mData.effectVolume =  this.mAudioEffect.progress ;
        }
        
        //console.log("onProgressAudio = + " + this.mAudioEffect.progress );
        cc.audioEngine.setEffectsVolume(this.mAudioEffect.progress) ;
    }

    closeDlg()
    {
        if ( G_TEST )
        {
            super.closeDlg();
            return ;
        } 
        this.mData.isSingleClickChuPai = this.mChuPai.isChecked ;
        this.mData.isAvoidDaoJu = this.mDaoJu.isChecked ;

        let self = this ;
        this.mCardBackClr.toggleItems.forEach( ( v : cc.Toggle, idx : number )=>{
            if ( v.isChecked )
            {
                self.mData.mjBgIdx = idx ;
            }
        } ) ;

        this.mDeskClr.toggleItems.forEach( ( v : cc.Toggle, idx : number )=>{
            if ( v.isChecked )
            {
                self.mData.deskBgIdx = idx ;
            }
        } ) ;
    
        super.closeDlg();
    }



    // update (dt) {}
}
