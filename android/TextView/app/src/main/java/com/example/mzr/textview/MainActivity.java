package com.example.mzr.textview;

import android.graphics.drawable.Drawable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Html;
import android.text.method.LinkMovementMethod;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    private TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //===================设置背景图片
//        textView = (TextView) findViewById(R.id.textview1);
//
//        Drawable [] drawables = textView.getCompoundDrawables();
//
//        //数组下标0~3，依次是:左上右下
//        drawables[1].setBounds(0, 0, 200, 200);
//        textView.setCompoundDrawables(drawables[0], drawables[1], drawables[2], drawables[3]);

        //====================设置图片链接
//        textView = (TextView) findViewById(R.id.textView1);
//        String s1 = "<font color='blue'><b>百度一下你就知道~</b></font><br>";
//        s1 += "<a href='http://www.baidu.com'>百度</a>";
//
//        textView.setText(Html.fromHtml(s1));
//        textView.setMovementMethod(LinkMovementMethod.getInstance());
    }
}
