package com.example.mzr.network;

import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView textView;
    private Button getButton;
    private Button postButton;
    private EditText nameEditText;
    private EditText psdEditText;

    final int GET  = 123;
    final int POST = 124;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initView();
    }

    private void initView() {

        textView = (TextView) findViewById(R.id.textView);
        getButton = (Button) findViewById(R.id.get);
        postButton = (Button) findViewById(R.id.post);

        getButton.setOnClickListener(this);
        postButton.setOnClickListener(this);

        nameEditText = (EditText) findViewById(R.id.name);
        psdEditText = (EditText) findViewById(R.id.psd);
    }

    @Override
    public void onClick(View v) {

        switch (v.getId()){

            case  R.id.get:
                //必须使用子线程
                new  Thread(new Runnable() {
                    @Override
                    public void run() {
                        String result = HttpUtil.get("http://test.miaozhirui.com/server");

                        Message msg = handler.obtainMessage();
                        msg.what = GET;
                        msg.obj= result;

                        handler.sendMessage(msg);

                        Log.i("result", result);
                    }
                }).start();
                break;
            case R.id.post:
                //必须使用子进程
                new Thread(new Runnable() {
                    @Override
                    public void run() {

                        Map<String, String>map=new HashMap<>();

                        map.put("name", nameEditText.getText().toString());
                        map.put("psd", psdEditText.getText().toString());
                        String result = HttpUtil.post("http://test.miaozhirui.com/postServer", map);

                        Log.i("POSTDATA", result);
                        Message msg = handler.obtainMessage();

                        msg.what = POST;
                        msg.obj = result;
                        handler.sendMessage(msg);
                    }
                }).start();
        }
    }

    private Handler handler = new Handler() {

        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);

            switch (msg.what) {
                case GET:
                    try{

                        String text = (String) msg.obj;
                        JSONObject jsonObject = new JSONObject(text);

                        String data  = jsonObject.getString("data");

                        Log.i("data", data);

                        textView.setText(data);
                    }catch (JSONException e) {

                        e.printStackTrace();
                    }



                    break;
                case POST:
                    Log.i("到这里", "222222");
                    Toast.makeText(MainActivity.this, (String)msg.obj, Toast.LENGTH_LONG).show();
                    break;
            }
        }
    };
}
