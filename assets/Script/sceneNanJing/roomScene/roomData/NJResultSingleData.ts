import INJDlgResultSingleData, { eSingleResultType, INJDlgResultSingleItemData, INJDlgResultSingleItemDataWin } from "../layerDlg/dlgResultSingle/INJDlgResultSingleData";
import { PlayerActedCard } from "../../../scene/roomScene/roomData/MJPlayerCardData";
import { eFanxingType } from "../../../scene/roomScene/roomDefine";
import MJRoomData from "../../../scene/roomScene/roomData/MJRoomData";
import { IResultData } from "../../../scene/roomScene/roomData/IResultData";

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

class ResultSingleItemData implements INJDlgResultSingleItemData
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
    getCardsInfo() : { ming : PlayerActedCard[] , holdCard : number[], huCard : number } 
    {
        return null ;
    }
}

class ResulgSingleItemDataWin extends ResultSingleItemData implements INJDlgResultSingleItemDataWin
{
    getWinInfo() : { sofHua : number , hardHua : number , fanxingType : eFanxingType[] , isHuaZa : boolean , isBiXiaHu : boolean } 
    {
        return null ;
    }
}

@ccclass
export default class NJResultSingleData implements INJDlgResultSingleData , IResultData {

    mResultType : eSingleResultType = eSingleResultType.eType_Max ;
    mWinItem : ResulgSingleItemDataWin = null ;
    mItems : ResultSingleItemData[] = [] ;

    getResultType() : eSingleResultType
    {
        return this.mResultType ;
    }

    getWinItemData() : INJDlgResultSingleItemDataWin
    {
        return this.mWinItem ;
    }

    getItemDatas() :  INJDlgResultSingleItemData[]
    {
        return this.mItems ;
    }

    parseResult( msg : Object , roomData : MJRoomData )
    {

    }
}
