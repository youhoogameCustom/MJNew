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
export default class ControlCenterWanFaItemHY extends cc.Component {

    @property(cc.RichText)
    mContent : cc.RichText = null ;

    pCallBack : ( idx : number,item : cc.Node )=>void = null ;

    mIdx : number = -1 ;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    refresh( content : string , idx : number , callBack : (idx : number , item : cc.Node )=>void )
    {
        this.mContent.string = content ;
        this.mIdx = idx ;
        this.pCallBack = callBack ;
    }

    onBtnDelete()
    {
        if ( null != this.pCallBack )
        {
            this.pCallBack(this.mIdx,this.node );
        }
    }

    // update (dt) {}
}
