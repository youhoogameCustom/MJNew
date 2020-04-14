import OptsDanDong from "./OptsDanDong";
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
export default class OptsMoQi extends OptsDanDong {

    constructor()
    {
        super();
        this.isCircle = false ;
        this.gameType = eGameType.eGame_MQMJ ;
        this.baseScore = 1 ;
    }

    getRuleDesc() : string 
    {
        let str = "" ;
        if ( this.isOnePlayerDianPao )
        {
            str = "[一家炮] ";
        }
        else
        {
            switch ( this.seatCnt )
            {
                case 4: str =  "[三家炮]" ;break;
                case 3: str = "[两家炮]" ;break;
                case 2: str = "[一家炮]" ;break;
            }
        }

        if ( this.guangFen > 0 )
        {
            str = str + " [上限" + this.guangFen + "分]" ;
        }
        return "莫旗麻将 " + str + ( this.isAvoidCheat ? "[防作弊]" : "" );
    }
}
