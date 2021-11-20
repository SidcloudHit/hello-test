package login;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//import Connection.ConnectionMaker;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Ashim
 */
public class login_slvt extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.setContentType("text/html;charset=UTF-8");
            PrintWriter out = response.getWriter();
            HttpSession session = request.getSession();
            login.clientPlatFormDetection browserDetails = new clientPlatFormDetection(request.getHeader("User-Agent"));
            String randomHash = new login.generateHash().getHashKey();

            String rnd = "";
/*
            if (session.getAttribute("page_random") != null) {
                rnd = (String) session.getAttribute("page_random");
                if (rnd.equals(session.getAttribute("page_random")) == false) {
                    response.sendRedirect("login.jsp?ERR=04");
                    return;
                }

            } else {
                response.sendRedirect("login.jsp?ERR=04");
                return;
            }

            if (session.getAttribute("page_random") != null) {
                rnd = (String) session.getAttribute("page_random");
                if (rnd.length() < 1) {
                    response.sendRedirect("login.jsp?ERR=04");
                    return;

                }

            }
            */

            if (request.getParameter("signin") != null) {
                String uname = null, pwd = null;

                String[] strUrl = new String[]{"index.jsp", "login.jsp"};
/*
                String key1 = "a", key2 = "b";
                if (request.getParameter("inputCap") != null) {
                    key1 = Security.stripXSS(request.getParameter("inputCap"));
                    key2 = session.getAttribute("key").toString().trim();
                }

    */
              //  if (key1.equals(key2)) {
                    if (request.getParameter("inputUser") != null) {
                        uname = Security.stripXSS(request.getParameter("inputUser"));

                        if (request.getParameter("hash") != null) {

                            if (request.getParameter("hash") != null) {
                                pwd = Security.stripXSS((String) request.getParameter("hash"));
                            }

                            if (session.getAttribute("page_random") != null) {
                                rnd = (String) session.getAttribute("page_random");

                            }

                            login.mas_user usr = null;
                            usr = new login.mas_user(uname, pwd, rnd);
                            if (usr.getIsvarified() == 1) {
                                if (usr.getUsername() != null) {
                                    if (session.getAttribute("username") == null)
                                    {
                                    session.setAttribute("username", usr.getUsername());
                                    }
                                }
                                String tokenName = new common().getInfoFromConfig();
                                String tokenValue = (String) session.getAttribute(tokenName);

                                if ((tokenName != null && tokenName.length() > 0) && (tokenValue != null && tokenValue.length() > 0)) {
                                   // response.sendRedirect(strUrl[0] + "?" + tokenName + "=" + tokenValue);
                                    out.print(strUrl[0] + "?" + tokenName + "=" + tokenValue);
                                } else {

                                    //response.sendRedirect(strUrl[1] + "?ERR=03");
                                    
                                    out.print(strUrl[1] + "?ERR=03");
                                }

                                //response.sendRedirect("index.jsp");
                            } else {
                              //  response.sendRedirect(strUrl[1] + "?ERR=03");
                                out.print(strUrl[1] + "?ERR=03");
                            }

                        } else {
                            //response.sendRedirect(strUrl[1] + "?ERR=02");
                            out.print(strUrl[1] + "?ERR=02");
                        }
                    } else {
                     //   response.sendRedirect(strUrl[1] + "?ERR=01");
                        out.print(strUrl[1] + "?ERR=01");
                    }
               // } else {
                //    response.sendRedirect(strUrl[1] + "?ERR=04");
               // }
            }
        } catch (Throwable t) {
            t.getMessage();
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            processRequest(request, response);
        } catch (Throwable t) {
            t.getMessage();
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            processRequest(request, response);
        } catch (Throwable t) {
            t.getMessage();
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
