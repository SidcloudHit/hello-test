<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 <%@ taglib uri="http://www.owasp.org/index.php/Category:OWASP_CSRFGuard_Project/Owasp.CsrfGuard.tld" prefix="csrf" %>   
  <%@page import="login.common"%>
<%@page import="login.generateHash"%>  
<!DOCTYPE html>
<html lang="en" class="h-100">
<head>
<meta charset="ISO-8859-1">
 <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Login Page</title>
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="./images/favicon.png">
    <link href="./css/style.css" rel="stylesheet">
 <script language="Javascript" src="js/sec.js" type="text/javascript"></script>
        <SCRIPT LANGUAGE="JavaScript">

            function randomString() {
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                var string_length = 25;
                var randomstring = '';
                for (var i = 0; i < string_length; i++) {
                    var rnum = Math.floor(cryptoRand() * chars.length);
                    randomstring += chars.substring(rnum, rnum + 1);
                }
                document.getElementById("inputPassword").value = randomstring;
            }
            
      function cryptoRand()
                {
    const randomBuffer = new Uint32Array(1);
    (window.crypto || window.msCrypto).getRandomValues(randomBuffer);
    return ( randomBuffer[0] / (0xffffffff + 1) );
} 

        </script>
        <%
//Back to login page if session expired
response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
response.addHeader("Cache-Control", "post-check=0, pre-check=0");
response.setHeader("Pragma", "no-cache");
response.setHeader("Expires", "0");
response.setDateHeader("Expires", -1);
session.removeAttribute("username");




%>
        <%
            String conpath = request.getContextPath();
            int ranInt = 0;
            String ran = "";
            try {
                //ranInt = (int) (Math.random() * 10000000);
                ranInt =common.generateRandom();
                //ran = common.getMd5String(String.valueOf(ranInt));
                ran = common.doHash(String.valueOf(ranInt));
                String SessionToken = "";

                //SessionToken = common.getMd5String(ran);
                SessionToken = common.doHash(String.valueOf(ranInt));
                session.setAttribute("SessionToken", SessionToken);
                session.setAttribute("page_random", ran);

                //session.setAttribute("rval", ran);
            } catch (Exception ex) {
                //    session.setAttribute("rval", 0);
            }

            String err = "";
            int errCode = 0;
            if (request.getParameter("ERR") != null) {
                try {
                    errCode = Integer.parseInt(request.getParameter("ERR"));
                } catch (Exception e) {
                    errCode = 0;
                }
                if (errCode == 1) {
                    err = "Invalid Username";
                } else if (errCode == 2) {
                    err = "Invalid Password";
                } else if (errCode == 3) {
                    err = "Login Failed. Please check your username & password";
                } else if (errCode == 4) {
                    err = "Invalid Captcha";
                } else if (errCode == 5) {
                    err = "Your Password has been expired.";
                }
            }
            generateHash hashObj = new generateHash();
            hashObj.setHashKey();
            String hashKey = hashObj.getHashKey();

        %>
</head>
<body class="h-100" onsubmit="randomString();">




    <div class="authincation h-100">
        <div class="container-fluid h-100">
            <jsp:include page="jsp/header.jsp"></jsp:include>  
            <div class="row justify-content-center  align-items-center">
                
                <div class="col-md-6">
                    <div class="authincation-content">
                        <div class="row no-gutters">
                            <div class="col-xl-12">
                                <div class="auth-form">
                                    <h4 class="text-center mb-4">Please Sign in </h4>
                                    <csrf:form  id="login_frm" method="post" action="login_slvt" autocomplete="none">
                                        <div class="form-group">
                                       <input type="text" style="display:none" name="sys_admin" id="sys_admin" value="0">
            <input  type="text" style="display:none" name="hiddenhos" id="hiddenhos" value="0">
            <input type="text" style="display:none" name="hiddenhosName" id="hiddenhosName" value="">
            <span id="" class="red"><%=err%></span>
             </div>
                                        <div class="form-group">
                                            <label><strong>Email Id</strong></label>
                                            <input type="text" id="inputUser" name="inputUser"  class="form-control" placeholder="Username" autofocus required autocomplete="off" >
                                        </div>
                                        <div class="form-group">
                                            <label><strong>Password</strong></label>
                                           <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Password" required autocomplete="off" onkeydown="if (event.ctrlKey && event.keyCode == 86) {
                        return false;
                    }"> 
                                        </div>
                                      <div class="form-inline">  
                                     <!--   
                                                                             
                                            <div class="form-group mb-2">
                                             
                                                <img id="captcha" src="/Cap_Image" alt="" align="left">
                                            </div>
                                            <div class="form-group mx-sm-3 mb-2">
                                            
                                          <input type="text" id="inputCap" name="inputCap" class="form-control" placeholder="Enter the code exactly as it appears" required  autocomplete="off">
            
                                           
                                           </div>
                                           -->
                                           <input id="hash" name="hash" type="hidden">
                                        </div>                                    

                                         
                                        <div class="form-row d-flex justify-content-between mt-4 mb-2">
                                            <div class="form-group">
                                                <div class="form-check ml-2">
                                                   <!--   <input class="form-check-input" type="checkbox" id="basic_checkbox_1">
                                                    <label class="form-check-label" for="basic_checkbox_1">Remember me</label>-->
                                                </div>
                                            </div>
                                            <div class="form-group">
                                               <!--   <a href="">Forgot Password?</a>-->
                                            </div>
                                        </div>
                                            
                                        <div class="text-center">
                                         <!--<input class="btn btn-primary btn-block" type="submit" value="Submit"/>-->
                                            <!-- <button type="submit" class="btn btn-primary btn-block">Sign me in</button> -->
                                            <button class="btn btn-lg btn-primary btn-block btn-signin" type="button" name="signin" onclick="comHashsha('<%=ran%>','<%=request.getContextPath()%>');">Sign in</button>
                                        </div>
                                   </csrf:form>
                                    <div class="new-account mt-3">
                                       <!--   <p>Don't have an account? <a class="text-primary" href="">Sign up</a></p>-->
                                    </div>
                                    
                                </div>
                              
                            </div>
                        </div>
                       
                    </div>
                </div>
                
            </div>
              <jsp:include page="jsp/footer.jsp"></jsp:include>   
        </div>
    </div>


    <!--**********************************
        Scripts
    ***********************************-->
    <!-- Required vendors -->
    <script src="./vendor/global/global.min.js"></script>
    <script src="./js/quixnav-init.js"></script>
    <script src="./js/custom.min.js"></script>

</body>
</html>