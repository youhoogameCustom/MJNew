import ClubDataRooms, { ClubRoomItem } from "../../../clientData/clubData/ClubDataRooms";
import { IDeskItemHYData } from "../ISceneClubHYData";
import { eGameType } from "../../../common/clientDefine";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

class DeskItemDataHY extends ClubRoomItem implements IDeskItemHYData
{
    isEmpty() : boolean 
    {
        return this.vRoomPeers.length == 0 ;
    }

    getPlayers() : {posIdx : number , uid : number }[] 
    {
        let v : {posIdx : number , uid : number }[] = [] ;
        for ( let idx = 0 ; idx < this.vRoomPeers.length ; ++idx )
        {
            v.push( { posIdx : idx , uid : this.vRoomPeers[idx].nUID } );
        }
        return v ;
    }

    getRoomID() : number 
    {
        return this.nRoomID ;
    }

    getRound() : string 
    {
        return this.playedRound + "/" + this.totalRound + "局"; 
    }

    getDesc() : string 
    {
        let opts = this.opts;
        let str = "unknown " + opts.gameType ;
        switch ( opts.gameType )
        {
            case eGameType.eGame_DDMJ:
                {
                    str = "丹东麻将";
                }
                break ;
        }
        return str ;
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class ClubDataRoomsHY extends ClubDataRooms {

    getRoomCnt( seatCnt : number ) : number 
    {
        let cnt = 0 ;
        this.vRooms.forEach( ( item : DeskItemDataHY )=>{ if ( item.seatCnt == seatCnt ){ ++cnt}  } ) ;
        return cnt ;
    }

    getDeskItemData(seatCnt : number , idx : number ) : IDeskItemHYData
    {
        let curIdx = 0 ;
        for ( let item of this.vRooms )
        {
            if ( item.seatCnt == seatCnt )
            {
                if ( idx == curIdx )
                {
                    return item as DeskItemDataHY;
                }
                else
                {
                    ++curIdx ;
                }
            }

        }
        return null ;
    }

    protected createRoomItemData() : ClubRoomItem
    {
        return new DeskItemDataHY();
    }

    // update (dt) {}
}
