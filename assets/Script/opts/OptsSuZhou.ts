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
export default class OptsSuZhou extends IOpts {

    constructor()
    {
        super();
        this.isCircle = false ;
        this.gameType = eGameType.eGame_SZMJ ;
        this.baseScore = 1 ;
        this.seatCnt = 4 ;
    }

    get roundCnt() : number
    {
        if ( this.jsOpts["level"] == null )
        {
            this.jsOpts["level"] = 0 ;
            cc.error("round key is null");
        }

        let v = [ 4,8,16] ;
        return v[this.jsOpts["level"]]; 
    } 

    set roundCnt( value : number)
    {
        this.jsOpts["level"] = 0 ;
        let v = [ 4,8,16] ;
        for ( let idx = 0 ; idx < v.length; ++idx )
        {
            if ( value == v[idx] )
            {
                this.jsOpts["level"] = idx ;
                return ;
            }
        }
        cc.error( "sz ivalid round cnt = " + value );
    }

    // 1是2摸3冲，2 3摸4冲
    get ruleMode() : number 
    {
        return this.jsOpts["ruleMode"];
    }

    set ruleMode( mode : number )
    {
        this.jsOpts["ruleMode"] = mode ;
    }

    get isHaoQi() : boolean 
    {
        return this.jsOpts["haoQiDui"] == 1 ;
    }

    set isHaoQi( isHao : boolean )
    {
        this.jsOpts["haoQiDui"] = isHao ? 1 : 0 ;
    }

    get isDiLing() : boolean 
    {
        return this.jsOpts["diLing"] == 1 ;
    }

    set isDiLing( isDL : boolean )
    {
        this.jsOpts["diLing"] = isDL ? 1 : 0 ;
    }

    getRuleDesc() : string 
    {
        return "szmjdd" ;
    }

    getDiamondFee() : number 
    {
        return 0 ;
    }
}
