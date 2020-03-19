import DlgBase from "../../../common/DlgBase";
import ListView, { IAbsAdapter } from "../../../commonItem/ListView";
import IDlgDeskDataNJ, { IDlgDesksDelegateNJ } from "./IDlgDesksDataNJ";
import CategoryItemNJ from "./CategoryItemNJ";
import DeskItemNJ from "./DeskItemNJ";

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
export default class DlgDesksNJ extends DlgBase implements IAbsAdapter , IDlgDesksDelegateNJ {
    
    @property(cc.Label)
    mCoin : cc.Label = null ;

    @property(ListView)
    mCategoryList : ListView = null ;

    @property(ListView)
    mDeskList : ListView = null ;

    @property(cc.Toggle)
    mShowAllDesk : cc.Toggle = null ;
    
    @property(cc.Toggle)
    mShowEmptyDesk : cc.Toggle = null ;

    mData : IDlgDeskDataNJ = null ;
    isUpdatingDeskList : boolean = false  ;

    get isShowEmtpyDesks () : boolean
    {
        return this.mShowEmptyDesk.isChecked ;
    }

    onLoad()
    {
        super.onLoad();
        this.mDeskList.setAdapter(this);
        this.mCategoryList.setAdapter(this) ;
    }

    showDlg( pfResult? : ( jsResult : Object ) => void, jsUserData? : any, pfOnClose? : ( pTargetDlg : DlgBase ) => void  )
    {
        super.showDlg(pfResult,jsUserData,pfOnClose); 
        this.mCoin.string = this.mData.getCoin() + "" ;

        this.mData = jsUserData ;
        this.mData.setDelegate(this);
        this.mData.reqDataToRefresh();
    }

    closeDlg()
    {
        this.mData.setDelegate(null);
        super.closeDlg();
    }

    // interface IAbsAdapter
    getCount(): number 
    {
        if ( this.mData == null )
        {
            return 0 ;
        }

        if ( this.isUpdatingDeskList )
        {
            return this.mData.getDeskCntOfCurCategory( this.isShowEmtpyDesks );
        }
        else
        {
            return this.mData.getCategoryCnt();
        }
    }

    _getView(item: cc.Node, posIndex: number): cc.Node 
    {
        if ( this.mData == null )
        {
            return item ;
        }

        if ( this.isUpdatingDeskList )
        {
            let deskItem = item.getComponent(DeskItemNJ);
            let itemData = this.mData.getDeskDataOfCurCategory( this.isShowEmtpyDesks, posIndex ) ;
            deskItem.refresh( itemData,this.onDeskListCallBack.bind(this) ) ;
        }
        else
        {
            let categoryItem = item.getComponent(CategoryItemNJ);
            let cid = this.mData.getCategoryItem( posIndex ) ;
            categoryItem.refresh( cid.name,cid.idx,this.onCategoryListCallBack.bind(this) ) ;
        }
        return item ;
    }
    // update (dt) {}

    // interface IDlgDesksDelegateNJ
    onRefreshCategory( isRequesing : boolean ) : void 
    {
        this.mCategoryList.notifyUpdate();
    }

    onRefreshDesks( isRequesing : boolean ) : void 
    {
        this.mDeskList.notifyUpdate();
    }

    onBtnShop()
    {

    }

    onSwitchShowEmptyDesk()
    {

    }

    onBtnRule()
    {

    }

    onCategoryListCallBack( nCategoryIdx : number )
    {
        this.mData.setCurCategoryIdx(nCategoryIdx) ;
    }

    onDeskListCallBack( nRoomID : number )
    {
        this.mData.reqEnterRoom(nRoomID);
    }
}
