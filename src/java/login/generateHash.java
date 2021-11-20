package login;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import java.math.BigInteger;
import java.security.SecureRandom;

/**
 *
 * @author sandeep
 */
public class generateHash {

    private static String hashKey = "123456789abcd";
    private SecureRandom random = new SecureRandom();
 

    public String getHashKey() {
        return hashKey;
    }

    public void setHashKey() {
        this.hashKey = new BigInteger(130, random).toString(32);
    }

}
