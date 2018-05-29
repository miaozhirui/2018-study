package com.example.mzr.webview;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by mzr on 2018/5/25.
 */

public class WebAppInterface {
    Context mContext;

    WebAppInterface(Context c){

        mContext = c;
    }

    @JavascriptInterface
    public void showToast(String toast) {

        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }
}
