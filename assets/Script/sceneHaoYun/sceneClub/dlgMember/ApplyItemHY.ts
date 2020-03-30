import { IApplyItemDataHY } from "./IDlgMemberDataHY";

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
export default class ApplyItemHY extends cc.Component {

    @property(cc.RichText)
    mContent: cc.RichText = null;

    mfCallBack : ( applyUID : number , isAgree : boolean )=>void = null ;

    mEventID : number = 0 ;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    refresh( itemData : IApplyItemDataHY, pcallBack : ( mEventID : number , isAgree : boolean )=>void )
    {
        this.mContent.string = itemData.applyContent ;
        this.mEventID = itemData.eventID ;
        this.mfCallBack = pcallBack ;
    }

    onBtnAgree()
    {
        if ( null != this.mfCallBack )
        {
            this.mfCallBack(this.mEventID,true );
        }
    }

    onBtnRefuse()
    {
        if ( null != this.mfCallBack )
        {
            this.mfCallBack(this.mEventID,false );
        }
    }
}
