package com.kinght.web.sys.service;

import com.kinght.web.sys.dao.SysUserDao;
import com.kinght.web.sys.domain.SysUser;

/**
 * Created with IntelliJ IDEA.
 * SysUser: Administrator
 * Date: 14-11-2
 * Time: 下午7:02
 * To change this template use File | Settings | File Templates.
 */
public class SysUserBiz {
    private SysUserDao sysUserDao;

    public void setSysUserDao(SysUserDao sysUserDao) {
        this.sysUserDao = sysUserDao;
    }

    public void insertSysUser(SysUser sysUser) {
        sysUserDao.insertSysUser(sysUser);
    }
    public void updateSysUser(SysUser sysUser){
        sysUserDao.updateSysUser(sysUser);
    }
    public SysUser getSysUserByStrAccountID(String strAccountID) {
      return   sysUserDao.getSysUserByStrAccountID(strAccountID);
    }
    public void  register(SysUser sysUser){
        insertSysUser(sysUser);
    }
    public void resetPassword(SysUser sysUser){
        updateSysUser(sysUser);
    }
}
