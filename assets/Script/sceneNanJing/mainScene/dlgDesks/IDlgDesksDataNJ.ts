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
 export interface IDeskItemDataNJ
 {
    roomID : number ;
    isRoomStarted : boolean ;
    roundDesc : string ;
    isJie : boolean ;
    isZa : boolean ;
    isFeng : boolean ;
    isBao : boolean ;
    getPlayers() : number[] ;
 }

 export interface IDlgDesksDelegateNJ
 {
    onRefreshCategory( isRequesing : boolean ) : void ;
    onRefreshDesks( isRequesing : boolean ) : void ;
 }

export default interface IDlgDeskDataNJ
{
    reqDataToRefresh() : void ;
    setDelegate( del : IDlgDesksDelegateNJ ) : void ;
    getCoin() : number ;
    
    getCategoryCnt() : number ;
    getCategoryItem( idx : number ) : { name : string, idx : number } ;
    setCurCategoryIdx( idx : number ) : void ;

    getDeskCntOfCurCategory( isEmpty : boolean ) : number ;
    getDeskDataOfCurCategory( isEmpty : boolean , idx : number ) : IDeskItemDataNJ ;
    
    reqEnterRoom( roomID : number ) : void ;
}
