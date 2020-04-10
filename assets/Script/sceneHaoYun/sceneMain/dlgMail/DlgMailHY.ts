import DlgBase from "../../../common/DlgBase";
import { IDlgMailDataHY } from "../IMainSceneDataHY";
import MailItemHY from "./MailItemHY";

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
export default class DlgMailHY extends DlgBase {

    @property(cc.Node)
    mItemLayout : cc.Node = null ;

    @property(cc.Prefab)
    mMailItemPrefab : cc.Prefab = null ;

    mItemPool : cc.NodePool = new cc.NodePool();

    mData : IDlgMailDataHY = null ;
    
    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void )
    {
        super.showDlg( pfResult, jsUserData,pfOnClose );
        this.mData = jsUserData ;
        this.clear();
        this.mData.reqMailData(this.refresh.bind(this));
    }

    protected refresh()
    {
        let vItems = this.mData.getMailItems();
        for ( let v of vItems )
        {
            let p = this.mItemPool.get();
            if ( p == null )
            {
                p = cc.instantiate( this.mMailItemPrefab );
            }

            let item = p.getComponent(MailItemHY);
            item.refresh(v) ;
            this.mItemPool.put(p) ;
        }

    }

    protected clear()
    {
        let self = this ;
        this.mItemLayout.children.forEach( ( v : cc.Node )=>{ self.mItemPool.put(v); } ) ;
    }
}
