import ISceneClubHYData, { IDeskItemHYData, IClubListHYData, IClubListItemHYData, ICreateClubVerifyDataHY } from "./ISceneClubHYData";
import IDlgMemberDataHY from "./dlgMember/IDlgMemberDataHY";
import TestDlgMemberDataHY from "./dlgMember/TestDlgMemberDataHY";

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

@ccclass
export default class TestSceneClubHYData implements ISceneClubHYData , IClubListHYData , ICreateClubVerifyDataHY {

    nCurClubID : number = 100 ;
    vClubListItem : TestClubListItemData[] = [] ;
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

    reqJoinClub( clubID : string , pResultCallBack: ( ret : number , content : string )=>void ) : void
    {
        
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


    }

    reqDoCreate( phoneNum : string , code : string , clubName : string, ResultCallBack: ( ret : number , content : string )=>void ) : void
    {

    }

    getCreateClubVerifyData() : ICreateClubVerifyDataHY
    {
        return this ;
    }
    

    


}
