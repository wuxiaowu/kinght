package com.kinght.web.sys.dao;

import com.kinght.web.sys.domain.SysUser;

/**
 * Created with IntelliJ IDEA.
 * SysUser: Administrator
 * Date: 14-11-2
 * Time: 下午7:05
 * To change this template use File | Settings | File Templates.
 */
public interface SysUserDao {
    public void insertSysUser(SysUser sysUser);
    public void updateSysUser(SysUser sysUser);
    public SysUser getSysUserByStrAccountID(String strAccountID);
}
