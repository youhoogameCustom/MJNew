import INJDlgResultSingleData, { eSingleResultType, INJDlgResultSingleItemData, INJDlgResultSingleItemDataWin } from "./INJDlgResultSingleData";
import { PlayerActedCard } from "../../../../scene/roomScene/roomData/MJPlayerCardData";
import { eMJActType, eArrowDirect, eFanxingType } from "../../../../scene/roomScene/roomDefine";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

class NJTestDataItem implements INJDlgResultSingleItemData
{
    playerUID : number = 10;
    isBanker : boolean = true;
    isDianPao : boolean = true;
    isFollowHu : boolean = false;
    isMultiDianPao : boolean = true;
    totalScore : number = 100 ;
    punishScore : number = -10;
    waiBaoScore : number  = 10;
    isSelf : boolean = true;
    getCardsInfo() : { ming : PlayerActedCard[] , holdCard : number[], huCard : number } 
    {
        let act = new PlayerActedCard() ;
        act.eAct = eMJActType.eMJAct_Peng;
        act.eDir = eArrowDirect.eDirect_Left ;
        act.nInvokerIdx = 0 ;
        act.nTargetCard = 19 ;
        let vAct = [ act,act] ;
        return { ming : vAct, holdCard : [18,17,19,21,18,17,19], huCard : 21 } ;
    }
}

class NJTestWinDataItem implements INJDlgResultSingleItemDataWin
{
    playerUID : number = 10;
    isBanker : boolean = true;
    isDianPao : boolean = false;
    isFollowHu : boolean = false;
    isMultiDianPao : boolean = false;
    totalScore : number = 100 ;
    punishScore : number = -10;
    waiBaoScore : number  = 10;
    isSelf : boolean = true;
    getCardsInfo() : { ming : PlayerActedCard[] , holdCard : number[], huCard : number } 
    {
        let act = new PlayerActedCard() ;
        act.eAct = eMJActType.eMJAct_Peng;
        act.eDir = eArrowDirect.eDirect_Left ;
        act.nInvokerIdx = 0 ;
        act.nTargetCard = 19 ;
        let vAct = [ act,act] ;
        return { ming : vAct, holdCard : [18,17,19,21,18,17,19], huCard : 21 } ;
    }

    getWinInfo() : { sofHua : number , hardHua : number , fanxingType : eFanxingType[] , isHuaZa : boolean , isBiXiaHu : boolean } 
    {
        return { sofHua : 10 , hardHua : 20 , fanxingType : [eFanxingType.eFanxing_DiHu,eFanxingType.eFanxing_HunYiSe] , isHuaZa : true , isBiXiaHu : true } 
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class NJTestDataResultSingle implements INJDlgResultSingleData {

    getResultType() : eSingleResultType 
    {
        return eSingleResultType.eType_LiuJu ;
    }

    getWinItemData() : INJDlgResultSingleItemDataWin 
    {
        return new NJTestWinDataItem() ;
    }

    getItemDatas() :  INJDlgResultSingleItemData[] 
    {
        return [ new NJTestDataItem(),new NJTestDataItem(),new NJTestDataItem(),new NJTestDataItem() ] ;
    }
}
