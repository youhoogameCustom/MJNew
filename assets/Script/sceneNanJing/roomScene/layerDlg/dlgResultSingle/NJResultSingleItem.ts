import PlayerInfoItem from "../../../../commonItem/PlayerInfoItem";
import MJPlayerCardHold from "../../../../scene/roomScene/layerCards/cards2D/MJPlayerCardHold";
import MJCardMing2D from "../../../../scene/roomScene/layerCards/cards2D/MJCardMing2D";
import { INJDlgResultSingleItemData } from "./INJDlgResultSingleData";
import { PlayerActedCard } from "../../../../scene/roomScene/roomData/MJPlayerCardData";
import MJCardFactory2D from "../../../../scene/roomScene/layerCards/cards2D/MJCardFactory2D";

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
export default class NJResultSingleItem extends cc.Component {

    @property(cc.Node)
    mIconDianPao : cc.Node = null ;

    @property(cc.Node)
    mIconMultiDianPao : cc.Node = null ;

    @property(cc.Node)
    mIconFollowHu : cc.Node = null ;

    @property(cc.Node)
    mIconBanker : cc.Node = null ;

    @property(cc.Node)
    mIconSelf : cc.Node = null ;

    @property(cc.Label)
    mTotalScore : cc.Label = null ;

    @property(cc.Label)
    mPunishScore : cc.Label = null ;

    @property(cc.Label)
    mWaiBaoScore : cc.Label = null ;

    @property(PlayerInfoItem)
    mPlayerInfo : PlayerInfoItem = null ;

    @property(MJPlayerCardHold)
    mCardHold : MJPlayerCardHold = null ;

    @property(MJCardMing2D)
    mCardMing : MJCardMing2D = null ;

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.mCardHold.isReplay = true ;
        this.mCardHold.posIdx = 0 ;
        this.mCardMing.posIdx = 0 ;
    }

    start () {

    }

    clear()
    {
        this.mIconBanker.active = false ;
        this.mIconDianPao.active = false ;
        this.mIconFollowHu.active = false ;
        this.mIconMultiDianPao.active = false ;
    }

    refresh( data : INJDlgResultSingleItemData ) 
    {
        this.mPlayerInfo.refreshInfo(data.playerUID) ;
        this.mIconBanker.active = data.isBanker ;
        this.mIconSelf.active = data.isSelf ;
        if ( this.mIconDianPao )
        {
            this.mIconDianPao.active = data.isDianPao && (data.isMultiDianPao == false) ;
        }
        
        if ( this.mIconFollowHu )
        {
            this.mIconFollowHu.active = data.isFollowHu ;
        }
        
        if ( this.mIconMultiDianPao )
        {
            this.mIconMultiDianPao.active = data.isMultiDianPao ;
        }

        this.setCardInfo( data.isFollowHu,data.getCardsInfo() );
        this.totalScore = data.totalScore ;
        this.punishScore = data.punishScore ;
        this.waiBaoScore = data.waiBaoScore ;
    }

    setCardFactory( fac : MJCardFactory2D )
    {
        this.mCardHold.mFactory = fac ;
        this.mCardMing.mFactroy = fac ;
    }

    protected setCardInfo( isHu : boolean ,info : { ming : PlayerActedCard[] , holdCard : number[], huCard : number } )
    {
        this.mCardHold.clear();
        this.mCardMing.refresh(info.ming) ;
        this.mCardHold.refresh(info.holdCard) ;
        this.mCardHold.node.position = cc.v2(this.mCardMing.getContentlength() + 6,0);
        if ( isHu )
        {
            if ( null == info.huCard || info.huCard == 0 )
            {
                cc.error("player is hu , but hu card is null ? ");
                return ;
            }

            let isHoldContainHuCard = info.holdCard.length % 3 != 2 ;
            if ( isHoldContainHuCard )
            {
                info.holdCard.splice(info.holdCard.indexOf(info.huCard),1) ;
            }
            this.mCardHold.refresh(info.holdCard) ;
            this.mCardHold.onMo( info.huCard ) ;
        }
    }

    set totalScore( n : number )
    {
        this.setLabelNumer(this.mTotalScore,n);
    }

    set punishScore( n : number )
    {
        this.setLabelNumer(this.mPunishScore,n);
    }

    set waiBaoScore( n : number )
    {
        this.setLabelNumer(this.mWaiBaoScore,n);
    }

    protected setLabelNumer( label : cc.Label , num : number )
    {
        label.string = num + "" ;
        label.node.color = cc.Color.WHITE.fromHEX( num < 0 ? "#59e0ff":"#ffd800" ) ;
    }
    // update (dt) {}
}
