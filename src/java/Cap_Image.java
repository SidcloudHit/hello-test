/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import login.common;

/**
 *
 * @author sandeep
 */
public class Cap_Image extends HttpServlet {

    private int height = 0;
    private int width = 0;
    

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) {
        
    OutputStream strm = null;
    BufferedImage cpimg = null;
        try {
            

            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Max-Age", 0);
            HttpSession session = request.getSession(true);

            //Random rdm = new Random();
            //int rl = rdm.nextInt();
            int rl = common.generateRandom();
            String capstr = Integer.toHexString(rl);
            //String capstr = hash1.substring(0, 6);
///// only for security
         /*   if (session.getAttribute("su") != null && session.getAttribute("su").toString().compareTo("y") == 0) {
                capstr = "12345";
            }
*/
            session.setAttribute("key", capstr);

            Color background = new Color(247, 247, 247);

            Color fbl = new Color(0, 100, 0);

            Font fnt = new Font("SansSerif", 1, 20);

            cpimg = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

            Graphics g = cpimg.createGraphics();

            g.setColor(background);

            g.fillRect(0, 0, width, height);

            g.setColor(fbl);

            g.setFont(fnt);

            g.drawString(capstr, 10, 25);

            g.setColor(background);

            g.drawLine(10, 17, 80, 17);

            g.drawLine(10, 22, 80, 22);

            response.setContentType("image/jpeg");

            strm = response.getOutputStream();
            if(strm!=null)
            {
            ImageIO.write(cpimg, "jpeg", strm);
            }
        } catch (Throwable ex) {
            ex.getMessage();
        } finally {
            try {
                strm.close();
                cpimg.flush();
            } catch (IOException ex) {
                Logger.getLogger(Cap_Image.class.getName()).log(Level.FINE, null, ex);
            }
        }
    }

    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        //    height = Integer.parseInt(getServletConfig().getInitParameter("height"));
        //  width = Integer.parseInt(getServletConfig().getInitParameter("width"));
        height = 40;
        width = 100;
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
