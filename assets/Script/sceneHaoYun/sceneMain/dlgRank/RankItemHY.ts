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
export default class RankItem extends cc.Component {

    @property([cc.Node])
    mRankIcons : cc.Node[] = [] ;

    @property(cc.Label)
    mRankIdx : cc.Label = null ;

    @property(PlayerInfoItem)
    mPlayerInfo : PlayerInfoItem = null ;

    @property(cc.Label)
    mRounds : cc.Label = null ;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    refresh( idx : number , uid : number , rounds : number )
    {
        this.mRankIcons.forEach(( c : cc.Node )=>{ c.active = false ;} ) ;
        this.mRankIdx.node.active = false ;
        if ( idx < this.mRankIcons.length )
        {
            this.mRankIcons[idx].active = true ;
        }
        else
        {
            this.mRankIdx.node.active = true ;
            this.mRankIdx.string = ( idx + 1 ) + "" ;
        }

        this.mPlayerInfo.refreshInfo(uid) ;
        this.mRounds.string = "" + rounds ;
    }

    // update (dt) {}
}
