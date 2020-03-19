 import * as _ from "lodash"
import MJCardFactory2D from "./scene/roomScene/layerCards/cards2D/MJCardFactory2D";
import HuChecker from "./scene/roomScene/roomData/HuChecker";
import { eCardSate, eMJCardType } from "./scene/roomScene/roomDefine";
import MJCard2D from "./scene/roomScene/layerCards/cards2D/MJCard2D";
import MJCard from "./scene/roomScene/layerCards/cards3D/MJCard";
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
export default class test extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    @property(MJCardFactory2D)
    mFacotry : MJCardFactory2D = null ;

    @property(cc.Node)
    mHold : cc.Node = null ;
    
    @property(cc.Node)
    mHuCards : cc.Node = null ;

    mChecker : HuChecker = new HuChecker() ;

    start () {
        //this.mPlayerCards.isSelf = false;  
        if ( G_TEST )
        {
            let self = this ;
            setTimeout(() => {
                self.test();
            }, 5000 );
        }
    }

    test()
    {
        //1112345678999
        let vCards = [MJCard.makeCardNum(eMJCardType.eCT_Wan,2),MJCard.makeCardNum(eMJCardType.eCT_Wan,2),
            MJCard.makeCardNum(eMJCardType.eCT_Tiao,1),MJCard.makeCardNum(eMJCardType.eCT_Tiao,2),MJCard.makeCardNum(eMJCardType.eCT_Tiao,3),
            MJCard.makeCardNum(eMJCardType.eCT_Tiao,4),MJCard.makeCardNum(eMJCardType.eCT_Tiao,5),MJCard.makeCardNum(eMJCardType.eCT_Tiao,6),

            MJCard.makeCardNum(eMJCardType.eCT_Tong,2),MJCard.makeCardNum(eMJCardType.eCT_Tong,3),MJCard.makeCardNum(eMJCardType.eCT_Tong,4),

            MJCard.makeCardNum(eMJCardType.eCT_Tong,5),MJCard.makeCardNum(eMJCardType.eCT_Tong,6)
        ] ;
    
        let today = new Date();
        let milliseconds = today.getTime();
        console.log("milliseconds:", milliseconds);
        let vHu = this.mChecker.getTingCards(vCards) ;
        console.log((new Date().getTime() - milliseconds) / 1000 + " s");
        console.log(" ----can hu : " + vHu);
        for ( let v of vCards )
        {
            this.mHold.addChild( this.mFacotry.getCard(v,0,eCardSate.eCard_Out).node);
        }

        for ( let v of vHu )
        {
            this.mHuCards.addChild( this.mFacotry.getCard(v,0,eCardSate.eCard_Out).node);
        }
    }

     onClick()
    {
        cc.log( "click" );
        let pEvent = new cc.Event.EventCustom( "click",true) ;
        cc.systemEvent.dispatchEvent(pEvent) ;
    }

    onClick2()
    {
        cc.log( "click2" );
        let pEvent = new cc.Event.EventCustom( "click2",true) ;
        cc.systemEvent.dispatchEvent(pEvent) ;
    }

    onClick3()
    {
        cc.log( "click3" );
        let pEvent = new cc.Event.EventCustom( "click3",true) ;
        cc.systemEvent.dispatchEvent(pEvent) ;
    }

    onClick4()
    {
        cc.log( "click4" );
        let pEvent = new cc.Event.EventCustom( "click4",true) ;
        cc.systemEvent.dispatchEvent(pEvent) ;
    }
    // update (dt) {}
}
