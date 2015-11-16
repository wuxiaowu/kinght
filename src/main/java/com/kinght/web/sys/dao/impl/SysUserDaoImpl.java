package com.kinght.web.sys.dao.impl;

import com.kinght.web.sys.dao.SysUserDao;
import com.kinght.web.sys.domain.SysUser;
import org.hibernate.SessionFactory;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

/**
 * Created with IntelliJ IDEA.
 * SysUser: wuxw
 * Date: 14-11-2
 * Time: 下午7:05
 */
public class SysUserDaoImpl extends JdbcDaoSupport implements SysUserDao {
    public  SysUserDaoImpl(){

    }

    @Override
    public void insertSysUser(SysUser sysUser) {
    }

    @Override
    public void updateSysUser(SysUser sysUser) {
    }

    @Override
    public SysUser getSysUserByStrAccountID(String strAccountID) {
        return null;
    }
}
