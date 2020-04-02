import IOpts from "../../../opts/IOpts";
import * as _ from "lodash"
import { ePayRoomCardType } from "../../../common/clientDefine";
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
export abstract class ILayerOpts extends cc.Component
{
    @property([cc.Toggle])
    mRound : cc.Toggle[] = [] ;

    @property([cc.Toggle])
    mSeatCnt : cc.Toggle[] = [] ;

    @property([cc.Toggle])
    payTypes : cc.Toggle[] = [] ;

    abstract getOpts() : IOpts ;

    protected getSeatCnt()
    {
        let idx = _.findIndex(this.mSeatCnt, ( c : cc.Toggle )=>{ return c.isChecked ;} );
        switch ( idx )
        {
            case 0 : return 4 ;
            case 1 : return 3 ;
            case 2 : return 2 ;
        }
        return 4 ;
    }

    protected getRoundCnt() : number
    {
        let idx = _.findIndex(this.mRound, ( c : cc.Toggle )=>{ return c.isChecked ;} );
        switch ( idx )
        {
            case 0 : return 8 ;
            case 1 : return 16 ;
        }
        return 8 ;
    }

    protected getPayType() : ePayRoomCardType
    {
        let idx = _.findIndex(this.payTypes, ( c : cc.Toggle )=>{ return c.isChecked ;} );
        switch ( idx )
        {
            case 0 : return ePayRoomCardType.ePayType_RoomOwner ;
            case 1 : return ePayRoomCardType.ePayType_AA ;
        }
        return ePayRoomCardType.ePayType_AA ;
    }
}
