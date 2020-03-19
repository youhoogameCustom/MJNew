import { PlayerActedCard } from "../../../../scene/roomScene/roomData/MJPlayerCardData";
import { eFanxingType } from "../../../../scene/roomScene/roomDefine";

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

export interface INJDlgResultSingleItemData
{
    playerUID : number ;
    isBanker : boolean ;
    isDianPao : boolean ;
    isFollowHu : boolean ;
    isMultiDianPao : boolean ;
    totalScore : number ;
    punishScore : number ;
    waiBaoScore : number ;
    isSelf : boolean ;
    getCardsInfo() : { ming : PlayerActedCard[] , holdCard : number[], huCard : number } ;
}

export interface INJDlgResultSingleItemDataWin extends INJDlgResultSingleItemData
{
    getWinInfo() : { sofHua : number , hardHua : number , fanxingType : eFanxingType[] , isHuaZa : boolean , isBiXiaHu : boolean } ;
}

export enum eSingleResultType
{
    eType_LiuJu,
    eType_DianPao,
    eType_ZiMo,
    eType_Max,
} ;

export default interface INJDlgResultSingleData
{
    getResultType() : eSingleResultType ;
    getWinItemData() : INJDlgResultSingleItemDataWin ;
    getItemDatas() :  INJDlgResultSingleItemData[] ;
}
