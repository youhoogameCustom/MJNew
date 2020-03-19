import PlayerInfoItem from "../../commonItem/PlayerInfoItem";
import LedLabel from "../../commonItem/ledLabel";
import { IMainSceneDataNJ, IMainSceneDataDelegateNJ } from "./IMainSceneDataNJ";

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
export default class MainSceneNJ extends cc.Component implements IMainSceneDataDelegateNJ {

    @property(PlayerInfoItem)
    mPlayerInfo : PlayerInfoItem = null ;

    @property(cc.Label)
    mCoin : cc.Label = null ;

    @property(LedLabel)
    mNotice : LedLabel = null ;

    @property(cc.Node)
    mNewMailDot : cc.Node = null ;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // interface IMainSceneDataDelegateNJ
    refresh( data : IMainSceneDataNJ )
    {
        this.mPlayerInfo.refreshInfo( data.getUID() );
        this.mCoin.string = data.getCoin() + "" ;
        this.mNotice.string = data.getNoticeContent();
        this.mNewMailDot.active = data.haveUnreadMain();
    } 
    
    updateMailState( ishaveUnread : boolean )
    {
        this.mNewMailDot.active = ishaveUnread ;
    }

    onBtnShop()
    {

    }

    onBtnShareGift()
    {

    }

    onBtnSetting()
    {

    }

    onBtnGameNJ()
    {

    }

    onBtnPaoDeKuai()
    {

    }

    onBtnDouDiZhu()
    {

    }

    onBtnClub()
    {

    }

    onBtnMain()
    {

    }

    onBtnActive()
    {

    }

    onBtnRecorder()
    {

    }

    onBtnRuleDesc()
    {

    }

    // update (dt) {}
}
