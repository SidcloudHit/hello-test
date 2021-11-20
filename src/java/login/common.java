package login;

import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Properties;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author Ashim
 */
public class common {

    /* //public static String password_security_token = "nic@sas#agartala";
    public static String getMd5String(String token) {
        MessageDigest m;
        String contentTypeHex = "";
        try {
            m = MessageDigest.getInstance("MD5");
            m.update(token.getBytes(), 0, token.length());
            contentTypeHex = new BigInteger(1, m.digest()).toString(16);

            while (contentTypeHex.length() < 32) {
                contentTypeHex = "0" + contentTypeHex;
            }

        } catch (NoSuchAlgorithmException ex) {

        }
        return contentTypeHex;
    }

   public String MD5Hash(String str) {
        String passwordToHash = str;
        String generatedPassword = null;
        try {
            // Create MessageDigest instance for MD5
            MessageDigest md = MessageDigest.getInstance("MD5");
            //Add password bytes to digest
            md.update(passwordToHash.getBytes());
            //Get the hash's bytes
            byte[] bytes = md.digest();
            //This bytes[] has bytes in decimal format;
            //Convert it to hexadecimal format
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            //Get complete hashed password in hex format
            generatedPassword = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } 
            return generatedPassword;
        

    }
    */

    public String getInfoFromConfig() {
        Properties prop = new Properties();
        InputStream inputStream = null;
        String tokenName = "";
        try {
            inputStream = this.getClass().getClassLoader().getResourceAsStream("Owasp.CsrfGuard.properties");
            if(inputStream!=null)
            {
            prop.load(inputStream);
            tokenName = Security.stripXSS(prop.getProperty("org.owasp.csrfguard.TokenName"));
            if (tokenName==null){
            tokenName="";  
            
            }
            }
           
            //System.out.println("TokenName :"+prop.getProperty("org.owasp.csrfguard.TokenName"));

        } catch (IOException ex) {
            //ex.printStackTrace();
            ex.getMessage();
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                   // e.printStackTrace();
                    e.getMessage();
                }
            }
        }
        return tokenName;

    }

    public static int generateRandom() {
        int ranInt = 0;
        SecureRandom srnd = new java.security.SecureRandom();
        ranInt = srnd.nextInt(1000000);
        return ranInt;
    }
    
    public static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte byt : bytes) {
            result.append(Integer.toString((byt & 0xff) + 0x100, 16).substring(1));
        }
        return result.toString();
    }
    
    
    public static String doHash(String data) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(data.getBytes());
        return bytesToHex(md.digest());
    }
}
