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
export default class OptsARongQi extends OptsDanDong {

    constructor()
    {
        super();
        this.gameType = eGameType.eGame_ARQMJ ;
    }

    get isPao() : boolean
    {
        return this.jsOpts["pao"] == 1 ;
    }

    set isPao( is : boolean )
    {
        this.jsOpts["pao"] = is ? 1 : 0 ;
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

        if ( this.isPao )
        {
            str = str + " [跑]" ;
        }

        if ( this.guangFen > 0 )
        {
            str = str + " [上限" + this.guangFen + "分]" ;
        }
        return "阿荣旗麻将 " + str + ( this.isAvoidCheat ? "[防作弊]" : "" );
    }
}
