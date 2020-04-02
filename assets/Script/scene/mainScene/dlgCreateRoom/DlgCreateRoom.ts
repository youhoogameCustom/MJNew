import DlgBase from "../../../common/DlgBase";
import { ILayerOpts } from "./ILayerOpts";
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
export default class DlgCreateRoom extends DlgBase {
    
    @property( [ILayerOpts] )
    mLayerOptsForGames : ILayerOpts[] = [] ;

    @property([cc.Toggle])
    mToggleGames : cc.Toggle[] = [];  // idx must corropsone with mLayerOptsForGames 's idx ;



    // LIFE-CYCLE CALLBACKS:
    start () {
        // init state;
        this.onSelectGame();
    }

    onSelectGame()
    {
        for ( let idx = 0 ;  idx < this.mToggleGames.length ; ++idx )
        {
            this.mLayerOptsForGames[idx].node.active = this.mToggleGames[idx].isChecked;
        }
    }

    onBtnDoCreate()
    {
        for ( let idx = 0 ;  idx < this.mToggleGames.length ; ++idx )
        {
            if ( this.mToggleGames[idx].isChecked && this.pFuncResult != null )
            {
                this.pFuncResult( this.mLayerOptsForGames[idx].getOpts() ) ;
                break ;
            }
        }

        this.closeDlg();   
    }

    // update (dt) {}
}
