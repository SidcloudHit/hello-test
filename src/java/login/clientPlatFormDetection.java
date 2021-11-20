/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package login;

/**
 *
 * @author sandeep
 */
public class clientPlatFormDetection {

    private String userAgent, browserName, browserVer, osname;

    public clientPlatFormDetection(String userAgent) {
        this.userAgent = userAgent;
        process();
    }

    private void process() {
        browserName = "unknown";
        browserVer = "unknown";
        osname = "unknown";
        if (userAgent.contains("Chrome")) { //checking if Chrome
            String substring = userAgent.substring(userAgent.indexOf("Chrome")).split(" ")[0];
            browserName = substring.split("/")[0];
            browserVer = substring.split("/")[1];
        } else if (userAgent.contains("Firefox")) {  //Checking if Firefox
            String substring = userAgent.substring(userAgent.indexOf("Firefox")).split(" ")[0];
            browserName = substring.split("/")[0];
            browserVer = substring.split("/")[1];
        } else if (userAgent.contains("MSIE")) { //Checking if Internet Explorer
            String substring = userAgent.substring(userAgent.indexOf("MSIE")).split(";")[0];
            browserName = substring.split(" ")[0];
            browserVer = substring.split(" ")[1];
        } else if (userAgent.contains("rv")) { //checking if Internet Explorer 11
            String substring = userAgent.substring(userAgent.indexOf("rv"), userAgent.indexOf(")"));
            browserName = "IE";
            browserVer = substring.split(":")[1];
        }

        if (userAgent.toLowerCase().indexOf("windows") >= 0) { // Checking if windows
            osname = "Windows";
        } else if (userAgent.toLowerCase().indexOf("mac") >= 0) { // cChecking if MAC
            osname = "Mac";
        } else if (userAgent.toLowerCase().indexOf("x11") >= 0) { // Checking if Unix/ Linux
            osname = "Unix";
        } else if (userAgent.toLowerCase().indexOf("android") >= 0) { // Chcking if android 
            osname = "Android";
        } else if (userAgent.toLowerCase().indexOf("iphone") >= 0) { // Checking if iphone
            osname = "IPhone";
        } else {
            osname = "UnKnown, More-Info: " + userAgent; // unknown
        }

    }

    public String getName() {
        return browserName; //returning browser name
    }

    public String getVersion() {
        return browserVer;  //returning browser version
    }

    public String getOsName() { //returning OS name
        return osname;
    }
}
