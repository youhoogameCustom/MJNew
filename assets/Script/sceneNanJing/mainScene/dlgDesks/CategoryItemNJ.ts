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
export default class CategoryItemNJ extends cc.Component {

    private pfCallBack : ( idx : number )=>void = null ; 
    @property(cc.Label)
    mContentLabel : cc.Label = null ;
    
    mToggle : cc.Toggle
    mIdx : number = 0 ;
    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.mToggle = this.node.getComponent(cc.Toggle);
        this.mToggle.node.on("toggle",this.onToggle,this);
    }

    start () {

    }

    refresh( name : string , idx : number , callBack : ( idx : number )=>void )
    {
        this.mContentLabel.string = name ;
        this.mIdx = idx ;
        this.pfCallBack = callBack ;
    }

    onToggle( event : any )
    {
        if ( this.mToggle.isChecked )
        {
            this.pfCallBack( this.mIdx ) ;
        }
        this.mContentLabel.node.color = cc.Color.WHITE.fromHEX( this.mToggle.isChecked ? "#985002" : "#fef2ce" );
    }

    // update (dt) {}
}
