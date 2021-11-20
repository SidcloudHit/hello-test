package login;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class fetchRCData
 */
public class fetchRCData extends HttpServlet {

    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public fetchRCData() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     * response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub

        try {

            PrintWriter out = response.getWriter();

            String rcno = request.getParameter("rcno");

            //String rcno = "161000407625";
            callApi api = new callApi();
            String rcjson = api.getRcDetailsAyushmaan(rcno);

            out.println(rcjson);
            //response.sendRedirect(request.getContextPath() + "/index.jsp");
            out.flush();
            out.close();
        } catch (Throwable t) {
            t.getMessage();
        }

    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     * response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub

        try {
            doGet(request, response);
        } catch (Throwable t) {
            t.getMessage();
        }
    }

}
