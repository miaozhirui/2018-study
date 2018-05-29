package com.example.mzr.network;

import android.util.Log;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

/**
 * Created by mzr on 2018/5/29.
 */

public class HttpUtil {

    /**
     * get 请求
     * @param ip
     * @return
     */
    public static String get(String ip) {

        String result = "";
        HttpURLConnection conn = null;
        BufferedReader in = null;

        try{

            URL url = new URL(ip);
            //得到HttpURLConnection 实例化对象
            conn = (HttpURLConnection) url.openConnection();

            //设置请求方法
            conn.setRequestMethod("GET");
            //conn.setRequestProperty("encoding", "UTF-8");//可以指定编码

            //设置响应时间
            conn.setConnectTimeout(5000);
            //不适用缓存
            conn.setUseCaches(false);

            //读取响应
            if(conn.getResponseCode() == 200) {

                in = new BufferedReader(new InputStreamReader(conn.getInputStream()));

                String line;

                while ((line = in.readLine()) != null) {

                    result += "/n" + line;
                }
            } else {

                Log.i("connect", "请求失败");
            }


        }catch (Exception e) {

            e.printStackTrace();
        } finally {

            if( in != null) {

                try {
                    in.close();
                }catch (IOException e) {

                    e.printStackTrace();
                }
            }

            if(conn != null ) {

                conn.disconnect();
            }
        }

        return result;
    }

    public static String post(String url, Map<String, String> map){

        PrintWriter out = null;
        BufferedReader in = null;

        String result = "";
        HttpURLConnection conn = null;

        try{

            URL realUrl = new URL(url);

            //打开和URL之间的连接
            conn = (HttpURLConnection) realUrl.openConnection();
            //设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent", "Mozilla/4.0");

            //发送post请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            //获取URLConnection 对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            String data = "";

            for(Map.Entry<String,String>entry:map.entrySet()){

                data += entry.getKey() + "=" + entry.getValue()+"&";
            }

            //发送请求参数
            out.print(data);
            //flush输出流的缓冲
            out.flush();

            //定义BufferedReader 输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line;
            while ((line = in.readLine()) != null) {

                result += line;
            }
        } catch (Exception e) {

            System.out.println("发送post请求出现异常！" + e);
            e.printStackTrace();
        }


        return result;
    }
}
