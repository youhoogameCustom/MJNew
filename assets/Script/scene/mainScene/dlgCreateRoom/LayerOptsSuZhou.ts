import { ILayerOpts } from "./ILayerOpts";
import OptsSuZhou from "../../../opts/OptsSuZhou";
import IOpts from "../../../opts/IOpts";
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
export default class LayerOptsSuZhou extends ILayerOpts {

    @property(cc.Toggle)
    mMoChong34 : cc.Toggle = null ;

    @property(cc.Toggle)
    mHaoQi : cc.Toggle = null ;

    @property(cc.Toggle)
    mDiLing : cc.Toggle = null ;

    mOpts : OptsSuZhou = new OptsSuZhou();

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

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
        // pay type ;
        this.mOpts.payType = this.getPayType();
        this.mOpts.seatCnt = this.getSeatCnt();
        
        // wan fa 
        this.mOpts.ruleMode = this.mMoChong34.isChecked ? 2 :  1 ;

        this.mOpts.isHaoQi = this.mHaoQi.isChecked ;
        this.mOpts.isDiLing = this.mDiLing.isChecked ;
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

    // update (dt) {}
}
