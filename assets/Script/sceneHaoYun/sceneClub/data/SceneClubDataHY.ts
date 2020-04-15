import ClientPlayerClubs from "../../../clientData/ClientPlayerClubs";
import ISceneClubHYData, { IDeskItemHYData, IClubListHYData, ICreateClubVerifyDataHY, IClubListItemHYData, IControlCenterDataHY, IDlgNoticeData } from "../ISceneClubHYData";
import ClubDataRoomsHY from "./ClubDataRoomsHY";
import IDlgMemberDataHY from "../dlgMember/IDlgMemberDataHY";
import ClubDataHY from "./ClubDataHY";
import IDlgRecorderDataHY from "../dlgRecorder/IDlgRecorderDataHY";
import Prompt from "../../../globalModule/Prompt";
import ClubDataRecorderHY from "./ClubDataRecorderHY";
import ClubDataBaseDataHY from "./ClubDataBaseDataHY";
import ClubData from "../../../clientData/clubData/ClubData";
import ClientApp from "../../../globalModule/ClientApp";
import * as _ from "lodash"
import { eClubDataComponent } from "../../../clientData/clubData/ClubDefine";
import IClubDataComponent from "../../../clientData/clubData/IClubDataComponent";
import Utility from "../../../globalModule/Utility";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

 
export default class SceneClubDataHY extends ClientPlayerClubs implements ISceneClubHYData , IClubListHYData , ICreateClubVerifyDataHY  {
    pCallBackRefreshClubs : ()=>void = null ;
    
    leaveScene()
    {
        this.pCallBackRefreshClubs = null ;
    }

    reqDatas( pRet : ()=>void ) : void
    {
        this.pCallBackRefreshClubs = pRet ;
        let vCIDs = ClientApp.getInstance().getClientPlayerData().getBaseData().getJoinedClubsID();
        if ( this.vClubs.length == 0 )
        {
            this.pCallBackRefreshClubs();
            return ;
        }

        let vClubs : ClubData[] = [] ;
        for ( let v of vCIDs )
        {
            let pClub = _.find(this.vClubs,( itemData : ClubData )=>{ itemData.clubID == v } ) ;
            if ( pClub == null )
            {
                pClub = this.createClubData() ;
                pClub.init(v,this) ;
            }
            vClubs.push(pClub);
        }
        this.vClubs.length = 0 ;
        this.vClubs = vClubs ;

        for ( let club of this.vClubs )
        {
            club.fetchData(eClubDataComponent.eClub_BaseData,false) ;
            club.fetchData(eClubDataComponent.eClub_Rooms,false ) ;
        }

        if ( this.mCurClub == null && this.vClubs.length > 0 )
        {
            this.mCurClub = this.vClubs[0] ;
        }
    }

    onClubDataRefreshed( club1 : ClubData, refreshedCompoent : IClubDataComponent )
    {
        if ( refreshedCompoent.getType() == eClubDataComponent.eClub_BaseData )
        {
            club1.fetchData(eClubDataComponent.eClub_Events,true) ;
        }

        for ( let club of this.vClubs )
        {
            if ( club.getClubBase().isDataOutOfDate() )
            {
                return ;
            }

            if ( club.getClubRooms().isDataOutOfDate() )
            {
                return ;
            }

            
            if ( club.getClubEvents().isDataOutOfDate() )
            {
                return ;
            }
        }

        if ( this.pCallBackRefreshClubs != null )
        {
            this.pCallBackRefreshClubs();
        }
    }

    deleteClub( clubID : number )
    {
        for ( let idx = 0 ; idx < this.vClubs.length ; ++idx )
        {
            if ( this.vClubs[idx].getClubID() == clubID )
            {
                if ( this.pDelegate )
                {
                    this.pDelegate.onLeaveClub(this.vClubs[idx]) ;
                }

                if ( this.mCurClub.getClubID() == clubID )
                {
                    this.mCurClub = null ;
                }

                this.vClubs[idx].onDestry();
                this.vClubs.splice(idx,1) ;
                break ;
            }
        }

        if ( null == this.mCurClub )
        {
            this.setCurClubID(this.vClubs.length == 0 ? 0 : this.vClubs[0].getClubID() ) ;
        }

        this.pCallBackRefreshClubs();
        console.error( "client data do not have clubID = " + clubID );
    }

    protected createClubData() : ClubData
    {
        return new ClubDataHY();
    }

    getCurClubOwnerUID() : number
    {
        if ( this.mCurClub == null )
        {
            return 0;
        }

        return this.mCurClub.getClubBase().creatorUID ;
    }

    getCurClubNotice() : string
    {
        return super.getClubNotice();
    }

    getCurClubID() : number 
    {
        if ( this.mCurClub == null )
        {
            return 0;
        }
        return this.mCurClub.clubID ;
    }

    setCurClubID( clubID : number ) : void 
    {
        super.setCurrentClubID(clubID);
    }

    getDeskCnt( seatCnt : number ) : number 
    {
        if ( this.mCurClub == null )
        {
            return 0 ;
        }

        let com = this.mCurClub.getClubRooms() ;
        let data : ClubDataRoomsHY = com as ClubDataRoomsHY ;
        return data.getRoomCnt(seatCnt) ;
    }

    getDeskItemData(seatCnt : number , idx : number ) : IDeskItemHYData  
    {
        let com = this.mCurClub.getClubRooms() ;
        let data : ClubDataRoomsHY = com as ClubDataRoomsHY ;
        return data.getDeskItemData(seatCnt,idx) ;
    }

    getCLubListData() : IClubListHYData
    {
        return this ;
    }

    getDlgMemberData() : IDlgMemberDataHY 
    {
        if ( null == this.mCurClub )
        {
            return null ;
        }

        return this.mCurClub as ClubDataHY ;
    }
    
    getCreateClubVerifyData() : ICreateClubVerifyDataHY 
    {
        return this ;
    }

    // reqJoinClub( clubID : string , pResultCallBack: ( ret : number , content : string )=>void ) : void 
    // {

    // }

    // isSelfClubMgr() : boolean 
    // {
    //     return super.isSelfClubMgr()
    // }

    reqExitClub() : void 
    {
        super.reqLeaveCurClub();
    }

    getControlCenterData() : IControlCenterDataHY 
    {
        return this.mCurClub.getClubBase() as ClubDataBaseDataHY ;
    }

    getRecorderData() : IDlgRecorderDataHY
    {
        if ( this.mCurClub == null )
        {
            return null ;
        }

        let recorder = ( this.mCurClub.getClubRecorder() as IClubDataComponent ) as ClubDataRecorderHY;
        return recorder;
    }

    getDlgNoticeData() : IDlgNoticeData 
    {
        return this.mCurClub as ClubDataHY ;
    }

    // IClubListHYData
    getClubListCnt() : number 
    {
        return this.vClubs.length ;
    }

    getClubListItemData( idx : number ) : IClubListItemHYData 
    {
        return this.vClubs[idx] as ClubDataHY ;
    }

    getCurSelectedClubID() : number 
    {
        return this.getCurClubID();
    }

    //----ICreateClubVerifyDataHY
    reqVerifyCode( phoneNum : string ) : void 
    {
        // do send http request to featch code ;
        Utility.requestPhoneVerifyCode(phoneNum) ;
    }

    reqDoCreate( phoneNum : string , code : string , clubName : string, pResultCallBack: ( ret : number , content : string )=>void ) : void
    {
        if ( G_TEST )
        {
            let js = {} ;
            js["name"] = clubName ;
            this.reqCreateClub(js,pResultCallBack) ;
            return ;
        }

        // do check code 
        let self = this ;
        Utility.checkPhoneVerifyCode(phoneNum,code).then( ()=>{
            let js = {} ;
            js["name"] = clubName ;
            self.reqCreateClub(js,pResultCallBack) ;
        }
        ,()=>{
            pResultCallBack(-1,"手机号验证失败" );
        } ) ;
    }
}
