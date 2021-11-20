<%@page import="login.Security"%>
<%@page import="login.common"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.owasp.org/index.php/Category:OWASP_CSRFGuard_Project/Owasp.CsrfGuard.tld" prefix="csrf" %>  

<!DOCTYPE html>
<html>
    <head>
        <meta charset="ISO-8859-1">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">


        <title> </title>
        <!-- Favicon icon -->
        <link rel="icon" type="image/png" sizes="16x16" href="./images/favicon.png">
        <link rel="stylesheet" href="./vendor/select2/css/select2.min.css">
        <link href="./css/style.css" rel="stylesheet">

        <meta name="_csrf_header" content="<csrf:tokenname/>"/> 
        <meta name="_csrf" content="<csrf:tokenvalue/>"/>

        <link rel="stylesheet" type="text/css" href="./css/datatables.min.css"/>
        <%
//Back to login page if session expired
            response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            response.addHeader("Cache-Control", "post-check=0, pre-check=0");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Expires", "0");
            response.setDateHeader("Expires", -1);


        %>
        <!-- <script src="<%=request.getContextPath()%>/JavaScriptServlet"></script> -->

        <%
            String username = "";
            if (session.getAttribute("username") != null) {
                username = Security.stripXSS((String) session.getAttribute("username"));
            } else {
                response.sendRedirect("login.jsp");
            }
        %>
    </head>
    <body>






        <!--*******************
            Preloader start
        ********************-->
        <div id="preloader">
            <div class="sk-three-bounce">
                <div class="sk-child sk-bounce1"></div>
                <div class="sk-child sk-bounce2"></div>
                <div class="sk-child sk-bounce3"></div>
            </div>
        </div>
        <!--*******************
            Preloader end
        ********************-->


        <!--**********************************
            Main wrapper start
        ***********************************-->
        <div id="main-wrapper">

            <!--**********************************
                Nav header start
            ***********************************-->
            <div class="nav-header">
                <a href="" class="brand-logo">
                    <img class="logo-abbr" src="./images/logo.png" alt="">
                    <img class="logo-compact" src="./images/logo-text.png" alt="">
                    <img class="brand-title" src="./images/logo-text.png" alt="">
                </a>

                <div class="nav-control">
                    <div class="hamburger">
                        <span class="line"></span><span class="line"></span><span class="line"></span>
                    </div>
                </div>
            </div>

            <!--**********************************
                Nav header end
            ***********************************-->

            <!--**********************************
                Header start
            ***********************************-->
            <div class="header">
                <div class="header-content">
                    <nav class="navbar navbar-expand">
                        <div class="collapse navbar-collapse justify-content-between">
                            <div class="header-left">
                                <!-- <div class="search_bar dropdown">
                                     <span class="search_icon p-3 c-pointer" data-toggle="dropdown">
                                         <i class="mdi mdi-magnify"></i>
                                     </span>
                                     <div class="dropdown-menu p-0 m-0">
                                         <form>
                                             <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                                         </form>
                                     </div>
                                 </div>-->
                            </div>

                            <ul class="navbar-nav header-right">
                                <!--<li class="nav-item dropdown notification_dropdown">
                                    <a class="nav-link" href="#" role="button" data-toggle="dropdown">
                                        <i class="mdi mdi-bell"></i>
                                        <div class="pulse-css"></div>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <ul class="list-unstyled">
                                            <li class="media dropdown-item">
                                                <span class="success"><i class="ti-user"></i></span>
                                                <div class="media-body">
                                                    <a href="#">
                                                        <p><strong>Martin</strong> has added a <strong>customer</strong> Successfully
                                                        </p>
                                                    </a>
                                                </div>
                                                <span class="notify-time">3:20 am</span>
                                            </li>
                                            <li class="media dropdown-item">
                                                <span class="primary"><i class="ti-shopping-cart"></i></span>
                                                <div class="media-body">
                                                    <a href="#">
                                                        <p><strong>Jennifer</strong> purchased Light Dashboard 2.0.</p>
                                                    </a>
                                                </div>
                                                <span class="notify-time">3:20 am</span>
                                            </li>
                                            <li class="media dropdown-item">
                                                <span class="danger"><i class="ti-bookmark"></i></span>
                                                <div class="media-body">
                                                    <a href="#">
                                                        <p><strong>Robin</strong> marked a <strong>ticket</strong> as unsolved.
                                                        </p>
                                                    </a>
                                                </div>
                                                <span class="notify-time">3:20 am</span>
                                            </li>
                                            <li class="media dropdown-item">
                                                <span class="primary"><i class="ti-heart"></i></span>
                                                <div class="media-body">
                                                    <a href="#">
                                                        <p><strong>David</strong> purchased Light Dashboard 1.0.</p>
                                                    </a>
                                                </div>
                                                <span class="notify-time">3:20 am</span>
                                            </li>
                                            <li class="media dropdown-item">
                                                <span class="success"><i class="ti-image"></i></span>
                                                <div class="media-body">
                                                    <a href="#">
                                                        <p><strong> James.</strong> has added a<strong>customer</strong> Successfully
                                                        </p>
                                                    </a>
                                                </div>
                                                <span class="notify-time">3:20 am</span>
                                            </li>
                                        </ul>
                                        <a class="all-notification" href="#">See all notifications <i
                                                class="ti-arrow-right"></i></a>
                                    </div>
                                </li>-->
                                <li class="nav-item dropdown header-profile">
                                    <a class="nav-link" href="#" role="button" data-toggle="dropdown">
                                        <i class="mdi mdi-account"><%=username%></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <!--<a href="./app-profile.html" class="dropdown-item">
                                            <i class="icon-user"></i>
                                            <span class="ml-2">Profile </span>
                                        </a>-->

                                        <a href="<%=request.getContextPath()%>/login.jsp" class="dropdown-item">
                                            <i class="icon-key"></i>
                                            <span class="ml-2">Logout </span>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <!--**********************************
                Header end ti-comment-alt
            ***********************************-->

            <!--**********************************
                Sidebar start
            ***********************************-->
            <div class="quixnav">
                <div class="quixnav-scroll">
                    <ul class="metismenu" id="menu">
                        <!--<li class="nav-label first">Main Menu</li> -->
                        <!-- <li><a href="index.html"><i class="icon icon-single-04"></i><span class="nav-text">Dashboard</span></a>
                        </li> -->
                        <!--<li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
                                    class="icon icon-single-04"></i><span class="nav-text">Dashboard</span></a>
                            <ul aria-expanded="false">
                                <li><a href="#">Dashboard 1</a></li>
                                <li><a href="#">Dashboard 2</a></li></ul>
                        </li>-->









                        <!--  <li class="nav-label">Forms</li>-->
                        <li><a class="has-arrow" href="javascript:void()" aria-expanded="false"><i
                                    class="icon icon-form"></i><span class="nav-text">Forms</span></a>
                            <ul aria-expanded="false">
                                <!-- <li><a href="./index.jsp">Entry</a></li> -->
                            </ul>
                        </li>




                    </ul>
                </div>
            </div>
            <!--**********************************
                Sidebar end
            ***********************************-->

            <!--**********************************
                Content body start
            ***********************************-->
            <div class="content-body">
                <div class="container-fluid">

                    <section id="main-content">





                        <!-- /# row -->
                        <!--<div class="row">
                          <div class="col-lg-12">
                              <div class="card">
                                  <div class="card-title">
                                      <h4></h4>
                                      
                                  </div>
                                  <div class="card-body">
                                      <div class="basic-elements">
                                          <form>
                                              <div class="row">
                                                  <div class="col-lg-4">
                                                       <div class="form-group">
                                                          <label>District</label>
                                                          <select class="js-data-example-ajax w-100">
  
                                                           </select>
                                                      </div>
                                                                                                           <div class="form-group">
                                                          <label>Gram Panchayat/ MC Ward </label>
                                                           <select class="js-data-example-ajax w-100">
  
                                                           </select>
                                                      </div>
  
                                                  </div>
                                                  <div class="col-lg-4">
                                                      
                                                      
                                                      <div class="form-group">
                                                          <label>Sub-Division</label>
                                                           <select class="js-data-example-ajax w-100">
  
                                                           </select>
                                                      </div>
                                                                                                          
                                                                                                          <div class="form-group">
                                                          <label>PIN</label>
                                                          <input type="text" class="form-control" value="">
                                                      </div>
                                                      
                                                  </div>
                                                                                                  
                                                                                                  
                                                                                                  <div class="col-lg-4">
                                                     
                                                      
                                                      <div class="form-group">
                                                          <label>Block/ MC</label>
                                                           <select class="js-data-example-ajax w-100">
  
                                                           </select>
                                                      </div>
                                                                                                          
                                                                                                           <div class="form-group">
                                                          <label>Landmark/ Para/Road No.</label>
                                                         <input type="text" class="form-control" value="">
                                                      </div>
                                                      
                                                  </div>
                                                                                                  
                                                                                                  
                                              </div>
                                          </form>
                                      </div>
                                  </div>
                              </div>
                          </div>
                         
                          
                         
                      </div> -->
                        <!-- /# row -->


                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-title">
                                        <h4></h4>

                                    </div>
                                    <div class="card-body">
                                        <div class="basic-elements">
                                            <form action = "fetchrcdata" method = "POST">
                                                <div class="row">
                                                    <div class="col-lg-3">
                                                        <div class="form-group">

                                                            <label>Enter Ration Card No.</label>

                                                        </div>   

                                                    </div>
                                                    <div class="col-lg-5">
                                                        <div class="form-group">  
                                                            <input type="text" class="form-control" value="" id="rcno" name="rcno">  

                                                        </div>  

                                                    </div>


                                                    <div class="col-lg-4">

                                                        <div class="form-group"> 
                                                            <button type="button" class="btn btn-success" id="buttonSubmit">Submit</button>  
                                                        </div>
                                                    </div>


                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <!-- /# column -->
                        </div>


                        <div class="row" id="onloadhide">
                            <div class="col-lg-12">
                                <div class="card">

                                    <div class="card-header">
                                        <h4 class="card-title">Ration Card No. :</h4>
                                    </div>

                                    <div class="card-body" >

                                        <div class="table-responsive"  >
                                            <table class="table table-striped table-hover table-bordered" id="example" >
                                                <thead>
                                                    <tr>
                                                        <!--  <th>Sl</th>-->
                                                        <th>Name</th>
                                                        <th>Member Id</th>

                                                        <th>Select</th>

                                                    </tr>
                                                </thead>
                                                <!--  <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td></td>
                                                        <td></td>
                                                        <td><input type="checkbox"></td>
                                                       
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td></td>
                                                        <td></td>
                                                        <td><input type="checkbox"></td>
                                                       
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td></td>
                                                        <td></td>
                                                        <td><input type="checkbox"></td>
                                                       
                                                    </tr>
                                                </tbody>--> 

                                            </table>
                                        </div>


                                        <div class="card-title">
                                            <h4> </h4>

                                        </div>  


                                        <div class="basic-elements">
                                            <form>
                                                <div class="row">
                                                    <div class="col-lg-3">
                                                        <div class="form-group">
                                                            <label>Enter Aadhaar No.</label>

                                                        </div>   

                                                    </div>
                                                    <div class="col-lg-5">
                                                        <div class="form-group">  
                                                            <input type="text" class="form-control" id="putaadhaar" maxlength="12" >  
                                                        </div> 


                                                    </div>


                                                    <div class="col-lg-4">

                                                        <div class="form-group"> 
                                                            <button type="button" class="btn btn-success" onclick="showKyc()">eKYC</button>  
                                                        </div>
                                                    </div>


                                                </div>
                                            </form>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>





                        <!--<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                <h4 class="card-title">Name:</h4>
            </div>
                <div class="card-body">
                    <div class="basic-elements">
                        <form>
                            <div class="row">
                                 <div class="col-lg-3">
                                 <div class="form-group">
                                  <label>Gender </label>
                               
                                 </div>  
                                 <div class="form-group">
                                  <label>DOB </label>
                               
                                 </div>
                                  <div class="form-group">
                                  <label>Enter Mobile No  </label>
                               
                                 </div>	
                                                                                                                                 
                                                                                 

                                </div>
                                <div class="col-lg-5">
                                   <div class="form-group">  
                                     <input type="text" class="form-control" value="">  
                                   </div>  
                                                                                   <div class="form-group">  
                                     <input type="text" class="form-control" value="">  
                                   </div>  
                                                                                   <div class="form-group">  
                                     <input type="text" class="form-control" value="">  
                                   </div>  
                                                                                    <div class="form-group"> 
                                      <button type="submit" class="btn btn-success">Submit</button>  
                                  </div>
                                    
                                </div>
                                                                                
                                                                                
                                                                                <div class="col-lg-4">
                                   
                                    <div class="w-50">
                                      <img class="img-fluid img-thumbnail" src="images/profile/profile.png" alt="" />
                                     </div>

                                    
                                </div>
                                                                                
                                                                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
       
        
        
    </div>-->








                        <div class="row">
                            <div class="col-lg-12">
                                <div class="footer">
                                    <p><a href="#"></a></p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <!--**********************************
                Content body end
            ***********************************-->


            <!--**********************************
                Footer start
            ***********************************-->
            <div class="footer">
                <div class="copyright">
                    <p> <a href="#" target="_blank"></a> </p>
                </div>
            </div>
            <!--**********************************
                Footer end
            ***********************************-->

            <!--**********************************
               Support ticket button start
            ***********************************-->

            <!--**********************************
               Support ticket button end
            ***********************************-->


        </div>
        <!--**********************************
            Main wrapper end
        ***********************************-->

        <!--**********************************
            Scripts
        ***********************************-->
        <!-- Required vendors -->

        <script src="./js/jquery-3.6.0.js"></script>


        <script src="./vendor/global/global.min.js"></script>
        <script src="./js/quixnav-init.js"></script>
        <script src="./js/custom.min.js"></script>


        <script src="./vendor/select2/js/select2.full.min.js"></script>
        <script src="./js/plugins-init/select2-init.js"></script>
        
        <script type="text/javascript" src="./js/dataTableMin.js"></script>

        <input type="hidden" name="<csrf:tokenname/>" value="<csrf:tokenvalue/>"/>


        <script>

                                                                var csrfHeader = $("meta[name='_csrf_header']").attr("content");
                                                                var csrfToken = $("meta[name='_csrf']").attr("content");
                                                                var headers = {};
                                                                headers[csrfHeader] = csrfToken;
                                                                $.ajaxSetup({
                                                                    headers: headers
                                                                });
        </script>



        <script type="text/javascript" charset="utf-8">
            $("#onloadhide").hide();
            $('#buttonSubmit').click(function () {
                $("#onloadhide").show();
                var rcno = $('#rcno').val();

                $('#example').DataTable().clear().destroy();
                $('#example').dataTable(
                        {
                            "ajax": {
                                "url": "<%=request.getContextPath()%>/fetchRCData?rcno=" + rcno,
                                "dataSrc": "rcfamily",
                                "type": "GET",
                                "dataType": 'JSON',
                            },
                            "iDisplayLength": 50,
                            'order': [[1, 'asc']],
                            'responsive': true,
                            "columns": [
                                {"data": "rc_member_name"},
                                {"data": "rc_member_id"},
                                {
                                    'data': 'rc_member_id',
                                    'render': function (rc_member_id) {

                                        if (rc_member_id == '') {
                                            return 'dd'
                                        } else {

                                            return '<input type="checkbox" name="getaadhaar" id="getaadhaar" value="' + rc_member_id + '">'
                                        }
                                    }
                                }
]


                        });
            });
            function showKyc()
            {

                alert("Aadhaar e-KYC To Be Done !");
                //document.getElementById('kyc').innerHTML = 'Aadhaar e-KYC To Be Done !';
            }




        </script>







    </body>

</html>