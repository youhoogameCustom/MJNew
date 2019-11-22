package com.youhoo.cfmajiang.wxapi;
import android.app.Activity;
import android.content.Intent;

import android.os.Bundle;
import android.util.Log;
import com.youhoo.cfmajiang.WechatManager;


public class WXEntryActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("ceshi 一些", "chuangjian weixin activity");
        try {
            Intent intent = getIntent();
            onNewIntent(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        Log.d("ceshi 一些", "onNewIntent: 这里获得intent");
        WechatManager.getInstance().onNewIntent(intent);
        finish();
    }

    @Override
    protected void onPause() {
        super.onPause();

    }

    @Override
    protected void onResume() {
        super.onResume();

    }
//    // call back
//    public void onReq(BaseReq var1)
//    {
//        Log.d("b", "onNewIntent: onReq 响应");
//    }
//
//    public void onResp(BaseResp var1)
//    {
//        Log.d("a", "onNewIntent: onResp 响应");
//        SendAuth.Resp resp = (SendAuth.Resp)var1 ;
//        JSONObject jsObj = new JSONObject();
//        try {
//            jsObj.put("errorCode",resp.errCode );
//            if ( 0 == resp.errCode )
//            {
//                Log.d("onResp", "onResp: 获取授权码成功 = " + resp.code);
//                jsObj.put("code",resp.code ) ;
//            }
//            else
//            {
//                Log.e("onResp", "onResp: 获取授权码失败：" + resp.errStr + "errorcode = " + resp.errCode );
//            }
//        }
//        catch ( JSONException je )
//        {
//            System.out.println( "json exception = " + je.getMessage() );
//        }
//        WechatManager.getInstance().sendJsEvent("EVENT_WECHAT_CODE", jsObj );
//    }
}
