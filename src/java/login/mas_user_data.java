/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package login;

/**
 *
 * @author Debasish
 */
public class mas_user_data {
     int uid;
    String username;
    String pwd;
    String entry_date;
    int entry_by;
    String entry_from;
    int is_expired;
    String expiry_date;
    int employee_id;
   
    int isvarified;
    int sys_user;
    int admin_user;
    int exp_prd;
    private String employee_name;
    private String is_first_login;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getEntry_date() {
        return entry_date;
    }

    public void setEntry_date(String entry_date) {
        this.entry_date = entry_date;
    }

    public int getEntry_by() {
        return entry_by;
    }

    public void setEntry_by(int entry_by) {
        this.entry_by = entry_by;
    }

    public String getEntry_from() {
        return entry_from;
    }

    public void setEntry_from(String entry_from) {
        this.entry_from = entry_from;
    }

    public int getIs_expired() {
        return is_expired;
    }

    public void setIs_expired(int is_expired) {
        this.is_expired = is_expired;
    }

    public String getExpiry_date() {
        return expiry_date;
    }

    public void setExpiry_date(String expiry_date) {
        this.expiry_date = expiry_date;
    }

    public int getEmployee_id() {
        return employee_id;
    }

    public void setEmployee_id(int employee_id) {
        this.employee_id = employee_id;
    }

    public int getIsvarified() {
        return isvarified;
    }

    public void setIsvarified(int isvarified) {
        this.isvarified = isvarified;
    }

    public int getSys_user() {
        return sys_user;
    }

    public void setSys_user(int sys_user) {
        this.sys_user = sys_user;
    }

    public int getAdmin_user() {
        return admin_user;
    }

    public void setAdmin_user(int admin_user) {
        this.admin_user = admin_user;
    }

    public int getExp_prd() {
        return exp_prd;
    }

    public void setExp_prd(int exp_prd) {
        this.exp_prd = exp_prd;
    }

    public String getEmployee_name() {
        return employee_name;
    }

    public void setEmployee_name(String employee_name) {
        this.employee_name = employee_name;
    }

    public String getIs_first_login() {
        return is_first_login;
    }

    public void setIs_first_login(String is_first_login) {
        this.is_first_login = is_first_login;
    }
    
    
}
