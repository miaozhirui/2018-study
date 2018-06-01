package com.example.mzr.webview;

import android.app.Activity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

public class MainActivity extends Activity {
    private WebView webView;
    private ProgressBar pg1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
    }

    private void initView(){

        //找到元素
        webView = (WebView) findViewById(R.id.webview);
        pg1 = (ProgressBar) findViewById(R.id.progressBar);

        webView.loadUrl("http://www.wangluodaikuankouzi.com/recycling/pages/select-product.html");
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);

        webView.addJavascriptInterface(new WebAppInterface(this), "App");

        webView.clearCache(true);


        webView.setWebViewClient(new MyWebViewClient());

        webView.setWebChromeClient(new WebChromeClient(){

            @Override
            public void onProgressChanged(WebView view, int newProgress) {

                if(newProgress == 100) {

                    pg1.setVisibility(View.GONE);//加载完网页进度条消失
                } else {

                    pg1.setVisibility(View.VISIBLE);//开始加载网页时显示进度条
                    pg1.setProgress(newProgress);//设置进度值
                }
            }
        });


    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {

        if((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack() ) {

            webView.goBack();

            return false;
        }
        return super.onKeyDown(keyCode, event);
    }
}
