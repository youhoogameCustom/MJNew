import { ILayerOpts } from "./ILayerOpts";
import IOpts from "../../../opts/IOpts";
import OptsNanJing from "../../../opts/OptsNanJing";
import * as _ from "lodash"

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
export default class LayerOptsNanJing extends ILayerOpts {

    mOpts : OptsNanJing = new OptsNanJing();

    start () {

    }

    getOpts() : IOpts 
    {
        if ( false == this.buildOpts() )
        {
            return null ;
        }
        return this.mOpts;
    }

    protected buildOpts() : boolean
    {
        // round 
        this.mOpts.roundCnt = this.getRoundCnt();
       // seat ;
       this.mOpts.seatCnt = this.getSeatCnt() ;
       // pay type ;
       this.mOpts.payType = this.getPayType();
        return true ;
    }

    protected getRoundCnt() : number
    {
        let idx = _.findIndex(this.mRound, ( c : cc.Toggle )=>{ return c.isChecked ;} );
        switch ( idx )
        {
            case 0 : return 4 ;
            case 1 : return 8 ;
            case 2 : return 16 ;
        }
        return 8 ;
    }
}
