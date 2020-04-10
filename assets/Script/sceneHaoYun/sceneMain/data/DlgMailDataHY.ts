import { IDlgMailDataHY, IMailItemHY } from "../IMainSceneDataHY";
import { eMsgType } from "../../../common/MessageIdentifer";
import MainSceneDataHY from "./MainSceneDataHY" ;

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
export default class DlgMailDataHY implements IDlgMailDataHY {

    mSceneData : MainSceneDataHY = null ;
    constructor( data : MainSceneDataHY )
    {
        this.mSceneData = data ; 
    }

    reqMailData( pret : ()=>void ) : void 
    {

    }

    getMailItems() : IMailItemHY[] 
    {
        return [] ;
    } 

    onMsg( msgID : eMsgType, msg : Object   ) : boolean
    {
        return false ;
    }
}
