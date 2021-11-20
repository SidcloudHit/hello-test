/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package login;

//import Connection.ConnectionMaker;
import java.sql.CallableStatement;
import java.sql.SQLException;
import java.sql.Types;
import org.apache.commons.codec.digest.DigestUtils;

/**
 *
 * @author Debasish
 */
public class mas_user extends login.mas_user_data {

    public mas_user() {
    }

    public mas_user(String username, String pwd, String ranno) {

        java.sql.Connection cnn = null;
        CallableStatement cs = null;
        String dbresult =null;
        this.setIsvarified(0);

        try {

            cnn = new connector.conn.db.DBSource().connectToSAS().getConnection();
            // cnn.setAutoCommit(false);
            cs = cnn.prepareCall("{ call user_login(?,?,?,?) }");
            int out_result;
            int count = 1;
            cs.setString(count, ranno);
            count++;
            cs.setString(count, username);
            count++;
            cs.setString(count, pwd);
            count++;
            cs.registerOutParameter(count, Types.VARCHAR);
            out_result = count;
            cs.execute();
            dbresult = Security.stripXSS(cs.getString(out_result));
           // dbresult = cs.getString(out_result);
            String result = null;
            if (dbresult != null) {
                if (dbresult.contains(",")) {
                    String[] resultArray = dbresult.split(",");
                    result = resultArray[0];
                    this.setUsername(resultArray[1]);
                    if (result != null) {
                        if (pwd.length() > 50) {
                            result = DigestUtils.sha256Hex(result);
                           
                        }
                        if (result.equalsIgnoreCase(pwd) == true) {
                            this.setIsvarified(1);

                        }
                    }
                } else {
                    this.setIsvarified(0);
                }
            } else {
                this.setIsvarified(0);
            }

        } catch (SQLException ex) {
            //ex.printStackTrace();
            ex.getMessage();
        } finally {

            try {
                if (cs != null) {
                    cs.close();
                    cs = null;
                }
                if (cnn != null) {
                    cnn.close();
                    cnn = null;
                }
            } catch (SQLException ex) {
            }

            //  c = null;
        }

    }
}
