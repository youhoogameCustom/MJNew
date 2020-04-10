import IDlgRecorderDataHY, { IRecorderItemDataHY } from "../dlgRecorder/IDlgRecorderDataHY";
import * as _ from "lodash"
import IClubDataComponent from "../../../clientData/clubData/IClubDataComponent";
import DataRecorderHY from "../../sceneMain/data/DataRecorderHY";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
export default class ClubDataRecorderHY extends IClubDataComponent implements IDlgRecorderDataHY {

    mRecorderData : DataRecorderHY = null ;
    getRecorderCnt() : number  
    {
        if ( null != this.mRecorderData )
        {
            return this.mRecorderData.getRecorderCnt();
        }

        return 0 ;
    }

    getRecorderItemData( idx : number ) : IRecorderItemDataHY 
    {
        if ( null != this.mRecorderData )
        {
            return this.mRecorderData.getRecorderItemData(idx);
        }

        return null ;
    }

    fetchData( isforce : boolean ) : void
    {
        if ( null == this.mRecorderData )
        {
            return ;
        }

        this.reqRcorderData(this.mRecorderData.pCallBackRecorderRefresh) ;
    } 

    reqRcorderData( pret : ()=>void ) : void 
    {
        if ( null == this.mRecorderData )
        {
            this.mRecorderData = new DataRecorderHY(this.clubID,true) ;
        }
        this.mRecorderData.reqRcorderData(pret) ;
    }

    leaveRecorderDlg() : void 
    {
        if ( null != this.mRecorderData )
        {
            this.mRecorderData.leaveRecorderDlg();
        }
    }
}
