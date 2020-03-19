import { INJDlgResultTotalData, INJTotalResultItemData } from "./INJDlgResultTotalData";

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

class TestNJTotalDataItem implements INJTotalResultItemData
{
    uid : number = 0 ;
    score : number = 100 ;
    waibao : number = -20;
    coin : number = 10;
}

@ccclass
export default class TestTotalResultDataNJ implements INJDlgResultTotalData {

    getRoomID() : number 
    {
        return 278456 ;
    }

    isYuanZi() : boolean 
    {
        return true ;
    }

    getItemDatas() : INJTotalResultItemData[] 
    {
        return [ new TestNJTotalDataItem(),new TestNJTotalDataItem(),new TestNJTotalDataItem(),new TestNJTotalDataItem() ] ;
    }
}
