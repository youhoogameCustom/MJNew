import { ILayerOpts } from "./ILayerOpts";
import * as _ from "lodash"
import OptsShiSiLuo from "../../../opts/OptsShiSiLuo";
import IOpts from "../../../opts/IOpts";
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
export default class LayerOptsShiSiLuo extends ILayerOpts {
    @property(cc.Toggle)
    mOneDianPao : cc.Toggle = null ;

    @property(cc.Toggle)
    mCaiGang : cc.Toggle = null; 

    @property(cc.Toggle)
    mJiaHuShouBaYi : cc.Toggle = null ;

    @property(cc.Toggle)
    mAvoidCheat : cc.Toggle = null ;

    @property(cc.Toggle)
    mHunPiao : cc.Toggle = null ;

    @property(cc.Label)
    mMultiDianPaoDesc : cc.Label = null ;
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    mOpts : OptsShiSiLuo = new OptsShiSiLuo();

    start () {

    }

    onToggleSeat( seat : cc.Toggle )
    {
        switch( this.getSeatCnt() )
        {
            case 4 :
                this.mMultiDianPaoDesc.string = "三家炮";
                break ;
            case 3 :
                this.mMultiDianPaoDesc.string = "两家炮";
                break ;
            case 2:
                this.mMultiDianPaoDesc.string = "一家炮";
                break ;
        }
         
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
        // wan fa 
        this.mOpts.isOnePlayerDianPao = this.mOneDianPao.isChecked ;

        // rand seat ;
        //this.mOpts.isRandSeat = this.mRandSeat.isChecked ;
        
        // ip and gps 
        // this.mOpts.isAvoidCheat = this.mIPAndGPS.isChecked ;
        // this.mOpts.isForceGPS = false ;
        // if ( this.mIPAndGPS.isChecked )
        // {
        //     this.mOpts.isForceGPS = this.mForceGPS.isChecked ;
        // }

        this.mOpts.isCaiGang = this.mCaiGang.isChecked;
        this.mOpts.isJiaHuShouBaYi = this.mJiaHuShouBaYi.isChecked ;
        this.mOpts.isAvoidCheat = this.mAvoidCheat.isChecked ;
        this.mOpts.isHunPiao = this.mHunPiao.isChecked ;
        return true ;
    }
 
}
