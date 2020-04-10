import IDlgRecorderDataHY, { IRecorderItemDataHY, RecorderOffset } from "../../sceneClub/dlgRecorder/IDlgRecorderDataHY";
import Prompt from "../../../globalModule/Prompt";
import TimeLock from "../../../common/TimeLocker";
import * as _ from "lodash"
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
 
class RecorderRoomEntryHY implements IRecorderItemDataHY
{
   titleDesc : string ;
   id : number ;  // when room recorder titem , it is idx , when it is detail item , it is replayID
   vOffsets : RecorderOffset[] = [] ;
   vDetailEntrys : IRecorderItemDataHY[] = [] ;

   sieralNum : number = 0 ;

   getOffsets() : RecorderOffset[] 
   {
       return this.vOffsets ;
   }

   getDetails() : IRecorderItemDataHY[] 
   {
       return this.vDetailEntrys ;
   }

   parseJs( jsEntry : Object )
   {
       this.id = jsEntry["roomID"] ;
       //this.rule = "rule default";//jsData["opts"];
       this.sieralNum = jsEntry["sieralNum"];
       let t = jsEntry["time"] ;
       let pDate = new Date(t * 1000 ) ;
       let strTime = pDate.toLocaleString("zh-CN");
       
       let vOffset : Object[] = jsEntry["offsets"] ;
       for ( let offset of vOffset )
       {
           let of = new RecorderOffset();
           of.uid = parseInt(offset["userUID"]) ;
           of.offset = offset["offset"] ;
           this.vOffsets.push(of);
       }

       this.titleDesc = strTime + "    房间号：" + this.id; 
   }



   protected getDetailUrl() : string
   {
       return "http://api.youhoox.com/cfmj.new.serial.php?serial=" ;
   }

   reqDetail( pret : ()=>void )
   {
       if ( this.vDetailEntrys.length != 0 )
       {
           pret();
           return ;
       }

       let url = this.getDetailUrl() + this.sieralNum ;
       var xhr = new XMLHttpRequest();
       let self = this ;
       xhr.onreadystatechange = function () {
           if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
               var response = xhr.responseText;
               console.log(response);
               let js : Object[] = JSON.parse(response) ;
               if ( js == null )
               {
                   Prompt.promptText("获取战绩详情失败");
               }
               else
               {
                   let idx = 0 ;
                   for ( let v of js )
                   {
                       let pItem = new RecorderRoomDetailEntryHY(); 
                       pItem.parseJs(v);
                       pItem.idx = idx++ ;
                       pItem.totalCnt = js.length ;
                       self.vDetailEntrys.push(pItem);
                   }
                   //pResultCallBack(self);
                   pret();
               }
           }
       };
       xhr.open("GET", url, true);
       xhr.send();
   }
}

class RecorderRoomDetailEntryHY implements IRecorderItemDataHY
{
    titleDesc : string = "";
    id : number = 0 ;  // when room recorder titem , it is idx , when it is detail item , it is replayID
    vOffsets : RecorderOffset[] = [] ;

    idx : number = 0 ;
    totalCnt : number = 0 ;

    getOffsets() : RecorderOffset[] 
    {
        return this.vOffsets ;
    }

    getDetails() : IRecorderItemDataHY[] 
    {
        return null ;
    }

    parseJs( jsEntry : Object )
    {
        let strTime = jsEntry["time"] ;
        this.id = jsEntry["replayID"] ;
        let vOffset : Object[] = jsEntry["resultDetail"] ;
        for ( let offset of vOffset )
        {
            let of = new RecorderOffset();
            of.uid = offset["uid"] ;
            of.offset = offset["offset"] ;
            this.vOffsets.push(of);
        }

        this.titleDesc = strTime + "    " + "第" + (this.idx + 1 ) + "/" + this.totalCnt + "局  回放码: " + this.id;
    }

    reqDetail( pret : ()=>void )
    {
        pret();
    }
}

export default class DataRecorderHY implements IDlgRecorderDataHY {
    vRoomEntrys : IRecorderItemDataHY[] = [] ;
    pCallBackRecorderRefresh : ()=>void = null ;
    mTimeLocker : TimeLock = new TimeLock(60*5) ;
    mRecorderURL : string = ""; 
    constructor( id : number , isClub : boolean  )
    {
        if ( isClub )
        {
           this.mRecorderURL = "http://api.youhoox.com/cfmj.new.club.php?club_id=" + id ;
        }
       else
        {
            this.mRecorderURL = "http://api.youhoox.com/cfmj.new.uid.php?uid=" + id + "&self=false";
        }
    }

    getRecorderCnt() : number  
    {
        return this.vRoomEntrys.length ;
    }

    getRecorderItemData( idx : number ) : IRecorderItemDataHY 
    {
        return this.vRoomEntrys[idx] ;
    }

    protected parseRecorder( js : Object[] )
    {
        // let maxHoldRecordCnt = ClientApp.getInstance().getConfigMgr().getClientConfig().maxCacheRecorderCnt ;
        // let resultCnt = js.length + this.vRecorder.length ;
        // if ( resultCnt > maxHoldRecordCnt )
        // {
        //     let eraseCnt = ( resultCnt - maxHoldRecordCnt ) ;
        //     eraseCnt = Math.min(this.vRecorder.length , eraseCnt);
        //     while ( eraseCnt-- )
        //     {
        //         this.vRecorder.pop();
        //     }
        // }
        let old = [] ;
        old = old.concat(this.vRoomEntrys) ;
        this.vRoomEntrys.length = 0 ;
        for ( let v of js )
        {
            let sieal = v["sieralNum"];
            let p : RecorderRoomEntryHY = _.find(old, function(o : RecorderRoomEntryHY) { return o.sieralNum == sieal; } );
            if ( p != null )
            {
                this.vRoomEntrys.push(p);
                continue ;
            }

            p = new RecorderRoomEntryHY();
            p.parseJs(v);
            this.vRoomEntrys.push(p);
            // if ( sieal <= this.nCacherMaxSerialNum )
            // {
            //     continue ;
            // }

            // if ( sieal > this.nCacherMaxSerialNum  )
            // {
            //     this.nCacherMaxSerialNum = sieal ;
            // }

            // let p = this.createRoomEnter();
            // p.parseData(v);
            // this.vRecorder.unshift(p);
            
        }
    }

    reqRcorderData( pret : ()=>void ) : void 
    {
        this.pCallBackRecorderRefresh = pret ;
        if ( this.mTimeLocker.isLocking )
        {
            this.pCallBackRecorderRefresh();
            return ;
        }
        
        if ( this.mRecorderURL.length < 3 )
        {
            console.error("recorder url is null");
            return ;
        }

        this.mTimeLocker.lock();
        //let url = "" ;
       // if ( this.getClub().isSelfPlayerMgr() )
        //{
           // url = "http://api.youhoox.com/cfmj.new.club.php?club_id="+this.getClub().clubID ;
        //}
       // else
        //{
            //url = "http://api.youhoox.com/cfmj.new.uid.php?uid=" + this.nOwnerID + "&self=false";
       // }
        let self = this ;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log(response);
                let js : Object[] = JSON.parse(response) ;
                if ( js == null )
                {
                    Prompt.promptText( "获取战绩失败" );
                }
                else
                {
                    self.parseRecorder(js);
                    if ( null != self.pCallBackRecorderRefresh )
                    {
                        self.pCallBackRecorderRefresh();
                    }
                }
            }
        };
        xhr.open("GET", this.mRecorderURL, true);
        xhr.send();
    }

    leaveRecorderDlg() : void 
    {
        this.pCallBackRecorderRefresh = null ;
    }
}
