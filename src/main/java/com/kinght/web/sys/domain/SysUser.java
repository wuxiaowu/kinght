package com.kinght.web.sys.domain;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * SysUser: Administrator
 * Date: 14-11-2
 * Time: 下午7:02
 * To change this template use File | Settings | File Templates.
 */
public class SysUser {
    private String strAccountID;
    private String strPasswd;
    private String strSocNo;
    private String strEmail;
    private Date regdate;
    private Integer strAuthority;
    private String strIP;
    private String strClientIP;
    private Long idays;
    private Long cashPoint;
    private Long iDiffTime;
    private Long iPoint;
    private Date sTime;
    private Date eTime;
    private String strReason;
    private String strMd5Pwd;
    private Date premiumExpire;
    private Integer kb;
    private Integer kc;
    private String yjm;

    public String getStrAccountID() {
        return strAccountID;
    }

    public void setStrAccountID(String strAccountID) {
        this.strAccountID = strAccountID;
    }

    public String getStrPasswd() {
        return strPasswd;
    }

    public void setStrPasswd(String strPasswd) {
        this.strPasswd = strPasswd;
    }

    public String getStrSocNo() {
        return strSocNo;
    }

    public void setStrSocNo(String strSocNo) {
        this.strSocNo = strSocNo;
    }

    public String getStrEmail() {
        return strEmail;
    }

    public void setStrEmail(String strEmail) {
        this.strEmail = strEmail;
    }

    public Date getRegdate() {
        return regdate;
    }

    public void setRegdate(Date regdate) {
        this.regdate = regdate;
    }

    public Integer getStrAuthority() {
        return strAuthority;
    }

    public void setStrAuthority(Integer strAuthority) {
        this.strAuthority = strAuthority;
    }

    public String getStrIP() {
        return strIP;
    }

    public void setStrIP(String strIP) {
        this.strIP = strIP;
    }

    public String getStrClientIP() {
        return strClientIP;
    }

    public void setStrClientIP(String strClientIP) {
        this.strClientIP = strClientIP;
    }

    public Long getIdays() {
        return idays;
    }

    public void setIdays(Long idays) {
        this.idays = idays;
    }

    public Long getCashPoint() {
        return cashPoint;
    }

    public void setCashPoint(Long cashPoint) {
        this.cashPoint = cashPoint;
    }

    public Long getiDiffTime() {
        return iDiffTime;
    }

    public void setiDiffTime(Long iDiffTime) {
        this.iDiffTime = iDiffTime;
    }

    public Long getiPoint() {
        return iPoint;
    }

    public void setiPoint(Long iPoint) {
        this.iPoint = iPoint;
    }

    public Date getsTime() {
        return sTime;
    }

    public void setsTime(Date sTime) {
        this.sTime = sTime;
    }

    public Date geteTime() {
        return eTime;
    }

    public void seteTime(Date eTime) {
        this.eTime = eTime;
    }

    public String getStrReason() {
        return strReason;
    }

    public void setStrReason(String strReason) {
        this.strReason = strReason;
    }

    public String getStrMd5Pwd() {
        return strMd5Pwd;
    }

    public void setStrMd5Pwd(String strMd5Pwd) {
        this.strMd5Pwd = strMd5Pwd;
    }

    public Date getPremiumExpire() {
        return premiumExpire;
    }

    public void setPremiumExpire(Date premiumExpire) {
        this.premiumExpire = premiumExpire;
    }

    public Integer getKb() {
        return kb;
    }

    public void setKb(Integer kb) {
        this.kb = kb;
    }

    public Integer getKc() {
        return kc;
    }

    public void setKc(Integer kc) {
        this.kc = kc;
    }

    public String getYjm() {
        return yjm;
    }

    public void setYjm(String yjm) {
        this.yjm = yjm;
    }
}
