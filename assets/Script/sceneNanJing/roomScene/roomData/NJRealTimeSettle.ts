import { eMJActType } from "../../../scene/roomScene/roomDefine";

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
export default class NJRealTimeSettle {
    actType : eMJActType ;
    detail : { idx : number , chip : number }[] = [] ;
    parse( msg : Object )
    {
        this.detail.length = 0 ;

        this.actType = msg["actType"] ; 
        let objs : Object[] = msg["detial"] ; 
        for ( let item of objs )
        {
            let c = { idx : item["idx"] , chip : item["chips"] } ;
            this.detail.push(c);
        }
    }
}
