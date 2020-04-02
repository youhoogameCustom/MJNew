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
export default class OptsShiSiLuo extends IOpts {
    constructor()
    {
        super();
        this.isCircle = false ;
        this.gameType = eGameType.eGame_LuoMJ ;
        this.baseScore = 1 ;
    }

    get isOnePlayerDianPao() : boolean
    {
        return this.jsOpts["dpOnePay"] == 1;
    }

    set isOnePlayerDianPao( is : boolean )
    {
        this.jsOpts["dpOnePay"] = is ? 1 : 0 ;
    }

    get isJiaHuShouBaYi() : boolean
    {
        return this.jsOpts["sb1"] == 1;
    }

    set isJiaHuShouBaYi( is : boolean )
    {
        this.jsOpts["sb1"] = is ? 1 : 0 ;
    }

    get isCaiGang() : boolean
    {
        return this.jsOpts["caiGang"] == 1;
    }

    set isCaiGang( is : boolean )
    {
        this.jsOpts["caiGang"] = is ? 1 : 0 ;
    }

    get isHunPiao() : boolean
    {
        return this.jsOpts["hunPiao"] == 1;
    }

    set isHunPiao( is : boolean )
    {
        this.jsOpts["hunPiao"] = is ? 1 : 0 ;
    }

}
