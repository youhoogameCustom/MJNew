import { INJDlgResultTotalData, INJTotalResultItemData } from "../layerDlg/dlgResultTotal/INJDlgResultTotalData";
import { IResultData } from "../../../scene/roomScene/roomData/IResultData";
import MJRoomData from "../../../scene/roomScene/roomData/MJRoomData";
import OptsNanJing from "../../../opts/OptsNanJing";

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

class NJResultTotalItemData implements INJTotalResultItemData
{
    uid : number ;
    score : number ;
    waibao : number ;
    coin : number ;
}

@ccclass
export default class NJResultTotalData implements INJDlgResultTotalData , IResultData {
    
    mItems : NJResultTotalItemData[] = [] ;
    mRoomID : number = 0 ;
    mIsYuanZi : boolean = false ;
    getRoomID() : number 
    {
        return this.mRoomID ;
    }

    isYuanZi() : boolean 
    {
        return this.mIsYuanZi ;
    }
    
    getItemDatas() : INJTotalResultItemData[] 
    {
        return this.mItems ;
    }

    parseResult( msg : Object , roomData : MJRoomData )
    {
        this.mRoomID = roomData.getRoomID() ;
        this.mIsYuanZi = ( roomData.mOpts as OptsNanJing ).isJingYuanZi ;

        let vResults : Object[] = msg["result"] ;
        for ( let item of vResults )
        {
            let dataItem = new NJResultTotalItemData();
            dataItem.coin = item["realFinal"] ;
            dataItem.score = item["final"] ;
            dataItem.uid = item["uid"] ;
            dataItem.waibao = item["extraOffset"] ;
            this.mItems.push(dataItem);
        }
    }
}
