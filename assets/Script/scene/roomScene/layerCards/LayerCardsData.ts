import ILayerCardsData, { IPlayerCardData } from "./ILayerCardsData";
import { PlayerActedCard } from "../roomData/MJPlayerCardData";
import { eArrowDirect, eMJActType, eMJCardType } from "../roomDefine";
import MJCard from "./cards3D/MJCard";

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

class PlayerCardData implements IPlayerCardData
{
    getHolds() : number[] 
    {
        let v : number[] = [] ;
        for ( let i = 1 ; i <= 9 ; ++i )
        {
            v.push( MJCard.makeCardNum(eMJCardType.eCT_Wan,i));
        }

        v.push( MJCard.makeCardNum(eMJCardType.eCT_Feng,1));
        v.push( MJCard.makeCardNum(eMJCardType.eCT_Feng,2));
        v.push( MJCard.makeCardNum(eMJCardType.eCT_Feng,3));
        v.push( MJCard.makeCardNum(eMJCardType.eCT_Feng,4));
        return v ;
        return [19,19,18,19,19,18,18] ;
    }

    getChus() : number[] 
    {
        let v : number[] = [] ;
        for ( let i = 1 ; i <= 9 ; ++i )
        {
            v.push( MJCard.makeCardNum(eMJCardType.eCT_Tong,i));
        }

        for ( let i = 1 ; i <= 9 ; ++i )
        {
            v.push( MJCard.makeCardNum(eMJCardType.eCT_Tiao,i));
        }
        v.push( MJCard.makeCardNum(eMJCardType.eCT_Jian,1));
        v.push( MJCard.makeCardNum(eMJCardType.eCT_Jian,2));
        v.push( MJCard.makeCardNum(eMJCardType.eCT_Jian,3));
        return v ;
        return [19,19,18,19,19,18,19,18,19,19,18] ;
    }

    getMings() : PlayerActedCard[] 
    {
        return [] ;
        let v = new PlayerActedCard() ;
        v.nInvokerIdx = 1 ;
        v.eDir = eArrowDirect.eDirect_Left ;
        v.nTargetCard = 17 ;
        v.eAct = eMJActType.eMJAct_Peng;
        return [v,v] ;
    }

    reqChu( card : number ) : boolean 
    {
        cc.log( "we chu card = " + card );
        return true ;
    }
}

@ccclass
export default class LayerCardsData implements ILayerCardsData {

    getSelfIdx() : number 
    {
        return 0 ;
    }
    getCurActIdx() : number
    {
        return 1 ;
    }

    getBankerIdx() : number 
    {
        return 2 ;
    }

    getPlayerCardItems() : IPlayerCardData[] // array idx = svridx , null == empty ;
    {
        return [ new PlayerCardData(),new PlayerCardData(),new PlayerCardData(),new PlayerCardData() ] ;
    }

    isReplay() : boolean 
    {
        return false ;
    }
}
