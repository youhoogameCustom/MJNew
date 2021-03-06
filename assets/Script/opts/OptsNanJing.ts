import IOpts from "./IOpts";
import { eGameType } from "../common/clientDefine";

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
export default class OptsNanJing extends IOpts {
    constructor()
    {
        super();
        this.isCircle = false ;
        this.gameType = eGameType.eGame_NJMJ ;
        this.baseScore = 1 ;
        this.seatCnt = 4 ;
    }

    getRuleDesc() : string 
    {
        return "南京麻将 " +  this.seatCnt + "人 " + this.roundCnt + "局" ;
    }

    get isJingYuanZi() : boolean 
    {
        return true ;
    }
}
