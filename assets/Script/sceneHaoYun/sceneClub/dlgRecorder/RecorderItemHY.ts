import { IRecorderItemDataHY } from "./IDlgRecorderDataHY";
import PlayerInfoItem from "../../../commonItem/PlayerInfoItem";

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
export default class RecorderItemHY extends cc.Component {

    @property(cc.Label)
    mTitle : cc.Label = null ;

    @property(cc.Node)
    mReply : cc.Node = null ;

    @property(cc.Node)
    mDetail : cc.Node = null ;

    @property([PlayerInfoItem])
    mNames : PlayerInfoItem[] = [] ;

    @property([cc.Label])
    mOffsets : cc.Label[] = [];

    mID : number = 0 ;
    mCallBack : ( idx : number )=>void ;
    refresh( isRoomRecorderItem : boolean , data : IRecorderItemDataHY, pCallBack : ( idx : number )=>void ) 
    {
        this.mReply.active = isRoomRecorderItem == false ;
        this.mDetail.active = isRoomRecorderItem ;

        this.mTitle.string = data.titleDesc ;
        this.mCallBack = pCallBack ;
        this.mID = data.id ;

        for ( let v of this.mOffsets )
        {
            v.node.active = false ;
        }

        for ( let v of this.mNames )
        {
            v.node.active = false ;
        }

        let offsets = data.getOffsets();
        for ( let idx = 0 ; idx < offsets.length ; ++idx )
        {
            this.mNames[idx].node.active = true ;
            this.mNames[idx].refreshInfo(offsets[idx].uid );

            this.mOffsets[idx].string = offsets[idx].offset + "" ;
            this.mOffsets[idx].node.active = true ;
            this.mOffsets[idx].node.color = cc.Color.RED.fromHEX( offsets[idx].offset < 0 ? "#3cac4c" : "#eb341e" ) ;
        }
    }

    onBtn()
    {
        if ( this.mCallBack != null )
        {
            this.mCallBack(this.mID );
        }
    }
}
