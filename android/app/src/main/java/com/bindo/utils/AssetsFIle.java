package com.bindo.utils;

import android.app.Activity;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.zip.CRC32;

public class AssetsFIle {
    public static String getFromAssets(Activity activity, String fileName) {
        try {
            InputStreamReader inputReader = new InputStreamReader(activity.getApplicationContext().getResources().getAssets().open(fileName));
            BufferedReader bufReader = new BufferedReader(inputReader);
            String line = "";
            StringBuffer Result = new StringBuffer();
            while ((line = bufReader.readLine()) != null)
                Result.append(line);
            return Result.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    //带有缓冲读取文件
    public static long checkSumBufferedInputStream(String filename) throws FileNotFoundException {
        File file = new File(filename);
        try (FileInputStream in = new FileInputStream(file)) {
            CRC32 crc = new CRC32();
            int c;
            while ((c = in.read()) != -1) {
                crc.update(c);
            }
            return crc.getValue();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return 0;
    }

}
