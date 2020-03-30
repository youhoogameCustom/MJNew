import IDlgRecorderDataHY, { IRecorderItemDataHY, RecorderOffset } from "./IDlgRecorderDataHY";

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
class RecorderItemData implements IRecorderItemDataHY
{
    titleDesc : string ;
    id : number ;  // when room recorder titem , it is idx , when it is detail item , it is replayID

    vOffset : RecorderOffset[] = [ {uid : 2,offset : -23} ,{uid : 2,offset : 293} ,{uid : 2,offset : -123},{uid : 29,offset : 623}  ] ;
    
    vDetails : RecorderItemData[] = [] ;
    getOffsets() : RecorderOffset[] 
    {
        return this.vOffset ;
    }

    getDetails() : IRecorderItemDataHY[] 
    {
        if ( this.vDetails.length == 0 )
        {
            let cnt = 7 ;
            while ( cnt-- )
            {
                let p = new RecorderItemData() ;
                p.id = 2 ;
                p.titleDesc = "this is detail lsjdf alsdkfa asdlf ls f s jsf sldjf alsdkf adf fa " ;
                this.vDetails.push( p );
            }
        }
        console.log( "detail length = " + this.vDetails.length );
        return this.vDetails;
    }

    reqDetail( pret : ()=>void )
    {
        pret();
    }
}

@ccclass
export default class TestDlgRecorderDataHY implements IDlgRecorderDataHY {

    cnt : number = 50 ;
    vRecorders : RecorderItemData[] = [] ;

    reqRcorderData( pret : ()=>void ) : void 
    {
        pret();
    }

    leaveRecorderDlg() : void 
    {

    } 

    getRecorderCnt() : number 
    {
        return this.cnt ;
    }

    getRecorderItemData( idx : number ) : IRecorderItemDataHY 
    {
        if ( this.vRecorders.length == 0 )
        {
            let cnt = this.cnt ;
            while ( cnt-- )
            {
                let p = new RecorderItemData() ;
                p.id = cnt ;
                p.titleDesc = "this is room recorder real room recorder" ;
                this.vRecorders.push( p );
            }
        }
        return this.vRecorders[idx] ;
    }
}
