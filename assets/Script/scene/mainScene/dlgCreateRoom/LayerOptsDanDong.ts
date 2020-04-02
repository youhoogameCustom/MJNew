import { ILayerOpts } from "./ILayerOpts";
import IOpts from "../../../opts/IOpts";
import OptsDanDong from "../../../opts/OptsDanDong";
import Prompt from "../../../globalModule/Prompt";
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
export default class LayerOptsDanDong extends ILayerOpts {

    @property(cc.Toggle)
    mOneDianPao : cc.Toggle = null ;

    @property(cc.Toggle)
    mGuang : cc.Toggle = null ;

    @property( [cc.Toggle ] )
    mFengLimit : cc.Toggle[] = [] ;

    @property( cc.Toggle )
    mRandSeat : cc.Toggle = null ;

    @property(cc.Toggle)
    mIPAndGPS : cc.Toggle = null ;

    @property(cc.Toggle)
    mForceGPS : cc.Toggle = null ;

   // @property(cc.Label)
    //mAAPayDesc : cc.Label = null ;

    @property(cc.Label)
    mMultiDianPaoDesc : cc.Label = null ;
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    mOpts : OptsDanDong = null;

    start () {
        this.mOpts = new OptsDanDong();
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

    onToggleGuang( guang : cc.Toggle )
    {
        if ( guang.isChecked )
        {
            for ( let item of this.mFengLimit )
            {
                if ( item.isChecked )
                {
                    return ;
                }
            }

            this.mFengLimit[0].isChecked = true ;
        }
        else
        {
            for ( let item of this.mFengLimit )
            {
                if ( item.isChecked )
                {
                    item.isChecked = false ;
                    return ;
                }
            }
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

        // limit fen
        this.mOpts.guangFen = 0 ; 
        if ( this.mGuang.isChecked )
        {
            let vFen = [ 30,50,70,100] ;
            if ( vFen.length != this.mFengLimit.length )
            {
                cc.error( "mFengLimit array is the same length" );
                return false ;
            }
            
            this.mFengLimit.every( ( t : cc.Toggle , idx : number )=>{
                if ( t.isChecked )
                {
                    this.mOpts.guangFen = vFen[idx] ;
                    return false ;
                }
                return false ;
            } );

            if ( this.mOpts.guangFen == 0 )
            {
                Prompt.promptDlg( "请选择分数");
                return false ;
            }
        }

        // rand seat ;
        if ( this.mRandSeat != null )
        {
            this.mOpts.isRandSeat = this.mRandSeat.isChecked ;
        }
        
        // ip and gps 
        if ( this.mIPAndGPS != null )
        {
            this.mOpts.isAvoidCheat = this.mIPAndGPS.isChecked ;
            this.mOpts.isForceGPS = false ;
            if ( this.mIPAndGPS.isChecked && this.mForceGPS != null )
            {
                this.mOpts.isForceGPS = this.mForceGPS.isChecked ;
            }
        }

        return true ;
    }
    // update (dt) {}
}
