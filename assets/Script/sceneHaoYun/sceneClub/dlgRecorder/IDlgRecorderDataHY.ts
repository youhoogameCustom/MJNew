// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
export class RecorderOffset
{
    uid : number ;
    offset : number ; 
}

export interface IRecorderItemDataHY
{
    titleDesc : string ;
    id : number ;  // when room recorder titem , it is idx , when it is detail item , it is replayID
    getOffsets() : RecorderOffset[] ;
    getDetails() : IRecorderItemDataHY[] ;
    reqDetail( pret : ()=>void ) : void ;
}

export default interface IDlgRecorderDataHY {
    reqRcorderData( pret : ()=>void ) : void ;
    leaveRecorderDlg() : void ; 
    getRecorderCnt() : number ;
    getRecorderItemData( idx : number ) : IRecorderItemDataHY  ; 
}
