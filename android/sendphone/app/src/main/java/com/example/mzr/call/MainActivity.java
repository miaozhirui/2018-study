package com.example.mzr.call;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.PermissionChecker;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.net.URI;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private EditText number;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initView();
    }

    private void initView() {

        final EditText number = (EditText) findViewById(R.id.phone_number);
        Button button = (Button) findViewById(R.id.button);

//        button.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//
//                Intent callint = new Intent(Intent.ACTION_DIAL);
//
//                Uri data = Uri.parse("tel:"+number.getText().toString());
//
//                callint.setData(data);
//                startActivity(callint);
//            }
//        });
        button.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {

//            final EditText number = (EditText) findViewById(R.id.phone_number);
            number = (EditText) findViewById(R.id.phone_number);
            Button button = (Button) findViewById(R.id.button);

            //这种方式拨号是需要用户手动点击触发拨打按钮的
//            Intent callint = new Intent(Intent.ACTION_DIAL);
//            Intent callint = new Intent(Intent.ACTION_CALL);
//
//            Uri data = Uri.parse("tel:"+number.getText().toString());
//
//            callint.setData(data);
//            startActivity(callint);
        getPermission();
            //获取权限

    }

    public void getPermission() {

//        if(Build.VERSION.SDK_INT)
//        Log.v("version",""+ Build.VERSION.SDK_INT);
        if(Build.VERSION.SDK_INT >= 23) {

            int checkCALLPermission = ContextCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE);

            //判断是否有权限
            if(checkCALLPermission != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CALL_PHONE}, 1);

                return;
            } else {

                //如果已经获取了相关权限，调用initData()与initView方法
                callPhone();
            }
        } else {

            //如果版本低于23, 直接initData和initView
            callPhone();
        }
    }

    //申请权限做出响应之后的回调函数


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {

        Log.d("code",""+requestCode);

        switch (requestCode){

            case 1:

                    if(grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                        Toast.makeText(this, "获取权限成功", Toast.LENGTH_SHORT).show();

                        //获取权限成功，拨打电话
                        callPhone();
                    } else {

                        Toast.makeText(this, "获取权限失败", Toast.LENGTH_SHORT).show();
                    }
                break;
            default:

                super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }

    }

    private void callPhone(){

            Intent callint = new Intent(Intent.ACTION_CALL);

            Uri data = Uri.parse("tel:"+number.getText().toString());

            callint.setData(data);

            startActivity(callint);
    }
}
