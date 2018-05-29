package com.example.mzr.webview;

import android.net.Uri;
import android.util.Log;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.net.URL;
import java.net.URLDecoder;

/**
 * Created by mzr on 2018/5/25.
 */

public class MyWebViewClient extends WebViewClient {

    private static final String  APP_SCHEMA = "mzrapp";

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {


//            //在这个里面对url做特殊的处理
            Uri url = request.getUrl();
//
//            Log.i("url地址为", ""+url);

            if(url.toString().startsWith(APP_SCHEMA)) {

                Log.i("url地址为", url.toString());
//                Toast.makeText(super , "你好啊",  Toast.LENGTH_SHORT).show();
                return true;
            }

            return false;
    }



}
