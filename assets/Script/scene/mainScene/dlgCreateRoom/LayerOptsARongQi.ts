import LayerOptsDanDong from "./LayerOptsDanDong";
import PromptText from "../../../globalModule/PromptText";
import OptsARongQi from "../../../opts/OptsARongQi";

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
export default class LayerOptsARongQi extends LayerOptsDanDong {

    @property(cc.Toggle)
    mPao : cc.Toggle = null ;
 

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.mOpts = new OptsARongQi();
    }

    protected buildOpts() : boolean
    {
        super.buildOpts();
        ( this.mOpts as OptsARongQi ).isPao = this.mPao.isChecked ;
        return true ;
    }
}
