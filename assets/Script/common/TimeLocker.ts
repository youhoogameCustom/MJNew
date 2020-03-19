// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
export default class TimeLock {

    private _isLocking : boolean = false ;
    private mLockDuration : number = 2 ; // seconds ; 
    private mTimer : number = null ;
    constructor( seconds : number = 2 )
    {
        this.mLockDuration = seconds ;
    }

    get isLocking() : boolean
    {
        return this._isLocking ;
    }

    lock()
    {
        if ( null != this.mTimer )
        {
            clearTimeout(this.mTimer);
        }

        let self = this ;
        this.mTimer = setTimeout(() => {
            self._isLocking = false ;
            self.mTimer = null ;
        }, this.mLockDuration * 1000 );
        self._isLocking = true ;
    }

    reset() 
    {
        if ( null != this.mTimer )
        {
            clearTimeout(this.mTimer);
        }
        this._isLocking = false ;
    }
}
