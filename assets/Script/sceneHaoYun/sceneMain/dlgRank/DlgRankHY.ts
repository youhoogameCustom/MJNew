import DlgBase from "../../../common/DlgBase";
import ListView, { IAbsAdapter } from "../../../commonItem/ListView";
import { IDlgRankDataHY, IRankItemDataHY } from "../IMainSceneDataHY";
import RankItem from "./RankItemHY";
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
export default class DlgRank extends DlgBase implements IAbsAdapter {

    @property(ListView)
    mList : ListView = null ;

    @property(PlayerInfoItem)
    mSelfInfo : PlayerInfoItem = null ;

    @property(cc.Label) 
    mSelfRankIdx : cc.Label = null ;

    @property(cc.Label)
    mSelfRounds : cc.Label = null ;

    @property(cc.Node)
    mSelfOutRankIcon : cc.Node = null ;

    mData : IDlgRankDataHY = null ;
    // LIFE-CYCLE CALLBACKS:
    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void )
    {
        super.showDlg( pfResult, jsUserData,pfOnClose );
        this.mData = jsUserData ;
        this.mList.setAdapter(this);
        let self = this ;
        this.mData.reqRankData( ()=>{ self.refresh() ;} ) ;
    }

    protected refresh()
    {
        this.mList.notifyUpdate();
        this.mSelfInfo.refreshInfo(this.mData.selfUID );
        this.mSelfRankIdx.node.active = this.mData.selfRankIdx != -1 ;
        this.mSelfOutRankIcon.active = this.mData.selfRankIdx == -1 ;
        if ( this.mSelfRankIdx.node.active )
        {
            this.mSelfRankIdx.string = ( this.mData.selfRankIdx + 1 ) + "" ;
        }
        this.mSelfRounds.string = this.mData.selfRounds + "" ;
    }
    // onLoad () {}
    getCount(): number 
    {
        if ( null == this.mData )
        {
            return 0 ;
        }
        return this.mData.getRankItemCnt();
    }

    _getView(item: cc.Node, posIndex: number): cc.Node 
    {
        let p = item.getComponent(RankItem);
        if ( p == null )
        {
            console.error( "why rank item is null ? " );
            return item ;
        }
        let pd = this.mData.getRanItemData(posIndex);
        if ( pd == null )
        {
            console.error( "rank data is null idx = " + posIndex  );
            return item ;
        }

        p.refresh(pd.rankIdx,pd.uid,pd.rounds ) ;
        return item ;
    }
}
