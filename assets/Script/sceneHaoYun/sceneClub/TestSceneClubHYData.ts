import ISceneClubHYData, { IDeskItemHYData, IClubListHYData, IClubListItemHYData, ICreateClubVerifyDataHY, IControlCenterDataHY, IDlgNoticeData } from "./ISceneClubHYData";
import IDlgMemberDataHY from "./dlgMember/IDlgMemberDataHY";
import TestDlgMemberDataHY from "./dlgMember/TestDlgMemberDataHY";
import IOpts from "../../opts/IOpts";
import TestDlgRecorderDataHY from "./dlgRecorder/TestDlgRecorderDataHY";
import IDlgRecorderDataHY from "./dlgRecorder/IDlgRecorderDataHY";

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

class TestDeskItemData implements IDeskItemHYData
{
    isEmpty() : boolean 
    {
        return false ;
    }

    getPlayers() : {posIdx : number , uid : number }[] 
    {
        return [ { posIdx : 0 , uid : 20} , { posIdx : 1 , uid : 20}, { posIdx : 2 , uid : 20},{ posIdx : 3 , uid : 20}] ;
    }

    getRoomID() : number 
    {
        return 123456 ;
    }

    getRound() : string 
    {
        return "1/8局" ;
    }

    getDesc() : string 
    {
        return "阿荣旗麻将15光" ;
    }
}

class TestClubListItemData implements IClubListItemHYData
{
    clubID : number ;
    ownerUID : number = 100;
    name : string;
    memberCnt : number ;
}

class TestControlCenterData implements IControlCenterDataHY
{
    clubName : string = "this is a test name";
    isOpening : boolean = true;
    isSelfCreater : boolean = false;
    getWanFaList() : { idx : number , content : string }[] 
    {
        return [ { idx : 0 , content :"just a test wan fa " }
        ,{ idx : 2 , content :"just a test wan fa 3" }
        ,{ idx : 3 , content :"just a test wan fa 4" }
        ,{ idx : 4 , content :"just a test wan fa 5" }
        ,{ idx : 5 , content :"just a test wan fa 6" }
        ,{ idx : 6 , content :"just a test wan fa 7" } ] ;
    }

    reqAddWanFa( opts : IOpts , pRet : ( ret : number , content : string )=>void) 
    {
        console.log( "do add wan fa " );
        pRet( 0 , "ok operate");
    }

    reqDeleteWanFa( idx : number , pRet : ( ret : number , content : string )=>void )
    {
        console.log( "delter wan fa " );
        pRet(0,"sdjfalsdg");
    }

    reqChangeName( newName : string , pRet : ( ret : number , content : string )=>void )
    {
        console.log( "change name " );
        this.clubName = newName ;
        pRet( 0 , "ok change name ");
    }

    reqSwitchState( pRet : ( ret : number , content : string )=>void ) 
    {
        console.log( "req switch club state" );
        this.isOpening = !this.isOpening ;
        pRet(0,"operate ok") ;
    }

    reqDismiss() : void 
    {
        console.log( "req do dismiss" );
    }
}

class TestDlgNoticeData implements IDlgNoticeData
{
    isSelfMgr() : boolean 
    {
        return false ;
    }
    clubName : string = "this is club name" ;
    clubNotice : string = "this is a notice" ;
    reqModifyNotice( notice : string , pret : ( ret : number , content : string )=>void ) : void 
    {
        console.log( "reqModifyNotice = " + notice );
    }
}

@ccclass
export default class TestSceneClubHYData implements ISceneClubHYData , IClubListHYData , ICreateClubVerifyDataHY {

    nCurClubID : number = 100 ;
    vClubListItem : TestClubListItemData[] = [] ;

    reqDatas( pRet : ()=>void ) : void 
    {
        pRet();
    }

    leaveScene() : void
    {
        
    }

    constructor()
    {
        for ( let i = 0 ; i < 20 ; ++i )
        {
            let p = new TestClubListItemData();
            p.clubID = 100 + i;
            p.name = "club"+ p.clubID ;
            p.memberCnt = 20+i*6 ;
            this.vClubListItem.push(p);
        }

    }

    getCurClubOwnerUID() : number 
    {
        return 100 ;
    }

    getCurClubNotice() : string 
    {
        return "this is a notice of club" ;
    }

    getCurClubID() : number 
    {
        return this.nCurClubID ;
    }

    setCurClubID( clubID : number ) : void 
    {
        this.nCurClubID = clubID ;
    }

    getDeskCnt( seatCnt : number ) : number 
    {
        return 20 ;
    }

    getDeskItemData(seatCnt : number , idx : number ) : IDeskItemHYData  
    {
        return new TestDeskItemData();
    }  

    getCLubListData() : IClubListHYData
    {
        return this ;
    }

    getDlgMemberData() : IDlgMemberDataHY
    {
        return new TestDlgMemberDataHY() ;
    }

    reqJoinClub( clubID : number , pResultCallBack: ( ret : number , content : string )=>void ) : void
    {
        console.log( "reqJoinClub" );
        pResultCallBack(0,"asdljfok ok");
    }

    ///--- IClubListHYData
    getClubListCnt() : number 
    {
        return this.vClubListItem.length ;
    }

    getClubListItemData( idx : number ) : IClubListItemHYData 
    {
        return this.vClubListItem[idx] ;
    }

    getCurSelectedClubID() : number 
    {
        return this.getCurClubID() ;
    }

    // ICreateClubVerifyDataHY
    reqVerifyCode( phoneNum : string ) : void 
    {
        console.log( "reqVerifyCode" );

    }

    reqDoCreate( phoneNum : string , code : string , clubName : string, ResultCallBack: ( ret : number , content : string )=>void ) : void
    {
        console.log( "reqDoCreate" );
        ResultCallBack( 0,"0" );
    }

    getCreateClubVerifyData() : ICreateClubVerifyDataHY
    {
        return this ;
    }
    
    isSelfClubMgr() : boolean
    {
        return true ;
    }

    reqExitClub() : void 
    {
        console.log( "req exit club" );
    }
    
    getControlCenterData() : IControlCenterDataHY 
    {
        return new TestControlCenterData() ;
    }

    getRecorderData() : IDlgRecorderDataHY
    {
        return new TestDlgRecorderDataHY();
    }

    getDlgNoticeData() : IDlgNoticeData 
    {
        return new TestDlgNoticeData();
    }

}
